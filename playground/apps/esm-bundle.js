import Vue from 'vue';
import Vuex from 'vuex';
import { onPrivacyManagerAction } from '../../dist/esm/sourcepoint-callbacks';
import { EmbedFacebookConsent } from '../../dist/esm/vue/components/EmbedFacebookConsent/index';
import { sourcepoint } from '../../dist/esm/vue/vuex/sourcepoint';

onPrivacyManagerAction((action) => console.log(action));

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    sourcepoint,
  },
});

const PlaygroundApp = Vue.extend({
  name: 'PlaygroundApp',
  components: {
    EmbedFacebookConsent,
  },
  template: `
    <div>
        <embed-facebook-consent></embed-facebook-consent>
    </div>
  `,
});

new Vue({
  template: `<playground-app></playground-app>`,
  components: {
    PlaygroundApp,
  },
  store,
}).$mount(document.getElementById('vue-app'));
