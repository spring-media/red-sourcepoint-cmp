import { createCallback } from './create-callback';
import { onMessageChoiceSelect } from './on-message-choice-select';

jest.mock('./create-callback', () => ({
  createCallback: jest.fn(() => '#createCallbackReturnValue'),
}));

describe('onMessageChoiceSelect', () => {
  it('should return the value of createCallback factory function', () => {
    expect(onMessageChoiceSelect).toBe('#createCallbackReturnValue');
  });

  it('createCallback should be called with "onMessageChoiceSelect"', () => {
    expect(createCallback).toHaveBeenCalledWith('onMessageChoiceSelect');
  });
});
