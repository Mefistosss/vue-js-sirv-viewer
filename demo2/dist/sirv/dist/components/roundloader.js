Sirv.define('RoundLoader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Loader'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, Loader) {
  var moduleName = 'RoundLoader';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-round-loader{width:44px;height:44px;transition:opacity .3s linear;line-height:100%;opacity:0}.smv-round-loader.smv-show{opacity:.7}.smv-round-loader>div{display:block;position:relative;top:0;left:0;width:100%;height:100%;border-radius:100%;background-color:rgba(0,0,0,.7);-webkit-animation:smv-round-loader 1.5s linear infinite;animation:smv-round-loader 1.5s linear infinite}.smv-round-loader>div::before{display:inline-block;position:absolute;top:50%;left:50%;width:77%;height:77%;transform:translate(-50%,-50%);border:2px solid #fff;border-radius:50%;border-right-color:transparent;content:\'\';box-sizing:border-box}@-webkit-keyframes smv-round-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes smv-round-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global Loader */

  /* global $J */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var SHOW_CLASS = 'smv-show'; // eslint-disable-next-line no-unused-vars

  var RoundLoader = /*#__PURE__*/function (_Loader) {
    "use strict";

    bHelpers.inheritsLoose(RoundLoader, _Loader);

    function RoundLoader(parent, options) {
      var _this;

      _this = _Loader.call(this, parent, options) || this;
      _this.type = 'round';
      _this.state = globalVariables.APPEARANCE.HIDDEN;
      _this.timer = null;
      _this.loaderElement = $J.$new('div');

      _this.addClass();

      _this.node.append(_this.loaderElement);

      return _this;
    }

    var _proto = RoundLoader.prototype;

    _proto.addClass = function addClass() {
      this.node.addClass('smv-round-loader');
    };

    _proto.isHiding = function isHiding() {
      return this.state === globalVariables.APPEARANCE.HIDING;
    };

    _proto.show = function show() {
      var _this2 = this;

      if ($J.contains([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN], this.state)) {
        return;
      }

      this.state = globalVariables.APPEARANCE.SHOWING;
      this.timer = setTimeout(function () {
        _this2.timer = null;

        _this2.append();

        _this2.node.removeEvent('transitionend');

        _this2.node.addEvent('transitionend', function (e) {
          e.stop();
          _this2.state = globalVariables.APPEARANCE.SHOWN;
        });

        _this2.node.getSize(); // render


        _this2.node.addClass(SHOW_CLASS);
      }, 250);
    };

    _proto.hide = function hide(force) {
      var _this3 = this;

      if (this.state === globalVariables.APPEARANCE.HIDDEN && !force) {
        return;
      }

      clearTimeout(this.timer);
      this.node.removeEvent('transitionend');

      if (this.state !== globalVariables.APPEARANCE.SHOWN) {
        force = true;
      }

      this.state = globalVariables.APPEARANCE.HIDING;

      if (!force) {
        this.node.addEvent('transitionend', function (e) {
          e.stop();

          _this3.node.remove();

          _this3.inDoc = false;
          _this3.state = globalVariables.APPEARANCE.HIDDEN;
        });
      } else {
        this.node.remove();
        this.inDoc = false;
        this.state = globalVariables.APPEARANCE.HIDDEN;
      }

      this.node.removeClass(SHOW_CLASS);
    };

    _proto.destroy = function destroy() {
      this.hide(true);
      this.state = globalVariables.APPEARANCE.HIDDEN;
      this.node.innerHTML = '';

      _Loader.prototype.destroy.call(this);
    };

    return RoundLoader;
  }(Loader);

  return RoundLoader;
});
//# sourceMappingURL=roundloader.js.map
