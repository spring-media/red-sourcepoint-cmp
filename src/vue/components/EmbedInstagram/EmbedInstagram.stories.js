import EmbedInstagramCmp from './EmbedInstagramCmp.vue';
import Vuex from 'vuex';
import Vue from 'vue';
import { text, boolean } from '@storybook/addon-knobs';
import { sourcepoint } from '../../vuex-module';

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
  },
  watch: {
    cmpEnabled(value) {
      store.commit('sourcepoint/setCmpEnabled', value);
    },
  },
  template: `<embed-instagram-cmp :privacy-manager-id="1234" :url="url"></embed-instagram-cmp>`,
});
