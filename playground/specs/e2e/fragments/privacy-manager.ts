import { Selector, t } from 'testcafe';

export const rootElement = (): Selector =>
  Selector('iframe[src^="https://notice.sp-prod.net/privacy-manager/index.html"]');

export const findSaveAndExitButton = (): Selector =>
  Selector('.message-button').withExactText('Auswahl speichern & schließen');

export const findAcceptAllButton = (): Selector =>
  Selector('.message-button').withExactText('Alle akzeptieren & weiterlesen');

export const switchToPrivacyManager = (): TestControllerPromise => t.switchToIframe(rootElement());

export const clickSaveAndExitButton = (): TestControllerPromise =>
  switchToPrivacyManager().click(findSaveAndExitButton()).switchToMainWindow();

export const clickAcceptAllButton = (): TestControllerPromise =>
  switchToPrivacyManager().click(findAcceptAllButton()).switchToMainWindow();
