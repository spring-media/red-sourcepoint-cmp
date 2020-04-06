import { AddEventListenerCallback } from './typings';

export const addEventListener = (callback: AddEventListenerCallback): void =>
  window.__tcfapi?.('addEventListener', 2, callback);
