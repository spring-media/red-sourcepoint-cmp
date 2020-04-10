import { Commit, Module } from 'vuex';
import { getCustomVendorConsents } from '../../../sourcepoint';
import { SourcepointModuleState } from '../typings';
import { CustomPurpose, CustomVendor } from '../../../sourcepoint/typings';

const state: SourcepointModuleState = {
  consentedCustomVendors: [],
  consentedCustomPurposes: [],
};

export const mutations = {
  setCustomVendorConsents(state: SourcepointModuleState, payload: CustomVendor[]): void {
    state.consentedCustomVendors = payload;
  },
  setCustomPurposeConsents(state: SourcepointModuleState, payload: CustomPurpose[]): void {
    state.consentedCustomPurposes = payload;
  },
};

export const actions = {
  async bootstrapConsents({ commit }: { commit: Commit }): Promise<void> {
    const { consentedPurposes = [], consentedVendors = [] } = await getCustomVendorConsents();

    commit('setCustomVendorConsents', consentedVendors);
    commit('setCustomPurposeConsents', consentedPurposes);
  },
};

export const sourcepoint: Module<SourcepointModuleState, SourcepointModuleState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
