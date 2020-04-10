# Sourcepoint Module

### `getCustomVendorConsents(): Promise<CustomVendorConsentsResult>;`

Retrieves the consent status of custom vendors to which the user has consented.

<details>
<summary>Example</summary>
    
```javascript
import { getCustomVendorConsents } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

getCustomVendorConsents().then(result => console.log(result)).catch(error => console.error(error));
```    
</details>

### `customVendorHasConsent(vendor: Consent, options: HasConsentOptions): Promise<boolean>;`

Checks whether the user has consented to given vendor.

<details>
<summary>Example</summary>
    
```javascript
import { customVendorHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

const vendor = { _id: '123456' };

customVendorHasConsent(vendor).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
```    
</details>

#### Options parameters

| Name    | Type    | Description                                              | default |
| ------- | ------- | -------------------------------------------------------- | ------- |
| cache   | boolean | Set to false to fetch the newest values from Sourcepoint | true    |

### `customPurposeHasConsent(purpose: CustomPurpose, options: HasConsentOptions): Promise<boolean>;`

Checks whether the user has consented to given purpose.

<details>
<summary>Example</summary>
    
```javascript
import { customPurposeHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

const purpose = { _id: '123456' };

customPurposeHasConsent(purpose).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
```
</details>

#### Options parameters

| Name    | Type    | Description                                              | default |
| ------- | ------- | -------------------------------------------------------- | ------- |
| cache   | boolean | Set to false to fetch the newest values from Sourcepoint | true    |

### `loadPrivacyManagerModal(managerId: string): void;`

Open a privacy-manager modal by given managerId.

<details>
<summary>Example</summary>
    
```javascript
import { loadPrivacyManagerModal } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint';

loadPrivacyManagerModal('12345');
```
</details>

### `hasCustomConsent(consent: CustomConsent, collection: CustomConsent[]): boolean;`

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

### `customConsentsAreEqual(...consents: Consent[]): boolean;`

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

## Optional Callbacks
[Documentation](../sourcepoint-callbacks)
