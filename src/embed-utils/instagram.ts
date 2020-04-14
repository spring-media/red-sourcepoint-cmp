import { process } from './embeds';

export const INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL = 'https://www.instagram.com/embed.js';

export const libraryIsAvailable = (): boolean => Boolean(window.instgrm?.Embeds);

export const processEmbeds = (): void => window.instgrm?.Embeds?.process();

export const processEmbedContent = async (content: string): Promise<void> =>
  process({
    libraryIsAvailable,
    processEmbeds,
    defaultEmbedLibrary: INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL,
    content,
  });
