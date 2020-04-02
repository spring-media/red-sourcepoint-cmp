import { tcfAction } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeMethod = (method: tcfAction, vendors: number[] | null = null): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      window.__tcfapi(method, 2, resolve, vendors);
    } catch (error) {
      console.error(error.message);
      reject(error.message);
    }
  });
