Sirv.define('ResponsiveImage', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'Promise!', 'helper', 'EventEmitter'], function (bHelpers, magicJS, globalVariables, globalFunctions, Promise, helper, EventEmitter) {
  var moduleName = 'ResponsiveImage';
  var $J = magicJS;
  var $ = $J.$;
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

  var requestCORSIfNotSameOrigin = function (img, url) {
    if (new URL(url).origin !== $J.W.location.origin) {
      img.crossOrigin = '';
    }
  };

  var getUrl = function (url, settings) {
    // let result = url + ('?' + paramsToQueryString(settings).replace(/(?:\?|&)profile\=$/, ''));
    var result = url + ('?' + helper.paramsToQueryString(settings));
    result = helper.cleanQueryString(result);
    return result;
  }; // eslint-disable-next-line no-unused-vars


  var _Image = /*#__PURE__*/function () {
    "use strict";

    function _Image(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy) {
      this.name = name;
      this.state = 0; // not-loaded = 0, loading = 1, loaded = 2, error = 3

      this.imageNode = null;
      this.size = {
        width: 0,
        height: 0
      };
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

    var _proto = _Image.prototype;

    _proto.load = function load() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.dontLoad) {
          resolve(_this);
        } else if (!_this.state) {
          _this.state = 1;
          _this.imageNode = $(new Image());

          _this.imageNode.attr('referrerpolicy', _this.referrerPolicy || 'no-referrer-when-downgrade');

          _this.imageNode.addEvent('load', function (e) {
            e.stop();
            _this.state = 2;
            _this.size = {
              width: _this.imageNode.node.naturalWidth || _this.imageNode.node.width,
              height: _this.imageNode.node.naturalHeight || _this.imageNode.node.height
            };

            if ($J.browser.uaName === 'safari') {
              var correct = false;

              if (_this.srcSettings.scale.width) {
                if (_this.size.width > _this.srcSettings.scale.width + 5) {
                  correct = true;
                }
              } else {
                if (_this.size.height > _this.srcSettings.scale.height + 5) {
                  correct = true;
                }
              }

              if (correct) {
                _this.size.width /= _this.dppx;
                _this.size.height /= _this.dppx;
              }
            }

            resolve(_this);
          });

          _this.imageNode.addEvent('error', function (e) {
            e.stop();
            _this.state = 3;
            _this.imageNode = null;
            reject(_this);
          }); // requestCORSIfNotSameOrigin(this.imageNode.node, this.src);


          _this.setSrc();

          _this.setSrcset();
        } else {
          resolve(_this);
        }
      });
    };

    _proto.setSrc = function setSrc() {
      this.imageNode.node.src = this.src;
    };

    _proto.setSrcset = function setSrcset() {
      if (this.srcset) {
        // TODO because amount of tiles are different between 1x image and 1.5x image
        // this.imageNode.node.srcset = encodeURI(this.srcset) + ' 2x';
        // this.imageNode.node.srcset = this.srcset + ' 2x';
        this.imageNode.node.srcset = this.srcset + ' ' + this.dppx + 'x';
      }
    };

    _proto.isLoading = function isLoading() {
      return this.state === 1;
    };

    _proto.destroy = function destroy() {
      if (this.state === 1 && this.imageNode) {
        this.imageNode.attr('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
      }

      this.state = 0;
    };

    return _Image;
  }();
  /* eslint-env es6 */

  /* global _Image */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars


  var _TileImage = /*#__PURE__*/function (_Image2) {
    "use strict";

    bHelpers.inheritsLoose(_TileImage, _Image2);

    function _TileImage(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy, tileName) {
      var _this2;

      _this2 = _Image2.call(this, name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy) || this;
      _this2.tileName = tileName; // name of tile

      return _this2;
    }

    var _proto2 = _TileImage.prototype;

    _proto2.setSrc = function setSrc() {
      if (this.dppx === 1) {
        // TODO because amount of tiles are different between 1x image and 1.5x image
        _Image2.prototype.setSrc.call(this);
      }
    };

    return _TileImage;
  }(_Image);
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


  var splitOptions = function (imageSettings, dppx) {
    var src = $J.extend({}, imageSettings);
    var srcset;
    delete src.src;
    delete src.srcset;
    src.imageSettings = $J.extend({}, (imageSettings == null ? void 0 : imageSettings.imageSettings) || {});

    if (dppx > 1) {
      srcset = JSON.parse(JSON.stringify(src));

      if (srcset.width) {
        srcset.width = parseInt(srcset.width * dppx, 10);
      }

      if (srcset.height) {
        srcset.height = parseInt(srcset.height * dppx, 10);
      }

      if (srcset.imageSettings.crop) {
        if (srcset.imageSettings.crop.width) {
          srcset.imageSettings.crop.width = parseInt(srcset.imageSettings.crop.width * dppx, 10);
        }

        if (srcset.imageSettings.crop.height) {
          srcset.imageSettings.crop.height = parseInt(srcset.imageSettings.crop.height * dppx, 10);
        }
      }

      srcset.dppx = dppx;
    }

    src.imageSettings = $J.extend(src.imageSettings, imageSettings.src);

    if (srcset && imageSettings.srcset) {
      srcset.imageSettings = $J.extend(srcset.imageSettings, imageSettings.srcset);
    }

    return {
      src: src,
      srcset: srcset
    };
  };

  var getOriginUrl = function (source) {
    return source.split('?')[0];
  };

  var toPercentageString = function (v) {
    return (v * 100).toFixed(4) + '%';
  };

  var _getImageName = function (url) {
    var hash;
    var result = null; // eslint-disable-line prefer-const, no-unused-vars

    url = url.replace('\?+', '?');
    url = url.replace('&+', '&');
    url = url.split('?');
    hash = url[1];
    url = url[0];
    hash = hash.split('&');
    hash = hash.sort();
    return '' + $J.getHashCode(url + '?' + hash.join('&'));
  };

  var getPropFromCrop = function (obj, name) {
    var result = null;

    if (obj && obj.crop && obj.crop[name]) {
      result = obj.crop[name];
    }

    return result;
  };

  var mixSettings = function (info, defaultImageSettings, imageSettings) {
    var result = helper.deepExtend({}, defaultImageSettings);

    if (info && info.imageSettings.processingSettings) {
      if (!result.crop) {
        result.crop = {};
      }

      result.crop = helper.deepExtend(result.crop, info.cropSettings); // if (result.crop) {
      //     if (result.crop.width && /100(\.0*)?%/.test(result.crop.width)) {
      //         delete result.crop.width;
      //     }
      //     if (result.crop.height && /100(\.0*)?%/.test(result.crop.height)) {
      //         delete result.crop.height;
      //     }
      // }

      if (!result.canvas) {
        result.canvas = {};
      }

      result.canvas = helper.deepExtend(result.canvas, info.canvasSettings);

      if (!result.frame) {
        result.frame = {};
      }

      result.frame = helper.deepExtend(result.frame, info.frameSettings);

      if (!result.scale) {
        result.scale = {};
      }

      if (!result.scale.option) {
        result.scale.option = 'fill';
      }
    }

    if (imageSettings.width && imageSettings.width !== 'auto') {
      result.scale.width = imageSettings.width;
    }

    if (imageSettings.height && imageSettings.height !== 'auto') {
      result.scale.height = imageSettings.height;
    }

    if (imageSettings.imageSettings) {
      result = helper.deepExtend(result, imageSettings.imageSettings);
    } // if (getPropFromCrop(defaultImageSettings, 'type') === 'focalpoint' || getPropFromCrop(info.imageSettings.processingSettings, 'type') === 'focalpoint') {
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

  var INFO = 'sirv_image_info_';
  var IMAGE_INFO = {}; // eslint-disable-next-line no-unused-vars

  var RImage = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(RImage, _EventEmitter);

    function RImage(source, o) {
      var _this3;

      _this3 = _EventEmitter.call(this) || this;

      if ($J.typeOf(source) !== 'string') {
        source = $(source).attr('src');
      }

      _this3.o = $J.extend({
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
      _this3.imageInfoPromise = null;
      _this3.images = {};
      _this3.originUrl = getOriginUrl($J.getAbsoluteURL(source));
      _this3.infoUrl = _this3.originUrl + '?nometa&info';
      _this3.imageSettings = $J.extend({}, _this3.o.imageSettings);
      return _this3;
    }

    RImage.roundImageSize = function roundImageSize(size, originSize) {
      var tmp;

      if (!originSize) {
        originSize = {
          width: Number.MAX_VALUE,
          height: Number.MAX_VALUE
        };
      }

      if (size.width && size.height) {
        if (size.width >= size.height) {
          tmp = helper.roundSize(size.width);

          if (tmp <= originSize.width) {
            size.height = Math.floor(size.height / size.width * tmp);
            size.width = tmp;
          }
        } else {
          tmp = helper.roundSize(size.height);

          if (tmp <= originSize.height) {
            // size.width = Math.round((size.width / size.height) * tmp);
            // firefox
            // fix 'https://github.com/sirv/sirv.js/issues/148'
            // We need to use 'Math.floor' because this image 'https://demo.sirv.com/demo/vax/2759311-g.jpg?scale.option=fill&h=500' has wrong size in zoom
            size.width = Math.floor(size.width / size.height * tmp);
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
    };

    var _proto3 = RImage.prototype;

    _proto3._convertImageSettings = function _convertImageSettings(imageSettings) {
      var setSize = function (obj, size) {
        if (size.width) {
          obj.width = size.width;
        }

        if (size.height) {
          obj.height = size.height;
        }
      };

      if (!imageSettings) {
        imageSettings = {};
      }

      imageSettings = $J.extend({}, imageSettings); // correct tile size if we have canvas border

      var tmp = this.getClearSizeWithoutProcessingSettings({
        width: imageSettings.width,
        height: imageSettings.height
      });
      setSize(imageSettings, tmp);
      var result = splitOptions(imageSettings, imageSettings.dppx);

      if (imageSettings.round || !imageSettings.hasOwnProperty('round') && this.o.round) {
        var originSize = this.getOriginSize();
        tmp = RImage.roundImageSize(result.src, originSize);
        setSize(result, tmp);

        if (result.srcset) {
          tmp = RImage.roundImageSize(result.srcset, originSize);
          setSize(result, tmp);
        }
      }

      return result;
    };

    _proto3._mixSettings = function _mixSettings(settings) {
      return mixSettings(IMAGE_INFO[this.o.infoId], this.imageSettings, settings);
    };

    _proto3._calcProcessingSettings = function _calcProcessingSettings() {
      var info = IMAGE_INFO[this.o.infoId];
      var cropSettings = {};
      var canvasSettings = {};
      var frameSettings = {};

      if (!info.imageSettings.viewer) {
        info.imageSettings.viewer = {};
      }

      var viewer = info.imageSettings.viewer;
      var originSize = {
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
    };

    _proto3._addImage = function _addImage(name, imageSettings) {
      var _this4 = this;

      var dontLoad = $J.defined(imageSettings.src.dontLoad) ? imageSettings.src.dontLoad : this.o.dontLoad;

      var getSettings = function (sett) {
        var result = _this4._mixSettings(sett);

        if (result.scale && result.scale.width && result.scale.height && result.scale.option !== 'ignore') {
          if (result.scale.width >= result.scale.height) {
            if (_this4.o.convertSmallerSideToZero) {
              result.scale.height = 0;
            }
          } else {
            if (_this4.o.convertSmallerSideToZero) {
              result.scale.width = 0;
            }
          }
        }

        return result;
      };

      var src = getSettings(imageSettings.src);
      var srcset = null;
      var tile;
      var tileName = null;

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

      var imageInstance = null;

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
    };

    _proto3._load = function _load(name, imageSettings) {
      var _this5 = this;

      var img = this._addImage(name, imageSettings);

      var eventName;
      var instance;
      img.image.load().then(function (imgInst) {
        instance = imgInst;
        eventName = 'imageOnload';

        if (instance instanceof _Image) {
          _this5.someImageIsLoaded = true;
        }
      }).catch(function (imgInst) {
        instance = imgInst;
        eventName = 'imageOnerror';
      }).finally(function () {
        if (instance instanceof _Image) {
          _this5.someImageIsComplete = true;
        }

        var image = _this5.images[instance.name];

        if (image) {
          _this5.emit(eventName, {
            data: _this5._createImageData(image, imageSettings.src.callbackData)
          });
        }
      });
    };

    _proto3._createImageData = function _createImageData(img, callbackData) {
      var obj = img.image;
      var result = {
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
    };

    _proto3._filter = function _filter(isTile) {
      var result = [];
      helper.objEach(this.images, function (key, image) {
        if (image.image instanceof _TileImage === !!isTile) {
          result.push(image);
        }
      });
      return result;
    };

    _proto3.getCropPosition = function getCropPosition() {
      var info = IMAGE_INFO[this.o.infoId];
      var x = getPropFromCrop(this.imageSettings, 'x');

      if (x && !/%$/.test(x)) {
        x = toPercentageString(x / info.originSize.width);
      }

      var y = getPropFromCrop(this.imageSettings, 'y');

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
    ;

    _proto3.isExist = function isExist(imageSettings) {
      imageSettings = this._convertImageSettings(imageSettings);
      var name = this.getImageName(imageSettings.src);
      var result = Object.prototype.hasOwnProperty.call(this.images, name);

      if (!result) {
        if (!(imageSettings.src.imageSettings && imageSettings.src.imageSettings.tile) && imageSettings.src.width) {
          var images = this._filter(false);

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
    ;

    _proto3.isLoaded = function isLoaded(imageSettings) {
      imageSettings = this._convertImageSettings(imageSettings);
      var result = this.images[this.getImageName(imageSettings.src)];

      if (result) {
        result = result.image.state === 2;
      }

      return !!result;
    }
    /**
     * Some of image is loaded
     *
     * @returns {boolean} - Returns true if some of image is loaded
     */
    ;

    _proto3.isReady = function isReady() {
      return this.someImageIsLoaded;
    };

    _proto3.isComplete = function isComplete() {
      return this.someImageIsComplete;
    }
    /**
     * Returns origin size of image from image info
     *
     * @returns {Hash} Size of the image  {width: x, height: x}
     */
    ;

    _proto3.getOriginSize = function getOriginSize() {
      var result = null;
      var info = null;

      if (IMAGE_INFO[this.o.infoId]) {
        info = IMAGE_INFO[this.o.infoId].imageSettings;
      }

      if (info) {
        var width;
        var height;

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
    };

    _proto3.getImageInfo = function getImageInfo() {
      var _this6 = this;

      if (!this.imageInfoPromise) {
        this.imageInfoPromise = new Promise(function (resolve, reject) {
          var url = _this6.originUrl;
          var hash = $J.getHashCode(_this6.infoUrl.replace(/^http(s)?:\/\//, ''));
          var imageSettings = helper.paramsToQueryString(_this6.imageSettings);

          if (imageSettings !== '') {
            url += '?' + imageSettings;
            url += '&';
          } else {
            url += '?';
          }

          url += 'nometa&info=' + INFO + hash + '_' + _this6.o.type;
          url = helper.cleanQueryString(url);
          helper.getRemoteData(url, 'image_info_' + helper.generateUUID(), _this6.o.referrerPolicy).then(function (data) {
            if (!data.width || data._isplaceholder) {
              reject(data);
            } else {
              IMAGE_INFO[_this6.o.infoId] = {
                imageSettings: data
              };

              _this6._calcProcessingSettings();

              resolve(IMAGE_INFO[_this6.o.infoId]);
            }
          }).catch(reject);
        });
      }

      return this.imageInfoPromise;
    };

    _proto3._getBiggerImage = function _getBiggerImage(width, images, dontLoad) {
      var result = null;

      if (!width) {
        width = 0;
      }

      if (!images) {
        images = this.images;
      }

      if (dontLoad === $J.U) {
        dontLoad = this.o.dontLoad;
      }

      helper.objEach(images, function (key, value) {
        if (width < value.serverWidth) {
          if ((value.image.state === 2 || dontLoad) && (!result || result.serverWidth > value.serverWidth)) {
            result = value;
          }
        }
      });
      return result;
    };

    _proto3.sendLoad = function sendLoad(imageSettings) {
      var img;
      imageSettings = this._convertImageSettings(imageSettings);
      img = this.images[this.getImageName(imageSettings.src)];

      if (!img) {
        img = this._getBiggerImage(imageSettings.src.width);
      }

      this.emit('imageOnload', {
        data: this._createImageData(img, imageSettings.src.callbackData)
      });
    }
    /**
     * Cancels loading image if it is
     *
     * @param {Object}    Image settings object to cansel
     */
    ;

    _proto3.cancelLoadingImage = function cancelLoadingImage(imageSettings) {
      imageSettings = this._convertImageSettings(imageSettings);
      var name = this.getImageName(imageSettings.src);
      var img = this.images[name];

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
    ;

    _proto3.getImageName = function getImageName(imageSettings) {
      var result = _getImageName(helper.cleanQueryString(this.originUrl + ('?' + helper.paramsToQueryString(this._mixSettings(imageSettings)))));

      return result;
    };

    _proto3.getClearSizeWithoutProcessingSettings = function getClearSizeWithoutProcessingSettings(size) {
      var result = {};
      var info = IMAGE_INFO[this.o.infoId];

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
    ;

    _proto3.getImage = function getImage(imageSettings) {
      var options = this._convertImageSettings(imageSettings);

      var dontLoad = $J.defined(options.src.dontLoad) ? options.src.dontLoad : this.o.dontLoad;
      var name = this.getImageName(options.src);
      var result = this.images[name];

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
    ;

    _proto3.getOriginImageUrl = function getOriginImageUrl() {
      var result = null;

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
    ;

    _proto3.getProcessingSettings = function getProcessingSettings() {
      var info = IMAGE_INFO[this.o.infoId];
      return {
        crop: info.cropSettings,
        cropClear: info.cropSettingsClear,
        canvas: info.canvasSettings,
        canvasClear: info.canvasSettingsClear
      };
    };

    _proto3.getDescription = function getDescription() {
      var result = null;
      var info = IMAGE_INFO[this.o.infoId];

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
    ;

    _proto3.getThumbnail = function getThumbnail(imageSettings) {
      var _this7 = this;

      var result = {
        imageSettings: null,
        size: null,
        src: null,
        srcset: null
      };

      if (IMAGE_INFO[this.o.infoId]) {
        var options = splitOptions(imageSettings, $J.DPPX);
        var srcset = null;
        var convertSmallerSideToZero = this.o.convertSmallerSideToZero;
        var originUrl = imageSettings.originUrl || this.originUrl;

        var getSrc = function (_size, _imageSettings) {
          var settings = {
            scale: {
              option: 'fill'
            }
          };

          if (_size.width || _size.height) {
            if (_size.width && _size.height) {
              settings.scale.width = _size.width;
              settings.scale.height = _size.height;
            } else {
              var _tmp = _size.width || _size.height;

              settings.scale.width = _tmp;
              settings.scale.height = _tmp;
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
              if (IMAGE_INFO[_this7.o.infoId].imageSettings.original.width >= IMAGE_INFO[_this7.o.infoId].imageSettings.original.height) {
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

          var tmp = settings;
          settings = {};
          settings.imageSettings = tmp;
          settings = _this7._mixSettings(settings);

          if (settings.text) {
            delete settings.text;
          }

          if (!imageSettings.watermark && settings.watermark) {
            delete settings.watermark;
          }

          return helper.paramsToQueryString(settings);
        };

        var getSize = function (is) {
          var r = {};

          if (is.width) {
            r.width = is.width;
          }

          if (is.height) {
            r.height = is.height;
          }

          return r;
        };

        if (options.src.crop || options.src.width && options.src.height) {
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
    };

    _proto3.getAccountInfo = function getAccountInfo() {
      var result = {};
      var info = IMAGE_INFO[this.o.infoId];

      if (info) {
        result.account = info.imageSettings.account;
        result.branded = info.imageSettings.branded;
      }

      return result;
    };

    _proto3.destroy = function destroy() {
      helper.objEach(this.images, function (key, img) {
        img.image.destroy();
      });
      this.images = {};
      this.someImageIsLoaded = false;
      this.someImageIsComplete = false;

      if (IMAGE_INFO[this.infoId]) {
        delete IMAGE_INFO[this.infoId];
        this.infoId = null;
      }

      _EventEmitter.prototype.destroy.call(this);
    };

    return RImage;
  }(EventEmitter);

  return RImage;
});
//# sourceMappingURL=imageclass.js.map
