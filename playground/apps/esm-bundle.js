import Vue from 'vue';
import Vuex from 'vuex';
import { onPrivacyManagerAction, onConsentReady } from '../../dist/esm/sourcepoint-callbacks';
import {
  EmbedFacebookConsent,
  EmbedTwitterConsent,
  EmbedYoutubeConsent,
  EmbedInstagramConsent,
  EmbedPodigeeConsent,
  EmbedSocialNetworksConsent,
  EmbedConsent,
} from '../../dist/esm/vue/components';
import { sourcepoint } from '../../dist/esm/vue/vuex/sourcepoint';
import { reloadPageOnReject } from '../../dist/esm/vue/vuex/sourcepoint/plugins';
import { addEventListener } from '../../dist/esm/tcf-v2';
import { getCustomVendorConsents, loadPrivacyManagerModal } from '../../dist/esm/sourcepoint';
import '../../dist/esm/vue/components.css';
import './common.css';
import { facebook, youtube, twitter, instagram, podigee } from '../scripts/embed-contents';
import { configureGrants, getGrantedVendors } from '../../dist/esm/vendor-mapping';

onPrivacyManagerAction((args) => console.log('onPrivacyManagerAction', args));

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

store.dispatch('sourcepoint/bootstrapConsents', { propertyId: window.__playground__.parameters.propertyId });

window.addEventListener('load', () => {
  const scrollY = window.sessionStorage.getItem('__scrollY');

  if (scrollY) {
    setTimeout(() => window.scrollTo(0, parseInt(scrollY, 10)));
  }

  window.sessionStorage.removeItem('__scrollY');
});

const PlaygroundApp = Vue.extend({
  name: 'PlaygroundApp',
  components: {
    EmbedFacebookConsent,
    EmbedInstagramConsent,
    EmbedPodigeeConsent,
    EmbedTwitterConsent,
    EmbedYoutubeConsent,
    EmbedSocialNetworksConsent,
    EmbedConsent,
  },
  data: () => ({
    privacyManagerId: window.__playground__.parameters.privacyManagerId,
    privacyManagerIdDenyTracking: window.__playground__.parameters.privacyManagerIdDenyTracking,
    facebook,
    twitter,
    instagram,
    youtube,
    podigee,
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
                <embed-podigee-consent vendorId="5e717ad49a0b5040d5750815" :privacyManagerId="privacyManagerId" :content="podigee"></embed-podigee-consent>   
            </li>
            <li class="embed__item">
                <embed-social-networks-consent :privacyManagerId="privacyManagerId" :content="youtube" vendorId="5e7179e49a0b5040d5750812"></embed-social-networks-consent>
            </li>
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
        <h2 class="section">PUR</h2>
        <ul class="embed__container social-embeds__container">
            <li class="embed__item">
                <embed-facebook-consent :content="facebook" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true"></embed-facebook-consent>
            </li>
            <li class="embed__item">
                <embed-instagram-consent :content="instagram" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true"></embed-instagram-consent>
            </li>
            <li class="embed__item">
                <embed-twitter-consent :content="twitter" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true"></embed-twitter-consent>
            </li>
            <li class="embed__item">
                <embed-youtube-consent :content="youtube" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true"></embed-youtube-consent>
            </li>
            <li class="embed__item">
                <embed-podigee-consent vendorId="5e717ad49a0b5040d57508000" :content="podigee" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true"></embed-podigee-consent>   
            </li>
            <li class="embed__item">
                <embed-social-networks-consent :content="youtube" vendorId="5e7179e49a0b5040d5750812" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true"></embed-social-networks-consent>
            </li>
            <li class="embed__item">
                <embed-consent vendorId="5ed90e2947dbbd564700dfaa" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true">
                    <template #embed>
                        <iframe 
                            src="https://www.bild.de/ig/dda6ec1c-e23c-423a-9154-07154cb853e4/index/index.html" 
                            style="width: 100%; height: 700px;">
                        </iframe>
                    </template>
                </embed-consent>
            </li>
        </ul>
        <h2 class="section">LAYOUT SECTION</h2>
        <div class="embed__container social-embeds__container layout-1">
            <embed-facebook-consent :content="facebook" :privacyManagerId="privacyManagerId" teaserFormat="quad"></embed-facebook-consent>
            <embed-instagram-consent :content="instagram" :privacyManagerId="privacyManagerId" teaserFormat="bc"></embed-instagram-consent>
        </div>
        <div class="embed__container social-embeds__container layout-2">
            <embed-facebook-consent :content="facebook" :privacyManagerId="privacyManagerId" teaserFormat="a-teaser"></embed-facebook-consent>
        </div>
        <div class="embed__container social-embeds__container">
            <embed-facebook-consent :content="facebook" :privacyManagerId="privacyManagerId" teaserFormat="super-a"></embed-facebook-consent>
        </div>
        <h2 class="section">LAYOUT SECTION PUR</h2>
        <div class="embed__container social-embeds__container layout-1">
            <embed-facebook-consent :content="facebook" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true" teaserFormat="quad"></embed-facebook-consent>
            <embed-instagram-consent :content="instagram" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true" teaserFormat="bc"></embed-instagram-consent>
        </div>
        <div class="embed__container social-embeds__container layout-2">
            <embed-facebook-consent :content="facebook" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true" teaserFormat="a-teaser"></embed-facebook-consent>
        </div>
        <div class="embed__container social-embeds__container">
            <embed-facebook-consent :content="facebook" :privacyManagerId="privacyManagerId" :privacyManagerIdDenyTracking="privacyManagerIdDenyTracking" :isPur="true" teaserFormat="super-a"></embed-facebook-consent>
        </div>
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
