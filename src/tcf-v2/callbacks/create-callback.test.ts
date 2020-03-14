import { createCallback } from './create-callback';
import { EventConfigurationObject } from '../../types';

type RequiredPrivacyManagerAction = { onPrivacyManagerAction: Function };

describe('createCallback', () => {
  it('should set given action name to the given event object', () => {
    const eventStore: EventConfigurationObject = {};

    createCallback('onPrivacyManagerAction', eventStore);

    expect(eventStore.onPrivacyManagerAction).toBeInstanceOf(Function);
  });

  it('should return a noop function if parameter eventStore is not set', () => {
    const spy = jest.spyOn(window.console, 'error').mockImplementation();
    const callback = createCallback('onPrivacyManagerAction');

    expect(callback()).toBeUndefined();
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should invoke the registered callback', () => {
    const eventStore: EventConfigurationObject & RequiredPrivacyManagerAction = { onPrivacyManagerAction: () => null };

    const callbackCollection = createCallback('onPrivacyManagerAction', eventStore);

    const callback = jest.fn();

    callbackCollection(callback);

    eventStore.onPrivacyManagerAction(true);

    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should return a deregister function for given callback', () => {
    const eventStore: EventConfigurationObject & RequiredPrivacyManagerAction = { onPrivacyManagerAction: () => null };

    const callbackCollection = createCallback('onPrivacyManagerAction', eventStore);

    const callback = jest.fn();

    const deregister = callbackCollection(callback);

    deregister();

    eventStore.onPrivacyManagerAction(true);

    expect(callback).not.toHaveBeenCalledWith();
  });
});
