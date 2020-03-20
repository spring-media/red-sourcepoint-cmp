import { sync } from 'rimraf';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import { readdirSync, lstatSync } from 'fs';
import { resolve, parse } from 'path';

sync('./dist');

const tcfV2Entry = './src/tcf-v2/index.ts';
const callbackEntry = './src/tcf-v2/callbacks/index.ts';

const getVueComponents = () => {
  const basePath = './src/vue/components';
  const result = readdirSync(basePath);

  return result
    .map(file => resolve(basePath, file))
    .filter(file => lstatSync(file).isDirectory())
    .map(file => parse(file))
    .map(({ name, base }) => ({
      input: { [name]: `${basePath}/${base}/index.js` },
      external: ['vue', 'vuex'],
      output: [
        { format: 'esm', dir: './dist/esm/vue-components' },
        { format: 'cjs', dir: './dist/cjs/vue-components' },
      ],
      plugins: [vue({ css: false }), postcss({ extract: true })],
    }));
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const rewriteTcfModulePathInVuexModule = id => {
  if (/\/tcf-v2$/.test(id)) {
    return './tcf-v2';
  }

  return id;
};

export default [
  {
    input: {
      'tcf-v2': tcfV2Entry,
      callbacks: callbackEntry,
    },
    output: [
      { format: 'esm', dir: './dist/esm' },
      { format: 'cjs', dir: './dist/cjs' },
    ],
    plugins: [typescript()],
  },
  {
    input: tcfV2Entry,
    output: { format: 'iife', file: './dist/browser/tcf-v2.js', name: 'RedSourcepointTCFV2' },
    plugins: [typescript({ target: 'ES5' })],
  },
  {
    input: callbackEntry,
    output: { format: 'iife', file: './dist/browser/callbacks.js', name: 'RedSourcepointCallbacks' },
    plugins: [typescript({ target: 'ES5' })],
  },
  {
    input: {
      'vuex-module': './src/vue/vuex-module/index.ts',
    },
    external: ['vue', 'vuex', '../../tcf-v2'],
    output: [
      {
        format: 'esm',
        dir: './dist/esm',
        paths: rewriteTcfModulePathInVuexModule,
      },
      {
        format: 'cjs',
        dir: './dist/cjs',
        paths: rewriteTcfModulePathInVuexModule,
      },
    ],
    plugins: [typescript()],
  },
  ...getVueComponents(),
];
