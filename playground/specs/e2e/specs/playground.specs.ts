import { message, privacyManager, embeds } from '../fragments';
import { exists, notExists, notVisible, visible } from '../assertions';
import { toIterator } from '../utils/to-iterator';

fixture`I am in the Playground application`.page`http://local.bild.de:5000/build/index.html`;

test('i see a message initially', async () => {
  const { rootElement } = message;

  await exists(rootElement());
});

test('i see a privacy-data-center modal after clicking on the settings button in the message', async () => {
  const { clickSettingsButton, rootElement: mRoot } = message;
  const { rootElement: pmRoot } = privacyManager;

  await clickSettingsButton();

  await notVisible(mRoot());
  await exists(pmRoot());
});

test('i see all embeds are being displayed as placeholders instead of real content', async () => {
  const { getAll, getPlaceholder } = embeds;
  const collection = await toIterator(await getAll());

  for (const item of collection) {
    await exists(getPlaceholder(item));
  }
});

test('i see a privacy-data-center modal after clicking on the link in an embed placeholder', async () => {
  const { rootElement } = privacyManager;

  await notVisible(rootElement());

  const { getAll, getPlaceholder, clickPlaceholderLink } = embeds;

  await clickPlaceholderLink(getPlaceholder(getAll().nth(0)));

  await visible(rootElement());
});

test('i do not see a privacy-data-center after clicking on the save-and-exit button in that data-center', async () => {
  const { clickSettingsButton } = message;
  const { clickSaveAndExitButton, rootElement } = privacyManager;

  await clickSettingsButton();

  await visible(rootElement());

  await clickSaveAndExitButton();

  await notVisible(rootElement());
});

test('i see all embeds with their real content after clicking on the accept-all button in the privacy-data-center', async () => {
  const { clickSettingsButton } = message;
  const { clickAcceptAllButton } = privacyManager;
  const { getAll, getPlaceholder } = embeds;

  const all = await getAll();
  const collection = await toIterator(all);

  await clickSettingsButton();

  await clickAcceptAllButton();

  for (const item of collection) {
    await notExists(await getPlaceholder(item));
  }
});

test('i see all embeds with their real content after clicking on the accept-all button in the message', async () => {
  const { clickAcceptAllButton, rootElement } = message;
  const { getAll, getPlaceholder } = embeds;

  const all = await getAll();
  const collection = await toIterator(all);

  await clickAcceptAllButton();

  await notVisible(rootElement());

  for (const item of collection) {
    await notExists(await getPlaceholder(item));
  }
});

test.skip('i see all embeds with their real content after clicking on the button "Soziale Netzwerke aktivieren" in at least one embed placeholder', async () => {
  const { getAll, getPlaceholder, clickPlaceholderButton } = embeds;

  const all = await getAll();
  const collection = await toIterator(all);

  await clickPlaceholderButton(getPlaceholder(all.nth(0)));

  for (const item of collection) {
    await notExists(await getPlaceholder(item));
  }
});
