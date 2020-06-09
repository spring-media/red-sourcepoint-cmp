import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { EmbedSocialNetworksPlaceholder } from './';
import { getRelations, PURPOSE_ID_SOCIAL } from '../../../vendor-mapping';

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

describe('EmbedSocialNetworksPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedSocialNetworksPlaceholder, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });

  it('should give a consent to the purpose social media', () => {
    const wrapper = mount(EmbedSocialNetworksPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { privacyManagerId: 1234 },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(customConsent).toHaveBeenCalledWith({
      purposeIds: [PURPOSE_ID_SOCIAL],
      vendorIds: getRelations(PURPOSE_ID_SOCIAL),
    });
  });
});
