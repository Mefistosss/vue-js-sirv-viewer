Sirv.define('Hotspots', ['bHelpers', 'magicJS', 'globalFunctions', 'EventEmitter', 'Hotspot', 'helper', 'Promise!'], function (bHelpers, magicJS, globalFunctions, EventEmitter, Hotspot, helper, Promise) {
  var moduleName = 'Hotspots';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* global Hotspot */

  /* global EventEmitter */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Hotspots" }] */

  var Hotspots = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(Hotspots, _EventEmitter);

    function Hotspots() {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.container = $J.$new('div').addClass('sirv-hotspot-container');
      _this.hotspots = [];
      _this.activeHotspots = [];
      _this.hoveredHotspots = [];
      _this.originImageSize = {
        width: 0,
        height: 0
      };
      _this.instanceComponentNode = null;
      _this.api = {
        add: _this.addHotspot.bind(bHelpers.assertThisInitialized(_this)),
        remove: _this.removeHotspot.bind(bHelpers.assertThisInitialized(_this)),
        removeAll: _this.removeAllHotspots.bind(bHelpers.assertThisInitialized(_this)),
        list: _this.getPointerNodeHotspots.bind(bHelpers.assertThisInitialized(_this)),
        setVisibility: _this.setStateById.bind(bHelpers.assertThisInitialized(_this)),
        enable: _this.enable.bind(bHelpers.assertThisInitialized(_this)),
        disable: _this.disable.bind(bHelpers.assertThisInitialized(_this))
      };

      _this.setEvents();

      return _this;
    }

    var _proto = Hotspots.prototype;

    _proto.setOriginImageSize = function setOriginImageSize(width, height) {
      this.originImageSize = {
        width: width,
        height: height
      };
    };

    _proto.appendTo = function appendTo(container) {
      this.container.appendTo(container);
    };

    _proto.setInstanceComponentNode = function setInstanceComponentNode(instance) {
      this.instanceComponentNode = instance;
    };

    _proto.setContainerSize = function setContainerSize(instNodeBoundingClientRect) {
      if (!this.hotspots.length || !instNodeBoundingClientRect) {
        return;
      }

      var componentSize = this.getRightBoundengClientRect();
      this.container.setCss({
        top: instNodeBoundingClientRect.top - componentSize.top,
        left: instNodeBoundingClientRect.left - componentSize.left,
        width: instNodeBoundingClientRect.width * 100 / componentSize.width + '%',
        height: instNodeBoundingClientRect.height * 100 / componentSize.height + '%'
      });
      var size = this.container.getSize();
      var dx = size.width / this.originImageSize.width;
      var dy = size.height / this.originImageSize.height;
      this.hotspots.forEach(function (hs) {
        return hs.setAspectRatio(dx, dy);
      });
    };

    _proto.getActiveHotspot = function getActiveHotspot(id) {
      return this.activeHotspots.filter(function (hs) {
        return hs.id === id;
      })[0] || null;
    };

    _proto.getHoveredHotspots = function getHoveredHotspots(id) {
      return this.hoveredHotspots.filter(function (hs) {
        return hs.id === id;
      })[0] || null;
    };

    _proto.setEvents = function setEvents() {
      var _this2 = this;

      this.on('hotspotActivate', function (e) {
        var activeHotspot = _this2.getActiveHotspot(e.data.hotspot.id);

        if (!activeHotspot) {
          e.stopEmptyEvent();

          _this2.activeHotspots.forEach(function (hs) {
            if (!hs.isBoxAlwaysVisible()) {
              hs.hideBox(true);
            }
          });

          _this2.activeHotspots.push(e.data.hotspot);

          _this2.activeHotspots[_this2.activeHotspots.length - 1].overridePointerEvent();

          e.data.id = e.data.hotspot.id;
          delete e.data.hotspot;
        }
      });
      this.on('hotspotDeactivate', function (e) {
        e.stopEmptyEvent();

        var activeHotspot = _this2.getActiveHotspot(e.data.hotspot.id);

        if (activeHotspot) {
          activeHotspot.removeOverridePointerEvent();
          _this2.activeHotspots = _this2.activeHotspots.filter(function (hs) {
            return hs.id !== activeHotspot.id;
          });
        }

        e.data.id = e.data.hotspot.id;
        delete e.data.hotspot;
      });
      this.on('hotspotHovered', function (e) {
        var hoveredHotspot = _this2.getHoveredHotspots(e.data.hotspot.id);

        if (!hoveredHotspot) {
          e.stopAll();

          _this2.hoveredHotspots.push(e.data.hotspot);
        }
      });
      this.on('hotspotLeft', function (e) {
        e.stopAll();

        var hoveredHotspot = _this2.getHoveredHotspots(e.data.hotspot.id);

        if (hoveredHotspot) {
          _this2.hoveredHotspots = _this2.hoveredHotspots.filter(function (hs) {
            return hs.id !== hoveredHotspot.id;
          });
        }
      });

      this.clickFn = function (e) {
        _this2.activeHotspots.forEach(function (hs) {
          if (!hs.isBoxAlwaysVisible()) {
            hs.hideBox(true);
          }
        });

        _this2.hoveredHotspots.forEach(function (hs) {
          if (!hs.isTooltipAlwaysVisible()) {
            hs.hideTooltip(true);
          }
        });
      };

      $($J.D).addEvent('click', this.clickFn);
    };

    _proto.isHotspotActivated = function isHotspotActivated() {
      return this.activeHotspots.length > 0;
    };

    _proto.createHotspots = function createHotspots(hotspotsData) {
      var _this3 = this;

      if (hotspotsData && hotspotsData.length) {
        hotspotsData.forEach(function (data) {
          _this3.createHotspot(data, _this3.hotspots.length);
        });
      }
    };

    _proto.createHotspot = function createHotspot(hotspotData, index) {
      var hotspot = new Hotspot(this.container, hotspotData, index);
      hotspot.setParent(this);
      this.hotspots.push(hotspot);
    };

    _proto.addHotspot = function addHotspot(hotspotsData) {
      if (!Array.isArray(hotspotsData)) {
        hotspotsData = [hotspotsData];
      }

      this.createHotspots(hotspotsData, this.hotspots.length);
    };

    _proto.getRightBoundengClientRect = function getRightBoundengClientRect(hotspotsContainer) {
      if (!this.hotspots.length) {
        return this.instanceComponentNode ? this.instanceComponentNode.node.getBoundingClientRect() : hotspotsContainer.node.getBoundingClientRect();
      }

      return this.container.node.parentNode.getBoundingClientRect();
    };

    _proto.changeBoxContainerParent = function changeBoxContainerParent(inside) {
      var c = inside ? this.container : null;
      this.hotspots.forEach(function (hotspot) {
        hotspot.changeBoxContainer(c);
      });
    };

    _proto.hideActiveHotspotBox = function hideActiveHotspotBox(flag) {
      var result = this.activeHotspots.length || this.hoveredHotspots.length;
      this.activeHotspots.forEach(function (hs) {
        hs.hideBox(flag);
      });
      this.hoveredHotspots.forEach(function (hs) {
        hs.hideTooltip();
      });
      return result;
    };

    _proto.show = function show(index) {
      var hs = this.hotspots[index];

      if (hs) {
        hs.show();
      }
    };

    _proto.showAll = function showAll() {
      this.hotspots.forEach(function (hotspot) {
        hotspot.show();
      });
    };

    _proto.hide = function hide(index) {
      var hs = this.hotspots[index];

      if (hs) {
        hs.hide();
      }
    };

    _proto.hideAll = function hideAll() {
      this.hotspots.forEach(function (hotspot) {
        hotspot.hide();
      });
    };

    _proto.enable = function enable(index) {
      var hs = this.hotspots[index];

      if (hs) {
        hs.enable();
        hs.show();
      }
    };

    _proto.disable = function disable(index) {
      if (this.hotspots[index]) {
        this.hotspots[index].disable();
      }
    };

    _proto.enableAll = function enableAll() {
      this.hotspots.forEach(function (hotspot) {
        hotspot.enable();
        hotspot.show();
      });
    };

    _proto.disableAll = function disableAll() {
      this.hotspots.forEach(function (hotspot) {
        hotspot.disable();
      });
    };

    _proto.showNeededElements = function showNeededElements() {
      this.hotspots.forEach(function (hs) {
        if (hs.isEnabled() && hs.isHotspotShown()) {
          if (hs.isBoxAlwaysVisible()) {
            if (hs.isBoxActivated()) {
              hs.setBoxPosition();
            }

            hs.showBox();
          }

          if (hs.isTooltipAlwaysVisible()) {
            if (hs.isTooltipHovered()) {
              hs.setTooltipPosition();
            }

            hs.showTooltip();
          }
        }
      });
    };

    _proto.getHotspots = function getHotspots() {
      return this.hotspots;
    };

    _proto.getPointerNodeHotspots = function getPointerNodeHotspots() {
      var pointers = [];
      this.hotspots.forEach(function (hotspot) {
        pointers.push(hotspot.getHotspotPointer());
      });
      return pointers;
    };

    _proto.removeHotspot = function removeHotspot(index) {
      var hs = this.hotspots[index];

      if (hs) {
        hs.disable();
        hs.destroy();
        this.removeByIndex(index);

        if (!this.hotspots.length) {
          this.container.remove();
        }
      }
    };

    _proto.removeAllHotspots = function removeAllHotspots() {
      for (var i = this.hotspots.length - 1; i >= 0; i--) {
        this.removeHotspot(i);
      }
    };

    _proto.removeByIndex = function removeByIndex(index) {
      this.hotspots.splice(index, 1);

      if (this.hotspots.length > 0 && index === 0 || index > 0 && index <= this.hotspots.length - 1) {
        this.rewriteHotspotIndex(index);
      }
    };

    _proto.rewriteHotspotIndex = function rewriteHotspotIndex(startIndex) {
      for (var index = startIndex, l = this.hotspots.length; index < l; index++) {
        this.hotspots[index].setId(index);
        this.hotspots[index].rewriteAttrPointer();
      }
    };

    _proto.setStateById = function setStateById(index, settings) {
      if (this.hotspots[index]) {
        this.hotspots[index].setState(settings);
      }
    };

    _proto.destroy = function destroy() {
      $($J.D).removeEvent('click', this.clickFn);
      this.hotspots.forEach(function (hotspot) {
        hotspot.destroy();
      });
      this.container = null;
      this.activeHotspots = [];
      this.hoveredHotspots = [];
      this.instanceComponentNode = null;
      this.off('hotspotActivate');
      this.off('hotspotDeactivate');
      this.off('hotspotHovered');
      this.off('hotspotLeft');
      this.hotspots = null;

      _EventEmitter.prototype.destroy.call(this);
    };

    return Hotspots;
  }(EventEmitter);

  return Hotspots;
});
//# sourceMappingURL=hotspots.js.map
