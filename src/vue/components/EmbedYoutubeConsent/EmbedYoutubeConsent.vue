<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-youtube-placeholder :privacyManagerId="privacyManagerId"></embed-youtube-placeholder>
    </template>
    <template #enabledContent>
      <embed-content :content="content"></embed-content>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedYoutubePlaceholder } from '../EmbedYoutubePlaceholder';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';
import { VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string;
  privacyManagerId: number;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedYoutubeConsent',
  components: { ConsentWrapper, EmbedContent, EmbedYoutubePlaceholder },
  data: () => ({
    vendorId: VENDOR_ID_YOUTUBE,
  }),
  props: {
    content: {
      type: String,
      default: '',
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
