import { mocked } from 'ts-jest/utils';
import { libraryIsAvailable, processEmbedContent, processEmbeds } from './instagram';
import { process } from './embeds';
import { Instagram } from './typings';

jest.mock('./embeds');

const processMock = mocked(process);

describe('instagram utilities', () => {
  afterEach(() => {
    processMock.mockReset();
    delete window.instgrm;
  });

  describe('processEmbedContent', () => {
    it('should call the process function', () => {
      processEmbedContent('embed content');

      expect(processMock).toHaveBeenCalled();
    });
  });

  describe('libraryIsAvailable', () => {
    it('should return false if instgrm object is not present', () => {
      expect(libraryIsAvailable()).toBe(false);
    });

    it('should return false if instgrm.Embeds object is not present', () => {
      window.instgrm = {} as Instagram;

      expect(libraryIsAvailable()).toBe(false);
    });

    it('should return true', () => {
      window.instgrm = { Embeds: { process: jest.fn() } };

      expect(libraryIsAvailable()).toBe(true);
    });
  });

  describe('processEmbeds', () => {
    it('should not throw an error if instgrm object not exists', () => {
      expect(() => processEmbeds()).not.toThrow();
    });

    it('should not throw an error if instgrm.Embeds object not exists', () => {
      window.instgrm = {} as Instagram;

      expect(() => processEmbeds()).not.toThrow();
    });

    it('should call process method of Embeds object', () => {
      window.instgrm = { Embeds: { process: jest.fn() } };

      processEmbeds();

      expect(window.instgrm.Embeds.process).toHaveBeenCalled();
    });
  });
});
