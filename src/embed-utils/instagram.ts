import { loadScript } from './script-loader';
import { getScriptSrcFromOembedHTML } from './oembed';

export const INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL = 'https://www.instagram.com/embed.js';

export const processInstagramEmbedContent = async (content: string): Promise<void | string> => {
  if (window.instgrm?.Embeds?.process) {
    window.instgrm.Embeds.process();

    return Promise.resolve();
  }

  try {
    await loadScript(getScriptSrcFromOembedHTML(content) || INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL);

    window.instgrm?.Embeds?.process();
  } catch (error) {
    return Promise.reject(error.message);
  }
};
