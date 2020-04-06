import { addEventListener } from './add-event-listener';

describe('addEventListener', () => {
  it('should call __tcfapi with the expected parameters', () => {
    window.__tcfapi = jest.fn();

    const callback = (): void => undefined;

    addEventListener(callback);

    expect(window.__tcfapi).toHaveBeenCalledWith('addEventListener', 2, callback);

    delete window.__tcfapi;
  });

  it('should not throw an error, if __tcfapi is not present', () => {
    const callback = (): void => undefined;

    expect(() => addEventListener(callback)).not.toThrow();
  });
});
