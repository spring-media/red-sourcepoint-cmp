# Component for rendering arbitrary (OEmbed) html content

This component can be used to process and display arbitrary (OEmbed) content.

## Props

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| content | string | true     | HTML embed content for given vendor that usually comes from Iframely (OEmbed format)  |

## Example

```vue
<template>
  <embed-content :content="content"></embed-content>
</template>

<script>
import { EmbedContent } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedContent },
  data: () => ({
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
