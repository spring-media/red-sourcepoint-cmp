# ConsentActions Component

The ConsentActions component is a renderless component which provides methods to give consents programmatically.

## API

### Slots

#### default

| Slot Props           | Signature          | 
| ---------------------|------------------- |
| consentCustomPurpose | (id: string): void |

## Example

```vue
<template>
  <div>
    <consent-actions v-slot="{ consentCustomPurpose }">
      <button @click="consentCustomPurpose(purposeId)">Consent Custom Purpose</button>
    </consent-actions>
  </div>
</template>

<script>
import { ConsentActions } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  data: () => ({ purposeId: 1234 }),
  components: { ConsentActions }
}
</script>
```
