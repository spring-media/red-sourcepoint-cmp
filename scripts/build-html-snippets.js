/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync, readdirSync } = require('fs');
const { resolve, parse } = require('path');
const { renderToString } = require('vue-server-renderer').createRenderer();
const Vue = require('vue');

const basePath = './dist/cjs/vue/components';

const components = readdirSync(basePath)
  .filter(dir => dir.match(/Embed(.*)Placeholder/))
  .map(dir => resolve(basePath, dir));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const dashify = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const buildHTMLSnippets = ({ version }) => {
  components.forEach(comp => {
    const { name } = parse(comp);

    const component = require(`${comp}/${name}.js`);

    const app = new Vue({
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      render: h => h(component),
    });

    renderToString(app)
      .then(html => writeFileSync(`.cae/red-cmp-${dashify(name)}-${version}.html`, html))
      .catch(error => console.error(error));
  });
};

module.exports = {
  buildHTMLSnippets,
};
