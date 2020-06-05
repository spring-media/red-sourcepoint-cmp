export interface InstagramEmbeds {
  process(): void;
}

export interface Instagram {
  Embeds: InstagramEmbeds;
}

export declare global {
  interface Window {
    instgrm?: Instagram;
  }
}
