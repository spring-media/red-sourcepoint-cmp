# Placeholder component for Twitter embeds

<p>
  <img src="../../../../docs/embed-twitter-placeholder.png" alt="Embed placeholder Twitter" width="500" />
</p>

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-twitter-placeholder></embed-twitter-placeholder>
</template>

<script>
import { EmbedTwitterPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedTwitterPlaceholder';

export default {
  components: { EmbedTwitterPlaceholder },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedTwitterPlaceholder.css';
</style>
```
</details>

## Events

The placeholder component emits an event (requestConsent) by clicking either on the button or on one of the links in the footer.

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-twitter-placeholder  @requestConsent="onRequestConsent()"></embed-twitter-placeholder>
</template>

<script>
import { EmbedTwitterPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedTwitterPlaceholder';

export default {
  components: { EmbedTwitterPlaceholder },
  methods: {
    onRequestConsent() {
      console.log("request consent");
    },
  },
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedTwitterPlaceholder.css';
</style>
```
</details>
