Sirv.define(
    'Slider',
    ['bHelpers','magicJS','globalVariables','globalFunctions','ResponsiveImage','helper','EventEmitter','ContextMenu','ComponentLoader','defaultsVideoOptions','ViewerImage','SliderBuilder','ProductDetail','Description','Spin','Zoom','Video'],
    (bHelpers,magicJS,globalVariables,globalFunctions,ResponsiveImage,helper,EventEmitter,ContextMenu,ComponentLoader,defaultsVideoOptions,ViewerImage,SliderBuilder,ProductDetail,Description,Spin,Zoom,Video) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-disable no-unused-vars */

const CSS_MAIN_CLASS = 'smv';
const SELECTOR_TAG = CSS_MAIN_CLASS + '-thumbnail';
const SELECTOR_CLASS = CSS_MAIN_CLASS + '-selector';

let DPPX = ($J.W.node.devicePixelRatio >= 2) ? 2 : 1; // Dots per px. 2 - is equal to Retina.;

/* eslint-env es6 */
/* eslint-disable no-extra-semi */
/* eslint-disable no-unused-vars */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const defaultOptions = {
    orientation: { type: 'string', 'enum': ['horizontal', 'vertical'], defaults: 'horizontal' },
    arrows: { type: 'boolean', defaults: true },
    loop: { type: 'boolean', defaults: true },

    // Quality applied to images (1x - 1.49x).
    quality: { type: 'number', minimum: 0, maximum: 100, defaults: 80 },
    // Quality applied to hi-res images (1.5x - 2x).
    hdQuality: { type: 'number', minimum: 0, maximum: 100, defaults: 60 },

    itemsOrder: { type: 'array', defaults: [] },

    autostart: {
        oneOf: [
            /*
                created - init and load
                visible - init and load in view
                off - not init
            */
            { type: 'string', 'enum': ['created', 'visible', 'off'] },
            { type: 'boolean', 'enum': [false] }
        ],
        defaults: 'visible'
    },

    // A distance from the viewport within which the in-view state should be triggered.
    threshold: { type: 'number', minimum: 0, defaults: 0 },

    slide: {
        // slide.first
        first: { type: 'number', minimum: 0, defaults: 0 },
        // slide.delay
        delay: { type: 'number', minimum: 9, defaults: 3000 },
        // slide.preload
        preload: { type: 'boolean', defaults: true },
        // slide.autoplay
        autoplay: { type: 'boolean', defaults: false },

        animation: {
            // slide.animation.type
            type: {
                oneOf: [
                    { type: 'string', 'enum': ['off', 'slide', 'fade'] },
                    { type: 'boolean', 'enum': [false] }
                ],
                defaults: 'fade'
            },

            // slide.animation.type
            duration: { type: 'number', minimum: 9, defaults: 200 }
        },

        socialbuttons: {
            enable: { type: 'boolean', defaults: false },
            types: {
                facebook: { type: 'boolean', defaults: true },
                twitter: { type: 'boolean', defaults: true },
                linkedin: { type: 'boolean', defaults: true },
                reddit: { type: 'boolean', defaults: true },
                tumblr: { type: 'boolean', defaults: true },
                pinterest: { type: 'boolean', defaults: true },
                telegram: { type: 'boolean', defaults: true }
            }
        }
    },

    thumbnails: {
        // thumbnails.enable
        enable: { type: 'boolean', defaults: true },
        // thumbnails.size
        size: { type: 'number', minimum: 5, defaults: 70 },
        // thumbnails.position
        position: { type: 'string', 'enum': ['top', 'left', 'right', 'bottom'], defaults: 'bottom' },
        // thumbnails.type
        type: { type: 'string', 'enum': ['square', 'auto', 'bullets', 'grid', 'crop'], defaults: 'square' },
        // thumbnails.always
        always: { type: 'boolean', defaults: false },
        // thumbnails.target
        target: {
            oneOf: [
                { type: 'string' },
                { type: 'boolean', 'enum': [false] },
            ],
            defaults: false
        },
        // thumbnails.watermark
        watermark: { type: 'boolean', defaults: true }
    },

    fullscreen: {
        // fullscreen.enable
        enable: { type: 'boolean', defaults: true },
        // fullscreen.always
        always: { type: 'boolean', defaults: false },
        // fullscreen.native
        'native': { type: 'boolean', defaults: false },

        // TODO
        // +background: <color>,

        thumbnails: {
            // fullscreen.thumbnails.enable
            enable: { type: 'boolean', defaults: true },
            // fullscreen.thumbnails.size
            size: {
                oneOf: [
                    { type: 'string', 'enum': ['auto'] },
                    { type: 'number', minimum: 5 }
                ],
                defaults: 'auto'
            },
            // fullscreen.thumbnails.position
            position: { type: 'string', 'enum': ['top', 'left', 'right', 'bottom'], defaults: 'bottom' },
            // fullscreen.thumbnails.type
            type: { type: 'string', 'enum': ['square', 'auto', 'bullets', 'grid', 'crop'], defaults: 'square' },
            // thumbnails.always
            always: { type: 'boolean', defaults: false },
            // fullscreen.thumbnails.autohide
            autohide: { type: 'boolean', defaults: false },
            // fullscreen.thumbnails.watermark
            watermark: { type: 'boolean', defaults: true }
        }
    },

    contextmenu: {
        // contextmenu.enable
        enable: { type: 'boolean', defaults: false },
        text: {
            zoom: {
                // contextmenu.text.zoom.in
                'in': {
                    oneOf: [
                        { type: 'string' },
                        { type: 'boolean', 'enum': [false] }
                    ],
                    defaults: 'Zoom In'
                },
                // contextmenu.text.zoom.out
                out: {
                    oneOf: [
                        { type: 'string' },
                        { type: 'boolean', 'enum': [false] }
                    ],
                    defaults: 'Zoom Out'
                }
            },

            fullscreen: {
                // contextmenu.fullscreen.enter
                enter: {
                    oneOf: [
                        { type: 'string' },
                        { type: 'boolean', 'enum': [false] }
                    ],
                    defaults: 'Enter Full Screen'
                },
                // contextmenu.fullscreen.exit
                exit: {
                    oneOf: [
                        { type: 'string' },
                        { type: 'boolean', 'enum': [false] }
                    ],
                    defaults: 'Exit Full Screen'
                }
            },
            // contextmenu.text.download
            download: {
                oneOf: [
                    { type: 'string' },
                    { type: 'boolean', 'enum': [false] }
                ],
                defaults: 'Download Image'
            }
        }
    },

    productdetail: {
        enable: { type: 'boolean', defaults: false },
        position: { type: 'string', 'enum': ['top', 'right', 'bottom', 'left'], defaults: 'top' }
    }

    /*
        TODO
        contextmenu: {
            items: [
                { action: zoomIn, text: 'Збільшити' }
                { action: zoomOut }
            ]
        }

    */

    // ready: { type: 'function', defaults: () => {} },
    // beforeSlideIn: { type: 'function', defaults: () => {} },
    // beforeSlideOut: { type: 'function', defaults: () => {} },
    // afterSlideIn: { type: 'function', defaults: () => {} },
    // afterSlideOut: { type: 'function', defaults: () => {} },
    // fullscreenIn: { type: 'function', defaults: () => {} },
    // fullscreenOut: { type: 'function', defaults: () => {} }
    // sendStats: { type: 'function', defaults: () => {} }
};

/* eslint-env es6 */
/* global $ */
/* global $J */
/* global EventEmitter */
/* global helper */
/* global ViewerImage */
/* global Zoom */
/* global Spin */
/* global Video */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint-disable no-lonely-if */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvService" }] */


class SirvService extends EventEmitter {
    constructor(node, options, additionalOptions) {
        super();

        this.node = $(node);
        this.options = options;

        this._type = globalVariables.SLIDE.TYPES.NONE;
        this.imgSrc = null;
        this.effect = null;
        this.additionalEffects = [];
        this.isStarted = false;
        this.isPrepared = false;
        this.toolOptions = {};
        this.api = {};
        this.isActive = false;
        this.additionalOptions = additionalOptions;

        this.parse();
        this.setEvents();
    }

    static isExist(node) {
        let result = false;
        const resultOfParse = helper.getSirvType(node);
        const deps = {
            Image: ViewerImage,
            Spin: Spin,
            Zoom: Zoom,
            Video: Video
        };

        if (resultOfParse && !!deps[$J.camelize('-' + globalVariables.SLIDE.NAMES[resultOfParse.type])]) {
            result = true;
        }

        return result;
    }

    createAPI() {
        if (this.effect) {
            this.api = this.effect.api;

            let methods = [];
            const t = globalVariables.SLIDE.TYPES;

            switch (this._type) {
                case t.SPIN:
                    methods = ['play', 'rotate', 'rotateX', 'rotateY', 'zoomIn', 'zoomOut'];
                    break;
                case t.ZOOM:
                    if (this.api.zoomIn) {
                        methods = ['zoomIn', 'zoomOut'];
                    }
                    break;
                // no default
            }

            methods.forEach((method) => {
                const _oldMethod = this.api[method];
                this.api[method] = (...args) => {
                    let result = false;
                    const om = _oldMethod;

                    if (this.isActive) {
                        result = om.apply(this, args);
                    }

                    return result;
                };
            });
        }
    }

    setEvents() {
        this.on('stats', (e) => {
            e.stopEmptyEvent();
            e.data.component = globalVariables.SLIDE.NAMES[this._type];
        });

        // init, ready, zoomIn, zoomOut
        this.on('componentEvent', (e) => {
            e.stopEmptyEvent();

            e.data.component = globalVariables.SLIDE.NAMES[this._type];

            if (e.data.type === 'ready') {
                if (this._type === globalVariables.SLIDE.TYPES.IMAGE && e.data.data.imageIndex !== null) {
                    e.stopAll();
                }
                this.toolOptions = this.effect.options;
            }
        });
    }

    parse() {
        const resultOfParse = helper.getSirvType(this.node.node);
        if (resultOfParse) {
            this._type = resultOfParse.type;
            this.imgSrc = resultOfParse.imgSrc;
        }
    }

    push(imgNode) {
        if (ViewerImage) {
            const effect = new ViewerImage(imgNode, {
                options: this.options.image,
                isFullscreen: this.additionalOptions.isFullscreen,
                imageIndex: this.additionalEffects.length
            });
            effect.parentClass = this;

            this.additionalEffects.push({
                node: imgNode,
                src: $(imgNode).attr('src'),
                datasrc: $(imgNode).attr('data-src'),
                effect: effect
            });
        }
    }

    sendEvent(nameOfEvent) {
        if (this.effect && this.effect.sendEvent) { this.effect.sendEvent(nameOfEvent); }
    }

    resize() {
        this.broadcast('resize');
    }

    startFullInit(options) {
        if (this.effect) {
            this.effect.startFullInit(options ? options[this._type] : null);

            if (this.additionalEffects.length) {
                this.additionalEffects.forEach((effect) => {
                    if (effect.effect) {
                        effect.effect.startFullInit(options ? options[this._type] : null);
                    }
                });
            }
        }
    }

    getSelectorImgUrl(data) {
        return this.effect.getSelectorImgUrl(data);
    }

    getInfoSize() {
        let result = null;

        if (this._type === globalVariables.SLIDE.TYPES.IMAGE) {
            result = new Promise((resolve, reject) => {
                Promise.all(
                    [
                        this.effect.getInfoSize()
                    ].concat(
                        this.additionalEffects.map((value) => {
                            return value.effect.getInfoSize();
                        })
                    )
                )
                    .then((values) => { resolve(values[0]); })
                    .catch(reject);
            });
        } else {
            result = this.effect.getInfoSize();
        }

        return result;
    }

    start() {
        if (this.isPrepared) { return; }
        this.isPrepared = true;

        const options = {
            isFullscreen: this.additionalOptions.isFullscreen,
            quality: this.additionalOptions.quality,
            hdQuality: this.additionalOptions.hdQuality,
            isHDQualitySet: this.additionalOptions.isHDQualitySet,
            always: this.additionalOptions.always,
            nativeFullscreen: this.additionalOptions.nativeFullscreen
        };

        const t = globalVariables.SLIDE.TYPES;

        switch (this._type) {
            case t.IMAGE:
                if (ViewerImage) {
                    this.effect = new ViewerImage(this.node.node, Object.assign(options, {
                        options: this.options.image,
                        imageIndex: null
                    }));
                    this.effect.parentClass = this;
                }
                break;
            case t.PANZOOM:
            case t.ZOOM:
                if (Zoom) {
                    this.effect = new Zoom(this.node.node, Object.assign(options, {
                        options: this.options.zoom
                    }));
                    this.effect.parentClass = this;
                }
                break;
            case t.SPIN:
                if (Spin) {
                    this.node.setCss({ // fix for shadow DOM
                        width: '100%',
                        height: '100%'
                    });
                    this.effect = new Spin(this.node.node, Object.assign(options, {
                        options: this.options.spin
                    }));
                    this.effect.parentClass = this;
                }
                break;
            case t.VIDEO:
                if (Video) {
                    this.effect = new Video(this.node.node, Object.assign(options, {
                        options: this.options.video,
                        nativeFullscreen: this.additionalOptions.nativeFullscreen
                    }));
                    this.effect.parentClass = this;
                }
                break;
            default:
        }

        this.createAPI();
    }

    isThumbnailGif() {
        if (this.effect && this._type === globalVariables.SLIDE.TYPES.SPIN) {
            return this.effect.isThumbnailGif();
        }

        return false;
    }

    isZoomSizeExist() {
        const t = globalVariables.SLIDE.TYPES;
        if (this.effect && [t.SPIN, t.PANZOOM, t.ZOOM].includes(this._type)) {
            return this.effect.isZoomSizeExist();
        }

        return false;
    }

    startGettingInfo() {
        if (this.effect) {
            this.effect.startGettingInfo();
        }
    }

    startTool(isShown, preload, firstSlideAhead) {
        if (!this.isStarted && this.effect) {
            this.isStarted = true;
            this.effect.run(isShown, preload, firstSlideAhead);

            if (this.additionalEffects.length) {
                this.additionalEffects.forEach((effect) => {
                    if (effect.effect) {
                        effect.effect.run(isShown, preload, firstSlideAhead);
                    }
                });
            }
        }
    }

    loadContent() {
        if (this.isStarted) {
            this.effect.loadContent();
        }
    }

    loadThumbnail() {
        if (this.isStarted) {
            this.effect.loadThumbnail();
        }
    }

    get type() {
        return this._type;
    }

    getData() {
        let result = {};

        if (this.effect) {
            result = Object.assign(result, this.api);
            delete result.start;
            delete result.stop;
            delete result.refresh;
        }

        return result;
    }

    get originImageUrl() {
        if (this.effect) {
            return this.effect.originImageUrl;
        }

        return null;
    }

    getZoomData() {
        if ([globalVariables.SLIDE.TYPES.SPIN, globalVariables.SLIDE.TYPES.ZOOM].includes(this._type)) {
            return {
                isZoomed: this.effect.isZoomed(),
                zoom: this.effect.getZoomData()
            };
        }

        return null;
    }

    getSpinOrientation() {
        if (this._type === globalVariables.SLIDE.TYPES.SPIN) {
            return this.effect.orientation;
        }

        return null;
    }

    getSocialButtonData(data, isSpin) {
        let result = null;

        if (this.isStarted) {
            if (this._type === globalVariables.SLIDE.TYPES.SPIN) {
                result = this.effect.getSocialButtonData(data, isSpin);
            } else {
                result = this.effect.getSocialButtonData(data);
            }
        }

        return result;
    }

    loadVideoSources() {
        if (this.effect) {
            this.effect.addSources();
        }
    }

    /**
     * Viewer has touchdrag event for slideing slides and if we have touchdrag event in the effect (spin) it can make conflict
     * The method fixes conflict
     */
    isEffectActive() {
        if (this.effect && this._type === 'spin') {
            return this.effect.isActive();
        }

        return false;
    }

    activate() {
        if (!this.isActive) {
            this.isActive = true;
        }
    }

    deactivate() {
        this.isActive = false;
    }

    getToolOptions() {
        return this.toolOptions;
    }

    destroy() {
        if (this.effect) {
            this.effect.destroy();

            if (this.additionalEffects.length) {
                this.additionalEffects.forEach((effect) => {
                    if (effect.effect) {
                        effect.effect.destroy();
                    } else {
                        if (!effect.src && effect.datasrc) {
                            effect.node.removeAttribute('src');
                        }
                    }
                });
            }
        }
        this.toolOptions = {};
        this.api = {};
        this.isActive = false;
        this.isStarted = false;
        this.isPrepared = false;
        this.off('stats');
        this.off('componentEvent');
        super.destroy();
    }
}

/* eslint-env es6 */
/* global EventEmitter */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Effect" }] */


const Effects = {};

const Effect = (() => {
    const getClassName = (str) => { return $J.camelize('-' + str); };

    const getDirection = (direction, orientation) => {
        var result;
        if (orientation === 'horizontal') {
            result = (direction === 'next') ? 'right' : 'left';
        } else {
            result = (direction === 'next') ? 'bottom' : 'top';
        }

        return result;
    };

    class Effect_ extends EventEmitter {
        constructor(options) {
            super();
            this.options = Object.assign({
                effect: 'blank',
                orientation: 'horizontal',
                time: 600,
                easing: 'ease-in-out'
            }, options);
            this.isMove = false;

            this.callbackData = null;

            this.effectName = 'blank';
            this.effect = null;

            this.addEvents();
        }

        addEvents() {
            this.on('effectStart', (e) => {
                e.data = { callbackData: this.callbackData };
                this.isMove = true;
            });

            this.on('effectEnd', (e) => {
                e.data = { callbackData: this.callbackData };
                this.isMove = false;
                this.effect.destroy();
                this.effect = null;
            });
        }

        make(element1, element2, options, callbackData) {
            const o = Object.assign(this.options, (options || {}));

            this.stop();

            let name = getClassName(o.effect);

            if (!Object.prototype.hasOwnProperty.call(Effects, name)) { name = 'Blank'; }

            this.effect = new Effects[name](element1, element2, {
                time: o.time,
                easing: o.easing,
                direction: getDirection(o.direction, o.orientation)
            });
            this.effect.parentClass = this;

            this.callbackData = callbackData;

            this.effect.make();
        }

        stop() {
            if (this.effect) {
                this.effect.destroy();
                this.effect = null;
            }

            this.callbackData = null;
        }

        destroy() {
            this.stop();
            this.off('effectStart');
            this.off('effectEnd');
            this.isMove = false;
            super.destroy();
        }
    }

    return Effect_;
})();

/* eslint-env es6 */
/* global Effects */
/* global EventEmitter */
/* eslint class-methods-use-this: ["error", {"exceptMethods": ["_move"]}] */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


class Blank_ extends EventEmitter {
    constructor(element1, element2, options) {
        super();
        this.name = 'blank';
        this.elements = [element1, element2];
        this.elements[0].node = $(this.elements[0].node);
        this.elements[1].node = $(this.elements[1].node);
        this.options = Object.assign({}, (options || {}));
        this.states = {
            NOT_STARTED: 0,
            MOVING: 1,
            ENDED: 2
        };
        this.state = this.states.NOT_STARTED;
        this.isDestroyed = false;
    }

    _show(index) { this.elements[index].node.setCss({ opacity: 1, visibility: 'visible' }); }
    _hide(index) { this.elements[index].node.setCss({ opacity: 0, visibility: 'hidden' }); }

    _start() {
        this.emit('effectStart', { name: this.name, indexes: [this.elements[0].index, this.elements[1].index] });
        this._show(0);
        this.elements[0].node.setCssProp('z-index', 9);
        this._show(1);
        this.elements[1].node.setCssProp('z-index', 7);
    }

    _move(callback) { callback(); }

    _end() {
        if (this.state !== this.states.ENDED) {
            this.state = this.states.ENDED;
            this._hide(0);
            this.emit('effectEnd', { name: this.name, indexes: [this.elements[0].index, this.elements[1].index] });
        }
    }

    _clear() {
        this.elements.forEach((element) => {
            element.node.setCss({ zIndex: '', opacity: '', visibility: '' });
        });
    }

    make() {
        if (this.state === this.states.NOT_STARTED) {
            this.state = this.states.MOVING;
            this._start();
            this._move(() => {
                this._end();
                this._clear();
            });
        }
    }

    destroy() {
        if (!this.isDestroyed) {
            this.isDestroyed = true;
            this._end();
            this._clear();
            this.state = this.states.ENDED;
            super.destroy(this);
        }
    }
}

Effects.Blank = Blank_;

/* global Effects, Blank_ */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


Effects.Slide = (() => {
    const toPercentString = (value) => { return value + '%'; };

    const getNormalizeArray = (arr) => { return arr.map((value) => { return toPercentString(value); }); };

    class Slide_ extends Blank_ {
        constructor(element1, element2, options) {
            super(element1, element2, options);

            this.options = Object.assign(this.options, Object.assign({
                direction: 'left', // top / left / right / bottom
                time: 600,
                easing: 'ease-in-out'
            }, (options || {})));
            this.name = 'slide';

            this.from = $([0, -100]);
            this.to = $([100, 0]);

            if (['right', 'bottom'].includes(this.options.direction)) {
                this.from[1] *= (-1);
                this.to[0] *= (-1);
            }

            this.from = getNormalizeArray(this.from);
            this.to = getNormalizeArray(this.to);
        }

        _show(index) {
            const el = this.elements[index].node;

            if (['left', 'right'].includes(this.options.direction)) {
                this.from[index] = this.from[index] + ', 0%';
                this.to[index] = this.to[index] + ', 0%';
            } else {
                this.from[index] = '0%, ' + this.from[index];
                this.to[index] = '0%, ' + this.to[index];
            }

            el.setCssProp('transform', 'translate3d(' + this.from[index] + ', 0px)');
            super._show(index);
        }

        _move(callback) {
            const options = this.options;
            this.elements[1].node.addEvent('transitionend', (e) => {
                if (this.elements[1].node.node !== e.target) { return; }
                e.stop();
                super._move(callback);
            });

            this.elements.forEach((element, index) => {
                element.node.render();
                element.node.setCssProp('transition', 'transform ' + options.time + 'ms ' + options.easing);
                element.node.setCssProp('transform', 'translate3d(' + this.to[index] + ', 0px)');
            });
        }

        _clear() {
            this.elements.forEach((element) => {
                element.node.removeEvent('transitionend');
                element.node.setCss({ transform: '', transition: '' });
            });

            super._clear(this);
        }
    }

    return Slide_;
})();

/* eslint-env es6 */
/* global Effects, Blank_ */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


class Fade_ extends Blank_ {
    constructor(element1, element2, options) {
        super(element1, element2, options);

        this.options = Object.assign(this.options, Object.assign({
            time: 600,
            easing: 'linear'
        }, (options || {})));
        this.name = 'fade';

        this.from = $([1, 0]);
        this.to = $([0, 1]);
    }

    _show(index) {
        super._show(index);
        const el = this.elements[index].node;
        el.setCssProp('opacity', this.from[index]);
    }

    _move(callback) {
        const options = this.options;

        this.elements[1].node.addEvent('transitionend', (e) => {
            if (this.elements[1].node.node !== e.target) { return; }
            e.stop();
            super._move(callback);
        });

        this.elements.forEach((element, index) => {
            element.node.render();
            element.node.setCssProp('transition', 'opacity ' + options.time + 'ms ' + options.easing);
            element.node.setCssProp('opacity', this.to[index]);
        });
    }

    _clear() {
        this.elements.forEach((element) => {
            element.node.removeEvent('transitionend');
            element.node.setCss({ opacity: '', transition: '' });
        });

        super._clear();
    }
}

Effects.Fade = Fade_;

/* eslint-env es6 */
/* global CSS_MAIN_CLASS */
/* global EventEmitter */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Arrows" }] */


const Arrows = (() => {
    const createArrows = (orientation, customClass) => {
        return $(['prev', 'next']).map((value) => {
            const container = $J.$new('div').addClass(CSS_MAIN_CLASS + '-arrow-control', CSS_MAIN_CLASS + '-arrow-control-' + value);
            const arrow = $J.$new('div')
                .addClass(CSS_MAIN_CLASS + '-button')
                .addClass(CSS_MAIN_CLASS + '-arrow')
                .addClass(CSS_MAIN_CLASS + '-arrow-' + value);

            if (customClass && customClass !== '') {
                arrow.addClass(CSS_MAIN_CLASS + '-arrow-' + customClass);
            }

            container.append(arrow);
            return container;
        });
    };

    class Arrows_ extends EventEmitter {
        constructor(options) {
            super();

            this.options = Object.assign({
                orientation: 'horizontal',
                customClass: ''
            }, (options || {}));

            this.arrows = createArrows(this.options.orientation, this.options.customClass);

            this.arrows.forEach((arrow, index) => {
                const _arrowType = !index ? 'prev' : 'next';
                const button = $(arrow.node.firstChild);

                arrow.store('arrowType', _arrowType);
                button.append($J.$new('div').addClass(CSS_MAIN_CLASS + '-icon'));
                button.addEvent(['btnclick', 'tap'], $((typeOfArrow, e) => {
                    e.stop();

                    if (!arrow.fetch('disabled')) {
                        this.emit('arrowAction', { data: { type: typeOfArrow } });
                    }
                }).bind(this, _arrowType));
            });

            this.isShow = true;
        }

        get nodes() { return $([this.arrows[0], this.arrows[1]]); }

        show() {
            if (!this.isShow) {
                this.arrows.forEach((arrow) => {
                    arrow.removeClass(CSS_MAIN_CLASS + '-hidden');
                });
                this.isShow = true;
            }
        }

        hide() {
            if (this.isShow) {
                this.isShow = false;
                this.arrows.forEach((arrow) => {
                    arrow.addClass(CSS_MAIN_CLASS + '-hidden');
                });
            }
        }

        disable(arrow) {
            if (arrow && this.isShow) {
                const indexArrow = (arrow === 'forward' ? 1 : 0);
                this.arrows[indexArrow].store('disabled', true);
                $(this.arrows[indexArrow].node.firstChild).attr('disabled', '');
            } else {
                this.arrows.forEach((element) => {
                    $(element.node.firstChild).removeAttr('disabled');
                    element.store('disabled', false);
                });
            }
        }

        destroy() {
            this.arrows.forEach((arrow) => {
                $(arrow.node.firstChild).removeEvent(['btnclick', 'tap']);
                arrow.del('arrowType');
                arrow.del('disabled');
                arrow.remove();
            });

            this.arrows = $([]);
            this.isShow = false;
            super.destroy();
        }
    }

    return Arrows_;
})();

const Selectors = (() => {

/* global */
/* eslint-disable no-unused-vars */

const getOrientation = (position) => {
    let result = 'horizontal';

    if (['left', 'right'].includes(position)) {
        result = 'vertical';
    }

    return result;
};

const equalOptions = (opt1, opt2) => {
    return !Object.entries(opt1).some(([key, value]) => value !== opt2[key]);
};

const DEFAULT_SIZE = {
    width: 560,
    height: 315
};

const SELECTORS_STATE = {
    NONE: 0,
    STANDARD: 1,
    FULLSCREEN: 2
};

/* eslint-env es6 */
/* global EventEmitter, globalFunctions, DEFAULT_SIZE, SELECTOR_TAG */
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint-disable class-methods-use-this */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SelectorContent" }] */

class SelectorContent extends EventEmitter {
    constructor(node, type, size, orientation) {
        super();
        this.node = $(node);
        this.type = type;
        this.size = size; // 70
        this.orientation = orientation; // selectors orientation 'horizontal' | 'vertical'
        this.getPlaceholderSizePromise = null;
        this.destroyed = false;
        this.loaded = false;

        this.content = null;
        if (this.node.tagName === SELECTOR_TAG) {
            this.content = Array.from(this.node.node.childNodes);
        }
    }

    isLoaded() {
        return this.loaded;
    }

    setCssSize() {
        this.node.setCss(this.selectorSize);
    }

    get selectorSize() {
        const selectorSize = {};

        if (['square', 'crop'].includes(this.type)) {
            selectorSize.width = this.size;
            selectorSize.height = this.size;
        } else {
            if (this.orientation === 'horizontal') {
                selectorSize.height = this.size;
            } else {
                selectorSize.width = this.size;
            }
        }

        return selectorSize;
    }

    get placeholderSize() {
        if (!this.getPlaceholderSizePromise) {
            this.getPlaceholderSizePromise = new Promise((resolve) => {
                const size = this.selectorSize;

                if (size.width && size.height) {
                    resolve(size);
                } else {
                    if (this.destroyed) {
                        resolve({ width: 0, height: 0 });
                    } else {
                        let s;
                        this.proportion
                            .then((_size) => {
                                s = _size;
                            }).finally(() => {
                                if (!size.width) {
                                    size.width = s.width / s.height * size.height;
                                } else {
                                    size.height = s.height / s.width * size.width;
                                }
                                resolve(size);
                            });
                    }
                }
            });
        }

        return this.getPlaceholderSizePromise;
    }

    get proportion() {
        return Promise.resolve(DEFAULT_SIZE);
    }

    complete() {
        this.node.setCss({ width: '', height: '' });
        this.setCssSize();
        return Promise.resolve();
    }

    appendTo(container) {
        if (this.content) {
            this.content.forEach((node) => {
                container.append(node);
            });
        } else {
            container.append(this.node);
        }
    }

    destroy() {
        this.destroyed = true;
        this.node = null;
        this.getPlaceholderSizePromise = null;
        super.destroy();
    }
}

/* eslint-env es6 */
/* global SelectorContent, globalFunctions, DEFAULT_SIZE, helper */
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint-disable class-methods-use-this */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "ImageSelectorContent" }] */


class ImageSelectorContent extends SelectorContent {
    constructor(node, type, size, orientation, watermark) {
        super(node, type, size, orientation);

        this.imageOrientation = 'horizontal'; // 'horizontal' | 'vertical'
        this.isSirv = false;
        this.watermark = watermark;

        this.src = null;
        this.srcset = null;
        this._imageSize = { width: 0, height: 0 };

        this.getProportionPromise = null;
        this.getUrlPromise = null;
        this.loadImagePromise = null;
    }

    setCssSize() {
        if (['square', 'crop'].includes(this.type)) {
            this.customSquare();
        } else {
            this.removeCustomSquare();
        }

        super.setCssSize();
    }

    get proportion() {
        if (!this.getProportionPromise) {
            this.getProportionPromise = new Promise((resolve, reject) => {
                if (this.destroyed) {
                    resolve({ width: 0, height: 0 });
                } else {
                    this.emit('getSelectorProportion', { data: {
                        resultingCallback: (data) => {
                            let size = data.size;
                            this.isSirv = data.isSirv;
                            if (size) {
                                if (!size.width) {
                                    size = DEFAULT_SIZE;
                                }

                                resolve(size);
                            } else {
                                resolve(DEFAULT_SIZE);
                            }
                        }
                    } });
                }
            });
        }

        return this.getProportionPromise;
    }

    setImageUrl(src, srcset, alt, referrerpolicy) {
        this.src = src;
        this.srcset = srcset;

        if (this.node) {
            if (this.src || this.srcset) {
                if (referrerpolicy) {
                    this.node.attr('referrerpolicy', referrerpolicy);
                }

                if (this.srcset) {
                    this.node.attr('srcset', this.srcset + ' 2x');
                }

                this.node.attr('src', this.src);

                if (!$J.browser.mobile) {
                    // fix for firefox
                    // glueing images to cursor
                    this.node.addEvent('mousedown', (e) => { e.stopDefaults(); });
                }
            }

            if (alt) {
                this.node.attr('alt', alt);
            }
        }
    }

    get url() {
        if (!this.getUrlPromise) {
            this.getUrlPromise = new Promise((resolve, reject) => {
                if (this.destroyed) {
                    resolve(this);
                } else {
                    this.emit('getSelectorImgUrl', { data: {
                        crop: this.type === 'crop',
                        type: this.type,
                        watermark: this.watermark,
                        size: this.selectorSize,
                        resultingCallback: (result) => {
                            if (result) {
                                this.setImageUrl(result.src, result.srcset, result.alt, result.referrerpolicy);
                                resolve(this);
                            } else {
                                reject(this);
                            }
                        }
                    } });
                }
            });
        }

        return this.getUrlPromise;
    }

    /**
     * @param {{ width: number; height: number; }} size
     */
    set imageSize(size) {
        this._imageSize = size;
        this.imageOrientation = (this._imageSize.width >= this._imageSize.height) ? 'horizontal' : 'vertical';
    }

    loadImage() {
        if (!this.loadImagePromise) {
            this.loadImagePromise = new Promise((resolve, reject) => {
                if (this.node) {
                    helper.loadImage(this.isSirv ? this.node.node : this.node.node.src)
                        .then((imageData) => {
                            this.loaded = true;
                            this.imageSize = imageData.size;
                            this.setCssSize();
                            resolve(this);
                        }).catch((error) => {
                            if (this.destroyed) {
                                resolve(this);
                            } else {
                                reject(this);
                            }
                        });
                } else {
                    resolve(this);
                }
            });
        }

        return this.loadImagePromise;
    }

    customSquare() {
        if (Math.abs(this._imageSize.width - this._imageSize.height) > 2 && this.node.tagName !== 'div') {
            const div = $J.$new('div').setCss({ overflow: 'hidden', position: 'relative' });
            this.node.attr('data-image-orientation', this.imageOrientation);
            div.append(this.node);
            this.node.setCss({ width: '', height: '', 'max-width': 'none' });

            if (this.type === 'crop') {
                if (this.imageOrientation === 'horizontal') {
                    this.node.setCssProp('height', this.size);
                } else {
                    this.node.setCssProp('width', this.size);
                }
            } else {
                if (this.imageOrientation === 'vertical') {
                    this.node.setCssProp('height', this.size);
                } else {
                    this.node.setCssProp('width', this.size);
                }
            }

            this.node = div;
        }
    }

    removeCustomSquare() {
        if (this.node && this.node.tagName === 'div') {
            this.node.removeEvent(['touchstart', 'selectstart', 'contextmenu']); // TODO review it
            this.node.remove();
            this.node = $(this.node.node.firstChild);
            this.node.setCss({ width: '', height: '', maxWidth: '' });
            this.node.removeAttr('data-image-orientation');
        }
    }

    complete() {
        return this.url.then(() => this.loadImage());
    }

    destroy() {
        if (this.node) {
            this.node.removeEvent('mousedown');
        }
        this.getProportionPromise = null;
        this.getUrlPromise = null;
        this.loadImagePromise = null;
        super.destroy();
    }
}

/* eslint-env es6 */
/* global ImageSelectorContent, globalFunctions, helper, EventEmitter, CSS_MAIN_CLASS, SELECTOR_TAG, SELECTORS_STATE, equalOptions, SelectorContent */
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint-disable class-methods-use-this */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Selector" }] */


class Selector extends EventEmitter {
    constructor(parentNode, index, selector, uuid, options, infoPromise) {
        super();

        this.UUID = uuid;
        this.options = helper.deepExtend({
            standard: {
                type: 'square', // 'square' | 'crop' | 'auto' | 'bullets'
                size: 70,
                orientation: 'horizontal', // 'horizontal' | 'vertical'
                watermark: true // true | false
            },
            fullscreen: {
                type: 'square', // 'square' | 'crop' | 'auto' | 'bullets'
                size: 70,
                orientation: 'horizontal', // 'horizontal' | 'vertical'
                watermark: true // true | false
            },

            activeClass: CSS_MAIN_CLASS + '-active',
            placeholderClass: CSS_MAIN_CLASS + '-thumbnail-placeholder',
            selectorContent: null,
            disabled: false
        }, options || {});

        this.parentContainer = $(parentNode);
        this._index = index;
        this.selector = $(selector) || $J.$new('div');
        this._container = $J.$new('div').addClass(CSS_MAIN_CLASS + '-item').setCss({ display: 'inline-block' }); // itemContainer
        this.placeholder = $J.$new('div').addClass(this.options.placeholderClass);

        this._size = { width: 0, height: 0 };

        this.currentObject = null;
        this.actived = false;
        this._disabled = false;
        this._destroyed = false;

        this._container.append(this.selector);

        this.parentContainer.append(this._container);

        if (this.options.disabled) {
            this.disable();
        }

        this.infoPromise = infoPromise || Promise.resolve(false);

        this.state = SELECTORS_STATE.NONE;

        this.initPromise = null;
        this.init();
    }

    init() {
        if (!this.initPromise) {
            this.initPromise = new Promise((resolve) => {
                this.infoPromise.then(() => {
                    this.standard = this.createContent(this.options.standard);

                    if (this.standard && this.standard instanceof ImageSelectorContent && equalOptions(this.options.standard, this.options.fullscreen)) {
                        this.fullscreen = this.standard;
                    } else {
                        this.fullscreen = this.createContent(this.options.fullscreen, true);
                    }
                    this.selector.append(this.placeholder);

                    const dataType = this.selector.attr('data-type');
                    if (!dataType) {
                        this.selector.setCssProp('font-size', 0);
                    }

                    this.addEvents();
                    this.addCustomClick();
                    resolve();
                });
            });
        }

        return this.initPromise;
    }

    createContent(options, fullscreen) {
        let result;

        if (options.type !== 'bullets') {
            if (this.options.selectorContent) {
                result = new SelectorContent(this.options.selectorContent, options.type, options.size, options.orientation);
            } else {
                const img = $(new Image());
                result = new ImageSelectorContent(img, options.type, options.size, options.orientation, options.watermark);
            }

            result.parentClass = this;
        }

        return result;
    }

    get proportion() {
        let result = Promise.resolve();

        if (!this._disabled) {
            if (this.state === SELECTORS_STATE.FULLSCREEN && this.fullscreen) {
                result = this.fullscreen.proportion;
            } else if (this.standard) {
                result = this.standard.proportion;
            }
        }

        return new Promise((resolve, reject) => {
            this.init().then(() => {
                result.then(resolve).catch(reject);
            });
        });
    }

    get canActivate() {
        return this.options.activated;
    }

    addEvents() {
        this.on('getSelectorProportion', (e) => { e.data.UUID = this.UUID; });
        this.on('getSelectorImgUrl', (e) => { e.data.UUID = this.UUID; });
    }

    addPlaceholder(selectorType, size) {
        this._container.attr('data-selector-type', selectorType);
        this.selector.append(this.placeholder);
        this.placeholder.setCss(size);
    }

    /*
        1 - SELECTORS_STATE.STANDARD,
        2 - SELECTORS_STATE.FULLSCREEN
    */
    toggle(state /* 1 or 2 only */) {
        return new Promise((res, rej) => {
            this.init().then(() => {
                let result;
                const _resolve = Promise.resolve();

                if (this.state !== state) {
                    this.state = state;

                    if (this._disabled) {
                        result = _resolve;
                    } else {
                        let selector = this.standard;
                        let selectorType = this.options.standard.type;
                        if (state === 2) {
                            selector = this.fullscreen;
                            selectorType = this.options.fullscreen.type;
                        }

                        if (selectorType === 'bullets') {
                            this.selector.node.innerHTML = '';
                            this.currentObject = selectorType;
                            this._container.attr('data-selector-type', selectorType);
                            this.emit('resize');
                            result = _resolve;
                        } else {
                            if (!(selector instanceof ImageSelectorContent)) {
                                this._container.attr('data-selector-type', selectorType);
                            }

                            result = new Promise((resolve, reject) => {
                                if (selector) {
                                    selector.placeholderSize.then((size) => {
                                        if (this.state === state && !this._destroyed) {
                                            if (!selector.isLoaded() && !this.options.selectorContent) {
                                                // NOTE: this.selector.node.innerHTML = ''; doesn't work properly in IE 11
                                                while (this.selector.node.firstChild) {
                                                    this.selector.node.removeChild(this.selector.node.firstChild);
                                                }

                                                this.addPlaceholder(selectorType, size);
                                            }
                                            resolve();

                                            selector.complete().then(() => {
                                                if (this.state === state && !this._destroyed) {
                                                    this._container.attr('data-selector-type', selectorType);
                                                    this.placeholder.remove();

                                                    // NOTE: this.selector.node.innerHTML = ''; doesn't work properly in IE 11
                                                    while (this.selector.node.firstChild) {
                                                        this.selector.node.removeChild(this.selector.node.firstChild);
                                                    }

                                                    selector.appendTo(this.selector);
                                                    this.currentObject = selector;
                                                    this.emit('resize');
                                                }
                                            }).catch(() => {
                                                // empty
                                            });
                                        } else {
                                            resolve();
                                        }
                                    });
                                } else {
                                    resolve();
                                }
                            });
                        }
                    }
                } else {
                    result = _resolve;
                }

                result.then(res).catch(rej);
            });
        });
    }

    addClick() {
        this._container.addEvent(['btnclick', 'tap'], (e) => {
            e.stop();
            this.emit('selectorAction', { data: this.UUID });
        });
    }

    addCustomClick() {
        if (this.options.selectorContent && $J.$(this.options.selectorContent).tagName === SELECTOR_TAG) {
            const nodesList = $(this.options.selectorContent).node.querySelectorAll('a');

            Array.from(nodesList).forEach((item) => {
                $J.$(item).addEvent(['btnclick', 'tap'], (e) => {
                    e.stop();

                    if ($J.$(item).attr('href')[0] === '#') {
                        $J.W.node.location.hash = '';
                        $J.W.node.location.hash = $J.$(item).attr('href');
                    } else {
                        $J.W.node.open($J.$(item).attr('href'));
                    }
                });
            });
        }
    }

    activate() {
        if (!this.actived) {
            this.actived = true;
            this._container.addClass(this.options.activeClass);
        }
    }

    get activated() {
        return this.actived;
    }

    deactivate() {
        if (this.actived) {
            this.actived = false;
            this._container.removeClass(this.options.activeClass);
        }
    }

    get size() {
        this._size = this._container.size;
        return this._size;
    }

    disable() {
        if (!this._disabled) {
            this._disabled = true;
            this._container.attr('disabled', 'true');
            this._container.setCssProp('display', 'none');
            this.deactivate();
            this.emit('resize');
        }
    }

    _toggleForEnable() {
        let neededType;
        if (this.state !== SELECTORS_STATE.NONE) {
            if (this.state === SELECTORS_STATE.STANDARD) {
                neededType = this.standard || 'bullets';
            } else {
                neededType = this.fullscreen || 'bullets';
            }
        }

        let result;

        if (neededType !== this.currentObject) {
            const last = this.state;
            this.state = SELECTORS_STATE.NONE;
            result = this.toggle(last);
        } else {
            result = Promise.resolve();
        }

        return result;
    }

    enable() {
        if (this._disabled) {
            this._disabled = false;
            this._toggleForEnable().then(() => {
                if (!this._disabled) {
                    this._container.removeAttr('disabled');
                    this._container.setCssProp('display', '');
                    this.emit('resize');
                }
            });
        }
    }

    /**
     * @param {number} index
     */
    set index(index) {
        this._index = index;
    }

    get index() {
        return this._index;
    }

    get container() {
        return this._container;
    }

    get pinnedPosition() {
        return this.options.pinned;
    }

    get destroyed() {
        return this._destroyed;
    }

    get disabled() {
        return this._disabled;
    }

    destroy() {
        this._destroyed = true;
        this.placeholder.remove();

        this.off('getSelectorProportion');
        this.off('getSelectorImgUrl');

        if (this.standard) {
            this.standard.destroy();
            this.standard = null;
        }

        if (this.fullscreen) {
            this.fullscreen.destroy();
            this.fullscreen = null;
        }

        this._container.removeEvent(['btnclick', 'tap']);
        this._container.remove();
        this._container = null;
        this.parentContainer = null;
        this.selector = null;
        super.destroy();
    }
}

/* eslint-env es6 */
/* global globalFunctions, helper, EventEmitter, CSS_MAIN_CLASS, SELECTORS_STATE, Selector, getOrientation, Arrows */
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint-disable class-methods-use-this */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Selectors_" }] */


const SELECTORS = 'selectors';

const getTime = (maxTime, width, step) => {
    let result = maxTime;
    const minTime = parseInt(maxTime / 3, 10);

    result = parseInt(Math.abs(step) / width * maxTime, 10);

    if (result < minTime) {
        result = minTime;
    } else if (result > maxTime) {
        result = maxTime;
    }

    return result;
};

const convertToTranslateString = (value, isHorizontal) => {
    if (isHorizontal) {
        value += 'px, 0';
    } else {
        value = '0, ' + value + 'px';
    }

    return value;
};

const normalizeIndex = (index, length) => {
    if (index < 0) {
        index = 0;
    } else if (index > length - 1) {
        index = length - 1;
    }

    return index;
};

const isPinned = (value) => {
    return (value === 'start' || value === 'end');
};

class Selectors_ extends EventEmitter {
    constructor(selectors, options) {
        super();

        this.options = Object.assign({
            isStandardGrid: false,
            standardStyle: 'square', // square | crop | auto | bullets
            standardSize: 70,
            standardPosition: 'bottom', // top, left, right, bottom, false
            standardWatermark: true,
            isFullscreenGrid: false,
            fullscreenStyle: 'square', // square | crop | auto | bullets
            fullscreenSize: 70,
            fullscreenPosition: 'bottom', // top, left, right, bottom, false
            fullscreenAutohide: false,
            fullscreenWatermark: true,
            arrows: true,
            activeClass: CSS_MAIN_CLASS + '-active'
        }, (options || {}));

        this.instanceNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + SELECTORS).setCss({ opacity: 0, visibility: 'hidden', transition: '' });
        this.selectorsContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-ss');
        this.selectorsScroll = $J.$new('div').addClass(CSS_MAIN_CLASS + '-scroll').setCss({ transform: 'translate3d(0, 0, 0)' });
        this.controlButton = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + SELECTORS + '-toggle-switch');

        this.selectorsScrollContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-scroll-container');

        this.startPinnedNode = null;
        this.endPinnedNode = null;

        this.baseSelectorsList = [];
        this.pinnedStartList = [];
        this.pinnedEndList = [];

        this.isMove = false;
        this.currentPosition = 0;
        this.containerSize = { width: 0, height: 0 };
        this.halfContainerSize = 0;
        this.scrollSize = { width: 0, height: 0 };
        this.halfScrollSize = 0;
        this.currentActiveItem = null;
        this.isShown = false;
        this.isControlShown = true;
        this.isControlInDoc = false;
        this.controlDebounce = null;
        this.isReady = false;
        this.resizeTimeout = null;
        this.isActionsEnabled = true;

        this.isDone = false;
        this.isInView = false;

        this.state = SELECTORS_STATE.STANDARD;

        this.arrows = null;

        this._currentStylePosition = this.options.standardPosition;

        this.longSide = null;
        this._shortSide = null;
        this.currentAxis = 'x';

        this.isStarted = false;
        this.isDestroyed = false;

        if (selectors.some(data => !!data.pinned)) {
            this.initPinnedBlocks();
        }

        this.selectors = selectors.map((_selector, index) => this.createSelector(_selector, index));

        this.sortPinnedSelectors();
        this.identifyVariables();
        this.setContainerCss();
    }

    /**
     * find selector by uuid
     * @param {number} uuid 
     * @returns {Selector}
     */
    findSelector(uuid) {
        return this.selectors.find(selector => selector.UUID === uuid) ?? null;
    }

    get hasPinnedSelector() {
        return !!(this.pinnedStartList.length || this.pinnedEndList.length);
    }

    insertBefore(index, selector) {
        let selectors = this.selectors;
        let selectorsScroll = this.selectorsScroll;

        if (this.hasPinnedSelector) {
            if (selector.pinnedPosition === 'start') {
                selectors = this.pinnedStartList;
                selectorsScroll = $J.$(this.startPinnedNode?.node.firstChild.firstChild ?? null);
            } else if (selector.pinnedPosition === 'end') {
                selectors = this.pinnedEndList;
                selectorsScroll = $J.$(this.endPinnedNode?.node.firstChild.firstChild ?? null);
            } else {
                selectors = this.baseSelectorsList;
            }
            index = selectors.indexOf(selector);
        }

        let referenceElement = null;

        if (index + 1 < selectors.length) {
            referenceElement = selectors[index + 1].container;
        }

        this.hide();
        selectorsScroll.node.insertBefore(selector.container.node, referenceElement ? referenceElement.node : referenceElement);
    }

    insert(selectorIndex, selectorObj) {
        if (!!selectorObj.pinned) {
            this.initPinnedBlocks();
            this.appendPinnedBlocks();
        }

        const selector = this.createSelector(selectorObj, selectorIndex);

        if (this.isDone) {
            selector.addClick();
        }

        this.hide();
        this.selectors.splice(selectorIndex, 0, selector);
        this.selectors.forEach((_selector, index) => { _selector.index = index; });

        this.sortPinnedSelectors();

        this.insertBefore(selectorIndex, selector);
        selector.toggle(this.state);
    }

    disable(uuid) {
        const selector = this.findSelector(uuid);
        if (selector) {
            if (this.currentActiveItem && this.currentActiveItem === selector) {
                this.currentActiveItem = null;
            }

            this.hide();
            selector.disable();
        }
    }

    enable(uuid) {
        const selector = this.findSelector(uuid);
        if (selector) {
            this.hide();
            selector.enable();
        }
    }

    pickOut(uuid) {
        const selector = this.findSelector(uuid);

        if (selector) {
            selector.destroy();
            this.selectors.splice(selector.index, 1);
            this.selectors.forEach((_selector, _index) => { _selector.index = _index; });
            this.sortPinnedSelectors();
        }
    }

    createSelector(selectorData, index) {
        let container = this.selectorsScroll;
        if (selectorData.pinned === 'start') {
            container = this.startPinnedNode?.node.firstChild.firstChild ?? null;
        } else if (selectorData.pinned === 'end') {
            container = this.endPinnedNode?.node.firstChild.firstChild ?? null;
        }

        const selector = new Selector(container, index, selectorData.node, selectorData.UUID, {
            standard: {
                type: this.options.standardStyle,
                size: this.options.standardSize,
                orientation: getOrientation(this.options.standardPosition),
                watermark: this.options.standardWatermark
            },
            fullscreen: {
                type: this.options.fullscreenStyle,
                size: this.options.fullscreenSize,
                orientation: getOrientation(this.options.fullscreenPosition),
                watermark: this.options.fullscreenWatermark
            },
            activeClass: this.options.activeClass,
            selectorContent: selectorData.selectorContent,
            disabled: selectorData.disabled,
            pinned: selectorData.pinned,
            activated: selectorData.activated
        }, selectorData.infoPromise);

        selector.parentClass = this;

        return selector;
    }

    addEventsFromSelectors() {
        this.on('selectorAction', (e) => {
            e.stopAll();
            this.emit('changeSlide', { data: { UUID: e.data } });
            const index = this.selectors.find(selector => selector.UUID === e.data);

            if (index !== $J.U) {
                this.activateItem(index);
            }
        });

        let timer;
        this.on('resize', (e) => {
            e.stopAll();
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.onResize();
            }, 16);
        });
    }

    initPinnedBlocks() {
        if (!this.pinnedBlocksInited) {
            const createNodes = (className) => {
                return $J.$new('div').addClass(CSS_MAIN_CLASS + className).append(
                    $J.$new('div').addClass(CSS_MAIN_CLASS + '-ss').append(
                        $J.$new('div').addClass(CSS_MAIN_CLASS + '-scroll').setCss({ transform: 'translate3d(0, 0, 0)' })
                    )
                );
            };
    
            this.startPinnedNode = createNodes('-selectors-pinned-start');
            this.endPinnedNode = createNodes('-selectors-pinned-end');
        }
    }

    get pinnedBlocksInited() {
        return !!this.startPinnedNode && !!this.endPinnedNode;
    }

    appendPinnedBlocks() {
        if (this.pinnedBlocksInited) {
            this.instanceNode.append(this.startPinnedNode);
            this.instanceNode.append(this.endPinnedNode);
        }
    }

    sortPinnedSelectors() {
        this.pinnedStartList = this.selectors.filter(selector => selector.pinnedPosition === 'start');
        this.pinnedEndList = this.selectors.filter(selector => selector.pinnedPosition === 'end');
        this.baseSelectorsList = this.selectors.filter(selector => !selector.pinnedPosition);
    }

    init() {
        this.createArrows();
        this.selectorsScrollContainer.append(this.selectorsContainer).appendTo(this.instanceNode);

        this.appendPinnedBlocks();

        if (this.arrows) {
            this.arrows.hide();
            const arrowsNodes = this.arrows.nodes;
            this.selectorsScrollContainer.append(arrowsNodes[0]);
            this.selectorsScrollContainer.append(arrowsNodes[1]);
        }

        this.selectorsContainer.append(this.selectorsScroll);

        this.isShown = true;
        this.hide();

        this.identifyVariables();
        this.addEventsFromSelectors();

        if (!this._currentStylePosition) {
            this.instanceNode.setCssProp('display', 'none');
        }

        Promise.all(this.selectors.map(selector => selector.proportion)).finally(() => {
            this.isReady = true;
            this.emit('selectorsReady');
        });
    }

    identifyVariables() {
        if (this._currentStylePosition) {
            const isHorizontal = getOrientation(this._currentStylePosition) === 'horizontal';

            this.longSide = isHorizontal ? 'width' : 'height';
            this._shortSide = this.longSide === 'width' ? 'height' : 'width';
            this.currentAxis = isHorizontal ? 'x' : 'y';
        } else {
            this.longSide = null;
            this._shortSide = null;
        }
    }

    changeSelectors(direction) {
        return Promise.all(this.selectors.map(selector => selector.toggle(direction)));
    }

    getSelectorsSize() {
        return this.selectors.filter(selector => !selector.destroyed).map(selector => selector.size);
    }

    enableActions() {
        if (!this.isActionsEnabled) {
            this.isActionsEnabled = true;
            this.show();

            if (this.options.fullscreenAutohide) {
                this.selectorsState = true;
            }
        }
    }

    disableActions() {
        if (this.isActionsEnabled) {
            this.isActionsEnabled = false;
            this.hide();
            if (this.controlDebounce) {
                this.controlDebounce.cancel();
            }
        }
    }

    show(force) {
        if (!this.isShown && this.isActionsEnabled && !this.isDestroyed) {
            const _transition = force ? '' : 'opacity 400ms linear';
            this.isShown = true;

            this.selectorsScroll.setCss({ display: 'inline-flex' }); // for rendering
            this.getSizes();

            this.jump(this.activatedItem, true);

            this.instanceNode.setCss({
                opacity: 1,
                visibility: 'visible',
                transition: _transition
            });
        }
    }

    get activatedItem() {
        return this.currentActiveItem ? this.currentActiveItem.index : 0;
    }

    activateCurrentItemByUUID(uuid) {
        const selector = this.findSelector(uuid);

        if (selector && !this.currentActiveItem) {
            this.currentActiveItem = selector;
        }
    }

    hide() {
        if (this.isShown) {
            this.isShown = false;
            this.instanceNode.setCss({ opacity: 0, visibility: 'hidden', transition: '' });
        }
    }

    start(parentSlider) {
        if (!this.isStarted && this.isInView) {
            this.isStarted = true;
            if (this._currentStylePosition) {
                this.changeSelectors(1)
                    .then(() => globalFunctions.rootDOM.addMainStyle(parentSlider))
                    .then(() => {
                        if (!this.isDestroyed) {
                            this.getSelectorsSize();
                            this.done();
                            this.show();
                        }
                    });
            } else {
                this.done();
            }
        }
    }

    addControl() {
        if (!this.isControlInDoc) {
            this.instanceNode.addEvent(['mouseover', 'mouseout'], (e) => {
                let relatedTarget = e.related;

                if (relatedTarget) {
                    relatedTarget = $(relatedTarget);
                }

                while (relatedTarget && relatedTarget.node !== this.instanceNode.node && relatedTarget.node !== $J.D.node.body) {
                    relatedTarget = relatedTarget.node.parentNode;
                    if (relatedTarget) {
                        relatedTarget = $(relatedTarget);
                    }
                }

                if (!relatedTarget || relatedTarget.node !== this.instanceNode.node) {
                    this.setControlTimeout(e.type === 'mouseover');
                }
            });

            this.controlButton.addEvent(['btnclick', 'tap'], (e) => {
                this.setControlTimeout(true);
                this.selectorsState = !this.isControlShown;
            });

            $(this.instanceNode.node.parentNode).append(this.controlButton);

            this.controlDebounce = helper.debounce(() => { this.selectorsState = false; }, 3000);

            this.isControlInDoc = true;
        }
    }

    removeControl() {
        if (this.isControlInDoc) {
            this.instanceNode.removeEvent(['mouseover', 'mouseout']);
            this.controlDebounce.cancel();
            this.isControlShown = true;
            this.controlButton.removeEvent(['btnclick', 'tap']);
            this.controlButton.remove();
            this.isControlInDoc = false;
        }
    }

    /**
     * @param {boolean} open
     */
    set selectorsState(open) {
        this.isControlShown = open;

        this.setControlTimeout();

        this.emit('visibility', {
            action: this.isControlShown ? 'show' : 'hide'
        });
    }

    setControlTimeout(justClear) {
        if (this.isControlInDoc) {
            this.controlDebounce.cancel();
            if (this.isControlShown && !justClear) {
                this.controlDebounce();
            }
        }
    }

    get node() { return this.instanceNode; }

    get horizontal() { return getOrientation(this._currentStylePosition) === 'horizontal'; }

    inView(value, parentSlider) {
        this.isInView = value;

        // sometimes selectors can be inside external container and we do not know which container with 'Sirv' class name inicialide it
        // so we need pass it for right adding css in shadow dom
        this.start(parentSlider);
    }

    done() {
        if (!this.isDone && !this.isDestroyed) {
            this.isDone = true;
            this.getSizes();

            this.selectors.forEach((selector) => {
                selector.addClick();
            });
            this.onResize();
            this.setDrag();
            this.emit('selectorsDone');
        }
    }

    activateItem(index) {
        const selector = this.selectors[index];

        if (selector) {
            if (this.currentActiveItem) {
                this.currentActiveItem.deactivate();
            }

            if (!selector.disabled && selector.canActivate) {
                selector.activate();
                this.currentActiveItem = selector;
            }

            if (!selector.activated && this.currentActiveItem) {
                this.currentActiveItem.activate();
            }
        }
    }

    createArrows() {
        if (!this.options.arrows || this.options.standardStyle === 'grid' && this.options.standardStyle === 'grid') { return; }

        this.arrows = new Arrows({
            orientation: getOrientation(this.currentPosition || this.options.fullscreenPosition),
            customClass: 'thumbnails'
        });
        this.arrows.parentClass = this;

        this.on('arrowAction', (e) => {
            e.stopAll();
            this.jump(e.data.type);
        });
    }

    isGrid() {
        if (this.state === SELECTORS_STATE.FULLSCREEN) {
            return this.options.isFullscreenGrid;
        }

        return this.options.isStandardGrid;
    }

    calculateContainerScroll() {
        if (this.hasPinnedSelector || this.pinnedBlocksInited) {
            const instanceSize = this.instanceNode.size;

            if (this.arrows) {
                this.arrows.hide();
            }

            let maxWidth = instanceSize[this.longSide] - (this.startPinnedNode.size[this.longSide] + this.endPinnedNode.size[this.longSide]);

            if (maxWidth < 0) {
                maxWidth = 0;
            }

            if (this.scrollSize[this.longSide] < maxWidth) {
                maxWidth = this.scrollSize[this.longSide];
            }

            this.selectorsScrollContainer.setCssProp('max-' + this.longSide, maxWidth);
            this.getSizes();
        }
    }

    normalizePositionValue(value) {
        const max = this.containerSize[this.longSide] - this.scrollSize[this.longSide];

        if (this.arrows) {
            this.arrows.disable();
            if (max >= 0 || this.isGrid()) {
                this.arrows.hide();
                this.getSizes();
            } else {
                if (!this.arrows.isShow) {
                    this.arrows.show();
                    this.getSizes();
                }
            }
        }

        if (max === 0) { return 0; }

        if (this.halfScrollSize <= this.halfContainerSize) {
            value = this.halfContainerSize - this.halfScrollSize;
        } else {
            if (value >= 0) {
                value = 0;
                if (this.arrows) {
                    this.arrows.disable('backward');
                }
            }

            if (value <= max) {
                value = max;
                if (this.arrows) {
                    this.arrows.disable('forward');
                }
            }
        }
        return value;
    }

    findItemPosition(index) {
        if (!this.selectors[index] || this.selectors[index].pinnedPosition) { return null; }

        index = normalizeIndex(index, this.selectors.length);

        if (this.hasPinnedSelector) {
            const i = this.baseSelectorsList.indexOf(this.selectors[index]);
            if (i < 0) { i = index; }
            index = i;
        }

        const halfSelectorSize = this.selectors[index].size[this.longSide] / 2;
        let position = 0;
        let currentIndex = 0;

        while (currentIndex < index) {
            if (this.selectors[currentIndex]) {
                position += this.selectors[currentIndex].size[this.longSide];
            }
            currentIndex += 1;
        }

        const transitionPosition = this.halfContainerSize - (position + halfSelectorSize);

        return this.normalizePositionValue(transitionPosition);
    }

    stopMoving() {
        if (this.isMove) {
            let position = helper.getMatrix(this.selectorsScroll);

            if (position) {
                position = position.transform[this.currentAxis];
                this.currentPosition = position;
            }

            this.clearAnimation();
            this.selectorsScroll.setCssProp('transform', 'translate3d(' + convertToTranslateString(this.currentPosition, this.horizontal) + ', 0)');
        }
    }

    clearAnimation() {
        if (this.selectorsScroll) {
            this.selectorsScroll.removeEvent('transitionend');
            this.selectorsScroll.setCssProp('transition', '');
        }
        this.isMove = false;
    }

    jump(direction, withoutAnimation) {
        let value = this.currentPosition;

        this.stopMoving();

        if ($J.typeOf(direction) === 'string' || $J.typeOf(direction) === 'number') {
            if ($J.typeOf(direction) === 'string') {
                if (direction === 'next') {
                    value -= this.containerSize[this.longSide];
                } else {
                    value += this.containerSize[this.longSide];
                }

                value = this.normalizePositionValue(value);
            } else {
                value = this.findItemPosition(direction);
            }
        } else { return; }

        if (value !== null) {
            this.move(value, null, withoutAnimation);
        }
    }

    move(value, speed, withoutAnimation) {
        if (!speed) { speed = 400; }

        if (this.currentPosition === value) { return; }
        this.selectorsScroll.removeEvent('transitionend');

        const css = {};

        if (!withoutAnimation) {
            this.isMove = true;
            this.selectorsScroll.addEvent('transitionend', (e) => {
                e.stop();
                this.clearAnimation();
            });

            css.transition = 'transform ' + getTime(speed, this.containerSize[this.longSide], Math.abs(value) - Math.abs(this.currentPosition)) + 'ms ease';
        }

        css.transform = 'translate3d(' + convertToTranslateString(value, this.horizontal) + ', 0)';

        this.selectorsScroll.setCss(css);

        this.currentPosition = value;
    }

    getSizes() {
        this.containerSize = this.selectorsContainer.size;
        this.halfContainerSize = this.containerSize[this.longSide] / 2;

        this.scrollSize = this.selectorsScroll.size;
        this.halfScrollSize = this.scrollSize[this.longSide] / 2;
    }

    setDrag() {
        const fns = {};
        let lastXY = { x: null, y: null };
        let move = false;
        let containerPosition;
        let last;
        let diffSize;
        let distance;
        let axis;
        let otherAxis;
        let side;
        let direction;
        let startTimeStamp;
        let dragState = 0; // 0 - nothing, 1 - drag, 2 - sroll page

        const getXY = (x, y) => {
            return {
                x: x - containerPosition.left,
                y: y - containerPosition.top
            };
        };

        const getDirection = (oldValue, newValue) => {
            return oldValue > newValue ? 'next' : 'prev';
        };

        const culcDistance = (dist, speed) => {
            const min = dist / 2;
            // const max = dist * 2;

            return dist + min;
        };

        const onDrag = (e) => {
            fns[e.state](e);
        };

        fns.dragstart = (e) => {
            axis = this.currentAxis;
            otherAxis = (axis === 'x') ? 'y' : 'x';
            side = this.longSide;

            lastXY = { x: e.x, y: e.y };

            if (this.containerSize[side] < this.scrollSize[side]) { move = true; }

            containerPosition = this.selectorsContainer.position;
            this.stopMoving();
            last = getXY(e.x, e.y)[axis];
            diffSize = this.containerSize[side] - this.scrollSize[side];
            distance = 0;
            startTimeStamp = e.timeStamp;
        };

        fns.dragend = (e) => {
            let value;
            let speed;

            if (move) {
                move = false;
                e.stop();

                speed = e.timeStamp - startTimeStamp;
                value = this.currentPosition - culcDistance(distance, speed);

                if (value > 0 || value < diffSize) {
                    if (value > 0) {
                        value = 0;
                    } else {
                        value = diffSize;
                    }
                }

                value = this.normalizePositionValue(value);
                this.move(value);
                direction = null;
            }

            dragState = 0;
        };

        fns.dragmove = (e) => {
            let point;
            let diff;
            let dir;

            if (!dragState) {
                if (Math.abs(lastXY[axis] - e[axis]) > Math.abs(lastXY[otherAxis] - e[otherAxis])) {
                    dragState = 1;
                } else {
                    dragState = 2;
                }
            }

            if (move && dragState === 1) {
                point = getXY(e.x, e.y);

                if (point[axis] > point[otherAxis]) {
                    e.stop();
                    diff = last - point[axis];
                    this.currentPosition -= diff;
                    dir = getDirection(last, point[axis]);
                    if (!direction || dir !== direction) { distance = 0; }
                    distance += diff;
                    last = point[axis];
                    direction = dir;
                }

                this.selectorsScroll.setCssProp('transform', 'translate3d(' + convertToTranslateString(this.currentPosition, this.horizontal) + ', 0)');
            }

            lastXY = { x: e.x, y: e.y };
        };

        this.selectorsContainer.addEvent(['mousedrag', 'touchdrag'], onDrag);
    }

    setContainerCss() {
        const css = {};
        let size = this.options.standardSize;

        if (this.state === SELECTORS_STATE.FULLSCREEN) {
            size = this.options.fullscreenSize;
        }

        css['min-' + this._shortSide] = size + 'px';
        css[this._shortSide] = '100%';

        this.instanceNode.setCss(css);
    }

    beforeEnterFullscreen() {
        this.hide();

        this.state = SELECTORS_STATE.FULLSCREEN;

        this._currentStylePosition = this.options.fullscreenPosition;

        if (!this._currentStylePosition) {
            this.instanceNode.setCssProp('display', 'none');
            $(this.instanceNode.node.parentNode).setCssProp('display', 'none');
        }

        this.identifyVariables();
    }

    afterEnterFullscreen() {
        if (this._currentStylePosition) {
            this.instanceNode.setCssProp('display', '');
            $(this.instanceNode.node.parentNode).setCssProp('display', '');

            this.setContainerCss();

            if (this.options.fullscreenAutohide) {
                this.addControl();
                if (this.isActionsEnabled) {
                    this.selectorsState = true;
                }
            }

            this.removeStyleForIE();
            this.changeSelectors(2)
                .then(() => {
                    this.getSelectorsSize();

                    setTimeout(() => {
                        this.show();
                    }, 150); // must be more than resize timeout

                    if (this._currentStylePosition && this.isActionsEnabled) {
                        setTimeout(() => {
                            this.selectorsState = true;
                        }, 1000);
                    }
                });
        }
    }

    beforeExitFullscreen() {
        this.hide();

        this.state = SELECTORS_STATE.STANDARD;

        this._currentStylePosition = this.options.standardPosition;

        if (this.options.fullscreenAutohide) {
            this.removeControl();
        }

        if (!this._currentStylePosition) {
            this.instanceNode.setCssProp('display', 'none');
            $(this.instanceNode.node.parentNode).setCssProp('display', 'none');
        }

        this.identifyVariables();
    }

    afterExitFullscreen() {
        if (this._currentStylePosition) {
            this.instanceNode.setCssProp('display', '');
            $(this.instanceNode.node.parentNode).setCssProp('display', '');

            this.setContainerCss();
            this.removeStyleForIE();
            this.changeSelectors(1)
                .then(() => {
                    this.getSelectorsSize();
                    this.show();
                });
        }
    }

    get currentStylePosition() {
        if (this.state === SELECTORS_STATE.FULLSCREEN) {
            return this.options.fullscreenPosition;
        } else {
            return this.options.standardPosition;
        }
    }

    removeStyleForIE() {
        if ($J.browser.uaName === 'ie') {
            this.selectorsScroll.setCssProp(this.shortSide, '');
        }
    }

    removeStyleForIE() {
        if ($J.browser.uaName === 'ie') {
            this.selectorsScroll.setCssProp(this.shortSide, '');
        }
    }

    isSelectorsActionEnabled() {
        return this.isActionsEnabled;
    }

    get shortSide() {
        return this._shortSide;
    }

    sortSelectors(uuidList, orderLength) {
        this.selectors = uuidList.map(uuid => this.selectors.find((selector) => selector.UUID === uuid));
        this.selectors.forEach((selector, index) => { selector.index = index; });

        for (let i = orderLength - 1; i >= 0; i--) {
            this.selectorsScroll.node.insertBefore(this.selectors[i].container.node, this.selectorsScroll.node.firstChild);
        }
    }

    onResize() {
        if (this.isDone && this._currentStylePosition && !this.isDestroyed) {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => { // the timer helps calc new size of selectors after changing size of images
                const itemIndex = this.activatedItem;
                this.clearAnimation();

                if ($J.browser.uaName === 'ie') {
                    const selectorSize = this.isGrid() ? '' : this.selectors.reduce((previousValue, selector) => {
                        if (!selector.destroyed) {
                            previousValue += selector.size[this.longSide];
                        }

                        return previousValue;
                    }, 0);

                    this.selectorsScroll.setCssProp(this.longSide, selectorSize);
                }

                this.getSizes();
                this.calculateContainerScroll();
                this.activateItem(itemIndex);
                this.normalizePositionValue();
                this.jump(itemIndex, true);
                this.show();
            }, 100);
        }
    }

    destroy() {
        this.isDestroyed = true;
        clearTimeout(this.resizeTimeout);
        this.instanceNode.removeEvent('transitionend');
        this.removeControl();
        this.controlButton = null;

        this.off('selectorAction');
        this.off('resize');

        this.clearAnimation();

        if (this.arrows) {
            this.arrows.destroy();
            this.arrows = null;
            this.off('arrowAction');
        }

        this.selectors.forEach((selector) => { selector.destroy(); });
        this.selectorsScroll.remove();
        this.selectorsScroll = null;
        this.selectorsContainer.remove();
        this.selectorsContainer = null;
        this.instanceNode.remove();
        this.instanceNode = null;
        this.currentActiveItem = null;

        if (this.pinnedBlocksInited) {
            this.baseSelectorsList = [];
            this.pinnedStartList = [];
            this.pinnedEndList = [];
            this.endPinnedNode = null;
            this.startPinnedNode = null;
            this.selectorsScrollContainer = null;
            this.pinnedStartList = null;
            this.pinnedEndList = null;
        }
        super.destroy();
    }
}

