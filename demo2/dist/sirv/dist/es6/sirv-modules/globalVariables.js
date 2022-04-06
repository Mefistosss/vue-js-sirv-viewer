Sirv.define(
    'globalVariables',
    ['bHelpers','magicJS'],
    (bHelpers,magicJS) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global $J, $ */
/* eslint-disable no-lonely-if */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "GLOBAL_VARIABLES" }] */

const SIRV_PREFIX = 'PREFIX';
let SIRV_HTTP_PROTOCOL = 'https:';
let SIRV_ASSETS_URL = '';
let SIRV_BASE_URL = '';

const getAbsoluteURL = (() => {
    let a;

    return (url) => {
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

            if (/sirv\.localhost(:\d+)?\/(([^#?]+)\/)?sirv(_.+)?\.js([?#].*)?$/i.test(src)) { // dev env on localhost
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
        ENABLE: 4,
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

        NAMES: [
            'none',
            'html',
            'image',
            'panzoom',
            'zoom',
            'spin',
            'video'
        ]
    }
};

return GLOBAL_VARIABLES;

    }
);
