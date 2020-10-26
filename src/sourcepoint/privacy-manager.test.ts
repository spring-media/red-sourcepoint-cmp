import { loadPrivacyManagerModal } from './privacy-manager';

describe('loadPrivacyManagerModal', () => {
  it('should open a modal for given managerId', () => {
    window._sp_ = {
      loadPrivacyManagerModal: jest.fn(),
    };

    loadPrivacyManagerModal(1234);

    expect(window._sp_.loadPrivacyManagerModal).toHaveBeenCalledWith(1234);

    delete window._sp_;
  });

  it('should catch any errors when calling the function', () => {
    window._sp_ = {
      loadPrivacyManagerModal() {
        throw new Error('PM Error');
      },
    };

    const spy = jest.spyOn(window.console, 'error').mockImplementation();

    loadPrivacyManagerModal(1234);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should not break if window._sp_ is not available', () => {
    window._sp_ = undefined;

    const spy = jest.spyOn(window.console, 'error').mockImplementation();

    loadPrivacyManagerModal(1234);

    expect(spy).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});
