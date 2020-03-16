import { getCustomVendorConsents } from './get-custom-vendor-consents';
import { Purpose, Vendor } from '../types';

export const customVendorHasConsent = async (vendorId: string): Promise<boolean> => {
  try {
    const { consentedVendors = [] } = await getCustomVendorConsents();

    return consentedVendors.some((vendor: Vendor) => vendor._id === vendorId);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const purposeHasConsent = async (purposeId: string): Promise<boolean> => {
  try {
    const { consentedPurposes = [] } = await getCustomVendorConsents();

    return consentedPurposes.some((purpose: Purpose) => purpose._id === purposeId);
  } catch (error) {
    console.error(error);
    return false;
  }
};
