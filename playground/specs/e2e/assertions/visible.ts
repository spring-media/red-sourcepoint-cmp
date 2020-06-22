import { t, Selector } from 'testcafe';

export const visible = (selector: Selector): TestControllerPromise => t.expect(Selector(selector).exists).ok();
