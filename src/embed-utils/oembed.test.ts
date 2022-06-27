import { getScriptSrcFromOembedHTML } from './oembed';

describe('oembed utilities', () => {
  describe('getScriptSrcFromOembedHTML', () => {
    it.each([
      ['script.js', '<script async src="script.js"></script>'],
      ['script.js', '<script src="script.js"/>'],
      ['script.js', '<script async src=" script.js "></script>'],
      ['script.js', '<script async src= " script.js "></script>'],
      ['script.js', `<script async src='script.js'></script>`],
      ['script.js', '<script class="someClassName" data-configuration="someConfiguration" src="script.js"/>'],
      [null, `<scrip async src='script.js'></scrip>`],
      [null, ''],
    ])('should return %s for input: %s', (expected, input) => {
      expect(getScriptSrcFromOembedHTML(input)).toBe(expected);
    });
  });
});
