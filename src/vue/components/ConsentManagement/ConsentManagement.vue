<script lang="ts">
import Vue, { VNode } from 'vue';
import { mapGetters } from 'vuex';
import {CustomPurpose, CustomVendor} from "../../../sourcepoint/typings";

type Props = {
  vendorId: string;
  purposeIds: string[];
};

type Computed = {
  hasCustomVendorConsent(vendor: CustomVendor): boolean;
  hasCustomPurposeConsent(purpose: CustomPurpose): boolean;
};

type Methods = {
  hasConsent(): boolean;
};

export default Vue.extend<{}, Methods, Computed, Props>({
  name: 'ConsentManagement',
  props: {
    vendorId: {
      type: String,
      required: true,
    },
    purposeIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('sourcepoint', ['hasCustomVendorConsent', 'hasCustomPurposeConsent']),
  },
  methods: {
    hasConsent(): boolean {
      return (
        this.hasCustomVendorConsent({ _id: this.vendorId }) ||
        this.purposeIds.some(purpose => this.hasCustomPurposeConsent({ _id: purpose }))
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
