<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPur">
    <template #disabledContent>
      <embed-social-networks-placeholder-pur
        v-if="isPur"
        :vendor-id="vendorId"
        :privacy-manager-id="privacyManagerId"
        :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
      />
      <embed-social-networks-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
    </template>
    <template #enabledContent>
      <embed-content-pur :show-controls="isPur" :vendor-id="vendorId" :switch-label="'Soziales Netzwerk sperren'">
        <embed-content :content="content" />
      </embed-content-pur>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedSocialNetworksPlaceholder } from '../EmbedSocialNetworksPlaceholder';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';
import { EmbedSocialNetworksPlaceholderPur } from '../EmbedSocialNetworksPlaceholderPur';
import { EmbedContentPur } from '../EmbedContentPur';

type Props = {
  vendorId: string;
  content: string | null;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
  isPur: boolean;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedSocialNetworksConsent',
  components: {
    ConsentWrapper,
    EmbedSocialNetworksPlaceholder,
    EmbedContent,
    EmbedSocialNetworksPlaceholderPur,
    EmbedContentPur,
  },
  props: {
    vendorId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: null,
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
