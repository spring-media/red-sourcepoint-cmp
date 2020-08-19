<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-social-networks-placeholder :privacy-manager-id="privacyManagerId" />
    </template>
    <template #enabledContent>
      <slot name="embed">
        <embed-podigee :content="content" />
      </slot>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedSocialNetworksPlaceholder } from '../EmbedSocialNetworksPlaceholder';
import { EmbedPodigee } from '../EmbedPodigee';

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedPodigeeConsent',
  components: { EmbedSocialNetworksPlaceholder, ConsentWrapper, EmbedPodigee },
  props: {
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      required: true,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
