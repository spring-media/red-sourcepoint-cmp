import { mount } from '@vue/test-utils';
import { EmbedPlaceholder } from './index';

describe('EmbedPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholder).element).toMatchSnapshot();
  });
});
