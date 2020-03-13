import { createCallback } from './create-callback';
import { onPrivacyManagerAction } from './on-privacy-manager-action';

jest.mock('./create-callback');

describe('onPrivacyManagerAction', () => {
  it('should call createCallback function with "onPrivacyManagerAction"', () => {
    onPrivacyManagerAction();

    expect(createCallback).toHaveBeenCalledWith('onPrivacyManagerAction');
  });
});
