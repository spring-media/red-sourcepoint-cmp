const { writeFileSync } = require('fs');
const { renderToString } = require('vue-server-renderer').createRenderer();
const Vue = require('vue');

const {
  EmbedPlaceholder,
  EmbedSocialNetworksPlaceholder,
  EmbedFacebookPlaceholder,
  EmbedInstagramPlaceholder,
  EmbedTwitterPlaceholder,
  EmbedYoutubePlaceholder,
  SocialSharingPopup,
} = require('../dist/cjs/vue/components.js');

const components = {
  'embed-placeholder': EmbedPlaceholder,
  'embed-social-networks-placeholder': EmbedSocialNetworksPlaceholder,
  'embed-facebook-placeholder': EmbedFacebookPlaceholder,
  'embed-instagram-placeholder': EmbedInstagramPlaceholder,
  'embed-twitter-placeholder': EmbedTwitterPlaceholder,
  'embed-youtube-placeholder': EmbedYoutubePlaceholder,
  'social-sharing-popup': SocialSharingPopup,
};

const renderComponent = (h, component) => h(component, { props: { privacyManagerId: 12345, customConsents: {} } });

const writeToFile = ({ name, version, content }) => writeFileSync(`.cae/red-cmp-${name}-${version}.html`, content);

const logError = (error) => console.error(error);

const buildHTMLSnippets = ({ version }) => {
  for (const [name, component] of Object.entries(components)) {
    const app = new Vue({
      render: (h) => renderComponent(h, component),
    });

    renderToString(app)
      .then((html) => writeToFile({ name, version, content: html }))
      .catch(logError);
  }
};

module.exports = {
  buildHTMLSnippets,
};
