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
getScriptSrcFromOembedHTML(html: string): string | null
```

Get the script source from given (oEmbed) html string.

```javascript
import { getScriptSrcFromOembedHTML } from '@spring-media/red-sourcepoint-cmp/dist/esm/embed-utils';

const someOembedHTML = '<div></div><script async src="https://some-oembed-provider.com"></script>';

console.log(getScriptSrcFromOembedHTML(someOembedHTML, 'https://domain.com/fallback.js')); // https://some-oembed-provider.com
```
