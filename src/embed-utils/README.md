# Embed Utils Module

This package provides several utilities around embeds and their vendors.

## General

### `loadScript(src: string): Promise<void>`

Loads given script asynchronously into the browser.

```javascript
import { loadScript } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

loadScript('https://some-domain.com/some-script.js').then(() => console.log('loaded')).catch(() => console.log('error'));
```

### `getScriptSrcFromOembedHTML(html: string): string | null`

Get the script source from given (oEmbed) html string.

```javascript
import { getScriptSrcFromOembedHTML } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

const someOembedHTML = '<div></div><script async src="https://some-oembed-provider.com"></script>';

console.log(getScriptSrcFromOembedHTML(someOembedHTML)); // https://some-oembed-provider.com
```

## Instagram

### `loadInstagramJsLibrary(src?: string | null): Promise<void>`

Loads the Instagram embed.js javascript library into the browser by either given src parameter or, if omitted, the official library that points to [https://www.instagram.com/embed.js](https://www.instagram.com/embed.js).

```javascript
import { loadInstagramJsLibrary } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

loadInstagramJsLibrary().then(() => console.log('loaded')).catch(() => console.log('error'));
```

### `processInstagramEmbeds(): void`

Invokes `window.instgrm.Embeds.process()` if available.

```javascript
import { processInstagramEmbeds } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

processInstagramEmbeds();
```

## Twitter

### `loadTwitterJsLibrary(src?: string | null) : Promise<void>`

Loads the Twitter widgets javascript library into the browser by either given src parameter or, if omitted, the official library that points to [https://platform.twitter.com/widgets.js](https://platform.twitter.com/widgets.js).

```javascript
import { loadTwitterJsLibrary } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

loadTwitterJsLibrary().then(() => console.log('loaded')).catch(() => console.log('error'));
```

### `processTwitterEmbeds(element?: HTMLElement): void`

Invokes `window.twttr.widgets.load()` if available.

As mentioned in the [official documentation](https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization), you can pass a HTMl element as a parameter for performance reasons.

```javascript
import { processTwitterEmbeds } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

processTwitterEmbeds(/* optional element parameter */);
```

## Iframely

### `loadIframelyEmbedsLibrary(src?: string | null) : Promise<void>`

Loads the Iframely embed.js javascript library into the browser by either given src parameter or, if omitted, the official library that points to [https://cdn.iframe.ly/embed.js](https://iframely.com/docs/embedjs).

```javascript
import { loadIframelyEmbedsLibrary } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

loadIframelyEmbedsLibrary().then(() => console.log('loaded')).catch(() => console.log('error'));
```


### `processIframelyEmbeds(): void`

Invokes `window.iframely.load()` if available.

```javascript
import { processIframelyEmbeds } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

processIframelyEmbeds();
```
