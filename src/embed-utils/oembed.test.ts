import { getScriptSrcFromOembedHTML } from './oembed';

describe('oembed utilities', () => {
  describe('getScriptSrcFromOembedHTML', () => {
    it.each([
      ['script.js', '<script async src="script.js"></script>', 'fallback'],
      ['script.js', '<script async src="script.js"/>', 'fallback'],
      ['script.js', '<script async src=" script.js "></script>', 'fallback'],
      ['script.js', '<script async src= " script.js "></script>', 'fallback'],
      ['script.js', `<script async src='script.js'></script>`, 'fallback'],
      ['fallback', `<scrip async src='script.js'></scrip>`, 'fallback'],
      ['fallback', '<script src="script.js"></script>', 'fallback'],
      ['fallback', '', 'fallback'],
    ])('should return %s for input: %s', (expected, input, fallback) => {
      expect(getScriptSrcFromOembedHTML(input, fallback)).toBe(expected);
    });
  });
});
