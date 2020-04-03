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

export declare global {
  interface Window {
    twttr: Twitter;
    instgrm: Instagram;
  }
}
