<template>
  <privacy-manager v-slot="{ loadPrivacyManagerModal }">
    <embed-placeholder :customConsents="customConsents">
      <template #header>
        <slot name="header">
          <svg width="100%" height="84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#E9ECEF"></circle>
            <rect x="40" y="7" width="60" height="10" fill="#E9ECEF"></rect>
            <rect x="40" y="19" width="40" height="6" fill="#E9ECEF"></rect>
            <rect y="44" width="100%" height="8" fill="#E9ECEF"></rect>
            <rect y="60" width="100%" height="8" fill="#E9ECEF"></rect>
            <rect y="76" width="75%" height="8" fill="#E9ECEF"></rect>
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
          Um mit Inhalten aus sozialen Netzwerken zu interagieren oder diese darzustellen, brauchen wir deine
          Zustimmung.
        </slot>
      </template>
      <template #buttonLabel>
        soziale Netzwerke aktivieren
      </template>
      <template #footer>
        Ich bin damit einverstanden, dass mir externe Inhalte aus sozialen Netzwerken angezeigt werden. Damit können
        personenbezogene Daten an Drittanbieter übermittelt werden. Mehr dazu findest du in der
        <a
          class="embed-placeholder__text-link embed-placeholder__link-description"
          href="#"
          rel="noopener"
          target="_blank"
          @click.prevent="loadPrivacyManagerModal(privacyManagerId)"
          >Beschreibung dieses Datenverarbeitungszweck</a
        >
        und in den Datenschutzinformationen dieser
        <a
          class="embed-placeholder__text-link embed-placeholder__link-vendor-list"
          href="#"
          rel="noopener"
          target="_blank"
          @click.prevent="loadPrivacyManagerModal(privacyManagerId)"
          >Drittanbieter</a
        >.
      </template>
    </embed-placeholder>
  </privacy-manager>
</template>

<script lang="ts">
import Vue from 'vue';
import { EmbedPlaceholder } from '../EmbedPlaceholder';
import { PrivacyManager } from '../PrivacyManager';
import { PURPOSE_ID_SOCIAL, getRelations } from '../../../vendor-mapping';
import { PostCustomConsentPayload } from '../../../sourcepoint/typings';

type Props = {
  privacyManagerId: number;
};

type Data = {
  customConsents: PostCustomConsentPayload;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
  name: 'EmbedSocialNetworksPlaceholder',
  components: { PrivacyManager, EmbedPlaceholder },
  data: () => ({
    customConsents: {
      purposeIds: [PURPOSE_ID_SOCIAL],
      vendorIds: getRelations(PURPOSE_ID_SOCIAL),
    },
  }),
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>
