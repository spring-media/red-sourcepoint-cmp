/**
 * @jest-environment node
 */

import { postCustomConsent } from './post-custom-consent';

describe('postCustomConsent', () => {
  it('should reject if window is not present', async () => {
    expect.assertions(1);

    await expect(postCustomConsent({})).rejects.toBe(undefined);
  });
});
