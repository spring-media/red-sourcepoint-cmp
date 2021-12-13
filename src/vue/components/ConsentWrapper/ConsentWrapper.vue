<script lang="ts">
import { mapGetters } from 'vuex';
import Vue, { VNode } from 'vue';

type Props = {
  vendorId: string;
  isPur: boolean;
};

type Computed = {
  vendorHasConsent(vendorId: string): boolean;
  vendorHasConsentPUR(vendorId: string): boolean;
};

type Methods = {
  hasConsent(vendorId: string): boolean;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, Methods, Computed, Props>({
  name: 'ConsentManagement',
  props: {
    vendorId: {
      type: String,
      required: true,
    },
    isPur: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hasConsent(vendorId: string) {
      if (this.isPur) {
        return this.vendorHasConsentPUR(vendorId);
      }

      return this.vendorHasConsent(vendorId);
    },
  },
  computed: {
    ...mapGetters({
      vendorHasConsent: 'sourcepoint/vendorHasConsent',
      vendorHasConsentPUR: 'sourcepoint/vendorHasConsentPUR',
    }),
  },
  render(): VNode {
    if (this.$scopedSlots.enabledContent && this.hasConsent(this.vendorId)) {
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
