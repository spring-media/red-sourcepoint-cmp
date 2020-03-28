# VendorMapping component

The VendorMapping component is a renderless component which provides an interface to the [vendor-mapping](../../../vendor-mapping) package.

## API

### Slots

#### default

| Slot Props              | Signature                                  |
| ----------------------- |------------------------------------------- |
| getVendorIdByName       | (vendorName: string): string \| undefined  |
| getVendorNameById       | (vendorId: string): string \| undefined    |
| getPurposeIdByName      | (purposeName: string): string \| undefined |
| getPurposeNameById      | (purposeId: string): string \| undefined   |
| getVendorPurposesByName | (vendorName: string): string[]             |
| getVendorPurposesById   | (vendorId: string): string[]               |

## Example

```javascript
<template>
  <div>
    <vendor-mapping v-slot="{ getVendorPurposesById }">
      <some-other-component :purposes="getVendorPurposesById(vendorId)"></some-other-component>
    </vendor-mapping>
  </div
</template>

<script>
import { VendorMapping } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/VendorMapping';

export default {
  data: () => ({ vendorId: '1234' }),
  components: { VendorMapping }
}
</script>
```
