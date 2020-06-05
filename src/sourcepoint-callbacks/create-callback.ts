import { OptionalCallbackKeys, OptionalCallbacks, UnregisterCallback } from './typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any) => void;

const getEventStore = (): OptionalCallbacks => {
  if (typeof window === 'undefined') {
    return {};
  }

  const config = window._sp_?.config;

  if (!config) {
    return {};
  }

  if (!config.events) {
    config.events = {};
  }

  return config.events;
};

const bindCallbacksToEvent = (
  name: OptionalCallbackKeys,
  eventStore: OptionalCallbacks,
  callbacks: Set<Callback>,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventStore[name] = (...args: any[]): void => {
    for (const fn of callbacks) {
      fn(...args);
    }
  };
};

export const createCallback = <T extends Callback>(name: OptionalCallbackKeys): ((fn: T) => UnregisterCallback) => {
  let isBound = false;
  const callbacks = new Set<Callback>();

  return (fn: T): UnregisterCallback => {
    if (!isBound) {
      bindCallbacksToEvent(name, getEventStore(), callbacks);

      isBound = true;
    }

    callbacks.add(fn);

    return (): boolean => callbacks.delete(fn);
  };
};
