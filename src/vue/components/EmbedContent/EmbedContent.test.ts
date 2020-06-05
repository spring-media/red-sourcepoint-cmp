import { mount } from '@vue/test-utils';
import EmbedContent from './EmbedContent.vue';
import { loadScript, getScriptSrcFromOembedHTML } from '../../../embed-utils';
import { mocked } from 'ts-jest';

jest.mock('../../../embed-utils');

const loadScriptMock = mocked(loadScript);
const getScript = mocked(getScriptSrcFromOembedHTML);

describe('EmbedContent component', () => {
  afterEach(() => {
    loadScriptMock.mockReset();
    getScript.mockReset();
  });

  it('should render given (html) content', () => {
    const wrapper = mount(EmbedContent, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          some (html) content
        </div>
      </div>
    `);
  });

  it('should emit an event if a detected script has loaded successfully', async () => {
    loadScriptMock.mockImplementation(() => Promise.resolve());
    getScript.mockReturnValue('https://script.com/source.js');

    const wrapper = mount(EmbedContent, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('scriptLoaded')).toEqual([[{ src: 'https://script.com/source.js', success: true }]]);
  });

  it('should emit an event if a detected script has not loaded successfully', async () => {
    loadScriptMock.mockImplementation(() => Promise.reject('error'));
    getScript.mockReturnValue('https://script.com/source.js');

    const wrapper = mount(EmbedContent, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('scriptLoaded')).toEqual([
      [{ error: 'error', src: 'https://script.com/source.js', success: false }],
    ]);
  });
});
