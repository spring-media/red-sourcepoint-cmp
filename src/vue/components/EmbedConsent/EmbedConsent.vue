<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-placeholder
        :privacy-manager-id="privacyManagerId"
        :vendor-id="vendorId"
      />
    </template>
    <template #enabledContent>
      <slot name="embed">
        <embed-content :content="content" />
      </slot>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedPlaceholder } from '../EmbedPlaceholder';
import { EmbedContent } from '../EmbedContent';

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedConsent',
  components: { EmbedPlaceholder, ConsentWrapper, EmbedContent },
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
