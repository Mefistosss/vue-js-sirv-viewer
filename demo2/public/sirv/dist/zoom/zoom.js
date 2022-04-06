Sirv.define(
    'Zoom',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','Promise!','EventEmitter','Zoominstance','Hint','ResponsiveImage','RoundLoader','Hotspots'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,Promise,EventEmitter,Zoominstance,Hint,ResponsiveImage,RoundLoader,Hotspots) => {
        const moduleName = 'Zoom';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* global helper */
/* eslint-disable no-extra-semi */
/* eslint-disable no-unused-vars */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


let defaults = {
    mode: { type: 'string', 'enum': ['top', 'left', 'right', 'bottom', 'inner', 'magnifier', 'deep'], defaults: 'inner' },
    margin: { type: 'number', defaults: 9 },

    width: {
        oneOf: [
            { type: 'number' },
            { type: 'string', 'enum': ['auto'] }
        ],
        defaults: 'auto'
    },

    height: {
        oneOf: [
            { type: 'number' },
            { type: 'string', 'enum': ['auto'] }
        ],
        defaults: 'auto'
    },

    pan: { type: 'boolean', defaults: false },

    ratio: {
        oneOf: [
            { type: 'number', minimum: 0 },
            { type: 'string', 'enum': ['max'] }
        ],

        defaults: 2.5
    },

    wheel: { type: 'boolean', defaults: true }, // Zoom in/out on mouse wheel

    tiles: { type: 'boolean', defaults: true },

    trigger: {
        oneOf: [
            { type: 'string', 'enum': ['hover', 'click', 'dblclick'] },
            { type: 'boolean', 'enum': [false] }
        ],
        defaults: 'click'
    },

    hint: {
        // hint.enable
        enable: { type: 'boolean', defaults: true },
        text: {
            // hint.text.hover
            hover: { type: 'string', defaults: 'Hover to zoom' },
            // hint.text.click
            click: { type: 'string', defaults: 'Click to zoom' },
            // hint.text.dblclick
            dblclick: { type: 'string', defaults: 'Double click to zoom' }
        }
    },

    // Navigation map
    map: {
        // map.enable
        enable: { type: 'boolean', defaults: false },
        // map.size
        size: { type: 'number', 'minimum': 0, 'maximum': 50, defaults: 25 } // in percentage
    }
};

if ($J.browser.touchScreen) {
    defaults = helper.deepExtend(defaults, {
        hint: {
            text: {
                // hint.text.hover
                hover: { defaults: 'Tap and hold to zoom' }
            }
        }
    });
}

const defaultsForMobileZoomOptions = {
    hint: {
        text: {
            // hint.text.hover
            hover: { type: 'string', defaults: 'Tap and hold to zoom' },
            // hint.text.click
            click: { type: 'string', defaults: 'Tap to zoom' },
            // hint.text.dblclick
            dblclick: { type: 'string', defaults: 'Double tap to zoom' }
        }
    }
};

const defaultsForOutsideMode = {
    trigger: {
        oneOf: [
            { type: 'string', 'enum': ['hover', 'click', 'dblclick'] },
            { type: 'boolean', 'enum': [false] }
        ],
        defaults: 'hover'
    }
};

const defaultsForMobileInnerMode = {
    trigger: {
        oneOf: [
            { type: 'string', 'enum': ['hover', 'click', 'dblclick'] },
            { type: 'boolean', 'enum': [false] }
        ],
        defaults: 'dblclick'
    }
};

const defaultsForDeepZoom = {
    ratio: {
        oneOf: [
            { type: 'number', minimum: 0 },
            { type: 'string', 'enum': ['max'] }
        ],

        defaults: 'max'
    }
};

/* eslint-env es6 */
/* global EventEmitter */
/* global helper */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint dot-notation: ["error", { "allowKeywords": false }]*/


// eslint-disable-next-line no-unused-vars
class ButtonClass extends EventEmitter {
    constructor(parent, options, events) {
        super();
        this.parentNode = $(parent);
        this.options = $J.extend({
            'class': null,
            disabledClass: 'disable'
        }, options);

        this.events = events || {};
        this.isDisabled = false;
        this.isDisabledClassAdded = false;

        this.instanceNode = $J.$new('button');

        if (this.options['class']) {
            this.instanceNode.addClass(this.options['class']);
        }

        helper.objEach(this.events, (key, value) => {
            this.instanceNode.addEvent(key, value);
        });
    }

    append() {
        this.parentNode.append(this.instanceNode);
    }

    changeState(disable) {
        if (disable) {
            this.disable(true);
            if (!this.isDisabledClassAdded) {
                this.isDisabledClassAdded = true;
                this.instanceNode.addClass(this.options.disabledClass);
            }
        } else {
            if (this.isDisabledClassAdded) {
                this.isDisabledClassAdded = false;
                this.instanceNode.removeClass(this.options.disabledClass);
            }
            this.disable();
        }
    }

    disable(disable) {
        if (disable) {
            if (!this.isDisabled) {
                this.isDisabled = true;
                this.instanceNode.attr('disabled', 'disabled');
            }
        } else if (this.isDisabled) {
            this.isDisabled = false;
            this.instanceNode.removeAttr('disabled');
        }
    }

    destroy() {
        helper.objEach(this.events, (key, value) => {
            this.instanceNode.removeEvent(key, value);
        });

        this.events = {};

        this.changeState();

        this.instanceNode.remove();
        this.instanceNode = null;
        super.destroy();
    }
}

// eslint-disable-next-line no-unused-vars
class ZoomControls extends EventEmitter {
    constructor(parent) {
        super();
        this.parentNode = $(parent);
        this.instanceNode = $J.$new('div').addClass('zoom-controls');

        this.zoomInButton = new ButtonClass(this.instanceNode, { 'class': 'zoom-in' }, {
            'btnclick tap': (e) => {
                e.stop();
                this.emit('zoomControlsAction', { data: { type: 'zoomin' } });
            }
        });
        this.zoomInButton.setParent(this);

        this.zoomOutButton = new ButtonClass(this.instanceNode, { 'class': 'zoom-out' }, {
            'btnclick tap': (e) => {
                e.stop();
                this.emit('zoomControlsAction', { data: { type: 'zoomout' } });
            }
        });
        this.zoomOutButton.setParent(this);

        this.zoomCloseButton = new ButtonClass(this.instanceNode, { 'class': 'zoom-close' }, {
            'btnclick tap': (e) => {
                e.stop();
                this.emit('zoomControlsAction', { data: { type: 'zoomclose' } });
            }
        });
        this.zoomCloseButton.setParent(this);

        this.zoomInButton.append();
        this.zoomOutButton.append();
        this.zoomCloseButton.append();
    }

    show() { this.parentNode.append(this.instanceNode); }
    hide() { this.instanceNode.remove(); }

    invisibleDisable(disable) {
        this.zoomInButton.disable(disable);
        this.zoomOutButton.disable(disable);
        this.zoomCloseButton.disable(disable);
    }

    disable(typeOfButton /* in, out */) {
        if (typeOfButton) {
            if (typeOfButton === 'in') {
                this.zoomInButton.changeState(true);
                this.zoomOutButton.changeState();
                this.zoomCloseButton.changeState();
            } else {
                this.zoomOutButton.changeState(true);
                this.zoomCloseButton.changeState(true);
                this.zoomInButton.changeState();
            }
        } else {
            this.zoomInButton.changeState();
            this.zoomOutButton.changeState();
            this.zoomCloseButton.changeState();
        }
    }

    destroy() {
        this.zoomInButton.destroy();
        this.zoomOutButton.destroy();
        this.zoomCloseButton.destroy();
        this.hide();
        super.destroy();
    }
}

/* eslint-env es6 */
/* global ZoomControls */
/* global helper */
/* global Zoominstance */
/* global Hint */
/* global Hotspots */
/* global ResponsiveImage */
/* global RoundLoader */
/* global globalFunctions */
/* global globalVariables */
/* global defaults */
/* global defaultsForDeepZoom */
/* global defaultsForMobileZoomOptions */
/* global defaultsForOutsideMode */
/* global defaultsForMobileInnerMode */


/* eslint-disable indent */
/*eslint consistent-return: 0*/
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint class-methods-use-this: ["off", { "imageSettings": ["error"] }] */


// eslint-disable-next-line no-unused-vars
const Zoom = (() => {
    const P = globalVariables.PREFIX;
    const BRAND_LANDING = 'https://sirv.com/about-zoom/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(zoom)&utm_campaign=branding';

    const stopEvent = (e) => { e.stop(); };

    const difference = (value1, value2) => {
        return Math.abs(value1 - value2);
    };

    const getContainerForZoom = (container) => {
        let result = null;

        while (container.node !== $J.D.node.body && !result) {
            container = $(container.node.parentNode);
            if (container.hasClass(P + '-slides-box')) {
                result = container;
            }
        }

        return result;
    };

    const getNodeSize = (node, count) => {
        return new Promise((resolve, reject) => {
            const size = $(node).getSize();

            if (!count) { count = 100; }
            count -= 1;

            if (size.width || size.height) {
                resolve(size);
            } else if (count > 0) {
                setTimeout(() => {
                    getNodeSize(node, count).then(resolve).catch(reject);
                }, 16);
            } else {
                reject(null);
            }
        });
    };

    class Zoom_ extends Zoominstance {
        constructor(node, options) {
            super(node, options, defaults);

            this.type = globalVariables.SLIDE.TYPES.ZOOM;

            this.insideOptions = {
                type: 'outside', // inner, circle, square, outside
                position: 'right', // top, left, right, bottom
                hideZoomForClickTrigger: true,
                zooming: true,
                map: false,
                mapSize: 50,
                controls: false,
                trigger: 'click',
                outsideModeWasChanged: false
            };

            this.imageUrl = this.instanceNode.attr('data-src');

            // Image URL
            this.src = globalFunctions.normalizeURL(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));

            // Image default params
            this.queryParams = helper.paramsFromQueryString(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2'));

            if (this.queryParams) {
                const q = parseInt(this.queryParams.quality, 10);
                if (isNaN(q)) {
                    delete this.queryParams.quality;
                } else {
                    this.queryParams.quality = q;
                }
            }

            this.isFullscreen = options.isFullscreen;
            this.nativeFullscreen = options.nativeFullscreen;
            this.queryParamsQuality = this.queryParams.quality || null;

            this.imageNode = null;
            this.loader = null;
            this.image = null;
            this.controls = null;
            this.differenceBetweenSizes = 100;
            this.currentSize = { width: 0, height: 0 };
            this.currentImageSize = { width: 0, height: 0 };
            this.isInfoLoaded = false;
            this.zoomIsOpened = false;
            this.imageShowPromise = null;
            this.hint = null;
            this.longTapTimer = null;
            this.setImageCss = false;
            this.lastTriggerAction = null;
            this.isNotMouse = false;
            this.accountInfo = {};
            this.postInitState = 0;
            this.clonedImage = null;
            this.isHidden = false;
            this.destroyed = false;
            this.waitingCallbacks = [];

            // just for outsize zoom
            this.lastImageSize = { width: 0, height: 0 };

            this.hotspotsTurnedOn = true;

            this.scrollDebounce = helper.debounce(() => { this.replaceZoom(); }, 16);

            this.zoomDebounce = helper.debounce(() => {
                if (this.controls) {
                    this.controls.invisibleDisable();
                    this.changeControlsState(this.zoom.getZoomData());
                }
            }, 42);

            this.onScrollHandler = this.onScroll.bind(this);

            this.instanceNode.addEvent('selectstart', (e) => { e.stop(); });

            // this.api = $J.extend(this.api, {
                // resize: this.resize.bind(this), // parent class
                // zoomIn: this.zoomIn.bind(this), // parent class
                // zoomOut: this.zoomOut.bind(this), // parent class
                // isZoomed: this.isZoomed.bind(this), // parent class
                // isReady: this.isReady.bind(this), // parent class
                // getOptions: this.getOptions.bind(this), // parent class
                // hotspots: {} // parent class, hotspots api
            // });

            this.createHotspotsClass();
            this.createSirvImage();
        }

        makeOptions() {
            let options = new $J.Options(this.defaultSchema);

            options = this.makeGlobalOptions(options);

            if ($J.contains(['top', 'left', 'right', 'bottom', 'inner', 'magnifier'], options.get('mode'))) {
                options.parseSchema(defaultsForOutsideMode, true);
            }

            if ($J.browser.touchScreen && $J.browser.mobile) {
                options.parseSchema(defaultsForMobileZoomOptions, true);
                options = this.makeMobileOptions(options);
                if ($J.contains(['inner', 'deep'], options.get('mode'))) {
                    options.parseSchema(defaultsForMobileInnerMode, true);
                }
            }

            if (options.get('mode') === 'deep') {
                options.parseSchema(defaultsForDeepZoom, true);
            }

            return options;
        }

        getInfo() {
            if (!this.gettingInfoPromise) {
                this.gettingInfoPromise = new Promise((resolve, reject) => {
                    this.waitGettingInfo.wait(() => {
                        this.image.getImageInfo()
                            .then((info) => {
                                if (!this.destroyed) {
                                    this.isInfoLoaded = true;

                                    this.accountInfo = this.image.getAccountInfo();
                                    if (!this.dataAlt) {
                                        this.dataAlt = this.image.getDescription();
                                    }

                                    this.hotspotsData = info.hotspots;
                                    this.infoSize = this.image.getOriginSize();

                                    if (this.hotspots) {
                                        this.hotspots.setOriginImageSize(this.infoSize.width, this.infoSize.height);
                                    }

                                    resolve();
                                }
                            })
                            .catch((err) => { if (!this.destroyed) { reject(err); } });
                    });
                });
            }

            return this.gettingInfoPromise;
        }

        showHint() {
            if (this.hint) {
                if (!this.always || $J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) {
                    this.hint.show();
                }
            }
        }

        onStartActions() {
            if (this._isReady) {
                if (this.isInView && this.isZoomSizeExist()) {
                    this.showHint();
                }
            } else if (this.isStarted) {
                if (this.isInView && this.isSlideShown && !this.preload) {
                    this.postInit();
                }
            }

            super.onStartActions();
        }

        onStopActions() {
            this.zoomOut(true);
            if (this.hint) {
                this.hint.hide();
            }

            super.onStopActions();
        }

        onInView(value) {
            if (value) {
                if (this._isReady) {
                    if (this.isSlideShown && this.isZoomSizeExist()) {
                        this.showHint();
                    }
                } else if (this.isStarted) {
                    if (!this.isInView && (this.preload || this.isSlideShown)) {
                        this.isInView = true;
                        this.postInit();
                    }
                }
            }
        }

        startFullInit(options) {
            if (this.isStartedFullInit) { return; }
            super.startFullInit(options);

            // if (options && options.lensContainer) {
            //     this.zoomContainer = options.lensContainer;
            // }

            this.normalizeOptions();
            this.getId('zoom-');

            this.instanceNode.addClass(P + '-zoom-view');
            this.instanceNode.addEvent('mousedown', stopEvent);

            this.createLoader();
        }

        imageSettings(options) {
            if (!options) { options = {}; }
            if (!options.imageSettings) { options.imageSettings = {}; }
            if (!options.imageSettings.scale) { options.imageSettings.scale = {}; }
            if (!options.callbackData) { options.callbackData = {}; }

            options.imageSettings.scale.option = 'fill';

            if (this.quality !== null && this.queryParamsQuality === null) {
                if (!options.src) { options.src = {}; }
                options.src.quality = this.quality;
            }

            const hdQuality = this.hdQuality;

            if (this.queryParamsQuality === null || this.isHDQualitySet && hdQuality < this.queryParamsQuality) {
                options.srcset = { quality: hdQuality };
            }

            return options;
        }

        setHDQuality(data) {
            if (data.dppx > 1 && data.dppx < 1.5) {
                if (this.queryParamsQuality === null && this.quality !== null) {
                    data.srcset.quality = this.quality;
                } else if (data.srcset) {
                    delete data.srcset.quality;
                }
            }

            return data;
        }

        isOutsideZoom() {
            return $J.contains(['top', 'left', 'right', 'bottom'], this.option('mode'));
        }

        createHint(message) {
            if (this.option('hint.enable')) {
                this.hint = new Hint(this.instanceNode, {
                    html: '<span>' + message + '<span>'
                });

                this.hint.append();
            }
        }

        clearZoom() {
            if (this.zoom) {
                this.off('zooming');
                this.off('zoomUp');
                this.off('zoomDown');
                if (this.imageNode) {
                    this.imageNode.removeClass(this.zoomClassName);
                }
            }

            super.clearZoom();
        }

        replaceZoom() {
            let trigger = false;
            const currentTrigger = this.option('trigger');
            const zoomOptions = { clickBehavior: 'both' };

            if (!this._isReady) { return; }

            if (currentTrigger === 'hover' && this.option('mode') !== 'magnifier') {
                if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) {
                    trigger = 'click';
                    zoomOptions.trigger = trigger;
                } else {
                    trigger = currentTrigger;
                }
            }

            let createNewZoom = false;
            if (trigger && this.insideOptions.trigger !== trigger) {
                createNewZoom = true;
            }

            let canIUse;
            if (this.insideOptions.type === 'outside') {
                canIUse = this.canIUseOutsideZoom();

                if (canIUse && this.insideOptions.outsideModeWasChanged || !canIUse && !this.insideOptions.outsideModeWasChanged) {
                    this.insideOptions.outsideModeWasChanged = !this.insideOptions.outsideModeWasChanged;
                    createNewZoom = true;
                }

                // if the image checnge size the window of outside zoom must chenge too
                const imageSize = this.imageNode.getSize();
                if (!createNewZoom && canIUse && this.lastImageSize.width !== imageSize.width) {
                    this.lastImageSize = imageSize;
                    createNewZoom = true;
                }
            }

            if (createNewZoom) {
                this.clearZoom();
                if (this.insideOptions.type === 'outside') {
                    if (canIUse) {
                        zoomOptions.type = 'outside';
                    } else {
                        zoomOptions.type = 'inner';

                        if ($J.browser.mobile) {
                            zoomOptions.pan = true;

                            if (currentTrigger === 'hover') {
                                trigger = 'dblclick';
                                zoomOptions.trigger = trigger;
                            }
                        }
                    }
                }

                if (trigger) {
                    this.insideOptions.trigger = trigger;
                }

                this.setTriggerAction(trigger);
                this.createZoom(zoomOptions);
                this.setZoomEvents();
            }
        }

        canIUseOutsideZoom() {
            let result = false;

            if (this.insideOptions.type === 'outside') {
                if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) { return result; }

                const margin = this.option('margin');
                const zoomSize = this.imageNode.getSize();
                const scroll = $J.W.getScroll();
                const pos = this.imageNode.getPosition();
                const w = this.option('width');
                const h = this.option('height');
                const size = { width: zoomSize.width, height: zoomSize.height };

                if (w !== 'auto') {
                    if (/%$/.test(w)) {
                        zoomSize.width = zoomSize.width / 100 * parseInt(w, 10);
                    } else {
                        zoomSize.width = parseInt(w, 10);
                    }
                }

                if (h !== 'auto') {
                    if (/%$/.test(h)) {
                        zoomSize.height = zoomSize.height / 100 * parseInt(h, 10);
                    } else {
                        zoomSize.height = parseInt(h, 10);
                    }
                }

                let tmp;
                switch (this.insideOptions.position) {
                    case 'top':
                        tmp = pos.top - scroll.y - margin;
                        if (tmp > zoomSize.height) {
                            result = true;
                        }
                        break;
                    case 'left':
                        tmp = pos.left - scroll.x - margin;
                        if (tmp >= zoomSize.width) {
                            result = true;
                        }
                        break;
                    case 'right':
                        tmp = pos.left - scroll.x;
                        tmp += (size.width + margin);

                        if ($J.W.node.innerWidth - tmp >= zoomSize.width) {
                            result = true;
                        }
                        break;
                    case 'bottom':
                        tmp = pos.top - scroll.y;
                        tmp += (size.height + margin);

                        if ($J.W.node.innerHeight - tmp >= zoomSize.height) {
                            result = true;
                        }
                        break;
                    // no default
                }
            }

            return result;
        }

        createHotspotsClass() {
            if (this.option('mode') === 'magnifier') { return; }
            if (!$J.browser.mobile && this.option('trigger') === 'hover') {
                this.hotspotsTurnedOn = false;
            }

            super.createHotspotsClass(Hotspots);
        }

        run(isShown, preload, firstSlideAhead) {
            const result = super.run(isShown, preload, firstSlideAhead);

            if (result) {
                this.getInfo().finally(() => {
                    this.calcContainerSize();

                    if (this.isInView && (this.preload || this.isSlideShown)) {
                        this.postInit();
                    }
                });

                this.startGettingInfo();
            }

            return result;
        }

        done() {
            if (!this._isReady && !this.destroyed) {
                super.done();

                if (this.hotspots) {
                    if (!this.hotspots.getHotspots().length) {
                        this.hotspots.setInstanceComponentNode(this.imageNode);
                    }

                    this.hotspots.setContainerSize(this.imageNode.node.getBoundingClientRect());
                }

                this.createZoom();
                this.replaceZoom();
                this.createControls();

                const zoomable = this.isZoomSizeExist();

                if (this.controls) {
                    this.controls.disable('out');
                    if (zoomable) {
                        this.controls.show();
                    }
                }

                if (this.imageNode && zoomable) {
                    this.imageNode.addClass(globalVariables.CSS_CURSOR_ZOOM_IN);
                }

                this.setZoomEvents();

                if (this.isSlideShown && this.isInView && zoomable) {
                    this.showHint();
                }

                if (this.accountInfo.branded) {
                    const nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
                    globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, this.instanceNode, BRAND_LANDING, 'Deep zoom image viewer by Sirv');
                }
            }
        }

        normalizeOptions() {
            if (this.option('mode') !== 'deep') {
                this.option('map.enable', false);
            }

            if (this.option('mode') === 'deep' || $J.browser.mobile) {
                this.option('pan', true);
            }

            if (this.option('mode') === 'magnifier' && !$J.browser.mobile) {
                this.option('pan', false);
            }

            if (!this.isOutsideZoom()) {
                if (this.option('width') === 'auto' && this.option('height') === 'auto') {
                    this.option('width', '70%');
                }
            }

            switch (this.option('trigger')) {
                case 'hover':
                    if (this.option('mode') === 'deep') {
                        this.option('trigger', 'click');
                    }
                    break;

                case 'click':
                case 'dblclick':
                    break;

                default:
                    this.option('trigger', false);
            }

            switch (this.option('mode')) {
                case 'top':
                case 'left':
                case 'right':
                case 'bottom':
                    this.insideOptions.type = 'outside';
                    this.insideOptions.position = this.option('mode');
                    break;
                case 'magnifier':
                    this.insideOptions.type = 'circle';
                    break;
                case 'inner':
                    this.insideOptions.type = 'inner';
                    break;
                case 'deep':
                    this.insideOptions.type = 'deep';
                    this.insideOptions.controls = true;
                    break;

                // no default
            }

            if (this.insideOptions.type === 'deep' && this.option('map.enable')) {
                this.insideOptions.map = this.option('map.size') !== 0;
                if (this.insideOptions.map) {
                    this.insideOptions.mapSize = 100 / 50 * this.option('map.size');
                }
            }

            this.insideOptions.trigger = this.option('trigger');

            if ($J.browser.mobile) {
                this.insideOptions.hideZoomForClickTrigger = false;
            }

            if (this.option('ratio') !== 'max' && this.option('ratio') < globalVariables.MIN_RATIO) {
                this.option('ratio', 0);
            }

            this.setDefaultZoomOptions();
        }

        setDefaultZoomOptions() {
            const isDeep = this.insideOptions.type === 'deep';

            super.setDefaultZoomOptions();

            this.defaultZoomOptions = $J.extend(this.defaultZoomOptions, {
                trigger: this.option('trigger'),
                tiles: this.option('tiles'),
                width: this.option('width'),
                height: this.option('height'),
                map: this.insideOptions.map,
                clickBehavior: isDeep ? 'up' : 'both',
                outsidePosition: this.insideOptions.position,
                margin: this.option('margin'),
                type: isDeep ? 'inner' : this.insideOptions.type,
                pan: this.option('pan'),
                customZooming: this.option('wheel'),
                mapSize: this.insideOptions.mapSize
            });
        }

        onZoomGetImage(e) {
            super.onZoomGetImage(e);

            e.data = this.imageSettings(e.data);
            e.data = this.setHDQuality(e.data);

            const img = this.image.getImage(e.data);
            if (this.checkImage(e.data, e.data.dontLoad)) {
                this.zoom.setImage(img);
            }
        }

        onZoomCancelLoadingOfTiles(e) {
            super.onZoomCancelLoadingOfTiles(e);
            e.data = this.imageSettings(e.data);
            this.image.cancelLoadingImage(e.data);
        }

        // eslint-disable-next-line
        onZoomBeforeShow(e) {
            if (this.option('mode') !== 'magnifier') {
                if (this.insideOptions.type === 'outside' && !this.insideOptions.outsideModeWasChanged) {
                    this.imageNode.addClass('sirv-filter-bw');
                } else {
                    this.imageNode.addClass(this.zoomClassName);
                }
                if (this.hotspots) {
                    this.hotspots.disableAll();
                }
            }
        }

        // eslint-disable-next-line
        onZoomShown(e) {
            if (this.isSlideShown) {
                this.sendEvent('zoomIn', {
                    trigger: this.option('trigger'),
                    isOutsideZoom: this.isOutsideZoom()
                });
            }
        }

        // eslint-disable-next-line
        onZoomHidden(e) {
            this.imageNode.removeClass(this.zoomClassName);
            this.imageNode.removeClass('sirv-filter-bw');

            this.sendEvent('zoomOut');

            this.isNotMouse = false;
            this.zoomIsOpened = false;
            if (this.pinchCloud) {
                this.pinchCloud.addEvent();
            }

            if (this.hotspots) {
                if (
                    this.hotspotsTurnedOn && $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING], this.fullscreenState) ||
                    this.insideOptions.trigger !== 'hover' && $J.contains([globalVariables.FULLSCREEN.OPENED, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState)
                ) {
                    this.hotspots.enableAll();

                    if (this.isInView && this.isSlideShown) {
                        this.hotspots.showNeededElements();
                    }
                }
            }
        }

        setZoomEvents() {
            super.setZoomEvents();

            this.on('zooming', (e) => {
                const zoom = e.data.zoom;
                e.stopAll();

                if (this.controls) {
                    this.controls.invisibleDisable(true);
                    this.changeControlsState(zoom);
                    this.zoomDebounce();
                }
            });

            this.on('zoomUp', (e) => {
                e.stop();
                this.makeZoom('zoomin', e.data.x, e.data.y);
            });

            this.on('zoomDown', (e) => {
                e.stop();
                this.makeZoom('zoomout', e.data.x, e.data.y);
            });
        }

        // eslint-disable-next-line no-unused-vars
        onBeforeFullscreenIn(data) {
            if (this.zoomIsOpened) {
                this.zoom.hide(true);
                if (this.controls) {
                    this.controls.disable('out');
                }
            }

            if (this._isReady && this.isSlideShown && this.isInView && !!this.imageNode) {
                this.isHidden = true;
                this.imageNode.setCss({
                    opacity: 0,
                    visibility: 'hidden'
                });
            }

            super.onBeforeFullscreenIn(data);
            if (this.hotspots) {
                this.hotspots.disableAll();
            }
        }

        // eslint-disable-next-line no-unused-vars
        onAfterFullscreenIn(data) {
            this.calcContainerSize();
            this.replaceZoom();

            if (this.isHidden) {
                this.isHidden = false;
                setTimeout(() => {
                    this.setImageWidthHeight();
                    this.imageNode.setCss({
                        opacity: '',
                        visibility: ''
                    });
                }, 0);
            }

            // if we use it, we do not have pinchend event and touchdrag after that
            // if (this.pinchCloud) {
            //     this.pinchCloud.removeEvent();
            //     this.pinchCloud.addEvent();
            // }

            if (this.hotspots) {
                setTimeout(() => { // we have to wait a little bit for 'onResize' function
                    if (this.hotspotsTurnedOn && this.fullscreenState === globalVariables.FULLSCREEN.OPENED) { // if we will exit from fullscreen before the timeout end
                        this.hotspots.enableAll();
                        if (this.isInView && this.isSlideShown) {
                            this.hotspots.showNeededElements();
                        }
                    }
                }, 100);
            }
        }

        // eslint-disable-next-line no-unused-vars
        onBeforeFullscreenOut(data) {
            if (this.zoomIsOpened) {
                this.zoom.hide(true);
                if (this.controls) {
                    this.controls.disable('out');
                }
            }

            super.onBeforeFullscreenOut(data);
            if (this.hotspots) {
                if (!this.hotspotsTurnedOn) {
                    this.hotspots.disableAll();
                }
            }

            // if (this.option('mode') === 'magnifier') {
            //     this.zoom.setLensContainer($J.D.node.body);
            // }
            this.replaceZoom();

            if (this._isReady && this.isSlideShown && this.isInView && !!this.imageNode) {
                this.isHidden = true;
                this.imageNode.setCss({
                    opacity: 0,
                    visibility: 'hidden'
                });
            }
        }

        // eslint-disable-next-line no-unused-vars
        onAfterFullscreenOut(data) {
            if (this.isHidden) {
                this.isHidden = false;
                setTimeout(() => {
                    if (!this.destroyed) {
                        this.setImageWidthHeight();
                        this.imageNode.setCss({
                            opacity: '',
                            visibility: ''
                        });
                    }
                }, 0);
            }

            super.onAfterFullscreenOut(data);

            // if we use it, we do not have pinchend event and touchdrag after that
            // if (this.pinchCloud) {
            //     this.pinchCloud.removeEvent();
            //     this.pinchCloud.addEvent();
            // }
        }

        onSecondSelectorClick() {
            this.zoomOut(true);
        }

        onMouseAction(type) {
            if (type === 'mouseout') {
                if (
                    !$J.contains(['deep', 'magnifier'], this.option('mode')) &&
                    (
                        this.insideOptions.type === 'outside' && this.insideOptions.outsideModeWasChanged ||
                        this.insideOptions.type === 'inner'
                    ) &&
                    (
                        this.insideOptions.trigger === 'hover' ||
                        this.insideOptions.hideZoomForClickTrigger

                    ) && !this.isNotMouse
                ) {
                    this.zoomOut(true);
                }
            }
        }

        makeZoom(direction, x, y) {
            let result = false;
            if (this._isReady && this.zoom) {
                switch (direction) {
                    case 'zoomin':
                        if (this.zoomIsOpened) {
                            if (this.zoom.getNextMinZoom() === 1) {
                                this.controls.disable('in');
                            }
                            result = this.zoom.zoomUp(x, y);
                        } else {
                            result = this.openZoom(x, y, this.insideOptions.type === 'deep' ? 'first' : false);
                        }
                        break;
                    case 'zoomout':
                        if (this.zoomIsOpened) {
                            if (this.zoom.getZoomData() === 0 || this.zoom.getNextMinZoom() === 0) {
                                result = this.zoom.hide();
                                if (this.controls) {
                                    this.controls.disable('out');
                                }
                            } else {
                                result = this.zoom.zoomDown(x, y);
                            }
                        }
                        break;
                    default:
                        // why is it need
                        if (this.zoomIsOpened) {
                            result = this.zoom.hide();
                            if (this.controls) {
                                this.controls.disable('out');
                            }
                        }
                }
            }

            return result;
        }

        calcContainerSize() {
            const size = this.instanceNode.getSize();

            if (!size.height || !size.width) {
                const originSize = this.image.getOriginSize();

                if (!size.height) {
                    this.currentSize.width = size.width;
                    this.currentSize.height = originSize.height / originSize.width * size.width;
                } else {
                    this.currentSize.height = size.height;
                    this.currentSize.width = originSize.width / originSize.height * size.height;
                }
            } else {
                this.currentSize = size;
            }
        }

        getImageSize() {
            let width;
            let height;
            const cs = this.currentSize;
            const is = this.image.getOriginSize();

            if (cs.width >= cs.height) {
                height = Math.min(cs.height, is.height);
                width = is.width / is.height * height;
                if (width > cs.width) {
                    width = Math.min(cs.width, is.width);
                    height = is.height / is.width * width;
                }
            } else {
                width = Math.min(cs.width, is.width);
                height = is.height / is.width * width;
                if (height > cs.height) {
                    height = Math.min(cs.height, is.height);
                    width = is.width / is.height * height;
                }
            }

            return $J.extend({
                realWidth: width,
                realHeight: height,
            }, this.image.getClearSizeWithoutProcessingSettings({ width: width, height: height }));
        }

        setTriggerAction(tr) {
            let trigger = this.option('trigger');

            this.isNotMouse = false;

            if (this.option('ratio') !== 'max' && this.option('ratio') < globalVariables.MIN_RATIO) { return; }

            if (trigger) {
                let showHint = false;

                if (this.lastTriggerAction) {
                    this.lastTriggerAction();
                    this.lastTriggerAction = null;

                    if (this.hint) {
                        this.hint.destroy();
                        this.hint = null;
                        showHint = true;
                    }
                }

                if (tr) { trigger = tr; }

                let imageEvent;
                let hintMessage;

                switch (trigger) {
                    case 'click':
                        imageEvent = 'btnclick tap';
                        hintMessage = this.option('hint.text.click');
                        break;
                    case 'dblclick':
                        imageEvent = 'dblbtnclick dbltap';
                        hintMessage = this.option('hint.text.dblclick');
                        break;
                    case 'hover':
                        imageEvent = 'mouseover';
                        hintMessage = this.option('hint.text.hover');
                        if ($J.browser.mobile) {
                            if (this.outsideModeWasChanged) {
                                hintMessage = this.option('hint.text.dblclick');
                                imageEvent = 'dbltap';
                                trigger = imageEvent;
                            }
                        }
                        break;
                    // no default
                }

                this.createHint(hintMessage);
                if (showHint && this.isSlideShown && this.isInView && this.isZoomSizeExist()) {
                    this.showHint();
                }

                const cbs = [];
                if (trigger === 'hover') {
                    if ($J.browser.touchScreen) {
                        cbs.push(this.setLongTapEvents());
                    }

                    if (!$J.browser.mobile) {
                        cbs.push(this.setHoverEvents());
                    }
                } else {
                    const eventHandler = (e) => {
                        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always) {
                            e.stop();
                            if (this.isFullscreenActionEnded()) {
                                const pageXY = e.getPageXY();
                                this.openZoom(pageXY.x, pageXY.y, false);
                            }
                        }
                    };


                    if ($J.browser.touchScreen) {
                        const pointerCallback = (e) => {
                            this.isNotMouse = e.isTouchEvent();
                        };

                        this.imageNode.addEvent('pointerup', pointerCallback);

                        cbs.push($((cb) => {
                            this.isNotMouse = false;
                            this.imageNode.removeEvent('pointerup', cb);
                        }).bind(this, pointerCallback));
                    }

                    this.imageNode.addEvent(imageEvent, eventHandler);

                    cbs.push($((eventName, cb) => {
                        this.imageNode.removeEvent(eventName, cb);
                    }).bind(this, imageEvent, eventHandler));
                }

                this.lastTriggerAction = $((_cbs) => {
                    $(_cbs).forEach((cb) => { cb(); });
                }).bind(this, cbs);
            }
        }

        setImageSrc(src, srcset, dppx) {
            if (this.imageNode) {
                this.imageNode.attr('src', src);

                if (srcset) {
                    this.imageNode.attr('srcset', srcset + ' ' + dppx + 'x');
                } else {
                    this.imageNode.removeAttr('srcset');
                }

                this.clonedImage = $(this.imageNode.node.cloneNode(true));
                this.clonedImage.node.className = '';
            }
        }

        setImageWidthHeight() {
            if (!this.destroyed) {
                if (this.currentImageSize.realWidth / this.currentImageSize.realHeight >= this.currentSize.width / this.currentSize.height) {
                    this.imageNode.setCss({
                        width: '100%',
                        height: ''
                    });
                } else {
                    this.imageNode.setCss({
                        width: '',
                        height: '100%'
                    });
                }
            }
        }

        createImage(node, src, srcset, dppx) {
            if (!this.imageNode) {
                if (node) {
                    this.imageNode = $(node);
                } else {
                    this.imageNode = $J.$new('img');
                }

                this.imageNode.attr('referrerpolicy', this.referrerPolicy);

                const originSize = this.image.getOriginSize();

                this.imageNode.setCss({
                    maxWidth: originSize.width,
                    maxHeight: originSize.height
                });

                this.setImageWidthHeight();

                this.setTriggerAction();

                if (this.option('wheel') && this.option('mode') === 'deep') {
                    this.imageNode.addEvent('mousescroll', (e) => {
                        if (!this.zoomIsOpened && e.delta > 0) {
                            e.stop();
                            this.openZoom(e.x, e.y, 'first');
                        }
                    });
                }

                $J.W.addEvent('scroll', this.onScrollHandler);

                if (this.dataAlt) {
                    this.imageNode.attr('alt', this.dataAlt);
                }

                this.setImageSrc(src, srcset, dppx);
            }
        }

        setLongTapEvents() {
            let move = false;
            let touchDown = false;
            const _start = (e) => {
                clearTimeout(this.longTapTimer);

                if (this.zoomIsOpened || e.isTouchEvent() && !e.isPrimaryTouch()) { return; }

                if (this.isFullscreenActionEnded()) {
                    this.longTapTimer = setTimeout(() => {
                        if (e.isTouchEvent() && !e.isPrimaryTouch()) { return; }
                        e.stop();
                        move = true;
                        const p  = e.getPageXY();
                        this.openZoom(p.x, p.y, false, true);
                    }, 201);
                    touchDown = true;
                }
            };
            const _move = (e) => {
                if (e.isTouchEvent() && !e.isPrimaryTouch(e)) { return; }
                if (move) {
                    e.stop();
                    const p  = e.getPageXY();
                    this.zoom.customMove(p.x, p.y);
                } else {
                    clearTimeout(this.longTapTimer);
                }
            };
            const _end = (e) => {
                if (e.isTouchEvent() && !e.isPrimaryTouch(e)) { return; }
                if (touchDown) {
                    // e.stop();
                    touchDown = false;
                    clearTimeout(this.longTapTimer);
                }

                if (move) {
                    e.stop();
                    move = false;
                    this.zoom.hide(true);
                }
            };

            if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always) {
                this.instanceNode.addEvent('touchstart pointerdown', _start);
                this.instanceNode.addEvent('touchmove pointermove', _move);
                this.instanceNode.addEvent('touchend pointerup', _end);
            }

            return () => {
                this.instanceNode.removeEvent('touchstart pointerdown', _start);
                this.instanceNode.removeEvent('touchmove pointermove', _move);
                this.instanceNode.removeEvent('touchend pointerup', _end);
            };
        }

        setHoverEvents() {
            let isOver = false;
            let x;
            let y;
            let timer;
            const check = () => {
                return $J.browser.touchScreen && !$J.browser.mobile;
            };
            const _move = (e) => {
                const pageXY = e.getPageXY();
                x = pageXY.x;
                y = pageXY.y;

                if (check() && e.isTouchEvent()) {
                    return;
                }

                if (!isOver && this.isSlideShown && (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always)) {
                    isOver = true;

                    timer = setTimeout(() => {
                        // the scroll is not needed for inner zoom
                        this.openZoom(x, y, false);
                    }, 84);
                }
            };

            const _out = (e) => {
                let relatedTarget = $(e.getRelated());

                if (check() && e.isTouchEvent()) {
                    return;
                }

                if (isOver && (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always)) {
                    isOver = false;

                    if (this.isFullscreenActionEnded()) {
                        while (relatedTarget && relatedTarget !== this.imageNode.node && relatedTarget !== $J.D.node.body) {
                            relatedTarget = $(relatedTarget.parentNode);
                        }

                        if (relatedTarget !== this.imageNode.node) {
                            x = null;
                            y = null;
                            clearTimeout(timer);
                        }
                    }
                }
            };

            let removeConnection = () => {};
            let moveEvent = 'mousemove';
            let outEvent = 'mouseout';

            if (check() && helper.isIe()) {
                removeConnection = this.on('zoomHidden', (e) => { e.stop(); isOver = false; });
                moveEvent = 'pointermove';
                outEvent = 'pointerup';
            }

            this.imageNode.addEvent(moveEvent, _move);
            this.imageNode.addEvent(outEvent, _out);

            return () => {
                removeConnection();
                this.imageNode.removeEvent(moveEvent, _move);
                this.imageNode.removeEvent(outEvent, _out);
            };
        }

        getZoomImageSize() {
            const originSize = this.image.getOriginSize();
            const originWidth = originSize.width;
            const originHeight = originSize.height;
            const r = this.option('ratio');
            let size = { width: originWidth, height: originHeight };

            if (r !== 'max') {
                // because proportions can change
                size.width = this.currentImageSize.realWidth * r;
                size.height = this.currentImageSize.realHeight * r;
                size = ResponsiveImage.roundImageSize(size);
            }

            size.width = Math.min(originWidth, size.width);
            size.height = Math.min(originHeight, size.height);

            return {
                width: size.width,
                height: size.height,
                originWidth: originWidth,
                originHeight: originHeight
            };
        }

        openZoom(x, y, toFirstLevel, longTap) {
            if (this.insideOptions.type === 'deep' && toFirstLevel !== 'zero') {
                toFirstLevel = 'first';
            }

            let result = false;

            if (!this.zoom || !this.isZoomSizeExist()) { return result; }

            // this.zoomIsOpened = img;
            this.zoomIsOpened = true;

            if (this.hint) {
                this.hint.hide();
            }

            if (this.hotspots) {
                this.hotspots.hideActiveHotspotBox(true);
            }

            const imageClone = this.clonedImage;
            const zoomSize = this.getZoomImageSize();

            if (undefined === x) {
                result = this.zoom.showCenter(imageClone, zoomSize, toFirstLevel);
            } else {
                result = this.zoom.show(imageClone, zoomSize, x, y, longTap, toFirstLevel);
            }

            return result;
        }

        createPinchEvent() {
            // difference between scale
            const OPEN_ZOOM = 1.1;
            const FS_OUT = 0.2;
            const FS_IN = 2;

            let scale;
            let baseMin;
            let saveValue;
            let compensation;
            let maxCompensation;
            let minCompensation;
            let max;
            let min;
            let basePercent;

            const setDefaultsValues = () => {
                maxCompensation = 1;
                minCompensation = 1;
                baseMin = this.zoom.getBaseScale().x;
                max = 1;
                min = baseMin;
                saveValue = 1 - baseMin;
            };

            super.createPinchEvent(this.instanceNode);

            this.pinchCloud.onPinchStart = (e) => {
                if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState) ||
                    this.insideOptions.type === 'outside' && !this.insideOptions.outsideModeWasChanged) { return; }

                this.pinchCloud.pinch = true;
                clearTimeout(this.longTapTimer);
                basePercent = false;
                this.pinchCloud.scale = e.scale;
                compensation = 1;

                if (this.hotspots) {
                    this.hotspots.hideActiveHotspotBox(true);
                }

                if (this.zoomIsOpened) {
                    compensation = this.zoom.scale.x;
                    if (baseMin === $J.U) {
                        setDefaultsValues();
                    }

                    compensation /= baseMin;
                }
                this.sendEvent('pinchStart');
            };

            this.pinchCloud.onPinchResize = (e) => {
                if (this.pinchCloud.pinch && !this.pinchCloud.block) {
                    if (this.zoom && this.fullscreenState === globalVariables.FULLSCREEN.OPENED && this.zoomIsOpened) {
                        this.pinchCloud.scale = e.scale;
                        this.zoom.setBasePercent(e.centerPoint);
                    }
                }
            };

            this.pinchCloud.onPinchMove = (e) => {
                if (this.pinchCloud.pinch && !this.pinchCloud.block) {
                    if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.isFullscreenEnabled) {
                        if (!this.zoomIsOpened) {
                            if (e.scale > OPEN_ZOOM) {
                                if (this.option('mode') !== 'magnifier' && this.option('wheel')) {
                                    this.openZoom(e.centerPoint.x, e.centerPoint.y, 'zero');

                                    setDefaultsValues();
                                    compensation = 1;
                                }
                            } else if (e.scale < FS_OUT && this.isFullscreenEnabled) {
                                this.pinchCloud.block = true;
                                this.sendEvent('fullscreenOut');
                            }
                        } else if (this.zoom) {
                            if (!basePercent) {
                                basePercent = true;
                                this.zoom.setBasePercent(e.centerPoint);
                            } else {
                                scale = e.scale;
                                scale *= baseMin;

                                if (max < scale) {
                                    max = scale;

                                    min = baseMin;
                                    minCompensation = 1;

                                    maxCompensation = saveValue / (max - baseMin);
                                }

                                if (min > scale) {
                                    min = scale;

                                    max = 1;
                                    maxCompensation = 1;

                                    minCompensation = baseMin / min;
                                }

                                scale *= compensation;

                                scale = (baseMin + (scale - baseMin) * maxCompensation) * minCompensation;

                                this.zoom.setScale(scale, e.centerPoint.x, e.centerPoint.y);
                            }
                            this.pinchCloud.scale = e.scale;
                        }
                    } else if (e.scale >= FS_IN) {
                        this.pinchCloud.block = true;
                        this.sendEvent('fullscreenIn');
                    }
                }
            };

            // eslint-disable-next-line
            this.pinchCloud.onPinchEnd = (e) => {
                // TODO hide zoom if zoom works with this event
                if (this.pinchCloud.pinch) {
                    this.pinchCloud.pinch = false;
                    this.sendEvent('pinchEnd');
                }

                if (this.zoomIsOpened) {
                    this.pinchCloud.removeEvent();
                }

                this.pinchCloud.block = false;
            };
        }

        loadContent() { this.postInit(); }

        postInit() {
            if (this.postInitState) { return; }
            this.postInitState = 1;

            this.waitToStart.start();

            getNodeSize(this.instanceNode.node).then((size) => {
                this.currentSize = size;
            // eslint-disable-next-line
            }).catch((error) => {
                if (!this.destroyed) {
                    this.calcContainerSize();
                }
            }).finally(() => {
                if (!this.destroyed) {
                    this.postInitState = 2;
                    this.getImage();
                }
            });
        }

        getImageClassContainer() {
            return this.image;
        }

        // checkImage(setts, dontLoad) {
        //     let result;

        //     if (dontLoad) {
        //         result = this.image.isExist(setts); // because we do not load images with imageclass
        //     } else {
        //         result = this.image.isLoaded(setts);
        //     }

        //     return result;
        // }

        getImage() {
            const newImageSize = this.getImageSize();
            /*
                we must do round for those values

                for example without round
                old size is 374
                new size is 470
                470 - 374 = 96
                difference between those sizes is less than 100 and we won't reload for image
                but image was loaded with size 400

                with round
                374 + round = 400
                470 + round = 500

                500 - 400 = 100 we must to reload image
            */
            const diff = difference(
                ResponsiveImage.roundImageSize({ width: this.currentImageSize.width }).width,
                ResponsiveImage.roundImageSize({ width: newImageSize.width }).width
            );
            let originSize;
            let dppx;
            const dontLoad = true;

            this.setImageCss = false;

            if (!this._isReady || diff >= this.differenceBetweenSizes || this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                // fix for if the viewer was with display none
                if (!this._isReady && !newImageSize.width && !newImageSize.height) {
                    setTimeout(() => {
                        this.calcContainerSize();
                        this.getImage();
                    }, 16);
                    return;
                }

                if (diff >= this.differenceBetweenSizes || this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.currentImageSize.width) {
                    this.currentImageSize = newImageSize;
                }

                let opt = this.imageSettings({
                    width: this.currentImageSize.realWidth,
                    height: this.currentImageSize.realHeight,
                    round: true,
                    dontLoad: dontLoad
                });

                if ($J.DPPX > 1) {
                    originSize = this.image.getOriginSize();
                    if (opt.height > opt.width) {
                        dppx = helper.getDPPX(opt.round ? ResponsiveImage.roundImageSize({ height: opt.height }).height : opt.height, originSize.height, this.upscale);
                    } else {
                        dppx = helper.getDPPX(opt.round ? ResponsiveImage.roundImageSize({ width: opt.width }).width : opt.width, originSize.width, this.upscale);
                    }

                    opt.dppx = dppx;
                }

                opt = this.setHDQuality(opt);

                if (!this.checkImage(opt, dontLoad) || !this._isReady) {
                    this.image.getImage(opt);
                } else {
                    const img = this.image.getImage(opt);
                    this.setImageSrc(img.src, img.srcset, dppx);
                }
            } else if (diff < this.differenceBetweenSizes) {
                this.setImageCss = true;
            }
        }

        imageRequest() {
            this.image.getImage(this.imageSettings({
                width: this.currentImageSize.width,
                height: this.currentImageSize.height
            }));
        }

        showImage() {
            if (!this.imageShowPromise) {
                this.imageShowPromise = new Promise((resolve, reject) => {
                    let result = null;
                    let _error = null;
                    if (this.isInView && this.isSlideShown) {
                        this.imageNode.setCss({ opacity: 0, transition: 'opacity .3s linear' });
                        this.instanceNode.append(this.imageNode);

                        helper.loadImage(this.imageNode.node)
                            .then((imageData) => { result = imageData; })
                            .catch((error) => { _error = error; })
                            .finally(() => {
                                if (!this.destroyed) {
                                    this.imageNode.addEvent('transitionend', (e) => {
                                        e.stop();
                                        this.imageNode.removeEvent('transitionend');
                                        this.imageNode.setCss({ opacity: '', transition: '' });

                                        if (result) {
                                            this.sendContentLoadedEvent();
                                            resolve(result);
                                        } else {
                                            reject(_error);
                                        }
                                    });

                                    this.imageNode.getSize();
                                    this.imageNode.setCssProp('opacity', 1);
                                }
                            });
                    } else {
                        this.instanceNode.append(this.imageNode);
                        helper.loadImage(this.imageNode.node)
                            .then((imageData) => { result = imageData; })
                            .catch((error) => { _error = error; })
                            .finally(() => {
                                if (result) {
                                    this.sendContentLoadedEvent();
                                    resolve(result);
                                } else {
                                    reject(_error);
                                }
                            });
                    }
                });
            }
            return this.imageShowPromise;
        }

        createLoader() {
            this.loader = new RoundLoader(this.instanceNode, { 'class': 'zoom-loader' });
        }

        createSirvImage() {
            if (!this.imageUrl) { return; }

            this.on('imageOnload', (e) => {
                e.stopAll();

                if (e.data.callbackData.lens) {
                    if ((this.zoom.isShown() || this.zoom.isShowing()) && this.zoomIsOpened) {
                        this.zoom.setImage(e.data);
                    }
                } else if (this._isReady) {
                    if (this.imageShowPromise) {
                        this.setImageSrc(e.data.src, e.data.srcset, e.data.dppx);
                    }
                } else {
                    this.createImage(e.data.node, e.data.src, e.data.srcset, e.data.dppx);

                    this.showImage().finally(() => {
                        if (this.loader) { this.loader.hide(); }
                        this.done();
                        this.sendContentLoadedEvent();
                    });
                }
            });

            this.on('imageOnerror', (e) => {
                e.stopAll();

                if (this.loader) { this.loader.hide(); }
                console.log('image error');
            });

            this.image = new ResponsiveImage(this.imageUrl, { imageSettings: this.queryParams, referrerPolicy: this.referrerPolicy });
            this.image.setParent(this);
            this.getInfo();
        }

        getInfoSize() {
            return new Promise((resolve, reject) => {
                this.getInfo()
                    .then(() => { resolve({ size: this.infoSize }); })
                    .catch((err) => { reject({ error: err, isPlaceholder: err._isplaceholder }); });
            });
        }

        getSelectorImgUrl(data) {
            return new Promise((resolve, reject) => {
                const defOpt = this.imageSettings();
                if (defOpt.src) { data.src = defOpt.src; }
                data.srcset = defOpt.srcset;

                if (this.isInfoLoaded) {
                    this.waitToStart.wait(() => {
                        resolve($J.extend(this.image.getThumbnail(data), {
                            alt: this.dataAlt
                        }));
                    });
                } else {
                    this.getInfo()
                        .then(() => {
                            this.waitToStart.wait(() => {
                                resolve($J.extend(this.image.getThumbnail(data), {
                                    alt: this.dataAlt
                                }));
                            });
                        })
                        .catch(reject);
                }
            });
        }

        getThumbnailData(opt) {
            return this.image.getThumbnail(opt);
        }

        createControls() {
            if (this.insideOptions.controls) {
                this.controls = new ZoomControls(this.instanceNode);
                this.controls.setParent(this);

                this.on('zoomControlsAction', (e) => {
                    e.stopAll();
                    if (this.zoom) {
                        this.makeZoom(e.data.type);
                    }
                });
            }
        }

        changeControlsState(zoom /* from 0 to 1 */) {
            if (this.controls) {
                if (zoom === 1 || zoom === 0) {
                    if (zoom === 1) {
                        this.controls.disable('in');
                    } else {
                        this.controls.disable('out');
                    }
                } else {
                    this.controls.disable();
                }
            }
        }

        createZoom(options) {
            let result = null;

            if (!this.destroyed) {
                let lensContainer = this.zoomContainer;
                result = super.createZoom(this.instanceNode, options);

                if (this.option('mode') === 'magnifier') {
                    lensContainer = getContainerForZoom(this.instanceNode);
                } else if (!$J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) {
                    if (result.type === 'outside') {
                        lensContainer = getContainerForZoom(this.instanceNode);
                        // because container of viewer can be overflow hidden
                        lensContainer = $J.D.node.body;
                    }
                }

                if (lensContainer) {
                    this.zoom.setLensContainer(lensContainer);
                }
            }

            return result;
        }

        zoomIn() {
            let result = false;
            if (this._isReady && this.zoom) {
                if (this.option('fullscreenOnly') && this.fullscreenState === globalVariables.FULLSCREEN.CLOSED) {
                    this.sendEvent('fullscreenIn');
                } else {
                    result = this.makeZoom('zoomin');
                }
            }
            return result;
        }

        zoomOut(force) {
            let result = false;
            if (this._isReady && this.zoom) {
                if (force) {
                    if (this.zoomIsOpened) {
                        result = this.zoom.hide(!this.zoom.getZoomData());
                    }
                } else {
                    result = this.makeZoom('zoomout');
                }
            }
            return result;
        }

        getOriginImageUrl() {
            if (this._isReady) {
                return this.image.getOriginImageUrl();
            }

            return null;
        }

        isZoomSizeExist() {
            let result = false;

            if (this._isReady) {
                const minZoomFactor = 100; // like in deep zoom level calculation
                const cs = this.currentImageSize;
                const zoomSize = this.getZoomImageSize();

                if (zoomSize.originWidth - cs.realWidth >= minZoomFactor && (this.option('ratio') === 'max' || this.option('ratio') >= globalVariables.MIN_RATIO)) {
                    result = true;
                }
            }

            return result;
        }

        onResize() {
            let result = false;
            if (this.destroyed) { return; }

            if (this.isStarted && this.postInitState === 2) {
                this.calcContainerSize();
                this.getImage();

                if (this.hotspots) {
                    if (this.hotspotsTurnedOn && $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING], this.fullscreenState) ||
                        this.insideOptions.trigger !== 'hover' && $J.contains([globalVariables.FULLSCREEN.OPENED, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState)) {
                        this.hotspots.setContainerSize(this.imageNode.node.getBoundingClientRect());
                        if (this.isInView && this.isSlideShown) {
                            this.hotspots.showNeededElements();
                        }
                    }
                }

                if (this.imageNode) {
                    this.setImageWidthHeight();

                    if (this.isZoomSizeExist()) {
                        this.imageNode.addClass(globalVariables.CSS_CURSOR_ZOOM_IN);
                    } else {
                        if (this.hint) { this.hint.hide(); }
                        this.imageNode.removeClass(globalVariables.CSS_CURSOR_ZOOM_IN);
                    }
                }

                result = true;
            }

            if (this.controls) {
                if (this.isZoomSizeExist()) {
                    this.controls.show();
                } else {
                    this.controls.hide();
                }
            }

            this.replaceZoom();

            if (this.zoom) {
                this.zoom.onResize();
            }

            return result;
        }

        onScroll(e) {
            if (this.zoomIsOpened) {
                e.stop();
            }

            clearTimeout(this.longTapTimer);
            this.scrollDebounce();
        }

        getType() {
            return this.type;
        }

        destroy() {
            this.destroyed = true;

            if (this.loader) {
                this.loader.destroy();
                this.loader = null;
            }

            $($J.W).removeEvent('scroll', this.onScrollHandler);
            this.onScrollHandler = null;

            if (this.lastTriggerAction) {
                this.lastTriggerAction();
                this.lastTriggerAction = null;
            }

            if (this.hint) {
                this.hint.destroy();
                this.hint = null;
            }

            if (this.image) {
                this.off('imageOnload');
                this.off('imageOnerror');
                this.image.destroy();
                this.image = null;
            }

            if (this.controls) {
                this.controls.destroy();
                this.controls = null;
                this.off('zoomControlsAction');
            }

            if (this.hotspots) {
                this.hotspotsTurnedOn = false;
                this.instanceNode.removeEvent('tap');
            }

            if (this.zoom) {
                this.off('zooming');
                this.off('zoomUp');
                this.off('zoomDown');
            }

            this.instanceNode.clearEvents();
            this.instanceNode.removeClass(P + '-zoom-view');

            if (this.imageNode) {
                this.imageNode.remove();
                this.imageNode = null;
            }

            if (this.clonedImage) {
                this.clonedImage = null;
            }

            this.zoomDebounce.cancel();
            this.zoomDebounce = null;

            this.scrollDebounce.cancel();
            this.scrollDebounce = null;

            clearTimeout(this.longTapTimer);
            this.longTapTimer = null;

            this.hotspotsData = null;

            super.destroy();

            return true;
        }
    }
    return Zoom_;
})();

return Zoom;

    }
);
