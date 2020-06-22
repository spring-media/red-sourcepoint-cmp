import { t, Selector } from 'testcafe';

export const notVisible = (selector: Selector): TestControllerPromise => t.expect(Selector(selector).visible).notOk();
