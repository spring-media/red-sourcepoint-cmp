const { rmdirSync, existsSync, writeFileSync, readFileSync } = require('fs');
const { extname } = require('path');
const rollup = require('rollup');
const postcss = require('rollup-plugin-postcss');
const commonjs = require('@rollup/plugin-commonjs');
const { version } = require('../../package.json');
const { facebook, youtube, twitter, instagram } = require('./embed-contents');
const { getIABStubScript } = require('../../dist/cjs/sourcepoint');

const esmTemplate = () => {
  return `
<div id="vue-app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
<script src="https://unpkg.com/vuex@3.1.3/dist/vuex.js"></script>
`;
};

const browserTemplate = () => {
  const caeConfig = require(`../../.cae/red-cmp-config-${version}.json`);

  const facebookPlaceholder = readFileSync(`.cae/${caeConfig.embedPlaceholderFacebookHtml}`, 'utf8');
  const twitterPlaceholder = readFileSync(`.cae/${caeConfig.embedPlaceholderTwitterHtml}`, 'utf8');
  const youtubePlaceholder = readFileSync(`.cae/${caeConfig.embedPlaceholderYoutubeHtml}`, 'utf8');
  const instagramPlaceholder = readFileSync(`.cae/${caeConfig.embedPlaceholderInstagramHtml}`, 'utf8');

  return `
    <div>
        <div class="privacy-manager__container"><button class="embed-placeholder__button open-privacy-manager" style="border-radius: 0;" @click="openPrivacyManager">Open Privacy Manager</button></div>
        <ul class="embed__container">
            <li class="embed__item" data-vendor-name="facebook">
                <div>${facebookPlaceholder}</div>
                <script type="text/embed-content">
                    ${facebook}
                </script>
            </li>
            <li class="embed__item" data-vendor-name="instagram">
                <div>${instagramPlaceholder}</div>
                <script type="text/embed-content">
                    ${instagram}
                </script>
            </li>
            <li class="embed__item" data-vendor-name="twitter">
                <div>${twitterPlaceholder}</div>
                <script type="text/embed-content">
                    ${twitter}
                </script>
            </li>
            <li class="embed__item" data-vendor-name="youtube">
                <div>${youtubePlaceholder}</div>
                <script type="text/embed-content">
                    ${youtube}
                </script>
            </li>
        </ul>
    </div>
  `;
};

const compileTemplate = (opts) => ({
  name: 'compileTemplate',
  generateBundle(output, bundle) {
    const { fileName, parameters, template } = opts;

    const files = Object.values(bundle).filter((file) => file.isEntry || file.type === 'asset' || file.isAsset);
    const links = files
      .filter(({ fileName: name }) => extname(name).substring(1) === 'css')
      .map(({ fileName: name }) => `<link href="${name}" rel="stylesheet">`)
      .join('\n');
    const scripts = files
      .filter(({ fileName: name }) => extname(name).substring(1) === 'js')
      .map(({ fileName: name }) => `<script src="${name}"></script>`)
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
              mmsDomain: '${parameters.mmsDomain}',
              accountId: ${parameters.accountId},
              propertyId: ${parameters.propertyId},
              wrapperAPIOrigin: '${parameters.wrapperAPIOrigin}',
            },
          };
        </script>
        <script src="${parameters.libraryURL}"></script>
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

  const configs = [
    {
      input: './playground/apps/esm-bundle.js',
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
        compileTemplate({ parameters, fileName: 'esm.html', template: esmTemplate }),
      ],
    },
    {
      input: './playground/apps/browser-bundle.js',
      output: {
        format: 'es',
      },
      plugins: [
        postcss({ extract: true }),
        compileTemplate({ parameters, fileName: 'browser.html', template: browserTemplate }),
        {
          resolveId(source) {
            if (source === 'cmp-embed-placeholder.css') {
              return `.cae/red-cmp-components-${version}.min.css`;
            }

            return null;
          },
        },
      ],
    },
  ];

  for (const config of configs) {
    const bundle = await rollup.rollup(config);

    await bundle.write({
      format: config.output.format,
      dir: buildDir,
      globals: config.output.globals || {},
    });
  }

  writeFileSync('./playground/public/build/parameters.json', JSON.stringify(parameters));
};

module.exports = {
  compile,
};
