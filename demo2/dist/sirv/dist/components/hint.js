Sirv.define('Hint', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper) {
  var moduleName = 'Hint';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.sirv-hint{position:absolute;display:inline-block;top:50%;left:0;width:100%;transform:translate3d(0,-50%,1px);transition:opacity .3s linear;text-align:center;opacity:0;z-index:42;pointer-events:none;-webkit-font-smoothing:antialiased}.sirv-hint.show{opacity:1}.sirv-hint-message{position:relative;display:inline-block;padding:.35em 1.5em;border-radius:2px;background:rgba(55,58,60,.8);color:#fff;font:normal 16px/1.5 \'Lucida Grande\',\'Lucida Sans Unicode\',Verdana,\'Helvetica Neue\',Arial,Helvetica,sans-serif;text-decoration:none}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars

  var HintInstance = /*#__PURE__*/function () {
    "use strict";

    function HintInstance(parent, options) {
      this.parent = $(parent);
      this.options = $J.extend({
        html: 'hint',
        showClass: 'show',
        additionalClass: null,
        autohide: 3500
      }, options || {});
      this.instanceNode = $J.$new('div').addClass('sirv-hint');
      this.hintContainer = $J.$new('span').addClass('sirv-hint-message');
      this.inDoc = false;
      this.isShown = false;
      this.timer = null;
      this.instanceNode.addClass(this.options.additionalClass);
      this.hintContainer.node.innerHTML = this.options.html;
      this.instanceNode.append(this.hintContainer);
    }

    var _proto = HintInstance.prototype;

    _proto.getAutoHideTime = function getAutoHideTime() {
      return this.options.autohide;
    };

    _proto.getActionTime = function getActionTime() {
      var result = 0;
      var value = this.instanceNode.getCss('transition');

      try {
        value = value.split(' ')[1];
      } catch (e) {
        value = 0;
      }

      if (value) {
        value = value.trim();

        if (/m?s$/.test(value)) {
          if (/s$/.test(value)) {
            result = parseFloat(value);
            result *= 1000;
          } else {
            result = parseInt(value, 10);
          }
        }
      }

      return result;
    };

    _proto.getMovingTime = function getMovingTime() {
      return this.getAutoHideTime() + this.getActionTime();
    };

    _proto.append = function append() {
      if (!this.inDoc) {
        this.inDoc = true;
        this.parent.append(this.instanceNode);
      }
    };

    _proto.removeEvent = function removeEvent() {
      this.instanceNode.removeEvent('transitionend');
    };

    _proto.show = function show() {
      var _this = this;

      this.append();
      clearTimeout(this.timer);
      this.timer = null;
      this.instanceNode.getSize(); // render

      this.removeEvent();
      this.instanceNode.addClass(this.options.showClass);
      this.isShown = true;

      if (this.options.autohide) {
        this.timer = setTimeout(function () {
          _this.hide();
        }, this.options.autohide);
      }
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this.inDoc) {
        this.removeEvent();
        clearTimeout(this.timer);
        this.timer = null;
        this.instanceNode.addEvent('transitionend', function (e) {
          e.stop();

          _this2.removeEvent();

          _this2.inDoc = false;

          _this2.instanceNode.remove();
        });
        this.instanceNode.removeClass(this.options.showClass);
        this.isShown = false;
      }
    };

    _proto.destroy = function destroy() {
      this.instanceNode.setCssProp('transitionend', 'none');
      this.hide();
      this.removeEvent();
      this.hintContainer.remove();
      this.hintContainer.node.innerHTML = '';
      this.instanceNode.remove();
      this.inDoc = false;
    };

    return HintInstance;
  }();

  return HintInstance;
});
//# sourceMappingURL=hint.js.map
