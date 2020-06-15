import { rmdirSync } from 'fs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
    plugins: [
      typescript({ tsconfigOverride: { compilerOptions: { target: 'ES5' } } }),
      nodeResolve({
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: [/\/core-js\//],
        extensions: ['.js', '.ts'],
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
              modules: false,
              targets: 'ie >= 11',
            },
          ],
        ],
      }),
    ],
  },
  {
    input: {
      'vuex/sourcepoint': './src/vue/vuex/sourcepoint/index.ts',
      'vuex/sourcepoint/effects': './src/vue/vuex/sourcepoint/effects/index.ts',
    },
    external: (id) => /vendor-mapping/.test(id) || id === 'vue' || id === 'vuex',
    output: [
      { format: 'esm', dir: './dist/esm/vue' },
      { format: 'cjs', dir: './dist/cjs/vue' },
    ],
    plugins: [typescriptPlugin],
  },
  {
    input: './src/vue/components/index.ts',
    output: [
      {
        format: 'esm',
        file: `./dist/esm/vue/components.js`,
        paths: (id) => {
          if (/\/vendor-mapping$/.test(id)) {
            return '../vendor-mapping';
          }
          return id;
        },
      },
      {
        format: 'cjs',
        file: `./dist/cjs/vue/components.js`,
        paths: (id) => {
          if (/\/vendor-mapping$/.test(id)) {
            return '../vendor-mapping';
          }
          return id;
        },
      },
    ],
    external: (id) => /vendor-mapping/.test(id) || id === 'vue' || id === 'vuex',
    plugins: [typescriptPlugin, vue({ css: false }), postcss({ extract: true })],
  },
];
