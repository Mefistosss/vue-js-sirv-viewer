Sirv.define('Instance', ['bHelpers', 'magicJS', 'Promise!', 'globalVariables', 'BaseInstance', 'helper'], function (bHelpers, magicJS, Promise, globalVariables, BaseInstance, helper) {
  var moduleName = 'Instance';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* global BaseInstance */

  /* global helper */

  /* eslint-disable class-methods-use-this */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars

  var createError = function (name) {
    return new Error('This method \'' + name + '\' is not implemented.');
  };

  var Instance = /*#__PURE__*/function (_BaseInstance) {
    "use strict";

    bHelpers.inheritsLoose(Instance, _BaseInstance);

    function Instance(node, options, defaultSchema) {
      var _this;

      _this = _BaseInstance.call(this, node, options, defaultSchema) || this;
      _this.type = globalVariables.SLIDE.TYPES.NONE;
      _this.always = options.always;
      _this.quality = options.quality;
      _this.hdQuality = options.hdQuality;
      _this.isHDQualitySet = options.isHDQualitySet;
      _this.isFullscreenEnabled = options.isFullscreen;
      _this.dataAlt = null;
      _this.isSlideShown = false;
      _this.isInView = false;
      _this.preload = false;
      _this.firstSlideAhead = false;
      _this.infoSize = null;
      _this.pinchCloud = null;
      _this.onLoad = false;
      _this.waitToStart = new helper.WaitToStart();
      _this.waitGettingInfo = new helper.WaitToStart();
      _this.gettingInfoPromise = null;
      _this.fullscreenState = globalVariables.FULLSCREEN.CLOSED;

      _this.on('stats', function (e) {
        e.data.component = globalVariables.SLIDE.NAMES[_this.type];
      });

      return _this;
    }

    var _proto = Instance.prototype;

    _proto.sendEvent = function sendEvent(typeOfEvent, data) {
      if (!data) {
        data = {};
      }

      if (!data.event) {
        data.event = {};
      }

      data.id = this.id;
      data.url = this.instanceUrl;
      data.event.timestamp = +new Date();
      data.event.type = globalVariables.SLIDE.NAMES[this.type] + ':' + typeOfEvent;
      this.emit('componentEvent', {
        data: {
          type: typeOfEvent,
          data: data
        }
      });
    };

    _proto.onStartActions = function onStartActions() {};

    _proto.onStopActions = function onStopActions() {};

    _proto.onInView = function onInView(value) {};

    _proto.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {};

    _proto.onAfterFullscreenIn = function onAfterFullscreenIn(data) {};

    _proto.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {};

    _proto.onAfterFullscreenOut = function onAfterFullscreenOut(data) {};

    _proto.onMouseAction = function onMouseAction(type) {};

    _proto.onSecondSelectorClick = function onSecondSelectorClick() {};

    _proto.onStopContext = function onStopContext() {};

    _proto.loadContent = function loadContent() {
      return true;
    };

    _proto.loadThumbnail = function loadThumbnail() {
      if (!this.destroyed) {
        this.waitToStart.start();
        return true;
      }

      return false;
    };

    _proto.startGettingInfo = function startGettingInfo() {
      if (!this.destroyed) {
        this.waitGettingInfo.start();
        return true;
      }

      return false;
    };

    _proto.startFullInit = function startFullInit(options) {
      var _this2 = this;

      if (this.isStartedFullInit) {
        return;
      }

      _BaseInstance.prototype.startFullInit.call(this, options);

      if (options) {
        this.always = options.always;
      }

      this.dataAlt = this.instanceNode.attr('data-alt');
      this.on('startActions', function (e) {
        e.stop();
        _this2.isSlideShown = true;

        _this2.onStartActions(e.who);
      });
      this.on('stopActions', function (e) {
        e.stop();
        _this2.isSlideShown = false;

        _this2.onStopActions();
      });
      this.on('inView', function (e) {
        e.stop();
        var iv = e.data;

        _this2.onInView(iv);

        _this2.isInView = iv;
      });
      this.setEvents();
    };

    _proto.isFullscreenActionEnded = function isFullscreenActionEnded() {
      return $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENED], this.fullscreenState);
    };

    _proto.setEvents = function setEvents() {
      var _this3 = this;

      this.on('beforeFullscreenIn', function (e) {
        e.stop();

        if (_this3.fullscreenState === globalVariables.FULLSCREEN.OPENED || _this3.destroyed) {
          return;
        }

        _this3.fullscreenState = globalVariables.FULLSCREEN.OPENING;

        _this3.onBeforeFullscreenIn(e.data);
      });
      this.on('afterFullscreenIn', function (e) {
        e.stop();

        if (!_this3.destroyed) {
          _this3.fullscreenState = globalVariables.FULLSCREEN.OPENED;

          _this3.onAfterFullscreenIn(e.data);
        }
      });
      this.on('beforeFullscreenOut', function (e) {
        e.stop();

        if (_this3.fullscreenState === globalVariables.FULLSCREEN.CLOSED || _this3.destroyed) {
          return;
        }

        _this3.fullscreenState = globalVariables.FULLSCREEN.CLOSING;

        _this3.onBeforeFullscreenOut(e.data);
      });
      this.on('afterFullscreenOut', function (e) {
        e.stop();

        if (!_this3.destroyed) {
          _this3.fullscreenState = globalVariables.FULLSCREEN.CLOSED;

          _this3.onAfterFullscreenOut(e.data);
        }
      });
    };

    _proto.getOriginImageUrl = function getOriginImageUrl() {
      throw createError('getInfoSize');
    };

    _proto.getSelectorImgUrl = function getSelectorImgUrl(data) {
      return Promise.reject(createError('getSelectorImgUrl'));
    };

    _proto.getInfoSize = function getInfoSize() {
      return Promise.reject(createError('getInfoSize'));
    };

    _proto.run = function run(isShown, preload, firstSlideAhead) {
      var result = _BaseInstance.prototype.run.call(this);

      if (result) {
        this.isSlideShown = isShown;
        this.preload = preload;
        this.firstSlideAhead = firstSlideAhead;

        if (!this.firstSlideAhead) {
          this.waitToStart.start();
        }
      }

      return result;
    };

    _proto.getThumbnailData = function getThumbnailData() {
      return {
        src: null
      };
    };

    _proto.getSocialButtonData = function getSocialButtonData(data) {
      var opt = data;

      if (this.infoSize.width < data.width || this.infoSize.height < data.height) {
        opt.width = this.infoSize.width;
        opt.height = this.infoSize.height;
      }

      var thumbnailData = this.getThumbnailData(opt);
      return thumbnailData.src;
    };

    _proto.createPinchEvent = function createPinchEvent(node) {
      var _this4 = this;

      var pinchCloud = {
        isAdded: false,
        pinch: false,
        scale: 0,
        block: false,
        onPinchStart: function (e) {},
        onPinchResize: function (e) {},
        onPinchMove: function (e) {},
        onPinchEnd: function (e) {
          if (pinchCloud.pinch) {
            pinchCloud.pinch = false;

            _this4.sendEvent('pinchEnd');
          }

          pinchCloud.block = false;
        },
        handler: function (e) {
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

          if (pinchCloud.pinch) {
            e.stop();
          }
        },
        addEvent: function () {
          if (!pinchCloud.isAdded && $J.browser.touchScreen) {
            node.addEvent('pinch', pinchCloud.handler);
            pinchCloud.isAdded = true;
          }
        },
        removeEvent: function () {
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
    };

    _proto.done = function done() {
      var _this5 = this;

      _BaseInstance.prototype.done.call(this);

      this.createPinchEvent();
      this.on('resize', function (e) {
        e.stop();

        _this5.onResize();
      });
      this.on('stopContext', function (e) {
        e.stop();

        _this5.onStopContext();
      });
      this.on('secondSelectorClick', function (e) {
        e.stopAll();

        _this5.onSecondSelectorClick();
      });
      this.on('mouseAction', function (e) {
        e.stop();

        _this5.onMouseAction(e.data.type);
      });
      this.on('dragEvent', function (e) {
        e.stop();

        if (_this5.pinchCloud) {
          if (e.data.type === 'dragstart') {
            _this5.pinchCloud.removeEvent();
          } else if (e.data.type === 'dragend') {
            _this5.pinchCloud.addEvent();
          }
        }
      });
      this.sendEvent('ready');
    };

    _proto.sendContentLoadedEvent = function sendContentLoadedEvent() {
      if (!this.onLoad) {
        this.onLoad = true;
        this.sendEvent('contentLoaded');
      }
    };

    _proto.destroy = function destroy() {
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

      _BaseInstance.prototype.destroy.call(this);

      this.waitGettingInfo.destroy();
      this.waitGettingInfo = null;
      this.waitToStart.destroy();
      this.waitToStart = null;
      this.gettingInfoPromise = null;
    };

    return Instance;
  }(BaseInstance);

  return Instance;
});
//# sourceMappingURL=instance.js.map
