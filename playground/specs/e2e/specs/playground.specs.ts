import { getMessage, getPrivacyManager, getEmbeds } from '../page-models/playground';
import { exists, notExists, notVisible, visible } from '../assertions';
import { toIterator } from '../utils/to-iterator';

fixture`Playground`.page`http://local.bild.de:5000/build/index.html`;

test('message should exists on initial page load', async () => {
  const { root } = getMessage();

  await exists(root);
});

test.skip('a privacy-data-center modal should be visible when clicking on the settings button in the message', async () => {
  const { clickOnSettingsButton, root: mRoot } = getMessage();
  const { root: pmRoot } = getPrivacyManager();

  await clickOnSettingsButton();

  await notVisible(mRoot);
  await exists(pmRoot);
});

test.skip('the message should disappear when clicking on the "Accept All" button within the message', async () => {
  const { clickOnAcceptAllButton, root: mRoot } = getMessage();
  const { root: pmRoot } = getPrivacyManager();

  await clickOnAcceptAllButton();

  await notVisible(mRoot);
  await notVisible(pmRoot);
});

test.skip('initially, all embeds should be displayed as placeholders instead of real content', async () => {
  const { getAll, getPlaceholder } = getEmbeds();
  const embeds = await getAll();
  const collection = await toIterator(embeds);

  for (const item of collection) {
    await exists(getPlaceholder(item));
  }
});

test.skip('a privacy-data-center modal should be visible when clicking on the link in an embed placeholder', async () => {
  const { root } = getPrivacyManager();

  await notVisible(root);

  const { getAll, getPlaceholder, clickPlaceholderLink } = getEmbeds();

  await clickPlaceholderLink(getPlaceholder(getAll().nth(0)));

  await visible(root);
});

test.skip('it should render all embeds when clicking on the button "soziale Netwzerke aktivieren" in at least one embed placeholder', async () => {
  const { getAll, getPlaceholder, clickPlaceholderButton } = getEmbeds();

  const embeds = await getAll();
  const collection = await toIterator(embeds);

  await clickPlaceholderButton(getPlaceholder(embeds.nth(0)));

  for (const item of collection) {
    await notExists(await getPlaceholder(item));
  }
});
