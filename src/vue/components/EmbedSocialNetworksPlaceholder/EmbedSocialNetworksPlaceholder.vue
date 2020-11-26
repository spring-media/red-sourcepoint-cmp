<template>
  <embed-placeholder
    :privacy-manager-id="privacyManagerId"
    :purpose-id="purposeId"
    :vendor-id="vendorId"
  >
    <template #header>
      <slot name="header">
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
        </svg>
      </slot>
    </template>
    <template #headline>
      <slot name="headline">
        An dieser Stelle findest du Inhalte aus sozialen Netzwerken
      </slot>
    </template>
    <template #description>
      <slot name="description">
        Um mit Inhalten aus sozialen Netzwerken zu interagieren oder diese darzustellen, brauchen wir deine Zustimmung.
      </slot>
    </template>
    <template #buttonLabel>
      soziale Netzwerke aktivieren
    </template>
  </embed-placeholder>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedPlaceholder } from '../EmbedPlaceholder';
import { PURPOSE_ID_SOCIAL } from '../../../vendor-mapping';

type Props = {
  privacyManagerId: number;
  vendorId: string;
};

type Data = {
  purposeId: string;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
  name: 'EmbedSocialNetworksPlaceholder',
  components: { EmbedPlaceholder },
  data: () => ({
    purposeId: PURPOSE_ID_SOCIAL,
  }),
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: String,
      default: '',
    },
  },
});
</script>
