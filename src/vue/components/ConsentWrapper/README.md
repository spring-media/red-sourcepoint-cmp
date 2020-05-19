# Consent Component for General Use

This component encapsulates handling the consent logic for a given vendor. 
You can use it to build consent-components if the provided consent components (e.g. EmbedFacebookConsent) doesn't fit your needs.

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

> Furthermore, the mapping of given vendorId and it's purpose(s) will be done by using the [vendor mapping](../../../vendor-mapping) package.

## Props

| Name             | Type   | Required | Description    |
| ---------------- | ------ | -------- | -------------- |
| vendorId         | string | true     | ID of a vendor |

## Slots

| Name             | Description                          |
| ---------------- | ------------------------------------ |
| disabledContent      | Renders the slot on no given consent |
| enabledContent       | Renders the slot on given consent    |

## Example

```vue
<template>
  <embed-consent :vendorId="vendorId">
      <template #disabledContent>
        <some-embed-placeholder :privacyManagerId="privacyManagerId"></some-embed-placeholder>
      </template>
      <template #enabledContent>
        <some-embed :content="content"></some-embed>
      </template>
    </embed-consent>
</template>

<script>
import { ConsentWrapper } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  components: { ConsentWrapper },
  data: () => ({
    vendorId: '#12345',
    privacyManagerId: 12345,
    content: 'some oembed/iframely html content'
  }),
};
</script>
```
