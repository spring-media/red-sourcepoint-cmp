# Consent Component for Youtube Embeds

This component handles the consent for Youtube embeds. It will render either the [placeholder](../EmbedYoutubePlaceholder) if no consent is given, or the [embed](../EmbedYoutube).

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

## Props

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| content          | string | false    | HTML embed content for given vendor that usually comes from Iframely  |
| privacyManagerId | number | true     | Id of a privacy manager to open when clicking on certain areas within the placeholder |

## Example

```vue
<template>
  <embed-youtube-consent :privacyManagerId="privacyManagerId" :content="content"></embed-youtube-consent>
</template>

<script>
import { EmbedYoutubeConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedYoutubeConsent },
  data: () => ({
    privacyManagerId: 12345,
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
