<script>
import { mapGetters, mapState } from 'vuex';

export default {
  props: {
    vendorId: {
      type: String,
      default: '',
    },
    purposeIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('sourcepoint', ['hasVendorConsent', 'hasPurposeConsent']),
    ...mapState('sourcepoint', ['cmpEnabled']),
  },
  methods: {
    hasConsent() {
      if (!this.cmpEnabled) {
        return true;
      }

      return (
        this.hasVendorConsent({ _id: this.vendorId }) ||
        this.purposeIds.some(purpose => this.hasPurposeConsent({ _id: purpose }))
      );
    },
  },
  render() {
    if (this.hasConsent() && this.$scopedSlots.consent) {
      return this.$scopedSlots.consent();
    }

    return this.$scopedSlots.reject && this.$scopedSlots.reject();
  },
};
</script>
