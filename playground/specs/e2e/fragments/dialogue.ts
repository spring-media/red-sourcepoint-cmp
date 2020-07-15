import { Selector, t } from 'testcafe';

export const rootElement = (): Selector =>
  Selector('iframe[src="https://cdn.privacy-mgmt.com/index.html?preload_message=true"]');

export const switchIntoDialogue = (): TestControllerPromise => t.switchToIframe(rootElement());

export const findSettingsButton = (): Selector => Selector('.message-button').nth(0);

export const findAcceptAllButton = (): Selector => Selector('.message-button').nth(1);

export const clickSettingsButton = (): TestControllerPromise =>
  switchIntoDialogue().click(findSettingsButton()).switchToMainWindow();

export const clickAcceptAllButton = (): TestControllerPromise =>
  switchIntoDialogue().click(findAcceptAllButton()).switchToMainWindow();
