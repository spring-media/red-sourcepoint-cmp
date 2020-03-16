import { Commit, Module } from 'vuex';
import { Purpose, State, Vendor } from '../../types';
import { getCustomVendorConsents } from '../../tcf-v2';

const state: State = {
  consentedVendors: [],
  consentedPurposes: [],
};

export const getters = {
  hasVendorConsent: (state: State, payload: Vendor): boolean => state.consentedVendors.includes(payload),
  hasPurposeConsent: (state: State, payload: Purpose): boolean => state.consentedPurposes.includes(payload),
};

export const mutations = {
  setVendorConsents(state: State, payload: Vendor[]): void {
    state.consentedVendors = payload;
  },
  setPurposeConsents(state: State, payload: Purpose[]): void {
    state.consentedPurposes = payload;
  },
  consentVendor(state: State, payload: Vendor): void {
    !state.consentedVendors.includes(payload) && state.consentedVendors.push(payload);
  },
  rejectVendor(state: State, payload: Vendor): void {
    state.consentedVendors = state.consentedVendors.filter(vendor => vendor._id !== payload._id);
  },
  consentPurpose(state: State, payload: Purpose): void {
    !state.consentedPurposes.includes(payload) && state.consentedPurposes.push(payload);
  },
  rejectPurpose(state: State, payload: Purpose): void {
    state.consentedPurposes = state.consentedPurposes.filter(purpose => purpose._id !== payload._id);
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
