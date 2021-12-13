# Placeholder component for Youtube embeds

<p>
  <img src="../../../../docs/embed-youtube-placeholder.png" alt="Embed placeholder Youtube" width="500" />
</p>

<details>
<summary>Example</summary>

```vue
<template>
  <embed-youtube-placeholder :privacyManagerId="privacyManagerId"></embed-youtube-placeholder>
</template>

<script>
import { EmbedYoutubePlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedYoutubePlaceholder },
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
