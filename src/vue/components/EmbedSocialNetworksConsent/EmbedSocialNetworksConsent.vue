<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-social-networks-placeholder :privacy-manager-id="privacyManagerId" />
    </template>
    <template #enabledContent>
      <embed-content :content="content" />
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedSocialNetworksPlaceholder } from '../EmbedSocialNetworksPlaceholder';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';

type Props = {
  vendorId: string;
  content: string | null;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedSocialNetworksConsent',
  components: { ConsentWrapper, EmbedSocialNetworksPlaceholder, EmbedContent },
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
  },
});
</script>
