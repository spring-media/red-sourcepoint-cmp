export const INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL = 'https://www.instagram.com/embed.js';

export const loadInstagramJsLibrary = (scriptSrc: string | null): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window?.instgrm?.Embeds) {
      return resolve();
    }

    const script = document.createElement('script');

    script.async = true;
    script.onload = (): void => resolve();
    script.src = scriptSrc || INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL;
    script.onerror = reject;

    document.head.append(script);
  });
};

export const getScriptSrcFromOembedHTML = (html: string): string | null => {
  const src = html.match(/script async src\s*=\s*"(.+?)"/);

  return src ? src[1] : null;
};

export const processInstagramEmbeds = (): void => window?.instgrm?.Embeds?.process();
