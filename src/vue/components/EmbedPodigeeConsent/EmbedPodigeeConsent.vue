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
      <slot name="embed">
        <embed-content-pur :show-controls="isPur" :vendor-id="vendorId">
          <embed-podigee :content="content" />
        </embed-content-pur>
      </slot>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedSocialNetworksPlaceholder } from '../EmbedSocialNetworksPlaceholder';
import { EmbedSocialNetworksPlaceholderPur } from '../EmbedSocialNetworksPlaceholderPur';
import { EmbedPodigee } from '../EmbedPodigee';
import { VENDOR_ID_PODIGEE } from '../../../vendor-mapping';
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
  name: 'EmbedPodigeeConsent',
  components: {
    EmbedSocialNetworksPlaceholder,
    ConsentWrapper,
    EmbedPodigee,
    EmbedSocialNetworksPlaceholderPur,
    EmbedContentPur,
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_PODIGEE,
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
