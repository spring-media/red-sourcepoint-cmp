# Consent Component for Twitter Embeds

This component handles the consent for Twitter embeds. It will render either the [placeholder](../EmbedTwitterPlaceholder) if no consent is given, or the [embed](../EmbedTwitter).

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| content          | string | false    | HTML embed content for given vendor that usually comes from Iframely  |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |

## Example

```javascript
<template>
  <embed-twitter-consent :privacyManagerId="privacyManagerId" :content="content"></embed-twitter-consent>
</template>

<script>
import { EmbedTwitterConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/EmbedTwitterConsent';

export default {
  components: { EmbedTwitterConsent },
  data: () => ({
    privacyManagerId: 12345,
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
