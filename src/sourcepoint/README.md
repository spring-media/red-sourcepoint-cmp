# Sourcepoint Module

### `getCustomVendorConsents()`

```typescript
getCustomVendorConsents(): Promise<CustomVendorConsentsResult>;
```

Retrieves the consent status of custom vendors to which the user has consented.

<details>
<summary>Example</summary>
    
```javascript
import { getCustomVendorConsents } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

getCustomVendorConsents().then(result => console.log(result)).catch(error => console.error(error));
```    
</details>

### `postCustomConsent`

```typescript
postCustomConsent({vendorIds?: string[], purposeIds?: string[], legitimateInterestIds?: string[]}): Promise<PostCustomConsentResult | null>;
```

Function to give consents to vendors, purposes or legitimate interests programmatically.

<details>
<summary>Example</summary>
    
```javascript
import { postCustomConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

postCustomConsent({vendorIds: [], purposeIds: [], legitimateInterestIds: []}).then(result => console.log(result)).catch(error => console.error(error));
```    
</details>

### `customVendorHasConsent`

```typescript
customVendorHasConsent(vendor: Consent): Promise<boolean>;
```

Checks whether the user has consented to given vendor.

<details>
<summary>Example</summary>
    
```javascript
import { customVendorHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

const vendor = { _id: '123456' };

customVendorHasConsent(vendor).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
```    
</details>

### `customPurposeHasConsent`

```typescript
customPurposeHasConsent(purpose: CustomPurpose): Promise<boolean>;
```

Checks whether the user has consented to given purpose.

<details>
<summary>Example</summary>
    
```javascript
import { customPurposeHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

const purpose = { _id: '123456' };

customPurposeHasConsent(purpose).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
```
</details>

### `loadPrivacyManagerModal`

```typescript
loadPrivacyManagerModal(managerId: string): void;
```

Open a privacy-manager modal by given managerId.

<details>
<summary>Example</summary>
    
```javascript
import { loadPrivacyManagerModal } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

loadPrivacyManagerModal('12345');
```
</details>

### `hasCustomConsent`

```typescript
hasCustomConsent(consent: CustomConsent, collection: CustomConsent[]): boolean;
```

Helper utility to check whether given collection contains given consent object.

<details>
<summary>Example</summary>
    
```javascript
import { hasCustomConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

const consent1 = { _id: '12345' };
const consent2 = { _id: '123456' };

const collection = [{ _id: '12345' }];

console.log(hasCustomConsent(consent1, collection)); // true
console.log(hasCustomConsent(consent2, collection)); // false
```
</details>

### `customConsentsAreEqual`

```typescript
customConsentsAreEqual(...consents: Consent[]): boolean;
```

Helper utility to checks whether given consent objects are equal.

> Consent objects are treated as equal when they share the same _id property.

<details>
<summary>Example</summary>
    
```javascript
import { customConsentsAreEqual } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

const consent1 = { _id: '12345' };
const consent2 = { _id: '123456' };
const consent3 = { _id: '12345' };

console.log(customConsentsAreEqual(consent1, consent2, consent3)); // false 
console.log(customConsentsAreEqual(consent1, consent3)); // true 
```
</details>

### `getRemovedCustomConsents`

```typescript
getRemovedCustomConsents(consents: CustomConsent[], compareTo: CustomConsent[]): CustomConsent[];
```

Helper utility to get all custom vendors 

<details>
<summary>Example</summary>
    
```javascript
import { getRemovedCustomConsents } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

const vendors = [{ _id: '1' }, { _id: '2' }, { _id: '3' }];
const compareTo = [{ _id: '1' }, { _id: '2' }, { _id: '4' }, { _id: '5' }];

console.log(getRemovedCustomConsents(vendors, compareTo)); // [{ _id: 3 }]
```
</details>

## Optional Callbacks
[Documentation](../sourcepoint-callbacks)
