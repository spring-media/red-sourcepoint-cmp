<template>
  <div
    class="embed-placeholder__container"
    :data-vendor-id="vendorId"
  >
    <div class="embed-placeholder__header">
      <slot name="header">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M46.1772 43.5439L64.8503 62.217C67.8858 58.824 70.2367 54.8056 71.6858 50.3789L46.1772 43.5439Z"
            fill="#CED4DA"
          />
          <path
            opacity="0.6"
            d="M72.8214 45.8522L42.6667 37.7723V6.77197C59.8294 8.13047 73.3334 22.4883 73.3334 40.0002C73.3334 41.9967 72.8214 45.8522 72.8214 45.8522Z"
            fill="#CED4DA"
          />
          <path
            d="M37.3334 6.77197C20.1707 8.13047 6.66675 22.4883 6.66675 40.0002C6.66675 58.4097 21.5906 73.3335 40.0001 73.3335C48.1951 73.3335 55.6994 70.3762 61.504 65.4706L37.3669 41.3335H37.3334V6.77197Z"
            fill="#CED4DA"
          />
        </svg>
      </slot>
    </div>
    <div class="embed-placeholder__headline">
      <slot name="headline">
        An dieser Stelle findest du Inhalte von Drittanbietern
      </slot>
    </div>
    <div class="embed-placeholder__description">
      <slot name="description">
        Um mit Inhalten von Drittanbietern zu interagieren oder diese darzustellen, brauchen wir deine Zustimmung.
      </slot>
    </div>
    <consent-actions v-slot="{ consentVendor, consentPurpose }">
      <slot
        name="button"
        v-bind="{ consentVendor, consentPurpose }"
      >
        <button
          class="embed-placeholder__button"
          @click.prevent="giveConsent(consentVendor, consentPurpose)"
        >
          <slot name="buttonLabel">
            externen Inhalt aktivieren
          </slot>
        </button>
      </slot>
    </consent-actions>
    <privacy-manager v-slot="{ loadPrivacyManagerModal }">
      <div class="embed-placeholder__footer-text">
        <slot name="footer">
          Ich bin damit einverstanden, dass mir Inhalte von Drittanbietern angezeigt werden. Damit können
          personenbezogene Daten an Drittanbieter übermittelt werden. Dazu ist ggf. die Speicherung von Cookies auf
          deinem Gerät notwendig. Mehr Informationen dazu findest du
          <a
            class="embed-placeholder__text-link"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            @click.prevent="loadPrivacyManagerModal(privacyManagerId)"
          >hier</a>.
        </slot>
      </div>
    </privacy-manager>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentActions } from '../ConsentActions';
import { PrivacyManager } from '../PrivacyManager';

type Props = {
  privacyManagerId: number;
  vendorId: string;
  purposeId: string;
};

type ConsentAction = (id: string) => void;

type Methods = {
  giveConsent: (consentVendor: ConsentAction, consentPurpose: ConsentAction) => void;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, Methods, NonNullish, Props>({
  name: 'EmbedPlaceholder',
  components: { ConsentActions, PrivacyManager },
  props: {
    privacyManagerId: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: String,
      default: '',
    },
    purposeId: {
      type: String,
      default: '',
    },
  },
  methods: {
    giveConsent(consentVendor: ConsentAction, consentPurpose: ConsentAction): void {
      if (this.vendorId) {
        return consentVendor(this.vendorId);
      }

      if (this.purposeId) {
        consentPurpose(this.purposeId);
      }
    },
  },
});
</script>

<style>
.embed-placeholder__container {
  background: #e9ecef;
  border-radius: 8px;
  padding: 12px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.quad.embed-placeholder__container {
  aspect-ratio: 1;
}

.a-teaser.embed-placeholder__container {
  aspect-ratio: 16 / 9;
}

.bc.embed-placeholder__container {
  aspect-ratio: 4.3875 / 9;
}

.embed-placeholder__header {
  position: relative;
  background: #ffffff;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.embed-placeholder__headline {
  font-family: Gotham, sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 6px;
}

.embed-placeholder__description {
  font-family: Gotham XNarrow, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: #212529;
  margin-bottom: 10px;
}

.embed-placeholder__button {
  display: block;
  padding: 9px;
  width: 100%;
  background: #00c373;
  border-radius: 8px;
  border-style: none;
  margin-bottom: 10px;

  font-family: Gotham XNarrow, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #ffffff;
}

.embed-placeholder__footer-text {
  font-family: Gotham XNarrow, sans-serif;
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

@media (min-width: 0) and (max-width: 599.99px) {
  .a-teaser.embed-placeholder__container {
    aspect-ratio: auto;
  }

  .embed-placeholder__header {
    display: none;
  }
}

@media (max-width: 399.99px) {
  .quad.embed-placeholder__container {
    aspect-ratio: auto;
  }
}

/* workaround nobp class */
@media (min-width: 1024px) {
  .a-teaser.embed-placeholder__container {
    aspect-ratio: 16 / 9;
  }

  .quad.embed-placeholder__container {
    aspect-ratio: 1 / 1;
  }

  .embed-placeholder__header {
    display: flex;
  }
}
</style>
