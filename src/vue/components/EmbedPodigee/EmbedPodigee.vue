<template>
  <embed-content
    :content="content"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedContent } from '../EmbedContent';

type Props = {
  content: string;
};

type Methods = {
  podigeeEvent: (event: MessageEvent) => void;
  addHeightStyle: (height: number) => void;
}

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, Methods, NonNullish, Props>({
  name: 'EmbedPodigee',
  components: { EmbedContent },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  beforeDestroy() {
      window.removeEventListener('message', this.podigeeEvent);
  },
  created() {
      window.addEventListener('message', this.podigeeEvent);
  },
  methods: {
    podigeeEvent(event) {
        const data = JSON.parse(event.data);        
        if (data && data.context === 'podigee' && data.height) {
            this.addHeightStyle(data.height);
        }
    },
    addHeightStyle(height) {
        if (this.$el.firstChild) {
            const element = this.$el.firstChild as HTMLElement;
            element.style.height = height + 'px';
        }
    },
  },
});
</script>
