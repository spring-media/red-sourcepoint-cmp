import { OptionalCallbacks } from '../sourcepoint-callbacks/typings';

export interface CustomConsent {
  _id: string;
  name?: string;
}

export interface CustomVendor extends CustomConsent {
  vendorType?: string;
}

export type CustomPurpose = CustomConsent;

export type CustomVendorGrants = {
  [key: string]: {
    purposeGrants: { [key: string]: boolean };
    vendorGrant: boolean;
  };
};

export type CustomVendorConsentsResult = {
  consentedPurposes: CustomPurpose[];
  consentedVendors: CustomVendor[];
  grants: CustomVendorGrants;
};

export type PostCustomConsentResult = {
  categories: string[];
  consentUUID: string;
  legIntCategories: string[];
  rejectAny: boolean;
  specialFeatures: string[];
  vendors: string[];
  grants: CustomVendorGrants;
};

export type PostCustomConsentPayload = {
  vendorIds?: string[];
  purposeIds?: string[];
  legitimateInterestIds?: string[];
};

export type PostCustomConsentCallback = (data: PostCustomConsentResult, success: boolean) => void;

export type Config = {
  accountId?: number;
  baseEndpoint?: string;
  events?: OptionalCallbacks;
};

export type SourcepointConfigObject = {
  config?: Config;
  loadPrivacyManagerModal(managerId: number): void;
};

export declare global {
  interface Window {
    _sp_?: SourcepointConfigObject;
  }
}
