# Placeholder component for Facebook embeds

<p>
  <img src="../../../../docs/embed-facebook-placeholder.png" alt="Embed placeholder Facebook" width="500" />
</p>

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-facebook-placeholder></embed-facebook-placeholder>
</template>

<script>
import { EmbedFacebookPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedFacebookPlaceholder';

export default {
  components: { EmbedFacebookPlaceholder },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedFacebookPlaceholder.css';
</style>
```
</details>

## Events

The placeholder component emits an event (requestConsent) by clicking either on the button or on one of the links in the footer.

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-facebook-placeholder  @requestConsent="onRequestConsent()"></embed-facebook-placeholder>
</template>

<script>
import { EmbedFacebookPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedFacebookPlaceholder';

export default {
  components: { EmbedFacebookPlaceholder },
  methods: {
    onRequestConsent() {
      console.log("request consent");
    },
  },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedFacebookPlaceholder.css';
</style>
```
</details>
