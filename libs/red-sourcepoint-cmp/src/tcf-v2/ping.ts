import { PingCallback } from './typings';

export const ping = (callback: PingCallback): void | boolean =>
  typeof window !== 'undefined' && window.__tcfapi?.('ping', 2, callback);
