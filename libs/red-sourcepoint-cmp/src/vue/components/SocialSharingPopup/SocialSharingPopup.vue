<template>
  <privacy-manager v-slot="{ loadPrivacyManagerModal }">
    <div class="social-sharing-popup__container">
      <div class="social-sharing-popup__headline">
        <slot name="headline">
          Deine Datensicherheit bei der Nutzung der Teilen-Funktion
        </slot>
      </div>
      <div class="social-sharing-popup__description">
        <slot name="description">
          Um diesen Artikel oder andere Inhalte über soziale Netzwerke zu teilen, brauchen wir deine Zustimmung für
          <a
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            @click.prevent="loadPrivacyManagerModal(privacyManagerId)"
          >
            diesen Zweck der Datenverarbeitung
          </a>
        </slot>
      </div>
      <slot name="buttons">
        <div class="social-sharing-popup__button-container">
          <button
            class="social-sharing-popup__button social-sharing-popup__button--close"
            @click.prevent="$emit('close')"
          >
            Schließen
          </button>
          <consent-actions v-slot="{ consentPurpose }">
            <button
              class="social-sharing-popup__button social-sharing-popup__button--accept"
              @click.prevent="[consentPurpose(purposeId), $emit('close')]"
            >
              Akzeptieren
            </button>
          </consent-actions>
        </div>
      </slot>
    </div>
  </privacy-manager>
</template>

<script lang="ts">
import Vue from 'vue';
import { PrivacyManager } from '../PrivacyManager';
import { ConsentActions } from '../ConsentActions';
import { PURPOSE_ID_SOCIAL } from '../../../vendor-mapping';

type Data = {
  purposeId: string;
};

type Props = {
  privacyManagerId: number;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<Data, NonNullish, NonNullish, Props>({
  name: 'SocialSharingPopup',
  components: { PrivacyManager, ConsentActions },
  data: () => ({
    purposeId: PURPOSE_ID_SOCIAL,
  }),
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style>
.social-sharing-popup__container {
  background: #343a40;
  border-radius: 8px 8px 0 0;
  padding: 16px;
  max-width: 360px;
  width: 100%;
}

.social-sharing-popup__headline {
  font-family: 'Gotham', 'Avenir Next', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #f8f9fa;
}

.social-sharing-popup__description {
  font-family: 'Gotham XNarrow', 'Avenir Next Condensed', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 21px;
  color: #ced4da;
  margin-top: 4px;
}

.social-sharing-popup__description a {
  color: #ced4da;
  text-decoration: none;
  border-bottom: 1px solid #ced4da;
}

.social-sharing-popup__button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.social-sharing-popup__button {
  width: 156px;
  height: 36px;
  border-radius: 8px;
  text-align: center;
  border: none;
  font-family: 'Gotham XNarrow', 'Avenir Next Condensed', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #f8f9fa;
  cursor: pointer;
}

.social-sharing-popup__button--close {
  background-color: transparent;
  border: 2px solid #495057;
}

.social-sharing-popup__button--accept {
  background-color: #00c373;
}
</style>
