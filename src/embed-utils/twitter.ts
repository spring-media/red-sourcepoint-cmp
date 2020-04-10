import { loadScript } from './script-loader';
import { getScriptSrcFromOembedHTML } from './oembed';

export const TWITTER_WIDGETS_LIBRARY_URL = 'https://platform.twitter.com/widgets.js';

export const processTwitterEmbedContent = async (content: string, element?: HTMLElement): Promise<void | string> => {
  if (window.twttr?.widgets?.load) {
    window.twttr.widgets.load(element);

    return Promise.resolve();
  }

  try {
    await loadScript(getScriptSrcFromOembedHTML(content) || TWITTER_WIDGETS_LIBRARY_URL);

    window.twttr?.widgets?.load(element);
  } catch (error) {
    return Promise.reject(error.message);
  }
};
