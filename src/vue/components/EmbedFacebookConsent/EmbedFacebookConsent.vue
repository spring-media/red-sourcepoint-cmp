<template>
  <consent-wrapper :vendor-id="vendorId">
    <template #disabledContent>
      <embed-facebook-placeholder
        :privacy-manager-id="privacyManagerId"
        :vendor-id="vendorId"
      />
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

type Props = {
  vendorId: string;
  content: string | null;
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedFacebookConsent',
  components: { ConsentWrapper, EmbedFacebookPlaceholder, EmbedContent },
  props: {
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_FACEBOOK,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
