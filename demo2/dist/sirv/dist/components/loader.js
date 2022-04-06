Sirv.define('Loader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'EventEmitter'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, EventEmitter) {
  var moduleName = 'Loader';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-loader{display:inline-block;position:absolute;outline:0;z-index:999;box-sizing:border-box}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global EventEmitter */

  /* global $J */

  /* global $ */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint dot-notation: ["error", { "allowKeywords": false }]*/
  // eslint-disable-next-line no-unused-vars

  var Loader = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(Loader, _EventEmitter);

    function Loader(parent, options) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.parentNode = $(parent);
      _this.options = $J.extend({
        width: null,
        height: null,
        'class': null
      }, options || {});
      _this.node = $J.$new('div').addClass('smv-loader');
      _this.type = 'simple';
      _this.inDoc = false;

      if (_this.options['class']) {
        _this.node.addClass(_this.options['class']);
      }

      if (_this.options.width) {
        _this.node.setCssProp('width', _this.options.width);
      }

      if (_this.options.height) {
        _this.node.setCssProp('height', _this.options.height);
      }

      return _this;
    }

    var _proto = Loader.prototype;

    _proto.append = function append() {
      if (!this.inDoc) {
        this.inDoc = true;
        this.parentNode.append(this.node);
      }
    };

    _proto.show = function show() {
      this.append();
      this.node.setCss({
        display: '',
        visibility: 'visible'
      });
    };

    _proto.hide = function hide() {
      this.node.setCss({
        display: 'none',
        visibility: 'hidden'
      });
    };

    _proto.destroy = function destroy() {
      this.hide();
      this.node.remove();
      this.node = null;
      this.inDoc = false;

      _EventEmitter.prototype.destroy.call(this);
    };

    return Loader;
  }(EventEmitter);

  return Loader;
});
//# sourceMappingURL=loader.js.map
