<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPur">
    <template #disabledContent>
      <embed-placeholder-pur
        v-if="isPur"
        :privacy-manager-id="privacyManagerId"
        :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
        :vendor-id="vendorId"
      />
      <embed-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
    </template>
    <template #enabledContent>
      <embed-content-pur :show-controls="isPur" :vendor-id="vendorId" :switch-label="'Externen Inhalt sperren'">
        <slot name="embed">
          <embed-content :content="content" />
        </slot>
      </embed-content-pur>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedPlaceholder } from '../EmbedPlaceholder';
import { EmbedPlaceholderPur } from '../EmbedPlaceholderPur';
import { EmbedContent } from '../EmbedContent';
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
  name: 'EmbedConsent',
  components: { EmbedPlaceholder, ConsentWrapper, EmbedContent, EmbedPlaceholderPur, EmbedContentPur },
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
