import { Selector, t } from 'testcafe';

export const rootElement = (): Selector => Selector('iframe[src="https://notice.sp-prod.net?preload_message=true"]');

export const switchToMessage = (): TestControllerPromise => t.switchToIframe(rootElement());

export const findSettingsButton = (): Selector => Selector('.message-button').nth(0);

export const findAcceptAllButton = (): Selector => Selector('.message-button').nth(1);

export const clickSettingsButton = (): TestControllerPromise =>
  switchToMessage().click(findSettingsButton()).switchToMainWindow();

export const clickAcceptAllButton = (): TestControllerPromise =>
  switchToMessage().click(findAcceptAllButton()).switchToMainWindow();
