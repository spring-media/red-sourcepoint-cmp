<template>
  <div v-html="content"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { processIframelyEmbedContent } from '../../../embed-utils';

type Props = {
  content: string;
};

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedFacebook',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  mounted() {
    processIframelyEmbedContent(this.content);
  },
});
</script>
