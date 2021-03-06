import { getCustomVendorConsents } from './get-custom-vendor-consents';
import {
  customConsentsAreEqual,
  customPurposeHasConsent,
  customVendorHasConsent,
  hasCustomConsent,
  hasCustomConsentById,
} from './has-custom-consent';
import { CustomConsent } from './typings';

jest.mock('./get-custom-vendor-consents');

describe('has-custom-consent module', () => {
  afterEach(() => {
    (getCustomVendorConsents as jest.Mock).mockReset();
  });

  describe('customVendorHasConsent', () => {
    it('should return true', async () => {
      const consents = {
        consentedVendors: [{ _id: '#1234' }],
        consentedPurposes: [],
      };

      (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

      const result = await customVendorHasConsent({ _id: '#1234' });

      expect(result).toBe(true);
    });

    it('should return false', async () => {
      const consents = {
        consentedVendors: [{ _id: '#1234' }],
        consentedPurposes: [],
      };

      (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

      const result = await customVendorHasConsent({ _id: '#1111' });

      expect(result).toBe(false);
    });

    it('should catch any errors', async () => {
      const spy = jest.spyOn(window.console, 'error').mockImplementation();
      (getCustomVendorConsents as jest.Mock).mockImplementationOnce(() => {
        throw new Error();
      });

      await customVendorHasConsent({ _id: '#1111' });

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });

  describe('customPurposeHasConsent', () => {
    it('should return true', async () => {
      const consents = {
        consentedVendors: [],
        consentedPurposes: [{ _id: '#1234' }],
      };

      (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

      const result = await customPurposeHasConsent({ _id: '#1234' });

      expect(result).toBe(true);
    });

    it('should return false', async () => {
      const consents = {
        consentedVendors: [],
        consentedPurposes: [{ _id: '#1234' }],
      };

      (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

      const result = await customPurposeHasConsent({ _id: '#1111' });

      expect(result).toBe(false);
    });

    it('should catch any errors', async () => {
      const spy = jest.spyOn(window.console, 'error').mockImplementation();
      (getCustomVendorConsents as jest.Mock).mockImplementationOnce(() => {
        throw new Error();
      });

      await customPurposeHasConsent({ _id: '#1111' });

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });

  describe('customConsentsAreEqual', () => {
    it('should return true', () => {
      const consents: CustomConsent[] = [{ _id: '#1234' }, { _id: '#1234' }, { _id: '#1234' }];

      expect(customConsentsAreEqual(...consents)).toBe(true);
    });

    it('should return false', () => {
      const consents: CustomConsent[] = [{ _id: '#1234' }, { _id: '#1234' }, { _id: '#1235' }];

      expect(customConsentsAreEqual(...consents)).toBe(false);
    });
  });

  describe('hasCustomConsent', () => {
    it('should return true', () => {
      const consents: CustomConsent[] = [{ _id: '#1234' }, { _id: '#12345' }];

      expect(hasCustomConsent({ _id: '#12345' }, consents)).toBe(true);
    });

    it('should return false', () => {
      const consents: CustomConsent[] = [{ _id: '#1234' }, { _id: '#12345' }];

      expect(hasCustomConsent({ _id: '#123' }, consents)).toBe(false);
    });
  });

  describe('hasCustomConsentById', () => {
    it('should return true', () => {
      const consents: CustomConsent[] = [{ _id: '#1234' }, { _id: '#12345' }];

      expect(hasCustomConsentById('#12345', consents)).toBe(true);
    });

    it('should return false', () => {
      const consents: CustomConsent[] = [{ _id: '#1234' }, { _id: '#12345' }];

      expect(hasCustomConsentById('#123', consents)).toBe(false);
    });
  });
});
