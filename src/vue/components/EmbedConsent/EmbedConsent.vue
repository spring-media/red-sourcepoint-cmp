<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-placeholder :customConsents="customConsents"></embed-placeholder>
    </template>
    <template #enabledContent>
      <div v-html="content"></div>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedPlaceholder } from '../EmbedPlaceholder';
import { CustomConsent } from '../../../sourcepoint/typings';

type Props = {
  vendorId: string;
  content: string;
  customConsents: CustomConsent;
};

export default Vue.extend<{}, {}, {}, Props>({
  name: 'EmbedConsent',
  components: { EmbedPlaceholder, ConsentWrapper },
  props: {
    customConsents: {
      type: Object as PropType<CustomConsent>,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    vendorId: {
      type: String,
      required: true,
    },
  },
});
</script>
