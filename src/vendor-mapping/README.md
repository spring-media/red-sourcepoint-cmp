# Static Vendor Mapping Package

As long as Sourcepoint doesn't provides an API for getting relationships between vendors and purposes, 
we need to have some kind of static mapping between these two entities.

## API

### Built in (custom) vendors and purposes

* [Custom Vendors](custom-vendors.ts)
* [Custom Purposes](custom-purposes.ts)

> The following examples refer to the esm-bundle. 
> When using the browser-bundle, all methods are properties of the global object named **RedCMP**

### `getCustomVendor(key: string): string | undefined`

Returns either a vendor id by given name or a vendor name by given id or undefined if an entry not exists.

<details>
<summary>Example</summary>
    
```javascript
import { getCustomVendor, VENDOR_NAME_FACEBOOK, VENDOR_ID_FACEBOOK } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(getCustomVendor(VENDOR_NAME_FACEBOOK)); // 5e716fc09a0b5040d575080f
console.log(getCustomVendor(VENDOR_ID_FACEBOOK)); // facebook
```    
</details>

### `getCustomPurpose(key: string): string | undefined`

Returns either a purpose id by given name or a purpose name by given id or undefined if an entry not exists.

<details>
<summary>Example</summary>
    
```javascript
import { getCustomPurpose, PURPOSE_NAME_SOCIAL, PURPOSE_ID_SOCIAL } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(getCustomPurpose(PURPOSE_NAME_SOCIAL)); // 5e7adb1ee30e7d1bc1ec0252
console.log(getCustomPurpose(PURPOSE_ID_SOCIAL)); // social
```    
</details>

### `addCustomVendor(key: string, value: string): Map<string, string>`

Adds an entry to the custom vendors list.

<details>
<summary>Example</summary>
    
```javascript
import { addCustomVendor, getCustomVendor } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

addCustomVendor('key', 'value');
console.log(getCustomVendor('key')); // value
```    
</details>

### `addCustomPurpose(key: string, value: string): Map<string, string>`

Adds an entry to the custom purposes list.

<details>
<summary>Example</summary>
    
```javascript
import { addCustomPurpose, getCustomPurpose } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

addCustomPurpose('key', 'value');
console.log(getCustomPurpose('key')); // value
```    
</details>

### `removeCustomVendor(key: string, value: string): boolean`

Removes an entry from the custom vendors list. Returns `true` on success, otherwise `false`.

<details>
<summary>Example</summary>
    
```javascript
import { removeCustomVendor, getCustomVendor, VENDOR_NAME_FACEBOOK } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

removeCustomVendor(VENDOR_NAME_FACEBOOK);
console.log(getCustomVendor(VENDOR_NAME_FACEBOOK)); // undefined
```    
</details>

### `removeCustomPurpose(key: string, value: string): boolean`

Removes an entry from the custom purposes list. Returns `true` on success, otherwise `false`.

<details>
<summary>Example</summary>
    
```javascript
import { removeCustomPurpose, getCustomPurpose, PURPOSE_ID_SOCIAL } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

removeCustomPurpose(PURPOSE_ID_SOCIAL);
console.log(getCustomPurpose(PURPOSE_ID_SOCIAL)); // undefined
```    
</details>

### `getRelations(key: string): string[] | undefined`

Returns an entry from the relations list.

<details>
<summary>Example</summary>
    
```javascript
import { getRelations, VENDOR_ID_FACEBOOK } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(getRelations(VENDOR_ID_FACEBOOK)); // [<PURPOSE_ID_SOCIAL>]
```    
</details>

### `hasRelations(key: string): boolean`

Returns whether given key has relations.

<details>
<summary>Example</summary>
    
```javascript
import { hasRelations, VENDOR_ID_FACEBOOK } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

console.log(hasRelations(VENDOR_ID_FACEBOOK)); // true
```    
</details>

### `setRelations(key: string, relations: string[]): Map<string, string[]>`

Sets an entry to the relations list.

<details>
<summary>Example</summary>
    
```javascript
import { setRelations, getRelations } from '@spring-media/red-sourcepoint-cmp/dist/esm/vendor-mapping';

setRelations('someKey', ['value1', 'value2']);
console.log(getRelations('someKey')); // ['value1', 'value2']
```    
</details>
