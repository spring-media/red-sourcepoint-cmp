<template>
  <div v-html="content"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { processEmbedContent } from '../../../embed-utils/iframely';

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
    processEmbedContent(this.content);
  },
});
</script>
