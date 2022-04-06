Sirv.define(
    'LazyImage',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','Promise!','ResponsiveImage','BaseInstance','getDPPX'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,Promise,ResponsiveImage,BaseInstance,getDPPX) => {
        const moduleName = 'LazyImage';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* eslint-disable no-extra-semi */
/* eslint-disable no-unused-vars */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

const defaultOptions = {
    resize: { type: 'boolean', defaults: true },

    // A distance from the viewport within which images should be loaded.
    threshold: { type: 'number', minimum: 0, defaults: 0 },
    fit: { type: 'string', 'enum': ['contain', 'cover', 'crop', 'none'], defaults: 'contain' },

    // Quality applied to images (1x - 1.49x).
    quality: { type: 'number', minimum: 0, maximum: 100, defaults: 80 },
    // Quality applied to hi-res images (1.5x - 2x).
    hdQuality: { type: 'number', minimum: 0, maximum: 100, defaults: 60 },

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

    onReady: { type: 'function', defaults: () => {} }
};


/*
    image without slider

    If image is as background
    background-size: auto;
    background-size: contain;
    background-size: cover;
    background-size: 100px;
    background-size: 50%;
    background-size: 100px, 150px;
*/

/* eslint-env es6 */
/* eslint-disable no-unused-vars */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


class Appearance {
    constructor(node) {
        this.node = $(node);
        this.state = 0; // 0 - nothing, 1 - before loading image, 2 - after loading high quality image
        this.states = $(['sirv-image-loading', 'sirv-image-loaded']);
    }

    setState(numberOfState) {
        if (this.state !== numberOfState) {
            if (this.state - 1 >= 0) {
                this.node.removeClass(this.states[this.state - 1]);
            }
            this.state = numberOfState;
            this.node.addClass(this.states[numberOfState - 1]);
        }
    }

    destroy() {
        this.state = 0;

        this.states.forEach((className) => {
            this.node.removeClass(className);
        });

        this.node = null;
    }
}

/* eslint-env es6 */
/* global BaseInstance */
/* global ResponsiveImage */
/* global helper */
/* global globalFunctions */
/* global globalVariables */
/* global Appearance */
/* global getDPPX */
/* global defaultOptions */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["_imageOnerrorHandler", "_setHDQuality"] }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "LazyImage" }] */


// const calcCropPositionForBGImage = (position, nodeSize, originImageSize) => {
//     let result = helper.round((originImageSize - nodeSize) / 100 * position);
//     if (result < 0) { result = 0; }
//     return result;
// };

const P = globalVariables.PREFIX;

const inView = (node) => {
    var rect = node.getBoundingClientRect();
    return !(rect.top === 0 && rect.right === 0  && rect.bottom === 0 && rect.left === 0 && rect.width === 0 && rect.height === 0); // hidden
};

class LazyImage extends BaseInstance {
    constructor(node, options, force) {
        options.options = {
            common: { common: options.options.common, mobile: {} },
            local: { common: '', mobile: '' }
        };

        super(node, options, defaultOptions);

        this.node = this.instanceNode;
        this.type = globalVariables.SLIDE.TYPES.IMAGE;
        this.isLazy = this.option('autostart') === 'visible';
        this.image = null;
        this.isInfoLoaded = false;
        this.infoSize = { width: 0, height: 0 };
        this.isNotSirv = false;
        this.isInView = false;
        this.isStaticImage = false;
        this.dppx = 1;
        this.getImageInfoPromise = null;
        this.loadStaticImagePromise = null;
        this.upscale = false;
        this.size = { width: 0, height: 0 };
        this.maxSize = {};
        this.lastImageSize = { width: 0, height: 0 };
        this.srcWasSetted = false;
        this.originAlt = null;
        this.infoAlt = null;
        this.originTitle = null;
        this.src = null;
        this.srcset = null;
        this.startedSrc = null;
        this.dataSrc = null;
        this.imageUrl = null;
        this.dontLoad = true;

        this.appearanceState = null;
        this.dataBgSrc = null;
        this.inViewModule = null;
        this.rootMargin = 0;
        this.fitSize = null;
        this.backgroundNodeSize = null;
        this.isMaxWidthSet = false;
        this.cropPosition = { x: null, y: null };
        this.cssBackgroundSize = null;
        this.isPlaceholder = false;
        this.isRun = false;
        this.inited = false;

        this.resizeDebounce = helper.debounce(() => {
            this._setRootMargin();
            this.onResize();
        }, 50);

        this.resizeHandler = (e) => { this.resizeDebounce(); };

        const as = this.instanceOptions.get('autostart');

        if (as && as !== 'off' || force) {
            this.preInit();
        }
    }

