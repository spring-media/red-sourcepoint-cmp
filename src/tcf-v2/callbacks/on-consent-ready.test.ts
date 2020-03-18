import { createCallback } from './create-callback';
import { onConsentReady } from './on-consent-ready';

jest.mock('./create-callback', () => ({
  createCallback: jest.fn(() => '#createCallbackReturnValue'),
}));

describe('onConsentReady', () => {
  it('should return the value of createCallback factory function', () => {
    expect(onConsentReady).toBe('#createCallbackReturnValue');
  });

  it('createCallback should be called with "onConsentReady"', () => {
    expect(createCallback).toHaveBeenCalledWith('onConsentReady');
  });
});
