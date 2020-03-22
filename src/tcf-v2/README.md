# TCF-V2 Package

## API

> The following examples refer to the esm-bundle. 
> When using the browser-bundle, all methods are properties of the global object named "RedSourcepointTCFV2"

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
import { getTCData } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2'; import {hasConsent} from "./has-consent";

getTCData().then(data => console.log(data)).catch(error => console.error(error));
```    
</details>

### `customVendorHasConsent(vendor: Consent): Promise<boolean>;`

Checks whether the user has consented to given vendor.

<details>
<summary>Example</summary>
    
```javascript
import { customVendorHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2'; import {hasConsent} from "./has-consent";

const vendor = { _id: '123456' };

customVendorHasConsent(vendor).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
```    
</details>

### `purposeHasConsent(purpose: Purpose): Promise<boolean>;`

Checks whether the user has consented to given purpose.

<details>
<summary>Example</summary>
    
```javascript
import { purposeHasConsent } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2'; import {hasConsent} from "./has-consent";

const purpose = { _id: '123456' };

purposeHasConsent(purpose).then(hasConsent => console.log(hasConsent)).catch(error => console.error(error));
```
</details>

### `loadPrivacyManagerModal(managerId: string): void;`

Open a privacy-manager modal by given managerId.

<details>
<summary>Example</summary>
    
```javascript
import { loadPrivacyManagerModal } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2'; import {hasConsent} from "./has-consent";

loadPrivacyManagerModal('12345');
```
</details>

### `hasConsent(consent: Consent, collection: Consent[]): boolean;`

Checks whether given collection contains given consent object.

### `consentsAreEqual(...consents: Consent[]): boolean;`

Checks whether given consent objects are equal.

> Consent objects are treated as equal when they share the same _id property.

## Optional Callbacks
[Documentation](./callbacks/README.md)
