import { jsx as b, Fragment as yt, jsxs as U } from "react/jsx-runtime";
import * as m from "react";
import At, { forwardRef as Fe, createElement as ra, useState as je, useLayoutEffect as dr, isValidElement as Kt, useContext as er, createContext as Dt, PureComponent as xa, useCallback as he, useMemo as tr, useRef as ye, useImperativeHandle as Uw, useEffect as Le, cloneElement as Ea, Children as n_, Component as o_ } from "react";
import * as Sa from "react-dom";
import a_, { createPortal as Ww } from "react-dom";
import { useLocation as Kw, Navigate as i_, useNavigate as Vw, useSearchParams as s_ } from "react-router-dom";
function Rm(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Vs(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((o) => {
      const a = Rm(o, t);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let o = 0; o < n.length; o++) {
          const a = n[o];
          typeof a == "function" ? a() : Rm(e[o], null);
        }
      };
  };
}
function de(...e) {
  return m.useCallback(Vs(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Cn(e) {
  const t = /* @__PURE__ */ l_(e), r = m.forwardRef((n, o) => {
    const { children: a, ...i } = n, s = m.Children.toArray(a), c = s.find(d_);
    if (c) {
      const u = c.props.children, l = s.map((d) => d === c ? m.Children.count(u) > 1 ? m.Children.only(null) : m.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ b(t, { ...i, ref: o, children: m.isValidElement(u) ? m.cloneElement(u, void 0, l) : null });
    }
    return /* @__PURE__ */ b(t, { ...i, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
var c_ = /* @__PURE__ */ Cn("Slot");
// @__NO_SIDE_EFFECTS__
function l_(e) {
  const t = m.forwardRef((r, n) => {
    const { children: o, ...a } = r;
    if (m.isValidElement(o)) {
      const i = p_(o), s = f_(a, o.props);
      return o.type !== m.Fragment && (s.ref = n ? Vs(n, i) : i), m.cloneElement(o, s);
    }
    return m.Children.count(o) > 1 ? m.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var qw = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function u_(e) {
  const t = ({ children: r }) => /* @__PURE__ */ b(yt, { children: r });
  return t.displayName = `${e}.Slottable`, t.__radixId = qw, t;
}
function d_(e) {
  return m.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === qw;
}
function f_(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], a = t[n];
    /^on[A-Z]/.test(n) ? o && a ? r[n] = (...s) => {
      const c = a(...s);
      return o(...s), c;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...a } : n === "className" && (r[n] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function p_(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
function Hw(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (r = Hw(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function pe() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = Hw(e)) && (n && (n += " "), n += t);
  return n;
}
const Mm = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Im = pe, vo = (e, t) => (r) => {
  var n;
  if (t?.variants == null) return Im(e, r?.class, r?.className);
  const { variants: o, defaultVariants: a } = t, i = Object.keys(o).map((u) => {
    const l = r?.[u], d = a?.[u];
    if (l === null) return null;
    const p = Mm(l) || Mm(d);
    return o[u][p];
  }), s = r && Object.entries(r).reduce((u, l) => {
    let [d, p] = l;
    return p === void 0 || (u[d] = p), u;
  }, {}), c = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((u, l) => {
    let { class: d, className: p, ...f } = l;
    return Object.entries(f).every((v) => {
      let [h, g] = v;
      return Array.isArray(g) ? g.includes({
        ...a,
        ...s
      }[h]) : {
        ...a,
        ...s
      }[h] === g;
    }) ? [
      ...u,
      d,
      p
    ] : u;
  }, []);
  return Im(e, i, c, r?.class, r?.className);
};
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h_ = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), m_ = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, r, n) => n ? n.toUpperCase() : r.toLowerCase()
), Dm = (e) => {
  const t = m_(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Gw = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim(), v_ = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var g_ = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y_ = Fe(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: o = "",
    children: a,
    iconNode: i,
    ...s
  }, c) => ra(
    "svg",
    {
      ref: c,
      ...g_,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(t) : r,
      className: Gw("lucide", o),
      ...!a && !v_(s) && { "aria-hidden": "true" },
      ...s
    },
    [
      ...i.map(([u, l]) => ra(u, l)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = (e, t) => {
  const r = Fe(
    ({ className: n, ...o }, a) => ra(y_, {
      ref: a,
      iconNode: t,
      className: Gw(
        `lucide-${h_(Dm(e))}`,
        `lucide-${e}`,
        n
      ),
      ...o
    })
  );
  return r.displayName = Dm(e), r;
};
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b_ = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], jm = Ne("bell", b_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], qs = Ne("check", w_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x_ = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], na = Ne("chevron-down", x_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E_ = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Yw = Ne("chevron-left", E_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Hs = Ne("chevron-right", S_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O_ = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Xw = Ne("chevron-up", O_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P_ = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], A_ = Ne("chevrons-left", P_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C_ = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], T_ = Ne("chevrons-right", C_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], k_ = Ne("circle-check", __);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N_ = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Zw = Ne("circle", N_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], M_ = Ne("circle-x", R_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], D_ = Ne("info", I_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j_ = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], L_ = Ne("loader-circle", j_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $_ = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], B_ = Ne("log-out", $_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F_ = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], z_ = Ne("menu", F_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U_ = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], W_ = Ne("moon", U_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K_ = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], V_ = Ne("plus", K_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q_ = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], H_ = Ne("refresh-cw", q_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G_ = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Y_ = Ne("search", G_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X_ = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
], Z_ = Ne("square-pen", X_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J_ = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Q_ = Ne("sun", J_);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ek = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], tk = Ne("trash-2", ek);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rk = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], nk = Ne("triangle-alert", rk);
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ok = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Uf = Ne("x", ok), Wf = "-", ak = (e) => {
  const t = sk(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      const s = i.split(Wf);
      return s[0] === "" && s.length !== 1 && s.shift(), Jw(s, t) || ik(i);
    },
    getConflictingClassGroupIds: (i, s) => {
      const c = r[i] || [];
      return s && n[i] ? [...c, ...n[i]] : c;
    }
  };
}, Jw = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], n = t.nextPart.get(r), o = n ? Jw(e.slice(1), n) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Wf);
  return t.validators.find(({
    validator: i
  }) => i(a))?.classGroupId;
}, Lm = /^\[(.+)\]$/, ik = (e) => {
  if (Lm.test(e)) {
    const t = Lm.exec(e)[1], r = t?.substring(0, t.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, sk = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in r)
    bd(r[o], n, o, t);
  return n;
}, bd = (e, t, r, n) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : $m(t, o);
      a.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (ck(o)) {
        bd(o(n), t, r, n);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([a, i]) => {
      bd(i, $m(t, a), r, n);
    });
  });
}, $m = (e, t) => {
  let r = e;
  return t.split(Wf).forEach((n) => {
    r.nextPart.has(n) || r.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(n);
  }), r;
}, ck = (e) => e.isThemeGetter, lk = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const o = (a, i) => {
    r.set(a, i), t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let i = r.get(a);
      if (i !== void 0)
        return i;
      if ((i = n.get(a)) !== void 0)
        return o(a, i), i;
    },
    set(a, i) {
      r.has(a) ? r.set(a, i) : o(a, i);
    }
  };
}, wd = "!", xd = ":", uk = xd.length, dk = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (o) => {
    const a = [];
    let i = 0, s = 0, c = 0, u;
    for (let v = 0; v < o.length; v++) {
      let h = o[v];
      if (i === 0 && s === 0) {
        if (h === xd) {
          a.push(o.slice(c, v)), c = v + uk;
          continue;
        }
        if (h === "/") {
          u = v;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? s++ : h === ")" && s--;
    }
    const l = a.length === 0 ? o : o.substring(c), d = fk(l), p = d !== l, f = u && u > c ? u - c : void 0;
    return {
      modifiers: a,
      hasImportantModifier: p,
      baseClassName: d,
      maybePostfixModifierPosition: f
    };
  };
  if (t) {
    const o = t + xd, a = n;
    n = (i) => i.startsWith(o) ? a(i.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: i,
      maybePostfixModifierPosition: void 0
    };
  }
  if (r) {
    const o = n;
    n = (a) => r({
      className: a,
      parseClassName: o
    });
  }
  return n;
}, fk = (e) => e.endsWith(wd) ? e.substring(0, e.length - 1) : e.startsWith(wd) ? e.substring(1) : e, pk = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((n) => [n, !0]));
  return (n) => {
    if (n.length <= 1)
      return n;
    const o = [];
    let a = [];
    return n.forEach((i) => {
      i[0] === "[" || t[i] ? (o.push(...a.sort(), i), a = []) : a.push(i);
    }), o.push(...a.sort()), o;
  };
}, hk = (e) => ({
  cache: lk(e.cacheSize),
  parseClassName: dk(e),
  sortModifiers: pk(e),
  ...ak(e)
}), mk = /\s+/, vk = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: o,
    sortModifiers: a
  } = t, i = [], s = e.trim().split(mk);
  let c = "";
  for (let u = s.length - 1; u >= 0; u -= 1) {
    const l = s[u], {
      isExternal: d,
      modifiers: p,
      hasImportantModifier: f,
      baseClassName: v,
      maybePostfixModifierPosition: h
    } = r(l);
    if (d) {
      c = l + (c.length > 0 ? " " + c : c);
      continue;
    }
    let g = !!h, y = n(g ? v.substring(0, h) : v);
    if (!y) {
      if (!g) {
        c = l + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (y = n(v), !y) {
        c = l + (c.length > 0 ? " " + c : c);
        continue;
      }
      g = !1;
    }
    const w = a(p).join(":"), x = f ? w + wd : w, S = x + y;
    if (i.includes(S))
      continue;
    i.push(S);
    const E = o(y, g);
    for (let O = 0; O < E.length; ++O) {
      const P = E[O];
      i.push(x + P);
    }
    c = l + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function gk() {
  let e = 0, t, r, n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = Qw(t)) && (n && (n += " "), n += r);
  return n;
}
const Qw = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Qw(e[n])) && (r && (r += " "), r += t);
  return r;
};
function yk(e, ...t) {
  let r, n, o, a = i;
  function i(c) {
    const u = t.reduce((l, d) => d(l), e());
    return r = hk(u), n = r.cache.get, o = r.cache.set, a = s, s(c);
  }
  function s(c) {
    const u = n(c);
    if (u)
      return u;
    const l = vk(c, r);
    return o(c, l), l;
  }
  return function() {
    return a(gk.apply(null, arguments));
  };
}
const Ve = (e) => {
  const t = (r) => r[e] || [];
  return t.isThemeGetter = !0, t;
}, e0 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, t0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, bk = /^\d+\/\d+$/, wk = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, xk = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ek = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Sk = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ok = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Hn = (e) => bk.test(e), ue = (e) => !!e && !Number.isNaN(Number(e)), Ur = (e) => !!e && Number.isInteger(Number(e)), Sl = (e) => e.endsWith("%") && ue(e.slice(0, -1)), br = (e) => wk.test(e), Pk = () => !0, Ak = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  xk.test(e) && !Ek.test(e)
), r0 = () => !1, Ck = (e) => Sk.test(e), Tk = (e) => Ok.test(e), _k = (e) => !Z(e) && !J(e), kk = (e) => go(e, a0, r0), Z = (e) => e0.test(e), fn = (e) => go(e, i0, Ak), Ol = (e) => go(e, Dk, ue), Bm = (e) => go(e, n0, r0), Nk = (e) => go(e, o0, Tk), ai = (e) => go(e, s0, Ck), J = (e) => t0.test(e), Bo = (e) => yo(e, i0), Rk = (e) => yo(e, jk), Fm = (e) => yo(e, n0), Mk = (e) => yo(e, a0), Ik = (e) => yo(e, o0), ii = (e) => yo(e, s0, !0), go = (e, t, r) => {
  const n = e0.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, yo = (e, t, r = !1) => {
  const n = t0.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, n0 = (e) => e === "position" || e === "percentage", o0 = (e) => e === "image" || e === "url", a0 = (e) => e === "length" || e === "size" || e === "bg-size", i0 = (e) => e === "length", Dk = (e) => e === "number", jk = (e) => e === "family-name", s0 = (e) => e === "shadow", Lk = () => {
  const e = Ve("color"), t = Ve("font"), r = Ve("text"), n = Ve("font-weight"), o = Ve("tracking"), a = Ve("leading"), i = Ve("breakpoint"), s = Ve("container"), c = Ve("spacing"), u = Ve("radius"), l = Ve("shadow"), d = Ve("inset-shadow"), p = Ve("text-shadow"), f = Ve("drop-shadow"), v = Ve("blur"), h = Ve("perspective"), g = Ve("aspect"), y = Ve("ease"), w = Ve("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [...S(), J, Z], O = () => ["auto", "hidden", "clip", "visible", "scroll"], P = () => ["auto", "contain", "none"], A = () => [J, Z, c], _ = () => [Hn, "full", "auto", ...A()], N = () => [Ur, "none", "subgrid", J, Z], T = () => ["auto", {
    span: ["full", Ur, J, Z]
  }, Ur, J, Z], R = () => [Ur, "auto", J, Z], j = () => ["auto", "min", "max", "fr", J, Z], C = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], D = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], $ = () => ["auto", ...A()], z = () => [Hn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...A()], I = () => [e, J, Z], F = () => [...S(), Fm, Bm, {
    position: [J, Z]
  }], oe = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], H = () => ["auto", "cover", "contain", Mk, kk, {
    size: [J, Z]
  }], ie = () => [Sl, Bo, fn], ae = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    J,
    Z
  ], W = () => ["", ue, Bo, fn], te = () => ["solid", "dashed", "dotted", "double"], se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], K = () => [ue, Sl, Fm, Bm], re = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    J,
    Z
  ], L = () => ["none", ue, J, Z], G = () => ["none", ue, J, Z], Y = () => [ue, J, Z], B = () => [Hn, "full", ...A()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [br],
      breakpoint: [br],
      color: [Pk],
      container: [br],
      "drop-shadow": [br],
      ease: ["in", "out", "in-out"],
      font: [_k],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [br],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [br],
      shadow: [br],
      spacing: ["px", ue],
      text: [br],
      "text-shadow": [br],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Hn, Z, J, g]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ue, Z, J, s]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": x()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": x()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: O()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": O()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": O()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: P()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": P()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": P()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: _()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": _()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": _()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: _()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: _()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: _()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: _()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: _()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: _()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Ur, "auto", J, Z]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Hn, "full", "auto", s, ...A()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [ue, Hn, "auto", "initial", "none", Z]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ue, J, Z]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ue, J, Z]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ur, "first", "last", "none", J, Z]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": N()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: T()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": R()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": R()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": N()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: T()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": R()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": R()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": j()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": j()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: A()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": A()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": A()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...C(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...D(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...D()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...C()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...D(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...D(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": C()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...D(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...D()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: A()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: A()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: A()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: A()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: A()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: A()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: A()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: A()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: A()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: $()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: $()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: $()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: $()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: $()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: $()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: $()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: $()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: $()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": A()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": A()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: z()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...z()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          s,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...z()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          s,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...z()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...z()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...z()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...z()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Bo, fn]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [n, J, Ol]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Sl, Z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Rk, Z, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, J, Z]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ue, "none", J, Ol]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...A()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", J, Z]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", J, Z]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: I()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: I()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...te(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ue, "from-font", "auto", J, fn]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: I()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ue, "auto", J, Z]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: A()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", J, Z]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", J, Z]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: F()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: oe()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: H()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ur, J, Z],
          radial: ["", J, Z],
          conic: [Ur, J, Z]
        }, Ik, Nk]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: I()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ie()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ie()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ie()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: I()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: I()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: I()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ae()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ae()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ae()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ae()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ae()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ae()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ae()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ae()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ae()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ae()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ae()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ae()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ae()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ae()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ae()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: W()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": W()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": W()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": W()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": W()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": W()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": W()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": W()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": W()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": W()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": W()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...te(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...te(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: I()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": I()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": I()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": I()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": I()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": I()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": I()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": I()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": I()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: I()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...te(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ue, J, Z]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ue, Bo, fn]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: I()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          l,
          ii,
          ai
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: I()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, ii, ai]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": I()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: W()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: I()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ue, fn]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": I()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": W()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": I()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, ii, ai]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": I()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ue, J, Z]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...se(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": se()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [ue]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": K()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": K()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": K()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": K()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": K()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": K()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": K()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": K()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": K()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": K()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": K()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": K()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": K()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": K()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": I()
      }],
      "mask-image-radial": [{
        "mask-radial": [J, Z]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": K()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": K()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": I()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": I()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ue]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": K()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": K()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": I()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": I()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: F()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: oe()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: H()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", J, Z]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          J,
          Z
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: re()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ue, J, Z]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ue, J, Z]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          ii,
          ai
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": I()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ue, J, Z]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ue, J, Z]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ue, J, Z]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ue, J, Z]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ue, J, Z]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          J,
          Z
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": re()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ue, J, Z]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ue, J, Z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ue, J, Z]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ue, J, Z]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ue, J, Z]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ue, J, Z]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ue, J, Z]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ue, J, Z]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": A()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": A()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": A()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", J, Z]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [ue, "initial", J, Z]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", y, J, Z]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ue, J, Z]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", w, J, Z]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [h, J, Z]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: L()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": L()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": L()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": L()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: G()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": G()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": G()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": G()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Y()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Y()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Y()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [J, Z, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: B()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": B()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": B()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": B()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: I()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: I()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", J, Z]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": A()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": A()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": A()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": A()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": A()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": A()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": A()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": A()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": A()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": A()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": A()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": A()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": A()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": A()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": A()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": A()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": A()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": A()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", J, Z]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...I()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ue, Bo, fn, Ol]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...I()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, $k = /* @__PURE__ */ yk(Lk);
function V(...e) {
  return $k(pe(e));
}
function Bk(e) {
  if (!e) return "";
  const t = e.trim().split(" ").filter(Boolean);
  return t.length >= 2 ? `${t[0][0]}${t[t.length - 1][0]}`.toUpperCase() : e.substring(0, 2).toUpperCase();
}
const Fk = vo(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow hover:bg-secondary/90",
        success: "bg-success text-success-foreground shadow hover:bg-success/90",
        error: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        danger: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        warning: "bg-warning text-warning-foreground shadow hover:bg-warning/90",
        info: "bg-info text-info-foreground shadow hover:bg-info/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        "outline-secondary": "border border-secondary bg-background text-secondary hover:bg-secondary/10",
        "outline-primary": "border border-primary bg-background text-primary hover:bg-primary/10",
        "outline-warning": "border border-warning bg-background text-warning hover:bg-warning/10",
        "outline-danger": "border border-destructive bg-background text-destructive hover:bg-destructive/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        text: "hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
        dark: "bg-foreground text-background shadow hover:bg-foreground/90"
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
), Gr = m.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, loading: o = !1, fullWidth: a = !1, icon: i, iconPosition: s = "left", children: c, disabled: u, ...l }, d) => {
    const p = n ? c_ : "button", f = u || o;
    return /* @__PURE__ */ U(
      p,
      {
        className: V(
          Fk({ variant: t, size: r, className: e }),
          a && "w-full"
        ),
        ref: d,
        disabled: f,
        ...l,
        children: [
          o && /* @__PURE__ */ b(L_, { className: "animate-spin" }),
          !o && i && s === "left" && i,
          c,
          !o && i && s === "right" && i
        ]
      }
    );
  }
);
Gr.displayName = "Button";
const Ed = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "div",
  {
    ref: r,
    className: V(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      e
    ),
    ...t
  }
));
Ed.displayName = "Card";
const zk = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "div",
  {
    ref: r,
    className: V("flex flex-col space-y-1.5 p-6", e),
    ...t
  }
));
zk.displayName = "CardHeader";
const Uk = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "div",
  {
    ref: r,
    className: V(
      "text-2xl font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
Uk.displayName = "CardTitle";
const Wk = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "div",
  {
    ref: r,
    className: V("text-sm text-muted-foreground", e),
    ...t
  }
));
Wk.displayName = "CardDescription";
const Kk = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b("div", { ref: r, className: V("p-6 pt-0", e), ...t }));
Kk.displayName = "CardContent";
const Vk = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "div",
  {
    ref: r,
    className: V("flex items-center p-6 pt-0", e),
    ...t
  }
));
Vk.displayName = "CardFooter";
const c0 = m.forwardRef(
  ({ className: e, type: t, error: r, helperText: n, ...o }, a) => /* @__PURE__ */ U("div", { className: "w-full", children: [
    /* @__PURE__ */ b(
      "input",
      {
        type: t,
        className: V(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          r && "border-destructive focus-visible:ring-destructive",
          e
        ),
        ref: a,
        ...o
      }
    ),
    n && /* @__PURE__ */ b("p", { className: V(
      "mt-1 text-xs",
      r ? "text-destructive" : "text-muted-foreground"
    ), children: n })
  ] })
);
c0.displayName = "Input";
const qk = vo(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        error: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function f7({ className: e, variant: t, ...r }) {
  return /* @__PURE__ */ b("div", { className: V(qk({ variant: t }), e), ...r });
}
function Hk(e, t) {
  const r = m.createContext(t), n = (a) => {
    const { children: i, ...s } = a, c = m.useMemo(() => s, Object.values(s));
    return /* @__PURE__ */ b(r.Provider, { value: c, children: i });
  };
  n.displayName = e + "Provider";
  function o(a) {
    const i = m.useContext(r);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [n, o];
}
function Et(e, t = []) {
  let r = [];
  function n(a, i) {
    const s = m.createContext(i), c = r.length;
    r = [...r, i];
    const u = (d) => {
      const { scope: p, children: f, ...v } = d, h = p?.[e]?.[c] || s, g = m.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ b(h.Provider, { value: g, children: f });
    };
    u.displayName = a + "Provider";
    function l(d, p) {
      const f = p?.[e]?.[c] || s, v = m.useContext(f);
      if (v) return v;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${a}\``);
    }
    return [u, l];
  }
  const o = () => {
    const a = r.map((i) => m.createContext(i));
    return function(s) {
      const c = s?.[e] || a;
      return m.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: c } }),
        [s, c]
      );
    };
  };
  return o.scopeName = e, [n, Gk(o, ...t)];
}
function Gk(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const i = n.reduce((s, { useScope: c, scopeName: u }) => {
        const d = c(a)[`__scope${u}`];
        return { ...s, ...d };
      }, {});
      return m.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
function q(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(o) {
    if (e?.(o), r === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
var nt = globalThis?.document ? m.useLayoutEffect : () => {
}, Yk = m[" useInsertionEffect ".trim().toString()] || nt;
function qt({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  },
  caller: n
}) {
  const [o, a, i] = Xk({
    defaultProp: t,
    onChange: r
  }), s = e !== void 0, c = s ? e : o;
  {
    const l = m.useRef(e !== void 0);
    m.useEffect(() => {
      const d = l.current;
      d !== s && console.warn(
        `${n} is changing from ${d ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = s;
    }, [s, n]);
  }
  const u = m.useCallback(
    (l) => {
      if (s) {
        const d = Zk(l) ? l(e) : l;
        d !== e && i.current?.(d);
      } else
        a(l);
    },
    [s, e, a, i]
  );
  return [c, u];
}
function Xk({
  defaultProp: e,
  onChange: t
}) {
  const [r, n] = m.useState(e), o = m.useRef(r), a = m.useRef(t);
  return Yk(() => {
    a.current = t;
  }, [t]), m.useEffect(() => {
    o.current !== r && (a.current?.(r), o.current = r);
  }, [r, o]), [r, n, a];
}
function Zk(e) {
  return typeof e == "function";
}
function Gs(e) {
  const t = m.useRef({ value: e, previous: e });
  return m.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function Ys(e) {
  const [t, r] = m.useState(void 0);
  return nt(() => {
    if (e) {
      r({ width: e.offsetWidth, height: e.offsetHeight });
      const n = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let i, s;
        if ("borderBoxSize" in a) {
          const c = a.borderBoxSize, u = Array.isArray(c) ? c[0] : c;
          i = u.inlineSize, s = u.blockSize;
        } else
          i = e.offsetWidth, s = e.offsetHeight;
        r({ width: i, height: s });
      });
      return n.observe(e, { box: "border-box" }), () => n.unobserve(e);
    } else
      r(void 0);
  }, [e]), t;
}
function Jk(e, t) {
  return m.useReducer((r, n) => t[r][n] ?? r, e);
}
var jt = (e) => {
  const { present: t, children: r } = e, n = Qk(t), o = typeof r == "function" ? r({ present: n.isPresent }) : m.Children.only(r), a = de(n.ref, eN(o));
  return typeof r == "function" || n.isPresent ? m.cloneElement(o, { ref: a }) : null;
};
jt.displayName = "Presence";
function Qk(e) {
  const [t, r] = m.useState(), n = m.useRef(null), o = m.useRef(e), a = m.useRef("none"), i = e ? "mounted" : "unmounted", [s, c] = Jk(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return m.useEffect(() => {
    const u = si(n.current);
    a.current = s === "mounted" ? u : "none";
  }, [s]), nt(() => {
    const u = n.current, l = o.current;
    if (l !== e) {
      const p = a.current, f = si(u);
      e ? c("MOUNT") : f === "none" || u?.display === "none" ? c("UNMOUNT") : c(l && p !== f ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), nt(() => {
    if (t) {
      let u;
      const l = t.ownerDocument.defaultView ?? window, d = (f) => {
        const h = si(n.current).includes(CSS.escape(f.animationName));
        if (f.target === t && h && (c("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = l.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, p = (f) => {
        f.target === t && (a.current = si(n.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        l.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: m.useCallback((u) => {
      n.current = u ? getComputedStyle(u) : null, r(u);
    }, [])
  };
}
function si(e) {
  return e?.animationName || "none";
}
function eN(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var tN = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], ne = tN.reduce((e, t) => {
  const r = /* @__PURE__ */ Cn(`Primitive.${t}`), n = m.forwardRef((o, a) => {
    const { asChild: i, ...s } = o, c = i ? r : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ b(c, { ...s, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function Kf(e, t) {
  e && Sa.flushSync(() => e.dispatchEvent(t));
}
var Xs = "Checkbox", [rN] = Et(Xs), [nN, Vf] = rN(Xs);
function oN(e) {
  const {
    __scopeCheckbox: t,
    checked: r,
    children: n,
    defaultChecked: o,
    disabled: a,
    form: i,
    name: s,
    onCheckedChange: c,
    required: u,
    value: l = "on",
    // @ts-expect-error
    internal_do_not_use_render: d
  } = e, [p, f] = qt({
    prop: r,
    defaultProp: o ?? !1,
    onChange: c,
    caller: Xs
  }), [v, h] = m.useState(null), [g, y] = m.useState(null), w = m.useRef(!1), x = v ? !!i || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: p,
    disabled: a,
    setChecked: f,
    control: v,
    setControl: h,
    name: s,
    form: i,
    value: l,
    hasConsumerStoppedPropagationRef: w,
    required: u,
    defaultChecked: Xr(o) ? !1 : o,
    isFormControl: x,
    bubbleInput: g,
    setBubbleInput: y
  };
  return /* @__PURE__ */ b(
    nN,
    {
      scope: t,
      ...S,
      children: aN(d) ? d(S) : n
    }
  );
}
var l0 = "CheckboxTrigger", u0 = m.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: r, ...n }, o) => {
    const {
      control: a,
      value: i,
      disabled: s,
      checked: c,
      required: u,
      setControl: l,
      setChecked: d,
      hasConsumerStoppedPropagationRef: p,
      isFormControl: f,
      bubbleInput: v
    } = Vf(l0, e), h = de(o, l), g = m.useRef(c);
    return m.useEffect(() => {
      const y = a?.form;
      if (y) {
        const w = () => d(g.current);
        return y.addEventListener("reset", w), () => y.removeEventListener("reset", w);
      }
    }, [a, d]), /* @__PURE__ */ b(
      ne.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": Xr(c) ? "mixed" : c,
        "aria-required": u,
        "data-state": m0(c),
        "data-disabled": s ? "" : void 0,
        disabled: s,
        value: i,
        ...n,
        ref: h,
        onKeyDown: q(t, (y) => {
          y.key === "Enter" && y.preventDefault();
        }),
        onClick: q(r, (y) => {
          d((w) => Xr(w) ? !0 : !w), v && f && (p.current = y.isPropagationStopped(), p.current || y.stopPropagation());
        })
      }
    );
  }
);
u0.displayName = l0;
var qf = m.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: r,
      name: n,
      checked: o,
      defaultChecked: a,
      required: i,
      disabled: s,
      value: c,
      onCheckedChange: u,
      form: l,
      ...d
    } = e;
    return /* @__PURE__ */ b(
      oN,
      {
        __scopeCheckbox: r,
        checked: o,
        defaultChecked: a,
        disabled: s,
        required: i,
        onCheckedChange: u,
        name: n,
        form: l,
        value: c,
        internal_do_not_use_render: ({ isFormControl: p }) => /* @__PURE__ */ U(yt, { children: [
          /* @__PURE__ */ b(
            u0,
            {
              ...d,
              ref: t,
              __scopeCheckbox: r
            }
          ),
          p && /* @__PURE__ */ b(
            h0,
            {
              __scopeCheckbox: r
            }
          )
        ] })
      }
    );
  }
);
qf.displayName = Xs;
var d0 = "CheckboxIndicator", f0 = m.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: r, forceMount: n, ...o } = e, a = Vf(d0, r);
    return /* @__PURE__ */ b(
      jt,
      {
        present: n || Xr(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ b(
          ne.span,
          {
            "data-state": m0(a.checked),
            "data-disabled": a.disabled ? "" : void 0,
            ...o,
            ref: t,
            style: { pointerEvents: "none", ...e.style }
          }
        )
      }
    );
  }
);
f0.displayName = d0;
var p0 = "CheckboxBubbleInput", h0 = m.forwardRef(
  ({ __scopeCheckbox: e, ...t }, r) => {
    const {
      control: n,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: i,
      required: s,
      disabled: c,
      name: u,
      value: l,
      form: d,
      bubbleInput: p,
      setBubbleInput: f
    } = Vf(p0, e), v = de(r, f), h = Gs(a), g = Ys(n);
    m.useEffect(() => {
      const w = p;
      if (!w) return;
      const x = window.HTMLInputElement.prototype, E = Object.getOwnPropertyDescriptor(
        x,
        "checked"
      ).set, O = !o.current;
      if (h !== a && E) {
        const P = new Event("click", { bubbles: O });
        w.indeterminate = Xr(a), E.call(w, Xr(a) ? !1 : a), w.dispatchEvent(P);
      }
    }, [p, h, a, o]);
    const y = m.useRef(Xr(a) ? !1 : a);
    return /* @__PURE__ */ b(
      ne.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: i ?? y.current,
        required: s,
        disabled: c,
        name: u,
        value: l,
        form: d,
        ...t,
        tabIndex: -1,
        ref: v,
        style: {
          ...t.style,
          ...g,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
h0.displayName = p0;
function aN(e) {
  return typeof e == "function";
}
function Xr(e) {
  return e === "indeterminate";
}
function m0(e) {
  return Xr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const iN = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  qf,
  {
    ref: r,
    className: V(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ b(
      f0,
      {
        className: V("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ b(qs, { className: "h-4 w-4" })
      }
    )
  }
));
iN.displayName = qf.displayName;
var sN = m[" useId ".trim().toString()] || (() => {
}), cN = 0;
function Nt(e) {
  const [t, r] = m.useState(sN());
  return nt(() => {
    r((n) => n ?? String(cN++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
function pt(e) {
  const t = m.useRef(e);
  return m.useEffect(() => {
    t.current = e;
  }), m.useMemo(() => (...r) => t.current?.(...r), []);
}
function lN(e, t = globalThis?.document) {
  const r = pt(e);
  m.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var uN = "DismissableLayer", Sd = "dismissableLayer.update", dN = "dismissableLayer.pointerDownOutside", fN = "dismissableLayer.focusOutside", zm, v0 = m.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), bo = m.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: i,
      onDismiss: s,
      ...c
    } = e, u = m.useContext(v0), [l, d] = m.useState(null), p = l?.ownerDocument ?? globalThis?.document, [, f] = m.useState({}), v = de(t, (P) => d(P)), h = Array.from(u.layers), [g] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = h.indexOf(g), w = l ? h.indexOf(l) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = w >= y, E = hN((P) => {
      const A = P.target, _ = [...u.branches].some((N) => N.contains(A));
      !S || _ || (o?.(P), i?.(P), P.defaultPrevented || s?.());
    }, p), O = mN((P) => {
      const A = P.target;
      [...u.branches].some((N) => N.contains(A)) || (a?.(P), i?.(P), P.defaultPrevented || s?.());
    }, p);
    return lN((P) => {
      w === u.layers.size - 1 && (n?.(P), !P.defaultPrevented && s && (P.preventDefault(), s()));
    }, p), m.useEffect(() => {
      if (l)
        return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (zm = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(l)), u.layers.add(l), Um(), () => {
          r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = zm);
        };
    }, [l, p, r, u]), m.useEffect(() => () => {
      l && (u.layers.delete(l), u.layersWithOutsidePointerEventsDisabled.delete(l), Um());
    }, [l, u]), m.useEffect(() => {
      const P = () => f({});
      return document.addEventListener(Sd, P), () => document.removeEventListener(Sd, P);
    }, []), /* @__PURE__ */ b(
      ne.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: x ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: q(e.onFocusCapture, O.onFocusCapture),
        onBlurCapture: q(e.onBlurCapture, O.onBlurCapture),
        onPointerDownCapture: q(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
bo.displayName = uN;
var pN = "DismissableLayerBranch", g0 = m.forwardRef((e, t) => {
  const r = m.useContext(v0), n = m.useRef(null), o = de(t, n);
  return m.useEffect(() => {
    const a = n.current;
    if (a)
      return r.branches.add(a), () => {
        r.branches.delete(a);
      };
  }, [r.branches]), /* @__PURE__ */ b(ne.div, { ...e, ref: o });
});
g0.displayName = pN;
function hN(e, t = globalThis?.document) {
  const r = pt(e), n = m.useRef(!1), o = m.useRef(() => {
  });
  return m.useEffect(() => {
    const a = (s) => {
      if (s.target && !n.current) {
        let c = function() {
          y0(
            dN,
            r,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: s };
        s.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      n.current = !1;
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => n.current = !0
  };
}
function mN(e, t = globalThis?.document) {
  const r = pt(e), n = m.useRef(!1);
  return m.useEffect(() => {
    const o = (a) => {
      a.target && !n.current && y0(fN, r, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, r]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function Um() {
  const e = new CustomEvent(Sd);
  document.dispatchEvent(e);
}
function y0(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? Kf(o, a) : o.dispatchEvent(a);
}
var vN = bo, gN = g0, Pl = "focusScope.autoFocusOnMount", Al = "focusScope.autoFocusOnUnmount", Wm = { bubbles: !1, cancelable: !0 }, yN = "FocusScope", Zs = m.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...i
  } = e, [s, c] = m.useState(null), u = pt(o), l = pt(a), d = m.useRef(null), p = de(t, (h) => c(h)), f = m.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  m.useEffect(() => {
    if (n) {
      let h = function(x) {
        if (f.paused || !s) return;
        const S = x.target;
        s.contains(S) ? d.current = S : Wr(d.current, { select: !0 });
      }, g = function(x) {
        if (f.paused || !s) return;
        const S = x.relatedTarget;
        S !== null && (s.contains(S) || Wr(d.current, { select: !0 }));
      }, y = function(x) {
        if (document.activeElement === document.body)
          for (const E of x)
            E.removedNodes.length > 0 && Wr(s);
      };
      document.addEventListener("focusin", h), document.addEventListener("focusout", g);
      const w = new MutationObserver(y);
      return s && w.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", h), document.removeEventListener("focusout", g), w.disconnect();
      };
    }
  }, [n, s, f.paused]), m.useEffect(() => {
    if (s) {
      Vm.add(f);
      const h = document.activeElement;
      if (!s.contains(h)) {
        const y = new CustomEvent(Pl, Wm);
        s.addEventListener(Pl, u), s.dispatchEvent(y), y.defaultPrevented || (bN(ON(b0(s)), { select: !0 }), document.activeElement === h && Wr(s));
      }
      return () => {
        s.removeEventListener(Pl, u), setTimeout(() => {
          const y = new CustomEvent(Al, Wm);
          s.addEventListener(Al, l), s.dispatchEvent(y), y.defaultPrevented || Wr(h ?? document.body, { select: !0 }), s.removeEventListener(Al, l), Vm.remove(f);
        }, 0);
      };
    }
  }, [s, u, l, f]);
  const v = m.useCallback(
    (h) => {
      if (!r && !n || f.paused) return;
      const g = h.key === "Tab" && !h.altKey && !h.ctrlKey && !h.metaKey, y = document.activeElement;
      if (g && y) {
        const w = h.currentTarget, [x, S] = wN(w);
        x && S ? !h.shiftKey && y === S ? (h.preventDefault(), r && Wr(x, { select: !0 })) : h.shiftKey && y === x && (h.preventDefault(), r && Wr(S, { select: !0 })) : y === w && h.preventDefault();
      }
    },
    [r, n, f.paused]
  );
  return /* @__PURE__ */ b(ne.div, { tabIndex: -1, ...i, ref: p, onKeyDown: v });
});
Zs.displayName = yN;
function bN(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (Wr(n, { select: t }), document.activeElement !== r) return;
}
function wN(e) {
  const t = b0(e), r = Km(t, e), n = Km(t.reverse(), e);
  return [r, n];
}
function b0(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function Km(e, t) {
  for (const r of e)
    if (!xN(r, { upTo: t })) return r;
}
function xN(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function EN(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Wr(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && EN(e) && t && e.select();
  }
}
var Vm = SN();
function SN() {
  let e = [];
  return {
    add(t) {
      const r = e[0];
      t !== r && r?.pause(), e = qm(e, t), e.unshift(t);
    },
    remove(t) {
      e = qm(e, t), e[0]?.resume();
    }
  };
}
function qm(e, t) {
  const r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
function ON(e) {
  return e.filter((t) => t.tagName !== "A");
}
var PN = "Portal", Oa = m.forwardRef((e, t) => {
  const { container: r, ...n } = e, [o, a] = m.useState(!1);
  nt(() => a(!0), []);
  const i = r || o && globalThis?.document?.body;
  return i ? a_.createPortal(/* @__PURE__ */ b(ne.div, { ...n, ref: t }), i) : null;
});
Oa.displayName = PN;
var Cl = 0;
function Hf() {
  m.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Hm()), document.body.insertAdjacentElement("beforeend", e[1] ?? Hm()), Cl++, () => {
      Cl === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Cl--;
    };
  }, []);
}
function Hm() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ir = function() {
  return ir = Object.assign || function(t) {
    for (var r, n = 1, o = arguments.length; n < o; n++) {
      r = arguments[n];
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, ir.apply(this, arguments);
};
function w0(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function AN(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, a; n < o; n++)
    (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var ji = "right-scroll-bar-position", Li = "width-before-scroll-bar", CN = "with-scroll-bars-hidden", TN = "--removed-body-scroll-bar-size";
function Tl(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function _N(e, t) {
  var r = je(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var o = r.value;
          o !== n && (r.value = n, r.callback(n, o));
        }
      }
    };
  })[0];
  return r.callback = t, r.facade;
}
var kN = typeof window < "u" ? m.useLayoutEffect : m.useEffect, Gm = /* @__PURE__ */ new WeakMap();
function NN(e, t) {
  var r = _N(null, function(n) {
    return e.forEach(function(o) {
      return Tl(o, n);
    });
  });
  return kN(function() {
    var n = Gm.get(r);
    if (n) {
      var o = new Set(n), a = new Set(e), i = r.current;
      o.forEach(function(s) {
        a.has(s) || Tl(s, null);
      }), a.forEach(function(s) {
        o.has(s) || Tl(s, i);
      });
    }
    Gm.set(r, e);
  }, [e]), r;
}
function RN(e) {
  return e;
}
function MN(e, t) {
  t === void 0 && (t = RN);
  var r = [], n = !1, o = {
    read: function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    },
    useMedium: function(a) {
      var i = t(a, n);
      return r.push(i), function() {
        r = r.filter(function(s) {
          return s !== i;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (n = !0; r.length; ) {
        var i = r;
        r = [], i.forEach(a);
      }
      r = {
        push: function(s) {
          return a(s);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(a) {
      n = !0;
      var i = [];
      if (r.length) {
        var s = r;
        r = [], s.forEach(a), i = r;
      }
      var c = function() {
        var l = i;
        i = [], l.forEach(a);
      }, u = function() {
        return Promise.resolve().then(c);
      };
      u(), r = {
        push: function(l) {
          i.push(l), u();
        },
        filter: function(l) {
          return i = i.filter(l), r;
        }
      };
    }
  };
  return o;
}
function IN(e) {
  e === void 0 && (e = {});
  var t = MN(null);
  return t.options = ir({ async: !0, ssr: !1 }, e), t;
}
var x0 = function(e) {
  var t = e.sideCar, r = w0(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return m.createElement(n, ir({}, r));
};
x0.isSideCarExport = !0;
function DN(e, t) {
  return e.useMedium(t), x0;
}
var E0 = IN(), _l = function() {
}, Js = m.forwardRef(function(e, t) {
  var r = m.useRef(null), n = m.useState({
    onScrollCapture: _l,
    onWheelCapture: _l,
    onTouchMoveCapture: _l
  }), o = n[0], a = n[1], i = e.forwardProps, s = e.children, c = e.className, u = e.removeScrollBar, l = e.enabled, d = e.shards, p = e.sideCar, f = e.noRelative, v = e.noIsolation, h = e.inert, g = e.allowPinchZoom, y = e.as, w = y === void 0 ? "div" : y, x = e.gapMode, S = w0(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = p, O = NN([r, t]), P = ir(ir({}, S), o);
  return m.createElement(
    m.Fragment,
    null,
    l && m.createElement(E, { sideCar: E0, removeScrollBar: u, shards: d, noRelative: f, noIsolation: v, inert: h, setCallbacks: a, allowPinchZoom: !!g, lockRef: r, gapMode: x }),
    i ? m.cloneElement(m.Children.only(s), ir(ir({}, P), { ref: O })) : m.createElement(w, ir({}, P, { className: c, ref: O }), s)
  );
});
Js.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Js.classNames = {
  fullWidth: Li,
  zeroRight: ji
};
var jN = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function LN() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = jN();
  return t && e.setAttribute("nonce", t), e;
}
function $N(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function BN(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var FN = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = LN()) && ($N(t, r), BN(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, zN = function() {
  var e = FN();
  return function(t, r) {
    m.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, S0 = function() {
  var e = zN(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, UN = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, kl = function(e) {
  return parseInt(e || "", 10) || 0;
}, WN = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [kl(r), kl(n), kl(o)];
}, KN = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return UN;
  var t = WN(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, VN = S0(), eo = "data-scroll-locked", qN = function(e, t, r, n) {
  var o = e.left, a = e.top, i = e.right, s = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(CN, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(s, "px ").concat(n, `;
  }
  body[`).concat(eo, `] {
    overflow: hidden `).concat(n, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(n, ";"),
    r === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(n, `;
    `),
    r === "padding" && "padding-right: ".concat(s, "px ").concat(n, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(ji, ` {
    right: `).concat(s, "px ").concat(n, `;
  }
  
  .`).concat(Li, ` {
    margin-right: `).concat(s, "px ").concat(n, `;
  }
  
  .`).concat(ji, " .").concat(ji, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(Li, " .").concat(Li, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(eo, `] {
    `).concat(TN, ": ").concat(s, `px;
  }
`);
}, Ym = function() {
  var e = parseInt(document.body.getAttribute(eo) || "0", 10);
  return isFinite(e) ? e : 0;
}, HN = function() {
  m.useEffect(function() {
    return document.body.setAttribute(eo, (Ym() + 1).toString()), function() {
      var e = Ym() - 1;
      e <= 0 ? document.body.removeAttribute(eo) : document.body.setAttribute(eo, e.toString());
    };
  }, []);
}, GN = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  HN();
  var a = m.useMemo(function() {
    return KN(o);
  }, [o]);
  return m.createElement(VN, { styles: qN(a, !t, o, r ? "" : "!important") });
}, Od = !1;
if (typeof window < "u")
  try {
    var ci = Object.defineProperty({}, "passive", {
      get: function() {
        return Od = !0, !0;
      }
    });
    window.addEventListener("test", ci, ci), window.removeEventListener("test", ci, ci);
  } catch {
    Od = !1;
  }
var Gn = Od ? { passive: !1 } : !1, YN = function(e) {
  return e.tagName === "TEXTAREA";
}, O0 = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !YN(e) && r[t] === "visible")
  );
}, XN = function(e) {
  return O0(e, "overflowY");
}, ZN = function(e) {
  return O0(e, "overflowX");
}, Xm = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = P0(e, n);
    if (o) {
      var a = A0(e, n), i = a[1], s = a[2];
      if (i > s)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, JN = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, QN = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, P0 = function(e, t) {
  return e === "v" ? XN(t) : ZN(t);
}, A0 = function(e, t) {
  return e === "v" ? JN(t) : QN(t);
}, eR = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, tR = function(e, t, r, n, o) {
  var a = eR(e, window.getComputedStyle(t).direction), i = a * n, s = r.target, c = t.contains(s), u = !1, l = i > 0, d = 0, p = 0;
  do {
    if (!s)
      break;
    var f = A0(e, s), v = f[0], h = f[1], g = f[2], y = h - g - a * v;
    (v || y) && P0(e, s) && (d += y, p += v);
    var w = s.parentNode;
    s = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !c && s !== document.body || // self content
    c && (t.contains(s) || t === s)
  );
  return (l && Math.abs(d) < 1 || !l && Math.abs(p) < 1) && (u = !0), u;
}, li = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Zm = function(e) {
  return [e.deltaX, e.deltaY];
}, Jm = function(e) {
  return e && "current" in e ? e.current : e;
}, rR = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, nR = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, oR = 0, Yn = [];
function aR(e) {
  var t = m.useRef([]), r = m.useRef([0, 0]), n = m.useRef(), o = m.useState(oR++)[0], a = m.useState(S0)[0], i = m.useRef(e);
  m.useEffect(function() {
    i.current = e;
  }, [e]), m.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var h = AN([e.lockRef.current], (e.shards || []).map(Jm), !0).filter(Boolean);
      return h.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), h.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = m.useCallback(function(h, g) {
    if ("touches" in h && h.touches.length === 2 || h.type === "wheel" && h.ctrlKey)
      return !i.current.allowPinchZoom;
    var y = li(h), w = r.current, x = "deltaX" in h ? h.deltaX : w[0] - y[0], S = "deltaY" in h ? h.deltaY : w[1] - y[1], E, O = h.target, P = Math.abs(x) > Math.abs(S) ? "h" : "v";
    if ("touches" in h && P === "h" && O.type === "range")
      return !1;
    var A = Xm(P, O);
    if (!A)
      return !0;
    if (A ? E = P : (E = P === "v" ? "h" : "v", A = Xm(P, O)), !A)
      return !1;
    if (!n.current && "changedTouches" in h && (x || S) && (n.current = E), !E)
      return !0;
    var _ = n.current || E;
    return tR(_, g, h, _ === "h" ? x : S);
  }, []), c = m.useCallback(function(h) {
    var g = h;
    if (!(!Yn.length || Yn[Yn.length - 1] !== a)) {
      var y = "deltaY" in g ? Zm(g) : li(g), w = t.current.filter(function(E) {
        return E.name === g.type && (E.target === g.target || g.target === E.shadowParent) && rR(E.delta, y);
      })[0];
      if (w && w.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!w) {
        var x = (i.current.shards || []).map(Jm).filter(Boolean).filter(function(E) {
          return E.contains(g.target);
        }), S = x.length > 0 ? s(g, x[0]) : !i.current.noIsolation;
        S && g.cancelable && g.preventDefault();
      }
    }
  }, []), u = m.useCallback(function(h, g, y, w) {
    var x = { name: h, delta: g, target: y, should: w, shadowParent: iR(y) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== x;
      });
    }, 1);
  }, []), l = m.useCallback(function(h) {
    r.current = li(h), n.current = void 0;
  }, []), d = m.useCallback(function(h) {
    u(h.type, Zm(h), h.target, s(h, e.lockRef.current));
  }, []), p = m.useCallback(function(h) {
    u(h.type, li(h), h.target, s(h, e.lockRef.current));
  }, []);
  m.useEffect(function() {
    return Yn.push(a), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", c, Gn), document.addEventListener("touchmove", c, Gn), document.addEventListener("touchstart", l, Gn), function() {
      Yn = Yn.filter(function(h) {
        return h !== a;
      }), document.removeEventListener("wheel", c, Gn), document.removeEventListener("touchmove", c, Gn), document.removeEventListener("touchstart", l, Gn);
    };
  }, []);
  var f = e.removeScrollBar, v = e.inert;
  return m.createElement(
    m.Fragment,
    null,
    v ? m.createElement(a, { styles: nR(o) }) : null,
    f ? m.createElement(GN, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function iR(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const sR = DN(E0, aR);
var Qs = m.forwardRef(function(e, t) {
  return m.createElement(Js, ir({}, e, { ref: t, sideCar: sR }));
});
Qs.classNames = Js.classNames;
var cR = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Xn = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), di = {}, Nl = 0, C0 = function(e) {
  return e && (e.host || C0(e.parentNode));
}, lR = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = C0(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, uR = function(e, t, r, n) {
  var o = lR(t, Array.isArray(e) ? e : [e]);
  di[r] || (di[r] = /* @__PURE__ */ new WeakMap());
  var a = di[r], i = [], s = /* @__PURE__ */ new Set(), c = new Set(o), u = function(d) {
    !d || s.has(d) || (s.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var l = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(p) {
      if (s.has(p))
        l(p);
      else
        try {
          var f = p.getAttribute(n), v = f !== null && f !== "false", h = (Xn.get(p) || 0) + 1, g = (a.get(p) || 0) + 1;
          Xn.set(p, h), a.set(p, g), i.push(p), h === 1 && v && ui.set(p, !0), g === 1 && p.setAttribute(r, "true"), v || p.setAttribute(n, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", p, y);
        }
    });
  };
  return l(t), s.clear(), Nl++, function() {
    i.forEach(function(d) {
      var p = Xn.get(d) - 1, f = a.get(d) - 1;
      Xn.set(d, p), a.set(d, f), p || (ui.has(d) || d.removeAttribute(n), ui.delete(d)), f || d.removeAttribute(r);
    }), Nl--, Nl || (Xn = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), di = {});
  };
}, Gf = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = cR(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live], script"))), uR(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, ec = "Dialog", [T0] = Et(ec), [dR, rr] = T0(ec), _0 = (e) => {
  const {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: a,
    modal: i = !0
  } = e, s = m.useRef(null), c = m.useRef(null), [u, l] = qt({
    prop: n,
    defaultProp: o ?? !1,
    onChange: a,
    caller: ec
  });
  return /* @__PURE__ */ b(
    dR,
    {
      scope: t,
      triggerRef: s,
      contentRef: c,
      contentId: Nt(),
      titleId: Nt(),
      descriptionId: Nt(),
      open: u,
      onOpenChange: l,
      onOpenToggle: m.useCallback(() => l((d) => !d), [l]),
      modal: i,
      children: r
    }
  );
};
_0.displayName = ec;
var k0 = "DialogTrigger", N0 = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = rr(k0, r), a = de(t, o.triggerRef);
    return /* @__PURE__ */ b(
      ne.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Zf(o.open),
        ...n,
        ref: a,
        onClick: q(e.onClick, o.onOpenToggle)
      }
    );
  }
);
N0.displayName = k0;
var Yf = "DialogPortal", [fR, R0] = T0(Yf, {
  forceMount: void 0
}), M0 = (e) => {
  const { __scopeDialog: t, forceMount: r, children: n, container: o } = e, a = rr(Yf, t);
  return /* @__PURE__ */ b(fR, { scope: t, forceMount: r, children: m.Children.map(n, (i) => /* @__PURE__ */ b(jt, { present: r || a.open, children: /* @__PURE__ */ b(Oa, { asChild: !0, container: o, children: i }) })) });
};
M0.displayName = Yf;
var Gi = "DialogOverlay", I0 = m.forwardRef(
  (e, t) => {
    const r = R0(Gi, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = rr(Gi, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ b(jt, { present: n || a.open, children: /* @__PURE__ */ b(hR, { ...o, ref: t }) }) : null;
  }
);
I0.displayName = Gi;
var pR = /* @__PURE__ */ Cn("DialogOverlay.RemoveScroll"), hR = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = rr(Gi, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ b(Qs, { as: pR, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ b(
        ne.div,
        {
          "data-state": Zf(o.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), Tn = "DialogContent", D0 = m.forwardRef(
  (e, t) => {
    const r = R0(Tn, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = rr(Tn, e.__scopeDialog);
    return /* @__PURE__ */ b(jt, { present: n || a.open, children: a.modal ? /* @__PURE__ */ b(mR, { ...o, ref: t }) : /* @__PURE__ */ b(vR, { ...o, ref: t }) });
  }
);
D0.displayName = Tn;
var mR = m.forwardRef(
  (e, t) => {
    const r = rr(Tn, e.__scopeDialog), n = m.useRef(null), o = de(t, r.contentRef, n);
    return m.useEffect(() => {
      const a = n.current;
      if (a) return Gf(a);
    }, []), /* @__PURE__ */ b(
      j0,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: q(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: q(e.onPointerDownOutside, (a) => {
          const i = a.detail.originalEvent, s = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || s) && a.preventDefault();
        }),
        onFocusOutside: q(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), vR = m.forwardRef(
  (e, t) => {
    const r = rr(Tn, e.__scopeDialog), n = m.useRef(!1), o = m.useRef(!1);
    return /* @__PURE__ */ b(
      j0,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          e.onCloseAutoFocus?.(a), a.defaultPrevented || (n.current || r.triggerRef.current?.focus(), a.preventDefault()), n.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          e.onInteractOutside?.(a), a.defaultPrevented || (n.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const i = a.target;
          r.triggerRef.current?.contains(i) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), j0 = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: o, onCloseAutoFocus: a, ...i } = e, s = rr(Tn, r), c = m.useRef(null), u = de(t, c);
    return Hf(), /* @__PURE__ */ U(yt, { children: [
      /* @__PURE__ */ b(
        Zs,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ b(
            bo,
            {
              role: "dialog",
              id: s.contentId,
              "aria-describedby": s.descriptionId,
              "aria-labelledby": s.titleId,
              "data-state": Zf(s.open),
              ...i,
              ref: u,
              onDismiss: () => s.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ U(yt, { children: [
        /* @__PURE__ */ b(gR, { titleId: s.titleId }),
        /* @__PURE__ */ b(bR, { contentRef: c, descriptionId: s.descriptionId })
      ] })
    ] });
  }
), Xf = "DialogTitle", L0 = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = rr(Xf, r);
    return /* @__PURE__ */ b(ne.h2, { id: o.titleId, ...n, ref: t });
  }
);
L0.displayName = Xf;
var $0 = "DialogDescription", B0 = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = rr($0, r);
    return /* @__PURE__ */ b(ne.p, { id: o.descriptionId, ...n, ref: t });
  }
);
B0.displayName = $0;
var F0 = "DialogClose", z0 = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = rr(F0, r);
    return /* @__PURE__ */ b(
      ne.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: q(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
z0.displayName = F0;
function Zf(e) {
  return e ? "open" : "closed";
}
var U0 = "DialogTitleWarning", [p7, W0] = Hk(U0, {
  contentName: Tn,
  titleName: Xf,
  docsSlug: "dialog"
}), gR = ({ titleId: e }) => {
  const t = W0(U0), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return m.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, yR = "DialogDescriptionWarning", bR = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${W0(yR).contentName}}.`;
  return m.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, K0 = _0, V0 = N0, q0 = M0, tc = I0, rc = D0, nc = L0, oc = B0, ac = z0;
const wR = K0, h7 = V0, xR = q0, m7 = ac, H0 = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  tc,
  {
    ref: r,
    className: V(
      "fixed inset-0 z-[200] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
H0.displayName = tc.displayName;
const ER = vo(
  "fixed left-[50%] top-[50%] z-[201] grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        full: "max-w-[95vw]"
      }
    },
    defaultVariants: {
      size: "lg"
    }
  }
), G0 = m.forwardRef(({ className: e, children: t, size: r, ...n }, o) => /* @__PURE__ */ U(xR, { children: [
  /* @__PURE__ */ b(H0, {}),
  /* @__PURE__ */ U(
    rc,
    {
      ref: o,
      className: V(ER({ size: r }), e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ U(ac, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ b(Uf, { className: "h-4 w-4" }),
          /* @__PURE__ */ b("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
G0.displayName = rc.displayName;
const Y0 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ b(
  "div",
  {
    className: V(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
Y0.displayName = "ModalHeader";
const X0 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ b(
  "div",
  {
    className: V(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
X0.displayName = "ModalFooter";
const Z0 = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  nc,
  {
    ref: r,
    className: V(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
Z0.displayName = nc.displayName;
const J0 = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  oc,
  {
    ref: r,
    className: V("text-sm text-muted-foreground", e),
    ...t
  }
));
J0.displayName = oc.displayName;
const SR = m.forwardRef(
  ({
    open: e,
    onOpenChange: t,
    title: r = "Confirmar ação",
    description: n = "Tem certeza que deseja continuar?",
    confirmText: o = "Confirmar",
    cancelText: a = "Cancelar",
    onConfirm: i,
    onCancel: s,
    variant: c = "primary",
    loading: u = !1
  }, l) => /* @__PURE__ */ b(wR, { open: e, onOpenChange: t, children: /* @__PURE__ */ U(G0, { ref: l, children: [
    /* @__PURE__ */ U(Y0, { children: [
      /* @__PURE__ */ b(Z0, { children: r }),
      n && /* @__PURE__ */ b(J0, { children: n })
    ] }),
    /* @__PURE__ */ U(X0, { children: [
      /* @__PURE__ */ b(Gr, { variant: "outline", onClick: () => {
        s?.(), t?.(!1);
      }, disabled: u, children: a }),
      /* @__PURE__ */ b(Gr, { variant: c, onClick: () => {
        i?.();
      }, loading: u, children: o })
    ] })
  ] }) })
);
SR.displayName = "ConfirmModal";
function ic(e) {
  const t = e + "CollectionProvider", [r, n] = Et(t), [o, a] = r(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (h) => {
    const { scope: g, children: y } = h, w = At.useRef(null), x = At.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ b(o, { scope: g, itemMap: x, collectionRef: w, children: y });
  };
  i.displayName = t;
  const s = e + "CollectionSlot", c = /* @__PURE__ */ Cn(s), u = At.forwardRef(
    (h, g) => {
      const { scope: y, children: w } = h, x = a(s, y), S = de(g, x.collectionRef);
      return /* @__PURE__ */ b(c, { ref: S, children: w });
    }
  );
  u.displayName = s;
  const l = e + "CollectionItemSlot", d = "data-radix-collection-item", p = /* @__PURE__ */ Cn(l), f = At.forwardRef(
    (h, g) => {
      const { scope: y, children: w, ...x } = h, S = At.useRef(null), E = de(g, S), O = a(l, y);
      return At.useEffect(() => (O.itemMap.set(S, { ref: S, ...x }), () => void O.itemMap.delete(S))), /* @__PURE__ */ b(p, { [d]: "", ref: E, children: w });
    }
  );
  f.displayName = l;
  function v(h) {
    const g = a(e + "CollectionConsumer", h);
    return At.useCallback(() => {
      const w = g.collectionRef.current;
      if (!w) return [];
      const x = Array.from(w.querySelectorAll(`[${d}]`));
      return Array.from(g.itemMap.values()).sort(
        (O, P) => x.indexOf(O.ref.current) - x.indexOf(P.ref.current)
      );
    }, [g.collectionRef, g.itemMap]);
  }
  return [
    { Provider: i, Slot: u, ItemSlot: f },
    v,
    n
  ];
}
var OR = m.createContext(void 0);
function Pa(e) {
  const t = m.useContext(OR);
  return e || t || "ltr";
}
const PR = ["top", "right", "bottom", "left"], Jr = Math.min, Tt = Math.max, Yi = Math.round, fi = Math.floor, lr = (e) => ({
  x: e,
  y: e
}), AR = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, CR = {
  start: "end",
  end: "start"
};
function Pd(e, t, r) {
  return Tt(e, Jr(t, r));
}
function Tr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function _r(e) {
  return e.split("-")[0];
}
function wo(e) {
  return e.split("-")[1];
}
function Jf(e) {
  return e === "x" ? "y" : "x";
}
function Qf(e) {
  return e === "y" ? "height" : "width";
}
const TR = /* @__PURE__ */ new Set(["top", "bottom"]);
function sr(e) {
  return TR.has(_r(e)) ? "y" : "x";
}
function ep(e) {
  return Jf(sr(e));
}
function _R(e, t, r) {
  r === void 0 && (r = !1);
  const n = wo(e), o = ep(e), a = Qf(o);
  let i = o === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (i = Xi(i)), [i, Xi(i)];
}
function kR(e) {
  const t = Xi(e);
  return [Ad(e), t, Ad(t)];
}
function Ad(e) {
  return e.replace(/start|end/g, (t) => CR[t]);
}
const Qm = ["left", "right"], ev = ["right", "left"], NR = ["top", "bottom"], RR = ["bottom", "top"];
function MR(e, t, r) {
  switch (e) {
    case "top":
    case "bottom":
      return r ? t ? ev : Qm : t ? Qm : ev;
    case "left":
    case "right":
      return t ? NR : RR;
    default:
      return [];
  }
}
function IR(e, t, r, n) {
  const o = wo(e);
  let a = MR(_r(e), r === "start", n);
  return o && (a = a.map((i) => i + "-" + o), t && (a = a.concat(a.map(Ad)))), a;
}
function Xi(e) {
  return e.replace(/left|right|bottom|top/g, (t) => AR[t]);
}
function DR(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Q0(e) {
  return typeof e != "number" ? DR(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Zi(e) {
  const {
    x: t,
    y: r,
    width: n,
    height: o
  } = e;
  return {
    width: n,
    height: o,
    top: r,
    left: t,
    right: t + n,
    bottom: r + o,
    x: t,
    y: r
  };
}
function tv(e, t, r) {
  let {
    reference: n,
    floating: o
  } = e;
  const a = sr(t), i = ep(t), s = Qf(i), c = _r(t), u = a === "y", l = n.x + n.width / 2 - o.width / 2, d = n.y + n.height / 2 - o.height / 2, p = n[s] / 2 - o[s] / 2;
  let f;
  switch (c) {
    case "top":
      f = {
        x: l,
        y: n.y - o.height
      };
      break;
    case "bottom":
      f = {
        x: l,
        y: n.y + n.height
      };
      break;
    case "right":
      f = {
        x: n.x + n.width,
        y: d
      };
      break;
    case "left":
      f = {
        x: n.x - o.width,
        y: d
      };
      break;
    default:
      f = {
        x: n.x,
        y: n.y
      };
  }
  switch (wo(t)) {
    case "start":
      f[i] -= p * (r && u ? -1 : 1);
      break;
    case "end":
      f[i] += p * (r && u ? -1 : 1);
      break;
  }
  return f;
}
const jR = async (e, t, r) => {
  const {
    placement: n = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: i
  } = r, s = a.filter(Boolean), c = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let u = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: l,
    y: d
  } = tv(u, n, c), p = n, f = {}, v = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: g,
      fn: y
    } = s[h], {
      x: w,
      y: x,
      data: S,
      reset: E
    } = await y({
      x: l,
      y: d,
      initialPlacement: n,
      placement: p,
      strategy: o,
      middlewareData: f,
      rects: u,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = w ?? l, d = x ?? d, f = {
      ...f,
      [g]: {
        ...f[g],
        ...S
      }
    }, E && v <= 50 && (v++, typeof E == "object" && (E.placement && (p = E.placement), E.rects && (u = E.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : E.rects), {
      x: l,
      y: d
    } = tv(u, p, c)), h = -1);
  }
  return {
    x: l,
    y: d,
    placement: p,
    strategy: o,
    middlewareData: f
  };
};
async function oa(e, t) {
  var r;
  t === void 0 && (t = {});
  const {
    x: n,
    y: o,
    platform: a,
    rects: i,
    elements: s,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: d = "floating",
    altBoundary: p = !1,
    padding: f = 0
  } = Tr(t, e), v = Q0(f), g = s[p ? d === "floating" ? "reference" : "floating" : d], y = Zi(await a.getClippingRect({
    element: (r = await (a.isElement == null ? void 0 : a.isElement(g))) == null || r ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: l,
    strategy: c
  })), w = d === "floating" ? {
    x: n,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), S = await (a.isElement == null ? void 0 : a.isElement(x)) ? await (a.getScale == null ? void 0 : a.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Zi(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: x,
    strategy: c
  }) : w);
  return {
    top: (y.top - E.top + v.top) / S.y,
    bottom: (E.bottom - y.bottom + v.bottom) / S.y,
    left: (y.left - E.left + v.left) / S.x,
    right: (E.right - y.right + v.right) / S.x
  };
}
const LR = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: r,
      y: n,
      placement: o,
      rects: a,
      platform: i,
      elements: s,
      middlewareData: c
    } = t, {
      element: u,
      padding: l = 0
    } = Tr(e, t) || {};
    if (u == null)
      return {};
    const d = Q0(l), p = {
      x: r,
      y: n
    }, f = ep(o), v = Qf(f), h = await i.getDimensions(u), g = f === "y", y = g ? "top" : "left", w = g ? "bottom" : "right", x = g ? "clientHeight" : "clientWidth", S = a.reference[v] + a.reference[f] - p[f] - a.floating[v], E = p[f] - a.reference[f], O = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
    let P = O ? O[x] : 0;
    (!P || !await (i.isElement == null ? void 0 : i.isElement(O))) && (P = s.floating[x] || a.floating[v]);
    const A = S / 2 - E / 2, _ = P / 2 - h[v] / 2 - 1, N = Jr(d[y], _), T = Jr(d[w], _), R = N, j = P - h[v] - T, C = P / 2 - h[v] / 2 + A, D = Pd(R, C, j), $ = !c.arrow && wo(o) != null && C !== D && a.reference[v] / 2 - (C < R ? N : T) - h[v] / 2 < 0, z = $ ? C < R ? C - R : C - j : 0;
    return {
      [f]: p[f] + z,
      data: {
        [f]: D,
        centerOffset: C - D - z,
        ...$ && {
          alignmentOffset: z
        }
      },
      reset: $
    };
  }
}), $R = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        middlewareData: a,
        rects: i,
        initialPlacement: s,
        platform: c,
        elements: u
      } = t, {
        mainAxis: l = !0,
        crossAxis: d = !0,
        fallbackPlacements: p,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: h = !0,
        ...g
      } = Tr(e, t);
      if ((r = a.arrow) != null && r.alignmentOffset)
        return {};
      const y = _r(o), w = sr(s), x = _r(s) === s, S = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = p || (x || !h ? [Xi(s)] : kR(s)), O = v !== "none";
      !p && O && E.push(...IR(s, h, v, S));
      const P = [s, ...E], A = await oa(t, g), _ = [];
      let N = ((n = a.flip) == null ? void 0 : n.overflows) || [];
      if (l && _.push(A[y]), d) {
        const C = _R(o, i, S);
        _.push(A[C[0]], A[C[1]]);
      }
      if (N = [...N, {
        placement: o,
        overflows: _
      }], !_.every((C) => C <= 0)) {
        var T, R;
        const C = (((T = a.flip) == null ? void 0 : T.index) || 0) + 1, D = P[C];
        if (D && (!(d === "alignment" ? w !== sr(D) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        N.every((I) => sr(I.placement) === w ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: C,
              overflows: N
            },
            reset: {
              placement: D
            }
          };
        let $ = (R = N.filter((z) => z.overflows[0] <= 0).sort((z, I) => z.overflows[1] - I.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!$)
          switch (f) {
            case "bestFit": {
              var j;
              const z = (j = N.filter((I) => {
                if (O) {
                  const F = sr(I.placement);
                  return F === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((F) => F > 0).reduce((F, oe) => F + oe, 0)]).sort((I, F) => I[1] - F[1])[0]) == null ? void 0 : j[0];
              z && ($ = z);
              break;
            }
            case "initialPlacement":
              $ = s;
              break;
          }
        if (o !== $)
          return {
            reset: {
              placement: $
            }
          };
      }
      return {};
    }
  };
};
function rv(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function nv(e) {
  return PR.some((t) => e[t] >= 0);
}
const BR = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: r
      } = t, {
        strategy: n = "referenceHidden",
        ...o
      } = Tr(e, t);
      switch (n) {
        case "referenceHidden": {
          const a = await oa(t, {
            ...o,
            elementContext: "reference"
          }), i = rv(a, r.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: nv(i)
            }
          };
        }
        case "escaped": {
          const a = await oa(t, {
            ...o,
            altBoundary: !0
          }), i = rv(a, r.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: nv(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ex = /* @__PURE__ */ new Set(["left", "top"]);
async function FR(e, t) {
  const {
    placement: r,
    platform: n,
    elements: o
  } = e, a = await (n.isRTL == null ? void 0 : n.isRTL(o.floating)), i = _r(r), s = wo(r), c = sr(r) === "y", u = ex.has(i) ? -1 : 1, l = a && c ? -1 : 1, d = Tr(t, e);
  let {
    mainAxis: p,
    crossAxis: f,
    alignmentAxis: v
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return s && typeof v == "number" && (f = s === "end" ? v * -1 : v), c ? {
    x: f * l,
    y: p * u
  } : {
    x: p * u,
    y: f * l
  };
}
const zR = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var r, n;
      const {
        x: o,
        y: a,
        placement: i,
        middlewareData: s
      } = t, c = await FR(t, e);
      return i === ((r = s.offset) == null ? void 0 : r.placement) && (n = s.arrow) != null && n.alignmentOffset ? {} : {
        x: o + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: i
        }
      };
    }
  };
}, UR = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: n,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: s = {
          fn: (g) => {
            let {
              x: y,
              y: w
            } = g;
            return {
              x: y,
              y: w
            };
          }
        },
        ...c
      } = Tr(e, t), u = {
        x: r,
        y: n
      }, l = await oa(t, c), d = sr(_r(o)), p = Jf(d);
      let f = u[p], v = u[d];
      if (a) {
        const g = p === "y" ? "top" : "left", y = p === "y" ? "bottom" : "right", w = f + l[g], x = f - l[y];
        f = Pd(w, f, x);
      }
      if (i) {
        const g = d === "y" ? "top" : "left", y = d === "y" ? "bottom" : "right", w = v + l[g], x = v - l[y];
        v = Pd(w, v, x);
      }
      const h = s.fn({
        ...t,
        [p]: f,
        [d]: v
      });
      return {
        ...h,
        data: {
          x: h.x - r,
          y: h.y - n,
          enabled: {
            [p]: a,
            [d]: i
          }
        }
      };
    }
  };
}, WR = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: r,
        y: n,
        placement: o,
        rects: a,
        middlewareData: i
      } = t, {
        offset: s = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = Tr(e, t), l = {
        x: r,
        y: n
      }, d = sr(o), p = Jf(d);
      let f = l[p], v = l[d];
      const h = Tr(s, t), g = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const x = p === "y" ? "height" : "width", S = a.reference[p] - a.floating[x] + g.mainAxis, E = a.reference[p] + a.reference[x] - g.mainAxis;
        f < S ? f = S : f > E && (f = E);
      }
      if (u) {
        var y, w;
        const x = p === "y" ? "width" : "height", S = ex.has(_r(o)), E = a.reference[d] - a.floating[x] + (S && ((y = i.offset) == null ? void 0 : y[d]) || 0) + (S ? 0 : g.crossAxis), O = a.reference[d] + a.reference[x] + (S ? 0 : ((w = i.offset) == null ? void 0 : w[d]) || 0) - (S ? g.crossAxis : 0);
        v < E ? v = E : v > O && (v = O);
      }
      return {
        [p]: f,
        [d]: v
      };
    }
  };
}, KR = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        rects: a,
        platform: i,
        elements: s
      } = t, {
        apply: c = () => {
        },
        ...u
      } = Tr(e, t), l = await oa(t, u), d = _r(o), p = wo(o), f = sr(o) === "y", {
        width: v,
        height: h
      } = a.floating;
      let g, y;
      d === "top" || d === "bottom" ? (g = d, y = p === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (y = d, g = p === "end" ? "top" : "bottom");
      const w = h - l.top - l.bottom, x = v - l.left - l.right, S = Jr(h - l[g], w), E = Jr(v - l[y], x), O = !t.middlewareData.shift;
      let P = S, A = E;
      if ((r = t.middlewareData.shift) != null && r.enabled.x && (A = x), (n = t.middlewareData.shift) != null && n.enabled.y && (P = w), O && !p) {
        const N = Tt(l.left, 0), T = Tt(l.right, 0), R = Tt(l.top, 0), j = Tt(l.bottom, 0);
        f ? A = v - 2 * (N !== 0 || T !== 0 ? N + T : Tt(l.left, l.right)) : P = h - 2 * (R !== 0 || j !== 0 ? R + j : Tt(l.top, l.bottom));
      }
      await c({
        ...t,
        availableWidth: A,
        availableHeight: P
      });
      const _ = await i.getDimensions(s.floating);
      return v !== _.width || h !== _.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function sc() {
  return typeof window < "u";
}
function xo(e) {
  return tx(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Rt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function gr(e) {
  var t;
  return (t = (tx(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function tx(e) {
  return sc() ? e instanceof Node || e instanceof Rt(e).Node : !1;
}
function Jt(e) {
  return sc() ? e instanceof Element || e instanceof Rt(e).Element : !1;
}
function fr(e) {
  return sc() ? e instanceof HTMLElement || e instanceof Rt(e).HTMLElement : !1;
}
function ov(e) {
  return !sc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Rt(e).ShadowRoot;
}
const VR = /* @__PURE__ */ new Set(["inline", "contents"]);
function Aa(e) {
  const {
    overflow: t,
    overflowX: r,
    overflowY: n,
    display: o
  } = Qt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + r) && !VR.has(o);
}
const qR = /* @__PURE__ */ new Set(["table", "td", "th"]);
function HR(e) {
  return qR.has(xo(e));
}
const GR = [":popover-open", ":modal"];
function cc(e) {
  return GR.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const YR = ["transform", "translate", "scale", "rotate", "perspective"], XR = ["transform", "translate", "scale", "rotate", "perspective", "filter"], ZR = ["paint", "layout", "strict", "content"];
function tp(e) {
  const t = rp(), r = Jt(e) ? Qt(e) : e;
  return YR.some((n) => r[n] ? r[n] !== "none" : !1) || (r.containerType ? r.containerType !== "normal" : !1) || !t && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !t && (r.filter ? r.filter !== "none" : !1) || XR.some((n) => (r.willChange || "").includes(n)) || ZR.some((n) => (r.contain || "").includes(n));
}
function JR(e) {
  let t = Qr(e);
  for (; fr(t) && !ao(t); ) {
    if (tp(t))
      return t;
    if (cc(t))
      return null;
    t = Qr(t);
  }
  return null;
}
function rp() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const QR = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ao(e) {
  return QR.has(xo(e));
}
function Qt(e) {
  return Rt(e).getComputedStyle(e);
}
function lc(e) {
  return Jt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Qr(e) {
  if (xo(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ov(e) && e.host || // Fallback.
    gr(e)
  );
  return ov(t) ? t.host : t;
}
function rx(e) {
  const t = Qr(e);
  return ao(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : fr(t) && Aa(t) ? t : rx(t);
}
function aa(e, t, r) {
  var n;
  t === void 0 && (t = []), r === void 0 && (r = !0);
  const o = rx(e), a = o === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Rt(o);
  if (a) {
    const s = Cd(i);
    return t.concat(i, i.visualViewport || [], Aa(o) ? o : [], s && r ? aa(s) : []);
  }
  return t.concat(o, aa(o, [], r));
}
function Cd(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function nx(e) {
  const t = Qt(e);
  let r = parseFloat(t.width) || 0, n = parseFloat(t.height) || 0;
  const o = fr(e), a = o ? e.offsetWidth : r, i = o ? e.offsetHeight : n, s = Yi(r) !== a || Yi(n) !== i;
  return s && (r = a, n = i), {
    width: r,
    height: n,
    $: s
  };
}
function np(e) {
  return Jt(e) ? e : e.contextElement;
}
function to(e) {
  const t = np(e);
  if (!fr(t))
    return lr(1);
  const r = t.getBoundingClientRect(), {
    width: n,
    height: o,
    $: a
  } = nx(t);
  let i = (a ? Yi(r.width) : r.width) / n, s = (a ? Yi(r.height) : r.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: i,
    y: s
  };
}
const eM = /* @__PURE__ */ lr(0);
function ox(e) {
  const t = Rt(e);
  return !rp() || !t.visualViewport ? eM : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function tM(e, t, r) {
  return t === void 0 && (t = !1), !r || t && r !== Rt(e) ? !1 : t;
}
function _n(e, t, r, n) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const o = e.getBoundingClientRect(), a = np(e);
  let i = lr(1);
  t && (n ? Jt(n) && (i = to(n)) : i = to(e));
  const s = tM(a, r, n) ? ox(a) : lr(0);
  let c = (o.left + s.x) / i.x, u = (o.top + s.y) / i.y, l = o.width / i.x, d = o.height / i.y;
  if (a) {
    const p = Rt(a), f = n && Jt(n) ? Rt(n) : n;
    let v = p, h = Cd(v);
    for (; h && n && f !== v; ) {
      const g = to(h), y = h.getBoundingClientRect(), w = Qt(h), x = y.left + (h.clientLeft + parseFloat(w.paddingLeft)) * g.x, S = y.top + (h.clientTop + parseFloat(w.paddingTop)) * g.y;
      c *= g.x, u *= g.y, l *= g.x, d *= g.y, c += x, u += S, v = Rt(h), h = Cd(v);
    }
  }
  return Zi({
    width: l,
    height: d,
    x: c,
    y: u
  });
}
function uc(e, t) {
  const r = lc(e).scrollLeft;
  return t ? t.left + r : _n(gr(e)).left + r;
}
function ax(e, t) {
  const r = e.getBoundingClientRect(), n = r.left + t.scrollLeft - uc(e, r), o = r.top + t.scrollTop;
  return {
    x: n,
    y: o
  };
}
function rM(e) {
  let {
    elements: t,
    rect: r,
    offsetParent: n,
    strategy: o
  } = e;
  const a = o === "fixed", i = gr(n), s = t ? cc(t.floating) : !1;
  if (n === i || s && a)
    return r;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = lr(1);
  const l = lr(0), d = fr(n);
  if ((d || !d && !a) && ((xo(n) !== "body" || Aa(i)) && (c = lc(n)), fr(n))) {
    const f = _n(n);
    u = to(n), l.x = f.x + n.clientLeft, l.y = f.y + n.clientTop;
  }
  const p = i && !d && !a ? ax(i, c) : lr(0);
  return {
    width: r.width * u.x,
    height: r.height * u.y,
    x: r.x * u.x - c.scrollLeft * u.x + l.x + p.x,
    y: r.y * u.y - c.scrollTop * u.y + l.y + p.y
  };
}
function nM(e) {
  return Array.from(e.getClientRects());
}
function oM(e) {
  const t = gr(e), r = lc(e), n = e.ownerDocument.body, o = Tt(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), a = Tt(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let i = -r.scrollLeft + uc(e);
  const s = -r.scrollTop;
  return Qt(n).direction === "rtl" && (i += Tt(t.clientWidth, n.clientWidth) - o), {
    width: o,
    height: a,
    x: i,
    y: s
  };
}
const av = 25;
function aM(e, t) {
  const r = Rt(e), n = gr(e), o = r.visualViewport;
  let a = n.clientWidth, i = n.clientHeight, s = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    const l = rp();
    (!l || l && t === "fixed") && (s = o.offsetLeft, c = o.offsetTop);
  }
  const u = uc(n);
  if (u <= 0) {
    const l = n.ownerDocument, d = l.body, p = getComputedStyle(d), f = l.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, v = Math.abs(n.clientWidth - d.clientWidth - f);
    v <= av && (a -= v);
  } else u <= av && (a += u);
  return {
    width: a,
    height: i,
    x: s,
    y: c
  };
}
const iM = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function sM(e, t) {
  const r = _n(e, !0, t === "fixed"), n = r.top + e.clientTop, o = r.left + e.clientLeft, a = fr(e) ? to(e) : lr(1), i = e.clientWidth * a.x, s = e.clientHeight * a.y, c = o * a.x, u = n * a.y;
  return {
    width: i,
    height: s,
    x: c,
    y: u
  };
}
function iv(e, t, r) {
  let n;
  if (t === "viewport")
    n = aM(e, r);
  else if (t === "document")
    n = oM(gr(e));
  else if (Jt(t))
    n = sM(t, r);
  else {
    const o = ox(e);
    n = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Zi(n);
}
function ix(e, t) {
  const r = Qr(e);
  return r === t || !Jt(r) || ao(r) ? !1 : Qt(r).position === "fixed" || ix(r, t);
}
function cM(e, t) {
  const r = t.get(e);
  if (r)
    return r;
  let n = aa(e, [], !1).filter((s) => Jt(s) && xo(s) !== "body"), o = null;
  const a = Qt(e).position === "fixed";
  let i = a ? Qr(e) : e;
  for (; Jt(i) && !ao(i); ) {
    const s = Qt(i), c = tp(i);
    !c && s.position === "fixed" && (o = null), (a ? !c && !o : !c && s.position === "static" && !!o && iM.has(o.position) || Aa(i) && !c && ix(e, i)) ? n = n.filter((l) => l !== i) : o = s, i = Qr(i);
  }
  return t.set(e, n), n;
}
function lM(e) {
  let {
    element: t,
    boundary: r,
    rootBoundary: n,
    strategy: o
  } = e;
  const i = [...r === "clippingAncestors" ? cc(t) ? [] : cM(t, this._c) : [].concat(r), n], s = i[0], c = i.reduce((u, l) => {
    const d = iv(t, l, o);
    return u.top = Tt(d.top, u.top), u.right = Jr(d.right, u.right), u.bottom = Jr(d.bottom, u.bottom), u.left = Tt(d.left, u.left), u;
  }, iv(t, s, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function uM(e) {
  const {
    width: t,
    height: r
  } = nx(e);
  return {
    width: t,
    height: r
  };
}
function dM(e, t, r) {
  const n = fr(t), o = gr(t), a = r === "fixed", i = _n(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = lr(0);
  function u() {
    c.x = uc(o);
  }
  if (n || !n && !a)
    if ((xo(t) !== "body" || Aa(o)) && (s = lc(t)), n) {
      const f = _n(t, !0, a, t);
      c.x = f.x + t.clientLeft, c.y = f.y + t.clientTop;
    } else o && u();
  a && !n && o && u();
  const l = o && !n && !a ? ax(o, s) : lr(0), d = i.left + s.scrollLeft - c.x - l.x, p = i.top + s.scrollTop - c.y - l.y;
  return {
    x: d,
    y: p,
    width: i.width,
    height: i.height
  };
}
function Rl(e) {
  return Qt(e).position === "static";
}
function sv(e, t) {
  if (!fr(e) || Qt(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let r = e.offsetParent;
  return gr(e) === r && (r = r.ownerDocument.body), r;
}
function sx(e, t) {
  const r = Rt(e);
  if (cc(e))
    return r;
  if (!fr(e)) {
    let o = Qr(e);
    for (; o && !ao(o); ) {
      if (Jt(o) && !Rl(o))
        return o;
      o = Qr(o);
    }
    return r;
  }
  let n = sv(e, t);
  for (; n && HR(n) && Rl(n); )
    n = sv(n, t);
  return n && ao(n) && Rl(n) && !tp(n) ? r : n || JR(e) || r;
}
const fM = async function(e) {
  const t = this.getOffsetParent || sx, r = this.getDimensions, n = await r(e.floating);
  return {
    reference: dM(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: n.width,
      height: n.height
    }
  };
};
function pM(e) {
  return Qt(e).direction === "rtl";
}
const hM = {
  convertOffsetParentRelativeRectToViewportRelativeRect: rM,
  getDocumentElement: gr,
  getClippingRect: lM,
  getOffsetParent: sx,
  getElementRects: fM,
  getClientRects: nM,
  getDimensions: uM,
  getScale: to,
  isElement: Jt,
  isRTL: pM
};
function cx(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function mM(e, t) {
  let r = null, n;
  const o = gr(e);
  function a() {
    var s;
    clearTimeout(n), (s = r) == null || s.disconnect(), r = null;
  }
  function i(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), a();
    const u = e.getBoundingClientRect(), {
      left: l,
      top: d,
      width: p,
      height: f
    } = u;
    if (s || t(), !p || !f)
      return;
    const v = fi(d), h = fi(o.clientWidth - (l + p)), g = fi(o.clientHeight - (d + f)), y = fi(l), x = {
      rootMargin: -v + "px " + -h + "px " + -g + "px " + -y + "px",
      threshold: Tt(0, Jr(1, c)) || 1
    };
    let S = !0;
    function E(O) {
      const P = O[0].intersectionRatio;
      if (P !== c) {
        if (!S)
          return i();
        P ? i(!1, P) : n = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      P === 1 && !cx(u, e.getBoundingClientRect()) && i(), S = !1;
    }
    try {
      r = new IntersectionObserver(E, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(E, x);
    }
    r.observe(e);
  }
  return i(!0), a;
}
function vM(e, t, r, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = n, u = np(e), l = o || a ? [...u ? aa(u) : [], ...aa(t)] : [];
  l.forEach((y) => {
    o && y.addEventListener("scroll", r, {
      passive: !0
    }), a && y.addEventListener("resize", r);
  });
  const d = u && s ? mM(u, r) : null;
  let p = -1, f = null;
  i && (f = new ResizeObserver((y) => {
    let [w] = y;
    w && w.target === u && f && (f.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var x;
      (x = f) == null || x.observe(t);
    })), r();
  }), u && !c && f.observe(u), f.observe(t));
  let v, h = c ? _n(e) : null;
  c && g();
  function g() {
    const y = _n(e);
    h && !cx(h, y) && r(), h = y, v = requestAnimationFrame(g);
  }
  return r(), () => {
    var y;
    l.forEach((w) => {
      o && w.removeEventListener("scroll", r), a && w.removeEventListener("resize", r);
    }), d?.(), (y = f) == null || y.disconnect(), f = null, c && cancelAnimationFrame(v);
  };
}
const gM = zR, yM = UR, bM = $R, wM = KR, xM = BR, cv = LR, EM = WR, SM = (e, t, r) => {
  const n = /* @__PURE__ */ new Map(), o = {
    platform: hM,
    ...r
  }, a = {
    ...o.platform,
    _c: n
  };
  return jR(e, t, {
    ...o,
    platform: a
  });
};
var OM = typeof document < "u", PM = function() {
}, $i = OM ? dr : PM;
function Ji(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let r, n, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (r = e.length, r !== t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!Ji(e[n], t[n]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length)
      return !1;
    for (n = r; n-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[n]))
        return !1;
    for (n = r; n-- !== 0; ) {
      const a = o[n];
      if (!(a === "_owner" && e.$$typeof) && !Ji(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function lx(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function lv(e, t) {
  const r = lx(e);
  return Math.round(t * r) / r;
}
function Ml(e) {
  const t = m.useRef(e);
  return $i(() => {
    t.current = e;
  }), t;
}
function AM(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: r = "absolute",
    middleware: n = [],
    platform: o,
    elements: {
      reference: a,
      floating: i
    } = {},
    transform: s = !0,
    whileElementsMounted: c,
    open: u
  } = e, [l, d] = m.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, f] = m.useState(n);
  Ji(p, n) || f(n);
  const [v, h] = m.useState(null), [g, y] = m.useState(null), w = m.useCallback((I) => {
    I !== O.current && (O.current = I, h(I));
  }, []), x = m.useCallback((I) => {
    I !== P.current && (P.current = I, y(I));
  }, []), S = a || v, E = i || g, O = m.useRef(null), P = m.useRef(null), A = m.useRef(l), _ = c != null, N = Ml(c), T = Ml(o), R = Ml(u), j = m.useCallback(() => {
    if (!O.current || !P.current)
      return;
    const I = {
      placement: t,
      strategy: r,
      middleware: p
    };
    T.current && (I.platform = T.current), SM(O.current, P.current, I).then((F) => {
      const oe = {
        ...F,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: R.current !== !1
      };
      C.current && !Ji(A.current, oe) && (A.current = oe, Sa.flushSync(() => {
        d(oe);
      }));
    });
  }, [p, t, r, T, R]);
  $i(() => {
    u === !1 && A.current.isPositioned && (A.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [u]);
  const C = m.useRef(!1);
  $i(() => (C.current = !0, () => {
    C.current = !1;
  }), []), $i(() => {
    if (S && (O.current = S), E && (P.current = E), S && E) {
      if (N.current)
        return N.current(S, E, j);
      j();
    }
  }, [S, E, j, N, _]);
  const D = m.useMemo(() => ({
    reference: O,
    floating: P,
    setReference: w,
    setFloating: x
  }), [w, x]), $ = m.useMemo(() => ({
    reference: S,
    floating: E
  }), [S, E]), z = m.useMemo(() => {
    const I = {
      position: r,
      left: 0,
      top: 0
    };
    if (!$.floating)
      return I;
    const F = lv($.floating, l.x), oe = lv($.floating, l.y);
    return s ? {
      ...I,
      transform: "translate(" + F + "px, " + oe + "px)",
      ...lx($.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: F,
      top: oe
    };
  }, [r, s, $.floating, l.x, l.y]);
  return m.useMemo(() => ({
    ...l,
    update: j,
    refs: D,
    elements: $,
    floatingStyles: z
  }), [l, j, D, $, z]);
}
const CM = (e) => {
  function t(r) {
    return {}.hasOwnProperty.call(r, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(r) {
      const {
        element: n,
        padding: o
      } = typeof e == "function" ? e(r) : e;
      return n && t(n) ? n.current != null ? cv({
        element: n.current,
        padding: o
      }).fn(r) : {} : n ? cv({
        element: n,
        padding: o
      }).fn(r) : {};
    }
  };
}, TM = (e, t) => ({
  ...gM(e),
  options: [e, t]
}), _M = (e, t) => ({
  ...yM(e),
  options: [e, t]
}), kM = (e, t) => ({
  ...EM(e),
  options: [e, t]
}), NM = (e, t) => ({
  ...bM(e),
  options: [e, t]
}), RM = (e, t) => ({
  ...wM(e),
  options: [e, t]
}), MM = (e, t) => ({
  ...xM(e),
  options: [e, t]
}), IM = (e, t) => ({
  ...CM(e),
  options: [e, t]
});
var DM = "Arrow", ux = m.forwardRef((e, t) => {
  const { children: r, width: n = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ b(
    ne.svg,
    {
      ...a,
      ref: t,
      width: n,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? r : /* @__PURE__ */ b("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ux.displayName = DM;
var jM = ux, op = "Popper", [dx, Eo] = Et(op), [LM, fx] = dx(op), px = (e) => {
  const { __scopePopper: t, children: r } = e, [n, o] = m.useState(null);
  return /* @__PURE__ */ b(LM, { scope: t, anchor: n, onAnchorChange: o, children: r });
};
px.displayName = op;
var hx = "PopperAnchor", mx = m.forwardRef(
  (e, t) => {
    const { __scopePopper: r, virtualRef: n, ...o } = e, a = fx(hx, r), i = m.useRef(null), s = de(t, i), c = m.useRef(null);
    return m.useEffect(() => {
      const u = c.current;
      c.current = n?.current || i.current, u !== c.current && a.onAnchorChange(c.current);
    }), n ? null : /* @__PURE__ */ b(ne.div, { ...o, ref: s });
  }
);
mx.displayName = hx;
var ap = "PopperContent", [$M, BM] = dx(ap), vx = m.forwardRef(
  (e, t) => {
    const {
      __scopePopper: r,
      side: n = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: i = 0,
      arrowPadding: s = 0,
      avoidCollisions: c = !0,
      collisionBoundary: u = [],
      collisionPadding: l = 0,
      sticky: d = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: f = "optimized",
      onPlaced: v,
      ...h
    } = e, g = fx(ap, r), [y, w] = m.useState(null), x = de(t, (K) => w(K)), [S, E] = m.useState(null), O = Ys(S), P = O?.width ?? 0, A = O?.height ?? 0, _ = n + (a !== "center" ? "-" + a : ""), N = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l }, T = Array.isArray(u) ? u : [u], R = T.length > 0, j = {
      padding: N,
      boundary: T.filter(zM),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: R
    }, { refs: C, floatingStyles: D, placement: $, isPositioned: z, middlewareData: I } = AM({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: _,
      whileElementsMounted: (...K) => vM(...K, {
        animationFrame: f === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        TM({ mainAxis: o + A, alignmentAxis: i }),
        c && _M({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? kM() : void 0,
          ...j
        }),
        c && NM({ ...j }),
        RM({
          ...j,
          apply: ({ elements: K, rects: re, availableWidth: L, availableHeight: G }) => {
            const { width: Y, height: B } = re.reference, me = K.floating.style;
            me.setProperty("--radix-popper-available-width", `${L}px`), me.setProperty("--radix-popper-available-height", `${G}px`), me.setProperty("--radix-popper-anchor-width", `${Y}px`), me.setProperty("--radix-popper-anchor-height", `${B}px`);
          }
        }),
        S && IM({ element: S, padding: s }),
        UM({ arrowWidth: P, arrowHeight: A }),
        p && MM({ strategy: "referenceHidden", ...j })
      ]
    }), [F, oe] = bx($), H = pt(v);
    nt(() => {
      z && H?.();
    }, [z, H]);
    const ie = I.arrow?.x, ae = I.arrow?.y, W = I.arrow?.centerOffset !== 0, [te, se] = m.useState();
    return nt(() => {
      y && se(window.getComputedStyle(y).zIndex);
    }, [y]), /* @__PURE__ */ b(
      "div",
      {
        ref: C.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...D,
          transform: z ? D.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: te,
          "--radix-popper-transform-origin": [
            I.transformOrigin?.x,
            I.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...I.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ b(
          $M,
          {
            scope: r,
            placedSide: F,
            onArrowChange: E,
            arrowX: ie,
            arrowY: ae,
            shouldHideArrow: W,
            children: /* @__PURE__ */ b(
              ne.div,
              {
                "data-side": F,
                "data-align": oe,
                ...h,
                ref: x,
                style: {
                  ...h.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: z ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
vx.displayName = ap;
var gx = "PopperArrow", FM = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, yx = m.forwardRef(function(t, r) {
  const { __scopePopper: n, ...o } = t, a = BM(gx, n), i = FM[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ b(
      "span",
      {
        ref: a.onArrowChange,
        style: {
          position: "absolute",
          left: a.arrowX,
          top: a.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[a.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[a.placedSide],
          visibility: a.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ b(
          jM,
          {
            ...o,
            ref: r,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
yx.displayName = gx;
function zM(e) {
  return e !== null;
}
var UM = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: r, rects: n, middlewareData: o } = t, i = o.arrow?.centerOffset !== 0, s = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [u, l] = bx(r), d = { start: "0%", center: "50%", end: "100%" }[l], p = (o.arrow?.x ?? 0) + s / 2, f = (o.arrow?.y ?? 0) + c / 2;
    let v = "", h = "";
    return u === "bottom" ? (v = i ? d : `${p}px`, h = `${-c}px`) : u === "top" ? (v = i ? d : `${p}px`, h = `${n.floating.height + c}px`) : u === "right" ? (v = `${-c}px`, h = i ? d : `${f}px`) : u === "left" && (v = `${n.floating.width + c}px`, h = i ? d : `${f}px`), { data: { x: v, y: h } };
  }
});
function bx(e) {
  const [t, r = "center"] = e.split("-");
  return [t, r];
}
var dc = px, ip = mx, sp = vx, cp = yx, Il = "rovingFocusGroup.onEntryFocus", WM = { bubbles: !1, cancelable: !0 }, Ca = "RovingFocusGroup", [Td, wx, KM] = ic(Ca), [VM, So] = Et(
  Ca,
  [KM]
), [qM, HM] = VM(Ca), xx = m.forwardRef(
  (e, t) => /* @__PURE__ */ b(Td.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ b(Td.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ b(GM, { ...e, ref: t }) }) })
);
xx.displayName = Ca;
var GM = m.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: r,
    orientation: n,
    loop: o = !1,
    dir: a,
    currentTabStopId: i,
    defaultCurrentTabStopId: s,
    onCurrentTabStopIdChange: c,
    onEntryFocus: u,
    preventScrollOnEntryFocus: l = !1,
    ...d
  } = e, p = m.useRef(null), f = de(t, p), v = Pa(a), [h, g] = qt({
    prop: i,
    defaultProp: s ?? null,
    onChange: c,
    caller: Ca
  }), [y, w] = m.useState(!1), x = pt(u), S = wx(r), E = m.useRef(!1), [O, P] = m.useState(0);
  return m.useEffect(() => {
    const A = p.current;
    if (A)
      return A.addEventListener(Il, x), () => A.removeEventListener(Il, x);
  }, [x]), /* @__PURE__ */ b(
    qM,
    {
      scope: r,
      orientation: n,
      dir: v,
      loop: o,
      currentTabStopId: h,
      onItemFocus: m.useCallback(
        (A) => g(A),
        [g]
      ),
      onItemShiftTab: m.useCallback(() => w(!0), []),
      onFocusableItemAdd: m.useCallback(
        () => P((A) => A + 1),
        []
      ),
      onFocusableItemRemove: m.useCallback(
        () => P((A) => A - 1),
        []
      ),
      children: /* @__PURE__ */ b(
        ne.div,
        {
          tabIndex: y || O === 0 ? -1 : 0,
          "data-orientation": n,
          ...d,
          ref: f,
          style: { outline: "none", ...e.style },
          onMouseDown: q(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: q(e.onFocus, (A) => {
            const _ = !E.current;
            if (A.target === A.currentTarget && _ && !y) {
              const N = new CustomEvent(Il, WM);
              if (A.currentTarget.dispatchEvent(N), !N.defaultPrevented) {
                const T = S().filter(($) => $.focusable), R = T.find(($) => $.active), j = T.find(($) => $.id === h), D = [R, j, ...T].filter(
                  Boolean
                ).map(($) => $.ref.current);
                Ox(D, l);
              }
            }
            E.current = !1;
          }),
          onBlur: q(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), Ex = "RovingFocusGroupItem", Sx = m.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: r,
      focusable: n = !0,
      active: o = !1,
      tabStopId: a,
      children: i,
      ...s
    } = e, c = Nt(), u = a || c, l = HM(Ex, r), d = l.currentTabStopId === u, p = wx(r), { onFocusableItemAdd: f, onFocusableItemRemove: v, currentTabStopId: h } = l;
    return m.useEffect(() => {
      if (n)
        return f(), () => v();
    }, [n, f, v]), /* @__PURE__ */ b(
      Td.ItemSlot,
      {
        scope: r,
        id: u,
        focusable: n,
        active: o,
        children: /* @__PURE__ */ b(
          ne.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": l.orientation,
            ...s,
            ref: t,
            onMouseDown: q(e.onMouseDown, (g) => {
              n ? l.onItemFocus(u) : g.preventDefault();
            }),
            onFocus: q(e.onFocus, () => l.onItemFocus(u)),
            onKeyDown: q(e.onKeyDown, (g) => {
              if (g.key === "Tab" && g.shiftKey) {
                l.onItemShiftTab();
                return;
              }
              if (g.target !== g.currentTarget) return;
              const y = ZM(g, l.orientation, l.dir);
              if (y !== void 0) {
                if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
                g.preventDefault();
                let x = p().filter((S) => S.focusable).map((S) => S.ref.current);
                if (y === "last") x.reverse();
                else if (y === "prev" || y === "next") {
                  y === "prev" && x.reverse();
                  const S = x.indexOf(g.currentTarget);
                  x = l.loop ? JM(x, S + 1) : x.slice(S + 1);
                }
                setTimeout(() => Ox(x));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: d, hasTabStop: h != null }) : i
          }
        )
      }
    );
  }
);
Sx.displayName = Ex;
var YM = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function XM(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function ZM(e, t, r) {
  const n = XM(e.key, r);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(n)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(n)))
    return YM[n];
}
function Ox(e, t = !1) {
  const r = document.activeElement;
  for (const n of e)
    if (n === r || (n.focus({ preventScroll: t }), document.activeElement !== r)) return;
}
function JM(e, t) {
  return e.map((r, n) => e[(t + n) % e.length]);
}
var lp = xx, up = Sx, _d = ["Enter", " "], QM = ["ArrowDown", "PageUp", "Home"], Px = ["ArrowUp", "PageDown", "End"], eI = [...QM, ...Px], tI = {
  ltr: [..._d, "ArrowRight"],
  rtl: [..._d, "ArrowLeft"]
}, rI = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Ta = "Menu", [ia, nI, oI] = ic(Ta), [Wn, Ax] = Et(Ta, [
  oI,
  Eo,
  So
]), _a = Eo(), Cx = So(), [Tx, nn] = Wn(Ta), [aI, ka] = Wn(Ta), _x = (e) => {
  const { __scopeMenu: t, open: r = !1, children: n, dir: o, onOpenChange: a, modal: i = !0 } = e, s = _a(t), [c, u] = m.useState(null), l = m.useRef(!1), d = pt(a), p = Pa(o);
  return m.useEffect(() => {
    const f = () => {
      l.current = !0, document.addEventListener("pointerdown", v, { capture: !0, once: !0 }), document.addEventListener("pointermove", v, { capture: !0, once: !0 });
    }, v = () => l.current = !1;
    return document.addEventListener("keydown", f, { capture: !0 }), () => {
      document.removeEventListener("keydown", f, { capture: !0 }), document.removeEventListener("pointerdown", v, { capture: !0 }), document.removeEventListener("pointermove", v, { capture: !0 });
    };
  }, []), /* @__PURE__ */ b(dc, { ...s, children: /* @__PURE__ */ b(
    Tx,
    {
      scope: t,
      open: r,
      onOpenChange: d,
      content: c,
      onContentChange: u,
      children: /* @__PURE__ */ b(
        aI,
        {
          scope: t,
          onClose: m.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: l,
          dir: p,
          modal: i,
          children: n
        }
      )
    }
  ) });
};
_x.displayName = Ta;
var iI = "MenuAnchor", dp = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: r, ...n } = e, o = _a(r);
    return /* @__PURE__ */ b(ip, { ...o, ...n, ref: t });
  }
);
dp.displayName = iI;
var fp = "MenuPortal", [sI, kx] = Wn(fp, {
  forceMount: void 0
}), Nx = (e) => {
  const { __scopeMenu: t, forceMount: r, children: n, container: o } = e, a = nn(fp, t);
  return /* @__PURE__ */ b(sI, { scope: t, forceMount: r, children: /* @__PURE__ */ b(jt, { present: r || a.open, children: /* @__PURE__ */ b(Oa, { asChild: !0, container: o, children: n }) }) });
};
Nx.displayName = fp;
var Vt = "MenuContent", [cI, pp] = Wn(Vt), Rx = m.forwardRef(
  (e, t) => {
    const r = kx(Vt, e.__scopeMenu), { forceMount: n = r.forceMount, ...o } = e, a = nn(Vt, e.__scopeMenu), i = ka(Vt, e.__scopeMenu);
    return /* @__PURE__ */ b(ia.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ b(jt, { present: n || a.open, children: /* @__PURE__ */ b(ia.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ b(lI, { ...o, ref: t }) : /* @__PURE__ */ b(uI, { ...o, ref: t }) }) }) });
  }
), lI = m.forwardRef(
  (e, t) => {
    const r = nn(Vt, e.__scopeMenu), n = m.useRef(null), o = de(t, n);
    return m.useEffect(() => {
      const a = n.current;
      if (a) return Gf(a);
    }, []), /* @__PURE__ */ b(
      hp,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: r.open,
        disableOutsideScroll: !0,
        onFocusOutside: q(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => r.onOpenChange(!1)
      }
    );
  }
), uI = m.forwardRef((e, t) => {
  const r = nn(Vt, e.__scopeMenu);
  return /* @__PURE__ */ b(
    hp,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => r.onOpenChange(!1)
    }
  );
}), dI = /* @__PURE__ */ Cn("MenuContent.ScrollLock"), hp = m.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: r,
      loop: n = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: s,
      onEntryFocus: c,
      onEscapeKeyDown: u,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: p,
      onDismiss: f,
      disableOutsideScroll: v,
      ...h
    } = e, g = nn(Vt, r), y = ka(Vt, r), w = _a(r), x = Cx(r), S = nI(r), [E, O] = m.useState(null), P = m.useRef(null), A = de(t, P, g.onContentChange), _ = m.useRef(0), N = m.useRef(""), T = m.useRef(0), R = m.useRef(null), j = m.useRef("right"), C = m.useRef(0), D = v ? Qs : m.Fragment, $ = v ? { as: dI, allowPinchZoom: !0 } : void 0, z = (F) => {
      const oe = N.current + F, H = S().filter((K) => !K.disabled), ie = document.activeElement, ae = H.find((K) => K.ref.current === ie)?.textValue, W = H.map((K) => K.textValue), te = SI(W, oe, ae), se = H.find((K) => K.textValue === te)?.ref.current;
      (function K(re) {
        N.current = re, window.clearTimeout(_.current), re !== "" && (_.current = window.setTimeout(() => K(""), 1e3));
      })(oe), se && setTimeout(() => se.focus());
    };
    m.useEffect(() => () => window.clearTimeout(_.current), []), Hf();
    const I = m.useCallback((F) => j.current === R.current?.side && PI(F, R.current?.area), []);
    return /* @__PURE__ */ b(
      cI,
      {
        scope: r,
        searchRef: N,
        onItemEnter: m.useCallback(
          (F) => {
            I(F) && F.preventDefault();
          },
          [I]
        ),
        onItemLeave: m.useCallback(
          (F) => {
            I(F) || (P.current?.focus(), O(null));
          },
          [I]
        ),
        onTriggerLeave: m.useCallback(
          (F) => {
            I(F) && F.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: T,
        onPointerGraceIntentChange: m.useCallback((F) => {
          R.current = F;
        }, []),
        children: /* @__PURE__ */ b(D, { ...$, children: /* @__PURE__ */ b(
          Zs,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: q(a, (F) => {
              F.preventDefault(), P.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ b(
              bo,
              {
                asChild: !0,
                disableOutsidePointerEvents: s,
                onEscapeKeyDown: u,
                onPointerDownOutside: l,
                onFocusOutside: d,
                onInteractOutside: p,
                onDismiss: f,
                children: /* @__PURE__ */ b(
                  lp,
                  {
                    asChild: !0,
                    ...x,
                    dir: y.dir,
                    orientation: "vertical",
                    loop: n,
                    currentTabStopId: E,
                    onCurrentTabStopIdChange: O,
                    onEntryFocus: q(c, (F) => {
                      y.isUsingKeyboardRef.current || F.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ b(
                      sp,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Yx(g.open),
                        "data-radix-menu-content": "",
                        dir: y.dir,
                        ...w,
                        ...h,
                        ref: A,
                        style: { outline: "none", ...h.style },
                        onKeyDown: q(h.onKeyDown, (F) => {
                          const H = F.target.closest("[data-radix-menu-content]") === F.currentTarget, ie = F.ctrlKey || F.altKey || F.metaKey, ae = F.key.length === 1;
                          H && (F.key === "Tab" && F.preventDefault(), !ie && ae && z(F.key));
                          const W = P.current;
                          if (F.target !== W || !eI.includes(F.key)) return;
                          F.preventDefault();
                          const se = S().filter((K) => !K.disabled).map((K) => K.ref.current);
                          Px.includes(F.key) && se.reverse(), xI(se);
                        }),
                        onBlur: q(e.onBlur, (F) => {
                          F.currentTarget.contains(F.target) || (window.clearTimeout(_.current), N.current = "");
                        }),
                        onPointerMove: q(
                          e.onPointerMove,
                          sa((F) => {
                            const oe = F.target, H = C.current !== F.clientX;
                            if (F.currentTarget.contains(oe) && H) {
                              const ie = F.clientX > C.current ? "right" : "left";
                              j.current = ie, C.current = F.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Rx.displayName = Vt;
var fI = "MenuGroup", mp = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: r, ...n } = e;
    return /* @__PURE__ */ b(ne.div, { role: "group", ...n, ref: t });
  }
);
mp.displayName = fI;
var pI = "MenuLabel", Mx = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: r, ...n } = e;
    return /* @__PURE__ */ b(ne.div, { ...n, ref: t });
  }
);
Mx.displayName = pI;
var Qi = "MenuItem", uv = "menu.itemSelect", fc = m.forwardRef(
  (e, t) => {
    const { disabled: r = !1, onSelect: n, ...o } = e, a = m.useRef(null), i = ka(Qi, e.__scopeMenu), s = pp(Qi, e.__scopeMenu), c = de(t, a), u = m.useRef(!1), l = () => {
      const d = a.current;
      if (!r && d) {
        const p = new CustomEvent(uv, { bubbles: !0, cancelable: !0 });
        d.addEventListener(uv, (f) => n?.(f), { once: !0 }), Kf(d, p), p.defaultPrevented ? u.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ b(
      Ix,
      {
        ...o,
        ref: c,
        disabled: r,
        onClick: q(e.onClick, l),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), u.current = !0;
        },
        onPointerUp: q(e.onPointerUp, (d) => {
          u.current || d.currentTarget?.click();
        }),
        onKeyDown: q(e.onKeyDown, (d) => {
          const p = s.searchRef.current !== "";
          r || p && d.key === " " || _d.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
fc.displayName = Qi;
var Ix = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: r, disabled: n = !1, textValue: o, ...a } = e, i = pp(Qi, r), s = Cx(r), c = m.useRef(null), u = de(t, c), [l, d] = m.useState(!1), [p, f] = m.useState("");
    return m.useEffect(() => {
      const v = c.current;
      v && f((v.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ b(
      ia.ItemSlot,
      {
        scope: r,
        disabled: n,
        textValue: o ?? p,
        children: /* @__PURE__ */ b(up, { asChild: !0, ...s, focusable: !n, children: /* @__PURE__ */ b(
          ne.div,
          {
            role: "menuitem",
            "data-highlighted": l ? "" : void 0,
            "aria-disabled": n || void 0,
            "data-disabled": n ? "" : void 0,
            ...a,
            ref: u,
            onPointerMove: q(
              e.onPointerMove,
              sa((v) => {
                n ? i.onItemLeave(v) : (i.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: q(
              e.onPointerLeave,
              sa((v) => i.onItemLeave(v))
            ),
            onFocus: q(e.onFocus, () => d(!0)),
            onBlur: q(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), hI = "MenuCheckboxItem", Dx = m.forwardRef(
  (e, t) => {
    const { checked: r = !1, onCheckedChange: n, ...o } = e;
    return /* @__PURE__ */ b(Fx, { scope: e.__scopeMenu, checked: r, children: /* @__PURE__ */ b(
      fc,
      {
        role: "menuitemcheckbox",
        "aria-checked": es(r) ? "mixed" : r,
        ...o,
        ref: t,
        "data-state": yp(r),
        onSelect: q(
          o.onSelect,
          () => n?.(es(r) ? !0 : !r),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Dx.displayName = hI;
var jx = "MenuRadioGroup", [mI, vI] = Wn(
  jx,
  { value: void 0, onValueChange: () => {
  } }
), Lx = m.forwardRef(
  (e, t) => {
    const { value: r, onValueChange: n, ...o } = e, a = pt(n);
    return /* @__PURE__ */ b(mI, { scope: e.__scopeMenu, value: r, onValueChange: a, children: /* @__PURE__ */ b(mp, { ...o, ref: t }) });
  }
);
Lx.displayName = jx;
var $x = "MenuRadioItem", Bx = m.forwardRef(
  (e, t) => {
    const { value: r, ...n } = e, o = vI($x, e.__scopeMenu), a = r === o.value;
    return /* @__PURE__ */ b(Fx, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ b(
      fc,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...n,
        ref: t,
        "data-state": yp(a),
        onSelect: q(
          n.onSelect,
          () => o.onValueChange?.(r),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Bx.displayName = $x;
var vp = "MenuItemIndicator", [Fx, gI] = Wn(
  vp,
  { checked: !1 }
), zx = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: r, forceMount: n, ...o } = e, a = gI(vp, r);
    return /* @__PURE__ */ b(
      jt,
      {
        present: n || es(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ b(
          ne.span,
          {
            ...o,
            ref: t,
            "data-state": yp(a.checked)
          }
        )
      }
    );
  }
);
zx.displayName = vp;
var yI = "MenuSeparator", Ux = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: r, ...n } = e;
    return /* @__PURE__ */ b(
      ne.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...n,
        ref: t
      }
    );
  }
);
Ux.displayName = yI;
var bI = "MenuArrow", Wx = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: r, ...n } = e, o = _a(r);
    return /* @__PURE__ */ b(cp, { ...o, ...n, ref: t });
  }
);
Wx.displayName = bI;
var gp = "MenuSub", [wI, Kx] = Wn(gp), Vx = (e) => {
  const { __scopeMenu: t, children: r, open: n = !1, onOpenChange: o } = e, a = nn(gp, t), i = _a(t), [s, c] = m.useState(null), [u, l] = m.useState(null), d = pt(o);
  return m.useEffect(() => (a.open === !1 && d(!1), () => d(!1)), [a.open, d]), /* @__PURE__ */ b(dc, { ...i, children: /* @__PURE__ */ b(
    Tx,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: u,
      onContentChange: l,
      children: /* @__PURE__ */ b(
        wI,
        {
          scope: t,
          contentId: Nt(),
          triggerId: Nt(),
          trigger: s,
          onTriggerChange: c,
          children: r
        }
      )
    }
  ) });
};
Vx.displayName = gp;
var Yo = "MenuSubTrigger", qx = m.forwardRef(
  (e, t) => {
    const r = nn(Yo, e.__scopeMenu), n = ka(Yo, e.__scopeMenu), o = Kx(Yo, e.__scopeMenu), a = pp(Yo, e.__scopeMenu), i = m.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = a, u = { __scopeMenu: e.__scopeMenu }, l = m.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return m.useEffect(() => l, [l]), m.useEffect(() => {
      const d = s.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [s, c]), /* @__PURE__ */ b(dp, { asChild: !0, ...u, children: /* @__PURE__ */ b(
      Ix,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": r.open,
        "aria-controls": o.contentId,
        "data-state": Yx(r.open),
        ...e,
        ref: Vs(t, o.onTriggerChange),
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), r.open || r.onOpenChange(!0));
        },
        onPointerMove: q(
          e.onPointerMove,
          sa((d) => {
            a.onItemEnter(d), !d.defaultPrevented && !e.disabled && !r.open && !i.current && (a.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              r.onOpenChange(!0), l();
            }, 100));
          })
        ),
        onPointerLeave: q(
          e.onPointerLeave,
          sa((d) => {
            l();
            const p = r.content?.getBoundingClientRect();
            if (p) {
              const f = r.content?.dataset.side, v = f === "right", h = v ? -5 : 5, g = p[v ? "left" : "right"], y = p[v ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + h, y: d.clientY },
                  { x: g, y: p.top },
                  { x: y, y: p.top },
                  { x: y, y: p.bottom },
                  { x: g, y: p.bottom }
                ],
                side: f
              }), window.clearTimeout(s.current), s.current = window.setTimeout(
                () => a.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (a.onTriggerLeave(d), d.defaultPrevented) return;
              a.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: q(e.onKeyDown, (d) => {
          const p = a.searchRef.current !== "";
          e.disabled || p && d.key === " " || tI[n.dir].includes(d.key) && (r.onOpenChange(!0), r.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
qx.displayName = Yo;
var Hx = "MenuSubContent", Gx = m.forwardRef(
  (e, t) => {
    const r = kx(Vt, e.__scopeMenu), { forceMount: n = r.forceMount, ...o } = e, a = nn(Vt, e.__scopeMenu), i = ka(Vt, e.__scopeMenu), s = Kx(Hx, e.__scopeMenu), c = m.useRef(null), u = de(t, c);
    return /* @__PURE__ */ b(ia.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ b(jt, { present: n || a.open, children: /* @__PURE__ */ b(ia.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ b(
      hp,
      {
        id: s.contentId,
        "aria-labelledby": s.triggerId,
        ...o,
        ref: u,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (l) => {
          i.isUsingKeyboardRef.current && c.current?.focus(), l.preventDefault();
        },
        onCloseAutoFocus: (l) => l.preventDefault(),
        onFocusOutside: q(e.onFocusOutside, (l) => {
          l.target !== s.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: q(e.onEscapeKeyDown, (l) => {
          i.onClose(), l.preventDefault();
        }),
        onKeyDown: q(e.onKeyDown, (l) => {
          const d = l.currentTarget.contains(l.target), p = rI[i.dir].includes(l.key);
          d && p && (a.onOpenChange(!1), s.trigger?.focus(), l.preventDefault());
        })
      }
    ) }) }) });
  }
);
Gx.displayName = Hx;
function Yx(e) {
  return e ? "open" : "closed";
}
function es(e) {
  return e === "indeterminate";
}
function yp(e) {
  return es(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function xI(e) {
  const t = document.activeElement;
  for (const r of e)
    if (r === t || (r.focus(), document.activeElement !== t)) return;
}
function EI(e, t) {
  return e.map((r, n) => e[(t + n) % e.length]);
}
function SI(e, t, r) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = r ? e.indexOf(r) : -1;
  let i = EI(e, Math.max(a, 0));
  o.length === 1 && (i = i.filter((u) => u !== r));
  const c = i.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== r ? c : void 0;
}
function OI(e, t) {
  const { x: r, y: n } = e;
  let o = !1;
  for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
    const s = t[a], c = t[i], u = s.x, l = s.y, d = c.x, p = c.y;
    l > n != p > n && r < (d - u) * (n - l) / (p - l) + u && (o = !o);
  }
  return o;
}
function PI(e, t) {
  if (!t) return !1;
  const r = { x: e.clientX, y: e.clientY };
  return OI(r, t);
}
function sa(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var AI = _x, CI = dp, TI = Nx, _I = Rx, kI = mp, NI = Mx, RI = fc, MI = Dx, II = Lx, DI = Bx, jI = zx, LI = Ux, $I = Wx, BI = Vx, FI = qx, zI = Gx, pc = "DropdownMenu", [UI] = Et(
  pc,
  [Ax]
), lt = Ax(), [WI, Xx] = UI(pc), Zx = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: r,
    dir: n,
    open: o,
    defaultOpen: a,
    onOpenChange: i,
    modal: s = !0
  } = e, c = lt(t), u = m.useRef(null), [l, d] = qt({
    prop: o,
    defaultProp: a ?? !1,
    onChange: i,
    caller: pc
  });
  return /* @__PURE__ */ b(
    WI,
    {
      scope: t,
      triggerId: Nt(),
      triggerRef: u,
      contentId: Nt(),
      open: l,
      onOpenChange: d,
      onOpenToggle: m.useCallback(() => d((p) => !p), [d]),
      modal: s,
      children: /* @__PURE__ */ b(AI, { ...c, open: l, onOpenChange: d, dir: n, modal: s, children: r })
    }
  );
};
Zx.displayName = pc;
var Jx = "DropdownMenuTrigger", Qx = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: r, disabled: n = !1, ...o } = e, a = Xx(Jx, r), i = lt(r);
    return /* @__PURE__ */ b(CI, { asChild: !0, ...i, children: /* @__PURE__ */ b(
      ne.button,
      {
        type: "button",
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": a.open ? "open" : "closed",
        "data-disabled": n ? "" : void 0,
        disabled: n,
        ...o,
        ref: Vs(t, a.triggerRef),
        onPointerDown: q(e.onPointerDown, (s) => {
          !n && s.button === 0 && s.ctrlKey === !1 && (a.onOpenToggle(), a.open || s.preventDefault());
        }),
        onKeyDown: q(e.onKeyDown, (s) => {
          n || (["Enter", " "].includes(s.key) && a.onOpenToggle(), s.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(s.key) && s.preventDefault());
        })
      }
    ) });
  }
);
Qx.displayName = Jx;
var KI = "DropdownMenuPortal", eE = (e) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = lt(t);
  return /* @__PURE__ */ b(TI, { ...n, ...r });
};
eE.displayName = KI;
var tE = "DropdownMenuContent", rE = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: r, ...n } = e, o = Xx(tE, r), a = lt(r), i = m.useRef(!1);
    return /* @__PURE__ */ b(
      _I,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...n,
        ref: t,
        onCloseAutoFocus: q(e.onCloseAutoFocus, (s) => {
          i.current || o.triggerRef.current?.focus(), i.current = !1, s.preventDefault();
        }),
        onInteractOutside: q(e.onInteractOutside, (s) => {
          const c = s.detail.originalEvent, u = c.button === 0 && c.ctrlKey === !0, l = c.button === 2 || u;
          (!o.modal || l) && (i.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
rE.displayName = tE;
var VI = "DropdownMenuGroup", nE = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
    return /* @__PURE__ */ b(kI, { ...o, ...n, ref: t });
  }
);
nE.displayName = VI;
var qI = "DropdownMenuLabel", oE = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
    return /* @__PURE__ */ b(NI, { ...o, ...n, ref: t });
  }
);
oE.displayName = qI;
var HI = "DropdownMenuItem", aE = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
    return /* @__PURE__ */ b(RI, { ...o, ...n, ref: t });
  }
);
aE.displayName = HI;
var GI = "DropdownMenuCheckboxItem", iE = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
  return /* @__PURE__ */ b(MI, { ...o, ...n, ref: t });
});
iE.displayName = GI;
var YI = "DropdownMenuRadioGroup", sE = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
  return /* @__PURE__ */ b(II, { ...o, ...n, ref: t });
});
sE.displayName = YI;
var XI = "DropdownMenuRadioItem", cE = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
  return /* @__PURE__ */ b(DI, { ...o, ...n, ref: t });
});
cE.displayName = XI;
var ZI = "DropdownMenuItemIndicator", lE = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
  return /* @__PURE__ */ b(jI, { ...o, ...n, ref: t });
});
lE.displayName = ZI;
var JI = "DropdownMenuSeparator", uE = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
  return /* @__PURE__ */ b(LI, { ...o, ...n, ref: t });
});
uE.displayName = JI;
var QI = "DropdownMenuArrow", eD = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
    return /* @__PURE__ */ b($I, { ...o, ...n, ref: t });
  }
);
eD.displayName = QI;
var tD = (e) => {
  const { __scopeDropdownMenu: t, children: r, open: n, onOpenChange: o, defaultOpen: a } = e, i = lt(t), [s, c] = qt({
    prop: n,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ b(BI, { ...i, open: s, onOpenChange: c, children: r });
}, rD = "DropdownMenuSubTrigger", dE = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
  return /* @__PURE__ */ b(FI, { ...o, ...n, ref: t });
});
dE.displayName = rD;
var nD = "DropdownMenuSubContent", fE = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: r, ...n } = e, o = lt(r);
  return /* @__PURE__ */ b(
    zI,
    {
      ...o,
      ...n,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
fE.displayName = nD;
var oD = Zx, aD = Qx, pE = eE, hE = rE, iD = nE, mE = oE, vE = aE, gE = iE, sD = sE, yE = cE, bE = lE, wE = uE, cD = tD, xE = dE, EE = fE;
const v7 = oD, g7 = aD, y7 = iD, b7 = pE, w7 = cD, x7 = sD, lD = m.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ U(
  xE,
  {
    ref: o,
    className: V(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      t && "pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ b(Hs, { className: "ml-auto h-4 w-4" })
    ]
  }
));
lD.displayName = xE.displayName;
const uD = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  EE,
  {
    ref: r,
    className: V(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
uD.displayName = EE.displayName;
const dD = m.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ b(pE, { children: /* @__PURE__ */ b(
  hE,
  {
    ref: n,
    sideOffset: t,
    className: V(
      "z-[110] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
dD.displayName = hE.displayName;
const fD = m.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ b(
  vE,
  {
    ref: n,
    className: V(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t && "pl-8",
      e
    ),
    ...r
  }
));
fD.displayName = vE.displayName;
const pD = m.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ U(
  gE,
  {
    ref: o,
    className: V(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ b("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ b(bE, { children: /* @__PURE__ */ b(qs, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
pD.displayName = gE.displayName;
const hD = m.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ U(
  yE,
  {
    ref: n,
    className: V(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ b("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ b(bE, { children: /* @__PURE__ */ b(Zw, { className: "h-2 w-2 fill-current" }) }) }),
      t
    ]
  }
));
hD.displayName = yE.displayName;
const mD = m.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ b(
  mE,
  {
    ref: n,
    className: V(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...r
  }
));
mD.displayName = mE.displayName;
const vD = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  wE,
  {
    ref: r,
    className: V("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
vD.displayName = wE.displayName;
const gD = ({
  className: e,
  ...t
}) => /* @__PURE__ */ b(
  "span",
  {
    className: V("ml-auto text-xs tracking-widest opacity-60", e),
    ...t
  }
);
gD.displayName = "DropdownShortcut";
function dv(e, [t, r]) {
  return Math.min(r, Math.max(t, e));
}
var SE = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), yD = "VisuallyHidden", hc = m.forwardRef(
  (e, t) => /* @__PURE__ */ b(
    ne.span,
    {
      ...e,
      ref: t,
      style: { ...SE, ...e.style }
    }
  )
);
hc.displayName = yD;
var bD = hc, wD = [" ", "Enter", "ArrowUp", "ArrowDown"], xD = [" ", "Enter"], kn = "Select", [mc, vc, ED] = ic(kn), [Oo] = Et(kn, [
  ED,
  Eo
]), gc = Eo(), [SD, on] = Oo(kn), [OD, PD] = Oo(kn), OE = (e) => {
  const {
    __scopeSelect: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: a,
    value: i,
    defaultValue: s,
    onValueChange: c,
    dir: u,
    name: l,
    autoComplete: d,
    disabled: p,
    required: f,
    form: v
  } = e, h = gc(t), [g, y] = m.useState(null), [w, x] = m.useState(null), [S, E] = m.useState(!1), O = Pa(u), [P, A] = qt({
    prop: n,
    defaultProp: o ?? !1,
    onChange: a,
    caller: kn
  }), [_, N] = qt({
    prop: i,
    defaultProp: s,
    onChange: c,
    caller: kn
  }), T = m.useRef(null), R = g ? v || !!g.closest("form") : !0, [j, C] = m.useState(/* @__PURE__ */ new Set()), D = Array.from(j).map(($) => $.props.value).join(";");
  return /* @__PURE__ */ b(dc, { ...h, children: /* @__PURE__ */ U(
    SD,
    {
      required: f,
      scope: t,
      trigger: g,
      onTriggerChange: y,
      valueNode: w,
      onValueNodeChange: x,
      valueNodeHasChildren: S,
      onValueNodeHasChildrenChange: E,
      contentId: Nt(),
      value: _,
      onValueChange: N,
      open: P,
      onOpenChange: A,
      dir: O,
      triggerPointerDownPosRef: T,
      disabled: p,
      children: [
        /* @__PURE__ */ b(mc.Provider, { scope: t, children: /* @__PURE__ */ b(
          OD,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: m.useCallback(($) => {
              C((z) => new Set(z).add($));
            }, []),
            onNativeOptionRemove: m.useCallback(($) => {
              C((z) => {
                const I = new Set(z);
                return I.delete($), I;
              });
            }, []),
            children: r
          }
        ) }),
        R ? /* @__PURE__ */ U(
          YE,
          {
            "aria-hidden": !0,
            required: f,
            tabIndex: -1,
            name: l,
            autoComplete: d,
            value: _,
            onChange: ($) => N($.target.value),
            disabled: p,
            form: v,
            children: [
              _ === void 0 ? /* @__PURE__ */ b("option", { value: "" }) : null,
              Array.from(j)
            ]
          },
          D
        ) : null
      ]
    }
  ) });
};
OE.displayName = kn;
var PE = "SelectTrigger", AE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, disabled: n = !1, ...o } = e, a = gc(r), i = on(PE, r), s = i.disabled || n, c = de(t, i.onTriggerChange), u = vc(r), l = m.useRef("touch"), [d, p, f] = ZE((h) => {
      const g = u().filter((x) => !x.disabled), y = g.find((x) => x.value === i.value), w = JE(g, h, y);
      w !== void 0 && i.onValueChange(w.value);
    }), v = (h) => {
      s || (i.onOpenChange(!0), f()), h && (i.triggerPointerDownPosRef.current = {
        x: Math.round(h.pageX),
        y: Math.round(h.pageY)
      });
    };
    return /* @__PURE__ */ b(ip, { asChild: !0, ...a, children: /* @__PURE__ */ b(
      ne.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": i.contentId,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: s,
        "data-disabled": s ? "" : void 0,
        "data-placeholder": XE(i.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: q(o.onClick, (h) => {
          h.currentTarget.focus(), l.current !== "mouse" && v(h);
        }),
        onPointerDown: q(o.onPointerDown, (h) => {
          l.current = h.pointerType;
          const g = h.target;
          g.hasPointerCapture(h.pointerId) && g.releasePointerCapture(h.pointerId), h.button === 0 && h.ctrlKey === !1 && h.pointerType === "mouse" && (v(h), h.preventDefault());
        }),
        onKeyDown: q(o.onKeyDown, (h) => {
          const g = d.current !== "";
          !(h.ctrlKey || h.altKey || h.metaKey) && h.key.length === 1 && p(h.key), !(g && h.key === " ") && wD.includes(h.key) && (v(), h.preventDefault());
        })
      }
    ) });
  }
);
AE.displayName = PE;
var CE = "SelectValue", TE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, className: n, style: o, children: a, placeholder: i = "", ...s } = e, c = on(CE, r), { onValueNodeHasChildrenChange: u } = c, l = a !== void 0, d = de(t, c.onValueNodeChange);
    return nt(() => {
      u(l);
    }, [u, l]), /* @__PURE__ */ b(
      ne.span,
      {
        ...s,
        ref: d,
        style: { pointerEvents: "none" },
        children: XE(c.value) ? /* @__PURE__ */ b(yt, { children: i }) : a
      }
    );
  }
);
TE.displayName = CE;
var AD = "SelectIcon", _E = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, children: n, ...o } = e;
    return /* @__PURE__ */ b(ne.span, { "aria-hidden": !0, ...o, ref: t, children: n || "▼" });
  }
);
_E.displayName = AD;
var CD = "SelectPortal", kE = (e) => /* @__PURE__ */ b(Oa, { asChild: !0, ...e });
kE.displayName = CD;
var Nn = "SelectContent", NE = m.forwardRef(
  (e, t) => {
    const r = on(Nn, e.__scopeSelect), [n, o] = m.useState();
    if (nt(() => {
      o(new DocumentFragment());
    }, []), !r.open) {
      const a = n;
      return a ? Sa.createPortal(
        /* @__PURE__ */ b(RE, { scope: e.__scopeSelect, children: /* @__PURE__ */ b(mc.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ b("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ b(ME, { ...e, ref: t });
  }
);
NE.displayName = Nn;
var Xt = 10, [RE, an] = Oo(Nn), TD = "SelectContentImpl", _D = /* @__PURE__ */ Cn("SelectContent.RemoveScroll"), ME = m.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: r,
      position: n = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: a,
      onPointerDownOutside: i,
      //
      // PopperContent props
      side: s,
      sideOffset: c,
      align: u,
      alignOffset: l,
      arrowPadding: d,
      collisionBoundary: p,
      collisionPadding: f,
      sticky: v,
      hideWhenDetached: h,
      avoidCollisions: g,
      //
      ...y
    } = e, w = on(Nn, r), [x, S] = m.useState(null), [E, O] = m.useState(null), P = de(t, (K) => S(K)), [A, _] = m.useState(null), [N, T] = m.useState(
      null
    ), R = vc(r), [j, C] = m.useState(!1), D = m.useRef(!1);
    m.useEffect(() => {
      if (x) return Gf(x);
    }, [x]), Hf();
    const $ = m.useCallback(
      (K) => {
        const [re, ...L] = R().map((B) => B.ref.current), [G] = L.slice(-1), Y = document.activeElement;
        for (const B of K)
          if (B === Y || (B?.scrollIntoView({ block: "nearest" }), B === re && E && (E.scrollTop = 0), B === G && E && (E.scrollTop = E.scrollHeight), B?.focus(), document.activeElement !== Y)) return;
      },
      [R, E]
    ), z = m.useCallback(
      () => $([A, x]),
      [$, A, x]
    );
    m.useEffect(() => {
      j && z();
    }, [j, z]);
    const { onOpenChange: I, triggerPointerDownPosRef: F } = w;
    m.useEffect(() => {
      if (x) {
        let K = { x: 0, y: 0 };
        const re = (G) => {
          K = {
            x: Math.abs(Math.round(G.pageX) - (F.current?.x ?? 0)),
            y: Math.abs(Math.round(G.pageY) - (F.current?.y ?? 0))
          };
        }, L = (G) => {
          K.x <= 10 && K.y <= 10 ? G.preventDefault() : x.contains(G.target) || I(!1), document.removeEventListener("pointermove", re), F.current = null;
        };
        return F.current !== null && (document.addEventListener("pointermove", re), document.addEventListener("pointerup", L, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", re), document.removeEventListener("pointerup", L, { capture: !0 });
        };
      }
    }, [x, I, F]), m.useEffect(() => {
      const K = () => I(!1);
      return window.addEventListener("blur", K), window.addEventListener("resize", K), () => {
        window.removeEventListener("blur", K), window.removeEventListener("resize", K);
      };
    }, [I]);
    const [oe, H] = ZE((K) => {
      const re = R().filter((Y) => !Y.disabled), L = re.find((Y) => Y.ref.current === document.activeElement), G = JE(re, K, L);
      G && setTimeout(() => G.ref.current.focus());
    }), ie = m.useCallback(
      (K, re, L) => {
        const G = !D.current && !L;
        (w.value !== void 0 && w.value === re || G) && (_(K), G && (D.current = !0));
      },
      [w.value]
    ), ae = m.useCallback(() => x?.focus(), [x]), W = m.useCallback(
      (K, re, L) => {
        const G = !D.current && !L;
        (w.value !== void 0 && w.value === re || G) && T(K);
      },
      [w.value]
    ), te = n === "popper" ? kd : IE, se = te === kd ? {
      side: s,
      sideOffset: c,
      align: u,
      alignOffset: l,
      arrowPadding: d,
      collisionBoundary: p,
      collisionPadding: f,
      sticky: v,
      hideWhenDetached: h,
      avoidCollisions: g
    } : {};
    return /* @__PURE__ */ b(
      RE,
      {
        scope: r,
        content: x,
        viewport: E,
        onViewportChange: O,
        itemRefCallback: ie,
        selectedItem: A,
        onItemLeave: ae,
        itemTextRefCallback: W,
        focusSelectedItem: z,
        selectedItemText: N,
        position: n,
        isPositioned: j,
        searchRef: oe,
        children: /* @__PURE__ */ b(Qs, { as: _D, allowPinchZoom: !0, children: /* @__PURE__ */ b(
          Zs,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (K) => {
              K.preventDefault();
            },
            onUnmountAutoFocus: q(o, (K) => {
              w.trigger?.focus({ preventScroll: !0 }), K.preventDefault();
            }),
            children: /* @__PURE__ */ b(
              bo,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: i,
                onFocusOutside: (K) => K.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ b(
                  te,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (K) => K.preventDefault(),
                    ...y,
                    ...se,
                    onPlaced: () => C(!0),
                    ref: P,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...y.style
                    },
                    onKeyDown: q(y.onKeyDown, (K) => {
                      const re = K.ctrlKey || K.altKey || K.metaKey;
                      if (K.key === "Tab" && K.preventDefault(), !re && K.key.length === 1 && H(K.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(K.key)) {
                        let G = R().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
                        if (["ArrowUp", "End"].includes(K.key) && (G = G.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(K.key)) {
                          const Y = K.target, B = G.indexOf(Y);
                          G = G.slice(B + 1);
                        }
                        setTimeout(() => $(G)), K.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
ME.displayName = TD;
var kD = "SelectItemAlignedPosition", IE = m.forwardRef((e, t) => {
  const { __scopeSelect: r, onPlaced: n, ...o } = e, a = on(Nn, r), i = an(Nn, r), [s, c] = m.useState(null), [u, l] = m.useState(null), d = de(t, (P) => l(P)), p = vc(r), f = m.useRef(!1), v = m.useRef(!0), { viewport: h, selectedItem: g, selectedItemText: y, focusSelectedItem: w } = i, x = m.useCallback(() => {
    if (a.trigger && a.valueNode && s && u && h && g && y) {
      const P = a.trigger.getBoundingClientRect(), A = u.getBoundingClientRect(), _ = a.valueNode.getBoundingClientRect(), N = y.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const Y = N.left - A.left, B = _.left - Y, me = P.left - B, le = P.width + me, Te = Math.max(le, A.width), Ke = window.innerWidth - Xt, St = dv(B, [
          Xt,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Xt, Ke - Te)
        ]);
        s.style.minWidth = le + "px", s.style.left = St + "px";
      } else {
        const Y = A.right - N.right, B = window.innerWidth - _.right - Y, me = window.innerWidth - P.right - B, le = P.width + me, Te = Math.max(le, A.width), Ke = window.innerWidth - Xt, St = dv(B, [
          Xt,
          Math.max(Xt, Ke - Te)
        ]);
        s.style.minWidth = le + "px", s.style.right = St + "px";
      }
      const T = p(), R = window.innerHeight - Xt * 2, j = h.scrollHeight, C = window.getComputedStyle(u), D = parseInt(C.borderTopWidth, 10), $ = parseInt(C.paddingTop, 10), z = parseInt(C.borderBottomWidth, 10), I = parseInt(C.paddingBottom, 10), F = D + $ + j + I + z, oe = Math.min(g.offsetHeight * 5, F), H = window.getComputedStyle(h), ie = parseInt(H.paddingTop, 10), ae = parseInt(H.paddingBottom, 10), W = P.top + P.height / 2 - Xt, te = R - W, se = g.offsetHeight / 2, K = g.offsetTop + se, re = D + $ + K, L = F - re;
      if (re <= W) {
        const Y = T.length > 0 && g === T[T.length - 1].ref.current;
        s.style.bottom = "0px";
        const B = u.clientHeight - h.offsetTop - h.offsetHeight, me = Math.max(
          te,
          se + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (Y ? ae : 0) + B + z
        ), le = re + me;
        s.style.height = le + "px";
      } else {
        const Y = T.length > 0 && g === T[0].ref.current;
        s.style.top = "0px";
        const me = Math.max(
          W,
          D + h.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (Y ? ie : 0) + se
        ) + L;
        s.style.height = me + "px", h.scrollTop = re - W + h.offsetTop;
      }
      s.style.margin = `${Xt}px 0`, s.style.minHeight = oe + "px", s.style.maxHeight = R + "px", n?.(), requestAnimationFrame(() => f.current = !0);
    }
  }, [
    p,
    a.trigger,
    a.valueNode,
    s,
    u,
    h,
    g,
    y,
    a.dir,
    n
  ]);
  nt(() => x(), [x]);
  const [S, E] = m.useState();
  nt(() => {
    u && E(window.getComputedStyle(u).zIndex);
  }, [u]);
  const O = m.useCallback(
    (P) => {
      P && v.current === !0 && (x(), w?.(), v.current = !1);
    },
    [x, w]
  );
  return /* @__PURE__ */ b(
    RD,
    {
      scope: r,
      contentWrapper: s,
      shouldExpandOnScrollRef: f,
      onScrollButtonChange: O,
      children: /* @__PURE__ */ b(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ b(
            ne.div,
            {
              ...o,
              ref: d,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...o.style
              }
            }
          )
        }
      )
    }
  );
});
IE.displayName = kD;
var ND = "SelectPopperPosition", kd = m.forwardRef((e, t) => {
  const {
    __scopeSelect: r,
    align: n = "start",
    collisionPadding: o = Xt,
    ...a
  } = e, i = gc(r);
  return /* @__PURE__ */ b(
    sp,
    {
      ...i,
      ...a,
      ref: t,
      align: n,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...a.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
kd.displayName = ND;
var [RD, bp] = Oo(Nn, {}), Nd = "SelectViewport", DE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, nonce: n, ...o } = e, a = an(Nd, r), i = bp(Nd, r), s = de(t, a.onViewportChange), c = m.useRef(0);
    return /* @__PURE__ */ U(yt, { children: [
      /* @__PURE__ */ b(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: n
        }
      ),
      /* @__PURE__ */ b(mc.Slot, { scope: r, children: /* @__PURE__ */ b(
        ne.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: s,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...o.style
          },
          onScroll: q(o.onScroll, (u) => {
            const l = u.currentTarget, { contentWrapper: d, shouldExpandOnScrollRef: p } = i;
            if (p?.current && d) {
              const f = Math.abs(c.current - l.scrollTop);
              if (f > 0) {
                const v = window.innerHeight - Xt * 2, h = parseFloat(d.style.minHeight), g = parseFloat(d.style.height), y = Math.max(h, g);
                if (y < v) {
                  const w = y + f, x = Math.min(v, w), S = w - x;
                  d.style.height = x + "px", d.style.bottom === "0px" && (l.scrollTop = S > 0 ? S : 0, d.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = l.scrollTop;
          })
        }
      ) })
    ] });
  }
);
DE.displayName = Nd;
var jE = "SelectGroup", [MD, ID] = Oo(jE), LE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = Nt();
    return /* @__PURE__ */ b(MD, { scope: r, id: o, children: /* @__PURE__ */ b(ne.div, { role: "group", "aria-labelledby": o, ...n, ref: t }) });
  }
);
LE.displayName = jE;
var $E = "SelectLabel", BE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = ID($E, r);
    return /* @__PURE__ */ b(ne.div, { id: o.id, ...n, ref: t });
  }
);
BE.displayName = $E;
var ts = "SelectItem", [DD, FE] = Oo(ts), zE = m.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: r,
      value: n,
      disabled: o = !1,
      textValue: a,
      ...i
    } = e, s = on(ts, r), c = an(ts, r), u = s.value === n, [l, d] = m.useState(a ?? ""), [p, f] = m.useState(!1), v = de(
      t,
      (w) => c.itemRefCallback?.(w, n, o)
    ), h = Nt(), g = m.useRef("touch"), y = () => {
      o || (s.onValueChange(n), s.onOpenChange(!1));
    };
    if (n === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ b(
      DD,
      {
        scope: r,
        value: n,
        disabled: o,
        textId: h,
        isSelected: u,
        onItemTextChange: m.useCallback((w) => {
          d((x) => x || (w?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ b(
          mc.ItemSlot,
          {
            scope: r,
            value: n,
            disabled: o,
            textValue: l,
            children: /* @__PURE__ */ b(
              ne.div,
              {
                role: "option",
                "aria-labelledby": h,
                "data-highlighted": p ? "" : void 0,
                "aria-selected": u && p,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...i,
                ref: v,
                onFocus: q(i.onFocus, () => f(!0)),
                onBlur: q(i.onBlur, () => f(!1)),
                onClick: q(i.onClick, () => {
                  g.current !== "mouse" && y();
                }),
                onPointerUp: q(i.onPointerUp, () => {
                  g.current === "mouse" && y();
                }),
                onPointerDown: q(i.onPointerDown, (w) => {
                  g.current = w.pointerType;
                }),
                onPointerMove: q(i.onPointerMove, (w) => {
                  g.current = w.pointerType, o ? c.onItemLeave?.() : g.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: q(i.onPointerLeave, (w) => {
                  w.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: q(i.onKeyDown, (w) => {
                  c.searchRef?.current !== "" && w.key === " " || (xD.includes(w.key) && y(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
zE.displayName = ts;
var Xo = "SelectItemText", UE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, className: n, style: o, ...a } = e, i = on(Xo, r), s = an(Xo, r), c = FE(Xo, r), u = PD(Xo, r), [l, d] = m.useState(null), p = de(
      t,
      (y) => d(y),
      c.onItemTextChange,
      (y) => s.itemTextRefCallback?.(y, c.value, c.disabled)
    ), f = l?.textContent, v = m.useMemo(
      () => /* @__PURE__ */ b("option", { value: c.value, disabled: c.disabled, children: f }, c.value),
      [c.disabled, c.value, f]
    ), { onNativeOptionAdd: h, onNativeOptionRemove: g } = u;
    return nt(() => (h(v), () => g(v)), [h, g, v]), /* @__PURE__ */ U(yt, { children: [
      /* @__PURE__ */ b(ne.span, { id: c.textId, ...a, ref: p }),
      c.isSelected && i.valueNode && !i.valueNodeHasChildren ? Sa.createPortal(a.children, i.valueNode) : null
    ] });
  }
);
UE.displayName = Xo;
var WE = "SelectItemIndicator", KE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return FE(WE, r).isSelected ? /* @__PURE__ */ b(ne.span, { "aria-hidden": !0, ...n, ref: t }) : null;
  }
);
KE.displayName = WE;
var Rd = "SelectScrollUpButton", VE = m.forwardRef((e, t) => {
  const r = an(Rd, e.__scopeSelect), n = bp(Rd, e.__scopeSelect), [o, a] = m.useState(!1), i = de(t, n.onScrollButtonChange);
  return nt(() => {
    if (r.viewport && r.isPositioned) {
      let s = function() {
        const u = c.scrollTop > 0;
        a(u);
      };
      const c = r.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [r.viewport, r.isPositioned]), o ? /* @__PURE__ */ b(
    HE,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = r;
        s && c && (s.scrollTop = s.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
VE.displayName = Rd;
var Md = "SelectScrollDownButton", qE = m.forwardRef((e, t) => {
  const r = an(Md, e.__scopeSelect), n = bp(Md, e.__scopeSelect), [o, a] = m.useState(!1), i = de(t, n.onScrollButtonChange);
  return nt(() => {
    if (r.viewport && r.isPositioned) {
      let s = function() {
        const u = c.scrollHeight - c.clientHeight, l = Math.ceil(c.scrollTop) < u;
        a(l);
      };
      const c = r.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [r.viewport, r.isPositioned]), o ? /* @__PURE__ */ b(
    HE,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = r;
        s && c && (s.scrollTop = s.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
qE.displayName = Md;
var HE = m.forwardRef((e, t) => {
  const { __scopeSelect: r, onAutoScroll: n, ...o } = e, a = an("SelectScrollButton", r), i = m.useRef(null), s = vc(r), c = m.useCallback(() => {
    i.current !== null && (window.clearInterval(i.current), i.current = null);
  }, []);
  return m.useEffect(() => () => c(), [c]), nt(() => {
    s().find((l) => l.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [s]), /* @__PURE__ */ b(
    ne.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: q(o.onPointerDown, () => {
        i.current === null && (i.current = window.setInterval(n, 50));
      }),
      onPointerMove: q(o.onPointerMove, () => {
        a.onItemLeave?.(), i.current === null && (i.current = window.setInterval(n, 50));
      }),
      onPointerLeave: q(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), jD = "SelectSeparator", GE = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return /* @__PURE__ */ b(ne.div, { "aria-hidden": !0, ...n, ref: t });
  }
);
GE.displayName = jD;
var Id = "SelectArrow", LD = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = gc(r), a = on(Id, r), i = an(Id, r);
    return a.open && i.position === "popper" ? /* @__PURE__ */ b(cp, { ...o, ...n, ref: t }) : null;
  }
);
LD.displayName = Id;
var $D = "SelectBubbleInput", YE = m.forwardRef(
  ({ __scopeSelect: e, value: t, ...r }, n) => {
    const o = m.useRef(null), a = de(n, o), i = Gs(t);
    return m.useEffect(() => {
      const s = o.current;
      if (!s) return;
      const c = window.HTMLSelectElement.prototype, l = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (i !== t && l) {
        const d = new Event("change", { bubbles: !0 });
        l.call(s, t), s.dispatchEvent(d);
      }
    }, [i, t]), /* @__PURE__ */ b(
      ne.select,
      {
        ...r,
        style: { ...SE, ...r.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
YE.displayName = $D;
function XE(e) {
  return e === "" || e === void 0;
}
function ZE(e) {
  const t = pt(e), r = m.useRef(""), n = m.useRef(0), o = m.useCallback(
    (i) => {
      const s = r.current + i;
      t(s), (function c(u) {
        r.current = u, window.clearTimeout(n.current), u !== "" && (n.current = window.setTimeout(() => c(""), 1e3));
      })(s);
    },
    [t]
  ), a = m.useCallback(() => {
    r.current = "", window.clearTimeout(n.current);
  }, []);
  return m.useEffect(() => () => window.clearTimeout(n.current), []), [r, o, a];
}
function JE(e, t, r) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = r ? e.indexOf(r) : -1;
  let i = BD(e, Math.max(a, 0));
  o.length === 1 && (i = i.filter((u) => u !== r));
  const c = i.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== r ? c : void 0;
}
function BD(e, t) {
  return e.map((r, n) => e[(t + n) % e.length]);
}
var FD = OE, QE = AE, zD = TE, UD = _E, WD = kE, eS = NE, KD = DE, VD = LE, tS = BE, rS = zE, qD = UE, HD = KE, nS = VE, oS = qE, aS = GE;
const GD = FD, E7 = VD, YD = zD, iS = m.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ U(
  QE,
  {
    ref: n,
    className: V(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ b(UD, { asChild: !0, children: /* @__PURE__ */ b(na, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
iS.displayName = QE.displayName;
const sS = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  nS,
  {
    ref: r,
    className: V(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ b(Xw, { className: "h-4 w-4" })
  }
));
sS.displayName = nS.displayName;
const cS = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  oS,
  {
    ref: r,
    className: V(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ b(na, { className: "h-4 w-4" })
  }
));
cS.displayName = oS.displayName;
const lS = m.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ b(WD, { children: /* @__PURE__ */ U(
  eS,
  {
    ref: o,
    className: V(
      "relative z-[250] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ b(sS, {}),
      /* @__PURE__ */ b(
        KD,
        {
          className: V(
            "p-1",
            r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ b(cS, {})
    ]
  }
) }));
lS.displayName = eS.displayName;
const XD = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  tS,
  {
    ref: r,
    className: V("py-1.5 pl-8 pr-2 text-sm font-semibold", e),
    ...t
  }
));
XD.displayName = tS.displayName;
const uS = m.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ U(
  rS,
  {
    ref: n,
    className: V(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ b("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ b(HD, { children: /* @__PURE__ */ b(qs, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ b(qD, { children: t })
    ]
  }
));
uS.displayName = rS.displayName;
const ZD = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  aS,
  {
    ref: r,
    className: V("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
ZD.displayName = aS.displayName;
const JD = m.forwardRef(
  ({
    options: e,
    value: t,
    onValueChange: r,
    placeholder: n = "Selecione uma opção",
    searchPlaceholder: o = "Pesquisar...",
    disabled: a,
    className: i,
    emptyMessage: s = "Nenhum resultado encontrado"
  }, c) => {
    const [u, l] = m.useState(""), [d, p] = m.useState(!1), f = m.useMemo(() => {
      if (!u) return e;
      const v = u.toLowerCase();
      return e.filter(
        (h) => h.label.toLowerCase().includes(v)
      );
    }, [e, u]);
    return m.useEffect(() => {
      d || l("");
    }, [d]), /* @__PURE__ */ U(
      GD,
      {
        value: t,
        onValueChange: r,
        disabled: a,
        open: d,
        onOpenChange: p,
        children: [
          /* @__PURE__ */ b(iS, { ref: c, className: i, children: /* @__PURE__ */ b(YD, { placeholder: n }) }),
          /* @__PURE__ */ U(lS, { children: [
            /* @__PURE__ */ U("div", { className: "flex items-center border-b px-3 pb-2", children: [
              /* @__PURE__ */ b(Y_, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
              /* @__PURE__ */ b(
                c0,
                {
                  placeholder: o,
                  value: u,
                  onChange: (v) => l(v.target.value),
                  className: "h-8 border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent"
                }
              )
            ] }),
            /* @__PURE__ */ b("div", { className: "max-h-[300px] overflow-auto", children: f.length === 0 ? /* @__PURE__ */ b("div", { className: "py-6 text-center text-sm text-muted-foreground", children: s }) : f.map((v) => /* @__PURE__ */ b(uS, { value: v.value, children: v.label }, v.value)) })
          ] })
        ]
      }
    );
  }
);
JD.displayName = "SearchableSelect";
var wp = "Radio", [QD, dS] = Et(wp), [ej, tj] = QD(wp), fS = m.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: r,
      name: n,
      checked: o = !1,
      required: a,
      disabled: i,
      value: s = "on",
      onCheck: c,
      form: u,
      ...l
    } = e, [d, p] = m.useState(null), f = de(t, (g) => p(g)), v = m.useRef(!1), h = d ? u || !!d.closest("form") : !0;
    return /* @__PURE__ */ U(ej, { scope: r, checked: o, disabled: i, children: [
      /* @__PURE__ */ b(
        ne.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": vS(o),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: s,
          ...l,
          ref: f,
          onClick: q(e.onClick, (g) => {
            o || c?.(), h && (v.current = g.isPropagationStopped(), v.current || g.stopPropagation());
          })
        }
      ),
      h && /* @__PURE__ */ b(
        mS,
        {
          control: d,
          bubbles: !v.current,
          name: n,
          value: s,
          checked: o,
          required: a,
          disabled: i,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
fS.displayName = wp;
var pS = "RadioIndicator", hS = m.forwardRef(
  (e, t) => {
    const { __scopeRadio: r, forceMount: n, ...o } = e, a = tj(pS, r);
    return /* @__PURE__ */ b(jt, { present: n || a.checked, children: /* @__PURE__ */ b(
      ne.span,
      {
        "data-state": vS(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
hS.displayName = pS;
var rj = "RadioBubbleInput", mS = m.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: r,
    bubbles: n = !0,
    ...o
  }, a) => {
    const i = m.useRef(null), s = de(i, a), c = Gs(r), u = Ys(t);
    return m.useEffect(() => {
      const l = i.current;
      if (!l) return;
      const d = window.HTMLInputElement.prototype, f = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== r && f) {
        const v = new Event("click", { bubbles: n });
        f.call(l, r), l.dispatchEvent(v);
      }
    }, [c, r, n]), /* @__PURE__ */ b(
      ne.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: r,
        ...o,
        tabIndex: -1,
        ref: s,
        style: {
          ...o.style,
          ...u,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
mS.displayName = rj;
function vS(e) {
  return e ? "checked" : "unchecked";
}
var nj = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], yc = "RadioGroup", [oj] = Et(yc, [
  So,
  dS
]), gS = So(), yS = dS(), [aj, ij] = oj(yc), bS = m.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: r,
      name: n,
      defaultValue: o,
      value: a,
      required: i = !1,
      disabled: s = !1,
      orientation: c,
      dir: u,
      loop: l = !0,
      onValueChange: d,
      ...p
    } = e, f = gS(r), v = Pa(u), [h, g] = qt({
      prop: a,
      defaultProp: o ?? null,
      onChange: d,
      caller: yc
    });
    return /* @__PURE__ */ b(
      aj,
      {
        scope: r,
        name: n,
        required: i,
        disabled: s,
        value: h,
        onValueChange: g,
        children: /* @__PURE__ */ b(
          lp,
          {
            asChild: !0,
            ...f,
            orientation: c,
            dir: v,
            loop: l,
            children: /* @__PURE__ */ b(
              ne.div,
              {
                role: "radiogroup",
                "aria-required": i,
                "aria-orientation": c,
                "data-disabled": s ? "" : void 0,
                dir: v,
                ...p,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
bS.displayName = yc;
var wS = "RadioGroupItem", xS = m.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: r, disabled: n, ...o } = e, a = ij(wS, r), i = a.disabled || n, s = gS(r), c = yS(r), u = m.useRef(null), l = de(t, u), d = a.value === o.value, p = m.useRef(!1);
    return m.useEffect(() => {
      const f = (h) => {
        nj.includes(h.key) && (p.current = !0);
      }, v = () => p.current = !1;
      return document.addEventListener("keydown", f), document.addEventListener("keyup", v), () => {
        document.removeEventListener("keydown", f), document.removeEventListener("keyup", v);
      };
    }, []), /* @__PURE__ */ b(
      up,
      {
        asChild: !0,
        ...s,
        focusable: !i,
        active: d,
        children: /* @__PURE__ */ b(
          fS,
          {
            disabled: i,
            required: a.required,
            checked: d,
            ...c,
            ...o,
            name: a.name,
            ref: l,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: q((f) => {
              f.key === "Enter" && f.preventDefault();
            }),
            onFocus: q(o.onFocus, () => {
              p.current && u.current?.click();
            })
          }
        )
      }
    );
  }
);
xS.displayName = wS;
var sj = "RadioGroupIndicator", ES = m.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: r, ...n } = e, o = yS(r);
    return /* @__PURE__ */ b(hS, { ...o, ...n, ref: t });
  }
);
ES.displayName = sj;
var SS = bS, OS = xS, cj = ES;
const lj = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  SS,
  {
    className: V("grid gap-2", e),
    ...t,
    ref: r
  }
));
lj.displayName = SS.displayName;
const uj = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  OS,
  {
    ref: r,
    className: V(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ b(cj, { className: "flex items-center justify-center", children: /* @__PURE__ */ b(Zw, { className: "h-2.5 w-2.5 fill-current text-current" }) })
  }
));
uj.displayName = OS.displayName;
var bc = "Switch", [dj] = Et(bc), [fj, pj] = dj(bc), PS = m.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: r,
      name: n,
      checked: o,
      defaultChecked: a,
      required: i,
      disabled: s,
      value: c = "on",
      onCheckedChange: u,
      form: l,
      ...d
    } = e, [p, f] = m.useState(null), v = de(t, (x) => f(x)), h = m.useRef(!1), g = p ? l || !!p.closest("form") : !0, [y, w] = qt({
      prop: o,
      defaultProp: a ?? !1,
      onChange: u,
      caller: bc
    });
    return /* @__PURE__ */ U(fj, { scope: r, checked: y, disabled: s, children: [
      /* @__PURE__ */ b(
        ne.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-required": i,
          "data-state": _S(y),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: c,
          ...d,
          ref: v,
          onClick: q(e.onClick, (x) => {
            w((S) => !S), g && (h.current = x.isPropagationStopped(), h.current || x.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ b(
        TS,
        {
          control: p,
          bubbles: !h.current,
          name: n,
          value: c,
          checked: y,
          required: i,
          disabled: s,
          form: l,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
PS.displayName = bc;
var AS = "SwitchThumb", CS = m.forwardRef(
  (e, t) => {
    const { __scopeSwitch: r, ...n } = e, o = pj(AS, r);
    return /* @__PURE__ */ b(
      ne.span,
      {
        "data-state": _S(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...n,
        ref: t
      }
    );
  }
);
CS.displayName = AS;
var hj = "SwitchBubbleInput", TS = m.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: r,
    bubbles: n = !0,
    ...o
  }, a) => {
    const i = m.useRef(null), s = de(i, a), c = Gs(r), u = Ys(t);
    return m.useEffect(() => {
      const l = i.current;
      if (!l) return;
      const d = window.HTMLInputElement.prototype, f = Object.getOwnPropertyDescriptor(
        d,
        "checked"
      ).set;
      if (c !== r && f) {
        const v = new Event("click", { bubbles: n });
        f.call(l, r), l.dispatchEvent(v);
      }
    }, [c, r, n]), /* @__PURE__ */ b(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: r,
        ...o,
        tabIndex: -1,
        ref: s,
        style: {
          ...o.style,
          ...u,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
TS.displayName = hj;
function _S(e) {
  return e ? "checked" : "unchecked";
}
var kS = PS, mj = CS;
const vj = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  kS,
  {
    className: V(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ b(
      mj,
      {
        className: V(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
vj.displayName = kS.displayName;
var wc = "Tabs", [gj] = Et(wc, [
  So
]), NS = So(), [yj, xp] = gj(wc), RS = m.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: r,
      value: n,
      onValueChange: o,
      defaultValue: a,
      orientation: i = "horizontal",
      dir: s,
      activationMode: c = "automatic",
      ...u
    } = e, l = Pa(s), [d, p] = qt({
      prop: n,
      onChange: o,
      defaultProp: a ?? "",
      caller: wc
    });
    return /* @__PURE__ */ b(
      yj,
      {
        scope: r,
        baseId: Nt(),
        value: d,
        onValueChange: p,
        orientation: i,
        dir: l,
        activationMode: c,
        children: /* @__PURE__ */ b(
          ne.div,
          {
            dir: l,
            "data-orientation": i,
            ...u,
            ref: t
          }
        )
      }
    );
  }
);
RS.displayName = wc;
var MS = "TabsList", IS = m.forwardRef(
  (e, t) => {
    const { __scopeTabs: r, loop: n = !0, ...o } = e, a = xp(MS, r), i = NS(r);
    return /* @__PURE__ */ b(
      lp,
      {
        asChild: !0,
        ...i,
        orientation: a.orientation,
        dir: a.dir,
        loop: n,
        children: /* @__PURE__ */ b(
          ne.div,
          {
            role: "tablist",
            "aria-orientation": a.orientation,
            ...o,
            ref: t
          }
        )
      }
    );
  }
);
IS.displayName = MS;
var DS = "TabsTrigger", jS = m.forwardRef(
  (e, t) => {
    const { __scopeTabs: r, value: n, disabled: o = !1, ...a } = e, i = xp(DS, r), s = NS(r), c = BS(i.baseId, n), u = FS(i.baseId, n), l = n === i.value;
    return /* @__PURE__ */ b(
      up,
      {
        asChild: !0,
        ...s,
        focusable: !o,
        active: l,
        children: /* @__PURE__ */ b(
          ne.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": l,
            "aria-controls": u,
            "data-state": l ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: c,
            ...a,
            ref: t,
            onMouseDown: q(e.onMouseDown, (d) => {
              !o && d.button === 0 && d.ctrlKey === !1 ? i.onValueChange(n) : d.preventDefault();
            }),
            onKeyDown: q(e.onKeyDown, (d) => {
              [" ", "Enter"].includes(d.key) && i.onValueChange(n);
            }),
            onFocus: q(e.onFocus, () => {
              const d = i.activationMode !== "manual";
              !l && !o && d && i.onValueChange(n);
            })
          }
        )
      }
    );
  }
);
jS.displayName = DS;
var LS = "TabsContent", $S = m.forwardRef(
  (e, t) => {
    const { __scopeTabs: r, value: n, forceMount: o, children: a, ...i } = e, s = xp(LS, r), c = BS(s.baseId, n), u = FS(s.baseId, n), l = n === s.value, d = m.useRef(l);
    return m.useEffect(() => {
      const p = requestAnimationFrame(() => d.current = !1);
      return () => cancelAnimationFrame(p);
    }, []), /* @__PURE__ */ b(jt, { present: o || l, children: ({ present: p }) => /* @__PURE__ */ b(
      ne.div,
      {
        "data-state": l ? "active" : "inactive",
        "data-orientation": s.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !p,
        id: u,
        tabIndex: 0,
        ...i,
        ref: t,
        style: {
          ...e.style,
          animationDuration: d.current ? "0s" : void 0
        },
        children: p && a
      }
    ) });
  }
);
$S.displayName = LS;
function BS(e, t) {
  return `${e}-trigger-${t}`;
}
function FS(e, t) {
  return `${e}-content-${t}`;
}
var bj = RS, zS = IS, US = jS, WS = $S;
const S7 = bj, wj = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  zS,
  {
    ref: r,
    className: V(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
wj.displayName = zS.displayName;
const xj = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  US,
  {
    ref: r,
    className: V(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      e
    ),
    ...t
  }
));
xj.displayName = US.displayName;
const Ej = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  WS,
  {
    ref: r,
    className: V(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
Ej.displayName = WS.displayName;
var Ep = "ToastProvider", [Sp, Sj, Oj] = ic("Toast"), [KS] = Et("Toast", [Oj]), [Pj, xc] = KS(Ep), VS = (e) => {
  const {
    __scopeToast: t,
    label: r = "Notification",
    duration: n = 5e3,
    swipeDirection: o = "right",
    swipeThreshold: a = 50,
    children: i
  } = e, [s, c] = m.useState(null), [u, l] = m.useState(0), d = m.useRef(!1), p = m.useRef(!1);
  return r.trim() || console.error(
    `Invalid prop \`label\` supplied to \`${Ep}\`. Expected non-empty \`string\`.`
  ), /* @__PURE__ */ b(Sp.Provider, { scope: t, children: /* @__PURE__ */ b(
    Pj,
    {
      scope: t,
      label: r,
      duration: n,
      swipeDirection: o,
      swipeThreshold: a,
      toastCount: u,
      viewport: s,
      onViewportChange: c,
      onToastAdd: m.useCallback(() => l((f) => f + 1), []),
      onToastRemove: m.useCallback(() => l((f) => f - 1), []),
      isFocusedToastEscapeKeyDownRef: d,
      isClosePausedRef: p,
      children: i
    }
  ) });
};
VS.displayName = Ep;
var qS = "ToastViewport", Aj = ["F8"], Dd = "toast.viewportPause", jd = "toast.viewportResume", HS = m.forwardRef(
  (e, t) => {
    const {
      __scopeToast: r,
      hotkey: n = Aj,
      label: o = "Notifications ({hotkey})",
      ...a
    } = e, i = xc(qS, r), s = Sj(r), c = m.useRef(null), u = m.useRef(null), l = m.useRef(null), d = m.useRef(null), p = de(t, d, i.onViewportChange), f = n.join("+").replace(/Key/g, "").replace(/Digit/g, ""), v = i.toastCount > 0;
    m.useEffect(() => {
      const g = (y) => {
        n.length !== 0 && n.every((x) => y[x] || y.code === x) && d.current?.focus();
      };
      return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
    }, [n]), m.useEffect(() => {
      const g = c.current, y = d.current;
      if (v && g && y) {
        const w = () => {
          if (!i.isClosePausedRef.current) {
            const O = new CustomEvent(Dd);
            y.dispatchEvent(O), i.isClosePausedRef.current = !0;
          }
        }, x = () => {
          if (i.isClosePausedRef.current) {
            const O = new CustomEvent(jd);
            y.dispatchEvent(O), i.isClosePausedRef.current = !1;
          }
        }, S = (O) => {
          !g.contains(O.relatedTarget) && x();
        }, E = () => {
          g.contains(document.activeElement) || x();
        };
        return g.addEventListener("focusin", w), g.addEventListener("focusout", S), g.addEventListener("pointermove", w), g.addEventListener("pointerleave", E), window.addEventListener("blur", w), window.addEventListener("focus", x), () => {
          g.removeEventListener("focusin", w), g.removeEventListener("focusout", S), g.removeEventListener("pointermove", w), g.removeEventListener("pointerleave", E), window.removeEventListener("blur", w), window.removeEventListener("focus", x);
        };
      }
    }, [v, i.isClosePausedRef]);
    const h = m.useCallback(
      ({ tabbingDirection: g }) => {
        const w = s().map((x) => {
          const S = x.ref.current, E = [S, ...Bj(S)];
          return g === "forwards" ? E : E.reverse();
        });
        return (g === "forwards" ? w.reverse() : w).flat();
      },
      [s]
    );
    return m.useEffect(() => {
      const g = d.current;
      if (g) {
        const y = (w) => {
          const x = w.altKey || w.ctrlKey || w.metaKey;
          if (w.key === "Tab" && !x) {
            const E = document.activeElement, O = w.shiftKey;
            if (w.target === g && O) {
              u.current?.focus();
              return;
            }
            const _ = h({ tabbingDirection: O ? "backwards" : "forwards" }), N = _.findIndex((T) => T === E);
            Dl(_.slice(N + 1)) ? w.preventDefault() : O ? u.current?.focus() : l.current?.focus();
          }
        };
        return g.addEventListener("keydown", y), () => g.removeEventListener("keydown", y);
      }
    }, [s, h]), /* @__PURE__ */ U(
      gN,
      {
        ref: c,
        role: "region",
        "aria-label": o.replace("{hotkey}", f),
        tabIndex: -1,
        style: { pointerEvents: v ? void 0 : "none" },
        children: [
          v && /* @__PURE__ */ b(
            Ld,
            {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const g = h({
                  tabbingDirection: "forwards"
                });
                Dl(g);
              }
            }
          ),
          /* @__PURE__ */ b(Sp.Slot, { scope: r, children: /* @__PURE__ */ b(ne.ol, { tabIndex: -1, ...a, ref: p }) }),
          v && /* @__PURE__ */ b(
            Ld,
            {
              ref: l,
              onFocusFromOutsideViewport: () => {
                const g = h({
                  tabbingDirection: "backwards"
                });
                Dl(g);
              }
            }
          )
        ]
      }
    );
  }
);
HS.displayName = qS;
var GS = "ToastFocusProxy", Ld = m.forwardRef(
  (e, t) => {
    const { __scopeToast: r, onFocusFromOutsideViewport: n, ...o } = e, a = xc(GS, r);
    return /* @__PURE__ */ b(
      hc,
      {
        tabIndex: 0,
        ...o,
        ref: t,
        style: { position: "fixed" },
        onFocus: (i) => {
          const s = i.relatedTarget;
          !a.viewport?.contains(s) && n();
        }
      }
    );
  }
);
Ld.displayName = GS;
var Na = "Toast", Cj = "toast.swipeStart", Tj = "toast.swipeMove", _j = "toast.swipeCancel", kj = "toast.swipeEnd", YS = m.forwardRef(
  (e, t) => {
    const { forceMount: r, open: n, defaultOpen: o, onOpenChange: a, ...i } = e, [s, c] = qt({
      prop: n,
      defaultProp: o ?? !0,
      onChange: a,
      caller: Na
    });
    return /* @__PURE__ */ b(jt, { present: r || s, children: /* @__PURE__ */ b(
      Mj,
      {
        open: s,
        ...i,
        ref: t,
        onClose: () => c(!1),
        onPause: pt(e.onPause),
        onResume: pt(e.onResume),
        onSwipeStart: q(e.onSwipeStart, (u) => {
          u.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: q(e.onSwipeMove, (u) => {
          const { x: l, y: d } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "move"), u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${l}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${d}px`);
        }),
        onSwipeCancel: q(e.onSwipeCancel, (u) => {
          u.currentTarget.setAttribute("data-swipe", "cancel"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
        }),
        onSwipeEnd: q(e.onSwipeEnd, (u) => {
          const { x: l, y: d } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "end"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${l}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${d}px`), c(!1);
        })
      }
    ) });
  }
);
YS.displayName = Na;
var [Nj, Rj] = KS(Na, {
  onClose() {
  }
}), Mj = m.forwardRef(
  (e, t) => {
    const {
      __scopeToast: r,
      type: n = "foreground",
      duration: o,
      open: a,
      onClose: i,
      onEscapeKeyDown: s,
      onPause: c,
      onResume: u,
      onSwipeStart: l,
      onSwipeMove: d,
      onSwipeCancel: p,
      onSwipeEnd: f,
      ...v
    } = e, h = xc(Na, r), [g, y] = m.useState(null), w = de(t, (C) => y(C)), x = m.useRef(null), S = m.useRef(null), E = o || h.duration, O = m.useRef(0), P = m.useRef(E), A = m.useRef(0), { onToastAdd: _, onToastRemove: N } = h, T = pt(() => {
      g?.contains(document.activeElement) && h.viewport?.focus(), i();
    }), R = m.useCallback(
      (C) => {
        !C || C === 1 / 0 || (window.clearTimeout(A.current), O.current = (/* @__PURE__ */ new Date()).getTime(), A.current = window.setTimeout(T, C));
      },
      [T]
    );
    m.useEffect(() => {
      const C = h.viewport;
      if (C) {
        const D = () => {
          R(P.current), u?.();
        }, $ = () => {
          const z = (/* @__PURE__ */ new Date()).getTime() - O.current;
          P.current = P.current - z, window.clearTimeout(A.current), c?.();
        };
        return C.addEventListener(Dd, $), C.addEventListener(jd, D), () => {
          C.removeEventListener(Dd, $), C.removeEventListener(jd, D);
        };
      }
    }, [h.viewport, E, c, u, R]), m.useEffect(() => {
      a && !h.isClosePausedRef.current && R(E);
    }, [a, E, h.isClosePausedRef, R]), m.useEffect(() => (_(), () => N()), [_, N]);
    const j = m.useMemo(() => g ? rO(g) : null, [g]);
    return h.viewport ? /* @__PURE__ */ U(yt, { children: [
      j && /* @__PURE__ */ b(
        Ij,
        {
          __scopeToast: r,
          role: "status",
          "aria-live": n === "foreground" ? "assertive" : "polite",
          children: j
        }
      ),
      /* @__PURE__ */ b(Nj, { scope: r, onClose: T, children: Sa.createPortal(
        /* @__PURE__ */ b(Sp.ItemSlot, { scope: r, children: /* @__PURE__ */ b(
          vN,
          {
            asChild: !0,
            onEscapeKeyDown: q(s, () => {
              h.isFocusedToastEscapeKeyDownRef.current || T(), h.isFocusedToastEscapeKeyDownRef.current = !1;
            }),
            children: /* @__PURE__ */ b(
              ne.li,
              {
                tabIndex: 0,
                "data-state": a ? "open" : "closed",
                "data-swipe-direction": h.swipeDirection,
                ...v,
                ref: w,
                style: { userSelect: "none", touchAction: "none", ...e.style },
                onKeyDown: q(e.onKeyDown, (C) => {
                  C.key === "Escape" && (s?.(C.nativeEvent), C.nativeEvent.defaultPrevented || (h.isFocusedToastEscapeKeyDownRef.current = !0, T()));
                }),
                onPointerDown: q(e.onPointerDown, (C) => {
                  C.button === 0 && (x.current = { x: C.clientX, y: C.clientY });
                }),
                onPointerMove: q(e.onPointerMove, (C) => {
                  if (!x.current) return;
                  const D = C.clientX - x.current.x, $ = C.clientY - x.current.y, z = !!S.current, I = ["left", "right"].includes(h.swipeDirection), F = ["left", "up"].includes(h.swipeDirection) ? Math.min : Math.max, oe = I ? F(0, D) : 0, H = I ? 0 : F(0, $), ie = C.pointerType === "touch" ? 10 : 2, ae = { x: oe, y: H }, W = { originalEvent: C, delta: ae };
                  z ? (S.current = ae, pi(Tj, d, W, {
                    discrete: !1
                  })) : fv(ae, h.swipeDirection, ie) ? (S.current = ae, pi(Cj, l, W, {
                    discrete: !1
                  }), C.target.setPointerCapture(C.pointerId)) : (Math.abs(D) > ie || Math.abs($) > ie) && (x.current = null);
                }),
                onPointerUp: q(e.onPointerUp, (C) => {
                  const D = S.current, $ = C.target;
                  if ($.hasPointerCapture(C.pointerId) && $.releasePointerCapture(C.pointerId), S.current = null, x.current = null, D) {
                    const z = C.currentTarget, I = { originalEvent: C, delta: D };
                    fv(D, h.swipeDirection, h.swipeThreshold) ? pi(kj, f, I, {
                      discrete: !0
                    }) : pi(
                      _j,
                      p,
                      I,
                      {
                        discrete: !0
                      }
                    ), z.addEventListener("click", (F) => F.preventDefault(), {
                      once: !0
                    });
                  }
                })
              }
            )
          }
        ) }),
        h.viewport
      ) })
    ] }) : null;
  }
), Ij = (e) => {
  const { __scopeToast: t, children: r, ...n } = e, o = xc(Na, t), [a, i] = m.useState(!1), [s, c] = m.useState(!1);
  return Lj(() => i(!0)), m.useEffect(() => {
    const u = window.setTimeout(() => c(!0), 1e3);
    return () => window.clearTimeout(u);
  }, []), s ? null : /* @__PURE__ */ b(Oa, { asChild: !0, children: /* @__PURE__ */ b(hc, { ...n, children: a && /* @__PURE__ */ U(yt, { children: [
    o.label,
    " ",
    r
  ] }) }) });
}, Dj = "ToastTitle", XS = m.forwardRef(
  (e, t) => {
    const { __scopeToast: r, ...n } = e;
    return /* @__PURE__ */ b(ne.div, { ...n, ref: t });
  }
);
XS.displayName = Dj;
var jj = "ToastDescription", ZS = m.forwardRef(
  (e, t) => {
    const { __scopeToast: r, ...n } = e;
    return /* @__PURE__ */ b(ne.div, { ...n, ref: t });
  }
);
ZS.displayName = jj;
var JS = "ToastAction", QS = m.forwardRef(
  (e, t) => {
    const { altText: r, ...n } = e;
    return r.trim() ? /* @__PURE__ */ b(tO, { altText: r, asChild: !0, children: /* @__PURE__ */ b(Op, { ...n, ref: t }) }) : (console.error(
      `Invalid prop \`altText\` supplied to \`${JS}\`. Expected non-empty \`string\`.`
    ), null);
  }
);
QS.displayName = JS;
var eO = "ToastClose", Op = m.forwardRef(
  (e, t) => {
    const { __scopeToast: r, ...n } = e, o = Rj(eO, r);
    return /* @__PURE__ */ b(tO, { asChild: !0, children: /* @__PURE__ */ b(
      ne.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: q(e.onClick, o.onClose)
      }
    ) });
  }
);
Op.displayName = eO;
var tO = m.forwardRef((e, t) => {
  const { __scopeToast: r, altText: n, ...o } = e;
  return /* @__PURE__ */ b(
    ne.div,
    {
      "data-radix-toast-announce-exclude": "",
      "data-radix-toast-announce-alt": n || void 0,
      ...o,
      ref: t
    }
  );
});
function rO(e) {
  const t = [];
  return Array.from(e.childNodes).forEach((n) => {
    if (n.nodeType === n.TEXT_NODE && n.textContent && t.push(n.textContent), $j(n)) {
      const o = n.ariaHidden || n.hidden || n.style.display === "none", a = n.dataset.radixToastAnnounceExclude === "";
      if (!o)
        if (a) {
          const i = n.dataset.radixToastAnnounceAlt;
          i && t.push(i);
        } else
          t.push(...rO(n));
    }
  }), t;
}
function pi(e, t, r, { discrete: n }) {
  const o = r.originalEvent.currentTarget, a = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? Kf(o, a) : o.dispatchEvent(a);
}
var fv = (e, t, r = 0) => {
  const n = Math.abs(e.x), o = Math.abs(e.y), a = n > o;
  return t === "left" || t === "right" ? a && n > r : !a && o > r;
};
function Lj(e = () => {
}) {
  const t = pt(e);
  nt(() => {
    let r = 0, n = 0;
    return r = window.requestAnimationFrame(() => n = window.requestAnimationFrame(t)), () => {
      window.cancelAnimationFrame(r), window.cancelAnimationFrame(n);
    };
  }, [t]);
}
function $j(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function Bj(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function Dl(e) {
  const t = document.activeElement;
  return e.some((r) => r === t ? !0 : (r.focus(), document.activeElement !== t));
}
var Fj = VS, nO = HS, oO = YS, aO = XS, iO = ZS, sO = QS, zj = Op;
const Uj = {
  default: null,
  success: k_,
  destructive: M_,
  warning: nk,
  info: D_
}, Wj = Fj, cO = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  nO,
  {
    ref: r,
    className: V(
      "fixed top-0 z-[300] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      e
    ),
    ...t
  }
));
cO.displayName = nO.displayName;
const Kj = vo(
  "group pointer-events-auto relative flex w-full overflow-hidden rounded-xl shadow-xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border border-border",
        success: "bg-success text-success-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        warning: "bg-warning text-warning-foreground",
        info: "bg-info text-info-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Vj = vo(
  "flex shrink-0 items-center justify-center rounded-lg w-10 h-10",
  {
    variants: {
      variant: {
        default: "bg-foreground/10",
        success: "bg-success-foreground/20",
        destructive: "bg-destructive-foreground/20",
        warning: "bg-warning-foreground/20",
        info: "bg-info-foreground/20"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), lO = m.forwardRef(({ className: e, variant: t, showIcon: r = !0, children: n, ...o }, a) => {
  const i = t ? Uj[t] : null;
  return /* @__PURE__ */ b(
    oO,
    {
      ref: a,
      className: V(Kj({ variant: t }), e),
      ...o,
      children: /* @__PURE__ */ U("div", { className: "flex w-full items-start gap-3 p-4", children: [
        r && i && /* @__PURE__ */ b("div", { className: V(Vj({ variant: t })), children: /* @__PURE__ */ b(i, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ b("div", { className: "flex-1 min-w-0", children: n }),
        /* @__PURE__ */ b(zj, { className: "shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring", children: /* @__PURE__ */ b(Uf, { className: "h-4 w-4" }) })
      ] })
    }
  );
});
lO.displayName = oO.displayName;
const qj = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  sO,
  {
    ref: r,
    className: V(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-current/20 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
      e
    ),
    ...t
  }
));
qj.displayName = sO.displayName;
const uO = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  aO,
  {
    ref: r,
    className: V("text-sm font-bold leading-tight", e),
    ...t
  }
));
uO.displayName = aO.displayName;
const dO = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  iO,
  {
    ref: r,
    className: V("text-sm opacity-80 mt-1 leading-snug", e),
    ...t
  }
));
dO.displayName = iO.displayName;
const Hj = 1, Gj = 1e6;
let jl = 0;
function Yj() {
  return jl = (jl + 1) % Number.MAX_SAFE_INTEGER, jl.toString();
}
const Ll = /* @__PURE__ */ new Map(), pv = (e) => {
  if (Ll.has(e))
    return;
  const t = setTimeout(() => {
    Ll.delete(e), ea({
      type: "REMOVE_TOAST",
      toastId: e
    });
  }, Gj);
  Ll.set(e, t);
}, Xj = (e, t) => {
  switch (t.type) {
    case "ADD_TOAST":
      return {
        ...e,
        toasts: [t.toast, ...e.toasts].slice(0, Hj)
      };
    case "UPDATE_TOAST":
      return {
        ...e,
        toasts: e.toasts.map(
          (r) => r.id === t.toast.id ? { ...r, ...t.toast } : r
        )
      };
    case "DISMISS_TOAST": {
      const { toastId: r } = t;
      return r ? pv(r) : e.toasts.forEach((n) => {
        pv(n.id);
      }), {
        ...e,
        toasts: e.toasts.map(
          (n) => n.id === r || r === void 0 ? {
            ...n,
            open: !1
          } : n
        )
      };
    }
    case "REMOVE_TOAST":
      return t.toastId === void 0 ? {
        ...e,
        toasts: []
      } : {
        ...e,
        toasts: e.toasts.filter((r) => r.id !== t.toastId)
      };
  }
}, Bi = [];
let Fi = { toasts: [] };
function ea(e) {
  Fi = Xj(Fi, e), Bi.forEach((t) => {
    t(Fi);
  });
}
function $d({ ...e }) {
  const t = Yj(), r = (o) => ea({
    type: "UPDATE_TOAST",
    toast: { ...o, id: t }
  }), n = () => ea({ type: "DISMISS_TOAST", toastId: t });
  return ea({
    type: "ADD_TOAST",
    toast: {
      ...e,
      id: t,
      open: !0,
      onOpenChange: (o) => {
        o || n();
      }
    }
  }), {
    id: t,
    dismiss: n,
    update: r
  };
}
function fO() {
  const [e, t] = m.useState(Fi);
  return m.useEffect(() => (Bi.push(t), () => {
    const r = Bi.indexOf(t);
    r > -1 && Bi.splice(r, 1);
  }), [e]), {
    ...e,
    toast: $d,
    dismiss: (r) => ea({ type: "DISMISS_TOAST", toastId: r })
  };
}
function O7() {
  const { toasts: e } = fO();
  return /* @__PURE__ */ U(Wj, { children: [
    e.map(function({ id: t, title: r, description: n, action: o, ...a }) {
      return /* @__PURE__ */ U(lO, { ...a, children: [
        r && /* @__PURE__ */ b(uO, { children: r }),
        n && /* @__PURE__ */ b(dO, { children: n }),
        o
      ] }, t);
    }),
    /* @__PURE__ */ b(cO, {})
  ] });
}
var [Ec] = Et("Tooltip", [
  Eo
]), Sc = Eo(), pO = "TooltipProvider", Zj = 700, Bd = "tooltip.open", [Jj, Pp] = Ec(pO), hO = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: r = Zj,
    skipDelayDuration: n = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, i = m.useRef(!0), s = m.useRef(!1), c = m.useRef(0);
  return m.useEffect(() => {
    const u = c.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ b(
    Jj,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: r,
      onOpen: m.useCallback(() => {
        window.clearTimeout(c.current), i.current = !1;
      }, []),
      onClose: m.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => i.current = !0,
          n
        );
      }, [n]),
      isPointerInTransitRef: s,
      onPointerInTransitChange: m.useCallback((u) => {
        s.current = u;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
hO.displayName = pO;
var ca = "Tooltip", [Qj, Oc] = Ec(ca), mO = (e) => {
  const {
    __scopeTooltip: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: i,
    delayDuration: s
  } = e, c = Pp(ca, e.__scopeTooltip), u = Sc(t), [l, d] = m.useState(null), p = Nt(), f = m.useRef(0), v = i ?? c.disableHoverableContent, h = s ?? c.delayDuration, g = m.useRef(!1), [y, w] = qt({
    prop: n,
    defaultProp: o ?? !1,
    onChange: (P) => {
      P ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Bd))) : c.onClose(), a?.(P);
    },
    caller: ca
  }), x = m.useMemo(() => y ? g.current ? "delayed-open" : "instant-open" : "closed", [y]), S = m.useCallback(() => {
    window.clearTimeout(f.current), f.current = 0, g.current = !1, w(!0);
  }, [w]), E = m.useCallback(() => {
    window.clearTimeout(f.current), f.current = 0, w(!1);
  }, [w]), O = m.useCallback(() => {
    window.clearTimeout(f.current), f.current = window.setTimeout(() => {
      g.current = !0, w(!0), f.current = 0;
    }, h);
  }, [h, w]);
  return m.useEffect(() => () => {
    f.current && (window.clearTimeout(f.current), f.current = 0);
  }, []), /* @__PURE__ */ b(dc, { ...u, children: /* @__PURE__ */ b(
    Qj,
    {
      scope: t,
      contentId: p,
      open: y,
      stateAttribute: x,
      trigger: l,
      onTriggerChange: d,
      onTriggerEnter: m.useCallback(() => {
        c.isOpenDelayedRef.current ? O() : S();
      }, [c.isOpenDelayedRef, O, S]),
      onTriggerLeave: m.useCallback(() => {
        v ? E() : (window.clearTimeout(f.current), f.current = 0);
      }, [E, v]),
      onOpen: S,
      onClose: E,
      disableHoverableContent: v,
      children: r
    }
  ) });
};
mO.displayName = ca;
var Fd = "TooltipTrigger", vO = m.forwardRef(
  (e, t) => {
    const { __scopeTooltip: r, ...n } = e, o = Oc(Fd, r), a = Pp(Fd, r), i = Sc(r), s = m.useRef(null), c = de(t, s, o.onTriggerChange), u = m.useRef(!1), l = m.useRef(!1), d = m.useCallback(() => u.current = !1, []);
    return m.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ b(ip, { asChild: !0, ...i, children: /* @__PURE__ */ b(
      ne.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...n,
        ref: c,
        onPointerMove: q(e.onPointerMove, (p) => {
          p.pointerType !== "touch" && !l.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), l.current = !0);
        }),
        onPointerLeave: q(e.onPointerLeave, () => {
          o.onTriggerLeave(), l.current = !1;
        }),
        onPointerDown: q(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: q(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: q(e.onBlur, o.onClose),
        onClick: q(e.onClick, o.onClose)
      }
    ) });
  }
);
vO.displayName = Fd;
var e2 = "TooltipPortal", [P7, t2] = Ec(e2, {
  forceMount: void 0
}), io = "TooltipContent", gO = m.forwardRef(
  (e, t) => {
    const r = t2(io, e.__scopeTooltip), { forceMount: n = r.forceMount, side: o = "top", ...a } = e, i = Oc(io, e.__scopeTooltip);
    return /* @__PURE__ */ b(jt, { present: n || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ b(yO, { side: o, ...a, ref: t }) : /* @__PURE__ */ b(r2, { side: o, ...a, ref: t }) });
  }
), r2 = m.forwardRef((e, t) => {
  const r = Oc(io, e.__scopeTooltip), n = Pp(io, e.__scopeTooltip), o = m.useRef(null), a = de(t, o), [i, s] = m.useState(null), { trigger: c, onClose: u } = r, l = o.current, { onPointerInTransitChange: d } = n, p = m.useCallback(() => {
    s(null), d(!1);
  }, [d]), f = m.useCallback(
    (v, h) => {
      const g = v.currentTarget, y = { x: v.clientX, y: v.clientY }, w = s2(y, g.getBoundingClientRect()), x = c2(y, w), S = l2(h.getBoundingClientRect()), E = d2([...x, ...S]);
      s(E), d(!0);
    },
    [d]
  );
  return m.useEffect(() => () => p(), [p]), m.useEffect(() => {
    if (c && l) {
      const v = (g) => f(g, l), h = (g) => f(g, c);
      return c.addEventListener("pointerleave", v), l.addEventListener("pointerleave", h), () => {
        c.removeEventListener("pointerleave", v), l.removeEventListener("pointerleave", h);
      };
    }
  }, [c, l, f, p]), m.useEffect(() => {
    if (i) {
      const v = (h) => {
        const g = h.target, y = { x: h.clientX, y: h.clientY }, w = c?.contains(g) || l?.contains(g), x = !u2(y, i);
        w ? p() : x && (p(), u());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [c, l, i, u, p]), /* @__PURE__ */ b(yO, { ...e, ref: a });
}), [n2, o2] = Ec(ca, { isInside: !1 }), a2 = /* @__PURE__ */ u_("TooltipContent"), yO = m.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: r,
      children: n,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: i,
      ...s
    } = e, c = Oc(io, r), u = Sc(r), { onClose: l } = c;
    return m.useEffect(() => (document.addEventListener(Bd, l), () => document.removeEventListener(Bd, l)), [l]), m.useEffect(() => {
      if (c.trigger) {
        const d = (p) => {
          p.target?.contains(c.trigger) && l();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [c.trigger, l]), /* @__PURE__ */ b(
      bo,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: i,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: l,
        children: /* @__PURE__ */ U(
          sp,
          {
            "data-state": c.stateAttribute,
            ...u,
            ...s,
            ref: t,
            style: {
              ...s.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ b(a2, { children: n }),
              /* @__PURE__ */ b(n2, { scope: r, isInside: !0, children: /* @__PURE__ */ b(bD, { id: c.contentId, role: "tooltip", children: o || n }) })
            ]
          }
        )
      }
    );
  }
);
gO.displayName = io;
var bO = "TooltipArrow", i2 = m.forwardRef(
  (e, t) => {
    const { __scopeTooltip: r, ...n } = e, o = Sc(r);
    return o2(
      bO,
      r
    ).isInside ? null : /* @__PURE__ */ b(cp, { ...o, ...n, ref: t });
  }
);
i2.displayName = bO;
function s2(e, t) {
  const r = Math.abs(t.top - e.y), n = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
  switch (Math.min(r, n, o, a)) {
    case a:
      return "left";
    case o:
      return "right";
    case r:
      return "top";
    case n:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function c2(e, t, r = 5) {
  const n = [];
  switch (t) {
    case "top":
      n.push(
        { x: e.x - r, y: e.y + r },
        { x: e.x + r, y: e.y + r }
      );
      break;
    case "bottom":
      n.push(
        { x: e.x - r, y: e.y - r },
        { x: e.x + r, y: e.y - r }
      );
      break;
    case "left":
      n.push(
        { x: e.x + r, y: e.y - r },
        { x: e.x + r, y: e.y + r }
      );
      break;
    case "right":
      n.push(
        { x: e.x - r, y: e.y - r },
        { x: e.x - r, y: e.y + r }
      );
      break;
  }
  return n;
}
function l2(e) {
  const { top: t, right: r, bottom: n, left: o } = e;
  return [
    { x: o, y: t },
    { x: r, y: t },
    { x: r, y: n },
    { x: o, y: n }
  ];
}
function u2(e, t) {
  const { x: r, y: n } = e;
  let o = !1;
  for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
    const s = t[a], c = t[i], u = s.x, l = s.y, d = c.x, p = c.y;
    l > n != p > n && r < (d - u) * (n - l) / (p - l) + u && (o = !o);
  }
  return o;
}
function d2(e) {
  const t = e.slice();
  return t.sort((r, n) => r.x < n.x ? -1 : r.x > n.x ? 1 : r.y < n.y ? -1 : r.y > n.y ? 1 : 0), f2(t);
}
function f2(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], i = t[t.length - 2];
      if ((a.x - i.x) * (o.y - i.y) >= (a.y - i.y) * (o.x - i.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const r = [];
  for (let n = e.length - 1; n >= 0; n--) {
    const o = e[n];
    for (; r.length >= 2; ) {
      const a = r[r.length - 1], i = r[r.length - 2];
      if ((a.x - i.x) * (o.y - i.y) >= (a.y - i.y) * (o.x - i.x)) r.pop();
      else break;
    }
    r.push(o);
  }
  return r.pop(), t.length === 1 && r.length === 1 && t[0].x === r[0].x && t[0].y === r[0].y ? t : t.concat(r);
}
var p2 = hO, h2 = mO, m2 = vO, wO = gO;
const A7 = p2, C7 = h2, T7 = m2, v2 = m.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ b(
  wO,
  {
    ref: n,
    sideOffset: t,
    className: V(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...r
  }
));
v2.displayName = wO.displayName;
const xO = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ b(
  "table",
  {
    ref: r,
    className: V("w-full caption-bottom text-sm", e),
    ...t
  }
) }));
xO.displayName = "Table";
const EO = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b("thead", { ref: r, className: V("[&_tr]:border-b", e), ...t }));
EO.displayName = "TableHeader";
const SO = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "tbody",
  {
    ref: r,
    className: V("[&_tr:last-child]:border-0", e),
    ...t
  }
));
SO.displayName = "TableBody";
const g2 = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "tfoot",
  {
    ref: r,
    className: V(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...t
  }
));
g2.displayName = "TableFooter";
const Zo = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "tr",
  {
    ref: r,
    className: V(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    ...t
  }
));
Zo.displayName = "TableRow";
const OO = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "th",
  {
    ref: r,
    className: V(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...t
  }
));
OO.displayName = "TableHead";
const zi = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "td",
  {
    ref: r,
    className: V(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...t
  }
));
zi.displayName = "TableCell";
const y2 = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  "caption",
  {
    ref: r,
    className: V("mt-4 text-sm text-muted-foreground", e),
    ...t
  }
));
y2.displayName = "TableCaption";
const PO = m.forwardRef(
  ({
    className: e,
    title: t,
    logo: r,
    items: n = [],
    groups: o = [],
    isCollapsed: a = !1,
    onToggleCollapse: i,
    width: s = 220,
    collapsedWidth: c = 64,
    showCollapseButton: u = !0,
    onLogout: l,
    onLogoClick: d,
    companyLogo: p,
    headerMode: f = "default",
    headerLogo: v,
    headerLogoCollapsed: h,
    isMobile: g = !1,
    isMobileOpen: y = !1,
    onMobileClose: w,
    mobileWidth: x = 280,
    ...S
  }, E) => {
    const [O, P] = m.useState(!1), [A, _] = m.useState({});
    m.useEffect(() => {
      const C = {};
      o.forEach((D) => {
        C[D.label] = D.defaultExpanded !== !1;
      }), _(C);
    }, [o]);
    const N = i ? a : O, T = i || (() => P(!O)), R = (C) => {
      _((D) => ({
        ...D,
        [C]: !D[C]
      }));
    }, j = (C) => C.map((D) => /* @__PURE__ */ U(
      "button",
      {
        type: "button",
        onClick: () => {
          D.onClick?.(), g && w?.();
        },
        "aria-current": D.active ? "page" : void 0,
        "aria-label": N ? D.label : void 0,
        className: V(
          "relative flex w-full items-center transition-all my-0.5 font-medium text-muted-foreground",
          N ? "justify-center px-2.5 py-2.5" : "justify-start px-4 py-2.5",
          D.active && "bg-primary/5 text-primary font-semibold",
          "hover:bg-accent dark:hover:bg-accent/80 hover:text-primary",
          D.active && "hover:bg-primary/10 dark:hover:bg-primary/20"
        ),
        children: [
          D.active && /* @__PURE__ */ b("div", { className: "absolute left-0 top-0 bottom-0 w-[3px] bg-primary" }),
          D.icon && /* @__PURE__ */ b("div", { className: V("flex items-center justify-center w-5 h-5", !N && "mr-3"), children: D.icon }),
          !N && /* @__PURE__ */ b("span", { className: "text-sm whitespace-nowrap overflow-hidden text-ellipsis", children: D.label })
        ]
      },
      D.key
    ));
    return /* @__PURE__ */ U(yt, { children: [
      g && y && /* @__PURE__ */ b(
        "div",
        {
          className: "fixed inset-0 z-[110] bg-black/40",
          onClick: w
        }
      ),
      /* @__PURE__ */ U(
        "aside",
        {
          ref: E,
          className: V(
            "fixed left-0 top-0 h-screen bg-card flex flex-col transition-all duration-300 overflow-visible shadow-sm dark:border-r dark:border-border/70",
            g ? "z-[120]" : "z-40",
            g && !y && "-translate-x-full",
            g && y && "translate-x-0",
            e
          ),
          style: {
            width: g ? `${x}px` : N ? `${c}px` : `${s}px`
          },
          ...S,
          children: [
            f === "companyLogo" && v ? /* @__PURE__ */ b(
              "div",
              {
                onClick: d,
                className: V(
                  "flex items-center justify-center min-h-[60px] bg-card mb-1 px-3 py-3",
                  d && "cursor-pointer hover:bg-accent dark:hover:bg-accent/80 transition-colors"
                ),
                children: /* @__PURE__ */ b(
                  "img",
                  {
                    src: N && h ? h : v,
                    alt: "Logo",
                    className: V(
                      "object-contain transition-all",
                      N ? "h-8 w-8" : "h-14 max-w-full"
                    )
                  }
                )
              }
            ) : (t || r) && /* @__PURE__ */ U(
              "div",
              {
                onClick: d,
                className: V(
                  "flex items-center min-h-[60px] bg-card mb-1",
                  N ? "justify-center px-2 py-4.5" : "justify-start px-5 py-4.5",
                  d && "cursor-pointer hover:bg-accent dark:hover:bg-accent/80 transition-colors"
                ),
                children: [
                  r,
                  !N && /* @__PURE__ */ b("div", { className: "flex-1 overflow-hidden ml-3", children: t && /* @__PURE__ */ b("div", { className: "font-semibold text-base text-foreground leading-tight tracking-tight", children: t }) })
                ]
              }
            ),
            /* @__PURE__ */ U("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide", children: [
              n.length > 0 && j(n),
              o.map((C) => {
                const D = A[C.label], $ = C.collapsible !== !1;
                return /* @__PURE__ */ U("div", { className: "mb-6", children: [
                  !N && /* @__PURE__ */ U(
                    "button",
                    {
                      type: "button",
                      onClick: () => $ && R(C.label),
                      "aria-expanded": D,
                      className: V(
                        "w-full px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-between text-left",
                        $ && "cursor-pointer hover:text-foreground transition-colors"
                      ),
                      children: [
                        /* @__PURE__ */ b("span", { children: C.label }),
                        $ && /* @__PURE__ */ b("div", { className: "w-3 h-3", children: D ? /* @__PURE__ */ b(Xw, { className: "w-3 h-3" }) : /* @__PURE__ */ b(na, { className: "w-3 h-3" }) })
                      ]
                    }
                  ),
                  D && j(C.items)
                ] }, C.label);
              })
            ] }),
            p && !N && /* @__PURE__ */ b("div", { className: "mt-auto p-4 flex justify-center", children: /* @__PURE__ */ b(
              "img",
              {
                src: p,
                alt: "Logo da Empresa",
                className: "h-14 opacity-80 hover:opacity-100 transition-opacity"
              }
            ) }),
            u && !g && /* @__PURE__ */ b(
              "button",
              {
                onClick: T,
                type: "button",
                "aria-label": N ? "Expandir menu lateral" : "Recolher menu lateral",
                className: "absolute bottom-20 -right-3 bg-card border border-border rounded-sm p-1 cursor-pointer flex items-center justify-center transition-all w-6 h-6 shadow-sm hover:bg-accent dark:hover:bg-accent/80 hover:shadow-md active:scale-95",
                children: /* @__PURE__ */ b("div", { className: "w-3.5 h-3.5 text-muted-foreground flex items-center justify-center", children: N ? /* @__PURE__ */ b(Hs, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ b(Yw, { className: "w-3.5 h-3.5" }) })
              }
            )
          ]
        }
      )
    ] });
  }
);
PO.displayName = "Sidebar";
const b2 = m.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ b("div", { ref: r, className: V("flex items-center border-b p-4", e), ...t })
);
b2.displayName = "SidebarHeader";
const w2 = m.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ b("div", { ref: r, className: V("flex-1 overflow-y-auto p-4", e), ...t })
);
w2.displayName = "SidebarContent";
const x2 = m.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ b("div", { ref: r, className: V("border-t p-4", e), ...t })
);
x2.displayName = "SidebarFooter";
const E2 = m.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ b("nav", { ref: r, className: V("flex flex-col space-y-1", e), ...t })
);
E2.displayName = "SidebarNav";
const S2 = m.forwardRef(
  ({ className: e, active: t, icon: r, children: n, ...o }, a) => /* @__PURE__ */ U(
    "a",
    {
      ref: a,
      className: V(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent dark:hover:bg-accent/80 hover:text-accent-foreground",
        t && "bg-accent text-accent-foreground",
        e
      ),
      ...o,
      children: [
        r && /* @__PURE__ */ b("span", { className: "flex-shrink-0", children: r }),
        /* @__PURE__ */ b("span", { className: "flex-1", children: n })
      ]
    }
  )
);
S2.displayName = "SidebarNavItem";
const AO = m.forwardRef(
  ({ className: e, items: t, separator: r, ...n }, o) => t.length === 0 ? null : /* @__PURE__ */ b(
    "nav",
    {
      ref: o,
      className: V("flex items-center gap-2 text-sm", e),
      "aria-label": "Breadcrumb",
      ...n,
      children: t.map((a, i) => /* @__PURE__ */ U(m.Fragment, { children: [
        /* @__PURE__ */ b(
          "span",
          {
            className: V(
              "font-medium transition-colors",
              i === 0 && "text-primary",
              i === 1 && "text-secondary",
              i === t.length - 1 ? "text-foreground font-semibold" : "text-muted-foreground",
              a.onClick && "cursor-pointer hover:text-primary"
            ),
            onClick: a.onClick,
            children: a.label
          }
        ),
        i < t.length - 1 && /* @__PURE__ */ b("span", { className: "text-border flex items-center select-none", children: r || /* @__PURE__ */ b(Hs, { className: "h-3.5 w-3.5" }) })
      ] }, i))
    }
  )
);
AO.displayName = "Breadcrumb";
function CO(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: O2 } = Object.prototype, { getPrototypeOf: Ap } = Object, { iterator: Pc, toStringTag: TO } = Symbol, Ac = /* @__PURE__ */ ((e) => (t) => {
  const r = O2.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), nr = (e) => (e = e.toLowerCase(), (t) => Ac(t) === e), Cc = (e) => (t) => typeof t === e, { isArray: Po } = Array, so = Cc("undefined");
function Ra(e) {
  return e !== null && !so(e) && e.constructor !== null && !so(e.constructor) && wt(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const _O = nr("ArrayBuffer");
function P2(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && _O(e.buffer), t;
}
const A2 = Cc("string"), wt = Cc("function"), kO = Cc("number"), Ma = (e) => e !== null && typeof e == "object", C2 = (e) => e === !0 || e === !1, Ui = (e) => {
  if (Ac(e) !== "object")
    return !1;
  const t = Ap(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(TO in e) && !(Pc in e);
}, T2 = (e) => {
  if (!Ma(e) || Ra(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, _2 = nr("Date"), k2 = nr("File"), N2 = nr("Blob"), R2 = nr("FileList"), M2 = (e) => Ma(e) && wt(e.pipe), I2 = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || wt(e.append) && ((t = Ac(e)) === "formdata" || // detect form-data instance
  t === "object" && wt(e.toString) && e.toString() === "[object FormData]"));
}, D2 = nr("URLSearchParams"), [j2, L2, $2, B2] = ["ReadableStream", "Request", "Response", "Headers"].map(nr), F2 = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ia(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Po(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    if (Ra(e))
      return;
    const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = a.length;
    let s;
    for (n = 0; n < i; n++)
      s = a[n], t.call(null, e[s], s, e);
  }
}
function NO(e, t) {
  if (Ra(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const gn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, RO = (e) => !so(e) && e !== gn;
function zd() {
  const { caseless: e, skipUndefined: t } = RO(this) && this || {}, r = {}, n = (o, a) => {
    const i = e && NO(r, a) || a;
    Ui(r[i]) && Ui(o) ? r[i] = zd(r[i], o) : Ui(o) ? r[i] = zd({}, o) : Po(o) ? r[i] = o.slice() : (!t || !so(o)) && (r[i] = o);
  };
  for (let o = 0, a = arguments.length; o < a; o++)
    arguments[o] && Ia(arguments[o], n);
  return r;
}
const z2 = (e, t, r, { allOwnKeys: n } = {}) => (Ia(t, (o, a) => {
  r && wt(o) ? e[a] = CO(o, r) : e[a] = o;
}, { allOwnKeys: n }), e), U2 = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), W2 = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, K2 = (e, t, r, n) => {
  let o, a, i;
  const s = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
      i = o[a], (!n || n(i, e, t)) && !s[i] && (t[i] = e[i], s[i] = !0);
    e = r !== !1 && Ap(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, V2 = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, q2 = (e) => {
  if (!e) return null;
  if (Po(e)) return e;
  let t = e.length;
  if (!kO(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, H2 = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ap(Uint8Array)), G2 = (e, t) => {
  const n = (e && e[Pc]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const a = o.value;
    t.call(e, a[0], a[1]);
  }
}, Y2 = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, X2 = nr("HTMLFormElement"), Z2 = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), hv = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), J2 = nr("RegExp"), MO = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Ia(r, (o, a) => {
    let i;
    (i = t(o, a, e)) !== !1 && (n[a] = i || o);
  }), Object.defineProperties(e, n);
}, Q2 = (e) => {
  MO(e, (t, r) => {
    if (wt(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (wt(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, eL = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((a) => {
      r[a] = !0;
    });
  };
  return Po(e) ? n(e) : n(String(e).split(t)), r;
}, tL = () => {
}, rL = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function nL(e) {
  return !!(e && wt(e.append) && e[TO] === "FormData" && e[Pc]);
}
const oL = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (Ma(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (Ra(n))
        return n;
      if (!("toJSON" in n)) {
        t[o] = n;
        const a = Po(n) ? [] : {};
        return Ia(n, (i, s) => {
          const c = r(i, o + 1);
          !so(c) && (a[s] = c);
        }), t[o] = void 0, a;
      }
    }
    return n;
  };
  return r(e, 0);
}, aL = nr("AsyncFunction"), iL = (e) => e && (Ma(e) || wt(e)) && wt(e.then) && wt(e.catch), IO = ((e, t) => e ? setImmediate : t ? ((r, n) => (gn.addEventListener("message", ({ source: o, data: a }) => {
  o === gn && a === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), gn.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  wt(gn.postMessage)
), sL = typeof queueMicrotask < "u" ? queueMicrotask.bind(gn) : typeof process < "u" && process.nextTick || IO, cL = (e) => e != null && wt(e[Pc]), M = {
  isArray: Po,
  isArrayBuffer: _O,
  isBuffer: Ra,
  isFormData: I2,
  isArrayBufferView: P2,
  isString: A2,
  isNumber: kO,
  isBoolean: C2,
  isObject: Ma,
  isPlainObject: Ui,
  isEmptyObject: T2,
  isReadableStream: j2,
  isRequest: L2,
  isResponse: $2,
  isHeaders: B2,
  isUndefined: so,
  isDate: _2,
  isFile: k2,
  isBlob: N2,
  isRegExp: J2,
  isFunction: wt,
  isStream: M2,
  isURLSearchParams: D2,
  isTypedArray: H2,
  isFileList: R2,
  forEach: Ia,
  merge: zd,
  extend: z2,
  trim: F2,
  stripBOM: U2,
  inherits: W2,
  toFlatObject: K2,
  kindOf: Ac,
  kindOfTest: nr,
  endsWith: V2,
  toArray: q2,
  forEachEntry: G2,
  matchAll: Y2,
  isHTMLForm: X2,
  hasOwnProperty: hv,
  hasOwnProp: hv,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: MO,
  freezeMethods: Q2,
  toObjectSet: eL,
  toCamelCase: Z2,
  noop: tL,
  toFiniteNumber: rL,
  findKey: NO,
  global: gn,
  isContextDefined: RO,
  isSpecCompliantForm: nL,
  toJSONObject: oL,
  isAsyncFn: aL,
  isThenable: iL,
  setImmediate: IO,
  asap: sL,
  isIterable: cL
};
function ce(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
M.inherits(ce, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: M.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const DO = ce.prototype, jO = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  jO[e] = { value: e };
});
Object.defineProperties(ce, jO);
Object.defineProperty(DO, "isAxiosError", { value: !0 });
ce.from = (e, t, r, n, o, a) => {
  const i = Object.create(DO);
  M.toFlatObject(e, i, function(l) {
    return l !== Error.prototype;
  }, (u) => u !== "isAxiosError");
  const s = e && e.message ? e.message : "Error", c = t == null && e ? e.code : t;
  return ce.call(i, s, c, r, n, o), e && i.cause == null && Object.defineProperty(i, "cause", { value: e, configurable: !0 }), i.name = e && e.name || "Error", a && Object.assign(i, a), i;
};
const lL = null;
function Ud(e) {
  return M.isPlainObject(e) || M.isArray(e);
}
function LO(e) {
  return M.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function mv(e, t, r) {
  return e ? e.concat(t).map(function(o, a) {
    return o = LO(o), !r && a ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function uL(e) {
  return M.isArray(e) && !e.some(Ud);
}
const dL = M.toFlatObject(M, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Tc(e, t, r) {
  if (!M.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = M.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, g) {
    return !M.isUndefined(g[h]);
  });
  const n = r.metaTokens, o = r.visitor || l, a = r.dots, i = r.indexes, c = (r.Blob || typeof Blob < "u" && Blob) && M.isSpecCompliantForm(t);
  if (!M.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(v) {
    if (v === null) return "";
    if (M.isDate(v))
      return v.toISOString();
    if (M.isBoolean(v))
      return v.toString();
    if (!c && M.isBlob(v))
      throw new ce("Blob is not supported. Use a Buffer instead.");
    return M.isArrayBuffer(v) || M.isTypedArray(v) ? c && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function l(v, h, g) {
    let y = v;
    if (v && !g && typeof v == "object") {
      if (M.endsWith(h, "{}"))
        h = n ? h : h.slice(0, -2), v = JSON.stringify(v);
      else if (M.isArray(v) && uL(v) || (M.isFileList(v) || M.endsWith(h, "[]")) && (y = M.toArray(v)))
        return h = LO(h), y.forEach(function(x, S) {
          !(M.isUndefined(x) || x === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? mv([h], S, a) : i === null ? h : h + "[]",
            u(x)
          );
        }), !1;
    }
    return Ud(v) ? !0 : (t.append(mv(g, h, a), u(v)), !1);
  }
  const d = [], p = Object.assign(dL, {
    defaultVisitor: l,
    convertValue: u,
    isVisitable: Ud
  });
  function f(v, h) {
    if (!M.isUndefined(v)) {
      if (d.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      d.push(v), M.forEach(v, function(y, w) {
        (!(M.isUndefined(y) || y === null) && o.call(
          t,
          y,
          M.isString(w) ? w.trim() : w,
          h,
          p
        )) === !0 && f(y, h ? h.concat(w) : [w]);
      }), d.pop();
    }
  }
  if (!M.isObject(e))
    throw new TypeError("data must be an object");
  return f(e), t;
}
function vv(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function Cp(e, t) {
  this._pairs = [], e && Tc(e, this, t);
}
const $O = Cp.prototype;
$O.append = function(t, r) {
  this._pairs.push([t, r]);
};
$O.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, vv);
  } : vv;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function fL(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function BO(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || fL;
  M.isFunction(r) && (r = {
    serialize: r
  });
  const o = r && r.serialize;
  let a;
  if (o ? a = o(t, r) : a = M.isURLSearchParams(t) ? t.toString() : new Cp(t, r).toString(n), a) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class gv {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    M.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const FO = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, pL = typeof URLSearchParams < "u" ? URLSearchParams : Cp, hL = typeof FormData < "u" ? FormData : null, mL = typeof Blob < "u" ? Blob : null, vL = {
  isBrowser: !0,
  classes: {
    URLSearchParams: pL,
    FormData: hL,
    Blob: mL
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Tp = typeof window < "u" && typeof document < "u", Wd = typeof navigator == "object" && navigator || void 0, gL = Tp && (!Wd || ["ReactNative", "NativeScript", "NS"].indexOf(Wd.product) < 0), yL = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", bL = Tp && window.location.href || "http://localhost", wL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Tp,
  hasStandardBrowserEnv: gL,
  hasStandardBrowserWebWorkerEnv: yL,
  navigator: Wd,
  origin: bL
}, Symbol.toStringTag, { value: "Module" })), st = {
  ...wL,
  ...vL
};
function xL(e, t) {
  return Tc(e, new st.classes.URLSearchParams(), {
    visitor: function(r, n, o, a) {
      return st.isNode && M.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function EL(e) {
  return M.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function SL(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++)
    a = r[n], t[a] = e[a];
  return t;
}
function zO(e) {
  function t(r, n, o, a) {
    let i = r[a++];
    if (i === "__proto__") return !0;
    const s = Number.isFinite(+i), c = a >= r.length;
    return i = !i && M.isArray(o) ? o.length : i, c ? (M.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !s) : ((!o[i] || !M.isObject(o[i])) && (o[i] = []), t(r, n, o[i], a) && M.isArray(o[i]) && (o[i] = SL(o[i])), !s);
  }
  if (M.isFormData(e) && M.isFunction(e.entries)) {
    const r = {};
    return M.forEachEntry(e, (n, o) => {
      t(EL(n), o, r, 0);
    }), r;
  }
  return null;
}
function OL(e, t, r) {
  if (M.isString(e))
    try {
      return (t || JSON.parse)(e), M.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const Da = {
  transitional: FO,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, a = M.isObject(t);
    if (a && M.isHTMLForm(t) && (t = new FormData(t)), M.isFormData(t))
      return o ? JSON.stringify(zO(t)) : t;
    if (M.isArrayBuffer(t) || M.isBuffer(t) || M.isStream(t) || M.isFile(t) || M.isBlob(t) || M.isReadableStream(t))
      return t;
    if (M.isArrayBufferView(t))
      return t.buffer;
    if (M.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (a) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return xL(t, this.formSerializer).toString();
      if ((s = M.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return Tc(
          s ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return a || o ? (r.setContentType("application/json", !1), OL(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || Da.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (M.isResponse(t) || M.isReadableStream(t))
      return t;
    if (t && M.isString(t) && (n && !this.responseType || o)) {
      const i = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (s) {
        if (i)
          throw s.name === "SyntaxError" ? ce.from(s, ce.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: st.classes.FormData,
    Blob: st.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
M.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Da.headers[e] = {};
});
const PL = M.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), AL = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && PL[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, yv = Symbol("internals");
function Fo(e) {
  return e && String(e).trim().toLowerCase();
}
function Wi(e) {
  return e === !1 || e == null ? e : M.isArray(e) ? e.map(Wi) : String(e);
}
function CL(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const TL = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function $l(e, t, r, n, o) {
  if (M.isFunction(n))
    return n.call(this, t, r);
  if (o && (t = r), !!M.isString(t)) {
    if (M.isString(n))
      return t.indexOf(n) !== -1;
    if (M.isRegExp(n))
      return n.test(t);
  }
}
function _L(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function kL(e, t) {
  const r = M.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, a, i) {
        return this[n].call(this, t, o, a, i);
      },
      configurable: !0
    });
  });
}
let xt = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function a(s, c, u) {
      const l = Fo(c);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const d = M.findKey(o, l);
      (!d || o[d] === void 0 || u === !0 || u === void 0 && o[d] !== !1) && (o[d || c] = Wi(s));
    }
    const i = (s, c) => M.forEach(s, (u, l) => a(u, l, c));
    if (M.isPlainObject(t) || t instanceof this.constructor)
      i(t, r);
    else if (M.isString(t) && (t = t.trim()) && !TL(t))
      i(AL(t), r);
    else if (M.isObject(t) && M.isIterable(t)) {
      let s = {}, c, u;
      for (const l of t) {
        if (!M.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        s[u = l[0]] = (c = s[u]) ? M.isArray(c) ? [...c, l[1]] : [c, l[1]] : l[1];
      }
      i(s, r);
    } else
      t != null && a(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = Fo(t), t) {
      const n = M.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return CL(o);
        if (M.isFunction(r))
          return r.call(this, o, n);
        if (M.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = Fo(t), t) {
      const n = M.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || $l(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function a(i) {
      if (i = Fo(i), i) {
        const s = M.findKey(n, i);
        s && (!r || $l(n, n[s], s, r)) && (delete n[s], o = !0);
      }
    }
    return M.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const a = r[n];
      (!t || $l(this, this[a], a, t, !0)) && (delete this[a], o = !0);
    }
    return o;
  }
  normalize(t) {
    const r = this, n = {};
    return M.forEach(this, (o, a) => {
      const i = M.findKey(n, a);
      if (i) {
        r[i] = Wi(o), delete r[a];
        return;
      }
      const s = t ? _L(a) : String(a).trim();
      s !== a && delete r[a], r[s] = Wi(o), n[s] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return M.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && M.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(t) {
    const n = (this[yv] = this[yv] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function a(i) {
      const s = Fo(i);
      n[s] || (kL(o, i), n[s] = !0);
    }
    return M.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
xt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
M.reduceDescriptors(xt.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
M.freezeMethods(xt);
function Bl(e, t) {
  const r = this || Da, n = t || r, o = xt.from(n.headers);
  let a = n.data;
  return M.forEach(e, function(s) {
    a = s.call(r, a, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), a;
}
function UO(e) {
  return !!(e && e.__CANCEL__);
}
function Ao(e, t, r) {
  ce.call(this, e ?? "canceled", ce.ERR_CANCELED, t, r), this.name = "CanceledError";
}
M.inherits(Ao, ce, {
  __CANCEL__: !0
});
function WO(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new ce(
    "Request failed with status code " + r.status,
    [ce.ERR_BAD_REQUEST, ce.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function NL(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function RL(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, a = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const u = Date.now(), l = n[a];
    i || (i = u), r[o] = c, n[o] = u;
    let d = a, p = 0;
    for (; d !== o; )
      p += r[d++], d = d % e;
    if (o = (o + 1) % e, o === a && (a = (a + 1) % e), u - i < t)
      return;
    const f = l && u - l;
    return f ? Math.round(p * 1e3 / f) : void 0;
  };
}
function ML(e, t) {
  let r = 0, n = 1e3 / t, o, a;
  const i = (u, l = Date.now()) => {
    r = l, o = null, a && (clearTimeout(a), a = null), e(...u);
  };
  return [(...u) => {
    const l = Date.now(), d = l - r;
    d >= n ? i(u, l) : (o = u, a || (a = setTimeout(() => {
      a = null, i(o);
    }, n - d)));
  }, () => o && i(o)];
}
const rs = (e, t, r = 3) => {
  let n = 0;
  const o = RL(50, 250);
  return ML((a) => {
    const i = a.loaded, s = a.lengthComputable ? a.total : void 0, c = i - n, u = o(c), l = i <= s;
    n = i;
    const d = {
      loaded: i,
      total: s,
      progress: s ? i / s : void 0,
      bytes: c,
      rate: u || void 0,
      estimated: u && s && l ? (s - i) / u : void 0,
      event: a,
      lengthComputable: s != null,
      [t ? "download" : "upload"]: !0
    };
    e(d);
  }, r);
}, bv = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, wv = (e) => (...t) => M.asap(() => e(...t)), IL = st.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, st.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(st.origin),
  st.navigator && /(msie|trident)/i.test(st.navigator.userAgent)
) : () => !0, DL = st.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, o, a, i) {
      if (typeof document > "u") return;
      const s = [`${e}=${encodeURIComponent(t)}`];
      M.isNumber(r) && s.push(`expires=${new Date(r).toUTCString()}`), M.isString(n) && s.push(`path=${n}`), M.isString(o) && s.push(`domain=${o}`), a === !0 && s.push("secure"), M.isString(i) && s.push(`SameSite=${i}`), document.cookie = s.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function jL(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function LL(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function KO(e, t, r) {
  let n = !jL(t);
  return e && (n || r == !1) ? LL(e, t) : t;
}
const xv = (e) => e instanceof xt ? { ...e } : e;
function Rn(e, t) {
  t = t || {};
  const r = {};
  function n(u, l, d, p) {
    return M.isPlainObject(u) && M.isPlainObject(l) ? M.merge.call({ caseless: p }, u, l) : M.isPlainObject(l) ? M.merge({}, l) : M.isArray(l) ? l.slice() : l;
  }
  function o(u, l, d, p) {
    if (M.isUndefined(l)) {
      if (!M.isUndefined(u))
        return n(void 0, u, d, p);
    } else return n(u, l, d, p);
  }
  function a(u, l) {
    if (!M.isUndefined(l))
      return n(void 0, l);
  }
  function i(u, l) {
    if (M.isUndefined(l)) {
      if (!M.isUndefined(u))
        return n(void 0, u);
    } else return n(void 0, l);
  }
  function s(u, l, d) {
    if (d in t)
      return n(u, l);
    if (d in e)
      return n(void 0, u);
  }
  const c = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: s,
    headers: (u, l, d) => o(xv(u), xv(l), d, !0)
  };
  return M.forEach(Object.keys({ ...e, ...t }), function(l) {
    const d = c[l] || o, p = d(e[l], t[l], l);
    M.isUndefined(p) && d !== s || (r[l] = p);
  }), r;
}
const VO = (e) => {
  const t = Rn({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: a, headers: i, auth: s } = t;
  if (t.headers = i = xt.from(i), t.url = BO(KO(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), s && i.set(
    "Authorization",
    "Basic " + btoa((s.username || "") + ":" + (s.password ? unescape(encodeURIComponent(s.password)) : ""))
  ), M.isFormData(r)) {
    if (st.hasStandardBrowserEnv || st.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (M.isFunction(r.getHeaders)) {
      const c = r.getHeaders(), u = ["content-type", "content-length"];
      Object.entries(c).forEach(([l, d]) => {
        u.includes(l.toLowerCase()) && i.set(l, d);
      });
    }
  }
  if (st.hasStandardBrowserEnv && (n && M.isFunction(n) && (n = n(t)), n || n !== !1 && IL(t.url))) {
    const c = o && a && DL.read(a);
    c && i.set(o, c);
  }
  return t;
}, $L = typeof XMLHttpRequest < "u", BL = $L && function(e) {
  return new Promise(function(r, n) {
    const o = VO(e);
    let a = o.data;
    const i = xt.from(o.headers).normalize();
    let { responseType: s, onUploadProgress: c, onDownloadProgress: u } = o, l, d, p, f, v;
    function h() {
      f && f(), v && v(), o.cancelToken && o.cancelToken.unsubscribe(l), o.signal && o.signal.removeEventListener("abort", l);
    }
    let g = new XMLHttpRequest();
    g.open(o.method.toUpperCase(), o.url, !0), g.timeout = o.timeout;
    function y() {
      if (!g)
        return;
      const x = xt.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), E = {
        data: !s || s === "text" || s === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: x,
        config: e,
        request: g
      };
      WO(function(P) {
        r(P), h();
      }, function(P) {
        n(P), h();
      }, E), g = null;
    }
    "onloadend" in g ? g.onloadend = y : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(y);
    }, g.onabort = function() {
      g && (n(new ce("Request aborted", ce.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function(S) {
      const E = S && S.message ? S.message : "Network Error", O = new ce(E, ce.ERR_NETWORK, e, g);
      O.event = S || null, n(O), g = null;
    }, g.ontimeout = function() {
      let S = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const E = o.transitional || FO;
      o.timeoutErrorMessage && (S = o.timeoutErrorMessage), n(new ce(
        S,
        E.clarifyTimeoutError ? ce.ETIMEDOUT : ce.ECONNABORTED,
        e,
        g
      )), g = null;
    }, a === void 0 && i.setContentType(null), "setRequestHeader" in g && M.forEach(i.toJSON(), function(S, E) {
      g.setRequestHeader(E, S);
    }), M.isUndefined(o.withCredentials) || (g.withCredentials = !!o.withCredentials), s && s !== "json" && (g.responseType = o.responseType), u && ([p, v] = rs(u, !0), g.addEventListener("progress", p)), c && g.upload && ([d, f] = rs(c), g.upload.addEventListener("progress", d), g.upload.addEventListener("loadend", f)), (o.cancelToken || o.signal) && (l = (x) => {
      g && (n(!x || x.type ? new Ao(null, e, g) : x), g.abort(), g = null);
    }, o.cancelToken && o.cancelToken.subscribe(l), o.signal && (o.signal.aborted ? l() : o.signal.addEventListener("abort", l)));
    const w = NL(o.url);
    if (w && st.protocols.indexOf(w) === -1) {
      n(new ce("Unsupported protocol " + w + ":", ce.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(a || null);
  });
}, FL = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), o;
    const a = function(u) {
      if (!o) {
        o = !0, s();
        const l = u instanceof Error ? u : this.reason;
        n.abort(l instanceof ce ? l : new Ao(l instanceof Error ? l.message : l));
      }
    };
    let i = t && setTimeout(() => {
      i = null, a(new ce(`timeout ${t} of ms exceeded`, ce.ETIMEDOUT));
    }, t);
    const s = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(a) : u.removeEventListener("abort", a);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", a));
    const { signal: c } = n;
    return c.unsubscribe = () => M.asap(s), c;
  }
}, zL = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + t, yield e.slice(n, o), n = o;
}, UL = async function* (e, t) {
  for await (const r of WL(e))
    yield* zL(r, t);
}, WL = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, Ev = (e, t, r, n) => {
  const o = UL(e, t);
  let a = 0, i, s = (c) => {
    i || (i = !0, n && n(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: u, value: l } = await o.next();
        if (u) {
          s(), c.close();
          return;
        }
        let d = l.byteLength;
        if (r) {
          let p = a += d;
          r(p);
        }
        c.enqueue(new Uint8Array(l));
      } catch (u) {
        throw s(u), u;
      }
    },
    cancel(c) {
      return s(c), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Sv = 64 * 1024, { isFunction: hi } = M, KL = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(M.global), {
  ReadableStream: Ov,
  TextEncoder: Pv
} = M.global, Av = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, VL = (e) => {
  e = M.merge.call({
    skipUndefined: !0
  }, KL, e);
  const { fetch: t, Request: r, Response: n } = e, o = t ? hi(t) : typeof fetch == "function", a = hi(r), i = hi(n);
  if (!o)
    return !1;
  const s = o && hi(Ov), c = o && (typeof Pv == "function" ? /* @__PURE__ */ ((v) => (h) => v.encode(h))(new Pv()) : async (v) => new Uint8Array(await new r(v).arrayBuffer())), u = a && s && Av(() => {
    let v = !1;
    const h = new r(st.origin, {
      body: new Ov(),
      method: "POST",
      get duplex() {
        return v = !0, "half";
      }
    }).headers.has("Content-Type");
    return v && !h;
  }), l = i && s && Av(() => M.isReadableStream(new n("").body)), d = {
    stream: l && ((v) => v.body)
  };
  o && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((v) => {
    !d[v] && (d[v] = (h, g) => {
      let y = h && h[v];
      if (y)
        return y.call(h);
      throw new ce(`Response type '${v}' is not supported`, ce.ERR_NOT_SUPPORT, g);
    });
  });
  const p = async (v) => {
    if (v == null)
      return 0;
    if (M.isBlob(v))
      return v.size;
    if (M.isSpecCompliantForm(v))
      return (await new r(st.origin, {
        method: "POST",
        body: v
      }).arrayBuffer()).byteLength;
    if (M.isArrayBufferView(v) || M.isArrayBuffer(v))
      return v.byteLength;
    if (M.isURLSearchParams(v) && (v = v + ""), M.isString(v))
      return (await c(v)).byteLength;
  }, f = async (v, h) => {
    const g = M.toFiniteNumber(v.getContentLength());
    return g ?? p(h);
  };
  return async (v) => {
    let {
      url: h,
      method: g,
      data: y,
      signal: w,
      cancelToken: x,
      timeout: S,
      onDownloadProgress: E,
      onUploadProgress: O,
      responseType: P,
      headers: A,
      withCredentials: _ = "same-origin",
      fetchOptions: N
    } = VO(v), T = t || fetch;
    P = P ? (P + "").toLowerCase() : "text";
    let R = FL([w, x && x.toAbortSignal()], S), j = null;
    const C = R && R.unsubscribe && (() => {
      R.unsubscribe();
    });
    let D;
    try {
      if (O && u && g !== "get" && g !== "head" && (D = await f(A, y)) !== 0) {
        let H = new r(h, {
          method: "POST",
          body: y,
          duplex: "half"
        }), ie;
        if (M.isFormData(y) && (ie = H.headers.get("content-type")) && A.setContentType(ie), H.body) {
          const [ae, W] = bv(
            D,
            rs(wv(O))
          );
          y = Ev(H.body, Sv, ae, W);
        }
      }
      M.isString(_) || (_ = _ ? "include" : "omit");
      const $ = a && "credentials" in r.prototype, z = {
        ...N,
        signal: R,
        method: g.toUpperCase(),
        headers: A.normalize().toJSON(),
        body: y,
        duplex: "half",
        credentials: $ ? _ : void 0
      };
      j = a && new r(h, z);
      let I = await (a ? T(j, N) : T(h, z));
      const F = l && (P === "stream" || P === "response");
      if (l && (E || F && C)) {
        const H = {};
        ["status", "statusText", "headers"].forEach((te) => {
          H[te] = I[te];
        });
        const ie = M.toFiniteNumber(I.headers.get("content-length")), [ae, W] = E && bv(
          ie,
          rs(wv(E), !0)
        ) || [];
        I = new n(
          Ev(I.body, Sv, ae, () => {
            W && W(), C && C();
          }),
          H
        );
      }
      P = P || "text";
      let oe = await d[M.findKey(d, P) || "text"](I, v);
      return !F && C && C(), await new Promise((H, ie) => {
        WO(H, ie, {
          data: oe,
          headers: xt.from(I.headers),
          status: I.status,
          statusText: I.statusText,
          config: v,
          request: j
        });
      });
    } catch ($) {
      throw C && C(), $ && $.name === "TypeError" && /Load failed|fetch/i.test($.message) ? Object.assign(
        new ce("Network Error", ce.ERR_NETWORK, v, j),
        {
          cause: $.cause || $
        }
      ) : ce.from($, $ && $.code, v, j);
    }
  };
}, qL = /* @__PURE__ */ new Map(), qO = (e) => {
  let t = e && e.env || {};
  const { fetch: r, Request: n, Response: o } = t, a = [
    n,
    o,
    r
  ];
  let i = a.length, s = i, c, u, l = qL;
  for (; s--; )
    c = a[s], u = l.get(c), u === void 0 && l.set(c, u = s ? /* @__PURE__ */ new Map() : VL(t)), l = u;
  return u;
};
qO();
const _p = {
  http: lL,
  xhr: BL,
  fetch: {
    get: qO
  }
};
M.forEach(_p, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Cv = (e) => `- ${e}`, HL = (e) => M.isFunction(e) || e === null || e === !1;
function GL(e, t) {
  e = M.isArray(e) ? e : [e];
  const { length: r } = e;
  let n, o;
  const a = {};
  for (let i = 0; i < r; i++) {
    n = e[i];
    let s;
    if (o = n, !HL(n) && (o = _p[(s = String(n)).toLowerCase()], o === void 0))
      throw new ce(`Unknown adapter '${s}'`);
    if (o && (M.isFunction(o) || (o = o.get(t))))
      break;
    a[s || "#" + i] = o;
  }
  if (!o) {
    const i = Object.entries(a).map(
      ([c, u]) => `adapter ${c} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let s = r ? i.length > 1 ? `since :
` + i.map(Cv).join(`
`) : " " + Cv(i[0]) : "as no adapter specified";
    throw new ce(
      "There is no suitable adapter to dispatch the request " + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return o;
}
const HO = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: GL,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: _p
};
function Fl(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ao(null, e);
}
function Tv(e) {
  return Fl(e), e.headers = xt.from(e.headers), e.data = Bl.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), HO.getAdapter(e.adapter || Da.adapter, e)(e).then(function(n) {
    return Fl(e), n.data = Bl.call(
      e,
      e.transformResponse,
      n
    ), n.headers = xt.from(n.headers), n;
  }, function(n) {
    return UO(n) || (Fl(e), n && n.response && (n.response.data = Bl.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = xt.from(n.response.headers))), Promise.reject(n);
  });
}
const GO = "1.13.1", _c = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  _c[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const _v = {};
_c.transitional = function(t, r, n) {
  function o(a, i) {
    return "[Axios v" + GO + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
  }
  return (a, i, s) => {
    if (t === !1)
      throw new ce(
        o(i, " has been removed" + (r ? " in " + r : "")),
        ce.ERR_DEPRECATED
      );
    return r && !_v[i] && (_v[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, i, s) : !0;
  };
};
_c.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function YL(e, t, r) {
  if (typeof e != "object")
    throw new ce("options must be an object", ce.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const a = n[o], i = t[a];
    if (i) {
      const s = e[a], c = s === void 0 || i(s, a, e);
      if (c !== !0)
        throw new ce("option " + a + " must be " + c, ce.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new ce("Unknown option " + a, ce.ERR_BAD_OPTION);
  }
}
const Ki = {
  assertOptions: YL,
  validators: _c
}, ar = Ki.validators;
let xn = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new gv(),
      response: new gv()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const a = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? a && !String(n.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + a) : n.stack = a;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Rn(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    n !== void 0 && Ki.assertOptions(n, {
      silentJSONParsing: ar.transitional(ar.boolean),
      forcedJSONParsing: ar.transitional(ar.boolean),
      clarifyTimeoutError: ar.transitional(ar.boolean)
    }, !1), o != null && (M.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : Ki.assertOptions(o, {
      encode: ar.function,
      serialize: ar.function
    }, !0)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), Ki.assertOptions(r, {
      baseUrl: ar.spelling("baseURL"),
      withXsrfToken: ar.spelling("withXSRFToken")
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = a && M.merge(
      a.common,
      a[r.method]
    );
    a && M.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete a[v];
      }
    ), r.headers = xt.concat(i, a);
    const s = [];
    let c = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(r) === !1 || (c = c && h.synchronous, s.unshift(h.fulfilled, h.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(h) {
      u.push(h.fulfilled, h.rejected);
    });
    let l, d = 0, p;
    if (!c) {
      const v = [Tv.bind(this), void 0];
      for (v.unshift(...s), v.push(...u), p = v.length, l = Promise.resolve(r); d < p; )
        l = l.then(v[d++], v[d++]);
      return l;
    }
    p = s.length;
    let f = r;
    for (; d < p; ) {
      const v = s[d++], h = s[d++];
      try {
        f = v(f);
      } catch (g) {
        h.call(this, g);
        break;
      }
    }
    try {
      l = Tv.call(this, f);
    } catch (v) {
      return Promise.reject(v);
    }
    for (d = 0, p = u.length; d < p; )
      l = l.then(u[d++], u[d++]);
    return l;
  }
  getUri(t) {
    t = Rn(this.defaults, t);
    const r = KO(t.baseURL, t.url, t.allowAbsoluteUrls);
    return BO(r, t.params, t.paramsSerializer);
  }
};
M.forEach(["delete", "get", "head", "options"], function(t) {
  xn.prototype[t] = function(r, n) {
    return this.request(Rn(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
M.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(a, i, s) {
      return this.request(Rn(s || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  xn.prototype[t] = r(), xn.prototype[t + "Form"] = r(!0);
});
let XL = class YO {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(a) {
      r = a;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0; )
        n._listeners[a](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let a;
      const i = new Promise((s) => {
        n.subscribe(s), a = s;
      }).then(o);
      return i.cancel = function() {
        n.unsubscribe(a);
      }, i;
    }, t(function(a, i, s) {
      n.reason || (n.reason = new Ao(a, i, s), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new YO(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
function ZL(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function JL(e) {
  return M.isObject(e) && e.isAxiosError === !0;
}
const Kd = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(Kd).forEach(([e, t]) => {
  Kd[t] = e;
});
function XO(e) {
  const t = new xn(e), r = CO(xn.prototype.request, t);
  return M.extend(r, xn.prototype, t, { allOwnKeys: !0 }), M.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return XO(Rn(e, o));
  }, r;
}
const Ie = XO(Da);
Ie.Axios = xn;
Ie.CanceledError = Ao;
Ie.CancelToken = XL;
Ie.isCancel = UO;
Ie.VERSION = GO;
Ie.toFormData = Tc;
Ie.AxiosError = ce;
Ie.Cancel = Ie.CanceledError;
Ie.all = function(t) {
  return Promise.all(t);
};
Ie.spread = ZL;
Ie.isAxiosError = JL;
Ie.mergeConfig = Rn;
Ie.AxiosHeaders = xt;
Ie.formToJSON = (e) => zO(M.isHTMLForm(e) ? new FormData(e) : e);
Ie.getAdapter = HO.getAdapter;
Ie.HttpStatusCode = Kd;
Ie.default = Ie;
const {
  Axios: N7,
  AxiosError: R7,
  CanceledError: M7,
  isCancel: I7,
  CancelToken: D7,
  VERSION: j7,
  all: L7,
  Cancel: $7,
  isAxiosError: B7,
  spread: F7,
  toFormData: z7,
  AxiosHeaders: U7,
  HttpStatusCode: W7,
  formToJSON: K7,
  getAdapter: V7,
  mergeConfig: q7
} = Ie;
let pn = null, kp = "", ns = "";
const zl = "@Archon:accessToken", Ul = "@Archon:refreshToken", QL = "@Archon:user", e$ = "@Archon:contract", H7 = (e) => {
  pn = e;
}, G7 = (e) => {
  kp = e, Yr.updateBaseURL(e);
}, t$ = () => kp, Y7 = (e) => {
  ns = e;
}, r$ = () => ns;
class n$ {
  instance;
  constructor() {
    this.instance = Ie.create({
      baseURL: kp,
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 6e4
    }), this.setupInterceptors();
  }
  updateBaseURL(t) {
    this.instance.defaults.baseURL = t;
  }
  setupInterceptors() {
    this.instance.interceptors.request.use((t) => {
      const r = localStorage.getItem(zl);
      return r && (t.headers.Authorization = `Bearer ${r}`), pn && pn.showLoader(), t;
    }), this.instance.interceptors.response.use(
      (t) => (pn && pn.hideLoader(), t),
      async (t) => {
        pn && pn.hideLoader();
        const r = t.config;
        if (t.response?.status === 401 && !r._retry) {
          r._retry = !0;
          const o = localStorage.getItem(Ul);
          if (o && ns)
            try {
              const a = await Ie.post(
                `${ns}/api/auth/RefreshToken`,
                { refreshToken: o },
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              ), i = a.data?.data?.accessToken ?? a.data?.accessToken, s = a.data?.data?.refreshToken ?? a.data?.refreshToken;
              return localStorage.setItem(zl, i), s && localStorage.setItem(Ul, s), r.headers.Authorization = `Bearer ${i}`, this.instance(r);
            } catch (a) {
              return localStorage.removeItem(zl), localStorage.removeItem(Ul), localStorage.removeItem(QL), localStorage.removeItem(e$), Promise.reject(a);
            }
          else
            r.url?.includes("/auth/") || (window.location.href = "/");
        }
        const n = this.transformError(t);
        return Promise.reject(n);
      }
    );
  }
  transformError(t) {
    if (t.response) {
      const { status: r, data: n } = t.response;
      let o = n.message || n.title, a = n.errors;
      if (!a && typeof n == "object" && !o) {
        const i = Object.keys(n);
        if (i.length > 0 && i.every((c) => Array.isArray(n[c]))) {
          a = n;
          const c = i.length;
          o = c === 1 ? "Erro de validação no formulário" : `${c} erros de validação no formulário`;
        }
      }
      if (!o && a) {
        const i = Object.keys(a).length;
        o = i === 1 ? "Erro de validação no formulário" : `${i} erros de validação no formulário`;
      }
      return o || (o = "Erro na requisição"), {
        message: o,
        status: r,
        errors: a,
        isApiError: !0
      };
    } else return t.request ? {
      message: "Erro de conexão. Verifique sua internet.",
      status: 0,
      isApiError: !0
    } : {
      message: t.message || "Erro desconhecido",
      status: 500,
      isApiError: !0
    };
  }
  async get(t, r) {
    const n = await this.instance.get(t, r);
    return n.data && typeof n.data == "object" && "message" in n.data ? n.data : {
      message: "",
      data: n.data
    };
  }
  async post(t, r, n) {
    const o = await this.instance.post(t, r, n);
    return o.data && typeof o.data == "object" && "message" in o.data ? o.data : {
      message: "",
      data: o.data
    };
  }
  async put(t, r, n) {
    const o = await this.instance.put(t, r, n);
    return o.data && typeof o.data == "object" && "message" in o.data ? o.data : {
      message: "",
      data: o.data
    };
  }
  async delete(t, r) {
    const n = await this.instance.delete(t, r);
    return n.data && typeof n.data == "object" && "message" in n.data ? n.data : {
      message: "",
      data: n.data
    };
  }
  async patch(t, r, n) {
    const o = await this.instance.patch(t, r, n);
    return o.data && typeof o.data == "object" && "message" in o.data ? o.data : {
      message: "",
      data: o.data
    };
  }
}
const Yr = new n$(), ZO = m.createContext(null), o$ = () => {
  const e = m.useContext(ZO);
  if (!e)
    throw new Error("useTheme must be used within ThemeProvider");
  return e;
}, X7 = ({
  children: e,
  defaultDark: t = !1
}) => {
  const [r, n] = m.useState(() => {
    const a = localStorage.getItem("drts-dark-mode");
    return a ? a === "true" : t;
  });
  m.useEffect(() => {
    const a = document.documentElement;
    r ? a.classList.add("dark") : a.classList.remove("dark"), localStorage.setItem("drts-dark-mode", String(r));
  }, [r]);
  const o = m.useCallback(() => {
    n((a) => !a);
  }, []);
  return /* @__PURE__ */ b(ZO.Provider, { value: { isDark: r, toggleDark: o }, children: e });
}, JO = m.forwardRef(
  ({
    className: e,
    isCollapsed: t = !1,
    isMobile: r = !1,
    onMobileMenuToggle: n,
    breadcrumbs: o = [],
    user: a,
    companyName: i,
    notifications: s = [],
    onNotificationRead: c,
    onMarkAllAsRead: u,
    onClearAllNotifications: l,
    onViewAllNotifications: d,
    userMenuTrigger: p,
    actions: f,
    modules: v,
    currentModule: h,
    onModuleChange: g,
    onLogout: y,
    showAboutMenuItem: w = !1,
    renderAboutModal: x,
    ...S
  }, E) => {
    const { isDark: O, toggleDark: P } = o$(), [A, _] = m.useState(!1), [N, T] = m.useState(!1), [R, j] = m.useState(!1), [C, D] = m.useState(!1), $ = () => {
      if (a?.avatarUrl) {
        const H = t$().replace("/api", ""), ie = a.avatarUrl.startsWith("http") ? a.avatarUrl : `${H}${a.avatarUrl}`;
        return /* @__PURE__ */ b(
          "img",
          {
            src: ie,
            alt: a.name,
            style: { width: "100%", height: "100%", objectFit: "cover" }
          }
        );
      }
      return Bk(a?.name || "");
    }, z = s.filter((H) => !H.read).length, I = z > 0, F = (H) => {
      switch (H) {
        case "success":
          return /* @__PURE__ */ b("div", { className: "w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ b("svg", { className: "h-4 w-4 text-success", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ b("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) });
        case "warning":
          return /* @__PURE__ */ b("div", { className: "w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ b("svg", { className: "h-4 w-4 text-warning", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ b("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) });
        case "error":
          return /* @__PURE__ */ b("div", { className: "w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ b("svg", { className: "h-4 w-4 text-destructive", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ b("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) });
        default:
          return /* @__PURE__ */ b("div", { className: "w-8 h-8 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ b("svg", { className: "h-4 w-4 text-info", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ b("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) });
      }
    }, oe = (H) => {
      const ae = (/* @__PURE__ */ new Date()).getTime() - H.getTime(), W = Math.floor(ae / 6e4), te = Math.floor(ae / 36e5), se = Math.floor(ae / 864e5);
      return W < 1 ? "Agora" : W < 60 ? `${W}m atrás` : te < 24 ? `${te}h atrás` : se < 7 ? `${se}d atrás` : H.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    };
    return /* @__PURE__ */ U(
      "nav",
      {
        ref: E,
        className: V(
          "fixed top-0 right-0 h-[52px] bg-card flex items-center justify-between px-5 transition-all duration-300 z-[100] shadow-sm dark:bg-card/95 dark:supports-[backdrop-filter]:bg-card/85 dark:backdrop-blur dark:border-b dark:border-border/70",
          e
        ),
        style: {
          left: r ? "0" : t ? "64px" : "220px"
        },
        ...S,
        children: [
          /* @__PURE__ */ U("div", { className: "flex items-center gap-4", children: [
            r && /* @__PURE__ */ b(
              "button",
              {
                type: "button",
                onClick: n,
                "aria-label": "Abrir menu lateral",
                className: "p-2 rounded-sm transition-all hover:bg-accent dark:hover:bg-accent/80 text-muted-foreground hover:text-foreground active:scale-95",
                children: /* @__PURE__ */ b(z_, { className: "h-5 w-5" })
              }
            ),
            v && v.length > 0 && g && /* @__PURE__ */ U("div", { className: "relative", children: [
              /* @__PURE__ */ U(
                "button",
                {
                  onClick: () => D(!C),
                  className: "flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent dark:hover:bg-accent/80 transition-colors",
                  children: [
                    v.find((H) => H.id === h)?.icon && /* @__PURE__ */ b("span", { className: "text-lg", children: v.find((H) => H.id === h)?.icon }),
                    /* @__PURE__ */ b("span", { className: "font-semibold text-sm text-foreground", children: v.find((H) => H.id === h)?.name || "Selecione" }),
                    /* @__PURE__ */ b(na, { className: "h-4 w-4 text-muted-foreground" })
                  ]
                }
              ),
              C && /* @__PURE__ */ U(yt, { children: [
                /* @__PURE__ */ b(
                  "div",
                  {
                    className: "fixed inset-0 z-40",
                    onClick: () => D(!1)
                  }
                ),
                /* @__PURE__ */ U("div", { className: "absolute left-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 py-2", children: [
                  /* @__PURE__ */ b("div", { className: "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase", children: "Módulos" }),
                  v.map((H) => /* @__PURE__ */ U(
                    "button",
                    {
                      onClick: () => {
                        g(H.id), D(!1);
                      },
                      className: V(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80",
                        h === H.id && "bg-primary/5 text-primary font-medium"
                      ),
                      children: [
                        H.icon && /* @__PURE__ */ b("span", { className: "text-lg", children: H.icon }),
                        /* @__PURE__ */ b("span", { className: "flex-1 text-left", children: H.name }),
                        h === H.id && /* @__PURE__ */ b(qs, { className: "h-4 w-4 text-primary" })
                      ]
                    },
                    H.id
                  ))
                ] })
              ] })
            ] }),
            o && o.length > 0 && /* @__PURE__ */ b(AO, { items: o })
          ] }),
          /* @__PURE__ */ U("div", { className: "flex items-center gap-4", children: [
            f,
            i && /* @__PURE__ */ b("span", { className: "text-sm font-medium text-muted-foreground hidden md:block", children: i }),
            s && s.length >= 0 && /* @__PURE__ */ U("div", { className: "relative", children: [
              /* @__PURE__ */ U(
                "button",
                {
                  onClick: () => j(!R),
                  className: "relative p-2 rounded-sm transition-all hover:bg-accent dark:hover:bg-accent/80 text-muted-foreground hover:text-foreground active:scale-95",
                  children: [
                    /* @__PURE__ */ b(jm, { className: "h-5 w-5" }),
                    I && /* @__PURE__ */ U(yt, { children: [
                      /* @__PURE__ */ b("span", { className: "absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" }),
                      z > 0 && /* @__PURE__ */ b("span", { className: "absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-destructive text-destructive-foreground rounded-full text-[10px] font-bold flex items-center justify-center px-1", children: z > 9 ? "9+" : z })
                    ] })
                  ]
                }
              ),
              R && /* @__PURE__ */ U(yt, { children: [
                /* @__PURE__ */ b(
                  "div",
                  {
                    className: "fixed inset-0 z-40",
                    onClick: () => j(!1)
                  }
                ),
                /* @__PURE__ */ U("div", { className: "absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-[32rem] flex flex-col", children: [
                  /* @__PURE__ */ U("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
                    /* @__PURE__ */ U("div", { children: [
                      /* @__PURE__ */ b("h3", { className: "text-sm font-semibold text-foreground", children: "Notificações" }),
                      z > 0 && /* @__PURE__ */ U("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        z,
                        " não ",
                        z === 1 ? "lida" : "lidas"
                      ] })
                    ] }),
                    /* @__PURE__ */ U("div", { className: "flex items-center gap-3", children: [
                      u && z > 0 && /* @__PURE__ */ b(
                        "button",
                        {
                          onClick: () => {
                            u();
                          },
                          className: "text-xs text-primary hover:text-primary/80 font-medium transition-colors",
                          children: "Marcar como lidas"
                        }
                      ),
                      l && s.length > 0 && /* @__PURE__ */ b(
                        "button",
                        {
                          onClick: () => {
                            l();
                          },
                          className: "text-xs text-destructive hover:text-destructive/80 font-medium transition-colors",
                          children: "Limpar todas"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ b("div", { className: "overflow-y-auto flex-1 scrollbar-hide", children: s.length === 0 ? /* @__PURE__ */ U("div", { className: "flex flex-col items-center justify-center py-12 px-4", children: [
                    /* @__PURE__ */ b("div", { className: "w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-3", children: /* @__PURE__ */ b(jm, { className: "h-8 w-8 text-muted-foreground/50" }) }),
                    /* @__PURE__ */ b("p", { className: "text-sm font-medium text-foreground", children: "Nenhuma notificação" }),
                    /* @__PURE__ */ b("p", { className: "text-xs text-muted-foreground mt-1", children: "Você está em dia!" })
                  ] }) : s.map((H) => /* @__PURE__ */ U(
                    "button",
                    {
                      onClick: () => {
                        c && !H.read && c(H.id);
                      },
                      className: V(
                        "w-full flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent dark:hover:bg-accent/80 border-b border-border/50 last:border-0 text-left",
                        !H.read && "bg-primary/5"
                      ),
                      children: [
                        F(H.type),
                        /* @__PURE__ */ U("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ U("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
                            /* @__PURE__ */ b("h4", { className: V(
                              "text-sm font-medium text-foreground line-clamp-1",
                              !H.read && "font-semibold"
                            ), children: H.title }),
                            !H.read && /* @__PURE__ */ b("div", { className: "w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" })
                          ] }),
                          /* @__PURE__ */ b("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-1", children: H.message }),
                          /* @__PURE__ */ b("span", { className: "text-xs text-muted-foreground/70", children: oe(H.timestamp) })
                        ] })
                      ]
                    },
                    H.id
                  )) }),
                  d && s.length > 0 && /* @__PURE__ */ b("div", { className: "border-t border-border p-2", children: /* @__PURE__ */ b(
                    "button",
                    {
                      onClick: () => {
                        d(), j(!1);
                      },
                      className: "w-full text-center py-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors hover:bg-accent dark:hover:bg-accent/80 rounded-md",
                      children: "Ver todas as notificações"
                    }
                  ) })
                ] })
              ] })
            ] }),
            p,
            a && !p && /* @__PURE__ */ U("div", { className: "relative", children: [
              /* @__PURE__ */ U(
                "button",
                {
                  onClick: () => _(!A),
                  className: "flex items-center gap-3 bg-transparent border-0 py-1 px-2.5 pr-2.5 rounded-md transition-all hover:bg-accent dark:hover:bg-accent/80 active:scale-[0.98]",
                  children: [
                    /* @__PURE__ */ b("div", { className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-semibold overflow-hidden border-2 border-background", children: $() }),
                    /* @__PURE__ */ U("div", { className: "hidden md:flex flex-col items-start", children: [
                      /* @__PURE__ */ b("span", { className: "text-sm font-semibold text-foreground leading-tight", children: a.name }),
                      /* @__PURE__ */ b("span", { className: "text-xs text-muted-foreground leading-tight font-medium", children: a.role })
                    ] }),
                    /* @__PURE__ */ b(na, { className: "h-4 w-4 text-muted-foreground" })
                  ]
                }
              ),
              A && /* @__PURE__ */ U(yt, { children: [
                /* @__PURE__ */ b(
                  "div",
                  {
                    className: "fixed inset-0 z-40",
                    onClick: () => {
                      _(!1);
                    }
                  }
                ),
                /* @__PURE__ */ U("div", { className: "absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-md shadow-lg z-50 py-2", children: [
                  /* @__PURE__ */ U("div", { className: "px-4 py-3 border-b border-border", children: [
                    /* @__PURE__ */ b("p", { className: "text-sm font-semibold", children: a.name }),
                    /* @__PURE__ */ b("p", { className: "text-xs text-muted-foreground", children: a.role })
                  ] }),
                  /* @__PURE__ */ b("div", { className: "py-1", children: w && x && /* @__PURE__ */ U(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        T(!0), _(!1);
                      },
                      className: "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80",
                      children: [
                        /* @__PURE__ */ b("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ b("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                        "Sobre"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ b("div", { className: "border-t border-border my-1" }),
                  /* @__PURE__ */ U(
                    "button",
                    {
                      onClick: () => {
                        P();
                      },
                      className: "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80",
                      children: [
                        /* @__PURE__ */ U("div", { className: "flex items-center gap-3", children: [
                          O ? /* @__PURE__ */ b(W_, { className: "h-4 w-4" }) : /* @__PURE__ */ b(Q_, { className: "h-4 w-4" }),
                          /* @__PURE__ */ U("span", { children: [
                            "Modo ",
                            O ? "Escuro" : "Claro"
                          ] })
                        ] }),
                        /* @__PURE__ */ b("div", { className: V(
                          "relative w-9 h-5 rounded-full transition-colors",
                          O ? "bg-primary" : "bg-muted"
                        ), children: /* @__PURE__ */ b("div", { className: V(
                          "absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform",
                          O ? "left-[18px]" : "left-0.5"
                        ) }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ b("div", { className: "border-t border-border my-1" }),
                  /* @__PURE__ */ b("div", { className: "py-1", children: /* @__PURE__ */ U(
                    "button",
                    {
                      onClick: () => {
                        _(!1), y?.();
                      },
                      className: "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent dark:hover:bg-accent/80 text-destructive",
                      children: [
                        /* @__PURE__ */ b(B_, { className: "h-4 w-4" }),
                        "Sair"
                      ]
                    }
                  ) })
                ] })
              ] })
            ] })
          ] }),
          N && x && x(() => T(!1))
        ]
      }
    );
  }
);
JO.displayName = "Navbar";
const Wl = {
  width: 0,
  height: 0,
  borderLeft: "8px solid transparent",
  borderRight: "8px solid transparent",
  borderBottom: "14px solid currentColor",
  animation: "globalLoaderPulse 1.4s ease-in-out infinite"
}, QO = ({ isVisible: e, className: t }) => e ? /* @__PURE__ */ U(
  "div",
  {
    className: V(
      "fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[9999]",
      t
    ),
    children: [
      /* @__PURE__ */ b("style", { children: `
        @keyframes globalLoaderPulse {
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      ` }),
      /* @__PURE__ */ U("div", { className: "text-primary", style: { position: "relative", width: 44, height: 38 }, children: [
        /* @__PURE__ */ b("div", { style: { ...Wl, position: "absolute", top: 0, left: 14, animationDelay: "0s" } }),
        /* @__PURE__ */ b("div", { style: { ...Wl, position: "absolute", bottom: 0, left: 0, animationDelay: "0.16s" } }),
        /* @__PURE__ */ b("div", { style: { ...Wl, position: "absolute", bottom: 0, right: 0, animationDelay: "0.32s" } })
      ] })
    ]
  }
) : null;
QO.displayName = "GlobalLoader";
const eP = m.createContext(null), Z7 = () => {
  const e = m.useContext(eP);
  if (!e)
    throw new Error("useGlobalLoader must be used within GlobalLoaderProvider");
  return e;
}, J7 = ({ children: e }) => {
  const [t, r] = m.useState(0), n = m.useCallback(() => {
    r((i) => i + 1);
  }, []), o = m.useCallback(() => {
    r((i) => Math.max(0, i - 1));
  }, []), a = t > 0;
  return /* @__PURE__ */ U(eP.Provider, { value: { isLoading: a, showLoader: n, hideLoader: o }, children: [
    e,
    /* @__PURE__ */ b(QO, { isVisible: a })
  ] });
}, a$ = m.forwardRef(
  ({ title: e, icon: t, children: r, emptyMessage: n = "Nenhum dado disponível", isEmpty: o = !1, height: a = 400, className: i }, s) => /* @__PURE__ */ U("div", { ref: s, className: V("bg-card rounded-lg border shadow-sm", i), children: [
    e && /* @__PURE__ */ b("div", { className: "border-b px-6 py-4", children: /* @__PURE__ */ U("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
      t && /* @__PURE__ */ b("span", { className: "flex items-center", children: t }),
      e
    ] }) }),
    /* @__PURE__ */ b(
      "div",
      {
        className: "p-6",
        style: { height: typeof a == "number" ? `${a}px` : a },
        children: o ? /* @__PURE__ */ b("div", { className: "flex items-center justify-center h-full text-muted-foreground", children: n }) : r
      }
    )
  ] })
);
a$.displayName = "ChartContainer";
var i$ = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function Np(e) {
  if (typeof e != "string")
    return !1;
  var t = i$;
  return t.includes(e);
}
var s$ = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
];
function tP(e) {
  if (typeof e != "string")
    return !1;
  var t = s$;
  return t.includes(e);
}
function rP(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function ht(e) {
  var t = Object.entries(e).filter((r) => {
    var [n] = r;
    return tP(n) || rP(n);
  });
  return Object.fromEntries(t);
}
function Mn(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ Kt(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return ht(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? ht(e) : null;
}
function mt(e) {
  var t = Object.entries(e).filter((r) => {
    var [n] = r;
    return tP(n) || rP(n) || Np(n);
  });
  return Object.fromEntries(t);
}
function nP(e) {
  return e == null ? null : /* @__PURE__ */ Kt(e) ? mt(e.props) : typeof e == "object" && !Array.isArray(e) ? mt(e) : null;
}
var c$ = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Vd() {
  return Vd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vd.apply(null, arguments);
}
function l$(e, t) {
  if (e == null) return {};
  var r, n, o = u$(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function u$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Rp = /* @__PURE__ */ Fe((e, t) => {
  var {
    children: r,
    width: n,
    height: o,
    viewBox: a,
    className: i,
    style: s,
    title: c,
    desc: u
  } = e, l = l$(e, c$), d = a || {
    width: n,
    height: o,
    x: 0,
    y: 0
  }, p = pe("recharts-surface", i);
  return /* @__PURE__ */ m.createElement("svg", Vd({}, mt(l), {
    className: p,
    width: n,
    height: o,
    style: s,
    viewBox: "".concat(d.x, " ").concat(d.y, " ").concat(d.width, " ").concat(d.height),
    ref: t
  }), /* @__PURE__ */ m.createElement("title", null, c), /* @__PURE__ */ m.createElement("desc", null, u), r);
}), d$ = ["children", "className"];
function qd() {
  return qd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qd.apply(null, arguments);
}
function f$(e, t) {
  if (e == null) return {};
  var r, n, o = p$(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function p$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var $e = /* @__PURE__ */ m.forwardRef((e, t) => {
  var {
    children: r,
    className: n
  } = e, o = f$(e, d$), a = pe("recharts-layer", n);
  return /* @__PURE__ */ m.createElement("g", qd({
    className: a
  }, mt(o), {
    ref: t
  }), r);
}), oP = /* @__PURE__ */ Dt(null), h$ = () => er(oP);
function Pe(e) {
  return function() {
    return e;
  };
}
const aP = Math.cos, os = Math.sin, or = Math.sqrt, as = Math.PI, kc = 2 * as, Hd = Math.PI, Gd = 2 * Hd, hn = 1e-6, m$ = Gd - hn;
function iP(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function v$(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return iP;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let o = 1, a = n.length; o < a; ++o)
      this._ += Math.round(arguments[o] * r) / r + n[o];
  };
}
class g$ {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? iP : v$(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, o) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +o}`;
  }
  bezierCurveTo(t, r, n, o, a, i) {
    this._append`C${+t},${+r},${+n},${+o},${this._x1 = +a},${this._y1 = +i}`;
  }
  arcTo(t, r, n, o, a) {
    if (t = +t, r = +r, n = +n, o = +o, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let i = this._x1, s = this._y1, c = n - t, u = o - r, l = i - t, d = s - r, p = l * l + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (p > hn) if (!(Math.abs(d * c - u * l) > hn) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let f = n - i, v = o - s, h = c * c + u * u, g = f * f + v * v, y = Math.sqrt(h), w = Math.sqrt(p), x = a * Math.tan((Hd - Math.acos((h + p - g) / (2 * y * w))) / 2), S = x / w, E = x / y;
      Math.abs(S - 1) > hn && this._append`L${t + S * l},${r + S * d}`, this._append`A${a},${a},0,0,${+(d * f > l * v)},${this._x1 = t + E * c},${this._y1 = r + E * u}`;
    }
  }
  arc(t, r, n, o, a, i) {
    if (t = +t, r = +r, n = +n, i = !!i, n < 0) throw new Error(`negative radius: ${n}`);
    let s = n * Math.cos(o), c = n * Math.sin(o), u = t + s, l = r + c, d = 1 ^ i, p = i ? o - a : a - o;
    this._x1 === null ? this._append`M${u},${l}` : (Math.abs(this._x1 - u) > hn || Math.abs(this._y1 - l) > hn) && this._append`L${u},${l}`, n && (p < 0 && (p = p % Gd + Gd), p > m$ ? this._append`A${n},${n},0,1,${d},${t - s},${r - c}A${n},${n},0,1,${d},${this._x1 = u},${this._y1 = l}` : p > hn && this._append`A${n},${n},0,${+(p >= Hd)},${d},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, o) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+o}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Mp(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new g$(t);
}
function Ip(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function sP(e) {
  this._context = e;
}
sP.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function Nc(e) {
  return new sP(e);
}
function cP(e) {
  return e[0];
}
function lP(e) {
  return e[1];
}
function uP(e, t) {
  var r = Pe(!0), n = null, o = Nc, a = null, i = Mp(s);
  e = typeof e == "function" ? e : e === void 0 ? cP : Pe(e), t = typeof t == "function" ? t : t === void 0 ? lP : Pe(t);
  function s(c) {
    var u, l = (c = Ip(c)).length, d, p = !1, f;
    for (n == null && (a = o(f = i())), u = 0; u <= l; ++u)
      !(u < l && r(d = c[u], u, c)) === p && ((p = !p) ? a.lineStart() : a.lineEnd()), p && a.point(+e(d, u, c), +t(d, u, c));
    if (f) return a = null, f + "" || null;
  }
  return s.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Pe(+c), s) : e;
  }, s.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Pe(+c), s) : t;
  }, s.defined = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : Pe(!!c), s) : r;
  }, s.curve = function(c) {
    return arguments.length ? (o = c, n != null && (a = o(n)), s) : o;
  }, s.context = function(c) {
    return arguments.length ? (c == null ? n = a = null : a = o(n = c), s) : n;
  }, s;
}
function mi(e, t, r) {
  var n = null, o = Pe(!0), a = null, i = Nc, s = null, c = Mp(u);
  e = typeof e == "function" ? e : e === void 0 ? cP : Pe(+e), t = typeof t == "function" ? t : Pe(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? lP : Pe(+r);
  function u(d) {
    var p, f, v, h = (d = Ip(d)).length, g, y = !1, w, x = new Array(h), S = new Array(h);
    for (a == null && (s = i(w = c())), p = 0; p <= h; ++p) {
      if (!(p < h && o(g = d[p], p, d)) === y)
        if (y = !y)
          f = p, s.areaStart(), s.lineStart();
        else {
          for (s.lineEnd(), s.lineStart(), v = p - 1; v >= f; --v)
            s.point(x[v], S[v]);
          s.lineEnd(), s.areaEnd();
        }
      y && (x[p] = +e(g, p, d), S[p] = +t(g, p, d), s.point(n ? +n(g, p, d) : x[p], r ? +r(g, p, d) : S[p]));
    }
    if (w) return s = null, w + "" || null;
  }
  function l() {
    return uP().defined(o).curve(i).context(a);
  }
  return u.x = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Pe(+d), n = null, u) : e;
  }, u.x0 = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Pe(+d), u) : e;
  }, u.x1 = function(d) {
    return arguments.length ? (n = d == null ? null : typeof d == "function" ? d : Pe(+d), u) : n;
  }, u.y = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Pe(+d), r = null, u) : t;
  }, u.y0 = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Pe(+d), u) : t;
  }, u.y1 = function(d) {
    return arguments.length ? (r = d == null ? null : typeof d == "function" ? d : Pe(+d), u) : r;
  }, u.lineX0 = u.lineY0 = function() {
    return l().x(e).y(t);
  }, u.lineY1 = function() {
    return l().x(e).y(r);
  }, u.lineX1 = function() {
    return l().x(n).y(t);
  }, u.defined = function(d) {
    return arguments.length ? (o = typeof d == "function" ? d : Pe(!!d), u) : o;
  }, u.curve = function(d) {
    return arguments.length ? (i = d, a != null && (s = i(a)), u) : i;
  }, u.context = function(d) {
    return arguments.length ? (d == null ? a = s = null : s = i(a = d), u) : a;
  }, u;
}
class dP {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function y$(e) {
  return new dP(e, !0);
}
function b$(e) {
  return new dP(e, !1);
}
const Dp = {
  draw(e, t) {
    const r = or(t / as);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, kc);
  }
}, w$ = {
  draw(e, t) {
    const r = or(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, fP = or(1 / 3), x$ = fP * 2, E$ = {
  draw(e, t) {
    const r = or(t / x$), n = r * fP;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, S$ = {
  draw(e, t) {
    const r = or(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, O$ = 0.8908130915292852, pP = os(as / 10) / os(7 * as / 10), P$ = os(kc / 10) * pP, A$ = -aP(kc / 10) * pP, C$ = {
  draw(e, t) {
    const r = or(t * O$), n = P$ * r, o = A$ * r;
    e.moveTo(0, -r), e.lineTo(n, o);
    for (let a = 1; a < 5; ++a) {
      const i = kc * a / 5, s = aP(i), c = os(i);
      e.lineTo(c * r, -s * r), e.lineTo(s * n - c * o, c * n + s * o);
    }
    e.closePath();
  }
}, Kl = or(3), T$ = {
  draw(e, t) {
    const r = -or(t / (Kl * 3));
    e.moveTo(0, r * 2), e.lineTo(-Kl * r, -r), e.lineTo(Kl * r, -r), e.closePath();
  }
}, $t = -0.5, Bt = or(3) / 2, Yd = 1 / or(12), _$ = (Yd / 2 + 1) * 3, k$ = {
  draw(e, t) {
    const r = or(t / _$), n = r / 2, o = r * Yd, a = n, i = r * Yd + r, s = -a, c = i;
    e.moveTo(n, o), e.lineTo(a, i), e.lineTo(s, c), e.lineTo($t * n - Bt * o, Bt * n + $t * o), e.lineTo($t * a - Bt * i, Bt * a + $t * i), e.lineTo($t * s - Bt * c, Bt * s + $t * c), e.lineTo($t * n + Bt * o, $t * o - Bt * n), e.lineTo($t * a + Bt * i, $t * i - Bt * a), e.lineTo($t * s + Bt * c, $t * c - Bt * s), e.closePath();
  }
};
function N$(e, t) {
  let r = null, n = Mp(o);
  e = typeof e == "function" ? e : Pe(e || Dp), t = typeof t == "function" ? t : Pe(t === void 0 ? 64 : +t);
  function o() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return o.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Pe(a), o) : e;
  }, o.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Pe(+a), o) : t;
  }, o.context = function(a) {
    return arguments.length ? (r = a ?? null, o) : r;
  }, o;
}
function is() {
}
function ss(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function hP(e) {
  this._context = e;
}
hP.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        ss(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        ss(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function R$(e) {
  return new hP(e);
}
function mP(e) {
  this._context = e;
}
mP.prototype = {
  areaStart: is,
  areaEnd: is,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        ss(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function M$(e) {
  return new mP(e);
}
function vP(e) {
  this._context = e;
}
vP.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        ss(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function I$(e) {
  return new vP(e);
}
function gP(e) {
  this._context = e;
}
gP.prototype = {
  areaStart: is,
  areaEnd: is,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function D$(e) {
  return new gP(e);
}
function kv(e) {
  return e < 0 ? -1 : 1;
}
function Nv(e, t, r) {
  var n = e._x1 - e._x0, o = t - e._x1, a = (e._y1 - e._y0) / (n || o < 0 && -0), i = (r - e._y1) / (o || n < 0 && -0), s = (a * o + i * n) / (n + o);
  return (kv(a) + kv(i)) * Math.min(Math.abs(a), Math.abs(i), 0.5 * Math.abs(s)) || 0;
}
function Rv(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function Vl(e, t, r) {
  var n = e._x0, o = e._y0, a = e._x1, i = e._y1, s = (a - n) / 3;
  e._context.bezierCurveTo(n + s, o + s * t, a - s, i - s * r, a, i);
}
function cs(e) {
  this._context = e;
}
cs.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Vl(this, this._t0, Rv(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Vl(this, Rv(this, r = Nv(this, e, t)), r);
          break;
        default:
          Vl(this, this._t0, r = Nv(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function yP(e) {
  this._context = new bP(e);
}
(yP.prototype = Object.create(cs.prototype)).point = function(e, t) {
  cs.prototype.point.call(this, t, e);
};
function bP(e) {
  this._context = e;
}
bP.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, o, a) {
    this._context.bezierCurveTo(t, e, n, r, a, o);
  }
};
function j$(e) {
  return new cs(e);
}
function L$(e) {
  return new yP(e);
}
function wP(e) {
  this._context = e;
}
wP.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = Mv(e), o = Mv(t), a = 0, i = 1; i < r; ++a, ++i)
          this._context.bezierCurveTo(n[0][a], o[0][a], n[1][a], o[1][a], e[i], t[i]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Mv(e) {
  var t, r = e.length - 1, n, o = new Array(r), a = new Array(r), i = new Array(r);
  for (o[0] = 0, a[0] = 2, i[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) o[t] = 1, a[t] = 4, i[t] = 4 * e[t] + 2 * e[t + 1];
  for (o[r - 1] = 2, a[r - 1] = 7, i[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = o[t] / a[t - 1], a[t] -= n, i[t] -= n * i[t - 1];
  for (o[r - 1] = i[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) o[t] = (i[t] - o[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + o[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - o[t + 1];
  return [o, a];
}
function $$(e) {
  return new wP(e);
}
function Rc(e, t) {
  this._context = e, this._t = t;
}
Rc.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function B$(e) {
  return new Rc(e, 0.5);
}
function F$(e) {
  return new Rc(e, 0);
}
function z$(e) {
  return new Rc(e, 1);
}
function co(e, t) {
  if ((i = e.length) > 1)
    for (var r = 1, n, o, a = e[t[0]], i, s = a.length; r < i; ++r)
      for (o = a, a = e[t[r]], n = 0; n < s; ++n)
        a[n][1] += a[n][0] = isNaN(o[n][1]) ? o[n][0] : o[n][1];
}
function Xd(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function U$(e, t) {
  return e[t];
}
function W$(e) {
  const t = [];
  return t.key = e, t;
}
function K$() {
  var e = Pe([]), t = Xd, r = co, n = U$;
  function o(a) {
    var i = Array.from(e.apply(this, arguments), W$), s, c = i.length, u = -1, l;
    for (const d of a)
      for (s = 0, ++u; s < c; ++s)
        (i[s][u] = [0, +n(d, i[s].key, u, a)]).data = d;
    for (s = 0, l = Ip(t(i)); s < c; ++s)
      i[l[s]].index = s;
    return r(i, l), i;
  }
  return o.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Pe(Array.from(a)), o) : e;
  }, o.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Pe(+a), o) : n;
  }, o.order = function(a) {
    return arguments.length ? (t = a == null ? Xd : typeof a == "function" ? a : Pe(Array.from(a)), o) : t;
  }, o.offset = function(a) {
    return arguments.length ? (r = a ?? co, o) : r;
  }, o;
}
function V$(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, o = 0, a = e[0].length, i; o < a; ++o) {
      for (i = r = 0; r < n; ++r) i += e[r][o][1] || 0;
      if (i) for (r = 0; r < n; ++r) e[r][o][1] /= i;
    }
    co(e, t);
  }
}
function q$(e, t) {
  if ((o = e.length) > 0) {
    for (var r = 0, n = e[t[0]], o, a = n.length; r < a; ++r) {
      for (var i = 0, s = 0; i < o; ++i) s += e[i][r][1] || 0;
      n[r][1] += n[r][0] = -s / 2;
    }
    co(e, t);
  }
}
function H$(e, t) {
  if (!(!((i = e.length) > 0) || !((a = (o = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, o, a, i; n < a; ++n) {
      for (var s = 0, c = 0, u = 0; s < i; ++s) {
        for (var l = e[t[s]], d = l[n][1] || 0, p = l[n - 1][1] || 0, f = (d - p) / 2, v = 0; v < s; ++v) {
          var h = e[t[v]], g = h[n][1] || 0, y = h[n - 1][1] || 0;
          f += g - y;
        }
        c += d, u += f * d;
      }
      o[n - 1][1] += o[n - 1][0] = r, c && (r -= u / c);
    }
    o[n - 1][1] += o[n - 1][0] = r, co(e, t);
  }
}
function sn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ql = {}, Hl = {}, Iv;
function G$() {
  return Iv || (Iv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r === "__proto__";
    }
    e.isUnsafeProperty = t;
  })(Hl)), Hl;
}
var Gl = {}, Dv;
function xP() {
  return Dv || (Dv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      switch (typeof r) {
        case "number":
        case "symbol":
          return !1;
        case "string":
          return r.includes(".") || r.includes("[") || r.includes("]");
      }
    }
    e.isDeepKey = t;
  })(Gl)), Gl;
}
var Yl = {}, jv;
function jp() {
  return jv || (jv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return typeof r == "string" || typeof r == "symbol" ? r : Object.is(r?.valueOf?.(), -0) ? "-0" : String(r);
    }
    e.toKey = t;
  })(Yl)), Yl;
}
var Xl = {}, Zl = {}, Lv;
function Y$() {
  return Lv || (Lv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      if (r == null)
        return "";
      if (typeof r == "string")
        return r;
      if (Array.isArray(r))
        return r.map(t).join(",");
      const n = String(r);
      return n === "0" && Object.is(Number(r), -0) ? "-0" : n;
    }
    e.toString = t;
  })(Zl)), Zl;
}
var $v;
function Lp() {
  return $v || ($v = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ Y$(), r = /* @__PURE__ */ jp();
    function n(o) {
      if (Array.isArray(o))
        return o.map(r.toKey);
      if (typeof o == "symbol")
        return [o];
      o = t.toString(o);
      const a = [], i = o.length;
      if (i === 0)
        return a;
      let s = 0, c = "", u = "", l = !1;
      for (o.charCodeAt(0) === 46 && (a.push(""), s++); s < i; ) {
        const d = o[s];
        u ? d === "\\" && s + 1 < i ? (s++, c += o[s]) : d === u ? u = "" : c += d : l ? d === '"' || d === "'" ? u = d : d === "]" ? (l = !1, a.push(c), c = "") : c += d : d === "[" ? (l = !0, c && (a.push(c), c = "")) : d === "." ? c && (a.push(c), c = "") : c += d, s++;
      }
      return c && a.push(c), a;
    }
    e.toPath = n;
  })(Xl)), Xl;
}
var Bv;
function $p() {
  return Bv || (Bv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ G$(), r = /* @__PURE__ */ xP(), n = /* @__PURE__ */ jp(), o = /* @__PURE__ */ Lp();
    function a(s, c, u) {
      if (s == null)
        return u;
      switch (typeof c) {
        case "string": {
          if (t.isUnsafeProperty(c))
            return u;
          const l = s[c];
          return l === void 0 ? r.isDeepKey(c) ? a(s, o.toPath(c), u) : u : l;
        }
        case "number":
        case "symbol": {
          typeof c == "number" && (c = n.toKey(c));
          const l = s[c];
          return l === void 0 ? u : l;
        }
        default: {
          if (Array.isArray(c))
            return i(s, c, u);
          if (Object.is(c?.valueOf(), -0) ? c = "-0" : c = String(c), t.isUnsafeProperty(c))
            return u;
          const l = s[c];
          return l === void 0 ? u : l;
        }
      }
    }
    function i(s, c, u) {
      if (c.length === 0)
        return u;
      let l = s;
      for (let d = 0; d < c.length; d++) {
        if (l == null || t.isUnsafeProperty(c[d]))
          return u;
        l = l[c[d]];
      }
      return l === void 0 ? u : l;
    }
    e.get = a;
  })(ql)), ql;
}
var Jl, Fv;
function X$() {
  return Fv || (Fv = 1, Jl = $p().get), Jl;
}
var Z$ = /* @__PURE__ */ X$();
const In = /* @__PURE__ */ sn(Z$);
var Qe = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, Mt = (e) => typeof e == "number" && e != +e, kr = (e) => typeof e == "string" && e.indexOf("%") === e.length - 1, Q = (e) => (typeof e == "number" || e instanceof Number) && !Mt(e), pr = (e) => Q(e) || typeof e == "string", J$ = 0, la = (e) => {
  var t = ++J$;
  return "".concat(e || "").concat(t);
}, ct = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!Q(t) && typeof t != "string")
    return n;
  var a;
  if (kr(t)) {
    if (r == null)
      return n;
    var i = t.indexOf("%");
    a = r * parseFloat(t.slice(0, i)) / 100;
  } else
    a = +t;
  return Mt(a) && (a = n), o && r != null && a > r && (a = r), a;
}, EP = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[e[n]])
      r[e[n]] = !0;
    else
      return !0;
  return !1;
};
function Ee(e, t, r) {
  return Q(e) && Q(t) ? e + r * (t - e) : t;
}
function SP(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : In(n, t)) === r);
}
var Ce = (e) => e === null || typeof e > "u", ja = (e) => Ce(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1)), Q$ = ["type", "size", "sizeType"];
function Zd() {
  return Zd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zd.apply(null, arguments);
}
function zv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Uv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zv(Object(r), !0).forEach(function(n) {
      eB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eB(e, t, r) {
  return (t = tB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tB(e) {
  var t = rB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nB(e, t) {
  if (e == null) return {};
  var r, n, o = oB(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function oB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var OP = {
  symbolCircle: Dp,
  symbolCross: w$,
  symbolDiamond: E$,
  symbolSquare: S$,
  symbolStar: C$,
  symbolTriangle: T$,
  symbolWye: k$
}, aB = Math.PI / 180, iB = (e) => {
  var t = "symbol".concat(ja(e));
  return OP[t] || Dp;
}, sB = (e, t, r) => {
  if (t === "area")
    return e;
  switch (r) {
    case "cross":
      return 5 * e * e / 9;
    case "diamond":
      return 0.5 * e * e / Math.sqrt(3);
    case "square":
      return e * e;
    case "star": {
      var n = 18 * aB;
      return 1.25 * e * e * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, cB = (e, t) => {
  OP["symbol".concat(ja(e))] = t;
}, Bp = (e) => {
  var {
    type: t = "circle",
    size: r = 64,
    sizeType: n = "area"
  } = e, o = nB(e, Q$), a = Uv(Uv({}, o), {}, {
    type: t,
    size: r,
    sizeType: n
  }), i = "circle";
  typeof t == "string" && (i = t);
  var s = () => {
    var p = iB(i), f = N$().type(p).size(sB(r, n, i)), v = f();
    if (v !== null)
      return v;
  }, {
    className: c,
    cx: u,
    cy: l
  } = a, d = mt(a);
  return u === +u && l === +l && r === +r ? /* @__PURE__ */ m.createElement("path", Zd({}, d, {
    className: pe("recharts-symbols", c),
    transform: "translate(".concat(u, ", ").concat(l, ")"),
    d: s()
  })) : null;
};
Bp.registerSymbol = cB;
var Fp = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ Kt(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((o) => {
    Np(o) && (n[o] = ((a) => r[o](r, a)));
  }), n;
}, lB = (e, t, r) => (n) => (e(t, r, n), null), La = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((o) => {
    var a = e[o];
    Np(o) && typeof a == "function" && (n || (n = {}), n[o] = lB(a, t, r));
  }), n;
};
function Jd() {
  return Jd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jd.apply(null, arguments);
}
function Wv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function uB(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wv(Object(r), !0).forEach(function(n) {
      zp(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zp(e, t, r) {
  return (t = dB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dB(e) {
  var t = fB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function fB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ft = 32;
class Up extends xa {
  /**
   * Render the path of icon
   * @param data Data of each legend item
   * @param iconType if defined, it will always render this icon. If undefined then it uses icon from data.type
   * @return Path element
   */
  renderIcon(t, r) {
    var {
      inactiveColor: n
    } = this.props, o = Ft / 2, a = Ft / 6, i = Ft / 3, s = t.inactive ? n : t.color, c = r ?? t.type;
    if (c === "none")
      return null;
    if (c === "plainline")
      return /* @__PURE__ */ m.createElement("line", {
        strokeWidth: 4,
        fill: "none",
        stroke: s,
        strokeDasharray: t.payload.strokeDasharray,
        x1: 0,
        y1: o,
        x2: Ft,
        y2: o,
        className: "recharts-legend-icon"
      });
    if (c === "line")
      return /* @__PURE__ */ m.createElement("path", {
        strokeWidth: 4,
        fill: "none",
        stroke: s,
        d: "M0,".concat(o, "h").concat(i, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * i, ",").concat(o, `
            H`).concat(Ft, "M").concat(2 * i, ",").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(i, ",").concat(o),
        className: "recharts-legend-icon"
      });
    if (c === "rect")
      return /* @__PURE__ */ m.createElement("path", {
        stroke: "none",
        fill: s,
        d: "M0,".concat(Ft / 8, "h").concat(Ft, "v").concat(Ft * 3 / 4, "h").concat(-Ft, "z"),
        className: "recharts-legend-icon"
      });
    if (/* @__PURE__ */ m.isValidElement(t.legendIcon)) {
      var u = uB({}, t);
      return delete u.legendIcon, /* @__PURE__ */ m.cloneElement(t.legendIcon, u);
    }
    return /* @__PURE__ */ m.createElement(Bp, {
      fill: s,
      cx: o,
      cy: o,
      size: Ft,
      sizeType: "diameter",
      type: c
    });
  }
  /**
   * Draw items of legend
   * @return Items
   */
  renderItems() {
    var {
      payload: t,
      iconSize: r,
      layout: n,
      formatter: o,
      inactiveColor: a,
      iconType: i
    } = this.props, s = {
      x: 0,
      y: 0,
      width: Ft,
      height: Ft
    }, c = {
      display: n === "horizontal" ? "inline-block" : "block",
      marginRight: 10
    }, u = {
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 4
    };
    return t.map((l, d) => {
      var p = l.formatter || o, f = pe({
        "recharts-legend-item": !0,
        ["legend-item-".concat(d)]: !0,
        inactive: l.inactive
      });
      if (l.type === "none")
        return null;
      var v = l.inactive ? a : l.color, h = p ? p(l.value, l, d) : l.value;
      return /* @__PURE__ */ m.createElement("li", Jd({
        className: f,
        style: c,
        key: "legend-item-".concat(d)
      }, La(this.props, l, d)), /* @__PURE__ */ m.createElement(Rp, {
        width: r,
        height: r,
        viewBox: s,
        style: u,
        "aria-label": "".concat(h, " legend icon")
      }, this.renderIcon(l, i)), /* @__PURE__ */ m.createElement("span", {
        className: "recharts-legend-item-text",
        style: {
          color: v
        }
      }, h));
    });
  }
  render() {
    var {
      payload: t,
      layout: r,
      align: n
    } = this.props;
    if (!t || !t.length)
      return null;
    var o = {
      padding: 0,
      margin: 0,
      textAlign: r === "horizontal" ? n : "left"
    };
    return /* @__PURE__ */ m.createElement("ul", {
      className: "recharts-default-legend",
      style: o
    }, this.renderItems());
  }
}
zp(Up, "displayName", "Legend");
zp(Up, "defaultProps", {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle"
});
var Ql = {}, eu = {}, Kv;
function pB() {
  return Kv || (Kv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r, n) {
      const o = /* @__PURE__ */ new Map();
      for (let a = 0; a < r.length; a++) {
        const i = r[a], s = n(i);
        o.has(s) || o.set(s, i);
      }
      return Array.from(o.values());
    }
    e.uniqBy = t;
  })(eu)), eu;
}
var tu = {}, Vv;
function PP() {
  return Vv || (Vv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r;
    }
    e.identity = t;
  })(tu)), tu;
}
var ru = {}, nu = {}, ou = {}, qv;
function hB() {
  return qv || (qv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return Number.isSafeInteger(r) && r >= 0;
    }
    e.isLength = t;
  })(ou)), ou;
}
var Hv;
function Wp() {
  return Hv || (Hv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ hB();
    function r(n) {
      return n != null && typeof n != "function" && t.isLength(n.length);
    }
    e.isArrayLike = r;
  })(nu)), nu;
}
var au = {}, Gv;
function mB() {
  return Gv || (Gv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return typeof r == "object" && r !== null;
    }
    e.isObjectLike = t;
  })(au)), au;
}
var Yv;
function vB() {
  return Yv || (Yv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ Wp(), r = /* @__PURE__ */ mB();
    function n(o) {
      return r.isObjectLike(o) && t.isArrayLike(o);
    }
    e.isArrayLikeObject = n;
  })(ru)), ru;
}
var iu = {}, su = {}, Xv;
function gB() {
  return Xv || (Xv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ $p();
    function r(n) {
      return function(o) {
        return t.get(o, n);
      };
    }
    e.property = r;
  })(su)), su;
}
var cu = {}, lu = {}, uu = {}, du = {}, Zv;
function AP() {
  return Zv || (Zv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r !== null && (typeof r == "object" || typeof r == "function");
    }
    e.isObject = t;
  })(du)), du;
}
var fu = {}, Jv;
function CP() {
  return Jv || (Jv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r == null || typeof r != "object" && typeof r != "function";
    }
    e.isPrimitive = t;
  })(fu)), fu;
}
var pu = {}, Qv;
function TP() {
  return Qv || (Qv = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r, n) {
      return r === n || Number.isNaN(r) && Number.isNaN(n);
    }
    e.eq = t;
  })(pu)), pu;
}
var eg;
function yB() {
  return eg || (eg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ AP(), r = /* @__PURE__ */ CP(), n = /* @__PURE__ */ TP();
    function o(l, d, p) {
      return typeof p != "function" ? o(l, d, () => {
      }) : a(l, d, function f(v, h, g, y, w, x) {
        const S = p(v, h, g, y, w, x);
        return S !== void 0 ? !!S : a(v, h, f, x);
      }, /* @__PURE__ */ new Map());
    }
    function a(l, d, p, f) {
      if (d === l)
        return !0;
      switch (typeof d) {
        case "object":
          return i(l, d, p, f);
        case "function":
          return Object.keys(d).length > 0 ? a(l, { ...d }, p, f) : n.eq(l, d);
        default:
          return t.isObject(l) ? typeof d == "string" ? d === "" : !0 : n.eq(l, d);
      }
    }
    function i(l, d, p, f) {
      if (d == null)
        return !0;
      if (Array.isArray(d))
        return c(l, d, p, f);
      if (d instanceof Map)
        return s(l, d, p, f);
      if (d instanceof Set)
        return u(l, d, p, f);
      const v = Object.keys(d);
      if (l == null)
        return v.length === 0;
      if (v.length === 0)
        return !0;
      if (f?.has(d))
        return f.get(d) === l;
      f?.set(d, l);
      try {
        for (let h = 0; h < v.length; h++) {
          const g = v[h];
          if (!r.isPrimitive(l) && !(g in l) || d[g] === void 0 && l[g] !== void 0 || d[g] === null && l[g] !== null || !p(l[g], d[g], g, l, d, f))
            return !1;
        }
        return !0;
      } finally {
        f?.delete(d);
      }
    }
    function s(l, d, p, f) {
      if (d.size === 0)
        return !0;
      if (!(l instanceof Map))
        return !1;
      for (const [v, h] of d.entries()) {
        const g = l.get(v);
        if (p(g, h, v, l, d, f) === !1)
          return !1;
      }
      return !0;
    }
    function c(l, d, p, f) {
      if (d.length === 0)
        return !0;
      if (!Array.isArray(l))
        return !1;
      const v = /* @__PURE__ */ new Set();
      for (let h = 0; h < d.length; h++) {
        const g = d[h];
        let y = !1;
        for (let w = 0; w < l.length; w++) {
          if (v.has(w))
            continue;
          const x = l[w];
          let S = !1;
          if (p(x, g, h, l, d, f) && (S = !0), S) {
            v.add(w), y = !0;
            break;
          }
        }
        if (!y)
          return !1;
      }
      return !0;
    }
    function u(l, d, p, f) {
      return d.size === 0 ? !0 : l instanceof Set ? c([...l], [...d], p, f) : !1;
    }
    e.isMatchWith = o, e.isSetMatch = u;
  })(uu)), uu;
}
var tg;
function _P() {
  return tg || (tg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ yB();
    function r(n, o) {
      return t.isMatchWith(n, o, () => {
      });
    }
    e.isMatch = r;
  })(lu)), lu;
}
var hu = {}, mu = {}, vu = {}, rg;
function bB() {
  return rg || (rg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return Object.getOwnPropertySymbols(r).filter((n) => Object.prototype.propertyIsEnumerable.call(r, n));
    }
    e.getSymbols = t;
  })(vu)), vu;
}
var gu = {}, ng;
function kP() {
  return ng || (ng = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r == null ? r === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r);
    }
    e.getTag = t;
  })(gu)), gu;
}
var yu = {}, og;
function NP() {
  return og || (og = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = "[object RegExp]", r = "[object String]", n = "[object Number]", o = "[object Boolean]", a = "[object Arguments]", i = "[object Symbol]", s = "[object Date]", c = "[object Map]", u = "[object Set]", l = "[object Array]", d = "[object Function]", p = "[object ArrayBuffer]", f = "[object Object]", v = "[object Error]", h = "[object DataView]", g = "[object Uint8Array]", y = "[object Uint8ClampedArray]", w = "[object Uint16Array]", x = "[object Uint32Array]", S = "[object BigUint64Array]", E = "[object Int8Array]", O = "[object Int16Array]", P = "[object Int32Array]", A = "[object BigInt64Array]", _ = "[object Float32Array]", N = "[object Float64Array]";
    e.argumentsTag = a, e.arrayBufferTag = p, e.arrayTag = l, e.bigInt64ArrayTag = A, e.bigUint64ArrayTag = S, e.booleanTag = o, e.dataViewTag = h, e.dateTag = s, e.errorTag = v, e.float32ArrayTag = _, e.float64ArrayTag = N, e.functionTag = d, e.int16ArrayTag = O, e.int32ArrayTag = P, e.int8ArrayTag = E, e.mapTag = c, e.numberTag = n, e.objectTag = f, e.regexpTag = t, e.setTag = u, e.stringTag = r, e.symbolTag = i, e.uint16ArrayTag = w, e.uint32ArrayTag = x, e.uint8ArrayTag = g, e.uint8ClampedArrayTag = y;
  })(yu)), yu;
}
var bu = {}, ag;
function wB() {
  return ag || (ag = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return ArrayBuffer.isView(r) && !(r instanceof DataView);
    }
    e.isTypedArray = t;
  })(bu)), bu;
}
var ig;
function RP() {
  return ig || (ig = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ bB(), r = /* @__PURE__ */ kP(), n = /* @__PURE__ */ NP(), o = /* @__PURE__ */ CP(), a = /* @__PURE__ */ wB();
    function i(l, d) {
      return s(l, void 0, l, /* @__PURE__ */ new Map(), d);
    }
    function s(l, d, p, f = /* @__PURE__ */ new Map(), v = void 0) {
      const h = v?.(l, d, p, f);
      if (h !== void 0)
        return h;
      if (o.isPrimitive(l))
        return l;
      if (f.has(l))
        return f.get(l);
      if (Array.isArray(l)) {
        const g = new Array(l.length);
        f.set(l, g);
        for (let y = 0; y < l.length; y++)
          g[y] = s(l[y], y, p, f, v);
        return Object.hasOwn(l, "index") && (g.index = l.index), Object.hasOwn(l, "input") && (g.input = l.input), g;
      }
      if (l instanceof Date)
        return new Date(l.getTime());
      if (l instanceof RegExp) {
        const g = new RegExp(l.source, l.flags);
        return g.lastIndex = l.lastIndex, g;
      }
      if (l instanceof Map) {
        const g = /* @__PURE__ */ new Map();
        f.set(l, g);
        for (const [y, w] of l)
          g.set(y, s(w, y, p, f, v));
        return g;
      }
      if (l instanceof Set) {
        const g = /* @__PURE__ */ new Set();
        f.set(l, g);
        for (const y of l)
          g.add(s(y, void 0, p, f, v));
        return g;
      }
      if (typeof Buffer < "u" && Buffer.isBuffer(l))
        return l.subarray();
      if (a.isTypedArray(l)) {
        const g = new (Object.getPrototypeOf(l)).constructor(l.length);
        f.set(l, g);
        for (let y = 0; y < l.length; y++)
          g[y] = s(l[y], y, p, f, v);
        return g;
      }
      if (l instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && l instanceof SharedArrayBuffer)
        return l.slice(0);
      if (l instanceof DataView) {
        const g = new DataView(l.buffer.slice(0), l.byteOffset, l.byteLength);
        return f.set(l, g), c(g, l, p, f, v), g;
      }
      if (typeof File < "u" && l instanceof File) {
        const g = new File([l], l.name, {
          type: l.type
        });
        return f.set(l, g), c(g, l, p, f, v), g;
      }
      if (typeof Blob < "u" && l instanceof Blob) {
        const g = new Blob([l], { type: l.type });
        return f.set(l, g), c(g, l, p, f, v), g;
      }
      if (l instanceof Error) {
        const g = new l.constructor();
        return f.set(l, g), g.message = l.message, g.name = l.name, g.stack = l.stack, g.cause = l.cause, c(g, l, p, f, v), g;
      }
      if (l instanceof Boolean) {
        const g = new Boolean(l.valueOf());
        return f.set(l, g), c(g, l, p, f, v), g;
      }
      if (l instanceof Number) {
        const g = new Number(l.valueOf());
        return f.set(l, g), c(g, l, p, f, v), g;
      }
      if (l instanceof String) {
        const g = new String(l.valueOf());
        return f.set(l, g), c(g, l, p, f, v), g;
      }
      if (typeof l == "object" && u(l)) {
        const g = Object.create(Object.getPrototypeOf(l));
        return f.set(l, g), c(g, l, p, f, v), g;
      }
      return l;
    }
    function c(l, d, p = l, f, v) {
      const h = [...Object.keys(d), ...t.getSymbols(d)];
      for (let g = 0; g < h.length; g++) {
        const y = h[g], w = Object.getOwnPropertyDescriptor(l, y);
        (w == null || w.writable) && (l[y] = s(d[y], y, p, f, v));
      }
    }
    function u(l) {
      switch (r.getTag(l)) {
        case n.argumentsTag:
        case n.arrayTag:
        case n.arrayBufferTag:
        case n.dataViewTag:
        case n.booleanTag:
        case n.dateTag:
        case n.float32ArrayTag:
        case n.float64ArrayTag:
        case n.int8ArrayTag:
        case n.int16ArrayTag:
        case n.int32ArrayTag:
        case n.mapTag:
        case n.numberTag:
        case n.objectTag:
        case n.regexpTag:
        case n.setTag:
        case n.stringTag:
        case n.symbolTag:
        case n.uint8ArrayTag:
        case n.uint8ClampedArrayTag:
        case n.uint16ArrayTag:
        case n.uint32ArrayTag:
          return !0;
        default:
          return !1;
      }
    }
    e.cloneDeepWith = i, e.cloneDeepWithImpl = s, e.copyProperties = c;
  })(mu)), mu;
}
var sg;
function xB() {
  return sg || (sg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ RP();
    function r(n) {
      return t.cloneDeepWithImpl(n, void 0, n, /* @__PURE__ */ new Map(), void 0);
    }
    e.cloneDeep = r;
  })(hu)), hu;
}
var cg;
function EB() {
  return cg || (cg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ _P(), r = /* @__PURE__ */ xB();
    function n(o) {
      return o = r.cloneDeep(o), (a) => t.isMatch(a, o);
    }
    e.matches = n;
  })(cu)), cu;
}
var wu = {}, xu = {}, Eu = {}, lg;
function SB() {
  return lg || (lg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ RP(), r = /* @__PURE__ */ NP();
    function n(o, a) {
      return t.cloneDeepWith(o, (i, s, c, u) => {
        const l = a?.(i, s, c, u);
        if (l !== void 0)
          return l;
        if (typeof o == "object")
          switch (Object.prototype.toString.call(o)) {
            case r.numberTag:
            case r.stringTag:
            case r.booleanTag: {
              const d = new o.constructor(o?.valueOf());
              return t.copyProperties(d, o), d;
            }
            case r.argumentsTag: {
              const d = {};
              return t.copyProperties(d, o), d.length = o.length, d[Symbol.iterator] = o[Symbol.iterator], d;
            }
            default:
              return;
          }
      });
    }
    e.cloneDeepWith = n;
  })(Eu)), Eu;
}
var ug;
function OB() {
  return ug || (ug = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ SB();
    function r(n) {
      return t.cloneDeepWith(n);
    }
    e.cloneDeep = r;
  })(xu)), xu;
}
var Su = {}, Ou = {}, dg;
function MP() {
  return dg || (dg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /^(?:0|[1-9]\d*)$/;
    function r(n, o = Number.MAX_SAFE_INTEGER) {
      switch (typeof n) {
        case "number":
          return Number.isInteger(n) && n >= 0 && n < o;
        case "symbol":
          return !1;
        case "string":
          return t.test(n);
      }
    }
    e.isIndex = r;
  })(Ou)), Ou;
}
var Pu = {}, fg;
function PB() {
  return fg || (fg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ kP();
    function r(n) {
      return n !== null && typeof n == "object" && t.getTag(n) === "[object Arguments]";
    }
    e.isArguments = r;
  })(Pu)), Pu;
}
var pg;
function AB() {
  return pg || (pg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ xP(), r = /* @__PURE__ */ MP(), n = /* @__PURE__ */ PB(), o = /* @__PURE__ */ Lp();
    function a(i, s) {
      let c;
      if (Array.isArray(s) ? c = s : typeof s == "string" && t.isDeepKey(s) && i?.[s] == null ? c = o.toPath(s) : c = [s], c.length === 0)
        return !1;
      let u = i;
      for (let l = 0; l < c.length; l++) {
        const d = c[l];
        if ((u == null || !Object.hasOwn(u, d)) && !((Array.isArray(u) || n.isArguments(u)) && r.isIndex(d) && d < u.length))
          return !1;
        u = u[d];
      }
      return !0;
    }
    e.has = a;
  })(Su)), Su;
}
var hg;
function CB() {
  return hg || (hg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ _P(), r = /* @__PURE__ */ jp(), n = /* @__PURE__ */ OB(), o = /* @__PURE__ */ $p(), a = /* @__PURE__ */ AB();
    function i(s, c) {
      switch (typeof s) {
        case "object": {
          Object.is(s?.valueOf(), -0) && (s = "-0");
          break;
        }
        case "number": {
          s = r.toKey(s);
          break;
        }
      }
      return c = n.cloneDeep(c), function(u) {
        const l = o.get(u, s);
        return l === void 0 ? a.has(u, s) : c === void 0 ? l === void 0 : t.isMatch(l, c);
      };
    }
    e.matchesProperty = i;
  })(wu)), wu;
}
var mg;
function TB() {
  return mg || (mg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ PP(), r = /* @__PURE__ */ gB(), n = /* @__PURE__ */ EB(), o = /* @__PURE__ */ CB();
    function a(i) {
      if (i == null)
        return t.identity;
      switch (typeof i) {
        case "function":
          return i;
        case "object":
          return Array.isArray(i) && i.length === 2 ? o.matchesProperty(i[0], i[1]) : n.matches(i);
        case "string":
        case "symbol":
        case "number":
          return r.property(i);
      }
    }
    e.iteratee = a;
  })(iu)), iu;
}
var vg;
function _B() {
  return vg || (vg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ pB(), r = /* @__PURE__ */ PP(), n = /* @__PURE__ */ vB(), o = /* @__PURE__ */ TB();
    function a(i, s = r.identity) {
      return n.isArrayLikeObject(i) ? t.uniqBy(Array.from(i), o.iteratee(s)) : [];
    }
    e.uniqBy = a;
  })(Ql)), Ql;
}
var Au, gg;
function kB() {
  return gg || (gg = 1, Au = _B().uniqBy), Au;
}
var NB = /* @__PURE__ */ kB();
const yg = /* @__PURE__ */ sn(NB);
function IP(e, t, r) {
  return t === !0 ? yg(e, r) : typeof t == "function" ? yg(e, t) : e;
}
var vi = { exports: {} }, Cu = {}, gi = { exports: {} }, Tu = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bg;
function RB() {
  if (bg) return Tu;
  bg = 1;
  var e = At;
  function t(d, p) {
    return d === p && (d !== 0 || 1 / d === 1 / p) || d !== d && p !== p;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, a = e.useLayoutEffect, i = e.useDebugValue;
  function s(d, p) {
    var f = p(), v = n({ inst: { value: f, getSnapshot: p } }), h = v[0].inst, g = v[1];
    return a(
      function() {
        h.value = f, h.getSnapshot = p, c(h) && g({ inst: h });
      },
      [d, f, p]
    ), o(
      function() {
        return c(h) && g({ inst: h }), d(function() {
          c(h) && g({ inst: h });
        });
      },
      [d]
    ), i(f), f;
  }
  function c(d) {
    var p = d.getSnapshot;
    d = d.value;
    try {
      var f = p();
      return !r(d, f);
    } catch {
      return !0;
    }
  }
  function u(d, p) {
    return p();
  }
  var l = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : s;
  return Tu.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : l, Tu;
}
var _u = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wg;
function MB() {
  return wg || (wg = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(f, v) {
      return f === v && (f !== 0 || 1 / f === 1 / v) || f !== f && v !== v;
    }
    function t(f, v) {
      l || o.startTransition === void 0 || (l = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var h = v();
      if (!d) {
        var g = v();
        a(h, g) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), d = !0);
      }
      g = i({
        inst: { value: h, getSnapshot: v }
      });
      var y = g[0].inst, w = g[1];
      return c(
        function() {
          y.value = h, y.getSnapshot = v, r(y) && w({ inst: y });
        },
        [f, h, v]
      ), s(
        function() {
          return r(y) && w({ inst: y }), f(function() {
            r(y) && w({ inst: y });
          });
        },
        [f]
      ), u(h), h;
    }
    function r(f) {
      var v = f.getSnapshot;
      f = f.value;
      try {
        var h = v();
        return !a(f, h);
      } catch {
        return !0;
      }
    }
    function n(f, v) {
      return v();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var o = At, a = typeof Object.is == "function" ? Object.is : e, i = o.useState, s = o.useEffect, c = o.useLayoutEffect, u = o.useDebugValue, l = !1, d = !1, p = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? n : t;
    _u.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), _u;
}
var xg;
function DP() {
  return xg || (xg = 1, process.env.NODE_ENV === "production" ? gi.exports = RB() : gi.exports = MB()), gi.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eg;
function IB() {
  if (Eg) return Cu;
  Eg = 1;
  var e = At, t = DP();
  function r(u, l) {
    return u === l && (u !== 0 || 1 / u === 1 / l) || u !== u && l !== l;
  }
  var n = typeof Object.is == "function" ? Object.is : r, o = t.useSyncExternalStore, a = e.useRef, i = e.useEffect, s = e.useMemo, c = e.useDebugValue;
  return Cu.useSyncExternalStoreWithSelector = function(u, l, d, p, f) {
    var v = a(null);
    if (v.current === null) {
      var h = { hasValue: !1, value: null };
      v.current = h;
    } else h = v.current;
    v = s(
      function() {
        function y(O) {
          if (!w) {
            if (w = !0, x = O, O = p(O), f !== void 0 && h.hasValue) {
              var P = h.value;
              if (f(P, O))
                return S = P;
            }
            return S = O;
          }
          if (P = S, n(x, O)) return P;
          var A = p(O);
          return f !== void 0 && f(P, A) ? (x = O, P) : (x = O, S = A);
        }
        var w = !1, x, S, E = d === void 0 ? null : d;
        return [
          function() {
            return y(l());
          },
          E === null ? void 0 : function() {
            return y(E());
          }
        ];
      },
      [l, d, p, f]
    );
    var g = o(u, v[0], v[1]);
    return i(
      function() {
        h.hasValue = !0, h.value = g;
      },
      [g]
    ), c(g), g;
  }, Cu;
}
var ku = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sg;
function DB() {
  return Sg || (Sg = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(u, l) {
      return u === l && (u !== 0 || 1 / u === 1 / l) || u !== u && l !== l;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = At, r = DP(), n = typeof Object.is == "function" ? Object.is : e, o = r.useSyncExternalStore, a = t.useRef, i = t.useEffect, s = t.useMemo, c = t.useDebugValue;
    ku.useSyncExternalStoreWithSelector = function(u, l, d, p, f) {
      var v = a(null);
      if (v.current === null) {
        var h = { hasValue: !1, value: null };
        v.current = h;
      } else h = v.current;
      v = s(
        function() {
          function y(O) {
            if (!w) {
              if (w = !0, x = O, O = p(O), f !== void 0 && h.hasValue) {
                var P = h.value;
                if (f(P, O))
                  return S = P;
              }
              return S = O;
            }
            if (P = S, n(x, O))
              return P;
            var A = p(O);
            return f !== void 0 && f(P, A) ? (x = O, P) : (x = O, S = A);
          }
          var w = !1, x, S, E = d === void 0 ? null : d;
          return [
            function() {
              return y(l());
            },
            E === null ? void 0 : function() {
              return y(E());
            }
          ];
        },
        [l, d, p, f]
      );
      var g = o(u, v[0], v[1]);
      return i(
        function() {
          h.hasValue = !0, h.value = g;
        },
        [g]
      ), c(g), g;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), ku;
}
var Og;
function jB() {
  return Og || (Og = 1, process.env.NODE_ENV === "production" ? vi.exports = IB() : vi.exports = DB()), vi.exports;
}
var LB = jB(), Kp = /* @__PURE__ */ Dt(null), $B = (e) => e, Re = () => {
  var e = er(Kp);
  return e ? e.store.dispatch : $B;
}, Vi = () => {
}, BB = () => Vi, FB = (e, t) => e === t;
function ee(e) {
  var t = er(Kp);
  return LB.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : BB, t ? t.store.getState : Vi, t ? t.store.getState : Vi, t ? e : Vi, FB);
}
var zB = (e, t, r) => {
  if (t.length === 1 && t[0] === r) {
    let n = !1;
    try {
      const o = {};
      e(o) === o && (n = !0);
    } catch {
    }
    if (n) {
      let o;
      try {
        throw new Error();
      } catch (a) {
        ({ stack: o } = a);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: o }
      );
    }
  }
}, UB = (e, t, r) => {
  const { memoize: n, memoizeOptions: o } = t, { inputSelectorResults: a, inputSelectorResultsCopy: i } = e, s = n(() => ({}), ...o);
  if (!(s.apply(null, a) === s.apply(null, i))) {
    let u;
    try {
      throw new Error();
    } catch (l) {
      ({ stack: u } = l);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: r,
        firstInputs: a,
        secondInputs: i,
        stack: u
      }
    );
  }
}, WB = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function KB(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function VB(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function qB(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var Pg = (e) => Array.isArray(e) ? e : [e];
function HB(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return qB(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function Ag(e, t) {
  const r = [], { length: n } = e;
  for (let o = 0; o < n; o++)
    r.push(e[o].apply(null, t));
  return r;
}
var GB = (e, t) => {
  const { identityFunctionCheck: r, inputStabilityCheck: n } = {
    ...WB,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: r === "always" || r === "once" && e,
      run: zB
    },
    inputStabilityCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: UB
    }
  };
}, YB = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, XB = typeof WeakRef < "u" ? WeakRef : YB, ZB = 0, Cg = 1;
function yi() {
  return {
    s: ZB,
    v: void 0,
    o: null,
    p: null
  };
}
function jP(e, t = {}) {
  let r = yi();
  const { resultEqualityCheck: n } = t;
  let o, a = 0;
  function i() {
    let s = r;
    const { length: c } = arguments;
    for (let d = 0, p = c; d < p; d++) {
      const f = arguments[d];
      if (typeof f == "function" || typeof f == "object" && f !== null) {
        let v = s.o;
        v === null && (s.o = v = /* @__PURE__ */ new WeakMap());
        const h = v.get(f);
        h === void 0 ? (s = yi(), v.set(f, s)) : s = h;
      } else {
        let v = s.p;
        v === null && (s.p = v = /* @__PURE__ */ new Map());
        const h = v.get(f);
        h === void 0 ? (s = yi(), v.set(f, s)) : s = h;
      }
    }
    const u = s;
    let l;
    if (s.s === Cg)
      l = s.v;
    else if (l = e.apply(null, arguments), a++, n) {
      const d = o?.deref?.() ?? o;
      d != null && n(d, l) && (l = d, a !== 0 && a--), o = typeof l == "object" && l !== null || typeof l == "function" ? new XB(l) : l;
    }
    return u.s = Cg, u.v = l, l;
  }
  return i.clearCache = () => {
    r = yi(), i.resetResultsCount();
  }, i.resultsCount = () => a, i.resetResultsCount = () => {
    a = 0;
  }, i;
}
function JB(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...o) => {
    let a = 0, i = 0, s, c = {}, u = o.pop();
    typeof u == "object" && (c = u, u = o.pop()), KB(
      u,
      `createSelector expects an output function after the inputs, but received: [${typeof u}]`
    );
    const l = {
      ...r,
      ...c
    }, {
      memoize: d,
      memoizeOptions: p = [],
      argsMemoize: f = jP,
      argsMemoizeOptions: v = [],
      devModeChecks: h = {}
    } = l, g = Pg(p), y = Pg(v), w = HB(o), x = d(function() {
      return a++, u.apply(
        null,
        arguments
      );
    }, ...g);
    let S = !0;
    const E = f(function() {
      i++;
      const P = Ag(
        w,
        arguments
      );
      if (s = x.apply(null, P), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: A, inputStabilityCheck: _ } = GB(S, h);
        if (A.shouldRun && A.run(
          u,
          P,
          s
        ), _.shouldRun) {
          const N = Ag(
            w,
            arguments
          );
          _.run(
            { inputSelectorResults: P, inputSelectorResultsCopy: N },
            { memoize: d, memoizeOptions: g },
            arguments
          );
        }
        S && (S = !1);
      }
      return s;
    }, ...y);
    return Object.assign(E, {
      resultFunc: u,
      memoizedResultFunc: x,
      dependencies: w,
      dependencyRecomputations: () => i,
      resetDependencyRecomputations: () => {
        i = 0;
      },
      lastResult: () => s,
      recomputations: () => a,
      resetRecomputations: () => {
        a = 0;
      },
      memoize: d,
      argsMemoize: f
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var k = /* @__PURE__ */ JB(jP), QB = Object.assign(
  (e, t = k) => {
    VB(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const r = Object.keys(e), n = r.map(
      (a) => e[a]
    );
    return t(
      n,
      (...a) => a.reduce((i, s, c) => (i[r[c]] = s, i), {})
    );
  },
  { withTypes: () => QB }
), Nu = {}, Ru = {}, Mu = {}, Tg;
function eF() {
  return Tg || (Tg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(n) {
      return typeof n == "symbol" ? 1 : n === null ? 2 : n === void 0 ? 3 : n !== n ? 4 : 0;
    }
    const r = (n, o, a) => {
      if (n !== o) {
        const i = t(n), s = t(o);
        if (i === s && i === 0) {
          if (n < o)
            return a === "desc" ? 1 : -1;
          if (n > o)
            return a === "desc" ? -1 : 1;
        }
        return a === "desc" ? s - i : i - s;
      }
      return 0;
    };
    e.compareValues = r;
  })(Mu)), Mu;
}
var Iu = {}, Du = {}, _g;
function LP() {
  return _g || (_g = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return typeof r == "symbol" || r instanceof Symbol;
    }
    e.isSymbol = t;
  })(Du)), Du;
}
var kg;
function tF() {
  return kg || (kg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ LP(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
    function o(a, i) {
      return Array.isArray(a) ? !1 : typeof a == "number" || typeof a == "boolean" || a == null || t.isSymbol(a) ? !0 : typeof a == "string" && (n.test(a) || !r.test(a)) || i != null && Object.hasOwn(i, a);
    }
    e.isKey = o;
  })(Iu)), Iu;
}
var Ng;
function rF() {
  return Ng || (Ng = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ eF(), r = /* @__PURE__ */ tF(), n = /* @__PURE__ */ Lp();
    function o(a, i, s, c) {
      if (a == null)
        return [];
      s = c ? void 0 : s, Array.isArray(a) || (a = Object.values(a)), Array.isArray(i) || (i = i == null ? [null] : [i]), i.length === 0 && (i = [null]), Array.isArray(s) || (s = s == null ? [] : [s]), s = s.map((f) => String(f));
      const u = (f, v) => {
        let h = f;
        for (let g = 0; g < v.length && h != null; ++g)
          h = h[v[g]];
        return h;
      }, l = (f, v) => v == null || f == null ? v : typeof f == "object" && "key" in f ? Object.hasOwn(v, f.key) ? v[f.key] : u(v, f.path) : typeof f == "function" ? f(v) : Array.isArray(f) ? u(v, f) : typeof v == "object" ? v[f] : v, d = i.map((f) => (Array.isArray(f) && f.length === 1 && (f = f[0]), f == null || typeof f == "function" || Array.isArray(f) || r.isKey(f) ? f : { key: f, path: n.toPath(f) }));
      return a.map((f) => ({
        original: f,
        criteria: d.map((v) => l(v, f))
      })).slice().sort((f, v) => {
        for (let h = 0; h < d.length; h++) {
          const g = t.compareValues(f.criteria[h], v.criteria[h], s[h]);
          if (g !== 0)
            return g;
        }
        return 0;
      }).map((f) => f.original);
    }
    e.orderBy = o;
  })(Ru)), Ru;
}
var ju = {}, Rg;
function nF() {
  return Rg || (Rg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r, n = 1) {
      const o = [], a = Math.floor(n), i = (s, c) => {
        for (let u = 0; u < s.length; u++) {
          const l = s[u];
          Array.isArray(l) && c < a ? i(l, c + 1) : o.push(l);
        }
      };
      return i(r, 0), o;
    }
    e.flatten = t;
  })(ju)), ju;
}
var Lu = {}, Mg;
function $P() {
  return Mg || (Mg = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ MP(), r = /* @__PURE__ */ Wp(), n = /* @__PURE__ */ AP(), o = /* @__PURE__ */ TP();
    function a(i, s, c) {
      return n.isObject(c) && (typeof s == "number" && r.isArrayLike(c) && t.isIndex(s) && s < c.length || typeof s == "string" && s in c) ? o.eq(c[s], i) : !1;
    }
    e.isIterateeCall = a;
  })(Lu)), Lu;
}
var Ig;
function oF() {
  return Ig || (Ig = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ rF(), r = /* @__PURE__ */ nF(), n = /* @__PURE__ */ $P();
    function o(a, ...i) {
      const s = i.length;
      return s > 1 && n.isIterateeCall(a, i[0], i[1]) ? i = [] : s > 2 && n.isIterateeCall(i[0], i[1], i[2]) && (i = [i[0]]), t.orderBy(a, r.flatten(i), ["asc"]);
    }
    e.sortBy = o;
  })(Nu)), Nu;
}
var $u, Dg;
function aF() {
  return Dg || (Dg = 1, $u = oF().sortBy), $u;
}
var iF = /* @__PURE__ */ aF();
const Mc = /* @__PURE__ */ sn(iF);
var BP = (e) => e.legend.settings, sF = (e) => e.legend.size, cF = (e) => e.legend.payload, lF = k([cF, BP], (e, t) => {
  var {
    itemSorter: r
  } = t, n = e.flat(1);
  return r ? Mc(n, r) : n;
});
function uF() {
  return ee(lF);
}
var bi = 1;
function FP() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], [t, r] = je({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), n = he(
    (o) => {
      if (o != null) {
        var a = o.getBoundingClientRect(), i = {
          height: a.height,
          left: a.left,
          top: a.top,
          width: a.width
        };
        (Math.abs(i.height - t.height) > bi || Math.abs(i.left - t.left) > bi || Math.abs(i.top - t.top) > bi || Math.abs(i.width - t.width) > bi) && r({
          height: i.height,
          left: i.left,
          top: i.top,
          width: i.width
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t.width, t.height, t.top, t.left, ...e]
  );
  return [t, n];
}
function tt(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var dF = typeof Symbol == "function" && Symbol.observable || "@@observable", jg = dF, Bu = () => Math.random().toString(36).substring(7).split("").join("."), fF = {
  INIT: `@@redux/INIT${/* @__PURE__ */ Bu()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ Bu()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Bu()}`
}, En = fF;
function $a(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function pF(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  const t = typeof e;
  switch (t) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return t;
  }
  if (Array.isArray(e))
    return "array";
  if (vF(e))
    return "date";
  if (mF(e))
    return "error";
  const r = hF(e);
  switch (r) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return r;
  }
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function hF(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function mF(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function vF(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function Kr(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = pF(e)), t;
}
function zP(e, t, r) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? tt(2) : `Expected the root reducer to be a function. Instead, received: '${Kr(e)}'`);
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? tt(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? tt(1) : `Expected the enhancer to be a function. Instead, received: '${Kr(r)}'`);
    return r(zP)(e, t);
  }
  let n = e, o = t, a = /* @__PURE__ */ new Map(), i = a, s = 0, c = !1;
  function u() {
    i === a && (i = /* @__PURE__ */ new Map(), a.forEach((g, y) => {
      i.set(y, g);
    }));
  }
  function l() {
    if (c)
      throw new Error(process.env.NODE_ENV === "production" ? tt(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function d(g) {
    if (typeof g != "function")
      throw new Error(process.env.NODE_ENV === "production" ? tt(4) : `Expected the listener to be a function. Instead, received: '${Kr(g)}'`);
    if (c)
      throw new Error(process.env.NODE_ENV === "production" ? tt(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let y = !0;
    u();
    const w = s++;
    return i.set(w, g), function() {
      if (y) {
        if (c)
          throw new Error(process.env.NODE_ENV === "production" ? tt(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        y = !1, u(), i.delete(w), a = null;
      }
    };
  }
  function p(g) {
    if (!$a(g))
      throw new Error(process.env.NODE_ENV === "production" ? tt(7) : `Actions must be plain objects. Instead, the actual type was: '${Kr(g)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof g.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? tt(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof g.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? tt(17) : `Action "type" property must be a string. Instead, the actual type was: '${Kr(g.type)}'. Value was: '${g.type}' (stringified)`);
    if (c)
      throw new Error(process.env.NODE_ENV === "production" ? tt(9) : "Reducers may not dispatch actions.");
    try {
      c = !0, o = n(o, g);
    } finally {
      c = !1;
    }
    return (a = i).forEach((w) => {
      w();
    }), g;
  }
  function f(g) {
    if (typeof g != "function")
      throw new Error(process.env.NODE_ENV === "production" ? tt(10) : `Expected the nextReducer to be a function. Instead, received: '${Kr(g)}`);
    n = g, p({
      type: En.REPLACE
    });
  }
  function v() {
    const g = d;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(y) {
        if (typeof y != "object" || y === null)
          throw new Error(process.env.NODE_ENV === "production" ? tt(11) : `Expected the observer to be an object. Instead, received: '${Kr(y)}'`);
        function w() {
          const S = y;
          S.next && S.next(l());
        }
        return w(), {
          unsubscribe: g(w)
        };
      },
      [jg]() {
        return this;
      }
    };
  }
  return p({
    type: En.INIT
  }), {
    dispatch: p,
    subscribe: d,
    getState: l,
    replaceReducer: f,
    [jg]: v
  };
}
function Lg(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function gF(e, t, r, n) {
  const o = Object.keys(t), a = r && r.type === En.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (o.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!$a(e))
    return `The ${a} has unexpected type of "${Kr(e)}". Expected argument to be an object with the following keys: "${o.join('", "')}"`;
  const i = Object.keys(e).filter((s) => !t.hasOwnProperty(s) && !n[s]);
  if (i.forEach((s) => {
    n[s] = !0;
  }), !(r && r.type === En.REPLACE) && i.length > 0)
    return `Unexpected ${i.length > 1 ? "keys" : "key"} "${i.join('", "')}" found in ${a}. Expected to find one of the known reducer keys instead: "${o.join('", "')}". Unexpected keys will be ignored.`;
}
function yF(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: En.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? tt(12) : `The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof r(void 0, {
      type: En.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? tt(13) : `The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${En.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function UP(e) {
  const t = Object.keys(e), r = {};
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    process.env.NODE_ENV !== "production" && typeof e[s] > "u" && Lg(`No reducer provided for key "${s}"`), typeof e[s] == "function" && (r[s] = e[s]);
  }
  const n = Object.keys(r);
  let o;
  process.env.NODE_ENV !== "production" && (o = {});
  let a;
  try {
    yF(r);
  } catch (i) {
    a = i;
  }
  return function(s = {}, c) {
    if (a)
      throw a;
    if (process.env.NODE_ENV !== "production") {
      const d = gF(s, r, c, o);
      d && Lg(d);
    }
    let u = !1;
    const l = {};
    for (let d = 0; d < n.length; d++) {
      const p = n[d], f = r[p], v = s[p], h = f(v, c);
      if (typeof h > "u") {
        const g = c && c.type;
        throw new Error(process.env.NODE_ENV === "production" ? tt(14) : `When called with an action of type ${g ? `"${String(g)}"` : "(unknown type)"}, the slice reducer for key "${p}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      l[p] = h, u = u || h !== v;
    }
    return u = u || n.length !== Object.keys(s).length, u ? l : s;
  };
}
function ls(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function bF(...e) {
  return (t) => (r, n) => {
    const o = t(r, n);
    let a = () => {
      throw new Error(process.env.NODE_ENV === "production" ? tt(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const i = {
      getState: o.getState,
      dispatch: (c, ...u) => a(c, ...u)
    }, s = e.map((c) => c(i));
    return a = ls(...s)(o.dispatch), {
      ...o,
      dispatch: a
    };
  };
}
function Vp(e) {
  return $a(e) && "type" in e && typeof e.type == "string";
}
var WP = Symbol.for("immer-nothing"), $g = Symbol.for("immer-draftable"), It = Symbol.for("immer-state"), wF = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function gt(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = wF[e], n = typeof r == "function" ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var ua = Object.getPrototypeOf;
function Dn(e) {
  return !!e && !!e[It];
}
function Nr(e) {
  return e ? KP(e) || Array.isArray(e) || !!e[$g] || !!e.constructor?.[$g] || Ba(e) || Dc(e) : !1;
}
var xF = Object.prototype.constructor.toString(), Bg = /* @__PURE__ */ new WeakMap();
function KP(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  if (t === null || t === Object.prototype)
    return !0;
  const r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  if (r === Object)
    return !0;
  if (typeof r != "function")
    return !1;
  let n = Bg.get(r);
  return n === void 0 && (n = Function.toString.call(r), Bg.set(r, n)), n === xF;
}
function us(e, t, r = !0) {
  Ic(e) === 0 ? (r ? Reflect.ownKeys(e) : Object.keys(e)).forEach((o) => {
    t(o, e[o], e);
  }) : e.forEach((n, o) => t(o, n, e));
}
function Ic(e) {
  const t = e[It];
  return t ? t.type_ : Array.isArray(e) ? 1 : Ba(e) ? 2 : Dc(e) ? 3 : 0;
}
function Qd(e, t) {
  return Ic(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function VP(e, t, r) {
  const n = Ic(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function EF(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Ba(e) {
  return e instanceof Map;
}
function Dc(e) {
  return e instanceof Set;
}
function mn(e) {
  return e.copy_ || e.base_;
}
function ef(e, t) {
  if (Ba(e))
    return new Map(e);
  if (Dc(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = KP(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[It];
    let o = Reflect.ownKeys(n);
    for (let a = 0; a < o.length; a++) {
      const i = o[a], s = n[i];
      s.writable === !1 && (s.writable = !0, s.configurable = !0), (s.get || s.set) && (n[i] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: s.enumerable,
        value: e[i]
      });
    }
    return Object.create(ua(e), n);
  } else {
    const n = ua(e);
    if (n !== null && r)
      return { ...e };
    const o = Object.create(n);
    return Object.assign(o, e);
  }
}
function qp(e, t = !1) {
  return jc(e) || Dn(e) || !Nr(e) || (Ic(e) > 1 && Object.defineProperties(e, {
    set: wi,
    add: wi,
    clear: wi,
    delete: wi
  }), Object.freeze(e), t && Object.values(e).forEach((r) => qp(r, !0))), e;
}
function SF() {
  gt(2);
}
var wi = {
  value: SF
};
function jc(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var OF = {};
function jn(e) {
  const t = OF[e];
  return t || gt(0, e), t;
}
var da;
function qP() {
  return da;
}
function PF(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function Fg(e, t) {
  t && (jn("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function tf(e) {
  rf(e), e.drafts_.forEach(AF), e.drafts_ = null;
}
function rf(e) {
  e === da && (da = e.parent_);
}
function zg(e) {
  return da = PF(da, e);
}
function AF(e) {
  const t = e[It];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Ug(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[It].modified_ && (tf(t), gt(4)), Nr(e) && (e = ds(t, e), t.parent_ || fs(t, e)), t.patches_ && jn("Patches").generateReplacementPatches_(
    r[It].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = ds(t, r, []), tf(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== WP ? e : void 0;
}
function ds(e, t, r) {
  if (jc(t))
    return t;
  const n = e.immer_.shouldUseStrictIteration(), o = t[It];
  if (!o)
    return us(
      t,
      (a, i) => Wg(e, o, t, a, i, r),
      n
    ), t;
  if (o.scope_ !== e)
    return t;
  if (!o.modified_)
    return fs(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    o.finalized_ = !0, o.scope_.unfinalizedDrafts_--;
    const a = o.copy_;
    let i = a, s = !1;
    o.type_ === 3 && (i = new Set(a), a.clear(), s = !0), us(
      i,
      (c, u) => Wg(
        e,
        o,
        a,
        c,
        u,
        r,
        s
      ),
      n
    ), fs(e, a, !1), r && e.patches_ && jn("Patches").generatePatches_(
      o,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return o.copy_;
}
function Wg(e, t, r, n, o, a, i) {
  if (o == null || typeof o != "object" && !i)
    return;
  const s = jc(o);
  if (!(s && !i)) {
    if (process.env.NODE_ENV !== "production" && o === r && gt(5), Dn(o)) {
      const c = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
      !Qd(t.assigned_, n) ? a.concat(n) : void 0, u = ds(e, o, c);
      if (VP(r, n, u), Dn(u))
        e.canAutoFreeze_ = !1;
      else
        return;
    } else i && r.add(o);
    if (Nr(o) && !s) {
      if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === o && s)
        return;
      ds(e, o), (!t || !t.scope_.parent_) && typeof n != "symbol" && (Ba(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && fs(e, o);
    }
  }
}
function fs(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && qp(t, r);
}
function CF(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : qP(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let o = n, a = Hp;
  r && (o = [n], a = fa);
  const { revoke: i, proxy: s } = Proxy.revocable(o, a);
  return n.draft_ = s, n.revoke_ = i, s;
}
var Hp = {
  get(e, t) {
    if (t === It)
      return e;
    const r = mn(e);
    if (!Qd(r, t))
      return TF(e, r, t);
    const n = r[t];
    return e.finalized_ || !Nr(n) ? n : n === Fu(e.base_, t) ? (zu(e), e.copy_[t] = of(n, e)) : n;
  },
  has(e, t) {
    return t in mn(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(mn(e));
  },
  set(e, t, r) {
    const n = HP(mn(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const o = Fu(mn(e), t), a = o?.[It];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (EF(r, o) && (r !== void 0 || Qd(e.base_, t)))
        return !0;
      zu(e), nf(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Fu(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, zu(e), nf(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = mn(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    gt(11);
  },
  getPrototypeOf(e) {
    return ua(e.base_);
  },
  setPrototypeOf() {
    gt(12);
  }
}, fa = {};
us(Hp, (e, t) => {
  fa[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
fa.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && gt(13), fa.set.call(this, e, t, void 0);
};
fa.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && gt(14), Hp.set.call(this, e[0], t, r, e[0]);
};
function Fu(e, t) {
  const r = e[It];
  return (r ? mn(r) : e)[t];
}
function TF(e, t, r) {
  const n = HP(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function HP(e, t) {
  if (!(t in e))
    return;
  let r = ua(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = ua(r);
  }
}
function nf(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && nf(e.parent_));
}
function zu(e) {
  e.copy_ || (e.copy_ = ef(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var _F = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !0, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const a = r;
        r = t;
        const i = this;
        return function(c = a, ...u) {
          return i.produce(c, (l) => r.call(this, l, ...u));
        };
      }
      typeof r != "function" && gt(6), n !== void 0 && typeof n != "function" && gt(7);
      let o;
      if (Nr(t)) {
        const a = zg(this), i = of(t, void 0);
        let s = !0;
        try {
          o = r(i), s = !1;
        } finally {
          s ? tf(a) : rf(a);
        }
        return Fg(a, n), Ug(o, a);
      } else if (!t || typeof t != "object") {
        if (o = r(t), o === void 0 && (o = t), o === WP && (o = void 0), this.autoFreeze_ && qp(o, !0), n) {
          const a = [], i = [];
          jn("Patches").generateReplacementPatches_(t, o, a, i), n(a, i);
        }
        return o;
      } else
        gt(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function")
        return (i, ...s) => this.produceWithPatches(i, (c) => t(c, ...s));
      let n, o;
      return [this.produce(t, r, (i, s) => {
        n = i, o = s;
      }), n, o];
    }, typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof e?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy), typeof e?.useStrictIteration == "boolean" && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    Nr(e) || gt(8), Dn(e) && (e = Pr(e));
    const t = zg(this), r = of(e, void 0);
    return r[It].isManual_ = !0, rf(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[It];
    (!r || !r.isManual_) && gt(9);
    const { scope_: n } = r;
    return Fg(n, t), Ug(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const o = t[r];
      if (o.path.length === 0 && o.op === "replace") {
        e = o.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = jn("Patches").applyPatches_;
    return Dn(e) ? n(e, t) : this.produce(
      e,
      (o) => n(o, t)
    );
  }
};
function of(e, t) {
  const r = Ba(e) ? jn("MapSet").proxyMap_(e, t) : Dc(e) ? jn("MapSet").proxySet_(e, t) : CF(e, t);
  return (t ? t.scope_ : qP()).drafts_.push(r), r;
}
function Pr(e) {
  return Dn(e) || gt(10, e), GP(e);
}
function GP(e) {
  if (!Nr(e) || jc(e))
    return e;
  const t = e[It];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = ef(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = ef(e, !0);
  return us(
    r,
    (o, a) => {
      VP(r, o, GP(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var af = new _F(), YP = af.produce, kF = /* @__PURE__ */ af.setUseStrictIteration.bind(
  af
);
function XP(e) {
  return ({ dispatch: r, getState: n }) => (o) => (a) => typeof a == "function" ? a(r, n, e) : o(a);
}
var NF = XP(), RF = XP, MF = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? ls : ls.apply(null, arguments);
}, IF = (e) => e && typeof e.match == "function";
function Ht(e, t) {
  function r(...n) {
    if (t) {
      let o = t(...n);
      if (!o)
        throw new Error(process.env.NODE_ENV === "production" ? ge(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: o.payload,
        ..."meta" in o && {
          meta: o.meta
        },
        ..."error" in o && {
          error: o.error
        }
      };
    }
    return {
      type: e,
      payload: n[0]
    };
  }
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => Vp(n) && n.type === e, r;
}
function DF(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  IF(e);
}
function jF(e) {
  const t = e ? `${e}`.split("/") : [], r = t[t.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${r}())\` instead of \`dispatch(${r})\`. This is necessary even if the action has no payload.`;
}
function LF(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (r) => (n) => r(n);
  const {
    isActionCreator: t = DF
  } = e;
  return () => (r) => (n) => (t(n) && console.warn(jF(n.type)), r(n));
}
function ZP(e, t) {
  let r = 0;
  return {
    measureTime(n) {
      const o = Date.now();
      try {
        return n();
      } finally {
        const a = Date.now();
        r += a - o;
      }
    },
    warnIfExceeded() {
      r > e && console.warn(`${t} took ${r}ms, which is more than the warning threshold of ${e}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var JP = class Jo extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Jo.prototype);
  }
  static get [Symbol.species]() {
    return Jo;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Jo(...t[0].concat(this)) : new Jo(...t.concat(this));
  }
};
function Kg(e) {
  return Nr(e) ? YP(e, () => {
  }) : e;
}
function xi(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function $F(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function BF(e, t, r) {
  const n = QP(e, t, r);
  return {
    detectMutations() {
      return e1(e, t, n, r);
    }
  };
}
function QP(e, t = [], r, n = "", o = /* @__PURE__ */ new Set()) {
  const a = {
    value: r
  };
  if (!e(r) && !o.has(r)) {
    o.add(r), a.children = {};
    for (const i in r) {
      const s = n ? n + "." + i : i;
      t.length && t.indexOf(s) !== -1 || (a.children[i] = QP(e, t, r[i], s));
    }
  }
  return a;
}
function e1(e, t = [], r, n, o = !1, a = "") {
  const i = r ? r.value : void 0, s = i === n;
  if (o && !s && !Number.isNaN(n))
    return {
      wasMutated: !0,
      path: a
    };
  if (e(i) || e(n))
    return {
      wasMutated: !1
    };
  const c = {};
  for (let l in r.children)
    c[l] = !0;
  for (let l in n)
    c[l] = !0;
  const u = t.length > 0;
  for (let l in c) {
    const d = a ? a + "." + l : l;
    if (u && t.some((v) => v instanceof RegExp ? v.test(d) : d === v))
      continue;
    const p = e1(e, t, r.children[l], n[l], s, d);
    if (p.wasMutated)
      return p;
  }
  return {
    wasMutated: !1
  };
}
function FF(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    let t = function(s, c, u, l) {
      return JSON.stringify(s, r(c, l), u);
    }, r = function(s, c) {
      let u = [], l = [];
      return c || (c = function(d, p) {
        return u[0] === p ? "[Circular ~]" : "[Circular ~." + l.slice(0, u.indexOf(p)).join(".") + "]";
      }), function(d, p) {
        if (u.length > 0) {
          var f = u.indexOf(this);
          ~f ? u.splice(f + 1) : u.push(this), ~f ? l.splice(f, 1 / 0, d) : l.push(d), ~u.indexOf(p) && (p = c.call(this, d, p));
        } else u.push(p);
        return s == null ? p : s.call(this, d, p);
      };
    }, {
      isImmutable: n = $F,
      ignoredPaths: o,
      warnAfter: a = 32
    } = e;
    const i = BF.bind(null, n, o);
    return ({
      getState: s
    }) => {
      let c = s(), u = i(c), l;
      return (d) => (p) => {
        const f = ZP(a, "ImmutableStateInvariantMiddleware");
        f.measureTime(() => {
          if (c = s(), l = u.detectMutations(), u = i(c), l.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? ge(19) : `A state mutation was detected between dispatches, in the path '${l.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const v = d(p);
        return f.measureTime(() => {
          if (c = s(), l = u.detectMutations(), u = i(c), l.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? ge(20) : `A state mutation was detected inside a dispatch, in the path: ${l.path || ""}. Take a look at the reducer(s) handling the action ${t(p)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), f.warnIfExceeded(), v;
      };
    };
  }
}
function t1(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || $a(e);
}
function sf(e, t = "", r = t1, n, o = [], a) {
  let i;
  if (!r(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || a?.has(e)) return !1;
  const s = n != null ? n(e) : Object.entries(e), c = o.length > 0;
  for (const [u, l] of s) {
    const d = t ? t + "." + u : u;
    if (!(c && o.some((f) => f instanceof RegExp ? f.test(d) : d === f))) {
      if (!r(l))
        return {
          keyPath: d,
          value: l
        };
      if (typeof l == "object" && (i = sf(l, d, r, n, o, a), i))
        return i;
    }
  }
  return a && r1(e) && a.add(e), !1;
}
function r1(e) {
  if (!Object.isFrozen(e)) return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !r1(t))
      return !1;
  return !0;
}
function zF(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    const {
      isSerializable: t = t1,
      getEntries: r,
      ignoredActions: n = [],
      ignoredActionPaths: o = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: a = [],
      warnAfter: i = 32,
      ignoreState: s = !1,
      ignoreActions: c = !1,
      disableCache: u = !1
    } = e, l = !u && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (d) => (p) => (f) => {
      if (!Vp(f))
        return p(f);
      const v = p(f), h = ZP(i, "SerializableStateInvariantMiddleware");
      return !c && !(n.length && n.indexOf(f.type) !== -1) && h.measureTime(() => {
        const g = sf(f, "", t, r, o, l);
        if (g) {
          const {
            keyPath: y,
            value: w
          } = g;
          console.error(`A non-serializable value was detected in an action, in the path: \`${y}\`. Value:`, w, `
Take a look at the logic that dispatched this action: `, f, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), s || (h.measureTime(() => {
        const g = d.getState(), y = sf(g, "", t, r, a, l);
        if (y) {
          const {
            keyPath: w,
            value: x
          } = y;
          console.error(`A non-serializable value was detected in the state, in the path: \`${w}\`. Value:`, x, `
Take a look at the reducer(s) handling this action type: ${f.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), h.warnIfExceeded()), v;
    };
  }
}
function Ei(e) {
  return typeof e == "boolean";
}
var UF = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: n = !0,
    serializableCheck: o = !0,
    actionCreatorCheck: a = !0
  } = t ?? {};
  let i = new JP();
  if (r && (Ei(r) ? i.push(NF) : i.push(RF(r.extraArgument))), process.env.NODE_ENV !== "production") {
    if (n) {
      let s = {};
      Ei(n) || (s = n), i.unshift(FF(s));
    }
    if (o) {
      let s = {};
      Ei(o) || (s = o), i.push(zF(s));
    }
    if (a) {
      let s = {};
      Ei(a) || (s = a), i.unshift(LF(s));
    }
  }
  return i;
}, n1 = "RTK_autoBatch", ut = () => (e) => ({
  payload: e,
  meta: {
    [n1]: !0
  }
}), Vg = (e) => (t) => {
  setTimeout(t, e);
}, o1 = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const n = t(...r);
  let o = !0, a = !1, i = !1;
  const s = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Vg(10)
  ) : e.type === "callback" ? e.queueNotification : Vg(e.timeout), u = () => {
    i = !1, a && (a = !1, s.forEach((l) => l()));
  };
  return Object.assign({}, n, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(l) {
      const d = () => o && l(), p = n.subscribe(d);
      return s.add(l), () => {
        p(), s.delete(l);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(l) {
      try {
        return o = !l?.meta?.[n1], a = !o, a && (i || (i = !0, c(u))), n.dispatch(l);
      } finally {
        o = !0;
      }
    }
  });
}, WF = (e) => function(r) {
  const {
    autoBatch: n = !0
  } = r ?? {};
  let o = new JP(e);
  return n && o.push(o1(typeof n == "object" ? n : void 0)), o;
};
function KF(e) {
  const t = UF(), {
    reducer: r = void 0,
    middleware: n,
    devTools: o = !0,
    duplicateMiddlewareCheck: a = !0,
    preloadedState: i = void 0,
    enhancers: s = void 0
  } = e || {};
  let c;
  if (typeof r == "function")
    c = r;
  else if ($a(r))
    c = UP(r);
  else
    throw new Error(process.env.NODE_ENV === "production" ? ge(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (process.env.NODE_ENV !== "production" && n && typeof n != "function")
    throw new Error(process.env.NODE_ENV === "production" ? ge(2) : "`middleware` field must be a callback");
  let u;
  if (typeof n == "function") {
    if (u = n(t), process.env.NODE_ENV !== "production" && !Array.isArray(u))
      throw new Error(process.env.NODE_ENV === "production" ? ge(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    u = t();
  if (process.env.NODE_ENV !== "production" && u.some((h) => typeof h != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? ge(4) : "each middleware provided to configureStore must be a function");
  if (process.env.NODE_ENV !== "production" && a) {
    let h = /* @__PURE__ */ new Set();
    u.forEach((g) => {
      if (h.has(g))
        throw new Error(process.env.NODE_ENV === "production" ? ge(42) : "Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");
      h.add(g);
    });
  }
  let l = ls;
  o && (l = MF({
    // Enable capture of stack traces for dispatched Redux actions
    trace: process.env.NODE_ENV !== "production",
    ...typeof o == "object" && o
  }));
  const d = bF(...u), p = WF(d);
  if (process.env.NODE_ENV !== "production" && s && typeof s != "function")
    throw new Error(process.env.NODE_ENV === "production" ? ge(5) : "`enhancers` field must be a callback");
  let f = typeof s == "function" ? s(p) : p();
  if (process.env.NODE_ENV !== "production" && !Array.isArray(f))
    throw new Error(process.env.NODE_ENV === "production" ? ge(6) : "`enhancers` callback must return an array");
  if (process.env.NODE_ENV !== "production" && f.some((h) => typeof h != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? ge(7) : "each enhancer provided to configureStore must be a function");
  process.env.NODE_ENV !== "production" && u.length && !f.includes(d) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const v = l(...f);
  return zP(c, i, v);
}
function a1(e) {
  const t = {}, r = [];
  let n;
  const o = {
    addCase(a, i) {
      if (process.env.NODE_ENV !== "production") {
        if (r.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? ge(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error(process.env.NODE_ENV === "production" ? ge(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const s = typeof a == "string" ? a : a.type;
      if (!s)
        throw new Error(process.env.NODE_ENV === "production" ? ge(28) : "`builder.addCase` cannot be called with an empty action type");
      if (s in t)
        throw new Error(process.env.NODE_ENV === "production" ? ge(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${s}'`);
      return t[s] = i, o;
    },
    addAsyncThunk(a, i) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? ge(43) : "`builder.addAsyncThunk` should only be called before calling `builder.addDefaultCase`");
      return i.pending && (t[a.pending.type] = i.pending), i.rejected && (t[a.rejected.type] = i.rejected), i.fulfilled && (t[a.fulfilled.type] = i.fulfilled), i.settled && r.push({
        matcher: a.settled,
        reducer: i.settled
      }), o;
    },
    addMatcher(a, i) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? ge(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return r.push({
        matcher: a,
        reducer: i
      }), o;
    },
    addDefaultCase(a) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? ge(31) : "`builder.addDefaultCase` can only be called once");
      return n = a, o;
    }
  };
  return e(o), [t, r, n];
}
kF(!1);
function VF(e) {
  return typeof e == "function";
}
function qF(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? ge(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [r, n, o] = a1(t), a;
  if (VF(e))
    a = () => Kg(e());
  else {
    const s = Kg(e);
    a = () => s;
  }
  function i(s = a(), c) {
    let u = [r[c.type], ...n.filter(({
      matcher: l
    }) => l(c)).map(({
      reducer: l
    }) => l)];
    return u.filter((l) => !!l).length === 0 && (u = [o]), u.reduce((l, d) => {
      if (d)
        if (Dn(l)) {
          const f = d(l, c);
          return f === void 0 ? l : f;
        } else {
          if (Nr(l))
            return YP(l, (p) => d(p, c));
          {
            const p = d(l, c);
            if (p === void 0) {
              if (l === null)
                return l;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return p;
          }
        }
      return l;
    }, s);
  }
  return i.getInitialState = a, i;
}
var HF = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", GF = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += HF[Math.random() * 64 | 0];
  return t;
}, YF = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function XF(e, t) {
  return `${e}/${t}`;
}
function ZF({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[YF];
  return function(n) {
    const {
      name: o,
      reducerPath: a = o
    } = n;
    if (!o)
      throw new Error(process.env.NODE_ENV === "production" ? ge(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && n.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const i = (typeof n.reducers == "function" ? n.reducers(QF()) : n.reducers) || {}, s = Object.keys(i), c = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, u = {
      addCase(x, S) {
        const E = typeof x == "string" ? x : x.type;
        if (!E)
          throw new Error(process.env.NODE_ENV === "production" ? ge(12) : "`context.addCase` cannot be called with an empty action type");
        if (E in c.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? ge(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + E);
        return c.sliceCaseReducersByType[E] = S, u;
      },
      addMatcher(x, S) {
        return c.sliceMatchers.push({
          matcher: x,
          reducer: S
        }), u;
      },
      exposeAction(x, S) {
        return c.actionCreators[x] = S, u;
      },
      exposeCaseReducer(x, S) {
        return c.sliceCaseReducersByName[x] = S, u;
      }
    };
    s.forEach((x) => {
      const S = i[x], E = {
        reducerName: x,
        type: XF(o, x),
        createNotation: typeof n.reducers == "function"
      };
      tz(S) ? nz(E, S, u, t) : ez(E, S, u);
    });
    function l() {
      if (process.env.NODE_ENV !== "production" && typeof n.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? ge(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [x = {}, S = [], E = void 0] = typeof n.extraReducers == "function" ? a1(n.extraReducers) : [n.extraReducers], O = {
        ...x,
        ...c.sliceCaseReducersByType
      };
      return qF(n.initialState, (P) => {
        for (let A in O)
          P.addCase(A, O[A]);
        for (let A of c.sliceMatchers)
          P.addMatcher(A.matcher, A.reducer);
        for (let A of S)
          P.addMatcher(A.matcher, A.reducer);
        E && P.addDefaultCase(E);
      });
    }
    const d = (x) => x, p = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new WeakMap();
    let v;
    function h(x, S) {
      return v || (v = l()), v(x, S);
    }
    function g() {
      return v || (v = l()), v.getInitialState();
    }
    function y(x, S = !1) {
      function E(P) {
        let A = P[x];
        if (typeof A > "u") {
          if (S)
            A = xi(f, E, g);
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? ge(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return A;
      }
      function O(P = d) {
        const A = xi(p, S, () => /* @__PURE__ */ new WeakMap());
        return xi(A, P, () => {
          const _ = {};
          for (const [N, T] of Object.entries(n.selectors ?? {}))
            _[N] = JF(T, P, () => xi(f, P, g), S);
          return _;
        });
      }
      return {
        reducerPath: x,
        getSelectors: O,
        get selectors() {
          return O(E);
        },
        selectSlice: E
      };
    }
    const w = {
      name: o,
      reducer: h,
      actions: c.actionCreators,
      caseReducers: c.sliceCaseReducersByName,
      getInitialState: g,
      ...y(a),
      injectInto(x, {
        reducerPath: S,
        ...E
      } = {}) {
        const O = S ?? a;
        return x.inject({
          reducerPath: O,
          reducer: h
        }, E), {
          ...w,
          ...y(O, !0)
        };
      }
    };
    return w;
  };
}
function JF(e, t, r, n) {
  function o(a, ...i) {
    let s = t(a);
    if (typeof s > "u") {
      if (n)
        s = r();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? ge(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(s, ...i);
  }
  return o.unwrapped = e, o;
}
var Lt = /* @__PURE__ */ ZF();
function QF() {
  function e(t, r) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...r
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...r) {
          return t(...r);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, r) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: r
      };
    },
    asyncThunk: e
  };
}
function ez({
  type: e,
  reducerName: t,
  createNotation: r
}, n, o) {
  let a, i;
  if ("reducer" in n) {
    if (r && !rz(n))
      throw new Error(process.env.NODE_ENV === "production" ? ge(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    a = n.reducer, i = n.prepare;
  } else
    a = n;
  o.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, i ? Ht(e, i) : Ht(e));
}
function tz(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function rz(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function nz({
  type: e,
  reducerName: t
}, r, n, o) {
  if (!o)
    throw new Error(process.env.NODE_ENV === "production" ? ge(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: a,
    fulfilled: i,
    pending: s,
    rejected: c,
    settled: u,
    options: l
  } = r, d = o(e, a, l);
  n.exposeAction(t, d), i && n.addCase(d.fulfilled, i), s && n.addCase(d.pending, s), c && n.addCase(d.rejected, c), u && n.addMatcher(d.settled, u), n.exposeCaseReducer(t, {
    fulfilled: i || Si,
    pending: s || Si,
    rejected: c || Si,
    settled: u || Si
  });
}
function Si() {
}
var oz = "task", i1 = "listener", s1 = "completed", Gp = "cancelled", az = `task-${Gp}`, iz = `task-${s1}`, cf = `${i1}-${Gp}`, sz = `${i1}-${s1}`, Lc = class {
  constructor(e) {
    this.code = e, this.message = `${oz} ${Gp} (reason: ${e})`;
  }
  name = "TaskAbortError";
  message;
}, Yp = (e, t) => {
  if (typeof e != "function")
    throw new TypeError(process.env.NODE_ENV === "production" ? ge(32) : `${t} is not a function`);
}, ps = () => {
}, c1 = (e, t = ps) => (e.catch(t), e), l1 = (e, t) => (e.addEventListener("abort", t, {
  once: !0
}), () => e.removeEventListener("abort", t)), Sn = (e, t) => {
  const r = e.signal;
  r.aborted || ("reason" in r || Object.defineProperty(r, "reason", {
    enumerable: !0,
    value: t,
    configurable: !0,
    writable: !0
  }), e.abort(t));
}, On = (e) => {
  if (e.aborted) {
    const {
      reason: t
    } = e;
    throw new Lc(t);
  }
};
function u1(e, t) {
  let r = ps;
  return new Promise((n, o) => {
    const a = () => o(new Lc(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    r = l1(e, a), t.finally(() => r()).then(n, o);
  }).finally(() => {
    r = ps;
  });
}
var cz = async (e, t) => {
  try {
    return await Promise.resolve(), {
      status: "ok",
      value: await e()
    };
  } catch (r) {
    return {
      status: r instanceof Lc ? "cancelled" : "rejected",
      error: r
    };
  } finally {
    t?.();
  }
}, hs = (e) => (t) => c1(u1(e, t).then((r) => (On(e), r))), d1 = (e) => {
  const t = hs(e);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, {
  assign: ro
} = Object, qg = {}, Fa = "listenerMiddleware", lz = (e, t) => {
  const r = (n) => l1(e, () => Sn(n, e.reason));
  return (n, o) => {
    Yp(n, "taskExecutor");
    const a = new AbortController();
    r(a);
    const i = cz(async () => {
      On(e), On(a.signal);
      const s = await n({
        pause: hs(a.signal),
        delay: d1(a.signal),
        signal: a.signal
      });
      return On(a.signal), s;
    }, () => Sn(a, iz));
    return o?.autoJoin && t.push(i.catch(ps)), {
      result: hs(e)(i),
      cancel() {
        Sn(a, az);
      }
    };
  };
}, uz = (e, t) => {
  const r = async (n, o) => {
    On(t);
    let a = () => {
    };
    const s = [new Promise((c, u) => {
      let l = e({
        predicate: n,
        effect: (d, p) => {
          p.unsubscribe(), c([d, p.getState(), p.getOriginalState()]);
        }
      });
      a = () => {
        l(), u();
      };
    })];
    o != null && s.push(new Promise((c) => setTimeout(c, o, null)));
    try {
      const c = await u1(t, Promise.race(s));
      return On(t), c;
    } finally {
      a();
    }
  };
  return (n, o) => c1(r(n, o));
}, f1 = (e) => {
  let {
    type: t,
    actionCreator: r,
    matcher: n,
    predicate: o,
    effect: a
  } = e;
  if (t)
    o = Ht(t).match;
  else if (r)
    t = r.type, o = r.match;
  else if (n)
    o = n;
  else if (!o) throw new Error(process.env.NODE_ENV === "production" ? ge(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return Yp(a, "options.listener"), {
    predicate: o,
    type: t,
    effect: a
  };
}, p1 = /* @__PURE__ */ ro((e) => {
  const {
    type: t,
    predicate: r,
    effect: n
  } = f1(e);
  return {
    id: GF(),
    effect: n,
    type: t,
    predicate: r,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? ge(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => p1
}), Hg = (e, t) => {
  const {
    type: r,
    effect: n,
    predicate: o
  } = f1(t);
  return Array.from(e.values()).find((a) => (typeof r == "string" ? a.type === r : a.predicate === o) && a.effect === n);
}, lf = (e) => {
  e.pending.forEach((t) => {
    Sn(t, cf);
  });
}, dz = (e, t) => () => {
  for (const r of t.keys())
    lf(r);
  e.clear();
}, Gg = (e, t, r) => {
  try {
    e(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, h1 = /* @__PURE__ */ ro(/* @__PURE__ */ Ht(`${Fa}/add`), {
  withTypes: () => h1
}), fz = /* @__PURE__ */ Ht(`${Fa}/removeAll`), m1 = /* @__PURE__ */ ro(/* @__PURE__ */ Ht(`${Fa}/remove`), {
  withTypes: () => m1
}), pz = (...e) => {
  console.error(`${Fa}/error`, ...e);
}, za = (e = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (f) => {
    const v = r.get(f) ?? 0;
    r.set(f, v + 1);
  }, o = (f) => {
    const v = r.get(f) ?? 1;
    v === 1 ? r.delete(f) : r.set(f, v - 1);
  }, {
    extra: a,
    onError: i = pz
  } = e;
  Yp(i, "onError");
  const s = (f) => (f.unsubscribe = () => t.delete(f.id), t.set(f.id, f), (v) => {
    f.unsubscribe(), v?.cancelActive && lf(f);
  }), c = (f) => {
    const v = Hg(t, f) ?? p1(f);
    return s(v);
  };
  ro(c, {
    withTypes: () => c
  });
  const u = (f) => {
    const v = Hg(t, f);
    return v && (v.unsubscribe(), f.cancelActive && lf(v)), !!v;
  };
  ro(u, {
    withTypes: () => u
  });
  const l = async (f, v, h, g) => {
    const y = new AbortController(), w = uz(c, y.signal), x = [];
    try {
      f.pending.add(y), n(f), await Promise.resolve(f.effect(
        v,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        ro({}, h, {
          getOriginalState: g,
          condition: (S, E) => w(S, E).then(Boolean),
          take: w,
          delay: d1(y.signal),
          pause: hs(y.signal),
          extra: a,
          signal: y.signal,
          fork: lz(y.signal, x),
          unsubscribe: f.unsubscribe,
          subscribe: () => {
            t.set(f.id, f);
          },
          cancelActiveListeners: () => {
            f.pending.forEach((S, E, O) => {
              S !== y && (Sn(S, cf), O.delete(S));
            });
          },
          cancel: () => {
            Sn(y, cf), f.pending.delete(y);
          },
          throwIfCancelled: () => {
            On(y.signal);
          }
        })
      ));
    } catch (S) {
      S instanceof Lc || Gg(i, S, {
        raisedBy: "effect"
      });
    } finally {
      await Promise.all(x), Sn(y, sz), o(f), f.pending.delete(y);
    }
  }, d = dz(t, r);
  return {
    middleware: (f) => (v) => (h) => {
      if (!Vp(h))
        return v(h);
      if (h1.match(h))
        return c(h.payload);
      if (fz.match(h)) {
        d();
        return;
      }
      if (m1.match(h))
        return u(h.payload);
      let g = f.getState();
      const y = () => {
        if (g === qg)
          throw new Error(process.env.NODE_ENV === "production" ? ge(23) : `${Fa}: getOriginalState can only be called synchronously`);
        return g;
      };
      let w;
      try {
        if (w = v(h), t.size > 0) {
          const x = f.getState(), S = Array.from(t.values());
          for (const E of S) {
            let O = !1;
            try {
              O = E.predicate(h, x, g);
            } catch (P) {
              O = !1, Gg(i, P, {
                raisedBy: "predicate"
              });
            }
            O && l(E, h, f, y);
          }
        }
      } finally {
        g = qg;
      }
      return w;
    },
    startListening: c,
    stopListening: u,
    clearListeners: d
  };
};
function ge(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var hz = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
}, v1 = Lt({
  name: "chartLayout",
  initialState: hz,
  reducers: {
    setLayout(e, t) {
      e.layoutType = t.payload;
    },
    setChartSize(e, t) {
      e.width = t.payload.width, e.height = t.payload.height;
    },
    setMargin(e, t) {
      var r, n, o, a;
      e.margin.top = (r = t.payload.top) !== null && r !== void 0 ? r : 0, e.margin.right = (n = t.payload.right) !== null && n !== void 0 ? n : 0, e.margin.bottom = (o = t.payload.bottom) !== null && o !== void 0 ? o : 0, e.margin.left = (a = t.payload.left) !== null && a !== void 0 ? a : 0;
    },
    setScale(e, t) {
      e.scale = t.payload;
    }
  }
}), {
  setMargin: mz,
  setLayout: vz,
  setChartSize: gz,
  setScale: yz
} = v1.actions, bz = v1.reducer;
function Yg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yg(Object(r), !0).forEach(function(n) {
      wz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function wz(e, t, r) {
  return (t = xz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xz(e) {
  var t = Ez(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ez(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ms = Math.PI / 180, Sz = (e) => e * 180 / Math.PI, ze = (e, t, r, n) => ({
  x: e + Math.cos(-ms * n) * r,
  y: t + Math.sin(-ms * n) * r
}), g1 = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, Oz = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    x: o,
    y: a
  } = t;
  return Math.sqrt((r - o) ** 2 + (n - a) ** 2);
}, Pz = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    cx: o,
    cy: a
  } = t, i = Oz({
    x: r,
    y: n
  }, {
    x: o,
    y: a
  });
  if (i <= 0)
    return {
      radius: i,
      angle: 0
    };
  var s = (r - o) / i, c = Math.acos(s);
  return n > a && (c = 2 * Math.PI - c), {
    radius: i,
    angle: Sz(c),
    angleInRadian: c
  };
}, Az = (e) => {
  var {
    startAngle: t,
    endAngle: r
  } = e, n = Math.floor(t / 360), o = Math.floor(r / 360), a = Math.min(n, o);
  return {
    startAngle: t - a * 360,
    endAngle: r - a * 360
  };
}, Cz = (e, t) => {
  var {
    startAngle: r,
    endAngle: n
  } = t, o = Math.floor(r / 360), a = Math.floor(n / 360), i = Math.min(o, a);
  return e + i * 360;
}, Tz = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    radius: o,
    angle: a
  } = Pz({
    x: r,
    y: n
  }, t), {
    innerRadius: i,
    outerRadius: s
  } = t;
  if (o < i || o > s || o === 0)
    return null;
  var {
    startAngle: c,
    endAngle: u
  } = Az(t), l = a, d;
  if (c <= u) {
    for (; l > u; )
      l -= 360;
    for (; l < c; )
      l += 360;
    d = l >= c && l <= u;
  } else {
    for (; l > c; )
      l -= 360;
    for (; l < u; )
      l += 360;
    d = l >= u && l <= c;
  }
  return d ? Xg(Xg({}, t), {}, {
    radius: o,
    angle: Cz(l, t)
  }) : null;
};
function y1(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function Zg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zg(Object(r), !0).forEach(function(n) {
      _z(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _z(e, t, r) {
  return (t = kz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kz(e) {
  var t = Nz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Nz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Se(e, t, r) {
  return Ce(e) || Ce(t) ? r : pr(t) ? In(e, t, r) : typeof t == "function" ? t(e) : r;
}
var Rz = (e, t, r, n, o) => {
  var a, i = -1, s = (a = t?.length) !== null && a !== void 0 ? a : 0;
  if (s <= 1 || e == null)
    return 0;
  if (n === "angleAxis" && o != null && Math.abs(Math.abs(o[1] - o[0]) - 360) <= 1e-6)
    for (var c = 0; c < s; c++) {
      var u = c > 0 ? r[c - 1].coordinate : r[s - 1].coordinate, l = r[c].coordinate, d = c >= s - 1 ? r[0].coordinate : r[c + 1].coordinate, p = void 0;
      if (Qe(l - u) !== Qe(d - l)) {
        var f = [];
        if (Qe(d - l) === Qe(o[1] - o[0])) {
          p = d;
          var v = l + o[1] - o[0];
          f[0] = Math.min(v, (v + u) / 2), f[1] = Math.max(v, (v + u) / 2);
        } else {
          p = u;
          var h = d + o[1] - o[0];
          f[0] = Math.min(l, (h + l) / 2), f[1] = Math.max(l, (h + l) / 2);
        }
        var g = [Math.min(l, (p + l) / 2), Math.max(l, (p + l) / 2)];
        if (e > g[0] && e <= g[1] || e >= f[0] && e <= f[1]) {
          ({
            index: i
          } = r[c]);
          break;
        }
      } else {
        var y = Math.min(u, d), w = Math.max(u, d);
        if (e > (y + l) / 2 && e <= (w + l) / 2) {
          ({
            index: i
          } = r[c]);
          break;
        }
      }
    }
  else if (t) {
    for (var x = 0; x < s; x++)
      if (x === 0 && e <= (t[x].coordinate + t[x + 1].coordinate) / 2 || x > 0 && x < s - 1 && e > (t[x].coordinate + t[x - 1].coordinate) / 2 && e <= (t[x].coordinate + t[x + 1].coordinate) / 2 || x === s - 1 && e > (t[x].coordinate + t[x - 1].coordinate) / 2) {
        ({
          index: i
        } = t[x]);
        break;
      }
  }
  return i;
}, Mz = (e, t, r) => {
  if (t && r) {
    var {
      width: n,
      height: o
    } = r, {
      align: a,
      verticalAlign: i,
      layout: s
    } = t;
    if ((s === "vertical" || s === "horizontal" && i === "middle") && a !== "center" && Q(e[a]))
      return Ut(Ut({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((s === "horizontal" || s === "vertical" && a === "center") && i !== "middle" && Q(e[i]))
      return Ut(Ut({}, e), {}, {
        [i]: e[i] + (o || 0)
      });
  }
  return e;
}, yr = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", b1 = (e, t, r, n) => {
  if (n)
    return e.map((s) => s.coordinate);
  var o, a, i = e.map((s) => (s.coordinate === t && (o = !0), s.coordinate === r && (a = !0), s.coordinate));
  return o || i.push(t), a || i.push(r), i;
}, w1 = (e, t, r) => {
  if (!e)
    return null;
  var {
    duplicateDomain: n,
    type: o,
    range: a,
    scale: i,
    realScaleType: s,
    isCategorical: c,
    categoricalDomain: u,
    tickCount: l,
    ticks: d,
    niceTicks: p,
    axisType: f
  } = e;
  if (!i)
    return null;
  var v = s === "scaleBand" && i.bandwidth ? i.bandwidth() / 2 : 2, h = o === "category" && i.bandwidth ? i.bandwidth() / v : 0;
  if (h = f === "angleAxis" && a && a.length >= 2 ? Qe(a[0] - a[1]) * 2 * h : h, d || p) {
    var g = (d || p || []).map((y, w) => {
      var x = n ? n.indexOf(y) : y;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: i(x) + h,
        value: y,
        offset: h,
        index: w
      };
    });
    return g.filter((y) => !Mt(y.coordinate));
  }
  return c && u ? u.map((y, w) => ({
    coordinate: i(y) + h,
    value: y,
    index: w,
    offset: h
  })) : i.ticks && l != null ? i.ticks(l).map((y, w) => ({
    coordinate: i(y) + h,
    value: y,
    offset: h,
    index: w
  })) : i.domain().map((y, w) => ({
    coordinate: i(y) + h,
    value: n ? n[y] : y,
    index: w,
    offset: h
  }));
}, Jg = 1e-4, Iz = (e) => {
  var t = e.domain();
  if (!(!t || t.length <= 2)) {
    var r = t.length, n = e.range(), o = Math.min(n[0], n[1]) - Jg, a = Math.max(n[0], n[1]) + Jg, i = e(t[0]), s = e(t[r - 1]);
    (i < o || i > a || s < o || s > a) && e.domain([t[0], t[r - 1]]);
  }
}, Dz = (e, t) => {
  if (!t || t.length !== 2 || !Q(t[0]) || !Q(t[1]))
    return e;
  var r = Math.min(t[0], t[1]), n = Math.max(t[0], t[1]), o = [e[0], e[1]];
  return (!Q(e[0]) || e[0] < r) && (o[0] = r), (!Q(e[1]) || e[1] > n) && (o[1] = n), o[0] > n && (o[0] = n), o[1] < r && (o[1] = r), o;
}, jz = (e) => {
  var t = e.length;
  if (!(t <= 0))
    for (var r = 0, n = e[0].length; r < n; ++r)
      for (var o = 0, a = 0, i = 0; i < t; ++i) {
        var s = Mt(e[i][r][1]) ? e[i][r][0] : e[i][r][1];
        s >= 0 ? (e[i][r][0] = o, e[i][r][1] = o + s, o = e[i][r][1]) : (e[i][r][0] = a, e[i][r][1] = a + s, a = e[i][r][1]);
      }
}, Lz = (e) => {
  var t = e.length;
  if (!(t <= 0))
    for (var r = 0, n = e[0].length; r < n; ++r)
      for (var o = 0, a = 0; a < t; ++a) {
        var i = Mt(e[a][r][1]) ? e[a][r][0] : e[a][r][1];
        i >= 0 ? (e[a][r][0] = o, e[a][r][1] = o + i, o = e[a][r][1]) : (e[a][r][0] = 0, e[a][r][1] = 0);
      }
}, $z = {
  sign: jz,
  // @ts-expect-error definitelytyped types are incorrect
  expand: V$,
  // @ts-expect-error definitelytyped types are incorrect
  none: co,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: q$,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: H$,
  positive: Lz
}, Bz = (e, t, r) => {
  var n = $z[r], o = K$().keys(t).value((a, i) => +Se(a, i, 0)).order(Xd).offset(n);
  return o(e);
};
function x1(e) {
  return e == null ? void 0 : String(e);
}
function vs(e) {
  var {
    axis: t,
    ticks: r,
    bandSize: n,
    entry: o,
    index: a,
    dataKey: i
  } = e;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !Ce(o[t.dataKey])) {
      var s = SP(r, "value", o[t.dataKey]);
      if (s)
        return s.coordinate + n / 2;
    }
    return r[a] ? r[a].coordinate + n / 2 : null;
  }
  var c = Se(o, Ce(i) ? t.dataKey : i);
  return Ce(c) ? null : t.scale(c);
}
var Qg = (e) => {
  var {
    axis: t,
    ticks: r,
    offset: n,
    bandSize: o,
    entry: a,
    index: i
  } = e;
  if (t.type === "category")
    return r[i] ? r[i].coordinate + n : null;
  var s = Se(a, t.dataKey, t.scale.domain()[i]);
  return Ce(s) ? null : t.scale(s) - o / 2 + n;
}, Fz = (e) => {
  var {
    numericAxis: t
  } = e, r = t.scale.domain();
  if (t.type === "number") {
    var n = Math.min(r[0], r[1]), o = Math.max(r[0], r[1]);
    return n <= 0 && o >= 0 ? 0 : o < 0 ? o : n;
  }
  return r[0];
}, zz = (e) => {
  var t = e.flat(2).filter(Q);
  return [Math.min(...t), Math.max(...t)];
}, Uz = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], Wz = (e, t, r) => {
  if (e != null)
    return Uz(Object.keys(e).reduce((n, o) => {
      var a = e[o], {
        stackedData: i
      } = a, s = i.reduce((c, u) => {
        var l = y1(u, t, r), d = zz(l);
        return [Math.min(c[0], d[0]), Math.max(c[1], d[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(s[0], n[0]), Math.max(s[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, ey = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, ty = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Ln = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    if (!r || n > 0)
      return n;
  }
  if (e && t && t.length >= 2) {
    for (var o = Mc(t, (l) => l.coordinate), a = 1 / 0, i = 1, s = o.length; i < s; i++) {
      var c = o[i], u = o[i - 1];
      a = Math.min((c.coordinate || 0) - (u.coordinate || 0), a);
    }
    return a === 1 / 0 ? 0 : a;
  }
  return r ? void 0 : 0;
};
function ry(e) {
  var {
    tooltipEntrySettings: t,
    dataKey: r,
    payload: n,
    value: o,
    name: a
  } = e;
  return Ut(Ut({}, t), {}, {
    dataKey: r,
    payload: n,
    value: o,
    name: a
  });
}
function cn(e, t) {
  if (e)
    return String(e);
  if (typeof t == "string")
    return t;
}
function Kz(e, t, r, n, o) {
  if (r === "horizontal" || r === "vertical") {
    var a = e >= o.left && e <= o.left + o.width && t >= o.top && t <= o.top + o.height;
    return a ? {
      x: e,
      y: t
    } : null;
  }
  return n ? Tz({
    x: e,
    y: t
  }, n) : null;
}
var Vz = (e, t, r, n) => {
  var o = t.find((u) => u && u.index === r);
  if (o) {
    if (e === "horizontal")
      return {
        x: o.coordinate,
        y: n.y
      };
    if (e === "vertical")
      return {
        x: n.x,
        y: o.coordinate
      };
    if (e === "centric") {
      var a = o.coordinate, {
        radius: i
      } = n;
      return Ut(Ut(Ut({}, n), ze(n.cx, n.cy, i, a)), {}, {
        angle: a,
        radius: i
      });
    }
    var s = o.coordinate, {
      angle: c
    } = n;
    return Ut(Ut(Ut({}, n), ze(n.cx, n.cy, s, c)), {}, {
      angle: c,
      radius: s
    });
  }
  return {
    x: 0,
    y: 0
  };
}, qz = (e, t) => t === "horizontal" ? e.x : t === "vertical" ? e.y : t === "centric" ? e.angle : e.radius, Dr = (e) => e.layout.width, jr = (e) => e.layout.height, Hz = (e) => e.layout.scale, E1 = (e) => e.layout.margin, $c = k((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Bc = k((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), S1 = "data-recharts-item-index", O1 = "data-recharts-item-data-key", Ua = 60;
function ny(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Oi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ny(Object(r), !0).forEach(function(n) {
      Gz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ny(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Gz(e, t, r) {
  return (t = Yz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Yz(e) {
  var t = Xz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Xz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Zz = (e) => e.brush.height;
function Jz(e) {
  var t = Bc(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var o = typeof n.width == "number" ? n.width : Ua;
      return r + o;
    }
    return r;
  }, 0);
}
function Qz(e) {
  var t = Bc(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var o = typeof n.width == "number" ? n.width : Ua;
      return r + o;
    }
    return r;
  }, 0);
}
function eU(e) {
  var t = $c(e);
  return t.reduce((r, n) => n.orientation === "top" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
function tU(e) {
  var t = $c(e);
  return t.reduce((r, n) => n.orientation === "bottom" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
var He = k([Dr, jr, E1, Zz, Jz, Qz, eU, tU, BP, sF], (e, t, r, n, o, a, i, s, c, u) => {
  var l = {
    left: (r.left || 0) + o,
    right: (r.right || 0) + a
  }, d = {
    top: (r.top || 0) + i,
    bottom: (r.bottom || 0) + s
  }, p = Oi(Oi({}, d), l), f = p.bottom;
  p.bottom += n, p = Mz(p, c, u);
  var v = e - p.left - p.right, h = t - p.top - p.bottom;
  return Oi(Oi({
    brushBottom: f
  }, p), {}, {
    // never return negative values for height and width
    width: Math.max(v, 0),
    height: Math.max(h, 0)
  });
}), rU = k(He, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
})), Xp = k(Dr, jr, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
})), nU = /* @__PURE__ */ Dt(null), ot = () => er(nU) != null, Fc = (e) => e.brush, zc = k([Fc, He, E1], (e, t, r) => ({
  height: e.height,
  x: Q(e.x) ? e.x : t.left,
  y: Q(e.y) ? e.y : t.top + t.height + t.brushBottom - (r?.bottom || 0),
  width: Q(e.width) ? e.width : t.width
})), Uu = {}, Wu = {}, Ku = {}, oy;
function oU() {
  return oy || (oy = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r, n, { signal: o, edges: a } = {}) {
      let i, s = null;
      const c = a != null && a.includes("leading"), u = a == null || a.includes("trailing"), l = () => {
        s !== null && (r.apply(i, s), i = void 0, s = null);
      }, d = () => {
        u && l(), h();
      };
      let p = null;
      const f = () => {
        p != null && clearTimeout(p), p = setTimeout(() => {
          p = null, d();
        }, n);
      }, v = () => {
        p !== null && (clearTimeout(p), p = null);
      }, h = () => {
        v(), i = void 0, s = null;
      }, g = () => {
        l();
      }, y = function(...w) {
        if (o?.aborted)
          return;
        i = this, s = w;
        const x = p == null;
        f(), c && x && l();
      };
      return y.schedule = f, y.cancel = h, y.flush = g, o?.addEventListener("abort", h, { once: !0 }), y;
    }
    e.debounce = t;
  })(Ku)), Ku;
}
var ay;
function aU() {
  return ay || (ay = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ oU();
    function r(n, o = 0, a = {}) {
      typeof a != "object" && (a = {});
      const { leading: i = !1, trailing: s = !0, maxWait: c } = a, u = Array(2);
      i && (u[0] = "leading"), s && (u[1] = "trailing");
      let l, d = null;
      const p = t.debounce(function(...h) {
        l = n.apply(this, h), d = null;
      }, o, { edges: u }), f = function(...h) {
        return c != null && (d === null && (d = Date.now()), Date.now() - d >= c) ? (l = n.apply(this, h), d = Date.now(), p.cancel(), p.schedule(), l) : (p.apply(this, h), l);
      }, v = () => (p.flush(), l);
      return f.cancel = p.cancel, f.flush = v, f;
    }
    e.debounce = r;
  })(Wu)), Wu;
}
var iy;
function iU() {
  return iy || (iy = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ aU();
    function r(n, o = 0, a = {}) {
      const { leading: i = !0, trailing: s = !0 } = a;
      return t.debounce(n, o, {
        leading: i,
        maxWait: o,
        trailing: s
      });
    }
    e.throttle = r;
  })(Uu)), Uu;
}
var Vu, sy;
function sU() {
  return sy || (sy = 1, Vu = iU().throttle), Vu;
}
var cU = /* @__PURE__ */ sU();
const lU = /* @__PURE__ */ sn(cU);
var uU = process.env.NODE_ENV !== "production", gs = function(t, r) {
  for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    o[a - 2] = arguments[a];
  if (uU && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var i = 0;
      console.warn(r.replace(/%s/g, () => o[i++]));
    }
}, P1 = (e, t, r) => {
  var {
    width: n = "100%",
    height: o = "100%",
    aspect: a,
    maxHeight: i
  } = r, s = kr(n) ? e : Number(n), c = kr(o) ? t : Number(o);
  return a && a > 0 && (s ? c = s / a : c && (s = c * a), i && c > i && (c = i)), {
    calculatedWidth: s,
    calculatedHeight: c
  };
}, dU = {
  width: 0,
  height: 0,
  overflow: "visible"
}, fU = {
  width: 0,
  overflowX: "visible"
}, pU = {
  height: 0,
  overflowY: "visible"
}, hU = {}, mU = (e) => {
  var {
    width: t,
    height: r
  } = e, n = kr(t), o = kr(r);
  return n && o ? dU : n ? fU : o ? pU : hU;
};
function vU(e) {
  var {
    width: t,
    height: r,
    aspect: n
  } = e, o = t, a = r;
  return o === void 0 && a === void 0 ? (o = "100%", a = "100%") : o === void 0 ? o = n && n > 0 ? void 0 : "100%" : a === void 0 && (a = n && n > 0 ? void 0 : "100%"), {
    width: o,
    height: a
  };
}
function We(e) {
  return Number.isFinite(e);
}
function lo(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function uf() {
  return uf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, uf.apply(null, arguments);
}
function cy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ly(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cy(Object(r), !0).forEach(function(n) {
      gU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function gU(e, t, r) {
  return (t = yU(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yU(e) {
  var t = bU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function bU(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var A1 = /* @__PURE__ */ Dt({
  width: -1,
  height: -1
});
function C1(e) {
  var {
    children: t,
    width: r,
    height: n
  } = e, o = tr(() => ({
    width: r,
    height: n
  }), [r, n]);
  return r <= 0 || n <= 0 ? null : /* @__PURE__ */ m.createElement(A1.Provider, {
    value: o
  }, t);
}
var Zp = () => er(A1), wU = /* @__PURE__ */ Fe((e, t) => {
  var {
    aspect: r,
    initialDimension: n = {
      width: -1,
      height: -1
    },
    width: o,
    height: a,
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth: i = 0,
    minHeight: s,
    maxHeight: c,
    children: u,
    debounce: l = 0,
    id: d,
    className: p,
    onResize: f,
    style: v = {}
  } = e, h = ye(null), g = ye();
  g.current = f, Uw(t, () => h.current);
  var [y, w] = je({
    containerWidth: n.width,
    containerHeight: n.height
  }), x = he((A, _) => {
    w((N) => {
      var T = Math.round(A), R = Math.round(_);
      return N.containerWidth === T && N.containerHeight === R ? N : {
        containerWidth: T,
        containerHeight: R
      };
    });
  }, []);
  Le(() => {
    var A = (R) => {
      var j, {
        width: C,
        height: D
      } = R[0].contentRect;
      x(C, D), (j = g.current) === null || j === void 0 || j.call(g, C, D);
    };
    l > 0 && (A = lU(A, l, {
      trailing: !0,
      leading: !1
    }));
    var _ = new ResizeObserver(A), {
      width: N,
      height: T
    } = h.current.getBoundingClientRect();
    return x(N, T), _.observe(h.current), () => {
      _.disconnect();
    };
  }, [x, l]);
  var {
    containerWidth: S,
    containerHeight: E
  } = y;
  gs(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var {
    calculatedWidth: O,
    calculatedHeight: P
  } = P1(S, E, {
    width: o,
    height: a,
    aspect: r,
    maxHeight: c
  });
  return gs(O > 0 || P > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, O, P, o, a, i, s, r), /* @__PURE__ */ m.createElement("div", {
    id: d ? "".concat(d) : void 0,
    className: pe("recharts-responsive-container", p),
    style: ly(ly({}, v), {}, {
      width: o,
      height: a,
      minWidth: i,
      minHeight: s,
      maxHeight: c
    }),
    ref: h
  }, /* @__PURE__ */ m.createElement("div", {
    style: mU({
      width: o,
      height: a
    })
  }, /* @__PURE__ */ m.createElement(C1, {
    width: O,
    height: P
  }, u)));
}), Uc = /* @__PURE__ */ Fe((e, t) => {
  var r = Zp();
  if (lo(r.width) && lo(r.height))
    return e.children;
  var {
    width: n,
    height: o
  } = vU({
    width: e.width,
    height: e.height,
    aspect: e.aspect
  }), {
    calculatedWidth: a,
    calculatedHeight: i
  } = P1(void 0, void 0, {
    width: n,
    height: o,
    aspect: e.aspect,
    maxHeight: e.maxHeight
  });
  return Q(a) && Q(i) ? /* @__PURE__ */ m.createElement(C1, {
    width: a,
    height: i
  }, e.children) : /* @__PURE__ */ m.createElement(wU, uf({}, e, {
    width: n,
    height: o,
    ref: t
  }));
}), Wc = () => {
  var e, t = ot(), r = ee(rU), n = ee(zc), o = (e = ee(Fc)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !o ? r : {
    width: n.width - o.left - o.right,
    height: n.height - o.top - o.bottom,
    x: o.left,
    y: o.top
  };
}, xU = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, T1 = () => {
  var e;
  return (e = ee(He)) !== null && e !== void 0 ? e : xU;
}, Jp = () => ee(Dr), Qp = () => ee(jr), EU = () => ee((e) => e.layout.margin), fe = (e) => e.layout.layoutType, Wa = () => ee(fe), Kc = (e) => {
  var t = Re(), r = ot(), {
    width: n,
    height: o
  } = e, a = Zp(), i = n, s = o;
  return a && (i = a.width > 0 ? a.width : n, s = a.height > 0 ? a.height : o), Le(() => {
    !r && lo(i) && lo(s) && t(gz({
      width: i,
      height: s
    }));
  }, [t, r, i, s]), null;
}, SU = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "middle",
    itemSorter: "value"
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
}, _1 = Lt({
  name: "legend",
  initialState: SU,
  reducers: {
    setLegendSize(e, t) {
      e.size.width = t.payload.width, e.size.height = t.payload.height;
    },
    setLegendSettings(e, t) {
      e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter;
    },
    addLegendPayload: {
      reducer(e, t) {
        e.payload.push(t.payload);
      },
      prepare: ut()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = Pr(e).payload.indexOf(t.payload);
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: ut()
    }
  }
}), {
  setLegendSize: uy,
  setLegendSettings: OU,
  addLegendPayload: k1,
  removeLegendPayload: N1
} = _1.actions, PU = _1.reducer, AU = ["contextPayload"];
function df() {
  return df = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, df.apply(null, arguments);
}
function dy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function uo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dy(Object(r), !0).forEach(function(n) {
      eh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eh(e, t, r) {
  return (t = CU(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CU(e) {
  var t = TU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function TU(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _U(e, t) {
  if (e == null) return {};
  var r, n, o = kU(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function kU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function NU(e) {
  return e.value;
}
function RU(e) {
  var {
    contextPayload: t
  } = e, r = _U(e, AU), n = IP(t, e.payloadUniqBy, NU), o = uo(uo({}, r), {}, {
    payload: n
  });
  return /* @__PURE__ */ m.isValidElement(e.content) ? /* @__PURE__ */ m.cloneElement(e.content, o) : typeof e.content == "function" ? /* @__PURE__ */ m.createElement(e.content, o) : /* @__PURE__ */ m.createElement(Up, o);
}
function MU(e, t, r, n, o, a) {
  var {
    layout: i,
    align: s,
    verticalAlign: c
  } = t, u, l;
  return (!e || (e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null)) && (s === "center" && i === "vertical" ? u = {
    left: ((n || 0) - a.width) / 2
  } : u = s === "right" ? {
    right: r && r.right || 0
  } : {
    left: r && r.left || 0
  }), (!e || (e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null)) && (c === "middle" ? l = {
    top: ((o || 0) - a.height) / 2
  } : l = c === "bottom" ? {
    bottom: r && r.bottom || 0
  } : {
    top: r && r.top || 0
  }), uo(uo({}, u), l);
}
function IU(e) {
  var t = Re();
  return Le(() => {
    t(OU(e));
  }, [t, e]), null;
}
function DU(e) {
  var t = Re();
  return Le(() => (t(uy(e)), () => {
    t(uy({
      width: 0,
      height: 0
    }));
  }), [t, e]), null;
}
function jU(e) {
  var t = uF(), r = h$(), n = EU(), {
    width: o,
    height: a,
    wrapperStyle: i,
    portal: s
  } = e, [c, u] = FP([t]), l = Jp(), d = Qp();
  if (l == null || d == null)
    return null;
  var p = l - (n.left || 0) - (n.right || 0), f = Kn.getWidthOrHeight(e.layout, a, o, p), v = s ? i : uo(uo({
    position: "absolute",
    width: f?.width || o || "auto",
    height: f?.height || a || "auto"
  }, MU(i, e, n, l, d, c)), i), h = s ?? r;
  if (h == null)
    return null;
  var g = /* @__PURE__ */ m.createElement("div", {
    className: "recharts-legend-wrapper",
    style: v,
    ref: u
  }, /* @__PURE__ */ m.createElement(IU, {
    layout: e.layout,
    align: e.align,
    verticalAlign: e.verticalAlign,
    itemSorter: e.itemSorter
  }), /* @__PURE__ */ m.createElement(DU, {
    width: c.width,
    height: c.height
  }), /* @__PURE__ */ m.createElement(RU, df({}, e, f, {
    margin: n,
    chartWidth: l,
    chartHeight: d,
    contextPayload: t
  })));
  return /* @__PURE__ */ Ww(g, h);
}
class Kn extends xa {
  static getWidthOrHeight(t, r, n, o) {
    return t === "vertical" && Q(r) ? {
      height: r
    } : t === "horizontal" ? {
      width: n || o
    } : null;
  }
  render() {
    return /* @__PURE__ */ m.createElement(jU, this.props);
  }
}
eh(Kn, "displayName", "Legend");
eh(Kn, "defaultProps", {
  align: "center",
  iconSize: 14,
  itemSorter: "value",
  layout: "horizontal",
  verticalAlign: "bottom"
});
function ff() {
  return ff = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ff.apply(null, arguments);
}
function fy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fy(Object(r), !0).forEach(function(n) {
      LU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function LU(e, t, r) {
  return (t = $U(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $U(e) {
  var t = BU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function BU(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function FU(e) {
  return Array.isArray(e) && pr(e[0]) && pr(e[1]) ? e.join(" ~ ") : e;
}
var zU = (e) => {
  var {
    separator: t = " : ",
    contentStyle: r = {},
    itemStyle: n = {},
    labelStyle: o = {},
    payload: a,
    formatter: i,
    itemSorter: s,
    wrapperClassName: c,
    labelClassName: u,
    label: l,
    labelFormatter: d,
    accessibilityLayer: p = !1
  } = e, f = () => {
    if (a && a.length) {
      var E = {
        padding: 0,
        margin: 0
      }, O = (s ? Mc(a, s) : a).map((P, A) => {
        if (P.type === "none")
          return null;
        var _ = P.formatter || i || FU, {
          value: N,
          name: T
        } = P, R = N, j = T;
        if (_) {
          var C = _(N, T, P, A, a);
          if (Array.isArray(C))
            [R, j] = C;
          else if (C != null)
            R = C;
          else
            return null;
        }
        var D = qu({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: P.color || "#000"
        }, n);
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ m.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(A),
            style: D
          }, pr(j) ? /* @__PURE__ */ m.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, j) : null, pr(j) ? /* @__PURE__ */ m.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, t) : null, /* @__PURE__ */ m.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, R), /* @__PURE__ */ m.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, P.unit || ""))
        );
      });
      return /* @__PURE__ */ m.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: E
      }, O);
    }
    return null;
  }, v = qu({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, r), h = qu({
    margin: 0
  }, o), g = !Ce(l), y = g ? l : "", w = pe("recharts-default-tooltip", c), x = pe("recharts-tooltip-label", u);
  g && d && a !== void 0 && a !== null && (y = d(l, a));
  var S = p ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ m.createElement("div", ff({
    className: w,
    style: v
  }, S), /* @__PURE__ */ m.createElement("p", {
    className: x,
    style: h
  }, /* @__PURE__ */ m.isValidElement(y) ? y : "".concat(y)), f());
}, zo = "recharts-tooltip-wrapper", UU = {
  visibility: "hidden"
};
function WU(e) {
  var {
    coordinate: t,
    translateX: r,
    translateY: n
  } = e;
  return pe(zo, {
    ["".concat(zo, "-right")]: Q(r) && t && Q(t.x) && r >= t.x,
    ["".concat(zo, "-left")]: Q(r) && t && Q(t.x) && r < t.x,
    ["".concat(zo, "-bottom")]: Q(n) && t && Q(t.y) && n >= t.y,
    ["".concat(zo, "-top")]: Q(n) && t && Q(t.y) && n < t.y
  });
}
function py(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: r,
    key: n,
    offsetTopLeft: o,
    position: a,
    reverseDirection: i,
    tooltipDimension: s,
    viewBox: c,
    viewBoxDimension: u
  } = e;
  if (a && Q(a[n]))
    return a[n];
  var l = r[n] - s - (o > 0 ? o : 0), d = r[n] + o;
  if (t[n])
    return i[n] ? l : d;
  var p = c[n];
  if (p == null)
    return 0;
  if (i[n]) {
    var f = l, v = p;
    return f < v ? Math.max(d, p) : Math.max(l, p);
  }
  if (u == null)
    return 0;
  var h = d + s, g = p + u;
  return h > g ? Math.max(l, p) : Math.max(d, p);
}
function KU(e) {
  var {
    translateX: t,
    translateY: r,
    useTranslate3d: n
  } = e;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function VU(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: r,
    offsetTopLeft: n,
    position: o,
    reverseDirection: a,
    tooltipBox: i,
    useTranslate3d: s,
    viewBox: c
  } = e, u, l, d;
  return i.height > 0 && i.width > 0 && r ? (l = py({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: o,
    reverseDirection: a,
    tooltipDimension: i.width,
    viewBox: c,
    viewBoxDimension: c.width
  }), d = py({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: o,
    reverseDirection: a,
    tooltipDimension: i.height,
    viewBox: c,
    viewBoxDimension: c.height
  }), u = KU({
    translateX: l,
    translateY: d,
    useTranslate3d: s
  })) : u = UU, {
    cssProperties: u,
    cssClasses: WU({
      translateX: l,
      translateY: d,
      coordinate: r
    })
  };
}
function hy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hy(Object(r), !0).forEach(function(n) {
      pf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pf(e, t, r) {
  return (t = qU(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qU(e) {
  var t = HU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HU(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class GU extends xa {
  constructor() {
    super(...arguments), pf(this, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      }
    }), pf(this, "handleKeyDown", (t) => {
      if (t.key === "Escape") {
        var r, n, o, a;
        this.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (r = (n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== null && r !== void 0 ? r : 0,
            y: (o = (a = this.props.coordinate) === null || a === void 0 ? void 0 : a.y) !== null && o !== void 0 ? o : 0
          }
        });
      }
    });
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  componentDidUpdate() {
    var t, r;
    this.state.dismissed && (((t = this.props.coordinate) === null || t === void 0 ? void 0 : t.x) !== this.state.dismissedAtCoordinate.x || ((r = this.props.coordinate) === null || r === void 0 ? void 0 : r.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1);
  }
  render() {
    var {
      active: t,
      allowEscapeViewBox: r,
      animationDuration: n,
      animationEasing: o,
      children: a,
      coordinate: i,
      hasPayload: s,
      isAnimationActive: c,
      offset: u,
      position: l,
      reverseDirection: d,
      useTranslate3d: p,
      viewBox: f,
      wrapperStyle: v,
      lastBoundingBox: h,
      innerRef: g,
      hasPortalFromProps: y
    } = this.props, {
      cssClasses: w,
      cssProperties: x
    } = VU({
      allowEscapeViewBox: r,
      coordinate: i,
      offsetTopLeft: u,
      position: l,
      reverseDirection: d,
      tooltipBox: {
        height: h.height,
        width: h.width
      },
      useTranslate3d: p,
      viewBox: f
    }), S = y ? {} : Pi(Pi({
      transition: c && t ? "transform ".concat(n, "ms ").concat(o) : void 0
    }, x), {}, {
      pointerEvents: "none",
      visibility: !this.state.dismissed && t && s ? "visible" : "hidden",
      position: "absolute",
      top: 0,
      left: 0
    }), E = Pi(Pi({}, S), {}, {
      visibility: !this.state.dismissed && t && s ? "visible" : "hidden"
    }, v);
    return (
      // This element allow listening to the `Escape` key. See https://github.com/recharts/recharts/pull/2925
      /* @__PURE__ */ m.createElement("div", {
        // @ts-expect-error typescript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
        xmlns: "http://www.w3.org/1999/xhtml",
        tabIndex: -1,
        className: w,
        style: E,
        ref: g
      }, a)
    );
  }
}
var YU = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), Lr = {
  devToolsEnabled: !1,
  isSsr: YU()
}, R1 = () => ee((e) => e.rootProps.accessibilityLayer);
function hf() {
  return hf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, hf.apply(null, arguments);
}
function my(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? my(Object(r), !0).forEach(function(n) {
      XU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : my(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XU(e, t, r) {
  return (t = ZU(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ZU(e) {
  var t = JU(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JU(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var gy = {
  curveBasisClosed: M$,
  curveBasisOpen: I$,
  curveBasis: R$,
  curveBumpX: y$,
  curveBumpY: b$,
  curveLinearClosed: D$,
  curveLinear: Nc,
  curveMonotoneX: j$,
  curveMonotoneY: L$,
  curveNatural: $$,
  curveStep: B$,
  curveStepAfter: z$,
  curveStepBefore: F$
}, Ai = (e) => We(e.x) && We(e.y), Uo = (e) => e.x, Wo = (e) => e.y, QU = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(ja(e));
  return (r === "curveMonotone" || r === "curveBump") && t ? gy["".concat(r).concat(t === "vertical" ? "Y" : "X")] : gy[r] || Nc;
}, e4 = (e) => {
  var {
    type: t = "linear",
    points: r = [],
    baseLine: n,
    layout: o,
    connectNulls: a = !1
  } = e, i = QU(t, o), s = a ? r.filter(Ai) : r, c;
  if (Array.isArray(n)) {
    var u = a ? n.filter((d) => Ai(d)) : n, l = s.map((d, p) => vy(vy({}, d), {}, {
      base: u[p]
    }));
    return o === "vertical" ? c = mi().y(Wo).x1(Uo).x0((d) => d.base.x) : c = mi().x(Uo).y1(Wo).y0((d) => d.base.y), c.defined(Ai).curve(i), c(l);
  }
  return o === "vertical" && Q(n) ? c = mi().y(Wo).x1(Uo).x0(n) : Q(n) ? c = mi().x(Uo).y1(Wo).y0(n) : c = uP().x(Uo).y(Wo), c.defined(Ai).curve(i), c(s);
}, no = (e) => {
  var {
    className: t,
    points: r,
    path: n,
    pathRef: o
  } = e;
  if ((!r || !r.length) && !n)
    return null;
  var a = r && r.length ? e4(e) : n;
  return /* @__PURE__ */ m.createElement("path", hf({}, ht(e), Fp(e), {
    className: pe("recharts-curve", t),
    d: a === null ? void 0 : a,
    ref: o
  }));
}, t4 = ["x", "y", "top", "left", "width", "height", "className"];
function mf() {
  return mf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, mf.apply(null, arguments);
}
function yy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function r4(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yy(Object(r), !0).forEach(function(n) {
      n4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function n4(e, t, r) {
  return (t = o4(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function o4(e) {
  var t = a4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function a4(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function i4(e, t) {
  if (e == null) return {};
  var r, n, o = s4(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function s4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var c4 = (e, t, r, n, o, a) => "M".concat(e, ",").concat(o, "v").concat(n, "M").concat(a, ",").concat(t, "h").concat(r), l4 = (e) => {
  var {
    x: t = 0,
    y: r = 0,
    top: n = 0,
    left: o = 0,
    width: a = 0,
    height: i = 0,
    className: s
  } = e, c = i4(e, t4), u = r4({
    x: t,
    y: r,
    top: n,
    left: o,
    width: a,
    height: i
  }, c);
  return !Q(t) || !Q(r) || !Q(a) || !Q(i) || !Q(n) || !Q(o) ? null : /* @__PURE__ */ m.createElement("path", mf({}, mt(u), {
    className: pe("recharts-cross", s),
    d: c4(t, r, a, i, n, o)
  }));
};
function u4(e, t, r, n) {
  var o = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - o : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - o,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
function by(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function d4(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? by(Object(r), !0).forEach(function(n) {
      f4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : by(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function f4(e, t, r) {
  return (t = p4(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function p4(e) {
  var t = h4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function h4(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ge(e, t) {
  var r = d4({}, e), n = t, o = Object.keys(t), a = o.reduce((i, s) => (i[s] === void 0 && n[s] !== void 0 && (i[s] = n[s]), i), r);
  return a;
}
function m4() {
}
function v4(e) {
  return e != null;
}
function wy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wy(Object(r), !0).forEach(function(n) {
      g4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function g4(e, t, r) {
  return (t = y4(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function y4(e) {
  var t = b4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function b4(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var w4 = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), M1 = (e, t, r) => e.map((n) => "".concat(w4(n), " ").concat(t, "ms ").concat(r)).join(","), x4 = (e, t) => [Object.keys(e), Object.keys(t)].reduce((r, n) => r.filter((o) => n.includes(o))), pa = (e, t) => Object.keys(t).reduce((r, n) => xy(xy({}, r), {}, {
  [n]: e(n, t[n])
}), {});
function Ey(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function rt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ey(Object(r), !0).forEach(function(n) {
      E4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ey(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function E4(e, t, r) {
  return (t = S4(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function S4(e) {
  var t = O4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function O4(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ys = (e, t, r) => e + (t - e) * r, vf = (e) => {
  var {
    from: t,
    to: r
  } = e;
  return t !== r;
}, I1 = (e, t, r) => {
  var n = pa((o, a) => {
    if (vf(a)) {
      var [i, s] = e(a.from, a.to, a.velocity);
      return rt(rt({}, a), {}, {
        from: i,
        velocity: s
      });
    }
    return a;
  }, t);
  return r < 1 ? pa((o, a) => vf(a) ? rt(rt({}, a), {}, {
    velocity: ys(a.velocity, n[o].velocity, r),
    from: ys(a.from, n[o].from, r)
  }) : a, t) : I1(e, n, r - 1);
};
function P4(e, t, r, n, o, a) {
  var i, s = n.reduce((p, f) => rt(rt({}, p), {}, {
    [f]: {
      from: e[f],
      velocity: 0,
      to: t[f]
    }
  }), {}), c = () => pa((p, f) => f.from, s), u = () => !Object.values(s).filter(vf).length, l = null, d = (p) => {
    i || (i = p);
    var f = p - i, v = f / r.dt;
    s = I1(r, s, v), o(rt(rt(rt({}, e), t), c())), i = p, u() || (l = a.setTimeout(d));
  };
  return () => (l = a.setTimeout(d), () => {
    l();
  });
}
function A4(e, t, r, n, o, a, i) {
  var s = null, c = o.reduce((d, p) => rt(rt({}, d), {}, {
    [p]: [e[p], t[p]]
  }), {}), u, l = (d) => {
    u || (u = d);
    var p = (d - u) / n, f = pa((h, g) => ys(...g, r(p)), c);
    if (a(rt(rt(rt({}, e), t), f)), p < 1)
      s = i.setTimeout(l);
    else {
      var v = pa((h, g) => ys(...g, r(1)), c);
      a(rt(rt(rt({}, e), t), v));
    }
  };
  return () => (s = i.setTimeout(l), () => {
    s();
  });
}
const C4 = (e, t, r, n, o, a) => {
  var i = x4(e, t);
  return r.isStepper === !0 ? P4(e, t, r, i, o, a) : A4(e, t, r, n, i, o, a);
};
var bs = 1e-4, D1 = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], j1 = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), Sy = (e, t) => (r) => {
  var n = D1(e, t);
  return j1(n, r);
}, T4 = (e, t) => (r) => {
  var n = D1(e, t), o = [...n.map((a, i) => a * i).slice(1), 0];
  return j1(o, r);
}, Oy = function() {
  for (var t, r, n, o, a = arguments.length, i = new Array(a), s = 0; s < a; s++)
    i[s] = arguments[s];
  if (i.length === 1)
    switch (i[0]) {
      case "linear":
        [t, n, r, o] = [0, 0, 1, 1];
        break;
      case "ease":
        [t, n, r, o] = [0.25, 0.1, 0.25, 1];
        break;
      case "ease-in":
        [t, n, r, o] = [0.42, 0, 1, 1];
        break;
      case "ease-out":
        [t, n, r, o] = [0.42, 0, 0.58, 1];
        break;
      case "ease-in-out":
        [t, n, r, o] = [0, 0, 0.58, 1];
        break;
      default: {
        var c = i[0].split("(");
        c[0] === "cubic-bezier" && c[1].split(")")[0].split(",").length === 4 && ([t, n, r, o] = c[1].split(")")[0].split(",").map((v) => parseFloat(v)));
      }
    }
  else i.length === 4 && ([t, n, r, o] = i);
  var u = Sy(t, r), l = Sy(n, o), d = T4(t, r), p = (v) => v > 1 ? 1 : v < 0 ? 0 : v, f = (v) => {
    for (var h = v > 1 ? 1 : v, g = h, y = 0; y < 8; ++y) {
      var w = u(g) - h, x = d(g);
      if (Math.abs(w - h) < bs || x < bs)
        return l(g);
      g = p(g - w / x);
    }
    return l(g);
  };
  return f.isStepper = !1, f;
}, _4 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, {
    stiff: r = 100,
    damping: n = 8,
    dt: o = 17
  } = t, a = (i, s, c) => {
    var u = -(i - s) * r, l = c * n, d = c + (u - l) * o / 1e3, p = c * o / 1e3 + i;
    return Math.abs(p - s) < bs && Math.abs(d) < bs ? [s, 0] : [p, d];
  };
  return a.isStepper = !0, a.dt = o, a;
}, k4 = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return Oy(e);
      case "spring":
        return _4();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return Oy(e);
    }
  return typeof e == "function" ? e : null;
};
function N4(e) {
  var t, r = () => null, n = !1, o = null, a = (i) => {
    if (!n) {
      if (Array.isArray(i)) {
        if (!i.length)
          return;
        var s = i, [c, ...u] = s;
        if (typeof c == "number") {
          o = e.setTimeout(a.bind(null, u), c);
          return;
        }
        a(c), o = e.setTimeout(a.bind(null, u));
        return;
      }
      typeof i == "string" && (t = i, r(t)), typeof i == "object" && (t = i, r(t)), typeof i == "function" && i();
    }
  };
  return {
    stop: () => {
      n = !0;
    },
    start: (i) => {
      n = !1, o && (o(), o = null), a(i);
    },
    subscribe: (i) => (r = i, () => {
      r = () => null;
    }),
    getTimeoutController: () => e
  };
}
class R4 {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), o = null, a = (i) => {
      i - n >= r ? t(i) : typeof requestAnimationFrame == "function" && (o = requestAnimationFrame(a));
    };
    return o = requestAnimationFrame(a), () => {
      cancelAnimationFrame(o);
    };
  }
}
function M4() {
  return N4(new R4());
}
var I4 = /* @__PURE__ */ Dt(M4);
function D4(e, t) {
  var r = er(I4);
  return tr(() => t ?? r(e), [e, t, r]);
}
var j4 = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, Py = {
  t: 0
}, Hu = {
  t: 1
};
function Co(e) {
  var t = Ge(e, j4), {
    isActive: r,
    canBegin: n,
    duration: o,
    easing: a,
    begin: i,
    onAnimationEnd: s,
    onAnimationStart: c,
    children: u
  } = t, l = D4(t.animationId, t.animationManager), [d, p] = je(r ? Py : Hu), f = ye(null);
  return Le(() => {
    r || p(Hu);
  }, [r]), Le(() => {
    if (!r || !n)
      return m4;
    var v = C4(Py, Hu, k4(a), o, p, l.getTimeoutController()), h = () => {
      f.current = v();
    };
    return l.start([c, i, h, o, s]), () => {
      l.stop(), f.current && f.current(), s();
    };
  }, [r, n, o, a, i, c, s, l]), u(d.t);
}
function To(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = ye(la(t)), n = ye(e);
  return n.current !== e && (r.current = la(t), n.current = e), r.current;
}
var L4 = ["radius"], $4 = ["radius"];
function Ay(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Cy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ay(Object(r), !0).forEach(function(n) {
      B4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ay(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function B4(e, t, r) {
  return (t = F4(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function F4(e) {
  var t = z4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function z4(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ws() {
  return ws = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ws.apply(null, arguments);
}
function Ty(e, t) {
  if (e == null) return {};
  var r, n, o = U4(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function U4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var _y = (e, t, r, n, o) => {
  var a = Math.min(Math.abs(r) / 2, Math.abs(n) / 2), i = n >= 0 ? 1 : -1, s = r >= 0 ? 1 : -1, c = n >= 0 && r >= 0 || n < 0 && r < 0 ? 1 : 0, u;
  if (a > 0 && o instanceof Array) {
    for (var l = [0, 0, 0, 0], d = 0, p = 4; d < p; d++)
      l[d] = o[d] > a ? a : o[d];
    u = "M".concat(e, ",").concat(t + i * l[0]), l[0] > 0 && (u += "A ".concat(l[0], ",").concat(l[0], ",0,0,").concat(c, ",").concat(e + s * l[0], ",").concat(t)), u += "L ".concat(e + r - s * l[1], ",").concat(t), l[1] > 0 && (u += "A ".concat(l[1], ",").concat(l[1], ",0,0,").concat(c, `,
        `).concat(e + r, ",").concat(t + i * l[1])), u += "L ".concat(e + r, ",").concat(t + n - i * l[2]), l[2] > 0 && (u += "A ".concat(l[2], ",").concat(l[2], ",0,0,").concat(c, `,
        `).concat(e + r - s * l[2], ",").concat(t + n)), u += "L ".concat(e + s * l[3], ",").concat(t + n), l[3] > 0 && (u += "A ".concat(l[3], ",").concat(l[3], ",0,0,").concat(c, `,
        `).concat(e, ",").concat(t + n - i * l[3])), u += "Z";
  } else if (a > 0 && o === +o && o > 0) {
    var f = Math.min(a, o);
    u = "M ".concat(e, ",").concat(t + i * f, `
            A `).concat(f, ",").concat(f, ",0,0,").concat(c, ",").concat(e + s * f, ",").concat(t, `
            L `).concat(e + r - s * f, ",").concat(t, `
            A `).concat(f, ",").concat(f, ",0,0,").concat(c, ",").concat(e + r, ",").concat(t + i * f, `
            L `).concat(e + r, ",").concat(t + n - i * f, `
            A `).concat(f, ",").concat(f, ",0,0,").concat(c, ",").concat(e + r - s * f, ",").concat(t + n, `
            L `).concat(e + s * f, ",").concat(t + n, `
            A `).concat(f, ",").concat(f, ",0,0,").concat(c, ",").concat(e, ",").concat(t + n - i * f, " Z");
  } else
    u = "M ".concat(e, ",").concat(t, " h ").concat(r, " v ").concat(n, " h ").concat(-r, " Z");
  return u;
}, W4 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, L1 = (e) => {
  var t = Ge(e, W4), r = ye(null), [n, o] = je(-1);
  Le(() => {
    if (r.current && r.current.getTotalLength)
      try {
        var z = r.current.getTotalLength();
        z && o(z);
      } catch {
      }
  }, []);
  var {
    x: a,
    y: i,
    width: s,
    height: c,
    radius: u,
    className: l
  } = t, {
    animationEasing: d,
    animationDuration: p,
    animationBegin: f,
    isAnimationActive: v,
    isUpdateAnimationActive: h
  } = t, g = ye(s), y = ye(c), w = ye(a), x = ye(i), S = tr(() => ({
    x: a,
    y: i,
    width: s,
    height: c,
    radius: u
  }), [a, i, s, c, u]), E = To(S, "rectangle-");
  if (a !== +a || i !== +i || s !== +s || c !== +c || s === 0 || c === 0)
    return null;
  var O = pe("recharts-rectangle", l);
  if (!h) {
    var P = mt(t), {
      radius: A
    } = P, _ = Ty(P, L4);
    return /* @__PURE__ */ m.createElement("path", ws({}, _, {
      radius: typeof u == "number" ? u : void 0,
      className: O,
      d: _y(a, i, s, c, u)
    }));
  }
  var N = g.current, T = y.current, R = w.current, j = x.current, C = "0px ".concat(n === -1 ? 1 : n, "px"), D = "".concat(n, "px 0px"), $ = M1(["strokeDasharray"], p, typeof d == "string" ? d : void 0);
  return /* @__PURE__ */ m.createElement(Co, {
    animationId: E,
    key: E,
    canBegin: n > 0,
    duration: p,
    easing: d,
    isActive: h,
    begin: f
  }, (z) => {
    var I = Ee(N, s, z), F = Ee(T, c, z), oe = Ee(R, a, z), H = Ee(j, i, z);
    r.current && (g.current = I, y.current = F, w.current = oe, x.current = H);
    var ie;
    v ? z > 0 ? ie = {
      transition: $,
      strokeDasharray: D
    } : ie = {
      strokeDasharray: C
    } : ie = {
      strokeDasharray: D
    };
    var ae = mt(t), {
      radius: W
    } = ae, te = Ty(ae, $4);
    return /* @__PURE__ */ m.createElement("path", ws({}, te, {
      radius: typeof u == "number" ? u : void 0,
      className: O,
      d: _y(oe, H, I, F, u),
      ref: r,
      style: Cy(Cy({}, ie), t.style)
    }));
  });
};
function $1(e) {
  var {
    cx: t,
    cy: r,
    radius: n,
    startAngle: o,
    endAngle: a
  } = e, i = ze(t, r, n, o), s = ze(t, r, n, a);
  return {
    points: [i, s],
    cx: t,
    cy: r,
    radius: n,
    startAngle: o,
    endAngle: a
  };
}
function gf() {
  return gf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gf.apply(null, arguments);
}
var K4 = (e, t) => {
  var r = Qe(t - e), n = Math.min(Math.abs(t - e), 359.999);
  return r * n;
}, Ci = (e) => {
  var {
    cx: t,
    cy: r,
    radius: n,
    angle: o,
    sign: a,
    isExternal: i,
    cornerRadius: s,
    cornerIsExternal: c
  } = e, u = s * (i ? 1 : -1) + n, l = Math.asin(s / u) / ms, d = c ? o : o + a * l, p = ze(t, r, u, d), f = ze(t, r, n, d), v = c ? o - a * l : o, h = ze(t, r, u * Math.cos(l * ms), v);
  return {
    center: p,
    circleTangency: f,
    lineTangency: h,
    theta: l
  };
}, B1 = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: o,
    startAngle: a,
    endAngle: i
  } = e, s = K4(a, i), c = a + s, u = ze(t, r, o, a), l = ze(t, r, o, c), d = "M ".concat(u.x, ",").concat(u.y, `
    A `).concat(o, ",").concat(o, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(a > c), `,
    `).concat(l.x, ",").concat(l.y, `
  `);
  if (n > 0) {
    var p = ze(t, r, n, a), f = ze(t, r, n, c);
    d += "L ".concat(f.x, ",").concat(f.y, `
            A `).concat(n, ",").concat(n, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(a <= c), `,
            `).concat(p.x, ",").concat(p.y, " Z");
  } else
    d += "L ".concat(t, ",").concat(r, " Z");
  return d;
}, V4 = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: o,
    cornerRadius: a,
    forceCornerRadius: i,
    cornerIsExternal: s,
    startAngle: c,
    endAngle: u
  } = e, l = Qe(u - c), {
    circleTangency: d,
    lineTangency: p,
    theta: f
  } = Ci({
    cx: t,
    cy: r,
    radius: o,
    angle: c,
    sign: l,
    cornerRadius: a,
    cornerIsExternal: s
  }), {
    circleTangency: v,
    lineTangency: h,
    theta: g
  } = Ci({
    cx: t,
    cy: r,
    radius: o,
    angle: u,
    sign: -l,
    cornerRadius: a,
    cornerIsExternal: s
  }), y = s ? Math.abs(c - u) : Math.abs(c - u) - f - g;
  if (y < 0)
    return i ? "M ".concat(p.x, ",").concat(p.y, `
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(a * 2, `,0
        a`).concat(a, ",").concat(a, ",0,0,1,").concat(-a * 2, `,0
      `) : B1({
      cx: t,
      cy: r,
      innerRadius: n,
      outerRadius: o,
      startAngle: c,
      endAngle: u
    });
  var w = "M ".concat(p.x, ",").concat(p.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(l < 0), ",").concat(d.x, ",").concat(d.y, `
    A`).concat(o, ",").concat(o, ",0,").concat(+(y > 180), ",").concat(+(l < 0), ",").concat(v.x, ",").concat(v.y, `
    A`).concat(a, ",").concat(a, ",0,0,").concat(+(l < 0), ",").concat(h.x, ",").concat(h.y, `
  `);
  if (n > 0) {
    var {
      circleTangency: x,
      lineTangency: S,
      theta: E
    } = Ci({
      cx: t,
      cy: r,
      radius: n,
      angle: c,
      sign: l,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: s
    }), {
      circleTangency: O,
      lineTangency: P,
      theta: A
    } = Ci({
      cx: t,
      cy: r,
      radius: n,
      angle: u,
      sign: -l,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: s
    }), _ = s ? Math.abs(c - u) : Math.abs(c - u) - E - A;
    if (_ < 0 && a === 0)
      return "".concat(w, "L").concat(t, ",").concat(r, "Z");
    w += "L".concat(P.x, ",").concat(P.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(l < 0), ",").concat(O.x, ",").concat(O.y, `
      A`).concat(n, ",").concat(n, ",0,").concat(+(_ > 180), ",").concat(+(l > 0), ",").concat(x.x, ",").concat(x.y, `
      A`).concat(a, ",").concat(a, ",0,0,").concat(+(l < 0), ",").concat(S.x, ",").concat(S.y, "Z");
  } else
    w += "L".concat(t, ",").concat(r, "Z");
  return w;
}, q4 = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, F1 = (e) => {
  var t = Ge(e, q4), {
    cx: r,
    cy: n,
    innerRadius: o,
    outerRadius: a,
    cornerRadius: i,
    forceCornerRadius: s,
    cornerIsExternal: c,
    startAngle: u,
    endAngle: l,
    className: d
  } = t;
  if (a < o || u === l)
    return null;
  var p = pe("recharts-sector", d), f = a - o, v = ct(i, f, 0, !0), h;
  return v > 0 && Math.abs(u - l) < 360 ? h = V4({
    cx: r,
    cy: n,
    innerRadius: o,
    outerRadius: a,
    cornerRadius: Math.min(v, f / 2),
    forceCornerRadius: s,
    cornerIsExternal: c,
    startAngle: u,
    endAngle: l
  }) : h = B1({
    cx: r,
    cy: n,
    innerRadius: o,
    outerRadius: a,
    startAngle: u,
    endAngle: l
  }), /* @__PURE__ */ m.createElement("path", gf({}, mt(t), {
    className: p,
    d: h
  }));
};
function H4(e, t, r) {
  var n, o, a, i;
  if (e === "horizontal")
    n = t.x, a = n, o = r.top, i = r.top + r.height;
  else if (e === "vertical")
    o = t.y, i = o, n = r.left, a = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var {
        cx: s,
        cy: c,
        innerRadius: u,
        outerRadius: l,
        angle: d
      } = t, p = ze(s, c, u, d), f = ze(s, c, l, d);
      n = p.x, o = p.y, a = f.x, i = f.y;
    } else
      return $1(t);
  return [{
    x: n,
    y: o
  }, {
    x: a,
    y: i
  }];
}
var Gu = {}, Yu = {}, Xu = {}, ky;
function G4() {
  return ky || (ky = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ LP();
    function r(n) {
      return t.isSymbol(n) ? NaN : Number(n);
    }
    e.toNumber = r;
  })(Xu)), Xu;
}
var Ny;
function Y4() {
  return Ny || (Ny = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ G4();
    function r(n) {
      return n ? (n = t.toNumber(n), n === 1 / 0 || n === -1 / 0 ? (n < 0 ? -1 : 1) * Number.MAX_VALUE : n === n ? n : 0) : n === 0 ? n : 0;
    }
    e.toFinite = r;
  })(Yu)), Yu;
}
var Ry;
function X4() {
  return Ry || (Ry = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ $P(), r = /* @__PURE__ */ Y4();
    function n(o, a, i) {
      i && typeof i != "number" && t.isIterateeCall(o, a, i) && (a = i = void 0), o = r.toFinite(o), a === void 0 ? (a = o, o = 0) : a = r.toFinite(a), i = i === void 0 ? o < a ? 1 : -1 : r.toFinite(i);
      const s = Math.max(Math.ceil((a - o) / (i || 1)), 0), c = new Array(s);
      for (let u = 0; u < s; u++)
        c[u] = o, o += i;
      return c;
    }
    e.range = n;
  })(Gu)), Gu;
}
var Zu, My;
function Z4() {
  return My || (My = 1, Zu = X4().range), Zu;
}
var J4 = /* @__PURE__ */ Z4();
const z1 = /* @__PURE__ */ sn(J4);
function Zr(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Q4(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function th(e) {
  let t, r, n;
  e.length !== 2 ? (t = Zr, r = (s, c) => Zr(e(s), c), n = (s, c) => e(s) - c) : (t = e === Zr || e === Q4 ? e : eW, r = e, n = e);
  function o(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l;
      do {
        const d = u + l >>> 1;
        r(s[d], c) < 0 ? u = d + 1 : l = d;
      } while (u < l);
    }
    return u;
  }
  function a(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l;
      do {
        const d = u + l >>> 1;
        r(s[d], c) <= 0 ? u = d + 1 : l = d;
      } while (u < l);
    }
    return u;
  }
  function i(s, c, u = 0, l = s.length) {
    const d = o(s, c, u, l - 1);
    return d > u && n(s[d - 1], c) > -n(s[d], c) ? d - 1 : d;
  }
  return { left: o, center: i, right: a };
}
function eW() {
  return 0;
}
function U1(e) {
  return e === null ? NaN : +e;
}
function* tW(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const rW = th(Zr), Ka = rW.right;
th(U1).center;
class Iy extends Map {
  constructor(t, r = aW) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, o] of t) this.set(n, o);
  }
  get(t) {
    return super.get(Dy(this, t));
  }
  has(t) {
    return super.has(Dy(this, t));
  }
  set(t, r) {
    return super.set(nW(this, t), r);
  }
  delete(t) {
    return super.delete(oW(this, t));
  }
}
function Dy({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function nW({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function oW({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function aW(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function iW(e = Zr) {
  if (e === Zr) return W1;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function W1(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const sW = Math.sqrt(50), cW = Math.sqrt(10), lW = Math.sqrt(2);
function xs(e, t, r) {
  const n = (t - e) / Math.max(0, r), o = Math.floor(Math.log10(n)), a = n / Math.pow(10, o), i = a >= sW ? 10 : a >= cW ? 5 : a >= lW ? 2 : 1;
  let s, c, u;
  return o < 0 ? (u = Math.pow(10, -o) / i, s = Math.round(e * u), c = Math.round(t * u), s / u < e && ++s, c / u > t && --c, u = -u) : (u = Math.pow(10, o) * i, s = Math.round(e / u), c = Math.round(t / u), s * u < e && ++s, c * u > t && --c), c < s && 0.5 <= r && r < 2 ? xs(e, t, r * 2) : [s, c, u];
}
function yf(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [o, a, i] = n ? xs(t, e, r) : xs(e, t, r);
  if (!(a >= o)) return [];
  const s = a - o + 1, c = new Array(s);
  if (n)
    if (i < 0) for (let u = 0; u < s; ++u) c[u] = (a - u) / -i;
    else for (let u = 0; u < s; ++u) c[u] = (a - u) * i;
  else if (i < 0) for (let u = 0; u < s; ++u) c[u] = (o + u) / -i;
  else for (let u = 0; u < s; ++u) c[u] = (o + u) * i;
  return c;
}
function bf(e, t, r) {
  return t = +t, e = +e, r = +r, xs(e, t, r)[2];
}
function wf(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, o = n ? bf(t, e, r) : bf(e, t, r);
  return (n ? -1 : 1) * (o < 0 ? 1 / -o : o);
}
function jy(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Ly(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function K1(e, t, r = 0, n = 1 / 0, o) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (o = o === void 0 ? W1 : iW(o); n > r; ) {
    if (n - r > 600) {
      const c = n - r + 1, u = t - r + 1, l = Math.log(c), d = 0.5 * Math.exp(2 * l / 3), p = 0.5 * Math.sqrt(l * d * (c - d) / c) * (u - c / 2 < 0 ? -1 : 1), f = Math.max(r, Math.floor(t - u * d / c + p)), v = Math.min(n, Math.floor(t + (c - u) * d / c + p));
      K1(e, t, f, v, o);
    }
    const a = e[t];
    let i = r, s = n;
    for (Ko(e, r, t), o(e[n], a) > 0 && Ko(e, r, n); i < s; ) {
      for (Ko(e, i, s), ++i, --s; o(e[i], a) < 0; ) ++i;
      for (; o(e[s], a) > 0; ) --s;
    }
    o(e[r], a) === 0 ? Ko(e, r, s) : (++s, Ko(e, s, n)), s <= t && (r = s + 1), t <= s && (n = s - 1);
  }
  return e;
}
function Ko(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function uW(e, t, r) {
  if (e = Float64Array.from(tW(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Ly(e);
    if (t >= 1) return jy(e);
    var n, o = (n - 1) * t, a = Math.floor(o), i = jy(K1(e, a).subarray(0, a + 1)), s = Ly(e.subarray(a + 1));
    return i + (s - i) * (o - a);
  }
}
function dW(e, t, r = U1) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, o = (n - 1) * t, a = Math.floor(o), i = +r(e[a], a, e), s = +r(e[a + 1], a + 1, e);
    return i + (s - i) * (o - a);
  }
}
function fW(e, t, r) {
  e = +e, t = +t, r = (o = arguments.length) < 2 ? (t = e, e = 0, 1) : o < 3 ? 1 : +r;
  for (var n = -1, o = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(o); ++n < o; )
    a[n] = e + n * r;
  return a;
}
function Yt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function $r(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const xf = Symbol("implicit");
function rh() {
  var e = new Iy(), t = [], r = [], n = xf;
  function o(a) {
    let i = e.get(a);
    if (i === void 0) {
      if (n !== xf) return n;
      e.set(a, i = t.push(a) - 1);
    }
    return r[i % r.length];
  }
  return o.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new Iy();
    for (const i of a)
      e.has(i) || e.set(i, t.push(i) - 1);
    return o;
  }, o.range = function(a) {
    return arguments.length ? (r = Array.from(a), o) : r.slice();
  }, o.unknown = function(a) {
    return arguments.length ? (n = a, o) : n;
  }, o.copy = function() {
    return rh(t, r).unknown(n);
  }, Yt.apply(o, arguments), o;
}
function nh() {
  var e = rh().unknown(void 0), t = e.domain, r = e.range, n = 0, o = 1, a, i, s = !1, c = 0, u = 0, l = 0.5;
  delete e.unknown;
  function d() {
    var p = t().length, f = o < n, v = f ? o : n, h = f ? n : o;
    a = (h - v) / Math.max(1, p - c + u * 2), s && (a = Math.floor(a)), v += (h - v - a * (p - c)) * l, i = a * (1 - c), s && (v = Math.round(v), i = Math.round(i));
    var g = fW(p).map(function(y) {
      return v + a * y;
    });
    return r(f ? g.reverse() : g);
  }
  return e.domain = function(p) {
    return arguments.length ? (t(p), d()) : t();
  }, e.range = function(p) {
    return arguments.length ? ([n, o] = p, n = +n, o = +o, d()) : [n, o];
  }, e.rangeRound = function(p) {
    return [n, o] = p, n = +n, o = +o, s = !0, d();
  }, e.bandwidth = function() {
    return i;
  }, e.step = function() {
    return a;
  }, e.round = function(p) {
    return arguments.length ? (s = !!p, d()) : s;
  }, e.padding = function(p) {
    return arguments.length ? (c = Math.min(1, u = +p), d()) : c;
  }, e.paddingInner = function(p) {
    return arguments.length ? (c = Math.min(1, p), d()) : c;
  }, e.paddingOuter = function(p) {
    return arguments.length ? (u = +p, d()) : u;
  }, e.align = function(p) {
    return arguments.length ? (l = Math.max(0, Math.min(1, p)), d()) : l;
  }, e.copy = function() {
    return nh(t(), [n, o]).round(s).paddingInner(c).paddingOuter(u).align(l);
  }, Yt.apply(d(), arguments);
}
function V1(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return V1(t());
  }, e;
}
function pW() {
  return V1(nh.apply(null, arguments).paddingInner(1));
}
function oh(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function q1(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Va() {
}
var ha = 0.7, Es = 1 / ha, oo = "\\s*([+-]?\\d+)\\s*", ma = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ur = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", hW = /^#([0-9a-f]{3,8})$/, mW = new RegExp(`^rgb\\(${oo},${oo},${oo}\\)$`), vW = new RegExp(`^rgb\\(${ur},${ur},${ur}\\)$`), gW = new RegExp(`^rgba\\(${oo},${oo},${oo},${ma}\\)$`), yW = new RegExp(`^rgba\\(${ur},${ur},${ur},${ma}\\)$`), bW = new RegExp(`^hsl\\(${ma},${ur},${ur}\\)$`), wW = new RegExp(`^hsla\\(${ma},${ur},${ur},${ma}\\)$`), $y = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
oh(Va, va, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: By,
  // Deprecated! Use color.formatHex.
  formatHex: By,
  formatHex8: xW,
  formatHsl: EW,
  formatRgb: Fy,
  toString: Fy
});
function By() {
  return this.rgb().formatHex();
}
function xW() {
  return this.rgb().formatHex8();
}
function EW() {
  return H1(this).formatHsl();
}
function Fy() {
  return this.rgb().formatRgb();
}
function va(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = hW.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? zy(t) : r === 3 ? new bt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Ti(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Ti(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = mW.exec(e)) ? new bt(t[1], t[2], t[3], 1) : (t = vW.exec(e)) ? new bt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = gW.exec(e)) ? Ti(t[1], t[2], t[3], t[4]) : (t = yW.exec(e)) ? Ti(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = bW.exec(e)) ? Ky(t[1], t[2] / 100, t[3] / 100, 1) : (t = wW.exec(e)) ? Ky(t[1], t[2] / 100, t[3] / 100, t[4]) : $y.hasOwnProperty(e) ? zy($y[e]) : e === "transparent" ? new bt(NaN, NaN, NaN, 0) : null;
}
function zy(e) {
  return new bt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ti(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new bt(e, t, r, n);
}
function SW(e) {
  return e instanceof Va || (e = va(e)), e ? (e = e.rgb(), new bt(e.r, e.g, e.b, e.opacity)) : new bt();
}
function Ef(e, t, r, n) {
  return arguments.length === 1 ? SW(e) : new bt(e, t, r, n ?? 1);
}
function bt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
oh(bt, Ef, q1(Va, {
  brighter(e) {
    return e = e == null ? Es : Math.pow(Es, e), new bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ha : Math.pow(ha, e), new bt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new bt(Pn(this.r), Pn(this.g), Pn(this.b), Ss(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Uy,
  // Deprecated! Use color.formatHex.
  formatHex: Uy,
  formatHex8: OW,
  formatRgb: Wy,
  toString: Wy
}));
function Uy() {
  return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}`;
}
function OW() {
  return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}${yn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Wy() {
  const e = Ss(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Pn(this.r)}, ${Pn(this.g)}, ${Pn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ss(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Pn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function yn(e) {
  return e = Pn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ky(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Zt(e, t, r, n);
}
function H1(e) {
  if (e instanceof Zt) return new Zt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Va || (e = va(e)), !e) return new Zt();
  if (e instanceof Zt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, o = Math.min(t, r, n), a = Math.max(t, r, n), i = NaN, s = a - o, c = (a + o) / 2;
  return s ? (t === a ? i = (r - n) / s + (r < n) * 6 : r === a ? i = (n - t) / s + 2 : i = (t - r) / s + 4, s /= c < 0.5 ? a + o : 2 - a - o, i *= 60) : s = c > 0 && c < 1 ? 0 : i, new Zt(i, s, c, e.opacity);
}
function PW(e, t, r, n) {
  return arguments.length === 1 ? H1(e) : new Zt(e, t, r, n ?? 1);
}
function Zt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
oh(Zt, PW, q1(Va, {
  brighter(e) {
    return e = e == null ? Es : Math.pow(Es, e), new Zt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ha : Math.pow(ha, e), new Zt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, o = 2 * r - n;
    return new bt(
      Ju(e >= 240 ? e - 240 : e + 120, o, n),
      Ju(e, o, n),
      Ju(e < 120 ? e + 240 : e - 120, o, n),
      this.opacity
    );
  },
  clamp() {
    return new Zt(Vy(this.h), _i(this.s), _i(this.l), Ss(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ss(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Vy(this.h)}, ${_i(this.s) * 100}%, ${_i(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Vy(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function _i(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ju(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const ah = (e) => () => e;
function AW(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function CW(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function TW(e) {
  return (e = +e) == 1 ? G1 : function(t, r) {
    return r - t ? CW(t, r, e) : ah(isNaN(t) ? r : t);
  };
}
function G1(e, t) {
  var r = t - e;
  return r ? AW(e, r) : ah(isNaN(e) ? t : e);
}
const qy = (function e(t) {
  var r = TW(t);
  function n(o, a) {
    var i = r((o = Ef(o)).r, (a = Ef(a)).r), s = r(o.g, a.g), c = r(o.b, a.b), u = G1(o.opacity, a.opacity);
    return function(l) {
      return o.r = i(l), o.g = s(l), o.b = c(l), o.opacity = u(l), o + "";
    };
  }
  return n.gamma = e, n;
})(1);
function _W(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), o;
  return function(a) {
    for (o = 0; o < r; ++o) n[o] = e[o] * (1 - a) + t[o] * a;
    return n;
  };
}
function kW(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function NW(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, o = new Array(n), a = new Array(r), i;
  for (i = 0; i < n; ++i) o[i] = _o(e[i], t[i]);
  for (; i < r; ++i) a[i] = t[i];
  return function(s) {
    for (i = 0; i < n; ++i) a[i] = o[i](s);
    return a;
  };
}
function RW(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Os(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function MW(e, t) {
  var r = {}, n = {}, o;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (o in t)
    o in e ? r[o] = _o(e[o], t[o]) : n[o] = t[o];
  return function(a) {
    for (o in r) n[o] = r[o](a);
    return n;
  };
}
var Sf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Qu = new RegExp(Sf.source, "g");
function IW(e) {
  return function() {
    return e;
  };
}
function DW(e) {
  return function(t) {
    return e(t) + "";
  };
}
function jW(e, t) {
  var r = Sf.lastIndex = Qu.lastIndex = 0, n, o, a, i = -1, s = [], c = [];
  for (e = e + "", t = t + ""; (n = Sf.exec(e)) && (o = Qu.exec(t)); )
    (a = o.index) > r && (a = t.slice(r, a), s[i] ? s[i] += a : s[++i] = a), (n = n[0]) === (o = o[0]) ? s[i] ? s[i] += o : s[++i] = o : (s[++i] = null, c.push({ i, x: Os(n, o) })), r = Qu.lastIndex;
  return r < t.length && (a = t.slice(r), s[i] ? s[i] += a : s[++i] = a), s.length < 2 ? c[0] ? DW(c[0].x) : IW(t) : (t = c.length, function(u) {
    for (var l = 0, d; l < t; ++l) s[(d = c[l]).i] = d.x(u);
    return s.join("");
  });
}
function _o(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? ah(t) : (r === "number" ? Os : r === "string" ? (n = va(t)) ? (t = n, qy) : jW : t instanceof va ? qy : t instanceof Date ? RW : kW(t) ? _W : Array.isArray(t) ? NW : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? MW : Os)(e, t);
}
function ih(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function LW(e, t) {
  t === void 0 && (t = e, e = _o);
  for (var r = 0, n = t.length - 1, o = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(o, o = t[++r]);
  return function(i) {
    var s = Math.max(0, Math.min(n - 1, Math.floor(i *= n)));
    return a[s](i - s);
  };
}
function $W(e) {
  return function() {
    return e;
  };
}
function Ps(e) {
  return +e;
}
var Hy = [0, 1];
function ft(e) {
  return e;
}
function Of(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : $W(isNaN(t) ? NaN : 0.5);
}
function BW(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function FW(e, t, r) {
  var n = e[0], o = e[1], a = t[0], i = t[1];
  return o < n ? (n = Of(o, n), a = r(i, a)) : (n = Of(n, o), a = r(a, i)), function(s) {
    return a(n(s));
  };
}
function zW(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, o = new Array(n), a = new Array(n), i = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++i < n; )
    o[i] = Of(e[i], e[i + 1]), a[i] = r(t[i], t[i + 1]);
  return function(s) {
    var c = Ka(e, s, 1, n) - 1;
    return a[c](o[c](s));
  };
}
function qa(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Vc() {
  var e = Hy, t = Hy, r = _o, n, o, a, i = ft, s, c, u;
  function l() {
    var p = Math.min(e.length, t.length);
    return i !== ft && (i = BW(e[0], e[p - 1])), s = p > 2 ? zW : FW, c = u = null, d;
  }
  function d(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = s(e.map(n), t, r)))(n(i(p)));
  }
  return d.invert = function(p) {
    return i(o((u || (u = s(t, e.map(n), Os)))(p)));
  }, d.domain = function(p) {
    return arguments.length ? (e = Array.from(p, Ps), l()) : e.slice();
  }, d.range = function(p) {
    return arguments.length ? (t = Array.from(p), l()) : t.slice();
  }, d.rangeRound = function(p) {
    return t = Array.from(p), r = ih, l();
  }, d.clamp = function(p) {
    return arguments.length ? (i = p ? !0 : ft, l()) : i !== ft;
  }, d.interpolate = function(p) {
    return arguments.length ? (r = p, l()) : r;
  }, d.unknown = function(p) {
    return arguments.length ? (a = p, d) : a;
  }, function(p, f) {
    return n = p, o = f, l();
  };
}
function sh() {
  return Vc()(ft, ft);
}
function UW(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function As(e, t) {
  if ((r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
  var r, n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function fo(e) {
  return e = As(Math.abs(e)), e ? e[1] : NaN;
}
function WW(e, t) {
  return function(r, n) {
    for (var o = r.length, a = [], i = 0, s = e[0], c = 0; o > 0 && s > 0 && (c + s + 1 > n && (s = Math.max(1, n - c)), a.push(r.substring(o -= s, o + s)), !((c += s + 1) > n)); )
      s = e[i = (i + 1) % e.length];
    return a.reverse().join(t);
  };
}
function KW(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var VW = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ga(e) {
  if (!(t = VW.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new ch({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
ga.prototype = ch.prototype;
function ch(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
ch.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function qW(e) {
  e: for (var t = e.length, r = 1, n = -1, o; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = o = r;
        break;
      case "0":
        n === 0 && (n = r), o = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(o + 1) : e;
}
var Y1;
function HW(e, t) {
  var r = As(e, t);
  if (!r) return e + "";
  var n = r[0], o = r[1], a = o - (Y1 = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1, i = n.length;
  return a === i ? n : a > i ? n + new Array(a - i + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + As(e, Math.max(0, t + a - 1))[0];
}
function Gy(e, t) {
  var r = As(e, t);
  if (!r) return e + "";
  var n = r[0], o = r[1];
  return o < 0 ? "0." + new Array(-o).join("0") + n : n.length > o + 1 ? n.slice(0, o + 1) + "." + n.slice(o + 1) : n + new Array(o - n.length + 2).join("0");
}
const Yy = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: UW,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Gy(e * 100, t),
  r: Gy,
  s: HW,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Xy(e) {
  return e;
}
var Zy = Array.prototype.map, Jy = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function GW(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Xy : WW(Zy.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", o = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Xy : KW(Zy.call(e.numerals, String)), i = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
  function u(d) {
    d = ga(d);
    var p = d.fill, f = d.align, v = d.sign, h = d.symbol, g = d.zero, y = d.width, w = d.comma, x = d.precision, S = d.trim, E = d.type;
    E === "n" ? (w = !0, E = "g") : Yy[E] || (x === void 0 && (x = 12), S = !0, E = "g"), (g || p === "0" && f === "=") && (g = !0, p = "0", f = "=");
    var O = h === "$" ? r : h === "#" && /[boxX]/.test(E) ? "0" + E.toLowerCase() : "", P = h === "$" ? n : /[%p]/.test(E) ? i : "", A = Yy[E], _ = /[defgprs%]/.test(E);
    x = x === void 0 ? 6 : /[gprs]/.test(E) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function N(T) {
      var R = O, j = P, C, D, $;
      if (E === "c")
        j = A(T) + j, T = "";
      else {
        T = +T;
        var z = T < 0 || 1 / T < 0;
        if (T = isNaN(T) ? c : A(Math.abs(T), x), S && (T = qW(T)), z && +T == 0 && v !== "+" && (z = !1), R = (z ? v === "(" ? v : s : v === "-" || v === "(" ? "" : v) + R, j = (E === "s" ? Jy[8 + Y1 / 3] : "") + j + (z && v === "(" ? ")" : ""), _) {
          for (C = -1, D = T.length; ++C < D; )
            if ($ = T.charCodeAt(C), 48 > $ || $ > 57) {
              j = ($ === 46 ? o + T.slice(C + 1) : T.slice(C)) + j, T = T.slice(0, C);
              break;
            }
        }
      }
      w && !g && (T = t(T, 1 / 0));
      var I = R.length + T.length + j.length, F = I < y ? new Array(y - I + 1).join(p) : "";
      switch (w && g && (T = t(F + T, F.length ? y - j.length : 1 / 0), F = ""), f) {
        case "<":
          T = R + T + j + F;
          break;
        case "=":
          T = R + F + T + j;
          break;
        case "^":
          T = F.slice(0, I = F.length >> 1) + R + T + j + F.slice(I);
          break;
        default:
          T = F + R + T + j;
          break;
      }
      return a(T);
    }
    return N.toString = function() {
      return d + "";
    }, N;
  }
  function l(d, p) {
    var f = u((d = ga(d), d.type = "f", d)), v = Math.max(-8, Math.min(8, Math.floor(fo(p) / 3))) * 3, h = Math.pow(10, -v), g = Jy[8 + v / 3];
    return function(y) {
      return f(h * y) + g;
    };
  }
  return {
    format: u,
    formatPrefix: l
  };
}
var ki, lh, X1;
YW({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function YW(e) {
  return ki = GW(e), lh = ki.format, X1 = ki.formatPrefix, ki;
}
function XW(e) {
  return Math.max(0, -fo(Math.abs(e)));
}
function ZW(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(fo(t) / 3))) * 3 - fo(Math.abs(e)));
}
function JW(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, fo(t) - fo(e)) + 1;
}
function Z1(e, t, r, n) {
  var o = wf(e, t, r), a;
  switch (n = ga(n ?? ",f"), n.type) {
    case "s": {
      var i = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = ZW(o, i)) && (n.precision = a), X1(n, i);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = JW(o, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = XW(o)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return lh(n);
}
function ln(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return yf(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var o = t();
    return Z1(o[0], o[o.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), o = 0, a = n.length - 1, i = n[o], s = n[a], c, u, l = 10;
    for (s < i && (u = i, i = s, s = u, u = o, o = a, a = u); l-- > 0; ) {
      if (u = bf(i, s, r), u === c)
        return n[o] = i, n[a] = s, t(n);
      if (u > 0)
        i = Math.floor(i / u) * u, s = Math.ceil(s / u) * u;
      else if (u < 0)
        i = Math.ceil(i * u) / u, s = Math.floor(s * u) / u;
      else
        break;
      c = u;
    }
    return e;
  }, e;
}
function J1() {
  var e = sh();
  return e.copy = function() {
    return qa(e, J1());
  }, Yt.apply(e, arguments), ln(e);
}
function Q1(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Ps), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return Q1(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Ps) : [0, 1], ln(r);
}
function eA(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, o = e[r], a = e[n], i;
  return a < o && (i = r, r = n, n = i, i = o, o = a, a = i), e[r] = t.floor(o), e[n] = t.ceil(a), e;
}
function Qy(e) {
  return Math.log(e);
}
function eb(e) {
  return Math.exp(e);
}
function QW(e) {
  return -Math.log(-e);
}
function e3(e) {
  return -Math.exp(-e);
}
function t3(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function r3(e) {
  return e === 10 ? t3 : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function n3(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function tb(e) {
  return (t, r) => -e(-t, r);
}
function uh(e) {
  const t = e(Qy, eb), r = t.domain;
  let n = 10, o, a;
  function i() {
    return o = n3(n), a = r3(n), r()[0] < 0 ? (o = tb(o), a = tb(a), e(QW, e3)) : e(Qy, eb), t;
  }
  return t.base = function(s) {
    return arguments.length ? (n = +s, i()) : n;
  }, t.domain = function(s) {
    return arguments.length ? (r(s), i()) : r();
  }, t.ticks = (s) => {
    const c = r();
    let u = c[0], l = c[c.length - 1];
    const d = l < u;
    d && ([u, l] = [l, u]);
    let p = o(u), f = o(l), v, h;
    const g = s == null ? 10 : +s;
    let y = [];
    if (!(n % 1) && f - p < g) {
      if (p = Math.floor(p), f = Math.ceil(f), u > 0) {
        for (; p <= f; ++p)
          for (v = 1; v < n; ++v)
            if (h = p < 0 ? v / a(-p) : v * a(p), !(h < u)) {
              if (h > l) break;
              y.push(h);
            }
      } else for (; p <= f; ++p)
        for (v = n - 1; v >= 1; --v)
          if (h = p > 0 ? v / a(-p) : v * a(p), !(h < u)) {
            if (h > l) break;
            y.push(h);
          }
      y.length * 2 < g && (y = yf(u, l, g));
    } else
      y = yf(p, f, Math.min(f - p, g)).map(a);
    return d ? y.reverse() : y;
  }, t.tickFormat = (s, c) => {
    if (s == null && (s = 10), c == null && (c = n === 10 ? "s" : ","), typeof c != "function" && (!(n % 1) && (c = ga(c)).precision == null && (c.trim = !0), c = lh(c)), s === 1 / 0) return c;
    const u = Math.max(1, n * s / t.ticks().length);
    return (l) => {
      let d = l / a(Math.round(o(l)));
      return d * n < n - 0.5 && (d *= n), d <= u ? c(l) : "";
    };
  }, t.nice = () => r(eA(r(), {
    floor: (s) => a(Math.floor(o(s))),
    ceil: (s) => a(Math.ceil(o(s)))
  })), t;
}
function tA() {
  const e = uh(Vc()).domain([1, 10]);
  return e.copy = () => qa(e, tA()).base(e.base()), Yt.apply(e, arguments), e;
}
function rb(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function nb(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function dh(e) {
  var t = 1, r = e(rb(t), nb(t));
  return r.constant = function(n) {
    return arguments.length ? e(rb(t = +n), nb(t)) : t;
  }, ln(r);
}
function rA() {
  var e = dh(Vc());
  return e.copy = function() {
    return qa(e, rA()).constant(e.constant());
  }, Yt.apply(e, arguments);
}
function ob(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function o3(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function a3(e) {
  return e < 0 ? -e * e : e * e;
}
function fh(e) {
  var t = e(ft, ft), r = 1;
  function n() {
    return r === 1 ? e(ft, ft) : r === 0.5 ? e(o3, a3) : e(ob(r), ob(1 / r));
  }
  return t.exponent = function(o) {
    return arguments.length ? (r = +o, n()) : r;
  }, ln(t);
}
function ph() {
  var e = fh(Vc());
  return e.copy = function() {
    return qa(e, ph()).exponent(e.exponent());
  }, Yt.apply(e, arguments), e;
}
function i3() {
  return ph.apply(null, arguments).exponent(0.5);
}
function ab(e) {
  return Math.sign(e) * e * e;
}
function s3(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function nA() {
  var e = sh(), t = [0, 1], r = !1, n;
  function o(a) {
    var i = s3(e(a));
    return isNaN(i) ? n : r ? Math.round(i) : i;
  }
  return o.invert = function(a) {
    return e.invert(ab(a));
  }, o.domain = function(a) {
    return arguments.length ? (e.domain(a), o) : e.domain();
  }, o.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, Ps)).map(ab)), o) : t.slice();
  }, o.rangeRound = function(a) {
    return o.range(a).round(!0);
  }, o.round = function(a) {
    return arguments.length ? (r = !!a, o) : r;
  }, o.clamp = function(a) {
    return arguments.length ? (e.clamp(a), o) : e.clamp();
  }, o.unknown = function(a) {
    return arguments.length ? (n = a, o) : n;
  }, o.copy = function() {
    return nA(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, Yt.apply(o, arguments), ln(o);
}
function oA() {
  var e = [], t = [], r = [], n;
  function o() {
    var i = 0, s = Math.max(1, t.length);
    for (r = new Array(s - 1); ++i < s; ) r[i - 1] = dW(e, i / s);
    return a;
  }
  function a(i) {
    return i == null || isNaN(i = +i) ? n : t[Ka(r, i)];
  }
  return a.invertExtent = function(i) {
    var s = t.indexOf(i);
    return s < 0 ? [NaN, NaN] : [
      s > 0 ? r[s - 1] : e[0],
      s < r.length ? r[s] : e[e.length - 1]
    ];
  }, a.domain = function(i) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let s of i) s != null && !isNaN(s = +s) && e.push(s);
    return e.sort(Zr), o();
  }, a.range = function(i) {
    return arguments.length ? (t = Array.from(i), o()) : t.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return oA().domain(e).range(t).unknown(n);
  }, Yt.apply(a, arguments);
}
function aA() {
  var e = 0, t = 1, r = 1, n = [0.5], o = [0, 1], a;
  function i(c) {
    return c != null && c <= c ? o[Ka(n, c, 0, r)] : a;
  }
  function s() {
    var c = -1;
    for (n = new Array(r); ++c < r; ) n[c] = ((c + 1) * t - (c - r) * e) / (r + 1);
    return i;
  }
  return i.domain = function(c) {
    return arguments.length ? ([e, t] = c, e = +e, t = +t, s()) : [e, t];
  }, i.range = function(c) {
    return arguments.length ? (r = (o = Array.from(c)).length - 1, s()) : o.slice();
  }, i.invertExtent = function(c) {
    var u = o.indexOf(c);
    return u < 0 ? [NaN, NaN] : u < 1 ? [e, n[0]] : u >= r ? [n[r - 1], t] : [n[u - 1], n[u]];
  }, i.unknown = function(c) {
    return arguments.length && (a = c), i;
  }, i.thresholds = function() {
    return n.slice();
  }, i.copy = function() {
    return aA().domain([e, t]).range(o).unknown(a);
  }, Yt.apply(ln(i), arguments);
}
function iA() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function o(a) {
    return a != null && a <= a ? t[Ka(e, a, 0, n)] : r;
  }
  return o.domain = function(a) {
    return arguments.length ? (e = Array.from(a), n = Math.min(e.length, t.length - 1), o) : e.slice();
  }, o.range = function(a) {
    return arguments.length ? (t = Array.from(a), n = Math.min(e.length, t.length - 1), o) : t.slice();
  }, o.invertExtent = function(a) {
    var i = t.indexOf(a);
    return [e[i - 1], e[i]];
  }, o.unknown = function(a) {
    return arguments.length ? (r = a, o) : r;
  }, o.copy = function() {
    return iA().domain(e).range(t).unknown(r);
  }, Yt.apply(o, arguments);
}
const ed = /* @__PURE__ */ new Date(), td = /* @__PURE__ */ new Date();
function Ye(e, t, r, n) {
  function o(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return o.floor = (a) => (e(a = /* @__PURE__ */ new Date(+a)), a), o.ceil = (a) => (e(a = new Date(a - 1)), t(a, 1), e(a), a), o.round = (a) => {
    const i = o(a), s = o.ceil(a);
    return a - i < s - a ? i : s;
  }, o.offset = (a, i) => (t(a = /* @__PURE__ */ new Date(+a), i == null ? 1 : Math.floor(i)), a), o.range = (a, i, s) => {
    const c = [];
    if (a = o.ceil(a), s = s == null ? 1 : Math.floor(s), !(a < i) || !(s > 0)) return c;
    let u;
    do
      c.push(u = /* @__PURE__ */ new Date(+a)), t(a, s), e(a);
    while (u < a && a < i);
    return c;
  }, o.filter = (a) => Ye((i) => {
    if (i >= i) for (; e(i), !a(i); ) i.setTime(i - 1);
  }, (i, s) => {
    if (i >= i)
      if (s < 0) for (; ++s <= 0; )
        for (; t(i, -1), !a(i); )
          ;
      else for (; --s >= 0; )
        for (; t(i, 1), !a(i); )
          ;
  }), r && (o.count = (a, i) => (ed.setTime(+a), td.setTime(+i), e(ed), e(td), Math.floor(r(ed, td))), o.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? o.filter(n ? (i) => n(i) % a === 0 : (i) => o.count(0, i) % a === 0) : o)), o;
}
const Cs = Ye(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Cs.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Ye((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Cs);
Cs.range;
const Er = 1e3, Wt = Er * 60, Sr = Wt * 60, Rr = Sr * 24, hh = Rr * 7, ib = Rr * 30, rd = Rr * 365, bn = Ye((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * Er);
}, (e, t) => (t - e) / Er, (e) => e.getUTCSeconds());
bn.range;
const mh = Ye((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Er);
}, (e, t) => {
  e.setTime(+e + t * Wt);
}, (e, t) => (t - e) / Wt, (e) => e.getMinutes());
mh.range;
const vh = Ye((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * Wt);
}, (e, t) => (t - e) / Wt, (e) => e.getUTCMinutes());
vh.range;
const gh = Ye((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Er - e.getMinutes() * Wt);
}, (e, t) => {
  e.setTime(+e + t * Sr);
}, (e, t) => (t - e) / Sr, (e) => e.getHours());
gh.range;
const yh = Ye((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Sr);
}, (e, t) => (t - e) / Sr, (e) => e.getUTCHours());
yh.range;
const Ha = Ye(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Wt) / Rr,
  (e) => e.getDate() - 1
);
Ha.range;
const qc = Ye((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Rr, (e) => e.getUTCDate() - 1);
qc.range;
const sA = Ye((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Rr, (e) => Math.floor(e / Rr));
sA.range;
function Vn(e) {
  return Ye((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Wt) / hh);
}
const Hc = Vn(0), Ts = Vn(1), c3 = Vn(2), l3 = Vn(3), po = Vn(4), u3 = Vn(5), d3 = Vn(6);
Hc.range;
Ts.range;
c3.range;
l3.range;
po.range;
u3.range;
d3.range;
function qn(e) {
  return Ye((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / hh);
}
const Gc = qn(0), _s = qn(1), f3 = qn(2), p3 = qn(3), ho = qn(4), h3 = qn(5), m3 = qn(6);
Gc.range;
_s.range;
f3.range;
p3.range;
ho.range;
h3.range;
m3.range;
const bh = Ye((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
bh.range;
const wh = Ye((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
wh.range;
const Mr = Ye((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Mr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ye((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Mr.range;
const Ir = Ye((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Ir.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ye((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Ir.range;
function cA(e, t, r, n, o, a) {
  const i = [
    [bn, 1, Er],
    [bn, 5, 5 * Er],
    [bn, 15, 15 * Er],
    [bn, 30, 30 * Er],
    [a, 1, Wt],
    [a, 5, 5 * Wt],
    [a, 15, 15 * Wt],
    [a, 30, 30 * Wt],
    [o, 1, Sr],
    [o, 3, 3 * Sr],
    [o, 6, 6 * Sr],
    [o, 12, 12 * Sr],
    [n, 1, Rr],
    [n, 2, 2 * Rr],
    [r, 1, hh],
    [t, 1, ib],
    [t, 3, 3 * ib],
    [e, 1, rd]
  ];
  function s(u, l, d) {
    const p = l < u;
    p && ([u, l] = [l, u]);
    const f = d && typeof d.range == "function" ? d : c(u, l, d), v = f ? f.range(u, +l + 1) : [];
    return p ? v.reverse() : v;
  }
  function c(u, l, d) {
    const p = Math.abs(l - u) / d, f = th(([, , g]) => g).right(i, p);
    if (f === i.length) return e.every(wf(u / rd, l / rd, d));
    if (f === 0) return Cs.every(Math.max(wf(u, l, d), 1));
    const [v, h] = i[p / i[f - 1][2] < i[f][2] / p ? f - 1 : f];
    return v.every(h);
  }
  return [s, c];
}
const [v3, g3] = cA(Ir, wh, Gc, sA, yh, vh), [y3, b3] = cA(Mr, bh, Hc, Ha, gh, mh);
function nd(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function od(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Vo(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function w3(e) {
  var t = e.dateTime, r = e.date, n = e.time, o = e.periods, a = e.days, i = e.shortDays, s = e.months, c = e.shortMonths, u = qo(o), l = Ho(o), d = qo(a), p = Ho(a), f = qo(i), v = Ho(i), h = qo(s), g = Ho(s), y = qo(c), w = Ho(c), x = {
    a: z,
    A: I,
    b: F,
    B: oe,
    c: null,
    d: fb,
    e: fb,
    f: W3,
    g: Q3,
    G: tK,
    H: F3,
    I: z3,
    j: U3,
    L: lA,
    m: K3,
    M: V3,
    p: H,
    q: ie,
    Q: mb,
    s: vb,
    S: q3,
    u: H3,
    U: G3,
    V: Y3,
    w: X3,
    W: Z3,
    x: null,
    X: null,
    y: J3,
    Y: eK,
    Z: rK,
    "%": hb
  }, S = {
    a: ae,
    A: W,
    b: te,
    B: se,
    c: null,
    d: pb,
    e: pb,
    f: iK,
    g: vK,
    G: yK,
    H: nK,
    I: oK,
    j: aK,
    L: dA,
    m: sK,
    M: cK,
    p: K,
    q: re,
    Q: mb,
    s: vb,
    S: lK,
    u: uK,
    U: dK,
    V: fK,
    w: pK,
    W: hK,
    x: null,
    X: null,
    y: mK,
    Y: gK,
    Z: bK,
    "%": hb
  }, E = {
    a: N,
    A: T,
    b: R,
    B: j,
    c: C,
    d: ub,
    e: ub,
    f: j3,
    g: lb,
    G: cb,
    H: db,
    I: db,
    j: R3,
    L: D3,
    m: N3,
    M: M3,
    p: _,
    q: k3,
    Q: $3,
    s: B3,
    S: I3,
    u: P3,
    U: A3,
    V: C3,
    w: O3,
    W: T3,
    x: D,
    X: $,
    y: lb,
    Y: cb,
    Z: _3,
    "%": L3
  };
  x.x = O(r, x), x.X = O(n, x), x.c = O(t, x), S.x = O(r, S), S.X = O(n, S), S.c = O(t, S);
  function O(L, G) {
    return function(Y) {
      var B = [], me = -1, le = 0, Te = L.length, Ke, St, Nm;
      for (Y instanceof Date || (Y = /* @__PURE__ */ new Date(+Y)); ++me < Te; )
        L.charCodeAt(me) === 37 && (B.push(L.slice(le, me)), (St = sb[Ke = L.charAt(++me)]) != null ? Ke = L.charAt(++me) : St = Ke === "e" ? " " : "0", (Nm = G[Ke]) && (Ke = Nm(Y, St)), B.push(Ke), le = me + 1);
      return B.push(L.slice(le, me)), B.join("");
    };
  }
  function P(L, G) {
    return function(Y) {
      var B = Vo(1900, void 0, 1), me = A(B, L, Y += "", 0), le, Te;
      if (me != Y.length) return null;
      if ("Q" in B) return new Date(B.Q);
      if ("s" in B) return new Date(B.s * 1e3 + ("L" in B ? B.L : 0));
      if (G && !("Z" in B) && (B.Z = 0), "p" in B && (B.H = B.H % 12 + B.p * 12), B.m === void 0 && (B.m = "q" in B ? B.q : 0), "V" in B) {
        if (B.V < 1 || B.V > 53) return null;
        "w" in B || (B.w = 1), "Z" in B ? (le = od(Vo(B.y, 0, 1)), Te = le.getUTCDay(), le = Te > 4 || Te === 0 ? _s.ceil(le) : _s(le), le = qc.offset(le, (B.V - 1) * 7), B.y = le.getUTCFullYear(), B.m = le.getUTCMonth(), B.d = le.getUTCDate() + (B.w + 6) % 7) : (le = nd(Vo(B.y, 0, 1)), Te = le.getDay(), le = Te > 4 || Te === 0 ? Ts.ceil(le) : Ts(le), le = Ha.offset(le, (B.V - 1) * 7), B.y = le.getFullYear(), B.m = le.getMonth(), B.d = le.getDate() + (B.w + 6) % 7);
      } else ("W" in B || "U" in B) && ("w" in B || (B.w = "u" in B ? B.u % 7 : "W" in B ? 1 : 0), Te = "Z" in B ? od(Vo(B.y, 0, 1)).getUTCDay() : nd(Vo(B.y, 0, 1)).getDay(), B.m = 0, B.d = "W" in B ? (B.w + 6) % 7 + B.W * 7 - (Te + 5) % 7 : B.w + B.U * 7 - (Te + 6) % 7);
      return "Z" in B ? (B.H += B.Z / 100 | 0, B.M += B.Z % 100, od(B)) : nd(B);
    };
  }
  function A(L, G, Y, B) {
    for (var me = 0, le = G.length, Te = Y.length, Ke, St; me < le; ) {
      if (B >= Te) return -1;
      if (Ke = G.charCodeAt(me++), Ke === 37) {
        if (Ke = G.charAt(me++), St = E[Ke in sb ? G.charAt(me++) : Ke], !St || (B = St(L, Y, B)) < 0) return -1;
      } else if (Ke != Y.charCodeAt(B++))
        return -1;
    }
    return B;
  }
  function _(L, G, Y) {
    var B = u.exec(G.slice(Y));
    return B ? (L.p = l.get(B[0].toLowerCase()), Y + B[0].length) : -1;
  }
  function N(L, G, Y) {
    var B = f.exec(G.slice(Y));
    return B ? (L.w = v.get(B[0].toLowerCase()), Y + B[0].length) : -1;
  }
  function T(L, G, Y) {
    var B = d.exec(G.slice(Y));
    return B ? (L.w = p.get(B[0].toLowerCase()), Y + B[0].length) : -1;
  }
  function R(L, G, Y) {
    var B = y.exec(G.slice(Y));
    return B ? (L.m = w.get(B[0].toLowerCase()), Y + B[0].length) : -1;
  }
  function j(L, G, Y) {
    var B = h.exec(G.slice(Y));
    return B ? (L.m = g.get(B[0].toLowerCase()), Y + B[0].length) : -1;
  }
  function C(L, G, Y) {
    return A(L, t, G, Y);
  }
  function D(L, G, Y) {
    return A(L, r, G, Y);
  }
  function $(L, G, Y) {
    return A(L, n, G, Y);
  }
  function z(L) {
    return i[L.getDay()];
  }
  function I(L) {
    return a[L.getDay()];
  }
  function F(L) {
    return c[L.getMonth()];
  }
  function oe(L) {
    return s[L.getMonth()];
  }
  function H(L) {
    return o[+(L.getHours() >= 12)];
  }
  function ie(L) {
    return 1 + ~~(L.getMonth() / 3);
  }
  function ae(L) {
    return i[L.getUTCDay()];
  }
  function W(L) {
    return a[L.getUTCDay()];
  }
  function te(L) {
    return c[L.getUTCMonth()];
  }
  function se(L) {
    return s[L.getUTCMonth()];
  }
  function K(L) {
    return o[+(L.getUTCHours() >= 12)];
  }
  function re(L) {
    return 1 + ~~(L.getUTCMonth() / 3);
  }
  return {
    format: function(L) {
      var G = O(L += "", x);
      return G.toString = function() {
        return L;
      }, G;
    },
    parse: function(L) {
      var G = P(L += "", !1);
      return G.toString = function() {
        return L;
      }, G;
    },
    utcFormat: function(L) {
      var G = O(L += "", S);
      return G.toString = function() {
        return L;
      }, G;
    },
    utcParse: function(L) {
      var G = P(L += "", !0);
      return G.toString = function() {
        return L;
      }, G;
    }
  };
}
var sb = { "-": "", _: " ", 0: "0" }, et = /^\s*\d+/, x3 = /^%/, E3 = /[\\^$*+?|[\]().{}]/g;
function ve(e, t, r) {
  var n = e < 0 ? "-" : "", o = (n ? -e : e) + "", a = o.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + o : o);
}
function S3(e) {
  return e.replace(E3, "\\$&");
}
function qo(e) {
  return new RegExp("^(?:" + e.map(S3).join("|") + ")", "i");
}
function Ho(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function O3(e, t, r) {
  var n = et.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function P3(e, t, r) {
  var n = et.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function A3(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function C3(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function T3(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function cb(e, t, r) {
  var n = et.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function lb(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function _3(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function k3(e, t, r) {
  var n = et.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function N3(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function ub(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function R3(e, t, r) {
  var n = et.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function db(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function M3(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function I3(e, t, r) {
  var n = et.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function D3(e, t, r) {
  var n = et.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function j3(e, t, r) {
  var n = et.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function L3(e, t, r) {
  var n = x3.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function $3(e, t, r) {
  var n = et.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function B3(e, t, r) {
  var n = et.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function fb(e, t) {
  return ve(e.getDate(), t, 2);
}
function F3(e, t) {
  return ve(e.getHours(), t, 2);
}
function z3(e, t) {
  return ve(e.getHours() % 12 || 12, t, 2);
}
function U3(e, t) {
  return ve(1 + Ha.count(Mr(e), e), t, 3);
}
function lA(e, t) {
  return ve(e.getMilliseconds(), t, 3);
}
function W3(e, t) {
  return lA(e, t) + "000";
}
function K3(e, t) {
  return ve(e.getMonth() + 1, t, 2);
}
function V3(e, t) {
  return ve(e.getMinutes(), t, 2);
}
function q3(e, t) {
  return ve(e.getSeconds(), t, 2);
}
function H3(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function G3(e, t) {
  return ve(Hc.count(Mr(e) - 1, e), t, 2);
}
function uA(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? po(e) : po.ceil(e);
}
function Y3(e, t) {
  return e = uA(e), ve(po.count(Mr(e), e) + (Mr(e).getDay() === 4), t, 2);
}
function X3(e) {
  return e.getDay();
}
function Z3(e, t) {
  return ve(Ts.count(Mr(e) - 1, e), t, 2);
}
function J3(e, t) {
  return ve(e.getFullYear() % 100, t, 2);
}
function Q3(e, t) {
  return e = uA(e), ve(e.getFullYear() % 100, t, 2);
}
function eK(e, t) {
  return ve(e.getFullYear() % 1e4, t, 4);
}
function tK(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? po(e) : po.ceil(e), ve(e.getFullYear() % 1e4, t, 4);
}
function rK(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + ve(t / 60 | 0, "0", 2) + ve(t % 60, "0", 2);
}
function pb(e, t) {
  return ve(e.getUTCDate(), t, 2);
}
function nK(e, t) {
  return ve(e.getUTCHours(), t, 2);
}
function oK(e, t) {
  return ve(e.getUTCHours() % 12 || 12, t, 2);
}
function aK(e, t) {
  return ve(1 + qc.count(Ir(e), e), t, 3);
}
function dA(e, t) {
  return ve(e.getUTCMilliseconds(), t, 3);
}
function iK(e, t) {
  return dA(e, t) + "000";
}
function sK(e, t) {
  return ve(e.getUTCMonth() + 1, t, 2);
}
function cK(e, t) {
  return ve(e.getUTCMinutes(), t, 2);
}
function lK(e, t) {
  return ve(e.getUTCSeconds(), t, 2);
}
function uK(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function dK(e, t) {
  return ve(Gc.count(Ir(e) - 1, e), t, 2);
}
function fA(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? ho(e) : ho.ceil(e);
}
function fK(e, t) {
  return e = fA(e), ve(ho.count(Ir(e), e) + (Ir(e).getUTCDay() === 4), t, 2);
}
function pK(e) {
  return e.getUTCDay();
}
function hK(e, t) {
  return ve(_s.count(Ir(e) - 1, e), t, 2);
}
function mK(e, t) {
  return ve(e.getUTCFullYear() % 100, t, 2);
}
function vK(e, t) {
  return e = fA(e), ve(e.getUTCFullYear() % 100, t, 2);
}
function gK(e, t) {
  return ve(e.getUTCFullYear() % 1e4, t, 4);
}
function yK(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? ho(e) : ho.ceil(e), ve(e.getUTCFullYear() % 1e4, t, 4);
}
function bK() {
  return "+0000";
}
function hb() {
  return "%";
}
function mb(e) {
  return +e;
}
function vb(e) {
  return Math.floor(+e / 1e3);
}
var Zn, pA, hA;
wK({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function wK(e) {
  return Zn = w3(e), pA = Zn.format, Zn.parse, hA = Zn.utcFormat, Zn.utcParse, Zn;
}
function xK(e) {
  return new Date(e);
}
function EK(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function xh(e, t, r, n, o, a, i, s, c, u) {
  var l = sh(), d = l.invert, p = l.domain, f = u(".%L"), v = u(":%S"), h = u("%I:%M"), g = u("%I %p"), y = u("%a %d"), w = u("%b %d"), x = u("%B"), S = u("%Y");
  function E(O) {
    return (c(O) < O ? f : s(O) < O ? v : i(O) < O ? h : a(O) < O ? g : n(O) < O ? o(O) < O ? y : w : r(O) < O ? x : S)(O);
  }
  return l.invert = function(O) {
    return new Date(d(O));
  }, l.domain = function(O) {
    return arguments.length ? p(Array.from(O, EK)) : p().map(xK);
  }, l.ticks = function(O) {
    var P = p();
    return e(P[0], P[P.length - 1], O ?? 10);
  }, l.tickFormat = function(O, P) {
    return P == null ? E : u(P);
  }, l.nice = function(O) {
    var P = p();
    return (!O || typeof O.range != "function") && (O = t(P[0], P[P.length - 1], O ?? 10)), O ? p(eA(P, O)) : l;
  }, l.copy = function() {
    return qa(l, xh(e, t, r, n, o, a, i, s, c, u));
  }, l;
}
function SK() {
  return Yt.apply(xh(y3, b3, Mr, bh, Hc, Ha, gh, mh, bn, pA).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function OK() {
  return Yt.apply(xh(v3, g3, Ir, wh, Gc, qc, yh, vh, bn, hA).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Yc() {
  var e = 0, t = 1, r, n, o, a, i = ft, s = !1, c;
  function u(d) {
    return d == null || isNaN(d = +d) ? c : i(o === 0 ? 0.5 : (d = (a(d) - r) * o, s ? Math.max(0, Math.min(1, d)) : d));
  }
  u.domain = function(d) {
    return arguments.length ? ([e, t] = d, r = a(e = +e), n = a(t = +t), o = r === n ? 0 : 1 / (n - r), u) : [e, t];
  }, u.clamp = function(d) {
    return arguments.length ? (s = !!d, u) : s;
  }, u.interpolator = function(d) {
    return arguments.length ? (i = d, u) : i;
  };
  function l(d) {
    return function(p) {
      var f, v;
      return arguments.length ? ([f, v] = p, i = d(f, v), u) : [i(0), i(1)];
    };
  }
  return u.range = l(_o), u.rangeRound = l(ih), u.unknown = function(d) {
    return arguments.length ? (c = d, u) : c;
  }, function(d) {
    return a = d, r = d(e), n = d(t), o = r === n ? 0 : 1 / (n - r), u;
  };
}
function un(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function mA() {
  var e = ln(Yc()(ft));
  return e.copy = function() {
    return un(e, mA());
  }, $r.apply(e, arguments);
}
function vA() {
  var e = uh(Yc()).domain([1, 10]);
  return e.copy = function() {
    return un(e, vA()).base(e.base());
  }, $r.apply(e, arguments);
}
function gA() {
  var e = dh(Yc());
  return e.copy = function() {
    return un(e, gA()).constant(e.constant());
  }, $r.apply(e, arguments);
}
function Eh() {
  var e = fh(Yc());
  return e.copy = function() {
    return un(e, Eh()).exponent(e.exponent());
  }, $r.apply(e, arguments);
}
function PK() {
  return Eh.apply(null, arguments).exponent(0.5);
}
function yA() {
  var e = [], t = ft;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Ka(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let o of n) o != null && !isNaN(o = +o) && e.push(o);
    return e.sort(Zr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, o) => t(o / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (o, a) => uW(e, a / n));
  }, r.copy = function() {
    return yA(t).domain(e);
  }, $r.apply(r, arguments);
}
function Xc() {
  var e = 0, t = 0.5, r = 1, n = 1, o, a, i, s, c, u = ft, l, d = !1, p;
  function f(h) {
    return isNaN(h = +h) ? p : (h = 0.5 + ((h = +l(h)) - a) * (n * h < n * a ? s : c), u(d ? Math.max(0, Math.min(1, h)) : h));
  }
  f.domain = function(h) {
    return arguments.length ? ([e, t, r] = h, o = l(e = +e), a = l(t = +t), i = l(r = +r), s = o === a ? 0 : 0.5 / (a - o), c = a === i ? 0 : 0.5 / (i - a), n = a < o ? -1 : 1, f) : [e, t, r];
  }, f.clamp = function(h) {
    return arguments.length ? (d = !!h, f) : d;
  }, f.interpolator = function(h) {
    return arguments.length ? (u = h, f) : u;
  };
  function v(h) {
    return function(g) {
      var y, w, x;
      return arguments.length ? ([y, w, x] = g, u = LW(h, [y, w, x]), f) : [u(0), u(0.5), u(1)];
    };
  }
  return f.range = v(_o), f.rangeRound = v(ih), f.unknown = function(h) {
    return arguments.length ? (p = h, f) : p;
  }, function(h) {
    return l = h, o = h(e), a = h(t), i = h(r), s = o === a ? 0 : 0.5 / (a - o), c = a === i ? 0 : 0.5 / (i - a), n = a < o ? -1 : 1, f;
  };
}
function bA() {
  var e = ln(Xc()(ft));
  return e.copy = function() {
    return un(e, bA());
  }, $r.apply(e, arguments);
}
function wA() {
  var e = uh(Xc()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return un(e, wA()).base(e.base());
  }, $r.apply(e, arguments);
}
function xA() {
  var e = dh(Xc());
  return e.copy = function() {
    return un(e, xA()).constant(e.constant());
  }, $r.apply(e, arguments);
}
function Sh() {
  var e = fh(Xc());
  return e.copy = function() {
    return un(e, Sh()).exponent(e.exponent());
  }, $r.apply(e, arguments);
}
function AK() {
  return Sh.apply(null, arguments).exponent(0.5);
}
const Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: nh,
  scaleDiverging: bA,
  scaleDivergingLog: wA,
  scaleDivergingPow: Sh,
  scaleDivergingSqrt: AK,
  scaleDivergingSymlog: xA,
  scaleIdentity: Q1,
  scaleImplicit: xf,
  scaleLinear: J1,
  scaleLog: tA,
  scaleOrdinal: rh,
  scalePoint: pW,
  scalePow: ph,
  scaleQuantile: oA,
  scaleQuantize: aA,
  scaleRadial: nA,
  scaleSequential: mA,
  scaleSequentialLog: vA,
  scaleSequentialPow: Eh,
  scaleSequentialQuantile: yA,
  scaleSequentialSqrt: PK,
  scaleSequentialSymlog: gA,
  scaleSqrt: i3,
  scaleSymlog: rA,
  scaleThreshold: iA,
  scaleTime: SK,
  scaleUtc: OK,
  tickFormat: Z1
}, Symbol.toStringTag, { value: "Module" }));
var dn = (e) => e.chartData, Oh = k([dn], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), Ga = (e, t, r, n) => n ? Oh(e) : dn(e);
function $n(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, r] = e;
    if (We(t) && We(r))
      return !0;
  }
  return !1;
}
function gb(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function EA(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var [r, n] = e, o, a;
    if (We(r))
      o = r;
    else if (typeof r == "function")
      return;
    if (We(n))
      a = n;
    else if (typeof n == "function")
      return;
    var i = [o, a];
    if ($n(i))
      return i;
  }
}
function CK(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if ($n(n))
          return gb(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var [o, a] = e, i, s;
      if (o === "auto")
        t != null && (i = Math.min(...t));
      else if (Q(o))
        i = o;
      else if (typeof o == "function")
        try {
          t != null && (i = o(t?.[0]));
        } catch {
        }
      else if (typeof o == "string" && ey.test(o)) {
        var c = ey.exec(o);
        if (c == null || t == null)
          i = void 0;
        else {
          var u = +c[1];
          i = t[0] - u;
        }
      } else
        i = t?.[0];
      if (a === "auto")
        t != null && (s = Math.max(...t));
      else if (Q(a))
        s = a;
      else if (typeof a == "function")
        try {
          t != null && (s = a(t?.[1]));
        } catch {
        }
      else if (typeof a == "string" && ty.test(a)) {
        var l = ty.exec(a);
        if (l == null || t == null)
          s = void 0;
        else {
          var d = +l[1];
          s = t[1] + d;
        }
      } else
        s = t?.[1];
      var p = [i, s];
      if ($n(p))
        return t == null ? p : gb(p, t, r);
    }
  }
}
var ko = 1e9, TK = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, Ah, ke = !0, Gt = "[DecimalError] ", An = Gt + "Invalid argument: ", Ph = Gt + "Exponent out of range: ", No = Math.floor, vn = Math.pow, _K = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, kt, Je = 1e7, Ae = 7, SA = 9007199254740991, ks = No(SA / Ae), X = {};
X.absoluteValue = X.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
X.comparedTo = X.cmp = function(e) {
  var t, r, n, o, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, o = e.d.length, t = 0, r = n < o ? n : o; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === o ? 0 : n > o ^ a.s < 0 ? 1 : -1;
};
X.decimalPlaces = X.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * Ae;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
X.dividedBy = X.div = function(e) {
  return Ar(this, new this.constructor(e));
};
X.dividedToIntegerBy = X.idiv = function(e) {
  var t = this, r = t.constructor;
  return Oe(Ar(t, new r(e), 0, 1), r.precision);
};
X.equals = X.eq = function(e) {
  return !this.cmp(e);
};
X.exponent = function() {
  return Ue(this);
};
X.greaterThan = X.gt = function(e) {
  return this.cmp(e) > 0;
};
X.greaterThanOrEqualTo = X.gte = function(e) {
  return this.cmp(e) >= 0;
};
X.isInteger = X.isint = function() {
  return this.e > this.d.length - 2;
};
X.isNegative = X.isneg = function() {
  return this.s < 0;
};
X.isPositive = X.ispos = function() {
  return this.s > 0;
};
X.isZero = function() {
  return this.s === 0;
};
X.lessThan = X.lt = function(e) {
  return this.cmp(e) < 0;
};
X.lessThanOrEqualTo = X.lte = function(e) {
  return this.cmp(e) < 1;
};
X.logarithm = X.log = function(e) {
  var t, r = this, n = r.constructor, o = n.precision, a = o + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(kt)) throw Error(Gt + "NaN");
  if (r.s < 1) throw Error(Gt + (r.s ? "NaN" : "-Infinity"));
  return r.eq(kt) ? new n(0) : (ke = !1, t = Ar(ya(r, a), ya(e, a), a), ke = !0, Oe(t, o));
};
X.minus = X.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? AA(t, e) : OA(t, (e.s = -e.s, e));
};
X.modulo = X.mod = function(e) {
  var t, r = this, n = r.constructor, o = n.precision;
  if (e = new n(e), !e.s) throw Error(Gt + "NaN");
  return r.s ? (ke = !1, t = Ar(r, e, 0, 1).times(e), ke = !0, r.minus(t)) : Oe(new n(r), o);
};
X.naturalExponential = X.exp = function() {
  return PA(this);
};
X.naturalLogarithm = X.ln = function() {
  return ya(this);
};
X.negated = X.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
X.plus = X.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? OA(t, e) : AA(t, (e.s = -e.s, e));
};
X.precision = X.sd = function(e) {
  var t, r, n, o = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(An + e);
  if (t = Ue(o) + 1, n = o.d.length - 1, r = n * Ae + 1, n = o.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = o.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
X.squareRoot = X.sqrt = function() {
  var e, t, r, n, o, a, i, s = this, c = s.constructor;
  if (s.s < 1) {
    if (!s.s) return new c(0);
    throw Error(Gt + "NaN");
  }
  for (e = Ue(s), ke = !1, o = Math.sqrt(+s), o == 0 || o == 1 / 0 ? (t = cr(s.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = No((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new c(t)) : n = new c(o.toString()), r = c.precision, o = i = r + 3; ; )
    if (a = n, n = a.plus(Ar(s, a, i + 2)).times(0.5), cr(a.d).slice(0, i) === (t = cr(n.d)).slice(0, i)) {
      if (t = t.slice(i - 3, i + 1), o == i && t == "4999") {
        if (Oe(a, r + 1, 0), a.times(a).eq(s)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      i += 4;
    }
  return ke = !0, Oe(n, r);
};
X.times = X.mul = function(e) {
  var t, r, n, o, a, i, s, c, u, l = this, d = l.constructor, p = l.d, f = (e = new d(e)).d;
  if (!l.s || !e.s) return new d(0);
  for (e.s *= l.s, r = l.e + e.e, c = p.length, u = f.length, c < u && (a = p, p = f, f = a, i = c, c = u, u = i), a = [], i = c + u, n = i; n--; ) a.push(0);
  for (n = u; --n >= 0; ) {
    for (t = 0, o = c + n; o > n; )
      s = a[o] + f[n] * p[o - n - 1] + t, a[o--] = s % Je | 0, t = s / Je | 0;
    a[o] = (a[o] + t) % Je | 0;
  }
  for (; !a[--i]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, ke ? Oe(e, d.precision) : e;
};
X.toDecimalPlaces = X.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (hr(e, 0, ko), t === void 0 ? t = n.rounding : hr(t, 0, 8), Oe(r, e + Ue(r) + 1, t));
};
X.toExponential = function(e, t) {
  var r, n = this, o = n.constructor;
  return e === void 0 ? r = Bn(n, !0) : (hr(e, 0, ko), t === void 0 ? t = o.rounding : hr(t, 0, 8), n = Oe(new o(n), e + 1, t), r = Bn(n, !0, e + 1)), r;
};
X.toFixed = function(e, t) {
  var r, n, o = this, a = o.constructor;
  return e === void 0 ? Bn(o) : (hr(e, 0, ko), t === void 0 ? t = a.rounding : hr(t, 0, 8), n = Oe(new a(o), e + Ue(o) + 1, t), r = Bn(n.abs(), !1, e + Ue(n) + 1), o.isneg() && !o.isZero() ? "-" + r : r);
};
X.toInteger = X.toint = function() {
  var e = this, t = e.constructor;
  return Oe(new t(e), Ue(e) + 1, t.rounding);
};
X.toNumber = function() {
  return +this;
};
X.toPower = X.pow = function(e) {
  var t, r, n, o, a, i, s = this, c = s.constructor, u = 12, l = +(e = new c(e));
  if (!e.s) return new c(kt);
  if (s = new c(s), !s.s) {
    if (e.s < 1) throw Error(Gt + "Infinity");
    return s;
  }
  if (s.eq(kt)) return s;
  if (n = c.precision, e.eq(kt)) return Oe(s, n);
  if (t = e.e, r = e.d.length - 1, i = t >= r, a = s.s, i) {
    if ((r = l < 0 ? -l : l) <= SA) {
      for (o = new c(kt), t = Math.ceil(n / Ae + 4), ke = !1; r % 2 && (o = o.times(s), bb(o.d, t)), r = No(r / 2), r !== 0; )
        s = s.times(s), bb(s.d, t);
      return ke = !0, e.s < 0 ? new c(kt).div(o) : Oe(o, n);
    }
  } else if (a < 0) throw Error(Gt + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, s.s = 1, ke = !1, o = e.times(ya(s, n + u)), ke = !0, o = PA(o), o.s = a, o;
};
X.toPrecision = function(e, t) {
  var r, n, o = this, a = o.constructor;
  return e === void 0 ? (r = Ue(o), n = Bn(o, r <= a.toExpNeg || r >= a.toExpPos)) : (hr(e, 1, ko), t === void 0 ? t = a.rounding : hr(t, 0, 8), o = Oe(new a(o), e, t), r = Ue(o), n = Bn(o, e <= r || r <= a.toExpNeg, e)), n;
};
X.toSignificantDigits = X.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (hr(e, 1, ko), t === void 0 ? t = n.rounding : hr(t, 0, 8)), Oe(new n(r), e, t);
};
X.toString = X.valueOf = X.val = X.toJSON = X[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Ue(e), r = e.constructor;
  return Bn(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function OA(e, t) {
  var r, n, o, a, i, s, c, u, l = e.constructor, d = l.precision;
  if (!e.s || !t.s)
    return t.s || (t = new l(e)), ke ? Oe(t, d) : t;
  if (c = e.d, u = t.d, i = e.e, o = t.e, c = c.slice(), a = i - o, a) {
    for (a < 0 ? (n = c, a = -a, s = u.length) : (n = u, o = i, s = c.length), i = Math.ceil(d / Ae), s = i > s ? i + 1 : s + 1, a > s && (a = s, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (s = c.length, a = u.length, s - a < 0 && (a = s, n = u, u = c, c = n), r = 0; a; )
    r = (c[--a] = c[a] + u[a] + r) / Je | 0, c[a] %= Je;
  for (r && (c.unshift(r), ++o), s = c.length; c[--s] == 0; ) c.pop();
  return t.d = c, t.e = o, ke ? Oe(t, d) : t;
}
function hr(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(An + e);
}
function cr(e) {
  var t, r, n, o = e.length - 1, a = "", i = e[0];
  if (o > 0) {
    for (a += i, t = 1; t < o; t++)
      n = e[t] + "", r = Ae - n.length, r && (a += Vr(r)), a += n;
    i = e[t], n = i + "", r = Ae - n.length, r && (a += Vr(r));
  } else if (i === 0)
    return "0";
  for (; i % 10 === 0; ) i /= 10;
  return a + i;
}
var Ar = /* @__PURE__ */ (function() {
  function e(n, o) {
    var a, i = 0, s = n.length;
    for (n = n.slice(); s--; )
      a = n[s] * o + i, n[s] = a % Je | 0, i = a / Je | 0;
    return i && n.unshift(i), n;
  }
  function t(n, o, a, i) {
    var s, c;
    if (a != i)
      c = a > i ? 1 : -1;
    else
      for (s = c = 0; s < a; s++)
        if (n[s] != o[s]) {
          c = n[s] > o[s] ? 1 : -1;
          break;
        }
    return c;
  }
  function r(n, o, a) {
    for (var i = 0; a--; )
      n[a] -= i, i = n[a] < o[a] ? 1 : 0, n[a] = i * Je + n[a] - o[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, o, a, i) {
    var s, c, u, l, d, p, f, v, h, g, y, w, x, S, E, O, P, A, _ = n.constructor, N = n.s == o.s ? 1 : -1, T = n.d, R = o.d;
    if (!n.s) return new _(n);
    if (!o.s) throw Error(Gt + "Division by zero");
    for (c = n.e - o.e, P = R.length, E = T.length, f = new _(N), v = f.d = [], u = 0; R[u] == (T[u] || 0); ) ++u;
    if (R[u] > (T[u] || 0) && --c, a == null ? w = a = _.precision : i ? w = a + (Ue(n) - Ue(o)) + 1 : w = a, w < 0) return new _(0);
    if (w = w / Ae + 2 | 0, u = 0, P == 1)
      for (l = 0, R = R[0], w++; (u < E || l) && w--; u++)
        x = l * Je + (T[u] || 0), v[u] = x / R | 0, l = x % R | 0;
    else {
      for (l = Je / (R[0] + 1) | 0, l > 1 && (R = e(R, l), T = e(T, l), P = R.length, E = T.length), S = P, h = T.slice(0, P), g = h.length; g < P; ) h[g++] = 0;
      A = R.slice(), A.unshift(0), O = R[0], R[1] >= Je / 2 && ++O;
      do
        l = 0, s = t(R, h, P, g), s < 0 ? (y = h[0], P != g && (y = y * Je + (h[1] || 0)), l = y / O | 0, l > 1 ? (l >= Je && (l = Je - 1), d = e(R, l), p = d.length, g = h.length, s = t(d, h, p, g), s == 1 && (l--, r(d, P < p ? A : R, p))) : (l == 0 && (s = l = 1), d = R.slice()), p = d.length, p < g && d.unshift(0), r(h, d, g), s == -1 && (g = h.length, s = t(R, h, P, g), s < 1 && (l++, r(h, P < g ? A : R, g))), g = h.length) : s === 0 && (l++, h = [0]), v[u++] = l, s && h[0] ? h[g++] = T[S] || 0 : (h = [T[S]], g = 1);
      while ((S++ < E || h[0] !== void 0) && w--);
    }
    return v[0] || v.shift(), f.e = c, Oe(f, i ? a + Ue(f) + 1 : a);
  };
})();
function PA(e, t) {
  var r, n, o, a, i, s, c = 0, u = 0, l = e.constructor, d = l.precision;
  if (Ue(e) > 16) throw Error(Ph + Ue(e));
  if (!e.s) return new l(kt);
  for (ke = !1, s = d, i = new l(0.03125); e.abs().gte(0.1); )
    e = e.times(i), u += 5;
  for (n = Math.log(vn(2, u)) / Math.LN10 * 2 + 5 | 0, s += n, r = o = a = new l(kt), l.precision = s; ; ) {
    if (o = Oe(o.times(e), s), r = r.times(++c), i = a.plus(Ar(o, r, s)), cr(i.d).slice(0, s) === cr(a.d).slice(0, s)) {
      for (; u--; ) a = Oe(a.times(a), s);
      return l.precision = d, t == null ? (ke = !0, Oe(a, d)) : a;
    }
    a = i;
  }
}
function Ue(e) {
  for (var t = e.e * Ae, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function ad(e, t, r) {
  if (t > e.LN10.sd())
    throw ke = !0, r && (e.precision = r), Error(Gt + "LN10 precision limit exceeded");
  return Oe(new e(e.LN10), t);
}
function Vr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function ya(e, t) {
  var r, n, o, a, i, s, c, u, l, d = 1, p = 10, f = e, v = f.d, h = f.constructor, g = h.precision;
  if (f.s < 1) throw Error(Gt + (f.s ? "NaN" : "-Infinity"));
  if (f.eq(kt)) return new h(0);
  if (t == null ? (ke = !1, u = g) : u = t, f.eq(10))
    return t == null && (ke = !0), ad(h, u);
  if (u += p, h.precision = u, r = cr(v), n = r.charAt(0), a = Ue(f), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      f = f.times(e), r = cr(f.d), n = r.charAt(0), d++;
    a = Ue(f), n > 1 ? (f = new h("0." + r), a++) : f = new h(n + "." + r.slice(1));
  } else
    return c = ad(h, u + 2, g).times(a + ""), f = ya(new h(n + "." + r.slice(1)), u - p).plus(c), h.precision = g, t == null ? (ke = !0, Oe(f, g)) : f;
  for (s = i = f = Ar(f.minus(kt), f.plus(kt), u), l = Oe(f.times(f), u), o = 3; ; ) {
    if (i = Oe(i.times(l), u), c = s.plus(Ar(i, new h(o), u)), cr(c.d).slice(0, u) === cr(s.d).slice(0, u))
      return s = s.times(2), a !== 0 && (s = s.plus(ad(h, u + 2, g).times(a + ""))), s = Ar(s, new h(d), u), h.precision = g, t == null ? (ke = !0, Oe(s, g)) : s;
    s = c, o += 2;
  }
}
function yb(e, t) {
  var r, n, o;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (o = t.length; t.charCodeAt(o - 1) === 48; ) --o;
  if (t = t.slice(n, o), t) {
    if (o -= n, r = r - n - 1, e.e = No(r / Ae), e.d = [], n = (r + 1) % Ae, r < 0 && (n += Ae), n < o) {
      for (n && e.d.push(+t.slice(0, n)), o -= Ae; n < o; ) e.d.push(+t.slice(n, n += Ae));
      t = t.slice(n), n = Ae - t.length;
    } else
      n -= o;
    for (; n--; ) t += "0";
    if (e.d.push(+t), ke && (e.e > ks || e.e < -ks)) throw Error(Ph + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function Oe(e, t, r) {
  var n, o, a, i, s, c, u, l, d = e.d;
  for (i = 1, a = d[0]; a >= 10; a /= 10) i++;
  if (n = t - i, n < 0)
    n += Ae, o = t, u = d[l = 0];
  else {
    if (l = Math.ceil((n + 1) / Ae), a = d.length, l >= a) return e;
    for (u = a = d[l], i = 1; a >= 10; a /= 10) i++;
    n %= Ae, o = n - Ae + i;
  }
  if (r !== void 0 && (a = vn(10, i - o - 1), s = u / a % 10 | 0, c = t < 0 || d[l + 1] !== void 0 || u % a, c = r < 4 ? (s || c) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : s > 5 || s == 5 && (r == 4 || c || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? o > 0 ? u / vn(10, i - o) : 0 : d[l - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !d[0])
    return c ? (a = Ue(e), d.length = 1, t = t - a - 1, d[0] = vn(10, (Ae - t % Ae) % Ae), e.e = No(-t / Ae) || 0) : (d.length = 1, d[0] = e.e = e.s = 0), e;
  if (n == 0 ? (d.length = l, a = 1, l--) : (d.length = l + 1, a = vn(10, Ae - n), d[l] = o > 0 ? (u / vn(10, i - o) % vn(10, o) | 0) * a : 0), c)
    for (; ; )
      if (l == 0) {
        (d[0] += a) == Je && (d[0] = 1, ++e.e);
        break;
      } else {
        if (d[l] += a, d[l] != Je) break;
        d[l--] = 0, a = 1;
      }
  for (n = d.length; d[--n] === 0; ) d.pop();
  if (ke && (e.e > ks || e.e < -ks))
    throw Error(Ph + Ue(e));
  return e;
}
function AA(e, t) {
  var r, n, o, a, i, s, c, u, l, d, p = e.constructor, f = p.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new p(e), ke ? Oe(t, f) : t;
  if (c = e.d, d = t.d, n = t.e, u = e.e, c = c.slice(), i = u - n, i) {
    for (l = i < 0, l ? (r = c, i = -i, s = d.length) : (r = d, n = u, s = c.length), o = Math.max(Math.ceil(f / Ae), s) + 2, i > o && (i = o, r.length = 1), r.reverse(), o = i; o--; ) r.push(0);
    r.reverse();
  } else {
    for (o = c.length, s = d.length, l = o < s, l && (s = o), o = 0; o < s; o++)
      if (c[o] != d[o]) {
        l = c[o] < d[o];
        break;
      }
    i = 0;
  }
  for (l && (r = c, c = d, d = r, t.s = -t.s), s = c.length, o = d.length - s; o > 0; --o) c[s++] = 0;
  for (o = d.length; o > i; ) {
    if (c[--o] < d[o]) {
      for (a = o; a && c[--a] === 0; ) c[a] = Je - 1;
      --c[a], c[o] += Je;
    }
    c[o] -= d[o];
  }
  for (; c[--s] === 0; ) c.pop();
  for (; c[0] === 0; c.shift()) --n;
  return c[0] ? (t.d = c, t.e = n, ke ? Oe(t, f) : t) : new p(0);
}
function Bn(e, t, r) {
  var n, o = Ue(e), a = cr(e.d), i = a.length;
  return t ? (r && (n = r - i) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Vr(n) : i > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (o < 0 ? "e" : "e+") + o) : o < 0 ? (a = "0." + Vr(-o - 1) + a, r && (n = r - i) > 0 && (a += Vr(n))) : o >= i ? (a += Vr(o + 1 - i), r && (n = r - o - 1) > 0 && (a = a + "." + Vr(n))) : ((n = o + 1) < i && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - i) > 0 && (o + 1 === i && (a += "."), a += Vr(n))), e.s < 0 ? "-" + a : a;
}
function bb(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function CA(e) {
  var t, r, n;
  function o(a) {
    var i = this;
    if (!(i instanceof o)) return new o(a);
    if (i.constructor = o, a instanceof o) {
      i.s = a.s, i.e = a.e, i.d = (a = a.d) ? a.slice() : a;
      return;
    }
    if (typeof a == "number") {
      if (a * 0 !== 0)
        throw Error(An + a);
      if (a > 0)
        i.s = 1;
      else if (a < 0)
        a = -a, i.s = -1;
      else {
        i.s = 0, i.e = 0, i.d = [0];
        return;
      }
      if (a === ~~a && a < 1e7) {
        i.e = 0, i.d = [a];
        return;
      }
      return yb(i, a.toString());
    } else if (typeof a != "string")
      throw Error(An + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), i.s = -1) : i.s = 1, _K.test(a)) yb(i, a);
    else throw Error(An + a);
  }
  if (o.prototype = X, o.ROUND_UP = 0, o.ROUND_DOWN = 1, o.ROUND_CEIL = 2, o.ROUND_FLOOR = 3, o.ROUND_HALF_UP = 4, o.ROUND_HALF_DOWN = 5, o.ROUND_HALF_EVEN = 6, o.ROUND_HALF_CEIL = 7, o.ROUND_HALF_FLOOR = 8, o.clone = CA, o.config = o.set = kK, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return o.config(e), o;
}
function kK(e) {
  if (!e || typeof e != "object")
    throw Error(Gt + "Object expected");
  var t, r, n, o = [
    "precision",
    1,
    ko,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < o.length; t += 3)
    if ((n = e[r = o[t]]) !== void 0)
      if (No(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n;
      else throw Error(An + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(An + r + ": " + n);
  return this;
}
var Ah = CA(TK);
kt = new Ah(1);
const be = Ah;
var NK = (e) => e, TA = {}, _A = (e) => e === TA, wb = (e) => function t() {
  return arguments.length === 0 || arguments.length === 1 && _A(arguments.length <= 0 ? void 0 : arguments[0]) ? t : e(...arguments);
}, kA = (e, t) => e === 1 ? t : wb(function() {
  for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
    n[o] = arguments[o];
  var a = n.filter((i) => i !== TA).length;
  return a >= e ? t(...n) : kA(e - a, wb(function() {
    for (var i = arguments.length, s = new Array(i), c = 0; c < i; c++)
      s[c] = arguments[c];
    var u = n.map((l) => _A(l) ? s.shift() : l);
    return t(...u, ...s);
  }));
}), Zc = (e) => kA(e.length, e), Pf = (e, t) => {
  for (var r = [], n = e; n < t; ++n)
    r[n - e] = n;
  return r;
}, RK = Zc((e, t) => Array.isArray(t) ? t.map(e) : Object.keys(t).map((r) => t[r]).map(e)), MK = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return NK;
  var o = r.reverse(), a = o[0], i = o.slice(1);
  return function() {
    return i.reduce((s, c) => c(s), a(...arguments));
  };
}, Af = (e) => Array.isArray(e) ? e.reverse() : e.split("").reverse().join(""), NA = (e) => {
  var t = null, r = null;
  return function() {
    for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
      o[a] = arguments[a];
    return t && o.every((i, s) => {
      var c;
      return i === ((c = t) === null || c === void 0 ? void 0 : c[s]);
    }) || (t = o, r = e(...o)), r;
  };
};
function RA(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new be(e).abs().log(10).toNumber()) + 1, t;
}
function MA(e, t, r) {
  for (var n = new be(e), o = 0, a = []; n.lt(t) && o < 1e5; )
    a.push(n.toNumber()), n = n.add(r), o++;
  return a;
}
Zc((e, t, r) => {
  var n = +e, o = +t;
  return n + r * (o - n);
});
Zc((e, t, r) => {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
});
Zc((e, t, r) => {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
var IA = (e) => {
  var [t, r] = e, [n, o] = [t, r];
  return t > r && ([n, o] = [r, t]), [n, o];
}, DA = (e, t, r) => {
  if (e.lte(0))
    return new be(0);
  var n = RA(e.toNumber()), o = new be(10).pow(n), a = e.div(o), i = n !== 1 ? 0.05 : 0.1, s = new be(Math.ceil(a.div(i).toNumber())).add(r).mul(i), c = s.mul(o);
  return t ? new be(c.toNumber()) : new be(Math.ceil(c.toNumber()));
}, IK = (e, t, r) => {
  var n = new be(1), o = new be(e);
  if (!o.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new be(10).pow(RA(e) - 1), o = new be(Math.floor(o.div(n).toNumber())).mul(n)) : a > 1 && (o = new be(Math.floor(e)));
  } else e === 0 ? o = new be(Math.floor((t - 1) / 2)) : r || (o = new be(Math.floor(e)));
  var i = Math.floor((t - 1) / 2), s = MK(RK((c) => o.add(new be(c - i).mul(n)).toNumber()), Pf);
  return s(0, t);
}, jA = function(t, r, n, o) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new be(0),
      tickMin: new be(0),
      tickMax: new be(0)
    };
  var i = DA(new be(r).sub(t).div(n - 1), o, a), s;
  t <= 0 && r >= 0 ? s = new be(0) : (s = new be(t).add(r).div(2), s = s.sub(new be(s).mod(i)));
  var c = Math.ceil(s.sub(t).div(i).toNumber()), u = Math.ceil(new be(r).sub(s).div(i).toNumber()), l = c + u + 1;
  return l > n ? jA(t, r, n, o, a + 1) : (l < n && (u = r > 0 ? u + (n - l) : u, c = r > 0 ? c : c + (n - l)), {
    step: i,
    tickMin: s.sub(new be(c).mul(i)),
    tickMax: s.add(new be(u).mul(i))
  });
};
function DK(e) {
  var [t, r] = e, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, a = Math.max(n, 2), [i, s] = IA([t, r]);
  if (i === -1 / 0 || s === 1 / 0) {
    var c = s === 1 / 0 ? [i, ...Pf(0, n - 1).map(() => 1 / 0)] : [...Pf(0, n - 1).map(() => -1 / 0), s];
    return t > r ? Af(c) : c;
  }
  if (i === s)
    return IK(i, n, o);
  var {
    step: u,
    tickMin: l,
    tickMax: d
  } = jA(i, s, a, o, 0), p = MA(l, d.add(new be(0.1).mul(u)), u);
  return t > r ? Af(p) : p;
}
function jK(e, t) {
  var [r, n] = e, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, [a, i] = IA([r, n]);
  if (a === -1 / 0 || i === 1 / 0)
    return [r, n];
  if (a === i)
    return [a];
  var s = Math.max(t, 2), c = DA(new be(i).sub(a).div(s - 1), o, 0), u = [...MA(new be(a), new be(i), c), i];
  return o === !1 && (u = u.map((l) => Math.round(l))), r > n ? Af(u) : u;
}
var LK = NA(DK), $K = NA(jK), LA = (e) => e.rootProps.maxBarSize, BK = (e) => e.rootProps.barGap, $A = (e) => e.rootProps.barCategoryGap, FK = (e) => e.rootProps.barSize, Ya = (e) => e.rootProps.stackOffset, Ch = (e) => e.options.chartName, Th = (e) => e.rootProps.syncId, BA = (e) => e.rootProps.syncMethod, _h = (e) => e.options.eventEmitter, wr = {
  allowDuplicatedCategory: !0,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  angleAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  type: "category"
}, Ct = {
  allowDataOverflow: !1,
  allowDuplicatedCategory: !0,
  radiusAxisId: 0,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  type: "number"
}, Jc = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
}, zK = {
  allowDataOverflow: !1,
  allowDecimals: !1,
  allowDuplicatedCategory: !1,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: wr.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: wr.reversed,
  scale: wr.scale,
  tick: wr.tick,
  tickCount: void 0,
  ticks: void 0,
  type: wr.type,
  unit: void 0
}, UK = {
  allowDataOverflow: Ct.allowDataOverflow,
  allowDecimals: !1,
  allowDuplicatedCategory: Ct.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: Ct.radiusAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: !1,
  scale: Ct.scale,
  tick: Ct.tick,
  tickCount: Ct.tickCount,
  ticks: void 0,
  type: Ct.type,
  unit: void 0
}, WK = {
  allowDataOverflow: !1,
  allowDecimals: !1,
  allowDuplicatedCategory: wr.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: wr.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: !1,
  scale: wr.scale,
  tick: wr.tick,
  tickCount: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0
}, KK = {
  allowDataOverflow: Ct.allowDataOverflow,
  allowDecimals: !1,
  allowDuplicatedCategory: Ct.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: Ct.radiusAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: !1,
  scale: Ct.scale,
  tick: Ct.tick,
  tickCount: Ct.tickCount,
  ticks: void 0,
  type: "category",
  unit: void 0
}, kh = (e, t) => e.polarAxis.angleAxis[t] != null ? e.polarAxis.angleAxis[t] : e.layout.layoutType === "radial" ? WK : zK, Nh = (e, t) => e.polarAxis.radiusAxis[t] != null ? e.polarAxis.radiusAxis[t] : e.layout.layoutType === "radial" ? KK : UK, Qc = (e) => e.polarOptions, Rh = k([Dr, jr, He], g1), FA = k([Qc, Rh], (e, t) => {
  if (e != null)
    return ct(e.innerRadius, t, 0);
}), zA = k([Qc, Rh], (e, t) => {
  if (e != null)
    return ct(e.outerRadius, t, t * 0.8);
}), VK = (e) => {
  if (e == null)
    return [0, 0];
  var {
    startAngle: t,
    endAngle: r
  } = e;
  return [t, r];
}, UA = k([Qc], VK);
k([kh, UA], Jc);
var WA = k([Rh, FA, zA], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
});
k([Nh, WA], Jc);
var KA = k([fe, Qc, FA, zA, Dr, jr], (e, t, r, n, o, a) => {
  if (!(e !== "centric" && e !== "radial" || t == null || r == null || n == null)) {
    var {
      cx: i,
      cy: s,
      startAngle: c,
      endAngle: u
    } = t;
    return {
      cx: ct(i, o, o / 2),
      cy: ct(s, a, a / 2),
      innerRadius: r,
      outerRadius: n,
      startAngle: c,
      endAngle: u,
      clockWise: !1
      // this property look useful, why not use it?
    };
  }
}), Me = (e, t) => t, Xa = (e, t, r) => r;
function el(e) {
  return e?.id;
}
var Xe = (e) => {
  var t = fe(e);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, Ro = (e) => e.tooltip.settings.axisId, Ze = (e) => {
  var t = Xe(e), r = Ro(e);
  return Za(e, t, r);
}, VA = k([Ze], (e) => e?.dataKey);
function qA(e, t, r) {
  var {
    chartData: n = []
  } = t, {
    allowDuplicatedCategory: o,
    dataKey: a
  } = r, i = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    var c, u = (c = s.data) !== null && c !== void 0 ? c : n;
    if (!(u == null || u.length === 0)) {
      var l = el(s);
      u.forEach((d, p) => {
        var f = a == null || o ? p : String(Se(d, a, null)), v = Se(d, s.dataKey, 0), h;
        i.has(f) ? h = i.get(f) : h = {}, Object.assign(h, {
          [l]: v
        }), i.set(f, h);
      });
    }
  }), Array.from(i.values());
}
function tl(e) {
  return e.stackId != null && e.dataKey != null;
}
var rl = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function nl(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function xb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ns(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xb(Object(r), !0).forEach(function(n) {
      qK(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qK(e, t, r) {
  return (t = HK(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function HK(e) {
  var t = GK(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function GK(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Cf = [0, "auto"], Ot = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0
}, HA = (e, t) => e.cartesianAxis.xAxis[t], Br = (e, t) => {
  var r = HA(e, t);
  return r ?? Ot;
}, Pt = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: Cf,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  width: Ua
}, GA = (e, t) => e.cartesianAxis.yAxis[t], Fr = (e, t) => {
  var r = GA(e, t);
  return r ?? Pt;
}, YK = {
  domain: [0, "auto"],
  includeHidden: !1,
  reversed: !1,
  allowDataOverflow: !1,
  allowDuplicatedCategory: !1,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
}, Mh = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? YK;
}, De = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Br(e, r);
    case "yAxis":
      return Fr(e, r);
    case "zAxis":
      return Mh(e, r);
    case "angleAxis":
      return kh(e, r);
    case "radiusAxis":
      return Nh(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, XK = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Br(e, r);
    case "yAxis":
      return Fr(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, Za = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Br(e, r);
    case "yAxis":
      return Fr(e, r);
    case "angleAxis":
      return kh(e, r);
    case "radiusAxis":
      return Nh(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, YA = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function Ih(e, t) {
  return (r) => {
    switch (e) {
      case "xAxis":
        return "xAxisId" in r && r.xAxisId === t;
      case "yAxis":
        return "yAxisId" in r && r.yAxisId === t;
      case "zAxis":
        return "zAxisId" in r && r.zAxisId === t;
      case "angleAxis":
        return "angleAxisId" in r && r.angleAxisId === t;
      case "radiusAxis":
        return "radiusAxisId" in r && r.radiusAxisId === t;
      default:
        return !1;
    }
  };
}
var Ja = (e) => e.graphicalItems.cartesianItems, ZK = k([Me, Xa], Ih), Dh = (e, t, r) => e.filter(r).filter((n) => t?.includeHidden === !0 ? !0 : !n.hide), Qa = k([Ja, De, ZK], Dh, {
  memoizeOptions: {
    resultEqualityCheck: nl
  }
}), XA = k([Qa], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter(tl)), ZA = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), JK = k([Qa], ZA), jh = (e) => e.map((t) => t.data).filter(Boolean).flat(1), QK = k([Qa], jh, {
  memoizeOptions: {
    resultEqualityCheck: nl
  }
}), Lh = (e, t) => {
  var {
    chartData: r = [],
    dataStartIndex: n,
    dataEndIndex: o
  } = t;
  return e.length > 0 ? e : r.slice(n, o + 1);
}, $h = k([QK, Ga], Lh), Bh = (e, t, r) => t?.dataKey != null ? e.map((n) => ({
  value: Se(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((o) => ({
  value: Se(o, n)
}))) : e.map((n) => ({
  value: n
})), ol = k([$h, De, Qa], Bh);
function JA(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function qi(e) {
  if (pr(e) || e instanceof Date) {
    var t = Number(e);
    if (We(t))
      return t;
  }
}
function Eb(e) {
  if (Array.isArray(e)) {
    var t = [qi(e[0]), qi(e[1])];
    return $n(t) ? t : void 0;
  }
  var r = qi(e);
  if (r != null)
    return [r, r];
}
function Mo(e) {
  return e.map(qi).filter(v4);
}
function e5(e, t, r) {
  return !r || typeof t != "number" || Mt(t) ? [] : r.length ? Mo(r.flatMap((n) => {
    var o = Se(e, n.dataKey), a, i;
    if (Array.isArray(o) ? [a, i] = o : a = i = o, !(!We(a) || !We(i)))
      return [t - a, t + i];
  })) : [];
}
var t5 = k([XA, Ga, Ze], qA), QA = (e, t, r) => {
  var n = {}, o = t.reduce((a, i) => (i.stackId == null || (a[i.stackId] == null && (a[i.stackId] = []), a[i.stackId].push(i)), a), n);
  return Object.fromEntries(Object.entries(o).map((a) => {
    var [i, s] = a, c = s.map(el);
    return [i, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: Bz(e, c, r),
      graphicalItems: s
    }];
  }));
}, ba = k([t5, XA, Ya], QA), eC = (e, t, r, n) => {
  var {
    dataStartIndex: o,
    dataEndIndex: a
  } = t;
  if (n == null && r !== "zAxis") {
    var i = Wz(e, o, a);
    if (!(i != null && i[0] === 0 && i[1] === 0))
      return i;
  }
}, r5 = k([De], (e) => e.allowDataOverflow), Fh = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return Cf;
  if (e.domain != null)
    return e.domain;
  if (e.ticks != null) {
    if (e.type === "number") {
      var r = Mo(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e?.domain) !== null && t !== void 0 ? t : Cf;
}, zh = k([De], Fh), Uh = k([zh, r5], EA), n5 = k([ba, dn, Me, Uh], eC, {
  memoizeOptions: {
    resultEqualityCheck: rl
  }
}), al = (e) => e.errorBars, o5 = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => JA(r, n)), Rs = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var o = r.filter(Boolean);
  if (o.length !== 0) {
    var a = o.flat(), i = Math.min(...a), s = Math.max(...a);
    return [i, s];
  }
}, Wh = (e, t, r, n, o) => {
  var a, i;
  if (r.length > 0 && e.forEach((s) => {
    r.forEach((c) => {
      var u, l, d = (u = n[c.id]) === null || u === void 0 ? void 0 : u.filter((y) => JA(o, y)), p = Se(s, (l = t.dataKey) !== null && l !== void 0 ? l : c.dataKey), f = e5(s, p, d);
      if (f.length >= 2) {
        var v = Math.min(...f), h = Math.max(...f);
        (a == null || v < a) && (a = v), (i == null || h > i) && (i = h);
      }
      var g = Eb(p);
      g != null && (a = a == null ? g[0] : Math.min(a, g[0]), i = i == null ? g[1] : Math.max(i, g[1]));
    });
  }), t?.dataKey != null && e.forEach((s) => {
    var c = Eb(Se(s, t.dataKey));
    c != null && (a = a == null ? c[0] : Math.min(a, c[0]), i = i == null ? c[1] : Math.max(i, c[1]));
  }), We(a) && We(i))
    return [a, i];
}, a5 = k([$h, De, JK, al, Me], Wh, {
  memoizeOptions: {
    resultEqualityCheck: rl
  }
});
function i5(e) {
  var {
    value: t
  } = e;
  if (pr(t) || t instanceof Date)
    return t;
}
var s5 = (e, t, r) => {
  var n = e.map(i5).filter((o) => o != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && EP(n)) ? z1(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, tC = (e) => e.referenceElements.dots, Io = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), c5 = k([tC, Me, Xa], Io), rC = (e) => e.referenceElements.areas, l5 = k([rC, Me, Xa], Io), nC = (e) => e.referenceElements.lines, u5 = k([nC, Me, Xa], Io), oC = (e, t) => {
  var r = Mo(e.map((n) => t === "xAxis" ? n.x : n.y));
  if (r.length !== 0)
    return [Math.min(...r), Math.max(...r)];
}, d5 = k(c5, Me, oC), aC = (e, t) => {
  var r = Mo(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
  if (r.length !== 0)
    return [Math.min(...r), Math.max(...r)];
}, f5 = k([l5, Me], aC), iC = (e, t) => {
  var r = Mo(e.map((n) => t === "xAxis" ? n.x : n.y));
  if (r.length !== 0)
    return [Math.min(...r), Math.max(...r)];
}, p5 = k(u5, Me, iC), h5 = k(d5, p5, f5, (e, t, r) => Rs(e, r, t)), Kh = (e, t, r, n, o, a, i, s) => {
  if (r != null)
    return r;
  var c = i === "vertical" && s === "xAxis" || i === "horizontal" && s === "yAxis", u = c ? Rs(n, a, o) : Rs(a, o);
  return CK(t, u, e.allowDataOverflow);
}, m5 = k([De, zh, Uh, n5, a5, h5, fe, Me], Kh, {
  memoizeOptions: {
    resultEqualityCheck: rl
  }
}), v5 = [0, 1], Vh = (e, t, r, n, o, a, i) => {
  if (!((e == null || r == null || r.length === 0) && i === void 0)) {
    var {
      dataKey: s,
      type: c
    } = e, u = yr(t, a);
    return u && s == null ? z1(0, r.length) : c === "category" ? s5(n, e, u) : o === "expand" ? v5 : i;
  }
}, qh = k([De, fe, $h, ol, Ya, Me, m5], Vh), sC = (e, t, r, n, o) => {
  if (e != null) {
    var {
      scale: a,
      type: i
    } = e;
    if (a === "auto")
      return t === "radial" && o === "radiusAxis" ? "band" : t === "radial" && o === "angleAxis" ? "linear" : i === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !r) ? "point" : i === "category" ? "band" : "linear";
    if (typeof a == "string") {
      var s = "scale".concat(ja(a));
      return s in Qo ? s : "point";
    }
  }
}, Do = k([De, fe, YA, Ch, Me], sC);
function g5(e) {
  if (e != null) {
    if (e in Qo)
      return Qo[e]();
    var t = "scale".concat(ja(e));
    if (t in Qo)
      return Qo[t]();
  }
}
function Hh(e, t, r, n) {
  if (!(r == null || n == null)) {
    if (typeof e.scale == "function")
      return e.scale.copy().domain(r).range(n);
    var o = g5(t);
    if (o != null) {
      var a = o.domain(r).range(n);
      return Iz(a), a;
    }
  }
}
var Gh = (e, t, r) => {
  var n = Fh(t);
  if (!(r !== "auto" && r !== "linear")) {
    if (t != null && t.tickCount && Array.isArray(n) && (n[0] === "auto" || n[1] === "auto") && $n(e))
      return LK(e, t.tickCount, t.allowDecimals);
    if (t != null && t.tickCount && t.type === "number" && $n(e))
      return $K(e, t.tickCount, t.allowDecimals);
  }
}, Yh = k([qh, Za, Do], Gh), Xh = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && e?.type === "number" && $n(t) && Array.isArray(r) && r.length > 0
  ) {
    var o = t[0], a = r[0], i = t[1], s = r[r.length - 1];
    return [Math.min(o, a), Math.max(i, s)];
  }
  return t;
}, y5 = k([De, qh, Yh, Me], Xh), b5 = k(ol, De, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(Mo(e.map((s) => s.value))).sort((s, c) => s - c);
    if (n.length < 2)
      return 1 / 0;
    var o = n[n.length - 1] - n[0];
    if (o === 0)
      return 1 / 0;
    for (var a = 0; a < n.length - 1; a++) {
      var i = n[a + 1] - n[a];
      r = Math.min(r, i);
    }
    return r / o;
  }
}), cC = k(b5, fe, $A, He, (e, t, r, n) => n, (e, t, r, n, o) => {
  if (!We(e))
    return 0;
  var a = t === "vertical" ? n.height : n.width;
  if (o === "gap")
    return e * a / 2;
  if (o === "no-gap") {
    var i = ct(r, e * a), s = e * a / 2;
    return s - i - (s - i) / a * i;
  }
  return 0;
}), w5 = (e, t) => {
  var r = Br(e, t);
  return r == null || typeof r.padding != "string" ? 0 : cC(e, "xAxis", t, r.padding);
}, x5 = (e, t) => {
  var r = Fr(e, t);
  return r == null || typeof r.padding != "string" ? 0 : cC(e, "yAxis", t, r.padding);
}, E5 = k(Br, w5, (e, t) => {
  var r, n;
  if (e == null)
    return {
      left: 0,
      right: 0
    };
  var {
    padding: o
  } = e;
  return typeof o == "string" ? {
    left: t,
    right: t
  } : {
    left: ((r = o.left) !== null && r !== void 0 ? r : 0) + t,
    right: ((n = o.right) !== null && n !== void 0 ? n : 0) + t
  };
}), S5 = k(Fr, x5, (e, t) => {
  var r, n;
  if (e == null)
    return {
      top: 0,
      bottom: 0
    };
  var {
    padding: o
  } = e;
  return typeof o == "string" ? {
    top: t,
    bottom: t
  } : {
    top: ((r = o.top) !== null && r !== void 0 ? r : 0) + t,
    bottom: ((n = o.bottom) !== null && n !== void 0 ? n : 0) + t
  };
}), O5 = k([He, E5, zc, Fc, (e, t, r) => r], (e, t, r, n, o) => {
  var {
    padding: a
  } = n;
  return o ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), P5 = k([He, fe, S5, zc, Fc, (e, t, r) => r], (e, t, r, n, o, a) => {
  var {
    padding: i
  } = o;
  return a ? [n.height - i.bottom, i.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), ei = (e, t, r, n) => {
  var o;
  switch (t) {
    case "xAxis":
      return O5(e, r, n);
    case "yAxis":
      return P5(e, r, n);
    case "zAxis":
      return (o = Mh(e, r)) === null || o === void 0 ? void 0 : o.range;
    case "angleAxis":
      return UA(e);
    case "radiusAxis":
      return WA(e, r);
    default:
      return;
  }
}, lC = k([De, ei], Jc), jo = k([De, Do, y5, lC], Hh);
k([Qa, al, Me], o5);
function uC(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var il = (e, t) => t, sl = (e, t, r) => r, A5 = k($c, il, sl, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(uC)), C5 = k(Bc, il, sl, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(uC)), dC = (e, t) => ({
  width: e.width,
  height: t.height
}), T5 = (e, t) => {
  var r = typeof t.width == "number" ? t.width : Ua;
  return {
    width: r,
    height: e.height
  };
}, fC = k(He, Br, dC), _5 = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, k5 = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, N5 = k(jr, He, A5, il, sl, (e, t, r, n, o) => {
  var a = {}, i;
  return r.forEach((s) => {
    var c = dC(t, s);
    i == null && (i = _5(t, n, e));
    var u = n === "top" && !o || n === "bottom" && o;
    a[s.id] = i - Number(u) * c.height, i += (u ? -1 : 1) * c.height;
  }), a;
}), R5 = k(Dr, He, C5, il, sl, (e, t, r, n, o) => {
  var a = {}, i;
  return r.forEach((s) => {
    var c = T5(t, s);
    i == null && (i = k5(t, n, e));
    var u = n === "left" && !o || n === "right" && o;
    a[s.id] = i - Number(u) * c.width, i += (u ? -1 : 1) * c.width;
  }), a;
}), M5 = (e, t) => {
  var r = Br(e, t);
  if (r != null)
    return N5(e, r.orientation, r.mirror);
}, I5 = k([He, Br, M5, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var o = r?.[n];
    return o == null ? {
      x: e.left,
      y: 0
    } : {
      x: e.left,
      y: o
    };
  }
}), D5 = (e, t) => {
  var r = Fr(e, t);
  if (r != null)
    return R5(e, r.orientation, r.mirror);
}, j5 = k([He, Fr, D5, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var o = r?.[n];
    return o == null ? {
      x: 0,
      y: e.top
    } : {
      x: o,
      y: e.top
    };
  }
}), pC = k(He, Fr, (e, t) => {
  var r = typeof t.width == "number" ? t.width : Ua;
  return {
    width: r,
    height: e.height
  };
}), Sb = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return fC(e, r).width;
    case "yAxis":
      return pC(e, r).height;
    default:
      return;
  }
}, hC = (e, t, r, n) => {
  if (r != null) {
    var {
      allowDuplicatedCategory: o,
      type: a,
      dataKey: i
    } = r, s = yr(e, n), c = t.map((u) => u.value);
    if (i && s && a === "category" && o && EP(c))
      return c;
  }
}, Zh = k([fe, ol, De, Me], hC), mC = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var {
      type: o,
      scale: a
    } = r, i = yr(e, n);
    if (i && (o === "number" || a !== "auto"))
      return t.map((s) => s.value);
  }
}, Jh = k([fe, ol, Za, Me], mC), Ob = k([fe, XK, Do, jo, Zh, Jh, ei, Yh, Me], (e, t, r, n, o, a, i, s, c) => {
  if (t == null)
    return null;
  var u = yr(e, c);
  return {
    angle: t.angle,
    interval: t.interval,
    minTickGap: t.minTickGap,
    orientation: t.orientation,
    tick: t.tick,
    tickCount: t.tickCount,
    tickFormatter: t.tickFormatter,
    ticks: t.ticks,
    type: t.type,
    unit: t.unit,
    axisType: c,
    categoricalDomain: a,
    duplicateDomain: o,
    isCategorical: u,
    niceTicks: s,
    range: i,
    realScaleType: r,
    scale: n
  };
}), L5 = (e, t, r, n, o, a, i, s, c) => {
  if (!(t == null || n == null)) {
    var u = yr(e, c), {
      type: l,
      ticks: d,
      tickCount: p
    } = t, f = r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2, v = l === "category" && n.bandwidth ? n.bandwidth() / f : 0;
    v = c === "angleAxis" && a != null && a.length >= 2 ? Qe(a[0] - a[1]) * 2 * v : v;
    var h = d || o;
    if (h) {
      var g = h.map((y, w) => {
        var x = i ? i.indexOf(y) : y;
        return {
          index: w,
          // If the scaleContent is not a number, the coordinate will be NaN.
          // That could be the case for example with a PointScale and a string as domain.
          coordinate: n(x) + v,
          value: y,
          offset: v
        };
      });
      return g.filter((y) => !Mt(y.coordinate));
    }
    return u && s ? s.map((y, w) => ({
      coordinate: n(y) + v,
      value: y,
      index: w,
      offset: v
    })) : n.ticks ? n.ticks(p).map((y) => ({
      coordinate: n(y) + v,
      value: y,
      offset: v
    })) : n.domain().map((y, w) => ({
      coordinate: n(y) + v,
      value: i ? i[y] : y,
      index: w,
      offset: v
    }));
  }
}, vC = k([fe, Za, Do, jo, Yh, ei, Zh, Jh, Me], L5), $5 = (e, t, r, n, o, a, i) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var s = yr(e, i), {
      tickCount: c
    } = t, u = 0;
    return u = i === "angleAxis" && n?.length >= 2 ? Qe(n[0] - n[1]) * 2 * u : u, s && a ? a.map((l, d) => ({
      coordinate: r(l) + u,
      value: l,
      index: d,
      offset: u
    })) : r.ticks ? r.ticks(c).map((l) => ({
      coordinate: r(l) + u,
      value: l,
      offset: u
    })) : r.domain().map((l, d) => ({
      coordinate: r(l) + u,
      value: o ? o[l] : l,
      index: d,
      offset: u
    }));
  }
}, mr = k([fe, Za, jo, ei, Zh, Jh, Me], $5), vr = k(De, jo, (e, t) => {
  if (!(e == null || t == null))
    return Ns(Ns({}, e), {}, {
      scale: t
    });
}), B5 = k([De, Do, qh, lC], Hh);
k((e, t, r) => Mh(e, r), B5, (e, t) => {
  if (!(e == null || t == null))
    return Ns(Ns({}, e), {}, {
      scale: t
    });
});
var F5 = k([fe, $c, Bc], (e, t, r) => {
  switch (e) {
    case "horizontal":
      return t.some((n) => n.reversed) ? "right-to-left" : "left-to-right";
    case "vertical":
      return r.some((n) => n.reversed) ? "bottom-to-top" : "top-to-bottom";
    // TODO: make this better. For now, right arrow triggers "forward", left arrow "back"
    // however, the tooltip moves an unintuitive direction because of how the indices are rendered
    case "centric":
    case "radial":
      return "left-to-right";
    default:
      return;
  }
}), gC = (e) => e.options.defaultTooltipEventType, yC = (e) => e.options.validateTooltipEventTypes;
function bC(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function Qh(e, t) {
  var r = gC(e), n = yC(e);
  return bC(t, r, n);
}
function z5(e) {
  return ee((t) => Qh(t, e));
}
var wC = (e, t) => {
  var r, n = Number(t);
  if (!(Mt(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, U5 = (e) => e.tooltip.settings, Hr = {
  active: !1,
  index: null,
  dataKey: void 0,
  coordinate: void 0
}, W5 = {
  itemInteraction: {
    click: Hr,
    hover: Hr
  },
  axisInteraction: {
    click: Hr,
    hover: Hr
  },
  keyboardInteraction: Hr,
  syncInteraction: {
    active: !1,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0,
    sourceViewBox: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: !1,
    defaultIndex: void 0
  }
}, xC = Lt({
  name: "tooltip",
  initialState: W5,
  reducers: {
    addTooltipEntrySettings: {
      reducer(e, t) {
        e.tooltipItemPayloads.push(t.payload);
      },
      prepare: ut()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = Pr(e).tooltipItemPayloads.indexOf(t.payload);
        r > -1 && e.tooltipItemPayloads.splice(r, 1);
      },
      prepare: ut()
    },
    setTooltipSettingsState(e, t) {
      e.settings = t.payload;
    },
    setActiveMouseOverItemIndex(e, t) {
      e.syncInteraction.active = !1, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    mouseLeaveChart(e) {
      e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
    },
    mouseLeaveItem(e) {
      e.itemInteraction.hover.active = !1;
    },
    setActiveClickItemIndex(e, t) {
      e.syncInteraction.active = !1, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setSyncInteraction(e, t) {
      e.syncInteraction = t.payload;
    },
    setKeyboardInteraction(e, t) {
      e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate, e.keyboardInteraction.dataKey = t.payload.activeDataKey;
    }
  }
}), {
  addTooltipEntrySettings: K5,
  removeTooltipEntrySettings: V5,
  setTooltipSettingsState: q5,
  setActiveMouseOverItemIndex: EC,
  mouseLeaveItem: H5,
  mouseLeaveChart: SC,
  setActiveClickItemIndex: G5,
  setMouseOverAxisIndex: OC,
  setMouseClickAxisIndex: Y5,
  setSyncInteraction: Tf,
  setKeyboardInteraction: _f
} = xC.actions, X5 = xC.reducer;
function Pb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ni(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pb(Object(r), !0).forEach(function(n) {
      Z5(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Z5(e, t, r) {
  return (t = J5(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function J5(e) {
  var t = Q5(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Q5(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function eV(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function tV(e) {
  return e.index != null;
}
var PC = (e, t, r, n) => {
  if (t == null)
    return Hr;
  var o = eV(e, t, r);
  if (o == null)
    return Hr;
  if (o.active)
    return o;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (tV(o)) {
    if (a)
      return Ni(Ni({}, o), {}, {
        active: !0
      });
  } else if (n != null)
    return {
      active: !0,
      coordinate: void 0,
      dataKey: void 0,
      index: n
    };
  return Ni(Ni({}, Hr), {}, {
    coordinate: o.coordinate
  });
}, em = (e, t) => {
  var r = e?.index;
  if (r == null)
    return null;
  var n = Number(r);
  if (!We(n))
    return r;
  var o = 0, a = 1 / 0;
  return t.length > 0 && (a = t.length - 1), String(Math.max(o, Math.min(n, a)));
}, AC = (e, t, r, n, o, a, i, s) => {
  if (!(a == null || s == null)) {
    var c = i[0], u = c == null ? void 0 : s(c.positions, a);
    if (u != null)
      return u;
    var l = o?.[Number(a)];
    if (l)
      switch (r) {
        case "horizontal":
          return {
            x: l.coordinate,
            y: (n.top + t) / 2
          };
        default:
          return {
            x: (n.left + e) / 2,
            y: l.coordinate
          };
      }
  }
}, CC = (e, t, r, n) => {
  if (t === "axis")
    return e.tooltipItemPayloads;
  if (e.tooltipItemPayloads.length === 0)
    return [];
  var o;
  return r === "hover" ? o = e.itemInteraction.hover.dataKey : o = e.itemInteraction.click.dataKey, o == null && n != null ? [e.tooltipItemPayloads[0]] : e.tooltipItemPayloads.filter((a) => {
    var i;
    return ((i = a.settings) === null || i === void 0 ? void 0 : i.dataKey) === o;
  });
}, ti = (e) => e.options.tooltipPayloadSearcher, Lo = (e) => e.tooltip;
function Ab(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Cb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ab(Object(r), !0).forEach(function(n) {
      rV(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ab(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function rV(e, t, r) {
  return (t = nV(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function nV(e) {
  var t = oV(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function oV(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function aV(e, t) {
  return e ?? t;
}
var TC = (e, t, r, n, o, a, i) => {
  if (!(t == null || a == null)) {
    var {
      chartData: s,
      computedData: c,
      dataStartIndex: u,
      dataEndIndex: l
    } = r, d = [];
    return e.reduce((p, f) => {
      var v, {
        dataDefinedOnItem: h,
        settings: g
      } = f, y = aV(h, s), w = Array.isArray(y) ? y1(y, u, l) : y, x = (v = g?.dataKey) !== null && v !== void 0 ? v : n, S = g?.nameKey, E;
      if (n && Array.isArray(w) && /*
       * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
       * as tooltip payloads and findEntryInArray is not prepared to handle that.
       * Sad but also ScatterChart only allows 'item' tooltipEventType
       * and also this is only a problem if there are multiple Scatters and each has its own data array
       * so let's fix that some other time.
       */
      !Array.isArray(w[0]) && /*
       * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
       * because thanks to allowDuplicatedCategory=false, the order of elements in the array
       * no longer matches the order of elements in the original data
       * and so we need to search by the active dataKey + label rather than by index.
       *
       * The same happens if multiple graphical items are present in the chart
       * and each of them has its own data array. Those arrays get concatenated
       * and again the tooltip index no longer matches the original data.
       *
       * On the other hand the tooltipEventType 'item' should always search by index
       * because we get the index from interacting over the individual elements
       * which is always accurate, irrespective of the allowDuplicatedCategory setting.
       */
      i === "axis" ? E = SP(w, n, o) : E = a(w, t, c, S), Array.isArray(E))
        E.forEach((P) => {
          var A = Cb(Cb({}, g), {}, {
            name: P.name,
            unit: P.unit,
            // color and fill are erased to keep 100% the identical behaviour to recharts 2.x - but there's nothing stopping us from returning them here. It's technically a breaking change.
            color: void 0,
            // color and fill are erased to keep 100% the identical behaviour to recharts 2.x - but there's nothing stopping us from returning them here. It's technically a breaking change.
            fill: void 0
          });
          p.push(ry({
            tooltipEntrySettings: A,
            dataKey: P.dataKey,
            payload: P.payload,
            // @ts-expect-error getValueByDataKey does not validate the output type
            value: Se(P.payload, P.dataKey),
            name: P.name
          }));
        });
      else {
        var O;
        p.push(ry({
          tooltipEntrySettings: g,
          dataKey: x,
          payload: E,
          // @ts-expect-error getValueByDataKey does not validate the output type
          value: Se(E, x),
          // @ts-expect-error getValueByDataKey does not validate the output type
          name: (O = Se(E, S)) !== null && O !== void 0 ? O : g?.name
        }));
      }
      return p;
    }, d);
  }
}, tm = k([Ze, fe, YA, Ch, Xe], sC), iV = k([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), sV = k([Xe, Ro], Ih), ri = k([iV, Ze, sV], Dh, {
  memoizeOptions: {
    resultEqualityCheck: nl
  }
}), cV = k([ri], (e) => e.filter(tl)), lV = k([ri], jh, {
  memoizeOptions: {
    resultEqualityCheck: nl
  }
}), $o = k([lV, dn], Lh), uV = k([cV, dn, Ze], qA), rm = k([$o, Ze, ri], Bh), _C = k([Ze], Fh), dV = k([Ze], (e) => e.allowDataOverflow), kC = k([_C, dV], EA), fV = k([ri], (e) => e.filter(tl)), pV = k([uV, fV, Ya], QA), hV = k([pV, dn, Xe, kC], eC), mV = k([ri], ZA), vV = k([$o, Ze, mV, al, Xe], Wh, {
  memoizeOptions: {
    resultEqualityCheck: rl
  }
}), gV = k([tC, Xe, Ro], Io), yV = k([gV, Xe], oC), bV = k([rC, Xe, Ro], Io), wV = k([bV, Xe], aC), xV = k([nC, Xe, Ro], Io), EV = k([xV, Xe], iC), SV = k([yV, EV, wV], Rs), OV = k([Ze, _C, kC, hV, vV, SV, fe, Xe], Kh), NC = k([Ze, fe, $o, rm, Ya, Xe, OV], Vh), PV = k([NC, Ze, tm], Gh), AV = k([Ze, NC, PV, Xe], Xh), RC = (e) => {
  var t = Xe(e), r = Ro(e), n = !1;
  return ei(e, t, r, n);
}, MC = k([Ze, RC], Jc), IC = k([Ze, tm, AV, MC], Hh), CV = k([fe, rm, Ze, Xe], hC), TV = k([fe, rm, Ze, Xe], mC), _V = (e, t, r, n, o, a, i, s) => {
  if (t) {
    var {
      type: c
    } = t, u = yr(e, s);
    if (n) {
      var l = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, d = c === "category" && n.bandwidth ? n.bandwidth() / l : 0;
      return d = s === "angleAxis" && o != null && o?.length >= 2 ? Qe(o[0] - o[1]) * 2 * d : d, u && i ? i.map((p, f) => ({
        coordinate: n(p) + d,
        value: p,
        index: f,
        offset: d
      })) : n.domain().map((p, f) => ({
        coordinate: n(p) + d,
        value: a ? a[p] : p,
        index: f,
        offset: d
      }));
    }
  }
}, zr = k([fe, Ze, tm, IC, RC, CV, TV, Xe], _V), nm = k([gC, yC, U5], (e, t, r) => bC(r.shared, e, t)), DC = (e) => e.tooltip.settings.trigger, om = (e) => e.tooltip.settings.defaultIndex, cl = k([Lo, nm, DC, om], PC), en = k([cl, $o], em), jC = k([zr, en], wC), LC = k([cl], (e) => {
  if (e)
    return e.dataKey;
}), $C = k([Lo, nm, DC, om], CC), kV = k([Dr, jr, fe, He, zr, om, $C, ti], AC), NV = k([cl, kV], (e, t) => e != null && e.coordinate ? e.coordinate : t), RV = k([cl], (e) => e.active), MV = k([$C, en, dn, VA, jC, ti, nm], TC), IV = k([MV], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function Tb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _b(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tb(Object(r), !0).forEach(function(n) {
      DV(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DV(e, t, r) {
  return (t = jV(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jV(e) {
  var t = LV(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function LV(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var $V = () => ee(Ze), BV = () => {
  var e = $V(), t = ee(zr), r = ee(IC);
  return Ln(_b(_b({}, e), {}, {
    scale: r
  }), t);
}, BC = () => ee(Ch), am = (e, t) => t, FC = (e, t, r) => r, im = (e, t, r, n) => n, FV = k(zr, (e) => Mc(e, (t) => t.coordinate)), sm = k([Lo, am, FC, im], PC), zC = k([sm, $o], em), zV = (e, t, r) => {
  if (t != null) {
    var n = Lo(e);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, UC = k([Lo, am, FC, im], CC), Ms = k([Dr, jr, fe, He, zr, im, UC, ti], AC), UV = k([sm, Ms], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
}), WC = k(zr, zC, wC), WV = k([UC, zC, dn, VA, WC, ti, am], TC), KV = k([sm], (e) => ({
  isActive: e.active,
  activeIndex: e.index
})), VV = (e, t, r, n, o, a, i, s) => {
  if (!(!e || !t || !n || !o || !a)) {
    var c = Kz(e.chartX, e.chartY, t, r, s);
    if (c) {
      var u = qz(c, t), l = Rz(u, i, a, n, o), d = Vz(t, a, l, c);
      return {
        activeIndex: String(l),
        activeCoordinate: d
      };
    }
  }
};
function kf() {
  return kf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kf.apply(null, arguments);
}
function kb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ri(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? kb(Object(r), !0).forEach(function(n) {
      qV(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : kb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qV(e, t, r) {
  return (t = HV(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function HV(e) {
  var t = GV(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function GV(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function YV(e) {
  var {
    coordinate: t,
    payload: r,
    index: n,
    offset: o,
    tooltipAxisBandSize: a,
    layout: i,
    cursor: s,
    tooltipEventType: c,
    chartName: u
  } = e, l = t, d = r, p = n;
  if (!s || !l || u !== "ScatterChart" && c !== "axis")
    return null;
  var f, v;
  if (u === "ScatterChart")
    f = l, v = l4;
  else if (u === "BarChart")
    f = u4(i, l, o, a), v = L1;
  else if (i === "radial") {
    var {
      cx: h,
      cy: g,
      radius: y,
      startAngle: w,
      endAngle: x
    } = $1(l);
    f = {
      cx: h,
      cy: g,
      startAngle: w,
      endAngle: x,
      innerRadius: y,
      outerRadius: y
    }, v = F1;
  } else
    f = {
      points: H4(i, l, o)
    }, v = no;
  var S = typeof s == "object" && "className" in s ? s.className : void 0, E = Ri(Ri(Ri(Ri({
    stroke: "#ccc",
    pointerEvents: "none"
  }, o), f), Mn(s)), {}, {
    payload: d,
    payloadIndex: p,
    className: pe("recharts-tooltip-cursor", S)
  });
  return /* @__PURE__ */ Kt(s) ? /* @__PURE__ */ Ea(s, E) : /* @__PURE__ */ ra(v, E);
}
function XV(e) {
  var t = BV(), r = T1(), n = Wa(), o = BC();
  return /* @__PURE__ */ m.createElement(YV, kf({}, e, {
    coordinate: e.coordinate,
    index: e.index,
    payload: e.payload,
    offset: r,
    layout: n,
    tooltipAxisBandSize: t,
    chartName: o
  }));
}
var KC = /* @__PURE__ */ Dt(null), ZV = () => er(KC), id = { exports: {} }, Nb;
function JV() {
  return Nb || (Nb = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function o(c, u, l) {
      this.fn = c, this.context = u, this.once = l || !1;
    }
    function a(c, u, l, d, p) {
      if (typeof l != "function")
        throw new TypeError("The listener must be a function");
      var f = new o(l, d || c, p), v = r ? r + u : u;
      return c._events[v] ? c._events[v].fn ? c._events[v] = [c._events[v], f] : c._events[v].push(f) : (c._events[v] = f, c._eventsCount++), c;
    }
    function i(c, u) {
      --c._eventsCount === 0 ? c._events = new n() : delete c._events[u];
    }
    function s() {
      this._events = new n(), this._eventsCount = 0;
    }
    s.prototype.eventNames = function() {
      var u = [], l, d;
      if (this._eventsCount === 0) return u;
      for (d in l = this._events)
        t.call(l, d) && u.push(r ? d.slice(1) : d);
      return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(l)) : u;
    }, s.prototype.listeners = function(u) {
      var l = r ? r + u : u, d = this._events[l];
      if (!d) return [];
      if (d.fn) return [d.fn];
      for (var p = 0, f = d.length, v = new Array(f); p < f; p++)
        v[p] = d[p].fn;
      return v;
    }, s.prototype.listenerCount = function(u) {
      var l = r ? r + u : u, d = this._events[l];
      return d ? d.fn ? 1 : d.length : 0;
    }, s.prototype.emit = function(u, l, d, p, f, v) {
      var h = r ? r + u : u;
      if (!this._events[h]) return !1;
      var g = this._events[h], y = arguments.length, w, x;
      if (g.fn) {
        switch (g.once && this.removeListener(u, g.fn, void 0, !0), y) {
          case 1:
            return g.fn.call(g.context), !0;
          case 2:
            return g.fn.call(g.context, l), !0;
          case 3:
            return g.fn.call(g.context, l, d), !0;
          case 4:
            return g.fn.call(g.context, l, d, p), !0;
          case 5:
            return g.fn.call(g.context, l, d, p, f), !0;
          case 6:
            return g.fn.call(g.context, l, d, p, f, v), !0;
        }
        for (x = 1, w = new Array(y - 1); x < y; x++)
          w[x - 1] = arguments[x];
        g.fn.apply(g.context, w);
      } else {
        var S = g.length, E;
        for (x = 0; x < S; x++)
          switch (g[x].once && this.removeListener(u, g[x].fn, void 0, !0), y) {
            case 1:
              g[x].fn.call(g[x].context);
              break;
            case 2:
              g[x].fn.call(g[x].context, l);
              break;
            case 3:
              g[x].fn.call(g[x].context, l, d);
              break;
            case 4:
              g[x].fn.call(g[x].context, l, d, p);
              break;
            default:
              if (!w) for (E = 1, w = new Array(y - 1); E < y; E++)
                w[E - 1] = arguments[E];
              g[x].fn.apply(g[x].context, w);
          }
      }
      return !0;
    }, s.prototype.on = function(u, l, d) {
      return a(this, u, l, d, !1);
    }, s.prototype.once = function(u, l, d) {
      return a(this, u, l, d, !0);
    }, s.prototype.removeListener = function(u, l, d, p) {
      var f = r ? r + u : u;
      if (!this._events[f]) return this;
      if (!l)
        return i(this, f), this;
      var v = this._events[f];
      if (v.fn)
        v.fn === l && (!p || v.once) && (!d || v.context === d) && i(this, f);
      else {
        for (var h = 0, g = [], y = v.length; h < y; h++)
          (v[h].fn !== l || p && !v[h].once || d && v[h].context !== d) && g.push(v[h]);
        g.length ? this._events[f] = g.length === 1 ? g[0] : g : i(this, f);
      }
      return this;
    }, s.prototype.removeAllListeners = function(u) {
      var l;
      return u ? (l = r ? r + u : u, this._events[l] && i(this, l)) : (this._events = new n(), this._eventsCount = 0), this;
    }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = r, s.EventEmitter = s, e.exports = s;
  })(id)), id.exports;
}
var QV = JV();
const eq = /* @__PURE__ */ sn(QV);
var wa = new eq(), Nf = "recharts.syncEvent.tooltip", Rb = "recharts.syncEvent.brush";
function ll(e, t) {
  if (t) {
    var r = Number.parseInt(t, 10);
    if (!Mt(r))
      return e?.[r];
  }
}
var tq = {
  chartName: "",
  tooltipPayloadSearcher: void 0,
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
}, VC = Lt({
  name: "options",
  initialState: tq,
  reducers: {
    createEventEmitter: (e) => {
      e.eventEmitter == null && (e.eventEmitter = Symbol("rechartsEventEmitter"));
    }
  }
}), rq = VC.reducer, {
  createEventEmitter: nq
} = VC.actions;
function oq(e) {
  return e.tooltip.syncInteraction;
}
var aq = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
}, qC = Lt({
  name: "chartData",
  initialState: aq,
  reducers: {
    setChartData(e, t) {
      if (e.chartData = t.payload, t.payload == null) {
        e.dataStartIndex = 0, e.dataEndIndex = 0;
        return;
      }
      t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
    },
    setComputedData(e, t) {
      e.computedData = t.payload;
    },
    setDataStartEndIndexes(e, t) {
      var {
        startIndex: r,
        endIndex: n
      } = t.payload;
      r != null && (e.dataStartIndex = r), n != null && (e.dataEndIndex = n);
    }
  }
}), {
  setChartData: Mb,
  setDataStartEndIndexes: iq,
  setComputedData: Q7
} = qC.actions, sq = qC.reducer, cq = ["x", "y"];
function Ib(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ib(Object(r), !0).forEach(function(n) {
      lq(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ib(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lq(e, t, r) {
  return (t = uq(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uq(e) {
  var t = dq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dq(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fq(e, t) {
  if (e == null) return {};
  var r, n, o = pq(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function pq(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var HC = () => {
};
function hq() {
  var e = ee(Th), t = ee(_h), r = Re(), n = ee(BA), o = ee(zr), a = Wa(), i = Wc(), s = ee((c) => c.rootProps.className);
  Le(() => {
    if (e == null)
      return HC;
    var c = (u, l, d) => {
      if (t !== d && e === u) {
        if (n === "index") {
          var p;
          if (i && l !== null && l !== void 0 && (p = l.payload) !== null && p !== void 0 && p.coordinate && l.payload.sourceViewBox) {
            var f = l.payload.coordinate, {
              x: v,
              y: h
            } = f, g = fq(f, cq), {
              x: y,
              y: w,
              width: x,
              height: S
            } = l.payload.sourceViewBox, E = Jn(Jn({}, g), {}, {
              x: i.x + (x ? (v - y) / x : 0) * i.width,
              y: i.y + (S ? (h - w) / S : 0) * i.height
            });
            r(Jn(Jn({}, l), {}, {
              payload: Jn(Jn({}, l.payload), {}, {
                coordinate: E
              })
            }));
          } else
            r(l);
          return;
        }
        if (o != null) {
          var O;
          if (typeof n == "function") {
            var P = {
              activeTooltipIndex: l.payload.index == null ? void 0 : Number(l.payload.index),
              isTooltipActive: l.payload.active,
              activeIndex: l.payload.index == null ? void 0 : Number(l.payload.index),
              activeLabel: l.payload.label,
              activeDataKey: l.payload.dataKey,
              activeCoordinate: l.payload.coordinate
            }, A = n(o, P);
            O = o[A];
          } else n === "value" && (O = o.find(($) => String($.value) === l.payload.label));
          var {
            coordinate: _
          } = l.payload;
          if (O == null || l.payload.active === !1 || _ == null || i == null) {
            r(Tf({
              active: !1,
              coordinate: void 0,
              dataKey: void 0,
              index: null,
              label: void 0,
              sourceViewBox: void 0
            }));
            return;
          }
          var {
            x: N,
            y: T
          } = _, R = Math.min(N, i.x + i.width), j = Math.min(T, i.y + i.height), C = {
            x: a === "horizontal" ? O.coordinate : R,
            y: a === "horizontal" ? j : O.coordinate
          }, D = Tf({
            active: l.payload.active,
            coordinate: C,
            dataKey: l.payload.dataKey,
            index: String(O.index),
            label: l.payload.label,
            sourceViewBox: l.payload.sourceViewBox
          });
          r(D);
        }
      }
    };
    return wa.on(Nf, c), () => {
      wa.off(Nf, c);
    };
  }, [s, r, t, e, n, o, a, i]);
}
function mq() {
  var e = ee(Th), t = ee(_h), r = Re();
  Le(() => {
    if (e == null)
      return HC;
    var n = (o, a, i) => {
      t !== i && e === o && r(iq(a));
    };
    return wa.on(Rb, n), () => {
      wa.off(Rb, n);
    };
  }, [r, t, e]);
}
function vq() {
  var e = Re();
  Le(() => {
    e(nq());
  }, [e]), hq(), mq();
}
function gq(e, t, r, n, o, a) {
  var i = ee((f) => zV(f, e, t)), s = ee(_h), c = ee(Th), u = ee(BA), l = ee(oq), d = l?.active, p = Wc();
  Le(() => {
    if (!d && c != null && s != null) {
      var f = Tf({
        active: a,
        coordinate: r,
        dataKey: i,
        index: o,
        label: typeof n == "number" ? String(n) : n,
        sourceViewBox: p
      });
      wa.emit(Nf, c, f, s);
    }
  }, [d, r, i, o, n, s, c, u, a, p]);
}
function Db(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Db(Object(r), !0).forEach(function(n) {
      yq(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Db(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yq(e, t, r) {
  return (t = bq(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bq(e) {
  var t = wq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function wq(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function xq(e) {
  return e.dataKey;
}
function Eq(e, t) {
  return /* @__PURE__ */ m.isValidElement(e) ? /* @__PURE__ */ m.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ m.createElement(e, t) : /* @__PURE__ */ m.createElement(zU, t);
}
var Lb = [], Sq = {
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: !0,
  filterNull: !0,
  isAnimationActive: !Lr.isSsr,
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  wrapperStyle: {}
};
function ul(e) {
  var t = Ge(e, Sq), {
    active: r,
    allowEscapeViewBox: n,
    animationDuration: o,
    animationEasing: a,
    content: i,
    filterNull: s,
    isAnimationActive: c,
    offset: u,
    payloadUniqBy: l,
    position: d,
    reverseDirection: p,
    useTranslate3d: f,
    wrapperStyle: v,
    cursor: h,
    shared: g,
    trigger: y,
    defaultIndex: w,
    portal: x,
    axisId: S
  } = t, E = Re(), O = typeof w == "number" ? String(w) : w;
  Le(() => {
    E(q5({
      shared: g,
      trigger: y,
      axisId: S,
      active: r,
      defaultIndex: O
    }));
  }, [E, g, y, S, r, O]);
  var P = Wc(), A = R1(), _ = z5(g), {
    activeIndex: N,
    isActive: T
  } = ee((te) => KV(te, _, y, O)), R = ee((te) => WV(te, _, y, O)), j = ee((te) => WC(te, _, y, O)), C = ee((te) => UV(te, _, y, O)), D = R, $ = ZV(), z = r ?? T, [I, F] = FP([D, z]), oe = _ === "axis" ? j : void 0;
  gq(_, y, C, oe, N, z);
  var H = x ?? $;
  if (H == null)
    return null;
  var ie = D ?? Lb;
  z || (ie = Lb), s && ie.length && (ie = IP(D.filter((te) => te.value != null && (te.hide !== !0 || t.includeHidden)), l, xq));
  var ae = ie.length > 0, W = /* @__PURE__ */ m.createElement(GU, {
    allowEscapeViewBox: n,
    animationDuration: o,
    animationEasing: a,
    isAnimationActive: c,
    active: z,
    coordinate: C,
    hasPayload: ae,
    offset: u,
    position: d,
    reverseDirection: p,
    useTranslate3d: f,
    viewBox: P,
    wrapperStyle: v,
    lastBoundingBox: I,
    innerRef: F,
    hasPortalFromProps: !!x
  }, Eq(i, jb(jb({}, t), {}, {
    // @ts-expect-error renderContent method expects the payload to be mutable, TODO make it immutable
    payload: ie,
    label: oe,
    active: z,
    coordinate: C,
    accessibilityLayer: A
  })));
  return /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ Ww(W, H), z && /* @__PURE__ */ m.createElement(XV, {
    cursor: h,
    tooltipEventType: _,
    coordinate: C,
    payload: D,
    index: N
  }));
}
var ni = (e) => null;
ni.displayName = "Cell";
function Oq(e, t, r) {
  return (t = Pq(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Pq(e) {
  var t = Aq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Aq(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class Cq {
  constructor(t) {
    Oq(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
  }
  get(t) {
    var r = this.cache.get(t);
    return r !== void 0 && (this.cache.delete(t), this.cache.set(t, r)), r;
  }
  set(t, r) {
    if (this.cache.has(t))
      this.cache.delete(t);
    else if (this.cache.size >= this.maxSize) {
      var n = this.cache.keys().next().value;
      this.cache.delete(n);
    }
    this.cache.set(t, r);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function $b(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Tq(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $b(Object(r), !0).forEach(function(n) {
      _q(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $b(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _q(e, t, r) {
  return (t = kq(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kq(e) {
  var t = Nq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Nq(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rq = {
  cacheSize: 2e3,
  enableCache: !0
}, GC = Tq({}, Rq), Bb = new Cq(GC.cacheSize), Mq = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, Fb = "recharts_measurement_span";
function Iq(e, t) {
  var r = t.fontSize || "", n = t.fontFamily || "", o = t.fontWeight || "", a = t.fontStyle || "", i = t.letterSpacing || "", s = t.textTransform || "";
  return "".concat(e, "|").concat(r, "|").concat(n, "|").concat(o, "|").concat(a, "|").concat(i, "|").concat(s);
}
var zb = (e, t) => {
  try {
    var r = document.getElementById(Fb);
    r || (r = document.createElement("span"), r.setAttribute("id", Fb), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, Mq, t), r.textContent = "".concat(e);
    var n = r.getBoundingClientRect();
    return {
      width: n.width,
      height: n.height
    };
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, ta = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Lr.isSsr)
    return {
      width: 0,
      height: 0
    };
  if (!GC.enableCache)
    return zb(t, r);
  var n = Iq(t, r), o = Bb.get(n);
  if (o)
    return o;
  var a = zb(t, r);
  return Bb.set(n, a), a;
}, Ub = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Wb = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Dq = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, jq = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, YC = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, Lq = Object.keys(YC), Qn = "NaN";
function $q(e, t) {
  return e * YC[t];
}
class vt {
  static parse(t) {
    var r, [, n, o] = (r = jq.exec(t)) !== null && r !== void 0 ? r : [];
    return new vt(parseFloat(n), o ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, Mt(t) && (this.unit = ""), r !== "" && !Dq.test(r) && (this.num = NaN, this.unit = ""), Lq.includes(r) && (this.num = $q(t, r), this.unit = "px");
  }
  add(t) {
    return this.unit !== t.unit ? new vt(NaN, "") : new vt(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit ? new vt(NaN, "") : new vt(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new vt(NaN, "") : new vt(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new vt(NaN, "") : new vt(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Mt(this.num);
  }
}
function XC(e) {
  if (e.includes(Qn))
    return Qn;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, [, n, o, a] = (r = Ub.exec(t)) !== null && r !== void 0 ? r : [], i = vt.parse(n ?? ""), s = vt.parse(a ?? ""), c = o === "*" ? i.multiply(s) : i.divide(s);
    if (c.isNaN())
      return Qn;
    t = t.replace(Ub, c.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var u, [, l, d, p] = (u = Wb.exec(t)) !== null && u !== void 0 ? u : [], f = vt.parse(l ?? ""), v = vt.parse(p ?? ""), h = d === "+" ? f.add(v) : f.subtract(v);
    if (h.isNaN())
      return Qn;
    t = t.replace(Wb, h.toString());
  }
  return t;
}
var Kb = /\(([^()]*)\)/;
function Bq(e) {
  for (var t = e, r; (r = Kb.exec(t)) != null; ) {
    var [, n] = r;
    t = t.replace(Kb, XC(n));
  }
  return t;
}
function Fq(e) {
  var t = e.replace(/\s+/g, "");
  return t = Bq(t), t = XC(t), t;
}
function zq(e) {
  try {
    return Fq(e);
  } catch {
    return Qn;
  }
}
function sd(e) {
  var t = zq(e.slice(5, -1));
  return t === Qn ? "" : t;
}
var Uq = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], Wq = ["dx", "dy", "angle", "className", "breakAll"];
function Rf() {
  return Rf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Rf.apply(null, arguments);
}
function Vb(e, t) {
  if (e == null) return {};
  var r, n, o = Kq(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function Kq(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var ZC = /[ \f\n\r\t\v\u2028\u2029]+/, JC = (e) => {
  var {
    children: t,
    breakAll: r,
    style: n
  } = e;
  try {
    var o = [];
    Ce(t) || (r ? o = t.toString().split("") : o = t.toString().split(ZC));
    var a = o.map((s) => ({
      word: s,
      width: ta(s, n).width
    })), i = r ? 0 : ta(" ", n).width;
    return {
      wordsWithComputedWidth: a,
      spaceWidth: i
    };
  } catch {
    return null;
  }
}, Vq = (e, t, r, n, o) => {
  var {
    maxLines: a,
    children: i,
    style: s,
    breakAll: c
  } = e, u = Q(a), l = i, d = function() {
    var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return T.reduce((R, j) => {
      var {
        word: C,
        width: D
      } = j, $ = R[R.length - 1];
      if ($ && (n == null || o || $.width + D + r < Number(n)))
        $.words.push(C), $.width += D + r;
      else {
        var z = {
          words: [C],
          width: D
        };
        R.push(z);
      }
      return R;
    }, []);
  }, p = d(t), f = (N) => N.reduce((T, R) => T.width > R.width ? T : R);
  if (!u || o)
    return p;
  var v = p.length > a || f(p).width > Number(n);
  if (!v)
    return p;
  for (var h = "…", g = (N) => {
    var T = l.slice(0, N), R = JC({
      breakAll: c,
      style: s,
      children: T + h
    }).wordsWithComputedWidth, j = d(R), C = j.length > a || f(j).width > Number(n);
    return [C, j];
  }, y = 0, w = l.length - 1, x = 0, S; y <= w && x <= l.length - 1; ) {
    var E = Math.floor((y + w) / 2), O = E - 1, [P, A] = g(O), [_] = g(E);
    if (!P && !_ && (y = E + 1), P && _ && (w = E - 1), !P && _) {
      S = A;
      break;
    }
    x++;
  }
  return S || p;
}, qb = (e) => {
  var t = Ce(e) ? [] : e.toString().split(ZC);
  return [{
    words: t
  }];
}, qq = (e) => {
  var {
    width: t,
    scaleToFit: r,
    children: n,
    style: o,
    breakAll: a,
    maxLines: i
  } = e;
  if ((t || r) && !Lr.isSsr) {
    var s, c, u = JC({
      breakAll: a,
      children: n,
      style: o
    });
    if (u) {
      var {
        wordsWithComputedWidth: l,
        spaceWidth: d
      } = u;
      s = l, c = d;
    } else
      return qb(n);
    return Vq({
      breakAll: a,
      children: n,
      maxLines: i,
      style: o
    }, s, c, t, r);
  }
  return qb(n);
}, Hb = "#808080", dl = /* @__PURE__ */ Fe((e, t) => {
  var {
    x: r = 0,
    y: n = 0,
    lineHeight: o = "1em",
    // Magic number from d3
    capHeight: a = "0.71em",
    scaleToFit: i = !1,
    textAnchor: s = "start",
    // Maintain compat with existing charts / default SVG behavior
    verticalAnchor: c = "end",
    fill: u = Hb
  } = e, l = Vb(e, Uq), d = tr(() => qq({
    breakAll: l.breakAll,
    children: l.children,
    maxLines: l.maxLines,
    scaleToFit: i,
    style: l.style,
    width: l.width
  }), [l.breakAll, l.children, l.maxLines, i, l.style, l.width]), {
    dx: p,
    dy: f,
    angle: v,
    className: h,
    breakAll: g
  } = l, y = Vb(l, Wq);
  if (!pr(r) || !pr(n) || d.length === 0)
    return null;
  var w = r + (Q(p) ? p : 0), x = n + (Q(f) ? f : 0), S;
  switch (c) {
    case "start":
      S = sd("calc(".concat(a, ")"));
      break;
    case "middle":
      S = sd("calc(".concat((d.length - 1) / 2, " * -").concat(o, " + (").concat(a, " / 2))"));
      break;
    default:
      S = sd("calc(".concat(d.length - 1, " * -").concat(o, ")"));
      break;
  }
  var E = [];
  if (i) {
    var O = d[0].width, {
      width: P
    } = l;
    E.push("scale(".concat(Q(P) ? P / O : 1, ")"));
  }
  return v && E.push("rotate(".concat(v, ", ").concat(w, ", ").concat(x, ")")), E.length && (y.transform = E.join(" ")), /* @__PURE__ */ m.createElement("text", Rf({}, mt(y), {
    ref: t,
    x: w,
    y: x,
    className: pe("recharts-text", h),
    textAnchor: s,
    fill: u.includes("url") ? Hb : u
  }), d.map((A, _) => {
    var N = A.words.join(g ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m.createElement("tspan", {
        x: w,
        dy: _ === 0 ? S : o,
        key: "".concat(N, "-").concat(_)
      }, N)
    );
  }));
});
dl.displayName = "Text";
var Hq = ["labelRef"];
function Gq(e, t) {
  if (e == null) return {};
  var r, n, o = Yq(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function Yq(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Gb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gb(Object(r), !0).forEach(function(n) {
      Xq(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Xq(e, t, r) {
  return (t = Zq(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Zq(e) {
  var t = Jq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Jq(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function xr() {
  return xr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, xr.apply(null, arguments);
}
var QC = /* @__PURE__ */ Dt(null), Qq = (e) => {
  var {
    x: t,
    y: r,
    width: n,
    height: o,
    children: a
  } = e, i = tr(() => ({
    x: t,
    y: r,
    width: n,
    height: o
  }), [t, r, n, o]);
  return /* @__PURE__ */ m.createElement(QC.Provider, {
    value: i
  }, a);
}, eT = () => {
  var e = er(QC), t = Wc();
  return e || t;
}, eH = /* @__PURE__ */ Dt(null), tH = () => {
  var e = er(eH), t = ee(KA);
  return e || t;
}, rH = (e) => {
  var {
    value: t,
    formatter: r
  } = e, n = Ce(e.children) ? t : e.children;
  return typeof r == "function" ? r(n) : n;
}, cm = (e) => e != null && typeof e == "function", nH = (e, t) => {
  var r = Qe(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, oH = (e, t, r, n, o) => {
  var {
    offset: a,
    className: i
  } = e, {
    cx: s,
    cy: c,
    innerRadius: u,
    outerRadius: l,
    startAngle: d,
    endAngle: p,
    clockWise: f
  } = o, v = (u + l) / 2, h = nH(d, p), g = h >= 0 ? 1 : -1, y, w;
  switch (t) {
    case "insideStart":
      y = d + g * a, w = f;
      break;
    case "insideEnd":
      y = p - g * a, w = !f;
      break;
    case "end":
      y = p + g * a, w = f;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  w = h <= 0 ? w : !w;
  var x = ze(s, c, v, y), S = ze(s, c, v, y + (w ? 1 : -1) * 359), E = "M".concat(x.x, ",").concat(x.y, `
    A`).concat(v, ",").concat(v, ",0,1,").concat(w ? 0 : 1, `,
    `).concat(S.x, ",").concat(S.y), O = Ce(e.id) ? la("recharts-radial-line-") : e.id;
  return /* @__PURE__ */ m.createElement("text", xr({}, n, {
    dominantBaseline: "central",
    className: pe("recharts-radial-bar-label", i)
  }), /* @__PURE__ */ m.createElement("defs", null, /* @__PURE__ */ m.createElement("path", {
    id: O,
    d: E
  })), /* @__PURE__ */ m.createElement("textPath", {
    xlinkHref: "#".concat(O)
  }, r));
}, aH = (e, t, r) => {
  var {
    cx: n,
    cy: o,
    innerRadius: a,
    outerRadius: i,
    startAngle: s,
    endAngle: c
  } = e, u = (s + c) / 2;
  if (r === "outside") {
    var {
      x: l,
      y: d
    } = ze(n, o, i + t, u);
    return {
      x: l,
      y: d,
      textAnchor: l >= n ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (r === "center")
    return {
      x: n,
      y: o,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (r === "centerTop")
    return {
      x: n,
      y: o,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (r === "centerBottom")
    return {
      x: n,
      y: o,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var p = (a + i) / 2, {
    x: f,
    y: v
  } = ze(n, o, p, u);
  return {
    x: f,
    y: v,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, tT = (e) => "cx" in e && Q(e.cx), iH = (e, t) => {
  var {
    parentViewBox: r,
    offset: n,
    position: o
  } = e, a;
  r != null && !tT(r) && (a = r);
  var {
    x: i,
    y: s,
    width: c,
    height: u
  } = t, l = u >= 0 ? 1 : -1, d = l * n, p = l > 0 ? "end" : "start", f = l > 0 ? "start" : "end", v = c >= 0 ? 1 : -1, h = v * n, g = v > 0 ? "end" : "start", y = v > 0 ? "start" : "end";
  if (o === "top") {
    var w = {
      x: i + c / 2,
      y: s - l * n,
      textAnchor: "middle",
      verticalAnchor: p
    };
    return Be(Be({}, w), a ? {
      height: Math.max(s - a.y, 0),
      width: c
    } : {});
  }
  if (o === "bottom") {
    var x = {
      x: i + c / 2,
      y: s + u + d,
      textAnchor: "middle",
      verticalAnchor: f
    };
    return Be(Be({}, x), a ? {
      height: Math.max(a.y + a.height - (s + u), 0),
      width: c
    } : {});
  }
  if (o === "left") {
    var S = {
      x: i - h,
      y: s + u / 2,
      textAnchor: g,
      verticalAnchor: "middle"
    };
    return Be(Be({}, S), a ? {
      width: Math.max(S.x - a.x, 0),
      height: u
    } : {});
  }
  if (o === "right") {
    var E = {
      x: i + c + h,
      y: s + u / 2,
      textAnchor: y,
      verticalAnchor: "middle"
    };
    return Be(Be({}, E), a ? {
      width: Math.max(a.x + a.width - E.x, 0),
      height: u
    } : {});
  }
  var O = a ? {
    width: c,
    height: u
  } : {};
  return o === "insideLeft" ? Be({
    x: i + h,
    y: s + u / 2,
    textAnchor: y,
    verticalAnchor: "middle"
  }, O) : o === "insideRight" ? Be({
    x: i + c - h,
    y: s + u / 2,
    textAnchor: g,
    verticalAnchor: "middle"
  }, O) : o === "insideTop" ? Be({
    x: i + c / 2,
    y: s + d,
    textAnchor: "middle",
    verticalAnchor: f
  }, O) : o === "insideBottom" ? Be({
    x: i + c / 2,
    y: s + u - d,
    textAnchor: "middle",
    verticalAnchor: p
  }, O) : o === "insideTopLeft" ? Be({
    x: i + h,
    y: s + d,
    textAnchor: y,
    verticalAnchor: f
  }, O) : o === "insideTopRight" ? Be({
    x: i + c - h,
    y: s + d,
    textAnchor: g,
    verticalAnchor: f
  }, O) : o === "insideBottomLeft" ? Be({
    x: i + h,
    y: s + u - d,
    textAnchor: y,
    verticalAnchor: p
  }, O) : o === "insideBottomRight" ? Be({
    x: i + c - h,
    y: s + u - d,
    textAnchor: g,
    verticalAnchor: p
  }, O) : o && typeof o == "object" && (Q(o.x) || kr(o.x)) && (Q(o.y) || kr(o.y)) ? Be({
    x: i + ct(o.x, c),
    y: s + ct(o.y, u),
    textAnchor: "end",
    verticalAnchor: "end"
  }, O) : Be({
    x: i + c / 2,
    y: s + u / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, O);
}, sH = {
  offset: 5
};
function qr(e) {
  var t = Ge(e, sH), {
    viewBox: r,
    position: n,
    value: o,
    children: a,
    content: i,
    className: s = "",
    textBreakAll: c,
    labelRef: u
  } = t, l = tH(), d = eT(), p = n === "center" ? d : l ?? d, f = r || p;
  if (!f || Ce(o) && Ce(a) && !/* @__PURE__ */ Kt(i) && typeof i != "function")
    return null;
  var v = Be(Be({}, t), {}, {
    viewBox: f
  });
  if (/* @__PURE__ */ Kt(i)) {
    var {
      labelRef: h
    } = v, g = Gq(v, Hq);
    return /* @__PURE__ */ Ea(i, g);
  }
  var y;
  if (typeof i == "function") {
    if (y = /* @__PURE__ */ ra(i, v), /* @__PURE__ */ Kt(y))
      return y;
  } else
    y = rH(t);
  var w = tT(f), x = mt(t);
  if (w && (n === "insideStart" || n === "insideEnd" || n === "end"))
    return oH(t, n, y, x, f);
  var S = w ? aH(f, t.offset, t.position) : iH(t, f);
  return /* @__PURE__ */ m.createElement(dl, xr({
    ref: u,
    className: pe("recharts-label", s)
  }, x, S, {
    breakAll: c
  }), y);
}
qr.displayName = "Label";
var cH = (e, t, r) => {
  if (!e)
    return null;
  var n = {
    viewBox: t,
    labelRef: r
  };
  return e === !0 ? /* @__PURE__ */ m.createElement(qr, xr({
    key: "label-implicit"
  }, n)) : pr(e) ? /* @__PURE__ */ m.createElement(qr, xr({
    key: "label-implicit",
    value: e
  }, n)) : /* @__PURE__ */ Kt(e) ? e.type === qr ? /* @__PURE__ */ Ea(e, Be({
    key: "label-implicit"
  }, n)) : /* @__PURE__ */ m.createElement(qr, xr({
    key: "label-implicit",
    content: e
  }, n)) : cm(e) ? /* @__PURE__ */ m.createElement(qr, xr({
    key: "label-implicit",
    content: e
  }, n)) : e && typeof e == "object" ? /* @__PURE__ */ m.createElement(qr, xr({}, e, {
    key: "label-implicit"
  }, n)) : null;
};
function lH(e) {
  var {
    label: t,
    labelRef: r
  } = e, n = eT();
  return cH(t, n, r) || null;
}
var cd = {}, ld = {}, Yb;
function uH() {
  return Yb || (Yb = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return r[r.length - 1];
    }
    e.last = t;
  })(ld)), ld;
}
var ud = {}, Xb;
function dH() {
  return Xb || (Xb = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      return Array.isArray(r) ? r : Array.from(r);
    }
    e.toArray = t;
  })(ud)), ud;
}
var Zb;
function fH() {
  return Zb || (Zb = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = /* @__PURE__ */ uH(), r = /* @__PURE__ */ dH(), n = /* @__PURE__ */ Wp();
    function o(a) {
      if (n.isArrayLike(a))
        return t.last(r.toArray(a));
    }
    e.last = o;
  })(cd)), cd;
}
var dd, Jb;
function pH() {
  return Jb || (Jb = 1, dd = fH().last), dd;
}
var hH = /* @__PURE__ */ pH();
const mH = /* @__PURE__ */ sn(hH);
var vH = ["valueAccessor"], gH = ["dataKey", "clockWise", "id", "textBreakAll"];
function Is() {
  return Is = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Is.apply(null, arguments);
}
function Qb(e, t) {
  if (e == null) return {};
  var r, n, o = yH(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function yH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var bH = (e) => Array.isArray(e.value) ? mH(e.value) : e.value, rT = /* @__PURE__ */ Dt(void 0), lm = rT.Provider, nT = /* @__PURE__ */ Dt(void 0), wH = nT.Provider;
function xH() {
  return er(rT);
}
function EH() {
  return er(nT);
}
function Hi(e) {
  var {
    valueAccessor: t = bH
  } = e, r = Qb(e, vH), {
    dataKey: n,
    clockWise: o,
    id: a,
    textBreakAll: i
  } = r, s = Qb(r, gH), c = xH(), u = EH(), l = c || u;
  return !l || !l.length ? null : /* @__PURE__ */ m.createElement($e, {
    className: "recharts-label-list"
  }, l.map((d, p) => {
    var f, v = Ce(n) ? t(d, p) : Se(d && d.payload, n), h = Ce(a) ? {} : {
      id: "".concat(a, "-").concat(p)
    };
    return /* @__PURE__ */ m.createElement(qr, Is({
      key: "label-".concat(p)
      // eslint-disable-line react/no-array-index-key
    }, mt(d), s, h, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (f = r.fill) !== null && f !== void 0 ? f : d.fill,
      parentViewBox: d.parentViewBox,
      value: v,
      textBreakAll: i,
      viewBox: d.viewBox,
      index: p
    }));
  }));
}
Hi.displayName = "LabelList";
function fl(e) {
  var {
    label: t
  } = e;
  return t ? t === !0 ? /* @__PURE__ */ m.createElement(Hi, {
    key: "labelList-implicit"
  }) : /* @__PURE__ */ m.isValidElement(t) || cm(t) ? /* @__PURE__ */ m.createElement(Hi, {
    key: "labelList-implicit",
    content: t
  }) : typeof t == "object" ? /* @__PURE__ */ m.createElement(Hi, Is({
    key: "labelList-implicit"
  }, t, {
    type: String(t.type)
  })) : null : null;
}
function Mf() {
  return Mf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Mf.apply(null, arguments);
}
var um = (e) => {
  var {
    cx: t,
    cy: r,
    r: n,
    className: o
  } = e, a = pe("recharts-dot", o);
  return t === +t && r === +r && n === +n ? /* @__PURE__ */ m.createElement("circle", Mf({}, ht(e), Fp(e), {
    className: a,
    cx: t,
    cy: r,
    r: n
  })) : null;
}, oT = (e) => e.graphicalItems.polarItems, SH = k([Me, Xa], Ih), pl = k([oT, De, SH], Dh), OH = k([pl], jh), hl = k([OH, Oh], Lh), PH = k([hl, De, pl], Bh);
k([hl, De, pl], (e, t, r) => r.length > 0 ? e.flatMap((n) => r.flatMap((o) => {
  var a, i = Se(n, (a = t.dataKey) !== null && a !== void 0 ? a : o.dataKey);
  return {
    value: i,
    errorDomain: []
    // polar charts do not have error bars
  };
})).filter(Boolean) : t?.dataKey != null ? e.map((n) => ({
  value: Se(n, t.dataKey),
  errorDomain: []
})) : e.map((n) => ({
  value: n,
  errorDomain: []
})));
var ew = () => {
}, AH = k([hl, De, pl, al, Me], Wh), CH = k([De, zh, Uh, ew, AH, ew, fe, Me], Kh), aT = k([De, fe, hl, PH, Ya, Me, CH], Vh), TH = k([aT, De, Do], Gh);
k([De, aT, TH, Me], Xh);
var _H = {
  radiusAxis: {},
  angleAxis: {}
}, iT = Lt({
  name: "polarAxis",
  initialState: _H,
  reducers: {
    addRadiusAxis(e, t) {
      e.radiusAxis[t.payload.id] = t.payload;
    },
    removeRadiusAxis(e, t) {
      delete e.radiusAxis[t.payload.id];
    },
    addAngleAxis(e, t) {
      e.angleAxis[t.payload.id] = t.payload;
    },
    removeAngleAxis(e, t) {
      delete e.angleAxis[t.payload.id];
    }
  }
}), {
  addRadiusAxis: eZ,
  removeRadiusAxis: tZ,
  addAngleAxis: rZ,
  removeAngleAxis: nZ
} = iT.actions, kH = iT.reducer;
function tw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function rw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tw(Object(r), !0).forEach(function(n) {
      NH(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function NH(e, t, r) {
  return (t = RH(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RH(e) {
  var t = MH(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function MH(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var IH = (e, t) => t, dm = k([oT, IH], (e, t) => e.filter((r) => r.type === "pie").find((r) => r.id === t)), DH = [], fm = (e, t, r) => r?.length === 0 ? DH : r, sT = k([Oh, dm, fm], (e, t, r) => {
  var {
    chartData: n
  } = e;
  if (t != null) {
    var o;
    if (t?.data != null && t.data.length > 0 ? o = t.data : o = n, (!o || !o.length) && r != null && (o = r.map((a) => rw(rw({}, t.presentationProps), a.props))), o != null)
      return o;
  }
}), jH = k([sT, dm, fm], (e, t, r) => {
  if (!(e == null || t == null))
    return e.map((n, o) => {
      var a, i = Se(n, t.nameKey, t.name), s;
      return r != null && (a = r[o]) !== null && a !== void 0 && (a = a.props) !== null && a !== void 0 && a.fill ? s = r[o].props.fill : typeof n == "object" && n != null && "fill" in n ? s = n.fill : s = t.fill, {
        value: cn(i, t.dataKey),
        color: s,
        payload: n,
        type: t.legendType
      };
    });
}), LH = k([sT, dm, fm, He], (e, t, r, n) => {
  if (!(t == null || e == null))
    return $8({
      offset: n,
      pieSettings: t,
      displayedData: e,
      cells: r
    });
}), Mi = { exports: {} }, we = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nw;
function $H() {
  if (nw) return we;
  nw = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), i = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition"), f = Symbol.for("react.client.reference");
  function v(h) {
    if (typeof h == "object" && h !== null) {
      var g = h.$$typeof;
      switch (g) {
        case e:
          switch (h = h.type, h) {
            case r:
            case o:
            case n:
            case c:
            case u:
            case p:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case i:
                case s:
                case d:
                case l:
                  return h;
                case a:
                  return h;
                default:
                  return g;
              }
          }
        case t:
          return g;
      }
    }
  }
  return we.ContextConsumer = a, we.ContextProvider = i, we.Element = e, we.ForwardRef = s, we.Fragment = r, we.Lazy = d, we.Memo = l, we.Portal = t, we.Profiler = o, we.StrictMode = n, we.Suspense = c, we.SuspenseList = u, we.isContextConsumer = function(h) {
    return v(h) === a;
  }, we.isContextProvider = function(h) {
    return v(h) === i;
  }, we.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, we.isForwardRef = function(h) {
    return v(h) === s;
  }, we.isFragment = function(h) {
    return v(h) === r;
  }, we.isLazy = function(h) {
    return v(h) === d;
  }, we.isMemo = function(h) {
    return v(h) === l;
  }, we.isPortal = function(h) {
    return v(h) === t;
  }, we.isProfiler = function(h) {
    return v(h) === o;
  }, we.isStrictMode = function(h) {
    return v(h) === n;
  }, we.isSuspense = function(h) {
    return v(h) === c;
  }, we.isSuspenseList = function(h) {
    return v(h) === u;
  }, we.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === o || h === n || h === c || h === u || typeof h == "object" && h !== null && (h.$$typeof === d || h.$$typeof === l || h.$$typeof === i || h.$$typeof === a || h.$$typeof === s || h.$$typeof === f || h.getModuleId !== void 0);
  }, we.typeOf = v, we;
}
var xe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ow;
function BH() {
  return ow || (ow = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(h) {
      if (typeof h == "object" && h !== null) {
        var g = h.$$typeof;
        switch (g) {
          case t:
            switch (h = h.type, h) {
              case n:
              case a:
              case o:
              case u:
              case l:
              case f:
                return h;
              default:
                switch (h = h && h.$$typeof, h) {
                  case s:
                  case c:
                  case p:
                  case d:
                    return h;
                  case i:
                    return h;
                  default:
                    return g;
                }
            }
          case r:
            return g;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.for("react.view_transition"), v = Symbol.for("react.client.reference");
    xe.ContextConsumer = i, xe.ContextProvider = s, xe.Element = t, xe.ForwardRef = c, xe.Fragment = n, xe.Lazy = p, xe.Memo = d, xe.Portal = r, xe.Profiler = a, xe.StrictMode = o, xe.Suspense = u, xe.SuspenseList = l, xe.isContextConsumer = function(h) {
      return e(h) === i;
    }, xe.isContextProvider = function(h) {
      return e(h) === s;
    }, xe.isElement = function(h) {
      return typeof h == "object" && h !== null && h.$$typeof === t;
    }, xe.isForwardRef = function(h) {
      return e(h) === c;
    }, xe.isFragment = function(h) {
      return e(h) === n;
    }, xe.isLazy = function(h) {
      return e(h) === p;
    }, xe.isMemo = function(h) {
      return e(h) === d;
    }, xe.isPortal = function(h) {
      return e(h) === r;
    }, xe.isProfiler = function(h) {
      return e(h) === a;
    }, xe.isStrictMode = function(h) {
      return e(h) === o;
    }, xe.isSuspense = function(h) {
      return e(h) === u;
    }, xe.isSuspenseList = function(h) {
      return e(h) === l;
    }, xe.isValidElementType = function(h) {
      return typeof h == "string" || typeof h == "function" || h === n || h === a || h === o || h === u || h === l || typeof h == "object" && h !== null && (h.$$typeof === p || h.$$typeof === d || h.$$typeof === s || h.$$typeof === i || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
    }, xe.typeOf = e;
  })()), xe;
}
var aw;
function FH() {
  return aw || (aw = 1, process.env.NODE_ENV === "production" ? Mi.exports = /* @__PURE__ */ $H() : Mi.exports = /* @__PURE__ */ BH()), Mi.exports;
}
var zH = /* @__PURE__ */ FH(), iw = (e) => typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "", sw = null, fd = null, cT = (e) => {
  if (e === sw && Array.isArray(fd))
    return fd;
  var t = [];
  return n_.forEach(e, (r) => {
    Ce(r) || (zH.isFragment(r) ? t = t.concat(cT(r.props.children)) : t.push(r));
  }), fd = t, sw = e, t;
};
function pm(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map((o) => iw(o)) : n = [iw(t)], cT(e).forEach((o) => {
    var a = In(o, "type.displayName") || In(o, "type.name");
    n.indexOf(a) !== -1 && r.push(o);
  }), r;
}
var ml = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0, pd = {}, cw;
function UH() {
  return cw || (cw = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    function t(r) {
      if (typeof r != "object" || r == null)
        return !1;
      if (Object.getPrototypeOf(r) === null)
        return !0;
      if (Object.prototype.toString.call(r) !== "[object Object]") {
        const o = r[Symbol.toStringTag];
        return o == null || !Object.getOwnPropertyDescriptor(r, Symbol.toStringTag)?.writable ? !1 : r.toString() === `[object ${o}]`;
      }
      let n = r;
      for (; Object.getPrototypeOf(n) !== null; )
        n = Object.getPrototypeOf(n);
      return Object.getPrototypeOf(r) === n;
    }
    e.isPlainObject = t;
  })(pd)), pd;
}
var hd, lw;
function WH() {
  return lw || (lw = 1, hd = UH().isPlainObject), hd;
}
var KH = /* @__PURE__ */ WH();
const VH = /* @__PURE__ */ sn(KH);
function uw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uw(Object(r), !0).forEach(function(n) {
      qH(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qH(e, t, r) {
  return (t = HH(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function HH(e) {
  var t = GH(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function GH(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ds() {
  return Ds = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ds.apply(null, arguments);
}
var fw = (e, t, r, n, o) => {
  var a = r - n, i;
  return i = "M ".concat(e, ",").concat(t), i += "L ".concat(e + r, ",").concat(t), i += "L ".concat(e + r - a / 2, ",").concat(t + o), i += "L ".concat(e + r - a / 2 - n, ",").concat(t + o), i += "L ".concat(e, ",").concat(t, " Z"), i;
}, YH = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, XH = (e) => {
  var t = Ge(e, YH), {
    x: r,
    y: n,
    upperWidth: o,
    lowerWidth: a,
    height: i,
    className: s
  } = t, {
    animationEasing: c,
    animationDuration: u,
    animationBegin: l,
    isUpdateAnimationActive: d
  } = t, p = ye(null), [f, v] = je(-1), h = ye(o), g = ye(a), y = ye(i), w = ye(r), x = ye(n), S = To(e, "trapezoid-");
  if (Le(() => {
    if (p.current && p.current.getTotalLength)
      try {
        var C = p.current.getTotalLength();
        C && v(C);
      } catch {
      }
  }, []), r !== +r || n !== +n || o !== +o || a !== +a || i !== +i || o === 0 && a === 0 || i === 0)
    return null;
  var E = pe("recharts-trapezoid", s);
  if (!d)
    return /* @__PURE__ */ m.createElement("g", null, /* @__PURE__ */ m.createElement("path", Ds({}, mt(t), {
      className: E,
      d: fw(r, n, o, a, i)
    })));
  var O = h.current, P = g.current, A = y.current, _ = w.current, N = x.current, T = "0px ".concat(f === -1 ? 1 : f, "px"), R = "".concat(f, "px 0px"), j = M1(["strokeDasharray"], u, c);
  return /* @__PURE__ */ m.createElement(Co, {
    animationId: S,
    key: S,
    canBegin: f > 0,
    duration: u,
    easing: c,
    isActive: d,
    begin: l
  }, (C) => {
    var D = Ee(O, o, C), $ = Ee(P, a, C), z = Ee(A, i, C), I = Ee(_, r, C), F = Ee(N, n, C);
    p.current && (h.current = D, g.current = $, y.current = z, w.current = I, x.current = F);
    var oe = C > 0 ? {
      transition: j,
      strokeDasharray: R
    } : {
      strokeDasharray: T
    };
    return /* @__PURE__ */ m.createElement("path", Ds({}, mt(t), {
      className: E,
      d: fw(I, F, D, $, z),
      ref: p,
      style: dw(dw({}, oe), t.style)
    }));
  });
}, ZH = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function JH(e, t) {
  if (e == null) return {};
  var r, n, o = QH(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function QH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function pw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function js(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pw(Object(r), !0).forEach(function(n) {
      e8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function e8(e, t, r) {
  return (t = t8(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function t8(e) {
  var t = r8(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function r8(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function n8(e, t) {
  return js(js({}, t), e);
}
function o8(e, t) {
  return e === "symbols";
}
function hw(e) {
  var {
    shapeType: t,
    elementProps: r
  } = e;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ m.createElement(L1, r);
    case "trapezoid":
      return /* @__PURE__ */ m.createElement(XH, r);
    case "sector":
      return /* @__PURE__ */ m.createElement(F1, r);
    case "symbols":
      if (o8(t))
        return /* @__PURE__ */ m.createElement(Bp, r);
      break;
    default:
      return null;
  }
}
function a8(e) {
  return /* @__PURE__ */ Kt(e) ? e.props : e;
}
function lT(e) {
  var {
    option: t,
    shapeType: r,
    propTransformer: n = n8,
    activeClassName: o = "recharts-active-shape",
    isActive: a
  } = e, i = JH(e, ZH), s;
  if (/* @__PURE__ */ Kt(t))
    s = /* @__PURE__ */ Ea(t, js(js({}, i), a8(t)));
  else if (typeof t == "function")
    s = t(i);
  else if (VH(t) && typeof t != "boolean") {
    var c = n(t, i);
    s = /* @__PURE__ */ m.createElement(hw, {
      shapeType: r,
      elementProps: c
    });
  } else {
    var u = i;
    s = /* @__PURE__ */ m.createElement(hw, {
      shapeType: r,
      elementProps: u
    });
  }
  return a ? /* @__PURE__ */ m.createElement($e, {
    className: o
  }, s) : s;
}
var hm = (e, t) => {
  var r = Re();
  return (n, o) => (a) => {
    e?.(n, o, a), r(EC({
      activeIndex: String(o),
      activeDataKey: t,
      activeCoordinate: n.tooltipPosition
    }));
  };
}, mm = (e) => {
  var t = Re();
  return (r, n) => (o) => {
    e?.(r, n, o), t(H5());
  };
}, vm = (e, t) => {
  var r = Re();
  return (n, o) => (a) => {
    e?.(n, o, a), r(G5({
      activeIndex: String(o),
      activeDataKey: t,
      activeCoordinate: n.tooltipPosition
    }));
  };
};
function vl(e) {
  var {
    fn: t,
    args: r
  } = e, n = Re(), o = ot();
  return dr(() => {
    if (!o) {
      var a = t(r);
      return n(K5(a)), () => {
        n(V5(a));
      };
    }
  }, [t, r, n, o]), null;
}
var uT = () => {
};
function gm(e) {
  var {
    legendPayload: t
  } = e, r = Re(), n = ot();
  return dr(() => n ? uT : (r(k1(t)), () => {
    r(N1(t));
  }), [r, n, t]), null;
}
function i8(e) {
  var {
    legendPayload: t
  } = e, r = Re(), n = ee(fe);
  return dr(() => n !== "centric" && n !== "radial" ? uT : (r(k1(t)), () => {
    r(N1(t));
  }), [r, n, t]), null;
}
var md, s8 = () => {
  var [e] = m.useState(() => la("uid-"));
  return e;
}, c8 = (md = m.useId) !== null && md !== void 0 ? md : s8;
function l8(e, t) {
  var r = c8();
  return t || (e ? "".concat(e, "-").concat(r) : r);
}
var u8 = /* @__PURE__ */ Dt(void 0), gl = (e) => {
  var {
    id: t,
    type: r,
    children: n
  } = e, o = l8("recharts-".concat(r), t);
  return /* @__PURE__ */ m.createElement(u8.Provider, {
    value: o
  }, n(o));
}, d8 = {
  cartesianItems: [],
  polarItems: []
}, dT = Lt({
  name: "graphicalItems",
  initialState: d8,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(e, t) {
        e.cartesianItems.push(t.payload);
      },
      prepare: ut()
    },
    replaceCartesianGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, o = Pr(e).cartesianItems.indexOf(r);
        o > -1 && (e.cartesianItems[o] = n);
      },
      prepare: ut()
    },
    removeCartesianGraphicalItem: {
      reducer(e, t) {
        var r = Pr(e).cartesianItems.indexOf(t.payload);
        r > -1 && e.cartesianItems.splice(r, 1);
      },
      prepare: ut()
    },
    addPolarGraphicalItem: {
      reducer(e, t) {
        e.polarItems.push(t.payload);
      },
      prepare: ut()
    },
    removePolarGraphicalItem: {
      reducer(e, t) {
        var r = Pr(e).polarItems.indexOf(t.payload);
        r > -1 && e.polarItems.splice(r, 1);
      },
      prepare: ut()
    }
  }
}), {
  addCartesianGraphicalItem: f8,
  replaceCartesianGraphicalItem: p8,
  removeCartesianGraphicalItem: h8,
  addPolarGraphicalItem: m8,
  removePolarGraphicalItem: v8
} = dT.actions, g8 = dT.reducer;
function ym(e) {
  var t = Re(), r = ye(null);
  return dr(() => {
    r.current === null ? t(f8(e)) : r.current !== e && t(p8({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), dr(() => () => {
    r.current && (t(h8(r.current)), r.current = null);
  }, [t]), null;
}
function y8(e) {
  var t = Re();
  return dr(() => (t(m8(e)), () => {
    t(v8(e));
  }), [t, e]), null;
}
var b8 = ["onMouseEnter", "onClick", "onMouseLeave"], w8 = ["id"], x8 = ["id"];
function bm(e, t) {
  if (e == null) return {};
  var r, n, o = E8(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function E8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function mw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mw(Object(r), !0).forEach(function(n) {
      S8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function S8(e, t, r) {
  return (t = O8(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function O8(e) {
  var t = P8(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function P8(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function tn() {
  return tn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tn.apply(null, arguments);
}
function A8(e) {
  var t = tr(() => pm(e.children, ni), [e.children]), r = ee((n) => jH(n, e.id, t));
  return r == null ? null : /* @__PURE__ */ m.createElement(i8, {
    legendPayload: r
  });
}
function C8(e) {
  var {
    dataKey: t,
    nameKey: r,
    sectors: n,
    stroke: o,
    strokeWidth: a,
    fill: i,
    name: s,
    hide: c,
    tooltipType: u
  } = e;
  return {
    dataDefinedOnItem: n.map((l) => l.tooltipPayload),
    positions: n.map((l) => l.tooltipPosition),
    settings: {
      stroke: o,
      strokeWidth: a,
      fill: i,
      dataKey: t,
      nameKey: r,
      name: cn(s, t),
      hide: c,
      type: u,
      color: i,
      unit: ""
      // why doesn't Pie support unit?
    }
  };
}
var T8 = (e, t) => e > t ? "start" : e < t ? "end" : "middle", _8 = (e, t, r) => ct(typeof t == "function" ? t(e) : t, r, r * 0.8), k8 = (e, t, r) => {
  var {
    top: n,
    left: o,
    width: a,
    height: i
  } = t, s = g1(a, i), c = o + ct(e.cx, a, a / 2), u = n + ct(e.cy, i, i / 2), l = ct(e.innerRadius, s, 0), d = _8(r, e.outerRadius, s), p = e.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return {
    cx: c,
    cy: u,
    innerRadius: l,
    outerRadius: d,
    maxRadius: p
  };
}, N8 = (e, t) => {
  var r = Qe(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
};
function R8(e) {
  return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
var M8 = (e, t) => {
  if (/* @__PURE__ */ m.isValidElement(e))
    return /* @__PURE__ */ m.cloneElement(e, t);
  if (typeof e == "function")
    return e(t);
  var r = pe("recharts-pie-label-line", typeof e != "boolean" ? e.className : "");
  return /* @__PURE__ */ m.createElement(no, tn({}, t, {
    type: "linear",
    className: r
  }));
}, I8 = (e, t, r) => {
  if (/* @__PURE__ */ m.isValidElement(e))
    return /* @__PURE__ */ m.cloneElement(e, t);
  var n = r;
  if (typeof e == "function" && (n = e(t), /* @__PURE__ */ m.isValidElement(n)))
    return n;
  var o = pe("recharts-pie-label-text", R8(e));
  return /* @__PURE__ */ m.createElement(dl, tn({}, t, {
    alignmentBaseline: "middle",
    className: o
  }), n);
};
function D8(e) {
  var {
    sectors: t,
    props: r,
    showLabels: n
  } = e, {
    label: o,
    labelLine: a,
    dataKey: i
  } = r;
  if (!n || !o || !t)
    return null;
  var s = ht(r), c = Mn(o), u = Mn(a), l = typeof o == "object" && "offsetRadius" in o && typeof o.offsetRadius == "number" && o.offsetRadius || 20, d = t.map((p, f) => {
    var v = (p.startAngle + p.endAngle) / 2, h = ze(p.cx, p.cy, p.outerRadius + l, v), g = _e(_e(_e(_e({}, s), p), {}, {
      // @ts-expect-error customLabelProps is contributing unknown props
      stroke: "none"
    }, c), {}, {
      index: f,
      textAnchor: T8(h.x, p.cx)
    }, h), y = _e(_e(_e(_e({}, s), p), {}, {
      // @ts-expect-error customLabelLineProps is contributing unknown props
      fill: "none",
      // @ts-expect-error customLabelLineProps is contributing unknown props
      stroke: p.fill
    }, u), {}, {
      index: f,
      points: [ze(p.cx, p.cy, p.outerRadius, v), h],
      key: "line"
    });
    return (
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m.createElement($e, {
        key: "label-".concat(p.startAngle, "-").concat(p.endAngle, "-").concat(p.midAngle, "-").concat(f)
      }, a && M8(a, y), I8(o, g, Se(p, i)))
    );
  });
  return /* @__PURE__ */ m.createElement($e, {
    className: "recharts-pie-labels"
  }, d);
}
function j8(e) {
  var {
    sectors: t,
    props: r,
    showLabels: n
  } = e, {
    label: o
  } = r;
  return typeof o == "object" && o != null && "position" in o ? /* @__PURE__ */ m.createElement(fl, {
    label: o
  }) : /* @__PURE__ */ m.createElement(D8, {
    sectors: t,
    props: r,
    showLabels: n
  });
}
function L8(e) {
  var {
    sectors: t,
    activeShape: r,
    inactiveShape: n,
    allOtherPieProps: o
  } = e, a = ee(en), {
    onMouseEnter: i,
    onClick: s,
    onMouseLeave: c
  } = o, u = bm(o, b8), l = hm(i, o.dataKey), d = mm(c), p = vm(s, o.dataKey);
  return t == null || t.length === 0 ? null : /* @__PURE__ */ m.createElement(m.Fragment, null, t.map((f, v) => {
    if (f?.startAngle === 0 && f?.endAngle === 0 && t.length !== 1) return null;
    var h = r && String(v) === a, g = a ? n : null, y = h ? r : g, w = _e(_e({}, f), {}, {
      stroke: f.stroke,
      tabIndex: -1,
      [S1]: v,
      [O1]: o.dataKey
    });
    return /* @__PURE__ */ m.createElement(
      $e,
      tn({
        key: "sector-".concat(f?.startAngle, "-").concat(f?.endAngle, "-").concat(f.midAngle, "-").concat(v),
        tabIndex: -1,
        className: "recharts-pie-sector"
      }, La(u, f, v), {
        // @ts-expect-error the types need a bit of attention
        onMouseEnter: l(f, v),
        onMouseLeave: d(f, v),
        onClick: p(f, v)
      }),
      /* @__PURE__ */ m.createElement(lT, tn({
        option: y,
        isActive: h,
        shapeType: "sector"
      }, w))
    );
  }));
}
function $8(e) {
  var t, {
    pieSettings: r,
    displayedData: n,
    cells: o,
    offset: a
  } = e, {
    cornerRadius: i,
    startAngle: s,
    endAngle: c,
    dataKey: u,
    nameKey: l,
    tooltipType: d
  } = r, p = Math.abs(r.minAngle), f = N8(s, c), v = Math.abs(f), h = n.length <= 1 ? 0 : (t = r.paddingAngle) !== null && t !== void 0 ? t : 0, g = n.filter((O) => Se(O, u, 0) !== 0).length, y = (v >= 360 ? g : g - 1) * h, w = v - g * p - y, x = n.reduce((O, P) => {
    var A = Se(P, u, 0);
    return O + (Q(A) ? A : 0);
  }, 0), S;
  if (x > 0) {
    var E;
    S = n.map((O, P) => {
      var A = Se(O, u, 0), _ = Se(O, l, P), N = k8(r, a, O), T = (Q(A) ? A : 0) / x, R, j = _e(_e({}, O), o && o[P] && o[P].props);
      P ? R = E.endAngle + Qe(f) * h * (A !== 0 ? 1 : 0) : R = s;
      var C = R + Qe(f) * ((A !== 0 ? p : 0) + T * w), D = (R + C) / 2, $ = (N.innerRadius + N.outerRadius) / 2, z = [{
        name: _,
        value: A,
        payload: j,
        dataKey: u,
        type: d
      }], I = ze(N.cx, N.cy, $, D);
      return E = _e(_e(_e(_e({}, r.presentationProps), {}, {
        percent: T,
        cornerRadius: i,
        name: _,
        tooltipPayload: z,
        midAngle: D,
        middleRadius: $,
        tooltipPosition: I
      }, j), N), {}, {
        value: A,
        startAngle: R,
        endAngle: C,
        payload: j,
        paddingAngle: Qe(f) * h
      }), E;
    });
  }
  return S;
}
function B8(e) {
  var {
    showLabels: t,
    sectors: r,
    children: n
  } = e, o = tr(() => !t || !r ? [] : r.map((a) => ({
    value: a.value,
    payload: a.payload,
    clockWise: !1,
    parentViewBox: void 0,
    viewBox: {
      cx: a.cx,
      cy: a.cy,
      innerRadius: a.innerRadius,
      outerRadius: a.outerRadius,
      startAngle: a.startAngle,
      endAngle: a.endAngle,
      clockWise: !1
    },
    fill: a.fill
  })), [r, t]);
  return /* @__PURE__ */ m.createElement(wH, {
    value: t ? o : void 0
  }, n);
}
function F8(e) {
  var {
    props: t,
    previousSectorsRef: r
  } = e, {
    sectors: n,
    isAnimationActive: o,
    animationBegin: a,
    animationDuration: i,
    animationEasing: s,
    activeShape: c,
    inactiveShape: u,
    onAnimationStart: l,
    onAnimationEnd: d
  } = t, p = To(t, "recharts-pie-"), f = r.current, [v, h] = je(!1), g = he(() => {
    typeof d == "function" && d(), h(!1);
  }, [d]), y = he(() => {
    typeof l == "function" && l(), h(!0);
  }, [l]);
  return /* @__PURE__ */ m.createElement(B8, {
    showLabels: !v,
    sectors: n
  }, /* @__PURE__ */ m.createElement(Co, {
    animationId: p,
    begin: a,
    duration: i,
    isActive: o,
    easing: s,
    onAnimationStart: y,
    onAnimationEnd: g,
    key: p
  }, (w) => {
    var x = [], S = n && n[0], E = S?.startAngle;
    return n?.forEach((O, P) => {
      var A = f && f[P], _ = P > 0 ? In(O, "paddingAngle", 0) : 0;
      if (A) {
        var N = Ee(A.endAngle - A.startAngle, O.endAngle - O.startAngle, w), T = _e(_e({}, O), {}, {
          startAngle: E + _,
          endAngle: E + N + _
        });
        x.push(T), E = T.endAngle;
      } else {
        var {
          endAngle: R,
          startAngle: j
        } = O, C = Ee(0, R - j, w), D = _e(_e({}, O), {}, {
          startAngle: E + _,
          endAngle: E + C + _
        });
        x.push(D), E = D.endAngle;
      }
    }), r.current = x, /* @__PURE__ */ m.createElement($e, null, /* @__PURE__ */ m.createElement(L8, {
      sectors: x,
      activeShape: c,
      inactiveShape: u,
      allOtherPieProps: t
    }));
  }), /* @__PURE__ */ m.createElement(j8, {
    showLabels: !v,
    sectors: n,
    props: t
  }), t.children);
}
var z8 = {
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  cx: "50%",
  cy: "50%",
  dataKey: "value",
  endAngle: 360,
  fill: "#808080",
  hide: !1,
  innerRadius: 0,
  isAnimationActive: !Lr.isSsr,
  labelLine: !0,
  legendType: "rect",
  minAngle: 0,
  nameKey: "name",
  outerRadius: "80%",
  paddingAngle: 0,
  rootTabIndex: 0,
  startAngle: 0,
  stroke: "#fff"
};
function U8(e) {
  var {
    id: t
  } = e, r = bm(e, w8), {
    hide: n,
    className: o,
    rootTabIndex: a
  } = e, i = tr(() => pm(e.children, ni), [e.children]), s = ee((l) => LH(l, t, i)), c = ye(null), u = pe("recharts-pie", o);
  return n || s == null ? (c.current = null, /* @__PURE__ */ m.createElement($e, {
    tabIndex: a,
    className: u
  })) : /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(vl, {
    fn: C8,
    args: _e(_e({}, e), {}, {
      sectors: s
    })
  }), /* @__PURE__ */ m.createElement($e, {
    tabIndex: a,
    className: u
  }, /* @__PURE__ */ m.createElement(F8, {
    props: _e(_e({}, r), {}, {
      sectors: s
    }),
    previousSectorsRef: c
  })));
}
function fT(e) {
  var t = Ge(e, z8), {
    id: r
  } = t, n = bm(t, x8), o = ht(n);
  return /* @__PURE__ */ m.createElement(gl, {
    id: r,
    type: "pie"
  }, (a) => /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(y8, {
    type: "pie",
    id: a,
    data: n.data,
    dataKey: n.dataKey,
    hide: n.hide,
    angleAxisId: 0,
    radiusAxisId: 0,
    name: n.name,
    nameKey: n.nameKey,
    tooltipType: n.tooltipType,
    legendType: n.legendType,
    fill: n.fill,
    cx: n.cx,
    cy: n.cy,
    startAngle: n.startAngle,
    endAngle: n.endAngle,
    paddingAngle: n.paddingAngle,
    minAngle: n.minAngle,
    innerRadius: n.innerRadius,
    outerRadius: n.outerRadius,
    cornerRadius: n.cornerRadius,
    presentationProps: o,
    maxRadius: t.maxRadius
  }), /* @__PURE__ */ m.createElement(A8, tn({}, n, {
    id: a
  })), /* @__PURE__ */ m.createElement(U8, tn({}, n, {
    id: a
  }))));
}
fT.displayName = "Pie";
function vw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function gw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vw(Object(r), !0).forEach(function(n) {
      W8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function W8(e, t, r) {
  return (t = K8(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function K8(e) {
  var t = V8(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function V8(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var q8 = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
}, pT = Lt({
  name: "cartesianAxis",
  initialState: q8,
  reducers: {
    addXAxis: {
      reducer(e, t) {
        e.xAxis[t.payload.id] = t.payload;
      },
      prepare: ut()
    },
    removeXAxis: {
      reducer(e, t) {
        delete e.xAxis[t.payload.id];
      },
      prepare: ut()
    },
    addYAxis: {
      reducer(e, t) {
        e.yAxis[t.payload.id] = t.payload;
      },
      prepare: ut()
    },
    removeYAxis: {
      reducer(e, t) {
        delete e.yAxis[t.payload.id];
      },
      prepare: ut()
    },
    addZAxis: {
      reducer(e, t) {
        e.zAxis[t.payload.id] = t.payload;
      },
      prepare: ut()
    },
    removeZAxis: {
      reducer(e, t) {
        delete e.zAxis[t.payload.id];
      },
      prepare: ut()
    },
    updateYAxisWidth(e, t) {
      var {
        id: r,
        width: n
      } = t.payload, o = e.yAxis[r];
      if (o) {
        var a = o.widthHistory || [];
        if (a.length === 3 && a[0] === a[2] && n === a[1] && n !== o.width && Math.abs(n - a[0]) <= 1)
          return;
        var i = [...a, n].slice(-3);
        e.yAxis[r] = gw(gw({}, e.yAxis[r]), {}, {
          width: n,
          widthHistory: i
        });
      }
    }
  }
}), {
  addXAxis: H8,
  removeXAxis: G8,
  addYAxis: Y8,
  removeYAxis: X8,
  addZAxis: oZ,
  removeZAxis: aZ,
  updateYAxisWidth: Z8
} = pT.actions, J8 = pT.reducer, Q8 = k([He], (e) => {
  if (e)
    return {
      top: e.top,
      bottom: e.bottom,
      left: e.left,
      right: e.right
    };
}), e6 = k([Q8, Dr, jr], (e, t, r) => {
  if (!(!e || t == null || r == null))
    return {
      x: e.left,
      y: e.top,
      width: Math.max(0, t - e.left - e.right),
      height: Math.max(0, r - e.top - e.bottom)
    };
}), yl = () => ee(e6), t6 = () => ee(IV);
function yw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yw(Object(r), !0).forEach(function(n) {
      r6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function r6(e, t, r) {
  return (t = n6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function n6(e) {
  var t = o6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function o6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var a6 = (e) => {
  var {
    point: t,
    childIndex: r,
    mainColor: n,
    activeDot: o,
    dataKey: a
  } = e;
  if (o === !1 || t.x == null || t.y == null)
    return null;
  var i = bw(bw({
    index: r,
    dataKey: a,
    // @ts-expect-error activeDot is contributing unknown props
    cx: t.x,
    // @ts-expect-error activeDot is contributing unknown props
    cy: t.y,
    // @ts-expect-error activeDot is contributing unknown props
    r: 4,
    // @ts-expect-error activeDot is contributing unknown props
    fill: n ?? "none",
    // @ts-expect-error activeDot is contributing unknown props
    strokeWidth: 2,
    // @ts-expect-error activeDot is contributing unknown props
    stroke: "#fff",
    payload: t.payload,
    value: t.value
  }, Mn(o)), Fp(o)), s;
  return /* @__PURE__ */ Kt(o) ? s = /* @__PURE__ */ Ea(o, i) : typeof o == "function" ? s = o(i) : s = /* @__PURE__ */ m.createElement(um, i), /* @__PURE__ */ m.createElement($e, {
    className: "recharts-active-dot"
  }, s);
};
function If(e) {
  var {
    points: t,
    mainColor: r,
    activeDot: n,
    itemDataKey: o
  } = e, a = ee(en), i = t6();
  if (t == null || i == null)
    return null;
  var s = t.find((c) => i.includes(c.payload));
  return Ce(s) ? null : a6({
    point: s,
    childIndex: Number(a),
    mainColor: r,
    dataKey: o,
    activeDot: n
  });
}
var i6 = process.env.NODE_ENV === "production", vd = "Invariant failed";
function ww(e, t) {
  if (i6)
    throw new Error(vd);
  var r = typeof t == "function" ? t() : t, n = r ? "".concat(vd, ": ").concat(r) : vd;
  throw new Error(n);
}
var s6 = ["x", "y"];
function Df() {
  return Df = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Df.apply(null, arguments);
}
function xw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Go(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xw(Object(r), !0).forEach(function(n) {
      c6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function c6(e, t, r) {
  return (t = l6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function l6(e) {
  var t = u6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function u6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function d6(e, t) {
  if (e == null) return {};
  var r, n, o = f6(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function f6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function p6(e, t) {
  var {
    x: r,
    y: n
  } = e, o = d6(e, s6), a = "".concat(r), i = parseInt(a, 10), s = "".concat(n), c = parseInt(s, 10), u = "".concat(t.height || o.height), l = parseInt(u, 10), d = "".concat(t.width || o.width), p = parseInt(d, 10);
  return Go(Go(Go(Go(Go({}, t), o), i ? {
    x: i
  } : {}), c ? {
    y: c
  } : {}), {}, {
    height: l,
    width: p,
    name: t.name,
    radius: t.radius
  });
}
function wm(e) {
  return /* @__PURE__ */ m.createElement(lT, Df({
    shapeType: "rectangle",
    propTransformer: p6,
    activeClassName: "recharts-active-bar"
  }, e));
}
var h6 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return (n, o) => {
    if (Q(t)) return t;
    var a = Q(n) || Ce(n);
    return a ? t(n, o) : (a || (process.env.NODE_ENV !== "production" ? ww(!1, "minPointSize callback function received a value with type of ".concat(typeof n, ". Currently only numbers or null/undefined are supported.")) : ww()), r);
  };
}, m6 = {}, hT = Lt({
  name: "errorBars",
  initialState: m6,
  reducers: {
    addErrorBar: (e, t) => {
      var {
        itemId: r,
        errorBar: n
      } = t.payload;
      e[r] || (e[r] = []), e[r].push(n);
    },
    replaceErrorBar: (e, t) => {
      var {
        itemId: r,
        prev: n,
        next: o
      } = t.payload;
      e[r] && (e[r] = e[r].map((a) => a.dataKey === n.dataKey && a.direction === n.direction ? o : a));
    },
    removeErrorBar: (e, t) => {
      var {
        itemId: r,
        errorBar: n
      } = t.payload;
      e[r] && (e[r] = e[r].filter((o) => o.dataKey !== n.dataKey || o.direction !== n.direction));
    }
  }
}), {
  addErrorBar: iZ,
  replaceErrorBar: sZ,
  removeErrorBar: cZ
} = hT.actions, v6 = hT.reducer, g6 = ["children"];
function y6(e, t) {
  if (e == null) return {};
  var r, n, o = b6(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function b6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var w6 = {
  data: [],
  xAxisId: "xAxis-0",
  yAxisId: "yAxis-0",
  dataPointFormatter: () => ({
    x: 0,
    y: 0,
    value: 0
  }),
  errorBarOffset: 0
}, x6 = /* @__PURE__ */ Dt(w6);
function mT(e) {
  var {
    children: t
  } = e, r = y6(e, g6);
  return /* @__PURE__ */ m.createElement(x6.Provider, {
    value: r
  }, t);
}
function bl(e, t) {
  var r, n, o = ee((u) => Br(u, e)), a = ee((u) => Fr(u, t)), i = (r = o?.allowDataOverflow) !== null && r !== void 0 ? r : Ot.allowDataOverflow, s = (n = a?.allowDataOverflow) !== null && n !== void 0 ? n : Pt.allowDataOverflow, c = i || s;
  return {
    needClip: c,
    needClipX: i,
    needClipY: s
  };
}
function xm(e) {
  var {
    xAxisId: t,
    yAxisId: r,
    clipPathId: n
  } = e, o = yl(), {
    needClipX: a,
    needClipY: i,
    needClip: s
  } = bl(t, r);
  if (!s)
    return null;
  var {
    x: c,
    y: u,
    width: l,
    height: d
  } = o;
  return /* @__PURE__ */ m.createElement("clipPath", {
    id: "clipPath-".concat(n)
  }, /* @__PURE__ */ m.createElement("rect", {
    x: a ? c : c - l / 2,
    y: i ? u : u - d / 2,
    width: a ? l : l * 2,
    height: i ? d : d * 2
  }));
}
var E6 = ["onMouseEnter", "onMouseLeave", "onClick"], S6 = ["value", "background", "tooltipPosition"], O6 = ["id"], P6 = ["onMouseEnter", "onClick", "onMouseLeave"];
function rn() {
  return rn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rn.apply(null, arguments);
}
function Ew(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ew(Object(r), !0).forEach(function(n) {
      A6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ew(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function A6(e, t, r) {
  return (t = C6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function C6(e) {
  var t = T6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function T6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ls(e, t) {
  if (e == null) return {};
  var r, n, o = _6(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function _6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var k6 = (e) => {
  var {
    dataKey: t,
    name: r,
    fill: n,
    legendType: o,
    hide: a
  } = e;
  return [{
    inactive: a,
    dataKey: t,
    type: o,
    color: n,
    value: cn(r, t),
    payload: e
  }];
};
function N6(e) {
  var {
    dataKey: t,
    stroke: r,
    strokeWidth: n,
    fill: o,
    name: a,
    hide: i,
    unit: s
  } = e;
  return {
    dataDefinedOnItem: void 0,
    positions: void 0,
    settings: {
      stroke: r,
      strokeWidth: n,
      fill: o,
      dataKey: t,
      nameKey: void 0,
      name: cn(a, t),
      hide: i,
      type: e.tooltipType,
      color: e.fill,
      unit: s
    }
  };
}
function R6(e) {
  var t = ee(en), {
    data: r,
    dataKey: n,
    background: o,
    allOtherBarProps: a
  } = e, {
    onMouseEnter: i,
    onMouseLeave: s,
    onClick: c
  } = a, u = Ls(a, E6), l = hm(i, n), d = mm(s), p = vm(c, n);
  if (!o || r == null)
    return null;
  var f = Mn(o);
  return /* @__PURE__ */ m.createElement(m.Fragment, null, r.map((v, h) => {
    var {
      value: g,
      background: y,
      tooltipPosition: w
    } = v, x = Ls(v, S6);
    if (!y)
      return null;
    var S = l(v, h), E = d(v, h), O = p(v, h), P = dt(dt(dt(dt(dt({
      option: o,
      isActive: String(h) === t
    }, x), {}, {
      // @ts-expect-error backgroundProps is contributing unknown props
      fill: "#eee"
    }, y), f), La(u, v, h)), {}, {
      onMouseEnter: S,
      onMouseLeave: E,
      onClick: O,
      dataKey: n,
      index: h,
      className: "recharts-bar-background-rectangle"
    });
    return /* @__PURE__ */ m.createElement(wm, rn({
      key: "background-bar-".concat(h)
    }, P));
  }));
}
function M6(e) {
  var {
    showLabels: t,
    children: r,
    rects: n
  } = e, o = n?.map((a) => {
    var i = {
      x: a.x,
      y: a.y,
      width: a.width,
      height: a.height
    };
    return dt(dt({}, i), {}, {
      value: a.value,
      payload: a.payload,
      parentViewBox: a.parentViewBox,
      viewBox: i,
      fill: a.fill
    });
  });
  return /* @__PURE__ */ m.createElement(lm, {
    value: t ? o : void 0
  }, r);
}
function I6(e) {
  var {
    shape: t,
    activeBar: r,
    baseProps: n,
    entry: o,
    index: a,
    dataKey: i
  } = e, s = ee(en), c = ee(LC), u = r && String(a) === s && (c == null || i === c), l = u ? r : t;
  return /* @__PURE__ */ m.createElement(wm, rn({}, n, {
    name: String(n.name)
  }, o, {
    isActive: u,
    option: l,
    index: a,
    dataKey: i
  }));
}
function D6(e) {
  var {
    shape: t,
    baseProps: r,
    entry: n,
    index: o,
    dataKey: a
  } = e;
  return /* @__PURE__ */ m.createElement(wm, rn({}, r, {
    name: String(r.name)
  }, n, {
    isActive: !1,
    option: t,
    index: o,
    dataKey: a
  }));
}
function j6(e) {
  var {
    data: t,
    props: r
  } = e, n = ht(r), {
    id: o
  } = n, a = Ls(n, O6), {
    shape: i,
    dataKey: s,
    activeBar: c
  } = r, {
    onMouseEnter: u,
    onClick: l,
    onMouseLeave: d
  } = r, p = Ls(r, P6), f = hm(u, s), v = mm(d), h = vm(l, s);
  return t ? /* @__PURE__ */ m.createElement(m.Fragment, null, t.map((g, y) => /* @__PURE__ */ m.createElement(
    $e,
    rn({
      key: "rectangle-".concat(g?.x, "-").concat(g?.y, "-").concat(g?.value, "-").concat(y),
      className: "recharts-bar-rectangle"
    }, La(p, g, y), {
      // @ts-expect-error BarRectangleItem type definition says it's missing properties, but I can see them present in debugger!
      onMouseEnter: f(g, y),
      onMouseLeave: v(g, y),
      onClick: h(g, y)
    }),
    c ? /* @__PURE__ */ m.createElement(I6, {
      shape: i,
      activeBar: c,
      baseProps: a,
      entry: g,
      index: y,
      dataKey: s
    }) : (
      /*
       * If the `activeBar` prop is falsy, then let's call the variant without hooks.
       * Using the `selectActiveTooltipIndex` selector is usually fast
       * but in charts with large-ish amount of data even the few nanoseconds add up to a noticeable jank.
       * If the activeBar is false then we don't need to know which index is active - because we won't use it anyway.
       * So let's just skip the hooks altogether. That way, React can skip rendering the component,
       * and can skip the tree reconciliation for its children too.
       * Because we can't call hooks conditionally, we need to have a separate component for that.
       */
      /* @__PURE__ */ m.createElement(D6, {
        shape: i,
        baseProps: a,
        entry: g,
        index: y,
        dataKey: s
      })
    )
  ))) : null;
}
function L6(e) {
  var {
    props: t,
    previousRectanglesRef: r
  } = e, {
    data: n,
    layout: o,
    isAnimationActive: a,
    animationBegin: i,
    animationDuration: s,
    animationEasing: c,
    onAnimationEnd: u,
    onAnimationStart: l
  } = t, d = r.current, p = To(t, "recharts-bar-"), [f, v] = je(!1), h = !f, g = he(() => {
    typeof u == "function" && u(), v(!1);
  }, [u]), y = he(() => {
    typeof l == "function" && l(), v(!0);
  }, [l]);
  return /* @__PURE__ */ m.createElement(M6, {
    showLabels: h,
    rects: n
  }, /* @__PURE__ */ m.createElement(Co, {
    animationId: p,
    begin: i,
    duration: s,
    isActive: a,
    easing: c,
    onAnimationEnd: g,
    onAnimationStart: y,
    key: p
  }, (w) => {
    var x = w === 1 ? n : n?.map((S, E) => {
      var O = d && d[E];
      if (O)
        return dt(dt({}, S), {}, {
          x: Ee(O.x, S.x, w),
          y: Ee(O.y, S.y, w),
          width: Ee(O.width, S.width, w),
          height: Ee(O.height, S.height, w)
        });
      if (o === "horizontal") {
        var P = Ee(0, S.height, w);
        return dt(dt({}, S), {}, {
          y: S.y + S.height - P,
          height: P
        });
      }
      var A = Ee(0, S.width, w);
      return dt(dt({}, S), {}, {
        width: A
      });
    });
    return w > 0 && (r.current = x ?? null), x == null ? null : /* @__PURE__ */ m.createElement($e, null, /* @__PURE__ */ m.createElement(j6, {
      props: t,
      data: x
    }));
  }), /* @__PURE__ */ m.createElement(fl, {
    label: t.label
  }), t.children);
}
function $6(e) {
  var t = ye(null);
  return /* @__PURE__ */ m.createElement(L6, {
    previousRectanglesRef: t,
    props: e
  });
}
var vT = 0, B6 = (e, t) => {
  var r = Array.isArray(e.value) ? e.value[1] : e.value;
  return {
    x: e.x,
    y: e.y,
    value: r,
    // @ts-expect-error getValueByDataKey does not validate the output type
    errorVal: Se(e, t)
  };
};
class F6 extends xa {
  render() {
    var {
      hide: t,
      data: r,
      dataKey: n,
      className: o,
      xAxisId: a,
      yAxisId: i,
      needClip: s,
      background: c,
      id: u
    } = this.props;
    if (t || r == null)
      return null;
    var l = pe("recharts-bar", o), d = u;
    return /* @__PURE__ */ m.createElement($e, {
      className: l,
      id: u
    }, s && /* @__PURE__ */ m.createElement("defs", null, /* @__PURE__ */ m.createElement(xm, {
      clipPathId: d,
      xAxisId: a,
      yAxisId: i
    })), /* @__PURE__ */ m.createElement($e, {
      className: "recharts-bar-rectangles",
      clipPath: s ? "url(#clipPath-".concat(d, ")") : void 0
    }, /* @__PURE__ */ m.createElement(R6, {
      data: r,
      dataKey: n,
      background: c,
      allOtherBarProps: this.props
    }), /* @__PURE__ */ m.createElement($6, this.props)));
  }
}
var z6 = {
  activeBar: !1,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease",
  hide: !1,
  isAnimationActive: !Lr.isSsr,
  legendType: "rect",
  minPointSize: vT,
  xAxisId: 0,
  yAxisId: 0
};
function U6(e) {
  var {
    xAxisId: t,
    yAxisId: r,
    hide: n,
    legendType: o,
    minPointSize: a,
    activeBar: i,
    animationBegin: s,
    animationDuration: c,
    animationEasing: u,
    isAnimationActive: l
  } = e, {
    needClip: d
  } = bl(t, r), p = Wa(), f = ot(), v = pm(e.children, ni), h = ee((w) => vG(w, t, r, f, e.id, v));
  if (p !== "vertical" && p !== "horizontal")
    return null;
  var g, y = h?.[0];
  return y == null || y.height == null || y.width == null ? g = 0 : g = p === "vertical" ? y.height / 2 : y.width / 2, /* @__PURE__ */ m.createElement(mT, {
    xAxisId: t,
    yAxisId: r,
    data: h,
    dataPointFormatter: B6,
    errorBarOffset: g
  }, /* @__PURE__ */ m.createElement(F6, rn({}, e, {
    layout: p,
    needClip: d,
    data: h,
    xAxisId: t,
    yAxisId: r,
    hide: n,
    legendType: o,
    minPointSize: a,
    activeBar: i,
    animationBegin: s,
    animationDuration: c,
    animationEasing: u,
    isAnimationActive: l
  })));
}
function W6(e) {
  var {
    layout: t,
    barSettings: {
      dataKey: r,
      minPointSize: n
    },
    pos: o,
    bandSize: a,
    xAxis: i,
    yAxis: s,
    xAxisTicks: c,
    yAxisTicks: u,
    stackedData: l,
    displayedData: d,
    offset: p,
    cells: f,
    parentViewBox: v
  } = e, h = t === "horizontal" ? s : i, g = l ? h.scale.domain() : null, y = Fz({
    numericAxis: h
  });
  return d.map((w, x) => {
    var S, E, O, P, A, _;
    l ? S = Dz(l[x], g) : (S = Se(w, r), Array.isArray(S) || (S = [y, S]));
    var N = h6(n, vT)(S[1], x);
    if (t === "horizontal") {
      var T, [R, j] = [s.scale(S[0]), s.scale(S[1])];
      E = Qg({
        axis: i,
        ticks: c,
        bandSize: a,
        offset: o.offset,
        entry: w,
        index: x
      }), O = (T = j ?? R) !== null && T !== void 0 ? T : void 0, P = o.size;
      var C = R - j;
      if (A = Mt(C) ? 0 : C, _ = {
        x: E,
        y: p.top,
        width: P,
        height: p.height
      }, Math.abs(N) > 0 && Math.abs(A) < Math.abs(N)) {
        var D = Qe(A || N) * (Math.abs(N) - Math.abs(A));
        O -= D, A += D;
      }
    } else {
      var [$, z] = [i.scale(S[0]), i.scale(S[1])];
      if (E = $, O = Qg({
        axis: s,
        ticks: u,
        bandSize: a,
        offset: o.offset,
        entry: w,
        index: x
      }), P = z - $, A = o.size, _ = {
        x: p.left,
        y: O,
        width: p.width,
        height: A
      }, Math.abs(N) > 0 && Math.abs(P) < Math.abs(N)) {
        var I = Qe(P || N) * (Math.abs(N) - Math.abs(P));
        P += I;
      }
    }
    if (E == null || O == null || P == null || A == null)
      return null;
    var F = dt(dt({}, w), {}, {
      x: E,
      y: O,
      width: P,
      height: A,
      value: l ? S : S[1],
      payload: w,
      background: _,
      tooltipPosition: {
        x: E + P / 2,
        y: O + A / 2
      },
      parentViewBox: v
    }, f && f[x] && f[x].props);
    return F;
  }).filter(Boolean);
}
function K6(e) {
  var t = Ge(e, z6), r = ot();
  return /* @__PURE__ */ m.createElement(gl, {
    id: t.id,
    type: "bar"
  }, (n) => /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(gm, {
    legendPayload: k6(t)
  }), /* @__PURE__ */ m.createElement(vl, {
    fn: N6,
    args: t
  }), /* @__PURE__ */ m.createElement(ym, {
    type: "bar",
    id: n,
    data: void 0,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    dataKey: t.dataKey,
    stackId: x1(t.stackId),
    hide: t.hide,
    barSize: t.barSize,
    minPointSize: t.minPointSize,
    maxBarSize: t.maxBarSize,
    isPanorama: r
  }), /* @__PURE__ */ m.createElement(U6, rn({}, t, {
    id: n
  }))));
}
var gT = /* @__PURE__ */ m.memo(K6);
gT.displayName = "Bar";
function Sw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ii(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sw(Object(r), !0).forEach(function(n) {
      V6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function V6(e, t, r) {
  return (t = q6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function q6(e) {
  var t = H6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function H6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var G6 = (e, t) => t, Y6 = (e, t, r) => r, X6 = (e, t, r, n) => n, Z6 = (e, t, r, n, o) => o, oi = k([Ja, Z6], (e, t) => e.filter((r) => r.type === "bar").find((r) => r.id === t)), J6 = k([oi], (e) => e?.maxBarSize), Q6 = (e, t, r, n, o, a) => a, Ow = (e, t, r) => {
  var n = r ?? e;
  if (!Ce(n))
    return ct(n, t, 0);
}, eG = k([fe, Ja, G6, Y6, X6], (e, t, r, n, o) => t.filter((a) => e === "horizontal" ? a.xAxisId === r : a.yAxisId === n).filter((a) => a.isPanorama === o).filter((a) => a.hide === !1).filter((a) => a.type === "bar")), tG = (e, t, r, n) => {
  var o = fe(e);
  return o === "horizontal" ? ba(e, "yAxis", r, n) : ba(e, "xAxis", t, n);
}, rG = (e, t, r) => {
  var n = fe(e);
  return n === "horizontal" ? Sb(e, "xAxis", t) : Sb(e, "yAxis", r);
}, nG = (e, t, r) => {
  var n = {}, o = e.filter(tl), a = e.filter((u) => u.stackId == null), i = o.reduce((u, l) => (u[l.stackId] || (u[l.stackId] = []), u[l.stackId].push(l), u), n), s = Object.entries(i).map((u) => {
    var [l, d] = u, p = d.map((v) => v.dataKey), f = Ow(t, r, d[0].barSize);
    return {
      stackId: l,
      dataKeys: p,
      barSize: f
    };
  }), c = a.map((u) => {
    var l = [u.dataKey].filter((p) => p != null), d = Ow(t, r, u.barSize);
    return {
      stackId: void 0,
      dataKeys: l,
      barSize: d
    };
  });
  return [...s, ...c];
}, oG = k([eG, FK, rG], nG), aG = (e, t, r, n, o) => {
  var a, i, s = oi(e, t, r, n, o);
  if (s != null) {
    var c = fe(e), u = LA(e), {
      maxBarSize: l
    } = s, d = Ce(l) ? u : l, p, f;
    return c === "horizontal" ? (p = vr(e, "xAxis", t, n), f = mr(e, "xAxis", t, n)) : (p = vr(e, "yAxis", r, n), f = mr(e, "yAxis", r, n)), (a = (i = Ln(p, f, !0)) !== null && i !== void 0 ? i : d) !== null && a !== void 0 ? a : 0;
  }
}, yT = (e, t, r, n) => {
  var o = fe(e), a, i;
  return o === "horizontal" ? (a = vr(e, "xAxis", t, n), i = mr(e, "xAxis", t, n)) : (a = vr(e, "yAxis", r, n), i = mr(e, "yAxis", r, n)), Ln(a, i);
};
function iG(e, t, r, n, o) {
  var a = n.length;
  if (!(a < 1)) {
    var i = ct(e, r, 0, !0), s, c = [];
    if (We(n[0].barSize)) {
      var u = !1, l = r / a, d = n.reduce((y, w) => y + (w.barSize || 0), 0);
      d += (a - 1) * i, d >= r && (d -= (a - 1) * i, i = 0), d >= r && l > 0 && (u = !0, l *= 0.9, d = a * l);
      var p = (r - d) / 2 >> 0, f = {
        offset: p - i,
        size: 0
      };
      s = n.reduce((y, w) => {
        var x, S = {
          stackId: w.stackId,
          dataKeys: w.dataKeys,
          position: {
            offset: f.offset + f.size + i,
            size: u ? l : (x = w.barSize) !== null && x !== void 0 ? x : 0
          }
        }, E = [...y, S];
        return f = E[E.length - 1].position, E;
      }, c);
    } else {
      var v = ct(t, r, 0, !0);
      r - 2 * v - (a - 1) * i <= 0 && (i = 0);
      var h = (r - 2 * v - (a - 1) * i) / a;
      h > 1 && (h >>= 0);
      var g = We(o) ? Math.min(h, o) : h;
      s = n.reduce((y, w, x) => [...y, {
        stackId: w.stackId,
        dataKeys: w.dataKeys,
        position: {
          offset: v + (h + i) * x + (h - g) / 2,
          size: g
        }
      }], c);
    }
    return s;
  }
}
var sG = (e, t, r, n, o, a, i) => {
  var s = Ce(i) ? t : i, c = iG(r, n, o !== a ? o : a, e, s);
  return o !== a && c != null && (c = c.map((u) => Ii(Ii({}, u), {}, {
    position: Ii(Ii({}, u.position), {}, {
      offset: u.position.offset - o / 2
    })
  }))), c;
}, cG = k([oG, LA, BK, $A, aG, yT, J6], sG), lG = (e, t, r, n) => vr(e, "xAxis", t, n), uG = (e, t, r, n) => vr(e, "yAxis", r, n), dG = (e, t, r, n) => mr(e, "xAxis", t, n), fG = (e, t, r, n) => mr(e, "yAxis", r, n), pG = k([cG, oi], (e, t) => {
  if (!(e == null || t == null)) {
    var r = e.find((n) => n.stackId === t.stackId && t.dataKey != null && n.dataKeys.includes(t.dataKey));
    if (r != null)
      return r.position;
  }
}), hG = (e, t) => {
  var r = el(t);
  if (!(!e || r == null || t == null)) {
    var {
      stackId: n
    } = t;
    if (n != null) {
      var o = e[n];
      if (o) {
        var {
          stackedData: a
        } = o;
        if (a)
          return a.find((i) => i.key === r);
      }
    }
  }
}, mG = k([tG, oi], hG), vG = k([He, Xp, lG, uG, dG, fG, pG, fe, Ga, yT, mG, oi, Q6], (e, t, r, n, o, a, i, s, c, u, l, d, p) => {
  var {
    chartData: f,
    dataStartIndex: v,
    dataEndIndex: h
  } = c;
  if (!(d == null || i == null || t == null || s !== "horizontal" && s !== "vertical" || r == null || n == null || o == null || a == null || u == null)) {
    var {
      data: g
    } = d, y;
    if (g != null && g.length > 0 ? y = g : y = f?.slice(v, h + 1), y != null)
      return W6({
        layout: s,
        barSettings: d,
        pos: i,
        parentViewBox: t,
        bandSize: u,
        xAxis: r,
        yAxis: n,
        xAxisTicks: o,
        yAxisTicks: a,
        stackedData: l,
        displayedData: y,
        offset: e,
        cells: p
      });
  }
}), bT = (e) => {
  var {
    chartData: t
  } = e, r = Re(), n = ot();
  return Le(() => n ? () => {
  } : (r(Mb(t)), () => {
    r(Mb(void 0));
  }), [t, r, n]), null;
}, Pw = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}, wT = Lt({
  name: "brush",
  initialState: Pw,
  reducers: {
    setBrushSettings(e, t) {
      return t.payload == null ? Pw : t.payload;
    }
  }
}), {
  setBrushSettings: lZ
} = wT.actions, gG = wT.reducer;
function yG(e, t, r) {
  return (t = bG(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bG(e) {
  var t = wG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function wG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class Em {
  static create(t) {
    return new Em(t);
  }
  constructor(t) {
    this.scale = t;
  }
  get domain() {
    return this.scale.domain;
  }
  get range() {
    return this.scale.range;
  }
  get rangeMin() {
    return this.range()[0];
  }
  get rangeMax() {
    return this.range()[1];
  }
  get bandwidth() {
    return this.scale.bandwidth;
  }
  apply(t) {
    var {
      bandAware: r,
      position: n
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (t !== void 0) {
      if (n)
        switch (n) {
          case "start":
            return this.scale(t);
          case "middle": {
            var o = this.bandwidth ? this.bandwidth() / 2 : 0;
            return this.scale(t) + o;
          }
          case "end": {
            var a = this.bandwidth ? this.bandwidth() : 0;
            return this.scale(t) + a;
          }
          default:
            return this.scale(t);
        }
      if (r) {
        var i = this.bandwidth ? this.bandwidth() / 2 : 0;
        return this.scale(t) + i;
      }
      return this.scale(t);
    }
  }
  isInRange(t) {
    var r = this.range(), n = r[0], o = r[r.length - 1];
    return n <= o ? t >= n && t <= o : t >= o && t <= n;
  }
}
yG(Em, "EPS", 1e-4);
function xG(e) {
  return (e % 180 + 180) % 180;
}
var EG = function(t) {
  var {
    width: r,
    height: n
  } = t, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = xG(o), i = a * Math.PI / 180, s = Math.atan(n / r), c = i > s && i < Math.PI - s ? n / Math.sin(i) : r / Math.cos(i);
  return Math.abs(c);
}, SG = {
  dots: [],
  areas: [],
  lines: []
}, xT = Lt({
  name: "referenceElements",
  initialState: SG,
  reducers: {
    addDot: (e, t) => {
      e.dots.push(t.payload);
    },
    removeDot: (e, t) => {
      var r = Pr(e).dots.findIndex((n) => n === t.payload);
      r !== -1 && e.dots.splice(r, 1);
    },
    addArea: (e, t) => {
      e.areas.push(t.payload);
    },
    removeArea: (e, t) => {
      var r = Pr(e).areas.findIndex((n) => n === t.payload);
      r !== -1 && e.areas.splice(r, 1);
    },
    addLine: (e, t) => {
      e.lines.push(t.payload);
    },
    removeLine: (e, t) => {
      var r = Pr(e).lines.findIndex((n) => n === t.payload);
      r !== -1 && e.lines.splice(r, 1);
    }
  }
}), {
  addDot: uZ,
  removeDot: dZ,
  addArea: fZ,
  removeArea: pZ,
  addLine: hZ,
  removeLine: mZ
} = xT.actions, OG = xT.reducer, PG = /* @__PURE__ */ Dt(void 0), AG = (e) => {
  var {
    children: t
  } = e, [r] = je("".concat(la("recharts"), "-clip")), n = yl();
  if (n == null)
    return null;
  var {
    x: o,
    y: a,
    width: i,
    height: s
  } = n;
  return /* @__PURE__ */ m.createElement(PG.Provider, {
    value: r
  }, /* @__PURE__ */ m.createElement("defs", null, /* @__PURE__ */ m.createElement("clipPath", {
    id: r
  }, /* @__PURE__ */ m.createElement("rect", {
    x: o,
    y: a,
    height: s,
    width: i
  }))), t);
};
function mo(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function ET(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], o = 0; o < e.length; o += t)
    n.push(e[o]);
  return n;
}
function CG(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return EG(n, r);
}
function TG(e, t, r) {
  var n = r === "width", {
    x: o,
    y: a,
    width: i,
    height: s
  } = e;
  return t === 1 ? {
    start: n ? o : a,
    end: n ? o + i : a + s
  } : {
    start: n ? o + i : a + s,
    end: n ? o : a
  };
}
function $s(e, t, r, n, o) {
  if (e * t < e * n || e * t > e * o)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - o) <= 0;
}
function _G(e, t) {
  return ET(e, t + 1);
}
function kG(e, t, r, n, o) {
  for (var a = (n || []).slice(), {
    start: i,
    end: s
  } = t, c = 0, u = 1, l = i, d = function() {
    var v = n?.[c];
    if (v === void 0)
      return {
        v: ET(n, u)
      };
    var h = c, g, y = () => (g === void 0 && (g = r(v, h)), g), w = v.coordinate, x = c === 0 || $s(e, w, y, l, s);
    x || (c = 0, l = i, u += 1), x && (l = w + e * (y() / 2 + o), c += u);
  }, p; u <= a.length; )
    if (p = d(), p) return p.v;
  return [];
}
function Aw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function at(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Aw(Object(r), !0).forEach(function(n) {
      NG(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Aw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function NG(e, t, r) {
  return (t = RG(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RG(e) {
  var t = MG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function MG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function IG(e, t, r, n, o) {
  for (var a = (n || []).slice(), i = a.length, {
    start: s
  } = t, {
    end: c
  } = t, u = function(p) {
    var f = a[p], v, h = () => (v === void 0 && (v = r(f, p)), v);
    if (p === i - 1) {
      var g = e * (f.coordinate + e * h() / 2 - c);
      a[p] = f = at(at({}, f), {}, {
        tickCoord: g > 0 ? f.coordinate - g * e : f.coordinate
      });
    } else
      a[p] = f = at(at({}, f), {}, {
        tickCoord: f.coordinate
      });
    var y = $s(e, f.tickCoord, h, s, c);
    y && (c = f.tickCoord - e * (h() / 2 + o), a[p] = at(at({}, f), {}, {
      isShow: !0
    }));
  }, l = i - 1; l >= 0; l--)
    u(l);
  return a;
}
function DG(e, t, r, n, o, a) {
  var i = (n || []).slice(), s = i.length, {
    start: c,
    end: u
  } = t;
  if (a) {
    var l = n[s - 1], d = r(l, s - 1), p = e * (l.coordinate + e * d / 2 - u);
    i[s - 1] = l = at(at({}, l), {}, {
      tickCoord: p > 0 ? l.coordinate - p * e : l.coordinate
    });
    var f = $s(e, l.tickCoord, () => d, c, u);
    f && (u = l.tickCoord - e * (d / 2 + o), i[s - 1] = at(at({}, l), {}, {
      isShow: !0
    }));
  }
  for (var v = a ? s - 1 : s, h = function(w) {
    var x = i[w], S, E = () => (S === void 0 && (S = r(x, w)), S);
    if (w === 0) {
      var O = e * (x.coordinate - e * E() / 2 - c);
      i[w] = x = at(at({}, x), {}, {
        tickCoord: O < 0 ? x.coordinate - O * e : x.coordinate
      });
    } else
      i[w] = x = at(at({}, x), {}, {
        tickCoord: x.coordinate
      });
    var P = $s(e, x.tickCoord, E, c, u);
    P && (c = x.tickCoord + e * (E() / 2 + o), i[w] = at(at({}, x), {}, {
      isShow: !0
    }));
  }, g = 0; g < v; g++)
    h(g);
  return i;
}
function Sm(e, t, r) {
  var {
    tick: n,
    ticks: o,
    viewBox: a,
    minTickGap: i,
    orientation: s,
    interval: c,
    tickFormatter: u,
    unit: l,
    angle: d
  } = e;
  if (!o || !o.length || !n)
    return [];
  if (Q(c) || Lr.isSsr) {
    var p;
    return (p = _G(o, Q(c) ? c : 0)) !== null && p !== void 0 ? p : [];
  }
  var f = [], v = s === "top" || s === "bottom" ? "width" : "height", h = l && v === "width" ? ta(l, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, g = (x, S) => {
    var E = typeof u == "function" ? u(x.value, S) : x.value;
    return v === "width" ? CG(ta(E, {
      fontSize: t,
      letterSpacing: r
    }), h, d) : ta(E, {
      fontSize: t,
      letterSpacing: r
    })[v];
  }, y = o.length >= 2 ? Qe(o[1].coordinate - o[0].coordinate) : 1, w = TG(a, y, v);
  return c === "equidistantPreserveStart" ? kG(y, w, g, o, i) : (c === "preserveStart" || c === "preserveStartEnd" ? f = DG(y, w, g, o, i, c === "preserveStartEnd") : f = IG(y, w, g, o, i), f.filter((x) => x.isShow));
}
var jG = (e) => {
  var {
    ticks: t,
    label: r,
    labelGapWithTick: n = 5,
    // Default gap between label and tick
    tickSize: o = 0,
    tickMargin: a = 0
  } = e, i = 0;
  if (t) {
    Array.from(t).forEach((l) => {
      if (l) {
        var d = l.getBoundingClientRect();
        d.width > i && (i = d.width);
      }
    });
    var s = r ? r.getBoundingClientRect().width : 0, c = o + a, u = i + c + s + (r ? n : 0);
    return Math.round(u);
  }
  return 0;
}, LG = ["axisLine", "width", "height", "className", "hide", "ticks"], $G = ["viewBox"], BG = ["viewBox"];
function jf(e, t) {
  if (e == null) return {};
  var r, n, o = FG(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function FG(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Fn() {
  return Fn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fn.apply(null, arguments);
}
function Cw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cw(Object(r), !0).forEach(function(n) {
      zG(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zG(e, t, r) {
  return (t = UG(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UG(e) {
  var t = WG(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function WG(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Om = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
};
function KG(e) {
  var {
    x: t,
    y: r,
    width: n,
    height: o,
    orientation: a,
    mirror: i,
    axisLine: s,
    otherSvgProps: c
  } = e;
  if (!s)
    return null;
  var u = qe(qe(qe({}, c), ht(s)), {}, {
    fill: "none"
  });
  if (a === "top" || a === "bottom") {
    var l = +(a === "top" && !i || a === "bottom" && i);
    u = qe(qe({}, u), {}, {
      x1: t,
      y1: r + l * o,
      x2: t + n,
      y2: r + l * o
    });
  } else {
    var d = +(a === "left" && !i || a === "right" && i);
    u = qe(qe({}, u), {}, {
      x1: t + d * n,
      y1: r,
      x2: t + d * n,
      y2: r + o
    });
  }
  return /* @__PURE__ */ m.createElement("line", Fn({}, u, {
    className: pe("recharts-cartesian-axis-line", In(s, "className"))
  }));
}
function VG(e, t, r, n, o, a, i, s, c) {
  var u, l, d, p, f, v, h = s ? -1 : 1, g = e.tickSize || i, y = Q(e.tickCoord) ? e.tickCoord : e.coordinate;
  switch (a) {
    case "top":
      u = l = e.coordinate, p = r + +!s * o, d = p - h * g, v = d - h * c, f = y;
      break;
    case "left":
      d = p = e.coordinate, l = t + +!s * n, u = l - h * g, f = u - h * c, v = y;
      break;
    case "right":
      d = p = e.coordinate, l = t + +s * n, u = l + h * g, f = u + h * c, v = y;
      break;
    default:
      u = l = e.coordinate, p = r + +s * o, d = p + h * g, v = d + h * c, f = y;
      break;
  }
  return {
    line: {
      x1: u,
      y1: d,
      x2: l,
      y2: p
    },
    tick: {
      x: f,
      y: v
    }
  };
}
function qG(e, t) {
  switch (e) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function HG(e, t) {
  switch (e) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return t ? "start" : "end";
    default:
      return t ? "end" : "start";
  }
}
function GG(e) {
  var {
    option: t,
    tickProps: r,
    value: n
  } = e, o, a = pe(r.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ m.isValidElement(t))
    o = /* @__PURE__ */ m.cloneElement(t, qe(qe({}, r), {}, {
      className: a
    }));
  else if (typeof t == "function")
    o = t(qe(qe({}, r), {}, {
      className: a
    }));
  else {
    var i = "recharts-cartesian-axis-tick-value";
    typeof t != "boolean" && (i = pe(i, t?.className)), o = /* @__PURE__ */ m.createElement(dl, Fn({}, r, {
      className: i
    }), n);
  }
  return o;
}
function YG(e) {
  var {
    ticks: t = [],
    tick: r,
    tickLine: n,
    stroke: o,
    tickFormatter: a,
    unit: i,
    padding: s,
    tickTextProps: c,
    orientation: u,
    mirror: l,
    x: d,
    y: p,
    width: f,
    height: v,
    tickSize: h,
    tickMargin: g,
    fontSize: y,
    letterSpacing: w,
    getTicksConfig: x,
    events: S
  } = e, E = Sm(qe(qe({}, x), {}, {
    ticks: t
  }), y, w), O = qG(u, l), P = HG(u, l), A = ht(x), _ = Mn(r), N = {};
  typeof n == "object" && (N = n);
  var T = qe(qe({}, A), {}, {
    fill: "none"
  }, N), R = E.map((j, C) => {
    var {
      line: D,
      tick: $
    } = VG(j, d, p, f, v, u, h, l, g), z = qe(qe(qe(qe({
      // @ts-expect-error textAnchor from axisProps is typed as `string` but Text wants type `TextAnchor`
      textAnchor: O,
      verticalAnchor: P
    }, A), {}, {
      // @ts-expect-error customTickProps is contributing unknown props
      stroke: "none",
      // @ts-expect-error customTickProps is contributing unknown props
      fill: o
    }, _), $), {}, {
      index: C,
      payload: j,
      visibleTicksCount: E.length,
      tickFormatter: a,
      padding: s
    }, c);
    return /* @__PURE__ */ m.createElement($e, Fn({
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(j.value, "-").concat(j.coordinate, "-").concat(j.tickCoord)
    }, La(S, j, C)), n && /* @__PURE__ */ m.createElement("line", Fn({}, T, D, {
      className: pe("recharts-cartesian-axis-tick-line", In(n, "className"))
    })), r && /* @__PURE__ */ m.createElement(GG, {
      option: r,
      tickProps: z,
      value: "".concat(typeof a == "function" ? a(j.value, C) : j.value).concat(i || "")
    }));
  });
  return R.length > 0 ? /* @__PURE__ */ m.createElement("g", {
    className: "recharts-cartesian-axis-ticks"
  }, R) : null;
}
var XG = /* @__PURE__ */ Fe((e, t) => {
  var {
    axisLine: r,
    width: n,
    height: o,
    className: a,
    hide: i,
    ticks: s
  } = e, c = jf(e, LG), [u, l] = je(""), [d, p] = je(""), f = ye(null);
  Uw(t, () => ({
    getCalculatedWidth: () => {
      var h;
      return jG({
        ticks: f.current,
        label: (h = e.labelRef) === null || h === void 0 ? void 0 : h.current,
        labelGapWithTick: 5,
        tickSize: e.tickSize,
        tickMargin: e.tickMargin
      });
    }
  }));
  var v = he((h) => {
    if (h) {
      var g = h.getElementsByClassName("recharts-cartesian-axis-tick-value");
      f.current = g;
      var y = g[0];
      if (y) {
        var w = window.getComputedStyle(y), x = w.fontSize, S = w.letterSpacing;
        (x !== u || S !== d) && (l(x), p(S));
      }
    }
  }, [u, d]);
  return i || n != null && n <= 0 || o != null && o <= 0 ? null : /* @__PURE__ */ m.createElement($e, {
    className: pe("recharts-cartesian-axis", a),
    ref: v
  }, /* @__PURE__ */ m.createElement(KG, {
    x: e.x,
    y: e.y,
    width: n,
    height: o,
    orientation: e.orientation,
    mirror: e.mirror,
    axisLine: r,
    otherSvgProps: ht(e)
  }), /* @__PURE__ */ m.createElement(YG, {
    ticks: s,
    tick: e.tick,
    tickLine: e.tickLine,
    stroke: e.stroke,
    tickFormatter: e.tickFormatter,
    unit: e.unit,
    padding: e.padding,
    tickTextProps: e.tickTextProps,
    orientation: e.orientation,
    mirror: e.mirror,
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    tickSize: e.tickSize,
    tickMargin: e.tickMargin,
    fontSize: u,
    letterSpacing: d,
    getTicksConfig: e,
    events: c
  }), /* @__PURE__ */ m.createElement(Qq, {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height
  }, /* @__PURE__ */ m.createElement(lH, {
    label: e.label,
    labelRef: e.labelRef
  }), e.children));
}), ZG = /* @__PURE__ */ m.memo(XG, (e, t) => {
  var {
    viewBox: r
  } = e, n = jf(e, $G), {
    viewBox: o
  } = t, a = jf(t, BG);
  return mo(r, o) && mo(n, a);
}), Pm = /* @__PURE__ */ m.forwardRef((e, t) => {
  var r = Ge(e, Om);
  return /* @__PURE__ */ m.createElement(ZG, Fn({}, r, {
    ref: t
  }));
});
Pm.displayName = "CartesianAxis";
var JG = ["x1", "y1", "x2", "y2", "key"], QG = ["offset"], e9 = ["xAxisId", "yAxisId"], t9 = ["xAxisId", "yAxisId"];
function Tw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function it(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tw(Object(r), !0).forEach(function(n) {
      r9(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function r9(e, t, r) {
  return (t = n9(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function n9(e) {
  var t = o9(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function o9(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wn() {
  return wn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, wn.apply(null, arguments);
}
function Bs(e, t) {
  if (e == null) return {};
  var r, n, o = a9(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function a9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var i9 = (e) => {
  var {
    fill: t
  } = e;
  if (!t || t === "none")
    return null;
  var {
    fillOpacity: r,
    x: n,
    y: o,
    width: a,
    height: i,
    ry: s
  } = e;
  return /* @__PURE__ */ m.createElement("rect", {
    x: n,
    y: o,
    ry: s,
    width: a,
    height: i,
    stroke: "none",
    fill: t,
    fillOpacity: r,
    className: "recharts-cartesian-grid-bg"
  });
};
function ST(e, t) {
  var r;
  if (/* @__PURE__ */ m.isValidElement(e))
    r = /* @__PURE__ */ m.cloneElement(e, t);
  else if (typeof e == "function")
    r = e(t);
  else {
    var {
      x1: n,
      y1: o,
      x2: a,
      y2: i,
      key: s
    } = t, c = Bs(t, JG), u = ht(c), {
      offset: l
    } = u, d = Bs(u, QG);
    r = /* @__PURE__ */ m.createElement("line", wn({}, d, {
      x1: n,
      y1: o,
      x2: a,
      y2: i,
      fill: "none",
      key: s
    }));
  }
  return r;
}
function s9(e) {
  var {
    x: t,
    width: r,
    horizontal: n = !0,
    horizontalPoints: o
  } = e;
  if (!n || !o || !o.length)
    return null;
  var {
    xAxisId: a,
    yAxisId: i
  } = e, s = Bs(e, e9), c = o.map((u, l) => {
    var d = it(it({}, s), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(l),
      index: l
    });
    return ST(n, d);
  });
  return /* @__PURE__ */ m.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, c);
}
function c9(e) {
  var {
    y: t,
    height: r,
    vertical: n = !0,
    verticalPoints: o
  } = e;
  if (!n || !o || !o.length)
    return null;
  var {
    xAxisId: a,
    yAxisId: i
  } = e, s = Bs(e, t9), c = o.map((u, l) => {
    var d = it(it({}, s), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(l),
      index: l
    });
    return ST(n, d);
  });
  return /* @__PURE__ */ m.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, c);
}
function l9(e) {
  var {
    horizontalFill: t,
    fillOpacity: r,
    x: n,
    y: o,
    width: a,
    height: i,
    horizontalPoints: s,
    horizontal: c = !0
  } = e;
  if (!c || !t || !t.length)
    return null;
  var u = s.map((d) => Math.round(d + o - o)).sort((d, p) => d - p);
  o !== u[0] && u.unshift(0);
  var l = u.map((d, p) => {
    var f = !u[p + 1], v = f ? o + i - d : u[p + 1] - d;
    if (v <= 0)
      return null;
    var h = p % t.length;
    return /* @__PURE__ */ m.createElement("rect", {
      key: "react-".concat(p),
      y: d,
      x: n,
      height: v,
      width: a,
      stroke: "none",
      fill: t[h],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ m.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, l);
}
function u9(e) {
  var {
    vertical: t = !0,
    verticalFill: r,
    fillOpacity: n,
    x: o,
    y: a,
    width: i,
    height: s,
    verticalPoints: c
  } = e;
  if (!t || !r || !r.length)
    return null;
  var u = c.map((d) => Math.round(d + o - o)).sort((d, p) => d - p);
  o !== u[0] && u.unshift(0);
  var l = u.map((d, p) => {
    var f = !u[p + 1], v = f ? o + i - d : u[p + 1] - d;
    if (v <= 0)
      return null;
    var h = p % r.length;
    return /* @__PURE__ */ m.createElement("rect", {
      key: "react-".concat(p),
      x: d,
      y: a,
      width: v,
      height: s,
      stroke: "none",
      fill: r[h],
      fillOpacity: n,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ m.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, l);
}
var d9 = (e, t) => {
  var {
    xAxis: r,
    width: n,
    height: o,
    offset: a
  } = e;
  return b1(Sm(it(it(it({}, Om), r), {}, {
    ticks: w1(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: o
    }
  })), a.left, a.left + a.width, t);
}, f9 = (e, t) => {
  var {
    yAxis: r,
    width: n,
    height: o,
    offset: a
  } = e;
  return b1(Sm(it(it(it({}, Om), r), {}, {
    ticks: w1(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: o
    }
  })), a.top, a.top + a.height, t);
}, p9 = {
  horizontal: !0,
  vertical: !0,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0
};
function wl(e) {
  var t = Jp(), r = Qp(), n = T1(), o = it(it({}, Ge(e, p9)), {}, {
    x: Q(e.x) ? e.x : n.left,
    y: Q(e.y) ? e.y : n.top,
    width: Q(e.width) ? e.width : n.width,
    height: Q(e.height) ? e.height : n.height
  }), {
    xAxisId: a,
    yAxisId: i,
    x: s,
    y: c,
    width: u,
    height: l,
    syncWithTicks: d,
    horizontalValues: p,
    verticalValues: f
  } = o, v = ot(), h = ee((_) => Ob(_, "xAxis", a, v)), g = ee((_) => Ob(_, "yAxis", i, v));
  if (!Q(u) || u <= 0 || !Q(l) || l <= 0 || !Q(s) || s !== +s || !Q(c) || c !== +c)
    return null;
  var y = o.verticalCoordinatesGenerator || d9, w = o.horizontalCoordinatesGenerator || f9, {
    horizontalPoints: x,
    verticalPoints: S
  } = o;
  if ((!x || !x.length) && typeof w == "function") {
    var E = p && p.length, O = w({
      yAxis: g ? it(it({}, g), {}, {
        ticks: E ? p : g.ticks
      }) : void 0,
      width: t,
      height: r,
      offset: n
    }, E ? !0 : d);
    gs(Array.isArray(O), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof O, "]")), Array.isArray(O) && (x = O);
  }
  if ((!S || !S.length) && typeof y == "function") {
    var P = f && f.length, A = y({
      xAxis: h ? it(it({}, h), {}, {
        ticks: P ? f : h.ticks
      }) : void 0,
      width: t,
      height: r,
      offset: n
    }, P ? !0 : d);
    gs(Array.isArray(A), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof A, "]")), Array.isArray(A) && (S = A);
  }
  return /* @__PURE__ */ m.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ m.createElement(i9, {
    fill: o.fill,
    fillOpacity: o.fillOpacity,
    x: o.x,
    y: o.y,
    width: o.width,
    height: o.height,
    ry: o.ry
  }), /* @__PURE__ */ m.createElement(l9, wn({}, o, {
    horizontalPoints: x
  })), /* @__PURE__ */ m.createElement(u9, wn({}, o, {
    verticalPoints: S
  })), /* @__PURE__ */ m.createElement(s9, wn({}, o, {
    offset: n,
    horizontalPoints: x,
    xAxis: h,
    yAxis: g
  })), /* @__PURE__ */ m.createElement(c9, wn({}, o, {
    offset: n,
    verticalPoints: S,
    xAxis: h,
    yAxis: g
  })));
}
wl.displayName = "CartesianGrid";
var OT = (e, t, r, n) => vr(e, "xAxis", t, n), PT = (e, t, r, n) => mr(e, "xAxis", t, n), AT = (e, t, r, n) => vr(e, "yAxis", r, n), CT = (e, t, r, n) => mr(e, "yAxis", r, n), h9 = k([fe, OT, AT, PT, CT], (e, t, r, n, o) => yr(e, "xAxis") ? Ln(t, n, !1) : Ln(r, o, !1)), m9 = (e, t, r, n, o) => o;
function v9(e) {
  return e.type === "line";
}
var g9 = k([Ja, m9], (e, t) => e.filter(v9).find((r) => r.id === t)), y9 = k([fe, OT, AT, PT, CT, g9, h9, Ga], (e, t, r, n, o, a, i, s) => {
  var {
    chartData: c,
    dataStartIndex: u,
    dataEndIndex: l
  } = s;
  if (!(a == null || t == null || r == null || n == null || o == null || n.length === 0 || o.length === 0 || i == null)) {
    var {
      dataKey: d,
      data: p
    } = a, f;
    if (p != null && p.length > 0 ? f = p : f = c?.slice(u, l + 1), f != null)
      return F9({
        layout: e,
        xAxis: t,
        yAxis: r,
        xAxisTicks: n,
        yAxisTicks: o,
        dataKey: d,
        bandSize: i,
        displayedData: f
      });
  }
});
function TT(e) {
  var t = Mn(e), r = 3, n = 2;
  if (t != null) {
    var {
      r: o,
      strokeWidth: a
    } = t, i = Number(o), s = Number(a);
    return (Number.isNaN(i) || i < 0) && (i = r), (Number.isNaN(s) || s < 0) && (s = n), {
      r: i,
      strokeWidth: s
    };
  }
  return {
    r,
    strokeWidth: n
  };
}
var b9 = ["id"], w9 = ["type", "layout", "connectNulls", "needClip"], x9 = ["activeDot", "animateNewValues", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "hide", "isAnimationActive", "label", "legendType", "xAxisId", "yAxisId", "id"];
function _w(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _t(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _w(Object(r), !0).forEach(function(n) {
      E9(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _w(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function E9(e, t, r) {
  return (t = S9(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function S9(e) {
  var t = O9(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function O9(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Am(e, t) {
  if (e == null) return {};
  var r, n, o = P9(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function P9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function zn() {
  return zn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zn.apply(null, arguments);
}
var A9 = (e) => {
  var {
    dataKey: t,
    name: r,
    stroke: n,
    legendType: o,
    hide: a
  } = e;
  return [{
    inactive: a,
    dataKey: t,
    type: o,
    color: n,
    value: cn(r, t),
    payload: e
  }];
};
function C9(e) {
  var {
    dataKey: t,
    data: r,
    stroke: n,
    strokeWidth: o,
    fill: a,
    name: i,
    hide: s,
    unit: c
  } = e;
  return {
    dataDefinedOnItem: r,
    positions: void 0,
    settings: {
      stroke: n,
      strokeWidth: o,
      fill: a,
      dataKey: t,
      nameKey: void 0,
      name: cn(i, t),
      hide: s,
      type: e.tooltipType,
      color: e.stroke,
      unit: c
    }
  };
}
var _T = (e, t) => "".concat(t, "px ").concat(e - t, "px");
function T9(e, t) {
  for (var r = e.length % 2 !== 0 ? [...e, 0] : e, n = [], o = 0; o < t; ++o)
    n = [...n, ...r];
  return n;
}
var _9 = (e, t, r) => {
  var n = r.reduce((d, p) => d + p);
  if (!n)
    return _T(t, e);
  for (var o = Math.floor(e / n), a = e % n, i = t - e, s = [], c = 0, u = 0; c < r.length; u += r[c], ++c)
    if (u + r[c] > a) {
      s = [...r.slice(0, c), a - u];
      break;
    }
  var l = s.length % 2 === 0 ? [0, i] : [i];
  return [...T9(r, o), ...s, ...l].map((d) => "".concat(d, "px")).join(", ");
};
function k9(e, t) {
  var r;
  if (/* @__PURE__ */ m.isValidElement(e))
    r = /* @__PURE__ */ m.cloneElement(e, t);
  else if (typeof e == "function")
    r = e(t);
  else {
    var n = pe("recharts-line-dot", typeof e != "boolean" ? e.className : "");
    r = /* @__PURE__ */ m.createElement(um, zn({}, t, {
      className: n
    }));
  }
  return r;
}
function N9(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function R9(e) {
  var {
    clipPathId: t,
    points: r,
    props: n
  } = e, {
    dot: o,
    dataKey: a,
    needClip: i
  } = n;
  if (!N9(r, o))
    return null;
  var {
    id: s
  } = n, c = Am(n, b9), u = ml(o), l = ht(c), d = nP(o), p = r.map((v, h) => {
    var g = _t(_t(_t({
      key: "dot-".concat(h),
      r: 3
    }, l), d), {}, {
      index: h,
      cx: v.x,
      cy: v.y,
      dataKey: a,
      value: v.value,
      payload: v.payload,
      // @ts-expect-error we're passing extra property 'points' that the props are not expecting
      points: r
    });
    return k9(o, g);
  }), f = {
    clipPath: i ? "url(#clipPath-".concat(u ? "" : "dots-").concat(t, ")") : void 0
  };
  return /* @__PURE__ */ m.createElement($e, zn({
    className: "recharts-line-dots",
    key: "dots"
  }, f), p);
}
function M9(e) {
  var {
    showLabels: t,
    children: r,
    points: n
  } = e, o = tr(() => n?.map((a) => {
    var i = {
      x: a.x,
      y: a.y,
      width: 0,
      height: 0
    };
    return _t(_t({}, i), {}, {
      value: a.value,
      payload: a.payload,
      viewBox: i,
      /*
       * Line is not passing parentViewBox to the LabelList so the labels can escape - looks like a bug, should we pass parentViewBox?
       * Or should this just be the root chart viewBox?
       */
      parentViewBox: void 0,
      fill: void 0
    });
  }), [n]);
  return /* @__PURE__ */ m.createElement(lm, {
    value: t ? o : null
  }, r);
}
function kw(e) {
  var {
    clipPathId: t,
    pathRef: r,
    points: n,
    strokeDasharray: o,
    props: a
  } = e, {
    type: i,
    layout: s,
    connectNulls: c,
    needClip: u
  } = a, l = Am(a, w9), d = _t(_t({}, mt(l)), {}, {
    fill: "none",
    className: "recharts-line-curve",
    clipPath: u ? "url(#clipPath-".concat(t, ")") : void 0,
    points: n,
    type: i,
    layout: s,
    connectNulls: c,
    strokeDasharray: o ?? a.strokeDasharray
  });
  return /* @__PURE__ */ m.createElement(m.Fragment, null, n?.length > 1 && /* @__PURE__ */ m.createElement(no, zn({}, d, {
    pathRef: r
  })), /* @__PURE__ */ m.createElement(R9, {
    points: n,
    clipPathId: t,
    props: a
  }));
}
function I9(e) {
  try {
    return e && e.getTotalLength && e.getTotalLength() || 0;
  } catch {
    return 0;
  }
}
function D9(e) {
  var {
    clipPathId: t,
    props: r,
    pathRef: n,
    previousPointsRef: o,
    longestAnimatedLengthRef: a
  } = e, {
    points: i,
    strokeDasharray: s,
    isAnimationActive: c,
    animationBegin: u,
    animationDuration: l,
    animationEasing: d,
    animateNewValues: p,
    width: f,
    height: v,
    onAnimationEnd: h,
    onAnimationStart: g
  } = r, y = o.current, w = To(r, "recharts-line-"), [x, S] = je(!1), E = !x, O = he(() => {
    typeof h == "function" && h(), S(!1);
  }, [h]), P = he(() => {
    typeof g == "function" && g(), S(!0);
  }, [g]), A = I9(n.current), _ = a.current;
  return /* @__PURE__ */ m.createElement(M9, {
    points: i,
    showLabels: E
  }, r.children, /* @__PURE__ */ m.createElement(Co, {
    animationId: w,
    begin: u,
    duration: l,
    isActive: c,
    easing: d,
    onAnimationEnd: O,
    onAnimationStart: P,
    key: w
  }, (N) => {
    var T = Ee(_, A + _, N), R = Math.min(T, A), j;
    if (c)
      if (s) {
        var C = "".concat(s).split(/[,\s]+/gim).map((z) => parseFloat(z));
        j = _9(R, A, C);
      } else
        j = _T(A, R);
    else
      j = s == null ? void 0 : String(s);
    if (y) {
      var D = y.length / i.length, $ = N === 1 ? i : i.map((z, I) => {
        var F = Math.floor(I * D);
        if (y[F]) {
          var oe = y[F];
          return _t(_t({}, z), {}, {
            x: Ee(oe.x, z.x, N),
            y: Ee(oe.y, z.y, N)
          });
        }
        return p ? _t(_t({}, z), {}, {
          x: Ee(f * 2, z.x, N),
          y: Ee(v / 2, z.y, N)
        }) : _t(_t({}, z), {}, {
          x: z.x,
          y: z.y
        });
      });
      return o.current = $, /* @__PURE__ */ m.createElement(kw, {
        props: r,
        points: $,
        clipPathId: t,
        pathRef: n,
        strokeDasharray: j
      });
    }
    return N > 0 && A > 0 && (o.current = i, a.current = R), /* @__PURE__ */ m.createElement(kw, {
      props: r,
      points: i,
      clipPathId: t,
      pathRef: n,
      strokeDasharray: j
    });
  }), /* @__PURE__ */ m.createElement(fl, {
    label: r.label
  }));
}
function j9(e) {
  var {
    clipPathId: t,
    props: r
  } = e, n = ye(null), o = ye(0), a = ye(null);
  return /* @__PURE__ */ m.createElement(D9, {
    props: r,
    clipPathId: t,
    previousPointsRef: n,
    longestAnimatedLengthRef: o,
    pathRef: a
  });
}
var L9 = (e, t) => ({
  x: e.x,
  y: e.y,
  value: e.value,
  // @ts-expect-error getValueByDataKey does not validate the output type
  errorVal: Se(e.payload, t)
});
class $9 extends o_ {
  render() {
    var {
      hide: t,
      dot: r,
      points: n,
      className: o,
      xAxisId: a,
      yAxisId: i,
      top: s,
      left: c,
      width: u,
      height: l,
      id: d,
      needClip: p
    } = this.props;
    if (t)
      return null;
    var f = pe("recharts-line", o), v = d, {
      r: h,
      strokeWidth: g
    } = TT(r), y = ml(r), w = h * 2 + g;
    return /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement($e, {
      className: f
    }, p && /* @__PURE__ */ m.createElement("defs", null, /* @__PURE__ */ m.createElement(xm, {
      clipPathId: v,
      xAxisId: a,
      yAxisId: i
    }), !y && /* @__PURE__ */ m.createElement("clipPath", {
      id: "clipPath-dots-".concat(v)
    }, /* @__PURE__ */ m.createElement("rect", {
      x: c - w / 2,
      y: s - w / 2,
      width: u + w,
      height: l + w
    }))), /* @__PURE__ */ m.createElement(mT, {
      xAxisId: a,
      yAxisId: i,
      data: n,
      dataPointFormatter: L9,
      errorBarOffset: 0
    }, /* @__PURE__ */ m.createElement(j9, {
      props: this.props,
      clipPathId: v
    }))), /* @__PURE__ */ m.createElement(If, {
      activeDot: this.props.activeDot,
      points: n,
      mainColor: this.props.stroke,
      itemDataKey: this.props.dataKey
    }));
  }
}
var kT = {
  activeDot: !0,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  connectNulls: !1,
  dot: !0,
  fill: "#fff",
  hide: !1,
  isAnimationActive: !Lr.isSsr,
  label: !1,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  xAxisId: 0,
  yAxisId: 0
};
function B9(e) {
  var t = Ge(e, kT), {
    activeDot: r,
    animateNewValues: n,
    animationBegin: o,
    animationDuration: a,
    animationEasing: i,
    connectNulls: s,
    dot: c,
    hide: u,
    isAnimationActive: l,
    label: d,
    legendType: p,
    xAxisId: f,
    yAxisId: v,
    id: h
  } = t, g = Am(t, x9), {
    needClip: y
  } = bl(f, v), w = yl(), x = Wa(), S = ot(), E = ee((N) => y9(N, f, v, S, h));
  if (x !== "horizontal" && x !== "vertical" || E == null || w == null)
    return null;
  var {
    height: O,
    width: P,
    x: A,
    y: _
  } = w;
  return /* @__PURE__ */ m.createElement($9, zn({}, g, {
    id: h,
    connectNulls: s,
    dot: c,
    activeDot: r,
    animateNewValues: n,
    animationBegin: o,
    animationDuration: a,
    animationEasing: i,
    isAnimationActive: l,
    hide: u,
    label: d,
    legendType: p,
    xAxisId: f,
    yAxisId: v,
    points: E,
    layout: x,
    height: O,
    width: P,
    left: A,
    top: _,
    needClip: y
  }));
}
function F9(e) {
  var {
    layout: t,
    xAxis: r,
    yAxis: n,
    xAxisTicks: o,
    yAxisTicks: a,
    dataKey: i,
    bandSize: s,
    displayedData: c
  } = e;
  return c.map((u, l) => {
    var d = Se(u, i);
    if (t === "horizontal") {
      var p = vs({
        axis: r,
        ticks: o,
        bandSize: s,
        entry: u,
        index: l
      }), f = Ce(d) ? null : n.scale(d);
      return {
        x: p,
        y: f,
        value: d,
        payload: u
      };
    }
    var v = Ce(d) ? null : r.scale(d), h = vs({
      axis: n,
      ticks: a,
      bandSize: s,
      entry: u,
      index: l
    });
    return v == null || h == null ? null : {
      x: v,
      y: h,
      value: d,
      payload: u
    };
  }).filter(Boolean);
}
function z9(e) {
  var t = Ge(e, kT), r = ot();
  return /* @__PURE__ */ m.createElement(gl, {
    id: t.id,
    type: "line"
  }, (n) => /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(gm, {
    legendPayload: A9(t)
  }), /* @__PURE__ */ m.createElement(vl, {
    fn: C9,
    args: t
  }), /* @__PURE__ */ m.createElement(ym, {
    type: "line",
    id: n,
    data: t.data,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    dataKey: t.dataKey,
    hide: t.hide,
    isPanorama: r
  }), /* @__PURE__ */ m.createElement(B9, zn({}, t, {
    id: n
  }))));
}
var NT = /* @__PURE__ */ m.memo(z9);
NT.displayName = "Line";
var RT = (e, t, r, n) => vr(e, "xAxis", t, n), MT = (e, t, r, n) => mr(e, "xAxis", t, n), IT = (e, t, r, n) => vr(e, "yAxis", r, n), DT = (e, t, r, n) => mr(e, "yAxis", r, n), U9 = k([fe, RT, IT, MT, DT], (e, t, r, n, o) => yr(e, "xAxis") ? Ln(t, n, !1) : Ln(r, o, !1)), W9 = (e, t, r, n, o) => o, jT = k([Ja, W9], (e, t) => e.filter((r) => r.type === "area").find((r) => r.id === t)), K9 = (e, t, r, n, o) => {
  var a, i = jT(e, t, r, n, o);
  if (i != null) {
    var s = fe(e), c = yr(s, "xAxis"), u;
    if (c ? u = ba(e, "yAxis", r, n) : u = ba(e, "xAxis", t, n), u != null) {
      var {
        stackId: l
      } = i, d = el(i);
      if (!(l == null || d == null)) {
        var p = (a = u[l]) === null || a === void 0 ? void 0 : a.stackedData;
        return p?.find((f) => f.key === d);
      }
    }
  }
}, V9 = k([fe, RT, IT, MT, DT, K9, Ga, U9, jT], (e, t, r, n, o, a, i, s, c) => {
  var {
    chartData: u,
    dataStartIndex: l,
    dataEndIndex: d
  } = i;
  if (!(c == null || e !== "horizontal" && e !== "vertical" || t == null || r == null || n == null || o == null || n.length === 0 || o.length === 0 || s == null)) {
    var {
      data: p
    } = c, f;
    if (p && p.length > 0 ? f = p : f = u?.slice(l, d + 1), f != null) {
      var v = void 0;
      return fY({
        layout: e,
        xAxis: t,
        yAxis: r,
        xAxisTicks: n,
        yAxisTicks: o,
        dataStartIndex: l,
        areaSettings: c,
        stackedData: a,
        displayedData: f,
        chartBaseValue: v,
        bandSize: s
      });
    }
  }
}), q9 = ["id"], H9 = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function LT(e, t) {
  if (e == null) return {};
  var r, n, o = G9(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function G9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Nw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Or(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Nw(Object(r), !0).forEach(function(n) {
      Y9(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Nw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Y9(e, t, r) {
  return (t = X9(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function X9(e) {
  var t = Z9(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Z9(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Cr() {
  return Cr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Cr.apply(null, arguments);
}
function Fs(e, t) {
  return e && e !== "none" ? e : t;
}
var J9 = (e) => {
  var {
    dataKey: t,
    name: r,
    stroke: n,
    fill: o,
    legendType: a,
    hide: i
  } = e;
  return [{
    inactive: i,
    dataKey: t,
    type: a,
    color: Fs(n, o),
    value: cn(r, t),
    payload: e
  }];
};
function Q9(e) {
  var {
    dataKey: t,
    data: r,
    stroke: n,
    strokeWidth: o,
    fill: a,
    name: i,
    hide: s,
    unit: c
  } = e;
  return {
    dataDefinedOnItem: r,
    positions: void 0,
    settings: {
      stroke: n,
      strokeWidth: o,
      fill: a,
      dataKey: t,
      nameKey: void 0,
      name: cn(i, t),
      hide: s,
      type: e.tooltipType,
      color: Fs(n, a),
      unit: c
    }
  };
}
var eY = (e, t) => {
  var r;
  if (/* @__PURE__ */ m.isValidElement(e))
    r = /* @__PURE__ */ m.cloneElement(e, t);
  else if (typeof e == "function")
    r = e(t);
  else {
    var n = pe("recharts-area-dot", typeof e != "boolean" ? e.className : "");
    r = /* @__PURE__ */ m.createElement(um, Cr({}, t, {
      className: n
    }));
  }
  return r;
};
function tY(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function rY(e) {
  var {
    clipPathId: t,
    points: r,
    props: n
  } = e, {
    needClip: o,
    dot: a,
    dataKey: i
  } = n;
  if (!tY(r, a))
    return null;
  var s = ml(a), c = ht(n), u = nP(a), l = r.map((p, f) => {
    var v = Or(Or(Or({
      key: "dot-".concat(f),
      r: 3
    }, c), u), {}, {
      index: f,
      cx: p.x,
      cy: p.y,
      dataKey: i,
      value: p.value,
      payload: p.payload,
      // @ts-expect-error we're passing extra property 'points' that the props are not expecting
      points: r
    });
    return eY(a, v);
  }), d = {
    clipPath: o ? "url(#clipPath-".concat(s ? "" : "dots-").concat(t, ")") : void 0
  };
  return /* @__PURE__ */ m.createElement($e, Cr({
    className: "recharts-area-dots"
  }, d), l);
}
function nY(e) {
  var {
    showLabels: t,
    children: r,
    points: n
  } = e, o = n.map((a) => {
    var i = {
      x: a.x,
      y: a.y,
      width: 0,
      height: 0
    };
    return Or(Or({}, i), {}, {
      value: a.value,
      payload: a.payload,
      parentViewBox: void 0,
      viewBox: i,
      fill: void 0
    });
  });
  return /* @__PURE__ */ m.createElement(lm, {
    value: t ? o : null
  }, r);
}
function Rw(e) {
  var {
    points: t,
    baseLine: r,
    needClip: n,
    clipPathId: o,
    props: a
  } = e, {
    layout: i,
    type: s,
    stroke: c,
    connectNulls: u,
    isRange: l
  } = a, {
    id: d
  } = a, p = LT(a, q9), f = ht(p);
  return /* @__PURE__ */ m.createElement(m.Fragment, null, t?.length > 1 && /* @__PURE__ */ m.createElement($e, {
    clipPath: n ? "url(#clipPath-".concat(o, ")") : void 0
  }, /* @__PURE__ */ m.createElement(no, Cr({}, f, {
    id: d,
    points: t,
    connectNulls: u,
    type: s,
    baseLine: r,
    layout: i,
    stroke: "none",
    className: "recharts-area-area"
  })), c !== "none" && /* @__PURE__ */ m.createElement(no, Cr({}, f, {
    className: "recharts-area-curve",
    layout: i,
    type: s,
    connectNulls: u,
    fill: "none",
    points: t
  })), c !== "none" && l && /* @__PURE__ */ m.createElement(no, Cr({}, f, {
    className: "recharts-area-curve",
    layout: i,
    type: s,
    connectNulls: u,
    fill: "none",
    points: r
  }))), /* @__PURE__ */ m.createElement(rY, {
    points: t,
    props: p,
    clipPathId: o
  }));
}
function oY(e) {
  var {
    alpha: t,
    baseLine: r,
    points: n,
    strokeWidth: o
  } = e, a = n[0].y, i = n[n.length - 1].y;
  if (!We(a) || !We(i))
    return null;
  var s = t * Math.abs(a - i), c = Math.max(...n.map((u) => u.x || 0));
  return Q(r) ? c = Math.max(r, c) : r && Array.isArray(r) && r.length && (c = Math.max(...r.map((u) => u.x || 0), c)), Q(c) ? /* @__PURE__ */ m.createElement("rect", {
    x: 0,
    y: a < i ? a : a - s,
    width: c + (o ? parseInt("".concat(o), 10) : 1),
    height: Math.floor(s)
  }) : null;
}
function aY(e) {
  var {
    alpha: t,
    baseLine: r,
    points: n,
    strokeWidth: o
  } = e, a = n[0].x, i = n[n.length - 1].x;
  if (!We(a) || !We(i))
    return null;
  var s = t * Math.abs(a - i), c = Math.max(...n.map((u) => u.y || 0));
  return Q(r) ? c = Math.max(r, c) : r && Array.isArray(r) && r.length && (c = Math.max(...r.map((u) => u.y || 0), c)), Q(c) ? /* @__PURE__ */ m.createElement("rect", {
    x: a < i ? a : a - s,
    y: 0,
    width: s,
    height: Math.floor(c + (o ? parseInt("".concat(o), 10) : 1))
  }) : null;
}
function iY(e) {
  var {
    alpha: t,
    layout: r,
    points: n,
    baseLine: o,
    strokeWidth: a
  } = e;
  return r === "vertical" ? /* @__PURE__ */ m.createElement(oY, {
    alpha: t,
    points: n,
    baseLine: o,
    strokeWidth: a
  }) : /* @__PURE__ */ m.createElement(aY, {
    alpha: t,
    points: n,
    baseLine: o,
    strokeWidth: a
  });
}
function sY(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: n,
    previousPointsRef: o,
    previousBaselineRef: a
  } = e, {
    points: i,
    baseLine: s,
    isAnimationActive: c,
    animationBegin: u,
    animationDuration: l,
    animationEasing: d,
    onAnimationStart: p,
    onAnimationEnd: f
  } = n, v = To(n, "recharts-area-"), [h, g] = je(!1), y = !h, w = he(() => {
    typeof f == "function" && f(), g(!1);
  }, [f]), x = he(() => {
    typeof p == "function" && p(), g(!0);
  }, [p]), S = o.current, E = a.current;
  return /* @__PURE__ */ m.createElement(nY, {
    showLabels: y,
    points: i
  }, n.children, /* @__PURE__ */ m.createElement(Co, {
    animationId: v,
    begin: u,
    duration: l,
    isActive: c,
    easing: d,
    onAnimationEnd: w,
    onAnimationStart: x,
    key: v
  }, (O) => {
    if (S) {
      var P = S.length / i.length, A = (
        /*
         * Here it is important that at the very end of the animation, on the last frame,
         * we render the original points without any interpolation.
         * This is needed because the code above is checking for reference equality to decide if the animation should run
         * and if we create a new array instance (even if the numbers were the same)
         * then we would break animations.
         */
        O === 1 ? i : i.map((N, T) => {
          var R = Math.floor(T * P);
          if (S[R]) {
            var j = S[R];
            return Or(Or({}, N), {}, {
              x: Ee(j.x, N.x, O),
              y: Ee(j.y, N.y, O)
            });
          }
          return N;
        })
      ), _;
      return Q(s) ? _ = Ee(E, s, O) : Ce(s) || Mt(s) ? _ = Ee(E, 0, O) : _ = s.map((N, T) => {
        var R = Math.floor(T * P);
        if (Array.isArray(E) && E[R]) {
          var j = E[R];
          return Or(Or({}, N), {}, {
            x: Ee(j.x, N.x, O),
            y: Ee(j.y, N.y, O)
          });
        }
        return N;
      }), O > 0 && (o.current = A, a.current = _), /* @__PURE__ */ m.createElement(Rw, {
        points: A,
        baseLine: _,
        needClip: t,
        clipPathId: r,
        props: n
      });
    }
    return O > 0 && (o.current = i, a.current = s), /* @__PURE__ */ m.createElement($e, null, c && /* @__PURE__ */ m.createElement("defs", null, /* @__PURE__ */ m.createElement("clipPath", {
      id: "animationClipPath-".concat(r)
    }, /* @__PURE__ */ m.createElement(iY, {
      alpha: O,
      points: i,
      baseLine: s,
      layout: n.layout,
      strokeWidth: n.strokeWidth
    }))), /* @__PURE__ */ m.createElement($e, {
      clipPath: "url(#animationClipPath-".concat(r, ")")
    }, /* @__PURE__ */ m.createElement(Rw, {
      points: i,
      baseLine: s,
      needClip: t,
      clipPathId: r,
      props: n
    })));
  }), /* @__PURE__ */ m.createElement(fl, {
    label: n.label
  }));
}
function cY(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: n
  } = e, o = ye(null), a = ye();
  return /* @__PURE__ */ m.createElement(sY, {
    needClip: t,
    clipPathId: r,
    props: n,
    previousPointsRef: o,
    previousBaselineRef: a
  });
}
class lY extends xa {
  render() {
    var {
      hide: t,
      dot: r,
      points: n,
      className: o,
      top: a,
      left: i,
      needClip: s,
      xAxisId: c,
      yAxisId: u,
      width: l,
      height: d,
      id: p,
      baseLine: f
    } = this.props;
    if (t)
      return null;
    var v = pe("recharts-area", o), h = p, {
      r: g,
      strokeWidth: y
    } = TT(r), w = ml(r), x = g * 2 + y;
    return /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement($e, {
      className: v
    }, s && /* @__PURE__ */ m.createElement("defs", null, /* @__PURE__ */ m.createElement(xm, {
      clipPathId: h,
      xAxisId: c,
      yAxisId: u
    }), !w && /* @__PURE__ */ m.createElement("clipPath", {
      id: "clipPath-dots-".concat(h)
    }, /* @__PURE__ */ m.createElement("rect", {
      x: i - x / 2,
      y: a - x / 2,
      width: l + x,
      height: d + x
    }))), /* @__PURE__ */ m.createElement(cY, {
      needClip: s,
      clipPathId: h,
      props: this.props
    })), /* @__PURE__ */ m.createElement(If, {
      points: n,
      mainColor: Fs(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot
    }), this.props.isRange && Array.isArray(f) && /* @__PURE__ */ m.createElement(If, {
      points: f,
      mainColor: Fs(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot
    }));
  }
}
var $T = {
  activeDot: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  connectNulls: !1,
  dot: !1,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: !1,
  isAnimationActive: !Lr.isSsr,
  legendType: "line",
  stroke: "#3182bd",
  xAxisId: 0,
  yAxisId: 0
};
function uY(e) {
  var t, r = Ge(e, $T), {
    activeDot: n,
    animationBegin: o,
    animationDuration: a,
    animationEasing: i,
    connectNulls: s,
    dot: c,
    fill: u,
    fillOpacity: l,
    hide: d,
    isAnimationActive: p,
    legendType: f,
    stroke: v,
    xAxisId: h,
    yAxisId: g
  } = r, y = LT(r, H9), w = Wa(), x = BC(), {
    needClip: S
  } = bl(h, g), E = ot(), {
    points: O,
    isRange: P,
    baseLine: A
  } = (t = ee((C) => V9(C, h, g, E, e.id))) !== null && t !== void 0 ? t : {}, _ = yl();
  if (w !== "horizontal" && w !== "vertical" || _ == null || x !== "AreaChart" && x !== "ComposedChart")
    return null;
  var {
    height: N,
    width: T,
    x: R,
    y: j
  } = _;
  return !O || !O.length ? null : /* @__PURE__ */ m.createElement(lY, Cr({}, y, {
    activeDot: n,
    animationBegin: o,
    animationDuration: a,
    animationEasing: i,
    baseLine: A,
    connectNulls: s,
    dot: c,
    fill: u,
    fillOpacity: l,
    height: N,
    hide: d,
    layout: w,
    isAnimationActive: p,
    isRange: P,
    legendType: f,
    needClip: S,
    points: O,
    stroke: v,
    width: T,
    left: R,
    top: j,
    xAxisId: h,
    yAxisId: g
  }));
}
var dY = (e, t, r, n, o) => {
  var a = r ?? t;
  if (Q(a))
    return a;
  var i = e === "horizontal" ? o : n, s = i.scale.domain();
  if (i.type === "number") {
    var c = Math.max(s[0], s[1]), u = Math.min(s[0], s[1]);
    return a === "dataMin" ? u : a === "dataMax" || c < 0 ? c : Math.max(Math.min(s[0], s[1]), 0);
  }
  return a === "dataMin" ? s[0] : a === "dataMax" ? s[1] : s[0];
};
function fY(e) {
  var {
    areaSettings: {
      connectNulls: t,
      baseValue: r,
      dataKey: n
    },
    stackedData: o,
    layout: a,
    chartBaseValue: i,
    xAxis: s,
    yAxis: c,
    displayedData: u,
    dataStartIndex: l,
    xAxisTicks: d,
    yAxisTicks: p,
    bandSize: f
  } = e, v = o && o.length, h = dY(a, i, r, s, c), g = a === "horizontal", y = !1, w = u.map((S, E) => {
    var O;
    v ? O = o[l + E] : (O = Se(S, n), Array.isArray(O) ? y = !0 : O = [h, O]);
    var P = O[1] == null || v && !t && Se(S, n) == null;
    return g ? {
      x: vs({
        axis: s,
        ticks: d,
        bandSize: f,
        entry: S,
        index: E
      }),
      y: P ? null : c.scale(O[1]),
      value: O,
      payload: S
    } : {
      x: P ? null : s.scale(O[1]),
      y: vs({
        axis: c,
        ticks: p,
        bandSize: f,
        entry: S,
        index: E
      }),
      value: O,
      payload: S
    };
  }), x;
  return v || y ? x = w.map((S) => {
    var E = Array.isArray(S.value) ? S.value[0] : null;
    return g ? {
      x: S.x,
      y: E != null && S.y != null ? c.scale(E) : null,
      payload: S.payload
    } : {
      x: E != null ? s.scale(E) : null,
      y: S.y,
      payload: S.payload
    };
  }) : x = g ? c.scale(h) : s.scale(h), {
    points: w,
    baseLine: x,
    isRange: y
  };
}
function pY(e) {
  var t = Ge(e, $T), r = ot();
  return /* @__PURE__ */ m.createElement(gl, {
    id: t.id,
    type: "area"
  }, (n) => /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(gm, {
    legendPayload: J9(t)
  }), /* @__PURE__ */ m.createElement(vl, {
    fn: Q9,
    args: t
  }), /* @__PURE__ */ m.createElement(ym, {
    type: "area",
    id: n,
    data: t.data,
    dataKey: t.dataKey,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    stackId: x1(t.stackId),
    hide: t.hide,
    barSize: void 0,
    baseValue: t.baseValue,
    isPanorama: r,
    connectNulls: t.connectNulls
  }), /* @__PURE__ */ m.createElement(uY, Cr({}, t, {
    id: n
  }))));
}
var BT = /* @__PURE__ */ m.memo(pY);
BT.displayName = "Area";
var hY = ["dangerouslySetInnerHTML", "ticks"], mY = ["id"], vY = ["domain"], gY = ["domain"];
function Lf() {
  return Lf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Lf.apply(null, arguments);
}
function zs(e, t) {
  if (e == null) return {};
  var r, n, o = yY(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function yY(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function bY(e) {
  var t = Re();
  return dr(() => (t(H8(e)), () => {
    t(G8(e));
  }), [e, t]), null;
}
var wY = (e) => {
  var {
    xAxisId: t,
    className: r
  } = e, n = ee(Xp), o = ot(), a = "xAxis", i = ee((g) => jo(g, a, t, o)), s = ee((g) => vC(g, a, t, o)), c = ee((g) => fC(g, t)), u = ee((g) => I5(g, t)), l = ee((g) => HA(g, t));
  if (c == null || u == null || l == null)
    return null;
  var {
    dangerouslySetInnerHTML: d,
    ticks: p
  } = e, f = zs(e, hY), {
    id: v
  } = l, h = zs(l, mY);
  return /* @__PURE__ */ m.createElement(Pm, Lf({}, f, h, {
    scale: i,
    x: u.x,
    y: u.y,
    width: c.width,
    height: c.height,
    className: pe("recharts-".concat(a, " ").concat(a), r),
    viewBox: n,
    ticks: s
  }));
}, xY = {
  allowDataOverflow: Ot.allowDataOverflow,
  allowDecimals: Ot.allowDecimals,
  allowDuplicatedCategory: Ot.allowDuplicatedCategory,
  height: Ot.height,
  hide: !1,
  mirror: Ot.mirror,
  orientation: Ot.orientation,
  padding: Ot.padding,
  reversed: Ot.reversed,
  scale: Ot.scale,
  tickCount: Ot.tickCount,
  type: Ot.type,
  xAxisId: 0
}, EY = (e) => {
  var t, r, n, o, a, i = Ge(e, xY);
  return /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(bY, {
    interval: (t = i.interval) !== null && t !== void 0 ? t : "preserveEnd",
    id: i.xAxisId,
    scale: i.scale,
    type: i.type,
    padding: i.padding,
    allowDataOverflow: i.allowDataOverflow,
    domain: i.domain,
    dataKey: i.dataKey,
    allowDuplicatedCategory: i.allowDuplicatedCategory,
    allowDecimals: i.allowDecimals,
    tickCount: i.tickCount,
    includeHidden: (r = i.includeHidden) !== null && r !== void 0 ? r : !1,
    reversed: i.reversed,
    ticks: i.ticks,
    height: i.height,
    orientation: i.orientation,
    mirror: i.mirror,
    hide: i.hide,
    unit: i.unit,
    name: i.name,
    angle: (n = i.angle) !== null && n !== void 0 ? n : 0,
    minTickGap: (o = i.minTickGap) !== null && o !== void 0 ? o : 5,
    tick: (a = i.tick) !== null && a !== void 0 ? a : !0,
    tickFormatter: i.tickFormatter
  }), /* @__PURE__ */ m.createElement(wY, i));
}, SY = (e, t) => {
  var {
    domain: r
  } = e, n = zs(e, vY), {
    domain: o
  } = t, a = zs(t, gY);
  return mo(n, a) ? Array.isArray(r) && r.length === 2 && Array.isArray(o) && o.length === 2 ? r[0] === o[0] && r[1] === o[1] : mo({
    domain: r
  }, {
    domain: o
  }) : !1;
}, xl = /* @__PURE__ */ m.memo(EY, SY);
xl.displayName = "XAxis";
var OY = ["dangerouslySetInnerHTML", "ticks"], PY = ["id"], AY = ["domain"], CY = ["domain"];
function $f() {
  return $f = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $f.apply(null, arguments);
}
function Us(e, t) {
  if (e == null) return {};
  var r, n, o = TY(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function TY(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function _Y(e) {
  var t = Re();
  return dr(() => (t(Y8(e)), () => {
    t(X8(e));
  }), [e, t]), null;
}
var kY = (e) => {
  var {
    yAxisId: t,
    className: r,
    width: n,
    label: o
  } = e, a = ye(null), i = ye(null), s = ee(Xp), c = ot(), u = Re(), l = "yAxis", d = ee((E) => jo(E, l, t, c)), p = ee((E) => pC(E, t)), f = ee((E) => j5(E, t)), v = ee((E) => vC(E, l, t, c)), h = ee((E) => GA(E, t));
  if (dr(() => {
    if (!(n !== "auto" || !p || cm(o) || /* @__PURE__ */ Kt(o) || h == null)) {
      var E = a.current;
      if (E) {
        var O = E.getCalculatedWidth();
        Math.round(p.width) !== Math.round(O) && u(Z8({
          id: t,
          width: O
        }));
      }
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    v,
    p,
    u,
    o,
    t,
    n,
    h
  ]), p == null || f == null || h == null)
    return null;
  var {
    dangerouslySetInnerHTML: g,
    ticks: y
  } = e, w = Us(e, OY), {
    id: x
  } = h, S = Us(h, PY);
  return /* @__PURE__ */ m.createElement(Pm, $f({}, w, S, {
    ref: a,
    labelRef: i,
    scale: d,
    x: f.x,
    y: f.y,
    tickTextProps: n === "auto" ? {
      width: void 0
    } : {
      width: n
    },
    width: p.width,
    height: p.height,
    className: pe("recharts-".concat(l, " ").concat(l), r),
    viewBox: s,
    ticks: v
  }));
}, NY = {
  allowDataOverflow: Pt.allowDataOverflow,
  allowDecimals: Pt.allowDecimals,
  allowDuplicatedCategory: Pt.allowDuplicatedCategory,
  hide: !1,
  mirror: Pt.mirror,
  orientation: Pt.orientation,
  padding: Pt.padding,
  reversed: Pt.reversed,
  scale: Pt.scale,
  tickCount: Pt.tickCount,
  type: Pt.type,
  width: Pt.width,
  yAxisId: 0
}, RY = (e) => {
  var t, r, n, o, a, i = Ge(e, NY);
  return /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(_Y, {
    interval: (t = i.interval) !== null && t !== void 0 ? t : "preserveEnd",
    id: i.yAxisId,
    scale: i.scale,
    type: i.type,
    domain: i.domain,
    allowDataOverflow: i.allowDataOverflow,
    dataKey: i.dataKey,
    allowDuplicatedCategory: i.allowDuplicatedCategory,
    allowDecimals: i.allowDecimals,
    tickCount: i.tickCount,
    padding: i.padding,
    includeHidden: (r = i.includeHidden) !== null && r !== void 0 ? r : !1,
    reversed: i.reversed,
    ticks: i.ticks,
    width: i.width,
    orientation: i.orientation,
    mirror: i.mirror,
    hide: i.hide,
    unit: i.unit,
    name: i.name,
    angle: (n = i.angle) !== null && n !== void 0 ? n : 0,
    minTickGap: (o = i.minTickGap) !== null && o !== void 0 ? o : 5,
    tick: (a = i.tick) !== null && a !== void 0 ? a : !0,
    tickFormatter: i.tickFormatter
  }), /* @__PURE__ */ m.createElement(kY, i));
}, MY = (e, t) => {
  var {
    domain: r
  } = e, n = Us(e, AY), {
    domain: o
  } = t, a = Us(t, CY);
  return mo(n, a) ? Array.isArray(r) && r.length === 2 && Array.isArray(o) && o.length === 2 ? r[0] === o[0] && r[1] === o[1] : mo({
    domain: r
  }, {
    domain: o
  }) : !1;
}, El = /* @__PURE__ */ m.memo(RY, MY);
El.displayName = "YAxis";
var Di = { exports: {} }, gd = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mw;
function IY() {
  if (Mw) return gd;
  Mw = 1;
  var e = At;
  function t(c, u) {
    return c === u && (c !== 0 || 1 / c === 1 / u) || c !== c && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, o = e.useRef, a = e.useEffect, i = e.useMemo, s = e.useDebugValue;
  return gd.useSyncExternalStoreWithSelector = function(c, u, l, d, p) {
    var f = o(null);
    if (f.current === null) {
      var v = { hasValue: !1, value: null };
      f.current = v;
    } else v = f.current;
    f = i(
      function() {
        function g(E) {
          if (!y) {
            if (y = !0, w = E, E = d(E), p !== void 0 && v.hasValue) {
              var O = v.value;
              if (p(O, E))
                return x = O;
            }
            return x = E;
          }
          if (O = x, r(w, E)) return O;
          var P = d(E);
          return p !== void 0 && p(O, P) ? (w = E, O) : (w = E, x = P);
        }
        var y = !1, w, x, S = l === void 0 ? null : l;
        return [
          function() {
            return g(u());
          },
          S === null ? void 0 : function() {
            return g(S());
          }
        ];
      },
      [u, l, d, p]
    );
    var h = n(c, f[0], f[1]);
    return a(
      function() {
        v.hasValue = !0, v.value = h;
      },
      [h]
    ), s(h), h;
  }, gd;
}
var yd = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Iw;
function DY() {
  return Iw || (Iw = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(c, u) {
      return c === u && (c !== 0 || 1 / c === 1 / u) || c !== c && u !== u;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = At, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, o = t.useRef, a = t.useEffect, i = t.useMemo, s = t.useDebugValue;
    yd.useSyncExternalStoreWithSelector = function(c, u, l, d, p) {
      var f = o(null);
      if (f.current === null) {
        var v = { hasValue: !1, value: null };
        f.current = v;
      } else v = f.current;
      f = i(
        function() {
          function g(E) {
            if (!y) {
              if (y = !0, w = E, E = d(E), p !== void 0 && v.hasValue) {
                var O = v.value;
                if (p(O, E))
                  return x = O;
              }
              return x = E;
            }
            if (O = x, r(w, E))
              return O;
            var P = d(E);
            return p !== void 0 && p(O, P) ? (w = E, O) : (w = E, x = P);
          }
          var y = !1, w, x, S = l === void 0 ? null : l;
          return [
            function() {
              return g(u());
            },
            S === null ? void 0 : function() {
              return g(S());
            }
          ];
        },
        [u, l, d, p]
      );
      var h = n(c, f[0], f[1]);
      return a(
        function() {
          v.hasValue = !0, v.value = h;
        },
        [h]
      ), s(h), h;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), yd;
}
var Dw;
function jY() {
  return Dw || (Dw = 1, process.env.NODE_ENV === "production" ? Di.exports = IY() : Di.exports = DY()), Di.exports;
}
jY();
function LY(e) {
  e();
}
function $Y() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      LY(() => {
        let r = e;
        for (; r; )
          r.callback(), r = r.next;
      });
    },
    get() {
      const r = [];
      let n = e;
      for (; n; )
        r.push(n), n = n.next;
      return r;
    },
    subscribe(r) {
      let n = !0;
      const o = t = {
        callback: r,
        next: null,
        prev: t
      };
      return o.prev ? o.prev.next = o : e = o, function() {
        !n || e === null || (n = !1, o.next ? o.next.prev = o.prev : t = o.prev, o.prev ? o.prev.next = o.next : e = o.next);
      };
    }
  };
}
var jw = {
  notify() {
  },
  get: () => []
};
function BY(e, t) {
  let r, n = jw, o = 0, a = !1;
  function i(h) {
    l();
    const g = n.subscribe(h);
    let y = !1;
    return () => {
      y || (y = !0, g(), d());
    };
  }
  function s() {
    n.notify();
  }
  function c() {
    v.onStateChange && v.onStateChange();
  }
  function u() {
    return a;
  }
  function l() {
    o++, r || (r = e.subscribe(c), n = $Y());
  }
  function d() {
    o--, r && o === 0 && (r(), r = void 0, n.clear(), n = jw);
  }
  function p() {
    a || (a = !0, l());
  }
  function f() {
    a && (a = !1, d());
  }
  const v = {
    addNestedSub: i,
    notifyNestedSubs: s,
    handleChangeWrapper: c,
    isSubscribed: u,
    trySubscribe: p,
    tryUnsubscribe: f,
    getListeners: () => n
  };
  return v;
}
var FY = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", zY = /* @__PURE__ */ FY(), UY = () => typeof navigator < "u" && navigator.product === "ReactNative", WY = /* @__PURE__ */ UY(), KY = () => zY || WY ? m.useLayoutEffect : m.useEffect, VY = /* @__PURE__ */ KY(), qY = /* @__PURE__ */ Symbol.for("react-redux-context"), HY = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function GY() {
  if (!m.createContext) return {};
  const e = HY[qY] ??= /* @__PURE__ */ new Map();
  let t = e.get(m.createContext);
  return t || (t = m.createContext(
    null
  ), process.env.NODE_ENV !== "production" && (t.displayName = "ReactRedux"), e.set(m.createContext, t)), t;
}
var YY = /* @__PURE__ */ GY();
function XY(e) {
  const { children: t, context: r, serverState: n, store: o } = e, a = m.useMemo(() => {
    const c = BY(o), u = {
      store: o,
      subscription: c,
      getServerState: n ? () => n : void 0
    };
    if (process.env.NODE_ENV === "production")
      return u;
    {
      const { identityFunctionCheck: l = "once", stabilityCheck: d = "once" } = e;
      return /* @__PURE__ */ Object.assign(u, {
        stabilityCheck: d,
        identityFunctionCheck: l
      });
    }
  }, [o, n]), i = m.useMemo(() => o.getState(), [o]);
  VY(() => {
    const { subscription: c } = a;
    return c.onStateChange = c.notifyNestedSubs, c.trySubscribe(), i !== o.getState() && c.notifyNestedSubs(), () => {
      c.tryUnsubscribe(), c.onStateChange = void 0;
    };
  }, [a, i]);
  const s = r || YY;
  return /* @__PURE__ */ m.createElement(s.Provider, { value: a }, t);
}
var ZY = XY, JY = (e, t) => t, Cm = k([JY, fe, KA, Xe, MC, zr, FV, He], VV), Tm = (e) => {
  var t = e.currentTarget.getBoundingClientRect(), r = t.width / e.currentTarget.offsetWidth, n = t.height / e.currentTarget.offsetHeight;
  return {
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    chartX: Math.round((e.clientX - t.left) / r),
    chartY: Math.round((e.clientY - t.top) / n)
  };
}, FT = Ht("mouseClick"), zT = za();
zT.startListening({
  actionCreator: FT,
  effect: (e, t) => {
    var r = e.payload, n = Cm(t.getState(), Tm(r));
    n?.activeIndex != null && t.dispatch(Y5({
      activeIndex: n.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: n.activeCoordinate
    }));
  }
});
var Bf = Ht("mouseMove"), UT = za();
UT.startListening({
  actionCreator: Bf,
  effect: (e, t) => {
    var r = e.payload, n = t.getState(), o = Qh(n, n.tooltip.settings.shared), a = Cm(n, Tm(r));
    o === "axis" && (a?.activeIndex != null ? t.dispatch(OC({
      activeIndex: a.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: a.activeCoordinate
    })) : t.dispatch(SC()));
  }
});
var Lw = {
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index"
}, WT = Lt({
  name: "rootProps",
  initialState: Lw,
  reducers: {
    updateOptions: (e, t) => {
      var r;
      e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : Lw.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className;
    }
  }
}), QY = WT.reducer, {
  updateOptions: eX
} = WT.actions, KT = Lt({
  name: "polarOptions",
  initialState: null,
  reducers: {
    updatePolarOptions: (e, t) => t.payload
  }
}), {
  updatePolarOptions: tX
} = KT.actions, rX = KT.reducer, VT = Ht("keyDown"), qT = Ht("focus"), _m = za();
_m.startListening({
  actionCreator: VT,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: o
      } = r.tooltip, a = e.payload;
      if (!(a !== "ArrowRight" && a !== "ArrowLeft" && a !== "Enter")) {
        var i = Number(em(o, $o(r))), s = zr(r);
        if (a === "Enter") {
          var c = Ms(r, "axis", "hover", String(o.index));
          t.dispatch(_f({
            active: !o.active,
            activeIndex: o.index,
            activeDataKey: o.dataKey,
            activeCoordinate: c
          }));
          return;
        }
        var u = F5(r), l = u === "left-to-right" ? 1 : -1, d = a === "ArrowRight" ? 1 : -1, p = i + d * l;
        if (!(s == null || p >= s.length || p < 0)) {
          var f = Ms(r, "axis", "hover", String(p));
          t.dispatch(_f({
            active: !0,
            activeIndex: p.toString(),
            activeDataKey: void 0,
            activeCoordinate: f
          }));
        }
      }
    }
  }
});
_m.startListening({
  actionCreator: qT,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: o
      } = r.tooltip;
      if (!o.active && o.index == null) {
        var a = "0", i = Ms(r, "axis", "hover", String(a));
        t.dispatch(_f({
          activeDataKey: void 0,
          active: !0,
          activeIndex: a,
          activeCoordinate: i
        }));
      }
    }
  }
});
var zt = Ht("externalEvent"), HT = za();
HT.startListening({
  actionCreator: zt,
  effect: (e, t) => {
    if (e.payload.handler != null) {
      var r = t.getState(), n = {
        activeCoordinate: NV(r),
        activeDataKey: LC(r),
        activeIndex: en(r),
        activeLabel: jC(r),
        activeTooltipIndex: en(r),
        isTooltipActive: RV(r)
      };
      e.payload.handler(n, e.payload.reactEvent);
    }
  }
});
var nX = k([Lo], (e) => e.tooltipItemPayloads), oX = k([nX, ti, (e, t, r) => t, (e, t, r) => r], (e, t, r, n) => {
  var o = e.find((s) => s.settings.dataKey === n);
  if (o != null) {
    var {
      positions: a
    } = o;
    if (a != null) {
      var i = t(a, r);
      return i;
    }
  }
}), GT = Ht("touchMove"), YT = za();
YT.startListening({
  actionCreator: GT,
  effect: (e, t) => {
    var r = e.payload, n = t.getState(), o = Qh(n, n.tooltip.settings.shared);
    if (o === "axis") {
      var a = Cm(n, Tm({
        clientX: r.touches[0].clientX,
        clientY: r.touches[0].clientY,
        currentTarget: r.currentTarget
      }));
      a?.activeIndex != null && t.dispatch(OC({
        activeIndex: a.activeIndex,
        activeDataKey: void 0,
        activeCoordinate: a.activeCoordinate
      }));
    } else if (o === "item") {
      var i, s = r.touches[0], c = document.elementFromPoint(s.clientX, s.clientY);
      if (!c || !c.getAttribute)
        return;
      var u = c.getAttribute(S1), l = (i = c.getAttribute(O1)) !== null && i !== void 0 ? i : void 0, d = oX(t.getState(), u, l);
      t.dispatch(EC({
        activeDataKey: l,
        activeIndex: u,
        activeCoordinate: d
      }));
    }
  }
});
var aX = UP({
  brush: gG,
  cartesianAxis: J8,
  chartData: sq,
  errorBars: v6,
  graphicalItems: g8,
  layout: bz,
  legend: PU,
  options: rq,
  polarAxis: kH,
  polarOptions: rX,
  referenceElements: OG,
  rootProps: QY,
  tooltip: X5
}), iX = function(t) {
  return KF({
    reducer: aX,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState: t,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (r) => r({
      serializableCheck: !1
    }).concat([zT.middleware, UT.middleware, _m.middleware, HT.middleware, YT.middleware]),
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (r) => {
      var n = r;
      return typeof r == "function" && (n = r()), n.concat(o1({
        type: "raf"
      }));
    },
    devTools: Lr.devToolsEnabled
  });
};
function XT(e) {
  var {
    preloadedState: t,
    children: r,
    reduxStoreName: n
  } = e, o = ot(), a = ye(null);
  if (o)
    return r;
  a.current == null && (a.current = iX(t));
  var i = Kp;
  return /* @__PURE__ */ m.createElement(ZY, {
    context: i,
    store: a.current
  }, r);
}
function ZT(e) {
  var {
    layout: t,
    margin: r
  } = e, n = Re(), o = ot();
  return Le(() => {
    o || (n(vz(t)), n(mz(r)));
  }, [n, o, t, r]), null;
}
function JT(e) {
  var t = Re();
  return Le(() => {
    t(eX(e));
  }, [t, e]), null;
}
var sX = ["children"];
function cX(e, t) {
  if (e == null) return {};
  var r, n, o = lX(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function lX(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Ws() {
  return Ws = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ws.apply(null, arguments);
}
var uX = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
}, dX = /* @__PURE__ */ Fe((e, t) => {
  var r = Jp(), n = Qp(), o = R1();
  if (!lo(r) || !lo(n))
    return null;
  var {
    children: a,
    otherAttributes: i,
    title: s,
    desc: c
  } = e, u, l;
  return typeof i.tabIndex == "number" ? u = i.tabIndex : u = o ? 0 : void 0, typeof i.role == "string" ? l = i.role : l = o ? "application" : void 0, /* @__PURE__ */ m.createElement(Rp, Ws({}, i, {
    title: s,
    desc: c,
    role: l,
    tabIndex: u,
    width: r,
    height: n,
    style: uX,
    ref: t
  }), a);
}), fX = (e) => {
  var {
    children: t
  } = e, r = ee(zc);
  if (!r)
    return null;
  var {
    width: n,
    height: o,
    y: a,
    x: i
  } = r;
  return /* @__PURE__ */ m.createElement(Rp, {
    width: n,
    height: o,
    x: i,
    y: a
  }, t);
}, $w = /* @__PURE__ */ Fe((e, t) => {
  var {
    children: r
  } = e, n = cX(e, sX), o = ot();
  return o ? /* @__PURE__ */ m.createElement(fX, null, r) : /* @__PURE__ */ m.createElement(dX, Ws({
    ref: t
  }, n), r);
});
function pX() {
  var e = Re(), [t, r] = je(null), n = ee(Hz);
  return Le(() => {
    if (t != null) {
      var o = t.getBoundingClientRect(), a = o.width / t.offsetWidth;
      We(a) && a !== n && e(yz(a));
    }
  }, [t, e, n]), r;
}
function Bw(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function hX(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bw(Object(r), !0).forEach(function(n) {
      mX(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bw(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function mX(e, t, r) {
  return (t = vX(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vX(e) {
  var t = gX(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function gX(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Un() {
  return Un = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Un.apply(null, arguments);
}
var yX = () => (vq(), null);
function Ks(e) {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return 0;
}
var bX = /* @__PURE__ */ Fe((e, t) => {
  var r, n, o = ye(null), [a, i] = je({
    containerWidth: Ks((r = e.style) === null || r === void 0 ? void 0 : r.width),
    containerHeight: Ks((n = e.style) === null || n === void 0 ? void 0 : n.height)
  }), s = he((u, l) => {
    i((d) => {
      var p = Math.round(u), f = Math.round(l);
      return d.containerWidth === p && d.containerHeight === f ? d : {
        containerWidth: p,
        containerHeight: f
      };
    });
  }, []), c = he((u) => {
    if (typeof t == "function" && t(u), u != null) {
      var {
        width: l,
        height: d
      } = u.getBoundingClientRect();
      s(l, d);
      var p = (v) => {
        var {
          width: h,
          height: g
        } = v[0].contentRect;
        s(h, g);
      }, f = new ResizeObserver(p);
      f.observe(u), o.current = f;
    }
  }, [t, s]);
  return Le(() => () => {
    var u = o.current;
    u?.disconnect();
  }, [s]), /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(Kc, {
    width: a.containerWidth,
    height: a.containerHeight
  }), /* @__PURE__ */ m.createElement("div", Un({
    ref: c
  }, e)));
}), wX = /* @__PURE__ */ Fe((e, t) => {
  var {
    width: r,
    height: n
  } = e, [o, a] = je({
    containerWidth: Ks(r),
    containerHeight: Ks(n)
  }), i = he((c, u) => {
    a((l) => {
      var d = Math.round(c), p = Math.round(u);
      return l.containerWidth === d && l.containerHeight === p ? l : {
        containerWidth: d,
        containerHeight: p
      };
    });
  }, []), s = he((c) => {
    if (typeof t == "function" && t(c), c != null) {
      var {
        width: u,
        height: l
      } = c.getBoundingClientRect();
      i(u, l);
    }
  }, [t, i]);
  return /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(Kc, {
    width: o.containerWidth,
    height: o.containerHeight
  }), /* @__PURE__ */ m.createElement("div", Un({
    ref: s
  }, e)));
}), xX = /* @__PURE__ */ Fe((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(Kc, {
    width: r,
    height: n
  }), /* @__PURE__ */ m.createElement("div", Un({
    ref: t
  }, e)));
}), EX = /* @__PURE__ */ Fe((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return kr(r) || kr(n) ? /* @__PURE__ */ m.createElement(wX, Un({}, e, {
    ref: t
  })) : /* @__PURE__ */ m.createElement(xX, Un({}, e, {
    ref: t
  }));
});
function SX(e) {
  return e === !0 ? bX : EX;
}
var OX = /* @__PURE__ */ Fe((e, t) => {
  var {
    children: r,
    className: n,
    height: o,
    onClick: a,
    onContextMenu: i,
    onDoubleClick: s,
    onMouseDown: c,
    onMouseEnter: u,
    onMouseLeave: l,
    onMouseMove: d,
    onMouseUp: p,
    onTouchEnd: f,
    onTouchMove: v,
    onTouchStart: h,
    style: g,
    width: y,
    responsive: w,
    dispatchTouchEvents: x = !0
  } = e, S = ye(null), E = Re(), [O, P] = je(null), [A, _] = je(null), N = pX(), T = Zp(), R = T?.width > 0 ? T.width : y, j = T?.height > 0 ? T.height : o, C = he((L) => {
    N(L), typeof t == "function" && t(L), P(L), _(L), L != null && (S.current = L);
  }, [N, t, P, _]), D = he((L) => {
    E(FT(L)), E(zt({
      handler: a,
      reactEvent: L
    }));
  }, [E, a]), $ = he((L) => {
    E(Bf(L)), E(zt({
      handler: u,
      reactEvent: L
    }));
  }, [E, u]), z = he((L) => {
    E(SC()), E(zt({
      handler: l,
      reactEvent: L
    }));
  }, [E, l]), I = he((L) => {
    E(Bf(L)), E(zt({
      handler: d,
      reactEvent: L
    }));
  }, [E, d]), F = he(() => {
    E(qT());
  }, [E]), oe = he((L) => {
    E(VT(L.key));
  }, [E]), H = he((L) => {
    E(zt({
      handler: i,
      reactEvent: L
    }));
  }, [E, i]), ie = he((L) => {
    E(zt({
      handler: s,
      reactEvent: L
    }));
  }, [E, s]), ae = he((L) => {
    E(zt({
      handler: c,
      reactEvent: L
    }));
  }, [E, c]), W = he((L) => {
    E(zt({
      handler: p,
      reactEvent: L
    }));
  }, [E, p]), te = he((L) => {
    E(zt({
      handler: h,
      reactEvent: L
    }));
  }, [E, h]), se = he((L) => {
    x && E(GT(L)), E(zt({
      handler: v,
      reactEvent: L
    }));
  }, [E, x, v]), K = he((L) => {
    E(zt({
      handler: f,
      reactEvent: L
    }));
  }, [E, f]), re = SX(w);
  return /* @__PURE__ */ m.createElement(KC.Provider, {
    value: O
  }, /* @__PURE__ */ m.createElement(oP.Provider, {
    value: A
  }, /* @__PURE__ */ m.createElement(re, {
    width: R ?? g?.width,
    height: j ?? g?.height,
    className: pe("recharts-wrapper", n),
    style: hX({
      position: "relative",
      cursor: "default",
      width: R,
      height: j
    }, g),
    onClick: D,
    onContextMenu: H,
    onDoubleClick: ie,
    onFocus: F,
    onKeyDown: oe,
    onMouseDown: ae,
    onMouseEnter: $,
    onMouseLeave: z,
    onMouseMove: I,
    onMouseUp: W,
    onTouchEnd: K,
    onTouchMove: se,
    onTouchStart: te,
    ref: C
  }, /* @__PURE__ */ m.createElement(yX, null), r)));
}), PX = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function AX(e, t) {
  if (e == null) return {};
  var r, n, o = CX(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function CX(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var QT = /* @__PURE__ */ Fe((e, t) => {
  var {
    width: r,
    height: n,
    responsive: o,
    children: a,
    className: i,
    style: s,
    compact: c,
    title: u,
    desc: l
  } = e, d = AX(e, PX), p = ht(d);
  return c ? /* @__PURE__ */ m.createElement(m.Fragment, null, /* @__PURE__ */ m.createElement(Kc, {
    width: r,
    height: n
  }), /* @__PURE__ */ m.createElement($w, {
    otherAttributes: p,
    title: u,
    desc: l
  }, a)) : /* @__PURE__ */ m.createElement(OX, {
    className: i,
    style: s,
    width: r,
    height: n,
    responsive: o,
    onClick: e.onClick,
    onMouseLeave: e.onMouseLeave,
    onMouseEnter: e.onMouseEnter,
    onMouseMove: e.onMouseMove,
    onMouseDown: e.onMouseDown,
    onMouseUp: e.onMouseUp,
    onContextMenu: e.onContextMenu,
    onDoubleClick: e.onDoubleClick,
    onTouchStart: e.onTouchStart,
    onTouchMove: e.onTouchMove,
    onTouchEnd: e.onTouchEnd
  }, /* @__PURE__ */ m.createElement($w, {
    otherAttributes: p,
    title: u,
    desc: l,
    ref: t
  }, /* @__PURE__ */ m.createElement(AG, null, a)));
});
function Ff() {
  return Ff = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ff.apply(null, arguments);
}
var TX = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, _X = {
  accessibilityLayer: !0,
  layout: "horizontal",
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: TX,
  reverseStackOrder: !1,
  syncMethod: "index",
  responsive: !1
}, km = /* @__PURE__ */ Fe(function(t, r) {
  var n, o = Ge(t.categoricalChartProps, _X), {
    chartName: a,
    defaultTooltipEventType: i,
    validateTooltipEventTypes: s,
    tooltipPayloadSearcher: c,
    categoricalChartProps: u
  } = t, l = {
    chartName: a,
    defaultTooltipEventType: i,
    validateTooltipEventTypes: s,
    tooltipPayloadSearcher: c,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ m.createElement(XT, {
    preloadedState: {
      options: l
    },
    reduxStoreName: (n = u.id) !== null && n !== void 0 ? n : a
  }, /* @__PURE__ */ m.createElement(bT, {
    chartData: u.data
  }), /* @__PURE__ */ m.createElement(ZT, {
    layout: o.layout,
    margin: o.margin
  }), /* @__PURE__ */ m.createElement(JT, {
    accessibilityLayer: o.accessibilityLayer,
    barCategoryGap: o.barCategoryGap,
    maxBarSize: o.maxBarSize,
    stackOffset: o.stackOffset,
    barGap: o.barGap,
    barSize: o.barSize,
    syncId: o.syncId,
    syncMethod: o.syncMethod,
    className: o.className
  }), /* @__PURE__ */ m.createElement(QT, Ff({}, o, {
    ref: r
  })));
}), kX = ["axis"], NX = /* @__PURE__ */ Fe((e, t) => /* @__PURE__ */ m.createElement(km, {
  chartName: "LineChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: kX,
  tooltipPayloadSearcher: ll,
  categoricalChartProps: e,
  ref: t
})), RX = ["axis", "item"], MX = /* @__PURE__ */ Fe((e, t) => /* @__PURE__ */ m.createElement(km, {
  chartName: "BarChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: RX,
  tooltipPayloadSearcher: ll,
  categoricalChartProps: e,
  ref: t
}));
function IX(e) {
  var t = Re();
  return Le(() => {
    t(tX(e));
  }, [t, e]), null;
}
var DX = ["layout"];
function zf() {
  return zf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zf.apply(null, arguments);
}
function jX(e, t) {
  if (e == null) return {};
  var r, n, o = LX(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function LX(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var $X = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, BX = {
  accessibilityLayer: !0,
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: $X,
  reverseStackOrder: !1,
  syncMethod: "index",
  layout: "radial",
  responsive: !1
}, FX = /* @__PURE__ */ Fe(function(t, r) {
  var n, o = Ge(t.categoricalChartProps, BX), {
    layout: a
  } = o, i = jX(o, DX), {
    chartName: s,
    defaultTooltipEventType: c,
    validateTooltipEventTypes: u,
    tooltipPayloadSearcher: l
  } = t, d = {
    chartName: s,
    defaultTooltipEventType: c,
    validateTooltipEventTypes: u,
    tooltipPayloadSearcher: l,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ m.createElement(XT, {
    preloadedState: {
      options: d
    },
    reduxStoreName: (n = o.id) !== null && n !== void 0 ? n : s
  }, /* @__PURE__ */ m.createElement(bT, {
    chartData: o.data
  }), /* @__PURE__ */ m.createElement(ZT, {
    layout: a,
    margin: o.margin
  }), /* @__PURE__ */ m.createElement(JT, {
    accessibilityLayer: o.accessibilityLayer,
    barCategoryGap: o.barCategoryGap,
    maxBarSize: o.maxBarSize,
    stackOffset: o.stackOffset,
    barGap: o.barGap,
    barSize: o.barSize,
    syncId: o.syncId,
    syncMethod: o.syncMethod,
    className: o.className
  }), /* @__PURE__ */ m.createElement(IX, {
    cx: o.cx,
    cy: o.cy,
    startAngle: o.startAngle,
    endAngle: o.endAngle,
    innerRadius: o.innerRadius,
    outerRadius: o.outerRadius
  }), /* @__PURE__ */ m.createElement(QT, zf({}, i, {
    ref: r
  })));
}), zX = ["item"], UX = {
  layout: "centric",
  startAngle: 0,
  endAngle: 360,
  cx: "50%",
  cy: "50%",
  innerRadius: 0,
  outerRadius: "80%"
}, WX = /* @__PURE__ */ Fe((e, t) => {
  var r = Ge(e, UX);
  return /* @__PURE__ */ m.createElement(FX, {
    chartName: "PieChart",
    defaultTooltipEventType: "item",
    validateTooltipEventTypes: zX,
    tooltipPayloadSearcher: ll,
    categoricalChartProps: r,
    ref: t
  });
}), KX = ["axis"], VX = /* @__PURE__ */ Fe((e, t) => /* @__PURE__ */ m.createElement(km, {
  chartName: "AreaChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: KX,
  tooltipPayloadSearcher: ll,
  categoricalChartProps: e,
  ref: t
}));
const qX = m.forwardRef(
  ({
    data: e,
    dataKeys: t,
    xAxisKey: r = "name",
    colors: n,
    showGrid: o = !0,
    showLegend: a = !0,
    showTooltip: i = !0,
    width: s = "100%",
    height: c = 400,
    className: u,
    barSize: l = 20,
    layout: d = "horizontal"
  }, p) => {
    const v = n || [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(221.2 83.2% 53.3%)",
      "hsl(204 94% 94%)",
      "hsl(142 71% 45%)",
      "hsl(0 84.2% 60.2%)"
    ];
    return /* @__PURE__ */ b("div", { ref: p, className: u, children: /* @__PURE__ */ b(Uc, { width: s, height: c, children: /* @__PURE__ */ U(MX, { data: e, layout: d, children: [
      o && /* @__PURE__ */ b(wl, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
      /* @__PURE__ */ b(
        xl,
        {
          dataKey: r,
          stroke: "hsl(var(--muted-foreground))",
          style: { fontSize: "0.875rem" }
        }
      ),
      /* @__PURE__ */ b(
        El,
        {
          stroke: "hsl(var(--muted-foreground))",
          style: { fontSize: "0.875rem" }
        }
      ),
      i && /* @__PURE__ */ b(ul, {}),
      a && /* @__PURE__ */ b(Kn, {}),
      t.map((h, g) => /* @__PURE__ */ b(
        gT,
        {
          dataKey: h,
          fill: v[g % v.length],
          barSize: l
        },
        h
      ))
    ] }) }) });
  }
);
qX.displayName = "BarChart";
const HX = m.forwardRef(
  ({
    data: e,
    dataKeys: t,
    xAxisKey: r = "name",
    colors: n,
    showGrid: o = !0,
    showLegend: a = !0,
    showTooltip: i = !0,
    showDots: s = !0,
    width: c = "100%",
    height: u = 400,
    className: l,
    strokeWidth: d = 2
  }, p) => {
    const v = n || [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(221.2 83.2% 53.3%)",
      "hsl(204 94% 94%)",
      "hsl(142 71% 45%)",
      "hsl(0 84.2% 60.2%)"
    ];
    return /* @__PURE__ */ b("div", { ref: p, className: l, children: /* @__PURE__ */ b(Uc, { width: c, height: u, children: /* @__PURE__ */ U(NX, { data: e, children: [
      o && /* @__PURE__ */ b(wl, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
      /* @__PURE__ */ b(
        xl,
        {
          dataKey: r,
          stroke: "hsl(var(--muted-foreground))",
          style: { fontSize: "0.875rem" }
        }
      ),
      /* @__PURE__ */ b(
        El,
        {
          stroke: "hsl(var(--muted-foreground))",
          style: { fontSize: "0.875rem" }
        }
      ),
      i && /* @__PURE__ */ b(ul, {}),
      a && /* @__PURE__ */ b(Kn, {}),
      t.map((h, g) => /* @__PURE__ */ b(
        NT,
        {
          type: "monotone",
          dataKey: h,
          stroke: v[g % v.length],
          strokeWidth: d,
          dot: s
        },
        h
      ))
    ] }) }) });
  }
);
HX.displayName = "LineChart";
const GX = m.forwardRef(
  ({
    data: e,
    dataKeys: t,
    xAxisKey: r = "name",
    colors: n,
    showGrid: o = !0,
    showLegend: a = !0,
    showTooltip: i = !0,
    width: s = "100%",
    height: c = 400,
    className: u,
    strokeWidth: l = 2,
    fillOpacity: d = 0.6
  }, p) => {
    const v = n || [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(221.2 83.2% 53.3%)",
      "hsl(204 94% 94%)",
      "hsl(142 71% 45%)",
      "hsl(0 84.2% 60.2%)"
    ];
    return /* @__PURE__ */ b("div", { ref: p, className: u, children: /* @__PURE__ */ b(Uc, { width: s, height: c, children: /* @__PURE__ */ U(VX, { data: e, children: [
      o && /* @__PURE__ */ b(wl, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
      /* @__PURE__ */ b(
        xl,
        {
          dataKey: r,
          stroke: "hsl(var(--muted-foreground))",
          style: { fontSize: "0.875rem" }
        }
      ),
      /* @__PURE__ */ b(
        El,
        {
          stroke: "hsl(var(--muted-foreground))",
          style: { fontSize: "0.875rem" }
        }
      ),
      i && /* @__PURE__ */ b(ul, {}),
      a && /* @__PURE__ */ b(Kn, {}),
      t.map((h, g) => /* @__PURE__ */ b(
        BT,
        {
          type: "monotone",
          dataKey: h,
          stroke: v[g % v.length],
          fill: v[g % v.length],
          strokeWidth: l,
          fillOpacity: d
        },
        h
      ))
    ] }) }) });
  }
);
GX.displayName = "AreaChart";
const YX = m.forwardRef(
  ({
    data: e,
    dataKey: t = "value",
    nameKey: r = "name",
    colors: n,
    showLabels: o = !0,
    showLegend: a = !0,
    showTooltip: i = !0,
    innerRadius: s = 0,
    outerRadius: c = 120,
    labelFormatter: u,
    width: l = "100%",
    height: d = 400,
    className: p
  }, f) => {
    const h = n || [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(221.2 83.2% 53.3%)",
      "hsl(204 94% 94%)",
      "hsl(142 71% 45%)",
      "hsl(0 84.2% 60.2%)",
      "hsl(210 40% 96.1%)",
      "hsl(220 14.3% 95.9%)"
    ];
    return /* @__PURE__ */ b("div", { ref: f, className: p, children: /* @__PURE__ */ b(Uc, { width: l, height: d, children: /* @__PURE__ */ U(WX, { children: [
      /* @__PURE__ */ b(
        fT,
        {
          data: e,
          cx: "50%",
          cy: "50%",
          labelLine: !1,
          label: o ? u || ((y) => `${y.value}`) : !1,
          innerRadius: s,
          outerRadius: c,
          dataKey: t,
          nameKey: r,
          children: e.map((y, w) => /* @__PURE__ */ b(ni, { fill: h[w % h.length] }, `cell-${w}`))
        }
      ),
      i && /* @__PURE__ */ b(ul, {}),
      a && /* @__PURE__ */ b(Kn, {})
    ] }) }) });
  }
);
YX.displayName = "PieChart";
const vZ = ({
  title: e,
  subtitle: t,
  logo: r,
  user: n,
  menuItems: o = [],
  menuGroups: a = [],
  initialCollapsed: i = !0,
  onLogout: s,
  notifications: c,
  onNotificationRead: u,
  onMarkAllAsRead: l,
  onClearAllNotifications: d,
  onViewAllNotifications: p,
  breadcrumbs: f = [],
  modules: v,
  currentModule: h,
  onModuleChange: g,
  showAboutMenuItem: y = !1,
  renderAboutModal: w,
  onLogoClick: x,
  companyLogo: S,
  headerMode: E,
  headerLogo: O,
  headerLogoCollapsed: P,
  children: A
}) => {
  const [_, N] = m.useState(i), [T, R] = m.useState(!1), [j, C] = m.useState(!1);
  return m.useEffect(() => {
    const D = window.matchMedia("(max-width: 1023px)"), $ = () => {
      R(D.matches), D.matches || C(!1);
    };
    return $(), D.addEventListener("change", $), () => D.removeEventListener("change", $);
  }, []), m.useEffect(() => T && j ? (document.body.style.overflow = "hidden", () => {
    document.body.style.overflow = "";
  }) : (document.body.style.overflow = "", () => {
    document.body.style.overflow = "";
  }), [T, j]), /* @__PURE__ */ U("div", { className: "relative min-h-screen bg-background", children: [
    /* @__PURE__ */ b(
      PO,
      {
        title: e,
        logo: r,
        items: o,
        groups: a,
        isCollapsed: _,
        onToggleCollapse: () => N(!_),
        onLogout: s,
        onLogoClick: x,
        companyLogo: S,
        headerMode: E,
        headerLogo: O,
        headerLogoCollapsed: P,
        isMobile: T,
        isMobileOpen: j,
        onMobileClose: () => C(!1)
      }
    ),
    /* @__PURE__ */ b(
      JO,
      {
        isCollapsed: _,
        isMobile: T,
        onMobileMenuToggle: () => C((D) => !D),
        breadcrumbs: f,
        user: {
          name: n.name,
          role: n.role,
          avatarUrl: n.avatarUrl
        },
        companyName: t,
        notifications: c,
        onNotificationRead: u,
        onMarkAllAsRead: l,
        onClearAllNotifications: d,
        onViewAllNotifications: p,
        modules: v,
        currentModule: h,
        onModuleChange: g,
        showAboutMenuItem: y,
        renderAboutModal: w,
        onLogout: s
      }
    ),
    /* @__PURE__ */ b(
      "main",
      {
        className: V(
          "transition-all duration-300 pt-[52px] min-h-screen",
          T ? "ml-0" : _ ? "ml-[64px]" : "ml-[220px]"
        ),
        children: /* @__PURE__ */ b("div", { className: "w-full h-full p-6", children: A })
      }
    )
  ] });
}, gZ = ({
  title: e,
  subtitle: t,
  icon: r,
  density: n = "default",
  filtersSlot: o,
  actions: a = [],
  showDefaultActions: i = !0,
  onAdd: s,
  onEdit: c,
  onDelete: u,
  onRefresh: l,
  selectedRowsCount: d = 0,
  children: p,
  className: f
}) => {
  const { toast: v } = fO(), [h, g] = m.useState(!1), y = async () => {
    if (!(!l || h)) {
      g(!0);
      try {
        await l();
      } finally {
        setTimeout(() => g(!1), 600);
      }
    }
  }, w = () => {
    if (d === 0) {
      v({
        title: "Atenção",
        description: "Selecione um registro para editar.",
        variant: "warning"
      });
      return;
    }
    if (d > 1) {
      v({
        title: "Atenção",
        description: "Selecione apenas um registro para editar.",
        variant: "warning"
      });
      return;
    }
    c?.();
  }, x = () => {
    if (d === 0) {
      v({
        title: "Atenção",
        description: "Selecione ao menos um registro para excluir.",
        variant: "warning"
      });
      return;
    }
    u?.();
  }, S = [];
  i && (s && S.push({
    key: "add",
    label: "Incluir",
    icon: /* @__PURE__ */ b(V_, { className: "h-4 w-4" }),
    variant: "secondary",
    onClick: s
  }), c && S.push({
    key: "edit",
    label: "Editar",
    icon: /* @__PURE__ */ b(Z_, { className: "h-4 w-4" }),
    variant: "outline",
    onClick: w
  }), u && S.push({
    key: "delete",
    label: "Excluir",
    icon: /* @__PURE__ */ b(tk, { className: "h-4 w-4" }),
    variant: "outline",
    onClick: x
  }));
  const E = [...S, ...a], O = n === "compact";
  return /* @__PURE__ */ U("div", { className: V("flex flex-col h-full w-full", f), children: [
    /* @__PURE__ */ U("div", { className: "mb-4 rounded-lg border bg-muted/30", children: [
      /* @__PURE__ */ U("div", { className: V(
        "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
        O ? "px-3 py-2.5" : "px-4 py-3"
      ), children: [
        /* @__PURE__ */ U("div", { className: "flex items-center gap-3", children: [
          r && /* @__PURE__ */ b("div", { className: "flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-sm hover:shadow hover:scale-[1.02] transition-all duration-200 cursor-default", children: r }),
          /* @__PURE__ */ U("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ U("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ b("h1", { className: V(
                "font-bold text-foreground tracking-tight",
                O ? "text-xl" : "text-2xl"
              ), children: e }),
              l && /* @__PURE__ */ b(
                "button",
                {
                  onClick: y,
                  disabled: h,
                  className: V(
                    "p-1.5 rounded-md transition-all hover:bg-accent text-muted-foreground hover:text-foreground",
                    h && "text-primary"
                  ),
                  title: "Atualizar",
                  children: /* @__PURE__ */ b(H_, { className: V("h-4 w-4 transition-transform", h && "animate-spin") })
                }
              )
            ] }),
            t && /* @__PURE__ */ b("p", { className: V(
              "text-muted-foreground mt-0.5",
              O ? "text-xs" : "text-sm"
            ), children: t })
          ] })
        ] }),
        E.length > 0 && /* @__PURE__ */ b("div", { className: "flex flex-wrap items-center gap-2 md:justify-end", children: E.map((P) => /* @__PURE__ */ U(
          Gr,
          {
            variant: P.variant || "outline",
            size: "sm",
            onClick: P.onClick,
            disabled: P.disabled,
            className: "gap-2",
            children: [
              P.icon,
              P.label
            ]
          },
          P.key
        )) })
      ] }),
      o && /* @__PURE__ */ b("div", { className: V(
        "border-t bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        O ? "px-3 py-2" : "px-4 py-2.5"
      ), children: o })
    ] }),
    /* @__PURE__ */ b("div", { className: "overflow-auto", children: p })
  ] });
};
function yZ({
  columns: e,
  data: t,
  loading: r = !1,
  rowKey: n,
  selectable: o,
  selectedRows: a = [],
  onSelectionChange: i,
  onRowClick: s,
  onRowDoubleClick: c,
  className: u,
  emptyText: l = "Nenhum registro encontrado",
  dragSelect: d = !0,
  pageSize: p = 10,
  pageSizeOptions: f = [5, 10, 20, 50]
}) {
  const v = o !== void 0 ? o : !!i, h = m.useRef(null), g = m.useRef(/* @__PURE__ */ new Map()), [y, w] = m.useState(null), [x, S] = m.useState(!1), E = m.useRef(null), O = m.useRef(!1), [P, A] = m.useState(1), [_, N] = m.useState(p), T = Math.ceil(t.length / _), R = (P - 1) * _, j = R + _, C = t.slice(R, j);
  m.useEffect(() => {
    A(1);
  }, [t.length, _]);
  const D = (W) => typeof n == "function" ? n(W) : W[n], $ = (W) => {
    const te = D(W);
    return a.some((se) => D(se) === te);
  }, z = m.useCallback((W) => {
    if (!h.current) return [];
    const te = h.current.getBoundingClientRect(), se = Math.min(W.startY, W.endY), K = Math.max(W.startY, W.endY), re = [];
    return C.forEach((L) => {
      const G = D(L), Y = g.current.get(G);
      if (!Y) return;
      const B = Y.getBoundingClientRect(), me = B.top - te.top + h.current.scrollTop;
      me + B.height >= se && me <= K && re.push(L);
    }), re;
  }, [C, D]), I = (W) => {
    if (!v || !i || !d || W.button !== 0) return;
    const te = h.current;
    if (!te) return;
    const se = te.getBoundingClientRect(), K = W.clientX - se.left + te.scrollLeft, re = W.clientY - se.top + te.scrollTop;
    E.current = { x: K, y: re, clientX: W.clientX, clientY: W.clientY }, O.current = !1;
  }, F = m.useCallback((W) => {
    if (!E.current || !h.current || !i) return;
    const te = Math.abs(W.clientX - E.current.clientX), se = Math.abs(W.clientY - E.current.clientY);
    if (!O.current && (te > 5 || se > 5) && (O.current = !0, S(!0), !W.ctrlKey && !W.metaKey && !W.shiftKey && i([])), O.current) {
      const K = h.current.getBoundingClientRect(), re = W.clientX - K.left + h.current.scrollLeft, L = W.clientY - K.top + h.current.scrollTop, G = {
        startX: E.current.x,
        startY: E.current.y,
        endX: re,
        endY: L
      };
      w(G);
      const Y = z(G);
      i(Y);
    }
  }, [z, i]), oe = m.useCallback(() => {
    O.current = !1, E.current = null, S(!1), w(null);
  }, []);
  m.useEffect(() => (window.addEventListener("mousemove", F), window.addEventListener("mouseup", oe), () => {
    window.removeEventListener("mousemove", F), window.removeEventListener("mouseup", oe);
  }), [F, oe]);
  const H = (W, te) => {
    if (!v || !i) return;
    const se = D(W), K = $(W);
    if (te.ctrlKey || te.metaKey)
      i(K ? a.filter((re) => D(re) !== se) : [...a, W]);
    else if (te.shiftKey && a.length > 0) {
      const re = D(a[a.length - 1]), L = t.findIndex((Te) => D(Te) === se), G = t.findIndex((Te) => D(Te) === re), Y = Math.min(L, G), B = Math.max(L, G), me = t.slice(Y, B + 1), le = [...a];
      me.forEach((Te) => {
        const Ke = D(Te);
        le.some((St) => D(St) === Ke) || le.push(Te);
      }), i(le);
    } else
      i(K ? [] : [W]);
  }, ie = (W) => {
    W.target === W.currentTarget && v && i && i([]);
  }, ae = () => {
    if (!y) return;
    const W = Math.min(y.startX, y.endX), te = Math.min(y.startY, y.endY), se = Math.abs(y.endX - y.startX), K = Math.abs(y.endY - y.startY);
    return {
      position: "absolute",
      left: W,
      top: te,
      width: se,
      height: K,
      backgroundColor: "hsl(var(--primary) / 0.1)",
      border: "1px solid hsl(var(--primary) / 0.5)",
      borderRadius: "2px",
      pointerEvents: "none",
      zIndex: 10
    };
  };
  return /* @__PURE__ */ U("div", { className: V("flex flex-col", u), children: [
    /* @__PURE__ */ U(
      "div",
      {
        ref: h,
        className: "rounded-md border relative",
        onClick: ie,
        onMouseDown: I,
        children: [
          x && y && /* @__PURE__ */ b("div", { style: ae() }),
          /* @__PURE__ */ U(xO, { children: [
            /* @__PURE__ */ b(EO, { children: /* @__PURE__ */ b(Zo, { children: e.map((W) => /* @__PURE__ */ b(
              OO,
              {
                style: W.width ? { width: W.width } : void 0,
                children: W.title
              },
              W.key
            )) }) }),
            /* @__PURE__ */ b(SO, { children: r ? Array.from({ length: 5 }).map((W, te) => /* @__PURE__ */ b(Zo, { children: e.map((se) => /* @__PURE__ */ b(zi, { children: /* @__PURE__ */ b("div", { className: "h-4 bg-muted animate-pulse rounded" }) }, se.key)) }, `skeleton-${te}`)) : t.length === 0 ? /* @__PURE__ */ b(Zo, { children: /* @__PURE__ */ b(
              zi,
              {
                colSpan: e.length + (v ? 1 : 0),
                className: "text-center py-8 text-muted-foreground",
                children: l
              }
            ) }) : C.map((W, te) => {
              const se = D(W), K = $(W);
              return /* @__PURE__ */ b(
                Zo,
                {
                  ref: (re) => {
                    re && g.current.set(se, re);
                  },
                  "data-row": "true",
                  "data-state": K ? "selected" : "",
                  onClick: (re) => {
                    v ? H(W, re) : s?.(W);
                  },
                  onDoubleClick: () => c?.(W),
                  className: V(
                    v || s || c ? "cursor-pointer" : "",
                    v && "select-none",
                    K && "!bg-secondary/20"
                  ),
                  children: e.map((re) => {
                    const L = re.dataIndex ? W[re.dataIndex] : void 0;
                    return /* @__PURE__ */ b(zi, { children: re.render ? re.render(L, W, te) : L || "-" }, re.key);
                  })
                },
                se
              );
            }) })
          ] })
        ]
      }
    ),
    t.length > 0 && /* @__PURE__ */ U("div", { className: "flex items-center justify-between px-4 py-3", children: [
      /* @__PURE__ */ U("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ b("span", { children: "Linhas por página:" }),
        /* @__PURE__ */ b(
          "select",
          {
            value: _,
            onChange: (W) => N(Number(W.target.value)),
            className: "h-8 rounded border border-input bg-background px-2 text-sm",
            children: f.map((W) => /* @__PURE__ */ b("option", { value: W, children: W }, W))
          }
        )
      ] }),
      /* @__PURE__ */ b("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: /* @__PURE__ */ U("span", { children: [
        R + 1,
        "-",
        Math.min(j, t.length),
        " de ",
        t.length
      ] }) }),
      /* @__PURE__ */ U("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ b(
          Gr,
          {
            variant: "outline",
            size: "sm",
            onClick: () => A(1),
            disabled: P === 1,
            className: "h-8 w-8 p-0",
            children: /* @__PURE__ */ b(A_, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ b(
          Gr,
          {
            variant: "outline",
            size: "sm",
            onClick: () => A((W) => Math.max(1, W - 1)),
            disabled: P === 1,
            className: "h-8 w-8 p-0",
            children: /* @__PURE__ */ b(Yw, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ U("span", { className: "px-2 text-sm", children: [
          P,
          " / ",
          T || 1
        ] }),
        /* @__PURE__ */ b(
          Gr,
          {
            variant: "outline",
            size: "sm",
            onClick: () => A((W) => Math.min(T, W + 1)),
            disabled: P === T || T === 0,
            className: "h-8 w-8 p-0",
            children: /* @__PURE__ */ b(Hs, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ b(
          Gr,
          {
            variant: "outline",
            size: "sm",
            onClick: () => A(T),
            disabled: P === T || T === 0,
            className: "h-8 w-8 p-0",
            children: /* @__PURE__ */ b(T_, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}
function bZ({
  columns: e,
  data: t,
  rowKey: r,
  selectedRow: n,
  onRowSelect: o,
  renderDetail: a,
  renderPagination: i,
  className: s,
  tableClassName: c,
  detailClassName: u,
  gridRatio: l = [7, 5]
}) {
  const d = (f) => typeof r == "function" ? r(f) : f[r], p = (f) => {
    if (o) {
      const v = n && d(n) === d(f);
      o(v ? null : f);
    }
  };
  return /* @__PURE__ */ U("div", { className: V("flex gap-6", s), children: [
    /* @__PURE__ */ b(
      "div",
      {
        className: V("min-w-0 shrink-0", c),
        style: { flex: `${l[0]} 0 0%` },
        children: /* @__PURE__ */ U(Ed, { className: "overflow-hidden", children: [
          /* @__PURE__ */ b("div", { className: "overflow-x-auto", children: /* @__PURE__ */ U("table", { className: "w-full", children: [
            /* @__PURE__ */ b("thead", { children: /* @__PURE__ */ b("tr", { className: "border-b bg-muted/50", children: e.map((f) => /* @__PURE__ */ b(
              "th",
              {
                className: "h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm",
                style: f.width ? { width: f.width } : void 0,
                children: f.title
              },
              f.key
            )) }) }),
            /* @__PURE__ */ b("tbody", { children: t.length === 0 ? /* @__PURE__ */ b("tr", { children: /* @__PURE__ */ b(
              "td",
              {
                colSpan: e.length,
                className: "text-center py-8 text-muted-foreground text-sm",
                children: "Nenhum registro encontrado"
              }
            ) }) : t.map((f) => {
              const v = d(f), h = n && d(n) === v;
              return /* @__PURE__ */ b(
                "tr",
                {
                  onClick: () => p(f),
                  className: V(
                    "border-b transition-colors cursor-pointer",
                    h ? "bg-secondary/20" : "hover:bg-muted/50"
                  ),
                  children: e.map((g) => {
                    const y = g.dataIndex ? f[g.dataIndex] : void 0;
                    return /* @__PURE__ */ b("td", { className: "px-4 py-2 align-middle", children: g.render ? g.render(y, f) : y || "-" }, g.key);
                  })
                },
                v
              );
            }) })
          ] }) }),
          i && /* @__PURE__ */ b("div", { className: "border-t", children: i() })
        ] })
      }
    ),
    /* @__PURE__ */ b(
      "div",
      {
        className: V("min-w-0", u),
        style: { flex: `${l[1]} 1 0%` },
        children: n && a && /* @__PURE__ */ b(Ed, { className: "sticky top-6", children: a(n) })
      }
    )
  ] });
}
const wZ = K0, xZ = V0, EZ = ac, XX = q0, e_ = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  tc,
  {
    className: V(
      "fixed inset-0 z-[200] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: r
  }
));
e_.displayName = tc.displayName;
const ZX = vo(
  "fixed z-[201] gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), JX = m.forwardRef(({ side: e = "right", className: t, children: r, ...n }, o) => /* @__PURE__ */ U(XX, { children: [
  /* @__PURE__ */ b(e_, {}),
  /* @__PURE__ */ U(
    rc,
    {
      ref: o,
      className: V(ZX({ side: e }), t),
      ...n,
      children: [
        r,
        /* @__PURE__ */ U(ac, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ b(Uf, { className: "h-4 w-4" }),
          /* @__PURE__ */ b("span", { className: "sr-only", children: "Fechar" })
        ] })
      ]
    }
  )
] }));
JX.displayName = rc.displayName;
const QX = ({
  className: e,
  ...t
}) => /* @__PURE__ */ b(
  "div",
  {
    className: V(
      "flex flex-col space-y-2 text-center sm:text-left",
      e
    ),
    ...t
  }
);
QX.displayName = "SheetHeader";
const e7 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ b(
  "div",
  {
    className: V(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
e7.displayName = "SheetFooter";
const t7 = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  nc,
  {
    ref: r,
    className: V("text-lg font-semibold text-foreground", e),
    ...t
  }
));
t7.displayName = nc.displayName;
const r7 = m.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ b(
  oc,
  {
    ref: r,
    className: V("text-sm text-muted-foreground", e),
    ...t
  }
));
r7.displayName = oc.displayName;
const SZ = ({
  children: e,
  isAuthenticated: t,
  redirectTo: r = "/",
  externalRedirect: n = !1
}) => {
  const o = Kw();
  return t ? e : n && r ? (window.location.href = r, null) : /* @__PURE__ */ b(i_, { to: r, state: { from: o }, replace: !0 });
};
class Fw {
  static async identify(t) {
    return (await Yr.post("/auth/Identify", {
      username: t.username,
      password: t.password
    })).data ?? null;
  }
  static async loginWithContract(t) {
    const n = (await Yr.post("/auth/LoginWithContract", t)).data;
    if (!n)
      throw new Error("Login response is empty.");
    const { accessToken: o, refreshToken: a, user: i, contract: s } = n;
    return localStorage.setItem("@Archon:accessToken", o), localStorage.setItem("@Archon:refreshToken", a), localStorage.setItem("@Archon:user", JSON.stringify(i)), localStorage.setItem("@Archon:contract", JSON.stringify(s)), n;
  }
  static async login(t) {
    const r = await this.identify(t);
    if (!r || r.authenticationStep !== "completed")
      throw new Error("Login requires contract selection.");
    return localStorage.setItem("@Archon:accessToken", r.accessToken), localStorage.setItem("@Archon:refreshToken", r.refreshToken), localStorage.setItem("@Archon:user", JSON.stringify(r.user)), localStorage.setItem("@Archon:contract", JSON.stringify(r.contract)), r;
  }
  static logout() {
    localStorage.removeItem("@Archon:accessToken"), localStorage.removeItem("@Archon:refreshToken"), localStorage.removeItem("@Archon:user"), localStorage.removeItem("@Archon:contract");
  }
  static isAuthenticated() {
    return !!localStorage.getItem("@Archon:accessToken");
  }
  static getCurrentUser() {
    const t = localStorage.getItem("@Archon:user");
    return t ? JSON.parse(t) : null;
  }
  static getAccessToken() {
    return localStorage.getItem("@Archon:accessToken");
  }
  static getRefreshToken() {
    return localStorage.getItem("@Archon:refreshToken");
  }
  static async logoutFromServer() {
    try {
      const t = this.getRefreshToken();
      t && await Ie.post(
        `${r$()}/api/auth/Logout`,
        { refreshToken: t },
        { headers: { "Content-Type": "application/json" } }
      );
    } finally {
      this.logout();
    }
  }
  static async logoutAllDevices() {
    await this.logoutFromServer();
  }
  static async refreshAccessToken() {
    const t = this.getRefreshToken();
    if (!t)
      throw new Error("Refresh token não encontrado");
    try {
      const n = (await Yr.post("/auth/RefreshToken", {
        refreshToken: t
      })).data;
      if (!n)
        throw new Error("Refresh token response is empty.");
      const { accessToken: o, refreshToken: a } = n;
      return localStorage.setItem("@Archon:accessToken", o), localStorage.setItem("@Archon:refreshToken", a), n;
    } catch (r) {
      throw this.logout(), r;
    }
  }
  static async getActiveSessions() {
    return [];
  }
  static isTokenExpiringSoon(t, r = 5) {
    try {
      const o = JSON.parse(atob(t.split(".")[1])).exp * 1e3, a = Date.now();
      return (o - a) / (1e3 * 60) <= r;
    } catch {
      return !0;
    }
  }
  static async ensureValidToken() {
    const t = this.getAccessToken();
    if (!t)
      return !1;
    if (this.isTokenExpiringSoon(t))
      try {
        return await this.refreshAccessToken(), !0;
      } catch {
        return !1;
      }
    return !0;
  }
}
const t_ = m.createContext(null), r_ = () => {
  const e = m.useContext(t_);
  if (!e)
    throw new Error("useAuth must be used within AuthProvider");
  return e;
}, OZ = ({ children: e, onLogout: t }) => {
  const [r, n] = m.useState(() => {
    const w = localStorage.getItem("@Archon:user");
    return w ? JSON.parse(w) : null;
  }), [o, a] = m.useState(() => {
    const w = localStorage.getItem("@Archon:contract");
    return w ? JSON.parse(w) : null;
  }), [i, s] = m.useState(() => localStorage.getItem("@Archon:accessToken")), [c, u] = m.useState(() => localStorage.getItem("@Archon:refreshToken")), l = m.useCallback((w) => {
    n(w.user), a(w.contract), s(w.accessToken), u(w.refreshToken), localStorage.setItem("@Archon:user", JSON.stringify(w.user)), localStorage.setItem("@Archon:contract", JSON.stringify(w.contract)), localStorage.setItem("@Archon:accessToken", w.accessToken), localStorage.setItem("@Archon:refreshToken", w.refreshToken);
  }, []), d = m.useCallback(() => {
    n(null), a(null), s(null), u(null), localStorage.removeItem("@Archon:user"), localStorage.removeItem("@Archon:contract"), localStorage.removeItem("@Archon:accessToken"), localStorage.removeItem("@Archon:refreshToken"), t?.();
  }, [t]), p = m.useCallback(async () => {
    await Fw.logoutAllDevices(), d();
  }, [d]), f = m.useCallback(async () => {
    try {
      const w = await Fw.refreshAccessToken();
      w && (s(w.accessToken), u(w.refreshToken), localStorage.setItem("@Archon:accessToken", w.accessToken), localStorage.setItem("@Archon:refreshToken", w.refreshToken));
    } catch {
      d();
    }
  }, [d]), v = m.useCallback(async () => [], []), h = m.useCallback(
    (w) => {
      if (r) {
        const x = { ...r, ...w };
        n(x), localStorage.setItem("@Archon:user", JSON.stringify(x));
      }
    },
    [r]
  ), g = !!r && !!i, y = m.useMemo(
    () => ({
      user: r,
      contract: o,
      accessToken: i,
      refreshToken: c,
      isAuthenticated: g,
      login: l,
      logout: d,
      logoutAllDevices: p,
      refreshAccessToken: f,
      getActiveSessions: v,
      updateUser: h
    }),
    [
      r,
      o,
      i,
      c,
      g,
      l,
      d,
      p,
      f,
      v,
      h
    ]
  );
  return /* @__PURE__ */ b(t_.Provider, { value: y, children: e });
}, n7 = (e) => {
  try {
    const r = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"), n = decodeURIComponent(
      atob(r).split("").map((o) => "%" + ("00" + o.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(n);
  } catch {
    return null;
  }
}, PZ = ({
  redirectTo: e = "/",
  identityManagementUrl: t,
  onSuccess: r,
  onError: n
}) => {
  const o = Vw(), [a] = s_(), { login: i } = r_();
  return Le(() => {
    (async () => {
      try {
        const c = a.get("accessToken"), u = a.get("refreshToken");
        if (!c || !u)
          throw new Error("Tokens não encontrados na URL");
        const l = n7(c), d = l?.email, p = Array.isArray(d) ? d[0] : d || "", f = {
          accessToken: c,
          refreshToken: u,
          user: {
            id: Number(l?.user_id || l?.nameid || 0),
            username: l?.username || l?.unique_name || "",
            email: p,
            name: l?.name || l?.given_name || ""
          },
          contract: {
            contractId: Number(l?.contract_id || 0),
            systemApplicationName: l?.system_application_name || "",
            companyName: l?.company_name || "",
            redirectUris: "",
            roleName: l?.role_name || ""
          },
          authenticationStep: "completed"
        };
        i(f), r && r(), o(e, { replace: !0 });
      } catch (c) {
        n && n(c);
        const u = t || void 0;
        u && (window.location.href = u);
      }
    })();
  }, [a, i, o, e, t, r, n]), /* @__PURE__ */ b("div", { className: "flex flex-col items-center justify-center min-h-screen bg-background gap-6", children: /* @__PURE__ */ b("div", { className: "w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" }) });
}, AZ = () => {
  const [e, t] = m.useState({});
  return {
    fieldErrors: e,
    setErrors: (a) => {
      if (a.errors && typeof a.errors == "object" && !Array.isArray(a.errors)) {
        const i = a.errors, s = {};
        Object.keys(i).forEach((c) => {
          const u = c.charAt(0).toLowerCase() + c.slice(1);
          s[u] = i[c]?.[0] ?? "";
        }), t(s);
      }
    },
    clearErrors: () => {
      t({});
    },
    getError: (a) => e[a] || ""
  };
};
function o7(e) {
  return !!e && typeof e == "object" && "message" in e;
}
function zw(e) {
  return !e || typeof e != "object" ? null : "page" in e && "pageSize" in e && "totalCount" in e && "totalPages" in e && "hasPreviousPage" in e && "hasNextPage" in e ? {
    page: e.page,
    pageSize: e.pageSize,
    totalCount: e.totalCount,
    totalPages: e.totalPages,
    hasPreviousPage: e.hasPreviousPage,
    hasNextPage: e.hasNextPage
  } : null;
}
function CZ(e = {}) {
  const [t, r] = je({
    data: null,
    loading: !1,
    error: null,
    message: "",
    pagination: null
  });
  return {
    ...t,
    execute: async (a) => {
      r((i) => ({ ...i, loading: !0, error: null }));
      try {
        const i = await a(), s = o7(i), c = s ? i.data ?? null : i ?? null, u = s ? i.message : "", l = zw(s ? i.pagination : i);
        return r({
          data: c,
          loading: !1,
          error: null,
          message: u,
          pagination: l
        }), e.onSuccess && e.onSuccess(c), e.showSuccessMessage && u && $d({
          title: "Sucesso",
          description: u,
          variant: "success"
        }), c;
      } catch (i) {
        const s = i.isApiError ? i : {
          message: "Erro desconhecido",
          status: 500,
          isApiError: !0
        };
        throw r({
          data: null,
          loading: !1,
          error: s,
          message: "",
          pagination: null
        }), e.onError && e.onError(s), e.showErrorMessage !== !1 && $d({
          title: "Erro",
          description: s.message,
          variant: "destructive"
        }), s;
      }
    },
    reset: () => {
      r({
        data: null,
        loading: !1,
        error: null,
        message: "",
        pagination: null
      });
    },
    isLoading: t.loading,
    hasError: !!t.error,
    hasData: !!t.data
  };
}
const TZ = (e) => {
  const t = Vw(), r = Kw(), n = e.basePath || "", o = (c) => {
    const u = n + c;
    return r.pathname === u || c !== "/" && r.pathname.startsWith(u);
  }, a = (c) => {
    t(n + c);
  }, i = (c, u, l, d) => ({
    key: c,
    label: u,
    icon: d,
    active: o(l),
    onClick: () => a(l)
  });
  return {
    isActive: o,
    handleNavigate: a,
    createMenuItem: i,
    createMenuGroup: (c, u) => ({
      label: c,
      items: u.map((l) => i(l.key, l.label, l.path, l.icon))
    }),
    currentPath: r.pathname
  };
};
function _Z(e) {
  const { pathname: t, navigate: r, home: n = { label: "Dashboard", path: "/" }, menuItems: o = [], menuGroups: a = [] } = e;
  return tr(() => {
    const i = [];
    t !== n.path && i.push({ label: n.label, onClick: () => r(n.path) });
    for (const s of o)
      if (s.path === t)
        return i.push({ label: s.label }), i;
    for (const s of a)
      for (const c of s.items)
        if (c.path === t)
          return i.push({ label: c.label }), i;
    return i;
  }, [t, r, n, o, a]);
}
function a7(e) {
  try {
    const r = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"), n = decodeURIComponent(
      atob(r).split("").map((o) => "%" + ("00" + o.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(n);
  } catch {
    return {};
  }
}
function kZ() {
  const { accessToken: e } = r_(), { permissions: t, isRoot: r } = tr(() => {
    if (!e)
      return { permissions: [], isRoot: !1 };
    const i = a7(e);
    let s = [];
    return i.permission && (s = Array.isArray(i.permission) ? i.permission : [i.permission]), {
      permissions: s,
      isRoot: i.root === "true"
    };
  }, [e]);
  return {
    permissions: t,
    isRoot: r,
    hasPermission: (i) => r ? !0 : t.includes(i),
    hasAnyPermission: (i) => r ? !0 : i.some((s) => t.includes(s)),
    hasAllPermissions: (i) => r ? !0 : i.every((s) => t.includes(s))
  };
}
const i7 = (e) => {
  switch (e) {
    case 1:
      return "success";
    case 2:
      return "warning";
    case 3:
      return "error";
    default:
      return "info";
  }
}, s7 = (e) => ({
  id: e.id.toString(),
  title: e.titulo,
  message: e.mensagem || "",
  timestamp: new Date(e.criadoEm),
  read: e.lida,
  type: i7(e.tipo)
});
function NZ(e = {}) {
  const { pollingInterval: t = 3e4, enabled: r = !0 } = e, [n, o] = je([]), [a, i] = je(!1), [s, c] = je(null), u = he(async () => {
    if (r)
      try {
        i(!0), c(null);
        const g = ((await Yr.get("/Notificacao/GetMinhas")).data ?? []).map(s7);
        o(g);
      } catch {
        c("Erro ao carregar notificações");
      } finally {
        i(!1);
      }
  }, [r]), l = he(async (v) => {
    try {
      await Yr.put(`/Notificacao/${v}/marcar-lida`), o(
        (h) => h.map((g) => g.id === v ? { ...g, read: !0 } : g)
      );
    } catch {
    }
  }, []), d = he(async () => {
    try {
      await Yr.put("/Notificacao/marcar-todas-lidas"), o((v) => v.map((h) => ({ ...h, read: !0 })));
    } catch {
    }
  }, []), p = he(async () => {
    try {
      await Yr.delete("/Notificacao/limpar-todas"), o([]);
    } catch {
    }
  }, []);
  Le(() => {
    u();
  }, [u]), Le(() => {
    if (!r || t <= 0) return;
    const v = setInterval(u, t);
    return () => clearInterval(v);
  }, [r, t, u]);
  const f = n.filter((v) => !v.read).length;
  return {
    notifications: n,
    unreadCount: f,
    loading: a,
    error: s,
    refresh: u,
    markAsRead: l,
    markAllAsRead: d,
    clearAll: p
  };
}
export {
  vZ as AppLayout,
  GX as AreaChart,
  OZ as AuthProvider,
  Fw as AuthService,
  f7 as Badge,
  qX as BarChart,
  AO as Breadcrumb,
  Gr as Button,
  PZ as Callback,
  Ed as Card,
  Kk as CardContent,
  Wk as CardDescription,
  Vk as CardFooter,
  zk as CardHeader,
  Uk as CardTitle,
  a$ as ChartContainer,
  iN as Checkbox,
  SR as ConfirmModal,
  yZ as DataTable,
  bZ as DataTableWithDetail,
  v7 as Dropdown,
  pD as DropdownCheckboxItem,
  dD as DropdownContent,
  y7 as DropdownGroup,
  fD as DropdownItem,
  mD as DropdownLabel,
  b7 as DropdownPortal,
  x7 as DropdownRadioGroup,
  hD as DropdownRadioItem,
  vD as DropdownSeparator,
  gD as DropdownShortcut,
  w7 as DropdownSub,
  uD as DropdownSubContent,
  lD as DropdownSubTrigger,
  g7 as DropdownTrigger,
  QO as GlobalLoader,
  J7 as GlobalLoaderProvider,
  c0 as Input,
  HX as LineChart,
  wR as Modal,
  m7 as ModalClose,
  G0 as ModalContent,
  J0 as ModalDescription,
  X0 as ModalFooter,
  Y0 as ModalHeader,
  H0 as ModalOverlay,
  xR as ModalPortal,
  Z0 as ModalTitle,
  h7 as ModalTrigger,
  JO as Navbar,
  gZ as PageLayout,
  YX as PieChart,
  SZ as ProtectedRoute,
  lj as RadioGroup,
  uj as RadioGroupItem,
  JD as SearchableSelect,
  GD as Select,
  lS as SelectContent,
  E7 as SelectGroup,
  uS as SelectItem,
  XD as SelectLabel,
  cS as SelectScrollDownButton,
  sS as SelectScrollUpButton,
  ZD as SelectSeparator,
  iS as SelectTrigger,
  YD as SelectValue,
  wZ as Sheet,
  EZ as SheetClose,
  JX as SheetContent,
  r7 as SheetDescription,
  e7 as SheetFooter,
  QX as SheetHeader,
  e_ as SheetOverlay,
  XX as SheetPortal,
  t7 as SheetTitle,
  xZ as SheetTrigger,
  PO as Sidebar,
  w2 as SidebarContent,
  x2 as SidebarFooter,
  b2 as SidebarHeader,
  E2 as SidebarNav,
  S2 as SidebarNavItem,
  vj as Switch,
  xO as Table,
  SO as TableBody,
  y2 as TableCaption,
  zi as TableCell,
  g2 as TableFooter,
  OO as TableHead,
  EO as TableHeader,
  Zo as TableRow,
  S7 as Tabs,
  Ej as TabsContent,
  wj as TabsList,
  xj as TabsTrigger,
  X7 as ThemeProvider,
  lO as Toast,
  qj as ToastAction,
  dO as ToastDescription,
  Wj as ToastProvider,
  uO as ToastTitle,
  cO as ToastViewport,
  O7 as Toaster,
  C7 as Tooltip,
  v2 as TooltipContent,
  A7 as TooltipProvider,
  T7 as TooltipTrigger,
  qk as badgeVariants,
  Fk as buttonVariants,
  V as cn,
  t$ as getApiBaseURL,
  r$ as getIdentityManagementURL,
  Bk as getInitials,
  Yr as httpClient,
  Xj as reducer,
  G7 as setApiBaseURL,
  H7 as setGlobalLoaderContext,
  Y7 as setIdentityManagementURL,
  $d as toast,
  Uj as toastIcons,
  CZ as useApi,
  TZ as useAppNavigation,
  r_ as useAuth,
  _Z as useBreadcrumbs,
  AZ as useFormErrors,
  Z7 as useGlobalLoader,
  NZ as useNotifications,
  kZ as usePermissions,
  o$ as useTheme,
  fO as useToast
};
