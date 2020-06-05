<template>
  <embed-content :content="content" @scriptLoaded="scriptLoaded"></embed-content>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedContent } from '../EmbedContent';

type Data = {
  embedContent: string;
};

type Props = {
  content: string;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedInstagram',
  components: { EmbedContent },
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  methods: {
    scriptLoaded() {
      window.instgrm?.Embeds?.process();
    },
  },
});
</script>
