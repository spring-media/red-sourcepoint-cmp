import { mount } from '@vue/test-utils';
import EmbedInstagram from './EmbedInstagram.vue';

describe('EmbedInstagram component', () => {
  it('should render given (html) content', async () => {
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

  it('should not throw an error if it tries to access the instagram embed lib', () => {
    interface Combined extends Vue {
      scriptLoaded: () => void;
    }

    const wrapper = mount<Combined>(EmbedInstagram, {
      propsData: {
        content: '<div>some (html) content</div>',
      },
    });

    expect(() => wrapper.vm.scriptLoaded()).not.toThrow();
  });
});
