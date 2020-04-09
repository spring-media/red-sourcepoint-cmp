import { OptionalCallbackKeys, OptionalCallbacks, UnregisterCallback } from './typings';

export const getEventStore = (): OptionalCallbacks => {
  if (typeof window === 'undefined') {
    return {};
  }

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

export const bindCallbacksToEvent = (
  name: OptionalCallbackKeys,
  eventStore: OptionalCallbacks,
  callbacks: Set<Function>,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventStore[name] = (...args: any[]): void => {
    for (const fn of callbacks) {
      fn(...args);
    }
  };
};

export const createCallback = <T extends Function>(name: OptionalCallbackKeys): ((fn: T) => UnregisterCallback) => {
  let isBound = false;
  const callbacks = new Set<Function>();

  return (fn: T): UnregisterCallback => {
    if (!isBound) {
      bindCallbacksToEvent(name, getEventStore(), callbacks);

      isBound = true;
    }

    callbacks.add(fn);

    return (): boolean => callbacks.delete(fn);
  };
};
