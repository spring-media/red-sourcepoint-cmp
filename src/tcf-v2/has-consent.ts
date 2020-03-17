import { getCustomVendorConsents } from './get-custom-vendor-consents';
import { Consent } from '../types';

export const consentsAreEqual = (...consents: Consent[]): boolean => {
  const [consent, ...rest] = consents;

  return rest.every(c => c._id === consent._id);
};

export const hasConsent = (consent: Consent, collection: Consent[]): boolean =>
  collection.some((c: Consent) => consentsAreEqual(c, consent));

export const customVendorHasConsent = async (vendor: Consent): Promise<boolean> => {
  try {
    const { consentedVendors } = await getCustomVendorConsents();

    return hasConsent(vendor, consentedVendors);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const purposeHasConsent = async (purpose: Consent): Promise<boolean> => {
  try {
    const { consentedPurposes } = await getCustomVendorConsents();

    return hasConsent(purpose, consentedPurposes);
  } catch (error) {
    console.error(error);
    return false;
  }
};
