Sirv.define('bHelpers', function () {
  var moduleName = 'bHelpers';
  var bHelpers = {};

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  bHelpers.inheritsLoose = _inheritsLoose;

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  bHelpers.assertThisInitialized = _assertThisInitialized;

  function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
  }

  bHelpers.readOnlyError = _readOnlyError;

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  bHelpers.classPrivateFieldGet = _classPrivateFieldGet;

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }

  bHelpers.classPrivateFieldSet = _classPrivateFieldSet;
  bHelpers;
  return bHelpers;
});
//# sourceMappingURL=bHelpers.js.map
