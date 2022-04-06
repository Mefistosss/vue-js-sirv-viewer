Sirv.define(
    'ResponsiveImage',
    ['bHelpers','magicJS','globalVariables','globalFunctions','Promise!','helper','EventEmitter'],
    (bHelpers,magicJS,globalVariables,globalFunctions,Promise,helper,EventEmitter) => {
        const moduleName = 'ResponsiveImage';
        
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
    if ((new URL(url)).origin !== $J.W.location.origin) {
        img.crossOrigin = '';
    }
};

const getUrl = (url, settings) => {
    // let result = url + ('?' + paramsToQueryString(settings).replace(/(?:\?|&)profile\=$/, ''));
    let result = url + ('?' + helper.paramsToQueryString(settings));
    result = helper.cleanQueryString(result);
    return result;
};

// eslint-disable-next-line no-unused-vars
class _Image {
    constructor(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy) {
        this.name = name;
        this.state = 0; // not-loaded = 0, loading = 1, loaded = 2, error = 3
        this.imageNode = null;
        this.size = { width: 0, height: 0 };
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

        this.src = getUrl(url, srcSettings);

        this.srcset = null;
        if (srcsetSettings) {
            this.srcset = getUrl(url, srcsetSettings.settings);
        }
    }

    load() {
        return new Promise((resolve, reject) => {
            if (this.dontLoad) {
                resolve(this);
            } else if (!this.state) {
                this.state = 1;

                this.imageNode = $(new Image());
                this.imageNode.attr('referrerpolicy', this.referrerPolicy || 'no-referrer-when-downgrade');

                this.imageNode.addEvent('load', (e) => {
                    e.stop();
                    this.state = 2;

                    this.size = {
                        width: this.imageNode.node.naturalWidth || this.imageNode.node.width,
                        height: this.imageNode.node.naturalHeight || this.imageNode.node.height
                    };

                    if ($J.browser.uaName === 'safari') {
                        let correct = false;
                        if (this.srcSettings.scale.width) {
                            if (this.size.width > this.srcSettings.scale.width + 5) {
                                correct = true;
                            }
                        } else {
                            if (this.size.height > this.srcSettings.scale.height + 5) {
                                correct = true;
                            }
                        }

                        if (correct) {
                            this.size.width /= this.dppx;
                            this.size.height /= this.dppx;
                        }
                    }

                    resolve(this);
                });

                this.imageNode.addEvent('error', (e) => {
                    e.stop();
                    this.state = 3;
                    this.imageNode = null;
                    reject(this);
                });

                // requestCORSIfNotSameOrigin(this.imageNode.node, this.src);

                this.setSrc();
                this.setSrcset();
            } else {
                resolve(this);
            }
        });
    }

    setSrc() {
        this.imageNode.node.src = this.src;
    }

    setSrcset() {
        if (this.srcset) { // TODO because amount of tiles are different between 1x image and 1.5x image
            // this.imageNode.node.srcset = encodeURI(this.srcset) + ' 2x';
            // this.imageNode.node.srcset = this.srcset + ' 2x';
            this.imageNode.node.srcset = this.srcset + ' ' + this.dppx + 'x';
        }
    }

    isLoading() {
        return (this.state === 1);
    }

    destroy() {
        if (this.state === 1 && this.imageNode) {
            this.imageNode.attr('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
        }

        this.state = 0;
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
        this.tileName = tileName; // name of tile
    }

    setSrc() {
        if (this.dppx === 1) { // TODO because amount of tiles are different between 1x image and 1.5x image
            super.setSrc();
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
        isReady
        getOriginSize
        sendLoad
        cancelLoadingImage
        getImageName
        getImage
        getOriginImageUrl
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
    const src = $J.extend({}, imageSettings);
    let srcset;

    delete src.src;
    delete src.srcset;

    src.imageSettings = $J.extend({}, imageSettings?.imageSettings || {});

    if (dppx > 1) {
        srcset = JSON.parse(JSON.stringify(src));
        if (srcset.width) { srcset.width = parseInt(srcset.width * dppx, 10); }
        if (srcset.height) { srcset.height = parseInt(srcset.height * dppx, 10); }

        if (srcset.imageSettings.crop) {
            if (srcset.imageSettings.crop.width) { srcset.imageSettings.crop.width = parseInt(srcset.imageSettings.crop.width * dppx, 10); }
            if (srcset.imageSettings.crop.height) { srcset.imageSettings.crop.height = parseInt(srcset.imageSettings.crop.height * dppx, 10); }
        }

        srcset.dppx = dppx;
    }

    src.imageSettings = $J.extend(src.imageSettings, imageSettings.src);

    if (srcset && imageSettings.srcset) {
        srcset.imageSettings = $J.extend(srcset.imageSettings, imageSettings.srcset);
    }

    return { src: src, srcset: srcset };
};

const getOriginUrl = (source) => { return source.split('?')[0]; };
const toPercentageString = (v) => { return (v * 100).toFixed(4) + '%'; };

const getImageName = (url) => {
    let hash;
    let result = null; // eslint-disable-line prefer-const, no-unused-vars
    url = url.replace('\?+', '?');
    url = url.replace('&+', '&');

    url = url.split('?');
    hash = url[1];
    url = url[0];

    hash = hash.split('&');
    hash = hash.sort();

    return '' + $J.getHashCode(url + '?' + hash.join('&'));
};

const getPropFromCrop = (obj, name) => {
    let result = null;

    if (obj && obj.crop && obj.crop[name]) {
        result = obj.crop[name];
    }

    return result;
};

const mixSettings = (info, defaultImageSettings, imageSettings) => {
    let result = helper.deepExtend({}, defaultImageSettings);

    if (info && info.imageSettings.processingSettings) {
        if (!result.crop) { result.crop = {}; }
        result.crop = helper.deepExtend(result.crop, info.cropSettings);

        // if (result.crop) {
        //     if (result.crop.width && /100(\.0*)?%/.test(result.crop.width)) {
        //         delete result.crop.width;
        //     }

        //     if (result.crop.height && /100(\.0*)?%/.test(result.crop.height)) {
        //         delete result.crop.height;
        //     }
        // }

        if (!result.canvas) { result.canvas = {}; }
        result.canvas = helper.deepExtend(result.canvas, info.canvasSettings);

        if (!result.frame) { result.frame = {}; }
        result.frame = helper.deepExtend(result.frame, info.frameSettings);

        if (!result.scale) { result.scale = {}; }
        if (!result.scale.option) { result.scale.option = 'fill'; }
    }

    if (imageSettings.width && imageSettings.width !== 'auto') {
        result.scale.width = imageSettings.width;
    }

    if (imageSettings.height && imageSettings.height !== 'auto') {
        result.scale.height = imageSettings.height;
    }

    if (imageSettings.imageSettings) {
        result = helper.deepExtend(result, imageSettings.imageSettings);
    }

    // if (getPropFromCrop(defaultImageSettings, 'type') === 'focalpoint' || getPropFromCrop(info.imageSettings.processingSettings, 'type') === 'focalpoint') {
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
const IMAGE_INFO = {};

// eslint-disable-next-line no-unused-vars
class RImage extends EventEmitter {
    constructor(source, o) {
        super();

        if ($J.typeOf(source) !== 'string') {
            source = $(source).attr('src');
        }

        this.o = $J.extend({
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
        this.originUrl = getOriginUrl($J.getAbsoluteURL(source));
        this.infoUrl = this.originUrl + '?nometa&info';

        this.imageSettings = $J.extend({}, this.o.imageSettings);
    }

    static roundImageSize(size, originSize) {
        let tmp;

        if (!originSize) {
            originSize = { width: Number.MAX_VALUE, height: Number.MAX_VALUE };
        }

        if (size.width && size.height) {
            if (size.width >= size.height) {
                tmp = helper.roundSize(size.width);
                if (tmp <= originSize.width) {
                    size.height = Math.floor((size.height / size.width) * tmp);
                    size.width = tmp;
                }
            } else {
                tmp = helper.roundSize(size.height);
                if (tmp <= originSize.height) {
                    // size.width = Math.round((size.width / size.height) * tmp);
                    // firefox
                    // fix 'https://github.com/sirv/sirv.js/issues/148'
                    // We need to use 'Math.floor' because this image 'https://demo.sirv.com/demo/vax/2759311-g.jpg?scale.option=fill&h=500' has wrong size in zoom
                    size.width = Math.floor((size.width / size.height) * tmp);
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
            if (size.width) { obj.width = size.width; }
            if (size.height) { obj.height = size.height; }
        };

        if (!imageSettings) { imageSettings = {}; }
        imageSettings = $J.extend({}, imageSettings);

        // correct tile size if we have canvas border
        let tmp = this.getClearSizeWithoutProcessingSettings({ width: imageSettings.width, height: imageSettings.height });
        setSize(imageSettings, tmp);

        const result = splitOptions(imageSettings, imageSettings.dppx);

        if (imageSettings.round || !imageSettings.hasOwnProperty('round') && this.o.round) {
            const originSize = this.getOriginSize();
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

        if (!info.imageSettings.viewer) { info.imageSettings.viewer = {}; }
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

        info = $J.extend(info, {
            cropSettings: cropSettings,
            canvasSettings: canvasSettings,
            frameSettings: frameSettings,
            originSize: originSize
        });
    }

    _addImage(name, imageSettings) {
        const dontLoad = $J.defined(imageSettings.src.dontLoad) ? imageSettings.src.dontLoad : this.o.dontLoad;

        const getSettings = (sett) => {
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
        let tile;
        let tileName = null;
        if (imageSettings.src.imageSettings && imageSettings.src.imageSettings.tile) {
            tile = imageSettings.src.imageSettings.tile;
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
            imageInstance = new _Image(name, this.originUrl, src, srcset, dontLoad, this.o.referrerPolicy);
        } else {
            imageInstance = new _TileImage(name, this.originUrl, src, srcset, dontLoad, this.o.referrerPolicy, tileName);
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

        img.image.load()
            .then((imgInst) => {
                instance = imgInst;
                eventName = 'imageOnload';

                if (instance instanceof _Image) {
                    this.someImageIsLoaded = true;
                }
            })
            .catch((imgInst) => {
                instance = imgInst;
                eventName = 'imageOnerror';
            })
            .finally(() => {
                if (instance instanceof _Image) {
                    this.someImageIsComplete = true;
                }

                const image = this.images[instance.name];

                if (image) {
                    this.emit(eventName, { data: this._createImageData(image, imageSettings.src.callbackData) });
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
            node: obj.imageNode,
            serverWidth: img.serverWidth,
            serverHeight: img.serverHeight,
            width: obj.size.width,
            height: obj.size.height,
            src: obj.src,
            srcset: obj.srcset,
            state: obj.state,
            dppx: obj.dppx || 1
        };

        return result;
    }

    _filter(isTile) {
        const result = [];

        helper.objEach(this.images, (key, image) => {
            if (image.image instanceof _TileImage === !!isTile) {
                result.push(image);
            }
        });

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

        const name = this.getImageName(imageSettings.src);
        let result = Object.prototype.hasOwnProperty.call(this.images, name);

        if (!result) {
            if (!(imageSettings.src.imageSettings && imageSettings.src.imageSettings.tile) && imageSettings.src.width) {
                const images = this._filter(false);
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

        let result = this.images[this.getImageName(imageSettings.src)];

        if (result) { result = result.image.state === 2; }

        return !!result;
    }

    /**
     * Some of image is loaded
     *
     * @returns {boolean} - Returns true if some of image is loaded
     */
    isReady() {
        return this.someImageIsLoaded;
    }

    isComplete() {
        return this.someImageIsComplete;
    }

    /**
     * Returns origin size of image from image info
     *
     * @returns {Hash} Size of the image  {width: x, height: x}
     */
    getOriginSize() {
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

    getImageInfo() {
        if (!this.imageInfoPromise) {
            this.imageInfoPromise = new Promise((resolve, reject) => {
                let url = this.originUrl;
                const hash = $J.getHashCode(this.infoUrl.replace(/^http(s)?:\/\//, ''));
                const imageSettings = helper.paramsToQueryString(this.imageSettings);

                if (imageSettings !== '') {
                    url += ('?' + imageSettings);
                    url += '&';
                } else {
                    url += '?';
                }

                url += ('nometa&info=' + INFO + hash + '_' + this.o.type);
                url = helper.cleanQueryString(url);

                helper.getRemoteData(url, 'image_info_' + helper.generateUUID(), this.o.referrerPolicy)
                    .then((data) => {
                        if (!data.width || data._isplaceholder) {
                            reject(data);
                        } else {
                            IMAGE_INFO[this.o.infoId] = { imageSettings: data };
                            this._calcProcessingSettings();
                            resolve(IMAGE_INFO[this.o.infoId]);
                        }
                    })
                    .catch(reject);
            });
        }

        return this.imageInfoPromise;
    }

    _getBiggerImage(width, images, dontLoad) {
        let result = null;

        if (!width) { width = 0; }
        if (!images) { images = this.images; }
        if (dontLoad === $J.U) { dontLoad = this.o.dontLoad; }

        helper.objEach(images, (key, value) => {
            if (width < value.serverWidth) {
                if ((value.image.state === 2 || dontLoad) && (!result || result.serverWidth > value.serverWidth)) {
                    result = value;
                }
            }
        });

        return result;
    }

    sendLoad(imageSettings) {
        let img;

        imageSettings = this._convertImageSettings(imageSettings);

        img = this.images[this.getImageName(imageSettings.src)];

        if (!img) {
            img = this._getBiggerImage(imageSettings.src.width);
        }

        this.emit('imageOnload', { data: this._createImageData(img, imageSettings.src.callbackData) });
    }

    /**
     * Cancels loading image if it is
     *
     * @param {Object}    Image settings object to cansel
     */
    cancelLoadingImage(imageSettings) {
        imageSettings = this._convertImageSettings(imageSettings);

        const name = this.getImageName(imageSettings.src);
        const img = this.images[name];

        if (img) {
            if (img.image.isLoading()) {
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
    getImageName(imageSettings) {
        const result = getImageName(helper.cleanQueryString(this.originUrl + ('?' + helper.paramsToQueryString(this._mixSettings(imageSettings)))));
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

        const name = this.getImageName(options.src);
        let result = this.images[name];

        if (!result) {
            this._load(name, $J.extend({}, options));
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
    getOriginImageUrl() {
        let result = null;

        if (this.originUrl) {
            result = this.originUrl;
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

    getDescription() {
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
            const originUrl = imageSettings.originUrl || this.originUrl;

            const getSrc = (_size, _imageSettings) => {
                let settings = { scale: { option: 'fill' } };

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
                    settings = $J.extend(settings, _imageSettings);
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

            const getSize = (is) => {
                const r = {};

                if (is.width) { r.width = is.width; }
                if (is.height) { r.height = is.height; }

                return r;
            };

            if (options.src.crop || (options.src.width && options.src.height)) {
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

    getAccountInfo() {
        const result = {};
        const info = IMAGE_INFO[this.o.infoId];

        if (info) {
            result.account = info.imageSettings.account;
            result.branded = info.imageSettings.branded;
        }

        return result;
    }

    destroy() {
        helper.objEach(this.images, (key, img) => {
            img.image.destroy();
        });

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

    }
);
