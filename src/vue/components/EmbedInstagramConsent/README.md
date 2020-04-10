# Consent Component for Instagram Embeds

This component handles the consent for Instagram embeds. It will render either the [placeholder](../EmbedInstagramPlaceholder) if no consent is given, or the [embed](../EmbedInstagram).

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| content          | string | false    | HTML embed content for given vendor that usually comes from Iframely  |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |

## Example

```vue
<template>
  <embed-instagram-consent :privacyManagerId="privacyManagerId" :content="content"></embed-instagram-consent>
</template>

<script>
import { EmbedInstagramConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedInstagramConsent';

export default {
  components: { EmbedInstagramConsent },
  data: () => ({
    privacyManagerId: 12345,
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
