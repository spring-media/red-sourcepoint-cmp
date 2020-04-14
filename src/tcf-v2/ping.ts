import { PingCallback } from './typings';

export const ping = (callback: PingCallback): void => window.__tcfapi?.('ping', 2, callback);
