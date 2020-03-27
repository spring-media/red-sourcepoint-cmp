<template>
  <div v-html="embedContent"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { requestInstagramOEmbedData, processInstagramEmbeds, loadInstagramJsLibrary } from '../../../embed-utils';

export default Vue.extend({
  name: 'EmbedInstagram',
  data: () => ({
    embedContent: '',
  }),
  props: {
    url: {
      type: String,
    },
    maxWidth: {
      type: Number,
      default: 500,
    },
    omitScript: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '',
    },
  },
  async mounted() {
    this.embedContent = this.content;

    await loadInstagramJsLibrary().catch(error => console.error(error));

    // If (oembed) content is already provided, we don't need to request the content from Instagram again.
    if (this.embedContent) {
      return this.$nextTick(() => processInstagramEmbeds());
    }

    const result = await requestInstagramOEmbedData({
      url: this.url,
      maxwidth: this.maxWidth,
      omitscript: this.omitScript,
    }).catch(error => console.error(error));

    if (result) {
      this.embedContent = result.html;
      this.$nextTick(() => processInstagramEmbeds());
    }
  },
});
</script>
