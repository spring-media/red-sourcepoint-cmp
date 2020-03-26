<template>
  <vendor-mapping v-slot="{ getVendorPurposesById }">
    <cmp-consents :vendor-id="instagram" :purpose-ids="getVendorPurposesById(instagram)">
      <template #reject>
        <privacy-manager v-slot="{ loadModal }">
          <embed-placeholder-instagram @requestConsent="loadModal(privacyManagerId)"></embed-placeholder-instagram>
        </privacy-manager>
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
import PrivacyManager from '../PrivacyManager/PrivacyManager.vue';
import { VENDOR_ID_INSTAGRAM } from '../../../vendor-mapping';

export default {
  name: 'EmbedInstagramCmp',
  components: { PrivacyManager, VendorMapping, EmbedInstagram, EmbedPlaceholderInstagram, CmpConsents },
  data: () => ({
    instagram: VENDOR_ID_INSTAGRAM,
  }),
  props: {
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
