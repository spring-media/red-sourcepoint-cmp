<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-instagram-placeholder :privacyManagerId="privacyManagerId"></embed-instagram-placeholder>
    </template>
    <template #enabledContent>
      <embed-instagram :content="content"></embed-instagram>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedInstagramPlaceholder } from '../EmbedInstagramPlaceholder';
import { EmbedInstagram } from '../EmbedInstagram';
import { VENDOR_ID_INSTAGRAM } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string;
  privacyManagerId: number;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedInstagramConsent',
  components: { EmbedInstagram, EmbedInstagramPlaceholder, ConsentWrapper },
  data: () => ({
    vendorId: VENDOR_ID_INSTAGRAM,
  }),
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
  },
});
</script>
