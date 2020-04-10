import { mount } from '@vue/test-utils';
import EmbedFacebook from './EmbedFacebook.vue';
import { processIframelyEmbedContent } from '../../../embed-utils';

jest.mock('../../../embed-utils');

describe('EmbedFacebook component', () => {
  it('should render given (html) content', async () => {
    (processIframelyEmbedContent as jest.Mock).mockReturnValueOnce(Promise.resolve());

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
