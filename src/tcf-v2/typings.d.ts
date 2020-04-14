export type TCDataEventStatus = 'tcloaded' | 'cmpuishown' | 'useractioncomplete';

export type CMPStatus = 'stub' | 'loading' | 'loaded' | 'error';

export type DisplayStatus = 'visible' | 'hidden' | 'disabled';

export type TCData = {
  eventStatus: TCDataEventStatus;
  listenerId: ListenerId;
  cmpStatus: CMPStatus;
};

export type ListenerId = string | number;

export type AddEventListenerCallback = (tcData: TCData, success: boolean) => void;

export type GetTCDataCallback = AddEventListenerCallback;

export type RemoveEventListenerCallback = (success: boolean) => void;

export type PingCallback = (ping: PingReturn) => void;

export interface TCFV2API {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (command: string, version: 2, callback: (...args: any) => void, parameter?: any): void;
  (command: 'addEventListener', version: 2, callback: AddEventListenerCallback): void;
  (command: 'removeEventListener', version: 2, callback: RemoveEventListenerCallback, listenerId: ListenerId): void;
  (command: 'getTCData', version: 2, callback: GetTCDataCallback, vendorIds?: number[]): void;
  (command: 'ping', version: 2, callback: PingCallback): void;
}

export interface PingReturn {
  gdprApplies: boolean | undefined;
  cmpLoaded: boolean;
  cmpStatus: CMPStatus;
  displayStatus: DisplayStatus;
  apiVersion: string;
  cmpVersion: number | undefined;
  cmpId: number | undefined;
  gvlVersion: number | undefined;
  tcfPolicyVersion: number | undefined;
}

export declare global {
  interface Window {
    __tcfapi: TCFV2API;
  }
}
