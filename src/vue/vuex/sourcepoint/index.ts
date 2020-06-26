import { Commit, Dispatch, Module } from 'vuex';
import { getCustomVendorConsents } from '../../../sourcepoint';
import { SourcepointModuleState } from '../typings';
import { CustomPurpose, CustomVendor } from '../../../sourcepoint/typings';
import {
  configureGrants,
  configureVendorPurposeMapping,
  getGrantedVendors,
  loadVendorPurposeMapping,
} from '../../../vendor-mapping';

const moduleState: SourcepointModuleState = {
  consentedCustomVendors: [],
  consentedCustomPurposes: [],
  grantedVendors: [],
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
};

export const getters = {
  vendorHasConsent: (state: SourcepointModuleState) => (vendorId: string): boolean =>
    state.grantedVendors.includes(vendorId),
};

export const actions = {
  async refreshCustomVendorConsents({ commit }: { commit: Commit }): Promise<void> {
    const { consentedPurposes = [], consentedVendors = [], grants = {} } = await getCustomVendorConsents();

    configureGrants(grants);

    commit('setCustomVendorConsents', consentedVendors);
    commit('setCustomPurposeConsents', consentedPurposes);
    commit('setGrantedVendors', getGrantedVendors());
  },
  async bootstrapConsents({ dispatch }: { dispatch: Dispatch }, payload: { propertyId: number }): Promise<void> {
    await dispatch('refreshCustomVendorConsents');

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
