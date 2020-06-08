import { PostCustomConsentCallback } from '../sourcepoint/typings';

export type TCDataEventStatus = 'tcloaded' | 'cmpuishown' | 'useractioncomplete';

export type CMPStatus = 'stub' | 'loading' | 'loaded' | 'error';

export type DisplayStatus = 'visible' | 'hidden' | 'disabled';

/**
 * https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#tcdata
 */
export type TCData = {
  tcString: string;
  tcfPolicyVersion: number;
  cmpId: number;
  cmpVersion: number;
  gdprApplies?: boolean;
  eventStatus: TCDataEventStatus;
  cmpStatus: CMPStatus;
  listenerId?: ListenerId;
  isServiceSpecific: boolean;
  useNonStandardStacks: boolean;
  publisherCC: string;
  purposeOneTreatment: boolean;
  outOfBand: {
    allowedVendors: {
      [key: number | string]: boolean;
    };
    disclosedVendors: {
      [key: number | string]: boolean;
    };
  };
  purpose: {
    consents: {
      [key: number | string]: boolean;
    };
    legitimateInterests: {
      [key: number | string]: boolean;
    };
  };
  vendor: {
    consents: {
      [key: number | string]: boolean;
    };
    legitimateInterests: {
      [key: number | string]: boolean;
    };
  };
  specialFeatureOptins: {
    [key: number | string]: boolean;
  };
  publisher: {
    consents: {
      [key: number | string]: boolean;
    };
    legitimateInterests: {
      [key: number | string]: boolean;
    };
    customPurpose: {
      consents: {
        [key: number | string]: boolean;
      };
      legitimateInterests: {
        [key: number | string]: boolean;
      };
    };
    restrictions: {
      [key: number | string]: {
        [key: number | string]: 0 | 1 | 2;
      };
    };
  };
};

export type ListenerId = number | undefined;

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
