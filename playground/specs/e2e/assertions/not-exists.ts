import { t, Selector } from 'testcafe';

export const notExists = (selector: Selector): TestControllerPromise =>
  t.expect(Selector(selector).exists).notOk('', { timeout: 10000 });
