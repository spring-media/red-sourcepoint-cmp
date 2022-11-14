/**
 *  @jest-environment node
 */

import { addEventListener } from './add-event-listener';

describe('addEventListener (node environment)', () => {
  it('should not throw an error, if window is not present', () => {
    const callback = (): void => undefined;

    expect(() => addEventListener(callback)).not.toThrow();
  });
});
