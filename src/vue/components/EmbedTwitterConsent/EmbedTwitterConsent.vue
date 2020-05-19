<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-twitter-placeholder :privacyManagerId="privacyManagerId"></embed-twitter-placeholder>
    </template>
    <template #enabledContent>
      <embed-twitter :content="content"></embed-twitter>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedTwitterPlaceholder } from '../EmbedTwitterPlaceholder';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedTwitter } from '../EmbedTwitter';
import { VENDOR_ID_TWITTER } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string;
  privacyManagerId: number;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedTwitterConsent',
  components: { ConsentWrapper, EmbedTwitter, EmbedTwitterPlaceholder },
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
