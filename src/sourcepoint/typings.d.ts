import { OptionalCallbacks } from '../sourcepoint-callbacks/typings';

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

export type PostCustomConsentResult = {
  categories: string[];
  consentUUID: string;
  legIntCategories: string[];
  rejectAny: boolean;
  specialFeatures: string[];
  vendors: string[];
};

export type PostCustomConsentPayload = {
  vendorIds?: string[];
  purposeIds?: string[];
  legitimateInterestIds?: string[];
};

export type PostCustomConsentCallback = (data: PostCustomConsentResult | null, success: boolean) => void;

export type Config = {
  accountId?: number;
  wrapperAPIOrigin?: string;
  propertyId?: number;
  mmsDomain?: string;
  events?: OptionalCallbacks;
};

export type SourcepointConfigObject = {
  config: Config;
  loadPrivacyManagerModal(managerId: number);
};

export declare global {
  interface Window {
    _sp_: SourcepointConfigObject;
  }
}
