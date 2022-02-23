<template>
  <embed-social-networks-placeholder :privacy-manager-id="privacyManagerId" :vendor-id="vendorId">
    <template #header>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M73.3334 40.2035C73.3334 21.6815 58.4095 6.6665 40 6.6665C21.5905 6.6665 6.66669 21.6815 6.66669 40.2035C6.66669 56.9426 18.8561 70.8172 34.7917 73.3332V49.8979H26.3281V40.2035H34.7917V32.8149C34.7917 24.4097 39.7683 19.7669 47.3822 19.7669C51.0293 19.7669 54.8438 20.4219 54.8438 20.4219V28.6752H50.6406C46.5 28.6752 45.2084 31.2606 45.2084 33.9127V40.2035H54.4531L52.9753 49.8979H45.2084V73.3332C61.1439 70.8172 73.3334 56.9426 73.3334 40.2035Z"
          fill="#CED4DA"
        />
      </svg>
    </template>
    <template #headline> An dieser Stelle findest du Inhalte aus Facebook </template>
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
