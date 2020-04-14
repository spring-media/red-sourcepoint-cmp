<template>
  <div v-html="content"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { processEmbedContent } from '../../../embed-utils/instagram';

type Data = {
  embedContent: string;
};

type Props = {
  content: string;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedInstagram',
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
