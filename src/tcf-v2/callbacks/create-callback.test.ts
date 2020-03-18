import { createCallback } from './create-callback';

const createConfig = (config = {}): void => {
  window._sp_ = {
    loadPrivacyManagerModal(): void {
      return;
    },
    config: {
      ...config,
      mmsDomain: '',
      accountId: 1,
      propertyId: 2,
      wrapperAPIOrigin: '',
    },
  };
};

describe('createCallback', () => {
  afterEach(() => {
    delete window._sp_;
  });

  it('should set given action name to the given event object', () => {
    createConfig({ events: {} });

    createCallback('onPrivacyManagerAction')(() => {
      return;
    });

    expect(window._sp_.config?.events?.onPrivacyManagerAction).toBeInstanceOf(Function);
  });

  it('should invoke the registered callback', () => {
    createConfig({ events: {} });

    const callbackCollection = createCallback('onPrivacyManagerAction');

    const callback = jest.fn();

    callbackCollection(callback);

    window._sp_?.config?.events?.onPrivacyManagerAction && window._sp_.config.events.onPrivacyManagerAction(true);

    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should return a deregister function for given callback', () => {
    createConfig({ events: {} });

    const callbackCollection = createCallback('onPrivacyManagerAction');

    const callback = jest.fn();

    const deregister = callbackCollection(callback);

    deregister();

    window._sp_?.config?.events?.onPrivacyManagerAction && window._sp_.config.events.onPrivacyManagerAction(true);

    expect(callback).not.toHaveBeenCalledWith();
  });
});
