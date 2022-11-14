/**
 * @jest-environment node
 */

import { removeEventListener } from './remove-event-listener';

describe('removeEventListener (node environment)', () => {
  it('should not throw an error, if window is not present', () => {
    const callback = (): void => undefined;

    expect(() => removeEventListener(callback, 1)).not.toThrow();
  });
});
