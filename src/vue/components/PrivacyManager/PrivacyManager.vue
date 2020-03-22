<script>
import { loadPrivacyManagerModal } from '../../../tcf-v2/index.ts';

export default {
  name: 'PrivacyManager',
  render() {
    return this.$scopedSlots.default({
      loadModal: managerId => loadPrivacyManagerModal(managerId),
    });
  },
};
</script>
