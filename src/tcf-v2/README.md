# TCF-V2 Package

## API

> The following examples refer to the esm-bundle. 
> When using the browser-bundle, all methods are properties of the global object named **RedCMP**

### `getCustomVendorConsents(): Promise<CustomVendorConsentsResult>;`

Retrieves the consent status of custom vendors to which the user has consented.

<details>
<summary>Example</summary>
    
```javascript
import { getCustomVendorConsents } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

getCustomVendorConsents().then(result => console.log(result)).catch(error => console.error(error));
```    
</details>

### `getTCData(): Promise<TCDataResult>;`

Returns a bunch of consent data.

<details>
<summary>Example</summary>
    
```javascript
import { getTCData } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

getTCData().then(data => console.log(data)).catch(error => console.error(error));
```    
</details>

### `customVendorHasConsent(vendor: Consent, options: HasConsentOptions): Promise<boolean>;`

Checks whether the user has consented to given vendor.

<details>
<summary>Example</summary>
    
```javascript
import { customVendorHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

const vendor = { _id: '123456' };

customVendorHasConsent(vendor).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
```    
</details>

#### Options parameters

| Name    | Type    | Description                                              | default |
| ------- | ------- | -------------------------------------------------------- | ------- |
| cache   | boolean | Set to false to fetch the newest values from Sourcepoint | true    |

### `purposeHasConsent(purpose: Purpose, options: HasConsentOptions): Promise<boolean>;`

Checks whether the user has consented to given purpose.

<details>
<summary>Example</summary>
    
```javascript
import { purposeHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

const purpose = { _id: '123456' };

purposeHasConsent(purpose).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
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
import { loadPrivacyManagerModal } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

loadPrivacyManagerModal('12345');
```
</details>

### `hasConsent(consent: Consent, collection: Consent[]): boolean;`

Helper utility to check whether given collection contains given consent object.

<details>
<summary>Example</summary>
    
```javascript
import { hasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

const consent1 = { _id: '12345' };
const consent2 = { _id: '123456' };

const collection = [{ _id: '12345' }];

console.log(hasConsent(consent1, collection)); // true
console.log(hasConsent(consent2, collection)); // false
```
</details>

### `consentsAreEqual(...consents: Consent[]): boolean;`

Helper utility to checks whether given consent objects are equal.

> Consent objects are treated as equal when they share the same _id property.

<details>
<summary>Example</summary>
    
```javascript
import { consentsAreEqual } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

const consent1 = { _id: '12345' };
const consent2 = { _id: '123456' };
const consent3 = { _id: '12345' };

console.log(consentsAreEqual(consent1, consent2, consent3)); // false 
console.log(consentsAreEqual(consent1, consent3)); // true 
```
</details>

## Optional Callbacks
[Documentation](callbacks)


### Types`

#### `Consent`

```typescript
{ _id: string, name: string, vendorType: string }
```

#### `Purpose`

```typescript
{ _id: string, name: string }
```

#### `HasConsentOptions`

```typescript
{ cache: boolean }
```

#### `CustomVendorConsentsResult`

```typescript
{ consentedPurposes: Purpose[], consentedVendors: Vendor[] }
```
