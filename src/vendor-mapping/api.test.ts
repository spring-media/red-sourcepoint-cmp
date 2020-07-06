import {
  getPurposeIdsForVendor,
  getRelations,
  getVendorIdsForPurpose,
  configureGrants,
  vendorHasGrant,
  dumpPurposeRelations,
  configureVendorPurposeMapping,
  purposeIsType,
  loadVendorPurposeMapping,
  getGrantedVendors,
  groupPurposeIds,
} from './api';
import { PURPOSE_TYPE_CONSENT, PURPOSE_TYPE_LEGITIMATE_INTEREST } from './custom-purposes';
import { VendorPurposeMappings } from './typings';

describe('custom-vendor-grants module', () => {
  afterEach(() => {
    configureGrants({});
    configureVendorPurposeMapping([]);
  });

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

  it('dumpPurposeRelations should return a list of vendor ids and purpose ids connected with each other', () => {
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
    configureVendorPurposeMapping([
      {
        vendorId: '1',
        categories: [
          { _id: '4', type: 'CONSENT' },
          { _id: '5', type: 'LEGITIMATE_INTEREST' },
        ],
      },
      {
        vendorId: '2',
        categories: [
          { _id: '4', type: 'LEGITIMATE_INTEREST' },
          { _id: '5', type: 'LEGITIMATE_INTEREST' },
          { _id: '8', type: 'CONSENT' },
        ],
      },
      {
        vendorId: '3',
        categories: [
          { _id: '5', type: 'LEGITIMATE_INTEREST' },
          { _id: '6', type: 'LEGITIMATE_INTEREST' },
        ],
      },
    ]);

    expect(dumpPurposeRelations('5')).toEqual({
      vendorIds: ['1', '2', '3'],
      purposeIds: ['4', '8'],
      legitimateInterestIds: ['5', '4', '6'],
    });
  });

  describe('purposeIsType', () => {
    it('should return false', () => {
      configureVendorPurposeMapping([{ vendorId: '1', categories: [{ _id: '2', type: PURPOSE_TYPE_CONSENT }] }]);

      expect(purposeIsType('2', PURPOSE_TYPE_LEGITIMATE_INTEREST)).toBe(false);
    });

    it('should return false if given purposeId is unknown', () => {
      expect(purposeIsType('123', PURPOSE_TYPE_LEGITIMATE_INTEREST)).toBe(false);
    });

    it('should return true', () => {
      configureVendorPurposeMapping([
        { vendorId: '1', categories: [{ _id: '2', type: PURPOSE_TYPE_LEGITIMATE_INTEREST }] },
      ]);

      expect(purposeIsType('2', PURPOSE_TYPE_LEGITIMATE_INTEREST)).toBe(true);
    });
  });

  describe('loadVendorPurposeMapping', () => {
    it('should load a mapping table from the Sourcepoint API', async () => {
      const response: VendorPurposeMappings = [
        {
          vendorId: '1',
          categories: [
            { _id: '2', type: 'CONSENT' },
            { _id: '3', type: 'LEGITIMATE_INTEREST' },
          ],
        },
      ];

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(response) }));

      const result = await loadVendorPurposeMapping(123);

      expect(result).toBe(response);

      delete window.fetch;
    });

    it('should return an empty array in case of an error', async () => {
      jest.spyOn(window.console, 'error').mockImplementation(() => null);

      window.fetch = jest.fn().mockImplementation(() => Promise.reject({}));

      const result = await loadVendorPurposeMapping(123);

      expect(result).toEqual([]);
      expect(window.console.error).toHaveBeenCalled();

      (window.console.error as jest.Mock).mockRestore();

      delete window.fetch;
    });
  });

  it('configureVendorPurposeMapping', () => {
    expect(purposeIsType('1', 'LEGITIMATE_INTEREST')).toBe(false);
    expect(purposeIsType('2', 'CONSENT')).toBe(false);

    const mappings: VendorPurposeMappings = [
      {
        vendorId: '1',
        categories: [
          { _id: '1', type: 'LEGITIMATE_INTEREST' },
          { _id: '2', type: 'CONSENT' },
        ],
      },
    ];

    configureVendorPurposeMapping(mappings);

    expect(purposeIsType('1', 'LEGITIMATE_INTEREST')).toBe(true);
    expect(purposeIsType('2', 'CONSENT')).toBe(true);
  });

  describe('getGrantedVendors', () => {
    it('should return an empty array if module is not configured', () => {
      expect(getGrantedVendors()).toEqual([]);
    });

    it('should return granted vendors based on grants-configuration', () => {
      configureGrants({
        '1': {
          purposeGrants: {},
          vendorGrant: true,
        },
        '2': {
          purposeGrants: {},
          vendorGrant: false,
        },
      });

      expect(getGrantedVendors()).toEqual(['1']);
    });
  });

  it('groupPurposeIds should group given purpose ids based on their type', () => {
    const mappings: VendorPurposeMappings = [
      {
        vendorId: '1',
        categories: [
          { _id: '1', type: 'LEGITIMATE_INTEREST' },
          { _id: '2', type: 'CONSENT' },
          { _id: '3', type: 'LEGITIMATE_INTEREST' },
          { _id: '4', type: 'CONSENT' },
          { _id: '5', type: 'LEGITIMATE_INTEREST' },
          { _id: '6', type: 'CONSENT' },
        ],
      },
    ];

    configureVendorPurposeMapping(mappings);

    expect(groupPurposeIds(['1', '2', '3', '4', '5', '6'])).toEqual({
      purposeIds: ['2', '4', '6'],
      legitimateInterestIds: ['1', '3', '5'],
    });
  });
});
