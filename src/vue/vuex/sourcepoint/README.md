# sourcepoint Vuex Module

## Plugins

### reloadPageOnReject

This plugin reloads the page after a vendor or purpose has been rejected.

## Example

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import { sourcepoint } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/vuex/sourcepoint';
import { reloadPageOnReject } from '@spring-media/red-sourcepoint-cmp/dist/esm/vue/vuex/sourcepoint/plugins';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    sourcepoint,
  },
});

reloadPageOnReject(store);
``` 
