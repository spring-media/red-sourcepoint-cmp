const { writeFileSync } = require('fs');
const { renderToString } = require('vue-server-renderer').createRenderer();
const Vue = require('vue');

const {
  EmbedPlaceholder,
  EmbedFacebookPlaceholder,
  EmbedInstagramPlaceholder,
  EmbedTwitterPlaceholder,
  EmbedYoutubePlaceholder,
} = require('../dist/cjs/vue/components.js');

const components = {
  'embed-placeholder': EmbedPlaceholder,
  'embed-facebook-placeholder': EmbedFacebookPlaceholder,
  'embed-instagram-placeholder': EmbedInstagramPlaceholder,
  'embed-twitter-placeholder': EmbedTwitterPlaceholder,
  'embed-youtube-placeholder': EmbedYoutubePlaceholder,
};

const buildHTMLSnippets = ({ version }) => {
  for (const [name, component] of Object.entries(components)) {
    const app = new Vue({
      render: (h) => h(component, { props: { privacyManagerId: 12345 } }),
    });

    renderToString(app)
      .then((html) => writeFileSync(`.cae/red-cmp-${name}-${version}.html`, html))
      .catch((error) => console.error(error));
  }
};

module.exports = {
  buildHTMLSnippets,
};
