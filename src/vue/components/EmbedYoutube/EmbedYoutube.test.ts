import { mount } from '@vue/test-utils';
import EmbedYoutube from './EmbedYoutube.vue';

describe('EmbedFacebook component', () => {
  it('should render given (html) content', () => {
    const wrapper = mount(EmbedYoutube, {
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
});
