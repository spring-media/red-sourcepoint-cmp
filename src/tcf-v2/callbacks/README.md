# Callbacks

## onPrivacyManagerAction
<details>
    <summary>Example Browser Bundle</summary>
    
    ```javascript
    <script>
      RedSourcepointCallbacks.onPrivacyManagerAction(() => console.log('onPrivacyManagerAction'));
    </script>
    ```
</details>

## onPMCancel
<details>
    <summary>Example Browser Bundle</summary>

    > Make sure you include the callbacks.js file from the browser bundle (dist/browser/callbacks.js)
    
    ```javascript
    <script>
      RedSourcepointCallbacks.onPMCancel(() => console.log('onPMCancel'));
    </script>
    ```
</details>

## onConsentReady
<details>
    <summary>Example Browser Bundle</summary>

    > Make sure you include the callbacks.js file from the browser bundle (dist/browser/callbacks.js)
    
    ```javascript
    <script>
      RedSourcepointCallbacks.onConsentReady(() => console.log('onConsentReady'));
    </script>
    ```
</details>

## onMessageReady
<details>
    <summary>Example Browser Bundle</summary>
    
    > Make sure you include the callbacks.js file from the browser bundle (dist/browser/callbacks.js)
    
    ```javascript
    <script>
      RedSourcepointCallbacks.onMessageReady(() => console.log('onMessageReady'));
    </script>
    ```
</details>
