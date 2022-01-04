<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPur">
    <template #disabledContent>
      <embed-twitter-placeholder-pur
        v-if="isPur"
        :vendor-id="vendorId"
        :privacy-manager-id="privacyManagerId"
        :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
      />
      <embed-twitter-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
    </template>
    <template #enabledContent>
      <embed-content-pur :show-controls="isPur" :vendor-id="vendorId" :switch-label="'Twitter sperren'">
        <embed-content :content="content" />
      </embed-content-pur>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedTwitterPlaceholder } from '../EmbedTwitterPlaceholder';
import { EmbedTwitterPlaceholderPur } from '../EmbedTwitterPlaceholderPur';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';
import { VENDOR_ID_TWITTER } from '../../../vendor-mapping';
import { EmbedContentPur } from '../EmbedContentPur';

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
  isPur: boolean;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedTwitterConsent',
  components: { ConsentWrapper, EmbedTwitterPlaceholder, EmbedContent, EmbedTwitterPlaceholderPur, EmbedContentPur },
  props: {
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_TWITTER,
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
