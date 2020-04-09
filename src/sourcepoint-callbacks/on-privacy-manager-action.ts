import { createCallback } from './create-callback';
import { OnPrivacyManagerActionCallback } from './typings';

export const onPrivacyManagerAction = createCallback<OnPrivacyManagerActionCallback>('onPrivacyManagerAction');
