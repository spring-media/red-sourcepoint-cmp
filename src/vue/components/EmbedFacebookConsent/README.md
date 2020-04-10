# Consent Component for Facebook Embeds

This component handles the consent for Facebook embeds. It will render either the [placeholder](../EmbedFacebookPlaceholder) if no consent is given, or the [embed](../EmbedFacebook).

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| content          | string | false    | HTML embed content for given vendor that usually comes from Iframely  |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |

## Example

```vue
<template>
  <embed-facebook-consent :privacyManagerId="privacyManagerId" :content="content"></embed-facebook-consent>
</template>

<script>
import { EmbedFacebookConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedFacebookConsent';

export default {
  components: { EmbedFacebookConsent },
  data: () => ({
    privacyManagerId: 12345,
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
