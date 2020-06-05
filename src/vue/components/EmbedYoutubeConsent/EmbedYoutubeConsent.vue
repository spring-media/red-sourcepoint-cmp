<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-youtube-placeholder :privacy-manager-id="privacyManagerId" />
    </template>
    <template #enabledContent>
      <embed-content :content="content" />
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

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
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