    preInit() {
        this.isRun = true;
        this.inViewModule = new helper.InViewModule((entries) => {
            entries.forEach((entry) => {
                // https://github.com/verlok/vanilla-lazyload/issues/293#issuecomment-469100338
                // Sometimes 'intersectionRatio' can be 0 but 'isIntersecting' is true
                const iv = entry.isIntersecting || entry.intersectionRatio > 0;

                if (this.isInView !== iv) {
                    if (!this.inited) {
                        this.isInView = iv;
                        if (iv) {
                            this.init();
                        } else if (inView(this.instanceNode.node)) {
                            this.init();
                        }
                    } else {
                        this.inViewCallback(iv);
                    }
                }
            });
        }, {
            rootMargin: this.rootMargin + 'px 0px'
        });

        this.inViewModule.observe(this.instanceNode);

        if (inView(this.instanceNode.node)) {
            this.init();
        }
    }

    init() {
        this.inited = true;
        try {
            this.maxWidth = this.instanceNode.node.style.maxWidth;
        } catch (ex) { /* empty */ }

        this._getBaseData();

        if (this.imageUrl && ($J.browser.ready || $J.D.node.readyState !== 'loading')) {
            this.startFullInit();
        }

        this.createSirvImage();
    }

    stop() {
        this.destroy();
        return true;
    }

    getOptionsForStartFullInit(options) {
        if (options) {
            options = {
                common: { common: options.common.lazyImage, mobile: options.mobile.lazyImage },
                local: { common: '', mobile: '' }
            };
        }

        super.getOptionsForStartFullInit(options);
    }

    checkReadiness(eventname, component) {
        if (eventname === 'onLoad') {
            return this._isReady;
        }

        return false;
    }

    _setRootMargin() {
        let value = parseInt(this.option('threshold'), 10);

        if ($J.typeOf(this.option('threshold')) === 'string') {
            value = ($J.W.node.innerHeight || $J.D.node.documentElement.clientHeight) / 100 * value; // eslint-disable-line operator-assignment
        }

        this.rootMargin = value;
    }

