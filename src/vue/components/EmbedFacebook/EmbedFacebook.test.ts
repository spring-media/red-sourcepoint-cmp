import { mount } from '@vue/test-utils';
import EmbedFacebook from './EmbedFacebook.vue';
import { processEmbedContent } from '../../../embed-utils/iframely';

jest.mock('../../../embed-utils/iframely');

describe('EmbedFacebook component', () => {
  it('should render given (html) content', async () => {
    (processEmbedContent as jest.Mock).mockReturnValueOnce(Promise.resolve());

    const wrapper = mount(EmbedFacebook, {
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
