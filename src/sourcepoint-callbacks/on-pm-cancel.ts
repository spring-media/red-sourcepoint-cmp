import { createCallback } from './create-callback';
import { OnPMCancelCallback } from './typings';

export const onPMCancel = createCallback<OnPMCancelCallback>('onPMCancel');
