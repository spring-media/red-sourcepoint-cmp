# Embed Utils Package

This package provides several utilities around embeds and their vendors.

## Instagram

Documentation about embedding Instagram posts can be found [here](https://developers.facebook.com/docs/instagram/embedding).

### `INSTAGRAM_OEMBED_API_URL`

Instagram's oembed API endpoint.

```javascript
import { INSTAGRAM_OEMBED_API_URL } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';
```

### `INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL`

Instagram's javascript embeds library url.

```javascript
import { INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';
```

### `requestInstagramOEmbedData`

Returns a JSON object containing the post’s embed HTML code along with additional data about the post and post owner. Use the embed HTML code to embed the post in a website.

```javascript
import { requestInstagramOEmbedData } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

// For all full list of parameters, please refer the official documentation.
requestInstagramOEmbedData({ url: 'https://www.instagram.com/p/fA9uwTtkSN/' }).then(post => console.log(post)).catch(error => console.log(error));
```

> This function makes use of [fetch](https://developer.mozilla.org/de/docs/Web/API/Fetch_API) as well as [URLSearchParams](https://developer.mozilla.org/de/docs/Web/API/URLSearchParams). 
> If you are required to support older browsers, keep in mind to add appropriate polyfills.

### `loadInstagramJsLibrary`

Loads Instagram's embeds javascript library into the current document.

```javascript
import { loadInstagramJsLibrary } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

loadInstagramJsLibrary().then(() => console.log("Library loaded")).catch(error => console.log(error));
```

### `processInstagramEmbeds`

Use this function to process any Instagram posts's that were not added on initial page load.

> Please refer to the [documentation](https://developers.facebook.com/docs/instagram/embedding/#embed-js) for more information.

```javascript
import { processInstagramEmbeds } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

processInstagramEmbeds();
```
