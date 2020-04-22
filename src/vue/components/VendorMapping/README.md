# VendorMapping component

The VendorMapping component is a renderless component which provides an interface to the [vendor-mapping](../../../vendor-mapping) module.

## API

### Slots

#### default

| Slot Props          | Documentation                                                                     |
| ------------------- |---------------------------------------------------------------------------------- |
| getCustomVendor     | [vendor-mapping/getCustomVendor](../../../vendor-mapping#getcustomvendor)         |
| getCustomPurpose    | [vendor-mapping/getCustomPurpose](../../../vendor-mapping#getcustompurpose)       |
| removeCustomVendor  | [vendor-mapping/removeCustomVendor](../../../vendor-mapping#removecustomvendor)   |
| removeCustomPurpose | [vendor-mapping/removeCustomPurpose](../../../vendor-mapping#removecustompurpose) |
| addCustomVendor     | [vendor-mapping/addCustomVendor](../../../vendor-mapping#addcustomvendor)         |
| addCustomPurpose    | [vendor-mapping/addCustomPurpose](../../../vendor-mapping#addcustompurpose)       |
| getRelations        | [vendor-mapping/getRelations](../../../vendor-mapping#getrelations)               |
| hasRelations        | [vendor-mapping/hasRelations](../../../vendor-mapping#hasrelations)               |
| setRelations        | [vendor-mapping/setRelations](../../../vendor-mapping#setrelations)               |

## Example

```vue
<template>
  <div>
    <vendor-mapping v-slot="{ getVendorPurposesById }">
      <some-other-component :purposes="getVendorPurposesById(vendorId)"></some-other-component>
    </vendor-mapping>
  </div
</template>

<script>
import { VendorMapping } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  data: () => ({ vendorId: '1234' }),
  components: { VendorMapping }
}
</script>
```
