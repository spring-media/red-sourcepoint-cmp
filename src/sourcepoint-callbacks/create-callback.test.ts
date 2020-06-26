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

    window._sp_?.config?.events?.onPrivacyManagerAction && window._sp_.config.events.onPrivacyManagerAction('action');

    expect(callback).toHaveBeenCalledWith('action');
  });

  it('should return a deregister function for given callback', () => {
    createConfig({ events: {} });

    const callbackCollection = createCallback('onPrivacyManagerAction');

    const callback = jest.fn();

    const deregister = callbackCollection(callback);

    deregister();

    window._sp_?.config?.events?.onPrivacyManagerAction && window._sp_.config.events.onPrivacyManagerAction('action');

    expect(callback).not.toHaveBeenCalledWith();
  });

  it('should not break if window._sp_ is not available', () => {
    expect(() => createCallback('onPrivacyManagerAction')(() => null)).not.toThrow();
  });

  it('should not break if window._sp_.config is not available', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window._sp_ = {
      loadPrivacyManagerModal() {
        return null;
      },
    };

    expect(() => createCallback('onPrivacyManagerAction')(() => null)).not.toThrow();
  });

  it('should not break if window._sp_.config.events is not available', () => {
    window._sp_ = {
      loadPrivacyManagerModal() {
        return null;
      },
      config: {},
    };
    expect(() => createCallback('onPrivacyManagerAction')(() => null)).not.toThrow();
  });

  it('should handle multiple registered callbacks', () => {
    window._sp_ = {
      loadPrivacyManagerModal() {
        return null;
      },
      config: { events: {} },
    };

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const onCallback = createCallback('onPrivacyManagerAction');
    onCallback(cb1);
    onCallback(cb2);

    window._sp_.config?.events?.onPrivacyManagerAction?.('action');

    expect(cb1).toHaveBeenCalled();
    expect(cb2).toHaveBeenCalled();
  });

  it('should create an event object if it is not present in the config', () => {
    window._sp_ = {
      loadPrivacyManagerModal() {
        return null;
      },
      config: {},
    };

    createCallback('onPrivacyManagerAction')(() => null);

    expect(window._sp_.config.events).toBeTruthy();
    expect(window._sp_.config.events?.onPrivacyManagerAction).toBeInstanceOf(Function);
  });
});
