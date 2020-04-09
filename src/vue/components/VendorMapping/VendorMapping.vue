<script lang="ts">
import Vue from 'vue';
import {
  getCustomVendor,
  getCustomPurpose,
  removeCustomPurpose,
  removeCustomVendor,
  getRelations,
  setRelations,
  hasRelations,
  addCustomPurpose,
  addCustomVendor,
} from '../../../vendor-mapping';

export default Vue.extend({
  name: 'VendorMapping',
  render() {
    return (
      this.$scopedSlots.default &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (this.$scopedSlots.default!({
        getCustomVendor,
        getCustomPurpose,
        removeCustomPurpose,
        removeCustomVendor,
        getRelations,
        setRelations,
        hasRelations,
        addCustomPurpose,
        addCustomVendor,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any)
    );
  },
});
</script>
