## Callbacks

Sourcepoint provides [callbacks](https://documentation.sourcepoint.com/web-implementation/sourcepoint-set-up-and-configuration-v2/optional-callbacks) as part of the configuration to react on certain user interactions or lifecycle events.

> The following examples refer to the esm-bundle. 
> When using the browser-bundle, all methods are properties of the global object named **RedSourcepointCallbacks**

### onPrivacyManagerAction

<details>
<summary>Example</summary>

```javascript
import { onPrivacyManagerAction } from '@spring-media/red-sourcepoint-cmp/dist/esm/callbacks';

onPrivacyManagerAction(() => console.log('onPrivacyManagerAction'));
```

</details>

### onPMCancel

<details>
<summary>Example</summary>
    
```javascript
import { onPMCancel } from '@spring-media/red-sourcepoint-cmp/dist/esm/callbacks';

onPMCancel(() => console.log('onPMCancel'));
```

</details>

### onConsentReady

<details>
<summary>Example</summary>
    
```javascript
import { onConsentReady } from '@spring-media/red-sourcepoint-cmp/dist/esm/callbacks';

onConsentReady(() => console.log('onConsentReady'));
```

</details>

### onMessageReady

<details>
<summary>Example</summary>
        
```javascript
import { onMessageReady } from '@spring-media/red-sourcepoint-cmp/dist/esm/callbacks';

onMessageReady(() => console.log('onMessageReady'));
```

</details>
