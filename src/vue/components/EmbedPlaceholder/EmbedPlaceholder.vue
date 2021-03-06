<template>
  <div
    class="embed-placeholder__container"
    :data-vendor-id="vendorId"
  >
    <div class="embed-placeholder__header">
      <slot name="header">
        <svg
          width="100%"
          height="265"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="38"
            y="62"
            width="81"
            height="8"
            fill="#E9ECEF"
          />
          <rect
            x="38"
            y="88"
            width="81"
            height="8"
            fill="#E9ECEF"
          />
          <rect
            x="38"
            y="75"
            width="61"
            height="8"
            fill="#E9ECEF"
          />
          <rect
            x="38"
            y="173"
            width="81"
            height="8"
            fill="#E9ECEF"
          />
          <rect
            x="38"
            y="199"
            width="81"
            height="8"
            fill="#E9ECEF"
          />
          <rect
            x="38"
            y="186"
            width="61"
            height="8"
            fill="#E9ECEF"
          />
          <path
            d="M289.782 110.125L313 78L343 78"
            stroke="#868E96"
            stroke-width="3"
          />
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
          <rect
            x="349"
            y="62"
            width="81"
            height="8"
            fill="#868E96"
          />
          <rect
            x="349"
            y="88"
            width="81"
            height="8"
            fill="#868E96"
          />
          <rect
            x="349"
            y="75"
            width="61"
            height="8"
            fill="#868E96"
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
}

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
    }
  },
  methods: {
    giveConsent(consentVendor: ConsentAction, consentPurpose: ConsentAction): void {
      if (this.vendorId) {
        return consentVendor(this.vendorId);
      }

      if (this.purposeId) {
        consentPurpose(this.purposeId);
      }
    }
  }
});
</script>

<style>
.embed-placeholder__container {
  background: #e9ecef;
  border-radius: 8px;
  padding: 12px;
  max-width: 500px;
  margin: 0 auto;
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
  padding: 9px 50px;
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
</style>
