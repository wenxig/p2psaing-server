// .wrangler/tmp/bundle-KnMzM5/checked-fetch.js
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
var M8 = Object.defineProperty;
var t1 = ($, Q) => {
  for (var Y in Q)
    M8($, Y, { get: Q[Y], enumerable: true, configurable: true, set: (X) => Q[Y] = () => X });
};
var I$ = { Stringify: 1, BeforeStream: 2, Stream: 3 };
var z8 = ($, Q) => {
  const Y = new String($);
  return Y.isEscaped = true, Y.callbacks = Q, Y;
};
var e1 = async ($, Q, Y, X, J) => {
  const W = $.callbacks;
  if (!W?.length)
    return Promise.resolve($);
  if (J)
    J[0] += $;
  else
    J = [$];
  const q = Promise.all(W.map((H) => H({ phase: Q, buffer: J, context: X }))).then((H) => Promise.all(H.filter(Boolean).map((G) => e1(G, Q, false, X, J))).then(() => J[0]));
  if (Y)
    return z8(await q, W);
  else
    return q;
};
var P$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var D = ($, Q, Y) => {
  return P$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var f0 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var k = ($, Q, Y, X) => {
  return P$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var w8 = "text/plain; charset=UTF-8";
var $$ = ($, Q = {}) => {
  return Object.entries(Q).forEach(([Y, X]) => $.set(Y, X)), $;
};
var C0;
var W0;
var _;
var f;
var u;
var q0;
var I0 = class {
  constructor($, Q) {
    if (this.env = {}, this._var = {}, this.finalized = false, this.error = void 0, f0(this, C0, 200), f0(this, W0, void 0), f0(this, _, void 0), f0(this, f, void 0), f0(this, u, void 0), f0(this, q0, true), this.layout = void 0, this.renderer = (Y) => this.html(Y), this.notFoundHandler = () => new Response(), this.render = (...Y) => this.renderer(...Y), this.setLayout = (Y) => this.layout = Y, this.getLayout = () => this.layout, this.setRenderer = (Y) => {
      this.renderer = Y;
    }, this.header = (Y, X, J) => {
      if (X === void 0) {
        if (D(this, _))
          D(this, _).delete(Y);
        else if (D(this, f))
          delete D(this, f)[Y.toLocaleLowerCase()];
        if (this.finalized)
          this.res.headers.delete(Y);
        return;
      }
      if (J?.append) {
        if (!D(this, _))
          k(this, q0, false), k(this, _, new Headers(D(this, f))), k(this, f, {});
        D(this, _).append(Y, X);
      } else if (D(this, _))
        D(this, _).set(Y, X);
      else
        D(this, f) ?? k(this, f, {}), D(this, f)[Y.toLowerCase()] = X;
      if (this.finalized)
        if (J?.append)
          this.res.headers.append(Y, X);
        else
          this.res.headers.set(Y, X);
    }, this.status = (Y) => {
      k(this, q0, false), k(this, C0, Y);
    }, this.set = (Y, X) => {
      this._var ?? (this._var = {}), this._var[Y] = X;
    }, this.get = (Y) => {
      return this._var ? this._var[Y] : void 0;
    }, this.newResponse = (Y, X, J) => {
      if (D(this, q0) && !J && !X && D(this, C0) === 200)
        return new Response(Y, { headers: D(this, f) });
      if (X && typeof X !== "number") {
        const q = $$(new Headers(X.headers), D(this, f));
        return new Response(Y, { headers: q, status: X.status ?? D(this, C0) });
      }
      const W = typeof X === "number" ? X : D(this, C0);
      if (D(this, f) ?? k(this, f, {}), D(this, _) ?? k(this, _, new Headers()), $$(D(this, _), D(this, f)), D(this, u))
        D(this, u).headers.forEach((q, H) => {
          D(this, _)?.set(H, q);
        }), $$(D(this, _), D(this, f));
      J ?? (J = {});
      for (let [q, H] of Object.entries(J))
        if (typeof H === "string")
          D(this, _).set(q, H);
        else {
          D(this, _).delete(q);
          for (let G of H)
            D(this, _).append(q, G);
        }
      return new Response(Y, { status: W, headers: D(this, _) });
    }, this.body = (Y, X, J) => {
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.text = (Y, X, J) => {
      if (!D(this, f)) {
        if (D(this, q0) && !J && !X)
          return new Response(Y);
        k(this, f, {});
      }
      return D(this, f)["content-type"] = w8, typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.json = (Y, X, J) => {
      const W = JSON.stringify(Y);
      return D(this, f) ?? k(this, f, {}), D(this, f)["content-type"] = "application/json; charset=UTF-8", typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
    }, this.html = (Y, X, J) => {
      if (D(this, f) ?? k(this, f, {}), D(this, f)["content-type"] = "text/html; charset=UTF-8", typeof Y === "object") {
        if (!(Y instanceof Promise))
          Y = Y.toString();
        if (Y instanceof Promise)
          return Y.then((W) => e1(W, I$.Stringify, false, {})).then((W) => {
            return typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
          });
      }
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.redirect = (Y, X = 302) => {
      return D(this, _) ?? k(this, _, new Headers()), D(this, _).set("Location", Y), this.newResponse(null, X);
    }, this.notFound = () => {
      return this.notFoundHandler(this);
    }, this.req = $, Q) {
      if (k(this, W0, Q.executionCtx), this.env = Q.env, Q.notFoundHandler)
        this.notFoundHandler = Q.notFoundHandler;
    }
  }
  get event() {
    if (D(this, W0) && "respondWith" in D(this, W0))
      return D(this, W0);
    else
      throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (D(this, W0))
      return D(this, W0);
    else
      throw Error("This context has no ExecutionContext");
  }
  get res() {
    return k(this, q0, false), D(this, u) || k(this, u, new Response("404 Not Found", { status: 404 }));
  }
  set res($) {
    if (k(this, q0, false), D(this, u) && $) {
      D(this, u).headers.delete("content-type");
      for (let [Q, Y] of D(this, u).headers.entries())
        if (Q === "set-cookie") {
          const X = D(this, u).headers.getSetCookie();
          $.headers.delete("set-cookie");
          for (let J of X)
            $.headers.append("set-cookie", J);
        } else
          $.headers.set(Q, Y);
    }
    k(this, u, $), this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
};
C0 = /* @__PURE__ */ new WeakMap();
W0 = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
q0 = /* @__PURE__ */ new WeakMap();
var Q$ = ($, Q, Y) => {
  return (X, J) => {
    let W = -1;
    return q(0);
    async function q(H) {
      if (H <= W)
        throw new Error("next() called multiple times");
      W = H;
      let G, B = false, U;
      if ($[H]) {
        if (U = $[H][0][0], X instanceof I0)
          X.req.routeIndex = H;
      } else
        U = H === $.length && J || void 0;
      if (!U) {
        if (X instanceof I0 && X.finalized === false && Y)
          G = await Y(X);
      } else
        try {
          G = await U(X, () => {
            return q(H + 1);
          });
        } catch (N) {
          if (N instanceof Error && X instanceof I0 && Q)
            X.error = N, G = await Q(N, X), B = true;
          else
            throw N;
        }
      if (G && (X.finalized === false || B))
        X.res = G;
      return X;
    }
  };
};
var Y$ = class extends Error {
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
var U8 = function($) {
  if ($ === null)
    return false;
  return $.startsWith("multipart/form-data") || $.startsWith("application/x-www-form-urlencoded");
};
async function O8($, Q) {
  const Y = await $.formData();
  if (Y)
    return D8(Y, Q);
  return {};
}
var D8 = function($, Q) {
  const Y = {};
  return $.forEach((X, J) => {
    if (!(Q.all || J.endsWith("[]")))
      Y[J] = X;
    else
      F8(Y, J, X);
  }), Y;
};
var L8 = function($) {
  return Array.isArray($);
};
var _$ = async ($, Q = { all: false }) => {
  const X = ($ instanceof U1 ? $.raw.headers : $.headers).get("Content-Type");
  if (U8(X))
    return O8($, Q);
  return {};
};
var F8 = ($, Q, Y) => {
  if ($[Q] && L8($[Q]))
    K8($[Q], Y);
  else if ($[Q])
    R8($, Q, Y);
  else
    $[Q] = Y;
};
var K8 = ($, Q) => {
  $.push(Q);
};
var R8 = ($, Q, Y) => {
  $[Q] = [$[Q], Y];
};
var J$ = ($) => {
  const Q = $.split("/");
  if (Q[0] === "")
    Q.shift();
  return Q;
};
var b$ = ($) => {
  const { groups: Q, path: Y } = N8($), X = J$(Y);
  return A8(X, Q);
};
var N8 = ($) => {
  const Q = [];
  return $ = $.replace(/\{[^}]+\}/g, (Y, X) => {
    const J = `@${X}`;
    return Q.push([J, Y]), J;
  }), { groups: Q, path: $ };
};
var A8 = ($, Q) => {
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
var O1 = {};
var W$ = ($) => {
  if ($ === "*")
    return "*";
  const Q = $.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (Q) {
    if (!O1[$])
      if (Q[2])
        O1[$] = [$, Q[1], new RegExp("^" + Q[2] + "$")];
      else
        O1[$] = [$, Q[1], true];
    return O1[$];
  }
  return null;
};
var q$ = ($) => {
  const Q = $.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return Q ? Q[1] : "";
};
var v$ = ($) => {
  const Q = $.indexOf("?", 8);
  return Q === -1 ? "" : "?" + $.slice(Q + 1);
};
var j$ = ($) => {
  const Q = q$($);
  return Q.length > 1 && Q[Q.length - 1] === "/" ? Q.slice(0, -1) : Q;
};
var P0 = (...$) => {
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
var D1 = ($) => {
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
var X$ = ($) => {
  if (!/[%+]/.test($))
    return $;
  if ($.indexOf("+") !== -1)
    $ = $.replace(/\+/g, " ");
  return /%/.test($) ? o0($) : $;
};
var k$ = ($, Q, Y) => {
  let X;
  if (!Y && Q && !/[%+]/.test(Q)) {
    let q = $.indexOf(`?${Q}`, 8);
    if (q === -1)
      q = $.indexOf(`&${Q}`, 8);
    while (q !== -1) {
      const H = $.charCodeAt(q + Q.length + 1);
      if (H === 61) {
        const G = q + Q.length + 2, B = $.indexOf("&", G);
        return X$($.slice(G, B === -1 ? void 0 : B));
      } else if (H == 38 || isNaN(H))
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
    let H = $.indexOf("=", W);
    if (H > q && q !== -1)
      H = -1;
    let G = $.slice(W + 1, H === -1 ? q === -1 ? void 0 : q : H);
    if (X)
      G = X$(G);
    if (W = q, G === "")
      continue;
    let B;
    if (H === -1)
      B = "";
    else if (B = $.slice(H + 1, q === -1 ? void 0 : q), X)
      B = X$(B);
    if (Y) {
      if (!(J[G] && Array.isArray(J[G])))
        J[G] = [];
      J[G].push(B);
    } else
      J[G] ?? (J[G] = B);
  }
  return Q ? J[Q] : J;
};
var T$ = k$;
var x$ = ($, Q) => {
  return k$($, Q, true);
};
var o0 = decodeURIComponent;
var h$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var Y0 = ($, Q, Y) => {
  return h$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var g$ = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var Z$ = ($, Q, Y, X) => {
  return h$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var r0;
var s;
var U1 = class {
  constructor($, Q = "/", Y = [[]]) {
    g$(this, r0, void 0), g$(this, s, void 0), this.routeIndex = 0, this.bodyCache = {}, this.cachedBody = (X) => {
      const { bodyCache: J, raw: W } = this, q = J[X];
      if (q)
        return q;
      if (J.arrayBuffer)
        return (async () => {
          return await new Response(J.arrayBuffer)[X]();
        })();
      return J[X] = W[X]();
    }, this.raw = $, this.path = Q, Z$(this, s, Y), Z$(this, r0, {});
  }
  param($) {
    return $ ? this.getDecodedParam($) : this.getAllDecodedParams();
  }
  getDecodedParam($) {
    const Q = Y0(this, s)[0][this.routeIndex][1][$], Y = this.getParamValue(Q);
    return Y ? /\%/.test(Y) ? o0(Y) : Y : void 0;
  }
  getAllDecodedParams() {
    const $ = {}, Q = Object.keys(Y0(this, s)[0][this.routeIndex][1]);
    for (let Y of Q) {
      const X = this.getParamValue(Y0(this, s)[0][this.routeIndex][1][Y]);
      if (X && typeof X === "string")
        $[Y] = /\%/.test(X) ? o0(X) : X;
    }
    return $;
  }
  getParamValue($) {
    return Y0(this, s)[1] ? Y0(this, s)[1][$] : $;
  }
  query($) {
    return T$(this.url, $);
  }
  queries($) {
    return x$(this.url, $);
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
    const Q = await _$(this, $);
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
    Y0(this, r0)[$] = Q;
  }
  valid($) {
    return Y0(this, r0)[$];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return Y0(this, s)[0].map(([[, $]]) => $);
  }
  get routePath() {
    return Y0(this, s)[0].map(([[, $]]) => $)[this.routeIndex].path;
  }
};
r0 = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakMap();
var P = "ALL";
var y$ = "all";
var m$ = ["get", "post", "put", "delete", "options", "patch"];
var F1 = "Can not add a route since the matcher is already built.";
var L1 = class extends Error {
};
var f8 = function() {
  return class {
  };
};
var c$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var K1 = ($, Q, Y) => {
  return c$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var E8 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var R1 = ($, Q, Y, X) => {
  return c$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var S8 = Symbol("composedHandler");
var C8 = ($) => {
  return $.text("404 Not Found", 404);
};
var l$ = ($, Q) => {
  if ($ instanceof Y$)
    return $.getResponse();
  return console.error($), Q.text("Internal Server Error", 500);
};
var a;
var u$ = class extends f8() {
  constructor($ = {}) {
    super();
    this._basePath = "/", E8(this, a, "/"), this.routes = [], this.notFoundHandler = C8, this.errorHandler = l$, this.onError = (X) => {
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
      const H = /^https?:\/\//.test(X) ? X : `http://localhost${P0("/", X)}`, G = new Request(H, J);
      return this.fetch(G, W, q);
    }, this.fire = () => {
      addEventListener("fetch", (X) => {
        X.respondWith(this.dispatch(X.request, X, void 0, X.request.method));
      });
    }, [...m$, y$].map((X) => {
      this[X] = (J, ...W) => {
        if (typeof J === "string")
          R1(this, a, J);
        else
          this.addRoute(X, K1(this, a), J);
        return W.map((q) => {
          if (typeof q !== "string")
            this.addRoute(X, K1(this, a), q);
        }), this;
      };
    }), this.on = (X, J, ...W) => {
      if (!X)
        return this;
      for (let q of [J].flat()) {
        R1(this, a, q);
        for (let H of [X].flat())
          W.map((G) => {
            this.addRoute(H.toUpperCase(), K1(this, a), G);
          });
      }
      return this;
    }, this.use = (X, ...J) => {
      if (typeof X === "string")
        R1(this, a, X);
      else
        R1(this, a, "*"), J.unshift(X);
      return J.map((W) => {
        this.addRoute(P, K1(this, a), W);
      }), this;
    };
    const Y = $.strict ?? true;
    delete $.strict, Object.assign(this, $), this.getPath = Y ? $.getPath ?? q$ : j$;
  }
  clone() {
    const $ = new u$({ router: this.router, getPath: this.getPath });
    return $.routes = this.routes, $;
  }
  route($, Q) {
    const Y = this.basePath($);
    if (!Q)
      return Y;
    return Q.routes.map((X) => {
      let J;
      if (Q.errorHandler === l$)
        J = X.handler;
      else
        J = async (W, q) => (await Q$([], Q.errorHandler)(W, () => X.handler(W, q))).res, J[S8] = X.handler;
      Y.addRoute(X.method, X.path, J);
    }), this;
  }
  basePath($) {
    const Q = this.clone();
    return Q._basePath = P0(this._basePath, $), Q;
  }
  mount($, Q, Y) {
    const X = P0(this._basePath, $), J = X === "/" ? 0 : X.length, W = async (q, H) => {
      let G = void 0;
      try {
        G = q.executionCtx;
      } catch {
      }
      const B = Y ? Y(q) : [q.env, G], U = Array.isArray(B) ? B : [B], N = v$(q.req.url), E = await Q(new Request(new URL((q.req.path.slice(J) || "/") + N, q.req.url), q.req.raw), ...U);
      if (E)
        return E;
      await H();
    };
    return this.addRoute(P, P0($, "*"), W), this;
  }
  addRoute($, Q, Y) {
    $ = $.toUpperCase(), Q = P0(this._basePath, Q);
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
    const J = this.getPath($, { env: Y }), W = this.matchRoute(X, J), q = new I0(new U1($, J, W), { env: Y, executionCtx: Q, notFoundHandler: this.notFoundHandler });
    if (W[0].length === 1) {
      let G;
      try {
        G = W[0][0][0][0](q, async () => {
          q.res = await this.notFoundHandler(q);
        });
      } catch (B) {
        return this.handleError(B, q);
      }
      return G instanceof Promise ? G.then((B) => B || (q.finalized ? q.res : this.notFoundHandler(q))).catch((B) => this.handleError(B, q)) : G;
    }
    const H = Q$(W[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const G = await H(q);
        if (!G.finalized)
          throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");
        return G.res;
      } catch (G) {
        return this.handleError(G, q);
      }
    })();
  }
};
var n$ = u$;
a = /* @__PURE__ */ new WeakMap();
var I8 = function($, Q) {
  if ($.length === 1)
    return Q.length === 1 ? $ < Q ? -1 : 1 : -1;
  if (Q.length === 1)
    return 1;
  if ($ === s0 || $ === a0)
    return 1;
  else if (Q === s0 || Q === a0)
    return -1;
  if ($ === N1)
    return 1;
  else if (Q === N1)
    return -1;
  return $.length === Q.length ? $ < Q ? -1 : 1 : Q.length - $.length;
};
var N1 = "[^/]+";
var s0 = ".*";
var a0 = "(?:|/.*)";
var _0 = Symbol();
var A1 = class {
  constructor() {
    this.children = {};
  }
  insert($, Q, Y, X, J) {
    if ($.length === 0) {
      if (this.index !== void 0)
        throw _0;
      if (J)
        return;
      this.index = Q;
      return;
    }
    const [W, ...q] = $, H = W === "*" ? q.length === 0 ? ["", "", s0] : ["", "", N1] : W === "/*" ? ["", "", a0] : W.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let G;
    if (H) {
      const B = H[1];
      let U = H[2] || N1;
      if (B && H[2]) {
        if (U = U.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(U))
          throw _0;
      }
      if (G = this.children[U], !G) {
        if (Object.keys(this.children).some((N) => N !== s0 && N !== a0))
          throw _0;
        if (J)
          return;
        if (G = this.children[U] = new A1(), B !== "")
          G.varIndex = X.varIndex++;
      }
      if (!J && B !== "")
        Y.push([B, G.varIndex]);
    } else if (G = this.children[W], !G) {
      if (Object.keys(this.children).some((B) => B.length > 1 && B !== s0 && B !== a0))
        throw _0;
      if (J)
        return;
      G = this.children[W] = new A1();
    }
    G.insert(q, Q, Y, X, J);
  }
  buildRegExpStr() {
    const Q = Object.keys(this.children).sort(I8).map((Y) => {
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
var p$ = class {
  constructor() {
    this.context = { varIndex: 0 }, this.root = new A1();
  }
  insert($, Q, Y) {
    const X = [], J = [];
    for (let q = 0; ; ) {
      let H = false;
      if ($ = $.replace(/\{[^}]+\}/g, (G) => {
        const B = `@\\${q}`;
        return J[q] = [B, G], q++, H = true, B;
      }), !H)
        break;
    }
    const W = $.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let q = J.length - 1; q >= 0; q--) {
      const [H] = J[q];
      for (let G = W.length - 1; G >= 0; G--)
        if (W[G].indexOf(H) !== -1) {
          W[G] = W[G].replace(H, J[q][1]);
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
var d$ = function($) {
  return H$[$] ?? (H$[$] = new RegExp($ === "*" ? "" : `^${$.replace(/\/\*/, "(?:|/.*)")}$`));
};
var _8 = function() {
  H$ = {};
};
var b8 = function($) {
  const Q = new p$(), Y = [];
  if ($.length === 0)
    return P8;
  const X = $.map((B) => [!/\*|\/:/.test(B[0]), ...B]).sort(([B, U], [N, E]) => B ? 1 : N ? -1 : U.length - E.length), J = {};
  for (let B = 0, U = -1, N = X.length; B < N; B++) {
    const [E, h, b] = X[B];
    if (E)
      J[h] = [b.map(([y]) => [y, {}]), i$];
    else
      U++;
    let Z;
    try {
      Z = Q.insert(h, U, E);
    } catch (y) {
      throw y === _0 ? new L1(h) : y;
    }
    if (E)
      continue;
    Y[U] = b.map(([y, E0]) => {
      const i0 = {};
      E0 -= 1;
      for (; E0 >= 0; E0--) {
        const [J0, w1] = Z[E0];
        i0[J0] = w1;
      }
      return [y, i0];
    });
  }
  const [W, q, H] = Q.buildRegExp();
  for (let B = 0, U = Y.length; B < U; B++)
    for (let N = 0, E = Y[B].length; N < E; N++) {
      const h = Y[B][N]?.[1];
      if (!h)
        continue;
      const b = Object.keys(h);
      for (let Z = 0, y = b.length; Z < y; Z++)
        h[b[Z]] = H[h[b[Z]]];
    }
  const G = [];
  for (let B in q)
    G[B] = Y[q[B]];
  return [W, G, J];
};
var b0 = function($, Q) {
  if (!$)
    return;
  for (let Y of Object.keys($).sort((X, J) => J.length - X.length))
    if (d$(Y).test(Q))
      return [...$[Y]];
  return;
};
var i$ = [];
var P8 = [/^$/, [], {}];
var H$ = {};
var G$ = class {
  constructor() {
    this.name = "RegExpRouter", this.middleware = { [P]: {} }, this.routes = { [P]: {} };
  }
  add($, Q, Y) {
    var X;
    const { middleware: J, routes: W } = this;
    if (!J || !W)
      throw new Error(F1);
    if (!J[$])
      [J, W].forEach((G) => {
        G[$] = {}, Object.keys(G[P]).forEach((B) => {
          G[$][B] = [...G[P][B]];
        });
      });
    if (Q === "/*")
      Q = "*";
    const q = (Q.match(/\/:/g) || []).length;
    if (/\*$/.test(Q)) {
      const G = d$(Q);
      if ($ === P)
        Object.keys(J).forEach((B) => {
          var U;
          (U = J[B])[Q] || (U[Q] = b0(J[B], Q) || b0(J[P], Q) || []);
        });
      else
        (X = J[$])[Q] || (X[Q] = b0(J[$], Q) || b0(J[P], Q) || []);
      Object.keys(J).forEach((B) => {
        if ($ === P || $ === B)
          Object.keys(J[B]).forEach((U) => {
            G.test(U) && J[B][U].push([Y, q]);
          });
      }), Object.keys(W).forEach((B) => {
        if ($ === P || $ === B)
          Object.keys(W[B]).forEach((U) => G.test(U) && W[B][U].push([Y, q]));
      });
      return;
    }
    const H = D1(Q) || [Q];
    for (let G = 0, B = H.length; G < B; G++) {
      const U = H[G];
      Object.keys(W).forEach((N) => {
        var E;
        if ($ === P || $ === N)
          (E = W[N])[U] || (E[U] = [...b0(J[N], U) || b0(J[P], U) || []]), W[N][U].push([Y, q - B + G + 1]);
      });
    }
  }
  match($, Q) {
    _8();
    const Y = this.buildAllMatchers();
    return this.match = (X, J) => {
      const W = Y[X] || Y[P], q = W[2][J];
      if (q)
        return q;
      const H = J.match(W[0]);
      if (!H)
        return [[], i$];
      const G = H.indexOf("", 1);
      return [W[1][G], H];
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
      return b8(Q);
  }
};
var B$ = class {
  constructor($) {
    this.name = "SmartRouter", this.routers = [], this.routes = [], Object.assign(this, $);
  }
  add($, Q, Y) {
    if (!this.routes)
      throw new Error(F1);
    this.routes.push([$, Q, Y]);
  }
  match($, Q) {
    if (!this.routes)
      throw new Error("Fatal error");
    const { routers: Y, routes: X } = this, J = Y.length;
    let W = 0, q;
    for (; W < J; W++) {
      const H = Y[W];
      try {
        X.forEach((G) => {
          H.add(...G);
        }), q = H.match($, Q);
      } catch (G) {
        if (G instanceof L1)
          continue;
        throw G;
      }
      this.match = H.match.bind(H), this.routers = [H], this.routes = void 0;
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
var V$ = class {
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
    const J = b$(Q), W = [], q = [];
    for (let B = 0, U = J.length; B < U; B++) {
      const N = J[B];
      if (Object.keys(X.children).includes(N)) {
        q.push(...X.patterns), X = X.children[N];
        const h = W$(N);
        if (h)
          W.push(h[1]);
        continue;
      }
      X.children[N] = new V$();
      const E = W$(N);
      if (E)
        X.patterns.push(E), q.push(...X.patterns), W.push(E[1]);
      q.push(...X.patterns), X = X.children[N];
    }
    if (!X.methods.length)
      X.methods = [];
    const H = {}, G = { handler: Y, possibleKeys: W.filter((B, U, N) => N.indexOf(B) === U), name: this.name, score: this.order };
    return H[$] = G, X.methods.push(H), X;
  }
  gHSets($, Q, Y, X) {
    const J = [];
    for (let W = 0, q = $.methods.length; W < q; W++) {
      const H = $.methods[W], G = H[Q] || H[P], B = {};
      if (G !== void 0)
        G.params = {}, G.possibleKeys.forEach((U) => {
          const N = B[G.name];
          G.params[U] = X[U] && !N ? X[U] : Y[U] ?? X[U], B[G.name] = true;
        }), J.push(G);
    }
    return J;
  }
  search($, Q) {
    const Y = [];
    this.params = {};
    let J = [this];
    const W = J$(Q);
    for (let H = 0, G = W.length; H < G; H++) {
      const B = W[H], U = H === G - 1, N = [];
      for (let E = 0, h = J.length; E < h; E++) {
        const b = J[E], Z = b.children[B];
        if (Z)
          if (Z.params = b.params, U === true) {
            if (Z.children["*"])
              Y.push(...this.gHSets(Z.children["*"], $, b.params, {}));
            Y.push(...this.gHSets(Z, $, b.params, {}));
          } else
            N.push(Z);
        for (let y = 0, E0 = b.patterns.length; y < E0; y++) {
          const i0 = b.patterns[y], J0 = { ...b.params };
          if (i0 === "*") {
            const a1 = b.children["*"];
            if (a1)
              Y.push(...this.gHSets(a1, $, b.params, {})), N.push(a1);
            continue;
          }
          if (B === "")
            continue;
          const [w1, f$, d0] = i0, S0 = b.children[w1], C$ = W.slice(H).join("/");
          if (d0 instanceof RegExp && d0.test(C$)) {
            J0[f$] = C$, Y.push(...this.gHSets(S0, $, b.params, J0));
            continue;
          }
          if (d0 === true || d0 instanceof RegExp && d0.test(B)) {
            if (typeof w1 === "string")
              if (J0[f$] = B, U === true) {
                if (Y.push(...this.gHSets(S0, $, J0, b.params)), S0.children["*"])
                  Y.push(...this.gHSets(S0.children["*"], $, J0, b.params));
              } else
                S0.params = J0, N.push(S0);
          }
        }
      }
      J = N;
    }
    return [Y.sort((H, G) => {
      return H.score - G.score;
    }).map(({ handler: H, params: G }) => [H, G])];
  }
};
var M$ = class {
  constructor() {
    this.name = "TrieRouter", this.node = new V$();
  }
  add($, Q, Y) {
    const X = D1(Q);
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
var z$ = class extends n$ {
  constructor($ = {}) {
    super($);
    this.router = $.router ?? new B$({ routers: [new G$(), new M$()] });
  }
};
var v0 = {};
t1(v0, { verify: () => {
  {
    return g8;
  }
}, sign: () => {
  {
    return x8;
  }
}, decode: () => {
  {
    return W6;
  }
} });
var o$ = ($) => {
  return j8($.replace(/_|-/g, (Q) => ({ _: "/", "-": "+" })[Q] ?? Q));
};
var w$ = ($) => v8($).replace(/\/|\+/g, (Q) => ({ "/": "_", "+": "-" })[Q] ?? Q);
var v8 = ($) => {
  let Q = "";
  const Y = new Uint8Array($);
  for (let X = 0, J = Y.length; X < J; X++)
    Q += String.fromCharCode(Y[X]);
  return btoa(Q);
};
var j8 = ($) => {
  const Q = atob($), Y = new Uint8Array(new ArrayBuffer(Q.length)), X = Q.length / 2;
  for (let J = 0, W = Q.length - 1; J <= X; J++, W--)
    Y[J] = Q.charCodeAt(J), Y[W] = Q.charCodeAt(W);
  return Y;
};
var r$ = class extends Error {
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
var s$ = class extends Error {
  constructor($) {
    super(`token (${$}) is being used before it's valid`);
    this.name = "JwtTokenNotBefore";
  }
};
var a$ = class extends Error {
  constructor($) {
    super(`token (${$}) expired`);
    this.name = "JwtTokenExpired";
  }
};
var t$ = class extends Error {
  constructor($, Q) {
    super(`Incorrect "iat" claim must be a older than "${$}" (iat: "${Q}")`);
    this.name = "JwtTokenIssuedAt";
  }
};
var e$ = class extends Error {
  constructor($) {
    super(`token(${$}) signature mismatched`);
    this.name = "JwtTokenSignatureMismatched";
  }
};
var k8 = new TextEncoder();
var T8 = new TextDecoder();
var $6 = ($) => w$(k8.encode(JSON.stringify($))).replace(/=/g, "");
var X6 = ($) => w$($).replace(/=/g, "");
var Q6 = ($) => JSON.parse(T8.decode(o$($)));
var Y6 = ($) => {
  switch ($.toUpperCase()) {
    case "HS256":
      return { name: "HMAC", hash: { name: "SHA-256" } };
    case "HS384":
      return { name: "HMAC", hash: { name: "SHA-384" } };
    case "HS512":
      return { name: "HMAC", hash: { name: "SHA-512" } };
    default:
      throw new r$($);
  }
};
var J6 = async ($, Q, Y = "HS256") => {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  const X = new TextEncoder(), J = await crypto.subtle.importKey("raw", X.encode(Q), Y6(Y), false, ["sign"]);
  return await crypto.subtle.sign(Y6(Y), J, X.encode($));
};
var x8 = async ($, Q, Y = "HS256") => {
  const X = $6($), W = `${$6({ alg: Y, typ: "JWT" })}.${X}`, q = await J6(W, Q, Y), H = X6(q);
  return `${W}.${H}`;
};
var g8 = async ($, Q, Y = "HS256") => {
  const X = $.split(".");
  if (X.length !== 3)
    throw new U$($);
  const { payload: J } = W6($), W = Math.floor(Date.now() / 1e3);
  if (J.nbf && J.nbf > W)
    throw new s$($);
  if (J.exp && J.exp <= W)
    throw new a$($);
  if (J.iat && W < J.iat)
    throw new t$(W, J.iat);
  const q = X.slice(0, 2).join("."), H = await J6(q, Q, Y);
  if (X6(H) !== X[2])
    throw new e$($);
  return J;
};
var W6 = ($) => {
  try {
    const [Q, Y] = $.split("."), X = Q6(Q), J = Q6(Y);
    return { header: X, payload: J };
  } catch (Q) {
    throw new U$($);
  }
};
var q6 = v0.verify;
var _5 = v0.decode;
var H6 = v0.sign;
var C;
(function(E1) {
  let $;
  (function(J) {
    J[J["success"] = 0] = "success";
    J[J["fail"] = 1] = "fail";
  })($ = E1.Code || (E1.Code = {}));
  let Q;
  (function(H) {
    H[H["notFound"] = 0] = "notFound";
    H[H["falseMethod"] = 1] = "falseMethod";
    H[H["unauthorization"] = 2] = "unauthorization";
    H[H["format"] = 3] = "format";
    H[H["server"] = 4] = "server";
  })(Q = E1.FailCode || (E1.FailCode = {}));
})(C || (C = {}));
var G6 = ($, Q) => Q.safeParse($).success;
var v = ($, Q, Y, X) => $.json({ code: C.Code.fail, data: { code: Y, message: Q } }, X);
var j = ($, Q, Y = 200) => $.json({ code: C.Code.success, data: Q }, Y);
var h8 = function($) {
  M6 = $;
};
var f1 = function() {
  return M6;
};
var z = function($, Q) {
  const Y = C1({ issueData: Q, data: $.data, path: $.path, errorMaps: [$.common.contextualErrorMap, $.schemaErrorMap, f1(), t0].filter((X) => !!X) });
  $.common.issues.push(Y);
};
var K = function($) {
  if (!$)
    return {};
  const { errorMap: Q, invalid_type_error: Y, required_error: X, description: J } = $;
  if (Q && (Y || X))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  if (Q)
    return { errorMap: Q, description: J };
  return { errorMap: (q, H) => {
    if (q.code !== "invalid_type")
      return { message: H.defaultError };
    if (typeof H.data === "undefined")
      return { message: X !== null && X !== void 0 ? X : H.defaultError };
    return { message: Y !== null && Y !== void 0 ? Y : H.defaultError };
  }, description: J };
};
var r8 = function($, Q) {
  if ((Q === "v4" || !Q) && i8.test($))
    return true;
  if ((Q === "v6" || !Q) && d8.test($))
    return true;
  return false;
};
var s8 = function($, Q) {
  const Y = ($.toString().split(".")[1] || "").length, X = (Q.toString().split(".")[1] || "").length, J = Y > X ? Y : X, W = parseInt($.toFixed(J).replace(".", "")), q = parseInt(Q.toFixed(J).replace(".", ""));
  return W % q / Math.pow(10, J);
};
var j0 = function($) {
  if ($ instanceof I) {
    const Q = {};
    for (let Y in $.shape) {
      const X = $.shape[Y];
      Q[Y] = t.create(j0(X));
    }
    return new I({ ...$._def, shape: () => Q });
  } else if ($ instanceof p)
    return new p({ ...$._def, type: j0($.element) });
  else if ($ instanceof t)
    return t.create(j0($.unwrap()));
  else if ($ instanceof z0)
    return z0.create(j0($.unwrap()));
  else if ($ instanceof $0)
    return $0.create($.items.map((Q) => j0(Q)));
  else
    return $;
};
var K$ = function($, Q) {
  const Y = H0($), X = H0(Q);
  if ($ === Q)
    return { valid: true, data: $ };
  else if (Y === M.object && X === M.object) {
    const J = A.objectKeys(Q), W = A.objectKeys($).filter((H) => J.indexOf(H) !== -1), q = { ...$, ...Q };
    for (let H of W) {
      const G = K$($[H], Q[H]);
      if (!G.valid)
        return { valid: false };
      q[H] = G.data;
    }
    return { valid: true, data: q };
  } else if (Y === M.array && X === M.array) {
    if ($.length !== Q.length)
      return { valid: false };
    const J = [];
    for (let W = 0; W < $.length; W++) {
      const q = $[W], H = Q[W], G = K$(q, H);
      if (!G.valid)
        return { valid: false };
      J.push(G.data);
    }
    return { valid: true, data: J };
  } else if (Y === M.date && X === M.date && +$ === +Q)
    return { valid: true, data: $ };
  else
    return { valid: false };
};
var w6 = function($, Q) {
  return new M0({ values: $, typeName: F.ZodEnum, ...K(Q) });
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
    const W = $.objectKeys(J).filter((H) => typeof J[J[H]] !== "number"), q = {};
    for (let H of W)
      q[H] = J[H];
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
var D$;
(function($) {
  $.mergeShapes = (Q, Y) => {
    return { ...Q, ...Y };
  };
})(D$ || (D$ = {}));
var M = A.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
var H0 = ($) => {
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
var Z8 = ($) => {
  return JSON.stringify($, null, 2).replace(/"([^"]+)":/g, "$1:");
};
var m = class extends Error {
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
          let q = Y, H = 0;
          while (H < W.path.length) {
            const G = W.path[H];
            if (H !== W.path.length - 1)
              q[G] = q[G] || { _errors: [] };
            else
              q[G] = q[G] || { _errors: [] }, q[G]._errors.push(Q(W));
            q = q[G], H++;
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
m.create = ($) => {
  return new m($);
};
var t0 = ($, Q) => {
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
var M6 = t0;
var C1 = ($) => {
  const { data: Q, path: Y, errorMaps: X, issueData: J } = $, W = [...Y, ...J.path || []], q = { ...J, path: W };
  let H = "";
  const G = X.filter((B) => !!B).slice().reverse();
  for (let B of G)
    H = B(q, { data: Q, defaultError: H }).message;
  return { ...J, path: W, message: J.message || H };
};
var y8 = [];
var T = class {
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
        return L;
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
    return T.mergeObjectSync($, Y);
  }
  static mergeObjectSync($, Q) {
    const Y = {};
    for (let X of Q) {
      const { key: J, value: W } = X;
      if (J.status === "aborted")
        return L;
      if (W.status === "aborted")
        return L;
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
var L = Object.freeze({ status: "aborted" });
var z6 = ($) => ({ status: "dirty", value: $ });
var g = ($) => ({ status: "valid", value: $ });
var F$ = ($) => $.status === "aborted";
var L$ = ($) => $.status === "dirty";
var e0 = ($) => $.status === "valid";
var I1 = ($) => typeof Promise !== "undefined" && $ instanceof Promise;
var O;
(function($) {
  $.errToObj = (Q) => typeof Q === "string" ? { message: Q } : Q || {}, $.toString = (Q) => typeof Q === "string" ? Q : Q === null || Q === void 0 ? void 0 : Q.message;
})(O || (O = {}));
var i = class {
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
var B6 = ($, Q) => {
  if (e0(Q))
    return { success: true, data: Q.value };
  else {
    if (!$.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return { success: false, get error() {
      if (this._error)
        return this._error;
      const Y = new m($.common.issues);
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
    return H0($.data);
  }
  _getOrReturnCtx($, Q) {
    return Q || { common: $.parent.common, data: $.data, parsedType: H0($.data), schemaErrorMap: this._def.errorMap, path: $.path, parent: $.parent };
  }
  _processInputParams($) {
    return { status: new T(), ctx: { common: $.parent.common, data: $.data, parsedType: H0($.data), schemaErrorMap: this._def.errorMap, path: $.path, parent: $.parent } };
  }
  _parseSync($) {
    const Q = this._parse($);
    if (I1(Q))
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
    const X = { common: { issues: [], async: (Y = Q === null || Q === void 0 ? void 0 : Q.async) !== null && Y !== void 0 ? Y : false, contextualErrorMap: Q === null || Q === void 0 ? void 0 : Q.errorMap }, path: (Q === null || Q === void 0 ? void 0 : Q.path) || [], schemaErrorMap: this._def.errorMap, parent: null, data: $, parsedType: H0($) }, J = this._parseSync({ data: $, path: X.path, parent: X });
    return B6(X, J);
  }
  async parseAsync($, Q) {
    const Y = await this.safeParseAsync($, Q);
    if (Y.success)
      return Y.data;
    throw Y.error;
  }
  async safeParseAsync($, Q) {
    const Y = { common: { issues: [], contextualErrorMap: Q === null || Q === void 0 ? void 0 : Q.errorMap, async: true }, path: (Q === null || Q === void 0 ? void 0 : Q.path) || [], schemaErrorMap: this._def.errorMap, parent: null, data: $, parsedType: H0($) }, X = this._parse({ data: $, path: Y.path, parent: Y }), J = await (I1(X) ? X : Promise.resolve(X));
    return B6(Y, J);
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
        return W.then((H) => {
          if (!H)
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
    return new l({ schema: this, typeName: F.ZodEffects, effect: { type: "refinement", refinement: $ } });
  }
  superRefine($) {
    return this._refinement($);
  }
  optional() {
    return t.create(this, this._def);
  }
  nullable() {
    return z0.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return p.create(this, this._def);
  }
  promise() {
    return R0.create(this, this._def);
  }
  or($) {
    return Z0.create([this, $], this._def);
  }
  and($) {
    return h0.create(this, $, this._def);
  }
  transform($) {
    return new l({ ...K(this._def), schema: this, typeName: F.ZodEffects, effect: { type: "transform", transform: $ } });
  }
  default($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new c0({ ...K(this._def), innerType: this, defaultValue: Q, typeName: F.ZodDefault });
  }
  brand() {
    return new R$({ typeName: F.ZodBranded, type: this, ...K(this._def) });
  }
  catch($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new J1({ ...K(this._def), innerType: this, catchValue: Q, typeName: F.ZodCatch });
  }
  describe($) {
    return new this.constructor({ ...this._def, description: $ });
  }
  pipe($) {
    return H1.create(this, $);
  }
  readonly() {
    return q1.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var m8 = /^c[^\s-]{8,}$/i;
var l8 = /^[a-z][a-z0-9]*$/;
var c8 = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var u8 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var n8 = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var p8 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
var O$;
var i8 = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var d8 = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var o8 = ($) => {
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
var n = class extends R {
  _parse($) {
    if (this._def.coerce)
      $.data = String($.data);
    if (this._getType($) !== M.string) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.string, received: J.parsedType }), L;
    }
    const Y = new T();
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
        if (!n8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "email", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "emoji") {
        if (!O$)
          O$ = new RegExp(p8, "u");
        if (!O$.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "emoji", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "uuid") {
        if (!u8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "uuid", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid") {
        if (!m8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "cuid", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid2") {
        if (!l8.test($.data))
          X = this._getOrReturnCtx($, X), z(X, { validation: "cuid2", code: V.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "ulid") {
        if (!c8.test($.data))
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
        if (!o8(J).test($.data))
          X = this._getOrReturnCtx($, X), z(X, { code: V.invalid_string, validation: "datetime", message: J.message }), Y.dirty();
      } else if (J.kind === "ip") {
        if (!r8($.data, J.version))
          X = this._getOrReturnCtx($, X), z(X, { validation: "ip", code: V.invalid_string, message: J.message }), Y.dirty();
      } else
        A.assertNever(J);
    return { status: Y.value, value: $.data };
  }
  _regex($, Q, Y) {
    return this.refinement((X) => $.test(X), { validation: Q, code: V.invalid_string, ...O.errToObj(Y) });
  }
  _addCheck($) {
    return new n({ ...this._def, checks: [...this._def.checks, $] });
  }
  email($) {
    return this._addCheck({ kind: "email", ...O.errToObj($) });
  }
  url($) {
    return this._addCheck({ kind: "url", ...O.errToObj($) });
  }
  emoji($) {
    return this._addCheck({ kind: "emoji", ...O.errToObj($) });
  }
  uuid($) {
    return this._addCheck({ kind: "uuid", ...O.errToObj($) });
  }
  cuid($) {
    return this._addCheck({ kind: "cuid", ...O.errToObj($) });
  }
  cuid2($) {
    return this._addCheck({ kind: "cuid2", ...O.errToObj($) });
  }
  ulid($) {
    return this._addCheck({ kind: "ulid", ...O.errToObj($) });
  }
  ip($) {
    return this._addCheck({ kind: "ip", ...O.errToObj($) });
  }
  datetime($) {
    var Q;
    if (typeof $ === "string")
      return this._addCheck({ kind: "datetime", precision: null, offset: false, message: $ });
    return this._addCheck({ kind: "datetime", precision: typeof ($ === null || $ === void 0 ? void 0 : $.precision) === "undefined" ? null : $ === null || $ === void 0 ? void 0 : $.precision, offset: (Q = $ === null || $ === void 0 ? void 0 : $.offset) !== null && Q !== void 0 ? Q : false, ...O.errToObj($ === null || $ === void 0 ? void 0 : $.message) });
  }
  regex($, Q) {
    return this._addCheck({ kind: "regex", regex: $, ...O.errToObj(Q) });
  }
  includes($, Q) {
    return this._addCheck({ kind: "includes", value: $, position: Q === null || Q === void 0 ? void 0 : Q.position, ...O.errToObj(Q === null || Q === void 0 ? void 0 : Q.message) });
  }
  startsWith($, Q) {
    return this._addCheck({ kind: "startsWith", value: $, ...O.errToObj(Q) });
  }
  endsWith($, Q) {
    return this._addCheck({ kind: "endsWith", value: $, ...O.errToObj(Q) });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $, ...O.errToObj(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $, ...O.errToObj(Q) });
  }
  length($, Q) {
    return this._addCheck({ kind: "length", value: $, ...O.errToObj(Q) });
  }
  nonempty($) {
    return this.min(1, O.errToObj($));
  }
  trim() {
    return new n({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
  }
  toLowerCase() {
    return new n({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
  }
  toUpperCase() {
    return new n({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
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
n.create = ($) => {
  var Q;
  return new n({ checks: [], typeName: F.ZodString, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...K($) });
};
var B0 = class extends R {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = Number($.data);
    if (this._getType($) !== M.number) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.number, received: J.parsedType }), L;
    }
    let Y = void 0;
    const X = new T();
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
        if (s8($.data, J.value) !== 0)
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.not_multiple_of, multipleOf: J.value, message: J.message }), X.dirty();
      } else if (J.kind === "finite") {
        if (!Number.isFinite($.data))
          Y = this._getOrReturnCtx($, Y), z(Y, { code: V.not_finite, message: J.message }), X.dirty();
      } else
        A.assertNever(J);
    return { status: X.value, value: $.data };
  }
  gte($, Q) {
    return this.setLimit("min", $, true, O.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, O.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, O.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, O.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new B0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: O.toString(X) }] });
  }
  _addCheck($) {
    return new B0({ ...this._def, checks: [...this._def.checks, $] });
  }
  int($) {
    return this._addCheck({ kind: "int", message: O.toString($) });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: false, message: O.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: false, message: O.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: true, message: O.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: true, message: O.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: O.toString(Q) });
  }
  finite($) {
    return this._addCheck({ kind: "finite", message: O.toString($) });
  }
  safe($) {
    return this._addCheck({ kind: "min", inclusive: true, value: Number.MIN_SAFE_INTEGER, message: O.toString($) })._addCheck({ kind: "max", inclusive: true, value: Number.MAX_SAFE_INTEGER, message: O.toString($) });
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
B0.create = ($) => {
  return new B0({ checks: [], typeName: F.ZodNumber, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...K($) });
};
var V0 = class extends R {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = BigInt($.data);
    if (this._getType($) !== M.bigint) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.bigint, received: J.parsedType }), L;
    }
    let Y = void 0;
    const X = new T();
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
    return this.setLimit("min", $, true, O.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, O.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, O.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, O.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new V0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: O.toString(X) }] });
  }
  _addCheck($) {
    return new V0({ ...this._def, checks: [...this._def.checks, $] });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: false, message: O.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: false, message: O.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: true, message: O.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: true, message: O.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: O.toString(Q) });
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
V0.create = ($) => {
  var Q;
  return new V0({ checks: [], typeName: F.ZodBigInt, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...K($) });
};
var T0 = class extends R {
  _parse($) {
    if (this._def.coerce)
      $.data = Boolean($.data);
    if (this._getType($) !== M.boolean) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.boolean, received: Y.parsedType }), L;
    }
    return g($.data);
  }
};
T0.create = ($) => {
  return new T0({ typeName: F.ZodBoolean, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...K($) });
};
var F0 = class extends R {
  _parse($) {
    if (this._def.coerce)
      $.data = new Date($.data);
    if (this._getType($) !== M.date) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_type, expected: M.date, received: J.parsedType }), L;
    }
    if (isNaN($.data.getTime())) {
      const J = this._getOrReturnCtx($);
      return z(J, { code: V.invalid_date }), L;
    }
    const Y = new T();
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
    return new F0({ ...this._def, checks: [...this._def.checks, $] });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $.getTime(), message: O.toString(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $.getTime(), message: O.toString(Q) });
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
F0.create = ($) => {
  return new F0({ checks: [], coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, typeName: F.ZodDate, ...K($) });
};
var $1 = class extends R {
  _parse($) {
    if (this._getType($) !== M.symbol) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.symbol, received: Y.parsedType }), L;
    }
    return g($.data);
  }
};
$1.create = ($) => {
  return new $1({ typeName: F.ZodSymbol, ...K($) });
};
var x0 = class extends R {
  _parse($) {
    if (this._getType($) !== M.undefined) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.undefined, received: Y.parsedType }), L;
    }
    return g($.data);
  }
};
x0.create = ($) => {
  return new x0({ typeName: F.ZodUndefined, ...K($) });
};
var g0 = class extends R {
  _parse($) {
    if (this._getType($) !== M.null) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.null, received: Y.parsedType }), L;
    }
    return g($.data);
  }
};
g0.create = ($) => {
  return new g0({ typeName: F.ZodNull, ...K($) });
};
var L0 = class extends R {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse($) {
    return g($.data);
  }
};
L0.create = ($) => {
  return new L0({ typeName: F.ZodAny, ...K($) });
};
var G0 = class extends R {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse($) {
    return g($.data);
  }
};
G0.create = ($) => {
  return new G0({ typeName: F.ZodUnknown, ...K($) });
};
var e = class extends R {
  _parse($) {
    const Q = this._getOrReturnCtx($);
    return z(Q, { code: V.invalid_type, expected: M.never, received: Q.parsedType }), L;
  }
};
e.create = ($) => {
  return new e({ typeName: F.ZodNever, ...K($) });
};
var Q1 = class extends R {
  _parse($) {
    if (this._getType($) !== M.undefined) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.void, received: Y.parsedType }), L;
    }
    return g($.data);
  }
};
Q1.create = ($) => {
  return new Q1({ typeName: F.ZodVoid, ...K($) });
};
var p = class extends R {
  _parse($) {
    const { ctx: Q, status: Y } = this._processInputParams($), X = this._def;
    if (Q.parsedType !== M.array)
      return z(Q, { code: V.invalid_type, expected: M.array, received: Q.parsedType }), L;
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
        return X.type._parseAsync(new i(Q, W, Q.path, q));
      })).then((W) => {
        return T.mergeArray(Y, W);
      });
    const J = [...Q.data].map((W, q) => {
      return X.type._parseSync(new i(Q, W, Q.path, q));
    });
    return T.mergeArray(Y, J);
  }
  get element() {
    return this._def.type;
  }
  min($, Q) {
    return new p({ ...this._def, minLength: { value: $, message: O.toString(Q) } });
  }
  max($, Q) {
    return new p({ ...this._def, maxLength: { value: $, message: O.toString(Q) } });
  }
  length($, Q) {
    return new p({ ...this._def, exactLength: { value: $, message: O.toString(Q) } });
  }
  nonempty($) {
    return this.min(1, $);
  }
};
p.create = ($, Q) => {
  return new p({ type: $, minLength: null, maxLength: null, exactLength: null, typeName: F.ZodArray, ...K(Q) });
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
      const G = this._getOrReturnCtx($);
      return z(G, { code: V.invalid_type, expected: M.object, received: G.parsedType }), L;
    }
    const { status: Y, ctx: X } = this._processInputParams($), { shape: J, keys: W } = this._getCached(), q = [];
    if (!(this._def.catchall instanceof e && this._def.unknownKeys === "strip")) {
      for (let G in X.data)
        if (!W.includes(G))
          q.push(G);
    }
    const H = [];
    for (let G of W) {
      const B = J[G], U = X.data[G];
      H.push({ key: { status: "valid", value: G }, value: B._parse(new i(X, U, X.path, G)), alwaysSet: G in X.data });
    }
    if (this._def.catchall instanceof e) {
      const G = this._def.unknownKeys;
      if (G === "passthrough")
        for (let B of q)
          H.push({ key: { status: "valid", value: B }, value: { status: "valid", value: X.data[B] } });
      else if (G === "strict") {
        if (q.length > 0)
          z(X, { code: V.unrecognized_keys, keys: q }), Y.dirty();
      } else if (G === "strip")
        ;
      else
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const G = this._def.catchall;
      for (let B of q) {
        const U = X.data[B];
        H.push({ key: { status: "valid", value: B }, value: G._parse(new i(X, U, X.path, B)), alwaysSet: B in X.data });
      }
    }
    if (X.common.async)
      return Promise.resolve().then(async () => {
        const G = [];
        for (let B of H) {
          const U = await B.key;
          G.push({ key: U, value: await B.value, alwaysSet: B.alwaysSet });
        }
        return G;
      }).then((G) => {
        return T.mergeObjectSync(Y, G);
      });
    else
      return T.mergeObjectSync(Y, H);
  }
  get shape() {
    return this._def.shape();
  }
  strict($) {
    return O.errToObj, new I({ ...this._def, unknownKeys: "strict", ...$ !== void 0 ? { errorMap: (Q, Y) => {
      var X, J, W, q;
      const H = (W = (J = (X = this._def).errorMap) === null || J === void 0 ? void 0 : J.call(X, Q, Y).message) !== null && W !== void 0 ? W : Y.defaultError;
      if (Q.code === "unrecognized_keys")
        return { message: (q = O.errToObj($).message) !== null && q !== void 0 ? q : H };
      return { message: H };
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
    return new I({ unknownKeys: $._def.unknownKeys, catchall: $._def.catchall, shape: () => ({ ...this._def.shape(), ...$._def.shape() }), typeName: F.ZodObject });
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
    return j0(this);
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
        while (J instanceof t)
          J = J._def.innerType;
        Q[Y] = J;
      }
    }), new I({ ...this._def, shape: () => Q });
  }
  keyof() {
    return w6(A.objectKeys(this.shape));
  }
};
I.create = ($, Q) => {
  return new I({ shape: () => $, unknownKeys: "strip", catchall: e.create(), typeName: F.ZodObject, ...K(Q) });
};
I.strictCreate = ($, Q) => {
  return new I({ shape: () => $, unknownKeys: "strict", catchall: e.create(), typeName: F.ZodObject, ...K(Q) });
};
I.lazycreate = ($, Q) => {
  return new I({ shape: $, unknownKeys: "strip", catchall: e.create(), typeName: F.ZodObject, ...K(Q) });
};
var Z0 = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = this._def.options;
    function X(J) {
      for (let q of J)
        if (q.result.status === "valid")
          return q.result;
      for (let q of J)
        if (q.result.status === "dirty")
          return Q.common.issues.push(...q.ctx.common.issues), q.result;
      const W = J.map((q) => new m(q.ctx.common.issues));
      return z(Q, { code: V.invalid_union, unionErrors: W }), L;
    }
    if (Q.common.async)
      return Promise.all(Y.map(async (J) => {
        const W = { ...Q, common: { ...Q.common, issues: [] }, parent: null };
        return { result: await J._parseAsync({ data: Q.data, path: Q.path, parent: W }), ctx: W };
      })).then(X);
    else {
      let J = void 0;
      const W = [];
      for (let H of Y) {
        const G = { ...Q, common: { ...Q.common, issues: [] }, parent: null }, B = H._parseSync({ data: Q.data, path: Q.path, parent: G });
        if (B.status === "valid")
          return B;
        else if (B.status === "dirty" && !J)
          J = { result: B, ctx: G };
        if (G.common.issues.length)
          W.push(G.common.issues);
      }
      if (J)
        return Q.common.issues.push(...J.ctx.common.issues), J.result;
      const q = W.map((H) => new m(H));
      return z(Q, { code: V.invalid_union, unionErrors: q }), L;
    }
  }
  get options() {
    return this._def.options;
  }
};
Z0.create = ($, Q) => {
  return new Z0({ options: $, typeName: F.ZodUnion, ...K(Q) });
};
var S1 = ($) => {
  if ($ instanceof y0)
    return S1($.schema);
  else if ($ instanceof l)
    return S1($.innerType());
  else if ($ instanceof m0)
    return [$.value];
  else if ($ instanceof M0)
    return $.options;
  else if ($ instanceof l0)
    return Object.keys($.enum);
  else if ($ instanceof c0)
    return S1($._def.innerType);
  else if ($ instanceof x0)
    return [void 0];
  else if ($ instanceof g0)
    return [null];
  else
    return null;
};
var P1 = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== M.object)
      return z(Q, { code: V.invalid_type, expected: M.object, received: Q.parsedType }), L;
    const Y = this.discriminator, X = Q.data[Y], J = this.optionsMap.get(X);
    if (!J)
      return z(Q, { code: V.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [Y] }), L;
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
      const W = S1(J.shape[$]);
      if (!W)
        throw new Error(`A discriminator value for key \`${$}\` could not be extracted from all schema options`);
      for (let q of W) {
        if (X.has(q))
          throw new Error(`Discriminator property ${String($)} has duplicate value ${String(q)}`);
        X.set(q, J);
      }
    }
    return new P1({ typeName: F.ZodDiscriminatedUnion, discriminator: $, options: Q, optionsMap: X, ...K(Y) });
  }
};
var h0 = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($), X = (J, W) => {
      if (F$(J) || F$(W))
        return L;
      const q = K$(J.value, W.value);
      if (!q.valid)
        return z(Y, { code: V.invalid_intersection_types }), L;
      if (L$(J) || L$(W))
        Q.dirty();
      return { status: Q.value, value: q.data };
    };
    if (Y.common.async)
      return Promise.all([this._def.left._parseAsync({ data: Y.data, path: Y.path, parent: Y }), this._def.right._parseAsync({ data: Y.data, path: Y.path, parent: Y })]).then(([J, W]) => X(J, W));
    else
      return X(this._def.left._parseSync({ data: Y.data, path: Y.path, parent: Y }), this._def.right._parseSync({ data: Y.data, path: Y.path, parent: Y }));
  }
};
h0.create = ($, Q, Y) => {
  return new h0({ left: $, right: Q, typeName: F.ZodIntersection, ...K(Y) });
};
var $0 = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== M.array)
      return z(Y, { code: V.invalid_type, expected: M.array, received: Y.parsedType }), L;
    if (Y.data.length < this._def.items.length)
      return z(Y, { code: V.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: "array" }), L;
    if (!this._def.rest && Y.data.length > this._def.items.length)
      z(Y, { code: V.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: "array" }), Q.dirty();
    const J = [...Y.data].map((W, q) => {
      const H = this._def.items[q] || this._def.rest;
      if (!H)
        return null;
      return H._parse(new i(Y, W, Y.path, q));
    }).filter((W) => !!W);
    if (Y.common.async)
      return Promise.all(J).then((W) => {
        return T.mergeArray(Q, W);
      });
    else
      return T.mergeArray(Q, J);
  }
  get items() {
    return this._def.items;
  }
  rest($) {
    return new $0({ ...this._def, rest: $ });
  }
};
$0.create = ($, Q) => {
  if (!Array.isArray($))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new $0({ items: $, typeName: F.ZodTuple, rest: null, ...K(Q) });
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
    if (Y.parsedType !== M.object)
      return z(Y, { code: V.invalid_type, expected: M.object, received: Y.parsedType }), L;
    const X = [], J = this._def.keyType, W = this._def.valueType;
    for (let q in Y.data)
      X.push({ key: J._parse(new i(Y, q, Y.path, q)), value: W._parse(new i(Y, Y.data[q], Y.path, q)) });
    if (Y.common.async)
      return T.mergeObjectAsync(Q, X);
    else
      return T.mergeObjectSync(Q, X);
  }
  get element() {
    return this._def.valueType;
  }
  static create($, Q, Y) {
    if (Q instanceof R)
      return new Y1({ keyType: $, valueType: Q, typeName: F.ZodRecord, ...K(Y) });
    return new Y1({ keyType: n.create(), valueType: $, typeName: F.ZodRecord, ...K(Q) });
  }
};
var X1 = class extends R {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== M.map)
      return z(Y, { code: V.invalid_type, expected: M.map, received: Y.parsedType }), L;
    const X = this._def.keyType, J = this._def.valueType, W = [...Y.data.entries()].map(([q, H], G) => {
      return { key: X._parse(new i(Y, q, Y.path, [G, "key"])), value: J._parse(new i(Y, H, Y.path, [G, "value"])) };
    });
    if (Y.common.async) {
      const q = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (let H of W) {
          const G = await H.key, B = await H.value;
          if (G.status === "aborted" || B.status === "aborted")
            return L;
          if (G.status === "dirty" || B.status === "dirty")
            Q.dirty();
          q.set(G.value, B.value);
        }
        return { status: Q.value, value: q };
      });
    } else {
      const q = /* @__PURE__ */ new Map();
      for (let H of W) {
        const { key: G, value: B } = H;
        if (G.status === "aborted" || B.status === "aborted")
          return L;
        if (G.status === "dirty" || B.status === "dirty")
          Q.dirty();
        q.set(G.value, B.value);
      }
      return { status: Q.value, value: q };
    }
  }
};
X1.create = ($, Q, Y) => {
  return new X1({ valueType: Q, keyType: $, typeName: F.ZodMap, ...K(Y) });
};
var K0 = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== M.set)
      return z(Y, { code: V.invalid_type, expected: M.set, received: Y.parsedType }), L;
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
    function W(H) {
      const G = /* @__PURE__ */ new Set();
      for (let B of H) {
        if (B.status === "aborted")
          return L;
        if (B.status === "dirty")
          Q.dirty();
        G.add(B.value);
      }
      return { status: Q.value, value: G };
    }
    const q = [...Y.data.values()].map((H, G) => J._parse(new i(Y, H, Y.path, G)));
    if (Y.common.async)
      return Promise.all(q).then((H) => W(H));
    else
      return W(q);
  }
  min($, Q) {
    return new K0({ ...this._def, minSize: { value: $, message: O.toString(Q) } });
  }
  max($, Q) {
    return new K0({ ...this._def, maxSize: { value: $, message: O.toString(Q) } });
  }
  size($, Q) {
    return this.min($, Q).max($, Q);
  }
  nonempty($) {
    return this.min(1, $);
  }
};
K0.create = ($, Q) => {
  return new K0({ valueType: $, minSize: null, maxSize: null, typeName: F.ZodSet, ...K(Q) });
};
var k0 = class extends R {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== M.function)
      return z(Q, { code: V.invalid_type, expected: M.function, received: Q.parsedType }), L;
    function Y(q, H) {
      return C1({ data: q, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, f1(), t0].filter((G) => !!G), issueData: { code: V.invalid_arguments, argumentsError: H } });
    }
    function X(q, H) {
      return C1({ data: q, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, f1(), t0].filter((G) => !!G), issueData: { code: V.invalid_return_type, returnTypeError: H } });
    }
    const J = { errorMap: Q.common.contextualErrorMap }, W = Q.data;
    if (this._def.returns instanceof R0) {
      const q = this;
      return g(async function(...H) {
        const G = new m([]), B = await q._def.args.parseAsync(H, J).catch((E) => {
          throw G.addIssue(Y(H, E)), G;
        }), U = await Reflect.apply(W, this, B);
        return await q._def.returns._def.type.parseAsync(U, J).catch((E) => {
          throw G.addIssue(X(U, E)), G;
        });
      });
    } else {
      const q = this;
      return g(function(...H) {
        const G = q._def.args.safeParse(H, J);
        if (!G.success)
          throw new m([Y(H, G.error)]);
        const B = Reflect.apply(W, this, G.data), U = q._def.returns.safeParse(B, J);
        if (!U.success)
          throw new m([X(B, U.error)]);
        return U.data;
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
    return new k0({ ...this._def, args: $0.create($).rest(G0.create()) });
  }
  returns($) {
    return new k0({ ...this._def, returns: $ });
  }
  implement($) {
    return this.parse($);
  }
  strictImplement($) {
    return this.parse($);
  }
  static create($, Q, Y) {
    return new k0({ args: $ ? $ : $0.create([]).rest(G0.create()), returns: Q || G0.create(), typeName: F.ZodFunction, ...K(Y) });
  }
};
var y0 = class extends R {
  get schema() {
    return this._def.getter();
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    return this._def.getter()._parse({ data: Q.data, path: Q.path, parent: Q });
  }
};
y0.create = ($, Q) => {
  return new y0({ getter: $, typeName: F.ZodLazy, ...K(Q) });
};
var m0 = class extends R {
  _parse($) {
    if ($.data !== this._def.value) {
      const Q = this._getOrReturnCtx($);
      return z(Q, { received: Q.data, code: V.invalid_literal, expected: this._def.value }), L;
    }
    return { status: "valid", value: $.data };
  }
  get value() {
    return this._def.value;
  }
};
m0.create = ($, Q) => {
  return new m0({ value: $, typeName: F.ZodLiteral, ...K(Q) });
};
var M0 = class extends R {
  _parse($) {
    if (typeof $.data !== "string") {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return z(Q, { expected: A.joinValues(Y), received: Q.parsedType, code: V.invalid_type }), L;
    }
    if (this._def.values.indexOf($.data) === -1) {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return z(Q, { received: Q.data, code: V.invalid_enum_value, options: Y }), L;
    }
    return g($.data);
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
    return M0.create($);
  }
  exclude($) {
    return M0.create(this.options.filter((Q) => !$.includes(Q)));
  }
};
M0.create = w6;
var l0 = class extends R {
  _parse($) {
    const Q = A.getValidEnumValues(this._def.values), Y = this._getOrReturnCtx($);
    if (Y.parsedType !== M.string && Y.parsedType !== M.number) {
      const X = A.objectValues(Q);
      return z(Y, { expected: A.joinValues(X), received: Y.parsedType, code: V.invalid_type }), L;
    }
    if (Q.indexOf($.data) === -1) {
      const X = A.objectValues(Q);
      return z(Y, { received: Y.data, code: V.invalid_enum_value, options: X }), L;
    }
    return g($.data);
  }
  get enum() {
    return this._def.values;
  }
};
l0.create = ($, Q) => {
  return new l0({ values: $, typeName: F.ZodNativeEnum, ...K(Q) });
};
var R0 = class extends R {
  unwrap() {
    return this._def.type;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== M.promise && Q.common.async === false)
      return z(Q, { code: V.invalid_type, expected: M.promise, received: Q.parsedType }), L;
    const Y = Q.parsedType === M.promise ? Q.data : Promise.resolve(Q.data);
    return g(Y.then((X) => {
      return this._def.type.parseAsync(X, { path: Q.path, errorMap: Q.common.contextualErrorMap });
    }));
  }
};
R0.create = ($, Q) => {
  return new R0({ type: $, typeName: F.ZodPromise, ...K(Q) });
};
var l = class extends R {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === F.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
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
        const H = X.refinement(q, J);
        if (Y.common.async)
          return Promise.resolve(H);
        if (H instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return q;
      };
      if (Y.common.async === false) {
        const q = this._def.schema._parseSync({ data: Y.data, path: Y.path, parent: Y });
        if (q.status === "aborted")
          return L;
        if (q.status === "dirty")
          Q.dirty();
        return W(q.value), { status: Q.value, value: q.value };
      } else
        return this._def.schema._parseAsync({ data: Y.data, path: Y.path, parent: Y }).then((q) => {
          if (q.status === "aborted")
            return L;
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
        if (!e0(W))
          return W;
        const q = X.transform(W.value, J);
        if (q instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: Q.value, value: q };
      } else
        return this._def.schema._parseAsync({ data: Y.data, path: Y.path, parent: Y }).then((W) => {
          if (!e0(W))
            return W;
          return Promise.resolve(X.transform(W.value, J)).then((q) => ({ status: Q.value, value: q }));
        });
    A.assertNever(X);
  }
};
l.create = ($, Q, Y) => {
  return new l({ schema: $, typeName: F.ZodEffects, effect: Q, ...K(Y) });
};
l.createWithPreprocess = ($, Q, Y) => {
  return new l({ schema: Q, effect: { type: "preprocess", transform: $ }, typeName: F.ZodEffects, ...K(Y) });
};
var t = class extends R {
  _parse($) {
    if (this._getType($) === M.undefined)
      return g(void 0);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
t.create = ($, Q) => {
  return new t({ innerType: $, typeName: F.ZodOptional, ...K(Q) });
};
var z0 = class extends R {
  _parse($) {
    if (this._getType($) === M.null)
      return g(null);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
z0.create = ($, Q) => {
  return new z0({ innerType: $, typeName: F.ZodNullable, ...K(Q) });
};
var c0 = class extends R {
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
c0.create = ($, Q) => {
  return new c0({ innerType: $, typeName: F.ZodDefault, defaultValue: typeof Q.default === "function" ? Q.default : () => Q.default, ...K(Q) });
};
var J1 = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = { ...Q, common: { ...Q.common, issues: [] } }, X = this._def.innerType._parse({ data: Y.data, path: Y.path, parent: { ...Y } });
    if (I1(X))
      return X.then((J) => {
        return { status: "valid", value: J.status === "valid" ? J.value : this._def.catchValue({ get error() {
          return new m(Y.common.issues);
        }, input: Y.data }) };
      });
    else
      return { status: "valid", value: X.status === "valid" ? X.value : this._def.catchValue({ get error() {
        return new m(Y.common.issues);
      }, input: Y.data }) };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
J1.create = ($, Q) => {
  return new J1({ innerType: $, typeName: F.ZodCatch, catchValue: typeof Q.catch === "function" ? Q.catch : () => Q.catch, ...K(Q) });
};
var W1 = class extends R {
  _parse($) {
    if (this._getType($) !== M.nan) {
      const Y = this._getOrReturnCtx($);
      return z(Y, { code: V.invalid_type, expected: M.nan, received: Y.parsedType }), L;
    }
    return { status: "valid", value: $.data };
  }
};
W1.create = ($) => {
  return new W1({ typeName: F.ZodNaN, ...K($) });
};
var a8 = Symbol("zod_brand");
var R$ = class extends R {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = Q.data;
    return this._def.type._parse({ data: Y, path: Q.path, parent: Q });
  }
  unwrap() {
    return this._def.type;
  }
};
var H1 = class extends R {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.common.async)
      return (async () => {
        const J = await this._def.in._parseAsync({ data: Y.data, path: Y.path, parent: Y });
        if (J.status === "aborted")
          return L;
        if (J.status === "dirty")
          return Q.dirty(), z6(J.value);
        else
          return this._def.out._parseAsync({ data: J.value, path: Y.path, parent: Y });
      })();
    else {
      const X = this._def.in._parseSync({ data: Y.data, path: Y.path, parent: Y });
      if (X.status === "aborted")
        return L;
      if (X.status === "dirty")
        return Q.dirty(), { status: "dirty", value: X.value };
      else
        return this._def.out._parseSync({ data: X.value, path: Y.path, parent: Y });
    }
  }
  static create($, Q) {
    return new H1({ in: $, out: Q, typeName: F.ZodPipeline });
  }
};
var q1 = class extends R {
  _parse($) {
    const Q = this._def.innerType._parse($);
    if (e0(Q))
      Q.value = Object.freeze(Q.value);
    return Q;
  }
};
q1.create = ($, Q) => {
  return new q1({ innerType: $, typeName: F.ZodReadonly, ...K(Q) });
};
var U6 = ($, Q = {}, Y) => {
  if ($)
    return L0.create().superRefine((X, J) => {
      var W, q;
      if (!$(X)) {
        const H = typeof Q === "function" ? Q(X) : typeof Q === "string" ? { message: Q } : Q, G = (q = (W = H.fatal) !== null && W !== void 0 ? W : Y) !== null && q !== void 0 ? q : true, B = typeof H === "string" ? { message: H } : H;
        J.addIssue({ code: "custom", ...B, fatal: G });
      }
    });
  return L0.create();
};
var t8 = { object: I.lazycreate };
var F;
(function($) {
  $.ZodString = "ZodString", $.ZodNumber = "ZodNumber", $.ZodNaN = "ZodNaN", $.ZodBigInt = "ZodBigInt", $.ZodBoolean = "ZodBoolean", $.ZodDate = "ZodDate", $.ZodSymbol = "ZodSymbol", $.ZodUndefined = "ZodUndefined", $.ZodNull = "ZodNull", $.ZodAny = "ZodAny", $.ZodUnknown = "ZodUnknown", $.ZodNever = "ZodNever", $.ZodVoid = "ZodVoid", $.ZodArray = "ZodArray", $.ZodObject = "ZodObject", $.ZodUnion = "ZodUnion", $.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", $.ZodIntersection = "ZodIntersection", $.ZodTuple = "ZodTuple", $.ZodRecord = "ZodRecord", $.ZodMap = "ZodMap", $.ZodSet = "ZodSet", $.ZodFunction = "ZodFunction", $.ZodLazy = "ZodLazy", $.ZodLiteral = "ZodLiteral", $.ZodEnum = "ZodEnum", $.ZodEffects = "ZodEffects", $.ZodNativeEnum = "ZodNativeEnum", $.ZodOptional = "ZodOptional", $.ZodNullable = "ZodNullable", $.ZodDefault = "ZodDefault", $.ZodCatch = "ZodCatch", $.ZodPromise = "ZodPromise", $.ZodBranded = "ZodBranded", $.ZodPipeline = "ZodPipeline", $.ZodReadonly = "ZodReadonly";
})(F || (F = {}));
var e8 = ($, Q = { message: `Input not instance of ${$.name}` }) => U6((Y) => Y instanceof $, Q);
var O6 = n.create;
var D6 = B0.create;
var $4 = W1.create;
var Q4 = V0.create;
var F6 = T0.create;
var Y4 = F0.create;
var X4 = $1.create;
var J4 = x0.create;
var W4 = g0.create;
var q4 = L0.create;
var H4 = G0.create;
var G4 = e.create;
var B4 = Q1.create;
var V4 = p.create;
var M4 = I.create;
var z4 = I.strictCreate;
var w4 = Z0.create;
var U4 = P1.create;
var O4 = h0.create;
var D4 = $0.create;
var F4 = Y1.create;
var L4 = X1.create;
var K4 = K0.create;
var R4 = k0.create;
var N4 = y0.create;
var A4 = m0.create;
var E4 = M0.create;
var S4 = l0.create;
var f4 = R0.create;
var V6 = l.create;
var C4 = t.create;
var I4 = z0.create;
var P4 = l.createWithPreprocess;
var _4 = H1.create;
var b4 = () => O6().optional();
var v4 = () => D6().optional();
var j4 = () => F6().optional();
var k4 = { string: ($) => n.create({ ...$, coerce: true }), number: ($) => B0.create({ ...$, coerce: true }), boolean: ($) => T0.create({ ...$, coerce: true }), bigint: ($) => V0.create({ ...$, coerce: true }), date: ($) => F0.create({ ...$, coerce: true }) };
var T4 = L;
var w = Object.freeze({ __proto__: null, defaultErrorMap: t0, setErrorMap: h8, getErrorMap: f1, makeIssue: C1, EMPTY_PATH: y8, addIssueToContext: z, ParseStatus: T, INVALID: L, DIRTY: z6, OK: g, isAborted: F$, isDirty: L$, isValid: e0, isAsync: I1, get util() {
  return A;
}, get objectUtil() {
  return D$;
}, ZodParsedType: M, getParsedType: H0, ZodType: R, ZodString: n, ZodNumber: B0, ZodBigInt: V0, ZodBoolean: T0, ZodDate: F0, ZodSymbol: $1, ZodUndefined: x0, ZodNull: g0, ZodAny: L0, ZodUnknown: G0, ZodNever: e, ZodVoid: Q1, ZodArray: p, ZodObject: I, ZodUnion: Z0, ZodDiscriminatedUnion: P1, ZodIntersection: h0, ZodTuple: $0, ZodRecord: Y1, ZodMap: X1, ZodSet: K0, ZodFunction: k0, ZodLazy: y0, ZodLiteral: m0, ZodEnum: M0, ZodNativeEnum: l0, ZodPromise: R0, ZodEffects: l, ZodTransformer: l, ZodOptional: t, ZodNullable: z0, ZodDefault: c0, ZodCatch: J1, ZodNaN: W1, BRAND: a8, ZodBranded: R$, ZodPipeline: H1, ZodReadonly: q1, custom: U6, Schema: R, ZodSchema: R, late: t8, get ZodFirstPartyTypeKind() {
  return F;
}, coerce: k4, any: q4, array: V4, bigint: Q4, boolean: F6, date: Y4, discriminatedUnion: U4, effect: V6, enum: E4, function: R4, instanceof: e8, intersection: O4, lazy: N4, literal: A4, map: L4, nan: $4, nativeEnum: S4, never: G4, null: W4, nullable: I4, number: D6, object: M4, oboolean: j4, onumber: v4, optional: C4, ostring: b4, pipeline: _4, preprocess: P4, promise: f4, record: F4, set: K4, strictObject: z4, string: O6, symbol: X4, transformer: V6, tuple: D4, undefined: J4, union: w4, unknown: H4, void: B4, NEVER: T4, ZodIssueCode: V, quotelessJson: Z8, ZodError: m });
var L6 = w.object({ email: w.string().email(), img: w.string(), lid: w.string(), name: w.string(), uid: w.number().int(), introduction: w.string().optional(), pid: w.string(), delImg: w.string().optional() });
var N$ = w.object({ email: w.string().email(), img: w.string(), lid: w.string(), name: w.string(), uid: w.number().int(), introduction: w.string().optional() });
var K6 = w.object({ type: w.enum(["uid"]), uid: w.number().int() }).or(w.object({ type: w.enum(["email"]), email: w.string().email() })).or(w.object({ type: w.enum(["pid"]), pid: w.string() }));
var T5 = w.object({ type: w.enum(["uid"]), uid: w.number().int() }).or(w.object({ type: w.enum(["email"]), email: w.string().email() })).or(w.object({ type: w.enum(["pid"]), pid: w.string() }));
var R6 = w.object({ type: w.enum(["uid"]), uid: w.number().int() }).or(w.object({ type: w.enum(["email"]), email: w.string().email() }));
var N6 = w.object({ type: w.enum(["uid"]), uid: w.number().int() }).or(w.object({ type: w.enum(["email"]), email: w.string().email() }));
var A6 = w.object({ type: w.enum(["uid"]), uid: w.number().int(), is: w.number(), pid: w.string() }).or(w.object({ type: w.enum(["email"]), email: w.string().email(), is: w.number(), pid: w.string() }));
var x5 = w.object({ group: w.object({ gid: w.string() }).array(), chat: w.object({ uid: w.number() }).array() });
var g4 = typeof global == "object" && global && global.Object === Object && global;
var _1 = g4;
var Z4 = typeof self == "object" && self && self.Object === Object && self;
var h4 = _1 || Z4 || Function("return this")();
var x = h4;
var y4 = x.Symbol;
var u0 = y4;
var c4 = function($) {
  var Q = m4.call($, G1), Y = $[G1];
  try {
    $[G1] = void 0;
    var X = true;
  } catch (W) {
  }
  var J = l4.call($);
  if (X)
    if (Q)
      $[G1] = Y;
    else
      delete $[G1];
  return J;
};
var E6 = Object.prototype;
var m4 = E6.hasOwnProperty;
var l4 = E6.toString;
var G1 = u0 ? u0.toStringTag : void 0;
var S6 = c4;
var p4 = function($) {
  return n4.call($);
};
var u4 = Object.prototype;
var n4 = u4.toString;
var f6 = p4;
var o4 = function($) {
  if ($ == null)
    return $ === void 0 ? d4 : i4;
  return C6 && C6 in Object($) ? S6($) : f6($);
};
var i4 = "[object Null]";
var d4 = "[object Undefined]";
var C6 = u0 ? u0.toStringTag : void 0;
var d = o4;
var r4 = function($) {
  return $ != null && typeof $ == "object";
};
var w0 = r4;
var s4 = Array.isArray;
var U0 = s4;
var a4 = function($) {
  var Q = typeof $;
  return $ != null && (Q == "object" || Q == "function");
};
var N0 = a4;
var t4 = function($) {
  return $;
};
var I6 = t4;
var X9 = function($) {
  if (!N0($))
    return false;
  var Q = d($);
  return Q == $9 || Q == Q9 || Q == e4 || Q == Y9;
};
var e4 = "[object AsyncFunction]";
var $9 = "[object Function]";
var Q9 = "[object GeneratorFunction]";
var Y9 = "[object Proxy]";
var b1 = X9;
var J9 = x["__core-js_shared__"];
var v1 = J9;
var W9 = function($) {
  return !!P6 && P6 in $;
};
var P6 = function() {
  var $ = /[^.]+$/.exec(v1 && v1.keys && v1.keys.IE_PROTO || "");
  return $ ? "Symbol(src)_1." + $ : "";
}();
var _6 = W9;
var G9 = function($) {
  if ($ != null) {
    try {
      return H9.call($);
    } catch (Q) {
    }
    try {
      return $ + "";
    } catch (Q) {
    }
  }
  return "";
};
var q9 = Function.prototype;
var H9 = q9.toString;
var X0 = G9;
var D9 = function($) {
  if (!N0($) || _6($))
    return false;
  var Q = b1($) ? O9 : V9;
  return Q.test(X0($));
};
var B9 = /[\\^$.*+?()[\]{}|]/g;
var V9 = /^\[object .+?Constructor\]$/;
var M9 = Function.prototype;
var z9 = Object.prototype;
var w9 = M9.toString;
var U9 = z9.hasOwnProperty;
var O9 = RegExp("^" + w9.call(U9).replace(B9, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var b6 = D9;
var F9 = function($, Q) {
  return $ == null ? void 0 : $[Q];
};
var v6 = F9;
var L9 = function($, Q) {
  var Y = v6($, Q);
  return b6(Y) ? Y : void 0;
};
var Q0 = L9;
var K9 = Q0(x, "WeakMap");
var j1 = K9;
var R9 = function($, Q) {
  var Y = -1, X = $ == null ? 0 : $.length;
  while (++Y < X)
    if (Q($[Y], Y, $) === false)
      break;
  return $;
};
var j6 = R9;
var E9 = function($, Q) {
  var Y = typeof $;
  return Q = Q == null ? N9 : Q, !!Q && (Y == "number" || Y != "symbol" && A9.test($)) && ($ > -1 && $ % 1 == 0 && $ < Q);
};
var N9 = 9007199254740991;
var A9 = /^(?:0|[1-9]\d*)$/;
var k6 = E9;
var f9 = function($) {
  return typeof $ == "number" && $ > -1 && $ % 1 == 0 && $ <= S9;
};
var S9 = 9007199254740991;
var k1 = f9;
var C9 = function($) {
  return $ != null && k1($.length) && !b1($);
};
var n0 = C9;
var P9 = function($) {
  var Q = $ && $.constructor, Y = typeof Q == "function" && Q.prototype || I9;
  return $ === Y;
};
var I9 = Object.prototype;
var T1 = P9;
var _9 = function($, Q) {
  var Y = -1, X = Array($);
  while (++Y < $)
    X[Y] = Q(Y);
  return X;
};
var T6 = _9;
var v9 = function($) {
  return w0($) && d($) == b9;
};
var b9 = "[object Arguments]";
var A$ = v9;
var x6 = Object.prototype;
var j9 = x6.hasOwnProperty;
var k9 = x6.propertyIsEnumerable;
var T9 = A$(function() {
  return arguments;
}()) ? A$ : function($) {
  return w0($) && j9.call($, "callee") && !k9.call($, "callee");
};
var x1 = T9;
var Z1 = {};
t1(Z1, { default: () => {
  {
    return B1;
  }
} });
var x9 = function() {
  return false;
};
var g6 = x9;
var y6 = typeof Z1 == "object" && Z1 && !Z1.nodeType && Z1;
var Z6 = y6 && typeof g1 == "object" && g1 && !g1.nodeType && g1;
var g9 = Z6 && Z6.exports === y6;
var h6 = g9 ? x.Buffer : void 0;
var Z9 = h6 ? h6.isBuffer : void 0;
var h9 = Z9 || g6;
var B1 = h9;
var B2 = function($) {
  return w0($) && k1($.length) && !!S[d($)];
};
var y9 = "[object Arguments]";
var m9 = "[object Array]";
var l9 = "[object Boolean]";
var c9 = "[object Date]";
var u9 = "[object Error]";
var n9 = "[object Function]";
var p9 = "[object Map]";
var i9 = "[object Number]";
var d9 = "[object Object]";
var o9 = "[object RegExp]";
var r9 = "[object Set]";
var s9 = "[object String]";
var a9 = "[object WeakMap]";
var t9 = "[object ArrayBuffer]";
var e9 = "[object DataView]";
var $2 = "[object Float32Array]";
var Q2 = "[object Float64Array]";
var Y2 = "[object Int8Array]";
var X2 = "[object Int16Array]";
var J2 = "[object Int32Array]";
var W2 = "[object Uint8Array]";
var q2 = "[object Uint8ClampedArray]";
var H2 = "[object Uint16Array]";
var G2 = "[object Uint32Array]";
var S = {};
S[$2] = S[Q2] = S[Y2] = S[X2] = S[J2] = S[W2] = S[q2] = S[H2] = S[G2] = true;
S[y9] = S[m9] = S[t9] = S[l9] = S[e9] = S[c9] = S[u9] = S[n9] = S[p9] = S[i9] = S[d9] = S[o9] = S[r9] = S[s9] = S[a9] = false;
var m6 = B2;
var V2 = function($) {
  return function(Q) {
    return $(Q);
  };
};
var l6 = V2;
var y1 = {};
t1(y1, { default: () => {
  {
    return m1;
  }
} });
var c6 = typeof y1 == "object" && y1 && !y1.nodeType && y1;
var V1 = c6 && typeof h1 == "object" && h1 && !h1.nodeType && h1;
var M2 = V1 && V1.exports === c6;
var E$ = M2 && _1.process;
var z2 = function() {
  try {
    var $ = V1 && V1.require && V1.require("util").types;
    if ($)
      return $;
    return E$ && E$.binding && E$.binding("util");
  } catch (Q) {
  }
}();
var m1 = z2;
var u6 = m1 && m1.isTypedArray;
var w2 = u6 ? l6(u6) : m6;
var l1 = w2;
var D2 = function($, Q) {
  var Y = U0($), X = !Y && x1($), J = !Y && !X && B1($), W = !Y && !X && !J && l1($), q = Y || X || J || W, H = q ? T6($.length, String) : [], G = H.length;
  for (var B in $)
    if ((Q || O2.call($, B)) && !(q && (B == "length" || J && (B == "offset" || B == "parent") || W && (B == "buffer" || B == "byteLength" || B == "byteOffset") || k6(B, G))))
      H.push(B);
  return H;
};
var U2 = Object.prototype;
var O2 = U2.hasOwnProperty;
var n6 = D2;
var F2 = function($, Q) {
  return function(Y) {
    return $(Q(Y));
  };
};
var p6 = F2;
var L2 = p6(Object.keys, Object);
var i6 = L2;
var N2 = function($) {
  if (!T1($))
    return i6($);
  var Q = [];
  for (var Y in Object($))
    if (R2.call($, Y) && Y != "constructor")
      Q.push(Y);
  return Q;
};
var K2 = Object.prototype;
var R2 = K2.hasOwnProperty;
var c1 = N2;
var A2 = function($) {
  return n0($) ? n6($) : c1($);
};
var d6 = A2;
var E2 = Q0(x, "Map");
var u1 = E2;
var S2 = Q0(x, "DataView");
var n1 = S2;
var f2 = Q0(x, "Promise");
var p1 = f2;
var C2 = Q0(x, "Set");
var i1 = C2;
var o6 = "[object Map]";
var I2 = "[object Object]";
var r6 = "[object Promise]";
var s6 = "[object Set]";
var a6 = "[object WeakMap]";
var t6 = "[object DataView]";
var P2 = X0(n1);
var _2 = X0(u1);
var b2 = X0(p1);
var v2 = X0(i1);
var j2 = X0(j1);
var A0 = d;
if (n1 && A0(new n1(new ArrayBuffer(1))) != t6 || u1 && A0(new u1()) != o6 || p1 && A0(p1.resolve()) != r6 || i1 && A0(new i1()) != s6 || j1 && A0(new j1()) != a6)
  A0 = function($) {
    var Q = d($), Y = Q == I2 ? $.constructor : void 0, X = Y ? X0(Y) : "";
    if (X)
      switch (X) {
        case P2:
          return t6;
        case _2:
          return o6;
        case b2:
          return r6;
        case v2:
          return s6;
        case j2:
          return a6;
      }
    return Q;
  };
var e6 = A0;
var k2 = function($) {
  return function(Q, Y, X) {
    var J = -1, W = Object(Q), q = X(Q), H = q.length;
    while (H--) {
      var G = q[$ ? H : ++J];
      if (Y(W[G], G, W) === false)
        break;
    }
    return Q;
  };
};
var $8 = k2;
var T2 = $8();
var Q8 = T2;
var x2 = function($, Q) {
  return $ && Q8($, Q, d6);
};
var Y8 = x2;
var g2 = function($, Q) {
  return function(Y, X) {
    if (Y == null)
      return Y;
    if (!n0(Y))
      return $(Y, X);
    var J = Y.length, W = Q ? J : -1, q = Object(Y);
    while (Q ? W-- : ++W < J)
      if (X(q[W], W, q) === false)
        break;
    return Y;
  };
};
var X8 = g2;
var Z2 = X8(Y8);
var J8 = Z2;
var h2 = function($) {
  return typeof $ == "function" ? $ : I6;
};
var W8 = h2;
var y2 = function($, Q) {
  var Y = U0($) ? j6 : J8;
  return Y($, W8(Q));
};
var M1 = y2;
var l2 = function($) {
  return typeof $ == "string" || !U0($) && w0($) && d($) == m2;
};
var m2 = "[object String]";
var d1 = l2;
var i2 = function($) {
  if ($ == null)
    return true;
  if (n0($) && (U0($) || typeof $ == "string" || typeof $.splice == "function" || B1($) || l1($) || x1($)))
    return !$.length;
  var Q = e6($);
  if (Q == c2 || Q == u2)
    return !$.size;
  if (T1($))
    return !c1($).length;
  for (var Y in $)
    if (p2.call($, Y))
      return false;
  return true;
};
var c2 = "[object Map]";
var u2 = "[object Set]";
var n2 = Object.prototype;
var p2 = n2.hasOwnProperty;
var S$ = i2;
var c = { header: {} };
async function O0($) {
  const Q = await o({ tag: $.toString(), action: "get" });
  if (Q[$] == "null" && Q[$] == null)
    return null;
  if (N0(Q[$]))
    return Q[$];
  return JSON.parse(Q[$]);
}
var o = async ($) => {
  $ = { ...$, user: "p2psaing", secret: "59c44c2f" };
  const Q = new FormData();
  for (let X in $)
    Q.set(X, d1($[X]) ? $[X] : JSON.stringify($[X]));
  const Y = new Headers();
  M1({ Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", "Accept-Encoding": "gzip, deflate, br, zstd", "Accept-Language": "zh-CN,zh;q=0.9", "Cache-Control": "max-age=0", Host: "localhost:8787", "Sec-Ch-Ua": '"Chromium";v="1", "Not(A:Brand";v="1", "Google Chrome";v="1"', "Sec-Ch-Ua-Mobile": "?0", "Sec-Ch-Ua-Platform": '"macOS"', "Sec-Fetch-Dest": "document", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Site": "none", "Sec-Fetch-User": "?1", "Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Macintosh; IBM Mac OS X 1_0_0) AppleWebKit/1.0 (KHTML, like Gecko) Chrome/1.0.0.0 Safari/1.0" }, (X, J) => Y.set(J, X));
  try {
    return console.log(Q), await (await fetch("https://tinywebdb.appinventor.space/api", { method: "POST", headers: Y, body: Q, redirect: "follow" })).json();
  } catch (X) {
    console.log("err:", X);
  }
};
var q8 = async () => (await o({ action: "count" })).count;
var d2 = async ($) => await o({ action: "delete", tag: $ });
var o1 = async ($) => await O0(`${$}.value`);
var r1 = async ($) => await O0(`${$}.value`);
var H8 = async ($) => await O0(`${$}.time`);
var G8 = async ($) => await O0(`${$}.time`);
var B8 = async ($, Q) => await d2(`${$}.store.${Q}`);
var z1 = async ($, Q) => await O0(`${$}.store.${Q}`);
var s1 = async ($, Q, Y) => {
  if (d1($))
    var X = await r1($);
  else
    var X = await o1($);
  await o({ action: "update", tag: `${X.email}.store.${Q}`, value: Y }), await o({ action: "update", tag: `${X.uid}.store.${Q}`, value: Y });
};
async function V8($) {
  c.header = $.req.header();
  const Q = await $.req.json();
  if (G6(Q, K6))
    try {
      switch (Q.type) {
        case "uid":
          return j($, await o1(Q.uid));
        case "email":
          return j($, await r1(Q.email));
        case "pid":
          return j($, await O0(Q.pid));
      }
    } catch (Y) {
      return v($, Y, C.FailCode.server, 500);
    }
  return v($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", C.FailCode.format, 406);
}
var D0;
(function(p0) {
  p0.payload = { sub: "p2psaing", role: "wenxig", alg: "HS512" }, p0.secret = "vhbuioy78a32et6r7drtxfcyutfdresxyrtuyfdresxdfcgtyfui7uihfip239u0hjfaf2hf89h29fniune2iuf", p0.value = "";
})(D0 || (D0 = {}));
D0.value = await H6(D0.payload, D0.secret, D0.payload.alg);
var r = new z$();
r.get("/jwt", ($) => j($, D0.value));
r.use("/user/*", async ($, Q) => {
  const Y = c.header = $.req.header(), X = w.string().safeParse(Y.authorization);
  if (X.success && await q6(X.data, D0.secret, "HS512"))
    return Q();
  return v($, "\u8BA4\u8BC1\u9519\u8BEF", C.FailCode.unauthorization, 401);
});
r.post("/user", V8).put(async ($) => {
  c.header = $.req.header();
  const Q = await $.req.json();
  if (!L6.safeParse(Q).success)
    return v($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", C.FailCode.format, 200);
  try {
    await o({ tag: Q.pid, value: Q, action: "update" }), await o({ tag: `${Q.uid}.value`, value: N$.parse(Q), action: "update" }), await o({ tag: `${Q.email}.value`, value: N$.parse(Q), action: "update" });
    const Y = (/* @__PURE__ */ new Date()).getTime();
    return await o({ tag: `${Q.uid}.time`, value: Y, action: "update" }), await o({ tag: `${Q.email}.time`, value: Y, action: "update" }), j($, Y);
  } catch (Y) {
    return console.error(Y), v($, Y, C.FailCode.server, 500);
  }
});
r.post("/user/has", async ($) => {
  const Q = await V8($), Y = await Q.json();
  if (Y.code == C.Code.success)
    return j($, !S$(Y.data));
  return $.json(Y, Q.status);
});
r.post("/user/address", async ($) => {
  c.header = $.req.header();
  const Q = N6.safeParse(await $.req.json());
  if (Q.success)
    try {
      if (Q.data.type == "uid")
        return j($, await z1(Q.data.uid, "address"));
      else
        return j($, await z1(Q.data.email, "address"));
    } catch (Y) {
      return v($, Y, C.FailCode.server, 500);
    }
  return v($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", C.FailCode.format, 406);
}).patch(async ($) => {
  c.header = $.req.header();
  const Q = A6.safeParse(await $.req.json());
  if (Q.success)
    try {
      if (!await O0(Q.data.pid) || !(Q.data.type == "email" ? !await r1(Q.data.email) : await o1(Q.data.uid)))
        return v($, "\u7528\u6237\u4E0D\u5B58\u5728", C.FailCode.notFound, 404);
      const Y = JSON.parse(await z1(Q.data.uid ?? Q.data.email, "address") || JSON.stringify({ group: [], chat: [] }));
      if (Y.chat.push({ uid: Q.data.is }), Q.data.type == "uid")
        return j($, await s1(Q.data.uid, "address", JSON.stringify(Y)));
      else
        return j($, await s1(Q.data.email, "address", JSON.stringify(Y)));
    } catch (Y) {
      return v($, Y, C.FailCode.server, 500);
    }
  return v($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", C.FailCode.format, 406);
});
r.post("/user/time", async ($) => {
  c.header = $.req.header();
  try {
    const Q = R6.safeParse(await $.req.json());
    if (!Q.success)
      return v($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", C.FailCode.format, 406);
    if (Q.data.type == "uid")
      return j($, await H8(Q.data.uid));
    else
      return j($, await G8(Q.data.email));
  } catch (Q) {
    return v($, Q, C.FailCode.server, 500);
  }
});
r.get("/user/count", async ($) => {
  return c.header = $.req.header(), j($, await q8());
});
r.all("/user/file/*", async ($) => {
  const Q = c.header = $.req.header(), Y = w.string().safeParse(Q.authorization).success ? Q.authorization : "", X = new Headers();
  M1(Q, (J, W) => X.set(W, J));
  try {
    switch (Y) {
      case "github":
        return X.set("Authorization", "token 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"), j($, await fetch($.req.path.replace(/^\/file/g, "https://api.github.com"), { headers: X, body: await $.req.text(), method: $.req.method }));
      case "smms":
        return X.set("Authorization", "bipd73BhOqJYyPnMr8e5kA64jtWREomu"), j($, await fetch($.req.path.replace(/^\/file/g, "https://sm.ms"), { headers: X, body: await $.req.formData(), method: $.req.method }));
      default:
        return v($, "\u4E0D\u5141\u8BB8\u7684\u53C2\u6570", C.FailCode.format, 405);
    }
  } catch (J) {
    return v($, J, C.FailCode.server, 500);
  }
});
r.put("/user/:uid/store/*", async ($) => {
  c.header = $.req.header();
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await s1($.req.param().uid, Q, await $.req.text()), j($, await $.req.json());
  } catch (Y) {
    return v($, Y, C.FailCode.server, 500);
  }
}).delete(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await B8($.req.param().uid, Q), j($, await $.req.json());
  } catch (Y) {
    return v($, Y, C.FailCode.server, 500);
  }
}).get(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  c.header = $.req.header();
  try {
    return j($, await z1($.req.param().uid, Q));
  } catch (Y) {
    return v($, Y, C.FailCode.server, 500);
  }
});
r.all("*", ($) => v($, "\u672A\u77E5\u7684\u8DEF\u5F84", C.FailCode.falseMethod, 405));
var A7 = r;

// ../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// .wrangler/tmp/bundle-KnMzM5/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...A7,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...A7.middleware ? A7.middleware : []
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

// .wrangler/tmp/bundle-KnMzM5/middleware-loader.entry.ts
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
