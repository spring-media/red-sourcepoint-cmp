<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-facebook-placeholder :privacyManagerId="privacyManagerId"></embed-facebook-placeholder>
    </template>
    <template #enabledContent>
      <embed-content :content="content"></embed-content>
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

export default Vue.extend<Data, {}, {}, Props>({
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
