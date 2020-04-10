import { mount } from '@vue/test-utils';
import EmbedTwitter from './EmbedTwitter.vue';
import { processTwitterEmbedContent } from '../../../embed-utils';

jest.mock('../../../embed-utils');

describe('EmbedFacebook component', () => {
  it('should render given (html) content', async () => {
    (processTwitterEmbedContent as jest.Mock).mockReturnValueOnce(Promise.resolve());

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
