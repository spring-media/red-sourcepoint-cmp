<template>
  <consent-wrapper :vendorId="vendorId">
    <template #disabledContent>
      <embed-placeholder :customConsents="customConsents"></embed-placeholder>
    </template>
    <template #enabledContent>
      <embed-content :content="content"></embed-content>
    </template>
  </consent-wrapper>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ConsentWrapper } from '../ConsentWrapper';
import { EmbedPlaceholder } from '../EmbedPlaceholder';
import { EmbedContent } from '../EmbedContent';
import { CustomConsent } from '../../../sourcepoint/typings';

type Props = {
  vendorId: string;
  content: string;
  customConsents: CustomConsent;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedInstagramConsent',
  components: { EmbedPlaceholder, ConsentWrapper, EmbedContent },
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
