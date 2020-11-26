<template>
  <embed-social-networks-placeholder
    :privacy-manager-id="privacyManagerId"
    :vendor-id="vendorId"
  >
    <template #header>
      <svg
        width="100%"
        height="172"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style="transform: translate(calc(50% - 20px), calc(50% - 20px)) scale(0.42);">
          <path
            d="M 118.9,13.3 C 117.5,8.1 113.4,4 108.2,2.6 98.7,0 60.7,0 60.7,0 60.7,0 22.7,0 13.2,2.5 8.1,3.9 3.9,8.1 2.5,13.3 0,22.8 0,42.5 0,42.5 0,42.5 0,62.3 2.5,71.7 3.9,76.9 8,81 13.2,82.4 22.8,85 60.7,85 60.7,85 c 0,0 38,0 47.5,-2.5 5.2,-1.4 9.3,-5.5 10.7,-10.7 2.5,-9.5 2.5,-29.2 2.5,-29.2 0,0 0.1,-19.8 -2.5,-29.3 z"
            fill="#E9ECEF"
          />
          <polygon
            points="80.2,42.5 48.6,24.3 48.6,60.7"
            fill="#ffffff"
          />
        </g>
      </svg>
    </template>
    <template #headline>
      An dieser Stelle findest du Inhalte aus YouTube
    </template>
    <template #description>
      Um mit Inhalten aus YouTube und anderen sozialen Netzwerken zu interagieren oder diese darzustellen, brauchen wir
      deine Zustimmung.
    </template>
  </embed-social-networks-placeholder>
</template>

<script lang="ts">
import Vue from 'vue';
import { VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';
import { EmbedSocialNetworksPlaceholder } from '../EmbedSocialNetworksPlaceholder';

type Props = {
  privacyManagerId: number;
  vendorId: string;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedPlaceholderYoutube',
  components: { EmbedSocialNetworksPlaceholder },
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_YOUTUBE,
    },
  },
});
</script>
