import { mocked } from 'ts-jest/utils';
import { loadScript } from './script-loader';
import { TWITTER_WIDGETS_LIBRARY_URL, loadTwitterJsLibrary, processTwitterEmbeds } from './twitter';
import { Twitter } from './typings';

jest.mock('./script-loader');

const loadScriptMock = mocked(loadScript);

describe('twitter utilities', () => {
  afterEach(() => {
    loadScriptMock.mockReset();
    loadScriptMock.mockReset();
  });

  describe('loadTwitterJsLibrary', () => {
    it('should invoke loadScript with given src parameter', () => {
      loadTwitterJsLibrary('source');

      expect(loadScriptMock).toHaveBeenCalledWith('source');
    });

    it('should invoke loadScript with the default script', () => {
      loadTwitterJsLibrary();

      expect(loadScriptMock).toHaveBeenCalledWith(TWITTER_WIDGETS_LIBRARY_URL);
    });

    it('should invoke loadScript if only twttr object is present', () => {
      window.twttr = {} as Twitter;

      loadTwitterJsLibrary();

      expect(loadScriptMock).toHaveBeenCalled();
    });

    it('should not invoke loadScript if twttr.widgets object is not present', () => {
      window.twttr = { widgets: {} } as Twitter;

      loadTwitterJsLibrary();

      expect(loadScriptMock).not.toHaveBeenCalled();

      delete window.twttr;
    });
  });

  describe('processTwitterEmbeds', () => {
    it('should invoke the load method of twttr.widgets object', () => {
      window.twttr = { widgets: { load: jest.fn() } };

      processTwitterEmbeds();

      expect(window.twttr.widgets.load).toHaveBeenCalled();

      delete window.twttr;
    });

    it('should invoke the load method of twttr.widgets object with given parameter', () => {
      window.twttr = { widgets: { load: jest.fn() } };

      const element = {} as HTMLElement;

      processTwitterEmbeds(element);

      expect(window.twttr.widgets.load).toHaveBeenCalledWith(element);

      delete window.twttr;
    });
  });
});
