import { removeEventListener } from './remove-event-listener';

describe('removeEventListener', () => {
  it('should call __tcfapi with the expected parameters', () => {
    window.__tcfapi = jest.fn();

    const callback = (): void => undefined;

    removeEventListener(callback, 1);

    expect(window.__tcfapi).toHaveBeenCalledWith('removeEventListener', 2, callback, 1);

    delete window.__tcfapi;
  });

  it('should not throw an error, if __tcfapi is not present', () => {
    const callback = (): void => undefined;

    expect(() => removeEventListener(callback, 1)).not.toThrow();
  });
});
