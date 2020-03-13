import { createCallback } from './create-callback';

export const onPrivacyManagerAction = createCallback('onPrivacyManagerAction', window?._sp_?.config?.events);
