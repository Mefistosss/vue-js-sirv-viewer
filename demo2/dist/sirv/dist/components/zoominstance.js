Sirv.define('Zoominstance', ['bHelpers', 'magicJS', 'HotspotInstance', 'ImageZoom'], function (bHelpers, magicJS, HotspotInstance, ImageZoom) {
  var moduleName = 'Zoominstance';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* global HotspotInstance */

  /* global ImageZoom */

  /* eslint-disable class-methods-use-this */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars

  var ZoomInstance = /*#__PURE__*/function (_HotspotInstance) {
    "use strict";

    bHelpers.inheritsLoose(ZoomInstance, _HotspotInstance);

    function ZoomInstance(node, options, defaultSchema) {
      var _this;

      _this = _HotspotInstance.call(this, node, options, defaultSchema) || this;
      _this.zoom = null;
      _this.upscale = false;
      _this.defaultZoomOptions = {}; // this.zoomContainer = options.lensContainer;

      _this.zoomContainer = _this.instanceNode;
      _this.zoomClassName = 'smv-zoomed-in';
      _this.api = $J.extend(_this.api, {
        zoomIn: _this.zoomIn.bind(bHelpers.assertThisInitialized(_this)),
        zoomOut: _this.zoomOut.bind(bHelpers.assertThisInitialized(_this)),
        isZoomed: _this.isZoomed.bind(bHelpers.assertThisInitialized(_this)) // new

      });
      return _this;
    }

    var _proto = ZoomInstance.prototype;

    _proto.setDefaultZoomOptions = function setDefaultZoomOptions() {
      this.defaultZoomOptions = {
        test: false,
        upscale: this.upscale,
        smoothing: true
      };
    };

    _proto.createZoom = function createZoom(zoomNode, options) {
      if (!this.destroyed) {
        var zoomOptions = $J.extend({}, this.defaultZoomOptions);

        if (options) {
          zoomOptions = $J.extend(zoomOptions, options);
        }

        this.zoom = new ImageZoom(this.instanceNode, zoomOptions);
        this.zoom.setParent(this);
        return zoomOptions;
      }

      return null;
    };

    _proto.onZoomGetImage = function onZoomGetImage(e) {
      e.data.exactSize = true;
      e.data.maxSize = false;
      e.data.round = false;
      e.data.callbackData = {
        lens: true,
        indexX: e.data.indexX,
        indexY: e.data.indexY,
        level: e.data.level,
        number: e.data.number,
        map: e.data.map
      };
    };

    _proto.onZoomCancelLoadingOfTiles = function onZoomCancelLoadingOfTiles(e) {
      if (!e.data.callbackData) {
        e.data.callbackData = {};
      }

      e.data.callbackData.lens = true;
    };

    _proto.onZoomBeforeShow = function onZoomBeforeShow(e) {};

    _proto.onZoomShown = function onZoomShown(e) {};

    _proto.onZoomHidden = function onZoomHidden(e) {};

    _proto.setZoomEvents = function setZoomEvents() {
      var _this2 = this;

      if (!this.zoom) {
        return;
      }

      this.on('zoomGetImage', function (e) {
        e.stopAll();

        _this2.onZoomGetImage(e);
      });
      this.on('zoomCancelLoadingOfTiles', function (e) {
        e.stopAll();

        _this2.onZoomCancelLoadingOfTiles(e);
      });
      this.on('zoomBeforeShow', function (e) {
        e.stopAll();

        _this2.onZoomBeforeShow(e);
      });
      this.on('zoomShown', function (e) {
        e.stopAll();

        _this2.onZoomShown(e);
      });
      this.on('zoomHidden', function (e) {
        e.stopAll();

        _this2.onZoomHidden(e);
      });
    };

    _proto.zoomIn = function zoomIn() {
      if (this._isReady) {
        return true;
      }

      return false;
    };

    _proto.zoomOut = function zoomOut() {
      if (this._isReady) {
        return true;
      }

      return false;
    }
    /**
     * Current zoom level from 0.00 to 1.00
     * 0.00 - size of base image is equal size of zoom image
     * 1.00 - max zoom
     */
    ;

    _proto.getZoomData = function getZoomData() {
      if (this._isReady && this.zoom) {
        return this.zoom.getZoomData();
      }

      return 0;
    } // isZoomShown => isZoomed
    ;

    _proto.isZoomed = function isZoomed() {
      if (this._isReady && this.zoom) {
        return this.zoom.isShown() || this.zoom.isShowing();
      }

      return false;
    };

    _proto.isZoomSizeExist = function isZoomSizeExist() {
      return false;
    };

    _proto.clearZoom = function clearZoom() {
      if (this.zoom) {
        this.off('zoomGetImage');
        this.off('zoomCancelLoadingOfTiles');
        this.off('zoomBeforeShow');
        this.off('zoomShown');
        this.off('zoomHidden');
        this.zoom.destroy();
        this.zoom = null;
      }
    };

    _proto.destroy = function destroy() {
      this.clearZoom();

      _HotspotInstance.prototype.destroy.call(this);
    };

    return ZoomInstance;
  }(HotspotInstance);

  return ZoomInstance;
});
//# sourceMappingURL=zoominstance.js.map
