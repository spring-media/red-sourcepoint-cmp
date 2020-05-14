import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { postCustomConsent } from '../../../sourcepoint';
import { ConsentActions } from './';

jest.mock('../../../sourcepoint');

describe('ConsentActions component', () => {
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

  describe('slot function consentCustomPurpose', () => {
    it('should handle an error case as expected', () => {
      expect.assertions(2);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (postCustomConsent as jest.Mock).mockImplementationOnce(() => Promise.reject(null));

      mount(ConsentActions, {
        scopedSlots: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async default({ consentCustomPurpose }: { consentCustomPurpose: (id: string) => void }): Promise<void> {
            await consentCustomPurpose('1234');

            expect(postCustomConsent).toHaveBeenCalledWith({ purposeIds: ['1234'] });
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
          },
        },
      });
    });

    it('should dispatch an (vuex) action to update the consents in the store', () => {
      expect.assertions(3);

      const localVue = createLocalVue();
      localVue.use(Vuex);

      const bootstrapSpy = jest.fn();
      const store = new Vuex.Store({
        modules: {
          sourcepoint: {
            namespaced: true,
            actions: {
              bootstrapConsents: bootstrapSpy,
            },
          },
        },
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (postCustomConsent as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      mount(ConsentActions, {
        scopedSlots: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async default({ consentCustomPurpose }: { consentCustomPurpose: (id: string) => void }): Promise<void> {
            await consentCustomPurpose('1234');

            expect(postCustomConsent).toHaveBeenCalledWith({ purposeIds: ['1234'] });
            expect(consoleSpy).not.toHaveBeenCalled();
            expect(bootstrapSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
          },
        },
        localVue,
        store,
      });
    });
  });
});
