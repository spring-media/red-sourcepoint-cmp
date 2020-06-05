<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-twitter-placeholder :privacyManagerId="privacyManagerId"></embed-twitter-placeholder>
    </template>
    <template #enabledContent>
      <embed-content :content="content"></embed-content>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedTwitterPlaceholder } from '../EmbedTwitterPlaceholder';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';
import { VENDOR_ID_TWITTER } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
  name: 'EmbedTwitterConsent',
  components: { ConsentWrapper, EmbedTwitterPlaceholder, EmbedContent },
  data: () => ({
    vendorId: VENDOR_ID_TWITTER,
  }),
  props: {
    content: {
      type: String,
      default: '',
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
