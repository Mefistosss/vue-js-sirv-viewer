Sirv.define(
    'magicJS',
    ['bHelpers'],
    (bHelpers) => {
        
        
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
        if ($J.typeOf(style) !== 'element') { return; }

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
  *         Trident:
  *             7 - IE 11
  */


// Normalized event names
const EVENTS_MAP = {};

// Shortcut for userAgent
const _UA = navigator.userAgent.toLowerCase();
const _engine = _UA.match(/(webkit|gecko|trident)\/(\d+\.?\d*)/i);
const _version = _UA.match(/(edge|opr)\/(\d+\.?\d*)/i) || _UA.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);
const _safariVer =  _UA.match(/version\/(\d+\.?\d*)/i);


class Browser {
    constructor() {
        this._magicClasses = []; // Extra CSS classes applied to <html> (e.g. lt-ie9-magic, mobile-magic)

        this._features = {
            fullScreen: !!(DOC.fullscreenEnabled || DOC.msFullscreenEnabled || DOC.webkitFullScreenEnabled || DOC.webkitFullscreenEnabled),
            cssFilters: false // ie11 does not support
        };

        this._touchScreen = (() => {
            return 'ontouchstart' in WIN || (WIN.DocumentTouch && DOC instanceof DocumentTouch)
                    || (navigator.maxTouchPoints > 0)
                    || (navigator.msMaxTouchPoints > 0);
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

        this._version = (_engine && _engine[2]) ? parseFloat(_engine[2]) : 0;
        this._uaName = (_version && _version[1]) ? _version[1].toLowerCase() : '';
        this._uaVersion = (_version && _version[2]) ? parseFloat(_version[2]) : 0;
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
                    this._version = !!(WIN.XMLHttpRequest) ? 3 : 2;
                }
                break;
            case 'gecko':
                this._version = (_version && _version[2]) ? parseFloat(_version[2]) : 0;
                break;
            // no default
        }

        if (_version && _version[1] === 'crios') {
            this._uaName = 'chrome';
        }

        if (!!WIN.chrome) {
            this._chrome = true;
        }

        if (this._uaName === 'safari' && (_safariVer && _safariVer[1])) {
            this._uaVersion = parseFloat(_safariVer[1]);
        }

        if (this._platform === 'android' && this._webkit && (_safariVer && _safariVer[1])) {
            this._androidBrowser = true;
        }

        // browser prefixes
        const prefixes = ({
            gecko: ['-moz-', 'Moz', 'moz'],
            webkit: ['-webkit-', 'Webkit', 'webkit'],
            trident: ['-ms-', 'ms', 'ms']
        })[this._engine] || ['', '', ''];

        this._cssPrefix = prefixes[0];
        this._cssDomPrefix = prefixes[1];
        this._domPrefix = prefixes[2];

        // for ie 11
        this._ieMode = (() => {
            if (this._trident && DOC.documentMode) {
                return DOC.documentMode;
            }

            return UND;
        })();

        // Mobile Safari engine in the “request desktop site” mode on iOS/iPadOS.
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

        if (this._ieMode) { // Add CSS class of the IE version to <html> for possible tricks
            this._uaName = 'ie';
            this._uaVersion = this._ieMode;

            this._magicClasses.push('ie' + this._ieMode + '-magic');
            // for (let i = 11; i > this._ieMode; i--) {
            //     this._magicClasses.push('lt-ie' + i + '-magic');
            // }
        }

        // if (this._webkit && this._version < 536) { // Disable fullscreen in old Safari
        //     this._features.fullScreen = false;
        // }

        this._magicClasses.push('svg-magic');

        const exClasses = (DOC.documentElement.className || '').match(/\S+/g) || [];
        DOC.documentElement.className = exClasses.concat(this._magicClasses).join(' ');

        try {
            DOC.documentElement.setAttribute('data-magic-ua', $J.browser.uaName);
            DOC.documentElement.setAttribute('data-magic-ua-ver', $J.browser.uaVersion);
            DOC.documentElement.setAttribute('data-magic-engine', $J.browser.engine);
            DOC.documentElement.setAttribute('data-magic-engine-ver', $J.browser.version);
            // DOC.documentElement.setAttribute('data-magic-features', magicClasses.join(' '));
        } catch (ex) {
            // empty
        }

        // Map pointer events for IE 10.
        if (!WIN.navigator.pointerEnabled) {
            ['Down', 'Up', 'Move', 'Over', 'Out'].forEach((type) => {
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
    get features() { return this._features; }

    /**
     * Touch screen support
     */
    get touchScreen() { return this._touchScreen; }

    /**
     * Mobile device?
     */
    get mobile() { return this._mobile; }

    /**
     * Browser engine
     */
    get engine() { return this._engine; }

    /**
     * Browser engine version
     */
    get version() { return this._version; }

    /**
     * Browser name & version
     */
    get uaName() { return this._uaName; }
    get uaVersion() { return this._uaVersion; }

    // prefix for css properties like -webkit-box-shadow
    get cssPrefix() { return this._cssPrefix; }

    // prefix for style properties like element.style.WebkitBoxShadow
    get cssDomPrefix() { return this._cssDomPrefix; }

    // DOM prefix
    get domPrefix() { return this._domPrefix; }

    /**
     * IE document mode
     */
    get ieMode() { return this._ieMode; }

    /**
     * Platform
     *
     * mac      - Mac OS
     * win      - Windows
     * linux    - Linux
     * ios      - Apple iPod/iPhone/iPad
     *
     */
    get platform() { return this._platform; }

    /**
     * Browser box model
     *
     * Basically used to determine how IE renders in quirks mode
     */
    get backCompat() { return this._backCompat; }

    /**
     * Width of the browser's scrollbars
     */
    get scrollbarsWidth() { return this._scrollbarsWidth; }

    /**
     * Reference to the real document element
     *
     * Used to correct work with page dimension
     */
    // eslint-disable-next-line class-methods-use-this
    get doc() { return (DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat') ? DOC.body : DOC.documentElement; };

    /**
     * Indicates that DOM content is ready for manipulation
     *
     * @see domready
     */
    get ready() { return this._ready; }

    get chrome() { return this._chrome; }
    get webkit() { return this._webkit; }
    get gecko() { return this._gecko; }
    get trident() { return this._trident; }
    get androidBrowser() { return this._androidBrowser; }

    /**
     * Fires when DOM content is ready for manipulation
     *
     * @see domready
     */
    onready() {
        if (this._ready) { return; }
        this._ready = true;

        try { // Calculate width of browser's scrollbars
            const tmp = $J.$new('div').setCss({
                width: 100,
                height: 100,
                overflow: 'scroll',
                position: 'absolute',
                top: -9999
            }).appendTo(DOC.body);
            this._scrollbarsWidth = tmp.node.offsetWidth - tmp.node.clientWidth;
            tmp.remove();
        } catch (ex) {
            // empty
        }

        try { // Test CSS filters support
            const node = $J.$new('div');
            node.node.style.cssText = $J.dashize('filter') + ':blur(2px);';
            this._features.cssFilters = !!node.node.style.length;
        } catch (ex) {
            // empty
        }

        if (!this._features.cssFilters) {
            $J.$(DOC.documentElement).addClass('no-cssfilters-magic');
        }

        // if (WIN.TransitionEvent === UND && WIN.WebKitTransitionEvent !== UND) {
        //     EVENTS_MAP['transitionend'] = 'webkitTransitionEnd';
        // }

        $J.$(DOC).callEvent('domready');
    }
}

$J.browser = new Browser();


(() => {
    const getCancel = () => {
        let result = DOC.exitFullscreen ||
                     DOC.cancelFullScreen ||
                     DOC[$J.browser.domPrefix + 'ExitFullscreen'] ||
                     DOC[$J.browser.domPrefix + 'CancelFullScreen'];

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
/* global WIN, DOC, UND, STORAGE, EVENTS_MAP */
/* eslint-disable quote-props */
/* eslint no-restricted-syntax: ["error", "WithStatement"] */
/* eslint-disable camelcase */


// Not whitespace regexp
// const r_nwp = /\S+/g;
const r_cssToNum = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/;

// normalize CSS names
const cssMap = {};

// Unitless CSS properties (w/o 'px')
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
};

// Returns normalize CSS name (probably with a vendor prefix)
const normalizeCSS = (name) => {
    const standard = (name in DOC.documentElement.style);

    // if ( !(name in DOC.documentElement.style) ) {
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
            fn.$J_EUID = Math.floor(Math.random() * (+new Date()));
        }

        // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});
        const events = this.fetch('_EVENTS_', {});
        let handlers = events[type];

        if (!handlers) {
            // Initialize event handlers queue
            handlers = [];
            events[type] = handlers;

            if ($J.Events.handlers[type]) {
                $J.Events.handlers[type].add.call(this, options);
                // $J.Events.handlers[type].add(this, options);
            } else {
                // handlers['handle'] = function (e) {
                handlers['handle'] = (e) => {
                    e = Object.assign(e || WIN.e, { $J_TYPE: 'event' });
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
        // let del;
        let type = args[0];

        // const fn = arguments.length > 1 ? arguments[1] : -100;
        const fn = args.length > 1 ? args[1] : -100;

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
        const events = this.fetch('_EVENTS_', {});

        // Normalize event name
        type = EVENTS_MAP[type] || type;

        if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {
            // return this;
        } else {
            try {
                if (!e || !e.type) {
                    e = Object.assign(e || {}, { type: type });
                }
            } catch (ev) {
                // empty
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
        const _native = (type !== 'domready');
        let o = this;

        // Normalize event name
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
        if (!events) { return this; }

        Object.keys(events).forEach((_type) => { this.removeEvent(_type); });

        this.del('_EVENTS_');

        return this;
    }
}

// eslint-disable-next-line no-unused-vars
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
    addClass(...args) {
        args.forEach((className) => {
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
        Object.entries(styles).forEach((values) => { this.setCssProp(...values); });
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
        Object.entries(props).forEach((values) => {
            values[1] = '' + values[1];
            if (values[0] === 'class') {
                this.addClass(values[1]);
            } else {
                this.node.setAttribute(...values);
            }
        });

        return this;
    }

    // getTransitionDuration() {
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
        return { width: this.node.offsetWidth, height: this.node.offsetHeight };
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
    get scroll() {
        return { top: this.node.scrollTop, left: this.node.scrollLeft };
    }

    /**
     * Gets scroll offsets from the window top left corner
     *
     * @returns {Hash}
     */
    get fullScroll() {
        let el = this.node;
        const p = { top: 0, left: 0 };

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
            top:  b.top + docScroll.y - doc.clientTop,
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

        return { top: p.top, bottom: p.top + s.height, left: p.left, right: p.left + s.width };
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
        Array.from(this.node.childNodes).forEach((o) => {
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
            return { width: WIN.innerWidth, height: WIN.innerHeight };
        }

        return { width: $J.browser.doc.clientWidth, height: $J.browser.doc.clientHeight };
    }

    /**
     * Gets window scroll offsets
     */
    get scroll() {
        return { x: WIN.pageXOffset || $J.browser.doc.scrollLeft, y: WIN.pageYOffset || $J.browser.doc.scrollTop };
    }

    /**
     * Get full page size including scroll
     */
    get fullSize() {
        const s = this.size;
        return { width: Math.max($J.browser.doc.scrollWidth, s.width), height: Math.max($J.browser.doc.scrollHeight, s.height) };
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
    get clientXY() {
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
    get pageXY() {
        let src = this.oe;

        if ((/touch/i).test(this.type)) {
            src = this.oe.changedTouches[0];
        }

        if ($J.defined(src)) {
            return {
                x: src.pageX || src.clientX + $J.browser.doc.scrollLeft,
                y: src.pageY || src.clientY + $J.browser.doc.scrollTop
            };
        }

        return { x: 0, y: 0 };
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

        while (t && t.nodeType === 3) { t = t.parentNode; }

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
    get clientXY() {
        return { x: this.clientX || this.magicEvent.oe.clientX, y: this.clientY || this.magicEvent.oe.clientY };
    }

    /**
     * Return mouse/pointer coordinates relative to the viewport, including scroll offset.
     * @return {Object}
     */
    get pageXY() {
        return { x: this.x, y: this.y };
    }

    get target() {
        return this._target || this.magicEvent.oe.target;
    }

    get related() {
        return this.relatedTarget;
    }

    get button() {
        return this.magicEvent.button;
        // return this.button;
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

(($J) => {
    if (DOC.readyState === 'interactive' || DOC.readyState === 'complete') {
        setTimeout(() => $J.browser.onready(), 0);
    } else {
        $J.$(DOC).addEvent('readystatechange', (event) => {
            if (event.target.readyState === 'interactive' || event.target.readyState === 'complete') {
                $J.browser.onready();
            }
        });
        $J.$(DOC).addEvent('DOMContentLoaded', () => { $J.browser.onready(); });
        $J.$(WIN).addEvent('load', () => { $J.browser.onready(); });
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
        threshold: TIME_THRESHOLD, // Click speed threshold
        button: 1 // left button
    };

    const onclick = function (e) { e.stopDefaults(); };

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
            this.store('event:btnclick:options', Object.assign($J.detach(_options), options || {}));

            this.addEvent(['mousedown', 'mouseup'], handle, 1)
                .addEvent('click', onclick, 1);
        },

        remove: function () {
            this.removeEvent(['mousedown', 'mouseup'], handle)
                .removeEvent('click', onclick);
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
        if (e.button !== 1) { return; }
        // e.stopDefaults();

        const dragEvent = new Mousedrag(e, this, 'dragstart');

        this.store('event:mousedrag:dragstart', dragEvent);

        // this.callEvent('mousedrag', dragEvent);
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

            this.addEvent('mousedown', handleMouseDown, 1)
                .addEvent('mouseup', handleMouseUp, 1);

            $(DOC).addEvent('mousemove', move, 1)
                .addEvent('mouseup', end, 1);

            this.store('event:mousedrag:listeners:document:move', move);
            this.store('event:mousedrag:listeners:document:end', end);
        },

        remove: function () {
            const f = () => {};

            this.removeEvent('mousedown', handleMouseDown)
                .removeEvent('mouseup', handleMouseUp);

            $(DOC).removeEvent('mousemove', this.fetch('event:mousedrag:listeners:document:move') || f)
                .removeEvent('mouseup', this.fetch('event:mousedrag:listeners:document:end') || f);

            this.del('event:mousedrag:listeners:document:move')
                .del('event:mousedrag:listeners:document:end');
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

        if (!event) { // first click
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


(($J) => {
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
        }

        // eslint-disable-next-line class-methods-use-this
        get button() { return 0; }
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
        const event = this.fetch('event:tap:event');
        // let options = this.fetch('event:tap:options');

        if (!event || !e.isPrimaryTouch()) {
            return;
        }

        this.del('event:tap:event');

        if (event.id === e.primaryTouchId && e.timeStamp - event.timeStamp <= TIME_THRESHOLD
            && Math.sqrt(
                Math.pow(e.primaryTouch.pageX - event.x, 2) + Math.pow(e.primaryTouch.pageY - event.y, 2)
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
            this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1)
                .addEvent(['touchend', 'pointerup'], onTouchEnd, 1)
                .addEvent('click', onClick, 1);
        },

        remove: function () {
            this.removeEvent(['touchstart', 'pointerdown'], onTouchStart)
                .removeEvent(['touchend', 'pointerup'], onTouchEnd)
                .removeEvent('click', onClick);
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

        if (!event) { // first tap
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


(($J) => {
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
        }

        // eslint-disable-next-line class-methods-use-this
        get button() { return 0; }
    }

    const onTouchStart = function (e) {
        if (!e.isPrimaryTouch()) { return; }

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

        if (!dragEvent.dragged
            && Math.sqrt(
                Math.pow(e.primaryTouch.pageX - dragEvent.x, 2) + Math.pow(e.primaryTouch.pageY - dragEvent.y, 2)
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

            this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1)
                .addEvent(['touchend', 'pointerup'], onTouchEnd, 1)
                .addEvent(['touchmove', 'pointermove'], onTouchMove, 1);

            this.store('event:touchdrag:listeners:document:move', move);
            this.store('event:touchdrag:listeners:document:end', end);

            $(DOC).addEvent('pointermove', move, 1)
                .addEvent('pointerup', end, 1);
        },

        remove: function () {
            const f = () => {};

            this.removeEvent(['touchstart', 'pointerdown'], onTouchStart)
                .removeEvent(['touchend', 'pointerup'], onTouchEnd)
                .removeEvent(['touchmove', 'pointermove'], onTouchMove);

            $(DOC).removeEvent('pointermove', this.fetch('event:touchdrag:listeners:document:move') || f, 1)
                .removeEvent('pointerup', this.fetch('event:touchdrag:listeners:document:end') || f, 1);

            this.del('event:touchdrag:listeners:document:move')
                .del('event:touchdrag:listeners:document:end');
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
                cache.forEach((v) => {
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

    const getEventId = (e) => {
        return (e.pointerId && e.pointerType === 'touch')
            ? e.pointerId
            : e.identifier;
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

    const getIds = (targetTouches) => {
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
            variables = Object.assign({}, $J.detach(_variables));
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

        if (e.pointerType === 'mouse' || e.pointerId && (!cache || !cache.has(e.pointerId))) { return; }

        let pinchEvent = this.fetch('event:pinch:pinchstart');
        const variables = this.fetch('event:pinch:variables');
        const currentActivePoints = this.fetch('event:pinch:activepoints');

        const targetTouches = getTouches(e, cache);
        removeCache(e, cache);

        const removingResult = removeActivePoint(targetTouches, currentActivePoints);

        if (!pinchEvent || (!variables || !variables.started) || !removingResult || !currentActivePoints) { return; }

        if (removingResult) {
            addActivePoints(targetTouches, currentActivePoints);
        }

        let _event = 'pinchend';
        if (targetTouches.length > 1) {
            _event = 'pinchresize';
        } else {
            this.del('event:pinch:pinchstart')
                .del('event:pinch:variables')
                .del('event:pinch:activepoints');
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
                    s.height = s.width;
                    // var s = { width: 375, height: 812 };
                    return Math.pow(distance({ x: 0, y: 0 }, { x: s.width, y: s.height }), 2);
                })();
            }

            const move = onTouchMove.bind(this);
            const end = onTouchEnd.bind(this);

            this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1)
                .addEvent(['pointerup'], onTouchEnd, 1)
                .addEvent(['touchmove', 'pointermove'], onTouchMove, 1);

            this.store('event:pinch:listeners:document:move', move);
            this.store('event:pinch:listeners:document:end', end);

            $(DOC).addEvent('pointermove', move, 1)
                .addEvent('pointerup', end, 1);
        },

        remove: function () {
            this.removeEvent(['touchstart', 'pointerdown'], onTouchStart)
                .removeEvent(['pointerup'], onTouchEnd)
                .removeEvent(['touchmove', 'pointermove'], onTouchMove);

            const f = () => {};
            $(DOC).removeEvent('pointermove', this.fetch('event:pinch:listeners:document:move') || f, 1)
                .removeEvent('pointerup', this.fetch('event:pinch:listeners:document:end') || f, 1);

            this.del('event:pinch:listeners:document:move')
                .del('event:pinch:listeners:document:end');

            removePinchEnd(this);
            clearCache(this);
            this.del('event:pinch:variables')
                .del('event:pinch:activepoints')
                .del('event:pinch:pinchstart');
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
            const r = e.pageXY;
            this.x = r.x;
            this.y = r.y;
            this.type = 'mousescroll';
            // this.timeStamp = e.timeStamp;
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
        return (deltaFactor > 50)
            || (deltaMode === 1 && !($J.browser.platform === 'win' && deltaFactor < 1)) // Firefox
            || (deltaFactor % 12 === 0) // Safari
            || (deltaFactor % 4.000244140625 === 0); // Chrome on OS X
    };

    const handle = function (e) {
        let deltaX = 0;
        let deltaY = 0;
        const originEvent = e.originEvent;

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

    const STATES = {
        INIT: 0,
        STARTED: 1,
        PLAYING: 2,
        ENDED: 3
    };

    // 0 - init,  1 - started, 2 - started, 3 - ended

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
            if (this.state === STATES.PLAYING) { return this; }

            this.state = STATES.STARTED;
            this.cycle = 0;

            this.alternate = ['alternate', 'alternate-reverse'].includes(this.options.direction);
            this.continuous = ['continuous', 'continuous-reverse'].includes(this.options.direction);

            if (!styles) { styles = {}; }

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

            if (this.options.duration === 0) { // apply all styles immediately
                this.render(1.0);
                this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els);
            } else {
                this.state = STATES.PLAYING;
                if (!this.options.forceAnimation) {
                    this.timer = $J.W.node.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
                } else {
                    this.timer = setInterval(() => { this.loop(); }, Math.round(1000 / this.options.fps));
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
        stop(complete /** Boolean*/) {
            if ([STATES.INIT, STATES.ENDED].includes(this.state)) { return this; }

            if (!$J.defined(complete)) {
                complete = false;
            }

            this.stopAnimation();

            this.state = STATES.ENDED;

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
            const _now = +new Date();
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

            Object.entries(styles).forEach((values) => {
                const [key, value] = values;

                if (key === 'opacity') {
                    css[key] = Math.round(this.calc(value[0], value[1], dx) * 100) / 100;
                } else {
                    css[key] = this.calc(value[0], value[1], dx);
                    // if (this.options.roundCss) { css[key] = Math.round(css[key]); } // если двигать кубиком базье в процентах - то без округления лучше двигает

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
            if ($J.typeOf(cubicbezier) !== 'string') { return null; }

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

            if (option.hasOwnProperty('enum') && !option['enum'].includes(v)) {
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
        return Object.keys(obj).some(v => v === 'defaults');
    };

    const parseObj = (obj) => {
        const result = {};
        const parseVars = (map, pathTo) => {
            Object.entries(map).forEach((values) => {
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

    const convertToDeepObj = (obj) => {
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

        Object.entries(obj).forEach((values) => {
            setObjValue(values[0].split('.'), values[1]);
        });

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
            schema = parseObj(schema);

            Object.entries(schema).forEach((values) => {
                const [key, value] = values;
                const newKey = normalizeString(key);

                if (!this.schema.hasOwnProperty(newKey) || force) {
                    this.schema[newKey] = normalizeParam(value);

                    if (!validateSchemaParam(this.schema[newKey])) {
                        throw 'Incorrect definition of the \'' + i + '\' parameter in ' + schema;
                    }

                    // Preserve existing option value
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

            Object.keys(json).forEach((key) => {
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
            if (!exclude) { exclude = {}; }

            const check = (substr) => {
                substr = substr.trim();

                return !Object.entries(exclude)
                    .find(([key, value]) => {
                        if (value.test && value.test(substr)) {
                            if (!result[key]) { result[key] = ''; }
                            result[key] += substr + ';';
                            return true;
                        }

                        return false;
                    });
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
