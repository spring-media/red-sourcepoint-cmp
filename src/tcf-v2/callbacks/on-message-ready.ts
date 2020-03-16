import { createCallback } from './create-callback';

export const onMessageReady = createCallback('onMessageReady', window?._sp_?.config?.events);
