# Placeholder component for Facebook embeds

<p>
  <img src="../../../../docs/embed-facebook-placeholder.png" alt="Embed placeholder Facebook" width="500" />
</p>

<details>
<summary>Example</summary>

```javascript
<template>
  <embed-facebook-placeholder :privacyManagerId="privacyManagerId"></embed-facebook-placeholder>
</template>

<script>
import { EmbedFacebookPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedFacebookPlaceholder';

export default {
  components: { EmbedFacebookPlaceholder },
  data: () => ({
    privacyManagerId: 12345,
  }),
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedFacebookPlaceholder.css';
</style>
```
</details>

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |
