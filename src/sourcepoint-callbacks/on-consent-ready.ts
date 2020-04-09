import { createCallback } from './create-callback';
import { OnConsentReadyCallback } from './typings';

export const onConsentReady = createCallback<OnConsentReadyCallback>('onConsentReady');
