Sirv.define(
    'globalVariables',
    ['bHelpers','magicJS'],
    (bHelpers,magicJS) => {
        const moduleName = 'globalVariables';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global $J, $ */
/* eslint-disable no-lonely-if */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "GLOBAL_VARIABLES" }] */

const PREFIX = 'PREFIX';
const GLOBAL_VARIABLES = {
    PREFIX: PREFIX,
    CSS_RULES_ID: 'sirv-core-css-reset',
    SIRV_HTTP_PROTOCOL: 'https:',
    SIRV_ASSETS_URL: '',
    SIRV_BASE_URL: '',
    CSS_CURSOR_ZOOM_IN: PREFIX + '-cursor-zoom-in',
    CSS_CURSOR_FULSCREEN_ALWAYS: PREFIX + '-cursor-fullscreen-always',
    // eslint-disable-next-line
    REG_URL_QUERY_STRING: /([^\?]+)\??([^\?]+)?/,
    FULLSCREEN_VIEWERS_IDs_ARRAY: [],
    CUSTOM_DEPENDENCIES: null,
    MIN_RATIO: 1.2,

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
