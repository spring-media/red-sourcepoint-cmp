<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-instagram-placeholder
        :privacy-manager-id="privacyManagerId"
        :vendor-id="vendorId"
      />
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

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedInstagramConsent',
  components: { EmbedInstagram, EmbedInstagramPlaceholder, ConsentWrapper },
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_INSTAGRAM,
    },
    content: {
      type: String,
      default: '',
    },
  },
});
</script>
