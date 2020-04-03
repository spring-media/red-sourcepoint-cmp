import { getCustomVendorConsents, getCustomVendorConsentsBypassCache } from './get-custom-vendor-consents';
import { Consent, HasConsentOptions } from '../types';

export const consentsAreEqual = (...consents: Consent[]): boolean => {
  const [consent, ...rest] = consents;

  return rest.every((c) => c._id === consent._id);
};

export const hasConsent = (consent: Consent, collection: Consent[]): boolean =>
  collection.some((c: Consent) => consentsAreEqual(c, consent));

export const customVendorHasConsent = async (vendor: Consent, options?: HasConsentOptions): Promise<boolean> => {
  try {
    const getConsents = options && !options.cache ? getCustomVendorConsentsBypassCache : getCustomVendorConsents;

    const { consentedVendors } = await getConsents();

    return hasConsent(vendor, consentedVendors);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const purposeHasConsent = async (purpose: Consent, options?: HasConsentOptions): Promise<boolean> => {
  try {
    const getConsents = options && !options.cache ? getCustomVendorConsentsBypassCache : getCustomVendorConsents;

    const { consentedPurposes } = await getConsents();

    return hasConsent(purpose, consentedPurposes);
  } catch (error) {
    console.error(error);
    return false;
  }
};
