# Component for Instagram Embeds

This component can be used to process and display Instagram (OEmbed format) content.

> Instagram needs to run some code after embedding content into the page. For other vendors consider using the provided generic embed component [EmbedContent](../EmbedContent/README.md).


## Props

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| content | string | true     | HTML embed content for given vendor that usually comes from Iframely (OEmbed format)  |

## Example

```vue
<template>
  <embed-instagram :content="content"></embed-instagram>
</template>

<script>
import { EmbedInstagram } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedInstagram },
  data: () => ({
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
