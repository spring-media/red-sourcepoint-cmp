<template>
  <embed-social-networks-placeholder-pur
    :vendor-id="vendorId"
    :privacy-manager-id="privacyManagerId"
    :privacy-manager-id-deny-tracking="privacyManagerIdDenyTracking"
    :switch-label="'Youtube freigeben'"
  >
    <template #header>
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M68.8 21.8665C70.9333 23.7332 71.4667 28.2665 71.4667 28.2665C71.4667 28.2665 72 33.5998 72 38.6665V43.4665C72 48.7998 71.4667 53.8665 71.4667 53.8665C71.4667 53.8665 70.6667 58.3998 68.8 60.2665C66.781 62.2855 64.5734 62.606 63.1295 62.8157C62.857 62.8552 62.6117 62.8908 62.4 62.9332C53.3333 63.4665 40 63.4665 40 63.4665C40 63.4665 23.2 63.4665 18.1333 62.9332C17.8776 62.882 17.5531 62.8505 17.1788 62.8141C15.6017 62.6609 13.1396 62.4216 11.2 60.2665C9.06667 58.3998 8.53333 53.8665 8.53333 53.8665C8.53333 53.8665 8 48.5332 8 43.4665V38.6665C8 33.5998 8.53333 28.2665 8.53333 28.2665C8.53333 28.2665 9.33333 23.7332 11.2 21.8665C13.219 19.8475 15.4266 19.527 16.8705 19.3174C17.143 19.2778 17.3883 19.2422 17.6 19.1998C26.6667 18.6665 40 18.6665 40 18.6665C40 18.6665 53.3333 18.6665 62.4 19.1998C63.7333 19.1998 66.4 19.1998 68.8 21.8665ZM33.3333 31.7332V49.5999L50.6667 40.7999L33.3333 31.7332Z"
          fill="#CED4DA"
        />
        <mask
          id="mask0_382_22532"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="8"
          y="18"
          width="64"
          height="46"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M68.8 21.8665C70.9333 23.7332 71.4667 28.2665 71.4667 28.2665C71.4667 28.2665 72 33.5998 72 38.6665V43.4665C72 48.7998 71.4667 53.8665 71.4667 53.8665C71.4667 53.8665 70.6667 58.3998 68.8 60.2665C66.781 62.2855 64.5734 62.606 63.1295 62.8157C62.857 62.8552 62.6117 62.8908 62.4 62.9332C53.3333 63.4665 40 63.4665 40 63.4665C40 63.4665 23.2 63.4665 18.1333 62.9332C17.8776 62.882 17.5531 62.8505 17.1788 62.8141C15.6017 62.6609 13.1396 62.4216 11.2 60.2665C9.06667 58.3998 8.53333 53.8665 8.53333 53.8665C8.53333 53.8665 8 48.5332 8 43.4665V38.6665C8 33.5998 8.53333 28.2665 8.53333 28.2665C8.53333 28.2665 9.33333 23.7332 11.2 21.8665C13.219 19.8475 15.4266 19.527 16.8705 19.3174C17.143 19.2778 17.3883 19.2422 17.6 19.1998C26.6667 18.6665 40 18.6665 40 18.6665C40 18.6665 53.3333 18.6665 62.4 19.1998C63.7333 19.1998 66.4 19.1998 68.8 21.8665ZM33.3333 31.7332V49.5999L50.6667 40.7999L33.3333 31.7332Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_382_22532)" />
      </svg>
    </template>
    <template #headline>
      An dieser Stelle findest du Inhalte aus YouTube
    </template>
  </embed-social-networks-placeholder-pur>
</template>

<script lang="ts">
import Vue from 'vue';
import { VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';
import { EmbedSocialNetworksPlaceholderPur } from '../EmbedSocialNetworksPlaceholderPur';

type Props = {
  vendorId: string;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedPlaceholderYoutubePur',
  components: { EmbedSocialNetworksPlaceholderPur },
  props: {
    vendorId: {
      type: String,
      default: VENDOR_ID_YOUTUBE,
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
