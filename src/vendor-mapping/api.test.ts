import {
  getVendorNameById,
  getVendorIdByName,
  getPurposeIdByName,
  getPurposeNameById,
  hasRelationByName,
  hasRelationById,
} from './';
import {
  VENDOR_NAME_TWITTER,
  VENDOR_NAME_INSTAGRAM,
  VENDOR_NAME_FACEBOOK,
  VENDOR_NAME_YOUTUBE,
  VENDOR_ID_TWITTER,
  VENDOR_ID_FACEBOOK,
  VENDOR_ID_INSTAGRAM,
  VENDOR_ID_YOUTUBE,
} from './vendors';
import { PurposeMappingName, VendorMappingName } from './types';
import { PURPOSE_ID_SOCIAL, PURPOSE_NAME_SOCIAL } from './purposes';

describe('vendor-mapping api', () => {
  it.each([
    [VENDOR_NAME_YOUTUBE, VENDOR_ID_YOUTUBE],
    [VENDOR_NAME_FACEBOOK, VENDOR_ID_FACEBOOK],
    [VENDOR_NAME_INSTAGRAM, VENDOR_ID_INSTAGRAM],
    [VENDOR_NAME_TWITTER, VENDOR_ID_TWITTER],
    [undefined, 'unknown-vendor-id'],
  ])('getVendorNameById should return the name %s for given id %s', (expected, given) => {
    expect(getVendorNameById(given)).toBe(expected);
  });

  it.each([
    [VENDOR_ID_YOUTUBE, VENDOR_NAME_YOUTUBE],
    [VENDOR_ID_FACEBOOK, VENDOR_NAME_FACEBOOK],
    [VENDOR_ID_INSTAGRAM, VENDOR_NAME_INSTAGRAM],
    [VENDOR_ID_TWITTER, VENDOR_NAME_TWITTER],
    [undefined, 'unknown-vendor-name'],
  ])('getVendorIdByName should return the id %s for given name %s', (expected, given) => {
    expect(getVendorIdByName(given as VendorMappingName)).toBe(expected);
  });

  it.each([
    [PURPOSE_ID_SOCIAL, PURPOSE_NAME_SOCIAL],
    [undefined, 'unknown-purpose-name'],
  ])('getPurposeIdByName should return the id %s for given name %s', (expected, given) => {
    expect(getPurposeIdByName(given as PurposeMappingName)).toBe(expected);
  });

  it.each([
    [PURPOSE_NAME_SOCIAL, PURPOSE_ID_SOCIAL],
    [undefined, 'unknown-purpose-id'],
  ])('getPurposeNameById should return the name %s for given id %s', (expected, given) => {
    expect(getPurposeNameById(given)).toBe(expected);
  });

  it.each([
    [true, VENDOR_NAME_TWITTER, PURPOSE_NAME_SOCIAL],
    [true, VENDOR_NAME_FACEBOOK, PURPOSE_NAME_SOCIAL],
    [true, VENDOR_NAME_INSTAGRAM, PURPOSE_NAME_SOCIAL],
    [true, VENDOR_NAME_YOUTUBE, PURPOSE_NAME_SOCIAL],
    [false, 'unknown-vendor-name', PURPOSE_NAME_SOCIAL],
    [false, VENDOR_NAME_TWITTER, 'unknown-purpose-name'],
  ])('hasRelationByName should return %s for given vendor name %s and purpose name %s', (expected, vendor, purpose) => {
    expect(hasRelationByName(vendor as VendorMappingName, purpose as PurposeMappingName)).toBe(expected);
  });

  it.each([
    [true, VENDOR_ID_TWITTER, PURPOSE_ID_SOCIAL],
    [true, VENDOR_ID_FACEBOOK, PURPOSE_ID_SOCIAL],
    [true, VENDOR_ID_INSTAGRAM, PURPOSE_ID_SOCIAL],
    [true, VENDOR_ID_YOUTUBE, PURPOSE_ID_SOCIAL],
    [false, 'unknown-vendor-id', PURPOSE_ID_SOCIAL],
    [false, VENDOR_ID_TWITTER, 'unknown-purpose-id'],
  ])('hasRelationById should return %s for given vendor id %s and purpose id %s', (expected, vendor, purpose) => {
    expect(hasRelationById(vendor, purpose)).toBe(expected);
  });
});
