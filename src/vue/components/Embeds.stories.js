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
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStory = ({ cmp, vendorId, embedContent }) => ({
  components: { cmp },
  store,
  props: {
    content: {
      default: text('Embed Content', embedContent),
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
    return h(cmp, { props: { privacyManagerId: 1234, content: this.content } });
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Instagram = () =>
  createStory({ cmp: EmbedInstagramConsent, vendorId: VENDOR_ID_INSTAGRAM, embedContent: 'Instagram content' });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Twitter = () =>
  createStory({ cmp: EmbedTwitterConsent, vendorId: VENDOR_ID_TWITTER, embedContent: 'Twitter content' });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Facebook = () =>
  createStory({ cmp: EmbedFacebookConsent, vendorId: VENDOR_ID_FACEBOOK, embedContent: 'Facebook content' });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Youtube = () =>
  createStory({ cmp: EmbedYoutubeConsent, vendorId: VENDOR_ID_YOUTUBE, embedContent: 'Youtube content' });
