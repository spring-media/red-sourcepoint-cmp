import { PurposeMappingName } from './types';

export const PURPOSE_NAME_SOCIAL = 'social';
export const PURPOSE_ID_SOCIAL = '5e7adb1ee30e7d1bc1ec0252';

export const purposeMapById: Map<string, PurposeMappingName> = new Map([[PURPOSE_ID_SOCIAL, PURPOSE_NAME_SOCIAL]]);

export const purposeMapByName: Map<PurposeMappingName, string> = new Map([[PURPOSE_NAME_SOCIAL, PURPOSE_ID_SOCIAL]]);
