import { sync } from 'rimraf';
// import typescript from 'rollup-plugin-typescript2';
import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';

sync('./dist');

const tcfV2Entry = './src/tcf-v2/index.ts';

export default [
  {
    input: tcfV2Entry,
    output: [
      { format: 'esm', file: './dist/esm/tcf-v2.js' },
      { format: 'cjs', file: './dist/cjs/tcf-v2.js' },
    ],
    plugins: [typescript()],
  },
  {
    input: tcfV2Entry,
    output: { format: 'iife', file: './dist/browser/tcf-v2.js', name: 'RedSourcepointCmp' },
    plugins: [typescript({ target: 'ES5' })],
  },
  {
    input: {
      'vuex-module': './src/vue/vuex-module/index.ts',
    },
    external: ['vue', 'vuex'],
    output: [
      { format: 'esm', dir: './dist/esm' },
      { format: 'cjs', dir: './dist/cjs' },
    ],
    plugins: [typescript({ target: 'ES2020' })],
  },
];
