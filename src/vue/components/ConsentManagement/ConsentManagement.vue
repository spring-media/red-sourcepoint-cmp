<script lang="ts">
import Vue, { VNode } from 'vue';
import { mapGetters } from 'vuex';
import { Purpose, Vendor } from '../../../types';

type Props = {
  vendorId: string | number;
  purposeIds: string[];
};

type Computed = {
  hasVendorConsent(vendor: Vendor): boolean;
  hasPurposeConsent(purpose: Purpose): boolean;
};

type Methods = {
  hasConsent(): boolean;
};

export default Vue.extend<{}, Methods, Computed, Props>({
  name: 'ConsentManagement',
  props: {
    vendorId: {
      type: [String, Number],
      required: true,
    },
    purposeIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('sourcepoint', ['hasVendorConsent', 'hasPurposeConsent']),
  },
  methods: {
    hasConsent(): boolean {
      return (
        this.hasVendorConsent({ _id: this.vendorId }) ||
        this.purposeIds.some(purpose => this.hasPurposeConsent({ _id: purpose }))
      );
    },
  },
  render(): VNode {
    if (this.hasConsent() && this.$scopedSlots.onConsent) {
      return this.$scopedSlots.onConsent({}) as any;
    }

    if (this.$scopedSlots.onReject) {
      return this.$scopedSlots.onReject({}) as any;
    }

    return {} as VNode;
  },
});
</script>
