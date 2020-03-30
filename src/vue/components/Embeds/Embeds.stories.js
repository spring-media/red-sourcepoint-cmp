import EmbedInstagramCmp from './EmbedInstagramCmp.vue';
import Vuex from 'vuex';
import Vue from 'vue';
import { text, boolean } from '@storybook/addon-knobs';
import { sourcepoint } from '../../vuex/sourcepoint';
import { PURPOSE_ID_SOCIAL, VENDOR_ID_INSTAGRAM } from '../../../vendor-mapping';

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
export const Instagram = () => ({
  components: { EmbedInstagramCmp },
  store,
  props: {
    url: {
      default: text('Embed URL', 'https://www.instagram.com/p/B1EnQzZn3e2/'),
    },
    cmpEnabled: {
      default: boolean('CMP Enabled', true),
    },
    instagramConsent: {
      default: boolean('Consent Instagram', false),
    },
    socialConsent: {
      default: boolean('Consent Social Networks', false),
    },
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    cmpEnabled(value) {
      store.commit('sourcepoint/setCmpEnabled', value);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    instagramConsent(value) {
      const payload = value ? [{ _id: VENDOR_ID_INSTAGRAM }] : [];
      store.commit('sourcepoint/setVendorConsents', payload);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    socialConsent(value) {
      const payload = value ? [{ _id: PURPOSE_ID_SOCIAL }] : [];
      store.commit('sourcepoint/setPurposeConsents', payload);
    },
  },
  template: `<embed-instagram-cmp :privacy-manager-id="1234" :url="url"></embed-instagram-cmp>`,
});
