<template>
  <div class="embed-placeholder__container" :data-vendor-id="vendorId">
    <div class="embed-placeholder__header--pur">
      <slot name="header">
        <svg width="100%" height="265" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="62" width="81" height="8" fill="#E9ECEF" />
          <rect x="38" y="88" width="81" height="8" fill="#E9ECEF" />
          <rect x="38" y="75" width="61" height="8" fill="#E9ECEF" />
          <rect x="38" y="173" width="81" height="8" fill="#E9ECEF" />
          <rect x="38" y="199" width="81" height="8" fill="#E9ECEF" />
          <rect x="38" y="186" width="61" height="8" fill="#E9ECEF" />
          <path d="M289.782 110.125L313 78L343 78" stroke="#868E96" stroke-width="3" />
          <path
            d="M287.287 170.75C292.847 161.12 296.117 150.339 296.845 139.242C297.572 128.145 295.737 117.03 291.481 106.756C287.226 96.4817 280.663 87.3243 272.303 79.9919C263.942 72.6596 254.006 67.3489 243.264 64.4707L239.511 78.4766C248.105 80.7792 256.053 85.0278 262.742 90.8936C269.431 96.7595 274.68 104.085 278.085 112.305C281.49 120.524 282.958 129.416 282.376 138.294C281.794 147.171 279.178 155.796 274.729 163.5L287.287 170.75Z"
            fill="#868E96"
          />
          <path
            d="M241.671 64.0628C230.542 61.3497 218.928 61.3124 207.781 63.954C196.635 66.5956 186.273 71.8409 177.545 79.26C168.817 86.6791 161.971 96.0608 157.568 106.636C153.166 117.212 151.332 128.68 152.217 140.101L166.673 138.981C165.965 129.844 167.433 120.669 170.955 112.209C174.477 103.749 179.953 96.2433 186.936 90.308C193.918 84.3727 202.208 80.1765 211.125 78.0632C220.042 75.9499 229.333 75.9797 238.237 78.1502L241.671 64.0628Z"
            fill="#CED4DA"
          />
          <path
            d="M152.396 142.061C153.976 157.128 160.236 171.321 170.296 182.647C180.357 193.974 193.713 201.864 208.489 205.209C223.264 208.555 238.716 207.188 252.675 201.301C266.633 195.414 278.397 185.302 286.314 172.386L273.951 164.808C267.618 175.142 258.207 183.231 247.04 187.941C235.873 192.651 223.511 193.744 211.691 191.067C199.871 188.391 189.186 182.079 181.137 173.018C173.088 163.957 168.08 152.602 166.816 140.549L152.396 142.061Z"
            fill="#CED4DA"
          />
          <rect x="349" y="62" width="81" height="8" fill="#868E96" />
          <rect x="349" y="88" width="81" height="8" fill="#868E96" />
          <rect x="349" y="75" width="61" height="8" fill="#868E96" />
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
        <a
          class="embed-placeholder__text-link"
          href="https://www.bild.de/corporate-site/privatsphaere/bild-de/artikel-privatsphaere-72035848.bild.html"
          target="_blank"
          title="Zu den Privatsphäre Einstellungen"
          >hier</a
        >. Du kannst deine Einwilligung jederzeit über den Schalter und über Privatsphäre am Seitenende widerrufen.
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

type Props = {
  vendorId: string;
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
  components: { ConsentActions, InputSwitch },
  props: {
    vendorId: {
      type: String,
      default: '',
    },
    purposeId: {
      type: String,
      default: '',
    },
    switchLabel: {
      type: String,
      default: 'Inhalt freigeben',
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
  background: #ffffff;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 24px;
}

.embed-placeholder__description--pur {
  font-family: Gotham XNarrow, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: #212529;
  margin-bottom: 24px;
}

.embed-placeholder__actions {
  display: flex;
  justify-content: end;
  border-top: 1px solid #ced4da;
  padding-top: 12px;
}
</style>
