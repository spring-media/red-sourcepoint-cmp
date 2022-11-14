/**
 * @jest-environment node
 */

import { getTCData } from './get-tc-data';

describe('getTCData (node environment)', () => {
  it('should not throw an error, if window is not present', () => {
    const callback = (): void => undefined;

    expect(() => getTCData(callback)).not.toThrow();
  });
});
