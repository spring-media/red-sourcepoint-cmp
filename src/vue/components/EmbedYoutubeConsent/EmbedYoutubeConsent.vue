<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPUR">
    <template #disabledContent>
      <embed-youtube-placeholder-pur v-if="isPUR" :vendor-id="vendorId" />
      <embed-youtube-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
    </template>
    <template #enabledContent>
      <embed-content-pur :show-controls="isPUR" :vendor-id="vendorId">
        <embed-content :content="content" />
      </embed-content-pur>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedYoutubePlaceholder } from '../EmbedYoutubePlaceholder';
import { EmbedYoutubePlaceholderPur } from '../EmbedYoutubePlaceholderPur';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';
import { VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';
import { EmbedContentPur } from '../EmbedContentPur';

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
  isPUR: boolean;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedYoutubeConsent',
  components: { ConsentWrapper, EmbedContent, EmbedYoutubePlaceholder, EmbedYoutubePlaceholderPur, EmbedContentPur },
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
    isPUR: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
