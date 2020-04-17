/**
 * @jest-environment node
 */

import { getCustomVendorConsents } from './get-custom-vendor-consents';

describe('getCustomVendorConsents', () => {
  it('should reject if window is not present', async () => {
    expect.assertions(1);

    await expect(getCustomVendorConsents()).rejects.toBe(undefined);
  });
});
