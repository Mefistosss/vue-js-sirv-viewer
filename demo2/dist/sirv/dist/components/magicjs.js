Sirv.define('magicJS', ['bHelpers'], function (bHelpers) {
  var moduleName = 'magicJS';
  /**
  * @version ${MagicJS_version}
  * @package MagicJS
  * @access public
  *
  * @copyright   ${build_year} MagicToolbox.com, To use this code on your own site, visit http://www.magictoolbox.com
  * @license     http://www.magictoolbox.com/license/
  * @author      MagicToolbox.com <support@magictoolbox.com>
  *
  */
  // var magicJS;
  // var $J;
  // magicJS = $J = (function() {
  //     var WIN = window;
  //     var UND = WIN.undefined;
  //     var DOC = document;

  var magicJS;
  var $J;

  magicJS = $J = function () {
    var WIN = window;
    var UND = WIN.undefined;
    var DOC = document;
    /* eslint-env es6 */

    /* global UND, WIN, DOC, Doc */

    /* eslint-disable no-use-before-define */

    /* eslint no-return-assign: "error" */

    /* eslint no-extra-boolean-cast: "off" */

    /* eslint no-continue: "off" */

    /* eslint no-restricted-syntax: ["error", "WithStatement", "BinaryExpression[operator='in']"] */

    /* eslint-disable dot-notation */

    /* eslint-disable eqeqeq */

    var STORAGE = new WeakMap();
    /*
     * Script: base.js
     * Contains core methods.
     */

    /**
     * Contains core methods.
     * @class
     * @static
     */

    var magicJS =
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
      $uuid: function (o) {
        return o.$J_UUID || (o.$J_UUID = ++$J.UUID);
      },

      /**
       * Retreive storage of an object by uuid
       */
      getStorage: function (uuid) {
        return $J.storage[uuid] || ($J.storage[uuid] = {});
      },

      /**
       * Empty function that returns false
       */
      $false: function () {
        return false;
      },

      /**
       * Empty function that returns true
       */
      $true: function () {
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
      defined: function (o) {
        return o != UND;
      },

      /**
       * Check if the object defined and return itself of default value
       *
       * @param {Object}   object to check
       * @param {Mixed}    default value
       *
       * @returns {Mixed} - Returns object if it is defined, otherwise default value
       */
      // ifndef: (o, defaultValue) => {
      //     return (o !== UND) ? o : defaultValue;
      // },
      // exists: (o) => {
      //     return !!(o);
      // },

      /**
       * Checks for element within array
       *
       * @param   {Array} source      Source
       * @param   {Mixed} needle      Element that is checked
       * @param   {Integer} [from=0]      The start index to search
       *
       * @returns {Boolean}   true if element found, otherwise false
       */
      contains: function (source, needle, from) {
        return source.indexOf(needle, from) !== -1;
      },

      /**
       * Get type of the object
       *
       * @param {Object}  object to check
       *
       * @returns {String}    - object type
       */
      typeOf: function (o) {
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

      /**
       * Extend objects
       *
       * @param {mixed}   objects to extend
       * @param {Hash}    properties
       *
       * @returns first extended object
       * @type   {Object}
       */
      extend: function (o, p) {
        if (!(o instanceof WIN.Array)) {
          o = [o];
        }

        if (!p) {
          return o[0];
        }

        for (var i = 0, l = o.length; i < l; i++) {
          if (!$J.defined(o)) {
            continue;
          } // for ( const k in (p || {}) ) {


          for (var k in p) {
            if (!Object.prototype.hasOwnProperty.call(p, k)) {
              continue;
            }

            try {
              o[i][k] = p[k];
            } catch (x) {// empty
            }
          }
        }

        return o[0];
      },

      /**
       * Extend an objects' prototype
       *
       * @param {mixed} object to extend
       * @param {Hash}  properties
       *
       * @returns first extended object
       * @type   {Object}
       */
      implement: function (o, p) {
        if (!(o instanceof WIN.Array)) {
          o = [o];
        }

        for (var i = 0, l = o.length; i < l; i++) {
          if (!$J.defined(o[i])) {
            continue;
          }

          if (!o[i].prototype) {
            continue;
          }

          for (var k in p || {}) {
            if (!o[i].prototype[k]) {
              o[i].prototype[k] = p[k];
            }
          }
        }

        return o[0];
      },

      /**
       * Extend a native Javascript object (e.g. Array)
       *
       * @param {Object}   object to extend
       * @param {Hash}     properties
       */
      nativize: function (o, p) {
        if (!$J.defined(o)) {
          return o;
        }

        for (var k in p || {}) {
          if (!o[k]) {
            o[k] = p[k];
          }
        }

        return o;
      },

      /**
       * Run first succeeded functions
       *
       * @param {Function}     function to be executed
       *
       * @returns {Mixed}     - result of function call or null
       */
      $try: function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        for (var i = 0, l = args.length; i < l; i++) {
          try {
            return args[i]();
          } catch (e) {// empty
          }
        }

        return null;
      },

      /**
       * Convert iterable object to an array
       *
       * @param {Mixed}    iterable object
       *
       * @returns {Array} - result array
       */
      $A: function (o) {
        if (!$J.defined(o)) {
          return $J.$([]);
        }

        if (o.toArray) {
          return $J.$(o.toArray());
        }

        if (o.item) {
          var l = o.length || 0;
          var a = new Array(l);

          while (l--) {
            a[l] = o[l];
          }

          return $J.$(a);
        }

        return $J.$(Array.prototype.slice.call(o));
      },

      /**
       * Get current time in milliseconds
       *
       * @returns {Number}    - number of milliseconds since 1 January 1970 00:00:00
       */
      now: function () {
        return new Date().getTime();
      },
      detach: function (o) {
        var r;

        switch ($J.typeOf(o)) {
          case 'object':
            r = {};

            for (var p in o) {
              if (Object.prototype.hasOwnProperty.call(o, p)) {
                r[p] = $J.detach(o[p]);
              }
            }

            break;

          case 'array':
            r = [];

            for (var i = 0, l = o.length; i < l; i++) {
              r[i] = $J.detach(o[i]);
            }

            break;

          default:
            return o;
        }

        return $J.$(r);
      },
      $: function (o) {
        var result = o;

        switch ($J.typeOf(o)) {
          case 'string':
            {
              var el = DOC.getElementById(o);

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
      $new: function (tag, props, css) {
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
      addCSS: function (selector, css, id, root) {
        var style;
        var sheet;
        var idx = -1;
        var rules = [];
        var rootNode = DOC.head || DOC.body;

        if (root) {
          rootNode = $(root).node || root;
        }

        if (!id) {
          id = $J.stylesId;
        }

        style = $(rootNode.querySelector('#' + id));

        if (!style) {
          style = $J.$new('style', {
            id: id,
            type: 'text/css'
          });
          rootNode.insertBefore(style.node, rootNode.firstChild);
        } // sheet = style.sheet;


        sheet = style.node.sheet;

        if (!sheet) {
          // sheet = style.styleSheet;
          sheet = style.node.styleSheet;
        }

        if ($J.typeOf(css) !== 'string') {
          for (var p in css) {
            if (Object.prototype.hasOwnProperty.call(css, p)) {
              rules.push(p + ':' + css[p]);
            }
          }

          css = rules.join(';');
        }

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
      removeCSS: function (id, index) {
        var style = $J.$(id);

        if ($J.typeOf(style) !== 'element') {
          return;
        }

        var sheet = style.sheet || style.styleSheet;

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
      generateUUID: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0;
          var v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        }).toUpperCase();
      },

      /**
       * Retrieve absolute URL of a given link
       * @param {String} url link
       * @return {String}
       */
      getAbsoluteURL: function () {
        var a;
        return function (url) {
          if (!a) a = DOC.createElement('a');
          a.setAttribute('href', url);
          return ('!!' + a.href).replace('!!', '');
        };
      }(),

      /**
       * String hash function similar to java.lang.String.hashCode().
       *
       * @param {String} s A string.
       * @return {Number} Hash value for {@code s}, between 0 (inclusive) and 2^32
       *  (exclusive). The empty string returns 0.
       */
      getHashCode: function (s) {
        var r = 0;
        var l = s.length;

        for (var i = 0; i < l; ++i) {
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
      camelize: function (str) {
        return str.replace(/-\D/g, function (m) {
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
        return str.replace(/[A-Z]/g, function (m) {
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
      stringHas: function (source, str, sep) {
        sep = sep || '';
        return (sep + source + sep).indexOf(sep + str + sep) > -1;
      }
    };
    var $J = magicJS;
    var $j = magicJS.$; //eslint-disable-line no-unused-vars

    var $ = $J.$;
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
      *         Presto:
      *             2.0 - Opera 9
      *             2.1 - Opera 9.5
      *             2.1 - Opera 9.6
      *             2.2 - Opera 10.00-10.10
      *             2.5 - Opera 10.50
      *             2.6 - Opera 10.6
      *             2.7 - Opera 11
      *
      *         Trident:
      *             7 - IE 11
      *             6 - IE 10
      *             5 - IE 9
      *             4 - IE 8
      *             3 - IE 7
      *             2 - IE 6
      */
    // Normalized event names

    var EVENTS_MAP = {}; // Shortcut for userAgent

    var _UA = navigator.userAgent.toLowerCase();

    var _engine = _UA.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);

    var _version = _UA.match(/(edge|opr)\/(\d+\.?\d*)/i) || _UA.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);

    var _safariVer = _UA.match(/version\/(\d+\.?\d*)/i); // Shortcut for document style property for further references


    var docStyles = DOC.documentElement.style;

    var isSupported = function (p) {
      var pp = p.charAt(0).toUpperCase() + p.slice(1);
      return p in docStyles || 'Webkit' + pp in docStyles || 'Moz' + pp in docStyles || 'ms' + pp in docStyles || 'O' + pp in docStyles;
    };
    /** @lends browser# */

    /**
        * @constructs
        * @class Contains information about the client browser
    */


    $J.browser = {
      /**
      * Browser supported features
      */
      features: {
        xpath: !!DOC.evaluate,
        air: !!WIN.runtime,
        query: !!DOC.querySelector,
        fullScreen: !!(DOC.fullscreenEnabled || DOC.msFullscreenEnabled || DOC.exitFullscreen || DOC.cancelFullScreen || DOC.webkitexitFullscreen || DOC.webkitCancelFullScreen || DOC.mozCancelFullScreen || DOC.oCancelFullScreen || DOC.msCancelFullScreen),
        xhr2: !!WIN.ProgressEvent && !!WIN.FormData && WIN.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest(),
        transition: isSupported('transition'),
        transform: isSupported('transform'),
        perspective: isSupported('perspective'),
        animation: isSupported('animation'),
        requestAnimationFrame: false,
        multibackground: false,
        cssFilters: false,
        canvas: false,
        svg: function () {
          return DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
        }()
      },

      /**
       * Touch screen support
       */
      touchScreen: function () {
        return 'ontouchstart' in WIN || WIN.DocumentTouch && DOC instanceof DocumentTouch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      }(),

      /**
       * Mobile device?
       */
      mobile: !!_UA.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),

      /**
       * Browser engine
       */
      engine: function () {
        var result = 'unknown';

        if (_engine && _engine[1]) {
          result = _engine[1].toLowerCase();
        } else if (WIN.opera) {
          result = 'presto';
        } else if (!!WIN.ActiveXObject) {
          result = 'trident';
        } else if (DOC.getBoxObjectFor !== UND || WIN.mozInnerScreenY !== null) {
          result = 'gecko';
        } else if (WIN.WebKitPoint !== null || !navigator.taintEnabled) {
          result = 'webkit';
        }

        return result;
      }(),

      /**
       * Browser engine version
       */
      version: _engine && _engine[2] ? parseFloat(_engine[2]) : 0,

      /**
       * Browser name & version
       */
      uaName: _version && _version[1] ? _version[1].toLowerCase() : '',
      uaVersion: _version && _version[2] ? parseFloat(_version[2]) : 0,
      // prefix for css properties like -webkit-box-shadow
      cssPrefix: '',
      // prefix for style properties like element.style.WebkitBoxShadow
      cssDomPrefix: '',
      // DOM prefix
      domPrefix: '',

      /**
       * IE document mode
       */
      ieMode: 0,

      /**
       * Platform
       *
       * mac      - Mac OS
       * win      - Windows
       * linux    - Linux
       * ios      - Apple iPod/iPhone/iPad
       *
       */
      platform: function () {
        var result;

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
      }(),

      /**
       * Browser box model
       *
       * Basically used to determine how IE renders in quirks mode
       */
      backCompat: DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat',

      /**
       * Width of the browser's scrollbars
       */
      scrollbarsWidth: 0,

      /**
       * Reference to the real document element
       *
       * Used to correct work with page dimension
       */
      getDoc: function () {
        return DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat' ? DOC.body : DOC.documentElement;
      },

      /**
       * Reference to the requestAnimationFrame method (if any)
       */
      requestAnimationFrame: WIN.requestAnimationFrame || WIN.mozRequestAnimationFrame || WIN.webkitRequestAnimationFrame || WIN.oRequestAnimationFrame || WIN.msRequestAnimationFrame || UND,

      /**
       * Reference to the cancelAnimationFrame method (if any)
       */
      cancelAnimationFrame: WIN.cancelAnimationFrame || WIN.mozCancelAnimationFrame || WIN.mozCancelAnimationFrame || WIN.oCancelAnimationFrame || WIN.msCancelAnimationFrame || WIN.webkitCancelRequestAnimationFrame || UND,

      /**
       * Indicates that DOM content is ready for manipulation
       *
       * @see domready
       */
      ready: false,

      /**
       * Fires when DOM content is ready for manipulation
       *
       * @see domready
       */
      onready: function () {
        if ($J.browser.ready) {
          return;
        }

        var node;
        var style;
        $J.browser.ready = true;

        try {
          // Calculate width of browser's scrollbars
          var tmp = $J.$new('div').setCss({
            width: 100,
            height: 100,
            overflow: 'scroll',
            position: 'absolute',
            top: -9999
          }).appendTo(DOC.body);
          $J.browser.scrollbarsWidth = tmp.offsetWidth - tmp.clientWidth;
          tmp.remove();
        } catch (ex) {// empty
        }

        try {
          // Test multiple background support
          node = $J.$new('div');
          style = node.style;
          style.cssText = 'background:url(https://),url(https://),red url(https://)';
          $J.browser.features.multibackground = /(url\s*\(.*?){3}/.test(style.background);
          style = null;
          node = null;
        } catch (ex) {// empty
        }

        if (!$J.browser.cssTransformProp) {
          $J.browser.cssTransformProp = $J.dashize($J.normalizeCSS('transform'));
        }

        try {
          // Test CSS filters support
          node = $J.$new('div');
          node.style.cssText = $J.dashize($J.normalizeCSS('filter')) + ':blur(2px);';
          $J.browser.features.cssFilters = !!node.style.length && (!$J.browser.ieMode || $J.browser.ieMode > 9);
          node = null;
        } catch (ex) {// empty
        }

        if (!$J.browser.features.cssFilters) {
          $J.$(DOC.documentElement).addClass('no-cssfilters-magic');
        }

        try {
          // Test Canvas support
          $J.browser.features.canvas = function () {
            var tmp = $J.$new('canvas');
            return !!(tmp.getContext && tmp.getContext('2d'));
          }();
        } catch (ex) {// empty
        }

        if (WIN.TransitionEvent === UND && WIN.WebKitTransitionEvent !== UND) {
          EVENTS_MAP['transitionend'] = 'webkitTransitionEnd';
        }

        $J.$(DOC).callEvent('domready');
      }
    };

    (function () {
      var i;
      var magicClasses = []; // Extra CSS classes applied to <html> (e.g. lt-ie9-magic, mobile-magic)

      switch ($J.browser.engine) {
        case 'trident':
          if (!$J.browser.version) {
            $J.browser.version = !!WIN.XMLHttpRequest ? 3 : 2;
          }

          break;

        case 'gecko':
          $J.browser.version = _version && _version[2] ? parseFloat(_version[2]) : 0;
          break;
        // no default
      }

      $J.browser[$J.browser.engine] = true;

      if (_version && _version[1] === 'crios') {
        $J.browser.uaName = 'chrome';
      }

      if (!!WIN.chrome) {
        $J.browser.chrome = true;
      }

      if (_version && _version[1] === 'opr') {
        $J.browser.uaName = 'opera';
        $J.browser.opera = true;
      }

      if ($J.browser.uaName === 'safari' && _safariVer && _safariVer[1]) {
        $J.browser.uaVersion = parseFloat(_safariVer[1]);
      }

      if ($J.browser.platform === 'android' && $J.browser.webkit && _safariVer && _safariVer[1]) {
        $J.browser.androidBrowser = true;
      } // browser prefixes


      var prefixes = {
        gecko: ['-moz-', 'Moz', 'moz'],
        webkit: ['-webkit-', 'Webkit', 'webkit'],
        trident: ['-ms-', 'ms', 'ms'],
        presto: ['-o-', 'O', 'o']
      }[$J.browser.engine] || ['', '', ''];
      $J.browser.cssPrefix = prefixes[0];
      $J.browser.cssDomPrefix = prefixes[1];
      $J.browser.domPrefix = prefixes[2];

      $J.browser.ieMode = function () {
        var result;

        if (!$J.browser.trident) {
          result = UND;
        } else if (DOC.documentMode) {
          result = DOC.documentMode;
        } else if ($J.browser.backCompat) {
          result = 5;
        } else {
          var v = 0;

          switch ($J.browser.version) {
            case 2:
              v = 6;
              break;

            case 3:
              v = 7;
              break;
            // no default
          }

          result = v;
        }

        return result;
      }(); // Mobile Safari engine in the “request desktop site” mode on iOS/iPadOS.
      // Since iPadOS 13, Safari's “request desktop site” setting is turned on by default for all websites


      if (!$J.browser.mobile && $J.browser.platform === 'mac' && $J.browser.touchScreen) {
        $J.browser.mobile = true;
        $J.browser.platform = 'ios';
      }

      magicClasses.push($J.browser.platform + '-magic');

      if ($J.browser.mobile) {
        magicClasses.push('mobile-magic');
      }

      if ($J.browser.androidBrowser) {
        magicClasses.push('android-browser-magic');
      }

      if ($J.browser.ieMode) {
        // Add CSS class of the IE version to <html> for possible tricks
        $J.browser.uaName = 'ie';
        $J.browser.uaVersion = $J.browser.ieMode;
        magicClasses.push('ie' + $J.browser.ieMode + '-magic');

        for (i = 11; i > $J.browser.ieMode; i--) {
          magicClasses.push('lt-ie' + i + '-magic');
        }
      }

      if ($J.browser.webkit && $J.browser.version < 536) {
        // Disable fullscreen in old Safari
        $J.browser.features.fullScreen = false;
      }

      if ($J.browser.requestAnimationFrame) {
        // Enable native requestAnimationFrame if it works (issue in Safari 6.1.x)
        $J.browser.requestAnimationFrame.call(WIN, function () {
          $J.browser.features.requestAnimationFrame = true;
        });
      }

      if ($J.browser.features.svg) {
        magicClasses.push('svg-magic');
      } else {
        magicClasses.push('no-svg-magic');
      }

      var exClasses = (DOC.documentElement.className || '').match(/\S+/g) || [];
      DOC.documentElement.className = $J.$(exClasses).concat(magicClasses).join(' ');

      try {
        DOC.documentElement.setAttribute('data-magic-ua', $J.browser.uaName);
        DOC.documentElement.setAttribute('data-magic-ua-ver', $J.browser.uaVersion);
        DOC.documentElement.setAttribute('data-magic-engine', $J.browser.engine);
        DOC.documentElement.setAttribute('data-magic-engine-ver', $J.browser.version); // DOC.documentElement.setAttribute('data-magic-features', magicClasses.join(' '));
      } catch (ex) {// empty
      }

      if ($J.browser.ieMode && $J.browser.ieMode < 9) {
        // Workaround for IE<9 to support <figure> & <figcaption> elements
        DOC.createElement('figure');
        DOC.createElement('figcaption');
      } // Map pointer events for IE 10.


      if (!WIN.navigator.pointerEnabled) {
        ['Down', 'Up', 'Move', 'Over', 'Out'].forEach(function (type) {
          // EVENTS_MAP['pointer' + type.toLowerCase()] = WIN.navigator.msPointerEnabled ? 'MSPointer' + type : -1;
          var evt = 'pointer' + type.toLowerCase();

          if ($J.browser.uaName === 'edge') {
            EVENTS_MAP[evt] = evt;
          } else if (WIN.navigator.msPointerEnabled) {
            EVENTS_MAP[evt] = 'MSPointer' + type;
          } else {
            EVENTS_MAP[evt] = -1;
          }
        });
      }
    })();

    (function () {
      var getCancel = function () {
        var result = DOC.exitFullscreen || DOC.cancelFullScreen || document[$J.browser.domPrefix + 'ExitFullscreen'] || document[$J.browser.domPrefix + 'CancelFullScreen'];

        if (!result) {
          result = function () {};
        }

        return result;
      };

      var getChangeEventName = function () {
        var result;

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

      var getErrorEventName = function () {
        var result;

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

      var callRequestFullscreen = function (el) {
        var f = el.requestFullscreen || el[$J.browser.domPrefix + 'RequestFullscreen'] || el[$J.browser.domPrefix + 'RequestFullScreen'];

        if (!f) {
          f = function () {};
        }

        f.call(el);
      };

      var fullScreen = {
        capable: $J.browser.features.fullScreen,
        enabled: function () {
          return !!(DOC.fullscreenElement || DOC[$J.browser.domPrefix + 'FullscreenElement'] || DOC.fullScreen || DOC.webkitIsFullScreen || DOC[$J.browser.domPrefix + 'FullScreen']);
        },
        request: function (el, opts) {
          if (!opts) {
            opts = {};
          }

          if (fullScreen.capable && !opts.windowFullscreen) {
            fullScreen.onchange = function (e) {
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

            fullScreen.onerror = function (e) {
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

    /* global WIN, DOC, UND, docStyles, STORAGE, EVENTS_MAP */

    /* eslint-disable quote-props */

    /* eslint no-restricted-syntax: ["error", "WithStatement"] */

    /* eslint-disable camelcase */
    // Not whitespace regexp
    // const r_nwp = /\S+/g;


    var r_cssToNum = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/; // normalize CSS names

    var cssMap = {
      'float': typeof docStyles.styleFloat === 'undefined' ? 'cssFloat' : 'styleFloat'
    }; // Unitless CSS properties (w/o 'px')

    var nopxCSS = {
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'zIndex': true,
      'zoom': true
    };
    var getCssValue;

    if (WIN.getComputedStyle) {
      getCssValue = function (e, name) {
        var css = WIN.getComputedStyle(e, null);
        return css ? css.getPropertyValue(name) || css[name] : null;
      };
    } else {
      getCssValue = function (e, name) {
        var css = e.currentStyle;
        var v = null;
        v = css ? css[name] : null;

        if (v === null && e.style && e.style[name]) {
          v = e.style[name];
        }

        return v;
      };
    } // Returns normalize CSS name (probably with a vendor prefix)


    var normalizeCSS = function (name) {
      var pName; // Webkit reports the existence of the filter property, but it can be used only with -webkit- prefix.

      var standard = $J.browser.webkit && name === 'filter' ? false : name in docStyles; // if ( !(name in docStyles) ) {

      if (!standard) {
        pName = $J.browser.cssDomPrefix + name.charAt(0).toUpperCase() + name.slice(1);

        if (pName in docStyles) {
          return pName;
        }
      }

      return name;
    };

    $J.normalizeCSS = normalizeCSS;

    var Base = /*#__PURE__*/function () {
      "use strict";

      function Base(node) {
        this.node = node;
        this.$J_UUID = ++$J.UUID;
        this.$J_TYPE = null;

        this.$J_EXT = function () {};

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


      var _proto = Base.prototype;

      _proto.fetch = function fetch(prop, def) {
        var s = $J.getStorage(this.$J_UUID);
        var p = s[prop];
        var result = null;

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
      ;

      _proto.store = function store(prop, val) {
        var s = $J.getStorage(this.$J_UUID);
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
      ;

      _proto.del = function del(prop) {
        var s = $J.getStorage(this.$J_UUID);
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
      ;

      _proto.addEvent = function addEvent(type, fn, priority, options) {
        var _this = this;

        var handlers; // let _self;

        var _type;

        if ($J.typeOf(type) === 'string') {
          _type = type.split(' ');

          if (_type.length > 1) {
            type = _type;
          }
        }

        if ($J.typeOf(type) === 'array') {
          type.forEach(function (__type) {
            // this.addEvent.call(this, __type, fn, priority, options);
            _this.addEvent(__type, fn, priority, options);
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
          fn.$J_EUID = Math.floor(Math.random() * $J.now());
        } // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});


        var events = this.fetch('_EVENTS_', {});
        handlers = events[type];

        if (!handlers) {
          // Initialize event handlers queue
          handlers = [];
          events[type] = handlers; // _self = this;

          if ($J.Events.handlers[type]) {
            $J.Events.handlers[type].add.call(this, options); // $J.Events.handlers[type].add(this, options);
          } else {
            // handlers['handle'] = function (e) {
            handlers['handle'] = function (e) {
              e = $J.extend(e || WIN.e, {
                $J_TYPE: 'event'
              }); // $J.Doc.callEvent.call(_self, type, $J.$(e));

              _this.callEvent(type, $J.$(e));
            };

            this.node[$J._event_add_]($J._event_prefix_ + type, handlers['handle'], false);
          }
        }

        var fnObj = {
          type: type,
          fn: fn,
          priority: priority,
          euid: fn.$J_EUID
        };
        handlers.push(fnObj);
        handlers.sort(function (a, b) {
          return a.priority - b.priority;
        });
        return this;
      } // removeEvent(type/*, fn */) {
      ;

      _proto.removeEvent = function removeEvent() {
        var _this2 = this;

        // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});
        var events = this.fetch('_EVENTS_', {});
        var fnObj;
        var k;

        var _type; // let del;


        var type = arguments.length <= 0 ? undefined : arguments[0]; // const fn = arguments.length > 1 ? arguments[1] : -100;

        var fn = arguments.length > 1 ? arguments.length <= 1 ? undefined : arguments[1] : -100;

        if ($J.typeOf(type) === 'string') {
          _type = type.split(' ');

          if (_type.length > 1) {
            type = _type;
          }
        }

        if ($J.typeOf(type) === 'array') {
          // $J.$(type).each(this.removeEvent.bindAsEvent(this, fn));
          type.forEach(function (__type) {
            _this2.removeEvent(__type, fn);
          });
          return this;
        } // Normalize event name


        type = EVENTS_MAP[type] || type;

        if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {
          return this;
        }

        var handlers = events[type] || [];

        for (k = 0; k < handlers.length; k++) {
          fnObj = handlers[k];

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
      };

      _proto.callEvent = function callEvent(type, e) {
        var events = this.fetch('_EVENTS_', {});
        var k; // Normalize event name

        type = EVENTS_MAP[type] || type;

        if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {// return this;
        } else {
          try {
            if (!e || !e.type) {
              e = $J.extend(e || {}, {
                type: type
              });
            }
          } catch (ev) {// empty
          }

          if (e.timeStamp === UND) {
            e.timeStamp = $J.now();
          }

          var handlers = events[type] || [];

          for (k = 0; k < handlers.length && !(e.isQueueStopped && e.isQueueStopped()); k++) {
            handlers[k].fn.call(this, e);
          }
        }
      };

      _proto.raiseEvent = function raiseEvent(type, name) {
        var _native = type !== 'domready';

        var o = this;
        var e; // Normalize event name

        type = EVENTS_MAP[type] || type;

        if (!_native) {
          this.callEvent(type);
          return this;
        }

        if (o === DOC && DOC.createEvent && !o.dispatchEvent) {
          o = DOC.documentElement;
        }

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
      };

      _proto.clearEvents = function clearEvents() {
        // const events = $J.Doc.fetch.call(this, '_EVENTS_');
        var events = this.fetch('_EVENTS_');

        if (!events) {
          return this;
        }

        for (var _type in events) {
          if (Object.prototype.hasOwnProperty.call(events, _type)) {
            // $J.Doc.removeEvent.call(this, _type);
            this.removeEvent(_type);
          }
        } // $J.Doc.del.call(this, '_EVENTS_');


        this.del('_EVENTS_');
        return this;
      };

      return Base;
    }();

    var Element = /*#__PURE__*/function (_Base) {
      "use strict";

      bHelpers.inheritsLoose(Element, _Base);

      function Element(node) {
        var _this3;

        _this3 = _Base.call(this, node) || this;
        _this3.$J_TYPE = 'magicjs-element';
        return _this3;
      } // Full screen


      var _proto2 = Element.prototype;

      _proto2.requestFullScreen = function requestFullScreen() {
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
      ;

      _proto2.addClass = function addClass(val) {
        var _this4 = this;

        val = val ? val.split(' ') : [''];
        val.forEach(function (v) {
          v = v.trim();

          if (v) {
            _this4.node.classList.add(v);
          }
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
      ;

      _proto2.removeClass = function removeClass(val) {
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
      ;

      _proto2.toggleClass = function toggleClass(val) {
        this.node.classList.toggle(val);
        return this;
      }
      /**
       * Retrieves element's css style
       *
       * @param {String}   property CSS property to retrieve
       *
       * @returns {Mixed}     Value of CSS property
       */
      ;

      _proto2.getCss = function getCss(p) {
        var cssName = $J.camelize(p);
        var v = null;

        if (!cssMap[cssName]) {
          cssMap[cssName] = normalizeCSS(cssName);
        }

        p = cssMap[cssName]; // p = cssMap[cssName] || (cssMap[cssName] = normalizeCSS(cssName));

        v = getCssValue(this.node, p);

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
      ;

      _proto2.setCssProp = function setCssProp(k, v) {
        var cssName = $J.camelize(k);

        try {
          if (!cssMap[cssName]) {
            cssMap[cssName] = normalizeCSS(cssName);
          }

          k = cssMap[cssName]; // k = cssMap[cssName] || (cssMap[cssName] = normalizeCSS(cssName));

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
      ;

      _proto2.setCss = function setCss(styles) {
        for (var s in styles) {
          if (Object.prototype.hasOwnProperty.call(styles, s)) {
            this.setCssProp(s, styles[s]);
          }
        }

        return this;
      }
      /**
       * Retrieves set of element's css style
       *
       * @param {String[]}   styles   CSS styles to retrieve
       *
       * @returns {Hash}      Set of CSS styles
       */
      ;

      _proto2.getStyles = function getStyles() {
        var _this5 = this;

        var r = {};

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        args.forEach(function (k) {
          r[k] = _this5.getCss(k);
        });
        return r;
      }
      /**
       * Applies properties to element
       *
       * @param {Hash}    properties  Set of properties to apply
       *
       * @returns {Element}    Reference to the element itself
       */
      ;

      _proto2.setProps = function setProps(props) {
        for (var p in props) {
          if (p === 'class') {
            this.addClass('' + props[p]);
          } else {
            this.node.setAttribute(p, '' + props[p]);
          }
        }

        return this;
      };

      _proto2.getTransitionDuration = function getTransitionDuration() {
        var duration = 0;
        var delay = 0;
        duration = this.getCss('transition-duration');
        delay = this.getCss('transition-delay');

        if (duration.indexOf('ms') > -1) {
          duration = parseFloat(duration);
        } else if (duration.indexOf('s') > -1) {
          duration = parseFloat(duration) * 1000;
        }

        if (delay.indexOf('ms') > -1) {
          delay = parseFloat(delay);
        } else if (delay.indexOf('s') > -1) {
          delay = parseFloat(delay) * 1000;
        }

        return duration + delay;
      }
      /**
       * Gets size of element
       *
       * @returns {Hash} Size of the element  {width: x, height: x}
       */
      ;

      _proto2.getSize = function getSize() {
        return {
          'width': this.node.offsetWidth,
          'height': this.node.offsetHeight
        };
      }
      /**
       * Gets inner size of element
       *
       * @param  [withPadding=false] {Boolean} include padding in returning size
       *
       * @returns {Hash} Size of the element  {width: x, height: x}
       */
      ;

      _proto2.getInnerSize = function getInnerSize(withPadding) {
        var size = this.getSize();
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
      ;

      _proto2.getScroll = function getScroll() {
        return {
          'top': this.node.scrollTop,
          'left': this.node.scrollLeft
        };
      }
      /**
       * Gets scroll offsets from the window top left corner
       *
       * @returns {Hash}
       */
      ;

      _proto2.getFullScroll = function getFullScroll() {
        var el = this.node;
        var p = {
          'top': 0,
          'left': 0
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
      ;

      _proto2.getPosition = function getPosition() {
        var el = this.node;
        var l = 0;
        var t = 0;

        if ($J.defined(DOC.documentElement.getBoundingClientRect)) {
          var b = this.node.getBoundingClientRect();
          var docScroll = $J.$(DOC).getScroll();
          var doc = $J.browser.getDoc();
          return {
            'top': b.top + docScroll.y - doc.clientTop,
            'left': b.left + docScroll.x - doc.clientLeft
          };
        }

        do {
          l += el.offsetLeft || 0;
          t += el.offsetTop || 0;
          el = el.offsetParent;
        } while (el && !/^(?:body|html)$/i.test(el.tagName));

        return {
          'top': t,
          'left': l
        };
      }
      /**
       * Gets element's absolute coordinates on a page
       *
       * @returns {Hash}  top/left/bottom/right coordinates
       */
      ;

      _proto2.getRect = function getRect() {
        var p = this.getPosition();
        var s = this.getSize();
        return {
          'top': p.top,
          'bottom': p.top + s.height,
          'left': p.left,
          'right': p.left + s.width
        };
      }
      /**
       * Sets element content
       *
       * @param {String} content New content
       *
       * @returns {Element}   Reference to the element itself
       */
      ;

      _proto2.changeContent = function changeContent(c) {
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
      ;

      _proto2.remove = function remove() {
        var result = this;

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
      ;

      _proto2.kill = function kill() {
        $J.$A(this.node.childNodes).forEach(function (o) {
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
      ;

      _proto2.append = function append(o, p) {
        if (p === void 0) {
          p = 'bottom';
        }

        var f = this.node.firstChild;
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
      ;

      _proto2.appendTo = function appendTo(o, p) {
        // return $J.$(o).append(this, p);
        $J.$(o).append(this, p);
        return this;
      };

      _proto2.getTagName = function getTagName() {
        return this.node.tagName.toLowerCase();
      };

      _proto2.attr = function attr(attrName, attrValue) {
        var result = this;

        if ($J.defined(attrValue)) {
          this.node.setAttribute(attrName, attrValue);
        } else {
          result = this.node.getAttribute(attrName);

          if (!result || $J.typeOf(result) !== 'string' || result.trim() === '') {
            result = null;
          }
        }

        return result;
      };

      _proto2.removeAttr = function removeAttr(attrName) {
        this.node.removeAttribute(attrName);
        return this;
      }
      /**
       * Checks if the specified class applied to the element
       * @param  {String}  cName Class to check
       * @return {Boolean}
       */
      ;

      _proto2.hasClass = function hasClass(cName) {
        // Use `classList` if browser supports it.
        if (this.node.classList) {
          return this.node.classList.contains(cName);
        }

        var className = this.node.className;

        if (this.node.className instanceof SVGAnimatedString) {
          className = this.node.className.baseVal;
        }

        return !$J.stringHas(cName || '', ' ') && $J.stringHas(className || '', ' ');
      };

      _proto2.hasAttribute = function hasAttribute(attrName) {
        return this.node.hasAttribute(attrName);
      };

      return Element;
    }(Base);
    /* eslint-disable class-methods-use-this */


    var Doc = /*#__PURE__*/function (_Base2) {
      "use strict";

      bHelpers.inheritsLoose(Doc, _Base2);

      function Doc(node) {
        var _this6;

        _this6 = _Base2.call(this, node) || this;
        var type = 'magicjs-document';

        if (node === WIN) {
          type = 'magicjs-window';
        }

        _this6.$J_TYPE = type;
        return _this6;
      }
      /**
       * Gets size of browser window
       */


      var _proto3 = Doc.prototype;

      _proto3.getSize = function getSize() {
        if ($J.browser.touchScreen || $J.browser.presto925 || $J.browser.webkit419) {
          return {
            'width': WIN.innerWidth,
            'height': WIN.innerHeight
          };
        }

        return {
          'width': $J.browser.getDoc().clientWidth,
          'height': $J.browser.getDoc().clientHeight
        };
      }
      /**
       * Gets window scroll offsets
       */
      ;

      _proto3.getScroll = function getScroll() {
        return {
          'x': WIN.pageXOffset || $J.browser.getDoc().scrollLeft,
          'y': WIN.pageYOffset || $J.browser.getDoc().scrollTop
        };
      }
      /**
       * Get full page size including scroll
       */
      ;

      _proto3.getFullSize = function getFullSize() {
        var s = this.getSize();
        return {
          'width': Math.max($J.browser.getDoc().scrollWidth, s.width),
          'height': Math.max($J.browser.getDoc().scrollHeight, s.height)
        };
      };

      return Doc;
    }(Base);
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

    var MagicEvent = /*#__PURE__*/function () {
      "use strict";

      function MagicEvent(originEvent) {
        this.oe = originEvent;
        this.$J_TYPE = 'event';
        this.isQueueStopped = $J.$false;
        this.type = this.oe.type;
        this.timeStamp = this.oe.timeStamp;
        this.propertyName = this.oe.propertyName;
        this.pointerType = this.oe.pointerType;
      }

      var _proto4 = MagicEvent.prototype;

      _proto4.getOriginEvent = function getOriginEvent() {
        return this.oe;
      }
      /**
       * Stop event propagation and default actions.
       * @return {Event}
       */
      ;

      _proto4.stop = function stop() {
        return this.stopDistribution().stopDefaults();
      }
      /**
       * Stop event propagation.
       * @return {Event}
       */
      ;

      _proto4.stopDistribution = function stopDistribution() {
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
      ;

      _proto4.stopDefaults = function stopDefaults() {
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
      ;

      _proto4.stopQueue = function stopQueue() {
        this.isQueueStopped = $J.$true;
        return this;
      }
      /**
       * Return mouse/pointer coordinates relative to the viewport.
       * @return {Object}
       */
      ;

      _proto4.getClientXY = function getClientXY() {
        var src;
        var result = {
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
      ;

      _proto4.getPageXY = function getPageXY() {
        var src;
        var result = {
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
            x: src.pageX || src.clientX + $J.browser.getDoc().scrollLeft,
            y: src.pageY || src.clientY + $J.browser.getDoc().scrollTop
          };
        }

        return result;
      }
      /**
       * Return target element.
       * @return {Element}
       */
      ;

      _proto4.getTarget = function getTarget() {
        var t = this.oe.target;

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
      ;

      _proto4.getRelated = function getRelated() {
        var r = null;

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
      ;

      _proto4.getButton = function getButton() {
        var result = this.oe.which;

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
      ;

      _proto4.isTouchEvent = function isTouchEvent() {
        return this.oe.pointerType && (this.oe.pointerType === 'touch' || this.oe.pointerType === this.oe.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type);
      }
      /**
       * Return true if it's a primary Touch/Pointer event.
       * @return {Boolean}
       */
      ;

      _proto4.isPrimaryTouch = function isPrimaryTouch() {
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
      ;

      _proto4.getPrimaryTouch = function getPrimaryTouch() {
        var result = null;

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
      ;

      _proto4.getPrimaryTouchId = function getPrimaryTouchId() {
        var result = null;

        if (this.oe.pointerType) {
          if (this.oe.isPrimary && (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType)) {
            result = this.oe.pointerId;
          }
        } else if (this.oe instanceof WIN.TouchEvent) {
          result = this.oe.changedTouches[0].identifier;
        }

        return result;
      };

      return MagicEvent;
    }();

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

    var Custom = /*#__PURE__*/function () {
      "use strict";

      function Custom(e) {
        this.$J_TYPE = 'event.custom';
        this.magicEvent = e.$J_TYPE === 'event' ? e : e.magicEvent;
        this.type = this.magicEvent.type; // this.target = this.magicEvent.oe.target;

        this.x = this.magicEvent.oe.x;
        this.y = this.magicEvent.oe.y;
        this.button = this.magicEvent.getButton();
        this.timeStamp = this.magicEvent.oe.timeStamp;
        this.relatedTarget = this.magicEvent.getRelated();
        this.isQueueStopped = this.magicEvent.isQueueStopped; // TODO $J.$false

        this.events = [];
      }

      var _proto5 = Custom.prototype;

      _proto5.getOriginEvent = function getOriginEvent() {
        return this.magicEvent.getOriginEvent();
      };

      _proto5.pushToEvents = function pushToEvents(e) {
        var eventCopy = e;
        this.events.push(eventCopy);
      };

      _proto5.stop = function stop() {
        return this.stopDistribution().stopDefaults();
      };

      _proto5.stopDistribution = function stopDistribution() {
        this.events.forEach(function (e) {
          try {
            e.stopDistribution();
          } catch (ex) {// empty
          }
        });
        return this;
      };

      _proto5.stopDefaults = function stopDefaults() {
        this.events.forEach(function (e) {
          try {
            e.stopDefaults();
          } catch (ex) {// empty
          }
        });
        return this;
      };

      _proto5.stopQueue = function stopQueue() {
        this.isQueueStopped = $J.$true;
        this.magicEvent.stopQueue();
        return this;
      }
      /**
       * Return mouse/pointer coordinates relative to the viewport.
       * @return {Object}
       */
      ;

      _proto5.getClientXY = function getClientXY() {
        return {
          x: this.clientX || this.magicEvent.oe.clientX,
          y: this.clientY || this.magicEvent.oe.clientY
        };
      }
      /**
       * Return mouse/pointer coordinates relative to the viewport, including scroll offset.
       * @return {Object}
       */
      ;

      _proto5.getPageXY = function getPageXY() {
        return {
          x: this.x,
          y: this.y
        };
      };

      _proto5.getTarget = function getTarget() {
        return this.target || this.magicEvent.oe.target;
      };

      _proto5.getRelated = function getRelated() {
        return this.relatedTarget;
      };

      _proto5.getButton = function getButton() {
        return this.button;
      };

      _proto5.getOriginalTarget = function getOriginalTarget() {
        var result = UND;

        if (this.events.length > 0) {
          result = this.events[0].getTarget();
        }

        return result;
      }
      /**
       * Return true if it's a Touch/Pointer event.
       * @return {Boolean}
       */
      ;

      _proto5.isTouchEvent = function isTouchEvent() {
        return this.magicEvent.isTouchEvent();
      }
      /**
       * Return true if it's a primary Touch/Pointer event.
       * @return {Boolean}
       */
      ;

      _proto5.isPrimaryTouch = function isPrimaryTouch() {
        return this.magicEvent.isPrimaryTouch();
      }
      /**
       * Return reference to the primary Touch/Pointer event.
       * @return {Object}
       */
      ;

      _proto5.getPrimaryTouch = function getPrimaryTouch() {
        return this.magicEvent.getPrimaryTouch();
      }
      /**
       * Return identifier of the primary Touch/Pointer event.
       * @return {Int}
       */
      ;

      _proto5.getPrimaryTouchId = function getPrimaryTouchId() {
        return this.magicEvent.getPrimaryTouchId();
      };

      return Custom;
    }();

    $J.Events.Custom = Custom;
    $J.Events.handlers = {};
    /**
     * Dom ready custom event implementation
     */

    (function ($J) {
      if (DOC.readyState === 'interactive' || DOC.readyState === 'complete') {
        setTimeout(function () {
          return $J.browser.onready();
        }, 0);
      } else {
        $J.$(DOC).addEvent('readystatechange', function (event) {
          if (event.getTarget().readyState === 'interactive' || event.getTarget().readyState === 'complete') {
            $J.browser.onready();
          }
        });
        $J.$(DOC).addEvent('DOMContentLoaded', $J.browser.onready);
        $J.$(WIN).addEvent('load', $J.browser.onready);
      }
    })(magicJS);
    /* eslint-env es6 */

    /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

    /* global magicJS, DOC */


    (function ($J) {
      var RADIUS_THRESHOLD = 5; // Click radius  // Click speed threshold

      var TIME_THRESHOLD = 300; // Click speed threshold

      var BtnClick = /*#__PURE__*/function (_$J$Events$Custom) {
        "use strict";

        bHelpers.inheritsLoose(BtnClick, _$J$Events$Custom);

        function BtnClick(e, target) {
          var _this7;

          _this7 = _$J$Events$Custom.call(this, e) || this;
          var r = e.getPageXY();
          _this7.type = 'btnclick';
          _this7.x = r.x;
          _this7.y = r.y;
          _this7.clientX = e.oe.clientX;
          _this7.clientY = e.oe.clientY;
          _this7.target = target.node;

          _this7.pushToEvents(e);

          return _this7;
        }

        return BtnClick;
      }($J.Events.Custom);

      var _options = {
        threshold: TIME_THRESHOLD,
        // Click speed threshold
        button: 1 // left button

      };

      var onclick = function (e) {
        e.stopDefaults();
      };

      var handle = function (e) {
        var btnclickEvent;
        var r;
        var options = this.fetch('event:btnclick:options');

        if (e.type !== 'dblclick' && e.getButton() !== options.button) {
          return;
        }

        if (this.fetch('event:btnclick:ignore')) {
          this.del('event:btnclick:ignore');
          return;
        }

        if (e.type === 'mousedown') {
          // e.stop(); // will it cause problems? but if we need to stop mousedown user wont be able to do this, as we don't pass it
          btnclickEvent = new BtnClick(e, this);
          this.store('event:btnclick:btnclickEvent', btnclickEvent);
        } else if (e.type === 'mouseup') {
          btnclickEvent = this.fetch('event:btnclick:btnclickEvent');

          if (!btnclickEvent) {
            return;
          }

          r = e.getPageXY();
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

      var handler = {
        add: function (options) {
          this.store('event:btnclick:options', $J.extend($J.detach(_options), options || {}));
          this.addEvent('mousedown', handle, 1);
          this.addEvent('mouseup', handle, 1);
          this.addEvent('click', onclick, 1);
        },
        remove: function () {
          this.removeEvent('mousedown', handle);
          this.removeEvent('mouseup', handle);
          this.removeEvent('click', onclick);
        }
      };
      $J.Events.handlers.btnclick = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS, DOC */


    (function ($J) {
      var Mousedrag = /*#__PURE__*/function (_$J$Events$Custom2) {
        "use strict";

        bHelpers.inheritsLoose(Mousedrag, _$J$Events$Custom2);

        function Mousedrag(e, target, state) {
          var _this8;

          _this8 = _$J$Events$Custom2.call(this, e) || this;
          var r = e.getPageXY();
          _this8.x = r.x;
          _this8.y = r.y;
          _this8.type = 'mousedrag';
          _this8.clientX = e.clientX;
          _this8.clientY = e.clientY;
          _this8.target = target.node;
          _this8.state = state; // dragmove / dragend

          _this8.dragged = false;

          _this8.pushToEvents(e);

          return _this8;
        }

        return Mousedrag;
      }($J.Events.Custom);

      var handleMouseDown = function (e) {
        if (e.getButton() !== 1) {
          return;
        } // e.stopDefaults();


        var dragEvent = new Mousedrag(e, this, 'dragstart');
        this.store('event:mousedrag:dragstart', dragEvent); // this.callEvent('mousedrag', dragEvent);
      };

      var handleMouseUp = function (e) {
        var dragEvent;
        dragEvent = this.fetch('event:mousedrag:dragstart');

        if (!dragEvent) {
          return;
        }

        e.stopDefaults();
        dragEvent = new Mousedrag(e, this, 'dragend');
        this.del('event:mousedrag:dragstart');
        this.callEvent('mousedrag', dragEvent);
      };

      var handleMouseMove = function (e) {
        var dragEvent;
        dragEvent = this.fetch('event:mousedrag:dragstart');

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

      var handler = {
        add: function () {
          var move = handleMouseMove.bind(this);
          var end = handleMouseUp.bind(this);
          this.addEvent('mousedown', handleMouseDown, 1);
          this.addEvent('mouseup', handleMouseUp, 1);
          $(DOC).addEvent('mousemove', move, 1);
          $(DOC).addEvent('mouseup', end, 1);
          this.store('event:mousedrag:listeners:document:move', move);
          this.store('event:mousedrag:listeners:document:end', end);
        },
        remove: function () {
          var f = function () {};

          this.removeEvent('mousedown', handleMouseDown);
          this.removeEvent('mouseup', handleMouseUp);
          $(DOC).removeEvent('mousemove', this.fetch('event:mousedrag:listeners:document:move') || f);
          $(DOC).removeEvent('mouseup', this.fetch('event:mousedrag:listeners:document:end') || f);
          this.del('event:mousedrag:listeners:document:move');
          this.del('event:mousedrag:listeners:document:end');
        }
      };
      $J.Events.handlers.mousedrag = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS */


    (function ($J) {
      var Dblbtnclick = /*#__PURE__*/function (_$J$Events$Custom3) {
        "use strict";

        bHelpers.inheritsLoose(Dblbtnclick, _$J$Events$Custom3);

        function Dblbtnclick(e, target) {
          var _this9;

          _this9 = _$J$Events$Custom3.call(this, e) || this;
          var r = e.getPageXY();
          _this9.x = r.x;
          _this9.y = r.y;
          _this9.type = 'dblbtnclick';
          _this9.clientX = e.clientX;
          _this9.clientY = e.clientY;
          _this9.target = target.node;
          _this9.timedout = false;
          _this9.tm = null;

          _this9.pushToEvents(e);

          return _this9;
        }

        return Dblbtnclick;
      }($J.Events.Custom);

      var _options = {
        threshold: 200
      };

      var handle = function (e) {
        var _this10 = this;

        var event = this.fetch('event:dblbtnclick:event');
        var options = this.fetch('event:dblbtnclick:options');

        if (!event) {
          // first click
          event = new Dblbtnclick(e, this);
          event.tm = setTimeout(function () {
            event.timedout = true;
            e.isQueueStopped = $J.$false;

            _this10.callEvent('btnclick', e);

            _this10.del('event:dblbtnclick:event');
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

      var handler = {
        add: function (options) {
          this.store('event:dblbtnclick:options', $J.extend($J.detach(_options), options || {}));
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


    (function ($J) {
      // Tap thresholds
      var RADIUS_THRESHOLD = 10;
      var TIME_THRESHOLD = 200;

      var Tap = /*#__PURE__*/function (_$J$Events$Custom4) {
        "use strict";

        bHelpers.inheritsLoose(Tap, _$J$Events$Custom4);

        function Tap(e, target) {
          var _this11;

          _this11 = _$J$Events$Custom4.call(this, e) || this;
          var touch = e.getPrimaryTouch();
          _this11.type = 'tap';
          _this11.id = touch.pointerId || touch.identifier;
          _this11.x = touch.pageX;
          _this11.y = touch.pageY;
          _this11.pageX = touch.pageX;
          _this11.pageY = touch.pageY;
          _this11.clientX = touch.clientX;
          _this11.clientY = touch.clientY;
          _this11.button = 0;
          _this11.target = target.node;

          _this11.pushToEvents(e);

          return _this11;
        }

        return Tap;
      }($J.Events.Custom);

      var onClick = function (e) {
        e.stopDefaults();
      };

      var onTouchStart = function (e) {
        if (!e.isPrimaryTouch()) {
          this.del('event:tap:event');
          return;
        }

        this.store('event:tap:event', new Tap(e, this)); // Prevent btnclick event

        this.store('event:btnclick:ignore', true);
      };

      var onTouchEnd = function (e) {
        // let now = $J.now();
        var event = this.fetch('event:tap:event'); // let options = this.fetch('event:tap:options');

        if (!event || !e.isPrimaryTouch()) {
          return;
        }

        this.del('event:tap:event');

        if (event.id === e.getPrimaryTouchId() && e.timeStamp - event.timeStamp <= TIME_THRESHOLD && Math.sqrt(Math.pow(e.getPrimaryTouch().pageX - event.x, 2) + Math.pow(e.getPrimaryTouch().pageY - event.y, 2)) <= RADIUS_THRESHOLD) {
          this.del('event:btnclick:btnclickEvent');
          e.stop();
          event.pushToEvents(e);
          this.callEvent('tap', event);
        }
      };

      var handler = {
        add: function (options) {
          this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1);
          this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);
          this.addEvent('click', onClick, 1);
        },
        remove: function () {
          this.removeEvent(['touchstart', 'pointerdown'], onTouchStart);
          this.removeEvent(['touchend', 'pointerup'], onTouchEnd);
          this.removeEvent('click', onClick);
        }
      };
      $J.Events.handlers.tap = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS */


    (function ($J) {
      var Dbltap = /*#__PURE__*/function (_$J$Events$Custom5) {
        "use strict";

        bHelpers.inheritsLoose(Dbltap, _$J$Events$Custom5);

        function Dbltap(e, target) {
          var _this12;

          _this12 = _$J$Events$Custom5.call(this, e) || this;
          _this12.type = 'dbltap';
          _this12.x = e.x;
          _this12.y = e.y;
          _this12.clientX = e.clientX;
          _this12.clientY = e.clientY;
          _this12.target = target.node;
          _this12.timedout = false;
          _this12.tm = null;

          _this12.pushToEvents(e);

          return _this12;
        }

        return Dbltap;
      }($J.Events.Custom);

      var _options = {
        threshold: 300
      };

      var handle = function (e) {
        var _this13 = this;

        var event = this.fetch('event:dbltap:event');
        var options = this.fetch('event:dbltap:options');

        if (!event) {
          // first tap
          event = new Dbltap(e, this);
          event.tm = setTimeout(function () {
            event.timedout = true;
            e.isQueueStopped = $J.$false;

            _this13.callEvent('tap', e);
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

      var handler = {
        add: function (options) {
          this.store('event:dbltap:options', $J.extend($J.detach(_options), options || {}));
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


    (function ($J) {
      var RADIUS_THRESHOLD = 10;

      var Touchdrag = /*#__PURE__*/function (_$J$Events$Custom6) {
        "use strict";

        bHelpers.inheritsLoose(Touchdrag, _$J$Events$Custom6);

        function Touchdrag(e, target, state) {
          var _this14;

          _this14 = _$J$Events$Custom6.call(this, e) || this;
          var touch = e.getPrimaryTouch();
          _this14.type = 'touchdrag';
          _this14.id = touch.pointerId || touch.identifier;
          _this14.clientX = touch.clientX;
          _this14.clientY = touch.clientY;
          _this14.pageX = touch.pageX;
          _this14.pageY = touch.pageY;
          _this14.x = touch.pageX;
          _this14.y = touch.pageY;
          _this14.button = 0;
          _this14.target = target.node;
          _this14.state = state; // dragmove / dragend

          _this14.dragged = false;

          _this14.pushToEvents(e);

          return _this14;
        }

        return Touchdrag;
      }($J.Events.Custom);

      var onTouchStart = function (e) {
        // if ( !isPrimaryTouch(e) ) {
        if (!e.isPrimaryTouch()) {
          return;
        }

        var dragEvent = new Touchdrag(e, this, 'dragstart');
        this.store('event:touchdrag:dragstart', dragEvent);
      };

      var onTouchEnd = function (e) {
        var dragEvent;
        dragEvent = this.fetch('event:touchdrag:dragstart');

        if (!dragEvent || !dragEvent.dragged || dragEvent.id !== e.getPrimaryTouchId()) {
          return;
        }

        dragEvent = new Touchdrag(e, this, 'dragend');
        this.del('event:touchdrag:dragstart');
        this.callEvent('touchdrag', dragEvent);
      };

      var onTouchMove = function (e) {
        var dragEvent;
        dragEvent = this.fetch('event:touchdrag:dragstart');

        if (!dragEvent || !e.isPrimaryTouch()) {
          return;
        }

        if (dragEvent.id !== e.getPrimaryTouchId()) {
          this.del('event:touchdrag:dragstart');
          return;
        }

        if (!dragEvent.dragged && Math.sqrt(Math.pow(e.getPrimaryTouch().pageX - dragEvent.x, 2) + Math.pow(e.getPrimaryTouch().pageY - dragEvent.y, 2)) > RADIUS_THRESHOLD) {
          dragEvent.dragged = true;
          this.callEvent('touchdrag', dragEvent); // send dragstart
        }

        if (!dragEvent.dragged) {
          return;
        }

        dragEvent = new Touchdrag(e, this, 'dragmove');
        this.callEvent('touchdrag', dragEvent);
      };

      var handler = {
        add: function () {
          var move = onTouchMove.bind(this);
          var end = onTouchEnd.bind(this);
          this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1);
          this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);
          this.addEvent(['touchmove', 'pointermove'], onTouchMove, 1);
          this.store('event:touchdrag:listeners:document:move', move);
          this.store('event:touchdrag:listeners:document:end', end);
          $(DOC).addEvent('pointermove', move, 1);
          $(DOC).addEvent('pointerup', end, 1);
        },
        remove: function () {
          var f = function () {};

          this.removeEvent(['touchstart', 'pointerdown'], onTouchStart);
          this.removeEvent(['touchend', 'pointerup'], onTouchEnd);
          this.removeEvent(['touchmove', 'pointermove'], onTouchMove);
          $(DOC).removeEvent('pointermove', this.fetch('event:touchdrag:listeners:document:move') || f, 1);
          $(DOC).removeEvent('pointerup', this.fetch('event:touchdrag:listeners:document:end') || f, 1);
          this.del('event:touchdrag:listeners:document:move');
          this.del('event:touchdrag:listeners:document:end');
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


    (function ($J) {
      var baseSpace = null;
      var $ = $J.$;

      var distance = function (point1, point2) {
        var x = point2.x - point1.x;
        var y = point2.y - point1.y;
        return Math.sqrt(x * x + y * y);
      };

      var getSpace = function (targetTouches, variables) {
        var ts = Array.prototype.slice.call(targetTouches);
        var diffX = Math.abs(ts[1].pageX - ts[0].pageX);
        var diffY = Math.abs(ts[1].pageY - ts[0].pageY);

        var _x = Math.min(ts[1].pageX, ts[0].pageX) + diffX / 2;

        var _y = Math.min(ts[1].pageY, ts[0].pageY) + diffY / 2;

        var result = 0;
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

      var getScale = function (space) {
        return space / baseSpace;
      };

      var getTouches = function (e, cache) {
        var result;
        var originEvent = e.getOriginEvent();

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
            cache.forEach(function (v) {
              result.push(v);
            });
          }
        }

        return result;
      };

      var cacheEvent = function (e, cache, justSame) {
        var result = false;

        if (e.pointerId && e.pointerType === 'touch' && (!justSame || cache.has(e.pointerId))) {
          cache.set(e.pointerId, e);
          result = true;
        }

        return result;
      };

      var removeCache = function (e, cache) {
        if (e.pointerId && e.pointerType === 'touch' && cache && cache.has(e.pointerId)) {
          // compressor does not want to compress
          cache['delete'](e.pointerId);
        }
      };

      var getEventId = function (e) {
        var result;

        if (e.pointerId && e.pointerType === 'touch') {
          result = e.pointerId;
        } else {
          result = e.identifier;
        }

        return result;
      };

      var addActivePoints = function (targetTouches, container) {
        var i;
        var id;
        var result = false;

        for (i = 0; i < targetTouches.length; i++) {
          if (container.length === 2) {
            break;
          } else {
            id = getEventId(targetTouches[i]);

            if (!$J.contains(container, id)) {
              container.push(id);
              result = true;
            }
          }
        }

        return result;
      };

      var getIds = function (targetTouches) {
        var result = [];
        targetTouches.forEach(function (value) {
          result.push(getEventId(value));
        });
        return result;
      };

      var removeActivePoint = function (targetTouches, container) {
        var i;
        var ids;
        var result = false;

        if (container) {
          ids = getIds(targetTouches);

          for (i = 0; i < container.length; i++) {
            if (!$J.contains(ids, container[i])) {
              container.splice(i, 1);
              result = true;
              break;
            }
          }
        }

        return result;
      };

      var getActivePoints = function (targetTouches, container) {
        var i;
        var result = [];

        for (i = 0; i < targetTouches.length; i++) {
          if ($J.contains(container, getEventId(targetTouches[i]))) {
            result.push(targetTouches[i]);

            if (result.length === 2) {
              break;
            }
          }
        }

        return result;
      };

      var removePinchEnd = function (el) {
        var target = el.fetch('event:pinch:target');

        if (target) {
          target.removeEvent(['touchend'], el.fetch('event:pinch:listeners:document:end'));
        }

        el.del('event:pinch:target');
      };

      var clearCache = function (el) {
        var cache = el.fetch('event:pinch:cache');

        if (cache) {
          cache.clear();
        }

        el.del('event:pinch:cache');
      };

      var Pinch = /*#__PURE__*/function (_$J$Events$Custom7) {
        "use strict";

        bHelpers.inheritsLoose(Pinch, _$J$Events$Custom7);

        function Pinch(e, target, state, variables) {
          var _this15;

          _this15 = _$J$Events$Custom7.call(this, e) || this;
          _this15.type = 'pinch';
          _this15.target = target.node;
          _this15.state = state; // pinchmove / pinchend / pinchresize

          _this15.x = variables.x;
          _this15.y = variables.y;
          _this15.scale = variables.scale;
          _this15.space = variables.space;
          _this15.zoom = variables.zoom;
          _this15.state = state;
          _this15.centerPoint = variables.centerPoint;
          _this15.points = variables.points;

          _this15.pushToEvents(e);

          return _this15;
        }

        return Pinch;
      }($J.Events.Custom);

      var _variables = {
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

      var setVariables = function (targetTouches, variables) {
        var lastSpace = variables.space;

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


      var onTouchMove = function (e) {
        var pinchEvent;
        var variables = this.fetch('event:pinch:variables');
        var cache = this.fetch('event:pinch:cache');
        var currentActivePoints = this.fetch('event:pinch:activepoints');

        if (!variables) {
          variables = $J.extend({}, $J.detach(_variables));
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

      var onTouchStart = function (e) {
        var pinchEventStart;
        var variables;
        var cache = this.fetch('event:pinch:cache');
        var currentActivePoints = this.fetch('event:pinch:activepoints');

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
          this.store('event:pinch:target', $(e.getTarget()));
          $(e.getTarget()).addEvent(['touchend'], this.fetch('event:pinch:listeners:document:end'), 1);
        }

        cacheEvent(e, cache);
        var targetTouches = getTouches(e, cache);
        addActivePoints(targetTouches, currentActivePoints);

        if (targetTouches.length === 2) {
          pinchEventStart = this.fetch('event:pinch:pinchstart');
          variables = this.fetch('event:pinch:variables');

          if (!variables) {
            variables = $J.extend({}, $J.detach(_variables));
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

      var onTouchEnd = function (e) {
        var pinchEvent;

        var _event;

        var cache = this.fetch('event:pinch:cache');

        if (e.pointerType === 'mouse' || e.pointerId && (!cache || !cache.has(e.pointerId))) {
          return;
        }

        pinchEvent = this.fetch('event:pinch:pinchstart');
        var variables = this.fetch('event:pinch:variables');
        var currentActivePoints = this.fetch('event:pinch:activepoints');
        var targetTouches = getTouches(e, cache);
        removeCache(e, cache);
        var removingResult = removeActivePoint(targetTouches, currentActivePoints);

        if (!pinchEvent || !variables || !variables.started || !removingResult || !currentActivePoints) {
          return;
        }

        if (removingResult) {
          addActivePoints(targetTouches, currentActivePoints);
        }

        _event = 'pinchend';

        if (targetTouches.length > 1) {
          _event = 'pinchresize';
        } else {
          this.del('event:pinch:pinchstart');
          this.del('event:pinch:variables');
          this.del('event:pinch:activepoints');
          clearCache(this);
          removePinchEnd(this);
        }

        setVariables(getActivePoints(targetTouches, currentActivePoints), variables);
        pinchEvent = new Pinch(e, this, _event, variables);
        this.callEvent('pinch', pinchEvent);
      };

      var handler = {
        add: function (options) {
          if (!baseSpace) {
            baseSpace = function () {
              var s = $J.W.getSize();
              s.width = Math.min(s.width, s.height);
              s.height = s.width; // var s = { width: 375, height: 812 };

              return Math.pow(distance({
                x: 0,
                y: 0
              }, {
                x: s.width,
                y: s.height
              }), 2);
            }();
          }

          var move = onTouchMove.bind(this);
          var end = onTouchEnd.bind(this); // this.addEvent(['click', 'tap'], onClick, 1);

          this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1); // this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);

          this.addEvent(['pointerup'], onTouchEnd, 1);
          this.addEvent(['touchmove', 'pointermove'], onTouchMove, 1);
          this.store('event:pinch:listeners:document:move', move);
          this.store('event:pinch:listeners:document:end', end);
          $(DOC).addEvent('pointermove', move, 1);
          $(DOC).addEvent('pointerup', end, 1);
        },
        remove: function () {
          var f = function () {}; // this.removeEvent(['click', 'tap'], onClick);


          this.removeEvent(['touchstart', 'pointerdown'], onTouchStart); // this.removeEvent(['touchend', 'pointerup'], onTouchEnd);

          this.removeEvent(['pointerup'], onTouchEnd);
          this.removeEvent(['touchmove', 'pointermove'], onTouchMove);
          $(DOC).removeEvent('pointermove', this.fetch('event:pinch:listeners:document:move') || f, 1);
          $(DOC).removeEvent('pointerup', this.fetch('event:pinch:listeners:document:end') || f, 1);
          this.del('event:pinch:listeners:document:move');
          this.del('event:pinch:listeners:document:end');
          removePinchEnd(this);
          clearCache(this);
          this.del('event:pinch:variables');
          this.del('event:pinch:activepoints');
          this.del('event:pinch:pinchstart');
        }
      };
      $J.Events.handlers.pinch = handler;
    })(magicJS);
    /* eslint-env es6 */

    /* global magicJS, DOC, UND */


    (function ($J) {
      var eventType = 'wheel';

      if (!('onwheel' in DOC || $J.browser.ieMode > 8)) {
        eventType = 'mousewheel';
      }

      var Mousescroll = /*#__PURE__*/function (_$J$Events$Custom8) {
        "use strict";

        bHelpers.inheritsLoose(Mousescroll, _$J$Events$Custom8);

        function Mousescroll(e, target, delta, deltaX, deltaY, deltaZ, deltaFactor) {
          var _this16;

          _this16 = _$J$Events$Custom8.call(this, e) || this;
          var r = e.getPageXY();
          _this16.x = r.x;
          _this16.y = r.y;
          _this16.type = 'mousescroll'; // this.timeStamp = e.timeStamp;

          _this16.target = target.node;
          _this16.delta = delta || 0;
          _this16.deltaX = deltaX || 0;
          _this16.deltaY = deltaY || 0;
          _this16.deltaZ = deltaZ || 0;
          _this16.deltaFactor = deltaFactor || 0;
          _this16.deltaMode = e.deltaMode || 0;
          _this16.isMouse = false;

          _this16.pushToEvents(e);

          return _this16;
        }

        return Mousescroll;
      }($J.Events.Custom);

      var lowestDelta;
      var resetDeltaTimer;

      var resetDelta = function () {
        lowestDelta = null;
      };

      var isMouse = function (deltaFactor, deltaMode) {
        return deltaFactor > 50 || deltaMode === 1 && !($J.browser.platform === 'win' && deltaFactor < 1) // Firefox
        || deltaFactor % 12 === 0 // Safari
        || deltaFactor % 4.000244140625 === 0; // Chrome on OS X
      };

      var handle = function (e) {
        var delta = 0;
        var deltaX = 0;
        var deltaY = 0;
        var absDelta = 0;
        var originEvent = e.getOriginEvent(); // DomMouseScroll event

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

        delta = deltaY === 0 ? deltaX : deltaY;
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
          lowestDelta = absDelta;
        }

        var calc = delta > 0 ? 'floor' : 'ceil';
        delta = Math[calc](delta / lowestDelta);
        deltaX = Math[calc](deltaX / lowestDelta);
        deltaY = Math[calc](deltaY / lowestDelta);

        if (resetDeltaTimer) {
          clearTimeout(resetDeltaTimer);
        }

        resetDeltaTimer = setTimeout(resetDelta, 200);

        var _event = new Mousescroll(e, this, delta, deltaX, deltaY, 0, lowestDelta);

        _event.isMouse = isMouse(lowestDelta, originEvent.deltaMode || 0);
        this.callEvent('mousescroll', _event);
      };

      var handler = {
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


  (function ($J) {
    if (!$J) {
      throw 'MagicJS not found';
    }

    if ($J.FX) {
      return;
    }

    var $ = $J.$;
    /**
     * Basic transition effects
     * @class
     * @constant
     * @static
     */

    var TRANSITION = {
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
      elasticIn: function (p, x) {
        x = x || [];
        return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
      },
      elasticOut: function (p, x) {
        return 1 - TRANSITION.elasticIn(1 - p, x);
      },
      bounceIn: function (p) {
        for (var a = 0, b = 1; 1; a += b, b /= 2) {
          if (p >= (7 - 4 * a) / 11) {
            return b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
          }
        }
      },
      bounceOut: function (p) {
        return 1 - TRANSITION.bounceIn(1 - p);
      },
      none: function (x) {
        return 0;
      }
    };
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

    var FX = /*#__PURE__*/function () {
      "use strict";

      function FX(el
      /* can be array */
      , opt) {
        var _this17 = this;

        this.styles = null;
        this.cubicBezier = null;
        this.easeFn = null;
        this.state = 0; // 0 - init,  1 - started, 2 - started, 3 - ended

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
          onStart: function () {},
          onComplete: function () {},
          onBeforeRender: function () {},
          onAfterRender: function () {},
          forceAnimation: false,
          roundCss: false // use Math.round() when calculating css steps values

        };
        this.els = [];

        if (!Array.isArray(el)) {
          el = [el];
        }

        el.forEach(function (_el) {
          if (_el) {
            _this17.els.push($(_el));
          }
        });
        this.options = $J.extend(this.options, opt);
        this.timer = false;
        this.setTransition(this.options.transition);

        if ($J.typeOf(this.options.cycles) === 'string') {
          this.options.cycles = this.options.cycles === 'infinite' ? Infinity : parseInt(this.options.cycles, 10) || 1;
        }
      }

      FX.getTransition = function getTransition() {
        return TRANSITION;
      };

      var _proto6 = FX.prototype;

      _proto6.setTransition = function setTransition(easing) {
        this.options.transition = easing; // this.easeFn = this.cubicBezierAtTime;

        this.easeFn = FX.cubicBezierAtTime;

        var _easing = TRANSITION[this.options.transition] || this.options.transition;

        if ($J.typeOf(_easing) === 'function') {
          this.easeFn = _easing;
        } else {
          this.cubicBezier = this.parseCubicBezier(_easing) || this.parseCubicBezier('ease');
        }
      }
      /**
       * Start animation
       */
      ;

      _proto6.start = function start(styles
      /**Hash*/
      ) {
        var _this18 = this;

        var runits = /\%$/;
        var s;
        var i;

        if (this.state === 2) {
          return this;
        }

        this.state = 1;
        this.cycle = 0;
        this.alternate = $J.contains(['alternate', 'alternate-reverse'], this.options.direction);
        this.continuous = $J.contains(['continuous', 'continuous-reverse'], this.options.direction);

        if (!styles) {
          styles = {};
        }

        if (!Array.isArray(styles)) {
          styles = [styles];
        }

        this.styles = styles;
        var l = this.styles.length;
        this.pStyles = new Array(l);

        for (i = 0; i < l; i++) {
          this.pStyles[i] = {};

          for (s in this.styles[i]) {
            if (runits.test(this.styles[i][s][0])) {
              this.pStyles[s] = true;
            }

            if ($J.contains(['reverse', 'alternate-reverse', 'continuous-reverse'], this.options.direction)) {
              this.styles[i][s].reverse();
            }
          }
        }

        this.startTime = $J.now();
        this.finishTime = this.startTime + this.options.duration;
        this.options.onStart();

        if (this.options.duration === 0) {
          // apply all styles immediately
          this.render(1.0);
          this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els);
        } else {
          this.state = 2;

          if (!this.options.forceAnimation && $J.browser.features.requestAnimationFrame) {
            this.timer = $J.browser.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
          } else {
            this.timer = setInterval(function () {
              _this18.loop();
            }, Math.round(1000 / this.options.fps));
          }
        }

        return this;
      };

      _proto6.stopAnimation = function stopAnimation() {
        if (this.timer) {
          if (!this.options.forceAnimation && $J.browser.features.requestAnimationFrame && $J.browser.cancelAnimationFrame) {
            $J.browser.cancelAnimationFrame.call($J.W.node, this.timer);
          } else {
            clearInterval(this.timer);
          }

          this.timer = false;
        }
      }
      /**
       * Stop animation
       */
      ;

      _proto6.stop = function stop(complete
      /** Boolean*/
      ) {
        if ($J.contains([0, 3], this.state)) {
          return this;
        }

        if (!$J.defined(complete)) {
          complete = false;
        }

        this.stopAnimation();
        this.state = 3;

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
      ;

      _proto6.loop = function loop() {
        var _now = $J.now();

        var i;
        var dx = (_now - this.startTime) / this.options.duration;
        var cycle = Math.floor(dx);

        if (_now >= this.finishTime && cycle >= this.options.cycles) {
          this.stopAnimation();
          this.render(1.0); // clearTimeout(this._completeTimer);
          // this._completeTimer = setTimeout(() => {

          this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els); // }, 10);

          return this;
        }

        if (this.alternate && this.cycle < cycle) {
          for (i = 0; i < this.styles.length; i++) {
            for (var s in this.styles[i]) {
              this.styles[i][s].reverse();
            }
          }
        }

        this.cycle = cycle;

        if (!this.options.forceAnimation && $J.browser.features.requestAnimationFrame) {
          this.timer = $J.browser.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
        }

        this.render((this.continuous ? cycle : 0) + this.easeFn(dx % 1, this.options.duration, this.cubicBezier));
      }
      /**
       * ignore
       */
      ;

      _proto6.render = function render(dx) {
        var i;
        var css = [];

        var _el;

        var _css;

        var l = this.els.length;

        for (i = 0; i < l; i++) {
          css.push(this.renderOverLoad(dx, this.els[i], this.styles[i], this.pStyles[i]));
        }

        _el = this.els;
        _css = css;

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
      ;

      _proto6.renderOverLoad = function renderOverLoad(dx, el, styles, pStyles) {
        var css = {};
        var change = dx; // eslint-disable-line no-unused-vars

        var s;

        for (s in styles) {
          if (s === 'opacity') {
            css[s] = Math.round(this.calc(styles[s][0], styles[s][1], dx) * 100) / 100;
          } else {
            css[s] = this.calc(styles[s][0], styles[s][1], dx); // if (this.options.roundCss) { css[s] = Math.round(css[s]); } // если двигать кубиком базье в процентах - то без округления лучше двигает
            // Styles defined in percent. Ap

            pStyles[s] && (css[s] += '%');
          }
        }

        return css;
      }
      /**
       * @ignore
       */
      ;

      _proto6.calc = function calc(from, to, dx) {
        from = parseFloat(from);
        to = parseFloat(to);
        return (to - from) * dx + from;
      }
      /**
       * @ignore
      */
      ;

      _proto6.set = function set(css) {
        for (var i = 0; i < this.els.length; i++) {
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
      ;

      _proto6.parseCubicBezier = function parseCubicBezier(cubicbezier) {
        var i;
        var points = null;

        if ($J.typeOf(cubicbezier) !== 'string') {
          return null;
        }

        switch (cubicbezier) {
          // Standard
          case 'linear':
            points = $([0.000, 0.000, 1.000, 1.000]);
            break;

          case 'ease':
            points = $([0.250, 0.100, 0.250, 1.000]);
            break;

          case 'ease-in':
            points = $([0.420, 0.000, 1.000, 1.000]);
            break;

          case 'ease-out':
            points = $([0.000, 0.000, 0.580, 1.000]);
            break;

          case 'ease-in-out':
            points = $([0.420, 0.000, 0.580, 1.000]);
            break;
          // Sine
          // case 'easeInSine':
          //     points = $([0.470, 0.000, 0.745, 0.715]);
          //     break;
          // case 'easeOutSine':
          //     points = $([0.39, 0.575, 0.565, 1.000]);
          //     break;
          // case 'easeInOutSine':
          //     points = $([0.445, 0.050, 0.550, 0.950]);
          //     break;
          // Quad
          // case 'easeInQuad':
          //     points = $([0.550, 0.085, 0.680, 0.530]);
          //     break;
          // case 'easeOutQuad':
          //     points = $([0.250, 0.460, 0.450, 0.940]);
          //     break;
          // case 'easeInOutQuad':
          //     points = $([0.455, 0.030, 0.515, 0.955]);
          //     break;
          // Cubic
          // case 'easeInCubic':
          //     points = $([0.550, 0.055, 0.675, 0.190]);
          //     break;
          // case 'easeOutCubic':
          //     points = $([0.215, 0.610, 0.355, 1.000]);
          //     break;
          // case 'easeInOutCubic':
          //     points = $([0.645, 0.045, 0.355, 1.000]);
          //     break;
          // Quart
          // case 'easeInQuart':
          //     points = $([0.895, 0.030, 0.685, 0.220]);
          //     break;
          // case 'easeOutQuart':
          //     points = $([0.165, 0.840, 0.440, 1.000]);
          //     break;
          // case 'easeInOutQuart':
          //     points = $([0.770, 0.000, 0.175, 1.000]);
          //     break;
          // Quint
          // case 'easeInQuint':
          //     points = $([0.755, 0.050, 0.855, 0.060]);
          //     break;
          // case 'easeOutQuint':
          //     points = $([0.230, 1.000, 0.320, 1.000]);
          //     break;
          // case 'easeInOutQuint':
          //     points = $([0.860, 0.000, 0.070, 1.000]);
          //     break;
          // Expo
          // case 'easeInExpo':
          //     points = $([0.950, 0.050, 0.795, 0.035]);
          //     break;
          // case 'easeOutExpo':
          //     points = $([0.190, 1.000, 0.220, 1.000]);
          //     break;
          // case 'easeInOutExpo':
          //     points = $([1.000, 0.000, 0.000, 1.000]);
          //     break;
          // Circ
          // case 'easeInCirc':
          //     points = $([0.600, 0.040, 0.980, 0.335]);
          //     break;
          // case 'easeOutCirc':
          //     points = $([0.075, 0.820, 0.165, 1.000]);
          //     break;
          // case 'easeInOutCirc':
          //     points = $([0.785, 0.135, 0.150, 0.860]);
          //     break;
          // Back
          // case 'easeInBack':
          //     points = $([0.600, -0.280, 0.735, 0.045]);
          //     break;
          // case 'easeOutBack':
          //     points = $([0.175, 0.885, 0.320, 1.275]);
          //     break;
          // case 'easeInOutBack':
          //     points = $([0.680, -0.550, 0.265, 1.550]);
          //     break;

          default:
            cubicbezier = cubicbezier.replace(/\s/g, '');

            if (cubicbezier.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
              points = cubicbezier.replace(/^cubic-bezier\s*\(|\)$/g, '').split(',');

              for (i = points.length - 1; i >= 0; i--) {
                points[i] = parseFloat(points[i]);
              }
            }

        }

        return $(points);
      } // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
      // 1:1 conversion to js from webkit source files
      // UnitBezier.h, WebCore_animation_AnimationBase.cpp
      ;

      FX.cubicBezierAtTime = function cubicBezierAtTime(t, duration, cubicBezier) {
        var ax = 0;
        var bx = 0;
        var cx = 0;
        var ay = 0;
        var by = 0;
        var cy = 0; // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.

        var sampleCurveX = function (t) {
          return ((ax * t + bx) * t + cx) * t;
        };

        var sampleCurveY = function (t) {
          return ((ay * t + by) * t + cy) * t;
        };

        var sampleCurveDerivativeX = function (t) {
          return (3.0 * ax * t + 2.0 * bx) * t + cx;
        }; // The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
        // animation, the more precision is needed in the timing function result to avoid ugly discontinuities.


        var solveEpsilon = function (duration) {
          return 1.0 / (200.0 * duration);
        }; // const solve = (x, epsilon) => {
        //     return sampleCurveY(solveCurveX(x, epsilon));
        // };
        // Given an x value, find a parametric value it came from.


        var solveCurveX = function (x, epsilon) {
          var t0;
          var t1;
          var t2;
          var x2;
          var d2;
          var i;

          var fabs = function (n) {
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

        var solve = function (x, epsilon) {
          return sampleCurveY(solveCurveX(x, epsilon));
        }; // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).


        cx = 3.0 * cubicBezier[0];
        bx = 3.0 * (cubicBezier[2] - cubicBezier[0]) - cx;
        ax = 1.0 - cx - bx;
        cy = 3.0 * cubicBezier[1];
        by = 3.0 * (cubicBezier[3] - cubicBezier[1]) - cy;
        ay = 1.0 - cy - by; // Convert from input time to parametric value in curve, then from that to output time.

        return solve(t, solveEpsilon(duration));
      };

      return FX;
    }();

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


  (function ($J) {
    if (!$J) {
      throw 'MagicJS not found';
    }

    if ($J.Options) {
      return;
    }

    var $ = $J.$;
    var globalValue = null;
    var dataTypes = {
      'boolean': 1,
      'array': 2,
      'number': 3,
      'function': 4,
      'url': 5,
      'string': 100
    };

    var isAbsoluteUrl = function (v) {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(v);
    };

    var typeValidators = {
      'boolean': function (option, v, strict) {
        if ($J.typeOf(v) !== 'boolean') {
          if (strict || $J.typeOf(v) !== 'string') {
            return false;
          } else if (!/^(true|false)$/.test(v)) {
            return false;
          } else {
            v = !v.replace(/true/i, '').trim();
          }
        }

        if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
          return false;
        }

        globalValue = v;
        return true;
      },
      'url': function (option, v, strict) {
        var result = false;

        if ($J.typeOf(v) === 'string' && isAbsoluteUrl(v)) {
          if (option.hasOwnProperty('enum')) {
            if ($J.contains(option['enum'], v)) {
              result = true;
            }
          } else {
            result = true;
          }
        }

        return result;
      },
      'string': function (option, v, strict) {
        if ($J.typeOf(v) !== 'string') {
          return false;
        } else if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
          return false;
        } else {
          globalValue = '' + v;
          return true;
        }
      },
      'number': function (option, v, strict) {
        var r = /%$/;
        var percent = $J.typeOf(v) === 'string' && r.test(v); // if (strict && typeof(v) !== 'number') {

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

        if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
          return false;
        }

        if (option.minimum > v || v > option.maximum) {
          return false;
        }

        globalValue = percent ? v + '%' : v;
        return true;
      },
      'array': function (option, v, strict) {
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
      'function': function (option, v, strict) {
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

    var validateParamValue = function (param, value, strict) {
      var opts = param.hasOwnProperty('oneOf') ? param.oneOf : [param];

      if ($J.typeOf(opts) !== 'array') {
        return false;
      }

      for (var i = 0, l = opts.length - 1; i <= l; i++) {
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


    var normalizeParam = function (param) {
      var i;
      var j;
      var oneOf; // eslint-disable-line no-unused-vars

      var l;
      var temp;

      if (param.hasOwnProperty('oneOf')) {
        l = param.oneOf.length;

        for (i = 0; i < l; i++) {
          for (j = i + 1; j < l; j++) {
            if (dataTypes[param.oneOf[i]['type']] > dataTypes[param.oneOf[j].type]) {
              temp = param.oneOf[i];
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


    var validateSchemaParam = function (param) {
      // validate types
      var opts = param.hasOwnProperty('oneOf') ? param.oneOf : [param];

      if ($J.typeOf(opts) !== 'array') {
        return false;
      }

      for (var i = opts.length - 1; i >= 0; i--) {
        if (!opts[i].type || !dataTypes.hasOwnProperty(opts[i].type)) {
          return false;
        } // validate enum option if present


        if ($J.defined(opts[i]['enum'])) {
          if ($J.typeOf(opts[i]['enum']) !== 'array') {
            return false;
          }

          for (var j = opts[i]['enum'].length - 1; j >= 0; j--) {
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

    var isDefaults = function (obj) {
      var i;
      var result = false;

      for (i in obj) {
        if (i === 'defaults') {
          result = true;
          break;
        }
      }

      return result;
    };

    var parseObj = function (obj) {
      var result = {};

      var parseVars = function (map, pathTo) {
        var prop;

        var _pathTo;

        for (prop in map) {
          _pathTo = pathTo.slice(0);

          if ($J.typeOf(map[prop]) !== 'object' || isDefaults(map[prop])) {
            _pathTo.push(prop);

            result[_pathTo.join('.')] = map[prop];
          } else {
            _pathTo.push(prop);

            parseVars(map[prop], _pathTo);
          }
        }
      };

      parseVars(obj, []);
      return result;
    };

    var convertToDeepObj = function (obj) {
      var key;
      var result = {};

      var setObjValue = function (arr, value) {
        var tmp = result;
        var l = arr.length;

        if (arr[l - 1].trim() === '') {
          arr.splice(l - 1, 1);
        }

        arr.forEach(function (v, index) {
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

      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          setObjValue(key.split('.'), obj[key]);
        }
      }

      return result;
    };

    var normalizeString = function (str) {
      return $J.camelize((str + '').trim());
    };

    var Options = /*#__PURE__*/function () {
      "use strict";

      function Options(schema) {
        this.schema = {};
        this.options = {};
        this.parseSchema(schema);
      }

      var _proto7 = Options.prototype;

      _proto7.parseSchema = function parseSchema(schema, force) {
        var i;
        var key;
        schema = parseObj(schema);

        for (i in schema) {
          if (!schema.hasOwnProperty(i)) {
            continue;
          }

          key = normalizeString(i);

          if (!this.schema.hasOwnProperty(key) || force) {
            this.schema[key] = normalizeParam(schema[i]);

            if (!validateSchemaParam(this.schema[key])) {
              throw 'Incorrect definition of the \'' + i + '\' parameter in ' + schema;
            } // Preserve existing option value


            if ($J.defined(this.options[key])) {
              if (!this.checkValue(key, this.options[key])) {
                this.options[key] = $J.U;
              }
            } else {
              this.options[key] = $J.U;
            }
          }
        }
      };

      _proto7.set = function set(id, value) {
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
      };

      _proto7.get = function get(id) {
        id = normalizeString(id);

        if (this.schema.hasOwnProperty(id)) {
          return $J.defined(this.options[id]) ? this.options[id] : this.schema[id]['defaults'];
        }
      };

      _proto7.fromJSON = function fromJSON(obj) {
        obj = parseObj(obj);

        for (var i in obj) {
          this.set(i, obj[i]);
        }
      };

      _proto7.getJSON = function getJSON() {
        var json = $J.extend({}, this.options);

        for (var i in json) {
          if (json[i] === $J.U && this.schema[i]['defaults'] !== $J.U) {
            json[i] = this.schema[i]['defaults'];
          }
        }

        return convertToDeepObj(json);
      }
      /**
       * Set options from string
       * @param    str     {String} String with options. Example - "param1:value1;param2:value2;param3:value3; ...."
       * @param    exclude {Object} Object with regexps for options which we want to exclude. Example - { nameOfRegExp1: new RegExp('param2', 'g') }
       * @returns          {Object} Object with options which were excluded. Example - { nameOfRegExp1: 'param2:value2;' }
       */
      ;

      _proto7.fromString = function fromString(str, exclude) {
        var _this19 = this;

        var result = {};

        if (!exclude) {
          exclude = {};
        }

        var check = function (substr) {
          var key;
          var _result = true;
          substr = substr.trim();

          for (key in exclude) {
            if (Object.prototype.hasOwnProperty.call(exclude, key)) {
              if (exclude[key].test && exclude[key].test(substr)) {
                if (!result[key]) {
                  result[key] = '';
                }

                result[key] += substr + ';';
                _result = false;
                break;
              }
            }
          }

          return _result;
        };

        str.split(';').forEach(function (chunk) {
          if (check(chunk)) {
            chunk = chunk.split(':');

            _this19.set(chunk.shift().trim(), chunk.join(':'));
          }
        });
        return result;
      };

      _proto7.checkValue = function checkValue(id, value) {
        var result = false;
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
      };

      _proto7.exists = function exists(id) {
        id = normalizeString(id);
        return this.schema.hasOwnProperty(id);
      };

      _proto7.isset = function isset(id) {
        id = normalizeString(id);
        return this.exists(id) && $J.defined(this.options[id]);
      };

      _proto7.remove = function remove(id) {
        id = normalizeString(id);

        if (this.exists(id)) {
          delete this.options[id];
          delete this.schema[id];
        }
      };

      return Options;
    }();

    $J.Options = Options;
  })(magicJS);

  return magicJS;
});
//# sourceMappingURL=magicjs.js.map
