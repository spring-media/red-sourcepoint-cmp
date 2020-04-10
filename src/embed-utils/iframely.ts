import { loadScript } from './script-loader';
import { getScriptSrcFromOembedHTML } from './oembed';

export const IFRAMELY_EMBEDS_LIBRARY_URL = 'https://cdn.iframe.ly/embed.js';

export const processIframelyEmbedContent = async (content: string): Promise<void | string> => {
  if (window.iframely?.load) {
    window.iframely.load();

    return Promise.resolve();
  }

  try {
    await loadScript(getScriptSrcFromOembedHTML(content) || IFRAMELY_EMBEDS_LIBRARY_URL);

    window.iframely?.load();
  } catch (error) {
    return Promise.reject(error.message);
  }
};
