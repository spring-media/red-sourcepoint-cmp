<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    vendor: {
      type: Object,
      default: () => ({}),
    },
    purpose: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('sourcepoint', ['hasVendorConsent', 'hasPurposeConsent']),
  },
  methods: {
    hasConsent() {
      return this.hasVendorConsent(this.vendor) || this.hasPurposeConsent(this.purpose);
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
