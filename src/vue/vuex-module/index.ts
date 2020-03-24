import { Commit, Module } from 'vuex';
import { Purpose, State, Vendor } from '../../types';
import { consentsAreEqual, getCustomVendorConsents, hasConsent } from '../../tcf-v2';

const state: State = {
  consentedVendors: [],
  consentedPurposes: [],
  vendorMap: { instagram: '12345' },
  purposeMap: { socialMedia: '67890' },
  privacyManagerId: 123456,
};

export const getters = {
  hasVendorConsent: ({ consentedVendors }: State): Function => (payload: Vendor): boolean =>
    hasConsent(payload, consentedVendors),
  hasPurposeConsent: ({ consentedPurposes }: State): Function => (payload: Purpose): boolean =>
    hasConsent(payload, consentedPurposes),
  getVendorFromMap: ({ vendorMap }: State): Function => (payload: string): Vendor | null =>
    vendorMap[payload] ? { _id: vendorMap[payload] } : null,
  getPurposeFromMap: ({ purposeMap }: State): Function => (payload: string): Purpose | null =>
    purposeMap[payload] ? { _id: purposeMap[payload] } : null,
};

export const mutations = {
  setVendorConsents(state: State, payload: Vendor[]): void {
    state.consentedVendors = payload;
  },
  setPurposeConsents(state: State, payload: Purpose[]): void {
    state.consentedPurposes = payload;
  },
  consentVendor({ consentedVendors }: State, payload: Vendor): void {
    if (hasConsent(payload, consentedVendors)) {
      return;
    }

    consentedVendors.push(payload);
  },
  rejectVendor(state: State, payload: Vendor): void {
    state.consentedVendors = state.consentedVendors.filter(vendor => consentsAreEqual(vendor, payload));
  },
  consentPurpose(state: State, payload: Purpose): void {
    if (hasConsent(payload, state.consentedPurposes)) {
      return;
    }

    state.consentedPurposes.push(payload);
  },
  rejectPurpose(state: State, payload: Purpose): void {
    state.consentedPurposes = state.consentedPurposes.filter(purpose => consentsAreEqual(purpose, payload));
  },
};

export const actions = {
  async bootstrapConsents({ commit }: { commit: Commit }): Promise<void> {
    const { consentedPurposes = [], consentedVendors = [] } = await getCustomVendorConsents();

    commit('setVendorConsents', consentedVendors);
    commit('setPurposeConsents', consentedPurposes);
  },
};

export const sourcepoint: Module<State, State> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
