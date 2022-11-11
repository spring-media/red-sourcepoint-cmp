import { getCustomVendorConsents } from './get-custom-vendor-consents';

describe('getCustomVendorConsents', () => {
  it('should call the __tcfapi function', () => {
    window.__tcfapi = jest.fn();

    getCustomVendorConsents();

    expect(window.__tcfapi).toHaveBeenCalledWith('getCustomVendorConsents', 2, expect.any(Function));

    delete window.__tcfapi;
  });

  it('should reject if the __tcfapi function is not present', async () => {
    expect.assertions(1);

    await expect(getCustomVendorConsents()).rejects.toBe(undefined);
  });
});
