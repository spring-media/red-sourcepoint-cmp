import { loadPrivacyManagerModal } from './privacy-manager';

describe('loadPrivacyManagerModal', () => {
  it('should open a modal for given managerId', () => {
    window._sp_ = window._sp_ || {
      loadPrivacyManagerModal: jest.fn(),
    };

    loadPrivacyManagerModal('#1234');

    expect(window._sp_.loadPrivacyManagerModal).toHaveBeenCalledWith('#1234');

    delete window._sp_;
  });

  it('should catch any errors when calling the function', () => {
    const spy = jest.spyOn(window.console, 'error').mockImplementation();

    loadPrivacyManagerModal('#1234');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
