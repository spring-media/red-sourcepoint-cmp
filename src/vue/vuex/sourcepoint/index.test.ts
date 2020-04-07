import { getters, mutations, actions } from './index';
import { getCustomVendorConsents, hasCustomConsent } from '../../../sourcepoint';
import { Commit } from 'vuex';
import { SourcepointModuleState } from '../typings';
import { CustomPurpose, CustomVendor, CustomVendorConsentsResult } from '../../../sourcepoint/typings';

jest.mock('../../../sourcepoint');

const createState = (args: Partial<SourcepointModuleState> = {}): SourcepointModuleState => {
  const defaultState: SourcepointModuleState = {
    consentedCustomVendors: [],
    consentedCustomPurposes: [],
  };

  return { ...defaultState, ...args };
};

describe('vuex-module', () => {
  describe('getter', () => {
    it('hasCustomVendorConsent should call hasConsent function from the tcf-v2 package', () => {
      (hasCustomConsent as jest.Mock).mockReturnValue(true);

      const vendor: CustomVendor = { _id: '#1234', name: 'vendor', vendorType: 'custom' };

      const state = createState({ consentedCustomVendors: [vendor] });

      expect(getters.hasCustomVendorConsent(state)(vendor)).toBe(true);
      expect(hasCustomConsent).toHaveBeenCalledWith(vendor, state.consentedCustomVendors);

      (hasCustomConsent as jest.Mock).mockReset();
    });

    it('hasCustomPurposeConsent should call hasConsent function from the tcf-v2 package', () => {
      (hasCustomConsent as jest.Mock).mockReturnValue(true);

      const purpose: CustomPurpose = { _id: '#1234', name: 'purpose' };

      const state = createState({ consentedCustomPurposes: [purpose] });

      expect(getters.hasCustomPurposeConsent(state)(purpose)).toBe(true);
      expect(hasCustomConsent).toHaveBeenCalledWith(purpose, state.consentedCustomPurposes);

      (hasCustomConsent as jest.Mock).mockReset();
    });
  });

  describe('mutation', () => {
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

      expect(commit).toHaveBeenNthCalledWith(1, 'setCustomVendorConsents', consents.consentedVendors);
      expect(commit).toHaveBeenNthCalledWith(2, 'setCustomPurposeConsents', consents.consentedPurposes);
    });
  });
});
