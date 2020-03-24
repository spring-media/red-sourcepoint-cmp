<template>
  <vendor-mapping v-slot="{ getVendorByName, getPurposeByName }">
    <cmp-consents
      :vendor="getVendorByName('instagram')"
      :purposes="[getPurposeByName('social')]"
      :cmp-enabled="cmpEnabled"
    >
      <template #reject>
        <embed-placeholder-instagram :privacy-manager-id="privacyManagerId"></embed-placeholder-instagram>
      </template>
      <template #consent>
        <embed-instagram :url="url"></embed-instagram>
      </template>
    </cmp-consents>
  </vendor-mapping>
</template>

<script>
import { CmpConsents } from '../CmpConsents/index';
import { EmbedPlaceholderInstagram } from '../EmbedPlaceholderInstagram/index';
import EmbedInstagram from './EmbedInstagram.vue';
import VendorMapping from '../VendorMapping/VendorMapping.vue';

export default {
  name: 'EmbedInstagramCmp',
  components: { VendorMapping, EmbedInstagram, EmbedPlaceholderInstagram, CmpConsents },
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
};
</script>
