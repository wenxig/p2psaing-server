// .wrangler/tmp/bundle-Qlajob/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// dist/index.js
var G8 = Object.defineProperty;
var a1 = ($, Q) => {
  for (var Y in Q)
    G8($, Y, { get: Q[Y], enumerable: true, configurable: true, set: (X) => Q[Y] = () => X });
};
var C$ = { Stringify: 1, BeforeStream: 2, Stream: 3 };
var B8 = ($, Q) => {
  const Y = new String($);
  return Y.isEscaped = true, Y.callbacks = Q, Y;
};
var t1 = async ($, Q, Y, X, J) => {
  const W = $.callbacks;
  if (!W?.length)
    return Promise.resolve($);
  if (J)
    J[0] += $;
  else
    J = [$];
  const q = Promise.all(W.map((G) => G({ phase: Q, buffer: J, context: X }))).then((G) => Promise.all(G.filter(Boolean).map((H) => t1(H, Q, false, X, J))).then(() => J[0]));
  if (Y)
    return B8(await q, W);
  else
    return q;
};
var I$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var F = ($, Q, Y) => {
  return I$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var A0 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var v = ($, Q, Y, X) => {
  return I$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var V8 = "text/plain; charset=UTF-8";
var e1 = ($, Q = {}) => {
  return Object.entries(Q).forEach(([Y, X]) => $.set(Y, X)), $;
};
var S0;
var J0;
var _;
var C;
var m;
var W0;
var f0 = class {
  constructor($, Q) {
    if (this.env = {}, this._var = {}, this.finalized = false, this.error = void 0, A0(this, S0, 200), A0(this, J0, void 0), A0(this, _, void 0), A0(this, C, void 0), A0(this, m, void 0), A0(this, W0, true), this.layout = void 0, this.renderer = (Y) => this.html(Y), this.notFoundHandler = () => new Response(), this.render = (...Y) => this.renderer(...Y), this.setLayout = (Y) => this.layout = Y, this.getLayout = () => this.layout, this.setRenderer = (Y) => {
      this.renderer = Y;
    }, this.header = (Y, X, J) => {
      if (X === void 0) {
        if (F(this, _))
          F(this, _).delete(Y);
        else if (F(this, C))
          delete F(this, C)[Y.toLocaleLowerCase()];
        if (this.finalized)
          this.res.headers.delete(Y);
        return;
      }
      if (J?.append) {
        if (!F(this, _))
          v(this, W0, false), v(this, _, new Headers(F(this, C))), v(this, C, {});
        F(this, _).append(Y, X);
      } else if (F(this, _))
        F(this, _).set(Y, X);
      else
        F(this, C) ?? v(this, C, {}), F(this, C)[Y.toLowerCase()] = X;
      if (this.finalized)
        if (J?.append)
          this.res.headers.append(Y, X);
        else
          this.res.headers.set(Y, X);
    }, this.status = (Y) => {
      v(this, W0, false), v(this, S0, Y);
    }, this.set = (Y, X) => {
      this._var ?? (this._var = {}), this._var[Y] = X;
    }, this.get = (Y) => {
      return this._var ? this._var[Y] : void 0;
    }, this.newResponse = (Y, X, J) => {
      if (F(this, W0) && !J && !X && F(this, S0) === 200)
        return new Response(Y, { headers: F(this, C) });
      if (X && typeof X !== "number") {
        const q = e1(new Headers(X.headers), F(this, C));
        return new Response(Y, { headers: q, status: X.status ?? F(this, S0) });
      }
      const W = typeof X === "number" ? X : F(this, S0);
      if (F(this, C) ?? v(this, C, {}), F(this, _) ?? v(this, _, new Headers()), e1(F(this, _), F(this, C)), F(this, m))
        F(this, m).headers.forEach((q, G) => {
          F(this, _)?.set(G, q);
        }), e1(F(this, _), F(this, C));
      J ?? (J = {});
      for (let [q, G] of Object.entries(J))
        if (typeof G === "string")
          F(this, _).set(q, G);
        else {
          F(this, _).delete(q);
          for (let H of G)
            F(this, _).append(q, H);
        }
      return new Response(Y, { status: W, headers: F(this, _) });
    }, this.body = (Y, X, J) => {
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.text = (Y, X, J) => {
      if (!F(this, C)) {
        if (F(this, W0) && !J && !X)
          return new Response(Y);
        v(this, C, {});
      }
      return F(this, C)["content-type"] = V8, typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.json = (Y, X, J) => {
      const W = JSON.stringify(Y);
      return F(this, C) ?? v(this, C, {}), F(this, C)["content-type"] = "application/json; charset=UTF-8", typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
    }, this.html = (Y, X, J) => {
      if (F(this, C) ?? v(this, C, {}), F(this, C)["content-type"] = "text/html; charset=UTF-8", typeof Y === "object") {
        if (!(Y instanceof Promise))
          Y = Y.toString();
        if (Y instanceof Promise)
          return Y.then((W) => t1(W, C$.Stringify, false, {})).then((W) => {
            return typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
          });
      }
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.redirect = (Y, X = 302) => {
      return F(this, _) ?? v(this, _, new Headers()), F(this, _).set("Location", Y), this.newResponse(null, X);
    }, this.notFound = () => {
      return this.notFoundHandler(this);
    }, this.req = $, Q) {
      if (v(this, J0, Q.executionCtx), this.env = Q.env, Q.notFoundHandler)
        this.notFoundHandler = Q.notFoundHandler;
    }
  }
  get event() {
    if (F(this, J0) && "respondWith" in F(this, J0))
      return F(this, J0);
    else
      throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (F(this, J0))
      return F(this, J0);
    else
      throw Error("This context has no ExecutionContext");
  }
  get res() {
    return v(this, W0, false), F(this, m) || v(this, m, new Response("404 Not Found", { status: 404 }));
  }
  set res($) {
    if (v(this, W0, false), F(this, m) && $) {
      F(this, m).headers.delete("content-type");
      for (let [Q, Y] of F(this, m).headers.entries())
        if (Q === "set-cookie") {
          const X = F(this, m).headers.getSetCookie();
          $.headers.delete("set-cookie");
          for (let J of X)
            $.headers.append("set-cookie", J);
        } else
          $.headers.set(Q, Y);
    }
    v(this, m, $), this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
};
S0 = /* @__PURE__ */ new WeakMap();
J0 = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
W0 = /* @__PURE__ */ new WeakMap();
var $$ = ($, Q, Y) => {
  return (X, J) => {
    let W = -1;
    return q(0);
    async function q(G) {
      if (G <= W)
        throw new Error("next() called multiple times");
      W = G;
      let H, B = false, w;
      if ($[G]) {
        if (w = $[G][0][0], X instanceof f0)
          X.req.routeIndex = G;
      } else
        w = G === $.length && J || void 0;
      if (!w) {
        if (X instanceof f0 && X.finalized === false && Y)
          H = await Y(X);
      } else
        try {
          H = await w(X, () => {
            return q(G + 1);
          });
        } catch (E) {
          if (E instanceof Error && X instanceof f0 && Q)
            X.error = E, H = await Q(E, X), B = true;
          else
            throw E;
        }
      if (H && (X.finalized === false || B))
        X.res = H;
      return X;
    }
  };
};
var Q$ = class extends Error {
  constructor($ = 500, Q) {
    super(Q?.message);
    this.res = Q?.res, this.status = $;
  }
  getResponse() {
    if (this.res)
      return this.res;
    return new Response(this.message, { status: this.status });
  }
};
var M8 = function($) {
  if ($ === null)
    return false;
  return $.startsWith("multipart/form-data") || $.startsWith("application/x-www-form-urlencoded");
};
async function z8($, Q) {
  const Y = await $.formData();
  if (Y)
    return U8(Y, Q);
  return {};
}
var U8 = function($, Q) {
  const Y = {};
  return $.forEach((X, J) => {
    if (!(Q.all || J.endsWith("[]")))
      Y[J] = X;
    else
      w8(Y, J, X);
  }), Y;
};
var O8 = function($) {
  return Array.isArray($);
};
var P$ = async ($, Q = { all: false }) => {
  const X = ($ instanceof z1 ? $.raw.headers : $.headers).get("Content-Type");
  if (M8(X))
    return z8($, Q);
  return {};
};
var w8 = ($, Q, Y) => {
  if ($[Q] && O8($[Q]))
    D8($[Q], Y);
  else if ($[Q])
    F8($, Q, Y);
  else
    $[Q] = Y;
};
var D8 = ($, Q) => {
  $.push(Q);
};
var F8 = ($, Q, Y) => {
  $[Q] = [$[Q], Y];
};
var X$ = ($) => {
  const Q = $.split("/");
  if (Q[0] === "")
    Q.shift();
  return Q;
};
var _$ = ($) => {
  const { groups: Q, path: Y } = L8($), X = X$(Y);
  return K8(X, Q);
};
var L8 = ($) => {
  const Q = [];
  return $ = $.replace(/\{[^}]+\}/g, (Y, X) => {
    const J = `@${X}`;
    return Q.push([J, Y]), J;
  }), { groups: Q, path: $ };
};
var K8 = ($, Q) => {
  for (let Y = Q.length - 1; Y >= 0; Y--) {
    const [X] = Q[Y];
    for (let J = $.length - 1; J >= 0; J--)
      if ($[J].includes(X)) {
        $[J] = $[J].replace(X, Q[Y][1]);
        break;
      }
  }
  return $;
};
var U1 = {};
var J$ = ($) => {
  if ($ === "*")
    return "*";
  const Q = $.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (Q) {
    if (!U1[$])
      if (Q[2])
        U1[$] = [$, Q[1], new RegExp("^" + Q[2] + "$")];
      else
        U1[$] = [$, Q[1], true];
    return U1[$];
  }
  return null;
};
var W$ = ($) => {
  const Q = $.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return Q ? Q[1] : "";
};
var b$ = ($) => {
  const Q = $.indexOf("?", 8);
  return Q === -1 ? "" : "?" + $.slice(Q + 1);
};
var v$ = ($) => {
  const Q = W$($);
  return Q.length > 1 && Q[Q.length - 1] === "/" ? Q.slice(0, -1) : Q;
};
var C0 = (...$) => {
  let Q = "", Y = false;
  for (let X of $) {
    if (Q[Q.length - 1] === "/")
      Q = Q.slice(0, -1), Y = true;
    if (X[0] !== "/")
      X = `/${X}`;
    if (X === "/" && Y)
      Q = `${Q}/`;
    else if (X !== "/")
      Q = `${Q}${X}`;
    if (X === "/" && Q === "")
      Q = "/";
  }
  return Q;
};
var w1 = ($) => {
  if (!$.match(/\:.+\?$/))
    return null;
  const Q = $.split("/"), Y = [];
  let X = "";
  return Q.forEach((J) => {
    if (J !== "" && !/\:/.test(J))
      X += "/" + J;
    else if (/\:/.test(J))
      if (/\?/.test(J)) {
        if (Y.length === 0 && X === "")
          Y.push("/");
        else
          Y.push(X);
        const W = J.replace("?", "");
        X += "/" + W, Y.push(X);
      } else
        X += "/" + J;
  }), Y.filter((J, W, q) => q.indexOf(J) === W);
};
var Y$ = ($) => {
  if (!/[%+]/.test($))
    return $;
  if ($.indexOf("+") !== -1)
    $ = $.replace(/\+/g, " ");
  return /%/.test($) ? d0($) : $;
};
var j$ = ($, Q, Y) => {
  let X;
  if (!Y && Q && !/[%+]/.test(Q)) {
    let q = $.indexOf(`?${Q}`, 8);
    if (q === -1)
      q = $.indexOf(`&${Q}`, 8);
    while (q !== -1) {
      const G = $.charCodeAt(q + Q.length + 1);
      if (G === 61) {
        const H = q + Q.length + 2, B = $.indexOf("&", H);
        return Y$($.slice(H, B === -1 ? void 0 : B));
      } else if (G == 38 || isNaN(G))
        return "";
      q = $.indexOf(`&${Q}`, q + 1);
    }
    if (X = /[%+]/.test($), !X)
      return;
  }
  const J = {};
  X ?? (X = /[%+]/.test($));
  let W = $.indexOf("?", 8);
  while (W !== -1) {
    const q = $.indexOf("&", W + 1);
    let G = $.indexOf("=", W);
    if (G > q && q !== -1)
      G = -1;
    let H = $.slice(W + 1, G === -1 ? q === -1 ? void 0 : q : G);
    if (X)
      H = Y$(H);
    if (W = q, H === "")
      continue;
    let B;
    if (G === -1)
      B = "";
    else if (B = $.slice(G + 1, q === -1 ? void 0 : q), X)
      B = Y$(B);
    if (Y) {
      if (!(J[H] && Array.isArray(J[H])))
        J[H] = [];
      J[H].push(B);
    } else
      J[H] ?? (J[H] = B);
  }
  return Q ? J[Q] : J;
};
var k$ = j$;
var T$ = ($, Q) => {
  return j$($, Q, true);
};
var d0 = decodeURIComponent;
var Z$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var Q0 = ($, Q, Y) => {
  return Z$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var x$ = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var g$ = ($, Q, Y, X) => {
  return Z$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var o0;
var o;
var z1 = class {
  constructor($, Q = "/", Y = [[]]) {
    x$(this, o0, void 0), x$(this, o, void 0), this.routeIndex = 0, this.bodyCache = {}, this.cachedBody = (X) => {
      const { bodyCache: J, raw: W } = this, q = J[X];
      if (q)
        return q;
      if (J.arrayBuffer)
        return (async () => {
          return await new Response(J.arrayBuffer)[X]();
        })();
      return J[X] = W[X]();
    }, this.raw = $, this.path = Q, g$(this, o, Y), g$(this, o0, {});
  }
  param($) {
    return $ ? this.getDecodedParam($) : this.getAllDecodedParams();
  }
  getDecodedParam($) {
    const Q = Q0(this, o)[0][this.routeIndex][1][$], Y = this.getParamValue(Q);
    return Y ? /\%/.test(Y) ? d0(Y) : Y : void 0;
  }
  getAllDecodedParams() {
    const $ = {}, Q = Object.keys(Q0(this, o)[0][this.routeIndex][1]);
    for (let Y of Q) {
      const X = this.getParamValue(Q0(this, o)[0][this.routeIndex][1][Y]);
      if (X && typeof X === "string")
        $[Y] = /\%/.test(X) ? d0(X) : X;
    }
    return $;
  }
  getParamValue($) {
    return Q0(this, o)[1] ? Q0(this, o)[1][$] : $;
  }
  query($) {
    return k$(this.url, $);
  }
  queries($) {
    return T$(this.url, $);
  }
  header($) {
    if ($)
      return this.raw.headers.get($.toLowerCase()) ?? void 0;
    const Q = {};
    return this.raw.headers.forEach((Y, X) => {
      Q[X] = Y;
    }), Q;
  }
  async parseBody($) {
    if (this.bodyCache.parsedBody)
      return this.bodyCache.parsedBody;
    const Q = await P$(this, $);
    return this.bodyCache.parsedBody = Q, Q;
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData($, Q) {
    Q0(this, o0)[$] = Q;
  }
  valid($) {
    return Q0(this, o0)[$];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return Q0(this, o)[0].map(([[, $]]) => $);
  }
  get routePath() {
    return Q0(this, o)[0].map(([[, $]]) => $)[this.routeIndex].path;
  }
};
o0 = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakMap();
var P = "ALL";
var h$ = "all";
var y$ = ["get", "post", "put", "delete", "options", "patch"];
var O1 = "Can not add a route since the matcher is already built.";
var D1 = class extends Error {
};
var E8 = function() {
  return class {
  };
};
var l$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var F1 = ($, Q, Y) => {
  return l$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var N8 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var L1 = ($, Q, Y, X) => {
  return l$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var R8 = Symbol("composedHandler");
var A8 = ($) => {
  return $.text("404 Not Found", 404);
};
var m$ = ($, Q) => {
  if ($ instanceof Q$)
    return $.getResponse();
  return console.error($), Q.text("Internal Server Error", 500);
};
var r;
var c$ = class extends E8() {
  constructor($ = {}) {
    super();
    this._basePath = "/", N8(this, r, "/"), this.routes = [], this.notFoundHandler = A8, this.errorHandler = m$, this.onError = (X) => {
      return this.errorHandler = X, this;
    }, this.notFound = (X) => {
      return this.notFoundHandler = X, this;
    }, this.fetch = (X, J, W) => {
      return this.dispatch(X, W, J, X.method);
    }, this.request = (X, J, W, q) => {
      if (X instanceof Request) {
        if (J !== void 0)
          X = new Request(X, J);
        return this.fetch(X, W, q);
      }
      X = X.toString();
      const G = /^https?:\/\//.test(X) ? X : `http://localhost${C0("/", X)}`, H = new Request(G, J);
      return this.fetch(H, W, q);
    }, this.fire = () => {
      addEventListener("fetch", (X) => {
        X.respondWith(this.dispatch(X.request, X, void 0, X.request.method));
      });
    }, [...y$, h$].map((X) => {
      this[X] = (J, ...W) => {
        if (typeof J === "string")
          L1(this, r, J);
        else
          this.addRoute(X, F1(this, r), J);
        return W.map((q) => {
          if (typeof q !== "string")
            this.addRoute(X, F1(this, r), q);
        }), this;
      };
    }), this.on = (X, J, ...W) => {
      if (!X)
        return this;
      for (let q of [J].flat()) {
        L1(this, r, q);
        for (let G of [X].flat())
          W.map((H) => {
            this.addRoute(G.toUpperCase(), F1(this, r), H);
          });
      }
      return this;
    }, this.use = (X, ...J) => {
      if (typeof X === "string")
        L1(this, r, X);
      else
        L1(this, r, "*"), J.unshift(X);
      return J.map((W) => {
        this.addRoute(P, F1(this, r), W);
      }), this;
    };
    const Y = $.strict ?? true;
    delete $.strict, Object.assign(this, $), this.getPath = Y ? $.getPath ?? W$ : v$;
  }
  clone() {
    const $ = new c$({ router: this.router, getPath: this.getPath });
    return $.routes = this.routes, $;
  }
  route($, Q) {
    const Y = this.basePath($);
    if (!Q)
      return Y;
    return Q.routes.map((X) => {
      let J;
      if (Q.errorHandler === m$)
        J = X.handler;
      else
        J = async (W, q) => (await $$([], Q.errorHandler)(W, () => X.handler(W, q))).res, J[R8] = X.handler;
      Y.addRoute(X.method, X.path, J);
    }), this;
  }
  basePath($) {
    const Q = this.clone();
    return Q._basePath = C0(this._basePath, $), Q;
  }
  mount($, Q, Y) {
    const X = C0(this._basePath, $), J = X === "/" ? 0 : X.length, W = async (q, G) => {
      let H = void 0;
      try {
        H = q.executionCtx;
      } catch {
      }
      const B = Y ? Y(q) : [q.env, H], w = Array.isArray(B) ? B : [B], E = b$(q.req.url), S = await Q(new Request(new URL((q.req.path.slice(J) || "/") + E, q.req.url), q.req.raw), ...w);
      if (S)
        return S;
      await G();
    };
    return this.addRoute(P, C0($, "*"), W), this;
  }
  addRoute($, Q, Y) {
    $ = $.toUpperCase(), Q = C0(this._basePath, Q);
    const X = { path: Q, method: $, handler: Y };
    this.router.add($, Q, [Y, X]), this.routes.push(X);
  }
  matchRoute($, Q) {
    return this.router.match($, Q);
  }
  handleError($, Q) {
    if ($ instanceof Error)
      return this.errorHandler($, Q);
    throw $;
  }
  dispatch($, Q, Y, X) {
    if (X === "HEAD")
      return (async () => new Response(null, await this.dispatch($, Q, Y, "GET")))();
    const J = this.getPath($, { env: Y }), W = this.matchRoute(X, J), q = new f0(new z1($, J, W), { env: Y, executionCtx: Q, notFoundHandler: this.notFoundHandler });
    if (W[0].length === 1) {
      let H;
      try {
        H = W[0][0][0][0](q, async () => {
          q.res = await this.notFoundHandler(q);
        });
      } catch (B) {
        return this.handleError(B, q);
      }
      return H instanceof Promise ? H.then((B) => B || (q.finalized ? q.res : this.notFoundHandler(q))).catch((B) => this.handleError(B, q)) : H;
    }
    const G = $$(W[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const H = await G(q);
        if (!H.finalized)
          throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");
        return H.res;
      } catch (H) {
        return this.handleError(H, q);
      }
    })();
  }
};
var u$ = c$;
r = /* @__PURE__ */ new WeakMap();
var S8 = function($, Q) {
  if ($.length === 1)
    return Q.length === 1 ? $ < Q ? -1 : 1 : -1;
  if (Q.length === 1)
    return 1;
  if ($ === r0 || $ === s0)
    return 1;
  else if (Q === r0 || Q === s0)
    return -1;
  if ($ === K1)
    return 1;
  else if (Q === K1)
    return -1;
  return $.length === Q.length ? $ < Q ? -1 : 1 : Q.length - $.length;
};
var K1 = "[^/]+";
var r0 = ".*";
var s0 = "(?:|/.*)";
var I0 = Symbol();
var N1 = class {
  constructor() {
    this.children = {};
  }
  insert($, Q, Y, X, J) {
    if ($.length === 0) {
      if (this.index !== void 0)
        throw I0;
      if (J)
        return;
      this.index = Q;
      return;
    }
    const [W, ...q] = $, G = W === "*" ? q.length === 0 ? ["", "", r0] : ["", "", K1] : W === "/*" ? ["", "", s0] : W.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let H;
    if (G) {
      const B = G[1];
      let w = G[2] || K1;
      if (B && G[2]) {
        if (w = w.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(w))
          throw I0;
      }
      if (H = this.children[w], !H) {
        if (Object.keys(this.children).some((E) => E !== r0 && E !== s0))
          throw I0;
        if (J)
          return;
        if (H = this.children[w] = new N1(), B !== "")
          H.varIndex = X.varIndex++;
      }
      if (!J && B !== "")
        Y.push([B, H.varIndex]);
    } else if (H = this.children[W], !H) {
      if (Object.keys(this.children).some((B) => B.length > 1 && B !== r0 && B !== s0))
        throw I0;
      if (J)
        return;
      H = this.children[W] = new N1();
    }
    H.insert(q, Q, Y, X, J);
  }
  buildRegExpStr() {
    const Q = Object.keys(this.children).sort(S8).map((Y) => {
      const X = this.children[Y];
      return (typeof X.varIndex === "number" ? `(${Y})@${X.varIndex}` : Y) + X.buildRegExpStr();
    });
    if (typeof this.index === "number")
      Q.unshift(`#${this.index}`);
    if (Q.length === 0)
      return "";
    if (Q.length === 1)
      return Q[0];
    return "(?:" + Q.join("|") + ")";
  }
};
var n$ = class {
  constructor() {
    this.context = { varIndex: 0 }, this.root = new N1();
  }
  insert($, Q, Y) {
    const X = [], J = [];
    for (let q = 0; ; ) {
      let G = false;
      if ($ = $.replace(/\{[^}]+\}/g, (H) => {
        const B = `@\\${q}`;
        return J[q] = [B, H], q++, G = true, B;
      }), !G)
        break;
    }
    const W = $.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let q = J.length - 1; q >= 0; q--) {
      const [G] = J[q];
      for (let H = W.length - 1; H >= 0; H--)
        if (W[H].indexOf(G) !== -1) {
          W[H] = W[H].replace(G, J[q][1]);
          break;
        }
    }
    return this.root.insert(W, Q, X, this.context, Y), X;
  }
  buildRegExp() {
    let $ = this.root.buildRegExpStr();
    if ($ === "")
      return [/^$/, [], []];
    let Q = 0;
    const Y = [], X = [];
    return $ = $.replace(/#(\d+)|@(\d+)|\.\*\$/g, (J, W, q) => {
      if (typeof W !== "undefined")
        return Y[++Q] = Number(W), "$()";
      if (typeof q !== "undefined")
        return X[Number(q)] = ++Q, "";
      return "";
    }), [new RegExp(`^${$}`), Y, X];
  }
};
var i$ = function($) {
  return q$[$] ?? (q$[$] = new RegExp($ === "*" ? "" : `^${$.replace(/\/\*/, "(?:|/.*)")}$`));
};
var C8 = function() {
  q$ = {};
};
var I8 = function($) {
  const Q = new n$(), Y = [];
  if ($.length === 0)
    return f8;
  const X = $.map((B) => [!/\*|\/:/.test(B[0]), ...B]).sort(([B, w], [E, S]) => B ? 1 : E ? -1 : w.length - S.length), J = {};
  for (let B = 0, w = -1, E = X.length; B < E; B++) {
    const [S, g, b] = X[B];
    if (S)
      J[g] = [b.map(([Z]) => [Z, {}]), p$];
    else
      w++;
    let x;
    try {
      x = Q.insert(g, w, S);
    } catch (Z) {
      throw Z === I0 ? new D1(g) : Z;
    }
    if (S)
      continue;
    Y[w] = b.map(([Z, R0]) => {
      const p0 = {};
      R0 -= 1;
      for (; R0 >= 0; R0--) {
        const [X0, M1] = x[R0];
        p0[X0] = M1;
      }
      return [Z, p0];
    });
  }
  const [W, q, G] = Q.buildRegExp();
  for (let B = 0, w = Y.length; B < w; B++)
    for (let E = 0, S = Y[B].length; E < S; E++) {
      const g = Y[B][E]?.[1];
      if (!g)
        continue;
      const b = Object.keys(g);
      for (let x = 0, Z = b.length; x < Z; x++)
        g[b[x]] = G[g[b[x]]];
    }
  const H = [];
  for (let B in q)
    H[B] = Y[q[B]];
  return [W, H, J];
};
var P0 = function($, Q) {
  if (!$)
    return;
  for (let Y of Object.keys($).sort((X, J) => J.length - X.length))
    if (i$(Y).test(Q))
      return [...$[Y]];
  return;
};
var p$ = [];
var f8 = [/^$/, [], {}];
var q$ = {};
var H$ = class {
  constructor() {
    this.name = "RegExpRouter", this.middleware = { [P]: {} }, this.routes = { [P]: {} };
  }
  add($, Q, Y) {
    var X;
    const { middleware: J, routes: W } = this;
    if (!J || !W)
      throw new Error(O1);
    if (!J[$])
      [J, W].forEach((H) => {
        H[$] = {}, Object.keys(H[P]).forEach((B) => {
          H[$][B] = [...H[P][B]];
        });
      });
    if (Q === "/*")
      Q = "*";
    const q = (Q.match(/\/:/g) || []).length;
    if (/\*$/.test(Q)) {
      const H = i$(Q);
      if ($ === P)
        Object.keys(J).forEach((B) => {
          var w;
          (w = J[B])[Q] || (w[Q] = P0(J[B], Q) || P0(J[P], Q) || []);
        });
      else
        (X = J[$])[Q] || (X[Q] = P0(J[$], Q) || P0(J[P], Q) || []);
      Object.keys(J).forEach((B) => {
        if ($ === P || $ === B)
          Object.keys(J[B]).forEach((w) => {
            H.test(w) && J[B][w].push([Y, q]);
          });
      }), Object.keys(W).forEach((B) => {
        if ($ === P || $ === B)
          Object.keys(W[B]).forEach((w) => H.test(w) && W[B][w].push([Y, q]));
      });
      return;
    }
    const G = w1(Q) || [Q];
    for (let H = 0, B = G.length; H < B; H++) {
      const w = G[H];
      Object.keys(W).forEach((E) => {
        var S;
        if ($ === P || $ === E)
          (S = W[E])[w] || (S[w] = [...P0(J[E], w) || P0(J[P], w) || []]), W[E][w].push([Y, q - B + H + 1]);
      });
    }
  }
  match($, Q) {
    C8();
    const Y = this.buildAllMatchers();
    return this.match = (X, J) => {
      const W = Y[X] || Y[P], q = W[2][J];
      if (q)
        return q;
      const G = J.match(W[0]);
      if (!G)
        return [[], p$];
      const H = G.indexOf("", 1);
      return [W[1][H], G];
    }, this.match($, Q);
  }
  buildAllMatchers() {
    const $ = {};
    return [...Object.keys(this.routes), ...Object.keys(this.middleware)].forEach((Q) => {
      $[Q] || ($[Q] = this.buildMatcher(Q));
    }), this.middleware = this.routes = void 0, $;
  }
  buildMatcher($) {
    const Q = [];
    let Y = $ === P;
    if ([this.middleware, this.routes].forEach((X) => {
      const J = X[$] ? Object.keys(X[$]).map((W) => [W, X[$][W]]) : [];
      if (J.length !== 0)
        Y || (Y = true), Q.push(...J);
      else if ($ !== P)
        Q.push(...Object.keys(X[P]).map((W) => [W, X[P][W]]));
    }), !Y)
      return null;
    else
      return I8(Q);
  }
};
var G$ = class {
  constructor($) {
    this.name = "SmartRouter", this.routers = [], this.routes = [], Object.assign(this, $);
  }
  add($, Q, Y) {
    if (!this.routes)
      throw new Error(O1);
    this.routes.push([$, Q, Y]);
  }
  match($, Q) {
    if (!this.routes)
      throw new Error("Fatal error");
    const { routers: Y, routes: X } = this, J = Y.length;
    let W = 0, q;
    for (; W < J; W++) {
      const G = Y[W];
      try {
        X.forEach((H) => {
          G.add(...H);
        }), q = G.match($, Q);
      } catch (H) {
        if (H instanceof D1)
          continue;
        throw H;
      }
      this.match = G.match.bind(G), this.routers = [G], this.routes = void 0;
      break;
    }
    if (W === J)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, q;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1)
      throw new Error("No active router has been determined yet.");
    return this.routers[0];
  }
};
var B$ = class {
  constructor($, Q, Y) {
    if (this.order = 0, this.params = {}, this.children = Y || {}, this.methods = [], this.name = "", $ && Q) {
      const X = {};
      X[$] = { handler: Q, possibleKeys: [], score: 0, name: this.name }, this.methods = [X];
    }
    this.patterns = [];
  }
  insert($, Q, Y) {
    this.name = `${$} ${Q}`, this.order = ++this.order;
    let X = this;
    const J = _$(Q), W = [], q = [];
    for (let B = 0, w = J.length; B < w; B++) {
      const E = J[B];
      if (Object.keys(X.children).includes(E)) {
        q.push(...X.patterns), X = X.children[E];
        const g = J$(E);
        if (g)
          W.push(g[1]);
        continue;
      }
      X.children[E] = new B$();
      const S = J$(E);
      if (S)
        X.patterns.push(S), q.push(...X.patterns), W.push(S[1]);
      q.push(...X.patterns), X = X.children[E];
    }
    if (!X.methods.length)
      X.methods = [];
    const G = {}, H = { handler: Y, possibleKeys: W.filter((B, w, E) => E.indexOf(B) === w), name: this.name, score: this.order };
    return G[$] = H, X.methods.push(G), X;
  }
  gHSets($, Q, Y, X) {
    const J = [];
    for (let W = 0, q = $.methods.length; W < q; W++) {
      const G = $.methods[W], H = G[Q] || G[P], B = {};
      if (H !== void 0)
        H.params = {}, H.possibleKeys.forEach((w) => {
          const E = B[H.name];
          H.params[w] = X[w] && !E ? X[w] : Y[w] ?? X[w], B[H.name] = true;
        }), J.push(H);
    }
    return J;
  }
  search($, Q) {
    const Y = [];
    this.params = {};
    let J = [this];
    const W = X$(Q);
    for (let G = 0, H = W.length; G < H; G++) {
      const B = W[G], w = G === H - 1, E = [];
      for (let S = 0, g = J.length; S < g; S++) {
        const b = J[S], x = b.children[B];
        if (x)
          if (x.params = b.params, w === true) {
            if (x.children["*"])
              Y.push(...this.gHSets(x.children["*"], $, b.params, {}));
            Y.push(...this.gHSets(x, $, b.params, {}));
          } else
            E.push(x);
        for (let Z = 0, R0 = b.patterns.length; Z < R0; Z++) {
          const p0 = b.patterns[Z], X0 = { ...b.params };
          if (p0 === "*") {
            const s1 = b.children["*"];
            if (s1)
              Y.push(...this.gHSets(s1, $, b.params, {})), E.push(s1);
            continue;
          }
          if (B === "")
            continue;
          const [M1, S$, i0] = p0, E0 = b.children[M1], f$ = W.slice(G).join("/");
          if (i0 instanceof RegExp && i0.test(f$)) {
            X0[S$] = f$, Y.push(...this.gHSets(E0, $, b.params, X0));
            continue;
          }
          if (i0 === true || i0 instanceof RegExp && i0.test(B)) {
            if (typeof M1 === "string")
              if (X0[S$] = B, w === true) {
                if (Y.push(...this.gHSets(E0, $, X0, b.params)), E0.children["*"])
                  Y.push(...this.gHSets(E0.children["*"], $, X0, b.params));
              } else
                E0.params = X0, E.push(E0);
          }
        }
      }
      J = E;
    }
    return [Y.sort((G, H) => {
      return G.score - H.score;
    }).map(({ handler: G, params: H }) => [G, H])];
  }
};
var V$ = class {
  constructor() {
    this.name = "TrieRouter", this.node = new B$();
  }
  add($, Q, Y) {
    const X = w1(Q);
    if (X) {
      for (let J of X)
        this.node.insert($, J, Y);
      return;
    }
    this.node.insert($, Q, Y);
  }
  match($, Q) {
    return this.node.search($, Q);
  }
};
var M$ = class extends u$ {
  constructor($ = {}) {
    super($);
    this.router = $.router ?? new G$({ routers: [new H$(), new V$()] });
  }
};
var _0 = {};
a1(_0, { verify: () => {
  {
    return k8;
  }
}, sign: () => {
  {
    return j8;
  }
}, decode: () => {
  {
    return J6;
  }
} });
var d$ = ($) => {
  return _8($.replace(/_|-/g, (Q) => ({ _: "/", "-": "+" })[Q] ?? Q));
};
var z$ = ($) => P8($).replace(/\/|\+/g, (Q) => ({ "/": "_", "+": "-" })[Q] ?? Q);
var P8 = ($) => {
  let Q = "";
  const Y = new Uint8Array($);
  for (let X = 0, J = Y.length; X < J; X++)
    Q += String.fromCharCode(Y[X]);
  return btoa(Q);
};
var _8 = ($) => {
  const Q = atob($), Y = new Uint8Array(new ArrayBuffer(Q.length)), X = Q.length / 2;
  for (let J = 0, W = Q.length - 1; J <= X; J++, W--)
    Y[J] = Q.charCodeAt(J), Y[W] = Q.charCodeAt(W);
  return Y;
};
var o$ = class extends Error {
  constructor($) {
    super(`${$} is not an implemented algorithm`);
    this.name = "JwtAlgorithmNotImplemented";
  }
};
var U$ = class extends Error {
  constructor($) {
    super(`invalid JWT token: ${$}`);
    this.name = "JwtTokenInvalid";
  }
};
var r$ = class extends Error {
  constructor($) {
    super(`token (${$}) is being used before it's valid`);
    this.name = "JwtTokenNotBefore";
  }
};
var s$ = class extends Error {
  constructor($) {
    super(`token (${$}) expired`);
    this.name = "JwtTokenExpired";
  }
};
var a$ = class extends Error {
  constructor($, Q) {
    super(`Incorrect "iat" claim must be a older than "${$}" (iat: "${Q}")`);
    this.name = "JwtTokenIssuedAt";
  }
};
var t$ = class extends Error {
  constructor($) {
    super(`token(${$}) signature mismatched`);
    this.name = "JwtTokenSignatureMismatched";
  }
};
var b8 = new TextEncoder();
var v8 = new TextDecoder();
var e$ = ($) => z$(b8.encode(JSON.stringify($))).replace(/=/g, "");
var Y6 = ($) => z$($).replace(/=/g, "");
var $6 = ($) => JSON.parse(v8.decode(d$($)));
var Q6 = ($) => {
  switch ($.toUpperCase()) {
    case "HS256":
      return { name: "HMAC", hash: { name: "SHA-256" } };
    case "HS384":
      return { name: "HMAC", hash: { name: "SHA-384" } };
    case "HS512":
      return { name: "HMAC", hash: { name: "SHA-512" } };
    default:
      throw new o$($);
  }
};
var X6 = async ($, Q, Y = "HS256") => {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  const X = new TextEncoder(), J = await crypto.subtle.importKey("raw", X.encode(Q), Q6(Y), false, ["sign"]);
  return await crypto.subtle.sign(Q6(Y), J, X.encode($));
};
var j8 = async ($, Q, Y = "HS256") => {
  const X = e$($), W = `${e$({ alg: Y, typ: "JWT" })}.${X}`, q = await X6(W, Q, Y), G = Y6(q);
  return `${W}.${G}`;
};
var k8 = async ($, Q, Y = "HS256") => {
  const X = $.split(".");
  if (X.length !== 3)
    throw new U$($);
  const { payload: J } = J6($), W = Math.floor(Date.now() / 1e3);
  if (J.nbf && J.nbf > W)
    throw new r$($);
  if (J.exp && J.exp <= W)
    throw new s$($);
  if (J.iat && W < J.iat)
    throw new a$(W, J.iat);
  const q = X.slice(0, 2).join("."), G = await X6(q, Q, Y);
  if (Y6(G) !== X[2])
    throw new t$($);
  return J;
};
var J6 = ($) => {
  try {
    const [Q, Y] = $.split("."), X = $6(Q), J = $6(Y);
    return { header: X, payload: J };
  } catch (Q) {
    throw new U$($);
  }
};
var R1 = _0.verify;
var C5 = _0.decode;
var W6 = _0.sign;
var O;
(function(E1) {
  let $;
  (function(J) {
    J[J["success"] = 0] = "success";
    J[J["fail"] = 1] = "fail";
  })($ = E1.Code || (E1.Code = {}));
  let Q;
  (function(q) {
    q[q["notFound"] = 0] = "notFound";
    q[q["falseMethod"] = 1] = "falseMethod";
    q[q["unauthorization"] = 2] = "unauthorization";
    q[q["format"] = 3] = "format";
  })(Q = E1.FailCode || (E1.FailCode = {}));
})(O || (O = {}));
var x8 = function($) {
  G6 = $;
};
var S1 = function() {
  return G6;
};
var z = function($, Q) {
  const Y = f1({ issueData: Q, data: $.data, path: $.path, errorMaps: [$.common.contextualErrorMap, $.schemaErrorMap, S1(), a0].filter((X) => !!X) });
  $.common.issues.push(Y);
};
var N = function($) {
  if (!$)
    return {};
  const { errorMap: Q, invalid_type_error: Y, required_error: X, description: J } = $;
  if (Q && (Y || X))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  if (Q)
    return { errorMap: Q, description: J };
  return { errorMap: (q, G) => {
    if (q.code !== "invalid_type")
      return { message: G.defaultError };
    if (typeof G.data === "undefined")
      return { message: X !== null && X !== void 0 ? X : G.defaultError };
    return { message: Y !== null && Y !== void 0 ? Y : G.defaultError };
  }, description: J };
};
var i8 = function($, Q) {
  if ((Q === "v4" || !Q) && u8.test($))
    return true;
  if ((Q === "v6" || !Q) && n8.test($))
    return true;
  return false;
};
var d8 = function($, Q) {
  const Y = ($.toString().split(".")[1] || "").length, X = (Q.toString().split(".")[1] || "").length, J = Y > X ? Y : X, W = parseInt($.toFixed(J).replace(".", "")), q = parseInt(Q.toFixed(J).replace(".", ""));
  return W % q / Math.pow(10, J);
};
var b0 = function($) {
  if ($ instanceof I) {
    const Q = {};
    for (let Y in $.shape) {
      const X = $.shape[Y];
      Q[Y] = s.create(b0(X));
    }
    return new I({ ...$._def, shape: () => Q });
  } else if ($ instanceof c)
    return new c({ ...$._def, type: b0($.element) });
  else if ($ instanceof s)
    return s.create(b0($.unwrap()));
  else if ($ instanceof M0)
    return M0.create(b0($.unwrap()));
  else if ($ instanceof t)
    return t.create($.items.map((Q) => b0(Q)));
  else
    return $;
};
var L$ = function($, Q) {
  const Y = q0($), X = q0(Q);
  if ($ === Q)
    return { valid: true, data: $ };
  else if (Y === M.object && X === M.object) {
    const J = A.objectKeys(Q), W = A.objectKeys($).filter((G) => J.indexOf(G) !== -1), q = { ...$, ...Q };
    for (let G of W) {
      const H = L$($[G], Q[G]);
      if (!H.valid)
        return { valid: false };
      q[G] = H.data;
    }
    return { valid: true, data: q };
  } else if (Y === M.array && X === M.array) {
    if ($.length !== Q.length)
      return { valid: false };
    const J = [];
    for (let W = 0; W < $.length; W++) {
      const q = $[W], G = Q[W], H = L$(q, G);
      if (!H.valid)
        return { valid: false };
      J.push(H.data);
    }
    return { valid: true, data: J };
  } else if (Y === M.date && X === M.date && +$ === +Q)
    return { valid: true, data: $ };
  else
    return { valid: false };
};
var V6 = function($, Q) {
  return new V0({ values: $, typeName: L.ZodEnum, ...N(Q) });
};
var A;
(function($) {
  $.assertEqual = (J) => J;
  function Q(J) {
  }
  $.assertIs = Q;
  function Y(J) {
    throw new Error();
  }
  $.assertNever = Y, $.arrayToEnum = (J) => {
    const W = {};
    for (let q of J)
      W[q] = q;
    return W;
  }, $.getValidEnumValues = (J) => {
    const W = $.objectKeys(J).filter((G) => typeof J[J[G]] !== "number"), q = {};
    for (let G of W)
      q[G] = J[G];
    return $.objectValues(q);
  }, $.objectValues = (J) => {
    return $.objectKeys(J).map(function(W) {
      return J[W];
    });
  }, $.objectKeys = typeof Object.keys === "function" ? (J) => Object.keys(J) : (J) => {
    const W = [];
    for (let q in J)
      if (Object.prototype.hasOwnProperty.call(J, q))
        W.push(q);
    return W;
  }, $.find = (J, W) => {
    for (let q of J)
      if (W(q))
        return q;
    return;
  }, $.isInteger = typeof Number.isInteger === "function" ? (J) => Number.isInteger(J) : (J) => typeof J === "number" && isFinite(J) && Math.floor(J) === J;
  function X(J, W = " | ") {
    return J.map((q) => typeof q === "string" ? `'${q}'` : q).join(W);
  }
  $.joinValues = X, $.jsonStringifyReplacer = (J, W) => {
    if (typeof W === "bigint")
      return W.toString();
    return W;
  };
})(A || (A = {}));
var O$;
(function($) {
  $.mergeShapes = (Q, Y) => {
    return { ...Q, ...Y };
  };
})(O$ || (O$ = {}));
var M = A.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
var q0 = ($) => {
  switch (typeof $) {
    case "undefined":
      return M.undefined;
    case "string":
      return M.string;
    case "number":
      return isNaN($) ? M.nan : M.number;
    case "boolean":
      return M.boolean;
    case "function":
      return M.function;
    case "bigint":
      return M.bigint;
    case "symbol":
      return M.symbol;
    case "object":
      if (Array.isArray($))
        return M.array;
      if ($ === null)
        return M.null;
      if ($.then && typeof $.then === "function" && $.catch && typeof $.catch === "function")
        return M.promise;
      if (typeof Map !== "undefined" && $ instanceof Map)
        return M.map;
      if (typeof Set !== "undefined" && $ instanceof Set)
        return M.set;
      if (typeof Date !== "undefined" && $ instanceof Date)
        return M.date;
      return M.object;
    default:
      return M.unknown;
  }
};
var V = A.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
var T8 = ($) => {
  return JSON.stringify($, null, 2).replace(/"([^"]+)":/g, "$1:");
};
var h = class extends Error {
  constructor($) {
    super();
    this.issues = [], this.addIssue = (Y) => {
      this.issues = [...this.issues, Y];
    }, this.addIssues = (Y = []) => {
      this.issues = [...this.issues, ...Y];
    };
    const Q = new.target.prototype;
    if (Object.setPrototypeOf)
      Object.setPrototypeOf(this, Q);
    else
      this.__proto__ = Q;
    this.name = "ZodError", this.issues = $;
  }
  get errors() {
    return this.issues;
  }
  format($) {
    const Q = $ || function(J) {
      return J.message;
    }, Y = { _errors: [] }, X = (J) => {
      for (let W of J.issues)
        if (W.code === "invalid_union")
          W.unionErrors.map(X);
        else if (W.code === "invalid_return_type")
          X(W.returnTypeError);
        else if (W.code === "invalid_arguments")
          X(W.argumentsError);
        else if (W.path.length === 0)
          Y._errors.push(Q(W));
        else {
          let q = Y, G = 0;
          while (G < W.path.length) {
            const H = W.path[G];
            if (G !== W.path.length - 1)
              q[H] = q[H] || { _errors: [] };
            else
              q[H] = q[H] || { _errors: [] }, q[H]._errors.push(Q(W));
            q = q[H], G++;
          }
        }
    };
    return X(this), Y;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, A.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten($ = (Q) => Q.message) {
    const Q = {}, Y = [];
    for (let X of this.issues)
      if (X.path.length > 0)
        Q[X.path[0]] = Q[X.path[0]] || [], Q[X.path[0]].push($(X));
      else
        Y.push($(X));
    return { formErrors: Y, fieldErrors: Q };
  }
  get formErrors() {
    return this.flatten();
  }
};
h.create = ($) => {
  return new h($);
};
var a0 = ($, Q) => {
  let Y;
  switch ($.code) {
    case V.invalid_type:
      if ($.received === M.undefined)
        Y = "Required";
      else
        Y = `Expected ${$.expected}, received ${$.received}`;
      break;
    case V.invalid_literal:
      Y = `Invalid literal value, expected ${JSON.stringify($.expected, A.jsonStringifyReplacer)}`;
      break;
    case V.unrecognized_keys:
      Y = `Unrecognized key(s) in object: ${A.joinValues($.keys, ", ")}`;
      break;
    case V.invalid_union:
      Y = "Invalid input";
      break;
    case V.invalid_union_discriminator:
      Y = `Invalid discriminator value. Expected ${A.joinValues($.options)}`;
      break;
    case V.invalid_enum_value:
      Y = `Invalid enum value. Expected ${A.joinValues($.options)}, received '${$.received}'`;
      break;
    case V.invalid_arguments:
      Y = "Invalid function arguments";
      break;
    case V.invalid_return_type:
      Y = "Invalid function return type";
      break;
    case V.invalid_date:
      Y = "Invalid date";
      break;
    case V.invalid_string:
      if (typeof $.validation === "object")
        if ("includes" in $.validation) {
          if (Y = `Invalid input: must include "${$.validation.includes}"`, typeof $.validation.position === "number")
            Y = `${Y} at one or more positions greater than or equal to ${$.validation.position}`;
        } else if ("startsWith" in $.validation)
          Y = `Invalid input: must start with "${$.validation.startsWith}"`;
        else if ("endsWith" in $.validation)
          Y = `Invalid input: must end with "${$.validation.endsWith}"`;
        else
          A.assertNever($.validation);
      else if ($.validation !== "regex")
        Y = `Invalid ${$.validation}`;
      else
        Y = "Invalid";
      break;
    case V.too_small:
      if ($.type === "array")
        Y = `Array must contain ${$.exact ? "exactly" : $.inclusive ? "at least" : "more than"} ${$.minimum} element(s)`;
      else if ($.type === "string")
        Y = `String must contain ${$.exact ? "exactly" : $.inclusive ? "at least" : "over"} ${$.minimum} character(s)`;
      else if ($.type === "number")
        Y = `Number must be ${$.exact ? "exactly equal to " : $.inclusive ? "greater than or equal to " : "greater than "}${$.minimum}`;
      else if ($.type === "date")
        Y = `Date must be ${$.exact ? "exactly equal to " : $.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number($.minimum))}`;
      else
        Y = "Invalid input";
      break;
    case V.too_big:
      if ($.type === "array")
        Y = `Array must contain ${$.exact ? "exactly" : $.inclusive ? "at most" : "less than"} ${$.maximum} element(s)`;
      else if ($.type === "string")
        Y = `String must contain ${$.exact ? "exactly" : $.inclusive ? "at most" : "under"} ${$.maximum} character(s)`;
      else if ($.type === "number")
        Y = `Number must be ${$.exact ? "exactly" : $.inclusive ? "less than or equal to" : "less than"} ${$.maximum}`;
      else if ($.type === "bigint")
        Y = `BigInt must be ${$.exact ? "exactly" : $.inclusive ? "less than or equal to" : "less than"} ${$.maximum}`;
      else if ($.type === "date")
        Y = `Date must be ${$.exact ? "exactly" : $.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number($.maximum))}`;
      else
        Y = "Invalid input";
      break;
    case V.custom:
      Y = "Invalid input";
      break;
    case V.invalid_intersection_types:
      Y = "Intersection results could not be merged";
      break;
    case V.not_multiple_of:
      Y = `Number must be a multiple of ${$.multipleOf}`;
      break;
    case V.not_finite:
      Y = "Number must be finite";
      break;
    default:
      Y = Q.defaultError, A.assertNever($);
  }
  return { message: Y };
};
var G6 = a0;
var f1 = ($) => {
  const { data: Q, path: Y, errorMaps: X, issueData: J } = $, W = [...Y, ...J.path || []], q = { ...J, path: W };
  let G = "";
  const H = X.filter((B) => !!B).slice().reverse();
  for (let B of H)
    G = B(q, { data: Q, defaultError: G }).message;
  return { ...J, path: W, message: J.message || G };
};
var g8 = [];
var j = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray($, Q) {
    const Y = [];
    for (let X of Q) {
      if (X.status === "aborted")
        return K;
      if (X.status === "dirty")
        $.dirty();
      Y.push(X.value);
    }
    return { status: $.value, value: Y };
  }
  static async mergeObjectAsync($, Q) {
    const Y = [];
    for (let X of Q)
      Y.push({ key: await X.key, value: await X.value });
    return j.mergeObjectSync($, Y);
  }
  static mergeObjectSync($, Q) {
    const Y = {};
    for (let X of Q) {
      const { key: J, value: W } = X;
      if (J.status === "aborted")
        return K;
      if (W.status === "aborted")
        return K;
      if (J.status === "dirty")
        $.dirty();
      if (W.status === "dirty")
        $.dirty();
      if (J.value !== "__proto__" && (typeof W.value !== "undefined" || X.alwaysSet))
        Y[J.value] = W.value;
    }
    return { status: $.value, value: Y };
  }
};
var K = Object.freeze({ status: "aborted" });
var B6 = ($) => ({ status: "dirty", value: $ });
var T = ($) => ({ status: "valid", value: $ });
var D$ = ($) => $.status === "aborted";
var F$ = ($) => $.status === "dirty";
var t0 = ($) => $.status === "valid";
var C1 = ($) => typeof Promise !== "undefined" && $ instanceof Promise;
var D;
(function($) {
  $.errToObj = (Q) => typeof Q === "string" ? { message: Q } : Q || {}, $.toString = (Q) => typeof Q === "string" ? Q : Q === null || Q === void 0 ? void 0 : Q.message;
})(D || (D = {}));
var u = class {
  constructor($, Q, Y, X) {
    this._cachedPath = [], this.parent = $, this.data = Q, this._path = Y, this._key = X;
  }
  get path() {
    if (!this._cachedPath.length)
      if (this._key instanceof Array)
        this._cachedPath.push(...this._path, ...this._key);
      else
        this._cachedPath.push(...this._path, this._key);
    return this._cachedPath;
  }
};
var q6 = ($, Q) => {
  if (t0(Q))
    return { success: true, data: Q.value };
  else {
    if (!$.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return { success: false, get error() {
      if (this._error)
        return this._error;
      const Y = new h($.common.issues);
      return this._error = Y, this._error;
    } };
  }
};
var R = class {
  constructor($) {
    this.spa = this.safeParseAsync, this._def = $, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType($) {
    return q0($.data);
  }
  _getOrReturnCtx($, Q) {
    return Q || { common: $.parent.common, data: $.data, parsedType: q0($.data), schemaErrorMap: this._def.errorMap, path: $.path, parent: $.parent };
  }
  _processInputParams($) {
    return { status: new j(), ctx: { common: $.parent.common, data: $.data, parsedType: q0($.data), schemaErrorMap: this._def.errorMap, path: $.path, parent: $.parent } };
  }
  _parseSync($) {
    const Q = this._parse($);
    if (C1(Q))
      throw new Error("Synchronous parse encountered promise.");
    return Q;
  }
  _parseAsync($) {
    const Q = this._parse($);
    return Promise.resolve(Q);
  }
  parse($, Q) {
    const Y = this.safeParse($, Q);
    if (Y.success)
      return Y.data;
    throw Y.error;
  }
  safeParse($, Q) {
    var Y;
    const X = { common: { issues: [], async: (Y = Q === null || Q === void 0 ? void 0 : Q.async) !== null && Y !== void 0 ? Y : false, contextualErrorMap: Q === null || Q === void 0 ? void 0 : Q.errorMap }, path: (Q === null || Q === void 0 ? void 0 : Q.path) || [], schemaErrorMap: this._def.errorMap, parent: null, data: $, parsedType: q0($) }, J = this._parseSync({ data: $, path: X.path, parent: X });
    return q6(X, J);
  }
  async parseAsync($, Q) {
    const Y = await this.safeParseAsync($, Q);
    if (Y.success)
      return Y.data;
    throw Y.error;
  }
  async safeParseAsync($, Q) {
    const Y = { common: { issues: [], contextualErrorMap: Q === null || Q === void 0 ? void 0 : Q.errorMap, async: true }, path: (Q === null || Q === void 0 ? void 0 : Q.path) || [], schemaErrorMap: this._def.errorMap, parent: null, data: $, parsedType: q0($) }, X = this._parse({ data: $, path: Y.path, parent: Y }), J = await (C1(X) ? X : Promise.resolve(X));
    return q6(Y, J);
  }
  refine($, Q) {
    const Y = (X) => {
      if (typeof Q === "string" || typeof Q === "undefined")
        return { message: Q };
      else if (typeof Q === "function")
        return Q(X);
      else
        return Q;
    };
    return this._refinement((X, J) => {
      const W = $(X), q = () => J.addIssue({ code: V.custom, ...Y(X) });
      if (typeof Promise !== "undefined" && W instanceof Promise)
        return W.then((G) => {
          if (!G)
            return q(), false;
          else
            return true;
        });
      if (!W)
        return q(), false;
      else
        return true;
    });
  }
  refinement($, Q) {
    return this._refinement((Y, X) => {
      if (!$(Y))
        return X.addIssue(typeof Q === "function" ? Q(Y, X) : Q), false;
      else
        return true;
    });
  }
  _refinement($) {
    return new y({ schema: this, typeName: L.ZodEffects, effect: { type: "refinement", refinement: $ } });
  }
  superRefine($) {
    return this._refinement($);
  }
  optional() {
    return s.create(this, this._def);
  }
  nullable() {
    return M0.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return c.create(this, this._def);
  }
  promise() {
    return L0.create(this, this._def);
  }
  or($) {
    return x0.create([this, $], this._def);
  }
  and($) {
    return g0.create(this, $, this._def);
  }
  transform($) {
    return new y({ ...N(this._def), schema: this, typeName: L.ZodEffects, effect: { type: "transform", transform: $ } });
  }
  default($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new m0({ ...N(this._def), innerType: this, defaultValue: Q, typeName: L.ZodDefault });
  }
  brand() {
    return new K$({ typeName: L.ZodBranded, type: this, ...N(this._def) });
  }
  catch($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new X1({ ...N(this._def), innerType: this, catchValue: Q, typeName: L.ZodCatch });
  }
  describe($) {
    return new this.constructor({ ...this._def, description: $ });
  }
  pipe($) {
    return q1.create(this, $);
  }
  readonly() {
    return W1.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var Z8 = /^c[^\s-]{8,}$/i;
var h8 = /^[a-z][a-z0-9]*$/;
var y8 = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var m8 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var l8 = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var c8 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
var w$;
var u8 = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var n8 = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var p8 = ($) => {
  if ($.precision)
    if ($.offset)
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${$.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    else
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${$.precision}}Z$`);
  else if ($.precision === 0)
    if ($.offset)
      return new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$");
    else
      return new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$");
  else if ($.offset)
    return new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$");
  else
    return new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
};
var l = class extends R {
  _parse($) {
    if (this._def.coerce)
      $.data = String($.data);
    if (this._getType($) !== M.string) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.string, received: J.parsedType }), K;
    }
    const Y = new j();
    let X = void 0;
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if ($.data.length < J.value)
          X = this._getOrReturnCtx($, X), z(X, { code: V.too_small, minimum: J.value, type: "string", inclusive: true, exact: false, message: J.message }), Y.dirty();
      } else if (J.kind === "max") {
        if ($.data.length > J.value)
          X = this._getOrReturnCtx($, X), z(X, { code: V.too_big, maximum: J.value, type: "string", inclusive: true, exact: false, message: J.message }), Y.dirty();
      } else if (J.kind === "length") {
        const W = $.data.length > J.value, q = $.data.length < J.value;
        if (W || q) {
          if (X = this._getOrReturnCtx($, X), W)
            z(X, { code: V.too_big, maximum: J.value, type: "string", inclusive: true, exact: true, message: J.message });
          else if (q)
            z(X, { code: V.too_small, minimum: J.value, type: "string", inclusive: true, exact: true, message: J.message });
          Y.dirty();
        }
      } else if (J.kind === "email") {
        if (!l8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "email", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "emoji") {
        if (!w$)
          w$ = new RegExp(c8, "u");
        if (!w$.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "emoji", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "uuid") {
        if (!m8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "uuid", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid") {
        if (!Z8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "cuid", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid2") {
        if (!h8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "cuid2", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "ulid") {
        if (!y8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "ulid", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "url")
        try {
          new URL($.data);
        } catch (W) {
          X = this._getOrReturnCtx($, X), z(X, { validation: "url", code: V.invalid_string, message: J.message }), Y.dirty();
        }
      else if (J.kind === "regex") {
        if (J.regex.lastIndex = 0, !J.regex.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "regex", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "trim")
        $.data = $.data.trim();
      else if (J.kind === "includes") {
        if (!$.data.includes(J.value, J.position))
          X = this._getOrReturnCtx($, X), z(X, { code: V.invalid_string, validation: { includes: J.value, position: J.position }, message: J.message }), Y.dirty();
      } else if (J.kind === "toLowerCase")
        $.data = $.data.toLowerCase();
      else if (J.kind === "toUpperCase")
        $.data = $.data.toUpperCase();
      else if (J.kind === "startsWith") {
        if (!$.data.startsWith(J.value))
          X = this._getOrReturnCtx($, X), z(X, { code: V.invalid_string, validation: { startsWith: J.value }, message: J.message }), Y.dirty();
      } else if (J.kind === "endsWith") {
        if (!$.data.endsWith(J.value))
          X = this._getOrReturnCtx($, X), z(X, { code: V.invalid_string, validation: { endsWith: J.value }, message: J.message }), Y.dirty();
      } else if (J.kind === "datetime") {
        if (!p8(J).test($.data))
          X = this._getOrReturnCtx($, X), z(X, { code: V.invalid_string, validation: "datetime", message: J.message }), Y.dirty();
      } else if (J.kind === "ip") {
        if (!i8($.data, J.version))
          X = this._getOrReturnCtx($, X), z(X, { validation: "ip", code: V.invalid_string, message: J.message }), Y.dirty();
      } else
        A.assertNever(J);
    return { status: Y.value, value: $.data };
  }
  _regex($, Q, Y) {
    return this.refinement((X) => $.test(X), { validation: Q, code: V.invalid_string, ...D.errToObj(Y) });
  }
  _addCheck($) {
    return new l({ ...this._def, checks: [...this._def.checks, $] });
  }
  email($) {
    return this._addCheck({ kind: "email", ...D.errToObj($) });
  }
  url($) {
    return this._addCheck({ kind: "url", ...D.errToObj($) });
  }
  emoji($) {
    return this._addCheck({ kind: "emoji", ...D.errToObj($) });
  }
  uuid($) {
    return this._addCheck({ kind: "uuid", ...D.errToObj($) });
  }
  cuid($) {
    return this._addCheck({ kind: "cuid", ...D.errToObj($) });
  }
  cuid2($) {
    return this._addCheck({ kind: "cuid2", ...D.errToObj($) });
  }
  ulid($) {
    return this._addCheck({ kind: "ulid", ...D.errToObj($) });
  }
  ip($) {
    return this._addCheck({ kind: "ip", ...D.errToObj($) });
  }
  datetime($) {
    var Q;
    if (typeof $ === "string")
      return this._addCheck({ kind: "datetime", precision: null, offset: false, message: $ });
    return this._addCheck({ kind: "datetime", precision: typeof ($ === null || $ === void 0 ? void 0 : $.precision) === "undefined" ? null : $ === null || $ === void 0 ? void 0 : $.precision, offset: (Q = $ === null || $ === void 0 ? void 0 : $.offset) !== null && Q !== void 0 ? Q : false, ...D.errToObj($ === null || $ === void 0 ? void 0 : $.message) });
  }
  regex($, Q) {
    return this._addCheck({ kind: "regex", regex: $, ...D.errToObj(Q) });
  }
  includes($, Q) {
    return this._addCheck({ kind: "includes", value: $, position: Q === null || Q === void 0 ? void 0 : Q.position, ...D.errToObj(Q === null || Q === void 0 ? void 0 : Q.message) });
  }
  startsWith($, Q) {
    return this._addCheck({ kind: "startsWith", value: $, ...D.errToObj(Q) });
  }
  endsWith($, Q) {
    return this._addCheck({ kind: "endsWith", value: $, ...D.errToObj(Q) });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $, ...D.errToObj(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $, ...D.errToObj(Q) });
  }
  length($, Q) {
    return this._addCheck({ kind: "length", value: $, ...D.errToObj(Q) });
  }
  nonempty($) {
    return this.min(1, D.errToObj($));
  }
  trim() {
    return new l({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
  }
  toLowerCase() {
    return new l({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
  }
  toUpperCase() {
    return new l({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
  }
  get isDatetime() {
    return !!this._def.checks.find(($) => $.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find(($) => $.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find(($) => $.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find(($) => $.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find(($) => $.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find(($) => $.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find(($) => $.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find(($) => $.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find(($) => $.kind === "ip");
  }
  get minLength() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "min") {
        if ($ === null || Q.value > $)
          $ = Q.value;
      }
    return $;
  }
  get maxLength() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "max") {
        if ($ === null || Q.value < $)
          $ = Q.value;
      }
    return $;
  }
};
l.create = ($) => {
  var Q;
  return new l({ checks: [], typeName: L.ZodString, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...N($) });
};
var G0 = class extends R {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = Number($.data);
    if (this._getType($) !== M.number) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.number, received: J.parsedType }), K;
    }
    let Y = void 0;
    const X = new j();
    for (let J of this._def.checks)
      if (J.kind === "int") {
        if (!A.isInteger($.data))
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.invalid_type, expected: "integer", received: "float", message: J.message }), X.dirty();
      } else if (J.kind === "min") {
        if (J.inclusive ? $.data < J.value : $.data <= J.value)
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.too_small, minimum: J.value, type: "number", inclusive: J.inclusive, exact: false, message: J.message }), X.dirty();
      } else if (J.kind === "max") {
        if (J.inclusive ? $.data > J.value : $.data >= J.value)
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.too_big, maximum: J.value, type: "number", inclusive: J.inclusive, exact: false, message: J.message }), X.dirty();
      } else if (J.kind === "multipleOf") {
        if (d8($.data, J.value) !== 0)
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.not_multiple_of, multipleOf: J.value, message: J.message }), X.dirty();
      } else if (J.kind === "finite") {
        if (!Number.isFinite($.data))
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.not_finite, message: J.message }), X.dirty();
      } else
        A.assertNever(J);
    return { status: X.value, value: $.data };
  }
  gte($, Q) {
    return this.setLimit("min", $, true, D.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, D.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, D.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, D.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new G0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: D.toString(X) }] });
  }
  _addCheck($) {
    return new G0({ ...this._def, checks: [...this._def.checks, $] });
  }
  int($) {
    return this._addCheck({ kind: "int", message: D.toString($) });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: false, message: D.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: false, message: D.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: true, message: D.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: true, message: D.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: D.toString(Q) });
  }
  finite($) {
    return this._addCheck({ kind: "finite", message: D.toString($) });
  }
  safe($) {
    return this._addCheck({ kind: "min", inclusive: true, value: Number.MIN_SAFE_INTEGER, message: D.toString($) })._addCheck({ kind: "max", inclusive: true, value: Number.MAX_SAFE_INTEGER, message: D.toString($) });
  }
  get minValue() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "min") {
        if ($ === null || Q.value > $)
          $ = Q.value;
      }
    return $;
  }
  get maxValue() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "max") {
        if ($ === null || Q.value < $)
          $ = Q.value;
      }
    return $;
  }
  get isInt() {
    return !!this._def.checks.find(($) => $.kind === "int" || $.kind === "multipleOf" && A.isInteger($.value));
  }
  get isFinite() {
    let $ = null, Q = null;
    for (let Y of this._def.checks)
      if (Y.kind === "finite" || Y.kind === "int" || Y.kind === "multipleOf")
        return true;
      else if (Y.kind === "min") {
        if (Q === null || Y.value > Q)
          Q = Y.value;
      } else if (Y.kind === "max") {
        if ($ === null || Y.value < $)
          $ = Y.value;
      }
    return Number.isFinite(Q) && Number.isFinite($);
  }
};
G0.create = ($) => {
  return new G0({ checks: [], typeName: L.ZodNumber, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...N($) });
};
var B0 = class extends R {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = BigInt($.data);
    if (this._getType($) !== M.bigint) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.bigint, received: J.parsedType }), K;
    }
    let Y = void 0;
    const X = new j();
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if (J.inclusive ? $.data < J.value : $.data <= J.value)
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.too_small, type: "bigint", minimum: J.value, inclusive: J.inclusive, message: J.message }), X.dirty();
      } else if (J.kind === "max") {
        if (J.inclusive ? $.data > J.value : $.data >= J.value)
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.too_big, type: "bigint", maximum: J.value, inclusive: J.inclusive, message: J.message }), X.dirty();
      } else if (J.kind === "multipleOf") {
        if ($.data % J.value !== BigInt(0))
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.not_multiple_of, multipleOf: J.value, message: J.message }), X.dirty();
      } else
        A.assertNever(J);
    return { status: X.value, value: $.data };
  }
  gte($, Q) {
    return this.setLimit("min", $, true, D.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, D.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, D.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, D.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new B0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: D.toString(X) }] });
  }
  _addCheck($) {
    return new B0({ ...this._def, checks: [...this._def.checks, $] });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: false, message: D.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: false, message: D.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: true, message: D.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: true, message: D.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: D.toString(Q) });
  }
  get minValue() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "min") {
        if ($ === null || Q.value > $)
          $ = Q.value;
      }
    return $;
  }
  get maxValue() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "max") {
        if ($ === null || Q.value < $)
          $ = Q.value;
      }
    return $;
  }
};
B0.create = ($) => {
  var Q;
  return new B0({ checks: [], typeName: L.ZodBigInt, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...N($) });
};
var j0 = class extends R {
  _parse($) {
    if (this._def.coerce)
      $.data = Boolean($.data);
    if (this._getType($) !== M.boolean) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.boolean, received: Y.parsedType }), K;
    }
    return T($.data);
  }
};
j0.create = ($) => {
  return new j0({ typeName: L.ZodBoolean, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...N($) });
};
var O0 = class extends R {
  _parse($) {
    if (this._def.coerce)
      $.data = new Date($.data);
    if (this._getType($) !== M.date) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.date, received: J.parsedType }), K;
    }
    if (isNaN($.data.getTime())) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_date }), K;
    }
    const Y = new j();
    let X = void 0;
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if ($.data.getTime() < J.value)
          X = this._getOrReturnCtx($, X), z(X, { code: V.too_small, message: J.message, inclusive: true, exact: false, minimum: J.value, type: "date" }), Y.dirty();
      } else if (J.kind === "max") {
        if ($.data.getTime() > J.value)
          X = this._getOrReturnCtx($, X), z(X, { code: V.too_big, message: J.message, inclusive: true, exact: false, maximum: J.value, type: "date" }), Y.dirty();
      } else
        A.assertNever(J);
    return { status: Y.value, value: new Date($.data.getTime()) };
  }
  _addCheck($) {
    return new O0({ ...this._def, checks: [...this._def.checks, $] });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $.getTime(), message: D.toString(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $.getTime(), message: D.toString(Q) });
  }
  get minDate() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "min") {
        if ($ === null || Q.value > $)
          $ = Q.value;
      }
    return $ != null ? new Date($) : null;
  }
  get maxDate() {
    let $ = null;
    for (let Q of this._def.checks)
      if (Q.kind === "max") {
        if ($ === null || Q.value < $)
          $ = Q.value;
      }
    return $ != null ? new Date($) : null;
  }
};
O0.create = ($) => {
  return new O0({ checks: [], coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, typeName: L.ZodDate, ...N($) });
};
var e0 = class extends R {
  _parse($) {
    if (this._getType($) !== M.symbol) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.symbol, received: Y.parsedType }), K;
    }
    return T($.data);
  }
};
e0.create = ($) => {
  return new e0({ typeName: L.ZodSymbol, ...N($) });
};
var k0 = class extends R {
  _parse($) {
    if (this._getType($) !== M.undefined) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.undefined, received: Y.parsedType }), K;
    }
    return T($.data);
  }
};
k0.create = ($) => {
  return new k0({ typeName: L.ZodUndefined, ...N($) });
};
var T0 = class extends R {
  _parse($) {
    if (this._getType($) !== M.null) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.null, received: Y.parsedType }), K;
    }
    return T($.data);
  }
};
T0.create = ($) => {
  return new T0({ typeName: L.ZodNull, ...N($) });
};
var D0 = class extends R {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse($) {
    return T($.data);
  }
};
D0.create = ($) => {
  return new D0({ typeName: L.ZodAny, ...N($) });
};
var H0 = class extends R {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse($) {
    return T($.data);
  }
};
H0.create = ($) => {
  return new H0({ typeName: L.ZodUnknown, ...N($) });
};
var a = class extends R {
  _parse($) {
    const Q = this._getOrReturnCtx($);
    return z(Q, { code: V.invalid_type, expected: M.never, received: Q.parsedType }), K;
  }
};
a.create = ($) => {
  return new a({ typeName: L.ZodNever, ...N($) });
};
var $1 = class extends R {
  _parse($) {
    if (this._getType($) !== M.undefined) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.void, received: Y.parsedType }), K;
    }
    return T($.data);
  }
};
$1.create = ($) => {
  return new $1({ typeName: L.ZodVoid, ...N($) });
};
var c = class extends R {
  _parse($) {
    const { ctx: Q, status: Y } = this._processInputParams($), X = this._def;
    if (Q.parsedType !== M.array)
      return z(Q, { code: V.invalid_type, expected: M.array, received: Q.parsedType }), K;
    if (X.exactLength !== null) {
      const W = Q.data.length > X.exactLength.value, q = Q.data.length < X.exactLength.value;
      if (W || q)
        z(Q, { code: W ? V.too_big : V.too_small, minimum: q ? X.exactLength.value : void 0, maximum: W ? X.exactLength.value : void 0, type: "array", inclusive: true, exact: true, message: X.exactLength.message }), Y.dirty();
    }
    if (X.minLength !== null) {
      if (Q.data.length < X.minLength.value)
        z(Q, { code: V.too_small, minimum: X.minLength.value, type: "array", inclusive: true, exact: false, message: X.minLength.message }), Y.dirty();
    }
    if (X.maxLength !== null) {
      if (Q.data.length > X.maxLength.value)
        z(Q, { code: V.too_big, maximum: X.maxLength.value, type: "array", inclusive: true, exact: false, message: X.maxLength.message }), Y.dirty();
    }
    if (Q.common.async)
      return Promise.all([...Q.data].map((W, q) => {
        return X.type._parseAsync(new u(Q, W, Q.path, q));
      })).then((W) => {
        return j.mergeArray(Y, W);
      });
    const J = [...Q.data].map((W, q) => {
      return X.type._parseSync(new u(Q, W, Q.path, q));
    });
    return j.mergeArray(Y, J);
  }
  get element() {
    return this._def.type;
  }
  min($, Q) {
    return new c({ ...this._def, minLength: { value: $, message: D.toString(Q) } });
  }
  max($, Q) {
    return new c({ ...this._def, maxLength: { value: $, message: D.toString(Q) } });
  }
  length($, Q) {
    return new c({ ...this._def, exactLength: { value: $, message: D.toString(Q) } });
  }
  nonempty($) {
    return this.min(1, $);
  }
};
c.create = ($, Q) => {
  return new c({ type: $, minLength: null, maxLength: null, exactLength: null, typeName: L.ZodArray, ...N(Q) });
};
var I = class extends R {
  constructor() {
    super(...arguments);
    this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const $ = this._def.shape(), Q = A.objectKeys($);
    return this._cached = { shape: $, keys: Q };
  }
  _parse($) {
    if (this._getType($) !== M.object) {
      const H = this._getOrReturnCtx($);
      return z(H, { code: V.invalid_type, expected: M.object, received: H.parsedType }), K;
    }
    const { status: Y, ctx: X } = this._processInputParams($), { shape: J, keys: W } = this._getCached(), q = [];
    if (!(this._def.catchall instanceof a && this._def.unknownKeys === "strip")) {
      for (let H in X.data)
        if (!W.includes(H))
          q.push(H);
    }
    const G = [];
    for (let H of W) {
      const B = J[H], w = X.data[H];
      G.push({ key: { status: "valid", value: H }, value: B._parse(new u(X, w, X.path, H)), alwaysSet: H in X.data });
    }
    if (this._def.catchall instanceof a) {
      const H = this._def.unknownKeys;
      if (H === "passthrough")
        for (let B of q)
          G.push({ key: { status: "valid", value: B }, value: { status: "valid", value: X.data[B] } });
      else if (H === "strict") {
        if (q.length > 0)
          z(X, { code: V.unrecognized_keys, keys: q }), Y.dirty();
      } else if (H === "strip")
        ;
      else
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const H = this._def.catchall;
      for (let B of q) {
        const w = X.data[B];
        G.push({ key: { status: "valid", value: B }, value: H._parse(new u(X, w, X.path, B)), alwaysSet: B in X.data });
      }
    }
    if (X.common.async)
      return Promise.resolve().then(async () => {
        const H = [];
        for (let B of G) {
          const w = await B.key;
          H.push({ key: w, value: await B.value, alwaysSet: B.alwaysSet });
        }
        return H;
      }).then((H) => {
        return j.mergeObjectSync(Y, H);
      });
    else
      return j.mergeObjectSync(Y, G);
  }
  get shape() {
    return this._def.shape();
  }
  strict($) {
    return D.errToObj, new I({ ...this._def, unknownKeys: "strict", ...$ !== void 0 ? { errorMap: (Q, Y) => {
      var X, J, W, q;
      const G = (W = (J = (X = this._def).errorMap) === null || J === void 0 ? void 0 : J.call(X, Q, Y).message) !== null && W !== void 0 ? W : Y.defaultError;
      if (Q.code === "unrecognized_keys")
        return { message: (q = D.errToObj($).message) !== null && q !== void 0 ? q : G };
      return { message: G };
    } } : {} });
  }
  strip() {
    return new I({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new I({ ...this._def, unknownKeys: "passthrough" });
  }
  extend($) {
    return new I({ ...this._def, shape: () => ({ ...this._def.shape(), ...$ }) });
  }
  merge($) {
    return new I({ unknownKeys: $._def.unknownKeys, catchall: $._def.catchall, shape: () => ({ ...this._def.shape(), ...$._def.shape() }), typeName: L.ZodObject });
  }
  setKey($, Q) {
    return this.augment({ [$]: Q });
  }
  catchall($) {
    return new I({ ...this._def, catchall: $ });
  }
  pick($) {
    const Q = {};
    return A.objectKeys($).forEach((Y) => {
      if ($[Y] && this.shape[Y])
        Q[Y] = this.shape[Y];
    }), new I({ ...this._def, shape: () => Q });
  }
  omit($) {
    const Q = {};
    return A.objectKeys(this.shape).forEach((Y) => {
      if (!$[Y])
        Q[Y] = this.shape[Y];
    }), new I({ ...this._def, shape: () => Q });
  }
  deepPartial() {
    return b0(this);
  }
  partial($) {
    const Q = {};
    return A.objectKeys(this.shape).forEach((Y) => {
      const X = this.shape[Y];
      if ($ && !$[Y])
        Q[Y] = X;
      else
        Q[Y] = X.optional();
    }), new I({ ...this._def, shape: () => Q });
  }
  required($) {
    const Q = {};
    return A.objectKeys(this.shape).forEach((Y) => {
      if ($ && !$[Y])
        Q[Y] = this.shape[Y];
      else {
        let J = this.shape[Y];
        while (J instanceof s)
          J = J._def.innerType;
        Q[Y] = J;
      }
    }), new I({ ...this._def, shape: () => Q });
  }
  keyof() {
    return V6(A.objectKeys(this.shape));
  }
};
I.create = ($, Q) => {
  return new I({ shape: () => $, unknownKeys: "strip", catchall: a.create(), typeName: L.ZodObject, ...N(Q) });
};
I.strictCreate = ($, Q) => {
  return new I({ shape: () => $, unknownKeys: "strict", catchall: a.create(), typeName: L.ZodObject, ...N(Q) });
};
I.lazycreate = ($, Q) => {
  return new I({ shape: $, unknownKeys: "strip", catchall: a.create(), typeName: L.ZodObject, ...N(Q) });
};
var x0 = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = this._def.options;
    function X(J) {
      for (let q of J)
        if (q.result.status === "valid")
          return q.result;
      for (let q of J)
        if (q.result.status === "dirty")
          return Q.common.issues.push(...q.ctx.common.issues), q.result;
      const W = J.map((q) => new h(q.ctx.common.issues));
      return z(Q, { code: V.invalid_union, unionErrors: W }), K;
    }
    if (Q.common.async)
      return Promise.all(Y.map(async (J) => {
        const W = { ...Q, common: { ...Q.common, issues: [] }, parent: null };
        return { result: await J._parseAsync({ data: Q.data, path: Q.path, parent: W }), ctx: W };
      })).then(X);
    else {
      let J = void 0;
      const W = [];
      for (let G of Y) {
        const H = { ...Q, common: { ...Q.common, issues: [] }, parent: null }, B = G._parseSync({ data: Q.data, path: Q.path, parent: H });
        if (B.status === "valid")
          return B;
        else if (B.status === "dirty" && !J)
          J = { result: B, ctx: H };
        if (H.common.issues.length)
          W.push(H.common.issues);
      }
      if (J)
        return Q.common.issues.push(...J.ctx.common.issues), J.result;
      const q = W.map((G) => new h(G));
      return z(Q, { code: V.invalid_union, unionErrors: q }), K;
    }
  }
  get options() {
    return this._def.options;
  }
};
x0.create = ($, Q) => {
  return new x0({ options: $, typeName: L.ZodUnion, ...N(Q) });
};
var A1 = ($) => {
  if ($ instanceof Z0)
    return A1($.schema);
  else if ($ instanceof y)
    return A1($.innerType());
  else if ($ instanceof h0)
    return [$.value];
  else if ($ instanceof V0)
    return $.options;
  else if ($ instanceof y0)
    return Object.keys($.enum);
  else if ($ instanceof m0)
    return A1($._def.innerType);
  else if ($ instanceof k0)
    return [void 0];
  else if ($ instanceof T0)
    return [null];
  else
    return null;
};
var I1 = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== M.object)
      return z(Q, { code: V.invalid_type, expected: M.object, received: Q.parsedType }), K;
    const Y = this.discriminator, X = Q.data[Y], J = this.optionsMap.get(X);
    if (!J)
      return z(Q, { code: V.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [Y] }), K;
    if (Q.common.async)
      return J._parseAsync({ data: Q.data, path: Q.path, parent: Q });
    else
      return J._parseSync({ data: Q.data, path: Q.path, parent: Q });
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create($, Q, Y) {
    const X = /* @__PURE__ */ new Map();
    for (let J of Q) {
      const W = A1(J.shape[$]);
      if (!W)
        throw new Error(`A discriminator value for key \`${$}\` could not be extracted from all schema options`);
      for (let q of W) {
        if (X.has(q))
          throw new Error(`Discriminator property ${String($)} has duplicate value ${String(q)}`);
        X.set(q, J);
      }
    }
    return new I1({ typeName: L.ZodDiscriminatedUnion, discriminator: $, options: Q, optionsMap: X, ...N(Y) });
  }
};
var g0 = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($), X = (J, W) => {
      if (D$(J) || D$(W))
        return K;
      const q = L$(J.value, W.value);
      if (!q.valid)
        return z(Y, { code: V.invalid_intersection_types }), K;
      if (F$(J) || F$(W))
        Q.dirty();
      return { status: Q.value, value: q.data };
    };
    if (Y.common.async)
      return Promise.all([this._def.left._parseAsync({ data: Y.data, path: Y.path, parent: Y }), this._def.right._parseAsync({ data: Y.data, path: Y.path, parent: Y })]).then(([J, W]) => X(J, W));
    else
      return X(this._def.left._parseSync({ data: Y.data, path: Y.path, parent: Y }), this._def.right._parseSync({ data: Y.data, path: Y.path, parent: Y }));
  }
};
g0.create = ($, Q, Y) => {
  return new g0({ left: $, right: Q, typeName: L.ZodIntersection, ...N(Y) });
};
var t = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== M.array)
      return z(Y, { code: V.invalid_type, expected: M.array, received: Y.parsedType }), K;
    if (Y.data.length < this._def.items.length)
      return z(Y, { code: V.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: "array" }), K;
    if (!this._def.rest && Y.data.length > this._def.items.length)
      z(Y, { code: V.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: "array" }), Q.dirty();
    const J = [...Y.data].map((W, q) => {
      const G = this._def.items[q] || this._def.rest;
      if (!G)
        return null;
      return G._parse(new u(Y, W, Y.path, q));
    }).filter((W) => !!W);
    if (Y.common.async)
      return Promise.all(J).then((W) => {
        return j.mergeArray(Q, W);
      });
    else
      return j.mergeArray(Q, J);
  }
  get items() {
    return this._def.items;
  }
  rest($) {
    return new t({ ...this._def, rest: $ });
  }
};
t.create = ($, Q) => {
  if (!Array.isArray($))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new t({ items: $, typeName: L.ZodTuple, rest: null, ...N(Q) });
};
var Q1 = class extends R {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== M.object)
      return z(Y, { code: V.invalid_type, expected: M.object, received: Y.parsedType }), K;
    const X = [], J = this._def.keyType, W = this._def.valueType;
    for (let q in Y.data)
      X.push({ key: J._parse(new u(Y, q, Y.path, q)), value: W._parse(new u(Y, Y.data[q], Y.path, q)) });
    if (Y.common.async)
      return j.mergeObjectAsync(Q, X);
    else
      return j.mergeObjectSync(Q, X);
  }
  get element() {
    return this._def.valueType;
  }
  static create($, Q, Y) {
    if (Q instanceof R)
      return new Q1({ keyType: $, valueType: Q, typeName: L.ZodRecord, ...N(Y) });
    return new Q1({ keyType: l.create(), valueType: $, typeName: L.ZodRecord, ...N(Q) });
  }
};
var Y1 = class extends R {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== M.map)
      return z(Y, { code: V.invalid_type, expected: M.map, received: Y.parsedType }), K;
    const X = this._def.keyType, J = this._def.valueType, W = [...Y.data.entries()].map(([q, G], H) => {
      return { key: X._parse(new u(Y, q, Y.path, [H, "key"])), value: J._parse(new u(Y, G, Y.path, [H, "value"])) };
    });
    if (Y.common.async) {
      const q = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (let G of W) {
          const H = await G.key, B = await G.value;
          if (H.status === "aborted" || B.status === "aborted")
            return K;
          if (H.status === "dirty" || B.status === "dirty")
            Q.dirty();
          q.set(H.value, B.value);
        }
        return { status: Q.value, value: q };
      });
    } else {
      const q = /* @__PURE__ */ new Map();
      for (let G of W) {
        const { key: H, value: B } = G;
        if (H.status === "aborted" || B.status === "aborted")
          return K;
        if (H.status === "dirty" || B.status === "dirty")
          Q.dirty();
        q.set(H.value, B.value);
      }
      return { status: Q.value, value: q };
    }
  }
};
Y1.create = ($, Q, Y) => {
  return new Y1({ valueType: Q, keyType: $, typeName: L.ZodMap, ...N(Y) });
};
var F0 = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== M.set)
      return z(Y, { code: V.invalid_type, expected: M.set, received: Y.parsedType }), K;
    const X = this._def;
    if (X.minSize !== null) {
      if (Y.data.size < X.minSize.value)
        z(Y, { code: V.too_small, minimum: X.minSize.value, type: "set", inclusive: true, exact: false, message: X.minSize.message }), Q.dirty();
    }
    if (X.maxSize !== null) {
      if (Y.data.size > X.maxSize.value)
        z(Y, { code: V.too_big, maximum: X.maxSize.value, type: "set", inclusive: true, exact: false, message: X.maxSize.message }), Q.dirty();
    }
    const J = this._def.valueType;
    function W(G) {
      const H = /* @__PURE__ */ new Set();
      for (let B of G) {
        if (B.status === "aborted")
          return K;
        if (B.status === "dirty")
          Q.dirty();
        H.add(B.value);
      }
      return { status: Q.value, value: H };
    }
    const q = [...Y.data.values()].map((G, H) => J._parse(new u(Y, G, Y.path, H)));
    if (Y.common.async)
      return Promise.all(q).then((G) => W(G));
    else
      return W(q);
  }
  min($, Q) {
    return new F0({ ...this._def, minSize: { value: $, message: D.toString(Q) } });
  }
  max($, Q) {
    return new F0({ ...this._def, maxSize: { value: $, message: D.toString(Q) } });
  }
  size($, Q) {
    return this.min($, Q).max($, Q);
  }
  nonempty($) {
    return this.min(1, $);
  }
};
F0.create = ($, Q) => {
  return new F0({ valueType: $, minSize: null, maxSize: null, typeName: L.ZodSet, ...N(Q) });
};
var v0 = class extends R {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== M.function)
      return z(Q, { code: V.invalid_type, expected: M.function, received: Q.parsedType }), K;
    function Y(q, G) {
      return f1({ data: q, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, S1(), a0].filter((H) => !!H), issueData: { code: V.invalid_arguments, argumentsError: G } });
    }
    function X(q, G) {
      return f1({ data: q, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, S1(), a0].filter((H) => !!H), issueData: { code: V.invalid_return_type, returnTypeError: G } });
    }
    const J = { errorMap: Q.common.contextualErrorMap }, W = Q.data;
    if (this._def.returns instanceof L0) {
      const q = this;
      return T(async function(...G) {
        const H = new h([]), B = await q._def.args.parseAsync(G, J).catch((S) => {
          throw H.addIssue(Y(G, S)), H;
        }), w = await Reflect.apply(W, this, B);
        return await q._def.returns._def.type.parseAsync(w, J).catch((S) => {
          throw H.addIssue(X(w, S)), H;
        });
      });
    } else {
      const q = this;
      return T(function(...G) {
        const H = q._def.args.safeParse(G, J);
        if (!H.success)
          throw new h([Y(G, H.error)]);
        const B = Reflect.apply(W, this, H.data), w = q._def.returns.safeParse(B, J);
        if (!w.success)
          throw new h([X(B, w.error)]);
        return w.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...$) {
    return new v0({ ...this._def, args: t.create($).rest(H0.create()) });
  }
  returns($) {
    return new v0({ ...this._def, returns: $ });
  }
  implement($) {
    return this.parse($);
  }
  strictImplement($) {
    return this.parse($);
  }
  static create($, Q, Y) {
    return new v0({ args: $ ? $ : t.create([]).rest(H0.create()), returns: Q || H0.create(), typeName: L.ZodFunction, ...N(Y) });
  }
};
var Z0 = class extends R {
  get schema() {
    return this._def.getter();
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    return this._def.getter()._parse({ data: Q.data, path: Q.path, parent: Q });
  }
};
Z0.create = ($, Q) => {
  return new Z0({ getter: $, typeName: L.ZodLazy, ...N(Q) });
};
var h0 = class extends R {
  _parse($) {
    if ($.data !== this._def.value) {
      const Q = this._getOrReturnCtx($);
      return z(Q, { received: Q.data, code: V.invalid_literal, expected: this._def.value }), K;
    }
    return { status: "valid", value: $.data };
  }
  get value() {
    return this._def.value;
  }
};
h0.create = ($, Q) => {
  return new h0({ value: $, typeName: L.ZodLiteral, ...N(Q) });
};
var V0 = class extends R {
  _parse($) {
    if (typeof $.data !== "string") {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return z(Q, { expected: A.joinValues(Y), received: Q.parsedType, code: V.invalid_type }), K;
    }
    if (this._def.values.indexOf($.data) === -1) {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return z(Q, { received: Q.data, code: V.invalid_enum_value, options: Y }), K;
    }
    return T($.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const $ = {};
    for (let Q of this._def.values)
      $[Q] = Q;
    return $;
  }
  get Values() {
    const $ = {};
    for (let Q of this._def.values)
      $[Q] = Q;
    return $;
  }
  get Enum() {
    const $ = {};
    for (let Q of this._def.values)
      $[Q] = Q;
    return $;
  }
  extract($) {
    return V0.create($);
  }
  exclude($) {
    return V0.create(this.options.filter((Q) => !$.includes(Q)));
  }
};
V0.create = V6;
var y0 = class extends R {
  _parse($) {
    const Q = A.getValidEnumValues(this._def.values), Y = this._getOrReturnCtx($);
    if (Y.parsedType !== M.string && Y.parsedType !== M.number) {
      const X = A.objectValues(Q);
      return z(Y, { expected: A.joinValues(X), received: Y.parsedType, code: V.invalid_type }), K;
    }
    if (Q.indexOf($.data) === -1) {
      const X = A.objectValues(Q);
      return z(Y, { received: Y.data, code: V.invalid_enum_value, options: X }), K;
    }
    return T($.data);
  }
  get enum() {
    return this._def.values;
  }
};
y0.create = ($, Q) => {
  return new y0({ values: $, typeName: L.ZodNativeEnum, ...N(Q) });
};
var L0 = class extends R {
  unwrap() {
    return this._def.type;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== M.promise && Q.common.async === false)
      return z(Q, { code: V.invalid_type, expected: M.promise, received: Q.parsedType }), K;
    const Y = Q.parsedType === M.promise ? Q.data : Promise.resolve(Q.data);
    return T(Y.then((X) => {
      return this._def.type.parseAsync(X, { path: Q.path, errorMap: Q.common.contextualErrorMap });
    }));
  }
};
L0.create = ($, Q) => {
  return new L0({ type: $, typeName: L.ZodPromise, ...N(Q) });
};
var y = class extends R {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === L.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($), X = this._def.effect || null, J = { addIssue: (W) => {
      if (z(Y, W), W.fatal)
        Q.abort();
      else
        Q.dirty();
    }, get path() {
      return Y.path;
    } };
    if (J.addIssue = J.addIssue.bind(J), X.type === "preprocess") {
      const W = X.transform(Y.data, J);
      if (Y.common.issues.length)
        return { status: "dirty", value: Y.data };
      if (Y.common.async)
        return Promise.resolve(W).then((q) => {
          return this._def.schema._parseAsync({ data: q, path: Y.path, parent: Y });
        });
      else
        return this._def.schema._parseSync({ data: W, path: Y.path, parent: Y });
    }
    if (X.type === "refinement") {
      const W = (q) => {
        const G = X.refinement(q, J);
        if (Y.common.async)
          return Promise.resolve(G);
        if (G instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return q;
      };
      if (Y.common.async === false) {
        const q = this._def.schema._parseSync({ data: Y.data, path: Y.path, parent: Y });
        if (q.status === "aborted")
          return K;
        if (q.status === "dirty")
          Q.dirty();
        return W(q.value), { status: Q.value, value: q.value };
      } else
        return this._def.schema._parseAsync({ data: Y.data, path: Y.path, parent: Y }).then((q) => {
          if (q.status === "aborted")
            return K;
          if (q.status === "dirty")
            Q.dirty();
          return W(q.value).then(() => {
            return { status: Q.value, value: q.value };
          });
        });
    }
    if (X.type === "transform")
      if (Y.common.async === false) {
        const W = this._def.schema._parseSync({ data: Y.data, path: Y.path, parent: Y });
        if (!t0(W))
          return W;
        const q = X.transform(W.value, J);
        if (q instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: Q.value, value: q };
      } else
        return this._def.schema._parseAsync({ data: Y.data, path: Y.path, parent: Y }).then((W) => {
          if (!t0(W))
            return W;
          return Promise.resolve(X.transform(W.value, J)).then((q) => ({ status: Q.value, value: q }));
        });
    A.assertNever(X);
  }
};
y.create = ($, Q, Y) => {
  return new y({ schema: $, typeName: L.ZodEffects, effect: Q, ...N(Y) });
};
y.createWithPreprocess = ($, Q, Y) => {
  return new y({ schema: Q, effect: { type: "preprocess", transform: $ }, typeName: L.ZodEffects, ...N(Y) });
};
var s = class extends R {
  _parse($) {
    if (this._getType($) === M.undefined)
      return T(void 0);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
s.create = ($, Q) => {
  return new s({ innerType: $, typeName: L.ZodOptional, ...N(Q) });
};
var M0 = class extends R {
  _parse($) {
    if (this._getType($) === M.null)
      return T(null);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
M0.create = ($, Q) => {
  return new M0({ innerType: $, typeName: L.ZodNullable, ...N(Q) });
};
var m0 = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    let Y = Q.data;
    if (Q.parsedType === M.undefined)
      Y = this._def.defaultValue();
    return this._def.innerType._parse({ data: Y, path: Q.path, parent: Q });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
m0.create = ($, Q) => {
  return new m0({ innerType: $, typeName: L.ZodDefault, defaultValue: typeof Q.default === "function" ? Q.default : () => Q.default, ...N(Q) });
};
var X1 = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = { ...Q, common: { ...Q.common, issues: [] } }, X = this._def.innerType._parse({ data: Y.data, path: Y.path, parent: { ...Y } });
    if (C1(X))
      return X.then((J) => {
        return { status: "valid", value: J.status === "valid" ? J.value : this._def.catchValue({ get error() {
          return new h(Y.common.issues);
        }, input: Y.data }) };
      });
    else
      return { status: "valid", value: X.status === "valid" ? X.value : this._def.catchValue({ get error() {
        return new h(Y.common.issues);
      }, input: Y.data }) };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
X1.create = ($, Q) => {
  return new X1({ innerType: $, typeName: L.ZodCatch, catchValue: typeof Q.catch === "function" ? Q.catch : () => Q.catch, ...N(Q) });
};
var J1 = class extends R {
  _parse($) {
    if (this._getType($) !== M.nan) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.nan, received: Y.parsedType }), K;
    }
    return { status: "valid", value: $.data };
  }
};
J1.create = ($) => {
  return new J1({ typeName: L.ZodNaN, ...N($) });
};
var o8 = Symbol("zod_brand");
var K$ = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = Q.data;
    return this._def.type._parse({ data: Y, path: Q.path, parent: Q });
  }
  unwrap() {
    return this._def.type;
  }
};
var q1 = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.common.async)
      return (async () => {
        const J = await this._def.in._parseAsync({ data: Y.data, path: Y.path, parent: Y });
        if (J.status === "aborted")
          return K;
        if (J.status === "dirty")
          return Q.dirty(), B6(J.value);
        else
          return this._def.out._parseAsync({ data: J.value, path: Y.path, parent: Y });
      })();
    else {
      const X = this._def.in._parseSync({ data: Y.data, path: Y.path, parent: Y });
      if (X.status === "aborted")
        return K;
      if (X.status === "dirty")
        return Q.dirty(), { status: "dirty", value: X.value };
      else
        return this._def.out._parseSync({ data: X.value, path: Y.path, parent: Y });
    }
  }
  static create($, Q) {
    return new q1({ in: $, out: Q, typeName: L.ZodPipeline });
  }
};
var W1 = class extends R {
  _parse($) {
    const Q = this._def.innerType._parse($);
    if (t0(Q))
      Q.value = Object.freeze(Q.value);
    return Q;
  }
};
W1.create = ($, Q) => {
  return new W1({ innerType: $, typeName: L.ZodReadonly, ...N(Q) });
};
var M6 = ($, Q = {}, Y) => {
  if ($)
    return D0.create().superRefine((X, J) => {
      var W, q;
      if (!$(X)) {
        const G = typeof Q === "function" ? Q(X) : typeof Q === "string" ? { message: Q } : Q, H = (q = (W = G.fatal) !== null && W !== void 0 ? W : Y) !== null && q !== void 0 ? q : true, B = typeof G === "string" ? { message: G } : G;
        J.addIssue({ code: "custom", ...B, fatal: H });
      }
    });
  return D0.create();
};
var r8 = { object: I.lazycreate };
var L;
(function($) {
  $.ZodString = "ZodString", $.ZodNumber = "ZodNumber", $.ZodNaN = "ZodNaN", $.ZodBigInt = "ZodBigInt", $.ZodBoolean = "ZodBoolean", $.ZodDate = "ZodDate", $.ZodSymbol = "ZodSymbol", $.ZodUndefined = "ZodUndefined", $.ZodNull = "ZodNull", $.ZodAny = "ZodAny", $.ZodUnknown = "ZodUnknown", $.ZodNever = "ZodNever", $.ZodVoid = "ZodVoid", $.ZodArray = "ZodArray", $.ZodObject = "ZodObject", $.ZodUnion = "ZodUnion", $.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", $.ZodIntersection = "ZodIntersection", $.ZodTuple = "ZodTuple", $.ZodRecord = "ZodRecord", $.ZodMap = "ZodMap", $.ZodSet = "ZodSet", $.ZodFunction = "ZodFunction", $.ZodLazy = "ZodLazy", $.ZodLiteral = "ZodLiteral", $.ZodEnum = "ZodEnum", $.ZodEffects = "ZodEffects", $.ZodNativeEnum = "ZodNativeEnum", $.ZodOptional = "ZodOptional", $.ZodNullable = "ZodNullable", $.ZodDefault = "ZodDefault", $.ZodCatch = "ZodCatch", $.ZodPromise = "ZodPromise", $.ZodBranded = "ZodBranded", $.ZodPipeline = "ZodPipeline", $.ZodReadonly = "ZodReadonly";
})(L || (L = {}));
var s8 = ($, Q = { message: `Input not instance of ${$.name}` }) => M6((Y) => Y instanceof $, Q);
var z6 = l.create;
var U6 = G0.create;
var a8 = J1.create;
var t8 = B0.create;
var w6 = j0.create;
var e8 = O0.create;
var $4 = e0.create;
var Q4 = k0.create;
var Y4 = T0.create;
var X4 = D0.create;
var J4 = H0.create;
var W4 = a.create;
var q4 = $1.create;
var H4 = c.create;
var G4 = I.create;
var B4 = I.strictCreate;
var V4 = x0.create;
var M4 = I1.create;
var z4 = g0.create;
var U4 = t.create;
var w4 = Q1.create;
var O4 = Y1.create;
var D4 = F0.create;
var F4 = v0.create;
var L4 = Z0.create;
var K4 = h0.create;
var N4 = V0.create;
var R4 = y0.create;
var E4 = L0.create;
var H6 = y.create;
var A4 = s.create;
var S4 = M0.create;
var f4 = y.createWithPreprocess;
var C4 = q1.create;
var I4 = () => z6().optional();
var P4 = () => U6().optional();
var _4 = () => w6().optional();
var b4 = { string: ($) => l.create({ ...$, coerce: true }), number: ($) => G0.create({ ...$, coerce: true }), boolean: ($) => j0.create({ ...$, coerce: true }), bigint: ($) => B0.create({ ...$, coerce: true }), date: ($) => O0.create({ ...$, coerce: true }) };
var v4 = K;
var U = Object.freeze({ __proto__: null, defaultErrorMap: a0, setErrorMap: x8, getErrorMap: S1, makeIssue: f1, EMPTY_PATH: g8, addIssueToContext: z, ParseStatus: j, INVALID: K, DIRTY: B6, OK: T, isAborted: D$, isDirty: F$, isValid: t0, isAsync: C1, get util() {
  return A;
}, get objectUtil() {
  return O$;
}, ZodParsedType: M, getParsedType: q0, ZodType: R, ZodString: l, ZodNumber: G0, ZodBigInt: B0, ZodBoolean: j0, ZodDate: O0, ZodSymbol: e0, ZodUndefined: k0, ZodNull: T0, ZodAny: D0, ZodUnknown: H0, ZodNever: a, ZodVoid: $1, ZodArray: c, ZodObject: I, ZodUnion: x0, ZodDiscriminatedUnion: I1, ZodIntersection: g0, ZodTuple: t, ZodRecord: Q1, ZodMap: Y1, ZodSet: F0, ZodFunction: v0, ZodLazy: Z0, ZodLiteral: h0, ZodEnum: V0, ZodNativeEnum: y0, ZodPromise: L0, ZodEffects: y, ZodTransformer: y, ZodOptional: s, ZodNullable: M0, ZodDefault: m0, ZodCatch: X1, ZodNaN: J1, BRAND: o8, ZodBranded: K$, ZodPipeline: q1, ZodReadonly: W1, custom: M6, Schema: R, ZodSchema: R, late: r8, get ZodFirstPartyTypeKind() {
  return L;
}, coerce: b4, any: X4, array: H4, bigint: t8, boolean: w6, date: e8, discriminatedUnion: M4, effect: H6, enum: N4, function: F4, instanceof: s8, intersection: z4, lazy: L4, literal: K4, map: O4, nan: a8, nativeEnum: R4, never: W4, null: Y4, nullable: S4, number: U6, object: G4, oboolean: _4, onumber: P4, optional: A4, ostring: I4, pipeline: C4, preprocess: f4, promise: E4, record: w4, set: D4, strictObject: B4, string: z6, symbol: $4, transformer: H6, tuple: U4, undefined: Q4, union: V4, unknown: J4, void: q4, NEVER: v4, ZodIssueCode: V, quotelessJson: T8, ZodError: h });
var O6 = U.object({ email: U.string().email(), img: U.string(), lid: U.string(), name: U.string(), uid: U.number().int(), introduction: U.string().optional(), pid: U.string(), delImg: U.string().optional() });
var N$ = U.object({ email: U.string().email(), img: U.string(), lid: U.string(), name: U.string(), uid: U.number().int(), introduction: U.string().optional() });
var D6 = U.object({ type: U.enum(["uid"]), uid: U.number().int() }).or(U.object({ type: U.enum(["email"]), email: U.string().email() })).or(U.object({ type: U.enum(["pid"]), pid: U.string() }));
var v5 = U.object({ type: U.enum(["uid"]), uid: U.number().int() }).or(U.object({ type: U.enum(["email"]), email: U.string().email() })).or(U.object({ type: U.enum(["pid"]), pid: U.string() }));
var F6 = U.object({ type: U.enum(["uid"]), uid: U.number().int() }).or(U.object({ type: U.enum(["email"]), email: U.string().email() }));
var L6 = U.object({ type: U.enum(["uid"]), uid: U.number().int() }).or(U.object({ type: U.enum(["email"]), email: U.string().email() }));
var K6 = U.object({ type: U.enum(["uid"]), uid: U.number().int(), is: U.number(), pid: U.string() }).or(U.object({ type: U.enum(["email"]), email: U.string().email(), is: U.number(), pid: U.string() }));
var j5 = U.object({ group: U.object({ gid: U.string() }).array(), chat: U.object({ uid: U.number() }).array() });
var k4 = typeof global == "object" && global && global.Object === Object && global;
var P1 = k4;
var T4 = typeof self == "object" && self && self.Object === Object && self;
var x4 = P1 || T4 || Function("return this")();
var k = x4;
var g4 = k.Symbol;
var l0 = g4;
var y4 = function($) {
  var Q = Z4.call($, H1), Y = $[H1];
  try {
    $[H1] = void 0;
    var X = true;
  } catch (W) {
  }
  var J = h4.call($);
  if (X)
    if (Q)
      $[H1] = Y;
    else
      delete $[H1];
  return J;
};
var N6 = Object.prototype;
var Z4 = N6.hasOwnProperty;
var h4 = N6.toString;
var H1 = l0 ? l0.toStringTag : void 0;
var R6 = y4;
var c4 = function($) {
  return l4.call($);
};
var m4 = Object.prototype;
var l4 = m4.toString;
var E6 = c4;
var p4 = function($) {
  if ($ == null)
    return $ === void 0 ? n4 : u4;
  return A6 && A6 in Object($) ? R6($) : E6($);
};
var u4 = "[object Null]";
var n4 = "[object Undefined]";
var A6 = l0 ? l0.toStringTag : void 0;
var n = p4;
var i4 = function($) {
  return $ != null && typeof $ == "object";
};
var z0 = i4;
var d4 = Array.isArray;
var U0 = d4;
var o4 = function($) {
  var Q = typeof $;
  return $ != null && (Q == "object" || Q == "function");
};
var K0 = o4;
var r4 = function($) {
  return $;
};
var S6 = r4;
var $2 = function($) {
  if (!K0($))
    return false;
  var Q = n($);
  return Q == a4 || Q == t4 || Q == s4 || Q == e4;
};
var s4 = "[object AsyncFunction]";
var a4 = "[object Function]";
var t4 = "[object GeneratorFunction]";
var e4 = "[object Proxy]";
var _1 = $2;
var Q2 = k["__core-js_shared__"];
var b1 = Q2;
var Y2 = function($) {
  return !!f6 && f6 in $;
};
var f6 = function() {
  var $ = /[^.]+$/.exec(b1 && b1.keys && b1.keys.IE_PROTO || "");
  return $ ? "Symbol(src)_1." + $ : "";
}();
var C6 = Y2;
var W2 = function($) {
  if ($ != null) {
    try {
      return J2.call($);
    } catch (Q) {
    }
    try {
      return $ + "";
    } catch (Q) {
    }
  }
  return "";
};
var X2 = Function.prototype;
var J2 = X2.toString;
var Y0 = W2;
var U2 = function($) {
  if (!K0($) || C6($))
    return false;
  var Q = _1($) ? z2 : H2;
  return Q.test(Y0($));
};
var q2 = /[\\^$.*+?()[\]{}|]/g;
var H2 = /^\[object .+?Constructor\]$/;
var G2 = Function.prototype;
var B2 = Object.prototype;
var V2 = G2.toString;
var M2 = B2.hasOwnProperty;
var z2 = RegExp("^" + V2.call(M2).replace(q2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var I6 = U2;
var w2 = function($, Q) {
  return $ == null ? void 0 : $[Q];
};
var P6 = w2;
var O2 = function($, Q) {
  var Y = P6($, Q);
  return I6(Y) ? Y : void 0;
};
var e = O2;
var D2 = e(k, "WeakMap");
var v1 = D2;
var F2 = function($, Q) {
  var Y = -1, X = $ == null ? 0 : $.length;
  while (++Y < X)
    if (Q($[Y], Y, $) === false)
      break;
  return $;
};
var _6 = F2;
var N2 = function($, Q) {
  var Y = typeof $;
  return Q = Q == null ? L2 : Q, !!Q && (Y == "number" || Y != "symbol" && K2.test($)) && ($ > -1 && $ % 1 == 0 && $ < Q);
};
var L2 = 9007199254740991;
var K2 = /^(?:0|[1-9]\d*)$/;
var b6 = N2;
var E2 = function($) {
  return typeof $ == "number" && $ > -1 && $ % 1 == 0 && $ <= R2;
};
var R2 = 9007199254740991;
var j1 = E2;
var A2 = function($) {
  return $ != null && j1($.length) && !_1($);
};
var c0 = A2;
var f2 = function($) {
  var Q = $ && $.constructor, Y = typeof Q == "function" && Q.prototype || S2;
  return $ === Y;
};
var S2 = Object.prototype;
var k1 = f2;
var C2 = function($, Q) {
  var Y = -1, X = Array($);
  while (++Y < $)
    X[Y] = Q(Y);
  return X;
};
var v6 = C2;
var P2 = function($) {
  return z0($) && n($) == I2;
};
var I2 = "[object Arguments]";
var R$ = P2;
var j6 = Object.prototype;
var _2 = j6.hasOwnProperty;
var b2 = j6.propertyIsEnumerable;
var v2 = R$(function() {
  return arguments;
}()) ? R$ : function($) {
  return z0($) && _2.call($, "callee") && !b2.call($, "callee");
};
var T1 = v2;
var g1 = {};
a1(g1, { default: () => {
  {
    return G1;
  }
} });
var j2 = function() {
  return false;
};
var k6 = j2;
var g6 = typeof g1 == "object" && g1 && !g1.nodeType && g1;
var T6 = g6 && typeof x1 == "object" && x1 && !x1.nodeType && x1;
var k2 = T6 && T6.exports === g6;
var x6 = k2 ? k.Buffer : void 0;
var T2 = x6 ? x6.isBuffer : void 0;
var x2 = T2 || k6;
var G1 = x2;
var q9 = function($) {
  return z0($) && j1($.length) && !!f[n($)];
};
var g2 = "[object Arguments]";
var Z2 = "[object Array]";
var h2 = "[object Boolean]";
var y2 = "[object Date]";
var m2 = "[object Error]";
var l2 = "[object Function]";
var c2 = "[object Map]";
var u2 = "[object Number]";
var n2 = "[object Object]";
var p2 = "[object RegExp]";
var i2 = "[object Set]";
var d2 = "[object String]";
var o2 = "[object WeakMap]";
var r2 = "[object ArrayBuffer]";
var s2 = "[object DataView]";
var a2 = "[object Float32Array]";
var t2 = "[object Float64Array]";
var e2 = "[object Int8Array]";
var $9 = "[object Int16Array]";
var Q9 = "[object Int32Array]";
var Y9 = "[object Uint8Array]";
var X9 = "[object Uint8ClampedArray]";
var J9 = "[object Uint16Array]";
var W9 = "[object Uint32Array]";
var f = {};
f[a2] = f[t2] = f[e2] = f[$9] = f[Q9] = f[Y9] = f[X9] = f[J9] = f[W9] = true;
f[g2] = f[Z2] = f[r2] = f[h2] = f[s2] = f[y2] = f[m2] = f[l2] = f[c2] = f[u2] = f[n2] = f[p2] = f[i2] = f[d2] = f[o2] = false;
var Z6 = q9;
var H9 = function($) {
  return function(Q) {
    return $(Q);
  };
};
var h6 = H9;
var h1 = {};
a1(h1, { default: () => {
  {
    return y1;
  }
} });
var y6 = typeof h1 == "object" && h1 && !h1.nodeType && h1;
var B1 = y6 && typeof Z1 == "object" && Z1 && !Z1.nodeType && Z1;
var G9 = B1 && B1.exports === y6;
var E$ = G9 && P1.process;
var B9 = function() {
  try {
    var $ = B1 && B1.require && B1.require("util").types;
    if ($)
      return $;
    return E$ && E$.binding && E$.binding("util");
  } catch (Q) {
  }
}();
var y1 = B9;
var m6 = y1 && y1.isTypedArray;
var V9 = m6 ? h6(m6) : Z6;
var m1 = V9;
var U9 = function($, Q) {
  var Y = U0($), X = !Y && T1($), J = !Y && !X && G1($), W = !Y && !X && !J && m1($), q = Y || X || J || W, G = q ? v6($.length, String) : [], H = G.length;
  for (var B in $)
    if ((Q || z9.call($, B)) && !(q && (B == "length" || J && (B == "offset" || B == "parent") || W && (B == "buffer" || B == "byteLength" || B == "byteOffset") || b6(B, H))))
      G.push(B);
  return G;
};
var M9 = Object.prototype;
var z9 = M9.hasOwnProperty;
var l6 = U9;
var w9 = function($, Q) {
  return function(Y) {
    return $(Q(Y));
  };
};
var c6 = w9;
var O9 = c6(Object.keys, Object);
var u6 = O9;
var L9 = function($) {
  if (!k1($))
    return u6($);
  var Q = [];
  for (var Y in Object($))
    if (F9.call($, Y) && Y != "constructor")
      Q.push(Y);
  return Q;
};
var D9 = Object.prototype;
var F9 = D9.hasOwnProperty;
var l1 = L9;
var K9 = function($) {
  return c0($) ? l6($) : l1($);
};
var n6 = K9;
var N9 = e(k, "Map");
var c1 = N9;
var R9 = e(k, "DataView");
var u1 = R9;
var E9 = e(k, "Promise");
var n1 = E9;
var A9 = e(k, "Set");
var p1 = A9;
var p6 = "[object Map]";
var S9 = "[object Object]";
var i6 = "[object Promise]";
var d6 = "[object Set]";
var o6 = "[object WeakMap]";
var r6 = "[object DataView]";
var f9 = Y0(u1);
var C9 = Y0(c1);
var I9 = Y0(n1);
var P9 = Y0(p1);
var _9 = Y0(v1);
var N0 = n;
if (u1 && N0(new u1(new ArrayBuffer(1))) != r6 || c1 && N0(new c1()) != p6 || n1 && N0(n1.resolve()) != i6 || p1 && N0(new p1()) != d6 || v1 && N0(new v1()) != o6)
  N0 = function($) {
    var Q = n($), Y = Q == S9 ? $.constructor : void 0, X = Y ? Y0(Y) : "";
    if (X)
      switch (X) {
        case f9:
          return r6;
        case C9:
          return p6;
        case I9:
          return i6;
        case P9:
          return d6;
        case _9:
          return o6;
      }
    return Q;
  };
var s6 = N0;
var b9 = function($) {
  return function(Q, Y, X) {
    var J = -1, W = Object(Q), q = X(Q), G = q.length;
    while (G--) {
      var H = q[$ ? G : ++J];
      if (Y(W[H], H, W) === false)
        break;
    }
    return Q;
  };
};
var a6 = b9;
var v9 = a6();
var t6 = v9;
var j9 = function($, Q) {
  return $ && t6($, Q, n6);
};
var e6 = j9;
var k9 = function($, Q) {
  return function(Y, X) {
    if (Y == null)
      return Y;
    if (!c0(Y))
      return $(Y, X);
    var J = Y.length, W = Q ? J : -1, q = Object(Y);
    while (Q ? W-- : ++W < J)
      if (X(q[W], W, q) === false)
        break;
    return Y;
  };
};
var $8 = k9;
var T9 = $8(e6);
var Q8 = T9;
var x9 = function($) {
  return typeof $ == "function" ? $ : S6;
};
var Y8 = x9;
var g9 = function($, Q) {
  var Y = U0($) ? _6 : Q8;
  return Y($, Y8(Q));
};
var V1 = g9;
var h9 = function($) {
  return typeof $ == "string" || !U0($) && z0($) && n($) == Z9;
};
var Z9 = "[object String]";
var i1 = h9;
var u9 = function($) {
  if ($ == null)
    return true;
  if (c0($) && (U0($) || typeof $ == "string" || typeof $.splice == "function" || G1($) || m1($) || T1($)))
    return !$.length;
  var Q = s6($);
  if (Q == y9 || Q == m9)
    return !$.size;
  if (k1($))
    return !l1($).length;
  for (var Y in $)
    if (c9.call($, Y))
      return false;
  return true;
};
var y9 = "[object Map]";
var m9 = "[object Set]";
var l9 = Object.prototype;
var c9 = l9.hasOwnProperty;
var A$ = u9;
var p = { header: {} };
async function w0($) {
  const Q = await i({ tag: $.toString(), action: "get" });
  if (Q[$] == "null" && Q[$] == null)
    return null;
  if (K0(Q[$]))
    return Q[$];
  return JSON.parse(Q[$]);
}
var i = async ($) => {
  $ = { ...$, user: "p2psaing", secret: "59c44c2f" };
  const Q = new FormData();
  for (let X in $)
    Q.set(X, i1($[X]) ? $[X] : JSON.stringify($[X]));
  const Y = new Headers();
  V1({ Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", "Accept-Encoding": "gzip, deflate, br, zstd", "Accept-Language": "zh-CN,zh;q=0.9", "Cache-Control": "max-age=0", Host: "localhost:8787", "Sec-Ch-Ua": '"Chromium";v="1", "Not(A:Brand";v="1", "Google Chrome";v="1"', "Sec-Ch-Ua-Mobile": "?0", "Sec-Ch-Ua-Platform": '"macOS"', "Sec-Fetch-Dest": "document", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Site": "none", "Sec-Fetch-User": "?1", "Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Macintosh; IBM Mac OS X 1_0_0) AppleWebKit/1.0 (KHTML, like Gecko) Chrome/1.0.0.0 Safari/1.0" }, (X, J) => Y.set(J, X));
  try {
    return console.log(Q), await (await fetch("https://tinywebdb.appinventor.space/api", { method: "POST", headers: Y, body: Q, redirect: "follow" })).json();
  } catch (X) {
    console.log("err:", X);
  }
};
var X8 = async () => (await i({ action: "count" })).count;
var n9 = async ($) => await i({ action: "delete", tag: $ });
var d1 = async ($) => await w0(`${$}.value`);
var o1 = async ($) => await w0(`${$}.value`);
var J8 = async ($) => await w0(`${$}.time`);
var W8 = async ($) => await w0(`${$}.time`);
var q8 = async ($, Q) => await n9(`${$}.store.${Q}`);
var u0 = async ($, Q) => await w0(`${$}.store.${Q}`);
var r1 = async ($, Q, Y) => {
  if (i1($))
    var X = await o1($);
  else
    var X = await d1($);
  await i({ action: "update", tag: `${X.email}.store.${Q}`, value: Y }), await i({ action: "update", tag: `${X.uid}.store.${Q}`, value: Y });
};
async function H8($) {
  const Q = p.header = $.req.header(), Y = D6.safeParse(await $.req.json()), X = U.string().safeParse(Q.authorization);
  if (Y.success)
    try {
      switch (Y.data.type) {
        case "uid":
          return $.json({ code: O.Code.success, data: await d1(Y.data.uid) }, 200);
        case "email":
          return $.json({ code: O.Code.success, data: await o1(Y.data.email) }, 200);
        case "pid": {
          if (X.success && await R1(X.data, $0.secret, "HS512"))
            return $.json({ code: O.Code.success, data: await w0(Y.data.pid) }, 200);
          return $.json({ code: O.Code.fail, data: { code: O.FailCode.unauthorization, message: "\u8BA4\u8BC1\u9519\u8BEF" } }, 401);
        }
      }
    } catch (J) {
      return $.json({ code: O.Code.success, data: J }, 500);
    }
  return $.json({ code: O.Code.fail, data: { code: O.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
}
var $0;
(function(n0) {
  n0.payload = { sub: "p2psaing", role: "wenxig", alg: "HS512" }, n0.secret = "vhbuioy78a32et6r7drtxfcyutfdresxyrtuyfdresxdfcgtyfui7uihfip239u0hjfaf2hf89h29fniune2iuf", n0.value = "";
})($0 || ($0 = {}));
$0.value = await W6($0.payload, $0.secret, $0.payload.alg);
var d = new M$();
d.get("/jwt", ($) => $.json({ code: O.Code.success, data: $0.value }, 200));
d.post("/user", H8).put(async ($) => {
  const Q = p.header = $.req.header(), Y = U.string().safeParse(Q.authorization);
  if (!(Y.success && await R1(Y.data, $0.secret, "HS512")))
    return $.json({ code: O.Code.fail, data: { code: O.FailCode.unauthorization, message: "\u8BA4\u8BC1\u9519\u8BEF" } }, 401);
  const X = await $.req.json();
  if (!O6.safeParse(X).success)
    return $.json({ code: O.Code.fail, data: { code: O.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
  try {
    console.log(await i({ tag: X.pid, value: X, action: "update" })), await i({ tag: `${X.uid}.value`, value: N$.parse(X), action: "update" }), await i({ tag: `${X.email}.value`, value: N$.parse(X), action: "update" });
    const J = (/* @__PURE__ */ new Date()).getTime();
    return await i({ tag: `${X.uid}.time`, value: J, action: "update" }), await i({ tag: `${X.email}.time`, value: J, action: "update" }), $.json({ code: O.Code.success, data: J }, 200);
  } catch (J) {
    return console.error(J), $.json({ code: O.Code.success, data: J }, 500);
  }
});
d.post("/user/has", async ($) => {
  const Q = await H8($), Y = await Q.json();
  if (Y.code == O.Code.success)
    return $.json({ code: O.Code.success, data: !A$(Y.data) }, 200);
  return $.json(Y, Q.status);
});
d.post("/user/address", async ($) => {
  p.header = $.req.header();
  const Q = L6.safeParse(await $.req.json());
  if (Q.success)
    try {
      switch (Q.data.type) {
        case "uid":
          return $.json({ code: O.Code.success, data: await u0(Q.data.uid, "address") }, 200);
        case "email":
          return $.json({ code: O.Code.success, data: await u0(Q.data.email, "address") }, 200);
      }
    } catch (Y) {
      return $.json({ code: O.Code.success, data: Y }, 500);
    }
  return $.json({ code: O.Code.fail, data: { code: O.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
}).patch(async ($) => {
  const Q = p.header = $.req.header(), Y = K6.safeParse(await $.req.json()), X = U.string().safeParse(Q.authorization);
  if (Y.success)
    try {
      if (X.success && await R1(X.data, $0.secret, "HS512")) {
        if (!await w0(Y.data.pid) || !(Y.data.type == "email" ? !await o1(Y.data.email) : await d1(Y.data.uid)))
          return $.json({ code: O.Code.fail, data: { code: O.FailCode.unauthorization, message: "\u7528\u6237\u4E0D\u5B58\u5728" } }, 404);
        switch (Y.data.type) {
          case "uid": {
            const J = JSON.parse(await u0(Y.data.uid, "address") || JSON.stringify({ group: [], chat: [] }));
            return J.chat.push({ uid: Y.data.is }), $.json({ code: O.Code.success, data: await r1(Y.data.uid, "address", JSON.stringify(J)) }, 200);
          }
          case "email": {
            const J = JSON.parse(await u0(Y.data.email, "address") || JSON.stringify({ group: [], chat: [] }));
            return J.chat.push({ uid: Y.data.is }), $.json({ code: O.Code.success, data: await r1(Y.data.email, "address", JSON.stringify(J)) }, 200);
          }
        }
      }
      return $.json({ code: O.Code.fail, data: { code: O.FailCode.unauthorization, message: "\u8BA4\u8BC1\u9519\u8BEF" } }, 401);
    } catch (J) {
      return $.json({ code: O.Code.success, data: J }, 500);
    }
  return $.json({ code: O.Code.fail, data: { code: O.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
});
d.post("/time", async ($) => {
  p.header = $.req.header();
  const Q = F6.safeParse(await $.req.json());
  if (Q.success)
    try {
      switch (Q.data.type) {
        case "uid":
          return $.json({ code: O.Code.success, data: await J8(Q.data.uid) }, 200);
        case "email":
          return $.json({ code: O.Code.success, data: await W8(Q.data.email) }, 200);
      }
    } catch (Y) {
      return $.json({ code: O.Code.success, data: Y }, 500);
    }
  return $.json({ code: O.Code.fail, data: { code: O.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
});
d.get("/count", async ($) => {
  return p.header = $.req.header(), $.json({ code: O.Code.success, data: await X8() }, 200);
});
d.all("/file/*", async ($) => {
  const Q = p.header = $.req.header(), Y = U.string().safeParse(Q.authorization).success ? Q.authorization : "", X = new Headers();
  V1(Q, (J, W) => X.set(W, J));
  try {
    switch (Y) {
      case "github":
        return X.set("Authorization", "token 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"), $.json({ code: O.Code.success, data: await fetch($.req.path.replace(/^\/file/g, "https://api.github.com"), { headers: X, body: await $.req.text(), method: $.req.method }) }, 401);
      case "smms":
        return X.set("Authorization", "bipd73BhOqJYyPnMr8e5kA64jtWREomu"), $.json({ code: O.Code.success, data: await fetch($.req.path.replace(/^\/file/g, "https://sm.ms"), { headers: X, body: await $.req.formData(), method: $.req.method }) }, 401);
      default:
        return $.json({ code: O.Code.fail, data: { code: O.FailCode.format, message: "\u4E0D\u5141\u8BB8\u7684\u53C2\u6570" } }, 405);
    }
  } catch (J) {
    return $.json({ code: O.Code.success, data: J }, 500);
  }
});
d.put("/user/:uid/store/*", async ($) => {
  p.header = $.req.header();
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await r1($.req.param().uid, Q, await $.req.text()), $.json({ code: O.Code.success, data: await $.req.json() });
  } catch (Y) {
    return $.json({ code: O.Code.success, data: Y }, 500);
  }
}).delete(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await q8($.req.param().uid, Q), $.json({ code: O.Code.success, data: await $.req.json() });
  } catch (Y) {
    return $.json({ code: O.Code.success, data: Y }, 500);
  }
}).get(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  p.header = $.req.header();
  try {
    return $.json({ code: O.Code.success, data: await u0($.req.param().uid, Q) });
  } catch (Y) {
    return $.json({ code: O.Code.success, data: Y }, 500);
  }
});
d.get("/echo/*", ($) => $.text($.req.url));
d.all("*", ($) => {
  return $.json({ code: O.Code.fail, data: { code: O.FailCode.falseMethod, message: "\u672A\u77E5\u7684\u8DEF\u5F84" } }, 405);
});
var K7 = d;

// ../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e3) {
  return {
    name: e3?.name,
    message: e3?.message ?? String(e3),
    stack: e3?.stack,
    cause: e3?.cause === void 0 ? void 0 : reduceError(e3.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e3) {
    const error = reduceError(e3);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// .wrangler/tmp/bundle-Qlajob/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...K7,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...K7.middleware ? K7.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// ../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-Qlajob/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
