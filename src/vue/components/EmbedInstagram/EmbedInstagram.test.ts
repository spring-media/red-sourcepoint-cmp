import { mount } from '@vue/test-utils';
import EmbedInstagram from './EmbedInstagram.vue';

describe('EmbedInstagram component', () => {
  it('should render given content', async () => {
    const wrapper = mount(EmbedInstagram, {
      propsData: {
        content: 'Instagram Embed Content',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        Instagram Embed Content
      </div>
    `);
  });
});
