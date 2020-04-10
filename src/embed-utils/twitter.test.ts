import { mocked } from 'ts-jest/utils';
import { loadScript } from './script-loader';
import { processTwitterEmbedContent, TWITTER_WIDGETS_LIBRARY_URL } from './twitter';

jest.mock('./script-loader');

const loadScriptMock = mocked(loadScript);

describe('twitter utilities', () => {
  afterEach(() => {
    loadScriptMock.mockReset();
  });

  describe('processTwitterEmbedContent', () => {
    it('should invoke the load method of twttr.widgets object', () => {
      window.twttr = { widgets: { load: jest.fn() } };

      processTwitterEmbedContent('foo');

      expect(window.twttr.widgets.load).toHaveBeenCalled();

      delete window.twttr;
    });

    it('should invoke the load method of twttr.widgets object with given parameter', () => {
      window.twttr = { widgets: { load: jest.fn() } };

      const element = {} as HTMLElement;

      processTwitterEmbedContent('foo', element);

      expect(window.twttr.widgets.load).toHaveBeenCalledWith(element);

      delete window.twttr;
    });

    it('should load the library script provided by content parameter', async () => {
      loadScriptMock.mockImplementationOnce(() => {
        window.twttr = { widgets: { load: jest.fn() } };
        return Promise.resolve();
      });

      await processTwitterEmbedContent('<div>foo</div><script async src="https://domain.com/lib.js"');

      expect(loadScriptMock).toHaveBeenCalledWith('https://domain.com/lib.js');
      expect(window.twttr?.widgets.load).toHaveBeenCalled();

      delete window.twttr;
    });

    it('should load the default library script if no script is found in content parameter', async () => {
      loadScriptMock.mockImplementationOnce(() => {
        window.twttr = { widgets: { load: jest.fn() } };
        return Promise.resolve();
      });

      await processTwitterEmbedContent('<div>foo</div>');

      expect(loadScriptMock).toHaveBeenCalledWith(TWITTER_WIDGETS_LIBRARY_URL);
      expect(window.twttr?.widgets.load).toHaveBeenCalled();

      delete window.twttr;
    });
  });
});
