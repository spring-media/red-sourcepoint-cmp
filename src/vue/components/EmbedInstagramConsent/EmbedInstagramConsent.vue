<template>
  <embed-consent :vendorId="vendorId">
    <template #placeholder="{ loadPrivacyManagerModal }">
      <embed-instagram-placeholder
        @requestConsent="loadPrivacyManagerModal(privacyManagerId)"
      ></embed-instagram-placeholder>
    </template>
    <template #embed>
      <embed-instagram :content="content"></embed-instagram>
    </template>
  </embed-consent>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedConsent } from '../EmbedConsent';
import { EmbedInstagramPlaceholder } from '../EmbedInstagramPlaceholder';
import { EmbedInstagram } from '../EmbedInstagram';
import { VENDOR_ID_INSTAGRAM } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string | null;
  privacyManagerId: number;
}

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedInstagramConsent',
  components: { EmbedInstagram, EmbedInstagramPlaceholder, EmbedConsent },
  data: () => ({
    vendorId: VENDOR_ID_INSTAGRAM,
  }),
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
  },
});
</script>
