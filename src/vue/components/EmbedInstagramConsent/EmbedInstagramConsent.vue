<template>
  <consent-wrapper :vendor-id="vendorId" :is-pur="isPUR">
    <template #disabledContent>
      <embed-instagram-placeholder-pur v-if="isPUR" :vendor-id="vendorId" />
      <embed-instagram-placeholder v-else :privacy-manager-id="privacyManagerId" :vendor-id="vendorId" />
    </template>
    <template #enabledContent>
      <embed-content-pur :show-controls="isPUR" :vendor-id="vendorId" :switch-label="'Instagram'">
        <embed-instagram :content="content" />
      </embed-content-pur>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedInstagramPlaceholder } from '../EmbedInstagramPlaceholder';
import { EmbedInstagramPlaceholderPur } from '../EmbedInstagramPlaceholderPur';
import { EmbedInstagram } from '../EmbedInstagram';
import { VENDOR_ID_INSTAGRAM } from '../../../vendor-mapping';
import { EmbedContentPur } from '../EmbedContentPur';

type Props = {
  vendorId: string;
  content: string;
  privacyManagerId: number;
  isPUR: boolean;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedInstagramConsent',
  components: {
    EmbedInstagram,
    EmbedInstagramPlaceholder,
    ConsentWrapper,
    EmbedInstagramPlaceholderPur,
    EmbedContentPur,
  },
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
    isPUR: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
