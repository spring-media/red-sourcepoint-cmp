import EmbedInstagramCmp from './EmbedInstagramCmp.vue';
import Vuex from 'vuex';
import Vue from 'vue';
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
  template: `<embed-instagram-cmp :privacy-manager-id="1234" :url="'https://some-instagram-post.com'"></embed-instagram-cmp>`,
});
