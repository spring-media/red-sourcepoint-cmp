## Sourcepoint Callbacks Module

Sourcepoint provides [callbacks](https://documentation.sourcepoint.com/web-implementation/sourcepoint-set-up-and-configuration-v2/optional-callbacks) as part of the configuration to react on certain user interactions or lifecycle events.

> The following examples refer to the esm-bundle. 
> When using the browser-bundle, all methods are properties of the global object named **RedCMP**

### onPrivacyManagerAction

<details>
<summary>Example</summary>

```javascript
import { onPrivacyManagerAction } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint-callbacks';

onPrivacyManagerAction((action) => console.log(action));
```

</details>

### onPMCancel

<details>
<summary>Example</summary>
    
```javascript
import { onPMCancel } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint-callbacks';

onPMCancel(() => console.log('onPMCancel'));
```

</details>

### onConsentReady

<details>
<summary>Example</summary>
    
```javascript
import { onConsentReady } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint-callbacks';

onConsentReady(() => console.log('onConsentReady'));
```

</details>

### onMessageReady

<details>
<summary>Example</summary>
        
```javascript
import { onMessageReady } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint-callbacks';

onMessageReady(() => console.log('onMessageReady'));
```

</details>

### onMessageChoiceSelect

<details>
<summary>Example</summary>
        
```javascript
import { onMessageChoiceSelect } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint-callbacks';

onMessageChoiceSelect((choiceId, choiceTypeId) => console.log(choiceId, choiceTypeId));
```

</details>

### onMessageChoiceError

<details>
<summary>Example</summary>
        
```javascript
import { onMessageChoiceError } from '@spring-media/red-sourcepoint-cmp/dist/esm/sourcepoint-callbacks';

onMessageChoiceError((error) => console.log(error));
```

</details>
