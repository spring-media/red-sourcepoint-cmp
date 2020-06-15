/**
 * @jest-environment node
 */

import { createCallback } from './create-callback';

describe('createCallback', () => {
  it('should not break in a node environment', () => {
    expect(() => createCallback('onPMCancel')(() => null)).not.toThrow();
  });
});
