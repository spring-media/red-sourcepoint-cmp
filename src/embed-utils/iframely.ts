import { loadScript } from './script-loader';

export const IFRAMELY_EMBEDS_LIBRARY_URL = 'https://cdn.iframe.ly/embed.js';

export const loadIframelyEmbedsLibrary = (src?: string | null): Promise<void> => {
  if (window?.iframely) {
    return Promise.resolve();
  }

  return loadScript(src || IFRAMELY_EMBEDS_LIBRARY_URL);
};

export const processIframelyEmbeds = (): void => window?.iframely?.load();
