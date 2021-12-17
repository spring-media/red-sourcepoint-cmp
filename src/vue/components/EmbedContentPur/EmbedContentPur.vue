<template>
  <div>
    <slot />
    <div class="embed-content__actions" v-if="showControls">
      <consent-actions v-slot="{ rejectVendorPUR }">
        <input-switch :label="switchLabel" @change="rejectConsent($event, rejectVendorPUR)" :checked="true" />
      </consent-actions>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConsentActions } from '../ConsentActions';
import { InputSwitch } from '../InputSwitch';

type Props = {
  switchLabel: string;
  showControls: boolean;
  vendorId: string;
};

type NonNullish = Record<string, unknown>;

type ConsentAction = (id: string) => void;

type Methods = {
  rejectConsent: (event: Event, rejectConsent: ConsentAction) => void;
};

export default Vue.extend<NonNullish, Methods, NonNullish, Props>({
  components: { ConsentActions, InputSwitch },
  name: 'EmbedContentPur',
  props: {
    switchLabel: {
      type: String,
      default: 'Externer Inhalt',
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

<style>
.embed-content__actions {
  display: flex;
  justify-content: end;
  margin-top: 14px;
}
</style>
