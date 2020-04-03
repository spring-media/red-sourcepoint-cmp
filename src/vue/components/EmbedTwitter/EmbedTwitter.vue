<template>
  <div ref="container" v-html="embedContent"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getScriptSrcFromOembedHTML, loadTwitterJsLibrary, processTwitterEmbeds } from '../../../embed-utils';

type Data = {
  embedContent: string;
};

type Props = {
  content: string;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedTwitter',
  data: () => ({
    embedContent: '',
  }),
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  async mounted() {
    this.embedContent = this.content;

    if (this.embedContent) {
      await this.$nextTick();

      await loadTwitterJsLibrary(getScriptSrcFromOembedHTML(this.embedContent));

      processTwitterEmbeds(this.$refs.container as HTMLElement);
    }
  },
});
</script>
