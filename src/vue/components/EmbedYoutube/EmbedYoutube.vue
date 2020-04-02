<template>
  <div v-html="content"></div>
</template>

<script lang="ts">
import Vue from 'vue';

type Props = {
  content: string;
};

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedYoutube',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
});
</script>