return Selectors_;
})();

/* eslint-env es6 */
/* global defaultsVideoOptions */
/* global EventEmitter */
/* global helper */
/* global CSS_MAIN_CLASS */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "slideVideo" }] */


const slideVideo = (() => {
    const correctVideoSrc = (node) => {
        node = $(node);
        const _src = node.attr('data-src');

        if (_src) {
            node.attr('data-src', _src.split('?')[0]);
            node.removeAttr('src');
        } else {
            node.node.src = node.node.src.split('?')[0];
        }

        return node;
    };

    const getOptions = (node, opts) => {
        const options = new $J.Options(defaultsVideoOptions);

        options.fromJSON(opts.common.common);
        options.fromString(opts.local.common);
        options.fromString(node.attr('data-options') || '');

        if ($J.browser.touchScreen && $J.browser.mobile) {
            // options.parseSchema(mobileDefaults, true);
            options.fromJSON(opts.common.mobile);
            options.fromString(opts.local.mobile);
            options.fromString(node.attr('data-mobile-options') || '');
        }

        return options;
    };

    class HTMLVideo extends EventEmitter {
        constructor(node, options) {
            super();

            this._node = $(node);

            this.instanceOptions = getOptions(this._node, options);

            this.option = (...args) => {
                if (args.length > 1) {
                    return this.instanceOptions.set(args[0], args[1]);
                }
                return this.instanceOptions.get(args[0]);
            };
            this.type = 'video';
            this.player = null;
            this.state = globalVariables.VIDEO.NONE;
            this.isReady = false;
            this.isShown = false;
            this.id = null;
            this.playDebounce = null;
            this.currentTime = 0;

            this.videoNode = $J.$new('div');
            this.videoWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-video').setCss({ transition: 'opacity .3 linear' });

            this.videoWrapper.attr('data-video-type', this.type);

            this.fullscreen = this.option('controls.fullscreen');

            this.hide();
        }

        get autoplay() {
            return this.option('autoplay');
        }

        onBeforeFullscreenIn() {
            this.getCurrentTime();
            this.fullscreen = false;
        }

        onAfterFullscreenIn() {}

        onBeforeFullscreenOut() {
            this.getCurrentTime();
            this.fullscreen = this.option('controls.fullscreen');
        }

        onAfterFullscreenOut() {}

        getSize() {
            return new Promise((resolve) => {
                const size = this.videoWrapper.size;

                if (size.width && size.height) {
                    resolve(size);
                } else {
                    helper.videoModule.getAspectRatio(this._node).then((aspectratio) => {
                        if (size.width) {
                            size.height = size.width * aspectratio;
                        } else {
                            size.width = size.height / aspectratio;
                        }
                        resolve(size);
                    }).catch(() => {
                        resolve(null);
                    });
                }
            });
        }

        createPlayer(player) {
            this.player = {
                ready: true,

                play: () => {
                    this.playDebounce();
                },

                pause: () => {
                    this.player.player.node.pause();
                },

                player: this._node
            };

            this.playDebounce = helper.debounce(() => { this.player.player.node.play(); }, 100);

            if (this.option('loop')) {
                this.player.player.attr('loop', 'loop');
            } else {
                this.player.player.removeAttr('loop');
            }

            this.player.player.attr('playsinline', 'playsinline');

            if (this.option('controls.enable')) {
                this.player.player.attr('controls', 'controls');
            } else {
                this.player.player.removeAttr('controls');
            }

            if (this.autoplay) {
                this.player.player.volume = 0;
                this.player.player.attr('muted', 'muted');
            } else {
                this.player.player.volume = this.option('volume') / 100;
            }

            this.player.player.attr('preload', this.option('preload') ? 'auto' : 'none');

            this.addEvents();

            this.emit('slideVideoReady', { data: { type: this.type, error: null } });
            return Promise.resolve();
        }

        get node() {
            return this.videoWrapper;
        }

        init() {
            if (this.type === 'video') {
                let _src = this._node.attr('data-src');

                if (_src) {
                    this._node.attr('src', _src);
                }

                Array.from(this._node.node.children).forEach((child) => {
                    child = $(child);
                    if (child && child.tagName === 'source') {
                        _src = child.attr('data-src');

                        if (_src) {
                            child.attr('src', _src);
                            if ($J.browser.engine === 'gecko') {
                                child.node.parentNode.load();
                            }
                        }
                    }
                });

                this.videoNode = this._node;
            }

            this.id = this.type + '-' + helper.generateUUID();
            this.videoNode.attr('id', this.id);

            this.videoWrapper.append(this.videoNode);

            const data = { type: this.type, error: null };

            helper.videoModule.getAPI(this._node).then((player) => {
                this.createPlayer(player)
                    .then(() => { data.error = false; })
                    .catch((_err) => { data.error = !!_err; })
                    .finally(() => {
                        this.isReady = true;
                        // this.emit('slideVideoReady', { data: data });
                    });
            }).catch((err) => {
                data.error = true;
                this.emit('slideVideoReady', { data: data });
            });
        }

        addEvents() {
            this.player.player.addEvent('play', (e) => {
                e.stop();
                this.state = globalVariables.VIDEO.PLAY;
                this.emit('slideVideoPlay', {
                    data: { type: this.type }
                });
            });

            this.player.player.addEvent('pause', (e) => {
                e.stop();
                this.state = globalVariables.VIDEO.PAUSE;
                this.emit('slideVideoPause', {
                    data: { type: this.type }
                });
            });

            this.player.player.addEvent('ended', (e) => {
                e.stop();
                this.state = globalVariables.VIDEO.PAUSE;
                this.emit('slideVideoEnd', {
                    data: { type: this.type }
                });
            });
        }

        play() {
            if (this.player && this.player.ready) {
                this.setCurrentTime();
                this.player.play();
            }
        }

        pause() {
            if (this.player && this.player.ready) {
                this.player.pause();
            }
        }

        getCurrentTime() {
            if (this.player && this.player.player) {
                this.currentTime = this.player.player.currentTime;
            }
        }

        setCurrentTime() {
            if (this.player && this.player.ready) {
                this.player.player.currentTime = this.currentTime;
            }
        }

        get preStart() {
            return this.state === globalVariables.VIDEO.NONE;
        }

        get paused() {
            return this.state === globalVariables.VIDEO.PAUSE;
        }

        show() {
            this.isShown = true;
            this.videoWrapper.setCssProp('opacity', 1);
        }

        hide() {
            this.isShown = false;
            this.videoWrapper.setCssProp('opacity', 0);
        }

        destroy() {
            if (this.playDebounce) {
                this.playDebounce.cancel();
                this.playDebounce = null;
            }
            this.pause();
            this.videoWrapper.remove();

            this._node = correctVideoSrc(this._node);

            if (this.type === 'video') {
                Array.from(this._node.node.children).forEach((child) => {
                    if ($(child).tagName === 'source') {
                        correctVideoSrc(child);
                    }
                });
            }

            super.destroy();
        }
    }


    class YouTubeVideo extends HTMLVideo {
        constructor(node, options) {
            super(node, options);
            this.type = 'youtube';
            this.playerState = -1;
            this.videoWrapper.attr('data-video-type', this.type);
            this.apiPlayer = null;
        }

        setCurrentTime() {
            if (this.player && this.player.ready) {
                this.player.player.seekTo(this.currentTime);
            }
        }

        getCurrentTime() {
            if (this.player && this.player.player) {
                if (this.player.player.getCurrentTime) {
                    this.currentTime = this.player.player.getCurrentTime();
                } else {
                    this.currentTime = 0;
                }
            }
        }

        destroyVideoPlayer() {
            this.getCurrentTime();
            if (this.player && this.player.player) {
                this.player.ready = false;
                this.player.player.destroy();
            }

            this.playerState = -1;
        }

        onBeforeFullscreenIn() {
            this.fullscreen = false;
            // we must destroy and create player because the 'onStateChange' won't work after change DOM
            this.destroyVideoPlayer();
        }

        onAfterFullscreenIn() {
            this.createPlayer(this.apiPlayer);
        }

        onBeforeFullscreenOut() {
            this.fullscreen = this.option('controls.fullscreen');
            // we must destroy and create player because the 'onStateChange' won't work after change DOM
            this.destroyVideoPlayer();
        }

        onAfterFullscreenOut() {
            this.createPlayer(this.apiPlayer);
        }

        createPlayer(player) {
            this.apiPlayer = player;
            return new Promise((resolve, reject) => {
                const videoID = helper.videoModule.getId(this._node);
                this.player = {
                    ready: false,

                    play: () => {
                        this.player.player.playVideo();
                    },

                    pause: () => {
                        this.player.player.pauseVideo();
                    },

                    player: new player.Player(this.id, {
                        videoId: videoID,
                        playerVars: {
                            playlist: videoID, // it is just for loop parameter
                            fs: this.fullscreen ? 1 : 0,
                            rel: 0,
                            loop: this.option('loop') ? 1 : 0,
                            autoplay: 0,
                            playsinline: 1,
                            controls: this.option('controls.enable') ? 1 : 0
                        },
                        events: {
                            'onReady': () => {
                                this.playerState = -1;
                                this.player.ready = true;
                                this.player.player.setVolume(this.option('volume'));
                                this.emit('slideVideoReady', { data: { type: this.type, error: null } });
                                resolve();
                            },

                            'onError': (err) => {
                                if (err.data === 100) {
                                    // 'Video is not found'
                                    this.player = null;
                                }
                                this.emit('slideVideoReady', { data: { type: this.type, error: true } });
                                reject(true);
                            },

                            'onStateChange': this.addEvents.bind(this)
                        }
                    })
                };
            });
        }

        addEvents(e) {
            const state = (e.target || e.target).getPlayerState();
            this.playerState = state;
            if (this.state === globalVariables.VIDEO.PLAY) {
                this.state = globalVariables.VIDEO.PAUSE;
            }
            switch (state) {
                case -1:
                    break;
                case 0:
                    // console.log('finish');
                    if (!this.option('loop')) {
                        this.player.pause();
                    }

                    this.emit('slideVideoEnd', {
                        data: { type: this.type }
                    });
                    break;
                case 1:
                    // console.log('play');
                    this.state = globalVariables.VIDEO.PLAY;
                    this.emit('slideVideoPlay', {
                        data: { type: this.type }
                    });
                    break;
                case 2:
                    // console.log('pause');
                    this.state = globalVariables.VIDEO.PAUSE;
                    this.emit('slideVideoPause', {
                        data: { type: this.type }
                    });
                    break;
                case 3:
                    // console.log('buffering');
                    break;
                case 5:
                    // console.log('video cued');
                    break;
                // no default
            }
        }

        destroy() {
            super.destroy();

            if (this.player && this.player.player) {
                this.player.player.destroy();
                this.player.player = null;
            }
        }
    }


    // urls
    // http://vimeo.com/6701902
    // http://vimeo.com/670190233
    // https://vimeo.com/11111111
    // https://www.vimeo.com/11111111
    // http://player.vimeo.com/video/67019023
    // http://player.vimeo.com/video/67019022?title=0&byline=0&portrait=0
    // https://vimeo.com/channels/11111111
    // http://vimeo.com/channels/vimeogirls/6701902
    // http://vimeo.com/channels/staffpicks/6701902
    // https://vimeo.com/album/2222222/video/11111111
    // https://vimeo.com/groups/name/videos/11111111
    // https://vimeo.com/11111111?param=test


    // wrong
    // http://vimeo.com/videoschool
    // http://vimeo.com/videoschool/archive/behind_the_scenes
    // http://vimeo.com/forums/screening_room
    // http://vimeo.com/forums/screening_room/topic:42708

    class VimeoVideo extends HTMLVideo {
        constructor(node, options) {
            super(node, options);
            this.type = 'vimeo';
            this.apiPlayer = null;
            this.videoWrapper.attr('data-video-type', this.type);
        }


        createPlayer(player) {
            this.apiPlayer = player;
            return new Promise((resolve, reject) => {
                this.videoNode.attr('data-vimeo-id', helper.videoModule.getId(this._node));

                if (player.Player) {
                    const tmp = this.videoNode.attr('data-src');

                    if (tmp) {
                        this.videoNode.attr('src', tmp);
                    }

                    const opt = {
                        id: helper.videoModule.getId(this._node),
                        loop: this.option('loop'),
                        controls: this.option('controls.enable'),
                        speed: this.option('controls.speed')
                    };

                    this.player = {
                        ready: false,

                        play: () => {
                            this.player.player.setVolume(0);
                            this.player.player.play();
                        },

                        pause: () => {
                            this.player.player.pause();
                        },

                        player: new player.Player(this.videoNode.node, opt)
                    };

                    this.addEvents(resolve);
                } else {
                    reject(true);
                }
            });
        }

        destroyVideoPlayer() {
            if (this.player && this.player.player) {
                this.player.ready = false;
                this.player.player.destroy();
            }
        }

        play() {
            if (this.player && this.player.ready) {
                this.setCurrentTime();
                this.player.play();
            }
        }

        onBeforeFullscreenIn() {
            this.destroyVideoPlayer();
        }

        onAfterFullscreenIn() {
            this.createPlayer(this.apiPlayer);
        }

        onBeforeFullscreenOut() {
            this.destroyVideoPlayer();
        }

        onAfterFullscreenOut() {
            this.createPlayer(this.apiPlayer);
        }

        getCurrentTime() {}

        setCurrentTime() {
            if (this.player && this.player.ready) {
                this.player.player.setCurrentTime(this.currentTime);
            }
        }

        addEvents(callback) {
            this.player.player.on('play', () => {
                this.state = globalVariables.VIDEO.PLAY;
                this.emit('slideVideoPlay', {
                    data: { type: this.type }
                });
            });

            this.player.player.on('pause', () => {
                this.state = globalVariables.VIDEO.PAUSE;
                this.emit('slideVideoPause', {
                    data: { type: this.type }
                });
            });

            this.player.player.on('ended', () => {
                this.state = globalVariables.VIDEO.PAUSE;
                this.emit('slideVideoEnd', {
                    data: { type: this.type }
                });
            });

            this.player.player.on('loaded', () => {
                // empty
            });

            this.player.player.on('timeupdate', (data) => {
                this.currentTime = data.seconds;
            });

            // vimeo api bug
            // If we use the ready event before then we add listerners of vimeo events then events do not work
            if (this.player.player) {
                this.player.player.ready().then(() => {
                    this.player.ready = true;
                    if (this.state === globalVariables.VIDEO.PLAY) {
                        this.state = globalVariables.VIDEO.PAUSE;
                    }
                    this.player.player.setVolume(0);
                    // this.player.player.setVolume(this.option('volume') / 100);
                    this.emit('slideVideoReady', { data: { type: this.type, error: null } });
                    callback();
                });
            } else {
                this.emit('slideVideoReady', { data: { type: this.type, error: new Error('Player does not exist.') } });
            }
        }

        destroy() {
            super.destroy();

            this.videoNode.remove();
            this.videoNode = null;
            this.videoWrapper.remove();
            this.videoWrapper = null;

            if (this.player && this.player.player) {
                this.player.player.destroy();
                this.player.player = null;
            }

            this._node = null;
        }
    }

    return {
        HTMLVideo: HTMLVideo,
        YouTubeVideo: YouTubeVideo,
        VimeoVideo: VimeoVideo
    };
})();

