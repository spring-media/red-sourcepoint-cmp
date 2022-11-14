import { createCallback } from './create-callback';
import { OnMessageChoiceSelectCallback } from './typings';

export const onMessageChoiceSelect = createCallback<OnMessageChoiceSelectCallback>('onMessageChoiceSelect');
