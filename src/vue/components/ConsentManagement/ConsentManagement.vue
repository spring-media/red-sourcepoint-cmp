<script lang="ts">
import Vue, { VNode } from 'vue';
import { mapState } from 'vuex';
import { CustomPurpose, CustomVendor } from '../../../sourcepoint/typings';
import { hasCustomConsentById } from '../../../sourcepoint';

type Computed = {
  consentedCustomVendors: CustomVendor[];
  consentedCustomPurposes: CustomPurpose[];
};

type Props = {
  vendorId: string;
  purposeIds: string[];
};

type Methods = {
  hasConsent(): boolean;
  hasCustomVendorConsent(id: string): boolean;
  hasCustomPurposeConsent(id: string): boolean;
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
    ...mapState('sourcepoint', ['consentedCustomVendors', 'consentedCustomPurposes']),
  },
  methods: {
    hasCustomPurposeConsent(id: string): boolean {
      return hasCustomConsentById(id, this.consentedCustomPurposes);
    },
    hasCustomVendorConsent(id: string): boolean {
      return hasCustomConsentById(id, this.consentedCustomVendors);
    },
    hasConsent(): boolean {
      return (
        this.hasCustomVendorConsent(this.vendorId) || this.purposeIds.some((id) => this.hasCustomPurposeConsent(id))
      );
    },
  },
  render(): VNode {
    if (this.hasConsent() && this.$scopedSlots.onConsent) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.$scopedSlots.onConsent({}) as any;
    }

    if (this.$scopedSlots.onReject) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.$scopedSlots.onReject({}) as any;
    }

    return {} as VNode;
  },
});
</script>
