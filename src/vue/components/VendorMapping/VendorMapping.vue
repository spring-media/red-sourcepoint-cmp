<script lang="ts">
import Vue from 'vue';
import {
  getVendorIdByName,
  getPurposeNameById,
  getVendorNameById,
  getPurposeIdByName,
  getVendorPurposesById,
  getVendorPurposesByName,
} from '../../../vendor-mapping';

export default Vue.extend({
  name: 'VendorMapping',
  render() {
    return (
      this.$scopedSlots.default &&
      (this.$scopedSlots.default!({
        getVendorIdByName,
        getPurposeNameById,
        getVendorNameById,
        getPurposeIdByName,
        getVendorPurposesById,
        getVendorPurposesByName,
      }) as any)
    );
  },
});
</script>
