import { t, Selector } from 'testcafe';

export const exists = (selector: Selector): TestControllerPromise => t.expect(Selector(selector).exists).ok();
