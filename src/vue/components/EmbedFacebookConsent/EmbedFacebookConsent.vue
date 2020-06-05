<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-facebook-placeholder :privacy-manager-id="privacyManagerId" />
    </template>
    <template #enabledContent>
      <embed-content :content="content" />
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedFacebookPlaceholder } from '../EmbedFacebookPlaceholder';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedContent } from '../EmbedContent';
import { VENDOR_ID_FACEBOOK } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string | null;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
  name: 'EmbedFacebookConsent',
  components: { ConsentWrapper, EmbedFacebookPlaceholder, EmbedContent },
  data: () => ({
    vendorId: VENDOR_ID_FACEBOOK,
  }),
  props: {
    content: {
      type: String,
      default: null,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
