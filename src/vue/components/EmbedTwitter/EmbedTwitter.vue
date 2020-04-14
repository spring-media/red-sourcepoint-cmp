<template>
  <div ref="container" v-html="content"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { processEmbedContent } from '../../../embed-utils/twitter';

type Props = {
  content: string;
};

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedTwitter',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  async mounted() {
    await processEmbedContent(this.content, this.$refs.container as HTMLElement);
  },
});
</script>
