import { getCustomVendorConsents } from './get-custom-vendor-consents';
import { customVendorHasConsent, purposeHasConsent } from './has-consent';

jest.mock('./get-custom-vendor-consents');

describe('customVendorHasConsent', () => {
  it('should return true', async () => {
    const consents = {
      consentedVendors: [{ _id: '#1234' }],
      consentedPurposes: [],
    };

    (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

    const result = await customVendorHasConsent('#1234');

    expect(result).toBe(true);
  });

  it('should return false', async () => {
    const consents = {
      consentedVendors: [{ _id: '#1234' }],
      consentedPurposes: [],
    };

    (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

    const result = await customVendorHasConsent('#1111');

    expect(result).toBe(false);
  });

  it('should catch any errors', async () => {
    const spy = jest.spyOn(window.console, 'error').mockImplementation();
    (getCustomVendorConsents as jest.Mock).mockImplementationOnce(() => {
      throw new Error();
    });

    await customVendorHasConsent('#1111');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe('purposeHasConsent', () => {
  it('should return true', async () => {
    const consents = {
      consentedVendors: [],
      consentedPurposes: [{ _id: '#1234' }],
    };

    (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

    const result = await purposeHasConsent('#1234');

    expect(result).toBe(true);
  });

  it('should return false', async () => {
    const consents = {
      consentedVendors: [],
      consentedPurposes: [{ _id: '#1234' }],
    };

    (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

    const result = await purposeHasConsent('#1111');

    expect(result).toBe(false);
  });

  it('should catch any errors', async () => {
    const spy = jest.spyOn(window.console, 'error').mockImplementation();
    (getCustomVendorConsents as jest.Mock).mockImplementationOnce(() => {
      throw new Error();
    });

    await purposeHasConsent('#1111');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
