import { EventConfigurationObject, OptionalCallback } from '../../types';

const noop = (): void => undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCallback = <T extends any[]>(
  name: OptionalCallback,
  eventStore?: EventConfigurationObject,
): Function => {
  if (!eventStore) {
    console.error(`Can not create callback for ${name}. Parameter eventStore is not valid.`);
    return noop;
  }

  const callbacks = new Set<Function>();

  eventStore[name] = (...args: T): void => {
    for (const fn of callbacks) {
      fn(...args);
    }
  };

  return (fn: Function): Function => {
    callbacks.add(fn);

    return (): boolean => callbacks.delete(fn);
  };
};
