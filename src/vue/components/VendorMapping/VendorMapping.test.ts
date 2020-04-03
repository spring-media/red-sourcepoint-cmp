import { mount } from '@vue/test-utils';
import { VendorMapping } from './';

describe('VendorMapping component', () => {
  it('should provide a default scoped slot', () => {
    const wrapper = mount(VendorMapping, {
      slots: {
        default: '<div>VendorMapping default slot</div>',
      },
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        VendorMapping default slot
      </div>
    `);
  });

  it('should render nothing if no content for the default slot is given', () => {
    const wrapper = mount(VendorMapping);

    expect(wrapper.isEmpty()).toBe(true);
  });

  it.each([
    ['getVendorIdByName'],
    ['getPurposeNameById'],
    ['getVendorNameById'],
    ['getPurposeIdByName'],
    ['getVendorPurposesById'],
    ['getVendorPurposesByName'],
  ])('should provide a %s function', (slotProp) => {
    mount(VendorMapping, {
      scopedSlots: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default(slotProps: any): any {
          expect(slotProps[slotProp]).toBeInstanceOf(Function);
        },
      },
    });
  });
});
