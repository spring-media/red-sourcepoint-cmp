<template>
  <embed-consent :vendorId="vendorId">
    <template #placeholder>
      <embed-youtube-placeholder :privacyManagerId="privacyManagerId"></embed-youtube-placeholder>
    </template>
    <template #embed>
      <embed-youtube :content="content"></embed-youtube>
    </template>
  </embed-consent>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedYoutubePlaceholder } from '../EmbedYoutubePlaceholder';
import { EmbedConsent } from '../EmbedConsent';
import { EmbedYoutube } from '../EmbedYoutube';
import { VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string | null;
  privacyManagerId: number;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedYoutubeConsent',
  components: { EmbedConsent, EmbedYoutube, EmbedYoutubePlaceholder },
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
