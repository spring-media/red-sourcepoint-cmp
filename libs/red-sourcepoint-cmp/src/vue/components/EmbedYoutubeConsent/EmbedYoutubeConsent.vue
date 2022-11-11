<template>
  <consent-wrapper
    :vendor-id="vendorId"
    :is-pur="isPur"
  >
    <template #disabledContent>
      <embed-youtube-placeholder-pur
        v-if="isPur"
        :vendor-id="vendorId"
        :privacy-manager-id="privacyManagerId"
        :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
        :class="teaserFormat"
      />
      <embed-youtube-placeholder
        v-else
        :privacy-manager-id="privacyManagerId"
        :vendor-id="vendorId"
        :class="teaserFormat"
      />
    </template>
    <template #enabledContent>
      <embed-content-pur
        :show-controls="isPur"
        :vendor-id="vendorId"
        :switch-label="'Youtube sperren'"
      >
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
  teaserFormat: string;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
  isPur: boolean;
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
    teaserFormat: {
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
    privacyManagerIdDenyTracking: {
      type: Number,
      required: true,
    },
    isPur: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
