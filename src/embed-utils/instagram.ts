import { loadScript } from './script-loader';

export const INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL = 'https://www.instagram.com/embed.js';

export const loadInstagramJsLibrary = (src: string | null): Promise<void> => {
  if (window?.instgrm?.Embeds) {
    return Promise.resolve();
  }
  return loadScript(src || INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL);
};

export const processInstagramEmbeds = (): void => window?.instgrm?.Embeds?.process();
