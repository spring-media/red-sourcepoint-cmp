<template>
  <vendor-mapping v-slot="{ getRelations }">
    <consented-data v-slot="{ customVendors, customPurposes }">
      <consent-management
        :vendor-id="vendorId"
        :purpose-ids="getRelations(vendorId)"
        :custom-vendors="customVendors"
        :custom-purposes="customPurposes"
      >
        <template #onReject>
          <privacy-manager v-slot="{ loadPrivacyManagerModal }">
            <slot
              name="disabledContent"
              v-bind="{ loadPrivacyManagerModal }"
            />
          </privacy-manager>
        </template>
        <template #onConsent>
          <slot name="enabledContent" />
        </template>
      </consent-management>
    </consented-data>
  </vendor-mapping>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentManagement } from '../ConsentManagement';
import { VendorMapping } from '../VendorMapping';
import { PrivacyManager } from '../PrivacyManager';
import { ConsentedData } from '../ConsentedData';

type Props = {
  vendorId: string;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'ConsentWrapper',
  components: { PrivacyManager, VendorMapping, ConsentManagement, ConsentedData },
  props: {
    vendorId: {
      type: String,
      required: true,
    },
  },
});
</script>
