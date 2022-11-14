export type RelationsDump = {
  vendorIds: string[];
  purposeIds: string[];
  legitimateInterestIds: string[];
};

export type PurposeTypes = 'LEGITIMATE_INTEREST' | 'CONSENT';

export type VendorPurposeMappingPurpose = {
  _id: string;
  type: PurposeTypes;
};

export type VendorPurposeMapping = {
  vendorId: string;
  categories: VendorPurposeMappingPurpose[];
};

export type VendorPurposeMappings = VendorPurposeMapping[];

export type GroupedPurposes<T = string[]> = { purposeIds: T; legitimateInterestIds: T };
