import { process } from './embeds';

export const IFRAMELY_EMBEDS_LIBRARY_URL = 'https://cdn.iframe.ly/embed.js';

export const libraryIsAvailable = (): boolean => Boolean(window.iframely);

export const processEmbeds = (): void => window.iframely?.load();

export const processEmbedContent = async (content: string): Promise<void> =>
  process({
    libraryIsAvailable,
    processEmbeds,
    defaultEmbedLibrary: IFRAMELY_EMBEDS_LIBRARY_URL,
    content,
  });
