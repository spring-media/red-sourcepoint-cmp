<template>
  <embed-consent :vendorId="vendorId">
    <template #placeholder="{ loadPrivacyManagerModal }">
      <embed-youtube-placeholder
        @requestConsent="loadPrivacyManagerModal(privacyManagerId)"
      ></embed-youtube-placeholder>
    </template>
    <template #embed>
      <embed-twitter :content="content"></embed-twitter>
    </template>
  </embed-consent>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedYoutubePlaceholder } from '../EmbedYoutubePlaceholder';
import { EmbedConsent } from '../EmbedConsent';
import { EmbedTwitter } from '../EmbedTwitter';
import { VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string | null;
  privacyManagerId: number;
}

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedTwitterConsent',
  components: { EmbedConsent, EmbedTwitter, EmbedYoutubePlaceholder },
  data: () => ({
    vendorId: VENDOR_ID_YOUTUBE,
  }),
  props: {
    content: {
      type: String,
      default: null,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