/* eslint-env es6 */
/* global helper */
/* global $, $J, EventEmitter, SocialButtons */
/* global ComponentLoader, ResponsiveImage */
/* eslint-disable no-lonely-if */
/* global SirvService, CSS_MAIN_CLASS, SELECTOR_TAG, SELECTOR_CLASS, slideVideo */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Slide" }] */


const Slide = (() => {
    const CAN_ZOOM_CLASS = CSS_MAIN_CLASS + '-can-zoom';

    /**
     * because that css can take much time for loading
     * and we can get wrong sizes
     */
    const NECESSARY_CSS = {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    };

    const getContentSize = (node, count) => {
        return new Promise((resolve) => {
            node = $(node);

            if (count === undefined) { count = 10; }

            if (count > 0) {
                const size = node.size;
                if (!size.width || !size.height) {
                    setTimeout(() => {
                        count -= 1;
                        getContentSize(node, count).then(resolve);
                    }, 32);
                } else {
                    resolve(size);
                }
            } else {
                resolve(null);
            }
        });
    };

    const findSomethingForSelector = (node) => {
        const result = { type: 'node', data: null };

        if (helper.videoModule.isVideo(node)) {
            result.type = helper.videoModule.getType(node);
            if (!result.type) {
                result.data = $J.$new('div');
            }
        } else {
            let tmp;
            let src;

            if ($(node).tagName === 'img') {
                tmp = node;
            } else {
                try {
                    tmp = node.getElementsByTagName('img')[0];
                } catch (e) {
                    // empty
                }
            }

            if (tmp) {
                src = helper.sliderLib.getSrc($(tmp).attr('src')) || helper.sliderLib.getSrc($(tmp).attr('data-src'));
            }

            if (src) {
                result.type = 'img';
                result.data = src;
            } else {
                if (node.cloneNode) {
                    tmp = node.cloneNode(true);
                } else {
                    tmp = $J.$new('div');
                }

                result.data = tmp;
            }
        }

        return result;
    };

    const getCustomSelectorNode = (node) => {
        let result = $(node.node.querySelector(SELECTOR_TAG));

        if (!result) {
            if (node.tagName === SELECTOR_TAG) {
                result = node;
            } else {
                result = null;
            }
        }

        return result;
    };

    class Slide_ extends EventEmitter {
        constructor(node, index, options, isCustomAdded) {
            super();

            this.$J_UUID = $J.$uuid(this);

            this.groups = ($(node).attr('data-group') || '').split(/\s*(?:,|$)\s*/);

            const slideData = Slide.parse(node);
            this.id = slideData.id; // data-id attr
            this._enabled = slideData.enabled;
            this.type = slideData.type;
            this.url = slideData.url;

            this.slideContent = $(node);
            this._index = index;
            this.isCustomAdded = isCustomAdded || false;

            this._options = {};
            this.options = options;

            this.instanceNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slide').setCss({ position: 'absolute' });
            this.instanceNode.setCss(NECESSARY_CSS);
            this.contentWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-content');
            this.contentWrapper.setCss(NECESSARY_CSS);
            this.fullscreenOnlyNode = null;

            this.selector = {
                UUID: this.$J_UUID,
                isCustom: false,
                node: getCustomSelectorNode(this.slideContent),
                isSirv: false,
                isVideo: false,
                selectorContent: null,
                size: { width: 0, height: 0 },
                src: null,
                srcset: null,
                pinned: null,
                activated: true,
                infoPromise: null,
                isStatic: false
            };

            this.selector.isStatic = Slide_.checkNonSirv(this.selector.node);
            this.selector.pinned = Slide_.findPinnedSelectorSide(this.slideContent.node.querySelector(SELECTOR_TAG) || this.slideContent.node);
            this.selector.isCustom = !!this.selector.node;
            this.thumbnailReferrerPolicy = this.getSelectorReferrerPolicy();
            this.availableSlide = true;

            this.isStartedFullInit = false;
            this.fullscreenState = globalVariables.FULLSCREEN.CLOSED;
            this.isStarted = false;
            this.sirvService = null;
            this.componentSize = null;
            this.inView = false;
            this.isActive = false;
            this.isReady = false;
            this.video = null;
            this.isVideoPaused = false;
            this.isVideoReady = false;

            this.slideShownBy = globalVariables.SLIDE_SHOWN_BY.NONE;
            this.componentLoader = null;

            this.infoSize = null;
            this.sizePromise = null;
            this.isInDom = 0; // 0 / 1
            this.multiImages = [];
            this.lastOriginNode = null;

            this.dataThumbnailImage = this.getThumbnailImage();

            this.dataThumbnailHtml = this.slideContent.attr('data-thumbnail-html');
            this.dataHiddenSelector = this.slideContent.hasAttribute('data-hidden-selector');
            // Disables switching slides by swipe on touchscreen.
            this.swipeDisabled = this.slideContent.hasAttribute('data-swipe-disabled');

            this.spinWasInited = false;

            this.socialbuttons = null;

            this.getVideoThumbnailPromise = null;
            this.isPlaceholder = false;

            this.customThumbnailImageClassPromise = null;

            const this_ = this;
            this._api = {
                get index() { return this_.index; },
                get component() {
                    if (this_.sirvService) {
                        return globalVariables.SLIDE.NAMES[this_.sirvService.type];
                    }

                    return 'unknown';
                },
                get groups() { return this_.groups; },
                get thumbnail() { return this_.selector.node?.node ?? null; },
                isDisabled() { return !this_.enabled; },
                isActive() { return this_.isActive; },
                getSelector() { return this.thumbnail; } // for backward compatibility
            };

            this.sendEventCloseFullscreenByClick = (e) => {
                e.stop();
                this.emit('goToFullscreenOut');
            };

            this.beforeParseSlide();
            this.parseSlide();
        }

        static findPinnedSelectorSide(node) {
            if (node.hasAttribute('data-pinned')) {
                const attrValue = $J.$(node).attr('data-pinned');
                return attrValue !== 'start' ? 'end' : attrValue;
            }

            return null;
        }

        static parse(node) {
            node = $(node);

            // const result = { node: node.node };
            const result = {};
            result.node = node.node;
            result.id = node.attr('data-id');

            let url = null;
            let type = globalVariables.SLIDE.TYPES.HTML;
            let enabled = true;

            /*
                spin, zoom, image, video, html
            */
            if (Slide.isSirvComponent(node)) {
                const tmp = helper.getSirvType(node);
                type = tmp.type;
                url = tmp.imgSrc;
            } else if (helper.videoModule.isVideo(node)) {
                type = globalVariables.SLIDE.TYPES.VIDEO;
                url = helper.videoModule.getSrc(node);
            } else if (node.tagName === 'img' || node.tagName === 'div' && node.attr('data-src')) {
                type = globalVariables.SLIDE.TYPES.IMAGE;
                url = node.attr('data-src') || node.attr('src');
            }

            result.type = type;
            result.url = url;

            const slideIsDisabled = node.node.getAttribute('data-disabled'); // don't use .attr() method
            if (slideIsDisabled && slideIsDisabled !== 'false' || slideIsDisabled === '') {
                enabled = false;
            }

            result.enabled = enabled;

            return result;
        }

        static checkNonSirv(node) {
            if (node && $(node).attr('data-type') === 'static') {
                return true;
            }

            return false;
        }

        static isSirvComponent(node) {
            node = $(node);

            // const dataEffect = node.attr('data-type') || node.attr('data-effect');
            const dataSrc = node.attr('data-src');
            const src = node.attr('src');
            const nonSirv = Slide.checkNonSirv(node);
            const tagName = node.tagName;
            const viewContent = node.fetch('view-content');

            if (
                !nonSirv &&
                (
                    // (tagName === 'div' && !['youtube', 'vimeo'].includes(helper.videoModule.getType(dataSrc)) && (dataEffect === 'zoom' || helper.isSpin(dataSrc) || helper.isVideo(dataSrc))) ||
                    viewContent ||
                    (tagName === 'div' && !['youtube', 'vimeo'].includes(helper.videoModule.getType(dataSrc)) && dataSrc) ||
                    (tagName === 'img' && (dataSrc || src))
                )
            ) {
                return true;
            }

            return false;
        }

        static hasComponent(node) {
            return SirvService.isExist(node);
        }

        isSwipeDisabled() {
            return this.swipeDisabled;
        }

        getThumbnailImage() {
            let result = this.slideContent.attr('data-thumbnail-image');

            if (!result && this.selector.isCustom) {
                result = this.selector.node.attr('data-src');
                if (!result) {
                    const children = this.selector.node.node.children;
                    if (children.length === 1 && $(children[0]).tagName === 'img') {
                        result = $(children[0]).attr('data-src') || $(children[0]).attr('src');
                    }
                }
            }

            return result;
        }

        startGettingInfo() {
            if (this.sirv) {
                this.sirvService.startGettingInfo();
            }
        }

        loadContent() {
            if (this.sirv) {
                this.getSlideSize()
                    .then((infoSize) => {
                        if (this.isInDom) {
                            this.sirvService.loadContent();
                        }
                    }).catch((err) => {});
            }
        }

        loadThumbnail() {
            if (this.sirv) {
                this.getSlideSize()
                    .then((infoSize) => {
                        if (this.isInDom) {
                            this.sirvService.loadThumbnail();
                        }
                    }).catch((err) => {});
            }
        }

        get videoSlide() {
            let result = false;

            if (this.sirv) {
                result = this.sirvService.type === globalVariables.SLIDE.TYPES.VIDEO;
            } else if (this.video) {
                result = true;
            }

            return result;
        }

        belongsTo(group) {
            let result = false;

            if (group) {
                if ($J.typeOf(group) === 'string') {
                    group = [group];
                }

                result = group.some(g => this.groups.includes(g));
            }

            return result;
        }

        addGroup(newGroup) {
            let result = false;

            if (newGroup && $J.typeOf(newGroup) === 'string' && !this.groups.includes(newGroup)) {
                result = true;
                this.groups.push(newGroup);
            }

            return result;
        }

        removeGroup(group) {
            let result = false;

            if (group && $J.typeOf(group) === 'string') {
                const index = this.groups.indexOf(group);
                if (index > -1) {
                    result = true;
                    this.groups.splice(index, 1);
                }
            }

            return result;
        }

        get customSelector() {
            return this.selector.isCustom;
        }

        single(isSingle) {
            if (this.sirv) {
                this.broadcast('isSingleSlide', { data: { isSingle: isSingle } });
            }
        }

        /**
         * @param {number} index
         */
        set newIndex(index) {
            this._index = index;
        }

        get index() {
            return this._index;
        }

        checkReadiness(eventName, component) {
            let result = false;

            if (this.sirv && globalVariables.SLIDE.NAMES[this.sirvService.type] === component) {
                if (eventName === 'init') {
                    result = this.spinWasInited;
                } else {
                    result = this.isReady;
                }
            }

            return result;
        }

        sendReadyEvent(eventName, component) {
            if (this.sirv && globalVariables.SLIDE.NAMES[this.sirvService.type] === component) {
                this.sirvService.sendEvent(eventName);
            }
        }

        createFullscreenOnlyScreen() {
            if (this._options.fullscreenOnly) {
                this.fullscreenOnlyNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-fullscreen-always');
                // this.fullscreenOnlyNode.addEvent(['mousedown', 'touchstart'], (e) => {
                this.fullscreenOnlyNode.addEvent(['btnclick', 'tap'], (e) => {
                    e.stop();
                    this.emit('goToFullscreen');
                });

                this.createPinchEvent(this.fullscreenOnlyNode);

                this.instanceNode.append(this.fullscreenOnlyNode, 'top');
            }
        }

        createPinchEvent(node) {
            if ($J.browser.touchScreen) {
                // difference between scale
                const FS_IN = 2;
                node.addEvent('pinch', (e) => {
                    e.stop();
                    switch (e.state) {
                        case 'pinchend':
                            if (this.fullscreenState === 0 && e.scale >= FS_IN) {
                                this.emit('goToFullscreen');
                            }
                            break;
                        default:
                    }
                });
            }
        }

        get enabled() {
            return this._enabled;
        }

        disable() {
            this._enabled = false;
            if (this.video) { this.video.pause(); }
            if (this.componentLoader) {
                this.componentLoader.hide(true);
            }
        }

        enable() {
            this._enabled = true;
        }

        get blokedTouchdrag() {
            let result = false;

            if (this.sirv) {
                if (this.sirvService.type === globalVariables.SLIDE.TYPES.SPIN) {
                    result = true;
                } else {
                    result = this.sirvService.isEffectActive();
                }
            }

            return result;
        }

        set options(options) {
            this._options = Object.assign({
                spin: {},
                zoom: {},
                image: {},
                video: {},
                fullscreenOnly: false
            }, (options || {}));
        }

        dragEvent(type) {
            if (this.sirvService) {
                this.broadcast('dragEvent', { data: { type: type } });
            }
        }

        startFullInit(options) {
            if (this.isStartedFullInit) { return; }
            this.isStartedFullInit = true;

            if (options) {
                this.options = options;
            }

            if (this.sirvService) {
                this.sirvService.startFullInit(options ? this._options : null);
            }

            this.hide();

            this.instanceNode.append(this.contentWrapper);

            if (!this.sirv) {
                this.appendToDOM();
            }
        }

        createComponentLoader() {
            if (!this.componentLoader) {
                this.componentLoader = new ComponentLoader(this.instanceNode);
                this.componentLoader.show();
            }
        }

        get slideAvailable() {
            return this.availableSlide;
        }

        get selectorPinned() {
            return ['start', 'end'].includes(this.selector.pinned);
        }

        get pinnedSelectorSide() {
            return this.selector.pinned;
        }

        setFullscreenEvents() {
            this.on('beforeFullscreenIn', (e) => {
                if (this.fullscreenState === globalVariables.FULLSCREEN.OPENING) {
                    e.stopPropagation();
                } else {
                    this.fullscreenState = globalVariables.FULLSCREEN.OPENING;
                    if (this.video) {
                        this.isVideoPaused = this.video.paused;
                        this.video.onBeforeFullscreenIn();
                    }
                }

                if (this.fullscreenOnlyNode) {
                    this.fullscreenOnlyNode.setCssProp('display', 'none');
                }
                this.addEventCloseFullscreenByClick();
            });

            this.on('afterFullscreenIn', (e) => {
                if (this.socialbuttons) {
                    this.socialbuttons.closeButtons();
                }

                if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                    e.stopPropagation();
                } else {
                    this.fullscreenState = globalVariables.FULLSCREEN.OPENED;
                    if (this.sirv && this.componentLoader.isHiding()) {
                        this.componentLoader.hide(true);
                    }
                    if (this.video) {
                        this.video.onAfterFullscreenIn();
                        if (this.video.autoplay || !this.video.preStart) {
                            this.playVideo();
                        }
                    }
                }
            });

            this.on('beforeFullscreenOut', (e) => {
                if (this.socialbuttons) {
                    this.socialbuttons.closeButtons();
                }

                if (this.fullscreenState === globalVariables.FULLSCREEN.CLOSING) {
                    e.stopPropagation();
                } else {
                    this.fullscreenState = globalVariables.FULLSCREEN.CLOSING;
                    if (this.video) {
                        this.isVideoPaused = this.video.paused;
                        this.video.onBeforeFullscreenOut();
                    }
                }

                if (this.fullscreenOnlyNode) {
                    this.fullscreenOnlyNode.setCssProp('display', '');
                }
            });

            this.on('afterFullscreenOut', (e) => {
                if (this.fullscreenState === globalVariables.FULLSCREEN.CLOSED) {
                    e.stopPropagation();
                } else {
                    this.fullscreenState = globalVariables.FULLSCREEN.CLOSED;
                    if (this.video) {
                        this.video.onAfterFullscreenOut();
                        if (this.video.autoplay || !this.video.preStart) {
                            this.playVideo();
                        }
                    }
                }
                this.removeEventCloseFullscreeByClick();
            });

            this.on('inView', (e) => {
                this.inView = e.data;

                if (this.video) {
                    if (this.inView) {
                        if (!this.isVideoPaused && !this.video.preStart || this.video.autoplay) {
                            this.playVideo();
                        }
                    } else {
                        this.isVideoPaused = this.video.paused;
                        this.video.getCurrentTime();
                        this.video.pause();
                    }
                }
            });
        }

        addEventCloseFullscreenByClick() {
            if (this._options.fullscreenOnly && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
                this.contentWrapper.addEvent(['btnclick', 'tap'], this.sendEventCloseFullscreenByClick);
                this.slideContent.addEvent(['btnclick', 'tap'], this.sendEventCloseFullscreenByClick);
            }
        }

        removeEventCloseFullscreeByClick() {
            if (this._options.fullscreenOnly && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
                this.contentWrapper.removeEvent(['btnclick', 'tap'], this.sendEventCloseFullscreenByClick);
                this.slideContent.removeEvent(['btnclick', 'tap'], this.sendEventCloseFullscreenByClick);
            }
        }

        get sirv() { return !!this.sirvService; }
        get node() { return this.instanceNode; }
        get originNode() { return this.lastOriginNode || this.slideContent; }

        get originImageUrl() {
            if (this.sirv) {
                return this.sirvService.originImageUrl;
            }

            return null;
        }

        zoomIn(x, y) {
            this.broadcast('zoomUp', { data: { x: x, y: y } });
        }

        zoomOut(x, y) {
            this.broadcast('zoomDown', { data: { x: x, y: y } });
        }

        mouseAction(type, originEvent) {
            if (this.sirv) {
                this.broadcast('mouseAction', { data: { type: type, originEvent: originEvent } });
            }
        }

        get zoomData() {
            if (this.sirv) {
                return this.sirvService.getZoomData();
            }

            return null;
        }

        get typeOfSlide() {
            let result = null;
            if (this.sirv) { result = this.sirvService.type; }
            return result;
        }

        get options() {
            return this.sirv ? this.sirvService.getToolOptions() : {};
        }

        createSlideApi() {
            if (this.sirv && !this.isStarted) {
                this.isStarted = true;

                this.api[globalVariables.SLIDE.NAMES[this.sirvService.type]] = this.sirvService.getData();
            }
        }

        beforeShow() {
            this.isActive = true;
            this.show();
            if (this.sirv) {
                this.sirvService.activate();
            }

            this.createSlideApi();
        }

        afterShow(whoUse) {
            this.slideShownBy = whoUse || globalVariables.SLIDE_SHOWN_BY.NONE;
            this.broadcast('startActions', { who: this.slideShownBy });
            if (this.video && this.video.autoplay) {
                this.playVideo();
            }
        }

        beforeHide() {
            if (this.video) {
                this.video.pause();
            } else {
                this.broadcast('stopActions');
            }
        }

        afterHide() {
            this.slideShownBy = globalVariables.SLIDE_SHOWN_BY.NONE;
            this.isActive = false;
            this.hide();

            if (this.sirv) {
                this.sirvService.deactivate();
            }

            if (this.socialbuttons) {
                this.socialbuttons.closeButtons();
            }
        }

        show() {
            this.instanceNode.removeClass(CSS_MAIN_CLASS + '-hidden');
            this.instanceNode.addClass(CSS_MAIN_CLASS + '-shown');
        }

        hide() {
            this.instanceNode.removeClass(CSS_MAIN_CLASS + '-shown');
            this.instanceNode.addClass(CSS_MAIN_CLASS + '-hidden');
        }

        get zoomSizeExist() {
            if (this.sirv) {
                return this.sirvService.isZoomSizeExist();
            }

            return false;
        }

        startTool(isShown, preload, firstSlideAhead) {
            if (this.sirv) {
                this.getSlideSize()
                    .then((infoSize) => {
                        if (this.isInDom && this.sirvService) {
                            this.sirvService.startTool(isShown || this.isActive, preload, firstSlideAhead);
                            this.addSocialButtons();
                        } else {
                            this.emit('contentLoaded', { data: { slide: { index: this._index } } });
                        }
                    }).catch((err) => {});
            } else {
                this.getSlideSize()
                    .then(() => {
                        this.emit('contentLoaded', { data: { slide: { index: this._index } } });
                    });
            }
        }

        getSlideSize() {
            if (!this.sizePromise) {
                this.sizePromise = new Promise((resolve, reject) => {
                    if (this.sirv) {
                        const result = { UUID: this.$J_UUID };
                        this.sirvService.getInfoSize()
                            .then((infoSize) => {
                                if (!this.infoSize && infoSize.size) {
                                    this.infoSize = infoSize.size;
                                }
                                result.size = this.infoSize;
                                resolve(result);
                            })
                            .catch((err) => {
                                result.error = true;

                                if (this.sirvService) {
                                    const typeOfSirvService = this.sirvService.type;

                                    this.removeSirvService();

                                    if (err && err.error && err.error.status && err.error.status === 404) {
                                        result.error = err.error;
                                        reject(result);
                                    } else if (err && (err.error === 'changeSpinToImage' || typeOfSirvService === globalVariables.SLIDE.TYPES.IMAGE || err.isPlaceholder)) {
                                        this.isPlaceholder = err.isPlaceholder;
                                        if (typeOfSirvService === globalVariables.SLIDE.TYPES.IMAGE) {
                                            this.isInDom = 0;
                                            this.appendToDOM();

                                            const data = findSomethingForSelector(this.slideContent.node);

                                            if (!this.selector.isCustom) {
                                                this.selector.src = data ? data.data : null;
                                                this.selector.isSirv = false;
                                            }
                                        } else {
                                            this.changeSpinToImage();
                                        }

                                        // финт ушами
                                        const oldPromise = this.sizePromise;
                                        this.sizePromise = null;
                                        const newPromise = this.getSlideSize();
                                        this.sizePromise = oldPromise;
                                        newPromise.then(resolve).catch(reject);
                                    } else {
                                        result.error = { status: 404 };
                                        reject(result);
                                    }
                                } else {
                                    result.error = { status: 404 };
                                    reject(result);
                                }
                            })
                            .finally(() => {
                                if (this.isCustomAdded) {
                                    this.emit('infoReady', { data: { index: this._index } });
                                }
                            });
                    } else {
                        let img;
                        let src;

                        if (this.slideContent.tagName === 'img') {
                            img = this.slideContent.node;
                        } else {
                            try {
                                img = this.slideContent.node.getElementsByTagName('img')[0];
                            } catch (e) {
                                // empty
                            }
                        }

                        if (img) {
                            src = helper.sliderLib.getSrc($(img).attr('src'));
                            if (!src) {
                                src = helper.sliderLib.getSrc($(img).attr('data-src'));
                            }
                        // } else {
                        //     src = helper.sliderLib.getSrc($(img).attr('data-src'));
                        }

                        if (src) {
                            helper.loadImage(src).then((imageData) => {
                                this.infoSize = imageData.size;
                                resolve({ size: this.infoSize, UUID: this.$J_UUID });
                            }).catch((error) => {
                                resolve({ size: this.infoSize, UUID: this.$J_UUID, error: { status: 404 } });
                            });
                        } else {
                            if (this.video) {
                                this.video.getSize()
                                    .then((size) => {
                                        this.infoSize = size || { width: 0, height: 0 };
                                        resolve({ size: this.infoSize, UUID: this.$J_UUID });
                                    })
                                    .catch((err) => { reject({ size: this.infoSize, UUID: this.$J_UUID, error: err }); });
                            } else {
                                getContentSize(this.slideContent.node)
                                    .then((size) => {
                                        this.infoSize = size || { width: 0, height: 0 };
                                        resolve({ size: this.infoSize, UUID: this.$J_UUID });
                                    })
                                    .catch((err) => { reject({ size: this.infoSize, UUID: this.$J_UUID, error: err }); });
                            }
                        }
                    }
                });
            }

            return this.sizePromise;
        }

        get api() { return this._api; }

        removeSirvService() {
            this.infoSize = null;

            if (this.slideContent) {
                this.slideContent.remove();
            }

            if (this.selector.node) {
                this.selector.node.removeAttr('data-type');
            }

            if (this.sirvService) {
                this.sirvService.destroy();
                this.sirvService = null;
            }

            this.selector.isSirv = false;

            this.off('stats');
            this.off('componentEvent');
            this.off('beforeFullscreenIn');
            this.off('afterFullscreenIn');
            this.off('beforeFullscreenOut');
            this.off('afterFullscreenOut');

            if (this.componentLoader) {
                this.componentLoader.hide(true);
                this.componentLoader.destroy();
                this.componentLoader = null;
            }

            if (this.fullscreenOnlyNode) {
                this.fullscreenOnlyNode.kill();
                this.fullscreenOnlyNode = null;
            }
        }

        changeSpinToImage() {
            this.slideContent.removeClass(CSS_MAIN_CLASS + '-component');
            this.contentWrapper.removeClass(CSS_MAIN_CLASS + '-content-' + globalVariables.SLIDE.NAMES[this.typeOfSlide]);

            this.lastOriginNode = this.slideContent;
            this.slideContent = $J.$new('img', { 'data-src': this.slideContent.attr('data-src') });
            this.slideContent.addClass(CSS_MAIN_CLASS + '-component');

            this.parseSlide();
            this.isInDom = 0;
            this.appendToDOM();

            if (this.isPlaceholder) {
                const data = findSomethingForSelector(this.slideContent);
                if (!this.selector.isCustom) {
                    this.selector.src = data ? data.data : null;
                }
            }

            if (this.selector.node && !this.selector.isCustom) {
                this.selector.node.attr('data-type', globalVariables.SLIDE.NAMES[this.typeOfSlide]);
            }

            if (this.isStartedFullInit) {
                this.isStartedFullInit = false;
                this.startFullInit();
            }
        }

        setSirvEvents() {
            this.on('stats', (e) => {
                e.stopEmptyEvent();
                e.data.index = this._index;
            });

            // init, ready, zoomIn, zoomOut
            this.on('componentEvent', (e) => {
                e.stopEmptyEvent();

                const eventData = e.data.data;
                eventData.type = e.data.type;
                eventData.node = this.slideContent;

                if (e.data.type === 'ready') {
                    this.isReady = true;
                }
                e.data.slide = this.api;
                e.data.componentEventData = eventData;

                if (e.data.component === globalVariables.SLIDE.NAMES[globalVariables.SLIDE.TYPES.SPIN]) {
                    if (e.data.type === 'init') {
                        this.componentLoader.hide();
                        this.spinWasInited = true;

                        const spinTypeClassMap = {
                            row: 'spin-x',
                            col: 'spin-y',
                            'multi-row': 'spin-xy'
                        };

                        if (this.selector.node) {
                            this.selector.node.addClass(spinTypeClassMap[this.sirvService.getSpinOrientation()] || '');
                        }
                    }
                } else {
                    if (e.data.type === 'ready') {
                        this.componentLoader.hide();
                    }
                }

                if (e.data.type === 'ready' && ['spin', 'zoom'].includes(e.data.component)) {
                    if (this.sirvService.isZoomSizeExist()) {
                        this.contentWrapper.addClass(CAN_ZOOM_CLASS);
                    }
                }
            });
        }

        addSocialButtons() {
            if (this.validateComponentSocialButton()) {
                const arr = ['facebook', 'twitter', 'linkedin', 'reddit', 'tumblr', 'pinterest', 'telegram'];
                const sTypes = {};
                arr.forEach((value) => { sTypes[value] = this._options['sb' + $J.camelize('-' + value)]; });

                const dataImageSB = SocialButtons.getDataImage();
                const links = {};
                arr.forEach((value) => { links[value] = this.getLinkSocialButton(dataImageSB[value], sTypes[value]); });

                this.socialbuttons = new SocialButtons({
                    'text': this.slideContent.attr('alt'),
                    'link': links,
                    'title': this.slideContent.attr('title')
                }, sTypes, this.instanceNode);
            }
        }

        validateComponentSocialButton() {
            if (this._options.sbEnable && SocialButtons && !this.socialbuttons) {
                if ((this.sirv && this.sirvService.type !== globalVariables.SLIDE.TYPES.VIDEO) || this.video && this.video.type !== 'video' || this.slideContent.tagName === 'img') {
                    return true;
                }
            }

            return false;
        }

        getLinkSocialButton(data, isSpin, enable) {
            let result = null;
            if (enable) {
                if (this.sirv) {
                    result = this.sirvService.getSocialButtonData(data, this.api.component === globalVariables.SLIDE.NAMES[globalVariables.SLIDE.TYPES.SPIN]);
                } else if (this.slideContent.tagName === 'iframe') {
                    result = this.video.node.attr('data-src');
                } else {
                    result = this.slideContent.attr('data-src');
                }
            }

            return result;
        }

        searchImagesInHtmlContent() {
            let result = false;
            const images = Array.from(this.slideContent.node.querySelectorAll('img'));

            if (images.length) {
                result = true;

                this.multiImages = images;

                images.forEach((img, index) => {
                    const isSirvImage = !Slide.checkNonSirv(img);
                    if (isSirvImage) {
                        if (!this.sirvService) {
                            this.setSirvEvents();
                            this.selector.isSirv = true;

                            this.sirvService = new SirvService(img, this._options, {
                                quality: this._options.quality,
                                hdQuality: this._options.hdQuality,
                                isHDQualitySet: this._options.isHDQualitySet,
                                always: this._options.fullscreenOnly,
                                isFullscreen: this._options.isFullscreen,
                                nativeFullscreen: this._options.nativeFullscreen
                            });

                            this.sirvService.parentClass = this;

                            this.sirvService.start();
                            this.createSlideApi();
                        } else {
                            this.sirvService.push(img);
                        }
                    }

                    this.multiImages.push({
                        isSirv: isSirvImage,
                        node: img,
                        src: $(img).attr('src'),
                        datasrc: $(img).attr('data-src')
                    });
                });
            }

            return result;
        }

        isCustomSlideEmpty() {
            if (this.customSelector) {
                const smvSelector = this.slideContent.node.querySelector(SELECTOR_TAG);

                if (smvSelector) {
                    $J.$(smvSelector).remove();
                    const length = Array.from(this.slideContent.node.children).length;
                    this.slideContent.append(smvSelector);

                    if (Slide.isSirvComponent(this.slideContent) && Slide.hasComponent(this.slideContent) && !this.isPlaceholder || length || helper.videoModule.isVideo(this.slideContent)) {
                        return false;
                    }
                }
            }
            return true;
        }

        beforeParseSlide() {
            if (this.customSelector) {
                if (this.isCustomSlideEmpty()) {
                    this.availableSlide = false;
                    this.selector.activated = false;
                }

                this.selector.node.remove();
            }
        }

        createImgFromDiv() {
            if (this.slideContent.tagName === 'div' && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
                const old = this.slideContent;
                this.slideContent = $J.$new('img');
                this.slideContent.attr('data-src', this.url);

                let tmp = old.attr('alt');
                if (tmp) {
                    this.slideContent.attr('alt', tmp);
                }

                tmp = old.attr('title');
                if (tmp) {
                    this.slideContent.attr('title', tmp);
                }

                tmp = old.attr('data-alt');
                if (tmp) {
                    this.slideContent.attr('data-alt', tmp);
                }

                tmp = old.attr('data-referrerpolicy');
                if (tmp) {
                    this.slideContent.attr('data-referrerpolicy', tmp);
                }
            }
        }

        parseSlide() {
            if (Slide.isSirvComponent(this.slideContent) && Slide.hasComponent(this.slideContent) && !this.isPlaceholder) {
                this.setSirvEvents();

                this.createImgFromDiv();

                this.sirvService = new SirvService(this.slideContent.node, this._options, {
                    quality: this._options.quality,
                    hdQuality: this._options.hdQuality,
                    isHDQualitySet: this._options.isHDQualitySet,
                    always: this._options.fullscreenOnly,
                    isFullscreen: this._options.isFullscreen,
                    nativeFullscreen: this._options.nativeFullscreen
                });
                this.sirvService.parentClass = this;
                this.selector.isSirv = true;

                this.sirvService.start();
                this.createSlideApi();

                this.selector.isVideo = (this.sirvService.type === globalVariables.SLIDE.TYPES.VIDEO);
                this.contentWrapper.addClass(CSS_MAIN_CLASS + '-content-' + globalVariables.SLIDE.NAMES[this.typeOfSlide]);
            } else {
                this.createImgFromDiv();

                this.searchImagesInHtmlContent();
                if (helper.videoModule.isVideo(this.slideContent)) {
                    this.selector.isVideo = true;
                    this.initVideo();
                    this.contentWrapper.addClass(CSS_MAIN_CLASS + '-content-video');
                }
            }

            if (this.dataThumbnailImage || this.dataThumbnailHtml) {
                this.selector.isSirv = false;
            }
        }

        appendToDOM() {
            if (!this.isInDom) {
                this.isInDom = 1;
                this.createFullscreenOnlyScreen();

                if (this.sirv || this.video) {
                    this.createComponentLoader();

                    if (this.video) {
                        this.contentWrapper.append(this.video.node);
                    } else {
                        this.contentWrapper.append(this.slideContent);
                    }
                } else {
                    if (this.slideContent.tagName === 'img') {
                        this.contentWrapper.addClass(CSS_MAIN_CLASS + '-slide-img');

                        if (!helper.sliderLib.getSrc(this.slideContent.attr('src'))) {
                            this.slideContent.attr('src', this.slideContent.attr('data-src'));
                        }
                    }

                    if (this.multiImages.length) {
                        this.multiImages.forEach((img) => {
                            if (!img.src && img.datasrc) {
                                $(img.node).attr('src', img.datasrc);
                            }
                        });
                    }

                    this.contentWrapper.append(this.slideContent);
                }

                this.setFullscreenEvents();
            }
        }

        initVideoPlayer() {
            if (this.video) {
                this.video.init();
            } else if (this.sirv && this.sirvService.type === globalVariables.SLIDE.TYPES.VIDEO) {
                this.sirvService.loadVideoSources();
            }
        }

        secondSelectorClick() {
            if (this.sirv) {
                this.broadcast('secondSelectorClick', { data: { slideIndex: this._index } });
            } else {
                if (this.video) {
                    this.video.pause();
                }
            }
        }

        isSirvSelector() {
            if (!this.selector.isCustom) {
                return this.sirv && this.sirvService.type !== globalVariables.SLIDE.TYPES.VIDEO;
            }

            return false;
        }

        getSelectorProportion() {
            let result;

            if (this.dataThumbnailImage) {
                result = new Promise((resolve, reject) => {
                    this.getResponsiveImage()
                        .then(() => resolve(Object.assign({}, this.selector)))
                        .catch((error) => {
                            helper.loadImage(this.dataThumbnailImage).then((imageData) => {
                                this.selector.size = imageData.size;
                                resolve(Object.assign({}, this.selector));
                            }).catch((error) => {
                                reject(error);
                            });
                        });
                });
            } else if (this.video) { // because proportions of video is not the same as video thumbnail proportions
                result = this.getNonSirvVideoThumbnail();
            } else {
                result = this.getSlideSize();
            }

            return result;
        }

        getSelectorReferrerPolicy() {
            const baseReferrerPolicy = 'no-referrer-when-downgrade';

            if (this.selector.isCustom) {
                if (this.selector.node.hasAttribute('data-referrerpolicy')) {
                    return this.selector.node.attr('data-referrerpolicy');
                }

                const listImg = Array.from(this.selector.node.node.children).filter((item) => { return $(item).tagName === 'img'; });
                if (listImg.length === 1) {
                    return $(listImg[0]).attr('referrerpolicy') || baseReferrerPolicy;
                }
            }

            return this.slideContent.attr('data-referrerpolicy') || this.slideContent.attr('referrerpolicy') || baseReferrerPolicy;
        }

        getResponsiveImage() {
            if (!this.customThumbnailImageClassPromise) {
                this.customThumbnailImageClassPromise = new Promise((resolve, reject) => {
                    const image = new ResponsiveImage(this.dataThumbnailImage);
                    image.loadInfo()
                        .then((info) => {
                            this.selector.isSirv = true;
                            this.selector.size = image.originSize;
                            resolve(image);
                        }).catch(reject);
                });
            }

            return this.customThumbnailImageClassPromise;
        }

        getSirvThumbnailForCustomSelector(data_) {
            return new Promise((resolve, reject) => {
                this.getResponsiveImage()
                    .then((rImageInstance) => {
                        const data = rImageInstance.getThumbnail(data_);
                        data.referrerpolicy = this.thumbnailReferrerPolicy;
                        resolve(data);
                    })
                    .catch(reject);
            });
        }

        getSelectorImgUrl(type, size, crop, watermark) {
            const data = { crop, watermark };
            if (size.width) { data.width = size.width; }
            if (size.height) { data.height = size.height; }

            const extend = (_data) => {
                if (_data.src) { this.selector.src = _data.src; }
                if (_data.srcset) { this.selector.srcset = _data.srcset; }

                let selectorData = Object.assign({}, _data);
                selectorData = Object.assign(selectorData, this.selector);

                return selectorData;
            };

            return new Promise((resolve, reject) => {
                const getNonSirvThumbnail = () => {
                    if (this.selector.isCustom && this.dataThumbnailImage) {
                        if (this.selector.isStatic) {
                            resolve(Object.assign({}, this.selector));
                        } else {
                            this.getSirvThumbnailForCustomSelector(data)
                                .then(_result => resolve(extend(_result)))
                                .catch(() => resolve(Object.assign({}, this.selector)));
                        }
                    } else if (this.slideContent.tagName === 'img' || this.multiImages.length) {
                        resolve(Object.assign({}, this.selector));
                    } else if (this.video) {
                        this.getNonSirvVideoThumbnail().then(resolve).catch(reject);
                    }

                    // if (this.slideContent.tagName === 'img' || this.multiImages.length || this.dataThumbnailImage) {
                    //     resolve(Object.assign({}, this.selector));
                    // } else if (this.video) {
                    //     this.getNonSirvVideoThumbnail().then(resolve).catch(reject);
                    // }
                };

                if (this.sirv) {
                    this.sirvService.getInfoSize().then((infoSize) => {
                        if (this.selector.isCustom) {
                            if (this.selector.isStatic) {
                                resolve(Object.assign({}, this.selector));
                            } else {
                                this.getSirvThumbnailForCustomSelector(data)
                                    .then(result => resolve(extend(result)))
                                    .catch(() => resolve(Object.assign({}, this.selector)));
                            }
                        } else {
                            this.sirvService.getSelectorImgUrl(data).then((result) => {
                                result.referrerpolicy = this.thumbnailReferrerPolicy;
                                resolve(extend(result));
                            }).catch(reject);
                        }
                    }).catch(() => {
                        if (this.selector.isCustom) {
                            getNonSirvThumbnail();
                        } else {
                            reject();
                        }
                    });
                } else {
                    getNonSirvThumbnail()
                }
            });
        }

        getNonSirvVideoThumbnail() {
            if (!this.getVideoThumbnailPromise) {
                this.getVideoThumbnailPromise = new Promise((resolve, reject) => {
                    helper.videoModule.getImageSrc(this.slideContent, true).then((data) => {
                        if (!this.selector.isCustom) {
                            this.selector.src = data.thumbnail.url;
                            this.selector.size = {
                                width: data.thumbnail.width,
                                height: data.thumbnail.height
                            };
                        }

                        resolve(Object.assign({}, this.selector));
                    }).catch((err) => {
                        if (!err || err === true) {
                            err = { UUID: this.$J_UUID };
                        } else {
                            err.UUID = this.$J_UUID;
                        }
                        reject(err);
                    });
                });
            }

            return this.getVideoThumbnailPromise;
        }

        get spinInited() {
            return this.spinWasInited;
        }

        get slideReady() {
            return this.isReady;
        }

        get selectorData() {
            if (this.dataHiddenSelector) { return null; }

            if (!this.selector.node) {
                this.selector.node = $J.$new(SELECTOR_TAG);
                this.selector.node.addClass(SELECTOR_CLASS);
            }

            if (this.dataThumbnailImage) {
                const typeOfSlide = this.typeOfSlide;

                if (typeOfSlide !== null) {
                    this.selector.node.attr('data-type', globalVariables.SLIDE.NAMES[typeOfSlide]);
                }

                this.selector.src = this.dataThumbnailImage;

                if (!this.selector.isStatic) {
                    this.selector.infoPromise = new Promise((resolve) => {
                        this.getResponsiveImage()
                            .catch((err) => {})
                            .finally(() => {
                                resolve(this.selector.isSirv, this.selector.size);
                            });
                    });
                }
            } else if (this.dataThumbnailHtml) {
                const tmp = $J.$new('div');
                tmp.node.innerHTML = this.dataThumbnailHtml;
                this.selector.selectorContent = tmp.node.firstChild;
                this.selector.node.attr('data-type', 'html');
            } else if (this.selector.isCustom) {
                this.selector.node.attr('data-type', 'html');
                this.selector.selectorContent = this.selector.node;
            } else {
                if (this.sirv) {
                    const t = this.typeOfSlide;
                    this.selector.node.attr('data-type', globalVariables.SLIDE.NAMES[t]);
                    if (t === globalVariables.SLIDE.TYPES.SPIN && this.sirvService.isThumbnailGif()) {
                        this.selector.node.addClass('spin-thumbnail-gif');
                    }
                } else {
                    const data = findSomethingForSelector(this.slideContent.node);

                    if (['youtube', 'vimeo', 'video'].includes(data.type)) {
                        this.selector.node.attr('data-type', data.type);
                    } else if (data.type === 'img') {
                        this.selector.src = data.data;
                    } else {
                        this.selector.selectorContent = data.data;
                        this.selector.node.attr('data-type', 'html');
                    }
                }
            }

            if (this.selector.isCustom) {
                this.selector.node.addClass(CSS_MAIN_CLASS + '-custom-thumbnail');
            }

            this.selector.disabled = !this._enabled;

            return this.selector;
        }

        get UUID() {
            return this.$J_UUID;
        }

        get slideActive() {
            return this.isActive;
        }

        playVideo() {
            if (this.isActive && this.inView && this.video && (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || [globalVariables.SLIDE_SHOWN_BY.AUTOPLAY, globalVariables.SLIDE_SHOWN_BY.USER, globalVariables.SLIDE_SHOWN_BY.INIT].includes(this.slideShownBy))) {
                this.video.play();
            }
        }

        initVideo() {
            this.on('slideVideoReady', (e) => {
                e.stop();

                if (!this.isVideoReady) {
                    this.isVideoReady = true;
                    this.isReady = true;
                    this.video.show();
                    this.componentLoader.hide();
                }

                if (this.video.autoplay || !this.video.preStart) {
                    this.playVideo();
                }
            });

            this.on('slideVideoPlay', (e) => {
                // e.stop();
                e.data.slide = this.api;

                if (this.isVideoPaused && !this.video.autoplay) {
                    this.video.pause();
                }

                this.isVideoPaused = false;
            });

            this.on('slideVideoPause', (e) => {
                // e.stop();
                e.data.slide = this.api;
            });

            this.on('slideVideoEnd', (e) => {
                // e.stop();
                e.data.slide = this.api;
            });

            const videoOptions = this._options.video;

            switch (helper.videoModule.getType(this.slideContent)) {
                case 'youtube':
                    this.video = new slideVideo.YouTubeVideo(this.slideContent, videoOptions);
                    break;
                case 'vimeo':
                    this.video = new slideVideo.VimeoVideo(this.slideContent, videoOptions);
                    break;
                case 'video':
                    this.video = new slideVideo.HTMLVideo(this.slideContent, videoOptions);
                    break;
                default:
                    // empty
            }

            this.video.parentClass = this;
        }

        resize() {
            if (!this._enabled) { return; }
            if (this.sirvService) {
                this.sirvService.resize();

                const t = globalVariables.SLIDE.TYPES;
                if (this.isReady && [t.SPIN, t.ZOOM].includes(this.typeOfSlide)) {
                    if (this.sirvService.isZoomSizeExist()) {
                        this.contentWrapper.addClass(CAN_ZOOM_CLASS);
                    } else {
                        this.contentWrapper.removeClass(CAN_ZOOM_CLASS);
                    }
                }
            } else {
                // when video leaves viewport and then appears the browser generates resize event on android
                // if (this.video) {
                //     this.video.pause();
                // }
            }
        }

        destroy() {
            if (this.sirvService) {
                this.sirvService.destroy();
                this.sirvService = null;
                this.off('stats');
                this.off('componentEvent');
            } else if (this.multiImages.length) {
                this.multiImages.forEach((img) => {
                    if (!img.src && img.datasrc) {
                        img.node.removeAttribute('src');
                    }
                });
            }

            this.slideContent.del('view-content');

            this.removeEventCloseFullscreeByClick();
            this.sendEventCloseFullscreenByClick = null;

            if (this.lastOriginNode) {
                this.slideContent.remove();
                this.slideContent = this.lastOriginNode;
                this.lastOriginNode = null;
            }

            if (this.fullscreenOnlyNode) {
                this.fullscreenOnlyNode.kill();
                this.fullscreenOnlyNode = null;
            }

            this.off('beforeFullscreenIn');
            this.off('afterFullscreenIn');
            this.off('beforeFullscreenOut');
            this.off('afterFullscreenOut');
            this.off('inView');

            if (this.video) {
                this.off('slideVideoReady');
                this.off('slideVideoPlay');
                this.off('slideVideoPause');
                this.off('slideVideoEnd');

                this.video.destroy();
            }
            this.video = null;

            if (this.componentLoader) {
                this.componentLoader.destroy();
                this.componentLoader = null;
            }

            if (this.socialbuttons) {
                this.socialbuttons.destroy();
            }

            this.sizePromise = null;

            this.componentSize = null;
            this.contentWrapper.remove();
            this.contentWrapper = null;
            this.instanceNode.remove();
            this.instanceNode = null;
            this.slideContent = null;
            this.isReady = false;
            this.availableSlide = null;

            super.destroy();
        }
    }

    return Slide_;
})();

