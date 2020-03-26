<script>
import {
  getVendorIdByName,
  getPurposeNameById,
  getVendorNameById,
  getPurposeIdByName,
  getVendorPurposesById,
  getVendorPurposesByName,
} from '../../../vendor-mapping/index.ts';

export default {
  name: 'VendorMapping',
  render() {
    return this.$scopedSlots.default({
      getVendorIdByName,
      getPurposeNameById,
      getVendorNameById,
      getPurposeIdByName,
      getVendorPurposesById,
      getVendorPurposesByName,
    });
  },
};
</script>
