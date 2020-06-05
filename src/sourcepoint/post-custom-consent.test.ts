import { postCustomConsent } from './post-custom-consent';
import { GenericCallback } from '../tcf-v2/typings';

describe('postCustomConsent', () => {
  it('should call the __tcfapi function', () => {
    window.__tcfapi = jest.fn();

    const vendorIds = ['1234'];
    const purposeIds = ['5678'];
    const legitimateInterestIds = ['9012'];

    postCustomConsent({ vendorIds, purposeIds, legitimateInterestIds });

    expect(window.__tcfapi).toHaveBeenCalledWith(
      'postCustomConsent',
      2,
      expect.any(Function),
      vendorIds,
      purposeIds,
      legitimateInterestIds,
    );

    delete window.__tcfapi;
  });

  it('should reject the command if the success parameter of the callback is false', async () => {
    window.__tcfapi = (_command: string, _version: number, callback: GenericCallback): void => {
      callback(null, false);
    };

    await expect(postCustomConsent({})).rejects.toBe(null);

    delete window.__tcfapi;
  });

  it('should resolve the command with the expected result', async () => {
    const result = {};

    window.__tcfapi = (_command: string, _version: number, callback: GenericCallback): void => {
      callback(result, true);
    };

    await expect(postCustomConsent({})).resolves.toBe(result);

    delete window.__tcfapi;
  });

  it('should reject if the __tcfapi function is not present', async () => {
    expect.assertions(1);

    await expect(postCustomConsent({})).rejects.toBe(undefined);
  });
});
