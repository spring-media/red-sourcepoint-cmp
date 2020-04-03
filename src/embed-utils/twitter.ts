import { loadScript } from './script-loader';

export const TWITTER_WIDGETS_LIBRARY_URL = 'https://platform.twitter.com/widgets.js';

export const loadTwitterJsLibrary = (src: string | null): Promise<void> => {
  if (window?.twttr?.widgets) {
    return Promise.resolve();
  }

  return loadScript(src || TWITTER_WIDGETS_LIBRARY_URL);
};

export const processTwitterEmbeds = (element?: HTMLElement): void => window?.twttr?.widgets?.load(element);
