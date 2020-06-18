import { getMessage, getPrivacyManager } from '../page-models/playground';

fixture`Playground`.page`http://local.bild.de:5000/build/index.html`;

test('should exists on initial page load', async (t) => {
  const { root } = getMessage();

  await t.expect(root.exists).ok();
});

test('should open a privacy-data-center modal when clicking on the settings button', async (t) => {
  const { clickOnSettingsButton, root: mRoot } = getMessage();
  const { root: pmRoot } = getPrivacyManager();

  await clickOnSettingsButton();

  await t.expect(mRoot.visible).notOk();
  await t.expect(pmRoot.exists).ok();
});

test('should close the message when clicking on accept-all button', async (t) => {
  const { clickOnAcceptAllButton, root: mRoot } = getMessage();
  const { root: pmRoot } = getPrivacyManager();

  await clickOnAcceptAllButton();

  await t.expect(mRoot.visible).notOk();
  await t.expect(pmRoot.visible).notOk();
});
