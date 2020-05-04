import { PlaygroundParams } from '../typings/playground';

Feature('Welcome');

Scenario('Say hello', (I, playgroundParams: PlaygroundParams) => {
  I.amOnPage(playgroundParams.host);
});
