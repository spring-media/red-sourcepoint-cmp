<template>
  <div>
    <div class="input-switch-hidden-accessible">
      <input type="checkbox" role="switch" aria-checked="true" />
    </div>
    <span class="input-switch-slider" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type Props = {
  label: string;
};

type NonNullish = Record<string, unknown>;

export default Vue.extend<NonNullish, NonNullish, NonNullish, Props>({
  name: 'InputSwitch',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
.switch-hidden-accessible {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
</style>
