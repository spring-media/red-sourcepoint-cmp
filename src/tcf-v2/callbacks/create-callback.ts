import { EventConfigurationObject, OptionalCallback } from '../../types';

export const getEventStore = (): EventConfigurationObject => {
  const config = window?._sp_?.config;

  if (!config) {
    console.error('Sourcepoint config object not found. Callbacks will never be invoked');
    return {};
  }

  if (!config.events) {
    config.events = {};
  }

  return config.events;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bindCallbacksToEvent = <T extends any[]>(
  name: OptionalCallback,
  eventStore: EventConfigurationObject,
  callbacks: Set<Function>,
): void => {
  eventStore[name] = (...args: T): void => {
    for (const fn of callbacks) {
      fn(...args);
    }
  };
};

export const createCallback = (name: OptionalCallback): Function => {
  let isBound = false;
  const callbacks = new Set<Function>();

  return (fn: Function): Function => {
    if (!isBound) {
      bindCallbacksToEvent(name, getEventStore(), callbacks);

      isBound = true;
    }

    callbacks.add(fn);

    return (): boolean => callbacks.delete(fn);
  };
};
