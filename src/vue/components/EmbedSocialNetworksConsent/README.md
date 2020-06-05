# Consent Component for Social Networks Embeds

This component handles the consent for social networks embeds. It will render either the [placeholder](../EmbedSocialNetworksPlaceholder) if no consent is given, or the [embed](../EmbedContent).

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

## Props

| Name             | Type   | Required | Description                                                                           |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| vendorId         | string | true     | Sourcepoint specific ID of the vendor                                                 |
| content          | string | false    | HTML embed content for given vendor that usually comes from Iframely                  |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |

## Example

```vue
<template>
  <embed-social-networks-consent :vendor-id="vendorId" :privacy-manager-id="privacyManagerId" :content="content"></embed-social-networks-consent>
</template>

<script>
import { EmbedSocialNetworksConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedSocialNetworksConsent },
  data: () => ({
    vendorId: 'abc',
    privacyManagerId: 12345,
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
