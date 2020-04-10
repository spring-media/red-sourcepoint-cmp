<template>
  <div ref="container" v-html="content"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { processTwitterEmbedContent } from '../../../embed-utils';

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
    await processTwitterEmbedContent(this.content, this.$refs.container as HTMLElement);
  },
});
</script>
