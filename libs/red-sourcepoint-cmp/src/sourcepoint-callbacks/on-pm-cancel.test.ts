import { createCallback } from './create-callback';
import { onPMCancel } from './on-pm-cancel';

jest.mock('./create-callback', () => ({
  createCallback: jest.fn(() => '#createCallbackReturnValue'),
}));

describe('onPMCancel', () => {
  it('should return the value of createCallback factory function', () => {
    expect(onPMCancel).toBe('#createCallbackReturnValue');
  });

  it('createCallback should be called with "onMessageReady"', () => {
    expect(createCallback).toHaveBeenCalledWith('onPMCancel');
  });
});
