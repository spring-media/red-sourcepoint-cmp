import { createCallback } from './create-callback';

export const onConsentReady = createCallback('onConsentReady', window?._sp_?.config?.events);
