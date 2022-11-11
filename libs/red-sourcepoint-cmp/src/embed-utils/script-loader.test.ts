import { loadScript } from './script-loader';

describe('script-loader utilities', () => {
  describe('loadScript', () => {
    it('should add a script-element to the dom', () => {
      const script = 'https://some-domain/some-script.js';

      loadScript(script);

      expect(document.querySelector(`script[src="${script}"]`)).toBeInstanceOf(HTMLScriptElement);
    });

    it('should load the script asynchronously', () => {
      const script = 'https://some-domain/some-script.js';

      loadScript(script);

      const element = document.querySelector(`script[src="${script}"]`) as HTMLScriptElement;

      expect(element && element.async).toBe(true);
    });

    it('should have an onload handler registered', async () => {
      const script = 'https://some-domain/some-script.js';

      const element = document.querySelector(`script[src="${script}"]`) as HTMLScriptElement;

      expect(element.onload).toBeInstanceOf(Function);
    });

    it('should have an onerror handler registered', async () => {
      const script = 'https://some-domain/some-script.js';

      const element = document.querySelector(`script[src="${script}"]`) as HTMLScriptElement;

      expect(element.onerror).toBeInstanceOf(Function);
    });
  });
});
