Sirv.define('ViewerImage', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Promise!', 'ResponsiveImage', 'HotspotInstance', 'Hotspots', 'getDPPX'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, Promise, ResponsiveImage, HotspotInstance, Hotspots, getDPPX) {
  var moduleName = 'ViewerImage';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container{position:absolute!important}.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container.sirv-hotspot-overwrite-pointer-event{pointer-events:auto!important}';
  });
  /* end-removable-module-css */

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

  var BRAND_LANDING = 'https://sirv.com/about-image/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(image)&utm_campaign=branding'; // eslint-disable-next-line no-unused-vars

  var ViewerImage = /*#__PURE__*/function (_HotspotInstance) {
    "use strict";

    bHelpers.inheritsLoose(ViewerImage, _HotspotInstance);

    function ViewerImage(node, options) {
      var _this;

      _this = _HotspotInstance.call(this, node, options, {}) || this;
      _this.type = globalVariables.SLIDE.TYPES.IMAGE;

      _this.instanceNode.attr('referrerpolicy', _this.referrerPolicy);

      _this.image = null;
      _this.isInfoLoaded = false;
      _this.getImageInfoPromise = null;
      _this.loadStaticImagePromise = null;
      _this.imageShowPromise = null;
      _this.srcWasSetted = false;
      _this.lastImageSize = {
        width: 0,
        height: 0
      };
      _this.imageIndex = options.imageIndex;
      _this.dppx = 1;
      _this.upscale = false;
      _this.size = {
        width: 0,
        height: 0
      };
      _this.dontLoad = true;
      _this.accountInfo = {};
      _this.countOfTries = 1;
      _this.isFullscreen = options.isFullscreen;
      _this.nativeFullscreen = options.nativeFullscreen;
      _this.infoAlt = null;
      _this.originAlt = _this.instanceNode.attr('alt');
      _this.originTitle = _this.instanceNode.attr('title');
      _this.src = _this.instanceNode.attr('src');
      _this.srcset = _this.instanceNode.attr('srcset');
      _this.startedSrc = _this.src;
      _this.dataSrc = _this.instanceNode.attr('data-src');
      _this.isStaticImage = _this.src && !_this.dataSrc;
      _this.imageUrl = _this.dataSrc || _this.src;
      _this.getImageTimer = helper.debounce(function () {
        _this.getImage();
      }, 32);
      _this.firstSlideAhead = false; // Image URL

      _this.src = globalFunctions.normalizeURL(_this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
      _this.queryParamsQuality = null;
      _this.queryParams = helper.paramsFromQueryString(_this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2')); // Image default params

      _this.getQueryParams();

      _this.isNotSirv = false;

      if (helper.isSVG(_this.imageUrl)) {
        _this.isNotSirv = true;
      } // this.api = $J.extend(this.api, {
      //     isReady: this.isReady.bind(this), // parent class
      //     resize: this.resize.bind(this), // parent class
      //     getOptions: this.getOptions.bind(this) // parent class
      //     hotspots: {} // parent class, hotspots api
      // });


      _this.createHotspotsClass(Hotspots);

      _this.createSirvImage();

      return _this;
    }

    var _proto = ViewerImage.prototype;

    _proto.sendEvent = function sendEvent(typeOfEvent, data) {
      if (!data) {
        data = {};
      }

      data.imageIndex = this.imageIndex;

      _HotspotInstance.prototype.sendEvent.call(this, typeOfEvent, data);
    };

    _proto.getInfo = function getInfo() {
      var _this2 = this;

      if (!this.gettingInfoPromise) {
        this.gettingInfoPromise = new Promise(function (resolve, reject) {
          _this2.waitGettingInfo.wait(function () {
            _this2.image.getImageInfo().then(function (info) {
              if (!_this2.destroyed) {
                _this2.isInfoLoaded = true;
                _this2.infoAlt = _this2.image.getDescription();
                _this2.infoSize = _this2.image.getOriginSize();
                _this2.accountInfo = _this2.image.getAccountInfo();
                _this2.hotspotsData = info.hotspots;

                if (_this2.hotspots) {
                  _this2.hotspots.setOriginImageSize(_this2.infoSize.width, _this2.infoSize.height);
                }

                resolve();
              }
            }).catch(function (err) {
              if (!_this2.destroyed) {
                _this2.isInfoLoaded = true;

                if (!err.status || err.status !== 404) {
                  _this2.isNotSirv = true;
                }

                reject(err);
              }
            });
          });
        });
      }

      return this.gettingInfoPromise;
    };

    _proto.getQueryParams = function getQueryParams() {
      if (this.imageUrl) {
        if (this.queryParams) {
          var q = parseInt(this.queryParams.quality, 10);

          if (isNaN(q)) {
            delete this.queryParams.quality;
          } else {
            this.queryParams.quality = q;
          }
        }

        this.queryParamsQuality = this.queryParams.quality || null;
      }
    };

    _proto.getImageCreateSettings = function getImageCreateSettings() {
      var setts = {
        src: {},
        srcset: {}
      };

      if (this.quality !== null && this.queryParamsQuality === null) {
        setts.src.quality = this.quality;
      }

      var hdQuality = this.hdQuality;

      if (this.queryParamsQuality === null || this.isHDQualitySet && hdQuality < this.queryParamsQuality) {
        setts.srcset = {
          quality: hdQuality
        };
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
    };

    _proto.setHDQuality = function setHDQuality(opt) {
      if (opt.dppx > 1 && opt.dppx < 1.5) {
        if (this.queryParamsQuality === null && this.quality !== null) {
          opt.srcset.quality = this.quality;
        } else if (opt.srcset) {
          delete opt.srcset.quality;
        }
      }

      return opt;
    };

    _proto.replaceSrc = function replaceSrc() {
      var img;

      if (this.isNotSirv) {
        if (this.srcWasSetted) {
          return;
        }

        this.srcWasSetted = true;
        img = {
          src: this.imageUrl
        };
      } else {
        var opt = this.getImageCreateSettings();

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
    };

    _proto.showImage = function showImage() {
      var _this3 = this;

      if (!this.imageShowPromise) {
        // eslint-disable-next-line
        this.imageShowPromise = new Promise(function (resolve, reject) {
          if (_this3.isStaticImage) {
            _this3.instanceNode.setCssProp('opacity', '');

            resolve();
          } else if (_this3.isInView && _this3.isSlideShown) {
            _this3.instanceNode.addEvent('transitionend', function (e) {
              if (e.propertyName === 'opacity') {
                e.stop();

                _this3.instanceNode.removeEvent('transitionend');

                _this3.instanceNode.setCss({
                  opacity: '',
                  transition: ''
                });

                resolve();
              }
            });

            _this3.instanceNode.getSize();

            _this3.instanceNode.setCss({
              opacity: 1,
              transition: 'opacity 0.3s linear'
            });
          } else {
            _this3.instanceNode.setCssProp('opacity', '');

            resolve();
          }
        });
      }

      return this.imageShowPromise;
    };

    _proto.createSirvImage = function createSirvImage() {
      var _this4 = this;

      if (!this.imageUrl || this.isNotSirv) {
        return;
      }

      this.on('imageOnload', function (e) {
        e.stopAll();

        _this4.replaceSrc();

        if (!_this4._isReady) {
          if (e.data.node) {
            _this4.showImage().finally(function () {
              _this4.done();
            });
          } else {
            helper.loadImage(_this4.instanceNode).finally(function () {
              _this4.showImage().finally(function () {
                _this4.done();

                _this4.sendContentLoadedEvent();
              });
            });
          }
        }
      });
      this.on('imageOnerror', function (e) {
        e.stopAll();
        console.log('image error');
      });
      this.image = new ResponsiveImage(this.imageUrl, {
        imageSettings: this.queryParams,
        round: true,
        dontLoad: this.dontLoad,
        referrerPolicy: this.referrerPolicy
      });
      this.image.setParent(this);
      this.getInfo();
    };

    _proto.getInfoSize = function getInfoSize() {
      var _this5 = this;

      if (!this.getImageInfoPromise) {
        this.getImageInfoPromise = new Promise(function (resolve, reject) {
          if (_this5.image) {
            _this5.getInfo().then(function () {
              resolve({
                size: _this5.infoSize,
                imageIndex: _this5.imageIndex
              });
            }).catch(function (err) {
              reject({
                error: err,
                isPlaceholder: err._isplaceholder,
                imageIndex: _this5.imageIndex
              });
            });
          } else {
            reject({
              error: 'nonsirv',
              isPlaceholder: false,
              imageIndex: _this5.imageIndex
            });
          }
        });
      }

      return this.getImageInfoPromise;
    };

    _proto.startFullInit = function startFullInit(options) {
      if (this.isStartedFullInit) {
        return;
      }

      _HotspotInstance.prototype.startFullInit.call(this, options);

      this.getId('responsive-image-'); // TODO check css

      if (!this.isStaticImage) {
        this.instanceNode.setCssProp('opacity', 0);
      }
    };

    _proto.run = function run(isShown, preload, firstSlideAhead, loadContent) {
      var _this6 = this;

      this.firstSlideAhead = firstSlideAhead;

      var result = _HotspotInstance.prototype.run.call(this, isShown, preload, firstSlideAhead);

      if (result) {
        if (this.destroyed) {
          result = false;
        } else {
          // Remove ALT to properly calculate image size.
          // Safari and Edge/IE return image size with a height if ALT text is present.
          this.instanceNode.removeAttr('alt'); // Remove TITLE to properly calculate image size.
          // The latest version(s) of Chrome returns image size with a height if TITLE is set.

          this.instanceNode.removeAttr('title'); // This force browsers to re-layout image and recalculate its dimensions.

          this.instanceNode.setCss({
            display: 'inline-flex'
          }).getSize();
          this.instanceNode.setCss({
            display: ''
          }).getSize();
          var size = null;
          helper.imageLib.getSize(this.instanceNode.node.parentNode).then(function (dataSize) {
            size = dataSize;
          }).finally(function () {
            if (!_this6.destroyed) {
              // sometimes when we have very slow internet connection and the image is first slide and thumbnails have left position we get wrong height
              if (size.width && size.height <= 20) {
                size.height = 0;
              } // size = helper.fixSize(this.instanceNode, size);


              _this6.size = helper.imageLib.calcProportionSize(size, _this6.infoSize);

              if (_this6.originAlt || _this6.infoAlt) {
                // Restore ALT text
                $(_this6.instanceNode).attr('alt', _this6.originAlt || _this6.infoAlt);
              }

              if (_this6.originTitle) {
                // Restore TITLE text
                $(_this6.instanceNode).attr('title', _this6.originTitle);
              }

              if (_this6.isStaticImage) {
                _this6.loadStaticImage().finally(function () {
                  if (_this6.isInfoLoaded) {
                    _this6.done();
                  }
                });
              } else {
                if (_this6.originAlt) {
                  // Restore ALT text
                  $(_this6.instanceNode).attr('alt', _this6.originAlt);
                }

                if (_this6.isInView && (_this6.isSlideShown || _this6.preload || loadContent)) {
                  _this6.getImage();
                }
              }

              if (_this6.dataAlt) {
                $(_this6.instanceNode).attr('alt', _this6.dataAlt);
              }
            }
          });
          this.startGettingInfo();
        }
      }

      return result;
    };

    _proto.loadContent = function loadContent() {
      this.getImage(true);
    };

    _proto.loadStaticImage = function loadStaticImage() {
      var _this7 = this;

      if (!this.loadStaticImagePromise) {
        this.loadStaticImagePromise = new Promise(function (resolve, reject) {
          if (_this7.isStaticImage) {
            if (_this7.instanceNode.node.complete) {
              resolve();
            } else {
              // eslint-disable-next-line
              _this7.instanceNode.addEvent('load', function (e) {
                _this7.sendContentLoadedEvent();

                resolve();
              }); // eslint-disable-next-line


              _this7.instanceNode.addEvent('error', function (e) {
                reject();
              });
            }
          } else {
            resolve();
          }
        });
      }

      return this.loadStaticImagePromise;
    };

    _proto.getImage = function getImage(loadContent) {
      var _this8 = this;

      if (this.isStaticImage) {
        return;
      }

      if (!this.isNotSirv && !this._isReady && !this.size.width && !this.size.height) {
        // fix for if the viewer was with display none
        if (this.countOfTries < 100) {
          setTimeout(function () {
            _this8.countOfTries += 1;
            _this8.isStarted = false;

            _this8.run(_this8.isSlideShown, _this8.preload, _this8.firstSlideAhead, loadContent);
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
    };

    _proto.getImageClassContainer = function getImageClassContainer() {
      return this.image;
    };

    _proto.getSirvImg = function getSirvImg() {
      var setts = this.getImageCreateSettings();

      if ($J.DPPX > 1) {
        var originSize = this.image.getOriginSize();
        this.dppx = getDPPX(setts.width, setts.height, originSize.width, originSize.height, !$J.defined(setts.round) || setts.round, this.upscale);
        setts.dppx = this.dppx;
      }

      setts = this.setHDQuality(setts);

      if (this.checkImage(setts, this.dontLoad)) {
        this.replaceSrc();
      } else {
        this.image.getImage(setts);
      }
    };

    _proto.getOriginImageUrl = function getOriginImageUrl() {
      return this.src;
    };

    _proto.done = function done() {
      if (!this._isReady) {
        if (this.accountInfo.branded) {
          var n = this.instanceNode;

          if (n.getTagName() === 'img') {
            n = n.node.parentNode;
          }

          var nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
          globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, n, BRAND_LANDING, 'Image viewer by Sirv');
        }

        _HotspotInstance.prototype.done.call(this);

        if (this.hotspots) {
          this.hotspots.setContainerSize(this.instanceNode.node.getBoundingClientRect());
        }

        if (!this.isFullscreenEnabled) {
          this.pinchCloud.removeEvent();
          this.pinchCloud = null;
        }
      }
    };

    _proto.getSelectorImgUrl = function getSelectorImgUrl(data) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        var defOpt = _this9.getImageCreateSettings();

        if (defOpt.src) {
          data.src = defOpt.src;
        }

        data.srcset = defOpt.srcset;

        if (_this9.isInfoLoaded) {
          _this9.waitToStart.wait(function () {
            resolve($J.extend(_this9.image.getThumbnail(data), {
              imageIndex: _this9.imageIndex,
              alt: _this9.dataAlt || _this9.originAlt || _this9.infoAlt,
              'referrerpolicy': _this9.instanceNode.attr('referrerpolicy')
            }));
          });
        } else {
          _this9.getInfo().then(function () {
            _this9.waitToStart.wait(function () {
              resolve($J.extend(_this9.image.getThumbnail(data), {
                imageIndex: _this9.imageIndex,
                alt: _this9.dataAlt || _this9.originAlt || _this9.infoAlt,
                referrerpolicy: _this9.instanceNode.attr('referrerpolicy')
              }));
            });
          }).catch(reject);
        }
      });
    };

    _proto.getThumbnailData = function getThumbnailData(opt) {
      return this.image.getThumbnail(opt);
    };

    _proto.createPinchEvent = function createPinchEvent() {
      var _this10 = this;

      // difference between scale
      var FS_OUT = 0.2;
      var FS_IN = 2;

      _HotspotInstance.prototype.createPinchEvent.call(this, this.instanceNode);

      this.pinchCloud.onPinchStart = function (e) {
        if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING], _this10.fullscreenState)) {
          return;
        }

        _this10.pinchCloud.pinch = true;
        _this10.pinchCloud.scale = e.scale;

        _this10.sendEvent('pinchStart');
      };

      this.pinchCloud.onPinchMove = function (e) {
        if (_this10.pinchCloud.pinch && !_this10.pinchCloud.block) {
          if (_this10.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
            if (e.scale < FS_OUT) {
              _this10.pinchCloud.block = true;

              _this10.sendEvent('fullscreenOut');
            }
          } else if (e.scale >= FS_IN) {
            _this10.pinchCloud.block = true;

            _this10.sendEvent('fullscreenIn');
          }
        }
      };
    };

    _proto.onStartActions = function onStartActions() {
      if (!this._isReady) {
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

      _HotspotInstance.prototype.onStartActions.call(this);
    };

    _proto.onStopActions = function onStopActions() {
      _HotspotInstance.prototype.onStopActions.call(this);
    };

    _proto.onInView = function onInView(value) {
      if (value && !this.isStaticImage) {
        if (!this._isReady && !this.isInView) {
          if (this.isStarted) {
            this.isInView = true;

            if (this.isInfoLoaded && (this.preload || this.isSlideShown)) {
              this.getImage();
            }
          }
        }
      }
    } // eslint-disable-next-line no-unused-vars
    ;

    _proto.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {
      this.getImageTimer.cancel();

      if (this._isReady && !this.isStaticImage) {
        this.instanceNode.setCssProp('visibility', 'hidden');
      }

      _HotspotInstance.prototype.onBeforeFullscreenIn.call(this, data);

      if (this.hotspots) {
        this.hotspots.disableAll();
      }
    } // eslint-disable-next-line no-unused-vars, class-methods-use-this
    ;

    _proto.onAfterFullscreenIn = function onAfterFullscreenIn(data) {
      var _this11 = this;

      // if we use it, we do not have pinchend event and touchdrag after that
      // if (this.pinchCloud) {
      //     this.pinchCloud.removeEvent();
      //     this.pinchCloud.addEvent();
      // }
      if (this.always && !this._isReady && this.isInView && this.isStarted) {
        this.onResize();
        this.getImage();
      }

      if (this.hotspots) {
        setTimeout(function () {
          // we have to wait a little bit for 'onResize' function
          if (_this11.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
            // if we will exit from fullscreen before the timeout end
            _this11.hotspots.enableAll();

            if (_this11.isInView && _this11.isSlideShown) {
              _this11.hotspots.showNeededElements();
            }
          }
        }, 100);
      }
    } // eslint-disable-next-line no-unused-vars
    ;

    _proto.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {
      this.instanceNode.setCss({
        width: '',
        height: '',
        visibility: ''
      });

      _HotspotInstance.prototype.onBeforeFullscreenOut.call(this, data);
    } // eslint-disable-next-line no-unused-vars, class-methods-use-this
    ;

    _proto.onAfterFullscreenOut = function onAfterFullscreenOut(data) {
      // if we use it, we do not have pinchend event and touchdrag after that
      // if (this.pinchCloud) {
      //     this.pinchCloud.removeEvent();
      //     this.pinchCloud.addEvent();
      // }
      _HotspotInstance.prototype.onAfterFullscreenOut.call(this, data);
    };

    _proto.onResize = function onResize() {
      if (!this.isStarted || this.isStaticImage || this.isNotSirv) {
        return false;
      }

      if (this.isFullscreenActionEnded()) {
        var size = $(this.instanceNode.node.parentNode).getSize();
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

        if (this._isReady) {
          var upscale = 50;

          if (this.size.width - this.lastImageSize.width > upscale || this.size.height - this.lastImageSize.height > upscale) {
            this.getImage();
          }

          if (this.hotspots) {
            this.hotspots.setContainerSize(this.instanceNode.node.getBoundingClientRect());

            if (this.isInView && this.isSlideShown) {
              this.hotspots.showNeededElements();
            }
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
        } catch (e) {// empty
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
        } catch (e) {// empty
        }
      }

      this.srcset = null;

      if (!this.originAlt && (this.infoAlt || this.dataAlt)) {
        this.instanceNode.removeAttr('alt');
      }

      this.instanceNode.removeEvent('load');
      this.hotspotsData = null;

      _HotspotInstance.prototype.destroy.call(this);

      return true;
    };

    return ViewerImage;
  }(HotspotInstance);

  return ViewerImage;
});
//# sourceMappingURL=image.js.map
