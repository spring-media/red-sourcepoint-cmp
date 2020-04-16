import { createCallback } from './create-callback';
import { OnMessageChoiceErrorCallback } from './typings';

export const onMessageChoiceError = createCallback<OnMessageChoiceErrorCallback>('onMessageChoiceError');
