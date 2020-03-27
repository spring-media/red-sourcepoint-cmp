/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync } = require('fs');
const { renderToString } = require('vue-server-renderer').createRenderer();
const Vue = require('vue');

const placeholder = require('../dist/cjs/vue/EmbedPlaceholder');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const dashify = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const buildHTMLSnippets = ({ version }) => {
  Object.keys(placeholder).forEach(name => {
    const component = placeholder[name];

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
