<template>
  <embed-placeholder-pur
    :vendor-id="vendorId"
    :privacy-manager-id="privacyManagerId"
    :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
    :switch-label="'Podigee freigeben'"
  >
    <template #header>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30.814 16.9352C28.1511 15.2406 24.6665 17.1535 24.6665 20.3099V59.6898C24.6665 62.8462 28.1511 64.759 30.814 63.0645L61.7554 43.3745C64.2254 41.8027 64.2254 38.197 61.7554 36.6252L30.814 16.9352Z"
          stroke="#CED4DA"
          stroke-width="4"
        />
      </svg>
    </template>
    <template #headline> An dieser Stelle findest du Inhalte aus Podigee </template>
  </embed-placeholder-pur>
</template>

<script lang="ts">
import Vue from 'vue';
import { VENDOR_ID_PODIGEE } from '../../../vendor-mapping';
import { EmbedPlaceholderPur } from '../EmbedPlaceholderPur';

type Props = {
  vendorId: string;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedPlaceholderPodigeePur',
  components: { EmbedPlaceholderPur },
  props: {
    vendorId: {
      type: String,
      default: VENDOR_ID_PODIGEE,
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
    privacyManagerIdDenyTracking: {
      type: Number,
      required: true,
    },
  },
});
</script>
