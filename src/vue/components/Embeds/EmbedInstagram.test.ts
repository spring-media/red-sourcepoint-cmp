import { mount } from '@vue/test-utils';
import { mocked } from 'ts-jest/utils';
import flushPromises from 'flush-promises';
import { EmbedInstagram } from './';
import { requestInstagramOEmbedData, processInstagramEmbeds, loadInstagramJsLibrary } from '../../../embed-utils';
import { InstagramOEmbedResponse } from '../../../types';

jest.mock('../../../embed-utils/index.ts');

const mockedRequestInstagramOEmbedData = mocked(requestInstagramOEmbedData);
const mockedProcessInstagramEmbeds = mocked(processInstagramEmbeds);
const mockedLoadInstagramJsLibrary = mocked(loadInstagramJsLibrary);

describe('EmbedInstagram component', () => {
  afterEach(() => {
    mockedRequestInstagramOEmbedData.mockReset();
    mockedProcessInstagramEmbeds.mockReset();
    mockedLoadInstagramJsLibrary.mockReset();
  });

  it('should request embed data from instagram and render the result', async () => {
    mockedLoadInstagramJsLibrary.mockReturnValueOnce(Promise.resolve());
    mockedRequestInstagramOEmbedData.mockReturnValueOnce(
      Promise.resolve({ html: '<div>Instagram Embed</div>' } as InstagramOEmbedResponse),
    );

    const wrapper = mount(EmbedInstagram, {
      propsData: {
        url: 'https://instagram.com/p/some-post-id',
      },
    });

    await flushPromises();

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Instagram Embed
        </div>
      </div>
    `);
    expect(mockedProcessInstagramEmbeds).toHaveBeenCalled();
  });

  it('should use the content prop as placeholder markup', async () => {
    mockedLoadInstagramJsLibrary.mockReturnValueOnce(Promise.resolve());

    const wrapper = mount(EmbedInstagram, {
      propsData: {
        content: '<div>Content</div>',
      },
    });

    await flushPromises();

    expect(mockedRequestInstagramOEmbedData).not.toHaveBeenCalled();
    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Content
        </div>
      </div>
    `);
  });

  it('should check if the data from Instagram is at least truthy', async () => {
    mockedLoadInstagramJsLibrary.mockReturnValueOnce(Promise.resolve());
    mockedRequestInstagramOEmbedData.mockReturnValueOnce(Promise.resolve(undefined));

    const wrapper = mount(EmbedInstagram, {
      propsData: {
        url: 'https://instagram.com/p/some-post-id',
      },
    });

    await flushPromises();

    expect(wrapper.element).toMatchInlineSnapshot(`<div />`);
    expect(mockedProcessInstagramEmbeds).not.toHaveBeenCalled();
  });
});
