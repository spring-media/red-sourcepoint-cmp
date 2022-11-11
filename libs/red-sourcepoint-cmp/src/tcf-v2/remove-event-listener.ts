import { ListenerId, RemoveEventListenerCallback } from './typings';

export const removeEventListener = (callback: RemoveEventListenerCallback, listenerId: ListenerId): void | boolean =>
  typeof window !== 'undefined' && window.__tcfapi?.('removeEventListener', 2, callback, listenerId);
