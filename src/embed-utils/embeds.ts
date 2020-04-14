import { loadScript } from './script-loader';
import { getScriptSrcFromOembedHTML } from './oembed';
import { ProcessEmbedContentParameters } from './typings';

export const process = async ({
  libraryIsAvailable,
  processEmbeds,
  defaultEmbedLibrary,
  content,
}: ProcessEmbedContentParameters): Promise<void> => {
  if (libraryIsAvailable()) {
    return processEmbeds();
  }

  try {
    await loadScript(getScriptSrcFromOembedHTML(content, defaultEmbedLibrary));

    processEmbeds();
  } catch (error) {
    return Promise.reject(error.message);
  }
};