/* eslint-env es6 */
/* global $, $J, Slide, Selectors, Arrows, Effect, CSS_MAIN_CLASS, SELECTOR_TAG, EventEmitter, ContextMenu, helper, globalVariables, remoteModules, ProductDetail*/
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

let isHandset = null;
// DIV used to correctly measure viewport height in Safari > 10 on iPhone
let iPhoneSafariViewportRuler = null;

const SirvSlider = (() => {
    const FULLSCREEN = 'fullscreen';
    const _FULLSCREEN = $J.camelize('-' + FULLSCREEN);
    const STANDARD_BUTTON_CLASS = CSS_MAIN_CLASS + '-button-' + FULLSCREEN + '-open';
    const FULLSCREEN_BUTTON_CLASS = CSS_MAIN_CLASS + '-button-' + FULLSCREEN + '-close';
    const FULLSCREEN_BUTTON_HIDE_CLASS = CSS_MAIN_CLASS + '-button-hidden';
    // const SIZE_MESSAGE = 'can\'t get size';
    const PSEUDO_FULLSCREEN_CLASS = CSS_MAIN_CLASS + '-pseudo-' + FULLSCREEN;
    const STANDARD_CSS = { width: '100%', height: '100%' };
    const MIN_AUTOPLAY = 1000;
    const MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR = 8;

    const isCustomId = (id) => {
        let result = false;

        id = id.split('-');
        id.splice(id.length - 1, 1);
        id = id.join('-');

        if (id === CSS_MAIN_CLASS) {
            result = true;
        }

        return result;
    };

    const getThumbnailsType = (type) => {
        let result = 'thumbnails';

        if (type === 'bullets') {
            result = type;
        }

        return result;
    };

    // const getSelectorsSide = (position) => {
    //     let result = null;

    //     switch (position) {
    //         case 'left':
    //         case 'right':
    //             result = 'width';
    //             break;
    //         case 'top':
    //         case 'bottom':
    //             result = 'height';
    //             break;
    //         // no default
    //     }

    const slidePinnedFilter = (rawSlides) => {
        const slides = [];
        let pinnedAtTheEnd = 0;
        let pinnedAtTheStart = 0;

        for (let indexSlide = 0, l = rawSlides.length; indexSlide < l; indexSlide++) {
            let currentNode = rawSlides[indexSlide];

            if (currentNode.querySelector(SELECTOR_TAG)) {
                currentNode = currentNode.querySelector(SELECTOR_TAG);
            }

            const dataPinned = $J.$(currentNode).attr('data-pinned');
            const pinnedAttr = currentNode.hasAttribute('data-pinned');

            if ((pinnedAtTheStart >= 3 && dataPinned === 'start') || (pinnedAtTheEnd >= 3 && ((pinnedAttr && dataPinned && (dataPinned === 'end' ||
                dataPinned !== 'end' && dataPinned !== 'start')) || (pinnedAttr && !dataPinned)))) {
                // eslint-disable-next-line
                continue;
            }

            if (pinnedAtTheStart < 3 && dataPinned === 'start') {
                pinnedAtTheStart++;
            }

            if (pinnedAtTheEnd < 3 && (pinnedAttr && dataPinned && (dataPinned === 'end' || dataPinned !== 'end' && dataPinned !== 'start')) || (pinnedAttr && !dataPinned)) {
                pinnedAtTheEnd++;
            }

            slides.push(rawSlides[indexSlide]);
        }

        return slides;
    };

    class Slider extends EventEmitter {
        constructor(node, options) {
            super();
            this.instanceNode = $(node);
            this.instanceOptions = options.options;
            this.viewerFileContent = options.viewerFileContent;

            this.option = (...args) => {
                if (args.length > 1) {
                    return this.instanceOptions.set(args[0], args[1]);
                }
                return this.instanceOptions.get(args[0]);
            };

            this.slideOptions = Object.assign(options.slideOptions, {
                quality: this.instanceOptions.isset('quality') ? this.option('quality') : null,
                hdQuality: this.option('hdQuality'),
                isHDQualitySet: this.instanceOptions.isset('hdQuality'),
                fullscreenOnly: this.option(FULLSCREEN + '.always'),
                isFullscreen: this.option(FULLSCREEN + '.enable'),
                nativeFullscreen: this.option(FULLSCREEN + '.native'),

                sbEnable: this.option('slide.socialbuttons.enable'),
                sbFacebook: this.option('slide.socialbuttons.types.facebook'),
                sbTwitter: this.option('slide.socialbuttons.types.twitter'),
                sbLinkedin: this.option('slide.socialbuttons.types.linkedin'),
                sbReddit: this.option('slide.socialbuttons.types.reddit'),
                sbTumblr: this.option('slide.socialbuttons.types.tumblr'),
                sbPinterest: this.option('slide.socialbuttons.types.pinterest'),
                sbTelegram: this.option('slide.socialbuttons.types.telegram')
            });

            this.id = this.instanceNode.attr('id');

            if (!this.id) {
                this.id = CSS_MAIN_CLASS + '-' + helper.generateUUID();
                this.instanceNode.attr('id', this.id);
            }

            this.lazyInit = options.lazyInit;

            this.movingContainer = $J.$new('div').addClass(CSS_MAIN_CLASS);
            this.slideWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slides-box');
            this.slidesContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slides');
            this.selectorsWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-box');
            this.fullScreenBox = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + FULLSCREEN + '-box');
            this.controlsWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-controls');

            this.producDetailsText = this.instanceNode.attr('data-product-detail');
            this.productDetail = null;

            this.fullScreenBox.addEvent(['mousescroll', 'touchstart'], (e) => { e.stopDistribution(); });

            this.isReady = false;
            this.isMoving = false;
            this.isSelectorsReady = false;
            this.isToolStarted = false;
            this.isInitialized = false;
            this.isStartedFullInit = false;
            this.inViewModule = null;
            this.isInView = false;
            this.firstSlideAhead = false;
            this.rootMargin = 0;

            this.fullscreenButton = null;
            this.doSetSize = false;
            this.heightProportion = null;
            this.slides = [];
            this.enabledIndexesOfSlides = [];
            this.selectors = null;
            this.arrows = null;
            this.contextMenu = null;
            this.countOfSizes = $([]);
            this.isFullscreen = globalVariables.FULLSCREEN.CLOSED;
            this.fullscreenStartTime = null;
            this.index = 0;
            this.movingContainerId = CSS_MAIN_CLASS + '-' + helper.generateUUID();
            this.cssRulesId = 'sirv_css_rules-' + helper.generateUUID();
            this.isComponentPinching = false;
            this.isZoomIn = false;
            this.hasSize = false;
            this.isPseudo = false;
            this.doHistory = true;
            this.isAutoplay = this.option('slide.autoplay');
            this.autoplayDelay = this.option('slide.delay');
            this.residualAutoplayTime = this.autoplayDelay;
            this.sliderNodes = [];
            this.destroyed = false;
            this.autoplayTimer = null;
            this.timerRemove = null;

            this.onResizeDebounce = helper.debounce(() => { this.onResizeWithoutSelectors(); }, 16);
            this.selectorsDebounce = null;

            if (this.doHistory) {
                this.fullscreenViewId = Math.floor(Math.random() * (+new Date()));
                globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.push(this.fullscreenViewId);
            }

            this.controlsWrapperWasAppended = false;
            this.isStandardGrid = false;
            this.isFullscreenGrid = false;


            // conflict with pinch event make us to inject the timer
            // this.touchDragTimer = null;

            this.clearingTouchdragFunction = null;
            this.classes = {
                standard: {
                    movingContainerClasses: $([]),
                    selectorsWrapperClasses: $([])
                },

                fullscreen: {
                    movingContainerClasses: $([]),
                    selectorsWrapperClasses: $([])
                }
            };

            this.externalContainer = null;

            if ($J.browser.mobile) {
                this.movingContainer.addClass(CSS_MAIN_CLASS + '-mobile');
            }

            this.onResizeHandler = this.onResize.bind(this);

            this.pseudoFSEvent = (e) => {
                if (e.oe.keyCode === 27) { // Esc
                    $($J.D).removeEvent('keydown', this.pseudoFSEvent);
                    this.exitFullScreen();
                }
            };

            this.keyBoardArrowsCallback = (e) => {
                let d;
                const kc = e.oe.keyCode;

                if (this.isReady) {
                    if ([37, 39].includes(kc)) {
                        e.stop();

                        d = (kc === 37) ? 'prev' : 'next';

                        this.jump(d, 2);
                    }
                }
            };

            this.onHistoryStateChange = (e) => {
                try {
                    if (e.oe.state && e.oe.state.name === 'Sirv.viewer') {
                        if (globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(e.oe.state.hash) < 0) {
                            globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.splice(globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(this.fullscreenViewId), 1);
                            this.fullscreenViewId = e.oe.state.hash;
                            globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.push(this.fullscreenViewId);
                        }

                        if (e.oe.state.hash === this.fullscreenViewId) {
                            this.enterFullScreen();
                        }
                    } else {
                        if (this.isFullscreenState()) {
                            this.exitFullScreen();
                        }
                    }
                } catch (ex) {
                    // empty
                }
            };

            const parsedSlides = this.getSlides();

            this.addComponentsCSS = helper.debounce(() => { globalFunctions.rootDOM.addCSSStringToHtml(); }, 100);
            globalFunctions.rootDOM.addCSSStringToHtml();
            globalFunctions.rootDOM.addCSSString(this.instanceNode.node);
            this.setComponentsEvents();
            this.createSlides(parsedSlides);

            if ($J.browser.ready || $J.D.node.readyState !== 'loading') {
                this.startFullInit();
            }

            if (ProductDetail && this.option('productdetail.enable') && this.producDetailsText) {
                this.createProductDetails();
            }
        }

        isFullscreenState() {
            return [globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED].includes(this.isFullscreen);
        }

        createProductDetails() {
            this.productDetail = new ProductDetail({
                text: this.producDetailsText,
                position: this.option('productdetail.position')
             }, this.movingContainer, this.fullScreenBox);
        }

        setRootMargin() {
            let value = parseInt(this.option('threshold'), 10);

            if ($J.typeOf(this.option('threshold')) === 'string') {
                const v = ($J.W.node.innerHeight || $J.D.node.documentElement.clientHeight) / 100 * value;
                value = v;
            }

            this.rootMargin = value;
        }

        startFullInit(options) { // the method must be launched after 'this.createSlides' method
            if (this.isStartedFullInit || !this.slides.length) { return; }
            this.isStartedFullInit = true;

            if (this.isHiddenSlides()) {
                return;
            }

            if (options) {
                this.instanceOptions = options.options;

                this.option = (...args) => {
                    if (args.length > 1) {
                        return this.instanceOptions.set(args[0], args[1]);
                    }
                    return this.instanceOptions.get(args[0]);
                };

                this.slideOptions = Object.assign(options.slideOptions, {
                    fullscreenOnly: this.option(FULLSCREEN + '.always'),
                    autoplay: this.option('video.autoplay')
                });

                this.lazyInit = options.lazyInit;
                this.isAutoplay = this.option('slide.autoplay');
                this.autoplayDelay = this.option('slide.delay');
                this.residualAutoplayTime = this.autoplayDelay;
            }

            if (this.option(FULLSCREEN + '.always')) {
                this.movingContainer.addClass(CSS_MAIN_CLASS + '-fullsreen-always');
            }

            if (isHandset === null) {
                isHandset = ($J.browser.mobile && window.matchMedia && window.matchMedia('(max-device-width: 767px), (max-device-height: 767px)').matches);
            }

            // Create a ruler div to properly handle viewport height in Safari (>10) on iPhone with and without address bar, bookmark bar and status bar.
            // if (isHandset && $J.browser.platform === 'ios' && $J.browser.uaName === 'safari' && parseInt($J.browser.uaVersion, 10) > 10) {
            if (isHandset && $J.browser.platform === 'ios') {
                iPhoneSafariViewportRuler = $J.$new('div').setCss({ position: 'fixed', top: 0, width: 0, height: '100vh' });
            }

            this.normalizeOptions();

            this.setRootMargin();

            this.slideWrapper.addClass(CSS_MAIN_CLASS + '-' + (this.option('orientation') === 'horizontal' ? 'h' : 'v'));

            this.index = this.option('slide.first');

            const l = this.slides.length;

            if (this.index > l - 1) {
                this.index = 0;
            }

            if (l > 0 && (!this.slides[this.index].enabled || !this.slides[this.index].slideAvailable)) {
                let index = null;
                for (let i = 0; i < l; i++) {
                    const tmpIndex = helper.sliderLib.findIndex('next', this.index + i, l, true);
                    if (this.slides[tmpIndex].enabled && this.slides[tmpIndex].slideAvailable) {
                        index = tmpIndex;
                        break;
                    }
                }

                if (index === null) {
                    // eslint-disable-next-line no-console
                    console.warn('Sirv Media Viewer: All items are disabled.', this.instanceNode.node);
                    this.emit('destroy', { data: { id: this.id, node: this.instanceNode.node } });
                    return;
                }

                this.index = index;
            }

            this.createContextMenu();

            this.setInViewAction();

            if (this.option('thumbnails.enable') && this.option('thumbnails.target')) {
                this.externalContainer = $($J.D.node.querySelector(this.option('thumbnails.target')));
                if (!this.externalContainer) {
                    this.externalContainer = null;
                }
            }

            const fragment = $J.D.node.createDocumentFragment();
            fragment.appendChild(this.movingContainer.node);
            this.movingContainer.setCss(STANDARD_CSS);
            this.movingContainer.setCssProp('font-size', 0);

            this.movingContainer.append(this.slideWrapper);
            // this.slideWrapper.setCss(STANDARD_CSS);

            this.slides.forEach((slide) => { slide.startFullInit(options ? this.slideOptions : null); });

            this.appendSelectors(true);
            this.createClasses();
            this.setClasses();

            // css takes too long time to loading
            // and we have size because display = block by default
            // if selectors wrapper is vertical orientation
            // this.selectorsWrapper.setCssProp('display', 'inline-block');

            this.instanceNode.append(fragment);
            this.instanceNode.setCssProp('font-size', 0);

            this.slideWrapper.append(this.slidesContainer);
            this.slidesContainer.setCss(STANDARD_CSS);

            this.instanceNode.render();
            this.movingContainer.render();
            this.selectorsWrapper.render();
            this.slideWrapper.render();

            const containerHasHeight = this.instanceNode.size.height > 0;

            this.createSelectors();

            if (this.selectors && this.isStandardGrid) {
                this.selectorsWrapper.setCss({
                    flexBasis: this.option('thumbnails.size') + 'px'
                });
            }

            let steps = 10;
            const getSize = () => {
                if (this.destroyed) { return; }

                let size = this.slidesContainer.node.getBoundingClientRect();

                if (!size.height) {
                    size = this.slideWrapper.node.getBoundingClientRect();
                }

                steps -= 1;

                if (steps > 0 && ((!size.width && !size.height) || containerHasHeight && !size.height)) {
                    setTimeout(getSize, 16);
                } else {
                    this.instanceNode.setCssProp('font-size', '');

                    if (size.width) {
                        // size.height / size.width < 0.25 - fix for ie and firefox
                        // if (!size.height || size.height / size.width < 0.25) {
                        if (!size.height) {
                            this.doSetSize = true;
                        }
                    } else {
                        // Fix for display none
                        this.doSetSize = true;
                    }

                    this.slides.forEach((slide) => {
                        if (slide.slideAvailable) {
                            this.slidesContainer.append(slide.node);
                        }

                        slide.appendToDOM();
                        // all elements must be in dom
                        slide.initVideoPlayer();
                    });

                    this.setClasses();
                    this.searchingOfProportions();
                    if (this.selectors) { this.selectors.init(); }
                    this.postInitialization();
                }
            };

            if (this.firstSlideAhead) { // if autostart is false
                this.broadcast('inView', { data: this.isInView });
            }

            setTimeout(getSize, 16);
        }

        visibleSlides() {
            return this.slides.filter(slide => slide.slideAvailable && slide.enabled).length;
        }

        searchingOfProportions() {
            const l = this.slides.length;

            const initOtherComponents = () => {
                const i = this.index;
                const p = this.firstSlideAhead ? false : this.option('slide.preload');

                this.hasSize = this.setContainerSize();

                if (this.inViewModule && ['edge', 'ie'].includes($J.browser.uaName)) {
                    this.inViewModule.takeRecords();
                }

                this.slides.forEach((_slide, index) => { _slide.startTool(i === index, p, this.firstSlideAhead); });

                this.createEffect();

                this.isToolStarted = true;

                this.checkSingleSlide();

                this.slides[this.index].beforeShow();
                this.slides[this.index].afterShow(globalVariables.SLIDE_SHOWN_BY.INIT);

                this.postInitialization();
            };

            const getSlideSize = (index, indexes) => {
                return new Promise((resolve, reject) => {
                    const slide = this.slides[index];
                    const slidesCount = this.slides.length;
                    indexes.push(index);

                    if (slide) {
                        const nextSearching = () => {
                            let nextIndex = helper.getArrayIndex(index + 1, l);

                            if (slidesCount !== this.slides.length && nextIndex > index) {
                                nextIndex = index;
                            }

                            if (indexes.includes(nextIndex)) {
                                const tmp = this.slidesContainer.size;

                                if (!tmp.width) {
                                    tmp.width = 500; // we don'n have any size
                                }

                                if (!tmp.height) {
                                    // it can be video without sizes or html, but we have width
                                    tmp.height = tmp.width * 0.5625; // (9/16)
                                }

                                this.heightProportion = tmp;
                                resolve();
                            } else {
                                getSlideSize(nextIndex, indexes).then(resolve);
                            }
                        };

                        slide.getSlideSize()
                            .then((data) => {
                                const size = data.size;

                                if (size && size.width && size.height) {
                                    this.heightProportion = size;
                                    resolve();
                                } else {
                                    nextSearching();
                                }
                            })
                            .catch((err) => {
                                let _l = this.slides.length;

                                if (err && err.error && err.error.status === 404) {
                                    _l -= 1;
                                    this.pickOut(err.UUID);
                                }

                                if (_l > 0) {
                                    nextSearching();
                                } else {
                                    reject();
                                }
                            });
                    }
                });
            };

            if (this.doSetSize) {
                getSlideSize(this.index, []).then(() => {
                    initOtherComponents();
                }).catch(() => {});
            } else {
                initOtherComponents();
            }
        }

        initTouchDrag() {
            let axises = ['x', 'left', 'width'];
            let otherAxise = 'y';
            let containerPosition;
            let isMoving = false;
            let startPosition;
            let lastPercent;
            let size;

            let firstSlide = null;
            let middleSlide = null;
            let lastSlide = null;

            const loop = this.option('loop');

            let lastDirection = null;
            let lastPosition = null;

            let makeAnimation = true;
            let isChanging = true;
            let nextSlide = null;
            let useless = null;
            let stateOfScroll = 0; // 0 - nothing, 1 - drag slide, 2 - scroll page

            let lastXY = { x: null, y: null };
            let lastAnimation = false;

            const getSlidePercent = (value) => {
                return (value / size) * 100;
            };

            const getStyleValue = (value) => {
                const pos = { x: 0, y: 0 };

                pos[axises[0]] = value;

                return 'translate3d(' + pos.x + '%, ' + pos.y + '%, 0px)';
            };

            const setCss = (node, value) => {
                if (node) {
                    node.node.setCssProp('transform', getStyleValue(value));
                }
            };

            const setSlidesCss = (value) => {
                setCss(firstSlide, value - 100);
                setCss(middleSlide, value);
                setCss(lastSlide, value + 100);
            };

            const endOfEffect = (direction) => {
                return new Promise((resolve, reject) => {
                    let tmp;
                    let currentSlidePosition = 100;
                    let nextSlidePosition = 0;
                    const abs = Math.abs(lastPercent);

                    if (abs < 25 || stateOfScroll === 2 || direction === 'next' && lastPercent < 0 || direction === 'prev' && lastPercent > 0) {
                        isChanging = false;
                    }

                    if (!isChanging) {
                        if (lastPercent < 0) {
                            direction = 'prev';
                        } else {
                            direction = 'next';
                        }
                    }

                    nextSlide = (direction === 'next') ? firstSlide : lastSlide;
                    useless = (direction === 'next') ? lastSlide : firstSlide;

                    if (direction !== 'next') {
                        currentSlidePosition *= (-1);
                    }

                    if (useless) {
                        useless.node.setCssProp('transform', '');
                        useless.afterHide();
                    }

                    if (isChanging) {
                        middleSlide.beforeHide();

                        this.sendEvent('beforeSlideIn', { slide: nextSlide.api });
                        this.sendEvent('beforeSlideOut', { slide: middleSlide.api });

                        this.index = nextSlide.index;
                    } else {
                        tmp = currentSlidePosition;
                        currentSlidePosition = nextSlidePosition;
                        nextSlidePosition = tmp;
                        nextSlidePosition *= (-1);

                        if (abs < 2) {
                            makeAnimation = false;
                        }
                    }

                    if (makeAnimation) {
                        middleSlide.node.addEvent('transitionend', (e) => {
                            e.stop();
                            resolve();
                        });

                        if (nextSlide) {
                            nextSlide.node.setCssProp('transition', 'transform, .3s');
                        }
                        middleSlide.node.setCssProp('transition', 'transform, .3s');

                        // eslint-disable-next-line no-unused-vars
                        let s;
                        if (nextSlide) {
                            s = nextSlide.node.size;
                        }

                        s = middleSlide.node.size;

                        if (this.selectors) {
                            this.selectors.activateItem(this.index);
                            this.selectors.jump(this.index);
                        }
                    }

                    if (nextSlide) {
                        setCss(nextSlide, nextSlidePosition);
                    }
                    setCss(middleSlide, currentSlidePosition);

                    if (!makeAnimation) {
                        resolve();
                    }
                });
            };

            const fullClear = () => {
                if (isMoving) {
                    const css = { 'transform': '', 'transition': '' };
                    middleSlide.node.removeEvent('transitionend');

                    if (nextSlide) {
                        if (isChanging) {
                            this.checkLoop(this.index);
                            nextSlide.afterShow(globalVariables.SLIDE_SHOWN_BY.USER);
                            middleSlide.afterHide();
                            this.sendEvent('afterSlideIn', { slide: nextSlide.api });
                            this.sendEvent('afterSlideOut', { slide: middleSlide.api });
                        } else {
                            if (nextSlide) {
                                nextSlide.afterHide();
                            }
                        }

                        if (nextSlide) {
                            nextSlide.node.setCss(css);
                        }
                    }

                    middleSlide.node.setCss(css);

                    makeAnimation = true;
                    isChanging = true;
                    nextSlide = null;
                    useless = null;

                    this.enableFullscreenButton();
                    this.autoplay();
                    isMoving = false;
                    this.isMoving = false;

                    lastDirection = null;
                    lastPosition = null;

                    firstSlide = null;
                    middleSlide = null;
                    lastSlide = null;
                    lastAnimation = false;
                }
            };

            const getNextSlide = (direction, fromIndex) => {
                let result = null;
                let currentIndex = fromIndex;

                if (currentIndex === $J.U) {
                    currentIndex = this.index;
                }

                const index = this.getNextIndex(direction, currentIndex, this.slides.length, loop);

                if (index !== null) {
                    const slide = this.slides[index];

                    if (slide.index !== this.index) {
                        if (!slide.enabled) {
                            result = getNextSlide(direction, slide.index);
                        } else {
                            result = slide;
                        }
                    }
                }

                return result;
            };

            const start = (e) => {
                if (lastAnimation) { return; }
                fullClear();
                this.effect.stop();
                if (this.index === null) { return; }

                middleSlide = this.slides[this.index];

                if (middleSlide.isSwipeDisabled()) { return; }

                isMoving = true;
                this.isMoving = true;

                containerPosition = this.slidesContainer.position[axises[1]];
                size = this.slidesContainer.size[axises[2]];
                lastPosition = e[axises[0]] - containerPosition;
                startPosition = getSlidePercent(lastPosition);
                lastPercent = startPosition;

                // const l = this.slides.length;
                // firstSlide = this.slides[helper.sliderLib.getIndexFromDirection(this.index, 'prev', l, loop)];
                // lastSlide = this.slides[helper.sliderLib.getIndexFromDirection(this.index, 'next', l, loop)];
                firstSlide = getNextSlide('prev');
                lastSlide = getNextSlide('next');

                if (firstSlide && lastSlide) {
                    if (firstSlide.index === lastSlide.index) {
                        if (firstSlide.index < middleSlide.index) {
                            lastSlide = null;
                        } else {
                            firstSlide = null;
                        }
                    } else if (firstSlide.index === middleSlide.index || middleSlide.index === lastSlide.index) {
                        if (firstSlide.index === middleSlide.index) {
                            firstSlide = null;
                        } else {
                            lastSlide = null;
                        }
                    }
                }

                if (firstSlide) {
                    setCss(firstSlide, -100);
                    firstSlide.beforeShow();
                }

                if (lastSlide) {
                    setCss(lastSlide, 100);
                    lastSlide.beforeShow();
                }

                this.disableFullscreenButton();
            };

            const move = (e) => {
                let direction;
                let current;

                if (isMoving && !lastAnimation) {
                    isMoving = true;

                    e.stop();

                    current = e[axises[0]] - containerPosition;

                    if (current < lastPosition) {
                        direction = 'prev';
                    } else if (current > lastPosition) {
                        direction = 'next';
                    } else {
                        if (!direction) {
                            direction = lastPercent > 0 ? 'next' : 'prev';
                        }
                    }

                    lastPosition = current;
                    lastDirection = direction;

                    lastPercent = getSlidePercent(lastPosition) - startPosition;

                    if (!lastSlide && lastPercent < -10) {
                        lastPercent = -10;
                    }

                    if (!firstSlide && lastPercent > 10) {
                        lastPercent = 10;
                    }

                    setSlidesCss(lastPercent);
                }
            };

            const end = (e) => {
                if (isMoving && !lastAnimation) {
                    if (stateOfScroll === 1) {
                        e.stop();
                    }

                    middleSlide.dragEvent(e.state);

                    lastAnimation = true;
                    endOfEffect(lastDirection).finally(() => {
                        lastAnimation = false;
                        fullClear();
                    });
                }
            };

            const onDrag = (e) => {
                if (this.isComponentPinching || this.isZoomIn || this.slides[this.index].blokedTouchdrag || this.option(FULLSCREEN + '.always') && this.isFullscreen !== globalVariables.FULLSCREEN.OPENED) { return; }
                if (e.state === 'dragstart') {
                    // clearTimeout(this.touchDragTimer);
                    lastXY = { x: e.x, y: e.y };
                    // this.touchDragTimer = setTimeout(() => {
                        start(e);
                        middleSlide.dragEvent(e.state);
                    // }, 16);
                } else if (e.state === 'dragmove') {
                    if (!stateOfScroll) {
                        if (Math.abs(lastXY[axises[0]] - e[axises[0]]) > Math.abs(lastXY[otherAxise] - e[otherAxise])) {
                            stateOfScroll = 1;
                        } else {
                            stateOfScroll = 2;
                        }
                    }

                    if (stateOfScroll === 1) {
                        move(e);
                    }

                    lastXY = { x: e.x, y: e.y };
                } else if (e.state === 'dragend') {
                    // clearTimeout(this.touchDragTimer);
                    // this.touchDragTimer = null;
                    end(e);
                    stateOfScroll = 0;
                    lastXY = { x: null, y: null };
                }
            };

            if (this.option('orientation') === 'vertical') { axises = ['y', 'top', 'height']; otherAxise = 'x'; }

            this.clearingTouchdragFunction = fullClear;

            this.slidesContainer.addEvent('touchdrag', onDrag);
            // this.slidesContainer.addEvent(['mousedrag', 'touchdrag'], onDrag);
        }

        appendSelectors(start) {
            let container = this.movingContainer;

            if (this.externalContainer) {
                if (!this.isFullscreenState()) {
                    container = this.externalContainer;
                    this.selectorsWrapper.addClass(CSS_MAIN_CLASS + '-external');
                } else {
                    this.selectorsWrapper.removeClass(CSS_MAIN_CLASS + '-external');
                }
            }

            if (start || this.externalContainer) {
                container.append(this.selectorsWrapper);
            }
        }

        createClasses() {
            const option = this.option;

            const getOrientation = (value) => {
                if (['left', 'right'].includes(value)) {
                    return 'v';
                }

                return 'h';
            };

            ['standard', 'fullscreen'].forEach((_type) => {
                const isStandard = _type === 'standard';
                const en = isStandard ? option('thumbnails.enable') : option('fullscreen.thumbnails.enable');
                const s = isStandard ? option('thumbnails.position') : option('fullscreen.thumbnails.position');
                const ss = getThumbnailsType(isStandard ? option('thumbnails.type') : option('fullscreen.thumbnails.type'));
                const grid = isStandard ? this.isStandardGrid : this.isFullscreenGrid;

                if (en) {
                    if (!isStandard || !this.externalContainer) {
                        this.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-selectors-' + s);
                    }

                    this.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-' + ss);
                    this.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-' + getOrientation(s));

                    if (grid) {
                        this.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-grid');
                    }

                    if (option('fullscreen.thumbnails.autohide') && !isStandard) {
                        this.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-autohide');
                        this.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-selectors-closed');
                    }
                }
            });
        }

        changeClasses(obj, remove) {
            const action = remove ? 'removeClass' : 'addClass';

            obj.movingContainerClasses.forEach((className) => {
                this.movingContainer[action](className);
            });

            obj.selectorsWrapperClasses.forEach((className) => {
                this.selectorsWrapper[action](className);
            });
        }

        setClasses() {
            if (this.isFullscreenState()) {
                this.changeClasses(this.classes.standard, true);
                this.changeClasses(this.classes.fullscreen);
            } else {
                this.changeClasses(this.classes.fullscreen, true);
                this.changeClasses(this.classes.standard);
            }
        }

        setInViewAction() {
            if (this.option('autostart') === 'visible') {
                this.inViewModule = new helper.InViewModule((entries) => {
                    entries.forEach((entry) => {
                        const last = this.isInView;
                        // https://github.com/verlok/vanilla-lazyload/issues/293#issuecomment-469100338
                        // Sometimes 'intersectionRatio' can be 0 but 'isIntersecting' is true
                        let iv = entry.isIntersecting || entry.intersectionRatio > 0;
                        if (this.isFullscreenState() && !iv) { iv = true; }

                        if (last !== iv) {
                            this.isInView = iv;
                            this.postInitialization();
                            this.broadcast('inView', { data: iv });

                            if (this.isInView) {
                                this.autoplay();
                            } else {
                                this.pauseAutoplay();
                            }
                        }
                    });
                }, {
                    rootMargin: this.rootMargin + 'px 0px'
                });

                this.inViewModule.observe(this.instanceNode.node);
            } else {
                this.isInView = true;
            }
        }

        sendEvent(nameOfEvent, data) {
            /*
                slider events: [
                    'ready',
                    'beforeSlideIn',
                    'beforeSlideOut',
                    'afterSlideIn',
                    'afterSlideOut',
                    'fullscreenIn',
                    'fullscreenOut',
                    'enableItem',
                    'disableItem'
                ]
            */

            if (!data) { data = {}; }
            data.node = this.instanceNode;
            if (!data.slider) { data.slider = { type: nameOfEvent }; }

            this.emit('viewerPublicEvent', { data: data });
        }

        checkReadiness(eventName, component) {
            let result = false;

            if (['init', 'ready'].includes(eventName)) {
                if (component === 'viewer') {
                    if (eventName === 'ready') {
                        result = this.isReady;
                    }
                } else {
                    for (let i = 0, l = this.slides.length; i < l; i++) {
                        if (this.slides[i].checkReadiness(eventName, component)) {
                            result = true;
                            break;
                        }
                    }
                }
            }

            return result;
        }

        sendReadyEvent(eventName, component) {
            if (component === 'viewer') {
                this.sendEvent('ready');
            } else {
                this.slides.forEach((slide) => { slide.sendReadyEvent(eventName, component); });
            }
        }

        sendStats(typeOfEvent, data) {
            if (!data) { data = {}; }
            data.slider = this.id;

            if (typeOfEvent) {
                data.data = {};
                data.data.event = typeOfEvent;
            }

            let stats;
            let serverStats;

            switch (data.component) {
                case 'spin':
                    stats = {
                        account: data.account,
                        event: {
                            type: data.component,
                            name: data.event,
                            data: data.data || {},
                            sessionId: data.sessionId,
                            origin: data.origin
                        }
                    };

                    stats.event[data.event === 'sessionStart' ? 'ts' : 'time'] = data.eventTime;

                    serverStats = JSON.parse(JSON.stringify(stats));
                    serverStats.event = JSON.stringify(serverStats.event);
                    break;
                // no default
            }

            if (stats) {
                if (data.useBeacon === true) {
                    helper.sendRawStats(serverStats, true);
                } else {
                    setTimeout(() => {
                        helper.sendRawStats(serverStats);
                    }, 1);
                }

                this.sendEvent('sendStats', $J.detach(stats));
            }
        }

        setComponentsEvents() {
            // const size = this.slidesContainer.size;
            // const getProportionSize = (proportions) => {
            //     let i;
            //     let result = null;

            //     for (i = 0; i < proportions.length; i++) {
            //         if (proportions[i].size) {
            //             result = proportions[i].size;
            //             break;
            //         }
            //     }

            //     return result;
            // };

            const loadContent = (index) => {
                if (this.firstSlideAhead && index === this.index) {
                    const p = this.option('slide.preload');
                    this.enabledIndexesOfSlides.forEach((slideIndex) => {
                        this.slides[slideIndex].startGettingInfo();
                        if (p) {
                            this.slides[slideIndex].loadContent();
                        } else {
                            this.slides[slideIndex].loadThumbnail();
                        }
                    });
                }
            };

            const play = (index) => {
                if (this.index === index) {
                    this.autoplay();
                }
            };

            const pause = (index) => {
                if (this.index === index) {
                    this.pauseAutoplay();
                }
            };

            this.on('stats', (e) => {
                /*
                    e.data = {
                        event: 'rotate',  // name of event
                        data: {},         // event data
                        index: 0          // slide Index
                        component: 'spin' // type of component
                    }
                */
                e.stopAll();

                const doc = $J.D.node;
                const win = $J.W.node;
                const scrn = win.screen;

                if (e.data.event === 'sessionStart') {
                    if (!e.data.data) {
                        e.data.data = {};
                    }

                    e.data.data.screen = {
                        width: scrn.width,
                        height: scrn.height,
                        availWidth: scrn.availWidth,
                        availHeight: scrn.availHeight,
                        colorDepth: scrn.colorDepth,
                        pixelDepth: scrn.pixelDepth
                    };

                    e.data.data.browser = {
                        width: win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth || 0,
                        height: win.innerHeight || doc.documentElement.clientWidth || doc.body.clientWidth || 0
                    };
                }

                this.sendStats(null, e.data);
            });

            this.on('slideVideoPlay', (e) => {
                e.stopAll();
                pause(e.data.slide.index);
            });

            this.on('slideVideoPause', (e) => {
                e.stopAll();
                // pause(e.data.slide.index);
            });

            this.on('slideVideoEnd', (e) => {
                e.stopAll();
                play(e.data.slide.index);
            });

            // if slide is not sirv component
            this.on('contentLoaded', (e) => {
                e.stopAll();
                loadContent(e.data.slide.index);
            });

            // init,ready,zoomIn,zoomOut
            // fullscreenIn, fullscreenOut
            // pinchStart, pinchEnd
            this.on('componentEvent', (e) => {
                const event = e.data.type;
                e.stopAll();

                switch (event) {
                    case 'init':
                        if (this.index === e.data.slide.index || (this.slides[this.index] && this.slides[this.index].spinInited)) {
                            this.addControllWrapper();
                            this.enableFullscreenButton();
                            this.visibleFullscreenButton();
                        }

                        this.sendEvent('componentEvent', e.data);
                        break;
                    case 'ready':
                        if (this.index === e.data.slide.index && e.data.component !== 'spin' && (!this.slides[e.data.slide.index].videoSlide || this.isFullscreenState())) {
                            this.addControllWrapper();
                            this.enableFullscreenButton();
                            this.visibleFullscreenButton();
                        }

                        this.sendEvent('componentEvent', e.data);
                        break;
                    case 'rotate':
                        this.sendEvent('componentEvent', e.data);
                        break;
                    case 'fullscreenIn':
                        if (e.data.component === 'video') {
                            this.sendEvent('componentEvent', e.data);
                        } else if (this.option(FULLSCREEN + '.enable') && this.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
                            this.enterFullScreen();
                        }
                        break;
                    case 'fullscreenOut':
                        if (e.data.component === 'video') {
                            this.sendEvent('componentEvent', e.data);
                        } else {
                            this.exitFullScreen();
                        }
                        break;
                    case 'pinchStart':
                        // clearTimeout(this.touchDragTimer);
                        // this.touchDragTimer = null;
                        this.isComponentPinching = true;
                        break;
                    case 'pinchEnd':
                        this.isComponentPinching = false;
                        break;
                    case 'zoomIn':
                        this.isZoomIn = true;
                        pause(e.data.slide.index);
                        this.sendEvent('componentEvent', e.data);
                        break;
                    case 'zoomOut':
                        this.isZoomIn = false;
                        play(e.data.slide.index);
                        this.sendEvent('componentEvent', e.data);
                        break;
                    case 'hotspotOpened':
                        pause(e.data.slide.index);
                        break;
                    case 'hotspotClosed':
                        play(e.data.slide.index);
                        break;
                    case 'spinStart':
                        pause(e.data.slide.index);
                        break;
                    case 'spinEnd':
                        play(e.data.slide.index);
                        break;
                    case 'play':
                        if (e.data.component === 'video') {
                            pause(e.data.slide.index);
                            this.sendEvent('componentEvent', e.data);
                        }
                        break;
                    case 'resume':
                        if (e.data.component === 'video') {
                            pause(e.data.slide.index);
                            this.sendEvent('componentEvent', e.data);
                        }
                        break;
                    case 'pause':
                        if (e.data.component === 'video') {
                            this.sendEvent('componentEvent', e.data);
                        }
                        break;
                    case 'end':
                        if (e.data.component === 'video') {
                            play(e.data.slide.index);
                            this.sendEvent('componentEvent', e.data);
                        }
                        break;
                    case 'seek': // video component event
                        this.sendEvent('componentEvent', e.data);
                        break;
                    case 'contentLoaded':
                        loadContent(e.data.slide.index);
                        break;
                    default:
                        // no default
                }
            });

            this.on('goTo' + _FULLSCREEN, (e) => {
                e.stopAll();
                if (this.option(FULLSCREEN + '.enable') && this.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
                    this.enterFullScreen();
                }
            });

            this.on('goTo' + _FULLSCREEN + 'Out', (e) => {
                e.stopAll();
                this.exitFullScreen();
            });

            this.on('infoReady', (e) => { // if slide was added by api
                e.stop();

                if (this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                    const slide = this.slides[e.data.index];
                    slide.broadcast('before' + _FULLSCREEN + 'In', { data: { pseudo: this.isPseudo } });
                    slide.broadcast('after' + _FULLSCREEN + 'In', { data: { pseudo: this.isPseudo } });
                }
            });

            this.on((e) => { e.stopAll(); });
        }

        normalizeOptions() {
            const opts = $(['contextmenu.text.zoom.in', 'contextmenu.text.zoom.out', 'contextmenu.' + FULLSCREEN + '.enter', 'contextmenu.' + FULLSCREEN + '.exit', 'contextmenu.text.download']);
            const isEmpty = (str) => { return $J.typeOf(str) === 'string' && str.trim() === ''; };

            if (this.option('fullscreen.thumbnails.size') === 'auto') {
                this.option('fullscreen.thumbnails.size', this.option('thumbnails.size'));
            }

            if (this.option('slide.animation.type') === 'off') {
                this.option('slide.animation.type', false);
            }

            if (this.option('thumbnails.type') === 'grid') {
                this.isStandardGrid = true;
                this.option('thumbnails.type', 'square');
            }

            if (this.option('fullscreen.thumbnails.type') === 'grid') {
                this.isFullscreenGrid = false;
                this.option('fullscreen.thumbnails.type', 'square');
            }

            opts.forEach((opt) => {
                if (isEmpty(this.option(opt))) {
                    this.option(opt, false);
                }
            });

            if (this.option('thumbnails.enable') && this.option('thumbnails.target') && this.option('thumbnails.target').trim() === '') {
                this.option('thumbnails.target', false);
            }

            if (this.option('slide.socialbuttons.enable') &&
                (!this.option('slide.socialbuttons.types.facebook') &&
                !this.option('slide.socialbuttons.types.twitter') &&
                !this.option('slide.socialbuttons.types.linkedin') &&
                !this.option('slide.socialbuttons.types.reddit') &&
                !this.option('slide.socialbuttons.types.tumblr') &&
                !this.option('slide.socialbuttons.types.pinterest') &&
                !this.option('slide.socialbuttons.types.telegram'))) {
                this.option('slide.socialbuttons.enable', false);
            }

            this.slideOptions.sbEnable = this.option('slide.socialbuttons.enable');
        }

        addControllWrapper() {
            if (!this.controlsWrapperWasAppended && this.controlsWrapper.node.childNodes.length) {
                this.controlsWrapperWasAppended = true;
                this.slideWrapper.append(this.controlsWrapper);
            }
        }

        postInitialization() {
            if (!this.isInitialized && this.isInView && this.isSelectorsReady && this.isToolStarted && this.isStartedFullInit) {
                this.isInitialized = true;

                if (!this.hasSize) {
                    this.setContainerSize();
                }

                this.broadcast('inView', { data: this.isInView });

                this.createArrows();

                if (this.selectors) {
                    this.selectors.inView(this.isInView, this.instanceNode);
                    this.selectors.activateItem(this.index);
                }

                if (!$J.browser.mobile) {
                    const eventName = ['edge', 'ie'].includes($J.browser.uaName) ? 'pointerout' : 'mouseout';

                    this.movingContainer.addEvent(eventName, (e) => {
                        if (e.pointerType && e.pointerType !== 'mouse') { return; }
                        let toElement = e.related;

                        while (toElement && toElement !== this.movingContainer.node) {
                            toElement = toElement.parentNode;
                        }

                        if (this.movingContainer.node !== toElement && this.index !== null) {
                            this.slides[this.index].mouseAction('mouseout', e);
                        }
                    });
                }

                if (this.slides.length > 1) {
                    this.initTouchDrag();
                }

                $($J.W).addEvent('resize', this.onResizeHandler);

                this.showHideArrows();
                this.showHideSelectors();

                if (this.option(FULLSCREEN + '.always')) {
                    this.slideWrapper.addClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);
                }

                this.movingContainer.attr('id', this.movingContainerId);

                this.createFullscreenButton();
                this.addControllWrapper();
                if (this.slides[this.index] && !this.slides[this.index].sirv && (!this.slides[this.index].videoSlide || this.isFullscreenState())) {
                    this.enableFullscreenButton();
                    this.visibleFullscreenButton();
                }

                this.checkLoop(this.index);

                // we can't reset this style earlier, because youtube and vimeo can't get size if it is first slide
                this.movingContainer.setCssProp('font-size', '');

                if (this.doHistory) { $($J.W).addEvent('popstate', this.onHistoryStateChange); }

                this.autoplay();
                this.isReady = true;
                this.sendEvent('ready');
            }
        }

        addHistory() {
            if (this.doHistory) {
                // Modify browser history so that expanded view can be closed by browser's Back button
                const urlHash = '#sirv-viewer-' + this.fullscreenViewId;
                if ($J.W.node.location.hash !== urlHash) {
                    const state = { name: 'Sirv.viewer', hash: this.fullscreenViewId };
                    const title = $J.D.node.body.title || 'Sirv viewer';

                    try {
                        if ($J.W.node.history.state && $J.W.node.history.state.name === 'Sirv.viewer') {
                            $J.W.node.history.replaceState(null, title, '');
                        }
                        $J.W.node.history.pushState(state, title, urlHash);
                    } catch (e) {
                        // empty
                    }
                }
            }
        }

        setContainerSize() {
            let result = false;
            let ss = 0;

            if (this.selectors) {
                ss = this.selectorsWrapper.size[this.selectors.shortSide];
            }

            const size = this.movingContainer.size;
            const selectors = this.option('thumbnails.position');
            const isSelectorsContainer = this.option('thumbnails.enable') && this.canShowSelectors(this.slides.length) && ss > 0 && !this.externalContainer;

            if (size.width || size.height) {
                result = true;
                if (this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                    this.movingContainer.setCssProp('height', '');
                    this.slideWrapper.setCssProp('height', '');
                } else {
                    if (this.doSetSize && this.heightProportion) {
                        if (isSelectorsContainer && ['left', 'right'].includes(selectors)) { size.width -= ss; }
                        let height = size.width * (this.heightProportion.height / this.heightProportion.width);
                        if (height > this.heightProportion.height) { height = this.heightProportion.height; }
                        // if (isSelectorsContainer && ['top', 'bottom'].includes(selectors)) { height += ss; }
                        // this.movingContainer.setCssProp('height', height + 'px');

                        if (!isSelectorsContainer || ['left', 'right'].includes(selectors) && !this.isStandardGrid) {
                            this.movingContainer.setCssProp('height', height + 'px');
                        } else {
                            this.slideWrapper.setCssProp('height', height + 'px');
                        }
                    }
                }
            }

            return result;
        }

        findSlideIndex(id) {
            let result = -1;

            for (let i = 0, l = this.slides.length; i < l; i++) {
                if (this.slides[i].id && this.slides[i].id === id) {
                    result = this.slides[i].index;
                    break;
                }
            }

            return result;
        }

        getCountOfEnabledSlides(isDisabled) {
            let result = this.enabledIndexesOfSlides.length;

            if (isDisabled) {
                result = this.slides.length - result;
            }

            return result;
        }

        getItems(settings) {
            /*
                settings = undefined
                settings = {
                    enabled: true|false,
                    group: 'group'|['group', ...]
                }
            */

            let isEnabled = null;
            let slides = this.slides;

            if (settings) {
                if ($J.defined(settings.enabled)) {
                    isEnabled = settings.enabled;
                }

                if (settings.group) {
                    slides = this.getSlidesByGroup(settings.group);
                }
            }

            const result = [];

            slides.forEach((slide) => {
                if (isEnabled === true) {
                    if (slide.enabled) {
                        result.push(slide.api);
                    }
                } else if (isEnabled === false) {
                    if (!slide.enabled) {
                        result.push(slide.api);
                    }
                } else {
                    result.push(slide.api);
                }
            });

            return result;
        }

        controlEnabledSlides(indexOfSlide, remove) {
            if (remove) {
                this.enabledIndexesOfSlides.splice(this.enabledIndexesOfSlides.indexOf(indexOfSlide), 1);
            } else {
                this.enabledIndexesOfSlides.push(indexOfSlide);
                this.enabledIndexesOfSlides = this.enabledIndexesOfSlides.sort((a, b) => {
                    let result = 0;

                    if (a < b) {
                        result = -1;
                    } else if (a > b) {
                        result = 1;
                    }

                    return result;
                });
            }
        }

        disableSlide(indexOfSlide, withoutEvent) {
            let result = false;
            let nextSlide = 'next';
            const l = this.slides.length;

            if ($J.typeOf(indexOfSlide) === 'string') {
                indexOfSlide = this.findSlideIndex(indexOfSlide);
            }

            if ($J.typeOf(indexOfSlide) === 'number' && indexOfSlide >= 0 && indexOfSlide < this.slides.length && this.slides[indexOfSlide].enabled) {
                const slideUUID = this.slides[indexOfSlide].$J_UUID;
                if (this.effect) {
                    this.effect.stop();
                }
                if (this.slides[indexOfSlide].isActive) {
                    if (this.index === l - 1 && this.option('loop')) { nextSlide = 0; }
                    if (!this.jump(nextSlide, 4, true)) {
                        this.slides[indexOfSlide].beforeHide();
                        this.slides[indexOfSlide].afterHide();
                    }
                }
                if (this.slides[indexOfSlide].enabled) {
                    this.controlEnabledSlides(indexOfSlide, true);
                }

                this.slides[indexOfSlide].disable();
                this.checkLoop(this.index);
                if (!this.enabledIndexesOfSlides.length) {
                    this.index = null;
                }
                if (this.selectors) { this.selectors.disable(slideUUID); }
                if (!withoutEvent) {
                    this.sendEvent('disableItem', { slide: this.slides[indexOfSlide].api });
                }
                this.checkSingleSlide();
                this.showHideArrows();
                this.showHideSelectors();
                result = true;
            }

            return result;
        }

        enableSlide(slideIndex) {
            let result = false;

            if ($J.typeOf(slideIndex) === 'string') {
                slideIndex = this.findSlideIndex(slideIndex);
            }

            if ($J.typeOf(slideIndex) === 'number' && slideIndex >= 0 && slideIndex < this.slides.length && !this.slides[slideIndex].enabled) {
                this.slides[slideIndex].startGettingInfo();
                this.slides[slideIndex].loadThumbnail();

                this.slides[slideIndex].enable();
                this.slides[slideIndex].resize();

                const lenghtAvailableSlides = this.enabledIndexesOfSlides.filter((index) => {
                    return this.slides[index].slideAvailable;
                });

                if (!this.enabledIndexesOfSlides.length) {
                    this.index = slideIndex;
                }

                if (this.slides[slideIndex].slideAvailable && !lenghtAvailableSlides.length) {
                    this.index = slideIndex;
                    this.slides[slideIndex].loadContent();
                    this.slides[slideIndex].beforeShow();
                    this.slides[slideIndex].afterShow(globalVariables.SLIDE_SHOWN_BY.ENABLE);
                }

                this.controlEnabledSlides(slideIndex);
                this.checkLoop(this.index);
                if (this.selectors) {
                    this.selectors.enable(this.slides[slideIndex].UUID);
                    if (this.slides[slideIndex].slideAvailable) {
                        this.selectors.activateCurrentItemByUUID(this.slides[slideIndex].UUID);
                    }
                }
                this.sendEvent('enableItem', { slide: this.slides[slideIndex].api });

                this.checkSingleSlide();
                this.showHideArrows();
                this.showHideSelectors();
                result = true;
            }

            return result;
        }

        getSlidesByGroup(group) {
            let result = null;

            if (group) {
                result = [];

                this.slides.forEach((slide) => {
                    if (slide.belongsTo(group)) {
                        result.push(slide);
                    }
                });
            }

            return result;
        }

        enableGroupOfSlides(group) {
            let result = false;

            const slides = this.getSlidesByGroup(group);

            if (slides && slides.length) {
                result = true;
                slides.forEach((slide) => {
                    this.enableSlide(slide.index);
                });
            }

            return result;
        }

        disableGroupOfSlides(group) {
            let result = false;

            const slides = this.getSlidesByGroup(group);

            if (slides && slides.length) {
                result = true;
                slides.forEach((slide) => {
                    this.disableSlide(slide.index);
                });
            }

            return result;
        }

        switchGroupOfSlides(group) {
            let result = false;

            if (group) {
                const slides = this.getItems({ enabled: true });

                slides.forEach((slide) => {
                    if (!this.slides[slide.index].belongsTo(group)) {
                        this.disableSlide(slide.index);
                    }
                });

                result = this.enableGroupOfSlides(group);
            }

            return result;
        }

        jump(direction, whoUse, fast, cIndex) {
            let result = false;
            let effect = this.option('slide.animation.type');
            let currentIndex = cIndex;
            const isContains = ['next', 'prev'].includes(direction);
            const l = this.slides.length;

            if (!this.effect || !this.enabledIndexesOfSlides.length || this.index === null) { return result; }

            if (currentIndex === $J.U) {
                currentIndex = this.index;
            }

            if (!isContains) {
                const res = this.findSlideIndex(direction);
                if (res >= 0) { direction = res; }
            }

            const index = helper.sliderLib.findIndex(direction, currentIndex, l, this.option('loop'));
            if (index === null) { return result; }

            if (this.index !== index) {
                if (!this.slides[index].enabled || !this.slides[index].slideAvailable) {
                    if (isContains) {
                        result = this.jump(direction, whoUse, fast, index);
                    }

                    return result;
                }

                clearTimeout(this.autoplayTimer);
                if (!isContains) {
                    if (index > this.index) {
                        direction = 'next';
                    } else {
                        direction = 'prev';
                    }
                }

                this.checkLoop(index);

                if (!effect || fast) { effect = 'blank'; }

                if (this.selectors) {
                    this.selectors.activateItem(index);
                    this.selectors.jump(index);
                }
                this.effect.make({
                    index: this.index,
                    node: this.slides[this.index].node
                }, {
                    index: index,
                    node: this.slides[index].node,
                }, {
                    effect: effect,
                    direction: direction
                }, {
                    whoUse: whoUse
                });
                result = true;
            } else {
                this.slides[index].secondSelectorClick();
            }

            this.index = index;
            return result;
        }

        checkLoop(index) {
            if (this.arrows) {
                const l = this.enabledIndexesOfSlides.filter((indexSlide) => {
                    return !this.slides[indexSlide].selectorPinned && this.slides[indexSlide].slideAvailable;
                }).length;

                if (l < 2) {
                    this.arrows.disable('backward');
                    this.arrows.disable('forward');
                } else if (!this.option('loop')) {
                    const newIndex = this.enabledIndexesOfSlides.indexOf(index);
                    this.arrows.disable();

                    if (newIndex === 0 || l === 1) {
                        this.arrows.disable('backward');
                    }

                    if (newIndex === l - 1 || l === 1) {
                        this.arrows.disable('forward');
                    }
                } else {
                    this.arrows.disable();
                }
            }
        }

        createFullscreenButton() {
            if (!this.option(FULLSCREEN + '.enable') || this.fullscreenButton) { return; }

            this.fullscreenButton = $J.$new('div').addClass(CSS_MAIN_CLASS + '-button')
                                    .addClass(CSS_MAIN_CLASS + '-button-' + FULLSCREEN)
                                    .addClass(STANDARD_BUTTON_CLASS);

            this.fullscreenButton.append($J.$new('div').addClass(CSS_MAIN_CLASS + '-icon'));
            if (this.slides[this.index].spinInited) {
                this.enableFullscreenButton();
                this.visibleFullscreenButton();
            } else {
                this.disableFullscreenButton();
                this.hideFullscreenButton();
            }

            this.fullscreenButton.addEvent(['btnclick', 'tap'], (e) => {
                e.stop();
                if (this.isFullscreen === globalVariables.FULLSCREEN.CLOSED || this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                    this.disableFullscreenButton();
                    this.hideFullscreenButton();
                    if (this.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
                        this.enterFullScreen();
                    } else {
                        this.exitFullScreen();
                    }
                }
            });

            this.controlsWrapper.append(this.fullscreenButton);

            if (this.slides[this.index].slideReady) {
                setTimeout(() => {
                    if (!this.slides[this.index].videoSlide || this.isFullscreenState()) {
                        this.enableFullscreenButton();
                        this.visibleFullscreenButton();
                    }
                }, 0);
            }
        }

        visibleFullscreenButton() {
            if (this.fullscreenButton) {
                this.fullscreenButton.removeClass(FULLSCREEN_BUTTON_HIDE_CLASS);
            }
        }

        hideFullscreenButton() {
            if (this.fullscreenButton) {
                this.fullscreenButton.addClass(FULLSCREEN_BUTTON_HIDE_CLASS);
            }
        }

        enableFullscreenButton() {
            if (this.fullscreenButton) {
                this.fullscreenButton.removeAttr('disabled');
            }
        }

        disableFullscreenButton() {
            if (this.fullscreenButton) {
                this.fullscreenButton.attr('disabled', 'disabled');
            }
        }

        createEffect() {
            this.effect = new Effect({
                time: this.option('slide.animation.duration'),
                orientation: this.option('orientation')
            });
            this.effect.parentClass = this;

            this.on('effectStart', (e) => {
                e.stopAll();
                this.isMoving = true;
                this.disableFullscreenButton();
                if (this.slides[e.indexes[1]].videoSlide && this.isFullscreen !== globalVariables.FULLSCREEN.OPENED) {
                    this.hideFullscreenButton();
                }

                this.slides[e.indexes[0]].beforeHide();
                this.slides[e.indexes[1]].beforeShow();
                if (e.data.callbackData.whoUse !== 4) {
                    this.sendEvent('beforeSlideIn', { slide: this.slides[e.indexes[1]].api });
                    this.sendEvent('beforeSlideOut', { slide: this.slides[e.indexes[0]].api });
                }
            });

            this.on('effectEnd', (e) => {
                e.stopAll();

                if (!this.slides[e.indexes[1]].videoSlide || this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                    this.enableFullscreenButton();
                    this.visibleFullscreenButton();
                }

                this.slides[e.indexes[0]].afterHide();
                this.slides[e.indexes[1]].afterShow(e.data.callbackData.whoUse);
                if (e.data.callbackData.whoUse !== 4) {
                    this.sendEvent('afterSlideIn', { slide: this.slides[e.indexes[1]].api });
                    this.sendEvent('afterSlideOut', { slide: this.slides[e.indexes[0]].api });
                }
                this.autoplay();
                this.isMoving = false;
                this.residualAutoplayTime = this.autoplayDelay;
            });
        }

        createArrows() {
            const option = this.option;
            if (!option('arrows')) { return; }

            this.arrows = new Arrows({
                orientation: option('orientation')
            });
            this.arrows.hide();
            this.arrows.parentClass = this;

            this.on('arrowAction', (e) => {
                e.stopAll();
                // e.data.type === 'next' || 'prev'

                const index = this.getNextIndex(e.data.type, this.index, this.slides.length, this.option('loop'));
                this.jump(index, 2);
            });

            this.arrows.nodes.forEach((node) => {
                this.controlsWrapper.append(node);
            });
        }

        getNextIndex(direction, index, length, loop) {
            const resultIndex = helper.sliderLib.findIndex(direction, index, length, loop);
            let result = resultIndex;

            if (resultIndex !== null && resultIndex !== this.index &&
                (this.slides[resultIndex].selectorPinned || !this.slides[resultIndex].slideAvailable || !this.slides[resultIndex].enabled)) {
                result = this.getNextIndex(direction, resultIndex, length, loop);
            }

            return result;
        }

        isHiddenSlides() {
            return !this.slides.some((slide) => {
                return !slide.customSelector || (slide.customSelector && slide.slideAvailable);
            });
        }

        createSelectors() {
            const option = this.option;

            if (!option('thumbnails.enable') && !option('fullscreen.thumbnails.enable')) {
                this.isSelectorsReady = true;
                return;
            }

            this.selectors = new Selectors(this.slides.map(slide => slide.selectorData), {
                isStandardGrid: this.isStandardGrid,
                standardStyle: option('thumbnails.type'),
                standardSize: option('thumbnails.size'),
                standardPosition: option('thumbnails.enable') ? option('thumbnails.position') : false,
                standardWatermark: option('thumbnails.watermark'),
                isFullscreenGrid: this.isFullscreenGrid,
                fullscreenStyle: option('fullscreen.thumbnails.type'),
                fullscreenSize: option('fullscreen.thumbnails.size'),
                fullscreenPosition: option('fullscreen.thumbnails.enable') ? option('fullscreen.thumbnails.position') : false,
                fullscreenAutohide: option('fullscreen.thumbnails.autohide'),
                fullscreenWatermark: option('fullscreen.thumbnails.watermark'),
                arrows: option('arrows')
            });

            this.selectors.parentClass = this;

            this.on('selectorsReady', (e) => {
                e.stopAll();
                this.isSelectorsReady = true;
                this.postInitialization();
            });

            this.on('getSelectorProportion', (e) => {
                e.stopAll();

                const index = this.getSlideByUUID(e.data.UUID);

                if (index !== null) {
                    const slide = this.slides[index];
                    if (slide) {
                        const result = { size: null, isSirv: true };
                        slide.getSelectorProportion()
                            .then((data) => {
                                result.isSirv = slide.isSirvSelector();
                                result.size = data.size;
                                e.data.resultingCallback(result);
                            })
                            .catch((err) => {
                                result.isSirv = slide.isSirvSelector();
                                this.pickOut(err.UUID);
                                e.data.resultingCallback(result);
                            });
                    } else {
                        e.data.resultingCallback(null);
                    }
                } else {
                    e.data.resultingCallback(null);
                }
            });

            this.on('getSelectorImgUrl', (e) => {
                e.stopAll();
                const index = this.getSlideByUUID(e.data.UUID);

                if (index !== null) {
                    const slide = this.slides[index];

                    if (slide) {
                        slide.getSelectorImgUrl(e.data.type, e.data.size, e.data.crop, e.data.watermark)
                            .then((result) => {
                                e.data.resultingCallback({
                                    src: result.src,
                                    srcset: result.srcset,
                                    size: result.size,
                                    alt: result.alt,
                                    referrerpolicy: result.referrerpolicy
                                });
                            }).catch((err) => {
                                e.data.resultingCallback(null);
                            });
                    } else {
                        e.data.resultingCallback(null);
                    }
                } else {
                    e.data.resultingCallback(null);
                }
            });

            this.on('changeSlide', (e) => {
                e.stopAll();

                const index = this.getSlideByUUID(e.data.UUID);

                if (index !== null) {
                    const _tmp = this.option(FULLSCREEN + '.enable') && this.option(FULLSCREEN + '.always');
                    if (this.slides[index].customSelector) {
                        this.sendEvent('thumbnailClick', { slide: this.slides[index].api });
                    }

                    this.jump(index, 2, _tmp);

                    if (_tmp) {
                        this.enterFullScreen();
                    }
                }
            });

            this.on('visibility', (e) => {
                e.stop();
                switch (e.action) {
                    case 'show':
                        this.movingContainer.removeClass(CSS_MAIN_CLASS + '-selectors-closed');
                        break;
                    case 'hide':
                        this.movingContainer.addClass(CSS_MAIN_CLASS + '-selectors-closed');
                        break;
                    // no default
                }
            });

            this.on('selectorsDone', (e) => {
                e.stopAll();

                if (['left', 'right'].includes(this.selectors.currentStylePosition)) {
                    this.onResize();
                }
            });

            this.selectorsWrapper.append(this.selectors.node);

            this.slides.forEach((slide, index) => {
                if (!slide.enabled) {
                    this.selectors.disable(slide.UUID);
                }
            });

            this.showHideSelectors(true);
        }

        findSlide() {
            let dataSrc = this.instanceNode.attr('data-src');

            if (dataSrc) {
                let tmp;
                try {
                    if (this.viewerFileContent) {
                        tmp = this.viewerFileContent;
                    } else {
                        tmp = dataSrc.split('?')[0];
                        tmp = tmp.split('.');
                        tmp = tmp[tmp.length - 1];
                    }
                } catch (e) {
                    // empty
                }

                let node;
                if (tmp === 'spin' || helper.isVideo(dataSrc)) {
                    node = $J.$new('div', { 'data-src': dataSrc });
                    tmp = globalVariables.SLIDE.TYPES.SPIN;
                } else {
                    if ([this.instanceNode.attr('data-type'), this.instanceNode.attr('data-effect')].includes('zoom')) {
                        tmp = globalVariables.SLIDE.TYPES.ZOOM;
                        node = $J.$new('div', { 'data-type': 'zoom', 'data-src': dataSrc });
                    } else {
                        tmp = globalVariables.SLIDE.TYPES.IMAGE;
                        node = $J.$new('img', { 'data-src': dataSrc });
                    }
                }

                if (this.viewerFileContent) {
                    node.store('view-content', tmp);
                }

                this.instanceNode.append(node);
            } else {
                dataSrc = this.instanceNode.attr('data-bg-src');
                if (dataSrc) {
                    this.instanceNode.append($J.$new('img', { 'data-src': dataSrc }));
                }
            }

            return this.getSlides(true);
        }

        canPinSlide(node) {
            const side = Slide.findPinnedSelectorSide(node);
            const pinnedSlides = this.slides.filter(slide => slide.pinnedSelectorSide === side);

            if (pinnedSlides.length < 3) {
                return true;
            }

            return false;
        }

        getSlideByUUID(uuid) {
            let result = null;

            for (let i = 0, l = this.slides.length; i < l; i++) {
                const slide = this.slides[i];
                if (slide.UUID === uuid) {
                    result = i;
                    break;
                }
            }

            return result;
        }

        pickOut(uuid) {
            const index = this.getSlideByUUID(uuid);
            if (index === null) { return; }
            this.removeSlide(index);

            if (!this.slides.length) {
                this.emit('destroy', { data: { id: this.id, node: this.instanceNode.node } });
                return;
            }

            if (this.slides.length < 2) { // clear selectors class and additional things
                if (this.option('thumbnails.enable') || this.option('fullscreen.thumbnails.enable')) {
                    this.changeClasses(this.classes.standard, true);
                    this.setContainerSize();
                }
            }

            if (!this.isToolStarted) {
                this.searchingOfProportions();
            }

            this.postInitialization();
        }

        getSlides(fromFindSlide) {
            let slides;

            if (fromFindSlide) {
                slides = Array.from(this.instanceNode.node.childNodes);
            } else {
                slides = Array.from(this.instanceNode.node.childNodes).filter((slide) => {
                    let result = false;
                    this.sliderNodes.push(slide.cloneNode(true));

                    if (slide.tagName && ['div', 'img', 'iframe', 'figure', 'video', 'picture', SELECTOR_TAG].includes($(slide).tagName)) {
                        result = true;
                    }

                    slide.parentNode.removeChild(slide);
                    return result;
                });

                slides = slidePinnedFilter(slides);
            }

            let filteredSlides = slides.map(slide => Slide.parse(slide));

            globalFunctions.viewerFilters.forEach((callback) => {
                let fs = [].concat(filteredSlides);

                fs = fs.map((s) => {
                    const r = {};

                    Object.entries(s).forEach((item) => {
                        if (item[0] === 'type') {
                            item[1] = globalVariables.SLIDE.NAMES[item[1]];
                        }

                        helper.createReadOnlyProp(r, ...item);
                    });

                    return r;
                });

                const result = callback(this.id, fs);

                if (Array.isArray(result)) {
                    filteredSlides = result.map((s) => {
                        let r = s;

                        for (let i = 0, l = filteredSlides.length; i < l; i++) {
                            if (s.node === filteredSlides[i].node) {
                                r = filteredSlides.splice(i, 1)[0];
                                break;
                            }
                        }

                        return r;
                    });
                }
            });

            slides = filteredSlides;

            if (!fromFindSlide && !slides.length) {
                slides = this.findSlide();
            }

            slides = helper.sortSlidesByOrder(this.option('itemsOrder'), slides);

            return slides;
        }

        createSlides(slides) {
            let index = 0;

            slides.forEach((slide) => {
                if (!Slide.isSirvComponent(slide.node) || Slide.hasComponent(slide.node)) {
                    slide = $(slide.node);
                    if (slide.tagName === SELECTOR_TAG) {
                        const div = $J.$new('div');
                        if (slide.attr('data-id')) {
                            div.attr('data-id', slide.attr('data-id'));
                        }

                        if (slide.attr('data-group')) {
                            div.attr('data-group', slide.attr('data-group'));
                        }
                        div.append(slide);
                        slide = div;
                    }

                    slide.addClass(CSS_MAIN_CLASS + '-component');

                    const _slide = new Slide(slide.node, index, this.slideOptions);
                    _slide.parentClass = this;
                    this.slides.push(_slide);

                    if (_slide.enabled && _slide.slideAvailable) {
                        this.enabledIndexesOfSlides.push(index);
                    }

                    index += 1;
                }
            });

            this.firstSlideAhead = this.enabledIndexesOfSlides.length > MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR;

            this.enabledIndexesOfSlides.forEach((slideindex, i) => {
                if (!this.firstSlideAhead || i < MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR) {
                    this.slides[slideindex].startGettingInfo();
                }
            });

            if (this.index > this.slides.length - 1) { this.index = 0; }

            this.postInitialization();
        }

        checkSingleSlide() {
            const isSingle = this.enabledIndexesOfSlides.length === 1;

            this.enabledIndexesOfSlides.forEach((index) => {
                this.slides[index].single(isSingle);
            });
        }

        showHideArrows() {
            if (this.arrows) {
                const visibleSlides = this.visibleSlides();

                if (visibleSlides < 2 || this.option(FULLSCREEN + '.always') && !this.isFullscreenState()) {
                    this.arrows.hide();
                } else if (visibleSlides > 1 && (!this.option(FULLSCREEN + '.always') || this.isFullscreenState())) {
                    this.arrows.show();
                }
            }
        }

        canShowSelectors(selectorCount) {
            const property = this.isFullscreen === globalVariables.FULLSCREEN.OPENED
                                ? 'fullscreen.thumbnails.always'
                                : 'thumbnails.always';
            return this.option(property) || selectorCount > 1;
        }

        showHideSelectors(force /* container size can be set faster than we can detect selector's visibility */) {
            if (this.selectors) {
                if (!this.selectorsDebounce) {
                    this.selectorsDebounce = helper.debounce(() => {
                        if (this.selectors) {
                            const canShow = this.canShowSelectors(this.enabledIndexesOfSlides.length);

                            if (canShow) {
                                if (!this.selectors.isSelectorsActionEnabled()) {
                                    this.movingContainer.setCssProp('height', '100%');
                                    this.selectorsWrapper.removeClass(CSS_MAIN_CLASS + '-hide-selectors');
                                    this.selectors.enableActions();
                                    this.onResize();
                                }
                            } else {
                                if (this.selectors.isSelectorsActionEnabled()) {
                                    this.selectorsWrapper.addClass(CSS_MAIN_CLASS + '-hide-selectors');
                                    this.selectors.disableActions();
                                    this.onResize();
                                }
                            }
                        }
                    }, force ? 0 : 32);
                }

                this.selectorsDebounce();
            }
        }

        getAvailableSlideIndex(startIndex) {
            if (startIndex === this.slides.length - 1 && !this.slides[startIndex].slideAvailable) {
                return -1;
            }

            if (this.slides[startIndex + 1].slideAvailable) {
                return startIndex + 1;
            }

            return this.getAvailableSlideIndex(startIndex + 1);
        }

        addAvailableSlideNode(slide, index) {
            const slideNode = slide.node;
            const l = this.slides.length;

            if (slide.slideAvailable) {
                if (l > 1 && index !== l - 1) {
                    if (this.slides[index + 1].slideAvailable) {
                        this.slidesContainer.node.insertBefore(slideNode.node, this.slides[index + 1].node.node);
                    } else {
                        const indexAvailableSlide = this.getAvailableSlideIndex(index);
                        if (indexAvailableSlide < 0) {
                            this.slidesContainer.append(slideNode);
                        } else {
                            this.slidesContainer.node.insertBefore(slideNode.node, this.slides[indexAvailableSlide].node.node);
                        }
                    }
                } else {
                    this.slidesContainer.append(slideNode);
                }
            }
        }

        sortItems(order) {
            if (!Array.isArray(order)) {
                order = this.option('itemsOrder');
            }
            if (!order.length) { return; }

            this.slides = helper.sortSlidesByOrder(order, this.slides);

            if (this.selectors) {
                this.selectors.sortSelectors(this.slides.map(slide => slide.UUID), order.length);
            }

            this.slides.forEach((slide, index) => {
                slide.newIndex = index;
            });

            for (let indexSlide = 0, l = this.slides.length; indexSlide < l; indexSlide++) {
                if (this.slides[indexSlide].slideActive) {
                    this.index = this.slides[indexSlide].index;
                    break;
                }
            }
        }

        insertSlide(indexOfSlide, htmlNodeSlide) {
            const pinnedNode = htmlNodeSlide.querySelector(SELECTOR_TAG) || htmlNodeSlide;

            if (Slide.findPinnedSelectorSide(pinnedNode) && !this.canPinSlide(pinnedNode)) { return false; }

            if (!$J.defined(indexOfSlide)) {
                indexOfSlide = this.slides.length + 1;
            }

            if ($J.typeOf(indexOfSlide) === 'number' && indexOfSlide >= 0 && htmlNodeSlide && (!Slide.isSirvComponent(htmlNodeSlide) || Slide.hasComponent(htmlNodeSlide))) {
                $(htmlNodeSlide).addClass(CSS_MAIN_CLASS + '-component');
                if (indexOfSlide > this.slides.length) { indexOfSlide = this.slides.length; }

                clearTimeout(this.timerRemove);

                const slide = new Slide(htmlNodeSlide, indexOfSlide, this.slideOptions, true);
                slide.parentClass = this;

                this.slides.splice(indexOfSlide, 0, slide);

                let nonIndex = this.index === null;

                if (this.index === null) {
                    if (slide.enabled && slide.slideAvailable) {
                        // this.index = 0; // TODO check it
                        this.index = indexOfSlide;
                    } else {
                        nonIndex = false;
                    }
                } else if (indexOfSlide <= this.index) {
                    this.index += 1;
                }

                this.enabledIndexesOfSlides = [];
                this.slides.forEach((_slide, index) => {
                    _slide.newIndex = index;

                    if (_slide.enabled) {
                        this.controlEnabledSlides(index);
                    }
                });

                this.addAvailableSlideNode(slide, indexOfSlide);
                /*
                    new component for slider is needed css
                */
                this.addComponentsCSS();
                slide.appendToDOM();
                // all elements need to be in dom
                slide.initVideoPlayer();

                slide.startGettingInfo();
                slide.loadThumbnail();

                slide.startFullInit(null);

                slide.startTool(this.index === indexOfSlide, this.firstSlideAhead ? false : this.option('slide.preload'), this.firstSlideAhead);

                slide.broadcast('inView', { data: this.isInView });

                if (this.index === indexOfSlide) {
                    slide.loadContent();
                    slide.beforeShow();
                    slide.afterShow(globalVariables.SLIDE_SHOWN_BY.INIT);
                }

                if (this.isFullscreen === globalVariables.FULLSCREEN.OPENED && !slide.sirv) {
                    slide.broadcast('before' + _FULLSCREEN + 'In', { data: { pseudo: this.isPseudo } });
                    slide.broadcast('after' + _FULLSCREEN + 'In', { data: { pseudo: this.isPseudo } });
                }

                this.checkLoop(this.index);

                if (this.selectors) {
                    this.selectors.insert(indexOfSlide, slide.selectorData);

                    if (nonIndex) {
                        this.selectors.activateItem(this.index);
                    }
                }

                this.checkSingleSlide();
                this.showHideSelectors();
                this.showHideArrows();
                return true;
            }

            return false;
        }

        removeSlide(indexOfSlide) {
            let flag = false;

            if ($J.typeOf(indexOfSlide) === 'string') {
                indexOfSlide = this.findSlideIndex(indexOfSlide);
            }

            if ($J.typeOf(indexOfSlide) === 'number' && indexOfSlide >= 0 && indexOfSlide < this.slides.length) {
                const slideUUID = this.slides[indexOfSlide].$J_UUID;
                if (this.slides[indexOfSlide].enabled) {
                    this.disableSlide(indexOfSlide, true);
                } else {
                    flag = true;
                }
                this.slides[indexOfSlide].destroy();
                this.slides.splice(indexOfSlide, 1);
                this.enabledIndexesOfSlides = [];
                this.slides.forEach((slide, index) => {
                    slide.newIndex = index;

                    if (slide.enabled) {
                        this.controlEnabledSlides(index);
                    }
                });

                if (this.selectors) {
                    this.selectors.pickOut(slideUUID);
                }

                if (this.index !== null && indexOfSlide <= this.index && this.index !== 0) { this.index -= 1; }

                if (flag) {
                    this.checkSingleSlide();
                }

                if (this.isHiddenSlides()) {
                    this.timerRemove = setTimeout(() => {
                        if (this.instanceNode) {
                            this.emit('destroy', { data: { id: this.id, node: this.instanceNode.node } });
                        }
                    }, 100);
                }

                return true;
            }

            return false;
        }

        createContextMenu() {
            const option = this.option;
            const contextmenuData = [];

            if (option('contextmenu.enable')) {
                if (option('contextmenu.text.zoom.in') || option('contextmenu.text.zoom.out')) {
                    if (option('contextmenu.text.zoom.in')) {
                        contextmenuData.push({
                            id: 'zoomin',
                            label: option('contextmenu.text.zoom.in'),
                            hidden: false,
                            action: (e) => { this.slides[this.index].zoomIn(e.left, e.top); }
                        });
                    }

                    if (option('contextmenu.text.zoom.out')) {
                        contextmenuData.push({
                            id: 'zoomout',
                            label: option('contextmenu.text.zoom.out'),
                            disabled: true,
                            hidden: false,
                            action: (e) => { this.slides[this.index].zoomOut(e.left, e.top); }
                        });
                    }
                }

                if (option(FULLSCREEN + '.enable') && (option('contextmenu.text.' + FULLSCREEN + '.enter') || option('contextmenu.text.' + FULLSCREEN + '.exit'))) {
                    if (option('contextmenu.text.' + FULLSCREEN + '.enter')) {
                        // isExist
                        contextmenuData.push({
                            id: 'enter' + FULLSCREEN,
                            label: option('contextmenu.text.' + FULLSCREEN + '.enter'),
                            hidden: !option(FULLSCREEN + '.enable'),
                            action: () => { this.enterFullScreen(); }
                        });
                    }

                    if (option('contextmenu.text.' + FULLSCREEN + '.exit')) {
                        contextmenuData.push({
                            id: 'exit' + FULLSCREEN,
                            label: option('contextmenu.text.' + FULLSCREEN + '.exit'),
                            hidden: true,
                            action: () => { this.exitFullScreen(); }
                        });
                    }
                }

                if (option('contextmenu.text.download')) {
                    if (contextmenuData.length) {
                        contextmenuData.push({
                            id: 'sirv-separator',
                            hidden: false,
                            separator: true
                        });
                    }
                    contextmenuData.push({
                        id: 'download',
                        label: option('contextmenu.text.download'),
                        action: () => {
                            let dlw;
                            const url = this.slides[this.index].originImageUrl;
                            if (url) {
                                dlw = $J.$new('iframe').setCss({ width: 0, height: 0, display: 'none' }).appendTo($J.D.node.body);
                                dlw.node.src = url + '?format=original&dl';
                            }
                        }
                    });
                }

                this.movingContainer.addEvent('contextmenu', (e) => {
                    let magnify;
                    let canShow = false;
                    let zoomData;
                    let dl = true;
                    let zoomMenu = false;
                    let fullscreenMenu = false;
                    let downloadMenu = false;
                    const zoomin = 'zoomin';
                    const zoomout = 'zoomout';
                    const enterfullscreen = 'enter' + FULLSCREEN;
                    const exitfullscreen = 'exit' + FULLSCREEN;

                    e.stopDefaults();

                    if (this.contextMenu && !this.isMoving && this.enabledIndexesOfSlides.length) {
                        const item = this.slides[this.index];
                        const typeOfSlide = item.typeOfSlide;
                        const t = globalVariables.SLIDE.TYPES;

                        if (this.isReady && item.isReady && item.sirv && typeOfSlide) {
                            const opts = item.options;

                            switch (typeOfSlide) {
                                case t.SPIN:
                                    magnify = true;
                                    break;
                                case t.ZOOM:
                                    magnify = opts.mode === 'deep';
                                    break;
                                case t.IMAGE:
                                    break;
                                case t.VIDEO:
                                    dl = false;
                                    break;
                                // no default
                            }

                            if (magnify && this.slides[this.index].zoomSizeExist && (option('contextmenu.text.zoom.in') || option('contextmenu.text.zoom.out'))) {
                                zoomData = this.slides[this.index].zoomData;
                                this.contextMenu.showItem(zoomin);
                                if (zoomData.isZoomed && zoomData.zoom === 1) {
                                    this.contextMenu.disableItem(zoomin);
                                } else {
                                    this.contextMenu.enableItem(zoomin);
                                }
                                this.contextMenu.showItem(zoomout);
                                // if (!zoomData.isZoomed || zoomData.zoom === 0) {
                                if (!zoomData.isZoomed) {
                                    this.contextMenu.disableItem(zoomout);
                                } else {
                                    this.contextMenu.enableItem(zoomout);
                                }
                                zoomMenu = true;
                            } else {
                                this.contextMenu.hideItem(zoomin);
                                this.contextMenu.hideItem(zoomout);
                            }

                            if (option(FULLSCREEN + '.enable')) {
                                if (this.isFullscreenState()) {
                                    this.contextMenu.hideItem(enterfullscreen);
                                    if (this.contextMenu.isExist(exitfullscreen)) {
                                        this.contextMenu.showItem(exitfullscreen);
                                        if (zoomData && zoomData.isZoomed) {
                                            this.contextMenu.disableItem(exitfullscreen);
                                        } else {
                                            this.contextMenu.enableItem(exitfullscreen);
                                        }
                                        fullscreenMenu = true;
                                    }
                                } else {
                                    if (this.contextMenu.isExist(enterfullscreen)) {
                                        this.contextMenu.showItem(enterfullscreen);
                                        if (zoomData && zoomData.isZoomed) {
                                            this.contextMenu.disableItem(enterfullscreen);
                                        } else {
                                            this.contextMenu.enableItem(enterfullscreen);
                                        }
                                        fullscreenMenu = true;
                                    }
                                    this.contextMenu.hideItem(exitfullscreen);
                                }
                            }

                            if (this.contextMenu.isExist('download') && dl) {
                                this.contextMenu.showItem('download');
                                downloadMenu = true;
                            } else {
                                this.contextMenu.hideItem('download');
                            }

                            if (zoomMenu || fullscreenMenu || downloadMenu) {
                                if ((zoomMenu || fullscreenMenu) && downloadMenu && typeOfSlide !== t.VIDEO) {
                                    this.contextMenu.showItem('sirv-separator');
                                } else {
                                    this.contextMenu.hideItem('sirv-separator');
                                }

                                canShow = true;
                                this.broadcast('stopContext');
                            }
                        }

                        this.contextMenu.canShow = canShow;
                    }
                });

                if (contextmenuData.length && !$J.browser.mobile) {
                    this.contextMenu = new ContextMenu(this.movingContainer, contextmenuData, 'sirv');
                    if (option('fullscreen.enable')) {
                        this.contextMenu.fullScreenBox = this.fullScreenBox;
                    }
                }
            } else {
                this.movingContainer.addEvent('contextmenu', (e) => { e.stop(); });
            }
        }

        enterFullScreen() {
            if (this.isFullscreen !== globalVariables.FULLSCREEN.CLOSED) {
                return false;
            }

            this.addHistory();

            this.isFullscreen = globalVariables.FULLSCREEN.OPENING;
            this.fullscreenStartTime = +new Date();

            const isPseudo = !this.option('fullscreen.native') || !$J.browser.fullScreen.capable || !$J.browser.fullScreen.enabled();

            if (iPhoneSafariViewportRuler) {
                iPhoneSafariViewportRuler.appendTo($J.D.node.body);
            }

            this.disableFullscreenButton();
            this.hideFullscreenButton();

            if (this.selectors) {
                this.setClasses();
                if (this.option('fullscreen.thumbnails.enable')) {
                    this.appendSelectors();
                }
                this.selectors.beforeEnterFullscreen();
            }

            this.slideWrapper.removeClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);

            this.fullScreenBox.setCss({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 99999999999
            });

            this.boxSize = this.instanceNode.size;
            this.boxBoundaries = this.instanceNode.rect;

            this.fullScreenBox.append(this.movingContainer);
            $($J.D.node.body).append(this.fullScreenBox);
            this.movingContainer.setCssProp('height', '100%');

            this.broadcast('before' + _FULLSCREEN + 'In', { data: { pseudo: isPseudo } });
            this.slideWrapper.setCssProp('height', '');

            if (ProductDetail && this.productDetail) {
                this.productDetail.open();
            }

            $J.browser.fullScreen.request(this.fullScreenBox, {
                windowFullscreen: !this.option('fullscreen.native'),
                onEnter: this.onEnteredFullScreen.bind(this),
                // onExit: this.onExitFullScreen.bind(this),
                onExit: () => {
                    if ([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING].includes(this.isFullscreen)) { return; }
                    this.isFullscreen = globalVariables.FULLSCREEN.CLOSING;
                    this._beforeExitFullscreen();
                    this.broadcast('before' + _FULLSCREEN + 'Out', { data: { pseudo: false } });
                    this.onExitFullScreen();
                },
                fallback: () => {
                    const rootTag = $J.D.node.getElementsByTagName('html')[0];
                    $(rootTag).addClass(PSEUDO_FULLSCREEN_CLASS);
                    // eslint-disable-next-line no-unused-vars
                    $(document.body).render();
                    setTimeout(() => this.onEnteredFullScreen(true), 64);

                    // const fullSize = $J.D.size;
                    // const scrolls = $J.W.scroll;
                    // // const docFullSize = $($J.D).fullSize;
                    // const rootTag = $J.D.node.getElementsByTagName('html')[0];
                    // $(rootTag).addClass(PSEUDO_FULLSCREEN_CLASS);
                    // let top = 0 + scrolls.y;

                    // // Properly handle iPhone Safari (>10) address bar, bookmark bar and status bar
                    // // if (isHandset && $J.browser.platform === 'ios' && $J.browser.uaName === 'safari' && parseInt($J.browser.uaVersion, 10) > 10) {
                    // if (iPhoneSafariViewportRuler) {
                    //     top = Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top);
                    //     // this.expandBox.setCss({ height: window.innerHeight, maxHeight: '100vh', top: Math.abs(iPhoneSafariViewportRuler,node.getBoundingClientRect().top) });
                    // }

                    // if (!this.fullScreenFX) {
                    //     this.fullScreenFX = new $J.FX(this.fullScreenBox, {
                    //         duration: 1,
                    //         transition: $J.FX.getTransition().expoOut,
                    //         onStart: () => {
                    //             this.fullScreenBox.setCss({
                    //                 width: this.boxSize.width,
                    //                 height: this.boxSize.height,
                    //                 top: this.boxBoundaries.top,
                    //                 left: this.boxBoundaries.left
                    //             }).appendTo($J.D.node.body);
                    //         },

                    //         onAfterRender: () => {},
                    //         onComplete: () => {
                    //             this.onEnteredFullScreen(true);
                    //             this.fullScreenFX = null;
                    //         }
                    //     });
                    // }

                    // this.fullScreenFX.start({
                    //     width:  [this.boxSize.width, fullSize.width],
                    //     height: [this.boxSize.height, fullSize.height],
                    //     // top:    [this.boxBoundaries.top, 0 + scrolls.y],
                    //     top:    [this.boxBoundaries.top, top],
                    //     left:   [this.boxBoundaries.left, 0 + scrolls.x],
                    //     opacity: [0, 1]
                    // });
                }
            });

            return true;
        }

        onEnteredFullScreen(pseudo) {
            if (this.isFullscreen !== globalVariables.FULLSCREEN.OPENING) { return; }
            this.isPseudo = pseudo; // the variable is necessary for custom inserting slide

            if (pseudo && this.isFullscreen === globalVariables.FULLSCREEN.OPENING) {
                this.fullScreenBox.setCss({
                    top: iPhoneSafariViewportRuler ? Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top) : 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: 'auto',
                    height: iPhoneSafariViewportRuler ? $J.W.node.innerHeight : 'auto',
                    display: this.productDetail ? 'flex' : 'block',
                    position: 'fixed'
                });

                // if (iPhoneSafariViewportRuler) {
                //     this.fullScreenBox.setCss({ height: $J.W.node.innerHeight, top: Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top) });
                // }

                $J.D.addEvent('keydown', this.pseudoFSEvent);
            }

            this.isFullscreen = globalVariables.FULLSCREEN.OPENED;

            if (this.fullscreenButton) {
                this.fullscreenButton.removeClass(STANDARD_BUTTON_CLASS);
                this.fullscreenButton.addClass(FULLSCREEN_BUTTON_CLASS);
                if (!this.slides[this.index] || !this.slides[this.index].videoSlide || this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                    setTimeout(() => {
                        this.enableFullscreenButton();
                        this.visibleFullscreenButton();
                    }, 1);
                }
            }

            if (this.selectors) {
                this.selectors.afterEnterFullscreen();
            }

            if (this.slides.length > 1) {
                $J.D.addEvent('keyup', this.keyBoardArrowsCallback);
            }

            this.showHideArrows();
            this.showHideSelectors();

            this.broadcast('after' + _FULLSCREEN + 'In', { data: { pseudo: pseudo } });
            this.onResize();

            let eventData = {};

            if (this.enabledIndexesOfSlides.length) {
                eventData = { slide: this.slides[this.index].api };
            }
            this.sendEvent(FULLSCREEN + 'In', eventData);
        }

        _beforeExitFullscreen() {
            this.disableFullscreenButton();
            this.hideFullscreenButton();

            if (this.option(FULLSCREEN + '.always')) {
                this.slideWrapper.addClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);
            }

            if (this.selectors) {
                if (this.option('fullscreen.thumbnails.enable')) {
                    this.appendSelectors();
                }
                this.setClasses();
                this.selectors.beforeExitFullscreen();
            }

            if (ProductDetail && this.productDetail) {
                this.productDetail.close();
            }
        }

        exitFullScreen() {
            if (this.isFullscreen !== globalVariables.FULLSCREEN.OPENED) { return false; }
            this.isFullscreen = globalVariables.FULLSCREEN.CLOSING;

            this._beforeExitFullscreen();

            if (iPhoneSafariViewportRuler) {
                iPhoneSafariViewportRuler.remove();
            }

            if ($J.browser.fullScreen.capable && $J.browser.fullScreen.enabled() && this.option('fullscreen.native')) {
                this.broadcast('before' + _FULLSCREEN + 'Out', { data: { pseudo: false } });
                $J.browser.fullScreen.cancel.call(document);
            } else {
                const rootTag = $J.D.node.getElementsByTagName('html')[0];
                $(rootTag).removeClass(PSEUDO_FULLSCREEN_CLASS);
                this.broadcast('before' + _FULLSCREEN + 'Out', { data: { pseudo: true } });
                this.onExitFullScreen(true);

                // const fullSize = this.fullScreenBox.size;
                // const fsBoxBoundaries = this.fullScreenBox.rect;
                // const rootTag = $J.D.node.getElementsByTagName('html')[0];
                // $(rootTag).removeClass(PSEUDO_FULLSCREEN_CLASS);

                // this.broadcast('before' + _FULLSCREEN + 'Out', { data: { pseudo: true } });

                // if (!this.fullScreenExitFX) {
                //     this.fullScreenExitFX = new $J.FX(this.fullScreenBox, {
                //         duration: 1,
                //         transition: $J.FX.getTransition().expoOut,
                //         onStart: () => {
                //             $($J.D).removeEvent('keydown', this.pseudoFSEvent);
                //             this.fullScreenBox.setCss({ position: 'absolute' });
                //         },

                //         onAfterRender: () => {},
                //         onComplete: () => {
                //             this.onExitFullScreen(true);
                //             this.fullScreenExitFX = null;
                //         }
                //     });
                // }

                // this.fullScreenExitFX.start({
                //     width:  [fullSize.width, this.boxSize.width],
                //     height: [fullSize.height, this.boxSize.height],
                //     top:    [0 + fsBoxBoundaries.top, this.boxBoundaries.top],
                //     left:   [0 + fsBoxBoundaries.left, this.boxBoundaries.left],
                //     opacity: [1, 0.5]
                // });
            }

            return true;
        }

        onExitFullScreen(pseudo) {
            if ([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING].includes(this.isFullscreen)) { return; }

            $J.D.removeEvent('keyup', this.keyBoardArrowsCallback);

            this.showHideArrows();
            this.showHideSelectors();

            this.instanceNode.append(this.movingContainer);
            this.fullScreenBox.remove();

            if (this.fullscreenButton) {
                this.fullscreenButton.removeClass(FULLSCREEN_BUTTON_CLASS);
                this.fullscreenButton.addClass(STANDARD_BUTTON_CLASS);
                if (!this.slides[this.index] || !this.slides[this.index].videoSlide || this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                    setTimeout(() => {
                        this.enableFullscreenButton();
                        this.visibleFullscreenButton();
                    }, 1);
                }
            }

            if (this.doHistory) {
                // If close initiated not by the Back button
                const urlHash = '#sirv-viewer-' + this.fullscreenViewId;
                try {
                    if ($J.W.node.location.hash === urlHash) {
                        $J.W.node.history.back();
                    }
                } catch (e) {
                    // empty
                }
            }

            this.isFullscreen = globalVariables.FULLSCREEN.CLOSED;
            this.isPseudo = false;

            if (this.selectors) {
                this.selectors.afterExitFullscreen();
            }

            /*
                this.setContainerSize(); - it must be under this.isFullscreen = globalVariables.FULLSCREEN.CLOSED; and this.selectors.afterExitFullscreen();
                because after exit from fullscreen with this options:
                {
                    thumbnails: {
                        enable: true,
                        position: 'bottom'
                    },

                    fullscreen: {
                        thumbnails: {
                            enable: false
                        },
                    }
                }
                slider container is got wrong size
            */
            this.setContainerSize();

            // this.sendStats(FULLSCREEN + 'Close', { duration: +new Date() - this.fullscreenStartTime });
            this.fullscreenStartTime = null;

            this.broadcast('after' + _FULLSCREEN + 'Out', { data: { pseudo: pseudo } });

            let eventData = {};

            if (this.enabledIndexesOfSlides.length) {
                eventData = { slide: this.slides[this.index].api };
            }
            this.sendEvent(FULLSCREEN + 'Out', eventData);
            this.onResize();
        }

        getSlide(index) {
            if (index === null || ($J.typeOf(index) === 'number' && index >= this.slides.length)) {
                index = this.index;
            }

            if ($J.typeOf(index) === 'string') {
                index = this.findSlideIndex(index);
            }

            return this.slides[index]?.api;
        }

        onResizeWithoutSelectors() {
            if (!this.destroyed) {
                // Properly handle address bar and status bar on iPhone
                // if (isHandset && $J.browser.platform === 'ios' && $J.browser.uaName === 'safari' && parseInt($J.browser.uaVersion, 10) > 10) {
                if (iPhoneSafariViewportRuler && this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                    // this.fullScreenBox.setCss({ top: Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top) });
                    this.fullScreenBox.setCss({ height: $J.W.node.innerHeight, top: Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top) });
                }

                this.setRootMargin();
                this.setContainerSize();
                this.slides.forEach((slide) => { slide.resize(); });
            }
        }

        onResize() {
            if (this.destroyed) { return; }
            // this.setContainerSize();
            if (this.selectors) { this.selectors.onResize(); }
            this.onResizeDebounce();
        }

        play(delay) {
            let result = false;
            let currentDelay = this.option('slide.delay');

            if ($J.defined(delay) && $J.typeOf(delay) === 'number' && delay > 9 /* 9 is min delay */) {
                currentDelay = delay;
            }

            if (this.autoplayTimer === null && !this.isAutoplay || currentDelay !== this.autoplayDelay) {
                this.autoplayDelay = currentDelay;
                this.isAutoplay = true;
                this.residualAutoplayTime = this.autoplayDelay;
                this.autoplay();
                result = true;
            }

            return result;
        }

        pause() {
            const result = this.autoplayTimer;
            this.isAutoplay = false;
            clearTimeout(this.autoplayTimer);
            this.autoplayTimer = null;
            this.residualAutoplayTime = this.autoplayDelay;
            return result === null;
        }

        pauseAutoplay() {
            clearTimeout(this.autoplayTimer);
            this.autoplayTimer = null;

            this.residualAutoplayTime -= ((+new Date()) - this.currentAutoplayTime);
        }

        autoplay() {
            if (this.isAutoplay) {
                this.currentAutoplayTime = +new Date();

                let delay = this.autoplayDelay;

                if (this.residualAutoplayTime !== delay) {
                    if (this.residualAutoplayTime < MIN_AUTOPLAY) {
                        delay = MIN_AUTOPLAY;
                    } else {
                        delay = this.residualAutoplayTime;
                    }
                }

                clearTimeout(this.autoplayTimer);
                this.autoplayTimer = setTimeout(() => {
                    if (!this.destroyed) {
                        this.jump('next', globalVariables.SLIDE_SHOWN_BY.AUTOPLAY);
                    }
                }, delay);
            }
        }

        destroy() {
            this.destroyed = true;
            this.onResizeDebounce.cancel();
            this.onResizeDebounce = null;

            clearTimeout(this.autoplayTimer);
            this.autoplayTimer = null;

            if (this.selectorsDebounce) {
                this.selectorsDebounce.cancel();
                this.selectorsDebounce = null;
            }

            $($J.W).removeEvent('resize', this.onResizeHandler);
            this.onResizeHandler = null;

            $($J.D).removeEvent('keyup', this.keyBoardArrowsCallback);

            if (this.inViewModule) {
                this.inViewModule.disconnect();
                this.inViewModule = null;
            }

            if (this.doHistory) {
                $($J.W).removeEvent('popstate', this.onHistoryStateChange);
                globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.splice(globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(this.fullscreenViewId), 1);
            }

            this.movingContainer.removeEvent('mouseout');
            this.slideWrapper.removeClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);

            if (this.clearingTouchdragFunction) {
                this.clearingTouchdragFunction();
            }
            this.slidesContainer.removeEvent('touchdrag');

            if (isCustomId(this.id)) {
                this.instanceNode.removeAttr('id');
            }

            if (this.contextMenu) {
                this.movingContainer.removeEvent('contextmenu');
                this.contextMenu.destroy();
                this.contextMenu = null;
            }

            if (this.productDetail) {
                this.productDetail.destroy();
                this.productDetail = null;
            }

            if (this.fullscreenButton) {
                this.fullscreenButton.removeEvent(['btnclick', 'tap']);
                this.fullscreenButton.remove();
            }
            this.fullscreenButton = null;

            if (this.effect) {
                this.effect.destroy();
                this.effect = null;
                this.on('effectStart');
                this.on('effectEnd');
            }

            if (this.arrows) {
                this.arrows.destroy();
                this.arrows = null;
                this.off('arrowAction');
            }

            if (this.selectors) {
                this.selectors.destroy();
                this.selectors = null;
                this.off('visibility');
                this.off('changeSlide');
                this.off('selectorsReady');
                this.off('getSelectorImgUrl');
                this.off('selectorsDone');
                this.off('getSelectorProportion');
            }

            this.off('componentEvent');
            this.off('goTo' + _FULLSCREEN);
            this.off('goTo' + _FULLSCREEN + 'Out');
            this.off('infoReady');
            this.off('slideVideoPlay');
            this.off('slideVideoPause');
            this.off('slideVideoEnd');

            this.slides.forEach((slide) => {
                const node = slide.originNode;
                $(node).removeClass(CSS_MAIN_CLASS + '-component');
                slide.destroy();
            });
            this.slides = [];

            this.off('stats');

            this.sliderNodes.forEach(node => this.instanceNode.append(node));
            this.sliderNodes = [];

            $($J.D).removeEvent('keydown', this.pseudoFSEvent);
            this.pseudoFSEvent = null;
            $($J.D).removeEvent('keyup', this.keyBoardArrowsCallback);
            this.keyBoardArrowsCallback = null;

            this.fullScreenBox.remove();
            this.fullScreenBox = null;
            this.controlsWrapper.remove();
            this.controlsWrapper = null;
            this.slidesContainer.remove();
            this.slidesContainer = null;
            this.selectorsWrapper.remove();
            this.selectorsWrapper = null;
            this.slideWrapper.remove();
            this.slideWrapper = null;
            this.movingContainer.remove();
            this.movingContainer = null;
            this.isReady = false;
            this.doSetSize = false;
            this.instanceNode = null;
            this.externalContainer = null;
            super.destroy();
        }
    }

    return Slider;
})();

