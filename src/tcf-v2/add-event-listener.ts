import { AddEventListenerCallback } from './typings';

export const addEventListener = (callback: AddEventListenerCallback): void | boolean =>
  typeof window !== 'undefined' && window.__tcfapi?.('addEventListener', 2, callback);
