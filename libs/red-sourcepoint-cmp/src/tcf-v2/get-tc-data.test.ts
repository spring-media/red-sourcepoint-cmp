import { getTCData } from './get-tc-data';

describe('getTCData', () => {
  it('should call __tcfapi with the expected parameters (include vendor ids)', () => {
    window.__tcfapi = jest.fn();

    const callback = (): void => undefined;

    getTCData(callback, [1]);

    expect(window.__tcfapi).toHaveBeenCalledWith('getTCData', 2, callback, [1]);

    delete window.__tcfapi;
  });

  it('should call __tcfapi with the expected parameters (omit vendor ids)', () => {
    window.__tcfapi = jest.fn();

    const callback = (): void => undefined;

    getTCData(callback);

    expect(window.__tcfapi).toHaveBeenCalledWith('getTCData', 2, callback, undefined);

    delete window.__tcfapi;
  });

  it('should not throw an error, if __tcfapi is not present', () => {
    const callback = (): void => undefined;

    expect(() => getTCData(callback)).not.toThrow();
  });
});
