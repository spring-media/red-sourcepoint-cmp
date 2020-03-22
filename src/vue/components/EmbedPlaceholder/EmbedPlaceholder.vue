<template>
  <div class="embed-placeholder__container">
    <div class="embed-placeholder__header">
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
    </div>
    <div class="embed-placeholder__headline">
      <slot name="headline">
        An dieser Stelle findest du Inhalte aus Sozialen Netzwerken
      </slot>
    </div>
    <div class="embed-placeholder__description">
      <slot name="description">
        Um mit Inhalten aus Sozialen Netzwerken zu interagieren oder diese darzustellen, brauchen wir deine Zustimmung.
      </slot>
    </div>
    <privacy-manager v-slot="{ loadModal }">
      <slot name="button">
        <button class="embed-placeholder__button" @click.prevent="loadModal(privacyManagerId)">
          Soziale Netzwerke aktivieren
        </button>
      </slot>
    </privacy-manager>
    <div class="embed-placeholder__footer-text">
      <slot name="footer">
        Ich bin damit einverstanden, dass mir externe Inhalte aus Sozialen Netzwerken angezeigt werden. Damit können
        personenbezogene Daten an Drittanbieter übermittelt werden. Mehr dazu findest du in der
        <a class="embed-placeholder__text-link" href="#" rel="noopener" target="_blank"
          >Beschreibung dieses Datenverarbeitungszweck</a
        >
        und in den Datenschutzinformationen dieser
        <a class="embed-placeholder__text-link" href="#" rel="noopener" target="_blank">Drittanbieter</a>.
      </slot>
    </div>
  </div>
</template>

<script>
import PrivacyManager from '../PrivacyManager/PrivacyManager.vue';

export default {
  name: 'EmbedPlaceholder',
  components: { PrivacyManager },
  props: {
    privacyManagerId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.embed-placeholder__container {
  background: #e9ecef;
  border-radius: 8px;
  padding: 12px;
  max-width: 500px;
}

.embed-placeholder__header {
  background: #ffffff;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
}

.embed-placeholder__headline {
  font-family: Gotham;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 6px;
}

.embed-placeholder__description {
  font-family: Gotham XNarrow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: #212529;
  margin-bottom: 10px;
}

.embed-placeholder__button {
  display: block;
  padding: 9px 50px;
  width: 100%;
  background: #00c373;
  border-radius: 8px;
  margin-bottom: 10px;

  font-family: Gotham XNarrow;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #ffffff;
}

.embed-placeholder__footer-text {
  font-family: Gotham XNarrow;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #212529;
}

.embed-placeholder__text-link {
  text-decoration: underline;
  color: #212529;
}
</style>
