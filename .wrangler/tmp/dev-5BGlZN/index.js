// .wrangler/tmp/bundle-BHmLy9/checked-fetch.js
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
var J2 = Object.defineProperty;
var T$ = ($, Q) => {
  for (var Y in Q)
    J2($, Y, { get: Q[Y], enumerable: true, configurable: true, set: (X) => Q[Y] = () => X });
};
var G6 = { Stringify: 1, BeforeStream: 2, Stream: 3 };
var W2 = ($, Q) => {
  const Y = new String($);
  return Y.isEscaped = true, Y.callbacks = Q, Y;
};
var x$ = async ($, Q, Y, X, J) => {
  const W = $.callbacks;
  if (!W?.length)
    return Promise.resolve($);
  if (J)
    J[0] += $;
  else
    J = [$];
  const H = Promise.all(W.map((q) => q({ phase: Q, buffer: J, context: X }))).then((q) => Promise.all(q.filter(Boolean).map((B) => x$(B, Q, false, X, J))).then(() => J[0]));
  if (Y)
    return W2(await H, W);
  else
    return H;
};
var w6 = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var F = ($, Q, Y) => {
  return w6($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var u0 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var h = ($, Q, Y, X) => {
  return w6($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var H2 = "text/plain; charset=UTF-8";
var v$ = ($, Q = {}) => {
  return Object.entries(Q).forEach(([Y, X]) => $.set(Y, X)), $;
};
var c0;
var L0;
var g;
var _;
var e;
var D0;
var p0 = class {
  constructor($, Q) {
    if (this.env = {}, this._var = {}, this.finalized = false, this.error = void 0, u0(this, c0, 200), u0(this, L0, void 0), u0(this, g, void 0), u0(this, _, void 0), u0(this, e, void 0), u0(this, D0, true), this.layout = void 0, this.renderer = (Y) => this.html(Y), this.notFoundHandler = () => new Response(), this.render = (...Y) => this.renderer(...Y), this.setLayout = (Y) => this.layout = Y, this.getLayout = () => this.layout, this.setRenderer = (Y) => {
      this.renderer = Y;
    }, this.header = (Y, X, J) => {
      if (X === void 0) {
        if (F(this, g))
          F(this, g).delete(Y);
        else if (F(this, _))
          delete F(this, _)[Y.toLocaleLowerCase()];
        if (this.finalized)
          this.res.headers.delete(Y);
        return;
      }
      if (J?.append) {
        if (!F(this, g))
          h(this, D0, false), h(this, g, new Headers(F(this, _))), h(this, _, {});
        F(this, g).append(Y, X);
      } else if (F(this, g))
        F(this, g).set(Y, X);
      else
        F(this, _) ?? h(this, _, {}), F(this, _)[Y.toLowerCase()] = X;
      if (this.finalized)
        if (J?.append)
          this.res.headers.append(Y, X);
        else
          this.res.headers.set(Y, X);
    }, this.status = (Y) => {
      h(this, D0, false), h(this, c0, Y);
    }, this.set = (Y, X) => {
      this._var ?? (this._var = {}), this._var[Y] = X;
    }, this.get = (Y) => {
      return this._var ? this._var[Y] : void 0;
    }, this.newResponse = (Y, X, J) => {
      if (F(this, D0) && !J && !X && F(this, c0) === 200)
        return new Response(Y, { headers: F(this, _) });
      if (X && typeof X !== "number") {
        const H = v$(new Headers(X.headers), F(this, _));
        return new Response(Y, { headers: H, status: X.status ?? F(this, c0) });
      }
      const W = typeof X === "number" ? X : F(this, c0);
      if (F(this, _) ?? h(this, _, {}), F(this, g) ?? h(this, g, new Headers()), v$(F(this, g), F(this, _)), F(this, e))
        F(this, e).headers.forEach((H, q) => {
          F(this, g)?.set(q, H);
        }), v$(F(this, g), F(this, _));
      J ?? (J = {});
      for (let [H, q] of Object.entries(J))
        if (typeof q === "string")
          F(this, g).set(H, q);
        else {
          F(this, g).delete(H);
          for (let B of q)
            F(this, g).append(H, B);
        }
      return new Response(Y, { status: W, headers: F(this, g) });
    }, this.body = (Y, X, J) => {
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.text = (Y, X, J) => {
      if (!F(this, _)) {
        if (F(this, D0) && !J && !X)
          return new Response(Y);
        h(this, _, {});
      }
      return F(this, _)["content-type"] = H2, typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.json = (Y, X, J) => {
      const W = JSON.stringify(Y);
      return F(this, _) ?? h(this, _, {}), F(this, _)["content-type"] = "application/json; charset=UTF-8", typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
    }, this.html = (Y, X, J) => {
      if (F(this, _) ?? h(this, _, {}), F(this, _)["content-type"] = "text/html; charset=UTF-8", typeof Y === "object") {
        if (!(Y instanceof Promise))
          Y = Y.toString();
        if (Y instanceof Promise)
          return Y.then((W) => x$(W, G6.Stringify, false, {})).then((W) => {
            return typeof X === "number" ? this.newResponse(W, X, J) : this.newResponse(W, X);
          });
      }
      return typeof X === "number" ? this.newResponse(Y, X, J) : this.newResponse(Y, X);
    }, this.redirect = (Y, X = 302) => {
      return F(this, g) ?? h(this, g, new Headers()), F(this, g).set("Location", Y), this.newResponse(null, X);
    }, this.notFound = () => {
      return this.notFoundHandler(this);
    }, this.req = $, Q) {
      if (h(this, L0, Q.executionCtx), this.env = Q.env, Q.notFoundHandler)
        this.notFoundHandler = Q.notFoundHandler;
    }
  }
  get event() {
    if (F(this, L0) && "respondWith" in F(this, L0))
      return F(this, L0);
    else
      throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (F(this, L0))
      return F(this, L0);
    else
      throw Error("This context has no ExecutionContext");
  }
  get res() {
    return h(this, D0, false), F(this, e) || h(this, e, new Response("404 Not Found", { status: 404 }));
  }
  set res($) {
    if (h(this, D0, false), F(this, e) && $) {
      F(this, e).headers.delete("content-type");
      for (let [Q, Y] of F(this, e).headers.entries())
        if (Q === "set-cookie") {
          const X = F(this, e).headers.getSetCookie();
          $.headers.delete("set-cookie");
          for (let J of X)
            $.headers.append("set-cookie", J);
        } else
          $.headers.set(Q, Y);
    }
    h(this, e, $), this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
};
c0 = /* @__PURE__ */ new WeakMap();
L0 = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
e = /* @__PURE__ */ new WeakMap();
D0 = /* @__PURE__ */ new WeakMap();
var Z$ = ($, Q, Y) => {
  return (X, J) => {
    let W = -1;
    return H(0);
    async function H(q) {
      if (q <= W)
        throw new Error("next() called multiple times");
      W = q;
      let B, G = false, U;
      if ($[q]) {
        if (U = $[q][0][0], X instanceof p0)
          X.req.routeIndex = q;
      } else
        U = q === $.length && J || void 0;
      if (!U) {
        if (X instanceof p0 && X.finalized === false && Y)
          B = await Y(X);
      } else
        try {
          B = await U(X, () => {
            return H(q + 1);
          });
        } catch (O) {
          if (O instanceof Error && X instanceof p0 && Q)
            X.error = O, B = await Q(O, X), G = true;
          else
            throw O;
        }
      if (B && (X.finalized === false || G))
        X.res = B;
      return X;
    }
  };
};
var k$ = class extends Error {
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
var q2 = function($) {
  if ($ === null)
    return false;
  return $.startsWith("multipart/form-data") || $.startsWith("application/x-www-form-urlencoded");
};
async function B2($, Q) {
  const Y = await $.formData();
  if (Y)
    return G2(Y, Q);
  return {};
}
var G2 = function($, Q) {
  const Y = {};
  return $.forEach((X, J) => {
    if (!(Q.all || J.endsWith("[]")))
      Y[J] = X;
    else
      w2(Y, J, X);
  }), Y;
};
var U2 = function($) {
  return Array.isArray($);
};
var U6 = async ($, Q = { all: false }) => {
  const X = ($ instanceof c1 ? $.raw.headers : $.headers).get("Content-Type");
  if (q2(X))
    return B2($, Q);
  return {};
};
var w2 = ($, Q, Y) => {
  if ($[Q] && U2($[Q]))
    z2($[Q], Y);
  else if ($[Q])
    M2($, Q, Y);
  else
    $[Q] = Y;
};
var z2 = ($, Q) => {
  $.push(Q);
};
var M2 = ($, Q, Y) => {
  $[Q] = [$[Q], Y];
};
var b$ = ($) => {
  const Q = $.split("/");
  if (Q[0] === "")
    Q.shift();
  return Q;
};
var z6 = ($) => {
  const { groups: Q, path: Y } = V2($), X = b$(Y);
  return O2(X, Q);
};
var V2 = ($) => {
  const Q = [];
  return $ = $.replace(/\{[^}]+\}/g, (Y, X) => {
    const J = `@${X}`;
    return Q.push([J, Y]), J;
  }), { groups: Q, path: $ };
};
var O2 = ($, Q) => {
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
var p1 = {};
var j$ = ($) => {
  if ($ === "*")
    return "*";
  const Q = $.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (Q) {
    if (!p1[$])
      if (Q[2])
        p1[$] = [$, Q[1], new RegExp("^" + Q[2] + "$")];
      else
        p1[$] = [$, Q[1], true];
    return p1[$];
  }
  return null;
};
var h$ = ($) => {
  const Q = $.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return Q ? Q[1] : "";
};
var M6 = ($) => {
  const Q = $.indexOf("?", 8);
  return Q === -1 ? "" : "?" + $.slice(Q + 1);
};
var V6 = ($) => {
  const Q = h$($);
  return Q.length > 1 && Q[Q.length - 1] === "/" ? Q.slice(0, -1) : Q;
};
var n0 = (...$) => {
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
var n1 = ($) => {
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
  }), Y.filter((J, W, H) => H.indexOf(J) === W);
};
var g$ = ($) => {
  if (!/[%+]/.test($))
    return $;
  if ($.indexOf("+") !== -1)
    $ = $.replace(/\+/g, " ");
  return /%/.test($) ? A1($) : $;
};
var O6 = ($, Q, Y) => {
  let X;
  if (!Y && Q && !/[%+]/.test(Q)) {
    let H = $.indexOf(`?${Q}`, 8);
    if (H === -1)
      H = $.indexOf(`&${Q}`, 8);
    while (H !== -1) {
      const q = $.charCodeAt(H + Q.length + 1);
      if (q === 61) {
        const B = H + Q.length + 2, G = $.indexOf("&", B);
        return g$($.slice(B, G === -1 ? void 0 : G));
      } else if (q == 38 || isNaN(q))
        return "";
      H = $.indexOf(`&${Q}`, H + 1);
    }
    if (X = /[%+]/.test($), !X)
      return;
  }
  const J = {};
  X ?? (X = /[%+]/.test($));
  let W = $.indexOf("?", 8);
  while (W !== -1) {
    const H = $.indexOf("&", W + 1);
    let q = $.indexOf("=", W);
    if (q > H && H !== -1)
      q = -1;
    let B = $.slice(W + 1, q === -1 ? H === -1 ? void 0 : H : q);
    if (X)
      B = g$(B);
    if (W = H, B === "")
      continue;
    let G;
    if (q === -1)
      G = "";
    else if (G = $.slice(q + 1, H === -1 ? void 0 : H), X)
      G = g$(G);
    if (Y) {
      if (!(J[B] && Array.isArray(J[B])))
        J[B] = [];
      J[B].push(G);
    } else
      J[B] ?? (J[B] = G);
  }
  return Q ? J[Q] : J;
};
var K6 = O6;
var F6 = ($, Q) => {
  return O6($, Q, true);
};
var A1 = decodeURIComponent;
var N6 = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var V0 = ($, Q, Y) => {
  return N6($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var L6 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var D6 = ($, Q, Y, X) => {
  return N6($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var S1;
var W0;
var c1 = class {
  constructor($, Q = "/", Y = [[]]) {
    L6(this, S1, void 0), L6(this, W0, void 0), this.routeIndex = 0, this.bodyCache = {}, this.cachedBody = (X) => {
      const { bodyCache: J, raw: W } = this, H = J[X];
      if (H)
        return H;
      if (J.arrayBuffer)
        return (async () => {
          return await new Response(J.arrayBuffer)[X]();
        })();
      return J[X] = W[X]();
    }, this.raw = $, this.path = Q, D6(this, W0, Y), D6(this, S1, {});
  }
  param($) {
    return $ ? this.getDecodedParam($) : this.getAllDecodedParams();
  }
  getDecodedParam($) {
    const Q = V0(this, W0)[0][this.routeIndex][1][$], Y = this.getParamValue(Q);
    return Y ? /\%/.test(Y) ? A1(Y) : Y : void 0;
  }
  getAllDecodedParams() {
    const $ = {}, Q = Object.keys(V0(this, W0)[0][this.routeIndex][1]);
    for (let Y of Q) {
      const X = this.getParamValue(V0(this, W0)[0][this.routeIndex][1][Y]);
      if (X && typeof X === "string")
        $[Y] = /\%/.test(X) ? A1(X) : X;
    }
    return $;
  }
  getParamValue($) {
    return V0(this, W0)[1] ? V0(this, W0)[1][$] : $;
  }
  query($) {
    return K6(this.url, $);
  }
  queries($) {
    return F6(this.url, $);
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
    const Q = await U6(this, $);
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
    V0(this, S1)[$] = Q;
  }
  valid($) {
    return V0(this, S1)[$];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return V0(this, W0)[0].map(([[, $]]) => $);
  }
  get routePath() {
    return V0(this, W0)[0].map(([[, $]]) => $)[this.routeIndex].path;
  }
};
S1 = /* @__PURE__ */ new WeakMap();
W0 = /* @__PURE__ */ new WeakMap();
var Z = "ALL";
var R6 = "all";
var f6 = ["get", "post", "put", "delete", "options", "patch"];
var i1 = "Can not add a route since the matcher is already built.";
var d1 = class extends Error {
};
var L2 = function() {
  return class {
  };
};
var A6 = ($, Q, Y) => {
  if (!Q.has($))
    throw TypeError("Cannot " + Y);
};
var o1 = ($, Q, Y) => {
  return A6($, Q, "read from private field"), Y ? Y.call($) : Q.get($);
};
var K2 = ($, Q, Y) => {
  if (Q.has($))
    throw TypeError("Cannot add the same private member more than once");
  Q instanceof WeakSet ? Q.add($) : Q.set($, Y);
};
var r1 = ($, Q, Y, X) => {
  return A6($, Q, "write to private field"), X ? X.call($, Y) : Q.set($, Y), Y;
};
var F2 = Symbol("composedHandler");
var D2 = ($) => {
  return $.text("404 Not Found", 404);
};
var E6 = ($, Q) => {
  if ($ instanceof k$)
    return $.getResponse();
  return console.error($), Q.text("Internal Server Error", 500);
};
var H0;
var S6 = class extends L2() {
  constructor($ = {}) {
    super();
    this._basePath = "/", K2(this, H0, "/"), this.routes = [], this.notFoundHandler = D2, this.errorHandler = E6, this.onError = (X) => {
      return this.errorHandler = X, this;
    }, this.notFound = (X) => {
      return this.notFoundHandler = X, this;
    }, this.fetch = (X, J, W) => {
      return this.dispatch(X, W, J, X.method);
    }, this.request = (X, J, W, H) => {
      if (X instanceof Request) {
        if (J !== void 0)
          X = new Request(X, J);
        return this.fetch(X, W, H);
      }
      X = X.toString();
      const q = /^https?:\/\//.test(X) ? X : `http://localhost${n0("/", X)}`, B = new Request(q, J);
      return this.fetch(B, W, H);
    }, this.fire = () => {
      addEventListener("fetch", (X) => {
        X.respondWith(this.dispatch(X.request, X, void 0, X.request.method));
      });
    }, [...f6, R6].map((X) => {
      this[X] = (J, ...W) => {
        if (typeof J === "string")
          r1(this, H0, J);
        else
          this.addRoute(X, o1(this, H0), J);
        return W.map((H) => {
          if (typeof H !== "string")
            this.addRoute(X, o1(this, H0), H);
        }), this;
      };
    }), this.on = (X, J, ...W) => {
      if (!X)
        return this;
      for (let H of [J].flat()) {
        r1(this, H0, H);
        for (let q of [X].flat())
          W.map((B) => {
            this.addRoute(q.toUpperCase(), o1(this, H0), B);
          });
      }
      return this;
    }, this.use = (X, ...J) => {
      if (typeof X === "string")
        r1(this, H0, X);
      else
        r1(this, H0, "*"), J.unshift(X);
      return J.map((W) => {
        this.addRoute(Z, o1(this, H0), W);
      }), this;
    };
    const Y = $.strict ?? true;
    delete $.strict, Object.assign(this, $), this.getPath = Y ? $.getPath ?? h$ : V6;
  }
  clone() {
    const $ = new S6({ router: this.router, getPath: this.getPath });
    return $.routes = this.routes, $;
  }
  route($, Q) {
    const Y = this.basePath($);
    if (!Q)
      return Y;
    return Q.routes.map((X) => {
      let J;
      if (Q.errorHandler === E6)
        J = X.handler;
      else
        J = async (W, H) => (await Z$([], Q.errorHandler)(W, () => X.handler(W, H))).res, J[F2] = X.handler;
      Y.addRoute(X.method, X.path, J);
    }), this;
  }
  basePath($) {
    const Q = this.clone();
    return Q._basePath = n0(this._basePath, $), Q;
  }
  mount($, Q, Y) {
    const X = n0(this._basePath, $), J = X === "/" ? 0 : X.length, W = async (H, q) => {
      let B = void 0;
      try {
        B = H.executionCtx;
      } catch {
      }
      const G = Y ? Y(H) : [H.env, B], U = Array.isArray(G) ? G : [G], O = M6(H.req.url), D = await Q(new Request(new URL((H.req.path.slice(J) || "/") + O, H.req.url), H.req.raw), ...U);
      if (D)
        return D;
      await q();
    };
    return this.addRoute(Z, n0($, "*"), W), this;
  }
  addRoute($, Q, Y) {
    $ = $.toUpperCase(), Q = n0(this._basePath, Q);
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
    const J = this.getPath($, { env: Y }), W = this.matchRoute(X, J), H = new p0(new c1($, J, W), { env: Y, executionCtx: Q, notFoundHandler: this.notFoundHandler });
    if (W[0].length === 1) {
      let B;
      try {
        B = W[0][0][0][0](H, async () => {
          H.res = await this.notFoundHandler(H);
        });
      } catch (G) {
        return this.handleError(G, H);
      }
      return B instanceof Promise ? B.then((G) => G || (H.finalized ? H.res : this.notFoundHandler(H))).catch((G) => this.handleError(G, H)) : B;
    }
    const q = Z$(W[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const B = await q(H);
        if (!B.finalized)
          throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");
        return B.res;
      } catch (B) {
        return this.handleError(B, H);
      }
    })();
  }
};
var C6 = S6;
H0 = /* @__PURE__ */ new WeakMap();
var N2 = function($, Q) {
  if ($.length === 1)
    return Q.length === 1 ? $ < Q ? -1 : 1 : -1;
  if (Q.length === 1)
    return 1;
  if ($ === C1 || $ === I1)
    return 1;
  else if (Q === C1 || Q === I1)
    return -1;
  if ($ === s1)
    return 1;
  else if (Q === s1)
    return -1;
  return $.length === Q.length ? $ < Q ? -1 : 1 : Q.length - $.length;
};
var s1 = "[^/]+";
var C1 = ".*";
var I1 = "(?:|/.*)";
var i0 = Symbol();
var a1 = class {
  constructor() {
    this.children = {};
  }
  insert($, Q, Y, X, J) {
    if ($.length === 0) {
      if (this.index !== void 0)
        throw i0;
      if (J)
        return;
      this.index = Q;
      return;
    }
    const [W, ...H] = $, q = W === "*" ? H.length === 0 ? ["", "", C1] : ["", "", s1] : W === "/*" ? ["", "", I1] : W.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let B;
    if (q) {
      const G = q[1];
      let U = q[2] || s1;
      if (G && q[2]) {
        if (U = U.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(U))
          throw i0;
      }
      if (B = this.children[U], !B) {
        if (Object.keys(this.children).some((O) => O !== C1 && O !== I1))
          throw i0;
        if (J)
          return;
        if (B = this.children[U] = new a1(), G !== "")
          B.varIndex = X.varIndex++;
      }
      if (!J && G !== "")
        Y.push([G, B.varIndex]);
    } else if (B = this.children[W], !B) {
      if (Object.keys(this.children).some((G) => G.length > 1 && G !== C1 && G !== I1))
        throw i0;
      if (J)
        return;
      B = this.children[W] = new a1();
    }
    B.insert(H, Q, Y, X, J);
  }
  buildRegExpStr() {
    const Q = Object.keys(this.children).sort(N2).map((Y) => {
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
var I6 = class {
  constructor() {
    this.context = { varIndex: 0 }, this.root = new a1();
  }
  insert($, Q, Y) {
    const X = [], J = [];
    for (let H = 0; ; ) {
      let q = false;
      if ($ = $.replace(/\{[^}]+\}/g, (B) => {
        const G = `@\\${H}`;
        return J[H] = [G, B], H++, q = true, G;
      }), !q)
        break;
    }
    const W = $.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let H = J.length - 1; H >= 0; H--) {
      const [q] = J[H];
      for (let B = W.length - 1; B >= 0; B--)
        if (W[B].indexOf(q) !== -1) {
          W[B] = W[B].replace(q, J[H][1]);
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
    return $ = $.replace(/#(\d+)|@(\d+)|\.\*\$/g, (J, W, H) => {
      if (typeof W !== "undefined")
        return Y[++Q] = Number(W), "$()";
      if (typeof H !== "undefined")
        return X[Number(H)] = ++Q, "";
      return "";
    }), [new RegExp(`^${$}`), Y, X];
  }
};
var _6 = function($) {
  return m$[$] ?? (m$[$] = new RegExp($ === "*" ? "" : `^${$.replace(/\/\*/, "(?:|/.*)")}$`));
};
var f2 = function() {
  m$ = {};
};
var E2 = function($) {
  const Q = new I6(), Y = [];
  if ($.length === 0)
    return R2;
  const X = $.map((G) => [!/\*|\/:/.test(G[0]), ...G]).sort(([G, U], [O, D]) => G ? 1 : O ? -1 : U.length - D.length), J = {};
  for (let G = 0, U = -1, O = X.length; G < O; G++) {
    const [D, T, E] = X[G];
    if (D)
      J[T] = [E.map(([k]) => [k, {}]), P6];
    else
      U++;
    let I;
    try {
      I = Q.insert(T, U, D);
    } catch (k) {
      throw k === i0 ? new d1(T) : k;
    }
    if (D)
      continue;
    Y[U] = E.map(([k, u]) => {
      const c = {};
      u -= 1;
      for (; u >= 0; u--) {
        const [t, M0] = I[u];
        c[t] = M0;
      }
      return [k, c];
    });
  }
  const [W, H, q] = Q.buildRegExp();
  for (let G = 0, U = Y.length; G < U; G++)
    for (let O = 0, D = Y[G].length; O < D; O++) {
      const T = Y[G][O]?.[1];
      if (!T)
        continue;
      const E = Object.keys(T);
      for (let I = 0, k = E.length; I < k; I++)
        T[E[I]] = q[T[E[I]]];
    }
  const B = [];
  for (let G in H)
    B[G] = Y[H[G]];
  return [W, B, J];
};
var d0 = function($, Q) {
  if (!$)
    return;
  for (let Y of Object.keys($).sort((X, J) => J.length - X.length))
    if (_6(Y).test(Q))
      return [...$[Y]];
  return;
};
var P6 = [];
var R2 = [/^$/, [], {}];
var m$ = {};
var y$ = class {
  constructor() {
    this.name = "RegExpRouter", this.middleware = { [Z]: {} }, this.routes = { [Z]: {} };
  }
  add($, Q, Y) {
    var X;
    const { middleware: J, routes: W } = this;
    if (!J || !W)
      throw new Error(i1);
    if (!J[$])
      [J, W].forEach((B) => {
        B[$] = {}, Object.keys(B[Z]).forEach((G) => {
          B[$][G] = [...B[Z][G]];
        });
      });
    if (Q === "/*")
      Q = "*";
    const H = (Q.match(/\/:/g) || []).length;
    if (/\*$/.test(Q)) {
      const B = _6(Q);
      if ($ === Z)
        Object.keys(J).forEach((G) => {
          var U;
          (U = J[G])[Q] || (U[Q] = d0(J[G], Q) || d0(J[Z], Q) || []);
        });
      else
        (X = J[$])[Q] || (X[Q] = d0(J[$], Q) || d0(J[Z], Q) || []);
      Object.keys(J).forEach((G) => {
        if ($ === Z || $ === G)
          Object.keys(J[G]).forEach((U) => {
            B.test(U) && J[G][U].push([Y, H]);
          });
      }), Object.keys(W).forEach((G) => {
        if ($ === Z || $ === G)
          Object.keys(W[G]).forEach((U) => B.test(U) && W[G][U].push([Y, H]));
      });
      return;
    }
    const q = n1(Q) || [Q];
    for (let B = 0, G = q.length; B < G; B++) {
      const U = q[B];
      Object.keys(W).forEach((O) => {
        var D;
        if ($ === Z || $ === O)
          (D = W[O])[U] || (D[U] = [...d0(J[O], U) || d0(J[Z], U) || []]), W[O][U].push([Y, H - G + B + 1]);
      });
    }
  }
  match($, Q) {
    f2();
    const Y = this.buildAllMatchers();
    return this.match = (X, J) => {
      const W = Y[X] || Y[Z], H = W[2][J];
      if (H)
        return H;
      const q = J.match(W[0]);
      if (!q)
        return [[], P6];
      const B = q.indexOf("", 1);
      return [W[1][B], q];
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
    let Y = $ === Z;
    if ([this.middleware, this.routes].forEach((X) => {
      const J = X[$] ? Object.keys(X[$]).map((W) => [W, X[$][W]]) : [];
      if (J.length !== 0)
        Y || (Y = true), Q.push(...J);
      else if ($ !== Z)
        Q.push(...Object.keys(X[Z]).map((W) => [W, X[Z][W]]));
    }), !Y)
      return null;
    else
      return E2(Q);
  }
};
var l$ = class {
  constructor($) {
    this.name = "SmartRouter", this.routers = [], this.routes = [], Object.assign(this, $);
  }
  add($, Q, Y) {
    if (!this.routes)
      throw new Error(i1);
    this.routes.push([$, Q, Y]);
  }
  match($, Q) {
    if (!this.routes)
      throw new Error("Fatal error");
    const { routers: Y, routes: X } = this, J = Y.length;
    let W = 0, H;
    for (; W < J; W++) {
      const q = Y[W];
      try {
        X.forEach((B) => {
          q.add(...B);
        }), H = q.match($, Q);
      } catch (B) {
        if (B instanceof d1)
          continue;
        throw B;
      }
      this.match = q.match.bind(q), this.routers = [q], this.routes = void 0;
      break;
    }
    if (W === J)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, H;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1)
      throw new Error("No active router has been determined yet.");
    return this.routers[0];
  }
};
var u$ = class {
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
    const J = z6(Q), W = [], H = [];
    for (let G = 0, U = J.length; G < U; G++) {
      const O = J[G];
      if (Object.keys(X.children).includes(O)) {
        H.push(...X.patterns), X = X.children[O];
        const T = j$(O);
        if (T)
          W.push(T[1]);
        continue;
      }
      X.children[O] = new u$();
      const D = j$(O);
      if (D)
        X.patterns.push(D), H.push(...X.patterns), W.push(D[1]);
      H.push(...X.patterns), X = X.children[O];
    }
    if (!X.methods.length)
      X.methods = [];
    const q = {}, B = { handler: Y, possibleKeys: W.filter((G, U, O) => O.indexOf(G) === U), name: this.name, score: this.order };
    return q[$] = B, X.methods.push(q), X;
  }
  gHSets($, Q, Y, X) {
    const J = [];
    for (let W = 0, H = $.methods.length; W < H; W++) {
      const q = $.methods[W], B = q[Q] || q[Z], G = {};
      if (B !== void 0)
        B.params = {}, B.possibleKeys.forEach((U) => {
          const O = G[B.name];
          B.params[U] = X[U] && !O ? X[U] : Y[U] ?? X[U], G[B.name] = true;
        }), J.push(B);
    }
    return J;
  }
  search($, Q) {
    const Y = [];
    this.params = {};
    let J = [this];
    const W = b$(Q);
    for (let q = 0, B = W.length; q < B; q++) {
      const G = W[q], U = q === B - 1, O = [];
      for (let D = 0, T = J.length; D < T; D++) {
        const E = J[D], I = E.children[G];
        if (I)
          if (I.params = E.params, U === true) {
            if (I.children["*"])
              Y.push(...this.gHSets(I.children["*"], $, E.params, {}));
            Y.push(...this.gHSets(I, $, E.params, {}));
          } else
            O.push(I);
        for (let k = 0, u = E.patterns.length; k < u; k++) {
          const c = E.patterns[k], t = { ...E.params };
          if (c === "*") {
            const _$ = E.children["*"];
            if (_$)
              Y.push(...this.gHSets(_$, $, E.params, {})), O.push(_$);
            continue;
          }
          if (G === "")
            continue;
          const [M0, Z0, E1] = c, l0 = E.children[M0], B6 = W.slice(q).join("/");
          if (E1 instanceof RegExp && E1.test(B6)) {
            t[Z0] = B6, Y.push(...this.gHSets(l0, $, E.params, t));
            continue;
          }
          if (E1 === true || E1 instanceof RegExp && E1.test(G)) {
            if (typeof M0 === "string")
              if (t[Z0] = G, U === true) {
                if (Y.push(...this.gHSets(l0, $, t, E.params)), l0.children["*"])
                  Y.push(...this.gHSets(l0.children["*"], $, t, E.params));
              } else
                l0.params = t, O.push(l0);
          }
        }
      }
      J = O;
    }
    return [Y.sort((q, B) => {
      return q.score - B.score;
    }).map(({ handler: q, params: B }) => [q, B])];
  }
};
var c$ = class {
  constructor() {
    this.name = "TrieRouter", this.node = new u$();
  }
  add($, Q, Y) {
    const X = n1(Q);
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
var p$ = class extends C6 {
  constructor($ = {}) {
    super($);
    this.router = $.router ?? new l$({ routers: [new y$(), new c$()] });
  }
};
var o0 = {};
T$(o0, { verify: () => {
  {
    return _2;
  }
}, sign: () => {
  {
    return P2;
  }
}, decode: () => {
  {
    return l6;
  }
} });
var T6 = ($) => {
  return S2($.replace(/_|-/g, (Q) => ({ _: "/", "-": "+" })[Q] ?? Q));
};
var n$ = ($) => A2($).replace(/\/|\+/g, (Q) => ({ "/": "_", "+": "-" })[Q] ?? Q);
var A2 = ($) => {
  let Q = "";
  const Y = new Uint8Array($);
  for (let X = 0, J = Y.length; X < J; X++)
    Q += String.fromCharCode(Y[X]);
  return btoa(Q);
};
var S2 = ($) => {
  const Q = atob($), Y = new Uint8Array(new ArrayBuffer(Q.length)), X = Q.length / 2;
  for (let J = 0, W = Q.length - 1; J <= X; J++, W--)
    Y[J] = Q.charCodeAt(J), Y[W] = Q.charCodeAt(W);
  return Y;
};
var x6 = class extends Error {
  constructor($) {
    super(`${$} is not an implemented algorithm`);
    this.name = "JwtAlgorithmNotImplemented";
  }
};
var i$ = class extends Error {
  constructor($) {
    super(`invalid JWT token: ${$}`);
    this.name = "JwtTokenInvalid";
  }
};
var v6 = class extends Error {
  constructor($) {
    super(`token (${$}) is being used before it's valid`);
    this.name = "JwtTokenNotBefore";
  }
};
var Z6 = class extends Error {
  constructor($) {
    super(`token (${$}) expired`);
    this.name = "JwtTokenExpired";
  }
};
var k6 = class extends Error {
  constructor($, Q) {
    super(`Incorrect "iat" claim must be a older than "${$}" (iat: "${Q}")`);
    this.name = "JwtTokenIssuedAt";
  }
};
var g6 = class extends Error {
  constructor($) {
    super(`token(${$}) signature mismatched`);
    this.name = "JwtTokenSignatureMismatched";
  }
};
var C2 = new TextEncoder();
var I2 = new TextDecoder();
var b6 = ($) => n$(C2.encode(JSON.stringify($))).replace(/=/g, "");
var m6 = ($) => n$($).replace(/=/g, "");
var j6 = ($) => JSON.parse(I2.decode(T6($)));
var h6 = ($) => {
  switch ($.toUpperCase()) {
    case "HS256":
      return { name: "HMAC", hash: { name: "SHA-256" } };
    case "HS384":
      return { name: "HMAC", hash: { name: "SHA-384" } };
    case "HS512":
      return { name: "HMAC", hash: { name: "SHA-512" } };
    default:
      throw new x6($);
  }
};
var y6 = async ($, Q, Y = "HS256") => {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  const X = new TextEncoder(), J = await crypto.subtle.importKey("raw", X.encode(Q), h6(Y), false, ["sign"]);
  return await crypto.subtle.sign(h6(Y), J, X.encode($));
};
var P2 = async ($, Q, Y = "HS256") => {
  const X = b6($), W = `${b6({ alg: Y, typ: "JWT" })}.${X}`, H = await y6(W, Q, Y), q = m6(H);
  return `${W}.${q}`;
};
var _2 = async ($, Q, Y = "HS256") => {
  const X = $.split(".");
  if (X.length !== 3)
    throw new i$($);
  const { payload: J } = l6($), W = Math.floor(Date.now() / 1e3);
  if (J.nbf && J.nbf > W)
    throw new v6($);
  if (J.exp && J.exp <= W)
    throw new Z6($);
  if (J.iat && W < J.iat)
    throw new k6(W, J.iat);
  const H = X.slice(0, 2).join("."), q = await y6(H, Q, Y);
  if (m6(q) !== X[2])
    throw new g6($);
  return J;
};
var l6 = ($) => {
  try {
    const [Q, Y] = $.split("."), X = j6(Q), J = j6(Y);
    return { header: X, payload: J };
  } catch (Q) {
    throw new i$($);
  }
};
var u6 = o0.verify;
var lJ = o0.decode;
var c6 = o0.sign;
var A;
(function(t1) {
  let $;
  (function(J) {
    J[J["success"] = 0] = "success";
    J[J["fail"] = 1] = "fail";
  })($ = t1.Code || (t1.Code = {}));
  let Q;
  (function(q) {
    q[q["notFound"] = 0] = "notFound";
    q[q["falseMethod"] = 1] = "falseMethod";
    q[q["unauthorization"] = 2] = "unauthorization";
    q[q["format"] = 3] = "format";
    q[q["server"] = 4] = "server";
  })(Q = t1.FailCode || (t1.FailCode = {}));
})(A || (A = {}));
var q0 = ($, Q) => Q.safeParse($).success;
var C = ($, Q, Y, X) => {
  const J = { code: A.Code.fail, data: { code: Y, message: Q } };
  return console.error(J), $.json(J, X);
};
var b = ($, Q, Y = 200) => $.json({ code: A.Code.success, data: Q }, Y);
var x2 = function($) {
  i6 = $;
};
var $$ = function() {
  return i6;
};
var M = function($, Q) {
  const Y = Q$({ issueData: Q, data: $.data, path: $.path, errorMaps: [$.common.contextualErrorMap, $.schemaErrorMap, $$(), P1].filter((X) => !!X) });
  $.common.issues.push(Y);
};
var R = function($) {
  if (!$)
    return {};
  const { errorMap: Q, invalid_type_error: Y, required_error: X, description: J } = $;
  if (Q && (Y || X))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  if (Q)
    return { errorMap: Q, description: J };
  return { errorMap: (H, q) => {
    if (H.code !== "invalid_type")
      return { message: q.defaultError };
    if (typeof q.data === "undefined")
      return { message: X !== null && X !== void 0 ? X : q.defaultError };
    return { message: Y !== null && Y !== void 0 ? Y : q.defaultError };
  }, description: J };
};
var u2 = function($, Q) {
  if ((Q === "v4" || !Q) && m2.test($))
    return true;
  if ((Q === "v6" || !Q) && y2.test($))
    return true;
  return false;
};
var c2 = function($, Q) {
  const Y = ($.toString().split(".")[1] || "").length, X = (Q.toString().split(".")[1] || "").length, J = Y > X ? Y : X, W = parseInt($.toFixed(J).replace(".", "")), H = parseInt(Q.toFixed(J).replace(".", ""));
  return W % H / Math.pow(10, J);
};
var r0 = function($) {
  if ($ instanceof x) {
    const Q = {};
    for (let Y in $.shape) {
      const X = $.shape[Y];
      Q[Y] = B0.create(r0(X));
    }
    return new x({ ...$._def, shape: () => Q });
  } else if ($ instanceof Q0)
    return new Q0({ ...$._def, type: r0($.element) });
  else if ($ instanceof B0)
    return B0.create(r0($.unwrap()));
  else if ($ instanceof S0)
    return S0.create(r0($.unwrap()));
  else if ($ instanceof w0)
    return w0.create($.items.map((Q) => r0(Q)));
  else
    return $;
};
var a$ = function($, Q) {
  const Y = N0($), X = N0(Q);
  if ($ === Q)
    return { valid: true, data: $ };
  else if (Y === z.object && X === z.object) {
    const J = S.objectKeys(Q), W = S.objectKeys($).filter((q) => J.indexOf(q) !== -1), H = { ...$, ...Q };
    for (let q of W) {
      const B = a$($[q], Q[q]);
      if (!B.valid)
        return { valid: false };
      H[q] = B.data;
    }
    return { valid: true, data: H };
  } else if (Y === z.array && X === z.array) {
    if ($.length !== Q.length)
      return { valid: false };
    const J = [];
    for (let W = 0; W < $.length; W++) {
      const H = $[W], q = Q[W], B = a$(H, q);
      if (!B.valid)
        return { valid: false };
      J.push(B.data);
    }
    return { valid: true, data: J };
  } else if (Y === z.date && X === z.date && +$ === +Q)
    return { valid: true, data: $ };
  else
    return { valid: false };
};
var o6 = function($, Q) {
  return new A0({ values: $, typeName: L.ZodEnum, ...R(Q) });
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
    for (let H of J)
      W[H] = H;
    return W;
  }, $.getValidEnumValues = (J) => {
    const W = $.objectKeys(J).filter((q) => typeof J[J[q]] !== "number"), H = {};
    for (let q of W)
      H[q] = J[q];
    return $.objectValues(H);
  }, $.objectValues = (J) => {
    return $.objectKeys(J).map(function(W) {
      return J[W];
    });
  }, $.objectKeys = typeof Object.keys === "function" ? (J) => Object.keys(J) : (J) => {
    const W = [];
    for (let H in J)
      if (Object.prototype.hasOwnProperty.call(J, H))
        W.push(H);
    return W;
  }, $.find = (J, W) => {
    for (let H of J)
      if (W(H))
        return H;
    return;
  }, $.isInteger = typeof Number.isInteger === "function" ? (J) => Number.isInteger(J) : (J) => typeof J === "number" && isFinite(J) && Math.floor(J) === J;
  function X(J, W = " | ") {
    return J.map((H) => typeof H === "string" ? `'${H}'` : H).join(W);
  }
  $.joinValues = X, $.jsonStringifyReplacer = (J, W) => {
    if (typeof W === "bigint")
      return W.toString();
    return W;
  };
})(S || (S = {}));
var o$;
(function($) {
  $.mergeShapes = (Q, Y) => {
    return { ...Q, ...Y };
  };
})(o$ || (o$ = {}));
var z = S.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
var N0 = ($) => {
  switch (typeof $) {
    case "undefined":
      return z.undefined;
    case "string":
      return z.string;
    case "number":
      return isNaN($) ? z.nan : z.number;
    case "boolean":
      return z.boolean;
    case "function":
      return z.function;
    case "bigint":
      return z.bigint;
    case "symbol":
      return z.symbol;
    case "object":
      if (Array.isArray($))
        return z.array;
      if ($ === null)
        return z.null;
      if ($.then && typeof $.then === "function" && $.catch && typeof $.catch === "function")
        return z.promise;
      if (typeof Map !== "undefined" && $ instanceof Map)
        return z.map;
      if (typeof Set !== "undefined" && $ instanceof Set)
        return z.set;
      if (typeof Date !== "undefined" && $ instanceof Date)
        return z.date;
      return z.object;
    default:
      return z.unknown;
  }
};
var w = S.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
var T2 = ($) => {
  return JSON.stringify($, null, 2).replace(/"([^"]+)":/g, "$1:");
};
var d = class extends Error {
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
          let H = Y, q = 0;
          while (q < W.path.length) {
            const B = W.path[q];
            if (q !== W.path.length - 1)
              H[B] = H[B] || { _errors: [] };
            else
              H[B] = H[B] || { _errors: [] }, H[B]._errors.push(Q(W));
            H = H[B], q++;
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
d.create = ($) => {
  return new d($);
};
var P1 = ($, Q) => {
  let Y;
  switch ($.code) {
    case w.invalid_type:
      if ($.received === z.undefined)
        Y = "Required";
      else
        Y = `Expected ${$.expected}, received ${$.received}`;
      break;
    case w.invalid_literal:
      Y = `Invalid literal value, expected ${JSON.stringify($.expected, S.jsonStringifyReplacer)}`;
      break;
    case w.unrecognized_keys:
      Y = `Unrecognized key(s) in object: ${S.joinValues($.keys, ", ")}`;
      break;
    case w.invalid_union:
      Y = "Invalid input";
      break;
    case w.invalid_union_discriminator:
      Y = `Invalid discriminator value. Expected ${S.joinValues($.options)}`;
      break;
    case w.invalid_enum_value:
      Y = `Invalid enum value. Expected ${S.joinValues($.options)}, received '${$.received}'`;
      break;
    case w.invalid_arguments:
      Y = "Invalid function arguments";
      break;
    case w.invalid_return_type:
      Y = "Invalid function return type";
      break;
    case w.invalid_date:
      Y = "Invalid date";
      break;
    case w.invalid_string:
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
    case w.too_small:
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
    case w.too_big:
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
    case w.custom:
      Y = "Invalid input";
      break;
    case w.invalid_intersection_types:
      Y = "Intersection results could not be merged";
      break;
    case w.not_multiple_of:
      Y = `Number must be a multiple of ${$.multipleOf}`;
      break;
    case w.not_finite:
      Y = "Number must be finite";
      break;
    default:
      Y = Q.defaultError, S.assertNever($);
  }
  return { message: Y };
};
var i6 = P1;
var Q$ = ($) => {
  const { data: Q, path: Y, errorMaps: X, issueData: J } = $, W = [...Y, ...J.path || []], H = { ...J, path: W };
  let q = "";
  const B = X.filter((G) => !!G).slice().reverse();
  for (let G of B)
    q = G(H, { data: Q, defaultError: q }).message;
  return { ...J, path: W, message: J.message || q };
};
var v2 = [];
var m = class {
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
        return N;
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
    return m.mergeObjectSync($, Y);
  }
  static mergeObjectSync($, Q) {
    const Y = {};
    for (let X of Q) {
      const { key: J, value: W } = X;
      if (J.status === "aborted")
        return N;
      if (W.status === "aborted")
        return N;
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
var N = Object.freeze({ status: "aborted" });
var d6 = ($) => ({ status: "dirty", value: $ });
var y = ($) => ({ status: "valid", value: $ });
var r$ = ($) => $.status === "aborted";
var s$ = ($) => $.status === "dirty";
var _1 = ($) => $.status === "valid";
var Y$ = ($) => typeof Promise !== "undefined" && $ instanceof Promise;
var K;
(function($) {
  $.errToObj = (Q) => typeof Q === "string" ? { message: Q } : Q || {}, $.toString = (Q) => typeof Q === "string" ? Q : Q === null || Q === void 0 ? void 0 : Q.message;
})(K || (K = {}));
var Y0 = class {
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
var p6 = ($, Q) => {
  if (_1(Q))
    return { success: true, data: Q.value };
  else {
    if (!$.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return { success: false, get error() {
      if (this._error)
        return this._error;
      const Y = new d($.common.issues);
      return this._error = Y, this._error;
    } };
  }
};
var f = class {
  constructor($) {
    this.spa = this.safeParseAsync, this._def = $, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType($) {
    return N0($.data);
  }
  _getOrReturnCtx($, Q) {
    return Q || { common: $.parent.common, data: $.data, parsedType: N0($.data), schemaErrorMap: this._def.errorMap, path: $.path, parent: $.parent };
  }
  _processInputParams($) {
    return { status: new m(), ctx: { common: $.parent.common, data: $.data, parsedType: N0($.data), schemaErrorMap: this._def.errorMap, path: $.path, parent: $.parent } };
  }
  _parseSync($) {
    const Q = this._parse($);
    if (Y$(Q))
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
    const X = { common: { issues: [], async: (Y = Q === null || Q === void 0 ? void 0 : Q.async) !== null && Y !== void 0 ? Y : false, contextualErrorMap: Q === null || Q === void 0 ? void 0 : Q.errorMap }, path: (Q === null || Q === void 0 ? void 0 : Q.path) || [], schemaErrorMap: this._def.errorMap, parent: null, data: $, parsedType: N0($) }, J = this._parseSync({ data: $, path: X.path, parent: X });
    return p6(X, J);
  }
  async parseAsync($, Q) {
    const Y = await this.safeParseAsync($, Q);
    if (Y.success)
      return Y.data;
    throw Y.error;
  }
  async safeParseAsync($, Q) {
    const Y = { common: { issues: [], contextualErrorMap: Q === null || Q === void 0 ? void 0 : Q.errorMap, async: true }, path: (Q === null || Q === void 0 ? void 0 : Q.path) || [], schemaErrorMap: this._def.errorMap, parent: null, data: $, parsedType: N0($) }, X = this._parse({ data: $, path: Y.path, parent: Y }), J = await (Y$(X) ? X : Promise.resolve(X));
    return p6(Y, J);
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
      const W = $(X), H = () => J.addIssue({ code: w.custom, ...Y(X) });
      if (typeof Promise !== "undefined" && W instanceof Promise)
        return W.then((q) => {
          if (!q)
            return H(), false;
          else
            return true;
        });
      if (!W)
        return H(), false;
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
    return new o({ schema: this, typeName: L.ZodEffects, effect: { type: "refinement", refinement: $ } });
  }
  superRefine($) {
    return this._refinement($);
  }
  optional() {
    return B0.create(this, this._def);
  }
  nullable() {
    return S0.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Q0.create(this, this._def);
  }
  promise() {
    return j0.create(this, this._def);
  }
  or($) {
    return $1.create([this, $], this._def);
  }
  and($) {
    return Q1.create(this, $, this._def);
  }
  transform($) {
    return new o({ ...R(this._def), schema: this, typeName: L.ZodEffects, effect: { type: "transform", transform: $ } });
  }
  default($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new W1({ ...R(this._def), innerType: this, defaultValue: Q, typeName: L.ZodDefault });
  }
  brand() {
    return new t$({ typeName: L.ZodBranded, type: this, ...R(this._def) });
  }
  catch($) {
    const Q = typeof $ === "function" ? $ : () => $;
    return new k1({ ...R(this._def), innerType: this, catchValue: Q, typeName: L.ZodCatch });
  }
  describe($) {
    return new this.constructor({ ...this._def, description: $ });
  }
  pipe($) {
    return j1.create(this, $);
  }
  readonly() {
    return b1.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var Z2 = /^c[^\s-]{8,}$/i;
var k2 = /^[a-z][a-z0-9]*$/;
var g2 = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var b2 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var j2 = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var h2 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
var d$;
var m2 = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var y2 = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var l2 = ($) => {
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
var $0 = class extends f {
  _parse($) {
    if (this._def.coerce)
      $.data = String($.data);
    if (this._getType($) !== z.string) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: w.invalid_type, expected: z.string, received: J.parsedType }), N;
    }
    const Y = new m();
    let X = void 0;
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if ($.data.length < J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: w.too_small, minimum: J.value, type: "string", inclusive: true, exact: false, message: J.message }), Y.dirty();
      } else if (J.kind === "max") {
        if ($.data.length > J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: w.too_big, maximum: J.value, type: "string", inclusive: true, exact: false, message: J.message }), Y.dirty();
      } else if (J.kind === "length") {
        const W = $.data.length > J.value, H = $.data.length < J.value;
        if (W || H) {
          if (X = this._getOrReturnCtx($, X), W)
            M(X, { code: w.too_big, maximum: J.value, type: "string", inclusive: true, exact: true, message: J.message });
          else if (H)
            M(X, { code: w.too_small, minimum: J.value, type: "string", inclusive: true, exact: true, message: J.message });
          Y.dirty();
        }
      } else if (J.kind === "email") {
        if (!j2.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "email", code: w.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "emoji") {
        if (!d$)
          d$ = new RegExp(h2, "u");
        if (!d$.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "emoji", code: w.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "uuid") {
        if (!b2.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "uuid", code: w.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid") {
        if (!Z2.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "cuid", code: w.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "cuid2") {
        if (!k2.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "cuid2", code: w.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "ulid") {
        if (!g2.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "ulid", code: w.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "url")
        try {
          new URL($.data);
        } catch (W) {
          X = this._getOrReturnCtx($, X), M(X, { validation: "url", code: w.invalid_string, message: J.message }), Y.dirty();
        }
      else if (J.kind === "regex") {
        if (J.regex.lastIndex = 0, !J.regex.test($.data))
          X = this._getOrReturnCtx($, X), M(X, { validation: "regex", code: w.invalid_string, message: J.message }), Y.dirty();
      } else if (J.kind === "trim")
        $.data = $.data.trim();
      else if (J.kind === "includes") {
        if (!$.data.includes(J.value, J.position))
          X = this._getOrReturnCtx($, X), M(X, { code: w.invalid_string, validation: { includes: J.value, position: J.position }, message: J.message }), Y.dirty();
      } else if (J.kind === "toLowerCase")
        $.data = $.data.toLowerCase();
      else if (J.kind === "toUpperCase")
        $.data = $.data.toUpperCase();
      else if (J.kind === "startsWith") {
        if (!$.data.startsWith(J.value))
          X = this._getOrReturnCtx($, X), M(X, { code: w.invalid_string, validation: { startsWith: J.value }, message: J.message }), Y.dirty();
      } else if (J.kind === "endsWith") {
        if (!$.data.endsWith(J.value))
          X = this._getOrReturnCtx($, X), M(X, { code: w.invalid_string, validation: { endsWith: J.value }, message: J.message }), Y.dirty();
      } else if (J.kind === "datetime") {
        if (!l2(J).test($.data))
          X = this._getOrReturnCtx($, X), M(X, { code: w.invalid_string, validation: "datetime", message: J.message }), Y.dirty();
      } else if (J.kind === "ip") {
        if (!u2($.data, J.version))
          X = this._getOrReturnCtx($, X), M(X, { validation: "ip", code: w.invalid_string, message: J.message }), Y.dirty();
      } else
        S.assertNever(J);
    return { status: Y.value, value: $.data };
  }
  _regex($, Q, Y) {
    return this.refinement((X) => $.test(X), { validation: Q, code: w.invalid_string, ...K.errToObj(Y) });
  }
  _addCheck($) {
    return new $0({ ...this._def, checks: [...this._def.checks, $] });
  }
  email($) {
    return this._addCheck({ kind: "email", ...K.errToObj($) });
  }
  url($) {
    return this._addCheck({ kind: "url", ...K.errToObj($) });
  }
  emoji($) {
    return this._addCheck({ kind: "emoji", ...K.errToObj($) });
  }
  uuid($) {
    return this._addCheck({ kind: "uuid", ...K.errToObj($) });
  }
  cuid($) {
    return this._addCheck({ kind: "cuid", ...K.errToObj($) });
  }
  cuid2($) {
    return this._addCheck({ kind: "cuid2", ...K.errToObj($) });
  }
  ulid($) {
    return this._addCheck({ kind: "ulid", ...K.errToObj($) });
  }
  ip($) {
    return this._addCheck({ kind: "ip", ...K.errToObj($) });
  }
  datetime($) {
    var Q;
    if (typeof $ === "string")
      return this._addCheck({ kind: "datetime", precision: null, offset: false, message: $ });
    return this._addCheck({ kind: "datetime", precision: typeof ($ === null || $ === void 0 ? void 0 : $.precision) === "undefined" ? null : $ === null || $ === void 0 ? void 0 : $.precision, offset: (Q = $ === null || $ === void 0 ? void 0 : $.offset) !== null && Q !== void 0 ? Q : false, ...K.errToObj($ === null || $ === void 0 ? void 0 : $.message) });
  }
  regex($, Q) {
    return this._addCheck({ kind: "regex", regex: $, ...K.errToObj(Q) });
  }
  includes($, Q) {
    return this._addCheck({ kind: "includes", value: $, position: Q === null || Q === void 0 ? void 0 : Q.position, ...K.errToObj(Q === null || Q === void 0 ? void 0 : Q.message) });
  }
  startsWith($, Q) {
    return this._addCheck({ kind: "startsWith", value: $, ...K.errToObj(Q) });
  }
  endsWith($, Q) {
    return this._addCheck({ kind: "endsWith", value: $, ...K.errToObj(Q) });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $, ...K.errToObj(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $, ...K.errToObj(Q) });
  }
  length($, Q) {
    return this._addCheck({ kind: "length", value: $, ...K.errToObj(Q) });
  }
  nonempty($) {
    return this.min(1, K.errToObj($));
  }
  trim() {
    return new $0({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
  }
  toLowerCase() {
    return new $0({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
  }
  toUpperCase() {
    return new $0({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
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
$0.create = ($) => {
  var Q;
  return new $0({ checks: [], typeName: L.ZodString, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...R($) });
};
var f0 = class extends f {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = Number($.data);
    if (this._getType($) !== z.number) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: w.invalid_type, expected: z.number, received: J.parsedType }), N;
    }
    let Y = void 0;
    const X = new m();
    for (let J of this._def.checks)
      if (J.kind === "int") {
        if (!S.isInteger($.data))
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.invalid_type, expected: "integer", received: "float", message: J.message }), X.dirty();
      } else if (J.kind === "min") {
        if (J.inclusive ? $.data < J.value : $.data <= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.too_small, minimum: J.value, type: "number", inclusive: J.inclusive, exact: false, message: J.message }), X.dirty();
      } else if (J.kind === "max") {
        if (J.inclusive ? $.data > J.value : $.data >= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.too_big, maximum: J.value, type: "number", inclusive: J.inclusive, exact: false, message: J.message }), X.dirty();
      } else if (J.kind === "multipleOf") {
        if (c2($.data, J.value) !== 0)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.not_multiple_of, multipleOf: J.value, message: J.message }), X.dirty();
      } else if (J.kind === "finite") {
        if (!Number.isFinite($.data))
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.not_finite, message: J.message }), X.dirty();
      } else
        S.assertNever(J);
    return { status: X.value, value: $.data };
  }
  gte($, Q) {
    return this.setLimit("min", $, true, K.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, K.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, K.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, K.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new f0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: K.toString(X) }] });
  }
  _addCheck($) {
    return new f0({ ...this._def, checks: [...this._def.checks, $] });
  }
  int($) {
    return this._addCheck({ kind: "int", message: K.toString($) });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: false, message: K.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: false, message: K.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: 0, inclusive: true, message: K.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: 0, inclusive: true, message: K.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: K.toString(Q) });
  }
  finite($) {
    return this._addCheck({ kind: "finite", message: K.toString($) });
  }
  safe($) {
    return this._addCheck({ kind: "min", inclusive: true, value: Number.MIN_SAFE_INTEGER, message: K.toString($) })._addCheck({ kind: "max", inclusive: true, value: Number.MAX_SAFE_INTEGER, message: K.toString($) });
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
f0.create = ($) => {
  return new f0({ checks: [], typeName: L.ZodNumber, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...R($) });
};
var E0 = class extends f {
  constructor() {
    super(...arguments);
    this.min = this.gte, this.max = this.lte;
  }
  _parse($) {
    if (this._def.coerce)
      $.data = BigInt($.data);
    if (this._getType($) !== z.bigint) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: w.invalid_type, expected: z.bigint, received: J.parsedType }), N;
    }
    let Y = void 0;
    const X = new m();
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if (J.inclusive ? $.data < J.value : $.data <= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.too_small, type: "bigint", minimum: J.value, inclusive: J.inclusive, message: J.message }), X.dirty();
      } else if (J.kind === "max") {
        if (J.inclusive ? $.data > J.value : $.data >= J.value)
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.too_big, type: "bigint", maximum: J.value, inclusive: J.inclusive, message: J.message }), X.dirty();
      } else if (J.kind === "multipleOf") {
        if ($.data % J.value !== BigInt(0))
          Y = this._getOrReturnCtx($, Y), M(Y, { code: w.not_multiple_of, multipleOf: J.value, message: J.message }), X.dirty();
      } else
        S.assertNever(J);
    return { status: X.value, value: $.data };
  }
  gte($, Q) {
    return this.setLimit("min", $, true, K.toString(Q));
  }
  gt($, Q) {
    return this.setLimit("min", $, false, K.toString(Q));
  }
  lte($, Q) {
    return this.setLimit("max", $, true, K.toString(Q));
  }
  lt($, Q) {
    return this.setLimit("max", $, false, K.toString(Q));
  }
  setLimit($, Q, Y, X) {
    return new E0({ ...this._def, checks: [...this._def.checks, { kind: $, value: Q, inclusive: Y, message: K.toString(X) }] });
  }
  _addCheck($) {
    return new E0({ ...this._def, checks: [...this._def.checks, $] });
  }
  positive($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: false, message: K.toString($) });
  }
  negative($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: false, message: K.toString($) });
  }
  nonpositive($) {
    return this._addCheck({ kind: "max", value: BigInt(0), inclusive: true, message: K.toString($) });
  }
  nonnegative($) {
    return this._addCheck({ kind: "min", value: BigInt(0), inclusive: true, message: K.toString($) });
  }
  multipleOf($, Q) {
    return this._addCheck({ kind: "multipleOf", value: $, message: K.toString(Q) });
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
E0.create = ($) => {
  var Q;
  return new E0({ checks: [], typeName: L.ZodBigInt, coerce: (Q = $ === null || $ === void 0 ? void 0 : $.coerce) !== null && Q !== void 0 ? Q : false, ...R($) });
};
var a0 = class extends f {
  _parse($) {
    if (this._def.coerce)
      $.data = Boolean($.data);
    if (this._getType($) !== z.boolean) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: w.invalid_type, expected: z.boolean, received: Y.parsedType }), N;
    }
    return y($.data);
  }
};
a0.create = ($) => {
  return new a0({ typeName: L.ZodBoolean, coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, ...R($) });
};
var k0 = class extends f {
  _parse($) {
    if (this._def.coerce)
      $.data = new Date($.data);
    if (this._getType($) !== z.date) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: w.invalid_type, expected: z.date, received: J.parsedType }), N;
    }
    if (isNaN($.data.getTime())) {
      const J = this._getOrReturnCtx($);
      return M(J, { code: w.invalid_date }), N;
    }
    const Y = new m();
    let X = void 0;
    for (let J of this._def.checks)
      if (J.kind === "min") {
        if ($.data.getTime() < J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: w.too_small, message: J.message, inclusive: true, exact: false, minimum: J.value, type: "date" }), Y.dirty();
      } else if (J.kind === "max") {
        if ($.data.getTime() > J.value)
          X = this._getOrReturnCtx($, X), M(X, { code: w.too_big, message: J.message, inclusive: true, exact: false, maximum: J.value, type: "date" }), Y.dirty();
      } else
        S.assertNever(J);
    return { status: Y.value, value: new Date($.data.getTime()) };
  }
  _addCheck($) {
    return new k0({ ...this._def, checks: [...this._def.checks, $] });
  }
  min($, Q) {
    return this._addCheck({ kind: "min", value: $.getTime(), message: K.toString(Q) });
  }
  max($, Q) {
    return this._addCheck({ kind: "max", value: $.getTime(), message: K.toString(Q) });
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
k0.create = ($) => {
  return new k0({ checks: [], coerce: ($ === null || $ === void 0 ? void 0 : $.coerce) || false, typeName: L.ZodDate, ...R($) });
};
var T1 = class extends f {
  _parse($) {
    if (this._getType($) !== z.symbol) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: w.invalid_type, expected: z.symbol, received: Y.parsedType }), N;
    }
    return y($.data);
  }
};
T1.create = ($) => {
  return new T1({ typeName: L.ZodSymbol, ...R($) });
};
var t0 = class extends f {
  _parse($) {
    if (this._getType($) !== z.undefined) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: w.invalid_type, expected: z.undefined, received: Y.parsedType }), N;
    }
    return y($.data);
  }
};
t0.create = ($) => {
  return new t0({ typeName: L.ZodUndefined, ...R($) });
};
var e0 = class extends f {
  _parse($) {
    if (this._getType($) !== z.null) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: w.invalid_type, expected: z.null, received: Y.parsedType }), N;
    }
    return y($.data);
  }
};
e0.create = ($) => {
  return new e0({ typeName: L.ZodNull, ...R($) });
};
var g0 = class extends f {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse($) {
    return y($.data);
  }
};
g0.create = ($) => {
  return new g0({ typeName: L.ZodAny, ...R($) });
};
var R0 = class extends f {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse($) {
    return y($.data);
  }
};
R0.create = ($) => {
  return new R0({ typeName: L.ZodUnknown, ...R($) });
};
var G0 = class extends f {
  _parse($) {
    const Q = this._getOrReturnCtx($);
    return M(Q, { code: w.invalid_type, expected: z.never, received: Q.parsedType }), N;
  }
};
G0.create = ($) => {
  return new G0({ typeName: L.ZodNever, ...R($) });
};
var x1 = class extends f {
  _parse($) {
    if (this._getType($) !== z.undefined) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: w.invalid_type, expected: z.void, received: Y.parsedType }), N;
    }
    return y($.data);
  }
};
x1.create = ($) => {
  return new x1({ typeName: L.ZodVoid, ...R($) });
};
var Q0 = class extends f {
  _parse($) {
    const { ctx: Q, status: Y } = this._processInputParams($), X = this._def;
    if (Q.parsedType !== z.array)
      return M(Q, { code: w.invalid_type, expected: z.array, received: Q.parsedType }), N;
    if (X.exactLength !== null) {
      const W = Q.data.length > X.exactLength.value, H = Q.data.length < X.exactLength.value;
      if (W || H)
        M(Q, { code: W ? w.too_big : w.too_small, minimum: H ? X.exactLength.value : void 0, maximum: W ? X.exactLength.value : void 0, type: "array", inclusive: true, exact: true, message: X.exactLength.message }), Y.dirty();
    }
    if (X.minLength !== null) {
      if (Q.data.length < X.minLength.value)
        M(Q, { code: w.too_small, minimum: X.minLength.value, type: "array", inclusive: true, exact: false, message: X.minLength.message }), Y.dirty();
    }
    if (X.maxLength !== null) {
      if (Q.data.length > X.maxLength.value)
        M(Q, { code: w.too_big, maximum: X.maxLength.value, type: "array", inclusive: true, exact: false, message: X.maxLength.message }), Y.dirty();
    }
    if (Q.common.async)
      return Promise.all([...Q.data].map((W, H) => {
        return X.type._parseAsync(new Y0(Q, W, Q.path, H));
      })).then((W) => {
        return m.mergeArray(Y, W);
      });
    const J = [...Q.data].map((W, H) => {
      return X.type._parseSync(new Y0(Q, W, Q.path, H));
    });
    return m.mergeArray(Y, J);
  }
  get element() {
    return this._def.type;
  }
  min($, Q) {
    return new Q0({ ...this._def, minLength: { value: $, message: K.toString(Q) } });
  }
  max($, Q) {
    return new Q0({ ...this._def, maxLength: { value: $, message: K.toString(Q) } });
  }
  length($, Q) {
    return new Q0({ ...this._def, exactLength: { value: $, message: K.toString(Q) } });
  }
  nonempty($) {
    return this.min(1, $);
  }
};
Q0.create = ($, Q) => {
  return new Q0({ type: $, minLength: null, maxLength: null, exactLength: null, typeName: L.ZodArray, ...R(Q) });
};
var x = class extends f {
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
    if (this._getType($) !== z.object) {
      const B = this._getOrReturnCtx($);
      return M(B, { code: w.invalid_type, expected: z.object, received: B.parsedType }), N;
    }
    const { status: Y, ctx: X } = this._processInputParams($), { shape: J, keys: W } = this._getCached(), H = [];
    if (!(this._def.catchall instanceof G0 && this._def.unknownKeys === "strip")) {
      for (let B in X.data)
        if (!W.includes(B))
          H.push(B);
    }
    const q = [];
    for (let B of W) {
      const G = J[B], U = X.data[B];
      q.push({ key: { status: "valid", value: B }, value: G._parse(new Y0(X, U, X.path, B)), alwaysSet: B in X.data });
    }
    if (this._def.catchall instanceof G0) {
      const B = this._def.unknownKeys;
      if (B === "passthrough")
        for (let G of H)
          q.push({ key: { status: "valid", value: G }, value: { status: "valid", value: X.data[G] } });
      else if (B === "strict") {
        if (H.length > 0)
          M(X, { code: w.unrecognized_keys, keys: H }), Y.dirty();
      } else if (B === "strip")
        ;
      else
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const B = this._def.catchall;
      for (let G of H) {
        const U = X.data[G];
        q.push({ key: { status: "valid", value: G }, value: B._parse(new Y0(X, U, X.path, G)), alwaysSet: G in X.data });
      }
    }
    if (X.common.async)
      return Promise.resolve().then(async () => {
        const B = [];
        for (let G of q) {
          const U = await G.key;
          B.push({ key: U, value: await G.value, alwaysSet: G.alwaysSet });
        }
        return B;
      }).then((B) => {
        return m.mergeObjectSync(Y, B);
      });
    else
      return m.mergeObjectSync(Y, q);
  }
  get shape() {
    return this._def.shape();
  }
  strict($) {
    return K.errToObj, new x({ ...this._def, unknownKeys: "strict", ...$ !== void 0 ? { errorMap: (Q, Y) => {
      var X, J, W, H;
      const q = (W = (J = (X = this._def).errorMap) === null || J === void 0 ? void 0 : J.call(X, Q, Y).message) !== null && W !== void 0 ? W : Y.defaultError;
      if (Q.code === "unrecognized_keys")
        return { message: (H = K.errToObj($).message) !== null && H !== void 0 ? H : q };
      return { message: q };
    } } : {} });
  }
  strip() {
    return new x({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new x({ ...this._def, unknownKeys: "passthrough" });
  }
  extend($) {
    return new x({ ...this._def, shape: () => ({ ...this._def.shape(), ...$ }) });
  }
  merge($) {
    return new x({ unknownKeys: $._def.unknownKeys, catchall: $._def.catchall, shape: () => ({ ...this._def.shape(), ...$._def.shape() }), typeName: L.ZodObject });
  }
  setKey($, Q) {
    return this.augment({ [$]: Q });
  }
  catchall($) {
    return new x({ ...this._def, catchall: $ });
  }
  pick($) {
    const Q = {};
    return S.objectKeys($).forEach((Y) => {
      if ($[Y] && this.shape[Y])
        Q[Y] = this.shape[Y];
    }), new x({ ...this._def, shape: () => Q });
  }
  omit($) {
    const Q = {};
    return S.objectKeys(this.shape).forEach((Y) => {
      if (!$[Y])
        Q[Y] = this.shape[Y];
    }), new x({ ...this._def, shape: () => Q });
  }
  deepPartial() {
    return r0(this);
  }
  partial($) {
    const Q = {};
    return S.objectKeys(this.shape).forEach((Y) => {
      const X = this.shape[Y];
      if ($ && !$[Y])
        Q[Y] = X;
      else
        Q[Y] = X.optional();
    }), new x({ ...this._def, shape: () => Q });
  }
  required($) {
    const Q = {};
    return S.objectKeys(this.shape).forEach((Y) => {
      if ($ && !$[Y])
        Q[Y] = this.shape[Y];
      else {
        let J = this.shape[Y];
        while (J instanceof B0)
          J = J._def.innerType;
        Q[Y] = J;
      }
    }), new x({ ...this._def, shape: () => Q });
  }
  keyof() {
    return o6(S.objectKeys(this.shape));
  }
};
x.create = ($, Q) => {
  return new x({ shape: () => $, unknownKeys: "strip", catchall: G0.create(), typeName: L.ZodObject, ...R(Q) });
};
x.strictCreate = ($, Q) => {
  return new x({ shape: () => $, unknownKeys: "strict", catchall: G0.create(), typeName: L.ZodObject, ...R(Q) });
};
x.lazycreate = ($, Q) => {
  return new x({ shape: $, unknownKeys: "strip", catchall: G0.create(), typeName: L.ZodObject, ...R(Q) });
};
var $1 = class extends f {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = this._def.options;
    function X(J) {
      for (let H of J)
        if (H.result.status === "valid")
          return H.result;
      for (let H of J)
        if (H.result.status === "dirty")
          return Q.common.issues.push(...H.ctx.common.issues), H.result;
      const W = J.map((H) => new d(H.ctx.common.issues));
      return M(Q, { code: w.invalid_union, unionErrors: W }), N;
    }
    if (Q.common.async)
      return Promise.all(Y.map(async (J) => {
        const W = { ...Q, common: { ...Q.common, issues: [] }, parent: null };
        return { result: await J._parseAsync({ data: Q.data, path: Q.path, parent: W }), ctx: W };
      })).then(X);
    else {
      let J = void 0;
      const W = [];
      for (let q of Y) {
        const B = { ...Q, common: { ...Q.common, issues: [] }, parent: null }, G = q._parseSync({ data: Q.data, path: Q.path, parent: B });
        if (G.status === "valid")
          return G;
        else if (G.status === "dirty" && !J)
          J = { result: G, ctx: B };
        if (B.common.issues.length)
          W.push(B.common.issues);
      }
      if (J)
        return Q.common.issues.push(...J.ctx.common.issues), J.result;
      const H = W.map((q) => new d(q));
      return M(Q, { code: w.invalid_union, unionErrors: H }), N;
    }
  }
  get options() {
    return this._def.options;
  }
};
$1.create = ($, Q) => {
  return new $1({ options: $, typeName: L.ZodUnion, ...R(Q) });
};
var e1 = ($) => {
  if ($ instanceof Y1)
    return e1($.schema);
  else if ($ instanceof o)
    return e1($.innerType());
  else if ($ instanceof X1)
    return [$.value];
  else if ($ instanceof A0)
    return $.options;
  else if ($ instanceof J1)
    return Object.keys($.enum);
  else if ($ instanceof W1)
    return e1($._def.innerType);
  else if ($ instanceof t0)
    return [void 0];
  else if ($ instanceof e0)
    return [null];
  else
    return null;
};
var X$ = class extends f {
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== z.object)
      return M(Q, { code: w.invalid_type, expected: z.object, received: Q.parsedType }), N;
    const Y = this.discriminator, X = Q.data[Y], J = this.optionsMap.get(X);
    if (!J)
      return M(Q, { code: w.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [Y] }), N;
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
      const W = e1(J.shape[$]);
      if (!W)
        throw new Error(`A discriminator value for key \`${$}\` could not be extracted from all schema options`);
      for (let H of W) {
        if (X.has(H))
          throw new Error(`Discriminator property ${String($)} has duplicate value ${String(H)}`);
        X.set(H, J);
      }
    }
    return new X$({ typeName: L.ZodDiscriminatedUnion, discriminator: $, options: Q, optionsMap: X, ...R(Y) });
  }
};
var Q1 = class extends f {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($), X = (J, W) => {
      if (r$(J) || r$(W))
        return N;
      const H = a$(J.value, W.value);
      if (!H.valid)
        return M(Y, { code: w.invalid_intersection_types }), N;
      if (s$(J) || s$(W))
        Q.dirty();
      return { status: Q.value, value: H.data };
    };
    if (Y.common.async)
      return Promise.all([this._def.left._parseAsync({ data: Y.data, path: Y.path, parent: Y }), this._def.right._parseAsync({ data: Y.data, path: Y.path, parent: Y })]).then(([J, W]) => X(J, W));
    else
      return X(this._def.left._parseSync({ data: Y.data, path: Y.path, parent: Y }), this._def.right._parseSync({ data: Y.data, path: Y.path, parent: Y }));
  }
};
Q1.create = ($, Q, Y) => {
  return new Q1({ left: $, right: Q, typeName: L.ZodIntersection, ...R(Y) });
};
var w0 = class extends f {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== z.array)
      return M(Y, { code: w.invalid_type, expected: z.array, received: Y.parsedType }), N;
    if (Y.data.length < this._def.items.length)
      return M(Y, { code: w.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: "array" }), N;
    if (!this._def.rest && Y.data.length > this._def.items.length)
      M(Y, { code: w.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: "array" }), Q.dirty();
    const J = [...Y.data].map((W, H) => {
      const q = this._def.items[H] || this._def.rest;
      if (!q)
        return null;
      return q._parse(new Y0(Y, W, Y.path, H));
    }).filter((W) => !!W);
    if (Y.common.async)
      return Promise.all(J).then((W) => {
        return m.mergeArray(Q, W);
      });
    else
      return m.mergeArray(Q, J);
  }
  get items() {
    return this._def.items;
  }
  rest($) {
    return new w0({ ...this._def, rest: $ });
  }
};
w0.create = ($, Q) => {
  if (!Array.isArray($))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new w0({ items: $, typeName: L.ZodTuple, rest: null, ...R(Q) });
};
var v1 = class extends f {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== z.object)
      return M(Y, { code: w.invalid_type, expected: z.object, received: Y.parsedType }), N;
    const X = [], J = this._def.keyType, W = this._def.valueType;
    for (let H in Y.data)
      X.push({ key: J._parse(new Y0(Y, H, Y.path, H)), value: W._parse(new Y0(Y, Y.data[H], Y.path, H)) });
    if (Y.common.async)
      return m.mergeObjectAsync(Q, X);
    else
      return m.mergeObjectSync(Q, X);
  }
  get element() {
    return this._def.valueType;
  }
  static create($, Q, Y) {
    if (Q instanceof f)
      return new v1({ keyType: $, valueType: Q, typeName: L.ZodRecord, ...R(Y) });
    return new v1({ keyType: $0.create(), valueType: $, typeName: L.ZodRecord, ...R(Q) });
  }
};
var Z1 = class extends f {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== z.map)
      return M(Y, { code: w.invalid_type, expected: z.map, received: Y.parsedType }), N;
    const X = this._def.keyType, J = this._def.valueType, W = [...Y.data.entries()].map(([H, q], B) => {
      return { key: X._parse(new Y0(Y, H, Y.path, [B, "key"])), value: J._parse(new Y0(Y, q, Y.path, [B, "value"])) };
    });
    if (Y.common.async) {
      const H = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (let q of W) {
          const B = await q.key, G = await q.value;
          if (B.status === "aborted" || G.status === "aborted")
            return N;
          if (B.status === "dirty" || G.status === "dirty")
            Q.dirty();
          H.set(B.value, G.value);
        }
        return { status: Q.value, value: H };
      });
    } else {
      const H = /* @__PURE__ */ new Map();
      for (let q of W) {
        const { key: B, value: G } = q;
        if (B.status === "aborted" || G.status === "aborted")
          return N;
        if (B.status === "dirty" || G.status === "dirty")
          Q.dirty();
        H.set(B.value, G.value);
      }
      return { status: Q.value, value: H };
    }
  }
};
Z1.create = ($, Q, Y) => {
  return new Z1({ valueType: Q, keyType: $, typeName: L.ZodMap, ...R(Y) });
};
var b0 = class extends f {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.parsedType !== z.set)
      return M(Y, { code: w.invalid_type, expected: z.set, received: Y.parsedType }), N;
    const X = this._def;
    if (X.minSize !== null) {
      if (Y.data.size < X.minSize.value)
        M(Y, { code: w.too_small, minimum: X.minSize.value, type: "set", inclusive: true, exact: false, message: X.minSize.message }), Q.dirty();
    }
    if (X.maxSize !== null) {
      if (Y.data.size > X.maxSize.value)
        M(Y, { code: w.too_big, maximum: X.maxSize.value, type: "set", inclusive: true, exact: false, message: X.maxSize.message }), Q.dirty();
    }
    const J = this._def.valueType;
    function W(q) {
      const B = /* @__PURE__ */ new Set();
      for (let G of q) {
        if (G.status === "aborted")
          return N;
        if (G.status === "dirty")
          Q.dirty();
        B.add(G.value);
      }
      return { status: Q.value, value: B };
    }
    const H = [...Y.data.values()].map((q, B) => J._parse(new Y0(Y, q, Y.path, B)));
    if (Y.common.async)
      return Promise.all(H).then((q) => W(q));
    else
      return W(H);
  }
  min($, Q) {
    return new b0({ ...this._def, minSize: { value: $, message: K.toString(Q) } });
  }
  max($, Q) {
    return new b0({ ...this._def, maxSize: { value: $, message: K.toString(Q) } });
  }
  size($, Q) {
    return this.min($, Q).max($, Q);
  }
  nonempty($) {
    return this.min(1, $);
  }
};
b0.create = ($, Q) => {
  return new b0({ valueType: $, minSize: null, maxSize: null, typeName: L.ZodSet, ...R(Q) });
};
var s0 = class extends f {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== z.function)
      return M(Q, { code: w.invalid_type, expected: z.function, received: Q.parsedType }), N;
    function Y(H, q) {
      return Q$({ data: H, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, $$(), P1].filter((B) => !!B), issueData: { code: w.invalid_arguments, argumentsError: q } });
    }
    function X(H, q) {
      return Q$({ data: H, path: Q.path, errorMaps: [Q.common.contextualErrorMap, Q.schemaErrorMap, $$(), P1].filter((B) => !!B), issueData: { code: w.invalid_return_type, returnTypeError: q } });
    }
    const J = { errorMap: Q.common.contextualErrorMap }, W = Q.data;
    if (this._def.returns instanceof j0) {
      const H = this;
      return y(async function(...q) {
        const B = new d([]), G = await H._def.args.parseAsync(q, J).catch((D) => {
          throw B.addIssue(Y(q, D)), B;
        }), U = await Reflect.apply(W, this, G);
        return await H._def.returns._def.type.parseAsync(U, J).catch((D) => {
          throw B.addIssue(X(U, D)), B;
        });
      });
    } else {
      const H = this;
      return y(function(...q) {
        const B = H._def.args.safeParse(q, J);
        if (!B.success)
          throw new d([Y(q, B.error)]);
        const G = Reflect.apply(W, this, B.data), U = H._def.returns.safeParse(G, J);
        if (!U.success)
          throw new d([X(G, U.error)]);
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
    return new s0({ ...this._def, args: w0.create($).rest(R0.create()) });
  }
  returns($) {
    return new s0({ ...this._def, returns: $ });
  }
  implement($) {
    return this.parse($);
  }
  strictImplement($) {
    return this.parse($);
  }
  static create($, Q, Y) {
    return new s0({ args: $ ? $ : w0.create([]).rest(R0.create()), returns: Q || R0.create(), typeName: L.ZodFunction, ...R(Y) });
  }
};
var Y1 = class extends f {
  get schema() {
    return this._def.getter();
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    return this._def.getter()._parse({ data: Q.data, path: Q.path, parent: Q });
  }
};
Y1.create = ($, Q) => {
  return new Y1({ getter: $, typeName: L.ZodLazy, ...R(Q) });
};
var X1 = class extends f {
  _parse($) {
    if ($.data !== this._def.value) {
      const Q = this._getOrReturnCtx($);
      return M(Q, { received: Q.data, code: w.invalid_literal, expected: this._def.value }), N;
    }
    return { status: "valid", value: $.data };
  }
  get value() {
    return this._def.value;
  }
};
X1.create = ($, Q) => {
  return new X1({ value: $, typeName: L.ZodLiteral, ...R(Q) });
};
var A0 = class extends f {
  _parse($) {
    if (typeof $.data !== "string") {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return M(Q, { expected: S.joinValues(Y), received: Q.parsedType, code: w.invalid_type }), N;
    }
    if (this._def.values.indexOf($.data) === -1) {
      const Q = this._getOrReturnCtx($), Y = this._def.values;
      return M(Q, { received: Q.data, code: w.invalid_enum_value, options: Y }), N;
    }
    return y($.data);
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
    return A0.create($);
  }
  exclude($) {
    return A0.create(this.options.filter((Q) => !$.includes(Q)));
  }
};
A0.create = o6;
var J1 = class extends f {
  _parse($) {
    const Q = S.getValidEnumValues(this._def.values), Y = this._getOrReturnCtx($);
    if (Y.parsedType !== z.string && Y.parsedType !== z.number) {
      const X = S.objectValues(Q);
      return M(Y, { expected: S.joinValues(X), received: Y.parsedType, code: w.invalid_type }), N;
    }
    if (Q.indexOf($.data) === -1) {
      const X = S.objectValues(Q);
      return M(Y, { received: Y.data, code: w.invalid_enum_value, options: X }), N;
    }
    return y($.data);
  }
  get enum() {
    return this._def.values;
  }
};
J1.create = ($, Q) => {
  return new J1({ values: $, typeName: L.ZodNativeEnum, ...R(Q) });
};
var j0 = class extends f {
  unwrap() {
    return this._def.type;
  }
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    if (Q.parsedType !== z.promise && Q.common.async === false)
      return M(Q, { code: w.invalid_type, expected: z.promise, received: Q.parsedType }), N;
    const Y = Q.parsedType === z.promise ? Q.data : Promise.resolve(Q.data);
    return y(Y.then((X) => {
      return this._def.type.parseAsync(X, { path: Q.path, errorMap: Q.common.contextualErrorMap });
    }));
  }
};
j0.create = ($, Q) => {
  return new j0({ type: $, typeName: L.ZodPromise, ...R(Q) });
};
var o = class extends f {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === L.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
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
        return Promise.resolve(W).then((H) => {
          return this._def.schema._parseAsync({ data: H, path: Y.path, parent: Y });
        });
      else
        return this._def.schema._parseSync({ data: W, path: Y.path, parent: Y });
    }
    if (X.type === "refinement") {
      const W = (H) => {
        const q = X.refinement(H, J);
        if (Y.common.async)
          return Promise.resolve(q);
        if (q instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return H;
      };
      if (Y.common.async === false) {
        const H = this._def.schema._parseSync({ data: Y.data, path: Y.path, parent: Y });
        if (H.status === "aborted")
          return N;
        if (H.status === "dirty")
          Q.dirty();
        return W(H.value), { status: Q.value, value: H.value };
      } else
        return this._def.schema._parseAsync({ data: Y.data, path: Y.path, parent: Y }).then((H) => {
          if (H.status === "aborted")
            return N;
          if (H.status === "dirty")
            Q.dirty();
          return W(H.value).then(() => {
            return { status: Q.value, value: H.value };
          });
        });
    }
    if (X.type === "transform")
      if (Y.common.async === false) {
        const W = this._def.schema._parseSync({ data: Y.data, path: Y.path, parent: Y });
        if (!_1(W))
          return W;
        const H = X.transform(W.value, J);
        if (H instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: Q.value, value: H };
      } else
        return this._def.schema._parseAsync({ data: Y.data, path: Y.path, parent: Y }).then((W) => {
          if (!_1(W))
            return W;
          return Promise.resolve(X.transform(W.value, J)).then((H) => ({ status: Q.value, value: H }));
        });
    S.assertNever(X);
  }
};
o.create = ($, Q, Y) => {
  return new o({ schema: $, typeName: L.ZodEffects, effect: Q, ...R(Y) });
};
o.createWithPreprocess = ($, Q, Y) => {
  return new o({ schema: Q, effect: { type: "preprocess", transform: $ }, typeName: L.ZodEffects, ...R(Y) });
};
var B0 = class extends f {
  _parse($) {
    if (this._getType($) === z.undefined)
      return y(void 0);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
B0.create = ($, Q) => {
  return new B0({ innerType: $, typeName: L.ZodOptional, ...R(Q) });
};
var S0 = class extends f {
  _parse($) {
    if (this._getType($) === z.null)
      return y(null);
    return this._def.innerType._parse($);
  }
  unwrap() {
    return this._def.innerType;
  }
};
S0.create = ($, Q) => {
  return new S0({ innerType: $, typeName: L.ZodNullable, ...R(Q) });
};
var W1 = class extends f {
  _parse($) {
    const { ctx: Q } = this._processInputParams($);
    let Y = Q.data;
    if (Q.parsedType === z.undefined)
      Y = this._def.defaultValue();
    return this._def.innerType._parse({ data: Y, path: Q.path, parent: Q });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
W1.create = ($, Q) => {
  return new W1({ innerType: $, typeName: L.ZodDefault, defaultValue: typeof Q.default === "function" ? Q.default : () => Q.default, ...R(Q) });
};
var k1 = class extends f {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = { ...Q, common: { ...Q.common, issues: [] } }, X = this._def.innerType._parse({ data: Y.data, path: Y.path, parent: { ...Y } });
    if (Y$(X))
      return X.then((J) => {
        return { status: "valid", value: J.status === "valid" ? J.value : this._def.catchValue({ get error() {
          return new d(Y.common.issues);
        }, input: Y.data }) };
      });
    else
      return { status: "valid", value: X.status === "valid" ? X.value : this._def.catchValue({ get error() {
        return new d(Y.common.issues);
      }, input: Y.data }) };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
k1.create = ($, Q) => {
  return new k1({ innerType: $, typeName: L.ZodCatch, catchValue: typeof Q.catch === "function" ? Q.catch : () => Q.catch, ...R(Q) });
};
var g1 = class extends f {
  _parse($) {
    if (this._getType($) !== z.nan) {
      const Y = this._getOrReturnCtx($);
      return M(Y, { code: w.invalid_type, expected: z.nan, received: Y.parsedType }), N;
    }
    return { status: "valid", value: $.data };
  }
};
g1.create = ($) => {
  return new g1({ typeName: L.ZodNaN, ...R($) });
};
var p2 = Symbol("zod_brand");
var t$ = class extends f {
  _parse($) {
    const { ctx: Q } = this._processInputParams($), Y = Q.data;
    return this._def.type._parse({ data: Y, path: Q.path, parent: Q });
  }
  unwrap() {
    return this._def.type;
  }
};
var j1 = class extends f {
  _parse($) {
    const { status: Q, ctx: Y } = this._processInputParams($);
    if (Y.common.async)
      return (async () => {
        const J = await this._def.in._parseAsync({ data: Y.data, path: Y.path, parent: Y });
        if (J.status === "aborted")
          return N;
        if (J.status === "dirty")
          return Q.dirty(), d6(J.value);
        else
          return this._def.out._parseAsync({ data: J.value, path: Y.path, parent: Y });
      })();
    else {
      const X = this._def.in._parseSync({ data: Y.data, path: Y.path, parent: Y });
      if (X.status === "aborted")
        return N;
      if (X.status === "dirty")
        return Q.dirty(), { status: "dirty", value: X.value };
      else
        return this._def.out._parseSync({ data: X.value, path: Y.path, parent: Y });
    }
  }
  static create($, Q) {
    return new j1({ in: $, out: Q, typeName: L.ZodPipeline });
  }
};
var b1 = class extends f {
  _parse($) {
    const Q = this._def.innerType._parse($);
    if (_1(Q))
      Q.value = Object.freeze(Q.value);
    return Q;
  }
};
b1.create = ($, Q) => {
  return new b1({ innerType: $, typeName: L.ZodReadonly, ...R(Q) });
};
var r6 = ($, Q = {}, Y) => {
  if ($)
    return g0.create().superRefine((X, J) => {
      var W, H;
      if (!$(X)) {
        const q = typeof Q === "function" ? Q(X) : typeof Q === "string" ? { message: Q } : Q, B = (H = (W = q.fatal) !== null && W !== void 0 ? W : Y) !== null && H !== void 0 ? H : true, G = typeof q === "string" ? { message: q } : q;
        J.addIssue({ code: "custom", ...G, fatal: B });
      }
    });
  return g0.create();
};
var n2 = { object: x.lazycreate };
var L;
(function($) {
  $.ZodString = "ZodString", $.ZodNumber = "ZodNumber", $.ZodNaN = "ZodNaN", $.ZodBigInt = "ZodBigInt", $.ZodBoolean = "ZodBoolean", $.ZodDate = "ZodDate", $.ZodSymbol = "ZodSymbol", $.ZodUndefined = "ZodUndefined", $.ZodNull = "ZodNull", $.ZodAny = "ZodAny", $.ZodUnknown = "ZodUnknown", $.ZodNever = "ZodNever", $.ZodVoid = "ZodVoid", $.ZodArray = "ZodArray", $.ZodObject = "ZodObject", $.ZodUnion = "ZodUnion", $.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", $.ZodIntersection = "ZodIntersection", $.ZodTuple = "ZodTuple", $.ZodRecord = "ZodRecord", $.ZodMap = "ZodMap", $.ZodSet = "ZodSet", $.ZodFunction = "ZodFunction", $.ZodLazy = "ZodLazy", $.ZodLiteral = "ZodLiteral", $.ZodEnum = "ZodEnum", $.ZodEffects = "ZodEffects", $.ZodNativeEnum = "ZodNativeEnum", $.ZodOptional = "ZodOptional", $.ZodNullable = "ZodNullable", $.ZodDefault = "ZodDefault", $.ZodCatch = "ZodCatch", $.ZodPromise = "ZodPromise", $.ZodBranded = "ZodBranded", $.ZodPipeline = "ZodPipeline", $.ZodReadonly = "ZodReadonly";
})(L || (L = {}));
var i2 = ($, Q = { message: `Input not instance of ${$.name}` }) => r6((Y) => Y instanceof $, Q);
var s6 = $0.create;
var a6 = f0.create;
var d2 = g1.create;
var o2 = E0.create;
var t6 = a0.create;
var r2 = k0.create;
var s2 = T1.create;
var a2 = t0.create;
var t2 = e0.create;
var e2 = g0.create;
var $Q = R0.create;
var QQ = G0.create;
var YQ = x1.create;
var XQ = Q0.create;
var JQ = x.create;
var WQ = x.strictCreate;
var HQ = $1.create;
var qQ = X$.create;
var BQ = Q1.create;
var GQ = w0.create;
var wQ = v1.create;
var UQ = Z1.create;
var zQ = b0.create;
var MQ = s0.create;
var VQ = Y1.create;
var OQ = X1.create;
var KQ = A0.create;
var FQ = J1.create;
var LQ = j0.create;
var n6 = o.create;
var DQ = B0.create;
var NQ = S0.create;
var RQ = o.createWithPreprocess;
var fQ = j1.create;
var EQ = () => s6().optional();
var AQ = () => a6().optional();
var SQ = () => t6().optional();
var CQ = { string: ($) => $0.create({ ...$, coerce: true }), number: ($) => f0.create({ ...$, coerce: true }), boolean: ($) => a0.create({ ...$, coerce: true }), bigint: ($) => E0.create({ ...$, coerce: true }), date: ($) => k0.create({ ...$, coerce: true }) };
var IQ = N;
var V = Object.freeze({ __proto__: null, defaultErrorMap: P1, setErrorMap: x2, getErrorMap: $$, makeIssue: Q$, EMPTY_PATH: v2, addIssueToContext: M, ParseStatus: m, INVALID: N, DIRTY: d6, OK: y, isAborted: r$, isDirty: s$, isValid: _1, isAsync: Y$, get util() {
  return S;
}, get objectUtil() {
  return o$;
}, ZodParsedType: z, getParsedType: N0, ZodType: f, ZodString: $0, ZodNumber: f0, ZodBigInt: E0, ZodBoolean: a0, ZodDate: k0, ZodSymbol: T1, ZodUndefined: t0, ZodNull: e0, ZodAny: g0, ZodUnknown: R0, ZodNever: G0, ZodVoid: x1, ZodArray: Q0, ZodObject: x, ZodUnion: $1, ZodDiscriminatedUnion: X$, ZodIntersection: Q1, ZodTuple: w0, ZodRecord: v1, ZodMap: Z1, ZodSet: b0, ZodFunction: s0, ZodLazy: Y1, ZodLiteral: X1, ZodEnum: A0, ZodNativeEnum: J1, ZodPromise: j0, ZodEffects: o, ZodTransformer: o, ZodOptional: B0, ZodNullable: S0, ZodDefault: W1, ZodCatch: k1, ZodNaN: g1, BRAND: p2, ZodBranded: t$, ZodPipeline: j1, ZodReadonly: b1, custom: r6, Schema: f, ZodSchema: f, late: n2, get ZodFirstPartyTypeKind() {
  return L;
}, coerce: CQ, any: e2, array: XQ, bigint: o2, boolean: t6, date: r2, discriminatedUnion: qQ, effect: n6, enum: KQ, function: MQ, instanceof: i2, intersection: BQ, lazy: VQ, literal: OQ, map: UQ, nan: d2, nativeEnum: FQ, never: QQ, null: t2, nullable: NQ, number: a6, object: JQ, oboolean: SQ, onumber: AQ, optional: DQ, ostring: EQ, pipeline: fQ, preprocess: RQ, promise: LQ, record: wQ, set: zQ, strictObject: WQ, string: s6, symbol: s2, transformer: n6, tuple: GQ, undefined: a2, union: HQ, unknown: $Q, void: YQ, NEVER: IQ, ZodIssueCode: w, quotelessJson: T2, ZodError: d });
var e6 = V.object({ email: V.string().email(), img: V.string(), lid: V.string(), name: V.string(), uid: V.number().int(), introduction: V.string().optional(), pid: V.string(), delImg: V.string().optional() });
var J$ = V.object({ email: V.string().email(), img: V.string(), lid: V.string(), name: V.string(), uid: V.number().int(), introduction: V.string().optional() });
var $8 = V.object({ type: V.enum(["uid"]), uid: V.number().int() }).or(V.object({ type: V.enum(["email"]), email: V.string().email() })).or(V.object({ type: V.enum(["pid"]), pid: V.string() }));
var iJ = V.object({ type: V.enum(["uid"]), uid: V.number().int() }).or(V.object({ type: V.enum(["email"]), email: V.string().email() })).or(V.object({ type: V.enum(["pid"]), pid: V.string() }));
var Q8 = V.object({ type: V.enum(["uid"]), uid: V.number().int() }).or(V.object({ type: V.enum(["email"]), email: V.string().email() }));
var h1 = V.object({ type: V.enum(["uid"]), uid: V.number().int().or(V.string().regex(/\d+/g)) }).or(V.object({ type: V.enum(["email"]), email: V.string().email() }));
var e$ = V.object({ type: V.enum(["uid"]), uid: V.number().int(), is: V.number(), pid: V.string() }).or(V.object({ type: V.enum(["email"]), email: V.string().email(), is: V.number(), pid: V.string() }));
var dJ = V.object({ group: V.object({ gid: V.string() }).array(), chat: J$.array() });
var _Q = typeof global == "object" && global && global.Object === Object && global;
var W$ = _Q;
var TQ = typeof self == "object" && self && self.Object === Object && self;
var xQ = W$ || TQ || Function("return this")();
var j = xQ;
var vQ = j.Symbol;
var r = vQ;
var gQ = function($) {
  var Q = ZQ.call($, m1), Y = $[m1];
  try {
    $[m1] = void 0;
    var X = true;
  } catch (W) {
  }
  var J = kQ.call($);
  if (X)
    if (Q)
      $[m1] = Y;
    else
      delete $[m1];
  return J;
};
var Y8 = Object.prototype;
var ZQ = Y8.hasOwnProperty;
var kQ = Y8.toString;
var m1 = r ? r.toStringTag : void 0;
var X8 = gQ;
var hQ = function($) {
  return jQ.call($);
};
var bQ = Object.prototype;
var jQ = bQ.toString;
var J8 = hQ;
var lQ = function($) {
  if ($ == null)
    return $ === void 0 ? yQ : mQ;
  return W8 && W8 in Object($) ? X8($) : J8($);
};
var mQ = "[object Null]";
var yQ = "[object Undefined]";
var W8 = r ? r.toStringTag : void 0;
var p = lQ;
var uQ = function($) {
  return $ != null && typeof $ == "object";
};
var n = uQ;
var pQ = function($) {
  return typeof $ == "symbol" || n($) && p($) == cQ;
};
var cQ = "[object Symbol]";
var C0 = pQ;
var nQ = function($, Q) {
  var Y = -1, X = $ == null ? 0 : $.length, J = Array(X);
  while (++Y < X)
    J[Y] = Q($[Y], Y, $);
  return J;
};
var H8 = nQ;
var iQ = Array.isArray;
var v = iQ;
var G8 = function($) {
  if (typeof $ == "string")
    return $;
  if (v($))
    return H8($, G8) + "";
  if (C0($))
    return B8 ? B8.call($) : "";
  var Q = $ + "";
  return Q == "0" && 1 / $ == -dQ ? "-0" : Q;
};
var dQ = Infinity;
var q8 = r ? r.prototype : void 0;
var B8 = q8 ? q8.toString : void 0;
var w8 = G8;
var rQ = function($) {
  var Q = $.length;
  while (Q-- && oQ.test($.charAt(Q)))
    ;
  return Q;
};
var oQ = /\s/;
var U8 = rQ;
var aQ = function($) {
  return $ ? $.slice(0, U8($) + 1).replace(sQ, "") : $;
};
var sQ = /^\s+/;
var z8 = aQ;
var tQ = function($) {
  var Q = typeof $;
  return $ != null && (Q == "object" || Q == "function");
};
var s = tQ;
var X9 = function($) {
  if (typeof $ == "number")
    return $;
  if (C0($))
    return M8;
  if (s($)) {
    var Q = typeof $.valueOf == "function" ? $.valueOf() : $;
    $ = s(Q) ? Q + "" : Q;
  }
  if (typeof $ != "string")
    return $ === 0 ? $ : +$;
  $ = z8($);
  var Y = $9.test($);
  return Y || Q9.test($) ? Y9($.slice(2), Y ? 2 : 8) : eQ.test($) ? M8 : +$;
};
var M8 = NaN;
var eQ = /^[-+]0x[0-9a-f]+$/i;
var $9 = /^0b[01]+$/i;
var Q9 = /^0o[0-7]+$/i;
var Y9 = parseInt;
var H$ = X9;
var J9 = function($) {
  return $;
};
var q$ = J9;
var G9 = function($) {
  if (!s($))
    return false;
  var Q = p($);
  return Q == H9 || Q == q9 || Q == W9 || Q == B9;
};
var W9 = "[object AsyncFunction]";
var H9 = "[object Function]";
var q9 = "[object GeneratorFunction]";
var B9 = "[object Proxy]";
var B$ = G9;
var w9 = j["__core-js_shared__"];
var G$ = w9;
var U9 = function($) {
  return !!V8 && V8 in $;
};
var V8 = function() {
  var $ = /[^.]+$/.exec(G$ && G$.keys && G$.keys.IE_PROTO || "");
  return $ ? "Symbol(src)_1." + $ : "";
}();
var O8 = U9;
var V9 = function($) {
  if ($ != null) {
    try {
      return M9.call($);
    } catch (Q) {
    }
    try {
      return $ + "";
    } catch (Q) {
    }
  }
  return "";
};
var z9 = Function.prototype;
var M9 = z9.toString;
var O0 = V9;
var f9 = function($) {
  if (!s($) || O8($))
    return false;
  var Q = B$($) ? R9 : K9;
  return Q.test(O0($));
};
var O9 = /[\\^$.*+?()[\]{}|]/g;
var K9 = /^\[object .+?Constructor\]$/;
var F9 = Function.prototype;
var L9 = Object.prototype;
var D9 = F9.toString;
var N9 = L9.hasOwnProperty;
var R9 = RegExp("^" + D9.call(N9).replace(O9, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var K8 = f9;
var E9 = function($, Q) {
  return $ == null ? void 0 : $[Q];
};
var F8 = E9;
var A9 = function($, Q) {
  var Y = F8($, Q);
  return K8(Y) ? Y : void 0;
};
var a = A9;
var S9 = a(j, "WeakMap");
var w$ = S9;
var C9 = function($, Q) {
  var Y = -1, X = $ == null ? 0 : $.length;
  while (++Y < X)
    if (Q($[Y], Y, $) === false)
      break;
  return $;
};
var L8 = C9;
var _9 = function($, Q) {
  var Y = typeof $;
  return Q = Q == null ? I9 : Q, !!Q && (Y == "number" || Y != "symbol" && P9.test($)) && ($ > -1 && $ % 1 == 0 && $ < Q);
};
var I9 = 9007199254740991;
var P9 = /^(?:0|[1-9]\d*)$/;
var H1 = _9;
var T9 = function($, Q) {
  return $ === Q || $ !== $ && Q !== Q;
};
var U$ = T9;
var v9 = function($) {
  return typeof $ == "number" && $ > -1 && $ % 1 == 0 && $ <= x9;
};
var x9 = 9007199254740991;
var q1 = v9;
var Z9 = function($) {
  return $ != null && q1($.length) && !B$($);
};
var B1 = Z9;
var g9 = function($) {
  var Q = $ && $.constructor, Y = typeof Q == "function" && Q.prototype || k9;
  return $ === Y;
};
var k9 = Object.prototype;
var z$ = g9;
var b9 = function($, Q) {
  var Y = -1, X = Array($);
  while (++Y < $)
    X[Y] = Q(Y);
  return X;
};
var D8 = b9;
var h9 = function($) {
  return n($) && p($) == j9;
};
var j9 = "[object Arguments]";
var $6 = h9;
var N8 = Object.prototype;
var m9 = N8.hasOwnProperty;
var y9 = N8.propertyIsEnumerable;
var l9 = $6(function() {
  return arguments;
}()) ? $6 : function($) {
  return n($) && m9.call($, "callee") && !y9.call($, "callee");
};
var G1 = l9;
var V$ = {};
T$(V$, { default: () => {
  {
    return I0;
  }
} });
var u9 = function() {
  return false;
};
var R8 = u9;
var A8 = typeof V$ == "object" && V$ && !V$.nodeType && V$;
var f8 = A8 && typeof M$ == "object" && M$ && !M$.nodeType && M$;
var c9 = f8 && f8.exports === A8;
var E8 = c9 ? j.Buffer : void 0;
var p9 = E8 ? E8.isBuffer : void 0;
var n9 = p9 || R8;
var I0 = n9;
var K5 = function($) {
  return n($) && q1($.length) && !!P[p($)];
};
var i9 = "[object Arguments]";
var d9 = "[object Array]";
var o9 = "[object Boolean]";
var r9 = "[object Date]";
var s9 = "[object Error]";
var a9 = "[object Function]";
var t9 = "[object Map]";
var e9 = "[object Number]";
var $5 = "[object Object]";
var Q5 = "[object RegExp]";
var Y5 = "[object Set]";
var X5 = "[object String]";
var J5 = "[object WeakMap]";
var W5 = "[object ArrayBuffer]";
var H5 = "[object DataView]";
var q5 = "[object Float32Array]";
var B5 = "[object Float64Array]";
var G5 = "[object Int8Array]";
var w5 = "[object Int16Array]";
var U5 = "[object Int32Array]";
var z5 = "[object Uint8Array]";
var M5 = "[object Uint8ClampedArray]";
var V5 = "[object Uint16Array]";
var O5 = "[object Uint32Array]";
var P = {};
P[q5] = P[B5] = P[G5] = P[w5] = P[U5] = P[z5] = P[M5] = P[V5] = P[O5] = true;
P[i9] = P[d9] = P[W5] = P[o9] = P[H5] = P[r9] = P[s9] = P[a9] = P[t9] = P[e9] = P[$5] = P[Q5] = P[Y5] = P[X5] = P[J5] = false;
var S8 = K5;
var F5 = function($) {
  return function(Q) {
    return $(Q);
  };
};
var C8 = F5;
var K$ = {};
T$(K$, { default: () => {
  {
    return F$;
  }
} });
var I8 = typeof K$ == "object" && K$ && !K$.nodeType && K$;
var y1 = I8 && typeof O$ == "object" && O$ && !O$.nodeType && O$;
var L5 = y1 && y1.exports === I8;
var Q6 = L5 && W$.process;
var D5 = function() {
  try {
    var $ = y1 && y1.require && y1.require("util").types;
    if ($)
      return $;
    return Q6 && Q6.binding && Q6.binding("util");
  } catch (Q) {
  }
}();
var F$ = D5;
var P8 = F$ && F$.isTypedArray;
var N5 = P8 ? C8(P8) : S8;
var w1 = N5;
var E5 = function($, Q) {
  var Y = v($), X = !Y && G1($), J = !Y && !X && I0($), W = !Y && !X && !J && w1($), H = Y || X || J || W, q = H ? D8($.length, String) : [], B = q.length;
  for (var G in $)
    if ((Q || f5.call($, G)) && !(H && (G == "length" || J && (G == "offset" || G == "parent") || W && (G == "buffer" || G == "byteLength" || G == "byteOffset") || H1(G, B))))
      q.push(G);
  return q;
};
var R5 = Object.prototype;
var f5 = R5.hasOwnProperty;
var _8 = E5;
var A5 = function($, Q) {
  return function(Y) {
    return $(Q(Y));
  };
};
var T8 = A5;
var S5 = T8(Object.keys, Object);
var x8 = S5;
var P5 = function($) {
  if (!z$($))
    return x8($);
  var Q = [];
  for (var Y in Object($))
    if (I5.call($, Y) && Y != "constructor")
      Q.push(Y);
  return Q;
};
var C5 = Object.prototype;
var I5 = C5.hasOwnProperty;
var L$ = P5;
var _5 = function($) {
  return B1($) ? _8($) : L$($);
};
var U1 = _5;
var v5 = function($, Q) {
  if (v($))
    return false;
  var Y = typeof $;
  if (Y == "number" || Y == "symbol" || Y == "boolean" || $ == null || C0($))
    return true;
  return x5.test($) || !T5.test($) || Q != null && $ in Object(Q);
};
var T5 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var x5 = /^\w*$/;
var z1 = v5;
var Z5 = a(Object, "create");
var K0 = Z5;
var k5 = function() {
  this.__data__ = K0 ? K0(null) : {}, this.size = 0;
};
var v8 = k5;
var g5 = function($) {
  var Q = this.has($) && delete this.__data__[$];
  return this.size -= Q ? 1 : 0, Q;
};
var Z8 = g5;
var m5 = function($) {
  var Q = this.__data__;
  if (K0) {
    var Y = Q[$];
    return Y === b5 ? void 0 : Y;
  }
  return h5.call(Q, $) ? Q[$] : void 0;
};
var b5 = "__lodash_hash_undefined__";
var j5 = Object.prototype;
var h5 = j5.hasOwnProperty;
var k8 = m5;
var u5 = function($) {
  var Q = this.__data__;
  return K0 ? Q[$] !== void 0 : l5.call(Q, $);
};
var y5 = Object.prototype;
var l5 = y5.hasOwnProperty;
var g8 = u5;
var p5 = function($, Q) {
  var Y = this.__data__;
  return this.size += this.has($) ? 0 : 1, Y[$] = K0 && Q === void 0 ? c5 : Q, this;
};
var c5 = "__lodash_hash_undefined__";
var b8 = p5;
var M1 = function($) {
  var Q = -1, Y = $ == null ? 0 : $.length;
  this.clear();
  while (++Q < Y) {
    var X = $[Q];
    this.set(X[0], X[1]);
  }
};
M1.prototype.clear = v8;
M1.prototype.delete = Z8;
M1.prototype.get = k8;
M1.prototype.has = g8;
M1.prototype.set = b8;
var Y6 = M1;
var n5 = function() {
  this.__data__ = [], this.size = 0;
};
var j8 = n5;
var i5 = function($, Q) {
  var Y = $.length;
  while (Y--)
    if (U$($[Y][0], Q))
      return Y;
  return -1;
};
var P0 = i5;
var r5 = function($) {
  var Q = this.__data__, Y = P0(Q, $);
  if (Y < 0)
    return false;
  var X = Q.length - 1;
  if (Y == X)
    Q.pop();
  else
    o5.call(Q, Y, 1);
  return --this.size, true;
};
var d5 = Array.prototype;
var o5 = d5.splice;
var h8 = r5;
var s5 = function($) {
  var Q = this.__data__, Y = P0(Q, $);
  return Y < 0 ? void 0 : Q[Y][1];
};
var m8 = s5;
var a5 = function($) {
  return P0(this.__data__, $) > -1;
};
var y8 = a5;
var t5 = function($, Q) {
  var Y = this.__data__, X = P0(Y, $);
  if (X < 0)
    ++this.size, Y.push([$, Q]);
  else
    Y[X][1] = Q;
  return this;
};
var l8 = t5;
var V1 = function($) {
  var Q = -1, Y = $ == null ? 0 : $.length;
  this.clear();
  while (++Q < Y) {
    var X = $[Q];
    this.set(X[0], X[1]);
  }
};
V1.prototype.clear = j8;
V1.prototype.delete = h8;
V1.prototype.get = m8;
V1.prototype.has = y8;
V1.prototype.set = l8;
var _0 = V1;
var e5 = a(j, "Map");
var T0 = e5;
var $Y = function() {
  this.size = 0, this.__data__ = { hash: new Y6(), map: new (T0 || _0)(), string: new Y6() };
};
var u8 = $Y;
var QY = function($) {
  var Q = typeof $;
  return Q == "string" || Q == "number" || Q == "symbol" || Q == "boolean" ? $ !== "__proto__" : $ === null;
};
var c8 = QY;
var YY = function($, Q) {
  var Y = $.__data__;
  return c8(Q) ? Y[typeof Q == "string" ? "string" : "hash"] : Y.map;
};
var x0 = YY;
var XY = function($) {
  var Q = x0(this, $).delete($);
  return this.size -= Q ? 1 : 0, Q;
};
var p8 = XY;
var JY = function($) {
  return x0(this, $).get($);
};
var n8 = JY;
var WY = function($) {
  return x0(this, $).has($);
};
var i8 = WY;
var HY = function($, Q) {
  var Y = x0(this, $), X = Y.size;
  return Y.set($, Q), this.size += Y.size == X ? 0 : 1, this;
};
var d8 = HY;
var O1 = function($) {
  var Q = -1, Y = $ == null ? 0 : $.length;
  this.clear();
  while (++Q < Y) {
    var X = $[Q];
    this.set(X[0], X[1]);
  }
};
O1.prototype.clear = u8;
O1.prototype.delete = p8;
O1.prototype.get = n8;
O1.prototype.has = i8;
O1.prototype.set = d8;
var h0 = O1;
var X6 = function($, Q) {
  if (typeof $ != "function" || Q != null && typeof Q != "function")
    throw new TypeError(qY);
  var Y = function() {
    var X = arguments, J = Q ? Q.apply(this, X) : X[0], W = Y.cache;
    if (W.has(J))
      return W.get(J);
    var H = $.apply(this, X);
    return Y.cache = W.set(J, H) || W, H;
  };
  return Y.cache = new (X6.Cache || h0)(), Y;
};
var qY = "Expected a function";
X6.Cache = h0;
var o8 = X6;
var GY = function($) {
  var Q = o8($, function(X) {
    if (Y.size === BY)
      Y.clear();
    return X;
  }), Y = Q.cache;
  return Q;
};
var BY = 500;
var r8 = GY;
var wY = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var UY = /\\(\\)?/g;
var zY = r8(function($) {
  var Q = [];
  if ($.charCodeAt(0) === 46)
    Q.push("");
  return $.replace(wY, function(Y, X, J, W) {
    Q.push(J ? W.replace(UY, "$1") : X || Y);
  }), Q;
});
var s8 = zY;
var MY = function($) {
  return $ == null ? "" : w8($);
};
var a8 = MY;
var VY = function($, Q) {
  if (v($))
    return $;
  return z1($, Q) ? [$] : s8(a8($));
};
var K1 = VY;
var KY = function($) {
  if (typeof $ == "string" || C0($))
    return $;
  var Q = $ + "";
  return Q == "0" && 1 / $ == -OY ? "-0" : Q;
};
var OY = Infinity;
var U0 = KY;
var FY = function($, Q) {
  Q = K1(Q, $);
  var Y = 0, X = Q.length;
  while ($ != null && Y < X)
    $ = $[U0(Q[Y++])];
  return Y && Y == X ? $ : void 0;
};
var F1 = FY;
var LY = function($, Q, Y) {
  var X = $ == null ? void 0 : F1($, Q);
  return X === void 0 ? Y : X;
};
var t8 = LY;
var DY = function($, Q) {
  var Y = -1, X = Q.length, J = $.length;
  while (++Y < X)
    $[J + Y] = Q[Y];
  return $;
};
var e8 = DY;
var NY = function($, Q, Y) {
  var X = -1, J = $.length;
  if (Q < 0)
    Q = -Q > J ? 0 : J + Q;
  if (Y = Y > J ? J : Y, Y < 0)
    Y += J;
  J = Q > Y ? 0 : Y - Q >>> 0, Q >>>= 0;
  var W = Array(J);
  while (++X < J)
    W[X] = $[X + Q];
  return W;
};
var $4 = NY;
var RY = function() {
  this.__data__ = new _0(), this.size = 0;
};
var Q4 = RY;
var fY = function($) {
  var Q = this.__data__, Y = Q.delete($);
  return this.size = Q.size, Y;
};
var Y4 = fY;
var EY = function($) {
  return this.__data__.get($);
};
var X4 = EY;
var AY = function($) {
  return this.__data__.has($);
};
var J4 = AY;
var CY = function($, Q) {
  var Y = this.__data__;
  if (Y instanceof _0) {
    var X = Y.__data__;
    if (!T0 || X.length < SY - 1)
      return X.push([$, Q]), this.size = ++Y.size, this;
    Y = this.__data__ = new h0(X);
  }
  return Y.set($, Q), this.size = Y.size, this;
};
var SY = 200;
var W4 = CY;
var L1 = function($) {
  var Q = this.__data__ = new _0($);
  this.size = Q.size;
};
L1.prototype.clear = Q4;
L1.prototype.delete = Y4;
L1.prototype.get = X4;
L1.prototype.has = J4;
L1.prototype.set = W4;
var D1 = L1;
var IY = function($, Q) {
  var Y = -1, X = $ == null ? 0 : $.length, J = 0, W = [];
  while (++Y < X) {
    var H = $[Y];
    if (Q(H, Y, $))
      W[J++] = H;
  }
  return W;
};
var H4 = IY;
var PY = function() {
  return [];
};
var q4 = PY;
var _Y = Object.prototype;
var TY = _Y.propertyIsEnumerable;
var B4 = Object.getOwnPropertySymbols;
var xY = !B4 ? q4 : function($) {
  if ($ == null)
    return [];
  return $ = Object($), H4(B4($), function(Q) {
    return TY.call($, Q);
  });
};
var G4 = xY;
var vY = function($, Q, Y) {
  var X = Q($);
  return v($) ? X : e8(X, Y($));
};
var w4 = vY;
var ZY = function($) {
  return w4($, U1, G4);
};
var J6 = ZY;
var kY = a(j, "DataView");
var D$ = kY;
var gY = a(j, "Promise");
var N$ = gY;
var bY = a(j, "Set");
var R$ = bY;
var U4 = "[object Map]";
var jY = "[object Object]";
var z4 = "[object Promise]";
var M4 = "[object Set]";
var V4 = "[object WeakMap]";
var O4 = "[object DataView]";
var hY = O0(D$);
var mY = O0(T0);
var yY = O0(N$);
var lY = O0(R$);
var uY = O0(w$);
var m0 = p;
if (D$ && m0(new D$(new ArrayBuffer(1))) != O4 || T0 && m0(new T0()) != U4 || N$ && m0(N$.resolve()) != z4 || R$ && m0(new R$()) != M4 || w$ && m0(new w$()) != V4)
  m0 = function($) {
    var Q = p($), Y = Q == jY ? $.constructor : void 0, X = Y ? O0(Y) : "";
    if (X)
      switch (X) {
        case hY:
          return O4;
        case mY:
          return U4;
        case yY:
          return z4;
        case lY:
          return M4;
        case uY:
          return V4;
      }
    return Q;
  };
var l1 = m0;
var cY = j.Uint8Array;
var W6 = cY;
var nY = function($) {
  return this.__data__.set($, pY), this;
};
var pY = "__lodash_hash_undefined__";
var K4 = nY;
var iY = function($) {
  return this.__data__.has($);
};
var F4 = iY;
var f$ = function($) {
  var Q = -1, Y = $ == null ? 0 : $.length;
  this.__data__ = new h0();
  while (++Q < Y)
    this.add($[Q]);
};
f$.prototype.add = f$.prototype.push = K4;
f$.prototype.has = F4;
var L4 = f$;
var dY = function($, Q) {
  var Y = -1, X = $ == null ? 0 : $.length;
  while (++Y < X)
    if (Q($[Y], Y, $))
      return true;
  return false;
};
var D4 = dY;
var oY = function($, Q) {
  return $.has(Q);
};
var N4 = oY;
var aY = function($, Q, Y, X, J, W) {
  var H = Y & rY, q = $.length, B = Q.length;
  if (q != B && !(H && B > q))
    return false;
  var G = W.get($), U = W.get(Q);
  if (G && U)
    return G == Q && U == $;
  var O = -1, D = true, T = Y & sY ? new L4() : void 0;
  W.set($, Q), W.set(Q, $);
  while (++O < q) {
    var E = $[O], I = Q[O];
    if (X)
      var k = H ? X(I, E, O, Q, $, W) : X(E, I, O, $, Q, W);
    if (k !== void 0) {
      if (k)
        continue;
      D = false;
      break;
    }
    if (T) {
      if (!D4(Q, function(u, c) {
        if (!N4(T, c) && (E === u || J(E, u, Y, X, W)))
          return T.push(c);
      })) {
        D = false;
        break;
      }
    } else if (!(E === I || J(E, I, Y, X, W))) {
      D = false;
      break;
    }
  }
  return W.delete($), W.delete(Q), D;
};
var rY = 1;
var sY = 2;
var E$ = aY;
var tY = function($) {
  var Q = -1, Y = Array($.size);
  return $.forEach(function(X, J) {
    Y[++Q] = [J, X];
  }), Y;
};
var R4 = tY;
var eY = function($) {
  var Q = -1, Y = Array($.size);
  return $.forEach(function(X) {
    Y[++Q] = X;
  }), Y;
};
var f4 = eY;
var M7 = function($, Q, Y, X, J, W, H) {
  switch (Y) {
    case z7:
      if ($.byteLength != Q.byteLength || $.byteOffset != Q.byteOffset)
        return false;
      $ = $.buffer, Q = Q.buffer;
    case U7:
      if ($.byteLength != Q.byteLength || !W(new W6($), new W6(Q)))
        return false;
      return true;
    case Y7:
    case X7:
    case H7:
      return U$(+$, +Q);
    case J7:
      return $.name == Q.name && $.message == Q.message;
    case q7:
    case G7:
      return $ == Q + "";
    case W7:
      var q = R4;
    case B7:
      var B = X & $7;
      if (q || (q = f4), $.size != Q.size && !B)
        return false;
      var G = H.get($);
      if (G)
        return G == Q;
      X |= Q7, H.set($, Q);
      var U = E$(q($), q(Q), X, J, W, H);
      return H.delete($), U;
    case w7:
      if (H6)
        return H6.call($) == H6.call(Q);
  }
  return false;
};
var $7 = 1;
var Q7 = 2;
var Y7 = "[object Boolean]";
var X7 = "[object Date]";
var J7 = "[object Error]";
var W7 = "[object Map]";
var H7 = "[object Number]";
var q7 = "[object RegExp]";
var B7 = "[object Set]";
var G7 = "[object String]";
var w7 = "[object Symbol]";
var U7 = "[object ArrayBuffer]";
var z7 = "[object DataView]";
var E4 = r ? r.prototype : void 0;
var H6 = E4 ? E4.valueOf : void 0;
var A4 = M7;
var F7 = function($, Q, Y, X, J, W) {
  var H = Y & V7, q = J6($), B = q.length, G = J6(Q), U = G.length;
  if (B != U && !H)
    return false;
  var O = B;
  while (O--) {
    var D = q[O];
    if (!(H ? D in Q : K7.call(Q, D)))
      return false;
  }
  var T = W.get($), E = W.get(Q);
  if (T && E)
    return T == Q && E == $;
  var I = true;
  W.set($, Q), W.set(Q, $);
  var k = H;
  while (++O < B) {
    D = q[O];
    var u = $[D], c = Q[D];
    if (X)
      var t = H ? X(c, u, D, Q, $, W) : X(u, c, D, $, Q, W);
    if (!(t === void 0 ? u === c || J(u, c, Y, X, W) : t)) {
      I = false;
      break;
    }
    k || (k = D == "constructor");
  }
  if (I && !k) {
    var M0 = $.constructor, Z0 = Q.constructor;
    if (M0 != Z0 && ("constructor" in $ && "constructor" in Q) && !(typeof M0 == "function" && M0 instanceof M0 && typeof Z0 == "function" && Z0 instanceof Z0))
      I = false;
  }
  return W.delete($), W.delete(Q), I;
};
var V7 = 1;
var O7 = Object.prototype;
var K7 = O7.hasOwnProperty;
var S4 = F7;
var N7 = function($, Q, Y, X, J, W) {
  var H = v($), q = v(Q), B = H ? I4 : l1($), G = q ? I4 : l1(Q);
  B = B == C4 ? A$ : B, G = G == C4 ? A$ : G;
  var U = B == A$, O = G == A$, D = B == G;
  if (D && I0($)) {
    if (!I0(Q))
      return false;
    H = true, U = false;
  }
  if (D && !U)
    return W || (W = new D1()), H || w1($) ? E$($, Q, Y, X, J, W) : A4($, Q, B, Y, X, J, W);
  if (!(Y & L7)) {
    var T = U && P4.call($, "__wrapped__"), E = O && P4.call(Q, "__wrapped__");
    if (T || E) {
      var I = T ? $.value() : $, k = E ? Q.value() : Q;
      return W || (W = new D1()), J(I, k, Y, X, W);
    }
  }
  if (!D)
    return false;
  return W || (W = new D1()), S4($, Q, Y, X, J, W);
};
var L7 = 1;
var C4 = "[object Arguments]";
var I4 = "[object Array]";
var A$ = "[object Object]";
var D7 = Object.prototype;
var P4 = D7.hasOwnProperty;
var _4 = N7;
var T4 = function($, Q, Y, X, J) {
  if ($ === Q)
    return true;
  if ($ == null || Q == null || !n($) && !n(Q))
    return $ !== $ && Q !== Q;
  return _4($, Q, Y, X, T4, J);
};
var S$ = T4;
var E7 = function($, Q, Y, X) {
  var J = Y.length, W = J, H = !X;
  if ($ == null)
    return !W;
  $ = Object($);
  while (J--) {
    var q = Y[J];
    if (H && q[2] ? q[1] !== $[q[0]] : !(q[0] in $))
      return false;
  }
  while (++J < W) {
    q = Y[J];
    var B = q[0], G = $[B], U = q[1];
    if (H && q[2]) {
      if (G === void 0 && !(B in $))
        return false;
    } else {
      var O = new D1();
      if (X)
        var D = X(G, U, B, $, Q, O);
      if (!(D === void 0 ? S$(U, G, R7 | f7, X, O) : D))
        return false;
    }
  }
  return true;
};
var R7 = 1;
var f7 = 2;
var x4 = E7;
var A7 = function($) {
  return $ === $ && !s($);
};
var C$ = A7;
var S7 = function($) {
  var Q = U1($), Y = Q.length;
  while (Y--) {
    var X = Q[Y], J = $[X];
    Q[Y] = [X, J, C$(J)];
  }
  return Q;
};
var v4 = S7;
var C7 = function($, Q) {
  return function(Y) {
    if (Y == null)
      return false;
    return Y[$] === Q && (Q !== void 0 || $ in Object(Y));
  };
};
var I$ = C7;
var I7 = function($) {
  var Q = v4($);
  if (Q.length == 1 && Q[0][2])
    return I$(Q[0][0], Q[0][1]);
  return function(Y) {
    return Y === $ || x4(Y, $, Q);
  };
};
var Z4 = I7;
var P7 = function($, Q) {
  return $ != null && Q in Object($);
};
var k4 = P7;
var _7 = function($, Q, Y) {
  Q = K1(Q, $);
  var X = -1, J = Q.length, W = false;
  while (++X < J) {
    var H = U0(Q[X]);
    if (!(W = $ != null && Y($, H)))
      break;
    $ = $[H];
  }
  if (W || ++X != J)
    return W;
  return J = $ == null ? 0 : $.length, !!J && q1(J) && H1(H, J) && (v($) || G1($));
};
var g4 = _7;
var T7 = function($, Q) {
  return $ != null && g4($, Q, k4);
};
var b4 = T7;
var Z7 = function($, Q) {
  if (z1($) && C$(Q))
    return I$(U0($), Q);
  return function(Y) {
    var X = t8(Y, $);
    return X === void 0 && X === Q ? b4(Y, $) : S$(Q, X, x7 | v7);
  };
};
var x7 = 1;
var v7 = 2;
var j4 = Z7;
var k7 = function($) {
  return function(Q) {
    return Q == null ? void 0 : Q[$];
  };
};
var h4 = k7;
var g7 = function($) {
  return function(Q) {
    return F1(Q, $);
  };
};
var m4 = g7;
var b7 = function($) {
  return z1($) ? h4(U0($)) : m4($);
};
var y4 = b7;
var j7 = function($) {
  if (typeof $ == "function")
    return $;
  if ($ == null)
    return q$;
  if (typeof $ == "object")
    return v($) ? j4($[0], $[1]) : Z4($);
  return y4($);
};
var l4 = j7;
var h7 = function($) {
  return function(Q, Y, X) {
    var J = -1, W = Object(Q), H = X(Q), q = H.length;
    while (q--) {
      var B = H[$ ? q : ++J];
      if (Y(W[B], B, W) === false)
        break;
    }
    return Q;
  };
};
var u4 = h7;
var m7 = u4();
var c4 = m7;
var y7 = function($, Q) {
  return $ && c4($, Q, U1);
};
var p4 = y7;
var l7 = function($, Q) {
  return function(Y, X) {
    if (Y == null)
      return Y;
    if (!B1(Y))
      return $(Y, X);
    var J = Y.length, W = Q ? J : -1, H = Object(Y);
    while (Q ? W-- : ++W < J)
      if (X(H[W], W, H) === false)
        break;
    return Y;
  };
};
var n4 = l7;
var u7 = n4(p4);
var i4 = u7;
var c7 = function($) {
  var Q = $ == null ? 0 : $.length;
  return Q ? $[Q - 1] : void 0;
};
var d4 = c7;
var p7 = function($) {
  return typeof $ == "function" ? $ : q$;
};
var o4 = p7;
var n7 = function($, Q) {
  var Y = v($) ? L8 : i4;
  return Y($, o4(Q));
};
var q6 = n7;
var d7 = function($) {
  return typeof $ == "string" || !v($) && n($) && p($) == i7;
};
var i7 = "[object String]";
var P$ = d7;
var o7 = function($, Q) {
  return Q.length < 2 ? $ : F1($, $4(Q, 0, -1));
};
var r4 = o7;
var e7 = function($) {
  if ($ == null)
    return true;
  if (B1($) && (v($) || typeof $ == "string" || typeof $.splice == "function" || I0($) || w1($) || G1($)))
    return !$.length;
  var Q = l1($);
  if (Q == r7 || Q == s7)
    return !$.size;
  if (z$($))
    return !L$($).length;
  for (var Y in $)
    if (t7.call($, Y))
      return false;
  return true;
};
var r7 = "[object Map]";
var s7 = "[object Set]";
var a7 = Object.prototype;
var t7 = a7.hasOwnProperty;
var u1 = e7;
var $X = function($, Q) {
  return Q = K1(Q, $), $ = r4($, Q), $ == null || delete $[U0(d4(Q))];
};
var s4 = $X;
var XX = function($, Q) {
  var Y = $ ? Q.length : 0, X = Y - 1;
  while (Y--) {
    var J = Q[Y];
    if (Y == X || J !== W) {
      var W = J;
      if (H1(J))
        YX.call($, J, 1);
      else
        s4($, J);
    }
  }
  return $;
};
var QX = Array.prototype;
var YX = QX.splice;
var a4 = XX;
var JX = function($, Q) {
  var Y = [];
  if (!($ && $.length))
    return Y;
  var X = -1, J = [], W = $.length;
  Q = l4(Q, 3);
  while (++X < W) {
    var H = $[X];
    if (Q(H, X, $))
      Y.push(H), J.push(X);
  }
  return a4($, J), Y;
};
var N1 = JX;
var l = { header: {} };
async function F0($) {
  const Q = await X0({ tag: $.toString(), action: "get" });
  if (Q[$] == "null" && Q[$] == null)
    return null;
  if (s(Q[$]))
    return Q[$];
  return JSON.parse(Q[$]);
}
var X0 = async ($) => {
  $ = { ...$, user: "p2psaing", secret: "59c44c2f" };
  const Q = new FormData();
  for (let X in $)
    Q.set(X, P$($[X]) ? $[X] : JSON.stringify($[X]));
  const Y = new Headers();
  q6({ Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", "Accept-Encoding": "gzip, deflate, br, zstd", "Accept-Language": "zh-CN,zh;q=0.9", "Cache-Control": "max-age=0", Host: "localhost:8787", "Sec-Ch-Ua": '"Chromium";v="1", "Not(A:Brand";v="1", "Google Chrome";v="1"', "Sec-Ch-Ua-Mobile": "?0", "Sec-Ch-Ua-Platform": '"macOS"', "Sec-Fetch-Dest": "document", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Site": "none", "Sec-Fetch-User": "?1", "Upgrade-Insecure-Requests": "1", "User-Agent": "Mozilla/5.0 (Macintosh; IBM Mac OS X 1_0_0) AppleWebKit/1.0 (KHTML, like Gecko) Chrome/1.0.0.0 Safari/1.0" }, (X, J) => Y.set(J, X));
  try {
    return await (await fetch("https://tinywebdb.appinventor.space/api", { method: "POST", headers: Y, body: Q, redirect: "follow" })).json();
  } catch (X) {
    console.log("err:", X);
  }
};
var t4 = async () => (await X0({ action: "count" })).count;
var WX = async ($) => await X0({ action: "delete", tag: $ });
var y0 = async ($) => await F0(`${$}.value`);
var R1 = async ($) => await F0(`${$}.value`);
var e4 = async ($) => await F0(`${$}.time`);
var $2 = async ($) => await F0(`${$}.time`);
var Q2 = async ($, Q) => await WX(`${$}.store.${Q}`);
var i = async ($, Q) => await F0(`${$}.store.${Q}`);
var z0 = async ($, Q, Y) => {
  if (P$($))
    var X = await R1($);
  else
    var X = await y0($);
  await X0({ action: "update", tag: `${X.email}.store.${Q}`, value: Y }), await X0({ action: "update", tag: `${X.uid}.store.${Q}`, value: Y });
};
async function Y2($) {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (q0(Q, $8))
    try {
      switch (Q.type) {
        case "uid":
          return b($, await y0(Q.uid));
        case "email":
          return b($, await R1(Q.email));
        case "pid":
          return b($, await F0(Q.pid));
      }
    } catch (Y) {
      return C($, Y, A.FailCode.server, 500);
    }
  return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 406);
}
var v0;
(function(f1) {
  f1.payload = { sub: "p2psaing", role: "wenxig", alg: "HS512" }, f1.secret = "vhbuioy78a32et6r7drtxfcyutfdresxyrtuyfdresxdfcgtyfui7uihfip239u0hjfaf2hf89h29fniune2iuf", f1.value = "";
})(v0 || (v0 = {}));
v0.value = await c6(v0.payload, v0.secret, v0.payload.alg);
var J0 = new p$();
J0.get("/jwt", ($) => b($, v0.value));
J0.use("/user/*", async ($, Q) => {
  const Y = l.header = $.req.header(), X = V.string().safeParse(Y.authorization);
  if (X.success && await u6(X.data, v0.secret, "HS512"))
    return Q();
  return C($, "\u8BA4\u8BC1\u9519\u8BEF", A.FailCode.unauthorization, 401);
});
J0.post("/user", Y2).put(async ($) => {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (!q0(Q, e6))
    return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 200);
  try {
    await X0({ tag: Q.pid, value: Q, action: "update" }), await X0({ tag: `${Q.uid}.value`, value: J$.parse(Q), action: "update" }), await X0({ tag: `${Q.email}.value`, value: J$.parse(Q), action: "update" });
    const Y = (/* @__PURE__ */ new Date()).getTime();
    return await X0({ tag: `${Q.uid}.time`, value: Y, action: "update" }), await X0({ tag: `${Q.email}.time`, value: Y, action: "update" }), b($, Y);
  } catch (Y) {
    return console.error(Y), C($, Y, A.FailCode.server, 500);
  }
});
J0.post("/user/has", async ($) => {
  const Q = await Y2($), Y = await Q.json();
  if (Y.code == A.Code.success)
    return b($, !u1(Y.data));
  return $.json(Y, Q.status);
});
var X2 = async ($) => {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (q0(Q, h1))
    try {
      if (Q.type == "uid") {
        var Y = await i(Q.uid, "add.address");
        N1(Y.chat, { uid: H$(Q.uid) }), await z0(Q.uid, "add.address", JSON.stringify(Y));
      } else {
        var Y = await i(Q.email, "add.address");
        N1(Y.chat, { email: Q.email }), await z0(Q.email, "add.address", JSON.stringify(Y));
      }
      return b($, Y);
    } catch (X) {
      return C($, X, A.FailCode.server, 500);
    }
  return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 406);
};
J0.post("/user/address/add-list", async ($) => {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (q0(Q, h1))
    try {
      if (Q.type == "uid")
        return b($, await i(Q.uid, "add.address") || { group: [], chat: [] });
      else
        return b($, await i(Q.email, "add.address") || { group: [], chat: [] });
    } catch (Y) {
      return C($, Y, A.FailCode.server, 500);
    }
  return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 406);
}).patch(async ($) => {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (q0(Q, e$))
    try {
      if (!await F0(Q.pid) || !(Q.type == "email" ? !await R1(Q.email) : await y0(Q.uid)))
        return C($, "\u7528\u6237\u4E0D\u5B58\u5728", A.FailCode.notFound, 404);
      const Y = JSON.parse(await i(Q.uid || Q.email, "add.address") || JSON.stringify({ group: [], chat: [] })), X = await y0(Q.is);
      if (Y.chat.push(X), Q.type == "uid")
        await z0(Q.uid, "add.address", JSON.stringify(Y));
      else
        await z0(Q.email, "add.address", JSON.stringify(Y));
      return b($, Y);
    } catch (Y) {
      return C($, Y, A.FailCode.server, 500);
    }
  return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 406);
}).delete(X2);
J0.post("/user/address", async ($) => {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (q0(Q, h1))
    try {
      if (Q.type == "uid")
        return b($, await i(Q.uid, "address") || { group: [], chat: [] });
      else
        return b($, await i(Q.email, "address") || { group: [], chat: [] });
    } catch (Y) {
      return C($, Y, A.FailCode.server, 500);
    }
  return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 406);
}).patch(async ($) => {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (q0(Q, e$))
    try {
      if (!await F0(Q.pid) || !(Q.type == "email" ? !await R1(Q.email) : await y0(Q.uid)))
        return C($, "\u7528\u6237\u4E0D\u5B58\u5728", A.FailCode.notFound, 404);
      if (Q.type == "uid") {
        var Y = JSON.parse(await i(Q.uid, "address") || JSON.stringify({ chat: [], group: [] }));
        const X = await y0(Q.uid);
        if (u1(X))
          return C($, "\u7528\u6237\u672A\u627E\u5230", A.FailCode.notFound, 404);
        Y.chat.push(X), await z0(Q.uid, "address", JSON.stringify(Y));
      } else {
        var Y = JSON.parse(await i(Q.email, "address") || JSON.stringify({ chat: [], group: [] }));
        const J = await R1(Q.email);
        if (u1(J))
          return C($, "\u7528\u6237\u672A\u627E\u5230", A.FailCode.notFound, 404);
        Y.chat.push(J), await z0(Q.email, "address", JSON.stringify(Y));
      }
      return await X2($), b($, Y);
    } catch (X) {
      return console.error(X), C($, X, A.FailCode.server, 500);
    }
  return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 406);
}).delete(async ($) => {
  l.header = $.req.header();
  const Q = await $.req.json();
  if (q0(Q, h1))
    try {
      if (Q.type == "uid") {
        var Y = await i(Q.uid, "address");
        N1(Y.chat, { uid: H$(Q.uid) }), await z0(Q.uid, "address", JSON.stringify(Y));
      } else {
        var Y = await i(Q.email, "address");
        N1(Y.chat, { email: Q.email }), await z0(Q.email, "address", JSON.stringify(Y));
      }
      return b($, Y);
    } catch (X) {
      return C($, X, A.FailCode.server, 500);
    }
});
J0.post("/user/time", async ($) => {
  l.header = $.req.header();
  try {
    const Q = await $.req.json();
    if (!q0(Q, Q8))
      return C($, "\u6D88\u606F\u683C\u5F0F\u9519\u8BEF", A.FailCode.format, 406);
    if (Q.type == "uid")
      return b($, await e4(Q.uid));
    else
      return b($, await $2(Q.email));
  } catch (Q) {
    return C($, Q, A.FailCode.server, 500);
  }
});
J0.get("/user/count", async ($) => {
  return l.header = $.req.header(), b($, await t4());
});
J0.put("/user/:uid/store/*", async ($) => {
  l.header = $.req.header();
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await z0($.req.param().uid, Q, await $.req.text()), b($, await $.req.json());
  } catch (Y) {
    return C($, Y, A.FailCode.server, 500);
  }
}).delete(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  try {
    return await Q2($.req.param().uid, Q), b($, await $.req.json());
  } catch (Y) {
    return C($, Y, A.FailCode.server, 500);
  }
}).get(async ($) => {
  const Q = $.req.path.match(/(?<=\/user\/\w+\/store\/).+/g)[0].replaceAll("/", ".");
  l.header = $.req.header();
  try {
    return b($, await i($.req.param().uid, Q));
  } catch (Y) {
    return C($, Y, A.FailCode.server, 500);
  }
});
J0.all("*", ($) => C($, "\u672A\u77E5\u7684\u8DEF\u5F84", A.FailCode.falseMethod, 405));
var pw = J0;

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

// .wrangler/tmp/bundle-BHmLy9/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...pw,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...pw.middleware ? pw.middleware : []
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

// .wrangler/tmp/bundle-BHmLy9/middleware-loader.entry.ts
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
