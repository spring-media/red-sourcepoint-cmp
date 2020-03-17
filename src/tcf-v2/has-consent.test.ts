import { getCustomVendorConsents } from './get-custom-vendor-consents';
import { customVendorHasConsent, purposeHasConsent, consentsAreEqual, hasConsent } from './has-consent';
import { Consent } from '../types';

jest.mock('./get-custom-vendor-consents');

describe('has-consent module', () => {
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

  describe('purposeHasConsent', () => {
    it('should return true', async () => {
      const consents = {
        consentedVendors: [],
        consentedPurposes: [{ _id: '#1234' }],
      };

      (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

      const result = await purposeHasConsent({ _id: '#1234' });

      expect(result).toBe(true);
    });

    it('should return false', async () => {
      const consents = {
        consentedVendors: [],
        consentedPurposes: [{ _id: '#1234' }],
      };

      (getCustomVendorConsents as jest.Mock).mockReturnValueOnce(Promise.resolve(consents));

      const result = await purposeHasConsent({ _id: '#1111' });

      expect(result).toBe(false);
    });

    it('should catch any errors', async () => {
      const spy = jest.spyOn(window.console, 'error').mockImplementation();
      (getCustomVendorConsents as jest.Mock).mockImplementationOnce(() => {
        throw new Error();
      });

      await purposeHasConsent({ _id: '#1111' });

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });
  });

  describe('consentsAreEqual', () => {
    it('should return true', () => {
      const consents: Consent[] = [{ _id: '#1234' }, { _id: '#1234' }, { _id: '#1234' }];

      expect(consentsAreEqual(...consents)).toBe(true);
    });

    it('should return false', () => {
      const consents: Consent[] = [{ _id: '#1234' }, { _id: '#1234' }, { _id: '#1235' }];

      expect(consentsAreEqual(...consents)).toBe(false);
    });
  });

  describe('hasConsent', () => {
    it('should return true', () => {
      const consents: Consent[] = [{ _id: '#1234' }, { _id: '#12345' }];

      expect(hasConsent({ _id: '#12345' }, consents)).toBe(true);
    });

    it('should return false', () => {
      const consents: Consent[] = [{ _id: '#1234' }, { _id: '#12345' }];

      expect(hasConsent({ _id: '#123' }, consents)).toBe(false);
    });
  });
});
