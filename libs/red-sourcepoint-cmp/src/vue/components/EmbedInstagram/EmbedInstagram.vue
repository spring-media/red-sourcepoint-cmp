<template>
  <embed-content
    :content="content"
    @script-loaded="scriptLoaded"
  />
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

type Methods = {
  scriptLoaded: () => void;
}

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, Methods, NonNullish, Props>({
  name: 'EmbedInstagram',
  components: { EmbedContent },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    scriptLoaded() {
      window.instgrm?.Embeds?.process();
    },
  },
});
</script>
