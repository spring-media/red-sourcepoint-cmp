import { Module } from 'vuex';
import Vue from 'vue';
import { State } from '../../types';

export const sourcepoint: Module<State, State> = {
  namespaced: true,
  state: {
    consents: [],
  },
  getters: {
    hasConsent: (state: State, payload: string): boolean => state.consents.includes(payload),
  },
  mutations: {
    consentVendor(state: State, payload: string): void {
      !state.consents.includes(payload) && state.consents.push(payload);
    },
    rejectVendor(state: State, payload: string): void {
      Vue.delete(state.consents, payload);
    },
  },
};
