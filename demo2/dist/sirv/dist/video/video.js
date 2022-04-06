Sirv.define(
    'Video',
    ['require','module','bHelpers','magicJS','globalVariables','globalFunctions','helper','Promise!','EventEmitter','Instance','defaultsVideoOptions'],
    (sirvRequire,sirvModule,bHelpers,magicJS,globalVariables,globalFunctions,helper,Promise,EventEmitter,Instance,defaultsVideoOptions) => {
        const moduleName = 'Video';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
        
// see 'src/modules/defaultsVideoOptions/8.core.js' file

/* global $, $J */
/* global helper */
/* global videojs */
/* global Instance */
/* global sirvRequire */
/* global sirvModule */
/* global globalVariables */
/* global defaultsVideoOptions */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint-env es6 */

/*
    videojs-brand
*/


// eslint-disable-next-line no-unused-vars
const Video = (() => {
    const P = globalVariables.PREFIX;
    // Video playback rates (speed)
    const PLAYBACK_RATES = [0.5, 1, 1.5, 2];

    const DISABLE_CLASS = P + '-disabled-action';
    const HOST = 'https://video.sirv.com';
    const INFO = 'sirv_video_info_';

    const QUALITY_CONTROL = P + '-q-last';
    const SPEED_CONTROL = P + '-s-last';
    const NEW_IMAGE_FACTOR = 50 * $J.DPPX;

    const ACTIONS = {
        NONE: 0,
        PLAY: 1,
        PLAY_SREEN_IN: 2,
        PLAY_BY_USER: 3,
        PLAY_BY_SWITCHING: 4,
        PAUSE: 5,
        PAUSE_BY_SWITCHING: 6
    };

    const cssID = 'sirv-stylesheet-vjs';
    const loadCSS = (rootNode) => {
        // return globalFunctions.rootDOM.addStyle(rootNode, sirvModule.config().libcss, cssID, '#' + globalFunctions.rootDOM.mainCSSID);
        return globalFunctions.rootDOM.addStyle(rootNode, sirvModule.config().libcss, cssID); // videojs css must be added before sirv.css
    };

    const loadVideoJS = () => {
        return new Promise((resolve) => {
            sirvRequire([sirvModule.config().libjs], resolve);
        });
    };

    const loadQualitySelectorCSS = (rootNode) => {
        return globalFunctions.rootDOM.addStyle(rootNode, sirvModule.config().qualitySelectorcss, 'sirv-stylesheet-vjs-quality-selector', '#' + globalFunctions.rootDOM.mainCSSID);
    };

    const loadQualitySelector = () => {
        return new Promise((resolve) => {
            sirvRequire([sirvModule.config().qualitySelectorjs], resolve);
        });
    };

    const getVideoType = (src) => {
        src = src || '';
        src = src.split('?')[0];
        src = src.split('.');
        src = src[src.length - 1];

        src = src.toLowerCase();

        switch (src) {
            case '3gp':
                src = 'video/3gpp';
                // src = 'video/3gpp; codecs="mp4v.20.8, samr"';
                break;
            case 'flv':
                src = 'video/flv';
                // src = 'video/flv; codecs="flv"';
                break;
            case 'mp4':
                src = 'video/mp4';
                // src = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
                break;
            case 'ogv':
                src = 'video/ogg';
                // src = 'video/ogg; codecs="theora, vorbis"';
                break;
            case 'webm':
                src = 'video/webm';
                // src = 'video/webm; codecs="vp8, vorbis"';
                break;
            default:
                src = '';
        }

        return src;
    };

    const calcBandwidth = (hls, fps, motionFactor) => {
        // return hls.width * hls.height * 24 / 8;

        // https://www.miracletutorials.com/bitrate-hls-video/
        // width * height * fps * motion_factor * 0.07
        // 1 = little motion
        // 2 = moderate motion
        // 3 = more motion
        // 4 = high motion
        return parseInt(hls.width * hls.height * fps * motionFactor * 0.07, 10);
    };

    class VideoInstance extends Instance {
        constructor(node, options) {
            super(node, options, defaultsVideoOptions);

            this.type = globalVariables.SLIDE.TYPES.VIDEO;
            this.url = this.instanceNode.attr('data-src');
            this.info = null;
            this.HLS = [];
            this.currentSize = { width: 0, height: 0 };
            this.videoNode = null;
            this.areSourcesAdded = false;
            this.indexOfCurrentHls = 0;
            this.player = null;
            this.thumbnail = this.option('thumbnail');
            this.currentTime = 0;
            this.isVideoPaused = false;
            this.fps = 30;
            this.pluginResizeDebounce = null;
            this.playPromise = null;
            this.posterSize = null;
            this.lastAction = ACTIONS.NONE;
            this.isPlayed = false;
            this.isEnded = false;

            // because sometimes when we call this.player.start() and the video is not loaded yet the videojs throw error when we call this.player.pause()
            this.playingState = globalVariables.VIDEO.NONE;

            this.nativeFullscreen = options.nativeFullscreen;

            const baseUrl = globalFunctions.normalizeURL(this.url.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
            const params = this.url.replace(globalVariables.REG_URL_QUERY_STRING, '$2');
            this.url = baseUrl;
            if (params) { this.url += ('?' + params); }

            this.disableAction();

            this.isLoadeddata = false;
            this.controlsFullscreen = this.option('controls.fullscreen');

            // this.api = $J.extend(this.api, {
            //     isReady: this.isReady.bind(this), // parent class
            //     resize: this.resize.bind(this), // parent class
            //     getOptions: this.getOptions.bind(this) // parent class
            // });

            this.getInfo();

            // for shadow dom we must add it after the element will be in dom to detect where the viewer is started
            // this.addSources();
        }

        normalizeOptions() {
            const min  = this.option('quality.min');
            const max = this.option('quality.max');

            if (min > max) {
                this.option('quality.max', min);
            }
        }

        // eslint-disable-next-line class-methods-use-this
        getOriginImageUrl() {
            return null;
        }

        getSelectorImgUrl(data) {
            return new Promise((resolve, reject) => {
                const size = (data.width || data.height);
                let thumbnailPosterSelector = (this.url.split('?')[0]) + '?thumbnail=' + size;

                if ($J.DPPX > 1) {
                    thumbnailPosterSelector = (this.url.split('?')[0]) + '?thumbnail=' + (size * $J.DPPX) + '&quality=60';
                }

                if (this.thumbnail) {
                    if (!isNaN(parseFloat(this.thumbnail))) {
                        thumbnailPosterSelector = this.getThumbnailPoster(thumbnailPosterSelector);
                    } else {
                        thumbnailPosterSelector = this.thumbnail;
                    }
                }

                const obj = {
                    src: thumbnailPosterSelector,
                    callbackData: data.callbackData,
                };

                if ($J.DPPX > 1) {
                    obj.srcset = thumbnailPosterSelector;
                }

                this.getInfo()
                    .then(() => {
                        // this.waitToStart.wait(() => {
                            resolve(obj);
                        // });
                    })
                    .catch(reject);
            });
        }

        disableAction() {
            if (this.always && $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState)) {
                this.instanceNode.addClass(DISABLE_CLASS);
            }
        }

        enableAction() {
            if (this.always) {
                this.instanceNode.removeClass(DISABLE_CLASS);
            }
        }

        getInfo() {
            if (!this.gettingInfoPromise) {
                this.gettingInfoPromise = new Promise((resolve, reject) => {
                    this.waitGettingInfo.wait(() => {
                        let url = this.url;
                        const hash = $J.getHashCode((this.url.split('?')[0]).replace(/^http(s)?:\/\//, ''));

                        if (/\?/.test(url)) {
                            url += '&';
                        } else {
                            url += '?';
                        }

                        // url += ('nometa&info=' + INFO + hash + '_main');
                        // we need meta because we need fps
                        url += ('info=' + INFO + hash + '_main');

                        helper.getRemoteData(url, 'video_info_' + helper.generateUUID(), this.referrerPolicy)
                            .then((data) => {
                                if (!this.destroyed) {
                                    this.info = data;

                                    if (this.info.QuickTime && this.info.QuickTime.VideoFrameRate) {
                                        this.fps = this.info.QuickTime.VideoFrameRate;
                                    }

                                    this.HLS = this.info.original.HLS || [];

                                    if (this.HLS.length > 1) {
                                        this.HLS.sort((a, b) => {
                                            let result = 0;

                                            if (a.width < b.width) {
                                                result = -1;
                                            } else if (a.width > b.width) {
                                                result = 1;
                                            } else if (a.height < b.height) {
                                                result = -1;
                                            } else if (a.height > b.height) {
                                                result = 1;
                                            }

                                            return result;
                                        });
                                    }

                                    this.infoSize = {
                                        width: this.info.original.width,
                                        height: this.info.original.height
                                    };
                                    resolve(this.infoSize);
                                }
                            }).catch((err) => {
                                if (!this.destroyed) {
                                    reject(err);
                                }
                            });
                    });
                });
            }

            return this.gettingInfoPromise;
        }

        getInfoSize() {
            return new Promise((resolve, reject) => {
                this.getInfo()
                    .then(() => { resolve({ size: this.infoSize }); })
                    .catch((err) => { reject({ error: err }); });
            });
        }

        addSources() {
            const nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;

            Promise.all([
                loadCSS($J.D.node.head || $J.D.node.body),
                loadCSS(nodeWithSirvClassName),
                loadVideoJS(),
                loadQualitySelectorCSS(nodeWithSirvClassName),
                loadQualitySelector()
            ]).finally(() => {
                this.areSourcesAdded = true;
                if (this.isStarted) {
                    if (this.isInView && (this.preload || this.isSlideShown)) {
                        this.createVideoNode();
                    }
                }
            });
        }

        onStartActions(who) {
            if (this._isReady) {
                if (this.player) {
                    if (this.isInView) {
                        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED && this.always && this.option('controls.enable')) {
                            this.player.controlBar.show();
                            this.player.bigPlayButton.show();
                        }

                        if (this.option('autoplay') && this.player.paused() && (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always)) {
                            this.player.muted(true);

                            if (this.isPlayed) {
                                this.lastAction = ACTIONS.PLAY_BY_SWITCHING;
                            } else if (who === globalVariables.SLIDE_SHOWN_BY.USER) {
                                this.lastAction = ACTIONS.PLAY;
                            }

                            this.play();
                        }
                    }
                }
            } else if (this.isStarted) {
                if (this.isInView && this.isSlideShown && !this.preload && this.areSourcesAdded) {
                    this.createVideoNode();
                }
            }
        }

        onStopActions() {
            if (this.player) {
                if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
                    this.lastAction = ACTIONS.PAUSE_BY_SWITCHING;
                    this.pause();
                }
            }
        }

        onInView(value) {
            if (value) {
                if (this._isReady) {
                    if (this.player) {
                        if (this.isSlideShown && value) {
                            if (this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE && !this.isVideoPaused) {
                                this.lastAction = ACTIONS.PLAY_SREEN_IN;
                                this.play();
                            }
                        }
                    }
                } else if (this.isStarted) {
                    if (!this.isInView && (this.preload || this.isSlideShown) && this.areSourcesAdded) {
                        this.isInView = true;
                        this.createVideoNode();
                    }
                }
            } else if (this.player) {
                this.isVideoPaused = this.playingState === globalVariables.VIDEO.PAUSE;
                if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
                    this.lastAction = ACTIONS.PAUSE;
                    this.pause();
                }
            }
        }

        startFullInit(options) {
            if (this.isStartedFullInit) { return; }
            super.startFullInit(options);

            this.normalizeOptions();

            this.thumbnail = this.option('thumbnail');

            this.getId('video-');

            this.instanceNode.addClass('sirv-video');
            this.instanceNode.addEvent('mousedown', (e) => { e.stop(); });
        }

        // eslint-disable-next-line no-unused-vars
        onBeforeFullscreenIn(data) {
            this.controlsFullscreen = false;
            if (this.player) {
                this.isVideoPaused = this.playingState === globalVariables.VIDEO.PAUSE;
                // if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
                //     this.currentTime = this.player.currentTime();
                //     this.pause();
                // }

                this.toggleFullscreenButton();
            }
        }

        // eslint-disable-next-line no-unused-vars
        onAfterFullscreenIn(data) {
            this.enableAction();

            if (this.isSlideShown && this.isInView && this.player) {
                if (this.player.paused()) {
                    if (this.always) {
                        if (this.option('controls.enable')) {
                            this.player.controlBar.show();
                            this.player.bigPlayButton.show();
                        }
                    }

                    // if (this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE && !this.isVideoPaused) {
                    // if ((this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE) && !this.isVideoPaused) {
                    if (this.option('autoplay') && !this.isVideoPaused) {
                        this.player.currentTime(this.currentTime);
                        this.playingState = globalVariables.VIDEO.PLAY;

                        // from v 7.2.3; The method 'play_' fix bug with chenching container
                        this.player.play_();
                    }
                }
            }
        }

        // eslint-disable-next-line no-unused-vars
        onBeforeFullscreenOut(data) {
            this.disableAction();

            if (this.option('controls.fullscreen')) {
                this.controlsFullscreen = true;
            }

            if (this.player) {
                this.isVideoPaused = this.playingState === globalVariables.VIDEO.PAUSE;
                // if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
                //     this.currentTime = this.player.currentTime();
                //     this.pause();
                // }

                this.toggleFullscreenButton();
            }
        }

        // eslint-disable-next-line no-unused-vars
        onAfterFullscreenOut(data) {
            if (this.isSlideShown && this.isInView) {
                if (this.player) {
                    if (this.always && this.option('controls.enable')) {
                        this.player.controlBar.hide();
                        this.player.bigPlayButton.hide();
                    }

                    // if (this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE && !this.isVideoPaused) {
                    // if ((this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE) && !this.isVideoPaused) {
                    if (this.option('autoplay') && !this.isVideoPaused) {
                        // this.player.currentTime(this.currentTime);
                        this.lastAction = ACTIONS.PLAY;
                        this.play();
                    }
                }
            }
        }

        onSecondSelectorClick() {
            if (this.player) {
                if (this.isSlideShown && this.isInView) {
                    if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always) {
                        if (this.player.paused()) {
                            this.lastAction = ACTIONS.PLAY;
                            this.play();
                        } else if (this.playingState === globalVariables.VIDEO.PLAYING && this.isLoadeddata) {
                            this.pause();
                        }
                    }
                }
            }
        }

        createVideoNode() {
            if (!this.videoNode) {
                this.videoNode = $J.$new('video', { 'class': P + '-sirv-video', preload: 'none' });
                this.videoNode.addClass('video-js');

                this.instanceNode.append(this.videoNode);
                this.waitToStart.start();
                this.done();
            }
        }

        play() {
            if (this.player && !this.playPromise) {
                this.playingState = globalVariables.VIDEO.PLAY;
                this.playPromise = this.player.play();
            }
        }

        pause() {
            if (this.player) {
                // videojs play promise does not have 'finally' method for ie11
                // we have launch videojs player without promise because we have bug with standard play method when we are changing videojs player's time
                (this.playPromise || new Promise(resolve => resolve(null))).then(() => {
                    this.player.pause();
                    this.playPromise = null;
                }).catch(() => {
                    this.player.pause();
                    this.playPromise = null;
                });
            }
        }

        loadContent() { this.createVideoNode(); }

        run(isShown, preload, firstSlideAhead) {
            const result = super.run(isShown, preload, firstSlideAhead);

            if (result) {
                this.calcContainerSize();

                if (this.isInView && (this.preload || this.isSlideShown) && this.areSourcesAdded) {
                    this.createVideoNode();
                }

                this.startGettingInfo();
            }

            return result;
        }

        createMasterManifest() {
            const result = ['#EXTM3U'];
            const mf = this.option('motionFactor');
            const das = this.option('dynamicAdaptiveStreaming');

            this.HLS.forEach((HLS) => {
                let str = '#EXT-X-STREAM-INF:PROGRAM-ID=1,';

                if (das) {
                    str += ('BANDWIDTH=' + calcBandwidth(HLS, this.fps, mf) + ',');
                }

                str += ('RESOLUTION=' + HLS.width + 'x' + HLS.height);
                result.push(str);
                result.push(HOST + HLS.index);
            });

            return result.join('\n');
        }

        toggleFullscreenButton() {
            const ft = this.player.controlBar.getChild('FullscreenToggle');
            const ua = this.player.options_.userActions;

            if (this.controlsFullscreen) {
                ua.doubleClick = true;
                ft.show();
            } else {
                ua.doubleClick = false;
                ft.hide();
            }
        }

        isHLS() {
            return this.HLS.length > 0 && $J.browser.uaName !== 'ie';
        }

        getThumbnailSize() {
            const maxSize = this.isHLS() ? this.HLS[this.HLS.length - 1].height : this.info.height || this.info.original.height || 140;

            let size = maxSize;

            if (this.currentSize.height < size) {
                size = this.currentSize.height;
            }

            size *= $J.DPPX;

            if (size > maxSize) {
                size = maxSize;
            }

            return size;
        }

        getPosterUrl() {
            return this.getThumbnailPoster((this.url.split('?')[0]) + '?thumbnail=' + this.posterSize);
        }

        done() {
            if (!this._isReady) {
                this.posterSize = this.getThumbnailSize();
                const posterImage = this.getPosterUrl();

                // Position volume control verically, if it's enabled.
                let volumeControl = { inline: false };
                if (this.option('controls.volume') === false) {
                    volumeControl = false;
                }

                const html5Options = {
                    nativeTextTracks: false,
                    nativeAudioTracks: false,
                    nativeVideoTracks: false
                };

                const isHSL = this.isHLS();
                const vhsOptions = {
                    overrideNative: isHSL && $J.browser.uaName !== 'safari'
                };

                html5Options.smoothQualityChange = true;
                html5Options.vhs = vhsOptions;

                const videoOptions = {
                    controls: this.option('controls.enable'),
                    fluid: false,
                    muted: this.option('volume') === 0 || this.option('autoplay'),
                    loop: this.option('loop'),
                    autoplay: this.option('autoplay') && this.isSlideShown,
                    preload: this.option('autoplay') || this.option('preload') ? 'auto' : 'none',

                    textTrackSettings: false,

                    controlBar: {
                        fullscreenToggle: true, // we will toggle it by itself
                        volumePanel: volumeControl,
                        muteToggle: false,

                        children: [
                            'playToggle',
                            'currentTimeDisplay',
                            'timeDivider',
                            'durationDisplay',
                            'progressControl',
                            'liveDisplay',
                            'remainingTimeDisplay',
                            'volumePanel',
                            'customControlSpacer',
                            'playbackRateMenuButton',
                            'chaptersButton',
                            'descriptionsButton',
                            'subsCapsButton',
                            'audioTrackButton',
                            'fullscreenToggle'
                        ]
                    },

                    poster: posterImage,
                    playsinline: true,

                    html5: html5Options,

                    userActions: {
                        doubleClick: true
                    },

                    qualityLevels: {},
                    // errorDisplay: false // it does not work
                };

                if (this.option('controls.quality')) {
                    this.instanceNode.addClass(QUALITY_CONTROL);
                } else if (this.option('controls.speed')) {
                    this.instanceNode.addClass(SPEED_CONTROL);
                }

                if (this.option('controls.speed')) {
                    videoOptions.playbackRates = PLAYBACK_RATES;
                }

                if (isHSL) {
                    this.player = $J.W.node.videojs(this.videoNode.node, videoOptions);

                    if ($J.browser.uaName !== 'safari') {
                        this.player.src({
                            src: 'data:application/x-mpegURL;base64,' + window.btoa(this.createMasterManifest()),
                            type: 'application/x-mpegURL'
                        });
                    }

                    this.player.hlsQualitySelectorAutoMode({
                        visibility: this.option('controls.quality'),
                        hls: this.HLS,
                        host: HOST,
                        max: this.option('quality.max'),
                        min: this.option('quality.min')
                    });

                    this.pluginResizeDebounce = helper.debounce(() => { this.player.hlsQualitySelectorAutoMode.recalc(); }, 600);
                } else {
                    videoOptions.src = this.url;

                    const vType = getVideoType(this.url);

                    this.videoNode.append(
                        $J.$new('source', {
                            src: this.url,
                            type: vType
                        })
                    );

                    this.player = videojs(this.videoNode.node, videoOptions);
                }

                this.player.volume(parseInt(this.option('volume'), 10) / 100);
                this.toggleFullscreenButton();

                this.player.on('loadeddata', () => {
                    this.isLoadeddata = true;
                });

                this.player.on('play', () => {
                    this.isVideoPaused = false;
                    // const isPaused = this.playingState !== globalVariables.VIDEO.NONE;
                    this.playingState = globalVariables.VIDEO.PLAYING;
                    if (!this.isSlideShown || !this.isInView) {
                        this.lastAction = ACTIONS.PAUSE;
                        this.pause();
                    } else {
                        let reason = 'user';
                        if (this.lastAction === ACTIONS.PLAY_SREEN_IN) {
                            reason = 'viewport';
                        } else if (this.lastAction === ACTIONS.PLAY) {
                            reason = 'autoplay';
                        } else if (this.lastAction === ACTIONS.PLAY_BY_SWITCHING) {
                            reason = 'itemchange';
                        }
                        this.lastAction = ACTIONS.NONE;

                        if (this.isPlayed) {
                            this.sendEvent('resume', {
                                event: {
                                    reason: reason,
                                    playbackTime: this.player.currentTime()
                                }
                            });
                        } else {
                            this.isPlayed = true;
                            this.sendEvent('play', { event: { reason: reason } });
                        }
                    }
                });

                this.player.on('pause', () => {
                    if (this.player.currentTime() === this.player.duration()) { return; }
                    this.playingState = globalVariables.VIDEO.PAUSE;

                    let reason = 'user';
                    if (this.lastAction === ACTIONS.PAUSE) {
                        reason = 'viewport';
                    } else if (this.lastAction === ACTIONS.PAUSE_BY_SWITCHING) {
                        reason = 'itemchange';
                    }
                    this.lastAction = ACTIONS.NONE;

                    this.sendEvent('pause', {
                        event: {
                            reason: reason,
                            playbackTime: this.player.currentTime()
                        }
                    });
                });

                this.player.on('ended', () => {
                    this.isPlayed = false;
                    this.isEnded = true;
                    this.playingState = globalVariables.VIDEO.PAUSE;
                    this.sendEvent('end');
                });

                this.player.on('fullscreenchange', () => {
                    let eventName = 'fullscreenOut';

                    if (this.player.isFullscreen()) {
                        eventName = 'fullscreenIn';
                    }

                    this.sendEvent(eventName, { event: { playbackTime: this.player.currentTime() } });
                });

                let videoSeekStart = null;
                let previousTime = 0;
                let currentTime = 0;

                this.player.on('timeupdate', () => {
                    previousTime = currentTime;
                    currentTime = this.player.currentTime();
                });

                this.player.on('seeking', () => {
                    if (videoSeekStart === null) {
                        videoSeekStart = previousTime;
                    }
                });

                this.player.on('seeked', () => {
                    if (this.isEnded) {
                        this.isEnded = false;
                    } else {
                        this.sendEvent('seek', {
                            event: {
                                seekStart: videoSeekStart,
                                seekEnd: this.player.currentTime()
                            }
                        });
                    }

                    videoSeekStart = null;
                });

                this.player.on('error', (event) => {
                    // eslint-disable-next-line no-console
                    console.log('error', event);
                });

                if ($J.browser.touchScreen && $J.browser.mobile) {
                    this.player.on('touchstart', (e) => {
                        if ($J.$(e.target).getTagName() === 'video' && this.player.hasClass('vjs-user-active')) {
                            if (this.player.paused()) {
                                this.lastAction = ACTIONS.PLAY;
                                this.play();
                            } else {
                                this.pause();
                            }
                        }
                    });
                }

                this.player.on('ready', () => {
                    // This hack disables fullscreen on double-click without visual glitch.
                    // TODO: Use more proper way to disable fullscreen on double-click.
                    if (!this.option('controls.fullscreen')) {
                        this.player.off(this.player.tech_, 'dblclick', this.player.handleTechDoubleClick_);
                    }

                    if (this.option('controls.enable') && this.fullscreenState !== globalVariables.FULLSCREEN.OPENED && this.always) {
                        this.player.controlBar.hide();
                        this.player.bigPlayButton.hide();
                    }

                    if (this.isSlideShown && this.isInView && this.option('autoplay')) {
                        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always) {
                            this.player.muted(true);
                            this.lastAction = ACTIONS.PLAY;
                            this.play();
                            this.player.muted(true);
                        }
                    }

                    super.done();

                    this.sendContentLoadedEvent();
                });
            }
        }

        getThumbnailPoster(basePoster) {
            let result = basePoster;
            if (!result) {
                result = '';
            }

            if (this.thumbnail || this.thumbnail === 0) {
                const prefix = '&video.thumbPos=';
                const floatValueThumbnail = parseFloat(this.thumbnail);

                if (!isNaN(floatValueThumbnail) && floatValueThumbnail < this.info.original.duration) {
                    result += prefix + this.thumbnail;
                // eslint-disable-next-line
                } else if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(this.thumbnail)) {
                    result = this.thumbnail;
                }
            }

            return result;
        }

        calcContainerSize() {
            const size = this.instanceNode.getSize();

            if (!size.height || !size.width) {
                const originSize = { width: 0, height: 0 };

                originSize.width = this.info.original.width;
                originSize.height = this.info.original.height;

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

        createPinchEvent() {
            // difference between scale
            const FS_OUT = -0.08;
            const FS_IN = 0.11;

            super.createPinchEvent(this.instanceNode);

            this.pinchCloud.onPinchStart = (e) => {
                if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState)) { return; }
                this.pinchCloud.pinch = true;
                this.pinchCloud.scale = e.scale;
                this.sendEvent('pinchStart');
            };

            this.pinchCloud.onPinchMove = (e) => {
                if (this.pinchCloud.pinch && !this.pinchCloud.block) {
                    const s = e.scale - this.pinchCloud.scale;
                    if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                        if (s < FS_OUT) {
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

        onResize() {
            if (this.player) {
                if (!this.isSlideShown || !this.isInView) {
                    if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
                        this.pause();
                    }
                }

                if (this.pluginResizeDebounce) {
                    this.pluginResizeDebounce();
                }

                if (this.playingState === globalVariables.VIDEO.NONE) {
                    this.calcContainerSize();
                    const newSize = this.getThumbnailSize();
                    if (newSize > this.posterSize && newSize - this.posterSize >= NEW_IMAGE_FACTOR) {
                        this.posterSize = newSize;
                        this.player.poster(this.getPosterUrl());
                    }
                }

                return true;
            }

            return false;
        }

        getType() {
            return this.type;
        }

        destroy() {
            if (this.player) {
                this.player.off();
                this.player.dispose();
                this.player = null;
            }

            if (this.videoNode) {
                this.videoNode.remove();
                this.videoNode = null;
            }

            if (this.pluginResizeDebounce) {
                this.pluginResizeDebounce.cancel();
                this.pluginResizeDebounce = null;
            }

            this.instanceNode.clearEvents();
            this.instanceNode.removeClass('sirv-video');
            this.instanceNode.removeClass(DISABLE_CLASS);
            this.instanceNode.removeClass(QUALITY_CONTROL);
            this.instanceNode.removeClass(SPEED_CONTROL);
            this.playPromise = null;

            this.HLS = [];

            super.destroy();

            return true;
        }
    }

    return VideoInstance;
})();

return Video;

    }
);
