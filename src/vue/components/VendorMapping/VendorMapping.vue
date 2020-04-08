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
      }) as any)
    );
  },
});
</script>
