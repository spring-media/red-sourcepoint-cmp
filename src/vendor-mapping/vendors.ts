import { VendorMappingName } from './types';

export const VENDOR_NAME_FACEBOOK = 'facebook';
export const VENDOR_ID_FACEBOOK = '5e716fc09a0b5040d575080f';

export const VENDOR_NAME_TWITTER = 'twitter';
export const VENDOR_ID_TWITTER = '5e71760b69966540e4554f01';

export const VENDOR_NAME_INSTAGRAM = 'instagram';
export const VENDOR_ID_INSTAGRAM = '5e717c8e69966540e4554f05';

export const VENDOR_NAME_YOUTUBE = 'youtube';
export const VENDOR_ID_YOUTUBE = '5e7ac3fae30e7d1bc1ebf5e8';

export const vendorsMapByName: Map<VendorMappingName, string> = new Map([
  [VENDOR_NAME_FACEBOOK, VENDOR_ID_FACEBOOK],
  [VENDOR_NAME_TWITTER, VENDOR_ID_TWITTER],
  [VENDOR_NAME_INSTAGRAM, VENDOR_ID_INSTAGRAM],
  [VENDOR_NAME_YOUTUBE, VENDOR_ID_YOUTUBE],
]);

export const vendorsMapById: Map<string, VendorMappingName> = new Map([
  [VENDOR_ID_FACEBOOK, VENDOR_NAME_FACEBOOK],
  [VENDOR_ID_TWITTER, VENDOR_NAME_TWITTER],
  [VENDOR_ID_INSTAGRAM, VENDOR_NAME_INSTAGRAM],
  [VENDOR_ID_YOUTUBE, VENDOR_NAME_YOUTUBE],
]);
