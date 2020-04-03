<template>
  <embed-consent :vendorId="vendorId">
    <template #placeholder>
      <embed-facebook-placeholder :privacyManagerId="privacyManagerId"></embed-facebook-placeholder>
    </template>
    <template #embed>
      <embed-facebook :content="content"></embed-facebook>
    </template>
  </embed-consent>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedFacebookPlaceholder } from '../EmbedFacebookPlaceholder';
import { EmbedConsent } from '../EmbedConsent';
import { EmbedFacebook } from '../EmbedFacebook';
import { VENDOR_ID_FACEBOOK } from '../../../vendor-mapping';

type Data = {
  vendorId: string;
};

type Props = {
  content: string | null;
  privacyManagerId: number;
};

export default Vue.extend<Data, {}, {}, Props>({
  name: 'EmbedFacebookCmp',
  components: { EmbedConsent, EmbedFacebook, EmbedFacebookPlaceholder },
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
