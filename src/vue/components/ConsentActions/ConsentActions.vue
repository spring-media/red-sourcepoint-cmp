<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { postCustomConsent } from '../../../sourcepoint';
import { PostCustomConsentPayload } from '../../../sourcepoint/typings';

type Methods = {
  customConsent(payload: PostCustomConsentPayload): Promise<void>;
  refreshConsents(): void;
};

export default Vue.extend<{}, Methods, {}, {}>({
  name: 'ConsentActions',
  methods: {
    ...mapActions({ refreshConsents: 'sourcepoint/bootstrapConsents' }),
    async customConsent(payload: PostCustomConsentPayload) {
      try {
        await postCustomConsent(payload);
      } catch (e) {
        console.error('Could not create custom consent.');
        return;
      }

      this.refreshConsents();
    },
  },
  render() {
    return (
      this.$scopedSlots.default &&
      (this.$scopedSlots.default({
        consentCustomPurpose: (id: string) => this.customConsent({ purposeIds: [id] }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any)
    );
  },
});
</script>