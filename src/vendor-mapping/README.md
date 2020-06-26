# Vendor Mapping Module

This module provides an API for handling relationships between vendors and purposes.

> Both, `configureGrants` and `loadVendorPurposeMapping`, functions must be called for the module to work properly.

## API

### Built in (custom) vendors and purposes

* [Custom Vendors](custom-vendors.ts)
* [Custom Purposes](custom-purposes.ts)

### `configureGrants`

```typescript
configureGrants(grants): void;
```

Configures the module by given grants-object that comes usually from the return value of the [getCustomVendorConsents](../sourcepoint/README.md#getcustomvendorconsents) API call.

<details>
<summary>Example</summary>
    
```javascript
import { configureGrants, vendorHasGrant } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

const grants = {
  '123': {
    purposeGrants: { '123': true, '456': true },
    vendorGrant: true,
  },
};

configureGrants(grants);

console.log(vendorHasGrant('123')); // true
```    
</details>

### `vendorHasGrant`

```typescript
vendorHasGrant(vendorId: string): boolean;
```

Returns true whether given vendor has consent.

<details>
<summary>Example</summary>
    
```javascript
import { vendorHasGrant, configureGrants } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

const grants = {
  '123': {
    purposeGrants: { '123': true, '456': true },
    vendorGrant: true,
  },
};

configureGrants(grants);

console.log(vendorHasGrant('123')); // true

// ------------------------

const grants = {
  '123': {
    purposeGrants: { '123': true, '456': false },
    vendorGrant: true,
  },
};

configureGrants(grants);

console.log(vendorHasGrant('123')); // false
```    
</details>

### `getGrantedVendors`

```typescript
getGrantedVendors(): string[];
```

Returns a list of consented (vendor) ids.


<details>
<summary>Example</summary>
    
```javascript
import { getGrantedVendors, configureGrants } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

const grants = {
  '123': {
    purposeGrants: { '123': true, '456': false },
    vendorGrant: true,
  },
  '456': {
    purposeGrants: { '123': true, '456': true },
    vendorGrant: true,
  },
  '789': {
    purposeGrants: { '123': true, '456': true },
    vendorGrant: false,
  },
};

configureGrants(grants);

console.log(getGrantedVendors()); /// ['456']

```    
</details>

### `getPurposeIdsForVendor`

```typescript
getPurposeIdsForVendor(vendorId: string): string[];
```

Returns a list of purpose ids that are linked to given vendor id.

<details>
<summary>Example</summary>
    
```javascript
import { getPurposeIdsForVendor, configureGrants } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

const grants = {
  '123': {
    purposeGrants: { '456': true, '789': false },
    vendorGrant: true,
  },
};

configureGrants(grants);

console.log(getPurposeIdsForVendor('123')); // ['456', '789']
```    
</details>

### `getVendorIdsForPurpose`

```typescript
getVendorIdsForPurpose(purposeId: string): string[];
```

Returns a list of vendor ids that are linked to given purpose id.

<details>
<summary>Example</summary>
    
```javascript
import { getVendorIdsForPurpose, configureGrants } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

const grants = {
  '1': {
    purposeGrants: { '4': true, '5': false },
    vendorGrant: true,
  },
  '2': {
    purposeGrants: { '6': true, '7': false },
    vendorGrant: true,
  },
  '3': {
    purposeGrants: { '8': true, '4': false },
    vendorGrant: true,
  },
};

configureGrants(grants);

console.log(getVendorIdsForPurpose('4')); // ['1', '3']

```    
</details>

### `dumpPurposeRelations`

```typescript
dumpPurposeRelations(purposeId: string): { vendorIds: string[], purposeIds: string[] };
```

This function performs a deep dump of the relations of given purpose id. 
The result will include the vendor ids linked to given purpose id as well as the purpose ids linked to the resulting vendor ids.

> Use the return value of this function to give consents programmatically through [postCustomConsent](../sourcepoint/README.md#postcustomconsent)

<details>
<summary>Example</summary>
    
```javascript
import { dumpPurposeRelations, configureGrants } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

const grants = {
  '1': {
    purposeGrants: { '4': true, '5': false },
    vendorGrant: true,
  },
  '2': {
    purposeGrants: { '6': true, '7': false },
    vendorGrant: true,
  },
  '3': {
    purposeGrants: { '8': true, '4': false },
    vendorGrant: true,
  },
};

configureGrants(grants);

console.log(dumpPurposeRelations('4')); // { vendorIds: ['1', '3'], purposeIds: ['4', '5'], legitimateInterestIds: ['8'] }
```    
</details>

### `loadVendorPurposeMapping`

```typescript
loadVendorPurposeMapping(propertyId: number): Promise<VendorPurposeMappings>;
```

Loads a list of vendors and associated purposes (including the type of the purpose).



<details>
<summary>Example</summary>
    
```javascript
import { loadVendorPurposeMapping } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

loadVendorPurposeMapping(1234).then(result => console.log(result)); // [{ vendorId: '1', categories: [{ _id: '2', type: 'CONSENT' }] }]
```    
</details>

