import {
  getCustomVendor,
  getCustomPurpose,
  removeCustomPurpose,
  removeCustomVendor,
  getRelations,
  hasRelations,
  setRelations,
  addCustomPurpose,
  addCustomVendor,
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
} from './custom-vendors';
import { PURPOSE_ID_SOCIAL, PURPOSE_NAME_SOCIAL } from './custom-purposes';

describe('vendor-mapping api', () => {
  it.each([
    [VENDOR_NAME_YOUTUBE, VENDOR_ID_YOUTUBE],
    [VENDOR_NAME_FACEBOOK, VENDOR_ID_FACEBOOK],
    [VENDOR_NAME_INSTAGRAM, VENDOR_ID_INSTAGRAM],
    [VENDOR_NAME_TWITTER, VENDOR_ID_TWITTER],
    [VENDOR_ID_YOUTUBE, VENDOR_NAME_YOUTUBE],
    [VENDOR_ID_FACEBOOK, VENDOR_NAME_FACEBOOK],
    [VENDOR_ID_INSTAGRAM, VENDOR_NAME_INSTAGRAM],
    [VENDOR_ID_TWITTER, VENDOR_NAME_TWITTER],
    [undefined, 'unknown-vendor-id'],
  ])('getCustomVendor should return the value %s for given key %s', (expected, given) => {
    expect(getCustomVendor(given)).toBe(expected);
  });

  it.each([
    [PURPOSE_ID_SOCIAL, PURPOSE_NAME_SOCIAL],
    [PURPOSE_NAME_SOCIAL, PURPOSE_ID_SOCIAL],
    [undefined, 'unknown-purpose-name'],
  ])('getPurposeIdByName should return the value %s for given key %s', (expected, given) => {
    expect(getCustomPurpose(given as string)).toBe(expected);
  });

  it.each([
    [[PURPOSE_NAME_SOCIAL], VENDOR_NAME_TWITTER],
    [[PURPOSE_NAME_SOCIAL], VENDOR_NAME_FACEBOOK],
    [[PURPOSE_NAME_SOCIAL], VENDOR_NAME_INSTAGRAM],
    [[PURPOSE_NAME_SOCIAL], VENDOR_NAME_YOUTUBE],
    [[PURPOSE_ID_SOCIAL], VENDOR_ID_TWITTER],
    [[PURPOSE_ID_SOCIAL], VENDOR_ID_FACEBOOK],
    [[PURPOSE_ID_SOCIAL], VENDOR_ID_INSTAGRAM],
    [[PURPOSE_ID_SOCIAL], VENDOR_ID_YOUTUBE],
    [[VENDOR_NAME_FACEBOOK, VENDOR_NAME_YOUTUBE, VENDOR_NAME_INSTAGRAM, VENDOR_NAME_TWITTER], PURPOSE_NAME_SOCIAL],
    [[VENDOR_ID_FACEBOOK, VENDOR_ID_YOUTUBE, VENDOR_ID_INSTAGRAM, VENDOR_ID_TWITTER], PURPOSE_ID_SOCIAL],
    [undefined, 'unknown'],
  ])('getRelations should return %s for given key %s', (expected, key) => {
    expect(getRelations(key as string)).toEqual(expected);
  });

  it.each([
    [true, VENDOR_NAME_TWITTER],
    [true, VENDOR_NAME_FACEBOOK],
    [true, VENDOR_NAME_INSTAGRAM],
    [true, VENDOR_NAME_YOUTUBE],
    [true, VENDOR_ID_TWITTER],
    [true, VENDOR_ID_FACEBOOK],
    [true, VENDOR_ID_INSTAGRAM],
    [true, VENDOR_ID_YOUTUBE],
    [true, PURPOSE_NAME_SOCIAL],
    [true, PURPOSE_ID_SOCIAL],
    [false, 'unknown'],
  ])('hasRelations should return %s true for given key %s', (expected, key) => {
    expect(hasRelations(key as string)).toBe(expected);
  });

  it('addCustomVendor should add an entry to custom vendors list', () => {
    expect(getCustomVendor('customVendor')).toBeUndefined();

    addCustomVendor('customVendor', 'valueForCustomVendor');

    expect(getCustomVendor('customVendor')).toBe('valueForCustomVendor');
  });

  it('addCustomPurpose should add an entry to custom purposes list', () => {
    expect(getCustomPurpose('customPurpose')).toBeUndefined();

    addCustomPurpose('customPurpose', 'valueForCustomPurpose');

    expect(getCustomPurpose('customPurpose')).toBe('valueForCustomPurpose');
  });

  it('removeCustomVendor should remove an entry from the custom vendors list', () => {
    addCustomVendor('customVendor', 'value');

    removeCustomVendor('customVendor');

    expect(getCustomVendor('customVendor')).toBeUndefined();
  });

  it('removeCustomPurpose should remove an entry from the custom purposes list', () => {
    addCustomPurpose('customPurpose', 'value');

    removeCustomPurpose('customPurpose');

    expect(getCustomPurpose('customPurpose')).toBeUndefined();
  });

  it('setRelations should set an entry to the relations list', () => {
    expect(getRelations('relation')).toBeUndefined();

    setRelations('relation', ['relation']);

    expect(getRelations('relation')).toEqual(['relation']);
  });
});
