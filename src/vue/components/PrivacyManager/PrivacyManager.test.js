import { mount } from '@vue/test-utils';
import { PrivacyManager } from './index';

describe('PrivacyManager component', () => {
  it('should provide a default scoped slot', () => {
    const wrapper = mount(PrivacyManager, {
      slots: {
        default: '<div>Privacy Manager default slot</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