/* eslint-env es6 */
/* global defaultOptions, SirvSlider, EventEmitter, $, $J, globalFunctions, SliderBuilder, Promise, SELECTOR_TAG */
/* eslint-disable dot-notation */
/* eslint-disable no-use-before-define */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Slider" }] */


const Slider = (() => {
    const checkArgument = (value) => {
        if ($J.typeOf(value) !== 'number' && $J.typeOf(value) !== 'string') {
            value = null;
        }

        return value;
    };

    const clearPrivateOptions = (obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            value = $(value.split(';'));
            if (value.length) {
                if (value[value.length - 1] === '') { value.splice(value.length - 1, 1); }
                value = value.map((_value) => {
                    return _value.replace(new RegExp('^' + key + '\\.'), '');
                });

                obj[key] = value.join(';');
            }
        });

        return obj;
    };

    const getOptions = (source, opt) => {
        const optType = $J.typeOf(opt);
        let value;
        let result = null;

        if (optType === 'string') {
            result = source[opt];
        } else if (optType === 'array') {
            value = opt.shift();
            if (source[value]) {
                if (opt.length) {
                    result = getOptions(source[value], opt);
                } else {
                    result = source[value];
                }
            }
        }

        return result;
    };

    const getOptionsByType = (options, oType, def) => {
        return {
            common: getOptions(options.common, oType) || def,
            mobile: getOptions(options.mobile, oType) || def
        };
    };

    const removeProperties = (obj) => {
        const rm = (_obj) => {
            ['spin', 'zoom', 'image', 'video'].forEach((v) => {
                if (_obj[v]) {
                    delete _obj[v];
                }
            });
        };

        rm(obj.common);
        rm(obj.mobile);
    };

    class Slider_ extends EventEmitter {
        constructor(node, options, force, lazyInit) {
            super();

            this.node = node;
            this.slider = null;
            this.lazyInit = lazyInit;

            this.options = {};
            this.spinOptions = {};
            this.zoomOptions = {};
            this.imageOptions = {};
            this.videoOptions = {};

            this.sliderBuilder = new SliderBuilder(options, this.node);

            this.parseOptions(options);

            this.privateOptions = { common: {}, mobile: {} };

            this.toolOptions = null;
            this.inViewTimer = null;
            this.isRun = false;

            this.api = {
                isReady: this.isReady.bind(this),
                // start: this.start.bind(this),
                // stop: this.stop.bind(this),
                items: this.items.bind(this),
                disableItem: this.disableItem.bind(this),
                enableItem: this.enableItem.bind(this),
                enableGroup: this.enableGroup.bind(this),
                disableGroup: this.disableGroup.bind(this),
                switchGroup: this.switchGroup.bind(this),
                insertItem: this.insertItem.bind(this),
                removeItem: this.removeItem.bind(this),
                removeAllItems: this.removeAllItems.bind(this),
                jump: this.jump.bind(this),
                itemsCount: this.itemsCount.bind(this),
                next: this.next.bind(this),
                prev: this.prev.bind(this),
                isFullscreen: this.isFullscreen.bind(this),
                fullscreen: this.fullscreen.bind(this),
                child: this.child.bind(this),
                play: this.play.bind(this),
                pause: this.pause.bind(this),
                sortItems: this.sortItems.bind(this)
            };

            this.on('viewerPublicEvent', (e) => {
                Object.assign(e.data.slider, this.api);

                if (e.data.slide) {
                    e.data.slide.parent = () => { return this.api; };
                    if (e.data.slide[e.data.slide.component]) {
                        e.data.slide[e.data.slide.component].parent = () => { return e.data.slide; };
                    }
                }
            });

            this.makeOptions();

            const as = this.toolOptions.get('autostart');

            if (as && as !== 'off' || force) {
                this.run();
            }
        }

        parseOptions(options) {
            const viewer = 'viewer';
            const spin = 'spin';
            const zoom = 'zoom';
            const image = 'image';
            const video = 'video';
            const common = options.common;
            const mobile = options.mobile;

            this.options = getOptionsByType(options, viewer, {});

            this.spinOptions = {
                common: getOptions(common, [viewer, spin]) || getOptions(common, spin) || {},
                mobile: getOptions(mobile, [viewer, spin]) || getOptions(mobile, spin) || {}
            };
            this.zoomOptions = {
                common: getOptions(common, [viewer, zoom]) || getOptions(common, zoom) || {},
                mobile: getOptions(mobile, [viewer, zoom]) || getOptions(mobile, zoom) || {}
            };
            this.imageOptions = {
                common: getOptions(common, [viewer, image]) || getOptions(common, image) || {},
                mobile: getOptions(mobile, [viewer, image]) || getOptions(mobile, image) || {}
            };
            this.videoOptions = {
                common: getOptions(common, [viewer, video]) || getOptions(common, video) || {},
                mobile: getOptions(mobile, [viewer, video]) || getOptions(mobile, video) || {}
            };

            removeProperties(this.options);
        }

        getSlideOptions() {
            const spin = getOptionsByType(this.privateOptions, 'spin', '');
            const zoom = getOptionsByType(this.privateOptions, 'zoom', '');
            const image = getOptionsByType(this.privateOptions, 'image', '');
            const video = getOptionsByType(this.privateOptions, 'video', '');

            return {
                spin: {
                    common: this.spinOptions,
                    local: spin
                },
                zoom: {
                    common: this.zoomOptions,
                    local: zoom
                },
                image: {
                    common: this.imageOptions,
                    local: image
                },
                video: {
                    common: this.videoOptions,
                    local: video
                }
            };
        }

        makeOptions() {
            const exclude = {
                spin: /^spin/,
                zoom: /^zoom/,
                image: /^image/,
                video: /^video/
            };

            this.toolOptions = new $J.Options(defaultOptions);
            this.toolOptions.fromJSON(this.options.common);

            this.privateOptions.common = this.toolOptions.fromString(this.node.attr('data-options') || '', exclude);
            this.privateOptions.common = clearPrivateOptions(this.privateOptions.common);

            if ($J.browser.touchScreen && $J.browser.mobile) {
                this.toolOptions.fromJSON(this.options.mobile);
                this.privateOptions.mobile = this.toolOptions.fromString(this.node.attr('data-mobile-options') || '', exclude);
                this.privateOptions.mobile = clearPrivateOptions(this.privateOptions.mobile);
            }
        }

        createSlider(content) {
            this.slider = new SirvSlider(this.node, {
                options: this.toolOptions,
                slideOptions: this.getSlideOptions(),
                lazyInit: this.lazyInit,
                viewerFileContent: content
            });

            this.slider.parentClass = this;
            this.api.id = this.slider.id;
        }

        run(force) {
            this.isRun = true;
            this.sliderBuilder.getOptions()
                .then((data) => {
                    this.parseOptions(data.dataOptions);
                    if (force) { this.makeOptions(); }

                    if (data.content) {
                        this.createSlider(data.content);
                    } else {
                        this.sliderBuilder.buildViewer().then((data2) => {
                            this.node = data2.mainNode;
                            this.createSlider();
                        });
                    }
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log('Sirv: cannot get view from ' + error.error);
                });

            return true;
        }

        isReady() {
            let result = false;

            if (this.slider) {
                result = this.slider.isReady;
            }

            return result;
        }

        isFullscreen() {
            let result = false;

            if (this.isReady()) {
                result = (this.slider.isFullscreen === 2);
            }

            return result;
        }

        startFullInit(options, force, lazyInit) {
            let as;

            if (this.slider) {
                this.lazyInit = lazyInit;

                this.parseOptions(options);
                this.makeOptions();

                as = this.toolOptions.get('autostart');
                if (as && as !== 'off' || force) {
                    this.slider.startFullInit({
                        options: this.toolOptions,
                        slideOptions: this.getSlideOptions(),
                        lazyInit: this.lazyInit
                    });
                }
            }
        }

        start() {
            let result = false;

            if (!this.slider) {
                result = this.run(true);
            }

            return result;
        }

        stop() {
            let result = false;

            if (this.slider) {
                result = true;
                this.slider.destroy();
                this.slider = null;
                this.off('viewerPublicEvent');
                this.isRun = false;
                this.sliderBuilder.destroy();
                this.sliderBuilder = null;
                this.destroy();
            }

            return result;
        }

        insertItem(htmlSlide, indexOfSlide) {
            let result = false;

            if (this.isReady()) {
                if ($J.typeOf(htmlSlide) === 'string') {
                    const div = $J.$new('div');
                    div.node.innerHTML = htmlSlide.trim();
                    htmlSlide = div.node.firstChild;

                    if (htmlSlide && (htmlSlide.nodeType === 3 || htmlSlide.nodeType === 8 || !['div', 'img', SELECTOR_TAG].includes($(htmlSlide).tagName))) {
                        htmlSlide = null;
                    }
                } else if ($(htmlSlide).tagName === SELECTOR_TAG) {
                    const div = $J.$new('div');
                    div.append(htmlSlide);
                    htmlSlide = div.node;
                }

                result = this.slider.insertSlide(indexOfSlide, htmlSlide);
            }

            return result;
        }

        removeItem(indexOfSlide) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.removeSlide(indexOfSlide);
            }

            return result;
        }

        removeAllItems() {
            let result = true;

            if (this.isReady()) {
                for (let i = this.itemsCount() - 1; i >= 0; i--) {
                    const r = this.removeItem(i);
                    if (result) {
                        result = r;
                    }
                }
            } else {
                result = false;
            }

            return result;
        }

        itemsCount(settings) {
            let result = 0;

            if (this.isReady()) {
                const items = this.items(settings);

                if (items !== null) {
                    result = items.length;
                }
            }

            return result;
        }

        items(settings) {
            let result = null;

            if (this.isReady()) {
                result = this.slider.getItems(settings);
                result.forEach((item) => {
                    item.parent = () => { return this.api; };
                });
            }

            return result;
        }

        disableItem(indexOfSlide) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.disableSlide(indexOfSlide);
            }

            return result;
        }

        enableItem(indexOfSlide) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.enableSlide(indexOfSlide);
            }

            return result;
        }

        enableGroup(group) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.enableGroupOfSlides(group);
            }

            return result;
        }

        disableGroup(group) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.disableGroupOfSlides(group);
            }

            return result;
        }

        switchGroup(group) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.switchGroupOfSlides(group);
            }

            return result;
        }

        jump(indexOfSlide) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.jump(indexOfSlide);
            }

            return result;
        }

        next() {
            let result = false;

            if (this.isReady()) {
                result = this.slider.jump('next');
            }

            return result;
        }

        prev() {
            let result = false;

            if (this.isReady()) {
                result = this.slider.jump('prev');
            }

            return result;
        }

        fullscreen() {
            let result = false;

            if (this.isReady()) {
                if (this.isFullscreen()) {
                    result = this.slider.exitFullScreen();
                } else {
                    result = this.slider.enterFullScreen();
                }
            }

            return result;
        }

        child(numberOfSlide) {
            let result = null;

            if (this.isReady()) {
                numberOfSlide = checkArgument(numberOfSlide);
                result = this.slider.getSlide(numberOfSlide);

                if (result) {
                    result.parent = () => { return this.api; };
                }
            }

            return result;
        }

        play(delay) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.play(delay);
            }

            return result;
        }

        pause() {
            let result = false;

            if (this.isReady()) {
                result = this.slider.pause();
            }

            return result;
        }

        sortItems(order) {
            if (this.isReady()) {
                this.slider.sortItems(order);
            }
        }

        isEqual(node) {
            return node === this.node;
        }

        checkReadiness(eventname, component) {
            let result = false;

            if (this.isReady()) {
                result = this.slider.checkReadiness(eventname, component);
            }

            return result;
        }

        sendEvent(eventname, component) {
            if (this.isReady()) {
                this.slider.sendReadyEvent(eventname, component);
            }
        }
    }

    return Slider_;
})();

return Slider;

    }
);
