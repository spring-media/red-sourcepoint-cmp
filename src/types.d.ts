export interface Consent {
  _id: string | number;
  name?: string;
}

export interface Vendor extends Consent {
  vendorType?: string;
}

export type Purpose = Consent;

export type CustomVendorConsentsResult = {
  consentedPurposes: Purpose[];
  consentedVendors: Vendor[];
};

export type HasConsentOptions = {
  cache: boolean;
};

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
  loadPrivacyManagerModal(managerId: string | number);
};

export declare global {
  interface Window {
    _sp_: SourcepointConfigurationObject;
  }
}

export type State = {
  consentedVendors: Vendor[];
  consentedPurposes: Purpose[];
};
