<template>
  <embed-social-networks-placeholder :privacyManagerId="privacyManagerId">
    <template #header>
      <svg width="100%" height="84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#E9ECEF" />
        <rect x="40" y="7" width="60" height="10" fill="#E9ECEF" />
        <rect x="40" y="19" width="40" height="6" fill="#E9ECEF" />
        <rect y="44" width="100%" height="8" fill="#E9ECEF" />
        <rect y="60" width="100%" height="8" fill="#E9ECEF" />
        <rect y="76" width="75%" height="8" fill="#E9ECEF" />
        <path
          style="transform: translateX(calc(100% - 20px));"
          d="M19.6 1.8456C18.8952 2.1616 18.1344 2.3704 17.3392 2.464C18.1536 1.9768 18.7752 1.204 19.072 0.284C18.3112 0.7336 17.4664 1.0656 16.5704 1.24C15.8504 0.476 14.8272 0 13.6952 0C11.52 0 9.75762 1.7624 9.75762 3.936C9.75762 4.2448 9.79202 4.5448 9.85922 4.8328C6.58562 4.6672 3.68402 3.1008 1.74242 0.716C1.40482 1.2976 1.20962 1.9752 1.20962 2.696C1.20962 4.0616 1.90322 5.268 2.96082 5.9736C2.31522 5.956 1.70882 5.7744 1.17682 5.4824C1.17682 5.4984 1.17682 5.5168 1.17682 5.532C1.17682 7.4408 2.53362 9.0336 4.33682 9.3936C4.00642 9.4832 3.65762 9.5336 3.29842 9.5336C3.04322 9.5336 2.79922 9.5064 2.55602 9.4616C3.05762 11.024 4.51202 12.1648 6.23442 12.1976C4.88402 13.2552 3.18882 13.8848 1.34082 13.8848C1.02242 13.8848 0.711224 13.8664 0.400024 13.8288C2.14722 14.9504 4.21682 15.5992 6.44082 15.5992C13.6848 15.5992 17.6472 9.596 17.6472 4.3928C17.6472 4.2184 17.644 4.0496 17.6352 3.8808C18.404 3.3304 19.072 2.6368 19.6 1.8456Z"
          fill="#4AA1EC"
        />
      </svg>
    </template>
    <template #headline>
      An dieser Stelle findest du Inhalte aus Twitter
    </template>
    <template #description>
      Um mit Inhalten aus Twitter und anderen sozialen Netzwerken zu interagieren oder diese darzustellen, brauchen wir
      deine Zustimmung.
    </template>
  </embed-social-networks-placeholder>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedSocialNetworksPlaceholder } from '../EmbedSocialNetworksPlaceholder';

type Props = {
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'EmbedTwitterPlaceholder',
  components: { EmbedSocialNetworksPlaceholder },
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
