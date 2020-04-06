export type TCData = {
  eventStatus: 'tcloaded' | 'cmpuishown' | 'useractioncomplete';
  listenerId: ListenerId;
};

export type ListenerId = string | number;

export type AddEventListenerCallback = (tcData: TCData, success: boolean) => void;

export type GetTCDataCallback = AddEventListenerCallback;

export type RemoveEventListenerCallback = (success: boolean) => void;

export interface TCFV2API {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (command: string, version: 2, callback: (...args: any) => void, parameter?: any): void;

  (command: 'addEventListener', version: 2, callback: AddEventListenerCallback): void;

  (command: 'removeEventListener', version: 2, callback: RemoveEventListenerCallback, listenerId: ListenerId): void;

  (command: 'getTCData', version: 2, callback: GetTCDataCallback, vendorIds?: number[]): void;
}

export declare global {
  interface Window {
    __tcfapi: TCFV2API;
  }
}
