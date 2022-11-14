# Consent Wrapper Component

The Consent-Wrapper Component renders is a renderless component that renders either a slot on given consent (#enabledContent) or a slot if no consent is given (#disabledContent).
In order to render the #enabledContent slot, the given vendorId must have a consent.

## Props

| Name     | Type   | Required | Default | Description                                       |
| -------- | ------ | -------- | ------- |-------------------------------------------------- |
| vendorId | string | true     | -       | ID of a (custom) vendor                           |

## Example

```vue
<template>
  <consent-wrapper :vendorId="vendorId">
    <template #enabledContent>
      <div>Consent</div>
    </template>
    <template #disabledContent>
      <div>No Consent</div>
    </template>
  </consent-wrapper>
</template>

<script>
import { ConsentWrapper } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { ConsentWrapper },
  data: () => ({
    vendorId: '#12345',
  }),
};
</script>
```
