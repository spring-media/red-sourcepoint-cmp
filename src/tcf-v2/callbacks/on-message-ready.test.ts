import { createCallback } from './create-callback';
import { onMessageReady } from './on-message-ready';

jest.mock('./create-callback', () => ({
  createCallback: jest.fn(() => '#createCallbackReturnValue'),
}));

describe('onMessageReady', () => {
  it('should return the value of createCallback factory function', () => {
    expect(onMessageReady).toBe('#createCallbackReturnValue');
  });

  it('createCallback should be called with "onMessageReady"', () => {
    expect(createCallback).toHaveBeenCalledWith('onMessageReady', undefined);
  });
});
