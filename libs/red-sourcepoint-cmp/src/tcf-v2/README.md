# TCF-V2 API Module

This package acts like a thin abstraction layer for the official TCF-V2 specs that are implemented by Sourcepoint.

## API

> The following examples refer to the esm-bundle. 
> When using the browser-bundle, all methods are properties of the global object named **RedCMP**

### `getTCData`

```typescript
getTCData(callback: GetTCDataCallback, vendorIds?: number[]): void;
```

Returns a bunch of consent data. [Official Specifications](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#gettcdata)

<details>
<summary>Example</summary>
    
```javascript
import { getTCData } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

getTCData((tcData, success) => console.log(tcData), [1]);
```    
</details>

### `addEventListener`

```typescript
addEventListener(callback: AddEventListenerCallback): void;
```

Registers a listener to the CMP. [Official Specifications](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#addeventlistener)

```javascript
import { addEventListener } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

addEventListener((tcData, success) => console.log(tcData));
```

### `removeEventListener`

```typescript
removeEventListener(callback: RemoveEventListenerCallback, listenerId: ListenerId): void;
```

Removes a previously registered listener from the CMP. [Official Specifications](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#removeeventlistener)

```javascript
import { removeEventListener } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

removeEventListener((success) => console.log(success));
```

### `ping`

```typescript
ping(callback: PingCallback): void;
```

Retrieves information about the loading status and configuration of the CMP. [Official Specifications](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#ping)

```javascript
import { ping } from '@spring-media/red-sourcepoint-cmp/dist/esm/tcf-v2';

ping((ping) => console.log(ping));
```
