# Embed Utils Module

This package provides several utilities around embeds and their vendors.

## General

### `loadScript`

```typescript
loadScript(src: string): Promise<void>
```

Loads given script asynchronously into the browser.

```javascript
import { loadScript } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

loadScript('https://some-domain.com/some-script.js').then(() => console.log('loaded')).catch(() => console.log('error'));
```

### `getScriptSrcFromOembedHTML`

```typescript
getScriptSrcFromOembedHTML(html: string, fallback: string): string | null
```

Get the script source from given (oEmbed) html string.

```javascript
import { getScriptSrcFromOembedHTML } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

const someOembedHTML = '<div></div><script async src="https://some-oembed-provider.com"></script>';

console.log(getScriptSrcFromOembedHTML(someOembedHTML, 'https://domain.com/fallback.js')); // https://some-oembed-provider.com
```

## Instagram

### `libraryIsAvailable`

```typescript
libraryIsAvailable(): boolean
````

Checks whether the Instagram embeds library (`window.instgrm.Embeds`) is present.

```javascript
import { instagram } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

console.log(instagram.libraryIsAvailable())
```

### `processEmbeds`

```typescript
processEmbeds(): void
```

Calls `window.instgrm.Embeds.process()` if available.

```javascript
import { instagram } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

instagram.processEmbeds();
```

## Twitter

### `libraryIsAvailable`

```typescript
libraryIsAvailable(): boolean
````

Checks whether the Twitter embeds library (`window.twttr.widgets`) is present.

```javascript
import { twitter } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

console.log(twitter.libraryIsAvailable())
```

### `processEmbeds`

```typescript
processEmbeds(): void
```

Calls `window.twttr.widgets.load()` if available.

```javascript
import { twitter } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

twitter.processEmbeds(/* optional html element */);
```

## Iframely

### `libraryIsAvailable`

```typescript
libraryIsAvailable(): boolean
````

Checks whether the Iframely embeds library (`window.iframely`) is present.

```javascript
import { iframely } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

console.log(iframely.libraryIsAvailable())
```

### `processEmbeds`

```typescript
processEmbeds(): void
```

Calls `window.iframely.load()` if available.

```javascript
import { iframely } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

iframely.processEmbeds();
```
