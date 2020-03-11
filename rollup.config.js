import { sync } from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';

sync('./dist');

const tcfV2Entry = './src/tcf-v2/index.ts';

export default [
  {
    input: tcfV2Entry,
    output: { format: 'esm', file: './dist/esm/tcf-v2.js' },
    plugins: [typescript({ module: 'es2015' })],
  },
  {
    input: tcfV2Entry,
    output: { format: 'cjs', file: './dist/cjs/tcf-v2.js' },
    plugins: [typescript()],
  },
  {
    input: tcfV2Entry,
    output: { format: 'iife', file: './dist/browser/tcf-v2.js', name: 'RedSourcepointCmp' },
    plugins: [typescript({ target: 'ES5', module: 'ES2015' })],
  },
  {
    input: './src/vue/index.js',
    output: { format: 'esm', file: './dist/esm/vue.js' },
    plugins: [vue()],
  },
];
