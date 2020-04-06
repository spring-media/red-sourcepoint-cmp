import { getCustomVendorConsents } from './get-custom-vendor-consents';

describe('getCustomVendorConsents', () => {
  it('should call the expected method that comes from the CMP API', () => {
    window.__tcfapi = jest.fn();

    getCustomVendorConsents();

    expect(window.__tcfapi).toHaveBeenCalledWith('getCustomVendorConsents', 2, expect.any(Function));
  });
});
