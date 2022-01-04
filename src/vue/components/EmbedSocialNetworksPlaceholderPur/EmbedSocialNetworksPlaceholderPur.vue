<template>
  <embed-placeholder-pur
    :vendor-id="vendorId"
    :privacy-manager-id="privacyManagerId"
    :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
    :switch-label="switchLabel"
  >
    <template #header>
      <slot name="header">
        <svg width="100%" height="84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#E9ECEF" />
          <rect x="40" y="7" width="60" height="10" fill="#E9ECEF" />
          <rect x="40" y="19" width="40" height="6" fill="#E9ECEF" />
          <rect y="44" width="100%" height="8" fill="#E9ECEF" />
          <rect y="60" width="100%" height="8" fill="#E9ECEF" />
          <rect y="76" width="75%" height="8" fill="#E9ECEF" />
        </svg>
      </slot>
    </template>
    <template #headline>
      <slot name="headline"> An dieser Stelle findest du Inhalte aus sozialen Netzwerken </slot>
    </template>
    <template #controls>
      <slot name="controls" />
    </template>
  </embed-placeholder-pur>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedPlaceholderPur } from '../EmbedPlaceholderPur';

type Props = {
  vendorId: string;
  switchLabel: string;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
};

type Data = {
  purposeId: string;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
  name: 'EmbedSocialNetworksPlaceholderPur',
  components: { EmbedPlaceholderPur },
  props: {
    vendorId: {
      type: String,
      default: '',
    },
    switchLabel: {
      type: String,
      default: 'Inhalt freigeben',
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
