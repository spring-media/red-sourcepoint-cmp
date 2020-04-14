import { mocked } from 'ts-jest/utils';
import { libraryIsAvailable, processEmbedContent, processEmbeds } from './iframely';
import { process } from './embeds';
import { Iframely } from './typings';

jest.mock('./embeds');

const processMock = mocked(process);

describe('iframely utilities', () => {
  afterEach(() => {
    processMock.mockReset();
    delete window.iframely;
  });

  describe('processEmbedContent', () => {
    it('should call the process function', () => {
      processEmbedContent('embed content');

      expect(processMock).toHaveBeenCalled();
    });
  });

  describe('libraryIsAvailable', () => {
    it('should return false', () => {
      expect(libraryIsAvailable()).toBe(false);
    });

    it('should return true', () => {
      window.iframely = {} as Iframely;

      expect(libraryIsAvailable()).toBe(true);
    });
  });

  describe('processEmbeds', () => {
    it('should not throw an error if iframely object not exists', () => {
      expect(() => processEmbeds()).not.toThrow();
    });

    it('should call load method of iframely object', () => {
      window.iframely = { load: jest.fn() };

      processEmbeds();

      expect(window.iframely.load).toHaveBeenCalled();
    });
  });
});
