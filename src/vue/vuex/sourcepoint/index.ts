import { Commit, Module } from 'vuex';
import { getCustomVendorConsents } from '../../../sourcepoint';
import { SourcepointModuleState } from '../typings';
import { CustomPurpose, CustomVendor } from '../../../sourcepoint/typings';
import { configureGrants, getGrantedVendors } from '../../../vendor-mapping';

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
  async bootstrapConsents({ commit }: { commit: Commit }): Promise<void> {
    const { consentedPurposes = [], consentedVendors = [], grants = {} } = await getCustomVendorConsents();

    configureGrants(grants);

    commit('setCustomVendorConsents', consentedVendors);
    commit('setCustomPurposeConsents', consentedPurposes);
    commit('setGrantedVendors', getGrantedVendors());
  },
};

export const sourcepoint: Module<SourcepointModuleState, Record<string, unknown>> = {
  namespaced: true,
  state: moduleState,
  mutations,
  actions,
  getters,
};
