import { CustomSupportObject } from '../typings/playground';
import { sourcepointMessage, sourcepointPrivacyManager } from '../fragments';

Feature('Sourcepoint Message');

const { playgroundParams, I } = inject() as CustomSupportObject;

Scenario('opens a privacy-data-center modal when clicking on the settings button', () => {
  I.amOnPage(playgroundParams.host + '/build/esm');
  I.waitForElement(sourcepointMessage.root, 5);

  sourcepointMessage.openSettings();

  I.dontSeeElement(sourcepointMessage.root);
  I.waitForElement(sourcepointPrivacyManager.root, 5);
});

Scenario('closes the message when clicking on accept-all button', () => {
  I.amOnPage(playgroundParams.host + '/build/esm');
  I.waitForElement(sourcepointMessage.root, 5);

  sourcepointMessage.acceptAll();

  I.dontSeeElement(sourcepointMessage.root);
});
