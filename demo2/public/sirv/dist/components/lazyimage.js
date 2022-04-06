Sirv.define('LazyImage', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Promise!', 'ResponsiveImage', 'BaseInstance', 'getDPPX'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, Promise, ResponsiveImage, BaseInstance, getDPPX) {
  var moduleName = 'LazyImage';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable no-extra-semi */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var defaultOptions = {
    resize: {
      type: 'boolean',
      defaults: true
    },
    // A distance from the viewport within which images should be loaded.
    threshold: {
      type: 'number',
      minimum: 0,
      defaults: 0
    },
    fit: {
      type: 'string',
      'enum': ['contain', 'cover', 'crop', 'none'],
      defaults: 'contain'
    },
    // Quality applied to images (1x - 1.49x).
    quality: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      defaults: 80
    },
    // Quality applied to hi-res images (1.5x - 2x).
    hdQuality: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      defaults: 60
    },
    autostart: {
      oneOf: [
      /*
          created - init and load
          visible - init and load in view
          off - not init
      */
      {
        type: 'string',
        'enum': ['created', 'visible', 'off']
      }, {
        type: 'boolean',
        'enum': [false]
      }],
      defaults: 'visible'
    },
    onReady: {
      type: 'function',
      defaults: function () {}
    }
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

  var Appearance = /*#__PURE__*/function () {
    "use strict";

    function Appearance(node) {
      this.node = $(node);
      this.state = 0; // 0 - nothing, 1 - before loading image, 2 - after loading high quality image

      this.states = $(['sirv-image-loading', 'sirv-image-loaded']);
    }

    var _proto = Appearance.prototype;

    _proto.setState = function setState(numberOfState) {
      if (this.state !== numberOfState) {
        if (this.state - 1 >= 0) {
          this.node.removeClass(this.states[this.state - 1]);
        }

        this.state = numberOfState;
        this.node.addClass(this.states[numberOfState - 1]);
      }
    };

    _proto.destroy = function destroy() {
      var _this = this;

      this.state = 0;
      this.states.forEach(function (className) {
        _this.node.removeClass(className);
      });
      this.node = null;
    };

    return Appearance;
  }();
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


  var P = globalVariables.smv;

  var inView = function (node) {
    var rect = node.getBoundingClientRect();
    return !(rect.top === 0 && rect.right === 0 && rect.bottom === 0 && rect.left === 0 && rect.width === 0 && rect.height === 0); // hidden
  };

  var LazyImage = /*#__PURE__*/function (_BaseInstance) {
    "use strict";

    bHelpers.inheritsLoose(LazyImage, _BaseInstance);

    function LazyImage(node, options, force) {
      var _this2;

      options.options = {
        common: {
          common: options.options.common,
          mobile: {}
        },
        local: {
          common: '',
          mobile: ''
        }
      };
      _this2 = _BaseInstance.call(this, node, options, defaultOptions) || this;
      _this2.node = _this2.instanceNode;
      _this2.type = globalVariables.SLIDE.TYPES.IMAGE;
      _this2.isLazy = _this2.option('autostart') === 'visible';
      _this2.image = null;
      _this2.isInfoLoaded = false;
      _this2.infoSize = {
        width: 0,
        height: 0
      };
      _this2.isNotSirv = false;
      _this2.isInView = false;
      _this2.isStaticImage = false;
      _this2.dppx = 1;
      _this2.getImageInfoPromise = null;
      _this2.loadStaticImagePromise = null;
      _this2.upscale = false;
      _this2.size = {
        width: 0,
        height: 0
      };
      _this2.maxSize = {};
      _this2.lastImageSize = {
        width: 0,
        height: 0
      };
      _this2.srcWasSetted = false;
      _this2.originAlt = null;
      _this2.infoAlt = null;
      _this2.originTitle = null;
      _this2.src = null;
      _this2.srcset = null;
      _this2.startedSrc = null;
      _this2.dataSrc = null;
      _this2.imageUrl = null;
      _this2.dontLoad = true;
      _this2.appearanceState = null;
      _this2.dataBgSrc = null;
      _this2.inViewModule = null;
      _this2.rootMargin = 0;
      _this2.fitSize = null;
      _this2.backgroundNodeSize = null;
      _this2.isMaxWidthSet = false;
      _this2.cropPosition = {
        x: null,
        y: null
      };
      _this2.cssBackgroundSize = null;
      _this2.isPlaceholder = false;
      _this2.isRun = false;
      _this2.inited = false;
      _this2.resizeDebounce = helper.debounce(function () {
        _this2._setRootMargin();

        _this2.onResize();
      }, 50);

      _this2.resizeHandler = function (e) {
        _this2.resizeDebounce();
      };

      var as = _this2.instanceOptions.get('autostart');

      if (as && as !== 'off' || force) {
        _this2.preInit();
      }

      return _this2;
    }

    var _proto2 = LazyImage.prototype;

    _proto2.preInit = function preInit() {
      var _this3 = this;

      this.isRun = true;
      this.inViewModule = new helper.InViewModule(function (entries) {
        entries.forEach(function (entry) {
          // https://github.com/verlok/vanilla-lazyload/issues/293#issuecomment-469100338
          // Sometimes 'intersectionRatio' can be 0 but 'isIntersecting' is true
          var iv = entry.isIntersecting || entry.intersectionRatio > 0;

          if (_this3.isInView !== iv) {
            if (!_this3.inited) {
              _this3.isInView = iv;

              if (iv) {
                _this3.init();
              } else if (inView(_this3.instanceNode.node)) {
                _this3.init();
              }
            } else {
              _this3.inViewCallback(iv);
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
    };

    _proto2.init = function init() {
      this.inited = true;

      try {
        this.maxWidth = this.instanceNode.node.style.maxWidth;
      } catch (ex) {
        /* empty */
      }

      this._getBaseData();

      if (this.imageUrl && ($J.browser.ready || $J.D.node.readyState !== 'loading')) {
        this.startFullInit();
      }

      this.createSirvImage();
    };

    _proto2.stop = function stop() {
      this.destroy();
      return true;
    };

    _proto2.getOptionsForStartFullInit = function getOptionsForStartFullInit(options) {
      if (options) {
        options = {
          common: {
            common: options.common.lazyImage,
            mobile: options.mobile.lazyImage
          },
          local: {
            common: '',
            mobile: ''
          }
        };
      }

      _BaseInstance.prototype.getOptionsForStartFullInit.call(this, options);
    };

    _proto2.checkReadiness = function checkReadiness(eventname, component) {
      if (eventname === 'onLoad') {
        return this._isReady;
      }

      return false;
    };

    _proto2._setRootMargin = function _setRootMargin() {
      var value = parseInt(this.option('threshold'), 10);

      if ($J.typeOf(this.option('threshold')) === 'string') {
        value = ($J.W.node.innerHeight || $J.D.node.documentElement.clientHeight) / 100 * value; // eslint-disable-line operator-assignment
      }

      this.rootMargin = value;
    };

    _proto2._getQueryParams = function _getQueryParams() {
      if (this.imageUrl) {
        this.queryParams = helper.paramsFromQueryString(this.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2'));

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

    _proto2._getBaseData = function _getBaseData() {
      this.originAlt = this.instanceNode.attr('alt');
      this.originTitle = this.instanceNode.attr('title');
      this.src = this.instanceNode.attr('src');
      this.srcset = this.instanceNode.attr('srcset');
      this.startedSrc = this.src;
      this.dataSrc = this.instanceNode.attr('data-src');
      this.isStaticImage = this.src && !this.dataSrc;
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
      } // Image default params


      this._getQueryParams();

      if (this.startedSrc && this.dataSrc && this.startedSrc !== this.dataSrc) {
        this.isPlaceholder = this.instanceNode.attr('src');
      }
    };

    _proto2.createSirvImage = function createSirvImage() {
      var _this4 = this;

      if (!this.imageUrl || this.isNotSirv) {
        return;
      }

      this.on('imageOnload', function (e) {
        e.stopAll();

        _this4.replaceSrc();

        if (!_this4._isReady) {
          if (_this4.isStaticImage) {
            _this4.done();
          } else {
            var showImage = function () {
              if (_this4.appearanceState) {
                _this4.appearanceState.setState(2);

                _this4.done();
              }
            };

            if (e.data.node) {
              showImage();
            } else {
              helper.loadImage(_this4.instanceNode).finally(function () {
                showImage();
              });
            }
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
        convertSmallerSideToZero: this.option('fit') !== 'crop',
        referrerPolicy: this.referrerPolicy
      });
      this.image.setParent(this);
      this.getInfoSize().catch(function (err) {
        if (err._isplaceholder) {
          _this4.infoSize = err;
          _this4.isNotSirv = true;
        }
      }).finally(function () {
        if ($J.D.node.readyState !== 'loading') {
          if (_this4.isStartedFullInit) {
            _this4.run();
          }
        }
      });
    };

    _proto2.getInfoSize = function getInfoSize() {
      var _this5 = this;

      if (!this.getImageInfoPromise) {
        this.getImageInfoPromise = new Promise(function (resolve, reject) {
          if (_this5.image) {
            _this5.image.getImageInfo().then(function (info) {
              _this5.isInfoLoaded = true;
              _this5.infoAlt = _this5.image.getDescription();
              _this5.infoSize = _this5.image.getOriginSize();
              _this5.cropPosition = _this5.image.getCropPosition();
              resolve(info);
            }).catch(function (err) {
              _this5.isInfoLoaded = true;

              if (!err.status || err.status !== 404) {
                _this5.isNotSirv = true;
              }

              reject(err);
            });
          } else {
            reject();
          }
        });
      }

      return this.getImageInfoPromise;
    };

    _proto2.getId = function getId(idPrefix, df) {
      this.id = this.instanceNode.attr('id');

      if (!this.id && !this.isStaticImage) {
        _BaseInstance.prototype.getId.call(this, idPrefix, df);
      }
    };

    _proto2.startFullInit = function startFullInit(options, force) {
      if (this.isStartedFullInit || !this.inited) {
        return;
      }

      this.getOptionsForStartFullInit(options);
      var as = this.option('autostart');

      if (!this.inited && !(as && as !== 'off' || force)) {
        return;
      }

      _BaseInstance.prototype.startFullInit.call(this, options);

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
    };

    _proto2.fixHeight = function fixHeight(height) {
      if (height !== 0) {
        var blockSize = parseInt(this.instanceNode.getCss('block-size'), 10);

        if (height === blockSize || height <= 16) {
          height = 0;
        }
      }

      return height;
    };

    _proto2.run = function run() {
      var _this6 = this;

      var result = _BaseInstance.prototype.run.call(this);

      if (result) {
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
        helper.imageLib.getSize(this.instanceNode).then(function (dataSize) {
          size = dataSize;
        }).finally(function () {
          if (_this6.destroyed) {
            return;
          }

          size = helper.fixSize(_this6.instanceNode, size); // if (this.dataBgSrc) {
          //     this.fitSize = helper.imageLib.getBackgroundSize(this.instanceNode);
          // }

          if (size.width === 0 && size.height === 0) {
            _this6.instanceNode.setCss({
              width: '100%'
            });

            size.width = _this6.instanceNode.getSize().width;
          }

          if (size.width === 0 && size.height === 0) {
            size.width = $J.W.node.innerWidth;
          }

          if (_this6.option('fit') === 'contain') {
            _this6.fitSize = {
              width: 'contain',
              height: 'contain'
            };
          } else {
            _this6.fitSize = {
              width: 'cover',
              height: 'cover'
            };
          }

          if (_this6.option('fit') === 'none') {
            if (_this6.cssBackgroundSize) {
              _this6.size = helper.imageLib.calcProportionalBackgroundSize(_this6.cssBackgroundSize, _this6.infoSize);
            } else {
              _this6.size = _this6.infoSize;
            }
          } else {
            _this6.size = helper.imageLib.calcProportionSize(size, _this6.infoSize, _this6.fitSize);
          }

          if (!_this6.dataBgSrc) {
            // Set the max-width to prevent image stretching beyond its original maximum width
            var objectFit = _this6.instanceNode.getCss('objectFit');

            if (!_this6.maxWidth && _this6.infoSize.width > 0 && (!objectFit || objectFit === 'fill') && !_this6.instanceNode.attr('width')) {
              _this6.isMaxWidthSet = true;

              _this6.instanceNode.setCss({
                maxWidth: _this6.infoSize.width
              });
            }
          }

          if (_this6.originAlt || _this6.infoAlt) {
            // Restore ALT text
            _this6.instanceNode.attr('alt', _this6.originAlt || _this6.infoAlt);
          }

          if (_this6.originTitle) {
            // Restore TITLE text
            _this6.instanceNode.attr('title', _this6.originTitle);
          }

          if (_this6.isStaticImage) {
            _this6.loadStaticImage().finally(function () {
              if (_this6.isInfoLoaded) {
                _this6.done();
              }
            });
          } else if (!_this6.isLazy || _this6.isInView) {
            _this6.getImage();
          }
        });
      }

      return result;
    };

    _proto2._setSrc = function _setSrc(src, srcset) {
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
    };

    _proto2._setHDQuality = function _setHDQuality(opt) {
      if (opt.dppx > 1 && opt.dppx < 1.5) {
        var quality = this.instanceOptions.isset('quality') ? this.option('quality') : null;

        if (this.queryParamsQuality === null && quality !== null) {
          opt.srcset.quality = quality;
        } else if (opt.srcset) {
          delete opt.srcset.quality;
        }
      }

      return opt;
    };

    _proto2.replaceSrc = function replaceSrc() {
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
        var opt = this._getImageCreateSettings();

        if (opt.dppx > 1 && opt.dppx < 1.5) {
          delete opt.srcset.quality;
        }

        opt = this._setHDQuality(opt);
        img = this.image.getImage(opt);
        this.lastImageSize.width = img.width || img.serverWidth;
        this.lastImageSize.height = img.height || img.serverHeight;
      }

      this._setSrc(img.src, img.srcset);
    };

    _proto2.loadStaticImage = function loadStaticImage() {
      var _this7 = this;

      if (!this.loadStaticImagePromise) {
        this.loadStaticImagePromise = new Promise(function (resolve, reject) {
          if (_this7.isStaticImage) {
            if (_this7.instanceNode.node.complete) {
              resolve();
            } else {
              _this7.instanceNode.addEvent('load', function (e) {
                resolve();
              });

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

    _proto2._getImageCreateSettings = function _getImageCreateSettings() {
      var setts = {
        src: {},
        srcset: {}
      };
      var quality = this.instanceOptions.isset('quality') ? this.option('quality') : null;

      if (quality !== null && this.queryParamsQuality === null) {
        setts.src.quality = quality;
      }

      var hdQuality = this.option('hdQuality');

      if (this.queryParamsQuality === null || this.instanceOptions.isset('hdQuality') && hdQuality < this.queryParamsQuality) {
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

      if (this.option('fit') === 'crop') {
        setts.round = false;
      } // if (this.dataBgSrc && this.option('fit') === 'crop') {
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
    };

    _proto2.setCrop = function setCrop(setts) {
      if (this.option('fit') === 'crop') {
        var size = $(this.instanceNode.node).getInnerSize(!!this.dataBgSrc);

        if (!setts.imageSettings) {
          setts.imageSettings = {};
        }

        if (!setts.imageSettings.crop) {
          setts.imageSettings.crop = {};
        }

        setts.imageSettings.crop = {
          x: this.cropPosition.x || 'center',
          y: this.cropPosition.y || 'center',
          width: size.width,
          height: size.height
        };
      }

      return setts;
    };

    _proto2.getImage = function getImage() {
      if (this.isStaticImage) {
        return;
      }

      if (this.isNotSirv) {
        this.getNonSirvImg();
      } else {
        this.getSirvImg();
      }
    };

    _proto2.getNonSirvImg = function getNonSirvImg() {
      var _this8 = this;

      if (this.isPlaceholder) {
        helper.loadImage(this.dataSrc).finally(function () {
          _this8.replaceSrc();

          _this8.appearanceState.setState(2);

          _this8.done();
        });
      } else {
        this.replaceSrc();
        this.appearanceState.setState(2);
        this.done();
      }
    };

    _proto2.getImageClassContainer = function getImageClassContainer() {
      return this.image;
    };

    _proto2.getSirvImg = function getSirvImg() {
      var setts = this._getImageCreateSettings();

      if (setts.width) {
        this.maxSize.width = setts.width;
      }

      if (setts.height) {
        this.maxSize.height = setts.height;
      }

      if ($J.DPPX > 1) {
        var originSize = this.image.getOriginSize();
        this.dppx = getDPPX(setts.width, setts.height, originSize.width, originSize.height, !$J.defined(setts.round) || setts.round, this.upscale);
        setts.dppx = this.dppx;
      }

      setts = this._setHDQuality(setts);

      if (this.checkImage(setts)) {
        this.replaceSrc();
      } else {
        this.image.getImage(setts);
      }
    };

    _proto2.checkSize = function checkSize(size) {
      var w = this.infoSize.width;
      var h = this.infoSize.height;

      if (size.width > w || size.height > h) {
        size.width = w;

        if (size.height) {
          size.height = h;
        }

        size.round = false;
      }

      return size;
    };

    _proto2.done = function done() {
      _BaseInstance.prototype.done.call(this); // if (!this.dataBgSrc) {
      //     this.instanceNode.setCss({ width: '', height: '' });
      // }


      this.option('onReady')(this.id);
      this.sendEvent('ready');
    };

    _proto2.inViewCallback = function inViewCallback(value) {
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
    };

    _proto2.sendEvent = function sendEvent(nameOfEvent, data) {
      /*
          image events: [
              'ready',
          ]
      */
      if (!data) {
        data = {};
      }

      if (!data.image) {
        data.image = {};
      }

      if (!data.image.event) {
        data.image.event = {};
      }

      if (nameOfEvent === 'ready') {
        nameOfEvent = 'onLoad';
      }

      data.type = nameOfEvent;
      data.image.id = this.id;
      data.image.url = this.instanceUrl;
      $J.extend(data.image, this.api);
      data.node = this.instanceNode;
      data.image.node = this.instanceNode.node;
      data.image.event.timestamp = +new Date();
      data.image.event.type = 'lazyimage:' + nameOfEvent;
      this.emit('imagePublicEvent', {
        data: data
      });
    };

    _proto2.getOriginImageUrl = function getOriginImageUrl() {
      return this.src;
    };

    _proto2.onResize = function onResize() {
      if (!this.isStarted || this.isStaticImage || !this.option('resize') || this.isNotSirv) {
        return false;
      }

      var size;

      if ($J.contains(['crop', 'cover'], this.option('fit'))) {
        size = $(this.instanceNode.node.parentNode).getSize();
      } else {
        size = this.instanceNode.getSize(); // sometimes before the image appear in view the resize event can work and size of height of this image is 16px on android in chrome

        size.height = this.fixHeight(size.height);
      }

      size = helper.imageLib.calcProportionSize(size, this.infoSize, this.fitSize);
      this.size.width = size.width;

      if (this.size.height) {
        this.size.height = size.height;
      }

      if (this._isReady && !this.isNotSirv) {
        var upscale = 50;

        if (this.option('fit') === 'crop') {
          if (Math.abs(this.size.width - this.lastImageSize.width) > upscale || Math.abs(this.size.height - this.lastImageSize.height) > upscale) {
            this.getImage();
          }
        } else if (this.size.width - this.lastImageSize.width > upscale || this.size.height - this.lastImageSize.height > upscale) {
          this.getImage();
        }
      }

      return true;
    };

    _proto2.destroy = function destroy() {
      if (this.dataBgSrc) {
        this.instanceNode.removeClass(P + '-bg-image');
        this.instanceNode.setCssProp('background-image', '');
      }

      if (this.isMaxWidthSet) {
        this.isMaxWidthSet = false;
        this.instanceNode.setCss({
          maxWidth: ''
        });
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

      if (!this.originAlt && this.infoAlt) {
        this.instanceNode.removeAttr('alt');
      }

      this.instanceNode.removeEvent('load');

      if (this.isPlaceholder) {
        this.instanceNode.attr('src', this.isPlaceholder);
        this.isPlaceholder = false;
      }

      _BaseInstance.prototype.destroy.call(this);
    };

    return LazyImage;
  }(BaseInstance);

  return LazyImage;
});
//# sourceMappingURL=lazyimage.js.map
