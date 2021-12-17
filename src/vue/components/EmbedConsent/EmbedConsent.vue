<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPur">
    <template #disabledContent>
      <embed-placeholder-pur v-if="isPur" :vendor-id="vendorId" />
      <embed-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
    </template>
    <template #enabledContent>
      <slot name="embed">
        <embed-content-pur :show-controls="isPur" :vendor-id="vendorId" :switch-label="'Drittanbieter sperren'">
          <embed-content :content="content" />
        </embed-content-pur>
      </slot>
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
    isPur: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
