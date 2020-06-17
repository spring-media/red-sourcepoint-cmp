import {
  getPurposeIdsForVendor,
  getRelations,
  getVendorIdsForPurpose,
  configureGrants,
  vendorHasGrant,
  dumpPurposeRelations,
} from './api';

describe('custom-vendor-grants module', () => {
  describe('vendorHasGrant', () => {
    it('should return false if the module is not initialized', () => {
      expect(vendorHasGrant('123')).toBe(false);
    });

    it('should return false', () => {
      const grants = {
        '123': {
          purposeGrants: {},
          vendorGrant: false,
        },
      };

      configureGrants(grants);

      expect(vendorHasGrant('123')).toBe(false);
    });

    it('should return true', () => {
      const grants = {
        '123': {
          purposeGrants: {},
          vendorGrant: true,
        },
      };

      configureGrants(grants);

      expect(vendorHasGrant('123')).toBe(true);
    });
  });

  it('getPurposeIdsForVendor should return a list of purpose ids for given vendor id', () => {
    const grants = {
      '123': {
        purposeGrants: { '567': true, '890': true },
        vendorGrant: true,
      },
    };

    configureGrants(grants);

    expect(getPurposeIdsForVendor('123')).toEqual(['567', '890']);
  });

  it('getVendorIdsForPurpose should return a list of vendor ids for given purpose id', () => {
    const grants = {
      '1': {
        purposeGrants: { '4': true, '5': true },
        vendorGrant: true,
      },
      '2': {
        purposeGrants: { '4': true, '5': true, '8': false },
        vendorGrant: true,
      },
      '3': {
        purposeGrants: { '5': true, '6': true },
        vendorGrant: true,
      },
    };

    configureGrants(grants);

    expect(getVendorIdsForPurpose('5')).toEqual(['1', '2', '3']);
  });

  it('getRelations should return the value of given key from given map', () => {
    const map = new Map<string, Set<string>>();
    map.set('5', new Set(['1', '2', '3']));

    expect(getRelations('5', map)).toEqual(['1', '2', '3']);
  });

  it('getRelations should return an empty array if given key not exists', () => {
    const map = new Map<string, Set<string>>();

    expect(getRelations('5', map).length).toBe(0);
  });

  it('dumpPurposeRelations should ...', () => {
    const grants = {
      '1': {
        purposeGrants: { '4': true, '5': true },
        vendorGrant: true,
      },
      '2': {
        purposeGrants: { '4': true, '5': true, '8': false },
        vendorGrant: false,
      },
      '3': {
        purposeGrants: { '5': true, '6': true },
        vendorGrant: true,
      },
      '9': {
        purposeGrants: { '10': true },
        vendorGrant: true,
      },
    };

    configureGrants(grants);

    expect(dumpPurposeRelations('5')).toEqual({ vendorIds: ['1', '2', '3'], purposeIds: ['5', '4', '8', '6'] });
  });
});
