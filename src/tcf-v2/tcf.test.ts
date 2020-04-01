import { executeMethod } from './tcf';

describe('executeMethod', () => {
  it('should call the global __tcfapi function with the expected parameters', async () => {
    window.__tcfapi = jest.fn().mockImplementationOnce((_action, _vendors, resolver) => {
      resolver(true);
    });

    const vendors = ['1', '2', '3'];

    await executeMethod('getCustomVendorConsents', vendors);

    expect(window.__tcfapi).toHaveBeenCalledWith('getCustomVendorConsents', 2, expect.any(Function), vendors);

    delete window.__tcfapi;
  });

  it('should catch any errors', async () => {
    const spy = jest.spyOn(window.console, 'error').mockImplementation();
    const catcher = jest.fn();
    window.__tcfapi = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    await executeMethod('getCustomVendorConsents').catch(catcher);

    expect(spy).toHaveBeenCalled();
    expect(catcher).toHaveBeenCalled();

    spy.mockRestore();

    delete window.__tcfapi;
  });
});
