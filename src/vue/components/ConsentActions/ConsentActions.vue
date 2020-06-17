<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { postCustomConsent } from '../../../sourcepoint';
import { PostCustomConsentPayload } from '../../../sourcepoint/typings';
import { dumpPurposeRelations, getPurposeIdsForVendor } from '../../../vendor-mapping';

type Methods = {
  customConsent(payload: PostCustomConsentPayload): Promise<void>;
  refreshConsents(): void;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, Methods, NonNullish, NonNullish>({
  name: 'ConsentActions',
  methods: {
    ...mapActions({ refreshConsents: 'sourcepoint/bootstrapConsents' }),
    async customConsent(payload: PostCustomConsentPayload) {
      try {
        await postCustomConsent(payload);
      } catch (e) {
        console.error(e.message);
      }

      this.refreshConsents();
    },
  },
  render() {
    return (
      this.$scopedSlots.default &&
      (this.$scopedSlots.default({
        consentPurpose: (id: string): Promise<void> => this.customConsent(dumpPurposeRelations(id)),
        consentVendor: (id: string): Promise<void> =>
          this.customConsent({ vendorIds: [id], purposeIds: getPurposeIdsForVendor(id) }),
        customConsent: (payload: PostCustomConsentPayload): Promise<void> => this.customConsent(payload),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any)
    );
  },
});
</script>