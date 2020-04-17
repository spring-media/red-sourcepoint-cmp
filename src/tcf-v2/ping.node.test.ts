/**
 * @jest-environment node
 */

import { ping } from './ping';

describe('ping (node environment)', () => {
  it('should not throw an error, if window is not present', () => {
    const callback = (): void => undefined;

    expect(() => ping(callback)).not.toThrow();
  });
});
