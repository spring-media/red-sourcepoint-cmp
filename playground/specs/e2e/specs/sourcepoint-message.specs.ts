import { message, privacyManager } from '../fragments';

fixture`Sourcepoint Message`.page`http://local.bild.de:5000/build/esm.html`;

test('should exists', async (t) => {
  await t.expect(message.root.exists).ok();
});

test('should open a privacy-data-center modal when clicking on the settings button', async (t) => {
  await message.clickOnSettingsButton();

  await t.expect(message.root.visible).notOk();
  await t.expect(privacyManager.root.exists).ok();
});

test('should close the message when clicking on accept-all button', async (t) => {
  await message.clickOnAcceptAllButton();

  await t.expect(message.root.visible).notOk();
  await t.expect(privacyManager.root.visible).notOk();
});
