<template>
  <consent-wrapper
    :vendor-id="vendorId"
    :is-pur="isPur"
  >
    <template #disabledContent>
      <embed-facebook-placeholder-pur
        v-if="isPur"
        :vendor-id="vendorId"
        :privacy-manager-id="privacyManagerId"
        :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
        :class="teaserFormat"
      />
      <embed-facebook-placeholder
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
        :switch-label="'Facebook sperren'"
      >
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
  teaserFormat: string;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
  isPur: boolean;
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
    teaserFormat: {
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
