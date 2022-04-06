Sirv.define(
    'globalFunctions',
    ['bHelpers','magicJS','globalVariables','helper','Promise!'],
    (bHelpers,magicJS,globalVariables,helper,Promise) => {
        const moduleName = 'globalFunctions';
        
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

const adjustURLProto = (url) => {
    let result = url.replace(/^(https?:)?/, 'https:');

    if (/^(http(s)?:)?\/\/[^/]+?sirv\.localhost(:\d+)?\/.*$/i.test(url)) { // dev env on localhost
        result = url.replace(/^(https?:)?/, 'http:');
    }

    return result;
};

const sanitizeURLComponent = (str) => {
    try {
        str = decodeURIComponent(str);
    } catch (ex) { /* empty */ }
    return encodeURIComponent(str);
};

const sanitizeURL = (url) => {
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

    static getShadowDOM(node /* Element which has 'Sirv' class name */) {
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
        return this.rootNodes.some((root) => {
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

    getRootNode(node /* Element which has 'Sirv' class name */) {
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
    attachNode(node /* Element which has 'Sirv' class name */) {
        node = $(node).node;
        if (!this.sirvNodesMap.has(node)) {
            const rootNode = this.getRootNode(node);
            this.sirvNodesMap.set(node, rootNode);
        }
    }

    /*
        Detach node from root node
    */
    detachNode(node /* Element which has 'Sirv' class name */) {
        node = $(node).node;
        return this.sirvNodesMap.delete(node);
    }

    addCSSStringToHtml() {
        this.addCSSString($J.D.node.head || $J.D.node.body);
    }

    addCSSString(node /* Element which has 'Sirv' class name */) {
        if (!node) { node = $J.D.node.head || $J.D.node.body; }
        node = $(node).node;

        const root = this.sirvNodesMap.get(node);
        const rootObject = this.rootNodesMap.get(root);

        let shadowRoot = null;
        if (rootObject.isShadowDOM) {
            shadowRoot = root;
        }

        helper.objEach(this.CSSMap, (key, value) => {
            if (!rootObject.modulesCss[key]) {
                rootObject.modulesCss[key] = 1;
                helper.addCss(value.functionOfCssString(), value.id, value.position, shadowRoot, '#' + this.mainCSSID);
            }
        });
    }

    addMainStyleToHtml() {
        this.resetGlobalCSS($J.D.node.head || $J.D.node.body);
        this.addStyle($J.D.node.head || $J.D.node.body, globalVariables.SIRV_ASSETS_URL + this.sirvCSSSrc, this.mainCSSID, '#' + globalVariables.CSS_RULES_ID);
    }

    addMainStyle(node /* Element which has 'Sirv' class name */) {
        this.addMainStyleToHtml();
        this.resetGlobalCSS(node);
        return this.addStyle(node, globalVariables.SIRV_ASSETS_URL + this.sirvCSSSrc, this.mainCSSID, '#' + globalVariables.CSS_RULES_ID);
    }

    addStyle(node /* Element which has 'Sirv' class name */, url, id, querySelector) {
        node = $(node).node;
        const root = this.sirvNodesMap.get(node);
        const rootObject = this.rootNodesMap.get(root);

        if (!rootObject.styles[id]) {
            rootObject.styles[id] = new Promise((resolve, reject) => {
                let _shadowRoot = null;
                if (rootObject.isShadowDOM) {
                    _shadowRoot = root;
                }

                helper.loadStylesheet(url, id, _shadowRoot, querySelector)
                    .then(resolve)
                    .catch(reject);
            });
        }

        return rootObject.styles[id];
    }

    resetGlobalCSS(node /* Element which has 'Sirv' class name */) {
        if (!node) { node = $J.D.node.head || $J.D.node.body; }
        node = $(node).node;

        const root = this.sirvNodesMap.get(node);
        const rootObject = this.rootNodesMap.get(root);

        if (rootObject.isResetCSSAdded) { return; }
        rootObject.isResetCSSAdded = true;

        let shadowRoot = null;
        if (rootObject.isShadowDOM) {
            shadowRoot = root;
        }

        $J.addCSS('.PREFIX', {
            display: 'flex !important'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.PREFIX.PREFIX-selectors-top', {
            'flex-direction': 'column-reverse'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.PREFIX.PREFIX-selectors-left', {
            'flex-direction': 'row-reverse'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.PREFIX.PREFIX-selectors-right', {
            'flex-direction': 'row'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.PREFIX.PREFIX-selectors-bottom', {
            'flex-direction': 'column'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.PREFIX-slides-box', {
            'flex-grow': 1,
            'flex-shrink': 1
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('figure > .Sirv', {
            'vertical-align': 'top'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.Sirv > iframe, .Sirv > video', {
            'display': 'none'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        // Hide custom thumbnail content until the viewer initialized.
        $J.addCSS(':not(.PREFIX) PREFIX-thumbnail', {
            'display': 'none'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.Sirv, .Sirv .PREFIX-component', {
            '-webkit-box-sizing': 'border-box !important',
            '-moz-box-sizing': 'border-box !important',
            'box-sizing': 'border-box !important'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('div.Sirv, div.Sirv div.PREFIX-component, figure.Sirv, div.PREFIX-component', {
            width: '100%',
            height: '100%',
            margin: 0,
            'text-align': 'center'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        // It was added in 'fix video empty height' commit
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
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        // ResponsiveImage
        $J.addCSS('img.Sirv, .Sirv img', { 'max-width': '100%' }, globalVariables.CSS_RULES_ID, shadowRoot);
        $J.addCSS('img.Sirv:not([width]):not([height])', { 'width': '100%' }, globalVariables.CSS_RULES_ID, shadowRoot);
        $J.addCSS('img.Sirv', {
            'display': 'inline-block',
            'font-size': 0,
            'line-height': 0
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.Sirv.PREFIX-bg-image.PREFIX-bg-contain, .Sirv.PREFIX-bg-image.PREFIX-bg-cover', {
            'background-repeat': 'no-repeat',
            'background-position': 'center',
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.Sirv.PREFIX-bg-image.PREFIX-bg-contain', {
            'background-size': 'contain'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('.Sirv.PREFIX-bg-image.PREFIX-bg-cover', {
            'background-size': 'cover'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        // $J.addCSS('img.Sirv[width], .Sirv img[width], img.Sirv[height], .Sirv img[height]', {
        //     'max-width': 'none'
        // }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('img.Sirv:not([src]), img.Sirv.sirv-image-loading:not([src])', {
            'opacity': '0',
            // 'transition': 'opacity 0.5s linear'
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS('img.Sirv.sirv-image-loaded', {
            'opacity': '1',
            'transition': 'opacity 0.5s linear'
        }, globalVariables.CSS_RULES_ID, shadowRoot);
    }

    showSirvAd(node /* Element which has 'Sirv' class name */, targetNode, landing, desc) {
        if (/^my.sirv.(com|localhost)$/i.test($J.D.node.location.hostname)) { // do not show Ad inside web app
            return;
        }

        if (!node) { node = $J.D.node.head || $J.D.node.body; }
        node = $(node).node;

        const root = this.sirvNodesMap.get(node);
        const rootObject = this.rootNodesMap.get(root);

        let shadowRoot = null;
        if (rootObject.isShadowDOM) {
            shadowRoot = root;
        }

        const crId = 'sirvCR' + Math.floor(Math.random() * $J.now());

        const BRAND_LOGO = {
            width: 90,
            height: 18,
            src: 'data:image/png;base64,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'
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
            opacity: '1 !important;',
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        $J.addCSS(('#crSirv' + crId) + ' > img', {
            display: 'inline-block !important;',
            visibility: 'visible !important;',
            position: 'static !important;',
            width: '90px !important;',
            height: '18px !important;',
            'max-width': 'none !important;',
            'max-height': 'none !important;',
            transform: 'none !important;',
            margin: '0 !important',
            padding: '0 !important',
        }, globalVariables.CSS_RULES_ID, shadowRoot);

        const el = $J.$new('a', { id: crId, href: landing, target: '_blank' });
        el.attr('style', 'position: absolute !important; opacity: 1 !important');
        el.setCss({
            display: 'inline-block',
            overflow: 'hidden',
            visibility : 'visible',
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
        }).appendTo(targetNode)
            .addEvent('tap btnclick', (e) => {
                e.stopDistribution();
                $J.W.node.open(el.attr('href'));
            })
            .append(
                $J.$new('img', BRAND_LOGO).setProps({ alt: desc })
            );
    }
}

const GLOBAL_FUNCTIONS = {
    rootDOM: new RootDOM(),

    viewerFilters: [],

    getNodeWithSirvClassName: (node) => {
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
        elements: [
            [
                { classes: ['PREFIX-arrow-control'] },
                { classes: ['PREFIX-arrow'] },
                { classes: ['PREFIX-icon'] }
            ],
            [
                { classes: ['PREFIX-button-fullscreen-open'] },
                { classes: ['PREFIX-icon'] }
            ],
            [
                { classes: ['PREFIX-button-fullscreen-close'] },
                { classes: ['PREFIX-icon'] }
            ],
            [
                { classes: ['PREFIX-thumbnails'] },
                { classes: ['PREFIX-selector'], attrs: [{ name: 'data-type', value: 'spin' }] }
            ]
        ],

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
            GLOBAL_FUNCTIONS.iconsHash.elements.forEach((data) => {
                const elements = [];
                data.reverse().forEach((el) => {
                    const node = $J.$new('div');
                    if (el.classes) {
                        el.classes.forEach((className) => {
                            node.addClass(className);
                        });
                    }

                    if (el.attrs) {
                        el.attrs.forEach((attr) => {
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

            GLOBAL_FUNCTIONS.iconsHash.nodes.forEach((el) => {
                el.setCss({
                    top: '-10000px',
                    left: '-10000px',
                    width: '10px',
                    height: '10px',
                    position: 'absolute',
                    visibility: 'hodden',
                    opacity: 0
                });

                GLOBAL_FUNCTIONS.iconsHash.waitBody().finally(() => { $J.$($J.D.node.body).append(el); });
            });
        },

        remove: () => {
            if (GLOBAL_FUNCTIONS.iconsHash.nodes.length) {
                GLOBAL_FUNCTIONS.iconsHash.nodes.forEach((el) => { el.remove(); });
                GLOBAL_FUNCTIONS.iconsHash.nodes = [];
            }
        }
    },

    adjustURL: (url) => {
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

    }
);
