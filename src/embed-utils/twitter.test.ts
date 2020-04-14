import { mocked } from 'ts-jest/utils';
import { libraryIsAvailable, processEmbedContent, processEmbeds } from './twitter';
import { process } from './embeds';
import { Twitter } from './typings';

jest.mock('./embeds');

const processMock = mocked(process);

describe('twitter utilities', () => {
  afterEach(() => {
    processMock.mockReset();
    delete window.twttr;
  });

  describe('processEmbedContent', () => {
    it('should call the process function', () => {
      processEmbedContent('embed content');

      expect(processMock).toHaveBeenCalled();
    });
  });

  describe('libraryIsAvailable', () => {
    it('should return false if twttr object is not present', () => {
      expect(libraryIsAvailable()).toBe(false);
    });

    it('should return false if twttr.widgets object is not present', () => {
      window.twttr = {} as Twitter;

      expect(libraryIsAvailable()).toBe(false);
    });

    it('should return true', () => {
      window.twttr = { widgets: { load: jest.fn() } };

      expect(libraryIsAvailable()).toBe(true);
    });
  });

  describe('processEmbeds', () => {
    it('should not throw an error if twttr object not exists', () => {
      expect(() => processEmbeds()).not.toThrow();
    });

    it('should not throw an error if twttr.widgets object not exists', () => {
      window.twttr = {} as Twitter;

      expect(() => processEmbeds()).not.toThrow();
    });

    it('should call process method of Embeds object', () => {
      window.twttr = { widgets: { load: jest.fn() } };

      processEmbeds();

      expect(window.twttr.widgets.load).toHaveBeenCalled();
    });
  });
});
