<template>
  <div v-html="embedContent"></div>
</template>

<script lang="ts">
import Vue from 'vue';

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
  mounted() {
    this.embedContent = this.content;
  },
});
</script>
