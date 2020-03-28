# PrivacyManager Component

The PrivacyManager component is a renderless component which provides an interface to the [tcf-v2](../../../tcf-v2) package.

## API

### Slots

#### default

| Slot Props | Signature                          | 
| ---------- |----------------------------------- |
| loadModal  | loadModal(managerId: number): void |

## Example

```javascript
<template>
  <div>
    <privacy-manager v-slot="{ loadModal }">
      <some-other-component @someAction="loadModal(managerId)"></some-other-component>
    </privacy-manager>
  </div
</template>

<script>
import { PrivacyManager } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/PrivacyManager';

export default {
  data: () => ({ managerId: 1234 }),
  components: { PrivacyManager }
}
</script>
```
