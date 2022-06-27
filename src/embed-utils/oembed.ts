export const getScriptSrcFromOembedHTML = (html: string): string | null => {
  const src = html.match(/script(?:.*)src\s*=\s*["'](.+?)["']/);

  return src ? src[1].trim() : null;
};
