<template>
  <div v-html="embedContent"></div>
</template>

<script>
import { requestInstagramOEmbedData, processInstagramEmbeds, loadInstagramJsLibrary } from '../../../embed-utils/index.ts';

export default {
  name: 'EmbedInstagram',
  data: () => ({
    embedContent: '',
  }),
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    await loadInstagramJsLibrary().catch(error => console.error(error));

    const result = await requestInstagramOEmbedData({ url: this.url, maxwidth: 500 }).catch(error => console.error(error));

    if (result) {
      this.embedContent = result.html;
      this.$nextTick(() => processInstagramEmbeds());
    }
  },
};
</script>
