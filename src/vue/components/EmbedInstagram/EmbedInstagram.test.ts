import { mount } from '@vue/test-utils';
import EmbedInstagram from './EmbedInstagram.vue';
import { processInstagramEmbedContent } from '../../../embed-utils';

jest.mock('../../../embed-utils');

describe('EmbedFacebook component', () => {
  it('should render given (html) content', async () => {
    (processInstagramEmbedContent as jest.Mock).mockReturnValueOnce(Promise.resolve());

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
