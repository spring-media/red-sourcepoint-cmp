# TCF-V2 API Package

This package acts like a thin abstraction layer for the official TCF-V2 specs that are implemented by Sourcepoint.

## API

> The following examples refer to the esm-bundle. 
> When using the browser-bundle, all methods are properties of the global object named **RedCMP**

### `getTCData(callback: GetTCDataCallback, vendorIds?: number[]): void;`

Returns a bunch of consent data.

<details>
<summary>Example</summary>
    
```javascript
import { getTCData } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

getTCData((tcData, success) => console.log(tcData), [1]);
```    
</details>

### `addEventListener(callback: AddEventListenerCallback): void;`

Registers a listener to the TCF-V2 API

```javascript
import { addEventListener } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

addEventListener((tcData, success) => console.log(tcData));
```

### `removeEventListener(callback: RemoveEventListenerCallback, listenerId: ListenerId): void;`

Removes a previously registered listener to the TCF-V2 API

```javascript
import { removeEventListener } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

removeEventListener((success) => console.log(sucess));
```
