import { createCallback } from './create-callback';
import { onPMCancelCallback } from './typings';

export const onPMCancel = createCallback<onPMCancelCallback>('onPMCancel');
