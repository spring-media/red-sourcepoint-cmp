import { mocked } from 'ts-jest/utils';
import { loadScript } from './script-loader';
import { processInstagramEmbedContent } from './instagram';

jest.mock('./script-loader');

const loadScriptMock = mocked(loadScript);

describe('instagram utilities', () => {
  afterEach(() => {
    loadScriptMock.mockReset();
    loadScriptMock.mockReset();
  });

  describe('processInstagramEmbeds', () => {
    it('should invoke the process method of instgrm.Embeds object', () => {
      window.instgrm = { Embeds: { process: jest.fn() } };

      processInstagramEmbedContent('foo');

      expect(window.instgrm.Embeds.process).toHaveBeenCalled();

      delete window.instgrm;
    });
  });
});
