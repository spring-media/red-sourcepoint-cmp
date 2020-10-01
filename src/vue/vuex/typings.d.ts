import { CustomPurpose, CustomVendor } from '../../sourcepoint/typings';

export type SourcepointModuleState = {
  consentedCustomVendors: CustomVendor[];
  consentedCustomPurposes: CustomPurpose[];
  grantedVendors: string[];
  consentReady: boolean;
};
