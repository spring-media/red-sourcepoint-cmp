import { InstagramOEmbedRequestParameters, InstagramOEmbedResponse } from '../types';

export const INSTAGRAM_OEMBED_API_URL = 'https://api.instagram.com/oembed';
export const INSTAGRAM_JAVASCRIPT_LIBRARY_URL = 'https://www.instagram.com/embed.js';

export const requestInstagramOEmbedData = async (
  params: InstagramOEmbedRequestParameters,
): Promise<InstagramOEmbedResponse> => {
  try {
    const response = await fetch(`${INSTAGRAM_OEMBED_API_URL}?omitscript=true&url=${params.url}`);

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const loadInstagramJsLibrary = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.onload = (): void => resolve();
    script.src = INSTAGRAM_JAVASCRIPT_LIBRARY_URL;
    script.onerror = reject;

    document.head.append(script);
  });
};

export const processInstagramEmbeds = (): void => window?.instgrm?.Embeds?.process();
