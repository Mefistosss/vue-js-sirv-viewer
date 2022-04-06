Sirv.define('ComponentLoader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'RoundLoader'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, RoundLoader) {
  var moduleName = 'ComponentLoader';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-component-loader{top:0;left:0;transition:opacity .3s linear;background-color:transparent;line-height:100%;opacity:0}.smv-component-loader .smv-bounce-wrapper{position:relative;top:50%;left:50%;width:40px;height:40px;margin-top:-20px;margin-left:-20px}.smv-component-loader .smv-bounce-wrapper .smv-bounce1,.smv-component-loader .smv-bounce-wrapper .smv-bounce2{-webkit-animation:smv-component-loader 2s infinite ease-in-out;animation:smv-component-loader 2s infinite ease-in-out;position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;background-color:#333;opacity:.6}.smv-component-loader .smv-bounce-wrapper .smv-bounce2{-webkit-animation-delay:-1s;animation-delay:-1s}.smv-component-loader.smv-show{opacity:1}@-webkit-keyframes smv-component-loader{0%,100%{transform:scale(0)}50%{transform:scale(1)}}@keyframes smv-component-loader{0%,100%{transform:scale(0)}50%{transform:scale(1)}}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global RoundLoader */

  /* global $J */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var setDefaultOptions = function (options) {
    if (!options) {
      options = {};
    }

    if (!options.width) {
      options.width = '100%';
    }

    if (!options.height) {
      options.height = '100%';
    }

    return options;
  }; // eslint-disable-next-line no-unused-vars


  var ComponentLoader = /*#__PURE__*/function (_RoundLoader) {
    "use strict";

    bHelpers.inheritsLoose(ComponentLoader, _RoundLoader);

    function ComponentLoader(parent, options) {
      var _this;

      options = setDefaultOptions(options);
      _this = _RoundLoader.call(this, parent, options) || this;
      _this.type = 'component';

      _this.loaderElement.addClass('smv-bounce-wrapper').append($J.$new('div').addClass('smv-bounce1')).append($J.$new('div').addClass('smv-bounce2'));

      return _this;
    }

    var _proto = ComponentLoader.prototype;

    _proto.addClass = function addClass() {
      this.node.addClass('smv-component-loader');
    };

    _proto.destroy = function destroy() {
      this.loaderElement.removeClass('smv-bounce-wrapper');
      this.loaderElement.node.innerHTML = '';

      _RoundLoader.prototype.destroy.call(this);
    };

    return ComponentLoader;
  }(RoundLoader);

  return ComponentLoader;
});
//# sourceMappingURL=componentloader.js.map
