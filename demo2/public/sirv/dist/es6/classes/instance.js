Sirv.define(
    'Instance',
    ['bHelpers','magicJS','globalVariables','BaseInstance','helper'],
    (bHelpers,magicJS,globalVariables,BaseInstance,helper) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* eslint-disable indent */
/* global BaseInstance */
/* global helper */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

// eslint-disable-next-line no-unused-vars
const createError = (name) => {
    return new Error('This method \'' + name + '\' is not implemented.');
};

class Instance extends BaseInstance {
    constructor(node, options, defaultSchema) {
        super(node, options, defaultSchema);

        this.type = globalVariables.SLIDE.TYPES.NONE;
        this.always = options.always;
        this.quality = options.quality;
        this.hdQuality = options.hdQuality;
        this.isHDQualitySet = options.isHDQualitySet;
        this.isFullscreenEnabled = options.isFullscreen;
        this.dataAlt = null;
        this.isSlideShown = false;
        this.isInView = false;
        this.preload = false;
        this.firstSlideAhead = false;
        this.infoSize = null;
        this.pinchCloud = null;
        this.onLoad = false;
        this.waitToStart = new helper.WaitToStart();
        this.waitGettingInfo = new helper.WaitToStart();
        this.gettingInfoPromise = null;

        this.fullscreenState = globalVariables.FULLSCREEN.CLOSED;

        this.on('stats', (e) => {
            e.data.component = globalVariables.SLIDE.NAMES[this.type];
        });
    }

    sendEvent(typeOfEvent, data) {
        if (!data) { data = {}; }
        if (!data.event) { data.event = {}; }
        data.id = this.id;
        data.url = this.instanceUrl;
        data.event.timestamp = +(new Date());
        data.event.type = globalVariables.SLIDE.NAMES[this.type] + ':' + typeOfEvent;

        this.emit('componentEvent', {
            data: {
                type: typeOfEvent,
                data: data
            }
        });
    }

    onStartActions() {}
    onStopActions() {}
    onInView(value) {}
    onBeforeFullscreenIn(data) {}
    onAfterFullscreenIn(data) {}
    onBeforeFullscreenOut(data) {}
    onAfterFullscreenOut(data) {}
    onMouseAction(type) {}
    onSecondSelectorClick() {}
    onStopContext() {}
    loadContent() { return true; }
    loadThumbnail() {
        if (!this.destroyed) {
            this.waitToStart.start();
            return true;
        }

        return false;
    }

    startGettingInfo() {
        if (!this.destroyed) {
            this.waitGettingInfo.start();
            return true;
        }

        return false;
    }

    startFullInit(options) {
        if (this.isStartedFullInit) { return; }
        super.startFullInit(options);

        if (options) {
            this.always = options.always;
        }

        this.dataAlt = this.instanceNode.attr('data-alt');

        this.on('startActions', (e) => {
            e.stop();
            this.isSlideShown = true;
            this.onStartActions(e.who);
        });

        this.on('stopActions', (e) => {
            e.stop();
            this.isSlideShown = false;
            this.onStopActions();
        });

        this.on('inView', (e) => {
            e.stop();
            const iv = e.data;

            this.onInView(iv);

            this.isInView = iv;
        });

        this.setEvents();
    }

    isFullscreenActionEnded() {
        return [globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENED].includes(this.fullscreenState);
    }

    setEvents() {
        this.on('beforeFullscreenIn', (e) => {
            e.stop();
            if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || this.destroyed) { return; }
            this.fullscreenState = globalVariables.FULLSCREEN.OPENING;
            this.onBeforeFullscreenIn(e.data);
        });

        this.on('afterFullscreenIn', (e) => {
            e.stop();
            if (!this.destroyed) {
                this.fullscreenState = globalVariables.FULLSCREEN.OPENED;
                this.onAfterFullscreenIn(e.data);
            }
        });

        this.on('beforeFullscreenOut', (e) => {
            e.stop();
            if (this.fullscreenState === globalVariables.FULLSCREEN.CLOSED || this.destroyed) { return; }
            this.fullscreenState = globalVariables.FULLSCREEN.CLOSING;
            this.onBeforeFullscreenOut(e.data);
        });

        this.on('afterFullscreenOut', (e) => {
            e.stop();
            if (!this.destroyed) {
                this.fullscreenState = globalVariables.FULLSCREEN.CLOSED;
                this.onAfterFullscreenOut(e.data);
            }
        });
    }

    getSelectorImgUrl(data) {
        return Promise.reject(createError('getSelectorImgUrl'));
    }

    getInfoSize() {
        return Promise.reject(createError('getInfoSize'));
    }

    run(isShown, preload, firstSlideAhead) {
        const result = super.run();

        if (result) {
            this.isSlideShown = isShown;
            this.preload = preload;
            this.firstSlideAhead = firstSlideAhead;

            if (!this.firstSlideAhead) {
                this.waitToStart.start();
            }
        }

        return result;
    }

    getThumbnailData() {
        return { src: null };
    }

    getSocialButtonData(data) {
        const opt = data;

        if (this.infoSize.width < data.width || this.infoSize.height < data.height) {
            opt.width = this.infoSize.width;
            opt.height = this.infoSize.height;
        }

        const thumbnailData = this.getThumbnailData(opt);
        return thumbnailData.src;
    }

    createPinchEvent(node) {
        const pinchCloud = {
            isAdded: false,
            pinch: false,
            scale: 0,
            block: false,
            onPinchStart: (e) => {},
            onPinchResize: (e) => {},
            onPinchMove: (e) => {},
            onPinchEnd: (e) => {
                if (pinchCloud.pinch) {
                    pinchCloud.pinch = false;
                    this.sendEvent('pinchEnd');
                }

                pinchCloud.block = false;
            },
            handler: (e) => {
                switch (e.state) {
                    case 'pinchstart':
                        pinchCloud.onPinchStart(e);
                        break;
                    case 'pinchresize':
                        pinchCloud.onPinchResize(e);
                        break;
                    case 'pinchmove':
                        pinchCloud.onPinchMove(e);
                        break;
                    case 'pinchend':
                        pinchCloud.onPinchEnd(e);
                        break;
                    default:
                }

                if (pinchCloud.pinch) { e.stop(); }
            },

            addEvent: () => {
                if (!pinchCloud.isAdded && $J.browser.touchScreen) {
                    node.addEvent('pinch', pinchCloud.handler);
                    pinchCloud.isAdded = true;
                }
            },

            removeEvent: () => {
                if (pinchCloud.isAdded) {
                    node.removeEvent('pinch', pinchCloud.handler);
                    pinchCloud.isAdded = false;
                    pinchCloud.block = false;
                    pinchCloud.pinch = false;
                }
            }
        };

        pinchCloud.addEvent();

        this.pinchCloud = pinchCloud;
    }

    done() {
        super.done();

        this.createPinchEvent();

        this.on('resize', (e) => {
            e.stop();
            this.onResize();
        });

        this.on('stopContext', (e) => {
            e.stop();
            this.onStopContext();
        });

        this.on('secondSelectorClick', (e) => {
            e.stopAll();
            this.onSecondSelectorClick();
        });

        this.on('mouseAction', (e) => {
            e.stop();
            this.onMouseAction(e.data.type);
        });

        this.on('dragEvent', (e) => {
            e.stop();
            if (this.pinchCloud) {
                if (e.data.type === 'dragstart') {
                    this.pinchCloud.removeEvent();
                } else if (e.data.type === 'dragend') {
                    this.pinchCloud.addEvent();
                }
            }
        });

        this.sendEvent('ready');
    }

    sendContentLoadedEvent() {
        if (!this.onLoad) {
            this.onLoad = true;
            this.sendEvent('contentLoaded');
        }
    }

    destroy() {
        this.off('stats');

        this.off('startActions');
        this.off('stopActions');
        this.off('inView');

        this.off('resize');
        this.off('stopContext');
        this.off('secondSelectorClick');
        this.off('mouseAction');
        this.off('dragEvent');

        this.off('beforeFullscreenIn');
        this.off('afterFullscreenIn');
        this.off('beforeFullscreenOut');
        this.off('afterFullscreenOut');

        this.pinchCloud = null;
        this.isSlideShown = false;
        super.destroy();
        this.waitGettingInfo.destroy();
        this.waitGettingInfo = null;
        this.waitToStart.destroy();
        this.waitToStart = null;
        this.gettingInfoPromise = null;
    }
}

return Instance;

    }
);
