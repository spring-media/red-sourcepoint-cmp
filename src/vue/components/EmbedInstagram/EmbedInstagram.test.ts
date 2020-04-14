import { mount } from '@vue/test-utils';
import EmbedInstagram from './EmbedInstagram.vue';
import { processEmbedContent } from '../../../embed-utils/instagram';

jest.mock('../../../embed-utils/instagram');

describe('EmbedInstagram component', () => {
  it('should render given (html) content', async () => {
    (processEmbedContent as jest.Mock).mockReturnValueOnce(Promise.resolve());

    const wrapper = mount(EmbedInstagram, {
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
