# ConsentedData component

The ConsentedData component is a renderless component that provides access to the state of the Vuex [sourcepoint](../../vuex/sourcepoint) module through the default (scoped) slot.

## Slots

| Name           | Type                                                 | Description                                       |
| -------------- | ---------------------------------------------------- |-------------------------------------------------- |
| customVendors  | [CustomVendor[]](../../../sourcepoint/typings.d.ts)  | List of custom vendors the user has consented to  |
| customPurposes | [CustomPurpose[]](../../../sourcepoint/typings.d.ts) | List of custom purposes the user has consented to |

## Example

```vue
<template>
  <consented-data v-slot="{ customVendors, customPurposes }">
    <some-other-component :vendors="customVendors" :purposes="customPurposes"></some-other-component>
  </consented-data>
</template>

<script>
import { ConsentedData } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/ConsentedData';

export default {
  components: { ConsentedData },
}
</script>
```
