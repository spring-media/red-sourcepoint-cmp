<template>
  <div>
    <slot />
    <div v-if="showControls">
      <consent-actions v-slot="{ rejectVendorPUR }">
        <div>
          {{ label }}
          <input type="checkbox" @change="rejectConsent($event, rejectVendorPUR)" />
        </div>
      </consent-actions>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentActions } from '../ConsentActions';

type Props = {
  label: string;
  showControls: boolean;
  vendorId: string;
};

type NonNullish = Record<string, unknown>;

type ConsentAction = (id: string) => void;

type Methods = {
  rejectConsent: (event: Event, rejectConsent: ConsentAction) => void;
};

export default Vue.extend<NonNullish, Methods, NonNullish, Props>({
  components: { ConsentActions },
  name: 'EmbedContentPur',
  props: {
    label: {
      type: String,
      default: 'Inhalt deaktivieren',
    },
    showControls: {
      type: Boolean,
      default: false,
    },
    vendorId: {
      type: String,
      required: true,
    },
  },
  methods: {
    rejectConsent(event, reject) {
      if (!(event.target as HTMLInputElement).checked) {
        return;
      }

      if (this.vendorId) {
        reject(this.vendorId);
      }
    },
  },
});
</script>
