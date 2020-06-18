import { Selector, t } from 'testcafe';

export const root = Selector('iframe[src="https://notice.sp-prod.net?preload_message=true"]');

export const settingsButton = Selector('.message-button').nth(0);

export const acceptAllButton = Selector('.message-button').nth(1);

export const clickOnSettingsButton = (): TestControllerPromise =>
  t.switchToIframe(root).click(settingsButton).switchToMainWindow();

export const clickOnAcceptAllButton = (): TestControllerPromise =>
  t.switchToIframe(root).click(acceptAllButton).switchToMainWindow();
