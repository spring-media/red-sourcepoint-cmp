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
