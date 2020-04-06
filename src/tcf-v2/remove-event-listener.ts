import { ListenerId, RemoveEventListenerCallback } from './typings';

export const removeEventListener = (callback: RemoveEventListenerCallback, listenerId: ListenerId): void =>
  window.__tcfapi?.('removeEventListener', 2, callback, listenerId);
