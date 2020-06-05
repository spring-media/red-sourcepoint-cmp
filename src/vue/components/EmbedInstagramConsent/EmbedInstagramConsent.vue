<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-instagram-placeholder :privacy-manager-id="privacyManagerId" />
    </template>
    <template #enabledContent>
      <embed-instagram :content="content" />
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

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
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
