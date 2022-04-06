Sirv.define('polyfill', function () {
  var moduleName = 'polyfill';

  var _Promise;

  !function (t) {
    var n = {};

    function r(e) {
      if (n[e]) return n[e].exports;
      var o = n[e] = {
        i: e,
        l: !1,
        exports: {}
      };
      return t[e].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }

    r.m = t, r.c = n, r.d = function (t, n, e) {
      r.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: e
      });
    }, r.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, r.t = function (t, n) {
      if (1 & n && (t = r(t)), 8 & n) return t;
      if (4 & n && "object" == typeof t && t && t.__esModule) return t;
      var e = Object.create(null);
      if (r.r(e), Object.defineProperty(e, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var o in t) {
        r.d(e, o, function (n) {
          return t[n];
        }.bind(null, o));
      }
      return e;
    }, r.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return r.d(n, "a", n), n;
    }, r.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, r.p = "", r(r.s = 35);
  }([function (t, n) {
    var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = r);
  }, function (t, n, r) {
    var e = r(26)("wks"),
        o = r(27),
        i = r(0).Symbol,
        u = "function" == typeof i;
    (t.exports = function (t) {
      return e[t] || (e[t] = u && i[t] || (u ? i : o)("Symbol." + t));
    }).store = e;
  }, function (t, n) {
    var r = t.exports = {
      version: "2.6.11"
    };
    "number" == typeof __e && (__e = r);
  }, function (t, n, r) {
    var e = r(5);

    t.exports = function (t) {
      if (!e(t)) throw TypeError(t + " is not an object!");
      return t;
    };
  }, function (t, n, r) {
    var e = r(11),
        o = r(24);
    t.exports = r(6) ? function (t, n, r) {
      return e.f(t, n, o(1, r));
    } : function (t, n, r) {
      return t[n] = r, t;
    };
  }, function (t, n) {
    t.exports = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    };
  }, function (t, n, r) {
    t.exports = !r(23)(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function () {
          return 7;
        }
      }).a;
    });
  }, function (t, n) {
    t.exports = {};
  }, function (t, n, r) {
    var e = r(0),
        o = r(2),
        i = r(9),
        u = r(4),
        c = r(12),
        s = function (t, n, r) {
      var f,
          a,
          l,
          p = t & s.F,
          v = t & s.G,
          h = t & s.S,
          d = t & s.P,
          y = t & s.B,
          m = t & s.W,
          _ = v ? o : o[n] || (o[n] = {}),
          x = _.prototype,
          g = v ? e : h ? e[n] : (e[n] || {}).prototype;

      for (f in v && (r = n), r) {
        (a = !p && g && void 0 !== g[f]) && c(_, f) || (l = a ? g[f] : r[f], _[f] = v && "function" != typeof g[f] ? r[f] : y && a ? i(l, e) : m && g[f] == l ? function (t) {
          var n = function (n, r, e) {
            if (this instanceof t) {
              switch (arguments.length) {
                case 0:
                  return new t();

                case 1:
                  return new t(n);

                case 2:
                  return new t(n, r);
              }

              return new t(n, r, e);
            }

            return t.apply(this, arguments);
          };

          return n.prototype = t.prototype, n;
        }(l) : d && "function" == typeof l ? i(Function.call, l) : l, d && ((_.virtual || (_.virtual = {}))[f] = l, t & s.R && x && !x[f] && u(x, f, l)));
      }
    };

    s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s;
  }, function (t, n, r) {
    var e = r(10);

    t.exports = function (t, n, r) {
      if (e(t), void 0 === n) return t;

      switch (r) {
        case 1:
          return function (r) {
            return t.call(n, r);
          };

        case 2:
          return function (r, e) {
            return t.call(n, r, e);
          };

        case 3:
          return function (r, e, o) {
            return t.call(n, r, e, o);
          };
      }

      return function () {
        return t.apply(n, arguments);
      };
    };
  }, function (t, n) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");
      return t;
    };
  }, function (t, n, r) {
    var e = r(3),
        o = r(41),
        i = r(42),
        u = Object.defineProperty;
    n.f = r(6) ? Object.defineProperty : function (t, n, r) {
      if (e(t), n = i(n, !0), e(r), o) try {
        return u(t, n, r);
      } catch (t) {}
      if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
      return "value" in r && (t[n] = r.value), t;
    };
  }, function (t, n) {
    var r = {}.hasOwnProperty;

    t.exports = function (t, n) {
      return r.call(t, n);
    };
  }, function (t, n) {
    var r = {}.toString;

    t.exports = function (t) {
      return r.call(t).slice(8, -1);
    };
  }, function (t, n) {
    var r = Math.ceil,
        e = Math.floor;

    t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? e : r)(t);
    };
  }, function (t, n) {
    t.exports = function (t) {
      if (null == t) throw TypeError("Can't call method on  " + t);
      return t;
    };
  }, function (t, n) {
    t.exports = !0;
  }, function (t, n, r) {
    var e = r(5),
        o = r(0).document,
        i = e(o) && e(o.createElement);

    t.exports = function (t) {
      return i ? o.createElement(t) : {};
    };
  }, function (t, n, r) {
    var e = r(49),
        o = r(15);

    t.exports = function (t) {
      return e(o(t));
    };
  }, function (t, n, r) {
    var e = r(26)("keys"),
        o = r(27);

    t.exports = function (t) {
      return e[t] || (e[t] = o(t));
    };
  }, function (t, n, r) {
    var e = r(11).f,
        o = r(12),
        i = r(1)("toStringTag");

    t.exports = function (t, n, r) {
      t && !o(t = r ? t : t.prototype, i) && e(t, i, {
        configurable: !0,
        value: n
      });
    };
  }, function (t, n, r) {
    "use strict";

    var e = r(10);

    function o(t) {
      var n, r;
      this.promise = new t(function (t, e) {
        if (void 0 !== n || void 0 !== r) throw TypeError("Bad Promise constructor");
        n = t, r = e;
      }), this.resolve = e(n), this.reject = e(r);
    }

    t.exports.f = function (t) {
      return new o(t);
    };
  }, function (t, n, r) {
    "use strict";

    var e = r(16),
        o = r(8),
        i = r(43),
        u = r(4),
        c = r(7),
        s = r(44),
        f = r(20),
        a = r(52),
        l = r(1)("iterator"),
        p = !([].keys && "next" in [].keys()),
        v = function () {
      return this;
    };

    t.exports = function (t, n, r, h, d, y, m) {
      s(r, n, h);

      var _,
          x,
          g,
          b = function (t) {
        if (!p && t in j) return j[t];

        switch (t) {
          case "keys":
          case "values":
            return function () {
              return new r(this, t);
            };
        }

        return function () {
          return new r(this, t);
        };
      },
          w = n + " Iterator",
          S = "values" == d,
          P = !1,
          j = t.prototype,
          O = j[l] || j["@@iterator"] || d && j[d],
          T = O || b(d),
          M = d ? S ? b("entries") : T : void 0,
          L = "Array" == n && j.entries || O;

      if (L && (g = a(L.call(new t()))) !== Object.prototype && g.next && (f(g, w, !0), e || "function" == typeof g[l] || u(g, l, v)), S && O && "values" !== O.name && (P = !0, T = function () {
        return O.call(this);
      }), e && !m || !p && !P && j[l] || u(j, l, T), c[n] = T, c[w] = v, d) if (_ = {
        values: S ? T : b("values"),
        keys: y ? T : b("keys"),
        entries: M
      }, m) for (x in _) {
        x in j || i(j, x, _[x]);
      } else o(o.P + o.F * (p || P), n, _);
      return _;
    };
  }, function (t, n) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  }, function (t, n) {
    t.exports = function (t, n) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: n
      };
    };
  }, function (t, n, r) {
    var e = r(14),
        o = Math.min;

    t.exports = function (t) {
      return t > 0 ? o(e(t), 9007199254740991) : 0;
    };
  }, function (t, n, r) {
    var e = r(2),
        o = r(0),
        i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    (t.exports = function (t, n) {
      return i[t] || (i[t] = void 0 !== n ? n : {});
    })("versions", []).push({
      version: e.version,
      mode: r(16) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  }, function (t, n) {
    var r = 0,
        e = Math.random();

    t.exports = function (t) {
      return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++r + e).toString(36));
    };
  }, function (t, n) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (t, n, r) {
    var e = r(0).document;
    t.exports = e && e.documentElement;
  }, function (t, n, r) {
    var e = r(13),
        o = r(1)("toStringTag"),
        i = "Arguments" == e(function () {
      return arguments;
    }());

    t.exports = function (t) {
      var n, r, u;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = function (t, n) {
        try {
          return t[n];
        } catch (t) {}
      }(n = Object(t), o)) ? r : i ? e(n) : "Object" == (u = e(n)) && "function" == typeof n.callee ? "Arguments" : u;
    };
  }, function (t, n, r) {
    var e = r(3),
        o = r(10),
        i = r(1)("species");

    t.exports = function (t, n) {
      var r,
          u = e(t).constructor;
      return void 0 === u || null == (r = e(u)[i]) ? n : o(r);
    };
  }, function (t, n, r) {
    var e,
        o,
        i,
        u = r(9),
        c = r(64),
        s = r(29),
        f = r(17),
        a = r(0),
        l = a.process,
        p = a.setImmediate,
        v = a.clearImmediate,
        h = a.MessageChannel,
        d = a.Dispatch,
        y = 0,
        m = {},
        _ = function () {
      var t = +this;

      if (m.hasOwnProperty(t)) {
        var n = m[t];
        delete m[t], n();
      }
    },
        x = function (t) {
      _.call(t.data);
    };

    p && v || (p = function (t) {
      for (var n = [], r = 1; arguments.length > r;) {
        n.push(arguments[r++]);
      }

      return m[++y] = function () {
        c("function" == typeof t ? t : Function(t), n);
      }, e(y), y;
    }, v = function (t) {
      delete m[t];
    }, "process" == r(13)(l) ? e = function (t) {
      l.nextTick(u(_, t, 1));
    } : d && d.now ? e = function (t) {
      d.now(u(_, t, 1));
    } : h ? (i = (o = new h()).port2, o.port1.onmessage = x, e = u(i.postMessage, i, 1)) : a.addEventListener && "function" == typeof postMessage && !a.importScripts ? (e = function (t) {
      a.postMessage(t + "", "*");
    }, a.addEventListener("message", x, !1)) : e = "onreadystatechange" in f("script") ? function (t) {
      s.appendChild(f("script")).onreadystatechange = function () {
        s.removeChild(this), _.call(t);
      };
    } : function (t) {
      setTimeout(u(_, t, 1), 0);
    }), t.exports = {
      set: p,
      clear: v
    };
  }, function (t, n) {
    t.exports = function (t) {
      try {
        return {
          e: !1,
          v: t()
        };
      } catch (t) {
        return {
          e: !0,
          v: t
        };
      }
    };
  }, function (t, n, r) {
    var e = r(3),
        o = r(5),
        i = r(21);

    t.exports = function (t, n) {
      if (e(t), o(n) && n.constructor === t) return n;
      var r = i.f(t);
      return (0, r.resolve)(n), r.promise;
    };
  }, function (t, n, r) {
    _Promise = r(36).default;
  }, function (t, n, r) {
    t.exports = {
      default: r(37),
      __esModule: !0
    };
  }, function (t, n, r) {
    r(38), r(39), r(54), r(58), r(70), r(71), t.exports = r(2).Promise;
  }, function (t, n) {}, function (t, n, r) {
    "use strict";

    var e = r(40)(!0);
    r(22)(String, "String", function (t) {
      this._t = String(t), this._i = 0;
    }, function () {
      var t,
          n = this._t,
          r = this._i;
      return r >= n.length ? {
        value: void 0,
        done: !0
      } : (t = e(n, r), this._i += t.length, {
        value: t,
        done: !1
      });
    });
  }, function (t, n, r) {
    var e = r(14),
        o = r(15);

    t.exports = function (t) {
      return function (n, r) {
        var i,
            u,
            c = String(o(n)),
            s = e(r),
            f = c.length;
        return s < 0 || s >= f ? t ? "" : void 0 : (i = c.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === f || (u = c.charCodeAt(s + 1)) < 56320 || u > 57343 ? t ? c.charAt(s) : i : t ? c.slice(s, s + 2) : u - 56320 + (i - 55296 << 10) + 65536;
      };
    };
  }, function (t, n, r) {
    t.exports = !r(6) && !r(23)(function () {
      return 7 != Object.defineProperty(r(17)("div"), "a", {
        get: function () {
          return 7;
        }
      }).a;
    });
  }, function (t, n, r) {
    var e = r(5);

    t.exports = function (t, n) {
      if (!e(t)) return t;
      var r, o;
      if (n && "function" == typeof (r = t.toString) && !e(o = r.call(t))) return o;
      if ("function" == typeof (r = t.valueOf) && !e(o = r.call(t))) return o;
      if (!n && "function" == typeof (r = t.toString) && !e(o = r.call(t))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function (t, n, r) {
    t.exports = r(4);
  }, function (t, n, r) {
    "use strict";

    var e = r(45),
        o = r(24),
        i = r(20),
        u = {};
    r(4)(u, r(1)("iterator"), function () {
      return this;
    }), t.exports = function (t, n, r) {
      t.prototype = e(u, {
        next: o(1, r)
      }), i(t, n + " Iterator");
    };
  }, function (t, n, r) {
    var e = r(3),
        o = r(46),
        i = r(28),
        u = r(19)("IE_PROTO"),
        c = function () {},
        s = function () {
      var t,
          n = r(17)("iframe"),
          e = i.length;

      for (n.style.display = "none", r(29).appendChild(n), n.src = "javascript:", (t = n.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), s = t.F; e--;) {
        delete s.prototype[i[e]];
      }

      return s();
    };

    t.exports = Object.create || function (t, n) {
      var r;
      return null !== t ? (c.prototype = e(t), r = new c(), c.prototype = null, r[u] = t) : r = s(), void 0 === n ? r : o(r, n);
    };
  }, function (t, n, r) {
    var e = r(11),
        o = r(3),
        i = r(47);
    t.exports = r(6) ? Object.defineProperties : function (t, n) {
      o(t);

      for (var r, u = i(n), c = u.length, s = 0; c > s;) {
        e.f(t, r = u[s++], n[r]);
      }

      return t;
    };
  }, function (t, n, r) {
    var e = r(48),
        o = r(28);

    t.exports = Object.keys || function (t) {
      return e(t, o);
    };
  }, function (t, n, r) {
    var e = r(12),
        o = r(18),
        i = r(50)(!1),
        u = r(19)("IE_PROTO");

    t.exports = function (t, n) {
      var r,
          c = o(t),
          s = 0,
          f = [];

      for (r in c) {
        r != u && e(c, r) && f.push(r);
      }

      for (; n.length > s;) {
        e(c, r = n[s++]) && (~i(f, r) || f.push(r));
      }

      return f;
    };
  }, function (t, n, r) {
    var e = r(13);
    t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
      return "String" == e(t) ? t.split("") : Object(t);
    };
  }, function (t, n, r) {
    var e = r(18),
        o = r(25),
        i = r(51);

    t.exports = function (t) {
      return function (n, r, u) {
        var c,
            s = e(n),
            f = o(s.length),
            a = i(u, f);

        if (t && r != r) {
          for (; f > a;) {
            if ((c = s[a++]) != c) return !0;
          }
        } else for (; f > a; a++) {
          if ((t || a in s) && s[a] === r) return t || a || 0;
        }

        return !t && -1;
      };
    };
  }, function (t, n, r) {
    var e = r(14),
        o = Math.max,
        i = Math.min;

    t.exports = function (t, n) {
      return (t = e(t)) < 0 ? o(t + n, 0) : i(t, n);
    };
  }, function (t, n, r) {
    var e = r(12),
        o = r(53),
        i = r(19)("IE_PROTO"),
        u = Object.prototype;

    t.exports = Object.getPrototypeOf || function (t) {
      return t = o(t), e(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null;
    };
  }, function (t, n, r) {
    var e = r(15);

    t.exports = function (t) {
      return Object(e(t));
    };
  }, function (t, n, r) {
    r(55);

    for (var e = r(0), o = r(4), i = r(7), u = r(1)("toStringTag"), c = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), s = 0; s < c.length; s++) {
      var f = c[s],
          a = e[f],
          l = a && a.prototype;
      l && !l[u] && o(l, u, f), i[f] = i.Array;
    }
  }, function (t, n, r) {
    "use strict";

    var e = r(56),
        o = r(57),
        i = r(7),
        u = r(18);
    t.exports = r(22)(Array, "Array", function (t, n) {
      this._t = u(t), this._i = 0, this._k = n;
    }, function () {
      var t = this._t,
          n = this._k,
          r = this._i++;
      return !t || r >= t.length ? (this._t = void 0, o(1)) : o(0, "keys" == n ? r : "values" == n ? t[r] : [r, t[r]]);
    }, "values"), i.Arguments = i.Array, e("keys"), e("values"), e("entries");
  }, function (t, n) {
    t.exports = function () {};
  }, function (t, n) {
    t.exports = function (t, n) {
      return {
        value: n,
        done: !!t
      };
    };
  }, function (t, n, r) {
    "use strict";

    var e,
        o,
        i,
        u,
        c = r(16),
        s = r(0),
        f = r(9),
        a = r(30),
        l = r(8),
        p = r(5),
        v = r(10),
        h = r(59),
        d = r(60),
        y = r(31),
        m = r(32).set,
        _ = r(65)(),
        x = r(21),
        g = r(33),
        b = r(66),
        w = r(34),
        S = s.TypeError,
        P = s.process,
        j = P && P.versions,
        O = j && j.v8 || "",
        T = s.Promise,
        M = "process" == a(P),
        L = function () {},
        E = o = x.f,
        k = !!function () {
      try {
        var t = T.resolve(1),
            n = (t.constructor = {})[r(1)("species")] = function (t) {
          t(L, L);
        };

        return (M || "function" == typeof PromiseRejectionEvent) && t.then(L) instanceof n && 0 !== O.indexOf("6.6") && -1 === b.indexOf("Chrome/66");
      } catch (t) {}
    }(),
        A = function (t) {
      var n;
      return !(!p(t) || "function" != typeof (n = t.then)) && n;
    },
        C = function (t, n) {
      if (!t._n) {
        t._n = !0;
        var r = t._c;

        _(function () {
          for (var e = t._v, o = 1 == t._s, i = 0, u = function (n) {
            var r,
                i,
                u,
                c = o ? n.ok : n.fail,
                s = n.resolve,
                f = n.reject,
                a = n.domain;

            try {
              c ? (o || (2 == t._h && I(t), t._h = 1), !0 === c ? r = e : (a && a.enter(), r = c(e), a && (a.exit(), u = !0)), r === n.promise ? f(S("Promise-chain cycle")) : (i = A(r)) ? i.call(r, s, f) : s(r)) : f(e);
            } catch (t) {
              a && !u && a.exit(), f(t);
            }
          }; r.length > i;) {
            u(r[i++]);
          }

          t._c = [], t._n = !1, n && !t._h && R(t);
        });
      }
    },
        R = function (t) {
      m.call(s, function () {
        var n,
            r,
            e,
            o = t._v,
            i = F(t);
        if (i && (n = g(function () {
          M ? P.emit("unhandledRejection", o, t) : (r = s.onunhandledrejection) ? r({
            promise: t,
            reason: o
          }) : (e = s.console) && e.error && e.error("Unhandled promise rejection", o);
        }), t._h = M || F(t) ? 2 : 1), t._a = void 0, i && n.e) throw n.v;
      });
    },
        F = function (t) {
      return 1 !== t._h && 0 === (t._a || t._c).length;
    },
        I = function (t) {
      m.call(s, function () {
        var n;
        M ? P.emit("rejectionHandled", t) : (n = s.onrejectionhandled) && n({
          promise: t,
          reason: t._v
        });
      });
    },
        G = function (t) {
      var n = this;
      n._d || (n._d = !0, (n = n._w || n)._v = t, n._s = 2, n._a || (n._a = n._c.slice()), C(n, !0));
    },
        N = function (t) {
      var n,
          r = this;

      if (!r._d) {
        r._d = !0, r = r._w || r;

        try {
          if (r === t) throw S("Promise can't be resolved itself");
          (n = A(t)) ? _(function () {
            var e = {
              _w: r,
              _d: !1
            };

            try {
              n.call(t, f(N, e, 1), f(G, e, 1));
            } catch (t) {
              G.call(e, t);
            }
          }) : (r._v = t, r._s = 1, C(r, !1));
        } catch (t) {
          G.call({
            _w: r,
            _d: !1
          }, t);
        }
      }
    };

    k || (T = function (t) {
      h(this, T, "Promise", "_h"), v(t), e.call(this);

      try {
        t(f(N, this, 1), f(G, this, 1));
      } catch (t) {
        G.call(this, t);
      }
    }, (e = function (t) {
      this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
    }).prototype = r(67)(T.prototype, {
      then: function (t, n) {
        var r = E(y(this, T));
        return r.ok = "function" != typeof t || t, r.fail = "function" == typeof n && n, r.domain = M ? P.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && C(this, !1), r.promise;
      },
      catch: function (t) {
        return this.then(void 0, t);
      }
    }), i = function () {
      var t = new e();
      this.promise = t, this.resolve = f(N, t, 1), this.reject = f(G, t, 1);
    }, x.f = E = function (t) {
      return t === T || t === u ? new i(t) : o(t);
    }), l(l.G + l.W + l.F * !k, {
      Promise: T
    }), r(20)(T, "Promise"), r(68)("Promise"), u = r(2).Promise, l(l.S + l.F * !k, "Promise", {
      reject: function (t) {
        var n = E(this);
        return (0, n.reject)(t), n.promise;
      }
    }), l(l.S + l.F * (c || !k), "Promise", {
      resolve: function (t) {
        return w(c && this === u ? T : this, t);
      }
    }), l(l.S + l.F * !(k && r(69)(function (t) {
      T.all(t).catch(L);
    })), "Promise", {
      all: function (t) {
        var n = this,
            r = E(n),
            e = r.resolve,
            o = r.reject,
            i = g(function () {
          var r = [],
              i = 0,
              u = 1;
          d(t, !1, function (t) {
            var c = i++,
                s = !1;
            r.push(void 0), u++, n.resolve(t).then(function (t) {
              s || (s = !0, r[c] = t, --u || e(r));
            }, o);
          }), --u || e(r);
        });
        return i.e && o(i.v), r.promise;
      },
      race: function (t) {
        var n = this,
            r = E(n),
            e = r.reject,
            o = g(function () {
          d(t, !1, function (t) {
            n.resolve(t).then(r.resolve, e);
          });
        });
        return o.e && e(o.v), r.promise;
      }
    });
  }, function (t, n) {
    t.exports = function (t, n, r, e) {
      if (!(t instanceof n) || void 0 !== e && e in t) throw TypeError(r + ": incorrect invocation!");
      return t;
    };
  }, function (t, n, r) {
    var e = r(9),
        o = r(61),
        i = r(62),
        u = r(3),
        c = r(25),
        s = r(63),
        f = {},
        a = {};
    (n = t.exports = function (t, n, r, l, p) {
      var v,
          h,
          d,
          y,
          m = p ? function () {
        return t;
      } : s(t),
          _ = e(r, l, n ? 2 : 1),
          x = 0;

      if ("function" != typeof m) throw TypeError(t + " is not iterable!");

      if (i(m)) {
        for (v = c(t.length); v > x; x++) {
          if ((y = n ? _(u(h = t[x])[0], h[1]) : _(t[x])) === f || y === a) return y;
        }
      } else for (d = m.call(t); !(h = d.next()).done;) {
        if ((y = o(d, _, h.value, n)) === f || y === a) return y;
      }
    }).BREAK = f, n.RETURN = a;
  }, function (t, n, r) {
    var e = r(3);

    t.exports = function (t, n, r, o) {
      try {
        return o ? n(e(r)[0], r[1]) : n(r);
      } catch (n) {
        var i = t.return;
        throw void 0 !== i && e(i.call(t)), n;
      }
    };
  }, function (t, n, r) {
    var e = r(7),
        o = r(1)("iterator"),
        i = Array.prototype;

    t.exports = function (t) {
      return void 0 !== t && (e.Array === t || i[o] === t);
    };
  }, function (t, n, r) {
    var e = r(30),
        o = r(1)("iterator"),
        i = r(7);

    t.exports = r(2).getIteratorMethod = function (t) {
      if (null != t) return t[o] || t["@@iterator"] || i[e(t)];
    };
  }, function (t, n) {
    t.exports = function (t, n, r) {
      var e = void 0 === r;

      switch (n.length) {
        case 0:
          return e ? t() : t.call(r);

        case 1:
          return e ? t(n[0]) : t.call(r, n[0]);

        case 2:
          return e ? t(n[0], n[1]) : t.call(r, n[0], n[1]);

        case 3:
          return e ? t(n[0], n[1], n[2]) : t.call(r, n[0], n[1], n[2]);

        case 4:
          return e ? t(n[0], n[1], n[2], n[3]) : t.call(r, n[0], n[1], n[2], n[3]);
      }

      return t.apply(r, n);
    };
  }, function (t, n, r) {
    var e = r(0),
        o = r(32).set,
        i = e.MutationObserver || e.WebKitMutationObserver,
        u = e.process,
        c = e.Promise,
        s = "process" == r(13)(u);

    t.exports = function () {
      var t,
          n,
          r,
          f = function () {
        var e, o;

        for (s && (e = u.domain) && e.exit(); t;) {
          o = t.fn, t = t.next;

          try {
            o();
          } catch (e) {
            throw t ? r() : n = void 0, e;
          }
        }

        n = void 0, e && e.enter();
      };

      if (s) r = function () {
        u.nextTick(f);
      };else if (!i || e.navigator && e.navigator.standalone) {
        if (c && c.resolve) {
          var a = c.resolve(void 0);

          r = function () {
            a.then(f);
          };
        } else r = function () {
          o.call(e, f);
        };
      } else {
        var l = !0,
            p = document.createTextNode("");
        new i(f).observe(p, {
          characterData: !0
        }), r = function () {
          p.data = l = !l;
        };
      }
      return function (e) {
        var o = {
          fn: e,
          next: void 0
        };
        n && (n.next = o), t || (t = o, r()), n = o;
      };
    };
  }, function (t, n, r) {
    var e = r(0).navigator;
    t.exports = e && e.userAgent || "";
  }, function (t, n, r) {
    var e = r(4);

    t.exports = function (t, n, r) {
      for (var o in n) {
        r && t[o] ? t[o] = n[o] : e(t, o, n[o]);
      }

      return t;
    };
  }, function (t, n, r) {
    "use strict";

    var e = r(0),
        o = r(2),
        i = r(11),
        u = r(6),
        c = r(1)("species");

    t.exports = function (t) {
      var n = "function" == typeof o[t] ? o[t] : e[t];
      u && n && !n[c] && i.f(n, c, {
        configurable: !0,
        get: function () {
          return this;
        }
      });
    };
  }, function (t, n, r) {
    var e = r(1)("iterator"),
        o = !1;

    try {
      var i = [7][e]();
      i.return = function () {
        o = !0;
      }, Array.from(i, function () {
        throw 2;
      });
    } catch (t) {}

    t.exports = function (t, n) {
      if (!n && !o) return !1;
      var r = !1;

      try {
        var i = [7],
            u = i[e]();
        u.next = function () {
          return {
            done: r = !0
          };
        }, i[e] = function () {
          return u;
        }, t(i);
      } catch (t) {}

      return r;
    };
  }, function (t, n, r) {
    "use strict";

    var e = r(8),
        o = r(2),
        i = r(0),
        u = r(31),
        c = r(34);
    e(e.P + e.R, "Promise", {
      finally: function (t) {
        var n = u(this, o.Promise || i.Promise),
            r = "function" == typeof t;
        return this.then(r ? function (r) {
          return c(n, t()).then(function () {
            return r;
          });
        } : t, r ? function (r) {
          return c(n, t()).then(function () {
            throw r;
          });
        } : t);
      }
    });
  }, function (t, n, r) {
    "use strict";

    var e = r(8),
        o = r(21),
        i = r(33);
    e(e.S, "Promise", {
      try: function (t) {
        var n = o.f(this),
            r = i(t);
        return (r.e ? n.reject : n.resolve)(r.v), n.promise;
      }
    });
  }]);
  return {
    Promise: _Promise
  };
});
//# sourceMappingURL=polyfill.js.map
