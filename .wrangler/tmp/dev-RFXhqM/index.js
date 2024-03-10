// .wrangler/tmp/bundle-MgQK12/checked-fetch.js
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
var q8 = Object.defineProperty;
var i1 = ($, Q) => {
  for (var Y in Q)
    q8($, Y, { get: Q[Y], enumerable: true, configurable: true, set: (X) => Q[Y] = () => X });
};
var A$ = { Stringify: 1, BeforeStream: 2, Stream: 3 };
var H8 = ($, Q) => {
  const Y = new String($);
  return Y.isEscaped = true, Y.callbacks = Q, Y;
};
var d1 = async ($, Q, Y, X, J) => {
  const W = $.callbacks;
  if (!W?.length)
    return Promise.resolve($);
  if (J)
    J[0] += $;
  else
    J = [$];
  const q = Promise.all(W.map((G) => G({ phase: Q, buffer: J, context: X }))).then((G) => Promise.all(G.filter(Boolean).map((H) => d1(H, Q, false, X, J))).then(() => J[0]));
  if (Y)
    return H8(await q, W);
  else
    return q;
};
var f$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var O = ($, Q, Y) => {
  return f$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var S0 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var v = ($, Q, Y, X) => {
  return f$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var G8 = "text/plain; charset=UTF-8";
var o1 = ($, Q = {}) => {
  return Object.entries(Q).forEach(([Y, X]) => $.set(Y, X)), $;
};
var A0;
var J0;
var _;
var C;
var m;
var W0;
var f0 = class {
  constructor($, Q) {
    if (this.env = {}, this._var = {}, this.finalized = false, this.error = void 0, S0(this, A0, 200), S0(this, J0, void 0), S0(this, _, void 0), S0(this, C, void 0), S0(this, m, void 0), S0(this, W0, true), this.layout = void 0, this.renderer = (Y) => this.html(Y), this.notFoundHandler = () => new Response(), this.render = (...Y) => this.renderer(...Y), this.setLayout = (Y) => this.layout = Y, this.getLayout = () => this.layout, this.setRenderer = (Y) => {
      this.renderer = Y;
    }, this.header = (Y, X, J) => {
      if (X === void 0) {
        if (O(this, _))
          O(this, _).delete(Y);
        else if (O(this, C))
          delete O(this, C)[Y.toLocaleLowerCase()];
        if (this.finalized)
          this.res.headers.delete(Y);
        return;
      }
      if (J?.append) {
        if (!O(this, _))
          v(this, W0, false), v(this, _, new Headers(O(this, C))), v(this, C, {});
        O(this, _).append(Y, X);
      } else if (O(this, _))
        O(this, _).set(Y, X);
      else
        O(this, C) ?? v(this, C, {}), O(this, C)[Y.toLowerCase()] = X;
      if (this.finalized)
        if (J?.append)
          this.res.headers.append(Y, X);
        else
          this.res.headers.set(Y, X);
    }, this.status = (Y) => {
      v(this, W0, false), v(this, A0, Y);
    }, this.set = (Y, X) => {
      this._var ?? (this._var = {}), this._var[Y] = X;
    }, this.get = (Y) => {
      return this._var ? this._var[Y] : void 0;
    }, this.newResponse = (Y, X, J) => {
      if (O(this, W0) && !J && !X && O(this, A0) === 200)
        return new Response(Y, { headers: O(this, C) });
      if (X && typeof X !== "number") {
        const q = o1(new Headers(X.headers), O(this, C));
        return new Response(Y, { headers: q, status: X.status ?? O(this, A0) });
      }
      const W = typeof X === "number" ? X : O(this, A0);
      if (O(this, C) ?? v(this, C, {}), O(this, _) ?? v(this, _, new Headers()), o1(O(this, _), O(this, C)), O(this, m))
        O(this, m).headers.forEach((q, G) => {
          O(this, _)?.set(G, q);
        }), o1(O(this, _), O(this, C));
      J ?? (J = {});
      for (let [q, G] of Object.entries(J))
        if (typeof G === "string")
          O(this, _).set(q, G);
        else {
          O(this, _).delete(q);
          for (let H of G)
            O(this, _).append(q, H);
        }
      return new Response(Y, { status: W, headers: O(this, _) });
    }, this.body = (Y, X, J) => {
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.text = (Y, X, J) => {
      if (!O(this, C)) {
        if (O(this, W0) && !J && !X)
          return new Response(Y);
        v(this, C, {});
      }
      return O(this, C)["content-type"] = G8, typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.json = (Y, X, J) => {
      const W = JSON.stringify(Y);
      return O(this, C) ?? v(this, C, {}), O(this, C)["content-type"] = "application/json; charset=UTF-8", typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
    }, this.html = (Y, X, J) => {
      if (O(this, C) ?? v(this, C, {}), O(this, C)["content-type"] = "text/html; charset=UTF-8", typeof Y === "object") {
        if (!(Y instanceof Promise))
          Y = Y.toString();
        if (Y instanceof Promise)
          return Y.then((W) => d1(W, A$.Stringify, false, {})).then((W) => {
            return typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
          });
      }
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.redirect = (Y, X = 302) => {
      return O(this, _) ?? v(this, _, new Headers()), O(this, _).set("Location", Y), this.newResponse(null, X);
    }, this.notFound = () => {
      return this.notFoundHandler(this);
    }, this.req = $, Q) {
      if (v(this, J0, Q.executionCtx), this.env = Q.env, Q.notFoundHandler)
        this.notFoundHandler = Q.notFoundHandler;
    }
  }
  get event() {
    if (O(this, J0) && "respondWith" in O(this, J0))
      return O(this, J0);
    else
      throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (O(this, J0))
      return O(this, J0);
    else
      throw Error("This context has no ExecutionContext");
  }
  get res() {
    return v(this, W0, false), O(this, m) || v(this, m, new Response("404 Not Found", { status: 404 }));
  }
  set res($) {
    if (v(this, W0, false), O(this, m) && $) {
      O(this, m).headers.delete("content-type");
      for (let [Q, Y] of O(this, m).headers.entries())
        if (Q === "set-cookie") {
          const X = O(this, m).headers.getSetCookie();
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
A0 = /* @__PURE__ */ new WeakMap();
J0 = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
W0 = /* @__PURE__ */ new WeakMap();
var r1 = ($, Q, Y) => {
  return (X, J) => {
    let W = -1;
    return q(0);
    async function q(G) {
      if (G <= W)
        throw new Error("next() called multiple times");
      W = G;
      let H, z = false, U;
      if ($[G]) {
        if (U = $[G][0][0], X instanceof f0)
          X.req.routeIndex = G;
      } else
        U = G === $.length && J || void 0;
      if (!U) {
        if (X instanceof f0 && X.finalized === false && Y)
          H = await Y(X);
      } else
        try {
          H = await U(X, () => {
            return q(G + 1);
          });
        } catch (R) {
          if (R instanceof Error && X instanceof f0 && Q)
            X.error = R, H = await Q(R, X), z = true;
          else
            throw R;
        }
      if (H && (X.finalized === false || z))
        X.res = H;
      return X;
    }
  };
};
var s1 = class extends Error {
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
var z8 = function($) {
  if ($ === null)
    return false;
  return $.startsWith("multipart/form-data") || $.startsWith("application/x-www-form-urlencoded");
};
async function B8($, Q) {
  const Y = await $.formData();
  if (Y)
    return V8(Y, Q);
  return {};
}
var V8 = function($, Q) {
  const Y = {};
  return $.forEach((X, J) => {
    if (!(Q.all || J.endsWith("[]")))
      Y[J] = X;
    else
      M8(Y, J, X);
  }), Y;
};
var U8 = function($) {
  return Array.isArray($);
};
var C$ = async ($, Q = { all: false }) => {
  const X = ($ instanceof V1 ? $.raw.headers : $.headers).get("Content-Type");
  if (z8(X))
    return B8($, Q);
  return {};
};
var M8 = ($, Q, Y) => {
  if ($[Q] && U8($[Q]))
    w8($[Q], Y);
  else if ($[Q])
    O8($, Q, Y);
  else
    $[Q] = Y;
};
var w8 = ($, Q) => {
  $.push(Q);
};
var O8 = ($, Q, Y) => {
  $[Q] = [$[Q], Y];
};
var t1 = ($) => {
  const Q = $.split("/");
  if (Q[0] === "")
    Q.shift();
  return Q;
};
var I$ = ($) => {
  const { groups: Q, path: Y } = D8($), X = t1(Y);
  return F8(X, Q);
};
var D8 = ($) => {
  const Q = [];
  return $ = $.replace(/\{[^}]+\}/g, (Y, X) => {
    const J = `@${X}`;
    return Q.push([J, Y]), J;
  }), { groups: Q, path: $ };
};
var F8 = ($, Q) => {
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
var M1 = {};
var e1 = ($) => {
  if ($ === "*")
    return "*";
  const Q = $.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (Q) {
    if (!M1[$])
      if (Q[2])
        M1[$] = [$, Q[1], new RegExp("^" + Q[2] + "$")];
      else
        M1[$] = [$, Q[1], true];
    return M1[$];
  }
  return null;
};
var $$ = ($) => {
  const Q = $.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return Q ? Q[1] : "";
};
var P$ = ($) => {
  const Q = $.indexOf("?", 8);
  return Q === -1 ? "" : "?" + $.slice(Q + 1);
};
var _$ = ($) => {
  const Q = $$($);
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
var U1 = ($) => {
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
var a1 = ($) => {
  if (!/[%+]/.test($))
    return $;
  if ($.indexOf("+") !== -1)
    $ = $.replace(/\+/g, " ");
  return /%/.test($) ? i0($) : $;
};
var b$ = ($, Q, Y) => {
  let X;
  if (!Y && Q && !/[%+]/.test(Q)) {
    let q = $.indexOf(`?${Q}`, 8);
    if (q === -1)
      q = $.indexOf(`&${Q}`, 8);
    while (q !== -1) {
      const G = $.charCodeAt(q + Q.length + 1);
      if (G === 61) {
        const H = q + Q.length + 2, z = $.indexOf("&", H);
        return a1($.slice(H, z === -1 ? void 0 : z));
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
      H = a1(H);
    if (W = q, H === "")
      continue;
    let z;
    if (G === -1)
      z = "";
    else if (z = $.slice(G + 1, q === -1 ? void 0 : q), X)
      z = a1(z);
    if (Y) {
      if (!(J[H] && Array.isArray(J[H])))
        J[H] = [];
      J[H].push(z);
    } else
      J[H] ?? (J[H] = z);
  }
  return Q ? J[Q] : J;
};
var v$ = b$;
var j$ = ($, Q) => {
  return b$($, Q, true);
};
var i0 = decodeURIComponent;
var x$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var $0 = ($, Q, Y) => {
  return x$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var k$ = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var T$ = ($, Q, Y, X) => {
  return x$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var d0;
var i;
var V1 = class {
  constructor($, Q = "/", Y = [[]]) {
    k$(this, d0, void 0), k$(this, i, void 0), this.routeIndex = 0, this.bodyCache = {}, this.cachedBody = (X) => {
      const { bodyCache: J, raw: W } = this, q = J[X];
      if (q)
        return q;
      if (J.arrayBuffer)
        return (async () => {
          return await new Response(J.arrayBuffer)[X]();
        })();
      return J[X] = W[X]();
    }, this.raw = $, this.path = Q, T$(this, i, Y), T$(this, d0, {});
  }
  param($) {
    return $ ? this.getDecodedParam($) : this.getAllDecodedParams();
  }
  getDecodedParam($) {
    const Q = $0(this, i)[0][this.routeIndex][1][$], Y = this.getParamValue(Q);
    return Y ? /\%/.test(Y) ? i0(Y) : Y : void 0;
  }
  getAllDecodedParams() {
    const $ = {}, Q = Object.keys($0(this, i)[0][this.routeIndex][1]);
    for (let Y of Q) {
      const X = this.getParamValue($0(this, i)[0][this.routeIndex][1][Y]);
      if (X && typeof X === "string")
        $[Y] = /\%/.test(X) ? i0(X) : X;
    }
    return $;
  }
  getParamValue($) {
    return $0(this, i)[1] ? $0(this, i)[1][$] : $;
  }
  query($) {
    return v$(this.url, $);
  }
  queries($) {
    return j$(this.url, $);
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
    const Q = await C$(this, $);
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
    $0(this, d0)[$] = Q;
  }
  valid($) {
    return $0(this, d0)[$];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return $0(this, i)[0].map(([[, $]]) => $);
  }
  get routePath() {
    return $0(this, i)[0].map(([[, $]]) => $)[this.routeIndex].path;
  }
};
d0 = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakMap();
var P = "ALL";
var g$ = "all";
var Z$ = ["get", "post", "put", "delete", "options", "patch"];
var w1 = "Can not add a route since the matcher is already built.";
var O1 = class extends Error {
};
var N8 = function() {
  return class {
  };
};
var y$ = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var D1 = ($, Q, Y) => {
  return y$($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var L8 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var F1 = ($, Q, Y, X) => {
  return y$($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var K8 = Symbol("composedHandler");
var R8 = ($) => {
  return $.text("404 Not Found", 404);
};
var h$ = ($, Q) => {
  if ($ instanceof s1)
    return $.getResponse();
  return console.error($), Q.text("Internal Server Error", 500);
};
var d;
var m$ = class extends N8() {
  constructor($ = {}) {
    super();
    this._basePath = "/", L8(this, d, "/"), this.routes = [], this.notFoundHandler = R8, this.errorHandler = h$, this.onError = (X) => {
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
    }, [...Z$, g$].map((X) => {
      this[X] = (J, ...W) => {
        if (typeof J === "string")
          F1(this, d, J);
        else
          this.addRoute(X, D1(this, d), J);
        return W.map((q) => {
          if (typeof q !== "string")
            this.addRoute(X, D1(this, d), q);
        }), this;
      };
    }), this.on = (X, J, ...W) => {
      if (!X)
        return this;
      for (let q of [J].flat()) {
        F1(this, d, q);
        for (let G of [X].flat())
          W.map((H) => {
            this.addRoute(G.toUpperCase(), D1(this, d), H);
          });
      }
      return this;
    }, this.use = (X, ...J) => {
      if (typeof X === "string")
        F1(this, d, X);
      else
        F1(this, d, "*"), J.unshift(X);
      return J.map((W) => {
        this.addRoute(P, D1(this, d), W);
      }), this;
    };
    const Y = $.strict ?? true;
    delete $.strict, Object.assign(this, $), this.getPath = Y ? $.getPath ?? $$ : _$;
  }
  clone() {
    const $ = new m$({ router: this.router, getPath: this.getPath });
    return $.routes = this.routes, $;
  }
  route($, Q) {
    const Y = this.basePath($);
    if (!Q)
      return Y;
    return Q.routes.map((X) => {
      let J;
      if (Q.errorHandler === h$)
        J = X.handler;
      else
        J = async (W, q) => (await r1([], Q.errorHandler)(W, () => X.handler(W, q))).res, J[K8] = X.handler;
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
      const z = Y ? Y(q) : [q.env, H], U = Array.isArray(z) ? z : [z], R = P$(q.req.url), A = await Q(new Request(new URL((q.req.path.slice(J) || "/") + R, q.req.url), q.req.raw), ...U);
      if (A)
        return A;
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
    const J = this.getPath($, { env: Y }), W = this.matchRoute(X, J), q = new f0(new V1($, J, W), { env: Y, executionCtx: Q, notFoundHandler: this.notFoundHandler });
    if (W[0].length === 1) {
      let H;
      try {
        H = W[0][0][0][0](q, async () => {
          q.res = await this.notFoundHandler(q);
        });
      } catch (z) {
        return this.handleError(z, q);
      }
      return H instanceof Promise ? H.then((z) => z || (q.finalized ? q.res : this.notFoundHandler(q))).catch((z) => this.handleError(z, q)) : H;
    }
    const G = r1(W[0], this.errorHandler, this.notFoundHandler);
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
var l$ = m$;
d = /* @__PURE__ */ new WeakMap();
var E8 = function($, Q) {
  if ($.length === 1)
    return Q.length === 1 ? $ < Q ? -1 : 1 : -1;
  if (Q.length === 1)
    return 1;
  if ($ === o0 || $ === r0)
    return 1;
  else if (Q === o0 || Q === r0)
    return -1;
  if ($ === L1)
    return 1;
  else if (Q === L1)
    return -1;
  return $.length === Q.length ? $ < Q ? -1 : 1 : Q.length - $.length;
};
var L1 = "[^/]+";
var o0 = ".*";
var r0 = "(?:|/.*)";
var I0 = Symbol();
var K1 = class {
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
    const [W, ...q] = $, G = W === "*" ? q.length === 0 ? ["", "", o0] : ["", "", L1] : W === "/*" ? ["", "", r0] : W.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let H;
    if (G) {
      const z = G[1];
      let U = G[2] || L1;
      if (z && G[2]) {
        if (U = U.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(U))
          throw I0;
      }
      if (H = this.children[U], !H) {
        if (Object.keys(this.children).some((R) => R !== o0 && R !== r0))
          throw I0;
        if (J)
          return;
        if (H = this.children[U] = new K1(), z !== "")
          H.varIndex = X.varIndex++;
      }
      if (!J && z !== "")
        Y.push([z, H.varIndex]);
    } else if (H = this.children[W], !H) {
      if (Object.keys(this.children).some((z) => z.length > 1 && z !== o0 && z !== r0))
        throw I0;
      if (J)
        return;
      H = this.children[W] = new K1();
    }
    H.insert(q, Q, Y, X, J);
  }
  buildRegExpStr() {
    const Q = Object.keys(this.children).sort(E8).map((Y) => {
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
var c$ = class {
  constructor() {
    this.context = { varIndex: 0 }, this.root = new K1();
  }
  insert($, Q, Y) {
    const X = [], J = [];
    for (let q = 0; ; ) {
      let G = false;
      if ($ = $.replace(/\{[^}]+\}/g, (H) => {
        const z = `@\\${q}`;
        return J[q] = [z, H], q++, G = true, z;
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
var n$ = function($) {
  return Q$[$] ?? (Q$[$] = new RegExp($ === "*" ? "" : `^${$.replace(/\/\*/, "(?:|/.*)")}$`));
};
var A8 = function() {
  Q$ = {};
};
var f8 = function($) {
  const Q = new c$(), Y = [];
  if ($.length === 0)
    return S8;
  const X = $.map((z) => [!/\*|\/:/.test(z[0]), ...z]).sort(([z, U], [R, A]) => z ? 1 : R ? -1 : U.length - A.length), J = {};
  for (let z = 0, U = -1, R = X.length; z < R; z++) {
    const [A, g, b] = X[z];
    if (A)
      J[g] = [b.map(([Z]) => [Z, {}]), u$];
    else
      U++;
    let x;
    try {
      x = Q.insert(g, U, A);
    } catch (Z) {
      throw Z === I0 ? new O1(g) : Z;
    }
    if (A)
      continue;
    Y[U] = b.map(([Z, R0]) => {
      const n0 = {};
      R0 -= 1;
      for (; R0 >= 0; R0--) {
        const [X0, B1] = x[R0];
        n0[X0] = B1;
      }
      return [Z, n0];
    });
  }
  const [W, q, G] = Q.buildRegExp();
  for (let z = 0, U = Y.length; z < U; z++)
    for (let R = 0, A = Y[z].length; R < A; R++) {
      const g = Y[z][R]?.[1];
      if (!g)
        continue;
      const b = Object.keys(g);
      for (let x = 0, Z = b.length; x < Z; x++)
        g[b[x]] = G[g[b[x]]];
    }
  const H = [];
  for (let z in q)
    H[z] = Y[q[z]];
  return [W, H, J];
};
var P0 = function($, Q) {
  if (!$)
    return;
  for (let Y of Object.keys($).sort((X, J) => J.length - X.length))
    if (n$(Y).test(Q))
      return [...$[Y]];
  return;
};
var u$ = [];
var S8 = [/^$/, [], {}];
var Q$ = {};
var Y$ = class {
  constructor() {
    this.name = "RegExpRouter", this.middleware = { [P]: {} }, this.routes = { [P]: {} };
  }
  add($, Q, Y) {
    var X;
    const { middleware: J, routes: W } = this;
    if (!J || !W)
      throw new Error(w1);
    if (!J[$])
      [J, W].forEach((H) => {
        H[$] = {}, Object.keys(H[P]).forEach((z) => {
          H[$][z] = [...H[P][z]];
        });
      });
    if (Q === "/*")
      Q = "*";
    const q = (Q.match(/\/:/g) || []).length;
    if (/\*$/.test(Q)) {
      const H = n$(Q);
      if ($ === P)
        Object.keys(J).forEach((z) => {
          var U;
          (U = J[z])[Q] || (U[Q] = P0(J[z], Q) || P0(J[P], Q) || []);
        });
      else
        (X = J[$])[Q] || (X[Q] = P0(J[$], Q) || P0(J[P], Q) || []);
      Object.keys(J).forEach((z) => {
        if ($ === P || $ === z)
          Object.keys(J[z]).forEach((U) => {
            H.test(U) && J[z][U].push([Y, q]);
          });
      }), Object.keys(W).forEach((z) => {
        if ($ === P || $ === z)
          Object.keys(W[z]).forEach((U) => H.test(U) && W[z][U].push([Y, q]));
      });
      return;
    }
    const G = U1(Q) || [Q];
    for (let H = 0, z = G.length; H < z; H++) {
      const U = G[H];
      Object.keys(W).forEach((R) => {
        var A;
        if ($ === P || $ === R)
          (A = W[R])[U] || (A[U] = [...P0(J[R], U) || P0(J[P], U) || []]), W[R][U].push([Y, q - z + H + 1]);
      });
    }
  }
  match($, Q) {
    A8();
    const Y = this.buildAllMatchers();
    return this.match = (X, J) => {
      const W = Y[X] || Y[P], q = W[2][J];
      if (q)
        return q;
      const G = J.match(W[0]);
      if (!G)
        return [[], u$];
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
      return f8(Q);
  }
};
var X$ = class {
  constructor($) {
    this.name = "SmartRouter", this.routers = [], this.routes = [], Object.assign(this, $);
  }
  add($, Q, Y) {
    if (!this.routes)
      throw new Error(w1);
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
        if (H instanceof O1)
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
var J$ = class {
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
    const J = I$(Q), W = [], q = [];
    for (let z = 0, U = J.length; z < U; z++) {
      const R = J[z];
      if (Object.keys(X.children).includes(R)) {
        q.push(...X.patterns), X = X.children[R];
        const g = e1(R);
        if (g)
          W.push(g[1]);
        continue;
      }
      X.children[R] = new J$();
      const A = e1(R);
      if (A)
        X.patterns.push(A), q.push(...X.patterns), W.push(A[1]);
      q.push(...X.patterns), X = X.children[R];
    }
    if (!X.methods.length)
      X.methods = [];
    const G = {}, H = { handler: Y, possibleKeys: W.filter((z, U, R) => R.indexOf(z) === U), name: this.name, score: this.order };
    return G[$] = H, X.methods.push(G), X;
  }
  gHSets($, Q, Y, X) {
    const J = [];
    for (let W = 0, q = $.methods.length; W < q; W++) {
      const G = $.methods[W], H = G[Q] || G[P], z = {};
      if (H !== void 0)
        H.params = {}, H.possibleKeys.forEach((U) => {
          const R = z[H.name];
          H.params[U] = X[U] && !R ? X[U] : Y[U] ?? X[U], z[H.name] = true;
        }), J.push(H);
    }
    return J;
  }
  search($, Q) {
    const Y = [];
    this.params = {};
    let J = [this];
    const W = t1(Q);
    for (let G = 0, H = W.length; G < H; G++) {
      const z = W[G], U = G === H - 1, R = [];
      for (let A = 0, g = J.length; A < g; A++) {
        const b = J[A], x = b.children[z];
        if (x)
          if (x.params = b.params, U === true) {
            if (x.children["*"])
              Y.push(...this.gHSets(x.children["*"], $, b.params, {}));
            Y.push(...this.gHSets(x, $, b.params, {}));
          } else
            R.push(x);
        for (let Z = 0, R0 = b.patterns.length; Z < R0; Z++) {
          const n0 = b.patterns[Z], X0 = { ...b.params };
          if (n0 === "*") {
            const p1 = b.children["*"];
            if (p1)
              Y.push(...this.gHSets(p1, $, b.params, {})), R.push(p1);
            continue;
          }
          if (z === "")
            continue;
          const [B1, E$, p0] = n0, E0 = b.children[B1], S$ = W.slice(G).join("/");
          if (p0 instanceof RegExp && p0.test(S$)) {
            X0[E$] = S$, Y.push(...this.gHSets(E0, $, b.params, X0));
            continue;
          }
          if (p0 === true || p0 instanceof RegExp && p0.test(z)) {
            if (typeof B1 === "string")
              if (X0[E$] = z, U === true) {
                if (Y.push(...this.gHSets(E0, $, X0, b.params)), E0.children["*"])
                  Y.push(...this.gHSets(E0.children["*"], $, X0, b.params));
              } else
                E0.params = X0, R.push(E0);
          }
        }
      }
      J = R;
    }
    return [Y.sort((G, H) => {
      return G.score - H.score;
    }).map(({ handler: G, params: H }) => [G, H])];
  }
};
var W$ = class {
  constructor() {
    this.name = "TrieRouter", this.node = new J$();
  }
  add($, Q, Y) {
    const X = U1(Q);
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
var q$ = class extends l$ {
  constructor($ = {}) {
    super($);
    this.router = $.router ?? new X$({ routers: [new Y$(), new W$()] });
  }
};
var _0 = {};
i1(_0, { verify: () => {
  {
    return v8;
  }
}, sign: () => {
  {
    return b8;
  }
}, decode: () => {
  {
    return Y6;
  }
} });
var p$ = ($) => {
  return I8($.replace(/_|-/g, (Q) => ({ _: "/", "-": "+" })[Q] ?? Q));
};
var H$ = ($) => C8($).replace(/\/|\+/g, (Q) => ({ "/": "_", "+": "-" })[Q] ?? Q);
var C8 = ($) => {
  let Q = "";
  const Y = new Uint8Array($);
  for (let X = 0, J = Y.length; X < J; X++)
    Q += String.fromCharCode(Y[X]);
  return btoa(Q);
};
var I8 = ($) => {
  const Q = atob($), Y = new Uint8Array(new ArrayBuffer(Q.length)), X = Q.length / 2;
  for (let J = 0, W = Q.length - 1; J <= X; J++, W--)
    Y[J] = Q.charCodeAt(J), Y[W] = Q.charCodeAt(W);
  return Y;
};
var i$ = class extends Error {
  constructor($) {
    super(`${$} is not an implemented algorithm`);
    this.name = "JwtAlgorithmNotImplemented";
  }
};
var G$ = class extends Error {
  constructor($) {
    super(`invalid JWT token: ${$}`);
    this.name = "JwtTokenInvalid";
  }
};
var d$ = class extends Error {
  constructor($) {
    super(`token (${$}) is being used before it's valid`);
    this.name = "JwtTokenNotBefore";
  }
};
var o$ = class extends Error {
  constructor($) {
    super(`token (${$}) expired`);
    this.name = "JwtTokenExpired";
  }
};
var r$ = class extends Error {
  constructor($, Q) {
    super(`Incorrect "iat" claim must be a older than "${$}" (iat: "${Q}")`);
    this.name = "JwtTokenIssuedAt";
  }
};
var s$ = class extends Error {
  constructor($) {
    super(`token(${$}) signature mismatched`);
    this.name = "JwtTokenSignatureMismatched";
  }
};
var P8 = new TextEncoder();
var _8 = new TextDecoder();
var a$ = ($) => H$(P8.encode(JSON.stringify($))).replace(/=/g, "");
var $6 = ($) => H$($).replace(/=/g, "");
var t$ = ($) => JSON.parse(_8.decode(p$($)));
var e$ = ($) => {
  switch ($.toUpperCase()) {
    case "HS256":
      return { name: "HMAC", hash: { name: "SHA-256" } };
    case "HS384":
      return { name: "HMAC", hash: { name: "SHA-384" } };
    case "HS512":
      return { name: "HMAC", hash: { name: "SHA-512" } };
    default:
      throw new i$($);
  }
};
var Q6 = async ($, Q, Y = "HS256") => {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  const X = new TextEncoder(), J = await crypto.subtle.importKey("raw", X.encode(Q), e$(Y), false, ["sign"]);
  return await crypto.subtle.sign(e$(Y), J, X.encode($));
};
var b8 = async ($, Q, Y = "HS256") => {
  const X = a$($), W = `${a$({ alg: Y, typ: "JWT" })}.${X}`, q = await Q6(W, Q, Y), G = $6(q);
  return `${W}.${G}`;
};
var v8 = async ($, Q, Y = "HS256") => {
  const X = $.split(".");
  if (X.length !== 3)
    throw new G$($);
  const { payload: J } = Y6($), W = Math.floor(Date.now() / 1e3);
  if (J.nbf && J.nbf > W)
    throw new d$($);
  if (J.exp && J.exp <= W)
    throw new o$($);
  if (J.iat && W < J.iat)
    throw new r$(W, J.iat);
  const q = X.slice(0, 2).join("."), G = await Q6(q, Q, Y);
  if ($6(G) !== X[2])
    throw new s$($);
  return J;
};
var Y6 = ($) => {
  try {
    const [Q, Y] = $.split("."), X = t$(Q), J = t$(Y);
    return { header: X, payload: J };
  } catch (Q) {
    throw new G$($);
  }
};
var z$ = _0.verify;
var A5 = _0.decode;
var X6 = _0.sign;
var E;
(function(N1) {
  let $;
  (function(J) {
    J[J["success"] = 0] = "success";
    J[J["fail"] = 1] = "fail";
  })($ = N1.Code || (N1.Code = {}));
  let Q;
  (function(q) {
    q[q["notFound"] = 0] = "notFound";
    q[q["falseMethod"] = 1] = "falseMethod";
    q[q["unauthorization"] = 2] = "unauthorization";
    q[q["format"] = 3] = "format";
  })(Q = N1.FailCode || (N1.FailCode = {}));
})(E || (E = {}));
var k8 = function($) {
  q6 = $;
};
var E1 = function() {
  return q6;
};
var M = function($, Q) {
  const Y = S1({ issueData: Q, data: $.data, path: $.path, errorMaps: [$.common.contextualErrorMap, $.schemaErrorMap, E1(), s0].filter((X) => !!X) });
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
  return { errorMap: (q, G) => {
    if (q.code !== "invalid_type")
      return { message: G.defaultError };
    if (typeof G.data === "undefined")
      return { message: X !== null && X !== void 0 ? X : G.defaultError };
    return { message: Y !== null && Y !== void 0 ? Y : G.defaultError };
  }, description: J };
};
var n8 = function($, Q) {
  if ((Q === "v4" || !Q) && l8.test($))
    return true;
  if ((Q === "v6" || !Q) && c8.test($))
    return true;
  return false;
};
var p8 = function($, Q) {
  const Y = ($.toString().split(".")[1] || "").length, X = (Q.toString().split(".")[1] || "").length, J = Y > X ? Y : X, W = parseInt($.toFixed(J).replace(".", "")), q = parseInt(Q.toFixed(J).replace(".", ""));
  return W % q / Math.pow(10, J);
};
var b0 = function($) {
  if ($ instanceof I) {
    const Q = {};
    for (let Y in $.shape) {
      const X = $.shape[Y];
      Q[Y] = o.create(b0(X));
    }
    return new I({ ...$._def, shape: () => Q });
  } else if ($ instanceof c)
    return new c({ ...$._def, type: b0($.element) });
  else if ($ instanceof o)
    return o.create(b0($.unwrap()));
  else if ($ instanceof V0)
    return V0.create(b0($.unwrap()));
  else if ($ instanceof s)
    return s.create($.items.map((Q) => b0(Q)));
  else
    return $;
};
var w$ = function($, Q) {
  const Y = q0($), X = q0(Q);
  if ($ === Q)
    return { valid: true, data: $ };
  else if (Y === V.object && X === V.object) {
    const J = S.objectKeys(Q), W = S.objectKeys($).filter((G) => J.indexOf(G) !== -1), q = { ...$, ...Q };
    for (let G of W) {
      const H = w$($[G], Q[G]);
      if (!H.valid)
        return { valid: false };
      q[G] = H.data;
    }
    return { valid: true, data: q };
  } else if (Y === V.array && X === V.array) {
    if ($.length !== Q.length)
      return { valid: false };
    const J = [];
    for (let W = 0; W < $.length; W++) {
      const q = $[W], G = Q[W], H = w$(q, G);
      if (!H.valid)
        return { valid: false };
      J.push(H.data);
    }
    return { valid: true, data: J };
  } else if (Y === V.date && X === V.date && +$ === +Q)
    return { valid: true, data: $ };
  else
    return { valid: false };
};
var G6 = function($, Q) {
  return new B0({ values: $, typeName: D.ZodEnum, ...K(Q) });
};
var S;
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
})(S || (S = {}));
var V$;
(function($) {
  $.mergeShapes = (Q, Y) => {
    return { ...Q, ...Y };
  };
})(V$ || (V$ = {}));
var V = S.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
var q0 = ($) => {
  switch (typeof $) {
    case "undefined":
      return V.undefined;
    case "string":
      return V.string;
    case "number":
      return isNaN($) ? V.nan : V.number;
    case "boolean":
      return V.boolean;
    case "function":
      return V.function;
    case "bigint":
      return V.bigint;
    case "symbol":
      return V.symbol;
    case "object":
      if (Array.isArray($))
        return V.array;
      if ($ === null)
        return V.null;
      if ($.then && typeof $.then === "function" && $.catch && typeof $.catch === "function")
        return V.promise;
      if (typeof Map !== "undefined" && $ instanceof Map)
        return V.map;
      if (typeof Set !== "undefined" && $ instanceof Set)
        return V.set;
      if (typeof Date !== "undefined" && $ instanceof Date)
        return V.date;
      return V.object;
    default:
      return V.unknown;
  }
};
var B = S.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
var j8 = ($) => {
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
    return JSON.stringify(this.issues, S.jsonStringifyReplacer, 2);
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
var s0 = ($, Q) => {
  let Y;
  switch ($.code) {
    case B.invalid_type:
      if ($.received === V.undefined)
        Y = "Required";
      else
        Y = `Expected ${$.expected}, received ${$.received}`;
      break;
    case B.invalid_literal:
      Y = `Invalid literal value, expected ${JSON.stringify($.expected, S.jsonStringifyReplacer)}`;
      break;
    case B.unrecognized_keys:
      Y = `Unrecognized key(s) in object: ${S.joinValues($.keys, ", ")}`;
      break;
    case B.invalid_union:
      Y = "Invalid input";
      break;
    case B.invalid_union_discriminator:
      Y = `Invalid discriminator value. Expected ${S.joinValues($.options)}`;
      break;
    case B.invalid_enum_value:
      Y = `Invalid enum value. Expected ${S.joinValues($.options)}, received '${$.received}'`;
      break;
    case B.invalid_arguments:
      Y = "Invalid function arguments";
      break;
    case B.invalid_return_type:
      Y = "Invalid function return type";
      break;
    case B.invalid_date:
      Y = "Invalid date";
      break;
    case B.invalid_string:
      if (typeof $.validation === "object")
        if ("includes" in $.validation) {
          if (Y = `Invalid input: must include "${$.validation.includes}"`, typeof $.validation.position === "number")
            Y = `${Y} at one or more positions greater than or equal to ${$.validation.position}`;
        } else if ("startsWith" in $.validation)
          Y = `Invalid input: must start with "${$.validation.startsWith}"`;
        else if ("endsWith" in $.validation)
          Y = `Invalid input: must end with "${$.validation.endsWith}"`;
        else
          S.assertNever($.validation);
      else if ($.validation !== "regex")
        Y = `Invalid ${$.validation}`;
      else
        Y = "Invalid";
      break;
    case B.too_small:
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
    case B.too_big:
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
    case B.custom:
      Y = "Invalid input";
      break;
    case B.invalid_intersection_types:
      Y = "Intersection results could not be merged";
      break;
    case B.not_multiple_of:
      Y = `Number must be a multiple of ${$.multipleOf}`;
      break;
    case B.not_finite:
      Y = "Number must be finite";
      break;
    default:
      Y = Q.defaultError, S.assertNever($);
  }
  return { message: Y };
};
var q6 = s0;
var S1 = ($) => {
  const { data: Q, path: Y, errorMaps: X, issueData: J } = $, W = [...Y, ...J.path || []], q = { ...J, path: W };
  let G = "";
  const H = X.filter((z) => !!z).slice().reverse();
  for (let z of H)
    G = z(q, { data: Q, defaultError: G }).message;
  return { ...J, path: W, message: J.message || G };
};
var T8 = [];
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
    return j.mergeObjectSync($, Y);
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
var H6 = ($) => ({ status: "dirty", value: $ });
var T = ($) => ({ status: "valid", value: $ });
var M$ = ($) => $.status === "aborted";
var U$ = ($) => $.status === "dirty";
var a0 = ($) => $.status === "valid";
var A1 = ($) => typeof Promise !== "undefined" && $ instanceof Promise;
var w;
(function($) {
  $.errToObj = (Q) => typeof Q === "string" ? { message: Q } : Q || {}, $.toString = (Q) => typeof Q === "string" ? Q : Q === null || Q === void 0 ? void 0 : Q.message;
})(w || (w = {}));
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
var J6 = ($, Q) => {
  if (a0(Q))
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
var N = class {
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
    if (A1(Q))
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
    return J6(X, J);
  }
  async parseAsync($, Q) {
    const Y = await this.safeParseAsync($, Q);
    if (Y.success)
      return Y.data;
    throw Y.error;
  }
  async safeParseAsync($, Q) {
    const Y = { common: { issues: [], contextualErrorMap: Q === null || Q === void 0 ? void 0 : Q.errorMap, async: true }, path: (Q === null || Q === void 0 ? void 0 : Q.path) || [], schemaErrorMap: this._def.errorMap, parent: null, data: $, parsedType: q0($) }, X = this._parse({ data: $, path: Y.path, parent: Y }), J = await (A1(X) ? X : Promise.resolve(X));
    return J6(Y, J);
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
      const W = $(X), q = () => J.addIssue({ code: B.custom, ...Y(X) });
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
    return new y({ schema: this, typeName: D.ZodEffects, effect: { type: "refinement", refinement: $ } });
  }
  superRefine($) {
    return this._refinement($);
  }
  optional() {
    return o.create(this, this._def);
  }
  nullable() {
    return V0.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return c.create(this, this._def);
  }
  promise() {
    return F0.create(this, this._def);
  }
  or($) {
    return x0.create([this, $], this._def);
  }
  and($) {
    return g0.create(this, $, this._def);
  }
  transform($) {
    return new y({ ...K(this._def), schema: this, typeName: D.ZodEffects, effect: { type: "transform", transform: $ } });
  }
  default($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new m0({ ...K(this._def), innerType: this, defaultValue: Q, typeName: D.ZodDefault });
  }
  brand() {
    return new O$({ typeName: D.ZodBranded, type: this, ...K(this._def) });
  }
  catch($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new Y1({ ...K(this._def), innerType: this, catchValue: Q, typeName: D.ZodCatch });
  }
  describe($) {
    return new this.constructor({ ...this._def, description: $ });
  }
  pipe($) {
    return W1.create(this, $);
  }
  readonly() {
    return J1.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var x8 = /^c[^\s-]{8,}$/i;
var g8 = /^[a-z][a-z0-9]*$/;
var Z8 = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var h8 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var y8 = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var m8 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
var B$;
var l8 = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var c8 = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var u8 = ($) => {
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
var l = class extends N {
  _parse($) {
    if (this._def.coerce)
      $.data = String($.data);
    if (this._getType($) !== V.string) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: B.invalid_type, expected: V.string, received: J.parsedType }), L;
    }
    const Y = new j();
    let X = void 0;
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if ($.data.length < J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: B.too_small, minimum: J.value, type: "string", inclusive: true, exact: false, message: J.message }), Y.dirty();
      } else if (J.kind === "max") {
        if ($.data.length > J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: B.too_big, maximum: J.value, type: "string", inclusive: true, exact: false, message: J.message }), Y.dirty();
      } else if (J.kind === "length") {
        const W = $.data.length > J.value, q = $.data.length < J.value;
        if (W || q) {
          if (X = this._getOrReturnCtx($, X), W)
            M(X, { code: B.too_big, maximum: J.value, type: "string", inclusive: true, exact: true, message: J.message });
          else if (q)
            M(X, { code: B.too_small, minimum: J.value, type: "string", inclusive: true, exact: true, message: J.message });
          Y.dirty();
        }
      } else if (J.kind === "email") {
        if (!y8.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "email", code: B.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "emoji") {
        if (!B$)
          B$ = new RegExp(m8, "u");
        if (!B$.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "emoji", code: B.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "uuid") {
        if (!h8.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "uuid", code: B.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid") {
        if (!x8.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "cuid", code: B.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid2") {
        if (!g8.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "cuid2", code: B.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "ulid") {
        if (!Z8.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "ulid", code: B.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "url")
        try {
          new URL($.data);
        } catch (W) {
          X = this._getOrReturnCtx($, X), M(X, { validation: "url", code: B.invalid_string, message: J.message }), Y.dirty();
        }
      else if (J.kind === "regex") {
        if (J.regex.lastIndex = 0, !J.regex.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "regex", code: B.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "trim")
        $.data = $.data.trim();
      else if (J.kind === "includes") {
        if (!$.data.includes(J.value, J.position))
          X = this._getOrReturnCtx($, X), M(X, { code: B.invalid_string, validation: { includes: J.value, position: J.position }, message: J.message }), Y.dirty();
      } else if (J.kind === "toLowerCase")
        $.data = $.data.toLowerCase();
      else if (J.kind === "toUpperCase")
        $.data = $.data.toUpperCase();
      else if (J.kind === "startsWith") {
        if (!$.data.startsWith(J.value))
          X = this._getOrReturnCtx($, X), M(X, { code: B.invalid_string, validation: { startsWith: J.value }, message: J.message }), Y.dirty();
      } else if (J.kind === "endsWith") {
        if (!$.data.endsWith(J.value))
          X = this._getOrReturnCtx($, X), M(X, { code: B.invalid_string, validation: { endsWith: J.value }, message: J.message }), Y.dirty();
      } else if (J.kind === "datetime") {
        if (!u8(J).test($.data))
          X = this._getOrReturnCtx($, X), M(X, { code: B.invalid_string, validation: "datetime", message: J.message }), Y.dirty();
      } else if (J.kind === "ip") {
        if (!n8($.data, J.version))
          X = this._getOrReturnCtx($, X), M(X, { validation: "ip", code: B.invalid_string, message: J.message }), Y.dirty();
      } else
        S.assertNever(J);
    return { status: Y.value, value: $.data };
  }
  _regex($, Q, Y) {
    return this.refinement((X) => $.test(X), { validation: Q, code: B.invalid_string, ...w.errToObj(Y) });
  }
  _addCheck($) {
    return new l({ ...this._def, checks: [...this._def.checks, $] });
  }
  email($) {
    return this._addCheck({ kind: "email", ...w.errToObj($) });
  }
  url($) {
    return this._addCheck({ kind: "url", ...w.errToObj($) });
  }
  emoji($) {
    return this._addCheck({ kind: "emoji", ...w.errToObj($) });
  }
  uuid($) {
    return this._addCheck({ kind: "uuid", ...w.errToObj($) });
  }
  cuid($) {
    return this._addCheck({ kind: "cuid", ...w.errToObj($) });
  }
  cuid2($) {
    return this._addCheck({ kind: "cuid2", ...w.errToObj($) });
  }
  ulid($) {
    return this._addCheck({ kind: "ulid", ...w.errToObj($) });
  }
  ip($) {
    return this._addCheck({ kind: "ip", ...w.errToObj($) });
  }
  datetime($) {
    var Q;
    if (typeof $ === "string")
      return this._addCheck({ kind: "datetime", precision: null, offset: false, message: $ });
    return this._addCheck({ kind: "datetime", precision: typeof ($ === null || $ === void 0 ? void 0 : $.precision) === "undefined" ? null : $ === null || $ === void 0 ? void 0 : $.precision, offset: (Q = $ === null || $ === void 0 ? void 0 : $.offset) !== null && Q !== void 0 ? Q : false, ...w.errToObj($ === null || $ === void 0 ? void 0 : $.message) });
  }
  regex($, Q) {
    return this._addCheck({ kind: "regex", regex: $, ...w.errToObj(Q) });
  }
  includes($, Q) {
    return this._addCheck({ kind: "includes", value: $, position: Q === null || Q === void 0 ? void 0 : Q.position, ...w.errToObj(Q === null || Q === void 0 ? void 0 : Q.message) });
  }
  startsWith($, Q) {
    return this._addCheck({ kind: "startsWith", value: $, ...w.errToObj(Q) });
  }
  endsWith($, Q) {
    return this._addCheck({ kind: "endsWith", value: $, ...w.errToObj(Q) });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $, ...w.errToObj(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $, ...w.errToObj(Q) });
  }
  length($, Q) {
    return this._addCheck({ kind: "length", value: $, ...w.errToObj(Q) });
  }
  nonempty($) {
    return this.min(1, w.errToObj($));
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
  return new l({ checks: [], typeName: D.ZodString, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...K($) });
};
var G0 = class extends N {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = Number($.data);
    if (this._getType($) !== V.number) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: B.invalid_type, expected: V.number, received: J.parsedType }), L;
    }
    let Y = void 0;
    const X = new j();
    for (let J of this._def.checks)
      if (J.kind === "int") {
        if (!S.isInteger($.data))
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.invalid_type, expected: "integer", received: "float", message: J.message }), X.dirty();
      } else if (J.kind === "min") {
        if (J.inclusive ? $.data < J.value : $.data <= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.too_small, minimum: J.value, type: "number", inclusive: J.inclusive, exact: false, message: J.message }), X.dirty();
      } else if (J.kind === "max") {
        if (J.inclusive ? $.data > J.value : $.data >= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.too_big, maximum: J.value, type: "number", inclusive: J.inclusive, exact: false, message: J.message }), X.dirty();
      } else if (J.kind === "multipleOf") {
        if (p8($.data, J.value) !== 0)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.not_multiple_of, multipleOf: J.value, message: J.message }), X.dirty();
      } else if (J.kind === "finite") {
        if (!Number.isFinite($.data))
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.not_finite, message: J.message }), X.dirty();
      } else
        S.assertNever(J);
    return { status: X.value, value: $.data };
  }
  gte($, Q) {
    return this.setLimit("min", $, true, w.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, w.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, w.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, w.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new G0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: w.toString(X) }] });
  }
  _addCheck($) {
    return new G0({ ...this._def, checks: [...this._def.checks, $] });
  }
  int($) {
    return this._addCheck({ kind: "int", message: w.toString($) });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: false, message: w.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: false, message: w.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: true, message: w.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: true, message: w.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: w.toString(Q) });
  }
  finite($) {
    return this._addCheck({ kind: "finite", message: w.toString($) });
  }
  safe($) {
    return this._addCheck({ kind: "min", inclusive: true, value: Number.MIN_SAFE_INTEGER, message: w.toString($) })._addCheck({ kind: "max", inclusive: true, value: Number.MAX_SAFE_INTEGER, message: w.toString($) });
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
    return !!this._def.checks.find(($) => $.kind === "int" || $.kind === "multipleOf" && S.isInteger($.value));
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
  return new G0({ checks: [], typeName: D.ZodNumber, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...K($) });
};
var z0 = class extends N {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = BigInt($.data);
    if (this._getType($) !== V.bigint) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: B.invalid_type, expected: V.bigint, received: J.parsedType }), L;
    }
    let Y = void 0;
    const X = new j();
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if (J.inclusive ? $.data < J.value : $.data <= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.too_small, type: "bigint", minimum: J.value, inclusive: J.inclusive, message: J.message }), X.dirty();
      } else if (J.kind === "max") {
        if (J.inclusive ? $.data > J.value : $.data >= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.too_big, type: "bigint", maximum: J.value, inclusive: J.inclusive, message: J.message }), X.dirty();
      } else if (J.kind === "multipleOf") {
        if ($.data % J.value !== BigInt(0))
          Y = this._getOrReturnCtx($, Y), M(Y, { code: B.not_multiple_of, multipleOf: J.value, message: J.message }), X.dirty();
      } else
        S.assertNever(J);
    return { status: X.value, value: $.data };
  }
  gte($, Q) {
    return this.setLimit("min", $, true, w.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, w.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, w.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, w.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new z0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: w.toString(X) }] });
  }
  _addCheck($) {
    return new z0({ ...this._def, checks: [...this._def.checks, $] });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: false, message: w.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: false, message: w.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: true, message: w.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: true, message: w.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: w.toString(Q) });
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
z0.create = ($) => {
  var Q;
  return new z0({ checks: [], typeName: D.ZodBigInt, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...K($) });
};
var j0 = class extends N {
  _parse($) {
    if (this._def.coerce)
      $.data = Boolean($.data);
    if (this._getType($) !== V.boolean) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: B.invalid_type, expected: V.boolean, received: Y.parsedType }), L;
    }
    return T($.data);
  }
};
j0.create = ($) => {
  return new j0({ typeName: D.ZodBoolean, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...K($) });
};
var w0 = class extends N {
  _parse($) {
    if (this._def.coerce)
      $.data = new Date($.data);
    if (this._getType($) !== V.date) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: B.invalid_type, expected: V.date, received: J.parsedType }), L;
    }
    if (isNaN($.data.getTime())) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: B.invalid_date }), L;
    }
    const Y = new j();
    let X = void 0;
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if ($.data.getTime() < J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: B.too_small, message: J.message, inclusive: true, exact: false, minimum: J.value, type: "date" }), Y.dirty();
      } else if (J.kind === "max") {
        if ($.data.getTime() > J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: B.too_big, message: J.message, inclusive: true, exact: false, maximum: J.value, type: "date" }), Y.dirty();
      } else
        S.assertNever(J);
    return { status: Y.value, value: new Date($.data.getTime()) };
  }
  _addCheck($) {
    return new w0({ ...this._def, checks: [...this._def.checks, $] });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $.getTime(), message: w.toString(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $.getTime(), message: w.toString(Q) });
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
w0.create = ($) => {
  return new w0({ checks: [], coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, typeName: D.ZodDate, ...K($) });
};
var t0 = class extends N {
  _parse($) {
    if (this._getType($) !== V.symbol) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: B.invalid_type, expected: V.symbol, received: Y.parsedType }), L;
    }
    return T($.data);
  }
};
t0.create = ($) => {
  return new t0({ typeName: D.ZodSymbol, ...K($) });
};
var k0 = class extends N {
  _parse($) {
    if (this._getType($) !== V.undefined) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: B.invalid_type, expected: V.undefined, received: Y.parsedType }), L;
    }
    return T($.data);
  }
};
k0.create = ($) => {
  return new k0({ typeName: D.ZodUndefined, ...K($) });
};
var T0 = class extends N {
  _parse($) {
    if (this._getType($) !== V.null) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: B.invalid_type, expected: V.null, received: Y.parsedType }), L;
    }
    return T($.data);
  }
};
T0.create = ($) => {
  return new T0({ typeName: D.ZodNull, ...K($) });
};
var O0 = class extends N {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse($) {
    return T($.data);
  }
};
O0.create = ($) => {
  return new O0({ typeName: D.ZodAny, ...K($) });
};
var H0 = class extends N {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse($) {
    return T($.data);
  }
};
H0.create = ($) => {
  return new H0({ typeName: D.ZodUnknown, ...K($) });
};
var r = class extends N {
  _parse($) {
    const Q = this._getOrReturnCtx($);
    return M(Q, { code: B.invalid_type, expected: V.never, received: Q.parsedType }), L;
  }
};
r.create = ($) => {
  return new r({ typeName: D.ZodNever, ...K($) });
};
var e0 = class extends N {
  _parse($) {
    if (this._getType($) !== V.undefined) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: B.invalid_type, expected: V.void, received: Y.parsedType }), L;
    }
    return T($.data);
  }
};
e0.create = ($) => {
  return new e0({ typeName: D.ZodVoid, ...K($) });
};
var c = class extends N {
  _parse($) {
    const { ctx: Q, status: Y } = this._processInputParams($), X = this._def;
    if (Q.parsedType !== V.array)
      return M(Q, { code: B.invalid_type, expected: V.array, received: Q.parsedType }), L;
    if (X.exactLength !== null) {
      const W = Q.data.length > X.exactLength.value, q = Q.data.length < X.exactLength.value;
      if (W || q)
        M(Q, { code: W ? B.too_big : B.too_small, minimum: q ? X.exactLength.value : void 0, maximum: W ? X.exactLength.value : void 0, type: "array", inclusive: true, exact: true, message: X.exactLength.message }), Y.dirty();
    }
    if (X.minLength !== null) {
      if (Q.data.length < X.minLength.value)
        M(Q, { code: B.too_small, minimum: X.minLength.value, type: "array", inclusive: true, exact: false, message: X.minLength.message }), Y.dirty();
    }
    if (X.maxLength !== null) {
      if (Q.data.length > X.maxLength.value)
        M(Q, { code: B.too_big, maximum: X.maxLength.value, type: "array", inclusive: true, exact: false, message: X.maxLength.message }), Y.dirty();
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
    return new c({ ...this._def, minLength: { value: $, message: w.toString(Q) } });
  }
  max($, Q) {
    return new c({ ...this._def, maxLength: { value: $, message: w.toString(Q) } });
  }
  length($, Q) {
    return new c({ ...this._def, exactLength: { value: $, message: w.toString(Q) } });
  }
  nonempty($) {
    return this.min(1, $);
  }
};
c.create = ($, Q) => {
  return new c({ type: $, minLength: null, maxLength: null, exactLength: null, typeName: D.ZodArray, ...K(Q) });
};
var I = class extends N {
  constructor() {
    super(...arguments);
    this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const $ = this._def.shape(), Q = S.objectKeys($);
    return this._cached = { shape: $, keys: Q };
  }
  _parse($) {
    if (this._getType($) !== V.object) {
      const H = this._getOrReturnCtx($);
      return M(H, { code: B.invalid_type, expected: V.object, received: H.parsedType }), L;
    }
    const { status: Y, ctx: X } = this._processInputParams($), { shape: J, keys: W } = this._getCached(), q = [];
    if (!(this._def.catchall instanceof r && this._def.unknownKeys === "strip")) {
      for (let H in X.data)
        if (!W.includes(H))
          q.push(H);
    }
    const G = [];
    for (let H of W) {
      const z = J[H], U = X.data[H];
      G.push({ key: { status: "valid", value: H }, value: z._parse(new u(X, U, X.path, H)), alwaysSet: H in X.data });
    }
    if (this._def.catchall instanceof r) {
      const H = this._def.unknownKeys;
      if (H === "passthrough")
        for (let z of q)
          G.push({ key: { status: "valid", value: z }, value: { status: "valid", value: X.data[z] } });
      else if (H === "strict") {
        if (q.length > 0)
          M(X, { code: B.unrecognized_keys, keys: q }), Y.dirty();
      } else if (H === "strip")
        ;
      else
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const H = this._def.catchall;
      for (let z of q) {
        const U = X.data[z];
        G.push({ key: { status: "valid", value: z }, value: H._parse(new u(X, U, X.path, z)), alwaysSet: z in X.data });
      }
    }
    if (X.common.async)
      return Promise.resolve().then(async () => {
        const H = [];
        for (let z of G) {
          const U = await z.key;
          H.push({ key: U, value: await z.value, alwaysSet: z.alwaysSet });
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
    return w.errToObj, new I({ ...this._def, unknownKeys: "strict", ...$ !== void 0 ? { errorMap: (Q, Y) => {
      var X, J, W, q;
      const G = (W = (J = (X = this._def).errorMap) === null || J === void 0 ? void 0 : J.call(X, Q, Y).message) !== null && W !== void 0 ? W : Y.defaultError;
      if (Q.code === "unrecognized_keys")
        return { message: (q = w.errToObj($).message) !== null && q !== void 0 ? q : G };
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
    return new I({ unknownKeys: $._def.unknownKeys, catchall: $._def.catchall, shape: () => ({ ...this._def.shape(), ...$._def.shape() }), typeName: D.ZodObject });
  }
  setKey($, Q) {
    return this.augment({ [$]: Q });
  }
  catchall($) {
    return new I({ ...this._def, catchall: $ });
  }
  pick($) {
    const Q = {};
    return S.objectKeys($).forEach((Y) => {
      if ($[Y] && this.shape[Y])
        Q[Y] = this.shape[Y];
    }), new I({ ...this._def, shape: () => Q });
  }
  omit($) {
    const Q = {};
    return S.objectKeys(this.shape).forEach((Y) => {
      if (!$[Y])
        Q[Y] = this.shape[Y];
    }), new I({ ...this._def, shape: () => Q });
  }
  deepPartial() {
    return b0(this);
  }
  partial($) {
    const Q = {};
    return S.objectKeys(this.shape).forEach((Y) => {
      const X = this.shape[Y];
      if ($ && !$[Y])
        Q[Y] = X;
      else
        Q[Y] = X.optional();
    }), new I({ ...this._def, shape: () => Q });
  }
  required($) {
    const Q = {};
    return S.objectKeys(this.shape).forEach((Y) => {
      if ($ && !$[Y])
        Q[Y] = this.shape[Y];
      else {
        let J = this.shape[Y];
        while (J instanceof o)
          J = J._def.innerType;
        Q[Y] = J;
      }
    }), new I({ ...this._def, shape: () => Q });
  }
  keyof() {
    return G6(S.objectKeys(this.shape));
  }
};
I.create = ($, Q) => {
  return new I({ shape: () => $, unknownKeys: "strip", catchall: r.create(), typeName: D.ZodObject, ...K(Q) });
};
I.strictCreate = ($, Q) => {
  return new I({ shape: () => $, unknownKeys: "strict", catchall: r.create(), typeName: D.ZodObject, ...K(Q) });
};
I.lazycreate = ($, Q) => {
  return new I({ shape: $, unknownKeys: "strip", catchall: r.create(), typeName: D.ZodObject, ...K(Q) });
};
var x0 = class extends N {
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
      return M(Q, { code: B.invalid_union, unionErrors: W }), L;
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
        const H = { ...Q, common: { ...Q.common, issues: [] }, parent: null }, z = G._parseSync({ data: Q.data, path: Q.path, parent: H });
        if (z.status === "valid")
          return z;
        else if (z.status === "dirty" && !J)
          J = { result: z, ctx: H };
        if (H.common.issues.length)
          W.push(H.common.issues);
      }
      if (J)
        return Q.common.issues.push(...J.ctx.common.issues), J.result;
      const q = W.map((G) => new h(G));
      return M(Q, { code: B.invalid_union, unionErrors: q }), L;
    }
  }
  get options() {
    return this._def.options;
  }
};
x0.create = ($, Q) => {
  return new x0({ options: $, typeName: D.ZodUnion, ...K(Q) });
};
var R1 = ($) => {
  if ($ instanceof Z0)
    return R1($.schema);
  else if ($ instanceof y)
    return R1($.innerType());
  else if ($ instanceof h0)
    return [$.value];
  else if ($ instanceof B0)
    return $.options;
  else if ($ instanceof y0)
    return Object.keys($.enum);
  else if ($ instanceof m0)
    return R1($._def.innerType);
  else if ($ instanceof k0)
    return [void 0];
  else if ($ instanceof T0)
    return [null];
  else
    return null;
};
var f1 = class extends N {
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== V.object)
      return M(Q, { code: B.invalid_type, expected: V.object, received: Q.parsedType }), L;
    const Y = this.discriminator, X = Q.data[Y], J = this.optionsMap.get(X);
    if (!J)
      return M(Q, { code: B.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [Y] }), L;
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
      const W = R1(J.shape[$]);
      if (!W)
        throw new Error(`A discriminator value for key \`${$}\` could not be extracted from all schema options`);
      for (let q of W) {
        if (X.has(q))
          throw new Error(`Discriminator property ${String($)} has duplicate value ${String(q)}`);
        X.set(q, J);
      }
    }
    return new f1({ typeName: D.ZodDiscriminatedUnion, discriminator: $, options: Q, optionsMap: X, ...K(Y) });
  }
};
var g0 = class extends N {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($), X = (J, W) => {
      if (M$(J) || M$(W))
        return L;
      const q = w$(J.value, W.value);
      if (!q.valid)
        return M(Y, { code: B.invalid_intersection_types }), L;
      if (U$(J) || U$(W))
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
  return new g0({ left: $, right: Q, typeName: D.ZodIntersection, ...K(Y) });
};
var s = class extends N {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== V.array)
      return M(Y, { code: B.invalid_type, expected: V.array, received: Y.parsedType }), L;
    if (Y.data.length < this._def.items.length)
      return M(Y, { code: B.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: "array" }), L;
    if (!this._def.rest && Y.data.length > this._def.items.length)
      M(Y, { code: B.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: "array" }), Q.dirty();
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
    return new s({ ...this._def, rest: $ });
  }
};
s.create = ($, Q) => {
  if (!Array.isArray($))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new s({ items: $, typeName: D.ZodTuple, rest: null, ...K(Q) });
};
var $1 = class extends N {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== V.object)
      return M(Y, { code: B.invalid_type, expected: V.object, received: Y.parsedType }), L;
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
    if (Q instanceof N)
      return new $1({ keyType: $, valueType: Q, typeName: D.ZodRecord, ...K(Y) });
    return new $1({ keyType: l.create(), valueType: $, typeName: D.ZodRecord, ...K(Q) });
  }
};
var Q1 = class extends N {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== V.map)
      return M(Y, { code: B.invalid_type, expected: V.map, received: Y.parsedType }), L;
    const X = this._def.keyType, J = this._def.valueType, W = [...Y.data.entries()].map(([q, G], H) => {
      return { key: X._parse(new u(Y, q, Y.path, [H, "key"])), value: J._parse(new u(Y, G, Y.path, [H, "value"])) };
    });
    if (Y.common.async) {
      const q = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (let G of W) {
          const H = await G.key, z = await G.value;
          if (H.status === "aborted" || z.status === "aborted")
            return L;
          if (H.status === "dirty" || z.status === "dirty")
            Q.dirty();
          q.set(H.value, z.value);
        }
        return { status: Q.value, value: q };
      });
    } else {
      const q = /* @__PURE__ */ new Map();
      for (let G of W) {
        const { key: H, value: z } = G;
        if (H.status === "aborted" || z.status === "aborted")
          return L;
        if (H.status === "dirty" || z.status === "dirty")
          Q.dirty();
        q.set(H.value, z.value);
      }
      return { status: Q.value, value: q };
    }
  }
};
Q1.create = ($, Q, Y) => {
  return new Q1({ valueType: Q, keyType: $, typeName: D.ZodMap, ...K(Y) });
};
var D0 = class extends N {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== V.set)
      return M(Y, { code: B.invalid_type, expected: V.set, received: Y.parsedType }), L;
    const X = this._def;
    if (X.minSize !== null) {
      if (Y.data.size < X.minSize.value)
        M(Y, { code: B.too_small, minimum: X.minSize.value, type: "set", inclusive: true, exact: false, message: X.minSize.message }), Q.dirty();
    }
    if (X.maxSize !== null) {
      if (Y.data.size > X.maxSize.value)
        M(Y, { code: B.too_big, maximum: X.maxSize.value, type: "set", inclusive: true, exact: false, message: X.maxSize.message }), Q.dirty();
    }
    const J = this._def.valueType;
    function W(G) {
      const H = /* @__PURE__ */ new Set();
      for (let z of G) {
        if (z.status === "aborted")
          return L;
        if (z.status === "dirty")
          Q.dirty();
        H.add(z.value);
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
    return new D0({ ...this._def, minSize: { value: $, message: w.toString(Q) } });
  }
  max($, Q) {
    return new D0({ ...this._def, maxSize: { value: $, message: w.toString(Q) } });
  }
  size($, Q) {
    return this.min($, Q).max($, Q);
  }
  nonempty($) {
    return this.min(1, $);
  }
};
D0.create = ($, Q) => {
  return new D0({ valueType: $, minSize: null, maxSize: null, typeName: D.ZodSet, ...K(Q) });
};
var v0 = class extends N {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== V.function)
      return M(Q, { code: B.invalid_type, expected: V.function, received: Q.parsedType }), L;
    function Y(q, G) {
      return S1({ data: q, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, E1(), s0].filter((H) => !!H), issueData: { code: B.invalid_arguments, argumentsError: G } });
    }
    function X(q, G) {
      return S1({ data: q, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, E1(), s0].filter((H) => !!H), issueData: { code: B.invalid_return_type, returnTypeError: G } });
    }
    const J = { errorMap: Q.common.contextualErrorMap }, W = Q.data;
    if (this._def.returns instanceof F0) {
      const q = this;
      return T(async function(...G) {
        const H = new h([]), z = await q._def.args.parseAsync(G, J).catch((A) => {
          throw H.addIssue(Y(G, A)), H;
        }), U = await Reflect.apply(W, this, z);
        return await q._def.returns._def.type.parseAsync(U, J).catch((A) => {
          throw H.addIssue(X(U, A)), H;
        });
      });
    } else {
      const q = this;
      return T(function(...G) {
        const H = q._def.args.safeParse(G, J);
        if (!H.success)
          throw new h([Y(G, H.error)]);
        const z = Reflect.apply(W, this, H.data), U = q._def.returns.safeParse(z, J);
        if (!U.success)
          throw new h([X(z, U.error)]);
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
    return new v0({ ...this._def, args: s.create($).rest(H0.create()) });
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
    return new v0({ args: $ ? $ : s.create([]).rest(H0.create()), returns: Q || H0.create(), typeName: D.ZodFunction, ...K(Y) });
  }
};
var Z0 = class extends N {
  get schema() {
    return this._def.getter();
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    return this._def.getter()._parse({ data: Q.data, path: Q.path, parent: Q });
  }
};
Z0.create = ($, Q) => {
  return new Z0({ getter: $, typeName: D.ZodLazy, ...K(Q) });
};
var h0 = class extends N {
  _parse($) {
    if ($.data !== this._def.value) {
      const Q = this._getOrReturnCtx($);
      return M(Q, { received: Q.data, code: B.invalid_literal, expected: this._def.value }), L;
    }
    return { status: "valid", value: $.data };
  }
  get value() {
    return this._def.value;
  }
};
h0.create = ($, Q) => {
  return new h0({ value: $, typeName: D.ZodLiteral, ...K(Q) });
};
var B0 = class extends N {
  _parse($) {
    if (typeof $.data !== "string") {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return M(Q, { expected: S.joinValues(Y), received: Q.parsedType, code: B.invalid_type }), L;
    }
    if (this._def.values.indexOf($.data) === -1) {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return M(Q, { received: Q.data, code: B.invalid_enum_value, options: Y }), L;
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
    return B0.create($);
  }
  exclude($) {
    return B0.create(this.options.filter((Q) => !$.includes(Q)));
  }
};
B0.create = G6;
var y0 = class extends N {
  _parse($) {
    const Q = S.getValidEnumValues(this._def.values), Y = this._getOrReturnCtx($);
    if (Y.parsedType !== V.string && Y.parsedType !== V.number) {
      const X = S.objectValues(Q);
      return M(Y, { expected: S.joinValues(X), received: Y.parsedType, code: B.invalid_type }), L;
    }
    if (Q.indexOf($.data) === -1) {
      const X = S.objectValues(Q);
      return M(Y, { received: Y.data, code: B.invalid_enum_value, options: X }), L;
    }
    return T($.data);
  }
  get enum() {
    return this._def.values;
  }
};
y0.create = ($, Q) => {
  return new y0({ values: $, typeName: D.ZodNativeEnum, ...K(Q) });
};
var F0 = class extends N {
  unwrap() {
    return this._def.type;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== V.promise && Q.common.async === false)
      return M(Q, { code: B.invalid_type, expected: V.promise, received: Q.parsedType }), L;
    const Y = Q.parsedType === V.promise ? Q.data : Promise.resolve(Q.data);
    return T(Y.then((X) => {
      return this._def.type.parseAsync(X, { path: Q.path, errorMap: Q.common.contextualErrorMap });
    }));
  }
};
F0.create = ($, Q) => {
  return new F0({ type: $, typeName: D.ZodPromise, ...K(Q) });
};
var y = class extends N {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === D.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($), X = this._def.effect || null, J = { addIssue: (W) => {
      if (M(Y, W), W.fatal)
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
        if (!a0(W))
          return W;
        const q = X.transform(W.value, J);
        if (q instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: Q.value, value: q };
      } else
        return this._def.schema._parseAsync({ data: Y.data, path: Y.path, parent: Y }).then((W) => {
          if (!a0(W))
            return W;
          return Promise.resolve(X.transform(W.value, J)).then((q) => ({ status: Q.value, value: q }));
        });
    S.assertNever(X);
  }
};
y.create = ($, Q, Y) => {
  return new y({ schema: $, typeName: D.ZodEffects, effect: Q, ...K(Y) });
};
y.createWithPreprocess = ($, Q, Y) => {
  return new y({ schema: Q, effect: { type: "preprocess", transform: $ }, typeName: D.ZodEffects, ...K(Y) });
};
var o = class extends N {
  _parse($) {
    if (this._getType($) === V.undefined)
      return T(void 0);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
o.create = ($, Q) => {
  return new o({ innerType: $, typeName: D.ZodOptional, ...K(Q) });
};
var V0 = class extends N {
  _parse($) {
    if (this._getType($) === V.null)
      return T(null);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
V0.create = ($, Q) => {
  return new V0({ innerType: $, typeName: D.ZodNullable, ...K(Q) });
};
var m0 = class extends N {
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    let Y = Q.data;
    if (Q.parsedType === V.undefined)
      Y = this._def.defaultValue();
    return this._def.innerType._parse({ data: Y, path: Q.path, parent: Q });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
m0.create = ($, Q) => {
  return new m0({ innerType: $, typeName: D.ZodDefault, defaultValue: typeof Q.default === "function" ? Q.default : () => Q.default, ...K(Q) });
};
var Y1 = class extends N {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = { ...Q, common: { ...Q.common, issues: [] } }, X = this._def.innerType._parse({ data: Y.data, path: Y.path, parent: { ...Y } });
    if (A1(X))
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
Y1.create = ($, Q) => {
  return new Y1({ innerType: $, typeName: D.ZodCatch, catchValue: typeof Q.catch === "function" ? Q.catch : () => Q.catch, ...K(Q) });
};
var X1 = class extends N {
  _parse($) {
    if (this._getType($) !== V.nan) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: B.invalid_type, expected: V.nan, received: Y.parsedType }), L;
    }
    return { status: "valid", value: $.data };
  }
};
X1.create = ($) => {
  return new X1({ typeName: D.ZodNaN, ...K($) });
};
var i8 = Symbol("zod_brand");
var O$ = class extends N {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = Q.data;
    return this._def.type._parse({ data: Y, path: Q.path, parent: Q });
  }
  unwrap() {
    return this._def.type;
  }
};
var W1 = class extends N {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.common.async)
      return (async () => {
        const J = await this._def.in._parseAsync({ data: Y.data, path: Y.path, parent: Y });
        if (J.status === "aborted")
          return L;
        if (J.status === "dirty")
          return Q.dirty(), H6(J.value);
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
    return new W1({ in: $, out: Q, typeName: D.ZodPipeline });
  }
};
var J1 = class extends N {
  _parse($) {
    const Q = this._def.innerType._parse($);
    if (a0(Q))
      Q.value = Object.freeze(Q.value);
    return Q;
  }
};
J1.create = ($, Q) => {
  return new J1({ innerType: $, typeName: D.ZodReadonly, ...K(Q) });
};
var z6 = ($, Q = {}, Y) => {
  if ($)
    return O0.create().superRefine((X, J) => {
      var W, q;
      if (!$(X)) {
        const G = typeof Q === "function" ? Q(X) : typeof Q === "string" ? { message: Q } : Q, H = (q = (W = G.fatal) !== null && W !== void 0 ? W : Y) !== null && q !== void 0 ? q : true, z = typeof G === "string" ? { message: G } : G;
        J.addIssue({ code: "custom", ...z, fatal: H });
      }
    });
  return O0.create();
};
var d8 = { object: I.lazycreate };
var D;
(function($) {
  $.ZodString = "ZodString", $.ZodNumber = "ZodNumber", $.ZodNaN = "ZodNaN", $.ZodBigInt = "ZodBigInt", $.ZodBoolean = "ZodBoolean", $.ZodDate = "ZodDate", $.ZodSymbol = "ZodSymbol", $.ZodUndefined = "ZodUndefined", $.ZodNull = "ZodNull", $.ZodAny = "ZodAny", $.ZodUnknown = "ZodUnknown", $.ZodNever = "ZodNever", $.ZodVoid = "ZodVoid", $.ZodArray = "ZodArray", $.ZodObject = "ZodObject", $.ZodUnion = "ZodUnion", $.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", $.ZodIntersection = "ZodIntersection", $.ZodTuple = "ZodTuple", $.ZodRecord = "ZodRecord", $.ZodMap = "ZodMap", $.ZodSet = "ZodSet", $.ZodFunction = "ZodFunction", $.ZodLazy = "ZodLazy", $.ZodLiteral = "ZodLiteral", $.ZodEnum = "ZodEnum", $.ZodEffects = "ZodEffects", $.ZodNativeEnum = "ZodNativeEnum", $.ZodOptional = "ZodOptional", $.ZodNullable = "ZodNullable", $.ZodDefault = "ZodDefault", $.ZodCatch = "ZodCatch", $.ZodPromise = "ZodPromise", $.ZodBranded = "ZodBranded", $.ZodPipeline = "ZodPipeline", $.ZodReadonly = "ZodReadonly";
})(D || (D = {}));
var o8 = ($, Q = { message: `Input not instance of ${$.name}` }) => z6((Y) => Y instanceof $, Q);
var B6 = l.create;
var V6 = G0.create;
var r8 = X1.create;
var s8 = z0.create;
var M6 = j0.create;
var a8 = w0.create;
var t8 = t0.create;
var e8 = k0.create;
var $4 = T0.create;
var Q4 = O0.create;
var Y4 = H0.create;
var X4 = r.create;
var J4 = e0.create;
var W4 = c.create;
var q4 = I.create;
var H4 = I.strictCreate;
var G4 = x0.create;
var z4 = f1.create;
var B4 = g0.create;
var V4 = s.create;
var M4 = $1.create;
var U4 = Q1.create;
var w4 = D0.create;
var O4 = v0.create;
var D4 = Z0.create;
var F4 = h0.create;
var L4 = B0.create;
var K4 = y0.create;
var N4 = F0.create;
var W6 = y.create;
var R4 = o.create;
var E4 = V0.create;
var S4 = y.createWithPreprocess;
var A4 = W1.create;
var f4 = () => B6().optional();
var C4 = () => V6().optional();
var I4 = () => M6().optional();
var P4 = { string: ($) => l.create({ ...$, coerce: true }), number: ($) => G0.create({ ...$, coerce: true }), boolean: ($) => j0.create({ ...$, coerce: true }), bigint: ($) => z0.create({ ...$, coerce: true }), date: ($) => w0.create({ ...$, coerce: true }) };
var _4 = L;
var F = Object.freeze({ __proto__: null, defaultErrorMap: s0, setErrorMap: k8, getErrorMap: E1, makeIssue: S1, EMPTY_PATH: T8, addIssueToContext: M, ParseStatus: j, INVALID: L, DIRTY: H6, OK: T, isAborted: M$, isDirty: U$, isValid: a0, isAsync: A1, get util() {
  return S;
}, get objectUtil() {
  return V$;
}, ZodParsedType: V, getParsedType: q0, ZodType: N, ZodString: l, ZodNumber: G0, ZodBigInt: z0, ZodBoolean: j0, ZodDate: w0, ZodSymbol: t0, ZodUndefined: k0, ZodNull: T0, ZodAny: O0, ZodUnknown: H0, ZodNever: r, ZodVoid: e0, ZodArray: c, ZodObject: I, ZodUnion: x0, ZodDiscriminatedUnion: f1, ZodIntersection: g0, ZodTuple: s, ZodRecord: $1, ZodMap: Q1, ZodSet: D0, ZodFunction: v0, ZodLazy: Z0, ZodLiteral: h0, ZodEnum: B0, ZodNativeEnum: y0, ZodPromise: F0, ZodEffects: y, ZodTransformer: y, ZodOptional: o, ZodNullable: V0, ZodDefault: m0, ZodCatch: Y1, ZodNaN: X1, BRAND: i8, ZodBranded: O$, ZodPipeline: W1, ZodReadonly: J1, custom: z6, Schema: N, ZodSchema: N, late: d8, get ZodFirstPartyTypeKind() {
  return D;
}, coerce: P4, any: Q4, array: W4, bigint: s8, boolean: M6, date: a8, discriminatedUnion: z4, effect: W6, enum: L4, function: O4, instanceof: o8, intersection: B4, lazy: D4, literal: F4, map: U4, nan: r8, nativeEnum: K4, never: X4, null: $4, nullable: E4, number: V6, object: q4, oboolean: I4, onumber: C4, optional: R4, ostring: f4, pipeline: A4, preprocess: S4, promise: N4, record: M4, set: w4, strictObject: H4, string: B6, symbol: t8, transformer: W6, tuple: V4, undefined: e8, union: G4, unknown: Y4, void: J4, NEVER: _4, ZodIssueCode: B, quotelessJson: j8, ZodError: h });
var U6 = F.object({ email: F.string().email(), img: F.string(), lid: F.string(), name: F.string(), uid: F.number().int(), introduction: F.string().optional(), pid: F.string(), delImg: F.string().optional() });
var D$ = F.object({ email: F.string().email(), img: F.string(), lid: F.string(), name: F.string(), uid: F.number().int(), introduction: F.string().optional() });
var w6 = F.object({ type: F.enum(["uid"]), uid: F.number().int() }).or(F.object({ type: F.enum(["email"]), email: F.string().email() })).or(F.object({ type: F.enum(["pid"]), pid: F.string() }));
var _5 = F.object({ type: F.enum(["uid"]), uid: F.number().int() }).or(F.object({ type: F.enum(["email"]), email: F.string().email() })).or(F.object({ type: F.enum(["pid"]), pid: F.string() }));
var O6 = F.object({ type: F.enum(["uid"]), uid: F.number().int() }).or(F.object({ type: F.enum(["email"]), email: F.string().email() }));
var v4 = typeof global == "object" && global && global.Object === Object && global;
var C1 = v4;
var j4 = typeof self == "object" && self && self.Object === Object && self;
var k4 = C1 || j4 || Function("return this")();
var k = k4;
var T4 = k.Symbol;
var l0 = T4;
var Z4 = function($) {
  var Q = x4.call($, q1), Y = $[q1];
  try {
    $[q1] = void 0;
    var X = true;
  } catch (W) {
  }
  var J = g4.call($);
  if (X)
    if (Q)
      $[q1] = Y;
    else
      delete $[q1];
  return J;
};
var D6 = Object.prototype;
var x4 = D6.hasOwnProperty;
var g4 = D6.toString;
var q1 = l0 ? l0.toStringTag : void 0;
var F6 = Z4;
var m4 = function($) {
  return y4.call($);
};
var h4 = Object.prototype;
var y4 = h4.toString;
var L6 = m4;
var u4 = function($) {
  if ($ == null)
    return $ === void 0 ? c4 : l4;
  return K6 && K6 in Object($) ? F6($) : L6($);
};
var l4 = "[object Null]";
var c4 = "[object Undefined]";
var K6 = l0 ? l0.toStringTag : void 0;
var n = u4;
var n4 = function($) {
  return $ != null && typeof $ == "object";
};
var M0 = n4;
var p4 = Array.isArray;
var U0 = p4;
var i4 = function($) {
  var Q = typeof $;
  return $ != null && (Q == "object" || Q == "function");
};
var L0 = i4;
var d4 = function($) {
  return $;
};
var N6 = d4;
var t4 = function($) {
  if (!L0($))
    return false;
  var Q = n($);
  return Q == r4 || Q == s4 || Q == o4 || Q == a4;
};
var o4 = "[object AsyncFunction]";
var r4 = "[object Function]";
var s4 = "[object GeneratorFunction]";
var a4 = "[object Proxy]";
var I1 = t4;
var e4 = k["__core-js_shared__"];
var P1 = e4;
var $2 = function($) {
  return !!R6 && R6 in $;
};
var R6 = function() {
  var $ = /[^.]+$/.exec(P1 && P1.keys && P1.keys.IE_PROTO || "");
  return $ ? "Symbol(src)_1." + $ : "";
}();
var E6 = $2;
var X2 = function($) {
  if ($ != null) {
    try {
      return Y2.call($);
    } catch (Q) {
    }
    try {
      return $ + "";
    } catch (Q) {
    }
  }
  return "";
};
var Q2 = Function.prototype;
var Y2 = Q2.toString;
var Q0 = X2;
var V2 = function($) {
  if (!L0($) || E6($))
    return false;
  var Q = I1($) ? B2 : W2;
  return Q.test(Q0($));
};
var J2 = /[\\^$.*+?()[\]{}|]/g;
var W2 = /^\[object .+?Constructor\]$/;
var q2 = Function.prototype;
var H2 = Object.prototype;
var G2 = q2.toString;
var z2 = H2.hasOwnProperty;
var B2 = RegExp("^" + G2.call(z2).replace(J2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var S6 = V2;
var M2 = function($, Q) {
  return $ == null ? void 0 : $[Q];
};
var A6 = M2;
var U2 = function($, Q) {
  var Y = A6($, Q);
  return S6(Y) ? Y : void 0;
};
var a = U2;
var w2 = a(k, "WeakMap");
var _1 = w2;
var O2 = function($, Q) {
  var Y = -1, X = $ == null ? 0 : $.length;
  while (++Y < X)
    if (Q($[Y], Y, $) === false)
      break;
  return $;
};
var f6 = O2;
var L2 = function($, Q) {
  var Y = typeof $;
  return Q = Q == null ? D2 : Q, !!Q && (Y == "number" || Y != "symbol" && F2.test($)) && ($ > -1 && $ % 1 == 0 && $ < Q);
};
var D2 = 9007199254740991;
var F2 = /^(?:0|[1-9]\d*)$/;
var C6 = L2;
var N2 = function($) {
  return typeof $ == "number" && $ > -1 && $ % 1 == 0 && $ <= K2;
};
var K2 = 9007199254740991;
var b1 = N2;
var R2 = function($) {
  return $ != null && b1($.length) && !I1($);
};
var c0 = R2;
var S2 = function($) {
  var Q = $ && $.constructor, Y = typeof Q == "function" && Q.prototype || E2;
  return $ === Y;
};
var E2 = Object.prototype;
var v1 = S2;
var A2 = function($, Q) {
  var Y = -1, X = Array($);
  while (++Y < $)
    X[Y] = Q(Y);
  return X;
};
var I6 = A2;
var C2 = function($) {
  return M0($) && n($) == f2;
};
var f2 = "[object Arguments]";
var F$ = C2;
var P6 = Object.prototype;
var I2 = P6.hasOwnProperty;
var P2 = P6.propertyIsEnumerable;
var _2 = F$(function() {
  return arguments;
}()) ? F$ : function($) {
  return M0($) && I2.call($, "callee") && !P2.call($, "callee");
};
var j1 = _2;
var T1 = {};
i1(T1, { default: () => {
  {
    return H1;
  }
} });
var b2 = function() {
  return false;
};
var _6 = b2;
var j6 = typeof T1 == "object" && T1 && !T1.nodeType && T1;
var b6 = j6 && typeof k1 == "object" && k1 && !k1.nodeType && k1;
var v2 = b6 && b6.exports === j6;
var v6 = v2 ? k.Buffer : void 0;
var j2 = v6 ? v6.isBuffer : void 0;
var k2 = j2 || _6;
var H1 = k2;
var J9 = function($) {
  return M0($) && b1($.length) && !!f[n($)];
};
var T2 = "[object Arguments]";
var x2 = "[object Array]";
var g2 = "[object Boolean]";
var Z2 = "[object Date]";
var h2 = "[object Error]";
var y2 = "[object Function]";
var m2 = "[object Map]";
var l2 = "[object Number]";
var c2 = "[object Object]";
var u2 = "[object RegExp]";
var n2 = "[object Set]";
var p2 = "[object String]";
var i2 = "[object WeakMap]";
var d2 = "[object ArrayBuffer]";
var o2 = "[object DataView]";
var r2 = "[object Float32Array]";
var s2 = "[object Float64Array]";
var a2 = "[object Int8Array]";
var t2 = "[object Int16Array]";
var e2 = "[object Int32Array]";
var $9 = "[object Uint8Array]";
var Q9 = "[object Uint8ClampedArray]";
var Y9 = "[object Uint16Array]";
var X9 = "[object Uint32Array]";
var f = {};
f[r2] = f[s2] = f[a2] = f[t2] = f[e2] = f[$9] = f[Q9] = f[Y9] = f[X9] = true;
f[T2] = f[x2] = f[d2] = f[g2] = f[o2] = f[Z2] = f[h2] = f[y2] = f[m2] = f[l2] = f[c2] = f[u2] = f[n2] = f[p2] = f[i2] = false;
var k6 = J9;
var W9 = function($) {
  return function(Q) {
    return $(Q);
  };
};
var T6 = W9;
var g1 = {};
i1(g1, { default: () => {
  {
    return Z1;
  }
} });
var x6 = typeof g1 == "object" && g1 && !g1.nodeType && g1;
var G1 = x6 && typeof x1 == "object" && x1 && !x1.nodeType && x1;
var q9 = G1 && G1.exports === x6;
var L$ = q9 && C1.process;
var H9 = function() {
  try {
    var $ = G1 && G1.require && G1.require("util").types;
    if ($)
      return $;
    return L$ && L$.binding && L$.binding("util");
  } catch (Q) {
  }
}();
var Z1 = H9;
var g6 = Z1 && Z1.isTypedArray;
var G9 = g6 ? T6(g6) : k6;
var h1 = G9;
var V9 = function($, Q) {
  var Y = U0($), X = !Y && j1($), J = !Y && !X && H1($), W = !Y && !X && !J && h1($), q = Y || X || J || W, G = q ? I6($.length, String) : [], H = G.length;
  for (var z in $)
    if ((Q || B9.call($, z)) && !(q && (z == "length" || J && (z == "offset" || z == "parent") || W && (z == "buffer" || z == "byteLength" || z == "byteOffset") || C6(z, H))))
      G.push(z);
  return G;
};
var z9 = Object.prototype;
var B9 = z9.hasOwnProperty;
var Z6 = V9;
var M9 = function($, Q) {
  return function(Y) {
    return $(Q(Y));
  };
};
var h6 = M9;
var U9 = h6(Object.keys, Object);
var y6 = U9;
var D9 = function($) {
  if (!v1($))
    return y6($);
  var Q = [];
  for (var Y in Object($))
    if (O9.call($, Y) && Y != "constructor")
      Q.push(Y);
  return Q;
};
var w9 = Object.prototype;
var O9 = w9.hasOwnProperty;
var y1 = D9;
var F9 = function($) {
  return c0($) ? Z6($) : y1($);
};
var m6 = F9;
var L9 = a(k, "Map");
var m1 = L9;
var K9 = a(k, "DataView");
var l1 = K9;
var N9 = a(k, "Promise");
var c1 = N9;
var R9 = a(k, "Set");
var u1 = R9;
var l6 = "[object Map]";
var E9 = "[object Object]";
var c6 = "[object Promise]";
var u6 = "[object Set]";
var n6 = "[object WeakMap]";
var p6 = "[object DataView]";
var S9 = Q0(l1);
var A9 = Q0(m1);
var f9 = Q0(c1);
var C9 = Q0(u1);
var I9 = Q0(_1);
var K0 = n;
if (l1 && K0(new l1(new ArrayBuffer(1))) != p6 || m1 && K0(new m1()) != l6 || c1 && K0(c1.resolve()) != c6 || u1 && K0(new u1()) != u6 || _1 && K0(new _1()) != n6)
  K0 = function($) {
    var Q = n($), Y = Q == E9 ? $.constructor : void 0, X = Y ? Q0(Y) : "";
    if (X)
      switch (X) {
        case S9:
          return p6;
        case A9:
          return l6;
        case f9:
          return c6;
        case C9:
          return u6;
        case I9:
          return n6;
      }
    return Q;
  };
var i6 = K0;
var P9 = function($) {
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
var d6 = P9;
var _9 = d6();
var o6 = _9;
var b9 = function($, Q) {
  return $ && o6($, Q, m6);
};
var r6 = b9;
var v9 = function($, Q) {
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
var s6 = v9;
var j9 = s6(r6);
var a6 = j9;
var k9 = function($) {
  return typeof $ == "function" ? $ : N6;
};
var t6 = k9;
var T9 = function($, Q) {
  var Y = U0($) ? f6 : a6;
  return Y($, t6(Q));
};
var z1 = T9;
var g9 = function($) {
  return typeof $ == "string" || !U0($) && M0($) && n($) == x9;
};
var x9 = "[object String]";
var n1 = g9;
var l9 = function($) {
  if ($ == null)
    return true;
  if (c0($) && (U0($) || typeof $ == "string" || typeof $.splice == "function" || H1($) || h1($) || j1($)))
    return !$.length;
  var Q = i6($);
  if (Q == Z9 || Q == h9)
    return !$.size;
  if (v1($))
    return !y1($).length;
  for (var Y in $)
    if (m9.call($, Y))
      return false;
  return true;
};
var Z9 = "[object Map]";
var h9 = "[object Set]";
var y9 = Object.prototype;
var m9 = y9.hasOwnProperty;
var K$ = l9;
var t = { header: {} };
async function N0($) {
  const Q = await p({ tag: $.toString(), action: "get" });
  if (Q[$] == "null" && Q[$] == null)
    return null;
  if (L0(Q[$]))
    return Q[$];
  return JSON.parse(Q[$]);
}
var p = async ($) => {
  $ = { ...$, user: "p2psaing", secret: "59c44c2f" };
  const Q = new FormData();
  for (let X in $)
    Q.set(X, n1($[X]) ? $[X] : JSON.stringify($[X]));
  const Y = new Headers();
  z1(t.header, (X, J) => Y.set(J, X));
  try {
    return await (await fetch("https://tinywebdb.appinventor.space/api", { method: "POST", headers: Y, body: Q, redirect: "follow" })).json();
  } catch (X) {
    console.log("err:", X);
  }
};
var e6 = async () => (await p({ action: "count" })).count;
var c9 = async ($) => await p({ action: "delete", tag: $ });
var N$ = async ($) => await N0(`${$}.value`);
var R$ = async ($) => await N0(`${$}.value`);
var $8 = async ($) => await N0(`${$}.time`);
var Q8 = async ($) => await N0(`${$}.time`);
var Y8 = async ($, Q) => await c9(`${$}.store.${Q}`);
var X8 = async ($, Q) => await N0(`${$}.store.${Q}`);
var J8 = async ($, Q, Y) => {
  if (n1($))
    var X = await R$($);
  else
    var X = await N$($);
  await p({ action: "update", tag: `${X.email}.store.${Q}`, value: Y }), await p({ action: "update", tag: `${X.uid}.store.${Q}`, value: Y });
};
async function W8($) {
  const Q = t.header = $.req.header(), Y = w6.safeParse(await $.req.json()), X = F.string().safeParse(Q.authorization);
  if (Y.success)
    try {
      switch (Y.data.type) {
        case "uid":
          return $.json({ code: E.Code.success, data: await N$(Y.data.uid) }, 200);
        case "email":
          return $.json({ code: E.Code.success, data: await R$(Y.data.email) }, 200);
        case "pid": {
          if (X.success && await z$(X.data, Y0.secret, "HS512"))
            return $.json({ code: E.Code.success, data: await N0(Y.data.pid) }, 200);
          return $.json({ code: E.Code.fail, data: { code: E.FailCode.unauthorization, message: "\u8BA4\u8BC1\u9519\u8BEF" } }, 401);
        }
      }
    } catch (J) {
      return $.json({ code: E.Code.success, data: J }, 500);
    }
  return $.json({ code: E.Code.fail, data: { code: E.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
}
var Y0;
(function(u0) {
  u0.payload = { sub: "p2psaing", role: "wenxig", alg: "HS512" }, u0.secret = "vhbuioy78a32et6r7drtxfcyutfdresxyrtuyfdresxdfcgtyfui7uihfip239u0hjfaf2hf89h29fniune2iuf", u0.value = "";
})(Y0 || (Y0 = {}));
Y0.value = await X6(Y0.payload, Y0.secret, Y0.payload.alg);
var e = new q$();
e.get("/jwt", ($) => $.json({ code: E.Code.success, data: Y0.value }, 200));
e.post("/user", W8).put(async ($) => {
  const Q = t.header = $.req.header(), Y = F.string().safeParse(Q.authorization);
  if (!(Y.success && await z$(Y.data, Y0.secret, "HS512")))
    return $.json({ code: E.Code.fail, data: { code: E.FailCode.unauthorization, message: "\u8BA4\u8BC1\u9519\u8BEF" } }, 401);
  const X = await $.req.json();
  if (!U6.safeParse(X).success)
    return $.json({ code: E.Code.fail, data: { code: E.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
  try {
    await p({ tag: X.pid, value: X, action: "update" }), await p({ tag: `${X.uid}.value`, value: D$.parse(X), action: "update" }), await p({ tag: `${X.email}.value`, value: D$.parse(X), action: "update" });
    const J = (/* @__PURE__ */ new Date()).getTime();
    return await p({ tag: `${X.uid}.time`, value: J, action: "update" }), await p({ tag: `${X.email}.time`, value: J, action: "update" }), $.json({ code: E.Code.success, data: J }, 200);
  } catch (J) {
    return console.error(J), $.json({ code: E.Code.success, data: J }, 500);
  }
});
e.post("/user/has", async ($) => {
  const Q = await W8($), Y = await Q.json();
  if (Y.code == E.Code.success)
    return $.json({ code: E.Code.success, data: !K$(Y.data) }, 200);
  return $.json(Y, Q.status);
});
e.post("/time", async ($) => {
  t.header = $.req.header();
  const Q = O6.safeParse(await $.req.json());
  if (Q.success)
    try {
      switch (Q.data.type) {
        case "uid":
          return $.json({ code: E.Code.success, data: await $8(Q.data.uid) }, 200);
        case "email":
          return $.json({ code: E.Code.success, data: await Q8(Q.data.email) }, 200);
      }
    } catch (Y) {
      return $.json({ code: E.Code.success, data: Y }, 500);
    }
  return $.json({ code: E.Code.fail, data: { code: E.FailCode.format, message: "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF" } }, 406);
});
e.get("/count", async ($) => {
  return t.header = $.req.header(), $.json({ code: E.Code.success, data: await e6() }, 200);
});
e.all("/file/*", async ($) => {
  const Q = t.header = $.req.header(), Y = F.string().safeParse(Q.authorization).success ? Q.authorization : "", X = new Headers();
  z1(Q, (J, W) => X.set(W, J));
  try {
    switch (Y) {
      case "github":
        return X.set("Authorization", "token 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"), $.json({ code: E.Code.success, data: await fetch($.req.path.replace(/^\/file/g, "https://api.github.com"), { headers: X, body: await $.req.text(), method: $.req.method }) }, 401);
      case "smms":
        return X.set("Authorization", "bipd73BhOqJYyPnMr8e5kA64jtWREomu"), $.json({ code: E.Code.success, data: await fetch($.req.path.replace(/^\/file/g, "https://sm.ms"), { headers: X, body: await $.req.formData(), method: $.req.method }) }, 401);
      default:
        return $.json({ code: E.Code.fail, data: { code: E.FailCode.format, message: "\u4E0D\u5141\u8BB8\u7684\u53C2\u6570" } }, 405);
    }
  } catch (J) {
    return $.json({ code: E.Code.success, data: J }, 500);
  }
});
e.put("/user/:uid/store/*", async ($) => {
  t.header = $.req.header();
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await J8($.req.param().uid, Q, await $.req.text()), $.json({ code: E.Code.success, data: await $.req.json() });
  } catch (Y) {
    return $.json({ code: E.Code.success, data: Y }, 500);
  }
}).delete(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await Y8($.req.param().uid, Q), $.json({ code: E.Code.success, data: await $.req.json() });
  } catch (Y) {
    return $.json({ code: E.Code.success, data: Y }, 500);
  }
}).get(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  t.header = $.req.header();
  try {
    return $.json({ code: E.Code.success, data: await X8($.req.param().uid, Q) });
  } catch (Y) {
    return $.json({ code: E.Code.success, data: Y }, 500);
  }
});
e.get("/echo/*", ($) => $.text($.req.url));
e.all("*", ($) => {
  return $.json({ code: E.Code.fail, data: { code: E.FailCode.falseMethod, message: "\u672A\u77E5\u7684\u8DEF\u5F84" } }, 405);
});
var D7 = e;

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

// .wrangler/tmp/bundle-MgQK12/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...D7,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...D7.middleware ? D7.middleware : []
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

// .wrangler/tmp/bundle-MgQK12/middleware-loader.entry.ts
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
