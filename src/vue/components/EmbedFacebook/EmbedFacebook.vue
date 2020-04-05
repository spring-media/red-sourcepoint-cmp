<template>
  <div v-html="embedContent"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { getScriptSrcFromOembedHTML, loadIframelyEmbedsLibrary, processIframelyEmbeds } from '../../../embed-utils';

  type Data = {
    embedContent: string;
  };

  type Props = {
    content: string;
  };

  export default Vue.extend<Data, {}, {}, Props>({
    name: 'EmbedFacebook',
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

        await loadIframelyEmbedsLibrary(getScriptSrcFromOembedHTML(this.embedContent));

        processIframelyEmbeds();
      }
    },
  });
</script>
