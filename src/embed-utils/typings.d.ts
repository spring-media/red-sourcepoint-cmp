export interface TwitterWidgets {
  load(element?: HTMLElement): void;
}

export interface Twitter {
  widgets: TwitterWidgets;
}

export interface InstagramEmbeds {
  process(): void;
}

export interface Instagram {
  Embeds: InstagramEmbeds;
}

export interface Iframely {
  load(): void;
}

export declare global {
  interface Window {
    twttr?: Twitter;
    instgrm?: Instagram;
    iframely?: Iframely;
  }
}
