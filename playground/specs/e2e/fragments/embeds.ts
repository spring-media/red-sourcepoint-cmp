import { Selector, t } from 'testcafe';
import { EmbedsFragment } from '../typings';

const root = Selector('.embed__container');

export const embeds: EmbedsFragment = {
  root,
  getAll: (): Selector => root().find('.embed__item'),
  getPlaceholders: (embed: Selector): Selector => embed.find('.embed-placeholder__container'),
  clickPlaceholderLink: (placeholder: Selector): TestControllerPromise =>
    t.click(placeholder.find('.embed-placeholder__text-link')),
  clickPlaceholderButton: (placeholder: Selector) => t.click(placeholder.find('.embed-placeholder__button')),
};
