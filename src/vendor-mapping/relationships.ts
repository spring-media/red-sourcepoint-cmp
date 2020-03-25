import { PURPOSE_ID_SOCIAL, PURPOSE_NAME_SOCIAL } from './purposes';
import {
  VENDOR_ID_FACEBOOK,
  VENDOR_ID_INSTAGRAM,
  VENDOR_ID_TWITTER,
  VENDOR_ID_YOUTUBE,
  VENDOR_NAME_FACEBOOK,
  VENDOR_NAME_INSTAGRAM,
  VENDOR_NAME_TWITTER,
  VENDOR_NAME_YOUTUBE,
} from './vendors';
import { PurposeMappingName, VendorMappingName } from './types';

export const relationshipsById: Map<string, string[]> = new Map([
  [PURPOSE_ID_SOCIAL, [VENDOR_ID_FACEBOOK, VENDOR_ID_YOUTUBE, VENDOR_ID_INSTAGRAM, VENDOR_ID_TWITTER]],
]);

export const relationshipsByName: Map<PurposeMappingName, VendorMappingName[]> = new Map([
  [PURPOSE_NAME_SOCIAL, [VENDOR_NAME_FACEBOOK, VENDOR_NAME_YOUTUBE, VENDOR_NAME_INSTAGRAM, VENDOR_NAME_TWITTER]],
]);
