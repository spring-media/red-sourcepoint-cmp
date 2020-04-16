const { writeFileSync, readdirSync } = require('fs');
const { resolve, parse } = require('path');
const { renderToString } = require('vue-server-renderer').createRenderer();
const Vue = require('vue');

const basePath = './dist/cjs/vue/components';

const components = readdirSync(basePath)
  .filter((dir) => dir.match(/Embed(.*)Placeholder/))
  .map((dir) => resolve(basePath, dir));

const dashify = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const buildHTMLSnippets = ({ version }) => {
  components.forEach((comp) => {
    const { name } = parse(comp);

    const component = require(`${comp}/${name}.js`);

    const app = new Vue({
      render: (h) => h(component, { props: { privacyManagerId: 12345 } }),
    });

    renderToString(app)
      .then((html) => writeFileSync(`.cae/red-cmp-${dashify(name)}-${version}.html`, html))
      .catch((error) => console.error(error));
  });
};

module.exports = {
  buildHTMLSnippets,
};
