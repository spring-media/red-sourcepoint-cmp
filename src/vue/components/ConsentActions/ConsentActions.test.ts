import { mount } from '@vue/test-utils';
import { postCustomConsent } from '../../../sourcepoint';
import { ConsentActions } from './';
import { PostCustomConsentPayload } from '../../../sourcepoint/typings';

jest.mock('../../../sourcepoint');

describe('ConsentActions component', () => {
  afterEach(() => {
    (postCustomConsent as jest.Mock).mockReset();
  });

  it('should provide a default scoped slot', () => {
    const wrapper = mount(ConsentActions, {
      slots: {
        default: '<div>default slot</div>',
      },
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        default slot
      </div>
    `);
  });

  it('should not break if no slot is used', () => {
    expect(mount(ConsentActions).element).toMatchInlineSnapshot(`<!---->`);
  });

  it.each([['consentPurpose'], ['consentVendor'], ['customConsent']])(
    'should provide scoped-slot function "%s"',
    (name) => {
      mount(ConsentActions, {
        scopedSlots: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          default(props: any): any {
            expect(props[name]).toBeInstanceOf(Function);
          },
        },
      });
    },
  );

  it('scoped-slot function consentPurpose should handling consents for given purpose', () => {
    expect.assertions(1);

    mount(ConsentActions, {
      scopedSlots: {
        default({ consentPurpose }: { consentPurpose: (id: string) => void }): void {
          consentPurpose('1');

          expect(postCustomConsent).toHaveBeenCalled();
        },
      },
    });
  });

  it('scoped-slot function consentVendor should handling consents for given vendor', () => {
    expect.assertions(1);

    mount(ConsentActions, {
      scopedSlots: {
        default({ consentVendor }: { consentVendor: (id: string) => void }): void {
          consentVendor('5');

          expect(postCustomConsent).toHaveBeenCalledWith({ vendorIds: ['5'], purposeIds: [] });
        },
      },
    });
  });

  it('scoped-slot function customConsent should handling consents for given parameters', () => {
    expect.assertions(1);

    mount(ConsentActions, {
      scopedSlots: {
        default({ customConsent }: { customConsent: (payload: PostCustomConsentPayload) => void }): void {
          customConsent({ vendorIds: ['1'], purposeIds: ['2'] });

          expect(postCustomConsent).toHaveBeenCalledWith({ vendorIds: ['1'], purposeIds: ['2'] });
        },
      },
    });
  });

  it('should log an error message in the console', async () => {
    expect.assertions(1);

    (postCustomConsent as jest.Mock).mockImplementationOnce(() => Promise.reject({ message: 'Error' }));
    jest.spyOn(window.console, 'error').mockImplementation(() => null);

    const wrapper = mount(ConsentActions, {
      scopedSlots: {
        async default({
          customConsent,
        }: {
          customConsent: (payload: PostCustomConsentPayload) => void;
        }): Promise<void> {
          await customConsent({ vendorIds: ['1'], purposeIds: ['2'] });
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(console.error).toHaveBeenCalledWith('Error');
  });
});
