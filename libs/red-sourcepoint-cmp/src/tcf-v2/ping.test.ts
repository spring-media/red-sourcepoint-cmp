import { ping } from './ping';

describe('ping', () => {
  it('should call __tcfapi with the expected parameters', () => {
    window.__tcfapi = jest.fn();

    const callback = (): void => undefined;

    ping(callback);

    expect(window.__tcfapi).toHaveBeenCalledWith('ping', 2, callback);

    delete window.__tcfapi;
  });

  it('should not throw an error, if __tcfapi is not present', () => {
    const callback = (): void => undefined;

    expect(() => ping(callback)).not.toThrow();
  });
});
