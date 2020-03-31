<template>
  <vendor-mapping v-slot="{ getVendorPurposesById }">
    <consent-management :vendorId="vendorId" :purposeIds="getVendorPurposesById(vendorId)">
      <template #onReject>
        <privacy-manager v-slot="{ loadPrivacyManagerModal }">
          <slot name="placeholder" v-bind="{ loadPrivacyManagerModal }"></slot>
        </privacy-manager>
      </template>
      <template #onConsent>
        <slot name="embed"></slot>
      </template>
    </consent-management>
  </vendor-mapping>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentManagement } from '../ConsentManagement';
import { VendorMapping } from '../VendorMapping';
import { PrivacyManager } from '../PrivacyManager';

type Props = {
  vendorId: string;
}

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedConsent',
  components: { PrivacyManager, VendorMapping, ConsentManagement },
  props: {
    vendorId: {
      type: String,
      required: true,
    },
  },
});
</script>
