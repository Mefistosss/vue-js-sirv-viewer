Sirv.define(
    'ViewerImage',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','ResponsiveImage','HotspotInstance','Hotspots','getDPPX'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,ResponsiveImage,HotspotInstance,Hotspots,getDPPX) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* global $, $J */
/* global helper */
/* global HotspotInstance */
/* global globalVariables */
/* global ResponsiveImage */
/* global Hotspots */
/* global getDPPX */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint-env es6 */


const BRAND_LANDING = 'https://sirv.com/about-image/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(image)&utm_campaign=branding';

// eslint-disable-next-line no-unused-vars
class ViewerImage extends HotspotInstance {
    constructor(node, options) {
        super(node, options, {});

        this.type = globalVariables.SLIDE.TYPES.IMAGE;

        this.instanceNode.attr('referrerpolicy', this.referrerPolicy);

        this.image = null;
        this.isInfoLoaded = false;
        this.getImageInfoPromise = null;
        this.loadStaticImagePromise = null;
        this.imageShowPromise = null;
        this.srcWasSetted = false;
        this.lastImageSize = { width: 0, height: 0 };
        this.imageIndex = options.imageIndex;

        this.dppx = 1;
        this.upscale = false;
        this.size = { width: 0, height: 0 };
        this.dontLoad = true;
        this.accountInfo = {};
        this.countOfTries = 1;

        this.isFullscreen = options.isFullscreen;
        this.nativeFullscreen = options.nativeFullscreen;

        this.infoAlt = null;
        this.originAlt = this.instanceNode.attr('alt');
        this.originTitle = this.instanceNode.attr('title');

        this.src = this.instanceNode.attr('src');
        this.srcset = this.instanceNode.attr('srcset');
        this.startedSrc = this.src;
        this.dataSrc = this.instanceNode.attr('data-src');

        this.isStaticImage = (this.src && !this.dataSrc);
        this.imageUrl = this.dataSrc || this.src;
        this.getImageTimer = helper.debounce(() => { this.getImage(); }, 32);
        this.firstSlideAhead = false;

        // Image URL
        this.src = globalFunctions.normalizeURL(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));

        this.queryParamsQuality = null;
        this.queryParams = helper.paramsFromQueryString(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2'));
        // Image default params
        this.getQueryParams();

        this.isNotSirv = false;
        if (helper.isSVG(this.imageUrl)) {
            this.isNotSirv = true;
        }

        // in order to not search it in different classes
        // this.api = Object.assign(this.api, {
        //     isReady: this.isReady.bind(this), // parent class
        //     resize: this.resize.bind(this), // parent class
        //     getOptions: this.getOptions.bind(this) // parent class
        //     hotspots: {} // parent class, hotspots api
        // });

        this.createHotspotsClass(Hotspots);
        this.createSirvImage();
    }

    sendEvent(typeOfEvent, data) {
        if (!data) { data = {}; }
        data.imageIndex = this.imageIndex;
        super.sendEvent(typeOfEvent, data);
    }

    getInfo() {
        if (!this.gettingInfoPromise) {
            this.gettingInfoPromise = new Promise((resolve, reject) => {
                this.waitGettingInfo.wait(() => {
                    this.image.loadInfo()
                        .then((info) => {
                            if (!this.destroyed) {
                                this.isInfoLoaded = true;
                                this.infoAlt = this.image.description;
                                this.infoSize = this.image.originSize;
                                this.accountInfo = this.image.accountInfo;
                                this.hotspotsData = info.hotspots;

                                if (this.hotspots) {
                                    this.hotspots.originImageSize = this.infoSize;
                                }

                                resolve();
                            }
                        })
                        .catch((err) => {
                            if (!this.destroyed) {
                                this.isInfoLoaded = true;

                                if (!err.status || err.status !== 404) {
                                    this.isNotSirv = true;
                                }

                                reject(err);
                            }
                        });
                });
            });
        }

        return this.gettingInfoPromise;
    }

    getQueryParams() {
        if (this.imageUrl) {
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

    getImageCreateSettings() {
        let setts = { src: {}, srcset: {} };

        if (this.quality !== null && this.queryParamsQuality === null) {
            setts.src.quality = this.quality;
        }

        const hdQuality = this.hdQuality;

        if (this.queryParamsQuality === null || this.isHDQualitySet && hdQuality < this.queryParamsQuality) {
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

        return setts;
    }

    setHDQuality(opt) {
        if (opt.dppx > 1 && opt.dppx < 1.5) {
            if (this.queryParamsQuality === null && this.quality !== null) {
                opt.srcset.quality = this.quality;
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
            let opt = this.getImageCreateSettings();

            if (opt.dppx > 1 && opt.dppx < 1.5) {
                delete opt.srcset.quality;
            }

            opt = this.setHDQuality(opt);

            img = this.image.getImage(opt);

            this.lastImageSize.width = img.width || img.serverWidth;
            this.lastImageSize.height = img.height || img.serverHeight;
        }

        this.instanceNode.attr('src', img.src);

        if (img.srcset) {
            if (!this.isNotSirv && this.dppx > 1) {
                this.instanceNode.attr('srcset', img.srcset + ' ' + this.dppx + 'x');
            }
        } else {
            this.instanceNode.removeAttr('srcset');
        }
    }

    showImage() {
        if (!this.imageShowPromise) {
            // eslint-disable-next-line
            this.imageShowPromise = new Promise((resolve, reject) => {
                if (this.isStaticImage) {
                    this.instanceNode.setCssProp('opacity', '');
                    resolve();
                } else if (this.isInView && this.isSlideShown) {
                    this.instanceNode.addEvent('transitionend', (e) => {
                        if (e.propertyName === 'opacity') {
                            e.stop();
                            this.instanceNode.removeEvent('transitionend');
                            this.instanceNode.setCss({ opacity: '', transition: '' });
                            resolve();
                        }
                    });

                    this.instanceNode.render();
                    this.instanceNode.setCss({
                        opacity: 1,
                        transition: 'opacity 0.3s linear'
                    });
                } else {
                    this.instanceNode.setCssProp('opacity', '');
                    resolve();
                }
            });
        }

        return this.imageShowPromise;
    }

    createSirvImage() {
        if (!this.imageUrl || this.isNotSirv) { return; }

        this.on('imageOnload', (e) => {
            e.stopAll();
            this.replaceSrc();

            if (!this.ready) {
                if (e.data.node) {
                    this.showImage().finally(() => { this.done(); });
                } else {
                    helper.loadImage(this.instanceNode).finally(() => {
                        this.showImage().finally(() => { this.done(); this.sendContentLoadedEvent(); });
                    });
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
            referrerPolicy: this.referrerPolicy
        });
        this.image.parentClass = this;
        this.getInfo();
    }

    getInfoSize() {
        if (!this.getImageInfoPromise) {
            this.getImageInfoPromise = new Promise((resolve, reject) => {
                if (this.image) {
                    this.getInfo()
                        .then(() => {
                            resolve({
                                size: this.infoSize,
                                imageIndex: this.imageIndex
                            });
                        })
                        .catch((err) => {
                            reject({
                                error: err,
                                isPlaceholder: err._isplaceholder,
                                imageIndex: this.imageIndex
                            });
                        });
                } else {
                    reject({
                        error: 'nonsirv',
                        isPlaceholder: false,
                        imageIndex: this.imageIndex
                    });
                }
            });
        }

        return this.getImageInfoPromise;
    }

    startFullInit(options) {
        if (this.isStartedFullInit) { return; }

        super.startFullInit(options);

        this.getId('responsive-image-'); // TODO check css

        if (!this.isStaticImage) {
            this.instanceNode.setCssProp('opacity', 0);
        }
    }

    run(isShown, preload, firstSlideAhead, loadContent) {
        this.firstSlideAhead = firstSlideAhead;
        let result = super.run(isShown, preload, firstSlideAhead);

        if (result) {
            if (this.destroyed) {
                result = false;
            } else {
                // Remove ALT to properly calculate image size.
                // Safari and Edge/IE return image size with a height if ALT text is present.
                this.instanceNode.removeAttr('alt');
                // Remove TITLE to properly calculate image size.
                // The latest version(s) of Chrome returns image size with a height if TITLE is set.
                this.instanceNode.removeAttr('title');

                // This force browsers to re-layout image and recalculate its dimensions.
                this.instanceNode.setCss({ display: 'inline-flex' }).render();
                this.instanceNode.setCss({ display: '' }).render();

                let size = null;
                helper.imageLib.getSize(this.instanceNode.node.parentNode)
                    .then((dataSize) => { size = dataSize; })
                    .finally(() => {
                        if (!this.destroyed) {
                            // sometimes when we have very slow internet connection and the image is first slide and thumbnails have left position we get wrong height
                            if (size.width && size.height <= 20) {
                                size.height = 0;
                            }

                            // size = helper.fixSize(this.instanceNode, size);
                            this.size = helper.imageLib.calcProportionSize(size, this.infoSize);

                            if (this.originAlt || this.infoAlt) { // Restore ALT text
                                $(this.instanceNode).attr('alt', this.originAlt || this.infoAlt);
                            }

                            if (this.originTitle) { // Restore TITLE text
                                $(this.instanceNode).attr('title', this.originTitle);
                            }

                            if (this.isStaticImage) {
                                this.loadStaticImage().finally(() => {
                                    if (this.isInfoLoaded) {
                                        this.done();
                                    }
                                });
                            } else {
                                if (this.originAlt) { // Restore ALT text
                                    $(this.instanceNode).attr('alt', this.originAlt);
                                }

                                if (this.isInView && (this.isSlideShown || this.preload || loadContent)) {
                                    this.getImage();
                                }
                            }

                            if (this.dataAlt) {
                                $(this.instanceNode).attr('alt', this.dataAlt);
                            }
                        }
                    });

                this.startGettingInfo();
            }
        }

        return result;
    }

    loadContent() { this.getImage(true); }

    loadStaticImage() {
        if (!this.loadStaticImagePromise) {
            this.loadStaticImagePromise = new Promise((resolve, reject) => {
                if (this.isStaticImage) {
                    if (this.instanceNode.node.complete) {
                        resolve();
                    } else {
                        // eslint-disable-next-line
                        this.instanceNode.addEvent('load', (e) => { this.sendContentLoadedEvent(); resolve(); });
                        // eslint-disable-next-line
                        this.instanceNode.addEvent('error', (e) => { reject(); });
                    }
                } else {
                    resolve();
                }
            });
        }
        return this.loadStaticImagePromise;
    }

    getImage(loadContent) {
        if (this.isStaticImage) { return; }

        if (!this.isNotSirv && !this.ready && !this.size.width && !this.size.height) {
            // fix for if the viewer was with display none
            if (this.countOfTries < 100) {
                setTimeout(() => {
                    this.countOfTries += 1;
                    this.isStarted = false;
                    this.run(this.isSlideShown, this.preload, this.firstSlideAhead, loadContent);
                }, 16 * this.countOfTries);
            }

            return;
        }

        this.waitToStart.start();

        if (this.isNotSirv) {
            this.replaceSrc();
        } else {
            this.getSirvImg();
        }
    }

    get imageClassContainer() {
        return this.image;
    }

    getSirvImg() {
        let setts = this.getImageCreateSettings();

        if ($J.DPPX > 1) {
            const originSize = this.image.originSize;
            this.dppx = getDPPX(setts.width, setts.height, originSize.width, originSize.height, (!$J.defined(setts.round) || setts.round), this.upscale);
            setts.dppx = this.dppx;
        }

        setts = this.setHDQuality(setts);

        if (this.checkImage(setts, this.dontLoad)) {
            this.replaceSrc();
        } else {
            this.image.getImage(setts);
        }
    }

    get originImageUrl() {
        return this.src;
    }

    done() {
        if (!this.ready) {
            if (this.accountInfo.branded) {
                let n = this.instanceNode;
                if (n.tagName === 'img') { n = n.node.parentNode; }
                const nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
                globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, n, BRAND_LANDING, 'Image viewer by Sirv');
            }

            super.done();

            if (this.hotspots) {
                this.hotspots.containerSize = this.instanceNode.node.getBoundingClientRect();
            }

            if (!this.isFullscreenEnabled) {
                this.pinchCloud.removeEvent();
                this.pinchCloud = null;
            }
        }
    }

    getSelectorImgUrl(data) {
        return new Promise((resolve, reject) => {
            const defOpt = this.getImageCreateSettings();
            if (defOpt.src) { data.src = defOpt.src; }
            data.srcset = defOpt.srcset;

            if (this.isInfoLoaded) {
                this.waitToStart.wait(() => {
                    resolve(Object.assign(this.image.getThumbnail(data), {
                        imageIndex: this.imageIndex,
                        alt: this.dataAlt || this.originAlt || this.infoAlt,
                        'referrerpolicy': this.instanceNode.attr('referrerpolicy')
                    }));
                });
            } else {
                this.getInfo()
                    .then(() => {
                        this.waitToStart.wait(() => {
                            resolve(Object.assign(this.image.getThumbnail(data), {
                                imageIndex: this.imageIndex,
                                alt: this.dataAlt || this.originAlt || this.infoAlt,
                                referrerpolicy: this.instanceNode.attr('referrerpolicy')
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

    createPinchEvent() {
        // difference between scale
        const FS_OUT = 0.2;
        const FS_IN = 2;

        super.createPinchEvent(this.instanceNode);

        this.pinchCloud.onPinchStart = (e) => {
            if ([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING].includes(this.fullscreenState)) { return; }
            this.pinchCloud.pinch = true;
            this.pinchCloud.scale = e.scale;
            this.sendEvent('pinchStart');
        };

        this.pinchCloud.onPinchMove = (e) => {
            if (this.pinchCloud.pinch && !this.pinchCloud.block) {
                if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                    if (e.scale < FS_OUT) {
                        this.pinchCloud.block = true;
                        this.sendEvent('fullscreenOut');
                    }
                } else if (e.scale >= FS_IN) {
                    this.pinchCloud.block = true;
                    this.sendEvent('fullscreenIn');
                }
            }
        };
    }

    onStartActions() {
        if (!this.ready) {
            if (this.isInView && this.isStarted) {
                if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                    this.onResize();
                }

                if (this.always) {
                    /*
                        it can happen when fullscreen always is true and we came to this slide by thumbnail
                        we need timer to clear it in 'onBeforeFullscreenIn' handler and don't if we are in standard mode
                    */
                    this.getImageTimer();
                } else {
                    this.getImage();
                }
            }
        }

        super.onStartActions();
    }

    onStopActions() {
        super.onStopActions();
    }

    onInView(value) {
        if (value && !this.isStaticImage) {
            if (!this.ready && !this.isInView) {
                if (this.isStarted) {
                    this.isInView = true;
                    if (this.isInfoLoaded && (this.preload || this.isSlideShown)) {
                        this.getImage();
                    }
                }
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    onBeforeFullscreenIn(data) {
        this.getImageTimer.cancel();
        if (this.ready && !this.isStaticImage) {
            this.instanceNode.setCssProp('visibility', 'hidden');
        }

        super.onBeforeFullscreenIn(data);
        if (this.hotspots) {
            this.hotspots.disableAll();
        }
    }

    // eslint-disable-next-line no-unused-vars, class-methods-use-this
    onAfterFullscreenIn(data) {
        // if we use it, we do not have pinchend event and touchdrag after that
        // if (this.pinchCloud) {
        //     this.pinchCloud.removeEvent();
        //     this.pinchCloud.addEvent();
        // }

        if (this.always && !this.ready && this.isInView && this.isStarted) {
            this.onResize();
            this.getImage();
        }

        if (this.hotspots) {
            setTimeout(() => { // we have to wait a little bit for 'onResize' function
                if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) { // if we will exit from fullscreen before the timeout end
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
        this.instanceNode.setCss({ width: '', height: '', visibility: '' });
        super.onBeforeFullscreenOut(data);
    }

    // eslint-disable-next-line no-unused-vars, class-methods-use-this
    onAfterFullscreenOut(data) {
        // if we use it, we do not have pinchend event and touchdrag after that
        // if (this.pinchCloud) {
        //     this.pinchCloud.removeEvent();
        //     this.pinchCloud.addEvent();
        // }

        super.onAfterFullscreenOut(data);
    }

    onResize() {
        if (!this.isStarted || this.isStaticImage || this.isNotSirv) { return false; }

        if (this.isFullscreenActionEnded()) {
            let size = $(this.instanceNode.node.parentNode).size;
            size = helper.imageLib.calcProportionSize(size, this.infoSize);

            if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                this.instanceNode.setCss({
                    width: size.width + 'px',
                    height: size.height + 'px'
                });

                this.instanceNode.setCssProp('visibility', '');
            }

            this.size.width = size.width;
            if (this.size.height) {
                this.size.height = size.height;
            }

            if (this.ready) {
                const upscale = 50;
                if (this.size.width - this.lastImageSize.width > upscale || this.size.height - this.lastImageSize.height > upscale) {
                    this.getImage();
                }

                if (this.hotspots) {
                    this.hotspots.containerSize = this.instanceNode.node.getBoundingClientRect();
                    if (this.isInView && this.isSlideShown) {
                        this.hotspots.showNeededElements();
                    }
                }
            }

            return true;
        }

        return false;
    }

    destroy() {
        if (this.image) {
            this.off('imageOnload');
            this.off('imageOnerror');
            this.image.destroy();
            this.image = null;
        }

        this.getImageTimer.cancel();
        this.getImageTimer = null;

        this.instanceNode.setCssProp('opacity', '');

        if (this.hotspot) {
            $(this.instanceNode.node.parentNode).removeEvent('tap');
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

        if (!this.originAlt && (this.infoAlt || this.dataAlt)) {
            this.instanceNode.removeAttr('alt');
        }

        this.instanceNode.removeEvent('load');
        this.hotspotsData = null;
        super.destroy();

        return true;
    }
}

return ViewerImage;

    }
);
