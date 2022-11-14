# Consent Component for Podigee Embeds

This component handles the consent for Podigee embeds. It will render either the default [placeholder](../EmbedPlaceholder) if no consent is given, or the [embed](../EmbedPodigee).

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| content          | string | false    | HTML embed content for given vendor that usually comes from Iframely                  |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |
| vendorId         | string | true     | Id of a vendor to check consent for                                                   |

## Example

```vue
<template>
  <embed--podigee-consent :privacyManagerId="privacyManagerId" :content="content" :vendorId="vendorId"></embed-consent>
</template>

<script>
import { EmbedPodigeeConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedPodigeeConsent },
  data: () => ({
    privacyManagerId: 12345,
    content: 'some oembed/iframely html content',
    vendorId: 'abc',
  }),
};
</script>
```
