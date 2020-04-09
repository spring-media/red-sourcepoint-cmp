<script lang="ts">
import Vue from 'vue';
import { loadPrivacyManagerModal } from '../../../sourcepoint';

export default Vue.extend({
  name: 'PrivacyManager',
  render() {
    return (
      this.$scopedSlots.default &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (this.$scopedSlots.default!({
        loadPrivacyManagerModal,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any)
    );
  },
});
</script>
