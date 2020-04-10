import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ConsentedData from './ConsentedData.vue';
import { sourcepoint } from '../../vuex/sourcepoint';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('ConsentedData component', () => {
  it.each([['customVendors'], ['customPurposes']])('should provide a default slot with %s', (slotProp) => {
    mount(ConsentedData, {
      scopedSlots: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default(slotProps: any): any {
          expect(slotProps[slotProp]).toBeInstanceOf(Array);
        },
      },
      store,
      localVue,
    });
  });
});
