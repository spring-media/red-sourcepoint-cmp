<script lang="ts">
import Vue from 'vue';
import { loadPrivacyManagerModal } from '../../../tcf-v2';

export default Vue.extend({
  name: 'PrivacyManager',
  render() {
    return (
      this.$scopedSlots.default &&
      (this.$scopedSlots.default!({
        loadPrivacyManagerModal,
      }) as any)
    );
  },
});
</script>
