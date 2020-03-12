import { getters, mutations } from './index';
import { State } from '../../types';

const createState = (args: Partial<State> = {}): State => {
  const defaultState: State = {
    vendorConsents: [],
    purposeConsents: [],
  };

  return { ...defaultState, ...args };
};

describe('vuex-module', () => {
  describe('getter', () => {
    it('hasVendorConsent should return true', () => {
      const state: State = createState({ vendorConsents: ['#1234'] });

      expect(getters.hasVendorConsent(state, '#1234')).toBe(true);
    });

    it('hasVendorConsent should return false', () => {
      const state: State = createState();

      expect(getters.hasVendorConsent(state, '#1234')).toBe(false);
    });

    it('hasPurposeConsent should return true', () => {
      const state: State = createState({ purposeConsents: ['#1234'] });

      expect(getters.hasPurposeConsent(state, '#1234')).toBe(true);
    });

    it('hasPurposeConsent should return false', () => {
      const state: State = createState();

      expect(getters.hasPurposeConsent(state, '#1234')).toBe(false);
    });
  });

  describe('mutation', () => {
    it('consentVendor should add a given vendor if not exists', () => {
      const state = createState();

      mutations.consentVendor(state, '#1234');

      expect(state.vendorConsents).toEqual(['#1234']);
    });

    it('consentVendor should not add a given vendor if already exists', () => {
      const state = createState({ vendorConsents: ['#1234'] });

      mutations.consentVendor(state, '#1234');

      expect(state.vendorConsents).toEqual(['#1234']);
    });

    it('consentPurpose should add a given purpose if not exists', () => {
      const state = createState();

      mutations.consentPurpose(state, '#1234');

      expect(state.purposeConsents).toEqual(['#1234']);
    });

    it('consentPurpose should not add a given purpose if already exists', () => {
      const state = createState({ purposeConsents: ['#1234'] });

      mutations.consentPurpose(state, '#1234');

      expect(state.purposeConsents).toEqual(['#1234']);
    });

    it('rejectVendor should remove a given vendor from the collection', () => {
      const state = createState({ vendorConsents: ['#1234'] });

      mutations.rejectVendor(state, '#1234');

      expect(state.vendorConsents.length).toBe(0);
    });

    it('rejectPurpose should remove a given vendor from the collection', () => {
      const state = createState({ purposeConsents: ['#1234'] });

      mutations.rejectPurpose(state, '#1234');

      expect(state.purposeConsents.length).toBe(0);
    });
  });
});
