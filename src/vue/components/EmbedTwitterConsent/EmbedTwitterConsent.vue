<template>
  <embed-consent :vendorId="vendorId">
    <template #placeholder>
      <embed-twitter-placeholder :privacyManagerId="privacyManagerId"></embed-twitter-placeholder>
    </template>
    <template #embed>
      <embed-twitter :content="content"></embed-twitter>
    </template>
  </embed-consent>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedTwitterPlaceholder } from '../EmbedTwitterPlaceholder';
import { EmbedConsent } from '../EmbedConsent';
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
  components: { EmbedConsent, EmbedTwitter, EmbedTwitterPlaceholder },
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
