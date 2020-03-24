<template>
  <cmp-consents :vendor="getVendorFromMap('instagram')" :purposes="[getPurposeFromMap('socialMedia')]">
    <template #reject>
      <embed-placeholder-instagram :privacy-manager-id="privacyManagerId"></embed-placeholder-instagram>
    </template>
    <template #consent>
      <embed-instagram :url="url"></embed-instagram>
    </template>
  </cmp-consents>
</template>

<script>
import { mapGetters } from 'vuex';
import { CmpConsents } from '../CmpConsents/index';
import { EmbedPlaceholderInstagram } from '../EmbedPlaceholderInstagram/index';
import EmbedInstagram from './EmbedInstagram.vue';

export default {
  name: 'EmbedInstagramCmp',
  components: { EmbedInstagram, EmbedPlaceholderInstagram, CmpConsents },
  props: {
    cmpEnabled: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      required: true,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('sourcepoint', ['getVendorFromMap', 'getPurposeFromMap']),
  },
};
</script>
