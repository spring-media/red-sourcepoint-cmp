import { message, privacyManager, embeds } from '../fragments';
import { MessageFragment, PrivacyManagerFragment, EmbedsFragment } from '../typings';

export const getMessage = (): MessageFragment => message;

export const getPrivacyManager = (): PrivacyManagerFragment => privacyManager;

export const getEmbeds = (): EmbedsFragment => embeds;
