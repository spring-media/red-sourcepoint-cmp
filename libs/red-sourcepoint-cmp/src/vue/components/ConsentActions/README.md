# ConsentActions Component

The ConsentActions component is a renderless component which provides methods to give consents programmatically.

## API

### Slots

#### default

| Slot Props     | Signature                                                     | Description                                    |
| -------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| consentVendor  | (vendorId: string): void                                      | Give consent for given vendor and its purposes |
| consentPurpose | (purposeId: string): void                                     | Give consent for given purpose and its vendors |
| customConsent  | (payload: { vendorIds: string[], purposeIds: string[] ): void | Give consent for given payload                 |

## Example

```vue
<template>
  <div>
    <consent-actions v-slot="{ consentVendor, consentPurpose, customConsent }">
        <div>
            <button @click="consentPurpose(purposeId)">Consent Purpose</button>
            <button @click="consentVendor(vendorId)">Consent Vendor</button>
            <button @click="customConsent(customConsent)">Custom Consent</button>
        </div>
    </consent-actions>
  </div>
</template>

<script>
import { ConsentActions } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/components';

export default {
  data: () => ({ purposeId: '1', vendorId: '2', consents: { vendorIds: ['1'], purposeIds: ['2'] } }),
  components: { ConsentActions }
}
</script>
```
