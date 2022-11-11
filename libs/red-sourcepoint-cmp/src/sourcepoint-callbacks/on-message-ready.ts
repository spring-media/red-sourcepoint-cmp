import { createCallback } from './create-callback';
import { OnMessageReadyCallback } from './typings';

export const onMessageReady = createCallback<OnMessageReadyCallback>('onMessageReady');
