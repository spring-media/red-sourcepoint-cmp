import Vuex from 'vuex';
import Vue from 'vue';
import { text, boolean } from '@storybook/addon-knobs';
import { sourcepoint } from '../vuex/sourcepoint';
import {
  PURPOSE_ID_SOCIAL,
  VENDOR_ID_INSTAGRAM,
  VENDOR_ID_TWITTER,
  VENDOR_ID_YOUTUBE,
  VENDOR_ID_FACEBOOK,
} from '../../vendor-mapping';
import { EmbedInstagramConsent } from './EmbedInstagramConsent';
import { EmbedTwitterConsent } from './EmbedTwitterConsent';
import { EmbedFacebookConsent } from './EmbedFacebookConsent';
import { EmbedYoutubeConsent } from './EmbedYoutubeConsent';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

export default {
  title: 'Embeds | Vendors',
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStory = ({ component, vendorId, content }) => ({
  components: { component },
  store,
  props: {
    content: {
      default: text('Embed Content', content),
    },
    cmpEnabled: {
      default: boolean('CMP Enabled', true),
    },
    consent: {
      default: boolean('Consent', store.getters['sourcepoint/hasVendorConsent']({ _id: vendorId })),
    },
    socialConsent: {
      default: boolean(
        'Consent Social Networks',
        store.getters['sourcepoint/hasPurposeConsent']({ _id: PURPOSE_ID_SOCIAL }),
      ),
    },
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    cmpEnabled(value) {
      store.commit('sourcepoint/setCmpEnabled', value);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    consent(value) {
      const payload = value ? [{ _id: vendorId }] : [];
      store.commit('sourcepoint/setVendorConsents', payload);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    socialConsent(value) {
      const payload = value ? [{ _id: PURPOSE_ID_SOCIAL }] : [];
      store.commit('sourcepoint/setPurposeConsents', payload);
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render(h) {
    return h(component, { props: { privacyManagerId: 1234, content } });
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Instagram = () =>
  createStory({ component: EmbedInstagramConsent, vendorId: VENDOR_ID_INSTAGRAM, content: 'Instagram content' });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Twitter = () =>
  createStory({ component: EmbedTwitterConsent, vendorId: VENDOR_ID_TWITTER, content: 'Twitter content' });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Facebook = () =>
  createStory({ component: EmbedFacebookConsent, vendorId: VENDOR_ID_FACEBOOK, content: 'Facebook content' });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Youtube = () =>
  createStory({ component: EmbedYoutubeConsent, vendorId: VENDOR_ID_YOUTUBE, content: 'Youtube content' });
