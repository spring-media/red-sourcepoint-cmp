import { OptionalCallback } from '../sourcepoint-callbacks/typings';

export interface CustomConsent {
  _id: string;
  name?: string;
}

export interface CustomVendor extends CustomConsent {
  vendorType?: string;
}

export type CustomPurpose = CustomConsent;

export type CustomVendorConsentsResult = {
  consentedPurposes: CustomPurpose[];
  consentedVendors: CustomVendor[];
};

export type HasConsentOptions = {
  cache: boolean;
};

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
export type ConfigurationParameters = {
  accountId: number;
  propertyId: number;
  mmsDomain: string;
  events?: {
    [key: OptionalCallback]: Function;
  };
};
