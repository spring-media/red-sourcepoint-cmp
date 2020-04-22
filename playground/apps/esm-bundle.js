import Vue from 'vue';
import Vuex from 'vuex';
import {
  onPrivacyManagerAction,
  onMessageReady,
  onConsentReady,
  onPMCancel,
  onMessageChoiceSelect,
  onMessageChoiceError,
} from '../../dist/esm/sourcepoint-callbacks';
import {
  EmbedFacebookConsent,
  EmbedTwitterConsent,
  EmbedYoutubeConsent,
  EmbedInstagramConsent,
} from '../../dist/esm/vue/components';
import { sourcepoint } from '../../dist/esm/vue/vuex/sourcepoint';
import { addEventListener } from '../../dist/esm/tcf-v2';
import { getCustomVendorConsentsBypassCache } from '../../dist/esm/sourcepoint';

onPrivacyManagerAction((...args) => console.log('onPrivacyManagerAction', ...args));
onMessageReady((...args) => console.log('onMessageReady', ...args));
onConsentReady((...args) => console.log('onConsentReady', ...args));
onPMCancel((...args) => console.log('onPMCancel', ...args));
onMessageChoiceSelect((...args) => console.log('onMessageChoiceSelect', ...args));
onMessageChoiceError((...args) => console.log('onMessageChoiceError', ...args));

addEventListener((...args) => console.log('addEventListener', ...args));

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    sourcepoint,
  },
});

const getConsents = async () => {
  const { consentedPurposes = [], consentedVendors = [] } = await getCustomVendorConsentsBypassCache();

  store.commit('sourcepoint/setCustomVendorConsents', consentedVendors);
  store.commit('sourcepoint/setCustomPurposeConsents', consentedPurposes);
};

onConsentReady(getConsents);

addEventListener((tcData) => {
  if (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete') {
    getConsents();
  }
});

store.dispatch('sourcepoint/bootstrapConsents');

const PlaygroundApp = Vue.extend({
  name: 'PlaygroundApp',
  components: {
    EmbedFacebookConsent,
    EmbedInstagramConsent,
    EmbedTwitterConsent,
    EmbedYoutubeConsent,
  },
  data: () => ({
    privacyManagerId: window.__playground__.parameters.privacyManagerId,
  }),
  template: `
    <div>
        <div style="margin-bottom: 20px">
            <embed-facebook-consent :privacyManagerId="privacyManagerId" :content="'Facebook Content'"></embed-facebook-consent>
        </div>
        <div style="margin-bottom: 20px">
            <embed-instagram-consent :privacyManagerId="privacyManagerId" :content="'Instagram Content'"></embed-instagram-consent>
        </div>
        <div style="margin-bottom: 20px">
            <embed-twitter-consent :privacyManagerId="privacyManagerId" :content="'Twitter Content'"></embed-twitter-consent>
        </div>
        <div style="margin-bottom: 20px">
            <embed-youtube-consent :privacyManagerId="privacyManagerId" :content="'Youtube Content'"></embed-youtube-consent>
        </div>
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
