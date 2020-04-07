<script lang="ts">
import Vue from 'vue';
import { loadPrivacyManagerModal } from '../../../sourcepoint';

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
