import { createCallback } from './create-callback';
import { onPrivacyManagerAction } from './on-privacy-manager-action';

jest.mock('./create-callback', () => ({
  createCallback: jest.fn(() => '#createCallbackReturnValue'),
}));

describe('onPrivacyManagerAction', () => {
  it('should return the value of createCallback factory function', () => {
    expect(onPrivacyManagerAction).toBe('#createCallbackReturnValue');
  });

  it('createCallback should be called with "onPrivacyManagerAction"', () => {
    expect(createCallback).toHaveBeenCalledWith('onPrivacyManagerAction');
  });
});
