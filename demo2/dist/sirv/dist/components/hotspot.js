Sirv.define('Hotspot', ['bHelpers', 'globalFunctions', 'magicJS', 'EventEmitter', 'helper', 'Promise!'], function (bHelpers, globalFunctions, magicJS, EventEmitter, helper, Promise) {
  var moduleName = 'Hotspot';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '@charset "UTF-8";.sirv-hotspot-pointer{display:inline-block;position:absolute;width:20px;height:20px;transform:translate(-50%,-50%);background-repeat:no-repeat;cursor:pointer;z-index:11;pointer-events:auto}.sirv-hotspot-pointer.pulsating-point{background-image:none}.sirv-hotspot-pointer.pulsating-point::after,.sirv-hotspot-pointer.pulsating-point::before{display:inline-block;position:absolute;top:0;left:0;width:100%;height:100%;transform-origin:50% 50%;border-radius:100%;content:\'\'}.sirv-hotspot-pointer.pulsating-point::before{transition:opacity .2s ease-in,transform .1s ease-out;background-color:#ff0;opacity:.6;overflow:hidden}.sirv-hotspot-pointer.pulsating-point::after{border:1px solid #ff0;opacity:0;box-sizing:border-box;-webkit-animation:pulsating-point-pulsate 3s ease-out infinite;animation:pulsating-point-pulsate 3s ease-out infinite;pointer-events:none}.sirv-hotspot-pointer.pulsating-point:hover::before{cursor:pointer;opacity:.8}.sirv-hotspot-pointer.pulsating-point:active::before{transform:scale(.875)}.sirv-hotspot-pointer.pulsating-point:hover::after{-webkit-animation:none;animation:none}.sirv-hotspot-pointer.pulsating-point:active::after{-webkit-animation:pulsating-point-stop-pulsate .3s;animation:pulsating-point-stop-pulsate .3s}@-webkit-keyframes pulsating-point-pulsate{0%{transform:scale(1);opacity:.8}45%{transform:scale(1.75);opacity:0}}@keyframes pulsating-point-pulsate{0%{transform:scale(1);opacity:.8}45%{transform:scale(1.75);opacity:0}}@-webkit-keyframes pulsating-point-stop-pulsate{from{opacity:.4}to{transform:scale(2);opacity:0}}@keyframes pulsating-point-stop-pulsate{from{opacity:.4}to{transform:scale(2);opacity:0}}.sirv-hotspot-tooltip{display:block;position:absolute;padding:8px 24px;transition:opacity .15s linear 0s;border:1px solid #efefef;border-radius:4px;background-color:#fff;font:normal 12px/1.42857 \'Lucida Grande\',\'Lucida Sans Unicode\',Verdana,\'Helvetica Neue\',Arial,Helvetica,sans-serif;border-collapse:separate;box-shadow:0 5px 10px 2px rgba(0,0,0,.1);opacity:0;z-index:9999999999;pointer-events:none;-webkit-font-smoothing:antialiased}.sirv-hotspot-tooltip--default{margin-top:-8px;padding:6px 9px;transform:translate(-50%,-100%);border:0;background-color:rgba(49,51,61,.76);color:#eee}.sirv-hotspot-tooltip--default::after{position:absolute;top:100%;left:50%;width:0;height:0;transform:translateX(-50%);border-width:8px 8px 0;border-style:solid;border-color:rgba(49,51,61,.76) transparent transparent;content:\'\'}.sirv-hotspot-tooltip--balloon{margin-top:-40px;transform:translate(-40px,-100%)}.sirv-hotspot-tooltip--balloon::after{position:absolute;top:100%;left:24px;width:0;height:0;border-width:0 15px 40px 0;border-style:solid;border-color:transparent #fff transparent transparent;content:\'\'}.sirv-hotspot-tooltip.sirv-hotspot-tooltip-visible{transition-delay:.1s;opacity:1}.sirv-hotspot-box{display:flex;position:fixed;max-width:100vw;max-height:100vh;padding:10px;transition:opacity .15s linear 0s;z-index:9999999999;box-sizing:border-box}.sirv-hotspot-box.sirv-hotspot-box-out-of-width{right:0!important;left:0!important}.sirv-hotspot-box.sirv-hotspot-box-out-of-height{top:0!important;bottom:0!important}.sirv-hotspot-box .sirv-hotspot-box-wrapper{display:flex;position:relative;max-width:inherit;max-height:inherit;padding:22px;border:1px solid #efefef;border-radius:4px;background:#fff;font-size:16px!important;line-height:100%;text-align:left;border-collapse:separate;box-shadow:0 5px 10px 2px rgba(0,0,0,.1);overflow:hidden;box-sizing:border-box}.sirv-hotspot-box .sirv-hotspot-box-content{top:0;left:0;width:100%;max-width:inherit;height:calc(100% + 2px);max-height:inherit;overflow:auto}.sirv-hotspot-box .sirv-hotspot-close-button{position:absolute;top:2px;right:2px;width:24px;height:24px;color:#888;font:normal 22px/1 Arial,monospace;text-align:center;cursor:pointer;speak:none;-webkit-font-smoothing:antialiased}.sirv-hotspot-box .sirv-hotspot-close-button::before{display:inline;position:static;color:inherit!important;font:inherit!important;content:\'×\';vertical-align:middle;-webkit-font-smoothing:inherit!important}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global EventEmitter */

  /* global helper */

  /* eslint-disable no-restricted-syntax */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Hotspot" }] */

  var CSS_HOTSPOT_POINTER = 'sirv-hotspot-pointer';
  var CSS_HOTSPOT_POINTER_BACKWARD_COMPATIBILITY = 'hotspot-pointer';
  var CSS_HOTSPOT_TOOLTIP = 'sirv-hotspot-tooltip';
  var CSS_HOTSPOT_DEFAULT = 'pulsating-point';
  var CSS_HOTSPOT_BOX = 'sirv-hotspot-box';
  var CSS_HOTSPOT_WRAPPER = 'sirv-hotspot-box-wrapper';
  var CSS_HOTSPOT_BUTTON_CLOSE = 'sirv-hotspot-close-button';
  var CSS_HOTSPOT_CONTENT = 'sirv-hotspot-box-content';
  var CSS_HOTSPOT_BOX_OUT_OF_WIDTH = 'sirv-hotspot-box-out-of-width';
  var CSS_HOTSPOT_BOX_OUT_OF_HEIGHT = 'sirv-hotspot-box-out-of-height';
  var OVERWRITE_POINTER_EVENT = 'sirv-hotspot-overwrite-pointer-event';
  var STATES = {
    AUTO: 0,
    VISIBLE: 1
  };

  var Hotspot = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(Hotspot, _EventEmitter);

    function Hotspot(container, hotspotData, index) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.container = container;
      _this.hotspotData = hotspotData;
      _this.id = index;
      _this.box = null;
      _this.boxContainer = $J.D.node.body;
      _this.baseBoxSize = null;
      _this.tooltip = null;
      _this.version = 1;
      _this.pointer = null;
      _this.hotspotSettings = {};
      _this.dX = 1;
      _this.dY = 1;
      _this.isActive = false;
      _this.isDisabled = false;
      _this.isPointerInDoc = false;
      _this.isHovered = false;
      _this.isShown = false;
      _this.isBoxContent = false;
      _this.tooltipState = STATES.AUTO;
      _this.boxState = STATES.AUTO;

      _this.init();

      return _this;
    }

    var _proto = Hotspot.prototype;

    _proto.isTooltipHovered = function isTooltipHovered() {
      return this.isHovered;
    };

    _proto.isBoxActivated = function isBoxActivated() {
      return this.isActive;
    };

    _proto.isBoxAlwaysVisible = function isBoxAlwaysVisible() {
      return this.boxState === STATES.VISIBLE;
    };

    _proto.isTooltipAlwaysVisible = function isTooltipAlwaysVisible() {
      return this.tooltipState === STATES.VISIBLE;
    };

    _proto.init = function init() {
      this.setVersion();
      this.parseHotspotData();
      this.createBlocks();
      this.setEvents();
      this.createBox();
    };

    _proto.setVersion = function setVersion() {
      if (this.hotspotData.style || this.hotspotData.tooltip || this.hotspotData.box && this.hotspotData.box.content) {
        this.version = 2;
      }
    };

    _proto.parseHotspotData = function parseHotspotData() {
      var _this2 = this;

      helper.objEach(this.hotspotData, function (key) {
        _this2.hotspotSettings[key] = _this2.hotspotData[key];
      });
      this.hotspotSettings.pointerPositionPercentage = {
        top: helper.isPercentage('' + this.hotspotSettings.pointer.y),
        left: helper.isPercentage('' + this.hotspotSettings.pointer.x)
      };
    };

    _proto.createBlocks = function createBlocks() {
      this.pointer = $J.$new('div').addClass(CSS_HOTSPOT_POINTER).attr('data-spot-id', this.id);
      this.pointer.addClass(CSS_HOTSPOT_POINTER_BACKWARD_COMPATIBILITY);

      if (this.version > 1 && this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content) {
        this.tooltip = $J.$new('div').addClass(CSS_HOTSPOT_TOOLTIP).changeContent(this.hotspotSettings.tooltip.content);

        if (this.hotspotSettings.tooltip.style) {
          this.tooltip.addClass(CSS_HOTSPOT_TOOLTIP + '--' + this.hotspotSettings.tooltip.style);
        }
      }
    };

    _proto.setTooltipPosition = function setTooltipPosition() {
      if (this.tooltip) {
        var pointerXY = this.pointer.getRect();
        var cssTooltip = {
          top: 0,
          left: 0
        };
        cssTooltip.top = this.hotspotSettings.tooltip.style ? pointerXY.top : pointerXY.bottom;
        cssTooltip.left = this.hotspotSettings.tooltip.style ? (pointerXY.left + pointerXY.right) / 2 : pointerXY.right;

        if ($J.$(this.boxContainer).getTagName() !== 'body') {
          pointerXY = this.pointer.node.getBoundingClientRect();
          cssTooltip.top = this.hotspotSettings.tooltip.style ? pointerXY.top - this.container.node.getBoundingClientRect().top : pointerXY.bottom - this.container.node.getBoundingClientRect().top;
          cssTooltip.left = this.hotspotSettings.tooltip.style ? pointerXY.left - this.container.node.getBoundingClientRect().left + pointerXY.width / 2 : pointerXY.left - this.container.node.getBoundingClientRect().left + pointerXY.width;
        }

        this.tooltip.setCss(cssTooltip);
      }
    };

    _proto.showTooltip = function showTooltip() {
      if (!this.isHovered && !this.isDisabled) {
        if (this.tooltip) {
          this.setTooltipPosition();
          this.tooltip.appendTo(this.boxContainer).addClass(CSS_HOTSPOT_TOOLTIP + '-visible');
          this.isHovered = true;
          this.emit('hotspotHovered', {
            data: {
              hotspot: this
            }
          });
        }
      }
    };

    _proto.setEvents = function setEvents() {
      var _this3 = this;

      this.pointer.addEvent('click mousedown', function (e) {
        e.stop();
      });
      this.pointer.addEvent('btnclick tap', function (e) {
        if (e.getButton() === 3) {
          return true;
        }

        if (_this3.hotspotSettings.link) {
          $J.W.node.open(_this3.hotspotSettings.link);
          e.stop();
        } else if (_this3.isBoxContent) {
          e.stop();

          _this3.showBox();
        }

        return false;
      });

      if ($J.browser.uaName === 'edge' || $J.browser.ieMode) {
        this.pointer.addEvent('mousedown', function (e) {
          e.stopDistribution();
        });
      }

      if (this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content) {
        this.pointer.addEvent('mouseenter', function (e) {
          _this3.showTooltip();
        });
        this.pointer.addEvent('mouseleave', function () {
          if (_this3.tooltipState !== STATES.VISIBLE) {
            _this3.hideTooltip();

            _this3.isHovered = false;

            _this3.emit('hotspotLeft', {
              data: {
                hotspot: _this3
              }
            });
          }
        });
      }

      var resizeTimer;
      $($J.W).addEvent('resize', function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (_this3.isActive) {
            var hotspotInfo = _this3.hotspotSettings;

            if (hotspotInfo) {
              _this3.box.setCss(_this3.correctBoxPosition(_this3.getBoxPosition(hotspotInfo)));
            }
          }
        }, 42);
      });
    };

    _proto.createBox = function createBox() {
      var _this4 = this;

      var boxContent = null;

      if (this.version > 1 && this.hotspotSettings.box && this.hotspotSettings.box.content) {
        boxContent = this.hotspotSettings.box.content;
      } else if (this.hotspotSettings.data) {
        boxContent = this.hotspotSettings.data;
      }

      this.box = $J.$new('div').addClass(CSS_HOTSPOT_BOX);

      if (boxContent) {
        this.isBoxContent = true;
        var wrapper = $J.$new('div').addClass(CSS_HOTSPOT_WRAPPER).append($J.$new('div').addEvent('btnclick tap', function (e) {
          if (_this4.boxState !== STATES.VISIBLE) {
            e.stop();

            _this4.hideBox(true);
          }
        }).addClass(CSS_HOTSPOT_BUTTON_CLOSE));
        var content = $J.$new('div').addClass(CSS_HOTSPOT_CONTENT).changeContent(boxContent + '').addEvent('click', function (e) {
          e.stopDistribution();
        });
        wrapper.append(content);
        this.box.append(wrapper);
      }

      this.box.setCss({
        top: '-10000px',
        left: '-10000px',
        position: 'absolute',
        opacity: 0
      });
    };

    _proto.getBoxPosition = function getBoxPosition(hotspotInfo) {
      var result = {
        top: 0,
        left: 0,
        transform: ''
      };

      if (hotspotInfo && hotspotInfo.box) {
        var boxX = hotspotInfo.box.x;
        var boxY = hotspotInfo.box.y;

        if (this.hotspotSettings.box.fixed) {
          var boxBoundaries = this.container.getRect();
          result.position = 'absolute';

          if ($J.$(this.boxContainer).getTagName() !== 'body') {
            switch (boxY) {
              case 'top':
                result.top = 0;
                break;

              case 'bottom':
                result.top = boxBoundaries.bottom - boxBoundaries.top;
                result.transform += ' translateY(-100%)';
                break;

              case 'center':
                result.top = (0 + (boxBoundaries.bottom - boxBoundaries.top)) / 2;
                result.transform += ' translateY(-50%)';
                break;

              default:
                result.top = 0 + (parseFloat(boxY) || 0);
            }

            switch (boxX) {
              case 'left':
                result.left = 0;
                break;

              case 'right':
                result.left = boxBoundaries.right - boxBoundaries.left;
                result.transform += ' translateX(-100%)';
                break;

              case 'center':
                result.left = (boxBoundaries.right - boxBoundaries.left) / 2;
                result.transform += ' translateX(-50%)';
                break;

              default:
                result.left = boxBoundaries.left + (parseFloat(boxX) || 0);
            }
          } else {
            switch (boxY) {
              case 'top':
                result.top = boxBoundaries.top;
                break;

              case 'bottom':
                result.top = boxBoundaries.bottom;
                result.transform += ' translateY(-100%)';
                break;

              case 'center':
                result.top = (boxBoundaries.top + boxBoundaries.bottom) / 2;
                result.transform += ' translateY(-50%)';
                break;

              default:
                result.top = boxBoundaries.top + (parseFloat(boxY) || 0);
            }

            switch (boxX) {
              case 'left':
                result.left = boxBoundaries.left;
                break;

              case 'right':
                result.left = boxBoundaries.right;
                result.transform += ' translateX(-100%)';
                break;

              case 'center':
                result.left = (boxBoundaries.left + boxBoundaries.right) / 2;
                result.transform += ' translateX(-50%)';
                break;

              default:
                result.left = boxBoundaries.left + (parseFloat(boxX) || 0);
            }
          }
        } else {
          var pointerXY = this.pointer.getPosition();
          var scroll = $J.W.getScroll();
          result.left = pointerXY.left - scroll.x + (parseFloat(boxX) || 0);
          result.top = pointerXY.top - scroll.y + (parseFloat(boxY) || 0);
        }
      }

      return result;
    };

    _proto.correctBoxPosition = function correctBoxPosition(position) {
      if (this.hotspotSettings.box && !this.hotspotSettings.box.fixed) {
        this.box.removeClass(CSS_HOTSPOT_BOX_OUT_OF_WIDTH);
        this.box.removeClass(CSS_HOTSPOT_BOX_OUT_OF_HEIGHT);
        var wSize = $J.W.getSize();

        if (this.baseBoxSize.width > wSize.width) {
          this.box.addClass(CSS_HOTSPOT_BOX_OUT_OF_WIDTH);
        } else if (position.left + this.baseBoxSize.width > wSize.width) {
          position.left = wSize.width - this.baseBoxSize.width;
        }

        if (this.baseBoxSize.height > wSize.height) {
          this.box.addClass(CSS_HOTSPOT_BOX_OUT_OF_HEIGHT);
        } else if (position.top + this.baseBoxSize.height > wSize.height) {
          position.top = wSize.height - this.baseBoxSize.height;
        }
      }

      return position;
    };

    _proto.setBoxPosition = function setBoxPosition() {
      var boxCss = {
        transform: ''
      };
      boxCss = this.correctBoxPosition(this.getBoxPosition(this.hotspotSettings));
      this.box.setCssProp('position', '');
      this.box.setCss(boxCss).getSize();
    };

    _proto.showBox = function showBox() {
      if (this.isActive || this.isDisabled) {
        return;
      }

      if (this.tooltip && this.tooltipState === STATES.AUTO) {
        this.tooltip.removeClass(CSS_HOTSPOT_TOOLTIP + '-visible');
      }

      this.box.setCss({
        opacity: 0
      });
      this.box.appendTo(this.boxContainer);
      this.setBaseBoxSize(this.box.getSize());
      this.setBoxPosition();
      this.box.setCss({
        opacity: 1
      });
      this.isActive = true;
      this.emit('hotspotActivate', {
        data: {
          hotspot: this
        }
      });
    };

    _proto.hideBox = function hideBox(fade) {
      var _this5 = this;

      if (this.isActive) {
        if (fade) {
          if (this.box) {
            this.box.setCssProp('opacity', 0);
          }

          setTimeout(function () {
            _this5.hideBox();
          }, 300);
          return this.id;
        }

        if (this.box) {
          this.box.remove();
        }

        this.isActive = false;
        this.emit('hotspotDeactivate', {
          data: {
            hotspot: this
          }
        });
      }

      return this.id;
    };

    _proto.changeBoxContainer = function changeBoxContainer(container) {
      this.boxContainer = container != null ? container : $J.D.node.body;
    };

    _proto.setBaseBoxSize = function setBaseBoxSize(size, force) {
      if (size && force || !this.baseBoxSize) {
        this.baseBoxSize = {
          width: size.width,
          height: size.height
        };
      }
    };

    _proto.setHotspotSettings = function setHotspotSettings(settings) {
      for (var item in settings) {
        if ({}.hasOwnProperty.call(settings, item)) {
          this.hotspotSettings[item] = settings[item];
        }
      }
    };

    _proto.getHotspotSettings = function getHotspotSettings(settings) {
      return this.hotspotSettings;
    };

    _proto.setAspectRatio = function setAspectRatio(x, y) {
      this.dX = x;
      this.dY = y;
    };

    _proto.setPointerPosition = function setPointerPosition() {
      var hss = this.hotspotSettings;

      if (hss) {
        this.pointer.setCss({
          top: hss.pointerPositionPercentage.top ? hss.pointer.y : Math.ceil(hss.pointer.y * this.dY),
          left: hss.pointerPositionPercentage.left ? hss.pointer.x : Math.ceil(hss.pointer.x * this.dX)
        });
      }
    };

    _proto.showPointer = function showPointer() {
      if (this.hotspotSettings && !this.isDisabled) {
        this.pointer.addClass(CSS_HOTSPOT_DEFAULT);
        this.setPointerPosition();

        if (this.hotspotSettings.style || this.hotspotSettings.pointer.style) {
          var dataStyle = this.hotspotSettings.style;

          if (!dataStyle) {
            dataStyle = this.hotspotSettings.pointer.style;
          }

          this.pointer.addClass(dataStyle);
        }

        if (!this.isPointerInDoc) {
          this.isPointerInDoc = true;
          this.pointer.appendTo(this.container);
        }
      } else {
        this.hidePointer();
      }
    };

    _proto.hidePointer = function hidePointer() {
      if (this.isPointerInDoc) {
        this.isPointerInDoc = false;
        this.pointer.remove();
      }
    };

    _proto.isHotspotShown = function isHotspotShown() {
      return this.isShown;
    };

    _proto.show = function show() {
      if (!this.isDisabled && !this.isShown) {
        this.isShown = true;
        this.showPointer();

        if (this.boxState === STATES.SHOW) {
          this.showBox();
        }

        if (this.tooltipState === STATES.SHOW) {
          this.showTooltip();
        }
      }
    };

    _proto.hide = function hide() {
      if (this.isShown) {
        this.isShown = false;
        this.hideBox();
        this.hideTooltip();
        this.hidePointer();
      }
    };

    _proto.isEnabled = function isEnabled() {
      return !this.isDisabled;
    };

    _proto.enable = function enable() {
      if (this.isDisabled) {
        this.isDisabled = false; // this.show();
      }
    };

    _proto.disable = function disable() {
      if (!this.isDisabled) {
        this.isDisabled = true;
        this.hide();
      }
    };

    _proto.hideTooltip = function hideTooltip() {
      if (this.isHovered) {
        this.isHovered = false;

        if (this.tooltip) {
          this.tooltip.removeClass(CSS_HOTSPOT_TOOLTIP + '-visible');
        }
      }
    };

    _proto.overridePointerEvent = function overridePointerEvent() {
      if (!this.isBoxAlwaysVisible() && !this.isTooltipAlwaysVisible()) {
        this.container.addClass(OVERWRITE_POINTER_EVENT);
      }
    };

    _proto.removeOverridePointerEvent = function removeOverridePointerEvent() {
      this.container.removeClass(OVERWRITE_POINTER_EVENT);
    };

    _proto.getId = function getId() {
      return this.id;
    };

    _proto.setId = function setId(id) {
      this.id = id;
    };

    _proto.setState = function setState(settings, dontShow) {
      // For popup, tooltip, pointer - 1 - 'visible' | 0 - 'initial'
      if (this.boxState !== settings.popup) {
        this.boxState = settings.popup;

        if (settings.popup === STATES.VISIBLE) {
          if (!dontShow) {
            this.showBox();
          }
        } else {
          this.hideBox();
        }
      }

      if (this.tooltipState !== settings.tooltip) {
        this.tooltipState = settings.tooltip;

        if (settings.tooltip === STATES.VISIBLE) {
          if (!dontShow) {
            this.showTooltip();
          }
        } else {
          this.hideTooltip();
        }
      }
    };

    _proto.rewriteAttrPointer = function rewriteAttrPointer(attr) {
      var attribute = attr || this.id;
      this.pointer.attr('data-spot-id', attribute);
    };

    _proto.getHotspotPointer = function getHotspotPointer() {
      return this.pointer;
    };

    _proto.destroy = function destroy() {
      this.hideBox();
      this.hideTooltip();
      this.hotspotData = null;
      this.container = null;
      this.id = null;
      this.pointer.clearEvents();

      if (this.tooltip) {
        this.tooltip.clearEvents();
      }

      this.pointer.remove();
      this.box = null;
      this.boxContainer = null;
      this.baseBoxSize = null;
      this.tooltip = null;
      this.version = null;
      this.pointer = null;
      this.hotspotSettings = null;
      this.isActive = false;
      this.isDisabled = false;
      this.isPointerInDoc = false;
      this.isHovered = false;

      _EventEmitter.prototype.destroy.call(this);
    };

    return Hotspot;
  }(EventEmitter);

  return Hotspot;
});
//# sourceMappingURL=hotspot.js.map
