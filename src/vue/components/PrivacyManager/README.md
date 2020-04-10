# PrivacyManager Component

The PrivacyManager component is a renderless component which provides an interface to the [sourcepoint](../../../sourcepoint) package.

## API

### Slots

#### default

| Slot Props              | Signature                          | 
| ----------------------- |----------------------------------- |
| loadPrivacyManagerModal | (managerId: number): void          |

## Example

```vue
<template>
  <div>
    <privacy-manager v-slot="{ loadPrivacyManagerModal }">
      <some-other-component @someAction="loadPrivacyManagerModal(managerId)"></some-other-component>
    </privacy-manager>
  </div
</template>

<script>
import { PrivacyManager } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components/privacy-manager';

export default {
  data: () => ({ managerId: 1234 }),
  components: { PrivacyManager }
}
</script>
```
