<script>
import { mapGetters, mapState } from 'vuex';

export default {
  props: {
    vendor: {
      type: Object,
      default: () => ({}),
    },
    purposes: {
      type: Array,
      default: () => ([]),
    }
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

      return this.hasVendorConsent(this.vendor) || this.purposes.some(purpose => this.hasPurposeConsent(purpose));
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
