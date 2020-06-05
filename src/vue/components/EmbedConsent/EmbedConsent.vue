<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-placeholder :privacyManagerId="privacyManagerId"></embed-placeholder>
    </template>
    <template #enabledContent>
      <embed-content :content="content"></embed-content>
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

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedInstagramConsent',
  components: { EmbedPlaceholder, ConsentWrapper, EmbedContent },
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      required: true,
    },
  },
});
</script>
