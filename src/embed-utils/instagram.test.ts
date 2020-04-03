import { mocked } from 'ts-jest/utils';
import { loadScript } from './script-loader';
import { INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL, loadInstagramJsLibrary, processInstagramEmbeds } from './instagram';
import { Instagram } from './typings';

jest.mock('./script-loader');

const loadScriptMock = mocked(loadScript);

describe('instagram utilities', () => {
  afterEach(() => {
    loadScriptMock.mockReset();
    loadScriptMock.mockReset();
  });

  describe('loadInstagramJsLibrary', () => {
    it('should invoke loadScript with given src parameter', () => {
      loadInstagramJsLibrary('source');

      expect(loadScriptMock).toHaveBeenCalledWith('source');
    });

    it('should invoke loadScript with the default script', () => {
      loadInstagramJsLibrary();

      expect(loadScriptMock).toHaveBeenCalledWith(INSTAGRAM_JAVASCRIPT_EMBEDS_LIBRARY_URL);
    });

    it('should invoke loadScript if only instgrm object is present', () => {
      window.instgrm = {} as Instagram;

      loadInstagramJsLibrary();

      expect(loadScriptMock).toHaveBeenCalled();
    });

    it('should not invoke loadScript if instgrm.Embed object is not present', () => {
      window.instgrm = { Embeds: {} } as Instagram;

      loadInstagramJsLibrary();

      expect(loadScriptMock).not.toHaveBeenCalled();

      delete window.instgrm;
    });
  });

  describe('processInstagramEmbeds', () => {
    it('should invoke the process method of instgrm.Embeds object', () => {
      window.instgrm = { Embeds: { process: jest.fn() } };

      processInstagramEmbeds();

      expect(window.instgrm.Embeds.process).toHaveBeenCalled();

      delete window.instgrm;
    });
  });
});
