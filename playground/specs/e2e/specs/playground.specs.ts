import { dialogue, privacyManager, socialEmbeds, thirdPartyEmbeds } from '../fragments';
import { exists, notExists, notVisible, visible } from '../assertions';
import { toIterator } from '../utils/to-iterator';

fixture`I am in the Playground application`.page`http://local.bild.de:5000/build/index.html`;

test('i see a dialogue initially', async () => {
  const { rootElement } = dialogue;

  await exists(rootElement());
});

test('i see a privacy-data-center modal after clicking on the settings button in the dialogue', async () => {
  const { clickSettingsButton, rootElement: mRoot } = dialogue;
  const { rootElement: pmRoot } = privacyManager;

  await clickSettingsButton();

  await notVisible(mRoot());
  await exists(pmRoot());
});

test('i see all embeds are being displayed as placeholders', async () => {
  const { getAll, getPlaceholder } = socialEmbeds;
  const collection = await toIterator(await getAll());

  for (const item of collection) {
    await exists(getPlaceholder(item));
  }
});

test('i see a privacy-data-center after clicking on the link in a social embed placeholder', async () => {
  const { clickSettingsButton } = dialogue;
  const { rootElement, clickSaveAndExitButton } = privacyManager;
  const { getAll, getPlaceholder, clickPlaceholderLink } = socialEmbeds;

  await notVisible(rootElement());

  await clickSettingsButton();

  await clickSaveAndExitButton();

  await clickPlaceholderLink(getPlaceholder(getAll().nth(0)));

  await visible(rootElement());
});

test('i see a privacy-data-center after clicking on the link in a third party embed placeholder', async () => {
  const { clickSettingsButton } = dialogue;
  const { rootElement, clickSaveAndExitButton } = privacyManager;
  const { getAll, getPlaceholder, clickPlaceholderLink } = thirdPartyEmbeds;

  await notVisible(rootElement());

  await clickSettingsButton();

  await clickSaveAndExitButton();

  await clickPlaceholderLink(getPlaceholder(getAll().nth(0)));

  await visible(rootElement());
});

test('i do not see a privacy-data-center after clicking on the save-and-exit button in that data-center', async () => {
  const { clickSettingsButton } = dialogue;
  const { clickSaveAndExitButton, rootElement } = privacyManager;

  await clickSettingsButton();

  await visible(rootElement());

  await clickSaveAndExitButton();

  await notVisible(rootElement());
});

test('i see the content of the embeds after clicking on the accept-all button in the privacy-data-center', async () => {
  const { clickSettingsButton } = dialogue;
  const { clickAcceptAllButton } = privacyManager;
  const { getAll, getPlaceholder } = socialEmbeds;

  const all = await getAll();
  const collection = await toIterator(all);

  await clickSettingsButton();

  await clickAcceptAllButton();

  for (const item of collection) {
    await notExists(await getPlaceholder(item));
  }
});

test('i see the content of the embeds after clicking on the accept-all button in the dialogue', async () => {
  const { clickAcceptAllButton, rootElement } = dialogue;
  const { getAll, getPlaceholder } = socialEmbeds;

  const all = await getAll();
  const collection = await toIterator(all);

  await clickAcceptAllButton();

  await notVisible(rootElement());

  for (const item of collection) {
    await notExists(await getPlaceholder(item));
  }
});

test('i see the content of the social embeds after clicking on the button "Soziale Netzwerke aktivieren" in at least one social embed placeholder', async () => {
  const { getAll, getPlaceholder, clickPlaceholderButton } = socialEmbeds;
  const { clickSettingsButton } = dialogue;
  const { clickSaveAndExitButton } = privacyManager;

  await clickSettingsButton();

  await clickSaveAndExitButton();

  const all = await getAll();
  const collection = await toIterator(all);

  await clickPlaceholderButton(getPlaceholder(all.nth(0)));

  for (const item of collection) {
    await notExists(await getPlaceholder(item));
  }
});
