/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync, writeFileSync, mkdirSync, copyFileSync, existsSync } = require('fs');
const { resolve, basename } = require('path');
const { renderToString } = require('vue-server-renderer').createRenderer();
const Vue = require('vue');

const includeComponents = [
  'EmbedPlaceholderFacebook',
  'EmbedPlaceholderInstagram',
  'EmbedPlaceholderTwitter',
  'EmbedPlaceholderYoutube',
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const buildSnippets = () => {
  const dir = './dist/cjs/vue-components';
  const dist = './dist/browser/embed-placeholder';

  try {
    const { jsFiles, cssFiles } = readdirSync(dir)
      .map(file => resolve(dir, file))
      .reduce(
        (acc, file) => {
          const name = basename(file, '.js');

          if (includeComponents.includes(name)) {
            acc.jsFiles.push(file);

            const cssFile = `${dir}/${name}.css`;

            if (existsSync(cssFile)) {
              acc.cssFiles.push(cssFile);
            }
          }

          return acc;
        },
        { jsFiles: [], cssFiles: [] },
      );

    mkdirSync(dist, { recursive: true });

    cssFiles.forEach(file => {
      copyFileSync(file, `${dist}/${basename(file)}`);
    });

    jsFiles.forEach(file => {
      const imports = require(file);
      const name = basename(file, '.js');
      const component = imports[name];

      const app = new Vue({
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        render: h => h(component),
      });

      renderToString(app)
        .then(html => writeFileSync(`${dist}/${name}.html`, html))
        .catch(error => console.error(error));
    });
  } catch (e) {
    console.error(e);
  }
};

buildSnippets();
