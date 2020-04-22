const { rmdirSync, existsSync, writeFileSync } = require('fs');
const { extname } = require('path');
const rollup = require('rollup');

const esmTemplate = () => {
  return `
<div id="vue-app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
<script src="https://unpkg.com/vuex@3.1.3/dist/vuex.js"></script>
`;
};

const browserTemplate = () => {
  return '';
};

const compileTemplate = (opts) => ({
  name: 'compileTemplate',
  generateBundle(output, bundle) {
    const { fileName, parameters, template } = opts;

    const files = Object.values(bundle).filter((file) => file.isEntry || file.type === 'asset');
    const links = files
      .filter(({ fileName }) => extname(fileName).substring(1) === 'css')
      .map(({ fileName }) => `<link href="${fileName}" rel="stylesheet">`)
      .join('\n');
    const scripts = files
      .filter(({ fileName }) => extname(fileName).substring(1) === 'js')
      .map(({ fileName }) => `<script src="${fileName}"></script>`)
      .join('\n');

    const source = `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Playground</title>
        <script>
          !function (t) { var e = {}; function n(r) { if (e[r]) return e[r].exports; var o = e[r] = { i: r, l: !1, exports: {} }; return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports } n.m = t, n.c = e, n.d = function (t, e, r) { n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r }) }, n.r = function (t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, n.t = function (t, e) { if (1 & e && (t = n(t)), 8 & e) return t; if (4 & e && "object" == typeof t && t && t.__esModule) return t; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o, function (e) { return t[e] }.bind(null, o)); return r }, n.n = function (t) { var e = t && t.__esModule ? function () { return t.default } : function () { return t }; return n.d(e, "a", e), e }, n.o = function (t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, n.p = "", n(n.s = 3) }([function (t, e) { t.exports = function (t) { return "object" == typeof t ? null !== t : "function" == typeof t } }, function (t, e, n) { t.exports = !n(2)(function () { return 7 != Object.defineProperty({}, "a", { get: function () { return 7 } }).a }) }, function (t, e) { t.exports = function (t) { try { return !!t() } catch (t) { return !0 } } }, function (t, e, n) { "use strict"; n.r(e); n(4); !function () { if ("function" != typeof window.__tcfapi) { var t, e = [], n = window, r = n.document; !n.__tcfapi && function t() { var e = !!n.frames.__tcfapiLocator; if (!e) if (r.body) { var o = r.createElement("iframe"); o.style.cssText = "display:none", o.name = "__tcfapiLocator", r.body.appendChild(o) } else setTimeout(t, 5); return !e }() && (n.__tcfapi = function () { for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)r[o] = arguments[o]; if (!r.length) return e; if ("setGdprApplies" === r[0]) r.length > 3 && 2 === parseInt(r[1], 10) && "boolean" == typeof r[3] && (t = r[3], "function" == typeof r[2] && r[2]("set", !0)); else if ("ping" === r[0]) { var i = { gdprApplies: t, cmpLoaded: !1, apiVersion: "2.0" }; "function" == typeof r[2] && r[2](i, !0) } else e.push(r) }, n.addEventListener("message", function (t) { var e = "string" == typeof t.data, r = {}; try { r = e ? JSON.parse(t.data) : t.data } catch (t) { } var o = r.__tcfapiCall; o && n.__tcfapi(o.command, o.parameter, o.version, function (n, r) { var i = { __tcfapiReturn: { returnValue: n, success: r, callId: o.callId } }; e && (i = JSON.stringify(i)), t.source.postMessage(i, "*") }) }, !1)) } }() }, function (t, e, n) { var r = n(5).f, o = Function.prototype, i = /^\\s*function ([^ (]*)/; "name" in o || n(1) && r(o, "name", { configurable: !0, get: function () { try { return ("" + this).match(i)[1] } catch (t) { return "" } } }) }, function (t, e, n) { var r = n(6), o = n(7), i = n(10), f = Object.defineProperty; e.f = n(1) ? Object.defineProperty : function (t, e, n) { if (r(t), e = i(e, !0), r(n), o) try { return f(t, e, n) } catch (t) { } if ("get" in n || "set" in n) throw TypeError("Accessors not supported!"); return "value" in n && (t[e] = n.value), t } }, function (t, e, n) { var r = n(0); t.exports = function (t) { if (!r(t)) throw TypeError(t + " is not an object!"); return t } }, function (t, e, n) { t.exports = !n(1) && !n(2)(function () { return 7 != Object.defineProperty(n(8)("div"), "a", { get: function () { return 7 } }).a }) }, function (t, e, n) { var r = n(0), o = n(9).document, i = r(o) && r(o.createElement); t.exports = function (t) { return i ? o.createElement(t) : {} } }, function (t, e) { var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = n) }, function (t, e, n) { var r = n(0); t.exports = function (t, e) { if (!r(t)) return t; var n, o; if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o; if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o; if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o; throw TypeError("Can't convert object to primitive value") } }]);
        </script>
        <script>
          window._sp_ = {
            config: {
              mmsDomain: '${parameters.mmsDomain}',
              accountId: ${parameters.accountId},
              propertyId: ${parameters.propertyId},
              wrapperAPIOrigin: '${parameters.wrapperAPIOrigin}',
            },
          };
        </script>
        <script src="${parameters.libraryURL}"></script>
        ${links}
    </head>
    <body>
       ${template()}
       ${scripts}
    </body>
</html>
    `;

    this.emitFile({
      type: 'asset',
      source,
      name: 'Playground Template',
      fileName,
    });
  },
});

const compile = async (parameters) => {
  const buildDir = './playground/build';

  existsSync(buildDir) && rmdirSync(buildDir, { recursive: true });

  if (!existsSync('./dist')) {
    console.error('dist folder not found. Please run "npm run build" before.');
    return;
  }

  const configs = [
    {
      input: './playground/apps/esm-bundle.js',
      external: ['vue', 'vuex'],
      output: {
        format: 'iife',
        globals: {
          vue: 'Vue',
          vuex: 'Vuex',
        },
      },
      plugins: [compileTemplate({ parameters, fileName: 'esm.html', template: esmTemplate })],
    },
    {
      input: './playground/apps/browser-bundle.js',
      output: {
        format: 'es',
      },
      plugins: [compileTemplate({ parameters, fileName: 'browser.html', template: browserTemplate })],
    },
  ];

  for (const config of configs) {
    const bundle = await rollup.rollup(config);

    await bundle.write({
      format: config.output.format,
      dir: buildDir,
      globals: config.output.globals || {},
    });
  }

  writeFileSync('./playground/build/parameters.json', JSON.stringify(parameters));
};

module.exports = {
  compile,
};