    _getQueryParams() {
        if (this.imageUrl) {
            this.queryParams = helper.paramsFromQueryString(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2'));
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

    _getBaseData() {
        this.originAlt = this.instanceNode.attr('alt');
        this.originTitle = this.instanceNode.attr('title');

        this.src = this.instanceNode.attr('src');
        this.srcset = this.instanceNode.attr('srcset');
        this.startedSrc = this.src;
        this.dataSrc = this.instanceNode.attr('data-src');

        this.isStaticImage = (this.src && !this.dataSrc);
        this.imageUrl = this.dataSrc || this.src;

        if (helper.isSVG(this.imageUrl) || this.instanceNode.attr('data-type') === 'static') {
            this.isNotSirv = true;
        }

        this.dataBgSrc = this.instanceNode.attr('data-bg-src');
        this.isStaticImage = this.isStaticImage && !this.dataBgSrc;

        this.imageUrl = this.dataBgSrc || this.imageUrl;

        if (this.instanceNode.getTagName() === 'img') {
            this.instanceNode.attr('referrerpolicy', this.referrerPolicy);

            if (this.dataBgSrc) {
                if (!this.dataSrc) {
                    this.dataSrc = this.dataBgSrc;
                }
                this.dataBgSrc = null;
            }
        }

        if (this.dataBgSrc) {
            this.dontLoad = false;
        }

        if (this.imageUrl) {
            // Image URL
            this.src = globalFunctions.normalizeURL(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
        }

        // Image default params
        this._getQueryParams();

        if (this.startedSrc && this.dataSrc && this.startedSrc !== this.dataSrc) {
            this.isPlaceholder = this.instanceNode.attr('src');
        }
    }

    createSirvImage() {
        if (!this.imageUrl || this.isNotSirv) { return; }

        this.on('imageOnload', (e) => {
            e.stopAll();

            this.replaceSrc();
            if (!this._isReady) {
                if (this.isStaticImage) {
                    this.done();
                } else {
                    const showImage = () => {
                        if (this.appearanceState) {
                            this.appearanceState.setState(2);
                            this.done();
                        }
                    };

                    if (e.data.node) {
                        showImage();
                    } else {
                        helper.loadImage(this.instanceNode).finally(() => {
                            showImage();
                        });
                    }
                }
            }
        });

        this.on('imageOnerror', (e) => {
            e.stopAll();
            console.log('image error');
        });

        this.image = new ResponsiveImage(this.imageUrl, {
            imageSettings: this.queryParams,
            round: true,
            dontLoad: this.dontLoad,
            convertSmallerSideToZero: this.option('fit') !== 'crop',
            referrerPolicy: this.referrerPolicy
        });
        this.image.setParent(this);
        this.getInfoSize()
            .catch((err) => {
                if (err._isplaceholder) {
                    this.infoSize = err;
                    this.isNotSirv = true;
                }
            })
            .finally(() => {
                if ($J.D.node.readyState !== 'loading') {
                    if (this.isStartedFullInit) {
                        this.run();
                    }
                }
            });
    }

    getInfoSize() {
        if (!this.getImageInfoPromise) {
            this.getImageInfoPromise = new Promise((resolve, reject) => {
                if (this.image) {
                    this.image.getImageInfo()
                        .then((info) => {
                            this.isInfoLoaded = true;
                            this.infoAlt = this.image.getDescription();
                            this.infoSize = this.image.getOriginSize();
                            this.cropPosition = this.image.getCropPosition();
                            resolve(info);
                        })
                        .catch((err) => {
                            this.isInfoLoaded = true;
                            if (!err.status || err.status !== 404) {
                                this.isNotSirv = true;
                            }
                            reject(err);
                        });
                } else {
                    reject();
                }
            });
        }

        return this.getImageInfoPromise;
    }

    getId(idPrefix, df) {
        this.id = this.instanceNode.attr('id');

        if (!this.id && !this.isStaticImage) {
            super.getId(idPrefix, df);
        }
    }

    startFullInit(options, force) {
        if (this.isStartedFullInit || !this.inited) { return; }
        this.getOptionsForStartFullInit(options);

        const as = this.option('autostart');
        if (!this.inited && !(as && as !== 'off' || force)) { return; }

        super.startFullInit(options);

        if (options) {
            this.isLazy = this.option('autostart') === 'visible';
        }

        this.getId('responsive-image-', ' ');

        if (this.dataBgSrc) {
            this.cssBackgroundSize = helper.imageLib.getBackgroundSize(this.instanceNode);
            if (this.cssBackgroundSize) {
                this.option('fit', 'none');
            }
            this.instanceNode.addClass(P + '-bg-image');
            if (this.option('fit') !== 'none') {
                if (this.option('fit') === 'contain') {
                    this.instanceNode.addClass(P + '-bg-contain');
                } else {
                    this.instanceNode.addClass(P + '-bg-cover');
                }
            }
        }

        this._setRootMargin();

        if (this.isStaticImage) {
            this.isLazy = false;
        } else {
            this.appearanceState = new Appearance(this.instanceNode);
            if (!this.isPlaceholder) {
                this.appearanceState.setState(1);
            }
        }

        if (!this.isLazy) {
            this.isInView = true;
            this.inViewModule.disconnect();
            this.inViewModule = null;
        }

        if (this.isInfoLoaded || this.isNotSirv) {
            if ($J.D.node.readyState !== 'loading') {
                this.run();
            }
        }

        $J.W.addEvent('resize', this.resizeHandler);
    }

    fixHeight(height) {
        if (height !== 0) {
            const blockSize = parseInt(this.instanceNode.getCss('block-size'), 10);

            if (height === blockSize || height <= 16) {
                height = 0;
            }
        }

        return height;
    }

    run() {
        const result = super.run();

        if (result) {
            // Remove ALT to properly calculate image size.
            // Safari and Edge/IE return image size with a height if ALT text is present.
            this.instanceNode.removeAttr('alt');
            // Remove TITLE to properly calculate image size.
            // The latest version(s) of Chrome returns image size with a height if TITLE is set.
            this.instanceNode.removeAttr('title');

            // This force browsers to re-layout image and recalculate its dimensions.
            this.instanceNode.setCss({ display: 'inline-flex' }).getSize();
            this.instanceNode.setCss({ display: '' }).getSize();

            let size = null;

            helper.imageLib.getSize(this.instanceNode)
                .then((dataSize) => { size = dataSize; })
                .finally(() => {
                    if (this.destroyed) { return; }
                    size = helper.fixSize(this.instanceNode, size);

                    // if (this.dataBgSrc) {
                    //     this.fitSize = helper.imageLib.getBackgroundSize(this.instanceNode);
                    // }
                    if (size.width === 0 && size.height === 0) {
                        this.instanceNode.setCss({ width: '100%' });
                        size.width = this.instanceNode.getSize().width;
                    }

                    if (size.width === 0 && size.height === 0) {
                        size.width = $J.W.node.innerWidth;
                    }

                    if (this.option('fit') === 'contain') {
                        this.fitSize = { width: 'contain', height: 'contain' };
                    } else {
                        this.fitSize = { width: 'cover', height: 'cover' };
                    }

                    if (this.option('fit') === 'none') {
                        if (this.cssBackgroundSize) {
                            this.size = helper.imageLib.calcProportionalBackgroundSize(this.cssBackgroundSize, this.infoSize);
                        } else {
                            this.size = this.infoSize;
                        }
                    } else {
                        this.size = helper.imageLib.calcProportionSize(size, this.infoSize, this.fitSize);
                    }

                    if (!this.dataBgSrc) {
                        // Set the max-width to prevent image stretching beyond its original maximum width
                        const objectFit = this.instanceNode.getCss('objectFit');
                        if (!this.maxWidth && this.infoSize.width > 0 && ((!objectFit || objectFit === 'fill') && !this.instanceNode.attr('width'))) {
                            this.isMaxWidthSet = true;
                            this.instanceNode.setCss({ maxWidth: this.infoSize.width });
                        }
                    }

                    if (this.originAlt || this.infoAlt) { // Restore ALT text
                        this.instanceNode.attr('alt', this.originAlt || this.infoAlt);
                    }
                    if (this.originTitle) { // Restore TITLE text
                        this.instanceNode.attr('title', this.originTitle);
                    }

                    if (this.isStaticImage) {
                        this.loadStaticImage().finally(() => {
                            if (this.isInfoLoaded) {
                                this.done();
                            }
                        });
                    } else if (!this.isLazy || this.isInView) {
                        this.getImage();
                    }
                });
        }

        return result;
    }

    _setSrc(src, srcset) {
        if (this.dataBgSrc) {
            this.instanceNode.setCss({
                backgroundImage: 'url("' + (srcset || src) + '")'
            });
        } else {
            this.instanceNode.attr('src', src);

            if (srcset) {
                if (!this.isNotSirv && this.dppx > 1) {
                    this.instanceNode.attr('srcset', srcset + ' ' + this.dppx + 'x');
                }
            } else {
                this.instanceNode.removeAttr('srcset');
            }
        }
    }

    _setHDQuality(opt) {
        if (opt.dppx > 1 && opt.dppx < 1.5) {
            const quality = this.instanceOptions.isset('quality') ? this.option('quality') : null;
            if (this.queryParamsQuality === null && quality !== null) {
                opt.srcset.quality = quality;
            } else if (opt.srcset) {
                delete opt.srcset.quality;
            }
        }

        return opt;
    }

    replaceSrc() {
        let img;

        if (this.isNotSirv) {
            if (this.srcWasSetted) { return; }
            this.srcWasSetted = true;
            img = { src: this.imageUrl };
        } else {
            let opt = this._getImageCreateSettings();

            if (opt.dppx > 1 && opt.dppx < 1.5) {
                delete opt.srcset.quality;
            }

            opt = this._setHDQuality(opt);

            img = this.image.getImage(opt);

            this.lastImageSize.width = img.width || img.serverWidth;
            this.lastImageSize.height = img.height || img.serverHeight;
        }

        this._setSrc(img.src, img.srcset);
    }

    loadStaticImage() {
        if (!this.loadStaticImagePromise) {
            this.loadStaticImagePromise = new Promise((resolve, reject) => {
                if (this.isStaticImage) {
                    if (this.instanceNode.node.complete) {
                        resolve();
                    } else {
                        this.instanceNode.addEvent('load', (e) => {
                            resolve();
                        });

                        this.instanceNode.addEvent('error', (e) => {
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

    _getImageCreateSettings() {
        let setts = { src: {}, srcset: {} };

        const quality = this.instanceOptions.isset('quality') ? this.option('quality') : null;

        if (quality !== null && this.queryParamsQuality === null) {
            setts.src.quality = quality;
        }

        const hdQuality = this.option('hdQuality');

        if (this.queryParamsQuality === null || this.instanceOptions.isset('hdQuality') && hdQuality < this.queryParamsQuality) {
            setts.srcset = { quality: hdQuality };
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

        if (this.option('fit') === 'crop') {
            setts.round = false;
        }

        // if (this.dataBgSrc && this.option('fit') === 'crop') {
        //     this.backgroundNodeSize = this.instanceNode.getSize();
        //     let crop = null;
        //     let cropX2 = null;
        //     // const roundedSize = ResponsiveImage.roundImageSize(this.size);
        //     const roundedSize = this.size;
        //     const originSize = this.image.getOriginSize();
        //     const dppx = getDPPX(roundedSize.width, roundedSize.height, originSize.width, originSize.height, (!$J.defined(setts.round) || setts.round), this.upscale);

        //     if (!this.cropPosition.type) {
        //         if (this.backgroundNodeSize.width < roundedSize.width) {
        //             if (!crop) { crop = {}; cropX2 = {}; }
        //             // crop.x = calcCropPositionForBGImage(50, this.backgroundNodeSize.width, roundedSize.width);
        //             crop.x = calcCropPositionForBGImage(this.cropPosition.x ? parseFloat(this.cropPosition.x) : 50, this.backgroundNodeSize.width, roundedSize.width);
        //             // cropX2.x = calcCropPositionForBGImage(50, this.backgroundNodeSize.width * setts.dppx, roundedSize.width * dppx);
        //             cropX2.x = calcCropPositionForBGImage(this.cropPosition.x ? parseFloat(this.cropPosition.x) : 50, this.backgroundNodeSize.width * setts.dppx, roundedSize.width * dppx);
        //             crop.width = this.backgroundNodeSize.width;
        //             cropX2.width = this.backgroundNodeSize.width * dppx;
        //         }

        //         if (this.backgroundNodeSize.height < roundedSize.height) {
        //             if (!crop) { crop = {}; cropX2 = {}; }
        //             // crop.y = calcCropPositionForBGImage(50, this.backgroundNodeSize.height, roundedSize.height);
        //             crop.y = calcCropPositionForBGImage(this.cropPosition.y ? parseFloat(this.cropPosition.y) : 50, this.backgroundNodeSize.height, roundedSize.height);
        //             // cropX2.y = calcCropPositionForBGImage(50, this.backgroundNodeSize.height * setts.dppx, roundedSize.height * dppx);
        //             cropX2.y = calcCropPositionForBGImage(this.cropPosition.y ? parseFloat(this.cropPosition.y) : 50, this.backgroundNodeSize.height * setts.dppx, roundedSize.height * dppx);
        //             crop.height = this.backgroundNodeSize.height;
        //             cropX2.height = this.backgroundNodeSize.height * dppx;
        //         }

        //         if (crop) {
        //             if (!setts.src) { setts.src = {}; }
        //             setts.src.crop = crop;
        //             if (!setts.srcset) { setts.srcset = {}; }
        //             setts.srcset.crop = cropX2;
        //         }
        //     }
        // }

        setts = this.setCrop(setts);

        return setts;
    }

    setCrop(setts) {
        if (this.option('fit') === 'crop') {
            const size = $(this.instanceNode.node).getInnerSize(!!this.dataBgSrc);

            if (!setts.imageSettings) { setts.imageSettings = {}; }
            if (!setts.imageSettings.crop) { setts.imageSettings.crop = {}; }
            setts.imageSettings.crop = {
                x: this.cropPosition.x || 'center',
                y: this.cropPosition.y || 'center',
                width: size.width,
                height: size.height
            };
        }

        return setts;
    }

    getImage() {
        if (this.isStaticImage) { return; }

        if (this.isNotSirv) {
            this.getNonSirvImg();
        } else {
            this.getSirvImg();
        }
    }

    getNonSirvImg() {
        if (this.isPlaceholder) {
            helper.loadImage(this.dataSrc).finally(() => {
                this.replaceSrc();
                this.appearanceState.setState(2);
                this.done();
            });
        } else {
            this.replaceSrc();
            this.appearanceState.setState(2);
            this.done();
        }
    }

    getImageClassContainer() {
        return this.image;
    }

    getSirvImg() {
        let setts = this._getImageCreateSettings();

        if (setts.width) {
            this.maxSize.width = setts.width;
        }

        if (setts.height) {
            this.maxSize.height = setts.height;
        }

        if ($J.DPPX > 1) {
            const originSize = this.image.getOriginSize();
            this.dppx = getDPPX(setts.width, setts.height, originSize.width, originSize.height, (!$J.defined(setts.round) || setts.round), this.upscale);
            setts.dppx = this.dppx;
        }

        setts = this._setHDQuality(setts);

        if (this.checkImage(setts)) {
            this.replaceSrc();
        } else {
            this.image.getImage(setts);
        }
    }

    checkSize(size) {
        const w = this.infoSize.width;
        const h = this.infoSize.height;

        if (size.width > w || size.height > h) {
            size.width = w;
            if (size.height) {
                size.height = h;
            }
            size.round = false;
        }

        return size;
    }

    done() {
        super.done();

        // if (!this.dataBgSrc) {
        //     this.instanceNode.setCss({ width: '', height: '' });
        // }

        this.option('onReady')(this.id);
        this.sendEvent('ready');
    }

    inViewCallback(value) {
        if (value && !this.isStaticImage) {
            if (!this._isReady && !this.isInView) {
                if (this.isStarted) {
                    this.isInView = true;
                    if (this.isNotSirv) {
                        if (!this.srcWasSetted) {
                            this.getImage();
                        }
                    } else if (this.isInfoLoaded) {
                        this.getImage();
                    }
                }
            }
        }

        this.isInView = value;
    }

    sendEvent(nameOfEvent, data) {
        /*
            image events: [
                'ready',
            ]
        */

        if (!data) { data = {}; }
        if (!data.image) { data.image = {}; }
        if (!data.image.event) { data.image.event = {}; }

        if (nameOfEvent === 'ready') {
            nameOfEvent = 'onLoad';
        }

        data.type = nameOfEvent;
        data.image.id = this.id;
        data.image.url = this.instanceUrl;
        $J.extend(data.image, this.api);

        data.node = this.instanceNode;
        data.image.node = this.instanceNode.node;

        data.image.event.timestamp = +(new Date());
        data.image.event.type = 'lazyimage:' + nameOfEvent;

        this.emit('imagePublicEvent', { data: data });
    }

    getOriginImageUrl() {
        return this.src;
    }

    onResize() {
        if (!this.isStarted || this.isStaticImage || !this.option('resize') || this.isNotSirv) { return false; }

        let size;

        if ($J.contains(['crop', 'cover'], this.option('fit'))) {
            size = $(this.instanceNode.node.parentNode).getSize();
        } else {
            size = this.instanceNode.getSize();
            // sometimes before the image appear in view the resize event can work and size of height of this image is 16px on android in chrome
            size.height = this.fixHeight(size.height);
        }

        size = helper.imageLib.calcProportionSize(size, this.infoSize, this.fitSize);

        this.size.width = size.width;
        if (this.size.height) {
            this.size.height = size.height;
        }

        if (this._isReady && !this.isNotSirv) {
            const upscale = 50;
            if (this.option('fit') === 'crop') {
                if (Math.abs(this.size.width - this.lastImageSize.width) > upscale || Math.abs(this.size.height - this.lastImageSize.height) > upscale) {
                    this.getImage();
                }
            } else if (this.size.width - this.lastImageSize.width > upscale || this.size.height - this.lastImageSize.height > upscale) {
                this.getImage();
            }
        }

        return true;
    }

    destroy() {
        if (this.dataBgSrc) {
            this.instanceNode.removeClass(P + '-bg-image');
            this.instanceNode.setCssProp('background-image', '');
        }

        if (this.isMaxWidthSet) {
            this.isMaxWidthSet = false;
            this.instanceNode.setCss({ maxWidth: '' });
        }

        if (this.appearanceState) {
            this.appearanceState.destroy();
        }

        if (this.inViewModule) {
            this.inViewModule.disconnect();
            this.inViewModule = null;
        }

        $J.W.removeEvent('resize', this.resizeHandler);
        this.resizeDebounce.cancel();
        this.resizeDebounce = null;

        if (this.image) {
            this.off('imageOnload');
            this.off('imageOnerror');
            this.image.destroy();
            this.image = null;
        }

        if (this.instanceNode.node.hasAttribute('src')) {
            try {
                this.instanceNode.removeAttr('src');
                if (this.isStaticImage) {
                    this.instanceNode.attr('src', this.imageUrl);
                }
            } catch (e) {
                // empty
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
            } catch (e) {
                // empty
            }
        }
        this.srcset = null;

        if (!this.originAlt && this.infoAlt) {
            this.instanceNode.removeAttr('alt');
        }

        this.instanceNode.removeEvent('load');

        if (this.isPlaceholder) {
            this.instanceNode.attr('src', this.isPlaceholder);
            this.isPlaceholder = false;
        }

        super.destroy();
    }
}

return LazyImage;

    }
);
