import { CustomVendorConsentsResult } from './typings';

export const getCustomVendorConsents = (): Promise<CustomVendorConsentsResult> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.__tcfapi) {
      return reject();
    }

    window.__tcfapi('getCustomVendorConsents', 2, resolve);
  });
};
