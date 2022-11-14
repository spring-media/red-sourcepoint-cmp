import { OptionalCallbackKeys, OptionalCallbacks, UnregisterCallback } from './typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any) => void;

const getEventStore = (): OptionalCallbacks | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!window._sp_?.config) {
    return null;
  }

  const events = window._sp_.config.events;

  if (!events) {
    window._sp_.config.events = {};
  }

  return window._sp_.config.events as OptionalCallbacks;
};

const bindCallbacksToEvent = (
  name: OptionalCallbackKeys,
  eventStore: OptionalCallbacks | null,
  callbacks: Set<Callback>,
): void => {
  if (eventStore === null) {
    return;
  }

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
