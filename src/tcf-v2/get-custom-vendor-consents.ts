import { executeMethod } from './tcf';

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

export const getCustomVendorConsents = (): Promise<CustomVendorConsentsResult> =>
  executeMethod("getCustomVendorConsents");
