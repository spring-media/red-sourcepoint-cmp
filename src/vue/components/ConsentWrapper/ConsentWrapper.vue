<script lang="ts">
import { mapGetters } from 'vuex';
import Vue, { VNode } from 'vue';

type Props = {
  vendorId: string;
};

type Computed = {
  vendorHasConsent(vendorId: string): boolean;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, Computed, Props>({
  name: 'ConsentManagement',
  props: {
    vendorId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({ vendorHasConsent: 'sourcepoint/vendorHasConsent' }),
  },
  render(): VNode {
    if (this.$scopedSlots.enabledContent && this.vendorHasConsent(this.vendorId)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.$scopedSlots.enabledContent({}) as any;
    }

    if (this.$scopedSlots.disabledContent) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.$scopedSlots.disabledContent({}) as any;
    }

    return {} as VNode;
  },
});
</script>
