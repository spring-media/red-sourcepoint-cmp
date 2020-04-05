import { mocked } from 'ts-jest/utils';
import { loadScript } from './script-loader';
import { IFRAMELY_EMBEDS_LIBRARY_URL, loadIframelyEmbedsLibrary, processIframelyEmbeds } from './iframely';
import { Iframely } from './typings';

jest.mock('./script-loader');

const loadScriptMock = mocked(loadScript);

describe('iframely utilities', () => {
  afterEach(() => {
    loadScriptMock.mockReset();
  });

  describe('loadTwitterJsLibrary', () => {
    it('should invoke loadScript with given src parameter', () => {
      loadIframelyEmbedsLibrary('source');

      expect(loadScriptMock).toHaveBeenCalledWith('source');
    });

    it('should invoke loadScript with the default script', () => {
      loadIframelyEmbedsLibrary();

      expect(loadScriptMock).toHaveBeenCalledWith(IFRAMELY_EMBEDS_LIBRARY_URL);
    });

    it('should not invoke loadScript if only iframely object is present', () => {
      window.iframely = {} as Iframely;

      loadIframelyEmbedsLibrary();

      expect(loadScriptMock).not.toHaveBeenCalled();

      delete window.iframely;
    });
  });

  describe('processIframelyEmbeds', () => {
    it('should invoke the load method of the iframely object', () => {
      window.iframely = { load: jest.fn() };

      processIframelyEmbeds();

      expect(window.iframely.load).toHaveBeenCalled();

      delete window.iframely;
    });

    it('should invoke the load method of iframely.load object with given parameter', () => {
      window.iframely = { load: jest.fn() };

      const element = {} as HTMLElement;

      processIframelyEmbeds(element);

      expect(window.iframely.load).toHaveBeenCalledWith(element);

      delete window.iframely;
    });
  });
});
