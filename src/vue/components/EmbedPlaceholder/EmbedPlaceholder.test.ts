import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { EmbedPlaceholder } from './';

const customConsent = jest.fn();

const consentActionsStub = Vue.extend({
  name: 'ConsentActions',
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$scopedSlots.default!({
        customConsent,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
  },
});

describe('EmbedPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholder, { propsData: { customConsents: {} } }).element).toMatchSnapshot();
  });

  it('should give a consent to given custom consents', () => {
    const customConsents = {};

    const wrapper = mount(EmbedPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { customConsents },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(customConsent).toHaveBeenCalledWith(customConsents);
  });
});
