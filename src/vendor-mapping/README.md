# Static Vendor Mapping Package

As long as Sourcepoint provides no API for getting relationships between vendors and purposes, 
we need to have some kind of static mapping between these two entities.

## API

### `getVendorIdByName(name: string): string | undefined`

Returns the vendor id by given name or undefined if not exists.

<details>
<summary>Example</summary>
    
```javascript
import { getVendorIdByName, VENDOR_NAME_FACEBOOK } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(getVendorIdByName(VENDOR_NAME_FACEBOOK)); // 5e716fc09a0b5040d575080f
```    
</details>

### `getPurposeIdByName(name: string): string | undefined`

Returns the purpose id by given name or undefined if not exists.

<details>
<summary>Example</summary>
    
```javascript
import { getPurposeIdByName, PURPOSE_NAME_SOCIAL } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(getPurposeIdByName(PURPOSE_NAME_SOCIAL)); // 5e7adb1ee30e7d1bc1ec0252
```    
</details>

### `getVendorNameById(id: string): string | undefined`

Returns the vendor name by given id or undefined if not exists.

<details>
<summary>Example</summary>
    
```javascript
import { getVendorNameById, VENDOR_ID_FACEBOOK } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(getVendorNameById(VENDOR_ID_FACEBOOK)); // facebook
```    
</details>

### `getPurposeNameById(id: string): string | undefined`

Returns the purpose name by given id or undefined if not exists.

<details>
<summary>Example</summary>
    
```javascript
import { getPurposeNameById, PURPOSE_ID_SOCIAL } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(getPurposeNameById(PURPOSE_ID_SOCIAL)); // 5e7adb1ee30e7d1bc1ec0252
```    
</details>

### `hasRelationByName(vendorName: string, purposeName: string): boolean`

Returns true if given vendor(name) has a relation to given purpose(name), otherwise false.

<details>
<summary>Example</summary>
    
```javascript
import { hasRelationByName, VENDOR_NAME_INSTAGRAM, PURPOSE_NAME_SOCIAL } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(hasRelationByName(VENDOR_NAME_INSTAGRAM, PURPOSE_NAME_SOCIAL)); // true
```
</details>

### `hasRelationById(vendorId: string, purposeId: string): boolean`

Returns true if given vendor(id) has a relation to given purpose(id), otherwise false.

<details>
<summary>Example</summary>
    
```javascript
import { hasRelationById, VENDOR_ID_INSTAGRAM, PURPOSE_ID_SOCIAL } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(hasRelationById(VENDOR_ID_INSTAGRAM, PURPOSE_ID_SOCIAL)); // true
```
</details>
