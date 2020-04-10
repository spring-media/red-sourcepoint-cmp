# Placeholder component for Instagram embeds

<p>
  <img src="../../../../docs/embed-instagram-placeholder.png" alt="Embed placeholder Instagram" width="500" />
</p>

<details>
<summary>Example</summary>

```vue
<template>
  <embed-instagram-placeholder :privacyManagerId="privacyManagerId"></embed-instagram-placeholder>
</template>

<script>
import { EmbedInstagramPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedInstagramPlaceholder';

export default {
  components: { EmbedInstagramPlaceholder },
  data: () => ({
    privacyManagerId: 12345,
  }),
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedInstagramPlaceholder.css';
</style>
```
</details>

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |
