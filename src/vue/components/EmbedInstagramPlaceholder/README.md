# Placeholder component for Instagram embeds

<p>
  <img src="../../../../docs/embed-instagram-placeholder.png" alt="Embed placeholder Instagram" width="500" />
</p>

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-instagram-placeholder></embed-instagram-placeholder>
</template>

<script>
import { EmbedInstagramPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedInstagramPlaceholder';

export default {
  components: { EmbedInstagramPlaceholder },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedInstagramPlaceholder.css';
</style>
```
</details>

## Events

The placeholder component emits an event (requestConsent) by clicking either on the button or on one of the links in the footer.

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-instagram-placeholder  @requestConsent="onRequestConsent()"></embed-instagram-placeholder>
</template>

<script>
import { EmbedInstagramPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedInstagramPlaceholder';

export default {
  components: { EmbedInstagramPlaceholder },
  methods: {
    onRequestConsent() {
      console.log("request consent");
    },
  },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedInstagramPlaceholder.css';
</style>
```
</details>
