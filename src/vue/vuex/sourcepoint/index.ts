import { Commit, Dispatch, Module } from 'vuex';
import { getCustomVendorConsents } from '../../../sourcepoint';
import { SourcepointModuleState } from '../typings';
import { CustomPurpose, CustomVendor } from '../../../sourcepoint/typings';
import {
  configureGrants,
  configureVendorPurposeMapping,
  getGrantedVendors,
  loadVendorPurposeMapping,
  getGrantedVendorsPUR,
  setGrantedVendorsPUR,
} from '../../../vendor-mapping';

const moduleState: SourcepointModuleState = {
  consentedCustomVendors: [],
  consentedCustomPurposes: [],
  grantedVendors: [],
  grantedVendorsPUR: [],
  consentReady: false,
};

export const mutations = {
  setCustomVendorConsents(state: SourcepointModuleState, payload: CustomVendor[]): void {
    state.consentedCustomVendors = payload;
  },
  setCustomPurposeConsents(state: SourcepointModuleState, payload: CustomPurpose[]): void {
    state.consentedCustomPurposes = payload;
  },
  setGrantedVendors(state: SourcepointModuleState, payload: string[]): void {
    state.grantedVendors = payload;
  },
  setConsentReady(state: SourcepointModuleState, payload: boolean): void {
    state.consentReady = payload;
  },
  setGrantedVendorPUR(state: SourcepointModuleState, payload: string): void {
    if (state.grantedVendorsPUR.includes(payload)) {
      return;
    }

    state.grantedVendorsPUR = [...state.grantedVendorsPUR, payload];

    setGrantedVendorsPUR(state.grantedVendorsPUR);
  },
  rejectVendorPUR(state: SourcepointModuleState, payload: string): void {
    state.grantedVendorsPUR = state.grantedVendorsPUR.filter((id) => id !== payload);

    setGrantedVendorsPUR(state.grantedVendorsPUR);
  },
  setGrantedVendorsPUR(state: SourcepointModuleState, payload: string[]): void {
    state.grantedVendorsPUR = payload;
  },
};

export const getters = {
  vendorHasConsent: (state: SourcepointModuleState) => (vendorId: string): boolean =>
    state.grantedVendors.includes(vendorId),
  vendorHasConsentPUR: (state: SourcepointModuleState) => (vendorId: string): boolean =>
    state.grantedVendorsPUR.includes(vendorId),
};

export const actions = {
  async updateConsents({ commit }: { commit: Commit }): Promise<void> {
    const { consentedPurposes = [], consentedVendors = [], grants = {} } = await getCustomVendorConsents();

    configureGrants(grants);

    commit('setCustomVendorConsents', consentedVendors);
    commit('setCustomPurposeConsents', consentedPurposes);
    commit('setGrantedVendors', getGrantedVendors());

    commit('setGrantedVendorsPUR', getGrantedVendorsPUR());

    commit('setConsentReady', true);
  },
  async bootstrapConsents({ dispatch }: { dispatch: Dispatch }, payload: { propertyId: number }): Promise<void> {
    await dispatch('updateConsents');

    const mappings = await loadVendorPurposeMapping(payload.propertyId);

    configureVendorPurposeMapping(mappings);
  },
};

export const sourcepoint: Module<SourcepointModuleState, Record<string, unknown>> = {
  namespaced: true,
  state: moduleState,
  mutations,
  actions,
  getters,
};
