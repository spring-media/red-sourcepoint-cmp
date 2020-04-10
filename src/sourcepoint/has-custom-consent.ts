import { getCustomVendorConsents, getCustomVendorConsentsBypassCache } from './get-custom-vendor-consents';
import { CustomConsent, HasConsentOptions } from './typings';

export const customConsentsAreEqual = (...consents: CustomConsent[]): boolean => {
  const [consent, ...rest] = consents;

  return rest.every((c) => c._id === consent._id);
};

export const hasCustomConsent = (consent: CustomConsent, collection: CustomConsent[]): boolean =>
  collection.some((c: CustomConsent) => customConsentsAreEqual(c, consent));

export const hasCustomConsentById = (_id: string, collection: CustomConsent[]): boolean =>
  hasCustomConsent({ _id }, collection);

export const customVendorHasConsent = async (vendor: CustomConsent, options?: HasConsentOptions): Promise<boolean> => {
  try {
    const getConsents = options && !options.cache ? getCustomVendorConsentsBypassCache : getCustomVendorConsents;

    const { consentedVendors } = await getConsents();

    return hasCustomConsent(vendor, consentedVendors);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const customPurposeHasConsent = async (
  purpose: CustomConsent,
  options?: HasConsentOptions,
): Promise<boolean> => {
  try {
    const getConsents = options && !options.cache ? getCustomVendorConsentsBypassCache : getCustomVendorConsents;

    const { consentedPurposes } = await getConsents();

    return hasCustomConsent(purpose, consentedPurposes);
  } catch (error) {
    console.error(error);
    return false;
  }
};
