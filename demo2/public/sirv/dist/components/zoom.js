Sirv.define('Zoom', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Promise!', 'EventEmitter', 'Zoominstance', 'Hint', 'ResponsiveImage', 'RoundLoader', 'Hotspots'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, Promise, EventEmitter, Zoominstance, Hint, ResponsiveImage, RoundLoader, Hotspots) {
  var moduleName = 'Zoom';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-zoom-view{display:inline-block;position:relative;top:0;left:0;width:100%;height:100%;outline:0!important;-webkit-backface-visibility:hidden!important;backface-visibility:hidden!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important;-webkit-tap-highlight-color:transparent!important;-webkit-touch-callout:none!important;touch-action:pan-y}.smv-zoom-view::after{display:inline-block;height:100%;content:\'\';vertical-align:middle}.smv-zoom-view .zoom-loader{bottom:0;left:0;margin:5px}.smv-zoom-view>img.smv-zoomed-in{visibility:hidden!important}.smv-zoom-view .sirv-zoom{z-index:126}.smv .smv-slides-box .smv-zoom-view>img{display:inline-block!important;position:relative!important;width:auto;max-width:100%;height:auto;max-height:100%;margin:0;padding:0;vertical-align:middle}.zoom-controls{display:flex;position:absolute;right:16px;bottom:16px;flex-flow:row-reverse;height:28px;z-index:168}.zoom-controls>button{background-color:rgba(245,245,245,.9);color:#777}.zoom-controls>button::after,.zoom-controls>button::before{transition:opacity .2s linear;opacity:.65}.zoom-controls>button:hover::after,.zoom-controls>button:hover::before{opacity:1}.zoom-controls>button.disable::after,.zoom-controls>button.disable::before{opacity:.2}.zoom-controls>button+button{margin-right:4px}.zoom-controls .zoom-close,.zoom-controls .zoom-in,.zoom-controls .zoom-out{display:inline-block;position:relative;width:28px;height:28px;padding:0;border:1px solid #d7d7d7;border-radius:2px;outline:0;cursor:pointer}.zoom-controls .zoom-close::after,.zoom-controls .zoom-close::before,.zoom-controls .zoom-in::after,.zoom-controls .zoom-in::before,.zoom-controls .zoom-out::before{transform:translate3d(-50%,-50%,0);position:absolute;top:50%;left:50%;width:65%;border-top:2px solid currentcolor;font-size:0;line-height:100%;content:\'\'}.zoom-controls .zoom-close::after,.zoom-controls .zoom-in::after{transform-origin:center;border-left:1px solid}.zoom-controls .zoom-in::after{transform:translate3d(-50%,-50%,0) rotateZ(-90deg)}.zoom-controls .zoom-close{display:none!important}.zoom-controls .zoom-close::before{transform:translate3d(-50%,-50%,0) rotateZ(-45deg)}.zoom-controls .zoom-close::after{transform:translate3d(-50%,-50%,0) rotateZ(-135deg)}.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container{position:absolute!important;pointer-events:none}.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container.sirv-hotspot-overwrite-pointer-event{pointer-events:auto!important}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global helper */

  /* eslint-disable no-extra-semi */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var defaults = {
    mode: {
      type: 'string',
      'enum': ['top', 'left', 'right', 'bottom', 'inner', 'magnifier', 'deep'],
      defaults: 'inner'
    },
    margin: {
      type: 'number',
      defaults: 9
    },
    width: {
      oneOf: [{
        type: 'number'
      }, {
        type: 'string',
        'enum': ['auto']
      }],
      defaults: 'auto'
    },
    height: {
      oneOf: [{
        type: 'number'
      }, {
        type: 'string',
        'enum': ['auto']
      }],
      defaults: 'auto'
    },
    pan: {
      type: 'boolean',
      defaults: false
    },
    ratio: {
      oneOf: [{
        type: 'number',
        minimum: 0
      }, {
        type: 'string',
        'enum': ['max']
      }],
      defaults: 2.5
    },
    wheel: {
      type: 'boolean',
      defaults: true
    },
    // Zoom in/out on mouse wheel
    tiles: {
      type: 'boolean',
      defaults: true
    },
    trigger: {
      oneOf: [{
        type: 'string',
        'enum': ['hover', 'click', 'dblclick']
      }, {
        type: 'boolean',
        'enum': [false]
      }],
      defaults: 'click'
    },
    hint: {
      // hint.enable
      enable: {
        type: 'boolean',
        defaults: true
      },
      text: {
        // hint.text.hover
        hover: {
          type: 'string',
          defaults: 'Hover to zoom'
        },
        // hint.text.click
        click: {
          type: 'string',
          defaults: 'Click to zoom'
        },
        // hint.text.dblclick
        dblclick: {
          type: 'string',
          defaults: 'Double click to zoom'
        }
      }
    },
    // Navigation map
    map: {
      // map.enable
      enable: {
        type: 'boolean',
        defaults: false
      },
      // map.size
      size: {
        type: 'number',
        'minimum': 0,
        'maximum': 50,
        defaults: 25
      } // in percentage

    }
  };

  if ($J.browser.touchScreen) {
    defaults = helper.deepExtend(defaults, {
      hint: {
        text: {
          // hint.text.hover
          hover: {
            defaults: 'Tap and hold to zoom'
          }
        }
      }
    });
  }

  var defaultsForMobileZoomOptions = {
    hint: {
      text: {
        // hint.text.hover
        hover: {
          type: 'string',
          defaults: 'Tap and hold to zoom'
        },
        // hint.text.click
        click: {
          type: 'string',
          defaults: 'Tap to zoom'
        },
        // hint.text.dblclick
        dblclick: {
          type: 'string',
          defaults: 'Double tap to zoom'
        }
      }
    }
  };
  var defaultsForOutsideMode = {
    trigger: {
      oneOf: [{
        type: 'string',
        'enum': ['hover', 'click', 'dblclick']
      }, {
        type: 'boolean',
        'enum': [false]
      }],
      defaults: 'hover'
    }
  };
  var defaultsForMobileInnerMode = {
    trigger: {
      oneOf: [{
        type: 'string',
        'enum': ['hover', 'click', 'dblclick']
      }, {
        type: 'boolean',
        'enum': [false]
      }],
      defaults: 'dblclick'
    }
  };
  var defaultsForDeepZoom = {
    ratio: {
      oneOf: [{
        type: 'number',
        minimum: 0
      }, {
        type: 'string',
        'enum': ['max']
      }],
      defaults: 'max'
    }
  };
  /* eslint-env es6 */

  /* global EventEmitter */

  /* global helper */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint dot-notation: ["error", { "allowKeywords": false }]*/
  // eslint-disable-next-line no-unused-vars

  var ButtonClass = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(ButtonClass, _EventEmitter);

    function ButtonClass(parent, options, events) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.parentNode = $(parent);
      _this.options = $J.extend({
        'class': null,
        disabledClass: 'disable'
      }, options);
      _this.events = events || {};
      _this.isDisabled = false;
      _this.isDisabledClassAdded = false;
      _this.instanceNode = $J.$new('button');

      if (_this.options['class']) {
        _this.instanceNode.addClass(_this.options['class']);
      }

      helper.objEach(_this.events, function (key, value) {
        _this.instanceNode.addEvent(key, value);
      });
      return _this;
    }

    var _proto = ButtonClass.prototype;

    _proto.append = function append() {
      this.parentNode.append(this.instanceNode);
    };

    _proto.changeState = function changeState(disable) {
      if (disable) {
        this.disable(true);

        if (!this.isDisabledClassAdded) {
          this.isDisabledClassAdded = true;
          this.instanceNode.addClass(this.options.disabledClass);
        }
      } else {
        if (this.isDisabledClassAdded) {
          this.isDisabledClassAdded = false;
          this.instanceNode.removeClass(this.options.disabledClass);
        }

        this.disable();
      }
    };

    _proto.disable = function disable(_disable) {
      if (_disable) {
        if (!this.isDisabled) {
          this.isDisabled = true;
          this.instanceNode.attr('disabled', 'disabled');
        }
      } else if (this.isDisabled) {
        this.isDisabled = false;
        this.instanceNode.removeAttr('disabled');
      }
    };

    _proto.destroy = function destroy() {
      var _this2 = this;

      helper.objEach(this.events, function (key, value) {
        _this2.instanceNode.removeEvent(key, value);
      });
      this.events = {};
      this.changeState();
      this.instanceNode.remove();
      this.instanceNode = null;

      _EventEmitter.prototype.destroy.call(this);
    };

    return ButtonClass;
  }(EventEmitter); // eslint-disable-next-line no-unused-vars


  var ZoomControls = /*#__PURE__*/function (_EventEmitter2) {
    "use strict";

    bHelpers.inheritsLoose(ZoomControls, _EventEmitter2);

    function ZoomControls(parent) {
      var _this3;

      _this3 = _EventEmitter2.call(this) || this;
      _this3.parentNode = $(parent);
      _this3.instanceNode = $J.$new('div').addClass('zoom-controls');
      _this3.zoomInButton = new ButtonClass(_this3.instanceNode, {
        'class': 'zoom-in'
      }, {
        'btnclick tap': function (e) {
          e.stop();

          _this3.emit('zoomControlsAction', {
            data: {
              type: 'zoomin'
            }
          });
        }
      });

      _this3.zoomInButton.setParent(bHelpers.assertThisInitialized(_this3));

      _this3.zoomOutButton = new ButtonClass(_this3.instanceNode, {
        'class': 'zoom-out'
      }, {
        'btnclick tap': function (e) {
          e.stop();

          _this3.emit('zoomControlsAction', {
            data: {
              type: 'zoomout'
            }
          });
        }
      });

      _this3.zoomOutButton.setParent(bHelpers.assertThisInitialized(_this3));

      _this3.zoomCloseButton = new ButtonClass(_this3.instanceNode, {
        'class': 'zoom-close'
      }, {
        'btnclick tap': function (e) {
          e.stop();

          _this3.emit('zoomControlsAction', {
            data: {
              type: 'zoomclose'
            }
          });
        }
      });

      _this3.zoomCloseButton.setParent(bHelpers.assertThisInitialized(_this3));

      _this3.zoomInButton.append();

      _this3.zoomOutButton.append();

      _this3.zoomCloseButton.append();

      return _this3;
    }

    var _proto2 = ZoomControls.prototype;

    _proto2.show = function show() {
      this.parentNode.append(this.instanceNode);
    };

    _proto2.hide = function hide() {
      this.instanceNode.remove();
    };

    _proto2.invisibleDisable = function invisibleDisable(disable) {
      this.zoomInButton.disable(disable);
      this.zoomOutButton.disable(disable);
      this.zoomCloseButton.disable(disable);
    };

    _proto2.disable = function disable(typeOfButton
    /* in, out */
    ) {
      if (typeOfButton) {
        if (typeOfButton === 'in') {
          this.zoomInButton.changeState(true);
          this.zoomOutButton.changeState();
          this.zoomCloseButton.changeState();
        } else {
          this.zoomOutButton.changeState(true);
          this.zoomCloseButton.changeState(true);
          this.zoomInButton.changeState();
        }
      } else {
        this.zoomInButton.changeState();
        this.zoomOutButton.changeState();
        this.zoomCloseButton.changeState();
      }
    };

    _proto2.destroy = function destroy() {
      this.zoomInButton.destroy();
      this.zoomOutButton.destroy();
      this.zoomCloseButton.destroy();
      this.hide();

      _EventEmitter2.prototype.destroy.call(this);
    };

    return ZoomControls;
  }(EventEmitter);
  /* eslint-env es6 */

  /* global ZoomControls */

  /* global helper */

  /* global Zoominstance */

  /* global Hint */

  /* global Hotspots */

  /* global ResponsiveImage */

  /* global RoundLoader */

  /* global globalFunctions */

  /* global globalVariables */

  /* global defaults */

  /* global defaultsForDeepZoom */

  /* global defaultsForMobileZoomOptions */

  /* global defaultsForOutsideMode */

  /* global defaultsForMobileInnerMode */

  /* eslint-disable indent */

  /*eslint consistent-return: 0*/

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint class-methods-use-this: ["off", { "imageSettings": ["error"] }] */
  // eslint-disable-next-line no-unused-vars


  var Zoom = function () {
    var P = globalVariables.smv;
    var BRAND_LANDING = 'https://sirv.com/about-zoom/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(zoom)&utm_campaign=branding';

    var stopEvent = function (e) {
      e.stop();
    };

    var difference = function (value1, value2) {
      return Math.abs(value1 - value2);
    };

    var getContainerForZoom = function (container) {
      var result = null;

      while (container.node !== $J.D.node.body && !result) {
        container = $(container.node.parentNode);

        if (container.hasClass(P + '-slides-box')) {
          result = container;
        }
      }

      return result;
    };

    var getNodeSize = function (node, count) {
      return new Promise(function (resolve, reject) {
        var size = $(node).getSize();

        if (!count) {
          count = 100;
        }

        count -= 1;

        if (size.width || size.height) {
          resolve(size);
        } else if (count > 0) {
          setTimeout(function () {
            getNodeSize(node, count).then(resolve).catch(reject);
          }, 16);
        } else {
          reject(null);
        }
      });
    };

    var Zoom_ = /*#__PURE__*/function (_Zoominstance) {
      "use strict";

      bHelpers.inheritsLoose(Zoom_, _Zoominstance);

      function Zoom_(node, options) {
        var _this4;

        _this4 = _Zoominstance.call(this, node, options, defaults) || this;
        _this4.type = globalVariables.SLIDE.TYPES.ZOOM;
        _this4.insideOptions = {
          type: 'outside',
          // inner, circle, square, outside
          position: 'right',
          // top, left, right, bottom
          hideZoomForClickTrigger: true,
          zooming: true,
          map: false,
          mapSize: 50,
          controls: false,
          trigger: 'click',
          outsideModeWasChanged: false
        };
        _this4.imageUrl = _this4.instanceNode.attr('data-src'); // Image URL

        _this4.src = globalFunctions.normalizeURL(_this4.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$1')); // Image default params

        _this4.queryParams = helper.paramsFromQueryString(_this4.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2'));

        if (_this4.queryParams) {
          var q = parseInt(_this4.queryParams.quality, 10);

          if (isNaN(q)) {
            delete _this4.queryParams.quality;
          } else {
            _this4.queryParams.quality = q;
          }
        }

        _this4.isFullscreen = options.isFullscreen;
        _this4.nativeFullscreen = options.nativeFullscreen;
        _this4.queryParamsQuality = _this4.queryParams.quality || null;
        _this4.imageNode = null;
        _this4.loader = null;
        _this4.image = null;
        _this4.controls = null;
        _this4.differenceBetweenSizes = 100;
        _this4.currentSize = {
          width: 0,
          height: 0
        };
        _this4.currentImageSize = {
          width: 0,
          height: 0
        };
        _this4.isInfoLoaded = false;
        _this4.zoomIsOpened = false;
        _this4.imageShowPromise = null;
        _this4.hint = null;
        _this4.longTapTimer = null;
        _this4.setImageCss = false;
        _this4.lastTriggerAction = null;
        _this4.isNotMouse = false;
        _this4.accountInfo = {};
        _this4.postInitState = 0;
        _this4.clonedImage = null;
        _this4.isHidden = false;
        _this4.destroyed = false;
        _this4.waitingCallbacks = []; // just for outsize zoom

        _this4.lastImageSize = {
          width: 0,
          height: 0
        };
        _this4.hotspotsTurnedOn = true;
        _this4.scrollDebounce = helper.debounce(function () {
          _this4.replaceZoom();
        }, 16);
        _this4.zoomDebounce = helper.debounce(function () {
          if (_this4.controls) {
            _this4.controls.invisibleDisable();

            _this4.changeControlsState(_this4.zoom.getZoomData());
          }
        }, 42);
        _this4.onScrollHandler = _this4.onScroll.bind(bHelpers.assertThisInitialized(_this4));

        _this4.instanceNode.addEvent('selectstart', function (e) {
          e.stop();
        }); // this.api = $J.extend(this.api, {
        // resize: this.resize.bind(this), // parent class
        // zoomIn: this.zoomIn.bind(this), // parent class
        // zoomOut: this.zoomOut.bind(this), // parent class
        // isZoomed: this.isZoomed.bind(this), // parent class
        // isReady: this.isReady.bind(this), // parent class
        // getOptions: this.getOptions.bind(this), // parent class
        // hotspots: {} // parent class, hotspots api
        // });


        _this4.createHotspotsClass();

        _this4.createSirvImage();

        return _this4;
      }

      var _proto3 = Zoom_.prototype;

      _proto3.makeOptions = function makeOptions() {
        var options = new $J.Options(this.defaultSchema);
        options = this.makeGlobalOptions(options);

        if ($J.contains(['top', 'left', 'right', 'bottom', 'inner', 'magnifier'], options.get('mode'))) {
          options.parseSchema(defaultsForOutsideMode, true);
        }

        if ($J.browser.touchScreen && $J.browser.mobile) {
          options.parseSchema(defaultsForMobileZoomOptions, true);
          options = this.makeMobileOptions(options);

          if ($J.contains(['inner', 'deep'], options.get('mode'))) {
            options.parseSchema(defaultsForMobileInnerMode, true);
          }
        }

        if (options.get('mode') === 'deep') {
          options.parseSchema(defaultsForDeepZoom, true);
        }

        return options;
      };

      _proto3.getInfo = function getInfo() {
        var _this5 = this;

        if (!this.gettingInfoPromise) {
          this.gettingInfoPromise = new Promise(function (resolve, reject) {
            _this5.waitGettingInfo.wait(function () {
              _this5.image.getImageInfo().then(function (info) {
                if (!_this5.destroyed) {
                  _this5.isInfoLoaded = true;
                  _this5.accountInfo = _this5.image.getAccountInfo();

                  if (!_this5.dataAlt) {
                    _this5.dataAlt = _this5.image.getDescription();
                  }

                  _this5.hotspotsData = info.hotspots;
                  _this5.infoSize = _this5.image.getOriginSize();

                  if (_this5.hotspots) {
                    _this5.hotspots.setOriginImageSize(_this5.infoSize.width, _this5.infoSize.height);
                  }

                  resolve();
                }
              }).catch(function (err) {
                if (!_this5.destroyed) {
                  reject(err);
                }
              });
            });
          });
        }

        return this.gettingInfoPromise;
      };

      _proto3.showHint = function showHint() {
        if (this.hint) {
          if (!this.always || $J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) {
            this.hint.show();
          }
        }
      };

      _proto3.onStartActions = function onStartActions() {
        if (this._isReady) {
          if (this.isInView && this.isZoomSizeExist()) {
            this.showHint();
          }
        } else if (this.isStarted) {
          if (this.isInView && this.isSlideShown && !this.preload) {
            this.postInit();
          }
        }

        _Zoominstance.prototype.onStartActions.call(this);
      };

      _proto3.onStopActions = function onStopActions() {
        this.zoomOut(true);

        if (this.hint) {
          this.hint.hide();
        }

        _Zoominstance.prototype.onStopActions.call(this);
      };

      _proto3.onInView = function onInView(value) {
        if (value) {
          if (this._isReady) {
            if (this.isSlideShown && this.isZoomSizeExist()) {
              this.showHint();
            }
          } else if (this.isStarted) {
            if (!this.isInView && (this.preload || this.isSlideShown)) {
              this.isInView = true;
              this.postInit();
            }
          }
        }
      };

      _proto3.startFullInit = function startFullInit(options) {
        if (this.isStartedFullInit) {
          return;
        }

        _Zoominstance.prototype.startFullInit.call(this, options); // if (options && options.lensContainer) {
        //     this.zoomContainer = options.lensContainer;
        // }


        this.normalizeOptions();
        this.getId('zoom-');
        this.instanceNode.addClass(P + '-zoom-view');
        this.instanceNode.addEvent('mousedown', stopEvent);
        this.createLoader();
      };

      _proto3.imageSettings = function imageSettings(options) {
        if (!options) {
          options = {};
        }

        if (!options.imageSettings) {
          options.imageSettings = {};
        }

        if (!options.imageSettings.scale) {
          options.imageSettings.scale = {};
        }

        if (!options.callbackData) {
          options.callbackData = {};
        }

        options.imageSettings.scale.option = 'fill';

        if (this.quality !== null && this.queryParamsQuality === null) {
          if (!options.src) {
            options.src = {};
          }

          options.src.quality = this.quality;
        }

        var hdQuality = this.hdQuality;

        if (this.queryParamsQuality === null || this.isHDQualitySet && hdQuality < this.queryParamsQuality) {
          options.srcset = {
            quality: hdQuality
          };
        }

        return options;
      };

      _proto3.setHDQuality = function setHDQuality(data) {
        if (data.dppx > 1 && data.dppx < 1.5) {
          if (this.queryParamsQuality === null && this.quality !== null) {
            data.srcset.quality = this.quality;
          } else if (data.srcset) {
            delete data.srcset.quality;
          }
        }

        return data;
      };

      _proto3.isOutsideZoom = function isOutsideZoom() {
        return $J.contains(['top', 'left', 'right', 'bottom'], this.option('mode'));
      };

      _proto3.createHint = function createHint(message) {
        if (this.option('hint.enable')) {
          this.hint = new Hint(this.instanceNode, {
            html: '<span>' + message + '<span>'
          });
          this.hint.append();
        }
      };

      _proto3.clearZoom = function clearZoom() {
        if (this.zoom) {
          this.off('zooming');
          this.off('zoomUp');
          this.off('zoomDown');

          if (this.imageNode) {
            this.imageNode.removeClass(this.zoomClassName);
          }
        }

        _Zoominstance.prototype.clearZoom.call(this);
      };

      _proto3.replaceZoom = function replaceZoom() {
        var trigger = false;
        var currentTrigger = this.option('trigger');
        var zoomOptions = {
          clickBehavior: 'both'
        };

        if (!this._isReady) {
          return;
        }

        if (currentTrigger === 'hover' && this.option('mode') !== 'magnifier') {
          if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) {
            trigger = 'click';
            zoomOptions.trigger = trigger;
          } else {
            trigger = currentTrigger;
          }
        }

        var createNewZoom = false;

        if (trigger && this.insideOptions.trigger !== trigger) {
          createNewZoom = true;
        }

        var canIUse;

        if (this.insideOptions.type === 'outside') {
          canIUse = this.canIUseOutsideZoom();

          if (canIUse && this.insideOptions.outsideModeWasChanged || !canIUse && !this.insideOptions.outsideModeWasChanged) {
            this.insideOptions.outsideModeWasChanged = !this.insideOptions.outsideModeWasChanged;
            createNewZoom = true;
          } // if the image checnge size the window of outside zoom must chenge too


          var imageSize = this.imageNode.getSize();

          if (!createNewZoom && canIUse && this.lastImageSize.width !== imageSize.width) {
            this.lastImageSize = imageSize;
            createNewZoom = true;
          }
        }

        if (createNewZoom) {
          this.clearZoom();

          if (this.insideOptions.type === 'outside') {
            if (canIUse) {
              zoomOptions.type = 'outside';
            } else {
              zoomOptions.type = 'inner';

              if ($J.browser.mobile) {
                zoomOptions.pan = true;

                if (currentTrigger === 'hover') {
                  trigger = 'dblclick';
                  zoomOptions.trigger = trigger;
                }
              }
            }
          }

          if (trigger) {
            this.insideOptions.trigger = trigger;
          }

          this.setTriggerAction(trigger);
          this.createZoom(zoomOptions);
          this.setZoomEvents();
        }
      };

      _proto3.canIUseOutsideZoom = function canIUseOutsideZoom() {
        var result = false;

        if (this.insideOptions.type === 'outside') {
          if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) {
            return result;
          }

          var margin = this.option('margin');
          var zoomSize = this.imageNode.getSize();
          var scroll = $J.W.getScroll();
          var pos = this.imageNode.getPosition();
          var w = this.option('width');
          var h = this.option('height');
          var size = {
            width: zoomSize.width,
            height: zoomSize.height
          };

          if (w !== 'auto') {
            if (/%$/.test(w)) {
              zoomSize.width = zoomSize.width / 100 * parseInt(w, 10);
            } else {
              zoomSize.width = parseInt(w, 10);
            }
          }

          if (h !== 'auto') {
            if (/%$/.test(h)) {
              zoomSize.height = zoomSize.height / 100 * parseInt(h, 10);
            } else {
              zoomSize.height = parseInt(h, 10);
            }
          }

          var tmp;

          switch (this.insideOptions.position) {
            case 'top':
              tmp = pos.top - scroll.y - margin;

              if (tmp > zoomSize.height) {
                result = true;
              }

              break;

            case 'left':
              tmp = pos.left - scroll.x - margin;

              if (tmp >= zoomSize.width) {
                result = true;
              }

              break;

            case 'right':
              tmp = pos.left - scroll.x;
              tmp += size.width + margin;

              if ($J.W.node.innerWidth - tmp >= zoomSize.width) {
                result = true;
              }

              break;

            case 'bottom':
              tmp = pos.top - scroll.y;
              tmp += size.height + margin;

              if ($J.W.node.innerHeight - tmp >= zoomSize.height) {
                result = true;
              }

              break;
            // no default
          }
        }

        return result;
      };

      _proto3.createHotspotsClass = function createHotspotsClass() {
        if (this.option('mode') === 'magnifier') {
          return;
        }

        if (!$J.browser.mobile && this.option('trigger') === 'hover') {
          this.hotspotsTurnedOn = false;
        }

        _Zoominstance.prototype.createHotspotsClass.call(this, Hotspots);
      };

      _proto3.run = function run(isShown, preload, firstSlideAhead) {
        var _this6 = this;

        var result = _Zoominstance.prototype.run.call(this, isShown, preload, firstSlideAhead);

        if (result) {
          this.getInfo().finally(function () {
            _this6.calcContainerSize();

            if (_this6.isInView && (_this6.preload || _this6.isSlideShown)) {
              _this6.postInit();
            }
          });
          this.startGettingInfo();
        }

        return result;
      };

      _proto3.done = function done() {
        if (!this._isReady && !this.destroyed) {
          _Zoominstance.prototype.done.call(this);

          if (this.hotspots) {
            if (!this.hotspots.getHotspots().length) {
              this.hotspots.setInstanceComponentNode(this.imageNode);
            }

            this.hotspots.setContainerSize(this.imageNode.node.getBoundingClientRect());
          }

          this.createZoom();
          this.replaceZoom();
          this.createControls();
          var zoomable = this.isZoomSizeExist();

          if (this.controls) {
            this.controls.disable('out');

            if (zoomable) {
              this.controls.show();
            }
          }

          if (this.imageNode && zoomable) {
            this.imageNode.addClass(globalVariables.CSS_CURSOR_ZOOM_IN);
          }

          this.setZoomEvents();

          if (this.isSlideShown && this.isInView && zoomable) {
            this.showHint();
          }

          if (this.accountInfo.branded) {
            var nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
            globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, this.instanceNode, BRAND_LANDING, 'Deep zoom image viewer by Sirv');
          }
        }
      };

      _proto3.normalizeOptions = function normalizeOptions() {
        if (this.option('mode') !== 'deep') {
          this.option('map.enable', false);
        }

        if (this.option('mode') === 'deep' || $J.browser.mobile) {
          this.option('pan', true);
        }

        if (this.option('mode') === 'magnifier' && !$J.browser.mobile) {
          this.option('pan', false);
        }

        if (!this.isOutsideZoom()) {
          if (this.option('width') === 'auto' && this.option('height') === 'auto') {
            this.option('width', '70%');
          }
        }

        switch (this.option('trigger')) {
          case 'hover':
            if (this.option('mode') === 'deep') {
              this.option('trigger', 'click');
            }

            break;

          case 'click':
          case 'dblclick':
            break;

          default:
            this.option('trigger', false);
        }

        switch (this.option('mode')) {
          case 'top':
          case 'left':
          case 'right':
          case 'bottom':
            this.insideOptions.type = 'outside';
            this.insideOptions.position = this.option('mode');
            break;

          case 'magnifier':
            this.insideOptions.type = 'circle';
            break;

          case 'inner':
            this.insideOptions.type = 'inner';
            break;

          case 'deep':
            this.insideOptions.type = 'deep';
            this.insideOptions.controls = true;
            break;
          // no default
        }

        if (this.insideOptions.type === 'deep' && this.option('map.enable')) {
          this.insideOptions.map = this.option('map.size') !== 0;

          if (this.insideOptions.map) {
            this.insideOptions.mapSize = 100 / 50 * this.option('map.size');
          }
        }

        this.insideOptions.trigger = this.option('trigger');

        if ($J.browser.mobile) {
          this.insideOptions.hideZoomForClickTrigger = false;
        }

        if (this.option('ratio') !== 'max' && this.option('ratio') < globalVariables.MIN_RATIO) {
          this.option('ratio', 0);
        }

        this.setDefaultZoomOptions();
      };

      _proto3.setDefaultZoomOptions = function setDefaultZoomOptions() {
        var isDeep = this.insideOptions.type === 'deep';

        _Zoominstance.prototype.setDefaultZoomOptions.call(this);

        this.defaultZoomOptions = $J.extend(this.defaultZoomOptions, {
          trigger: this.option('trigger'),
          tiles: this.option('tiles'),
          width: this.option('width'),
          height: this.option('height'),
          map: this.insideOptions.map,
          clickBehavior: isDeep ? 'up' : 'both',
          outsidePosition: this.insideOptions.position,
          margin: this.option('margin'),
          type: isDeep ? 'inner' : this.insideOptions.type,
          pan: this.option('pan'),
          customZooming: this.option('wheel'),
          mapSize: this.insideOptions.mapSize
        });
      };

      _proto3.onZoomGetImage = function onZoomGetImage(e) {
        _Zoominstance.prototype.onZoomGetImage.call(this, e);

        e.data = this.imageSettings(e.data);
        e.data = this.setHDQuality(e.data);
        var img = this.image.getImage(e.data);

        if (this.checkImage(e.data, e.data.dontLoad)) {
          this.zoom.setImage(img);
        }
      };

      _proto3.onZoomCancelLoadingOfTiles = function onZoomCancelLoadingOfTiles(e) {
        _Zoominstance.prototype.onZoomCancelLoadingOfTiles.call(this, e);

        e.data = this.imageSettings(e.data);
        this.image.cancelLoadingImage(e.data);
      } // eslint-disable-next-line
      ;

      _proto3.onZoomBeforeShow = function onZoomBeforeShow(e) {
        if (this.option('mode') !== 'magnifier') {
          if (this.insideOptions.type === 'outside' && !this.insideOptions.outsideModeWasChanged) {
            this.imageNode.addClass('sirv-filter-bw');
          } else {
            this.imageNode.addClass(this.zoomClassName);
          }

          if (this.hotspots) {
            this.hotspots.disableAll();
          }
        }
      } // eslint-disable-next-line
      ;

      _proto3.onZoomShown = function onZoomShown(e) {
        if (this.isSlideShown) {
          this.sendEvent('zoomIn', {
            trigger: this.option('trigger'),
            isOutsideZoom: this.isOutsideZoom()
          });
        }
      } // eslint-disable-next-line
      ;

      _proto3.onZoomHidden = function onZoomHidden(e) {
        this.imageNode.removeClass(this.zoomClassName);
        this.imageNode.removeClass('sirv-filter-bw');
        this.sendEvent('zoomOut');
        this.isNotMouse = false;
        this.zoomIsOpened = false;

        if (this.pinchCloud) {
          this.pinchCloud.addEvent();
        }

        if (this.hotspots) {
          if (this.hotspotsTurnedOn && $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING], this.fullscreenState) || this.insideOptions.trigger !== 'hover' && $J.contains([globalVariables.FULLSCREEN.OPENED, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState)) {
            this.hotspots.enableAll();

            if (this.isInView && this.isSlideShown) {
              this.hotspots.showNeededElements();
            }
          }
        }
      };

      _proto3.setZoomEvents = function setZoomEvents() {
        var _this7 = this;

        _Zoominstance.prototype.setZoomEvents.call(this);

        this.on('zooming', function (e) {
          var zoom = e.data.zoom;
          e.stopAll();

          if (_this7.controls) {
            _this7.controls.invisibleDisable(true);

            _this7.changeControlsState(zoom);

            _this7.zoomDebounce();
          }
        });
        this.on('zoomUp', function (e) {
          e.stop();

          _this7.makeZoom('zoomin', e.data.x, e.data.y);
        });
        this.on('zoomDown', function (e) {
          e.stop();

          _this7.makeZoom('zoomout', e.data.x, e.data.y);
        });
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto3.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {
        if (this.zoomIsOpened) {
          this.zoom.hide(true);

          if (this.controls) {
            this.controls.disable('out');
          }
        }

        if (this._isReady && this.isSlideShown && this.isInView && !!this.imageNode) {
          this.isHidden = true;
          this.imageNode.setCss({
            opacity: 0,
            visibility: 'hidden'
          });
        }

        _Zoominstance.prototype.onBeforeFullscreenIn.call(this, data);

        if (this.hotspots) {
          this.hotspots.disableAll();
        }
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto3.onAfterFullscreenIn = function onAfterFullscreenIn(data) {
        var _this8 = this;

        this.calcContainerSize();
        this.replaceZoom();

        if (this.isHidden) {
          this.isHidden = false;
          setTimeout(function () {
            _this8.setImageWidthHeight();

            _this8.imageNode.setCss({
              opacity: '',
              visibility: ''
            });
          }, 0);
        } // if we use it, we do not have pinchend event and touchdrag after that
        // if (this.pinchCloud) {
        //     this.pinchCloud.removeEvent();
        //     this.pinchCloud.addEvent();
        // }


        if (this.hotspots) {
          setTimeout(function () {
            // we have to wait a little bit for 'onResize' function
            if (_this8.hotspotsTurnedOn && _this8.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
              // if we will exit from fullscreen before the timeout end
              _this8.hotspots.enableAll();

              if (_this8.isInView && _this8.isSlideShown) {
                _this8.hotspots.showNeededElements();
              }
            }
          }, 100);
        }
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto3.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {
        if (this.zoomIsOpened) {
          this.zoom.hide(true);

          if (this.controls) {
            this.controls.disable('out');
          }
        }

        _Zoominstance.prototype.onBeforeFullscreenOut.call(this, data);

        if (this.hotspots) {
          if (!this.hotspotsTurnedOn) {
            this.hotspots.disableAll();
          }
        } // if (this.option('mode') === 'magnifier') {
        //     this.zoom.setLensContainer($J.D.node.body);
        // }


        this.replaceZoom();

        if (this._isReady && this.isSlideShown && this.isInView && !!this.imageNode) {
          this.isHidden = true;
          this.imageNode.setCss({
            opacity: 0,
            visibility: 'hidden'
          });
        }
      } // eslint-disable-next-line no-unused-vars
      ;

      _proto3.onAfterFullscreenOut = function onAfterFullscreenOut(data) {
        var _this9 = this;

        if (this.isHidden) {
          this.isHidden = false;
          setTimeout(function () {
            if (!_this9.destroyed) {
              _this9.setImageWidthHeight();

              _this9.imageNode.setCss({
                opacity: '',
                visibility: ''
              });
            }
          }, 0);
        }

        _Zoominstance.prototype.onAfterFullscreenOut.call(this, data); // if we use it, we do not have pinchend event and touchdrag after that
        // if (this.pinchCloud) {
        //     this.pinchCloud.removeEvent();
        //     this.pinchCloud.addEvent();
        // }

      };

      _proto3.onSecondSelectorClick = function onSecondSelectorClick() {
        this.zoomOut(true);
      };

      _proto3.onMouseAction = function onMouseAction(type) {
        if (type === 'mouseout') {
          if (!$J.contains(['deep', 'magnifier'], this.option('mode')) && (this.insideOptions.type === 'outside' && this.insideOptions.outsideModeWasChanged || this.insideOptions.type === 'inner') && (this.insideOptions.trigger === 'hover' || this.insideOptions.hideZoomForClickTrigger) && !this.isNotMouse) {
            this.zoomOut(true);
          }
        }
      };

      _proto3.makeZoom = function makeZoom(direction, x, y) {
        var result = false;

        if (this._isReady && this.zoom) {
          switch (direction) {
            case 'zoomin':
              if (this.zoomIsOpened) {
                if (this.zoom.getNextMinZoom() === 1) {
                  this.controls.disable('in');
                }

                result = this.zoom.zoomUp(x, y);
              } else {
                result = this.openZoom(x, y, this.insideOptions.type === 'deep' ? 'first' : false);
              }

              break;

            case 'zoomout':
              if (this.zoomIsOpened) {
                if (this.zoom.getZoomData() === 0 || this.zoom.getNextMinZoom() === 0) {
                  result = this.zoom.hide();

                  if (this.controls) {
                    this.controls.disable('out');
                  }
                } else {
                  result = this.zoom.zoomDown(x, y);
                }
              }

              break;

            default:
              // why is it need
              if (this.zoomIsOpened) {
                result = this.zoom.hide();

                if (this.controls) {
                  this.controls.disable('out');
                }
              }

          }
        }

        return result;
      };

      _proto3.calcContainerSize = function calcContainerSize() {
        var size = this.instanceNode.getSize();

        if (!size.height || !size.width) {
          var originSize = this.image.getOriginSize();

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

      _proto3.getImageSize = function getImageSize() {
        var width;
        var height;
        var cs = this.currentSize;
        var is = this.image.getOriginSize();

        if (cs.width >= cs.height) {
          height = Math.min(cs.height, is.height);
          width = is.width / is.height * height;

          if (width > cs.width) {
            width = Math.min(cs.width, is.width);
            height = is.height / is.width * width;
          }
        } else {
          width = Math.min(cs.width, is.width);
          height = is.height / is.width * width;

          if (height > cs.height) {
            height = Math.min(cs.height, is.height);
            width = is.width / is.height * height;
          }
        }

        return $J.extend({
          realWidth: width,
          realHeight: height
        }, this.image.getClearSizeWithoutProcessingSettings({
          width: width,
          height: height
        }));
      };

      _proto3.setTriggerAction = function setTriggerAction(tr) {
        var _this10 = this;

        var trigger = this.option('trigger');
        this.isNotMouse = false;

        if (this.option('ratio') !== 'max' && this.option('ratio') < globalVariables.MIN_RATIO) {
          return;
        }

        if (trigger) {
          var showHint = false;

          if (this.lastTriggerAction) {
            this.lastTriggerAction();
            this.lastTriggerAction = null;

            if (this.hint) {
              this.hint.destroy();
              this.hint = null;
              showHint = true;
            }
          }

          if (tr) {
            trigger = tr;
          }

          var imageEvent;
          var hintMessage;

          switch (trigger) {
            case 'click':
              imageEvent = 'btnclick tap';
              hintMessage = this.option('hint.text.click');
              break;

            case 'dblclick':
              imageEvent = 'dblbtnclick dbltap';
              hintMessage = this.option('hint.text.dblclick');
              break;

            case 'hover':
              imageEvent = 'mouseover';
              hintMessage = this.option('hint.text.hover');

              if ($J.browser.mobile) {
                if (this.outsideModeWasChanged) {
                  hintMessage = this.option('hint.text.dblclick');
                  imageEvent = 'dbltap';
                  trigger = imageEvent;
                }
              }

              break;
            // no default
          }

          this.createHint(hintMessage);

          if (showHint && this.isSlideShown && this.isInView && this.isZoomSizeExist()) {
            this.showHint();
          }

          var cbs = [];

          if (trigger === 'hover') {
            if ($J.browser.touchScreen) {
              cbs.push(this.setLongTapEvents());
            }

            if (!$J.browser.mobile) {
              cbs.push(this.setHoverEvents());
            }
          } else {
            var eventHandler = function (e) {
              if (_this10.fullscreenState === globalVariables.FULLSCREEN.OPENED || !_this10.always) {
                e.stop();

                if (_this10.isFullscreenActionEnded()) {
                  var pageXY = e.getPageXY();

                  _this10.openZoom(pageXY.x, pageXY.y, false);
                }
              }
            };

            if ($J.browser.touchScreen) {
              var pointerCallback = function (e) {
                _this10.isNotMouse = e.isTouchEvent();
              };

              this.imageNode.addEvent('pointerup', pointerCallback);
              cbs.push($(function (cb) {
                _this10.isNotMouse = false;

                _this10.imageNode.removeEvent('pointerup', cb);
              }).bind(this, pointerCallback));
            }

            this.imageNode.addEvent(imageEvent, eventHandler);
            cbs.push($(function (eventName, cb) {
              _this10.imageNode.removeEvent(eventName, cb);
            }).bind(this, imageEvent, eventHandler));
          }

          this.lastTriggerAction = $(function (_cbs) {
            $(_cbs).forEach(function (cb) {
              cb();
            });
          }).bind(this, cbs);
        }
      };

      _proto3.setImageSrc = function setImageSrc(src, srcset, dppx) {
        if (this.imageNode) {
          this.imageNode.attr('src', src);

          if (srcset) {
            this.imageNode.attr('srcset', srcset + ' ' + dppx + 'x');
          } else {
            this.imageNode.removeAttr('srcset');
          }

          this.clonedImage = $(this.imageNode.node.cloneNode(true));
          this.clonedImage.node.className = '';
        }
      };

      _proto3.setImageWidthHeight = function setImageWidthHeight() {
        if (!this.destroyed) {
          if (this.currentImageSize.realWidth / this.currentImageSize.realHeight >= this.currentSize.width / this.currentSize.height) {
            this.imageNode.setCss({
              width: '100%',
              height: ''
            });
          } else {
            this.imageNode.setCss({
              width: '',
              height: '100%'
            });
          }
        }
      };

      _proto3.createImage = function createImage(node, src, srcset, dppx) {
        var _this11 = this;

        if (!this.imageNode) {
          if (node) {
            this.imageNode = $(node);
          } else {
            this.imageNode = $J.$new('img');
          }

          this.imageNode.attr('referrerpolicy', this.referrerPolicy);
          var originSize = this.image.getOriginSize();
          this.imageNode.setCss({
            maxWidth: originSize.width,
            maxHeight: originSize.height
          });
          this.setImageWidthHeight();
          this.setTriggerAction();

          if (this.option('wheel') && this.option('mode') === 'deep') {
            this.imageNode.addEvent('mousescroll', function (e) {
              if (!_this11.zoomIsOpened && e.delta > 0) {
                e.stop();

                _this11.openZoom(e.x, e.y, 'first');
              }
            });
          }

          $J.W.addEvent('scroll', this.onScrollHandler);

          if (this.dataAlt) {
            this.imageNode.attr('alt', this.dataAlt);
          }

          this.setImageSrc(src, srcset, dppx);
        }
      };

      _proto3.setLongTapEvents = function setLongTapEvents() {
        var _this12 = this;

        var move = false;
        var touchDown = false;

        var _start = function (e) {
          clearTimeout(_this12.longTapTimer);

          if (_this12.zoomIsOpened || e.isTouchEvent() && !e.isPrimaryTouch()) {
            return;
          }

          if (_this12.isFullscreenActionEnded()) {
            _this12.longTapTimer = setTimeout(function () {
              if (e.isTouchEvent() && !e.isPrimaryTouch()) {
                return;
              }

              e.stop();
              move = true;
              var p = e.getPageXY();

              _this12.openZoom(p.x, p.y, false, true);
            }, 201);
            touchDown = true;
          }
        };

        var _move = function (e) {
          if (e.isTouchEvent() && !e.isPrimaryTouch(e)) {
            return;
          }

          if (move) {
            e.stop();
            var p = e.getPageXY();

            _this12.zoom.customMove(p.x, p.y);
          } else {
            clearTimeout(_this12.longTapTimer);
          }
        };

        var _end = function (e) {
          if (e.isTouchEvent() && !e.isPrimaryTouch(e)) {
            return;
          }

          if (touchDown) {
            // e.stop();
            touchDown = false;
            clearTimeout(_this12.longTapTimer);
          }

          if (move) {
            e.stop();
            move = false;

            _this12.zoom.hide(true);
          }
        };

        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.always) {
          this.instanceNode.addEvent('touchstart pointerdown', _start);
          this.instanceNode.addEvent('touchmove pointermove', _move);
          this.instanceNode.addEvent('touchend pointerup', _end);
        }

        return function () {
          _this12.instanceNode.removeEvent('touchstart pointerdown', _start);

          _this12.instanceNode.removeEvent('touchmove pointermove', _move);

          _this12.instanceNode.removeEvent('touchend pointerup', _end);
        };
      };

      _proto3.setHoverEvents = function setHoverEvents() {
        var _this13 = this;

        var isOver = false;
        var x;
        var y;
        var timer;

        var check = function () {
          return $J.browser.touchScreen && !$J.browser.mobile;
        };

        var _move = function (e) {
          var pageXY = e.getPageXY();
          x = pageXY.x;
          y = pageXY.y;

          if (check() && e.isTouchEvent()) {
            return;
          }

          if (!isOver && _this13.isSlideShown && (_this13.fullscreenState === globalVariables.FULLSCREEN.OPENED || !_this13.always)) {
            isOver = true;
            timer = setTimeout(function () {
              // the scroll is not needed for inner zoom
              _this13.openZoom(x, y, false);
            }, 84);
          }
        };

        var _out = function (e) {
          var relatedTarget = $(e.getRelated());

          if (check() && e.isTouchEvent()) {
            return;
          }

          if (isOver && (_this13.fullscreenState === globalVariables.FULLSCREEN.OPENED || !_this13.always)) {
            isOver = false;

            if (_this13.isFullscreenActionEnded()) {
              while (relatedTarget && relatedTarget !== _this13.imageNode.node && relatedTarget !== $J.D.node.body) {
                relatedTarget = $(relatedTarget.parentNode);
              }

              if (relatedTarget !== _this13.imageNode.node) {
                x = null;
                y = null;
                clearTimeout(timer);
              }
            }
          }
        };

        var removeConnection = function () {};

        var moveEvent = 'mousemove';
        var outEvent = 'mouseout';

        if (check() && helper.isIe()) {
          removeConnection = this.on('zoomHidden', function (e) {
            e.stop();
            isOver = false;
          });
          moveEvent = 'pointermove';
          outEvent = 'pointerup';
        }

        this.imageNode.addEvent(moveEvent, _move);
        this.imageNode.addEvent(outEvent, _out);
        return function () {
          removeConnection();

          _this13.imageNode.removeEvent(moveEvent, _move);

          _this13.imageNode.removeEvent(outEvent, _out);
        };
      };

      _proto3.getZoomImageSize = function getZoomImageSize() {
        var originSize = this.image.getOriginSize();
        var originWidth = originSize.width;
        var originHeight = originSize.height;
        var r = this.option('ratio');
        var size = {
          width: originWidth,
          height: originHeight
        };

        if (r !== 'max') {
          // because proportions can change
          size.width = this.currentImageSize.realWidth * r;
          size.height = this.currentImageSize.realHeight * r;
          size = ResponsiveImage.roundImageSize(size);
        }

        size.width = Math.min(originWidth, size.width);
        size.height = Math.min(originHeight, size.height);
        return {
          width: size.width,
          height: size.height,
          originWidth: originWidth,
          originHeight: originHeight
        };
      };

      _proto3.openZoom = function openZoom(x, y, toFirstLevel, longTap) {
        if (this.insideOptions.type === 'deep' && toFirstLevel !== 'zero') {
          toFirstLevel = 'first';
        }

        var result = false;

        if (!this.zoom || !this.isZoomSizeExist()) {
          return result;
        } // this.zoomIsOpened = img;


        this.zoomIsOpened = true;

        if (this.hint) {
          this.hint.hide();
        }

        if (this.hotspots) {
          this.hotspots.hideActiveHotspotBox(true);
        }

        var imageClone = this.clonedImage;
        var zoomSize = this.getZoomImageSize();

        if (undefined === x) {
          result = this.zoom.showCenter(imageClone, zoomSize, toFirstLevel);
        } else {
          result = this.zoom.show(imageClone, zoomSize, x, y, longTap, toFirstLevel);
        }

        return result;
      };

      _proto3.createPinchEvent = function createPinchEvent() {
        var _this14 = this;

        // difference between scale
        var OPEN_ZOOM = 1.1;
        var FS_OUT = 0.2;
        var FS_IN = 2;
        var scale;
        var baseMin;
        var saveValue;
        var compensation;
        var maxCompensation;
        var minCompensation;
        var max;
        var min;
        var basePercent;

        var setDefaultsValues = function () {
          maxCompensation = 1;
          minCompensation = 1;
          baseMin = _this14.zoom.getBaseScale().x;
          max = 1;
          min = baseMin;
          saveValue = 1 - baseMin;
        };

        _Zoominstance.prototype.createPinchEvent.call(this, this.instanceNode);

        this.pinchCloud.onPinchStart = function (e) {
          if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING], _this14.fullscreenState) || _this14.insideOptions.type === 'outside' && !_this14.insideOptions.outsideModeWasChanged) {
            return;
          }

          _this14.pinchCloud.pinch = true;
          clearTimeout(_this14.longTapTimer);
          basePercent = false;
          _this14.pinchCloud.scale = e.scale;
          compensation = 1;

          if (_this14.hotspots) {
            _this14.hotspots.hideActiveHotspotBox(true);
          }

          if (_this14.zoomIsOpened) {
            compensation = _this14.zoom.scale.x;

            if (baseMin === $J.U) {
              setDefaultsValues();
            }

            compensation /= baseMin;
          }

          _this14.sendEvent('pinchStart');
        };

        this.pinchCloud.onPinchResize = function (e) {
          if (_this14.pinchCloud.pinch && !_this14.pinchCloud.block) {
            if (_this14.zoom && _this14.fullscreenState === globalVariables.FULLSCREEN.OPENED && _this14.zoomIsOpened) {
              _this14.pinchCloud.scale = e.scale;

              _this14.zoom.setBasePercent(e.centerPoint);
            }
          }
        };

        this.pinchCloud.onPinchMove = function (e) {
          if (_this14.pinchCloud.pinch && !_this14.pinchCloud.block) {
            if (_this14.fullscreenState === globalVariables.FULLSCREEN.OPENED || !_this14.isFullscreenEnabled) {
              if (!_this14.zoomIsOpened) {
                if (e.scale > OPEN_ZOOM) {
                  if (_this14.option('mode') !== 'magnifier' && _this14.option('wheel')) {
                    _this14.openZoom(e.centerPoint.x, e.centerPoint.y, 'zero');

                    setDefaultsValues();
                    compensation = 1;
                  }
                } else if (e.scale < FS_OUT && _this14.isFullscreenEnabled) {
                  _this14.pinchCloud.block = true;

                  _this14.sendEvent('fullscreenOut');
                }
              } else if (_this14.zoom) {
                if (!basePercent) {
                  basePercent = true;

                  _this14.zoom.setBasePercent(e.centerPoint);
                } else {
                  scale = e.scale;
                  scale *= baseMin;

                  if (max < scale) {
                    max = scale;
                    min = baseMin;
                    minCompensation = 1;
                    maxCompensation = saveValue / (max - baseMin);
                  }

                  if (min > scale) {
                    min = scale;
                    max = 1;
                    maxCompensation = 1;
                    minCompensation = baseMin / min;
                  }

                  scale *= compensation;
                  scale = (baseMin + (scale - baseMin) * maxCompensation) * minCompensation;

                  _this14.zoom.setScale(scale, e.centerPoint.x, e.centerPoint.y);
                }

                _this14.pinchCloud.scale = e.scale;
              }
            } else if (e.scale >= FS_IN) {
              _this14.pinchCloud.block = true;

              _this14.sendEvent('fullscreenIn');
            }
          }
        }; // eslint-disable-next-line


        this.pinchCloud.onPinchEnd = function (e) {
          // TODO hide zoom if zoom works with this event
          if (_this14.pinchCloud.pinch) {
            _this14.pinchCloud.pinch = false;

            _this14.sendEvent('pinchEnd');
          }

          if (_this14.zoomIsOpened) {
            _this14.pinchCloud.removeEvent();
          }

          _this14.pinchCloud.block = false;
        };
      };

      _proto3.loadContent = function loadContent() {
        this.postInit();
      };

      _proto3.postInit = function postInit() {
        var _this15 = this;

        if (this.postInitState) {
          return;
        }

        this.postInitState = 1;
        this.waitToStart.start();
        getNodeSize(this.instanceNode.node).then(function (size) {
          _this15.currentSize = size; // eslint-disable-next-line
        }).catch(function (error) {
          if (!_this15.destroyed) {
            _this15.calcContainerSize();
          }
        }).finally(function () {
          if (!_this15.destroyed) {
            _this15.postInitState = 2;

            _this15.getImage();
          }
        });
      };

      _proto3.getImageClassContainer = function getImageClassContainer() {
        return this.image;
      } // checkImage(setts, dontLoad) {
      //     let result;
      //     if (dontLoad) {
      //         result = this.image.isExist(setts); // because we do not load images with imageclass
      //     } else {
      //         result = this.image.isLoaded(setts);
      //     }
      //     return result;
      // }
      ;

      _proto3.getImage = function getImage() {
        var _this16 = this;

        var newImageSize = this.getImageSize();
        /*
            we must do round for those values
             for example without round
            old size is 374
            new size is 470
            470 - 374 = 96
            difference between those sizes is less than 100 and we won't reload for image
            but image was loaded with size 400
             with round
            374 + round = 400
            470 + round = 500
             500 - 400 = 100 we must to reload image
        */

        var diff = difference(ResponsiveImage.roundImageSize({
          width: this.currentImageSize.width
        }).width, ResponsiveImage.roundImageSize({
          width: newImageSize.width
        }).width);
        var originSize;
        var dppx;
        var dontLoad = true;
        this.setImageCss = false;

        if (!this._isReady || diff >= this.differenceBetweenSizes || this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
          // fix for if the viewer was with display none
          if (!this._isReady && !newImageSize.width && !newImageSize.height) {
            setTimeout(function () {
              _this16.calcContainerSize();

              _this16.getImage();
            }, 16);
            return;
          }

          if (diff >= this.differenceBetweenSizes || this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.currentImageSize.width) {
            this.currentImageSize = newImageSize;
          }

          var opt = this.imageSettings({
            width: this.currentImageSize.realWidth,
            height: this.currentImageSize.realHeight,
            round: true,
            dontLoad: dontLoad
          });

          if ($J.DPPX > 1) {
            originSize = this.image.getOriginSize();

            if (opt.height > opt.width) {
              dppx = helper.getDPPX(opt.round ? ResponsiveImage.roundImageSize({
                height: opt.height
              }).height : opt.height, originSize.height, this.upscale);
            } else {
              dppx = helper.getDPPX(opt.round ? ResponsiveImage.roundImageSize({
                width: opt.width
              }).width : opt.width, originSize.width, this.upscale);
            }

            opt.dppx = dppx;
          }

          opt = this.setHDQuality(opt);

          if (!this.checkImage(opt, dontLoad) || !this._isReady) {
            this.image.getImage(opt);
          } else {
            var img = this.image.getImage(opt);
            this.setImageSrc(img.src, img.srcset, dppx);
          }
        } else if (diff < this.differenceBetweenSizes) {
          this.setImageCss = true;
        }
      };

      _proto3.imageRequest = function imageRequest() {
        this.image.getImage(this.imageSettings({
          width: this.currentImageSize.width,
          height: this.currentImageSize.height
        }));
      };

      _proto3.showImage = function showImage() {
        var _this17 = this;

        if (!this.imageShowPromise) {
          this.imageShowPromise = new Promise(function (resolve, reject) {
            var result = null;
            var _error = null;

            if (_this17.isInView && _this17.isSlideShown) {
              _this17.imageNode.setCss({
                opacity: 0,
                transition: 'opacity .3s linear'
              });

              _this17.instanceNode.append(_this17.imageNode);

              helper.loadImage(_this17.imageNode.node).then(function (imageData) {
                result = imageData;
              }).catch(function (error) {
                _error = error;
              }).finally(function () {
                if (!_this17.destroyed) {
                  _this17.imageNode.addEvent('transitionend', function (e) {
                    e.stop();

                    _this17.imageNode.removeEvent('transitionend');

                    _this17.imageNode.setCss({
                      opacity: '',
                      transition: ''
                    });

                    if (result) {
                      _this17.sendContentLoadedEvent();

                      resolve(result);
                    } else {
                      reject(_error);
                    }
                  });

                  _this17.imageNode.getSize();

                  _this17.imageNode.setCssProp('opacity', 1);
                }
              });
            } else {
              _this17.instanceNode.append(_this17.imageNode);

              helper.loadImage(_this17.imageNode.node).then(function (imageData) {
                result = imageData;
              }).catch(function (error) {
                _error = error;
              }).finally(function () {
                if (result) {
                  _this17.sendContentLoadedEvent();

                  resolve(result);
                } else {
                  reject(_error);
                }
              });
            }
          });
        }

        return this.imageShowPromise;
      };

      _proto3.createLoader = function createLoader() {
        this.loader = new RoundLoader(this.instanceNode, {
          'class': 'zoom-loader'
        });
      };

      _proto3.createSirvImage = function createSirvImage() {
        var _this18 = this;

        if (!this.imageUrl) {
          return;
        }

        this.on('imageOnload', function (e) {
          e.stopAll();

          if (e.data.callbackData.lens) {
            if ((_this18.zoom.isShown() || _this18.zoom.isShowing()) && _this18.zoomIsOpened) {
              _this18.zoom.setImage(e.data);
            }
          } else if (_this18._isReady) {
            if (_this18.imageShowPromise) {
              _this18.setImageSrc(e.data.src, e.data.srcset, e.data.dppx);
            }
          } else {
            _this18.createImage(e.data.node, e.data.src, e.data.srcset, e.data.dppx);

            _this18.showImage().finally(function () {
              if (_this18.loader) {
                _this18.loader.hide();
              }

              _this18.done();

              _this18.sendContentLoadedEvent();
            });
          }
        });
        this.on('imageOnerror', function (e) {
          e.stopAll();

          if (_this18.loader) {
            _this18.loader.hide();
          }

          console.log('image error');
        });
        this.image = new ResponsiveImage(this.imageUrl, {
          imageSettings: this.queryParams,
          referrerPolicy: this.referrerPolicy
        });
        this.image.setParent(this);
        this.getInfo();
      };

      _proto3.getInfoSize = function getInfoSize() {
        var _this19 = this;

        return new Promise(function (resolve, reject) {
          _this19.getInfo().then(function () {
            resolve({
              size: _this19.infoSize
            });
          }).catch(function (err) {
            reject({
              error: err,
              isPlaceholder: err._isplaceholder
            });
          });
        });
      };

      _proto3.getSelectorImgUrl = function getSelectorImgUrl(data) {
        var _this20 = this;

        return new Promise(function (resolve, reject) {
          var defOpt = _this20.imageSettings();

          if (defOpt.src) {
            data.src = defOpt.src;
          }

          data.srcset = defOpt.srcset;

          if (_this20.isInfoLoaded) {
            _this20.waitToStart.wait(function () {
              resolve($J.extend(_this20.image.getThumbnail(data), {
                alt: _this20.dataAlt
              }));
            });
          } else {
            _this20.getInfo().then(function () {
              _this20.waitToStart.wait(function () {
                resolve($J.extend(_this20.image.getThumbnail(data), {
                  alt: _this20.dataAlt
                }));
              });
            }).catch(reject);
          }
        });
      };

      _proto3.getThumbnailData = function getThumbnailData(opt) {
        return this.image.getThumbnail(opt);
      };

      _proto3.createControls = function createControls() {
        var _this21 = this;

        if (this.insideOptions.controls) {
          this.controls = new ZoomControls(this.instanceNode);
          this.controls.setParent(this);
          this.on('zoomControlsAction', function (e) {
            e.stopAll();

            if (_this21.zoom) {
              _this21.makeZoom(e.data.type);
            }
          });
        }
      };

      _proto3.changeControlsState = function changeControlsState(zoom
      /* from 0 to 1 */
      ) {
        if (this.controls) {
          if (zoom === 1 || zoom === 0) {
            if (zoom === 1) {
              this.controls.disable('in');
            } else {
              this.controls.disable('out');
            }
          } else {
            this.controls.disable();
          }
        }
      };

      _proto3.createZoom = function createZoom(options) {
        var result = null;

        if (!this.destroyed) {
          var lensContainer = this.zoomContainer;
          result = _Zoominstance.prototype.createZoom.call(this, this.instanceNode, options);

          if (this.option('mode') === 'magnifier') {
            lensContainer = getContainerForZoom(this.instanceNode);
          } else if (!$J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) {
            if (result.type === 'outside') {
              lensContainer = getContainerForZoom(this.instanceNode); // because container of viewer can be overflow hidden

              lensContainer = $J.D.node.body;
            }
          }

          if (lensContainer) {
            this.zoom.setLensContainer(lensContainer);
          }
        }

        return result;
      };

      _proto3.zoomIn = function zoomIn() {
        var result = false;

        if (this._isReady && this.zoom) {
          if (this.option('fullscreenOnly') && this.fullscreenState === globalVariables.FULLSCREEN.CLOSED) {
            this.sendEvent('fullscreenIn');
          } else {
            result = this.makeZoom('zoomin');
          }
        }

        return result;
      };

      _proto3.zoomOut = function zoomOut(force) {
        var result = false;

        if (this._isReady && this.zoom) {
          if (force) {
            if (this.zoomIsOpened) {
              result = this.zoom.hide(!this.zoom.getZoomData());
            }
          } else {
            result = this.makeZoom('zoomout');
          }
        }

        return result;
      };

      _proto3.getOriginImageUrl = function getOriginImageUrl() {
        if (this._isReady) {
          return this.image.getOriginImageUrl();
        }

        return null;
      };

      _proto3.isZoomSizeExist = function isZoomSizeExist() {
        var result = false;

        if (this._isReady) {
          var minZoomFactor = 100; // like in deep zoom level calculation

          var cs = this.currentImageSize;
          var zoomSize = this.getZoomImageSize();

          if (zoomSize.originWidth - cs.realWidth >= minZoomFactor && (this.option('ratio') === 'max' || this.option('ratio') >= globalVariables.MIN_RATIO)) {
            result = true;
          }
        }

        return result;
      };

      _proto3.onResize = function onResize() {
        var result = false;

        if (this.destroyed) {
          return;
        }

        if (this.isStarted && this.postInitState === 2) {
          this.calcContainerSize();
          this.getImage();

          if (this.hotspots) {
            if (this.hotspotsTurnedOn && $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING], this.fullscreenState) || this.insideOptions.trigger !== 'hover' && $J.contains([globalVariables.FULLSCREEN.OPENED, globalVariables.FULLSCREEN.CLOSING], this.fullscreenState)) {
              this.hotspots.setContainerSize(this.imageNode.node.getBoundingClientRect());

              if (this.isInView && this.isSlideShown) {
                this.hotspots.showNeededElements();
              }
            }
          }

          if (this.imageNode) {
            this.setImageWidthHeight();

            if (this.isZoomSizeExist()) {
              this.imageNode.addClass(globalVariables.CSS_CURSOR_ZOOM_IN);
            } else {
              if (this.hint) {
                this.hint.hide();
              }

              this.imageNode.removeClass(globalVariables.CSS_CURSOR_ZOOM_IN);
            }
          }

          result = true;
        }

        if (this.controls) {
          if (this.isZoomSizeExist()) {
            this.controls.show();
          } else {
            this.controls.hide();
          }
        }

        this.replaceZoom();

        if (this.zoom) {
          this.zoom.onResize();
        }

        return result;
      };

      _proto3.onScroll = function onScroll(e) {
        if (this.zoomIsOpened) {
          e.stop();
        }

        clearTimeout(this.longTapTimer);
        this.scrollDebounce();
      };

      _proto3.getType = function getType() {
        return this.type;
      };

      _proto3.destroy = function destroy() {
        this.destroyed = true;

        if (this.loader) {
          this.loader.destroy();
          this.loader = null;
        }

        $($J.W).removeEvent('scroll', this.onScrollHandler);
        this.onScrollHandler = null;

        if (this.lastTriggerAction) {
          this.lastTriggerAction();
          this.lastTriggerAction = null;
        }

        if (this.hint) {
          this.hint.destroy();
          this.hint = null;
        }

        if (this.image) {
          this.off('imageOnload');
          this.off('imageOnerror');
          this.image.destroy();
          this.image = null;
        }

        if (this.controls) {
          this.controls.destroy();
          this.controls = null;
          this.off('zoomControlsAction');
        }

        if (this.hotspots) {
          this.hotspotsTurnedOn = false;
          this.instanceNode.removeEvent('tap');
        }

        if (this.zoom) {
          this.off('zooming');
          this.off('zoomUp');
          this.off('zoomDown');
        }

        this.instanceNode.clearEvents();
        this.instanceNode.removeClass(P + '-zoom-view');

        if (this.imageNode) {
          this.imageNode.remove();
          this.imageNode = null;
        }

        if (this.clonedImage) {
          this.clonedImage = null;
        }

        this.zoomDebounce.cancel();
        this.zoomDebounce = null;
        this.scrollDebounce.cancel();
        this.scrollDebounce = null;
        clearTimeout(this.longTapTimer);
        this.longTapTimer = null;
        this.hotspotsData = null;

        _Zoominstance.prototype.destroy.call(this);

        return true;
      };

      return Zoom_;
    }(Zoominstance);

    return Zoom_;
  }();

  return Zoom;
});
//# sourceMappingURL=zoom.js.map
