Sirv.define('SpinHotspots', ['bHelpers', 'magicJS', 'globalFunctions', 'EventEmitter', 'Hotspots', 'helper', 'Promise!'], function (bHelpers, magicJS, globalFunctions, EventEmitter, Hotspots, helper, Promise) {
  var moduleName = 'SpinHotspots';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* global Hotspots, helper*/

  /* eslint-disable guard-for-in */

  /* eslint-disable no-restricted-syntax */

  /* eslint-disable no-loop-func */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SpinHotspots" }] */

  var SpinHotspots = /*#__PURE__*/function (_Hotspots) {
    "use strict";

    bHelpers.inheritsLoose(SpinHotspots, _Hotspots);

    function SpinHotspots() {
      var _this;

      _this = _Hotspots.call(this) || this;
      _this.options = {
        rows: 1,
        columns: 36,
        rowsRevers: false,
        columnsRevers: false,
        originImageSize: {}
      };
      _this.row = null;
      _this.col = null;
      _this.hotspotsSettings = [];
      return _this;
    }

    var _proto = SpinHotspots.prototype;

    _proto.setOptions = function setOptions(options) {
      this.options = $J.extend(this.options, options || {});
    };

    _proto.getFrameIndex = function getFrameIndex() {
      var result;

      if (this.options.rowsRevers && this.options.columnsRevers) {
        result = (this.options.rows - this.row - 1) * this.options.columns + (this.options.columns - this.col);
      } else if (this.options.rowsRevers) {
        result = (this.options.rows - this.row - 1) * this.options.columns + this.col + 1;
      } else if (this.options.columnsRevers) {
        result = this.row * this.options.columns + (this.options.columns - this.col);
      } else {
        result = this.row * this.options.columns + this.col + 1;
      }

      return result;
    };

    _proto.createHotspotsSettings = function createHotspotsSettings(dataSettings) {
      var _this2 = this;

      var firstFrame = true;

      var _loop = function (index, l) {
        var map = new Map();
        var settings = {};
        helper.objEach(dataSettings[index].frames, function (frame) {
          settings = dataSettings[index].frames[frame];
          settings.pointerPositionPercentage = {
            top: helper.isPercentage('' + dataSettings[index].frames[frame].pointer.y),
            left: helper.isPercentage('' + dataSettings[index].frames[frame].pointer.x)
          };
          helper.objEach(dataSettings[index], function (item) {
            if (item !== 'frames') {
              if (!(item === 'data' && !firstFrame)) {
                settings[item] = dataSettings[index][item];
                firstFrame = false;
              }
            }
          });
          map.set(parseInt(frame, 10), settings);
        });

        _this2.hotspotsSettings.push(map);

        firstFrame = true;
      };

      for (var index = 0, l = dataSettings.length; index < l; index++) {
        _loop(index, l);
      }
    };

    _proto.createHotspots = function createHotspots(hotspotsData) {
      if (!Array.isArray(hotspotsData)) {
        hotspotsData = [hotspotsData];
      }

      this.createHotspotsSettings(hotspotsData);
      var hotspotSettings = this.getStartHotspotSettings();

      _Hotspots.prototype.createHotspots.call(this, hotspotSettings);
    };

    _proto.addHotspot = function addHotspot(hotspotData) {
      if (!Array.isArray(hotspotData)) {
        hotspotData = [hotspotData];
      }

      this.createHotspotsSettings(hotspotData);
      var hotspotSettings = this.getStartHotspotSettings();

      _Hotspots.prototype.createHotspots.call(this, hotspotSettings.slice(hotspotSettings.length - hotspotData.length));

      this.updateAndShow();
    };

    _proto.getStartHotspotSettings = function getStartHotspotSettings() {
      var tempHotspotData = [];
      this.hotspotsSettings.forEach(function (map) {
        var startSettings = null;

        if ($J.browser.uaName === 'ie') {
          map.forEach(function (value) {
            if (!startSettings) {
              startSettings = value;
            }
          });
        } else if (map.entries().next().value) {
          startSettings = map.entries().next().value[1];
        }

        if (startSettings) {
          tempHotspotData.push(startSettings);
        }
      });
      return tempHotspotData;
    };

    _proto.setFramePosition = function setFramePosition(row, col) {
      this.row = row;
      this.col = col;
    };

    _proto.updateAndShow = function updateAndShow() {
      var _this3 = this;

      var frameIndex = this.getFrameIndex();
      this.hotspotsSettings.forEach(function (hotspotSettings, index) {
        var sett = hotspotSettings.get(frameIndex);
        var hs = _this3.hotspots[index];

        if (sett && hs.isEnabled()) {
          hs.setHotspotSettings(sett);

          if (hs.isHotspotShown()) {
            hs.setPointerPosition();

            _this3.showNeededElements();

            if (hs.isBoxAlwaysVisible()) {
              hs.setBaseBoxSize(hs.box.getSize());
              hs.setBoxPosition();
            }

            if (hs.isTooltipAlwaysVisible()) {
              hs.setTooltipPosition();
            }
          } else {
            _this3.show(index);
          }
        } else {
          _this3.hide(index);
        }
      });
    };

    _proto.hideNeededElements = function hideNeededElements(flag) {
      this.activeHotspots.forEach(function (hs) {
        if (!hs.isBoxAlwaysVisible()) {
          hs.hideBox(flag);
        }
      });
      this.hoveredHotspots.forEach(function (hs) {
        if (hs.isTooltipAlwaysVisible()) {
          hs.hideTooltip(flag);
        }
      });
    };

    _proto.changeHotspotsPosition = function changeHotspotsPosition(row, col) {
      if (this.row !== row || this.col !== col) {
        this.setFramePosition(row, col);
        this.updateAndShow();
      }
    };

    _proto.showAll = function showAll() {
      var _this4 = this;

      var position = this.getFrameIndex();
      this.hotspotsSettings.forEach(function (map, index) {
        if (map.get(position)) {
          _this4.show(index);
        }
      });
    };

    _proto.enable = function enable(index) {
      if (this.hotspotsSettings[index]) {
        var hs = this.hotspots[index];
        hs.enable();

        if (this.hotspotsSettings[index].get(this.getFrameIndex())) {
          hs.show();
        }
      }
    };

    _proto.setStateById = function setStateById(index, settings) {
      if (this.hotspots[index]) {
        this.hotspots[index].setState(settings, !this.hotspotsSettings[index].get(this.getFrameIndex()));
      }
    };

    _proto.removeHotspot = function removeHotspot(index) {
      if (this.hotspots[index]) {
        this.hotspotsSettings.splice(index, 1);

        _Hotspots.prototype.removeHotspot.call(this, index);
      }
    };

    _proto.destroy = function destroy() {
      _Hotspots.prototype.destroy.call(this);

      this.options = null;
      this.row = null;
      this.col = null;
      this.hotspotsSettings = null;
    };

    return SpinHotspots;
  }(Hotspots);

  return SpinHotspots;
});
//# sourceMappingURL=spinHotspots.js.map
