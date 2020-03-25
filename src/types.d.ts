export interface Consent {
  _id: string;
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
  loadPrivacyManagerModal(managerId: string | number);
};

export declare global {
  interface Window {
    _sp_: SourcepointConfigurationObject;
    __tcfapi(method: tcfAction, vendors: Array<string> | null, callback: Function): void;
    instgrm: { Embeds: { process(): void } };
  }
}

export type State = {
  consentedVendors: Vendor[];
  consentedPurposes: Purpose[];
  privacyManagerId: number;
  cmpEnabled: boolean;
};

export type InstagramOEmbedRequestParameters = {
  url: string;
  hidecaption?: boolean;
  maxwidth?: number;
  omitscript?: boolean;
};

export type InstagramOEmbedResponse = {
  version: string;
  title: string;
  author_name: string;
  author_url: string;
  author_id: number;
  media_id: string;
  provider_name: string;
  provider_url: string;
  type: string;
  width: number;
  height: null;
  html: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
};
