import { PostCustomConsentCallback } from '../sourcepoint/typings';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericCallback = (...args: any) => void;

export interface TCFV2API {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (command: string, version: 2, callback: GenericCallback, parameter?: any): void;
  (command: 'addEventListener', version: 2, callback: AddEventListenerCallback): void;
  (command: 'removeEventListener', version: 2, callback: RemoveEventListenerCallback, listenerId: ListenerId): void;
  (command: 'getTCData', version: 2, callback: GetTCDataCallback, vendorIds?: number[]): void;
  (command: 'ping', version: 2, callback: PingCallback): void;

  // additional Sourcepoint commands
  (
    command: 'postCustomConsent',
    version: 2,
    callback: PostCustomConsentCallback,
    vendorIds: string[],
    purposeIds: string[],
    legitimateInterestIds: string[],
  ): void;
}

export interface PingReturn {
  gdprApplies?: boolean;
  cmpLoaded: boolean;
  cmpStatus: CMPStatus;
  displayStatus: DisplayStatus;
  apiVersion: string;
  cmpVersion?: number;
  cmpId?: number;
  gvlVersion?: number;
  tcfPolicyVersion?: number;
}

export declare global {
  interface Window {
    __tcfapi: TCFV2API;
  }
}
