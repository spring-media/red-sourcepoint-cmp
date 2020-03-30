<template>
  <vendor-mapping v-slot="{ getVendorPurposesById }">
    <cmp-consents :vendor-id="vendorId" :purpose-ids="getVendorPurposesById(vendorId)">
      <template #onReject>
        <privacy-manager v-slot="{ loadModal }">
          <embed-placeholder-instagram @requestConsent="loadModal(privacyManagerId)"></embed-placeholder-instagram>
        </privacy-manager>
      </template>
      <template #onConsent>
        <embed-instagram :url="url" :content="content"></embed-instagram>
      </template>
    </cmp-consents>
  </vendor-mapping>
</template>

<script lang="ts">
import Vue from 'vue';
import { CmpConsents } from '../CmpConsents';
import { EmbedPlaceholderInstagram } from '../EmbedPlaceholder';
import { EmbedInstagram } from './';
import { VendorMapping } from '../VendorMapping';
import { PrivacyManager } from '../PrivacyManager';
import { VENDOR_ID_INSTAGRAM } from '../../../vendor-mapping';

export default Vue.extend({
  name: 'EmbedInstagramCmp',
  components: { PrivacyManager, VendorMapping, EmbedInstagram, EmbedPlaceholderInstagram, CmpConsents },
  data: () => ({
    vendorId: VENDOR_ID_INSTAGRAM,
  }),
  props: {
    url: {
      type: String,
      default: null,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: null,
    }
  },
});
</script>
