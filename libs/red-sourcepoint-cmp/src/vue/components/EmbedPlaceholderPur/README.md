# Placeholder component for generic embeds

> This component is also being used as the base component for vendor specific placeholder components.

<p>
  <img src="../../../../docs/embed-generic-placeholder.png" alt="Embed placeholder Generic" width="500" />
</p>


## Props

| Name             | Type   | Required | Description                                                                           |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------------------- |                                                                      |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |
| vendorId         | string | false    | Id of a vendor to give consent for (will take precedence of purposeId if both are set |
| purposeId        | string | false    | Id of a purpose to give consent for                                                   |

<details>
<summary>Example</summary>

```vue
<template>
  <embed-placeholder :vendor-id="vendorId" :privacy-manager-id="privacyManagerId"></embed-placeholder>
</template>

<script>
import { EmbedPlaceholder } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedPlaceholder },
  data: () => ({
    vendorId: '123',
    privacyManagerId: 123,
  }),
};
</script>

<style lang="scss">
@import '~@spring-media/red-sourcepoint-cmp/dist/esm/vue/components.css';
</style>
```
</details>

