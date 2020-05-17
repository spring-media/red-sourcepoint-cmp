import Vuex from 'vuex';
import Vue from 'vue';
import { boolean } from '@storybook/addon-knobs';
import { sourcepoint } from '../vuex/sourcepoint';
import { hasCustomConsentById } from '../../sourcepoint';
import { PURPOSE_ID_SOCIAL, VENDOR_ID_FACEBOOK } from '../../vendor-mapping';
import { ConsentWrapper } from './ConsentWrapper';
import { SocialSharingPopup } from './SocialSharingPopup';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

const defaultStyle =
  'display: flex; width: 250px; height: 50px; color: white; background-color: #495057; padding: 5px; justify-content: center';
const anchorStyle = 'text-decoration: none; color: #495057; border: 1px solid #495057; padding: 5px';
const popupStyle = 'position: absolute; top: -5px; left: 100px';

export default {
  title: 'ConsentWrapper',
  components: { ConsentWrapper },
};

export const consentWrapperDefault = () => ({
  components: { ConsentWrapper },
  template:
    '<consent-wrapper :vendorId="vendorId">' +
    '<template #disabledContent><div :style="style">content for rejected consent</div></template>' +
    '<template #enabledContent><div :style="style">content for given consent</div></template>' +
    '</consent-wrapper>',
  store,
  props: {
    vendorId: {
      default: VENDOR_ID_FACEBOOK,
    },
    consent: {
      default: boolean(
        'Consent',
        hasCustomConsentById(VENDOR_ID_FACEBOOK, store.state.sourcepoint.consentedCustomVendors),
      ),
    },
    socialConsent: {
      default: boolean(
        'Consent Social Networks',
        hasCustomConsentById(PURPOSE_ID_SOCIAL, store.state.sourcepoint.consentedCustomPurposes),
      ),
    },
    style: {
      default: defaultStyle,
    },
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    consent(value) {
      const payload = value ? [{ _id: VENDOR_ID_FACEBOOK }] : [];
      store.commit('sourcepoint/setCustomVendorConsents', payload);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    socialConsent(value) {
      const payload = value ? [{ _id: PURPOSE_ID_SOCIAL }] : [];
      store.commit('sourcepoint/setCustomPurposeConsents', payload);
    },
  },
});

export const consentWrapperWithPopup = () => ({
  components: { ConsentWrapper, SocialSharingPopup },
  template:
    '<consent-wrapper :vendorId="vendorId" style="position: relative">' +
    '<template #disabledContent>' +
    '<div>' +
    '<social-sharing-popup v-if="isVisible" :privacyManagerId="privacyManagerId" @close="isVisible = false" :style="popupStyle"></social-sharing-popup>' +
    '<a href="#" @click.prevent="isVisible = true" :style="style" >disabled</a> ' +
    '</div>' +
    '</template>' +
    '<template #enabledContent><a href="#" :style="style">enabled</a></template>' +
    '</consent-wrapper>',
  store,
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    vendorId: {
      default: VENDOR_ID_FACEBOOK,
    },
    privacyManagerId: {
      default: 12345,
    },
    consent: {
      default: boolean(
        'Consent',
        hasCustomConsentById(VENDOR_ID_FACEBOOK, store.state.sourcepoint.consentedCustomVendors),
      ),
    },
    socialConsent: {
      default: boolean(
        'Consent Social Networks',
        hasCustomConsentById(PURPOSE_ID_SOCIAL, store.state.sourcepoint.consentedCustomPurposes),
      ),
    },
    style: {
      default: anchorStyle,
    },
    popupStyle: {
      default: popupStyle,
    },
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    consent(value) {
      const payload = value ? [{ _id: VENDOR_ID_FACEBOOK }] : [];
      store.commit('sourcepoint/setCustomVendorConsents', payload);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    socialConsent(value) {
      const payload = value ? [{ _id: PURPOSE_ID_SOCIAL }] : [];
      store.commit('sourcepoint/setCustomPurposeConsents', payload);
    },
  },
});
