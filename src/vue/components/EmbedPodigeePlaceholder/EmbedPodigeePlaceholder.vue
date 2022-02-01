<template>
  <embed-placeholder :privacy-manager-id="privacyManagerId" :vendor-id="vendorId">
    <template #header>
      <svg width="100%" height="172" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          style="transform: translate(calc(50% - 18px), calc(50% - 18px)) scale(0.9)"
          d="M8.81401 2.93521C6.15111 1.24064 2.6665 3.15348 2.6665 6.30985V45.6898C2.6665 48.8462 6.15111 50.759 8.81401 49.0645L39.7554 29.3745C42.2254 27.8027 42.2254 24.197 39.7554 22.6252L8.81401 2.93521Z"
          stroke="#CED4DA"
          stroke-width="4"
        />
      </svg>
    </template>
    <template #headline> An dieser Stelle findest du Inhalte aus Podigee </template>
    <template #description>
      Um mit Inhalten aus Podigee und anderen externen Inhalten zu interagieren oder diese darzustellen, brauchen wir
      deine Zustimmung.
    </template>
  </embed-placeholder>
</template>

<script lang="ts">
import Vue from 'vue';
import { VENDOR_ID_PODIGEE } from '../../../vendor-mapping';
import { EmbedPlaceholder } from '../EmbedPlaceholder';

type Props = {
  privacyManagerId: number;
  vendorId: string;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedPlaceholderPodigee',
  components: { EmbedPlaceholder },
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_PODIGEE,
    },
  },
});
</script>
