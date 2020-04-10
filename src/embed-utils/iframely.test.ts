import { mocked } from 'ts-jest/utils';
import { loadScript } from './script-loader';
import { IFRAMELY_EMBEDS_LIBRARY_URL, processIframelyEmbedContent } from './iframely';
import { Iframely } from './typings';

jest.mock('./script-loader');

const loadScriptMock = mocked(loadScript);

describe('iframely utilities', () => {
  afterEach(() => {
    loadScriptMock.mockReset();
  });

  describe('processIframelyEmbedContent', () => {
    it('should invoke the load method of the iframely object', () => {
      window.iframely = { load: jest.fn() };

      processIframelyEmbedContent('foo');

      expect(window.iframely.load).toHaveBeenCalled();
      expect(loadScriptMock).not.toHaveBeenCalled();

      delete window.iframely;
    });

    it('should load the library script if iframely object is not valid', () => {
      window.iframely = {} as Iframely;

      processIframelyEmbedContent('foo');

      expect(loadScriptMock).toHaveBeenCalled();

      delete window.iframely;
    });

    it('should load the library script provided by content parameter', async () => {
      loadScriptMock.mockImplementationOnce(() => {
        window.iframely = { load: jest.fn() };
        return Promise.resolve();
      });

      await processIframelyEmbedContent('<div>foo</div><script async src="https://domain.com/lib.js"');

      expect(loadScriptMock).toHaveBeenCalledWith('https://domain.com/lib.js');
      expect(window?.iframely?.load).toHaveBeenCalled();

      delete window.iframely;
    });

    it('should load the default library script if no script is found in content parameter', async () => {
      loadScriptMock.mockImplementationOnce(() => {
        window.iframely = { load: jest.fn() };
        return Promise.resolve();
      });

      await processIframelyEmbedContent('<div>foo</div>');

      expect(loadScriptMock).toHaveBeenCalledWith(IFRAMELY_EMBEDS_LIBRARY_URL);
      expect(window?.iframely?.load).toHaveBeenCalled();

      delete window.iframely;
    });
  });
});
