import { getCustomVendorConsents } from './get-custom-vendor-consents';
import { CustomConsent } from './typings';

export const customConsentsAreEqual = (...consents: CustomConsent[]): boolean => {
  const [consent, ...rest] = consents;

  return rest.every((c) => c._id === consent._id);
};

export const hasCustomConsent = (consent: CustomConsent, collection: CustomConsent[]): boolean =>
  collection.some((c: CustomConsent) => customConsentsAreEqual(c, consent));

export const hasCustomConsentById = (_id: string, collection: CustomConsent[]): boolean =>
  hasCustomConsent({ _id }, collection);

export const customVendorHasConsent = async (vendor: CustomConsent): Promise<boolean> => {
  try {
    const { consentedVendors } = await getCustomVendorConsents();

    return hasCustomConsent(vendor, consentedVendors);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const customPurposeHasConsent = async (purpose: CustomConsent): Promise<boolean> => {
  try {
    const { consentedPurposes } = await getCustomVendorConsents();

    return hasCustomConsent(purpose, consentedPurposes);
  } catch (error) {
    console.error(error);
    return false;
  }
};
