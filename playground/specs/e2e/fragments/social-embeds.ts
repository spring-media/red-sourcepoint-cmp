import { Selector, t } from 'testcafe';

export const rootElement = (): Selector => Selector('.social-embeds__container');

export const getAll = (): Selector => rootElement().find('.embed__item');

export const getPlaceholder = (embed: Selector): Selector => embed.find('.embed-placeholder__container');

export const clickPlaceholderLink = (placeholder: Selector): TestControllerPromise =>
  t.click(placeholder.find('.embed-placeholder__text-link'));

export const clickPlaceholderButton = (placeholder: Selector): TestControllerPromise =>
  t.click(placeholder.find('.embed-placeholder__button'));
