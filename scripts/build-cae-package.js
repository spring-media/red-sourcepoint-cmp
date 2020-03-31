/* eslint-disable @typescript-eslint/no-var-requires */
const Terser = require('terser');
const CleanCSS = require('clean-css');
const { mkdirSync, rmdirSync, existsSync, writeFileSync, readFileSync } = require('fs');
const { version } = require('../package.json');
const { buildHTMLSnippets } = require('./build-html-snippets');

existsSync('.cae') && rmdirSync('.cae', { recursive: true });
mkdirSync('.cae');

const js = readFileSync('./dist/browser/red-cmp.js', 'utf8');
writeFileSync(`.cae/red-cmp-${version}.min.js`, Terser.minify(js).code, 'utf8');

buildHTMLSnippets({ version });

const css = readFileSync('./dist/cjs/vue/components/EmbedPlaceholder/EmbedPlaceholder.css', 'utf8');
writeFileSync(`.cae/red-cmp-embed-placeholder-${version}.min.css`, new CleanCSS().minify(css).styles);

const config = {
  jsLib: `red-cmp-${version}.min.js`,
  embedPlaceholderStyles: `red-cmp-embed-placeholder-${version}.min.css`,
  embedPlaceholderCommonHtml: `red-cmp-embed-placeholder-${version}.html`,
  embedPlaceholderFacebookHtml: `red-cmp-embed-facebook-placeholder-${version}.html`,
  embedPlaceholderInstagramHtml: `red-cmp-embed-instagram-placeholder-${version}.html`,
  embedPlaceholderTwitterHtml: `red-cmp-embed-twitter-placeholder-${version}.html`,
  embedPlaceholderYoutubeHtml: `red-cmp-embed-youtube-placeholder-${version}.html`,
};

writeFileSync(`.cae/red-cmp-config-${version}.json`, JSON.stringify(config));
