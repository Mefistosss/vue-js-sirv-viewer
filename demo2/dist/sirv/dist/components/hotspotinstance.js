Sirv.define('HotspotInstance', ['bHelpers', 'magicJS', 'Promise!', 'Instance'], function (bHelpers, magicJS, Promise, Instance) {
  var moduleName = 'HotspotInstance';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* global Instance */

  /* eslint-disable class-methods-use-this */

  /* eslint-disable no-unused-vars */

  /* eslint no-console: ["error", { allow: ["warn"] }] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var warn = function (v1, v2) {
    console.warn('sirv.js: The ' + v1 + ' method is deprecated and will be removed. \r\n           Use ' + v2 + ' instead.');
  }; // eslint-disable-next-line no-unused-vars


  var HotspotInstance = /*#__PURE__*/function (_Instance) {
    "use strict";

    bHelpers.inheritsLoose(HotspotInstance, _Instance);

    function HotspotInstance(node, options, defaultSchema) {
      var _this;

      _this = _Instance.call(this, node, options, defaultSchema) || this; // this variable is usin in spin, zoom and image component

      _this.hotspots = null; // API

      var this_ = bHelpers.assertThisInitialized(_this);
      _this.api = $J.extend(_this.api, {
        addHotspot: function (hotspotsData) {
          warn('.addHotspot()', '.hotspots.add()');
          this_.hotspots.api.add(hotspotsData);

          if (this_.isInView && this_.isSlideShown) {
            this_.hotspots.showNeededElements();
          }
        },
        removeHotspot: function (index) {
          warn('.removeHotspot()', '.hotspots.remove()');
          this_.hotspots.api.remove(index);
        },
        removeAllHotspots: function () {
          warn('.removeAllHotspots()', '.hotspots.removeAll()');
          this_.hotspots.api.removeAll();
        },
        getHotspots: function () {
          warn('.getHotspots()', '.hotspots.list()');
          return this_.hotspots.api.list();
        }
      });
      return _this;
    }

    var _proto = HotspotInstance.prototype;

    _proto.createHotspotsClass = function createHotspotsClass(HotspotsClass, hotspotOptions) {
      var _this2 = this;

      this.hotspots = new HotspotsClass(hotspotOptions);
      this.hotspots.setParent(this);
      this.on('hotspotActivate', function (e) {
        e.stopAll();

        _this2.onHotspotActivate(e.data);

        _this2.sendEvent('hotspotOpened');
      });
      this.on('hotspotDeactivate', function (e) {
        e.stopAll();

        _this2.onHotspotDeactivate(e.data);

        _this2.sendEvent('hotspotClosed');
      });
      this.api = $J.extend(this.api, {
        hotspots: this.hotspots.api
      });
      var this_ = this;

      this.api.hotspots.add = function (hsData) {
        if (hsData) {
          var clientRect = null;

          if (!this_.hotspots.getHotspots().length) {
            var parentContainer = _this2.getParentContainer();

            clientRect = this_.hotspots.getRightBoundengClientRect(_this2.getContainerForBoundengClientRect());
            this_.hotspots.appendTo(parentContainer);
          }

          this_.hotspots.addHotspot(hsData);
          this_.hotspots.setContainerSize(clientRect);
          this_.hotspots.showAll();

          if (this_.isInView && this_.isSlideShown) {
            this_.hotspots.showNeededElements();
          }
        }
      };
    };

    _proto.getContainerForBoundengClientRect = function getContainerForBoundengClientRect() {
      return this.getParentContainer();
    };

    _proto.done = function done() {
      if (!this._isReady && !this.destroyed) {
        var parentContainer = this.getParentContainer();

        if (this.hotspots) {
          if (this.hotspotsData && this.hotspotsData.length) {
            this.hotspots.appendTo(parentContainer);
          }

          this.hotspots.createHotspots(this.hotspotsData);

          if (this.nativeFullscreen) {
            this.hotspots.changeBoxContainerParent(true);
          }

          this.hotspots.showAll();
        }
      }

      _Instance.prototype.done.call(this);
    };

    _proto.getParentContainer = function getParentContainer() {
      var parentContainer = this.instanceNode;

      if (parentContainer.getTagName() === 'img') {
        parentContainer = $(parentContainer.node.parentNode);
      }

      return parentContainer;
    };

    _proto.onHotspotActivate = function onHotspotActivate(data) {};

    _proto.onHotspotDeactivate = function onHotspotDeactivate(data) {};

    _proto.onStartActions = function onStartActions() {
      if (this.hotspots && this.isInView && this.isSlideShown) {
        this.hotspots.showNeededElements();
      }

      _Instance.prototype.onStartActions.call(this);
    };

    _proto.onStopActions = function onStopActions() {
      if (this.hotspots) {
        this.hotspots.hideActiveHotspotBox(true);
      }

      _Instance.prototype.onStopActions.call(this);
    };

    _proto.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {
      if (this.hotspots) {
        this.hotspots.hideActiveHotspotBox();

        if (this.nativeFullscreen) {
          this.hotspots.changeBoxContainerParent(true);
        }
      }
    };

    _proto.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {
      if (this.hotspots) {
        this.hotspots.hideActiveHotspotBox();

        if (this.nativeFullscreen) {
          this.hotspots.changeBoxContainerParent();
        }
      }
    };

    _proto.onAfterFullscreenOut = function onAfterFullscreenOut(data) {
      if (this.hotspots && this.isInView && this.isSlideShown) {
        this.hotspots.showNeededElements();
      }
    };

    _proto.destroy = function destroy() {
      if (this.hotspots) {
        this.hotspots.destroy();
      }

      this.hotspots = null;
      this.off('hotspotActivate');
      this.off('hotspotDeactivate');

      _Instance.prototype.destroy.call(this);
    };

    return HotspotInstance;
  }(Instance);

  return HotspotInstance;
});
//# sourceMappingURL=hotspotinstance.js.map
