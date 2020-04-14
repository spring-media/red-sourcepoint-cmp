import { process } from './embeds';

export const TWITTER_WIDGETS_LIBRARY_URL = 'https://platform.twitter.com/widgets.js';

export const libraryIsAvailable = (): boolean => Boolean(window.twttr?.widgets);

export const processEmbeds = (element?: HTMLElement): void => window.twttr?.widgets?.load(element);

export const processEmbedContent = async (content: string, element?: HTMLElement): Promise<void> =>
  process({
    libraryIsAvailable,
    processEmbeds: () => processEmbeds(element),
    defaultEmbedLibrary: TWITTER_WIDGETS_LIBRARY_URL,
    content,
  });
