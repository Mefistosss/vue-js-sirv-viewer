Sirv.define('Video', ['require', 'module', 'bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Promise!', 'EventEmitter', 'Instance', 'defaultsVideoOptions'], function (sirvRequire, sirvModule, bHelpers, magicJS, globalVariables, globalFunctions, helper, Promise, EventEmitter, Instance, defaultsVideoOptions) {
  var moduleName = 'Video';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-sirv-video .js-focus-visible .vjs-menu li.vjs-menu-item:hover,.smv-sirv-video .js-focus-visible .vjs-menu li.vjs-selected:hover,.smv-sirv-video .vjs-menu li.vjs-menu-item:focus,.smv-sirv-video .vjs-menu li.vjs-menu-item:hover,.smv-sirv-video .vjs-menu li.vjs-selected,.smv-sirv-video .vjs-menu li.vjs-selected:focus,.smv-sirv-video .vjs-menu li.vjs-selected:hover{background-color:transparent;color:inherit}.smv-sirv-video .vjs-playback-rate .vjs-playback-rate-value,.smv-sirv-video .vjs-quality-selector .vjs-icon-placeholder{font-size:1.2em;line-height:2.5em;pointer-events:none}.smv-sirv-video.video-js .vjs-big-play-button,.smv-sirv-video.video-js .vjs-control-bar,.smv-sirv-video.video-js .vjs-menu-button .vjs-menu-content,.smv-sirv-video.video-js .vjs-volume-vertical{background-color:rgba(55,58,60,.8)}.smv-sirv-video{position:relative;top:0;left:0;width:100%!important;height:100%!important}.smv-sirv-video :focus{outline:0}.smv-sirv-video .vjs-poster{background-color:transparent}.smv-sirv-video .vjs-button{display:inline-block;transition:none;border:0!important;background:0 0;color:inherit;font-size:inherit;line-height:inherit;text-decoration:none;text-transform:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.smv-sirv-video .vjs-big-play-button{top:50%;left:50%;width:1.2em;height:1.2em;margin-top:-.6em;margin-left:-.6em;border:.04em solid transparent;border-radius:1em;color:inherit!important;font-size:5em;letter-spacing:0!important;line-height:1.2em;box-shadow:none}.smv-sirv-video:hover .vjs-big-play-button{border-color:transparent}.smv-sirv-video.vjs-controls-disabled .vjs-big-play-button,.smv-sirv-video.vjs-has-started .vjs-big-play-button{display:block;transition:opacity .25s}.smv-sirv-video.vjs-has-started.vjs-playing .vjs-big-play-button{opacity:0;pointer-events:none}.smv-sirv-video.vjs-has-started.vjs-paused .vjs-big-play-button{opacity:1}.smv-sirv-video .vjs-quality-selector .vjs-icon-placeholder{line-height:1}.smv-sirv-video.video-js{background-color:transparent;color:#fff;font-size:10px}.smv-sirv-video.video-js:not(.vjs-has-started) .vjs-tech{opacity:.001}.smv-sirv-video.video-js .vjs-control-bar :last-child .vjs-menu{left:100%;transform:translateX(-100%)}.smv-sirv-video.video-js .vjs-control-bar .vjs-control{color:inherit!important;box-shadow:none}.smv-sirv-video.video-js .vjs-control-bar .vjs-control .vjs-icon-placeholder{font-family:VideoJS;font-style:normal;font-weight:400;line-height:1}.smv-sirv-video.video-js .vjs-control-bar .vjs-control.vjs-quality-selector,.smv-sirv-video.video-js .vjs-control-bar .vjs-control.vjs-resolution{margin-right:.4em}.smv-sirv-video.video-js.vjs-has-started .vjs-control-bar{transition:visibility .2s,opacity .2s}.smv-sirv-video.video-js .vjs-menu-button{padding:0}.smv-sirv-video.video-js .vjs-slider{background-color:rgba(255,255,255,.2)}.smv-sirv-video.video-js .vjs-progress-control .vjs-progress-holder{transform:scaleY(.6);transition:transform .1s cubic-bezier(.4,0,1,1);font-size:1.6666666667em}.smv-sirv-video.video-js .vjs-progress-control .vjs-play-progress::before{transform:scale(0);transition:transform .1s cubic-bezier(.4,0,1,1)}.smv-sirv-video.video-js .vjs-progress-control:hover .vjs-play-progress::before,.smv-sirv-video.video-js .vjs-progress-control:hover .vjs-progress-holder{transform:none}.smv-sirv-video.video-js .vjs-load-progress{background-color:transparent}.smv-sirv-video.video-js .vjs-load-progress div{background:rgba(255,255,255,.4)}.smv-sirv-video.video-js .vjs-menu{left:50%;width:8em;transform:translateX(-50%)}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item{padding:.6em .6em .3em;font-size:1.2em;text-align:left;text-transform:none}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item~.vjs-menu-item{padding-top:.3em}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item::before{padding:0 1em;font-family:VideoJS;font-size:.66em;content:\'\\f111\';opacity:0}.smv-sirv-video.video-js .vjs-menu .vjs-menu-item.vjs-selected::before{opacity:1}.smv-sirv-video.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical{transition:visibility .1s,opacity .1s,height .1s,width .1s,left 0s,top 0s}:root:not(.mobile-magic) .smv-sirv-video.video-js.vjs-has-started:not(:hover) .vjs-control-bar{opacity:0}.smv-disabled-action .vjs-tech{pointer-events:none!important}.smv-disabled-action .vjs-poster{pointer-events:none!important}.smv .vjs-quality-selector .vjs-menu-content .vjs-menu-title{display:none}.smv .smv-q-last .vjs-quality-selector .vjs-menu,.smv .smv-s-last .vjs-playback-rate .vjs-menu{right:0;left:auto!important;transform:none!important}';
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

  var Video = function () {
    var P = globalVariables.smv; // Video playback rates (speed)

    var PLAYBACK_RATES = [0.5, 1, 1.5, 2];
    var DISABLE_CLASS = P + '-disabled-action';
    var HOST = 'https://video.sirv.com';
    var INFO = 'sirv_video_info_';
    var QUALITY_CONTROL = P + '-q-last';
    var SPEED_CONTROL = P + '-s-last';
    var NEW_IMAGE_FACTOR = 50 * $J.DPPX;
    var ACTIONS = {
      NONE: 0,
      PLAY: 1,
      PLAY_SREEN_IN: 2,
      PLAY_BY_USER: 3,
      PLAY_BY_SWITCHING: 4,
      PAUSE: 5,
      PAUSE_BY_SWITCHING: 6
    };
    var cssID = 'sirv-stylesheet-vjs';

    var loadCSS = function (rootNode) {
      // return globalFunctions.rootDOM.addStyle(rootNode, sirvModule.config().libcss, cssID, '#' + globalFunctions.rootDOM.mainCSSID);
      return globalFunctions.rootDOM.addStyle(rootNode, sirvModule.config().libcss, cssID); // videojs css must be added before sirv.css
    };

    var loadVideoJS = function () {
      return new Promise(function (resolve) {
        sirvRequire([sirvModule.config().libjs], resolve);
      });
    };

    var loadQualitySelectorCSS = function (rootNode) {
      return globalFunctions.rootDOM.addStyle(rootNode, sirvModule.config().qualitySelectorcss, 'sirv-stylesheet-vjs-quality-selector', '#' + globalFunctions.rootDOM.mainCSSID);
    };

    var loadQualitySelector = function () {
      return new Promise(function (resolve) {
        sirvRequire([sirvModule.config().qualitySelectorjs], resolve);
      });
    };

    var getVideoType = function (src) {
      src = src || '';
      src = src.split('?')[0];
      src = src.split('.');
      src = src[src.length - 1];
      src = src.toLowerCase();

      switch (src) {
        case '3gp':
          src = 'video/3gpp'; // src = 'video/3gpp; codecs="mp4v.20.8, samr"';

          break;

        case 'flv':
          src = 'video/flv'; // src = 'video/flv; codecs="flv"';

          break;

        case 'mp4':
          src = 'video/mp4'; // src = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

          break;

        case 'ogv':
          src = 'video/ogg'; // src = 'video/ogg; codecs="theora, vorbis"';

          break;

        case 'webm':
          src = 'video/webm'; // src = 'video/webm; codecs="vp8, vorbis"';

          break;

        default:
          src = '';
      }

      return src;
    };

    var calcBandwidth = function (hls, fps, motionFactor) {
      // return hls.width * hls.height * 24 / 8;
      // https://www.miracletutorials.com/bitrate-hls-video/
      // width * height * fps * motion_factor * 0.07
      // 1 = little motion
      // 2 = moderate motion
      // 3 = more motion
      // 4 = high motion
      return parseInt(hls.width * hls.height * fps * motionFactor * 0.07, 10);
    };

    var VideoInstance = /*#__PURE__*/function (_Instance) {
      "use strict";

      bHelpers.inheritsLoose(VideoInstance, _Instance);

      function VideoInstance(node, options) {
        var _this;

        _this = _Instance.call(this, node, options, defaultsVideoOptions) || this;
        _this.type = globalVariables.SLIDE.TYPES.VIDEO;
        _this.url = _this.instanceNode.attr('data-src');
        _this.info = null;
        _this.HLS = [];
        _this.currentSize = {
          width: 0,
          height: 0
        };
        _this.videoNode = null;
        _this.areSourcesAdded = false;
        _this.indexOfCurrentHls = 0;
        _this.player = null;
        _this.thumbnail = _this.option('thumbnail');
        _this.currentTime = 0;
        _this.isVideoPaused = false;
        _this.fps = 30;
        _this.pluginResizeDebounce = null;
        _this.playPromise = null;
        _this.posterSize = null;
        _this.lastAction = ACTIONS.NONE;
        _this.isPlayed = false;
        _this.isEnded = false; // because sometimes when we call this.player.start() and the video is not loaded yet the videojs throw error when we call this.player.pause()

        _this.playingState = globalVariables.VIDEO.NONE;
        _this.nativeFullscreen = options.nativeFullscreen;
        var baseUrl = globalFunctions.normalizeURL(_this.url.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));

        var params = _this.url.replace(globalVariables.REG_URL_QUERY_STRING, '$2');

        _this.url = baseUrl;

        if (params) {
          _this.url += '?' + params;
        }

        _this.disableAction();

        _this.isLoadeddata = false;
        _this.controlsFullscreen = _this.option('controls.fullscreen'); // this.api = $J.extend(this.api, {
        //     isReady: this.isReady.bind(this), // parent class
        //     resize: this.resize.bind(this), // parent class
        //     getOptions: this.getOptions.bind(this) // parent class
        // });

        _this.getInfo(); // for shadow dom we must add it after the element will be in dom to detect where the viewer is started
        // this.addSources();


        return _this;
      }

      var _proto = VideoInstance.prototype;

      _proto.normalizeOptions = function normalizeOptions() {
        var min = this.option('quality.min');
        var max = this.option('quality.max');

        if (min > max) {
          this.option('quality.max', min);
        }
      } // eslint-disable-next-line class-methods-use-this
      ;

      _proto.getOriginImageUrl = function getOriginImageUrl() {
        return null;
      };

      _proto.getSelectorImgUrl = function getSelectorImgUrl(data) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          var size = data.width || data.height;
          var thumbnailPosterSelector = _this2.url.split('?')[0] + '?thumbnail=' + size;

          if ($J.DPPX > 1) {
            thumbnailPosterSelector = _this2.url.split('?')[0] + '?thumbnail=' + size * $J.DPPX + '&quality=60';
          }

          if (_this2.thumbnail) {
            if (!isNaN(parseFloat(_this2.thumbnail))) {
              thumbnailPosterSelector = _this2.getThumbnailPoster(thumbnailPosterSelector);
            } else {
              thumbnailPosterSelector = _this2.thumbnail;
            }
          }

          var obj = {
            src: thumbnailPosterSelector,
            callbackData: data.callbackData
          };

          if ($J.DPPX > 1) {
            obj.srcset = thumbnailPosterSelector;
          }

          _this2.getInfo().then(function () {
            // this.waitToStart.wait(() => {
            resolve(obj); // });
          }).catch(reject);
        });
      };

      _proto.disableAction = function disableAction() {
        if (this.always && $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState)) {
          this.instanceNode.addClass(DISABLE_CLASS);
        }
      };

      _proto.enableAction = function enableAction() {
        if (this.always) {
          this.instanceNode.removeClass(DISABLE_CLASS);
        }
      };

      _proto.getInfo = function getInfo() {
        var _this3 = this;

        if (!this.gettingInfoPromise) {
          this.gettingInfoPromise = new Promise(function (resolve, reject) {
            _this3.waitGettingInfo.wait(function () {
              var url = _this3.url;
              var hash = $J.getHashCode(_this3.url.split('?')[0].replace(/^http(s)?:\/\//, ''));

              if (/\?/.test(url)) {
                url += '&';
              } else {
                url += '?';
              } // url += ('nometa&info=' + INFO + hash + '_main');
              // we need meta because we need fps


              url += 'info=' + INFO + hash + '_main';
              helper.getRemoteData(url, 'video_info_' + helper.generateUUID(), _this3.referrerPolicy).then(function (data) {
                if (!_this3.destroyed) {
                  _this3.info = data;

                  if (_this3.info.QuickTime && _this3.info.QuickTime.VideoFrameRate) {
                    _this3.fps = _this3.info.QuickTime.VideoFrameRate;
                  }

                  _this3.HLS = _this3.info.original.HLS || [];

                  if (_this3.HLS.length > 1) {
                    _this3.HLS.sort(function (a, b) {
                      var result = 0;

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

                  _this3.infoSize = {
                    width: _this3.info.original.width,
                    height: _this3.info.original.height
                  };
                  resolve(_this3.infoSize);
                }
              }).catch(function (err) {
                if (!_this3.destroyed) {
                  reject(err);
                }
              });
            });
          });
        }

        return this.gettingInfoPromise;
      };

      _proto.getInfoSize = function getInfoSize() {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          _this4.getInfo().then(function () {
            resolve({
              size: _this4.infoSize
            });
          }).catch(function (err) {
            reject({
              error: err
            });
          });
        });
      };

      _proto.addSources = function addSources() {
        var _this5 = this;

        var nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
        Promise.all([loadCSS($J.D.node.head || $J.D.node.body), loadCSS(nodeWithSirvClassName), loadVideoJS(), loadQualitySelectorCSS(nodeWithSirvClassName), loadQualitySelector()]).finally(function () {
          _this5.areSourcesAdded = true;

          if (_this5.isStarted) {
            if (_this5.isInView && (_this5.preload || _this5.isSlideShown)) {
              _this5.createVideoNode();
            }
          }
        });
      };

      _proto.onStartActions = function onStartActions(who) {
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
      };

      _proto.onStopActions = function onStopActions() {
        if (this.player) {
          if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
            this.lastAction = ACTIONS.PAUSE_BY_SWITCHING;
            this.pause();
          }
        }
      };

      _proto.onInView = function onInView(value) {
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
      };

      _proto.startFullInit = function startFullInit(options) {
        if (this.isStartedFullInit) {
          return;
        }

        _Instance.prototype.startFullInit.call(this, options);

        this.normalizeOptions();
        this.thumbnail = this.option('thumbnail');
        this.getId('video-');
        this.instanceNode.addClass('sirv-video');
        this.instanceNode.addEvent('mousedown', function (e) {
          e.stop();
        });
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {
        this.controlsFullscreen = false;

        if (this.player) {
          this.isVideoPaused = this.playingState === globalVariables.VIDEO.PAUSE; // if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
          //     this.currentTime = this.player.currentTime();
          //     this.pause();
          // }

          this.toggleFullscreenButton();
        }
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto.onAfterFullscreenIn = function onAfterFullscreenIn(data) {
        this.enableAction();

        if (this.isSlideShown && this.isInView && this.player) {
          if (this.player.paused()) {
            if (this.always) {
              if (this.option('controls.enable')) {
                this.player.controlBar.show();
                this.player.bigPlayButton.show();
              }
            } // if (this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE && !this.isVideoPaused) {
            // if ((this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE) && !this.isVideoPaused) {


            if (this.option('autoplay') && !this.isVideoPaused) {
              this.player.currentTime(this.currentTime);
              this.playingState = globalVariables.VIDEO.PLAY; // from v 7.2.3; The method 'play_' fix bug with chenching container

              this.player.play_();
            }
          }
        }
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {
        this.disableAction();

        if (this.option('controls.fullscreen')) {
          this.controlsFullscreen = true;
        }

        if (this.player) {
          this.isVideoPaused = this.playingState === globalVariables.VIDEO.PAUSE; // if (!this.player.paused() && this.playingState === globalVariables.VIDEO.PLAYING) {
          //     this.currentTime = this.player.currentTime();
          //     this.pause();
          // }

          this.toggleFullscreenButton();
        }
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto.onAfterFullscreenOut = function onAfterFullscreenOut(data) {
        if (this.isSlideShown && this.isInView) {
          if (this.player) {
            if (this.always && this.option('controls.enable')) {
              this.player.controlBar.hide();
              this.player.bigPlayButton.hide();
            } // if (this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE && !this.isVideoPaused) {
            // if ((this.option('autoplay') || this.playingState !== globalVariables.VIDEO.NONE) && !this.isVideoPaused) {


            if (this.option('autoplay') && !this.isVideoPaused) {
              // this.player.currentTime(this.currentTime);
              this.lastAction = ACTIONS.PLAY;
              this.play();
            }
          }
        }
      };

      _proto.onSecondSelectorClick = function onSecondSelectorClick() {
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
      };

      _proto.createVideoNode = function createVideoNode() {
        if (!this.videoNode) {
          this.videoNode = $J.$new('video', {
            'class': P + '-sirv-video',
            preload: 'none'
          });
          this.videoNode.addClass('video-js');
          this.instanceNode.append(this.videoNode);
          this.waitToStart.start();
          this.done();
        }
      };

      _proto.play = function play() {
        if (this.player && !this.playPromise) {
          this.playingState = globalVariables.VIDEO.PLAY;
          this.playPromise = this.player.play();
        }
      };

      _proto.pause = function pause() {
        var _this6 = this;

        if (this.player) {
          // videojs play promise does not have 'finally' method for ie11
          // we have launch videojs player without promise because we have bug with standard play method when we are changing videojs player's time
          (this.playPromise || new Promise(function (resolve) {
            return resolve(null);
          })).then(function () {
            _this6.player.pause();

            _this6.playPromise = null;
          }).catch(function () {
            _this6.player.pause();

            _this6.playPromise = null;
          });
        }
      };

      _proto.loadContent = function loadContent() {
        this.createVideoNode();
      };

      _proto.run = function run(isShown, preload, firstSlideAhead) {
        var result = _Instance.prototype.run.call(this, isShown, preload, firstSlideAhead);

        if (result) {
          this.calcContainerSize();

          if (this.isInView && (this.preload || this.isSlideShown) && this.areSourcesAdded) {
            this.createVideoNode();
          }

          this.startGettingInfo();
        }

        return result;
      };

      _proto.createMasterManifest = function createMasterManifest() {
        var _this7 = this;

        var result = ['#EXTM3U'];
        var mf = this.option('motionFactor');
        var das = this.option('dynamicAdaptiveStreaming');
        this.HLS.forEach(function (HLS) {
          var str = '#EXT-X-STREAM-INF:PROGRAM-ID=1,';

          if (das) {
            str += 'BANDWIDTH=' + calcBandwidth(HLS, _this7.fps, mf) + ',';
          }

          str += 'RESOLUTION=' + HLS.width + 'x' + HLS.height;
          result.push(str);
          result.push(HOST + HLS.index);
        });
        return result.join('\n');
      };

      _proto.toggleFullscreenButton = function toggleFullscreenButton() {
        var ft = this.player.controlBar.getChild('FullscreenToggle');
        var ua = this.player.options_.userActions;

        if (this.controlsFullscreen) {
          ua.doubleClick = true;
          ft.show();
        } else {
          ua.doubleClick = false;
          ft.hide();
        }
      };

      _proto.isHLS = function isHLS() {
        return this.HLS.length > 0 && $J.browser.uaName !== 'ie';
      };

      _proto.getThumbnailSize = function getThumbnailSize() {
        var maxSize = this.isHLS() ? this.HLS[this.HLS.length - 1].height : this.info.height || this.info.original.height || 140;
        var size = maxSize;

        if (this.currentSize.height < size) {
          size = this.currentSize.height;
        }

        size *= $J.DPPX;

        if (size > maxSize) {
          size = maxSize;
        }

        return size;
      };

      _proto.getPosterUrl = function getPosterUrl() {
        return this.getThumbnailPoster(this.url.split('?')[0] + '?thumbnail=' + this.posterSize);
      };

      _proto.done = function done() {
        var _this8 = this;

        if (!this._isReady) {
          this.posterSize = this.getThumbnailSize();
          var posterImage = this.getPosterUrl(); // Position volume control verically, if it's enabled.

          var volumeControl = {
            inline: false
          };

          if (this.option('controls.volume') === false) {
            volumeControl = false;
          }

          var html5Options = {
            nativeTextTracks: false,
            nativeAudioTracks: false,
            nativeVideoTracks: false
          };
          var isHSL = this.isHLS();
          var vhsOptions = {
            overrideNative: isHSL && $J.browser.uaName !== 'safari'
          };
          html5Options.smoothQualityChange = true;
          html5Options.vhs = vhsOptions;
          var videoOptions = {
            controls: this.option('controls.enable'),
            fluid: false,
            muted: this.option('volume') === 0 || this.option('autoplay'),
            loop: this.option('loop'),
            autoplay: this.option('autoplay') && this.isSlideShown,
            preload: this.option('autoplay') || this.option('preload') ? 'auto' : 'none',
            textTrackSettings: false,
            controlBar: {
              fullscreenToggle: true,
              // we will toggle it by itself
              volumePanel: volumeControl,
              muteToggle: false,
              children: ['playToggle', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'liveDisplay', 'remainingTimeDisplay', 'volumePanel', 'customControlSpacer', 'playbackRateMenuButton', 'chaptersButton', 'descriptionsButton', 'subsCapsButton', 'audioTrackButton', 'fullscreenToggle']
            },
            poster: posterImage,
            playsinline: true,
            html5: html5Options,
            userActions: {
              doubleClick: true
            },
            qualityLevels: {} // errorDisplay: false // it does not work

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
            this.pluginResizeDebounce = helper.debounce(function () {
              _this8.player.hlsQualitySelectorAutoMode.recalc();
            }, 600);
          } else {
            videoOptions.src = this.url;
            var vType = getVideoType(this.url);
            this.videoNode.append($J.$new('source', {
              src: this.url,
              type: vType
            }));
            this.player = videojs(this.videoNode.node, videoOptions);
          }

          this.player.volume(parseInt(this.option('volume'), 10) / 100);
          this.toggleFullscreenButton();
          this.player.on('loadeddata', function () {
            _this8.isLoadeddata = true;
          });
          this.player.on('play', function () {
            _this8.isVideoPaused = false; // const isPaused = this.playingState !== globalVariables.VIDEO.NONE;

            _this8.playingState = globalVariables.VIDEO.PLAYING;

            if (!_this8.isSlideShown || !_this8.isInView) {
              _this8.lastAction = ACTIONS.PAUSE;

              _this8.pause();
            } else {
              var reason = 'user';

              if (_this8.lastAction === ACTIONS.PLAY_SREEN_IN) {
                reason = 'viewport';
              } else if (_this8.lastAction === ACTIONS.PLAY) {
                reason = 'autoplay';
              } else if (_this8.lastAction === ACTIONS.PLAY_BY_SWITCHING) {
                reason = 'itemchange';
              }

              _this8.lastAction = ACTIONS.NONE;

              if (_this8.isPlayed) {
                _this8.sendEvent('resume', {
                  event: {
                    reason: reason,
                    playbackTime: _this8.player.currentTime()
                  }
                });
              } else {
                _this8.isPlayed = true;

                _this8.sendEvent('play', {
                  event: {
                    reason: reason
                  }
                });
              }
            }
          });
          this.player.on('pause', function () {
            if (_this8.player.currentTime() === _this8.player.duration()) {
              return;
            }

            _this8.playingState = globalVariables.VIDEO.PAUSE;
            var reason = 'user';

            if (_this8.lastAction === ACTIONS.PAUSE) {
              reason = 'viewport';
            } else if (_this8.lastAction === ACTIONS.PAUSE_BY_SWITCHING) {
              reason = 'itemchange';
            }

            _this8.lastAction = ACTIONS.NONE;

            _this8.sendEvent('pause', {
              event: {
                reason: reason,
                playbackTime: _this8.player.currentTime()
              }
            });
          });
          this.player.on('ended', function () {
            _this8.isPlayed = false;
            _this8.isEnded = true;
            _this8.playingState = globalVariables.VIDEO.PAUSE;

            _this8.sendEvent('end');
          });
          this.player.on('fullscreenchange', function () {
            var eventName = 'fullscreenOut';

            if (_this8.player.isFullscreen()) {
              eventName = 'fullscreenIn';
            }

            _this8.sendEvent(eventName, {
              event: {
                playbackTime: _this8.player.currentTime()
              }
            });
          });
          var videoSeekStart = null;
          var previousTime = 0;
          var currentTime = 0;
          this.player.on('timeupdate', function () {
            previousTime = currentTime;
            currentTime = _this8.player.currentTime();
          });
          this.player.on('seeking', function () {
            if (videoSeekStart === null) {
              videoSeekStart = previousTime;
            }
          });
          this.player.on('seeked', function () {
            if (_this8.isEnded) {
              _this8.isEnded = false;
            } else {
              _this8.sendEvent('seek', {
                event: {
                  seekStart: videoSeekStart,
                  seekEnd: _this8.player.currentTime()
                }
              });
            }

            videoSeekStart = null;
          });
          this.player.on('error', function (event) {
            // eslint-disable-next-line no-console
            console.log('error', event);
          });

          if ($J.browser.touchScreen && $J.browser.mobile) {
            this.player.on('touchstart', function (e) {
              if ($J.$(e.target).getTagName() === 'video' && _this8.player.hasClass('vjs-user-active')) {
                if (_this8.player.paused()) {
                  _this8.lastAction = ACTIONS.PLAY;

                  _this8.play();
                } else {
                  _this8.pause();
                }
              }
            });
          }

          this.player.on('ready', function () {
            // This hack disables fullscreen on double-click without visual glitch.
            // TODO: Use more proper way to disable fullscreen on double-click.
            if (!_this8.option('controls.fullscreen')) {
              _this8.player.off(_this8.player.tech_, 'dblclick', _this8.player.handleTechDoubleClick_);
            }

            if (_this8.option('controls.enable') && _this8.fullscreenState !== globalVariables.FULLSCREEN.OPENED && _this8.always) {
              _this8.player.controlBar.hide();

              _this8.player.bigPlayButton.hide();
            }

            if (_this8.isSlideShown && _this8.isInView && _this8.option('autoplay')) {
              if (_this8.fullscreenState === globalVariables.FULLSCREEN.OPENED || !_this8.always) {
                _this8.player.muted(true);

                _this8.lastAction = ACTIONS.PLAY;

                _this8.play();

                _this8.player.muted(true);
              }
            }

            _Instance.prototype.done.call(_this8);

            _this8.sendContentLoadedEvent();
          });
        }
      };

      _proto.getThumbnailPoster = function getThumbnailPoster(basePoster) {
        var result = basePoster;

        if (!result) {
          result = '';
        }

        if (this.thumbnail || this.thumbnail === 0) {
          var prefix = '&video.thumbPos=';
          var floatValueThumbnail = parseFloat(this.thumbnail);

          if (!isNaN(floatValueThumbnail) && floatValueThumbnail < this.info.original.duration) {
            result += prefix + this.thumbnail; // eslint-disable-next-line
          } else if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(this.thumbnail)) {
            result = this.thumbnail;
          }
        }

        return result;
      };

      _proto.calcContainerSize = function calcContainerSize() {
        var size = this.instanceNode.getSize();

        if (!size.height || !size.width) {
          var originSize = {
            width: 0,
            height: 0
          };
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
      };

      _proto.createPinchEvent = function createPinchEvent() {
        var _this9 = this;

        // difference between scale
        var FS_OUT = -0.08;
        var FS_IN = 0.11;

        _Instance.prototype.createPinchEvent.call(this, this.instanceNode);

        this.pinchCloud.onPinchStart = function (e) {
          if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING], _this9.fullscreenState)) {
            return;
          }

          _this9.pinchCloud.pinch = true;
          _this9.pinchCloud.scale = e.scale;

          _this9.sendEvent('pinchStart');
        };

        this.pinchCloud.onPinchMove = function (e) {
          if (_this9.pinchCloud.pinch && !_this9.pinchCloud.block) {
            var s = e.scale - _this9.pinchCloud.scale;

            if (_this9.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
              if (s < FS_OUT) {
                _this9.pinchCloud.block = true;

                _this9.sendEvent('fullscreenOut');
              }
            } else if (e.scale >= FS_IN) {
              _this9.pinchCloud.block = true;

              _this9.sendEvent('fullscreenIn');
            }
          }
        };
      };

      _proto.onResize = function onResize() {
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
            var newSize = this.getThumbnailSize();

            if (newSize > this.posterSize && newSize - this.posterSize >= NEW_IMAGE_FACTOR) {
              this.posterSize = newSize;
              this.player.poster(this.getPosterUrl());
            }
          }

          return true;
        }

        return false;
      };

      _proto.getType = function getType() {
        return this.type;
      };

      _proto.destroy = function destroy() {
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

        _Instance.prototype.destroy.call(this);

        return true;
      };

      return VideoInstance;
    }(Instance);

    return VideoInstance;
  }();

  return Video;
});
//# sourceMappingURL=video.js.map
