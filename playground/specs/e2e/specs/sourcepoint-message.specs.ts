import { Selector } from 'testcafe';

fixture`Sourcepoint Message`.page`http://local.bild.de:5000/build/esm.html`;

test('should exists', async (t) => {
  await t.expect(Selector('iframe[src="https://notice.sp-prod.net?preload_message=true"]').exists).ok();
});

/*
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
 */
