<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPur">
    <template #disabledContent>
      <embed-podigee-placeholder-pur
        v-if="isPur"
        :vendor-id="vendorId"
        :privacy-manager-id="privacyManagerId"
        :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
      />
      <embed-podigee-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
    </template>
    <template #enabledContent>
      <slot name="embed">
        <embed-content-pur :show-controls="isPur" :vendor-id="vendorId" :switch-label="'Externen Inhalt sperren'">
          <embed-podigee :content="content" />
        </embed-content-pur>
      </slot>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedPodigeePlaceholder } from '../EmbedPodigeePlaceholder';
import { EmbedPodigeePlaceholderPur } from '../EmbedPodigeePlaceholderPur';
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
    EmbedPodigeePlaceholder,
    ConsentWrapper,
    EmbedPodigee,
    EmbedPodigeePlaceholderPur,
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
