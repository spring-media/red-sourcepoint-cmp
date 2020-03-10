declare type tcfAction =
  | "getCustomVendorConsents"
  | "getTCData";

declare function __tcfapi(
  method: tcfAction,
  vendors: Array<string> | null,
  callback: Function
): void;

export const executeMethod = (
  method: tcfAction,
  vendors: Array<string> | null = null
): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      __tcfapi(method, vendors, resolve);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
