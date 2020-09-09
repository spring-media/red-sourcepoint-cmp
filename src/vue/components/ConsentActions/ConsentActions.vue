<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import { postCustomConsent } from '../../../sourcepoint';
import { PostCustomConsentPayload } from '../../../sourcepoint/typings';
import {
  configureGrants,
  dumpPurposeRelations,
  getGrantedVendors,
  getPurposesForVendor,
} from '../../../vendor-mapping';

type Methods = {
  customConsent(payload: PostCustomConsentPayload): Promise<void>;
  setGrantedVendors(payload: string[]): void;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, Methods, NonNullish, NonNullish>({
  name: 'ConsentActions',
  methods: {
    ...mapMutations({ setGrantedVendors: 'sourcepoint/setGrantedVendors' }),
    async customConsent(payload: PostCustomConsentPayload) {
      try {
        const { grants } = await postCustomConsent(payload);

        configureGrants(grants);

        this.setGrantedVendors(getGrantedVendors());
      } catch (e) {
        console.error(e);
      }
    },
  },
  render() {
    return (
      this.$scopedSlots.default &&
      (this.$scopedSlots.default({
        consentPurpose: (id: string): Promise<void> => this.customConsent(dumpPurposeRelations(id)),
        consentVendor: (id: string): Promise<void> =>
          this.customConsent({ ...getPurposesForVendor(id), vendorIds: [id] }),
        customConsent: (payload: PostCustomConsentPayload): Promise<void> => this.customConsent(payload),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any)
    );
  },
});
</script>
