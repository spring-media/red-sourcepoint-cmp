# Placeholder component for generic embeds

<p>
  <img src="../../../../docs/embed-generic-placeholder.png" alt="Embed placeholder Generic" width="500" />
</p>

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-placeholder></embed-placeholder>
</template>

<script>
import { EmbedPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/embed-placeholder';

export default {
  components: { EmbedPlaceholder },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/embed-placeholder.css';
</style>
```
</details>

## Events

The placeholder component emits an event (requestConsent) by clicking either on the button or on one of the links in the footer.

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-placeholder  @requestConsent="onRequestConsent()"></embed-placeholder>
</template>

<script>
import { EmbedPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/embed-placeholder';

export default {
  components: { EmbedPlaceholder },
  methods: {
    onRequestConsent() {
      console.log("request consent");
    },
  },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/embed-placeholder.css';
</style>
```
</details>
