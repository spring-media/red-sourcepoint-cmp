export const INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL = 'https://www.instagram.com/embed.js';

export const loadInstagramJsLibrary = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.onload = (): void => resolve();
    script.src = INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL;
    script.onerror = reject;

    document.head.append(script);
  });
};

export const processInstagramEmbeds = (): void => window?.instgrm?.Embeds?.process();
