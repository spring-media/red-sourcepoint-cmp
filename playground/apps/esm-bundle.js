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
  EmbedSocialNetworksConsent,
  EmbedConsent,
} from '../../dist/esm/vue/components';
import { sourcepoint } from '../../dist/esm/vue/vuex/sourcepoint';
import { reloadPageOnReject } from '../../dist/esm/vue/vuex/sourcepoint/effects';
import { addEventListener } from '../../dist/esm/tcf-v2';
import { getCustomVendorConsents, loadPrivacyManagerModal } from '../../dist/esm/sourcepoint';
import '../../dist/esm/vue/components.css';
import './common.css';
import { facebook, youtube, twitter, instagram } from '../scripts/embed-contents';
import { configureGrants, getGrantedVendors } from '../../dist/esm/vendor-mapping';

onPrivacyManagerAction((...args) => console.log('onPrivacyManagerAction', ...args));
onMessageReady((...args) => console.log('onMessageReady', ...args));
onConsentReady((...args) => console.log('onConsentReady', ...args));
onPMCancel((...args) => console.log('onPMCancel', ...args));
onMessageChoiceSelect((...args) => console.log('onMessageChoiceSelect', ...args));
onMessageChoiceError((...args) => console.log('onMessageChoiceError', ...args));

addEventListener((tcData) => console.log('addEventListener', tcData));

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    sourcepoint,
  },
});

reloadPageOnReject(store);

const getConsents = async () => {
  const { consentedPurposes = [], consentedVendors = [], grants } = await getCustomVendorConsents();

  configureGrants(grants);

  store.commit('sourcepoint/setCustomVendorConsents', consentedVendors);
  store.commit('sourcepoint/setCustomPurposeConsents', consentedPurposes);
  store.commit('sourcepoint/setGrantedVendors', getGrantedVendors());
};

onConsentReady(getConsents);

store.dispatch('sourcepoint/bootstrapConsents', { propertyId: window.__playground__.parameters.propertyId});

const PlaygroundApp = Vue.extend({
  name: 'PlaygroundApp',
  components: {
    EmbedFacebookConsent,
    EmbedInstagramConsent,
    EmbedTwitterConsent,
    EmbedYoutubeConsent,
    EmbedSocialNetworksConsent,
    EmbedConsent,
  },
  data: () => ({
    privacyManagerId: window.__playground__.parameters.privacyManagerId,
    facebook,
    twitter,
    instagram,
    youtube,
  }),
  template: `
    <div>
        <div class="privacy-manager__container"><button class="embed-placeholder__button" style="border-radius: 0;" @click="openPrivacyManager">Open Privacy Manager</button></div>
        <ul class="embed__container social-embeds__container">
            <li class="embed__item">
                <embed-facebook-consent :privacyManagerId="privacyManagerId" :content="facebook"></embed-facebook-consent>
            </li>
            <li class="embed__item">
                <embed-instagram-consent :privacyManagerId="privacyManagerId" :content="instagram"></embed-instagram-consent>
            </li>
            <li class="embed__item">
                <embed-twitter-consent :privacyManagerId="privacyManagerId" :content="twitter"></embed-twitter-consent>
            </li>
            <li class="embed__item">
                <embed-youtube-consent :privacyManagerId="privacyManagerId" :content="youtube"></embed-youtube-consent>
            </li>
            <li class="embed__item">
                <embed-social-networks-consent :privacyManagerId="privacyManagerId" :content="youtube" vendorId="5e7179e49a0b5040d5750812"></embed-social-networks-consent>
            </li>
        </ul>
        <ul class="embed__container third-party-embeds__container">
            <li class="embed__item">
                <embed-consent vendorId="5ed90e2947dbbd564700dfaa" :privacyManagerId="privacyManagerId">
                    <template #embed>
                        <iframe 
                            src="https://www.bild.de/ig/dda6ec1c-e23c-423a-9154-07154cb853e4/index/index.html" 
                            style="width: 100%; height: 700px;">
                        </iframe>
                    </template>
                </embed-consent>
            </li>
        </ul>
    </div>
  `,
  methods: {
    openPrivacyManager() {
      loadPrivacyManagerModal(this.privacyManagerId);
    },
  },
});

new Vue({
  template: `<playground-app></playground-app>`,
  components: {
    PlaygroundApp,
  },
  store,
}).$mount(document.getElementById('vue-app'));
