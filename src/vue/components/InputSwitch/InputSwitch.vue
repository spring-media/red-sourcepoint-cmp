<template>
  <div class="cmp-input-switch__container">
    <label
      class="cmp-input-switch__label"
      :for="id"
    >{{ label }}</label>
    <div class="cmp-input-switch">
      <div class="cmp-input-switch--hidden-accessible">
        <input
          type="checkbox"
          ref="checkbox"
          :id="id"
          role="switch"
          @change="$emit('change', $event)"
        >
      </div>
      <span
        class="cmp-input-switch__slider"
        :class="{ 'cmp-input-switch__slider--checked': checked }"
        @click="sliderClicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type Props = {
  label: string;
  checked: boolean;
};

type Methods = {
  sliderClicked: () => void;
};

type NonNullish = Record<string, unknown>;

let id = 0;
const generateId = () => `input-switch-${id++}`;

export default Vue.extend<NonNullish, Methods, NonNullish, Props>({
  name: 'InputSwitch',
  data: () => ({
    id: generateId(),
  }),
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    sliderClicked() {
      const checkbox = this.$refs.checkbox as HTMLInputElement;
      checkbox.checked = !checkbox.checked;

      checkbox.dispatchEvent(new Event('change'));
    },
  },
});
</script>

<style>
.cmp-input-switch__container {
  display: flex;
  align-items: center;
}

[data-tenant='sportbild'] .cmp-input-switch__label {
  font-family: Inter, sans-serif;
  font-size: 14px;
}

.cmp-input-switch__label {
  font-family: Gotham XNarrow, sans-serif;
  margin-right: 8px;
  cursor: pointer;
}

.cmp-input-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.cmp-input-switch__slider {
  border: 2px solid #495057;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 30px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.cmp-input-switch__slider::before {
  background: #ced4da;
  width: 16px;
  height: 16px;
  left: 2px;
  margin-top: 2px;
  border-radius: 50%;
  position: absolute;
  content: '';
}

.cmp-input-switch__slider--checked::before {
  background: #00c373;
  left: 18px;
}

.cmp-input-switch--hidden-accessible {
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
