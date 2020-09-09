import { mutations, actions } from './index';
import { getCustomVendorConsents } from '../../../sourcepoint';
import { Commit } from 'vuex';
import { SourcepointModuleState } from '../typings';
import { CustomPurpose, CustomVendor, CustomVendorConsentsResult } from '../../../sourcepoint/typings';
import { loadVendorPurposeMapping, getGrantedVendors } from '../../../vendor-mapping';
import { VendorPurposeMappings } from '../../../vendor-mapping/typings';

jest.mock('../../../sourcepoint');
jest.mock('../../../vendor-mapping');

const createState = (args: Partial<SourcepointModuleState> = {}): SourcepointModuleState => {
  const defaultState: SourcepointModuleState = {
    consentedCustomVendors: [],
    consentedCustomPurposes: [],
    grantedVendors: [],
  };

  return { ...defaultState, ...args };
};

describe('vuex-module', () => {
  describe('mutations', () => {
    it('setCustomVendorConsents should set state property consentedCustomVendors', () => {
      const vendor1: CustomVendor = { _id: '#1234', name: 'vendor1', vendorType: 'custom' };
      const vendor2: CustomVendor = { _id: '#5678', name: 'vendor2', vendorType: 'custom' };

      const state = createState({ consentedCustomVendors: [vendor1] });

      mutations.setCustomVendorConsents(state, [vendor2]);

      expect(state.consentedCustomVendors).toEqual([vendor2]);
    });

    it('setCustomPurposeConsents should set state property consentedCustomPurposes', () => {
      const purpose1: CustomPurpose = { _id: '#1234', name: 'purpose1' };
      const purpose2: CustomPurpose = { _id: '#5678', name: 'purpose2' };

      const state = createState({ consentedCustomPurposes: [purpose1] });

      mutations.setCustomPurposeConsents(state, [purpose2]);

      expect(state.consentedCustomPurposes).toEqual([purpose2]);
    });

    it('setGrantedVendors should set state property grantedVendors', () => {
      const grant1 = '1';
      const grant2 = '2';

      const state = createState({ grantedVendors: [grant1] });

      mutations.setGrantedVendors(state, [grant2]);

      expect(state.grantedVendors).toEqual([grant2]);
    });
  });

  describe('actions', () => {
    it('bootstrapConsents should setup the store', async () => {
      const consents: CustomVendorConsentsResult = {
        consentedPurposes: [],
        consentedVendors: [],
        grants: {},
      };
      const vendorPurposeMappings: VendorPurposeMappings = [];

      const commit: Commit = jest.fn();

      (loadVendorPurposeMapping as jest.Mock).mockImplementation(() => Promise.resolve(vendorPurposeMappings));
      (getCustomVendorConsents as jest.Mock).mockImplementation(() => Promise.resolve(consents));
      (getGrantedVendors as jest.Mock).mockImplementation(() => []);

      await actions.bootstrapConsents({ commit }, { propertyId: 1 });

      expect(commit).toHaveBeenNthCalledWith(1, 'setCustomVendorConsents', consents.consentedVendors);
      expect(commit).toHaveBeenNthCalledWith(2, 'setCustomPurposeConsents', consents.consentedPurposes);
      expect(commit).toHaveBeenNthCalledWith(3, 'setGrantedVendors', []);
    });

    it('bootstrapConsents should setup the store with default values', async () => {
      const consents: CustomVendorConsentsResult = {} as CustomVendorConsentsResult;

      const vendorPurposeMappings: VendorPurposeMappings = [];

      const commit: Commit = jest.fn();

      (loadVendorPurposeMapping as jest.Mock).mockImplementation(() => Promise.resolve(vendorPurposeMappings));
      (getCustomVendorConsents as jest.Mock).mockImplementation(() => Promise.resolve(consents));
      (getGrantedVendors as jest.Mock).mockImplementation(() => []);

      await actions.bootstrapConsents({ commit }, { propertyId: 1 });

      expect(commit).toHaveBeenNthCalledWith(1, 'setCustomVendorConsents', []);
      expect(commit).toHaveBeenNthCalledWith(2, 'setCustomPurposeConsents', []);
      expect(commit).toHaveBeenNthCalledWith(3, 'setGrantedVendors', []);
    });
  });
});
