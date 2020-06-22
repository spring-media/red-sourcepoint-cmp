import { getMessage, getPrivacyManager, getEmbeds } from '../page-models/playground';
import { exists, notVisible, visible } from '../assertions';
import { toIterator } from '../utils/to-iterator';

fixture`Playground`.page`http://local.bild.de:5000/build/index.html`;

test('should exists on initial page load', async () => {
  const { root } = getMessage();

  await exists(root);
});

test('should open a privacy-data-center modal when clicking on the settings button', async () => {
  const { clickOnSettingsButton, root: mRoot } = getMessage();
  const { root: pmRoot } = getPrivacyManager();

  await clickOnSettingsButton();

  await notVisible(mRoot);
  await exists(pmRoot);
});

test('should close the message when clicking on accept-all button', async () => {
  const { clickOnAcceptAllButton, root: mRoot } = getMessage();
  const { root: pmRoot } = getPrivacyManager();

  await clickOnAcceptAllButton();

  await notVisible(mRoot);
  await notVisible(pmRoot);
});

test('should initial display all embeds as their placeholders', async () => {
  const { getAll, getPlaceholders } = getEmbeds();
  const embeds = await getAll();
  const collection = await toIterator(embeds);

  for (const item of collection) {
    await exists(getPlaceholders(item));
  }
});

test('shoud open a privacy-data-center modal by clicking on a link in an embed placeholder', async () => {
  const { root } = getPrivacyManager();

  await notVisible(root);

  const { getAll, getPlaceholders, clickPlaceholderLink } = getEmbeds();

  await clickPlaceholderLink(getPlaceholders(getAll().nth(0)).nth(0));

  await visible(root);
});
