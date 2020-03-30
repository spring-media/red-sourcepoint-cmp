<script lang="ts">
import Vue, { VNode } from 'vue';
import { mapGetters, mapState } from 'vuex';
import { Purpose, Vendor } from '../../../types';

type Props = {
  vendorId: string;
  purposeIds: string[];
};

type Computed = {
  cmpEnabled: boolean;
  hasVendorConsent(vendor: Vendor): boolean;
  hasPurposeConsent(purpose: Purpose): boolean;
};

type Methods = {
  hasConsent(): boolean;
};

export default Vue.extend<{}, Methods, Computed, Props>({
  props: {
    vendorId: {
      type: String,
      default: '',
    },
    purposeIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('sourcepoint', ['hasVendorConsent', 'hasPurposeConsent']),
    ...mapState('sourcepoint', ['cmpEnabled']),
  },
  methods: {
    hasConsent(): boolean {
      if (!this.cmpEnabled) {
        return true;
      }

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
