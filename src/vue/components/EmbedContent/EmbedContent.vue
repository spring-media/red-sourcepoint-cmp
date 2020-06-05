<script lang="ts">
import Vue, { CreateElement, PropType, VNode } from 'vue';
import { getScriptSrcFromOembedHTML, loadScript } from '../../../embed-utils';

type Props = {
  content: string;
};

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedContent',
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
  async mounted() {
    const src = getScriptSrcFromOembedHTML(this.content);

    if (!src) {
      return;
    }

    try {
      await loadScript(src);

      this.$emit('scriptLoaded', { success: true, src });
    } catch (error) {
      this.$emit('scriptLoaded', { success: false, src, error });
    }
  },
  render(createElement: CreateElement): VNode {
    const { content } = this;

    return createElement('div', { domProps: { innerHTML: content } });
  },
});
</script>
