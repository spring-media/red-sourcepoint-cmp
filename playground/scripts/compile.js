const { rmdirSync, existsSync, writeFileSync } = require('fs');
const { extname } = require('path');
const rollup = require('rollup');
const postcss = require('rollup-plugin-postcss');
const commonjs = require('@rollup/plugin-commonjs');
const { getIABStubScript } = require('../../dist/cjs/sourcepoint');

const esmTemplate = () => {
  return `
<div id="vue-app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
<script src="https://unpkg.com/vuex@3.1.3/dist/vuex.js"></script>
`;
};

const compileTemplate = (opts) => ({
  name: 'compileTemplate',
  generateBundle(output, bundle) {
    const { fileName, parameters, template } = opts;

    const files = Object.values(bundle).filter((file) => file.isEntry || file.type === 'asset' || file.isAsset);
    const links = files
      .filter(({ fileName: name }) => extname(name).substring(1) === 'css')
      .map(({ fileName: name }) => `<link href="../build/${name}" rel="stylesheet">`)
      .join('\n');
    const scripts = files
      .filter(({ fileName: name }) => extname(name).substring(1) === 'js')
      .map(({ fileName: name }) => `<script src="../build/${name}"></script>`)
      .join('\n');

    const source = `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Playground</title>
        <script>
          ${getIABStubScript()}
        </script>
        <script>
          window._sp_ = {
            config: {
              baseEndpoint: '${parameters.baseEndpoint}',
              accountId: ${parameters.accountId},
            },
          };
        </script>
        <script src="${parameters.libraryURL}" async></script>
        <script>
          window.__playground__ = {
            parameters: ${JSON.stringify(parameters)},
          }
        </script>
        <link href="../assets/fonts.css" rel="stylesheet">
        ${links}
    </head>
    <body style="margin: 0; padding: 0;">
       ${template()}
       ${scripts}
    </body>
</html>
    `;

    this.emitFile({
      type: 'asset',
      source,
      name: 'Playground Template',
      fileName,
    });
  },
});

const compile = async (parameters) => {
  const buildDir = './playground/public/build';

  existsSync(buildDir) && rmdirSync(buildDir, { recursive: true });

  if (!existsSync('./dist')) {
    console.error('dist folder not found. Please run "npm run build" before.');
    return;
  }

  const config = {
    input: { bundle: './playground/apps/esm-bundle.js' },
    external: ['vue', 'vuex'],
    output: {
      format: 'iife',
      globals: {
        vue: 'Vue',
        vuex: 'Vuex',
      },
    },
    plugins: [
      commonjs(),
      postcss({ extract: true }),
      compileTemplate({ parameters, fileName: 'index.html', template: esmTemplate }),
    ],
  };

  const bundle = await rollup.rollup(config);

  await bundle.write({
    format: config.output.format,
    dir: buildDir,
    globals: config.output.globals || {},
  });

  writeFileSync('./playground/public/build/parameters.json', JSON.stringify(parameters));
};

module.exports = {
  compile,
};
