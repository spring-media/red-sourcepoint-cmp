import { tcfAction } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeMethod = (method: tcfAction, vendors: Array<string> | null = null): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      window.__tcfapi(method, vendors, resolve);
    } catch (error) {
      console.error(error.message);
      reject(error.message);
    }
  });
