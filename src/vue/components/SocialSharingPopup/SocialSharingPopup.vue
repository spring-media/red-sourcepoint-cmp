<template>
  <privacy-manager v-slot="{ loadPrivacyManagerModal }">
    <div v-if="isVisible" class="social-sharing-popup__container">
      <div class="social-sharing-popup__headline">
        <slot name="headline">
          Deine Datensicherheit bei der Nutzung der Teilen-Funktion
        </slot>
      </div>
      <div class="social-sharing-popup__description">
        <slot name="description">
          Um diesen Artikel oder andere Inhalte über Soziale Netzwerke zu teilen, brauchen wir deine Zustimmung für
          <a href="#" rel="noopener" target="_blank" @click.prevent="loadPrivacyManagerModal(privacyManagerId)">
            diesen Zweck der Datenverarbeitung
          </a>
        </slot>
      </div>
      <slot name="buttons">
        <div class="social-sharing-popup__button-container">
          <button
            class="social-sharing-popup__button social-sharing-popup__button--close"
            @click.prevent="setVisibility(false)"
          >
            Schließen
          </button>
          <button
            class="social-sharing-popup__button social-sharing-popup__button--accept"
            @click.prevent="loadPrivacyManagerModal(privacyManagerId)"
          >
            Akzeptieren
          </button>
        </div>
      </slot>
    </div>
  </privacy-manager>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { PrivacyManager } from '../PrivacyManager';

type Data = {
  isVisible: boolean;
};

type Methods = {
  setVisibility(visible: boolean): void;
};

type Props = {
  privacyManagerId: number;
  initialVisibility: boolean;
};

export default Vue.extend<Data, Methods, {}, Props>({
  name: 'SocialSharingPopup',
  components: { PrivacyManager },
  data(): { isVisible: boolean } {
    return {
      isVisible: this.initialVisibility,
    };
  },
  props: {
    privacyManagerId: {
      type: Number as PropType<number>,
      required: true,
    },
    initialVisibility: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  methods: {
    setVisibility(visible: boolean): void {
      this.isVisible = visible;
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
