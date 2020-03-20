import { mount } from '@vue/test-utils';
import { EmbedPlaceholder } from './index';
import { loadPrivacyManagerModal } from '../../../tcf-v2/index.ts';

jest.mock('../../../tcf-v2/index.ts');

describe('EmbedPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholder).element).toMatchSnapshot();
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

  it('should try to open a privacy-manager modal if prop privacyManagerId is not set', () => {
    const spy = jest.spyOn(window.console, 'warn').mockImplementation();
    const wrapper = mount(EmbedPlaceholder);

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(loadPrivacyManagerModal).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
    loadPrivacyManagerModal.mockReset();
  });
});
