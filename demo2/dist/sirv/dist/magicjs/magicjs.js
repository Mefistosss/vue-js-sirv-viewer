Sirv.define(
    'magicJS',
    ['bHelpers'],
    (bHelpers) => {
        const moduleName = 'magicJS';
        
        
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

let magicJS;
let $J;

magicJS = $J = (function () {

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
    $uuid: (o) => {
        return (o.$J_UUID || (o.$J_UUID = ++$J.UUID));
    },

    /**
     * Retreive storage of an object by uuid
     */
    getStorage: (uuid) => {
        return ($J.storage[uuid] || ($J.storage[uuid] = {}));
    },

    /**
     * Empty function that returns false
     */
    $false: () => { return false; },

    /**
     * Empty function that returns true
     */
    $true: () => { return true; },

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
    defined: (o) => {
        return (o != UND);
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
    contains: (source, needle, from) => {
        return source.indexOf(needle, from) !== -1;
    },

    /**
     * Get type of the object
     *
     * @param {Object}  object to check
     *
     * @returns {String}    - object type
     */
    typeOf: (o) => {
        if (!$J.defined(o)) { return false; }
        if (o.$J_TYPE) { return o.$J_TYPE; }

        if (!!o.nodeType) {
            if (o.nodeType === 1) { return 'element'; }
            if (o.nodeType === 3) { return 'textnode'; }
        }

        if (o === WIN) { return 'window'; }
        if (o === DOC) { return 'document'; }

        // if ((o instanceof WIN.Object || o instanceof WIN.Function) && o.constructor === $J.Class) {
        //     return 'class';
        // }

        if (o instanceof WIN.Array) { return 'array'; }
        if (o instanceof WIN.Function) { return 'function'; }
        if (o instanceof WIN.String) { return 'string'; }
        if ($J.browser.trident) {
            if ($J.defined(o.cancelBubble)) { return 'event'; }
        } else {
            //if ( o instanceof WIN.Event || o === WIN.event || o.constructor == WIN.MouseEvent ) { return 'event'; }
            // eslint-disable-next-line
            if (o === WIN.event || o.constructor == WIN.Event || o.constructor == WIN.MouseEvent || o.constructor == WIN.UIEvent || o.constructor == WIN.KeyboardEvent || o.constructor == WIN.KeyEvent) { return 'event'; }
        }
        if (o instanceof WIN.Date) { return 'date'; }
        if (o instanceof WIN.RegExp) { return 'regexp'; }

        if (o.length && o.item) { return 'collection'; }
        if (o.length && o.callee) { return 'arguments'; }

        return typeof (o);
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
    extend: (o, p) => {
        if (!(o instanceof WIN.Array)) {
            o = [o];
        }
        if (!p) { return o[0]; }

        for (let i = 0, l = o.length; i < l; i++) {
            if (!$J.defined(o)) { continue; }

            // for ( const k in (p || {}) ) {
            for (const k in p) {
                if (!Object.prototype.hasOwnProperty.call(p, k)) {
                    continue;
                }
                try {
                    o[i][k] = p[k];
                } catch (x) {
                    // empty
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
    implement: (o, p) => {
        if (!(o instanceof WIN.Array)) {
            o = [o];
        }

        for (let i = 0, l = o.length; i < l; i++) {
            if (!$J.defined(o[i])) {
                continue;
            }

            if (!o[i].prototype) {
                continue;
            }

            for (const k in (p || {})) {
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
    nativize: (o, p) => {
        if (!$J.defined(o)) {
            return o;
        }

        for (const k in (p || {})) {
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
    $try: (...args) => {
        for (let i = 0, l = args.length; i < l; i++) {
            try {
                return args[i]();
            } catch (e) {
                // empty
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
    $A: (o) => {
        if (!$J.defined(o)) { return $J.$([]); }
        if (o.toArray) { return $J.$(o.toArray()); }
        if (o.item) {
            let l = o.length || 0;
            const a = new Array(l);
            while (l--) { a[l] = o[l]; }

            return $J.$(a);
        }
        return $J.$(Array.prototype.slice.call(o));
    },


    /**
     * Get current time in milliseconds
     *
     * @returns {Number}    - number of milliseconds since 1 January 1970 00:00:00
     */
    now: () => {
        return new Date().getTime();
    },

    detach: (o) => {
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

            default: return o;
        }

        return $J.$(r);
    },

    $: (o) => {
        let result = o;

        switch ($J.typeOf(o)) {
            case 'string': {
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
        let style;
        let sheet;
        let idx = -1;
        const rules = [];
        let rootNode = DOC.head || DOC.body;

        if (root) {
            rootNode = $(root).node || root;
        }

        if (!id) {
            id = $J.stylesId;
        }

        style = $(rootNode.querySelector('#' + id));

        if (!style) {
            style = $J.$new('style', { id: id, type: 'text/css' });
            rootNode.insertBefore(style.node, rootNode.firstChild);
        }

        // sheet = style.sheet;
        sheet = style.node.sheet;

        if (!sheet) {
            // sheet = style.styleSheet;
            sheet = style.node.styleSheet;
        }

        if ($J.typeOf(css) !== 'string') {
            for (const p in css) {
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
    removeCSS: (id, index) => {
        const style = $J.$(id);
        if ($J.typeOf(style) !== 'element') { return; }

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
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
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

        return (url) => {
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
    getHashCode: (s) => {
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
    camelize: (str) => {
        return str.replace(/-\D/g, (m) => {
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
        return str.replace(/[A-Z]/g, (m) => {
            return ('-' + m.charAt(0).toLowerCase());
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
const EVENTS_MAP = {};

// Shortcut for userAgent
const _UA = navigator.userAgent.toLowerCase();
const _engine = _UA.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);
const _version = _UA.match(/(edge|opr)\/(\d+\.?\d*)/i) || _UA.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);
const _safariVer =  _UA.match(/version\/(\d+\.?\d*)/i);
// Shortcut for document style property for further references
const docStyles = DOC.documentElement.style;


const isSupported = (p) => {
    const pp = p.charAt(0).toUpperCase() + p.slice(1);
    return p in docStyles
            || ('Webkit' + pp) in docStyles
            || ('Moz' + pp) in docStyles
            || ('ms' + pp) in docStyles
            || ('O' + pp) in docStyles;
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
        xpath: !!(DOC.evaluate),
        air: !!(WIN.runtime),
        query: !!(DOC.querySelector),
        fullScreen: !!(DOC.fullscreenEnabled || DOC.msFullscreenEnabled || DOC.exitFullscreen
                    || DOC.cancelFullScreen || DOC.webkitexitFullscreen || DOC.webkitCancelFullScreen
                    || DOC.mozCancelFullScreen || DOC.oCancelFullScreen || DOC.msCancelFullScreen),
        xhr2: !!(WIN.ProgressEvent) && !!(WIN.FormData) && (WIN.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest),
        transition: isSupported('transition'),
        transform: isSupported('transform'),
        perspective: isSupported('perspective'),
        animation: isSupported('animation'),
        requestAnimationFrame: false,
        multibackground: false,
        cssFilters: false,
        canvas: false,
        svg: (() => { return DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'); })()
    },

    /**
     * Touch screen support
     */
    touchScreen: (() => {
        return 'ontouchstart' in WIN || (WIN.DocumentTouch && DOC instanceof DocumentTouch)
                || (navigator.maxTouchPoints > 0)
                || (navigator.msMaxTouchPoints > 0);
    })(),

    /**
     * Mobile device?
     */
    mobile: !!_UA.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),

    /**
     * Browser engine
     */
    engine: (() => {
        let result = 'unknown';

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
    })(),

    /**
     * Browser engine version
     */
    version: (_engine && _engine[2]) ? parseFloat(_engine[2]) : 0,

    /**
     * Browser name & version
     */
    uaName: (_version && _version[1]) ? _version[1].toLowerCase() : '',
    uaVersion: (_version && _version[2]) ? parseFloat(_version[2]) : 0,

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
    platform: (() => {
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
    })(),

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
    getDoc: () => { return (DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat') ? DOC.body : DOC.documentElement; },


    /**
     * Reference to the requestAnimationFrame method (if any)
     */
    requestAnimationFrame: WIN.requestAnimationFrame || WIN.mozRequestAnimationFrame || WIN.webkitRequestAnimationFrame
                            || WIN.oRequestAnimationFrame || WIN.msRequestAnimationFrame || UND,

    /**
     * Reference to the cancelAnimationFrame method (if any)
     */
    cancelAnimationFrame: WIN.cancelAnimationFrame || WIN.mozCancelAnimationFrame || WIN.mozCancelAnimationFrame
                            || WIN.oCancelAnimationFrame || WIN.msCancelAnimationFrame
                            || WIN.webkitCancelRequestAnimationFrame
                            || UND,

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
    onready: () => {
        if ($J.browser.ready) { return; }

        let node;
        let style;

        $J.browser.ready = true;

        try { // Calculate width of browser's scrollbars
            const tmp = $J.$new('div').setCss({
                width: 100,
                height: 100,
                overflow: 'scroll',
                position: 'absolute',
                top: -9999
            }).appendTo(DOC.body);
            $J.browser.scrollbarsWidth = tmp.offsetWidth - tmp.clientWidth;
            tmp.remove();
        } catch (ex) {
            // empty
        }

        try { // Test multiple background support
            node = $J.$new('div');
            style = node.style;

            style.cssText = 'background:url(https://),url(https://),red url(https://)';
            $J.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(style.background);
            style = null;
            node = null;
        } catch (ex) {
            // empty
        }

        if (!$J.browser.cssTransformProp) {
            $J.browser.cssTransformProp = $J.dashize($J.normalizeCSS('transform'));
        }

        try { // Test CSS filters support
            node = $J.$new('div');
            node.style.cssText = $J.dashize($J.normalizeCSS('filter')) + ':blur(2px);';
            $J.browser.features.cssFilters = !!node.style.length && (!$J.browser.ieMode || $J.browser.ieMode > 9);
            node = null;
        } catch (ex) {
            // empty
        }

        if (!$J.browser.features.cssFilters) {
            $J.$(DOC.documentElement).addClass('no-cssfilters-magic');
        }

        try { // Test Canvas support
            $J.browser.features.canvas = (() => {
                const tmp = $J.$new('canvas');
                return !!(tmp.getContext && tmp.getContext('2d'));
            })();
        } catch (ex) {
            // empty
        }


        if (WIN.TransitionEvent === UND && WIN.WebKitTransitionEvent !== UND) {
            EVENTS_MAP['transitionend'] = 'webkitTransitionEnd';
        }

        $J.$(DOC).callEvent('domready');
    }
};

(() => {
    let i;
    const magicClasses = []; // Extra CSS classes applied to <html> (e.g. lt-ie9-magic, mobile-magic)

    switch ($J.browser.engine) {
        case 'trident':
            if (!$J.browser.version) {
                $J.browser.version = !!(WIN.XMLHttpRequest) ? 3 : 2;
            }
            break;
        case 'gecko':
            $J.browser.version = (_version && _version[2]) ? parseFloat(_version[2]) : 0;
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
    if ($J.browser.uaName === 'safari' && (_safariVer && _safariVer[1])) {
        $J.browser.uaVersion = parseFloat(_safariVer[1]);
    }

    if ($J.browser.platform === 'android' && $J.browser.webkit && (_safariVer && _safariVer[1])) {
        $J.browser.androidBrowser = true;
    }

    // browser prefixes
    const prefixes = ({
        gecko: ['-moz-', 'Moz', 'moz'],
        webkit: ['-webkit-', 'Webkit', 'webkit'],
        trident: ['-ms-', 'ms', 'ms'],
        presto: ['-o-', 'O', 'o']
    })[$J.browser.engine] || ['', '', ''];

    $J.browser.cssPrefix = prefixes[0];
    $J.browser.cssDomPrefix = prefixes[1];
    $J.browser.domPrefix = prefixes[2];

    $J.browser.ieMode = (() => {
        let result;

        if (!$J.browser.trident) {
            result = UND;
        } else if (DOC.documentMode) {
            result = DOC.documentMode;
        } else if ($J.browser.backCompat) {
            result = 5;
        } else {
            let v = 0;

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
    })();

    // Mobile Safari engine in the “request desktop site” mode on iOS/iPadOS.
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

    if ($J.browser.ieMode) { // Add CSS class of the IE version to <html> for possible tricks
        $J.browser.uaName = 'ie';
        $J.browser.uaVersion = $J.browser.ieMode;

        magicClasses.push('ie' + $J.browser.ieMode + '-magic');
        for (i = 11; i > $J.browser.ieMode; i--) {
            magicClasses.push('lt-ie' + i + '-magic');
        }
    }

    if ($J.browser.webkit && $J.browser.version < 536) { // Disable fullscreen in old Safari
        $J.browser.features.fullScreen = false;
    }

    if ($J.browser.requestAnimationFrame) { // Enable native requestAnimationFrame if it works (issue in Safari 6.1.x)
        $J.browser.requestAnimationFrame.call(WIN, () => {
            $J.browser.features.requestAnimationFrame = true;
        });
    }

    if ($J.browser.features.svg) {
        magicClasses.push('svg-magic');
    } else {
        magicClasses.push('no-svg-magic');
    }

    const exClasses = (DOC.documentElement.className || '').match(/\S+/g) || [];
    DOC.documentElement.className = $J.$(exClasses).concat(magicClasses).join(' ');

    try {
        DOC.documentElement.setAttribute('data-magic-ua', $J.browser.uaName);
        DOC.documentElement.setAttribute('data-magic-ua-ver', $J.browser.uaVersion);
        DOC.documentElement.setAttribute('data-magic-engine', $J.browser.engine);
        DOC.documentElement.setAttribute('data-magic-engine-ver', $J.browser.version);
        // DOC.documentElement.setAttribute('data-magic-features', magicClasses.join(' '));
    } catch (ex) {
        // empty
    }

    if ($J.browser.ieMode && $J.browser.ieMode < 9) { // Workaround for IE<9 to support <figure> & <figcaption> elements
        DOC.createElement('figure');
        DOC.createElement('figcaption');
    }

    // Map pointer events for IE 10.
    if (!WIN.navigator.pointerEnabled) {
        ['Down', 'Up', 'Move', 'Over', 'Out'].forEach((type) => {
            // EVENTS_MAP['pointer' + type.toLowerCase()] = WIN.navigator.msPointerEnabled ? 'MSPointer' + type : -1;
            const evt = 'pointer' + type.toLowerCase();

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

(() => {
    const getCancel = () => {
        let result = DOC.exitFullscreen ||
                     DOC.cancelFullScreen ||
                     document[$J.browser.domPrefix + 'ExitFullscreen'] ||
                     document[$J.browser.domPrefix + 'CancelFullScreen'];

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

    const callRequestFullscreen = (el) => {
        let f = el.requestFullscreen || el[$J.browser.domPrefix + 'RequestFullscreen'] || el[$J.browser.domPrefix + 'RequestFullScreen'];

        if (!f) { f = () => {}; }

        f.call(el);
    };

    const fullScreen = {
        capable: $J.browser.features.fullScreen,

        enabled: () => {
            return !!(DOC.fullscreenElement || DOC[$J.browser.domPrefix + 'FullscreenElement']
                || DOC.fullScreen || DOC.webkitIsFullScreen || DOC[$J.browser.domPrefix + 'FullScreen']);
        },

        request: (el, opts) => {
            if (!opts) {
                opts = {};
            }

            if (fullScreen.capable && !opts.windowFullscreen) {
                fullScreen.onchange = (e) => { // onfullscreenchange event
                    if (fullScreen.enabled()) { // we entered full-screen mode
                        if (opts.onEnter) {
                            opts.onEnter();
                        }
                    } else { // left fullscreen mode
                        $J.$(DOC).removeEvent(fullScreen.changeEventName, fullScreen.onchange);
                        if (opts.onExit) {
                            opts.onExit();
                        }
                    }
                };

                $J.$(DOC).addEvent(fullScreen.changeEventName, fullScreen.onchange);

                fullScreen.onerror = (e) => { // onfullscreenchange event
                    if (opts.fallback) {
                        opts.fallback();
                    }
                    $J.$(DOC).removeEvent(fullScreen.errorEventName, fullScreen.onerror);
                };

                // if native fullscreen failed, enter pseudo mode
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
const r_cssToNum = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/;

// normalize CSS names
const cssMap = {
    'float': (typeof (docStyles.styleFloat) === 'undefined') ? 'cssFloat' : 'styleFloat'
};

// Unitless CSS properties (w/o 'px')
const nopxCSS = {
    'fontWeight': true,
    'lineHeight': true,
    'opacity': true,
    'zIndex': true,
    'zoom': true
};

let getCssValue;
if (WIN.getComputedStyle) {
    getCssValue = (e, name) => {
        const css = WIN.getComputedStyle(e, null);
        return css ? css.getPropertyValue(name) || css[name] : null;
    };
} else {
    getCssValue = (e, name) => {
        const css = e.currentStyle;
        let v = null;

        v = css ? css[name] : null;

        if (v === null && e.style && e.style[name]) {
            v = e.style[name];
        }

        return v;
    };
}

// Returns normalize CSS name (probably with a vendor prefix)
const normalizeCSS = (name) => {
    let pName;

    // Webkit reports the existence of the filter property, but it can be used only with -webkit- prefix.
    const standard = ($J.browser.webkit && name === 'filter') ? false : (name in docStyles);

    // if ( !(name in docStyles) ) {
    if (!standard) {
        pName = $J.browser.cssDomPrefix + name.charAt(0).toUpperCase() + name.slice(1);
        if (pName in docStyles) {
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
        let handlers;
        // let _self;
        let _type;

        if ($J.typeOf(type) === 'string') {
            _type = type.split(' ');
            if (_type.length > 1) {
                type = _type;
            }
        }

        if ($J.typeOf(type) === 'array') {
            type.forEach((__type) => {
                // this.addEvent.call(this, __type, fn, priority, options);
                this.addEvent(__type, fn, priority, options);
            });

            return this;
        }

        // Normalize event name
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
        }

        // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});
        const events = this.fetch('_EVENTS_', {});
        handlers = events[type];

        if (!handlers) {
            // Initialize event handlers queue
            handlers = [];
            events[type] = handlers;
            // _self = this;

            if ($J.Events.handlers[type]) {
                $J.Events.handlers[type].add.call(this, options);
                // $J.Events.handlers[type].add(this, options);
            } else {
                // handlers['handle'] = function (e) {
                handlers['handle'] = (e) => {
                    e = $J.extend(e || WIN.e, { $J_TYPE: 'event' });
                    // $J.Doc.callEvent.call(_self, type, $J.$(e));
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
        handlers.sort((a, b) => { return a.priority - b.priority; });

        return this;
    }

    // removeEvent(type/*, fn */) {
    removeEvent(...args) {
        // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});
        const events = this.fetch('_EVENTS_', {});
        let fnObj;
        let k;
        let _type;
        // let del;
        let type = args[0];

        // const fn = arguments.length > 1 ? arguments[1] : -100;
        const fn = args.length > 1 ? args[1] : -100;
        if ($J.typeOf(type) === 'string') {
            _type = type.split(' ');
            if (_type.length > 1) {
                type = _type;
            }
        }

        if ($J.typeOf(type) === 'array') {
            // $J.$(type).each(this.removeEvent.bindAsEvent(this, fn));
            type.forEach((__type) => {
                this.removeEvent(__type, fn);
            });

            return this;
        }

        // Normalize event name
        type = EVENTS_MAP[type] || type;

        if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {
            return this;
        }

        const handlers = events[type] || [];

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
    }

    callEvent(type, e) {
        const events = this.fetch('_EVENTS_', {});
        let k;

        // Normalize event name
        type = EVENTS_MAP[type] || type;

        if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {
            // return this;
        } else {
            try {
                if (!e || !e.type) {
                    e = $J.extend(e || {}, { type: type });
                }
            } catch (ev) {
                // empty
            }

            if (e.timeStamp === UND) {
                e.timeStamp = $J.now();
            }

            const handlers = events[type] || [];
            for (k = 0; k < handlers.length && !(e.isQueueStopped && e.isQueueStopped()); k++) {
                handlers[k].fn.call(this, e);
            }
        }
    }

    raiseEvent(type, name) {
        const _native = (type !== 'domready');
        let o = this;
        let e;

        // Normalize event name
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
    }

    clearEvents() {
        // const events = $J.Doc.fetch.call(this, '_EVENTS_');
        const events = this.fetch('_EVENTS_');

        if (!events) { return this; }

        for (const _type in events) {
            if (Object.prototype.hasOwnProperty.call(events, _type)) {
                // $J.Doc.removeEvent.call(this, _type);
                this.removeEvent(_type);
            }
        }

        // $J.Doc.del.call(this, '_EVENTS_');
        this.del('_EVENTS_');

        return this;
    }
}

class Element extends Base {
    constructor(node) {
        super(node);
        this.$J_TYPE = 'magicjs-element';
    }

    // Full screen
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
    addClass(val) {
        val = val ? val.split(' ') : [''];
        val.forEach((v) => {
            v = v.trim();
            if (v) {
                this.node.classList.add(v);
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
    toggleClass(val) {
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
    getCss(p) {
        const cssName = $J.camelize(p);
        let v = null;

        if (!cssMap[cssName]) {
            cssMap[cssName] = normalizeCSS(cssName);
        }

        p = cssMap[cssName];

        // p = cssMap[cssName] || (cssMap[cssName] = normalizeCSS(cssName));
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
    setCssProp(k, v) {
        const cssName = $J.camelize(k);

        try {
            if (!cssMap[cssName]) {
                cssMap[cssName] = normalizeCSS(cssName);
            }

            k = cssMap[cssName];

            // k = cssMap[cssName] || (cssMap[cssName] = normalizeCSS(cssName));
            this.node.style[k] = v + (($J.typeOf(v) === 'number' && !nopxCSS[cssName]) ? 'px' : '');
        } catch (e) {
            // empty
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
        for (const s in styles) {
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
    getStyles(...args) {
        const r = {};

        args.forEach((k) => {
            r[k] = this.getCss(k);
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
    setProps(props) {
        for (const p in props) {
            if (p === 'class') {
                this.addClass('' + props[p]);
            } else {
                this.node.setAttribute(p, '' + props[p]);
            }
        }
        return this;
    }

    getTransitionDuration() {
        let duration = 0;
        let delay = 0;

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
    getSize() {
        return { 'width': this.node.offsetWidth, 'height': this.node.offsetHeight };
    }

    /**
     * Gets inner size of element
     *
     * @param  [withPadding=false] {Boolean} include padding in returning size
     *
     * @returns {Hash} Size of the element  {width: x, height: x}
     */
    getInnerSize(withPadding) {
        const size = this.getSize();

        size.width -= (parseFloat(this.getCss('border-left-width') || 0) + parseFloat(this.getCss('border-right-width') || 0));
        size.height -= (parseFloat(this.getCss('border-top-width') || 0) + parseFloat(this.getCss('border-bottom-width') || 0));

        if (!withPadding) {
            size.width -= (parseFloat(this.getCss('padding-left') || 0) + parseFloat(this.getCss('padding-right') || 0));
            size.height -= (parseFloat(this.getCss('padding-top') || 0) + parseFloat(this.getCss('padding-bottom') || 0));
        }

        return size;
    }

    /**
     * Gets scroll offsets
     *
     * @returns {Hash} Number of pixels that element has been scrolled upward and to the left
     */
    getScroll() {
        return { 'top': this.node.scrollTop, 'left': this.node.scrollLeft };
    }

    /**
     * Gets scroll offsets from the window top left corner
     *
     * @returns {Hash}
     */
    getFullScroll() {
        let el = this.node;
        const p = { 'top': 0, 'left': 0 };

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
    getPosition() {
        let el = this.node;
        let l = 0;
        let t = 0;

        if ($J.defined(DOC.documentElement.getBoundingClientRect)) {
            const b = this.node.getBoundingClientRect();
            const docScroll = $J.$(DOC).getScroll();
            const doc = $J.browser.getDoc();
            return {
                'top':  b.top + docScroll.y - doc.clientTop,
                'left': b.left + docScroll.x - doc.clientLeft
            };
        }

        do {
            l += el.offsetLeft || 0;
            t += el.offsetTop || 0;
            el = el.offsetParent;
        } while (el && !(/^(?:body|html)$/i).test(el.tagName));

        return { 'top': t, 'left': l };
    }

    /**
     * Gets element's absolute coordinates on a page
     *
     * @returns {Hash}  top/left/bottom/right coordinates
     */
    getRect() {
        const p = this.getPosition();
        const s = this.getSize();

        return { 'top': p.top, 'bottom': p.top + s.height, 'left': p.left, 'right': p.left + s.width };
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
        }

        // TODO remove from storage

        return result;
    }

    /**
     * Kills element by removes it DOM tree and clear all events.
     * All child elements will be killed too.
     *
     * @returns Null
     */
    kill() {
        $J.$A(this.node.childNodes).forEach((o) => {
            if (o.nodeType === 3 || o.nodeType === 8) { return; }
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


    getTagName() {
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
    getSize() {
        if ($J.browser.touchScreen || $J.browser.presto925 || $J.browser.webkit419) {
            return { 'width': WIN.innerWidth, 'height': WIN.innerHeight };
        }

        return { 'width': $J.browser.getDoc().clientWidth, 'height': $J.browser.getDoc().clientHeight };
    }

    /**
     * Gets window scroll offsets
     */
    getScroll() {
        return { 'x': WIN.pageXOffset || $J.browser.getDoc().scrollLeft, 'y': WIN.pageYOffset || $J.browser.getDoc().scrollTop };
    }

    /**
     * Get full page size including scroll
     */
    getFullSize() {
        const s = this.getSize();
        return { 'width': Math.max($J.browser.getDoc().scrollWidth, s.width), 'height': Math.max($J.browser.getDoc().scrollHeight, s.height) };
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

    getOriginEvent() {
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
                this.oe.stopPropagation();
            // }
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
    getClientXY() {
        let src;
        let result = { x: 0, y: 0 };

        if ((/touch/i).test(this.type)) {
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
    getPageXY() {
        let src;
        let result = { x: 0, y: 0 };

        if ((/touch/i).test(this.type)) {
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
    getTarget() {
        let t = this.oe.target;

        if (!t) {
            t = this.oe.srcElement;
        }

        while (t && t.nodeType === 3) { t = t.parentNode; }

        return t;
    }

    /**
     * Return related element.
     * @return {Element}
     */
    getRelated() {
        let r = null;

        switch (this.type) {
            case 'mouseover':
            case 'pointerover':
            case 'MSPointerOver':
                r = this.oe.relatedTarget;
                if (!r) { r = this.oe.fromElement; }
                break;

            case 'mouseout':
            case 'pointerout':
            case 'MSPointerOut':
                r = this.oe.relatedTarget;
                if (!r) { r = this.oe.toElement; }
                break;

            default:
                return r;
        }
        try {
            while (r && r.nodeType === 3) { r = r.parentNode; }
        } catch (ex) { r = null; }


        return r;
    }

    /**
     * Return clicked button
     *  1 - left, 2 - middle, 3 - right
     *
     * @returns  {integer}   button index
     */
    getButton() {
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
        return (this.oe.pointerType && (this.oe.pointerType === 'touch' || this.oe.pointerType === this.oe.MSPOINTER_TYPE_TOUCH))
                || (/touch/i).test(this.type);
    }

    /**
     * Return true if it's a primary Touch/Pointer event.
     * @return {Boolean}
     */
    isPrimaryTouch() {
        if (this.oe.pointerType) {
            return (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType) && this.oe.isPrimary;
        } else if (this.oe instanceof WIN.TouchEvent) {
            return this.oe.changedTouches.length === 1
                    && (this.oe.targetTouches.length ? this.oe.targetTouches[0].identifier === this.oe.changedTouches[0].identifier : true);
        }

        return false;
    }

    /**
     * Return reference to the primary Touch/Pointer event.
     * @return {Object}
     */
    getPrimaryTouch() {
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
    getPrimaryTouchId() {
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
        // this.target = this.magicEvent.oe.target;
        this.x = this.magicEvent.oe.x;
        this.y = this.magicEvent.oe.y;
        this.button = this.magicEvent.getButton();
        this.timeStamp = this.magicEvent.oe.timeStamp;
        this.relatedTarget = this.magicEvent.getRelated();
        this.isQueueStopped = this.magicEvent.isQueueStopped; // TODO $J.$false
        this.events = [];
    }

    getOriginEvent() {
        return this.magicEvent.getOriginEvent();
    }

    pushToEvents(e) {
        const eventCopy = e;
        this.events.push(eventCopy);
    }

    stop() {
        return this.stopDistribution().stopDefaults();
    }

    stopDistribution() {
        this.events.forEach((e) => {
            try {
                e.stopDistribution();
            } catch (ex) {
                // empty
            }
        });

        return this;
    }

    stopDefaults() {
        this.events.forEach((e) => {
            try {
                e.stopDefaults();
            } catch (ex) {
                // empty
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
    getClientXY() {
        return { x: this.clientX || this.magicEvent.oe.clientX, y: this.clientY || this.magicEvent.oe.clientY };
    }

    /**
     * Return mouse/pointer coordinates relative to the viewport, including scroll offset.
     * @return {Object}
     */
    getPageXY() {
        return { x: this.x, y: this.y };
    }

    getTarget() {
        return this.target || this.magicEvent.oe.target;
    }

    getRelated() {
        return this.relatedTarget;
    }

    getButton() {
        return this.button;
    }

    getOriginalTarget() {
        let result = UND;

        if (this.events.length > 0) {
            result = this.events[0].getTarget();
        }

        return result;
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
    getPrimaryTouch() {
        return this.magicEvent.getPrimaryTouch();
    }

    /**
     * Return identifier of the primary Touch/Pointer event.
     * @return {Int}
     */
    getPrimaryTouchId() {
        return this.magicEvent.getPrimaryTouchId();
    }
}

$J.Events.Custom = Custom;
$J.Events.handlers = {};


/**
 * Dom ready custom event implementation
 */

(($J) => {
    if (DOC.readyState === 'interactive' || DOC.readyState === 'complete') {
        setTimeout(() => $J.browser.onready(), 0);
    } else {
        $J.$(DOC).addEvent('readystatechange', (event) => {
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


(($J) => {
    const RADIUS_THRESHOLD = 5; // Click radius  // Click speed threshold
    const TIME_THRESHOLD = 300; // Click speed threshold

    class BtnClick extends $J.Events.Custom {
        constructor(e, target) {
            super(e);
            const r = e.getPageXY();
            this.type = 'btnclick';
            this.x = r.x;
            this.y = r.y;
            this.clientX = e.oe.clientX;
            this.clientY = e.oe.clientY;
            this.target = target.node;

            this.pushToEvents(e);
        }
    }

    const _options = {
        threshold: TIME_THRESHOLD, // Click speed threshold
        button: 1 // left button
    };

    const onclick = function (e) { e.stopDefaults(); };

    const handle = function (e) {
        let btnclickEvent;
        let r;

        const options = this.fetch('event:btnclick:options');

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

            btnclickEvent.pushToEvents(e);

            // if (e.timeStamp - btnclickEvent.timeStamp <= options.threshold && btnclickEvent.x == r.x && btnclickEvent.y == r.y) {
            if (e.timeStamp - btnclickEvent.timeStamp <= options.threshold &&
                Math.sqrt(Math.pow(r.x - btnclickEvent.x, 2) + Math.pow(r.y - btnclickEvent.y, 2)) <= RADIUS_THRESHOLD
            ) {
                this.callEvent('btnclick', btnclickEvent);
            }

            // Release mousedrag event
            $(DOC).callEvent('mouseup', e);
        } else if (e.type === 'dblclick') { // fire another btnclick because IE doesn't fire second mousedown on double click (and second click too)
            btnclickEvent = new BtnClick(e, this);
            this.callEvent('btnclick', btnclickEvent);
        }
    };

    const handler = {
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


(($J) => {
    class Mousedrag extends $J.Events.Custom {
        constructor(e, target, state) {
            super(e);
            const r = e.getPageXY();
            this.x = r.x;
            this.y = r.y;
            this.type = 'mousedrag';
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.target = target.node;

            this.state = state; // dragmove / dragend
            this.dragged = false;

            this.pushToEvents(e);
        }
    }

    const handleMouseDown = function (e) {
        if (e.getButton() !== 1) {
            return;
        }
        // e.stopDefaults();

        const dragEvent = new Mousedrag(e, this, 'dragstart');

        this.store('event:mousedrag:dragstart', dragEvent);

        // this.callEvent('mousedrag', dragEvent);
    };

    const handleMouseUp = function (e) {
        let dragEvent;

        dragEvent = this.fetch('event:mousedrag:dragstart');

        if (!dragEvent) {
            return;
        }
        e.stopDefaults();

        dragEvent = new Mousedrag(e, this, 'dragend');

        this.del('event:mousedrag:dragstart');

        this.callEvent('mousedrag', dragEvent);
    };

    const handleMouseMove = function (e) {
        let dragEvent;

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

    const handler = {
        add: function () {
            const move = handleMouseMove.bind(this);
            const end = handleMouseUp.bind(this);

            this.addEvent('mousedown', handleMouseDown, 1);
            this.addEvent('mouseup', handleMouseUp, 1);

            $(DOC).addEvent('mousemove', move, 1);
            $(DOC).addEvent('mouseup', end, 1);

            this.store('event:mousedrag:listeners:document:move', move);
            this.store('event:mousedrag:listeners:document:end', end);
        },

        remove: function () {
            const f = () => {};

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


(($J) => {
    class Dblbtnclick extends $J.Events.Custom {
        constructor(e, target) {
            super(e);
            const r = e.getPageXY();
            this.x = r.x;
            this.y = r.y;
            this.type = 'dblbtnclick';
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.target = target.node;

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
        const options = this.fetch('event:dblbtnclick:options');

        if (!event) { // first click
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

            if (!event.timedout) { // double click detected within threshold timeout
                event.pushToEvents(e);
                e.stopQueue().stop();
                this.callEvent('dblbtnclick', event);
            } else { // double click timed out
            }
        }
    };

    const handler = {
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


(($J) => {
    // Tap thresholds
    const RADIUS_THRESHOLD = 10;
    const TIME_THRESHOLD = 200;

    class Tap extends $J.Events.Custom {
        constructor(e, target) {
            super(e);

            const touch = e.getPrimaryTouch();
            this.type = 'tap';
            this.id = touch.pointerId || touch.identifier;
            this.x = touch.pageX;
            this.y = touch.pageY;
            this.pageX = touch.pageX;
            this.pageY = touch.pageY;
            this.clientX = touch.clientX;
            this.clientY = touch.clientY;
            this.button = 0;
            this.target = target.node;

            this.pushToEvents(e);
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

        this.store('event:tap:event', new Tap(e, this));

        // Prevent btnclick event
        this.store('event:btnclick:ignore', true);
    };

    const onTouchEnd = function (e) {
        // let now = $J.now();
        const event = this.fetch('event:tap:event');
        // let options = this.fetch('event:tap:options');

        if (!event || !e.isPrimaryTouch()) {
            return;
        }

        this.del('event:tap:event');

        if (event.id === e.getPrimaryTouchId() && e.timeStamp - event.timeStamp <= TIME_THRESHOLD
            && Math.sqrt(
                Math.pow(e.getPrimaryTouch().pageX - event.x, 2) + Math.pow(e.getPrimaryTouch().pageY - event.y, 2)
            ) <= RADIUS_THRESHOLD
        ) {
            this.del('event:btnclick:btnclickEvent');
            e.stop();
            event.pushToEvents(e);
            this.callEvent('tap', event);
        }
    };

    const handler = {
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


(($J) => {
    class Dbltap extends $J.Events.Custom {
        constructor(e, target) {
            super(e);
            this.type = 'dbltap';
            this.x = e.x;
            this.y = e.y;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.target = target.node;
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
        const options = this.fetch('event:dbltap:options');

        if (!event) { // first tap
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

            if (!event.timedout) { // double tap detected within threshold timeout
                event.pushToEvents(e);
                e.stopQueue().stop();
                this.callEvent('dbltap', event);
            } else { // double tap timed out
            }
        }
    };


    const handler = {
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


(($J) => {
    const RADIUS_THRESHOLD = 10;

    class Touchdrag extends $J.Events.Custom {
        constructor(e, target, state) {
            super(e);
            const touch = e.getPrimaryTouch();
            this.type = 'touchdrag';
            this.id = touch.pointerId || touch.identifier;
            this.clientX = touch.clientX;
            this.clientY = touch.clientY;
            this.pageX = touch.pageX;
            this.pageY = touch.pageY;
            this.x = touch.pageX;
            this.y = touch.pageY;
            this.button = 0;
            this.target = target.node;

            this.state = state; // dragmove / dragend
            this.dragged = false;

            this.pushToEvents(e);
        }
    }

    const onTouchStart = function (e) {
        // if ( !isPrimaryTouch(e) ) {
        if (!e.isPrimaryTouch()) {
            return;
        }

        const dragEvent = new Touchdrag(e, this, 'dragstart');

        this.store('event:touchdrag:dragstart', dragEvent);
    };

    const onTouchEnd = function (e) {
        let dragEvent;

        dragEvent = this.fetch('event:touchdrag:dragstart');

        if (!dragEvent || !dragEvent.dragged || dragEvent.id !== e.getPrimaryTouchId()) {
            return;
        }

        dragEvent = new Touchdrag(e, this, 'dragend');

        this.del('event:touchdrag:dragstart');

        this.callEvent('touchdrag', dragEvent);
    };

    const onTouchMove = function (e) {
        let dragEvent;

        dragEvent = this.fetch('event:touchdrag:dragstart');

        if (!dragEvent || !e.isPrimaryTouch()) {
            return;
        }

        if (dragEvent.id !== e.getPrimaryTouchId()) {
            this.del('event:touchdrag:dragstart');
            return;
        }

        if (!dragEvent.dragged
            && Math.sqrt(
                Math.pow(e.getPrimaryTouch().pageX - dragEvent.x, 2) + Math.pow(e.getPrimaryTouch().pageY - dragEvent.y, 2)
            ) > RADIUS_THRESHOLD
        ) {
            dragEvent.dragged = true;
            this.callEvent('touchdrag', dragEvent); // send dragstart
        }
        if (!dragEvent.dragged) { return; }

        dragEvent = new Touchdrag(e, this, 'dragmove');
        this.callEvent('touchdrag', dragEvent);
    };


    const handler = {
        add: function () {
            const move = onTouchMove.bind(this);
            const end = onTouchEnd.bind(this);

            this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1);
            this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);
            this.addEvent(['touchmove', 'pointermove'], onTouchMove, 1);

            this.store('event:touchdrag:listeners:document:move', move);
            this.store('event:touchdrag:listeners:document:end', end);

            $(DOC).addEvent('pointermove', move, 1);
            $(DOC).addEvent('pointerup', end, 1);
        },

        remove: function () {
            const f = () => {};

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

(($J) => {
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

        variables.points = [ts[0], ts[1]];

        // result = Math.PI * Math.pow(distance({ x: ts[0].pageX, y: ts[1].pageX }, { x: ts[0].pageY, y: ts[1].pageY }) / 2, 2);
        // result = Math.pow(Math.max(diffX, diffY), 2);

        result = Math.pow(distance(
            {
                x: ts[0].pageX,
                y: ts[0].pageY
            },

            {
                x: ts[1].pageX,
                y: ts[1].pageY
            }
        ), 2);
        // result = (Math.abs(ts[0].pageX - ts[1].pageX) || 1) * (Math.abs(ts[0].pageY - ts[1].pageY) || 1);

        variables.centerPoint = { x: _x, y: _y };

        variables.x = variables.centerPoint.x;
        variables.y = variables.centerPoint.y;

        return result;
    };

    const getScale = (space) => { return space / baseSpace; };

    const getTouches = (e, cache) => {
        let result;
        const originEvent = e.getOriginEvent();

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
                cache.forEach((v) => {
                    result.push(v);
                });
            }
        }

        return result;
    };

    const cacheEvent = (e, cache, justSame) => {
        let result = false;

        if (e.pointerId && e.pointerType === 'touch' && (!justSame || cache.has(e.pointerId))) {
            cache.set(e.pointerId, e);
            result = true;
        }
        return result;
    };

    const removeCache = (e, cache) => {
        if (e.pointerId && e.pointerType === 'touch' && cache && cache.has(e.pointerId)) {
            // compressor does not want to compress
            cache['delete'](e.pointerId);
        }
    };

    const getEventId = (e) => {
        var result;

        if (e.pointerId && e.pointerType === 'touch') {
            result = e.pointerId;
        } else {
            result = e.identifier;
        }

        return result;
    };

    const addActivePoints = (targetTouches, container) => {
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

    const getIds = (targetTouches) => {
        var result = [];

        targetTouches.forEach(function (value) {
            result.push(getEventId(value));
        });

        return result;
    };

    const removeActivePoint = (targetTouches, container) => {
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

    const getActivePoints = (targetTouches, container) => {
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

    const removePinchEnd = (el) => {
        const target = el.fetch('event:pinch:target');
        if (target) { target.removeEvent(['touchend'], el.fetch('event:pinch:listeners:document:end')); }
        el.del('event:pinch:target');
    };

    const clearCache = (el) => {
        const cache = el.fetch('event:pinch:cache');
        if (cache) { cache.clear(); }
        el.del('event:pinch:cache');
    };

    class Pinch extends $J.Events.Custom {
        constructor(e, target, state, variables) {
            super(e);
            this.type = 'pinch';

            this.target = target.node;
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
        centerPoint: { x: 0, y: 0 }
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
    };

    // const onClick = function (e) { e.stop(); };

    const onTouchMove = function (e) {
        let pinchEvent;
        let variables = this.fetch('event:pinch:variables');
        const cache = this.fetch('event:pinch:cache');
        const currentActivePoints = this.fetch('event:pinch:activepoints');

        if (!variables) {
            variables = $J.extend({}, $J.detach(_variables));
        }

        if (variables.started) {
            if (e.pointerId && !cacheEvent(e, cache, true)) { return; }
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

        if (e.pointerType === 'mouse') { return; }

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
        const targetTouches = getTouches(e, cache);
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

    const onTouchEnd = function (e) {
        let pinchEvent;
        let _event;
        const cache = this.fetch('event:pinch:cache');

        if (e.pointerType === 'mouse' || e.pointerId && (!cache || !cache.has(e.pointerId))) { return; }

        pinchEvent = this.fetch('event:pinch:pinchstart');
        const variables = this.fetch('event:pinch:variables');
        const currentActivePoints = this.fetch('event:pinch:activepoints');

        const targetTouches = getTouches(e, cache);
        removeCache(e, cache);

        const removingResult = removeActivePoint(targetTouches, currentActivePoints);

        if (!pinchEvent || (!variables || !variables.started) || !removingResult || !currentActivePoints) { return; }

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

    const handler = {
        add: function (options) {
            if (!baseSpace) {
                baseSpace = (() => {
                    const s = $J.W.getSize();
                    s.width = Math.min(s.width, s.height);
                    s.height = s.width;
                    // var s = { width: 375, height: 812 };
                    return Math.pow(distance({ x: 0, y: 0 }, { x: s.width, y: s.height }), 2);
                })();
            }

            const move = onTouchMove.bind(this);
            const end = onTouchEnd.bind(this);

            // this.addEvent(['click', 'tap'], onClick, 1);
            this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1);
            // this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);
            this.addEvent(['pointerup'], onTouchEnd, 1);
            this.addEvent(['touchmove', 'pointermove'], onTouchMove, 1);


            this.store('event:pinch:listeners:document:move', move);
            this.store('event:pinch:listeners:document:end', end);

            $(DOC).addEvent('pointermove', move, 1);
            $(DOC).addEvent('pointerup', end, 1);
        },

        remove: function () {
            const f = () => {};

            // this.removeEvent(['click', 'tap'], onClick);
            this.removeEvent(['touchstart', 'pointerdown'], onTouchStart);
            // this.removeEvent(['touchend', 'pointerup'], onTouchEnd);
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


(($J) => {
    let eventType = 'wheel';

    if (!('onwheel' in DOC || $J.browser.ieMode > 8)) {
        eventType = 'mousewheel';
    }

    class Mousescroll extends $J.Events.Custom {
        constructor(e, target, delta, deltaX, deltaY, deltaZ, deltaFactor) {
            super(e);
            const r = e.getPageXY();
            this.x = r.x;
            this.y = r.y;
            this.type = 'mousescroll';
            // this.timeStamp = e.timeStamp;
            this.target = target.node;

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
        return (deltaFactor > 50)
            || (deltaMode === 1 && !($J.browser.platform === 'win' && deltaFactor < 1)) // Firefox
            || (deltaFactor % 12 === 0) // Safari
            || (deltaFactor % 4.000244140625 === 0); // Chrome on OS X
    };

    const handle = function (e) {
        let delta = 0;
        let deltaX = 0;
        let deltaY = 0;
        let absDelta = 0;
        const originEvent = e.getOriginEvent();

        // DomMouseScroll event
        if (originEvent.detail) {
            deltaY = e.detail * -1;
        }

        // mousewheel event
        if (originEvent.wheelDelta !== UND) { deltaY = originEvent.wheelDelta; }
        if (originEvent.wheelDeltaY !== UND) { deltaY = originEvent.wheelDeltaY; }
        if (originEvent.wheelDeltaX !== UND) { deltaX = originEvent.wheelDeltaX * -1; }


        // wheel event
        if (originEvent.deltaY) { deltaY = -1 * originEvent.deltaY; }
        if (originEvent.deltaX) { deltaX = originEvent.deltaX; }

        if (deltaY === 0 && deltaX === 0) {
            return;
        }
        delta = deltaY === 0 ? deltaX : deltaY;

        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
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

$J.DPPX = (window.devicePixelRatio >= 2) ? 2 : 1; // Dots per px. 2 - is equal to Retina.;

return magicJS;
}());

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

(($J) => {
    if (!$J) {
        throw 'MagicJS not found';
    }
    if ($J.FX) { return; }

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

        elasticOut:(p, x) => {
            return 1 - TRANSITION.elasticIn(1 - p, x);
        },

        bounceIn: (p) => {
            for (let a = 0, b = 1; 1; a += b, b /= 2) {
                if (p >= (7 - 4 * a) / 11) {
                    return b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
                }
            }
        },

        bounceOut: (p) => {
            return 1 - TRANSITION.bounceIn(1 - p);
        },

        none: (x) => {
            return 0;
        },
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
    class FX {
        constructor(el /* can be array */, opt) {
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
                direction: 'normal', // normal | reverse | alternate | alternate-reverse | continuous | continuous-reverse
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

            el.forEach((_el) => {
                if (_el) {
                    this.els.push($(_el));
                }
            });

            this.options = $J.extend(this.options, opt);
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
            this.options.transition = easing;
            // this.easeFn = this.cubicBezierAtTime;
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
        start(styles /**Hash*/) {
            const runits = /\%$/;
            let s;
            let i;
            if (this.state === 2) { return this; }

            this.state = 1;
            this.cycle = 0;

            this.alternate = $J.contains(['alternate', 'alternate-reverse'], this.options.direction);
            this.continuous = $J.contains(['continuous', 'continuous-reverse'], this.options.direction);

            if (!styles) { styles = {}; }

            if (!Array.isArray(styles)) {
                styles = [styles];
            }

            this.styles = styles;

            const l = this.styles.length;

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

            if (this.options.duration === 0) { // apply all styles immediately
                this.render(1.0);
                this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els);
            } else {
                this.state = 2;
                if (!this.options.forceAnimation && $J.browser.features.requestAnimationFrame) {
                    this.timer = $J.browser.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
                } else {
                    this.timer = setInterval(() => { this.loop(); }, Math.round(1000 / this.options.fps));
                }
            }

            return this;
        }

        stopAnimation() {
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
        stop(complete /** Boolean*/) {
            if ($J.contains([0, 3], this.state)) { return this; }

            if (!$J.defined(complete)) {
                complete = false;
            }

            this.stopAnimation();

            this.state = 3;

            if (complete) {
                this.render(1.0);
                // clearTimeout(this._completeTimer);
                // this._completeTimer = setTimeout(() => {
                this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els);
                // }, 10);
            }
            return this;
        }

        /**
         * @ignore
         */
        loop() {
            const _now = $J.now();
            let i;
            const dx = (_now - this.startTime) / this.options.duration;
            const cycle = Math.floor(dx);

            if (_now >= this.finishTime && cycle >= this.options.cycles) {
                this.stopAnimation();
                this.render(1.0);

                // clearTimeout(this._completeTimer);
                // this._completeTimer = setTimeout(() => {
                this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els);
                // }, 10);

                return this;
            }

            if (this.alternate && this.cycle < cycle) {
                for (i = 0; i < this.styles.length; i++) {
                    for (const s in this.styles[i]) {
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
        render(dx) {
            let i;
            const css = [];
            let _el;
            let _css;
            const l = this.els.length;

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
        renderOverLoad(dx, el, styles, pStyles) {
            const css = {};
            const change = dx; // eslint-disable-line no-unused-vars
            let s;
            for (s in styles) {
                if (s === 'opacity') {
                    css[s] = Math.round(this.calc(styles[s][0], styles[s][1], dx) * 100) / 100;
                } else {
                    css[s] = this.calc(styles[s][0], styles[s][1], dx);
                    // if (this.options.roundCss) { css[s] = Math.round(css[s]); } // если двигать кубиком базье в процентах - то без округления лучше двигает

                    // Styles defined in percent. Ap
                    pStyles[s] && (css[s] += '%');
                }
            }

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
            for (let i = 0; i < this.els.length; i++) {
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
            let i;
            let points = null;
            if ($J.typeOf(cubicbezier) !== 'string') { return null; }

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
        }

        // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
        // 1:1 conversion to js from webkit source files
        // UnitBezier.h, WebCore_animation_AnimationBase.cpp
        static cubicBezierAtTime(t, duration, cubicBezier) {
            let ax = 0;
            let bx = 0;
            let cx = 0;
            let ay = 0;
            let by = 0;
            let cy = 0;

            // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
            const sampleCurveX = (t) => {
                return ((ax * t + bx) * t + cx) * t;
            };
            const sampleCurveY = (t) => {
                return ((ay * t + by) * t + cy) * t;
            };
            const sampleCurveDerivativeX = (t) => {
                return (3.0 * ax * t + 2.0 * bx) * t + cx;
            };
            // The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
            // animation, the more precision is needed in the timing function result to avoid ugly discontinuities.
            const solveEpsilon = (duration) => {
                return 1.0 / (200.0 * duration);
            };

            // const solve = (x, epsilon) => {
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

                const fabs = (n) => {
                    if (n >= 0) {
                        return n;
                    }

                    return 0 - n;
                };
                // First try a few iterations of Newton's method -- normally very fast.
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
                }
                // Fall back to the bisection method for reliability.
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
            };

            // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
            cx = 3.0 * cubicBezier[0];
            bx = 3.0 * (cubicBezier[2] - cubicBezier[0]) - cx;
            ax = 1.0 - cx - bx;
            cy = 3.0 * cubicBezier[1];
            by = 3.0 * (cubicBezier[3] - cubicBezier[1]) - cy;
            ay = 1.0 - cy - by;

            // Convert from input time to parametric value in curve, then from that to output time.
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

(($J) => {
    if (!$J) {
        throw 'MagicJS not found';
    }

    if ($J.Options) { return; }

    const $ = $J.$;

    let globalValue = null;
    const dataTypes = { 'boolean': 1, 'array': 2, 'number': 3, 'function': 4, 'url': 5, 'string': 100 };

    const isAbsoluteUrl = (v) => {
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
                    v = !(v.replace(/true/i, '').trim());
                }
            }
            if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
                return false;
            }

            globalValue = v;
            return true;
        },

        'url': (option, v, strict) => {
            let result = false;

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

        'string': (option, v, strict) => {
            if ($J.typeOf(v) !== 'string') {
                return false;
            } else if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
                return false;
            } else {
                globalValue = '' + v;
                return true;
            }
        },

        'number': (option, v, strict) => {
            const r = /%$/;
            const percent = ($J.typeOf(v) === 'string' && r.test(v));

            // if (strict && typeof(v) !== 'number') {
            if (strict && !'number' === typeof v) { // eslint-disable-line valid-typeof
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

            globalValue = percent ? (v + '%') : v;

            return true;
        },

        'array': (option, v, strict) => {
            if ($J.typeOf(v) === 'string') {
                try {
                    v = v.replace(/'/g, '"');
                    v = $J.W.node.JSON.parse(v);
                } catch (ex) { return false; }
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
        if ($J.typeOf(opts) !== 'array') { return false; }

        for (let i = 0, l = opts.length - 1; i <= l; i++) {
            if (typeValidators[opts[i].type](opts[i], value, strict)) { return true; }
        }

        return false;
    };

    /**
     * Normalize schema parameter definition
     * @param  {object} param parameter defition
     * @return {object} normalized parameter definition
     */
    const normalizeParam = (param) => {
        let i;
        let j;
        let oneOf; // eslint-disable-line no-unused-vars
        let l;
        let temp;
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
    const validateSchemaParam = (param) => {
        // validate types
        const opts = param.hasOwnProperty('oneOf') ? param.oneOf : [param];
        if ($J.typeOf(opts) !== 'array') { return false; }
        for (let i = opts.length - 1; i >= 0; i--) {
            if (!opts[i].type || !dataTypes.hasOwnProperty(opts[i].type)) {
                return false;
            }
            // validate enum option if present
            if ($J.defined(opts[i]['enum'])) {
                if ($J.typeOf(opts[i]['enum']) !== 'array') {
                    return false;
                }

                for (let j = opts[i]['enum'].length - 1; j >= 0; j--) {
                    if (!typeValidators[opts[i].type]({ 'type': opts[i].type }, opts[i]['enum'][j], true)) {
                        return false;
                    }
                }
            }
        }

        // validate default value
        if (param.hasOwnProperty('defaults') && !validateParamValue(param, param['defaults'], true)) {
            return false;
        }

        return true;
    };

    const isDefaults = (obj) => {
        let i;
        let result = false;
        for (i in obj) {
            if (i === 'defaults') {
                result = true;
                break;
            }
        }

        return result;
    };

    const parseObj = (obj) => {
        const result = {};
        const parseVars = (map, pathTo) => {
            let prop;
            let _pathTo;
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

    const convertToDeepObj = (obj) => {
        let key;
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
                    if (!tmp[v]) { tmp[v] = {}; }
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

    const normalizeString = (str) => {
        return $J.camelize((str + '').trim());
    };

    class Options {
        constructor(schema) {
            this.schema = {};
            this.options = {};
            this.parseSchema(schema);
        }

        parseSchema(schema, force) {
            let i;
            let key;
            schema = parseObj(schema);

            for (i in schema) {
                if (!schema.hasOwnProperty(i)) { continue; }

                key = normalizeString(i);
                if (!this.schema.hasOwnProperty(key) || force) {
                    this.schema[key] = normalizeParam(schema[i]);
                    if (!validateSchemaParam(this.schema[key])) {
                        throw 'Incorrect definition of the \'' + i + '\' parameter in ' + schema;
                    }

                    // Preserve existing option value
                    if ($J.defined(this.options[key])) {
                        if (!this.checkValue(key, this.options[key])) {
                            this.options[key] = $J.U;
                        }
                    } else {
                        this.options[key] = $J.U;
                    }
                }
            }
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
            const json = $J.extend({}, this.options);
            for (const i in json) {
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
        fromString(str, exclude) {
            const result = {};
            if (!exclude) { exclude = {}; }

            const check = (substr) => {
                let key;
                let _result = true;

                substr = substr.trim();

                for (key in exclude) {
                    if (Object.prototype.hasOwnProperty.call(exclude, key)) {
                        if (exclude[key].test && exclude[key].test(substr)) {
                            if (!result[key]) { result[key] = ''; }
                            result[key] += substr + ';';
                            _result = false;
                            break;
                        }
                    }
                }

                return _result;
            };

            str.split(';').forEach((chunk) => {
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
                if (validateParamValue(this.schema[id], value)) { result = true; }
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
    }
);
