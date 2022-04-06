Sirv.define('EventEmitter', ['bHelpers', 'magicJS', 'helper'], function (bHelpers, magicJS, helper) {
  var moduleName = 'EventEmitter';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* global helper */

  /* eslint-disable indent */

  /* eslint-disable no-console */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars

  var EventObject = /*#__PURE__*/function () {
    "use strict";

    function EventObject(type, direction, data) {
      this.type = type;
      this.direction = direction;
      this.propagation = true;
      this.nextCalls = true;
      this.emptyEvent = true;
      this.data = $J.extend(data, {
        eventType: this.type,
        eventDirection: this.direction,
        stopEmptyEvent: this.stopEmptyEvent.bind(this),
        stopPropagation: this.stopPropagation.bind(this),
        stopNextCalls: this.stopNextCalls.bind(this),
        stop: this.stop.bind(this),
        stopAll: this.stopAll.bind(this)
      });
    }

    var _proto = EventObject.prototype;

    _proto.copyData = function copyData() {
      var result = {};
      helper.objEach(this.data, function (key, value) {
        if (!$J.contains(['eventDirection', 'stopEmptyEvent', 'stopPropagation', 'stopNextCalls', 'stop', 'stopAll'], key)) {
          result[key] = value;
        }
      });
      return result;
    };

    _proto.getCustomData = function getCustomData() {
      return this.data;
    };

    _proto.getDirection = function getDirection() {
      return this.direction;
    };

    _proto.isEmptyEventStopped = function isEmptyEventStopped() {
      return !this.emptyEvent;
    };

    _proto.isPropagationStopped = function isPropagationStopped() {
      return !this.propagation;
    };

    _proto.isNextCallsStopped = function isNextCallsStopped() {
      return !this.nextCalls;
    };

    _proto.stopEmptyEvent = function stopEmptyEvent() {
      this.emptyEvent = false;
    };

    _proto.stopPropagation = function stopPropagation() {
      this.propagation = false;
    };

    _proto.stopNextCalls = function stopNextCalls() {
      this.nextCalls = false;
    };

    _proto.stop = function stop() {
      this.stopPropagation();
      this.stopEmptyEvent();
    };

    _proto.stopAll = function stopAll() {
      this.stop();
      this.stopNextCalls();
    };

    return EventObject;
  }();
  /* eslint-env es6 */

  /* global EventObject */

  /* eslint-disable indent */

  /* eslint-disable no-console */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


  var correctName = function (name, defaultName) {
    if ($J.typeOf(name) === 'string') {
      name = name.trim();

      if (name === '') {
        name = defaultName;
      }
    } else {
      name = defaultName;
    }

    return name;
  }; // eslint-disable-next-line no-unused-vars


  var EmitterInstance = /*#__PURE__*/function () {
    "use strict";

    function EmitterInstance() {
      this.__parent = null;
      this.__childs = $([]);
      this.__subscribers = {};
      this.__NAME_OF_EMPTY_EVENT = '__empty__';
    }

    var _proto2 = EmitterInstance.prototype;

    _proto2.__setChild = function __setChild(child) {
      this.__childs.push(child);
    };

    _proto2.__removeChild = function __removeChild(child) {
      var idx = this.__childs.indexOf(child);

      if (idx !== -1) {
        this.__childs.splice(idx, 1);
      }
    };

    _proto2.setParent = function setParent(parent) {
      this.__parent = parent;

      this.__parent.__setChild(this);
    };

    _proto2.__removeParent = function __removeParent() {
      if (this.__parent) {
        this.__parent.__removeChild(this);

        this.__parent = null;
      }
    };

    _proto2.__callNext = function __callNext(event) {
      if (!event.isPropagationStopped()) {
        if (event.getDirection() === 'up') {
          if (this.__parent) {
            this.__parent.__next(event);
          }
        } else {
          this.__childs.forEach(function (child) {
            child.__next(event);
          });
        }
      }
    };

    _proto2.__next = function __next(event) {
      var callbacks = this.__subscribers[event.type];
      event = new EventObject(event.type, event.direction, event.copyData());

      if (callbacks) {
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i](event.getCustomData(), event, this);

          if (event.isNextCallsStopped()) {
            break;
          }
        }
      }

      if (Object.prototype.hasOwnProperty.call(this.__subscribers, this.__NAME_OF_EMPTY_EVENT) && !event.isEmptyEventStopped()) {
        for (var _i = 0; _i < this.__subscribers[this.__NAME_OF_EMPTY_EVENT].length; _i++) {
          this.__subscribers[this.__NAME_OF_EMPTY_EVENT][_i](event.getCustomData());
        }
      }

      this.__callNext(event);
    };

    _proto2.emit = function emit(type, data) {
      // up
      if (!data || $J.typeOf(data) !== 'object') {
        if ($J.typeOf(type) === 'object') {
          data = type;
          type = null;
        } else {
          data = {};
        }
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      this.__callNext(new EventObject(type, 'up', data));
    };

    _proto2.broadcast = function broadcast(type, data) {
      // down
      if (!data || $J.typeOf(data) !== 'object') {
        if ($J.typeOf(type) === 'object') {
          data = type;
          type = null;
        } else {
          data = {};
        }
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      this.__callNext(new EventObject(type, 'down', data));
    };

    _proto2.on = function on(type, fn) {
      var self = this;

      if ($J.typeOf(type) === 'function') {
        fn = type;
        type = null;
      }

      if (!fn) {
        return null;
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      if (!this.__subscribers[type]) {
        this.__subscribers[type] = [];
      }

      this.__subscribers[type].push(fn);

      return function () {
        return self.off(type, fn);
      };
    };

    _proto2.off = function off(type, fn) {
      var idx;

      if ($J.typeOf(type) === 'function') {
        fn = type;
        type = null;
      }

      type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

      if (!fn) {
        delete this.__subscribers[type];
      } else if (Object.prototype.hasOwnProperty.call(this.__subscribers, type)) {
        idx = this.__subscribers[type].indexOf(fn);

        if (idx !== -1) {
          this.__subscribers[type].splice(idx, 1);
        }
      }
    };

    _proto2.destroy = function destroy() {
      this.__removeParent();

      this.__childs = $([]);
      this.__subscribers = {};
    };

    return EmitterInstance;
  }();

  return EmitterInstance;
});
//# sourceMappingURL=emitter.js.map
