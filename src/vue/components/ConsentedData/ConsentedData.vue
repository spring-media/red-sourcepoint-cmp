<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'ConsentedData',
  computed: {
    ...mapState('sourcepoint', ['consentedCustomVendors', 'consentedCustomPurposes']),
  },
  render() {
    const { consentedCustomVendors: customVendors, consentedCustomPurposes: customPurposes } = this;

    return (
      this.$scopedSlots.default &&
      (this.$scopedSlots.default({
        customVendors,
        customPurposes,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any)
    );
  },
});
</script>
