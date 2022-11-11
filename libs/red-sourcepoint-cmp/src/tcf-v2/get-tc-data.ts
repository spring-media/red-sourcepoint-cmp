import { GetTCDataCallback } from './typings';

export const getTCData = (callback: GetTCDataCallback, vendorIds?: number[]): void | boolean =>
  typeof window !== 'undefined' && window.__tcfapi?.('getTCData', 2, callback, vendorIds);
