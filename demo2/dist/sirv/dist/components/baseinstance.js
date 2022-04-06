Sirv.define('BaseInstance', ['bHelpers', 'magicJS', 'EventEmitter', 'helper'], function (bHelpers, magicJS, EventEmitter, helper) {
  var moduleName = 'BaseInstance';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* global EventEmitter, helper */

  /* eslint-disable class-methods-use-this */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var DEFAULT_PREFIX = 'smv-';

  var BaseInstance = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(BaseInstance, _EventEmitter);

    function BaseInstance(node, options, defaultSchema) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.defaultSchema = defaultSchema;
      _this.options = options;
      _this.instanceNode = $(node);
      _this.instanceUrl = _this.instanceNode.attr('data-src') || _this.instanceNode.attr('src') || _this.instanceNode.attr('data-bg-src');
      _this.option = null;
      _this._isReady = false;
      _this.id = null;
      _this.isCustomId = false;
      _this.isStartedFullInit = false;
      _this.isStarted = false;
      _this.destroyed = false;
      _this.referrerPolicy = _this.instanceNode.attr('data-referrerpolicy') || _this.instanceNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
      _this.instanceOptions = _this.makeOptions();

      _this.createOptionFunction();

      _this.api = {
        isReady: _this.isReady.bind(bHelpers.assertThisInitialized(_this)),
        resize: _this.resize.bind(bHelpers.assertThisInitialized(_this)),
        getOptions: _this.getOptions.bind(bHelpers.assertThisInitialized(_this))
      };
      return _this;
    }

    var _proto = BaseInstance.prototype;

    _proto.setOptions = function setOptions(optInstance, common, local, attr) {
      optInstance.fromJSON(common);
      optInstance.fromString(local);
      optInstance.fromString(attr);
      return optInstance;
    };

    _proto.makeGlobalOptions = function makeGlobalOptions(optionsInstance) {
      var o = this.options.options;
      return this.setOptions(optionsInstance, o.common.common, o.local.common, this.instanceNode.attr('data-options') || '');
    };

    _proto.makeMobileOptions = function makeMobileOptions(optionsInstance) {
      var o = this.options.options;
      return this.setOptions(optionsInstance, o.common.mobile, o.local.mobile, this.instanceNode.attr('data-mobile-options') || '');
    };

    _proto.makeOptions = function makeOptions() {
      var options = new $J.Options(this.defaultSchema);
      options = this.makeGlobalOptions(options);

      if ($J.browser.touchScreen && $J.browser.mobile) {
        options = this.makeMobileOptions(options);
      }

      return options;
    };

    _proto.getOptionsForStartFullInit = function getOptionsForStartFullInit(options) {
      if (options) {
        this.options.options = options;
        this.instanceOptions = this.makeOptions();
        this.createOptionFunction();
      }
    };

    _proto.isReady = function isReady() {
      return this._isReady;
    };

    _proto.getOptions = function getOptions() {
      return this.instanceOptions.getJSON();
    };

    _proto.resize = function resize() {
      if (this._isReady) {
        return this.onResize();
      }

      return false;
    };

    _proto.onResize = function onResize() {
      return true;
    };

    _proto.getImageClassContainer = function getImageClassContainer() {
      return {};
    };

    _proto.checkImage = function checkImage(setts, dontLoad) {
      var result;
      var imageClass = this.getImageClassContainer();

      if (dontLoad) {
        result = imageClass.isExist(setts); // because we do not load images with imageclass
      } else {
        result = imageClass.isLoaded(setts);
      }

      return result;
    };

    _proto.getId = function getId(idPrefix, df) {
      this.id = this.instanceNode.attr('id');

      if (!this.id) {
        this.isCustomId = true;

        if (!idPrefix) {
          idPrefix = 'component-';
        }

        if (!df) {
          df = DEFAULT_PREFIX;
        }

        this.id = df + idPrefix + helper.generateUUID();
        this.id = this.id.trim();
        this.instanceNode.attr('id', this.id);
      }
    };

    _proto.createOptionFunction = function createOptionFunction() {
      var _this2 = this;

      this.option = function () {
        if (arguments.length > 1) {
          return _this2.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
        }

        return _this2.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
      };
    };

    _proto.startFullInit = function startFullInit(options) {
      if (this.destroyed || this.isStartedFullInit) {
        return;
      }

      this.isStartedFullInit = true;
      this.getOptionsForStartFullInit(options);
    };

    _proto.getOriginImageUrl = function getOriginImageUrl() {} // instance 'start' metod rename to 'run'
    ;

    _proto.run = function run() {
      if (!this.isStarted) {
        this.isStarted = true;
        return true;
      }

      return false;
    };

    _proto.done = function done() {
      this._isReady = true;
    };

    _proto.destroy = function destroy() {
      this.destroyed = true;
      this.isStarted = false;
      this._isReady = false;
      this.isStartedFullInit = false;

      if (this.isCustomId) {
        this.instanceNode.removeAttr('id');
        this.isCustomId = false;
      }

      this.instanceNode = null;

      _EventEmitter.prototype.destroy.call(this);
    };

    return BaseInstance;
  }(EventEmitter);

  return BaseInstance;
});
//# sourceMappingURL=baseinstance.js.map
