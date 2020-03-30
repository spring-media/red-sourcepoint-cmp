import { rmdirSync } from 'fs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import { readdirSync, lstatSync } from 'fs';
import { resolve, parse, relative, format } from 'path';

rmdirSync('./dist', { recursive: true });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const dashify = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const staticExternals = ['vue', 'vuex', 'vue-runtime-helpers'];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const rewriteIndexImportsPathsToRelative = basePath => id => {
  const path = relative(basePath, id);
  const name = dashify(path.replace(/\.vue$/, '.js'));

  return format({ dir: '.', name });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const rewriteComponentImportsPathToRelative = (basePath, format = 'esm') => id => {
  if (new RegExp(`^[${staticExternals.join('|')}]`).test(id)) {
    return format === 'cjs' ? id.replace('.mjs', '.js') : id;
  }

  const relativePath = relative(basePath, id);

  if (!relativePath) {
    return './';
  }

  const newId = dashify(relativePath).replace('.vue', '.js');

  if (newId.startsWith('.')) {
    return newId;
  }

  return `./${newId}`;
};

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
          const name = dashify(comp.replace(/\.vue$/, ''));

          return {
            input: { [name]: `${basePath}/${base}/${comp}` },
            output: [
              {
                format: 'esm',
                dir: `./dist/esm/vue/components/${dashify(base)}`,
                paths: rewriteComponentImportsPathToRelative(`${basePath}/${base}`),
              },
              {
                format: 'cjs',
                dir: `./dist/cjs/vue/components/${dashify(base)}`,
                paths: rewriteComponentImportsPathToRelative(`${basePath}/${base}`, 'cjs'),
              },
            ],
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            external: id => {
              if (!id.includes(comp)) {
                return true;
              }

              return staticExternals.includes(id);
            },
            plugins: [typescript(), vue({ css: false }), postcss({ extract: true })],
          };
        });

      acc.push({
        input: { index: `${basePath}/${base}/index.ts` },
        external: () => true,
        output: [
          {
            format: 'esm',
            dir: `./dist/esm/vue/components/${dashify(base)}`,
            paths: rewriteIndexImportsPathsToRelative(`${basePath}/${base}`),
          },
          {
            format: 'cjs',
            dir: `./dist/cjs/vue/components/${dashify(base)}`,
            paths: rewriteIndexImportsPathsToRelative(`${basePath}/${base}`),
          },
        ],
        plugins: [typescript(), vue({ css: false }), postcss({ extract: true })],
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
    plugins: [typescript()],
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
    plugins: [typescript()],
  },
  ...getVueComponents(),
];
