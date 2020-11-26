<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-youtube-placeholder
        :privacy-manager-id="privacyManagerId"
        :vendor-id="vendorId"
      />
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

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedYoutubeConsent',
  components: { ConsentWrapper, EmbedContent, EmbedYoutubePlaceholder },
  props: {
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_YOUTUBE,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
