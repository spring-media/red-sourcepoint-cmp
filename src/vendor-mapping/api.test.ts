import {
  getVendorIdsForPurpose,
  configureGrants,
  vendorHasGrant,
  dumpPurposeRelations,
  configureVendorPurposeMapping,
  loadVendorPurposeMapping,
  getGrantedVendors,
  getPurposesForVendor,
  vendorHasPurpose,
} from './api';
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

  it('getVendorIdsForPurpose should return a list of vendor ids for given purpose id', () => {
    configureVendorPurposeMapping([
      {
        vendorId: '1',
        categories: [
          { _id: '1', type: 'CONSENT' },
          { _id: '2', type: 'CONSENT' },
          { _id: '3', type: 'CONSENT' },
        ],
      },
      {
        vendorId: '2',
        categories: [
          { _id: '2', type: 'CONSENT' },
          { _id: '3', type: 'CONSENT' },
          { _id: '4', type: 'CONSENT' },
        ],
      },
      {
        vendorId: '3',
        categories: [{ _id: '9', type: 'CONSENT' }],
      },
    ]);

    expect(getVendorIdsForPurpose('3')).toEqual(['1', '2']);
  });

  describe('getPurposesForVendor', () => {
    it('should return empty lists if no purpose id is found', () => {
      expect(getPurposesForVendor('99')).toEqual({
        purposeIds: [],
        legitimateInterestIds: [],
      });
    });

    it('should return purpose ids for given vendor grouped by their type', () => {
      configureVendorPurposeMapping([
        {
          vendorId: '1',
          categories: [
            { _id: '1', type: 'CONSENT' },
            { _id: '2', type: 'CONSENT' },
            { _id: '3', type: 'LEGITIMATE_INTEREST' },
            { _id: '4', type: 'LEGITIMATE_INTEREST' },
          ],
        },
      ]);

      expect(getPurposesForVendor('1')).toEqual({
        purposeIds: ['1', '2'],
        legitimateInterestIds: ['3', '4'],
      });
    });
  });

  describe('dumpPurposeRelations', () => {
    it('should return empty lists if no purpose id is found', () => {
      expect(dumpPurposeRelations('99')).toEqual({
        purposeIds: [],
        legitimateInterestIds: [],
        vendorIds: [],
      });
    });

    it('should return a list of vendor ids and purpose ids connected with each other', () => {
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

  describe('vendorHasPurpose', () => {
    it('should return false by default', () => {
      expect(vendorHasPurpose('1234', '4567')).toBe(false);
    });

    it('should return false', () => {
      configureVendorPurposeMapping([
        {
          vendorId: '1',
          categories: [
            { _id: '2', type: 'CONSENT' },
            { _id: '3', type: 'LEGITIMATE_INTEREST' },
          ],
        },
      ]);

      expect(vendorHasPurpose('1', '4')).toBe(false);
    });

    it('should return true', () => {
      configureVendorPurposeMapping([
        {
          vendorId: '1',
          categories: [
            { _id: '2', type: 'CONSENT' },
            { _id: '3', type: 'LEGITIMATE_INTEREST' },
          ],
        },
      ]);

      expect(vendorHasPurpose('1', '2')).toBe(true);
    });
  });
});
