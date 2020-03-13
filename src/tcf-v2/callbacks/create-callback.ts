import { OptionalCallback } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCallback = <T extends any[]>(name: OptionalCallback): Function => {
  const callbacks = new Set<Function>();

  if (!window._sp_.config.events) {
    window._sp_.config.events = {};
  }

  window._sp_.config.events[name] = (...args: T): void => {
    for (const fn of callbacks) {
      fn(...args);
    }
  };

  return (fn: Function): Function => {
    callbacks.add(fn);

    return (): boolean => callbacks.delete(fn);
  };
};
