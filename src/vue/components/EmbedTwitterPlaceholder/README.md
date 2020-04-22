# Placeholder component for Twitter embeds

<p>
  <img src="../../../../docs/embed-twitter-placeholder.png" alt="Embed placeholder Twitter" width="500" />
</p>

<details>
<summary>Example</summary>

```vue
<template>
  <embed-twitter-placeholder :privacyManagerId="privacyManagerId"></embed-twitter-placeholder>
</template>

<script>
import { EmbedTwitterPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedTwitterPlaceholder },
  data: () => ({
    privacyManagerId: 12345,
  }),
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components.css';
</style>
```
</details>

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |
