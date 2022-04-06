Sirv.define('Description', ['bHelpers', 'magicJS', 'globalFunctions', 'EventEmitter', 'helper'], function (bHelpers, magicJS, globalFunctions, EventEmitter, helper) {
  var moduleName = 'Description';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-sirv-container-description{display:inline-block;position:relative;width:100%;height:100%;padding:3px 8px;background:rgba(128,128,128,.9)!important;text-align:left;z-index:50;box-sizing:border-box;overflow-y:auto;overflow-x:hidden}.smv-sirv-container-description .smv-sirv-description{position:relative;color:#000!important;font-size:14px;line-height:1.4;opacity:.7;z-index:100}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* eslint-disable indent */

  /* eslint-disable no-lonely-if */

  /* eslint class-methods-use-this: ["off", { "createLink": ["error"] }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Description" }] */

  var CSS_CONTAINER_DESCRIPTION = 'smv-sirv-container-description';
  var CSS_DESCRIPTION = 'smv-sirv-description';

  var Description = /*#__PURE__*/function () {
    "use strict";

    function Description(options) {
      this.options = $J.extend({
        text: ''
      }, options || {});
      this.container = $J.$new('div');
      this.description = $J.$new('div');
      this.addEvents();
    }

    var _proto = Description.prototype;

    _proto.init = function init() {
      this.container.addClass(CSS_CONTAINER_DESCRIPTION);
      this.description.addClass(CSS_DESCRIPTION);
      this.description.node.innerHTML = this.createLink(this.options.text);
      this.container.append(this.description);
    };

    _proto.addEvents = function addEvents() {
      var _this = this;

      if ($J.browser.mobile) {
        this.handlerTouchDragEvent();
      } else {
        this.container.addEvent('mousescroll', function (e) {
          e.stop();
          var step = 20;
          _this.container.node.scrollTop += step * e.deltaY;
        });
      }
    };

    _proto.handlerTouchDragEvent = function handlerTouchDragEvent() {
      var _this2 = this;

      var isMove = false;
      var lastScrollTop = null;
      var lastXY = {
        x: null,
        y: null
      };

      var dragOn = function (e) {
        var state = e.state;
        e.stop();

        if (state === 'dragstart') {
          lastXY.y = e.y;
          isMove = true;
          lastScrollTop = _this2.container.node.scrollTop;
        } else if (state === 'dragmove') {
          if (isMove) {
            _this2.container.node.scrollTop = lastScrollTop - (e.y - lastXY.y);
          }
        } else if (state === 'dragend') {
          if (isMove) {
            isMove = false;
          }
        }
      };

      this.container.addEvent('touchdrag', dragOn);
    };

    _proto.getContainer = function getContainer() {
      return this.container;
    };

    _proto.createLink = function createLink(string) {
      var result = null;
      var pat = /\[a([^\]]+)\](.*?)\[\/a\]/ig;
      result = string.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(pat, '<a $1>$2</a>');
      return result;
    };

    _proto.destroy = function destroy() {
      this.container.removeEvent('mousescroll');

      if ($J.browser.mobile) {
        this.container.removeEvent('touchdrag');
      }

      this.options = null;
      this.text = null;
      this.container = null;
      this.description = null;
    };

    return Description;
  }();

  return Description;
});
//# sourceMappingURL=description.js.map
