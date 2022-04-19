<template>
  <div class="embed-placeholder__container" :data-vendor-id="vendorId">
    <div class="embed-placeholder__header--pur">
      <slot name="header">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <slot name="headline"> An dieser Stelle findest du Inhalte von Drittanbietern </slot>
    </div>
    <div class="embed-placeholder__description--pur">
      <slot name="description">
        Um eingebettete Inhalte anzuzeigen, ist deine widerrufliche Einwilligung in die Übermittlung und Verarbeitung
        von personenbezogenen Daten notwendig, da die Anbieter der eingebetteten Inhalte als Drittanbieter diese
        Einwilligung verlangen [In diesem Zusammenhang können auch Nutzungsprofile (u.a. auf Basis von Cookie-IDs)
        gebildet und angereichert werden, auch außerhalb des EWR]. Indem du den Schalter auf „an“ stellst, stimmst du
        diesen (jederzeit widerruflich) zu. Dies umfasst auch deine
        <abbr
          title="Die betreffenden Drittländer, insb. die USA, weisen im Zweifel nicht das Datenschutzniveau auf, das Sie unter der DSGVO genießen. Das kann Nachteile wie eine erschwerte Durchsetzung von Betroffenenrechten, eine fehlende Kontrolle der Weiterverarbeitung und Übermittlung der Daten oder Zugriffe auf die Daten durch staatliche Stellen, insb. Behörden der USA, zu Kontroll- und Überwachungszwecken bedeuten, ohne dass Ihnen Rechtsbehelfe dagegen zustehen. Dies liegt nicht in der Hand von Axel Springer, sondern bedarf einer Regelung auf Gesetzgebungsebene."
          >Einwilligung in die Übermittlung bestimmter personenbezogener Daten in Drittländer, u.a. die USA</abbr
        >, nach Art. 49 (1) (a) DSGVO. Mehr Informationen dazu findest du
        <privacy-manager v-slot="{ loadPrivacyManagerModal }">
          <span>
            <a
              class="embed-placeholder__text-link"
              href="#"
              rel="noopener noreferrer"
              title="Zu den Privatsphäre Einstellungen"
              @click.prevent="loadPrivacyManagerModal(privacyManagerId, 'vendors')"
              >hier</a
            >
            . Du kannst deine Einwilligung jederzeit über den Schalter und über
            <a
              class="embed-placeholder__text-link"
              href="#"
              rel="noopener noreferrer"
              title="Tracking widerrufen"
              @click.prevent="loadPrivacyManagerModal(privacyManagerIdDenyTracking)"
              >Widerruf Tracking</a
            >
          </span>
        </privacy-manager>
        am Seitenende widerrufen.
      </slot>
    </div>
    <div class="embed-placeholder__actions">
      <consent-actions v-slot="{ consentVendorPUR }">
        <slot name="controls" v-bind="{ consentVendorPUR }">
          <input-switch :label="switchLabel" @change="giveConsent($event, consentVendorPUR)" />
        </slot>
      </consent-actions>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentActions } from '../ConsentActions';
import { InputSwitch } from '../InputSwitch';
import { PrivacyManager } from '../PrivacyManager';

type Props = {
  vendorId: string;
  privacyManagerId: number;
  privacyManagerIdDenyTracking: number;
  purposeId: string;
  switchLabel: string;
};

type ConsentAction = (id: string) => void;

type Methods = {
  giveConsent: (event: Event, consentPURVendor: ConsentAction) => void;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, Methods, NonNullish, Props>({
  name: 'EmbedPlaceholderPur',
  components: { ConsentActions, InputSwitch, PrivacyManager },
  props: {
    vendorId: {
      type: String,
      default: '',
    },
    privacyManagerId: {
      type: Number,
      required: true,
    },
    privacyManagerIdDenyTracking: {
      type: Number,
      required: true,
    },
    purposeId: {
      type: String,
      default: '',
    },
    switchLabel: {
      type: String,
      default: 'Externen Inhalt freigeben',
    },
  },
  methods: {
    giveConsent(event: Event, consentVendorPUR: ConsentAction): void {
      if (!(event.target as HTMLInputElement).checked) {
        return;
      }

      if (this.vendorId) {
        consentVendorPUR(this.vendorId);
      }
    },
  },
});
</script>

<style>
.embed-placeholder__header--pur {
  position: relative;
  background: #ffffff;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.a-teaser > .embed-placeholder__header--pur svg {
  width: 48px;
  height: 48px;
}

.double-a-teaser > .embed-placeholder__header--pur svg {
  width: 48px;
  height: 48px;
}

.embed-placeholder__description--pur {
  font-family: Gotham XNarrow, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: #212529;
  margin-bottom: 16px;
}

.embed-placeholder__actions {
  display: flex;
  justify-content: center;
  border-top: 1px solid #ced4da;
  padding-top: 12px;
  margin-top: auto;
}

@media (min-width: 0) and (max-width: 1023.99px) {
  .a-teaser > .embed-placeholder__header--pur {
    display: none;
  }

  .double-a-teaser > .embed-placeholder__header--pur {
    display: none;
  }
}

@media (min-width: 0) and (max-width: 600px) {
  .embed-placeholder__header--pur {
    display: none;
  }
}
</style>
