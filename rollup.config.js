import { rmdirSync } from 'fs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import { readdirSync, lstatSync } from 'fs';
import { resolve, parse, relative } from 'path';

rmdirSync('./dist', { recursive: true });

const typescriptPlugin = typescript();
const vuePlugin = vue({ css: false });
const postcssPlugin = postcss({ extract: true });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getVueComponents = () => {
  const basePath = './src/vue/components';
  const result = readdirSync(basePath);

  return result
    .map(file => resolve(basePath, file))
    .filter(file => lstatSync(file).isDirectory())
    .map(file => parse(file))
    .reduce((acc, { base }) => {
      const components = readdirSync(`${basePath}/${base}`)
        .filter(comp => comp.match(/\.vue$/))
        .map(comp => {
          const name = comp.replace(/\.vue$/, '');

          return {
            input: { [name]: `${basePath}/${base}/${comp}` },
            output: [
              { format: 'esm', dir: `./dist/esm/vue/components/${base}` },
              { format: 'cjs', dir: `./dist/cjs/vue/components/${base}` },
            ],
            external: ['vue', 'vuex'],
            plugins: [typescriptPlugin, vuePlugin, postcssPlugin],
          };
        });

      acc.push({
        input: { index: `${basePath}/${base}/index.ts` },
        external: () => true,
        output: [
          {
            format: 'esm',
            dir: `./dist/esm/vue/components/${base}`,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            paths: id => `./${relative(`${basePath}/${base}`, id).replace('.vue', '.js')}`,
          },
          {
            format: 'cjs',
            dir: `./dist/cjs/vue/components/${base}`,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            paths: id => `./${relative(`${basePath}/${base}`, id).replace('.vue', '.js')}`,
          },
        ],
        plugins: [typescriptPlugin, vuePlugin, postcss({ extract: true })],
      });

      acc.push(...components);

      return acc;
    }, []);
};

export default [
  {
    input: {
      'tcf-v2': './src/tcf-v2/index.ts',
      callbacks: './src/tcf-v2/callbacks/index.ts',
      'vendor-mapping': './src/vendor-mapping/index.ts',
      'embed-utils': './src/embed-utils/index.ts',
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
  ...getVueComponents(),
];
