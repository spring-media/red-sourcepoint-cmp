import { mount } from '@vue/test-utils';
import EmbedTwitter from './EmbedTwitter.vue';
import { processEmbedContent } from '../../../embed-utils/twitter';

jest.mock('../../../embed-utils/twitter');

describe('EmbedTwitter component', () => {
  it('should render given (html) content', async () => {
    (processEmbedContent as jest.Mock).mockReturnValueOnce(Promise.resolve());

    const wrapper = mount(EmbedTwitter, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          some (html) content
        </div>
      </div>
    `);
  });
});
