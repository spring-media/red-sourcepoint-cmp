import { createCallback } from './create-callback';
import { onMessageChoiceError } from './on-message-choice-error';

jest.mock('./create-callback', () => ({
  createCallback: jest.fn(() => '#createCallbackReturnValue'),
}));

describe('onMessageChoiceError', () => {
  it('should return the value of createCallback factory function', () => {
    expect(onMessageChoiceError).toBe('#createCallbackReturnValue');
  });

  it('createCallback should be called with "onMessageChoiceSelect"', () => {
    expect(createCallback).toHaveBeenCalledWith('onMessageChoiceError');
  });
});
