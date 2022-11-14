# Placeholder component for generic social networks embeds

> This component is also being used as the base component for vendor specific placeholder components.

<p>
  <img src="../../../../docs/embed-social-networks-placeholder.png" alt="Embed placeholder social networks" width="500" />
</p>

<details>
<summary>Example</summary>

```vue
<template>
  <embed-social-networks-placeholder :privacyManagerId="privacyManagerId"></embed-social-networks-placeholder>
</template>

<script>
import { EmbedSocialNetworksPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedSocialNetworksPlaceholder },
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
