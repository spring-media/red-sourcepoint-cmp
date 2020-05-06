import { CustomSupportObject, SourcepointMessageFragment } from '../typings/playground';

const { I } = inject() as CustomSupportObject;

export const sourcepointMessage: SourcepointMessageFragment = {
  root: { css: 'iframe[src="https://notice.sp-prod.net?preload_message=true"]' },

  settingsButton: locate({ css: '.message-button' }).at(1),

  acceptButton: locate({ css: '.message-button' }).at(2),

  openSettings() {
    I.switchTo(locate(this.root).first());
    I.seeElement(this.settingsButton);
    I.click(this.settingsButton);
    I.switchTo();
  },

  acceptAll() {
    I.switchTo(locate(this.root).first());
    I.seeElement(this.acceptButton);
    I.click(this.acceptButton);
    I.switchTo();
  },
};
