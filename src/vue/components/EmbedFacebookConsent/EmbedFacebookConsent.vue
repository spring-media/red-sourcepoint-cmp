<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPUR">
    <template #disabledContent>
      <embed-facebook-placeholder-pur v-if="isPUR" :vendor-id="vendorId" />
      <embed-facebook-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
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
import { EmbedFacebookPlaceholder } from '../EmbedFacebookPlaceholder';
import { EmbedFacebookPlaceholderPur } from '../EmbedFacebookPlaceholderPur';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';
import { VENDOR_ID_FACEBOOK } from '../../../vendor-mapping';
import { EmbedContentPur } from '../EmbedContentPur';

type Props = {
  vendorId: string;
  content: string | null;
  privacyManagerId: number;
  isPUR: boolean;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedFacebookConsent',
  components: { ConsentWrapper, EmbedFacebookPlaceholder, EmbedContent, EmbedFacebookPlaceholderPur, EmbedContentPur },
  props: {
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_FACEBOOK,
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
