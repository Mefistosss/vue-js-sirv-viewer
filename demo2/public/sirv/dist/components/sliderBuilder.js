Sirv.define('SliderBuilder', ['bHelpers', 'magicJS', 'EventEmitter', 'helper', 'globalVariables', 'globalFunctions', 'Promise!'], function (bHelpers, magicJS, EventEmitter, helper, globalVariables, globalFunctions, Promise) {
  var moduleName = 'SliderBuilder';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* global $J, helper, Promise */

  /* eslint-disable no-extra-semi */

  /* eslint-disable no-unused-vars */

  /* eslint class-methods-use-this: ["error", {"exceptMethods": ["loadData"]}] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var SLIDER_BUILDER_CONF_VER = 1;

  var getInfoUrl = function (url, callbackName) {
    return url + ($J.stringHas(url, '?') ? '&' : '?') + 'nometa&info=' + callbackName;
  };

  var SliderBuilder = /*#__PURE__*/function () {
    "use strict";

    function SliderBuilder(sirvOption, node) {
      this.mainNode = $(node);
      this.sirvOptions = helper.deepExtend({}, sirvOption || {});
      this.nodes = [];
      this.configURL = null;
      this.dataJSON = null;
      this.configHash = null;
      this.attrbMainNode = null;
      this.cfCallbackName = null;
      this.urlParams = null;
      this.componentsList = [];
      this.referrerPolicy = this.mainNode.attr('data-referrerpolicy') || this.mainNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
    }

    var _proto = SliderBuilder.prototype;

    _proto.getOptions = function getOptions() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.checkNode()) {
          _this.buildCallBackName();

          helper.getRemoteData(getInfoUrl(_this.configURL, _this.cfCallbackName), _this.cfCallbackName, _this.referrerPolicy).then(function (result) {
            if (result && result.assets) {
              _this.dataJSON = result;

              _this.buildOptions();

              resolve({
                'dataOptions': _this.sirvOptions
              });
            } else {
              var contentType = globalVariables.SLIDE.TYPES.IMAGE;

              if (result.layers) {
                contentType = globalVariables.SLIDE.TYPES.SPIN;
              }

              resolve({
                'content': contentType,
                'dataOptions': _this.sirvOptions
              });
            }
          }).catch(function (error) {
            error = _this.configURL;
            reject({
              'error': _this.configURL,
              'dataOptions': _this.sirvOptions
            });
          });
        } else {
          resolve({
            'dataOptions': _this.sirvOptions
          });
        }
      });
    };

    _proto.buildViewer = function buildViewer() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.dataJSON) {
          var parsedURL = /(^https?:\/\/[^/]*)([^#?]*)\/.*$/.exec(_this2.configURL);
          var pathname = _this2.dataJSON.dirname || parsedURL[2];

          _this2.prepareListComponents(_this2.dataJSON.assets, parsedURL[1], pathname);

          _this2.generateComponents();

          _this2.addAllComponents();
        }

        resolve({
          'mainNode': _this2.mainNode
        });
      });
    };

    _proto.prepareListComponents = function prepareListComponents(listComponents, origin, folderPath) {
      var _this3 = this;

      listComponents.forEach(function (component) {
        var path;
        var is3rd = /^(https?:)?\/\/[^/]/.test(component.name);

        if (is3rd) {
          path = component.name;
        } else if (/^\//.test(component.name)) {
          path = origin + component.name;
        } else {
          path = origin + folderPath + '/' + component.name;
        }

        _this3.componentsList.push({
          'path': is3rd ? path : globalFunctions.normalizeURL(path),
          'type': globalVariables.SLIDE.NAMES.indexOf(component.type),
          'is3rd': is3rd
        });
      });
    };

    _proto.checkNode = function checkNode() {
      var result = false;
      var template = /([^#?]+)\/?([^#?]+\.view)(\?([^#]*))?(#(.*))?$/;

      if (this.mainNode) {
        this.attrbMainNode = this.mainNode.attr('data-src');

        if (this.attrbMainNode && template.test(this.attrbMainNode)) {
          result = true;
        }
      }

      return result;
    };

    _proto.buildOptions = function buildOptions() {
      this.sirvOptions.common = helper.deepExtend(this.sirvOptions.common, this.dataJSON.settings || {});
      this.sirvOptions.mobile = helper.deepExtend(this.sirvOptions.mobile, this.dataJSON.settings || {});
    };

    _proto.buildCallBackName = function buildCallBackName() {
      this.configURL = globalFunctions.normalizeURL(this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
      this.urlParams = this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$2');

      if (this.urlParams) {
        this.configURL += '?' + this.urlParams;
      }

      this.configHash = $J.getHashCode(this.configURL.replace(/^http(s)?:\/\//, ''));
      this.cfCallbackName = 'view-' + SLIDER_BUILDER_CONF_VER + '_' + this.configHash;
    };

    _proto.generateComponents = function generateComponents() {
      var _this4 = this;

      this.componentsList.forEach(function (item) {
        var node = $J.$new('div');

        if (item.type === globalVariables.SLIDE.TYPES.IMAGE) {
          if (item.is3rd) {
            node = $J.$new('img');
            node.attr('data-type', 'static');
          } else {
            node.attr('data-type', 'zoom');
          }
        }

        var path = item.path;

        if (_this4.urlParams) {
          path += '?' + _this4.urlParams;
        }

        node.attr('data-src', path);

        _this4.nodes.push(node);
      });
    };

    _proto.addAllComponents = function addAllComponents() {
      var _this5 = this;

      this.mainNode.node.innerHTML = '';
      this.nodes.forEach(function (item) {
        _this5.mainNode.node.appendChild(item.node);
      });
    };

    _proto.destroy = function destroy() {
      this.mainNode = null;
      this.sirvOptions = null;
      this.nodes = [];
      this.configURL = null;
      this.dataJSON = null;
      this.configHash = null;
      this.cfCallbackName = null;
      this.componentsList = [];
    };

    return SliderBuilder;
  }();

  return SliderBuilder;
});
//# sourceMappingURL=sliderBuilder.js.map
