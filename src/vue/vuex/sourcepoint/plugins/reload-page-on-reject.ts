import { MutationPayload, Store } from 'vuex';
import { SourcepointModuleState } from '../../typings';
import { getRemovedCustomConsents } from '../../../../sourcepoint';
import { CustomConsent } from '../../../../sourcepoint/typings';

type RootState = {
  sourcepoint: SourcepointModuleState;
};

export const reloadPageOnReject = (store: Store<Record<string, unknown>>): (() => void) => {
  let vendors: CustomConsent[] = [];
  let purposes: CustomConsent[] = [];

  const mayReload = (consents: CustomConsent[], compareTo: CustomConsent[]): void => {
    if (getRemovedCustomConsents(consents, compareTo).length) {
      typeof window !== 'undefined' && setTimeout(window.location.reload, 500);
    }
  };

  return store.subscribe((mutation: MutationPayload, state) => {
    if (mutation.type === 'sourcepoint/setCustomVendorConsents') {
      mayReload(vendors, mutation.payload);

      vendors = (state as RootState).sourcepoint.consentedCustomVendors;
    }

    if (mutation.type === 'sourcepoint/setCustomPurposeConsents') {
      mayReload(purposes, mutation.payload);

      purposes = (state as RootState).sourcepoint.consentedCustomPurposes;
    }
  });
};
