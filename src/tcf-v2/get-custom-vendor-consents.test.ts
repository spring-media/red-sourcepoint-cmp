import { executeMethod } from './tcf';
import { getCustomVendorConsents } from './get-custom-vendor-consents';

jest.mock('./tcf');

describe('getCustomVendorConsents', () => {
  it('should call the expected method that comes from the CMP API', () => {
    getCustomVendorConsents();

    expect(executeMethod).toHaveBeenCalledWith('getCustomVendorConsents');
  });
});
