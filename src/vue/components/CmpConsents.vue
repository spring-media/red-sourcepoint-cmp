<script>
export default {
  props: {
    consentedVendors: {
      type: Array,
      required: true,
    },
    consentedPurposes: {
      type: Array,
      required: true,
    },
    vendor: {
      type: Object,
    },
    purpose: {
      type: Object,
    },
  },
  render() {
    return null;
  },
};
</script>
