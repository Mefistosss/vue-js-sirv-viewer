(() => {
  /**
  * @license
  * Video.js 7.14.3 <http://videojs.com/>
  * Copyright Brightcove, Inc. <https://www.brightcove.com/>
  * Available under Apache License Version 2.0
  * <https://github.com/videojs/video.js/blob/main/LICENSE>
  *
  * Includes vtt.js <https://github.com/mozilla/vtt.js>
  * Available under Apache License Version 2.0
  * <https://github.com/mozilla/vtt.js/blob/main/LICENSE>
  */
  !function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).videojs = t();
  }(this, function () {
    "use strict";

    var u = "7.14.3",
        e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function t(e, t) {
      return e(t = {
        exports: {}
      }, t.exports), t.exports;
    }

    for (var i, _ = "undefined" != typeof window ? window : "undefined" != typeof e ? e : "undefined" != typeof self ? self : {}, n = "undefined" != typeof e ? e : "undefined" != typeof window ? window : {}, r = "undefined" != typeof document ? document : (r = n["__GLOBAL_DOCUMENT_CACHE@4"]) || (n["__GLOBAL_DOCUMENT_CACHE@4"] = {}), d = r, l = {
      prefixed: !0
    }, a = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror", "fullscreen"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror", "-webkit-full-screen"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror", "-moz-full-screen"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError", "-ms-fullscreen"]], s = a[0], o = 0; o < a.length; o++) if (a[o][1] in d) {
      i = a[o];
      break;
    }

    if (i) {
      for (var c = 0; c < i.length; c++) l[s[c]] = i[c];

      l.prefixed = i[0] !== s[0];
    }

    var h = [],
        p = function (a, s) {
      return function (e, t, i) {
        var n,
            r = s.levels[t],
            t = new RegExp("^(" + r + ")$");
        "log" !== e && i.unshift(e.toUpperCase() + ":"), i.unshift(a + ":"), h && (h.push([].concat(i)), n = h.length - 1e3, h.splice(0, 0 < n ? n : 0)), !_.console || (n = !(n = _.console[e]) && "debug" === e ? _.console.info || _.console.log : n) && r && t.test(e) && n[Array.isArray(i) ? "apply" : "call"](_.console, i);
      };
    };

    var f = function t(i) {
      function n() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        a("log", r, t);
      }

      var r = "info",
          a = p(i, n);
      return n.createLogger = function (e) {
        return t(i + ": " + e);
      }, n.levels = {
        all: "debug|log|warn|error",
        off: "",
        debug: "debug|log|warn|error",
        info: "log|warn|error",
        warn: "warn|error",
        error: "error",
        DEFAULT: r
      }, n.level = function (e) {
        if ("string" == typeof e) {
          if (!n.levels.hasOwnProperty(e)) throw new Error('"' + e + '" in not a valid log level');
          r = e;
        }

        return r;
      }, (n.history = function () {
        return h ? [].concat(h) : [];
      }).filter = function (t) {
        return (h || []).filter(function (e) {
          return new RegExp(".*" + t + ".*").test(e[0]);
        });
      }, n.history.clear = function () {
        h && (h.length = 0);
      }, n.history.disable = function () {
        null !== h && (h.length = 0, h = null);
      }, n.history.enable = function () {
        null === h && (h = []);
      }, n.error = function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        return a("error", r, t);
      }, n.warn = function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        return a("warn", r, t);
      }, n.debug = function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        return a("debug", r, t);
      }, n;
    }("VIDEOJS"),
        m = f.createLogger,
        g = t(function (e) {
      function t() {
        return e.exports = t = Object.assign || function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var i,
                n = arguments[t];

            for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
          }

          return e;
        }, t.apply(this, arguments);
      }

      e.exports = t;
    }),
        y = Object.prototype.toString,
        v = function (e) {
      return S(e) ? Object.keys(e) : [];
    };

    function b(t, i) {
      v(t).forEach(function (e) {
        return i(t[e], e);
      });
    }

    function T(i) {
      for (var e = arguments.length, t = new Array(1 < e ? e - 1 : 0), n = 1; n < e; n++) t[n - 1] = arguments[n];

      return Object.assign ? g.apply(void 0, [i].concat(t)) : (t.forEach(function (e) {
        e && b(e, function (e, t) {
          i[t] = e;
        });
      }), i);
    }

    function S(e) {
      return !!e && "object" == typeof e;
    }

    function E(e) {
      return S(e) && "[object Object]" === y.call(e) && e.constructor === Object;
    }

    function k(e, t) {
      if (!e || !t) return "";
      if ("function" != typeof _.getComputedStyle) return "";
      var i;

      try {
        i = _.getComputedStyle(e);
      } catch (e) {
        return "";
      }

      return i ? i.getPropertyValue(t) || i[t] : "";
    }

    var C = _.navigator && _.navigator.userAgent || "",
        w = /AppleWebKit\/([\d.]+)/i.exec(C),
        I = w ? parseFloat(w.pop()) : null,
        x = /iPod/i.test(C),
        A = (zt = C.match(/OS (\d+)_/i)) && zt[1] ? zt[1] : null,
        P = /Android/i.test(C),
        L = function () {
      var e = C.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
      if (!e) return null;
      var t = e[1] && parseFloat(e[1]),
          i = e[2] && parseFloat(e[2]);
      return t && i ? parseFloat(e[1] + "." + e[2]) : t || null;
    }(),
        D = P && L < 5 && I < 537,
        O = /Firefox/i.test(C),
        R = /Edg/i.test(C),
        M = !R && (/Chrome/i.test(C) || /CriOS/i.test(C)),
        N = (ii = C.match(/(Chrome|CriOS)\/(\d+)/)) && ii[2] ? parseFloat(ii[2]) : null,
        U = ni = !(ni = (ni = /MSIE\s(\d+)\.\d/.exec(C)) && parseFloat(ni[1])) && /Trident\/7.0/i.test(C) && /rv:11.0/.test(C) ? 11 : ni,
        B = /Safari/i.test(C) && !M && !P && !R,
        F = /Windows/i.test(C),
        j = Boolean(K() && ("ontouchstart" in _ || _.navigator.maxTouchPoints || _.DocumentTouch && _.document instanceof _.DocumentTouch)),
        H = /iPad/i.test(C) || B && j && !/iPhone/i.test(C),
        q = /iPhone/i.test(C) && !H,
        V = q || H || x,
        W = (B || V) && !M,
        z = Object.freeze({
      __proto__: null,
      IS_IPOD: x,
      IOS_VERSION: A,
      IS_ANDROID: P,
      ANDROID_VERSION: L,
      IS_NATIVE_ANDROID: D,
      IS_FIREFOX: O,
      IS_EDGE: R,
      IS_CHROME: M,
      CHROME_VERSION: N,
      IE_VERSION: U,
      IS_SAFARI: B,
      IS_WINDOWS: F,
      TOUCH_ENABLED: j,
      IS_IPAD: H,
      IS_IPHONE: q,
      IS_IOS: V,
      IS_ANY_SAFARI: W
    });

    function G(e) {
      return "string" == typeof e && Boolean(e.trim());
    }

    function X(e) {
      if (0 <= e.indexOf(" ")) throw new Error("class has illegal whitespace characters");
    }

    function K() {
      return d === _.document;
    }

    function Y(e) {
      return S(e) && 1 === e.nodeType;
    }

    function Q() {
      try {
        return _.parent !== _.self;
      } catch (e) {
        return !0;
      }
    }

    function $(i) {
      return function (e, t) {
        if (!G(e)) return d[i](null);
        t = Y(t = G(t) ? d.querySelector(t) : t) ? t : d;
        return t[i] && t[i](e);
      };
    }

    function J(e, i, t, n) {
      void 0 === i && (i = {}), void 0 === t && (t = {});
      var r = d.createElement(e = void 0 === e ? "div" : e);
      return Object.getOwnPropertyNames(i).forEach(function (e) {
        var t = i[e];
        -1 !== e.indexOf("aria-") || "role" === e || "type" === e ? (f.warn("Setting attributes in the second argument of createEl()\nhas been deprecated. Use the third argument instead.\ncreateEl(type, properties, attributes). Attempting to set " + e + " to " + t + "."), r.setAttribute(e, t)) : "textContent" === e ? Z(r, t) : r[e] === t && "tabIndex" !== e || (r[e] = t);
      }), Object.getOwnPropertyNames(t).forEach(function (e) {
        r.setAttribute(e, t[e]);
      }), n && ve(r, n), r;
    }

    function Z(e, t) {
      return "undefined" == typeof e.textContent ? e.innerText = t : e.textContent = t, e;
    }

    function ee(e, t) {
      t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e);
    }

    function te(e, t) {
      return X(t), e.classList ? e.classList.contains(t) : new RegExp("(^|\\s)" + t + "($|\\s)").test(e.className);
    }

    function ie(e, t) {
      return e.classList ? e.classList.add(t) : te(e, t) || (e.className = (e.className + " " + t).trim()), e;
    }

    function ne(e, t) {
      return e ? (e.classList ? e.classList.remove(t) : (X(t), e.className = e.className.split(/\s+/).filter(function (e) {
        return e !== t;
      }).join(" ")), e) : (f.warn("removeClass was called with an element that doesn't exist"), null);
    }

    function re(e, t, i) {
      var n = te(e, t);
      if ((i = "boolean" != typeof (i = "function" == typeof i ? i(e, t) : i) ? !n : i) !== n) return (i ? ie : ne)(e, t), e;
    }

    function ae(i, n) {
      Object.getOwnPropertyNames(n).forEach(function (e) {
        var t = n[e];
        null === t || "undefined" == typeof t || !1 === t ? i.removeAttribute(e) : i.setAttribute(e, !0 === t ? "" : t);
      });
    }

    function se(e) {
      var t = {},
          i = ",autoplay,controls,playsinline,loop,muted,default,defaultMuted,";
      if (e && e.attributes && 0 < e.attributes.length) for (var n = e.attributes, r = n.length - 1; 0 <= r; r--) {
        var a = n[r].name,
            s = n[r].value;
        "boolean" != typeof e[a] && -1 === i.indexOf("," + a + ",") || (s = null !== s), t[a] = s;
      }
      return t;
    }

    function oe(e, t) {
      return e.getAttribute(t);
    }

    function ue(e, t, i) {
      e.setAttribute(t, i);
    }

    function le(e, t) {
      e.removeAttribute(t);
    }

    function ce() {
      d.body.focus(), d.onselectstart = function () {
        return !1;
      };
    }

    function de() {
      d.onselectstart = function () {
        return !0;
      };
    }

    function he(e) {
      if (e && e.getBoundingClientRect && e.parentNode) {
        var t = e.getBoundingClientRect(),
            i = {};
        return ["bottom", "height", "left", "right", "top", "width"].forEach(function (e) {
          void 0 !== t[e] && (i[e] = t[e]);
        }), i.height || (i.height = parseFloat(k(e, "height"))), i.width || (i.width = parseFloat(k(e, "width"))), i;
      }
    }

    function pe(e) {
      if (!e || e && !e.offsetParent) return {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };

      for (var t = e.offsetWidth, i = e.offsetHeight, n = 0, r = 0; e.offsetParent && e !== d[l.fullscreenElement];) n += e.offsetLeft, r += e.offsetTop, e = e.offsetParent;

      return {
        left: n,
        top: r,
        width: t,
        height: i
      };
    }

    function fe(e, t) {
      var i = {
        x: 0,
        y: 0
      };
      if (V) for (var n = e; n && "html" !== n.nodeName.toLowerCase();) {
        var r,
            a = k(n, "transform");
        /^matrix/.test(a) ? (r = a.slice(7, -1).split(/,\s/).map(Number), i.x += r[4], i.y += r[5]) : /^matrix3d/.test(a) && (a = a.slice(9, -1).split(/,\s/).map(Number), i.x += a[12], i.y += a[13]), n = n.parentNode;
      }
      var s = {},
          o = pe(t.target),
          u = pe(e),
          l = u.width,
          c = u.height,
          e = t.offsetY - (u.top - o.top),
          o = t.offsetX - (u.left - o.left);
      return t.changedTouches && (o = t.changedTouches[0].pageX - u.left, e = t.changedTouches[0].pageY + u.top, V && (o -= i.x, e -= i.y)), s.y = 1 - Math.max(0, Math.min(1, e / c)), s.x = Math.max(0, Math.min(1, o / l)), s;
    }

    function me(e) {
      return S(e) && 3 === e.nodeType;
    }

    function ge(e) {
      for (; e.firstChild;) e.removeChild(e.firstChild);

      return e;
    }

    function ye(e) {
      return "function" == typeof e && (e = e()), (Array.isArray(e) ? e : [e]).map(function (e) {
        return Y(e = "function" == typeof e ? e() : e) || me(e) ? e : "string" == typeof e && /\S/.test(e) ? d.createTextNode(e) : void 0;
      }).filter(function (e) {
        return e;
      });
    }

    function ve(t, e) {
      return ye(e).forEach(function (e) {
        return t.appendChild(e);
      }), t;
    }

    function _e(e, t) {
      return ve(ge(e), t);
    }

    function be(e) {
      return void 0 === e.button && void 0 === e.buttons || 0 === e.button && void 0 === e.buttons || "mouseup" === e.type && 0 === e.button && 0 === e.buttons || 0 === e.button && 1 === e.buttons;
    }

    var Te,
        Se = $("querySelector"),
        Ee = $("querySelectorAll"),
        ke = Object.freeze({
      __proto__: null,
      isReal: K,
      isEl: Y,
      isInFrame: Q,
      createEl: J,
      textContent: Z,
      prependTo: ee,
      hasClass: te,
      addClass: ie,
      removeClass: ne,
      toggleClass: re,
      setAttributes: ae,
      getAttributes: se,
      getAttribute: oe,
      setAttribute: ue,
      removeAttribute: le,
      blockTextSelection: ce,
      unblockTextSelection: de,
      getBoundingClientRect: he,
      findPosition: pe,
      getPointerPosition: fe,
      isTextNode: me,
      emptyEl: ge,
      normalizeContent: ye,
      appendContent: ve,
      insertContent: _e,
      isSingleLeftClick: be,
      $: Se,
      $$: Ee
    }),
        Ce = !1,
        we = function () {
      if (!1 !== Te.options.autoSetup) {
        var e = Array.prototype.slice.call(d.getElementsByTagName("video")),
            t = Array.prototype.slice.call(d.getElementsByTagName("audio")),
            i = Array.prototype.slice.call(d.getElementsByTagName("video-js")),
            n = e.concat(t, i);
        if (n && 0 < n.length) for (var r = 0, a = n.length; r < a; r++) {
          var s = n[r];

          if (!s || !s.getAttribute) {
            Ie(1);
            break;
          }

          void 0 === s.player && null !== s.getAttribute("data-setup") && Te(s);
        } else Ce || Ie(1);
      }
    };

    function Ie(e, t) {
      K() && (t && (Te = t), _.setTimeout(we, e));
    }

    function xe() {
      Ce = !0, _.removeEventListener("load", xe);
    }

    K() && ("complete" === d.readyState ? xe() : _.addEventListener("load", xe));

    function Ae(e) {
      var t = d.createElement("style");
      return t.className = e, t;
    }

    function Pe(e, t) {
      e.styleSheet ? e.styleSheet.cssText = t : e.textContent = t;
    }

    var Le = 3;
    _.WeakMap || (rn = function () {
      function e() {
        this.vdata = "vdata" + Math.floor(_.performance && _.performance.now() || Date.now()), this.data = {};
      }

      var t = e.prototype;
      return t.set = function (e, t) {
        var i = e[this.vdata] || Le++;
        return e[this.vdata] || (e[this.vdata] = i), this.data[i] = t, this;
      }, t.get = function (e) {
        var t = e[this.vdata];
        if (t) return this.data[t];
        f("We have no data for this element", e);
      }, t.has = function (e) {
        return e[this.vdata] in this.data;
      }, t.delete = function (e) {
        var t = e[this.vdata];
        t && (delete this.data[t], delete e[this.vdata]);
      }, e;
    }());
    var De,
        Oe = new (_.WeakMap ? WeakMap : rn)();

    function Re(e, t) {
      var i;
      Oe.has(e) && (0 === (i = Oe.get(e)).handlers[t].length && (delete i.handlers[t], e.removeEventListener ? e.removeEventListener(t, i.dispatcher, !1) : e.detachEvent && e.detachEvent("on" + t, i.dispatcher)), Object.getOwnPropertyNames(i.handlers).length <= 0 && (delete i.handlers, delete i.dispatcher, delete i.disabled), 0 === Object.getOwnPropertyNames(i).length && Oe.delete(e));
    }

    function Me(t, i, e, n) {
      e.forEach(function (e) {
        t(i, e, n);
      });
    }

    function Ne(e) {
      if (e.fixed_) return e;

      function t() {
        return !0;
      }

      function i() {
        return !1;
      }

      if (!e || !e.isPropagationStopped || !e.isImmediatePropagationStopped) {
        var n,
            r,
            a,
            s = e || _.event;

        for (n in e = {}, s) "layerX" !== n && "layerY" !== n && "keyLocation" !== n && "webkitMovementX" !== n && "webkitMovementY" !== n && ("returnValue" === n && s.preventDefault || (e[n] = s[n]));

        e.target || (e.target = e.srcElement || d), e.relatedTarget || (e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement), e.preventDefault = function () {
          s.preventDefault && s.preventDefault(), e.returnValue = !1, s.returnValue = !1, e.defaultPrevented = !0;
        }, e.defaultPrevented = !1, e.stopPropagation = function () {
          s.stopPropagation && s.stopPropagation(), e.cancelBubble = !0, s.cancelBubble = !0, e.isPropagationStopped = t;
        }, e.isPropagationStopped = i, e.stopImmediatePropagation = function () {
          s.stopImmediatePropagation && s.stopImmediatePropagation(), e.isImmediatePropagationStopped = t, e.stopPropagation();
        }, e.isImmediatePropagationStopped = i, null !== e.clientX && void 0 !== e.clientX && (r = d.documentElement, a = d.body, e.pageX = e.clientX + (r && r.scrollLeft || a && a.scrollLeft || 0) - (r && r.clientLeft || a && a.clientLeft || 0), e.pageY = e.clientY + (r && r.scrollTop || a && a.scrollTop || 0) - (r && r.clientTop || a && a.clientTop || 0)), e.which = e.charCode || e.keyCode, null !== e.button && void 0 !== e.button && (e.button = 1 & e.button ? 0 : 4 & e.button ? 1 : 2 & e.button ? 2 : 0);
      }

      return e.fixed_ = !0, e;
    }

    var Ue = function () {
      if ("boolean" != typeof De) {
        De = !1;

        try {
          var e = Object.defineProperty({}, "passive", {
            get: function () {
              De = !0;
            }
          });
          _.addEventListener("test", null, e), _.removeEventListener("test", null, e);
        } catch (e) {}
      }

      return De;
    },
        Be = ["touchstart", "touchmove"];

    function Fe(s, e, t) {
      if (Array.isArray(e)) return Me(Fe, s, e, t);
      Oe.has(s) || Oe.set(s, {});
      var o = Oe.get(s);
      o.handlers || (o.handlers = {}), o.handlers[e] || (o.handlers[e] = []), t.guid || (t.guid = Le++), o.handlers[e].push(t), o.dispatcher || (o.disabled = !1, o.dispatcher = function (e, t) {
        if (!o.disabled) {
          e = Ne(e);
          var i = o.handlers[e.type];
          if (i) for (var n = i.slice(0), r = 0, a = n.length; r < a && !e.isImmediatePropagationStopped(); r++) try {
            n[r].call(s, e, t);
          } catch (e) {
            f.error(e);
          }
        }
      }), 1 === o.handlers[e].length && (s.addEventListener ? (t = !1, Ue() && -1 < Be.indexOf(e) && (t = {
        passive: !0
      }), s.addEventListener(e, o.dispatcher, t)) : s.attachEvent && s.attachEvent("on" + e, o.dispatcher));
    }

    function je(e, t, i) {
      if (Oe.has(e)) {
        var n = Oe.get(e);

        if (n.handlers) {
          if (Array.isArray(t)) return Me(je, e, t, i);

          var r = function (e, t) {
            n.handlers[t] = [], Re(e, t);
          };

          if (void 0 !== t) {
            var a = n.handlers[t];
            if (a) if (i) {
              if (i.guid) for (var s = 0; s < a.length; s++) a[s].guid === i.guid && a.splice(s--, 1);
              Re(e, t);
            } else r(e, t);
          } else for (var o in n.handlers) Object.prototype.hasOwnProperty.call(n.handlers || {}, o) && r(e, o);
        }
      }
    }

    function He(e, t, i) {
      var n = Oe.has(e) ? Oe.get(e) : {},
          r = e.parentNode || e.ownerDocument;
      return "string" == typeof t ? t = {
        type: t,
        target: e
      } : t.target || (t.target = e), t = Ne(t), n.dispatcher && n.dispatcher.call(e, t, i), r && !t.isPropagationStopped() && !0 === t.bubbles ? He.call(null, r, t, i) : !r && !t.defaultPrevented && t.target && t.target[t.type] && (Oe.has(t.target) || Oe.set(t.target, {}), r = Oe.get(t.target), t.target[t.type] && (r.disabled = !0, "function" == typeof t.target[t.type] && t.target[t.type](), r.disabled = !1)), !t.defaultPrevented;
    }

    function qe(e, t, i) {
      if (Array.isArray(t)) return Me(qe, e, t, i);

      function n() {
        je(e, t, n), i.apply(this, arguments);
      }

      n.guid = i.guid = i.guid || Le++, Fe(e, t, n);
    }

    function Ve(e, t, i) {
      function n() {
        je(e, t, n), i.apply(this, arguments);
      }

      n.guid = i.guid = i.guid || Le++, Fe(e, t, n);
    }

    function We(e, t, i) {
      return t.guid || (t.guid = Le++), (e = t.bind(e)).guid = i ? i + "_" + t.guid : t.guid, e;
    }

    function ze(t, i) {
      var n = _.performance.now();

      return function () {
        var e = _.performance.now();

        i <= e - n && (t.apply(void 0, arguments), n = e);
      };
    }

    function Ge(n, r, a, s) {
      var o;

      function e() {
        var e = this,
            t = arguments,
            i = function () {
          i = o = null, a || n.apply(e, t);
        };

        !o && a && n.apply(e, t), s.clearTimeout(o), o = s.setTimeout(i, r);
      }

      return void 0 === s && (s = _), e.cancel = function () {
        s.clearTimeout(o), o = null;
      }, e;
    }

    function Xe() {}

    var Ke,
        Ye = Object.freeze({
      __proto__: null,
      fixEvent: Ne,
      on: Fe,
      off: je,
      trigger: He,
      one: qe,
      any: Ve
    });
    Xe.prototype.allowedEvents_ = {}, Xe.prototype.addEventListener = Xe.prototype.on = function (e, t) {
      var i = this.addEventListener;
      this.addEventListener = function () {}, Fe(this, e, t), this.addEventListener = i;
    }, Xe.prototype.removeEventListener = Xe.prototype.off = function (e, t) {
      je(this, e, t);
    }, Xe.prototype.one = function (e, t) {
      var i = this.addEventListener;
      this.addEventListener = function () {}, qe(this, e, t), this.addEventListener = i;
    }, Xe.prototype.any = function (e, t) {
      var i = this.addEventListener;
      this.addEventListener = function () {}, Ve(this, e, t), this.addEventListener = i;
    }, Xe.prototype.dispatchEvent = Xe.prototype.trigger = function (e) {
      var t = e.type || e;
      e = Ne(e = "string" == typeof e ? {
        type: t
      } : e), this.allowedEvents_[t] && this["on" + t] && this["on" + t](e), He(this, e);
    }, Xe.prototype.queueTrigger = function (e) {
      var t = this;
      Ke = Ke || new Map();
      var i = e.type || e,
          n = Ke.get(this);
      n || (n = new Map(), Ke.set(this, n));
      var r = n.get(i);
      n.delete(i), _.clearTimeout(r);
      r = _.setTimeout(function () {
        0 === n.size && (n = null, Ke.delete(t)), t.trigger(e);
      }, 0);
      n.set(i, r);
    };

    function Qe(e) {
      return "function" == typeof e.name ? e.name() : "string" == typeof e.name ? e.name : e.name_ || (e.constructor && e.constructor.name ? e.constructor.name : typeof e);
    }

    function $e(e) {
      return "string" == typeof e && /\S/.test(e) || Array.isArray(e) && !!e.length;
    }

    function Je(e, t, i) {
      if (!e || !e.nodeName && !nt(e)) throw new Error("Invalid target for " + Qe(t) + "#" + i + "; must be a DOM node or evented object.");
    }

    function Ze(e, t, i) {
      if (!$e(e)) throw new Error("Invalid event type for " + Qe(t) + "#" + i + "; must be a non-empty string or array.");
    }

    function et(e, t, i) {
      if ("function" != typeof e) throw new Error("Invalid listener for " + Qe(t) + "#" + i + "; must be a function.");
    }

    function tt(e, t, i) {
      var n,
          r,
          a = t.length < 3 || t[0] === e || t[0] === e.eventBusEl_,
          t = a ? (n = e.eventBusEl_, 3 <= t.length && t.shift(), r = t[0], t[1]) : (n = t[0], r = t[1], t[2]);
      return Je(n, e, i), Ze(r, e, i), et(t, e, i), {
        isTargetingSelf: a,
        target: n,
        type: r,
        listener: t = We(e, t)
      };
    }

    function it(e, t, i, n) {
      Je(e, e, t), e.nodeName ? Ye[t](e, i, n) : e[t](i, n);
    }

    var nt = function (t) {
      return t instanceof Xe || !!t.eventBusEl_ && ["on", "one", "off", "trigger"].every(function (e) {
        return "function" == typeof t[e];
      });
    },
        rt = {
      on: function () {
        for (var e = this, t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];

        var r,
            a = tt(this, i, "on"),
            s = a.isTargetingSelf,
            o = a.target,
            u = a.type,
            l = a.listener;
        it(o, "on", u, l), s || ((r = function () {
          return e.off(o, u, l);
        }).guid = l.guid, (s = function () {
          return e.off("dispose", r);
        }).guid = l.guid, it(this, "on", "dispose", r), it(o, "on", "dispose", s));
      },
      one: function () {
        for (var r = this, e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        var n = tt(this, t, "one"),
            a = n.isTargetingSelf,
            s = n.target,
            o = n.type,
            u = n.listener;
        a ? it(s, "one", o, u) : ((a = function e() {
          r.off(s, o, e);

          for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];

          u.apply(null, i);
        }).guid = u.guid, it(s, "one", o, a));
      },
      any: function () {
        for (var r = this, e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        var n = tt(this, t, "any"),
            a = n.isTargetingSelf,
            s = n.target,
            o = n.type,
            u = n.listener;
        a ? it(s, "any", o, u) : ((a = function e() {
          r.off(s, o, e);

          for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];

          u.apply(null, i);
        }).guid = u.guid, it(s, "any", o, a));
      },
      off: function (e, t, i) {
        !e || $e(e) ? je(this.eventBusEl_, e, t) : (t = t, Je(e = e, this, "off"), Ze(t, this, "off"), et(i, this, "off"), i = We(this, i), this.off("dispose", i), e.nodeName ? (je(e, t, i), je(e, "dispose", i)) : nt(e) && (e.off(t, i), e.off("dispose", i)));
      },
      trigger: function (e, t) {
        Je(this.eventBusEl_, this, "trigger");
        var i = e && "string" != typeof e ? e.type : e;

        if (!$e(i)) {
          i = "Invalid event type for " + Qe(this) + "#trigger; must be a non-empty string or object with a type key that has a non-empty value.";
          if (!e) throw new Error(i);
          (this.log || f).error(i);
        }

        return He(this.eventBusEl_, e, t);
      }
    };

    function at(e, t) {
      t = (t = void 0 === t ? {} : t).eventBusKey;

      if (t) {
        if (!e[t].nodeName) throw new Error('The eventBusKey "' + t + '" does not refer to an element.');
        e.eventBusEl_ = e[t];
      } else e.eventBusEl_ = J("span", {
        className: "vjs-event-bus"
      });

      return T(e, rt), e.eventedCallbacks && e.eventedCallbacks.forEach(function (e) {
        e();
      }), e.on("dispose", function () {
        e.off(), _.setTimeout(function () {
          e.eventBusEl_ = null;
        }, 0);
      }), e;
    }

    var st = {
      state: {},
      setState: function (e) {
        var i,
            n = this;
        return b(e = "function" == typeof e ? e() : e, function (e, t) {
          n.state[t] !== e && ((i = i || {})[t] = {
            from: n.state[t],
            to: e
          }), n.state[t] = e;
        }), i && nt(this) && this.trigger({
          changes: i,
          type: "statechanged"
        }), i;
      }
    };

    function ot(e, t) {
      return T(e, st), e.state = T({}, e.state, t), "function" == typeof e.handleStateChanged && nt(e) && e.on("statechanged", e.handleStateChanged), e;
    }

    function ut(e) {
      return "string" != typeof e ? e : e.replace(/./, function (e) {
        return e.toLowerCase();
      });
    }

    function lt(e) {
      return "string" != typeof e ? e : e.replace(/./, function (e) {
        return e.toUpperCase();
      });
    }

    function ct() {
      for (var i = {}, e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];

      return t.forEach(function (e) {
        e && b(e, function (e, t) {
          E(e) ? (E(i[t]) || (i[t] = {}), i[t] = ct(i[t], e)) : i[t] = e;
        });
      }), i;
    }

    var dt = _.Map || function () {
      function e() {
        this.map_ = {};
      }

      var t = e.prototype;
      return t.has = function (e) {
        return e in this.map_;
      }, t.delete = function (e) {
        var t = this.has(e);
        return delete this.map_[e], t;
      }, t.set = function (e, t) {
        return this.map_[e] = t, this;
      }, t.forEach = function (e, t) {
        for (var i in this.map_) e.call(t, this.map_[i], i, this);
      }, e;
    }(),
        ht = _.Set || function () {
      function e() {
        this.set_ = {};
      }

      var t = e.prototype;
      return t.has = function (e) {
        return e in this.set_;
      }, t.delete = function (e) {
        var t = this.has(e);
        return delete this.set_[e], t;
      }, t.add = function (e) {
        return this.set_[e] = 1, this;
      }, t.forEach = function (e, t) {
        for (var i in this.set_) e.call(t, i, i, this);
      }, e;
    }(),
        pt = function () {
      function s(e, t, i) {
        !e && this.play ? this.player_ = e = this : this.player_ = e, this.isDisposed_ = !1, this.parentComponent_ = null, this.options_ = ct({}, this.options_), t = this.options_ = ct(this.options_, t), this.id_ = t.id || t.el && t.el.id, this.id_ || (e = e && e.id && e.id() || "no_player", this.id_ = e + "_component_" + Le++), this.name_ = t.name || null, t.el ? this.el_ = t.el : !1 !== t.createEl && (this.el_ = this.createEl()), !1 !== t.evented && (at(this, {
          eventBusKey: this.el_ ? "el_" : null
        }), this.handleLanguagechange = this.handleLanguagechange.bind(this), this.on(this.player_, "languagechange", this.handleLanguagechange)), ot(this, this.constructor.defaultState), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, this.setTimeoutIds_ = new ht(), this.setIntervalIds_ = new ht(), this.rafIds_ = new ht(), this.namedRafs_ = new dt(), (this.clearingTimersOnDispose_ = !1) !== t.initChildren && this.initChildren(), this.ready(i), !1 !== t.reportTouchActivity && this.enableTouchActivity();
      }

      var e = s.prototype;
      return e.dispose = function () {
        if (!this.isDisposed_) {
          if (this.readyQueue_ && (this.readyQueue_.length = 0), this.trigger({
            type: "dispose",
            bubbles: !1
          }), this.isDisposed_ = !0, this.children_) for (var e = this.children_.length - 1; 0 <= e; e--) this.children_[e].dispose && this.children_[e].dispose();
          this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.parentComponent_ = null, this.el_ && (this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), Oe.has(this.el_) && Oe.delete(this.el_), this.el_ = null), this.player_ = null;
        }
      }, e.isDisposed = function () {
        return Boolean(this.isDisposed_);
      }, e.player = function () {
        return this.player_;
      }, e.options = function (e) {
        return e && (this.options_ = ct(this.options_, e)), this.options_;
      }, e.el = function () {
        return this.el_;
      }, e.createEl = function (e, t, i) {
        return J(e, t, i);
      }, e.localize = function (e, i, t) {
        void 0 === t && (t = e);
        var n = this.player_.language && this.player_.language(),
            r = this.player_.languages && this.player_.languages(),
            a = r && r[n],
            n = n && n.split("-")[0],
            n = r && r[n],
            t = t;
        return a && a[e] ? t = a[e] : n && n[e] && (t = n[e]), t = i ? t.replace(/\{(\d+)\}/g, function (e, t) {
          t = i[t - 1];
          return "undefined" == typeof t ? e : t;
        }) : t;
      }, e.handleLanguagechange = function () {}, e.contentEl = function () {
        return this.contentEl_ || this.el_;
      }, e.id = function () {
        return this.id_;
      }, e.name = function () {
        return this.name_;
      }, e.children = function () {
        return this.children_;
      }, e.getChildById = function (e) {
        return this.childIndex_[e];
      }, e.getChild = function (e) {
        if (e) return this.childNameIndex_[e];
      }, e.getDescendant = function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        for (var t = t.reduce(function (e, t) {
          return e.concat(t);
        }, []), n = this, r = 0; r < t.length; r++) if (!(n = n.getChild(t[r])) || !n.getChild) return;

        return n;
      }, e.addChild = function (e, t, i) {
        if (void 0 === t && (t = {}), void 0 === i && (i = this.children_.length), "string" == typeof e) {
          var n = lt(e),
              r = t.componentClass || n;
          t.name = n;
          var a = s.getComponent(r);
          if (!a) throw new Error("Component " + r + " does not exist");
          if ("function" != typeof a) return null;
          a = new a(this.player_ || this, t);
        } else a = e;

        return a.parentComponent_ && a.parentComponent_.removeChild(a), this.children_.splice(i, 0, a), a.parentComponent_ = this, "function" == typeof a.id && (this.childIndex_[a.id()] = a), (n = n || a.name && lt(a.name())) && (this.childNameIndex_[n] = a, this.childNameIndex_[ut(n)] = a), "function" == typeof a.el && a.el() && (n = null, this.children_[i + 1] && (this.children_[i + 1].el_ ? n = this.children_[i + 1].el_ : Y(this.children_[i + 1]) && (n = this.children_[i + 1])), this.contentEl().insertBefore(a.el(), n)), a;
      }, e.removeChild = function (e) {
        if ((e = "string" == typeof e ? this.getChild(e) : e) && this.children_) {
          for (var t, i = !1, n = this.children_.length - 1; 0 <= n; n--) if (this.children_[n] === e) {
            i = !0, this.children_.splice(n, 1);
            break;
          }

          i && (e.parentComponent_ = null, this.childIndex_[e.id()] = null, this.childNameIndex_[lt(e.name())] = null, this.childNameIndex_[ut(e.name())] = null, (t = e.el()) && t.parentNode === this.contentEl() && this.contentEl().removeChild(e.el()));
        }
      }, e.initChildren = function () {
        var i,
            t,
            e,
            n = this,
            r = this.options_.children;
        r && (i = this.options_, t = s.getComponent("Tech"), (e = Array.isArray(r) ? r : Object.keys(r)).concat(Object.keys(this.options_).filter(function (t) {
          return !e.some(function (e) {
            return "string" == typeof e ? t === e : t === e.name;
          });
        })).map(function (e) {
          var t,
              e = "string" == typeof e ? r[t = e] || n.options_[t] || {} : (t = e.name, e);
          return {
            name: t,
            opts: e
          };
        }).filter(function (e) {
          e = s.getComponent(e.opts.componentClass || lt(e.name));
          return e && !t.isTech(e);
        }).forEach(function (e) {
          var t = e.name,
              e = e.opts;
          !1 !== (e = void 0 !== i[t] ? i[t] : e) && ((e = !0 === e ? {} : e).playerOptions = n.options_.playerOptions, (e = n.addChild(t, e)) && (n[t] = e));
        }));
      }, e.buildCSSClass = function () {
        return "";
      }, e.ready = function (e, t) {
        if (void 0 === t && (t = !1), e) return this.isReady_ ? void (t ? e.call(this) : this.setTimeout(e, 1)) : (this.readyQueue_ = this.readyQueue_ || [], void this.readyQueue_.push(e));
      }, e.triggerReady = function () {
        this.isReady_ = !0, this.setTimeout(function () {
          var e = this.readyQueue_;
          this.readyQueue_ = [], e && 0 < e.length && e.forEach(function (e) {
            e.call(this);
          }, this), this.trigger("ready");
        }, 1);
      }, e.$ = function (e, t) {
        return Se(e, t || this.contentEl());
      }, e.$$ = function (e, t) {
        return Ee(e, t || this.contentEl());
      }, e.hasClass = function (e) {
        return te(this.el_, e);
      }, e.addClass = function (e) {
        ie(this.el_, e);
      }, e.removeClass = function (e) {
        ne(this.el_, e);
      }, e.toggleClass = function (e, t) {
        re(this.el_, e, t);
      }, e.show = function () {
        this.removeClass("vjs-hidden");
      }, e.hide = function () {
        this.addClass("vjs-hidden");
      }, e.lockShowing = function () {
        this.addClass("vjs-lock-showing");
      }, e.unlockShowing = function () {
        this.removeClass("vjs-lock-showing");
      }, e.getAttribute = function (e) {
        return oe(this.el_, e);
      }, e.setAttribute = function (e, t) {
        ue(this.el_, e, t);
      }, e.removeAttribute = function (e) {
        le(this.el_, e);
      }, e.width = function (e, t) {
        return this.dimension("width", e, t);
      }, e.height = function (e, t) {
        return this.dimension("height", e, t);
      }, e.dimensions = function (e, t) {
        this.width(e, !0), this.height(t);
      }, e.dimension = function (e, t, i) {
        if (void 0 !== t) return -1 !== ("" + (t = null === t || t != t ? 0 : t)).indexOf("%") || -1 !== ("" + t).indexOf("px") ? this.el_.style[e] = t : this.el_.style[e] = "auto" === t ? "" : t + "px", void (i || this.trigger("componentresize"));
        if (!this.el_) return 0;
        t = this.el_.style[e], i = t.indexOf("px");
        return -1 !== i ? parseInt(t.slice(0, i), 10) : parseInt(this.el_["offset" + lt(e)], 10);
      }, e.currentDimension = function (e) {
        var t = 0;
        if ("width" !== e && "height" !== e) throw new Error("currentDimension only accepts width or height value");
        return t = k(this.el_, e), 0 !== (t = parseFloat(t)) && !isNaN(t) || (e = "offset" + lt(e), t = this.el_[e]), t;
      }, e.currentDimensions = function () {
        return {
          width: this.currentDimension("width"),
          height: this.currentDimension("height")
        };
      }, e.currentWidth = function () {
        return this.currentDimension("width");
      }, e.currentHeight = function () {
        return this.currentDimension("height");
      }, e.focus = function () {
        this.el_.focus();
      }, e.blur = function () {
        this.el_.blur();
      }, e.handleKeyDown = function (e) {
        this.player_ && (e.stopPropagation(), this.player_.handleKeyDown(e));
      }, e.handleKeyPress = function (e) {
        this.handleKeyDown(e);
      }, e.emitTapEvents = function () {
        var i,
            t = 0,
            n = null;
        this.on("touchstart", function (e) {
          1 === e.touches.length && (n = {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY
          }, t = _.performance.now(), i = !0);
        }), this.on("touchmove", function (e) {
          var t;
          1 < e.touches.length ? i = !1 : n && (t = e.touches[0].pageX - n.pageX, e = e.touches[0].pageY - n.pageY, 10 < Math.sqrt(t * t + e * e) && (i = !1));
        });

        function e() {
          i = !1;
        }

        this.on("touchleave", e), this.on("touchcancel", e), this.on("touchend", function (e) {
          !(n = null) === i && _.performance.now() - t < 200 && (e.preventDefault(), this.trigger("tap"));
        });
      }, e.enableTouchActivity = function () {
        var t, i, e;
        this.player() && this.player().reportUserActivity && (t = We(this.player(), this.player().reportUserActivity), this.on("touchstart", function () {
          t(), this.clearInterval(i), i = this.setInterval(t, 250);
        }), e = function (e) {
          t(), this.clearInterval(i);
        }, this.on("touchmove", t), this.on("touchend", e), this.on("touchcancel", e));
      }, e.setTimeout = function (e, t) {
        var i,
            n = this;
        return e = We(this, e), this.clearTimersOnDispose_(), i = _.setTimeout(function () {
          n.setTimeoutIds_.has(i) && n.setTimeoutIds_.delete(i), e();
        }, t), this.setTimeoutIds_.add(i), i;
      }, e.clearTimeout = function (e) {
        return this.setTimeoutIds_.has(e) && (this.setTimeoutIds_.delete(e), _.clearTimeout(e)), e;
      }, e.setInterval = function (e, t) {
        e = We(this, e), this.clearTimersOnDispose_();
        t = _.setInterval(e, t);
        return this.setIntervalIds_.add(t), t;
      }, e.clearInterval = function (e) {
        return this.setIntervalIds_.has(e) && (this.setIntervalIds_.delete(e), _.clearInterval(e)), e;
      }, e.requestAnimationFrame = function (e) {
        var t,
            i = this;
        return this.supportsRaf_ ? (this.clearTimersOnDispose_(), e = We(this, e), t = _.requestAnimationFrame(function () {
          i.rafIds_.has(t) && i.rafIds_.delete(t), e();
        }), this.rafIds_.add(t), t) : this.setTimeout(e, 1e3 / 60);
      }, e.requestNamedAnimationFrame = function (e, t) {
        var i = this;

        if (!this.namedRafs_.has(e)) {
          this.clearTimersOnDispose_(), t = We(this, t);
          var n = this.requestAnimationFrame(function () {
            t(), i.namedRafs_.has(e) && i.namedRafs_.delete(e);
          });
          return this.namedRafs_.set(e, n), e;
        }
      }, e.cancelNamedAnimationFrame = function (e) {
        this.namedRafs_.has(e) && (this.cancelAnimationFrame(this.namedRafs_.get(e)), this.namedRafs_.delete(e));
      }, e.cancelAnimationFrame = function (e) {
        return this.supportsRaf_ ? (this.rafIds_.has(e) && (this.rafIds_.delete(e), _.cancelAnimationFrame(e)), e) : this.clearTimeout(e);
      }, e.clearTimersOnDispose_ = function () {
        var n = this;
        this.clearingTimersOnDispose_ || (this.clearingTimersOnDispose_ = !0, this.one("dispose", function () {
          [["namedRafs_", "cancelNamedAnimationFrame"], ["rafIds_", "cancelAnimationFrame"], ["setTimeoutIds_", "clearTimeout"], ["setIntervalIds_", "clearInterval"]].forEach(function (e) {
            var t = e[0],
                i = e[1];
            n[t].forEach(function (e, t) {
              return n[i](t);
            });
          }), n.clearingTimersOnDispose_ = !1;
        }));
      }, s.registerComponent = function (e, t) {
        if ("string" != typeof e || !e) throw new Error('Illegal component name, "' + e + '"; must be a non-empty string.');
        var i = s.getComponent("Tech"),
            n = i && i.isTech(t),
            i = s === t || s.prototype.isPrototypeOf(t.prototype);

        if (n || !i) {
          var r = n ? "techs must be registered using Tech.registerTech()" : "must be a Component subclass";
          throw new Error('Illegal component, "' + e + '"; ' + r + ".");
        }

        e = lt(e), s.components_ || (s.components_ = {});
        r = s.getComponent("Player");

        if ("Player" === e && r && r.players) {
          var a = r.players,
              r = Object.keys(a);
          if (a && 0 < r.length && r.map(function (e) {
            return a[e];
          }).every(Boolean)) throw new Error("Can not register Player component after player has been created.");
        }

        return s.components_[e] = t, s.components_[ut(e)] = t;
      }, s.getComponent = function (e) {
        if (e && s.components_) return s.components_[e];
      }, s;
    }();

    pt.prototype.supportsRaf_ = "function" == typeof _.requestAnimationFrame && "function" == typeof _.cancelAnimationFrame, pt.registerComponent("Component", pt);

    var ft = function (e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    };

    var mt = function (e, t) {
      e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t;
    };

    function gt(e, t, i, n) {
      return function (e, t, i) {
        if ("number" != typeof t || t < 0 || i < t) throw new Error("Failed to execute '" + e + "' on 'TimeRanges': The index provided (" + t + ") is non-numeric or out of bounds (0-" + i + ").");
      }(e, n, i.length - 1), i[n][t];
    }

    function yt(e) {
      return void 0 === e || 0 === e.length ? {
        length: 0,
        start: function () {
          throw new Error("This TimeRanges object is empty");
        },
        end: function () {
          throw new Error("This TimeRanges object is empty");
        }
      } : {
        length: e.length,
        start: gt.bind(null, "start", 0, e),
        end: gt.bind(null, "end", 1, e)
      };
    }

    function vt(e, t) {
      return Array.isArray(e) ? yt(e) : void 0 === e || void 0 === t ? yt() : yt([[e, t]]);
    }

    function _t(e, t) {
      var i,
          n,
          r = 0;
      if (!t) return 0;
      e && e.length || (e = vt(0, 0));

      for (var a = 0; a < e.length; a++) i = e.start(a), r += (n = t < (n = e.end(a)) ? t : n) - i;

      return r / t;
    }

    function bt(e) {
      if (e instanceof bt) return e;
      "number" == typeof e ? this.code = e : "string" == typeof e ? this.message = e : S(e) && ("number" == typeof e.code && (this.code = e.code), T(this, e)), this.message || (this.message = bt.defaultMessages[this.code] || "");
    }

    bt.prototype.code = 0, bt.prototype.message = "", bt.prototype.status = null, bt.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED"], bt.defaultMessages = {
      1: "You aborted the media playback",
      2: "A network error caused the media download to fail part-way.",
      3: "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",
      4: "The media could not be loaded, either because the server or network failed or because the format is not supported.",
      5: "The media is encrypted and we do not have the keys to decrypt it."
    };

    for (var Tt = 0; Tt < bt.errorTypes.length; Tt++) bt[bt.errorTypes[Tt]] = Tt, bt.prototype[bt.errorTypes[Tt]] = Tt;

    var St = function (e, t) {
      var i,
          n = null;

      try {
        i = JSON.parse(e, t);
      } catch (e) {
        n = e;
      }

      return [n, i];
    };

    function Et(e) {
      return null != e && "function" == typeof e.then;
    }

    function kt(e) {
      Et(e) && e.then(null, function (e) {});
    }

    function Ct(n) {
      return ["kind", "label", "language", "id", "inBandMetadataTrackDispatchType", "mode", "src"].reduce(function (e, t, i) {
        return n[t] && (e[t] = n[t]), e;
      }, {
        cues: n.cues && Array.prototype.map.call(n.cues, function (e) {
          return {
            startTime: e.startTime,
            endTime: e.endTime,
            text: e.text,
            id: e.id
          };
        })
      });
    }

    var wt = function (e) {
      var t = e.$$("track"),
          i = Array.prototype.map.call(t, function (e) {
        return e.track;
      });
      return Array.prototype.map.call(t, function (e) {
        var t = Ct(e.track);
        return e.src && (t.src = e.src), t;
      }).concat(Array.prototype.filter.call(e.textTracks(), function (e) {
        return -1 === i.indexOf(e);
      }).map(Ct));
    },
        It = function (e, i) {
      return e.forEach(function (e) {
        var t = i.addRemoteTextTrack(e).track;
        !e.src && e.cues && e.cues.forEach(function (e) {
          return t.addCue(e);
        });
      }), i.textTracks();
    },
        xt = t(function (e, t) {
      function i(e) {
        if (!e || "object" != typeof e || (t = e.which || e.keyCode || e.charCode) && (e = t), "number" == typeof e) return o[e];
        var t = String(e),
            e = n[t.toLowerCase()];
        return e || ((e = r[t.toLowerCase()]) ? e : 1 === t.length ? t.charCodeAt(0) : void 0);
      }

      i.isEventKey = function (e, t) {
        if (e && "object" == typeof e) {
          var i = e.which || e.keyCode || e.charCode;
          if (null == i) return !1;

          if ("string" == typeof t) {
            e = n[t.toLowerCase()];
            if (e) return e === i;
            if (e = r[t.toLowerCase()]) return e === i;
          } else if ("number" == typeof t) return t === i;

          return !1;
        }
      };

      for (var n = (t = e.exports = i).code = t.codes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        ctrl: 17,
        alt: 18,
        "pause/break": 19,
        "caps lock": 20,
        esc: 27,
        space: 32,
        "page up": 33,
        "page down": 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        delete: 46,
        command: 91,
        "left command": 91,
        "right command": 93,
        "numpad *": 106,
        "numpad +": 107,
        "numpad -": 109,
        "numpad .": 110,
        "numpad /": 111,
        "num lock": 144,
        "scroll lock": 145,
        "my computer": 182,
        "my calculator": 183,
        ";": 186,
        "=": 187,
        ",": 188,
        "-": 189,
        ".": 190,
        "/": 191,
        "`": 192,
        "[": 219,
        "\\": 220,
        "]": 221,
        "'": 222
      }, r = t.aliases = {
        windows: 91,
        "⇧": 16,
        "⌥": 18,
        "⌃": 17,
        "⌘": 91,
        ctl: 17,
        control: 17,
        option: 18,
        pause: 19,
        break: 19,
        caps: 20,
        return: 13,
        escape: 27,
        spc: 32,
        spacebar: 32,
        pgup: 33,
        pgdn: 34,
        ins: 45,
        del: 46,
        cmd: 91
      }, a = 97; a < 123; a++) n[String.fromCharCode(a)] = a - 32;

      for (var a = 48; a < 58; a++) n[a - 48] = a;

      for (a = 1; a < 13; a++) n["f" + a] = a + 111;

      for (a = 0; a < 10; a++) n["numpad " + a] = a + 96;

      var s,
          o = t.names = t.title = {};

      for (a in n) o[n[a]] = a;

      for (s in r) n[s] = r[s];
    });

    xt.code, xt.codes, xt.aliases, xt.names, xt.title;

    var At = "vjs-modal-dialog",
        Pt = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.handleKeyDown_ = function (e) {
          return i.handleKeyDown(e);
        }, i.close_ = function (e) {
          return i.close(e);
        }, i.opened_ = i.hasBeenOpened_ = i.hasBeenFilled_ = !1, i.closeable(!i.options_.uncloseable), i.content(i.options_.content), i.contentEl_ = J("div", {
          className: At + "-content"
        }, {
          role: "document"
        }), i.descEl_ = J("p", {
          className: At + "-description vjs-control-text",
          id: i.el().getAttribute("aria-describedby")
        }), Z(i.descEl_, i.description()), i.el_.appendChild(i.descEl_), i.el_.appendChild(i.contentEl_), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function () {
        return n.prototype.createEl.call(this, "div", {
          className: this.buildCSSClass(),
          tabIndex: -1
        }, {
          "aria-describedby": this.id() + "_description",
          "aria-hidden": "true",
          "aria-label": this.label(),
          role: "dialog"
        });
      }, t.dispose = function () {
        this.contentEl_ = null, this.descEl_ = null, this.previouslyActiveEl_ = null, n.prototype.dispose.call(this);
      }, t.buildCSSClass = function () {
        return At + " vjs-hidden " + n.prototype.buildCSSClass.call(this);
      }, t.label = function () {
        return this.localize(this.options_.label || "Modal Window");
      }, t.description = function () {
        var e = this.options_.description || this.localize("This is a modal window.");
        return this.closeable() && (e += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button.")), e;
      }, t.open = function () {
        var e;
        this.opened_ || (e = this.player(), this.trigger("beforemodalopen"), this.opened_ = !0, !this.options_.fillAlways && (this.hasBeenOpened_ || this.hasBeenFilled_) || this.fill(), this.wasPlaying_ = !e.paused(), this.options_.pauseOnOpen && this.wasPlaying_ && e.pause(), this.on("keydown", this.handleKeyDown_), this.hadControls_ = e.controls(), e.controls(!1), this.show(), this.conditionalFocus_(), this.el().setAttribute("aria-hidden", "false"), this.trigger("modalopen"), this.hasBeenOpened_ = !0);
      }, t.opened = function (e) {
        return "boolean" == typeof e && this[e ? "open" : "close"](), this.opened_;
      }, t.close = function () {
        var e;
        this.opened_ && (e = this.player(), this.trigger("beforemodalclose"), this.opened_ = !1, this.wasPlaying_ && this.options_.pauseOnOpen && e.play(), this.off("keydown", this.handleKeyDown_), this.hadControls_ && e.controls(!0), this.hide(), this.el().setAttribute("aria-hidden", "true"), this.trigger("modalclose"), this.conditionalBlur_(), this.options_.temporary && this.dispose());
      }, t.closeable = function (e) {
        var t, i;
        return "boolean" == typeof e && (t = this.closeable_ = !!e, i = this.getChild("closeButton"), t && !i && (e = this.contentEl_, this.contentEl_ = this.el_, i = this.addChild("closeButton", {
          controlText: "Close Modal Dialog"
        }), this.contentEl_ = e, this.on(i, "close", this.close_)), !t && i && (this.off(i, "close", this.close_), this.removeChild(i), i.dispose())), this.closeable_;
      }, t.fill = function () {
        this.fillWith(this.content());
      }, t.fillWith = function (e) {
        var t = this.contentEl(),
            i = t.parentNode,
            n = t.nextSibling;
        this.trigger("beforemodalfill"), this.hasBeenFilled_ = !0, i.removeChild(t), this.empty(), _e(t, e), this.trigger("modalfill"), n ? i.insertBefore(t, n) : i.appendChild(t);
        t = this.getChild("closeButton");
        t && i.appendChild(t.el_);
      }, t.empty = function () {
        this.trigger("beforemodalempty"), ge(this.contentEl()), this.trigger("modalempty");
      }, t.content = function (e) {
        return "undefined" != typeof e && (this.content_ = e), this.content_;
      }, t.conditionalFocus_ = function () {
        var e = d.activeElement,
            t = this.player_.el_;
        this.previouslyActiveEl_ = null, !t.contains(e) && t !== e || (this.previouslyActiveEl_ = e, this.focus());
      }, t.conditionalBlur_ = function () {
        this.previouslyActiveEl_ && (this.previouslyActiveEl_.focus(), this.previouslyActiveEl_ = null);
      }, t.handleKeyDown = function (e) {
        if (e.stopPropagation(), xt.isEventKey(e, "Escape") && this.closeable()) return e.preventDefault(), void this.close();

        if (xt.isEventKey(e, "Tab")) {
          for (var t, i = this.focusableEls_(), n = this.el_.querySelector(":focus"), r = 0; r < i.length; r++) if (n === i[r]) {
            t = r;
            break;
          }

          d.activeElement === this.el_ && (t = 0), e.shiftKey && 0 === t ? (i[i.length - 1].focus(), e.preventDefault()) : e.shiftKey || t !== i.length - 1 || (i[0].focus(), e.preventDefault());
        }
      }, t.focusableEls_ = function () {
        var e = this.el_.querySelectorAll("*");
        return Array.prototype.filter.call(e, function (e) {
          return (e instanceof _.HTMLAnchorElement || e instanceof _.HTMLAreaElement) && e.hasAttribute("href") || (e instanceof _.HTMLInputElement || e instanceof _.HTMLSelectElement || e instanceof _.HTMLTextAreaElement || e instanceof _.HTMLButtonElement) && !e.hasAttribute("disabled") || e instanceof _.HTMLIFrameElement || e instanceof _.HTMLObjectElement || e instanceof _.HTMLEmbedElement || e.hasAttribute("tabindex") && -1 !== e.getAttribute("tabindex") || e.hasAttribute("contenteditable");
        });
      }, e;
    }(pt);

    Pt.prototype.options_ = {
      pauseOnOpen: !0,
      temporary: !0
    }, pt.registerComponent("ModalDialog", Pt);

    var Lt,
        Dt = function (n) {
      function e(e) {
        var t;
        void 0 === e && (e = []), (t = n.call(this) || this).tracks_ = [], Object.defineProperty(ft(t), "length", {
          get: function () {
            return this.tracks_.length;
          }
        });

        for (var i = 0; i < e.length; i++) t.addTrack(e[i]);

        return t;
      }

      mt(e, n);
      var t = e.prototype;
      return t.addTrack = function (e) {
        var t = this,
            i = this.tracks_.length;
        "" + i in this || Object.defineProperty(this, i, {
          get: function () {
            return this.tracks_[i];
          }
        }), -1 === this.tracks_.indexOf(e) && (this.tracks_.push(e), this.trigger({
          track: e,
          type: "addtrack",
          target: this
        })), e.labelchange_ = function () {
          t.trigger({
            track: e,
            type: "labelchange",
            target: t
          });
        }, nt(e) && e.addEventListener("labelchange", e.labelchange_);
      }, t.removeTrack = function (e) {
        for (var t, i = 0, n = this.length; i < n; i++) if (this[i] === e) {
          (t = this[i]).off && t.off(), this.tracks_.splice(i, 1);
          break;
        }

        t && this.trigger({
          track: t,
          type: "removetrack",
          target: this
        });
      }, t.getTrackById = function (e) {
        for (var t = null, i = 0, n = this.length; i < n; i++) {
          var r = this[i];

          if (r.id === e) {
            t = r;
            break;
          }
        }

        return t;
      }, e;
    }(Xe);

    for (Lt in Dt.prototype.allowedEvents_ = {
      change: "change",
      addtrack: "addtrack",
      removetrack: "removetrack",
      labelchange: "labelchange"
    }, Dt.prototype.allowedEvents_) Dt.prototype["on" + Lt] = null;

    function Ot(e, t) {
      for (var i = 0; i < e.length; i++) Object.keys(e[i]).length && t.id !== e[i].id && (e[i].enabled = !1);
    }

    function Rt(e, t) {
      for (var i = 0; i < e.length; i++) Object.keys(e[i]).length && t.id !== e[i].id && (e[i].selected = !1);
    }

    function Mt(e) {
      var t = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"],
          i = d.createElement("a");
      i.href = e;

      for (var n = {}, r = 0; r < t.length; r++) n[t[r]] = i[t[r]];

      return "http:" === n.protocol && (n.host = n.host.replace(/:80$/, "")), "https:" === n.protocol && (n.host = n.host.replace(/:443$/, "")), n.protocol || (n.protocol = _.location.protocol), n.host || (n.host = _.location.host), n;
    }

    function Nt(e) {
      var t;
      return e.match(/^https?:\/\//) || ((t = d.createElement("a")).href = e, e = t.href), e;
    }

    function Ut(e) {
      if ("string" == typeof e) {
        e = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/.exec(e);
        if (e) return e.pop().toLowerCase();
      }

      return "";
    }

    function Bt(e, t) {
      return void 0 === t && (t = _.location), (":" === (e = Mt(e)).protocol ? t : e).protocol + e.host !== t.protocol + t.host;
    }

    var Ft = function (n) {
      function e(e) {
        for (var t, i = (e = void 0 === e ? [] : e).length - 1; 0 <= i; i--) if (e[i].enabled) {
          Ot(e, e[i]);
          break;
        }

        return (t = n.call(this, e) || this).changing_ = !1, t;
      }

      mt(e, n);
      var t = e.prototype;
      return t.addTrack = function (e) {
        var t = this;
        e.enabled && Ot(this, e), n.prototype.addTrack.call(this, e), e.addEventListener && (e.enabledChange_ = function () {
          t.changing_ || (t.changing_ = !0, Ot(t, e), t.changing_ = !1, t.trigger("change"));
        }, e.addEventListener("enabledchange", e.enabledChange_));
      }, t.removeTrack = function (e) {
        n.prototype.removeTrack.call(this, e), e.removeEventListener && e.enabledChange_ && (e.removeEventListener("enabledchange", e.enabledChange_), e.enabledChange_ = null);
      }, e;
    }(Dt),
        e = function (n) {
      function e(e) {
        for (var t, i = (e = void 0 === e ? [] : e).length - 1; 0 <= i; i--) if (e[i].selected) {
          Rt(e, e[i]);
          break;
        }

        return (t = n.call(this, e) || this).changing_ = !1, Object.defineProperty(ft(t), "selectedIndex", {
          get: function () {
            for (var e = 0; e < this.length; e++) if (this[e].selected) return e;

            return -1;
          },
          set: function () {}
        }), t;
      }

      mt(e, n);
      var t = e.prototype;
      return t.addTrack = function (e) {
        var t = this;
        e.selected && Rt(this, e), n.prototype.addTrack.call(this, e), e.addEventListener && (e.selectedChange_ = function () {
          t.changing_ || (t.changing_ = !0, Rt(t, e), t.changing_ = !1, t.trigger("change"));
        }, e.addEventListener("selectedchange", e.selectedChange_));
      }, t.removeTrack = function (e) {
        n.prototype.removeTrack.call(this, e), e.removeEventListener && e.selectedChange_ && (e.removeEventListener("selectedchange", e.selectedChange_), e.selectedChange_ = null);
      }, e;
    }(Dt),
        n = function (i) {
      function e() {
        return i.apply(this, arguments) || this;
      }

      mt(e, i);
      var t = e.prototype;
      return t.addTrack = function (e) {
        var t = this;
        i.prototype.addTrack.call(this, e), this.queueChange_ || (this.queueChange_ = function () {
          return t.queueTrigger("change");
        }), this.triggerSelectedlanguagechange || (this.triggerSelectedlanguagechange_ = function () {
          return t.trigger("selectedlanguagechange");
        }), e.addEventListener("modechange", this.queueChange_);
        -1 === ["metadata", "chapters"].indexOf(e.kind) && e.addEventListener("modechange", this.triggerSelectedlanguagechange_);
      }, t.removeTrack = function (e) {
        i.prototype.removeTrack.call(this, e), e.removeEventListener && (this.queueChange_ && e.removeEventListener("modechange", this.queueChange_), this.selectedlanguagechange_ && e.removeEventListener("modechange", this.triggerSelectedlanguagechange_));
      }, e;
    }(Dt),
        r = function () {
      function e(e) {
        void 0 === e && (e = []), this.trackElements_ = [], Object.defineProperty(this, "length", {
          get: function () {
            return this.trackElements_.length;
          }
        });

        for (var t = 0, i = e.length; t < i; t++) this.addTrackElement_(e[t]);
      }

      var t = e.prototype;
      return t.addTrackElement_ = function (e) {
        var t = this.trackElements_.length;
        "" + t in this || Object.defineProperty(this, t, {
          get: function () {
            return this.trackElements_[t];
          }
        }), -1 === this.trackElements_.indexOf(e) && this.trackElements_.push(e);
      }, t.getTrackElementByTrack_ = function (e) {
        for (var t, i = 0, n = this.trackElements_.length; i < n; i++) if (e === this.trackElements_[i].track) {
          t = this.trackElements_[i];
          break;
        }

        return t;
      }, t.removeTrackElement_ = function (e) {
        for (var t = 0, i = this.trackElements_.length; t < i; t++) if (e === this.trackElements_[t]) {
          this.trackElements_[t].track && "function" == typeof this.trackElements_[t].track.off && this.trackElements_[t].track.off(), "function" == typeof this.trackElements_[t].off && this.trackElements_[t].off(), this.trackElements_.splice(t, 1);
          break;
        }
      }, e;
    }(),
        jt = function () {
      function t(e) {
        t.prototype.setCues_.call(this, e), Object.defineProperty(this, "length", {
          get: function () {
            return this.length_;
          }
        });
      }

      var e = t.prototype;
      return e.setCues_ = function (e) {
        var t = this.length || 0,
            i = 0,
            n = e.length;
        this.cues_ = e, this.length_ = e.length;

        function r(e) {
          "" + e in this || Object.defineProperty(this, "" + e, {
            get: function () {
              return this.cues_[e];
            }
          });
        }

        if (t < n) for (i = t; i < n; i++) r.call(this, i);
      }, e.getCueById = function (e) {
        for (var t = null, i = 0, n = this.length; i < n; i++) {
          var r = this[i];

          if (r.id === e) {
            t = r;
            break;
          }
        }

        return t;
      }, t;
    }(),
        Ht = {
      alternative: "alternative",
      captions: "captions",
      main: "main",
      sign: "sign",
      subtitles: "subtitles",
      commentary: "commentary"
    },
        qt = {
      alternative: "alternative",
      descriptions: "descriptions",
      main: "main",
      "main-desc": "main-desc",
      translation: "translation",
      commentary: "commentary"
    },
        Vt = {
      subtitles: "subtitles",
      captions: "captions",
      descriptions: "descriptions",
      chapters: "chapters",
      metadata: "metadata"
    },
        Wt = {
      disabled: "disabled",
      hidden: "hidden",
      showing: "showing"
    },
        w = function (a) {
      function e(e) {
        void 0 === e && (e = {});
        var t,
            i = a.call(this) || this,
            n = {
          id: e.id || "vjs_track_" + Le++,
          kind: e.kind || "",
          language: e.language || ""
        },
            r = e.label || "";

        for (t in n) !function (e) {
          Object.defineProperty(ft(i), e, {
            get: function () {
              return n[e];
            },
            set: function () {}
          });
        }(t);

        return Object.defineProperty(ft(i), "label", {
          get: function () {
            return r;
          },
          set: function (e) {
            e !== r && (r = e, this.trigger("labelchange"));
          }
        }), i;
      }

      return mt(e, a), e;
    }(Xe),
        zt = Object.freeze({
      __proto__: null,
      parseUrl: Mt,
      getAbsoluteURL: Nt,
      getFileExtension: Ut,
      isCrossOrigin: Bt
    }),
        Gt = function (e) {
      if (!e) return !1;
      var t = Xt.call(e);
      return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt);
    }
    /**
       * @license
       * slighly modified parse-headers 2.0.2 <https://github.com/kesla/parse-headers/>
       * Copyright (c) 2014 David Björklund
       * Available under the MIT license
       * <https://github.com/kesla/parse-headers/blob/master/LICENCE>
       */
    ,
        Xt = Object.prototype.toString;

    var Kt = function (e) {
      var n = {};
      return e && e.trim().split("\n").forEach(function (e) {
        var t = e.indexOf(":"),
            i = e.slice(0, t).trim().toLowerCase(),
            t = e.slice(t + 1).trim();
        "undefined" == typeof n[i] ? n[i] = t : Array.isArray(n[i]) ? n[i].push(t) : n[i] = [n[i], t];
      }), n;
    },
        Yt = $t,
        I = $t;

    function Qt(e, t, i) {
      var n = e;
      return Gt(t) ? (i = t, "string" == typeof e && (n = {
        uri: e
      })) : n = g({}, t, {
        uri: e
      }), n.callback = i, n;
    }

    function $t(e, t, i) {
      return Jt(t = Qt(e, t, i));
    }

    function Jt(n) {
      if ("undefined" == typeof n.callback) throw new Error("callback argument missing");

      var r = !1,
          a = function (e, t, i) {
        r || (r = !0, n.callback(e, t, i));
      };

      function s() {
        var e = void 0,
            e = l.response || l.responseText || function (e) {
          try {
            if ("document" === e.responseType) return e.responseXML;
            var t = e.responseXML && "parsererror" === e.responseXML.documentElement.nodeName;
            if ("" === e.responseType && !t) return e.responseXML;
          } catch (e) {}

          return null;
        }(l);

        if (m) try {
          e = JSON.parse(e);
        } catch (e) {}
        return e;
      }

      function t(e) {
        return clearTimeout(u), (e = !(e instanceof Error) ? new Error("" + (e || "Unknown XMLHttpRequest Error")) : e).statusCode = 0, a(e, g);
      }

      function e() {
        if (!o) {
          clearTimeout(u);
          var e = n.useXDR && void 0 === l.status ? 200 : 1223 === l.status ? 204 : l.status,
              t = g,
              i = null;
          return 0 !== e ? (t = {
            body: s(),
            statusCode: e,
            method: d,
            headers: {},
            url: c,
            rawRequest: l
          }, l.getAllResponseHeaders && (t.headers = Kt(l.getAllResponseHeaders()))) : i = new Error("Internal XMLHttpRequest Error"), a(i, t, t.body);
        }
      }

      var i,
          o,
          u,
          l = n.xhr || null,
          c = (l = l || new (n.cors || n.useXDR ? $t.XDomainRequest : $t.XMLHttpRequest)()).url = n.uri || n.url,
          d = l.method = n.method || "GET",
          h = n.body || n.data,
          p = l.headers = n.headers || {},
          f = !!n.sync,
          m = !1,
          g = {
        body: void 0,
        headers: {},
        statusCode: 0,
        method: d,
        url: c,
        rawRequest: l
      };
      if ("json" in n && !1 !== n.json && (m = !0, p.accept || p.Accept || (p.Accept = "application/json"), "GET" !== d && "HEAD" !== d && (p["content-type"] || p["Content-Type"] || (p["Content-Type"] = "application/json"), h = JSON.stringify(!0 === n.json ? h : n.json))), l.onreadystatechange = function () {
        4 === l.readyState && setTimeout(e, 0);
      }, l.onload = e, l.onerror = t, l.onprogress = function () {}, l.onabort = function () {
        o = !0;
      }, l.ontimeout = t, l.open(d, c, !f, n.username, n.password), f || (l.withCredentials = !!n.withCredentials), !f && 0 < n.timeout && (u = setTimeout(function () {
        var e;
        o || (o = !0, l.abort("timeout"), (e = new Error("XMLHttpRequest timeout")).code = "ETIMEDOUT", t(e));
      }, n.timeout)), l.setRequestHeader) for (i in p) p.hasOwnProperty(i) && l.setRequestHeader(i, p[i]);else if (n.headers && !function (e) {
        for (var t in e) if (e.hasOwnProperty(t)) return;

        return 1;
      }(n.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
      return "responseType" in n && (l.responseType = n.responseType), "beforeSend" in n && "function" == typeof n.beforeSend && n.beforeSend(l), l.send(h || null), l;
    }

    $t.XMLHttpRequest = _.XMLHttpRequest || function () {}, $t.XDomainRequest = "withCredentials" in new $t.XMLHttpRequest() ? $t.XMLHttpRequest : _.XDomainRequest, function (e, t) {
      for (var i = 0; i < e.length; i++) t(e[i]);
    }(["get", "put", "post", "patch", "head", "delete"], function (n) {
      $t["delete" === n ? "del" : n] = function (e, t, i) {
        return (t = Qt(e, t, i)).method = n.toUpperCase(), Jt(t);
      };
    }), Yt.default = I;

    function Zt(e, t) {
      var i = new _.WebVTT.Parser(_, _.vttjs, _.WebVTT.StringDecoder()),
          n = [];
      i.oncue = function (e) {
        t.addCue(e);
      }, i.onparsingerror = function (e) {
        n.push(e);
      }, i.onflush = function () {
        t.trigger({
          type: "loadeddata",
          target: t
        });
      }, i.parse(e), 0 < n.length && (_.console && _.console.groupCollapsed && _.console.groupCollapsed("Text Track parsing errors for " + t.src), n.forEach(function (e) {
        return f.error(e);
      }), _.console && _.console.groupEnd && _.console.groupEnd()), i.flush();
    }

    function ei(e, n) {
      var t = {
        uri: e
      };
      (e = Bt(e)) && (t.cors = e), (e = "use-credentials" === n.tech_.crossOrigin()) && (t.withCredentials = e), Yt(t, We(this, function (e, t, i) {
        return e ? f.error(e, t) : (n.loaded_ = !0, void ("function" != typeof _.WebVTT ? n.tech_ && n.tech_.any(["vttjsloaded", "vttjserror"], function (e) {
          return "vttjserror" !== e.type ? Zt(i, n) : void f.error("vttjs failed to load, stopping trying to process " + n.src);
        }) : Zt(i, n)));
      }));
    }

    var ti = function (u) {
      function e(e) {
        var t;
        if (!(e = void 0 === e ? {} : e).tech) throw new Error("A tech was not provided.");
        var e = ct(e, {
          kind: Vt[e.kind] || "subtitles",
          language: e.language || e.srclang || ""
        }),
            i = Wt[e.mode] || "disabled",
            n = e.default;
        "metadata" !== e.kind && "chapters" !== e.kind || (i = "hidden"), (t = u.call(this, e) || this).tech_ = e.tech, t.cues_ = [], t.activeCues_ = [], t.preload_ = !1 !== t.tech_.preloadTextTracks;
        var r = new jt(t.cues_),
            s = new jt(t.activeCues_),
            o = !1,
            a = We(ft(t), function () {
          this.tech_.isReady_ && !this.tech_.isDisposed() && (this.activeCues = this.activeCues, o && (this.trigger("cuechange"), o = !1));
        });
        return t.tech_.one("dispose", function () {
          t.tech_.off("timeupdate", a);
        }), "disabled" !== i && t.tech_.on("timeupdate", a), Object.defineProperties(ft(t), {
          default: {
            get: function () {
              return n;
            },
            set: function () {}
          },
          mode: {
            get: function () {
              return i;
            },
            set: function (e) {
              Wt[e] && i !== e && (i = e, this.preload_ || "disabled" === i || 0 !== this.cues.length || ei(this.src, this), this.tech_.off("timeupdate", a), "disabled" !== i && this.tech_.on("timeupdate", a), this.trigger("modechange"));
            }
          },
          cues: {
            get: function () {
              return this.loaded_ ? r : null;
            },
            set: function () {}
          },
          activeCues: {
            get: function () {
              if (!this.loaded_) return null;
              if (0 === this.cues.length) return s;

              for (var e = this.tech_.currentTime(), t = [], i = 0, n = this.cues.length; i < n; i++) {
                var r = this.cues[i];
                (r.startTime <= e && r.endTime >= e || r.startTime === r.endTime && r.startTime <= e && r.startTime + .5 >= e) && t.push(r);
              }

              if (o = !1, t.length !== this.activeCues_.length) o = !0;else for (var a = 0; a < t.length; a++) -1 === this.activeCues_.indexOf(t[a]) && (o = !0);
              return this.activeCues_ = t, s.setCues_(this.activeCues_), s;
            },
            set: function () {}
          }
        }), e.src ? (t.src = e.src, t.preload_ || (t.loaded_ = !0), (t.preload_ || "subtitles" !== e.kind && "captions" !== e.kind) && ei(t.src, ft(t))) : t.loaded_ = !0, t;
      }

      mt(e, u);
      var t = e.prototype;
      return t.addCue = function (e) {
        var t = e;

        if (_.vttjs && !(e instanceof _.vttjs.VTTCue)) {
          for (var i in t = new _.vttjs.VTTCue(e.startTime, e.endTime, e.text), e) i in t || (t[i] = e[i]);

          t.id = e.id, t.originalCue_ = e;
        }

        for (var n = this.tech_.textTracks(), r = 0; r < n.length; r++) n[r] !== this && n[r].removeCue(t);

        this.cues_.push(t), this.cues.setCues_(this.cues_);
      }, t.removeCue = function (e) {
        for (var t = this.cues_.length; t--;) {
          var i = this.cues_[t];

          if (i === e || i.originalCue_ && i.originalCue_ === e) {
            this.cues_.splice(t, 1), this.cues.setCues_(this.cues_);
            break;
          }
        }
      }, e;
    }(w);

    ti.prototype.allowedEvents_ = {
      cuechange: "cuechange"
    };

    var ii = function (n) {
      function e(e) {
        var t = ct(e = void 0 === e ? {} : e, {
          kind: qt[e.kind] || ""
        }),
            e = n.call(this, t) || this,
            i = !1;
        return Object.defineProperty(ft(e), "enabled", {
          get: function () {
            return i;
          },
          set: function (e) {
            "boolean" == typeof e && e !== i && (i = e, this.trigger("enabledchange"));
          }
        }), t.enabled && (e.enabled = t.enabled), e.loaded_ = !0, e;
      }

      return mt(e, n), e;
    }(w),
        ni = function (n) {
      function e(e) {
        var t = ct(e = void 0 === e ? {} : e, {
          kind: Ht[e.kind] || ""
        }),
            e = n.call(this, t) || this,
            i = !1;
        return Object.defineProperty(ft(e), "selected", {
          get: function () {
            return i;
          },
          set: function (e) {
            "boolean" == typeof e && e !== i && (i = e, this.trigger("selectedchange"));
          }
        }), t.selected && (e.selected = t.selected), e;
      }

      return mt(e, n), e;
    }(w),
        x = function (r) {
      function e(e) {
        var t;
        void 0 === e && (e = {});
        var i = r.call(this) || this,
            n = new ti(e);
        return i.kind = n.kind, i.src = n.src, i.srclang = n.language, i.label = n.label, i.default = n.default, Object.defineProperties(ft(i), {
          readyState: {
            get: function () {
              return t;
            }
          },
          track: {
            get: function () {
              return n;
            }
          }
        }), t = 0, n.addEventListener("loadeddata", function () {
          t = 2, i.trigger({
            type: "load",
            target: ft(i)
          });
        }), i;
      }

      return mt(e, r), e;
    }(Xe);

    x.prototype.allowedEvents_ = {
      load: "load"
    }, x.NONE = 0, x.LOADING = 1, x.LOADED = 2, x.ERROR = 3;
    var ri = {
      audio: {
        ListClass: Ft,
        TrackClass: ii,
        capitalName: "Audio"
      },
      video: {
        ListClass: e,
        TrackClass: ni,
        capitalName: "Video"
      },
      text: {
        ListClass: n,
        TrackClass: ti,
        capitalName: "Text"
      }
    };
    Object.keys(ri).forEach(function (e) {
      ri[e].getterName = e + "Tracks", ri[e].privateName = e + "Tracks_";
    });
    var ai = {
      remoteText: {
        ListClass: n,
        TrackClass: ti,
        capitalName: "RemoteText",
        getterName: "remoteTextTracks",
        privateName: "remoteTextTracks_"
      },
      remoteTextEl: {
        ListClass: r,
        TrackClass: x,
        capitalName: "RemoteTextTrackEls",
        getterName: "remoteTextTrackEls",
        privateName: "remoteTextTrackEls_"
      }
    },
        si = g({}, ri, ai);
    ai.names = Object.keys(ai), ri.names = Object.keys(ri), si.names = [].concat(ai.names).concat(ri.names);

    var oi = Object.create || function (e) {
      if (1 !== arguments.length) throw new Error("Object.create shim only accepts one parameter.");
      return ui.prototype = e, new ui();
    };

    function ui() {}

    function li(e, t) {
      this.name = "ParsingError", this.code = e.code, this.message = t || e.message;
    }

    function ci(e) {
      function t(e, t, i, n) {
        return 3600 * (0 | e) + 60 * (0 | t) + (0 | i) + (0 | n) / 1e3;
      }

      e = e.match(/^(\d+):(\d{1,2})(:\d{1,2})?\.(\d{3})/);
      return e ? e[3] ? t(e[1], e[2], e[3].replace(":", ""), e[4]) : 59 < e[1] ? t(e[1], e[2], 0, e[4]) : t(0, e[1], e[2], e[4]) : null;
    }

    function di() {
      this.values = oi(null);
    }

    function hi(e, t, i, n) {
      var r,
          a,
          s = n ? e.split(n) : [e];

      for (r in s) "string" == typeof s[r] && 2 === (a = s[r].split(i)).length && t(a[0], a[1]);
    }

    function pi(t, e, s) {
      var i = t;

      function n() {
        var e = ci(t);
        if (null === e) throw new li(li.Errors.BadTimeStamp, "Malformed timestamp: " + i);
        return t = t.replace(/^[^\sa-zA-Z-]+/, ""), e;
      }

      function r() {
        t = t.replace(/^\s+/, "");
      }

      if (r(), e.startTime = n(), r(), "--\x3e" !== t.substr(0, 3)) throw new li(li.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '--\x3e'): " + i);
      t = t.substr(3), r(), e.endTime = n(), r(), function (e, t) {
        var a = new di();
        hi(e, function (e, t) {
          switch (e) {
            case "region":
              for (var i = s.length - 1; 0 <= i; i--) if (s[i].id === t) {
                a.set(e, s[i].region);
                break;
              }

              break;

            case "vertical":
              a.alt(e, t, ["rl", "lr"]);
              break;

            case "line":
              var n = t.split(","),
                  r = n[0];
              a.integer(e, r), a.percent(e, r) && a.set("snapToLines", !1), a.alt(e, r, ["auto"]), 2 === n.length && a.alt("lineAlign", n[1], ["start", "center", "end"]);
              break;

            case "position":
              n = t.split(","), a.percent(e, n[0]), 2 === n.length && a.alt("positionAlign", n[1], ["start", "center", "end"]);
              break;

            case "size":
              a.percent(e, t);
              break;

            case "align":
              a.alt(e, t, ["start", "center", "end", "left", "right"]);
          }
        }, /:/, /\s/), t.region = a.get("region", null), t.vertical = a.get("vertical", "");

        try {
          t.line = a.get("line", "auto");
        } catch (e) {}

        t.lineAlign = a.get("lineAlign", "start"), t.snapToLines = a.get("snapToLines", !0), t.size = a.get("size", 100);

        try {
          t.align = a.get("align", "center");
        } catch (e) {
          t.align = a.get("align", "middle");
        }

        try {
          t.position = a.get("position", "auto");
        } catch (e) {
          t.position = a.get("position", {
            start: 0,
            left: 0,
            center: 50,
            middle: 50,
            end: 100,
            right: 100
          }, t.align);
        }

        t.positionAlign = a.get("positionAlign", {
          start: "start",
          left: "start",
          center: "center",
          middle: "center",
          end: "end",
          right: "end"
        }, t.align);
      }(t, e);
    }

    ((li.prototype = oi(Error.prototype)).constructor = li).Errors = {
      BadSignature: {
        code: 0,
        message: "Malformed WebVTT signature."
      },
      BadTimeStamp: {
        code: 1,
        message: "Malformed time stamp."
      }
    }, di.prototype = {
      set: function (e, t) {
        this.get(e) || "" === t || (this.values[e] = t);
      },
      get: function (e, t, i) {
        return i ? this.has(e) ? this.values[e] : t[i] : this.has(e) ? this.values[e] : t;
      },
      has: function (e) {
        return e in this.values;
      },
      alt: function (e, t, i) {
        for (var n = 0; n < i.length; ++n) if (t === i[n]) {
          this.set(e, t);
          break;
        }
      },
      integer: function (e, t) {
        /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10));
      },
      percent: function (e, t) {
        return !!(t.match(/^([\d]{1,3})(\.[\d]*)?%$/) && 0 <= (t = parseFloat(t)) && t <= 100) && (this.set(e, t), !0);
      }
    };
    var fi = d.createElement && d.createElement("textarea"),
        mi = {
      c: "span",
      i: "i",
      b: "b",
      u: "u",
      ruby: "ruby",
      rt: "rt",
      v: "span",
      lang: "span"
    },
        gi = {
      white: "rgba(255,255,255,1)",
      lime: "rgba(0,255,0,1)",
      cyan: "rgba(0,255,255,1)",
      red: "rgba(255,0,0,1)",
      yellow: "rgba(255,255,0,1)",
      magenta: "rgba(255,0,255,1)",
      blue: "rgba(0,0,255,1)",
      black: "rgba(0,0,0,1)"
    },
        yi = {
      v: "title",
      lang: "lang"
    },
        vi = {
      rt: "ruby"
    };

    function _i(e, t) {
      for (var i, n, r, a, s, o, u, l, c, d, h = e.document.createElement("div"), p = h, f = []; null !== (i = function () {
        if (!t) return null;
        var e = t.match(/^([^<]*)(<[^>]*>?)?/);
        return e = e[1] || e[2], t = t.substr(e.length), e;
      }());) "<" !== i[0] ? p.appendChild(e.document.createTextNode((s = i, fi.innerHTML = s, s = fi.textContent, fi.textContent = "", s))) : "/" !== i[1] ? (a = ci(i.substr(1, i.length - 2))) ? (n = e.document.createProcessingInstruction("timestamp", a), p.appendChild(n)) : (r = i.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/)) && (l = r[1], c = r[3], d = void 0, d = mi[l], (n = d ? (d = e.document.createElement(d), (l = yi[l]) && c && (d[l] = c.trim()), d) : null) && (o = p, vi[(u = n).localName] && vi[u.localName] !== o.localName || (r[2] && ((a = r[2].split(".")).forEach(function (e) {
        var t = /^bg_/.test(e),
            e = t ? e.slice(3) : e;
        gi.hasOwnProperty(e) && (e = gi[e], n.style[t ? "background-color" : "color"] = e);
      }), n.className = a.join(" ")), f.push(r[1]), p.appendChild(n), p = n))) : f.length && f[f.length - 1] === i.substr(2).replace(">", "") && (f.pop(), p = p.parentNode);

      return h;
    }

    var bi = [[1470, 1470], [1472, 1472], [1475, 1475], [1478, 1478], [1488, 1514], [1520, 1524], [1544, 1544], [1547, 1547], [1549, 1549], [1563, 1563], [1566, 1610], [1645, 1647], [1649, 1749], [1765, 1766], [1774, 1775], [1786, 1805], [1807, 1808], [1810, 1839], [1869, 1957], [1969, 1969], [1984, 2026], [2036, 2037], [2042, 2042], [2048, 2069], [2074, 2074], [2084, 2084], [2088, 2088], [2096, 2110], [2112, 2136], [2142, 2142], [2208, 2208], [2210, 2220], [8207, 8207], [64285, 64285], [64287, 64296], [64298, 64310], [64312, 64316], [64318, 64318], [64320, 64321], [64323, 64324], [64326, 64449], [64467, 64829], [64848, 64911], [64914, 64967], [65008, 65020], [65136, 65140], [65142, 65276], [67584, 67589], [67592, 67592], [67594, 67637], [67639, 67640], [67644, 67644], [67647, 67669], [67671, 67679], [67840, 67867], [67872, 67897], [67903, 67903], [67968, 68023], [68030, 68031], [68096, 68096], [68112, 68115], [68117, 68119], [68121, 68147], [68160, 68167], [68176, 68184], [68192, 68223], [68352, 68405], [68416, 68437], [68440, 68466], [68472, 68479], [68608, 68680], [126464, 126467], [126469, 126495], [126497, 126498], [126500, 126500], [126503, 126503], [126505, 126514], [126516, 126519], [126521, 126521], [126523, 126523], [126530, 126530], [126535, 126535], [126537, 126537], [126539, 126539], [126541, 126543], [126545, 126546], [126548, 126548], [126551, 126551], [126553, 126553], [126555, 126555], [126557, 126557], [126559, 126559], [126561, 126562], [126564, 126564], [126567, 126570], [126572, 126578], [126580, 126583], [126585, 126588], [126590, 126590], [126592, 126601], [126603, 126619], [126625, 126627], [126629, 126633], [126635, 126651], [1114109, 1114109]];

    function Ti(e) {
      var t = [],
          i = "";
      if (!e || !e.childNodes) return "ltr";

      function a(e, t) {
        for (var i = t.childNodes.length - 1; 0 <= i; i--) e.push(t.childNodes[i]);
      }

      for (a(t, e); i = function e(t) {
        if (!t || !t.length) return null;
        var i = t.pop(),
            n = i.textContent || i.innerText;

        if (n) {
          var r = n.match(/^.*(\n|\r)/);
          return r ? r[t.length = 0] : n;
        }

        return "ruby" === i.tagName ? e(t) : i.childNodes ? (a(t, i), e(t)) : void 0;
      }(t);) for (var n = 0; n < i.length; n++) if (function (e) {
        for (var t = 0; t < bi.length; t++) {
          var i = bi[t];
          if (e >= i[0] && e <= i[1]) return 1;
        }
      }(i.charCodeAt(n))) return "rtl";

      return "ltr";
    }

    function Si() {}

    function Ei(e, t, i) {
      Si.call(this), this.cue = t, this.cueDiv = _i(e, t.text);
      var n = {
        color: "rgba(255, 255, 255, 1)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        position: "relative",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "inline",
        writingMode: "" === t.vertical ? "horizontal-tb" : "lr" === t.vertical ? "vertical-lr" : "vertical-rl",
        unicodeBidi: "plaintext"
      };
      this.applyStyles(n, this.cueDiv), this.div = e.document.createElement("div"), n = {
        direction: Ti(this.cueDiv),
        writingMode: "" === t.vertical ? "horizontal-tb" : "lr" === t.vertical ? "vertical-lr" : "vertical-rl",
        unicodeBidi: "plaintext",
        textAlign: "middle" === t.align ? "center" : t.align,
        font: i.font,
        whiteSpace: "pre-line",
        position: "absolute"
      }, this.applyStyles(n), this.div.appendChild(this.cueDiv);
      var r = 0;

      switch (t.positionAlign) {
        case "start":
          r = t.position;
          break;

        case "center":
          r = t.position - t.size / 2;
          break;

        case "end":
          r = t.position - t.size;
      }

      "" === t.vertical ? this.applyStyles({
        left: this.formatStyle(r, "%"),
        width: this.formatStyle(t.size, "%")
      }) : this.applyStyles({
        top: this.formatStyle(r, "%"),
        height: this.formatStyle(t.size, "%")
      }), this.move = function (e) {
        this.applyStyles({
          top: this.formatStyle(e.top, "px"),
          bottom: this.formatStyle(e.bottom, "px"),
          left: this.formatStyle(e.left, "px"),
          right: this.formatStyle(e.right, "px"),
          height: this.formatStyle(e.height, "px"),
          width: this.formatStyle(e.width, "px")
        });
      };
    }

    function ki(e) {
      var t, i, n, r;
      e.div && (t = e.div.offsetHeight, i = e.div.offsetWidth, n = e.div.offsetTop, r = (r = e.div.childNodes) && (r = r[0]) && r.getClientRects && r.getClientRects(), e = e.div.getBoundingClientRect(), r = r ? Math.max(r[0] && r[0].height || 0, e.height / r.length) : 0), this.left = e.left, this.right = e.right, this.top = e.top || n, this.height = e.height || t, this.bottom = e.bottom || n + (e.height || t), this.width = e.width || i, this.lineHeight = void 0 !== r ? r : e.lineHeight;
    }

    function Ci(e, t, o, u) {
      var i,
          n = new ki(t),
          r = t.cue,
          a = function (e) {
        if ("number" == typeof e.line && (e.snapToLines || 0 <= e.line && e.line <= 100)) return e.line;
        if (!e.track || !e.track.textTrackList || !e.track.textTrackList.mediaElement) return -1;

        for (var t = e.track, i = t.textTrackList, n = 0, r = 0; r < i.length && i[r] !== t; r++) "showing" === i[r].mode && n++;

        return -1 * ++n;
      }(r),
          s = [];

      if (r.snapToLines) {
        switch (r.vertical) {
          case "":
            s = ["+y", "-y"], i = "height";
            break;

          case "rl":
            s = ["+x", "-x"], i = "width";
            break;

          case "lr":
            s = ["-x", "+x"], i = "width";
        }

        var l = n.lineHeight,
            c = l * Math.round(a),
            d = o[i] + l,
            h = s[0];
        Math.abs(c) > d && (c = c < 0 ? -1 : 1, c *= Math.ceil(d / l) * l), a < 0 && (c += "" === r.vertical ? o.height : o.width, s = s.reverse()), n.move(h, c);
      } else {
        var p = n.lineHeight / o.height * 100;

        switch (r.lineAlign) {
          case "center":
            a -= p / 2;
            break;

          case "end":
            a -= p;
        }

        switch (r.vertical) {
          case "":
            t.applyStyles({
              top: t.formatStyle(a, "%")
            });
            break;

          case "rl":
            t.applyStyles({
              left: t.formatStyle(a, "%")
            });
            break;

          case "lr":
            t.applyStyles({
              right: t.formatStyle(a, "%")
            });
        }

        s = ["+y", "-x", "+x", "-y"], n = new ki(t);
      }

      n = function (e, t) {
        for (var i, n = new ki(e), r = 1, a = 0; a < t.length; a++) {
          for (; e.overlapsOppositeAxis(o, t[a]) || e.within(o) && e.overlapsAny(u);) e.move(t[a]);

          if (e.within(o)) return e;
          var s = e.intersectPercentage(o);
          s < r && (i = new ki(e), r = s), e = new ki(n);
        }

        return i || n;
      }(n, s);

      t.move(n.toCSSCompatValues(o));
    }

    function wi() {}

    Si.prototype.applyStyles = function (e, t) {
      for (var i in t = t || this.div, e) e.hasOwnProperty(i) && (t.style[i] = e[i]);
    }, Si.prototype.formatStyle = function (e, t) {
      return 0 === e ? 0 : e + t;
    }, (Ei.prototype = oi(Si.prototype)).constructor = Ei, ki.prototype.move = function (e, t) {
      switch (t = void 0 !== t ? t : this.lineHeight, e) {
        case "+x":
          this.left += t, this.right += t;
          break;

        case "-x":
          this.left -= t, this.right -= t;
          break;

        case "+y":
          this.top += t, this.bottom += t;
          break;

        case "-y":
          this.top -= t, this.bottom -= t;
      }
    }, ki.prototype.overlaps = function (e) {
      return this.left < e.right && this.right > e.left && this.top < e.bottom && this.bottom > e.top;
    }, ki.prototype.overlapsAny = function (e) {
      for (var t = 0; t < e.length; t++) if (this.overlaps(e[t])) return !0;

      return !1;
    }, ki.prototype.within = function (e) {
      return this.top >= e.top && this.bottom <= e.bottom && this.left >= e.left && this.right <= e.right;
    }, ki.prototype.overlapsOppositeAxis = function (e, t) {
      switch (t) {
        case "+x":
          return this.left < e.left;

        case "-x":
          return this.right > e.right;

        case "+y":
          return this.top < e.top;

        case "-y":
          return this.bottom > e.bottom;
      }
    }, ki.prototype.intersectPercentage = function (e) {
      return Math.max(0, Math.min(this.right, e.right) - Math.max(this.left, e.left)) * Math.max(0, Math.min(this.bottom, e.bottom) - Math.max(this.top, e.top)) / (this.height * this.width);
    }, ki.prototype.toCSSCompatValues = function (e) {
      return {
        top: this.top - e.top,
        bottom: e.bottom - this.bottom,
        left: this.left - e.left,
        right: e.right - this.right,
        height: this.height,
        width: this.width
      };
    }, ki.getSimpleBoxPosition = function (e) {
      var t = e.div ? e.div.offsetHeight : e.tagName ? e.offsetHeight : 0,
          i = e.div ? e.div.offsetWidth : e.tagName ? e.offsetWidth : 0,
          n = e.div ? e.div.offsetTop : e.tagName ? e.offsetTop : 0;
      return {
        left: (e = e.div ? e.div.getBoundingClientRect() : e.tagName ? e.getBoundingClientRect() : e).left,
        right: e.right,
        top: e.top || n,
        height: e.height || t,
        bottom: e.bottom || n + (e.height || t),
        width: e.width || i
      };
    }, wi.StringDecoder = function () {
      return {
        decode: function (e) {
          if (!e) return "";
          if ("string" != typeof e) throw new Error("Error - expected string data.");
          return decodeURIComponent(encodeURIComponent(e));
        }
      };
    }, wi.convertCueToDOMTree = function (e, t) {
      return e && t ? _i(e, t) : null;
    };
    wi.processCues = function (n, r, e) {
      if (!n || !r || !e) return null;

      for (; e.firstChild;) e.removeChild(e.firstChild);

      var a = n.document.createElement("div");

      if (a.style.position = "absolute", a.style.left = "0", a.style.right = "0", a.style.top = "0", a.style.bottom = "0", a.style.margin = "1.5%", e.appendChild(a), function (e) {
        for (var t = 0; t < e.length; t++) if (e[t].hasBeenReset || !e[t].displayState) return 1;
      }(r)) {
        var s = [],
            o = ki.getSimpleBoxPosition(a),
            u = {
          font: Math.round(.05 * o.height * 100) / 100 + "px sans-serif"
        };
        !function () {
          for (var e, t, i = 0; i < r.length; i++) t = r[i], e = new Ei(n, t, u), a.appendChild(e.div), Ci(0, e, o, s), t.displayState = e.div, s.push(ki.getSimpleBoxPosition(e));
        }();
      } else for (var t = 0; t < r.length; t++) a.appendChild(r[t].displayState);
    }, (wi.Parser = function (e, t, i) {
      i || (i = t, t = {}), t = t || {}, this.window = e, this.vttjs = t, this.state = "INITIAL", this.buffer = "", this.decoder = i || new TextDecoder("utf8"), this.regionList = [];
    }).prototype = {
      reportOrThrowError: function (e) {
        if (!(e instanceof li)) throw e;
        this.onparsingerror && this.onparsingerror(e);
      },
      parse: function (e) {
        var n = this;

        function t() {
          for (var e = n.buffer, t = 0; t < e.length && "\r" !== e[t] && "\n" !== e[t];) ++t;

          var i = e.substr(0, t);
          return "\r" === e[t] && ++t, "\n" === e[t] && ++t, n.buffer = e.substr(t), i;
        }

        function i(e) {
          e.match(/X-TIMESTAMP-MAP/) ? hi(e, function (e, t) {
            var i;
            "X-TIMESTAMP-MAP" === e && (t = t, i = new di(), hi(t, function (e, t) {
              switch (e) {
                case "MPEGT":
                  i.integer(e + "S", t);
                  break;

                case "LOCA":
                  i.set(e + "L", ci(t));
              }
            }, /[^\d]:/, /,/), n.ontimestampmap && n.ontimestampmap({
              MPEGTS: i.get("MPEGTS"),
              LOCAL: i.get("LOCAL")
            }));
          }, /=/) : hi(e, function (e, t) {
            var r;
            "Region" === e && (t = t, r = new di(), hi(t, function (e, t) {
              switch (e) {
                case "id":
                  r.set(e, t);
                  break;

                case "width":
                  r.percent(e, t);
                  break;

                case "lines":
                  r.integer(e, t);
                  break;

                case "regionanchor":
                case "viewportanchor":
                  var i = t.split(",");
                  if (2 !== i.length) break;
                  var n = new di();
                  if (n.percent("x", i[0]), n.percent("y", i[1]), !n.has("x") || !n.has("y")) break;
                  r.set(e + "X", n.get("x")), r.set(e + "Y", n.get("y"));
                  break;

                case "scroll":
                  r.alt(e, t, ["up"]);
              }
            }, /=/, /\s/), r.has("id") && ((t = new (n.vttjs.VTTRegion || n.window.VTTRegion)()).width = r.get("width", 100), t.lines = r.get("lines", 3), t.regionAnchorX = r.get("regionanchorX", 0), t.regionAnchorY = r.get("regionanchorY", 100), t.viewportAnchorX = r.get("viewportanchorX", 0), t.viewportAnchorY = r.get("viewportanchorY", 100), t.scroll = r.get("scroll", ""), n.onregion && n.onregion(t), n.regionList.push({
              id: r.get("id"),
              region: t
            })));
          }, /:/);
        }

        e && (n.buffer += n.decoder.decode(e, {
          stream: !0
        }));

        try {
          if ("INITIAL" === n.state) {
            if (!/\r\n|\n/.test(n.buffer)) return this;
            var r,
                a = (r = t()).match(/^WEBVTT([ \t].*)?$/);
            if (!a || !a[0]) throw new li(li.Errors.BadSignature);
            n.state = "HEADER";
          }

          for (var s = !1; n.buffer;) {
            if (!/\r\n|\n/.test(n.buffer)) return this;

            switch (s ? s = !1 : r = t(), n.state) {
              case "HEADER":
                /:/.test(r) ? i(r) : r || (n.state = "ID");
                continue;

              case "NOTE":
                r || (n.state = "ID");
                continue;

              case "ID":
                if (/^NOTE($|[ \t])/.test(r)) {
                  n.state = "NOTE";
                  break;
                }

                if (!r) continue;
                n.cue = new (n.vttjs.VTTCue || n.window.VTTCue)(0, 0, "");

                try {
                  n.cue.align = "center";
                } catch (e) {
                  n.cue.align = "middle";
                }

                if (n.state = "CUE", -1 === r.indexOf("--\x3e")) {
                  n.cue.id = r;
                  continue;
                }

              case "CUE":
                try {
                  pi(r, n.cue, n.regionList);
                } catch (e) {
                  n.reportOrThrowError(e), n.cue = null, n.state = "BADCUE";
                  continue;
                }

                n.state = "CUETEXT";
                continue;

              case "CUETEXT":
                var o = -1 !== r.indexOf("--\x3e");

                if (!r || o && (s = !0)) {
                  n.oncue && n.oncue(n.cue), n.cue = null, n.state = "ID";
                  continue;
                }

                n.cue.text && (n.cue.text += "\n"), n.cue.text += r.replace(/\u2028/g, "\n").replace(/u2029/g, "\n");
                continue;

              case "BADCUE":
                r || (n.state = "ID");
                continue;
            }
          }
        } catch (e) {
          n.reportOrThrowError(e), "CUETEXT" === n.state && n.cue && n.oncue && n.oncue(n.cue), n.cue = null, n.state = "INITIAL" === n.state ? "BADWEBVTT" : "BADCUE";
        }

        return this;
      },
      flush: function () {
        var t = this;

        try {
          if (t.buffer += t.decoder.decode(), !t.cue && "HEADER" !== t.state || (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state) throw new li(li.Errors.BadSignature);
        } catch (e) {
          t.reportOrThrowError(e);
        }

        return t.onflush && t.onflush(), this;
      }
    };
    var Ii = wi,
        xi = {
      "": 1,
      lr: 1,
      rl: 1
    },
        Ai = {
      start: 1,
      center: 1,
      end: 1,
      left: 1,
      right: 1,
      auto: 1,
      "line-left": 1,
      "line-right": 1
    };

    function Pi(e) {
      return "string" == typeof e && !!Ai[e.toLowerCase()] && e.toLowerCase();
    }

    function Li(e, t, i) {
      this.hasBeenReset = !1;
      var n = "",
          r = !1,
          a = e,
          s = t,
          o = i,
          u = null,
          l = "",
          c = !0,
          d = "auto",
          h = "start",
          p = "auto",
          f = "auto",
          m = 100,
          g = "center";
      Object.defineProperties(this, {
        id: {
          enumerable: !0,
          get: function () {
            return n;
          },
          set: function (e) {
            n = "" + e;
          }
        },
        pauseOnExit: {
          enumerable: !0,
          get: function () {
            return r;
          },
          set: function (e) {
            r = !!e;
          }
        },
        startTime: {
          enumerable: !0,
          get: function () {
            return a;
          },
          set: function (e) {
            if ("number" != typeof e) throw new TypeError("Start time must be set to a number.");
            a = e, this.hasBeenReset = !0;
          }
        },
        endTime: {
          enumerable: !0,
          get: function () {
            return s;
          },
          set: function (e) {
            if ("number" != typeof e) throw new TypeError("End time must be set to a number.");
            s = e, this.hasBeenReset = !0;
          }
        },
        text: {
          enumerable: !0,
          get: function () {
            return o;
          },
          set: function (e) {
            o = "" + e, this.hasBeenReset = !0;
          }
        },
        region: {
          enumerable: !0,
          get: function () {
            return u;
          },
          set: function (e) {
            u = e, this.hasBeenReset = !0;
          }
        },
        vertical: {
          enumerable: !0,
          get: function () {
            return l;
          },
          set: function (e) {
            e = "string" == typeof (e = e) && !!xi[e.toLowerCase()] && e.toLowerCase();
            if (!1 === e) throw new SyntaxError("Vertical: an invalid or illegal direction string was specified.");
            l = e, this.hasBeenReset = !0;
          }
        },
        snapToLines: {
          enumerable: !0,
          get: function () {
            return c;
          },
          set: function (e) {
            c = !!e, this.hasBeenReset = !0;
          }
        },
        line: {
          enumerable: !0,
          get: function () {
            return d;
          },
          set: function (e) {
            if ("number" != typeof e && "auto" !== e) throw new SyntaxError("Line: an invalid number or illegal string was specified.");
            d = e, this.hasBeenReset = !0;
          }
        },
        lineAlign: {
          enumerable: !0,
          get: function () {
            return h;
          },
          set: function (e) {
            e = Pi(e);
            e && (h = e, this.hasBeenReset = !0);
          }
        },
        position: {
          enumerable: !0,
          get: function () {
            return p;
          },
          set: function (e) {
            if (e < 0 || 100 < e) throw new Error("Position must be between 0 and 100.");
            p = e, this.hasBeenReset = !0;
          }
        },
        positionAlign: {
          enumerable: !0,
          get: function () {
            return f;
          },
          set: function (e) {
            e = Pi(e);
            e && (f = e, this.hasBeenReset = !0);
          }
        },
        size: {
          enumerable: !0,
          get: function () {
            return m;
          },
          set: function (e) {
            if (e < 0 || 100 < e) throw new Error("Size must be between 0 and 100.");
            m = e, this.hasBeenReset = !0;
          }
        },
        align: {
          enumerable: !0,
          get: function () {
            return g;
          },
          set: function (e) {
            e = Pi(e);
            if (!e) throw new SyntaxError("align: an invalid or illegal alignment string was specified.");
            g = e, this.hasBeenReset = !0;
          }
        }
      }), this.displayState = void 0;
    }

    Li.prototype.getCueAsHTML = function () {
      return WebVTT.convertCueToDOMTree(window, this.text);
    };

    var Di = Li,
        Oi = {
      "": !0,
      up: !0
    };

    function Ri(e) {
      return "number" == typeof e && 0 <= e && e <= 100;
    }

    function Mi() {
      var t = 100,
          i = 3,
          n = 0,
          r = 100,
          a = 0,
          s = 100,
          o = "";
      Object.defineProperties(this, {
        width: {
          enumerable: !0,
          get: function () {
            return t;
          },
          set: function (e) {
            if (!Ri(e)) throw new Error("Width must be between 0 and 100.");
            t = e;
          }
        },
        lines: {
          enumerable: !0,
          get: function () {
            return i;
          },
          set: function (e) {
            if ("number" != typeof e) throw new TypeError("Lines must be set to a number.");
            i = e;
          }
        },
        regionAnchorY: {
          enumerable: !0,
          get: function () {
            return r;
          },
          set: function (e) {
            if (!Ri(e)) throw new Error("RegionAnchorX must be between 0 and 100.");
            r = e;
          }
        },
        regionAnchorX: {
          enumerable: !0,
          get: function () {
            return n;
          },
          set: function (e) {
            if (!Ri(e)) throw new Error("RegionAnchorY must be between 0 and 100.");
            n = e;
          }
        },
        viewportAnchorY: {
          enumerable: !0,
          get: function () {
            return s;
          },
          set: function (e) {
            if (!Ri(e)) throw new Error("ViewportAnchorY must be between 0 and 100.");
            s = e;
          }
        },
        viewportAnchorX: {
          enumerable: !0,
          get: function () {
            return a;
          },
          set: function (e) {
            if (!Ri(e)) throw new Error("ViewportAnchorX must be between 0 and 100.");
            a = e;
          }
        },
        scroll: {
          enumerable: !0,
          get: function () {
            return o;
          },
          set: function (e) {
            e = "string" == typeof (e = e) && !!Oi[e.toLowerCase()] && e.toLowerCase();
            !1 === e || (o = e);
          }
        }
      });
    }

    var Ni = t(function (e) {
      e = e.exports = {
        WebVTT: Ii,
        VTTCue: Di,
        VTTRegion: Mi
      };
      _.vttjs = e, _.WebVTT = e.WebVTT;
      var t = e.VTTCue,
          i = e.VTTRegion,
          n = _.VTTCue,
          r = _.VTTRegion;
      e.shim = function () {
        _.VTTCue = t, _.VTTRegion = i;
      }, e.restore = function () {
        _.VTTCue = n, _.VTTRegion = r;
      }, _.VTTCue || e.shim();
    });
    Ni.WebVTT, Ni.VTTCue, Ni.VTTRegion;

    var Ui = function (n) {
      function i(t, e) {
        var i;
        return void 0 === e && (e = function () {}), (t = void 0 === t ? {} : t).reportTouchActivity = !1, (i = n.call(this, null, t, e) || this).onDurationChange_ = function (e) {
          return i.onDurationChange(e);
        }, i.trackProgress_ = function (e) {
          return i.trackProgress(e);
        }, i.trackCurrentTime_ = function (e) {
          return i.trackCurrentTime(e);
        }, i.stopTrackingCurrentTime_ = function (e) {
          return i.stopTrackingCurrentTime(e);
        }, i.disposeSourceHandler_ = function (e) {
          return i.disposeSourceHandler(e);
        }, i.hasStarted_ = !1, i.on("playing", function () {
          this.hasStarted_ = !0;
        }), i.on("loadstart", function () {
          this.hasStarted_ = !1;
        }), si.names.forEach(function (e) {
          e = si[e];
          t && t[e.getterName] && (i[e.privateName] = t[e.getterName]);
        }), i.featuresProgressEvents || i.manualProgressOn(), i.featuresTimeupdateEvents || i.manualTimeUpdatesOn(), ["Text", "Audio", "Video"].forEach(function (e) {
          !1 === t["native" + e + "Tracks"] && (i["featuresNative" + e + "Tracks"] = !1);
        }), !1 === t.nativeCaptions || !1 === t.nativeTextTracks ? i.featuresNativeTextTracks = !1 : !0 !== t.nativeCaptions && !0 !== t.nativeTextTracks || (i.featuresNativeTextTracks = !0), i.featuresNativeTextTracks || i.emulateTextTracks(), i.preloadTextTracks = !1 !== t.preloadTextTracks, i.autoRemoteTextTracks_ = new si.text.ListClass(), i.initTrackListeners(), t.nativeControlsForTouch || i.emitTapEvents(), i.constructor && (i.name_ = i.constructor.name || "Unknown Tech"), i;
      }

      mt(i, n);
      var e = i.prototype;
      return e.triggerSourceset = function (e) {
        var t = this;
        this.isReady_ || this.one("ready", function () {
          return t.setTimeout(function () {
            return t.triggerSourceset(e);
          }, 1);
        }), this.trigger({
          src: e,
          type: "sourceset"
        });
      }, e.manualProgressOn = function () {
        this.on("durationchange", this.onDurationChange_), this.manualProgress = !0, this.one("ready", this.trackProgress_);
      }, e.manualProgressOff = function () {
        this.manualProgress = !1, this.stopTrackingProgress(), this.off("durationchange", this.onDurationChange_);
      }, e.trackProgress = function (e) {
        this.stopTrackingProgress(), this.progressInterval = this.setInterval(We(this, function () {
          var e = this.bufferedPercent();
          this.bufferedPercent_ !== e && this.trigger("progress"), 1 === (this.bufferedPercent_ = e) && this.stopTrackingProgress();
        }), 500);
      }, e.onDurationChange = function (e) {
        this.duration_ = this.duration();
      }, e.buffered = function () {
        return vt(0, 0);
      }, e.bufferedPercent = function () {
        return _t(this.buffered(), this.duration_);
      }, e.stopTrackingProgress = function () {
        this.clearInterval(this.progressInterval);
      }, e.manualTimeUpdatesOn = function () {
        this.manualTimeUpdates = !0, this.on("play", this.trackCurrentTime_), this.on("pause", this.stopTrackingCurrentTime_);
      }, e.manualTimeUpdatesOff = function () {
        this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off("play", this.trackCurrentTime_), this.off("pause", this.stopTrackingCurrentTime_);
      }, e.trackCurrentTime = function () {
        this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = this.setInterval(function () {
          this.trigger({
            type: "timeupdate",
            target: this,
            manuallyTriggered: !0
          });
        }, 250);
      }, e.stopTrackingCurrentTime = function () {
        this.clearInterval(this.currentTimeInterval), this.trigger({
          type: "timeupdate",
          target: this,
          manuallyTriggered: !0
        });
      }, e.dispose = function () {
        this.clearTracks(ri.names), this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), n.prototype.dispose.call(this);
      }, e.clearTracks = function (e) {
        var r = this;
        (e = [].concat(e)).forEach(function (e) {
          for (var t = r[e + "Tracks"]() || [], i = t.length; i--;) {
            var n = t[i];
            "text" === e && r.removeRemoteTextTrack(n), t.removeTrack(n);
          }
        });
      }, e.cleanupAutoTextTracks = function () {
        for (var e = this.autoRemoteTextTracks_ || [], t = e.length; t--;) {
          var i = e[t];
          this.removeRemoteTextTrack(i);
        }
      }, e.reset = function () {}, e.crossOrigin = function () {}, e.setCrossOrigin = function () {}, e.error = function (e) {
        return void 0 !== e && (this.error_ = new bt(e), this.trigger("error")), this.error_;
      }, e.played = function () {
        return this.hasStarted_ ? vt(0, 0) : vt();
      }, e.play = function () {}, e.setScrubbing = function () {}, e.scrubbing = function () {}, e.setCurrentTime = function () {
        this.manualTimeUpdates && this.trigger({
          type: "timeupdate",
          target: this,
          manuallyTriggered: !0
        });
      }, e.initTrackListeners = function () {
        var r = this;
        ri.names.forEach(function (e) {
          function t() {
            r.trigger(e + "trackchange");
          }

          var i = ri[e],
              n = r[i.getterName]();
          n.addEventListener("removetrack", t), n.addEventListener("addtrack", t), r.on("dispose", function () {
            n.removeEventListener("removetrack", t), n.removeEventListener("addtrack", t);
          });
        });
      }, e.addWebVttScript_ = function () {
        var e,
            t = this;
        _.WebVTT || (d.body.contains(this.el()) ? !this.options_["vtt.js"] && E(Ni) && 0 < Object.keys(Ni).length ? this.trigger("vttjsloaded") : ((e = d.createElement("script")).src = this.options_["vtt.js"] || "https://vjs.zencdn.net/vttjs/0.14.1/vtt.min.js", e.onload = function () {
          t.trigger("vttjsloaded");
        }, e.onerror = function () {
          t.trigger("vttjserror");
        }, this.on("dispose", function () {
          e.onload = null, e.onerror = null;
        }), _.WebVTT = !0, this.el().parentNode.appendChild(e)) : this.ready(this.addWebVttScript_));
      }, e.emulateTextTracks = function () {
        function t(e) {
          return n.addTrack(e.track);
        }

        function i(e) {
          return n.removeTrack(e.track);
        }

        var e = this,
            n = this.textTracks(),
            r = this.remoteTextTracks();
        r.on("addtrack", t), r.on("removetrack", i), this.addWebVttScript_();

        function a() {
          return e.trigger("texttrackchange");
        }

        function s() {
          a();

          for (var e = 0; e < n.length; e++) {
            var t = n[e];
            t.removeEventListener("cuechange", a), "showing" === t.mode && t.addEventListener("cuechange", a);
          }
        }

        s(), n.addEventListener("change", s), n.addEventListener("addtrack", s), n.addEventListener("removetrack", s), this.on("dispose", function () {
          r.off("addtrack", t), r.off("removetrack", i), n.removeEventListener("change", s), n.removeEventListener("addtrack", s), n.removeEventListener("removetrack", s);

          for (var e = 0; e < n.length; e++) n[e].removeEventListener("cuechange", a);
        });
      }, e.addTextTrack = function (e, t, i) {
        if (!e) throw new Error("TextTrack kind is required but was not provided");
        return function (e, t, i, n, r) {
          void 0 === r && (r = {});
          var a = e.textTracks();
          return r.kind = t, i && (r.label = i), n && (r.language = n), r.tech = e, r = new si.text.TrackClass(r), a.addTrack(r), r;
        }(this, e, t, i);
      }, e.createRemoteTextTrack = function (e) {
        e = ct(e, {
          tech: this
        });
        return new ai.remoteTextEl.TrackClass(e);
      }, e.addRemoteTextTrack = function (e, t) {
        var i = this,
            n = this.createRemoteTextTrack(e = void 0 === e ? {} : e);
        return !0 !== t && !1 !== t && (f.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'), t = !0), this.remoteTextTrackEls().addTrackElement_(n), this.remoteTextTracks().addTrack(n.track), !0 !== t && this.ready(function () {
          return i.autoRemoteTextTracks_.addTrack(n.track);
        }), n;
      }, e.removeRemoteTextTrack = function (e) {
        var t = this.remoteTextTrackEls().getTrackElementByTrack_(e);
        this.remoteTextTrackEls().removeTrackElement_(t), this.remoteTextTracks().removeTrack(e), this.autoRemoteTextTracks_.removeTrack(e);
      }, e.getVideoPlaybackQuality = function () {
        return {};
      }, e.requestPictureInPicture = function () {
        var e = this.options_.Promise || _.Promise;
        if (e) return e.reject();
      }, e.disablePictureInPicture = function () {
        return !0;
      }, e.setDisablePictureInPicture = function () {}, e.setPoster = function () {}, e.playsinline = function () {}, e.setPlaysinline = function () {}, e.overrideNativeAudioTracks = function () {}, e.overrideNativeVideoTracks = function () {}, e.canPlayType = function () {
        return "";
      }, i.canPlayType = function () {
        return "";
      }, i.canPlaySource = function (e, t) {
        return i.canPlayType(e.type);
      }, i.isTech = function (e) {
        return e.prototype instanceof i || e instanceof i || e === i;
      }, i.registerTech = function (e, t) {
        if (i.techs_ || (i.techs_ = {}), !i.isTech(t)) throw new Error("Tech " + e + " must be a Tech");
        if (!i.canPlayType) throw new Error("Techs must have a static canPlayType method on them");
        if (!i.canPlaySource) throw new Error("Techs must have a static canPlaySource method on them");
        return e = lt(e), i.techs_[e] = t, i.techs_[ut(e)] = t, "Tech" !== e && i.defaultTechOrder_.push(e), t;
      }, i.getTech = function (e) {
        if (e) return i.techs_ && i.techs_[e] ? i.techs_[e] : (e = lt(e), _ && _.videojs && _.videojs[e] ? (f.warn("The " + e + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), _.videojs[e]) : void 0);
      }, i;
    }(pt);

    si.names.forEach(function (e) {
      var t = si[e];

      Ui.prototype[t.getterName] = function () {
        return this[t.privateName] = this[t.privateName] || new t.ListClass(), this[t.privateName];
      };
    }), Ui.prototype.featuresVolumeControl = !0, Ui.prototype.featuresMuteControl = !0, Ui.prototype.featuresFullscreenResize = !1, Ui.prototype.featuresPlaybackRate = !1, Ui.prototype.featuresProgressEvents = !1, Ui.prototype.featuresSourceset = !1, Ui.prototype.featuresTimeupdateEvents = !1, Ui.prototype.featuresNativeTextTracks = !1, Ui.withSourceHandlers = function (r) {
      r.registerSourceHandler = function (e, t) {
        var i = (i = r.sourceHandlers) || (r.sourceHandlers = []);
        void 0 === t && (t = i.length), i.splice(t, 0, e);
      }, r.canPlayType = function (e) {
        for (var t, i = r.sourceHandlers || [], n = 0; n < i.length; n++) if (t = i[n].canPlayType(e)) return t;

        return "";
      }, r.selectSourceHandler = function (e, t) {
        for (var i = r.sourceHandlers || [], n = 0; n < i.length; n++) if (i[n].canHandleSource(e, t)) return i[n];

        return null;
      }, r.canPlaySource = function (e, t) {
        var i = r.selectSourceHandler(e, t);
        return i ? i.canHandleSource(e, t) : "";
      };
      ["seekable", "seeking", "duration"].forEach(function (e) {
        var t = this[e];
        "function" == typeof t && (this[e] = function () {
          return this.sourceHandler_ && this.sourceHandler_[e] ? this.sourceHandler_[e].apply(this.sourceHandler_, arguments) : t.apply(this, arguments);
        });
      }, r.prototype), r.prototype.setSource = function (e) {
        var t = r.selectSourceHandler(e, this.options_);
        t || (r.nativeSourceHandler ? t = r.nativeSourceHandler : f.error("No source handler found for the current source.")), this.disposeSourceHandler(), this.off("dispose", this.disposeSourceHandler_), t !== r.nativeSourceHandler && (this.currentSource_ = e), this.sourceHandler_ = t.handleSource(e, this, this.options_), this.one("dispose", this.disposeSourceHandler_);
      }, r.prototype.disposeSourceHandler = function () {
        this.currentSource_ && (this.clearTracks(["audio", "video"]), this.currentSource_ = null), this.cleanupAutoTextTracks(), this.sourceHandler_ && (this.sourceHandler_.dispose && this.sourceHandler_.dispose(), this.sourceHandler_ = null);
      };
    }, pt.registerComponent("Tech", Ui), Ui.registerTech("Tech", Ui), Ui.defaultTechOrder_ = [];
    var Bi = {},
        Fi = {},
        ji = {};

    function Hi(e, t, i) {
      e.setTimeout(function () {
        return function i(n, e, r, a, s, o) {
          void 0 === n && (n = {});
          void 0 === e && (e = []);
          void 0 === s && (s = []);
          void 0 === o && (o = !1);
          var t = e,
              e = t[0],
              u = t.slice(1);
          if ("string" == typeof e) i(n, Bi[e], r, a, s, o);else if (e) {
            var l = Xi(a, e);
            if (!l.setSource) return s.push(l), i(n, u, r, a, s, o);
            l.setSource(T({}, n), function (e, t) {
              return e ? i(n, u, r, a, s, o) : (s.push(l), void i(t, n.type === t.type ? u : Bi[t.type], r, a, s, o));
            });
          } else u.length ? i(n, u, r, a, s, o) : o ? r(n, s) : i(n, Bi["*"], r, a, s, !0);
        }(t, Bi[t.type], i, e);
      }, 1);
    }

    function qi(e, t, i, n) {
      void 0 === n && (n = null);
      var r = "call" + lt(i),
          r = e.reduce(Gi(r), n),
          n = r === ji,
          r = n ? null : t[i](r);
      return function (e, t, i, n) {
        for (var r = e.length - 1; 0 <= r; r--) {
          var a = e[r];
          a[t] && a[t](n, i);
        }
      }(e, i, r, n), r;
    }

    var Vi = {
      buffered: 1,
      currentTime: 1,
      duration: 1,
      muted: 1,
      played: 1,
      paused: 1,
      seekable: 1,
      volume: 1,
      ended: 1
    },
        Wi = {
      setCurrentTime: 1,
      setMuted: 1,
      setVolume: 1
    },
        zi = {
      play: 1,
      pause: 1
    };

    function Gi(i) {
      return function (e, t) {
        return e === ji ? ji : t[i] ? t[i](e) : e;
      };
    }

    function Xi(e, t) {
      var i = Fi[e.id()],
          n = null;
      if (null == i) return n = t(e), Fi[e.id()] = [[t, n]], n;

      for (var r = 0; r < i.length; r++) {
        var a = i[r],
            s = a[0],
            a = a[1];
        s === t && (n = a);
      }

      return null === n && (n = t(e), i.push([t, n])), n;
    }

    function Ki(e) {
      return e = Ut(e = void 0 === e ? "" : e), Qi[e.toLowerCase()] || "";
    }

    function Yi(e) {
      var t;
      return e = Array.isArray(e) ? (t = [], e.forEach(function (e) {
        e = Yi(e), Array.isArray(e) ? t = t.concat(e) : S(e) && t.push(e);
      }), t) : "string" == typeof e && e.trim() ? [$i({
        src: e
      })] : S(e) && "string" == typeof e.src && e.src && e.src.trim() ? [$i(e)] : [];
    }

    var Qi = {
      opus: "video/ogg",
      ogv: "video/ogg",
      mp4: "video/mp4",
      mov: "video/mp4",
      m4v: "video/mp4",
      mkv: "video/x-matroska",
      m4a: "audio/mp4",
      mp3: "audio/mpeg",
      aac: "audio/aac",
      caf: "audio/x-caf",
      flac: "audio/flac",
      oga: "audio/ogg",
      wav: "audio/wav",
      m3u8: "application/x-mpegURL",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      png: "image/png",
      svg: "image/svg+xml",
      webp: "image/webp"
    };

    function $i(e) {
      var t;
      return e.type || (t = Ki(e.src)) && (e.type = t), e;
    }

    A = function (u) {
      function e(e, t, i) {
        var n = ct({
          createEl: !1
        }, t),
            i = u.call(this, e, n, i) || this;
        if (t.playerOptions.sources && 0 !== t.playerOptions.sources.length) e.src(t.playerOptions.sources);else for (var r = 0, a = t.playerOptions.techOrder; r < a.length; r++) {
          var s = lt(a[r]),
              o = Ui.getTech(s);

          if ((o = !s ? pt.getComponent(s) : o) && o.isSupported()) {
            e.loadTech_(s);
            break;
          }
        }
        return i;
      }

      return mt(e, u), e;
    }(pt);

    pt.registerComponent("MediaLoader", A);

    B = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.handleMouseOver_ = function (e) {
          return i.handleMouseOver(e);
        }, i.handleMouseOut_ = function (e) {
          return i.handleMouseOut(e);
        }, i.handleClick_ = function (e) {
          return i.handleClick(e);
        }, i.handleKeyDown_ = function (e) {
          return i.handleKeyDown(e);
        }, i.emitTapEvents(), i.enable(), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function (e, t, i) {
        void 0 === e && (e = "div"), void 0 === t && (t = {}), void 0 === i && (i = {}), t = T({
          innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
          className: this.buildCSSClass(),
          tabIndex: 0
        }, t), "button" === e && f.error("Creating a ClickableComponent with an HTML element of " + e + " is not supported; use a Button instead."), i = T({
          role: "button"
        }, i), this.tabIndex_ = t.tabIndex;
        i = n.prototype.createEl.call(this, e, t, i);
        return this.createControlTextEl(i), i;
      }, t.dispose = function () {
        this.controlTextEl_ = null, n.prototype.dispose.call(this);
      }, t.createControlTextEl = function (e) {
        return this.controlTextEl_ = J("span", {
          className: "vjs-control-text"
        }, {
          "aria-live": "polite"
        }), e && e.appendChild(this.controlTextEl_), this.controlText(this.controlText_, e), this.controlTextEl_;
      }, t.controlText = function (e, t) {
        if (void 0 === t && (t = this.el()), void 0 === e) return this.controlText_ || "Need Text";
        var i = this.localize(e);
        this.controlText_ = e, Z(this.controlTextEl_, i), this.nonIconControl || this.player_.options_.noUITitleAttributes || t.setAttribute("title", i);
      }, t.buildCSSClass = function () {
        return "vjs-control vjs-button " + n.prototype.buildCSSClass.call(this);
      }, t.enable = function () {
        this.enabled_ || (this.enabled_ = !0, this.removeClass("vjs-disabled"), this.el_.setAttribute("aria-disabled", "false"), "undefined" != typeof this.tabIndex_ && this.el_.setAttribute("tabIndex", this.tabIndex_), this.on(["tap", "click"], this.handleClick_), this.on("keydown", this.handleKeyDown_));
      }, t.disable = function () {
        this.enabled_ = !1, this.addClass("vjs-disabled"), this.el_.setAttribute("aria-disabled", "true"), "undefined" != typeof this.tabIndex_ && this.el_.removeAttribute("tabIndex"), this.off("mouseover", this.handleMouseOver_), this.off("mouseout", this.handleMouseOut_), this.off(["tap", "click"], this.handleClick_), this.off("keydown", this.handleKeyDown_);
      }, t.handleLanguagechange = function () {
        this.controlText(this.controlText_);
      }, t.handleClick = function (e) {
        this.options_.clickHandler && this.options_.clickHandler.call(this, arguments);
      }, t.handleKeyDown = function (e) {
        xt.isEventKey(e, "Space") || xt.isEventKey(e, "Enter") ? (e.preventDefault(), e.stopPropagation(), this.trigger("click")) : n.prototype.handleKeyDown.call(this, e);
      }, e;
    }(pt);

    pt.registerComponent("ClickableComponent", B), pt.registerComponent("PosterImage", function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.update(), i.update_ = function (e) {
          return i.update(e);
        }, e.on("posterchange", i.update_), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.dispose = function () {
        this.player().off("posterchange", this.update_), n.prototype.dispose.call(this);
      }, t.createEl = function () {
        return J("div", {
          className: "vjs-poster",
          tabIndex: -1
        });
      }, t.update = function (e) {
        var t = this.player().poster();
        this.setSrc(t), t ? this.show() : this.hide();
      }, t.setSrc = function (e) {
        this.el_.style.backgroundImage = e ? 'url("' + e + '")' : "";
      }, t.handleClick = function (e) {
        var t;
        this.player_.controls() && (t = this.player_.usingPlugin("eme") && this.player_.eme.sessions && 0 < this.player_.eme.sessions.length, !this.player_.tech(!0) || (U || R) && t || this.player_.tech(!0).focus(), this.player_.paused() ? kt(this.player_.play()) : this.player_.pause());
      }, e;
    }(B));
    var Ji = "#222",
        Zi = {
      monospace: "monospace",
      sansSerif: "sans-serif",
      serif: "serif",
      monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
      monospaceSerif: '"Courier New", monospace',
      proportionalSansSerif: "sans-serif",
      proportionalSerif: "serif",
      casual: '"Comic Sans MS", Impact, fantasy',
      script: '"Monotype Corsiva", cursive',
      smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
    };

    function en(e, t) {
      var i;
      if (4 === e.length) i = e[1] + e[1] + e[2] + e[2] + e[3] + e[3];else {
        if (7 !== e.length) throw new Error("Invalid color code provided, " + e + "; must be formatted as e.g. #f0e or #f604e2.");
        i = e.slice(1);
      }
      return "rgba(" + parseInt(i.slice(0, 2), 16) + "," + parseInt(i.slice(2, 4), 16) + "," + parseInt(i.slice(4, 6), 16) + "," + t + ")";
    }

    function tn(e, t, i) {
      try {
        e.style[t] = i;
      } catch (e) {
        return;
      }
    }

    pt.registerComponent("TextTrackDisplay", function (a) {
      function e(i, e, t) {
        function n(e) {
          return r.updateDisplay(e);
        }

        var r = a.call(this, i, e, t) || this;
        return i.on("loadstart", function (e) {
          return r.toggleDisplay(e);
        }), i.on("texttrackchange", n), i.on("loadedmetadata", function (e) {
          return r.preselectTrack(e);
        }), i.ready(We(ft(r), function () {
          if (i.tech_ && i.tech_.featuresNativeTextTracks) this.hide();else {
            i.on("fullscreenchange", n), i.on("playerresize", n), _.addEventListener("orientationchange", n), i.on("dispose", function () {
              return _.removeEventListener("orientationchange", n);
            });

            for (var e = this.options_.playerOptions.tracks || [], t = 0; t < e.length; t++) this.player_.addRemoteTextTrack(e[t], !0);

            this.preselectTrack();
          }
        })), r;
      }

      mt(e, a);
      var t = e.prototype;
      return t.preselectTrack = function () {
        for (var e, t, i, n = {
          captions: 1,
          subtitles: 1
        }, r = this.player_.textTracks(), a = this.player_.cache_.selectedLanguage, s = 0; s < r.length; s++) {
          var o = r[s];
          a && a.enabled && a.language && a.language === o.language && o.kind in n ? i = o.kind !== a.kind && i || o : a && !a.enabled ? t = e = i = null : o.default && ("descriptions" !== o.kind || e ? o.kind in n && !t && (t = o) : e = o);
        }

        i ? i.mode = "showing" : t ? t.mode = "showing" : e && (e.mode = "showing");
      }, t.toggleDisplay = function () {
        this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show();
      }, t.createEl = function () {
        return a.prototype.createEl.call(this, "div", {
          className: "vjs-text-track-display"
        }, {
          "aria-live": "off",
          "aria-atomic": "true"
        });
      }, t.clearDisplay = function () {
        "function" == typeof _.WebVTT && _.WebVTT.processCues(_, [], this.el_);
      }, t.updateDisplay = function () {
        var e = this.player_.textTracks(),
            t = this.options_.allowMultipleShowingTracks;

        if (this.clearDisplay(), t) {
          for (var i = [], n = 0; n < e.length; ++n) {
            var r = e[n];
            "showing" === r.mode && i.push(r);
          }

          this.updateForTrack(i);
        } else {
          for (var a = null, s = null, o = e.length; o--;) {
            var u = e[o];
            "showing" === u.mode && ("descriptions" === u.kind ? a = u : s = u);
          }

          s ? ("off" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "off"), this.updateForTrack(s)) : a && ("assertive" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "assertive"), this.updateForTrack(a));
        }
      }, t.updateDisplayState = function (e) {
        for (var t = this.player_.textTrackSettings.getValues(), i = e.activeCues, n = i.length; n--;) {
          var r,
              a = i[n];
          a && (r = a.displayState, t.color && (r.firstChild.style.color = t.color), t.textOpacity && tn(r.firstChild, "color", en(t.color || "#fff", t.textOpacity)), t.backgroundColor && (r.firstChild.style.backgroundColor = t.backgroundColor), t.backgroundOpacity && tn(r.firstChild, "backgroundColor", en(t.backgroundColor || "#000", t.backgroundOpacity)), t.windowColor && (t.windowOpacity ? tn(r, "backgroundColor", en(t.windowColor, t.windowOpacity)) : r.style.backgroundColor = t.windowColor), t.edgeStyle && ("dropshadow" === t.edgeStyle ? r.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px " + Ji : "raised" === t.edgeStyle ? r.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px " + Ji : "depressed" === t.edgeStyle ? r.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px " + Ji : "uniform" === t.edgeStyle && (r.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px " + Ji)), t.fontPercent && 1 !== t.fontPercent && (a = _.parseFloat(r.style.fontSize), r.style.fontSize = a * t.fontPercent + "px", r.style.height = "auto", r.style.top = "auto"), t.fontFamily && "default" !== t.fontFamily && ("small-caps" === t.fontFamily ? r.firstChild.style.fontVariant = "small-caps" : r.firstChild.style.fontFamily = Zi[t.fontFamily]));
        }
      }, t.updateForTrack = function (e) {
        if (Array.isArray(e) || (e = [e]), "function" == typeof _.WebVTT && !e.every(function (e) {
          return !e.activeCues;
        })) {
          for (var t = [], i = 0; i < e.length; ++i) for (var n = e[i], r = 0; r < n.activeCues.length; ++r) t.push(n.activeCues[r]);

          _.WebVTT.processCues(_, t, this.el_);

          for (var a = 0; a < e.length; ++a) {
            for (var s = e[a], o = 0; o < s.activeCues.length; ++o) {
              var u = s.activeCues[o].displayState;
              ie(u, "vjs-text-track-cue"), ie(u, "vjs-text-track-cue-" + (s.language || a));
            }

            this.player_.textTrackSettings && this.updateDisplayState(s);
          }
        }
      }, e;
    }(pt)), pt.registerComponent("LoadingSpinner", function (i) {
      function e() {
        return i.apply(this, arguments) || this;
      }

      return mt(e, i), e.prototype.createEl = function () {
        var e = this.player_.isAudio(),
            t = this.localize(e ? "Audio Player" : "Video Player"),
            e = J("span", {
          className: "vjs-control-text",
          innerHTML: this.localize("{1} is loading.", [t])
        }),
            t = i.prototype.createEl.call(this, "div", {
          className: "vjs-loading-spinner",
          dir: "ltr"
        });
        return t.appendChild(e), t;
      }, e;
    }(pt));

    var nn = function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }

      mt(e, t);
      var i = e.prototype;
      return i.createEl = function (e, t, i) {
        void 0 === t && (t = {}), void 0 === i && (i = {}), t = T({
          innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
          className: this.buildCSSClass()
        }, t), i = T({
          type: "button"
        }, i);
        i = pt.prototype.createEl.call(this, "button", t, i);
        return this.createControlTextEl(i), i;
      }, i.addChild = function (e, t) {
        void 0 === t && (t = {});
        var i = this.constructor.name;
        return f.warn("Adding an actionable (user controllable) child to a Button (" + i + ") is not supported; use a ClickableComponent instead."), pt.prototype.addChild.call(this, e, t);
      }, i.enable = function () {
        t.prototype.enable.call(this), this.el_.removeAttribute("disabled");
      }, i.disable = function () {
        t.prototype.disable.call(this), this.el_.setAttribute("disabled", "disabled");
      }, i.handleKeyDown = function (e) {
        xt.isEventKey(e, "Space") || xt.isEventKey(e, "Enter") ? e.stopPropagation() : t.prototype.handleKeyDown.call(this, e);
      }, e;
    }(B);

    pt.registerComponent("Button", nn);

    H = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.mouseused_ = !1, i.on("mousedown", function (e) {
          return i.handleMouseDown(e);
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-big-play-button";
      }, t.handleClick = function (e) {
        var t = this.player_.play();

        if (this.mouseused_ && e.clientX && e.clientY) {
          var i = this.player_.usingPlugin("eme") && this.player_.eme.sessions && 0 < this.player_.eme.sessions.length;
          return kt(t), void (!this.player_.tech(!0) || (U || R) && i || this.player_.tech(!0).focus());
        }

        var i = this.player_.getChild("controlBar"),
            n = i && i.getChild("playToggle");
        n ? (i = function () {
          return n.focus();
        }, Et(t) ? t.then(i, function () {}) : this.setTimeout(i, 1)) : this.player_.tech(!0).focus();
      }, t.handleKeyDown = function (e) {
        this.mouseused_ = !1, n.prototype.handleKeyDown.call(this, e);
      }, t.handleMouseDown = function (e) {
        this.mouseused_ = !0;
      }, e;
    }(nn);

    H.prototype.controlText_ = "Play Video", pt.registerComponent("BigPlayButton", H), pt.registerComponent("CloseButton", function (i) {
      function e(e, t) {
        e = i.call(this, e, t) || this;
        return e.controlText(t && t.controlText || e.localize("Close")), e;
      }

      mt(e, i);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-close-button " + i.prototype.buildCSSClass.call(this);
      }, t.handleClick = function (e) {
        this.trigger({
          type: "close",
          bubbles: !1
        });
      }, t.handleKeyDown = function (e) {
        xt.isEventKey(e, "Esc") ? (e.preventDefault(), e.stopPropagation(), this.trigger("click")) : i.prototype.handleKeyDown.call(this, e);
      }, e;
    }(nn));

    var rn = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t = void 0 === t ? {} : t) || this;
        return t.replay = void 0 === t.replay || t.replay, i.on(e, "play", function (e) {
          return i.handlePlay(e);
        }), i.on(e, "pause", function (e) {
          return i.handlePause(e);
        }), t.replay && i.on(e, "ended", function (e) {
          return i.handleEnded(e);
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-play-control " + n.prototype.buildCSSClass.call(this);
      }, t.handleClick = function (e) {
        this.player_.paused() ? kt(this.player_.play()) : this.player_.pause();
      }, t.handleSeeked = function (e) {
        this.removeClass("vjs-ended"), this.player_.paused() ? this.handlePause(e) : this.handlePlay(e);
      }, t.handlePlay = function (e) {
        this.removeClass("vjs-ended"), this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.controlText("Pause");
      }, t.handlePause = function (e) {
        this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.controlText("Play");
      }, t.handleEnded = function (e) {
        var t = this;
        this.removeClass("vjs-playing"), this.addClass("vjs-ended"), this.controlText("Replay"), this.one(this.player_, "seeked", function (e) {
          return t.handleSeeked(e);
        });
      }, e;
    }(nn);

    rn.prototype.controlText_ = "Play", pt.registerComponent("PlayToggle", rn);

    function an(e, t) {
      e = e < 0 ? 0 : e;
      var i = Math.floor(e % 60),
          n = Math.floor(e / 60 % 60),
          r = Math.floor(e / 3600),
          a = Math.floor(t / 60 % 60),
          t = Math.floor(t / 3600);
      return (r = 0 < (r = isNaN(e) || e === 1 / 0 ? n = i = "-" : r) || 0 < t ? r + ":" : "") + (n = ((r || 10 <= a) && n < 10 ? "0" + n : n) + ":") + (i = i < 10 ? "0" + i : i);
    }

    var sn = an;

    function on(e, t) {
      return sn(e, t = void 0 === t ? e : t);
    }

    I = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.on(e, ["timeupdate", "ended"], function (e) {
          return i.updateContent(e);
        }), i.updateTextNode_(), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function () {
        var e = this.buildCSSClass(),
            t = n.prototype.createEl.call(this, "div", {
          className: e + " vjs-time-control vjs-control",
          innerHTML: '<span class="vjs-control-text" role="presentation">' + this.localize(this.labelText_) + " </span>"
        });
        return this.contentEl_ = J("span", {
          className: e + "-display"
        }, {
          "aria-live": "off",
          role: "presentation"
        }), t.appendChild(this.contentEl_), t;
      }, t.dispose = function () {
        this.contentEl_ = null, this.textNode_ = null, n.prototype.dispose.call(this);
      }, t.updateTextNode_ = function (e) {
        var t = this;
        e = on(e = void 0 === e ? 0 : e), this.formattedTime_ !== e && (this.formattedTime_ = e, this.requestNamedAnimationFrame("TimeDisplay#updateTextNode_", function () {
          var e;
          t.contentEl_ && ((e = t.textNode_) && t.contentEl_.firstChild !== e && (e = null, f.warn("TimeDisplay#updateTextnode_: Prevented replacement of text node element since it was no longer a child of this node. Appending a new node instead.")), t.textNode_ = d.createTextNode(t.formattedTime_), t.textNode_ && (e ? t.contentEl_.replaceChild(t.textNode_, e) : t.contentEl_.appendChild(t.textNode_)));
        }));
      }, t.updateContent = function (e) {}, e;
    }(pt);

    I.prototype.labelText_ = "Time", I.prototype.controlText_ = "Time", pt.registerComponent("TimeDisplay", I);

    w = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }

      mt(t, e);
      var i = t.prototype;
      return i.buildCSSClass = function () {
        return "vjs-current-time";
      }, i.updateContent = function (e) {
        var t = this.player_.ended() ? this.player_.duration() : this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
        this.updateTextNode_(t);
      }, t;
    }(I);

    w.prototype.labelText_ = "Current Time", w.prototype.controlText_ = "Current Time", pt.registerComponent("CurrentTimeDisplay", w);

    Ft = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this,
            t = function (e) {
          return i.updateContent(e);
        };

        return i.on(e, "durationchange", t), i.on(e, "loadstart", t), i.on(e, "loadedmetadata", t), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-duration";
      }, t.updateContent = function (e) {
        var t = this.player_.duration();
        this.updateTextNode_(t);
      }, e;
    }(I);

    Ft.prototype.labelText_ = "Duration", Ft.prototype.controlText_ = "Duration", pt.registerComponent("DurationDisplay", Ft), pt.registerComponent("TimeDivider", function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }

      return mt(t, e), t.prototype.createEl = function () {
        return e.prototype.createEl.call(this, "div", {
          className: "vjs-time-control vjs-time-divider",
          innerHTML: "<div><span>/</span></div>"
        }, {
          "aria-hidden": !0
        });
      }, t;
    }(pt));

    e = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.on(e, "durationchange", function (e) {
          return i.updateContent(e);
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-remaining-time";
      }, t.createEl = function () {
        var e = n.prototype.createEl.call(this);
        return e.insertBefore(J("span", {}, {
          "aria-hidden": !0
        }, "-"), this.contentEl_), e;
      }, t.updateContent = function (e) {
        var t;
        "number" == typeof this.player_.duration() && (t = this.player_.ended() ? 0 : this.player_.remainingTimeDisplay ? this.player_.remainingTimeDisplay() : this.player_.remainingTime(), this.updateTextNode_(t));
      }, e;
    }(I);

    e.prototype.labelText_ = "Remaining Time", e.prototype.controlText_ = "Remaining Time", pt.registerComponent("RemainingTimeDisplay", e), pt.registerComponent("LiveDisplay", function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.updateShowing(), i.on(i.player(), "durationchange", function (e) {
          return i.updateShowing(e);
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function () {
        var e = n.prototype.createEl.call(this, "div", {
          className: "vjs-live-control vjs-control"
        });
        return this.contentEl_ = J("div", {
          className: "vjs-live-display",
          innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + " </span>" + this.localize("LIVE")
        }, {
          "aria-live": "off"
        }), e.appendChild(this.contentEl_), e;
      }, t.dispose = function () {
        this.contentEl_ = null, n.prototype.dispose.call(this);
      }, t.updateShowing = function (e) {
        this.player().duration() === 1 / 0 ? this.show() : this.hide();
      }, e;
    }(pt));

    n = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.updateLiveEdgeStatus(), i.player_.liveTracker && (i.updateLiveEdgeStatusHandler_ = function (e) {
          return i.updateLiveEdgeStatus(e);
        }, i.on(i.player_.liveTracker, "liveedgechange", i.updateLiveEdgeStatusHandler_)), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function () {
        var e = n.prototype.createEl.call(this, "button", {
          className: "vjs-seek-to-live-control vjs-control"
        });
        return this.textEl_ = J("span", {
          className: "vjs-seek-to-live-text",
          innerHTML: this.localize("LIVE")
        }, {
          "aria-hidden": "true"
        }), e.appendChild(this.textEl_), e;
      }, t.updateLiveEdgeStatus = function () {
        !this.player_.liveTracker || this.player_.liveTracker.atLiveEdge() ? (this.setAttribute("aria-disabled", !0), this.addClass("vjs-at-live-edge"), this.controlText("Seek to live, currently playing live")) : (this.setAttribute("aria-disabled", !1), this.removeClass("vjs-at-live-edge"), this.controlText("Seek to live, currently behind live"));
      }, t.handleClick = function () {
        this.player_.liveTracker.seekToLiveEdge();
      }, t.dispose = function () {
        this.player_.liveTracker && this.off(this.player_.liveTracker, "liveedgechange", this.updateLiveEdgeStatusHandler_), this.textEl_ = null, n.prototype.dispose.call(this);
      }, e;
    }(nn);

    n.prototype.controlText_ = "Seek to live, currently playing live", pt.registerComponent("SeekToLive", n);

    function un(e, t, i) {
      return e = Number(e), Math.min(i, Math.max(t, isNaN(e) ? t : e));
    }

    r = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.handleMouseDown_ = function (e) {
          return i.handleMouseDown(e);
        }, i.handleMouseUp_ = function (e) {
          return i.handleMouseUp(e);
        }, i.handleKeyDown_ = function (e) {
          return i.handleKeyDown(e);
        }, i.handleClick_ = function (e) {
          return i.handleClick(e);
        }, i.handleMouseMove_ = function (e) {
          return i.handleMouseMove(e);
        }, i.update_ = function (e) {
          return i.update(e);
        }, i.bar = i.getChild(i.options_.barName), i.vertical(!!i.options_.vertical), i.enable(), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.enabled = function () {
        return this.enabled_;
      }, t.enable = function () {
        this.enabled() || (this.on("mousedown", this.handleMouseDown_), this.on("touchstart", this.handleMouseDown_), this.on("keydown", this.handleKeyDown_), this.on("click", this.handleClick_), this.on(this.player_, "controlsvisible", this.update), this.playerEvent && this.on(this.player_, this.playerEvent, this.update), this.removeClass("disabled"), this.setAttribute("tabindex", 0), this.enabled_ = !0);
      }, t.disable = function () {
        var e;
        this.enabled() && (e = this.bar.el_.ownerDocument, this.off("mousedown", this.handleMouseDown_), this.off("touchstart", this.handleMouseDown_), this.off("keydown", this.handleKeyDown_), this.off("click", this.handleClick_), this.off(this.player_, "controlsvisible", this.update_), this.off(e, "mousemove", this.handleMouseMove_), this.off(e, "mouseup", this.handleMouseUp_), this.off(e, "touchmove", this.handleMouseMove_), this.off(e, "touchend", this.handleMouseUp_), this.removeAttribute("tabindex"), this.addClass("disabled"), this.playerEvent && this.off(this.player_, this.playerEvent, this.update), this.enabled_ = !1);
      }, t.createEl = function (e, t, i) {
        return void 0 === i && (i = {}), (t = void 0 === t ? {} : t).className = t.className + " vjs-slider", t = T({
          tabIndex: 0
        }, t), i = T({
          role: "slider",
          "aria-valuenow": 0,
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          tabIndex: 0
        }, i), n.prototype.createEl.call(this, e, t, i);
      }, t.handleMouseDown = function (e) {
        var t = this.bar.el_.ownerDocument;
        "mousedown" === e.type && e.preventDefault(), "touchstart" !== e.type || M || e.preventDefault(), ce(), this.addClass("vjs-sliding"), this.trigger("slideractive"), this.on(t, "mousemove", this.handleMouseMove_), this.on(t, "mouseup", this.handleMouseUp_), this.on(t, "touchmove", this.handleMouseMove_), this.on(t, "touchend", this.handleMouseUp_), this.handleMouseMove(e);
      }, t.handleMouseMove = function (e) {}, t.handleMouseUp = function () {
        var e = this.bar.el_.ownerDocument;
        de(), this.removeClass("vjs-sliding"), this.trigger("sliderinactive"), this.off(e, "mousemove", this.handleMouseMove_), this.off(e, "mouseup", this.handleMouseUp_), this.off(e, "touchmove", this.handleMouseMove_), this.off(e, "touchend", this.handleMouseUp_), this.update();
      }, t.update = function () {
        var t = this;

        if (this.el_ && this.bar) {
          var i = this.getProgress();
          return i === this.progress_ ? i : (this.progress_ = i, this.requestNamedAnimationFrame("Slider#update", function () {
            var e = t.vertical() ? "height" : "width";
            t.bar.el().style[e] = (100 * i).toFixed(2) + "%";
          }), i);
        }
      }, t.getProgress = function () {
        return Number(un(this.getPercent(), 0, 1).toFixed(4));
      }, t.calculateDistance = function (e) {
        e = fe(this.el_, e);
        return this.vertical() ? e.y : e.x;
      }, t.handleKeyDown = function (e) {
        xt.isEventKey(e, "Left") || xt.isEventKey(e, "Down") ? (e.preventDefault(), e.stopPropagation(), this.stepBack()) : xt.isEventKey(e, "Right") || xt.isEventKey(e, "Up") ? (e.preventDefault(), e.stopPropagation(), this.stepForward()) : n.prototype.handleKeyDown.call(this, e);
      }, t.handleClick = function (e) {
        e.stopPropagation(), e.preventDefault();
      }, t.vertical = function (e) {
        if (void 0 === e) return this.vertical_ || !1;
        this.vertical_ = !!e, this.vertical_ ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal");
      }, e;
    }(pt);

    pt.registerComponent("Slider", r);

    function ln(e, t) {
      return un(e / t * 100, 0, 100).toFixed(2) + "%";
    }

    pt.registerComponent("LoadProgressBar", function (r) {
      function e(e, t) {
        var i = r.call(this, e, t) || this;
        return i.partEls_ = [], i.on(e, "progress", function (e) {
          return i.update(e);
        }), i;
      }

      mt(e, r);
      var t = e.prototype;
      return t.createEl = function () {
        var e = r.prototype.createEl.call(this, "div", {
          className: "vjs-load-progress"
        }),
            t = J("span", {
          className: "vjs-control-text"
        }),
            i = J("span", {
          textContent: this.localize("Loaded")
        }),
            n = d.createTextNode(": ");
        return this.percentageEl_ = J("span", {
          className: "vjs-control-text-loaded-percentage",
          textContent: "0%"
        }), e.appendChild(t), t.appendChild(i), t.appendChild(n), t.appendChild(this.percentageEl_), e;
      }, t.dispose = function () {
        this.partEls_ = null, this.percentageEl_ = null, r.prototype.dispose.call(this);
      }, t.update = function (e) {
        var l = this;
        this.requestNamedAnimationFrame("LoadProgressBar#update", function () {
          var e = l.player_.liveTracker,
              t = l.player_.buffered(),
              e = e && e.isLive() ? e.seekableEnd() : l.player_.duration(),
              i = l.player_.bufferedEnd(),
              n = l.partEls_,
              e = ln(i, e);
          l.percent_ !== e && (l.el_.style.width = e, Z(l.percentageEl_, e), l.percent_ = e);

          for (var r = 0; r < t.length; r++) {
            var a = t.start(r),
                s = t.end(r),
                o = n[r];
            o || (o = l.el_.appendChild(J()), n[r] = o), o.dataset.start === a && o.dataset.end === s || (o.dataset.start = a, o.dataset.end = s, o.style.left = ln(a, i), o.style.width = ln(s - a, i));
          }

          for (var u = n.length; u > t.length; u--) l.el_.removeChild(n[u - 1]);

          n.length = t.length;
        });
      }, e;
    }(pt)), pt.registerComponent("TimeTooltip", function (i) {
      function e(e, t) {
        t = i.call(this, e, t) || this;
        return t.update = ze(We(ft(t), t.update), 30), t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.createEl = function () {
        return i.prototype.createEl.call(this, "div", {
          className: "vjs-time-tooltip"
        }, {
          "aria-hidden": "true"
        });
      }, t.update = function (e, t, i) {
        var n = pe(this.el_),
            r = he(this.player_.el()),
            a = e.width * t;
        r && n && (t = e.left - r.left + a, r = e.width - a + (r.right - e.right), t < (e = n.width / 2) ? e += e - t : r < e && (e = r), e < 0 ? e = 0 : e > n.width && (e = n.width), e = Math.round(e), this.el_.style.right = "-" + e + "px", this.write(i));
      }, t.write = function (e) {
        Z(this.el_, e);
      }, t.updateTime = function (n, r, a, s) {
        var o = this;
        this.requestNamedAnimationFrame("TimeTooltip#updateTime", function () {
          var e,
              t,
              i = o.player_.duration();
          i = o.player_.liveTracker && o.player_.liveTracker.isLive() ? ((t = (e = o.player_.liveTracker.liveWindow()) - r * e) < 1 ? "" : "-") + on(t, e) : on(a, i), o.update(n, r, i), s && s();
        });
      }, e;
    }(pt));

    x = function (i) {
      function e(e, t) {
        t = i.call(this, e, t) || this;
        return t.update = ze(We(ft(t), t.update), 30), t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.createEl = function () {
        return i.prototype.createEl.call(this, "div", {
          className: "vjs-play-progress vjs-slider-bar"
        }, {
          "aria-hidden": "true"
        });
      }, t.update = function (e, t) {
        var i,
            n = this.getChild("timeTooltip");
        n && (i = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(), n.updateTime(e, t, i));
      }, e;
    }(pt);

    x.prototype.options_ = {
      children: []
    }, V || P || x.prototype.options_.children.push("timeTooltip"), pt.registerComponent("PlayProgressBar", x);

    A = function (i) {
      function e(e, t) {
        t = i.call(this, e, t) || this;
        return t.update = ze(We(ft(t), t.update), 30), t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.createEl = function () {
        return i.prototype.createEl.call(this, "div", {
          className: "vjs-mouse-display"
        });
      }, t.update = function (e, t) {
        var i = this,
            n = t * this.player_.duration();
        this.getChild("timeTooltip").updateTime(e, t, n, function () {
          i.el_.style.left = e.width * t + "px";
        });
      }, e;
    }(pt);

    A.prototype.options_ = {
      children: ["timeTooltip"]
    }, pt.registerComponent("MouseTimeDisplay", A);

    H = function (a) {
      function e(e, t) {
        t = a.call(this, e, t) || this;
        return t.setEventHandlers_(), t;
      }

      mt(e, a);
      var t = e.prototype;
      return t.setEventHandlers_ = function () {
        var t = this;
        this.update_ = We(this, this.update), this.update = ze(this.update_, 30), this.on(this.player_, ["ended", "durationchange", "timeupdate"], this.update), this.player_.liveTracker && this.on(this.player_.liveTracker, "liveedgechange", this.update), this.updateInterval = null, this.enableIntervalHandler_ = function (e) {
          return t.enableInterval_(e);
        }, this.disableIntervalHandler_ = function (e) {
          return t.disableInterval_(e);
        }, this.on(this.player_, ["playing"], this.enableIntervalHandler_), this.on(this.player_, ["ended", "pause", "waiting"], this.disableIntervalHandler_), "hidden" in d && "visibilityState" in d && this.on(d, "visibilitychange", this.toggleVisibility_);
      }, t.toggleVisibility_ = function (e) {
        "hidden" === d.visibilityState ? (this.cancelNamedAnimationFrame("SeekBar#update"), this.cancelNamedAnimationFrame("Slider#update"), this.disableInterval_(e)) : (this.player_.ended() || this.player_.paused() || this.enableInterval_(), this.update());
      }, t.enableInterval_ = function () {
        this.updateInterval || (this.updateInterval = this.setInterval(this.update, 30));
      }, t.disableInterval_ = function (e) {
        this.player_.liveTracker && this.player_.liveTracker.isLive() && e && "ended" !== e.type || this.updateInterval && (this.clearInterval(this.updateInterval), this.updateInterval = null);
      }, t.createEl = function () {
        return a.prototype.createEl.call(this, "div", {
          className: "vjs-progress-holder"
        }, {
          "aria-label": this.localize("Progress Bar")
        });
      }, t.update = function (e) {
        var n = this;

        if ("hidden" !== d.visibilityState) {
          var r = a.prototype.update.call(this);
          return this.requestNamedAnimationFrame("SeekBar#update", function () {
            var e = n.player_.ended() ? n.player_.duration() : n.getCurrentTime_(),
                t = n.player_.liveTracker,
                i = n.player_.duration();
            t && t.isLive() && (i = n.player_.liveTracker.liveCurrentTime()), n.percent_ !== r && (n.el_.setAttribute("aria-valuenow", (100 * r).toFixed(2)), n.percent_ = r), n.currentTime_ === e && n.duration_ === i || (n.el_.setAttribute("aria-valuetext", n.localize("progress bar timing: currentTime={1} duration={2}", [on(e, i), on(i, i)], "{1} of {2}")), n.currentTime_ = e, n.duration_ = i), n.bar && n.bar.update(he(n.el()), n.getProgress());
          }), r;
        }
      }, t.userSeek_ = function (e) {
        this.player_.liveTracker && this.player_.liveTracker.isLive() && this.player_.liveTracker.nextSeekedFromUser(), this.player_.currentTime(e);
      }, t.getCurrentTime_ = function () {
        return this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      }, t.getPercent = function () {
        var e,
            t = this.getCurrentTime_(),
            i = this.player_.liveTracker;
        return i && i.isLive() ? (e = (t - i.seekableStart()) / i.liveWindow(), i.atLiveEdge() && (e = 1)) : e = t / this.player_.duration(), e;
      }, t.handleMouseDown = function (e) {
        be(e) && (e.stopPropagation(), this.player_.scrubbing(!0), this.videoWasPlaying = !this.player_.paused(), this.player_.pause(), a.prototype.handleMouseDown.call(this, e));
      }, t.handleMouseMove = function (e) {
        if (be(e)) {
          var t = this.calculateDistance(e),
              i = this.player_.liveTracker;

          if (i && i.isLive()) {
            if (.99 <= t) return void i.seekToLiveEdge();
            var n,
                r = i.seekableStart(),
                e = i.liveCurrentTime();
            if ((n = (n = e <= (n = r + t * i.liveWindow()) ? e : n) <= r ? r + .1 : n) === 1 / 0) return;
          } else (n = t * this.player_.duration()) === this.player_.duration() && (n -= .1);

          this.userSeek_(n);
        }
      }, t.enable = function () {
        a.prototype.enable.call(this);
        var e = this.getChild("mouseTimeDisplay");
        e && e.show();
      }, t.disable = function () {
        a.prototype.disable.call(this);
        var e = this.getChild("mouseTimeDisplay");
        e && e.hide();
      }, t.handleMouseUp = function (e) {
        a.prototype.handleMouseUp.call(this, e), e && e.stopPropagation(), this.player_.scrubbing(!1), this.player_.trigger({
          type: "timeupdate",
          target: this,
          manuallyTriggered: !0
        }), this.videoWasPlaying ? kt(this.player_.play()) : this.update_();
      }, t.stepForward = function () {
        this.userSeek_(this.player_.currentTime() + 5);
      }, t.stepBack = function () {
        this.userSeek_(this.player_.currentTime() - 5);
      }, t.handleAction = function (e) {
        this.player_.paused() ? this.player_.play() : this.player_.pause();
      }, t.handleKeyDown = function (e) {
        var t,
            i = this.player_.liveTracker;
        xt.isEventKey(e, "Space") || xt.isEventKey(e, "Enter") ? (e.preventDefault(), e.stopPropagation(), this.handleAction(e)) : xt.isEventKey(e, "Home") ? (e.preventDefault(), e.stopPropagation(), this.userSeek_(0)) : xt.isEventKey(e, "End") ? (e.preventDefault(), e.stopPropagation(), i && i.isLive() ? this.userSeek_(i.liveCurrentTime()) : this.userSeek_(this.player_.duration())) : /^[0-9]$/.test(xt(e)) ? (e.preventDefault(), e.stopPropagation(), t = 10 * (xt.codes[xt(e)] - xt.codes[0]) / 100, i && i.isLive() ? this.userSeek_(i.seekableStart() + i.liveWindow() * t) : this.userSeek_(this.player_.duration() * t)) : xt.isEventKey(e, "PgDn") ? (e.preventDefault(), e.stopPropagation(), this.userSeek_(this.player_.currentTime() - 60)) : xt.isEventKey(e, "PgUp") ? (e.preventDefault(), e.stopPropagation(), this.userSeek_(this.player_.currentTime() + 60)) : a.prototype.handleKeyDown.call(this, e);
      }, t.dispose = function () {
        this.disableInterval_(), this.off(this.player_, ["ended", "durationchange", "timeupdate"], this.update), this.player_.liveTracker && this.off(this.player_.liveTracker, "liveedgechange", this.update), this.off(this.player_, ["playing"], this.enableIntervalHandler_), this.off(this.player_, ["ended", "pause", "waiting"], this.disableIntervalHandler_), "hidden" in d && "visibilityState" in d && this.off(d, "visibilitychange", this.toggleVisibility_), a.prototype.dispose.call(this);
      }, e;
    }(r);

    H.prototype.options_ = {
      children: ["loadProgressBar", "playProgressBar"],
      barName: "playProgressBar"
    }, V || P || H.prototype.options_.children.splice(1, 0, "mouseTimeDisplay"), pt.registerComponent("SeekBar", H);

    rn = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.handleMouseMove = ze(We(ft(i), i.handleMouseMove), 30), i.throttledHandleMouseSeek = ze(We(ft(i), i.handleMouseSeek), 30), i.handleMouseUpHandler_ = function (e) {
          return i.handleMouseUp(e);
        }, i.handleMouseDownHandler_ = function (e) {
          return i.handleMouseDown(e);
        }, i.enable(), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function () {
        return n.prototype.createEl.call(this, "div", {
          className: "vjs-progress-control vjs-control"
        });
      }, t.handleMouseMove = function (e) {
        var t,
            i,
            n,
            r,
            a = this.getChild("seekBar");
        a && (t = a.getChild("playProgressBar"), i = a.getChild("mouseTimeDisplay"), (t || i) && (r = pe(n = a.el()), e = fe(n, e).x, e = un(e, 0, 1), i && i.update(r, e), t && t.update(r, a.getProgress())));
      }, t.handleMouseSeek = function (e) {
        var t = this.getChild("seekBar");
        t && t.handleMouseMove(e);
      }, t.enabled = function () {
        return this.enabled_;
      }, t.disable = function () {
        var e;
        this.children().forEach(function (e) {
          return e.disable && e.disable();
        }), this.enabled() && (this.off(["mousedown", "touchstart"], this.handleMouseDownHandler_), this.off(this.el_, "mousemove", this.handleMouseMove), this.removeListenersAddedOnMousedownAndTouchstart(), this.addClass("disabled"), this.enabled_ = !1, this.player_.scrubbing() && (e = this.getChild("seekBar"), this.player_.scrubbing(!1), e.videoWasPlaying && kt(this.player_.play())));
      }, t.enable = function () {
        this.children().forEach(function (e) {
          return e.enable && e.enable();
        }), this.enabled() || (this.on(["mousedown", "touchstart"], this.handleMouseDownHandler_), this.on(this.el_, "mousemove", this.handleMouseMove), this.removeClass("disabled"), this.enabled_ = !0);
      }, t.removeListenersAddedOnMousedownAndTouchstart = function () {
        var e = this.el_.ownerDocument;
        this.off(e, "mousemove", this.throttledHandleMouseSeek), this.off(e, "touchmove", this.throttledHandleMouseSeek), this.off(e, "mouseup", this.handleMouseUpHandler_), this.off(e, "touchend", this.handleMouseUpHandler_);
      }, t.handleMouseDown = function (e) {
        var t = this.el_.ownerDocument,
            i = this.getChild("seekBar");
        i && i.handleMouseDown(e), this.on(t, "mousemove", this.throttledHandleMouseSeek), this.on(t, "touchmove", this.throttledHandleMouseSeek), this.on(t, "mouseup", this.handleMouseUpHandler_), this.on(t, "touchend", this.handleMouseUpHandler_);
      }, t.handleMouseUp = function (e) {
        var t = this.getChild("seekBar");
        t && t.handleMouseUp(e), this.removeListenersAddedOnMousedownAndTouchstart();
      }, e;
    }(pt);

    rn.prototype.options_ = {
      children: ["seekBar"]
    }, pt.registerComponent("ProgressControl", rn);

    w = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.on(e, ["enterpictureinpicture", "leavepictureinpicture"], function (e) {
          return i.handlePictureInPictureChange(e);
        }), i.on(e, ["disablepictureinpicturechanged", "loadedmetadata"], function (e) {
          return i.handlePictureInPictureEnabledChange(e);
        }), i.disable(), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-picture-in-picture-control " + n.prototype.buildCSSClass.call(this);
      }, t.handlePictureInPictureEnabledChange = function () {
        d.pictureInPictureEnabled && !1 === this.player_.disablePictureInPicture() ? this.enable() : this.disable();
      }, t.handlePictureInPictureChange = function (e) {
        this.player_.isInPictureInPicture() ? this.controlText("Exit Picture-in-Picture") : this.controlText("Picture-in-Picture"), this.handlePictureInPictureEnabledChange();
      }, t.handleClick = function (e) {
        this.player_.isInPictureInPicture() ? this.player_.exitPictureInPicture() : this.player_.requestPictureInPicture();
      }, e;
    }(nn);

    w.prototype.controlText_ = "Picture-in-Picture", pt.registerComponent("PictureInPictureToggle", w);

    Ft = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.on(e, "fullscreenchange", function (e) {
          return i.handleFullscreenChange(e);
        }), !1 === d[e.fsApi_.fullscreenEnabled] && i.disable(), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-fullscreen-control " + n.prototype.buildCSSClass.call(this);
      }, t.handleFullscreenChange = function (e) {
        this.player_.isFullscreen() ? this.controlText("Non-Fullscreen") : this.controlText("Fullscreen");
      }, t.handleClick = function (e) {
        this.player_.isFullscreen() ? this.player_.exitFullscreen() : this.player_.requestFullscreen();
      }, e;
    }(nn);

    Ft.prototype.controlText_ = "Fullscreen", pt.registerComponent("FullscreenToggle", Ft);
    pt.registerComponent("VolumeLevel", function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }

      return mt(t, e), t.prototype.createEl = function () {
        return e.prototype.createEl.call(this, "div", {
          className: "vjs-volume-level",
          innerHTML: '<span class="vjs-control-text"></span>'
        });
      }, t;
    }(pt)), pt.registerComponent("VolumeLevelTooltip", function (i) {
      function e(e, t) {
        t = i.call(this, e, t) || this;
        return t.update = ze(We(ft(t), t.update), 30), t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.createEl = function () {
        return i.prototype.createEl.call(this, "div", {
          className: "vjs-volume-tooltip"
        }, {
          "aria-hidden": "true"
        });
      }, t.update = function (e, t, i, n) {
        if (!i) {
          var r = he(this.el_),
              a = he(this.player_.el()),
              i = e.width * t;
          if (!a || !r) return;
          t = e.left - a.left + i, a = e.width - i + (a.right - e.right), e = r.width / 2;
          t < e ? e += e - t : a < e && (e = a), e < 0 ? e = 0 : e > r.width && (e = r.width), this.el_.style.right = "-" + e + "px";
        }

        this.write(n + "%");
      }, t.write = function (e) {
        Z(this.el_, e);
      }, t.updateVolume = function (e, t, i, n, r) {
        var a = this;
        this.requestNamedAnimationFrame("VolumeLevelTooltip#updateVolume", function () {
          a.update(e, t, i, n.toFixed(0)), r && r();
        });
      }, e;
    }(pt));

    I = function (i) {
      function e(e, t) {
        t = i.call(this, e, t) || this;
        return t.update = ze(We(ft(t), t.update), 30), t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.createEl = function () {
        return i.prototype.createEl.call(this, "div", {
          className: "vjs-mouse-display"
        });
      }, t.update = function (e, t, i) {
        var n = this,
            r = 100 * t;
        this.getChild("volumeLevelTooltip").updateVolume(e, t, i, r, function () {
          i ? n.el_.style.bottom = e.height * t + "px" : n.el_.style.left = e.width * t + "px";
        });
      }, e;
    }(pt);

    I.prototype.options_ = {
      children: ["volumeLevelTooltip"]
    }, pt.registerComponent("MouseVolumeLevelDisplay", I);

    e = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.on("slideractive", function (e) {
          return i.updateLastVolume_(e);
        }), i.on(e, "volumechange", function (e) {
          return i.updateARIAAttributes(e);
        }), e.ready(function () {
          return i.updateARIAAttributes();
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function () {
        return n.prototype.createEl.call(this, "div", {
          className: "vjs-volume-bar vjs-slider-bar"
        }, {
          "aria-label": this.localize("Volume Level"),
          "aria-live": "polite"
        });
      }, t.handleMouseDown = function (e) {
        be(e) && n.prototype.handleMouseDown.call(this, e);
      }, t.handleMouseMove = function (e) {
        var t,
            i,
            n,
            r = this.getChild("mouseVolumeLevelDisplay");
        r && (t = he(n = this.el()), i = this.vertical(), n = fe(n, e), n = i ? n.y : n.x, n = un(n, 0, 1), r.update(t, n, i)), be(e) && (this.checkMuted(), this.player_.volume(this.calculateDistance(e)));
      }, t.checkMuted = function () {
        this.player_.muted() && this.player_.muted(!1);
      }, t.getPercent = function () {
        return this.player_.muted() ? 0 : this.player_.volume();
      }, t.stepForward = function () {
        this.checkMuted(), this.player_.volume(this.player_.volume() + .1);
      }, t.stepBack = function () {
        this.checkMuted(), this.player_.volume(this.player_.volume() - .1);
      }, t.updateARIAAttributes = function (e) {
        var t = this.player_.muted() ? 0 : this.volumeAsPercentage_();
        this.el_.setAttribute("aria-valuenow", t), this.el_.setAttribute("aria-valuetext", t + "%");
      }, t.volumeAsPercentage_ = function () {
        return Math.round(100 * this.player_.volume());
      }, t.updateLastVolume_ = function () {
        var e = this,
            t = this.player_.volume();
        this.one("sliderinactive", function () {
          0 === e.player_.volume() && e.player_.lastVolume_(t);
        });
      }, e;
    }(r);

    e.prototype.options_ = {
      children: ["volumeLevel"],
      barName: "volumeLevel"
    }, V || P || e.prototype.options_.children.splice(0, 0, "mouseVolumeLevelDisplay"), e.prototype.playerEvent = "volumechange", pt.registerComponent("VolumeBar", e);

    n = function (a) {
      function e(e, t) {
        var i, n, r;
        return (t = void 0 === t ? {} : t).vertical = t.vertical || !1, "undefined" != typeof t.volumeBar && !E(t.volumeBar) || (t.volumeBar = t.volumeBar || {}, t.volumeBar.vertical = t.vertical), i = a.call(this, e, t) || this, n = ft(i), (r = e).tech_ && !r.tech_.featuresVolumeControl && n.addClass("vjs-hidden"), n.on(r, "loadstart", function () {
          r.tech_.featuresVolumeControl ? n.removeClass("vjs-hidden") : n.addClass("vjs-hidden");
        }), i.throttledHandleMouseMove = ze(We(ft(i), i.handleMouseMove), 30), i.handleMouseUpHandler_ = function (e) {
          return i.handleMouseUp(e);
        }, i.on("mousedown", function (e) {
          return i.handleMouseDown(e);
        }), i.on("touchstart", function (e) {
          return i.handleMouseDown(e);
        }), i.on("mousemove", function (e) {
          return i.handleMouseMove(e);
        }), i.on(i.volumeBar, ["focus", "slideractive"], function () {
          i.volumeBar.addClass("vjs-slider-active"), i.addClass("vjs-slider-active"), i.trigger("slideractive");
        }), i.on(i.volumeBar, ["blur", "sliderinactive"], function () {
          i.volumeBar.removeClass("vjs-slider-active"), i.removeClass("vjs-slider-active"), i.trigger("sliderinactive");
        }), i;
      }

      mt(e, a);
      var t = e.prototype;
      return t.createEl = function () {
        var e = "vjs-volume-horizontal";
        return this.options_.vertical && (e = "vjs-volume-vertical"), a.prototype.createEl.call(this, "div", {
          className: "vjs-volume-control vjs-control " + e
        });
      }, t.handleMouseDown = function (e) {
        var t = this.el_.ownerDocument;
        this.on(t, "mousemove", this.throttledHandleMouseMove), this.on(t, "touchmove", this.throttledHandleMouseMove), this.on(t, "mouseup", this.handleMouseUpHandler_), this.on(t, "touchend", this.handleMouseUpHandler_);
      }, t.handleMouseUp = function (e) {
        var t = this.el_.ownerDocument;
        this.off(t, "mousemove", this.throttledHandleMouseMove), this.off(t, "touchmove", this.throttledHandleMouseMove), this.off(t, "mouseup", this.handleMouseUpHandler_), this.off(t, "touchend", this.handleMouseUpHandler_);
      }, t.handleMouseMove = function (e) {
        this.volumeBar.handleMouseMove(e);
      }, e;
    }(pt);

    n.prototype.options_ = {
      children: ["volumeBar"]
    }, pt.registerComponent("VolumeControl", n);

    x = function (a) {
      function e(e, t) {
        var i,
            n,
            r = a.call(this, e, t) || this;
        return i = ft(r), (n = e).tech_ && !n.tech_.featuresMuteControl && i.addClass("vjs-hidden"), i.on(n, "loadstart", function () {
          n.tech_.featuresMuteControl ? i.removeClass("vjs-hidden") : i.addClass("vjs-hidden");
        }), r.on(e, ["loadstart", "volumechange"], function (e) {
          return r.update(e);
        }), r;
      }

      mt(e, a);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-mute-control " + a.prototype.buildCSSClass.call(this);
      }, t.handleClick = function (e) {
        var t = this.player_.volume(),
            i = this.player_.lastVolume_();
        0 === t ? (this.player_.volume(i < .1 ? .1 : i), this.player_.muted(!1)) : this.player_.muted(!this.player_.muted());
      }, t.update = function (e) {
        this.updateIcon_(), this.updateControlText_();
      }, t.updateIcon_ = function () {
        var e = this.player_.volume(),
            t = 3;
        V && this.player_.tech_ && this.player_.tech_.el_ && this.player_.muted(this.player_.tech_.el_.muted), 0 === e || this.player_.muted() ? t = 0 : e < .33 ? t = 1 : e < .67 && (t = 2);

        for (var i = 0; i < 4; i++) ne(this.el_, "vjs-vol-" + i);

        ie(this.el_, "vjs-vol-" + t);
      }, t.updateControlText_ = function () {
        var e = this.player_.muted() || 0 === this.player_.volume() ? "Unmute" : "Mute";
        this.controlText() !== e && this.controlText(e);
      }, e;
    }(nn);

    x.prototype.controlText_ = "Mute", pt.registerComponent("MuteToggle", x);

    A = function (n) {
      function e(e, t) {
        var i;
        return "undefined" != typeof (t = void 0 === t ? {} : t).inline ? t.inline = t.inline : t.inline = !0, "undefined" != typeof t.volumeControl && !E(t.volumeControl) || (t.volumeControl = t.volumeControl || {}, t.volumeControl.vertical = !t.inline), (i = n.call(this, e, t) || this).handleKeyPressHandler_ = function (e) {
          return i.handleKeyPress(e);
        }, i.on(e, ["loadstart"], function (e) {
          return i.volumePanelState_(e);
        }), i.on(i.muteToggle, "keyup", function (e) {
          return i.handleKeyPress(e);
        }), i.on(i.volumeControl, "keyup", function (e) {
          return i.handleVolumeControlKeyUp(e);
        }), i.on("keydown", function (e) {
          return i.handleKeyPress(e);
        }), i.on("mouseover", function (e) {
          return i.handleMouseOver(e);
        }), i.on("mouseout", function (e) {
          return i.handleMouseOut(e);
        }), i.on(i.volumeControl, ["slideractive"], i.sliderActive_), i.on(i.volumeControl, ["sliderinactive"], i.sliderInactive_), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.sliderActive_ = function () {
        this.addClass("vjs-slider-active");
      }, t.sliderInactive_ = function () {
        this.removeClass("vjs-slider-active");
      }, t.volumePanelState_ = function () {
        this.volumeControl.hasClass("vjs-hidden") && this.muteToggle.hasClass("vjs-hidden") && this.addClass("vjs-hidden"), this.volumeControl.hasClass("vjs-hidden") && !this.muteToggle.hasClass("vjs-hidden") && this.addClass("vjs-mute-toggle-only");
      }, t.createEl = function () {
        var e = "vjs-volume-panel-horizontal";
        return this.options_.inline || (e = "vjs-volume-panel-vertical"), n.prototype.createEl.call(this, "div", {
          className: "vjs-volume-panel vjs-control " + e
        });
      }, t.dispose = function () {
        this.handleMouseOut(), n.prototype.dispose.call(this);
      }, t.handleVolumeControlKeyUp = function (e) {
        xt.isEventKey(e, "Esc") && this.muteToggle.focus();
      }, t.handleMouseOver = function (e) {
        this.addClass("vjs-hover"), Fe(d, "keyup", this.handleKeyPressHandler_);
      }, t.handleMouseOut = function (e) {
        this.removeClass("vjs-hover"), je(d, "keyup", this.handleKeyPressHandler_);
      }, t.handleKeyPress = function (e) {
        xt.isEventKey(e, "Esc") && this.handleMouseOut();
      }, e;
    }(pt);

    A.prototype.options_ = {
      children: ["muteToggle", "volumeControl"]
    }, pt.registerComponent("VolumePanel", A);

    var cn = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return t && (i.menuButton_ = t.menuButton), i.focusedChild_ = -1, i.on("keydown", function (e) {
          return i.handleKeyDown(e);
        }), i.boundHandleBlur_ = function (e) {
          return i.handleBlur(e);
        }, i.boundHandleTapClick_ = function (e) {
          return i.handleTapClick(e);
        }, i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.addEventListenerForItem = function (e) {
        e instanceof pt && (this.on(e, "blur", this.boundHandleBlur_), this.on(e, ["tap", "click"], this.boundHandleTapClick_));
      }, t.removeEventListenerForItem = function (e) {
        e instanceof pt && (this.off(e, "blur", this.boundHandleBlur_), this.off(e, ["tap", "click"], this.boundHandleTapClick_));
      }, t.removeChild = function (e) {
        "string" == typeof e && (e = this.getChild(e)), this.removeEventListenerForItem(e), n.prototype.removeChild.call(this, e);
      }, t.addItem = function (e) {
        e = this.addChild(e);
        e && this.addEventListenerForItem(e);
      }, t.createEl = function () {
        var e = this.options_.contentElType || "ul";
        this.contentEl_ = J(e, {
          className: "vjs-menu-content"
        }), this.contentEl_.setAttribute("role", "menu");
        e = n.prototype.createEl.call(this, "div", {
          append: this.contentEl_,
          className: "vjs-menu"
        });
        return e.appendChild(this.contentEl_), Fe(e, "click", function (e) {
          e.preventDefault(), e.stopImmediatePropagation();
        }), e;
      }, t.dispose = function () {
        this.contentEl_ = null, this.boundHandleBlur_ = null, this.boundHandleTapClick_ = null, n.prototype.dispose.call(this);
      }, t.handleBlur = function (e) {
        var t = e.relatedTarget || d.activeElement;
        this.children().some(function (e) {
          return e.el() === t;
        }) || (e = this.menuButton_) && e.buttonPressed_ && t !== e.el().firstChild && e.unpressButton();
      }, t.handleTapClick = function (t) {
        var e;
        this.menuButton_ && (this.menuButton_.unpressButton(), e = this.children(), !Array.isArray(e) || (e = e.filter(function (e) {
          return e.el() === t.target;
        })[0]) && "CaptionSettingsMenuItem" !== e.name() && this.menuButton_.focus());
      }, t.handleKeyDown = function (e) {
        xt.isEventKey(e, "Left") || xt.isEventKey(e, "Down") ? (e.preventDefault(), e.stopPropagation(), this.stepForward()) : (xt.isEventKey(e, "Right") || xt.isEventKey(e, "Up")) && (e.preventDefault(), e.stopPropagation(), this.stepBack());
      }, t.stepForward = function () {
        var e = 0;
        void 0 !== this.focusedChild_ && (e = this.focusedChild_ + 1), this.focus(e);
      }, t.stepBack = function () {
        var e = 0;
        void 0 !== this.focusedChild_ && (e = this.focusedChild_ - 1), this.focus(e);
      }, t.focus = function (e) {
        void 0 === e && (e = 0);
        var t = this.children().slice();
        t.length && t[0].hasClass("vjs-menu-title") && t.shift(), 0 < t.length && (e < 0 ? e = 0 : e >= t.length && (e = t.length - 1), t[this.focusedChild_ = e].el_.focus());
      }, e;
    }(pt);

    pt.registerComponent("Menu", cn);

    H = function (n) {
      function e(e, t) {
        var i;
        (i = n.call(this, e, t = void 0 === t ? {} : t) || this).menuButton_ = new nn(e, t), i.menuButton_.controlText(i.controlText_), i.menuButton_.el_.setAttribute("aria-haspopup", "true");
        t = nn.prototype.buildCSSClass();
        i.menuButton_.el_.className = i.buildCSSClass() + " " + t, i.menuButton_.removeClass("vjs-control"), i.addChild(i.menuButton_), i.update(), i.enabled_ = !0;

        t = function (e) {
          return i.handleClick(e);
        };

        return i.handleMenuKeyUp_ = function (e) {
          return i.handleMenuKeyUp(e);
        }, i.on(i.menuButton_, "tap", t), i.on(i.menuButton_, "click", t), i.on(i.menuButton_, "keydown", function (e) {
          return i.handleKeyDown(e);
        }), i.on(i.menuButton_, "mouseenter", function () {
          i.addClass("vjs-hover"), i.menu.show(), Fe(d, "keyup", i.handleMenuKeyUp_);
        }), i.on("mouseleave", function (e) {
          return i.handleMouseLeave(e);
        }), i.on("keydown", function (e) {
          return i.handleSubmenuKeyDown(e);
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.update = function () {
        var e = this.createMenu();
        this.menu && (this.menu.dispose(), this.removeChild(this.menu)), this.menu = e, this.addChild(e), this.buttonPressed_ = !1, this.menuButton_.el_.setAttribute("aria-expanded", "false"), this.items && this.items.length <= this.hideThreshold_ ? this.hide() : this.show();
      }, t.createMenu = function () {
        var e,
            t = new cn(this.player_, {
          menuButton: this
        });
        if (this.hideThreshold_ = 0, this.options_.title && (e = J("li", {
          className: "vjs-menu-title",
          innerHTML: lt(this.options_.title),
          tabIndex: -1
        }), e = new pt(this.player_, {
          el: e
        }), t.addItem(e)), this.items = this.createItems(), this.items) for (var i = 0; i < this.items.length; i++) t.addItem(this.items[i]);
        return t;
      }, t.createItems = function () {}, t.createEl = function () {
        return n.prototype.createEl.call(this, "div", {
          className: this.buildWrapperCSSClass()
        }, {});
      }, t.buildWrapperCSSClass = function () {
        var e = "vjs-menu-button";
        return !0 === this.options_.inline ? e += "-inline" : e += "-popup", "vjs-menu-button " + e + " " + nn.prototype.buildCSSClass() + " " + n.prototype.buildCSSClass.call(this);
      }, t.buildCSSClass = function () {
        var e = "vjs-menu-button";
        return !0 === this.options_.inline ? e += "-inline" : e += "-popup", "vjs-menu-button " + e + " " + n.prototype.buildCSSClass.call(this);
      }, t.controlText = function (e, t) {
        return void 0 === t && (t = this.menuButton_.el()), this.menuButton_.controlText(e, t);
      }, t.dispose = function () {
        this.handleMouseLeave(), n.prototype.dispose.call(this);
      }, t.handleClick = function (e) {
        this.buttonPressed_ ? this.unpressButton() : this.pressButton();
      }, t.handleMouseLeave = function (e) {
        this.removeClass("vjs-hover"), je(d, "keyup", this.handleMenuKeyUp_);
      }, t.focus = function () {
        this.menuButton_.focus();
      }, t.blur = function () {
        this.menuButton_.blur();
      }, t.handleKeyDown = function (e) {
        xt.isEventKey(e, "Esc") || xt.isEventKey(e, "Tab") ? (this.buttonPressed_ && this.unpressButton(), xt.isEventKey(e, "Tab") || (e.preventDefault(), this.menuButton_.focus())) : (xt.isEventKey(e, "Up") || xt.isEventKey(e, "Down")) && (this.buttonPressed_ || (e.preventDefault(), this.pressButton()));
      }, t.handleMenuKeyUp = function (e) {
        (xt.isEventKey(e, "Esc") || xt.isEventKey(e, "Tab")) && this.removeClass("vjs-hover");
      }, t.handleSubmenuKeyPress = function (e) {
        this.handleSubmenuKeyDown(e);
      }, t.handleSubmenuKeyDown = function (e) {
        (xt.isEventKey(e, "Esc") || xt.isEventKey(e, "Tab")) && (this.buttonPressed_ && this.unpressButton(), xt.isEventKey(e, "Tab") || (e.preventDefault(), this.menuButton_.focus()));
      }, t.pressButton = function () {
        this.enabled_ && (this.buttonPressed_ = !0, this.menu.show(), this.menu.lockShowing(), this.menuButton_.el_.setAttribute("aria-expanded", "true"), V && Q() || this.menu.focus());
      }, t.unpressButton = function () {
        this.enabled_ && (this.buttonPressed_ = !1, this.menu.unlockShowing(), this.menu.hide(), this.menuButton_.el_.setAttribute("aria-expanded", "false"));
      }, t.disable = function () {
        this.unpressButton(), this.enabled_ = !1, this.addClass("vjs-disabled"), this.menuButton_.disable();
      }, t.enable = function () {
        this.enabled_ = !0, this.removeClass("vjs-disabled"), this.menuButton_.enable();
      }, e;
    }(pt);

    pt.registerComponent("MenuButton", H);

    rn = function (r) {
      function e(e, t) {
        var i = t.tracks,
            t = r.call(this, e, t) || this;
        if (t.items.length <= 1 && t.hide(), !i) return ft(t);
        var n = We(ft(t), t.update);
        return i.addEventListener("removetrack", n), i.addEventListener("addtrack", n), i.addEventListener("labelchange", n), t.player_.on("ready", n), t.player_.on("dispose", function () {
          i.removeEventListener("removetrack", n), i.removeEventListener("addtrack", n), i.removeEventListener("labelchange", n);
        }), t;
      }

      return mt(e, r), e;
    }(H);

    pt.registerComponent("TrackButton", rn);

    var dn = ["Tab", "Esc", "Up", "Down", "Right", "Left"],
        w = function (n) {
      function e(e, t) {
        e = n.call(this, e, t) || this;
        return e.selectable = t.selectable, e.isSelected_ = t.selected || !1, e.multiSelectable = t.multiSelectable, e.selected(e.isSelected_), e.selectable ? e.multiSelectable ? e.el_.setAttribute("role", "menuitemcheckbox") : e.el_.setAttribute("role", "menuitemradio") : e.el_.setAttribute("role", "menuitem"), e;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function (e, t, i) {
        return this.nonIconControl = !0, n.prototype.createEl.call(this, "li", T({
          className: "vjs-menu-item",
          innerHTML: '<span class="vjs-menu-item-text">' + this.localize(this.options_.label) + "</span>",
          tabIndex: -1
        }, t), i);
      }, t.handleKeyDown = function (t) {
        dn.some(function (e) {
          return xt.isEventKey(t, e);
        }) || n.prototype.handleKeyDown.call(this, t);
      }, t.handleClick = function (e) {
        this.selected(!0);
      }, t.selected = function (e) {
        this.selectable && (e ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected"), this.isSelected_ = !0) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(""), this.isSelected_ = !1));
      }, e;
    }(B);

    pt.registerComponent("MenuItem", w);

    var hn = function (u) {
      function e(e, t) {
        var n,
            i = t.track,
            r = e.textTracks();
        t.label = i.label || i.language || "Unknown", t.selected = "showing" === i.mode, (n = u.call(this, e, t) || this).track = i, n.kinds = (t.kinds || [t.kind || n.track.kind]).filter(Boolean);

        function a() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

          n.handleTracksChange.apply(ft(n), t);
        }

        function s() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

          n.handleSelectedLanguageChange.apply(ft(n), t);
        }

        var o;
        return e.on(["loadstart", "texttrackchange"], a), r.addEventListener("change", a), r.addEventListener("selectedlanguagechange", s), n.on("dispose", function () {
          e.off(["loadstart", "texttrackchange"], a), r.removeEventListener("change", a), r.removeEventListener("selectedlanguagechange", s);
        }), void 0 === r.onchange && n.on(["tap", "click"], function () {
          if ("object" != typeof _.Event) try {
            o = new _.Event("change");
          } catch (e) {}
          o || (o = d.createEvent("Event")).initEvent("change", !0, !0), r.dispatchEvent(o);
        }), n.handleTracksChange(), n;
      }

      mt(e, u);
      var t = e.prototype;
      return t.handleClick = function (e) {
        var t = this.track,
            i = this.player_.textTracks();
        if (u.prototype.handleClick.call(this, e), i) for (var n = 0; n < i.length; n++) {
          var r = i[n];
          -1 !== this.kinds.indexOf(r.kind) && (r === t ? "showing" !== r.mode && (r.mode = "showing") : "disabled" !== r.mode && (r.mode = "disabled"));
        }
      }, t.handleTracksChange = function (e) {
        var t = "showing" === this.track.mode;
        t !== this.isSelected_ && this.selected(t);
      }, t.handleSelectedLanguageChange = function (e) {
        var t;
        "showing" === this.track.mode && ((t = this.player_.cache_.selectedLanguage) && t.enabled && t.language === this.track.language && t.kind !== this.track.kind || (this.player_.cache_.selectedLanguage = {
          enabled: !0,
          language: this.track.language,
          kind: this.track.kind
        }));
      }, t.dispose = function () {
        this.track = null, u.prototype.dispose.call(this);
      }, e;
    }(w);

    pt.registerComponent("TextTrackMenuItem", hn);

    var pn = function (i) {
      function e(e, t) {
        return t.track = {
          player: e,
          kind: t.kind,
          kinds: t.kinds,
          default: !1,
          mode: "disabled"
        }, t.kinds || (t.kinds = [t.kind]), t.label ? t.track.label = t.label : t.track.label = t.kinds.join(" and ") + " off", t.selectable = !0, t.multiSelectable = !1, i.call(this, e, t) || this;
      }

      mt(e, i);
      var t = e.prototype;
      return t.handleTracksChange = function (e) {
        for (var t = this.player().textTracks(), i = !0, n = 0, r = t.length; n < r; n++) {
          var a = t[n];

          if (-1 < this.options_.kinds.indexOf(a.kind) && "showing" === a.mode) {
            i = !1;
            break;
          }
        }

        i !== this.isSelected_ && this.selected(i);
      }, t.handleSelectedLanguageChange = function (e) {
        for (var t = this.player().textTracks(), i = !0, n = 0, r = t.length; n < r; n++) {
          var a = t[n];

          if (-1 < ["captions", "descriptions", "subtitles"].indexOf(a.kind) && "showing" === a.mode) {
            i = !1;
            break;
          }
        }

        i && (this.player_.cache_.selectedLanguage = {
          enabled: !1
        });
      }, e;
    }(hn);

    pt.registerComponent("OffTextTrackMenuItem", pn);

    Ft = function (i) {
      function e(e, t) {
        return (t = void 0 === t ? {} : t).tracks = e.textTracks(), i.call(this, e, t) || this;
      }

      return mt(e, i), e.prototype.createItems = function (e, t) {
        var i;
        void 0 === t && (t = hn), this.label_ && (i = this.label_ + " off"), (e = void 0 === e ? [] : e).push(new pn(this.player_, {
          kinds: this.kinds_,
          kind: this.kind_,
          label: i
        })), this.hideThreshold_ += 1;
        var n = this.player_.textTracks();
        Array.isArray(this.kinds_) || (this.kinds_ = [this.kind_]);

        for (var r = 0; r < n.length; r++) {
          var a,
              s = n[r];
          -1 < this.kinds_.indexOf(s.kind) && ((a = new t(this.player_, {
            track: s,
            kinds: this.kinds_,
            kind: this.kind_,
            selectable: !0,
            multiSelectable: !1
          })).addClass("vjs-" + s.kind + "-menu-item"), e.push(a));
        }

        return e;
      }, e;
    }(rn);

    pt.registerComponent("TextTrackButton", Ft);

    var fn = function (a) {
      function e(e, t) {
        var i = t.track,
            n = t.cue,
            r = e.currentTime();
        return t.selectable = !0, t.multiSelectable = !1, t.label = n.text, t.selected = n.startTime <= r && r < n.endTime, (t = a.call(this, e, t) || this).track = i, t.cue = n, i.addEventListener("cuechange", We(ft(t), t.update)), t;
      }

      mt(e, a);
      var t = e.prototype;
      return t.handleClick = function (e) {
        a.prototype.handleClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime);
      }, t.update = function (e) {
        var t = this.cue,
            i = this.player_.currentTime();
        this.selected(t.startTime <= i && i < t.endTime);
      }, e;
    }(w);

    pt.registerComponent("ChaptersTrackMenuItem", fn);

    I = function (n) {
      function e(e, t, i) {
        return n.call(this, e, t, i) || this;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-chapters-button " + n.prototype.buildCSSClass.call(this);
      }, t.buildWrapperCSSClass = function () {
        return "vjs-chapters-button " + n.prototype.buildWrapperCSSClass.call(this);
      }, t.update = function (e) {
        this.track_ && (!e || "addtrack" !== e.type && "removetrack" !== e.type) || this.setTrack(this.findChaptersTrack()), n.prototype.update.call(this);
      }, t.setTrack = function (e) {
        var t;
        this.track_ !== e && (this.updateHandler_ || (this.updateHandler_ = this.update.bind(this)), this.track_ && ((t = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_)) && t.removeEventListener("load", this.updateHandler_), this.track_ = null), this.track_ = e, this.track_ && (this.track_.mode = "hidden", (e = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_)) && e.addEventListener("load", this.updateHandler_)));
      }, t.findChaptersTrack = function () {
        for (var e = this.player_.textTracks() || [], t = e.length - 1; 0 <= t; t--) {
          var i = e[t];
          if (i.kind === this.kind_) return i;
        }
      }, t.getMenuCaption = function () {
        return this.track_ && this.track_.label ? this.track_.label : this.localize(lt(this.kind_));
      }, t.createMenu = function () {
        return this.options_.title = this.getMenuCaption(), n.prototype.createMenu.call(this);
      }, t.createItems = function () {
        var e = [];
        if (!this.track_) return e;
        var t = this.track_.cues;
        if (!t) return e;

        for (var i = 0, n = t.length; i < n; i++) {
          var r = t[i],
              r = new fn(this.player_, {
            track: this.track_,
            cue: r
          });
          e.push(r);
        }

        return e;
      }, e;
    }(Ft);

    I.prototype.kind_ = "chapters", I.prototype.controlText_ = "Chapters", pt.registerComponent("ChaptersButton", I);

    r = function (a) {
      function e(e, t, i) {
        var i = a.call(this, e, t, i) || this,
            n = e.textTracks(),
            r = We(ft(i), i.handleTracksChange);
        return n.addEventListener("change", r), i.on("dispose", function () {
          n.removeEventListener("change", r);
        }), i;
      }

      mt(e, a);
      var t = e.prototype;
      return t.handleTracksChange = function (e) {
        for (var t = this.player().textTracks(), i = !1, n = 0, r = t.length; n < r; n++) {
          var a = t[n];

          if (a.kind !== this.kind_ && "showing" === a.mode) {
            i = !0;
            break;
          }
        }

        i ? this.disable() : this.enable();
      }, t.buildCSSClass = function () {
        return "vjs-descriptions-button " + a.prototype.buildCSSClass.call(this);
      }, t.buildWrapperCSSClass = function () {
        return "vjs-descriptions-button " + a.prototype.buildWrapperCSSClass.call(this);
      }, e;
    }(Ft);

    r.prototype.kind_ = "descriptions", r.prototype.controlText_ = "Descriptions", pt.registerComponent("DescriptionsButton", r);

    e = function (n) {
      function e(e, t, i) {
        return n.call(this, e, t, i) || this;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-subtitles-button " + n.prototype.buildCSSClass.call(this);
      }, t.buildWrapperCSSClass = function () {
        return "vjs-subtitles-button " + n.prototype.buildWrapperCSSClass.call(this);
      }, e;
    }(Ft);

    e.prototype.kind_ = "subtitles", e.prototype.controlText_ = "Subtitles", pt.registerComponent("SubtitlesButton", e);

    var mn = function (i) {
      function e(e, t) {
        return t.track = {
          player: e,
          kind: t.kind,
          label: t.kind + " settings",
          selectable: !1,
          default: !1,
          mode: "disabled"
        }, t.selectable = !1, t.name = "CaptionSettingsMenuItem", (e = i.call(this, e, t) || this).addClass("vjs-texttrack-settings"), e.controlText(", opens " + t.kind + " settings dialog"), e;
      }

      return mt(e, i), e.prototype.handleClick = function (e) {
        this.player().getChild("textTrackSettings").open();
      }, e;
    }(hn);

    pt.registerComponent("CaptionSettingsMenuItem", mn);

    n = function (n) {
      function e(e, t, i) {
        return n.call(this, e, t, i) || this;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-captions-button " + n.prototype.buildCSSClass.call(this);
      }, t.buildWrapperCSSClass = function () {
        return "vjs-captions-button " + n.prototype.buildWrapperCSSClass.call(this);
      }, t.createItems = function () {
        var e = [];
        return this.player().tech_ && this.player().tech_.featuresNativeTextTracks || !this.player().getChild("textTrackSettings") || (e.push(new mn(this.player_, {
          kind: this.kind_
        })), this.hideThreshold_ += 1), n.prototype.createItems.call(this, e);
      }, e;
    }(Ft);

    n.prototype.kind_ = "captions", n.prototype.controlText_ = "Captions", pt.registerComponent("CaptionsButton", n);

    var gn = function (r) {
      function e() {
        return r.apply(this, arguments) || this;
      }

      return mt(e, r), e.prototype.createEl = function (e, t, i) {
        var n = '<span class="vjs-menu-item-text">' + this.localize(this.options_.label);
        return "captions" === this.options_.track.kind && (n += '\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> ' + this.localize("Captions") + "</span>\n      "), r.prototype.createEl.call(this, e, T({
          innerHTML: n += "</span>"
        }, t), i);
      }, e;
    }(hn);

    pt.registerComponent("SubsCapsMenuItem", gn);

    x = function (i) {
      function e(e, t) {
        return (t = i.call(this, e, t = void 0 === t ? {} : t) || this).label_ = "subtitles", -1 < ["en", "en-us", "en-ca", "fr-ca"].indexOf(t.player_.language_) && (t.label_ = "captions"), t.menuButton_.controlText(lt(t.label_)), t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-subs-caps-button " + i.prototype.buildCSSClass.call(this);
      }, t.buildWrapperCSSClass = function () {
        return "vjs-subs-caps-button " + i.prototype.buildWrapperCSSClass.call(this);
      }, t.createItems = function () {
        var e = [];
        return this.player().tech_ && this.player().tech_.featuresNativeTextTracks || !this.player().getChild("textTrackSettings") || (e.push(new mn(this.player_, {
          kind: this.label_
        })), this.hideThreshold_ += 1), e = i.prototype.createItems.call(this, e, gn);
      }, e;
    }(Ft);

    x.prototype.kinds_ = ["captions", "subtitles"], x.prototype.controlText_ = "Subtitles", pt.registerComponent("SubsCapsButton", x);

    var yn = function (s) {
      function e(e, t) {
        var n,
            i = t.track,
            r = e.audioTracks();
        t.label = i.label || i.language || "Unknown", t.selected = i.enabled, (n = s.call(this, e, t) || this).track = i, n.addClass("vjs-" + i.kind + "-menu-item");

        function a() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

          n.handleTracksChange.apply(ft(n), t);
        }

        return r.addEventListener("change", a), n.on("dispose", function () {
          r.removeEventListener("change", a);
        }), n;
      }

      mt(e, s);
      var t = e.prototype;
      return t.createEl = function (e, t, i) {
        var n = '<span class="vjs-menu-item-text">' + this.localize(this.options_.label);
        return "main-desc" === this.options_.track.kind && (n += '\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> ' + this.localize("Descriptions") + "</span>\n      "), s.prototype.createEl.call(this, e, T({
          innerHTML: n += "</span>"
        }, t), i);
      }, t.handleClick = function (e) {
        s.prototype.handleClick.call(this, e), this.track.enabled = !0;
      }, t.handleTracksChange = function (e) {
        this.selected(this.track.enabled);
      }, e;
    }(w);

    pt.registerComponent("AudioTrackMenuItem", yn);

    A = function (i) {
      function e(e, t) {
        return (t = void 0 === t ? {} : t).tracks = e.audioTracks(), i.call(this, e, t) || this;
      }

      mt(e, i);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-audio-button " + i.prototype.buildCSSClass.call(this);
      }, t.buildWrapperCSSClass = function () {
        return "vjs-audio-button " + i.prototype.buildWrapperCSSClass.call(this);
      }, t.createItems = function (e) {
        void 0 === e && (e = []), this.hideThreshold_ = 1;

        for (var t = this.player_.audioTracks(), i = 0; i < t.length; i++) {
          var n = t[i];
          e.push(new yn(this.player_, {
            track: n,
            selectable: !0,
            multiSelectable: !1
          }));
        }

        return e;
      }, e;
    }(rn);

    A.prototype.controlText_ = "Audio Track", pt.registerComponent("AudioTrackButton", A);

    var vn = function (a) {
      function e(e, t) {
        var i,
            n = t.rate,
            r = parseFloat(n, 10);
        return t.label = n, t.selected = r === e.playbackRate(), t.selectable = !0, t.multiSelectable = !1, (i = a.call(this, e, t) || this).label = n, i.rate = r, i.on(e, "ratechange", function (e) {
          return i.update(e);
        }), i;
      }

      mt(e, a);
      var t = e.prototype;
      return t.handleClick = function (e) {
        a.prototype.handleClick.call(this), this.player().playbackRate(this.rate);
      }, t.update = function (e) {
        this.selected(this.player().playbackRate() === this.rate);
      }, e;
    }(w);

    vn.prototype.contentElType = "button", pt.registerComponent("PlaybackRateMenuItem", vn);

    B = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.menuButton_.el_.setAttribute("aria-describedby", i.labelElId_), i.updateVisibility(), i.updateLabel(), i.on(e, "loadstart", function (e) {
          return i.updateVisibility(e);
        }), i.on(e, "ratechange", function (e) {
          return i.updateLabel(e);
        }), i.on(e, "playbackrateschange", function (e) {
          return i.handlePlaybackRateschange(e);
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createEl = function () {
        var e = n.prototype.createEl.call(this);
        return this.labelElId_ = "vjs-playback-rate-value-label-" + this.id_, this.labelEl_ = J("div", {
          className: "vjs-playback-rate-value",
          id: this.labelElId_,
          innerHTML: "1x"
        }), e.appendChild(this.labelEl_), e;
      }, t.dispose = function () {
        this.labelEl_ = null, n.prototype.dispose.call(this);
      }, t.buildCSSClass = function () {
        return "vjs-playback-rate " + n.prototype.buildCSSClass.call(this);
      }, t.buildWrapperCSSClass = function () {
        return "vjs-playback-rate " + n.prototype.buildWrapperCSSClass.call(this);
      }, t.createItems = function () {
        for (var e = this.playbackRates(), t = [], i = e.length - 1; 0 <= i; i--) t.push(new vn(this.player(), {
          rate: e[i] + "x"
        }));

        return t;
      }, t.updateARIAAttributes = function () {
        this.el().setAttribute("aria-valuenow", this.player().playbackRate());
      }, t.handleClick = function (e) {
        for (var t = this.player().playbackRate(), i = this.playbackRates(), n = i[0], r = 0; r < i.length; r++) if (i[r] > t) {
          n = i[r];
          break;
        }

        this.player().playbackRate(n);
      }, t.handlePlaybackRateschange = function (e) {
        this.update();
      }, t.playbackRates = function () {
        var e = this.player();
        return e.playbackRates && e.playbackRates() || [];
      }, t.playbackRateSupported = function () {
        return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && 0 < this.playbackRates().length;
      }, t.updateVisibility = function (e) {
        this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden");
      }, t.updateLabel = function (e) {
        this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x");
      }, e;
    }(H);

    B.prototype.controlText_ = "Playback Rate", pt.registerComponent("PlaybackRateMenuButton", B);

    I = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }

      mt(t, e);
      var i = t.prototype;
      return i.buildCSSClass = function () {
        return "vjs-spacer " + e.prototype.buildCSSClass.call(this);
      }, i.createEl = function () {
        return e.prototype.createEl.call(this, "div", {
          className: this.buildCSSClass()
        });
      }, t;
    }(pt);

    pt.registerComponent("Spacer", I), pt.registerComponent("CustomControlSpacer", function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }

      mt(e, t);
      var i = e.prototype;
      return i.buildCSSClass = function () {
        return "vjs-custom-control-spacer " + t.prototype.buildCSSClass.call(this);
      }, i.createEl = function () {
        var e = t.prototype.createEl.call(this, {
          className: this.buildCSSClass()
        });
        return e.innerHTML = " ", e;
      }, e;
    }(I));

    r = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }

      return mt(t, e), t.prototype.createEl = function () {
        return e.prototype.createEl.call(this, "div", {
          className: "vjs-control-bar",
          dir: "ltr"
        });
      }, t;
    }(pt);

    r.prototype.options_ = {
      children: ["playToggle", "volumePanel", "currentTimeDisplay", "timeDivider", "durationDisplay", "progressControl", "liveDisplay", "seekToLive", "remainingTimeDisplay", "customControlSpacer", "playbackRateMenuButton", "chaptersButton", "descriptionsButton", "subsCapsButton", "audioTrackButton", "fullscreenToggle"]
    }, "exitPictureInPicture" in d && r.prototype.options_.children.splice(r.prototype.options_.children.length - 1, 0, "pictureInPictureToggle"), pt.registerComponent("ControlBar", r);

    e = function (n) {
      function e(e, t) {
        var i = n.call(this, e, t) || this;
        return i.on(e, "error", function (e) {
          return i.open(e);
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.buildCSSClass = function () {
        return "vjs-error-display " + n.prototype.buildCSSClass.call(this);
      }, t.content = function () {
        var e = this.player().error();
        return e ? this.localize(e.message) : "";
      }, e;
    }(Pt);

    e.prototype.options_ = g({}, Pt.prototype.options_, {
      pauseOnOpen: !1,
      fillAlways: !0,
      temporary: !1,
      uncloseable: !0
    }), pt.registerComponent("ErrorDisplay", e);
    var _n = "vjs-text-track-settings",
        n = ["#000", "Black"],
        Ft = ["#00F", "Blue"],
        x = ["#0FF", "Cyan"],
        rn = ["#0F0", "Green"],
        A = ["#F0F", "Magenta"],
        w = ["#F00", "Red"],
        H = ["#FFF", "White"],
        B = ["#FF0", "Yellow"],
        I = ["1", "Opaque"],
        r = ["0.5", "Semi-Transparent"],
        e = ["0", "Transparent"],
        bn = {
      backgroundColor: {
        selector: ".vjs-bg-color > select",
        id: "captions-background-color-%s",
        label: "Color",
        options: [n, H, w, rn, Ft, B, A, x]
      },
      backgroundOpacity: {
        selector: ".vjs-bg-opacity > select",
        id: "captions-background-opacity-%s",
        label: "Transparency",
        options: [I, r, e]
      },
      color: {
        selector: ".vjs-fg-color > select",
        id: "captions-foreground-color-%s",
        label: "Color",
        options: [H, n, w, rn, Ft, B, A, x]
      },
      edgeStyle: {
        selector: ".vjs-edge-style > select",
        id: "%s",
        label: "Text Edge Style",
        options: [["none", "None"], ["raised", "Raised"], ["depressed", "Depressed"], ["uniform", "Uniform"], ["dropshadow", "Dropshadow"]]
      },
      fontFamily: {
        selector: ".vjs-font-family > select",
        id: "captions-font-family-%s",
        label: "Font Family",
        options: [["proportionalSansSerif", "Proportional Sans-Serif"], ["monospaceSansSerif", "Monospace Sans-Serif"], ["proportionalSerif", "Proportional Serif"], ["monospaceSerif", "Monospace Serif"], ["casual", "Casual"], ["script", "Script"], ["small-caps", "Small Caps"]]
      },
      fontPercent: {
        selector: ".vjs-font-percent > select",
        id: "captions-font-size-%s",
        label: "Font Size",
        options: [["0.50", "50%"], ["0.75", "75%"], ["1.00", "100%"], ["1.25", "125%"], ["1.50", "150%"], ["1.75", "175%"], ["2.00", "200%"], ["3.00", "300%"], ["4.00", "400%"]],
        default: 2,
        parser: function (e) {
          return "1.00" === e ? null : Number(e);
        }
      },
      textOpacity: {
        selector: ".vjs-text-opacity > select",
        id: "captions-foreground-opacity-%s",
        label: "Transparency",
        options: [I, r]
      },
      windowColor: {
        selector: ".vjs-window-color > select",
        id: "captions-window-color-%s",
        label: "Color"
      },
      windowOpacity: {
        selector: ".vjs-window-opacity > select",
        id: "captions-window-opacity-%s",
        label: "Transparency",
        options: [e, r, I]
      }
    };

    function Tn(e, t) {
      if ((e = t ? t(e) : e) && "none" !== e) return e;
    }

    bn.windowColor.options = bn.backgroundColor.options, pt.registerComponent("TextTrackSettings", function (n) {
      function e(e, t) {
        var i;
        return t.temporary = !1, (i = n.call(this, e, t) || this).updateDisplay = i.updateDisplay.bind(ft(i)), i.fill(), i.hasBeenOpened_ = i.hasBeenFilled_ = !0, i.endDialog = J("p", {
          className: "vjs-control-text",
          textContent: i.localize("End of dialog window.")
        }), i.el().appendChild(i.endDialog), i.setDefaults(), void 0 === t.persistTextTrackSettings && (i.options_.persistTextTrackSettings = i.options_.playerOptions.persistTextTrackSettings), i.on(i.$(".vjs-done-button"), "click", function () {
          i.saveSettings(), i.close();
        }), i.on(i.$(".vjs-default-button"), "click", function () {
          i.setDefaults(), i.updateDisplay();
        }), b(bn, function (e) {
          i.on(i.$(e.selector), "change", i.updateDisplay);
        }), i.options_.persistTextTrackSettings && i.restoreSettings(), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.dispose = function () {
        this.endDialog = null, n.prototype.dispose.call(this);
      }, t.createElSelect_ = function (e, t, i) {
        var n = this;
        void 0 === t && (t = ""), void 0 === i && (i = "label");
        var e = bn[e],
            r = e.id.replace("%s", this.id_),
            a = [t, r].join(" ").trim();
        return ["<" + i + ' id="' + r + '" class="' + ("label" === i ? "vjs-label" : "") + '">', this.localize(e.label), "</" + i + ">", '<select aria-labelledby="' + a + '">'].concat(e.options.map(function (e) {
          var t = r + "-" + e[1].replace(/\W+/g, "");
          return ['<option id="' + t + '" value="' + e[0] + '" ', 'aria-labelledby="' + a + " " + t + '">', n.localize(e[1]), "</option>"].join("");
        })).concat("</select>").join("");
      }, t.createElFgColor_ = function () {
        var e = "captions-text-legend-" + this.id_;
        return ['<fieldset class="vjs-fg-color vjs-track-setting">', '<legend id="' + e + '">', this.localize("Text"), "</legend>", this.createElSelect_("color", e), '<span class="vjs-text-opacity vjs-opacity">', this.createElSelect_("textOpacity", e), "</span>", "</fieldset>"].join("");
      }, t.createElBgColor_ = function () {
        var e = "captions-background-" + this.id_;
        return ['<fieldset class="vjs-bg-color vjs-track-setting">', '<legend id="' + e + '">', this.localize("Background"), "</legend>", this.createElSelect_("backgroundColor", e), '<span class="vjs-bg-opacity vjs-opacity">', this.createElSelect_("backgroundOpacity", e), "</span>", "</fieldset>"].join("");
      }, t.createElWinColor_ = function () {
        var e = "captions-window-" + this.id_;
        return ['<fieldset class="vjs-window-color vjs-track-setting">', '<legend id="' + e + '">', this.localize("Window"), "</legend>", this.createElSelect_("windowColor", e), '<span class="vjs-window-opacity vjs-opacity">', this.createElSelect_("windowOpacity", e), "</span>", "</fieldset>"].join("");
      }, t.createElColors_ = function () {
        return J("div", {
          className: "vjs-track-settings-colors",
          innerHTML: [this.createElFgColor_(), this.createElBgColor_(), this.createElWinColor_()].join("")
        });
      }, t.createElFont_ = function () {
        return J("div", {
          className: "vjs-track-settings-font",
          innerHTML: ['<fieldset class="vjs-font-percent vjs-track-setting">', this.createElSelect_("fontPercent", "", "legend"), "</fieldset>", '<fieldset class="vjs-edge-style vjs-track-setting">', this.createElSelect_("edgeStyle", "", "legend"), "</fieldset>", '<fieldset class="vjs-font-family vjs-track-setting">', this.createElSelect_("fontFamily", "", "legend"), "</fieldset>"].join("")
        });
      }, t.createElControls_ = function () {
        var e = this.localize("restore all settings to the default values");
        return J("div", {
          className: "vjs-track-settings-controls",
          innerHTML: ['<button type="button" class="vjs-default-button" title="' + e + '">', this.localize("Reset"), '<span class="vjs-control-text"> ' + e + "</span>", "</button>", '<button type="button" class="vjs-done-button">' + this.localize("Done") + "</button>"].join("")
        });
      }, t.content = function () {
        return [this.createElColors_(), this.createElFont_(), this.createElControls_()];
      }, t.label = function () {
        return this.localize("Caption Settings Dialog");
      }, t.description = function () {
        return this.localize("Beginning of dialog window. Escape will cancel and close the window.");
      }, t.buildCSSClass = function () {
        return n.prototype.buildCSSClass.call(this) + " vjs-text-track-settings";
      }, t.getValues = function () {
        var i,
            n,
            e,
            r = this;
        return n = function (e, t, i) {
          var n,
              t = (n = r.$(t.selector), t = t.parser, Tn(n.options[n.options.selectedIndex].value, t));
          return void 0 !== t && (e[i] = t), e;
        }, void 0 === (e = {}) && (e = 0), v(i = bn).reduce(function (e, t) {
          return n(e, i[t], t);
        }, e);
      }, t.setValues = function (i) {
        var n = this;
        b(bn, function (e, t) {
          !function (e, t, i) {
            if (t) for (var n = 0; n < e.options.length; n++) if (Tn(e.options[n].value, i) === t) {
              e.selectedIndex = n;
              break;
            }
          }(n.$(e.selector), i[t], e.parser);
        });
      }, t.setDefaults = function () {
        var i = this;
        b(bn, function (e) {
          var t = e.hasOwnProperty("default") ? e.default : 0;
          i.$(e.selector).selectedIndex = t;
        });
      }, t.restoreSettings = function () {
        var e;

        try {
          e = JSON.parse(_.localStorage.getItem(_n));
        } catch (e) {
          f.warn(e);
        }

        e && this.setValues(e);
      }, t.saveSettings = function () {
        if (this.options_.persistTextTrackSettings) {
          var e = this.getValues();

          try {
            Object.keys(e).length ? _.localStorage.setItem(_n, JSON.stringify(e)) : _.localStorage.removeItem(_n);
          } catch (e) {
            f.warn(e);
          }
        }
      }, t.updateDisplay = function () {
        var e = this.player_.getChild("textTrackDisplay");
        e && e.updateDisplay();
      }, t.conditionalBlur_ = function () {
        this.previouslyActiveEl_ = null;
        var e = this.player_.controlBar,
            t = e && e.subsCapsButton,
            e = e && e.captionsButton;
        t ? t.focus() : e && e.focus();
      }, e;
    }(Pt)), pt.registerComponent("ResizeManager", function (a) {
      function e(e, t) {
        var i,
            n = t.ResizeObserver || _.ResizeObserver,
            r = ct({
          createEl: !(n = null === t.ResizeObserver ? !1 : n),
          reportTouchActivity: !1
        }, t);
        return (i = a.call(this, e, r) || this).ResizeObserver = t.ResizeObserver || _.ResizeObserver, i.loadListener_ = null, i.resizeObserver_ = null, i.debouncedHandler_ = Ge(function () {
          i.resizeHandler();
        }, 100, !1, ft(i)), n ? (i.resizeObserver_ = new i.ResizeObserver(i.debouncedHandler_), i.resizeObserver_.observe(e.el())) : (i.loadListener_ = function () {
          var e, t;
          i.el_ && i.el_.contentWindow && (e = i.debouncedHandler_, t = i.unloadListener_ = function () {
            je(this, "resize", e), je(this, "unload", t), t = null;
          }, Fe(i.el_.contentWindow, "unload", t), Fe(i.el_.contentWindow, "resize", e));
        }, i.one("load", i.loadListener_)), i;
      }

      mt(e, a);
      var t = e.prototype;
      return t.createEl = function () {
        return a.prototype.createEl.call(this, "iframe", {
          className: "vjs-resize-manager",
          tabIndex: -1
        }, {
          "aria-hidden": "true"
        });
      }, t.resizeHandler = function () {
        this.player_ && this.player_.trigger && this.player_.trigger("playerresize");
      }, t.dispose = function () {
        this.debouncedHandler_ && this.debouncedHandler_.cancel(), this.resizeObserver_ && (this.player_.el() && this.resizeObserver_.unobserve(this.player_.el()), this.resizeObserver_.disconnect()), this.loadListener_ && this.off("load", this.loadListener_), this.el_ && this.el_.contentWindow && this.unloadListener_ && this.unloadListener_.call(this.el_.contentWindow), this.ResizeObserver = null, this.resizeObserver = null, this.debouncedHandler_ = null, this.loadListener_ = null, a.prototype.dispose.call(this);
      }, e;
    }(pt));
    var Sn = {
      trackingThreshold: 30,
      liveTolerance: 15
    };
    pt.registerComponent("LiveTracker", function (n) {
      function e(e, t) {
        var t = ct(Sn, t, {
          createEl: !1
        }),
            i = n.call(this, e, t) || this;
        return i.handleVisibilityChange_ = function (e) {
          return i.handleVisibilityChange(e);
        }, i.trackLiveHandler_ = function () {
          return i.trackLive_();
        }, i.handlePlay_ = function (e) {
          return i.handlePlay(e);
        }, i.handleFirstTimeupdate_ = function (e) {
          return i.handleFirstTimeupdate(e);
        }, i.handleSeeked_ = function (e) {
          return i.handleSeeked(e);
        }, i.seekToLiveEdge_ = function (e) {
          return i.seekToLiveEdge(e);
        }, i.reset_(), i.on(i.player_, "durationchange", function (e) {
          return i.handleDurationchange(e);
        }), i.one(i.player_, "canplay", function () {
          return i.toggleTracking();
        }), U && "hidden" in d && "visibilityState" in d && i.on(d, "visibilitychange", i.handleVisibilityChange_), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.handleVisibilityChange = function () {
        this.player_.duration() === 1 / 0 && (d.hidden ? this.stopTracking() : this.startTracking());
      }, t.trackLive_ = function () {
        var e,
            t = this.player_.seekable();
        t && t.length && (e = Number(_.performance.now().toFixed(4)), t = -1 === this.lastTime_ ? 0 : (e - this.lastTime_) / 1e3, this.lastTime_ = e, this.pastSeekEnd_ = this.pastSeekEnd() + t, e = this.liveCurrentTime(), t = this.player_.currentTime(), t = this.player_.paused() || this.seekedBehindLive_ || Math.abs(e - t) > this.options_.liveTolerance, (t = !this.timeupdateSeen_ || e === 1 / 0 ? !1 : t) !== this.behindLiveEdge_ && (this.behindLiveEdge_ = t, this.trigger("liveedgechange")));
      }, t.handleDurationchange = function () {
        this.toggleTracking();
      }, t.toggleTracking = function () {
        this.player_.duration() === 1 / 0 && this.liveWindow() >= this.options_.trackingThreshold ? (this.player_.options_.liveui && this.player_.addClass("vjs-liveui"), this.startTracking()) : (this.player_.removeClass("vjs-liveui"), this.stopTracking());
      }, t.startTracking = function () {
        this.isTracking() || (this.timeupdateSeen_ || (this.timeupdateSeen_ = this.player_.hasStarted()), this.trackingInterval_ = this.setInterval(this.trackLiveHandler_, 30), this.trackLive_(), this.on(this.player_, ["play", "pause"], this.trackLiveHandler_), this.timeupdateSeen_ ? this.on(this.player_, "seeked", this.handleSeeked_) : (this.one(this.player_, "play", this.handlePlay_), this.one(this.player_, "timeupdate", this.handleFirstTimeupdate_)));
      }, t.handleFirstTimeupdate = function () {
        this.timeupdateSeen_ = !0, this.on(this.player_, "seeked", this.handleSeeked_);
      }, t.handleSeeked = function () {
        var e = Math.abs(this.liveCurrentTime() - this.player_.currentTime());
        this.seekedBehindLive_ = this.nextSeekedFromUser_ && 2 < e, this.nextSeekedFromUser_ = !1, this.trackLive_();
      }, t.handlePlay = function () {
        this.one(this.player_, "timeupdate", this.seekToLiveEdge_);
      }, t.reset_ = function () {
        this.lastTime_ = -1, this.pastSeekEnd_ = 0, this.lastSeekEnd_ = -1, this.behindLiveEdge_ = !0, this.timeupdateSeen_ = !1, this.seekedBehindLive_ = !1, this.nextSeekedFromUser_ = !1, this.clearInterval(this.trackingInterval_), this.trackingInterval_ = null, this.off(this.player_, ["play", "pause"], this.trackLiveHandler_), this.off(this.player_, "seeked", this.handleSeeked_), this.off(this.player_, "play", this.handlePlay_), this.off(this.player_, "timeupdate", this.handleFirstTimeupdate_), this.off(this.player_, "timeupdate", this.seekToLiveEdge_);
      }, t.nextSeekedFromUser = function () {
        this.nextSeekedFromUser_ = !0;
      }, t.stopTracking = function () {
        this.isTracking() && (this.reset_(), this.trigger("liveedgechange"));
      }, t.seekableEnd = function () {
        for (var e = this.player_.seekable(), t = [], i = e ? e.length : 0; i--;) t.push(e.end(i));

        return t.length ? t.sort()[t.length - 1] : 1 / 0;
      }, t.seekableStart = function () {
        for (var e = this.player_.seekable(), t = [], i = e ? e.length : 0; i--;) t.push(e.start(i));

        return t.length ? t.sort()[0] : 0;
      }, t.liveWindow = function () {
        var e = this.liveCurrentTime();
        return e === 1 / 0 ? 0 : e - this.seekableStart();
      }, t.isLive = function () {
        return this.isTracking();
      }, t.atLiveEdge = function () {
        return !this.behindLiveEdge();
      }, t.liveCurrentTime = function () {
        return this.pastSeekEnd() + this.seekableEnd();
      }, t.pastSeekEnd = function () {
        var e = this.seekableEnd();
        return -1 !== this.lastSeekEnd_ && e !== this.lastSeekEnd_ && (this.pastSeekEnd_ = 0), this.lastSeekEnd_ = e, this.pastSeekEnd_;
      }, t.behindLiveEdge = function () {
        return this.behindLiveEdge_;
      }, t.isTracking = function () {
        return "number" == typeof this.trackingInterval_;
      }, t.seekToLiveEdge = function () {
        this.seekedBehindLive_ = !1, this.atLiveEdge() || (this.nextSeekedFromUser_ = !1, this.player_.currentTime(this.liveCurrentTime()));
      }, t.dispose = function () {
        this.off(d, "visibilitychange", this.handleVisibilityChange_), this.stopTracking(), n.prototype.dispose.call(this);
      }, e;
    }(pt));

    function En(e) {
      if ((n = e.el()).hasAttribute("src")) return e.triggerSourceset(n.src), 1;
      var t = e.$$("source"),
          i = [],
          n = "";

      if (t.length) {
        for (var r = 0; r < t.length; r++) {
          var a = t[r].src;
          a && -1 === i.indexOf(a) && i.push(a);
        }

        return !!i.length && (1 === i.length && (n = i[0]), e.triggerSourceset(n), !0);
      }
    }

    function kn(e, t) {
      for (var i = {}, n = 0; n < e.length && !((i = Object.getOwnPropertyDescriptor(e[n], t)) && i.set && i.get); n++);

      return i.enumerable = !0, i.configurable = !0, i;
    }

    function Cn(a) {
      var t,
          e,
          i,
          s = a.el();
      s.resetSourceWatch_ || (t = {}, e = kn([a.el(), _.HTMLMediaElement.prototype, _.Element.prototype, An], "innerHTML"), i = function (r) {
        return function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

          var n = r.apply(s, t);
          return En(a), n;
        };
      }, ["append", "appendChild", "insertAdjacentHTML"].forEach(function (e) {
        s[e] && (t[e] = s[e], s[e] = i(t[e]));
      }), Object.defineProperty(s, "innerHTML", ct(e, {
        set: i(e.set)
      })), s.resetSourceWatch_ = function () {
        s.resetSourceWatch_ = null, Object.keys(t).forEach(function (e) {
          s[e] = t[e];
        }), Object.defineProperty(s, "innerHTML", e);
      }, a.one("sourceset", s.resetSourceWatch_));
    }

    function wn(i) {
      var n, t, r, a;
      i.featuresSourceset && ((n = i.el()).resetSourceset_ || (t = kn([i.el(), _.HTMLMediaElement.prototype, Pn], "src"), r = n.setAttribute, a = n.load, Object.defineProperty(n, "src", ct(t, {
        set: function (e) {
          e = t.set.call(n, e);
          return i.triggerSourceset(n.src), e;
        }
      })), n.setAttribute = function (e, t) {
        t = r.call(n, e, t);
        return /src/i.test(e) && i.triggerSourceset(n.src), t;
      }, n.load = function () {
        var e = a.call(n);
        return En(i) || (i.triggerSourceset(""), Cn(i)), e;
      }, n.currentSrc ? i.triggerSourceset(n.currentSrc) : En(i) || Cn(i), n.resetSourceset_ = function () {
        n.resetSourceset_ = null, n.load = a, n.setAttribute = r, Object.defineProperty(n, "src", t), n.resetSourceWatch_ && n.resetSourceWatch_();
      }));
    }

    function In(t, i, n, e) {
      function r(e) {
        return Object.defineProperty(t, i, {
          value: e,
          enumerable: !0,
          writable: !0
        });
      }

      var a = {
        configurable: !0,
        enumerable: !0,
        get: function () {
          var e = n();
          return r(e), e;
        }
      };
      return (e = void 0 === e ? !0 : e) && (a.set = r), Object.defineProperty(t, i, a);
    }

    var xn,
        An = Object.defineProperty({}, "innerHTML", {
      get: function () {
        return this.cloneNode(!0).innerHTML;
      },
      set: function (e) {
        var t = d.createElement(this.nodeName.toLowerCase());
        t.innerHTML = e;

        for (var i = d.createDocumentFragment(); t.childNodes.length;) i.appendChild(t.childNodes[0]);

        return this.innerText = "", _.Element.prototype.appendChild.call(this, i), this.innerHTML;
      }
    }),
        Pn = Object.defineProperty({}, "src", {
      get: function () {
        return this.hasAttribute("src") ? Nt(_.Element.prototype.getAttribute.call(this, "src")) : "";
      },
      set: function (e) {
        return _.Element.prototype.setAttribute.call(this, "src", e), e;
      }
    }),
        Ln = function (l) {
      function s(e, t) {
        var i = l.call(this, e, t) || this,
            t = e.source,
            n = !1;

        if (t && (i.el_.currentSrc !== t.src || e.tag && 3 === e.tag.initNetworkState_) ? i.setSource(t) : i.handleLateInit_(i.el_), e.enableSourceset && i.setupSourcesetHandling_(), i.isScrubbing_ = !1, i.el_.hasChildNodes()) {
          for (var r = i.el_.childNodes, a = r.length, s = []; a--;) {
            var o = r[a];
            "track" === o.nodeName.toLowerCase() && (i.featuresNativeTextTracks ? (i.remoteTextTrackEls().addTrackElement_(o), i.remoteTextTracks().addTrack(o.track), i.textTracks().addTrack(o.track), n || i.el_.hasAttribute("crossorigin") || !Bt(o.src) || (n = !0)) : s.push(o));
          }

          for (var u = 0; u < s.length; u++) i.el_.removeChild(s[u]);
        }

        return i.proxyNativeTracks_(), i.featuresNativeTextTracks && n && f.warn("Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\nThis may prevent text tracks from loading."), i.restoreMetadataTracksInIOSNativePlayer_(), (j || q || D) && !0 === e.nativeControlsForTouch && i.setControls(!0), i.proxyWebkitFullscreen_(), i.triggerReady(), i;
      }

      mt(s, l);
      var e = s.prototype;
      return e.dispose = function () {
        this.el_ && this.el_.resetSourceset_ && this.el_.resetSourceset_(), s.disposeMediaElement(this.el_), this.options_ = null, l.prototype.dispose.call(this);
      }, e.setupSourcesetHandling_ = function () {
        wn(this);
      }, e.restoreMetadataTracksInIOSNativePlayer_ = function () {
        function e() {
          i = [];

          for (var e = 0; e < n.length; e++) {
            var t = n[e];
            "metadata" === t.kind && i.push({
              track: t,
              storedMode: t.mode
            });
          }
        }

        var i,
            n = this.textTracks();
        e(), n.addEventListener("change", e), this.on("dispose", function () {
          return n.removeEventListener("change", e);
        });

        function r() {
          for (var e = 0; e < i.length; e++) {
            var t = i[e];
            "disabled" === t.track.mode && t.track.mode !== t.storedMode && (t.track.mode = t.storedMode);
          }

          n.removeEventListener("change", r);
        }

        this.on("webkitbeginfullscreen", function () {
          n.removeEventListener("change", e), n.removeEventListener("change", r), n.addEventListener("change", r);
        }), this.on("webkitendfullscreen", function () {
          n.removeEventListener("change", e), n.addEventListener("change", e), n.removeEventListener("change", r);
        });
      }, e.overrideNative_ = function (e, t) {
        var i,
            n = this;
        t === this["featuresNative" + e + "Tracks"] && (this[(i = e.toLowerCase()) + "TracksListeners_"] && Object.keys(this[i + "TracksListeners_"]).forEach(function (e) {
          n.el()[i + "Tracks"].removeEventListener(e, n[i + "TracksListeners_"][e]);
        }), this["featuresNative" + e + "Tracks"] = !t, this[i + "TracksListeners_"] = null, this.proxyNativeTracksForType_(i));
      }, e.overrideNativeAudioTracks = function (e) {
        this.overrideNative_("Audio", e);
      }, e.overrideNativeVideoTracks = function (e) {
        this.overrideNative_("Video", e);
      }, e.proxyNativeTracksForType_ = function (i) {
        var e,
            t,
            n = this,
            r = ri[i],
            a = this.el()[r.getterName],
            s = this[r.getterName]();
        this["featuresNative" + r.capitalName + "Tracks"] && a && a.addEventListener && (t = function () {
          for (var e = [], t = 0; t < s.length; t++) {
            for (var i = !1, n = 0; n < a.length; n++) if (a[n] === s[t]) {
              i = !0;
              break;
            }

            i || e.push(s[t]);
          }

          for (; e.length;) s.removeTrack(e.shift());
        }, this[r.getterName + "Listeners_"] = e = {
          change: function (e) {
            var t = {
              type: "change",
              target: s,
              currentTarget: s,
              srcElement: s
            };
            s.trigger(t), "text" === i && n[ai.remoteText.getterName]().trigger(t);
          },
          addtrack: function (e) {
            s.addTrack(e.track);
          },
          removetrack: function (e) {
            s.removeTrack(e.track);
          }
        }, Object.keys(e).forEach(function (t) {
          var i = e[t];
          a.addEventListener(t, i), n.on("dispose", function (e) {
            return a.removeEventListener(t, i);
          });
        }), this.on("loadstart", t), this.on("dispose", function (e) {
          return n.off("loadstart", t);
        }));
      }, e.proxyNativeTracks_ = function () {
        var t = this;
        ri.names.forEach(function (e) {
          t.proxyNativeTracksForType_(e);
        });
      }, e.createEl = function () {
        var e,
            t = this.options_.tag;
        t && (this.options_.playerElIngest || this.movingMediaElementInDOM) || (t ? (e = t.cloneNode(!0), t.parentNode && t.parentNode.insertBefore(e, t), s.disposeMediaElement(t), t = e) : (t = d.createElement("video"), e = ct({}, this.options_.tag && se(this.options_.tag)), j && !0 === this.options_.nativeControlsForTouch || delete e.controls, ae(t, T(e, {
          id: this.options_.techId,
          class: "vjs-tech"
        }))), t.playerId = this.options_.playerId), "undefined" != typeof this.options_.preload && ue(t, "preload", this.options_.preload), void 0 !== this.options_.disablePictureInPicture && (t.disablePictureInPicture = this.options_.disablePictureInPicture);

        for (var i = ["loop", "muted", "playsinline", "autoplay"], n = 0; n < i.length; n++) {
          var r = i[n],
              a = this.options_[r];
          "undefined" != typeof a && (a ? ue(t, r, r) : le(t, r), t[r] = a);
        }

        return t;
      }, e.handleLateInit_ = function (e) {
        if (0 !== e.networkState && 3 !== e.networkState) {
          if (0 === e.readyState) {
            var t = !1,
                i = function () {
              t = !0;
            };

            this.on("loadstart", i);

            var n = function () {
              t || this.trigger("loadstart");
            };

            return this.on("loadedmetadata", n), void this.ready(function () {
              this.off("loadstart", i), this.off("loadedmetadata", n), t || this.trigger("loadstart");
            });
          }

          var r = ["loadstart"];
          r.push("loadedmetadata"), 2 <= e.readyState && r.push("loadeddata"), 3 <= e.readyState && r.push("canplay"), 4 <= e.readyState && r.push("canplaythrough"), this.ready(function () {
            r.forEach(function (e) {
              this.trigger(e);
            }, this);
          });
        }
      }, e.setScrubbing = function (e) {
        this.isScrubbing_ = e;
      }, e.scrubbing = function () {
        return this.isScrubbing_;
      }, e.setCurrentTime = function (e) {
        try {
          this.isScrubbing_ && this.el_.fastSeek && W ? this.el_.fastSeek(e) : this.el_.currentTime = e;
        } catch (e) {
          f(e, "Video is not ready. (Video.js)");
        }
      }, e.duration = function () {
        var t = this;
        return this.el_.duration === 1 / 0 && P && M && 0 === this.el_.currentTime ? (this.on("timeupdate", function e() {
          0 < t.el_.currentTime && (t.el_.duration === 1 / 0 && t.trigger("durationchange"), t.off("timeupdate", e));
        }), NaN) : this.el_.duration || NaN;
      }, e.width = function () {
        return this.el_.offsetWidth;
      }, e.height = function () {
        return this.el_.offsetHeight;
      }, e.proxyWebkitFullscreen_ = function () {
        var e,
            t,
            i = this;
        "webkitDisplayingFullscreen" in this.el_ && (e = function () {
          this.trigger("fullscreenchange", {
            isFullscreen: !1
          });
        }, t = function () {
          "webkitPresentationMode" in this.el_ && "picture-in-picture" !== this.el_.webkitPresentationMode && (this.one("webkitendfullscreen", e), this.trigger("fullscreenchange", {
            isFullscreen: !0,
            nativeIOSFullscreen: !0
          }));
        }, this.on("webkitbeginfullscreen", t), this.on("dispose", function () {
          i.off("webkitbeginfullscreen", t), i.off("webkitendfullscreen", e);
        }));
      }, e.supportsFullScreen = function () {
        if ("function" == typeof this.el_.webkitEnterFullScreen) {
          var e = _.navigator && _.navigator.userAgent || "";
          if (/Android/.test(e) || !/Chrome|Mac OS X 10.5/.test(e)) return !0;
        }

        return !1;
      }, e.enterFullScreen = function () {
        var e = this.el_;
        if (e.paused && e.networkState <= e.HAVE_METADATA) kt(this.el_.play()), this.setTimeout(function () {
          e.pause();

          try {
            e.webkitEnterFullScreen();
          } catch (e) {
            this.trigger("fullscreenerror", e);
          }
        }, 0);else try {
          e.webkitEnterFullScreen();
        } catch (e) {
          this.trigger("fullscreenerror", e);
        }
      }, e.exitFullScreen = function () {
        this.el_.webkitDisplayingFullscreen ? this.el_.webkitExitFullScreen() : this.trigger("fullscreenerror", new Error("The video is not fullscreen"));
      }, e.requestPictureInPicture = function () {
        return this.el_.requestPictureInPicture();
      }, e.src = function (e) {
        if (void 0 === e) return this.el_.src;
        this.setSrc(e);
      }, e.reset = function () {
        s.resetMediaElement(this.el_);
      }, e.currentSrc = function () {
        return this.currentSource_ ? this.currentSource_.src : this.el_.currentSrc;
      }, e.setControls = function (e) {
        this.el_.controls = !!e;
      }, e.addTextTrack = function (e, t, i) {
        return this.featuresNativeTextTracks ? this.el_.addTextTrack(e, t, i) : l.prototype.addTextTrack.call(this, e, t, i);
      }, e.createRemoteTextTrack = function (e) {
        if (!this.featuresNativeTextTracks) return l.prototype.createRemoteTextTrack.call(this, e);
        var t = d.createElement("track");
        return e.kind && (t.kind = e.kind), e.label && (t.label = e.label), (e.language || e.srclang) && (t.srclang = e.language || e.srclang), e.default && (t.default = e.default), e.id && (t.id = e.id), e.src && (t.src = e.src), t;
      }, e.addRemoteTextTrack = function (e, t) {
        t = l.prototype.addRemoteTextTrack.call(this, e, t);
        return this.featuresNativeTextTracks && this.el().appendChild(t), t;
      }, e.removeRemoteTextTrack = function (e) {
        if (l.prototype.removeRemoteTextTrack.call(this, e), this.featuresNativeTextTracks) for (var t = this.$$("track"), i = t.length; i--;) e !== t[i] && e !== t[i].track || this.el().removeChild(t[i]);
      }, e.getVideoPlaybackQuality = function () {
        if ("function" == typeof this.el().getVideoPlaybackQuality) return this.el().getVideoPlaybackQuality();
        var e = {};
        return "undefined" != typeof this.el().webkitDroppedFrameCount && "undefined" != typeof this.el().webkitDecodedFrameCount && (e.droppedVideoFrames = this.el().webkitDroppedFrameCount, e.totalVideoFrames = this.el().webkitDecodedFrameCount), _.performance && "function" == typeof _.performance.now ? e.creationTime = _.performance.now() : _.performance && _.performance.timing && "number" == typeof _.performance.timing.navigationStart && (e.creationTime = _.Date.now() - _.performance.timing.navigationStart), e;
      }, s;
    }(Ui);

    In(Ln, "TEST_VID", function () {
      if (K()) {
        var e = d.createElement("video"),
            t = d.createElement("track");
        return t.kind = "captions", t.srclang = "en", t.label = "English", e.appendChild(t), e;
      }
    }), Ln.isSupported = function () {
      try {
        Ln.TEST_VID.volume = .5;
      } catch (e) {
        return !1;
      }

      return !(!Ln.TEST_VID || !Ln.TEST_VID.canPlayType);
    }, Ln.canPlayType = function (e) {
      return Ln.TEST_VID.canPlayType(e);
    }, Ln.canPlaySource = function (e, t) {
      return Ln.canPlayType(e.type);
    }, Ln.canControlVolume = function () {
      try {
        var e = Ln.TEST_VID.volume;
        return Ln.TEST_VID.volume = e / 2 + .1, e !== Ln.TEST_VID.volume;
      } catch (e) {
        return !1;
      }
    }, Ln.canMuteVolume = function () {
      try {
        var e = Ln.TEST_VID.muted;
        return Ln.TEST_VID.muted = !e, Ln.TEST_VID.muted ? ue(Ln.TEST_VID, "muted", "muted") : le(Ln.TEST_VID, "muted"), e !== Ln.TEST_VID.muted;
      } catch (e) {
        return !1;
      }
    }, Ln.canControlPlaybackRate = function () {
      if (P && M && N < 58) return !1;

      try {
        var e = Ln.TEST_VID.playbackRate;
        return Ln.TEST_VID.playbackRate = e / 2 + .1, e !== Ln.TEST_VID.playbackRate;
      } catch (e) {
        return !1;
      }
    }, Ln.canOverrideAttributes = function () {
      try {
        var e = function () {};

        Object.defineProperty(d.createElement("video"), "src", {
          get: e,
          set: e
        }), Object.defineProperty(d.createElement("audio"), "src", {
          get: e,
          set: e
        }), Object.defineProperty(d.createElement("video"), "innerHTML", {
          get: e,
          set: e
        }), Object.defineProperty(d.createElement("audio"), "innerHTML", {
          get: e,
          set: e
        });
      } catch (e) {
        return !1;
      }

      return !0;
    }, Ln.supportsNativeTextTracks = function () {
      return W || V && M;
    }, Ln.supportsNativeVideoTracks = function () {
      return !(!Ln.TEST_VID || !Ln.TEST_VID.videoTracks);
    }, Ln.supportsNativeAudioTracks = function () {
      return !(!Ln.TEST_VID || !Ln.TEST_VID.audioTracks);
    }, Ln.Events = ["loadstart", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "progress", "play", "pause", "ratechange", "resize", "volumechange"], [["featuresVolumeControl", "canControlVolume"], ["featuresMuteControl", "canMuteVolume"], ["featuresPlaybackRate", "canControlPlaybackRate"], ["featuresSourceset", "canOverrideAttributes"], ["featuresNativeTextTracks", "supportsNativeTextTracks"], ["featuresNativeVideoTracks", "supportsNativeVideoTracks"], ["featuresNativeAudioTracks", "supportsNativeAudioTracks"]].forEach(function (e) {
      var t = e[0],
          i = e[1];
      In(Ln.prototype, t, function () {
        return Ln[i]();
      }, !0);
    }), Ln.prototype.movingMediaElementInDOM = !V, Ln.prototype.featuresFullscreenResize = !0, Ln.prototype.featuresProgressEvents = !0, Ln.prototype.featuresTimeupdateEvents = !0, Ln.patchCanPlayType = function () {
      4 <= L && !O && !M && (xn = Ln.TEST_VID && Ln.TEST_VID.constructor.prototype.canPlayType, Ln.TEST_VID.constructor.prototype.canPlayType = function (e) {
        return e && /^application\/(?:x-|vnd\.apple\.)mpegurl/i.test(e) ? "maybe" : xn.call(this, e);
      });
    }, Ln.unpatchCanPlayType = function () {
      var e = Ln.TEST_VID.constructor.prototype.canPlayType;
      return xn && (Ln.TEST_VID.constructor.prototype.canPlayType = xn), e;
    }, Ln.patchCanPlayType(), Ln.disposeMediaElement = function (e) {
      if (e) {
        for (e.parentNode && e.parentNode.removeChild(e); e.hasChildNodes();) e.removeChild(e.firstChild);

        e.removeAttribute("src"), "function" == typeof e.load && function () {
          try {
            e.load();
          } catch (e) {}
        }();
      }
    }, Ln.resetMediaElement = function (e) {
      if (e) {
        for (var t = e.querySelectorAll("source"), i = t.length; i--;) e.removeChild(t[i]);

        e.removeAttribute("src"), "function" == typeof e.load && function () {
          try {
            e.load();
          } catch (e) {}
        }();
      }
    }, ["muted", "defaultMuted", "autoplay", "controls", "loop", "playsinline"].forEach(function (e) {
      Ln.prototype[e] = function () {
        return this.el_[e] || this.el_.hasAttribute(e);
      };
    }), ["muted", "defaultMuted", "autoplay", "loop", "playsinline"].forEach(function (t) {
      Ln.prototype["set" + lt(t)] = function (e) {
        (this.el_[t] = e) ? this.el_.setAttribute(t, t) : this.el_.removeAttribute(t);
      };
    }), ["paused", "currentTime", "buffered", "volume", "poster", "preload", "error", "seeking", "seekable", "ended", "playbackRate", "defaultPlaybackRate", "disablePictureInPicture", "played", "networkState", "readyState", "videoWidth", "videoHeight", "crossOrigin"].forEach(function (e) {
      Ln.prototype[e] = function () {
        return this.el_[e];
      };
    }), ["volume", "src", "poster", "preload", "playbackRate", "defaultPlaybackRate", "disablePictureInPicture", "crossOrigin"].forEach(function (t) {
      Ln.prototype["set" + lt(t)] = function (e) {
        this.el_[t] = e;
      };
    }), ["pause", "load", "play"].forEach(function (e) {
      Ln.prototype[e] = function () {
        return this.el_[e]();
      };
    }), Ui.withSourceHandlers(Ln), Ln.nativeSourceHandler = {}, Ln.nativeSourceHandler.canPlayType = function (e) {
      try {
        return Ln.TEST_VID.canPlayType(e);
      } catch (e) {
        return "";
      }
    }, Ln.nativeSourceHandler.canHandleSource = function (e, t) {
      if (e.type) return Ln.nativeSourceHandler.canPlayType(e.type);

      if (e.src) {
        e = Ut(e.src);
        return Ln.nativeSourceHandler.canPlayType("video/" + e);
      }

      return "";
    }, Ln.nativeSourceHandler.handleSource = function (e, t, i) {
      t.setSrc(e.src);
    }, Ln.nativeSourceHandler.dispose = function () {}, Ln.registerSourceHandler(Ln.nativeSourceHandler), Ui.registerTech("Html5", Ln);
    var Dn = ["progress", "abort", "suspend", "emptied", "stalled", "loadedmetadata", "loadeddata", "timeupdate", "resize", "volumechange", "texttrackchange"],
        On = {
      canplay: "CanPlay",
      canplaythrough: "CanPlayThrough",
      playing: "Playing",
      seeked: "Seeked"
    },
        Rn = ["tiny", "xsmall", "small", "medium", "large", "xlarge", "huge"],
        Mn = {};
    Rn.forEach(function (e) {
      var t = "x" === e.charAt(0) ? "x-" + e.substring(1) : e;
      Mn[e] = "vjs-layout-" + t;
    });

    var Nn = {
      tiny: 210,
      xsmall: 320,
      small: 425,
      medium: 768,
      large: 1440,
      xlarge: 2560,
      huge: 1 / 0
    },
        Un = function (c) {
      function o(e, t, i) {
        var n, r;
        if (e.id = e.id || t.id || "vjs_video_" + Le++, (t = T(o.getTagSettings(e), t)).initChildren = !1, t.createEl = !1, t.evented = !1, t.reportTouchActivity = !1, !t.language) if ("function" == typeof e.closest) {
          var a = e.closest("[lang]");
          a && a.getAttribute && (t.language = a.getAttribute("lang"));
        } else for (var s = e; s && 1 === s.nodeType;) {
          if (se(s).hasOwnProperty("lang")) {
            t.language = s.getAttribute("lang");
            break;
          }

          s = s.parentNode;
        }
        if ((n = c.call(this, null, t, i) || this).boundDocumentFullscreenChange_ = function (e) {
          return n.documentFullscreenChange_(e);
        }, n.boundFullWindowOnEscKey_ = function (e) {
          return n.fullWindowOnEscKey(e);
        }, n.boundUpdateStyleEl_ = function (e) {
          return n.updateStyleEl_(e);
        }, n.boundApplyInitTime_ = function (e) {
          return n.applyInitTime_(e);
        }, n.boundUpdateCurrentBreakpoint_ = function (e) {
          return n.updateCurrentBreakpoint_(e);
        }, n.boundHandleTechClick_ = function (e) {
          return n.handleTechClick_(e);
        }, n.boundHandleTechDoubleClick_ = function (e) {
          return n.handleTechDoubleClick_(e);
        }, n.boundHandleTechTouchStart_ = function (e) {
          return n.handleTechTouchStart_(e);
        }, n.boundHandleTechTouchMove_ = function (e) {
          return n.handleTechTouchMove_(e);
        }, n.boundHandleTechTouchEnd_ = function (e) {
          return n.handleTechTouchEnd_(e);
        }, n.boundHandleTechTap_ = function (e) {
          return n.handleTechTap_(e);
        }, n.isFullscreen_ = !1, n.log = m(n.id_), n.fsApi_ = l, n.isPosterFromTech_ = !1, n.queuedCallbacks_ = [], n.isReady_ = !1, n.hasStarted_ = !1, n.userActive_ = !1, n.debugEnabled_ = !1, !n.options_ || !n.options_.techOrder || !n.options_.techOrder.length) throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
        n.tag = e, n.tagAttributes = e && se(e), n.language(n.options_.language), t.languages ? (r = {}, Object.getOwnPropertyNames(t.languages).forEach(function (e) {
          r[e.toLowerCase()] = t.languages[e];
        }), n.languages_ = r) : n.languages_ = o.prototype.options_.languages, n.resetCache_(), n.poster_ = t.poster || "", n.controls_ = !!t.controls, e.controls = !1, e.removeAttribute("controls"), n.changingSrc_ = !1, n.playCallbacks_ = [], n.playTerminatedQueue_ = [], e.hasAttribute("autoplay") ? n.autoplay(!0) : n.autoplay(n.options_.autoplay), t.plugins && Object.keys(t.plugins).forEach(function (e) {
          if ("function" != typeof n[e]) throw new Error('plugin "' + e + '" does not exist');
        }), n.scrubbing_ = !1, n.el_ = n.createEl(), at(ft(n), {
          eventBusKey: "el_"
        }), n.fsApi_.requestFullscreen && (Fe(d, n.fsApi_.fullscreenchange, n.boundDocumentFullscreenChange_), n.on(n.fsApi_.fullscreenchange, n.boundDocumentFullscreenChange_)), n.fluid_ && n.on(["playerreset", "resize"], n.boundUpdateStyleEl_);
        i = ct(n.options_);
        t.plugins && Object.keys(t.plugins).forEach(function (e) {
          n[e](t.plugins[e]);
        }), t.debug && n.debug(!0), n.options_.playerOptions = i, n.middleware_ = [], n.playbackRates(t.playbackRates), n.initChildren(), n.isAudio("audio" === e.nodeName.toLowerCase()), n.controls() ? n.addClass("vjs-controls-enabled") : n.addClass("vjs-controls-disabled"), n.el_.setAttribute("role", "region"), n.isAudio() ? n.el_.setAttribute("aria-label", n.localize("Audio Player")) : n.el_.setAttribute("aria-label", n.localize("Video Player")), n.isAudio() && n.addClass("vjs-audio"), n.flexNotSupported_() && n.addClass("vjs-no-flex"), j && n.addClass("vjs-touch-enabled"), V || n.addClass("vjs-workinghover"), o.players[n.id_] = ft(n);
        e = u.split(".")[0];
        return n.addClass("vjs-v" + e), n.userActive(!0), n.reportUserActivity(), n.one("play", function (e) {
          return n.listenForUserActivity_(e);
        }), n.on("stageclick", function (e) {
          return n.handleStageClick_(e);
        }), n.on("keydown", function (e) {
          return n.handleKeyDown(e);
        }), n.on("languagechange", function (e) {
          return n.handleLanguagechange(e);
        }), n.breakpoints(n.options_.breakpoints), n.responsive(n.options_.responsive), n;
      }

      mt(o, c);
      var e = o.prototype;
      return e.dispose = function () {
        var t = this;
        this.trigger("dispose"), this.off("dispose"), je(d, this.fsApi_.fullscreenchange, this.boundDocumentFullscreenChange_), je(d, "keydown", this.boundFullWindowOnEscKey_), this.styleEl_ && this.styleEl_.parentNode && (this.styleEl_.parentNode.removeChild(this.styleEl_), this.styleEl_ = null), o.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.tech_ && (this.tech_.dispose(), this.isPosterFromTech_ = !1, this.poster_ = ""), this.playerElIngest_ && (this.playerElIngest_ = null), this.tag && (this.tag = null), Fi[this.id()] = null, si.names.forEach(function (e) {
          e = si[e], e = t[e.getterName]();
          e && e.off && e.off();
        }), c.prototype.dispose.call(this);
      }, e.createEl = function () {
        var t,
            i = this.tag,
            e = this.playerElIngest_ = i.parentNode && i.parentNode.hasAttribute && i.parentNode.hasAttribute("data-vjs-player"),
            n = "video-js" === this.tag.tagName.toLowerCase();
        e ? t = this.el_ = i.parentNode : n || (t = this.el_ = c.prototype.createEl.call(this, "div"));
        var r,
            a,
            s = se(i);

        if (n) {
          for (t = this.el_ = i, i = this.tag = d.createElement("video"); t.children.length;) i.appendChild(t.firstChild);

          te(t, "video-js") || ie(t, "video-js"), t.appendChild(i), e = this.playerElIngest_ = t, Object.keys(t).forEach(function (e) {
            try {
              i[e] = t[e];
            } catch (e) {}
          });
        }

        i.setAttribute("tabindex", "-1"), s.tabindex = "-1", (U || M && F) && (i.setAttribute("role", "application"), s.role = "application"), i.removeAttribute("width"), i.removeAttribute("height"), "width" in s && delete s.width, "height" in s && delete s.height, Object.getOwnPropertyNames(s).forEach(function (e) {
          n && "class" === e || t.setAttribute(e, s[e]), n && i.setAttribute(e, s[e]);
        }), i.playerId = i.id, i.id += "_html5_api", i.className = "vjs-tech", (i.player = t.player = this).addClass("vjs-paused"), !0 !== _.VIDEOJS_NO_DYNAMIC_STYLE && (this.styleEl_ = Ae("vjs-styles-dimensions"), r = Se(".vjs-styles-defaults"), (a = Se("head")).insertBefore(this.styleEl_, r ? r.nextSibling : a.firstChild)), this.fill_ = !1, this.fluid_ = !1, this.width(this.options_.width), this.height(this.options_.height), this.fill(this.options_.fill), this.fluid(this.options_.fluid), this.aspectRatio(this.options_.aspectRatio), this.crossOrigin(this.options_.crossOrigin || this.options_.crossorigin);

        for (var o = i.getElementsByTagName("a"), u = 0; u < o.length; u++) {
          var l = o.item(u);
          ie(l, "vjs-hidden"), l.setAttribute("hidden", "hidden");
        }

        return i.initNetworkState_ = i.networkState, i.parentNode && !e && i.parentNode.insertBefore(t, i), ee(i, t), this.children_.unshift(i), this.el_.setAttribute("lang", this.language_), this.el_ = t;
      }, e.crossOrigin = function (e) {
        if (!e) return this.techGet_("crossOrigin");
        "anonymous" === e || "use-credentials" === e ? this.techCall_("setCrossOrigin", e) : f.warn('crossOrigin must be "anonymous" or "use-credentials", given "' + e + '"');
      }, e.width = function (e) {
        return this.dimension("width", e);
      }, e.height = function (e) {
        return this.dimension("height", e);
      }, e.dimension = function (e, t) {
        var i = e + "_";
        if (void 0 === t) return this[i] || 0;
        if ("" === t || "auto" === t) return this[i] = void 0, void this.updateStyleEl_();
        var n = parseFloat(t);
        isNaN(n) ? f.error('Improper value "' + t + '" supplied for for ' + e) : (this[i] = n, this.updateStyleEl_());
      }, e.fluid = function (e) {
        var t,
            i = this;
        if (void 0 === e) return !!this.fluid_;
        this.fluid_ = !!e, nt(this) && this.off(["playerreset", "resize"], this.boundUpdateStyleEl_), e ? (this.addClass("vjs-fluid"), this.fill(!1), t = function () {
          i.on(["playerreset", "resize"], i.boundUpdateStyleEl_);
        }, nt(e = this) ? t() : (e.eventedCallbacks || (e.eventedCallbacks = []), e.eventedCallbacks.push(t))) : this.removeClass("vjs-fluid"), this.updateStyleEl_();
      }, e.fill = function (e) {
        if (void 0 === e) return !!this.fill_;
        this.fill_ = !!e, e ? (this.addClass("vjs-fill"), this.fluid(!1)) : this.removeClass("vjs-fill");
      }, e.aspectRatio = function (e) {
        if (void 0 === e) return this.aspectRatio_;
        if (!/^\d+\:\d+$/.test(e)) throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");
        this.aspectRatio_ = e, this.fluid(!0), this.updateStyleEl_();
      }, e.updateStyleEl_ = function () {
        var e, t, i, n;
        !0 !== _.VIDEOJS_NO_DYNAMIC_STYLE ? (n = (i = (void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : 0 < this.videoWidth() ? this.videoWidth() + ":" + this.videoHeight() : "16:9").split(":"))[1] / i[0], e = void 0 !== this.width_ ? this.width_ : void 0 !== this.height_ ? this.height_ / n : this.videoWidth() || 300, t = void 0 !== this.height_ ? this.height_ : e * n, i = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions", this.addClass(i), Pe(this.styleEl_, "\n      ." + i + " {\n        width: " + e + "px;\n        height: " + t + "px;\n      }\n\n      ." + i + ".vjs-fluid {\n        padding-top: " + 100 * n + "%;\n      }\n    ")) : (t = "number" == typeof this.width_ ? this.width_ : this.options_.width, i = "number" == typeof this.height_ ? this.height_ : this.options_.height, (n = this.tech_ && this.tech_.el()) && (0 <= t && (n.width = t), 0 <= i && (n.height = i)));
      }, e.loadTech_ = function (e, t) {
        var i = this;
        this.tech_ && this.unloadTech_();
        var n = lt(e),
            r = e.charAt(0).toLowerCase() + e.slice(1);
        "Html5" !== n && this.tag && (Ui.getTech("Html5").disposeMediaElement(this.tag), this.tag.player = null, this.tag = null), this.techName_ = n, this.isReady_ = !1;
        var a = this.autoplay(),
            s = {
          source: t,
          autoplay: a = "string" == typeof this.autoplay() || !0 === this.autoplay() && this.options_.normalizeAutoplay ? !1 : a,
          nativeControlsForTouch: this.options_.nativeControlsForTouch,
          playerId: this.id(),
          techId: this.id() + "_" + r + "_api",
          playsinline: this.options_.playsinline,
          preload: this.options_.preload,
          loop: this.options_.loop,
          disablePictureInPicture: this.options_.disablePictureInPicture,
          muted: this.options_.muted,
          poster: this.poster(),
          language: this.language(),
          playerElIngest: this.playerElIngest_ || !1,
          "vtt.js": this.options_["vtt.js"],
          canOverridePoster: !!this.options_.techCanOverridePoster,
          enableSourceset: this.options_.enableSourceset,
          Promise: this.options_.Promise
        };
        si.names.forEach(function (e) {
          e = si[e];
          s[e.getterName] = i[e.privateName];
        }), T(s, this.options_[n]), T(s, this.options_[r]), T(s, this.options_[e.toLowerCase()]), this.tag && (s.tag = this.tag), t && t.src === this.cache_.src && 0 < this.cache_.currentTime && (s.startTime = this.cache_.currentTime);
        e = Ui.getTech(e);
        if (!e) throw new Error("No Tech named '" + n + "' exists! '" + n + "' should be registered using videojs.registerTech()'");
        this.tech_ = new e(s), this.tech_.ready(We(this, this.handleTechReady_), !0), It(this.textTracksJson_ || [], this.tech_), Dn.forEach(function (t) {
          i.on(i.tech_, t, function (e) {
            return i["handleTech" + lt(t) + "_"](e);
          });
        }), Object.keys(On).forEach(function (t) {
          i.on(i.tech_, t, function (e) {
            0 === i.tech_.playbackRate() && i.tech_.seeking() ? i.queuedCallbacks_.push({
              callback: i["handleTech" + On[t] + "_"].bind(i),
              event: e
            }) : i["handleTech" + On[t] + "_"](e);
          });
        }), this.on(this.tech_, "loadstart", function (e) {
          return i.handleTechLoadStart_(e);
        }), this.on(this.tech_, "sourceset", function (e) {
          return i.handleTechSourceset_(e);
        }), this.on(this.tech_, "waiting", function (e) {
          return i.handleTechWaiting_(e);
        }), this.on(this.tech_, "ended", function (e) {
          return i.handleTechEnded_(e);
        }), this.on(this.tech_, "seeking", function (e) {
          return i.handleTechSeeking_(e);
        }), this.on(this.tech_, "play", function (e) {
          return i.handleTechPlay_(e);
        }), this.on(this.tech_, "firstplay", function (e) {
          return i.handleTechFirstPlay_(e);
        }), this.on(this.tech_, "pause", function (e) {
          return i.handleTechPause_(e);
        }), this.on(this.tech_, "durationchange", function (e) {
          return i.handleTechDurationChange_(e);
        }), this.on(this.tech_, "fullscreenchange", function (e, t) {
          return i.handleTechFullscreenChange_(e, t);
        }), this.on(this.tech_, "fullscreenerror", function (e, t) {
          return i.handleTechFullscreenError_(e, t);
        }), this.on(this.tech_, "enterpictureinpicture", function (e) {
          return i.handleTechEnterPictureInPicture_(e);
        }), this.on(this.tech_, "leavepictureinpicture", function (e) {
          return i.handleTechLeavePictureInPicture_(e);
        }), this.on(this.tech_, "error", function (e) {
          return i.handleTechError_(e);
        }), this.on(this.tech_, "posterchange", function (e) {
          return i.handleTechPosterChange_(e);
        }), this.on(this.tech_, "textdata", function (e) {
          return i.handleTechTextData_(e);
        }), this.on(this.tech_, "ratechange", function (e) {
          return i.handleTechRateChange_(e);
        }), this.on(this.tech_, "loadedmetadata", this.boundUpdateStyleEl_), this.usingNativeControls(this.techGet_("controls")), this.controls() && !this.usingNativeControls() && this.addTechControlsListeners_(), this.tech_.el().parentNode === this.el() || "Html5" === n && this.tag || ee(this.tech_.el(), this.el()), this.tag && (this.tag.player = null, this.tag = null);
      }, e.unloadTech_ = function () {
        var t = this;
        si.names.forEach(function (e) {
          e = si[e];
          t[e.privateName] = t[e.getterName]();
        }), this.textTracksJson_ = wt(this.tech_), this.isReady_ = !1, this.tech_.dispose(), this.tech_ = !1, this.isPosterFromTech_ && (this.poster_ = "", this.trigger("posterchange")), this.isPosterFromTech_ = !1;
      }, e.tech = function (e) {
        return void 0 === e && f.warn("Using the tech directly can be dangerous. I hope you know what you're doing.\nSee https://github.com/videojs/video.js/issues/2617 for more info.\n"), this.tech_;
      }, e.addTechControlsListeners_ = function () {
        this.removeTechControlsListeners_(), this.on(this.tech_, "mouseup", this.boundHandleTechClick_), this.on(this.tech_, "dblclick", this.boundHandleTechDoubleClick_), this.on(this.tech_, "touchstart", this.boundHandleTechTouchStart_), this.on(this.tech_, "touchmove", this.boundHandleTechTouchMove_), this.on(this.tech_, "touchend", this.boundHandleTechTouchEnd_), this.on(this.tech_, "tap", this.boundHandleTechTap_);
      }, e.removeTechControlsListeners_ = function () {
        this.off(this.tech_, "tap", this.boundHandleTechTap_), this.off(this.tech_, "touchstart", this.boundHandleTechTouchStart_), this.off(this.tech_, "touchmove", this.boundHandleTechTouchMove_), this.off(this.tech_, "touchend", this.boundHandleTechTouchEnd_), this.off(this.tech_, "mouseup", this.boundHandleTechClick_), this.off(this.tech_, "dblclick", this.boundHandleTechDoubleClick_);
      }, e.handleTechReady_ = function () {
        this.triggerReady(), this.cache_.volume && this.techCall_("setVolume", this.cache_.volume), this.handleTechPosterChange_(), this.handleTechDurationChange_();
      }, e.handleTechLoadStart_ = function () {
        this.removeClass("vjs-ended"), this.removeClass("vjs-seeking"), this.error(null), this.handleTechDurationChange_(), this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay")), this.manualAutoplay_(!0 === this.autoplay() && this.options_.normalizeAutoplay ? "play" : this.autoplay());
      }, e.manualAutoplay_ = function (e) {
        var n = this;

        if (this.tech_ && "string" == typeof e) {
          var t,
              i = function () {
            var e = n.muted();
            n.muted(!0);

            function t() {
              n.muted(e);
            }

            n.playTerminatedQueue_.push(t);
            var i = n.play();
            if (Et(i)) return i.catch(function (e) {
              throw t(), new Error("Rejection at manualAutoplay. Restoring muted value. " + (e || ""));
            });
          };

          if ("any" !== e || this.muted() ? t = "muted" !== e || this.muted() ? this.play() : i() : Et(t = this.play()) && (t = t.catch(i)), Et(t)) return t.then(function () {
            n.trigger({
              type: "autoplay-success",
              autoplay: e
            });
          }).catch(function () {
            n.trigger({
              type: "autoplay-failure",
              autoplay: e
            });
          });
        }
      }, e.updateSourceCaches_ = function (e) {
        var t = e = void 0 === e ? "" : e,
            i = "";
        "string" != typeof t && (t = e.src, i = e.type), this.cache_.source = this.cache_.source || {}, this.cache_.sources = this.cache_.sources || [], t && !i && (i = function (e, t) {
          if (!t) return "";
          if (e.cache_.source.src === t && e.cache_.source.type) return e.cache_.source.type;
          var i = e.cache_.sources.filter(function (e) {
            return e.src === t;
          });
          if (i.length) return i[0].type;

          for (var n = e.$$("source"), r = 0; r < n.length; r++) {
            var a = n[r];
            if (a.type && a.src && a.src === t) return a.type;
          }

          return Ki(t);
        }(this, t)), this.cache_.source = ct({}, e, {
          src: t,
          type: i
        });

        for (var i = this.cache_.sources.filter(function (e) {
          return e.src && e.src === t;
        }), n = [], r = this.$$("source"), a = [], s = 0; s < r.length; s++) {
          var o = se(r[s]);
          n.push(o), o.src && o.src === t && a.push(o.src);
        }

        a.length && !i.length ? this.cache_.sources = n : i.length || (this.cache_.sources = [this.cache_.source]), this.cache_.src = t;
      }, e.handleTechSourceset_ = function (e) {
        var t,
            i,
            n,
            r = this;
        this.changingSrc_ || (t = function (e) {
          return r.updateSourceCaches_(e);
        }, i = this.currentSource().src, n = e.src, i && !/^blob:/.test(i) && /^blob:/.test(n) && (this.lastSource_ && (this.lastSource_.tech === n || this.lastSource_.player === i) || (t = function () {})), t(n), e.src || this.tech_.any(["sourceset", "loadstart"], function (e) {
          "sourceset" !== e.type && (e = r.techGet("currentSrc"), r.lastSource_.tech = e, r.updateSourceCaches_(e));
        })), this.lastSource_ = {
          player: this.currentSource().src,
          tech: e.src
        }, this.trigger({
          src: e.src,
          type: "sourceset"
        });
      }, e.hasStarted = function (e) {
        if (void 0 === e) return this.hasStarted_;
        e !== this.hasStarted_ && (this.hasStarted_ = e, this.hasStarted_ ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started"));
      }, e.handleTechPlay_ = function () {
        this.removeClass("vjs-ended"), this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.hasStarted(!0), this.trigger("play");
      }, e.handleTechRateChange_ = function () {
        0 < this.tech_.playbackRate() && 0 === this.cache_.lastPlaybackRate && (this.queuedCallbacks_.forEach(function (e) {
          return e.callback(e.event);
        }), this.queuedCallbacks_ = []), this.cache_.lastPlaybackRate = this.tech_.playbackRate(), this.trigger("ratechange");
      }, e.handleTechWaiting_ = function () {
        var t = this;
        this.addClass("vjs-waiting"), this.trigger("waiting");
        var i = this.currentTime();
        this.on("timeupdate", function e() {
          i !== t.currentTime() && (t.removeClass("vjs-waiting"), t.off("timeupdate", e));
        });
      }, e.handleTechCanPlay_ = function () {
        this.removeClass("vjs-waiting"), this.trigger("canplay");
      }, e.handleTechCanPlayThrough_ = function () {
        this.removeClass("vjs-waiting"), this.trigger("canplaythrough");
      }, e.handleTechPlaying_ = function () {
        this.removeClass("vjs-waiting"), this.trigger("playing");
      }, e.handleTechSeeking_ = function () {
        this.addClass("vjs-seeking"), this.trigger("seeking");
      }, e.handleTechSeeked_ = function () {
        this.removeClass("vjs-seeking"), this.removeClass("vjs-ended"), this.trigger("seeked");
      }, e.handleTechFirstPlay_ = function () {
        this.options_.starttime && (f.warn("Passing the `starttime` option to the player will be deprecated in 6.0"), this.currentTime(this.options_.starttime)), this.addClass("vjs-has-started"), this.trigger("firstplay");
      }, e.handleTechPause_ = function () {
        this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.trigger("pause");
      }, e.handleTechEnded_ = function () {
        this.addClass("vjs-ended"), this.removeClass("vjs-waiting"), this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause(), this.trigger("ended");
      }, e.handleTechDurationChange_ = function () {
        this.duration(this.techGet_("duration"));
      }, e.handleTechClick_ = function (e) {
        be(e) && this.controls_ && (this.paused() ? kt(this.play()) : this.pause());
      }, e.handleTechDoubleClick_ = function (t) {
        this.controls_ && (Array.prototype.some.call(this.$$(".vjs-control-bar, .vjs-modal-dialog"), function (e) {
          return e.contains(t.target);
        }) || void 0 !== this.options_ && void 0 !== this.options_.userActions && void 0 !== this.options_.userActions.doubleClick && !1 === this.options_.userActions.doubleClick || (void 0 !== this.options_ && void 0 !== this.options_.userActions && "function" == typeof this.options_.userActions.doubleClick ? this.options_.userActions.doubleClick.call(this, t) : this.isFullscreen() ? this.exitFullscreen() : this.requestFullscreen()));
      }, e.handleTechTap_ = function () {
        this.userActive(!this.userActive());
      }, e.handleTechTouchStart_ = function () {
        this.userWasActive = this.userActive();
      }, e.handleTechTouchMove_ = function () {
        this.userWasActive && this.reportUserActivity();
      }, e.handleTechTouchEnd_ = function (e) {
        e.cancelable && e.preventDefault();
      }, e.handleStageClick_ = function () {
        this.reportUserActivity();
      }, e.toggleFullscreenClass_ = function () {
        this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen");
      }, e.documentFullscreenChange_ = function (e) {
        var t = e.target.player;
        t && t !== this || (e = this.el(), !(t = d[this.fsApi_.fullscreenElement] === e) && e.matches ? t = e.matches(":" + this.fsApi_.fullscreen) : !t && e.msMatchesSelector && (t = e.msMatchesSelector(":" + this.fsApi_.fullscreen)), this.isFullscreen(t));
      }, e.handleTechFullscreenChange_ = function (e, t) {
        t && (t.nativeIOSFullscreen && this.toggleClass("vjs-ios-native-fs"), this.isFullscreen(t.isFullscreen));
      }, e.handleTechFullscreenError_ = function (e, t) {
        this.trigger("fullscreenerror", t);
      }, e.togglePictureInPictureClass_ = function () {
        this.isInPictureInPicture() ? this.addClass("vjs-picture-in-picture") : this.removeClass("vjs-picture-in-picture");
      }, e.handleTechEnterPictureInPicture_ = function (e) {
        this.isInPictureInPicture(!0);
      }, e.handleTechLeavePictureInPicture_ = function (e) {
        this.isInPictureInPicture(!1);
      }, e.handleTechError_ = function () {
        var e = this.tech_.error();
        this.error(e);
      }, e.handleTechTextData_ = function () {
        this.trigger("textdata", 1 < arguments.length ? arguments[1] : null);
      }, e.getCache = function () {
        return this.cache_;
      }, e.resetCache_ = function () {
        this.cache_ = {
          currentTime: 0,
          initTime: 0,
          inactivityTimeout: this.options_.inactivityTimeout,
          duration: NaN,
          lastVolume: 1,
          lastPlaybackRate: this.defaultPlaybackRate(),
          media: null,
          src: "",
          source: {},
          sources: [],
          playbackRates: [],
          volume: 1
        };
      }, e.techCall_ = function (n, r) {
        this.ready(function () {
          if (n in Wi) return e = this.middleware_, t = this.tech_, i = r, t[t = n](e.reduce(Gi(t), i));
          if (n in zi) return qi(this.middleware_, this.tech_, n, r);
          var e, t, i;

          try {
            this.tech_ && this.tech_[n](r);
          } catch (e) {
            throw f(e), e;
          }
        }, !0);
      }, e.techGet_ = function (t) {
        if (this.tech_ && this.tech_.isReady_) {
          if (t in Vi) return e = this.middleware_, i = this.tech_, n = t, e.reduceRight(Gi(n), i[n]());
          if (t in zi) return qi(this.middleware_, this.tech_, t);
          var e, i, n;

          try {
            return this.tech_[t]();
          } catch (e) {
            if (void 0 === this.tech_[t]) throw f("Video.js: " + t + " method not defined for " + this.techName_ + " playback technology.", e), e;
            if ("TypeError" === e.name) throw f("Video.js: " + t + " unavailable on " + this.techName_ + " playback technology element.", e), this.tech_.isReady_ = !1, e;
            throw f(e), e;
          }
        }
      }, e.play = function () {
        var t = this,
            e = this.options_.Promise || _.Promise;
        return e ? new e(function (e) {
          t.play_(e);
        }) : this.play_();
      }, e.play_ = function (e) {
        var t = this;
        this.playCallbacks_.push(e = void 0 === e ? kt : e);
        e = Boolean(!this.changingSrc_ && (this.src() || this.currentSrc()));
        if (this.waitToPlay_ && (this.off(["ready", "loadstart"], this.waitToPlay_), this.waitToPlay_ = null), !this.isReady_ || !e) return this.waitToPlay_ = function (e) {
          t.play_();
        }, this.one(["ready", "loadstart"], this.waitToPlay_), void (e || !W && !V || this.load());
        e = this.techGet_("play");
        null === e ? this.runPlayTerminatedQueue_() : this.runPlayCallbacks_(e);
      }, e.runPlayTerminatedQueue_ = function () {
        var e = this.playTerminatedQueue_.slice(0);
        this.playTerminatedQueue_ = [], e.forEach(function (e) {
          e();
        });
      }, e.runPlayCallbacks_ = function (t) {
        var e = this.playCallbacks_.slice(0);
        this.playCallbacks_ = [], this.playTerminatedQueue_ = [], e.forEach(function (e) {
          e(t);
        });
      }, e.pause = function () {
        this.techCall_("pause");
      }, e.paused = function () {
        return !1 !== this.techGet_("paused");
      }, e.played = function () {
        return this.techGet_("played") || vt(0, 0);
      }, e.scrubbing = function (e) {
        if ("undefined" == typeof e) return this.scrubbing_;
        this.scrubbing_ = !!e, this.techCall_("setScrubbing", this.scrubbing_), e ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing");
      }, e.currentTime = function (e) {
        return "undefined" != typeof e ? (e < 0 && (e = 0), this.isReady_ && !this.changingSrc_ && this.tech_ && this.tech_.isReady_ ? (this.techCall_("setCurrentTime", e), void (this.cache_.initTime = 0)) : (this.cache_.initTime = e, this.off("canplay", this.boundApplyInitTime_), void this.one("canplay", this.boundApplyInitTime_))) : (this.cache_.currentTime = this.techGet_("currentTime") || 0, this.cache_.currentTime);
      }, e.applyInitTime_ = function () {
        this.currentTime(this.cache_.initTime);
      }, e.duration = function (e) {
        if (void 0 === e) return void 0 !== this.cache_.duration ? this.cache_.duration : NaN;
        (e = (e = parseFloat(e)) < 0 ? 1 / 0 : e) !== this.cache_.duration && ((this.cache_.duration = e) === 1 / 0 ? this.addClass("vjs-live") : this.removeClass("vjs-live"), isNaN(e) || this.trigger("durationchange"));
      }, e.remainingTime = function () {
        return this.duration() - this.currentTime();
      }, e.remainingTimeDisplay = function () {
        return Math.floor(this.duration()) - Math.floor(this.currentTime());
      }, e.buffered = function () {
        var e;
        return e = !(e = this.techGet_("buffered")) || !e.length ? vt(0, 0) : e;
      }, e.bufferedPercent = function () {
        return _t(this.buffered(), this.duration());
      }, e.bufferedEnd = function () {
        var e = this.buffered(),
            t = this.duration(),
            e = e.end(e.length - 1);
        return e = t < e ? t : e;
      }, e.volume = function (e) {
        var t;
        return void 0 !== e ? (t = Math.max(0, Math.min(1, parseFloat(e))), this.cache_.volume = t, this.techCall_("setVolume", t), void (0 < t && this.lastVolume_(t))) : (t = parseFloat(this.techGet_("volume")), isNaN(t) ? 1 : t);
      }, e.muted = function (e) {
        if (void 0 === e) return this.techGet_("muted") || !1;
        this.techCall_("setMuted", e);
      }, e.defaultMuted = function (e) {
        return void 0 !== e ? this.techCall_("setDefaultMuted", e) : this.techGet_("defaultMuted") || !1;
      }, e.lastVolume_ = function (e) {
        if (void 0 === e || 0 === e) return this.cache_.lastVolume;
        this.cache_.lastVolume = e;
      }, e.supportsFullScreen = function () {
        return this.techGet_("supportsFullScreen") || !1;
      }, e.isFullscreen = function (e) {
        if (void 0 === e) return this.isFullscreen_;
        var t = this.isFullscreen_;
        this.isFullscreen_ = Boolean(e), this.isFullscreen_ !== t && this.fsApi_.prefixed && this.trigger("fullscreenchange"), this.toggleFullscreenClass_();
      }, e.requestFullscreen = function (s) {
        var e = this.options_.Promise || _.Promise;

        if (e) {
          var o = this;
          return new e(function (e, i) {
            function n() {
              o.off("fullscreenerror", r), o.off("fullscreenchange", t);
            }

            function t() {
              n(), e();
            }

            function r(e, t) {
              n(), i(t);
            }

            o.one("fullscreenchange", t), o.one("fullscreenerror", r);
            var a = o.requestFullscreenHelper_(s);
            a && (a.then(n, n), a.then(e, i));
          });
        }

        return this.requestFullscreenHelper_();
      }, e.requestFullscreenHelper_ = function (e) {
        var t = this;

        if (this.fsApi_.prefixed || (i = this.options_.fullscreen && this.options_.fullscreen.options || {}, void 0 !== e && (i = e)), this.fsApi_.requestFullscreen) {
          var i = this.el_[this.fsApi_.requestFullscreen](i);
          return i && i.then(function () {
            return t.isFullscreen(!0);
          }, function () {
            return t.isFullscreen(!1);
          }), i;
        }

        this.tech_.supportsFullScreen() && !0 == !this.options_.preferFullWindow ? this.techCall_("enterFullScreen") : this.enterFullWindow();
      }, e.exitFullscreen = function () {
        var e = this.options_.Promise || _.Promise;

        if (e) {
          var s = this;
          return new e(function (e, i) {
            function n() {
              s.off("fullscreenerror", r), s.off("fullscreenchange", t);
            }

            function t() {
              n(), e();
            }

            function r(e, t) {
              n(), i(t);
            }

            s.one("fullscreenchange", t), s.one("fullscreenerror", r);
            var a = s.exitFullscreenHelper_();
            a && (a.then(n, n), a.then(e, i));
          });
        }

        return this.exitFullscreenHelper_();
      }, e.exitFullscreenHelper_ = function () {
        var e = this;

        if (this.fsApi_.requestFullscreen) {
          var t = d[this.fsApi_.exitFullscreen]();
          return t && kt(t.then(function () {
            return e.isFullscreen(!1);
          })), t;
        }

        this.tech_.supportsFullScreen() && !0 == !this.options_.preferFullWindow ? this.techCall_("exitFullScreen") : this.exitFullWindow();
      }, e.enterFullWindow = function () {
        this.isFullscreen(!0), this.isFullWindow = !0, this.docOrigOverflow = d.documentElement.style.overflow, Fe(d, "keydown", this.boundFullWindowOnEscKey_), d.documentElement.style.overflow = "hidden", ie(d.body, "vjs-full-window"), this.trigger("enterFullWindow");
      }, e.fullWindowOnEscKey = function (e) {
        xt.isEventKey(e, "Esc") && !0 === this.isFullscreen() && (this.isFullWindow ? this.exitFullWindow() : this.exitFullscreen());
      }, e.exitFullWindow = function () {
        this.isFullscreen(!1), this.isFullWindow = !1, je(d, "keydown", this.boundFullWindowOnEscKey_), d.documentElement.style.overflow = this.docOrigOverflow, ne(d.body, "vjs-full-window"), this.trigger("exitFullWindow");
      }, e.disablePictureInPicture = function (e) {
        if (void 0 === e) return this.techGet_("disablePictureInPicture");
        this.techCall_("setDisablePictureInPicture", e), this.options_.disablePictureInPicture = e, this.trigger("disablepictureinpicturechanged");
      }, e.isInPictureInPicture = function (e) {
        return void 0 !== e ? (this.isInPictureInPicture_ = !!e, void this.togglePictureInPictureClass_()) : !!this.isInPictureInPicture_;
      }, e.requestPictureInPicture = function () {
        if ("pictureInPictureEnabled" in d && !1 === this.disablePictureInPicture()) return this.techGet_("requestPictureInPicture");
      }, e.exitPictureInPicture = function () {
        if ("pictureInPictureEnabled" in d) return d.exitPictureInPicture();
      }, e.handleKeyDown = function (e) {
        var t = this.options_.userActions;
        t && t.hotkeys && (function (e) {
          var t = e.tagName.toLowerCase();
          if (e.isContentEditable) return !0;
          if ("input" === t) return -1 === ["button", "checkbox", "hidden", "radio", "reset", "submit"].indexOf(e.type);
          return -1 !== ["textarea"].indexOf(t);
        }(this.el_.ownerDocument.activeElement) || ("function" == typeof t.hotkeys ? t.hotkeys.call(this, e) : this.handleHotkeys(e)));
      }, e.handleHotkeys = function (e) {
        var t = this.options_.userActions ? this.options_.userActions.hotkeys : {},
            i = t.fullscreenKey,
            n = t.muteKey,
            n = void 0 === n ? function (e) {
          return xt.isEventKey(e, "m");
        } : n,
            t = t.playPauseKey,
            t = void 0 === t ? function (e) {
          return xt.isEventKey(e, "k") || xt.isEventKey(e, "Space");
        } : t;
        (void 0 === i ? function (e) {
          return xt.isEventKey(e, "f");
        } : i).call(this, e) ? (e.preventDefault(), e.stopPropagation(), i = pt.getComponent("FullscreenToggle"), !1 !== d[this.fsApi_.fullscreenEnabled] && i.prototype.handleClick.call(this, e)) : n.call(this, e) ? (e.preventDefault(), e.stopPropagation(), pt.getComponent("MuteToggle").prototype.handleClick.call(this, e)) : t.call(this, e) && (e.preventDefault(), e.stopPropagation(), pt.getComponent("PlayToggle").prototype.handleClick.call(this, e));
      }, e.canPlayType = function (e) {
        for (var t, i = 0, n = this.options_.techOrder; i < n.length; i++) {
          var r = n[i],
              a = Ui.getTech(r);

          if (a = a || pt.getComponent(r)) {
            if (a.isSupported() && (t = a.canPlayType(e))) return t;
          } else f.error('The "' + r + '" tech is undefined. Skipped browser support check for that tech.');
        }

        return "";
      }, e.selectSource = function (e) {
        function t(e, i, n) {
          var r;
          return e.some(function (t) {
            return i.some(function (e) {
              if (r = n(t, e)) return !0;
            });
          }), r;
        }

        var i,
            n = this,
            r = this.options_.techOrder.map(function (e) {
          return [e, Ui.getTech(e)];
        }).filter(function (e) {
          var t = e[0],
              e = e[1];
          return e ? e.isSupported() : (f.error('The "' + t + '" tech is undefined. Skipped browser support check for that tech.'), !1);
        }),
            a = function (e, t) {
          var i = e[0];
          if (e[1].canPlaySource(t, n.options_[i.toLowerCase()])) return {
            source: t,
            tech: i
          };
        },
            a = this.options_.sourceOrder ? t(e, r, (i = a, function (e, t) {
          return i(t, e);
        })) : t(r, e, a);

        return a || !1;
      }, e.handleSrc_ = function (e, n) {
        var r = this;
        if ("undefined" == typeof e) return this.cache_.src || "";
        this.resetRetryOnError_ && this.resetRetryOnError_();
        var t,
            i,
            a = Yi(e);
        a.length ? (this.changingSrc_ = !0, n || (this.cache_.sources = a), this.updateSourceCaches_(a[0]), Hi(this, a[0], function (e, t) {
          var i;
          return r.middleware_ = t, n || (r.cache_.sources = a), r.updateSourceCaches_(e), r.src_(e) ? 1 < a.length ? r.handleSrc_(a.slice(1)) : (r.changingSrc_ = !1, r.setTimeout(function () {
            this.error({
              code: 4,
              message: this.localize(this.options_.notSupportedMessage)
            });
          }, 0), void r.triggerReady()) : (t = t, i = r.tech_, void t.forEach(function (e) {
            return e.setTech && e.setTech(i);
          }));
        }), this.options_.retryOnError && 1 < a.length && (i = function () {
          r.off("error", t);
        }, this.one("error", t = function () {
          r.error(null), r.handleSrc_(a.slice(1), !0);
        }), this.one("playing", i), this.resetRetryOnError_ = function () {
          r.off("error", t), r.off("playing", i);
        })) : this.setTimeout(function () {
          this.error({
            code: 4,
            message: this.localize(this.options_.notSupportedMessage)
          });
        }, 0);
      }, e.src = function (e) {
        return this.handleSrc_(e, !1);
      }, e.src_ = function (e) {
        var t,
            i,
            n = this,
            r = this.selectSource([e]);
        return !r || (t = r.tech, i = this.techName_, lt(t) !== lt(i) ? (this.changingSrc_ = !0, this.loadTech_(r.tech, r.source), this.tech_.ready(function () {
          n.changingSrc_ = !1;
        })) : this.ready(function () {
          this.tech_.constructor.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", e) : this.techCall_("src", e.src), this.changingSrc_ = !1;
        }, !0), !1);
      }, e.load = function () {
        this.techCall_("load");
      }, e.reset = function () {
        var e = this,
            t = this.options_.Promise || _.Promise;
        this.paused() || !t ? this.doReset_() : kt(this.play().then(function () {
          return e.doReset_();
        }));
      }, e.doReset_ = function () {
        this.tech_ && this.tech_.clearTracks("text"), this.resetCache_(), this.poster(""), this.loadTech_(this.options_.techOrder[0], null), this.techCall_("reset"), this.resetControlBarUI_(), nt(this) && this.trigger("playerreset");
      }, e.resetControlBarUI_ = function () {
        this.resetProgressBar_(), this.resetPlaybackRate_(), this.resetVolumeBar_();
      }, e.resetProgressBar_ = function () {
        this.currentTime(0);
        var e = this.controlBar,
            t = e.durationDisplay,
            e = e.remainingTimeDisplay;
        t && t.updateContent(), e && e.updateContent();
      }, e.resetPlaybackRate_ = function () {
        this.playbackRate(this.defaultPlaybackRate()), this.handleTechRateChange_();
      }, e.resetVolumeBar_ = function () {
        this.volume(1), this.trigger("volumechange");
      }, e.currentSources = function () {
        var e = this.currentSource(),
            t = [];
        return 0 !== Object.keys(e).length && t.push(e), this.cache_.sources || t;
      }, e.currentSource = function () {
        return this.cache_.source || {};
      }, e.currentSrc = function () {
        return this.currentSource() && this.currentSource().src || "";
      }, e.currentType = function () {
        return this.currentSource() && this.currentSource().type || "";
      }, e.preload = function (e) {
        return void 0 !== e ? (this.techCall_("setPreload", e), void (this.options_.preload = e)) : this.techGet_("preload");
      }, e.autoplay = function (e) {
        if (void 0 === e) return this.options_.autoplay || !1;
        var t;
        "string" == typeof e && /(any|play|muted)/.test(e) || !0 === e && this.options_.normalizeAutoplay ? (this.options_.autoplay = e, this.manualAutoplay_("string" == typeof e ? e : "play"), t = !1) : this.options_.autoplay = !!e, t = "undefined" == typeof t ? this.options_.autoplay : t, this.tech_ && this.techCall_("setAutoplay", t);
      }, e.playsinline = function (e) {
        return void 0 !== e ? (this.techCall_("setPlaysinline", e), this.options_.playsinline = e, this) : this.techGet_("playsinline");
      }, e.loop = function (e) {
        return void 0 !== e ? (this.techCall_("setLoop", e), void (this.options_.loop = e)) : this.techGet_("loop");
      }, e.poster = function (e) {
        if (void 0 === e) return this.poster_;
        (e = e || "") !== this.poster_ && (this.poster_ = e, this.techCall_("setPoster", e), this.isPosterFromTech_ = !1, this.trigger("posterchange"));
      }, e.handleTechPosterChange_ = function () {
        var e;
        this.poster_ && !this.options_.techCanOverridePoster || !this.tech_ || !this.tech_.poster || (e = this.tech_.poster() || "") !== this.poster_ && (this.poster_ = e, this.isPosterFromTech_ = !0, this.trigger("posterchange"));
      }, e.controls = function (e) {
        if (void 0 === e) return !!this.controls_;
        this.controls_ !== (e = !!e) && (this.controls_ = e, this.usingNativeControls() && this.techCall_("setControls", e), this.controls_ ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_()));
      }, e.usingNativeControls = function (e) {
        if (void 0 === e) return !!this.usingNativeControls_;
        this.usingNativeControls_ !== (e = !!e) && (this.usingNativeControls_ = e, this.usingNativeControls_ ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols")));
      }, e.error = function (e) {
        if (void 0 === e) return this.error_ || null;

        if (this.options_.suppressNotSupportedError && e && 4 === e.code) {
          var t = function () {
            this.error(e);
          };

          return this.options_.suppressNotSupportedError = !1, this.any(["click", "touchstart"], t), void this.one("loadstart", function () {
            this.off(["click", "touchstart"], t);
          });
        }

        if (null === e) return this.error_ = e, this.removeClass("vjs-error"), void (this.errorDisplay && this.errorDisplay.close());
        this.error_ = new bt(e), this.addClass("vjs-error"), f.error("(CODE:" + this.error_.code + " " + bt.errorTypes[this.error_.code] + ")", this.error_.message, this.error_), this.trigger("error");
      }, e.reportUserActivity = function (e) {
        this.userActivity_ = !0;
      }, e.userActive = function (e) {
        if (void 0 === e) return this.userActive_;

        if ((e = !!e) !== this.userActive_) {
          if (this.userActive_ = e, this.userActive_) return this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), void this.trigger("useractive");
          this.tech_ && this.tech_.one("mousemove", function (e) {
            e.stopPropagation(), e.preventDefault();
          }), this.userActivity_ = !1, this.removeClass("vjs-user-active"), this.addClass("vjs-user-inactive"), this.trigger("userinactive");
        }
      }, e.listenForUserActivity_ = function () {
        var t,
            i,
            n,
            r = We(this, this.reportUserActivity),
            e = function (e) {
          r(), this.clearInterval(t);
        };

        this.on("mousedown", function () {
          r(), this.clearInterval(t), t = this.setInterval(r, 250);
        }), this.on("mousemove", function (e) {
          e.screenX === i && e.screenY === n || (i = e.screenX, n = e.screenY, r());
        }), this.on("mouseup", e), this.on("mouseleave", e);
        var a,
            e = this.getChild("controlBar");
        !e || V || P || (e.on("mouseenter", function (e) {
          this.player().cache_.inactivityTimeout = this.player().options_.inactivityTimeout, this.player().options_.inactivityTimeout = 0;
        }), e.on("mouseleave", function (e) {
          this.player().options_.inactivityTimeout = this.player().cache_.inactivityTimeout;
        })), this.on("keydown", r), this.on("keyup", r), this.setInterval(function () {
          var e;
          this.userActivity_ && (this.userActivity_ = !1, this.userActive(!0), this.clearTimeout(a), (e = this.options_.inactivityTimeout) <= 0 || (a = this.setTimeout(function () {
            this.userActivity_ || this.userActive(!1);
          }, e)));
        }, 250);
      }, e.playbackRate = function (e) {
        if (void 0 === e) return this.tech_ && this.tech_.featuresPlaybackRate ? this.cache_.lastPlaybackRate || this.techGet_("playbackRate") : 1;
        this.techCall_("setPlaybackRate", e);
      }, e.defaultPlaybackRate = function (e) {
        return void 0 !== e ? this.techCall_("setDefaultPlaybackRate", e) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("defaultPlaybackRate") : 1;
      }, e.isAudio = function (e) {
        if (void 0 === e) return !!this.isAudio_;
        this.isAudio_ = !!e;
      }, e.addTextTrack = function (e, t, i) {
        if (this.tech_) return this.tech_.addTextTrack(e, t, i);
      }, e.addRemoteTextTrack = function (e, t) {
        if (this.tech_) return this.tech_.addRemoteTextTrack(e, t);
      }, e.removeRemoteTextTrack = function (e) {
        var t = (t = (e = void 0 === e ? {} : e).track) || e;
        if (this.tech_) return this.tech_.removeRemoteTextTrack(t);
      }, e.getVideoPlaybackQuality = function () {
        return this.techGet_("getVideoPlaybackQuality");
      }, e.videoWidth = function () {
        return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0;
      }, e.videoHeight = function () {
        return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0;
      }, e.language = function (e) {
        if (void 0 === e) return this.language_;
        this.language_ !== String(e).toLowerCase() && (this.language_ = String(e).toLowerCase(), nt(this) && this.trigger("languagechange"));
      }, e.languages = function () {
        return ct(o.prototype.options_.languages, this.languages_);
      }, e.toJSON = function () {
        var e = ct(this.options_),
            t = e.tracks;
        e.tracks = [];

        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          (n = ct(n)).player = void 0, e.tracks[i] = n;
        }

        return e;
      }, e.createModal = function (e, t) {
        var i = this;
        (t = t || {}).content = e || "";
        var n = new Pt(this, t);
        return this.addChild(n), n.on("dispose", function () {
          i.removeChild(n);
        }), n.open(), n;
      }, e.updateCurrentBreakpoint_ = function () {
        if (this.responsive()) for (var e = this.currentBreakpoint(), t = this.currentWidth(), i = 0; i < Rn.length; i++) {
          var n = Rn[i];

          if (t <= this.breakpoints_[n]) {
            if (e === n) return;
            e && this.removeClass(Mn[e]), this.addClass(Mn[n]), this.breakpoint_ = n;
            break;
          }
        }
      }, e.removeCurrentBreakpoint_ = function () {
        var e = this.currentBreakpointClass();
        this.breakpoint_ = "", e && this.removeClass(e);
      }, e.breakpoints = function (e) {
        return void 0 === e || (this.breakpoint_ = "", this.breakpoints_ = T({}, Nn, e), this.updateCurrentBreakpoint_()), T(this.breakpoints_);
      }, e.responsive = function (e) {
        return void 0 === e ? this.responsive_ : (e = Boolean(e)) !== this.responsive_ ? ((this.responsive_ = e) ? (this.on("playerresize", this.boundUpdateCurrentBreakpoint_), this.updateCurrentBreakpoint_()) : (this.off("playerresize", this.boundUpdateCurrentBreakpoint_), this.removeCurrentBreakpoint_()), e) : void 0;
      }, e.currentBreakpoint = function () {
        return this.breakpoint_;
      }, e.currentBreakpointClass = function () {
        return Mn[this.breakpoint_] || "";
      }, e.loadMedia = function (e, t) {
        var i,
            n,
            r,
            a = this;
        e && "object" == typeof e && (this.reset(), this.cache_.media = ct(e), i = (r = this.cache_.media).artwork, n = r.poster, e = r.src, r = r.textTracks, !i && n && (this.cache_.media.artwork = [{
          src: n,
          type: Ki(n)
        }]), e && this.src(e), n && this.poster(n), Array.isArray(r) && r.forEach(function (e) {
          return a.addRemoteTextTrack(e, !1);
        }), this.ready(t));
      }, e.getMedia = function () {
        if (this.cache_.media) return ct(this.cache_.media);
        var e = this.poster(),
            t = {
          src: this.currentSources(),
          textTracks: Array.prototype.map.call(this.remoteTextTracks(), function (e) {
            return {
              kind: e.kind,
              label: e.label,
              language: e.language,
              src: e.src
            };
          })
        };
        return e && (t.poster = e, t.artwork = [{
          src: t.poster,
          type: Ki(t.poster)
        }]), t;
      }, o.getTagSettings = function (e) {
        var t,
            i = {
          sources: [],
          tracks: []
        },
            n = se(e),
            r = n["data-setup"];
        if (te(e, "vjs-fill") && (n.fill = !0), te(e, "vjs-fluid") && (n.fluid = !0), null !== r && (r = (t = St(r || "{}"))[0], t = t[1], r && f.error(r), T(n, t)), T(i, n), e.hasChildNodes()) for (var a = e.childNodes, s = 0, o = a.length; s < o; s++) {
          var u = a[s],
              l = u.nodeName.toLowerCase();
          "source" === l ? i.sources.push(se(u)) : "track" === l && i.tracks.push(se(u));
        }
        return i;
      }, e.flexNotSupported_ = function () {
        var e = d.createElement("i");
        return !("flexBasis" in e.style || "webkitFlexBasis" in e.style || "mozFlexBasis" in e.style || "msFlexBasis" in e.style || "msFlexOrder" in e.style);
      }, e.debug = function (e) {
        if (void 0 === e) return this.debugEnabled_;
        e ? (this.trigger("debugon"), this.previousLogLevel_ = this.log.level, this.log.level("debug"), this.debugEnabled_ = !0) : (this.trigger("debugoff"), this.log.level(this.previousLogLevel_), this.previousLogLevel_ = void 0, this.debugEnabled_ = !1);
      }, e.playbackRates = function (e) {
        if (void 0 === e) return this.cache_.playbackRates;
        Array.isArray(e) && e.every(function (e) {
          return "number" == typeof e;
        }) && (this.cache_.playbackRates = e, this.trigger("playbackrateschange"));
      }, o;
    }(pt);

    si.names.forEach(function (e) {
      var t = si[e];

      Un.prototype[t.getterName] = function () {
        return this.tech_ ? this.tech_[t.getterName]() : (this[t.privateName] = this[t.privateName] || new t.ListClass(), this[t.privateName]);
      };
    }), Un.prototype.crossorigin = Un.prototype.crossOrigin, Un.players = {};
    I = _.navigator;
    Un.prototype.options_ = {
      techOrder: Ui.defaultTechOrder_,
      html5: {},
      inactivityTimeout: 2e3,
      playbackRates: [],
      liveui: !1,
      children: ["mediaLoader", "posterImage", "textTrackDisplay", "loadingSpinner", "bigPlayButton", "liveTracker", "controlBar", "errorDisplay", "textTrackSettings", "resizeManager"],
      language: I && (I.languages && I.languages[0] || I.userLanguage || I.language) || "en",
      languages: {},
      notSupportedMessage: "No compatible source was found for this media.",
      normalizeAutoplay: !1,
      fullscreen: {
        options: {
          navigationUI: "hide"
        }
      },
      breakpoints: {},
      responsive: !1
    }, ["ended", "seeking", "seekable", "networkState", "readyState"].forEach(function (e) {
      Un.prototype[e] = function () {
        return this.techGet_(e);
      };
    }), Dn.forEach(function (e) {
      Un.prototype["handleTech" + lt(e) + "_"] = function () {
        return this.trigger(e);
      };
    }), pt.registerComponent("Player", Un);
    var Bn = t(function (i) {
      function n(e, t) {
        return i.exports = n = Object.setPrototypeOf || function (e, t) {
          return e.__proto__ = t, e;
        }, n(e, t);
      }

      i.exports = n;
    });

    function Fn(e) {
      return Kn.hasOwnProperty(e);
    }

    function jn(e) {
      return Fn(e) ? Kn[e] : void 0;
    }

    function Hn(e, t, i) {
      i = (i ? "before" : "") + "pluginsetup", e.trigger(i, t), e.trigger(i + ":" + t.name, t);
    }

    function qn(t, i) {
      function n() {
        Hn(this, {
          name: t,
          plugin: i,
          instance: null
        }, !0);
        var e = i.apply(this, arguments);
        return Yn(this, t), Hn(this, {
          name: t,
          plugin: i,
          instance: e
        }), e;
      }

      return Object.keys(i).forEach(function (e) {
        n[e] = i[e];
      }), n;
    }

    function Vn(r, a) {
      return a.prototype.name = r, function () {
        Hn(this, {
          name: r,
          plugin: a,
          instance: null
        }, !0);

        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        var n = zn(a, [this].concat(t));
        return this[r] = function () {
          return n;
        }, Hn(this, n.getEventHash()), n;
      };
    }

    var Wn = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    },
        zn = t(function (n) {
      function r(e, t, i) {
        return Wn() ? n.exports = r = Reflect.construct : n.exports = r = function (e, t, i) {
          var n = [null];
          n.push.apply(n, t);
          n = new (Function.bind.apply(e, n))();
          return i && Bn(n, i.prototype), n;
        }, r.apply(null, arguments);
      }

      n.exports = r;
    }),
        Gn = "plugin",
        Xn = "activePlugins_",
        Kn = {},
        Yn = function (e, t) {
      e[Xn] = e[Xn] || {}, e[Xn][t] = !0;
    },
        Qn = function () {
      function i(e) {
        if (this.constructor === i) throw new Error("Plugin must be sub-classed; not directly instantiated.");
        this.player = e, this.log || (this.log = this.player.log.createLogger(this.name)), at(this), delete this.trigger, ot(this, this.constructor.defaultState), Yn(e, this.name), this.dispose = this.dispose.bind(this), e.on("dispose", this.dispose);
      }

      var e = i.prototype;
      return e.version = function () {
        return this.constructor.VERSION;
      }, e.getEventHash = function (e) {
        return (e = void 0 === e ? {} : e).name = this.name, e.plugin = this.constructor, e.instance = this, e;
      }, e.trigger = function (e, t) {
        return He(this.eventBusEl_, e, this.getEventHash(t = void 0 === t ? {} : t));
      }, e.handleStateChanged = function (e) {}, e.dispose = function () {
        var e = this.name,
            t = this.player;
        this.trigger("dispose"), this.off(), t.off("dispose", this.dispose), t[Xn][e] = !1, this.player = this.state = null, t[e] = Vn(e, Kn[e]);
      }, i.isBasic = function (e) {
        e = "string" == typeof e ? jn(e) : e;
        return "function" == typeof e && !i.prototype.isPrototypeOf(e.prototype);
      }, i.registerPlugin = function (e, t) {
        if ("string" != typeof e) throw new Error('Illegal plugin name, "' + e + '", must be a string, was ' + typeof e + ".");
        if (Fn(e)) f.warn('A plugin named "' + e + '" already exists. You may want to avoid re-registering plugins!');else if (Un.prototype.hasOwnProperty(e)) throw new Error('Illegal plugin name, "' + e + '", cannot share a name with an existing player method!');
        if ("function" != typeof t) throw new Error('Illegal plugin for "' + e + '", must be a function, was ' + typeof t + ".");
        return Kn[e] = t, e !== Gn && (i.isBasic(t) ? Un.prototype[e] = qn(e, t) : Un.prototype[e] = Vn(e, t)), t;
      }, i.deregisterPlugin = function (e) {
        if (e === Gn) throw new Error("Cannot de-register base plugin.");
        Fn(e) && (delete Kn[e], delete Un.prototype[e]);
      }, i.getPlugins = function (e) {
        var i;
        return (e = void 0 === e ? Object.keys(Kn) : e).forEach(function (e) {
          var t = jn(e);
          t && ((i = i || {})[e] = t);
        }), i;
      }, i.getPluginVersion = function (e) {
        e = jn(e);
        return e && e.VERSION || "";
      }, i;
    }();

    Qn.getPlugin = jn, Qn.BASE_PLUGIN_NAME = Gn, Qn.registerPlugin(Gn, Qn), Un.prototype.usingPlugin = function (e) {
      return !!this[Xn] && !0 === this[Xn][e];
    }, Un.prototype.hasPlugin = function (e) {
      return !!Fn(e);
    };

    var $n = function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && Bn(e, t);
    },
        Jn = function (e) {
      return 0 === e.indexOf("#") ? e.slice(1) : e;
    };

    function Zn(e, t, i) {
      if (r = Zn.getPlayer(e)) return t && f.warn('Player "' + e + '" is already initialised. Options will not be applied.'), i && r.ready(i), r;
      var n = "string" == typeof e ? Se("#" + Jn(e)) : e;
      if (!Y(n)) throw new TypeError("The element or ID supplied is not valid. (videojs)");
      n.ownerDocument.defaultView && n.ownerDocument.body.contains(n) || f.warn("The element supplied is not included in the DOM"), t = t || {}, Zn.hooks("beforesetup").forEach(function (e) {
        e = e(n, ct(t));
        S(e) && !Array.isArray(e) ? t = ct(t, e) : f.error("please return an object in beforesetup hooks");
      });
      var r = new (pt.getComponent("Player"))(n, t, i);
      return Zn.hooks("setup").forEach(function (e) {
        return e(r);
      }), r;
    }

    Zn.hooks_ = {}, Zn.hooks = function (e, t) {
      return Zn.hooks_[e] = Zn.hooks_[e] || [], t && (Zn.hooks_[e] = Zn.hooks_[e].concat(t)), Zn.hooks_[e];
    }, Zn.hook = function (e, t) {
      Zn.hooks(e, t);
    }, Zn.hookOnce = function (i, e) {
      Zn.hooks(i, [].concat(e).map(function (t) {
        return function e() {
          return Zn.removeHook(i, e), t.apply(void 0, arguments);
        };
      }));
    }, Zn.removeHook = function (e, t) {
      t = Zn.hooks(e).indexOf(t);
      return !(t <= -1) && (Zn.hooks_[e] = Zn.hooks_[e].slice(), Zn.hooks_[e].splice(t, 1), !0);
    }, !0 !== _.VIDEOJS_NO_DYNAMIC_STYLE && K() && ((nr = Se(".vjs-styles-defaults")) || (nr = Ae("vjs-styles-defaults"), (I = Se("head")) && I.insertBefore(nr, I.firstChild), Pe(nr, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    "))), Ie(1, Zn), Zn.VERSION = u, Zn.options = Un.prototype.options_, Zn.getPlayers = function () {
      return Un.players;
    }, Zn.getPlayer = function (e) {
      var t = Un.players;

      if ("string" == typeof e) {
        var i = Jn(e),
            n = t[i];
        if (n) return n;
        i = Se("#" + i);
      } else i = e;

      if (Y(i)) {
        e = i.player, i = i.playerId;
        if (e || t[i]) return e || t[i];
      }
    }, Zn.getAllPlayers = function () {
      return Object.keys(Un.players).map(function (e) {
        return Un.players[e];
      }).filter(Boolean);
    }, Zn.players = Un.players, Zn.getComponent = pt.getComponent, Zn.registerComponent = function (e, t) {
      Ui.isTech(t) && f.warn("The " + e + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"), pt.registerComponent.call(pt, e, t);
    }, Zn.getTech = Ui.getTech, Zn.registerTech = Ui.registerTech, Zn.use = function (e, t) {
      Bi[e] = Bi[e] || [], Bi[e].push(t);
    }, Object.defineProperty(Zn, "middleware", {
      value: {},
      writeable: !1,
      enumerable: !0
    }), Object.defineProperty(Zn.middleware, "TERMINATOR", {
      value: ji,
      writeable: !1,
      enumerable: !0
    }), Zn.browser = z, Zn.TOUCH_ENABLED = j, Zn.extend = function (e, t) {
      var i,
          n = function () {
        e.apply(this, arguments);
      },
          r = {};

      for (i in "object" == typeof (t = void 0 === t ? {} : t) ? (t.constructor !== Object.prototype.constructor && (n = t.constructor), r = t) : "function" == typeof t && (n = t), $n(n, e), e && (n.super_ = e), r) r.hasOwnProperty(i) && (n.prototype[i] = r[i]);

      return n;
    }, Zn.mergeOptions = ct, Zn.bind = We, Zn.registerPlugin = Qn.registerPlugin, Zn.deregisterPlugin = Qn.deregisterPlugin, Zn.plugin = function (e, t) {
      return f.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"), Qn.registerPlugin(e, t);
    }, Zn.getPlugins = Qn.getPlugins, Zn.getPlugin = Qn.getPlugin, Zn.getPluginVersion = Qn.getPluginVersion, Zn.addLanguage = function (e, t) {
      var i;
      return e = ("" + e).toLowerCase(), Zn.options.languages = ct(Zn.options.languages, ((i = {})[e] = t, i)), Zn.options.languages[e];
    }, Zn.log = f, Zn.createLogger = m, Zn.createTimeRange = Zn.createTimeRanges = vt, Zn.formatTime = on, Zn.setFormatTime = function (e) {
      sn = e;
    }, Zn.resetFormatTime = function () {
      sn = an;
    }, Zn.parseUrl = Mt, Zn.isCrossOrigin = Bt, Zn.EventTarget = Xe, Zn.on = Fe, Zn.one = qe, Zn.off = je, Zn.trigger = He, Zn.xhr = Yt, Zn.TextTrack = ti, Zn.AudioTrack = ii, Zn.VideoTrack = ni, ["isEl", "isTextNode", "createEl", "hasClass", "addClass", "removeClass", "toggleClass", "setAttributes", "getAttributes", "emptyEl", "appendContent", "insertContent"].forEach(function (e) {
      Zn[e] = function () {
        return f.warn("videojs." + e + "() is deprecated; use videojs.dom." + e + "() instead"), ke[e].apply(null, arguments);
      };
    }), Zn.computedStyle = k, Zn.dom = ke, Zn.url = zt, Zn.defineLazyProperty = In, Zn.addLanguage("en", {
      "Non-Fullscreen": "Exit Fullscreen"
    });

    function er(e, t) {
      if (/^[a-z]+:/i.test(t)) return t;
      /^data:/.test(e) && (e = _.location && _.location.href || "");
      var i = "function" == typeof _.URL,
          n = /^\/\//.test(e),
          r = !_.location && !/\/\//i.test(e);

      if (i ? e = new _.URL(e, _.location || ir) : /\/\//i.test(e) || (e = tr.buildAbsoluteURL(_.location && _.location.href || "", e)), i) {
        i = new URL(t, e);
        return r ? i.href.slice(ir.length) : n ? i.href.slice(i.protocol.length) : i.href;
      }

      return tr.buildAbsoluteURL(e, t);
    }

    var tr = t(function (e, t) {
      var i, a, n, r, s;
      i = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#[^]*)?$/, a = /^([^\/?#]*)([^]*)$/, n = /(?:\/|^)\.(?=\/)/g, r = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, s = {
        buildAbsoluteURL: function (e, t, i) {
          if (i = i || {}, e = e.trim(), !(t = t.trim())) {
            if (!i.alwaysNormalize) return e;
            var n = s.parseURL(e);
            if (!n) throw new Error("Error trying to parse base URL.");
            return n.path = s.normalizePath(n.path), s.buildURLFromParts(n);
          }

          n = s.parseURL(t);
          if (!n) throw new Error("Error trying to parse relative URL.");
          if (n.scheme) return i.alwaysNormalize ? (n.path = s.normalizePath(n.path), s.buildURLFromParts(n)) : t;
          t = s.parseURL(e);
          if (!t) throw new Error("Error trying to parse base URL.");
          !t.netLoc && t.path && "/" !== t.path[0] && (r = a.exec(t.path), t.netLoc = r[1], t.path = r[2]), t.netLoc && !t.path && (t.path = "/");
          var r,
              e = {
            scheme: t.scheme,
            netLoc: n.netLoc,
            path: null,
            params: n.params,
            query: n.query,
            fragment: n.fragment
          };
          return n.netLoc || (e.netLoc = t.netLoc, "/" !== n.path[0] && (n.path ? (r = (r = t.path).substring(0, r.lastIndexOf("/") + 1) + n.path, e.path = s.normalizePath(r)) : (e.path = t.path, n.params || (e.params = t.params, n.query || (e.query = t.query))))), null === e.path && (e.path = i.alwaysNormalize ? s.normalizePath(n.path) : n.path), s.buildURLFromParts(e);
        },
        parseURL: function (e) {
          e = i.exec(e);
          return e ? {
            scheme: e[1] || "",
            netLoc: e[2] || "",
            path: e[3] || "",
            params: e[4] || "",
            query: e[5] || "",
            fragment: e[6] || ""
          } : null;
        },
        normalizePath: function (e) {
          for (e = e.split("").reverse().join("").replace(n, ""); e.length !== (e = e.replace(r, "")).length;);

          return e.split("").reverse().join("");
        },
        buildURLFromParts: function (e) {
          return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment;
        }
      }, e.exports = s;
    }),
        ir = "http://example.com",
        nr = function () {
      function e() {
        this.listeners = {};
      }

      var t = e.prototype;
      return t.on = function (e, t) {
        this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(t);
      }, t.off = function (e, t) {
        if (!this.listeners[e]) return !1;
        t = this.listeners[e].indexOf(t);
        return this.listeners[e] = this.listeners[e].slice(0), this.listeners[e].splice(t, 1), -1 < t;
      }, t.trigger = function (e) {
        var t = this.listeners[e];
        if (t) if (2 === arguments.length) for (var i = t.length, n = 0; n < i; ++n) t[n].call(this, arguments[1]);else for (var r = Array.prototype.slice.call(arguments, 1), a = t.length, s = 0; s < a; ++s) t[s].apply(this, r);
      }, t.dispose = function () {
        this.listeners = {};
      }, t.pipe = function (t) {
        this.on("data", function (e) {
          t.push(e);
        });
      }, e;
    }(),
        rr = function (e) {
      return _.atob ? _.atob(e) : Buffer.from(e, "base64").toString("binary");
    };

    function ar(e) {
      for (var t = rr(e), i = new Uint8Array(t.length), n = 0; n < t.length; n++) i[n] = t.charCodeAt(n);

      return i;
    }
    /*! @name m3u8-parser @version 4.7.0 @license Apache-2.0 */


    function sr(e) {
      var t = /([0-9.]*)?@?([0-9.]*)?/.exec(e || ""),
          e = {};
      return t[1] && (e.length = parseInt(t[1], 10)), t[2] && (e.offset = parseInt(t[2], 10)), e;
    }

    function or(e) {
      for (var t, i = e.split(new RegExp('(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))')), n = {}, r = i.length; r--;) "" !== i[r] && ((t = /([^=]*)=(.*)/.exec(i[r]).slice(1))[0] = t[0].replace(/^\s+|\s+$/g, ""), t[1] = t[1].replace(/^\s+|\s+$/g, ""), t[1] = t[1].replace(/^['"](.*)['"]$/g, "$1"), n[t[0]] = t[1]);

      return n;
    }

    function ur(t) {
      var i = {};
      return Object.keys(t).forEach(function (e) {
        i[e.toLowerCase().replace(/-(\w)/g, function (e) {
          return e[1].toUpperCase();
        })] = t[e];
      }), i;
    }

    function lr(e) {
      var t,
          i,
          n,
          r,
          a = e.serverControl,
          s = e.targetDuration,
          o = e.partTargetDuration;
      a && (t = "#EXT-X-SERVER-CONTROL", i = "holdBack", n = "partHoldBack", r = s && 3 * s, e = o && 2 * o, s && !a.hasOwnProperty(i) && (a[i] = r, this.trigger("info", {
        message: t + " defaulting HOLD-BACK to targetDuration * 3 (" + r + ")."
      })), r && a[i] < r && (this.trigger("warn", {
        message: t + " clamping HOLD-BACK (" + a[i] + ") to targetDuration * 3 (" + r + ")"
      }), a[i] = r), o && !a.hasOwnProperty(n) && (a[n] = 3 * o, this.trigger("info", {
        message: t + " defaulting PART-HOLD-BACK to partTargetDuration * 3 (" + a[n] + ")."
      })), o && a[n] < e && (this.trigger("warn", {
        message: t + " clamping PART-HOLD-BACK (" + a[n] + ") to partTargetDuration * 2 (" + e + ")."
      }), a[n] = e));
    }

    function cr(e) {
      return e && e.replace(/avc1\.(\d+)\.(\d+)/i, function (e, t, i) {
        return "avc1." + ("00" + Number(t).toString(16)).slice(-2) + "00" + ("00" + Number(i).toString(16)).slice(-2);
      });
    }

    function dr(e) {
      var e = (e = void 0 === e ? "" : e).split(","),
          a = [];
      return e.forEach(function (n) {
        var r;
        n = n.trim(), Sr.forEach(function (e) {
          var t,
              i = Tr[e].exec(n.toLowerCase());
          !i || i.length <= 1 || (r = e, t = n.substring(0, i[1].length), i = n.replace(t, ""), a.push({
            type: t,
            details: i,
            mediaType: e
          }));
        }), r || a.push({
          type: n,
          details: "",
          mediaType: "unknown"
        });
      }), a;
    }

    function hr(e) {
      return Tr.audio.test((e = void 0 === e ? "" : e).trim().toLowerCase());
    }

    function pr(e) {
      if (e && "string" == typeof e) {
        var t = e.toLowerCase().split(",").map(function (e) {
          return cr(e.trim());
        }),
            i = "video";
        1 === t.length && hr(t[0]) ? i = "audio" : 1 === t.length && (n = t[0], Tr.text.test((n = void 0 === n ? "" : n).trim().toLowerCase())) && (i = "application");
        var n = "mp4";
        return t.every(function (e) {
          return Tr.mp4.test(e);
        }) ? n = "mp4" : t.every(function (e) {
          return Tr.webm.test(e);
        }) ? n = "webm" : t.every(function (e) {
          return Tr.ogg.test(e);
        }) && (n = "ogg"), i + "/" + n + ';codecs="' + e + '"';
      }
    }

    function fr(e) {
      return void 0 === e && (e = ""), _.MediaSource && _.MediaSource.isTypeSupported && _.MediaSource.isTypeSupported(pr(e)) || !1;
    }

    function mr(e) {
      return (e = void 0 === e ? "" : e).toLowerCase().split(",").every(function (e) {
        e = e.trim();

        for (var t = 0; t < Er.length; t++) if (Tr["muxer" + Er[t]].test(e)) return !0;

        return !1;
      });
    }

    function gr(e) {
      return Cr.test(e) ? "hls" : wr.test(e) ? "dash" : "application/vnd.videojs.vhs+json" === e ? "vhs-json" : null;
    }

    var yr = function (t) {
      function e() {
        var e = t.call(this) || this;
        return e.buffer = "", e;
      }

      return mt(e, t), e.prototype.push = function (e) {
        var t;

        for (this.buffer += e, t = this.buffer.indexOf("\n"); -1 < t; t = this.buffer.indexOf("\n")) this.trigger("data", this.buffer.substring(0, t)), this.buffer = this.buffer.substring(t + 1);
      }, e;
    }(nr),
        vr = String.fromCharCode(9),
        _r = function (t) {
      function e() {
        var e = t.call(this) || this;
        return e.customParsers = [], e.tagMappers = [], e;
      }

      mt(e, t);
      var i = e.prototype;
      return i.push = function (i) {
        var r,
            a,
            s = this;
        0 !== (i = i.trim()).length && ("#" === i[0] ? this.tagMappers.reduce(function (e, t) {
          t = t(i);
          return t === i ? e : e.concat([t]);
        }, [i]).forEach(function (e) {
          for (var t, i, n = 0; n < s.customParsers.length; n++) if (s.customParsers[n].call(s, e)) return;

          if (0 === e.indexOf("#EXT")) {
            if (e = e.replace("\r", ""), r = /^#EXTM3U/.exec(e)) s.trigger("data", {
              type: "tag",
              tagType: "m3u"
            });else {
              if (r = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(e)) return a = {
                type: "tag",
                tagType: "inf"
              }, r[1] && (a.duration = parseFloat(r[1])), r[2] && (a.title = r[2]), void s.trigger("data", a);
              if (r = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(e)) return a = {
                type: "tag",
                tagType: "targetduration"
              }, r[1] && (a.duration = parseInt(r[1], 10)), void s.trigger("data", a);
              if (r = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(e)) return a = {
                type: "tag",
                tagType: "version"
              }, r[1] && (a.version = parseInt(r[1], 10)), void s.trigger("data", a);
              if (r = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(e)) return a = {
                type: "tag",
                tagType: "media-sequence"
              }, r[1] && (a.number = parseInt(r[1], 10)), void s.trigger("data", a);
              if (r = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(e)) return a = {
                type: "tag",
                tagType: "discontinuity-sequence"
              }, r[1] && (a.number = parseInt(r[1], 10)), void s.trigger("data", a);
              if (r = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(e)) return a = {
                type: "tag",
                tagType: "playlist-type"
              }, r[1] && (a.playlistType = r[1]), void s.trigger("data", a);
              if (r = /^#EXT-X-BYTERANGE:?(.*)?$/.exec(e)) return a = g(sr(r[1]), {
                type: "tag",
                tagType: "byterange"
              }), void s.trigger("data", a);
              if (r = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(e)) return a = {
                type: "tag",
                tagType: "allow-cache"
              }, r[1] && (a.allowed = !/NO/.test(r[1])), void s.trigger("data", a);
              if (r = /^#EXT-X-MAP:?(.*)$/.exec(e)) return a = {
                type: "tag",
                tagType: "map"
              }, r[1] && ((t = or(r[1])).URI && (a.uri = t.URI), t.BYTERANGE && (a.byterange = sr(t.BYTERANGE))), void s.trigger("data", a);
              if (r = /^#EXT-X-STREAM-INF:?(.*)$/.exec(e)) return a = {
                type: "tag",
                tagType: "stream-inf"
              }, r[1] && (a.attributes = or(r[1]), a.attributes.RESOLUTION && (i = {}, (t = a.attributes.RESOLUTION.split("x"))[0] && (i.width = parseInt(t[0], 10)), t[1] && (i.height = parseInt(t[1], 10)), a.attributes.RESOLUTION = i), a.attributes.BANDWIDTH && (a.attributes.BANDWIDTH = parseInt(a.attributes.BANDWIDTH, 10)), a.attributes["PROGRAM-ID"] && (a.attributes["PROGRAM-ID"] = parseInt(a.attributes["PROGRAM-ID"], 10))), void s.trigger("data", a);
              if (r = /^#EXT-X-MEDIA:?(.*)$/.exec(e)) return a = {
                type: "tag",
                tagType: "media"
              }, r[1] && (a.attributes = or(r[1])), void s.trigger("data", a);
              if (r = /^#EXT-X-ENDLIST/.exec(e)) s.trigger("data", {
                type: "tag",
                tagType: "endlist"
              });else {
                if (!(r = /^#EXT-X-DISCONTINUITY/.exec(e))) return (r = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(e)) ? (a = {
                  type: "tag",
                  tagType: "program-date-time"
                }, r[1] && (a.dateTimeString = r[1], a.dateTimeObject = new Date(r[1])), void s.trigger("data", a)) : (r = /^#EXT-X-KEY:?(.*)$/.exec(e)) ? (a = {
                  type: "tag",
                  tagType: "key"
                }, r[1] && (a.attributes = or(r[1]), a.attributes.IV && ("0x" === a.attributes.IV.substring(0, 2).toLowerCase() && (a.attributes.IV = a.attributes.IV.substring(2)), a.attributes.IV = a.attributes.IV.match(/.{8}/g), a.attributes.IV[0] = parseInt(a.attributes.IV[0], 16), a.attributes.IV[1] = parseInt(a.attributes.IV[1], 16), a.attributes.IV[2] = parseInt(a.attributes.IV[2], 16), a.attributes.IV[3] = parseInt(a.attributes.IV[3], 16), a.attributes.IV = new Uint32Array(a.attributes.IV))), void s.trigger("data", a)) : (r = /^#EXT-X-START:?(.*)$/.exec(e)) ? (a = {
                  type: "tag",
                  tagType: "start"
                }, r[1] && (a.attributes = or(r[1]), a.attributes["TIME-OFFSET"] = parseFloat(a.attributes["TIME-OFFSET"]), a.attributes.PRECISE = /YES/.test(a.attributes.PRECISE)), void s.trigger("data", a)) : (r = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(e)) ? (a = {
                  type: "tag",
                  tagType: "cue-out-cont"
                }, r[1] ? a.data = r[1] : a.data = "", void s.trigger("data", a)) : (r = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(e)) ? (a = {
                  type: "tag",
                  tagType: "cue-out"
                }, r[1] ? a.data = r[1] : a.data = "", void s.trigger("data", a)) : (r = /^#EXT-X-CUE-IN:?(.*)?$/.exec(e)) ? (a = {
                  type: "tag",
                  tagType: "cue-in"
                }, r[1] ? a.data = r[1] : a.data = "", void s.trigger("data", a)) : (r = /^#EXT-X-SKIP:(.*)$/.exec(e)) && r[1] ? ((a = {
                  type: "tag",
                  tagType: "skip"
                }).attributes = or(r[1]), a.attributes.hasOwnProperty("SKIPPED-SEGMENTS") && (a.attributes["SKIPPED-SEGMENTS"] = parseInt(a.attributes["SKIPPED-SEGMENTS"], 10)), a.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES") && (a.attributes["RECENTLY-REMOVED-DATERANGES"] = a.attributes["RECENTLY-REMOVED-DATERANGES"].split(vr)), void s.trigger("data", a)) : (r = /^#EXT-X-PART:(.*)$/.exec(e)) && r[1] ? ((a = {
                  type: "tag",
                  tagType: "part"
                }).attributes = or(r[1]), ["DURATION"].forEach(function (e) {
                  a.attributes.hasOwnProperty(e) && (a.attributes[e] = parseFloat(a.attributes[e]));
                }), ["INDEPENDENT", "GAP"].forEach(function (e) {
                  a.attributes.hasOwnProperty(e) && (a.attributes[e] = /YES/.test(a.attributes[e]));
                }), a.attributes.hasOwnProperty("BYTERANGE") && (a.attributes.byterange = sr(a.attributes.BYTERANGE)), void s.trigger("data", a)) : (r = /^#EXT-X-SERVER-CONTROL:(.*)$/.exec(e)) && r[1] ? ((a = {
                  type: "tag",
                  tagType: "server-control"
                }).attributes = or(r[1]), ["CAN-SKIP-UNTIL", "PART-HOLD-BACK", "HOLD-BACK"].forEach(function (e) {
                  a.attributes.hasOwnProperty(e) && (a.attributes[e] = parseFloat(a.attributes[e]));
                }), ["CAN-SKIP-DATERANGES", "CAN-BLOCK-RELOAD"].forEach(function (e) {
                  a.attributes.hasOwnProperty(e) && (a.attributes[e] = /YES/.test(a.attributes[e]));
                }), void s.trigger("data", a)) : (r = /^#EXT-X-PART-INF:(.*)$/.exec(e)) && r[1] ? ((a = {
                  type: "tag",
                  tagType: "part-inf"
                }).attributes = or(r[1]), ["PART-TARGET"].forEach(function (e) {
                  a.attributes.hasOwnProperty(e) && (a.attributes[e] = parseFloat(a.attributes[e]));
                }), void s.trigger("data", a)) : (r = /^#EXT-X-PRELOAD-HINT:(.*)$/.exec(e)) && r[1] ? ((a = {
                  type: "tag",
                  tagType: "preload-hint"
                }).attributes = or(r[1]), ["BYTERANGE-START", "BYTERANGE-LENGTH"].forEach(function (e) {
                  var t;
                  a.attributes.hasOwnProperty(e) && (a.attributes[e] = parseInt(a.attributes[e], 10), t = "BYTERANGE-LENGTH" === e ? "length" : "offset", a.attributes.byterange = a.attributes.byterange || {}, a.attributes.byterange[t] = a.attributes[e], delete a.attributes[e]);
                }), void s.trigger("data", a)) : (r = /^#EXT-X-RENDITION-REPORT:(.*)$/.exec(e)) && r[1] ? ((a = {
                  type: "tag",
                  tagType: "rendition-report"
                }).attributes = or(r[1]), ["LAST-MSN", "LAST-PART"].forEach(function (e) {
                  a.attributes.hasOwnProperty(e) && (a.attributes[e] = parseInt(a.attributes[e], 10));
                }), void s.trigger("data", a)) : void s.trigger("data", {
                  type: "tag",
                  data: e.slice(4)
                });
                s.trigger("data", {
                  type: "tag",
                  tagType: "discontinuity"
                });
              }
            }
          } else s.trigger("data", {
            type: "comment",
            text: e.slice(1)
          });
        }) : this.trigger("data", {
          type: "uri",
          uri: i
        }));
      }, i.addParser = function (e) {
        var t = this,
            i = e.expression,
            n = e.customType,
            r = e.dataParser,
            a = e.segment;
        "function" != typeof r && (r = function (e) {
          return e;
        }), this.customParsers.push(function (e) {
          if (i.exec(e)) return t.trigger("data", {
            type: "custom",
            data: r(e),
            customType: n,
            segment: a
          }), !0;
        });
      }, i.addTagMapper = function (e) {
        var t = e.expression,
            i = e.map;
        this.tagMappers.push(function (e) {
          return t.test(e) ? i(e) : e;
        });
      }, e;
    }(nr),
        br = function (t) {
      function e() {
        var e = t.call(this) || this;
        e.lineStream = new yr(), e.parseStream = new _r(), e.lineStream.pipe(e.parseStream);
        var n,
            r,
            a = ft(e),
            o = [],
            u = {},
            l = !1,
            c = {
          AUDIO: {},
          VIDEO: {},
          "CLOSED-CAPTIONS": {},
          SUBTITLES: {}
        },
            d = 0;
        e.manifest = {
          allowCache: !0,
          discontinuityStarts: [],
          segments: []
        };
        var h = 0,
            p = 0;
        return e.on("end", function () {
          u.uri || !u.parts && !u.preloadHints || (!u.map && n && (u.map = n), !u.key && r && (u.key = r), u.timeline || "number" != typeof d || (u.timeline = d), e.manifest.preloadSegment = u);
        }), e.parseStream.on("data", function (s) {
          var t, i;
          ({
            tag: function () {
              (({
                version: function () {
                  s.version && (this.manifest.version = s.version);
                },
                "allow-cache": function () {
                  this.manifest.allowCache = s.allowed, "allowed" in s || (this.trigger("info", {
                    message: "defaulting allowCache to YES"
                  }), this.manifest.allowCache = !0);
                },
                byterange: function () {
                  var e = {};
                  "length" in s && ((u.byterange = e).length = s.length, "offset" in s || (s.offset = h)), "offset" in s && ((u.byterange = e).offset = s.offset), h = e.offset + e.length;
                },
                endlist: function () {
                  this.manifest.endList = !0;
                },
                inf: function () {
                  "mediaSequence" in this.manifest || (this.manifest.mediaSequence = 0, this.trigger("info", {
                    message: "defaulting media sequence to zero"
                  })), "discontinuitySequence" in this.manifest || (this.manifest.discontinuitySequence = 0, this.trigger("info", {
                    message: "defaulting discontinuity sequence to zero"
                  })), 0 < s.duration && (u.duration = s.duration), 0 === s.duration && (u.duration = .01, this.trigger("info", {
                    message: "updating zero segment duration to a small value"
                  })), this.manifest.segments = o;
                },
                key: function () {
                  if (s.attributes) {
                    if ("NONE" !== s.attributes.METHOD) {
                      if (s.attributes.URI) {
                        if ("com.apple.streamingkeydelivery" === s.attributes.KEYFORMAT) return this.manifest.contentProtection = this.manifest.contentProtection || {}, void (this.manifest.contentProtection["com.apple.fps.1_0"] = {
                          attributes: s.attributes
                        });
                        if ("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed" === s.attributes.KEYFORMAT) return -1 === ["SAMPLE-AES", "SAMPLE-AES-CTR", "SAMPLE-AES-CENC"].indexOf(s.attributes.METHOD) ? void this.trigger("warn", {
                          message: "invalid key method provided for Widevine"
                        }) : ("SAMPLE-AES-CENC" === s.attributes.METHOD && this.trigger("warn", {
                          message: "SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"
                        }), "data:text/plain;base64," !== s.attributes.URI.substring(0, 23) ? void this.trigger("warn", {
                          message: "invalid key URI provided for Widevine"
                        }) : s.attributes.KEYID && "0x" === s.attributes.KEYID.substring(0, 2) ? (this.manifest.contentProtection = this.manifest.contentProtection || {}, void (this.manifest.contentProtection["com.widevine.alpha"] = {
                          attributes: {
                            schemeIdUri: s.attributes.KEYFORMAT,
                            keyId: s.attributes.KEYID.substring(2)
                          },
                          pssh: ar(s.attributes.URI.split(",")[1])
                        })) : void this.trigger("warn", {
                          message: "invalid key ID provided for Widevine"
                        }));
                        s.attributes.METHOD || this.trigger("warn", {
                          message: "defaulting key method to AES-128"
                        }), r = {
                          method: s.attributes.METHOD || "AES-128",
                          uri: s.attributes.URI
                        }, "undefined" != typeof s.attributes.IV && (r.iv = s.attributes.IV);
                      } else this.trigger("warn", {
                        message: "ignoring key declaration without URI"
                      });
                    } else r = null;
                  } else this.trigger("warn", {
                    message: "ignoring key declaration without attribute list"
                  });
                },
                "media-sequence": function () {
                  isFinite(s.number) ? this.manifest.mediaSequence = s.number : this.trigger("warn", {
                    message: "ignoring invalid media sequence: " + s.number
                  });
                },
                "discontinuity-sequence": function () {
                  isFinite(s.number) ? (this.manifest.discontinuitySequence = s.number, d = s.number) : this.trigger("warn", {
                    message: "ignoring invalid discontinuity sequence: " + s.number
                  });
                },
                "playlist-type": function () {
                  /VOD|EVENT/.test(s.playlistType) ? this.manifest.playlistType = s.playlistType : this.trigger("warn", {
                    message: "ignoring unknown playlist type: " + s.playlist
                  });
                },
                map: function () {
                  n = {}, s.uri && (n.uri = s.uri), s.byterange && (n.byterange = s.byterange), r && (n.key = r);
                },
                "stream-inf": function () {
                  this.manifest.playlists = o, this.manifest.mediaGroups = this.manifest.mediaGroups || c, s.attributes ? (u.attributes || (u.attributes = {}), g(u.attributes, s.attributes)) : this.trigger("warn", {
                    message: "ignoring empty stream-inf attributes"
                  });
                },
                media: function () {
                  var e;
                  this.manifest.mediaGroups = this.manifest.mediaGroups || c, s.attributes && s.attributes.TYPE && s.attributes["GROUP-ID"] && s.attributes.NAME ? ((e = this.manifest.mediaGroups[s.attributes.TYPE])[s.attributes["GROUP-ID"]] = e[s.attributes["GROUP-ID"]] || {}, t = e[s.attributes["GROUP-ID"]], (i = {
                    default: /yes/i.test(s.attributes.DEFAULT)
                  }).default ? i.autoselect = !0 : i.autoselect = /yes/i.test(s.attributes.AUTOSELECT), s.attributes.LANGUAGE && (i.language = s.attributes.LANGUAGE), s.attributes.URI && (i.uri = s.attributes.URI), s.attributes["INSTREAM-ID"] && (i.instreamId = s.attributes["INSTREAM-ID"]), s.attributes.CHARACTERISTICS && (i.characteristics = s.attributes.CHARACTERISTICS), s.attributes.FORCED && (i.forced = /yes/i.test(s.attributes.FORCED)), t[s.attributes.NAME] = i) : this.trigger("warn", {
                    message: "ignoring incomplete or missing media group"
                  });
                },
                discontinuity: function () {
                  d += 1, u.discontinuity = !0, this.manifest.discontinuityStarts.push(o.length);
                },
                "program-date-time": function () {
                  "undefined" == typeof this.manifest.dateTimeString && (this.manifest.dateTimeString = s.dateTimeString, this.manifest.dateTimeObject = s.dateTimeObject), u.dateTimeString = s.dateTimeString, u.dateTimeObject = s.dateTimeObject;
                },
                targetduration: function () {
                  !isFinite(s.duration) || s.duration < 0 ? this.trigger("warn", {
                    message: "ignoring invalid target duration: " + s.duration
                  }) : (this.manifest.targetDuration = s.duration, lr.call(this, this.manifest));
                },
                start: function () {
                  s.attributes && !isNaN(s.attributes["TIME-OFFSET"]) ? this.manifest.start = {
                    timeOffset: s.attributes["TIME-OFFSET"],
                    precise: s.attributes.PRECISE
                  } : this.trigger("warn", {
                    message: "ignoring start declaration without appropriate attribute list"
                  });
                },
                "cue-out": function () {
                  u.cueOut = s.data;
                },
                "cue-out-cont": function () {
                  u.cueOutCont = s.data;
                },
                "cue-in": function () {
                  u.cueIn = s.data;
                },
                skip: function () {
                  this.manifest.skip = ur(s.attributes), this.warnOnMissingAttributes_("#EXT-X-SKIP", s.attributes, ["SKIPPED-SEGMENTS"]);
                },
                part: function () {
                  var i = this;
                  l = !0;
                  var e = this.manifest.segments.length,
                      t = ur(s.attributes);
                  u.parts = u.parts || [], u.parts.push(t), t.byterange && (t.byterange.hasOwnProperty("offset") || (t.byterange.offset = p), p = t.byterange.offset + t.byterange.length);
                  var n = u.parts.length - 1;
                  this.warnOnMissingAttributes_("#EXT-X-PART #" + n + " for segment #" + e, s.attributes, ["URI", "DURATION"]), this.manifest.renditionReports && this.manifest.renditionReports.forEach(function (e, t) {
                    e.hasOwnProperty("lastPart") || i.trigger("warn", {
                      message: "#EXT-X-RENDITION-REPORT #" + t + " lacks required attribute(s): LAST-PART"
                    });
                  });
                },
                "server-control": function () {
                  var e = this.manifest.serverControl = ur(s.attributes);
                  e.hasOwnProperty("canBlockReload") || (e.canBlockReload = !1, this.trigger("info", {
                    message: "#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"
                  })), lr.call(this, this.manifest), e.canSkipDateranges && !e.hasOwnProperty("canSkipUntil") && this.trigger("warn", {
                    message: "#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"
                  });
                },
                "preload-hint": function () {
                  var e = this.manifest.segments.length,
                      t = ur(s.attributes),
                      i = t.type && "PART" === t.type;
                  u.preloadHints = u.preloadHints || [], u.preloadHints.push(t), t.byterange && (t.byterange.hasOwnProperty("offset") || (t.byterange.offset = i ? p : 0, i && (p = t.byterange.offset + t.byterange.length)));
                  var n = u.preloadHints.length - 1;
                  if (this.warnOnMissingAttributes_("#EXT-X-PRELOAD-HINT #" + n + " for segment #" + e, s.attributes, ["TYPE", "URI"]), t.type) for (var r = 0; r < u.preloadHints.length - 1; r++) {
                    var a = u.preloadHints[r];
                    a.type && a.type === t.type && this.trigger("warn", {
                      message: "#EXT-X-PRELOAD-HINT #" + n + " for segment #" + e + " has the same TYPE " + t.type + " as preload hint #" + r
                    });
                  }
                },
                "rendition-report": function () {
                  var e = ur(s.attributes);
                  this.manifest.renditionReports = this.manifest.renditionReports || [], this.manifest.renditionReports.push(e);
                  var t = this.manifest.renditionReports.length - 1,
                      e = ["LAST-MSN", "URI"];
                  l && e.push("LAST-PART"), this.warnOnMissingAttributes_("#EXT-X-RENDITION-REPORT #" + t, s.attributes, e);
                },
                "part-inf": function () {
                  this.manifest.partInf = ur(s.attributes), this.warnOnMissingAttributes_("#EXT-X-PART-INF", s.attributes, ["PART-TARGET"]), this.manifest.partInf.partTarget && (this.manifest.partTargetDuration = this.manifest.partInf.partTarget), lr.call(this, this.manifest);
                }
              })[s.tagType] || function () {}).call(a);
            },
            uri: function () {
              u.uri = s.uri, o.push(u), !this.manifest.targetDuration || "duration" in u || (this.trigger("warn", {
                message: "defaulting segment duration to the target duration"
              }), u.duration = this.manifest.targetDuration), r && (u.key = r), u.timeline = d, n && (u.map = n), p = 0, u = {};
            },
            comment: function () {},
            custom: function () {
              s.segment ? (u.custom = u.custom || {}, u.custom[s.customType] = s.data) : (this.manifest.custom = this.manifest.custom || {}, this.manifest.custom[s.customType] = s.data);
            }
          })[s.type].call(a);
        }), e;
      }

      mt(e, t);
      var i = e.prototype;
      return i.warnOnMissingAttributes_ = function (e, t, i) {
        var n = [];
        i.forEach(function (e) {
          t.hasOwnProperty(e) || n.push(e);
        }), n.length && this.trigger("warn", {
          message: e + " lacks required attribute(s): " + n.join(", ")
        });
      }, i.push = function (e) {
        this.lineStream.push(e);
      }, i.end = function () {
        this.lineStream.push("\n"), this.trigger("end");
      }, i.addParser = function (e) {
        this.parseStream.addParser(e);
      }, i.addTagMapper = function (e) {
        this.parseStream.addTagMapper(e);
      }, e;
    }(nr),
        Tr = {
      mp4: /^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,
      webm: /^(vp0?[89]|av0?1|opus|vorbis)/,
      ogg: /^(vp0?[89]|theora|flac|opus|vorbis)/,
      video: /^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,
      audio: /^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,
      text: /^(stpp.ttml.im1t)/,
      muxerVideo: /^(avc0?1)/,
      muxerAudio: /^(mp4a)/,
      muxerText: /a^/
    },
        Sr = ["video", "audio", "text"],
        Er = ["Video", "Audio", "Text"],
        kr = "mp4a.40.2",
        Cr = /^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,
        wr = /^application\/dash\+xml/i,
        Ir = {
      entityMap: {
        lt: "<",
        gt: ">",
        amp: "&",
        quot: '"',
        apos: "'",
        Agrave: "À",
        Aacute: "Á",
        Acirc: "Â",
        Atilde: "Ã",
        Auml: "Ä",
        Aring: "Å",
        AElig: "Æ",
        Ccedil: "Ç",
        Egrave: "È",
        Eacute: "É",
        Ecirc: "Ê",
        Euml: "Ë",
        Igrave: "Ì",
        Iacute: "Í",
        Icirc: "Î",
        Iuml: "Ï",
        ETH: "Ð",
        Ntilde: "Ñ",
        Ograve: "Ò",
        Oacute: "Ó",
        Ocirc: "Ô",
        Otilde: "Õ",
        Ouml: "Ö",
        Oslash: "Ø",
        Ugrave: "Ù",
        Uacute: "Ú",
        Ucirc: "Û",
        Uuml: "Ü",
        Yacute: "Ý",
        THORN: "Þ",
        szlig: "ß",
        agrave: "à",
        aacute: "á",
        acirc: "â",
        atilde: "ã",
        auml: "ä",
        aring: "å",
        aelig: "æ",
        ccedil: "ç",
        egrave: "è",
        eacute: "é",
        ecirc: "ê",
        euml: "ë",
        igrave: "ì",
        iacute: "í",
        icirc: "î",
        iuml: "ï",
        eth: "ð",
        ntilde: "ñ",
        ograve: "ò",
        oacute: "ó",
        ocirc: "ô",
        otilde: "õ",
        ouml: "ö",
        oslash: "ø",
        ugrave: "ù",
        uacute: "ú",
        ucirc: "û",
        uuml: "ü",
        yacute: "ý",
        thorn: "þ",
        yuml: "ÿ",
        nbsp: " ",
        iexcl: "¡",
        cent: "¢",
        pound: "£",
        curren: "¤",
        yen: "¥",
        brvbar: "¦",
        sect: "§",
        uml: "¨",
        copy: "©",
        ordf: "ª",
        laquo: "«",
        not: "¬",
        shy: "­­",
        reg: "®",
        macr: "¯",
        deg: "°",
        plusmn: "±",
        sup2: "²",
        sup3: "³",
        acute: "´",
        micro: "µ",
        para: "¶",
        middot: "·",
        cedil: "¸",
        sup1: "¹",
        ordm: "º",
        raquo: "»",
        frac14: "¼",
        frac12: "½",
        frac34: "¾",
        iquest: "¿",
        times: "×",
        divide: "÷",
        forall: "∀",
        part: "∂",
        exist: "∃",
        empty: "∅",
        nabla: "∇",
        isin: "∈",
        notin: "∉",
        ni: "∋",
        prod: "∏",
        sum: "∑",
        minus: "−",
        lowast: "∗",
        radic: "√",
        prop: "∝",
        infin: "∞",
        ang: "∠",
        and: "∧",
        or: "∨",
        cap: "∩",
        cup: "∪",
        int: "∫",
        there4: "∴",
        sim: "∼",
        cong: "≅",
        asymp: "≈",
        ne: "≠",
        equiv: "≡",
        le: "≤",
        ge: "≥",
        sub: "⊂",
        sup: "⊃",
        nsub: "⊄",
        sube: "⊆",
        supe: "⊇",
        oplus: "⊕",
        otimes: "⊗",
        perp: "⊥",
        sdot: "⋅",
        Alpha: "Α",
        Beta: "Β",
        Gamma: "Γ",
        Delta: "Δ",
        Epsilon: "Ε",
        Zeta: "Ζ",
        Eta: "Η",
        Theta: "Θ",
        Iota: "Ι",
        Kappa: "Κ",
        Lambda: "Λ",
        Mu: "Μ",
        Nu: "Ν",
        Xi: "Ξ",
        Omicron: "Ο",
        Pi: "Π",
        Rho: "Ρ",
        Sigma: "Σ",
        Tau: "Τ",
        Upsilon: "Υ",
        Phi: "Φ",
        Chi: "Χ",
        Psi: "Ψ",
        Omega: "Ω",
        alpha: "α",
        beta: "β",
        gamma: "γ",
        delta: "δ",
        epsilon: "ε",
        zeta: "ζ",
        eta: "η",
        theta: "θ",
        iota: "ι",
        kappa: "κ",
        lambda: "λ",
        mu: "μ",
        nu: "ν",
        xi: "ξ",
        omicron: "ο",
        pi: "π",
        rho: "ρ",
        sigmaf: "ς",
        sigma: "σ",
        tau: "τ",
        upsilon: "υ",
        phi: "φ",
        chi: "χ",
        psi: "ψ",
        omega: "ω",
        thetasym: "ϑ",
        upsih: "ϒ",
        piv: "ϖ",
        OElig: "Œ",
        oelig: "œ",
        Scaron: "Š",
        scaron: "š",
        Yuml: "Ÿ",
        fnof: "ƒ",
        circ: "ˆ",
        tilde: "˜",
        ensp: " ",
        emsp: " ",
        thinsp: " ",
        zwnj: "‌",
        zwj: "‍",
        lrm: "‎",
        rlm: "‏",
        ndash: "–",
        mdash: "—",
        lsquo: "‘",
        rsquo: "’",
        sbquo: "‚",
        ldquo: "“",
        rdquo: "”",
        bdquo: "„",
        dagger: "†",
        Dagger: "‡",
        bull: "•",
        hellip: "…",
        permil: "‰",
        prime: "′",
        Prime: "″",
        lsaquo: "‹",
        rsaquo: "›",
        oline: "‾",
        euro: "€",
        trade: "™",
        larr: "←",
        uarr: "↑",
        rarr: "→",
        darr: "↓",
        harr: "↔",
        crarr: "↵",
        lceil: "⌈",
        rceil: "⌉",
        lfloor: "⌊",
        rfloor: "⌋",
        loz: "◊",
        spades: "♠",
        clubs: "♣",
        hearts: "♥",
        diams: "♦"
      }
    },
        z = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
        ii = new RegExp("[\\-\\.0-9" + z.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),
        xr = new RegExp("^" + z.source + ii.source + "*(?::" + z.source + ii.source + "*)?$"),
        Ar = 0,
        Pr = 1,
        Lr = 2,
        Dr = 3,
        Or = 4,
        Rr = 5,
        Mr = 6,
        Nr = 7;

    function Ur(e, t) {
      this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, Ur);
    }

    function Br() {}

    function Fr(e, t) {
      return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
    }

    function jr(e, t, i) {
      for (var n = e.tagName, r = null, a = e.length; a--;) {
        var s = e[a],
            o = s.qName,
            u = s.value,
            o = 0 < (c = o.indexOf(":")) ? (l = s.prefix = o.slice(0, c), d = o.slice(c + 1), "xmlns" === l && d) : (l = null, "xmlns" === (d = o) && "");
        s.localName = d, !1 !== o && (null == r && (r = {}, Hr(i, i = {})), i[o] = r[o] = u, s.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(o, u));
      }

      for (var l, a = e.length; a--;) (l = (s = e[a]).prefix) && ("xml" === l && (s.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== l && (s.uri = i[l || ""]));

      var c,
          d = 0 < (c = n.indexOf(":")) ? (l = e.prefix = n.slice(0, c), e.localName = n.slice(c + 1)) : (l = null, e.localName = n),
          h = e.uri = i[l || ""];
      if (t.startElement(h, d, n, e), !e.closed) return e.currentNSMap = i, e.localNSMap = r, 1;
      if (t.endElement(h, d, n), r) for (l in r) t.endPrefixMapping(l);
    }

    function Hr(e, t) {
      for (var i in e) t[i] = e[i];
    }

    function qr() {
      this.attributeNames = {};
    }

    (Ur.prototype = new Error()).name = Ur.name, Br.prototype = {
      parse: function (e, t, i) {
        var n = this.domBuilder;
        n.startDocument(), Hr(t, t = {}), function (i, e, n, r, a) {
          function s(e) {
            var t = e.slice(1, -1);
            return t in n ? n[t] : "#" === t.charAt(0) ? 65535 < (t = parseInt(t.substr(1).replace("x", "0x"))) ? (t -= 65536, String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t))) : String.fromCharCode(t) : (a.error("entity not found:" + e), e);
          }

          function t(e) {
            var t;
            f < e && (t = i.substring(f, e).replace(/&#?\w+;/g, s), d && o(f), r.characters(t, 0, e - f), f = e);
          }

          function o(e, t) {
            for (; l <= e && (t = c.exec(i));) u = t.index, l = u + t[0].length, d.lineNumber++;

            d.columnNumber = e - u + 1;
          }

          var u = 0,
              l = 0,
              c = /.*(?:\r\n?|\n)|.*$/g,
              d = r.locator,
              h = [{
            currentNSMap: e
          }],
              p = {},
              f = 0;

          for (;;) {
            try {
              var m,
                  g,
                  y = i.indexOf("<", f);
              if (y < 0) return i.substr(f).match(/^\s*$/) || (m = r.doc, g = m.createTextNode(i.substr(f)), m.appendChild(g), r.currentElement = g);

              switch (f < y && t(y), i.charAt(y + 1)) {
                case "/":
                  var v = i.indexOf(">", y + 3),
                      _ = i.substring(y + 2, v),
                      b = h.pop();

                  v < 0 ? (_ = i.substring(y + 2).replace(/[\s<].*/, ""), a.error("end tag name: " + _ + " is not complete:" + b.tagName), v = y + 1 + _.length) : _.match(/\s</) && (_ = _.replace(/[\s<].*/, ""), a.error("end tag name: " + _ + " maybe not complete"), v = y + 1 + _.length);
                  var T = b.localNSMap,
                      S = b.tagName == _;

                  if (S || b.tagName && b.tagName.toLowerCase() == _.toLowerCase()) {
                    if (r.endElement(b.uri, b.localName, _), T) for (var E in T) r.endPrefixMapping(E);
                    S || a.fatalError("end tag name: " + _ + " is not match the current start tagName:" + b.tagName);
                  } else h.push(b);

                  v++;
                  break;

                case "?":
                  d && o(y), v = function (e, t, i) {
                    var n = e.indexOf("?>", t);

                    if (n) {
                      t = e.substring(t, n).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                      return t ? (t[0].length, i.processingInstruction(t[1], t[2]), n + 2) : -1;
                    }

                    return -1;
                  }(i, y, r);
                  break;

                case "!":
                  d && o(y), v = function (e, t, i, n) {
                    {
                      if ("-" === e.charAt(t + 2)) {
                        if ("-" !== e.charAt(t + 3)) return -1;
                        var r = e.indexOf("--\x3e", t + 4);
                        return t < r ? (i.comment(e, t + 4, r - t - 4), r + 3) : (n.error("Unclosed comment"), -1);
                      }

                      if ("CDATA[" == e.substr(t + 3, 6)) {
                        r = e.indexOf("]]>", t + 9);
                        return i.startCDATA(), i.characters(e, t + 9, r - t - 9), i.endCDATA(), r + 3;
                      }

                      var a = function (e, t) {
                        var i,
                            n = [],
                            r = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                        r.lastIndex = t, r.exec(e);

                        for (; i = r.exec(e);) if (n.push(i), i[1]) return n;
                      }(e, t),
                          n = a.length;

                      if (1 < n && /!doctype/i.test(a[0][0])) {
                        r = a[1][0], e = !1, t = !1;
                        3 < n && (/^public$/i.test(a[2][0]) ? (e = a[3][0], t = 4 < n && a[4][0]) : /^system$/i.test(a[2][0]) && (t = a[3][0]));
                        n = a[n - 1];
                        return i.startDTD(r, e, t), i.endDTD(), n.index + n[0].length;
                      }
                    }
                    return -1;
                  }(i, y, r, a);
                  break;

                default:
                  d && o(y);

                  var k = new qr(),
                      C = h[h.length - 1].currentNSMap,
                      v = function (e, t, n, i, r, a) {
                    function s(e, t, i) {
                      e in n.attributeNames && a.fatalError("Attribute " + e + " redefined"), n.addValue(e, t, i);
                    }

                    var o,
                        u = ++t,
                        l = Ar;

                    for (;;) {
                      var c = e.charAt(u);

                      switch (c) {
                        case "=":
                          if (l === Pr) o = e.slice(t, u), l = Dr;else {
                            if (l !== Lr) throw new Error("attribute equal must after attrName");
                            l = Dr;
                          }
                          break;

                        case "'":
                        case '"':
                          if (l === Dr || l === Pr) {
                            if (l === Pr && (a.warning('attribute value must after "="'), o = e.slice(t, u)), t = u + 1, !(0 < (u = e.indexOf(c, t)))) throw new Error("attribute value no end '" + c + "' match");
                            d = e.slice(t, u).replace(/&#?\w+;/g, r), s(o, d, t - 1), l = Rr;
                          } else {
                            if (l != Or) throw new Error('attribute value must after "="');
                            d = e.slice(t, u).replace(/&#?\w+;/g, r), s(o, d, t), a.warning('attribute "' + o + '" missed start quot(' + c + ")!!"), t = u + 1, l = Rr;
                          }

                          break;

                        case "/":
                          switch (l) {
                            case Ar:
                              n.setTagName(e.slice(t, u));

                            case Rr:
                            case Mr:
                            case Nr:
                              l = Nr, n.closed = !0;

                            case Or:
                            case Pr:
                            case Lr:
                              break;

                            default:
                              throw new Error("attribute invalid close char('/')");
                          }

                          break;

                        case "":
                          return a.error("unexpected end of input"), l == Ar && n.setTagName(e.slice(t, u)), u;

                        case ">":
                          switch (l) {
                            case Ar:
                              n.setTagName(e.slice(t, u));

                            case Rr:
                            case Mr:
                            case Nr:
                              break;

                            case Or:
                            case Pr:
                              "/" === (d = e.slice(t, u)).slice(-1) && (n.closed = !0, d = d.slice(0, -1));

                            case Lr:
                              l === Lr && (d = o), l == Or ? (a.warning('attribute "' + d + '" missed quot(")!'), s(o, d.replace(/&#?\w+;/g, r), t)) : ("http://www.w3.org/1999/xhtml" === i[""] && d.match(/^(?:disabled|checked|selected)$/i) || a.warning('attribute "' + d + '" missed value!! "' + d + '" instead!!'), s(d, d, t));
                              break;

                            case Dr:
                              throw new Error("attribute value missed!!");
                          }

                          return u;

                        case "":
                          c = " ";

                        default:
                          if (c <= " ") switch (l) {
                            case Ar:
                              n.setTagName(e.slice(t, u)), l = Mr;
                              break;

                            case Pr:
                              o = e.slice(t, u), l = Lr;
                              break;

                            case Or:
                              var d = e.slice(t, u).replace(/&#?\w+;/g, r);
                              a.warning('attribute "' + d + '" missed quot(")!!'), s(o, d, t);

                            case Rr:
                              l = Mr;
                          } else switch (l) {
                            case Lr:
                              n.tagName, "http://www.w3.org/1999/xhtml" === i[""] && o.match(/^(?:disabled|checked|selected)$/i) || a.warning('attribute "' + o + '" missed value!! "' + o + '" instead2!!'), s(o, o, t), t = u, l = Pr;
                              break;

                            case Rr:
                              a.warning('attribute space is required"' + o + '"!!');

                            case Mr:
                              l = Pr, t = u;
                              break;

                            case Dr:
                              l = Or, t = u;
                              break;

                            case Nr:
                              throw new Error("elements closed character '/' and '>' must be connected to");
                          }
                      }

                      u++;
                    }
                  }(i, y, k, C, s, a),
                      w = k.length;

                  if (!k.closed && function (e, t, i, n) {
                    var r = n[i];
                    null == r && ((r = e.lastIndexOf("</" + i + ">")) < t && (r = e.lastIndexOf("</" + i)), n[i] = r);
                    return r < t;
                  }(i, v, k.tagName, p) && (k.closed = !0, n.nbsp || a.warning("unclosed xml attribute")), d && w) {
                    for (var I = Fr(d, {}), x = 0; x < w; x++) {
                      var A = k[x];
                      o(A.offset), A.locator = Fr(d, {});
                    }

                    r.locator = I, jr(k, r, C) && h.push(k), r.locator = d;
                  } else jr(k, r, C) && h.push(k);

                  "http://www.w3.org/1999/xhtml" !== k.uri || k.closed ? v++ : v = function (e, t, i, n, r) {
                    if (/^(?:script|textarea)$/i.test(i)) {
                      var a = e.indexOf("</" + i + ">", t),
                          e = e.substring(t + 1, a);
                      if (/[&<]/.test(e)) return /^script$/i.test(i) || (e = e.replace(/&#?\w+;/g, n)), r.characters(e, 0, e.length), a;
                    }

                    return t + 1;
                  }(i, v, k.tagName, s, r);
              }
            } catch (e) {
              if (e instanceof Ur) throw e;
              a.error("element parse error: " + e), v = -1;
            }

            f < v ? f = v : t(Math.max(y, f) + 1);
          }
        }(e, t, i, n, this.errorHandler), n.endDocument();
      }
    }, qr.prototype = {
      setTagName: function (e) {
        if (!xr.test(e)) throw new Error("invalid tagName:" + e);
        this.tagName = e;
      },
      addValue: function (e, t, i) {
        if (!xr.test(e)) throw new Error("invalid attribute:" + e);
        this.attributeNames[e] = this.length, this[this.length++] = {
          qName: e,
          value: t,
          offset: i
        };
      },
      length: 0,
      getLocalName: function (e) {
        return this[e].localName;
      },
      getLocator: function (e) {
        return this[e].locator;
      },
      getQName: function (e) {
        return this[e].qName;
      },
      getURI: function (e) {
        return this[e].uri;
      },
      getValue: function (e) {
        return this[e].value;
      }
    };
    var Vr = {
      XMLReader: Br,
      ParseError: Ur
    };

    function Wr(e, t) {
      for (var i in e) t[i] = e[i];
    }

    function zr(e, t) {
      var i,
          n = e.prototype;
      n instanceof t || ((i = function () {}).prototype = t.prototype, Wr(n, i = new i()), e.prototype = n = i), n.constructor != e && (n.constructor = e);
    }

    var Gr = "http://www.w3.org/1999/xhtml",
        ni = {},
        Xr = ni.ELEMENT_NODE = 1,
        Kr = ni.ATTRIBUTE_NODE = 2,
        Yr = ni.TEXT_NODE = 3,
        Qr = ni.CDATA_SECTION_NODE = 4,
        $r = ni.ENTITY_REFERENCE_NODE = 5,
        Jr = (ni.ENTITY_NODE = 6, ni.PROCESSING_INSTRUCTION_NODE = 7),
        Zr = ni.COMMENT_NODE = 8,
        ea = ni.DOCUMENT_NODE = 9,
        ta = ni.DOCUMENT_TYPE_NODE = 10,
        ia = ni.DOCUMENT_FRAGMENT_NODE = 11,
        zt = (ni.NOTATION_NODE = 12, {}),
        na = {};
    zt.INDEX_SIZE_ERR = (na[1] = "Index size error", 1), zt.DOMSTRING_SIZE_ERR = (na[2] = "DOMString size error", 2);
    zt.HIERARCHY_REQUEST_ERR = (na[3] = "Hierarchy request error", 3);
    zt.WRONG_DOCUMENT_ERR = (na[4] = "Wrong document", 4), zt.INVALID_CHARACTER_ERR = (na[5] = "Invalid character", 5), zt.NO_DATA_ALLOWED_ERR = (na[6] = "No data allowed", 6), zt.NO_MODIFICATION_ALLOWED_ERR = (na[7] = "No modification allowed", 7);
    zt.NOT_FOUND_ERR = (na[8] = "Not found", 8);
    zt.NOT_SUPPORTED_ERR = (na[9] = "Not supported", 9);
    var ra;
    zt.INUSE_ATTRIBUTE_ERR = (na[10] = "Attribute in use", 10);

    function aa(e, t) {
      var i;
      return t instanceof Error ? i = t : (i = this, Error.call(this, na[e]), this.message = na[e], Error.captureStackTrace && Error.captureStackTrace(this, aa)), i.code = e, t && (this.message = this.message + ": " + t), i;
    }

    function sa() {}

    function oa(e, t) {
      this._node = e, this._refresh = t, ua(this);
    }

    function ua(e) {
      var t,
          i = e._node._inc || e._node.ownerDocument._inc;
      e._inc != i && (t = e._refresh(e._node), Ba(e, "length", t.length), Wr(t, e), e._inc = i);
    }

    function la() {}

    function ca(e, t) {
      for (var i = e.length; i--;) if (e[i] === t) return i;
    }

    function da(e, t, i, n) {
      n ? t[ca(t, n)] = i : t[t.length++] = i, !e || (t = (i.ownerElement = e).ownerDocument) && (n && va(t, e, n), e = e, i = i, (t = t) && t._inc++, "http://www.w3.org/2000/xmlns/" == i.namespaceURI && (e._nsMap[i.prefix ? i.localName : ""] = i.value));
    }

    function ha(e, t, i) {
      var n = ca(t, i);
      if (!(0 <= n)) throw aa(8, new Error(e.tagName + "@" + i));

      for (var r, a = t.length - 1; n < a;) t[n] = t[++n];

      t.length = a, !e || (r = e.ownerDocument) && (va(r, e, i), i.ownerElement = null);
    }

    function pa(e) {
      if (this._features = {}, e) for (var t in e) this._features = e[t];
    }

    function fa() {}

    function ma(e) {
      return ("<" == e ? "&lt;" : ">" == e && "&gt;") || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";";
    }

    function ga(e, t) {
      if (t(e)) return 1;
      if (e = e.firstChild) do {
        if (ga(e, t)) return 1;
      } while (e = e.nextSibling);
    }

    function ya() {}

    function va(e, t, i) {
      e && e._inc++, "http://www.w3.org/2000/xmlns/" == i.namespaceURI && delete t._nsMap[i.prefix ? i.localName : ""];
    }

    function _a(e, t, i) {
      if (e && e._inc) {
        e._inc++;
        var n = t.childNodes;
        if (i) n[n.length++] = i;else {
          for (var r = t.firstChild, a = 0; r;) r = (n[a++] = r).nextSibling;

          n.length = a;
        }
      }
    }

    function ba(e, t) {
      var i = t.previousSibling,
          n = t.nextSibling;
      return i ? i.nextSibling = n : e.firstChild = n, n ? n.previousSibling = i : e.lastChild = i, _a(e.ownerDocument, e), t;
    }

    function Ta(e, t, i) {
      var n = t.parentNode;

      if (n && n.removeChild(t), t.nodeType === ia) {
        var r = t.firstChild;
        if (null == r) return t;
        var a = t.lastChild;
      } else r = a = t;

      n = i ? i.previousSibling : e.lastChild;

      for (r.previousSibling = n, a.nextSibling = i, n ? n.nextSibling = r : e.firstChild = r, null == i ? e.lastChild = a : i.previousSibling = a; r.parentNode = e, r !== a && (r = r.nextSibling););

      return _a(e.ownerDocument || e, e), t.nodeType == ia && (t.firstChild = t.lastChild = null), t;
    }

    function Sa() {
      this._nsMap = {};
    }

    function Ea() {}

    function ka() {}

    function Ca() {}

    function wa() {}

    function Ia() {}

    function xa() {}

    function Aa() {}

    function Pa() {}

    function La() {}

    function Da() {}

    function Oa() {}

    function Ra() {}

    function Ma(e, t) {
      var i,
          n = [],
          r = 9 == this.nodeType && this.documentElement || this,
          a = r.prefix,
          s = r.namespaceURI;
      return Ua(this, n, e, t, i = s && null == a && null == (a = r.lookupPrefix(s)) ? [{
        namespace: s,
        prefix: null
      }] : i), n.join("");
    }

    function Na(e, t, i) {
      var n = e.prefix || "",
          r = e.namespaceURI;

      if ((n || r) && ("xml" !== n || "http://www.w3.org/XML/1998/namespace" !== r) && "http://www.w3.org/2000/xmlns/" != r) {
        for (var a = i.length; a--;) {
          var s = i[a];
          if (s.prefix == n) return s.namespace != r;
        }

        return 1;
      }
    }

    function Ua(e, t, i, n, r) {
      if (n) {
        if (!(e = n(e))) return;
        if ("string" == typeof e) return void t.push(e);
      }

      switch (e.nodeType) {
        case Xr:
          (r = r || []).length;
          var a = e.attributes,
              s = a.length,
              o = e.firstChild,
              u = e.tagName;
          i = Gr === e.namespaceURI || i, t.push("<", u);

          for (var l = 0; l < s; l++) "xmlns" == (c = a.item(l)).prefix ? r.push({
            prefix: c.localName,
            namespace: c.value
          }) : "xmlns" == c.nodeName && r.push({
            prefix: "",
            namespace: c.value
          });

          for (var c, d, h, l = 0; l < s; l++) Na(c = a.item(l), 0, r) && (d = c.prefix || "", h = c.namespaceURI, t.push(d ? " xmlns:" + d : " xmlns", '="', h, '"'), r.push({
            prefix: d,
            namespace: h
          })), Ua(c, t, i, n, r);

          if (Na(e, 0, r) && (d = e.prefix || "", h = e.namespaceURI, t.push(d ? " xmlns:" + d : " xmlns", '="', h, '"'), r.push({
            prefix: d,
            namespace: h
          })), o || i && !/^(?:meta|link|img|br|hr|input)$/i.test(u)) {
            if (t.push(">"), i && /^script$/i.test(u)) for (; o;) o.data ? t.push(o.data) : Ua(o, t, i, n, r), o = o.nextSibling;else for (; o;) Ua(o, t, i, n, r), o = o.nextSibling;
            t.push("</", u, ">");
          } else t.push("/>");

          return;

        case ea:
        case ia:
          for (o = e.firstChild; o;) Ua(o, t, i, n, r), o = o.nextSibling;

          return;

        case Kr:
          return t.push(" ", e.name, '="', e.value.replace(/[&"]/g, ma), '"');

        case Yr:
          return t.push(e.data.replace(/[<&]/g, ma).replace(/]]>/g, "]]&gt;"));

        case Qr:
          return t.push("<![CDATA[", e.data, "]]>");

        case Zr:
          return t.push("\x3c!--", e.data, "--\x3e");

        case ta:
          var p = e.publicId,
              u = e.systemId;
          return t.push("<!DOCTYPE ", e.name), void (p ? (t.push(" PUBLIC ", p), u && "." != u && t.push(" ", u), t.push(">")) : u && "." != u ? t.push(" SYSTEM ", u, ">") : ((u = e.internalSubset) && t.push(" [", u, "]"), t.push(">")));

        case Jr:
          return t.push("<?", e.target, " ", e.data, "?>");

        case $r:
          return t.push("&", e.nodeName, ";");

        default:
          t.push("??", e.nodeName);
      }
    }

    function Ba(e, t, i) {
      e[t] = i;
    }

    zt.INVALID_STATE_ERR = (na[11] = "Invalid state", 11), zt.SYNTAX_ERR = (na[12] = "Syntax error", 12), zt.INVALID_MODIFICATION_ERR = (na[13] = "Invalid modification", 13), zt.NAMESPACE_ERR = (na[14] = "Invalid namespace", 14), zt.INVALID_ACCESS_ERR = (na[15] = "Invalid access", 15), aa.prototype = Error.prototype, Wr(zt, aa), sa.prototype = {
      length: 0,
      item: function (e) {
        return this[e] || null;
      },
      toString: function (e, t) {
        for (var i = [], n = 0; n < this.length; n++) Ua(this[n], i, e, t);

        return i.join("");
      }
    }, oa.prototype.item = function (e) {
      return ua(this), this[e];
    }, zr(oa, sa), la.prototype = {
      length: 0,
      item: sa.prototype.item,
      getNamedItem: function (e) {
        for (var t = this.length; t--;) {
          var i = this[t];
          if (i.nodeName == e) return i;
        }
      },
      setNamedItem: function (e) {
        var t = e.ownerElement;
        if (t && t != this._ownerElement) throw new aa(10);
        t = this.getNamedItem(e.nodeName);
        return da(this._ownerElement, this, e, t), t;
      },
      setNamedItemNS: function (e) {
        var t = e.ownerElement;
        if (t && t != this._ownerElement) throw new aa(10);
        return t = this.getNamedItemNS(e.namespaceURI, e.localName), da(this._ownerElement, this, e, t), t;
      },
      removeNamedItem: function (e) {
        e = this.getNamedItem(e);
        return ha(this._ownerElement, this, e), e;
      },
      removeNamedItemNS: function (e, t) {
        t = this.getNamedItemNS(e, t);
        return ha(this._ownerElement, this, t), t;
      },
      getNamedItemNS: function (e, t) {
        for (var i = this.length; i--;) {
          var n = this[i];
          if (n.localName == t && n.namespaceURI == e) return n;
        }

        return null;
      }
    }, pa.prototype = {
      hasFeature: function (e, t) {
        e = this._features[e.toLowerCase()];
        return !(!e || t && !(t in e));
      },
      createDocument: function (e, t, i) {
        var n = new ya();
        return n.implementation = this, n.childNodes = new sa(), (n.doctype = i) && n.appendChild(i), t && (t = n.createElementNS(e, t), n.appendChild(t)), n;
      },
      createDocumentType: function (e, t, i) {
        var n = new xa();
        return n.name = e, n.nodeName = e, n.publicId = t, n.systemId = i, n;
      }
    }, fa.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      insertBefore: function (e, t) {
        return Ta(this, e, t);
      },
      replaceChild: function (e, t) {
        this.insertBefore(e, t), t && this.removeChild(t);
      },
      removeChild: function (e) {
        return ba(this, e);
      },
      appendChild: function (e) {
        return this.insertBefore(e, null);
      },
      hasChildNodes: function () {
        return null != this.firstChild;
      },
      cloneNode: function (e) {
        return function e(t, i, n) {
          var r = new i.constructor();

          for (var a in i) {
            var s = i[a];
            "object" != typeof s && s != r[a] && (r[a] = s);
          }

          i.childNodes && (r.childNodes = new sa());
          r.ownerDocument = t;

          switch (r.nodeType) {
            case Xr:
              var o = i.attributes,
                  u = r.attributes = new la(),
                  l = o.length;
              u._ownerElement = r;

              for (var c = 0; c < l; c++) r.setAttributeNode(e(t, o.item(c), !0));

              break;

            case Kr:
              n = !0;
          }

          if (n) for (var d = i.firstChild; d;) r.appendChild(e(t, d, n)), d = d.nextSibling;
          return r;
        }(this.ownerDocument || this, this, e);
      },
      normalize: function () {
        for (var e = this.firstChild; e;) {
          var t = e.nextSibling;
          t && t.nodeType == Yr && e.nodeType == Yr ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
        }
      },
      isSupported: function (e, t) {
        return this.ownerDocument.implementation.hasFeature(e, t);
      },
      hasAttributes: function () {
        return 0 < this.attributes.length;
      },
      lookupPrefix: function (e) {
        for (var t = this; t;) {
          var i = t._nsMap;
          if (i) for (var n in i) if (i[n] == e) return n;
          t = t.nodeType == Kr ? t.ownerDocument : t.parentNode;
        }

        return null;
      },
      lookupNamespaceURI: function (e) {
        for (var t = this; t;) {
          var i = t._nsMap;
          if (i && e in i) return i[e];
          t = t.nodeType == Kr ? t.ownerDocument : t.parentNode;
        }

        return null;
      },
      isDefaultNamespace: function (e) {
        return null == this.lookupPrefix(e);
      }
    }, Wr(ni, fa), Wr(ni, fa.prototype), ya.prototype = {
      nodeName: "#document",
      nodeType: ea,
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function (e, t) {
        if (e.nodeType != ia) return null == this.documentElement && e.nodeType == Xr && (this.documentElement = e), Ta(this, e, t), e.ownerDocument = this, e;

        for (var i = e.firstChild; i;) {
          var n = i.nextSibling;
          this.insertBefore(i, t), i = n;
        }

        return e;
      },
      removeChild: function (e) {
        return this.documentElement == e && (this.documentElement = null), ba(this, e);
      },
      importNode: function (e, t) {
        return function e(t, i, n) {
          var r;

          switch (i.nodeType) {
            case Xr:
              (r = i.cloneNode(!1)).ownerDocument = t;

            case ia:
              break;

            case Kr:
              n = !0;
          }

          r = r || i.cloneNode(!1);
          r.ownerDocument = t;
          r.parentNode = null;
          if (n) for (var a = i.firstChild; a;) r.appendChild(e(t, a, n)), a = a.nextSibling;
          return r;
        }(this, e, t);
      },
      getElementById: function (t) {
        var i = null;
        return ga(this.documentElement, function (e) {
          if (e.nodeType == Xr && e.getAttribute("id") == t) return i = e, !0;
        }), i;
      },
      getElementsByClassName: function (e) {
        var n = new RegExp("(^|\\s)" + e + "(\\s|$)");
        return new oa(this, function (t) {
          var i = [];
          return ga(t.documentElement, function (e) {
            e !== t && e.nodeType == Xr && n.test(e.getAttribute("class")) && i.push(e);
          }), i;
        });
      },
      createElement: function (e) {
        var t = new Sa();
        return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new sa(), (t.attributes = new la())._ownerElement = t;
      },
      createDocumentFragment: function () {
        var e = new Da();
        return e.ownerDocument = this, e.childNodes = new sa(), e;
      },
      createTextNode: function (e) {
        var t = new Ca();
        return t.ownerDocument = this, t.appendData(e), t;
      },
      createComment: function (e) {
        var t = new wa();
        return t.ownerDocument = this, t.appendData(e), t;
      },
      createCDATASection: function (e) {
        var t = new Ia();
        return t.ownerDocument = this, t.appendData(e), t;
      },
      createProcessingInstruction: function (e, t) {
        var i = new Oa();
        return i.ownerDocument = this, i.tagName = i.target = e, i.nodeValue = i.data = t, i;
      },
      createAttribute: function (e) {
        var t = new Ea();
        return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
      },
      createEntityReference: function (e) {
        var t = new La();
        return t.ownerDocument = this, t.nodeName = e, t;
      },
      createElementNS: function (e, t) {
        var i = new Sa(),
            n = t.split(":"),
            r = i.attributes = new la();
        return i.childNodes = new sa(), i.ownerDocument = this, i.nodeName = t, i.tagName = t, i.namespaceURI = e, 2 == n.length ? (i.prefix = n[0], i.localName = n[1]) : i.localName = t, r._ownerElement = i;
      },
      createAttributeNS: function (e, t) {
        var i = new Ea(),
            n = t.split(":");
        return i.ownerDocument = this, i.nodeName = t, i.name = t, i.namespaceURI = e, i.specified = !0, 2 == n.length ? (i.prefix = n[0], i.localName = n[1]) : i.localName = t, i;
      }
    }, zr(ya, fa), ya.prototype.getElementsByTagName = (Sa.prototype = {
      nodeType: Xr,
      hasAttribute: function (e) {
        return null != this.getAttributeNode(e);
      },
      getAttribute: function (e) {
        e = this.getAttributeNode(e);
        return e && e.value || "";
      },
      getAttributeNode: function (e) {
        return this.attributes.getNamedItem(e);
      },
      setAttribute: function (e, t) {
        e = this.ownerDocument.createAttribute(e);
        e.value = e.nodeValue = "" + t, this.setAttributeNode(e);
      },
      removeAttribute: function (e) {
        e = this.getAttributeNode(e);
        e && this.removeAttributeNode(e);
      },
      appendChild: function (e) {
        return e.nodeType === ia ? this.insertBefore(e, null) : function (e, t) {
          var i = t.parentNode;
          i && (n = e.lastChild, i.removeChild(t), n = e.lastChild);
          var n = e.lastChild;
          return t.parentNode = e, t.previousSibling = n, t.nextSibling = null, n ? n.nextSibling = t : e.firstChild = t, e.lastChild = t, _a(e.ownerDocument, e, t), t;
        }(this, e);
      },
      setAttributeNode: function (e) {
        return this.attributes.setNamedItem(e);
      },
      setAttributeNodeNS: function (e) {
        return this.attributes.setNamedItemNS(e);
      },
      removeAttributeNode: function (e) {
        return this.attributes.removeNamedItem(e.nodeName);
      },
      removeAttributeNS: function (e, t) {
        t = this.getAttributeNodeNS(e, t);
        t && this.removeAttributeNode(t);
      },
      hasAttributeNS: function (e, t) {
        return null != this.getAttributeNodeNS(e, t);
      },
      getAttributeNS: function (e, t) {
        t = this.getAttributeNodeNS(e, t);
        return t && t.value || "";
      },
      setAttributeNS: function (e, t, i) {
        t = this.ownerDocument.createAttributeNS(e, t);
        t.value = t.nodeValue = "" + i, this.setAttributeNode(t);
      },
      getAttributeNodeNS: function (e, t) {
        return this.attributes.getNamedItemNS(e, t);
      },
      getElementsByTagName: function (n) {
        return new oa(this, function (t) {
          var i = [];
          return ga(t, function (e) {
            e === t || e.nodeType != Xr || "*" !== n && e.tagName != n || i.push(e);
          }), i;
        });
      },
      getElementsByTagNameNS: function (n, r) {
        return new oa(this, function (t) {
          var i = [];
          return ga(t, function (e) {
            e === t || e.nodeType !== Xr || "*" !== n && e.namespaceURI !== n || "*" !== r && e.localName != r || i.push(e);
          }), i;
        });
      }
    }).getElementsByTagName, ya.prototype.getElementsByTagNameNS = Sa.prototype.getElementsByTagNameNS, zr(Sa, fa), Ea.prototype.nodeType = Kr, zr(Ea, fa), ka.prototype = {
      data: "",
      substringData: function (e, t) {
        return this.data.substring(e, e + t);
      },
      appendData: function (e) {
        e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
      },
      insertData: function (e, t) {
        this.replaceData(e, 0, t);
      },
      appendChild: function (e) {
        throw new Error(na[3]);
      },
      deleteData: function (e, t) {
        this.replaceData(e, t, "");
      },
      replaceData: function (e, t, i) {
        var n = this.data.substring(0, e),
            t = this.data.substring(e + t);
        this.nodeValue = this.data = i = n + i + t, this.length = i.length;
      }
    }, zr(ka, fa), Ca.prototype = {
      nodeName: "#text",
      nodeType: Yr,
      splitText: function (e) {
        var t = (i = this.data).substring(e),
            i = i.substring(0, e);
        this.data = this.nodeValue = i, this.length = i.length;
        t = this.ownerDocument.createTextNode(t);
        return this.parentNode && this.parentNode.insertBefore(t, this.nextSibling), t;
      }
    }, zr(Ca, ka), wa.prototype = {
      nodeName: "#comment",
      nodeType: Zr
    }, zr(wa, ka), Ia.prototype = {
      nodeName: "#cdata-section",
      nodeType: Qr
    }, zr(Ia, ka), xa.prototype.nodeType = ta, zr(xa, fa), Aa.prototype.nodeType = 12, zr(Aa, fa), Pa.prototype.nodeType = 6, zr(Pa, fa), La.prototype.nodeType = $r, zr(La, fa), Da.prototype.nodeName = "#document-fragment", Da.prototype.nodeType = ia, zr(Da, fa), Oa.prototype.nodeType = Jr, zr(Oa, fa), Ra.prototype.serializeToString = function (e, t, i) {
      return Ma.call(e, t, i);
    }, fa.prototype.toString = Ma;

    try {
      Object.defineProperty && (ra = function e(t) {
        switch (t.nodeType) {
          case Xr:
          case ia:
            var i = [];

            for (t = t.firstChild; t;) 7 !== t.nodeType && 8 !== t.nodeType && i.push(e(t)), t = t.nextSibling;

            return i.join("");

          default:
            return t.nodeValue;
        }
      }, Object.defineProperty(oa.prototype, "length", {
        get: function () {
          return ua(this), this.$$length;
        }
      }), Object.defineProperty(fa.prototype, "textContent", {
        get: function () {
          return ra(this);
        },
        set: function (e) {
          switch (this.nodeType) {
            case Xr:
            case ia:
              for (; this.firstChild;) this.removeChild(this.firstChild);

              (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
              break;

            default:
              this.data = e, this.value = e, this.nodeValue = e;
          }
        }
      }), Ba = function (e, t, i) {
        e["$$" + t] = i;
      });
    } catch (e) {}

    var Fa = {
      Node: fa,
      DOMException: aa,
      DOMImplementation: pa,
      XMLSerializer: Ra
    },
        nr = t(function (e, t) {
      function i(e) {
        this.options = e || {
          locator: {}
        };
      }

      function l() {
        this.cdata = !1;
      }

      function c(e, t) {
        t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
      }

      function d(e) {
        if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
      }

      function r(e, t, i) {
        return "string" == typeof e ? e.substr(t, i) : e.length >= t + i || t ? new java.lang.String(e, t, i) + "" : e;
      }

      function h(e, t) {
        (e.currentElement || e.doc).appendChild(t);
      }

      i.prototype.parseFromString = function (e, t) {
        var i = this.options,
            n = new p(),
            r = i.domBuilder || new l(),
            a = i.errorHandler,
            s = i.locator,
            o = i.xmlns || {},
            u = /\/x?html?$/.test(t),
            t = u ? Ir.entityMap : {
          lt: "<",
          gt: ">",
          amp: "&",
          quot: '"',
          apos: "'"
        };
        return s && r.setDocumentLocator(s), n.errorHandler = function (n, e, r) {
          if (!n) {
            if (e instanceof l) return e;
            n = e;
          }

          var a = {},
              s = n instanceof Function;

          function t(t) {
            var i = n[t];
            !i && s && (i = 2 == n.length ? function (e) {
              n(t, e);
            } : n), a[t] = i ? function (e) {
              i("[xmldom " + t + "]\t" + e + d(r));
            } : function () {};
          }

          return r = r || {}, t("warning"), t("error"), t("fatalError"), a;
        }(a, r, s), n.domBuilder = i.domBuilder || r, u && (o[""] = "http://www.w3.org/1999/xhtml"), o.xml = o.xml || "http://www.w3.org/XML/1998/namespace", e && "string" == typeof e ? n.parse(e, o, t) : n.errorHandler.error("invalid doc source"), r.doc;
      }, l.prototype = {
        startDocument: function () {
          this.doc = new a().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
        },
        startElement: function (e, t, i, n) {
          var r = this.doc,
              a = r.createElementNS(e, i || t),
              s = n.length;
          h(this, a), this.currentElement = a, this.locator && c(this.locator, a);

          for (var o = 0; o < s; o++) {
            var e = n.getURI(o),
                u = n.getValue(o),
                i = n.getQName(o),
                l = r.createAttributeNS(e, i);
            this.locator && c(n.getLocator(o), l), l.value = l.nodeValue = u, a.setAttributeNode(l);
          }
        },
        endElement: function (e, t, i) {
          var n = this.currentElement;
          n.tagName, this.currentElement = n.parentNode;
        },
        startPrefixMapping: function (e, t) {},
        endPrefixMapping: function (e) {},
        processingInstruction: function (e, t) {
          t = this.doc.createProcessingInstruction(e, t);
          this.locator && c(this.locator, t), h(this, t);
        },
        ignorableWhitespace: function (e, t, i) {},
        characters: function (e, t, i) {
          var n;
          (e = r.apply(this, arguments)) && (n = this.cdata ? this.doc.createCDATASection(e) : this.doc.createTextNode(e), this.currentElement ? this.currentElement.appendChild(n) : /^\s*$/.test(e) && this.doc.appendChild(n), this.locator && c(this.locator, n));
        },
        skippedEntity: function (e) {},
        endDocument: function () {
          this.doc.normalize();
        },
        setDocumentLocator: function (e) {
          (this.locator = e) && (e.lineNumber = 0);
        },
        comment: function (e, t, i) {
          e = r.apply(this, arguments);
          e = this.doc.createComment(e);
          this.locator && c(this.locator, e), h(this, e);
        },
        startCDATA: function () {
          this.cdata = !0;
        },
        endCDATA: function () {
          this.cdata = !1;
        },
        startDTD: function (e, t, i) {
          var n = this.doc.implementation;
          n && n.createDocumentType && (i = n.createDocumentType(e, t, i), this.locator && c(this.locator, i), h(this, i));
        },
        warning: function (e) {},
        error: function (e) {},
        fatalError: function (e) {
          throw new n(e, this.locator);
        }
      }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (e) {
        l.prototype[e] = function () {
          return null;
        };
      });
      var p = Vr.XMLReader,
          n = Vr.ParseError,
          a = t.DOMImplementation = Fa.DOMImplementation;
      t.XMLSerializer = Fa.XMLSerializer, t.DOMParser = i, t.__DOMHandler = l;
    });
    nr.DOMImplementation, nr.XMLSerializer;
    var ja = nr.DOMParser;
    nr.__DOMHandler;

    function Ha(e) {
      return !!e && "object" == typeof e;
    }

    function qa() {
      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

      return t.reduce(function (t, i) {
        return "object" != typeof i || Object.keys(i).forEach(function (e) {
          Array.isArray(t[e]) && Array.isArray(i[e]) ? t[e] = t[e].concat(i[e]) : Ha(t[e]) && Ha(i[e]) ? t[e] = qa(t[e], i[e]) : t[e] = i[e];
        }), t;
      }, {});
    }

    function Va(e) {
      return e.reduce(function (e, t) {
        return e.concat(t);
      }, []);
    }

    function Wa(e) {
      if (!e.length) return [];

      for (var t = [], i = 0; i < e.length; i++) t.push(e[i]);

      return t;
    }

    function za(e) {
      var t = e.baseUrl,
          i = void 0 === (n = e.source) ? "" : n,
          n = void 0 === (n = e.range) ? "" : n,
          e = void 0 === (e = e.indexRange) ? "" : e,
          i = {
        uri: i,
        resolvedUri: er((void 0 === t ? "" : t) || "", i)
      };
      return (n || e) && (n = (n || e).split("-"), e = parseInt(n[0], 10), n = parseInt(n[1], 10), i.byterange = {
        length: n - e + 1,
        offset: e
      }), i;
    }

    function Ga(e) {
      return e && "number" != typeof e && (e = parseInt(e, 10)), isNaN(e) ? null : e;
    }

    function Xa(e) {
      var s,
          t = void 0 === (a = e.type) ? "static" : a,
          i = e.duration,
          n = e.timescale,
          r = void 0 === n ? 1 : n,
          a = e.sourceDuration,
          e = function (e, t) {
        for (var i = [], n = e; n < t; n++) i.push(n);

        return i;
      }((n = Fs[t](e)).start, n.end).map((s = e, function (e, t) {
        var i = s.duration,
            n = s.timescale,
            r = s.periodIndex,
            a = s.startNumber;
        return {
          number: (void 0 === a ? 1 : a) + e,
          duration: i / (void 0 === n ? 1 : n),
          timeline: r,
          time: t * i
        };
      }));

      return "static" === t && (e[t = e.length - 1].duration = a - i / r * t), e;
    }

    function Ka(e) {
      var t = e.baseUrl,
          i = void 0 === (r = e.initialization) ? {} : r,
          n = e.sourceDuration,
          r = void 0 === (a = e.indexRange) ? "" : a,
          a = e.duration;
      if (!t) throw new Error(Ns);
      return i = za({
        baseUrl: t,
        source: i.sourceURL,
        range: i.range
      }), (r = za({
        baseUrl: t,
        source: t,
        indexRange: r
      })).map = i, a ? (e = Xa(e)).length && (r.duration = e[0].duration, r.timeline = e[0].timeline) : n && (r.duration = n, r.timeline = 0), r.number = 0, [r];
    }

    function Ya(e, t, i) {
      for (var n = e.sidx.map || null, r = e.sidx.duration, a = e.timeline || 0, s = (s = e.sidx.byterange).offset + s.length, o = t.timescale, u = t.references.filter(function (e) {
        return 1 !== e.referenceType;
      }), l = [], c = s + t.firstOffset, d = 0; d < u.length; d++) {
        var h = t.references[d],
            p = h.referencedSize,
            h = h.subsegmentDuration,
            h = Ka({
          baseUrl: i,
          timescale: o,
          timeline: a,
          periodIndex: a,
          duration: h,
          sourceDuration: r,
          indexRange: c + "-" + (c + p - 1)
        })[0];
        n && (h.map = n), l.push(h), c += p;
      }

      return e.segments = l, e;
    }

    function Qa(e) {
      return e && e.uri + "-" + (t = e.byterange, e = t.offset + t.length - 1, t.offset + "-" + e);
      var t;
    }

    function $a(e) {
      var t;
      return (t = e.reduce(function (e, t) {
        var i,
            n = t.attributes.id + (t.attributes.lang || "");
        return e[n] ? (t.segments[0] && (t.segments[0].discontinuity = !0), (i = e[n].segments).push.apply(i, t.segments), t.attributes.contentProtection && (e[n].attributes.contentProtection = t.attributes.contentProtection)) : e[n] = t, e;
      }, {}), Object.keys(t).map(function (e) {
        return t[e];
      })).map(function (e) {
        var t, n;
        return e.discontinuityStarts = (t = e.segments, n = "discontinuity", t.reduce(function (e, t, i) {
          return t[n] && e.push(i), e;
        }, [])), e;
      });
    }

    function Ja(e, t) {
      var i = Qa(e.sidx);
      return (i = i && t[i] && t[i].sidx) && Ya(e, i, e.sidx.resolvedUri), e;
    }

    function Za(e, l, c) {
      var d;
      return void 0 === l && (l = {}), void 0 === c && (c = !1), e = e.reduce(function (e, t) {
        var i = t.attributes.role && t.attributes.role.value || "",
            n = t.attributes.lang || "",
            r = t.attributes.label || "main";
        e[r = n && !t.attributes.label ? t.attributes.lang + (i ? " (" + i + ")" : "") : r] || (e[r] = {
          language: n,
          autoselect: !0,
          default: "main" === i,
          playlists: [],
          uri: ""
        });
        var a,
            s,
            o,
            u,
            u = Ja((s = c, o = (a = t).attributes, u = a.segments, n = a.sidx, u = {
          attributes: ((a = {
            NAME: o.id,
            BANDWIDTH: o.bandwidth,
            CODECS: o.codecs
          })["PROGRAM-ID"] = 1, a),
          uri: "",
          endList: "static" === (o.type || "static"),
          timeline: o.periodIndex,
          resolvedUri: "",
          targetDuration: o.duration,
          segments: u,
          mediaSequence: u.length ? u[0].number : 1
        }, o.contentProtection && (u.contentProtection = o.contentProtection), n && (u.sidx = n), s && (u.attributes.AUDIO = "audio", u.attributes.SUBTITLES = "subs"), u), l);
        return e[r].playlists.push(u), "undefined" == typeof d && "main" === i && ((d = t).default = !0), e;
      }, {}), d || (e[Object.keys(e)[0]].default = !0), e;
    }

    function es(e) {
      var t = e.attributes,
          i = e.segments,
          n = e.sidx,
          i = {
        attributes: ((e = {
          NAME: t.id,
          AUDIO: "audio",
          SUBTITLES: "subs",
          RESOLUTION: {
            width: t.width,
            height: t.height
          },
          CODECS: t.codecs,
          BANDWIDTH: t.bandwidth
        })["PROGRAM-ID"] = 1, e),
        uri: "",
        endList: "static" === (t.type || "static"),
        timeline: t.periodIndex,
        resolvedUri: "",
        targetDuration: t.duration,
        segments: i,
        mediaSequence: i.length ? i[0].number : 1
      };
      return t.contentProtection && (i.contentProtection = t.contentProtection), n && (i.sidx = n), i;
    }

    function ts(e) {
      return "video/mp4" === (e = e.attributes).mimeType || "video/webm" === e.mimeType || "video" === e.contentType;
    }

    function is(e) {
      return "audio/mp4" === (e = e.attributes).mimeType || "audio/webm" === e.mimeType || "audio" === e.contentType;
    }

    function ns(e) {
      return "text/vtt" === (e = e.attributes).mimeType || "text" === e.contentType;
    }

    function rs(e, t, i) {
      if (void 0 === i && (i = {}), !e.length) return {};
      var n = (c = e[0].attributes).sourceDuration,
          r = void 0 === (l = c.type) ? "static" : l,
          a = c.suggestedPresentationDelay,
          s = c.minimumUpdatePeriod,
          o = $a(e.filter(ts)).map(es),
          u = $a(e.filter(is)),
          l = e.filter(ns),
          c = e.map(function (e) {
        return e.attributes.captionServices;
      }).filter(Boolean),
          o = {
        allowCache: !0,
        discontinuityStarts: [],
        segments: [],
        endList: !0,
        mediaGroups: ((e = {
          AUDIO: {},
          VIDEO: {}
        })["CLOSED-CAPTIONS"] = {}, e.SUBTITLES = {}, e),
        uri: "",
        duration: n,
        playlists: function (e, t) {
          if (void 0 === t && (t = {}), !Object.keys(t).length) return e;

          for (var i in e) e[i] = Ja(e[i], t);

          return e;
        }(o, i)
      };
      0 <= s && (o.minimumUpdatePeriod = 1e3 * s), t && (o.locations = t), "dynamic" === r && (o.suggestedPresentationDelay = a);
      var d,
          a = 0 === o.playlists.length;
      return u.length && (o.mediaGroups.AUDIO.audio = Za(u, i, a)), l.length && (o.mediaGroups.SUBTITLES.subs = (void 0 === (d = i) && (d = {}), l.reduce(function (e, t) {
        var i = t.attributes.lang || "text";
        return e[i] || (e[i] = {
          language: i,
          default: !1,
          autoselect: !1,
          playlists: [],
          uri: ""
        }), e[i].playlists.push(Ja(function (e) {
          var t = e.attributes,
              i = e.segments;
          "undefined" == typeof i && (i = [{
            uri: t.baseUrl,
            timeline: t.periodIndex,
            resolvedUri: t.baseUrl || "",
            duration: t.sourceDuration,
            number: 0
          }], t.duration = t.sourceDuration);
          (e = {
            NAME: t.id,
            BANDWIDTH: t.bandwidth
          })["PROGRAM-ID"] = 1;
          return t.codecs && (e.CODECS = t.codecs), {
            attributes: e,
            uri: "",
            endList: "static" === (t.type || "static"),
            timeline: t.periodIndex,
            resolvedUri: t.baseUrl || "",
            targetDuration: t.duration,
            segments: i,
            mediaSequence: i.length ? i[0].number : 1
          };
        }(t), d)), e;
      }, {}))), c.length && (o.mediaGroups["CLOSED-CAPTIONS"].cc = c.reduce(function (n, e) {
        return e && e.forEach(function (e) {
          var t = e.channel,
              i = e.language;
          n[i] = {
            autoselect: !1,
            default: !1,
            instreamId: t,
            language: i
          }, e.hasOwnProperty("aspectRatio") && (n[i].aspectRatio = e.aspectRatio), e.hasOwnProperty("easyReader") && (n[i].easyReader = e.easyReader), e.hasOwnProperty("3D") && (n[i]["3D"] = e["3D"]);
        }), n;
      }, {})), o;
    }

    function as(e, t) {
      for (var i, n, r, a, s, o, u = e.type, l = void 0 === u ? "static" : u, c = void 0 === (u = e.minimumUpdatePeriod) ? 0 : u, d = void 0 === (u = e.media) ? "" : u, h = e.sourceDuration, p = void 0 === (u = e.timescale) ? 1 : u, f = void 0 === (u = e.startNumber) ? 1 : u, m = e.periodIndex, g = [], y = -1, v = 0; v < t.length; v++) {
        var _ = t[v],
            b = _.d,
            T = _.r || 0,
            S = _.t || 0;
        y < 0 && (y = S), S && y < S && (y = S);
        var E,
            k = void 0;
        k = T < 0 ? (E = v + 1) === t.length ? "dynamic" === l && 0 < c && 0 < d.indexOf("$Number$") ? (i = y, n = b, _ = o = s = a = r = void 0, r = (S = e).NOW, a = S.clientOffset, s = S.availabilityStartTime, o = S.timescale, _ = S.start, S = S.minimumUpdatePeriod, Math.ceil((((r + a) / 1e3 + (void 0 === S ? 0 : S) - (s + (void 0 === _ ? 0 : _))) * (void 0 === o ? 1 : o) - i) / n)) : (h * p - y) / b : (t[E].t - y) / b : T + 1;

        for (var C = f + g.length + k, w = f + g.length; w < C;) g.push({
          number: w,
          duration: b / p,
          time: y,
          timeline: m
        }), y += b, w++;
      }

      return g;
    }

    function ss(e, t) {
      return e.replace(js, (r = t, function (e, t, i, n) {
        if ("$$" === e) return "$";
        if ("undefined" == typeof r[t]) return e;
        e = "" + r[t];
        return "RepresentationID" === t || (n = i ? parseInt(n, 10) : 1) <= e.length ? e : new Array(n - e.length + 1).join("0") + e;
      }));
      var r;
    }

    function os(i, e) {
      var n = {
        RepresentationID: i.id,
        Bandwidth: i.bandwidth || 0
      },
          t = void 0 === (t = i.initialization) ? {
        sourceURL: "",
        range: ""
      } : t,
          r = za({
        baseUrl: i.baseUrl,
        source: ss(t.sourceURL, n),
        range: t.range
      });
      return (t = e, (e = i).duration || t ? e.duration ? Xa(e) : as(e, t) : [{
        number: e.startNumber || 1,
        duration: e.sourceDuration,
        time: 0,
        timeline: e.periodIndex
      }]).map(function (e) {
        n.Number = e.number, n.Time = e.time;
        var t = ss(i.media || "", n),
            e = {
          uri: t,
          timeline: e.timeline,
          duration: e.duration,
          resolvedUri: er(i.baseUrl || "", t),
          map: r,
          number: e.number
        };
        return i.presentationTimeOffset && (e.presentationTimeOffset = i.presentationTimeOffset), e;
      });
    }

    function us(n, e) {
      var t = n.duration,
          i = void 0 === (i = n.segmentUrls) ? [] : i;
      if (!t && !e || t && e) throw new Error(Us);
      var r,
          a = i.map(function (e) {
        return i = e, e = (t = n).baseUrl, t = t.initialization, t = za({
          baseUrl: e,
          source: (t = void 0 === t ? {} : t).sourceURL,
          range: t.range
        }), (i = za({
          baseUrl: e,
          source: i.media,
          range: i.mediaRange
        })).map = t, i;
        var t, i;
      });
      return t && (r = Xa(n)), (r = e ? as(n, e) : r).map(function (e, t) {
        if (a[t]) {
          t = a[t];
          return t.timeline = e.timeline, t.duration = e.duration, t.number = e.number, t;
        }
      }).filter(function (e) {
        return e;
      });
    }

    function ls(e) {
      var t,
          i = e.attributes,
          n = e.segmentInfo;
      n.template ? (a = os, t = qa(i, n.template), n.template.presentationTimeOffset && (t.presentationTimeOffset = n.template.presentationTimeOffset / n.template.timescale)) : n.base ? (a = Ka, t = qa(i, n.base)) : n.list && (a = us, t = qa(i, n.list));
      var r = {
        attributes: i
      };
      if (!a) return r;
      var a,
          e = a(t, n.timeline);
      return t.duration ? (i = t.duration, a = t.timescale, t.duration = i / (void 0 === a ? 1 : a)) : e.length ? t.duration = e.reduce(function (e, t) {
        return Math.max(e, Math.ceil(t.duration));
      }, 0) : t.duration = 0, r.attributes = t, r.segments = e, n.base && t.indexRange && (r.sidx = e[0], r.segments = []), r;
    }

    function cs(e, t) {
      return Wa(e.childNodes).filter(function (e) {
        return e.tagName === t;
      });
    }

    function ds(e) {
      return e.textContent.trim();
    }

    function hs(e) {
      if (!(r = /P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/.exec(e))) return 0;
      var t = (a = r.slice(1))[0],
          i = a[1],
          n = a[2],
          e = a[3],
          r = a[4],
          a = a[5];
      return 31536e3 * parseFloat(t || 0) + 2592e3 * parseFloat(i || 0) + 86400 * parseFloat(n || 0) + 3600 * parseFloat(e || 0) + 60 * parseFloat(r || 0) + parseFloat(a || 0);
    }

    function ps(e) {
      return e && e.attributes ? Wa(e.attributes).reduce(function (e, t) {
        var i = Hs[t.name] || Hs.DEFAULT;
        return e[t.name] = i(t.value), e;
      }, {}) : {};
    }

    function fs(e, i) {
      return i.length ? Va(e.map(function (t) {
        return i.map(function (e) {
          return er(t, ds(e));
        });
      })) : e;
    }

    function ms(e) {
      var t = cs(e, "SegmentTemplate")[0],
          i = cs(e, "SegmentList")[0],
          n = i && cs(i, "SegmentURL").map(function (e) {
        return qa({
          tag: "SegmentURL"
        }, ps(e));
      }),
          r = cs(e, "SegmentBase")[0],
          e = (a = i || t) && cs(a, "SegmentTimeline")[0],
          a = (a = i || r || t) && cs(a, "Initialization")[0];
      (t = t && ps(t)) && a ? t.initialization = a && ps(a) : t && t.initialization && (t.initialization = {
        sourceURL: t.initialization
      });
      var s = {
        template: t,
        timeline: e && cs(e, "S").map(ps),
        list: i && qa(ps(i), {
          segmentUrls: n,
          initialization: ps(a)
        }),
        base: r && qa(ps(r), {
          initialization: ps(a)
        })
      };
      return Object.keys(s).forEach(function (e) {
        s[e] || delete s[e];
      }), s;
    }

    function gs(u, l, c) {
      return function (e) {
        var t = ps(e),
            i = fs(l, cs(e, "BaseURL")),
            n = cs(e, "Role")[0],
            n = {
          role: ps(n)
        },
            t = qa(u, t, n),
            n = cs(e, "Accessibility")[0],
            n = "urn:scte:dash:cc:cea-608:2015" === (n = ps(n)).schemeIdUri ? n.value.split(";").map(function (e) {
          var t, i, n;
          return /^CC\d=/.test(n = e) ? (i = (t = e.split("="))[0], n = t[1]) : /^CC\d$/.test(e) && (i = e), {
            channel: i,
            language: n
          };
        }) : "urn:scte:dash:cc:cea-708:2015" === n.schemeIdUri ? n.value.split(";").map(function (e) {
          var t,
              i,
              n = {
            channel: void 0,
            language: void 0,
            aspectRatio: 1,
            easyReader: 0,
            "3D": 0
          };
          return /=/.test(e) ? (t = (i = e.split("="))[0], i = void 0 === (i = i[1]) ? "" : i, n.channel = t, n.language = e, i.split(",").forEach(function (e) {
            var t = e.split(":"),
                e = t[0],
                t = t[1];
            "lang" === e ? n.language = t : "er" === e ? n.easyReader = Number(t) : "war" === e ? n.aspectRatio = Number(t) : "3D" === e && (n["3D"] = Number(t));
          })) : n.language = e, n.channel && (n.channel = "SERVICE" + n.channel), n;
        }) : void 0;
        n && (t = qa(t, {
          captionServices: n
        }));
        n = cs(e, "Label")[0];
        n && n.childNodes.length && (r = n.childNodes[0].nodeValue.trim(), t = qa(t, {
          label: r
        }));
        var r = cs(e, "ContentProtection").reduce(function (e, t) {
          var i = ps(t),
              n = qs[i.schemeIdUri];
          return n && (e[n] = {
            attributes: i
          }, (t = cs(t, "cenc:pssh")[0]) && (t = (t = ds(t)) && ar(t), e[n].pssh = t)), e;
        }, {});
        Object.keys(r).length && (t = qa(t, {
          contentProtection: r
        }));
        var a,
            s,
            o,
            r = ms(e),
            e = cs(e, "Representation"),
            r = qa(c, r);
        return Va(e.map((a = t, s = i, o = r, function (e) {
          var t = cs(e, "BaseURL"),
              t = fs(s, t),
              i = qa(a, ps(e)),
              n = ms(e);
          return t.map(function (e) {
            return {
              segmentInfo: qa(o, n),
              attributes: qa(i, {
                baseUrl: e
              })
            };
          });
        })));
      };
    }

    function ys(e, t) {
      var i = t = void 0 === t ? {} : t,
          n = void 0 === (s = i.manifestUri) ? "" : s,
          r = i.NOW,
          a = void 0 === r ? Date.now() : r,
          s = void 0 === (t = i.clientOffset) ? 0 : t;
      if (!(r = cs(e, "Period")).length) throw new Error(Os);
      var o,
          u,
          i = cs(e, "Location"),
          t = ps(e),
          e = fs([n], cs(e, "BaseURL"));
      return t.sourceDuration = t.mediaPresentationDuration || 0, t.NOW = a, t.clientOffset = s, i.length && (t.locations = i.map(ds)), {
        locations: t.locations,
        representationInfo: Va(r.map((o = t, u = e, function (e, t) {
          var i = fs(u, cs(e, "BaseURL")),
              n = ps(e),
              n = parseInt(n.id, 10),
              t = _.isNaN(n) ? t : n,
              n = qa(o, {
            periodIndex: t
          }),
              t = cs(e, "AdaptationSet"),
              e = ms(e);
          return Va(t.map(gs(n, i, e)));
        })))
      };
    }

    function vs(e) {
      if ("" === e) throw new Error(Rs);
      var t,
          i,
          n = new ja();

      try {
        i = (t = n.parseFromString(e, "application/xml")) && "MPD" === t.documentElement.tagName ? t.documentElement : null;
      } catch (e) {}

      if (!i || i && 0 < i.getElementsByTagName("parsererror").length) throw new Error(Ms);
      return i;
    }

    function _s(e, t) {
      void 0 === t && (t = {});
      var i = ys(vs(e), t),
          e = i.representationInfo.map(ls);
      return rs(e, i.locations, t.sidxMapping);
    }

    function bs(e) {
      return function (e) {
        e = cs(e, "UTCTiming")[0];
        if (!e) return null;
        var t = ps(e);

        switch (t.schemeIdUri) {
          case "urn:mpeg:dash:utc:http-head:2014":
          case "urn:mpeg:dash:utc:http-head:2012":
            t.method = "HEAD";
            break;

          case "urn:mpeg:dash:utc:http-xsdate:2014":
          case "urn:mpeg:dash:utc:http-iso:2014":
          case "urn:mpeg:dash:utc:http-xsdate:2012":
          case "urn:mpeg:dash:utc:http-iso:2012":
            t.method = "GET";
            break;

          case "urn:mpeg:dash:utc:direct:2014":
          case "urn:mpeg:dash:utc:direct:2012":
            t.method = "DIRECT", t.value = Date.parse(t.value);
            break;

          case "urn:mpeg:dash:utc:http-ntp:2014":
          case "urn:mpeg:dash:utc:ntp:2014":
          case "urn:mpeg:dash:utc:sntp:2014":
          default:
            throw new Error(Bs);
        }

        return t;
      }(vs(e));
    }

    function Ts(e) {
      return e instanceof Uint8Array ? e : (Array.isArray(e) || (t = e, ArrayBuffer.isView(t)) || e instanceof ArrayBuffer || (e = "number" != typeof e || "number" == typeof e && e != e ? 0 : [e]), new Uint8Array(e && e.buffer || e, e && e.byteOffset || 0, e && e.byteLength || 0));
      var t;
    }

    function Ss(e, t) {
      var i = void 0 !== (t = (void 0 === t ? {} : t).le) && t;
      e = zs(e = "bigint" != typeof e && "number" != typeof e || "number" == typeof e && e != e ? 0 : e);

      for (var n = (t = e, Math.ceil(t.toString(2).length / 8)), r = new Uint8Array(new ArrayBuffer(n)), a = 0; a < n; a++) {
        var s = i ? a : Math.abs(a + 1 - r.length);
        r[s] = Number(e / Gs[a] & zs(255)), e < 0 && (r[s] = Math.abs(~r[s]), r[s] -= 0 === a ? 1 : 2);
      }

      return r;
    }

    function Es(e, t) {
      if ("string" != typeof (e = "string" != typeof e && e && "function" == typeof e.toString ? e.toString() : e)) return new Uint8Array();
      t || (e = unescape(encodeURIComponent(e)));

      for (var i = new Uint8Array(e.length), n = 0; n < e.length; n++) i[n] = e.charCodeAt(n);

      return i;
    }

    function ks(i, e, t) {
      var n = void 0 === t ? {} : t,
          r = void 0 === (t = n.offset) ? 0 : t,
          a = void 0 === (n = n.mask) ? [] : n;
      return i = Ts(i), n = (e = Ts(e)).every || Array.prototype.every, e.length && i.length - r >= e.length && n.call(e, function (e, t) {
        return e === (a[t] ? a[t] & i[r + t] : i[r + t]);
      });
    }

    function Cs(e, t) {
      return void 0 === t && (t = 0), (e = Ts(e)).length - t < 10 || !ks(e, Xs, {
        offset: t
      }) ? t : Cs(e, t += function (e, t) {
        void 0 === t && (t = 0);
        var i = (e = Ts(e))[t + 5],
            t = e[t + 6] << 21 | e[t + 7] << 14 | e[t + 8] << 7 | e[t + 9];
        return (16 & i) >> 4 ? 20 + t : 10 + t;
      }(e, t));
    }

    function ws(e) {
      return "string" == typeof e ? Es(e) : e;
    }

    function Is(e, t, i) {
      var n;
      void 0 === i && (i = !1), n = t, t = Array.isArray(n) ? n.map(ws) : [ws(n)], e = Ts(e);
      var r = [];
      if (!t.length) return r;

      for (var a = 0; a < e.length;) {
        var s = (e[a] << 24 | e[a + 1] << 16 | e[a + 2] << 8 | e[a + 3]) >>> 0,
            o = e.subarray(a + 4, a + 8);
        if (0 == s) break;
        var u = a + s;

        if (u > e.length) {
          if (i) break;
          u = e.length;
        }

        s = e.subarray(a + 8, u);
        ks(o, t[0]) && (1 === t.length ? r.push(s) : r.push.apply(r, Is(s, t.slice(1), i))), a = u;
      }

      return r;
    }

    function xs(e, t, i, n) {
      void 0 === i && (i = !0), void 0 === n && (n = !1);

      var r = function (e) {
        for (var t = 1, i = 0; i < Ys.length && !(e & Ys[i]); i++) t++;

        return t;
      }(e[t]),
          a = e.subarray(t, t + r);

      return i && ((a = Array.prototype.slice.call(e, t, t + r))[0] ^= Ys[r - 1]), {
        length: r,
        value: function (n, e) {
          var t = void 0 === e ? {} : e,
              e = t.signed,
              e = void 0 !== e && e,
              t = t.le,
              r = void 0 !== t && t;
          n = Ts(n);
          t = r ? "reduce" : "reduceRight", t = (n[t] || Array.prototype[t]).call(n, function (e, t, i) {
            i = r ? i : Math.abs(i + 1 - n.length);
            return e + zs(t) * Gs[i];
          }, zs(0));
          return !e || (e = Gs[n.length] / zs(2) - zs(1)) < (t = zs(t)) && (t -= e, t -= e, t -= zs(2)), Number(t);
        }(a, {
          signed: n
        }),
        bytes: a
      };
    }

    function As(e) {
      return "string" == typeof e ? e.match(/.{1,2}/g).map(As) : "number" == typeof e ? Ss(e) : e;
    }

    function Ps(e, t, i) {
      if (i >= t.length) return t.length;
      var n = xs(t, i, !1);
      if (ks(e.bytes, n.bytes)) return i;
      var r = xs(t, i + n.length);
      return Ps(e, t, i + r.length + r.value + n.length);
    }

    function Ls(e, t) {
      var i;
      i = t, t = Array.isArray(i) ? i.map(As) : [As(i)], e = Ts(e);
      var n = [];
      if (!t.length) return n;

      for (var r = 0; r < e.length;) {
        var a = xs(e, r, !1),
            s = xs(e, r + a.length),
            o = r + a.length + s.length;
        127 === s.value && (s.value = Ps(a, e, o), s.value !== e.length && (s.value -= o));
        var u = o + s.value > e.length ? e.length : o + s.value,
            u = e.subarray(o, u);
        ks(t[0], a.bytes) && (1 === t.length ? n.push(u) : n = n.concat(Ls(u, t.slice(1)))), r += a.length + s.length + u.length;
      }

      return n;
    }

    function Ds(e, t, i, n) {
      void 0 === n && (n = 1 / 0), e = Ts(e), i = [].concat(i);

      for (var r, a = 0, s = 0; a < e.length && (s < n || r);) {
        var o = void 0;

        if (ks(e.subarray(a), Qs) ? o = 4 : ks(e.subarray(a), $s) && (o = 3), o) {
          if (s++, r) return function (e) {
            for (var t = [], i = 1; i < e.length - 2;) ks(e.subarray(i, i + 3), Js) && (t.push(i + 2), i++), i++;

            if (0 === t.length) return e;

            for (var n = e.length - t.length, r = new Uint8Array(n), a = 0, i = 0; i < n; a++, i++) a === t[0] && (a++, t.shift()), r[i] = e[a];

            return r;
          }(e.subarray(r, a));
          var u = void 0;
          "h264" === t ? u = 31 & e[a + o] : "h265" === t && (u = e[a + o] >> 1 & 63), -1 !== i.indexOf(u) && (r = a + o), a += o + ("h264" === t ? 1 : 2);
        } else a++;
      }

      return e.subarray(0, 0);
    }
    /*! @name mpd-parser @version 0.17.0 @license Apache-2.0 */


    var Os = "INVALID_NUMBER_OF_PERIOD",
        Rs = "DASH_EMPTY_MANIFEST",
        Ms = "DASH_INVALID_XML",
        Ns = "NO_BASE_URL",
        Us = "SEGMENT_TIME_UNSPECIFIED",
        Bs = "UNSUPPORTED_UTC_TIMING_SCHEME",
        Fs = {
      static: function (e) {
        var t = e.duration,
            i = e.timescale,
            n = void 0 === i ? 1 : i,
            i = e.sourceDuration,
            e = Ga(e.endNumber);
        return {
          start: 0,
          end: "number" == typeof e ? e : Math.ceil(i / (t / n))
        };
      },
      dynamic: function (e) {
        var t = e.NOW,
            i = e.clientOffset,
            n = e.availabilityStartTime,
            r = e.timescale,
            a = void 0 === r ? 1 : r,
            s = e.duration,
            o = e.start,
            u = void 0 === o ? 0 : o,
            r = e.minimumUpdatePeriod,
            o = void 0 === r ? 0 : r,
            r = e.timeShiftBufferDepth,
            r = void 0 === r ? 1 / 0 : r,
            e = Ga(e.endNumber),
            i = (t + i) / 1e3,
            u = n + u,
            o = Math.ceil((i + o - u) * a / s),
            r = Math.floor((i - u - r) * a / s),
            s = Math.floor((i - u) * a / s);
        return {
          start: Math.max(0, r),
          end: "number" == typeof e ? e : Math.min(o, s)
        };
      }
    },
        js = /\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,
        Hs = {
      mediaPresentationDuration: hs,
      availabilityStartTime: function (e) {
        return /^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(e = e) && (e += "Z"), Date.parse(e) / 1e3;
      },
      minimumUpdatePeriod: hs,
      suggestedPresentationDelay: hs,
      type: function (e) {
        return e;
      },
      timeShiftBufferDepth: hs,
      start: hs,
      width: function (e) {
        return parseInt(e, 10);
      },
      height: function (e) {
        return parseInt(e, 10);
      },
      bandwidth: function (e) {
        return parseInt(e, 10);
      },
      startNumber: function (e) {
        return parseInt(e, 10);
      },
      timescale: function (e) {
        return parseInt(e, 10);
      },
      presentationTimeOffset: function (e) {
        return parseInt(e, 10);
      },
      duration: function (e) {
        var t = parseInt(e, 10);
        return isNaN(t) ? hs(e) : t;
      },
      d: function (e) {
        return parseInt(e, 10);
      },
      t: function (e) {
        return parseInt(e, 10);
      },
      r: function (e) {
        return parseInt(e, 10);
      },
      DEFAULT: function (e) {
        return e;
      }
    },
        qs = {
      "urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b": "org.w3.clearkey",
      "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": "com.widevine.alpha",
      "urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95": "com.microsoft.playready",
      "urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb": "com.adobe.primetime"
    },
        Vs = Math.pow(2, 32),
        Ws = function (e) {
      var t = new DataView(e.buffer, e.byteOffset, e.byteLength),
          i = {
        version: e[0],
        flags: new Uint8Array(e.subarray(1, 4)),
        references: [],
        referenceId: t.getUint32(4),
        timescale: t.getUint32(8)
      },
          n = 12;
      0 === i.version ? (i.earliestPresentationTime = t.getUint32(n), i.firstOffset = t.getUint32(n + 4), n += 8) : (i.earliestPresentationTime = t.getUint32(n) * Vs + t.getUint32(n + 4), i.firstOffset = t.getUint32(n + 8) * Vs + t.getUint32(n + 12), n += 16);
      var r = t.getUint16(n += 2);

      for (n += 2; 0 < r; n += 12, r--) i.references.push({
        referenceType: (128 & e[n]) >>> 7,
        referencedSize: 2147483647 & t.getUint32(n),
        subsegmentDuration: t.getUint32(n + 4),
        startsWithSap: !!(128 & e[n + 8]),
        sapType: (112 & e[n + 8]) >>> 4,
        sapDeltaTime: 268435455 & t.getUint32(n + 8)
      });

      return i;
    },
        zs = _.BigInt || Number,
        Gs = [zs("0x1"), zs("0x100"), zs("0x10000"), zs("0x1000000"), zs("0x100000000"), zs("0x10000000000"), zs("0x1000000000000"), zs("0x100000000000000"), zs("0x10000000000000000")],
        Xs = Ts([73, 68, 51]),
        Ks = {
      EBML: Ts([26, 69, 223, 163]),
      DocType: Ts([66, 130]),
      Segment: Ts([24, 83, 128, 103]),
      SegmentInfo: Ts([21, 73, 169, 102]),
      Tracks: Ts([22, 84, 174, 107]),
      Track: Ts([174]),
      TrackNumber: Ts([215]),
      DefaultDuration: Ts([35, 227, 131]),
      TrackEntry: Ts([174]),
      TrackType: Ts([131]),
      FlagDefault: Ts([136]),
      CodecID: Ts([134]),
      CodecPrivate: Ts([99, 162]),
      VideoTrack: Ts([224]),
      AudioTrack: Ts([225]),
      Cluster: Ts([31, 67, 182, 117]),
      Timestamp: Ts([231]),
      TimestampScale: Ts([42, 215, 177]),
      BlockGroup: Ts([160]),
      BlockDuration: Ts([155]),
      Block: Ts([161]),
      SimpleBlock: Ts([163])
    },
        Ys = [128, 64, 32, 16, 8, 4, 2, 1],
        Qs = Ts([0, 0, 0, 1]),
        $s = Ts([0, 0, 1]),
        Js = Ts([0, 0, 3]),
        Zs = {
      webm: Ts([119, 101, 98, 109]),
      matroska: Ts([109, 97, 116, 114, 111, 115, 107, 97]),
      flac: Ts([102, 76, 97, 67]),
      ogg: Ts([79, 103, 103, 83]),
      ac3: Ts([11, 119]),
      riff: Ts([82, 73, 70, 70]),
      avi: Ts([65, 86, 73]),
      wav: Ts([87, 65, 86, 69]),
      "3gp": Ts([102, 116, 121, 112, 51, 103]),
      mp4: Ts([102, 116, 121, 112]),
      fmp4: Ts([115, 116, 121, 112]),
      mov: Ts([102, 116, 121, 112, 113, 116])
    },
        eo = {
      aac: function (e) {
        var t = Cs(e);
        return ks(e, [255, 16], {
          offset: t,
          mask: [255, 22]
        });
      },
      mp3: function (e) {
        var t = Cs(e);
        return ks(e, [255, 2], {
          offset: t,
          mask: [255, 6]
        });
      },
      webm: function (e) {
        e = Ls(e, [Ks.EBML, Ks.DocType])[0];
        return ks(e, Zs.webm);
      },
      mkv: function (e) {
        e = Ls(e, [Ks.EBML, Ks.DocType])[0];
        return ks(e, Zs.matroska);
      },
      mp4: function (e) {
        return !eo["3gp"](e) && !eo.mov(e) && (ks(e, Zs.mp4, {
          offset: 4
        }) || ks(e, Zs.fmp4, {
          offset: 4
        }));
      },
      mov: function (e) {
        return ks(e, Zs.mov, {
          offset: 4
        });
      },
      "3gp": function (e) {
        return ks(e, Zs["3gp"], {
          offset: 4
        });
      },
      ac3: function (e) {
        var t = Cs(e);
        return ks(e, Zs.ac3, {
          offset: t
        });
      },
      ts: function (e) {
        if (e.length < 189 && 1 <= e.length) return 71 === e[0];

        for (var t = 0; t + 188 < e.length && t < 188;) {
          if (71 === e[t] && 71 === e[t + 188]) return !0;
          t += 1;
        }

        return !1;
      },
      flac: function (e) {
        var t = Cs(e);
        return ks(e, Zs.flac, {
          offset: t
        });
      },
      ogg: function (e) {
        return ks(e, Zs.ogg);
      },
      avi: function (e) {
        return ks(e, Zs.riff) && ks(e, Zs.avi, {
          offset: 8
        });
      },
      wav: function (e) {
        return ks(e, Zs.riff) && ks(e, Zs.wav, {
          offset: 8
        });
      },
      h264: function (e) {
        return Ds(e, "h264", 7, 3).length;
      },
      h265: function (e) {
        return Ds(e, "h265", [32, 33], 3).length;
      }
    },
        to = Object.keys(eo).filter(function (e) {
      return "ts" !== e && "h264" !== e && "h265" !== e;
    }).concat(["ts", "h264", "h265"]);

    to.forEach(function (e) {
      var t = eo[e];

      eo[e] = function (e) {
        return t(Ts(e));
      };
    });

    function io(e) {
      e = Ts(e);

      for (var t = 0; t < to.length; t++) {
        var i = to[t];
        if (Ou[i](e)) return i;
      }

      return "";
    }

    function no(e, t, i) {
      return e && i && i.responseURL && t !== i.responseURL ? i.responseURL : t;
    }

    function ro(e) {
      return Zn.log.debug ? Zn.log.debug.bind(Zn, "VHS:", e + " >") : function () {};
    }

    function ao(e, t) {
      var i,
          n = [];
      if (e && e.length) for (i = 0; i < e.length; i++) t(e.start(i), e.end(i)) && n.push([e.start(i), e.end(i)]);
      return Zn.createTimeRanges(n);
    }

    function so(e, i) {
      return ao(e, function (e, t) {
        return e - .1 <= i && i <= t + .1;
      });
    }

    function oo(e, t) {
      return ao(e, function (e) {
        return t <= e - Nu;
      });
    }

    function uo(e) {
      var t = [];
      if (!e || !e.length) return "";

      for (var i = 0; i < e.length; i++) t.push(e.start(i) + " => " + e.end(i));

      return t.join(", ");
    }

    function lo(e) {
      for (var t = [], i = 0; i < e.length; i++) t.push({
        start: e.start(i),
        end: e.end(i)
      });

      return t;
    }

    function co(e) {
      if (e && e.length && e.end) return e.end(e.length - 1);
    }

    function ho(e) {
      return (e.segments || []).reduce(function (i, n, r) {
        return n.parts ? n.parts.forEach(function (e, t) {
          i.push({
            duration: e.duration,
            segmentIndex: r,
            partIndex: t,
            part: e,
            segment: n
          });
        }) : i.push({
          duration: n.duration,
          segmentIndex: r,
          partIndex: null,
          segment: n,
          part: null
        }), i;
      }, []);
    }

    function po(e) {
      return (e = e.segments && e.segments.length && e.segments[e.segments.length - 1]) && e.parts || [];
    }

    function fo(e) {
      var t = e.preloadSegment;

      if (t) {
        e = t.parts, t = (t.preloadHints || []).reduce(function (e, t) {
          return e + ("PART" === t.type ? 1 : 0);
        }, 0);
        return t += e && e.length ? e.length : 0;
      }
    }

    function mo(e, t) {
      return t.endList ? 0 : e && e.suggestedPresentationDelay ? e.suggestedPresentationDelay : (e = 0 < po(t).length) && t.serverControl && t.serverControl.partHoldBack ? t.serverControl.partHoldBack : e && t.partTargetDuration ? 3 * t.partTargetDuration : t.serverControl && t.serverControl.holdBack ? t.serverControl.holdBack : t.targetDuration ? 3 * t.targetDuration : 0;
    }

    function go(e, t, i) {
      if ((t = "undefined" == typeof t ? e.mediaSequence + e.segments.length : t) < e.mediaSequence) return 0;

      var n = function (e, t) {
        var i = 0,
            n = t - e.mediaSequence,
            r = e.segments[n];

        if (r) {
          if ("undefined" != typeof r.start) return {
            result: r.start,
            precise: !0
          };
          if ("undefined" != typeof r.end) return {
            result: r.end - r.duration,
            precise: !0
          };
        }

        for (; n--;) {
          if ("undefined" != typeof (r = e.segments[n]).end) return {
            result: i + r.end,
            precise: !0
          };
          if (i += r.duration, "undefined" != typeof r.start) return {
            result: i + r.start,
            precise: !0
          };
        }

        return {
          result: i,
          precise: !1
        };
      }(e, t);

      return n.precise ? n.result : (t = function (e, t) {
        for (var i, n = 0, r = t - e.mediaSequence; r < e.segments.length; r++) {
          if ("undefined" != typeof (i = e.segments[r]).start) return {
            result: i.start - n,
            precise: !0
          };
          if (n += i.duration, "undefined" != typeof i.end) return {
            result: i.end - n,
            precise: !0
          };
        }

        return {
          result: -1,
          precise: !1
        };
      }(e, t)).precise ? t.result : n.result + i;
    }

    function yo(e, t, i) {
      if (!e) return 0;

      if ("undefined" == typeof t) {
        if (e.totalDuration) return e.totalDuration;
        if (!e.endList) return _.Infinity;
      }

      return go(e, t, i = "number" != typeof i ? 0 : i);
    }

    function vo(e) {
      var t = e.defaultDuration,
          i = e.durationList,
          n = e.startIndex,
          r = e.endIndex,
          a = 0;

      if (r < n && (n = (e = [r, n])[0], r = e[1]), n < 0) {
        for (var s = n; s < Math.min(0, r); s++) a += t;

        n = 0;
      }

      for (var o = n; o < r; o++) a += i[o].duration;

      return a;
    }

    function _o(e, t, i, n) {
      return e && e.segments ? e.endList ? yo(e) : null === t ? null : (t = go(e, e.mediaSequence + e.segments.length, t = t || 0), i && (t -= n = "number" == typeof n ? n : mo(null, e)), Math.max(0, t)) : null;
    }

    function bo(e) {
      return e.excludeUntil && e.excludeUntil > Date.now();
    }

    function To(e) {
      return e.excludeUntil && e.excludeUntil === 1 / 0;
    }

    function So(e) {
      var t = bo(e);
      return !e.disabled && !t;
    }

    function Eo(e, t) {
      return t.attributes && t.attributes[e];
    }

    function ko(e, t) {
      if (1 === e.playlists.length) return !0;
      var i = t.attributes.BANDWIDTH || Number.MAX_VALUE;
      return 0 === e.playlists.filter(function (e) {
        return !!So(e) && (e.attributes.BANDWIDTH || 0) < i;
      }).length;
    }

    function Co(e, t) {
      return !(!e && !t || !e && t || e && !t) && (e === t || !(!e.id || !t.id || e.id !== t.id) || !(!e.resolvedUri || !t.resolvedUri || e.resolvedUri !== t.resolvedUri) || !(!e.uri || !t.uri || e.uri !== t.uri));
    }

    function wo(e, t) {
      var i,
          n = e && e.mediaGroups && e.mediaGroups.AUDIO || {},
          r = !1;

      for (i in n) {
        for (var a in n[i]) if (r = t(n[i][a])) break;

        if (r) break;
      }

      return !!r;
    }

    function Io(i) {
      if (!i || !i.playlists || !i.playlists.length) return wo(i, function (e) {
        return e.playlists && e.playlists.length || e.uri;
      });

      for (var e = 0; e < i.playlists.length; e++) {
        var t = function (e) {
          var t = i.playlists[e],
              e = t.attributes && t.attributes.CODECS;
          return e && e.split(",").every(hr) || wo(i, function (e) {
            return Co(t, e);
          }) ? "continue" : {
            v: !1
          };
        }(e);

        if ("continue" !== t && "object" == typeof t) return t.v;
      }

      return !0;
    }

    function xo(e, t) {
      return e + "-" + t;
    }

    function Ao(r, a) {
      r.mediaGroups && ["AUDIO", "SUBTITLES"].forEach(function (e) {
        if (r.mediaGroups[e]) for (var t in r.mediaGroups[e]) for (var i in r.mediaGroups[e][t]) {
          var n = r.mediaGroups[e][t][i];
          a(n, e, t, i);
        }
      });
    }

    function Po(e) {
      var t = e.playlist,
          i = e.uri,
          e = e.id;
      t.id = e, t.playlistErrors_ = 0, i && (t.uri = i), t.attributes = t.attributes || {};
    }

    function Lo(a, e) {
      a.uri = e;

      for (var t, i = 0; i < a.playlists.length; i++) a.playlists[i].uri || (a.playlists[i].uri = "placeholder-uri-" + i);

      Ao(a, function (e, t, i, n) {
        var r = "placeholder-uri-" + t + "-" + i + "-" + n;
        e.playlists && e.playlists.length || (e.playlists = [g({}, e)]), e.playlists.forEach(function (e, t) {
          var i = xo(t, r);
          e.uri ? e.resolvedUri = e.resolvedUri || Mu(a.uri, e.uri) : (e.uri = 0 === t ? r : i, e.resolvedUri = e.uri), e.id = e.id || i, e.attributes = e.attributes || {}, a.playlists[e.id] = e, a.playlists[e.uri] = e;
        });
      }), function (e) {
        for (var t = e.playlists.length; t--;) {
          var i = e.playlists[t];
          Po({
            playlist: i,
            id: xo(t, i.uri)
          }), i.resolvedUri = Mu(e.uri, i.uri), e.playlists[i.id] = i, (e.playlists[i.uri] = i).attributes.BANDWIDTH || Fu.warn("Invalid playlist STREAM-INF detected. Missing BANDWIDTH attribute.");
        }
      }(a), Ao(t = a, function (e) {
        e.uri && (e.resolvedUri = Mu(t.uri, e.uri));
      });
    }

    function Do(e, t, i) {
      var n = e.slice(),
          r = t.slice();
      i = i || 0;

      for (var a, s = [], o = 0; o < r.length; o++) {
        var u = n[o + i],
            l = r[o];
        u ? (a = u.map || a, s.push(function (e, t) {
          if (!e) return t;
          var i = ju(e, t);
          if (e.preloadHints && !t.preloadHints && delete i.preloadHints, e.parts && !t.parts) delete i.parts;else if (e.parts && t.parts) for (var n = 0; n < t.parts.length; n++) e.parts && e.parts[n] && (i.parts[n] = ju(e.parts[n], t.parts[n]));
          return !e.skipped && t.skipped && (i.skipped = !1), e.preload && !t.preload && (i.preload = !1), i;
        }(u, l))) : (a && !l.map && (l.map = a), s.push(l));
      }

      return s;
    }

    function Oo(e, t) {
      !e.resolvedUri && e.uri && (e.resolvedUri = Mu(t, e.uri)), e.key && !e.key.resolvedUri && (e.key.resolvedUri = Mu(t, e.key.uri)), e.map && !e.map.resolvedUri && (e.map.resolvedUri = Mu(t, e.map.uri)), e.map && e.map.key && !e.map.key.resolvedUri && (e.map.key.resolvedUri = Mu(t, e.map.key.uri)), e.parts && e.parts.length && e.parts.forEach(function (e) {
        e.resolvedUri || (e.resolvedUri = Mu(t, e.uri));
      }), e.preloadHints && e.preloadHints.length && e.preloadHints.forEach(function (e) {
        e.resolvedUri || (e.resolvedUri = Mu(t, e.uri));
      });
    }

    function Ro(e) {
      var t = e.segments || [],
          i = e.preloadSegment;

      if (i && i.parts && i.parts.length) {
        if (i.preloadHints) for (var n = 0; n < i.preloadHints.length; n++) if ("MAP" === i.preloadHints[n].type) return t;
        i.duration = e.targetDuration, i.preload = !0, t.push(i);
      }

      return t;
    }

    function Mo(e, t) {
      return e === t || e.segments && t.segments && e.segments.length === t.segments.length && e.endList === t.endList && e.mediaSequence === t.mediaSequence;
    }

    function No(e, a, t) {
      void 0 === t && (t = Mo);
      var i = ju(e, {}),
          n = i.playlists[a.id];
      if (!n) return null;
      if (t(n, a)) return null;
      a.segments = Ro(a);
      var r = ju(n, a);

      if (r.preloadSegment && !a.preloadSegment && delete r.preloadSegment, n.segments) {
        if (a.skip) {
          a.segments = a.segments || [];

          for (var s = 0; s < a.skip.skippedSegments; s++) a.segments.unshift({
            skipped: !0
          });
        }

        r.segments = Do(n.segments, a.segments, a.mediaSequence - n.mediaSequence);
      }

      r.segments.forEach(function (e) {
        Oo(e, r.resolvedUri);
      });

      for (var o = 0; o < i.playlists.length; o++) i.playlists[o].id === a.id && (i.playlists[o] = r);

      return i.playlists[a.id] = r, i.playlists[a.uri] = r, Ao(e, function (e, t, i, n) {
        if (e.playlists) for (var r = 0; r < e.playlists.length; r++) a.id === e.playlists[r].id && (e.playlists[r] = a);
      }), i;
    }

    function Uo(e, t) {
      var i = (n = e.segments[e.segments.length - 1]) && n.parts && n.parts[n.parts.length - 1],
          n = i && i.duration || n && n.duration;
      return t && n ? 1e3 * n : 500 * (e.partTargetDuration || e.targetDuration || 10);
    }

    function Bo(e, t, i, n) {
      var r = "arraybuffer" === e.responseType ? e.response : e.responseText;
      !t && r && (e.responseTime = Date.now(), e.roundTripTime = e.responseTime - e.requestTime, e.bytesReceived = r.byteLength || r.length, e.bandwidth || (e.bandwidth = Math.floor(e.bytesReceived / e.roundTripTime * 8 * 1e3))), i.headers && (e.responseHeaders = i.headers), t && "ETIMEDOUT" === t.code && (e.timedout = !0), n(t = !t && !e.aborted && 200 !== i.statusCode && 206 !== i.statusCode && 0 !== i.statusCode ? new Error("XHR Failed with a response of: " + (e && (r || e.responseText))) : t, e);
    }

    function Fo() {
      function a(e, i) {
        e = Vu({
          timeout: 45e3
        }, e);
        var t = a.beforeRequest || Zn.Vhs.xhr.beforeRequest;
        !t || "function" != typeof t || (t = t(e)) && (e = t);
        var n = (!0 === Zn.Vhs.xhr.original ? qu : Zn.Vhs.xhr)(e, function (e, t) {
          return Bo(n, e, t, i);
        }),
            r = n.abort;
        return n.abort = function () {
          return n.aborted = !0, r.apply(n, arguments);
        }, n.uri = e.uri, n.requestTime = Date.now(), n;
      }

      return a.original = !0, a;
    }

    function jo(e) {
      var t,
          i = {};
      return e.byterange && (i.Range = (t = e.byterange, e = t.offset + t.length - 1, "bytes=" + t.offset + "-" + e)), i;
    }

    function Ho(e, t) {
      return e = e.toString(16), "00".substring(0, 2 - e.length) + e + (t % 2 ? " " : "");
    }

    function qo(e) {
      return 32 <= e && e < 126 ? String.fromCharCode(e) : ".";
    }

    function Vo(i) {
      var n = {};
      return Object.keys(i).forEach(function (e) {
        var t = i[e];
        ArrayBuffer.isView(t) ? n[e] = {
          bytes: t.buffer,
          byteOffset: t.byteOffset,
          byteLength: t.byteLength
        } : n[e] = t;
      }), n;
    }

    function Wo(e) {
      var t = e.byterange || {
        length: 1 / 0,
        offset: 0
      };
      return [t.length, t.offset, e.resolvedUri].join(",");
    }

    function zo(e) {
      return e.resolvedUri;
    }

    function Go(e) {
      for (var t = Array.prototype.slice.call(e), i = "", n = 0; n < t.length / 16; n++) i += t.slice(16 * n, 16 * n + 16).map(Ho).join("") + " " + t.slice(16 * n, 16 * n + 16).map(qo).join("") + "\n";

      return i;
    }

    function Xo(e) {
      var t = e.playlist,
          i = e.time,
          n = void 0 === i ? void 0 : i;
      if (!(i = e.callback)) throw new Error("getProgramTime: callback must be provided");
      return t && void 0 !== n ? (e = function (e, t) {
        if (!t || !t.segments || 0 === t.segments.length) return null;

        for (var i, n = 0, r = 0; r < t.segments.length && !(e <= (n = (i = t.segments[r]).videoTimingInfo ? i.videoTimingInfo.transmuxedPresentationEnd : n + i.duration)); r++);

        var a = t.segments[t.segments.length - 1];
        if (a.videoTimingInfo && a.videoTimingInfo.transmuxedPresentationEnd < e) return null;

        if (n < e) {
          if (e > n + .25 * a.duration) return null;
          i = a;
        }

        return {
          segment: i,
          estimatedStart: i.videoTimingInfo ? i.videoTimingInfo.transmuxedPresentationStart : n - i.duration,
          type: i.videoTimingInfo ? "accurate" : "estimate"
        };
      }(n, t)) ? "estimate" === e.type ? i({
        message: "Accurate programTime could not be determined. Please seek to e.seekTime and try again",
        seekTime: e.estimatedStart
      }) : (t = {
        mediaSeconds: n
      }, (e = function (e, t) {
        if (!t.dateTimeObject) return null;
        var i = t.videoTimingInfo.transmuxerPrependedSeconds,
            i = e - (t.videoTimingInfo.transmuxedPresentationStart + i);
        return new Date(t.dateTimeObject.getTime() + 1e3 * i);
      }(n, e.segment)) && (t.programDateTime = e.toISOString()), i(null, t)) : i({
        message: "valid programTime was not found"
      }) : i({
        message: "getProgramTime: playlist and time must be provided"
      });
    }

    function Ko(e) {
      var t = e.programTime,
          i = e.playlist,
          n = e.retryCount,
          r = void 0 === n ? 2 : n,
          a = e.seekTo,
          s = e.pauseAfterSeek,
          o = void 0 === s || s,
          u = e.tech,
          l = e.callback;
      if (!l) throw new Error("seekToProgramTime: callback must be provided");
      return "undefined" != typeof t && i && a ? i.endList || u.hasStarted_ ? function (e) {
        if (!e.segments || 0 === e.segments.length) return !1;

        for (var t = 0; t < e.segments.length; t++) if (!e.segments[t].dateTimeObject) return !1;

        return !0;
      }(i) ? (n = function (e, t) {
        var i;

        try {
          i = new Date(e);
        } catch (e) {
          return null;
        }

        if (!t || !t.segments || 0 === t.segments.length) return null;
        if (i < (r = t.segments[0]).dateTimeObject) return null;

        for (var n = 0; n < t.segments.length - 1; n++) {
          var r = t.segments[n];
          if (i < t.segments[n + 1].dateTimeObject) break;
        }

        var a,
            s = t.segments[t.segments.length - 1],
            e = s.dateTimeObject,
            a = s.videoTimingInfo ? (a = s.videoTimingInfo).transmuxedPresentationEnd - a.transmuxedPresentationStart - a.transmuxerPrependedSeconds : s.duration + .25 * s.duration;
        return new Date(e.getTime() + 1e3 * a) < i ? null : {
          segment: r = e < i ? s : r,
          estimatedStart: r.videoTimingInfo ? r.videoTimingInfo.transmuxedPresentationStart : Bu.duration(t, t.mediaSequence + t.segments.indexOf(r)),
          type: r.videoTimingInfo ? "accurate" : "estimate"
        };
      }(t, i)) ? (s = n.segment, e = function (e, t) {
        var i;

        try {
          n = new Date(e), i = new Date(t);
        } catch (e) {}

        var n = n.getTime();
        return (i.getTime() - n) / 1e3;
      }(s.dateTimeObject, t), "estimate" === n.type ? 0 === r ? l({
        message: t + " is not buffered yet. Try again"
      }) : (a(n.estimatedStart + e), void u.one("seeked", function () {
        Ko({
          programTime: t,
          playlist: i,
          retryCount: r - 1,
          seekTo: a,
          pauseAfterSeek: o,
          tech: u,
          callback: l
        });
      })) : (e = s.start + e, u.one("seeked", function () {
        return l(null, u.currentTime());
      }), o && u.pause(), void a(e))) : l({
        message: t + " was not found in the stream"
      }) : l({
        message: "programDateTime tags must be provided in the manifest " + i.resolvedUri
      }) : l({
        message: "player must be playing a live stream to start buffering"
      }) : l({
        message: "seekToProgramTime: programTime, seekTo and playlist must be provided"
      });
    }

    function Yo(e, t) {
      if (4 === e.readyState) return t();
    }

    function Qo(e, t, r) {
      function n(e, t, i, n) {
        return t.abort(), o = !0, r(e, t, i, n);
      }

      function i(e, t) {
        if (!o) {
          if (e) return n(e, t, "", s);
          var i = t.responseText.substring(s && s.byteLength || 0, t.responseText.length);
          if (s = function () {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

            if ((t = t.filter(function (e) {
              return e && (e.byteLength || e.length) && "string" != typeof e;
            })).length <= 1) return Ts(t[0]);
            var n = t.reduce(function (e, t, i) {
              return e + (t.byteLength || t.length);
            }, 0),
                r = new Uint8Array(n),
                a = 0;
            return t.forEach(function (e) {
              e = Ts(e), r.set(e, a), a += e.byteLength;
            }), r;
          }(s, Es(i, !0)), a = a || Cs(s), s.length < 10 || a && s.length < a + 2) return Yo(t, function () {
            return n(e, t, "", s);
          });
          i = io(s);
          return "ts" === i && s.length < 188 || !i && s.length < 376 ? Yo(t, function () {
            return n(e, t, "", s);
          }) : n(null, t, i, s);
        }
      }

      var a,
          s = [],
          o = !1,
          u = t({
        uri: e,
        beforeSend: function (t) {
          t.overrideMimeType("text/plain; charset=x-user-defined"), t.addEventListener("progress", function (e) {
            return e.total, e.loaded, Bo(t, null, {
              statusCode: t.status
            }, i);
          });
        }
      }, function (e, t) {
        return Bo(u, e, t, i);
      });
      return u;
    }

    function $o(e, t) {
      if (!Mo(e, t)) return !1;
      if (e.sidx && t.sidx && (e.sidx.offset !== t.sidx.offset || e.sidx.length !== t.sidx.length)) return !1;
      if (!e.sidx && t.sidx || e.sidx && !t.sidx) return !1;
      if (e.segments && !t.segments || !e.segments && t.segments) return !1;
      if (!e.segments && !t.segments) return !0;

      for (var i = 0; i < e.segments.length; i++) {
        var n = e.segments[i],
            r = t.segments[i];
        if (n.uri !== r.uri) return !1;

        if (n.byterange || r.byterange) {
          n = n.byterange, r = r.byterange;
          if (n && !r || !n && r) return !1;
          if (n.offset !== r.offset || n.length !== r.length) return !1;
        }
      }

      return !0;
    }

    function Jo(e, t) {
      var i,
          n = {};

      for (i in e) {
        var r = e[i].sidx;

        if (r) {
          var a = Qa(r);
          if (!t[a]) break;
          var s = t[a].sidxInfo;
          s = s, r = r, (Boolean(!s.map && !r.map) || Boolean(s.map && r.map && s.map.byterange.offset === r.map.byterange.offset && s.map.byterange.length === r.map.byterange.length)) && s.uri === r.uri && s.byterange.offset === r.byterange.offset && s.byterange.length === r.byterange.length && (n[a] = t[a]);
        }
      }

      return n;
    }

    function Zo(e) {
      return e.on = e.addEventListener, e.off = e.removeEventListener, e;
    }

    function eu(i) {
      var n = i.transmuxer,
          e = i.bytes,
          t = i.audioAppendStart,
          r = i.gopsToAlignWith,
          a = i.remux,
          s = i.onData,
          o = i.onTrackInfo,
          u = i.onAudioTimingInfo,
          l = i.onVideoTimingInfo,
          c = i.onVideoSegmentTimingInfo,
          d = i.onAudioSegmentTimingInfo,
          h = i.onId3,
          p = i.onCaptions,
          f = i.onDone,
          m = i.onEndedTimeline,
          g = i.onTransmuxerLog,
          y = i.isEndOfTimeline,
          v = {
        buffer: []
      },
          _ = y;
      n.onmessage = function (e) {
        var t;
        n.currentTransmux === i && ("data" === e.data.action && function (e, t, i) {
          var n = e.data.segment,
              r = n.type,
              a = n.initSegment,
              s = n.captions,
              o = n.captionStreams,
              u = n.metadata,
              l = n.videoFrameDtsTime,
              n = n.videoFramePtsTime;
          t.buffer.push({
            captions: s,
            captionStreams: o,
            metadata: u
          });
          e = e.data.segment.boxes || {
            data: e.data.segment.data
          }, a = {
            type: r,
            data: new Uint8Array(e.data, e.data.byteOffset, e.data.byteLength),
            initSegment: new Uint8Array(a.data, a.byteOffset, a.byteLength)
          };
          "undefined" != typeof l && (a.videoFrameDtsTime = l), "undefined" != typeof n && (a.videoFramePtsTime = n), i(a);
        }(e, v, s), "trackinfo" === e.data.action && o(e.data.trackInfo), "gopInfo" === e.data.action && (v.gopInfo = e.data.gopInfo), "audioTimingInfo" === e.data.action && u(e.data.audioTimingInfo), "videoTimingInfo" === e.data.action && l(e.data.videoTimingInfo), "videoSegmentTimingInfo" === e.data.action && c(e.data.videoSegmentTimingInfo), "audioSegmentTimingInfo" === e.data.action && d(e.data.audioSegmentTimingInfo), "id3Frame" === e.data.action && h([e.data.id3Frame], e.data.id3Frame.dispatchType), "caption" === e.data.action && p(e.data.caption), "endedtimeline" === e.data.action && (_ = !1, m()), "log" === e.data.action && g(e.data.log), "transmuxed" === e.data.type && (_ || (n.onmessage = null, e = (t = {
          transmuxedData: v,
          callback: f
        }).transmuxedData, t = t.callback, e.buffer = [], t(e), Ku(n))));
      }, t && n.postMessage({
        action: "setAudioAppendStart",
        appendStart: t
      }), Array.isArray(r) && n.postMessage({
        action: "alignGopsWith",
        gopsToAlignWith: r
      }), "undefined" != typeof a && n.postMessage({
        action: "setRemux",
        remux: a
      }), e.byteLength && (r = e instanceof ArrayBuffer ? e : e.buffer, a = e instanceof ArrayBuffer ? 0 : e.byteOffset, n.postMessage({
        action: "push",
        data: r,
        byteOffset: a,
        byteLength: e.byteLength
      }, [r])), y && n.postMessage({
        action: "endTimeline"
      }), n.postMessage({
        action: "flush"
      });
    }

    function tu(e, t) {
      e.postMessage({
        action: t
      }), Ku(e);
    }

    function iu(e, t) {
      if (!t.currentTransmux) return t.currentTransmux = e, tu(t, e), 0;
      t.transmuxQueue.push(tu.bind(null, t, e));
    }

    function nu(e) {
      if (!e.transmuxer.currentTransmux) return e.transmuxer.currentTransmux = e, void eu(e);
      e.transmuxer.transmuxQueue.push(e);
    }

    function ru(i) {
      var n = i.transmuxer,
          r = i.endAction || i.action,
          a = i.callback,
          e = g({}, i, {
        endAction: null,
        transmuxer: null,
        callback: null
      }),
          t = function e(t) {
        t.data.action === r && (n.removeEventListener("message", e), t.data.data && (t.data.data = new Uint8Array(t.data.data, i.byteOffset || 0, i.byteLength || t.data.data.byteLength), i.data && (i.data = t.data.data)), a(t.data));
      };

      n.addEventListener("message", t), i.data ? (t = i.data instanceof ArrayBuffer, e.byteOffset = t ? 0 : i.data.byteOffset, e.byteLength = i.data.byteLength, t = [t ? i.data : i.data.buffer], n.postMessage(e, t)) : n.postMessage(e);
    }

    function au(e) {
      e.forEach(function (e) {
        e.abort();
      });
    }

    function su(e, t) {
      return t.timedout ? {
        status: t.status,
        message: "HLS request timed-out at URL: " + t.uri,
        code: Ju,
        xhr: t
      } : t.aborted ? {
        status: t.status,
        message: "HLS request aborted at URL: " + t.uri,
        code: Zu,
        xhr: t
      } : e ? {
        status: t.status,
        message: "HLS request errored at URL: " + t.uri,
        code: $u,
        xhr: t
      } : "arraybuffer" === t.responseType && 0 === t.response.byteLength ? {
        status: t.status,
        message: "Empty HLS response at URL: " + t.uri,
        code: $u,
        xhr: t
      } : null;
    }

    function ou(a, s, o) {
      return function (e, t) {
        var i = t.response,
            e = su(e, t);
        if (e) return o(e, a);
        if (16 !== i.byteLength) return o({
          status: t.status,
          message: "Invalid HLS key at URL: " + t.uri,
          code: $u,
          xhr: t
        }, a);

        for (var i = new DataView(i), n = new Uint32Array([i.getUint32(0), i.getUint32(4), i.getUint32(8), i.getUint32(12)]), r = 0; r < s.length; r++) s[r].bytes = n;

        return o(null, a);
      };
    }

    function uu(i, n) {
      var e = io(i.map.bytes);

      if ("mp4" !== e) {
        var t = i.map.resolvedUri || i.map.uri;
        return n({
          internal: !0,
          message: "Found unsupported " + (e || "unknown") + " container for initialization segment at URL: " + t,
          code: $u
        });
      }

      ru({
        action: "probeMp4Tracks",
        data: i.map.bytes,
        transmuxer: i.transmuxer,
        callback: function (e) {
          var t = e.tracks,
              e = e.data;
          return i.map.bytes = e, t.forEach(function (e) {
            i.map.tracks = i.map.tracks || {}, i.map.tracks[e.type] || "number" == typeof (i.map.tracks[e.type] = e).id && e.timescale && (i.map.timescales = i.map.timescales || {}, i.map.timescales[e.id] = e.timescale);
          }), n(null);
        }
      });
    }

    function lu(e) {
      var i = e.segment,
          n = e.finishProcessingFn,
          r = e.responseType;
      return function (e, t) {
        e = su(e, t);
        if (e) return n(e, i);
        e = "arraybuffer" !== r && t.responseText ? function (e) {
          for (var t = new Uint8Array(new ArrayBuffer(e.length)), i = 0; i < e.length; i++) t[i] = e.charCodeAt(i);

          return t.buffer;
        }(t.responseText.substring(i.lastReachedChar || 0)) : t.response;
        return i.stats = {
          bandwidth: (t = t).bandwidth,
          bytesReceived: t.bytesReceived || 0,
          roundTripTime: t.roundTripTime || 0
        }, i.key ? i.encryptedBytes = new Uint8Array(e) : i.bytes = new Uint8Array(e), n(null, i);
      };
    }

    function cu(e) {
      var i = e.segment,
          t = e.bytes,
          n = e.trackInfoFn,
          r = e.timingInfoFn,
          a = e.videoSegmentTimingInfoFn,
          s = e.audioSegmentTimingInfoFn,
          o = e.id3Fn,
          u = e.captionsFn,
          l = e.isEndOfTimeline,
          c = e.endedTimelineFn,
          d = e.dataFn,
          h = e.doneFn,
          p = e.onTransmuxerLog,
          e = i.map && i.map.tracks || {},
          f = Boolean(e.audio && e.video),
          m = r.bind(null, i, "audio", "start"),
          g = r.bind(null, i, "audio", "end"),
          y = r.bind(null, i, "video", "start"),
          v = r.bind(null, i, "video", "end");
      ru({
        action: "probeTs",
        transmuxer: i.transmuxer,
        data: t,
        baseStartTime: i.baseStartTime,
        callback: function (e) {
          i.bytes = t = e.data;
          e = e.result;
          e && (n(i, {
            hasAudio: e.hasAudio,
            hasVideo: e.hasVideo,
            isMuxed: f
          }), n = null, e.hasAudio && !f && m(e.audioStart), e.hasVideo && y(e.videoStart), y = m = null), nu({
            bytes: t,
            transmuxer: i.transmuxer,
            audioAppendStart: i.audioAppendStart,
            gopsToAlignWith: i.gopsToAlignWith,
            remux: f,
            onData: function (e) {
              e.type = "combined" === e.type ? "video" : e.type, d(i, e);
            },
            onTrackInfo: function (e) {
              n && (f && (e.isMuxed = !0), n(i, e));
            },
            onAudioTimingInfo: function (e) {
              m && "undefined" != typeof e.start && (m(e.start), m = null), g && "undefined" != typeof e.end && g(e.end);
            },
            onVideoTimingInfo: function (e) {
              y && "undefined" != typeof e.start && (y(e.start), y = null), v && "undefined" != typeof e.end && v(e.end);
            },
            onVideoSegmentTimingInfo: function (e) {
              a(e);
            },
            onAudioSegmentTimingInfo: function (e) {
              s(e);
            },
            onId3: function (e, t) {
              o(i, e, t);
            },
            onCaptions: function (e) {
              u(i, [e]);
            },
            isEndOfTimeline: l,
            onEndedTimeline: function () {
              c();
            },
            onTransmuxerLog: p,
            onDone: function (e) {
              h && (e.type = "combined" === e.type ? "video" : e.type, h(null, i, e));
            }
          });
        }
      });
    }

    function du(e) {
      var i = e.segment,
          n = e.bytes,
          t = e.trackInfoFn,
          r = e.timingInfoFn,
          a = e.videoSegmentTimingInfoFn,
          s = e.audioSegmentTimingInfoFn,
          o = e.id3Fn,
          u = e.captionsFn,
          l = e.isEndOfTimeline,
          c = e.endedTimelineFn,
          d = e.dataFn,
          h = e.doneFn,
          p = e.onTransmuxerLog,
          f = new Uint8Array(n);

      if (0 < Is(f, ["moof"]).length) {
        i.isFmp4 = !0;
        var m = i.map.tracks,
            g = {
          isFmp4: !0,
          hasVideo: !!m.video,
          hasAudio: !!m.audio
        };
        m.audio && m.audio.codec && "enca" !== m.audio.codec && (g.audioCodec = m.audio.codec), m.video && m.video.codec && "encv" !== m.video.codec && (g.videoCodec = m.video.codec), m.video && m.audio && (g.isMuxed = !0), t(i, g);

        var y = function (e) {
          d(i, {
            data: f,
            type: g.hasAudio && !g.isMuxed ? "audio" : "video"
          }), e && e.length && u(i, e), h(null, i, {});
        };

        ru({
          action: "probeMp4StartTime",
          timescales: i.map.timescales,
          data: f,
          transmuxer: i.transmuxer,
          callback: function (e) {
            var t = e.data,
                e = e.startTime;
            n = t.buffer, i.bytes = f = t, g.hasAudio && !g.isMuxed && r(i, "audio", "start", e), g.hasVideo && r(i, "video", "start", e), m.video && t.byteLength && i.transmuxer ? ru({
              action: "pushMp4Captions",
              endAction: "mp4Captions",
              transmuxer: i.transmuxer,
              data: f,
              timescales: i.map.timescales,
              trackIds: [m.video.id],
              callback: function (e) {
                n = e.data.buffer, i.bytes = f = e.data, e.logs.forEach(function (e) {
                  p(Zn.mergeOptions(e, {
                    stream: "mp4CaptionParser"
                  }));
                }), y(e.captions);
              }
            }) : y();
          }
        });
      } else if (i.transmuxer) {
        if ("undefined" == typeof i.container && (i.container = io(f)), "ts" !== i.container && "aac" !== i.container) return t(i, {
          hasAudio: !1,
          hasVideo: !1
        }), h(null, i, {}), 0;
        cu({
          segment: i,
          bytes: n,
          trackInfoFn: t,
          timingInfoFn: r,
          videoSegmentTimingInfoFn: a,
          audioSegmentTimingInfoFn: s,
          id3Fn: o,
          captionsFn: u,
          isEndOfTimeline: l,
          endedTimelineFn: c,
          dataFn: d,
          doneFn: h,
          onTransmuxerLog: p
        });
      } else h(null, i, {});
    }

    function hu(e, i) {
      var n = e.id,
          t = e.key,
          r = e.encryptedBytes,
          a = e.decryptionWorker,
          e = function e(t) {
        t.data.source === n && (a.removeEventListener("message", e), t = t.data.decrypted, i(new Uint8Array(t.bytes, t.byteOffset, t.byteLength)));
      };

      a.addEventListener("message", e), e = t.bytes.slice ? t.bytes.slice() : new Uint32Array(Array.prototype.slice.call(t.bytes)), a.postMessage(Vo({
        source: n,
        encrypted: r,
        key: e,
        iv: t.iv
      }), [r.buffer, e.buffer]);
    }

    function pu(e) {
      var i = e.activeXhrs,
          m = e.decryptionWorker,
          g = e.trackInfoFn,
          y = e.timingInfoFn,
          v = e.videoSegmentTimingInfoFn,
          _ = e.audioSegmentTimingInfoFn,
          b = e.id3Fn,
          T = e.captionsFn,
          S = e.isEndOfTimeline,
          E = e.endedTimelineFn,
          k = e.dataFn,
          C = e.doneFn,
          w = e.onTransmuxerLog,
          n = 0,
          r = !1;
      return function (e, f) {
        if (!r) {
          if (e) return r = !0, au(i), C(e, f);

          if ((n += 1) === i.length) {
            var t = function () {
              if (f.encryptedBytes) return t = (e = {
                decryptionWorker: m,
                segment: f,
                trackInfoFn: g,
                timingInfoFn: y,
                videoSegmentTimingInfoFn: v,
                audioSegmentTimingInfoFn: _,
                id3Fn: b,
                captionsFn: T,
                isEndOfTimeline: S,
                endedTimelineFn: E,
                dataFn: k,
                doneFn: C,
                onTransmuxerLog: w
              }).decryptionWorker, i = e.segment, n = e.trackInfoFn, r = e.timingInfoFn, a = e.videoSegmentTimingInfoFn, s = e.audioSegmentTimingInfoFn, o = e.id3Fn, u = e.captionsFn, l = e.isEndOfTimeline, c = e.endedTimelineFn, d = e.dataFn, h = e.doneFn, p = e.onTransmuxerLog, void hu({
                id: i.requestId,
                key: i.key,
                encryptedBytes: i.encryptedBytes,
                decryptionWorker: t
              }, function (e) {
                i.bytes = e, du({
                  segment: i,
                  bytes: i.bytes,
                  trackInfoFn: n,
                  timingInfoFn: r,
                  videoSegmentTimingInfoFn: a,
                  audioSegmentTimingInfoFn: s,
                  id3Fn: o,
                  captionsFn: u,
                  isEndOfTimeline: l,
                  endedTimelineFn: c,
                  dataFn: d,
                  doneFn: h,
                  onTransmuxerLog: p
                });
              });
              var e, t, i, n, r, a, s, o, u, l, c, d, h, p;
              du({
                segment: f,
                bytes: f.bytes,
                trackInfoFn: g,
                timingInfoFn: y,
                videoSegmentTimingInfoFn: v,
                audioSegmentTimingInfoFn: _,
                id3Fn: b,
                captionsFn: T,
                isEndOfTimeline: S,
                endedTimelineFn: E,
                dataFn: k,
                doneFn: C,
                onTransmuxerLog: w
              });
            };

            if (f.endOfAllRequests = Date.now(), f.map && f.map.encryptedBytes && !f.map.bytes) return hu({
              decryptionWorker: m,
              id: f.requestId + "-init",
              encryptedBytes: f.map.encryptedBytes,
              key: f.map.key
            }, function (e) {
              f.map.bytes = e, uu(f, function (e) {
                return e ? (au(i), C(e, f)) : void t();
              });
            });
            t();
          }
        }
      };
    }

    function fu(e) {
      var n = e.segment,
          r = e.progressFn;
      return e.trackInfoFn, e.timingInfoFn, e.videoSegmentTimingInfoFn, e.audioSegmentTimingInfoFn, e.id3Fn, e.captionsFn, e.isEndOfTimeline, e.endedTimelineFn, e.dataFn, function (e) {
        var t,
            i = e.target;
        if (!i.aborted) return n.stats = Zn.mergeOptions(n.stats, (i = (t = e).target, (i = {
          bandwidth: 1 / 0,
          bytesReceived: 0,
          roundTripTime: Date.now() - i.requestTime || 0
        }).bytesReceived = t.loaded, i.bandwidth = Math.floor(i.bytesReceived / i.roundTripTime * 8 * 1e3), i)), !n.stats.firstBytesReceivedAt && n.stats.bytesReceived && (n.stats.firstBytesReceivedAt = Date.now()), r(e, n);
      };
    }

    function mu(e) {
      var t,
          i,
          n,
          r = e.xhr,
          a = e.xhrOptions,
          s = e.decryptionWorker,
          o = e.segment,
          u = e.abortFn,
          l = e.progressFn,
          c = e.trackInfoFn,
          d = e.timingInfoFn,
          h = e.videoSegmentTimingInfoFn,
          p = e.audioSegmentTimingInfoFn,
          f = e.id3Fn,
          m = e.captionsFn,
          g = e.isEndOfTimeline,
          y = e.endedTimelineFn,
          v = e.dataFn,
          _ = e.doneFn,
          e = e.onTransmuxerLog,
          b = [],
          _ = pu({
        activeXhrs: b,
        decryptionWorker: s,
        trackInfoFn: c,
        timingInfoFn: d,
        videoSegmentTimingInfoFn: h,
        audioSegmentTimingInfoFn: p,
        id3Fn: f,
        captionsFn: m,
        isEndOfTimeline: g,
        endedTimelineFn: y,
        dataFn: v,
        doneFn: _,
        onTransmuxerLog: e
      });

      o.key && !o.key.bytes && (e = [o.key], o.map && !o.map.bytes && o.map.key && o.map.key.resolvedUri === o.key.resolvedUri && e.push(o.map.key), e = r(Zn.mergeOptions(a, {
        uri: o.key.resolvedUri,
        responseType: "arraybuffer"
      }), ou(o, e, _)), b.push(e)), o.map && !o.map.bytes && (!o.map.key || o.key && o.key.resolvedUri === o.map.key.resolvedUri || (t = r(Zn.mergeOptions(a, {
        uri: o.map.key.resolvedUri,
        responseType: "arraybuffer"
      }), ou(o, [o.map.key], _)), b.push(t)), t = r(Zn.mergeOptions(a, {
        uri: o.map.resolvedUri,
        responseType: "arraybuffer",
        headers: jo(o.map)
      }), (i = (t = {
        segment: o,
        finishProcessingFn: _
      }).segment, n = t.finishProcessingFn, function (e, t) {
        e = su(e, t);
        if (e) return n(e, i);
        e = new Uint8Array(t.response);
        if (i.map.key) return i.map.encryptedBytes = e, n(null, i);
        i.map.bytes = e, uu(i, function (e) {
          return e ? (e.xhr = t, e.status = t.status, n(e, i)) : void n(null, i);
        });
      })), b.push(t)), a = Zn.mergeOptions(a, {
        uri: o.part && o.part.resolvedUri || o.resolvedUri,
        responseType: "arraybuffer",
        headers: jo(o)
      }), (a = r(a, lu({
        segment: o,
        finishProcessingFn: _,
        responseType: a.responseType
      }))).addEventListener("progress", fu({
        segment: o,
        progressFn: l,
        trackInfoFn: c,
        timingInfoFn: d,
        videoSegmentTimingInfoFn: h,
        audioSegmentTimingInfoFn: p,
        id3Fn: f,
        captionsFn: m,
        isEndOfTimeline: g,
        endedTimelineFn: y,
        dataFn: v
      })), b.push(a);
      var T = {};
      return b.forEach(function (e) {
        var t, i;
        e.addEventListener("loadend", (t = (e = {
          loadendState: T,
          abortFn: u
        }).loadendState, i = e.abortFn, function (e) {
          e.target.aborted && i && !t.calledAbortFn && (i(), t.calledAbortFn = !0);
        }));
      }), function () {
        return au(b);
      };
    }

    function gu(e, t) {
      return t = t.attributes || {}, e && e.mediaGroups && e.mediaGroups.AUDIO && t.AUDIO && e.mediaGroups.AUDIO[t.AUDIO];
    }

    function yu(e) {
      var n = {};
      return e.forEach(function (e) {
        var t = e.mediaType,
            i = e.type,
            e = e.details;
        n[t] = n[t] || [], n[t].push(cr("" + i + e));
      }), Object.keys(n).forEach(function (e) {
        return 1 < n[e].length ? (el("multiple " + e + " codecs found as attributes: " + n[e].join(", ") + ". Setting playlist codecs to null so that we wait for mux.js to probe segments for real codecs."), void (n[e] = null)) : void (n[e] = n[e][0]);
      }), n;
    }

    function vu(e) {
      var t = 0;
      return e.audio && t++, e.video && t++, t;
    }

    function _u(e, t) {
      var i,
          n = t.attributes || {},
          r = yu(function (e) {
        e = e.attributes || {};
        if (e.CODECS) return dr(e.CODECS);
      }(t) || []);
      return gu(e, t) && !r.audio && !function (e, t) {
        if (!gu(e, t)) return !0;
        var i,
            t = t.attributes || {},
            n = e.mediaGroups.AUDIO[t.AUDIO];

        for (i in n) if (!n[i].uri && !n[i].playlists) return !0;

        return !1;
      }(e, t) && (i = yu(function (e, t) {
        if (!e.mediaGroups.AUDIO || !t) return null;
        var i,
            n = e.mediaGroups.AUDIO[t];
        if (!n) return null;

        for (i in n) {
          var r = n[i];
          if (r.default && r.playlists) return dr(r.playlists[0].attributes.CODECS);
        }

        return null;
      }(e, n.AUDIO) || [])).audio && (r.audio = i.audio), r;
    }

    function bu(e) {
      if (e && e.playlist) {
        var t = e.playlist;
        return JSON.stringify({
          id: t.id,
          bandwidth: e.bandwidth,
          width: e.width,
          height: e.height,
          codecs: t.attributes && t.attributes.CODECS || ""
        });
      }
    }

    function Tu(e, t) {
      return (e = e && _.getComputedStyle(e)) ? e[t] : "";
    }

    function Su(e, n) {
      var r = e.slice();
      e.sort(function (e, t) {
        var i = n(e, t);
        return 0 === i ? r.indexOf(e) - r.indexOf(t) : i;
      });
    }

    function Eu(e, t) {
      var i, n;
      return (i = (i = e.attributes.BANDWIDTH ? e.attributes.BANDWIDTH : i) || _.Number.MAX_VALUE) - (n = (n = t.attributes.BANDWIDTH ? t.attributes.BANDWIDTH : n) || _.Number.MAX_VALUE);
    }

    function ku(e, t, i, n, r, a) {
      if (e) {
        var s = {
          bandwidth: t,
          width: i,
          height: n,
          limitRenditionByPlayerDimensions: r
        },
            o = e.playlists;
        Bu.isAudioOnly(e) && (o = a.getAudioTrackPlaylists_(), s.audioOnly = !0);
        var u = o.map(function (e) {
          var t = e.attributes && e.attributes.RESOLUTION && e.attributes.RESOLUTION.width,
              i = e.attributes && e.attributes.RESOLUTION && e.attributes.RESOLUTION.height,
              n = e.attributes && e.attributes.BANDWIDTH;
          return {
            bandwidth: n || _.Number.MAX_VALUE,
            width: t,
            height: i,
            playlist: e
          };
        });
        Su(u, function (e, t) {
          return e.bandwidth - t.bandwidth;
        });
        var e = (u = u.filter(function (e) {
          return !Bu.isIncompatible(e.playlist);
        })).filter(function (e) {
          return Bu.isEnabled(e.playlist);
        }),
            a = (e = !e.length ? u.filter(function (e) {
          return !Bu.isDisabled(e.playlist);
        }) : e).filter(function (e) {
          return e.bandwidth * Gu.BANDWIDTH_VARIANCE < t;
        }),
            l = a[a.length - 1],
            o = a.filter(function (e) {
          return e.bandwidth === l.bandwidth;
        })[0];

        if (!1 === r) {
          var c = o || e[0] || u[0];

          if (c && c.playlist) {
            r = o ? "bandwidthBestRep" : "sortedPlaylistReps";
            return e[0] && (r = "enabledPlaylistReps"), tl("choosing " + bu(c) + " using " + r + " with options", s), c.playlist;
          }

          return tl("could not choose a playlist with options", s), null;
        }

        c = a.filter(function (e) {
          return e.width && e.height;
        });
        Su(c, function (e, t) {
          return e.width - t.width;
        });
        var d,
            h,
            a = c.filter(function (e) {
          return e.width === i && e.height === n;
        }),
            l = a[a.length - 1],
            a = a.filter(function (e) {
          return e.bandwidth === l.bandwidth;
        })[0];
        a || (p = (d = c.filter(function (e) {
          return e.width > i || e.height > n;
        })).filter(function (e) {
          return e.width === d[0].width && e.height === d[0].height;
        }), l = p[p.length - 1], h = p.filter(function (e) {
          return e.bandwidth === l.bandwidth;
        })[0]);
        var p = h || a || o || e[0] || u[0];

        if (p && p.playlist) {
          u = "sortedPlaylistReps";
          return h ? u = "resolutionPlusOneRep" : a ? u = "resolutionBestRep" : o ? u = "bandwidthBestRep" : e[0] && (u = "enabledPlaylistReps"), tl("choosing " + bu(p) + " using " + u + " with options", s), p.playlist;
        }

        return tl("could not choose a playlist with options", s), null;
      }
    }

    function Cu(e) {
      var t = e.inbandTextTracks,
          i = e.metadataArray,
          r = e.timestampOffset,
          n = e.videoDuration;

      if (i) {
        var a = _.WebKitDataCue || _.VTTCue,
            s = t.metadataTrack_;

        if (s && (i.forEach(function (e) {
          var n = e.cueTime + r;
          !("number" != typeof n || _.isNaN(n) || n < 0) && n < 1 / 0 && e.frames.forEach(function (e) {
            var t,
                i = new a(n, n, e.value || e.url || e.data || "");
            i.frame = e, i.value = e, t = i, Object.defineProperties(t.frame, {
              id: {
                get: function () {
                  return Zn.log.warn("cue.frame.id is deprecated. Use cue.value.key instead."), t.value.key;
                }
              },
              value: {
                get: function () {
                  return Zn.log.warn("cue.frame.value is deprecated. Use cue.value.data instead."), t.value.data;
                }
              },
              privateData: {
                get: function () {
                  return Zn.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."), t.value.data;
                }
              }
            }), s.addCue(i);
          });
        }), s.cues && s.cues.length)) {
          for (var o = s.cues, u = [], l = 0; l < o.length; l++) o[l] && u.push(o[l]);

          var c = u.reduce(function (e, t) {
            var i = e[t.startTime] || [];
            return i.push(t), e[t.startTime] = i, e;
          }, {}),
              d = Object.keys(c).sort(function (e, t) {
            return Number(e) - Number(t);
          });
          d.forEach(function (e, t) {
            var e = c[e],
                i = Number(d[t + 1]) || n;
            e.forEach(function (e) {
              e.endTime = i;
            });
          });
        }
      }
    }

    function wu(e, t, i) {
      var n, r;
      if (i && i.cues) for (n = i.cues.length; n--;) (r = i.cues[n]).startTime >= e && r.endTime <= t && i.removeCue(r);
    }

    function Iu(e) {
      return "number" == typeof e && isFinite(e);
    }

    function xu(e) {
      var t = e.startOfSegment,
          i = e.duration,
          n = e.segment,
          r = e.part,
          a = e.playlist,
          s = a.mediaSequence,
          o = a.id,
          u = a.segments,
          l = e.mediaIndex,
          c = e.partIndex,
          d = e.timeline,
          h = (void 0 === u ? [] : u).length - 1,
          p = "mediaIndex/partIndex increment";
      return e.getMediaInfoForTime ? p = "getMediaInfoForTime (" + e.getMediaInfoForTime + ")" : e.isSyncRequest && (p = "getSyncSegmentCandidate (isSyncRequest)"), a = "number" == typeof c, u = e.segment.uri ? "segment" : "pre-segment", e = a ? fo({
        preloadSegment: n
      }) - 1 : 0, u + " [" + (s + l) + "/" + (s + h) + "]" + (a ? " part [" + c + "/" + e + "]" : "") + " segment start/end [" + n.start + " => " + n.end + "]" + (a ? " part start/end [" + r.start + " => " + r.end + "]" : "") + " startOfSegment [" + t + "] duration [" + i + "] timeline [" + d + "] selected by [" + p + "] playlist [" + o + "]";
    }

    function Au(e) {
      return e + "TimingInfo";
    }

    function Pu(e) {
      var t = e.timelineChangeController,
          i = e.currentTimeline,
          n = e.segmentTimeline,
          r = e.loaderType,
          e = e.audioDisabled;

      if (i !== n) {
        if ("audio" === r) {
          i = t.lastTimelineChange({
            type: "main"
          });
          return !i || i.to !== n;
        }

        if ("main" === r && e) {
          t = t.pendingTimelineChange({
            type: "audio"
          });
          return t && t.to === n ? !1 : !0;
        }
      }
    }

    function Lu(e) {
      var t = e.segmentDuration,
          e = e.maxDuration;
      return !!t && Math.round(t) > e + Nu;
    }

    function Du(e, t) {
      if ("hls" !== t) return null;

      var i = function (e, t) {
        e = e && "number" == typeof e.start && "number" == typeof e.end ? e.end - e.start : 0, t = t && "number" == typeof t.start && "number" == typeof t.end ? t.end - t.start : 0;
        return Math.max(e, t);
      }(e.audioTimingInfo, e.videoTimingInfo);

      if (!i) return null;
      var n = e.playlist.targetDuration,
          r = Lu({
        segmentDuration: i,
        maxDuration: 2 * n
      }),
          t = Lu({
        segmentDuration: i,
        maxDuration: n
      }),
          n = "Segment with index " + e.mediaIndex + " from playlist " + e.playlist.id + " has a duration of " + i + " when the reported duration is " + e.duration + " and the target duration is " + n + ". For HLS content, a duration in excess of the target duration may result in playback issues. See the HLS specification section on EXT-X-TARGETDURATION for more details: https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.3.1";
      return r || t ? {
        severity: r ? "warn" : "info",
        message: n
      } : null;
    }

    var Ou = eo,
        Ru = 9e4,
        Mu = er,
        Nu = 1 / 30,
        Uu = Zn.createTimeRange,
        Bu = {
      liveEdgeDelay: mo,
      duration: yo,
      seekable: function (e, t, i) {
        var n = t || 0,
            i = _o(e, t, !0, i);

        return null === i ? Uu() : Uu(n, i);
      },
      getMediaInfoForTime: function (e) {
        for (var t = e.playlist, i = e.currentTime, n = e.startingSegmentIndex, r = e.startingPartIndex, a = e.startTime, s = i - a, o = ho(t), u = 0, l = 0; l < o.length; l++) {
          var c = o[l];

          if (n === c.segmentIndex && ("number" != typeof r || "number" != typeof c.partIndex || r === c.partIndex)) {
            u = l;
            break;
          }
        }

        if (s < 0) {
          if (0 < u) for (var d = u - 1; 0 <= d; d--) {
            var h = o[d];
            if (0 < (s += h.duration) + Nu) return {
              partIndex: h.partIndex,
              segmentIndex: h.segmentIndex,
              startTime: a - vo({
                defaultDuration: t.targetDuration,
                durationList: o,
                startIndex: u,
                endIndex: d
              })
            };
          }
          return {
            partIndex: o[0] && o[0].partIndex || null,
            segmentIndex: o[0] && o[0].segmentIndex || 0,
            startTime: i
          };
        }

        if (u < 0) {
          for (var p = u; p < 0; p++) if ((s -= t.targetDuration) < 0) return {
            partIndex: o[0] && o[0].partIndex || null,
            segmentIndex: o[0] && o[0].segmentIndex || 0,
            startTime: i
          };

          u = 0;
        }

        for (var f = u; f < o.length; f++) {
          var m = o[f];
          if ((s -= m.duration) - Nu < 0) return {
            partIndex: m.partIndex,
            segmentIndex: m.segmentIndex,
            startTime: a + vo({
              defaultDuration: t.targetDuration,
              durationList: o,
              startIndex: u,
              endIndex: f
            })
          };
        }

        return {
          segmentIndex: o[o.length - 1].segmentIndex,
          partIndex: o[o.length - 1].partIndex,
          startTime: i
        };
      },
      isEnabled: So,
      isDisabled: function (e) {
        return e.disabled;
      },
      isBlacklisted: bo,
      isIncompatible: To,
      playlistEnd: _o,
      isAes: function (e) {
        for (var t = 0; t < e.segments.length; t++) if (e.segments[t].key) return !0;

        return !1;
      },
      hasAttribute: Eo,
      estimateSegmentRequestTime: function (e, t, i, n) {
        return Eo("BANDWIDTH", i) ? (e * i.attributes.BANDWIDTH - 8 * (n = void 0 === n ? 0 : n)) / t : NaN;
      },
      isLowestEnabledRendition: ko,
      isAudioOnly: Io,
      playlistMatch: Co
    },
        Fu = Zn.log,
        ju = Zn.mergeOptions,
        z = Zn.EventTarget,
        Hu = function (a) {
      function e(e, t, i) {
        var n;
        if (void 0 === i && (i = {}), n = a.call(this) || this, !e) throw new Error("A non-empty playlist URL or object is required");
        n.logger_ = ro("PlaylistLoader");
        var r = i.withCredentials,
            r = void 0 !== r && r,
            i = i.handleManifestRedirects,
            i = void 0 !== i && i;
        n.src = e, n.vhs_ = t, n.withCredentials = r, n.handleManifestRedirects = i;
        t = t.options_;
        return n.customTagParsers = t && t.customTagParsers || [], n.customTagMappers = t && t.customTagMappers || [], n.experimentalLLHLS = t && t.experimentalLLHLS || !1, n.state = "HAVE_NOTHING", n.handleMediaupdatetimeout_ = n.handleMediaupdatetimeout_.bind(ft(n)), n.on("mediaupdatetimeout", n.handleMediaupdatetimeout_), n;
      }

      mt(e, a);
      var t = e.prototype;
      return t.handleMediaupdatetimeout_ = function () {
        var e,
            t,
            i = this;
        "HAVE_METADATA" === this.state && (e = this.media(), t = Mu(this.master.uri, e.uri), this.experimentalLLHLS && (t = function (i, e) {
          if (e.endList) return i;
          var t,
              n,
              r,
              a = [];
          return e.serverControl && e.serverControl.canBlockReload && (r = e.preloadSegment, t = e.mediaSequence + e.segments.length, r && (n = r.parts || [], -1 < (r = fo(e) - 1) && r != n.length - 1 && a.push("_HLS_part=" + r), (-1 < r || n.length) && t--), a.unshift("_HLS_msn=" + t)), e.serverControl && e.serverControl.canSkipUntil && a.unshift("_HLS_skip=" + (e.serverControl.canSkipDateranges ? "v2" : "YES")), a.forEach(function (e, t) {
            i += (0 === t ? "?" : "&") + e;
          }), i;
        }(t, e)), this.state = "HAVE_CURRENT_METADATA", this.request = this.vhs_.xhr({
          uri: t,
          withCredentials: this.withCredentials
        }, function (e, t) {
          if (i.request) return e ? i.playlistRequestError(i.request, i.media(), "HAVE_METADATA") : void i.haveMetadata({
            playlistString: i.request.responseText,
            url: i.media().uri,
            id: i.media().id
          });
        }));
      }, t.playlistRequestError = function (e, t, i) {
        var n = t.uri,
            t = t.id;
        this.request = null, i && (this.state = i), this.error = {
          playlist: this.master.playlists[t],
          status: e.status,
          message: "HLS playlist request error at URL: " + n + ".",
          responseText: e.responseText,
          code: 500 <= e.status ? 4 : 2
        }, this.trigger("error");
      }, t.parseManifest_ = function (e) {
        var t = this,
            i = e.url;
        return function (e) {
          var t = e.onwarn,
              i = e.oninfo,
              n = e.manifestString,
              r = e.customTagParsers,
              a = void 0 === r ? [] : r,
              r = e.customTagMappers,
              r = void 0 === r ? [] : r,
              e = e.experimentalLLHLS,
              s = new br();
          t && s.on("warn", t), i && s.on("info", i), a.forEach(function (e) {
            return s.addParser(e);
          }), r.forEach(function (e) {
            return s.addTagMapper(e);
          }), s.push(n), s.end();
          var o = s.manifest;
          e || (["preloadSegment", "skip", "serverControl", "renditionReports", "partInf", "partTargetDuration"].forEach(function (e) {
            o.hasOwnProperty(e) && delete o[e];
          }), o.segments && o.segments.forEach(function (t) {
            ["parts", "preloadHints"].forEach(function (e) {
              t.hasOwnProperty(e) && delete t[e];
            });
          })), o.targetDuration || (u = 10, o.segments && o.segments.length && (u = o.segments.reduce(function (e, t) {
            return Math.max(e, t.duration);
          }, 0)), t && t("manifest has no targetDuration defaulting to " + u), o.targetDuration = u);
          var u = po(o);
          return u.length && !o.partTargetDuration && (u = u.reduce(function (e, t) {
            return Math.max(e, t.duration);
          }, 0), t && (t("manifest has no partTargetDuration defaulting to " + u), Fu.error("LL-HLS manifest has parts but lacks required #EXT-X-PART-INF:PART-TARGET value. See https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-09#section-4.4.3.7. Playback is not guaranteed.")), o.partTargetDuration = u), o;
        }({
          onwarn: function (e) {
            e = e.message;
            return t.logger_("m3u8-parser warn for " + i + ": " + e);
          },
          oninfo: function (e) {
            e = e.message;
            return t.logger_("m3u8-parser info for " + i + ": " + e);
          },
          manifestString: e.manifestString,
          customTagParsers: this.customTagParsers,
          customTagMappers: this.customTagMappers,
          experimentalLLHLS: this.experimentalLLHLS
        });
      }, t.haveMetadata = function (e) {
        var t = this,
            i = e.playlistString,
            n = e.playlistObject,
            r = e.url,
            e = e.id;
        this.request = null, this.state = "HAVE_METADATA";
        i = n || this.parseManifest_({
          url: r,
          manifestString: i
        });
        i.lastRequest = Date.now(), Po({
          playlist: i,
          uri: r,
          id: e
        });
        r = No(this.master, i);
        this.targetDuration = i.partTargetDuration || i.targetDuration, r ? (this.master = r, this.media_ = this.master.playlists[e]) : this.trigger("playlistunchanged"), this.media().endList || (_.clearTimeout(this.mediaUpdateTimeout), this.mediaUpdateTimeout = _.setTimeout(function () {
          t.trigger("mediaupdatetimeout");
        }, Uo(this.media(), !!r))), this.trigger("loadedplaylist");
      }, t.dispose = function () {
        this.trigger("dispose"), this.stopRequest(), _.clearTimeout(this.mediaUpdateTimeout), _.clearTimeout(this.finalRenditionTimeout), this.off();
      }, t.stopRequest = function () {
        var e;
        this.request && (e = this.request, this.request = null, e.onreadystatechange = null, e.abort());
      }, t.media = function (i, e) {
        var n = this;
        if (!i) return this.media_;
        if ("HAVE_NOTHING" === this.state) throw new Error("Cannot switch media playlist from " + this.state);

        if ("string" == typeof i) {
          if (!this.master.playlists[i]) throw new Error("Unknown playlist URI: " + i);
          i = this.master.playlists[i];
        }

        if (_.clearTimeout(this.finalRenditionTimeout), e) {
          var t = (i.partTargetDuration || i.targetDuration) / 2 * 1e3 || 5e3;
          this.finalRenditionTimeout = _.setTimeout(this.media.bind(this, i, !1), t);
        } else {
          var r = this.state,
              e = !this.media_ || i.id !== this.media_.id,
              t = this.master.playlists[i.id];
          if (t && t.endList || i.endList && i.segments.length) return this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = i, void (e && (this.trigger("mediachanging"), "HAVE_MASTER" === r ? this.trigger("loadedmetadata") : this.trigger("mediachange")));

          if (e) {
            if (this.state = "SWITCHING_MEDIA", this.request) {
              if (i.resolvedUri === this.request.url) return;
              this.request.onreadystatechange = null, this.request.abort(), this.request = null;
            }

            this.media_ && this.trigger("mediachanging"), this.request = this.vhs_.xhr({
              uri: i.resolvedUri,
              withCredentials: this.withCredentials
            }, function (e, t) {
              if (n.request) {
                if (i.lastRequest = Date.now(), i.resolvedUri = no(n.handleManifestRedirects, i.resolvedUri, t), e) return n.playlistRequestError(n.request, i, r);
                n.haveMetadata({
                  playlistString: t.responseText,
                  url: i.uri,
                  id: i.id
                }), "HAVE_MASTER" === r ? n.trigger("loadedmetadata") : n.trigger("mediachange");
              }
            });
          }
        }
      }, t.pause = function () {
        this.stopRequest(), _.clearTimeout(this.mediaUpdateTimeout), "HAVE_NOTHING" === this.state && (this.started = !1), "SWITCHING_MEDIA" === this.state ? this.media_ ? this.state = "HAVE_METADATA" : this.state = "HAVE_MASTER" : "HAVE_CURRENT_METADATA" === this.state && (this.state = "HAVE_METADATA");
      }, t.load = function (e) {
        var t = this;

        _.clearTimeout(this.mediaUpdateTimeout);

        var i = this.media();
        e ? (e = i ? (i.partTargetDuration || i.targetDuration) / 2 * 1e3 : 5e3, this.mediaUpdateTimeout = _.setTimeout(function () {
          return t.load();
        }, e)) : this.started ? i && !i.endList ? this.trigger("mediaupdatetimeout") : this.trigger("loadedplaylist") : this.start();
      }, t.start = function () {
        var i = this;
        if (this.started = !0, "object" == typeof this.src) return this.src.uri || (this.src.uri = _.location.href), this.src.resolvedUri = this.src.uri, void setTimeout(function () {
          i.setupInitialPlaylist(i.src);
        }, 0);
        this.request = this.vhs_.xhr({
          uri: this.src,
          withCredentials: this.withCredentials
        }, function (e, t) {
          if (i.request) {
            if (i.request = null, e) return i.error = {
              status: t.status,
              message: "HLS playlist request error at URL: " + i.src + ".",
              responseText: t.responseText,
              code: 2
            }, "HAVE_NOTHING" === i.state && (i.started = !1), i.trigger("error");
            i.src = no(i.handleManifestRedirects, i.src, t);
            t = i.parseManifest_({
              manifestString: t.responseText,
              url: i.src
            });
            i.setupInitialPlaylist(t);
          }
        });
      }, t.srcUri = function () {
        return "string" == typeof this.src ? this.src : this.src.uri;
      }, t.setupInitialPlaylist = function (e) {
        if (this.state = "HAVE_MASTER", e.playlists) return this.master = e, Lo(this.master, this.srcUri()), e.playlists.forEach(function (t) {
          t.segments = Ro(t), t.segments.forEach(function (e) {
            Oo(e, t.resolvedUri);
          });
        }), this.trigger("loadedplaylist"), void (this.request || this.media(this.master.playlists[0]));

        var t,
            i,
            n,
            r = this.srcUri() || _.location.href;

        this.master = (i = xo(0, t = r), (n = {
          mediaGroups: {
            AUDIO: {},
            VIDEO: {},
            "CLOSED-CAPTIONS": {},
            SUBTITLES: {}
          },
          uri: _.location.href,
          resolvedUri: _.location.href,
          playlists: [{
            uri: t,
            id: i,
            resolvedUri: t,
            attributes: {}
          }]
        }).playlists[i] = n.playlists[0], n.playlists[t] = n.playlists[0], n), this.haveMetadata({
          playlistObject: e,
          url: r,
          id: this.master.playlists[0].id
        }), this.trigger("loadedmetadata");
      }, e;
    }(z),
        qu = Zn.xhr,
        Vu = Zn.mergeOptions,
        ii = Object.freeze({
      __proto__: null,
      createTransferableMessage: Vo,
      initSegmentId: Wo,
      segmentKeyId: zo,
      hexDump: Go,
      tagDump: function (e) {
        e = e.bytes;
        return Go(e);
      },
      textRanges: function (e) {
        for (var t, i, n = "", r = 0; r < e.length; r++) n += (i = r, (t = e).start(i) + "-" + t.end(i) + " ");

        return n;
      }
    }),
        zt = Zn.EventTarget,
        Wu = Zn.mergeOptions,
        zu = function (a) {
      function e(e, t, i, n) {
        var r;
        void 0 === i && (i = {}), (r = a.call(this) || this).masterPlaylistLoader_ = n || ft(r), n || (r.isMaster_ = !0);
        n = i.withCredentials, n = void 0 !== n && n, i = i.handleManifestRedirects, i = void 0 !== i && i;
        if (r.vhs_ = t, r.withCredentials = n, r.handleManifestRedirects = i, !e) throw new Error("A non-empty playlist URL or object is required");
        return r.on("minimumUpdatePeriod", function () {
          r.refreshXml_();
        }), r.on("mediaupdatetimeout", function () {
          r.refreshMedia_(r.media().id);
        }), r.state = "HAVE_NOTHING", r.loadedPlaylists_ = {}, r.logger_ = ro("DashPlaylistLoader"), r.isMaster_ ? (r.masterPlaylistLoader_.srcUrl = e, r.masterPlaylistLoader_.sidxMapping_ = {}) : r.childPlaylist_ = e, r;
      }

      mt(e, a);
      var t = e.prototype;
      return t.requestErrored_ = function (e, t, i) {
        return !this.request || (this.request = null, e ? (this.error = "object" != typeof e || e instanceof Error ? {
          status: t.status,
          message: "DASH request error at URL: " + t.uri,
          response: t.response,
          code: 2
        } : e, i && (this.state = i), this.trigger("error"), !0) : void 0);
      }, t.addSidxSegments_ = function (a, n, r) {
        var s,
            o,
            u = this,
            l = a.sidx && Qa(a.sidx);
        a.sidx && l && !this.masterPlaylistLoader_.sidxMapping_[l] ? (s = no(this.handleManifestRedirects, a.sidx.resolvedUri), o = function (e, t) {
          if (!u.requestErrored_(e, t, n)) {
            var i,
                e = u.masterPlaylistLoader_.sidxMapping_;

            try {
              i = Ws(Ts(t.response).subarray(8));
            } catch (e) {
              return void u.requestErrored_(e, t, n);
            }

            return e[l] = {
              sidxInfo: a.sidx,
              sidx: i
            }, Ya(a, i, a.sidx.resolvedUri), r(!0);
          }
        }, this.request = Qo(s, this.vhs_.xhr, function (e, t, i, n) {
          if (e) return o(e, t);
          if (!i || "mp4" !== i) return o({
            status: t.status,
            message: "Unsupported " + (i || "unknown") + " container type for sidx segment at URL: " + s,
            response: "",
            playlist: a,
            internal: !0,
            blacklistDuration: 1 / 0,
            code: 2
          }, t);
          var r = a.sidx.byterange,
              i = r.offset,
              r = r.length;
          if (n.length >= r + i) return o(e, {
            response: n.subarray(i, i + r),
            status: t.status,
            uri: t.uri
          });
          u.request = u.vhs_.xhr({
            uri: s,
            responseType: "arraybuffer",
            headers: jo({
              byterange: a.sidx.byterange
            })
          }, o);
        })) : this.mediaRequest_ = _.setTimeout(function () {
          return r(!1);
        }, 0);
      }, t.dispose = function () {
        this.trigger("dispose"), this.stopRequest(), this.loadedPlaylists_ = {}, _.clearTimeout(this.minimumUpdatePeriodTimeout_), _.clearTimeout(this.mediaRequest_), _.clearTimeout(this.mediaUpdateTimeout), this.mediaUpdateTimeout = null, this.mediaRequest_ = null, this.minimumUpdatePeriodTimeout_ = null, this.masterPlaylistLoader_.createMupOnMedia_ && (this.off("loadedmetadata", this.masterPlaylistLoader_.createMupOnMedia_), this.masterPlaylistLoader_.createMupOnMedia_ = null), this.off();
      }, t.hasPendingRequest = function () {
        return this.request || this.mediaRequest_;
      }, t.stopRequest = function () {
        var e;
        this.request && (e = this.request, this.request = null, e.onreadystatechange = null, e.abort());
      }, t.media = function (t) {
        var i = this;
        if (!t) return this.media_;
        if ("HAVE_NOTHING" === this.state) throw new Error("Cannot switch media playlist from " + this.state);
        var n = this.state;

        if ("string" == typeof t) {
          if (!this.masterPlaylistLoader_.master.playlists[t]) throw new Error("Unknown playlist URI: " + t);
          t = this.masterPlaylistLoader_.master.playlists[t];
        }

        var e = !this.media_ || t.id !== this.media_.id;
        if (e && this.loadedPlaylists_[t.id] && this.loadedPlaylists_[t.id].endList) return this.state = "HAVE_METADATA", this.media_ = t, void (e && (this.trigger("mediachanging"), this.trigger("mediachange")));
        e && (this.media_ && this.trigger("mediachanging"), this.addSidxSegments_(t, n, function (e) {
          i.haveMetadata({
            startingState: n,
            playlist: t
          });
        }));
      }, t.haveMetadata = function (e) {
        var t = e.startingState,
            e = e.playlist;
        this.state = "HAVE_METADATA", this.loadedPlaylists_[e.id] = e, this.mediaRequest_ = null, this.refreshMedia_(e.id), "HAVE_MASTER" === t ? this.trigger("loadedmetadata") : this.trigger("mediachange");
      }, t.pause = function () {
        this.masterPlaylistLoader_.createMupOnMedia_ && (this.off("loadedmetadata", this.masterPlaylistLoader_.createMupOnMedia_), this.masterPlaylistLoader_.createMupOnMedia_ = null), this.stopRequest(), _.clearTimeout(this.mediaUpdateTimeout), this.mediaUpdateTimeout = null, this.isMaster_ && (_.clearTimeout(this.masterPlaylistLoader_.minimumUpdatePeriodTimeout_), this.masterPlaylistLoader_.minimumUpdatePeriodTimeout_ = null), "HAVE_NOTHING" === this.state && (this.started = !1);
      }, t.load = function (e) {
        var t = this;
        _.clearTimeout(this.mediaUpdateTimeout), this.mediaUpdateTimeout = null;
        var i = this.media();
        e ? (e = i ? i.targetDuration / 2 * 1e3 : 5e3, this.mediaUpdateTimeout = _.setTimeout(function () {
          return t.load();
        }, e)) : this.started ? i && !i.endList ? (this.isMaster_ && !this.minimumUpdatePeriodTimeout_ && (this.trigger("minimumUpdatePeriod"), this.updateMinimumUpdatePeriodTimeout_()), this.trigger("mediaupdatetimeout")) : this.trigger("loadedplaylist") : this.start();
      }, t.start = function () {
        var i = this;
        this.started = !0, this.isMaster_ ? this.requestMaster_(function (e, t) {
          i.haveMaster_(), i.hasPendingRequest() || i.media_ || i.media(i.masterPlaylistLoader_.master.playlists[0]);
        }) : this.mediaRequest_ = _.setTimeout(function () {
          return i.haveMaster_();
        }, 0);
      }, t.requestMaster_ = function (n) {
        var r = this;
        this.request = this.vhs_.xhr({
          uri: this.masterPlaylistLoader_.srcUrl,
          withCredentials: this.withCredentials
        }, function (e, t) {
          if (!r.requestErrored_(e, t)) {
            var i = t.responseText !== r.masterPlaylistLoader_.masterXml_;
            return r.masterPlaylistLoader_.masterXml_ = t.responseText, t.responseHeaders && t.responseHeaders.date ? r.masterLoaded_ = Date.parse(t.responseHeaders.date) : r.masterLoaded_ = Date.now(), r.masterPlaylistLoader_.srcUrl = no(r.handleManifestRedirects, r.masterPlaylistLoader_.srcUrl, t), i ? (r.handleMaster_(), void r.syncClientServerClock_(function () {
              return n(t, i);
            })) : n(t, i);
          }

          "HAVE_NOTHING" === r.state && (r.started = !1);
        });
      }, t.syncClientServerClock_ = function (i) {
        var n = this,
            r = bs(this.masterPlaylistLoader_.masterXml_);
        return null === r ? (this.masterPlaylistLoader_.clientOffset_ = this.masterLoaded_ - Date.now(), i()) : "DIRECT" === r.method ? (this.masterPlaylistLoader_.clientOffset_ = r.value - Date.now(), i()) : void (this.request = this.vhs_.xhr({
          uri: Mu(this.masterPlaylistLoader_.srcUrl, r.value),
          method: r.method,
          withCredentials: this.withCredentials
        }, function (e, t) {
          if (n.request) {
            if (e) return n.masterPlaylistLoader_.clientOffset_ = n.masterLoaded_ - Date.now(), i();
            t = "HEAD" === r.method ? t.responseHeaders && t.responseHeaders.date ? Date.parse(t.responseHeaders.date) : n.masterLoaded_ : Date.parse(t.responseText);
            n.masterPlaylistLoader_.clientOffset_ = t - Date.now(), i();
          }
        }));
      }, t.haveMaster_ = function () {
        this.state = "HAVE_MASTER", this.isMaster_ ? this.trigger("loadedplaylist") : this.media_ || this.media(this.childPlaylist_);
      }, t.handleMaster_ = function () {
        this.mediaRequest_ = null;
        var e,
            t,
            t = (n = {
          masterXml: this.masterPlaylistLoader_.masterXml_,
          srcUrl: this.masterPlaylistLoader_.srcUrl,
          clientOffset: this.masterPlaylistLoader_.clientOffset_,
          sidxMapping: this.masterPlaylistLoader_.sidxMapping_
        }, e = n.masterXml, i = n.srcUrl, t = n.clientOffset, n = n.sidxMapping, n = _s(e, {
          manifestUri: i,
          clientOffset: t,
          sidxMapping: n
        }), Lo(n, i), n),
            i = this.masterPlaylistLoader_.master;
        i && (t = function (e, t, i) {
          for (var a = !0, s = Wu(e, {
            duration: t.duration,
            minimumUpdatePeriod: t.minimumUpdatePeriod
          }), n = 0; n < t.playlists.length; n++) {
            var r,
                o = t.playlists[n];
            o.sidx && (r = Qa(o.sidx), i && i[r] && i[r].sidx && Ya(o, i[r].sidx, o.sidx.resolvedUri));
            o = No(s, o, $o);
            o && (s = o, a = !1);
          }

          return Ao(t, function (e, t, i, n) {
            var r;
            e.playlists && e.playlists.length && (r = e.playlists[0].id, (e = No(s, e.playlists[0], $o)) && ((s = e).mediaGroups[t][i][n].playlists[0] = s.playlists[r], a = !1));
          }), (a = t.minimumUpdatePeriod === e.minimumUpdatePeriod && a) ? null : s;
        }(i, t, this.masterPlaylistLoader_.sidxMapping_)), this.masterPlaylistLoader_.master = t || i;
        var n = this.masterPlaylistLoader_.master.locations && this.masterPlaylistLoader_.master.locations[0];
        return n && n !== this.masterPlaylistLoader_.srcUrl && (this.masterPlaylistLoader_.srcUrl = n), (!i || t && t.minimumUpdatePeriod !== i.minimumUpdatePeriod) && this.updateMinimumUpdatePeriodTimeout_(), Boolean(t);
      }, t.updateMinimumUpdatePeriodTimeout_ = function () {
        var e = this.masterPlaylistLoader_;
        e.createMupOnMedia_ && (e.off("loadedmetadata", e.createMupOnMedia_), e.createMupOnMedia_ = null), e.minimumUpdatePeriodTimeout_ && (_.clearTimeout(e.minimumUpdatePeriodTimeout_), e.minimumUpdatePeriodTimeout_ = null);
        var t = e.master && e.master.minimumUpdatePeriod;
        0 === t && (e.media() ? t = 1e3 * e.media().targetDuration : (e.createMupOnMedia_ = e.updateMinimumUpdatePeriodTimeout_, e.one("loadedmetadata", e.createMupOnMedia_))), "number" != typeof t || t <= 0 ? t < 0 && this.logger_("found invalid minimumUpdatePeriod of " + t + ", not setting a timeout") : this.createMUPTimeout_(t);
      }, t.createMUPTimeout_ = function (e) {
        var t = this.masterPlaylistLoader_;
        t.minimumUpdatePeriodTimeout_ = _.setTimeout(function () {
          t.minimumUpdatePeriodTimeout_ = null, t.trigger("minimumUpdatePeriod"), t.createMUPTimeout_(e);
        }, e);
      }, t.refreshXml_ = function () {
        var i = this;
        this.requestMaster_(function (e, t) {
          var r, a;
          t && (i.media_ && (i.media_ = i.masterPlaylistLoader_.master.playlists[i.media_.id]), i.masterPlaylistLoader_.sidxMapping_ = (t = i.masterPlaylistLoader_.master, r = i.masterPlaylistLoader_.sidxMapping_, a = Jo(t.playlists, r), Ao(t, function (e, t, i, n) {
            e.playlists && e.playlists.length && (e = e.playlists, a = Wu(a, Jo(e, r)));
          }), a), i.addSidxSegments_(i.media(), i.state, function (e) {
            i.refreshMedia_(i.media().id);
          }));
        });
      }, t.refreshMedia_ = function (e) {
        var t = this;
        if (!e) throw new Error("refreshMedia_ must take a media id");
        this.media_ && this.isMaster_ && this.handleMaster_();
        var i = this.masterPlaylistLoader_.master.playlists,
            n = !this.media_ || this.media_ !== i[e];
        n ? this.media_ = i[e] : this.trigger("playlistunchanged"), this.mediaUpdateTimeout || function e() {
          t.media().endList || (t.mediaUpdateTimeout = _.setTimeout(function () {
            t.trigger("mediaupdatetimeout"), e();
          }, Uo(t.media(), Boolean(n))));
        }(), this.trigger("loadedplaylist");
      }, e;
    }(zt),
        Gu = {
      GOAL_BUFFER_LENGTH: 30,
      MAX_GOAL_BUFFER_LENGTH: 60,
      BACK_BUFFER_LENGTH: 30,
      GOAL_BUFFER_LENGTH_RATE: 1,
      INITIAL_BANDWIDTH: 4194304,
      BANDWIDTH_VARIANCE: 1.2,
      BUFFER_LOW_WATER_LINE: 0,
      MAX_BUFFER_LOW_WATER_LINE: 30,
      EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE: 16,
      BUFFER_LOW_WATER_LINE_RATE: 1,
      BUFFER_HIGH_WATER_LINE: 30
    },
        ni = function (n) {
      return function () {
        var e = function (t) {
          try {
            return URL.createObjectURL(new Blob([t], {
              type: "application/javascript"
            }));
          } catch (e) {
            var i = new BlobBuilder();
            return i.append(t), URL.createObjectURL(i.getBlob());
          }
        }(n),
            t = Zo(new Worker(e));

        t.objURL = e;
        var i = t.terminate;
        return t.on = t.addEventListener, t.off = t.removeEventListener, t.terminate = function () {
          return URL.revokeObjectURL(e), i.call(this);
        }, t;
      };
    },
        nr = function (e) {
      return "var browserWorkerPolyFill = " + Zo.toString() + ";\nbrowserWorkerPolyFill(self);\n" + e;
    },
        z = function (e) {
      return e.toString().replace(/^function.+?{/, "").slice(0, -1);
    },
        Xu = ni(nr(z(function () {
      var e = function () {
        this.init = function () {
          var a = {};
          this.on = function (e, t) {
            a[e] || (a[e] = []), a[e] = a[e].concat(t);
          }, this.off = function (e, t) {
            return !!a[e] && (t = a[e].indexOf(t), a[e] = a[e].slice(), a[e].splice(t, 1), -1 < t);
          }, this.trigger = function (e) {
            var t,
                i,
                n,
                r = a[e];
            if (r) if (2 === arguments.length) for (i = r.length, t = 0; t < i; ++t) r[t].call(this, arguments[1]);else {
              for (n = [], t = arguments.length, t = 1; t < arguments.length; ++t) n.push(arguments[t]);

              for (i = r.length, t = 0; t < i; ++t) r[t].apply(this, n);
            }
          }, this.dispose = function () {
            a = {};
          };
        };
      };

      e.prototype.pipe = function (t) {
        return this.on("data", function (e) {
          t.push(e);
        }), this.on("done", function (e) {
          t.flush(e);
        }), this.on("partialdone", function (e) {
          t.partialFlush(e);
        }), this.on("endedtimeline", function (e) {
          t.endTimeline(e);
        }), this.on("reset", function (e) {
          t.reset(e);
        }), t;
      }, e.prototype.push = function (e) {
        this.trigger("data", e);
      }, e.prototype.flush = function (e) {
        this.trigger("done", e);
      }, e.prototype.partialFlush = function (e) {
        this.trigger("partialdone", e);
      }, e.prototype.endTimeline = function (e) {
        this.trigger("endedtimeline", e);
      }, e.prototype.reset = function (e) {
        this.trigger("reset", e);
      };

      var u,
          t,
          i,
          n,
          r,
          a,
          s,
          o,
          l,
          c,
          d,
          h,
          p,
          f,
          m,
          g,
          y,
          v,
          _,
          b,
          T,
          S,
          E,
          k,
          C,
          w,
          I,
          x,
          A,
          P,
          L,
          D,
          O,
          R,
          M,
          N,
          U,
          B,
          F,
          j = e,
          H = Math.pow(2, 32) - 1;

      !function () {
        if (T = {
          avc1: [],
          avcC: [],
          btrt: [],
          dinf: [],
          dref: [],
          esds: [],
          ftyp: [],
          hdlr: [],
          mdat: [],
          mdhd: [],
          mdia: [],
          mfhd: [],
          minf: [],
          moof: [],
          moov: [],
          mp4a: [],
          mvex: [],
          mvhd: [],
          pasp: [],
          sdtp: [],
          smhd: [],
          stbl: [],
          stco: [],
          stsc: [],
          stsd: [],
          stsz: [],
          stts: [],
          styp: [],
          tfdt: [],
          tfhd: [],
          traf: [],
          trak: [],
          trun: [],
          trex: [],
          tkhd: [],
          vmhd: []
        }, "undefined" != typeof Uint8Array) {
          for (var e in T) T.hasOwnProperty(e) && (T[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);

          S = new Uint8Array(["i".charCodeAt(0), "s".charCodeAt(0), "o".charCodeAt(0), "m".charCodeAt(0)]), k = new Uint8Array(["a".charCodeAt(0), "v".charCodeAt(0), "c".charCodeAt(0), "1".charCodeAt(0)]), E = new Uint8Array([0, 0, 0, 1]), C = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]), w = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]), I = {
            video: C,
            audio: w
          }, P = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]), A = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), L = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), D = L, O = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), R = L, x = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
      }(), u = function (e) {
        for (var t, i = [], n = 0, r = 1; r < arguments.length; r++) i.push(arguments[r]);

        for (r = i.length; r--;) n += i[r].byteLength;

        for (t = new Uint8Array(n + 8), new DataView(t.buffer, t.byteOffset, t.byteLength).setUint32(0, t.byteLength), t.set(e, 4), r = 0, n = 8; r < i.length; r++) t.set(i[r], n), n += i[r].byteLength;

        return t;
      }, t = function () {
        return u(T.dinf, u(T.dref, P));
      }, i = function (e) {
        return u(T.esds, new Uint8Array([0, 0, 0, 0, 3, 25, 0, 0, 0, 4, 17, 64, 21, 0, 6, 0, 0, 0, 218, 192, 0, 0, 218, 192, 5, 2, e.audioobjecttype << 3 | e.samplingfrequencyindex >>> 1, e.samplingfrequencyindex << 7 | e.channelcount << 3, 6, 1, 2]));
      }, f = function (e) {
        return u(T.hdlr, I[e]);
      }, p = function (e) {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 1, 95, 144, e.duration >>> 24 & 255, e.duration >>> 16 & 255, e.duration >>> 8 & 255, 255 & e.duration, 85, 196, 0, 0]);
        return e.samplerate && (t[12] = e.samplerate >>> 24 & 255, t[13] = e.samplerate >>> 16 & 255, t[14] = e.samplerate >>> 8 & 255, t[15] = 255 & e.samplerate), u(T.mdhd, t);
      }, h = function (e) {
        return u(T.mdia, p(e), f(e.type), a(e));
      }, r = function (e) {
        return u(T.mfhd, new Uint8Array([0, 0, 0, 0, (4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e]));
      }, a = function (e) {
        return u(T.minf, "video" === e.type ? u(T.vmhd, x) : u(T.smhd, A), t(), g(e));
      }, qe = function (e, t) {
        for (var i = [], n = t.length; n--;) i[n] = v(t[n]);

        return u.apply(null, [T.moof, r(e)].concat(i));
      }, s = function (e) {
        for (var t = e.length, i = []; t--;) i[t] = c(e[t]);

        return u.apply(null, [T.moov, l(4294967295)].concat(i).concat(o(e)));
      }, o = function (e) {
        for (var t = e.length, i = []; t--;) i[t] = _(e[t]);

        return u.apply(null, [T.mvex].concat(i));
      }, l = function (e) {
        e = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1, 95, 144, (4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
        return u(T.mvhd, e);
      }, m = function (e) {
        for (var t, i = e.samples || [], n = new Uint8Array(4 + i.length), r = 0; r < i.length; r++) t = i[r].flags, n[r + 4] = t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy;

        return u(T.sdtp, n);
      }, g = function (e) {
        return u(T.stbl, y(e), u(T.stts, R), u(T.stsc, D), u(T.stsz, O), u(T.stco, L));
      }, y = function (e) {
        return u(T.stsd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]), ("video" === e.type ? M : N)(e));
      }, M = function (e) {
        for (var t, i, n = e.sps || [], r = e.pps || [], a = [], s = [], o = 0; o < n.length; o++) a.push((65280 & n[o].byteLength) >>> 8), a.push(255 & n[o].byteLength), a = a.concat(Array.prototype.slice.call(n[o]));

        for (o = 0; o < r.length; o++) s.push((65280 & r[o].byteLength) >>> 8), s.push(255 & r[o].byteLength), s = s.concat(Array.prototype.slice.call(r[o]));

        return t = [T.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & e.width) >> 8, 255 & e.width, (65280 & e.height) >> 8, 255 & e.height, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 19, 118, 105, 100, 101, 111, 106, 115, 45, 99, 111, 110, 116, 114, 105, 98, 45, 104, 108, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), u(T.avcC, new Uint8Array([1, e.profileIdc, e.profileCompatibility, e.levelIdc, 255].concat([n.length], a, [r.length], s))), u(T.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192]))], e.sarRatio && (i = e.sarRatio[0], e = e.sarRatio[1], t.push(u(T.pasp, new Uint8Array([(4278190080 & i) >> 24, (16711680 & i) >> 16, (65280 & i) >> 8, 255 & i, (4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e])))), u.apply(null, t);
      }, N = function (e) {
        return u(T.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & e.channelcount) >> 8, 255 & e.channelcount, (65280 & e.samplesize) >> 8, 255 & e.samplesize, 0, 0, 0, 0, (65280 & e.samplerate) >> 8, 255 & e.samplerate, 0, 0]), i(e));
      }, d = function (e) {
        e = new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, (4278190080 & e.id) >> 24, (16711680 & e.id) >> 16, (65280 & e.id) >> 8, 255 & e.id, 0, 0, 0, 0, (4278190080 & e.duration) >> 24, (16711680 & e.duration) >> 16, (65280 & e.duration) >> 8, 255 & e.duration, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, (65280 & e.width) >> 8, 255 & e.width, 0, 0, (65280 & e.height) >> 8, 255 & e.height, 0, 0]);
        return u(T.tkhd, e);
      }, v = function (e) {
        var t,
            i = u(T.tfhd, new Uint8Array([0, 0, 0, 58, (4278190080 & e.id) >> 24, (16711680 & e.id) >> 16, (65280 & e.id) >> 8, 255 & e.id, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
            n = Math.floor(e.baseMediaDecodeTime / (1 + H)),
            r = Math.floor(e.baseMediaDecodeTime % (1 + H)),
            n = u(T.tfdt, new Uint8Array([1, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r]));
        return "audio" === e.type ? (t = b(e, 92), u(T.traf, i, n, t)) : (r = m(e), t = b(e, r.length + 92), u(T.traf, i, n, t, r));
      }, c = function (e) {
        return e.duration = e.duration || 4294967295, u(T.trak, d(e), h(e));
      }, _ = function (e) {
        var t = new Uint8Array([0, 0, 0, 0, (4278190080 & e.id) >> 24, (16711680 & e.id) >> 16, (65280 & e.id) >> 8, 255 & e.id, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
        return "video" !== e.type && (t[t.length - 1] = 0), u(T.trex, t);
      }, U = function (e, t) {
        var i = 0,
            n = 0,
            r = 0,
            a = 0;
        return e.length && (void 0 !== e[0].duration && (i = 1), void 0 !== e[0].size && (n = 2), void 0 !== e[0].flags && (r = 4), void 0 !== e[0].compositionTimeOffset && (a = 8)), [0, 0, i | n | r | a, 1, (4278190080 & e.length) >>> 24, (16711680 & e.length) >>> 16, (65280 & e.length) >>> 8, 255 & e.length, (4278190080 & t) >>> 24, (16711680 & t) >>> 16, (65280 & t) >>> 8, 255 & t];
      }, B = function (e, t) {
        var i,
            n,
            r,
            a,
            s = e.samples || [];

        for (t += 20 + 16 * s.length, t = U(s, t), (n = new Uint8Array(t.length + 16 * s.length)).set(t), i = t.length, a = 0; a < s.length; a++) r = s[a], n[i++] = (4278190080 & r.duration) >>> 24, n[i++] = (16711680 & r.duration) >>> 16, n[i++] = (65280 & r.duration) >>> 8, n[i++] = 255 & r.duration, n[i++] = (4278190080 & r.size) >>> 24, n[i++] = (16711680 & r.size) >>> 16, n[i++] = (65280 & r.size) >>> 8, n[i++] = 255 & r.size, n[i++] = r.flags.isLeading << 2 | r.flags.dependsOn, n[i++] = r.flags.isDependedOn << 6 | r.flags.hasRedundancy << 4 | r.flags.paddingValue << 1 | r.flags.isNonSyncSample, n[i++] = 61440 & r.flags.degradationPriority, n[i++] = 15 & r.flags.degradationPriority, n[i++] = (4278190080 & r.compositionTimeOffset) >>> 24, n[i++] = (16711680 & r.compositionTimeOffset) >>> 16, n[i++] = (65280 & r.compositionTimeOffset) >>> 8, n[i++] = 255 & r.compositionTimeOffset;

        return u(T.trun, n);
      }, F = function (e, t) {
        var i,
            n,
            r,
            a,
            s = e.samples || [];

        for (t += 20 + 8 * s.length, t = U(s, t), (i = new Uint8Array(t.length + 8 * s.length)).set(t), n = t.length, a = 0; a < s.length; a++) r = s[a], i[n++] = (4278190080 & r.duration) >>> 24, i[n++] = (16711680 & r.duration) >>> 16, i[n++] = (65280 & r.duration) >>> 8, i[n++] = 255 & r.duration, i[n++] = (4278190080 & r.size) >>> 24, i[n++] = (16711680 & r.size) >>> 16, i[n++] = (65280 & r.size) >>> 8, i[n++] = 255 & r.size;

        return u(T.trun, i);
      }, b = function (e, t) {
        return ("audio" === e.type ? F : B)(e, t);
      };

      n = function () {
        return u(T.ftyp, S, E, S, k);
      };

      function q(e, t) {
        var i = {
          size: 0,
          flags: {
            isLeading: 0,
            dependsOn: 1,
            isDependedOn: 0,
            hasRedundancy: 0,
            degradationPriority: 0,
            isNonSyncSample: 1
          }
        };
        return i.dataOffset = t, i.compositionTimeOffset = e.pts - e.dts, i.duration = e.duration, i.size = 4 * e.length, i.size += e.byteLength, e.keyFrame && (i.flags.dependsOn = 2, i.flags.isNonSyncSample = 0), i;
      }

      function V(e) {
        for (var t = []; e--;) t.push(0);

        return t;
      }

      function W() {
        var e, i;
        return z || (e = {
          96e3: [ee, [227, 64], V(154), [56]],
          88200: [ee, [231], V(170), [56]],
          64e3: [ee, [248, 192], V(240), [56]],
          48e3: [ee, [255, 192], V(268), [55, 148, 128], V(54), [112]],
          44100: [ee, [255, 192], V(268), [55, 163, 128], V(84), [112]],
          32e3: [ee, [255, 192], V(268), [55, 234], V(226), [112]],
          24e3: [ee, [255, 192], V(268), [55, 255, 128], V(268), [111, 112], V(126), [224]],
          16e3: [ee, [255, 192], V(268), [55, 255, 128], V(268), [111, 255], V(269), [223, 108], V(195), [1, 192]],
          12e3: [te, V(268), [3, 127, 248], V(268), [6, 255, 240], V(268), [13, 255, 224], V(268), [27, 253, 128], V(259), [56]],
          11025: [te, V(268), [3, 127, 248], V(268), [6, 255, 240], V(268), [13, 255, 224], V(268), [27, 255, 192], V(268), [55, 175, 128], V(108), [112]],
          8e3: [te, V(268), [3, 121, 16], V(47), [7]]
        }, i = e, z = Object.keys(i).reduce(function (e, t) {
          return e[t] = new Uint8Array(i[t].reduce(function (e, t) {
            return e.concat(t);
          }, [])), e;
        }, {})), z;
      }

      var z,
          G = function (e) {
        return u(T.mdat, e);
      },
          X = qe,
          K = function (e) {
        var t = n(),
            i = s(e),
            e = new Uint8Array(t.byteLength + i.byteLength);
        return e.set(t), e.set(i, t.byteLength), e;
      },
          Y = function (e) {
        var t,
            i,
            n = [],
            r = [];

        for (r.byteLength = 0, r.nalCount = 0, r.duration = 0, t = n.byteLength = 0; t < e.length; t++) "access_unit_delimiter_rbsp" === (i = e[t]).nalUnitType ? (n.length && (n.duration = i.dts - n.dts, r.byteLength += n.byteLength, r.nalCount += n.length, r.duration += n.duration, r.push(n)), (n = [i]).byteLength = i.data.byteLength, n.pts = i.pts, n.dts = i.dts) : ("slice_layer_without_partitioning_rbsp_idr" === i.nalUnitType && (n.keyFrame = !0), n.duration = i.dts - n.dts, n.byteLength += i.data.byteLength, n.push(i));

        return r.length && (!n.duration || n.duration <= 0) && (n.duration = r[r.length - 1].duration), r.byteLength += n.byteLength, r.nalCount += n.length, r.duration += n.duration, r.push(n), r;
      },
          Q = function (e) {
        var t,
            i,
            n = [],
            r = [];

        for (n.byteLength = 0, n.nalCount = 0, n.duration = 0, n.pts = e[0].pts, n.dts = e[0].dts, r.byteLength = 0, r.nalCount = 0, r.duration = 0, r.pts = e[0].pts, r.dts = e[0].dts, t = 0; t < e.length; t++) (i = e[t]).keyFrame ? (n.length && (r.push(n), r.byteLength += n.byteLength, r.nalCount += n.nalCount, r.duration += n.duration), (n = [i]).nalCount = i.length, n.byteLength = i.byteLength, n.pts = i.pts, n.dts = i.dts, n.duration = i.duration) : (n.duration += i.duration, n.nalCount += i.length, n.byteLength += i.byteLength, n.push(i));

        return r.length && n.duration <= 0 && (n.duration = r[r.length - 1].duration), r.byteLength += n.byteLength, r.nalCount += n.nalCount, r.duration += n.duration, r.push(n), r;
      },
          $ = function (e) {
        var t;
        return !e[0][0].keyFrame && 1 < e.length && (t = e.shift(), e.byteLength -= t.byteLength, e.nalCount -= t.nalCount, e[0][0].dts = t.dts, e[0][0].pts = t.pts, e[0][0].duration += t.duration), e;
      },
          J = function (e, t) {
        for (var i, n, r, a = t || 0, s = [], o = 0; o < e.length; o++) for (n = e[o], i = 0; i < n.length; i++) r = n[i], a += (r = q(r, a)).size, s.push(r);

        return s;
      },
          Z = function (e) {
        for (var t, i, n, r, a, s = 0, o = e.byteLength, u = e.nalCount, l = new Uint8Array(o + 4 * u), c = new DataView(l.buffer), d = 0; d < e.length; d++) for (n = e[d], t = 0; t < n.length; t++) for (r = n[t], i = 0; i < r.length; i++) a = r[i], c.setUint32(s, a.data.byteLength), l.set(a.data, s += 4), s += a.data.byteLength;

        return l;
      },
          ee = [33, 16, 5, 32, 164, 27],
          te = [33, 65, 108, 84, 1, 2, 4, 8, 168, 2, 4, 8, 17, 191, 252],
          ie = function (e) {
        return 9e4 * e;
      },
          ne = function (e, t) {
        return e * t;
      },
          re = function (e) {
        return e / 9e4;
      },
          ae = function (e, t) {
        return e / t;
      },
          se = 9e4,
          oe = ie,
          ue = re,
          le = function (e, t) {
        return ie(ae(e, t));
      },
          ce = function (e, t) {
        return ne(re(e), t);
      },
          de = function (e, t, i) {
        return re(i ? e : e - t);
      },
          he = function (e, t, i, n) {
        var r,
            a,
            s,
            o,
            u,
            l,
            c = 0,
            d = 0;

        if (t.length && (r = le(e.baseMediaDecodeTime, e.samplerate), a = Math.ceil(se / (e.samplerate / 1024)), i && n && (s = r - Math.max(i, n), d = (c = Math.floor(s / a)) * a), !(c < 1 || se / 2 < d))) {
          for (o = (o = W()[e.samplerate]) || t[0].data, u = 0; u < c; u++) l = t[0], t.splice(0, 0, {
            data: o,
            dts: l.dts - a,
            pts: l.pts - a
          });

          return e.baseMediaDecodeTime -= Math.floor(ce(d, e.samplerate)), d;
        }
      },
          pe = function (e, t, i) {
        return t.minSegmentDts >= i ? e : (t.minSegmentDts = 1 / 0, e.filter(function (e) {
          return e.dts >= i && (t.minSegmentDts = Math.min(t.minSegmentDts, e.dts), t.minSegmentPts = t.minSegmentDts, !0);
        }));
      },
          fe = function (e) {
        for (var t, i = [], n = 0; n < e.length; n++) t = e[n], i.push({
          size: t.data.byteLength,
          duration: 1024
        });

        return i;
      },
          me = function (e) {
        for (var t, i = 0, n = new Uint8Array(function (e) {
          for (var t = 0, i = 0; i < e.length; i++) t += e[i].data.byteLength;

          return t;
        }(e)), r = 0; r < e.length; r++) t = e[r], n.set(t.data, i), i += t.data.byteLength;

        return n;
      },
          ge = se,
          ye = function (e) {
        delete e.minSegmentDts, delete e.maxSegmentDts, delete e.minSegmentPts, delete e.maxSegmentPts;
      },
          ve = function (e, t) {
        var i = e.minSegmentDts;
        return t || (i -= e.timelineStartInfo.dts), t = e.timelineStartInfo.baseMediaDecodeTime, t += i, t = Math.max(0, t), "audio" === e.type && (t *= e.samplerate / ge, t = Math.floor(t)), t;
      },
          _e = function (e, t) {
        "number" == typeof t.pts && (void 0 === e.timelineStartInfo.pts && (e.timelineStartInfo.pts = t.pts), void 0 === e.minSegmentPts ? e.minSegmentPts = t.pts : e.minSegmentPts = Math.min(e.minSegmentPts, t.pts), void 0 === e.maxSegmentPts ? e.maxSegmentPts = t.pts : e.maxSegmentPts = Math.max(e.maxSegmentPts, t.pts)), "number" == typeof t.dts && (void 0 === e.timelineStartInfo.dts && (e.timelineStartInfo.dts = t.dts), void 0 === e.minSegmentDts ? e.minSegmentDts = t.dts : e.minSegmentDts = Math.min(e.minSegmentDts, t.dts), void 0 === e.maxSegmentDts ? e.maxSegmentDts = t.dts : e.maxSegmentDts = Math.max(e.maxSegmentDts, t.dts));
      },
          be = function (e) {
        for (var t = 0, i = {
          payloadType: -1,
          payloadSize: 0
        }, n = 0, r = 0; t < e.byteLength && 128 !== e[t];) {
          for (; 255 === e[t];) n += 255, t++;

          for (n += e[t++]; 255 === e[t];) r += 255, t++;

          if (r += e[t++], !i.payload && 4 === n) {
            if ("GA94" === String.fromCharCode(e[t + 3], e[t + 4], e[t + 5], e[t + 6])) {
              i.payloadType = n, i.payloadSize = r, i.payload = e.subarray(t, t + r);
              break;
            }

            i.payload = void 0;
          }

          t += r, r = n = 0;
        }

        return i;
      },
          Te = function (e) {
        return 181 !== e.payload[0] || 49 != (e.payload[1] << 8 | e.payload[2]) || "GA94" !== String.fromCharCode(e.payload[3], e.payload[4], e.payload[5], e.payload[6]) || 3 !== e.payload[7] ? null : e.payload.subarray(8, e.payload.length - 1);
      },
          Se = function (e, t) {
        var i,
            n,
            r,
            a,
            s = [];
        if (!(64 & t[0])) return s;

        for (n = 31 & t[0], i = 0; i < n; i++) a = {
          type: 3 & t[2 + (r = 3 * i)],
          pts: e
        }, 4 & t[2 + r] && (a.ccData = t[3 + r] << 8 | t[4 + r], s.push(a));

        return s;
      },
          Ee = function (e) {
        for (var t = e.byteLength, i = [], n = 1; n < t - 2;) 0 === e[n] && 0 === e[n + 1] && 3 === e[n + 2] ? (i.push(n + 2), n += 2) : n++;

        if (0 === i.length) return e;

        for (var r = t - i.length, a = new Uint8Array(r), s = 0, n = 0; n < r; s++, n++) s === i[0] && (s++, i.shift()), a[n] = e[s];

        return a;
      },
          ke = 4,
          Ce = function e(t) {
        t = t || {}, e.prototype.init.call(this), this.parse708captions_ = "boolean" != typeof t.parse708captions || t.parse708captions, this.captionPackets_ = [], this.ccStreams_ = [new Me(0, 0), new Me(0, 1), new Me(1, 0), new Me(1, 1)], this.parse708captions_ && (this.cc708Stream_ = new Pe()), this.reset(), this.ccStreams_.forEach(function (e) {
          e.on("data", this.trigger.bind(this, "data")), e.on("partialdone", this.trigger.bind(this, "partialdone")), e.on("done", this.trigger.bind(this, "done"));
        }, this), this.parse708captions_ && (this.cc708Stream_.on("data", this.trigger.bind(this, "data")), this.cc708Stream_.on("partialdone", this.trigger.bind(this, "partialdone")), this.cc708Stream_.on("done", this.trigger.bind(this, "done")));
      };

      (Ce.prototype = new j()).push = function (e) {
        var t, i;
        if ("sei_rbsp" === e.nalUnitType && (t = be(e.escapedRBSP)).payload && t.payloadType === ke && (i = Te(t))) if (e.dts < this.latestDts_) this.ignoreNextEqualDts_ = !0;else {
          if (e.dts === this.latestDts_ && this.ignoreNextEqualDts_) return this.numSameDts_--, void (this.numSameDts_ || (this.ignoreNextEqualDts_ = !1));
          i = Se(e.pts, i), this.captionPackets_ = this.captionPackets_.concat(i), this.latestDts_ !== e.dts && (this.numSameDts_ = 0), this.numSameDts_++, this.latestDts_ = e.dts;
        }
      }, Ce.prototype.flushCCStreams = function (t) {
        this.ccStreams_.forEach(function (e) {
          return "flush" === t ? e.flush() : e.partialFlush();
        }, this);
      }, Ce.prototype.flushStream = function (e) {
        this.captionPackets_.length && (this.captionPackets_.forEach(function (e, t) {
          e.presortIndex = t;
        }), this.captionPackets_.sort(function (e, t) {
          return e.pts === t.pts ? e.presortIndex - t.presortIndex : e.pts - t.pts;
        }), this.captionPackets_.forEach(function (e) {
          e.type < 2 ? this.dispatchCea608Packet(e) : this.dispatchCea708Packet(e);
        }, this), this.captionPackets_.length = 0), this.flushCCStreams(e);
      }, Ce.prototype.flush = function () {
        return this.flushStream("flush");
      }, Ce.prototype.partialFlush = function () {
        return this.flushStream("partialFlush");
      }, Ce.prototype.reset = function () {
        this.latestDts_ = null, this.ignoreNextEqualDts_ = !1, this.numSameDts_ = 0, this.activeCea608Channel_ = [null, null], this.ccStreams_.forEach(function (e) {
          e.reset();
        });
      }, Ce.prototype.dispatchCea608Packet = function (e) {
        this.setsTextOrXDSActive(e) ? this.activeCea608Channel_[e.type] = null : this.setsChannel1Active(e) ? this.activeCea608Channel_[e.type] = 0 : this.setsChannel2Active(e) && (this.activeCea608Channel_[e.type] = 1), null !== this.activeCea608Channel_[e.type] && this.ccStreams_[(e.type << 1) + this.activeCea608Channel_[e.type]].push(e);
      }, Ce.prototype.setsChannel1Active = function (e) {
        return 4096 == (30720 & e.ccData);
      }, Ce.prototype.setsChannel2Active = function (e) {
        return 6144 == (30720 & e.ccData);
      }, Ce.prototype.setsTextOrXDSActive = function (e) {
        return 256 == (28928 & e.ccData) || 4138 == (30974 & e.ccData) || 6186 == (30974 & e.ccData);
      }, Ce.prototype.dispatchCea708Packet = function (e) {
        this.parse708captions_ && this.cc708Stream_.push(e);
      };

      function we(e) {
        return 32 <= e && e <= 127 || 160 <= e && e <= 255;
      }

      function Ie(e) {
        this.windowNum = e, this.reset();
      }

      var xe = {
        127: 9834,
        4128: 32,
        4129: 160,
        4133: 8230,
        4138: 352,
        4140: 338,
        4144: 9608,
        4145: 8216,
        4146: 8217,
        4147: 8220,
        4148: 8221,
        4149: 8226,
        4153: 8482,
        4154: 353,
        4156: 339,
        4157: 8480,
        4159: 376,
        4214: 8539,
        4215: 8540,
        4216: 8541,
        4217: 8542,
        4218: 9168,
        4219: 9124,
        4220: 9123,
        4221: 9135,
        4222: 9126,
        4223: 9121,
        4256: 12600
      };
      Ie.prototype.reset = function () {
        this.clearText(), this.pendingNewLine = !1, this.winAttr = {}, this.penAttr = {}, this.penLoc = {}, this.penColor = {}, this.visible = 0, this.rowLock = 0, this.columnLock = 0, this.priority = 0, this.relativePositioning = 0, this.anchorVertical = 0, this.anchorHorizontal = 0, this.anchorPoint = 0, this.rowCount = 1, this.virtualRowCount = this.rowCount + 1, this.columnCount = 41, this.windowStyle = 0, this.penStyle = 0;
      }, Ie.prototype.getText = function () {
        return this.rows.join("\n");
      }, Ie.prototype.clearText = function () {
        this.rows = [""], this.rowIdx = 0;
      }, Ie.prototype.newLine = function (e) {
        for (this.rows.length >= this.virtualRowCount && "function" == typeof this.beforeRowOverflow && this.beforeRowOverflow(e), 0 < this.rows.length && (this.rows.push(""), this.rowIdx++); this.rows.length > this.virtualRowCount;) this.rows.shift(), this.rowIdx--;
      }, Ie.prototype.isEmpty = function () {
        return 0 === this.rows.length || 1 === this.rows.length && "" === this.rows[0];
      }, Ie.prototype.addText = function (e) {
        this.rows[this.rowIdx] += e;
      }, Ie.prototype.backspace = function () {
        var e;
        this.isEmpty() || (e = this.rows[this.rowIdx], this.rows[this.rowIdx] = e.substr(0, e.length - 1));
      };

      function Ae(e) {
        this.serviceNum = e, this.text = "", this.currentWindow = new Ie(-1), this.windows = [];
      }

      Ae.prototype.init = function (e, t) {
        this.startPts = e;

        for (var i = 0; i < 8; i++) this.windows[i] = new Ie(i), "function" == typeof t && (this.windows[i].beforeRowOverflow = t);
      }, Ae.prototype.setCurrentWindow = function (e) {
        this.currentWindow = this.windows[e];
      };

      var Pe = function e() {
        e.prototype.init.call(this);
        var t = this;
        this.current708Packet = null, this.services = {}, this.push = function (e) {
          (3 === e.type || null === t.current708Packet) && t.new708Packet(), t.add708Bytes(e);
        };
      };

      Pe.prototype = new j(), Pe.prototype.new708Packet = function () {
        null !== this.current708Packet && this.push708Packet(), this.current708Packet = {
          data: [],
          ptsVals: []
        };
      }, Pe.prototype.add708Bytes = function (e) {
        var t = e.ccData,
            i = t >>> 8,
            t = 255 & t;
        this.current708Packet.ptsVals.push(e.pts), this.current708Packet.data.push(i), this.current708Packet.data.push(t);
      }, Pe.prototype.push708Packet = function () {
        var e,
            t = this.current708Packet,
            i = t.data,
            n = null,
            r = 0,
            a = i[r++];

        for (t.seq = a >> 6, t.sizeCode = 63 & a; r < i.length; r++) e = 31 & (a = i[r++]), 7 === (n = a >> 5) && 0 < e && (n = i[r++]), this.pushServiceBlock(n, r, e), 0 < e && (r += e - 1);
      }, Pe.prototype.pushServiceBlock = function (e, t, i) {
        for (var n, r = t, a = this.current708Packet.data, s = (s = this.services[e]) || this.initService(e, r); r < t + i && r < a.length; r++) n = a[r], we(n) ? r = this.handleText(r, s) : 16 === n ? r = this.extendedCommands(r, s) : 128 <= n && n <= 135 ? r = this.setCurrentWindow(r, s) : 152 <= n && n <= 159 ? r = this.defineWindow(r, s) : 136 === n ? r = this.clearWindows(r, s) : 140 === n ? r = this.deleteWindows(r, s) : 137 === n ? r = this.displayWindows(r, s) : 138 === n ? r = this.hideWindows(r, s) : 139 === n ? r = this.toggleWindows(r, s) : 151 === n ? r = this.setWindowAttributes(r, s) : 144 === n ? r = this.setPenAttributes(r, s) : 145 === n ? r = this.setPenColor(r, s) : 146 === n ? r = this.setPenLocation(r, s) : 143 === n ? s = this.reset(r, s) : 8 === n ? s.currentWindow.backspace() : 12 === n ? s.currentWindow.clearText() : 13 === n ? s.currentWindow.pendingNewLine = !0 : 14 === n ? s.currentWindow.clearText() : 141 === n && r++;
      }, Pe.prototype.extendedCommands = function (e, t) {
        var i = this.current708Packet.data[++e];
        return e = we(i) ? this.handleText(e, t, !0) : e;
      }, Pe.prototype.getPts = function (e) {
        return this.current708Packet.ptsVals[Math.floor(e / 2)];
      }, Pe.prototype.initService = function (t, e) {
        var i = this;
        return this.services[t] = new Ae(t), this.services[t].init(this.getPts(e), function (e) {
          i.flushDisplayed(e, i.services[t]);
        }), this.services[t];
      }, Pe.prototype.handleText = function (e, t, i) {
        var n = this.current708Packet.data[e],
            n = (n = xe[i = (i ? 4096 : 0) | n] || i, 4096 & i && i === n ? "" : String.fromCharCode(n)),
            t = t.currentWindow;
        return t.pendingNewLine && !t.isEmpty() && t.newLine(this.getPts(e)), t.pendingNewLine = !1, t.addText(n), e;
      }, Pe.prototype.setCurrentWindow = function (e, t) {
        var i = this.current708Packet.data[e];
        return t.setCurrentWindow(7 & i), e;
      }, Pe.prototype.defineWindow = function (e, t) {
        var i = this.current708Packet.data,
            n = i[e];
        t.setCurrentWindow(7 & n);
        t = t.currentWindow, n = i[++e];
        return t.visible = (32 & n) >> 5, t.rowLock = (16 & n) >> 4, t.columnLock = (8 & n) >> 3, t.priority = 7 & n, n = i[++e], t.relativePositioning = (128 & n) >> 7, t.anchorVertical = 127 & n, n = i[++e], t.anchorHorizontal = n, n = i[++e], t.anchorPoint = (240 & n) >> 4, t.rowCount = 15 & n, n = i[++e], t.columnCount = 63 & n, n = i[++e], t.windowStyle = (56 & n) >> 3, t.penStyle = 7 & n, t.virtualRowCount = t.rowCount + 1, e;
      }, Pe.prototype.setWindowAttributes = function (e, t) {
        var i = this.current708Packet.data,
            n = i[e],
            t = t.currentWindow.winAttr,
            n = i[++e];
        return t.fillOpacity = (192 & n) >> 6, t.fillRed = (48 & n) >> 4, t.fillGreen = (12 & n) >> 2, t.fillBlue = 3 & n, n = i[++e], t.borderType = (192 & n) >> 6, t.borderRed = (48 & n) >> 4, t.borderGreen = (12 & n) >> 2, t.borderBlue = 3 & n, n = i[++e], t.borderType += (128 & n) >> 5, t.wordWrap = (64 & n) >> 6, t.printDirection = (48 & n) >> 4, t.scrollDirection = (12 & n) >> 2, t.justify = 3 & n, n = i[++e], t.effectSpeed = (240 & n) >> 4, t.effectDirection = (12 & n) >> 2, t.displayEffect = 3 & n, e;
      }, Pe.prototype.flushDisplayed = function (e, t) {
        for (var i = [], n = 0; n < 8; n++) t.windows[n].visible && !t.windows[n].isEmpty() && i.push(t.windows[n].getText());

        t.endPts = e, t.text = i.join("\n\n"), this.pushCaption(t), t.startPts = e;
      }, Pe.prototype.pushCaption = function (e) {
        "" !== e.text && (this.trigger("data", {
          startPts: e.startPts,
          endPts: e.endPts,
          text: e.text,
          stream: "cc708_" + e.serviceNum
        }), e.text = "", e.startPts = e.endPts);
      }, Pe.prototype.displayWindows = function (e, t) {
        var i = this.current708Packet.data[++e],
            n = this.getPts(e);
        this.flushDisplayed(n, t);

        for (var r = 0; r < 8; r++) i & 1 << r && (t.windows[r].visible = 1);

        return e;
      }, Pe.prototype.hideWindows = function (e, t) {
        var i = this.current708Packet.data[++e],
            n = this.getPts(e);
        this.flushDisplayed(n, t);

        for (var r = 0; r < 8; r++) i & 1 << r && (t.windows[r].visible = 0);

        return e;
      }, Pe.prototype.toggleWindows = function (e, t) {
        var i = this.current708Packet.data[++e],
            n = this.getPts(e);
        this.flushDisplayed(n, t);

        for (var r = 0; r < 8; r++) i & 1 << r && (t.windows[r].visible ^= 1);

        return e;
      }, Pe.prototype.clearWindows = function (e, t) {
        var i = this.current708Packet.data[++e],
            n = this.getPts(e);
        this.flushDisplayed(n, t);

        for (var r = 0; r < 8; r++) i & 1 << r && t.windows[r].clearText();

        return e;
      }, Pe.prototype.deleteWindows = function (e, t) {
        var i = this.current708Packet.data[++e],
            n = this.getPts(e);
        this.flushDisplayed(n, t);

        for (var r = 0; r < 8; r++) i & 1 << r && t.windows[r].reset();

        return e;
      }, Pe.prototype.setPenAttributes = function (e, t) {
        var i = this.current708Packet.data,
            n = i[e],
            t = t.currentWindow.penAttr,
            n = i[++e];
        return t.textTag = (240 & n) >> 4, t.offset = (12 & n) >> 2, t.penSize = 3 & n, n = i[++e], t.italics = (128 & n) >> 7, t.underline = (64 & n) >> 6, t.edgeType = (56 & n) >> 3, t.fontStyle = 7 & n, e;
      }, Pe.prototype.setPenColor = function (e, t) {
        var i = this.current708Packet.data,
            n = i[e],
            t = t.currentWindow.penColor,
            n = i[++e];
        return t.fgOpacity = (192 & n) >> 6, t.fgRed = (48 & n) >> 4, t.fgGreen = (12 & n) >> 2, t.fgBlue = 3 & n, n = i[++e], t.bgOpacity = (192 & n) >> 6, t.bgRed = (48 & n) >> 4, t.bgGreen = (12 & n) >> 2, t.bgBlue = 3 & n, n = i[++e], t.edgeRed = (48 & n) >> 4, t.edgeGreen = (12 & n) >> 2, t.edgeBlue = 3 & n, e;
      }, Pe.prototype.setPenLocation = function (e, t) {
        var i = this.current708Packet.data,
            n = i[e],
            r = t.currentWindow.penLoc;
        return t.currentWindow.pendingNewLine = !0, n = i[++e], r.row = 15 & n, n = i[++e], r.column = 63 & n, e;
      }, Pe.prototype.reset = function (e, t) {
        var i = this.getPts(e);
        return this.flushDisplayed(i, t), this.initService(t.serviceNum, e);
      };

      function Le(e) {
        return null === e ? "" : (e = Oe[e] || e, String.fromCharCode(e));
      }

      function De() {
        for (var e = [], t = 15; t--;) e.push("");

        return e;
      }

      var Oe = {
        42: 225,
        92: 233,
        94: 237,
        95: 243,
        96: 250,
        123: 231,
        124: 247,
        125: 209,
        126: 241,
        127: 9608,
        304: 174,
        305: 176,
        306: 189,
        307: 191,
        308: 8482,
        309: 162,
        310: 163,
        311: 9834,
        312: 224,
        313: 160,
        314: 232,
        315: 226,
        316: 234,
        317: 238,
        318: 244,
        319: 251,
        544: 193,
        545: 201,
        546: 211,
        547: 218,
        548: 220,
        549: 252,
        550: 8216,
        551: 161,
        552: 42,
        553: 39,
        554: 8212,
        555: 169,
        556: 8480,
        557: 8226,
        558: 8220,
        559: 8221,
        560: 192,
        561: 194,
        562: 199,
        563: 200,
        564: 202,
        565: 203,
        566: 235,
        567: 206,
        568: 207,
        569: 239,
        570: 212,
        571: 217,
        572: 249,
        573: 219,
        574: 171,
        575: 187,
        800: 195,
        801: 227,
        802: 205,
        803: 204,
        804: 236,
        805: 210,
        806: 242,
        807: 213,
        808: 245,
        809: 123,
        810: 125,
        811: 92,
        812: 94,
        813: 95,
        814: 124,
        815: 126,
        816: 196,
        817: 228,
        818: 214,
        819: 246,
        820: 223,
        821: 165,
        822: 164,
        823: 9474,
        824: 197,
        825: 229,
        826: 216,
        827: 248,
        828: 9484,
        829: 9488,
        830: 9492,
        831: 9496
      },
          Re = [4352, 4384, 4608, 4640, 5376, 5408, 5632, 5664, 5888, 5920, 4096, 4864, 4896, 5120, 5152],
          Me = function e(t, i) {
        e.prototype.init.call(this), this.field_ = t || 0, this.dataChannel_ = i || 0, this.name_ = "CC" + (1 + (this.field_ << 1 | this.dataChannel_)), this.setConstants(), this.reset(), this.push = function (e) {
          var t,
              i,
              n,
              r,
              a = 32639 & e.ccData;
          a !== this.lastControlCode_ ? (4096 == (61440 & a) ? this.lastControlCode_ = a : a !== this.PADDING_ && (this.lastControlCode_ = null), t = a >>> 8, i = 255 & a, a === this.PADDING_ || (a === this.RESUME_CAPTION_LOADING_ ? this.mode_ = "popOn" : a === this.END_OF_CAPTION_ ? (this.mode_ = "popOn", this.clearFormatting(e.pts), this.flushDisplayed(e.pts), r = this.displayed_, this.displayed_ = this.nonDisplayed_, this.nonDisplayed_ = r, this.startPts_ = e.pts) : a === this.ROLL_UP_2_ROWS_ ? (this.rollUpRows_ = 2, this.setRollUp(e.pts)) : a === this.ROLL_UP_3_ROWS_ ? (this.rollUpRows_ = 3, this.setRollUp(e.pts)) : a === this.ROLL_UP_4_ROWS_ ? (this.rollUpRows_ = 4, this.setRollUp(e.pts)) : a === this.CARRIAGE_RETURN_ ? (this.clearFormatting(e.pts), this.flushDisplayed(e.pts), this.shiftRowsUp_(), this.startPts_ = e.pts) : a === this.BACKSPACE_ ? "popOn" === this.mode_ ? this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1) : this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1) : a === this.ERASE_DISPLAYED_MEMORY_ ? (this.flushDisplayed(e.pts), this.displayed_ = De()) : a === this.ERASE_NON_DISPLAYED_MEMORY_ ? this.nonDisplayed_ = De() : a === this.RESUME_DIRECT_CAPTIONING_ ? ("paintOn" !== this.mode_ && (this.flushDisplayed(e.pts), this.displayed_ = De()), this.mode_ = "paintOn", this.startPts_ = e.pts) : this.isSpecialCharacter(t, i) ? (n = Le((t = (3 & t) << 8) | i), this[this.mode_](e.pts, n), this.column_++) : this.isExtCharacter(t, i) ? ("popOn" === this.mode_ ? this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1) : this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1), n = Le((t = (3 & t) << 8) | i), this[this.mode_](e.pts, n), this.column_++) : this.isMidRowCode(t, i) ? (this.clearFormatting(e.pts), this[this.mode_](e.pts, " "), this.column_++, 14 == (14 & i) && this.addFormatting(e.pts, ["i"]), 1 == (1 & i) && this.addFormatting(e.pts, ["u"])) : this.isOffsetControlCode(t, i) ? this.column_ += 3 & i : this.isPAC(t, i) ? (r = Re.indexOf(7968 & a), "rollUp" === this.mode_ && (r - this.rollUpRows_ + 1 < 0 && (r = this.rollUpRows_ - 1), this.setRollUp(e.pts, r)), r !== this.row_ && (this.clearFormatting(e.pts), this.row_ = r), 1 & i && -1 === this.formatting_.indexOf("u") && this.addFormatting(e.pts, ["u"]), 16 == (16 & a) && (this.column_ = 4 * ((14 & a) >> 1)), this.isColorPAC(i) && 14 == (14 & i) && this.addFormatting(e.pts, ["i"])) : this.isNormalChar(t) && (0 === i && (i = null), n = Le(t), n += Le(i), this[this.mode_](e.pts, n), this.column_ += n.length))) : this.lastControlCode_ = null;
        };
      };

      Me.prototype = new j(), Me.prototype.flushDisplayed = function (e) {
        var t = this.displayed_.map(function (e, t) {
          try {
            return e.trim();
          } catch (e) {
            return this.trigger("log", {
              level: "warn",
              message: "Skipping a malformed 608 caption at index " + t + "."
            }), "";
          }
        }, this).join("\n").replace(/^\n+|\n+$/g, "");
        t.length && this.trigger("data", {
          startPts: this.startPts_,
          endPts: e,
          text: t,
          stream: this.name_
        });
      }, Me.prototype.reset = function () {
        this.mode_ = "popOn", this.topRow_ = 0, this.startPts_ = 0, this.displayed_ = De(), this.nonDisplayed_ = De(), this.lastControlCode_ = null, this.column_ = 0, this.row_ = 14, this.rollUpRows_ = 2, this.formatting_ = [];
      }, Me.prototype.setConstants = function () {
        0 === this.dataChannel_ ? (this.BASE_ = 16, this.EXT_ = 17, this.CONTROL_ = (20 | this.field_) << 8, this.OFFSET_ = 23) : 1 === this.dataChannel_ && (this.BASE_ = 24, this.EXT_ = 25, this.CONTROL_ = (28 | this.field_) << 8, this.OFFSET_ = 31), this.PADDING_ = 0, this.RESUME_CAPTION_LOADING_ = 32 | this.CONTROL_, this.END_OF_CAPTION_ = 47 | this.CONTROL_, this.ROLL_UP_2_ROWS_ = 37 | this.CONTROL_, this.ROLL_UP_3_ROWS_ = 38 | this.CONTROL_, this.ROLL_UP_4_ROWS_ = 39 | this.CONTROL_, this.CARRIAGE_RETURN_ = 45 | this.CONTROL_, this.RESUME_DIRECT_CAPTIONING_ = 41 | this.CONTROL_, this.BACKSPACE_ = 33 | this.CONTROL_, this.ERASE_DISPLAYED_MEMORY_ = 44 | this.CONTROL_, this.ERASE_NON_DISPLAYED_MEMORY_ = 46 | this.CONTROL_;
      }, Me.prototype.isSpecialCharacter = function (e, t) {
        return e === this.EXT_ && 48 <= t && t <= 63;
      }, Me.prototype.isExtCharacter = function (e, t) {
        return (e === this.EXT_ + 1 || e === this.EXT_ + 2) && 32 <= t && t <= 63;
      }, Me.prototype.isMidRowCode = function (e, t) {
        return e === this.EXT_ && 32 <= t && t <= 47;
      }, Me.prototype.isOffsetControlCode = function (e, t) {
        return e === this.OFFSET_ && 33 <= t && t <= 35;
      }, Me.prototype.isPAC = function (e, t) {
        return e >= this.BASE_ && e < this.BASE_ + 8 && 64 <= t && t <= 127;
      }, Me.prototype.isColorPAC = function (e) {
        return 64 <= e && e <= 79 || 96 <= e && e <= 127;
      }, Me.prototype.isNormalChar = function (e) {
        return 32 <= e && e <= 127;
      }, Me.prototype.setRollUp = function (e, t) {
        if ("rollUp" !== this.mode_ && (this.row_ = 14, this.mode_ = "rollUp", this.flushDisplayed(e), this.nonDisplayed_ = De(), this.displayed_ = De()), void 0 !== t && t !== this.row_) for (var i = 0; i < this.rollUpRows_; i++) this.displayed_[t - i] = this.displayed_[this.row_ - i], this.displayed_[this.row_ - i] = "";
        void 0 === t && (t = this.row_), this.topRow_ = t - this.rollUpRows_ + 1;
      }, Me.prototype.addFormatting = function (e, t) {
        this.formatting_ = this.formatting_.concat(t);
        t = t.reduce(function (e, t) {
          return e + "<" + t + ">";
        }, "");
        this[this.mode_](e, t);
      }, Me.prototype.clearFormatting = function (e) {
        var t;
        this.formatting_.length && (t = this.formatting_.reverse().reduce(function (e, t) {
          return e + "</" + t + ">";
        }, ""), this.formatting_ = [], this[this.mode_](e, t));
      }, Me.prototype.popOn = function (e, t) {
        var i = this.nonDisplayed_[this.row_];
        this.nonDisplayed_[this.row_] = i += t;
      }, Me.prototype.rollUp = function (e, t) {
        var i = this.displayed_[this.row_];
        this.displayed_[this.row_] = i += t;
      }, Me.prototype.shiftRowsUp_ = function () {
        for (var e = 0; e < this.topRow_; e++) this.displayed_[e] = "";

        for (e = this.row_ + 1; e < 15; e++) this.displayed_[e] = "";

        for (e = this.topRow_; e < this.row_; e++) this.displayed_[e] = this.displayed_[e + 1];

        this.displayed_[this.row_] = "";
      }, Me.prototype.paintOn = function (e, t) {
        var i = this.displayed_[this.row_];
        this.displayed_[this.row_] = i += t;
      };

      function Ne(e, t) {
        var i = 1;

        for (t < e && (i = -1); 4294967296 < Math.abs(t - e);) e += 8589934592 * i;

        return e;
      }

      var Ue = {
        CaptionStream: Ce,
        Cea608Stream: Me,
        Cea708Stream: Pe
      },
          Be = {
        H264_STREAM_TYPE: 27,
        ADTS_STREAM_TYPE: 15,
        METADATA_STREAM_TYPE: 21
      },
          e = function e(t) {
        var i, n;
        e.prototype.init.call(this), this.type_ = t || "shared", this.push = function (e) {
          "shared" !== this.type_ && e.type !== this.type_ || (void 0 === n && (n = e.dts), e.dts = Ne(e.dts, n), e.pts = Ne(e.pts, n), i = e.dts, this.trigger("data", e));
        }, this.flush = function () {
          n = i, this.trigger("done");
        }, this.endTimeline = function () {
          this.flush(), this.trigger("endedtimeline");
        }, this.discontinuity = function () {
          i = n = void 0;
        }, this.reset = function () {
          this.discontinuity(), this.trigger("reset");
        };
      };

      e.prototype = new j();

      function Fe(e, t, i) {
        for (var n = "", r = t; r < i; r++) n += "%" + ("00" + e[r].toString(16)).slice(-2);

        return n;
      }

      function je(e, t, i) {
        return decodeURIComponent(Fe(e, t, i));
      }

      function He(e) {
        return e[0] << 21 | e[1] << 14 | e[2] << 7 | e[3];
      }

      var qe = e,
          Ce = Ne,
          Ve = {
        TXXX: function (e) {
          var t;

          if (3 === e.data[0]) {
            for (t = 1; t < e.data.length; t++) if (0 === e.data[t]) {
              e.description = je(e.data, 1, t), e.value = je(e.data, t + 1, e.data.length).replace(/\0*$/, "");
              break;
            }

            e.data = e.value;
          }
        },
        WXXX: function (e) {
          var t;
          if (3 === e.data[0]) for (t = 1; t < e.data.length; t++) if (0 === e.data[t]) {
            e.description = je(e.data, 1, t), e.url = je(e.data, t + 1, e.data.length);
            break;
          }
        },
        PRIV: function (e) {
          for (var t, i = 0; i < e.data.length; i++) if (0 === e.data[i]) {
            e.owner = (t = e.data, unescape(Fe(t, 0, i)));
            break;
          }

          e.privateData = e.data.subarray(i + 1), e.data = e.privateData;
        }
      },
          We = function (e) {
        var t,
            i = {
          descriptor: e && e.descriptor
        },
            u = 0,
            l = [],
            c = 0;
        if (We.prototype.init.call(this), this.dispatchType = Be.METADATA_STREAM_TYPE.toString(16), i.descriptor) for (t = 0; t < i.descriptor.length; t++) this.dispatchType += ("00" + i.descriptor[t].toString(16)).slice(-2);

        this.push = function (e) {
          var t, i, n, r, a, s, o;
          if ("timed-metadata" === e.type) if (e.dataAlignmentIndicator && (c = 0, l.length = 0), 0 === l.length && (e.data.length < 10 || e.data[0] !== "I".charCodeAt(0) || e.data[1] !== "D".charCodeAt(0) || e.data[2] !== "3".charCodeAt(0))) this.trigger("log", {
            level: "warn",
            message: "Skipping unrecognized metadata packet"
          });else if (l.push(e), c += e.data.byteLength, 1 === l.length && (u = He(e.data.subarray(6, 10)), u += 10), !(c < u)) {
            for (t = {
              data: new Uint8Array(u),
              frames: [],
              pts: l[0].pts,
              dts: l[0].dts
            }, r = 0; r < u;) t.data.set(l[0].data.subarray(0, u - r), r), r += l[0].data.byteLength, c -= l[0].data.byteLength, l.shift();

            i = 10, 64 & t.data[5] && (i += 4, i += He(t.data.subarray(10, 14)), u -= He(t.data.subarray(16, 20)));

            do {
              if ((n = He(t.data.subarray(i + 4, i + 8))) < 1) return void this.trigger("log", {
                level: "warn",
                message: "Malformed ID3 frame encountered. Skipping metadata parsing."
              });
            } while (((o = {
              id: String.fromCharCode(t.data[i], t.data[i + 1], t.data[i + 2], t.data[i + 3]),
              data: t.data.subarray(i + 10, i + n + 10)
            }).key = o.id, Ve[o.id] && (Ve[o.id](o), "com.apple.streaming.transportStreamTimestamp" === o.owner && (s = (1 & (a = o.data)[3]) << 30 | a[4] << 22 | a[5] << 14 | a[6] << 6 | a[7] >>> 2, s *= 4, s += 3 & a[7], o.timeStamp = s, void 0 === t.pts && void 0 === t.dts && (t.pts = o.timeStamp, t.dts = o.timeStamp), this.trigger("timestamp", o))), t.frames.push(o), i += 10, (i += n) < u));

            this.trigger("data", t);
          }
        };
      };

      We.prototype = new j();

      var ze,
          Ge,
          e = We,
          qe = qe,
          Xe = function () {
        var r = new Uint8Array(188),
            a = 0;
        Xe.prototype.init.call(this), this.push = function (e) {
          var t,
              i = 0,
              n = 188;

          for (a ? ((t = new Uint8Array(e.byteLength + a)).set(r.subarray(0, a)), t.set(e, a), a = 0) : t = e; n < t.byteLength;) 71 !== t[i] || 71 !== t[n] ? (i++, n++) : (this.trigger("data", t.subarray(i, n)), i += 188, n += 188);

          i < t.byteLength && (r.set(t.subarray(i), 0), a = t.byteLength - i);
        }, this.flush = function () {
          188 === a && 71 === r[0] && (this.trigger("data", r), a = 0), this.trigger("done");
        }, this.endTimeline = function () {
          this.flush(), this.trigger("endedtimeline");
        }, this.reset = function () {
          a = 0, this.trigger("reset");
        };
      };

      Xe.prototype = new j(), (ze = function () {
        var n, r, a, s;
        ze.prototype.init.call(this), (s = this).packetsWaitingForPmt = [], this.programMapTable = void 0, n = function (e, t) {
          var i = 0;
          t.payloadUnitStartIndicator && (i += e[i] + 1), ("pat" === t.type ? r : a)(e.subarray(i), t);
        }, r = function (e, t) {
          t.section_number = e[7], t.last_section_number = e[8], s.pmtPid = (31 & e[10]) << 8 | e[11], t.pmtPid = s.pmtPid;
        }, a = function (e, t) {
          var i, n;

          if (1 & e[5]) {
            for (s.programMapTable = {
              video: null,
              audio: null,
              "timed-metadata": {}
            }, i = 3 + ((15 & e[1]) << 8 | e[2]) - 4, n = 12 + ((15 & e[10]) << 8 | e[11]); n < i;) {
              var r = e[n],
                  a = (31 & e[n + 1]) << 8 | e[n + 2];
              r === Be.H264_STREAM_TYPE && null === s.programMapTable.video ? s.programMapTable.video = a : r === Be.ADTS_STREAM_TYPE && null === s.programMapTable.audio ? s.programMapTable.audio = a : r === Be.METADATA_STREAM_TYPE && (s.programMapTable["timed-metadata"][a] = r), n += 5 + ((15 & e[n + 3]) << 8 | e[n + 4]);
            }

            t.programMapTable = s.programMapTable;
          }
        }, this.push = function (e) {
          var t = {},
              i = 4;
          if (t.payloadUnitStartIndicator = !!(64 & e[1]), t.pid = 31 & e[1], t.pid <<= 8, t.pid |= e[2], 1 < (48 & e[3]) >>> 4 && (i += e[i] + 1), 0 === t.pid) t.type = "pat", n(e.subarray(i), t), this.trigger("data", t);else if (t.pid === this.pmtPid) for (t.type = "pmt", n(e.subarray(i), t), this.trigger("data", t); this.packetsWaitingForPmt.length;) this.processPes_.apply(this, this.packetsWaitingForPmt.shift());else void 0 === this.programMapTable ? this.packetsWaitingForPmt.push([e, i, t]) : this.processPes_(e, i, t);
        }, this.processPes_ = function (e, t, i) {
          i.pid === this.programMapTable.video ? i.streamType = Be.H264_STREAM_TYPE : i.pid === this.programMapTable.audio ? i.streamType = Be.ADTS_STREAM_TYPE : i.streamType = this.programMapTable["timed-metadata"][i.pid], i.type = "pes", i.data = e.subarray(t), this.trigger("data", i);
        };
      }).prototype = new j(), ze.STREAM_TYPES = {
        h264: 27,
        adts: 15
      }, (Ge = function () {
        function n(e, t, i) {
          var n,
              r,
              a,
              s,
              o = new Uint8Array(e.size),
              u = {
            type: t
          },
              l = 0,
              c = 0;

          if (e.data.length && !(e.size < 9)) {
            for (u.trackId = e.data[0].pid, l = 0; l < e.data.length; l++) n = e.data[l], o.set(n.data, c), c += n.data.byteLength;

            a = u, s = (r = o)[0] << 16 | r[1] << 8 | r[2], a.data = new Uint8Array(), 1 == s && (a.packetLength = 6 + (r[4] << 8 | r[5]), a.dataAlignmentIndicator = 0 != (4 & r[6]), 192 & (s = r[7]) && (a.pts = (14 & r[9]) << 27 | (255 & r[10]) << 20 | (254 & r[11]) << 12 | (255 & r[12]) << 5 | (254 & r[13]) >>> 3, a.pts *= 4, a.pts += (6 & r[13]) >>> 1, a.dts = a.pts, 64 & s && (a.dts = (14 & r[14]) << 27 | (255 & r[15]) << 20 | (254 & r[16]) << 12 | (255 & r[17]) << 5 | (254 & r[18]) >>> 3, a.dts *= 4, a.dts += (6 & r[18]) >>> 1)), a.data = r.subarray(9 + r[8])), t = "video" === t || u.packetLength <= e.size, (i || t) && (e.size = 0, e.data.length = 0), t && d.trigger("data", u);
          }
        }

        var t,
            d = this,
            r = !1,
            a = {
          data: [],
          size: 0
        },
            s = {
          data: [],
          size: 0
        },
            o = {
          data: [],
          size: 0
        };
        Ge.prototype.init.call(this), this.push = function (i) {
          ({
            pat: function () {},
            pes: function () {
              var e, t;

              switch (i.streamType) {
                case Be.H264_STREAM_TYPE:
                  e = a, t = "video";
                  break;

                case Be.ADTS_STREAM_TYPE:
                  e = s, t = "audio";
                  break;

                case Be.METADATA_STREAM_TYPE:
                  e = o, t = "timed-metadata";
                  break;

                default:
                  return;
              }

              i.payloadUnitStartIndicator && n(e, t, !0), e.data.push(i), e.size += i.data.byteLength;
            },
            pmt: function () {
              var e = {
                type: "metadata",
                tracks: []
              };
              null !== (t = i.programMapTable).video && e.tracks.push({
                timelineStartInfo: {
                  baseMediaDecodeTime: 0
                },
                id: +t.video,
                codec: "avc",
                type: "video"
              }), null !== t.audio && e.tracks.push({
                timelineStartInfo: {
                  baseMediaDecodeTime: 0
                },
                id: +t.audio,
                codec: "adts",
                type: "audio"
              }), r = !0, d.trigger("data", e);
            }
          })[i.type]();
        }, this.reset = function () {
          a.size = 0, a.data.length = 0, s.size = 0, s.data.length = 0, this.trigger("reset");
        }, this.flushStreams_ = function () {
          n(a, "video"), n(s, "audio"), n(o, "timed-metadata");
        }, this.flush = function () {
          var e;
          !r && t && (e = {
            type: "metadata",
            tracks: []
          }, null !== t.video && e.tracks.push({
            timelineStartInfo: {
              baseMediaDecodeTime: 0
            },
            id: +t.video,
            codec: "avc",
            type: "video"
          }), null !== t.audio && e.tracks.push({
            timelineStartInfo: {
              baseMediaDecodeTime: 0
            },
            id: +t.audio,
            codec: "adts",
            type: "audio"
          }), d.trigger("data", e)), r = !1, this.flushStreams_(), this.trigger("done");
        };
      }).prototype = new j();
      var Ke,
          Ye = {
        PAT_PID: 0,
        MP2T_PACKET_LENGTH: 188,
        TransportPacketStream: Xe,
        TransportParseStream: ze,
        ElementaryStream: Ge,
        TimestampRolloverStream: qe,
        CaptionStream: Ue.CaptionStream,
        Cea608Stream: Ue.Cea608Stream,
        Cea708Stream: Ue.Cea708Stream,
        MetadataStream: e
      };

      for (Ke in Be) Be.hasOwnProperty(Ke) && (Ye[Ke] = Be[Ke]);

      var Qe = Ye,
          $e = se,
          Je = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350],
          Ze = function (u) {
        var l,
            c = 0;
        Ze.prototype.init.call(this), this.skipWarn_ = function (e, t) {
          this.trigger("log", {
            level: "warn",
            message: "adts skiping bytes " + e + " to " + t + " in frame " + c + " outside syncword"
          });
        }, this.push = function (e) {
          var t,
              i,
              n,
              r,
              a,
              s,
              o = 0;

          if (u || (c = 0), "audio" === e.type) {
            for (l && l.length ? (n = l, (l = new Uint8Array(n.byteLength + e.data.byteLength)).set(n), l.set(e.data, n.byteLength)) : l = e.data; o + 7 < l.length;) if (255 === l[o] && 240 == (246 & l[o + 1])) {
              if ("number" == typeof s && (this.skipWarn_(s, o), s = null), i = 2 * (1 & ~l[o + 1]), t = (3 & l[o + 3]) << 11 | l[o + 4] << 3 | (224 & l[o + 5]) >> 5, a = (r = 1024 * (1 + (3 & l[o + 6]))) * $e / Je[(60 & l[o + 2]) >>> 2], l.byteLength - o < t) break;
              this.trigger("data", {
                pts: e.pts + c * a,
                dts: e.dts + c * a,
                sampleCount: r,
                audioobjecttype: 1 + (l[o + 2] >>> 6 & 3),
                channelcount: (1 & l[o + 2]) << 2 | (192 & l[o + 3]) >>> 6,
                samplerate: Je[(60 & l[o + 2]) >>> 2],
                samplingfrequencyindex: (60 & l[o + 2]) >>> 2,
                samplesize: 16,
                data: l.subarray(o + 7 + i, o + t)
              }), c++, o += t;
            } else "number" != typeof s && (s = o), o++;

            "number" == typeof s && (this.skipWarn_(s, o), s = null), l = l.subarray(o);
          }
        }, this.flush = function () {
          c = 0, this.trigger("done");
        }, this.reset = function () {
          l = void 0, this.trigger("reset");
        }, this.endTimeline = function () {
          l = void 0, this.trigger("endedtimeline");
        };
      };

      Ze.prototype = new j();

      var et,
          tt,
          it = Ze,
          nt = function (n) {
        var r = n.byteLength,
            a = 0,
            s = 0;
        this.length = function () {
          return 8 * r;
        }, this.bitsAvailable = function () {
          return 8 * r + s;
        }, this.loadWord = function () {
          var e = n.byteLength - r,
              t = new Uint8Array(4),
              i = Math.min(4, r);
          if (0 === i) throw new Error("no bytes available");
          t.set(n.subarray(e, e + i)), a = new DataView(t.buffer).getUint32(0), s = 8 * i, r -= i;
        }, this.skipBits = function (e) {
          var t;
          e < s || (e -= s, e -= 8 * (t = Math.floor(e / 8)), r -= t, this.loadWord()), a <<= e, s -= e;
        }, this.readBits = function (e) {
          var t = Math.min(s, e),
              i = a >>> 32 - t;
          return 0 < (s -= t) ? a <<= t : 0 < r && this.loadWord(), 0 < (t = e - t) ? i << t | this.readBits(t) : i;
        }, this.skipLeadingZeros = function () {
          for (var e = 0; e < s; ++e) if (0 != (a & 2147483648 >>> e)) return a <<= e, s -= e, e;

          return this.loadWord(), e + this.skipLeadingZeros();
        }, this.skipUnsignedExpGolomb = function () {
          this.skipBits(1 + this.skipLeadingZeros());
        }, this.skipExpGolomb = function () {
          this.skipBits(1 + this.skipLeadingZeros());
        }, this.readUnsignedExpGolomb = function () {
          var e = this.skipLeadingZeros();
          return this.readBits(e + 1) - 1;
        }, this.readExpGolomb = function () {
          var e = this.readUnsignedExpGolomb();
          return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1);
        }, this.readBoolean = function () {
          return 1 === this.readBits(1);
        }, this.readUnsignedByte = function () {
          return this.readBits(8);
        }, this.loadWord();
      },
          rt = function () {
        var n,
            r,
            a = 0;
        rt.prototype.init.call(this), this.push = function (e) {
          for (var t, i = (r = r ? ((t = new Uint8Array(r.byteLength + e.data.byteLength)).set(r), t.set(e.data, r.byteLength), t) : e.data).byteLength; a < i - 3; a++) if (1 === r[a + 2]) {
            n = a + 5;
            break;
          }

          for (; n < i;) switch (r[n]) {
            case 0:
              if (0 !== r[n - 1]) {
                n += 2;
                break;
              }

              if (0 !== r[n - 2]) {
                n++;
                break;
              }

              for (a + 3 !== n - 2 && this.trigger("data", r.subarray(a + 3, n - 2)); 1 !== r[++n] && n < i;);

              a = n - 2, n += 3;
              break;

            case 1:
              if (0 !== r[n - 1] || 0 !== r[n - 2]) {
                n += 3;
                break;
              }

              this.trigger("data", r.subarray(a + 3, n - 2)), a = n - 2, n += 3;
              break;

            default:
              n += 3;
          }

          r = r.subarray(a), n -= a, a = 0;
        }, this.reset = function () {
          r = null, a = 0, this.trigger("reset");
        }, this.flush = function () {
          r && 3 < r.byteLength && this.trigger("data", r.subarray(a + 3)), r = null, a = 0, this.trigger("done");
        }, this.endTimeline = function () {
          this.flush(), this.trigger("endedtimeline");
        };
      };

      rt.prototype = new j(), tt = {
        100: !0,
        110: !0,
        122: !0,
        244: !0,
        44: !0,
        83: !0,
        86: !0,
        118: !0,
        128: !0,
        138: !0,
        139: !0,
        134: !0
      }, (et = function () {
        var i,
            n,
            r,
            a,
            s,
            o,
            m,
            t = new rt();
        et.prototype.init.call(this), (i = this).push = function (e) {
          "video" === e.type && (n = e.trackId, r = e.pts, a = e.dts, t.push(e));
        }, t.on("data", function (e) {
          var t = {
            trackId: n,
            pts: r,
            dts: a,
            data: e,
            nalUnitTypeCode: 31 & e[0]
          };

          switch (t.nalUnitTypeCode) {
            case 5:
              t.nalUnitType = "slice_layer_without_partitioning_rbsp_idr";
              break;

            case 6:
              t.nalUnitType = "sei_rbsp", t.escapedRBSP = s(e.subarray(1));
              break;

            case 7:
              t.nalUnitType = "seq_parameter_set_rbsp", t.escapedRBSP = s(e.subarray(1)), t.config = o(t.escapedRBSP);
              break;

            case 8:
              t.nalUnitType = "pic_parameter_set_rbsp";
              break;

            case 9:
              t.nalUnitType = "access_unit_delimiter_rbsp";
          }

          i.trigger("data", t);
        }), t.on("done", function () {
          i.trigger("done");
        }), t.on("partialdone", function () {
          i.trigger("partialdone");
        }), t.on("reset", function () {
          i.trigger("reset");
        }), t.on("endedtimeline", function () {
          i.trigger("endedtimeline");
        }), this.flush = function () {
          t.flush();
        }, this.partialFlush = function () {
          t.partialFlush();
        }, this.reset = function () {
          t.reset();
        }, this.endTimeline = function () {
          t.endTimeline();
        }, m = function (e, t) {
          for (var i = 8, n = 8, r = 0; r < e; r++) i = 0 === (n = 0 !== n ? (i + t.readExpGolomb() + 256) % 256 : n) ? i : n;
        }, s = function (e) {
          for (var t = e.byteLength, i = [], n = 1; n < t - 2;) 0 === e[n] && 0 === e[n + 1] && 3 === e[n + 2] ? (i.push(n + 2), n += 2) : n++;

          if (0 === i.length) return e;

          for (var r = t - i.length, a = new Uint8Array(r), s = 0, n = 0; n < r; s++, n++) s === i[0] && (s++, i.shift()), a[n] = e[s];

          return a;
        }, o = function (e) {
          var t,
              i,
              n,
              r,
              a,
              s = 0,
              o = 0,
              u = 0,
              l = 0,
              c = [1, 1],
              d = new nt(e),
              h = d.readUnsignedByte(),
              p = d.readUnsignedByte(),
              f = d.readUnsignedByte();
          if (d.skipUnsignedExpGolomb(), tt[h] && (3 === (i = d.readUnsignedExpGolomb()) && d.skipBits(1), d.skipUnsignedExpGolomb(), d.skipUnsignedExpGolomb(), d.skipBits(1), d.readBoolean())) for (r = 3 !== i ? 8 : 12, a = 0; a < r; a++) d.readBoolean() && m(a < 6 ? 16 : 64, d);
          if (d.skipUnsignedExpGolomb(), 0 === (n = d.readUnsignedExpGolomb())) d.readUnsignedExpGolomb();else if (1 === n) for (d.skipBits(1), d.skipExpGolomb(), d.skipExpGolomb(), t = d.readUnsignedExpGolomb(), a = 0; a < t; a++) d.skipExpGolomb();

          if (d.skipUnsignedExpGolomb(), d.skipBits(1), e = d.readUnsignedExpGolomb(), i = d.readUnsignedExpGolomb(), 0 === (n = d.readBits(1)) && d.skipBits(1), d.skipBits(1), d.readBoolean() && (s = d.readUnsignedExpGolomb(), o = d.readUnsignedExpGolomb(), u = d.readUnsignedExpGolomb(), l = d.readUnsignedExpGolomb()), d.readBoolean() && d.readBoolean()) {
            switch (d.readUnsignedByte()) {
              case 1:
                c = [1, 1];
                break;

              case 2:
                c = [12, 11];
                break;

              case 3:
                c = [10, 11];
                break;

              case 4:
                c = [16, 11];
                break;

              case 5:
                c = [40, 33];
                break;

              case 6:
                c = [24, 11];
                break;

              case 7:
                c = [20, 11];
                break;

              case 8:
                c = [32, 11];
                break;

              case 9:
                c = [80, 33];
                break;

              case 10:
                c = [18, 11];
                break;

              case 11:
                c = [15, 11];
                break;

              case 12:
                c = [64, 33];
                break;

              case 13:
                c = [160, 99];
                break;

              case 14:
                c = [4, 3];
                break;

              case 15:
                c = [3, 2];
                break;

              case 16:
                c = [2, 1];
                break;

              case 255:
                c = [d.readUnsignedByte() << 8 | d.readUnsignedByte(), d.readUnsignedByte() << 8 | d.readUnsignedByte()];
            }

            c && (c[0], c[1]);
          }

          return {
            profileIdc: h,
            levelIdc: f,
            profileCompatibility: p,
            width: 16 * (e + 1) - 2 * s - 2 * o,
            height: (2 - n) * (i + 1) * 16 - 2 * u - 2 * l,
            sarRatio: c
          };
        };
      }).prototype = new j();

      function at(e, t) {
        var i = 0 <= (i = e[t + 6] << 21 | e[t + 7] << 14 | e[t + 8] << 7 | e[t + 9]) ? i : 0;
        return (16 & e[t + 5]) >> 4 ? i + 20 : i + 10;
      }

      function st(e, t) {
        return e.length - t < 10 || e[t] !== "I".charCodeAt(0) || e[t + 1] !== "D".charCodeAt(0) || e[t + 2] !== "3".charCodeAt(0) ? t : st(e, t += at(e, t));
      }

      function ot(e) {
        return e[0] << 21 | e[1] << 14 | e[2] << 7 | e[3];
      }

      var qe = {
        H264Stream: et,
        NalByteStream: rt
      },
          ut = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350],
          lt = {
        isLikelyAacData: function (e) {
          var t = st(e, 0);
          return e.length >= t + 2 && 255 == (255 & e[t]) && 240 == (240 & e[t + 1]) && 16 == (22 & e[t + 1]);
        },
        parseId3TagSize: at,
        parseAdtsSize: function (e, t) {
          var i = (224 & e[t + 5]) >> 5,
              n = e[t + 4] << 3;
          return 6144 & e[t + 3] | n | i;
        },
        parseType: function (e, t) {
          return e[t] === "I".charCodeAt(0) && e[t + 1] === "D".charCodeAt(0) && e[t + 2] === "3".charCodeAt(0) ? "timed-metadata" : !0 & e[t] && 240 == (240 & e[t + 1]) ? "audio" : null;
        },
        parseSampleRate: function (e) {
          for (var t = 0; t + 5 < e.length;) {
            if (255 === e[t] && 240 == (246 & e[t + 1])) return ut[(60 & e[t + 2]) >>> 2];
            t++;
          }

          return null;
        },
        parseAacTimestamp: function (e) {
          var t,
              i = 10;
          64 & e[5] && (i += 4, i += ot(e.subarray(10, 14)));

          do {
            if ((t = ot(e.subarray(i + 4, i + 8))) < 1) return null;
            if ("PRIV" === String.fromCharCode(e[i], e[i + 1], e[i + 2], e[i + 3])) for (var n = e.subarray(i + 10, i + t + 10), r = 0; r < n.byteLength; r++) if (0 === n[r]) {
              if ("com.apple.streaming.transportStreamTimestamp" !== unescape(function (e, t, i) {
                for (var n = "", r = t; r < i; r++) n += "%" + ("00" + e[r].toString(16)).slice(-2);

                return n;
              }(n, 0, r))) break;
              var a = n.subarray(r + 1),
                  s = (1 & a[3]) << 30 | a[4] << 22 | a[5] << 14 | a[6] << 6 | a[7] >>> 2;
              return s *= 4, s += 3 & a[7];
            }
          } while ((i += 10, (i += t) < e.byteLength));

          return null;
        }
      },
          ct = function () {
        var a = new Uint8Array(),
            s = 0;
        ct.prototype.init.call(this), this.setTimestamp = function (e) {
          s = e;
        }, this.push = function (e) {
          var t,
              i,
              n = 0,
              r = 0;

          for (a.length ? (i = a.length, (a = new Uint8Array(e.byteLength + i)).set(a.subarray(0, i)), a.set(e, i)) : a = e; 3 <= a.length - r;) if (a[r] !== "I".charCodeAt(0) || a[r + 1] !== "D".charCodeAt(0) || a[r + 2] !== "3".charCodeAt(0)) {
            if (255 != (255 & a[r]) || 240 != (240 & a[r + 1])) r++;else {
              if (a.length - r < 7) break;
              if (r + (n = lt.parseAdtsSize(a, r)) > a.length) break;
              t = {
                type: "audio",
                data: a.subarray(r, r + n),
                pts: s,
                dts: s
              }, this.trigger("data", t), r += n;
            }
          } else {
            if (a.length - r < 10) break;
            if (r + (n = lt.parseId3TagSize(a, r)) > a.length) break;
            t = {
              type: "timed-metadata",
              data: a.subarray(r, r + n)
            }, this.trigger("data", t), r += n;
          }

          e = a.length - r, a = 0 < e ? a.subarray(r) : new Uint8Array();
        }, this.reset = function () {
          a = new Uint8Array(), this.trigger("reset");
        }, this.endTimeline = function () {
          a = new Uint8Array(), this.trigger("endedtimeline");
        };
      };

      ct.prototype = new j();

      function dt(e, t) {
        var i;

        if (e.length === t.length) {
          for (i = 0; i < e.length; i++) if (e[i] !== t[i]) return;

          return 1;
        }
      }

      function ht(e, t, i, n, r, a) {
        return {
          start: {
            dts: e,
            pts: e + (i - t)
          },
          end: {
            dts: e + (n - t),
            pts: e + (r - i)
          },
          prependedContentDuration: a,
          baseMediaDecodeTime: e
        };
      }

      var pt,
          ft,
          mt,
          gt = ct,
          yt = ["audioobjecttype", "channelcount", "samplerate", "samplingfrequencyindex", "samplesize"],
          vt = ["width", "height", "profileIdc", "levelIdc", "profileCompatibility", "sarRatio"],
          _t = qe.H264Stream,
          bt = lt.isLikelyAacData,
          Tt = se,
          St = function (a, s) {
        var o = [],
            u = 0,
            l = 0,
            c = 0,
            d = 1 / 0;
        s = s || {}, St.prototype.init.call(this), this.push = function (t) {
          _e(a, t), a && yt.forEach(function (e) {
            a[e] = t[e];
          }), o.push(t);
        }, this.setEarliestDts = function (e) {
          l = e;
        }, this.setVideoBaseMediaDecodeTime = function (e) {
          d = e;
        }, this.setAudioAppendStart = function (e) {
          c = e;
        }, this.flush = function () {
          var e, t, i, n, r;
          0 !== o.length && (e = pe(o, a, l), a.baseMediaDecodeTime = ve(a, s.keepOriginalTimestamps), r = he(a, e, c, d), a.samples = fe(e), t = G(me(e)), o = [], n = X(u, [a]), i = new Uint8Array(n.byteLength + t.byteLength), u++, i.set(n), i.set(t, n.byteLength), ye(a), n = Math.ceil(1024 * Tt / a.samplerate), e.length && (n = e.length * n, this.trigger("segmentTimingInfo", ht(le(a.baseMediaDecodeTime, a.samplerate), e[0].dts, e[0].pts, e[0].dts + n, e[0].pts + n, r || 0)), this.trigger("timingInfo", {
            start: e[0].pts,
            end: e[0].pts + n
          })), this.trigger("data", {
            track: a,
            boxes: i
          })), this.trigger("done", "AudioSegmentStream");
        }, this.reset = function () {
          ye(a), o = [], this.trigger("reset");
        };
      };

      St.prototype = new j(), (pt = function (s, a) {
        var t,
            i,
            o = 0,
            u = [],
            l = [];
        a = a || {}, pt.prototype.init.call(this), delete s.minPTS, this.gopCache_ = [], this.push = function (e) {
          _e(s, e), "seq_parameter_set_rbsp" !== e.nalUnitType || t || (t = e.config, s.sps = [e.data], vt.forEach(function (e) {
            s[e] = t[e];
          }, this)), "pic_parameter_set_rbsp" !== e.nalUnitType || i || (i = e.data, s.pps = [e.data]), u.push(e);
        }, this.flush = function () {
          for (var e, t, i, n = 0; u.length && "access_unit_delimiter_rbsp" !== u[0].nalUnitType;) u.shift();

          if (0 === u.length) return this.resetStream_(), void this.trigger("done", "VideoSegmentStream");

          if (e = Y(u), (t = Q(e))[0][0].keyFrame || ((i = this.getGopForFusion_(u[0], s)) ? (n = i.duration, t.unshift(i), t.byteLength += i.byteLength, t.nalCount += i.nalCount, t.pts = i.pts, t.dts = i.dts, t.duration += i.duration) : t = $(t)), l.length) {
            var r = a.alignGopsAtEnd ? this.alignGopsAtEnd_(t) : this.alignGopsAtStart_(t);
            if (!r) return this.gopCache_.unshift({
              gop: t.pop(),
              pps: s.pps,
              sps: s.sps
            }), this.gopCache_.length = Math.min(6, this.gopCache_.length), u = [], this.resetStream_(), void this.trigger("done", "VideoSegmentStream");
            ye(s), t = r;
          }

          _e(s, t), s.samples = J(t), e = G(Z(t)), s.baseMediaDecodeTime = ve(s, a.keepOriginalTimestamps), this.trigger("processedGopsInfo", t.map(function (e) {
            return {
              pts: e.pts,
              dts: e.dts,
              byteLength: e.byteLength
            };
          })), i = t[0], r = t[t.length - 1], this.trigger("segmentTimingInfo", ht(s.baseMediaDecodeTime, i.dts, i.pts, r.dts + r.duration, r.pts + r.duration, n)), this.trigger("timingInfo", {
            start: t[0].pts,
            end: t[t.length - 1].pts + t[t.length - 1].duration
          }), this.gopCache_.unshift({
            gop: t.pop(),
            pps: s.pps,
            sps: s.sps
          }), this.gopCache_.length = Math.min(6, this.gopCache_.length), u = [], this.trigger("baseMediaDecodeTime", s.baseMediaDecodeTime), this.trigger("timelineStartInfo", s.timelineStartInfo), n = X(o, [s]), t = new Uint8Array(n.byteLength + e.byteLength), o++, t.set(n), t.set(e, n.byteLength), this.trigger("data", {
            track: s,
            boxes: t
          }), this.resetStream_(), this.trigger("done", "VideoSegmentStream");
        }, this.reset = function () {
          this.resetStream_(), u = [], this.gopCache_.length = 0, l.length = 0, this.trigger("reset");
        }, this.resetStream_ = function () {
          ye(s), i = t = void 0;
        }, this.getGopForFusion_ = function (e) {
          for (var t, i, n, r = 1 / 0, a = 0; a < this.gopCache_.length; a++) i = (n = this.gopCache_[a]).gop, s.pps && dt(s.pps[0], n.pps[0]) && s.sps && dt(s.sps[0], n.sps[0]) && (i.dts < s.timelineStartInfo.dts || -1e4 <= (i = e.dts - i.dts - i.duration) && i <= 45e3 && (!t || i < r) && (t = n, r = i));

          return t ? t.gop : null;
        }, this.alignGopsAtStart_ = function (e) {
          for (var t, i, n, r, a = e.byteLength, s = e.nalCount, o = e.duration, u = t = 0; u < l.length && t < e.length && (i = l[u], n = e[t], i.pts !== n.pts);) n.pts > i.pts ? u++ : (t++, a -= n.byteLength, s -= n.nalCount, o -= n.duration);

          return 0 === t ? e : t === e.length ? null : ((r = e.slice(t)).byteLength = a, r.duration = o, r.nalCount = s, r.pts = r[0].pts, r.dts = r[0].dts, r);
        }, this.alignGopsAtEnd_ = function (e) {
          for (var t, i, n = l.length - 1, r = e.length - 1, a = null, s = !1; 0 <= n && 0 <= r;) {
            if (t = l[n], i = e[r], t.pts === i.pts) {
              s = !0;
              break;
            }

            t.pts > i.pts ? n-- : (n === l.length - 1 && (a = r), r--);
          }

          if (!s && null === a) return null;
          if (0 === (u = s ? r : a)) return e;
          var o = e.slice(u),
              u = o.reduce(function (e, t) {
            return e.byteLength += t.byteLength, e.duration += t.duration, e.nalCount += t.nalCount, e;
          }, {
            byteLength: 0,
            duration: 0,
            nalCount: 0
          });
          return o.byteLength = u.byteLength, o.duration = u.duration, o.nalCount = u.nalCount, o.pts = o[0].pts, o.dts = o[0].dts, o;
        }, this.alignGopsWith = function (e) {
          l = e;
        };
      }).prototype = new j(), (mt = function (e, t) {
        this.numberOfTracks = 0, this.metadataStream = t, "undefined" != typeof (e = e || {}).remux ? this.remuxTracks = !!e.remux : this.remuxTracks = !0, "boolean" == typeof e.keepOriginalTimestamps ? this.keepOriginalTimestamps = e.keepOriginalTimestamps : this.keepOriginalTimestamps = !1, this.pendingTracks = [], this.videoTrack = null, this.pendingBoxes = [], this.pendingCaptions = [], this.pendingMetadata = [], this.pendingBytes = 0, this.emittedTracks = 0, mt.prototype.init.call(this), this.push = function (e) {
          return e.text ? this.pendingCaptions.push(e) : e.frames ? this.pendingMetadata.push(e) : (this.pendingTracks.push(e.track), this.pendingBytes += e.boxes.byteLength, "video" === e.track.type && (this.videoTrack = e.track, this.pendingBoxes.push(e.boxes)), void ("audio" === e.track.type && (this.audioTrack = e.track, this.pendingBoxes.unshift(e.boxes))));
        };
      }).prototype = new j(), mt.prototype.flush = function (e) {
        var t,
            i,
            n,
            r = 0,
            a = {
          captions: [],
          captionStreams: {},
          metadata: [],
          info: {}
        },
            s = 0;

        if (this.pendingTracks.length < this.numberOfTracks) {
          if ("VideoSegmentStream" !== e && "AudioSegmentStream" !== e) return;
          if (this.remuxTracks) return;
          if (0 === this.pendingTracks.length) return this.emittedTracks++, void (this.emittedTracks >= this.numberOfTracks && (this.trigger("done"), this.emittedTracks = 0));
        }

        if (this.videoTrack ? (s = this.videoTrack.timelineStartInfo.pts, vt.forEach(function (e) {
          a.info[e] = this.videoTrack[e];
        }, this)) : this.audioTrack && (s = this.audioTrack.timelineStartInfo.pts, yt.forEach(function (e) {
          a.info[e] = this.audioTrack[e];
        }, this)), this.videoTrack || this.audioTrack) {
          for (1 === this.pendingTracks.length ? a.type = this.pendingTracks[0].type : a.type = "combined", this.emittedTracks += this.pendingTracks.length, e = K(this.pendingTracks), a.initSegment = new Uint8Array(e.byteLength), a.initSegment.set(e), a.data = new Uint8Array(this.pendingBytes), n = 0; n < this.pendingBoxes.length; n++) a.data.set(this.pendingBoxes[n], r), r += this.pendingBoxes[n].byteLength;

          for (n = 0; n < this.pendingCaptions.length; n++) (t = this.pendingCaptions[n]).startTime = de(t.startPts, s, this.keepOriginalTimestamps), t.endTime = de(t.endPts, s, this.keepOriginalTimestamps), a.captionStreams[t.stream] = !0, a.captions.push(t);

          for (n = 0; n < this.pendingMetadata.length; n++) (i = this.pendingMetadata[n]).cueTime = de(i.pts, s, this.keepOriginalTimestamps), a.metadata.push(i);

          for (a.metadata.dispatchType = this.metadataStream.dispatchType, this.pendingTracks.length = 0, this.videoTrack = null, this.pendingBoxes.length = 0, this.pendingCaptions.length = 0, this.pendingBytes = 0, this.pendingMetadata.length = 0, this.trigger("data", a), n = 0; n < a.captions.length; n++) t = a.captions[n], this.trigger("caption", t);

          for (n = 0; n < a.metadata.length; n++) i = a.metadata[n], this.trigger("id3Frame", i);
        }

        this.emittedTracks >= this.numberOfTracks && (this.trigger("done"), this.emittedTracks = 0);
      }, mt.prototype.setRemux = function (e) {
        this.remuxTracks = e;
      }, (ft = function (n) {
        var r,
            a,
            s = this,
            o = !0;
        ft.prototype.init.call(this), this.baseMediaDecodeTime = (n = n || {}).baseMediaDecodeTime || 0, this.transmuxPipeline_ = {}, this.setupAacPipeline = function () {
          var t = {};
          (this.transmuxPipeline_ = t).type = "aac", t.metadataStream = new Qe.MetadataStream(), t.aacStream = new gt(), t.audioTimestampRolloverStream = new Qe.TimestampRolloverStream("audio"), t.timedMetadataTimestampRolloverStream = new Qe.TimestampRolloverStream("timed-metadata"), t.adtsStream = new it(), t.coalesceStream = new mt(n, t.metadataStream), t.headOfPipeline = t.aacStream, t.aacStream.pipe(t.audioTimestampRolloverStream).pipe(t.adtsStream), t.aacStream.pipe(t.timedMetadataTimestampRolloverStream).pipe(t.metadataStream).pipe(t.coalesceStream), t.metadataStream.on("timestamp", function (e) {
            t.aacStream.setTimestamp(e.timeStamp);
          }), t.aacStream.on("data", function (e) {
            "timed-metadata" !== e.type && "audio" !== e.type || t.audioSegmentStream || (a = a || {
              timelineStartInfo: {
                baseMediaDecodeTime: s.baseMediaDecodeTime
              },
              codec: "adts",
              type: "audio"
            }, t.coalesceStream.numberOfTracks++, t.audioSegmentStream = new St(a, n), t.audioSegmentStream.on("log", s.getLogTrigger_("audioSegmentStream")), t.audioSegmentStream.on("timingInfo", s.trigger.bind(s, "audioTimingInfo")), t.adtsStream.pipe(t.audioSegmentStream).pipe(t.coalesceStream), s.trigger("trackinfo", {
              hasAudio: !!a,
              hasVideo: !!r
            }));
          }), t.coalesceStream.on("data", this.trigger.bind(this, "data")), t.coalesceStream.on("done", this.trigger.bind(this, "done"));
        }, this.setupTsPipeline = function () {
          var i = {};
          (this.transmuxPipeline_ = i).type = "ts", i.metadataStream = new Qe.MetadataStream(), i.packetStream = new Qe.TransportPacketStream(), i.parseStream = new Qe.TransportParseStream(), i.elementaryStream = new Qe.ElementaryStream(), i.timestampRolloverStream = new Qe.TimestampRolloverStream(), i.adtsStream = new it(), i.h264Stream = new _t(), i.captionStream = new Qe.CaptionStream(n), i.coalesceStream = new mt(n, i.metadataStream), i.headOfPipeline = i.packetStream, i.packetStream.pipe(i.parseStream).pipe(i.elementaryStream).pipe(i.timestampRolloverStream), i.timestampRolloverStream.pipe(i.h264Stream), i.timestampRolloverStream.pipe(i.adtsStream), i.timestampRolloverStream.pipe(i.metadataStream).pipe(i.coalesceStream), i.h264Stream.pipe(i.captionStream).pipe(i.coalesceStream), i.elementaryStream.on("data", function (e) {
            var t;

            if ("metadata" === e.type) {
              for (t = e.tracks.length; t--;) r || "video" !== e.tracks[t].type ? a || "audio" !== e.tracks[t].type || ((a = e.tracks[t]).timelineStartInfo.baseMediaDecodeTime = s.baseMediaDecodeTime) : (r = e.tracks[t]).timelineStartInfo.baseMediaDecodeTime = s.baseMediaDecodeTime;

              r && !i.videoSegmentStream && (i.coalesceStream.numberOfTracks++, i.videoSegmentStream = new pt(r, n), i.videoSegmentStream.on("log", s.getLogTrigger_("videoSegmentStream")), i.videoSegmentStream.on("timelineStartInfo", function (e) {
                a && !n.keepOriginalTimestamps && (a.timelineStartInfo = e, i.audioSegmentStream.setEarliestDts(e.dts - s.baseMediaDecodeTime));
              }), i.videoSegmentStream.on("processedGopsInfo", s.trigger.bind(s, "gopInfo")), i.videoSegmentStream.on("segmentTimingInfo", s.trigger.bind(s, "videoSegmentTimingInfo")), i.videoSegmentStream.on("baseMediaDecodeTime", function (e) {
                a && i.audioSegmentStream.setVideoBaseMediaDecodeTime(e);
              }), i.videoSegmentStream.on("timingInfo", s.trigger.bind(s, "videoTimingInfo")), i.h264Stream.pipe(i.videoSegmentStream).pipe(i.coalesceStream)), a && !i.audioSegmentStream && (i.coalesceStream.numberOfTracks++, i.audioSegmentStream = new St(a, n), i.audioSegmentStream.on("log", s.getLogTrigger_("audioSegmentStream")), i.audioSegmentStream.on("timingInfo", s.trigger.bind(s, "audioTimingInfo")), i.audioSegmentStream.on("segmentTimingInfo", s.trigger.bind(s, "audioSegmentTimingInfo")), i.adtsStream.pipe(i.audioSegmentStream).pipe(i.coalesceStream)), s.trigger("trackinfo", {
                hasAudio: !!a,
                hasVideo: !!r
              });
            }
          }), i.coalesceStream.on("data", this.trigger.bind(this, "data")), i.coalesceStream.on("id3Frame", function (e) {
            e.dispatchType = i.metadataStream.dispatchType, s.trigger("id3Frame", e);
          }), i.coalesceStream.on("caption", this.trigger.bind(this, "caption")), i.coalesceStream.on("done", this.trigger.bind(this, "done"));
        }, this.setBaseMediaDecodeTime = function (e) {
          var t = this.transmuxPipeline_;
          n.keepOriginalTimestamps || (this.baseMediaDecodeTime = e), a && (a.timelineStartInfo.dts = void 0, a.timelineStartInfo.pts = void 0, ye(a), t.audioTimestampRolloverStream && t.audioTimestampRolloverStream.discontinuity()), r && (t.videoSegmentStream && (t.videoSegmentStream.gopCache_ = []), r.timelineStartInfo.dts = void 0, r.timelineStartInfo.pts = void 0, ye(r), t.captionStream.reset()), t.timestampRolloverStream && t.timestampRolloverStream.discontinuity();
        }, this.setAudioAppendStart = function (e) {
          a && this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(e);
        }, this.setRemux = function (e) {
          var t = this.transmuxPipeline_;
          n.remux = e, t && t.coalesceStream && t.coalesceStream.setRemux(e);
        }, this.alignGopsWith = function (e) {
          r && this.transmuxPipeline_.videoSegmentStream && this.transmuxPipeline_.videoSegmentStream.alignGopsWith(e);
        }, this.getLogTrigger_ = function (t) {
          var i = this;
          return function (e) {
            e.stream = t, i.trigger("log", e);
          };
        }, this.push = function (e) {
          if (o) {
            var t = bt(e);
            if (t && "aac" !== this.transmuxPipeline_.type ? this.setupAacPipeline() : t || "ts" === this.transmuxPipeline_.type || this.setupTsPipeline(), this.transmuxPipeline_) for (var i = Object.keys(this.transmuxPipeline_), n = 0; n < i.length; n++) {
              var r = i[n];
              "headOfPipeline" !== r && this.transmuxPipeline_[r].on && this.transmuxPipeline_[r].on("log", this.getLogTrigger_(r));
            }
            o = !1;
          }

          this.transmuxPipeline_.headOfPipeline.push(e);
        }, this.flush = function () {
          o = !0, this.transmuxPipeline_.headOfPipeline.flush();
        }, this.endTimeline = function () {
          this.transmuxPipeline_.headOfPipeline.endTimeline();
        }, this.reset = function () {
          this.transmuxPipeline_.headOfPipeline && this.transmuxPipeline_.headOfPipeline.reset();
        }, this.resetCaptions = function () {
          this.transmuxPipeline_.captionStream && this.transmuxPipeline_.captionStream.reset();
        };
      }).prototype = new j();

      function Et(e, c) {
        var i = Lt(e, ["moof", "traf"]),
            e = Lt(e, ["mdat"]),
            d = {},
            n = [];
        return e.forEach(function (e, t) {
          t = i[t];
          n.push({
            mdat: e,
            traf: t
          });
        }), n.forEach(function (e) {
          var t,
              i,
              n,
              r,
              a,
              s = e.mdat,
              o = e.traf,
              u = Lt(o, ["tfhd"]),
              l = Nt(u[0]),
              e = l.trackId,
              u = Lt(o, ["tfdt"]),
              u = 0 < u.length ? Ot(u[0]).baseMediaDecodeTime : 0,
              o = Lt(o, ["trun"]);
          c === e && 0 < o.length && (o = o, t = u, i = (l = l).defaultSampleDuration || 0, n = l.defaultSampleSize || 0, r = l.trackId, a = [], o.forEach(function (e) {
            e = Mt(e).samples;
            e.forEach(function (e) {
              void 0 === e.duration && (e.duration = i), void 0 === e.size && (e.size = n), e.trackId = r, e.dts = t, void 0 === e.compositionTimeOffset && (e.compositionTimeOffset = 0), e.pts = t + e.compositionTimeOffset, t += e.duration;
            }), a = a.concat(e);
          }), s = function (e, t, i) {
            for (var n, r, a = new DataView(e.buffer, e.byteOffset, e.byteLength), s = {
              logs: [],
              seiNals: []
            }, o = 0; o + 4 < e.length; o += n) if (n = a.getUint32(o), o += 4, !(n <= 0)) switch (31 & e[o]) {
              case 6:
                var u = e.subarray(o + 1, o + 1 + n),
                    l = function (e, t) {
                  for (var i = e, n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (i < r.size) return r;
                    i -= r.size;
                  }

                  return null;
                }(o, t),
                    u = {
                  nalUnitType: "sei_rbsp",
                  size: n,
                  data: u,
                  escapedRBSP: Ut(u),
                  trackId: i
                };

                if (l) u.pts = l.pts, u.dts = l.dts, r = l;else {
                  if (!r) {
                    s.logs.push({
                      level: "warn",
                      message: "We've encountered a nal unit without data at " + o + " for trackId " + i + ". See mux.js#223."
                    });
                    break;
                  }

                  u.pts = r.pts, u.dts = r.dts;
                }
                s.seiNals.push(u);
            }

            return s;
          }(s, a, e), d[e] || (d[e] = {
            seiNals: [],
            logs: []
          }), d[e].seiNals = d[e].seiNals.concat(s.seiNals), d[e].logs = d[e].logs.concat(s.logs));
        }), d;
      }

      function kt(e) {
        var t = 31 & e[1];
        return t <<= 8, t |= e[2];
      }

      function Ct(e) {
        return !!(64 & e[1]);
      }

      function wt(e) {
        var t = 0;
        return 1 < (48 & e[3]) >>> 4 && (t += e[4] + 1), t;
      }

      function It(e) {
        switch (e) {
          case 5:
            return "slice_layer_without_partitioning_rbsp_idr";

          case 6:
            return "sei_rbsp";

          case 7:
            return "seq_parameter_set_rbsp";

          case 8:
            return "pic_parameter_set_rbsp";

          case 9:
            return "access_unit_delimiter_rbsp";

          default:
            return null;
        }
      }

      var xt = {
        Transmuxer: ft,
        VideoSegmentStream: pt,
        AudioSegmentStream: St,
        AUDIO_PROPERTIES: yt,
        VIDEO_PROPERTIES: vt,
        generateSegmentTimingInfo: ht
      },
          e = function (e) {
        return e >>> 0;
      },
          At = function (e) {
        var t = "";
        return t += String.fromCharCode(e[0]), t += String.fromCharCode(e[1]), t += String.fromCharCode(e[2]), t += String.fromCharCode(e[3]);
      },
          Pt = e,
          Lt = function e(t, i) {
        var n,
            r,
            a,
            s = [];
        if (!i.length) return null;

        for (n = 0; n < t.byteLength;) r = Pt(t[n] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3]), a = At(t.subarray(n + 4, n + 8)), r = 1 < r ? n + r : t.byteLength, a === i[0] && (1 === i.length ? s.push(t.subarray(n + 8, r)) : (a = e(t.subarray(n + 8, r), i.slice(1))).length && (s = s.concat(a))), n = r;

        return s;
      },
          Dt = e,
          Ot = function (e) {
        var t = {
          version: e[0],
          flags: new Uint8Array(e.subarray(1, 4)),
          baseMediaDecodeTime: Dt(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7])
        };
        return 1 === t.version && (t.baseMediaDecodeTime *= Math.pow(2, 32), t.baseMediaDecodeTime += Dt(e[8] << 24 | e[9] << 16 | e[10] << 8 | e[11])), t;
      },
          Rt = function (e) {
        return {
          isLeading: (12 & e[0]) >>> 2,
          dependsOn: 3 & e[0],
          isDependedOn: (192 & e[1]) >>> 6,
          hasRedundancy: (48 & e[1]) >>> 4,
          paddingValue: (14 & e[1]) >>> 1,
          isNonSyncSample: 1 & e[1],
          degradationPriority: e[2] << 8 | e[3]
        };
      },
          Mt = function (e) {
        var t,
            i = {
          version: e[0],
          flags: new Uint8Array(e.subarray(1, 4)),
          samples: []
        },
            n = new DataView(e.buffer, e.byteOffset, e.byteLength),
            r = 1 & i.flags[2],
            a = 4 & i.flags[2],
            s = 1 & i.flags[1],
            o = 2 & i.flags[1],
            u = 4 & i.flags[1],
            l = 8 & i.flags[1],
            c = n.getUint32(4),
            d = 8;

        for (r && (i.dataOffset = n.getInt32(d), d += 4), a && c && (t = {
          flags: Rt(e.subarray(d, d + 4))
        }, d += 4, s && (t.duration = n.getUint32(d), d += 4), o && (t.size = n.getUint32(d), d += 4), l && (1 === i.version ? t.compositionTimeOffset = n.getInt32(d) : t.compositionTimeOffset = n.getUint32(d), d += 4), i.samples.push(t), c--); c--;) t = {}, s && (t.duration = n.getUint32(d), d += 4), o && (t.size = n.getUint32(d), d += 4), u && (t.flags = Rt(e.subarray(d, d + 4)), d += 4), l && (1 === i.version ? t.compositionTimeOffset = n.getInt32(d) : t.compositionTimeOffset = n.getUint32(d), d += 4), i.samples.push(t);

        return i;
      },
          Nt = function (e) {
        var t = new DataView(e.buffer, e.byteOffset, e.byteLength),
            i = {
          version: e[0],
          flags: new Uint8Array(e.subarray(1, 4)),
          trackId: t.getUint32(4)
        },
            n = 1 & i.flags[2],
            r = 2 & i.flags[2],
            a = 8 & i.flags[2],
            s = 16 & i.flags[2],
            o = 32 & i.flags[2],
            u = 65536 & i.flags[0],
            l = 131072 & i.flags[0],
            e = 8;
        return n && (e += 4, i.baseDataOffset = t.getUint32(12), e += 4), r && (i.sampleDescriptionIndex = t.getUint32(e), e += 4), a && (i.defaultSampleDuration = t.getUint32(e), e += 4), s && (i.defaultSampleSize = t.getUint32(e), e += 4), o && (i.defaultSampleFlags = t.getUint32(e)), u && (i.durationIsEmpty = !0), !n && l && (i.baseDataOffsetIsMoof = !0), i;
      },
          Ut = Ee,
          Bt = Ue.CaptionStream,
          Ft = function () {
        var t,
            r,
            a,
            s,
            o,
            i,
            n = !1;
        this.isInitialized = function () {
          return n;
        }, this.init = function (e) {
          t = new Bt(), n = !0, i = !!e && e.isPartial, t.on("data", function (e) {
            e.startTime = e.startPts / s, e.endTime = e.endPts / s, o.captions.push(e), o.captionStreams[e.stream] = !0;
          }), t.on("log", function (e) {
            o.logs.push(e);
          });
        }, this.isNewInit = function (e, t) {
          return !(e && 0 === e.length || t && "object" == typeof t && 0 === Object.keys(t).length) && (a !== e[0] || s !== t[a]);
        }, this.parse = function (e, t, i) {
          if (!this.isInitialized()) return null;
          if (!t || !i) return null;
          if (this.isNewInit(t, i)) a = t[0], s = i[a];else if (null === a || !s) return r.push(e), null;

          for (; 0 < r.length;) {
            var n = r.shift();
            this.parse(n, t, i);
          }

          return (e = function (e, t, i) {
            if (null === t) return null;
            t = Et(e, t)[t] || {};
            return {
              seiNals: t.seiNals,
              logs: t.logs,
              timescale: i
            };
          }(e, a, s)) && e.logs && (o.logs = o.logs.concat(e.logs)), null !== e && e.seiNals ? (this.pushNals(e.seiNals), this.flushStream(), o) : o.logs.length ? {
            logs: o.logs,
            captions: [],
            captionStreams: []
          } : null;
        }, this.pushNals = function (e) {
          if (!this.isInitialized() || !e || 0 === e.length) return null;
          e.forEach(function (e) {
            t.push(e);
          });
        }, this.flushStream = function () {
          if (!this.isInitialized()) return null;
          i ? t.partialFlush() : t.flush();
        }, this.clearParsedCaptions = function () {
          o.captions = [], o.captionStreams = {}, o.logs = [];
        }, this.resetCaptionStream = function () {
          if (!this.isInitialized()) return null;
          t.reset();
        }, this.clearAllCaptions = function () {
          this.clearParsedCaptions(), this.resetCaptionStream();
        }, this.reset = function () {
          r = [], s = a = null, o ? this.clearParsedCaptions() : o = {
            captions: [],
            captionStreams: {},
            logs: []
          }, this.resetCaptionStream();
        }, this.reset();
      },
          jt = e,
          Ht = function (e) {
        return ("00" + e.toString(16)).slice(-2);
      },
          qe = function (e) {
        return Lt(e, ["moov", "trak"]).reduce(function (e, t) {
          var i,
              n,
              r = Lt(t, ["tkhd"])[0];
          return r ? (i = r[0], r = jt(r[n = 0 === i ? 12 : 20] << 24 | r[1 + n] << 16 | r[2 + n] << 8 | r[3 + n]), (t = Lt(t, ["mdia", "mdhd"])[0]) ? (i = t[0], e[r] = jt(t[n = 0 === i ? 12 : 20] << 24 | t[1 + n] << 16 | t[2 + n] << 8 | t[3 + n]), e) : null) : null;
        }, {});
      },
          j = function (n, e) {
        var e = Lt(e, ["moof", "traf"]),
            e = [].concat.apply([], e.map(function (i) {
          return Lt(i, ["tfhd"]).map(function (e) {
            var t = jt(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7]),
                e = n[t] || 9e4,
                t = Lt(i, ["tfdt"]).map(function (e) {
              var t = e[0],
                  i = jt(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7]);
              return 1 === t && (i *= Math.pow(2, 32), i += jt(e[8] << 24 | e[9] << 16 | e[10] << 8 | e[11])), i;
            })[0];
            return (t = "number" != typeof t || isNaN(t) ? 1 / 0 : t) / e;
          });
        })),
            e = Math.min.apply(null, e);
        return isFinite(e) ? e : 0;
      },
          Ee = function (e, t) {
        var i,
            n,
            r = Lt(t, ["moof", "traf"]),
            a = 0,
            s = 0;
        return r && r.length && (i = Lt(r[0], ["tfhd"])[0], t = Lt(r[0], ["trun"])[0], r = Lt(r[0], ["tfdt"])[0], i && (n = Nt(i).trackId), r && (a = Ot(r).baseMediaDecodeTime), !t || (t = Mt(t)).samples && t.samples.length && (s = t.samples[0].compositionTimeOffset || 0)), (a + s) / (e[n] || 9e4);
      },
          qt = function (e) {
        var t = 0 === e[0] ? 12 : 20;
        return jt(e[t] << 24 | e[1 + t] << 16 | e[2 + t] << 8 | e[3 + t]);
      },
          e = function (e) {
        var e = Lt(e, ["moov", "trak"]),
            s = [];
        return e.forEach(function (e) {
          var t = {},
              i = Lt(e, ["tkhd"])[0];
          i && (i = (n = new DataView(i.buffer, i.byteOffset, i.byteLength)).getUint8(0), t.id = 0 === i ? n.getUint32(12) : n.getUint32(20));
          var n = Lt(e, ["mdia", "hdlr"])[0];
          n && (a = At(n.subarray(8, 12)), t.type = "vide" === a ? "video" : "soun" === a ? "audio" : a);
          var r,
              a = Lt(e, ["mdia", "minf", "stbl", "stsd"])[0];
          a && (a = a.subarray(8), t.codec = At(a.subarray(4, 8)), (a = Lt(a, [t.codec])[0]) && (/^[a-z]vc[1-9]$/i.test(t.codec) ? (r = a.subarray(78), "avcC" === At(r.subarray(4, 8)) && 11 < r.length ? (t.codec += ".", t.codec += Ht(r[9]), t.codec += Ht(r[10]), t.codec += Ht(r[11])) : t.codec = "avc1.4d400d") : /^mp4[a,v]$/i.test(t.codec) ? (r = a.subarray(28), "esds" === At(r.subarray(4, 8)) && 20 < r.length && 0 !== r[19] ? (t.codec += "." + Ht(r[19]), t.codec += "." + Ht(r[20] >>> 2 & 63).replace(/^0/, "")) : t.codec = "mp4a.40.2") : t.codec = t.codec.toLowerCase()));
          e = Lt(e, ["mdia", "mdhd"])[0];
          e && (t.timescale = qt(e)), s.push(t);
        }), s;
      },
          Vt = j,
          Wt = e,
          zt = Ce,
          Gt = {};

      Gt.ts = {
        parseType: function (e, t) {
          e = kt(e);
          return 0 === e ? "pat" : e === t ? "pmt" : t ? "pes" : null;
        },
        parsePat: function (e) {
          var t = Ct(e),
              i = 4 + wt(e);
          return t && (i += e[i] + 1), (31 & e[i + 10]) << 8 | e[i + 11];
        },
        parsePmt: function (e) {
          var t = {},
              i = Ct(e),
              n = 4 + wt(e);

          if (i && (n += e[n] + 1), 1 & e[n + 5]) {
            for (var r = 3 + ((15 & e[n + 1]) << 8 | e[n + 2]) - 4, a = 12 + ((15 & e[n + 10]) << 8 | e[n + 11]); a < r;) {
              var s = n + a;
              t[(31 & e[s + 1]) << 8 | e[s + 2]] = e[s], a += 5 + ((15 & e[s + 3]) << 8 | e[s + 4]);
            }

            return t;
          }
        },
        parsePayloadUnitStartIndicator: Ct,
        parsePesType: function (e, t) {
          switch (t[kt(e)]) {
            case Be.H264_STREAM_TYPE:
              return "video";

            case Be.ADTS_STREAM_TYPE:
              return "audio";

            case Be.METADATA_STREAM_TYPE:
              return "timed-metadata";

            default:
              return null;
          }
        },
        parsePesTime: function (e) {
          if (!Ct(e)) return null;
          var t = 4 + wt(e);
          if (t >= e.byteLength) return null;
          var i = null,
              n = e[t + 7];
          return 192 & n && ((i = {}).pts = (14 & e[t + 9]) << 27 | (255 & e[t + 10]) << 20 | (254 & e[t + 11]) << 12 | (255 & e[t + 12]) << 5 | (254 & e[t + 13]) >>> 3, i.pts *= 4, i.pts += (6 & e[t + 13]) >>> 1, i.dts = i.pts, 64 & n && (i.dts = (14 & e[t + 14]) << 27 | (255 & e[t + 15]) << 20 | (254 & e[t + 16]) << 12 | (255 & e[t + 17]) << 5 | (254 & e[t + 18]) >>> 3, i.dts *= 4, i.dts += (6 & e[t + 18]) >>> 1)), i;
        },
        videoPacketContainsKeyFrame: function (e) {
          for (var t = 4 + wt(e), i = e.subarray(t), n = 0, r = 0, a = !1; r < i.byteLength - 3; r++) if (1 === i[r + 2]) {
            n = r + 5;
            break;
          }

          for (; n < i.byteLength;) switch (i[n]) {
            case 0:
              if (0 !== i[n - 1]) {
                n += 2;
                break;
              }

              if (0 !== i[n - 2]) {
                n++;
                break;
              }

              for (r + 3 !== n - 2 && "slice_layer_without_partitioning_rbsp_idr" === It(31 & i[r + 3]) && (a = !0); 1 !== i[++n] && n < i.length;);

              r = n - 2, n += 3;
              break;

            case 1:
              if (0 !== i[n - 1] || 0 !== i[n - 2]) {
                n += 3;
                break;
              }

              "slice_layer_without_partitioning_rbsp_idr" === It(31 & i[r + 3]) && (a = !0), r = n - 2, n += 3;
              break;

            default:
              n += 3;
          }

          return i = i.subarray(r), n -= r, r = 0, a = i && 3 < i.byteLength && "slice_layer_without_partitioning_rbsp_idr" === It(31 & i[r + 3]) ? !0 : a;
        }
      }, Gt.aac = lt;

      function Xt(e, t, i) {
        for (var n, r, a, s, o = 0, u = 188, l = !1; u <= e.byteLength;) if (71 !== e[o] || 71 !== e[u] && u !== e.byteLength) o++, u++;else {
          if (n = e.subarray(o, u), "pes" === Gt.ts.parseType(n, t.pid) && (r = Gt.ts.parsePesType(n, t.table), a = Gt.ts.parsePayloadUnitStartIndicator(n), "audio" === r && a && (s = Gt.ts.parsePesTime(n)) && (s.type = "audio", i.audio.push(s), l = !0)), l) break;
          o += 188, u += 188;
        }

        for (o = (u = e.byteLength) - 188, l = !1; 0 <= o;) if (71 !== e[o] || 71 !== e[u] && u !== e.byteLength) o--, u--;else {
          if (n = e.subarray(o, u), "pes" === Gt.ts.parseType(n, t.pid) && (r = Gt.ts.parsePesType(n, t.table), a = Gt.ts.parsePayloadUnitStartIndicator(n), "audio" === r && a && (s = Gt.ts.parsePesTime(n)) && (s.type = "audio", i.audio.push(s), l = !0)), l) break;
          o -= 188, u -= 188;
        }
      }

      function Kt(e) {
        var t,
            i = {
          pid: null,
          table: null
        },
            n = {};

        for (t in !function (e, t) {
          for (var i, n = 0, r = 188; r < e.byteLength;) if (71 !== e[n] || 71 !== e[r]) n++, r++;else {
            switch (i = e.subarray(n, r), Gt.ts.parseType(i, t.pid)) {
              case "pat":
                t.pid = Gt.ts.parsePat(i);
                break;

              case "pmt":
                var a = Gt.ts.parsePmt(i);
                t.table = t.table || {}, Object.keys(a).forEach(function (e) {
                  t.table[e] = a[e];
                });
            }

            n += 188, r += 188;
          }
        }(e, i), i.table) if (i.table.hasOwnProperty(t)) switch (i.table[t]) {
          case Be.H264_STREAM_TYPE:
            n.video = [], function (e, t, i) {
              for (var n, r, a, s, o, u, l, c, d = 0, h = 188, p = !1, f = {
                data: [],
                size: 0
              }; h < e.byteLength;) if (71 !== e[d] || 71 !== e[h]) d++, h++;else {
                if (n = e.subarray(d, h), "pes" === Gt.ts.parseType(n, t.pid)) if (r = Gt.ts.parsePesType(n, t.table), a = Gt.ts.parsePayloadUnitStartIndicator(n), "video" === r && (a && !p && (s = Gt.ts.parsePesTime(n)) && (s.type = "video", i.video.push(s), p = !0), !i.firstKeyFrame)) {
                  if (a && 0 !== f.size) {
                    for (o = new Uint8Array(f.size), u = 0; f.data.length;) l = f.data.shift(), o.set(l, u), u += l.byteLength;

                    !Gt.ts.videoPacketContainsKeyFrame(o) || (c = Gt.ts.parsePesTime(o)) && (i.firstKeyFrame = c, i.firstKeyFrame.type = "video"), f.size = 0;
                  }

                  f.data.push(n), f.size += n.byteLength;
                }
                if (p && i.firstKeyFrame) break;
                d += 188, h += 188;
              }

              for (d = (h = e.byteLength) - 188, p = !1; 0 <= d;) if (71 !== e[d] || 71 !== e[h]) d--, h--;else {
                if (n = e.subarray(d, h), "pes" === Gt.ts.parseType(n, t.pid) && (r = Gt.ts.parsePesType(n, t.table), a = Gt.ts.parsePayloadUnitStartIndicator(n), "video" === r && a && (s = Gt.ts.parsePesTime(n)) && (s.type = "video", i.video.push(s), p = !0)), p) break;
                d -= 188, h -= 188;
              }
            }(e, i, n), 0 === n.video.length && delete n.video;
            break;

          case Be.ADTS_STREAM_TYPE:
            n.audio = [], Xt(e, i, n), 0 === n.audio.length && delete n.audio;
        }

        return n;
      }

      var Yt = se,
          Qt = function (e, t) {
        var i,
            n,
            r = (Gt.aac.isLikelyAacData(e) ? function (e) {
          for (var t, i = !1, n = 0, r = null, a = null, s = 0, o = 0; 3 <= e.length - o;) {
            switch (Gt.aac.parseType(e, o)) {
              case "timed-metadata":
                if (e.length - o < 10) {
                  i = !0;
                  break;
                }

                if ((s = Gt.aac.parseId3TagSize(e, o)) > e.length) {
                  i = !0;
                  break;
                }

                null === a && (t = e.subarray(o, o + s), a = Gt.aac.parseAacTimestamp(t)), o += s;
                break;

              case "audio":
                if (e.length - o < 7) {
                  i = !0;
                  break;
                }

                if ((s = Gt.aac.parseAdtsSize(e, o)) > e.length) {
                  i = !0;
                  break;
                }

                null === r && (t = e.subarray(o, o + s), r = Gt.aac.parseSampleRate(t)), n++, o += s;
                break;

              default:
                o++;
            }

            if (i) return null;
          }

          if (null === r || null === a) return null;
          var u = Yt / r;
          return {
            audio: [{
              type: "audio",
              dts: a,
              pts: a
            }, {
              type: "audio",
              dts: a + 1024 * n * u,
              pts: a + 1024 * n * u
            }]
          };
        } : Kt)(e);
        return r && (r.audio || r.video) ? (e = t, (t = r).audio && t.audio.length && ("undefined" != typeof (i = e) && !isNaN(i) || (i = t.audio[0].dts), t.audio.forEach(function (e) {
          e.dts = zt(e.dts, i), e.pts = zt(e.pts, i), e.dtsTime = e.dts / Yt, e.ptsTime = e.pts / Yt;
        })), t.video && t.video.length && ("undefined" != typeof (n = e) && !isNaN(n) || (n = t.video[0].dts), t.video.forEach(function (e) {
          e.dts = zt(e.dts, n), e.pts = zt(e.pts, n), e.dtsTime = e.dts / Yt, e.ptsTime = e.pts / Yt;
        }), t.firstKeyFrame && ((t = t.firstKeyFrame).dts = zt(t.dts, n), t.pts = zt(t.pts, n), t.dtsTime = t.dts / Yt, t.ptsTime = t.pts / Yt)), r) : null;
      },
          $t = function () {
        function e(e, t) {
          this.options = t || {}, this.self = e, this.init();
        }

        var t = e.prototype;
        return t.init = function () {
          var i, e;
          this.transmuxer && this.transmuxer.dispose(), this.transmuxer = new xt.Transmuxer(this.options), i = this.self, (e = this.transmuxer).on("data", function (e) {
            var t = e.initSegment;
            e.initSegment = {
              data: t.buffer,
              byteOffset: t.byteOffset,
              byteLength: t.byteLength
            };
            t = e.data;
            e.data = t.buffer, i.postMessage({
              action: "data",
              segment: e,
              byteOffset: t.byteOffset,
              byteLength: t.byteLength
            }, [e.data]);
          }), e.on("done", function (e) {
            i.postMessage({
              action: "done"
            });
          }), e.on("gopInfo", function (e) {
            i.postMessage({
              action: "gopInfo",
              gopInfo: e
            });
          }), e.on("videoSegmentTimingInfo", function (e) {
            var t = {
              start: {
                decode: ue(e.start.dts),
                presentation: ue(e.start.pts)
              },
              end: {
                decode: ue(e.end.dts),
                presentation: ue(e.end.pts)
              },
              baseMediaDecodeTime: ue(e.baseMediaDecodeTime)
            };
            e.prependedContentDuration && (t.prependedContentDuration = ue(e.prependedContentDuration)), i.postMessage({
              action: "videoSegmentTimingInfo",
              videoSegmentTimingInfo: t
            });
          }), e.on("audioSegmentTimingInfo", function (e) {
            var t = {
              start: {
                decode: ue(e.start.dts),
                presentation: ue(e.start.pts)
              },
              end: {
                decode: ue(e.end.dts),
                presentation: ue(e.end.pts)
              },
              baseMediaDecodeTime: ue(e.baseMediaDecodeTime)
            };
            e.prependedContentDuration && (t.prependedContentDuration = ue(e.prependedContentDuration)), i.postMessage({
              action: "audioSegmentTimingInfo",
              audioSegmentTimingInfo: t
            });
          }), e.on("id3Frame", function (e) {
            i.postMessage({
              action: "id3Frame",
              id3Frame: e
            });
          }), e.on("caption", function (e) {
            i.postMessage({
              action: "caption",
              caption: e
            });
          }), e.on("trackinfo", function (e) {
            i.postMessage({
              action: "trackinfo",
              trackInfo: e
            });
          }), e.on("audioTimingInfo", function (e) {
            i.postMessage({
              action: "audioTimingInfo",
              audioTimingInfo: {
                start: ue(e.start),
                end: ue(e.end)
              }
            });
          }), e.on("videoTimingInfo", function (e) {
            i.postMessage({
              action: "videoTimingInfo",
              videoTimingInfo: {
                start: ue(e.start),
                end: ue(e.end)
              }
            });
          }), e.on("log", function (e) {
            i.postMessage({
              action: "log",
              log: e
            });
          });
        }, t.pushMp4Captions = function (e) {
          this.captionParser || (this.captionParser = new Ft(), this.captionParser.init());
          var t = new Uint8Array(e.data, e.byteOffset, e.byteLength),
              e = this.captionParser.parse(t, e.trackIds, e.timescales);
          this.self.postMessage({
            action: "mp4Captions",
            captions: e && e.captions || [],
            logs: e && e.logs || [],
            data: t.buffer
          }, [t.buffer]);
        }, t.probeMp4StartTime = function (e) {
          var t = e.timescales,
              e = e.data,
              t = Vt(t, e);
          this.self.postMessage({
            action: "probeMp4StartTime",
            startTime: t,
            data: e
          }, [e.buffer]);
        }, t.probeMp4Tracks = function (e) {
          var t = e.data,
              e = Wt(t);
          this.self.postMessage({
            action: "probeMp4Tracks",
            tracks: e,
            data: t
          }, [t.buffer]);
        }, t.probeTs = function (e) {
          var t = e.data,
              i = e.baseStartTime,
              e = "number" != typeof i || isNaN(i) ? void 0 : i * se,
              i = Qt(t, e),
              e = null;
          i && ((e = {
            hasVideo: i.video && 2 === i.video.length || !1,
            hasAudio: i.audio && 2 === i.audio.length || !1
          }).hasVideo && (e.videoStart = i.video[0].ptsTime), e.hasAudio && (e.audioStart = i.audio[0].ptsTime)), this.self.postMessage({
            action: "probeTs",
            result: e,
            data: t
          }, [t.buffer]);
        }, t.clearAllMp4Captions = function () {
          this.captionParser && this.captionParser.clearAllCaptions();
        }, t.clearParsedMp4Captions = function () {
          this.captionParser && this.captionParser.clearParsedCaptions();
        }, t.push = function (e) {
          e = new Uint8Array(e.data, e.byteOffset, e.byteLength);
          this.transmuxer.push(e);
        }, t.reset = function () {
          this.transmuxer.reset();
        }, t.setTimestampOffset = function (e) {
          e = e.timestampOffset || 0;
          this.transmuxer.setBaseMediaDecodeTime(Math.round(oe(e)));
        }, t.setAudioAppendStart = function (e) {
          this.transmuxer.setAudioAppendStart(Math.ceil(oe(e.appendStart)));
        }, t.setRemux = function (e) {
          this.transmuxer.setRemux(e.remux);
        }, t.flush = function (e) {
          this.transmuxer.flush(), self.postMessage({
            action: "done",
            type: "transmuxed"
          });
        }, t.endTimeline = function () {
          this.transmuxer.endTimeline(), self.postMessage({
            action: "endedtimeline",
            type: "transmuxed"
          });
        }, t.alignGopsWith = function (e) {
          this.transmuxer.alignGopsWith(e.gopsToAlignWith.slice());
        }, e;
      }();

      self.onmessage = function (e) {
        "init" === e.data.action && e.data.options ? this.messageHandlers = new $t(self, e.data.options) : (this.messageHandlers || (this.messageHandlers = new $t(self)), e.data && e.data.action && "init" !== e.data.action && this.messageHandlers[e.data.action] && this.messageHandlers[e.data.action](e.data));
      };
    }))),
        Ku = function (e) {
      e.currentTransmux = null, e.transmuxQueue.length && (e.currentTransmux = e.transmuxQueue.shift(), "function" == typeof e.currentTransmux ? e.currentTransmux() : eu(e.currentTransmux));
    },
        Yu = function (e) {
      iu("reset", e);
    },
        Qu = function (e) {
      var t = new Xu();
      t.currentTransmux = null, t.transmuxQueue = [];
      var i = t.terminate;
      return t.terminate = function () {
        return t.currentTransmux = null, t.transmuxQueue.length = 0, i.call(t);
      }, t.postMessage({
        action: "init",
        options: e
      }), t;
    },
        $u = 2,
        Ju = -101,
        Zu = -102,
        el = ro("CodecUtils"),
        tl = ro("PlaylistSelector"),
        zt = function () {
      var e = this.useDevicePixelRatio && _.devicePixelRatio || 1;
      return ku(this.playlists.master, this.systemBandwidth, parseInt(Tu(this.tech_.el(), "width"), 10) * e, parseInt(Tu(this.tech_.el(), "height"), 10) * e, this.limitRenditionByPlayerDimensions, this.masterPlaylistController_);
    },
        il = function (n) {
      function e(e, t) {
        var i = n.call(this) || this;
        if (!e) throw new TypeError("Initialization settings are required");
        if ("function" != typeof e.currentTime) throw new TypeError("No currentTime getter specified");
        if (!e.mediaSource) throw new TypeError("No MediaSource specified");
        return i.bandwidth = e.bandwidth, i.throughput = {
          rate: 0,
          count: 0
        }, i.roundTrip = NaN, i.resetStats_(), i.mediaIndex = null, i.partIndex = null, i.hasPlayed_ = e.hasPlayed, i.currentTime_ = e.currentTime, i.seekable_ = e.seekable, i.seeking_ = e.seeking, i.duration_ = e.duration, i.mediaSource_ = e.mediaSource, i.vhs_ = e.vhs, i.loaderType_ = e.loaderType, i.currentMediaInfo_ = void 0, i.startingMediaInfo_ = void 0, i.segmentMetadataTrack_ = e.segmentMetadataTrack, i.goalBufferLength_ = e.goalBufferLength, i.sourceType_ = e.sourceType, i.sourceUpdater_ = e.sourceUpdater, i.inbandTextTracks_ = e.inbandTextTracks, i.state_ = "INIT", i.timelineChangeController_ = e.timelineChangeController, i.shouldSaveSegmentTimingInfo_ = !0, i.parse708captions_ = e.parse708captions, i.checkBufferTimeout_ = null, i.error_ = void 0, i.currentTimeline_ = -1, i.pendingSegment_ = null, i.xhrOptions_ = null, i.pendingSegments_ = [], i.audioDisabled_ = !1, i.isPendingTimestampOffset_ = !1, i.gopBuffer_ = [], i.timeMapping_ = 0, i.safeAppend_ = 11 <= Zn.browser.IE_VERSION, i.appendInitSegment_ = {
          audio: !0,
          video: !0
        }, i.playlistOfLastInitSegment_ = {
          audio: null,
          video: null
        }, i.callQueue_ = [], i.loadQueue_ = [], i.metadataQueue_ = {
          id3: [],
          caption: []
        }, i.waitingOnRemove_ = !1, i.quotaExceededErrorRetryTimeout_ = null, i.activeInitSegmentId_ = null, i.initSegments_ = {}, i.cacheEncryptionKeys_ = e.cacheEncryptionKeys, i.keyCache_ = {}, i.decrypter_ = e.decrypter, i.syncController_ = e.syncController, i.syncPoint_ = {
          segmentIndex: 0,
          time: 0
        }, i.transmuxer_ = i.createTransmuxer_(), i.triggerSyncInfoUpdate_ = function () {
          return i.trigger("syncinfoupdate");
        }, i.syncController_.on("syncinfoupdate", i.triggerSyncInfoUpdate_), i.mediaSource_.addEventListener("sourceopen", function () {
          i.isEndOfStream_() || (i.ended_ = !1);
        }), i.fetchAtBuffer_ = !1, i.logger_ = ro("SegmentLoader[" + i.loaderType_ + "]"), Object.defineProperty(ft(i), "state", {
          get: function () {
            return this.state_;
          },
          set: function (e) {
            e !== this.state_ && (this.logger_(this.state_ + " -> " + e), this.state_ = e, this.trigger("statechange"));
          }
        }), i.sourceUpdater_.on("ready", function () {
          i.hasEnoughInfoToAppend_() && i.processCallQueue_();
        }), "main" === i.loaderType_ && i.timelineChangeController_.on("pendingtimelinechange", function () {
          i.hasEnoughInfoToAppend_() && i.processCallQueue_();
        }), "audio" === i.loaderType_ && i.timelineChangeController_.on("timelinechange", function () {
          i.hasEnoughInfoToLoad_() && i.processLoadQueue_(), i.hasEnoughInfoToAppend_() && i.processCallQueue_();
        }), i;
      }

      mt(e, n);
      var t = e.prototype;
      return t.createTransmuxer_ = function () {
        return Qu({
          remux: !1,
          alignGopsAtEnd: this.safeAppend_,
          keepOriginalTimestamps: !0,
          parse708captions: this.parse708captions_
        });
      }, t.resetStats_ = function () {
        this.mediaBytesTransferred = 0, this.mediaRequests = 0, this.mediaRequestsAborted = 0, this.mediaRequestsTimedout = 0, this.mediaRequestsErrored = 0, this.mediaTransferDuration = 0, this.mediaSecondsLoaded = 0, this.mediaAppends = 0;
      }, t.dispose = function () {
        this.trigger("dispose"), this.state = "DISPOSED", this.pause(), this.abort_(), this.transmuxer_ && this.transmuxer_.terminate(), this.resetStats_(), this.checkBufferTimeout_ && _.clearTimeout(this.checkBufferTimeout_), this.syncController_ && this.triggerSyncInfoUpdate_ && this.syncController_.off("syncinfoupdate", this.triggerSyncInfoUpdate_), this.off();
      }, t.setAudio = function (e) {
        this.audioDisabled_ = !e, e ? this.appendInitSegment_.audio = !0 : this.sourceUpdater_.removeAudio(0, this.duration_());
      }, t.abort = function () {
        "WAITING" === this.state ? (this.abort_(), this.state = "READY", this.paused() || this.monitorBuffer_()) : this.pendingSegment_ && (this.pendingSegment_ = null);
      }, t.abort_ = function () {
        this.pendingSegment_ && this.pendingSegment_.abortRequests && this.pendingSegment_.abortRequests(), this.pendingSegment_ = null, this.callQueue_ = [], this.loadQueue_ = [], this.metadataQueue_.id3 = [], this.metadataQueue_.caption = [], this.timelineChangeController_.clearPendingTimelineChange(this.loaderType_), this.waitingOnRemove_ = !1, _.clearTimeout(this.quotaExceededErrorRetryTimeout_), this.quotaExceededErrorRetryTimeout_ = null;
      }, t.checkForAbort_ = function (e) {
        return "APPENDING" !== this.state || this.pendingSegment_ ? !this.pendingSegment_ || this.pendingSegment_.requestId !== e : (this.state = "READY", !0);
      }, t.error = function (e) {
        return "undefined" != typeof e && (this.logger_("error occurred:", e), this.error_ = e), this.pendingSegment_ = null, this.error_;
      }, t.endOfStream = function () {
        this.ended_ = !0, this.transmuxer_ && Yu(this.transmuxer_), this.gopBuffer_.length = 0, this.pause(), this.trigger("ended");
      }, t.buffered_ = function () {
        var e = this.getMediaInfo_();
        if (!this.sourceUpdater_ || !e) return Zn.createTimeRanges();

        if ("main" === this.loaderType_) {
          var t = e.hasAudio,
              i = e.hasVideo,
              e = e.isMuxed;
          if (i && t && !this.audioDisabled_ && !e) return this.sourceUpdater_.buffered();
          if (i) return this.sourceUpdater_.videoBuffered();
        }

        return this.sourceUpdater_.audioBuffered();
      }, t.initSegmentForMap = function (e, t) {
        if (void 0 === t && (t = !1), !e) return null;
        var i = Wo(e),
            n = this.initSegments_[i];
        return t && !n && e.bytes && (this.initSegments_[i] = n = {
          resolvedUri: e.resolvedUri,
          byterange: e.byterange,
          bytes: e.bytes,
          tracks: e.tracks,
          timescales: e.timescales
        }), n || e;
      }, t.segmentKey = function (e, t) {
        if (void 0 === t && (t = !1), !e) return null;
        var i = zo(e),
            n = this.keyCache_[i];
        this.cacheEncryptionKeys_ && t && !n && e.bytes && (this.keyCache_[i] = n = {
          resolvedUri: e.resolvedUri,
          bytes: e.bytes
        });
        e = {
          resolvedUri: (n || e).resolvedUri
        };
        return n && (e.bytes = n.bytes), e;
      }, t.couldBeginLoading_ = function () {
        return this.playlist_ && !this.paused();
      }, t.load = function () {
        if (this.monitorBuffer_(), this.playlist_) return "INIT" === this.state && this.couldBeginLoading_() ? this.init_() : void (!this.couldBeginLoading_() || "READY" !== this.state && "INIT" !== this.state || (this.state = "READY"));
      }, t.init_ = function () {
        return this.state = "READY", this.resetEverything(), this.monitorBuffer_();
      }, t.playlist = function (e, t) {
        if (void 0 === t && (t = {}), e) {
          var i = this.playlist_,
              n = this.pendingSegment_;
          this.playlist_ = e, this.xhrOptions_ = t, "INIT" === this.state && (e.syncInfo = {
            mediaSequence: e.mediaSequence,
            time: 0
          }, "main" === this.loaderType_ && this.syncController_.setDateTimeMappingForStart(e));
          var r = null;
          if (i && (i.id ? r = i.id : i.uri && (r = i.uri)), this.logger_("playlist update [" + r + " => " + (e.id || e.uri) + "]"), this.trigger("syncinfoupdate"), "INIT" === this.state && this.couldBeginLoading_()) return this.init_();
          if (!i || i.uri !== e.uri) return null !== this.mediaIndex && this.resyncLoader(), this.currentMediaInfo_ = void 0, void this.trigger("playlistupdate");
          t = e.mediaSequence - i.mediaSequence;
          this.logger_("live window shift [" + t + "]"), null !== this.mediaIndex && (this.mediaIndex -= t, this.mediaIndex < 0 ? (this.mediaIndex = null, this.partIndex = null) : (r = this.playlist_.segments[this.mediaIndex], !this.partIndex || r.parts && r.parts.length && r.parts[this.partIndex] || (r = this.mediaIndex, this.logger_("currently processing part (index " + this.partIndex + ") no longer exists."), this.resetLoader(), this.mediaIndex = r))), n && (n.mediaIndex -= t, n.mediaIndex < 0 ? (n.mediaIndex = null, n.partIndex = null) : (0 <= n.mediaIndex && (n.segment = e.segments[n.mediaIndex]), 0 <= n.partIndex && n.segment.parts && (n.part = n.segment.parts[n.partIndex]))), this.syncController_.saveExpiredSegmentInfo(i, e);
        }
      }, t.pause = function () {
        this.checkBufferTimeout_ && (_.clearTimeout(this.checkBufferTimeout_), this.checkBufferTimeout_ = null);
      }, t.paused = function () {
        return null === this.checkBufferTimeout_;
      }, t.resetEverything = function (e) {
        this.ended_ = !1, this.appendInitSegment_ = {
          audio: !0,
          video: !0
        }, this.resetLoader(), this.remove(0, 1 / 0, e), this.transmuxer_ && this.transmuxer_.postMessage({
          action: "clearAllMp4Captions"
        });
      }, t.resetLoader = function () {
        this.fetchAtBuffer_ = !1, this.resyncLoader();
      }, t.resyncLoader = function () {
        this.transmuxer_ && Yu(this.transmuxer_), this.mediaIndex = null, this.partIndex = null, this.syncPoint_ = null, this.isPendingTimestampOffset_ = !1, this.callQueue_ = [], this.loadQueue_ = [], this.metadataQueue_.id3 = [], this.metadataQueue_.caption = [], this.abort(), this.transmuxer_ && this.transmuxer_.postMessage({
          action: "clearParsedMp4Captions"
        });
      }, t.remove = function (e, t, i, n) {
        if (void 0 === i && (i = function () {}), void 0 === n && (n = !1), (t = t === 1 / 0 ? this.duration_() : t) <= e) this.logger_("skipping remove because end ${end} is <= start ${start}");else if (this.sourceUpdater_ && this.getMediaInfo_()) {
          var r,
              a = 1,
              s = function () {
            0 === --a && i();
          };

          for (r in !n && this.audioDisabled_ || (a++, this.sourceUpdater_.removeAudio(e, t, s)), !n && "main" !== this.loaderType_ || (this.gopBuffer_ = function (e, t, i, n) {
            for (var r = Math.ceil((t - n) * Ru), a = Math.ceil((i - n) * Ru), n = e.slice(), s = e.length; s-- && !(e[s].pts <= a););

            if (-1 === s) return n;

            for (var o = s + 1; o-- && !(e[o].pts <= r););

            return o = Math.max(o, 0), n.splice(o, s - o + 1), n;
          }(this.gopBuffer_, e, t, this.timeMapping_), a++, this.sourceUpdater_.removeVideo(e, t, s)), this.inbandTextTracks_) wu(e, t, this.inbandTextTracks_[r]);

          wu(e, t, this.segmentMetadataTrack_), s();
        } else this.logger_("skipping remove because no source updater or starting media info");
      }, t.monitorBuffer_ = function () {
        this.checkBufferTimeout_ && _.clearTimeout(this.checkBufferTimeout_), this.checkBufferTimeout_ = _.setTimeout(this.monitorBufferTick_.bind(this), 1);
      }, t.monitorBufferTick_ = function () {
        "READY" === this.state && this.fillBuffer_(), this.checkBufferTimeout_ && _.clearTimeout(this.checkBufferTimeout_), this.checkBufferTimeout_ = _.setTimeout(this.monitorBufferTick_.bind(this), 500);
      }, t.fillBuffer_ = function () {
        var e;
        this.sourceUpdater_.updating() || (e = this.chooseNextRequest_()) && ("number" == typeof e.timestampOffset && (this.isPendingTimestampOffset_ = !1, this.timelineChangeController_.pendingTimelineChange({
          type: this.loaderType_,
          from: this.currentTimeline_,
          to: e.timeline
        })), this.loadSegment_(e));
      }, t.isEndOfStream_ = function (e, t, i) {
        if (void 0 === e && (e = this.mediaIndex), void 0 === t && (t = this.playlist_), void 0 === i && (i = this.partIndex), !t || !this.mediaSource_) return !1;
        var n = "number" == typeof e && t.segments[e],
            e = e + 1 === t.segments.length,
            n = !n || !n.parts || i + 1 === n.parts.length;
        return t.endList && "open" === this.mediaSource_.readyState && e && n;
      }, t.chooseNextRequest_ = function () {
        var e = co(this.buffered_()) || 0,
            t = Math.max(0, e - this.currentTime_()),
            i = !this.hasPlayed_() && 1 <= t,
            n = t >= this.goalBufferLength_(),
            r = this.playlist_.segments;
        if (!r.length || i || n) return null;
        this.syncPoint_ = this.syncPoint_ || this.syncController_.getSyncPoint(this.playlist_, this.duration_(), this.currentTimeline_, this.currentTime_());
        t = {
          partIndex: null,
          mediaIndex: null,
          startOfSegment: null,
          playlist: this.playlist_,
          isSyncRequest: Boolean(!this.syncPoint_)
        };
        t.isSyncRequest ? t.mediaIndex = function (e, t, i) {
          t = t || [];

          for (var n = [], r = 0, a = 0; a < t.length; a++) {
            var s = t[a];
            if (e === s.timeline && (n.push(a), i < (r += s.duration))) return a;
          }

          return 0 === n.length ? 0 : n[n.length - 1];
        }(this.currentTimeline_, r, e) : null !== this.mediaIndex ? (i = r[this.mediaIndex], n = "number" == typeof this.partIndex ? this.partIndex : -1, t.startOfSegment = i.end || e, i.parts && i.parts[n + 1] ? (t.mediaIndex = this.mediaIndex, t.partIndex = n + 1) : t.mediaIndex = this.mediaIndex + 1) : (e = (s = Bu.getMediaInfoForTime({
          playlist: this.playlist_,
          currentTime: this.fetchAtBuffer_ ? e : this.currentTime_(),
          startingPartIndex: this.syncPoint_.partIndex,
          startingSegmentIndex: this.syncPoint_.segmentIndex,
          startTime: this.syncPoint_.time
        })).segmentIndex, a = s.startTime, s = s.partIndex, t.getMediaInfoForTime = this.fetchAtBuffer_ ? "bufferedEnd" : "currentTime", t.mediaIndex = e, t.startOfSegment = a, t.partIndex = s);
        var a = r[t.mediaIndex],
            s = a && "number" == typeof t.partIndex && a.parts && a.parts[t.partIndex];
        if (!a || "number" == typeof t.partIndex && !s) return null;
        "number" != typeof t.partIndex && a.parts && (t.partIndex = 0);
        a = this.mediaSource_ && "ended" === this.mediaSource_.readyState;
        return t.mediaIndex >= r.length - 1 && a && !this.seeking_() ? null : this.generateSegmentInfo_(t);
      }, t.generateSegmentInfo_ = function (e) {
        var t = e.playlist,
            i = e.mediaIndex,
            n = e.startOfSegment,
            r = e.isSyncRequest,
            a = e.partIndex,
            s = e.forceTimestampOffset,
            o = e.getMediaInfoForTime,
            u = t.segments[i],
            e = "number" == typeof a && u.parts[a],
            o = {
          requestId: "segment-loader-" + Math.random(),
          uri: e && e.resolvedUri || u.resolvedUri,
          mediaIndex: i,
          partIndex: e ? a : null,
          isSyncRequest: r,
          startOfSegment: n,
          playlist: t,
          bytes: null,
          encryptedBytes: null,
          timestampOffset: null,
          timeline: u.timeline,
          duration: e && e.duration || u.duration,
          segment: u,
          part: e,
          byteLength: 0,
          transmuxer: this.transmuxer_,
          getMediaInfoForTime: o
        },
            s = "undefined" != typeof s ? s : this.isPendingTimestampOffset_;
        o.timestampOffset = this.timestampOffsetForSegment_({
          segmentTimeline: u.timeline,
          currentTimeline: this.currentTimeline_,
          startOfSegment: n,
          buffered: this.buffered_(),
          overrideCheck: s
        });
        s = co(this.sourceUpdater_.audioBuffered());
        return "number" == typeof s && (o.audioAppendStart = s - this.sourceUpdater_.audioTimestampOffset()), this.sourceUpdater_.videoBuffered().length && (o.gopsToAlignWith = function (e, t, i) {
          if ("undefined" == typeof t || null === t || !e.length) return [];

          for (var n = Math.ceil((t - i + 3) * Ru), r = 0; r < e.length && !(e[r].pts > n); r++);

          return e.slice(r);
        }(this.gopBuffer_, this.currentTime_() - this.sourceUpdater_.videoTimestampOffset(), this.timeMapping_)), o;
      }, t.timestampOffsetForSegment_ = function (e) {
        return i = (t = e).segmentTimeline, n = t.currentTimeline, r = t.startOfSegment, e = t.buffered, t.overrideCheck || i !== n ? !(i < n) && e.length ? e.end(e.length - 1) : r : null;
        var t, i, n, r;
      }, t.earlyAbortWhenNeeded_ = function (e) {
        var t, i, n, r, a, s, o, u, l, c, d, h, p;
        !this.vhs_.tech_.paused() && this.xhrOptions_.timeout && this.playlist_.attributes.BANDWIDTH && (Date.now() - (e.firstBytesReceivedAt || Date.now()) < 1e3 || (t = this.currentTime_(), r = e.bandwidth, a = this.pendingSegment_.duration, p = Bu.estimateSegmentRequestTime(a, r, this.playlist_, e.bytesReceived), i = this.buffered_(), n = t, void 0 === (e = this.vhs_.tech_.playbackRate()) && (e = 1), p <= (e = ((i.length ? i.end(i.length - 1) : 0) - n) / e - 1) || (r = {
          master: this.vhs_.playlists.master,
          currentTime: t,
          bandwidth: r,
          duration: this.duration_(),
          segmentDuration: a,
          timeUntilRebuffer: e,
          currentTimeline: this.currentTimeline_,
          syncController: this.syncController_
        }, a = r.master, s = r.currentTime, o = r.bandwidth, u = r.duration, l = r.segmentDuration, c = r.timeUntilRebuffer, d = r.currentTimeline, h = r.syncController, a = (r = (a = !(a = (r = a.playlists.filter(function (e) {
          return !Bu.isIncompatible(e);
        })).filter(Bu.isEnabled)).length ? r.filter(function (e) {
          return !Bu.isDisabled(e);
        }) : a).filter(Bu.hasAttribute.bind(null, "BANDWIDTH")).map(function (e) {
          var t = h.getSyncPoint(e, u, d, s) ? 1 : 2;
          return {
            playlist: e,
            rebufferingImpact: Bu.estimateSegmentRequestTime(l, o, e) * t - c
          };
        })).filter(function (e) {
          return e.rebufferingImpact <= 0;
        }), Su(a, function (e, t) {
          return Eu(t.playlist, e.playlist);
        }), (r = a.length ? a[0] : (Su(r, function (e, t) {
          return e.rebufferingImpact - t.rebufferingImpact;
        }), r[0] || null)) && (p = p - e - r.rebufferingImpact, !r.playlist || r.playlist.uri === this.playlist_.uri || p < (e <= Nu ? 1 : .5) || (this.bandwidth = r.playlist.attributes.BANDWIDTH * Gu.BANDWIDTH_VARIANCE + 1, this.trigger("earlyabort"))))));
      }, t.handleAbort_ = function (e) {
        this.logger_("Aborting " + xu(e)), this.mediaRequestsAborted += 1;
      }, t.handleProgress_ = function (e, t) {
        this.earlyAbortWhenNeeded_(t.stats), this.checkForAbort_(t.requestId) || this.trigger("progress");
      }, t.handleTrackInfo_ = function (e, t) {
        this.earlyAbortWhenNeeded_(e.stats), this.checkForAbort_(e.requestId) || this.checkForIllegalMediaSwitch(t) || (function (e, t) {
          if (!e && !t || !e && t || e && !t) return !1;
          if (e === t) return !0;
          var i = Object.keys(e).sort(),
              n = Object.keys(t).sort();
          if (i.length !== n.length) return !1;

          for (var r = 0; r < i.length; r++) {
            var a = i[r];
            if (a !== n[r]) return !1;
            if (e[a] !== t[a]) return !1;
          }

          return !0;
        }(this.currentMediaInfo_, t = t || {}) || (this.appendInitSegment_ = {
          audio: !0,
          video: !0
        }, this.startingMediaInfo_ = t, this.currentMediaInfo_ = t, this.logger_("trackinfo update", t), this.trigger("trackinfo")), this.checkForAbort_(e.requestId) || (this.pendingSegment_.trackInfo = t, this.hasEnoughInfoToAppend_() && this.processCallQueue_()));
      }, t.handleTimingInfo_ = function (e, t, i, n) {
        var r;
        this.earlyAbortWhenNeeded_(e.stats), this.checkForAbort_(e.requestId) || ((r = this.pendingSegment_)[e = Au(t)] = r[e] || {}, r[e][i] = n, this.logger_("timinginfo: " + t + " - " + i + " - " + n), this.hasEnoughInfoToAppend_() && this.processCallQueue_());
      }, t.handleCaptions_ = function (e, t) {
        var g,
            y,
            v = this;
        this.earlyAbortWhenNeeded_(e.stats), this.checkForAbort_(e.requestId) || (0 !== t.length ? this.pendingSegment_.hasAppendedData_ ? (g = null === this.sourceUpdater_.videoTimestampOffset() ? this.sourceUpdater_.audioTimestampOffset() : this.sourceUpdater_.videoTimestampOffset(), y = {}, t.forEach(function (e) {
          y[e.stream] = y[e.stream] || {
            startTime: 1 / 0,
            captions: [],
            endTime: 0
          };
          var t = y[e.stream];
          t.startTime = Math.min(t.startTime, e.startTime + g), t.endTime = Math.max(t.endTime, e.endTime + g), t.captions.push(e);
        }), Object.keys(y).forEach(function (e) {
          var t,
              i,
              n,
              r,
              a,
              s,
              o,
              u,
              l,
              c,
              d = y[e],
              h = d.startTime,
              p = d.endTime,
              f = d.captions,
              m = v.inbandTextTracks_;
          v.logger_("adding cues from " + h + " -> " + p + " for " + e), t = m, i = v.vhs_.tech_, t[n = e] || (i.trigger({
            type: "usage",
            name: "vhs-608"
          }), i.trigger({
            type: "usage",
            name: "hls-608"
          }), /^cc708_/.test(r = n) && (r = "SERVICE" + n.split("_")[1]), (o = i.textTracks().getTrackById(r)) ? t[n] = o : (s = a = n, d = !1, (o = (i.options_.vhs && i.options_.vhs.captionServices || {})[r]) && (a = o.label, s = o.language, d = o.default), t[n] = i.addRemoteTextTrack({
            kind: "captions",
            id: r,
            default: d,
            label: a,
            language: s
          }, !1).track)), wu(h, p, m[e]), l = (f = {
            captionArray: f,
            inbandTextTracks: m,
            timestampOffset: g
          }).inbandTextTracks, m = f.captionArray, c = f.timestampOffset, m && (u = _.WebKitDataCue || _.VTTCue, m.forEach(function (e) {
            var t = e.stream;
            l[t].addCue(new u(e.startTime + c, e.endTime + c, e.text));
          }));
        }), this.transmuxer_ && this.transmuxer_.postMessage({
          action: "clearParsedMp4Captions"
        })) : this.metadataQueue_.caption.push(this.handleCaptions_.bind(this, e, t)) : this.logger_("SegmentLoader received no captions from a caption event"));
      }, t.handleId3_ = function (e, t, i) {
        var n, r, a, s;
        this.earlyAbortWhenNeeded_(e.stats), this.checkForAbort_(e.requestId) || (this.pendingSegment_.hasAppendedData_ ? (n = null === this.sourceUpdater_.videoTimestampOffset() ? this.sourceUpdater_.audioTimestampOffset() : this.sourceUpdater_.videoTimestampOffset(), r = this.inbandTextTracks_, a = i, s = this.vhs_.tech_, r.metadataTrack_ || (r.metadataTrack_ = s.addRemoteTextTrack({
          kind: "metadata",
          label: "Timed Metadata"
        }, !1).track, r.metadataTrack_.inBandMetadataTrackDispatchType = a), Cu({
          inbandTextTracks: this.inbandTextTracks_,
          metadataArray: t,
          timestampOffset: n,
          videoDuration: this.duration_()
        })) : this.metadataQueue_.id3.push(this.handleId3_.bind(this, e, t, i)));
      }, t.processMetadataQueue_ = function () {
        this.metadataQueue_.id3.forEach(function (e) {
          return e();
        }), this.metadataQueue_.caption.forEach(function (e) {
          return e();
        }), this.metadataQueue_.id3 = [], this.metadataQueue_.caption = [];
      }, t.processCallQueue_ = function () {
        var e = this.callQueue_;
        this.callQueue_ = [], e.forEach(function (e) {
          return e();
        });
      }, t.processLoadQueue_ = function () {
        var e = this.loadQueue_;
        this.loadQueue_ = [], e.forEach(function (e) {
          return e();
        });
      }, t.hasEnoughInfoToLoad_ = function () {
        if ("audio" !== this.loaderType_) return !0;
        var e = this.pendingSegment_;
        return !!e && (!this.getCurrentMediaInfo_() || !Pu({
          timelineChangeController: this.timelineChangeController_,
          currentTimeline: this.currentTimeline_,
          segmentTimeline: e.timeline,
          loaderType: this.loaderType_,
          audioDisabled: this.audioDisabled_
        }));
      }, t.getCurrentMediaInfo_ = function (e) {
        return (e = void 0 === e ? this.pendingSegment_ : e) && e.trackInfo || this.currentMediaInfo_;
      }, t.getMediaInfo_ = function (e) {
        return void 0 === e && (e = this.pendingSegment_), this.getCurrentMediaInfo_(e) || this.startingMediaInfo_;
      }, t.hasEnoughInfoToAppend_ = function () {
        if (!this.sourceUpdater_.ready()) return !1;
        if (this.waitingOnRemove_ || this.quotaExceededErrorRetryTimeout_) return !1;
        var e = this.pendingSegment_,
            t = this.getCurrentMediaInfo_();
        if (!e || !t) return !1;
        var i = t.hasAudio,
            n = t.hasVideo,
            t = t.isMuxed;
        return !(n && !e.videoTimingInfo) && !(i && !this.audioDisabled_ && !t && !e.audioTimingInfo) && !Pu({
          timelineChangeController: this.timelineChangeController_,
          currentTimeline: this.currentTimeline_,
          segmentTimeline: e.timeline,
          loaderType: this.loaderType_,
          audioDisabled: this.audioDisabled_
        });
      }, t.handleData_ = function (e, t) {
        if (this.earlyAbortWhenNeeded_(e.stats), !this.checkForAbort_(e.requestId)) if (!this.callQueue_.length && this.hasEnoughInfoToAppend_()) {
          var i,
              n = this.pendingSegment_;

          if (this.setTimeMapping_(n.timeline), this.updateMediaSecondsLoaded_(n.segment), "closed" !== this.mediaSource_.readyState) {
            if (e.map && (e.map = this.initSegmentForMap(e.map, !0), n.segment.map = e.map), e.key && this.segmentKey(e.key, !0), n.isFmp4 = e.isFmp4, n.timingInfo = n.timingInfo || {}, n.isFmp4 ? (this.trigger("fmp4"), n.timingInfo.start = n[Au(t.type)].start) : (i = this.getCurrentMediaInfo_(), (i = "main" === this.loaderType_ && i && i.hasVideo) && (r = n.videoTimingInfo.start), n.timingInfo.start = this.trueSegmentStart_({
              currentStart: n.timingInfo.start,
              playlist: n.playlist,
              mediaIndex: n.mediaIndex,
              currentVideoTimestampOffset: this.sourceUpdater_.videoTimestampOffset(),
              useVideoTimingInfo: i,
              firstVideoFrameTimeForData: r,
              videoTimingInfo: n.videoTimingInfo,
              audioTimingInfo: n.audioTimingInfo
            })), this.updateAppendInitSegmentStatus(n, t.type), this.updateSourceBufferTimestampOffset_(n), n.isSyncRequest) {
              this.updateTimingInfoEnd_(n), this.syncController_.saveSegmentTimingInfo({
                segmentInfo: n,
                shouldSaveTimelineMapping: "main" === this.loaderType_
              });
              var r = this.chooseNextRequest_();
              if (r.mediaIndex !== n.mediaIndex || r.partIndex !== n.partIndex) return void this.logger_("sync segment was incorrect, not appending");
              this.logger_("sync segment was correct, appending");
            }

            n.hasAppendedData_ = !0, this.processMetadataQueue_(), this.appendData_(n, t);
          }
        } else this.callQueue_.push(this.handleData_.bind(this, e, t));
      }, t.updateAppendInitSegmentStatus = function (e, t) {
        "main" !== this.loaderType_ || "number" != typeof e.timestampOffset || e.changedTimestampOffset || (this.appendInitSegment_ = {
          audio: !0,
          video: !0
        }), this.playlistOfLastInitSegment_[t] !== e.playlist && (this.appendInitSegment_[t] = !0);
      }, t.getInitSegmentAndUpdateState_ = function (e) {
        var t = e.type,
            i = e.initSegment,
            n = e.map,
            r = e.playlist;

        if (n) {
          e = Wo(n);
          if (this.activeInitSegmentId_ === e) return null;
          i = this.initSegmentForMap(n, !0).bytes, this.activeInitSegmentId_ = e;
        }

        return i && this.appendInitSegment_[t] ? (this.playlistOfLastInitSegment_[t] = r, this.appendInitSegment_[t] = !1, this.activeInitSegmentId_ = null, i) : null;
      }, t.handleQuotaExceededError_ = function (e, t) {
        var i = this,
            n = e.segmentInfo,
            r = e.type,
            a = e.bytes,
            s = this.sourceUpdater_.audioBuffered(),
            o = this.sourceUpdater_.videoBuffered();
        1 < s.length && this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the audio buffer: " + lo(s).join(", ")), 1 < o.length && this.logger_("On QUOTA_EXCEEDED_ERR, found gaps in the video buffer: " + lo(o).join(", "));
        var u = s.length ? s.start(0) : 0,
            l = s.length ? s.end(s.length - 1) : 0,
            c = o.length ? o.start(0) : 0,
            e = o.length ? o.end(o.length - 1) : 0;
        if (l - u <= 1 && e - c <= 1) return this.logger_("On QUOTA_EXCEEDED_ERR, single segment too large to append to buffer, triggering an error. Appended byte length: " + a.byteLength + ", audio buffer: " + lo(s).join(", ") + ", video buffer: " + lo(o).join(", ") + ", "), this.error({
          message: "Quota exceeded error with append of a single segment of content",
          excludeUntil: 1 / 0
        }), void this.trigger("error");
        this.waitingOnRemove_ = !0, this.callQueue_.push(this.appendToSourceBuffer_.bind(this, {
          segmentInfo: n,
          type: r,
          bytes: a
        }));
        a = this.currentTime_() - 1;
        this.logger_("On QUOTA_EXCEEDED_ERR, removing audio/video from 0 to " + a), this.remove(0, a, function () {
          i.logger_("On QUOTA_EXCEEDED_ERR, retrying append in 1s"), i.waitingOnRemove_ = !1, i.quotaExceededErrorRetryTimeout_ = _.setTimeout(function () {
            i.logger_("On QUOTA_EXCEEDED_ERR, re-processing call queue"), i.quotaExceededErrorRetryTimeout_ = null, i.processCallQueue_();
          }, 1e3);
        }, !0);
      }, t.handleAppendError_ = function (e, t) {
        var i = e.segmentInfo,
            n = e.type,
            e = e.bytes;
        t && (22 !== t.code ? (this.logger_("Received non QUOTA_EXCEEDED_ERR on append", t), this.error(n + " append of " + e.length + "b failed for segment #" + i.mediaIndex + " in playlist " + i.playlist.id), this.trigger("appenderror")) : this.handleQuotaExceededError_({
          segmentInfo: i,
          type: n,
          bytes: e
        }));
      }, t.appendToSourceBuffer_ = function (e) {
        var t,
            i,
            n = e.segmentInfo,
            r = e.type,
            a = e.initSegment,
            s = e.data,
            o = e.bytes;
        o || (e = [s], s = s.byteLength, a && (e.unshift(a), s += a.byteLength), i = 0, (e = {
          bytes: s,
          segments: e
        }).bytes && (t = new Uint8Array(e.bytes), e.segments.forEach(function (e) {
          t.set(e, i), i += e.byteLength;
        })), o = t), this.sourceUpdater_.appendBuffer({
          segmentInfo: n,
          type: r,
          bytes: o
        }, this.handleAppendError_.bind(this, {
          segmentInfo: n,
          type: r,
          bytes: o
        }));
      }, t.handleSegmentTimingInfo_ = function (e, t, i) {
        this.pendingSegment_ && t === this.pendingSegment_.requestId && ((t = this.pendingSegment_.segment)[e = e + "TimingInfo"] || (t[e] = {}), t[e].transmuxerPrependedSeconds = i.prependedContentDuration || 0, t[e].transmuxedPresentationStart = i.start.presentation, t[e].transmuxedDecodeStart = i.start.decode, t[e].transmuxedPresentationEnd = i.end.presentation, t[e].transmuxedDecodeEnd = i.end.decode, t[e].baseMediaDecodeTime = i.baseMediaDecodeTime);
      }, t.appendData_ = function (e, t) {
        var i = t.type,
            n = t.data;
        n && n.byteLength && ("audio" === i && this.audioDisabled_ || (t = this.getInitSegmentAndUpdateState_({
          type: i,
          initSegment: t.initSegment,
          playlist: e.playlist,
          map: e.isFmp4 ? e.segment.map : null
        }), this.appendToSourceBuffer_({
          segmentInfo: e,
          type: i,
          initSegment: t,
          data: n
        })));
      }, t.loadSegment_ = function (t) {
        var i = this;
        this.state = "WAITING", this.pendingSegment_ = t, this.trimBackBuffer_(t), "number" == typeof t.timestampOffset && this.transmuxer_ && this.transmuxer_.postMessage({
          action: "clearAllMp4Captions"
        }), this.hasEnoughInfoToLoad_() ? this.updateTransmuxerAndRequestSegment_(t) : this.loadQueue_.push(function () {
          var e = g({}, t, {
            forceTimestampOffset: !0
          });
          g(t, i.generateSegmentInfo_(e)), i.isPendingTimestampOffset_ = !1, i.updateTransmuxerAndRequestSegment_(t);
        });
      }, t.updateTransmuxerAndRequestSegment_ = function (n) {
        var r = this;
        this.shouldUpdateTransmuxerTimestampOffset_(n.timestampOffset) && (this.gopBuffer_.length = 0, n.gopsToAlignWith = [], this.timeMapping_ = 0, this.transmuxer_.postMessage({
          action: "reset"
        }), this.transmuxer_.postMessage({
          action: "setTimestampOffset",
          timestampOffset: n.timestampOffset
        }));
        var e = this.createSimplifiedSegmentObj_(n),
            t = this.isEndOfStream_(n.mediaIndex, n.playlist, n.partIndex),
            i = null !== this.mediaIndex,
            a = n.timeline !== this.currentTimeline_ && 0 < n.timeline,
            a = t || i && a;
        this.logger_("Requesting " + xu(n)), e.map && !e.map.bytes && (this.logger_("going to request init segment."), this.appendInitSegment_ = {
          video: !0,
          audio: !0
        }), n.abortRequests = mu({
          xhr: this.vhs_.xhr,
          xhrOptions: this.xhrOptions_,
          decryptionWorker: this.decrypter_,
          segment: e,
          abortFn: this.handleAbort_.bind(this, n),
          progressFn: this.handleProgress_.bind(this),
          trackInfoFn: this.handleTrackInfo_.bind(this),
          timingInfoFn: this.handleTimingInfo_.bind(this),
          videoSegmentTimingInfoFn: this.handleSegmentTimingInfo_.bind(this, "video", n.requestId),
          audioSegmentTimingInfoFn: this.handleSegmentTimingInfo_.bind(this, "audio", n.requestId),
          captionsFn: this.handleCaptions_.bind(this),
          isEndOfTimeline: a,
          endedTimelineFn: function () {
            r.logger_("received endedtimeline callback");
          },
          id3Fn: this.handleId3_.bind(this),
          dataFn: this.handleData_.bind(this),
          doneFn: this.segmentRequestFinished_.bind(this),
          onTransmuxerLog: function (e) {
            var t = e.message,
                i = e.level,
                e = e.stream;
            r.logger_(xu(n) + " logged from transmuxer stream " + e + " as a " + i + ": " + t);
          }
        });
      }, t.trimBackBuffer_ = function (e) {
        var t,
            i,
            n,
            r,
            r = (t = this.seekable_(), i = this.currentTime_(), n = this.playlist_.targetDuration || 10, r = i - Gu.BACK_BUFFER_LENGTH, t.length && (r = Math.max(r, t.start(0))), Math.min(i - n, r));
        0 < r && this.remove(0, r);
      }, t.createSimplifiedSegmentObj_ = function (e) {
        var t = e.segment,
            i = e.part,
            n = {
          resolvedUri: (i || t).resolvedUri,
          byterange: (i || t).byterange,
          requestId: e.requestId,
          transmuxer: e.transmuxer,
          audioAppendStart: e.audioAppendStart,
          gopsToAlignWith: e.gopsToAlignWith,
          part: e.part
        },
            i = e.playlist.segments[e.mediaIndex - 1];
        return i && i.timeline === t.timeline && (i.videoTimingInfo ? n.baseStartTime = i.videoTimingInfo.transmuxedDecodeEnd : i.audioTimingInfo && (n.baseStartTime = i.audioTimingInfo.transmuxedDecodeEnd)), t.key && (e = t.key.iv || new Uint32Array([0, 0, 0, e.mediaIndex + e.playlist.mediaSequence]), n.key = this.segmentKey(t.key), n.key.iv = e), t.map && (n.map = this.initSegmentForMap(t.map)), n;
      }, t.saveTransferStats_ = function (e) {
        this.mediaRequests += 1, e && (this.mediaBytesTransferred += e.bytesReceived, this.mediaTransferDuration += e.roundTripTime);
      }, t.saveBandwidthRelatedStats_ = function (e, t) {
        this.pendingSegment_.byteLength = t.bytesReceived, e < 1 / 60 ? this.logger_("Ignoring segment's bandwidth because its duration of " + e + " is less than the min to record " + 1 / 60) : (this.bandwidth = t.bandwidth, this.roundTrip = t.roundTripTime);
      }, t.handleTimeout_ = function () {
        this.mediaRequestsTimedout += 1, this.bandwidth = 1, this.roundTrip = NaN, this.trigger("bandwidthupdate");
      }, t.segmentRequestFinished_ = function (e, t, i) {
        if (this.callQueue_.length) this.callQueue_.push(this.segmentRequestFinished_.bind(this, e, t, i));else if (this.saveTransferStats_(t.stats), this.pendingSegment_ && t.requestId === this.pendingSegment_.requestId) {
          if (e) return this.pendingSegment_ = null, this.state = "READY", e.code === Zu ? void 0 : (this.pause(), e.code === Ju ? void this.handleTimeout_() : (this.mediaRequestsErrored += 1, this.error(e), void this.trigger("error")));
          e = this.pendingSegment_;
          this.saveBandwidthRelatedStats_(e.duration, t.stats), e.endOfAllRequests = t.endOfAllRequests, i.gopInfo && (this.gopBuffer_ = function (e, t, i) {
            if (!t.length) return e;
            if (i) return t.slice();

            for (var n = t[0].pts, r = 0; r < e.length && !(e[r].pts >= n); r++);

            return e.slice(0, r).concat(t);
          }(this.gopBuffer_, i.gopInfo, this.safeAppend_)), this.state = "APPENDING", this.trigger("appending"), this.waitForAppendsToComplete_(e);
        }
      }, t.setTimeMapping_ = function (e) {
        e = this.syncController_.mappingForTimeline(e);
        null !== e && (this.timeMapping_ = e);
      }, t.updateMediaSecondsLoaded_ = function (e) {
        "number" == typeof e.start && "number" == typeof e.end ? this.mediaSecondsLoaded += e.end - e.start : this.mediaSecondsLoaded += e.duration;
      }, t.shouldUpdateTransmuxerTimestampOffset_ = function (e) {
        return null !== e && ("main" === this.loaderType_ && e !== this.sourceUpdater_.videoTimestampOffset() || !this.audioDisabled_ && e !== this.sourceUpdater_.audioTimestampOffset());
      }, t.trueSegmentStart_ = function (e) {
        var t = e.currentStart,
            i = e.playlist,
            n = e.mediaIndex,
            r = e.firstVideoFrameTimeForData,
            a = e.currentVideoTimestampOffset,
            s = e.useVideoTimingInfo,
            o = e.videoTimingInfo,
            e = e.audioTimingInfo;
        if ("undefined" != typeof t) return t;
        if (!s) return e.start;
        i = i.segments[n - 1];
        return 0 !== n && i && "undefined" != typeof i.start && i.end === r + a ? o.start : r;
      }, t.waitForAppendsToComplete_ = function (e) {
        var t = this.getCurrentMediaInfo_(e);
        if (!t) return this.error({
          message: "No starting media returned, likely due to an unsupported media format.",
          blacklistDuration: 1 / 0
        }), void this.trigger("error");
        var i = t.hasAudio,
            n = t.hasVideo,
            t = t.isMuxed,
            n = "main" === this.loaderType_ && n,
            t = !this.audioDisabled_ && i && !t;
        if (e.waitingOnAppends = 0, !e.hasAppendedData_) return e.timingInfo || "number" != typeof e.timestampOffset || (this.isPendingTimestampOffset_ = !0), e.timingInfo = {
          start: 0
        }, e.waitingOnAppends++, this.isPendingTimestampOffset_ || (this.updateSourceBufferTimestampOffset_(e), this.processMetadataQueue_()), void this.checkAppendsDone_(e);
        n && e.waitingOnAppends++, t && e.waitingOnAppends++, n && this.sourceUpdater_.videoQueueCallback(this.checkAppendsDone_.bind(this, e)), t && this.sourceUpdater_.audioQueueCallback(this.checkAppendsDone_.bind(this, e));
      }, t.checkAppendsDone_ = function (e) {
        this.checkForAbort_(e.requestId) || (e.waitingOnAppends--, 0 === e.waitingOnAppends && this.handleAppendsDone_());
      }, t.checkForIllegalMediaSwitch = function (e) {
        var t,
            i,
            e = (t = this.loaderType_, i = this.getCurrentMediaInfo_(), e = e, "main" === t && i && e ? e.hasAudio || e.hasVideo ? i.hasVideo && !e.hasVideo ? "Only audio found in segment when we expected video. We can't switch to audio only from a stream that had video. To get rid of this message, please add codec information to the manifest." : !i.hasVideo && e.hasVideo ? "Video found in segment when we expected only audio. We can't switch to a stream with video from an audio only stream. To get rid of this message, please add codec information to the manifest." : null : "Neither audio nor video found in segment." : null);
        return !!e && (this.error({
          message: e,
          blacklistDuration: 1 / 0
        }), this.trigger("error"), !0);
      }, t.updateSourceBufferTimestampOffset_ = function (e) {
        var t;
        null === e.timestampOffset || "number" != typeof e.timingInfo.start || e.changedTimestampOffset || "main" !== this.loaderType_ || (t = !1, e.timestampOffset -= e.timingInfo.start, e.changedTimestampOffset = !0, e.timestampOffset !== this.sourceUpdater_.videoTimestampOffset() && (this.sourceUpdater_.videoTimestampOffset(e.timestampOffset), t = !0), e.timestampOffset !== this.sourceUpdater_.audioTimestampOffset() && (this.sourceUpdater_.audioTimestampOffset(e.timestampOffset), t = !0), t && this.trigger("timestampoffset"));
      }, t.updateTimingInfoEnd_ = function (e) {
        e.timingInfo = e.timingInfo || {};
        var t = this.getMediaInfo_(),
            t = "main" === this.loaderType_ && t && t.hasVideo && e.videoTimingInfo ? e.videoTimingInfo : e.audioTimingInfo;
        t && (e.timingInfo.end = "number" == typeof t.end ? t.end : t.start + e.duration);
      }, t.handleAppendsDone_ = function () {
        if (this.pendingSegment_ && this.trigger("appendsdone"), !this.pendingSegment_) return this.state = "READY", void (this.paused() || this.monitorBuffer_());
        var e = this.pendingSegment_;
        this.updateTimingInfoEnd_(e), this.shouldSaveSegmentTimingInfo_ && this.syncController_.saveSegmentTimingInfo({
          segmentInfo: e,
          shouldSaveTimelineMapping: "main" === this.loaderType_
        });
        var t = Du(e, this.sourceType_);
        t && ("warn" === t.severity ? Zn.log.warn(t.message) : this.logger_(t.message)), this.recordThroughput_(e), this.pendingSegment_ = null, this.state = "READY", !e.isSyncRequest || (this.trigger("syncinfoupdate"), e.hasAppendedData_) ? (this.logger_("Appended " + xu(e)), this.addSegmentMetadataCue_(e), this.fetchAtBuffer_ = !0, this.currentTimeline_ !== e.timeline && (this.timelineChangeController_.lastTimelineChange({
          type: this.loaderType_,
          from: this.currentTimeline_,
          to: e.timeline
        }), "main" !== this.loaderType_ || this.audioDisabled_ || this.timelineChangeController_.lastTimelineChange({
          type: "audio",
          from: this.currentTimeline_,
          to: e.timeline
        })), this.currentTimeline_ = e.timeline, this.trigger("syncinfoupdate"), (t = e.segment).end && this.currentTime_() - t.end > 3 * e.playlist.targetDuration ? this.resetEverything() : (null !== this.mediaIndex && this.trigger("bandwidthupdate"), this.trigger("progress"), this.mediaIndex = e.mediaIndex, this.partIndex = e.partIndex, this.isEndOfStream_(e.mediaIndex, e.playlist, e.partIndex) && this.endOfStream(), this.trigger("appended"), e.hasAppendedData_ && this.mediaAppends++, this.paused() || this.monitorBuffer_())) : this.logger_("Throwing away un-appended sync request " + xu(e));
      }, t.recordThroughput_ = function (e) {
        var t, i;
        e.duration < 1 / 60 ? this.logger_("Ignoring segment's throughput because its duration of " + e.duration + " is less than the min to record " + 1 / 60) : (t = this.throughput.rate, i = Date.now() - e.endOfAllRequests + 1, i = Math.floor(e.byteLength / i * 8 * 1e3), this.throughput.rate += (i - t) / ++this.throughput.count);
      }, t.addSegmentMetadataCue_ = function (e) {
        var t, i, n, r;
        this.segmentMetadataTrack_ && (i = (t = e.segment).start, r = t.end, Iu(i) && Iu(r) && (wu(i, r, this.segmentMetadataTrack_), n = _.WebKitDataCue || _.VTTCue, e = {
          custom: t.custom,
          dateTimeObject: t.dateTimeObject,
          dateTimeString: t.dateTimeString,
          bandwidth: e.playlist.attributes.BANDWIDTH,
          resolution: e.playlist.attributes.RESOLUTION,
          codecs: e.playlist.attributes.CODECS,
          byteLength: e.byteLength,
          uri: e.uri,
          timeline: e.timeline,
          playlist: e.playlist.id,
          start: i,
          end: r
        }, (r = new n(i, r, JSON.stringify(e))).value = e, this.segmentMetadataTrack_.addCue(r)));
      }, e;
    }(Zn.EventTarget);

    function nl() {}

    function rl(e) {
      return "string" != typeof e ? e : e.replace(/./, function (e) {
        return e.toUpperCase();
      });
    }

    function al(e, t) {
      var i = t[e + "Buffer"];
      return i && i.updating || t.queuePending[e];
    }

    function sl(e, t) {
      if (0 !== t.queue.length) {
        var i = 0,
            n = t.queue[i];

        if ("mediaSource" !== n.type) {
          if ("mediaSource" !== e && t.ready() && "closed" !== t.mediaSource.readyState && !al(e, t)) {
            if (n.type !== e) {
              if (null === (i = function (e, t) {
                for (var i = 0; i < t.length; i++) {
                  var n = t[i];
                  if ("mediaSource" === n.type) return null;
                  if (n.type === e) return i;
                }

                return null;
              }(e, t.queue))) return;
              n = t.queue[i];
            }

            t.queue.splice(i, 1), (t.queuePending[e] = n).action(e, t), n.doneFn || (t.queuePending[e] = null, sl(e, t));
          }
        } else t.updating() || "closed" === t.mediaSource.readyState || (t.queue.shift(), n.action(t), n.doneFn && n.doneFn(), sl("audio", t), sl("video", t));
      }
    }

    function ol(e, t) {
      var i = t[e + "Buffer"],
          n = rl(e);
      i && (i.removeEventListener("updateend", t["on" + n + "UpdateEnd_"]), i.removeEventListener("error", t["on" + n + "Error_"]), t.codecs[e] = null, t[e + "Buffer"] = null);
    }

    function ul(e, t) {
      return e && t && -1 !== Array.prototype.indexOf.call(e.sourceBuffers, t);
    }

    function ll(e) {
      var t = e.type,
          i = e.sourceUpdater,
          n = e.action,
          r = e.doneFn,
          e = e.name;
      i.queue.push({
        type: t,
        action: n,
        doneFn: r,
        name: e
      }), sl(t, i);
    }

    function cl(i, n) {
      return function (e) {
        var t;
        n.queuePending[i] && (t = n.queuePending[i].doneFn, n.queuePending[i] = null, t && t(n[i + "Error_"])), sl(i, n);
      };
    }

    function dl(e) {
      return decodeURIComponent(escape(String.fromCharCode.apply(null, e)));
    }

    function hl(e, t) {
      e.abort(), e.pause(), t && t.activePlaylistLoader && (t.activePlaylistLoader.pause(), t.activePlaylistLoader = null);
    }

    function pl(e, t) {
      (t.activePlaylistLoader = e).load();
    }

    function fl(e, t) {
      for (var i = 0; i < e.length; i++) {
        if (Co(t, e[i])) return !0;
        if (e[i].playlists && fl(e[i].playlists, t)) return !0;
      }

      return !1;
    }

    function ml(a) {
      ["AUDIO", "SUBTITLES", "CLOSED-CAPTIONS"].forEach(function (e) {
        Fl[e](e, a);
      });
      var e,
          s = a.mediaTypes,
          t = a.masterPlaylistLoader,
          i = a.tech,
          n = a.vhs,
          r = a.segmentLoaders,
          o = r.AUDIO,
          u = r.main;

      function l() {
        s.AUDIO.onTrackChanged(), i.trigger({
          type: "usage",
          name: "vhs-audio-change"
        }), i.trigger({
          type: "usage",
          name: "hls-audio-change"
        });
      }

      for (e in ["AUDIO", "SUBTITLES"].forEach(function (e) {
        var u, l, o, c, t, i, d, h, n, r;
        s[e].activeGroup = (u = e, l = a, function (t) {
          var e = l.masterPlaylistLoader,
              i = l.mediaTypes[u].groups,
              n = e.media();
          if (!n) return null;
          var r = null;
          n.attributes[u] && (r = i[n.attributes[u]]);
          var a = Object.keys(i);
          if (!r) if ("AUDIO" === u && 1 < a.length && Io(l.master)) for (var s = 0; s < a.length; s++) {
            var o = i[a[s]];

            if (fl(o, n)) {
              r = o;
              break;
            }
          } else i.main ? r = i.main : 1 === a.length && (r = i[a[0]]);
          return "undefined" == typeof t ? r : null !== t && r && r.filter(function (e) {
            return e.id === t.id;
          })[0] || null;
        }), s[e].activeTrack = jl[e](e, a), s[e].onGroupChanged = (o = e, c = a, function () {
          var e = c.segmentLoaders,
              t = e[o],
              i = e.main,
              n = c.mediaTypes[o],
              r = n.activeTrack(),
              a = n.getActiveGroup(),
              s = n.activePlaylistLoader,
              e = n.lastGroup_;
          a && e && a.id === e.id || (n.lastGroup_ = a, n.lastTrack_ = r, hl(t, n), a && !a.isMasterPlaylist && (a.playlistLoader ? (t.resyncLoader(), pl(a.playlistLoader, n)) : s && i.resetEverything()));
        }), s[e].onGroupChanging = (t = e, i = a, function () {
          var e = i.segmentLoaders[t];
          i.mediaTypes[t].lastGroup_ = null, e.abort(), e.pause();
        }), s[e].onTrackChanged = (d = e, h = a, function () {
          var e = h.masterPlaylistLoader,
              t = h.segmentLoaders,
              i = t[d],
              n = t.main,
              r = h.mediaTypes[d],
              a = r.activeTrack(),
              s = r.getActiveGroup(),
              o = r.activePlaylistLoader,
              u = r.lastTrack_;

          if ((!u || !a || u.id !== a.id) && (r.lastGroup_ = s, r.lastTrack_ = a, hl(i, r), s)) {
            if (s.isMasterPlaylist) {
              if (!a || !u || a.id === u.id) return;
              var l = h.vhs.masterPlaylistController_,
                  t = l.selectPlaylist();
              return l.media() === t ? void 0 : (r.logger_("track change. Switching master audio from " + u.id + " to " + a.id), e.pause(), n.resetEverything(), void l.fastQualityChange_(t));
            }

            if ("AUDIO" === d) {
              if (!s.playlistLoader) return n.setAudio(!0), void n.resetEverything();
              i.setAudio(!0), n.setAudio(!1);
            }

            o !== s.playlistLoader && (i.track && i.track(a), i.resetEverything()), pl(s.playlistLoader, r);
          }
        }), s[e].getActiveGroup = (n = e, r = a.mediaTypes, function () {
          var e = r[n].activeTrack();
          return e ? r[n].activeGroup(e) : null;
        });
      }), (r = s.AUDIO.activeGroup()) && (r = (r.filter(function (e) {
        return e.default;
      })[0] || r[0]).id, s.AUDIO.tracks[r].enabled = !0, s.AUDIO.onGroupChanged(), s.AUDIO.onTrackChanged(), s.AUDIO.getActiveGroup().playlistLoader ? (u.setAudio(!1), o.setAudio(!0)) : u.setAudio(!0)), t.on("mediachange", function () {
        ["AUDIO", "SUBTITLES"].forEach(function (e) {
          return s[e].onGroupChanged();
        });
      }), t.on("mediachanging", function () {
        ["AUDIO", "SUBTITLES"].forEach(function (e) {
          return s[e].onGroupChanging();
        });
      }), i.audioTracks().addEventListener("change", l), i.remoteTextTracks().addEventListener("change", s.SUBTITLES.onTrackChanged), n.on("dispose", function () {
        i.audioTracks().removeEventListener("change", l), i.remoteTextTracks().removeEventListener("change", s.SUBTITLES.onTrackChanged);
      }), i.clearTracks("audio"), s.AUDIO.tracks) i.audioTracks().addTrack(s.AUDIO.tracks[e]);
    }

    function gl(e, t, i) {
      var n,
          r,
          a,
          s,
          o = e.masterPlaylistController_,
          u = o[(e.options_.smoothQualityChange ? "smooth" : "fast") + "QualityChange_"].bind(o);
      t.attributes && (n = t.attributes.RESOLUTION, this.width = n && n.width, this.height = n && n.height, this.bandwidth = t.attributes.BANDWIDTH), this.codecs = _u(o.master(), t), this.playlist = t, this.id = i, this.enabled = (r = e.playlists, a = t.id, s = u, function (e) {
        var t = r.master.playlists[a],
            i = To(t),
            n = So(t);
        return "undefined" == typeof e ? n : (e ? delete t.disabled : t.disabled = !0, e === n || i || (s(), e ? r.trigger("renditionenabled") : r.trigger("renditiondisabled")), e);
      });
    }

    function yl(t, e) {
      var i = 0,
          n = 0,
          r = Zn.mergeOptions(zl, e);

      function a() {
        n && t.currentTime(n);
      }

      function s(e) {
        null != e && (n = t.duration() !== 1 / 0 && t.currentTime() || 0, t.one("loadedmetadata", a), t.src(e), t.trigger({
          type: "usage",
          name: "vhs-error-reload"
        }), t.trigger({
          type: "usage",
          name: "hls-error-reload"
        }), t.play());
      }

      function o() {
        return Date.now() - i < 1e3 * r.errorInterval ? (t.trigger({
          type: "usage",
          name: "vhs-error-reload-canceled"
        }), void t.trigger({
          type: "usage",
          name: "hls-error-reload-canceled"
        })) : r.getSource && "function" == typeof r.getSource ? (i = Date.now(), r.getSource.call(t, s)) : void Zn.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!");
      }

      function u() {
        t.off("loadedmetadata", a), t.off("error", o), t.off("dispose", u);
      }

      t.ready(function () {
        t.trigger({
          type: "usage",
          name: "vhs-error-reload-initialized"
        }), t.trigger({
          type: "usage",
          name: "hls-error-reload-initialized"
        });
      }), t.on("error", o), t.on("dispose", u), t.reloadSourceOnError = function (e) {
        u(), yl(t, e);
      };
    }

    var vl,
        _l = ["video", "audio"],
        bl = function (n, r, a) {
      return function (t, i) {
        var e = i[t + "Buffer"];

        if (ul(i.mediaSource, e)) {
          i.logger_("Appending segment " + r.mediaIndex + "'s " + n.length + " bytes to " + t + "Buffer");

          try {
            e.appendBuffer(n);
          } catch (e) {
            i.logger_("Error with code " + e.code + " " + (22 === e.code ? "(QUOTA_EXCEEDED_ERR) " : "") + "when appending segment " + r.mediaIndex + " to " + t + "Buffer"), i.queuePending[t] = null, a(e);
          }
        }
      };
    },
        Tl = function (n, r) {
      return function (t, i) {
        var e = i[t + "Buffer"];

        if (ul(i.mediaSource, e)) {
          i.logger_("Removing " + n + " to " + r + " from " + t + "Buffer");

          try {
            e.remove(n, r);
          } catch (e) {
            i.logger_("Remove " + n + " to " + r + " from " + t + "Buffer failed");
          }
        }
      };
    },
        Sl = function (n) {
      return function (e, t) {
        var i = t[e + "Buffer"];
        ul(t.mediaSource, i) && (t.logger_("Setting " + e + "timestampOffset to " + n), i.timestampOffset = n);
      };
    },
        El = function (i) {
      return function (e, t) {
        i();
      };
    },
        kl = function (t) {
      return function (e) {
        if ("open" === e.mediaSource.readyState) {
          e.logger_("Calling mediaSource endOfStream(" + (t || "") + ")");

          try {
            e.mediaSource.endOfStream(t);
          } catch (e) {
            Zn.log.warn("Failed to call media source endOfStream", e);
          }
        }
      };
    },
        Cl = function (t) {
      return function (e) {
        e.logger_("Setting mediaSource duration to " + t);

        try {
          e.mediaSource.duration = t;
        } catch (e) {
          Zn.log.warn("Failed to set media source duration", e);
        }
      };
    },
        wl = function () {
      return function (t, e) {
        if ("open" === e.mediaSource.readyState) {
          var i = e[t + "Buffer"];

          if (ul(e.mediaSource, i)) {
            e.logger_("calling abort on " + t + "Buffer");

            try {
              i.abort();
            } catch (e) {
              Zn.log.warn("Failed to abort on " + t + "Buffer", e);
            }
          }
        }
      };
    },
        Il = function (n, r) {
      return function (e) {
        var t = rl(n),
            i = pr(r);
        e.logger_("Adding " + n + "Buffer with codec " + r + " to mediaSource");
        i = e.mediaSource.addSourceBuffer(i);
        i.addEventListener("updateend", e["on" + t + "UpdateEnd_"]), i.addEventListener("error", e["on" + t + "Error_"]), e.codecs[n] = r, e[n + "Buffer"] = i;
      };
    },
        xl = function (i) {
      return function (e) {
        var t = e[i + "Buffer"];

        if (ol(i, e), ul(e.mediaSource, t)) {
          e.logger_("Removing " + i + "Buffer with codec " + e.codecs[i] + " from mediaSource");

          try {
            e.mediaSource.removeSourceBuffer(t);
          } catch (e) {
            Zn.log.warn("Failed to removeSourceBuffer " + i + "Buffer", e);
          }
        }
      };
    },
        Al = function (r) {
      return function (e, t) {
        var i = t[e + "Buffer"],
            n = pr(r);
        ul(t.mediaSource, i) && t.codecs[e] !== r && (t.logger_("changing " + e + "Buffer codec from " + t.codecs[e] + " to " + r), i.changeType(n), t.codecs[e] = r);
      };
    },
        Pl = function (i) {
      function e(e) {
        var t = i.call(this) || this;
        return t.mediaSource = e, t.sourceopenListener_ = function () {
          return sl("mediaSource", ft(t));
        }, t.mediaSource.addEventListener("sourceopen", t.sourceopenListener_), t.logger_ = ro("SourceUpdater"), t.audioTimestampOffset_ = 0, t.videoTimestampOffset_ = 0, t.queue = [], t.queuePending = {
          audio: null,
          video: null
        }, t.delayedAudioAppendQueue_ = [], t.videoAppendQueued_ = !1, t.codecs = {}, t.onVideoUpdateEnd_ = cl("video", ft(t)), t.onAudioUpdateEnd_ = cl("audio", ft(t)), t.onVideoError_ = function (e) {
          t.videoError_ = e;
        }, t.onAudioError_ = function (e) {
          t.audioError_ = e;
        }, t.createdSourceBuffers_ = !1, t.initializedEme_ = !1, t.triggeredReady_ = !1, t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.initializedEme = function () {
        this.initializedEme_ = !0, this.triggerReady();
      }, t.hasCreatedSourceBuffers = function () {
        return this.createdSourceBuffers_;
      }, t.hasInitializedAnyEme = function () {
        return this.initializedEme_;
      }, t.ready = function () {
        return this.hasCreatedSourceBuffers() && this.hasInitializedAnyEme();
      }, t.createSourceBuffers = function (e) {
        this.hasCreatedSourceBuffers() || (this.addOrChangeSourceBuffers(e), this.createdSourceBuffers_ = !0, this.trigger("createdsourcebuffers"), this.triggerReady());
      }, t.triggerReady = function () {
        this.ready() && !this.triggeredReady_ && (this.triggeredReady_ = !0, this.trigger("ready"));
      }, t.addSourceBuffer = function (e, t) {
        ll({
          type: "mediaSource",
          sourceUpdater: this,
          action: Il(e, t),
          name: "addSourceBuffer"
        });
      }, t.abort = function (e) {
        ll({
          type: e,
          sourceUpdater: this,
          action: wl(e),
          name: "abort"
        });
      }, t.removeSourceBuffer = function (e) {
        this.canRemoveSourceBuffer() ? ll({
          type: "mediaSource",
          sourceUpdater: this,
          action: xl(e),
          name: "removeSourceBuffer"
        }) : Zn.log.error("removeSourceBuffer is not supported!");
      }, t.canRemoveSourceBuffer = function () {
        return !Zn.browser.IE_VERSION && !Zn.browser.IS_FIREFOX && _.MediaSource && _.MediaSource.prototype && "function" == typeof _.MediaSource.prototype.removeSourceBuffer;
      }, e.canChangeType = function () {
        return _.SourceBuffer && _.SourceBuffer.prototype && "function" == typeof _.SourceBuffer.prototype.changeType;
      }, t.canChangeType = function () {
        return this.constructor.canChangeType();
      }, t.changeType = function (e, t) {
        this.canChangeType() ? ll({
          type: e,
          sourceUpdater: this,
          action: Al(t),
          name: "changeType"
        }) : Zn.log.error("changeType is not supported!");
      }, t.addOrChangeSourceBuffers = function (i) {
        var n = this;
        if (!i || "object" != typeof i || 0 === Object.keys(i).length) throw new Error("Cannot addOrChangeSourceBuffers to undefined codecs");
        Object.keys(i).forEach(function (e) {
          var t = i[e];
          if (!n.hasCreatedSourceBuffers()) return n.addSourceBuffer(e, t);
          n.canChangeType() && n.changeType(e, t);
        });
      }, t.appendBuffer = function (e, t) {
        var i = this,
            n = e.segmentInfo,
            r = e.type,
            a = e.bytes;
        if (this.processedAppend_ = !0, "audio" === r && this.videoBuffer && !this.videoAppendQueued_) return this.delayedAudioAppendQueue_.push([e, t]), void this.logger_("delayed audio append of " + a.length + " until video append");
        ll({
          type: r,
          sourceUpdater: this,
          action: bl(a, n || {
            mediaIndex: -1
          }, t),
          doneFn: t,
          name: "appendBuffer"
        }), "video" === r && (this.videoAppendQueued_ = !0, this.delayedAudioAppendQueue_.length && (r = this.delayedAudioAppendQueue_.slice(), this.logger_("queuing delayed audio " + r.length + " appendBuffers"), this.delayedAudioAppendQueue_.length = 0, r.forEach(function (e) {
          i.appendBuffer.apply(i, e);
        })));
      }, t.audioBuffered = function () {
        return ul(this.mediaSource, this.audioBuffer) && this.audioBuffer.buffered || Zn.createTimeRange();
      }, t.videoBuffered = function () {
        return ul(this.mediaSource, this.videoBuffer) && this.videoBuffer.buffered || Zn.createTimeRange();
      }, t.buffered = function () {
        var e = ul(this.mediaSource, this.videoBuffer) ? this.videoBuffer : null,
            t = ul(this.mediaSource, this.audioBuffer) ? this.audioBuffer : null;
        return t && !e ? this.audioBuffered() : e && !t ? this.videoBuffered() : function (e, t) {
          var i = null,
              n = null,
              r = 0,
              a = [],
              s = [];
          if (!(e && e.length && t && t.length)) return Zn.createTimeRange();

          for (var o = e.length; o--;) a.push({
            time: e.start(o),
            type: "start"
          }), a.push({
            time: e.end(o),
            type: "end"
          });

          for (o = t.length; o--;) a.push({
            time: t.start(o),
            type: "start"
          }), a.push({
            time: t.end(o),
            type: "end"
          });

          for (a.sort(function (e, t) {
            return e.time - t.time;
          }), o = 0; o < a.length; o++) "start" === a[o].type ? 2 === ++r && (i = a[o].time) : "end" === a[o].type && 1 === --r && (n = a[o].time), null !== i && null !== n && (s.push([i, n]), n = i = null);

          return Zn.createTimeRanges(s);
        }(this.audioBuffered(), this.videoBuffered());
      }, t.setDuration = function (e, t) {
        void 0 === t && (t = nl), ll({
          type: "mediaSource",
          sourceUpdater: this,
          action: Cl(e),
          name: "duration",
          doneFn: t
        });
      }, t.endOfStream = function (e, t) {
        void 0 === t && (t = nl), ll({
          type: "mediaSource",
          sourceUpdater: this,
          action: kl(e = "string" != typeof (e = void 0 === e ? null : e) ? void 0 : e),
          name: "endOfStream",
          doneFn: t
        });
      }, t.removeAudio = function (e, t, i) {
        void 0 === i && (i = nl), this.audioBuffered().length && 0 !== this.audioBuffered().end(0) ? ll({
          type: "audio",
          sourceUpdater: this,
          action: Tl(e, t),
          doneFn: i,
          name: "remove"
        }) : i();
      }, t.removeVideo = function (e, t, i) {
        void 0 === i && (i = nl), this.videoBuffered().length && 0 !== this.videoBuffered().end(0) ? ll({
          type: "video",
          sourceUpdater: this,
          action: Tl(e, t),
          doneFn: i,
          name: "remove"
        }) : i();
      }, t.updating = function () {
        return !(!al("audio", this) && !al("video", this));
      }, t.audioTimestampOffset = function (e) {
        return "undefined" != typeof e && this.audioBuffer && this.audioTimestampOffset_ !== e && (ll({
          type: "audio",
          sourceUpdater: this,
          action: Sl(e),
          name: "timestampOffset"
        }), this.audioTimestampOffset_ = e), this.audioTimestampOffset_;
      }, t.videoTimestampOffset = function (e) {
        return "undefined" != typeof e && this.videoBuffer && this.videoTimestampOffset !== e && (ll({
          type: "video",
          sourceUpdater: this,
          action: Sl(e),
          name: "timestampOffset"
        }), this.videoTimestampOffset_ = e), this.videoTimestampOffset_;
      }, t.audioQueueCallback = function (e) {
        this.audioBuffer && ll({
          type: "audio",
          sourceUpdater: this,
          action: El(e),
          name: "callback"
        });
      }, t.videoQueueCallback = function (e) {
        this.videoBuffer && ll({
          type: "video",
          sourceUpdater: this,
          action: El(e),
          name: "callback"
        });
      }, t.dispose = function () {
        var t = this;
        this.trigger("dispose"), _l.forEach(function (e) {
          t.abort(e), t.canRemoveSourceBuffer() ? t.removeSourceBuffer(e) : t[e + "QueueCallback"](function () {
            return ol(e, t);
          });
        }), this.videoAppendQueued_ = !1, this.delayedAudioAppendQueue_.length = 0, this.sourceopenListener_ && this.mediaSource.removeEventListener("sourceopen", this.sourceopenListener_), this.off();
      }, e;
    }(Zn.EventTarget),
        Ll = new Uint8Array("\n\n".split("").map(function (e) {
      return e.charCodeAt(0);
    })),
        Dl = function (i) {
      function e(e, t) {
        return (t = i.call(this, e, t = void 0 === t ? {} : t) || this).mediaSource_ = null, t.subtitlesTrack_ = null, t.loaderType_ = "subtitle", t.featuresNativeTextTracks_ = e.featuresNativeTextTracks, t.shouldSaveSegmentTimingInfo_ = !1, t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.createTransmuxer_ = function () {
        return null;
      }, t.buffered_ = function () {
        if (!this.subtitlesTrack_ || !this.subtitlesTrack_.cues || !this.subtitlesTrack_.cues.length) return Zn.createTimeRanges();
        var e = this.subtitlesTrack_.cues,
            t = e[0].startTime,
            e = e[e.length - 1].startTime;
        return Zn.createTimeRanges([[t, e]]);
      }, t.initSegmentForMap = function (e, t) {
        if (void 0 === t && (t = !1), !e) return null;
        var i = Wo(e),
            n = this.initSegments_[i];
        return t && !n && e.bytes && (t = Ll.byteLength + e.bytes.byteLength, (t = new Uint8Array(t)).set(e.bytes), t.set(Ll, e.bytes.byteLength), this.initSegments_[i] = n = {
          resolvedUri: e.resolvedUri,
          byterange: e.byterange,
          bytes: t
        }), n || e;
      }, t.couldBeginLoading_ = function () {
        return this.playlist_ && this.subtitlesTrack_ && !this.paused();
      }, t.init_ = function () {
        return this.state = "READY", this.resetEverything(), this.monitorBuffer_();
      }, t.track = function (e) {
        return "undefined" == typeof e || (this.subtitlesTrack_ = e, "INIT" === this.state && this.couldBeginLoading_() && this.init_()), this.subtitlesTrack_;
      }, t.remove = function (e, t) {
        wu(e, t, this.subtitlesTrack_);
      }, t.fillBuffer_ = function () {
        var e = this,
            t = this.chooseNextRequest_();

        if (t) {
          if (null === this.syncController_.timestampOffsetForTimeline(t.timeline)) return this.syncController_.one("timestampoffset", function () {
            e.state = "READY", e.paused() || e.monitorBuffer_();
          }), void (this.state = "WAITING_ON_TIMELINE");
          this.loadSegment_(t);
        }
      }, t.timestampOffsetForSegment_ = function () {
        return null;
      }, t.chooseNextRequest_ = function () {
        return this.skipEmptySegments_(i.prototype.chooseNextRequest_.call(this));
      }, t.skipEmptySegments_ = function (e) {
        for (; e && e.segment.empty;) {
          if (e.mediaIndex + 1 >= e.playlist.segments.length) {
            e = null;
            break;
          }

          e = this.generateSegmentInfo_({
            playlist: e.playlist,
            mediaIndex: e.mediaIndex + 1,
            startOfSegment: e.startOfSegment + e.duration,
            isSyncRequest: e.isSyncRequest
          });
        }

        return e;
      }, t.stopForError = function (e) {
        this.error(e), this.state = "READY", this.pause(), this.trigger("error");
      }, t.segmentRequestFinished_ = function (e, t, i) {
        var n = this;

        if (this.subtitlesTrack_) {
          if (this.saveTransferStats_(t.stats), !this.pendingSegment_) return this.state = "READY", void (this.mediaRequestsAborted += 1);
          if (e) return e.code === Ju && this.handleTimeout_(), e.code === Zu ? this.mediaRequestsAborted += 1 : this.mediaRequestsErrored += 1, void this.stopForError(e);
          var r = this.pendingSegment_;
          this.saveBandwidthRelatedStats_(r.duration, t.stats), this.state = "APPENDING", this.trigger("appending");
          var a = r.segment;

          if (a.map && (a.map.bytes = t.map.bytes), r.bytes = t.bytes, "function" != typeof _.WebVTT && this.subtitlesTrack_ && this.subtitlesTrack_.tech_) {
            var s = function () {
              n.subtitlesTrack_.tech_.off("vttjsloaded", o), n.stopForError({
                message: "Error loading vtt.js"
              });
            },
                o = function () {
              n.subtitlesTrack_.tech_.off("vttjserror", s), n.segmentRequestFinished_(e, t, i);
            };

            return this.state = "WAITING_ON_VTTJS", this.subtitlesTrack_.tech_.one("vttjsloaded", o), void this.subtitlesTrack_.tech_.one("vttjserror", s);
          }

          a.requested = !0;

          try {
            this.parseVTTCues_(r);
          } catch (e) {
            return void this.stopForError({
              message: e.message
            });
          }

          if (this.updateTimeMapping_(r, this.syncController_.timelines[r.timeline], this.playlist_), r.cues.length ? r.timingInfo = {
            start: r.cues[0].startTime,
            end: r.cues[r.cues.length - 1].endTime
          } : r.timingInfo = {
            start: r.startOfSegment,
            end: r.startOfSegment + r.duration
          }, r.isSyncRequest) return this.trigger("syncinfoupdate"), this.pendingSegment_ = null, void (this.state = "READY");
          r.byteLength = r.bytes.byteLength, this.mediaSecondsLoaded += a.duration, r.cues.forEach(function (e) {
            n.subtitlesTrack_.addCue(n.featuresNativeTextTracks_ ? new _.VTTCue(e.startTime, e.endTime, e.text) : e);
          }), function (t) {
            var e = t.cues;
            if (e) for (var i = 0; i < e.length; i++) {
              for (var n = [], r = 0, a = 0; a < e.length; a++) e[i].startTime === e[a].startTime && e[i].endTime === e[a].endTime && e[i].text === e[a].text && 1 < ++r && n.push(e[a]);

              n.length && n.forEach(function (e) {
                return t.removeCue(e);
              });
            }
          }(this.subtitlesTrack_), this.handleAppendsDone_();
        } else this.state = "READY";
      }, t.handleData_ = function () {}, t.updateTimingInfoEnd_ = function () {}, t.parseVTTCues_ = function (t) {
        var e = !1;
        "function" == typeof _.TextDecoder ? i = new _.TextDecoder("utf8") : (i = _.WebVTT.StringDecoder(), e = !0);
        var i = new _.WebVTT.Parser(_, _.vttjs, i);
        t.cues = [], t.timestampmap = {
          MPEGTS: 0,
          LOCAL: 0
        }, i.oncue = t.cues.push.bind(t.cues), i.ontimestampmap = function (e) {
          t.timestampmap = e;
        }, i.onparsingerror = function (e) {
          Zn.log.warn("Error encountered when parsing cues: " + e.message);
        }, t.segment.map && (n = t.segment.map.bytes, e && (n = dl(n)), i.parse(n));
        var n = t.bytes;
        e && (n = dl(n)), i.parse(n), i.flush();
      }, t.updateTimeMapping_ = function (e, t, i) {
        var n,
            r,
            a = e.segment;
        t && (e.cues.length ? (r = e.timestampmap, n = r.MPEGTS / Ru - r.LOCAL + t.mapping, e.cues.forEach(function (e) {
          e.startTime += n, e.endTime += n;
        }), i.syncInfo || (r = e.cues[0].startTime, t = e.cues[e.cues.length - 1].startTime, i.syncInfo = {
          mediaSequence: i.mediaSequence + e.mediaIndex,
          time: Math.min(r, t - a.duration)
        })) : a.empty = !0);
      }, e;
    }(il),
        Ol = [{
      name: "VOD",
      run: function (e, t, i, n, r) {
        if (i === 1 / 0) return null;
        return {
          time: 0,
          segmentIndex: 0,
          partIndex: null
        };
      }
    }, {
      name: "ProgramDateTime",
      run: function (e, t, i, n, r) {
        if (!Object.keys(e.timelineToDatetimeMappings).length) return null;
        var a = null,
            s = null,
            o = ho(t);
        r = r || 0;

        for (var u = 0; u < o.length; u++) {
          var l = o[t.endList || 0 === r ? u : o.length - (u + 1)],
              c = l.segment,
              d = e.timelineToDatetimeMappings[c.timeline];

          if (d && c.dateTimeObject) {
            var h = c.dateTimeObject.getTime() / 1e3 + d;
            if (c.parts && "number" == typeof l.partIndex) for (var p = 0; p < l.partIndex; p++) h += c.parts[p].duration;
            d = Math.abs(r - h);
            if (null !== s && (0 === d || s < d)) break;
            s = d, a = {
              time: h,
              segmentIndex: l.segmentIndex,
              partIndex: l.partIndex
            };
          }
        }

        return a;
      }
    }, {
      name: "Segment",
      run: function (e, t, i, n, r) {
        var a = null,
            s = null;
        r = r || 0;

        for (var o = ho(t), u = 0; u < o.length; u++) {
          var l = o[t.endList || 0 === r ? u : o.length - (u + 1)],
              c = l.segment,
              d = l.part && l.part.start || c && c.start;

          if (c.timeline === n && "undefined" != typeof d) {
            c = Math.abs(r - d);
            if (null !== s && s < c) break;
            (!a || null === s || c <= s) && (s = c, a = {
              time: d,
              segmentIndex: l.segmentIndex,
              partIndex: l.partIndex
            });
          }
        }

        return a;
      }
    }, {
      name: "Discontinuity",
      run: function (e, t, i, n, r) {
        var a = null;
        if (r = r || 0, t.discontinuityStarts && t.discontinuityStarts.length) for (var s = null, o = 0; o < t.discontinuityStarts.length; o++) {
          var u = t.discontinuityStarts[o],
              l = t.discontinuitySequence + o + 1,
              c = e.discontinuities[l];

          if (c) {
            l = Math.abs(r - c.time);
            if (null !== s && s < l) break;
            (!a || null === s || l <= s) && (s = l, a = {
              time: c.time,
              segmentIndex: u,
              partIndex: null
            });
          }
        }
        return a;
      }
    }, {
      name: "Playlist",
      run: function (e, t, i, n, r) {
        return t.syncInfo ? {
          time: t.syncInfo.time,
          segmentIndex: t.syncInfo.mediaSequence - t.mediaSequence,
          partIndex: null
        } : null;
      }
    }],
        Rl = function (i) {
      function e(e) {
        var t = i.call(this) || this;
        return t.timelines = [], t.discontinuities = [], t.timelineToDatetimeMappings = {}, t.logger_ = ro("SyncController"), t;
      }

      mt(e, i);
      var t = e.prototype;
      return t.getSyncPoint = function (e, t, i, n) {
        i = this.runStrategies_(e, t, i, n);
        return i.length ? this.selectSyncPoint_(i, {
          key: "time",
          value: n
        }) : null;
      }, t.getExpiredTime = function (e, t) {
        if (!e || !e.segments) return null;
        t = this.runStrategies_(e, t, e.discontinuitySequence, 0);
        if (!t.length) return null;
        t = this.selectSyncPoint_(t, {
          key: "segmentIndex",
          value: 0
        });
        return 0 < t.segmentIndex && (t.time *= -1), Math.abs(t.time + vo({
          defaultDuration: e.targetDuration,
          durationList: e.segments,
          startIndex: t.segmentIndex,
          endIndex: 0
        }));
      }, t.runStrategies_ = function (e, t, i, n) {
        for (var r = [], a = 0; a < Ol.length; a++) {
          var s = Ol[a],
              o = s.run(this, e, t, i, n);
          o && (o.strategy = s.name, r.push({
            strategy: s.name,
            syncPoint: o
          }));
        }

        return r;
      }, t.selectSyncPoint_ = function (e, t) {
        for (var i = e[0].syncPoint, n = Math.abs(e[0].syncPoint[t.key] - t.value), r = e[0].strategy, a = 1; a < e.length; a++) {
          var s = Math.abs(e[a].syncPoint[t.key] - t.value);
          s < n && (n = s, i = e[a].syncPoint, r = e[a].strategy);
        }

        return this.logger_("syncPoint for [" + t.key + ": " + t.value + "] chosen with strategy [" + r + "]: [time:" + i.time + ", segmentIndex:" + i.segmentIndex + ("number" == typeof i.partIndex ? ",partIndex:" + i.partIndex : "") + "]"), i;
      }, t.saveExpiredSegmentInfo = function (e, t) {
        for (var i = t.mediaSequence - e.mediaSequence - 1; 0 <= i; i--) {
          var n = e.segments[i];

          if (n && "undefined" != typeof n.start) {
            t.syncInfo = {
              mediaSequence: e.mediaSequence + i,
              time: n.start
            }, this.logger_("playlist refresh sync: [time:" + t.syncInfo.time + ", mediaSequence: " + t.syncInfo.mediaSequence + "]"), this.trigger("syncinfoupdate");
            break;
          }
        }
      }, t.setDateTimeMappingForStart = function (e) {
        var t;
        this.timelineToDatetimeMappings = {}, e.segments && e.segments.length && e.segments[0].dateTimeObject && (e = (t = e.segments[0]).dateTimeObject.getTime() / 1e3, this.timelineToDatetimeMappings[t.timeline] = -e);
      }, t.saveSegmentTimingInfo = function (e) {
        var t = e.segmentInfo,
            i = e.shouldSaveTimelineMapping,
            n = this.calculateSegmentTimeMapping_(t, t.timingInfo, i),
            e = t.segment;
        n && (this.saveDiscontinuitySyncInfo_(t), t.playlist.syncInfo || (t.playlist.syncInfo = {
          mediaSequence: t.playlist.mediaSequence + t.mediaIndex,
          time: e.start
        }));
        t = e.dateTimeObject;
        e.discontinuity && i && t && (this.timelineToDatetimeMappings[e.timeline] = -t.getTime() / 1e3);
      }, t.timestampOffsetForTimeline = function (e) {
        return "undefined" == typeof this.timelines[e] ? null : this.timelines[e].time;
      }, t.mappingForTimeline = function (e) {
        return "undefined" == typeof this.timelines[e] ? null : this.timelines[e].mapping;
      }, t.calculateSegmentTimeMapping_ = function (e, t, i) {
        var n,
            r,
            a = e.segment,
            s = e.part,
            o = this.timelines[e.timeline];
        if ("number" == typeof e.timestampOffset) o = {
          time: e.startOfSegment,
          mapping: e.startOfSegment - t.start
        }, i && (this.timelines[e.timeline] = o, this.trigger("timestampoffset"), this.logger_("time mapping for timeline " + e.timeline + ": [time: " + o.time + "] [mapping: " + o.mapping + "]")), n = e.startOfSegment, r = t.end + o.mapping;else {
          if (!o) return !1;
          n = t.start + o.mapping, r = t.end + o.mapping;
        }
        return s && (s.start = n, s.end = r), (!a.start || n < a.start) && (a.start = n), a.end = r, !0;
      }, t.saveDiscontinuitySyncInfo_ = function (e) {
        var t = e.playlist,
            i = e.segment;
        if (i.discontinuity) this.discontinuities[i.timeline] = {
          time: i.start,
          accuracy: 0
        };else if (t.discontinuityStarts && t.discontinuityStarts.length) for (var n = 0; n < t.discontinuityStarts.length; n++) {
          var r,
              a = t.discontinuityStarts[n],
              s = t.discontinuitySequence + n + 1,
              o = a - e.mediaIndex,
              u = Math.abs(o);
          (!this.discontinuities[s] || this.discontinuities[s].accuracy > u) && (r = void 0, r = o < 0 ? i.start - vo({
            defaultDuration: t.targetDuration,
            durationList: t.segments,
            startIndex: e.mediaIndex,
            endIndex: a
          }) : i.end + vo({
            defaultDuration: t.targetDuration,
            durationList: t.segments,
            startIndex: e.mediaIndex + 1,
            endIndex: a
          }), this.discontinuities[s] = {
            time: r,
            accuracy: u
          });
        }
      }, t.dispose = function () {
        this.trigger("dispose"), this.off();
      }, e;
    }(Zn.EventTarget),
        Ml = function (t) {
      function e() {
        var e = t.call(this) || this;
        return e.pendingTimelineChanges_ = {}, e.lastTimelineChanges_ = {}, e;
      }

      mt(e, t);
      var i = e.prototype;
      return i.clearPendingTimelineChange = function (e) {
        this.pendingTimelineChanges_[e] = null, this.trigger("pendingtimelinechange");
      }, i.pendingTimelineChange = function (e) {
        var t = e.type,
            i = e.from,
            e = e.to;
        return "number" == typeof i && "number" == typeof e && (this.pendingTimelineChanges_[t] = {
          type: t,
          from: i,
          to: e
        }, this.trigger("pendingtimelinechange")), this.pendingTimelineChanges_[t];
      }, i.lastTimelineChange = function (e) {
        var t = e.type,
            i = e.from,
            e = e.to;
        return "number" == typeof i && "number" == typeof e && (this.lastTimelineChanges_[t] = {
          type: t,
          from: i,
          to: e
        }, delete this.pendingTimelineChanges_[t], this.trigger("timelinechange")), this.lastTimelineChanges_[t];
      }, i.dispose = function () {
        this.trigger("dispose"), this.pendingTimelineChanges_ = {}, this.lastTimelineChanges_ = {}, this.off();
      }, e;
    }(Zn.EventTarget),
        Nl = ni(nr(z(function () {
      function e(e, t, i) {
        return e(i = {
          path: t,
          exports: {},
          require: function (e, t) {
            return function () {
              throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
            }(null == t && i.path);
          }
        }, i.exports), i.exports;
      }

      var t = e(function (e) {
        function n(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }

        e.exports = function (e, t, i) {
          return t && n(e.prototype, t), i && n(e, i), e;
        }, e.exports.default = e.exports, e.exports.__esModule = !0;
      }),
          i = e(function (i) {
        function n(e, t) {
          return i.exports = n = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e;
          }, i.exports.default = i.exports, i.exports.__esModule = !0, n(e, t);
        }

        i.exports = n, i.exports.default = i.exports, i.exports.__esModule = !0;
      }),
          n = e(function (e) {
        e.exports = function (e, t) {
          e.prototype = Object.create(t.prototype), e.prototype.constructor = e, i(e, t);
        }, e.exports.default = e.exports, e.exports.__esModule = !0;
      }),
          r = function () {
        function e() {
          this.listeners = {};
        }

        var t = e.prototype;
        return t.on = function (e, t) {
          this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(t);
        }, t.off = function (e, t) {
          if (!this.listeners[e]) return !1;
          t = this.listeners[e].indexOf(t);
          return this.listeners[e] = this.listeners[e].slice(0), this.listeners[e].splice(t, 1), -1 < t;
        }, t.trigger = function (e) {
          var t = this.listeners[e];
          if (t) if (2 === arguments.length) for (var i = t.length, n = 0; n < i; ++n) t[n].call(this, arguments[1]);else for (var r = Array.prototype.slice.call(arguments, 1), a = t.length, s = 0; s < a; ++s) t[s].apply(this, r);
        }, t.dispose = function () {
          this.listeners = {};
        }, t.pipe = function (t) {
          this.on("data", function (e) {
            t.push(e);
          });
        }, e;
      }();
      /*! @name aes-decrypter @version 3.1.2 @license Apache-2.0 */


      var c = null,
          m = function () {
        function e(e) {
          var t, i, n;
          c = c || function () {
            for (var e, t, i, n, r, a, s, o = [[[], [], [], [], []], [[], [], [], [], []]], u = o[0], l = o[1], c = u[4], d = l[4], h = [], p = [], f = 0; f < 256; f++) p[(h[f] = f << 1 ^ 283 * (f >> 7)) ^ f] = f;

            for (e = t = 0; !c[e]; e ^= i || 1, t = p[t] || 1) for (s = 16843009 * h[n = h[i = h[d[c[e] = r = (r = t ^ t << 1 ^ t << 2 ^ t << 3 ^ t << 4) >> 8 ^ 255 & r ^ 99] = e]]] ^ 65537 * n ^ 257 * i ^ 16843008 * e, a = 257 * h[r] ^ 16843008 * r, f = 0; f < 4; f++) u[f][e] = a = a << 24 ^ a >>> 8, l[f][r] = s = s << 24 ^ s >>> 8;

            for (f = 0; f < 5; f++) u[f] = u[f].slice(0), l[f] = l[f].slice(0);

            return o;
          }(), this._tables = [[c[0][0].slice(), c[0][1].slice(), c[0][2].slice(), c[0][3].slice(), c[0][4].slice()], [c[1][0].slice(), c[1][1].slice(), c[1][2].slice(), c[1][3].slice(), c[1][4].slice()]];
          var r = this._tables[0][4],
              a = this._tables[1],
              s = e.length,
              o = 1;
          if (4 !== s && 6 !== s && 8 !== s) throw new Error("Invalid aes key size");
          var u = e.slice(0),
              l = [];

          for (this._key = [u, l], t = s; t < 4 * s + 28; t++) n = u[t - 1], (t % s == 0 || 8 === s && t % s == 4) && (n = r[n >>> 24] << 24 ^ r[n >> 16 & 255] << 16 ^ r[n >> 8 & 255] << 8 ^ r[255 & n], t % s == 0 && (n = n << 8 ^ n >>> 24 ^ o << 24, o = o << 1 ^ 283 * (o >> 7))), u[t] = u[t - s] ^ n;

          for (i = 0; t; i++, t--) n = u[3 & i ? t : t - 4], l[i] = t <= 4 || i < 4 ? n : a[0][r[n >>> 24]] ^ a[1][r[n >> 16 & 255]] ^ a[2][r[n >> 8 & 255]] ^ a[3][r[255 & n]];
        }

        return e.prototype.decrypt = function (e, t, i, n, r, a) {
          for (var s, o, u, l = this._key[1], c = e ^ l[0], d = n ^ l[1], h = i ^ l[2], p = t ^ l[3], f = l.length / 4 - 2, m = 4, t = this._tables[1], g = t[0], y = t[1], v = t[2], _ = t[3], b = t[4], T = 0; T < f; T++) s = g[c >>> 24] ^ y[d >> 16 & 255] ^ v[h >> 8 & 255] ^ _[255 & p] ^ l[m], o = g[d >>> 24] ^ y[h >> 16 & 255] ^ v[p >> 8 & 255] ^ _[255 & c] ^ l[m + 1], u = g[h >>> 24] ^ y[p >> 16 & 255] ^ v[c >> 8 & 255] ^ _[255 & d] ^ l[m + 2], p = g[p >>> 24] ^ y[c >> 16 & 255] ^ v[d >> 8 & 255] ^ _[255 & h] ^ l[m + 3], m += 4, c = s, d = o, h = u;

          for (T = 0; T < 4; T++) r[(3 & -T) + a] = b[c >>> 24] << 24 ^ b[d >> 16 & 255] << 16 ^ b[h >> 8 & 255] << 8 ^ b[255 & p] ^ l[m++], s = c, c = d, d = h, h = p, p = s;
        }, e;
      }(),
          l = function (t) {
        function e() {
          var e = t.call(this, r) || this;
          return e.jobs = [], e.delay = 1, e.timeout_ = null, e;
        }

        n(e, t);
        var i = e.prototype;
        return i.processJob_ = function () {
          this.jobs.shift()(), this.jobs.length ? this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay) : this.timeout_ = null;
        }, i.push = function (e) {
          this.jobs.push(e), this.timeout_ || (this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay));
        }, e;
      }(r),
          g = function (e) {
        return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24;
      },
          a = function () {
        function u(e, t, i, n) {
          var r = u.STEP,
              a = new Int32Array(e.buffer),
              s = new Uint8Array(e.byteLength),
              o = 0;

          for (this.asyncStream_ = new l(), this.asyncStream_.push(this.decryptChunk_(a.subarray(o, o + r), t, i, s)), o = r; o < a.length; o += r) i = new Uint32Array([g(a[o - 4]), g(a[o - 3]), g(a[o - 2]), g(a[o - 1])]), this.asyncStream_.push(this.decryptChunk_(a.subarray(o, o + r), t, i, s));

          this.asyncStream_.push(function () {
            /*! @name pkcs7 @version 1.0.4 @license Apache-2.0 */
            var e;
            n(null, (e = s).subarray(0, e.byteLength - e[e.byteLength - 1]));
          });
        }

        return u.prototype.decryptChunk_ = function (t, i, n, r) {
          return function () {
            var e = function (e, t, i) {
              for (var n, r, a, s, o = new Int32Array(e.buffer, e.byteOffset, e.byteLength >> 2), u = new m(Array.prototype.slice.call(t)), e = new Uint8Array(e.byteLength), l = new Int32Array(e.buffer), c = i[0], d = i[1], h = i[2], p = i[3], f = 0; f < o.length; f += 4) n = g(o[f]), r = g(o[f + 1]), a = g(o[f + 2]), s = g(o[f + 3]), u.decrypt(n, r, a, s, l, f), l[f] = g(l[f] ^ c), l[f + 1] = g(l[f + 1] ^ d), l[f + 2] = g(l[f + 2] ^ h), l[f + 3] = g(l[f + 3] ^ p), c = n, d = r, h = a, p = s;

              return e;
            }(t, i, n);

            r.set(e, t.byteOffset);
          };
        }, t(u, null, [{
          key: "STEP",
          get: function () {
            return 32e3;
          }
        }]), u;
      }();

      self.onmessage = function (e) {
        var r = e.data,
            t = new Uint8Array(r.encrypted.bytes, r.encrypted.byteOffset, r.encrypted.byteLength),
            i = new Uint32Array(r.key.bytes, r.key.byteOffset, r.key.byteLength / 4),
            e = new Uint32Array(r.iv.bytes, r.iv.byteOffset, r.iv.byteLength / 4);
        new a(t, i, e, function (e, t) {
          var i, n;
          self.postMessage((i = {
            source: r.source,
            decrypted: t
          }, n = {}, Object.keys(i).forEach(function (e) {
            var t = i[e];
            ArrayBuffer.isView(t) ? n[e] = {
              bytes: t.buffer,
              byteOffset: t.byteOffset,
              byteLength: t.byteLength
            } : n[e] = t;
          }), n), [t.buffer]);
        });
      };
    }))),
        Ul = {
      AUDIO: function (s, o) {
        return function () {
          var e = o.segmentLoaders[s],
              t = o.mediaTypes[s],
              i = o.blacklistCurrentPlaylist;
          hl(e, t);
          var n = t.activeTrack(),
              e = t.activeGroup(),
              e = (e.filter(function (e) {
            return e.default;
          })[0] || e[0]).id,
              r = t.tracks[e];

          if (n !== r) {
            for (var a in Zn.log.warn("Problem encountered loading the alternate audio track.Switching back to default."), t.tracks) t.tracks[a].enabled = t.tracks[a] === r;

            t.onTrackChanged();
          } else i({
            message: "Problem encountered loading the default audio track."
          });
        };
      },
      SUBTITLES: function (i, n) {
        return function () {
          var e = n.segmentLoaders[i],
              t = n.mediaTypes[i];
          Zn.log.warn("Problem encountered loading the subtitle track.Disabling subtitle track."), hl(e, t);
          e = t.activeTrack();
          e && (e.mode = "disabled"), t.onTrackChanged();
        };
      }
    },
        Bl = {
      AUDIO: function (e, t, i) {
        var n, r, a;
        t && (n = i.tech, r = i.requestOptions, a = i.segmentLoaders[e], t.on("loadedmetadata", function () {
          var e = t.media();
          a.playlist(e, r), (!n.paused() || e.endList && "none" !== n.preload()) && a.load();
        }), t.on("loadedplaylist", function () {
          a.playlist(t.media(), r), n.paused() || a.load();
        }), t.on("error", Ul[e](e, i)));
      },
      SUBTITLES: function (e, t, i) {
        var n = i.tech,
            r = i.requestOptions,
            a = i.segmentLoaders[e],
            s = i.mediaTypes[e];
        t.on("loadedmetadata", function () {
          var e = t.media();
          a.playlist(e, r), a.track(s.activeTrack()), (!n.paused() || e.endList && "none" !== n.preload()) && a.load();
        }), t.on("loadedplaylist", function () {
          a.playlist(t.media(), r), n.paused() || a.load();
        }), t.on("error", Ul[e](e, i));
      }
    },
        Fl = {
      AUDIO: function (e, t) {
        var i,
            n,
            r = t.vhs,
            a = t.sourceType,
            s = t.segmentLoaders[e],
            o = t.requestOptions,
            u = t.master.mediaGroups,
            l = t.mediaTypes[e],
            c = l.groups,
            d = l.tracks,
            h = l.logger_,
            p = t.masterPlaylistLoader,
            f = Io(p.master);

        for (i in u[e] && 0 !== Object.keys(u[e]).length || (u[e] = {
          main: {
            default: {
              default: !0
            }
          }
        }, f && (u[e].main.default.playlists = p.master.playlists)), u[e]) for (var m in c[i] || (c[i] = []), u[e][i]) {
          var g = u[e][i][m],
              y = void 0,
              y = f ? (h("AUDIO group '" + i + "' label '" + m + "' is a master playlist"), g.isMasterPlaylist = !0, null) : "vhs-json" === a && g.playlists ? new Hu(g.playlists[0], r, o) : g.resolvedUri ? new Hu(g.resolvedUri, r, o) : g.playlists && "dash" === a ? new zu(g.playlists[0], r, o, p) : null,
              g = Zn.mergeOptions({
            id: m,
            playlistLoader: y
          }, g);
          Bl[e](e, g.playlistLoader, t), c[i].push(g), "undefined" == typeof d[m] && (g = new Zn.AudioTrack({
            id: m,
            kind: (n = void 0, n = (y = g).default ? "main" : "alternative", n = y.characteristics && 0 <= y.characteristics.indexOf("public.accessibility.describes-video") ? "main-desc" : n),
            enabled: !1,
            language: g.language,
            default: g.default,
            label: m
          }), d[m] = g);
        }

        s.on("error", Ul[e](e, t));
      },
      SUBTITLES: function (e, t) {
        var i,
            n = t.tech,
            r = t.vhs,
            a = t.sourceType,
            s = t.segmentLoaders[e],
            o = t.requestOptions,
            u = t.master.mediaGroups,
            l = t.mediaTypes[e],
            c = l.groups,
            d = l.tracks,
            h = t.masterPlaylistLoader;

        for (i in u[e]) for (var p in c[i] || (c[i] = []), u[e][i]) if (!u[e][i][p].forced) {
          var f = u[e][i][p],
              m = void 0;
          if ("hls" === a) m = new Hu(f.resolvedUri, r, o);else if ("dash" === a) {
            if (!f.playlists.filter(function (e) {
              return e.excludeUntil !== 1 / 0;
            }).length) return;
            m = new zu(f.playlists[0], r, o, h);
          } else "vhs-json" === a && (m = new Hu(f.playlists ? f.playlists[0] : f.resolvedUri, r, o));
          f = Zn.mergeOptions({
            id: p,
            playlistLoader: m
          }, f), Bl[e](e, f.playlistLoader, t), c[i].push(f), "undefined" == typeof d[p] && (f = n.addRemoteTextTrack({
            id: p,
            kind: "subtitles",
            default: f.default && f.autoselect,
            language: f.language,
            label: p
          }, !1).track, d[p] = f);
        }

        s.on("error", Ul[e](e, t));
      },
      "CLOSED-CAPTIONS": function (e, t) {
        var i,
            n = t.tech,
            r = t.master.mediaGroups,
            t = t.mediaTypes[e],
            a = t.groups,
            s = t.tracks;

        for (i in r[e]) for (var o in a[i] || (a[i] = []), r[e][i]) {
          var u,
              l,
              c = r[e][i][o];
          /^(?:CC|SERVICE)/.test(c.instreamId) && (void 0 === (l = (u = n.options_.vhs && n.options_.vhs.captionServices || {})[(l = {
            label: o,
            language: c.language,
            instreamId: c.instreamId,
            default: c.default && c.autoselect
          }).instreamId] ? Zn.mergeOptions(l, u[l.instreamId]) : l).default && delete l.default, a[i].push(Zn.mergeOptions({
            id: o
          }, c)), "undefined" == typeof s[o] && (l = n.addRemoteTextTrack({
            id: l.instreamId,
            kind: "captions",
            default: l.default,
            language: l.language,
            label: l.label
          }, !1).track, s[o] = l));
        }
      }
    },
        jl = {
      AUDIO: function (i, n) {
        return function () {
          var e,
              t = n.mediaTypes[i].tracks;

          for (e in t) if (t[e].enabled) return t[e];

          return null;
        };
      },
      SUBTITLES: function (i, n) {
        return function () {
          var e,
              t = n.mediaTypes[i].tracks;

          for (e in t) if ("showing" === t[e].mode || "hidden" === t[e].mode) return t[e];

          return null;
        };
      }
    },
        Hl = ["mediaRequests", "mediaRequestsAborted", "mediaRequestsTimedout", "mediaRequestsErrored", "mediaTransferDuration", "mediaBytesTransferred", "mediaAppends"],
        ql = function (g) {
      function e(e) {
        var t = g.call(this) || this,
            i = e.src,
            n = e.handleManifestRedirects,
            r = e.withCredentials,
            a = e.tech,
            s = e.bandwidth,
            o = e.externVhs,
            u = e.useCueTags,
            l = e.blacklistDuration,
            c = e.enableLowInitialPlaylist,
            d = e.sourceType,
            h = e.cacheEncryptionKeys,
            p = e.experimentalBufferBasedABR;
        if (!i) throw new Error("A non-empty playlist URL or JSON manifest string is required");
        var f,
            m = e.maxPlaylistRetries;
        null !== m && "undefined" != typeof m || (m = 1 / 0), vl = o, t.experimentalBufferBasedABR = Boolean(p), t.withCredentials = r, t.tech_ = a, t.vhs_ = a.vhs, t.sourceType_ = d, t.useCueTags_ = u, t.blacklistDuration = l, t.maxPlaylistRetries = m, t.enableLowInitialPlaylist = c, t.useCueTags_ && (t.cueTagsTrack_ = t.tech_.addTextTrack("metadata", "ad-cues"), t.cueTagsTrack_.inBandMetadataTrackDispatchType = ""), t.requestOptions_ = {
          withCredentials: r,
          handleManifestRedirects: n,
          maxPlaylistRetries: m,
          timeout: null
        }, t.on("error", t.pauseLoading), t.mediaTypes_ = (f = {}, ["AUDIO", "SUBTITLES", "CLOSED-CAPTIONS"].forEach(function (e) {
          f[e] = {
            groups: {},
            tracks: {},
            activePlaylistLoader: null,
            activeGroup: nl,
            activeTrack: nl,
            getActiveGroup: nl,
            onGroupChanged: nl,
            onTrackChanged: nl,
            lastTrack_: null,
            logger_: ro("MediaGroups[" + e + "]")
          };
        }), f), t.mediaSource = new _.MediaSource(), t.handleDurationChange_ = t.handleDurationChange_.bind(ft(t)), t.handleSourceOpen_ = t.handleSourceOpen_.bind(ft(t)), t.handleSourceEnded_ = t.handleSourceEnded_.bind(ft(t)), t.mediaSource.addEventListener("durationchange", t.handleDurationChange_), t.mediaSource.addEventListener("sourceopen", t.handleSourceOpen_), t.mediaSource.addEventListener("sourceended", t.handleSourceEnded_), t.seekable_ = Zn.createTimeRanges(), t.hasPlayed_ = !1, t.syncController_ = new Rl(e), t.segmentMetadataTrack_ = a.addRemoteTextTrack({
          kind: "metadata",
          label: "segment-metadata"
        }, !1).track, t.decrypter_ = new Nl(), t.sourceUpdater_ = new Pl(t.mediaSource), t.inbandTextTracks_ = {}, t.timelineChangeController_ = new Ml();
        h = {
          vhs: t.vhs_,
          parse708captions: e.parse708captions,
          mediaSource: t.mediaSource,
          currentTime: t.tech_.currentTime.bind(t.tech_),
          seekable: function () {
            return t.seekable();
          },
          seeking: function () {
            return t.tech_.seeking();
          },
          duration: function () {
            return t.duration();
          },
          hasPlayed: function () {
            return t.hasPlayed_;
          },
          goalBufferLength: function () {
            return t.goalBufferLength();
          },
          bandwidth: s,
          syncController: t.syncController_,
          decrypter: t.decrypter_,
          sourceType: t.sourceType_,
          inbandTextTracks: t.inbandTextTracks_,
          cacheEncryptionKeys: h,
          sourceUpdater: t.sourceUpdater_,
          timelineChangeController: t.timelineChangeController_
        };
        t.masterPlaylistLoader_ = new ("dash" === t.sourceType_ ? zu : Hu)(i, t.vhs_, t.requestOptions_), t.setupMasterPlaylistLoaderListeners_(), t.mainSegmentLoader_ = new il(Zn.mergeOptions(h, {
          segmentMetadataTrack: t.segmentMetadataTrack_,
          loaderType: "main"
        }), e), t.audioSegmentLoader_ = new il(Zn.mergeOptions(h, {
          loaderType: "audio"
        }), e), t.subtitleSegmentLoader_ = new Dl(Zn.mergeOptions(h, {
          loaderType: "vtt",
          featuresNativeTextTracks: t.tech_.featuresNativeTextTracks
        }), e), t.setupSegmentLoaderListeners_(), t.experimentalBufferBasedABR && (t.masterPlaylistLoader_.one("loadedplaylist", function () {
          return t.startABRTimer_();
        }), t.tech_.on("pause", function () {
          return t.stopABRTimer_();
        }), t.tech_.on("play", function () {
          return t.startABRTimer_();
        })), Hl.forEach(function (e) {
          t[e + "_"] = function (e) {
            return this.audioSegmentLoader_[e] + this.mainSegmentLoader_[e];
          }.bind(ft(t), e);
        }), t.logger_ = ro("MPC"), t.triggeredFmp4Usage = !1, "none" === t.tech_.preload() ? (t.loadOnPlay_ = function () {
          t.loadOnPlay_ = null, t.masterPlaylistLoader_.load();
        }, t.tech_.one("play", t.loadOnPlay_)) : t.masterPlaylistLoader_.load(), t.timeToLoadedData__ = -1, t.mainAppendsToLoadedData__ = -1, t.audioAppendsToLoadedData__ = -1;
        e = "none" === t.tech_.preload() ? "play" : "loadstart";
        return t.tech_.one(e, function () {
          var e = Date.now();
          t.tech_.one("loadeddata", function () {
            t.timeToLoadedData__ = Date.now() - e, t.mainAppendsToLoadedData__ = t.mainSegmentLoader_.mediaAppends, t.audioAppendsToLoadedData__ = t.audioSegmentLoader_.mediaAppends;
          });
        }), t;
      }

      mt(e, g);
      var t = e.prototype;
      return t.mainAppendsToLoadedData_ = function () {
        return this.mainAppendsToLoadedData__;
      }, t.audioAppendsToLoadedData_ = function () {
        return this.audioAppendsToLoadedData__;
      }, t.appendsToLoadedData_ = function () {
        var e = this.mainAppendsToLoadedData_(),
            t = this.audioAppendsToLoadedData_();
        return -1 === e || -1 === t ? -1 : e + t;
      }, t.timeToLoadedData_ = function () {
        return this.timeToLoadedData__;
      }, t.checkABR_ = function () {
        var e = this.selectPlaylist();
        this.shouldSwitchToMedia_(e) && this.switchMedia_(e, "abr");
      }, t.switchMedia_ = function (e, t, i) {
        var n = this.media(),
            r = n && (n.id || n.uri),
            n = e.id || e.uri;
        r && r !== n && (this.logger_("switch media " + r + " -> " + n + " from " + t), this.tech_.trigger({
          type: "usage",
          name: "vhs-rendition-change-" + t
        })), this.masterPlaylistLoader_.media(e, i);
      }, t.startABRTimer_ = function () {
        var e = this;
        this.stopABRTimer_(), this.abrTimer_ = _.setInterval(function () {
          return e.checkABR_();
        }, 250);
      }, t.stopABRTimer_ = function () {
        this.tech_.scrubbing && this.tech_.scrubbing() || (_.clearInterval(this.abrTimer_), this.abrTimer_ = null);
      }, t.getAudioTrackPlaylists_ = function () {
        var e = this.master();
        if (!e || !e.mediaGroups || !e.mediaGroups.AUDIO) return e && e.playlists || [];
        var t,
            i = e.mediaGroups.AUDIO,
            e = Object.keys(i);
        if (Object.keys(this.mediaTypes_.AUDIO.groups).length) t = this.mediaTypes_.AUDIO.activeTrack();else {
          var n,
              r = i.main || e.length && i[e[0]];

          for (n in r) if (r[n].default) {
            t = {
              label: n
            };
            break;
          }
        }
        if (!t) return [];
        var a,
            s,
            o = [];

        for (a in i) i[a][t.label] && ((s = i[a][t.label]).playlists ? o.push.apply(o, s.playlists) : o.push(s));

        return o;
      }, t.setupMasterPlaylistLoaderListeners_ = function () {
        var i = this;
        this.masterPlaylistLoader_.on("loadedmetadata", function () {
          var e = i.masterPlaylistLoader_.media(),
              t = 1.5 * e.targetDuration * 1e3;
          ko(i.masterPlaylistLoader_.master, i.masterPlaylistLoader_.media()) ? i.requestOptions_.timeout = 0 : i.requestOptions_.timeout = t, e.endList && "none" !== i.tech_.preload() && (i.mainSegmentLoader_.playlist(e, i.requestOptions_), i.mainSegmentLoader_.load()), ml({
            sourceType: i.sourceType_,
            segmentLoaders: {
              AUDIO: i.audioSegmentLoader_,
              SUBTITLES: i.subtitleSegmentLoader_,
              main: i.mainSegmentLoader_
            },
            tech: i.tech_,
            requestOptions: i.requestOptions_,
            masterPlaylistLoader: i.masterPlaylistLoader_,
            vhs: i.vhs_,
            master: i.master(),
            mediaTypes: i.mediaTypes_,
            blacklistCurrentPlaylist: i.blacklistCurrentPlaylist.bind(i)
          }), i.triggerPresenceUsage_(i.master(), e), i.setupFirstPlay(), !i.mediaTypes_.AUDIO.activePlaylistLoader || i.mediaTypes_.AUDIO.activePlaylistLoader.media() ? i.trigger("selectedinitialmedia") : i.mediaTypes_.AUDIO.activePlaylistLoader.one("loadedmetadata", function () {
            i.trigger("selectedinitialmedia");
          });
        }), this.masterPlaylistLoader_.on("loadedplaylist", function () {
          i.loadOnPlay_ && i.tech_.off("play", i.loadOnPlay_);
          var e,
              t = i.masterPlaylistLoader_.media();

          if (!t) {
            if (i.excludeUnsupportedVariants_(), !(e = (e = i.enableLowInitialPlaylist ? i.selectInitialPlaylist() : e) || i.selectPlaylist()) || !i.shouldSwitchToMedia_(e)) return;
            if (i.initialMedia_ = e, i.switchMedia_(i.initialMedia_, "initial"), !("vhs-json" === i.sourceType_ && i.initialMedia_.segments)) return;
            t = i.initialMedia_;
          }

          i.handleUpdatedMediaPlaylist(t);
        }), this.masterPlaylistLoader_.on("error", function () {
          i.blacklistCurrentPlaylist(i.masterPlaylistLoader_.error);
        }), this.masterPlaylistLoader_.on("mediachanging", function () {
          i.mainSegmentLoader_.abort(), i.mainSegmentLoader_.pause();
        }), this.masterPlaylistLoader_.on("mediachange", function () {
          var e = i.masterPlaylistLoader_.media(),
              t = 1.5 * e.targetDuration * 1e3;
          ko(i.masterPlaylistLoader_.master, i.masterPlaylistLoader_.media()) ? i.requestOptions_.timeout = 0 : i.requestOptions_.timeout = t, i.mainSegmentLoader_.playlist(e, i.requestOptions_), i.mainSegmentLoader_.load(), i.tech_.trigger({
            type: "mediachange",
            bubbles: !0
          });
        }), this.masterPlaylistLoader_.on("playlistunchanged", function () {
          var e = i.masterPlaylistLoader_.media();
          "playlist-unchanged" !== e.lastExcludeReason_ && i.stuckAtPlaylistEnd_(e) && (i.blacklistCurrentPlaylist({
            message: "Playlist no longer updating.",
            reason: "playlist-unchanged"
          }), i.tech_.trigger("playliststuck"));
        }), this.masterPlaylistLoader_.on("renditiondisabled", function () {
          i.tech_.trigger({
            type: "usage",
            name: "vhs-rendition-disabled"
          }), i.tech_.trigger({
            type: "usage",
            name: "hls-rendition-disabled"
          });
        }), this.masterPlaylistLoader_.on("renditionenabled", function () {
          i.tech_.trigger({
            type: "usage",
            name: "vhs-rendition-enabled"
          }), i.tech_.trigger({
            type: "usage",
            name: "hls-rendition-enabled"
          });
        });
      }, t.handleUpdatedMediaPlaylist = function (e) {
        this.useCueTags_ && this.updateAdCues_(e), this.mainSegmentLoader_.playlist(e, this.requestOptions_), this.updateDuration(!e.endList), this.tech_.paused() || (this.mainSegmentLoader_.load(), this.audioSegmentLoader_ && this.audioSegmentLoader_.load());
      }, t.triggerPresenceUsage_ = function (e, t) {
        var i,
            n = e.mediaGroups || {},
            r = !0,
            e = Object.keys(n.AUDIO);

        for (i in n.AUDIO) for (var a in n.AUDIO[i]) n.AUDIO[i][a].uri || (r = !1);

        r && (this.tech_.trigger({
          type: "usage",
          name: "vhs-demuxed"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-demuxed"
        })), Object.keys(n.SUBTITLES).length && (this.tech_.trigger({
          type: "usage",
          name: "vhs-webvtt"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-webvtt"
        })), vl.Playlist.isAes(t) && (this.tech_.trigger({
          type: "usage",
          name: "vhs-aes"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-aes"
        })), e.length && 1 < Object.keys(n.AUDIO[e[0]]).length && (this.tech_.trigger({
          type: "usage",
          name: "vhs-alternate-audio"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-alternate-audio"
        })), this.useCueTags_ && (this.tech_.trigger({
          type: "usage",
          name: "vhs-playlist-cue-tags"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-playlist-cue-tags"
        }));
      }, t.shouldSwitchToMedia_ = function (e) {
        var t = this.masterPlaylistLoader_.media(),
            i = this.tech_.buffered();
        return function (e) {
          var t = e.currentPlaylist,
              i = e.nextPlaylist,
              n = e.forwardBuffer,
              r = e.bufferLowWaterLine,
              a = e.bufferHighWaterLine,
              s = e.duration,
              o = e.experimentalBufferBasedABR,
              u = e.log;
          if (!i) return Zn.log.warn("We received no playlist to switch to. Please check your stream."), !1;
          var l = "allowing switch " + (t && t.id || "null") + " -> " + i.id;
          if (!t || !t.endList) return u(l + " as current playlist " + (t ? "is live" : "is not set")), !0;
          if (i.id === t.id) return !1;
          e = o ? Gu.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE : Gu.MAX_BUFFER_LOW_WATER_LINE;
          if (s < e) return u(l + " as duration < max low water line (" + s + " < " + e + ")"), !0;
          e = i.attributes.BANDWIDTH, i = t.attributes.BANDWIDTH;

          if (e < i && (!o || n < a)) {
            t = l + " as next bandwidth < current bandwidth (" + e + " < " + i + ")";
            return o && (t += " and forwardBuffer < bufferHighWaterLine (" + n + " < " + a + ")"), u(t), !0;
          }

          if ((!o || i < e) && r <= n) {
            r = l + " as forwardBuffer >= bufferLowWaterLine (" + n + " >= " + r + ")";
            return o && (r += " and next bandwidth > current bandwidth (" + e + " > " + i + ")"), u(r), !0;
          }

          return u("not " + l + " as no switching criteria met"), !1;
        }({
          currentPlaylist: t,
          nextPlaylist: e,
          forwardBuffer: i.length ? i.end(i.length - 1) - this.tech_.currentTime() : 0,
          bufferLowWaterLine: this.bufferLowWaterLine(),
          bufferHighWaterLine: this.bufferHighWaterLine(),
          duration: this.duration(),
          experimentalBufferBasedABR: this.experimentalBufferBasedABR,
          log: this.logger_
        });
      }, t.setupSegmentLoaderListeners_ = function () {
        var t = this;
        this.experimentalBufferBasedABR || (this.mainSegmentLoader_.on("bandwidthupdate", function () {
          var e = t.selectPlaylist();
          t.shouldSwitchToMedia_(e) && t.switchMedia_(e, "bandwidthupdate"), t.tech_.trigger("bandwidthupdate");
        }), this.mainSegmentLoader_.on("progress", function () {
          t.trigger("progress");
        })), this.mainSegmentLoader_.on("error", function () {
          t.blacklistCurrentPlaylist(t.mainSegmentLoader_.error());
        }), this.mainSegmentLoader_.on("appenderror", function () {
          t.error = t.mainSegmentLoader_.error_, t.trigger("error");
        }), this.mainSegmentLoader_.on("syncinfoupdate", function () {
          t.onSyncInfoUpdate_();
        }), this.mainSegmentLoader_.on("timestampoffset", function () {
          t.tech_.trigger({
            type: "usage",
            name: "vhs-timestamp-offset"
          }), t.tech_.trigger({
            type: "usage",
            name: "hls-timestamp-offset"
          });
        }), this.audioSegmentLoader_.on("syncinfoupdate", function () {
          t.onSyncInfoUpdate_();
        }), this.audioSegmentLoader_.on("appenderror", function () {
          t.error = t.audioSegmentLoader_.error_, t.trigger("error");
        }), this.mainSegmentLoader_.on("ended", function () {
          t.logger_("main segment loader ended"), t.onEndOfStream();
        }), this.mainSegmentLoader_.on("earlyabort", function (e) {
          t.experimentalBufferBasedABR || (t.delegateLoaders_("all", ["abort"]), t.blacklistCurrentPlaylist({
            message: "Aborted early because there isn't enough bandwidth to complete the request without rebuffering."
          }, 120));
        });

        function e() {
          if (!t.sourceUpdater_.hasCreatedSourceBuffers()) return t.tryToCreateSourceBuffers_();
          var e = t.getCodecsOrExclude_();
          e && t.sourceUpdater_.addOrChangeSourceBuffers(e);
        }

        this.mainSegmentLoader_.on("trackinfo", e), this.audioSegmentLoader_.on("trackinfo", e), this.mainSegmentLoader_.on("fmp4", function () {
          t.triggeredFmp4Usage || (t.tech_.trigger({
            type: "usage",
            name: "vhs-fmp4"
          }), t.tech_.trigger({
            type: "usage",
            name: "hls-fmp4"
          }), t.triggeredFmp4Usage = !0);
        }), this.audioSegmentLoader_.on("fmp4", function () {
          t.triggeredFmp4Usage || (t.tech_.trigger({
            type: "usage",
            name: "vhs-fmp4"
          }), t.tech_.trigger({
            type: "usage",
            name: "hls-fmp4"
          }), t.triggeredFmp4Usage = !0);
        }), this.audioSegmentLoader_.on("ended", function () {
          t.logger_("audioSegmentLoader ended"), t.onEndOfStream();
        });
      }, t.mediaSecondsLoaded_ = function () {
        return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded + this.mainSegmentLoader_.mediaSecondsLoaded);
      }, t.load = function () {
        this.mainSegmentLoader_.load(), this.mediaTypes_.AUDIO.activePlaylistLoader && this.audioSegmentLoader_.load(), this.mediaTypes_.SUBTITLES.activePlaylistLoader && this.subtitleSegmentLoader_.load();
      }, t.smoothQualityChange_ = function (e) {
        void 0 === e && (e = this.selectPlaylist()), this.fastQualityChange_(e);
      }, t.fastQualityChange_ = function (e) {
        var t = this;
        (e = void 0 === e ? this.selectPlaylist() : e) !== this.masterPlaylistLoader_.media() ? (this.switchMedia_(e, "fast-quality"), this.mainSegmentLoader_.resetEverything(function () {
          Zn.browser.IE_VERSION || Zn.browser.IS_EDGE ? t.tech_.setCurrentTime(t.tech_.currentTime() + .04) : t.tech_.setCurrentTime(t.tech_.currentTime());
        })) : this.logger_("skipping fastQualityChange because new media is same as old");
      }, t.play = function () {
        if (!this.setupFirstPlay()) {
          this.tech_.ended() && this.tech_.setCurrentTime(0), this.hasPlayed_ && this.load();
          var e = this.tech_.seekable();
          return this.tech_.duration() === 1 / 0 && this.tech_.currentTime() < e.start(0) ? this.tech_.setCurrentTime(e.end(e.length - 1)) : void 0;
        }
      }, t.setupFirstPlay = function () {
        var e = this,
            t = this.masterPlaylistLoader_.media();
        if (!t || this.tech_.paused() || this.hasPlayed_) return !1;

        if (!t.endList) {
          var i = this.seekable();
          if (!i.length) return !1;
          if (Zn.browser.IE_VERSION && 0 === this.tech_.readyState()) return this.tech_.one("loadedmetadata", function () {
            e.trigger("firstplay"), e.tech_.setCurrentTime(i.end(0)), e.hasPlayed_ = !0;
          }), !1;
          this.trigger("firstplay"), this.tech_.setCurrentTime(i.end(0));
        }

        return this.hasPlayed_ = !0, this.load(), !0;
      }, t.handleSourceOpen_ = function () {
        var e;
        this.tryToCreateSourceBuffers_(), !this.tech_.autoplay() || "undefined" != typeof (e = this.tech_.play()) && "function" == typeof e.then && e.then(null, function (e) {}), this.trigger("sourceopen");
      }, t.handleSourceEnded_ = function () {
        var e, t;
        !this.inbandTextTracks_.metadataTrack_ || (e = this.inbandTextTracks_.metadataTrack_.cues) && e.length && (t = this.duration(), e[e.length - 1].endTime = isNaN(t) || Math.abs(t) === 1 / 0 ? Number.MAX_VALUE : t);
      }, t.handleDurationChange_ = function () {
        this.tech_.trigger("durationchange");
      }, t.onEndOfStream = function () {
        var e,
            t = this.mainSegmentLoader_.ended_;
        (t = this.mediaTypes_.AUDIO.activePlaylistLoader ? ((e = this.mainSegmentLoader_.getCurrentMediaInfo_()) && !e.hasVideo || t) && this.audioSegmentLoader_.ended_ : t) && (this.stopABRTimer_(), this.sourceUpdater_.endOfStream());
      }, t.stuckAtPlaylistEnd_ = function (e) {
        if (!this.seekable().length) return !1;
        var t = this.syncController_.getExpiredTime(e, this.duration());
        if (null === t) return !1;
        var i = vl.Playlist.playlistEnd(e, t),
            e = this.tech_.currentTime(),
            t = this.tech_.buffered();
        if (!t.length) return i - e <= .1;
        t = t.end(t.length - 1);
        return t - e <= .1 && i - t <= .1;
      }, t.blacklistCurrentPlaylist = function (e, t) {
        var i = (e = void 0 === e ? {} : e).playlist || this.masterPlaylistLoader_.media();
        if (t = t || e.blacklistDuration || this.blacklistDuration, !i) return this.error = e, void ("open" !== this.mediaSource.readyState ? this.trigger("error") : this.sourceUpdater_.endOfStream("network"));
        i.playlistErrors_++;
        var n,
            r = this.masterPlaylistLoader_.master.playlists,
            a = r.filter(So),
            s = 1 === a.length && a[0] === i;
        if (1 === r.length && t !== 1 / 0) return Zn.log.warn("Problem encountered with playlist " + i.id + ". Trying again since it is the only playlist."), this.tech_.trigger("retryplaylist"), this.masterPlaylistLoader_.load(s);
        s && (n = !1, r.forEach(function (e) {
          var t;
          e === i || "undefined" != typeof (t = e.excludeUntil) && t !== 1 / 0 && (n = !0, delete e.excludeUntil);
        }), n && (Zn.log.warn("Removing other playlists from the exclusion list because the last rendition is about to be excluded."), this.tech_.trigger("retryplaylist"))), a = i.playlistErrors_ > this.maxPlaylistRetries ? 1 / 0 : Date.now() + 1e3 * t, i.excludeUntil = a, e.reason && (i.lastExcludeReason_ = e.reason), this.tech_.trigger("blacklistplaylist"), this.tech_.trigger({
          type: "usage",
          name: "vhs-rendition-blacklisted"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-rendition-blacklisted"
        });
        r = this.selectPlaylist();
        if (!r) return this.error = "Playback cannot continue. No available working or supported playlists.", void this.trigger("error");
        t = e.internal ? this.logger_ : Zn.log.warn, a = e.message ? " " + e.message : "";
        t((e.internal ? "Internal problem" : "Problem") + " encountered with playlist " + i.id + "." + a + " Switching to playlist " + r.id + "."), r.attributes.AUDIO !== i.attributes.AUDIO && this.delegateLoaders_("audio", ["abort", "pause"]), r.attributes.SUBTITLES !== i.attributes.SUBTITLES && this.delegateLoaders_("subtitle", ["abort", "pause"]), this.delegateLoaders_("main", ["abort", "pause"]);
        a = r.targetDuration / 2 * 1e3 || 5e3, a = "number" == typeof r.lastRequest && Date.now() - r.lastRequest <= a;
        return this.switchMedia_(r, "exclude", s || a);
      }, t.pauseLoading = function () {
        this.delegateLoaders_("all", ["abort", "pause"]), this.stopABRTimer_();
      }, t.delegateLoaders_ = function (i, e) {
        var n = this,
            r = [],
            t = "all" === i;
        !t && "main" !== i || r.push(this.masterPlaylistLoader_);
        var a = [];
        !t && "audio" !== i || a.push("AUDIO"), !t && "subtitle" !== i || (a.push("CLOSED-CAPTIONS"), a.push("SUBTITLES")), a.forEach(function (e) {
          e = n.mediaTypes_[e] && n.mediaTypes_[e].activePlaylistLoader;
          e && r.push(e);
        }), ["main", "audio", "subtitle"].forEach(function (e) {
          var t = n[e + "SegmentLoader_"];
          !t || i !== e && "all" !== i || r.push(t);
        }), r.forEach(function (t) {
          return e.forEach(function (e) {
            "function" == typeof t[e] && t[e]();
          });
        });
      }, t.setCurrentTime = function (e) {
        var t = so(this.tech_.buffered(), e);
        return this.masterPlaylistLoader_ && this.masterPlaylistLoader_.media() && this.masterPlaylistLoader_.media().segments ? t && t.length ? e : (this.mainSegmentLoader_.resetEverything(), this.mainSegmentLoader_.abort(), this.mediaTypes_.AUDIO.activePlaylistLoader && (this.audioSegmentLoader_.resetEverything(), this.audioSegmentLoader_.abort()), this.mediaTypes_.SUBTITLES.activePlaylistLoader && (this.subtitleSegmentLoader_.resetEverything(), this.subtitleSegmentLoader_.abort()), void this.load()) : 0;
      }, t.duration = function () {
        if (!this.masterPlaylistLoader_) return 0;
        var e = this.masterPlaylistLoader_.media();
        return e ? e.endList ? this.mediaSource ? this.mediaSource.duration : vl.Playlist.duration(e) : 1 / 0 : 0;
      }, t.seekable = function () {
        return this.seekable_;
      }, t.onSyncInfoUpdate_ = function () {
        var e;

        if (this.masterPlaylistLoader_) {
          var t = this.masterPlaylistLoader_.media();

          if (t) {
            var i = this.syncController_.getExpiredTime(t, this.duration());

            if (null !== i) {
              var n,
                  r,
                  a = this.masterPlaylistLoader_.master,
                  s = vl.Playlist.seekable(t, i, vl.Playlist.liveEdgeDelay(a, t));

              if (0 !== s.length) {
                if (this.mediaTypes_.AUDIO.activePlaylistLoader) {
                  if (t = this.mediaTypes_.AUDIO.activePlaylistLoader.media(), null === (i = this.syncController_.getExpiredTime(t, this.duration()))) return;
                  if (0 === (e = vl.Playlist.seekable(t, i, vl.Playlist.liveEdgeDelay(a, t))).length) return;
                }

                this.seekable_ && this.seekable_.length && (n = this.seekable_.end(0), r = this.seekable_.start(0)), !e || e.start(0) > s.end(0) || s.start(0) > e.end(0) ? this.seekable_ = s : this.seekable_ = Zn.createTimeRanges([[(e.start(0) > s.start(0) ? e : s).start(0), (e.end(0) < s.end(0) ? e : s).end(0)]]), this.seekable_ && this.seekable_.length && this.seekable_.end(0) === n && this.seekable_.start(0) === r || (this.logger_("seekable updated [" + uo(this.seekable_) + "]"), this.tech_.trigger("seekablechanged"));
              }
            }
          }
        }
      }, t.updateDuration = function (e) {
        if (this.updateDuration_ && (this.mediaSource.removeEventListener("sourceopen", this.updateDuration_), this.updateDuration_ = null), "open" !== this.mediaSource.readyState) return this.updateDuration_ = this.updateDuration.bind(this, e), void this.mediaSource.addEventListener("sourceopen", this.updateDuration_);

        if (e) {
          var t = this.seekable();
          return t.length ? void ((isNaN(this.mediaSource.duration) || this.mediaSource.duration < t.end(t.length - 1)) && this.sourceUpdater_.setDuration(t.end(t.length - 1))) : void 0;
        }

        e = this.tech_.buffered(), t = vl.Playlist.duration(this.masterPlaylistLoader_.media());
        0 < e.length && (t = Math.max(t, e.end(e.length - 1))), this.mediaSource.duration !== t && this.sourceUpdater_.setDuration(t);
      }, t.dispose = function () {
        var n = this;
        this.trigger("dispose"), this.decrypter_.terminate(), this.masterPlaylistLoader_.dispose(), this.mainSegmentLoader_.dispose(), this.loadOnPlay_ && this.tech_.off("play", this.loadOnPlay_), ["AUDIO", "SUBTITLES"].forEach(function (e) {
          var t,
              i = n.mediaTypes_[e].groups;

          for (t in i) i[t].forEach(function (e) {
            e.playlistLoader && e.playlistLoader.dispose();
          });
        }), this.audioSegmentLoader_.dispose(), this.subtitleSegmentLoader_.dispose(), this.sourceUpdater_.dispose(), this.timelineChangeController_.dispose(), this.stopABRTimer_(), this.updateDuration_ && this.mediaSource.removeEventListener("sourceopen", this.updateDuration_), this.mediaSource.removeEventListener("durationchange", this.handleDurationChange_), this.mediaSource.removeEventListener("sourceopen", this.handleSourceOpen_), this.mediaSource.removeEventListener("sourceended", this.handleSourceEnded_), this.off();
      }, t.master = function () {
        return this.masterPlaylistLoader_.master;
      }, t.media = function () {
        return this.masterPlaylistLoader_.media() || this.initialMedia_;
      }, t.areMediaTypesKnown_ = function () {
        var e = !!this.mediaTypes_.AUDIO.activePlaylistLoader,
            t = !!this.mainSegmentLoader_.getCurrentMediaInfo_(),
            e = !e || !!this.audioSegmentLoader_.getCurrentMediaInfo_();
        return t && e;
      }, t.getCodecsOrExclude_ = function () {
        var n = this,
            r = {
          main: this.mainSegmentLoader_.getCurrentMediaInfo_() || {},
          audio: this.audioSegmentLoader_.getCurrentMediaInfo_() || {}
        };
        r.video = r.main;

        var e = _u(this.master(), this.media()),
            a = {},
            t = !!this.mediaTypes_.AUDIO.activePlaylistLoader;

        if (r.main.hasVideo && (a.video = e.video || r.main.videoCodec || "avc1.4d400d"), r.main.isMuxed && (a.video += "," + (e.audio || r.main.audioCodec || kr)), (r.main.hasAudio && !r.main.isMuxed || r.audio.hasAudio || t) && (a.audio = e.audio || r.main.audioCodec || r.audio.audioCodec || kr, r.audio.isFmp4 = (r.main.hasAudio && !r.main.isMuxed ? r.main : r.audio).isFmp4), a.audio || a.video) {
          var s,
              i,
              o = {};

          if (["video", "audio"].forEach(function (e) {
            var t, i;
            a.hasOwnProperty(e) && (t = r[e].isFmp4, i = a[e], !(t ? fr : mr)(i)) && (i = r[e].isFmp4 ? "browser" : "muxer", o[i] = o[i] || [], o[i].push(a[e]), "audio" === e && (s = i));
          }), t && s && this.media().attributes.AUDIO && (i = this.media().attributes.AUDIO, this.master().playlists.forEach(function (e) {
            (e.attributes && e.attributes.AUDIO) === i && e !== n.media() && (e.excludeUntil = 1 / 0);
          }), this.logger_("excluding audio group " + i + " as " + s + ' does not support codec(s): "' + a.audio + '"')), !Object.keys(o).length) {
            if (this.sourceUpdater_.hasCreatedSourceBuffers() && !this.sourceUpdater_.canChangeType()) {
              var u = [];
              if (["video", "audio"].forEach(function (e) {
                var t = (dr(n.sourceUpdater_.codecs[e] || "")[0] || {}).type,
                    i = (dr(a[e] || "")[0] || {}).type;
                t && i && t.toLowerCase() !== i.toLowerCase() && u.push('"' + n.sourceUpdater_.codecs[e] + '" -> "' + a[e] + '"');
              }), u.length) return void this.blacklistCurrentPlaylist({
                playlist: this.media(),
                message: "Codec switching not supported: " + u.join(", ") + ".",
                blacklistDuration: 1 / 0,
                internal: !0
              });
            }

            return a;
          }

          t = Object.keys(o).reduce(function (e, t) {
            return e && (e += ", "), e += t + ' does not support codec(s): "' + o[t].join(",") + '"';
          }, "") + ".";
          this.blacklistCurrentPlaylist({
            playlist: this.media(),
            internal: !0,
            message: t,
            blacklistDuration: 1 / 0
          });
        } else this.blacklistCurrentPlaylist({
          playlist: this.media(),
          message: "Could not determine codecs for playlist.",
          blacklistDuration: 1 / 0
        });
      }, t.tryToCreateSourceBuffers_ = function () {
        var e;
        "open" !== this.mediaSource.readyState || this.sourceUpdater_.hasCreatedSourceBuffers() || !this.areMediaTypesKnown_() || (e = this.getCodecsOrExclude_()) && (this.sourceUpdater_.createSourceBuffers(e), e = [e.video, e.audio].filter(Boolean).join(","), this.excludeIncompatibleVariants_(e));
      }, t.excludeUnsupportedVariants_ = function () {
        var n = this,
            r = this.master().playlists,
            a = [];
        Object.keys(r).forEach(function (e) {
          var t,
              i = r[e];
          -1 === a.indexOf(i.id) && (a.push(i.id), t = [], !(e = _u(n.master, i)).audio || mr(e.audio) || fr(e.audio) || t.push("audio codec " + e.audio), !e.video || mr(e.video) || fr(e.video) || t.push("video codec " + e.video), e.text && "stpp.ttml.im1t" === e.text && t.push("text codec " + e.text), t.length && (i.excludeUntil = 1 / 0, n.logger_("excluding " + i.id + " for unsupported: " + t.join(", "))));
        });
      }, t.excludeIncompatibleVariants_ = function (e) {
        var r = this,
            a = [],
            s = this.master().playlists,
            e = yu(dr(e)),
            o = vu(e),
            u = e.video && dr(e.video)[0] || null,
            l = e.audio && dr(e.audio)[0] || null;
        Object.keys(s).forEach(function (e) {
          var t,
              i,
              n = s[e];
          -1 === a.indexOf(n.id) && n.excludeUntil !== 1 / 0 && (a.push(n.id), t = [], i = _u(r.masterPlaylistLoader_.master, n), e = vu(i), (i.audio || i.video) && (e !== o && t.push('codec count "' + e + '" !== "' + o + '"'), r.sourceUpdater_.canChangeType() || (e = i.video && dr(i.video)[0] || null, i = i.audio && dr(i.audio)[0] || null, e && u && e.type.toLowerCase() !== u.type.toLowerCase() && t.push('video codec "' + e.type + '" !== "' + u.type + '"'), i && l && i.type.toLowerCase() !== l.type.toLowerCase() && t.push('audio codec "' + i.type + '" !== "' + l.type + '"')), t.length && (n.excludeUntil = 1 / 0, r.logger_("blacklisting " + n.id + ": " + t.join(" && ")))));
        });
      }, t.updateAdCues_ = function (e) {
        var t = 0,
            i = this.seekable();
        i.length && (t = i.start(0)), function (e, t, i) {
          if (void 0 === i && (i = 0), e.segments) for (var n = i, r = 0; r < e.segments.length; r++) {
            var a,
                s,
                o,
                u = e.segments[r];

            if (o = o || function (e, t) {
              for (var i = e.cues, n = 0; n < i.length; n++) {
                var r = i[n];
                if (t >= r.adStartTime && t <= r.adEndTime) return r;
              }

              return null;
            }(t, n + u.duration / 2)) {
              if ("cueIn" in u) {
                o.endTime = n, o.adEndTime = n, n += u.duration, o = null;
                continue;
              }

              if (n < o.endTime) {
                n += u.duration;
                continue;
              }

              o.endTime += u.duration;
            } else "cueOut" in u && ((o = new _.VTTCue(n, n + u.duration, u.cueOut)).adStartTime = n, o.adEndTime = n + parseFloat(u.cueOut), t.addCue(o)), "cueOutCont" in u && (a = (s = u.cueOutCont.split("/").map(parseFloat))[0], s = s[1], (o = new _.VTTCue(n, n + u.duration, "")).adStartTime = n - a, o.adEndTime = o.adStartTime + s, t.addCue(o));

            n += u.duration;
          }
        }(e, this.cueTagsTrack_, t);
      }, t.goalBufferLength = function () {
        var e = this.tech_.currentTime(),
            t = Gu.GOAL_BUFFER_LENGTH,
            i = Gu.GOAL_BUFFER_LENGTH_RATE,
            n = Math.max(t, Gu.MAX_GOAL_BUFFER_LENGTH);
        return Math.min(t + e * i, n);
      }, t.bufferLowWaterLine = function () {
        var e = this.tech_.currentTime(),
            t = Gu.BUFFER_LOW_WATER_LINE,
            i = Gu.BUFFER_LOW_WATER_LINE_RATE,
            n = Math.max(t, Gu.MAX_BUFFER_LOW_WATER_LINE),
            r = Math.max(t, Gu.EXPERIMENTAL_MAX_BUFFER_LOW_WATER_LINE);
        return Math.min(t + e * i, this.experimentalBufferBasedABR ? r : n);
      }, t.bufferHighWaterLine = function () {
        return Gu.BUFFER_HIGH_WATER_LINE;
      }, e;
    }(Zn.EventTarget),
        Vl = ["seeking", "seeked", "pause", "playing", "error"],
        Wl = function () {
      function e(e) {
        var t = this;
        this.masterPlaylistController_ = e.masterPlaylistController, this.tech_ = e.tech, this.seekable = e.seekable, this.allowSeeksWithinUnsafeLiveWindow = e.allowSeeksWithinUnsafeLiveWindow, this.liveRangeSafeTimeDelta = e.liveRangeSafeTimeDelta, this.media = e.media, this.consecutiveUpdates = 0, this.lastRecordedTime = null, this.timer_ = null, this.checkCurrentTimeTimeout_ = null, this.logger_ = ro("PlaybackWatcher"), this.logger_("initialize");

        function i() {
          return t.monitorCurrentTime_();
        }

        function n() {
          return t.monitorCurrentTime_();
        }

        function r() {
          return t.techWaiting_();
        }

        function a() {
          return t.cancelTimer_();
        }

        function s() {
          return t.fixesBadSeeks_();
        }

        var o = this.masterPlaylistController_,
            u = ["main", "subtitle", "audio"],
            l = {};
        u.forEach(function (e) {
          l[e] = {
            reset: function () {
              return t.resetSegmentDownloads_(e);
            },
            updateend: function () {
              return t.checkSegmentDownloads_(e);
            }
          }, o[e + "SegmentLoader_"].on("appendsdone", l[e].updateend), o[e + "SegmentLoader_"].on("playlistupdate", l[e].reset), t.tech_.on(["seeked", "seeking"], l[e].reset);
        }), this.tech_.on("seekablechanged", s), this.tech_.on("waiting", r), this.tech_.on(Vl, a), this.tech_.on("canplay", n), this.tech_.one("play", i), this.dispose = function () {
          t.logger_("dispose"), t.tech_.off("seekablechanged", s), t.tech_.off("waiting", r), t.tech_.off(Vl, a), t.tech_.off("canplay", n), t.tech_.off("play", i), u.forEach(function (e) {
            o[e + "SegmentLoader_"].off("appendsdone", l[e].updateend), o[e + "SegmentLoader_"].off("playlistupdate", l[e].reset), t.tech_.off(["seeked", "seeking"], l[e].reset);
          }), t.checkCurrentTimeTimeout_ && _.clearTimeout(t.checkCurrentTimeTimeout_), t.cancelTimer_();
        };
      }

      var t = e.prototype;
      return t.monitorCurrentTime_ = function () {
        this.checkCurrentTime_(), this.checkCurrentTimeTimeout_ && _.clearTimeout(this.checkCurrentTimeTimeout_), this.checkCurrentTimeTimeout_ = _.setTimeout(this.monitorCurrentTime_.bind(this), 250);
      }, t.resetSegmentDownloads_ = function (e) {
        var t = this.masterPlaylistController_[e + "SegmentLoader_"];
        0 < this[e + "StalledDownloads_"] && this.logger_("resetting possible stalled download count for " + e + " loader"), this[e + "StalledDownloads_"] = 0, this[e + "Buffered_"] = t.buffered_();
      }, t.checkSegmentDownloads_ = function (e) {
        var t = this.masterPlaylistController_,
            i = t[e + "SegmentLoader_"],
            n = i.buffered_(),
            r = function (e, t) {
          if (e === t) return !1;
          if (!e && t || !t && e) return !0;
          if (e.length !== t.length) return !0;

          for (var i = 0; i < e.length; i++) if (e.start(i) !== t.start(i) || e.end(i) !== t.end(i)) return !0;

          return !1;
        }(this[e + "Buffered_"], n);

        this[e + "Buffered_"] = n, r ? this.resetSegmentDownloads_(e) : (this[e + "StalledDownloads_"]++, this.logger_("found #" + this[e + "StalledDownloads_"] + " " + e + " appends that did not increase buffer (possible stalled download)", {
          playlistId: i.playlist_ && i.playlist_.id,
          buffered: lo(n)
        }), this[e + "StalledDownloads_"] < 10 || (this.logger_(e + " loader stalled download exclusion"), this.resetSegmentDownloads_(e), this.tech_.trigger({
          type: "usage",
          name: "vhs-" + e + "-download-exclusion"
        }), "subtitle" !== e && t.blacklistCurrentPlaylist({
          message: "Excessive " + e + " segment downloading detected."
        }, 1 / 0)));
      }, t.checkCurrentTime_ = function () {
        if (this.tech_.seeking() && this.fixesBadSeeks_()) return this.consecutiveUpdates = 0, void (this.lastRecordedTime = this.tech_.currentTime());

        if (!this.tech_.paused() && !this.tech_.seeking()) {
          var e = this.tech_.currentTime(),
              t = this.tech_.buffered();
          if (this.lastRecordedTime === e && (!t.length || e + .1 >= t.end(t.length - 1))) return this.techWaiting_();
          5 <= this.consecutiveUpdates && e === this.lastRecordedTime ? (this.consecutiveUpdates++, this.waiting_()) : e === this.lastRecordedTime ? this.consecutiveUpdates++ : (this.consecutiveUpdates = 0, this.lastRecordedTime = e);
        }
      }, t.cancelTimer_ = function () {
        this.consecutiveUpdates = 0, this.timer_ && (this.logger_("cancelTimer_"), clearTimeout(this.timer_)), this.timer_ = null;
      }, t.fixesBadSeeks_ = function () {
        if (!this.tech_.seeking()) return !1;
        var e,
            t = this.seekable(),
            i = this.tech_.currentTime();
        if (this.afterSeekableWindow_(t, i, this.media(), this.allowSeeksWithinUnsafeLiveWindow) && (e = t.end(t.length - 1)), "undefined" != typeof (e = this.beforeSeekableWindow_(t, i) ? (r = t.start(0)) + (r === t.end(0) ? 0 : .1) : e)) return this.logger_("Trying to seek outside of seekable at time " + i + " with seekable range " + uo(t) + ". Seeking to " + e + "."), this.tech_.setCurrentTime(e), !0;
        var n,
            r,
            a = this.tech_.buffered();
        return n = {
          buffered: a,
          targetDuration: this.media().targetDuration,
          currentTime: i
        }, r = n.buffered, t = n.targetDuration, n = n.currentTime, !(!r.length || r.end(0) - r.start(0) < 2 * t || n > r.start(0)) && r.start(0) - n < t && (e = a.start(0) + .1, this.logger_("Buffered region starts (" + a.start(0) + ")  just beyond seek point (" + i + "). Seeking to " + e + "."), this.tech_.setCurrentTime(e), !0);
      }, t.waiting_ = function () {
        var e, t;
        this.techWaiting_() || (e = this.tech_.currentTime(), t = this.tech_.buffered(), (t = so(t, e)).length && e + 3 <= t.end(0) && (this.cancelTimer_(), this.tech_.setCurrentTime(e), this.logger_("Stopped at " + e + " while inside a buffered region [" + t.start(0) + " -> " + t.end(0) + "]. Attempting to resume playback by seeking to the current time."), this.tech_.trigger({
          type: "usage",
          name: "vhs-unknown-waiting"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-unknown-waiting"
        })));
      }, t.techWaiting_ = function () {
        var e = this.seekable(),
            t = this.tech_.currentTime();
        if (this.tech_.seeking() && this.fixesBadSeeks_()) return !0;
        if (this.tech_.seeking() || null !== this.timer_) return !0;

        if (this.beforeSeekableWindow_(e, t)) {
          var i = e.end(e.length - 1);
          return this.logger_("Fell out of live window at time " + t + ". Seeking to live point (seekable end) " + i), this.cancelTimer_(), this.tech_.setCurrentTime(i), this.tech_.trigger({
            type: "usage",
            name: "vhs-live-resync"
          }), this.tech_.trigger({
            type: "usage",
            name: "hls-live-resync"
          }), !0;
        }

        e = this.tech_.vhs.masterPlaylistController_.sourceUpdater_, i = this.tech_.buffered();
        if (this.videoUnderflow_({
          audioBuffered: e.audioBuffered(),
          videoBuffered: e.videoBuffered(),
          currentTime: t
        })) return this.cancelTimer_(), this.tech_.setCurrentTime(t), this.tech_.trigger({
          type: "usage",
          name: "vhs-video-underflow"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-video-underflow"
        }), !0;
        e = oo(i, t);

        if (0 < e.length) {
          i = e.start(0) - t;
          return this.logger_("Stopped at " + t + ", setting timer for " + i + ", seeking to " + e.start(0)), this.cancelTimer_(), this.timer_ = setTimeout(this.skipTheGap_.bind(this), 1e3 * i, t), !0;
        }

        return !1;
      }, t.afterSeekableWindow_ = function (e, t, i, n) {
        if (void 0 === n && (n = !1), !e.length) return !1;
        var r = e.end(e.length - 1) + .1;
        return (r = !i.endList && n ? e.end(e.length - 1) + 3 * i.targetDuration : r) < t;
      }, t.beforeSeekableWindow_ = function (e, t) {
        return !!(e.length && 0 < e.start(0) && t < e.start(0) - this.liveRangeSafeTimeDelta);
      }, t.videoUnderflow_ = function (e) {
        var t,
            i,
            n = e.videoBuffered,
            r = e.audioBuffered,
            a = e.currentTime;
        if (n) return n.length && r.length ? (i = so(n, a - 3), e = so(n, a), (r = so(r, a)).length && !e.length && i.length && (t = {
          start: i.end(0),
          end: r.end(0)
        })) : oo(n, a).length || (t = this.gapFromVideoUnderflow_(n, a)), !!t && (this.logger_("Encountered a gap in video from " + t.start + " to " + t.end + ". Seeking to current time " + a), !0);
      }, t.skipTheGap_ = function (e) {
        var t = this.tech_.buffered(),
            i = this.tech_.currentTime(),
            t = oo(t, i);
        this.cancelTimer_(), 0 !== t.length && i === e && (this.logger_("skipTheGap_:", "currentTime:", i, "scheduled currentTime:", e, "nextRange start:", t.start(0)), this.tech_.setCurrentTime(t.start(0) + Nu), this.tech_.trigger({
          type: "usage",
          name: "vhs-gap-skip"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-gap-skip"
        }));
      }, t.gapFromVideoUnderflow_ = function (e, t) {
        for (var i = function (e) {
          if (e.length < 2) return Zn.createTimeRanges();

          for (var t = [], i = 1; i < e.length; i++) {
            var n = e.end(i - 1),
                r = e.start(i);
            t.push([n, r]);
          }

          return Zn.createTimeRanges(t);
        }(e), n = 0; n < i.length; n++) {
          var r = i.start(n),
              a = i.end(n);
          if (t - r < 4 && 2 < t - r) return {
            start: r,
            end: a
          };
        }

        return null;
      }, e;
    }(),
        zl = {
      errorInterval: 30,
      getSource: function (e) {
        return e(this.tech({
          IWillNotUseThisInPlugins: !0
        }).currentSource_ || this.currentSource());
      }
    },
        z = function (e) {
      yl(this, e);
    },
        Gl = {
      PlaylistLoader: Hu,
      Playlist: Bu,
      utils: ii,
      STANDARD_PLAYLIST_SELECTOR: zt,
      INITIAL_PLAYLIST_SELECTOR: function () {
        var t = this,
            e = this.playlists.master.playlists.filter(Bu.isEnabled);
        return Su(e, Eu), e.filter(function (e) {
          return !!_u(t.playlists.master, e).video;
        })[0] || null;
      },
      lastBandwidthSelector: zt,
      movingAverageBandwidthSelector: function (t) {
        var i = -1,
            n = -1;
        if (t < 0 || 1 < t) throw new Error("Moving average bandwidth decay must be between 0 and 1.");
        return function () {
          var e = this.useDevicePixelRatio && _.devicePixelRatio || 1;
          return i < 0 && (i = this.systemBandwidth, n = this.systemBandwidth), 0 < this.systemBandwidth && this.systemBandwidth !== n && (i = t * this.systemBandwidth + (1 - t) * i, n = this.systemBandwidth), ku(this.playlists.master, i, parseInt(Tu(this.tech_.el(), "width"), 10) * e, parseInt(Tu(this.tech_.el(), "height"), 10) * e, this.limitRenditionByPlayerDimensions, this.masterPlaylistController_);
        };
      },
      comparePlaylistBandwidth: Eu,
      comparePlaylistResolution: function (e, t) {
        var i, n;
        return (i = (i = e.attributes.RESOLUTION && e.attributes.RESOLUTION.width ? e.attributes.RESOLUTION.width : i) || _.Number.MAX_VALUE) === (n = (n = t.attributes.RESOLUTION && t.attributes.RESOLUTION.width ? t.attributes.RESOLUTION.width : n) || _.Number.MAX_VALUE) && e.attributes.BANDWIDTH && t.attributes.BANDWIDTH ? e.attributes.BANDWIDTH - t.attributes.BANDWIDTH : i - n;
      },
      xhr: Fo()
    };

    Object.keys(Gu).forEach(function (t) {
      Object.defineProperty(Gl, t, {
        get: function () {
          return Zn.log.warn("using Vhs." + t + " is UNSAFE be sure you know what you are doing"), Gu[t];
        },
        set: function (e) {
          Zn.log.warn("using Vhs." + t + " is UNSAFE be sure you know what you are doing"), "number" != typeof e || e < 0 ? Zn.log.warn("value of Vhs." + t + " must be greater than or equal to 0") : Gu[t] = e;
        }
      });
    });

    function Xl(e, t) {
      for (var i = t.media(), n = -1, r = 0; r < e.length; r++) if (e[r].id === i.id) {
        n = r;
        break;
      }

      e.selectedIndex_ = n, e.trigger({
        selectedIndex: n,
        type: "change"
      });
    }

    var Kl = "videojs-vhs";

    Gl.canPlaySource = function () {
      return Zn.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.");
    };

    function Yl(e) {
      var n = e.player,
          t = e.sourceKeySystems,
          i = e.audioMedia,
          e = e.mainPlaylists;
      if (!n.eme.initializeMediaKeys) return Promise.resolve();
      var r,
          e = (e = e = i ? e.concat([i]) : e, r = Object.keys(t), e.reduce(function (e, n) {
        if (!n.contentProtection) return e;
        var t = r.reduce(function (e, t) {
          var i = n.contentProtection[t];
          return i && i.pssh && (e[t] = {
            pssh: i.pssh
          }), e;
        }, {});
        return Object.keys(t).length && e.push(t), e;
      }, [])),
          a = [],
          s = [];
      return e.forEach(function (e) {
        s.push(new Promise(function (e, t) {
          n.tech_.one("keysessioncreated", e);
        })), a.push(new Promise(function (t, i) {
          n.eme.initializeMediaKeys({
            keySystems: e
          }, function (e) {
            e ? i(e) : t();
          });
        }));
      }), Promise.race([Promise.all(a), Promise.race(s)]);
    }

    function Ql(e) {
      var t = e.player;
      return !!(e = function (e, t, i) {
        if (!e) return e;
        var n = {};
        t && t.attributes && t.attributes.CODECS && (n = yu(dr(t.attributes.CODECS))), i && i.attributes && i.attributes.CODECS && (n.audio = i.attributes.CODECS);
        var r,
            a = pr(n.video),
            s = pr(n.audio),
            o = {};

        for (r in e) o[r] = {}, s && (o[r].audioContentType = s), a && (o[r].videoContentType = a), t.contentProtection && t.contentProtection[r] && t.contentProtection[r].pssh && (o[r].pssh = t.contentProtection[r].pssh), "string" == typeof e[r] && (o[r].url = e[r]);

        return Zn.mergeOptions(e, o);
      }(e.sourceKeySystems, e.media, e.audioMedia)) && (!((t.currentSource().keySystems = e) && !t.eme) || (Zn.log.warn("DRM encrypted source cannot be decrypted without a DRM plugin"), !1));
    }

    function $l() {
      if (!_.localStorage) return null;

      var e = _.localStorage.getItem(Kl);

      if (!e) return null;

      try {
        return JSON.parse(e);
      } catch (e) {
        return null;
      }
    }

    Gl.supportsNativeHls = function () {
      if (!d || !d.createElement) return !1;
      var t = d.createElement("video");
      if (!Zn.getTech("Html5").isSupported()) return !1;
      return ["application/vnd.apple.mpegurl", "audio/mpegurl", "audio/x-mpegurl", "application/x-mpegurl", "video/x-mpegurl", "video/mpegurl", "application/mpegurl"].some(function (e) {
        return /maybe|probably/i.test(t.canPlayType(e));
      });
    }(), Gl.supportsNativeDash = !!(d && d.createElement && Zn.getTech("Html5").isSupported()) && /maybe|probably/i.test(d.createElement("video").canPlayType("application/dash+xml")), Gl.supportsTypeNatively = function (e) {
      return "hls" === e ? Gl.supportsNativeHls : "dash" === e && Gl.supportsNativeDash;
    }, Gl.isSupported = function () {
      return Zn.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.");
    };

    var Jl = function (r) {
      function e(e, t, i) {
        var n = r.call(this, t, Zn.mergeOptions(i.hls, i.vhs)) || this;
        if (i.hls && Object.keys(i.hls).length && Zn.log.warn("Using hls options is deprecated. Use vhs instead."), "number" == typeof i.initialBandwidth && (n.options_.bandwidth = i.initialBandwidth), n.logger_ = ro("VhsHandler"), t.options_ && t.options_.playerId && ((i = Zn(t.options_.playerId)).hasOwnProperty("hls") || Object.defineProperty(i, "hls", {
          get: function () {
            return Zn.log.warn("player.hls is deprecated. Use player.tech().vhs instead."), t.trigger({
              type: "usage",
              name: "hls-player-access"
            }), ft(n);
          },
          configurable: !0
        }), i.hasOwnProperty("vhs") || Object.defineProperty(i, "vhs", {
          get: function () {
            return Zn.log.warn("player.vhs is deprecated. Use player.tech().vhs instead."), t.trigger({
              type: "usage",
              name: "vhs-player-access"
            }), ft(n);
          },
          configurable: !0
        }), i.hasOwnProperty("dash") || Object.defineProperty(i, "dash", {
          get: function () {
            return Zn.log.warn("player.dash is deprecated. Use player.tech().vhs instead."), ft(n);
          },
          configurable: !0
        }), n.player_ = i), n.tech_ = t, n.source_ = e, n.stats = {}, n.ignoreNextSeekingEvent_ = !1, n.setOptions_(), n.options_.overrideNative && t.overrideNativeAudioTracks && t.overrideNativeVideoTracks) t.overrideNativeAudioTracks(!0), t.overrideNativeVideoTracks(!0);else if (n.options_.overrideNative && (t.featuresNativeVideoTracks || t.featuresNativeAudioTracks)) throw new Error("Overriding native HLS requires emulated tracks. See https://git.io/vMpjB");
        return n.on(d, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"], function (e) {
          var t = d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement || d.msFullscreenElement;
          t && t.contains(n.tech_.el()) ? n.masterPlaylistController_.fastQualityChange_() : n.masterPlaylistController_.checkABR_();
        }), n.on(n.tech_, "seeking", function () {
          this.ignoreNextSeekingEvent_ ? this.ignoreNextSeekingEvent_ = !1 : this.setCurrentTime(this.tech_.currentTime());
        }), n.on(n.tech_, "error", function () {
          this.tech_.error() && this.masterPlaylistController_ && this.masterPlaylistController_.pauseLoading();
        }), n.on(n.tech_, "play", n.play), n;
      }

      mt(e, r);
      var t = e.prototype;
      return t.setOptions_ = function () {
        var e,
            t = this;
        this.options_.withCredentials = this.options_.withCredentials || !1, this.options_.handleManifestRedirects = !1 !== this.options_.handleManifestRedirects, this.options_.limitRenditionByPlayerDimensions = !1 !== this.options_.limitRenditionByPlayerDimensions, this.options_.useDevicePixelRatio = this.options_.useDevicePixelRatio || !1, this.options_.smoothQualityChange = this.options_.smoothQualityChange || !1, this.options_.useBandwidthFromLocalStorage = "undefined" != typeof this.source_.useBandwidthFromLocalStorage ? this.source_.useBandwidthFromLocalStorage : this.options_.useBandwidthFromLocalStorage || !1, this.options_.customTagParsers = this.options_.customTagParsers || [], this.options_.customTagMappers = this.options_.customTagMappers || [], this.options_.cacheEncryptionKeys = this.options_.cacheEncryptionKeys || !1, "number" != typeof this.options_.blacklistDuration && (this.options_.blacklistDuration = 300), "number" != typeof this.options_.bandwidth && this.options_.useBandwidthFromLocalStorage && ((e = $l()) && e.bandwidth && (this.options_.bandwidth = e.bandwidth, this.tech_.trigger({
          type: "usage",
          name: "vhs-bandwidth-from-local-storage"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-bandwidth-from-local-storage"
        })), e && e.throughput && (this.options_.throughput = e.throughput, this.tech_.trigger({
          type: "usage",
          name: "vhs-throughput-from-local-storage"
        }), this.tech_.trigger({
          type: "usage",
          name: "hls-throughput-from-local-storage"
        }))), "number" != typeof this.options_.bandwidth && (this.options_.bandwidth = Gu.INITIAL_BANDWIDTH), this.options_.enableLowInitialPlaylist = this.options_.enableLowInitialPlaylist && this.options_.bandwidth === Gu.INITIAL_BANDWIDTH, ["withCredentials", "useDevicePixelRatio", "limitRenditionByPlayerDimensions", "bandwidth", "smoothQualityChange", "customTagParsers", "customTagMappers", "handleManifestRedirects", "cacheEncryptionKeys", "playlistSelector", "initialPlaylistSelector", "experimentalBufferBasedABR", "liveRangeSafeTimeDelta", "experimentalLLHLS"].forEach(function (e) {
          "undefined" != typeof t.source_[e] && (t.options_[e] = t.source_[e]);
        }), this.limitRenditionByPlayerDimensions = this.options_.limitRenditionByPlayerDimensions, this.useDevicePixelRatio = this.options_.useDevicePixelRatio;
      }, t.src = function (e, t) {
        var n = this;
        e && (this.setOptions_(), this.options_.src = 0 === (e = this.source_.src).toLowerCase().indexOf("data:application/vnd.videojs.vhs+json,") ? JSON.parse(e.substring(e.indexOf(",") + 1)) : e, this.options_.tech = this.tech_, this.options_.externVhs = Gl, this.options_.sourceType = gr(t), this.options_.seekTo = function (e) {
          n.tech_.setCurrentTime(e);
        }, this.options_.smoothQualityChange && Zn.log.warn("smoothQualityChange is deprecated and will be removed in the next major version"), this.masterPlaylistController_ = new ql(this.options_), t = Zn.mergeOptions({
          liveRangeSafeTimeDelta: .1
        }, this.options_, {
          seekable: function () {
            return n.seekable();
          },
          media: function () {
            return n.masterPlaylistController_.media();
          },
          masterPlaylistController: this.masterPlaylistController_
        }), this.playbackWatcher_ = new Wl(t), this.masterPlaylistController_.on("error", function () {
          var e = Zn.players[n.tech_.options_.playerId],
              t = n.masterPlaylistController_.error;
          "object" != typeof t || t.code ? "string" == typeof t && (t = {
            message: t,
            code: 3
          }) : t.code = 3, e.error(t);
        }), t = this.options_.experimentalBufferBasedABR ? Gl.movingAverageBandwidthSelector(.55) : Gl.STANDARD_PLAYLIST_SELECTOR, this.masterPlaylistController_.selectPlaylist = (this.selectPlaylist || t).bind(this), this.masterPlaylistController_.selectInitialPlaylist = Gl.INITIAL_PLAYLIST_SELECTOR.bind(this), this.playlists = this.masterPlaylistController_.masterPlaylistLoader_, this.mediaSource = this.masterPlaylistController_.mediaSource, Object.defineProperties(this, {
          selectPlaylist: {
            get: function () {
              return this.masterPlaylistController_.selectPlaylist;
            },
            set: function (e) {
              this.masterPlaylistController_.selectPlaylist = e.bind(this);
            }
          },
          throughput: {
            get: function () {
              return this.masterPlaylistController_.mainSegmentLoader_.throughput.rate;
            },
            set: function (e) {
              this.masterPlaylistController_.mainSegmentLoader_.throughput.rate = e, this.masterPlaylistController_.mainSegmentLoader_.throughput.count = 1;
            }
          },
          bandwidth: {
            get: function () {
              return this.masterPlaylistController_.mainSegmentLoader_.bandwidth;
            },
            set: function (e) {
              this.masterPlaylistController_.mainSegmentLoader_.bandwidth = e, this.masterPlaylistController_.mainSegmentLoader_.throughput = {
                rate: 0,
                count: 0
              };
            }
          },
          systemBandwidth: {
            get: function () {
              var e = 1 / (this.bandwidth || 1),
                  t = 0 < this.throughput ? 1 / this.throughput : 0;
              return Math.floor(1 / (e + t));
            },
            set: function () {
              Zn.log.error('The "systemBandwidth" property is read-only');
            }
          }
        }), this.options_.bandwidth && (this.bandwidth = this.options_.bandwidth), this.options_.throughput && (this.throughput = this.options_.throughput), Object.defineProperties(this.stats, {
          bandwidth: {
            get: function () {
              return n.bandwidth || 0;
            },
            enumerable: !0
          },
          mediaRequests: {
            get: function () {
              return n.masterPlaylistController_.mediaRequests_() || 0;
            },
            enumerable: !0
          },
          mediaRequestsAborted: {
            get: function () {
              return n.masterPlaylistController_.mediaRequestsAborted_() || 0;
            },
            enumerable: !0
          },
          mediaRequestsTimedout: {
            get: function () {
              return n.masterPlaylistController_.mediaRequestsTimedout_() || 0;
            },
            enumerable: !0
          },
          mediaRequestsErrored: {
            get: function () {
              return n.masterPlaylistController_.mediaRequestsErrored_() || 0;
            },
            enumerable: !0
          },
          mediaTransferDuration: {
            get: function () {
              return n.masterPlaylistController_.mediaTransferDuration_() || 0;
            },
            enumerable: !0
          },
          mediaBytesTransferred: {
            get: function () {
              return n.masterPlaylistController_.mediaBytesTransferred_() || 0;
            },
            enumerable: !0
          },
          mediaSecondsLoaded: {
            get: function () {
              return n.masterPlaylistController_.mediaSecondsLoaded_() || 0;
            },
            enumerable: !0
          },
          mediaAppends: {
            get: function () {
              return n.masterPlaylistController_.mediaAppends_() || 0;
            },
            enumerable: !0
          },
          mainAppendsToLoadedData: {
            get: function () {
              return n.masterPlaylistController_.mainAppendsToLoadedData_() || 0;
            },
            enumerable: !0
          },
          audioAppendsToLoadedData: {
            get: function () {
              return n.masterPlaylistController_.audioAppendsToLoadedData_() || 0;
            },
            enumerable: !0
          },
          appendsToLoadedData: {
            get: function () {
              return n.masterPlaylistController_.appendsToLoadedData_() || 0;
            },
            enumerable: !0
          },
          timeToLoadedData: {
            get: function () {
              return n.masterPlaylistController_.timeToLoadedData_() || 0;
            },
            enumerable: !0
          },
          buffered: {
            get: function () {
              return lo(n.tech_.buffered());
            },
            enumerable: !0
          },
          currentTime: {
            get: function () {
              return n.tech_.currentTime();
            },
            enumerable: !0
          },
          currentSource: {
            get: function () {
              return n.tech_.currentSource_;
            },
            enumerable: !0
          },
          currentTech: {
            get: function () {
              return n.tech_.name_;
            },
            enumerable: !0
          },
          duration: {
            get: function () {
              return n.tech_.duration();
            },
            enumerable: !0
          },
          master: {
            get: function () {
              return n.playlists.master;
            },
            enumerable: !0
          },
          playerDimensions: {
            get: function () {
              return n.tech_.currentDimensions();
            },
            enumerable: !0
          },
          seekable: {
            get: function () {
              return lo(n.tech_.seekable());
            },
            enumerable: !0
          },
          timestamp: {
            get: function () {
              return Date.now();
            },
            enumerable: !0
          },
          videoPlaybackQuality: {
            get: function () {
              return n.tech_.getVideoPlaybackQuality();
            },
            enumerable: !0
          }
        }), this.tech_.one("canplay", this.masterPlaylistController_.setupFirstPlay.bind(this.masterPlaylistController_)), this.tech_.on("bandwidthupdate", function () {
          n.options_.useBandwidthFromLocalStorage && function (e) {
            if (!_.localStorage) return;
            var t = (t = $l()) ? Zn.mergeOptions(t, e) : e;

            try {
              _.localStorage.setItem(Kl, JSON.stringify(t));
            } catch (e) {
              return;
            }
          }({
            bandwidth: n.bandwidth,
            throughput: Math.round(n.throughput)
          });
        }), this.masterPlaylistController_.on("selectedinitialmedia", function () {
          var i;

          (i = n).representations = function () {
            var e = i.masterPlaylistController_.master(),
                e = Io(e) ? i.masterPlaylistController_.getAudioTrackPlaylists_() : e.playlists;
            return e ? e.filter(function (e) {
              return !To(e);
            }).map(function (e, t) {
              return new gl(i, e, e.id);
            }) : [];
          };
        }), this.masterPlaylistController_.sourceUpdater_.on("createdsourcebuffers", function () {
          n.setupEme_();
        }), this.on(this.masterPlaylistController_, "progress", function () {
          this.tech_.trigger("progress");
        }), this.on(this.masterPlaylistController_, "firstplay", function () {
          this.ignoreNextSeekingEvent_ = !0;
        }), this.setupQualityLevels_(), this.tech_.el() && (this.mediaSourceUrl_ = _.URL.createObjectURL(this.masterPlaylistController_.mediaSource), this.tech_.src(this.mediaSourceUrl_)));
      }, t.setupEme_ = function () {
        var t = this,
            e = this.masterPlaylistController_.mediaTypes_.AUDIO.activePlaylistLoader,
            i = Ql({
          player: this.player_,
          sourceKeySystems: this.source_.keySystems,
          media: this.playlists.media(),
          audioMedia: e && e.media()
        });
        11 !== Zn.browser.IE_VERSION && i ? (this.logger_("waiting for EME key session creation"), Yl({
          player: this.player_,
          sourceKeySystems: this.source_.keySystems,
          audioMedia: e && e.media(),
          mainPlaylists: this.playlists.master.playlists
        }).then(function () {
          t.logger_("created EME key session"), t.masterPlaylistController_.sourceUpdater_.initializedEme();
        }).catch(function (e) {
          t.logger_("error while creating EME key session", e), t.player_.error({
            message: "Failed to initialize media keys for EME",
            code: 3
          });
        })) : this.masterPlaylistController_.sourceUpdater_.initializedEme();
      }, t.setupQualityLevels_ = function () {
        var i = this,
            e = Zn.players[this.tech_.options_.playerId];
        e && e.qualityLevels && !this.qualityLevels_ && (this.qualityLevels_ = e.qualityLevels(), this.masterPlaylistController_.on("selectedinitialmedia", function () {
          var t, e;
          t = i.qualityLevels_, (e = i).representations().forEach(function (e) {
            t.addQualityLevel(e);
          }), Xl(t, e.playlists);
        }), this.playlists.on("mediachange", function () {
          Xl(i.qualityLevels_, i.playlists);
        }));
      }, e.version = function () {
        return {
          "@videojs/http-streaming": "2.9.2",
          "mux.js": "5.12.2",
          "mpd-parser": "0.17.0",
          "m3u8-parser": "4.7.0",
          "aes-decrypter": "3.1.2"
        };
      }, t.version = function () {
        return this.constructor.version();
      }, t.canChangeType = function () {
        return Pl.canChangeType();
      }, t.play = function () {
        this.masterPlaylistController_.play();
      }, t.setCurrentTime = function (e) {
        this.masterPlaylistController_.setCurrentTime(e);
      }, t.duration = function () {
        return this.masterPlaylistController_.duration();
      }, t.seekable = function () {
        return this.masterPlaylistController_.seekable();
      }, t.dispose = function () {
        this.playbackWatcher_ && this.playbackWatcher_.dispose(), this.masterPlaylistController_ && this.masterPlaylistController_.dispose(), this.qualityLevels_ && this.qualityLevels_.dispose(), this.player_ && (delete this.player_.vhs, delete this.player_.dash, delete this.player_.hls), this.tech_ && this.tech_.vhs && delete this.tech_.vhs, this.tech_ && delete this.tech_.hls, this.mediaSourceUrl_ && _.URL.revokeObjectURL && (_.URL.revokeObjectURL(this.mediaSourceUrl_), this.mediaSourceUrl_ = null), r.prototype.dispose.call(this);
      }, t.convertToProgramTime = function (e, t) {
        return Xo({
          playlist: this.masterPlaylistController_.media(),
          time: e,
          callback: t
        });
      }, t.seekToProgramTime = function (e, t, i, n) {
        return void 0 === i && (i = !0), void 0 === n && (n = 2), Ko({
          programTime: e,
          playlist: this.masterPlaylistController_.media(),
          retryCount: n,
          pauseAfterSeek: i,
          seekTo: this.options_.seekTo,
          tech: this.options_.tech,
          callback: t
        });
      }, e;
    }(Zn.getComponent("Component")),
        Zl = {
      name: "videojs-http-streaming",
      VERSION: "2.9.2",
      canHandleSource: function (e, t) {
        t = Zn.mergeOptions(Zn.options, t = void 0 === t ? {} : t);
        return Zl.canPlayType(e.type, t);
      },
      handleSource: function (e, t, i) {
        i = Zn.mergeOptions(Zn.options, i = void 0 === i ? {} : i);
        return t.vhs = new Jl(e, t, i), Zn.hasOwnProperty("hls") || Object.defineProperty(t, "hls", {
          get: function () {
            return Zn.log.warn("player.tech().hls is deprecated. Use player.tech().vhs instead."), t.vhs;
          },
          configurable: !0
        }), t.vhs.xhr = Fo(), t.vhs.src(e.src, e.type), t.vhs;
      },
      canPlayType: function (e, t) {
        t = Zn.mergeOptions(Zn.options, t = void 0 === t ? {} : t).vhs.overrideNative, t = void 0 === t ? !Zn.browser.IS_ANY_SAFARI : t, e = gr(e);
        return e && (!Gl.supportsTypeNatively(e) || t) ? "maybe" : "";
      }
    };

    return fr("avc1.4d400d,mp4a.40.2") && Zn.getTech("Html5").registerSourceHandler(Zl, 0), Zn.VhsHandler = Jl, Object.defineProperty(Zn, "HlsHandler", {
      get: function () {
        return Zn.log.warn("videojs.HlsHandler is deprecated. Use videojs.VhsHandler instead."), Jl;
      },
      configurable: !0
    }), Zn.VhsSourceHandler = Zl, Object.defineProperty(Zn, "HlsSourceHandler", {
      get: function () {
        return Zn.log.warn("videojs.HlsSourceHandler is deprecated. Use videojs.VhsSourceHandler instead."), Zl;
      },
      configurable: !0
    }), Zn.Vhs = Gl, Object.defineProperty(Zn, "Hls", {
      get: function () {
        return Zn.log.warn("videojs.Hls is deprecated. Use videojs.Vhs instead."), Gl;
      },
      configurable: !0
    }), Zn.use || (Zn.registerComponent("Hls", Gl), Zn.registerComponent("Vhs", Gl)), Zn.options.vhs = Zn.options.vhs || {}, Zn.options.hls = Zn.options.hls || {}, Zn.registerPlugin ? Zn.registerPlugin("reloadSourceOnError", z) : Zn.plugin("reloadSourceOnError", z), Zn;
  });
  /*! @name videojs-contrib-quality-levels @version 2.0.9 @license Apache-2.0 */

  !function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("video.js"), require("global/document")) : "function" == typeof define && define.amd ? define(["video.js", "global/document"], t) : e.videojsContribQualityLevels = t(e.videojs, e.document);
  }(this, function (e, t) {
    "use strict";

    function n(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    e = e && e.hasOwnProperty("default") ? e.default : e, t = t && t.hasOwnProperty("default") ? t.default : t;

    var r = function (r) {
      var i, l;

      function o() {
        var i,
            l = n(n(i = r.call(this) || this));
        if (e.browser.IS_IE8) for (var s in l = t.createElement("custom"), o.prototype) "constructor" !== s && (l[s] = o.prototype[s]);
        return l.levels_ = [], l.selectedIndex_ = -1, Object.defineProperty(l, "selectedIndex", {
          get: function () {
            return l.selectedIndex_;
          }
        }), Object.defineProperty(l, "length", {
          get: function () {
            return l.levels_.length;
          }
        }), l || n(i);
      }

      l = r, (i = o).prototype = Object.create(l.prototype), i.prototype.constructor = i, i.__proto__ = l;
      var s = o.prototype;
      return s.addQualityLevel = function (n) {
        var r = this.getQualityLevelById(n.id);
        if (r) return r;
        var i = this.levels_.length;
        return r = new function n(r) {
          var i = this;
          if (e.browser.IS_IE8) for (var l in i = t.createElement("custom"), n.prototype) "constructor" !== l && (i[l] = n.prototype[l]);
          return i.id = r.id, i.label = i.id, i.width = r.width, i.height = r.height, i.bitrate = r.bandwidth, i.enabled_ = r.enabled, Object.defineProperty(i, "enabled", {
            get: function () {
              return i.enabled_();
            },
            set: function (e) {
              i.enabled_(e);
            }
          }), i;
        }(n), "" + i in this || Object.defineProperty(this, i, {
          get: function () {
            return this.levels_[i];
          }
        }), this.levels_.push(r), this.trigger({
          qualityLevel: r,
          type: "addqualitylevel"
        }), r;
      }, s.removeQualityLevel = function (e) {
        for (var t = null, n = 0, r = this.length; n < r; n++) if (this[n] === e) {
          t = this.levels_.splice(n, 1)[0], this.selectedIndex_ === n ? this.selectedIndex_ = -1 : this.selectedIndex_ > n && this.selectedIndex_--;
          break;
        }

        return t && this.trigger({
          qualityLevel: e,
          type: "removequalitylevel"
        }), t;
      }, s.getQualityLevelById = function (e) {
        for (var t = 0, n = this.length; t < n; t++) {
          var r = this[t];
          if (r.id === e) return r;
        }

        return null;
      }, s.dispose = function () {
        this.selectedIndex_ = -1, this.levels_.length = 0;
      }, o;
    }(e.EventTarget);

    for (var i in r.prototype.allowedEvents_ = {
      change: "change",
      addqualitylevel: "addqualitylevel",
      removequalitylevel: "removequalitylevel"
    }, r.prototype.allowedEvents_) r.prototype["on" + i] = null;

    var l = function (t) {
      return n = this, e.mergeOptions({}, t), i = n.qualityLevels, l = new r(), n.on("dispose", function e() {
        l.dispose(), n.qualityLevels = i, n.off("dispose", e);
      }), n.qualityLevels = function () {
        return l;
      }, n.qualityLevels.VERSION = "2.0.9", l;
      var n, i, l;
    };

    return (e.registerPlugin || e.plugin)("qualityLevels", l), l.VERSION = "2.0.9", l;
  });
})();
//# sourceMappingURL=sirv.videojs.js.map
