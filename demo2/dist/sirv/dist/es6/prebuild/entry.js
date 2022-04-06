// eslint-disable-next-line wrap-iife
(function () {
  var modules = {};

  var sirvRequire = function (deps, cb) {
    // if (!deps) {
    //     deps = [];
    // }
    if (!Array.isArray(deps)) {
      deps = [deps];
    }

    const args = [];
    deps.forEach(dep => {
      if (modules[dep]) {
        if (!modules[dep].result) {
          modules[dep].result = sirvRequire(modules[dep].deps, modules[dep].cb);
        }

        args.push(modules[dep].result);
      } else {
        args.push(null);
      }
    });
    return typeof cb === 'function' ? cb.apply(this, args) : cb;
  };

  var sirvDefine = function (name, deps, cb) {
    if (!cb) {
      cb = deps;
      deps = null;
    }

    modules[name] = {
      deps: deps,
      cb: cb,
      result: null
    };
  };

  window.Sirv = {
    require: sirvRequire,
    define: sirvDefine
  };
})();

Sirv.define('magicJS', ['bHelpers'], bHelpers => {
  let magicJS;
  let $J;

  magicJS = $J = function () {
    let WIN = window;
    let UND = WIN.undefined;
    let DOC = document;
    /* eslint-env es6 */

    /* global UND, WIN, DOC, Doc */

    /* eslint-disable no-use-before-define */

    /* eslint no-return-assign: "error" */

    /* eslint no-extra-boolean-cast: "off" */

    /* eslint no-continue: "off" */

    /* eslint no-restricted-syntax: ["error", "WithStatement", "BinaryExpression[operator='in']"] */

    /* eslint-disable dot-notation */

    /* eslint-disable eqeqeq */

    const STORAGE = new WeakMap();
    /*
     * Script: base.js
     * Contains core methods.
     */

    /**
     * Contains core methods.
     * @class
     * @static
     */

    const magicJS =
    /** @lends magicJS# */
    {
      /**
       * Start UUID for objects
       */
      UUID: 0,

      /**
       * Storage for object properties
       */
      storage: {},

      /**
       * Assign unique id for an object
       */
      $uuid: o => {
        return o.$J_UUID || (o.$J_UUID = ++$J.UUID);
      },

      /**
       * Retreive storage of an object by uuid
       */
      getStorage: uuid => {
        return $J.storage[uuid] || ($J.storage[uuid] = {});
      },

      /**
       * Empty function that returns false
       */
      $false: () => {
        return false;
      },

      /**
       * Empty function that returns true
       */
      $true: () => {
        return true;
      },

      /**
       * Id of the magicJS <style></style>
       */
      stylesId: 'mjs-' + Math.floor(Math.random() * new Date().getTime()),

      /**
       * Check if the object defined
       *
       * @param {Object}   object to check
       *
       * @returns {bool}  - true or false
       */
      defined: o => {
        return o != UND;
      },

      /**
       * Get type of the object
       *
       * @param {Object}  object to check
       *
       * @returns {String}    - object type
       */
      typeOf: o => {
        if (!$J.defined(o)) {
          return false;
        }

        if (o.$J_TYPE) {
          return o.$J_TYPE;
        }

        if (!!o.nodeType) {
          if (o.nodeType === 1) {
            return 'element';
          }

          if (o.nodeType === 3) {
            return 'textnode';
          }
        }

        if (o === WIN) {
          return 'window';
        }

        if (o === DOC) {
          return 'document';
        } // if ((o instanceof WIN.Object || o instanceof WIN.Function) && o.constructor === $J.Class) {
        //     return 'class';
        // }


        if (o instanceof WIN.Array) {
          return 'array';
        }

        if (o instanceof WIN.Function) {
          return 'function';
        }

        if (o instanceof WIN.String) {
          return 'string';
        }

        if ($J.browser.trident) {
          if ($J.defined(o.cancelBubble)) {
            return 'event';
          }
        } else {
          //if ( o instanceof WIN.Event || o === WIN.event || o.constructor == WIN.MouseEvent ) { return 'event'; }
          // eslint-disable-next-line
          if (o === WIN.event || o.constructor == WIN.Event || o.constructor == WIN.MouseEvent || o.constructor == WIN.UIEvent || o.constructor == WIN.KeyboardEvent || o.constructor == WIN.KeyEvent) {
            return 'event';
          }
        }

        if (o instanceof WIN.Date) {
          return 'date';
        }

        if (o instanceof WIN.RegExp) {
          return 'regexp';
        }

        if (o.length && o.item) {
          return 'collection';
        }

        if (o.length && o.callee) {
          return 'arguments';
        }

        return typeof o;
      },
      detach: o => {
        let r;

        switch ($J.typeOf(o)) {
          case 'object':
            r = {};

            for (const p in o) {
              if (Object.prototype.hasOwnProperty.call(o, p)) {
                r[p] = $J.detach(o[p]);
              }
            }

            break;

          case 'array':
            r = [];

            for (let i = 0, l = o.length; i < l; i++) r[i] = $J.detach(o[i]);

            break;

          default:
            return o;
        }

        return $J.$(r);
      },
      $: o => {
        let result = o;

        switch ($J.typeOf(o)) {
          case 'string':
            {
              const el = DOC.getElementById(o);

              if ($J.defined(el)) {
                result = $J.$(el);
              } else {
                result = null;
              }

              break;
            }

          case 'window':
          case 'document':
            if (STORAGE.has(o)) {
              result = STORAGE.get(o);
            } else {
              result = new Doc(o);
            }

            break;

          case 'element':
            if (STORAGE.has(o)) {
              result = STORAGE.get(o);
            } else {
              result = new Element(o);
            }

            break;

          case 'event':
            result = new $J.Events.MagicEvent(o);
            break;
          // no default
        }

        return result;
      },

      /**
       * Creates new dom element
       *
       * @param   {String}
       *
       * @returns
       */
      $new: (tag, props, css) => {
        return $J.$(DOC.createElement(tag)).setProps(props || {}).setCss(css || {});
      },

      /**
       * Adds new CSS style definition to the document
       *
       * @param {String} selector CSS selector
       * @param {String|Object} css CSS rules
       * @param {String} [id] Identifier of the style sheet. Optional.
       * @param {dom object} [root] Context of searching element by id
       *
       * @return {Number} position of the added CSS within the style sheet
       */
      addCSS: (selector, css, id, root) => {
        let rootNode = DOC.head || DOC.body;

        if (root) {
          rootNode = $(root).node || root;
        }

        if (!id) {
          id = $J.stylesId;
        }

        let style = $(rootNode.querySelector('#' + id));

        if (!style) {
          style = $J.$new('style').attr('id', id).attr('type', 'text/css');
          rootNode.insertBefore(style.node, rootNode.firstChild);
        }

        let sheet = style.node.sheet;

        if (!sheet) {
          sheet = style.node.styleSheet;
        }

        if ($J.typeOf(css) !== 'string') {
          css = Object.entries(css).map(values => values[0] + ':' + values[1]).join(';');
        }

        let idx = -1;

        if (sheet.insertRule) {
          idx = sheet.insertRule(selector + ' {' + css + '}', sheet.cssRules.length);
        } else {
          idx = sheet.addRule(selector, css);
        }

        return idx;
      },

      /**
       * Remove CSS rule by index from a particular stylesheet
       *
       * @param {String} id Identifier of the style sheet
       * @param {Number} index Position of the CSS to be removed within the style sheet
       */
      removeCSS: (id, index) => {
        if ($J.typeOf(style) !== 'element') {
          return;
        }

        const style = $J.$(id);
        const sheet = style.sheet || style.styleSheet;

        if (sheet.deleteRule) {
          sheet.deleteRule(index);
        } else if (sheet.removeRule) {
          sheet.removeRule(index);
        }
      },

      /**
       * Create UUID
       * @return {String}
       */
      generateUUID: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        }).toUpperCase();
      },

      /**
       * Retrieve absolute URL of a given link
       * @param {String} url link
       * @return {String}
       */
      getAbsoluteURL: (() => {
        let a;
        return url => {
          if (!a) a = DOC.createElement('a');
          a.setAttribute('href', url);
          return ('!!' + a.href).replace('!!', '');
        };
      })(),

      /**
       * String hash function similar to java.lang.String.hashCode().
       *
       * @param {String} s A string.
       * @return {Number} Hash value for {@code s}, between 0 (inclusive) and 2^32
       *  (exclusive). The empty string returns 0.
       */
      getHashCode: s => {
        let r = 0;
        const l = s.length;

        for (let i = 0; i < l; ++i) {
          r = 31 * r + s.charCodeAt(i);
          r %= 0x100000000;
        }

        return r;
      },

      /**
       * Return camel-case string
       *
       * @param {String}
       *
       * @returns {String}    - string in camel-case
       */
      camelize: str => {
        return str.replace(/-\D/g, m => {
          return m.charAt(1).toUpperCase();
        });
      },

      /**
       * Return hyphenated string
       *
       * @param {String}
       *
       * @returns {String} - hyphenated string
       */
      dashize: function (str) {
        return str.replace(/[A-Z]/g, m => {
          return '-' + m.charAt(0).toLowerCase();
        });
      },

      /**
       * Check if string contains substring
       *
       * @param {string}      - source
       * @param {string}      - needle to find
       * @param {string}      - Optional. Separator
       *
       * @returns {bool}      - True if the needle found, False otherwise
       */
      stringHas: (source, str, sep) => {
        sep = sep || '';
        return (sep + source + sep).indexOf(sep + str + sep) > -1;
      }
    };
    const $J = magicJS;
    const $j = magicJS.$; //eslint-disable-line no-unused-vars

    const $ = $J.$;
    /* eslint-env es6 */

    /* global $J, WIN, DOC, UND, DocumentTouch */

    /* eslint-disable dot-notation */

    /* eslint new-parens: "off" */

    /* eslint no-extra-boolean-cast: "off" */

    /* eslint no-unused-vars: ["error", { "args": "none" }] */

    /**
      *     Browser engines
      *         Gecko:
      *             1.81 - Firefox 2
      *             1.90 - Firefox 3
      *             1.91 - Firefox 3.5
      *             1.92 - Firefox 3.6
      *             2.0  - Firefox 4.0
      *             5    - Firefox 5.0
      *             ...
      *             25    - Firefox 25
      *
      *         Trident:
      *             7 - IE 11
      */
    // Normalized event names

    const EVENTS_MAP = {}; // Shortcut for userAgent

    const _UA = navigator.userAgent.toLowerCase();

    const _engine = _UA.match(/(webkit|gecko|trident)\/(\d+\.?\d*)/i);

    const _version = _UA.match(/(edge|opr)\/(\d+\.?\d*)/i) || _UA.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);

    const _safariVer = _UA.match(/version\/(\d+\.?\d*)/i);

    class Browser {
      constructor() {
        this._magicClasses = []; // Extra CSS classes applied to <html> (e.g. lt-ie9-magic, mobile-magic)

        this._features = {
          fullScreen: !!(DOC.fullscreenEnabled || DOC.msFullscreenEnabled || DOC.webkitFullScreenEnabled || DOC.webkitFullscreenEnabled),
          cssFilters: false // ie11 does not support

        };

        this._touchScreen = (() => {
          return 'ontouchstart' in WIN || WIN.DocumentTouch && DOC instanceof DocumentTouch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        })();

        this._mobile = !!_UA.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/);

        this._engine = (() => {
          let result = 'unknown';

          if (_engine && _engine[1]) {
            result = _engine[1].toLowerCase();
          } else if (!!WIN.ActiveXObject) {
            result = 'trident';
          } else if (DOC.getBoxObjectFor !== UND || WIN.mozInnerScreenY !== null) {
            result = 'gecko';
          } else if (WIN.WebKitPoint !== null || !navigator.taintEnabled) {
            result = 'webkit';
          }

          return result;
        })();

        this._chrome = false;
        this._webkit = this._engine === 'webkit';
        this._gecko = this._engine === 'gecko';
        this._trident = this._engine === 'trident';
        this._androidBrowser = false;
        this._version = _engine && _engine[2] ? parseFloat(_engine[2]) : 0;
        this._uaName = _version && _version[1] ? _version[1].toLowerCase() : '';
        this._uaVersion = _version && _version[2] ? parseFloat(_version[2]) : 0;
        this._cssPrefix = '';
        this._cssDomPrefix = '';
        this._domPrefix = '';
        this._ieMode = 0;

        this._platform = (() => {
          let result;

          if (_UA.match(/ip(?:ad|od|hone)/)) {
            result = 'ios';
          } else {
            result = _UA.match(/(?:webos|android)/);

            if (!result) {
              result = navigator.platform.match(/mac|win|linux/i);

              if (!result) {
                result = ['other'];
              }
            }

            result = result[0].toLowerCase();
          }

          return result;
        })();

        this._backCompat = DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat';
        this._scrollbarsWidth = 0;
        this._ready = false;
        this.calculate();
      }

      calculate() {
        switch (this._engine) {
          case 'trident':
            if (!this._version) {
              this._version = !!WIN.XMLHttpRequest ? 3 : 2;
            }

            break;

          case 'gecko':
            this._version = _version && _version[2] ? parseFloat(_version[2]) : 0;
            break;
          // no default
        }

        if (_version && _version[1] === 'crios') {
          this._uaName = 'chrome';
        }

        if (!!WIN.chrome) {
          this._chrome = true;
        }

        if (this._uaName === 'safari' && _safariVer && _safariVer[1]) {
          this._uaVersion = parseFloat(_safariVer[1]);
        }

        if (this._platform === 'android' && this._webkit && _safariVer && _safariVer[1]) {
          this._androidBrowser = true;
        } // browser prefixes


        const prefixes = {
          gecko: ['-moz-', 'Moz', 'moz'],
          webkit: ['-webkit-', 'Webkit', 'webkit'],
          trident: ['-ms-', 'ms', 'ms']
        }[this._engine] || ['', '', ''];
        this._cssPrefix = prefixes[0];
        this._cssDomPrefix = prefixes[1];
        this._domPrefix = prefixes[2]; // for ie 11

        this._ieMode = (() => {
          if (this._trident && DOC.documentMode) {
            return DOC.documentMode;
          }

          return UND;
        })(); // Mobile Safari engine in the “request desktop site” mode on iOS/iPadOS.
        // Since iPadOS 13, Safari's “request desktop site” setting is turned on by default for all websites


        if (!this._mobile && this._platform === 'mac' && this._touchScreen) {
          this._mobile = true;
          this._platform = 'ios';
        }

        this._magicClasses.push(this._platform + '-magic');

        if (this._mobile) {
          this._magicClasses.push('mobile-magic');
        }

        if (this._androidBrowser) {
          this._magicClasses.push('android-browser-magic');
        }

        if (this._ieMode) {
          // Add CSS class of the IE version to <html> for possible tricks
          this._uaName = 'ie';
          this._uaVersion = this._ieMode;

          this._magicClasses.push('ie' + this._ieMode + '-magic'); // for (let i = 11; i > this._ieMode; i--) {
          //     this._magicClasses.push('lt-ie' + i + '-magic');
          // }

        } // if (this._webkit && this._version < 536) { // Disable fullscreen in old Safari
        //     this._features.fullScreen = false;
        // }


        this._magicClasses.push('svg-magic');

        const exClasses = (DOC.documentElement.className || '').match(/\S+/g) || [];
        DOC.documentElement.className = exClasses.concat(this._magicClasses).join(' ');

        try {
          DOC.documentElement.setAttribute('data-magic-ua', $J.browser.uaName);
          DOC.documentElement.setAttribute('data-magic-ua-ver', $J.browser.uaVersion);
          DOC.documentElement.setAttribute('data-magic-engine', $J.browser.engine);
          DOC.documentElement.setAttribute('data-magic-engine-ver', $J.browser.version); // DOC.documentElement.setAttribute('data-magic-features', magicClasses.join(' '));
        } catch (ex) {// empty
        } // Map pointer events for IE 10.


        if (!WIN.navigator.pointerEnabled) {
          ['Down', 'Up', 'Move', 'Over', 'Out'].forEach(type => {
            // EVENTS_MAP['pointer' + type.toLowerCase()] = WIN.navigator.msPointerEnabled ? 'MSPointer' + type : -1;
            const evt = 'pointer' + type.toLowerCase();

            if (this._uaName === 'edge') {
              EVENTS_MAP[evt] = evt;
            } else if (WIN.navigator.msPointerEnabled) {
              EVENTS_MAP[evt] = 'MSPointer' + type;
            } else {
              EVENTS_MAP[evt] = -1;
            }
          });
        }
      }
      /**
       * Browser supported features
       */


      get features() {
        return this._features;
      }
      /**
       * Touch screen support
       */


      get touchScreen() {
        return this._touchScreen;
      }
      /**
       * Mobile device?
       */


      get mobile() {
        return this._mobile;
      }
      /**
       * Browser engine
       */


      get engine() {
        return this._engine;
      }
      /**
       * Browser engine version
       */


      get version() {
        return this._version;
      }
      /**
       * Browser name & version
       */


      get uaName() {
        return this._uaName;
      }

      get uaVersion() {
        return this._uaVersion;
      } // prefix for css properties like -webkit-box-shadow


      get cssPrefix() {
        return this._cssPrefix;
      } // prefix for style properties like element.style.WebkitBoxShadow


      get cssDomPrefix() {
        return this._cssDomPrefix;
      } // DOM prefix


      get domPrefix() {
        return this._domPrefix;
      }
      /**
       * IE document mode
       */


      get ieMode() {
        return this._ieMode;
      }
      /**
       * Platform
       *
       * mac      - Mac OS
       * win      - Windows
       * linux    - Linux
       * ios      - Apple iPod/iPhone/iPad
       *
       */


      get platform() {
        return this._platform;
      }
      /**
       * Browser box model
       *
       * Basically used to determine how IE renders in quirks mode
       */


      get backCompat() {
        return this._backCompat;
      }
      /**
       * Width of the browser's scrollbars
       */


      get scrollbarsWidth() {
        return this._scrollbarsWidth;
      }
      /**
       * Reference to the real document element
       *
       * Used to correct work with page dimension
       */
      // eslint-disable-next-line class-methods-use-this


      get doc() {
        return DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat' ? DOC.body : DOC.documentElement;
      }

      /**
       * Indicates that DOM content is ready for manipulation
       *
       * @see domready
       */
      get ready() {
        return this._ready;
      }

      get chrome() {
        return this._chrome;
      }

      get webkit() {
        return this._webkit;
      }

      get gecko() {
        return this._gecko;
      }

      get trident() {
        return this._trident;
      }

      get androidBrowser() {
        return this._androidBrowser;
      }
      /**
       * Fires when DOM content is ready for manipulation
       *
       * @see domready
       */


      onready() {
        if (this._ready) {
          return;
        }

        this._ready = true;

        try {
          // Calculate width of browser's scrollbars
          const tmp = $J.$new('div').setCss({
            width: 100,
            height: 100,
            overflow: 'scroll',
            position: 'absolute',
            top: -9999
          }).appendTo(DOC.body);
          this._scrollbarsWidth = tmp.node.offsetWidth - tmp.node.clientWidth;
          tmp.remove();
        } catch (ex) {// empty
        }

        try {
          // Test CSS filters support
          const node = $J.$new('div');
          node.node.style.cssText = $J.dashize('filter') + ':blur(2px);';
          this._features.cssFilters = !!node.node.style.length;
        } catch (ex) {// empty
        }

        if (!this._features.cssFilters) {
          $J.$(DOC.documentElement).addClass('no-cssfilters-magic');
        } // if (WIN.TransitionEvent === UND && WIN.WebKitTransitionEvent !== UND) {
        //     EVENTS_MAP['transitionend'] = 'webkitTransitionEnd';
        // }


        $J.$(DOC).callEvent('domready');
      }

    }

    $J.browser = new Browser();

    (() => {
      const getCancel = () => {
        let result = DOC.exitFullscreen || DOC.cancelFullScreen || DOC[$J.browser.domPrefix + 'ExitFullscreen'] || DOC[$J.browser.domPrefix + 'CancelFullScreen'];

        if (!result) {
          result = () => {};
        }

        return result;
      };

      const getChangeEventName = () => {
        let result;

        if (DOC.msExitFullscreen) {
          result = 'MSFullscreenChange';
        } else {
          if (DOC.exitFullscreen) {
            result = '';
          } else {
            result = $J.browser.domPrefix;
          }

          result += 'fullscreenchange';
        }

        return result;
      };

      const getErrorEventName = () => {
        let result;

        if (DOC.msExitFullscreen) {
          result = 'MSFullscreenError';
        } else {
          if (DOC.exitFullscreen) {
            result = '';
          } else {
            result = $J.browser.domPrefix;
          }

          result += 'fullscreenerror';
        }

        return result;
      };

      const callRequestFullscreen = el => {
        let f = el.requestFullscreen || el[$J.browser.domPrefix + 'RequestFullscreen'] || el[$J.browser.domPrefix + 'RequestFullScreen'];

        if (!f) {
          f = () => {};
        }

        f.call(el);
      };

      const fullScreen = {
        capable: $J.browser.features.fullScreen,
        enabled: () => {
          return !!(DOC.fullscreenElement || DOC[$J.browser.domPrefix + 'FullscreenElement'] || DOC.fullScreen || DOC.webkitIsFullScreen || DOC[$J.browser.domPrefix + 'FullScreen']);
        },
        request: (el, opts) => {
          if (!opts) {
            opts = {};
          }

          if (fullScreen.capable && !opts.windowFullscreen) {
            fullScreen.onchange = e => {
              // onfullscreenchange event
              if (fullScreen.enabled()) {
                // we entered full-screen mode
                if (opts.onEnter) {
                  opts.onEnter();
                }
              } else {
                // left fullscreen mode
                $J.$(DOC).removeEvent(fullScreen.changeEventName, fullScreen.onchange);

                if (opts.onExit) {
                  opts.onExit();
                }
              }
            };

            $J.$(DOC).addEvent(fullScreen.changeEventName, fullScreen.onchange);

            fullScreen.onerror = e => {
              // onfullscreenchange event
              if (opts.fallback) {
                opts.fallback();
              }

              $J.$(DOC).removeEvent(fullScreen.errorEventName, fullScreen.onerror);
            }; // if native fullscreen failed, enter pseudo mode


            $J.$(DOC).addEvent(fullScreen.errorEventName, fullScreen.onerror);
            callRequestFullscreen($(el).node);
          } else if (opts.fallback) {
            opts.fallback();
          }
        },
        cancel: getCancel(),
        changeEventName: getChangeEventName(),
        errorEventName: getErrorEventName(),
        prefix: $J.browser.domPrefix,
        activeElement: null
      };
      $J.browser.fullScreen = fullScreen;
    })();
    /* eslint-env es6 */

    /* global WIN, DOC, UND, STORAGE, EVENTS_MAP */

    /* eslint-disable quote-props */

    /* eslint no-restricted-syntax: ["error", "WithStatement"] */

    /* eslint-disable camelcase */
    // Not whitespace regexp
    // const r_nwp = /\S+/g;


    const r_cssToNum = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/; // normalize CSS names

    const cssMap = {}; // Unitless CSS properties (w/o 'px')

    const nopxCSS = {
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'zIndex': true,
      'zoom': true
    };

    const getCssValue = (e, name) => {
      const css = WIN.getComputedStyle(e, null);
      return css ? css.getPropertyValue(name) || css[name] : null;
    }; // Returns normalize CSS name (probably with a vendor prefix)


    const normalizeCSS = name => {
      const standard = (name in DOC.documentElement.style); // if ( !(name in DOC.documentElement.style) ) {

      if (!standard) {
        const pName = $J.browser.cssDomPrefix + name.charAt(0).toUpperCase() + name.slice(1);

        if (pName in DOC.documentElement.style) {
          return pName;
        }
      }

      return name;
    };

    $J.normalizeCSS = normalizeCSS;

    class Base {
      constructor(node) {
        this.node = node;
        this.$J_UUID = ++$J.UUID;
        this.$J_TYPE = null;

        this.$J_EXT = () => {};

        STORAGE.set(this.node, this);
      }
      /**
       * Retreive object's property from the global storage
       *
       * @param  {string}    - property name
       * @param  {mixed}     - default value
       *
       * @returns {mixed}     - property value
       */


      fetch(prop, def) {
        const s = $J.getStorage(this.$J_UUID);
        let p = s[prop];
        let result = null;

        if (def !== UND && p === UND) {
          s[prop] = def;
          p = s[prop];
        }

        if ($J.defined(p)) {
          result = p;
        }

        return result;
      }
      /**
       * Store object's property in the global storage
       *
       * @param  {string}    - property name
       * @param  {mixed}     - value
       *
       * @returns {element}   - HTML element
       */


      store(prop, val) {
        const s = $J.getStorage(this.$J_UUID);
        s[prop] = val;
        return this;
      }
      /**
       * Delete object's property from the global storage
       *
       * @param  {string}    - property name
       *
       * @returns {element}   - HTML element
       */


      del(prop) {
        const s = $J.getStorage(this.$J_UUID);
        delete s[prop];
        return this;
      }
      /**
       * Add event listener
       *
       * @param  type  {Mixed}     event type
       * @param  fn  {Function}    listener
       * @param  [priority=10] {Integer} order in which the listener will be called
       */


      addEvent(type, fn, priority, options) {
        if ($J.typeOf(type) === 'array') {
          type.forEach(__type => {
            // this.addEvent.call(this, __type, fn, priority, options);
            this.addEvent(__type, fn, priority, options);
          });
          return this;
        } // Normalize event name


        type = EVENTS_MAP[type] || type;

        if (!type || !fn || $J.typeOf(type) !== 'string' || $J.typeOf(fn) !== 'function') {
          return this;
        }

        if (type === 'domready' && $J.browser.ready) {
          // fn.call(this);
          fn();
          return this;
        }

        priority = parseInt(priority || 50, 10);

        if (!fn.$J_EUID) {
          fn.$J_EUID = Math.floor(Math.random() * +new Date());
        } // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});


        const events = this.fetch('_EVENTS_', {});
        let handlers = events[type];

        if (!handlers) {
          // Initialize event handlers queue
          handlers = [];
          events[type] = handlers;

          if ($J.Events.handlers[type]) {
            $J.Events.handlers[type].add.call(this, options); // $J.Events.handlers[type].add(this, options);
          } else {
            // handlers['handle'] = function (e) {
            handlers['handle'] = e => {
              e = Object.assign(e || WIN.e, {
                $J_TYPE: 'event'
              }); // $J.Doc.callEvent.call(_self, type, $J.$(e));

              this.callEvent(type, $J.$(e));
            };

            this.node[$J._event_add_]($J._event_prefix_ + type, handlers['handle'], false);
          }
        }

        const fnObj = {
          type: type,
          fn: fn,
          priority: priority,
          euid: fn.$J_EUID
        };
        handlers.push(fnObj);
        handlers.sort((a, b) => {
          return a.priority - b.priority;
        });
        return this;
      } // removeEvent(type/*, fn */) {


      removeEvent(...args) {
        // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});
        const events = this.fetch('_EVENTS_', {}); // let del;

        let type = args[0]; // const fn = arguments.length > 1 ? arguments[1] : -100;

        const fn = args.length > 1 ? args[1] : -100;

        if ($J.typeOf(type) === 'array') {
          // $J.$(type).each(this.removeEvent.bindAsEvent(this, fn));
          type.forEach(__type => {
            this.removeEvent(__type, fn);
          });
          return this;
        } // Normalize event name


        type = EVENTS_MAP[type] || type;

        if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {
          return this;
        }

        const handlers = events[type] || [];

        for (let k = 0; k < handlers.length; k++) {
          const fnObj = handlers[k];

          if (fn === -100 || !!fn && fn.$J_EUID === fnObj.euid) {
            // del = handlers.splice(k--, 1);
            handlers.splice(k--, 1);
          }
        }

        if (handlers.length === 0) {
          if ($J.Events.handlers[type]) {
            $J.Events.handlers[type].remove.call(this);
          } else {
            this.node[$J._event_del_]($J._event_prefix_ + type, handlers['handle'], false);
          }

          delete events[type];
        }

        return this;
      }

      callEvent(type, e) {
        const events = this.fetch('_EVENTS_', {}); // Normalize event name

        type = EVENTS_MAP[type] || type;

        if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {// return this;
        } else {
          try {
            if (!e || !e.type) {
              e = Object.assign(e || {}, {
                type: type
              });
            }
          } catch (ev) {// empty
          }

          if (e.timeStamp === UND) {
            e.timeStamp = +new Date();
          }

          const handlers = events[type] || [];

          for (let k = 0; k < handlers.length && !(e.isQueueStopped && e.isQueueStopped()); k++) {
            handlers[k].fn.call(this, e);
          }
        }
      }

      raiseEvent(type, name) {
        const _native = type !== 'domready';

        let o = this; // Normalize event name

        type = EVENTS_MAP[type] || type;

        if (!_native) {
          this.callEvent(type);
          return this;
        }

        if (o === DOC && DOC.createEvent && !o.dispatchEvent) {
          o = DOC.documentElement;
        }

        let e;

        if (DOC.createEvent) {
          e = DOC.createEvent(type);
          e.initEvent(name, true, true);
        } else {
          e = DOC.createEventObject();
          e.eventType = type;
        }

        if (DOC.createEvent) {
          o.dispatchEvent(e);
        } else {
          o.fireEvent('on' + name, e);
        }

        return e;
      }

      clearEvents() {
        const events = this.fetch('_EVENTS_');

        if (!events) {
          return this;
        }

        Object.keys(events).forEach(_type => {
          this.removeEvent(_type);
        });
        this.del('_EVENTS_');
        return this;
      }

    } // eslint-disable-next-line no-unused-vars


    class Element extends Base {
      constructor(node) {
        super(node);
        this.$J_TYPE = 'magicjs-element';
      } // Full screen


      requestFullScreen() {
        if ($J.browser.fullScreen.capable && !DOC.requestFullScreen) {
          $J.browser.fullScreen.request(this.node);
        } else {
          this.node.requestFullScreen(this.node);
        }
      }
      /**
       * Adds class(es) to element
       *
       * @param {String}   val   One or more space-separated classes to be added
       *
       * @returns {Element}    Reference to the element itself
       */


      addClass(...args) {
        args.forEach(className => {
          this.node.classList.add(className);
        });
        return this;
      }
      /**
       * Removes class(es) from element.
       *
       * @param {String}  [val] One or more space-separated classes to be removed. If omitted, remove all classes.
       *
       * @returns {Element}    Reference to the element itself
       */


      removeClass(val) {
        this.node.classList.remove(val);
        return this;
      }
      /**
       * Toogles a class on element
       *
       * @param {String}   val  A class name to be toggled
       *
       * @returns {Element}    Reference to the element itself
       */
      // toggleClass(val) {
      //     this.node.classList.toggle(val);
      //     return this;
      // }

      /**
       * Retrieves element's css style
       *
       * @param {String}   property CSS property to retrieve
       *
       * @returns {Mixed}     Value of CSS property
       */


      getCss(p) {
        const cssName = $J.camelize(p);

        if (!cssMap[cssName]) {
          cssMap[cssName] = normalizeCSS(cssName);
        }

        p = cssMap[cssName];
        let v = getCssValue(this.node, p);

        if (v === 'auto') {
          v = null;
        }

        if (v !== null) {
          if (p === 'opacity') return $J.defined(v) ? parseFloat(v) : 1.0;

          if (r_cssToNum.test(p)) {
            v = parseInt(v, 10) ? v : '0px';
          }
        }

        return v;
      }
      /**
       * Applies a single CSS style to element
       *
       * @param {String}      key        CSS property name
       * @param {Mixed}      value    Value to be set up
       *
       * @returns {Element}   Reference to the element itself
       */


      setCssProp(k, v) {
        const cssName = $J.camelize(k);

        try {
          if (!cssMap[cssName]) {
            cssMap[cssName] = normalizeCSS(cssName);
          }

          k = cssMap[cssName];
          this.node.style[k] = v + ($J.typeOf(v) === 'number' && !nopxCSS[cssName] ? 'px' : '');
        } catch (e) {// empty
        }

        return this;
      }
      /**
       * Applies css styles to element
       *
       * @param {Hash}    styles  Set of the CSS styles to apply
       *
       * @returns {Element}    Reference to the element itself
       */


      setCss(styles) {
        Object.entries(styles).forEach(values => {
          this.setCssProp(...values);
        });
        return this;
      }
      /**
       * Retrieves set of element's css style
       *
       * @param {String[]}   styles   CSS styles to retrieve
       *
       * @returns {Hash}      Set of CSS styles
       */
      // getStyles(...args) {
      //     const r = {};
      //     args.forEach((k) => {
      //         r[k] = this.getCss(k);
      //     });
      //     return r;
      // }


      getStyles(...args) {
        return Object.fromEntries(args.map(value => [value, this.getCss(value)]));
      }
      /**
       * Applies properties to element
       *
       * @param {Hash}    properties  Set of properties to apply
       *
       * @returns {Element}    Reference to the element itself
       */


      setProps(props) {
        Object.entries(props).forEach(values => {
          values[1] = '' + values[1];

          if (values[0] === 'class') {
            this.addClass(values[1]);
          } else {
            this.node.setAttribute(...values);
          }
        });
        return this;
      } // getTransitionDuration() {
      //     let duration = 0;
      //     let delay = 0;
      //     duration = this.getCss('transition-duration');
      //     delay = this.getCss('transition-delay');
      //     if (duration.indexOf('ms') > -1) {
      //         duration = parseFloat(duration);
      //     } else if (duration.indexOf('s') > -1) {
      //         duration = parseFloat(duration) * 1000;
      //     }
      //     if (delay.indexOf('ms') > -1) {
      //         delay = parseFloat(delay);
      //     } else if (delay.indexOf('s') > -1) {
      //         delay = parseFloat(delay) * 1000;
      //     }
      //     return duration + delay;
      // }

      /**
       * Gets size of element
       *
       * @returns {Hash} Size of the element  {width: x, height: x}
       */


      get size() {
        return {
          width: this.node.offsetWidth,
          height: this.node.offsetHeight
        };
      }
      /**
       * Gets size of element for view rendering
       *
       * @returns {Hash} Size of the element  {width: x, height: x}
       */


      render() {
        return this.size;
      }
      /**
       * Gets inner size of element
       *
       * @param  [withPadding=false] {Boolean} include padding in returning size
       *
       * @returns {Hash} Size of the element  {width: x, height: x}
       */


      getInnerSize(withPadding) {
        const size = this.size;
        size.width -= parseFloat(this.getCss('border-left-width') || 0) + parseFloat(this.getCss('border-right-width') || 0);
        size.height -= parseFloat(this.getCss('border-top-width') || 0) + parseFloat(this.getCss('border-bottom-width') || 0);

        if (!withPadding) {
          size.width -= parseFloat(this.getCss('padding-left') || 0) + parseFloat(this.getCss('padding-right') || 0);
          size.height -= parseFloat(this.getCss('padding-top') || 0) + parseFloat(this.getCss('padding-bottom') || 0);
        }

        return size;
      }
      /**
       * Gets scroll offsets
       *
       * @returns {Hash} Number of pixels that element has been scrolled upward and to the left
       */


      get scroll() {
        return {
          top: this.node.scrollTop,
          left: this.node.scrollLeft
        };
      }
      /**
       * Gets scroll offsets from the window top left corner
       *
       * @returns {Hash}
       */


      get fullScroll() {
        let el = this.node;
        const p = {
          top: 0,
          left: 0
        };

        do {
          p.left += el.scrollLeft || 0;
          p.top += el.scrollTop || 0;
          el = el.parentNode;
        } while (el);

        return p;
      }
      /**
       * Gets absolue position of element
       *
       * @returns {Hash} Coordinates of element's top left corner
       */


      get position() {
        const b = this.node.getBoundingClientRect();
        const docScroll = $J.$(DOC).scroll;
        const doc = $J.browser.doc;
        return {
          top: b.top + docScroll.y - doc.clientTop,
          left: b.left + docScroll.x - doc.clientLeft
        };
      }
      /**
       * Gets element's absolute coordinates on a page
       *
       * @returns {Hash}  top/left/bottom/right coordinates
       */


      get rect() {
        const p = this.position;
        const s = this.size;
        return {
          top: p.top,
          bottom: p.top + s.height,
          left: p.left,
          right: p.left + s.width
        };
      }
      /**
       * Sets element content
       *
       * @param {String} content New content
       *
       * @returns {Element}   Reference to the element itself
       */


      changeContent(c) {
        try {
          this.node.innerHTML = c;
        } catch (e) {
          this.node.innerText = c;
        }

        return this;
      }
      /**
       * Removes element from the DOM tree
       *
       * @returns {Element} Reference to the removed element
       */


      remove() {
        let result = this;

        if (this.node.parentNode) {
          result = $J.$(this.node.parentNode.removeChild(this.node));
        } // TODO remove from storage


        return result;
      }
      /**
       * Kills element by removes it DOM tree and clear all events.
       * All child elements will be killed too.
       *
       * @returns Null
       */


      kill() {
        Array.from(this.node.childNodes).forEach(o => {
          if (o.nodeType === 3 || o.nodeType === 8) {
            return;
          }

          $J.$(o).kill();
        });
        this.remove();
        this.clearEvents();

        if (this.$J_UUID) {
          $J.storage[this.$J_UUID] = null;
          delete $J.storage[this.$J_UUID];
        }

        return null;
      }
      /**
       * Appends child element
       *
       * @param  {Element}   element  Element to append
       * @param  {String}    [position='bottom']  Where to append: top/bottom.
       *
       * @returns {Element}    Reference to the element itself
       */


      append(o, p = 'bottom') {
        const f = this.node.firstChild;
        o = $J.$(o);

        if (p === 'top' && f) {
          this.node.insertBefore(o.node, f);
        } else {
          this.node.appendChild(o.node || o);
        }

        return this;
      }
      /**
       * Appends element to parent
       *
       * @param  {Element}   parent   Parent element
       * @param  {String}    [position='bottom']  Where to append: top/bottom.
       *
       * @returns {Element}    Reference to the element itself
       */


      appendTo(o, p) {
        // return $J.$(o).append(this, p);
        $J.$(o).append(this, p);
        return this;
      }

      get tagName() {
        return this.node.tagName.toLowerCase();
      }

      attr(attrName, attrValue) {
        let result = this;

        if ($J.defined(attrValue)) {
          this.node.setAttribute(attrName, attrValue);
        } else {
          result = this.node.getAttribute(attrName);

          if (!result || $J.typeOf(result) !== 'string' || result.trim() === '') {
            result = null;
          }
        }

        return result;
      }

      removeAttr(attrName) {
        this.node.removeAttribute(attrName);
        return this;
      }
      /**
       * Checks if the specified class applied to the element
       * @param  {String}  cName Class to check
       * @return {Boolean}
       */


      hasClass(cName) {
        // Use `classList` if browser supports it.
        if (this.node.classList) {
          return this.node.classList.contains(cName);
        }

        let className = this.node.className;

        if (this.node.className instanceof SVGAnimatedString) {
          className = this.node.className.baseVal;
        }

        return !$J.stringHas(cName || '', ' ') && $J.stringHas(className || '', ' ');
      }

      hasAttribute(attrName) {
        return this.node.hasAttribute(attrName);
      }

    }
    /* eslint-disable class-methods-use-this */
    // eslint-disable-next-line no-unused-vars


    class Doc extends Base {
      constructor(node) {
        super(node);
        let type = 'magicjs-document';

        if (node === WIN) {
          type = 'magicjs-window';
        }

        this.$J_TYPE = type;
      }
      /**
       * Gets size of browser window
       */


      get size() {
        if ($J.browser.touchScreen) {
          return {
            width: WIN.innerWidth,
            height: WIN.innerHeight
          };
        }

        return {
          width: $J.browser.doc.clientWidth,
          height: $J.browser.doc.clientHeight
        };
      }
      /**
       * Gets window scroll offsets
       */


      get scroll() {
        return {
          x: WIN.pageXOffset || $J.browser.doc.scrollLeft,
          y: WIN.pageYOffset || $J.browser.doc.scrollTop
        };
      }
      /**
       * Get full page size including scroll
       */


      get fullSize() {
        const s = this.size;
        return {
          width: Math.max($J.browser.doc.scrollWidth, s.width),
          height: Math.max($J.browser.doc.scrollHeight, s.height)
        };
      }

    }
    /* eslint-env es6 */

    /* global magicJS, $J */

    /* global WIN, DOC, UND */

    /* global EVENTS_MAP */

    /* eslint-disable dot-notation */

    /* eslint-disable no-unused-vars */

    /* eslint no-restricted-syntax: ["error", "WithStatement", "BinaryExpression[operator='in']"] */

    /* eslint no-unused-vars: ["error", { "args": "none" }] */


    $J.Events = {};
    /**
     * Contains Event methods, custom Events and Element methods to dealing with events.
     * @class Contains Event methods, custom Events and Element methods to dealing with events.
     */

    class MagicEvent {
      constructor(originEvent) {
        this.oe = originEvent;
        this.$J_TYPE = 'event';
        this.isQueueStopped = $J.$false;
        this.type = this.oe.type;
        this.timeStamp = this.oe.timeStamp;
        this.propertyName = this.oe.propertyName;
        this.pointerType = this.oe.pointerType;
      }

      get originEvent() {
        return this.oe;
      }
      /**
       * Stop event propagation and default actions.
       * @return {Event}
       */


      stop() {
        return this.stopDistribution().stopDefaults();
      }
      /**
       * Stop event propagation.
       * @return {Event}
       */


      stopDistribution() {
        if (this.oe.stopPropagation) {
          // if (this.oe.cancelable) {
          this.oe.stopPropagation(); // }
        } else {
          this.oe.cancelBubble = true;
        }

        return this;
      }
      /**
       * Stop default action.
       * @return {Event}
       */


      stopDefaults() {
        if (this.oe.preventDefault) {
          this.oe.preventDefault();
        } else {
          this.oe.returnValue = false;
        }

        return this;
      }
      /**
       * Prevent other listeners to handle the event.
       * @return {Event}
       */


      stopQueue() {
        this.isQueueStopped = $J.$true;
        return this;
      }
      /**
       * Return mouse/pointer coordinates relative to the viewport.
       * @return {Object}
       */


      get clientXY() {
        let src;
        let result = {
          x: 0,
          y: 0
        };

        if (/touch/i.test(this.type)) {
          src = this.oe.changedTouches[0];
        } else {
          src = this.oe;
        }

        if ($J.defined(src)) {
          result = {
            x: src.clientX,
            y: src.clientY
          };
        }

        return result;
      }
      /**
       * Return mouse/pointer coordinates relative to the viewport, including scroll offset.
       * @return {Object}
       */


      get pageXY() {
        let src = this.oe;

        if (/touch/i.test(this.type)) {
          src = this.oe.changedTouches[0];
        }

        if ($J.defined(src)) {
          return {
            x: src.pageX || src.clientX + $J.browser.doc.scrollLeft,
            y: src.pageY || src.clientY + $J.browser.doc.scrollTop
          };
        }

        return {
          x: 0,
          y: 0
        };
      }
      /**
       * Return target element.
       * @return {Element}
       */


      get target() {
        let t = this.oe.target;

        if (!t) {
          t = this.oe.srcElement;
        }

        while (t && t.nodeType === 3) {
          t = t.parentNode;
        }

        return t;
      }
      /**
       * Return related element.
       * @return {Element}
       */


      get related() {
        let r = null;

        switch (this.type) {
          case 'mouseover':
          case 'pointerover':
          case 'MSPointerOver':
            r = this.oe.relatedTarget;

            if (!r) {
              r = this.oe.fromElement;
            }

            break;

          case 'mouseout':
          case 'pointerout':
          case 'MSPointerOut':
            r = this.oe.relatedTarget;

            if (!r) {
              r = this.oe.toElement;
            }

            break;

          default:
            return r;
        }

        try {
          while (r && r.nodeType === 3) {
            r = r.parentNode;
          }
        } catch (ex) {
          r = null;
        }

        return r;
      }
      /**
       * Return clicked button
       *  1 - left, 2 - middle, 3 - right
       *
       * @returns  {integer}   button index
       */


      get button() {
        let result = this.oe.which;

        if (!this.oe.which && this.oe.button !== UND) {
          if (this.oe.button & 1) {
            result = 1;
          } else if (this.oe.button & 2) {
            result = 3;
          } else if (this.oe.button & 4) {
            result = 2;
          } else {
            result = 0;
          }
        }

        return result;
      }
      /**
       * Return true if it's a Touch/Pointer event.
       * @return {Boolean}
       */


      isTouchEvent() {
        return this.oe.pointerType && (this.oe.pointerType === 'touch' || this.oe.pointerType === this.oe.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type);
      }
      /**
       * Return true if it's a primary Touch/Pointer event.
       * @return {Boolean}
       */


      isPrimaryTouch() {
        if (this.oe.pointerType) {
          return (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType) && this.oe.isPrimary;
        } else if (this.oe instanceof WIN.TouchEvent) {
          return this.oe.changedTouches.length === 1 && (this.oe.targetTouches.length ? this.oe.targetTouches[0].identifier === this.oe.changedTouches[0].identifier : true);
        }

        return false;
      }
      /**
       * Return reference to the primary Touch/Pointer event.
       * @return {Object}
       */


      get primaryTouch() {
        let result = null;

        if (this.oe.pointerType) {
          if (this.oe.isPrimary && (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType)) {
            result = this.oe;
          }
        } else if (this.oe instanceof WIN.TouchEvent) {
          result = this.oe.changedTouches[0];
        }

        return result;
      }
      /**
       * Return identifier of the primary Touch/Pointer event.
       * @return {Int}
       */


      get primaryTouchId() {
        let result = null;

        if (this.oe.pointerType) {
          if (this.oe.isPrimary && (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType)) {
            result = this.oe.pointerId;
          }
        } else if (this.oe instanceof WIN.TouchEvent) {
          result = this.oe.changedTouches[0].identifier;
        }

        return result;
      }

    }

    $J.Events.MagicEvent = MagicEvent;
    /* Extend Element and Document prototypes */

    $J._event_add_ = 'addEventListener';
    $J._event_del_ = 'removeEventListener';
    $J._event_prefix_ = '';

    if (!DOC.addEventListener) {
      $J._event_add_ = 'attachEvent';
      $J._event_del_ = 'detachEvent';
      $J._event_prefix_ = 'on';
    }

    class Custom {
      constructor(e) {
        this.$J_TYPE = 'event.custom';
        this.magicEvent = e.$J_TYPE === 'event' ? e : e.magicEvent;
        this.type = this.magicEvent.type;
        this._target = null;
        this.x = this.magicEvent.oe.x;
        this.y = this.magicEvent.oe.y;
        this.timeStamp = this.magicEvent.oe.timeStamp;
        this.relatedTarget = this.magicEvent.related;
        this.isQueueStopped = this.magicEvent.isQueueStopped; // TODO $J.$false

        this.events = [];
      }

      get originEvent() {
        return this.magicEvent.originEvent;
      }

      pushToEvents(e) {
        const eventCopy = e;
        this.events.push(eventCopy);
      }

      stop() {
        return this.stopDistribution().stopDefaults();
      }

      stopDistribution() {
        this.events.forEach(e => {
          try {
            e.stopDistribution();
          } catch (ex) {// empty
          }
        });
        return this;
      }

      stopDefaults() {
        this.events.forEach(e => {
          try {
            e.stopDefaults();
          } catch (ex) {// empty
          }
        });
        return this;
      }

      stopQueue() {
        this.isQueueStopped = $J.$true;
        this.magicEvent.stopQueue();
        return this;
      }
      /**
       * Return mouse/pointer coordinates relative to the viewport.
       * @return {Object}
       */


      get clientXY() {
        return {
          x: this.clientX || this.magicEvent.oe.clientX,
          y: this.clientY || this.magicEvent.oe.clientY
        };
      }
      /**
       * Return mouse/pointer coordinates relative to the viewport, including scroll offset.
       * @return {Object}
       */


      get pageXY() {
        return {
          x: this.x,
          y: this.y
        };
      }

      get target() {
        return this._target || this.magicEvent.oe.target;
      }

      get related() {
        return this.relatedTarget;
      }

      get button() {
        return this.magicEvent.button; // return this.button;
      }

      get originalTarget() {
        if (this.events.length > 0) {
          return this.events[0].target;
        }

        return UND;
      }
      /**
       * Return true if it's a Touch/Pointer event.
       * @return {Boolean}
       */


      isTouchEvent() {
        return this.magicEvent.isTouchEvent();
      }
      /**
       * Return true if it's a primary Touch/Pointer event.
       * @return {Boolean}
       */


      isPrimaryTouch() {
        return this.magicEvent.isPrimaryTouch();
      }
      /**
       * Return reference to the primary Touch/Pointer event.
       * @return {Object}
       */


      get primaryTouch() {
        return this.magicEvent.primaryTouch;
      }
      /**
       * Return identifier of the primary Touch/Pointer event.
       * @return {Int}
       */


      get primaryTouchId() {
        return this.magicEvent.primaryTouchId;
      }

    }

    $J.Events.Custom = Custom;
    $J.Events.handlers = {};
    /**
     * Dom ready custom event implementation
     */

    ($J => {
      if (DOC.readyState === 'interactive' || DOC.readyState === 'complete') {
        setTimeout(() => $J.browser.onready(), 0);
      } else {
        $J.$(DOC).addEvent('readystatechange', event => {
          if (event.target.readyState === 'interactive' || event.target.readyState === 'complete') {
            $J.browser.onready();
          }
        });
        $J.$(DOC).addEvent('DOMContentLoaded', () => {
          $J.browser.onready();
        });
        $J.$(WIN).addEvent('load', () => {
          $J.browser.onready();
        });
      }
    })(magicJS);
    /* eslint-env es6 */

    /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

    /* global magicJS, DOC */


    ($J => {
      const RADIUS_THRESHOLD = 5; // Click radius  // Click speed threshold

      const TIME_THRESHOLD = 300; // Click speed threshold

      class BtnClick extends $J.Events.Custom {
        constructor(e, target) {
          super(e);
          const r = e.pageXY;
          this.type = 'btnclick';
          this.x = r.x;
          this.y = r.y;
          this.clientX = e.oe.clientX;
          this.clientY = e.oe.clientY;
          this._target = target.node;
          this.pushToEvents(e);
        }

      }

      const _options = {
        threshold: TIME_THRESHOLD,
        // Click speed threshold
        button: 1 // left button

      };

      const onclick = function (e) {
        e.stopDefaults();
      };

      const handle = function (e) {
        const options = this.fetch('event:btnclick:options');

        if (e.type !== 'dblclick' && e.button !== options.button) {
          return;
        }

        if (this.fetch('event:btnclick:ignore')) {
          this.del('event:btnclick:ignore');
          return;
        }

        let btnclickEvent;

        if (e.type === 'mousedown') {
          // e.stop(); // will it cause problems? but if we need to stop mousedown user wont be able to do this, as we don't pass it
          btnclickEvent = new BtnClick(e, this);
          this.store('event:btnclick:btnclickEvent', btnclickEvent);
        } else if (e.type === 'mouseup') {
          btnclickEvent = this.fetch('event:btnclick:btnclickEvent');

          if (!btnclickEvent) {
            return;
          }

          const r = e.pageXY;
          this.del('event:btnclick:btnclickEvent');
          btnclickEvent.pushToEvents(e); // if (e.timeStamp - btnclickEvent.timeStamp <= options.threshold && btnclickEvent.x == r.x && btnclickEvent.y == r.y) {

          if (e.timeStamp - btnclickEvent.timeStamp <= options.threshold && Math.sqrt(Math.pow(r.x - btnclickEvent.x, 2) + Math.pow(r.y - btnclickEvent.y, 2)) <= RADIUS_THRESHOLD) {
            this.callEvent('btnclick', btnclickEvent);
          } // Release mousedrag event


          $(DOC).callEvent('mouseup', e);
        } else if (e.type === 'dblclick') {
          // fire another btnclick because IE doesn't fire second mousedown on double click (and second click too)
          btnclickEvent = new BtnClick(e, this);
          this.callEvent('btnclick', btnclickEvent);
        }
      };

      const handler = {
        add: function (options) {
          this.store('event:btnclick:options', Object.assign($J.detach(_options), options || {}));
          this.addEvent(['mousedown', 'mouseup'], handle, 1).addEvent('click', onclick, 1);
        },
        remove: function () {
          this.removeEvent(['mousedown', 'mouseup'], handle).removeEvent('click', onclick);
        }
      };
      $J.Events.handlers.btnclick = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS, DOC */


    ($J => {
      class Mousedrag extends $J.Events.Custom {
        constructor(e, target, state) {
          super(e);
          const r = e.pageXY;
          this.x = r.x;
          this.y = r.y;
          this.type = 'mousedrag';
          this.clientX = e.clientX;
          this.clientY = e.clientY;
          this._target = target.node;
          this.state = state; // dragmove / dragend

          this.dragged = false;
          this.pushToEvents(e);
        }

      }

      const handleMouseDown = function (e) {
        if (e.button !== 1) {
          return;
        } // e.stopDefaults();


        const dragEvent = new Mousedrag(e, this, 'dragstart');
        this.store('event:mousedrag:dragstart', dragEvent); // this.callEvent('mousedrag', dragEvent);
      };

      const handleMouseUp = function (e) {
        let dragEvent = this.fetch('event:mousedrag:dragstart');

        if (!dragEvent) {
          return;
        }

        e.stopDefaults();
        dragEvent = new Mousedrag(e, this, 'dragend');
        this.del('event:mousedrag:dragstart');
        this.callEvent('mousedrag', dragEvent);
      };

      const handleMouseMove = function (e) {
        let dragEvent = this.fetch('event:mousedrag:dragstart');

        if (!dragEvent) {
          return;
        }

        e.stopDefaults();

        if (!dragEvent.dragged) {
          dragEvent.dragged = true;
          this.callEvent('mousedrag', dragEvent); // send dragstart
        }

        dragEvent = new Mousedrag(e, this, 'dragmove');
        this.callEvent('mousedrag', dragEvent);
      };

      const handler = {
        add: function () {
          const move = handleMouseMove.bind(this);
          const end = handleMouseUp.bind(this);
          this.addEvent('mousedown', handleMouseDown, 1).addEvent('mouseup', handleMouseUp, 1);
          $(DOC).addEvent('mousemove', move, 1).addEvent('mouseup', end, 1);
          this.store('event:mousedrag:listeners:document:move', move);
          this.store('event:mousedrag:listeners:document:end', end);
        },
        remove: function () {
          const f = () => {};

          this.removeEvent('mousedown', handleMouseDown).removeEvent('mouseup', handleMouseUp);
          $(DOC).removeEvent('mousemove', this.fetch('event:mousedrag:listeners:document:move') || f).removeEvent('mouseup', this.fetch('event:mousedrag:listeners:document:end') || f);
          this.del('event:mousedrag:listeners:document:move').del('event:mousedrag:listeners:document:end');
        }
      };
      $J.Events.handlers.mousedrag = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS */


    ($J => {
      class Dblbtnclick extends $J.Events.Custom {
        constructor(e, target) {
          super(e);
          const r = e.pageXY;
          this.x = r.x;
          this.y = r.y;
          this.type = 'dblbtnclick';
          this.clientX = e.clientX;
          this.clientY = e.clientY;
          this._target = target.node;
          this.timedout = false;
          this.tm = null;
          this.pushToEvents(e);
        }

      }

      const _options = {
        threshold: 200
      };

      const handle = function (e) {
        let event = this.fetch('event:dblbtnclick:event');

        if (!event) {
          // first click
          const options = this.fetch('event:dblbtnclick:options');
          event = new Dblbtnclick(e, this);
          event.tm = setTimeout(() => {
            event.timedout = true;
            e.isQueueStopped = $J.$false;
            this.callEvent('btnclick', e);
            this.del('event:dblbtnclick:event');
          }, options.threshold + 10);
          this.store('event:dblbtnclick:event', event);
          e.stopQueue();
        } else {
          clearTimeout(event.tm);
          this.del('event:dblbtnclick:event');

          if (!event.timedout) {
            // double click detected within threshold timeout
            event.pushToEvents(e);
            e.stopQueue().stop();
            this.callEvent('dblbtnclick', event);
          } else {// double click timed out
          }
        }
      };

      const handler = {
        add: function (options) {
          this.store('event:dblbtnclick:options', Object.assign($J.detach(_options), options || {}));
          this.addEvent('btnclick', handle, 1); // we should be first handler in queue or this wont work
        },
        remove: function () {
          this.removeEvent('btnclick', handle);
        }
      };
      $J.Events.handlers.dblbtnclick = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS */

    /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

    /* eslint no-unused-vars: ["error", { "args": "none" }] */


    ($J => {
      // Tap thresholds
      const RADIUS_THRESHOLD = 10;
      const TIME_THRESHOLD = 200;

      class Tap extends $J.Events.Custom {
        constructor(e, target) {
          super(e);
          const touch = e.primaryTouch;
          this.type = 'tap';
          this.id = touch.pointerId || touch.identifier;
          this.x = touch.pageX;
          this.y = touch.pageY;
          this.pageX = touch.pageX;
          this.pageY = touch.pageY;
          this.clientX = touch.clientX;
          this.clientY = touch.clientY;
          this._target = target.node;
          this.pushToEvents(e);
        } // eslint-disable-next-line class-methods-use-this


        get button() {
          return 0;
        }

      }

      const onClick = function (e) {
        e.stopDefaults();
      };

      const onTouchStart = function (e) {
        if (!e.isPrimaryTouch()) {
          this.del('event:tap:event');
          return;
        }

        this.store('event:tap:event', new Tap(e, this)); // Prevent btnclick event

        this.store('event:btnclick:ignore', true);
      };

      const onTouchEnd = function (e) {
        const event = this.fetch('event:tap:event'); // let options = this.fetch('event:tap:options');

        if (!event || !e.isPrimaryTouch()) {
          return;
        }

        this.del('event:tap:event');

        if (event.id === e.primaryTouchId && e.timeStamp - event.timeStamp <= TIME_THRESHOLD && Math.sqrt(Math.pow(e.primaryTouch.pageX - event.x, 2) + Math.pow(e.primaryTouch.pageY - event.y, 2)) <= RADIUS_THRESHOLD) {
          this.del('event:btnclick:btnclickEvent');
          e.stop();
          event.pushToEvents(e);
          this.callEvent('tap', event);
        }
      };

      const handler = {
        add: function (options) {
          this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1).addEvent(['touchend', 'pointerup'], onTouchEnd, 1).addEvent('click', onClick, 1);
        },
        remove: function () {
          this.removeEvent(['touchstart', 'pointerdown'], onTouchStart).removeEvent(['touchend', 'pointerup'], onTouchEnd).removeEvent('click', onClick);
        }
      };
      $J.Events.handlers.tap = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS */


    ($J => {
      class Dbltap extends $J.Events.Custom {
        constructor(e, target) {
          super(e);
          this.type = 'dbltap';
          this.x = e.x;
          this.y = e.y;
          this.clientX = e.clientX;
          this.clientY = e.clientY;
          this._target = target.node;
          this.timedout = false;
          this.tm = null;
          this.pushToEvents(e);
        }

      }

      const _options = {
        threshold: 300
      };

      const handle = function (e) {
        let event = this.fetch('event:dbltap:event');

        if (!event) {
          // first tap
          const options = this.fetch('event:dbltap:options');
          event = new Dbltap(e, this);
          event.tm = setTimeout(() => {
            event.timedout = true;
            e.isQueueStopped = $J.$false;
            this.callEvent('tap', e);
          }, options.threshold + 10);
          this.store('event:dbltap:event', event);
          e.stopQueue();
        } else {
          clearTimeout(event.tm);
          this.del('event:dbltap:event');

          if (!event.timedout) {
            // double tap detected within threshold timeout
            event.pushToEvents(e);
            e.stopQueue().stop();
            this.callEvent('dbltap', event);
          } else {// double tap timed out
          }
        }
      };

      const handler = {
        add: function (options) {
          this.store('event:dbltap:options', Object.assign($J.detach(_options), options || {}));
          this.addEvent('tap', handle, 1); // we should be first handler in queue or this wont work
        },
        remove: function () {
          this.removeEvent('tap', handle);
        }
      };
      $J.Events.handlers.dbltap = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

    /* global magicJS, DOC */


    ($J => {
      const RADIUS_THRESHOLD = 10;

      class Touchdrag extends $J.Events.Custom {
        constructor(e, target, state) {
          super(e);
          const touch = e.primaryTouch;
          this.type = 'touchdrag';
          this.id = touch.pointerId || touch.identifier;
          this.clientX = touch.clientX;
          this.clientY = touch.clientY;
          this.pageX = touch.pageX;
          this.pageY = touch.pageY;
          this.x = touch.pageX;
          this.y = touch.pageY;
          this._target = target.node;
          this.state = state; // dragmove / dragend

          this.dragged = false;
          this.pushToEvents(e);
        } // eslint-disable-next-line class-methods-use-this


        get button() {
          return 0;
        }

      }

      const onTouchStart = function (e) {
        if (!e.isPrimaryTouch()) {
          return;
        }

        const dragEvent = new Touchdrag(e, this, 'dragstart');
        this.store('event:touchdrag:dragstart', dragEvent);
      };

      const onTouchEnd = function (e) {
        let dragEvent = this.fetch('event:touchdrag:dragstart');

        if (!dragEvent || !dragEvent.dragged || dragEvent.id !== e.primaryTouchId) {
          return;
        }

        dragEvent = new Touchdrag(e, this, 'dragend');
        this.del('event:touchdrag:dragstart');
        this.callEvent('touchdrag', dragEvent);
      };

      const onTouchMove = function (e) {
        let dragEvent = this.fetch('event:touchdrag:dragstart');

        if (!dragEvent || !e.isPrimaryTouch()) {
          return;
        }

        if (dragEvent.id !== e.primaryTouchId) {
          this.del('event:touchdrag:dragstart');
          return;
        }

        if (!dragEvent.dragged && Math.sqrt(Math.pow(e.primaryTouch.pageX - dragEvent.x, 2) + Math.pow(e.primaryTouch.pageY - dragEvent.y, 2)) > RADIUS_THRESHOLD) {
          dragEvent.dragged = true;
          this.callEvent('touchdrag', dragEvent); // send dragstart
        }

        if (!dragEvent.dragged) {
          return;
        }

        dragEvent = new Touchdrag(e, this, 'dragmove');
        this.callEvent('touchdrag', dragEvent);
      };

      const handler = {
        add: function () {
          const move = onTouchMove.bind(this);
          const end = onTouchEnd.bind(this);
          this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1).addEvent(['touchend', 'pointerup'], onTouchEnd, 1).addEvent(['touchmove', 'pointermove'], onTouchMove, 1);
          this.store('event:touchdrag:listeners:document:move', move);
          this.store('event:touchdrag:listeners:document:end', end);
          $(DOC).addEvent('pointermove', move, 1).addEvent('pointerup', end, 1);
        },
        remove: function () {
          const f = () => {};

          this.removeEvent(['touchstart', 'pointerdown'], onTouchStart).removeEvent(['touchend', 'pointerup'], onTouchEnd).removeEvent(['touchmove', 'pointermove'], onTouchMove);
          $(DOC).removeEvent('pointermove', this.fetch('event:touchdrag:listeners:document:move') || f, 1).removeEvent('pointerup', this.fetch('event:touchdrag:listeners:document:end') || f, 1);
          this.del('event:touchdrag:listeners:document:move').del('event:touchdrag:listeners:document:end');
        }
      };
      $J.Events.handlers.touchdrag = handler;
    })(magicJS);
    /* global DOC, magicJS */

    /* eslint-disable indent */

    /* eslint-disable dot-notation */

    /* eslint no-unused-vars: ["error", { "args": "none" }] */

    /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


    ($J => {
      let baseSpace = null;
      const $ = $J.$;

      const distance = (point1, point2) => {
        const x = point2.x - point1.x;
        const y = point2.y - point1.y;
        return Math.sqrt(x * x + y * y);
      };

      const getSpace = (targetTouches, variables) => {
        const ts = Array.prototype.slice.call(targetTouches);
        const diffX = Math.abs(ts[1].pageX - ts[0].pageX);
        const diffY = Math.abs(ts[1].pageY - ts[0].pageY);

        const _x = Math.min(ts[1].pageX, ts[0].pageX) + diffX / 2;

        const _y = Math.min(ts[1].pageY, ts[0].pageY) + diffY / 2;

        let result = 0;
        variables.points = [ts[0], ts[1]]; // result = Math.PI * Math.pow(distance({ x: ts[0].pageX, y: ts[1].pageX }, { x: ts[0].pageY, y: ts[1].pageY }) / 2, 2);
        // result = Math.pow(Math.max(diffX, diffY), 2);

        result = Math.pow(distance({
          x: ts[0].pageX,
          y: ts[0].pageY
        }, {
          x: ts[1].pageX,
          y: ts[1].pageY
        }), 2); // result = (Math.abs(ts[0].pageX - ts[1].pageX) || 1) * (Math.abs(ts[0].pageY - ts[1].pageY) || 1);

        variables.centerPoint = {
          x: _x,
          y: _y
        };
        variables.x = variables.centerPoint.x;
        variables.y = variables.centerPoint.y;
        return result;
      };

      const getScale = space => {
        return space / baseSpace;
      };

      const getTouches = (e, cache) => {
        let result;
        const originEvent = e.originEvent;

        if (originEvent.targetTouches && originEvent.changedTouches) {
          if (originEvent.targetTouches) {
            result = originEvent.targetTouches;
          } else {
            result = originEvent.changedTouches;
          }

          result = Array.prototype.slice.call(result);
        } else {
          // fucking ie 11 does not support Array.from()
          result = [];

          if (cache) {
            cache.forEach(v => {
              result.push(v);
            });
          }
        }

        return result;
      };

      const cacheEvent = (e, cache, justSame) => {
        if (e.pointerId && e.pointerType === 'touch' && (!justSame || cache.has(e.pointerId))) {
          cache.set(e.pointerId, e);
          return true;
        }

        return false;
      };

      const removeCache = (e, cache) => {
        if (e.pointerId && e.pointerType === 'touch' && cache && cache.has(e.pointerId)) {
          // compressor does not want to compress
          cache['delete'](e.pointerId);
        }
      };

      const getEventId = e => {
        return e.pointerId && e.pointerType === 'touch' ? e.pointerId : e.identifier;
      };

      const addActivePoints = (targetTouches, container) => {
        let result = false;

        for (let i = 0; i < targetTouches.length; i++) {
          if (container.length === 2) {
            break;
          } else {
            const id = getEventId(targetTouches[i]);

            if (!container.includes(id)) {
              container.push(id);
              result = true;
            }
          }
        }

        return result;
      };

      const getIds = targetTouches => {
        return targetTouches.map(value => getEventId(value));
      };

      const removeActivePoint = (targetTouches, container) => {
        let result = false;

        if (container) {
          const ids = getIds(targetTouches);

          for (let i = 0; i < container.length; i++) {
            if (!ids.includes(container[i])) {
              container.splice(i, 1);
              result = true;
              break;
            }
          }
        }

        return result;
      };

      const getActivePoints = (targetTouches, container) => {
        const result = [];

        for (let i = 0; i < targetTouches.length; i++) {
          if (container.includes(getEventId(targetTouches[i]))) {
            result.push(targetTouches[i]);

            if (result.length === 2) {
              break;
            }
          }
        }

        return result;
      };

      const removePinchEnd = el => {
        const target = el.fetch('event:pinch:target');

        if (target) {
          target.removeEvent(['touchend'], el.fetch('event:pinch:listeners:document:end'));
        }

        el.del('event:pinch:target');
      };

      const clearCache = el => {
        const cache = el.fetch('event:pinch:cache');

        if (cache) {
          cache.clear();
        }

        el.del('event:pinch:cache');
      };

      class Pinch extends $J.Events.Custom {
        constructor(e, target, state, variables) {
          super(e);
          this.type = 'pinch';
          this._target = target.node;
          this.state = state; // pinchmove / pinchend / pinchresize

          this.x = variables.x;
          this.y = variables.y;
          this.scale = variables.scale;
          this.space = variables.space;
          this.zoom = variables.zoom;
          this.state = state;
          this.centerPoint = variables.centerPoint;
          this.points = variables.points;
          this.pushToEvents(e);
        }

      }

      const _variables = {
        x: 0,
        y: 0,
        space: 0,
        scale: 1,
        zoom: 0,
        startSpace: 0,
        startScale: 1,
        started: false,
        dragged: false,
        points: [],
        centerPoint: {
          x: 0,
          y: 0
        }
      };

      const setVariables = (targetTouches, variables) => {
        const lastSpace = variables.space;

        if (targetTouches.length > 1) {
          variables.space = getSpace(targetTouches, variables);

          if (!variables.startSpace) {
            variables.startSpace = variables.space;
          }

          if (lastSpace > variables.space) {
            variables.zoom = -1;
          } else if (lastSpace < variables.space) {
            variables.zoom = 1;
          } else {
            variables.zoom = 0;
          }

          variables.scale = getScale(variables.space);
        } else {
          variables.points = [];
        }
      }; // const onClick = function (e) { e.stop(); };


      const onTouchMove = function (e) {
        let pinchEvent;
        let variables = this.fetch('event:pinch:variables');
        const cache = this.fetch('event:pinch:cache');
        const currentActivePoints = this.fetch('event:pinch:activepoints');

        if (!variables) {
          variables = Object.assign({}, $J.detach(_variables));
        }

        if (variables.started) {
          if (e.pointerId && !cacheEvent(e, cache, true)) {
            return;
          }

          e.stop();
          setVariables(getActivePoints(getTouches(e, cache), currentActivePoints), variables);
          pinchEvent = new Pinch(e, this, 'pinchmove', variables);
          this.callEvent('pinch', pinchEvent);
        }
      };

      const onTouchStart = function (e) {
        let pinchEventStart;
        let variables;
        let cache = this.fetch('event:pinch:cache');
        let currentActivePoints = this.fetch('event:pinch:activepoints');

        if (e.pointerType === 'mouse') {
          return;
        }

        if (!currentActivePoints) {
          currentActivePoints = [];
          this.store('event:pinch:activepoints', currentActivePoints);
        }

        if (!cache) {
          cache = new Map();
          this.store('event:pinch:cache', cache);
        }

        if (!this.fetch('event:pinch:target')) {
          this.store('event:pinch:target', $(e.target));
          $(e.target).addEvent(['touchend'], this.fetch('event:pinch:listeners:document:end'), 1);
        }

        cacheEvent(e, cache);
        const targetTouches = getTouches(e, cache);
        addActivePoints(targetTouches, currentActivePoints);

        if (targetTouches.length === 2) {
          pinchEventStart = this.fetch('event:pinch:pinchstart');
          variables = this.fetch('event:pinch:variables');

          if (!variables) {
            variables = Object.assign({}, $J.detach(_variables));
          }

          setVariables(getActivePoints(targetTouches, currentActivePoints), variables);

          if (!pinchEventStart) {
            pinchEventStart = new Pinch(e, this, 'pinchstart', variables);
            this.store('event:pinch:pinchstart', pinchEventStart);
            this.store('event:pinch:variables', variables);
            baseSpace = variables.space;
            this.callEvent('pinch', pinchEventStart);
            variables.started = true;
          }
        }
      };

      const onTouchEnd = function (e) {
        const cache = this.fetch('event:pinch:cache');

        if (e.pointerType === 'mouse' || e.pointerId && (!cache || !cache.has(e.pointerId))) {
          return;
        }

        let pinchEvent = this.fetch('event:pinch:pinchstart');
        const variables = this.fetch('event:pinch:variables');
        const currentActivePoints = this.fetch('event:pinch:activepoints');
        const targetTouches = getTouches(e, cache);
        removeCache(e, cache);
        const removingResult = removeActivePoint(targetTouches, currentActivePoints);

        if (!pinchEvent || !variables || !variables.started || !removingResult || !currentActivePoints) {
          return;
        }

        if (removingResult) {
          addActivePoints(targetTouches, currentActivePoints);
        }

        let _event = 'pinchend';

        if (targetTouches.length > 1) {
          _event = 'pinchresize';
        } else {
          this.del('event:pinch:pinchstart').del('event:pinch:variables').del('event:pinch:activepoints');
          clearCache(this);
          removePinchEnd(this);
        }

        setVariables(getActivePoints(targetTouches, currentActivePoints), variables);
        pinchEvent = new Pinch(e, this, _event, variables);
        this.callEvent('pinch', pinchEvent);
      };

      const handler = {
        add: function (options) {
          if (!baseSpace) {
            baseSpace = (() => {
              const s = $J.W.size;
              s.width = Math.min(s.width, s.height);
              s.height = s.width; // var s = { width: 375, height: 812 };

              return Math.pow(distance({
                x: 0,
                y: 0
              }, {
                x: s.width,
                y: s.height
              }), 2);
            })();
          }

          const move = onTouchMove.bind(this);
          const end = onTouchEnd.bind(this);
          this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1).addEvent(['pointerup'], onTouchEnd, 1).addEvent(['touchmove', 'pointermove'], onTouchMove, 1);
          this.store('event:pinch:listeners:document:move', move);
          this.store('event:pinch:listeners:document:end', end);
          $(DOC).addEvent('pointermove', move, 1).addEvent('pointerup', end, 1);
        },
        remove: function () {
          this.removeEvent(['touchstart', 'pointerdown'], onTouchStart).removeEvent(['pointerup'], onTouchEnd).removeEvent(['touchmove', 'pointermove'], onTouchMove);

          const f = () => {};

          $(DOC).removeEvent('pointermove', this.fetch('event:pinch:listeners:document:move') || f, 1).removeEvent('pointerup', this.fetch('event:pinch:listeners:document:end') || f, 1);
          this.del('event:pinch:listeners:document:move').del('event:pinch:listeners:document:end');
          removePinchEnd(this);
          clearCache(this);
          this.del('event:pinch:variables').del('event:pinch:activepoints').del('event:pinch:pinchstart');
        }
      };
      $J.Events.handlers.pinch = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS, DOC, UND */


    ($J => {
      let eventType = 'wheel';

      if (!('onwheel' in DOC || $J.browser.ieMode > 8)) {
        eventType = 'mousewheel';
      }

      class Mousescroll extends $J.Events.Custom {
        constructor(e, target, delta, deltaX, deltaY, deltaZ, deltaFactor) {
          super(e);
          const r = e.pageXY;
          this.x = r.x;
          this.y = r.y;
          this.type = 'mousescroll'; // this.timeStamp = e.timeStamp;

          this._target = target.node;
          this.delta = delta || 0;
          this.deltaX = deltaX || 0;
          this.deltaY = deltaY || 0;
          this.deltaZ = deltaZ || 0;
          this.deltaFactor = deltaFactor || 0;
          this.deltaMode = e.deltaMode || 0;
          this.isMouse = false;
          this.pushToEvents(e);
        }

      }

      let lowestDelta;
      let resetDeltaTimer;

      const resetDelta = () => {
        lowestDelta = null;
      };

      const isMouse = (deltaFactor, deltaMode) => {
        return deltaFactor > 50 || deltaMode === 1 && !($J.browser.platform === 'win' && deltaFactor < 1) // Firefox
        || deltaFactor % 12 === 0 // Safari
        || deltaFactor % 4.000244140625 === 0; // Chrome on OS X
      };

      const handle = function (e) {
        let deltaX = 0;
        let deltaY = 0;
        const originEvent = e.originEvent; // DomMouseScroll event

        if (originEvent.detail) {
          deltaY = e.detail * -1;
        } // mousewheel event


        if (originEvent.wheelDelta !== UND) {
          deltaY = originEvent.wheelDelta;
        }

        if (originEvent.wheelDeltaY !== UND) {
          deltaY = originEvent.wheelDeltaY;
        }

        if (originEvent.wheelDeltaX !== UND) {
          deltaX = originEvent.wheelDeltaX * -1;
        } // wheel event


        if (originEvent.deltaY) {
          deltaY = -1 * originEvent.deltaY;
        }

        if (originEvent.deltaX) {
          deltaX = originEvent.deltaX;
        }

        if (deltaY === 0 && deltaX === 0) {
          return;
        }

        let delta = deltaY === 0 ? deltaX : deltaY;
        const absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
          lowestDelta = absDelta;
        }

        const calc = delta > 0 ? 'floor' : 'ceil';
        delta = Math[calc](delta / lowestDelta);
        deltaX = Math[calc](deltaX / lowestDelta);
        deltaY = Math[calc](deltaY / lowestDelta);

        if (resetDeltaTimer) {
          clearTimeout(resetDeltaTimer);
        }

        resetDeltaTimer = setTimeout(resetDelta, 200);

        const _event = new Mousescroll(e, this, delta, deltaX, deltaY, 0, lowestDelta);

        _event.isMouse = isMouse(lowestDelta, originEvent.deltaMode || 0);
        this.callEvent('mousescroll', _event);
      };

      const handler = {
        add: function () {
          this.addEvent(eventType, handle, 1);
        },
        remove: function () {
          this.removeEvent(eventType, handle, 1);
        }
      };
      $J.Events.handlers.mousescroll = handler;
    })(magicJS);
    /**
     * Do the last things. Extend window, document, etc.
     */


    $J.W = $J.$(WIN);
    $J.D = $J.$(DOC);
    $J.U = UND;
    $J.DPPX = window.devicePixelRatio >= 2 ? 2 : 1; // Dots per px. 2 - is equal to Retina.;

    return magicJS;
  }();
  /* eslint no-throw-literal: "off"*/

  /* eslint no-restricted-properties: "off" */

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint consistent-return: "off"*/

  /* eslint class-methods-use-this: "off"*/

  /* eslint no-unused-expressions: "off"*/

  /* eslint no-undef: "off"*/

  /* eslint no-shadow: ["error", { "allow": ["t", duration] }]*/

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint-env es6*/


  ($J => {
    const $ = $J.$;
    /**
     * Basic transition effects
     * @class
     * @constant
     * @static
     */

    const TRANSITION = {
      linear: 'linear',
      sineIn: 'easeInSine',
      sineOut: 'easeOutSine',
      expoIn: 'easeInExpo',
      expoOut: 'easeOutExpo',
      quadIn: 'easeInQuad',
      quadOut: 'easeOutQuad',
      cubicIn: 'easeInCubic',
      cubicOut: 'easeOutCubic',
      backIn: 'easeInBack',
      backOut: 'easeOutBack',
      elasticIn: (p, x) => {
        x = x || [];
        return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
      },
      elasticOut: (p, x) => {
        return 1 - TRANSITION.elasticIn(1 - p, x);
      },
      bounceIn: p => {
        for (let a = 0, b = 1; 1; a += b, b /= 2) {
          if (p >= (7 - 4 * a) / 11) {
            return b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
          }
        }
      },
      bounceOut: p => {
        return 1 - TRANSITION.bounceIn(1 - p);
      },
      none: x => {
        return 0;
      }
    };
    const STATES = {
      INIT: 0,
      STARTED: 1,
      PLAYING: 2,
      ENDED: 3
    }; // 0 - init,  1 - started, 2 - started, 3 - ended

    /**
     * @class
     * Class that applies animation to an element
     * @example
     * simple usage:
     * new $J.FX(el1), {
     *  'duration': 400
     * }).start({width:[startWidth, endWidth]});
     * @constructs
     * @param {String|Element} el Element to applied an effect
     * @param [opt] Options
     * @param {Number} opt.fps FPS
     * @param {Number} opt.duration Effect duration in miliseconds
     * @param {Function|String} opt.transition  Easing function
     * @param {Function|String} opt.cycles  The number of times the animation should repeat. Default is 1
     * @param {String} opt.direction  Indicates how the animation should play each cycle. Possible values:
     *                  normal - Default. The animation should play forward each cycle.
     *                  alternate - The animation should reverse direction each cycle.
     *                  reverse - The animation plays backward each cycle.
     *                  alternate-reverse - The animation starts backward, then continues to alternate.
     *                  continuous - The animation plays forward continuously (w/o cycles)
     *                  continuous-reverse - The animation plays backward continuously (w/o cycles)
     * @param {Function} opt.onStart Callback called when animation starts
     * @param {Function} opt.onComplete Callback called when animation completes
     * @param {Function} opt.onBeforeRender Callback called before each step of changing CSS properties
     * @param {Function} opt.onAfterRender Callback called after each step of changing CSS properties
     * @param {Boolean} opt.roundCss Use Math.round() when calculating css steps values
     */

    class FX {
      constructor(el
      /* can be array */
      , opt) {
        this.styles = null;
        this.cubicBezier = null;
        this.easeFn = null;
        this.state = STATES.INIT;
        this.pStyles = []; // styles set in percent

        this.alternate = false;
        this.continuous = false;
        this.startTime = null;
        this.finishTime = null;
        this.options = {
          fps: 60,
          duration: 600,
          // transition: function(x) {return  -(Math.cos(Math.PI * x) - 1) / 2},
          transition: 'ease',
          cycles: 1,
          direction: 'normal',
          // normal | reverse | alternate | alternate-reverse | continuous | continuous-reverse
          onStart: () => {},
          onComplete: () => {},
          onBeforeRender: () => {},
          onAfterRender: () => {},
          forceAnimation: false,
          roundCss: false // use Math.round() when calculating css steps values

        };
        this.els = [];

        if (!Array.isArray(el)) {
          el = [el];
        }

        el.forEach(_el => {
          if (_el) {
            this.els.push($(_el));
          }
        });
        this.options = Object.assign(this.options, opt);
        this.timer = false;
        this.setTransition(this.options.transition);

        if ($J.typeOf(this.options.cycles) === 'string') {
          this.options.cycles = this.options.cycles === 'infinite' ? Infinity : parseInt(this.options.cycles, 10) || 1;
        }
      }

      static getTransition() {
        return TRANSITION;
      }

      setTransition(easing) {
        this.options.transition = easing; // this.easeFn = this.cubicBezierAtTime;

        this.easeFn = FX.cubicBezierAtTime;

        const _easing = TRANSITION[this.options.transition] || this.options.transition;

        if ($J.typeOf(_easing) === 'function') {
          this.easeFn = _easing;
        } else {
          this.cubicBezier = this.parseCubicBezier(_easing) || this.parseCubicBezier('ease');
        }
      }
      /**
       * Start animation
       */


      start(styles
      /**Hash*/
      ) {
        const runits = /\%$/;

        if (this.state === STATES.PLAYING) {
          return this;
        }

        this.state = STATES.STARTED;
        this.cycle = 0;
        this.alternate = ['alternate', 'alternate-reverse'].includes(this.options.direction);
        this.continuous = ['continuous', 'continuous-reverse'].includes(this.options.direction);

        if (!styles) {
          styles = {};
        }

        if (!Array.isArray(styles)) {
          styles = [styles];
        }

        this.styles = styles;
        const l = this.styles.length;
        this.pStyles = new Array(l);

        for (let i = 0; i < l; i++) {
          this.pStyles[i] = {};

          for (const s in this.styles[i]) {
            if (runits.test(this.styles[i][s][0])) {
              this.pStyles[s] = true;
            }

            if (['reverse', 'alternate-reverse', 'continuous-reverse'].includes(this.options.direction)) {
              this.styles[i][s].reverse();
            }
          }
        }

        this.startTime = +new Date();
        this.finishTime = this.startTime + this.options.duration;
        this.options.onStart();

        if (this.options.duration === 0) {
          // apply all styles immediately
          this.render(1.0);
          this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els);
        } else {
          this.state = STATES.PLAYING;

          if (!this.options.forceAnimation) {
            this.timer = $J.W.node.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
          } else {
            this.timer = setInterval(() => {
              this.loop();
            }, Math.round(1000 / this.options.fps));
          }
        }

        return this;
      }

      stopAnimation() {
        if (this.timer) {
          if (!this.options.forceAnimation) {
            $J.W.node.cancelAnimationFrame.call($J.W.node, this.timer);
          } else {
            clearInterval(this.timer);
          }

          this.timer = false;
        }
      }
      /**
       * Stop animation
       */


      stop(complete
      /** Boolean*/
      ) {
        if ([STATES.INIT, STATES.ENDED].includes(this.state)) {
          return this;
        }

        if (!$J.defined(complete)) {
          complete = false;
        }

        this.stopAnimation();
        this.state = STATES.ENDED;

        if (complete) {
          this.render(1.0); // clearTimeout(this._completeTimer);
          // this._completeTimer = setTimeout(() => {

          this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els); // }, 10);
        }

        return this;
      }
      /**
       * @ignore
       */


      loop() {
        const _now = +new Date();

        const dx = (_now - this.startTime) / this.options.duration;
        const cycle = Math.floor(dx);

        if (_now >= this.finishTime && cycle >= this.options.cycles) {
          this.stopAnimation();
          this.render(1.0); // clearTimeout(this._completeTimer);
          // this._completeTimer = setTimeout(() => {

          this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els); // }, 10);

          return this;
        }

        if (this.alternate && this.cycle < cycle) {
          for (let i = 0; i < this.styles.length; i++) {
            for (const s in this.styles[i]) {
              this.styles[i][s].reverse();
            }
          }
        }

        this.cycle = cycle;

        if (!this.options.forceAnimation) {
          this.timer = $J.W.node.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
        }

        this.render((this.continuous ? cycle : 0) + this.easeFn(dx % 1, this.options.duration, this.cubicBezier));
      }
      /**
       * ignore
       */


      render(dx) {
        const css = [];
        const l = this.els.length;

        for (let i = 0; i < l; i++) {
          css.push(this.renderOverLoad(dx, this.els[i], this.styles[i], this.pStyles[i]));
        }

        let _el = this.els;
        let _css = css;

        if (l < 2) {
          _el = this.els[0];
          _css = css[0];
        }

        this.options.onBeforeRender(_css, _el);
        this.set(css);
        this.options.onAfterRender(_css, _el);
      }
      /**
       * ignore
       */


      renderOverLoad(dx, el, styles, pStyles) {
        const css = {};
        Object.entries(styles).forEach(values => {
          const [key, value] = values;

          if (key === 'opacity') {
            css[key] = Math.round(this.calc(value[0], value[1], dx) * 100) / 100;
          } else {
            css[key] = this.calc(value[0], value[1], dx); // if (this.options.roundCss) { css[key] = Math.round(css[key]); } // если двигать кубиком базье в процентах - то без округления лучше двигает
            // Styles defined in percent. Ap

            pStyles[key] && (css[key] += '%');
          }
        });
        return css;
      }
      /**
       * @ignore
       */


      calc(from, to, dx) {
        from = parseFloat(from);
        to = parseFloat(to);
        return (to - from) * dx + from;
      }
      /**
       * @ignore
      */


      set(css) {
        for (let i = 0, l = this.els.length; i < l; i++) {
          this.els[i].setCss(css[i]);
        }

        return this;
      }
      /**
       *
       * Parse timing function string
       *
       * @ignore
       * @example
       * 'cubic-bezier(.0,1.0,.34,.1)'
       * 'ease-in-out'
       */


      parseCubicBezier(cubicbezier) {
        let points = null;

        if ($J.typeOf(cubicbezier) !== 'string') {
          return null;
        }

        switch (cubicbezier) {
          // Standard
          case 'linear':
            points = [0.000, 0.000, 1.000, 1.000];
            break;

          case 'ease':
            points = [0.250, 0.100, 0.250, 1.000];
            break;

          case 'ease-in':
            points = [0.420, 0.000, 1.000, 1.000];
            break;

          case 'ease-out':
            points = [0.000, 0.000, 0.580, 1.000];
            break;

          case 'ease-in-out':
            points = [0.420, 0.000, 0.580, 1.000];
            break;
          // Sine
          // case 'easeInSine':
          //     points = [0.470, 0.000, 0.745, 0.715];
          //     break;
          // case 'easeOutSine':
          //     points = [0.39, 0.575, 0.565, 1.000];
          //     break;
          // case 'easeInOutSine':
          //     points = [0.445, 0.050, 0.550, 0.950];
          //     break;
          // Quad
          // case 'easeInQuad':
          //     points = [0.550, 0.085, 0.680, 0.530];
          //     break;
          // case 'easeOutQuad':
          //     points = [0.250, 0.460, 0.450, 0.940];
          //     break;
          // case 'easeInOutQuad':
          //     points = [0.455, 0.030, 0.515, 0.955];
          //     break;
          // Cubic
          // case 'easeInCubic':
          //     points = [0.550, 0.055, 0.675, 0.190];
          //     break;
          // case 'easeOutCubic':
          //     points = [0.215, 0.610, 0.355, 1.000];
          //     break;
          // case 'easeInOutCubic':
          //     points = [0.645, 0.045, 0.355, 1.000];
          //     break;
          // Quart
          // case 'easeInQuart':
          //     points = [0.895, 0.030, 0.685, 0.220];
          //     break;
          // case 'easeOutQuart':
          //     points = [0.165, 0.840, 0.440, 1.000];
          //     break;
          // case 'easeInOutQuart':
          //     points = [0.770, 0.000, 0.175, 1.000];
          //     break;
          // Quint
          // case 'easeInQuint':
          //     points = [0.755, 0.050, 0.855, 0.060];
          //     break;
          // case 'easeOutQuint':
          //     points = [0.230, 1.000, 0.320, 1.000];
          //     break;
          // case 'easeInOutQuint':
          //     points = [0.860, 0.000, 0.070, 1.000];
          //     break;
          // Expo
          // case 'easeInExpo':
          //     points = [0.950, 0.050, 0.795, 0.035];
          //     break;
          // case 'easeOutExpo':
          //     points = [0.190, 1.000, 0.220, 1.000];
          //     break;
          // case 'easeInOutExpo':
          //     points = [1.000, 0.000, 0.000, 1.000];
          //     break;
          // Circ
          // case 'easeInCirc':
          //     points = [0.600, 0.040, 0.980, 0.335];
          //     break;
          // case 'easeOutCirc':
          //     points = [0.075, 0.820, 0.165, 1.000];
          //     break;
          // case 'easeInOutCirc':
          //     points = [0.785, 0.135, 0.150, 0.860];
          //     break;
          // Back
          // case 'easeInBack':
          //     points = [0.600, -0.280, 0.735, 0.045];
          //     break;
          // case 'easeOutBack':
          //     points = [0.175, 0.885, 0.320, 1.275];
          //     break;
          // case 'easeInOutBack':
          //     points = [0.680, -0.550, 0.265, 1.550];
          //     break;

          default:
            cubicbezier = cubicbezier.replace(/\s/g, '');

            if (cubicbezier.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
              points = cubicbezier.replace(/^cubic-bezier\s*\(|\)$/g, '').split(',');

              for (let i = points.length - 1; i >= 0; i--) {
                points[i] = parseFloat(points[i]);
              }
            }

        }

        return $(points);
      } // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
      // 1:1 conversion to js from webkit source files
      // UnitBezier.h, WebCore_animation_AnimationBase.cpp


      static cubicBezierAtTime(t, duration, cubicBezier) {
        let ax = 0;
        let bx = 0;
        let cx = 0;
        let ay = 0;
        let by = 0;
        let cy = 0; // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.

        const sampleCurveX = t => {
          return ((ax * t + bx) * t + cx) * t;
        };

        const sampleCurveY = t => {
          return ((ay * t + by) * t + cy) * t;
        };

        const sampleCurveDerivativeX = t => {
          return (3.0 * ax * t + 2.0 * bx) * t + cx;
        }; // The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
        // animation, the more precision is needed in the timing function result to avoid ugly discontinuities.


        const solveEpsilon = duration => {
          return 1.0 / (200.0 * duration);
        }; // const solve = (x, epsilon) => {
        //     return sampleCurveY(solveCurveX(x, epsilon));
        // };
        // Given an x value, find a parametric value it came from.


        const solveCurveX = (x, epsilon) => {
          let t0;
          let t1;
          let t2;
          let x2;
          let d2;
          let i;

          const fabs = n => {
            if (n >= 0) {
              return n;
            }

            return 0 - n;
          }; // First try a few iterations of Newton's method -- normally very fast.


          for (t2 = x, i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;

            if (fabs(x2) < epsilon) {
              return t2;
            }

            d2 = sampleCurveDerivativeX(t2);

            if (fabs(d2) < 1e-6) {
              break;
            }

            t2 -= x2 / d2;
          } // Fall back to the bisection method for reliability.


          t0 = 0.0;
          t1 = 1.0;
          t2 = x;

          if (t2 < t0) {
            return t0;
          }

          if (t2 > t1) {
            return t1;
          }

          while (t0 < t1) {
            x2 = sampleCurveX(t2);

            if (fabs(x2 - x) < epsilon) {
              return t2;
            }

            if (x > x2) {
              t0 = t2;
            } else {
              t1 = t2;
            }

            t2 = (t1 - t0) * 0.5 + t0;
          }

          return t2; // Failure.
        };

        const solve = (x, epsilon) => {
          return sampleCurveY(solveCurveX(x, epsilon));
        }; // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).


        cx = 3.0 * cubicBezier[0];
        bx = 3.0 * (cubicBezier[2] - cubicBezier[0]) - cx;
        ax = 1.0 - cx - bx;
        cy = 3.0 * cubicBezier[1];
        by = 3.0 * (cubicBezier[3] - cubicBezier[1]) - cy;
        ay = 1.0 - cy - by; // Convert from input time to parametric value in curve, then from that to output time.

        return solve(t, solveEpsilon(duration));
      }

    }

    $J.FX = FX;
  })(magicJS);
  /*eslint no-throw-literal: "off"*/

  /*eslint quote-props: ["off"]*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /*eslint guard-for-in: "off"*/

  /*eslint no-continue: "off"*/

  /*eslint no-else-return: "off"*/

  /*eslint no-undef: "off"*/

  /*eslint consistent-return: "off"*/

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /*eslint no-prototype-builtins: "off"*/

  /*eslint dot-notation: ["off"]*/

  /*eslint-env es6*/


  ($J => {
    let globalValue = null;
    const dataTypes = {
      'boolean': 1,
      'array': 2,
      'number': 3,
      'function': 4,
      'url': 5,
      'string': 100
    };

    const isAbsoluteUrl = v => {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(v);
    };

    const typeValidators = {
      'boolean': (option, v, strict) => {
        if ($J.typeOf(v) !== 'boolean') {
          if (strict || $J.typeOf(v) !== 'string') {
            return false;
          } else if (!/^(true|false)$/.test(v)) {
            return false;
          } else {
            v = !v.replace(/true/i, '').trim();
          }
        }

        if (option.hasOwnProperty('enum') && !option['enum'].includes(v)) {
          return false;
        }

        globalValue = v;
        return true;
      },
      'url': (option, v, strict) => {
        let result = false;

        if ($J.typeOf(v) === 'string' && isAbsoluteUrl(v)) {
          if (option.hasOwnProperty('enum')) {
            if (option['enum'].includes(v)) {
              result = true;
            }
          } else {
            result = true;
          }
        }

        return result;
      },
      'string': (option, v, strict) => {
        if ($J.typeOf(v) !== 'string') {
          return false;
        } else if (option.hasOwnProperty('enum') && !option['enum'].includes(v)) {
          return false;
        } else {
          globalValue = '' + v;
          return true;
        }
      },
      'number': (option, v, strict) => {
        const r = /%$/;
        const percent = $J.typeOf(v) === 'string' && r.test(v); // if (strict && typeof(v) !== 'number') {

        if (strict && !'number' === typeof v) {
          // eslint-disable-line valid-typeof
          return false;
        }

        v = parseFloat(v);

        if (isNaN(v)) {
          return false;
        }

        if (isNaN(option.minimum)) {
          option.minimum = Number.NEGATIVE_INFINITY;
        }

        if (isNaN(option.maximum)) {
          option.maximum = Number.POSITIVE_INFINITY;
        }

        if (option.hasOwnProperty('enum') && !option['enum'].includes(v)) {
          return false;
        }

        if (option.minimum > v || v > option.maximum) {
          return false;
        }

        globalValue = percent ? v + '%' : v;
        return true;
      },
      'array': (option, v, strict) => {
        if ($J.typeOf(v) === 'string') {
          try {
            v = v.replace(/'/g, '"');
            v = $J.W.node.JSON.parse(v);
          } catch (ex) {
            return false;
          }
        }

        if ($J.typeOf(v) === 'array') {
          globalValue = v;
          return true;
        } else {
          return false;
        }
      },
      'function': (option, v, strict) => {
        if ($J.typeOf(v) === 'function') {
          globalValue = v;
          return true;
        }

        return false;
      }
    };
    /**
     * Validate parameter value
     * @param  {object} param  parameter definition
     * @param  {mixed} value  [description]
     * @param  {boolean} strict Should stict validation be applied
     * @return {boolean}        [description]
     */

    const validateParamValue = (param, value, strict) => {
      const opts = param.hasOwnProperty('oneOf') ? param.oneOf : [param];

      if ($J.typeOf(opts) !== 'array') {
        return false;
      }

      for (let i = 0, l = opts.length - 1; i <= l; i++) {
        if (typeValidators[opts[i].type](opts[i], value, strict)) {
          return true;
        }
      }

      return false;
    };
    /**
     * Normalize schema parameter definition
     * @param  {object} param parameter defition
     * @return {object} normalized parameter definition
     */


    const normalizeParam = param => {
      if (param.hasOwnProperty('oneOf')) {
        const l = param.oneOf.length;

        for (let i = 0; i < l; i++) {
          for (let j = i + 1; j < l; j++) {
            if (dataTypes[param.oneOf[i]['type']] > dataTypes[param.oneOf[j].type]) {
              const temp = param.oneOf[i];
              param.oneOf[i] = param.oneOf[j];
              param.oneOf[j] = temp;
            }
          }
        }
      }

      return param;
    };
    /**
     * Validate parameter definition
     * @param  {object} param parameter definition
     * @return {boolean}     [description]
     */


    const validateSchemaParam = param => {
      // validate types
      const opts = param.hasOwnProperty('oneOf') ? param.oneOf : [param];

      if ($J.typeOf(opts) !== 'array') {
        return false;
      }

      for (let i = opts.length - 1; i >= 0; i--) {
        if (!opts[i].type || !dataTypes.hasOwnProperty(opts[i].type)) {
          return false;
        } // validate enum option if present


        if ($J.defined(opts[i]['enum'])) {
          if ($J.typeOf(opts[i]['enum']) !== 'array') {
            return false;
          }

          for (let j = opts[i]['enum'].length - 1; j >= 0; j--) {
            if (!typeValidators[opts[i].type]({
              'type': opts[i].type
            }, opts[i]['enum'][j], true)) {
              return false;
            }
          }
        }
      } // validate default value


      if (param.hasOwnProperty('defaults') && !validateParamValue(param, param['defaults'], true)) {
        return false;
      }

      return true;
    };

    const isDefaults = obj => {
      return Object.keys(obj).some(v => v === 'defaults');
    };

    const parseObj = obj => {
      const result = {};

      const parseVars = (map, pathTo) => {
        Object.entries(map).forEach(values => {
          const [prop, value] = values;

          const _pathTo = pathTo.slice(0);

          if ($J.typeOf(value) !== 'object' || isDefaults(value)) {
            _pathTo.push(prop);

            result[_pathTo.join('.')] = value;
          } else {
            _pathTo.push(prop);

            parseVars(value, _pathTo);
          }
        });
      };

      parseVars(obj, []);
      return result;
    };

    const convertToDeepObj = obj => {
      const result = {};

      const setObjValue = (arr, value) => {
        let tmp = result;
        const l = arr.length;

        if (arr[l - 1].trim() === '') {
          arr.splice(l - 1, 1);
        }

        arr.forEach((v, index) => {
          if (index === l - 1) {
            tmp[v] = value;
          } else {
            if (!tmp[v]) {
              tmp[v] = {};
            }

            tmp = tmp[v];
          }
        });
      };

      Object.entries(obj).forEach(values => {
        setObjValue(values[0].split('.'), values[1]);
      });
      return result;
    };

    const normalizeString = str => {
      return $J.camelize((str + '').trim());
    };

    class Options {
      constructor(schema) {
        this.schema = {};
        this.options = {};
        this.parseSchema(schema);
      }

      parseSchema(schema, force) {
        schema = parseObj(schema);
        Object.entries(schema).forEach(values => {
          const [key, value] = values;
          const newKey = normalizeString(key);

          if (!this.schema.hasOwnProperty(newKey) || force) {
            this.schema[newKey] = normalizeParam(value);

            if (!validateSchemaParam(this.schema[newKey])) {
              throw 'Incorrect definition of the \'' + i + '\' parameter in ' + schema;
            } // Preserve existing option value


            if ($J.defined(this.options[newKey])) {
              if (!this.checkValue(newKey, this.options[newKey])) {
                this.options[newKey] = $J.U;
              }
            } else {
              this.options[newKey] = $J.U;
            }
          }
        });
      }

      set(id, value) {
        id = normalizeString(id);

        if ($J.typeOf(value) === 'string') {
          value = value.trim();
        }

        if (this.schema.hasOwnProperty(id)) {
          globalValue = value;

          if (validateParamValue(this.schema[id], value)) {
            this.options[id] = globalValue;
          }

          globalValue = null;
        }
      }

      get(id) {
        id = normalizeString(id);

        if (this.schema.hasOwnProperty(id)) {
          return $J.defined(this.options[id]) ? this.options[id] : this.schema[id]['defaults'];
        }
      }

      fromJSON(obj) {
        obj = parseObj(obj);

        for (const i in obj) {
          this.set(i, obj[i]);
        }
      }

      getJSON() {
        const json = Object.assign({}, this.options);
        Object.keys(json).forEach(key => {
          if (json[key] === $J.U && this.schema[key]['defaults'] !== $J.U) {
            json[key] = this.schema[key]['defaults'];
          }
        });
        return convertToDeepObj(json);
      }
      /**
       * Set options from string
       * @param    str     {String} String with options. Example - "param1:value1;param2:value2;param3:value3; ...."
       * @param    exclude {Object} Object with regexps for options which we want to exclude. Example - { nameOfRegExp1: new RegExp('param2', 'g') }
       * @returns          {Object} Object with options which were excluded. Example - { nameOfRegExp1: 'param2:value2;' }
       */


      fromString(str, exclude) {
        const result = {};

        if (!exclude) {
          exclude = {};
        }

        const check = substr => {
          substr = substr.trim();
          return !Object.entries(exclude).find(([key, value]) => {
            if (value.test && value.test(substr)) {
              if (!result[key]) {
                result[key] = '';
              }

              result[key] += substr + ';';
              return true;
            }

            return false;
          });
        };

        str.split(';').forEach(chunk => {
          if (check(chunk)) {
            chunk = chunk.split(':');
            this.set(chunk.shift().trim(), chunk.join(':'));
          }
        });
        return result;
      }

      checkValue(id, value) {
        let result = false;
        id = normalizeString(id);

        if ($J.typeOf(value) === 'string') {
          value = value.trim();
        }

        if (this.schema.hasOwnProperty(id)) {
          globalValue = value;

          if (validateParamValue(this.schema[id], value)) {
            result = true;
          }

          globalValue = null;
        }

        return result;
      }

      exists(id) {
        id = normalizeString(id);
        return this.schema.hasOwnProperty(id);
      }

      isset(id) {
        id = normalizeString(id);
        return this.exists(id) && $J.defined(this.options[id]);
      }

      remove(id) {
        id = normalizeString(id);

        if (this.exists(id)) {
          delete this.options[id];
          delete this.schema[id];
        }
      }

    }

    $J.Options = Options;
  })(magicJS);

  return magicJS;
});
Sirv.define('globalVariables', ['bHelpers', 'magicJS'], (bHelpers, magicJS) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global $J, $ */

  /* eslint-disable no-lonely-if */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "GLOBAL_VARIABLES" }] */

  const SIRV_PREFIX = 'smv';
  let SIRV_HTTP_PROTOCOL = 'https:';
  let SIRV_ASSETS_URL = '';
  let SIRV_BASE_URL = '';

  const getAbsoluteURL = (() => {
    let a;
    return url => {
      if (!a) a = document.createElement('a');
      a.setAttribute('href', url);
      return ('!!' + a.href).replace('!!', '');
    };
  })();

  const scripts = document.getElementsByTagName('script');

  for (let i = 0, l = scripts.length; i < l; i++) {
    const src = scripts[i].getAttribute('src') || '';
    const isTestJs = scripts[i].getAttribute('data-sirvjs-test') !== null;

    if (isTestJs) {
      SIRV_ASSETS_URL = getAbsoluteURL(src).replace(/([^#?]+)\/.*$/, '$1/');
    } else {
      if (/sirv\.(com|localhost(:\d+)?)\/(([^#?]+)\/)?sirv(_.+)?\.js([?#].*)?$/i.test(src)) {
        SIRV_BASE_URL = getAbsoluteURL(src).replace(/(^https?:\/\/[^/]*).*/, '$1/');
        SIRV_ASSETS_URL = getAbsoluteURL(src).replace(/([^#?]+)\/.*$/, '$1/');

        if (/sirv\.localhost(:\d+)?\/(([^#?]+)\/)?sirv(_.+)?\.js([?#].*)?$/i.test(src)) {
          // dev env on localhost
          SIRV_HTTP_PROTOCOL = 'http:';
        }

        break;
      }
    }
  }

  const GLOBAL_VARIABLES = {
    SIRV_PREFIX: SIRV_PREFIX,
    CSS_RULES_ID: 'sirv-core-css-reset',
    SIRV_BASE_URL,
    CSS_CURSOR_ZOOM_IN: SIRV_PREFIX + '-cursor-zoom-in',
    CSS_CURSOR_FULSCREEN_ALWAYS: SIRV_PREFIX + '-cursor-fullscreen-always',
    // eslint-disable-next-line
    REG_URL_QUERY_STRING: /([^\?]+)\??([^\?]+)?/,
    FULLSCREEN_VIEWERS_IDs_ARRAY: [],
    CUSTOM_DEPENDENCIES: null,
    MIN_RATIO: 1.2,
    SIRV_HTTP_PROTOCOL,
    SIRV_ASSETS_URL,

    /**
     * slideShownBy
     * 0 - state of hiden slide
     * 1 - slider wants the slide
     * 2 - custumer wants the slide
     * 3 - first slide
     * 4 - disable or enable slide
     */
    SLIDE_SHOWN_BY: {
      NONE: 0,
      AUTOPLAY: 1,
      USER: 2,
      INIT: 3,
      ENABLE: 4
    },
    VIDEO: {
      NONE: 0,
      PLAY: 1,
      PAUSE: 2,
      PLAYING: 3
    },
    FULLSCREEN: {
      CLOSED: 0,
      OPENING: 1,
      OPENED: 2,
      CLOSING: 3
    },
    APPEARANCE: {
      HIDDEN: 0,
      SHOWING: 1,
      SHOWN: 2,
      HIDING: 3
    },
    SLIDE: {
      TYPES: {
        NONE: 0,
        HTML: 1,
        IMAGE: 2,
        PANZOOM: 3,
        ZOOM: 4,
        SPIN: 5,
        VIDEO: 6
      },
      NAMES: ['none', 'html', 'image', 'panzoom', 'zoom', 'spin', 'video']
    }
  };
  return GLOBAL_VARIABLES;
});
Sirv.define('globalFunctions', ['bHelpers', 'magicJS', 'globalVariables', 'helper'], (bHelpers, magicJS, globalVariables, helper) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global $ */

  /* global $J */

  /* global globalVariables */

  /* global helper */

  /* eslint-disable no-restricted-syntax */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint-disable no-unused-vars */
  // const SIRV_CSS = {
  //     src: 'viewer.css',
  //     state: -1
  // };

  const fileCache = {};

  const loadJSFile = (src, parent) => {
    return new Promise((resolve, reject) => {
      const script = $J.$new('script');
      script.attr('type', 'text/javascript');
      script.node.onload = resolve;
      script.node.onerror = reject;
      script.attr('src', src);
      script.appendTo(parent || $J.D.node.head);
    });
  };

  const adjustURLProto = url => {
    let result = url.replace(/^(https?:)?/, 'https:');

    if (/^(http(s)?:)?\/\/[^/]+?sirv\.localhost(:\d+)?\/.*$/i.test(url)) {
      // dev env on localhost
      result = url.replace(/^(https?:)?/, 'http:');
    }

    return result;
  };

  const sanitizeURLComponent = str => {
    try {
      str = decodeURIComponent(str);
    } catch (ex) {
      /* empty */
    }

    return encodeURIComponent(str);
  };

  const sanitizeURL = url => {
    return url.replace(/^((?:https?:)?\/\/)([^/].*)/, function (match, proto, uri) {
      return proto + uri.split('/').map(function (str, index) {
        if (index === 0) {
          return str;
        }

        return sanitizeURLComponent(str);
      }).join('/');
    });
  };

  class RootDOM {
    constructor() {
      this.CSSMap = {};
      this.sirvNodesMap = new WeakMap();
      this.rootNodesMap = new Map();
      this.rootNodes = []; // ie11 does not support this.rootNodesCollection.keys()

      this.sirvCSSSrc = 'viewer.css';
      this.mainCSSID = 'sirv-stylesheet-sirv';
    }

    static getShadowDOM(node
    /* Element which has 'Sirv' class name */
    ) {
      node = $(node).node;
      let result = false;
      const parent = node.parentNode;

      if (parent && window.ShadowRoot) {
        if (parent instanceof window.ShadowRoot) {
          result = parent;
        } else {
          result = RootDOM.getShadowDOM(parent);
        }
      }

      return result;
    }

    rootContains(node) {
      return this.rootNodes.some(root => {
        if (root === $J.D.node) {
          root = $J.D.node.body;
        }

        if (root) {
          return root.contains(node);
        }

        return false;
      });
    }

    addModuleCSSByName(moduleName, functionOfCssString, id, position) {
      if (!this.CSSMap[moduleName]) {
        this.CSSMap[moduleName] = {
          functionOfCssString: functionOfCssString,
          id: id,
          position: position
        };
      }
    }

    getRootNode(node
    /* Element which has 'Sirv' class name */
    ) {
      node = $(node).node;
      const shadowDOM = RootDOM.getShadowDOM(node);
      const rootNode = shadowDOM || $J.D.node;

      if (!this.rootNodesMap.has(rootNode)) {
        this.rootNodesMap.set(rootNode, {
          isResetCSSAdded: false,
          isVideoCSSAdded: false,
          isSirvAdAdded: false,
          styles: {},
          modulesCss: {},
          isShadowDOM: !!shadowDOM
        });
        this.rootNodes.push(rootNode);
      }

      return rootNode;
    }
    /*
        Attach node to root node
    */


    attachNode(node
    /* Element which has 'Sirv' class name */
    ) {
      node = $(node).node;

      if (!this.sirvNodesMap.has(node)) {
        const rootNode = this.getRootNode(node);
        this.sirvNodesMap.set(node, rootNode);
      }
    }
    /*
        Detach node from root node
    */


    detachNode(node
    /* Element which has 'Sirv' class name */
    ) {
      node = $(node).node;
      return this.sirvNodesMap.delete(node);
    }

    addCSSStringToHtml() {
      this.addCSSString($J.D.node.head || $J.D.node.body);
    }

    addCSSString(node
    /* Element which has 'Sirv' class name */
    ) {
      if (!node) {
        node = $J.D.node.head || $J.D.node.body;
      }

      node = $(node).node;
      const root = this.sirvNodesMap.get(node);
      const rootObject = this.rootNodesMap.get(root);
      let shadowRoot = null;

      if (rootObject.isShadowDOM) {
        shadowRoot = root;
      }

      Object.entries(this.CSSMap).forEach(([cssmapKey, cssmapValue]) => {
        if (!rootObject.modulesCss[cssmapKey]) {
          rootObject.modulesCss[cssmapKey] = 1;
          helper.addCss(cssmapValue.functionOfCssString(), cssmapValue.id, cssmapValue.position, shadowRoot, '#' + this.mainCSSID);
        }
      });
    }

    addMainStyleToHtml() {
      this.resetGlobalCSS($J.D.node.head || $J.D.node.body);
      this.addStyle($J.D.node.head || $J.D.node.body, globalVariables.SIRV_ASSETS_URL + this.sirvCSSSrc, this.mainCSSID, '#' + globalVariables.CSS_RULES_ID);
    }

    addMainStyle(node
    /* Element which has 'Sirv' class name */
    ) {
      this.addMainStyleToHtml();
      this.resetGlobalCSS(node);
      return this.addStyle(node, globalVariables.SIRV_ASSETS_URL + this.sirvCSSSrc, this.mainCSSID, '#' + globalVariables.CSS_RULES_ID);
    }

    addStyle(node
    /* Element which has 'Sirv' class name */
    , url, id, querySelector) {
      node = $(node).node;
      const root = this.sirvNodesMap.get(node);
      const rootObject = this.rootNodesMap.get(root);

      if (!rootObject.styles[id]) {
        rootObject.styles[id] = new Promise((resolve, reject) => {
          let _shadowRoot = null;

          if (rootObject.isShadowDOM) {
            _shadowRoot = root;
          }

          helper.loadStylesheet(url, id, _shadowRoot, querySelector).then(resolve).catch(reject);
        });
      }

      return rootObject.styles[id];
    }

    resetGlobalCSS(node
    /* Element which has 'Sirv' class name */
    ) {
      if (!node) {
        node = $J.D.node.head || $J.D.node.body;
      }

      node = $(node).node;
      const root = this.sirvNodesMap.get(node);
      const rootObject = this.rootNodesMap.get(root);

      if (rootObject.isResetCSSAdded) {
        return;
      }

      rootObject.isResetCSSAdded = true;
      let shadowRoot = null;

      if (rootObject.isShadowDOM) {
        shadowRoot = root;
      }

      $J.addCSS('.smv', {
        display: 'flex !important'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.smv.smv-selectors-top', {
        'flex-direction': 'column-reverse'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.smv.smv-selectors-left', {
        'flex-direction': 'row-reverse'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.smv.smv-selectors-right', {
        'flex-direction': 'row'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.smv.smv-selectors-bottom', {
        'flex-direction': 'column'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.smv-slides-box', {
        'flex-grow': 1,
        'flex-shrink': 1
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('figure > .Sirv', {
        'vertical-align': 'top'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.Sirv > iframe, .Sirv > video', {
        'display': 'none'
      }, globalVariables.CSS_RULES_ID, shadowRoot); // Hide custom thumbnail content until the viewer initialized.

      $J.addCSS(':not(.smv) smv-thumbnail', {
        'display': 'none'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.Sirv, .Sirv .smv-component', {
        '-webkit-box-sizing': 'border-box !important',
        '-moz-box-sizing': 'border-box !important',
        'box-sizing': 'border-box !important'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('div.Sirv, div.Sirv div.smv-component, figure.Sirv, div.smv-component', {
        width: '100%',
        height: '100%',
        margin: 0,
        'text-align': 'center'
      }, globalVariables.CSS_RULES_ID, shadowRoot); // It was added in 'fix video empty height' commit
      // I do not know why I added it, but it break Sirv if block where Sirv is has height. See test/zoom-test.html
      // $J.addCSS('div.Sirv', {
      //     'block-size': 'auto'
      // }, globalVariables.CSS_RULES_ID, shadowRoot);

      $J.addCSS('div.Sirv', {
        'max-height': '100%',
        'block-size': 'inherit'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.Sirv img', {
        'width': '100%',
        'height': '100%'
      }, globalVariables.CSS_RULES_ID, shadowRoot); // ResponsiveImage

      $J.addCSS('img.Sirv, .Sirv img', {
        'max-width': '100%'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('img.Sirv:not([width]):not([height])', {
        'width': '100%'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('img.Sirv', {
        'display': 'inline-block',
        'font-size': 0,
        'line-height': 0
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.Sirv.smv-bg-image.smv-bg-contain, .Sirv.smv-bg-image.smv-bg-cover', {
        'background-repeat': 'no-repeat',
        'background-position': 'center'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.Sirv.smv-bg-image.smv-bg-contain', {
        'background-size': 'contain'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('.Sirv.smv-bg-image.smv-bg-cover', {
        'background-size': 'cover'
      }, globalVariables.CSS_RULES_ID, shadowRoot); // $J.addCSS('img.Sirv[width], .Sirv img[width], img.Sirv[height], .Sirv img[height]', {
      //     'max-width': 'none'
      // }, globalVariables.CSS_RULES_ID, shadowRoot);

      $J.addCSS('img.Sirv:not([src]), img.Sirv.sirv-image-loading:not([src])', {
        'opacity': '0' // 'transition': 'opacity 0.5s linear'

      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('img.Sirv.sirv-image-loaded', {
        'opacity': '1',
        'transition': 'opacity 0.5s linear'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
    }

    showSirvAd(node
    /* Element which has 'Sirv' class name */
    , targetNode, landing, desc) {
      if (/^my.sirv.(com|localhost)$/i.test($J.D.node.location.hostname)) {
        // do not show Ad inside web app
        return;
      }

      if (!node) {
        node = $J.D.node.head || $J.D.node.body;
      }

      node = $(node).node;
      const root = this.sirvNodesMap.get(node);
      const rootObject = this.rootNodesMap.get(root);
      let shadowRoot = null;

      if (rootObject.isShadowDOM) {
        shadowRoot = root;
      }

      const crId = 'sirvCR' + Math.floor(Math.random() * +new Date());
      const BRAND_LOGO = {
        width: 90,
        height: 18,
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAkCAYAAAAgqxBxAAAMJ0lEQVR4nO1ce5AUxRnv4yH4wCfREogIqFHOI94uVoSNMnFvZ6e/30+TGB/BRFPRUomWRiMKd2tUTKEWKlGSCBKCxtJSSKkxKLhnKqaiJvgOYjSAAhdQ8EDkIYgm8fLH9hzNZGZn9+68o8r5VU3V7fbXX389+5vu79FzSiVIkCBBggQJegiu6w4DMIlkkeRKklsBbCG5EsAzJKeJyCnldDiOs5/neaO6y+YECUJBciaAz0i2xV0AFmut+wV1iMhoAK1GZqnjOAN7Yi4JvsDQWu9PckkIaTcBWAbgHZI7Am1vKqV6BXUBWBzQ87MemFKCLzJIvhIg671a63Gu6+7ryziOMxBAA4DpADYDuDRC14qArl9130wSfOEhIpcFCPjduD75fP5gx3H2C2sDcJal62MAx3W91QkShKMGwDqL0DO7QimAsQAubGhoOKIr9CVIUBHy+XxtYHUe3tM2JUjQYWitT7PI/EFP25MgQadA8kxrhd7mOE6fnrYpk8kMEJHRnud9padtSRADkm0NDQ0HRLU3NDQcAWBzd9njed7XbZdDa31SZ3WKSB2AR80133GcA+1213W/bLXf5H+fzWYPATAHwAdmx1jjt+Xz+YMBPALgIZIPxxV2gkhNLp6TamqeV18oPlxfKM7p7BwTGOxphM5kMgNI/tdyO57urE7bjTHXYLsdwHFW2/umz5BAcNoGYIvfx3GcPradJP9cjU2pQnFdqtDclio0t9UXis93do4JDPY0QiulFIB7AkS6Kb5XNLTWp1r6Pslms4fZ7SQHW+RcaL5bGXgI/gNgmVKqxu8nIj+xZTKZzIBK7Plq45PH+GROFZrbUpOL6c7ML4GFPZHQjuMcCODfAUI9lsvlBnVEXxyhXdc9lOQnfgGHZKP1MP0GwNhcLjcon88frqxKZD6fPzzgHp1TiT31heYpu1bn5tWVTqKfiAw1N6EmTh7AQQCGl/txuwqmwjU87NxBEFrrfp7nHWl+hOA8anK53CARGVpB8FRDcrCIDLXHrZbQ/n0123bsfe0oAJwccl5jB8lpWush1eiKI3Q2mz3EKqOvB7DTkPkHFdj5nKV7QSX2pJqKS9tX56ZiIcrokQCeBnAQybnGsKUAVgFYJyITwvp5npcl+aI5vLKE5EZzyCVjGV0AMCOsP8lbSD4c0fZrABf6n0UkZ8ZoIfmqGWt2Op3ex+4H4HXHcfqIyDUkN5JcYUq7x1kyFwNYTfKfJJcAaAXQpEJIJiJXkHwXwCqSb5B8n+TMdDq9D4CdlRDacZz9ANxN8n1zX1cDeE9ErvLHBPAQgO9H6TIrWktwvlEwxZDWEGJ/AuC+Sit+cYQ2nNkecHNmVaKb5EVWn521tbV7lZOvb1w40nY3aictCC/0iEgdyQ0A/iIil6TT6b5W2wkkV4jINYE+3zE/rqhdROhtSqUbtNauUu2Rd0vIsDWGVOtDyq41ANb5qR6t9bcArNFaj/MFMpnMAADzADxlja9ItgC4EsDvABwUHBTATwG8TPJo/zsTxLwAYGpAdgrJN0Skzv/OcZz+ACaSXEByaxyhzcOwSEQm2DuByR68TvIW8/lsAM9E6SJ5LYD7otrDYDINs0JI7V932b91GCohNICPLJntjuP0r9S+atyOVFOx0O5uNBWfixQ0hG4jeWNYu+d5o0hu9yeTTqf3IblRa31qmDzJMwGsMU9cbwCbXdc91pbRWmdIPgtgnoicbbcBON5/CMzq1gpgbHAcQ67V/sNjxm4B8HrY0661HklyY/BHMfdgKMkdxtdTnucdSXK71npE2ByNvxjrcvjEidAxnOQO13WH1dbW7kVyg+u6wyJk3wRwctRY5SAiJwCYjdI56OAJvGX5fL42qm+1hAYwrxrbAPze6ju/nGyqqfiWRegLyk24zvw4kbV6AM8DuMDIjwfwUoyhy0WE5u/5InJFYMw7jVtwUdDtMCvsHCN3HoDIpxHA7SR/6X82hL48Yp53AvhFGV3NvptjVuHHomSNu1URoT3PO7HMmE8AmGj+niEiNwRltNYnAViuOul3mxXxRpJbg25I1IPbAUJfXY1NZqdvLwZFxUappkWjdvnOzZ8edfnC6BjKbH8flRsYwAwA083f0wH8PEZ+Ns3ZWQAXAHjCau4FYC3Jo3O53CAAmwPB1gKYU2IA7gFwa9Q4JC8ybof/uSWqoADghXLbGoC7ReRm8/dDACZFyWaz2cMqJXS5ABbAFN+V0FrXk1ypAsQFMEtEJkfpqBau6x4K4NHASr1GKdU7KNsBQp9RjS2O4/Qnuc3vLyLfDJOzsxuppubyu4Ah9JoYmetI3q+UUiQfjLvBAG4CMFsppXK53CD76UMpCn/Fkn1Oa32aUkql0+m+JpAaaNoeB/ABgHfCLuPHP+vrItli+7wBm9YanzZK14cA7jZ6/ogykbopDlSS5fi43H0yxz3bI3yWAl7H/zxmzJi9WQpuB4cq6AQAzAmQ+sqgTLWE1lrrDtjxgEXo34bJpArFt31CnzB5kVNWoSF0a8yg15Oc6xuAUlagnPxUWIfBAfwdwDfM3zNINlrjX+Xr1lpnALxs9XtcRK4xNy70spPyMYReo7V2y+nyswgA/kTy/Kj5pdPpvhUSeme5+0Tyx7ZrA+ByAPda92Z8YHfrUgBYbhH67WB7tYT23cxqICJeIKjcLY1a11g81vKdy/LUV1gH4NNy+VgAs/3tWERu9lffKARXcZZSdD9TpZzuu7SyDCYgW6+U6iUik20XA6Uo/ZbYSewapxyhXwBwViV6AMwjeW1Uu18YqMTlKJdqA3Cbvyso1e7nbrQerCeq3carQcgLAbsdOe0OQiulFMkPfR2e52XttlSheJuVe55WyaTqSLbl8/lUmQFXWEFeA4BVKuQdNKXat+P1dj5aRE4h+azWuh7AayH6X/Q870SSf7AnJCLjSb4aO4ldeiIJTXKaH2zGwQSskUEhAFThQ4+LkgHwkoicF/huvoic6zjOQJLvxuVnOwOTlrVTZ67d3l2ENjFXqNtR3/TUivYVunHhyEomVYfS28FzI9rPBbDayln2YqkgEfoeGoBJxm1oD27MFr3e+OKNwT4s5VmvN25BexA1ZsyYvY3v+73YiajyhNZajzC+fH2cHq31EJJbtdahNxDAkwA+q4TQiEhHkRSSG4N5eK21NoHxpSTviLO1MzDpSTvjIQFbuoXQIvI1a5wdjqPavYX6QnGOIXRlC5sh9FIAj5C8S0SOUUrVmGN+l7JUKBkX7GMIeoPrusPS6XTffD5/FIBbAaxFSCUKpWLHWtvd8GH6rgWwKNhm/OpWAFO01iMcx+njOE5/z/NGAZgoIqN92XKENnb/EECriEwwgVZNJpMZYFJjU13XPdSSnQBgDYAzDOl6marqAyYF+I8KfOjnSc4FMMcUino1NDQcgFLmp9UPhgPobYLUJQCOj9LfFRCR0Tahg7t0dxHa6HrP13O6m835348qPHNSqtDclmpsjnQBg5OqA7DKlIyvMpH2BgDvoVT4iFrxhgCYhVIpd5MJMO7yixNBkPw2ylS7ANwXtRKb1W4mgOVmrLUk/yoi12mtv2SN8WBUccIaJ43SWdwWAJtYKqcXReSyYIoNQN6sxuvMQ7UYpkRtHoB9w0cppcdMhbWGpfTiYuu+PgIg8qQYgNsBLC43j64AgIJF2K3BymE3E/rWMLfjsInFfeubiu+OaipW9nCb1TasPJ2ghwDgSRG55PMcw8Q6G6yA8N6gTHcS2vbnAWyy21JNi0aps+b/X548SlFC6D0IxlXZorXev5p+psQ93XabomCyKX8LuBtHBeW6k9BG37JdAaoberQiFgmh9yyQvCMuLRoGa8veZty38wEcr7XeX2vdz8REYwFMZalYY6frQkvW3U1olkrzJZt4etX3QCmVEHpPgO+7m8LP5rDAOQ4mHgg7VbeVpYrq9rB2BE4ZBuw61ZL7NO74aGcJ7bruMGu8dR1SkhC654HSwagtJP8F4PSO6NBanwbg6QhSh12vRGRZdtMZ6LNbCd7kytssQo/viO02ALy5y+1gWfui0Ls73jZJEIvKgp4YaK1HAPgRyftReivkDZJvAXgNwFMicnOlb1obf34igKsBXBmsejqO019ErjAyE9EF/9wGwMVmV9nGzzkPnyBBggQJugP/A94x91x//ZrKAAAAAElFTkSuQmCC'
      };
      $J.addCSS('#' + crId, {
        display: 'inline-block !important;',
        visibility: 'visible !important;',
        'z-index': '2147483647 !important;',
        width: 'auto !important;',
        height: 'auto !important;',
        'max-width': 'none !important;',
        'max-height': 'none !important;',
        transform: 'none !important;',
        left: 'auto !important;',
        top: 'auto !important;',
        bottom: '8 !important;',
        right: '8 !important;',
        margin: 'auto !important',
        padding: '0 !important',
        opacity: '1 !important;'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      $J.addCSS('#crSirv' + crId + ' > img', {
        display: 'inline-block !important;',
        visibility: 'visible !important;',
        position: 'static !important;',
        width: '90px !important;',
        height: '18px !important;',
        'max-width': 'none !important;',
        'max-height': 'none !important;',
        transform: 'none !important;',
        margin: '0 !important',
        padding: '0 !important'
      }, globalVariables.CSS_RULES_ID, shadowRoot);
      const el = $J.$new('a', {
        id: crId,
        href: landing,
        target: '_blank'
      });
      el.attr('style', 'position: absolute !important; opacity: 1 !important');
      el.setCss({
        display: 'inline-block',
        overflow: 'hidden',
        visibility: 'visible',
        'font-size': 0,
        'font-weight': 'normal',
        'font-family': 'sans-serif',
        bottom: 8,
        right: 8,
        margin: 'auto',
        width: 'auto',
        height: 'auto',
        transform: 'none',
        'z-index': 2147483647
      }).appendTo(targetNode).addEvent(['tap', 'btnclick'], e => {
        e.stopDistribution();
        $J.W.node.open(el.attr('href'));
      }).append($J.$new('img', BRAND_LOGO).setProps({
        alt: desc
      }));
    }

  }

  const rootDOM = new RootDOM();
  const GLOBAL_FUNCTIONS = {
    rootDOM,
    loadJsFile: (src, parent) => {
      if (!fileCache[src]) {
        fileCache[src] = loadJSFile(src, parent);
      }

      return fileCache[src];
    },
    loadCssFile: (rootNode, src, id, stylesheet) => {
      if (!fileCache[src]) {
        fileCache[src] = rootDOM.addStyle(rootNode, src, id, stylesheet);
      }

      return fileCache[src];
    },
    viewerFilters: [],
    getNodeWithSirvClassName: node => {
      let result = null;

      if (node) {
        node = $(node);

        if (node.hasClass('Sirv')) {
          result = node.node;
        } else {
          result = GLOBAL_FUNCTIONS.getNodeWithSirvClassName(node.node.parentNode);
        }
      }

      return result;
    },
    iconsHash: {
      nodes: [],
      elements: [[{
        classes: ['smv-arrow-control']
      }, {
        classes: ['smv-arrow']
      }, {
        classes: ['smv-icon']
      }], [{
        classes: ['smv-button-fullscreen-open']
      }, {
        classes: ['smv-icon']
      }], [{
        classes: ['smv-button-fullscreen-close']
      }, {
        classes: ['smv-icon']
      }], [{
        classes: ['smv-thumbnails']
      }, {
        classes: ['smv-selector'],
        attrs: [{
          name: 'data-type',
          value: 'spin'
        }]
      }]],
      waitBody: () => {
        return new Promise((resolve, reject) => {
          const body = document.body;

          if (body) {
            resolve(body);
          } else {
            setTimeout(function () {
              GLOBAL_FUNCTIONS.iconsHash.waitBody().then(resolve);
            }, 16);
          }
        });
      },
      make: () => {
        GLOBAL_FUNCTIONS.iconsHash.elements.forEach(data => {
          const elements = [];
          data.reverse().forEach(el => {
            const node = $J.$new('div');

            if (el.classes) {
              el.classes.forEach(className => {
                node.addClass(className);
              });
            }

            if (el.attrs) {
              el.attrs.forEach(attr => {
                node.attr(attr.name, attr.value);
              });
            }

            elements.push(node);
          });

          for (let i = 1, l = elements.length; i < l; i++) {
            elements[i].append(elements[i - 1]);
          }

          GLOBAL_FUNCTIONS.iconsHash.nodes.push(elements[elements.length - 1]);
        });
        GLOBAL_FUNCTIONS.iconsHash.nodes.forEach(el => {
          el.setCss({
            top: '-10000px',
            left: '-10000px',
            width: '10px',
            height: '10px',
            position: 'absolute',
            visibility: 'hodden',
            opacity: 0
          });
          GLOBAL_FUNCTIONS.iconsHash.waitBody().finally(() => {
            $J.$($J.D.node.body).append(el);
          });
        });
      },
      remove: () => {
        if (GLOBAL_FUNCTIONS.iconsHash.nodes.length) {
          GLOBAL_FUNCTIONS.iconsHash.nodes.forEach(el => {
            el.remove();
          });
          GLOBAL_FUNCTIONS.iconsHash.nodes = [];
        }
      }
    },
    adjustURL: url => {
      if (!/^(http(s)?:)?\/\//.test(url)) {
        url = globalVariables.SIRV_BASE_URL + url;
      }

      return adjustURLProto(url).replace(/([^:])\/+/g, '$1/');
    },

    normalizeURL(url) {
      return sanitizeURL(adjustURLProto(url));
    }

  };
  GLOBAL_FUNCTIONS.rootDOM.attachNode($J.D.node.head || $J.D.node.body);
  return GLOBAL_FUNCTIONS;
});
Sirv.define('helper', ['bHelpers', 'magicJS', 'globalVariables'], (bHelpers, magicJS, globalVariables) => {
  const $J = magicJS;
  const $ = $J.$;
  const helper = {};
  /* global $J, helper */

  /* eslint-env es6 */

  class WaitToStart {
    constructor() {
      this.started = false;
      this.callbacks = [];
    }

    wait(cb) {
      if (this.started) {
        cb();
      } else {
        this.callbacks.push(cb);
      }
    }

    start() {
      if (!this.started) {
        this.started = true;
        this.callbacks.forEach(cb => cb());
      }
    }

    destroy() {
      this.callbacks = [];
    }

  }

  helper.WaitToStart = WaitToStart;
  /* global $J, helper */

  /* eslint-env es6 */
  // helper.addCss = (css, id, position) => {
  //     if (!position) { position = 'top'; }
  //     const stl = $J.$new('style', { id: (id || 'sirv-module-' + helper.generateUUID()), type: 'text/css' }).appendTo((document.head || document.body), position);
  //     stl.node.innerHTML = css;
  //     return stl;
  // };

  helper.addCss = (css, id, position, root, selector) => {
    let rootNode = document.head || document.body;
    const stl = $J.$new('style', {
      type: 'text/css'
    });
    stl.attr('id', id || 'sirv-module-' + stl.$J_UUID);

    if (!position) {
      position = 'top';
    }

    if (root) {
      rootNode = $(root).node || root;
    }

    let nextSibling;

    if (position === 'top') {
      nextSibling = rootNode.firstChild;
    }

    const addAfter = rootNode.querySelector(selector);

    if (addAfter && addAfter.nextSibling) {
      nextSibling = addAfter.nextSibling;
    }

    rootNode.insertBefore(stl.node, nextSibling);
    stl.node.innerHTML = css;
    return stl;
  };
  /* eslint-env es6 */

  /* global helper */


  helper.cleanQueryString = str => {
    str = str.replace(/&+/g, '&');
    str = str.replace(/&$/, '');
    str = str.replace(/\?&/, '?');
    str = str.replace(/profile=&|profile=$/g, '');
    str = str.replace(/image=&/g, 'image&');
    str = str.replace(/image=$/g, 'image');
    return str;
  };
  /* eslint-env es6 */

  /* global helper */


  helper.createReadOnlyProp = (obj, name, value) => {
    Object.defineProperty(obj, name, {
      value: value,
      writable: false
    });
  };
  /* global $J, helper */

  /* eslint-env es6 */
  // Returns if a value is an object


  const isObject = value => {
    return value && typeof value === 'object' && value.constructor === Object;
  };
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked, or until the next browser frame is drawn. The debounced function
   * comes with a `cancel` method to cancel delayed `func` invocations and a
   * `flush` method to immediately invoke them. Provide `options` to indicate
   * whether `func` should be invoked on the leading and/or trailing edge of the
   * `wait` timeout. The `func` is invoked with the last arguments provided to the
   * debounced function. Subsequent calls to the debounced function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
   * invocation will be deferred until the next frame is drawn (typically about
   * 16ms).
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `debounce` and `throttle`.
   *
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0]
   *  The number of milliseconds to delay; if omitted, `requestAnimationFrame` is
   *  used (if available).
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', debounce(calculateLayout, 150))
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }))
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
   * const source = new EventSource('/stream')
   * jQuery(source).on('message', debounced)
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel)
   *
   * // Check for pending invocations.
   * const status = debounced.pending() ? "Pending..." : "Ready"
   */


  helper.debounce = (func, wait, options) => {
    let lastArgs;
    let lastThis;
    let maxWait;
    let result;
    let timerId;
    let lastCallTime;
    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    // const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function');

    const useRAF = !wait && wait !== 0 && $J.browser.features.requestAnimationFrame;

    if (typeof func !== 'function') {
      throw new TypeError('Expected a function');
    }

    wait = +wait || 0;

    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    const invokeFunc = time => {
      const args = lastArgs;
      const thisArg = lastThis;
      lastArgs = $J.U;
      lastThis = lastArgs;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    };

    const startTimer = (pendingFunc, _wait) => {
      if (useRAF) {
        $J.browser.cancelAnimationFrame(timerId);
        return $J.browser.requestAnimationFrame(pendingFunc);
      }

      return setTimeout(pendingFunc, _wait);
    };

    const cancelTimer = id => {
      if (useRAF) {
        $J.browser.cancelAnimationFrame(id);
      } else {
        clearTimeout(id);
      }
    };

    const remainingWait = time => {
      const timeSinceLastCall = time - lastCallTime;
      const timeSinceLastInvoke = time - lastInvokeTime;
      const timeWaiting = wait - timeSinceLastCall;
      return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    };

    const shouldInvoke = time => {
      const timeSinceLastCall = time - lastCallTime;
      const timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === $J.U || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    };

    const trailingEdge = time => {
      timerId = $J.U; // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = $J.U;
      lastThis = lastArgs;
      return result;
    };

    const timerExpired = () => {
      const time = Date.now();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = startTimer(timerExpired, remainingWait(time));
      return $J.U;
    };

    const leadingEdge = time => {
      // Reset any `maxWait` timer.
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = startTimer(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    };

    const cancel = () => {
      if (timerId !== $J.U) {
        cancelTimer(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = $J.U;
      lastCallTime = lastArgs;
      lastThis = lastArgs;
      timerId = lastArgs;
    };

    const flush = () => {
      return timerId === $J.U ? result : trailingEdge(Date.now());
    };

    const pending = () => {
      return timerId !== $J.U;
    };

    const debounced = (...args) => {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);
      lastArgs = args;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === $J.U) {
          return leadingEdge(lastCallTime);
        }

        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = startTimer(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }

      if (timerId === $J.U) {
        timerId = startTimer(timerExpired, wait);
      }

      return result;
    };

    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
  };
  /* global $, $J, helper */

  /* eslint-env es6 */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */


  helper.deepExtend = (() => {
    const extend = (extendingObject, source) => {
      const type = $J.typeOf(source);

      if (!$J.defined(extendingObject)) {
        if (type === 'array') {
          extendingObject = [];
        } else {
          extendingObject = {};
        }
      }

      if (type === 'array') {
        source.forEach((value, index) => {
          const _type = $J.typeOf(value);

          if (_type === 'array' && $J.typeOf(extendingObject[index]) === 'array' || _type === 'object' && $J.typeOf(extendingObject[index]) === 'object') {
            extendingObject[index] = extend(extendingObject[index], value);
          } else {
            extendingObject.push(value);
          }
        });
      } else {
        Object.entries(source).forEach(([key, value]) => {
          const _type = $J.typeOf(value);

          if (_type === 'array' || _type === 'object') {
            extendingObject[key] = extend(extendingObject[key], value);
          } else {
            extendingObject[key] = value;
          }
        });
      }

      return extendingObject;
    };

    return (...args) => {
      let result = null;

      if (args && args.length) {
        result = args.shift();
        args.forEach(value => {
          const _type = $J.typeOf(value);

          if (_type === 'array' || _type === 'object') {
            result = extend(result, value);
          }
        });
      }

      return result;
    };
  })();
  /* global $J, helper */

  /* eslint-env es6 */


  helper.fixSize = (node, size) => {
    node = $(node);

    const checkAuto = (_node, side) => {
      return _node.attr(side) === 'auto';
    };

    const correctSizeValue = value => {
      if (value <= 4) {
        value = 0;
      }

      return value;
    };

    ['width', 'height'].forEach(side => {
      if ($J.browser.ieMode && !node.attr('src')) {
        if (checkAuto(node, side)) {
          size[side] = 0;
        }
      }

      if (size[side] === 0) {
        // check "width" / "height" attribute
        size[side] = helper.imageLib.getPartSize(node, side);
      }

      size[side] = correctSizeValue(size[side]);
    });
    return size;
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.generateUUID = () => {
    return parseInt(Math.random() * 10000000, 10);
  };
  /* global helper */

  /* eslint-env es6 */


  helper.getArrayIndex = (index, length) => {
    index %= length;

    if (index < 0) {
      index += length;
    }

    return index;
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.getDPPX = (value, maxValue, upscale) => {
    let result = maxValue / value;
    const count = 100;

    if (result >= $J.DPPX || upscale) {
      result = $J.DPPX;
    } else {
      result *= count;
      result = Math.ceil(result) / count;
    }

    return result;
  };
  /* global helper */

  /* global $ */

  /* eslint-env es6 */


  helper.getMatrix = node => {
    let result = null;
    let matrix = $(node).getCss('transform') + '';

    const getNumber = str => {
      return parseFloat(str.trim());
    };

    const getTrObj = (arrIndexes, arr) => {
      const _result = {};
      const axises = ['x', 'y', 'z'];
      arrIndexes.forEach(function (v, i) {
        _result[axises[i]] = getNumber(arr[v]);
      });
      return _result;
    };

    if (matrix !== 'none') {
      result = {};
      matrix = matrix.split('(')[1];
      matrix = matrix.split(')')[0];
      matrix = matrix.split(',');
      const is3D = matrix.length > 6;
      result.transform = getTrObj(is3D ? [12, 13, 14] : [4, 5], matrix);
      result.scale = getTrObj(is3D ? [0, 5, 10] : [0, 3], matrix);
    }

    return result;
  };
  /* global $J, helper, Promise */

  /* eslint no-throw-literal: "off" */

  /* eslint-env es6 */


  helper.getRemoteData = (() => {
    const __XMLHttpRequest = url => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        if (xhr) {
          xhr.onerror = e => {
            reject(e || true);
          };

          xhr.onload = e => {
            try {
              if (xhr.status === 200) {
                const value = JSON.parse(xhr.responseText);
                resolve(value);
              } else {
                throw {
                  status: xhr.status,
                  data: e
                };
              }
            } catch (_err) {
              reject(_err);
            }
          };

          xhr.open('GET', url);

          if (undefined !== xhr.responseType) {
            xhr.responseType = 'text';
          }

          xhr.send(null);
        } else {
          reject(true);
        }
      });
    };

    const getByFetch = (url, referrerPolicy) => {
      return fetch(url, {
        referrerPolicy: referrerPolicy || 'no-referrer-when-downgrade'
      }).then(response => {
        if (response.status === 200) {
          return response.json();
        }

        throw {
          status: response.status,
          data: response
        };
      });
    };

    const getData = window.fetch ? getByFetch : __XMLHttpRequest;

    const __jsonp = (url, callbackName) => {
      return new Promise((resolve, reject) => {
        let scriptOk = false;
        const script = document.createElement('script');

        if (!window[callbackName]) {
          window[callbackName] = (...args) => {
            scriptOk = true;
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(args[0]);
          };
        }

        const checkCallback = () => {
          if (scriptOk) return;
          delete window[callbackName];
          document.body.removeChild(script);
          reject(url);
        };

        script.onreadystatechange = () => {
          if (this.readyState === 'complete' || this.readyState === 'loaded') {
            this.onreadystatechange = null;
            setTimeout(checkCallback, 0);
          }
        };

        script.onerror = checkCallback;
        script.onload = checkCallback;
        script.src = url + '&callback=' + callbackName;
        document.body.appendChild(script);
      });
    };

    return (url, callbackName
    /* for jsonp */
    , referrerPolicy) => {
      return new Promise((resolve, reject) => {
        getData(url, referrerPolicy).then(resolve).catch(err => {
          if (err && err.status && [404, 200].includes(err.status)) {
            reject(err);
          } else {
            // eslint-disable-next-line no-console
            console.log('XHR error. Switching to JSONP.');

            if (!callbackName) {
              callbackName = 'sirv_data_' + helper.generateUUID();
            }

            __jsonp(url, callbackName).then(resolve).catch(reject);
          }
        });
      });
    };
  })();
  /* global helper */

  /* global $ */

  /* eslint-env es6 */


  helper.getSirvType = (() => {
    const isNotEmptyString = str => {
      let result = false;

      if (str) {
        str += '';
        result = str.trim() !== '';
      }

      return result;
    };

    return node => {
      node = $(node);
      let tmp = node.attr('data-type') || node.attr('data-effect');
      const viewContent = node.fetch('view-content');
      let result = null;
      let componentType;
      let imgSrc;

      if (isNotEmptyString(tmp) && tmp !== 'static') {
        const index = globalVariables.SLIDE.NAMES.indexOf(tmp);
        componentType = index >= 0 ? index : globalVariables.SLIDE.TYPES.ZOOM;
        tmp = node.attr('data-src');

        if (isNotEmptyString(tmp)) {
          imgSrc = tmp;
        } else {
          tmp = $(node.node.getElementsByTagName('img')[0]);

          if (tmp.attr) {
            imgSrc = tmp.attr('src') || tmp.attr('data-src');
          }
        }
      } else {
        tmp = node.attr('data-src');

        if (isNotEmptyString(tmp)) {
          if (helper.isSpin(tmp) && node.tagName !== 'img' || viewContent === globalVariables.SLIDE.TYPES.SPIN) {
            componentType = globalVariables.SLIDE.TYPES.SPIN;
          } else if (helper.isVideo(tmp)) {
            componentType = globalVariables.SLIDE.TYPES.VIDEO;
          } else {
            componentType = globalVariables.SLIDE.TYPES.IMAGE;

            if (viewContent) {
              componentType = viewContent;
            }
          }

          imgSrc = tmp;
        } else {
          tmp = node.attr('src');

          if (isNotEmptyString(tmp) && node.tagName === 'img') {
            imgSrc = tmp;
            componentType = globalVariables.SLIDE.TYPES.IMAGE;
          }
        }
      }

      if (componentType) {
        result = {
          type: componentType,
          imgSrc: imgSrc
        };
      }

      return result;
    };
  })();
  /* global $, $J, helper */

  /* eslint-env es6 */


  helper.imageLib = {
    isNumber: value => {
      return /(px|%)$/.test(value);
    },
    getSize: (node, count) => {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        const size = $(node).getInnerSize();

        if (!count) {
          count = 100;
        }

        count -= 1;

        if (!size.width && !size.height && count > 0) {
          setTimeout(() => {
            helper.imageLib.getSize(node, count).then(resolve);
          }, 16);
        } else {
          resolve(size);
        }
      });
    },
    // just for pixels
    getBackgroundValue: value => {
      if (value && /px$/.test(value)) {
        return parseInt(value, 10);
      }

      return null;
    },
    // just for pixels
    getBackgroundSize: node => {
      let result = null;
      let value = $(node).getCss('background-size');

      if (value) {
        value = value.split(',')[0].split(' ');
        const w = helper.imageLib.getBackgroundValue((value[0] || '').trim());
        const h = helper.imageLib.getBackgroundValue((value[1] || '').trim());

        if (w !== null) {
          result = {
            width: w
          };
        }

        if (h !== null) {
          if (!result) {
            result = {};
          }

          result.height = h;
        }
      }

      return result;
    },
    calcProportionalBackgroundSize: (bgSize, infoSize) => {
      const result = {
        width: infoSize.width,
        height: infoSize.height
      };

      if (bgSize.width && infoSize.width > bgSize.width) {
        result.width = bgSize.width;
        result.height = bgSize.width * infoSize.height / infoSize.width;
      }

      if (bgSize.height && infoSize.height > bgSize.height) {
        result.height = bgSize.height;
        result.width = bgSize.height * infoSize.width / infoSize.height;
      }

      return result;
    },
    getBackgroundPositionValue: value => {
      let result;

      switch (value) {
        case 'top':
        case 'left':
          result = 0;
          break;

        case 'center':
          result = 50;
          break;

        case 'right':
        case 'bottom':
          result = 100;
          break;

        default:
          if (helper.imageLib.isNumber(value)) {
            result = parseInt(value, 10);
          } else {
            result = 0;
          }

      }

      return result;
    },
    getBackgroundPosition: node => {
      const x = {
        side: 'left',
        position: 0,
        sign: '%'
      };
      const y = {
        side: 'top',
        position: 0,
        sign: '%'
      };
      let xIndex = 0;
      let yIndex = 1;
      let value = $(node).getCss('background-position');

      if (value) {
        value = value.replace(/important/, '');
        value = value.replace(/!/g, '');
        value = value.trim();
        value = value.replace(/\s+/g, ' ');
        value = value.split(' ');

        if (value.length > 2) {
          xIndex = 1;
          yIndex = 3;

          if (['left', 'right'].includes(value[0])) {
            x.side = value[0];
          }

          if (['top', 'bottom'].includes(value[2])) {
            y.side = value[2];
          }
        }

        x.position = helper.imageLib.getBackgroundPositionValue(value[xIndex]);
        y.position = helper.imageLib.getBackgroundPositionValue(value[yIndex]);

        if (/px$/.test(value[xIndex])) {
          x.sign = 'px';
        }

        if (/px$/.test(value[yIndex])) {
          y.sign = 'px';
        }
      }

      return {
        x: x,
        y: y
      };
    },
    getPartSize: (node, side) => {
      let result = 0;
      let value;

      if ($J.browser.ieMode) {
        value = (node.currentStyle[side] || '0').replace(/px$/, '');
      } else {
        value = (node.getCss(side) || '0').replace(/px$/, '');
      }

      if (isFinite(value)) {
        result = Math.round(parseFloat(value)) - parseFloat(node.getCss('border-top-width') || 0) - parseFloat(node.getCss('border-bottom-width') || 0) - parseFloat(node.getCss('padding-top') || 0) - parseFloat(node.getCss('padding-bottom') || 0);
      }

      return result;
    },
    checkMaxSize: (size, originSize, dppx) => {
      let firstSide;
      let secondSide;

      if (size.width > originSize.width * dppx || size.height > originSize.height * dppx) {
        if (size.width > originSize.width) {
          firstSide = 'width';
          secondSide = 'height';
        } else {
          firstSide = 'height';
          secondSide = 'width';
        }

        size[firstSide] = originSize[firstSide];

        if (size[secondSide]) {
          size[secondSide] = originSize[secondSide];
        }

        size.round = false;
      }

      return size;
    },
    calcImageProportion: (firstSide, secondSide, proportionSize, baseFirstSize) => {
      const prop = proportionSize[secondSide] / proportionSize[firstSide];
      const result = {};
      result[firstSide] = baseFirstSize;
      result[secondSide] = parseInt(prop * result[firstSide], 10);
      return result;
    },
    contain: (imageSize, containerSize) => {
      let result = {
        width: imageSize.width,
        height: imageSize.height
      };

      if (containerSize.width && result.width > containerSize.width) {
        result = helper.imageLib.calcImageProportion('width', 'height', result, containerSize.width);
      }

      if (containerSize.height && result.height > containerSize.height) {
        result = helper.imageLib.calcImageProportion('height', 'width', result, containerSize.height);
      }

      return result;
    },
    cover: (imageSize, containerSize) => {
      let result = {
        width: imageSize.width,
        height: imageSize.height
      };

      if (containerSize.width && result.width < containerSize.width) {
        result = helper.imageLib.calcImageProportion('width', 'height', result, containerSize.width);
      }

      if (containerSize.height && result.height < containerSize.height) {
        result = helper.imageLib.calcImageProportion('height', 'width', result, containerSize.height);
      }

      return result;
    },
    calcProportionSize: (size, originSize, fitSize) => {
      let result = {};
      let w = originSize.width;
      let h = originSize.height;
      const wh = w / h;
      const hw = h / w;

      const setW = () => {
        result.height = size.height;
        result.width = parseInt(wh * size.height, 10);
      };

      const setH = () => {
        result.width = size.width;
        result.height = parseInt(hw * size.width, 10);
      };

      if (size.width > w || size.height > h) {
        if (size.width > w) {
          size.width = w;

          if (size.height) {
            if (size.height > h) {
              size.height = h;
            } else {
              setW();
            }
          }
        } else {
          size.height = h;

          if (size.width) {
            if (size.width > w) {
              size.width = w;
            } else {
              setH();
            }
          }
        }
      }

      if (size.width || size.height) {
        if (size.width && size.height) {
          // if (Math.abs(size.width / size.height - wh) <= Math.abs(size.height / size.width - hw)) {
          if (size.width / size.height - wh <= size.height / size.width - hw) {
            setH();
          } else {
            setW();
          }
        } else if (!size.width) {
          setW();
        } else {
          setH();
        }
      }

      if (fitSize) {
        if (helper.imageLib.isNumber(fitSize.width) && helper.imageLib.isNumber(fitSize.height)) {
          w = parseInt(fitSize.width, 10);

          if (/%$/.test(fitSize.width)) {
            w = w / 100 * size.width;
          }

          h = parseInt(fitSize.height, 10);

          if (/%$/.test(fitSize.height)) {
            h = h / 100 * size.height;
          }

          if (w < originSize.width / originSize.height * h) {
            result = helper.imageLib.calcImageProportion('width', 'height', originSize, w);
          } else {
            result = helper.imageLib.calcImageProportion('height', 'width', originSize, h);
          }
        } else {
          if (helper.imageLib.isNumber(fitSize.width)) {
            w = parseInt(fitSize.width, 10);

            if (/%$/.test(fitSize.width)) {
              w = w / 100 * size.width;
            }

            result = helper.imageLib.calcImageProportion('width', 'height', originSize, w);
          }

          if (helper.imageLib.isNumber(fitSize.height)) {
            h = parseInt(fitSize.height, 10);

            if (/%$/.test(fitSize.height)) {
              h = h / 100 * size.height;
            }

            result = helper.imageLib.calcImageProportion('height', 'width', originSize, h);
          }

          if ([fitSize.width, fitSize.height].includes('initial')) {
            result.width = originSize.width;
            result.height = originSize.height;
          } else if ([fitSize.width, fitSize.height].includes('cover')) {
            result = helper.imageLib.cover(result, size);
          } else if ([fitSize.width, fitSize.height].includes('contain')) {
            result = helper.imageLib.contain(result, size);
          }
        }
      }

      return result;
    }
  };
  /* eslint-env es6 */

  /* global $, $J, helper */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none"}] */

  /* eslint no-empty: "error"*/

  helper.InViewModule = (() => {
    const elementIsShown = node => {
      let result = true;

      if (node.tagName !== 'body') {
        if (node.getCss('display') === 'none') {
          result = false;
        } else {
          result = elementIsShown($(node.node.parentNode));
        }
      }

      return result;
    };

    class Timer {
      constructor() {
        this.timer = null;
        this.started = false;
        this.list = [];
      }

      _startTimer() {
        if (this.list.length) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this._check();

            if (this.started) {
              this._startTimer();
            }
          }, 500);
        }
      }

      _check() {
        this.list.forEach(obj => {
          const isShown = elementIsShown(obj.obj.node);
          const callCB = isShown !== obj.obj.isShown;
          obj.obj.isShown = isShown;

          if (callCB) {
            obj.callback(obj.obj);
          }
        });
      }

      push(obj, cb) {
        const insideObj = {
          obj: obj,
          callback: cb
        };
        this.list.push(insideObj);

        if (!this.started) {
          this.started = true;

          this._startTimer();
        }
      }

      remove(node) {
        for (let i = 0, l = this.list.length; i < l; i++) {
          if (this.list[i].obj.node.node === node) {
            this.list.splice(i, 1);
            break;
          }
        }

        if (!this.list.length) {
          this.started = false;
        }
      }

    }

    const timerInstance = new Timer();

    const getPercent = (full, current) => {
      let result = 0;

      if (full > 0) {
        result = current / full;
      }

      return result;
    };

    const checkValue = value => {
      let result = null;

      if (value !== null) {
        value = parseFloat(value);

        if (!isNaN(value)) {
          if (value < 0) {
            value = 0;
          }

          if (value > 1) {
            value = 1;
          }

          result = value;
        }
      }

      return result;
    };

    const getRootSize = node => {
      if (!node) {
        node = window;
      }

      return {
        width: node.offsetWidth || node.innerWidth || document.documentElement.clientWidth,
        height: node.offsetHeight || node.innerHeight || document.documentElement.clientHeight
      };
    };

    const getRootData = (node, pos, size) => {
      const result = Object.assign({}, pos);

      try {
        const tmp = $(node).getBoundingClientRect();
        result.top += tmp.top;
        result.left += tmp.left;
      } catch (e) {
        /* empty */
      }

      return Object.assign(result, size);
    }; // px and % only


    const checkRootMargin = value => {
      let result = [];

      const f = () => {
        return 0;
      };

      if (value && !Array.isArray(value)) {
        if ($J.typeOf(value) === 'number') {
          value = [value];
        } else if ($J.typeOf(value) === 'string') {
          value = value.split(' ');
          value = value.map(v => v.trim());
        } else {
          value = null;
        }
      }

      if (Array.isArray(value)) {
        let l = value.length;

        if (l > 4) {
          l = 4;
        }

        value.forEach(v => {
          if (['string', 'number'].includes($J.typeOf(v))) {
            const number = parseInt(v, 10);

            if (/%$/.test(v)) {
              result.push(width => {
                return width / 100 * number;
              });
            } else {
              result.push(width => {
                return number;
              });
            }
          } else {
            result.push(f);
          }
        }); // [top, right, bottom, left]

        switch (l) {
          case 1:
            result.push(result[0]);
            result.push(result[0]);
            result.push(result[0]);
            break;

          case 2:
            result.push(result[0]);
            result.push(result[1]);
            break;

          case 3:
            result.push(result[1]);
            break;
          // no default
        }
      } else {
        result = [f, f, f, f];
      }

      return result;
    };

    const checkThreshold = value => {
      let result = [];

      if (Array.isArray(value)) {
        value.forEach(v => {
          const tmp = checkValue(v);

          if (tmp !== null && !result.includes(tmp)) {
            result.push(tmp);
          }
        });
      } else {
        result = [0];
      }

      return result;
    };

    const getIntersectionRatio = (rect, viewPortSize) => {
      const rw = rect.width || 1;
      const rh = rect.height || 1;
      let width = Math.min(rect.left + rw, viewPortSize.left + viewPortSize.width) - Math.max(rect.left, viewPortSize.left);
      let height = Math.min(rect.top + rh, viewPortSize.top + viewPortSize.height) - Math.max(rect.top, viewPortSize.top);

      if (width < 0) {
        width = 0;
      }

      if (height < 0) {
        height = 0;
      }

      return getPercent(rw * rh, width * height);
    };

    const checkThresholdQueue = (arr, lastIntersectionRatio, currentIntersectionRatio) => {
      let result = false;

      if (lastIntersectionRatio !== currentIntersectionRatio) {
        if (lastIntersectionRatio < currentIntersectionRatio) {
          for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === 0 && lastIntersectionRatio === 0 || lastIntersectionRatio < arr[i] && arr[i] <= currentIntersectionRatio) {
              result = true;
              break;
            }
          }
        } else {
          for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === 1 && lastIntersectionRatio === 1 || lastIntersectionRatio > arr[i] && arr[i] >= currentIntersectionRatio) {
              result = true;
              break;
            }
          }
        }
      }

      return result;
    };

    class FakeIntersectionObserver {
      constructor(callback, options) {
        this.callback = callback;
        this.options = Object.assign({
          rootMargin: '0px',
          threshold: [0],
          root: null
        }, options || {});
        this.options.rootMargin = checkRootMargin(this.options.rootMargin);
        this.options.threshold = checkThreshold(this.options.threshold);
        this.nodeList = [];
        this.last = [];
        this.viewPortSize = {
          top: 0,
          left: 0,
          width: 0,
          height: 0
        };
        this.correctPosition = {
          top: 0,
          left: 0
        };
        this.eventWasAdded = false;
        this.bindedRender = this._render.bind(this);
        this.bindedResize = this._resize.bind(this);

        this._resize();
      }

      _addEvents(e) {
        if (!this.eventWasAdded) {
          this.eventWasAdded = true;
          $(window).addEvent('resize', this.bindedResize);
          $(this.options.root || window).addEvent('scroll', this.bindedRender);
        }
      }

      _removeEvents(e) {
        if (this.eventWasAdded) {
          this.eventWasAdded = false;
          $(window).removeEvent('resize', this.bindedResize);
          $(this.options.root || window).removeEvent('scroll', this.bindedRender);
        }
      }

      _resize(e) {
        const m = this.options.rootMargin;
        const rootSize = getRootSize(this.options.root); // m.map((v) => {
        //     return v(rootSize.width);
        // });

        this.correctPosition = {
          top: 0 - m[0](rootSize.width),
          left: 0 - m[1](rootSize.width)
        };
        this.viewPortSize = {
          width: rootSize.width + m[1](rootSize.width) + m[3](rootSize.width),
          height: rootSize.height + m[0](rootSize.width) + m[2](rootSize.width)
        };
      }

      _renderElement(nodeObj) {
        let result = null;

        if (nodeObj.isShown) {
          const rootData = getRootData(this.options.root, this.correctPosition, this.viewPortSize);
          const intersectionRatio = getIntersectionRatio(nodeObj.node.node.getBoundingClientRect(), rootData);

          if (checkThresholdQueue(this.options.threshold, nodeObj.intersectionRatio, intersectionRatio)) {
            nodeObj.intersectionRatio = intersectionRatio;
            result = {
              target: nodeObj.node.node,
              intersectionRatio: nodeObj.intersectionRatio,
              isIntersecting: nodeObj.intersectionRatio > 0
            };
          }
        }

        return result;
      }

      _render() {
        const changedNodes = [];
        this.nodeList.forEach(node => {
          const result = this._renderElement(node);

          if (result) {
            changedNodes.push(result);
          }
        });

        if (changedNodes.length) {
          this.last = changedNodes;
          this.callback(changedNodes);
        }
      }

      takeRecords() {
        this._render();

        return this.last;
      }

      observe(node) {
        node = $(node);
        node = {
          node: node,
          isShown: elementIsShown(node),
          intersectionRatio: 0,
          isIntersecting: false
        };
        timerInstance.push(node, _node => {
          const result = this._renderElement(_node);

          if (result) {
            this.last = [result];
            this.callback([result]);
          }
        });
        this.nodeList.push(node);

        this._addEvents();

        let cbData = this._renderElement(node);

        if (!cbData) {
          cbData = {
            target: node.node.node,
            intersectionRatio: 0,
            isIntersecting: false
          };
        }

        this.callback([cbData]);
      }

      unobserve(node) {
        node = $(node);
        const nodes = this.nodeList.map(obj => obj.node.node);
        const index = nodes.indexOf(node.node);
        timerInstance.remove(node.node);

        if (index > -1) {
          this.nodeList.splice(index, 1);
        }

        if (!this.nodeList.length) {
          this._removeEvents();
        }
      }

      disconnect() {
        this.nodeList.forEach(node => {
          timerInstance.remove(node.node);
        });
        this.nodeList = [];

        this._removeEvents();
      }

    }

    class Instance {
      constructor(callback, options) {
        const IntersectionObserverClass = window.IntersectionObserver || FakeIntersectionObserver;
        this.observer = new IntersectionObserverClass(callback, options || {});
      }

      static isInView(node) {
        const rect = $(node).getBoundingClientRect();
        return (rect.top >= 0 || rect.top - rect.bottom < rect.top) && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
      }

      takeRecords() {
        return this.observer.takeRecords();
      }

      observe(target) {
        if (target.node) {
          target = target.node;
        }

        this.observer.observe(target);
      }

      unobserve(target) {
        this.observer.unobserve(target);
      }

      disconnect() {
        this.observer.disconnect();
      }

    }

    return Instance;
  })();
  /* global helper */

  /* eslint-env es6 */


  helper.isPercentage = value => {
    return /^([-]?[0-9]*\.?[0-9]+)%$/.test('' + value);
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.isSVG = url => {
    if (url) {
      url = url.split('?')[0];
      url = url.split('.');
      url = url[url.length - 1];
      return /svg/i.test(url);
    }

    return false;
  };
  /* global helper */

  /* eslint-env es6 */


  helper.isSpin = str => {
    str = (str || '').split('?')[0];
    return /([^#?]+)\/?([^#?]+\.spin)(\?([^#]*))?(#(.*))?$/.test(str);
  };
  /* global helper */

  /* eslint-env es6 */


  helper.isVideo = str => {
    str = (str || '').split('?')[0];
    return /([^#?]+)\/?([^#?]+\.(mp4|mov|avi|m4v|mkv|webm|wmv|ogv|ogg))(\?([^#]*))?(#(.*))?$/i.test(str);
  };
  /* global helper */

  /* global $J */

  /* global $ */

  /* eslint-env es6 */


  helper.loadImage = sources => {
    return new Promise((resolve, reject) => {
      let img;
      let container;
      let createContainer = false;

      if (['array', 'string'].includes($J.typeOf(sources))) {
        if ($J.typeOf(sources) === 'string') {
          sources = [sources];
        }

        img = $J.$new('img').setCss({
          maxWidth: 'none',
          maxHeight: 'none'
        });
        img.attr('referrerpolicy', 'no-referrer-when-downgrade');
        createContainer = true;
      } else {
        img = $(sources);

        if (!img.node.parentNode) {
          createContainer = true;
        }
      }

      if (createContainer) {
        container = $J.$new('div').setCss({
          top: '-10000px',
          left: '-10000px',
          width: '10px',
          height: '10px',
          position: 'absolute',
          overflow: 'hidden'
        });
        container.append(img);
        $($J.D.node.body).append(container);
      } // if (!img.complete || $J.browser.engine === 'gecko') {


      if (!img.node.complete || !img.node.src) {
        const handler = e => {
          img.removeEvent(['load', 'error'], handler);

          if (e.type === 'error') {
            reject({
              error: e
            });
          } else {
            resolve({
              image: e,
              size: {
                width: img.node.naturalWidth || img.node.width,
                height: img.node.naturalHeight || img.node.height
              }
            });
          }

          if (container) {
            container.remove();
          }
        };

        img.addEvent(['load', 'error'], handler);

        if (container && $J.typeOf(sources) === 'array') {
          img.attr('src', sources[0]);

          if (sources[1]) {
            // img.attr('srcset', encodeURI(sources[1]) + ' 2x');
            img.attr('srcset', sources[1] + ' 2x');
          }
        }
      } else {
        if (container) {
          container.remove();
        }

        resolve({
          image: null,
          size: img.size
        });
      }
    });
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.loadStylesheet = (url, id, shadowRoot, selector) => {
    return new Promise((resolve, reject) => {
      let alreadyIncluded = false;
      const rootElement = shadowRoot || $J.D.node;
      Array.from(rootElement.querySelectorAll('link')).forEach(link => {
        const href = $(link).attr('href') || '';

        if ($J.getAbsoluteURL(href) === $J.getAbsoluteURL(url)) {
          alreadyIncluded = true;
        }
      });

      if (alreadyIncluded) {
        resolve();
      } else {
        const slink = $J.$new('link');

        if (id !== $J.U) {
          slink.node.id = id;
        }

        slink.node.rel = 'stylesheet';
        slink.node.type = 'text/css';

        slink.node.onload = () => {
          resolve();
        };

        slink.node.onerror = e => {
          reject(e);
        };

        slink.node.href = url;
        let root = $J.D.node.head || $J.D.node.getElementsByTagName('head')[0] || $J.D.node.body || $J.D.node.documentElement;

        if (shadowRoot) {
          root = shadowRoot;
        }

        let nextSibling = root.firstChild;
        const addAfter = root.querySelector(selector);

        if (addAfter && addAfter.nextSibling) {
          nextSibling = addAfter.nextSibling;
        }

        root.insertBefore(slink.node, nextSibling);
      }
    });
  };
  /* global helper */

  /* eslint-env es6 */


  helper.makeQueryblePromise = promise => {
    if (promise.isResolved) {
      return promise;
    }

    let isPending = true;
    let isRejected = false;
    let isFulfilled = false;
    const result = promise.then(res => {
      isPending = false;
      isFulfilled = true;
      return res;
    }, err => {
      isPending = false;
      isRejected = true;
      return err;
    });

    result.isFulfilled = () => {
      return isFulfilled;
    };

    result.isPending = () => {
      return isPending;
    };

    result.isRejected = () => {
      return isRejected;
    };

    return result;
  };
  /* global $, $J, helper */

  /* eslint quote-props: ["off", "always"] */

  /* eslint-env es6 */


  helper.paramsFromQueryString = (() => {
    const IMG_OPTION_ALIAS = {
      w: 'scale.width',
      h: 'scale.height',
      cw: 'crop.width',
      ch: 'crop.height',
      cx: 'crop.x',
      cy: 'crop.y',
      q: 'quality',
      s: 'size',
      // p         : 'profile', // WE SHOULD UPDATE NGINX CONFIGS FOR THIS
      text: 'text.text',
      watermark: 'watermark.image',
      'watermark.w': 'watermark.scale.width',
      'watermark.h': 'watermark.scale.height',
      'watermark.cw': 'watermark.crop.width',
      'watermark.ch': 'watermark.crop.height',
      'watermark.cx': 'watermark.crop.x',
      'watermark.cy': 'watermark.crop.y'
    }; // fix: if the '<meta http-equiv="Content-Type" content="text/html;charset=utf-8">' is absent

    const decodeURIComponentX = str => {
      let out = '';
      const arr = str.split(/(%(?:D0|D1)%.{2})/);

      for (let i = 0, l = arr.length; i < l; i++) {
        let x;

        try {
          x = decodeURIComponent(arr[i]);
        } catch (e) {
          x = arr[i];
        }

        out += x;
      }

      return out;
    };
    /**
     * Converts query string to Object
     * @param  {String} query   Query string
     * @return {Object}
     */


    return query => {
      const params = {};

      if (query) {
        $(query.split('&')).forEach(pair => {
          const setting = pair.split('='); // Convert option alias to a real name

          setting[0] = IMG_OPTION_ALIAS[setting[0]] || setting[0];
          setting[0].trim().split('.').reduce((res, val, ind, col) => {
            if (/^\d$/.test(val)) {
              // save text.0.text='hello' as object and then convert to array
              res.__toArray = true;
            }

            if (res[val] === undefined) {
              if (ind < col.length - 1) {
                res[val] = {};
              } else {
                // res[val] = decodeURIComponent(setting[1] || '');
                res[val] = decodeURIComponentX(setting[1] || '');
              }
            }

            return res[val];
          }, params);
        });
        Object.keys(params).forEach(key => {
          if (typeof params[key] === 'object' && params[key].__toArray) {
            delete params[key].__toArray;
            const objKeys = Object.keys(params[key]);
            params[key] = objKeys.map(idx => {
              return params[key][idx];
            });
          }
        });
      }

      return params;
    };
  })();
  /* global $, $J, helper */

  /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint no-continue: "off" */

  /* eslint no-loop-func: "off" */

  /* eslint-env es6 */

  /**
   * Convert JSON data to query string
   * @param  {Object} data - JSON data
   * @param  {String} [prefix] Prefix added to parameter name in query string
   * @return {[type]}          Query string.
   */


  helper.paramsToQueryString = (() => {
    const URL_OPTIONS_ALIASES = {
      'scale.width': 'w',
      'scale.height': 'h',
      'crop.width': 'cw',
      'crop.height': 'ch',
      'crop.x': 'cx',
      'crop.y': 'cy',
      'quality': 'q',
      'size': 's',
      'text.text': 'text',
      'watermark.image': 'watermark',
      'watermark.scale.width': 'watermark.w',
      'watermark.scale.height': 'watermark.h',
      'watermark.crop.width': 'watermark.cw',
      'watermark.crop.height': 'watermark.ch',
      'watermark.crop.x': 'watermark.cx',
      'watermark.crop.y': 'watermark.cy'
    };

    const paramsToQueryString = (data, prefix) => {
      const results = [];

      for (const k in data) {
        if (!Object.prototype.hasOwnProperty.call(data, k)) {
          continue;
        }

        if ((k + '').substring(0, 2) === '$J') {
          continue;
        }

        let value = data[k];

        if ($J.typeOf(value) === 'object') {
          value = paramsToQueryString(value, (prefix || '') + k + '.');
          results.push(value);
        } else if ($J.typeOf(value) === 'array') {
          value.forEach((item, idx) => {
            value = paramsToQueryString(item, (prefix || '') + k + '.' + idx + '.');
            results.push(value);
          });
        } else {
          // results.push((prefix || '') + k + '=' + encodeURIComponent(value));
          let paramName = (prefix || '') + k;
          paramName = URL_OPTIONS_ALIASES[paramName] || paramName;
          results.push(paramName + '=' + encodeURIComponent(value));
        }
      }

      return results.join('&');
    };

    return paramsToQueryString;
  })();
  /* global helper */

  /* eslint no-restricted-properties: "off" */

  /* eslint-env es6 */


  helper.round = (value, count, noTail) => {
    if (!count) {
      count = 0;
    }

    let v = Math.pow(10, count);

    if (noTail) {
      v = parseInt(value * v, 10) / v;
    } else {
      v = Math.round(value * v) / v;
    }

    return v;
  };
  /* global helper */

  /* eslint-env es6 */


  helper.roundSize = (value, roundValue) => {
    if (value) {
      if (!roundValue) {
        roundValue = 100;
      }

      value = Math.ceil(value / roundValue) * roundValue;
    }

    return value;
  };
  /* global $J, helper */

  /* global globalVariables */

  /* eslint new-parens: "off" */

  /* eslint-env es6 */


  helper.sendRawStats = (statsData, useBeacon) => {
    try {
      const endpoint = 'https://stats.sirv.com/' + +new Date();

      if (useBeacon === true && navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, helper.paramsToQueryString(statsData));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint);

      if (xhr.responseType !== undefined) {
        xhr.responseType = 'text';
      }

      xhr.send(helper.paramsToQueryString(statsData));
    } catch (ex) {//empty
    }
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.sliderLib = {
    // getIndexFromDirection: (currentIndex, direction, length, loop) => {
    //     let index = currentIndex;
    //     switch (direction) {
    //         case 'next':
    //             index += 1;
    //             break;
    //         case 'prev':
    //             index -= 1;
    //             break;
    //         default:
    //             return currentIndex;
    //     }
    //     if (loop) {
    //         index = helper.getArrayIndex(index, length);
    //     } else {
    //         if (index < 0) {
    //             index = 0;
    //         } else if (index > length - 1) {
    //             index = length - 1;
    //         }
    //     }
    //     return index;
    // },
    findIndex: (value, currentIndex, l, loop) => {
      let result = null;

      if ($J.typeOf(value) === 'string') {
        switch (value) {
          case 'next':
            value = currentIndex + 1;
            break;

          case 'prev':
            value = currentIndex - 1;
            break;
          // no default
        }
      }

      if ($J.typeOf(value) === 'number') {
        result = value;

        if (result < 0) {
          if (loop) {
            result = helper.getArrayIndex(result, l);
          } else {
            result = 0;
          }
        } else if (value >= l) {
          if (loop) {
            result = helper.getArrayIndex(result, l);
          } else {
            result = l - 1;
          }
        }
      }

      return result;
    },
    // getDirectionFromIndex: function (currentIndex, index, length, loop) {
    //     var direction = 'next', fl, rl;
    //     function getForwardLeft() {
    //         var result;
    //         if (index < currentIndex) {
    //             result = currentIndex - index;
    //         } else {
    //             result = length - index + currentIndex;
    //         }
    //         return result;
    //     }
    //     function getForwardRight() {
    //         var result;
    //         if (currentIndex < index) {
    //             result = index - currentIndex;
    //         } else {
    //             result = length - currentIndex + index;
    //         }
    //         return result;
    //     }
    //     if (loop) {
    //         fl = getForwardLeft();
    //         rl = getForwardRight();
    //         if (fl === rl && currentIndex > index || fl < rl) {
    //             direction = 'prev';
    //         }
    //     } else {
    //         if (index < currentIndex) { direction = 'prev'; }
    //     }
    //     return direction;
    // },
    getSrc: src => {
      if ($J.defined(src) && (src + '').trim() !== '') {
        return src + '';
      }

      return null;
    }
  };
  /* global $, $J, helper */

  /* eslint-env es6 */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  helper.sortSlidesByOrder = (order, slides) => {
    const oldSlidesArr = slides.slice();
    const newSlidesArr = [];

    if (order && order.length) {
      for (let i = 0, l = Math.min(order.length, oldSlidesArr.length); i < l; i++) {
        for (let j = 0, l2 = oldSlidesArr.length; j < l2; j++) {
          if (globalVariables.SLIDE.NAMES.indexOf(order[i]) === oldSlidesArr[j].type && oldSlidesArr[j].enabled) {
            newSlidesArr.push(oldSlidesArr[j]);
            oldSlidesArr.splice(j, 1);
            break;
          }
        }
      }
    }

    oldSlidesArr.forEach(item => {
      newSlidesArr.push(item);
    });
    return newSlidesArr;
  };
  /* global $J, helper */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint-env es6 */

  /* eslint-env es6 */


  helper.spinLib = (() => {
    // eslint-disable-next-line no-unused-vars
    const FULLSCREEN_PERCENT_WITHOUT_ACTION = 15; // 0% - 100%

    const sirvlib = {
      calcProportionSize: (spinSize, originSize, isFullscreen, oldSize) => {
        let width = originSize.width;
        let height = originSize.height; // if (isFullscreen) {
        //     if (spinSize.width > spinSize.height) {
        //         spinSize.height -= 20;
        //     } else {
        //         spinSize.width -= 20;
        //     }
        // }

        if (width > spinSize.width) {
          const tmp = height / width;
          width = spinSize.width;
          height = parseInt(width * tmp, 10);
        }

        if (height > spinSize.height) {
          const tmp = width / height;
          height = spinSize.height;
          width = parseInt(height * tmp, 10);
        }
        /* eslint-disable */
        // if (isFullscreen) {


        if (oldSize) {// if (oldSize.width / (originSize.width / 100) >= 100 - spinLib.FULLSCREEN_PERCENT_WITHOUT_ACTION) {
          //     width = oldSize.width;
          //     height = oldSize.height;
          // }
        } else {
          if (originSize.width < width) {
            width = originSize.width;
            height = originSize.height;
          }
        } // }

        /* eslint-enable */


        return {
          width: width,
          height: height
        };
      },
      reverse: (col, row, arr) => {
        if (col) {
          for (let i = 0, l = arr.length; i < l; i++) {
            arr[i].reverse();
          }
        }

        if (row) {
          arr.reverse();
        }

        return arr;
      },
      getNextIndex: (currentValue, value, direction, length, loop) => {
        let result;

        if (direction) {
          if (direction === 'next') {
            result = currentValue + value;

            if (loop) {
              result = helper.getArrayIndex(result, length);
            } else if (result >= length) {
              result = length - 1;
            }
          } else {
            result = currentValue - value;

            if (loop) {
              result = helper.getArrayIndex(result, length);
            } else if (result < 0) {
              result = 0;
            }
          }
        } else {
          result = value;

          if (loop) {
            result = helper.getArrayIndex(result, length);
          } else {
            if (result >= length) {
              result = length - 1;
            }

            if (result < 0) {
              result = 0;
            }
          }
        }

        return result;
      },
      getUrl: path => {
        let url = path;
        url = url.split('/');
        url.splice(url.length - 1, 1);
        url = url.join('/');
        url = url.replace(/https?:/, '');
        return url;
      },
      swapLayers: (layers, revers) => {
        let result = layers;

        if (revers) {
          result = {};
          Object.entries(layers).forEach(([rowKey, rowValue]) => {
            Object.entries(rowValue).forEach(([colKey, colValue]) => {
              if (!result[colKey]) {
                result[colKey] = {};
              }

              result[colKey][rowKey] = colValue;
            });
          });
        }

        return result;
      },
      getMaxCount: layers => {
        return Math.max(0, ...Object.values(layers).map(value => Object.keys(value).length));
      },
      correctArray: (keysArray, count) => {
        let result = [];
        let correctCount = count - keysArray.length;

        if (correctCount > 0) {
          const l = keysArray.length;

          for (let i = 0; i < l - 1; i++) {
            const curr = parseInt(keysArray[i], 10);
            const next = parseInt(keysArray[i + 1], 10);
            let diff = next - curr - 1;
            result.push(keysArray[i]);

            if (diff > 0) {
              if (correctCount > 0) {
                if (diff > correctCount) {
                  diff = correctCount;
                }

                while (diff > 0) {
                  diff -= 1;
                  correctCount -= 1;
                  result.push(keysArray[i]);
                }
              }
            }
          }

          result.push(keysArray[l - 1]);

          if (correctCount > 0) {
            let diff = parseInt(keysArray[0], 10) - 1;

            if (diff > 0) {
              while (diff > 0) {
                diff -= 1;
                correctCount -= 1;
                result.unshift(keysArray[0]);
              }
            }

            if (correctCount > 0) {
              while (correctCount > 0) {
                correctCount -= 1;
                result.push(keysArray[keysArray.length - 1]);
              }
            }
          }
        } else {
          result = JSON.parse(JSON.stringify(keysArray));
        }

        return result;
      },
      getFrames: (frames, count) => {
        const result = {};
        const newKeys = sirvlib.correctArray(Object.keys(frames), count);
        $(newKeys).forEach((value, index) => {
          result[index + 1 + ''] = frames[value];
        });
        return result;
      },
      checkLayers: layers => {
        const result = {};
        const count = sirvlib.getMaxCount(layers);
        Object.values(layers).forEach((value, index) => {
          result[index + 1 + ''] = sirvlib.getFrames(value, count);
        });
        return result;
      }
    };
    return sirvlib;
  })();
  /* eslint-env es6 */

  /* global $, $J, helper */

  /* eslint quote-props: ["off", "always"]*/

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /*eslint no-lonely-if: "off"*/

  /* eslint-disable no-multi-spaces */

  /* eslint-disable no-use-before-define */


  helper.videoModule = (() => {
    let vimeoPromise = null;
    let youtubePromise = null;
    const sources = {};
    const youtubeImgs = {
      'thumb1': '1.jpg',
      // 120x90
      'thumb2': '2.jpg',
      // 120x90
      'thumb3': '3.jpg',
      // 120x90
      'def0': '0.jpg',
      // 480x360
      'def1': 'default.jpg',
      // 120x90
      'middleQuality': 'mqdefault.jpg',
      // 320x180
      'highQuality': 'hqdefault.jpg',
      // 480x360
      'maxSize': 'maxresdefault.jpg' // 1920x1080

    };

    const getVimeoJSON = url => {
      return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              try {
                const result = JSON.parse(xhttp.responseText)[0];
                resolve(result);
              } catch (e) {
                reject(null);
              }
            }
          }
        };

        xhttp.send(true);
      });
    };

    const isHtmlVideo = node => {
      node = $(node);
      return node && node.tagName === 'video';
    };

    const getYouTobeId = url => {
      let result = null;
      url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

      if (url[2] !== undefined) {
        url = url[2].split(/[^0-9a-z_\-]/i);

        if (url.length && url[0]) {
          result = url[0];
        }
      }

      return result;
    };

    const getVimeoId = url => {
      let result = null;
      url = url.match(/(?:https?:\/\/)?(?:www.)?(?:player.)?vimeo.com\/(?:[a-z]*\/)*([0-9]{6,11})[?]?.*/)[1];

      if (url) {
        result = url;
      }

      return result;
    };

    const getSrc = node => {
      let result = null;

      if ($J.typeOf(node) === 'string') {
        result = node;
      } else {
        node = $(node);

        if (node && $J.typeOf(node.node) === 'element') {
          if (['iframe', 'div'].includes(node.tagName)) {
            result = node.attr('src') || node.attr('data-src');
          } else if (isHtmlVideo(node)) {
            result = node.attr('src') || node.attr('data-src');

            if (!result) {
              result = null;
              const children = Array.from(node.node.children);
              let child;

              do {
                child = $(children.shift());

                if (child && $J.typeOf(child.node) === 'element' && child.tagName === 'source') {
                  result = child.attr('src') || child.attr('data-src');
                }
              } while (!result && child);
            }
          }
        }
      }

      return result;
    };

    const getAPI = node => {
      let result = null;

      if (api.isVideo(node)) {
        switch (api.getType(node)) {
          case 'video':
            result = Promise.resolve();
            break;

          case 'vimeo':
            if (!vimeoPromise) {
              vimeoPromise = new Promise((resolve, reject) => {
                if ($J.W.node.Vimeo) {
                  resolve($J.W.node.Vimeo);
                } else if (typeof $J.W.node.define === 'function' && $J.W.node.define.amd && typeof $J.W.node.require === 'function') {
                  $J.W.node.require(['https://player.vimeo.com/api/player.js'], player => {
                    resolve({
                      Player: player
                    });
                  }, reject);
                } else {
                  const script = $J.$new('script');
                  script.attr('src', 'https://player.vimeo.com/api/player.js');
                  $(script).addEvent('load', () => {
                    resolve($J.W.node.Vimeo);
                  });
                  $(script).addEvent('error', reject);
                  script.appendTo(document.body);
                }
              });
            }

            result = vimeoPromise;
            break;

          case 'youtube':
            if (!youtubePromise) {
              if (!$J.W.node.YT) {
                youtubePromise = new Promise((resolve, reject) => {
                  const f = () => {};

                  const existingEvent = $J.W.node.onYouTubeIframeAPIReady || f;

                  $J.W.node.onYouTubeIframeAPIReady = () => {
                    existingEvent();
                    resolve($J.W.node.YT);
                  };

                  if (!document.querySelector('script[src$="youtube.com/iframe_api"]')) {
                    $J.$new('script', {
                      src: 'https://www.youtube.com/iframe_api'
                    }).appendTo($J.D.node.body);
                  }
                });
              } else {
                youtubePromise = Promise.resolve($J.W.node.YT);
              }
            }

            result = youtubePromise;
            break;
          // no default
        }
      } else {
        result = Promise.reject(true
        /*error*/
        );
      }

      return result;
    };

    const api = {
      aspectratio: 9 / 16,
      getAspectRatio: src => {
        return new Promise((resolve, reject) => {
          let id;
          src = getSrc(src);

          if (src) {
            if (sources[src]) {
              resolve(sources[src].aspectratio);
            }
          }

          const type = api.getType(src);

          if (type === 'vimeo') {
            id = getVimeoId(src);

            if (id) {
              getVimeoJSON('https://vimeo.com/api/v2/video/' + id + '.json').then(data => {
                resolve(data ? data.height / data.width : api.aspectratio);
              }).catch(error => {
                reject(error);
              });
            } else {
              resolve(api.aspectratio);
            }
          } else {
            resolve(api.aspectratio);
          }
        });
      },
      getId: src => {
        let result = null;

        if (api.isVideo(src)) {
          src = getSrc(src);

          switch (api.getType(src)) {
            case 'youtube':
              result = getYouTobeId(src);
              break;

            case 'vimeo':
              result = getVimeoId(src);
              break;
            // no default
          }
        }

        return result;
      },
      isVideo: src => {
        let result = false;

        if (isHtmlVideo(src)) {
          result = true;
        } else {
          src = getSrc(src);

          if (src) {
            result = ['youtube', 'vimeo'].includes(api.getType(src));
          }
        }

        return result;
      },
      getType: src => {
        let result = null;

        if (isHtmlVideo(src)) {
          result = 'video';
        } else {
          src = getSrc(src);

          if (src) {
            if (/^(https?:)?\/\/((www\.)?youtube\.com|youtu\.be)\//.test(src)) {
              result = 'youtube';
            } else if (/^(https?:)?\/\/((www|player)\.)?vimeo\.com\//.test(src)) {
              result = 'vimeo';
            }
          }
        }

        return result;
      },
      getImageSrc: (src, getAll) => {
        return new Promise((resolve, reject) => {
          let node;

          if (src && $(src) && $J.typeOf($(src).node) === 'element') {
            node = src;
          }

          src = getSrc(src);
          let thumbUrl = null;

          if (src) {
            if (sources[src]) {
              if (getAll) {
                if (sources[src].all) {
                  resolve(sources[src].all);
                  return;
                }
              } else {
                if (sources[src].url) {
                  resolve(sources[src].url);
                  return;
                } else if (sources[src].all) {
                  resolve(sources[src].all.thumbnail.url);
                  return;
                }
              }
            }

            let id;

            switch (api.getType(node || src)) {
              case 'youtube':
                id = getYouTobeId(src);

                if (id) {
                  if (getAll) {
                    thumbUrl = {
                      thumbnail: {
                        url: 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def1,
                        width: 120,
                        height: 90
                      },
                      medium: {
                        url: 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def0,
                        width: 480,
                        height: 360
                      }
                    };
                  } else {
                    thumbUrl = 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def1;
                  }

                  if (!sources[src]) {
                    sources[src] = {};
                  }

                  sources[src].aspectratio = api.aspectratio;

                  if (getAll) {
                    sources[src].all = thumbUrl;
                  } else {
                    sources[src].url = thumbUrl;
                  }
                }

                resolve(thumbUrl);
                break;

              case 'vimeo':
                id = getVimeoId(src);

                if (id) {
                  thumbUrl = 'https://vimeo.com/api/v2/video/' + id + '.json';
                  getVimeoJSON(thumbUrl).then(data => {
                    let imgUrl = null;

                    if (data) {
                      if (getAll) {
                        imgUrl = {
                          thumbnail: {
                            url: data.thumbnail_small,
                            width: 100,
                            height: 75
                          },
                          medium: {
                            url: data.thumbnail_medium,
                            width: 200,
                            height: 150
                          }
                        };
                      } else {
                        imgUrl = data.thumbnail_small;
                      }
                    }

                    if (imgUrl) {
                      if (!sources[src]) {
                        sources[src] = {};
                      }

                      if (getAll) {
                        sources[src].all = imgUrl;
                      } else {
                        sources[src].url = imgUrl;
                      }

                      sources[src].aspectratio = data.height / data.width;
                    }

                    resolve(imgUrl);
                  }).catch(reject);
                } else {
                  resolve(thumbUrl);
                }

                break;

              case 'video':
                if (node) {
                  node = $(node.node.cloneNode(true));

                  if (node.attr) {
                    thumbUrl = node.attr('poster');
                  }

                  if (thumbUrl && thumbUrl.trim() !== '') {
                    if (!sources[src]) {
                      sources[src] = {};
                    }

                    sources[src].aspectratio = api.aspectratio;

                    if (getAll) {
                      sources[src].all = {
                        thumbnail: {
                          url: thumbUrl,
                          width: 200,
                          height: 150
                        },
                        medium: {
                          url: thumbUrl,
                          width: 200,
                          height: 150
                        }
                      };
                      resolve(sources[src].all);
                    } else {
                      sources[src].url = thumbUrl;
                      resolve(thumbUrl);
                    }
                  } else {
                    const timeOfPoster = 0;
                    const canvas = $J.$new('canvas');
                    const context = canvas.node.getContext('2d');

                    const clear = () => {
                      // Array.from(node.node.children).forEach(function (child) {
                      //     child = $(child)
                      //     if (child && child.tagName === 'source') {
                      //         child.removeEvent(['abort', 'error']);
                      //     }
                      // });
                      node.removeEvent(['loadedmetadata', 'loadeddata', 'abort', 'error', 'stalled']);
                      node.remove();
                    };

                    const addSrc = () => {
                      let _src = node.attr('data-src');

                      if (_src) {
                        node.attr('src', _src);
                      }

                      Array.from(node.node.children).forEach(child => {
                        child = $(child);

                        if (child && child.tagName === 'source') {
                          _src = child.attr('data-src');

                          if (_src) {
                            child.attr('src', _src);
                          }
                        }
                      });
                    };

                    addSrc();
                    node.setCss({
                      top: -100000,
                      left: -100000,
                      width: 200,
                      height: 150,
                      position: 'absolute'
                    });
                    node.muted = true;
                    node.addEvent('loadedmetadata', e => {
                      const size = node.size;

                      if (!size.width || !size.height) {
                        size.width = 200;
                        size.height = 150;
                      }

                      node.setCss({
                        width: size.width,
                        height: size.height
                      });
                      canvas.node.width = size.width;
                      canvas.node.height = size.height;

                      if (timeOfPoster < node.node.duration) {
                        node.node.currentTime = timeOfPoster;
                      }
                    }); // Array.from(node.node.children).forEach(function (child) {
                    //     child = $(child);
                    //     if (child && child.tagName === 'source') {
                    //         child.addEvent(['abort', 'error'], function (e) {
                    //             clear();
                    //             callback(null);
                    //         });
                    //     }
                    // });

                    node.addEvent('loadeddata', e => {
                      node.currentTime = timeOfPoster;
                    });
                    node.addEvent(['abort', 'error', 'stalled'], e => {
                      clear();
                      reject(null);
                    });
                    node.addEvent('seeked', e => {
                      context.drawImage(node.node, 0, 0, canvas.node.width, canvas.node.height);
                      clear();

                      try {
                        thumbUrl = canvas.node.toDataURL();
                      } catch (ex) {// empty
                      }

                      if (thumbUrl) {
                        if (!sources[src]) {
                          sources[src] = {};
                        }

                        sources[src].aspectratio = api.aspectratio;

                        if (getAll) {
                          sources[src].all = {
                            thumbnail: {
                              url: thumbUrl,
                              width: 200,
                              height: 150
                            },
                            medium: {
                              url: thumbUrl,
                              width: 200,
                              height: 150
                            }
                          };
                          resolve(sources[src].all);
                        } else {
                          sources[src].url = thumbUrl;
                          resolve(thumbUrl);
                        }
                      } else {
                        resolve(thumbUrl);
                      }
                    });
                    node.appendTo($J.D.node.body);
                    node.node.load();
                  }
                } else {
                  resolve(thumbUrl);
                }

                break;

              default:
                resolve(thumbUrl);
            }
          } else {
            resolve(thumbUrl);
          }
        });
      },
      getSrc: getSrc,
      getAPI: getAPI
    };
    return api;
  })();

  return helper;
});
Sirv.define('EventEmitter', ['bHelpers', 'magicJS', 'helper'], (bHelpers, magicJS, helper) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global helper */

  /* eslint-disable indent */

  /* eslint-disable no-console */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars

  class EventObject {
    constructor(type, direction, data) {
      this.type = type;
      this._direction = direction;
      this.propagation = true;
      this.nextCalls = true;
      this.emptyEvent = true;
      this.data = Object.assign(data, {
        eventType: this.type,
        eventDirection: this._direction,
        stopEmptyEvent: this.stopEmptyEvent.bind(this),
        stopPropagation: this.stopPropagation.bind(this),
        stopNextCalls: this.stopNextCalls.bind(this),
        stop: this.stop.bind(this),
        stopAll: this.stopAll.bind(this)
      });
    }

    copyData() {
      const result = Object.assign({}, this.data);
      delete result.eventDirection;
      delete result.stopEmptyEvent;
      delete result.stopPropagation;
      delete result.stopNextCalls;
      delete result.stop;
      delete result.stopAll;
      return result;
    }

    get customData() {
      return this.data;
    }

    get direction() {
      return this._direction;
    }

    get emptyEventStopped() {
      return !this.emptyEvent;
    }

    get propagationStopped() {
      return !this.propagation;
    }

    get nextCallsStopped() {
      return !this.nextCalls;
    }

    stopEmptyEvent() {
      this.emptyEvent = false;
    }

    stopPropagation() {
      this.propagation = false;
    }

    stopNextCalls() {
      this.nextCalls = false;
    }

    stop() {
      this.stopPropagation();
      this.stopEmptyEvent();
    }

    stopAll() {
      this.stop();
      this.stopNextCalls();
    }

  }
  /* eslint-env es6 */

  /* global EventObject */

  /* eslint-disable indent */

  /* eslint-disable no-console */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


  const correctName = (name, defaultName) => {
    if ($J.typeOf(name) === 'string') {
      name = name.trim();

      if (name === '') {
        name = defaultName;
      }
    } else {
      name = defaultName;
    }

    return name;
  }; // eslint-disable-next-line no-unused-vars


  class EmitterInstance {
    constructor() {
      this.__parent = null;
      this.__childs = $([]);
      this.__subscribers = {};
      this.__NAME_OF_EMPTY_EVENT = '__empty__';
    }

    __setChild(child) {
      this.__childs.push(child);
    }

    __removeChild(child) {
      const idx = this.__childs.indexOf(child);

      if (idx !== -1) {
        this.__childs.splice(idx, 1);
      }
    }

    set parentClass(parent) {
      this.__parent = parent;

      this.__parent.__setChild(this);
    }

    __removeParent() {
      if (this.__parent) {
        this.__parent.__removeChild(this);

        this.__parent = null;
      }
    }

    __callNext(event) {
      if (!event.propagationStopped) {
        if (event.direction === 'up') {
          if (this.__parent) {
            this.__parent.__next(event);
          }
        } else {
          this.__childs.forEach(child => {
            child.__next(event);
          });
        }
      }
    }

    __next(event) {
      const callbacks = this.__subscribers[event.type];
      event = new EventObject(event.type, event.direction, event.copyData());

      if (callbacks) {
        for (let i = 0; i < callbacks.length; i++) {
          callbacks[i](event.customData, event, this);

          if (event.nextCallsStopped) {
            break;
          }
        }
      }

      if (Object.prototype.hasOwnProperty.call(this.__subscribers, this.__NAME_OF_EMPTY_EVENT) && !event.emptyEventStopped) {
        for (let i = 0; i < this.__subscribers[this.__NAME_OF_EMPTY_EVENT].length; i++) {
          this.__subscribers[this.__NAME_OF_EMPTY_EVENT][i](event.customData);
        }
      }

      this.__callNext(event);
    }

    emit(type, data) {
      // up
      if (!data || $J.typeOf(data) !== 'object') {
        if ($J.typeOf(type) === 'object') {
          data = type;
          type = null;
        } else {
          data = {};
        }
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      this.__callNext(new EventObject(type, 'up', data));
    }

    broadcast(type, data) {
      // down
      if (!data || $J.typeOf(data) !== 'object') {
        if ($J.typeOf(type) === 'object') {
          data = type;
          type = null;
        } else {
          data = {};
        }
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      this.__callNext(new EventObject(type, 'down', data));
    }

    on(type, fn) {
      const self = this;

      if ($J.typeOf(type) === 'function') {
        fn = type;
        type = null;
      }

      if (!fn) {
        return null;
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      if (!this.__subscribers[type]) {
        this.__subscribers[type] = [];
      }

      this.__subscribers[type].push(fn);

      return () => {
        return self.off(type, fn);
      };
    }

    off(type, fn) {
      let idx;

      if ($J.typeOf(type) === 'function') {
        fn = type;
        type = null;
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      if (!fn) {
        delete this.__subscribers[type];
      } else if (Object.prototype.hasOwnProperty.call(this.__subscribers, type)) {
        idx = this.__subscribers[type].indexOf(fn);

        if (idx !== -1) {
          this.__subscribers[type].splice(idx, 1);
        }
      }
    }

    destroy() {
      this.__removeParent();

      this.__childs = $([]);
      this.__subscribers = {};
    }

  }

  return EmitterInstance;
});
Sirv.define('EventManager', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'EventEmitter', 'helper'], (bHelpers, magicJS, globalVariables, globalFunctions, EventEmitter, helper) => {
  const $J = magicJS;
  const $ = $J.$;
  /* global $, $J, EventEmitter, helper */

  /* eslint-env es6 */
  // eslint-disable-next-line no-unused-vars

  class EventManager extends EventEmitter {
    constructor(items) {
      super();
      this.items = items;
      this.events = {
        lazyimage: {},
        viewer: {},
        spin: {},
        // viewer component
        zoom: {},
        // viewer component
        image: {},
        // viewer component
        video: {} // viewer component

      };
      this.reversedEvents = [];
      this.addEvents();
    }

    static eventsNameParser(eventName) {
      let result = null;

      if (eventName && $J.typeOf(eventName) === 'string') {
        result = eventName.split(':').map(v => {
          return v.trim();
        }).filter(v => {
          return v !== '';
        });

        if (/sirv/i.test(result[0])) {
          result.shift();
        }

        if (result.length < 2) {
          result = null;
        }
      }

      return result;
    }
    /**
     * Trigger a DOM event
     * @param {String} eventType A name of the event.
     * @param {DOM Element} element The targe DOM element.
     * @param {Object} [detail] Additional event details.
     * @param {Boolean} [bubbles] Defines whether the event should bubble up through the event chain or not.
     * @param {Boolean} [cancelable] Defines whether the event can be canceled.
     */


    static triggerCustomEvent(eventType, element, detail, bubbles, cancelable) {
      if (bubbles === $J.U) {
        bubbles = true;
      }

      if (cancelable === $J.U) {
        cancelable = true;
      }

      let event;

      try {
        event = new CustomEvent(eventType, {
          bubbles: bubbles,
          cancelable: cancelable,
          detail: detail
        });
      } catch (e) {
        try {
          event = $J.D.createEvent('Event');
          event.initEvent(eventType, bubbles, cancelable);
          event.detail = detail;
        } catch (ex) {
          /* empty */
        }
      }

      if (event) {
        element.node.dispatchEvent(event);
      }
    }

    addReverseEvent(eventName, callback, componentName) {
      this.reversedEvents.push({
        eventName: eventName,
        componentName: componentName,
        callback: callback
      });
    }

    callReverseCallback(componentName, eventName, eventData) {
      let result = false;

      for (let i = 0, l = this.reversedEvents.length; i < l; i++) {
        if (this.reversedEvents[i].componentName === componentName && this.reversedEvents[i].eventName === eventName) {
          this.reversedEvents[i].callback(eventData);
          this.reversedEvents.splice(i, 1);
          result = true;
          break;
        }
      }

      return result;
    }

    addEvents() {
      this.on('destroy', e => {
        e.stopAll();
        globalFunctions.stop(e.data.node, 'viewer');
      });
      /*
          'onLoad'
      */

      this.on('imagePublicEvent', e => {
        e.stopAll();
        const isReversed = this.callReverseCallback('lazyimage', e.data.type, e.data.image);

        if (!isReversed) {
          EventManager.triggerCustomEvent('sirv:lazyimage:' + e.data.type, e.data.node, Object.assign({}, e.data.image));
          const evs = this.events.lazyimage[e.data.type];

          if (evs) {
            evs.forEach(callback => {
              callback(e.data.image);
            });
          }
        }
      });
      /*
          viewer events
          'ready', 'fullscreenIn', 'fullscreenOut', 'beforeSlideIn', 'beforeSlideOut', 'afterSlideIn', 'afterSlideOut', 'enableItem', 'disableItem'
      */

      this.on('viewerPublicEvent', e => {
        e.stopAll();
        let node;
        let type;
        let eventData;
        let componentName = 'viewer';

        if (e.data.slider.type === 'componentEvent') {
          type = e.data.type;
          eventData = Object.assign({}, e.data.slide[e.data.slide.component]);
          componentName = e.data.slide.component;

          if (e.data.node) {
            node = e.data.componentEventData.node;
          }

          Object.entries(e.data.componentEventData).forEach(([key, value]) => {
            if (key === 'node') {
              if (e.data.node) {
                eventData[key] = value.node;
              }
            } else if (key !== 'type') {
              eventData[key] = value;
            }
          });
        } else {
          type = e.data.slider.type;

          if (type === 'ready') {
            globalFunctions.iconsHash.remove();
          }

          if (e.data.node) {
            node = e.data.node;
          }

          if (e.data.slider) {
            eventData = e.data.slider;

            if (type === 'sendStats') {
              eventData.statsData = e.data.event;
            }
          }

          if (['beforeSlideIn', 'beforeSlideOut', 'afterSlideIn', 'afterSlideOut', 'enableItem', 'disableItem', 'thumbnailClick'].includes(type)) {
            eventData = e.data.slide;
          }
        }

        const isReversed = this.callReverseCallback(componentName, type, eventData);

        if (!isReversed) {
          if (node) {
            EventManager.triggerCustomEvent('sirv:' + componentName + ':' + type, node, Object.assign({}, eventData));
          }

          const evs = this.events[componentName][type];

          if (evs) {
            evs.forEach(callback => {
              callback(eventData);
            });
          }
        }
      });
      this.on(e => {
        e.stopAll();
      });
    }

    addEvent(eventName, callback) {
      let result = () => {
        return false;
      };

      const events = EventManager.eventsNameParser(eventName);

      if (events && this.events[events[0]] && callback) {
        if (!this.events[events[0]][events[1]]) {
          this.events[events[0]][events[1]] = [];
        }

        this.events[events[0]][events[1]].push(callback);

        if (['ready', 'init', 'onLoad'].includes(events[1])) {
          const itemName = events[0] === 'lazyimage' ? 'image' : 'viewer';

          if (itemName === 'viewer' && events[1] !== 'onLoad' || events[1] === 'onLoad' && itemName === 'image') {
            /*
                we need the timeout because every event returns function which can remove this event
                 for example:
                if event 'ready' already was
                and we set new one
                the variable 'removeReadyEvent' will be undefined
                 const removeReadyEvent = Sirv.on('viewer:ready', (e) => {
                    removeReadyEvent();
                });
            */
            setTimeout(() => {
              const items = this.items[itemName];
              items.forEach(item => {
                if (item.checkReadiness(events[1], events[0])) {
                  this.addReverseEvent(events[1], callback, events[0]);
                  item.sendEvent(events[1], events[0]);
                }
              });
            }, 0);
          }
        }

        result = () => {
          return this.removeEvent(eventName, callback);
        };
      }

      return result;
    }

    removeEvent(eventName, callback) {
      const events = EventManager.eventsNameParser(eventName);

      if (events && this.events[events[0]] && this.events[events[0]][events[1]]) {
        if (callback) {
          const index = this.events[events[0]][events[1]].indexOf(callback);

          if (index >= 0) {
            this.events[events[0]][events[1]].splice(index, 1);
            return true;
          }
        } else {
          delete this.events[events[0]][events[1]];
          return true;
        }
      }

      return false;
    }

  }

  return EventManager;
});
Sirv.define('ContextMenu', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions'], (bHelpers, magicJS, globalVariables, globalFunctions) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  const getViewPort = pad => {
    const size = $J.W.size;
    const scroll = $J.W.scroll;
    pad = pad || 0;
    return {
      left: pad,
      right: size.width - pad,
      top: pad,
      bottom: size.height - pad,
      x: scroll.x,
      y: scroll.y
    };
  }; // eslint-disable-next-line no-unused-vars


  class ContextmenuInstance {
    constructor(target, data, cssPrefix) {
      if (undefined === cssPrefix) {
        cssPrefix = 'magic';
      }

      this.CSS_CLASS = cssPrefix + '-contextmenu';
      this.target = target; // Menu container

      this.conext = null;
      this.overlay = null;
      this.items = {}; // this.data = data;

      this.active = false;
      this.showBind = null;
      this.hideBind = null;
      this.hideOnScrollBind = null;
      this.context = null;
      this._canShow = true;
      this._position = {
        top: null,
        left: null
      };
      this._fullScreenBox = null;
      this.setup(data || []);
    }

    get position() {
      return {
        top: this._position.top,
        left: this._position.left
      };
    }

    isExist(idOfItem) {
      return !!this.items[idOfItem];
    }

    setup(data) {
      this.context = $J.$new('ul').addClass(this.CSS_CLASS).addEvent(['contextmenu', 'dragstart', 'selectstart'], e => {
        e.stop();
      });
      data.forEach(item => {
        this.addItem(item);
      });
      this.hideFX = new $J.FX(this.context, {
        duration: 200,
        onComplete: () => {
          this.context.remove();
        }
      });
      this.target.addEvent('contextmenu', this.showBind = this.show.bind(this)); // this.overlay = $J.$new('div').setCss({
      //     'background-image': 'url(\'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=\')',
      //     display: 'block',
      //     overflow: 'hidden',
      //     'z-index': '2147483647',
      //     position: 'fixed',
      //     top: 0, bottom: 0, left: 0, right: 0,
      //     width: 'auto', height: 'auto'
      // })

      this.overlay = $J.$new('div').addClass(this.CSS_CLASS + '-overlay').addEvent('click contextmenu', this.hide.bind(this)) // .addEvent('', this.hideBind = this.hide.bind(this))
      .addEvent('mousescroll', e => {
        e.stop(); // this.hide();

        $(e).events[0].stop().stopQueue();
      });
      this.hideBind = $(e => {
        if (!this.active) {
          return;
        }

        e.stop();

        if (e.originEvent.keyCode === 27) {
          // Esc
          this.hide();
        }
      }).bind(this);
      $J.W.addEvent('keydown', this.hideBind, 1); // eslint-disable-next-line no-unused-vars

      this.hideOnScrollBind = $(e => {
        if (!this.active) {
          return;
        }

        this.hide();
      }).bind(this);
      $J.W.addEvent('scroll', this.hideOnScrollBind);
    }

    addItem(data) {
      const _ = this;

      const item = $J.$new('li').appendTo(this.context);

      if ($J.defined(data.separator)) {
        item.addClass('menu-separator');
      } else if ($J.defined(data.label)) {
        item.append($J.D.node.createTextNode(data.label));

        if ($J.defined(data.disabled) && data.disabled === true) {
          item.attr('disabled', true);
        }

        if ($J.typeOf(data.action) === 'function') {
          // item.addEvent('click', (e) {
          item.addEvent('btnclick', e => {
            e.stop();

            if (!item.attr('disabled')) {
              _.hide();

              data.action.call(data.action, _.position);
            }
          });
        }
      }

      if ($J.defined(data.hidden) && data.hidden === true) {
        item.setCss({
          display: 'none'
        });
      }

      const id = data.id || 'item-' + Math.floor(Math.random() * +new Date());
      this.items[id] = item;
      return id;
    }

    hideItem(id) {
      if (this.items[id]) {
        $(this.items[id]).setCss({
          display: 'none'
        });
      }
    }

    showItem(id) {
      if (this.items[id]) {
        $(this.items[id]).setCss({
          display: ''
        });
      }
    }

    disableItem(id) {
      if (this.items[id]) {
        $(this.items[id]).attr('disabled', true);
      }
    }

    enableItem(id) {
      if (this.items[id]) {
        $(this.items[id]).removeAttr('disabled');
      }
    }

    show(e) {
      let _parent = $J.D.node.body;

      if (!this._canShow) {
        return;
      }

      this.hideFX.stop();

      if ($J.browser.fullScreen.enabled()) {
        if (this._fullScreenBox || $J.D.msFullscreenElement) {
          _parent = this._fullScreenBox || $J.D.msFullscreenElement;
        }
      }

      this.overlay.appendTo(_parent);
      this.context.setCss({
        top: -10000
      }).appendTo(_parent); // this.context.setCss({ top: -10000 }).appendTo(this.overlay);

      const pos = e.clientXY;
      let left = pos.x;
      let top = pos.y;
      const page = e.pageXY;
      this._position.top = page.y;
      this._position.left = page.x;
      const viewport = getViewPort(5);
      const size = this.context.size;

      if (viewport.right < left + size.width) {
        left -= size.width;
      }

      if (viewport.bottom < top + size.height) {
        top = viewport.bottom - size.height;
      }

      this.context.setCss({
        top: top,
        left: left,
        display: 'block',
        opacity: 1
      });
      this.active = true;
    }

    hide(e) {
      if (!this.active) {
        return;
      }

      this.overlay.remove();
      this.hideFX.start({
        'opacity': [1, 0]
      });
      this.active = false;

      if (e) {
        e.stopDefaults();

        if (e.type === 'contextmenu') {
          const p = e.pageXY;
          const r = this.target.rect;

          if (r.left <= p.x && r.right >= p.x && r.top <= p.y && r.bottom >= p.y) {
            this.show(e);
          }
        }
      }
    }
    /**
     * @param {boolean} canShow
     */


    set canShow(canShow) {
      this._canShow = canShow;
    }
    /**
     * @param {HTMLElement} fullScreenBox
     */


    set fullScreenBox(fullScreenBox) {
      this._fullScreenBox = fullScreenBox;
    }

    destroy() {
      this.target.removeEvent('contextmenu', this.showBind);
      $J.W.removeEvent('keydown', this.hideBind).removeEvent('scroll', this.hideOnScrollBind);

      try {
        this.context.kill();
      } catch (ex) {// empty
      }

      try {
        this.overlay.kill();
      } catch (ex) {// empty
      }
    }

  }

  return ContextmenuInstance;
});
Sirv.define('BaseInstance', ['bHelpers', 'magicJS', 'EventEmitter', 'helper'], (bHelpers, magicJS, EventEmitter, helper) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* global EventEmitter, helper */

  /* eslint-disable class-methods-use-this */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  const DEFAULT_PREFIX = 'smv-';

  class BaseInstance extends EventEmitter {
    constructor(node, options, defaultSchema) {
      super();
      this.defaultSchema = defaultSchema;
      this._options = options;
      this.instanceNode = $(node);
      this.instanceUrl = this.instanceNode.attr('data-src') || this.instanceNode.attr('src') || this.instanceNode.attr('data-bg-src');
      this.option = null;
      this.ready = false;
      this.id = null;
      this.isCustomId = false;
      this.isStartedFullInit = false;
      this.isStarted = false;
      this.destroyed = false;
      this.referrerPolicy = this.instanceNode.attr('data-referrerpolicy') || this.instanceNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
      this.instanceOptions = this.makeOptions();
      this.createOptionFunction();
      const this_ = this;
      this.api = {
        isReady: () => {
          return this_.ready;
        },
        resize: this_.resize,
        getOptions: this_.options
      };
    }

    setOptions(optInstance, common, local, attr) {
      optInstance.fromJSON(common);
      optInstance.fromString(local);
      optInstance.fromString(attr);
      return optInstance;
    }

    makeGlobalOptions(optionsInstance) {
      const o = this._options.options;
      return this.setOptions(optionsInstance, o.common.common, o.local.common, this.instanceNode.attr('data-options') || '');
    }

    makeMobileOptions(optionsInstance) {
      const o = this._options.options;
      return this.setOptions(optionsInstance, o.common.mobile, o.local.mobile, this.instanceNode.attr('data-mobile-options') || '');
    }

    makeOptions() {
      let options = new $J.Options(this.defaultSchema);
      options = this.makeGlobalOptions(options);

      if ($J.browser.touchScreen && $J.browser.mobile) {
        options = this.makeMobileOptions(options);
      }

      return options;
    }

    getOptionsForStartFullInit(options) {
      if (options) {
        this._options.options = options;
        this.instanceOptions = this.makeOptions();
        this.createOptionFunction();
      }
    }

    get options() {
      return this.instanceOptions.getJSON();
    }

    resize() {
      if (this.ready) {
        return this.onResize();
      }

      return false;
    }

    onResize() {
      return true;
    }

    get imageClassContainer() {
      return {};
    }

    checkImage(setts, dontLoad) {
      let result;
      const imageClass = this.imageClassContainer;

      if (dontLoad) {
        result = imageClass.isExist(setts); // because we do not load images with imageclass
      } else {
        result = imageClass.isLoaded(setts);
      }

      return result;
    }

    getId(idPrefix, df) {
      this.id = this.instanceNode.attr('id');

      if (!this.id) {
        this.isCustomId = true;

        if (!idPrefix) {
          idPrefix = 'component-';
        }

        if (!df) {
          df = DEFAULT_PREFIX;
        }

        this.id = df + idPrefix + helper.generateUUID();
        this.id = this.id.trim();
        this.instanceNode.attr('id', this.id);
      }
    }

    createOptionFunction() {
      this.option = (...args) => {
        if (args.length > 1) {
          return this.instanceOptions.set(args[0], args[1]);
        }

        return this.instanceOptions.get(args[0]);
      };
    }

    startFullInit(options) {
      if (this.destroyed || this.isStartedFullInit) {
        return;
      }

      this.isStartedFullInit = true;
      this.getOptionsForStartFullInit(options);
    }

    get originImageUrl() {
      return null;
    } // instance 'start' metod rename to 'run'


    run() {
      if (!this.isStarted) {
        this.isStarted = true;
        return true;
      }

      return false;
    }

    done() {
      this.ready = true;
    }

    destroy() {
      this.destroyed = true;
      this.isStarted = false;
      this.ready = false;
      this.isStartedFullInit = false;

      if (this.isCustomId) {
        this.instanceNode.removeAttr('id');
        this.isCustomId = false;
      }

      this.instanceNode = null;
      super.destroy();
    }

  }

  return BaseInstance;
});
Sirv.define('Instance', ['bHelpers', 'magicJS', 'globalVariables', 'BaseInstance', 'helper'], (bHelpers, magicJS, globalVariables, BaseInstance, helper) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* global BaseInstance */

  /* global helper */

  /* eslint-disable class-methods-use-this */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars

  const createError = name => {
    return new Error('This method \'' + name + '\' is not implemented.');
  };

  class Instance extends BaseInstance {
    constructor(node, options, defaultSchema) {
      super(node, options, defaultSchema);
      this.type = globalVariables.SLIDE.TYPES.NONE;
      this.always = options.always;
      this.quality = options.quality;
      this.hdQuality = options.hdQuality;
      this.isHDQualitySet = options.isHDQualitySet;
      this.isFullscreenEnabled = options.isFullscreen;
      this.dataAlt = null;
      this.isSlideShown = false;
      this.isInView = false;
      this.preload = false;
      this.firstSlideAhead = false;
      this.infoSize = null;
      this.pinchCloud = null;
      this.onLoad = false;
      this.waitToStart = new helper.WaitToStart();
      this.waitGettingInfo = new helper.WaitToStart();
      this.gettingInfoPromise = null;
      this.fullscreenState = globalVariables.FULLSCREEN.CLOSED;
      this.on('stats', e => {
        e.data.component = globalVariables.SLIDE.NAMES[this.type];
      });
    }

    sendEvent(typeOfEvent, data) {
      if (!data) {
        data = {};
      }

      if (!data.event) {
        data.event = {};
      }

      data.id = this.id;
      data.url = this.instanceUrl;
      data.event.timestamp = +new Date();
      data.event.type = globalVariables.SLIDE.NAMES[this.type] + ':' + typeOfEvent;
      this.emit('componentEvent', {
        data: {
          type: typeOfEvent,
          data: data
        }
      });
    }

    onStartActions() {}

    onStopActions() {}

    onInView(value) {}

    onBeforeFullscreenIn(data) {}

    onAfterFullscreenIn(data) {}

    onBeforeFullscreenOut(data) {}

    onAfterFullscreenOut(data) {}

    onMouseAction(type) {}

    onSecondSelectorClick() {}

    onStopContext() {}

    loadContent() {
      return true;
    }

    loadThumbnail() {
      if (!this.destroyed) {
        this.waitToStart.start();
        return true;
      }

      return false;
    }

    startGettingInfo() {
      if (!this.destroyed) {
        this.waitGettingInfo.start();
        return true;
      }

      return false;
    }

    startFullInit(options) {
      if (this.isStartedFullInit) {
        return;
      }

      super.startFullInit(options);

      if (options) {
        this.always = options.always;
      }

      this.dataAlt = this.instanceNode.attr('data-alt');
      this.on('startActions', e => {
        e.stop();
        this.isSlideShown = true;
        this.onStartActions(e.who);
      });
      this.on('stopActions', e => {
        e.stop();
        this.isSlideShown = false;
        this.onStopActions();
      });
      this.on('inView', e => {
        e.stop();
        const iv = e.data;
        this.onInView(iv);
        this.isInView = iv;
      });
      this.setEvents();
    }

    isFullscreenActionEnded() {
      return [globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENED].includes(this.fullscreenState);
    }

    setEvents() {
      this.on('beforeFullscreenIn', e => {
        e.stop();

        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || this.destroyed) {
          return;
        }

        this.fullscreenState = globalVariables.FULLSCREEN.OPENING;
        this.onBeforeFullscreenIn(e.data);
      });
      this.on('afterFullscreenIn', e => {
        e.stop();

        if (!this.destroyed) {
          this.fullscreenState = globalVariables.FULLSCREEN.OPENED;
          this.onAfterFullscreenIn(e.data);
        }
      });
      this.on('beforeFullscreenOut', e => {
        e.stop();

        if (this.fullscreenState === globalVariables.FULLSCREEN.CLOSED || this.destroyed) {
          return;
        }

        this.fullscreenState = globalVariables.FULLSCREEN.CLOSING;
        this.onBeforeFullscreenOut(e.data);
      });
      this.on('afterFullscreenOut', e => {
        e.stop();

        if (!this.destroyed) {
          this.fullscreenState = globalVariables.FULLSCREEN.CLOSED;
          this.onAfterFullscreenOut(e.data);
        }
      });
    }

    getSelectorImgUrl(data) {
      return Promise.reject(createError('getSelectorImgUrl'));
    }

    getInfoSize() {
      return Promise.reject(createError('getInfoSize'));
    }

    run(isShown, preload, firstSlideAhead) {
      const result = super.run();

      if (result) {
        this.isSlideShown = isShown;
        this.preload = preload;
        this.firstSlideAhead = firstSlideAhead;

        if (!this.firstSlideAhead) {
          this.waitToStart.start();
        }
      }

      return result;
    }

    getThumbnailData() {
      return {
        src: null
      };
    }

    getSocialButtonData(data) {
      const opt = data;

      if (this.infoSize.width < data.width || this.infoSize.height < data.height) {
        opt.width = this.infoSize.width;
        opt.height = this.infoSize.height;
      }

      const thumbnailData = this.getThumbnailData(opt);
      return thumbnailData.src;
    }

    createPinchEvent(node) {
      const pinchCloud = {
        isAdded: false,
        pinch: false,
        scale: 0,
        block: false,
        onPinchStart: e => {},
        onPinchResize: e => {},
        onPinchMove: e => {},
        onPinchEnd: e => {
          if (pinchCloud.pinch) {
            pinchCloud.pinch = false;
            this.sendEvent('pinchEnd');
          }

          pinchCloud.block = false;
        },
        handler: e => {
          switch (e.state) {
            case 'pinchstart':
              pinchCloud.onPinchStart(e);
              break;

            case 'pinchresize':
              pinchCloud.onPinchResize(e);
              break;

            case 'pinchmove':
              pinchCloud.onPinchMove(e);
              break;

            case 'pinchend':
              pinchCloud.onPinchEnd(e);
              break;

            default:
          }

          if (pinchCloud.pinch) {
            e.stop();
          }
        },
        addEvent: () => {
          if (!pinchCloud.isAdded && $J.browser.touchScreen) {
            node.addEvent('pinch', pinchCloud.handler);
            pinchCloud.isAdded = true;
          }
        },
        removeEvent: () => {
          if (pinchCloud.isAdded) {
            node.removeEvent('pinch', pinchCloud.handler);
            pinchCloud.isAdded = false;
            pinchCloud.block = false;
            pinchCloud.pinch = false;
          }
        }
      };
      pinchCloud.addEvent();
      this.pinchCloud = pinchCloud;
    }

    done() {
      super.done();
      this.createPinchEvent();
      this.on('resize', e => {
        e.stop();
        this.onResize();
      });
      this.on('stopContext', e => {
        e.stop();
        this.onStopContext();
      });
      this.on('secondSelectorClick', e => {
        e.stopAll();
        this.onSecondSelectorClick();
      });
      this.on('mouseAction', e => {
        e.stop();
        this.onMouseAction(e.data.type);
      });
      this.on('dragEvent', e => {
        e.stop();

        if (this.pinchCloud) {
          if (e.data.type === 'dragstart') {
            this.pinchCloud.removeEvent();
          } else if (e.data.type === 'dragend') {
            this.pinchCloud.addEvent();
          }
        }
      });
      this.sendEvent('ready');
    }

    sendContentLoadedEvent() {
      if (!this.onLoad) {
        this.onLoad = true;
        this.sendEvent('contentLoaded');
      }
    }

    destroy() {
      this.off('stats');
      this.off('startActions');
      this.off('stopActions');
      this.off('inView');
      this.off('resize');
      this.off('stopContext');
      this.off('secondSelectorClick');
      this.off('mouseAction');
      this.off('dragEvent');
      this.off('beforeFullscreenIn');
      this.off('afterFullscreenIn');
      this.off('beforeFullscreenOut');
      this.off('afterFullscreenOut');
      this.pinchCloud = null;
      this.isSlideShown = false;
      super.destroy();
      this.waitGettingInfo.destroy();
      this.waitGettingInfo = null;
      this.waitToStart.destroy();
      this.waitToStart = null;
      this.gettingInfoPromise = null;
    }

  }

  return Instance;
});
Sirv.define('HotspotInstance', ['bHelpers', 'magicJS', 'Instance'], (bHelpers, magicJS, Instance) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* global Instance */

  /* eslint-disable class-methods-use-this */

  /* eslint-disable no-unused-vars */

  /* eslint no-console: ["error", { allow: ["warn"] }] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  const warn = (v1, v2) => {
    console.warn('sirv.js: The ' + v1 + ' method is deprecated and will be removed. \r\n           Use ' + v2 + ' instead.');
  }; // eslint-disable-next-line no-unused-vars


  class HotspotInstance extends Instance {
    constructor(node, options, defaultSchema) {
      super(node, options, defaultSchema); // this variable is usin in spin, zoom and image component

      this.hotspots = null; // API

      const this_ = this;
      this.api = Object.assign(this.api, {
        addHotspot: hotspotsData => {
          warn('.addHotspot()', '.hotspots.add()');
          this_.hotspots.api.add(hotspotsData);

          if (this_.isInView && this_.isSlideShown) {
            this_.hotspots.showNeededElements();
          }
        },
        removeHotspot: index => {
          warn('.removeHotspot()', '.hotspots.remove()');
          this_.hotspots.api.remove(index);
        },
        removeAllHotspots: () => {
          warn('.removeAllHotspots()', '.hotspots.removeAll()');
          this_.hotspots.api.removeAll();
        },
        getHotspots: () => {
          warn('.getHotspots()', '.hotspots.list()');
          return this_.hotspots.api.list();
        }
      });
    }

    createHotspotsClass(HotspotsClass, hotspotOptions) {
      this.hotspots = new HotspotsClass(hotspotOptions);
      this.hotspots.parentClass = this;
      this.on('hotspotActivate', e => {
        e.stopAll();
        this.onHotspotActivate(e.data);
        this.sendEvent('hotspotOpened');
      });
      this.on('hotspotDeactivate', e => {
        e.stopAll();
        this.onHotspotDeactivate(e.data);
        this.sendEvent('hotspotClosed');
      });
      this.api = Object.assign(this.api, {
        hotspots: this.hotspots.api
      });
      const this_ = this;

      this.api.hotspots.add = hsData => {
        if (hsData) {
          let clientRect = null;

          if (!this_.hotspots.api.list().length) {
            const parentContainer = this.getParentContainer();
            clientRect = this_.hotspots.getRightBoundengClientRect(this.getContainerForBoundengClientRect());
            this_.hotspots.appendTo(parentContainer);
          }

          this_.hotspots.addHotspot(hsData);
          this_.hotspots.containerSize = clientRect;
          this_.hotspots.showAll();

          if (this_.isInView && this_.isSlideShown) {
            this_.hotspots.showNeededElements();
          }
        }
      };
    }

    getContainerForBoundengClientRect() {
      return this.getParentContainer();
    }

    done() {
      if (!this.ready && !this.destroyed && this.hotspots) {
        let parentContainer = this.instanceNode;

        if (parentContainer.tagName === 'img') {
          parentContainer = $(parentContainer.node.parentNode);
        }

        this.hotspots.appendTo(parentContainer);
        this.hotspots.createHotspots(this.hotspotsData);

        if (this.nativeFullscreen) {
          this.hotspots.changeBoxContainerParent(true);
        }

        this.hotspots.showAll();
      }

      super.done();
    }

    getParentContainer() {
      let parentContainer = this.instanceNode;

      if (parentContainer.tagName === 'img') {
        parentContainer = $(parentContainer.node.parentNode);
      }

      return parentContainer;
    }

    onHotspotActivate(data) {}

    onHotspotDeactivate(data) {}

    onStartActions() {
      if (this.hotspots && this.isInView && this.isSlideShown) {
        this.hotspots.showNeededElements();
      }

      super.onStartActions();
    }

    onStopActions() {
      if (this.hotspots) {
        this.hotspots.hideActiveHotspotBox(true);
      }

      super.onStopActions();
    }

    onBeforeFullscreenIn(data) {
      if (this.hotspots) {
        this.hotspots.hideActiveHotspotBox();

        if (this.nativeFullscreen) {
          this.hotspots.changeBoxContainerParent(true);
        }
      }
    }

    onBeforeFullscreenOut(data) {
      if (this.hotspots) {
        this.hotspots.hideActiveHotspotBox();

        if (this.nativeFullscreen) {
          this.hotspots.changeBoxContainerParent();
        }
      }
    }

    onAfterFullscreenOut(data) {
      if (this.hotspots && this.isInView && this.isSlideShown) {
        this.hotspots.showNeededElements();
      }
    }

    destroy() {
      if (this.hotspots) {
        this.hotspots.destroy();
      }

      this.hotspots = null;
      this.off('hotspotActivate');
      this.off('hotspotDeactivate');
      super.destroy();
    }

  }

  return HotspotInstance;
});
Sirv.define('Loader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'EventEmitter'], (bHelpers, magicJS, globalVariables, globalFunctions, helper, EventEmitter) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global EventEmitter */

  /* global $J */

  /* global $ */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint dot-notation: ["error", { "allowKeywords": false }]*/
  // eslint-disable-next-line no-unused-vars

  class Loader extends EventEmitter {
    constructor(parent, options) {
      super();
      this.parentNode = $(parent);
      this.options = Object.assign({
        width: null,
        height: null,
        'class': null
      }, options || {});
      this.node = $J.$new('div').addClass('smv-loader');
      this.type = 'simple';
      this.inDoc = false;

      if (this.options['class']) {
        this.node.addClass(this.options['class']);
      }

      if (this.options.width) {
        this.node.setCssProp('width', this.options.width);
      }

      if (this.options.height) {
        this.node.setCssProp('height', this.options.height);
      }
    }

    append() {
      if (!this.inDoc) {
        this.inDoc = true;
        this.parentNode.append(this.node);
      }
    }

    show() {
      this.append();
      this.node.setCss({
        display: '',
        visibility: 'visible'
      });
    }

    hide() {
      this.node.setCss({
        display: 'none',
        visibility: 'hidden'
      });
    }

    destroy() {
      this.hide();
      this.node.remove();
      this.node = null;
      this.inDoc = false;
      super.destroy();
    }

  }

  return Loader;
});
Sirv.define('RoundLoader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Loader'], (bHelpers, magicJS, globalVariables, globalFunctions, helper, Loader) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global Loader */

  /* global $J */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  const SHOW_CLASS = 'smv-show'; // eslint-disable-next-line no-unused-vars

  class RoundLoader extends Loader {
    constructor(parent, options) {
      super(parent, options);
      this.type = 'round';
      this.state = globalVariables.APPEARANCE.HIDDEN;
      this.timer = null;
      this.loaderElement = $J.$new('div');
      this.addClass();
      this.node.append(this.loaderElement);
    }

    addClass() {
      this.node.addClass('smv-round-loader');
    }

    isHiding() {
      return this.state === globalVariables.APPEARANCE.HIDING;
    }

    show() {
      if ([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN].includes(this.state)) {
        return;
      }

      this.state = globalVariables.APPEARANCE.SHOWING;
      this.timer = setTimeout(() => {
        this.timer = null;
        this.append();
        this.node.removeEvent('transitionend');
        this.node.addEvent('transitionend', e => {
          e.stop();
          this.state = globalVariables.APPEARANCE.SHOWN;
        });
        this.node.render();
        this.node.addClass(SHOW_CLASS);
      }, 250);
    }

    hide(force) {
      if (this.state === globalVariables.APPEARANCE.HIDDEN && !force) {
        return;
      }

      clearTimeout(this.timer);
      this.node.removeEvent('transitionend');

      if (this.state !== globalVariables.APPEARANCE.SHOWN) {
        force = true;
      }

      this.state = globalVariables.APPEARANCE.HIDING;

      if (!force) {
        this.node.addEvent('transitionend', e => {
          e.stop();
          this.node.remove();
          this.inDoc = false;
          this.state = globalVariables.APPEARANCE.HIDDEN;
        });
      } else {
        this.node.remove();
        this.inDoc = false;
        this.state = globalVariables.APPEARANCE.HIDDEN;
      }

      this.node.removeClass(SHOW_CLASS);
    }

    destroy() {
      this.hide(true);
      this.state = globalVariables.APPEARANCE.HIDDEN;
      this.node.innerHTML = '';
      super.destroy();
    }

  }

  return RoundLoader;
});
Sirv.define('ComponentLoader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'RoundLoader'], (bHelpers, magicJS, globalVariables, globalFunctions, helper, RoundLoader) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global RoundLoader */

  /* global $J */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  const setDefaultOptions = options => {
    if (!options) {
      options = {};
    }

    if (!options.width) {
      options.width = '100%';
    }

    if (!options.height) {
      options.height = '100%';
    }

    return options;
  }; // eslint-disable-next-line no-unused-vars


  class ComponentLoader extends RoundLoader {
    constructor(parent, options) {
      options = setDefaultOptions(options);
      super(parent, options);
      this.type = 'component';
      this.loaderElement.addClass('smv-bounce-wrapper').append($J.$new('div').addClass('smv-bounce1')).append($J.$new('div').addClass('smv-bounce2'));
    }

    addClass() {
      this.node.addClass('smv-component-loader');
    }

    destroy() {
      this.loaderElement.removeClass('smv-bounce-wrapper');
      this.loaderElement.node.innerHTML = '';
      super.destroy();
    }

  }

  return ComponentLoader;
});
Sirv.define('ResponsiveImage', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'EventEmitter'], (bHelpers, magicJS, globalVariables, globalFunctions, helper, EventEmitter) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global Promise */

  /* global helper */

  /* eslint-disable indent */

  /* eslint-disable no-lonely-if*/

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /*
      Image class
          params:
              name - name of image
              url - image url,
              srcSettings - settings which has current image
              srcsetSettings - x2 settings which has current image
  */
  // eslint-disable-next-line no-unused-vars

  const requestCORSIfNotSameOrigin = (img, url) => {
    if (new URL(url).origin !== $J.W.location.origin) {
      img.crossOrigin = '';
    }
  };

  const getUrl = (url, settings) => {
    // let result = url + ('?' + paramsToQueryString(settings).replace(/(?:\?|&)profile\=$/, ''));
    let result = url + ('?' + helper.paramsToQueryString(settings));
    result = helper.cleanQueryString(result);
    return result;
  }; // eslint-disable-next-line no-unused-vars


  class _Image {
    constructor(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy) {
      this._name = name;
      this._state = 0; // not-loaded = 0, loading = 1, loaded = 2, error = 3

      this.imageNode = null;
      this._size = {
        width: 0,
        height: 0
      };
      this.loader = null;
      this.callbacks = [];
      this.srcSettings = srcSettings;
      this.srcsetSettings = srcsetSettings;
      this.dontLoad = dontLoad;
      this.dppx = this.srcsetSettings ? this.srcsetSettings.dppx : 1;
      this.referrerPolicy = referrerPolicy;

      if (srcSettings.profile === '') {
        delete srcSettings.profile;
      }

      if (srcsetSettings && srcsetSettings.profile === '') {
        delete srcsetSettings.profile;
      }

      this._src = getUrl(url, srcSettings);
      this._srcset = null;

      if (srcsetSettings) {
        this._srcset = getUrl(url, srcsetSettings.settings);
      }
    }

    get name() {
      return this._name;
    }

    get node() {
      return this.imageNode;
    }

    get size() {
      return this._size;
    }

    get src() {
      return this._src;
    }

    get srcset() {
      return this._srcset;
    }

    get state() {
      return this._state;
    }

    get DPPX() {
      return this.dppx;
    }

    load() {
      return new Promise((resolve, reject) => {
        if (this.dontLoad) {
          resolve(this);
        } else if (!this._state) {
          this._state = 1;
          this.imageNode = $(new Image());
          this.imageNode.attr('referrerpolicy', this.referrerPolicy || 'no-referrer-when-downgrade');
          this.imageNode.addEvent('load', e => {
            e.stop();
            this._state = 2;
            this._size = {
              width: this.imageNode.node.naturalWidth || this.imageNode.node.width,
              height: this.imageNode.node.naturalHeight || this.imageNode.node.height
            };

            if ($J.browser.uaName === 'safari') {
              let correct = false;

              if (this.srcSettings.scale.width) {
                if (this._size.width > this.srcSettings.scale.width + 5) {
                  correct = true;
                }
              } else {
                if (this._size.height > this.srcSettings.scale.height + 5) {
                  correct = true;
                }
              }

              if (correct) {
                this._size.width /= this.dppx;
                this._size.height /= this.dppx;
              }
            }

            resolve(this);
          });
          this.imageNode.addEvent('error', e => {
            e.stop();
            this._state = 3;
            this.imageNode = null;
            reject(this);
          }); // requestCORSIfNotSameOrigin(this.imageNode.node, this.src);

          this.addSrc();
          this.addSrcset();
          this.imageNode.node.src = this._src;
        } else {
          resolve(this);
        }
      });
    }

    addSrc() {
      this.imageNode.node.src = this._src;
    }

    addSrcset() {
      if (this._srcset) {
        // TODO because amount of tiles are different between 1x image and 1.5x image
        // this.imageNode.node.srcset = encodeURI(this.srcset) + ' 2x';
        // this.imageNode.node.srcset = this.srcset + ' 2x';
        this.imageNode.node.srcset = this._srcset + ' ' + this.dppx + 'x';
      }
    }

    get loading() {
      return this._state === 1;
    }

    destroy() {
      if (this._state === 1 && this.imageNode) {
        this.imageNode.attr('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
      }

      this._state = 0;
    }

  }
  /* eslint-env es6 */

  /* global _Image */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars


  class _TileImage extends _Image {
    constructor(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy, tileName) {
      super(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy);
      this._tileName = tileName; // name of tile
    }

    get tileName() {
      return this._tileName;
    }

    addSrc() {
      if (this.dppx === 1) {
        // TODO because amount of tiles are different between 1x image and 1.5x image
        super.addSrc();
      }
    }

  }
  /* eslint-env es6 */

  /* global _Image, _TileImage, helper, EventEmitter */

  /* eslint-disable indent */

  /* eslint-disable no-console */

  /* eslint-disable no-lonely-if */

  /* eslint no-prototype-builtins: "off" */

  /* eslint no-useless-escape: "off" */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint class-methods-use-this: ["off", { "_createImageData": ["error"] }] */

  /*
      RImage class
      params:
          source - sirv image url
          o - options
          infoId - id for info object (to save in global object IMAGE_INFO) or will be generated automatically
  
      public functions:
          getClearSizeWithoutProcessingSettings
          isExist
          isLoaded
          ready
          originSize
          sendLoad
          cancelLoadingImage
          generateImageName
          getImage
          originUrl
          getProcessingSettings
          getThumbnail
          destroy
  
      public events:
          'imageOnload' - fire when the image was loaded
  
      example:
      this.images = {
          '123234345456' (it is name of image): {
              serverWidth: 150,
              serverHeight: 150,
              image: _Image class
          },
      };
  
  */


  const splitOptions = (imageSettings, dppx) => {
    const src = Object.assign({}, imageSettings);
    delete src.src;
    delete src.srcset;
    src.imageSettings = Object.assign({}, imageSettings?.imageSettings || {});
    let srcset;

    if (dppx > 1) {
      srcset = JSON.parse(JSON.stringify(src));

      if (srcset.width) {
        srcset.width = parseInt(srcset.width * dppx, 10);
      }

      if (srcset.height) {
        srcset.height = parseInt(srcset.height * dppx, 10);
      }

      if (srcset.imageSettings.crop) {
        if (srcset.imageSettings.crop.width) {
          srcset.imageSettings.crop.width = parseInt(srcset.imageSettings.crop.width * dppx, 10);
        }

        if (srcset.imageSettings.crop.height) {
          srcset.imageSettings.crop.height = parseInt(srcset.imageSettings.crop.height * dppx, 10);
        }
      }

      srcset.dppx = dppx;
    }

    src.imageSettings = Object.assign(src.imageSettings, imageSettings.src);

    if (srcset && imageSettings.srcset) {
      srcset.imageSettings = Object.assign(srcset.imageSettings, imageSettings.srcset);
    }

    return {
      src: src,
      srcset: srcset
    };
  };

  const getOriginUrl = source => {
    return source.split('?')[0];
  };

  const toPercentageString = v => {
    return (v * 100).toFixed(4) + '%';
  };

  const generateImageName = url => {
    url = url.replace('\?+', '?').replace('&+', '&').split('?');
    let hash = url[1];
    url = url[0];
    hash = hash.split('&').sort();
    return '' + $J.getHashCode(url + '?' + hash.join('&'));
  };

  const getPropFromCrop = (obj, name) => {
    if (obj && obj.crop && obj.crop[name]) {
      return obj.crop[name];
    }

    return null;
  };

  const mixSettings = (info, defaultImageSettings, imageSettings) => {
    let result = helper.deepExtend({}, defaultImageSettings);

    if (info && info.imageSettings.processingSettings) {
      if (!result.crop) {
        result.crop = {};
      }

      result.crop = helper.deepExtend(result.crop, info.cropSettings); // if (result.crop) {
      //     if (result.crop.width && /100(\.0*)?%/.test(result.crop.width)) {
      //         delete result.crop.width;
      //     }
      //     if (result.crop.height && /100(\.0*)?%/.test(result.crop.height)) {
      //         delete result.crop.height;
      //     }
      // }

      if (!result.canvas) {
        result.canvas = {};
      }

      result.canvas = helper.deepExtend(result.canvas, info.canvasSettings);

      if (!result.frame) {
        result.frame = {};
      }

      result.frame = helper.deepExtend(result.frame, info.frameSettings);

      if (!result.scale) {
        result.scale = {};
      }

      if (!result.scale.option) {
        result.scale.option = 'fill';
      }
    }

    if (imageSettings.width && imageSettings.width !== 'auto') {
      result.scale.width = imageSettings.width;
    }

    if (imageSettings.height && imageSettings.height !== 'auto') {
      result.scale.height = imageSettings.height;
    }

    if (imageSettings.imageSettings) {
      result = helper.deepExtend(result, imageSettings.imageSettings);
    } // if (getPropFromCrop(defaultImageSettings, 'type') === 'focalpoint' || getPropFromCrop(info.imageSettings.processingSettings, 'type') === 'focalpoint') {
    //     const x = getPropFromCrop(defaultImageSettings, 'x') || getPropFromCrop(info.imageSettings.processingSettings, 'x');
    //     if (x) {
    //         result.crop.x = x;
    //     }
    //     const y = getPropFromCrop(defaultImageSettings, 'y') || getPropFromCrop(info.imageSettings.processingSettings, 'y');
    //     if (y) {
    //         result.crop.y = y;
    //     }
    //     result.scale = {};
    // }


    return result;
  };

  const INFO = 'sirv_image_info_';
  const IMAGE_INFO = {}; // eslint-disable-next-line no-unused-vars

  class RImage extends EventEmitter {
    constructor(source, o) {
      super();

      if ($J.typeOf(source) !== 'string') {
        source = $(source).attr('src');
      }

      this.o = Object.assign({
        type: 'main',
        infoId: 'sirv-image-' + helper.generateUUID(),
        imageSettings: {},
        round: true,
        dontLoad: false,
        convertSmallerSideToZero: true,
        referrerPolicy: 'no-referrer-when-downgrade',

        /*
            loadNewImage:
            true - if image is missing - load image
            false - if image is missing but if bigger image is exist give large image else load image
        */
        loadNewImage: false
      }, o);
      this.imageInfoPromise = null;
      this.images = {};
      this._originUrl = getOriginUrl($J.getAbsoluteURL(source));
      this.infoUrl = this._originUrl + '?nometa&info';
      this.imageSettings = Object.assign({}, this.o.imageSettings);
    }

    static roundImageSize(size, originSize) {
      let tmp;

      if (!originSize) {
        originSize = {
          width: Number.MAX_VALUE,
          height: Number.MAX_VALUE
        };
      }

      if (size.width && size.height) {
        if (size.width >= size.height) {
          tmp = helper.roundSize(size.width);

          if (tmp <= originSize.width) {
            size.height = Math.floor(size.height / size.width * tmp);
            size.width = tmp;
          }
        } else {
          tmp = helper.roundSize(size.height);

          if (tmp <= originSize.height) {
            // size.width = Math.round((size.width / size.height) * tmp);
            // firefox
            // fix 'https://github.com/sirv/sirv.js/issues/148'
            // We need to use 'Math.floor' because this image 'https://demo.sirv.com/demo/vax/2759311-g.jpg?scale.option=fill&h=500' has wrong size in zoom
            size.width = Math.floor(size.width / size.height * tmp);
            size.height = tmp;
          }
        }
      } else if (size.width) {
        tmp = helper.roundSize(size.width);

        if (tmp <= originSize.width) {
          size.width = tmp;
        }
      } else if (size.height) {
        tmp = helper.roundSize(size.height);

        if (tmp <= originSize.height) {
          size.height = tmp;
        }
      }

      return size;
    }

    _convertImageSettings(imageSettings) {
      const setSize = (obj, size) => {
        if (size.width) {
          obj.width = size.width;
        }

        if (size.height) {
          obj.height = size.height;
        }
      };

      if (!imageSettings) {
        imageSettings = {};
      }

      imageSettings = Object.assign({}, imageSettings); // correct tile size if we have canvas border

      let tmp = this.getClearSizeWithoutProcessingSettings({
        width: imageSettings.width,
        height: imageSettings.height
      });
      setSize(imageSettings, tmp);
      const result = splitOptions(imageSettings, imageSettings.dppx);

      if (imageSettings.round || !imageSettings.hasOwnProperty('round') && this.o.round) {
        const originSize = this.originSize;
        tmp = RImage.roundImageSize(result.src, originSize);
        setSize(result, tmp);

        if (result.srcset) {
          tmp = RImage.roundImageSize(result.srcset, originSize);
          setSize(result, tmp);
        }
      }

      return result;
    }

    _mixSettings(settings) {
      return mixSettings(IMAGE_INFO[this.o.infoId], this.imageSettings, settings);
    }

    _calcProcessingSettings() {
      let info = IMAGE_INFO[this.o.infoId];
      const cropSettings = {};
      const canvasSettings = {};
      const frameSettings = {};

      if (!info.imageSettings.viewer) {
        info.imageSettings.viewer = {};
      }

      const viewer = info.imageSettings.viewer;
      const originSize = {
        width: info.imageSettings.original.width,
        height: info.imageSettings.original.height,
        widthScale: 1,
        heightScale: 1
      };

      if (viewer.scale) {
        if (viewer.scale.width) {
          originSize.width *= viewer.scale.width;
        }

        if (viewer.scale.height) {
          originSize.height *= viewer.scale.height;
        }
      }

      originSize.widthScale = originSize.width / info.imageSettings.width;
      originSize.heightScale = originSize.height / info.imageSettings.height;

      if (viewer.crop) {
        if (viewer.crop.width) {
          cropSettings.width = toPercentageString(viewer.crop.width);
        }

        if (viewer.crop.height) {
          cropSettings.height = toPercentageString(viewer.crop.height);
        }

        if (viewer.crop.x) {
          cropSettings.x = toPercentageString(viewer.crop.x);
        }

        if (viewer.crop.y) {
          cropSettings.y = toPercentageString(viewer.crop.y);
        }
      }

      if (viewer.canvas) {
        if (viewer.canvas.width) {
          canvasSettings.width = toPercentageString(viewer.canvas.width);
        }

        if (viewer.canvas.height) {
          canvasSettings.height = toPercentageString(viewer.canvas.height);
        }

        if (viewer.canvas.border) {
          canvasSettings.border = {};

          if (viewer.canvas.border.width) {
            canvasSettings.border.width = toPercentageString(viewer.canvas.border.width);
          }

          if (viewer.canvas.border.height) {
            canvasSettings.border.height = toPercentageString(viewer.canvas.border.height);
          }
        }
      }

      if (viewer.frame && viewer.frame.width) {
        frameSettings.width = toPercentageString(viewer.frame.width);
      }

      info = Object.assign(info, {
        cropSettings: cropSettings,
        canvasSettings: canvasSettings,
        frameSettings: frameSettings,
        originSize: originSize
      });
    }

    _addImage(name, imageSettings) {
      const dontLoad = $J.defined(imageSettings.src.dontLoad) ? imageSettings.src.dontLoad : this.o.dontLoad;

      const getSettings = sett => {
        const result = this._mixSettings(sett);

        if (result.scale && result.scale.width && result.scale.height && result.scale.option !== 'ignore') {
          if (result.scale.width >= result.scale.height) {
            if (this.o.convertSmallerSideToZero) {
              result.scale.height = 0;
            }
          } else {
            if (this.o.convertSmallerSideToZero) {
              result.scale.width = 0;
            }
          }
        }

        return result;
      };

      const src = getSettings(imageSettings.src);
      let srcset = null;
      let tileName = null;

      if (imageSettings.src.imageSettings && imageSettings.src.imageSettings.tile) {
        const tile = imageSettings.src.imageSettings.tile;
        tileName = tile.number + '';
      }

      if (imageSettings.srcset) {
        srcset = {
          dppx: imageSettings.srcset.dppx,
          settings: getSettings(imageSettings.srcset)
        };
      }

      let imageInstance = null;

      if (tileName === null) {
        imageInstance = new _Image(name, this._originUrl, src, srcset, dontLoad, this.o.referrerPolicy);
      } else {
        imageInstance = new _TileImage(name, this._originUrl, src, srcset, dontLoad, this.o.referrerPolicy, tileName);
      }

      this.images[name] = {
        serverWidth: imageSettings.src.width,
        serverHeight: imageSettings.src.height,
        image: imageInstance
      };
      return this.images[name];
    }

    _load(name, imageSettings) {
      const img = this._addImage(name, imageSettings);

      let eventName;
      let instance;
      img.image.load().then(imgInst => {
        instance = imgInst;
        eventName = 'imageOnload';

        if (instance instanceof _Image) {
          this.someImageIsLoaded = true;
        }
      }).catch(imgInst => {
        instance = imgInst;
        eventName = 'imageOnerror';
      }).finally(() => {
        if (instance instanceof _Image) {
          this.someImageIsComplete = true;
        }

        const image = this.images[instance.name];

        if (image) {
          this.emit(eventName, {
            data: this._createImageData(image, imageSettings.src.callbackData)
          });
        }
      });
    }

    _createImageData(img, callbackData) {
      const obj = img.image;
      const result = {
        callbackData: callbackData,
        name: obj.name,
        tileName: obj.tileName,
        tile: obj instanceof _TileImage,
        node: obj.node,
        serverWidth: img.serverWidth,
        serverHeight: img.serverHeight,
        width: obj.size.width,
        height: obj.size.height,
        src: obj.src,
        srcset: obj.srcset,
        state: obj.state,
        dppx: obj.DPPX || 1
      };
      return result;
    }

    getCropPosition() {
      const info = IMAGE_INFO[this.o.infoId];
      let x = getPropFromCrop(this.imageSettings, 'x');

      if (x && !/%$/.test(x)) {
        x = toPercentageString(x / info.originSize.width);
      }

      let y = getPropFromCrop(this.imageSettings, 'y');

      if (y && !/%$/.test(y)) {
        y = toPercentageString(y / info.originSize.height);
      }

      return {
        x: x || info.cropSettings.x,
        y: y || info.cropSettings.y,
        type: getPropFromCrop(this.imageSettings, 'type') || getPropFromCrop(info.imageSettings.processingSettings, 'type')
      };
    }
    /**
     * Is image exist with current size or more
     *
     * @param {Object}    Image settings object to check
     *
     * @returns {boolean} - Returns true if the image is exist
     */


    isExist(imageSettings) {
      imageSettings = this._convertImageSettings(imageSettings);
      const name = this.generateImageName(imageSettings.src);
      let result = Object.prototype.hasOwnProperty.call(this.images, name);

      if (!result) {
        if (!(imageSettings.src.imageSettings && imageSettings.src.imageSettings.tile) && imageSettings.src.width) {
          const images = Object.entries(this.images).filter(v => v[1].image instanceof _TileImage === false).map(v => v[1]);
          result = this._getBiggerImage(imageSettings.src.width, images);
        }
      }

      return !!result;
    }
    /**
     * Is image exist with current size
     *
     * @param {Object}    Image settings object to check
     *
     * @returns {boolean} - Returns true if the image is loaded
     */


    isLoaded(imageSettings) {
      imageSettings = this._convertImageSettings(imageSettings);
      let result = this.images[this.generateImageName(imageSettings.src)];

      if (result) {
        result = result.image.state === 2;
      }

      return !!result;
    }
    /**
     * Some of image is loaded
     *
     * @returns {boolean} - Returns true if some of image is loaded
     */


    get ready() {
      return this.someImageIsLoaded;
    }

    get complete() {
      return this.someImageIsComplete;
    }
    /**
     * Returns origin size of image from image info
     *
     * @returns {Hash} Size of the image  {width: x, height: x}
     */


    get originSize() {
      let result = null;
      let info = null;

      if (IMAGE_INFO[this.o.infoId]) {
        info = IMAGE_INFO[this.o.infoId].imageSettings;
      }

      if (info) {
        let width;
        let height;

        if (info.processingSettings) {
          width = info.width;
          height = info.height;
        } else {
          width = info.original.width;
          height = info.original.height;
        }

        result = {
          width: width,
          height: height
        };
      }

      return result;
    }

    loadInfo() {
      if (!this.imageInfoPromise) {
        this.imageInfoPromise = new Promise((resolve, reject) => {
          let url = this._originUrl;
          const hash = $J.getHashCode(this.infoUrl.replace(/^http(s)?:\/\//, ''));
          const imageSettings = helper.paramsToQueryString(this.imageSettings);

          if (imageSettings !== '') {
            url += '?' + imageSettings;
            url += '&';
          } else {
            url += '?';
          }

          url += 'nometa&info=' + INFO + hash + '_' + this.o.type;
          url = helper.cleanQueryString(url);
          helper.getRemoteData(url, 'image_info_' + helper.generateUUID(), this.o.referrerPolicy).then(data => {
            if (!data.width || data._isplaceholder) {
              reject(data);
            } else {
              IMAGE_INFO[this.o.infoId] = {
                imageSettings: data
              };

              this._calcProcessingSettings();

              resolve(IMAGE_INFO[this.o.infoId]);
            }
          }).catch(reject);
        });
      }

      return this.imageInfoPromise;
    }

    _getBiggerImage(width, images, dontLoad) {
      if (!width) {
        width = 0;
      }

      if (!images) {
        images = this.images;
      }

      if (dontLoad === $J.U) {
        dontLoad = this.o.dontLoad;
      }

      return Object.entries(images).map(value => value[1]).sort((a, b) => a.serverWidth - b.serverWidth).find(value => width < value.serverWidth && (value.image.state === 2 || dontLoad)) || null;
    }

    sendLoad(imageSettings) {
      imageSettings = this._convertImageSettings(imageSettings);
      let img = this.images[this.generateImageName(imageSettings.src)];

      if (!img) {
        img = this._getBiggerImage(imageSettings.src.width);
      }

      this.emit('imageOnload', {
        data: this._createImageData(img, imageSettings.src.callbackData)
      });
    }
    /**
     * Cancels loading image if it is
     *
     * @param {Object}    Image settings object to cansel
     */


    cancelLoadingImage(imageSettings) {
      imageSettings = this._convertImageSettings(imageSettings);
      const name = this.generateImageName(imageSettings.src);
      const img = this.images[name];

      if (img) {
        if (img.image.loading) {
          img.image.destroy();
          delete this.images[name];
        }
      }
    }
    /**
     * Returns image name
     *
     * @param {Object}    Image settings object
     *
     * @returns {String} name of image
     */


    generateImageName(imageSettings) {
      const result = generateImageName(helper.cleanQueryString(this._originUrl + ('?' + helper.paramsToQueryString(this._mixSettings(imageSettings)))));
      return result;
    }

    getClearSizeWithoutProcessingSettings(size) {
      const result = {};
      const info = IMAGE_INFO[this.o.infoId];

      if (size.width) {
        result.width = Math.round(size.width * info.originSize.widthScale);
      }

      if (size.height) {
        result.height = Math.round(size.height * info.originSize.heightScale);
      }

      return result;
    }
    /*
     * Returns image object if it is exist or load image if it isn't
     *
     * @param {Object}    Image settings object
     *
     * @returns {object or null} Returns image object
         imageOptions {
            width: 42,
            height: 42,
            round: true/false(default false) - round max size to 100
            maxSize: true/false(default true), - if the size of image is not exist send image with bigger size
             additionalImageSettings = {
                ...
                quality: 1,
                tile: {}
                ...
            }
        }
    */


    getImage(imageSettings) {
      const options = this._convertImageSettings(imageSettings);

      const dontLoad = $J.defined(options.src.dontLoad) ? options.src.dontLoad : this.o.dontLoad;
      const name = this.generateImageName(options.src);
      let result = this.images[name];

      if (!result) {
        this._load(name, Object.assign({}, options));
      }

      if (result && result.image.state < 2 && !dontLoad) {
        result = null;
      }

      if (!result && (options.src.maxSize || !this.o.loadNewImage)) {
        if (options.src.exactSize) {
          if (dontLoad) {
            result = this.images[name];
          }
        } else {
          result = this._getBiggerImage(null, null, dontLoad);
        }
      }

      if (result) {
        result = this._createImageData(result, options.src.callbackData);
      }

      return result;
    }
    /**
    * Returns origin url of image
    *
    * @returns {String} url
    */


    get originUrl() {
      let result = null;

      if (this._originUrl) {
        result = this._originUrl;
      }

      return result;
    }
    /**
     * Returns current processing settings
     *
     * @returns {object} processing settings
     */


    getProcessingSettings() {
      const info = IMAGE_INFO[this.o.infoId];
      return {
        crop: info.cropSettings,
        cropClear: info.cropSettingsClear,
        canvas: info.canvasSettings,
        canvasClear: info.canvasSettingsClear
      };
    }

    get description() {
      let result = null;
      const info = IMAGE_INFO[this.o.infoId];

      if (info) {
        result = info.imageSettings.original.description || null;
      }

      return result;
    }
    /**
     * Get thambnail urls (src, srcset)
     *
     * @param {Object}    Options for the image
     *
     * @returns {Object}  src, srcset and other datas
     */


    getThumbnail(imageSettings) {
      let result = {
        imageSettings: null,
        size: null,
        src: null,
        srcset: null
      };

      if (IMAGE_INFO[this.o.infoId]) {
        const options = splitOptions(imageSettings, $J.DPPX);
        let srcset = null;
        let convertSmallerSideToZero = this.o.convertSmallerSideToZero;
        const originUrl = imageSettings.originUrl || this._originUrl;

        const getSrc = (_size, _imageSettings) => {
          let settings = {
            scale: {
              option: 'fill'
            }
          };

          if (_size.width || _size.height) {
            if (_size.width && _size.height) {
              settings.scale.width = _size.width;
              settings.scale.height = _size.height;
            } else {
              const tmp = _size.width || _size.height;
              settings.scale.width = tmp;
              settings.scale.height = tmp;
            }
          }

          if (_size.width === _size.height) {
            if (imageSettings.crop) {
              settings.crop = {
                x: 'center',
                y: 'center',
                width: _size.width,
                height: _size.height
              };
            } else {
              settings.scale.option = 'fit';

              if (!settings.canvas) {
                settings.canvas = {};
              }

              settings.canvas.width = _size.width;
              settings.canvas.height = _size.height;
            }
          }

          if (settings.scale) {
            if (imageSettings.width && imageSettings.height) {
              if (IMAGE_INFO[this.o.infoId].imageSettings.original.width >= IMAGE_INFO[this.o.infoId].imageSettings.original.height) {
                if (convertSmallerSideToZero) {
                  settings.scale.height = 0;
                }
              } else {
                if (convertSmallerSideToZero) {
                  settings.scale.width = 0;
                }
              }
            } else if (imageSettings.width) {
              if (convertSmallerSideToZero) {
                settings.scale.height = 0;
              }
            } else if (imageSettings.height) {
              if (convertSmallerSideToZero) {
                settings.scale.width = 0;
              }
            }
          }

          if (_imageSettings) {
            settings = Object.assign(settings, _imageSettings);
          }

          const tmp = settings;
          settings = {};
          settings.imageSettings = tmp;
          settings = this._mixSettings(settings);

          if (settings.text) {
            delete settings.text;
          }

          if (!imageSettings.watermark && settings.watermark) {
            delete settings.watermark;
          }

          return helper.paramsToQueryString(settings);
        };

        const getSize = is => {
          const r = {};

          if (is.width) {
            r.width = is.width;
          }

          if (is.height) {
            r.height = is.height;
          }

          return r;
        };

        if (options.src.crop || options.src.width && options.src.height) {
          convertSmallerSideToZero = false;
        }

        result = {
          callbackData: imageSettings.callbackData,
          size: getSize(options.src.imageSettings),
          src: helper.cleanQueryString(originUrl + '?' + getSrc(getSize(options.src), options.src.imageSettings))
        };

        if ($J.DPPX > 1) {
          srcset = getSrc(getSize(options.srcset), options.srcset.imageSettings);

          if (srcset) {
            result.srcset = helper.cleanQueryString(originUrl + '?' + srcset);
          }
        }
      }

      return result;
    }

    get accountInfo() {
      const result = {};
      const info = IMAGE_INFO[this.o.infoId];

      if (info) {
        result.account = info.imageSettings.account;
        result.branded = info.imageSettings.branded;
      }

      return result;
    }

    destroy() {
      Object.values(this.images).forEach(img => img.image.destroy());
      this.images = {};
      this.someImageIsLoaded = false;
      this.someImageIsComplete = false;

      if (IMAGE_INFO[this.infoId]) {
        delete IMAGE_INFO[this.infoId];
        this.infoId = null;
      }

      super.destroy();
    }

  }

  return RImage;
});
Sirv.define('SliderBuilder', ['bHelpers', 'magicJS', 'EventEmitter', 'helper', 'globalVariables', 'globalFunctions'], (bHelpers, magicJS, EventEmitter, helper, globalVariables, globalFunctions) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global $J, helper, Promise */

  /* eslint-disable no-extra-semi */

  /* eslint-disable no-unused-vars */

  /* eslint class-methods-use-this: ["error", {"exceptMethods": ["loadData"]}] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  const SLIDER_BUILDER_CONF_VER = 1;

  const getInfoUrl = (url, callbackName) => {
    return url + ($J.stringHas(url, '?') ? '&' : '?') + 'nometa&info=' + callbackName;
  };

  class SliderBuilder {
    constructor(sirvOption, node) {
      this.mainNode = $(node);
      this.sirvOptions = helper.deepExtend({}, sirvOption || {});
      this.nodes = [];
      this.configURL = null;
      this.dataJSON = null;
      this.configHash = null;
      this.attrbMainNode = null;
      this.cfCallbackName = null;
      this.urlParams = null;
      this.componentsList = [];
      this.referrerPolicy = this.mainNode.attr('data-referrerpolicy') || this.mainNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
    }

    getOptions() {
      return new Promise((resolve, reject) => {
        if (this.checkNode()) {
          this.buildCallBackName();
          helper.getRemoteData(getInfoUrl(this.configURL, this.cfCallbackName), this.cfCallbackName, this.referrerPolicy).then(result => {
            if (result && result.assets) {
              this.dataJSON = result;
              this.buildOptions();
              resolve({
                'dataOptions': this.sirvOptions
              });
            } else {
              let contentType = globalVariables.SLIDE.TYPES.IMAGE;

              if (result.layers) {
                contentType = globalVariables.SLIDE.TYPES.SPIN;
              }

              resolve({
                'content': contentType,
                'dataOptions': this.sirvOptions
              });
            }
          }).catch(error => {
            error = this.configURL;
            reject({
              'error': this.configURL,
              'dataOptions': this.sirvOptions
            });
          });
        } else {
          resolve({
            'dataOptions': this.sirvOptions
          });
        }
      });
    }

    buildViewer() {
      return new Promise((resolve, reject) => {
        if (this.dataJSON) {
          const parsedURL = /(^https?:\/\/[^/]*)([^#?]*)\/.*$/.exec(this.configURL);
          const pathname = this.dataJSON.dirname || parsedURL[2];
          this.prepareListComponents(this.dataJSON.assets, parsedURL[1], pathname);
          this.generateComponents();
          this.addAllComponents();
        }

        resolve({
          'mainNode': this.mainNode
        });
      });
    }

    prepareListComponents(listComponents, origin, folderPath) {
      listComponents.forEach(component => {
        let path;
        const is3rd = /^(https?:)?\/\/[^/]/.test(component.name);

        if (is3rd) {
          path = component.name;
        } else if (/^\//.test(component.name)) {
          path = origin + component.name;
        } else {
          path = origin + folderPath + '/' + component.name;
        }

        this.componentsList.push({
          'path': is3rd ? path : globalFunctions.normalizeURL(path),
          'type': globalVariables.SLIDE.NAMES.indexOf(component.type),
          'is3rd': is3rd
        });
      });
    }

    checkNode() {
      let result = false;
      const template = /([^#?]+)\/?([^#?]+\.view)(\?([^#]*))?(#(.*))?$/;

      if (this.mainNode) {
        this.attrbMainNode = this.mainNode.attr('data-src');

        if (this.attrbMainNode && template.test(this.attrbMainNode)) {
          result = true;
        }
      }

      return result;
    }

    buildOptions() {
      this.sirvOptions.common = helper.deepExtend(this.sirvOptions.common, this.dataJSON.settings || {});
      this.sirvOptions.mobile = helper.deepExtend(this.sirvOptions.mobile, this.dataJSON.settings || {});
    }

    buildCallBackName() {
      this.configURL = globalFunctions.normalizeURL(this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
      this.urlParams = this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$2');

      if (this.urlParams) {
        this.configURL += '?' + this.urlParams;
      }

      this.configHash = $J.getHashCode(this.configURL.replace(/^http(s)?:\/\//, ''));
      this.cfCallbackName = 'view-' + SLIDER_BUILDER_CONF_VER + '_' + this.configHash;
    }

    generateComponents() {
      this.componentsList.forEach(item => {
        let node = $J.$new('div');

        if (item.type === globalVariables.SLIDE.TYPES.IMAGE) {
          if (item.is3rd) {
            node = $J.$new('img');
            node.attr('data-type', 'static');
          } else {
            node.attr('data-type', 'zoom');
          }
        }

        let path = item.path;

        if (this.urlParams) {
          path += '?' + this.urlParams;
        }

        node.attr('data-src', path);
        this.nodes.push(node);
      });
    }

    addAllComponents() {
      this.mainNode.node.innerHTML = '';
      this.nodes.forEach(item => {
        this.mainNode.node.appendChild(item.node);
      });
    }

    destroy() {
      this.mainNode = null;
      this.sirvOptions = null;
      this.nodes = [];
      this.configURL = null;
      this.dataJSON = null;
      this.configHash = null;
      this.cfCallbackName = null;
      this.componentsList = [];
    }

  }

  return SliderBuilder;
});
Sirv.define('getDPPX', ['bHelpers', 'magicJS', 'helper', 'ResponsiveImage'], (bHelpers, magicJS, helper, ResponsiveImage) => {
  const $J = magicJS;
  const $ = $J.$;
  /* eslint-env es6 */

  /* global ResponsiveImage, helper */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "getDPPX" }] */

  const getDPPX = (currentWidth, currentHeight, originWidth, originHeight, round, upscale) => {
    let result = 1;

    if ($J.DPPX > 1) {
      if (currentHeight > currentWidth) {
        const height = round ? ResponsiveImage.roundImageSize({
          height: currentHeight
        }).height : currentHeight;
        result = helper.getDPPX(height, originHeight, upscale);
      } else {
        const width = round ? ResponsiveImage.roundImageSize({
          width: currentWidth
        }).width : currentWidth;
        result = helper.getDPPX(width, originWidth, upscale);
      }
    }

    return result;
  };

  return getDPPX;
});
Sirv.define('ViewerImage', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'ResponsiveImage', 'HotspotInstance', 'Hotspots', 'getDPPX'], (bHelpers, magicJS, globalVariables, globalFunctions, helper, ResponsiveImage, HotspotInstance, Hotspots, getDPPX) => {
  const $J = magicJS;
  const $ = $J.$;
  /* global $, $J */

  /* global helper */

  /* global HotspotInstance */

  /* global globalVariables */

  /* global ResponsiveImage */

  /* global Hotspots */

  /* global getDPPX */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint-env es6 */

  const BRAND_LANDING = 'https://sirv.com/about-image/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(image)&utm_campaign=branding'; // eslint-disable-next-line no-unused-vars

  class ViewerImage extends HotspotInstance {
    constructor(node, options) {
      super(node, options, {});
      this.type = globalVariables.SLIDE.TYPES.IMAGE;
      this.instanceNode.attr('referrerpolicy', this.referrerPolicy);
      this.image = null;
      this.isInfoLoaded = false;
      this.getImageInfoPromise = null;
      this.loadStaticImagePromise = null;
      this.imageShowPromise = null;
      this.srcWasSetted = false;
      this.lastImageSize = {
        width: 0,
        height: 0
      };
      this.imageIndex = options.imageIndex;
      this.dppx = 1;
      this.upscale = false;
      this.size = {
        width: 0,
        height: 0
      };
      this.dontLoad = true;
      this.accountInfo = {};
      this.countOfTries = 1;
      this.isFullscreen = options.isFullscreen;
      this.nativeFullscreen = options.nativeFullscreen;
      this.infoAlt = null;
      this.originAlt = this.instanceNode.attr('alt');
      this.originTitle = this.instanceNode.attr('title');
      this.src = this.instanceNode.attr('src');
      this.srcset = this.instanceNode.attr('srcset');
      this.startedSrc = this.src;
      this.dataSrc = this.instanceNode.attr('data-src');
      this.isStaticImage = this.src && !this.dataSrc;
      this.imageUrl = this.dataSrc || this.src;
      this.getImageTimer = helper.debounce(() => {
        this.getImage();
      }, 32);
      this.firstSlideAhead = false; // Image URL

      this.src = globalFunctions.normalizeURL(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
      this.queryParamsQuality = null;
      this.queryParams = helper.paramsFromQueryString(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2')); // Image default params

      this.getQueryParams();
      this.isNotSirv = false;

      if (helper.isSVG(this.imageUrl)) {
        this.isNotSirv = true;
      } // in order to not search it in different classes
      // this.api = Object.assign(this.api, {
      //     isReady: this.isReady.bind(this), // parent class
      //     resize: this.resize.bind(this), // parent class
      //     getOptions: this.getOptions.bind(this) // parent class
      //     hotspots: {} // parent class, hotspots api
      // });


      this.createHotspotsClass(Hotspots);
      this.createSirvImage();
    }

    sendEvent(typeOfEvent, data) {
      if (!data) {
        data = {};
      }

      data.imageIndex = this.imageIndex;
      super.sendEvent(typeOfEvent, data);
    }

    getInfo() {
      if (!this.gettingInfoPromise) {
        this.gettingInfoPromise = new Promise((resolve, reject) => {
          this.waitGettingInfo.wait(() => {
            this.image.loadInfo().then(info => {
              if (!this.destroyed) {
                this.isInfoLoaded = true;
                this.infoAlt = this.image.description;
                this.infoSize = this.image.originSize;
                this.accountInfo = this.image.accountInfo;
                this.hotspotsData = info.hotspots;

                if (this.hotspots) {
                  this.hotspots.originImageSize = this.infoSize;
                }

                resolve();
              }
            }).catch(err => {
              if (!this.destroyed) {
                this.isInfoLoaded = true;

                if (!err.status || err.status !== 404) {
                  this.isNotSirv = true;
                }

                reject(err);
              }
            });
          });
        });
      }

      return this.gettingInfoPromise;
    }

    getQueryParams() {
      if (this.imageUrl) {
        if (this.queryParams) {
          const q = parseInt(this.queryParams.quality, 10);

          if (isNaN(q)) {
            delete this.queryParams.quality;
          } else {
            this.queryParams.quality = q;
          }
        }

        this.queryParamsQuality = this.queryParams.quality || null;
      }
    }

    getImageCreateSettings() {
      let setts = {
        src: {},
        srcset: {}
      };

      if (this.quality !== null && this.queryParamsQuality === null) {
        setts.src.quality = this.quality;
      }

      const hdQuality = this.hdQuality;

      if (this.queryParamsQuality === null || this.isHDQualitySet && hdQuality < this.queryParamsQuality) {
        setts.srcset = {
          quality: hdQuality
        };
      }

      setts.width = this.size.width;

      if (this.size.height) {
        setts.height = this.size.height;
      }

      setts = helper.imageLib.checkMaxSize(setts, this.infoSize);

      if (this.infoSize.width === setts.width || this.infoSize.height === setts.height) {
        setts.round = false;
      }

      if ($J.DPPX > 1) {
        setts.dppx = this.dppx;
      }

      return setts;
    }

    setHDQuality(opt) {
      if (opt.dppx > 1 && opt.dppx < 1.5) {
        if (this.queryParamsQuality === null && this.quality !== null) {
          opt.srcset.quality = this.quality;
        } else if (opt.srcset) {
          delete opt.srcset.quality;
        }
      }

      return opt;
    }

    replaceSrc() {
      let img;

      if (this.isNotSirv) {
        if (this.srcWasSetted) {
          return;
        }

        this.srcWasSetted = true;
        img = {
          src: this.imageUrl
        };
      } else {
        let opt = this.getImageCreateSettings();

        if (opt.dppx > 1 && opt.dppx < 1.5) {
          delete opt.srcset.quality;
        }

        opt = this.setHDQuality(opt);
        img = this.image.getImage(opt);
        this.lastImageSize.width = img.width || img.serverWidth;
        this.lastImageSize.height = img.height || img.serverHeight;
      }

      this.instanceNode.attr('src', img.src);

      if (img.srcset) {
        if (!this.isNotSirv && this.dppx > 1) {
          this.instanceNode.attr('srcset', img.srcset + ' ' + this.dppx + 'x');
        }
      } else {
        this.instanceNode.removeAttr('srcset');
      }
    }

    showImage() {
      if (!this.imageShowPromise) {
        // eslint-disable-next-line
        this.imageShowPromise = new Promise((resolve, reject) => {
          if (this.isStaticImage) {
            this.instanceNode.setCssProp('opacity', '');
            resolve();
          } else if (this.isInView && this.isSlideShown) {
            this.instanceNode.addEvent('transitionend', e => {
              if (e.propertyName === 'opacity') {
                e.stop();
                this.instanceNode.removeEvent('transitionend');
                this.instanceNode.setCss({
                  opacity: '',
                  transition: ''
                });
                resolve();
              }
            });
            this.instanceNode.render();
            this.instanceNode.setCss({
              opacity: 1,
              transition: 'opacity 0.3s linear'
            });
          } else {
            this.instanceNode.setCssProp('opacity', '');
            resolve();
          }
        });
      }

      return this.imageShowPromise;
    }

    createSirvImage() {
      if (!this.imageUrl || this.isNotSirv) {
        return;
      }

      this.on('imageOnload', e => {
        e.stopAll();
        this.replaceSrc();

        if (!this.ready) {
          if (e.data.node) {
            this.showImage().finally(() => {
              this.done();
            });
          } else {
            helper.loadImage(this.instanceNode).finally(() => {
              this.showImage().finally(() => {
                this.done();
                this.sendContentLoadedEvent();
              });
            });
          }
        }
      });
      this.on('imageOnerror', e => {
        e.stopAll();
        console.log('image error');
      });
      this.image = new ResponsiveImage(this.imageUrl, {
        imageSettings: this.queryParams,
        round: true,
        dontLoad: this.dontLoad,
        referrerPolicy: this.referrerPolicy
      });
      this.image.parentClass = this;
      this.getInfo();
    }

    getInfoSize() {
      if (!this.getImageInfoPromise) {
        this.getImageInfoPromise = new Promise((resolve, reject) => {
          if (this.image) {
            this.getInfo().then(() => {
              resolve({
                size: this.infoSize,
                imageIndex: this.imageIndex
              });
            }).catch(err => {
              reject({
                error: err,
                isPlaceholder: err._isplaceholder,
                imageIndex: this.imageIndex
              });
            });
          } else {
            reject({
              error: 'nonsirv',
              isPlaceholder: false,
              imageIndex: this.imageIndex
            });
          }
        });
      }

      return this.getImageInfoPromise;
    }

    startFullInit(options) {
      if (this.isStartedFullInit) {
        return;
      }

      super.startFullInit(options);
      this.getId('responsive-image-'); // TODO check css

      if (!this.isStaticImage) {
        this.instanceNode.setCssProp('opacity', 0);
      }
    }

    run(isShown, preload, firstSlideAhead, loadContent) {
      this.firstSlideAhead = firstSlideAhead;
      let result = super.run(isShown, preload, firstSlideAhead);

      if (result) {
        if (this.destroyed) {
          result = false;
        } else {
          // Remove ALT to properly calculate image size.
          // Safari and Edge/IE return image size with a height if ALT text is present.
          this.instanceNode.removeAttr('alt'); // Remove TITLE to properly calculate image size.
          // The latest version(s) of Chrome returns image size with a height if TITLE is set.

          this.instanceNode.removeAttr('title'); // This force browsers to re-layout image and recalculate its dimensions.

          this.instanceNode.setCss({
            display: 'inline-flex'
          }).render();
          this.instanceNode.setCss({
            display: ''
          }).render();
          let size = null;
          helper.imageLib.getSize(this.instanceNode.node.parentNode).then(dataSize => {
            size = dataSize;
          }).finally(() => {
            if (!this.destroyed) {
              // sometimes when we have very slow internet connection and the image is first slide and thumbnails have left position we get wrong height
              if (size.width && size.height <= 20) {
                size.height = 0;
              } // size = helper.fixSize(this.instanceNode, size);


              this.size = helper.imageLib.calcProportionSize(size, this.infoSize);

              if (this.originAlt || this.infoAlt) {
                // Restore ALT text
                $(this.instanceNode).attr('alt', this.originAlt || this.infoAlt);
              }

              if (this.originTitle) {
                // Restore TITLE text
                $(this.instanceNode).attr('title', this.originTitle);
              }

              if (this.isStaticImage) {
                this.loadStaticImage().finally(() => {
                  if (this.isInfoLoaded) {
                    this.done();
                  }
                });
              } else {
                if (this.originAlt) {
                  // Restore ALT text
                  $(this.instanceNode).attr('alt', this.originAlt);
                }

                if (this.isInView && (this.isSlideShown || this.preload || loadContent)) {
                  this.getImage();
                }
              }

              if (this.dataAlt) {
                $(this.instanceNode).attr('alt', this.dataAlt);
              }
            }
          });
          this.startGettingInfo();
        }
      }

      return result;
    }

    loadContent() {
      this.getImage(true);
    }

    loadStaticImage() {
      if (!this.loadStaticImagePromise) {
        this.loadStaticImagePromise = new Promise((resolve, reject) => {
          if (this.isStaticImage) {
            if (this.instanceNode.node.complete) {
              resolve();
            } else {
              // eslint-disable-next-line
              this.instanceNode.addEvent('load', e => {
                this.sendContentLoadedEvent();
                resolve();
              }); // eslint-disable-next-line

              this.instanceNode.addEvent('error', e => {
                reject();
              });
            }
          } else {
            resolve();
          }
        });
      }

      return this.loadStaticImagePromise;
    }

    getImage(loadContent) {
      if (this.isStaticImage) {
        return;
      }

      if (!this.isNotSirv && !this.ready && !this.size.width && !this.size.height) {
        // fix for if the viewer was with display none
        if (this.countOfTries < 100) {
          setTimeout(() => {
            this.countOfTries += 1;
            this.isStarted = false;
            this.run(this.isSlideShown, this.preload, this.firstSlideAhead, loadContent);
          }, 16 * this.countOfTries);
        }

        return;
      }

      this.waitToStart.start();

      if (this.isNotSirv) {
        this.replaceSrc();
      } else {
        this.getSirvImg();
      }
    }

    get imageClassContainer() {
      return this.image;
    }

    getSirvImg() {
      let setts = this.getImageCreateSettings();

      if ($J.DPPX > 1) {
        const originSize = this.image.originSize;
        this.dppx = getDPPX(setts.width, setts.height, originSize.width, originSize.height, !$J.defined(setts.round) || setts.round, this.upscale);
        setts.dppx = this.dppx;
      }

      setts = this.setHDQuality(setts);

      if (this.checkImage(setts, this.dontLoad)) {
        this.replaceSrc();
      } else {
        this.image.getImage(setts);
      }
    }

    get originImageUrl() {
      return this.src;
    }

    done() {
      if (!this.ready) {
        if (this.accountInfo.branded) {
          let n = this.instanceNode;

          if (n.tagName === 'img') {
            n = n.node.parentNode;
          }

          const nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
          globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, n, BRAND_LANDING, 'Image viewer by Sirv');
        }

        super.done();

        if (this.hotspots) {
          this.hotspots.containerSize = this.instanceNode.node.getBoundingClientRect();
        }

        if (!this.isFullscreenEnabled) {
          this.pinchCloud.removeEvent();
          this.pinchCloud = null;
        }
      }
    }

    getSelectorImgUrl(data) {
      return new Promise((resolve, reject) => {
        const defOpt = this.getImageCreateSettings();

        if (defOpt.src) {
          data.src = defOpt.src;
        }

        data.srcset = defOpt.srcset;

        if (this.isInfoLoaded) {
          this.waitToStart.wait(() => {
            resolve(Object.assign(this.image.getThumbnail(data), {
              imageIndex: this.imageIndex,
              alt: this.dataAlt || this.originAlt || this.infoAlt,
              'referrerpolicy': this.instanceNode.attr('referrerpolicy')
            }));
          });
        } else {
          this.getInfo().then(() => {
            this.waitToStart.wait(() => {
              resolve(Object.assign(this.image.getThumbnail(data), {
                imageIndex: this.imageIndex,
                alt: this.dataAlt || this.originAlt || this.infoAlt,
                referrerpolicy: this.instanceNode.attr('referrerpolicy')
              }));
            });
          }).catch(reject);
        }
      });
    }

    getThumbnailData(opt) {
      return this.image.getThumbnail(opt);
    }

    createPinchEvent() {
      // difference between scale
      const FS_OUT = 0.2;
      const FS_IN = 2;
      super.createPinchEvent(this.instanceNode);

      this.pinchCloud.onPinchStart = e => {
        if ([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING].includes(this.fullscreenState)) {
          return;
        }

        this.pinchCloud.pinch = true;
        this.pinchCloud.scale = e.scale;
        this.sendEvent('pinchStart');
      };

      this.pinchCloud.onPinchMove = e => {
        if (this.pinchCloud.pinch && !this.pinchCloud.block) {
          if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
            if (e.scale < FS_OUT) {
              this.pinchCloud.block = true;
              this.sendEvent('fullscreenOut');
            }
          } else if (e.scale >= FS_IN) {
            this.pinchCloud.block = true;
            this.sendEvent('fullscreenIn');
          }
        }
      };
    }

    onStartActions() {
      if (!this.ready) {
        if (this.isInView && this.isStarted) {
          if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
            this.onResize();
          }

          if (this.always) {
            /*
                it can happen when fullscreen always is true and we came to this slide by thumbnail
                we need timer to clear it in 'onBeforeFullscreenIn' handler and don't if we are in standard mode
            */
            this.getImageTimer();
          } else {
            this.getImage();
          }
        }
      }

      super.onStartActions();
    }

    onStopActions() {
      super.onStopActions();
    }

    onInView(value) {
      if (value && !this.isStaticImage) {
        if (!this.ready && !this.isInView) {
          if (this.isStarted) {
            this.isInView = true;

            if (this.isInfoLoaded && (this.preload || this.isSlideShown)) {
              this.getImage();
            }
          }
        }
      }
    } // eslint-disable-next-line no-unused-vars


    onBeforeFullscreenIn(data) {
      this.getImageTimer.cancel();

      if (this.ready && !this.isStaticImage) {
        this.instanceNode.setCssProp('visibility', 'hidden');
      }

      super.onBeforeFullscreenIn(data);

      if (this.hotspots) {
        this.hotspots.disableAll();
      }
    } // eslint-disable-next-line no-unused-vars, class-methods-use-this


    onAfterFullscreenIn(data) {
      // if we use it, we do not have pinchend event and touchdrag after that
      // if (this.pinchCloud) {
      //     this.pinchCloud.removeEvent();
      //     this.pinchCloud.addEvent();
      // }
      if (this.always && !this.ready && this.isInView && this.isStarted) {
        this.onResize();
        this.getImage();
      }

      if (this.hotspots) {
        setTimeout(() => {
          // we have to wait a little bit for 'onResize' function
          if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
            // if we will exit from fullscreen before the timeout end
            this.hotspots.enableAll();

            if (this.isInView && this.isSlideShown) {
              this.hotspots.showNeededElements();
            }
          }
        }, 100);
      }
    } // eslint-disable-next-line no-unused-vars


    onBeforeFullscreenOut(data) {
      this.instanceNode.setCss({
        width: '',
        height: '',
        visibility: ''
      });
      super.onBeforeFullscreenOut(data);
    } // eslint-disable-next-line no-unused-vars, class-methods-use-this


    onAfterFullscreenOut(data) {
      // if we use it, we do not have pinchend event and touchdrag after that
      // if (this.pinchCloud) {
      //     this.pinchCloud.removeEvent();
      //     this.pinchCloud.addEvent();
      // }
      super.onAfterFullscreenOut(data);
    }

    onResize() {
      if (!this.isStarted || this.isStaticImage || this.isNotSirv) {
        return false;
      }

      if (this.isFullscreenActionEnded()) {
        let size = $(this.instanceNode.node.parentNode).size;
        size = helper.imageLib.calcProportionSize(size, this.infoSize);

        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
          this.instanceNode.setCss({
            width: size.width + 'px',
            height: size.height + 'px'
          });
          this.instanceNode.setCssProp('visibility', '');
        }

        this.size.width = size.width;

        if (this.size.height) {
          this.size.height = size.height;
        }

        if (this.ready) {
          const upscale = 50;

          if (this.size.width - this.lastImageSize.width > upscale || this.size.height - this.lastImageSize.height > upscale) {
            this.getImage();
          }

          if (this.hotspots) {
            this.hotspots.containerSize = this.instanceNode.node.getBoundingClientRect();

            if (this.isInView && this.isSlideShown) {
              this.hotspots.showNeededElements();
            }
          }
        }

        return true;
      }

      return false;
    }

    destroy() {
      if (this.image) {
        this.off('imageOnload');
        this.off('imageOnerror');
        this.image.destroy();
        this.image = null;
      }

      this.getImageTimer.cancel();
      this.getImageTimer = null;
      this.instanceNode.setCssProp('opacity', '');

      if (this.hotspot) {
        $(this.instanceNode.node.parentNode).removeEvent('tap');
      }

      if (this.instanceNode.node.hasAttribute('src')) {
        try {
          this.instanceNode.removeAttr('src');

          if (this.isStaticImage) {
            this.instanceNode.attr('src', this.imageUrl);
          }
        } catch (e) {// empty
        }
      }

      if (!this.isStaticImage) {
        this.instanceNode.removeAttr('src');
      } else {
        this.instanceNode.attr('src', this.src);
      }

      if (this.srcset) {
        this.instanceNode.attr('srcset', this.srcset);
      } else {
        try {
          this.instanceNode.removeAttr('srcset');
        } catch (e) {// empty
        }
      }

      this.srcset = null;

      if (!this.originAlt && (this.infoAlt || this.dataAlt)) {
        this.instanceNode.removeAttr('alt');
      }

      this.instanceNode.removeEvent('load');
      this.hotspotsData = null;
      super.destroy();
      return true;
    }

  }

  return ViewerImage;
});
Sirv.define('defaultsVideoOptions',
/* eslint-env es6 */
{
  autoplay: {
    type: 'boolean',
    defaults: false
  },
  // sirvvideo, video, youtube, vimeo
  loop: {
    type: 'boolean',
    defaults: false
  },
  // sirvvideo, video, youtube, vimeo
  volume: {
    type: 'number',
    minimum: 0,
    maximum: 100,
    defaults: 100
  },
  // sirvvideo, video, youtube
  // youtube does not have preload option
  // https://developers.google.com/youtube/iframe_api_reference
  // vimeo does not have preload option
  // https://developer.vimeo.com/player/sdk/embed
  preload: {
    type: 'boolean',
    defaults: true
  },
  // sirvvideo, video
  thumbnail: {
    oneOf: [{
      type: 'url'
    }, {
      type: 'boolean',
      'enum': [false]
    }, {
      type: 'number',
      minimum: 0
    }],
    defaults: false
  },
  // 1 = little motion
  // 2 = moderate motion
  // 3 = more motion
  // 4 = high motion
  motionFactor: {
    type: 'number',
    minimum: 1,
    maximum: 4,
    defaults: 3
  },
  dynamicAdaptiveStreaming: {
    type: 'boolean',
    defaults: true
  },
  // just for videojs
  quality: {
    // quality.min
    min: {
      type: 'number',
      'enum': [360, 480, 720, 1080],
      defaults: 360
    },
    // quality.max
    max: {
      type: 'number',
      'enum': [360, 480, 720, 1080],
      defaults: 1080
    }
  },
  controls: {
    enable: {
      type: 'boolean',
      defaults: true
    },
    // sirvvideo, video, youtube
    // Volume control
    volume: {
      type: 'boolean',
      defaults: true
    },
    // sirvvideo
    // Playback rate control
    speed: {
      type: 'boolean',
      defaults: false
    },
    // sirvvideo
    // Quality (resolutions) control
    quality: {
      type: 'boolean',
      defaults: false
    },
    // sirvvideo
    // controls.fullscreen. hidden option
    fullscreen: {
      type: 'boolean',
      defaults: true
    } // sirvvideo

  }
});