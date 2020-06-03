<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-placeholder :privacyManagerId="privacyManagerId"></embed-placeholder>
    </template>
    <template #enabledContent>
      <div v-html="content"></div>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedPlaceholder } from '../EmbedPlaceholder';

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
};

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedInstagramConsent',
  components: { EmbedPlaceholder, ConsentWrapper },
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
