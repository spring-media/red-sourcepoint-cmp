import { Module } from 'vuex';
import { State } from '../../types';

const state: State = {
  vendorConsents: [],
  purposeConsents: [],
};

export const getters = {
  hasVendorConsent: (state: State, payload: string): boolean => state.vendorConsents.includes(payload),
  hasPurposeConsent: (state: State, payload: string): boolean => state.purposeConsents.includes(payload),
};

export const mutations = {
  consentVendor(state: State, payload: string): void {
    !state.vendorConsents.includes(payload) && state.vendorConsents.push(payload);
  },
  rejectVendor(state: State, payload: string): void {
    const index = state.vendorConsents.indexOf(payload);

    index >= 0 && state.vendorConsents.splice(index, 1);
  },
  consentPurpose(state: State, payload: string): void {
    !state.purposeConsents.includes(payload) && state.purposeConsents.push(payload);
  },
  rejectPurpose(state: State, payload: string): void {
    const index = state.purposeConsents.indexOf(payload);

    index >= 0 && state.purposeConsents.splice(index, 1);
  },
};

export const sourcepoint: Module<State, State> = {
  namespaced: true,
  state,
  getters,
  mutations,
};
