# Component for Podigee Embeds

This component can be used to process and display Podigee (OEmbed format) content.

> Podigee needs to run some code after embedding content into the page. For other vendors consider using the provided generic embed component [EmbedContent](../EmbedContent/README.md).


## Props

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| content | string | true     | HTML embed content for given vendor that usually comes from Iframely (OEmbed format)  |

## Example

```vue
<template>
  <embed-podigee :content="content"></embed-podigee>
</template>

<script>
import { EmbedPodigee } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { EmbedPodigee },
  data: () => ({
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
