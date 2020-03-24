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

    const { html = '' } = await requestInstagramOEmbedData({ url: this.url }).catch(error => console.error(error));

    this.embedContent = html;
    this.$nextTick(() => processInstagramEmbeds());
  },
};
</script>
