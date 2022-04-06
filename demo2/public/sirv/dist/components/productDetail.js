Sirv.define('ProductDetail', ['bHelpers', 'magicJS', 'globalFunctions', 'helper', 'Description'], function (bHelpers, magicJS, globalFunctions, helper, Description) {
  var moduleName = 'ProductDetail';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-product-details{display:flex;flex-direction:column;flex-shrink:0;font-size:0;line-height:100%;overflow:hidden;box-sizing:border-box}.smv-fullscreen-box-product-details-left .smv-product-details,.smv-fullscreen-box-product-details-right .smv-product-details{position:relative;width:200px;height:100%}.smv-fullscreen-box-product-details-bottom .smv-product-details,.smv-fullscreen-box-product-details-top .smv-product-details{position:relative;width:100%;max-height:200px}.smv-fullscreen-box-product-details-bottom,.smv-fullscreen-box-product-details-left,.smv-fullscreen-box-product-details-right,.smv-fullscreen-box-product-details-top{display:flex}.smv-fullscreen-box-product-details-left{flex-direction:row-reverse}.smv-fullscreen-box-product-details-right{flex-direction:row}.smv-fullscreen-box-product-details-top{flex-direction:column-reverse}.smv-fullscreen-box-product-details-bottom{flex-direction:column}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global Description */

  /* eslint-disable indent */

  /* eslint-disable no-lonely-if */

  /* eslint class-methods-use-this: ["off", { "createLink": ["error"] }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "DescriptionProductDetail" }] */

  var CSS_PRODUCT_DETAILS = 'smv-product-details';
  var CSS_PRODUCT_DETAILS_FULLSCREENBOX = 'smv-fullscreen-box-product-details-';

  var DescriptionProductDetail = /*#__PURE__*/function (_Description) {
    "use strict";

    bHelpers.inheritsLoose(DescriptionProductDetail, _Description);

    function DescriptionProductDetail(options, contaner, fullscreenContainer) {
      var _this;

      _this = _Description.call(this, {
        text: options.text
      }) || this;
      _this.options = $J.extend({
        position: 'top'
      }, options || {});
      _this.mainContainer = contaner;
      _this.fullscreenBoxContainer = fullscreenContainer;
      _this.currentSide = _this.options.position;
      _this.productDetail = $J.$new('div');

      _this.init();

      return _this;
    }

    var _proto = DescriptionProductDetail.prototype;

    _proto.init = function init() {
      _Description.prototype.init.call(this);

      this.productDetail.append(this.getContainer());
    };

    _proto.setupClasses = function setupClasses() {
      this.fullscreenBoxContainer.addClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
      this.productDetail.addClass(CSS_PRODUCT_DETAILS);
      this.fullscreenBoxContainer.append(this.productDetail);
    };

    _proto.open = function open() {
      this.setupClasses();
    };

    _proto.close = function close() {
      this.fullscreenBoxContainer.removeClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
      this.productDetail.removeClass(CSS_PRODUCT_DETAILS);
      this.fullscreenBoxContainer.remove(this.productDetail);
    };

    _proto.destroy = function destroy() {
      _Description.prototype.destroy.call(this);

      this.mainContainer = null;
      this.currentSide = null;
      this.productDetail = null;
      this.fullscreenBoxContainer = null;
    };

    return DescriptionProductDetail;
  }(Description);

  return DescriptionProductDetail;
});
//# sourceMappingURL=productDetail.js.map
