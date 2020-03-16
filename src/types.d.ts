export type ConsentedVendor = {
  _id: string;
  name: string;
  vendorType: string;
};

export type ConsentedPurpose = {
  _id: string;
  name: string;
};

export type CustomVendorConsentsResult = {
  consentedPurposes: ConsentedPurpose[];
  consentedVendors: ConsentedVendor[];
};

export type TCDataResult = {
  consentData: string;
  gdprApplies: boolean;
  hasGlobalScope: boolean;
};

export type tcfAction = 'getCustomVendorConsents' | 'getTCData';

export type ConfigurationParameters = {
  accountId: number;
  propertyId: number;
  mmsDomain: string;
  events?: {
    [key: OptionalCallback]: Function;
  };
};

export type OptionalCallback =
  | 'onMessageReady'
  | 'onMessageChoiceSelect'
  | 'onPrivacyManagerAction'
  | 'onMessageChoiceError'
  | 'onConsentReady'
  | 'onPMCancel'
  | 'onMessageReceiveData'
  | 'onSPPMObjectReady';

export type EventConfigurationObject = Partial<Record<OptionalCallback, Function>>;

export type Configuration = {
  accountId: number;
  wrapperAPIOrigin: string;
  propertyId: number;
  mmsDomain: string;
  events?: EventConfigurationObject;
};

export type SourcepointConfigurationObject = {
  config: Configuration;
  loadPrivacyManagerModal(managerId: string);
};

export declare global {
  interface Window {
    _sp_: SourcepointConfigurationObject;
    __tcfapi(method: tcfAction, vendors: Array<string> | null, callback: Function): void;
  }
}

export type State = {
  vendorConsents: string[];
  purposeConsents: string[];
};
