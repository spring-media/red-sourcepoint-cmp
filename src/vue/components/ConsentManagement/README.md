# Consent Management Component

The Consent-Management Component renders is a renderless component that renders either a slot on given consent (#onConsent) or a slot if no consent is given (#onReject).
In order to render the #onConsent slot, either the prop vendorId or one of purposeIds have a consent.

> Internally it uses the [sourcepoint](../../vuex/sourcepoint) Vuex module. Make sure you setup the store properly.

## Props

| Name       | Type   | Required | Default | Description                      |
| ---------- | ------ | -------- | ------- |--------------------------------- |
| vendorId   | string | true     | -       | ID of a (custom) vendor          |
| purposeIds | number | false    | []      | List of IDs of (custom) purposes |

## Example

```javascript
<template>
  <consent-management :vendorId="vendorId" :purposeIds="purposeIds">
    <template #onConsent>
      <div>Consent</div>
    </template>
    <template #onReject>
      <div>No Consent</div>
    </template>
  </consent-management>
</template>

<script>
import { ConsentManagement } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/ConsentManagement';

export default {
  components: { ConsentManagement },
  data: () => ({
    vendorId: '#12345',
    purposeIds: ['#54321']
  }),
};
</script>
```
