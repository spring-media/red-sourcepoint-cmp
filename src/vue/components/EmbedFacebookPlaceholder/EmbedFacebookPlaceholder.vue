<template>
  <embed-social-networks-placeholder
    :privacy-manager-id="privacyManagerId"
    :vendor-id="vendorId"
  >
    <template #header>
      <svg
        width="100%"
        height="84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16"
          cy="16"
          r="16"
          fill="#E9ECEF"
        />
        <rect
          x="40"
          y="7"
          width="60"
          height="10"
          fill="#E9ECEF"
        />
        <rect
          x="40"
          y="19"
          width="40"
          height="6"
          fill="#E9ECEF"
        />
        <rect
          y="44"
          width="100%"
          height="8"
          fill="#E9ECEF"
        />
        <rect
          y="60"
          width="100%"
          height="8"
          fill="#E9ECEF"
        />
        <rect
          y="76"
          width="75%"
          height="8"
          fill="#E9ECEF"
        />
        <path
          style="transform: translateX(calc(100% - 20px));"
          d="M20 10.0611C20 4.50451 15.5229 0 10 0C4.47715 0 0 4.50451 0 10.0611C0 15.0828 3.65684 19.2452 8.4375 20V12.9694H5.89844V10.0611H8.4375V7.84452C8.4375 5.32296 9.93047 3.93012 12.2146 3.93012C13.3088 3.93012 14.4531 4.12663 14.4531 4.12663V6.60261H13.1922C11.95 6.60261 11.5625 7.37822 11.5625 8.17387V10.0611H14.3359L13.8926 12.9694H11.5625V20C16.3432 19.2452 20 15.0828 20 10.0611Z"
          fill="#1877F2"
        />
      </svg>
    </template>
    <template #headline>
      An dieser Stelle findest du Inhalte aus Facebook
    </template>
    <template #description>
      Um mit Inhalten aus Facebook und anderen sozialen Netzwerken zu interagieren oder diese darzustellen, brauchen wir
      deine Zustimmung.
    </template>
  </embed-social-networks-placeholder>
</template>

<script lang="ts">
import Vue from 'vue';
import { VENDOR_ID_FACEBOOK } from '../../../vendor-mapping';
import { EmbedSocialNetworksPlaceholder } from '../EmbedSocialNetworksPlaceholder';

type Props = {
  privacyManagerId: number;
  vendorId: string;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedFacebookPlaceholder',
  components: { EmbedSocialNetworksPlaceholder },
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: String,
      default: VENDOR_ID_FACEBOOK,
    },
  },
});
</script>
