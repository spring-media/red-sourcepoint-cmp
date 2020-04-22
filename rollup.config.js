import { rmdirSync } from 'fs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';

rmdirSync('./dist', { recursive: true });

const typescriptPlugin = typescript();

export default [
  {
    input: {
      'tcf-v2': './src/tcf-v2/index.ts',
      'vendor-mapping': './src/vendor-mapping/index.ts',
      'embed-utils': './src/embed-utils/index.ts',
      sourcepoint: './src/sourcepoint/index.ts',
      'sourcepoint-callbacks': './src/sourcepoint-callbacks/index.ts',
    },
    output: [
      { format: 'esm', dir: './dist/esm' },
      { format: 'cjs', dir: './dist/cjs' },
    ],
    plugins: [typescriptPlugin],
  },
  {
    input: './src/index.ts',
    output: { format: 'iife', file: './dist/browser/red-cmp.js', name: 'RedCMP' },
    plugins: [typescript({ tsconfigOverride: { compilerOptions: { target: 'ES5' } } })],
  },
  {
    input: {
      'vuex/sourcepoint': './src/vue/vuex/sourcepoint/index.ts',
    },
    external: ['vue', 'vuex', '../../../tcf-v2'],
    output: [
      { format: 'esm', dir: './dist/esm/vue' },
      { format: 'cjs', dir: './dist/cjs/vue' },
    ],
    plugins: [typescriptPlugin],
  },
  {
    input: './src/vue/components/index.ts',
    output: [
      { format: 'esm', file: `./dist/esm/vue/components.js` },
      { format: 'cjs', file: `./dist/cjs/vue/components.js` },
    ],
    external: ['vue', 'vuex'],
    plugins: [typescriptPlugin, vue({ css: false }), postcss({ extract: true })],
  },
];
