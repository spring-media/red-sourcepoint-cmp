import { getters, mutations, actions } from './index';
import { CustomVendorConsentsResult, Purpose, State, Vendor } from '../../../types';
import { getCustomVendorConsents, hasConsent } from '../../../tcf-v2';
import { Commit } from 'vuex';

jest.mock('../../../tcf-v2');

const createState = (args: Partial<State> = {}): State => {
  const defaultState: State = {
    consentedVendors: [],
    consentedPurposes: [],
    privacyManagerId: 1,
    cmpEnabled: true,
  };

  return { ...defaultState, ...args };
};

describe('vuex-module', () => {
  describe('getter', () => {
    it('hasVendorConsent should call hasConsent function from the tcf-v2 package', () => {
      (hasConsent as jest.Mock).mockReturnValue(true);

      const vendor: Vendor = { _id: '#1234', name: 'vendor', vendorType: 'custom' };

      const state = createState({ consentedVendors: [vendor] });

      expect(getters.hasVendorConsent(state)(vendor)).toBe(true);
      expect(hasConsent).toHaveBeenCalledWith(vendor, state.consentedVendors);

      (hasConsent as jest.Mock).mockReset();
    });

    it('hasPurposeConsent should call hasConsent function from the tcf-v2 package', () => {
      (hasConsent as jest.Mock).mockReturnValue(true);

      const purpose: Purpose = { _id: '#1234', name: 'purpose' };

      const state = createState({ consentedPurposes: [purpose] });

      expect(getters.hasPurposeConsent(state)(purpose)).toBe(true);
      expect(hasConsent).toHaveBeenCalledWith(purpose, state.consentedPurposes);

      (hasConsent as jest.Mock).mockReset();
    });
  });

  describe('mutation', () => {
    it('consentVendor should add a given vendor if not exists', () => {
      const state = createState();

      const vendor: Vendor = { _id: '#1234', name: 'vendor', vendorType: 'custom' };

      mutations.consentVendor(state, vendor);

      expect(state.consentedVendors).toEqual([vendor]);
    });

    it('consentVendor should not add a given vendor if already exists', () => {
      (hasConsent as jest.Mock).mockReturnValueOnce(true);

      const vendor: Vendor = { _id: '#1234', name: 'vendor', vendorType: 'custom' };

      const state = createState({ consentedVendors: [vendor] });

      mutations.consentVendor(state, vendor);

      expect(state.consentedVendors).toEqual([vendor]);
    });

    it('consentPurpose should add a given purpose if not exists', () => {
      (hasConsent as jest.Mock).mockReturnValueOnce(false);

      const state = createState();

      const purpose: Purpose = { _id: '#1234', name: 'purpose' };

      mutations.consentPurpose(state, purpose);

      expect(state.consentedPurposes).toEqual([purpose]);
    });

    it('consentPurpose should not add a given purpose if already exists', () => {
      (hasConsent as jest.Mock).mockReturnValueOnce(true);

      const purpose: Purpose = { _id: '#1234', name: 'purpose' };

      const state = createState({ consentedPurposes: [purpose] });

      mutations.consentPurpose(state, purpose);

      expect(state.consentedPurposes).toEqual([purpose]);
    });

    it('rejectVendor should remove a given vendor from the collection', () => {
      const vendor: Vendor = { _id: '#1234', name: 'vendor', vendorType: 'custom' };

      const state = createState({ consentedVendors: [vendor] });

      mutations.rejectVendor(state, vendor);

      expect(state.consentedVendors.length).toBe(0);
    });

    it('rejectPurpose should remove a given vendor from the collection', () => {
      const purpose: Purpose = { _id: '#1234', name: 'purpose' };

      const state = createState({ consentedPurposes: [purpose] });

      mutations.rejectPurpose(state, purpose);

      expect(state.consentedPurposes.length).toBe(0);
    });
  });

  describe('action', () => {
    it('bootstrapConsents should initialize the consents props of the state', async () => {
      const consents: CustomVendorConsentsResult = {
        consentedPurposes: [],
        consentedVendors: [],
      };

      const commit: Commit = jest.fn();

      (getCustomVendorConsents as jest.Mock).mockImplementation(() => Promise.resolve(consents));

      await actions.bootstrapConsents({ commit });

      expect(commit).toHaveBeenNthCalledWith(1, 'setVendorConsents', consents.consentedVendors);
      expect(commit).toHaveBeenNthCalledWith(2, 'setPurposeConsents', consents.consentedPurposes);
    });
  });
});
