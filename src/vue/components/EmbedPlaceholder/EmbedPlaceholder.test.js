import { mount } from '@vue/test-utils';
import { EmbedPlaceholder } from './index';
import { loadPrivacyManagerModal } from '../../../tcf-v2/index.ts';

jest.mock('../../../tcf-v2/index.ts');

describe('EmbedPlaceholder', () => {
  it('should render without any errors', () => {
    expect(
      mount(EmbedPlaceholder, {
        propsData: {
          privacyManagerId: '123456',
        },
      }).element,
    ).toMatchSnapshot();
  });

  it('should try to open a privacy-manager modal', () => {
    const wrapper = mount(EmbedPlaceholder, {
      propsData: {
        privacyManagerId: '123456',
      },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(loadPrivacyManagerModal).toHaveBeenCalledWith('123456');

    loadPrivacyManagerModal.mockReset();
  });
});
