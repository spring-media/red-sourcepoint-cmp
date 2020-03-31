import { mount } from '@vue/test-utils';
import { PrivacyManager } from './';

describe('PrivacyManager component', () => {
  it('should provide a default scoped slot', () => {
    const wrapper = mount(PrivacyManager, {
      slots: {
        default: '<div>Privacy Manager default slot</div>',
      },
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        Privacy Manager default slot
      </div>
    `);
  });

  it('should render nothing if no content for the default slot is given', () => {
    const wrapper = mount(PrivacyManager);

    expect(wrapper.isEmpty()).toBe(true);
  });

  it('should provide a loadPrivacyManagerModal function through default slot', () => {
    mount(PrivacyManager, {
      scopedSlots: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default({ loadPrivacyManagerModal }: { loadPrivacyManagerModal: Function }): any {
          expect(loadPrivacyManagerModal).toBeInstanceOf(Function);
        },
      },
    });
  });
});
