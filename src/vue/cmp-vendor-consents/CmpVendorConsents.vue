<script lang="ts">
import Vue from 'vue';

export const CmpVendorConsent = Vue.extend({
  functional: true,
  props: {
    vendorId: {
      type: String,
      required: true,
    },
  },
  render() {
    return null;
  },
});
</script>
