Sirv.define('EventManager', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'EventEmitter', 'helper'], function (bHelpers, magicJS, globalVariables, globalFunctions, EventEmitter, helper) {
  var moduleName = 'EventManager';
  var $J = magicJS;
  var $ = $J.$;
  /* global $, $J, EventEmitter, helper */

  /* eslint-env es6 */
  // eslint-disable-next-line no-unused-vars

  var EventManager = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(EventManager, _EventEmitter);

    function EventManager(items) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.items = items;
      _this.events = {
        lazyimage: {},
        viewer: {},
        spin: {},
        // viewer component
        zoom: {},
        // viewer component
        image: {},
        // viewer component
        video: {} // viewer component

      };
      _this.reversedEvents = [];

      _this.setEvents();

      return _this;
    }

    EventManager.eventsNameParser = function eventsNameParser(eventName) {
      var result = null;

      if (eventName && $J.typeOf(eventName) === 'string') {
        result = eventName.split(':').map(function (v) {
          return v.trim();
        }).filter(function (v) {
          return v !== '';
        });

        if (/sirv/i.test(result[0])) {
          result.shift();
        }

        if (result.length < 2) {
          result = null;
        }
      }

      return result;
    }
    /**
     * Trigger a DOM event
     * @param {String} eventType A name of the event.
     * @param {DOM Element} element The targe DOM element.
     * @param {Object} [detail] Additional event details.
     * @param {Boolean} [bubbles] Defines whether the event should bubble up through the event chain or not.
     * @param {Boolean} [cancelable] Defines whether the event can be canceled.
     */
    ;

    EventManager.triggerCustomEvent = function triggerCustomEvent(eventType, element, detail, bubbles, cancelable) {
      if (bubbles === $J.U) {
        bubbles = true;
      }

      if (cancelable === $J.U) {
        cancelable = true;
      }

      var event;

      try {
        event = new CustomEvent(eventType, {
          bubbles: bubbles,
          cancelable: cancelable,
          detail: detail
        });
      } catch (e) {
        try {
          event = $J.D.createEvent('Event');
          event.initEvent(eventType, bubbles, cancelable);
          event.detail = detail;
        } catch (ex) {
          /* empty */
        }
      }

      if (event) {
        element.node.dispatchEvent(event);
      }
    };

    var _proto = EventManager.prototype;

    _proto.addReverseEvent = function addReverseEvent(eventName, callback, componentName) {
      this.reversedEvents.push({
        eventName: eventName,
        componentName: componentName,
        callback: callback
      });
    };

    _proto.callReverseCallback = function callReverseCallback(componentName, eventName, eventData) {
      var result = false;

      for (var i = 0, l = this.reversedEvents.length; i < l; i++) {
        if (this.reversedEvents[i].componentName === componentName && this.reversedEvents[i].eventName === eventName) {
          this.reversedEvents[i].callback(eventData);
          this.reversedEvents.splice(i, 1);
          result = true;
          break;
        }
      }

      return result;
    };

    _proto.setEvents = function setEvents() {
      var _this2 = this;

      this.on('destroy', function (e) {
        e.stopAll();
        globalFunctions.stop(e.data.node, 'viewer');
      });
      /*
          'onLoad'
      */

      this.on('imagePublicEvent', function (e) {
        e.stopAll();

        var isReversed = _this2.callReverseCallback('lazyimage', e.data.type, e.data.image);

        if (!isReversed) {
          EventManager.triggerCustomEvent('sirv:lazyimage:' + e.data.type, e.data.node, $J.extend({}, e.data.image));
          var evs = _this2.events.lazyimage[e.data.type];

          if (evs) {
            evs.forEach(function (callback) {
              callback(e.data.image);
            });
          }
        }
      });
      /*
          viewer events
          'ready', 'fullscreenIn', 'fullscreenOut', 'beforeSlideIn', 'beforeSlideOut', 'afterSlideIn', 'afterSlideOut', 'enableItem', 'disableItem'
      */

      this.on('viewerPublicEvent', function (e) {
        e.stopAll();
        var node;
        var type;
        var eventData;
        var componentName = 'viewer';

        if (e.data.slider.type === 'componentEvent') {
          type = e.data.type;
          eventData = $J.extend({}, e.data.slide[e.data.slide.component]);
          componentName = e.data.slide.component;

          if (e.data.node) {
            node = e.data.componentEventData.node;
          }

          helper.objEach(e.data.componentEventData, function (key, value) {
            if (key === 'node') {
              if (e.data.node) {
                eventData[key] = value.node;
              }
            } else if (key !== 'type') {
              eventData[key] = value;
            }
          });
        } else {
          type = e.data.slider.type;

          if (type === 'ready') {
            globalFunctions.iconsHash.remove();
          }

          if (e.data.node) {
            node = e.data.node;
          }

          if (e.data.slider) {
            eventData = e.data.slider;

            if (type === 'sendStats') {
              eventData.statsData = e.data.event;
            }
          }

          if ($J.contains(['beforeSlideIn', 'beforeSlideOut', 'afterSlideIn', 'afterSlideOut', 'enableItem', 'disableItem', 'thumbnailClick'], type)) {
            eventData = e.data.slide;
          }
        }

        var isReversed = _this2.callReverseCallback(componentName, type, eventData);

        if (!isReversed) {
          if (node) {
            EventManager.triggerCustomEvent('sirv:' + componentName + ':' + type, node, $J.extend({}, eventData));
          }

          var evs = _this2.events[componentName][type];

          if (evs) {
            evs.forEach(function (callback) {
              callback(eventData);
            });
          }
        }
      });
      this.on(function (e) {
        e.stopAll();
      });
    };

    _proto.addEvent = function addEvent(eventName, callback) {
      var _this3 = this;

      var result = function () {
        return false;
      };

      var events = EventManager.eventsNameParser(eventName);

      if (events && this.events[events[0]] && callback) {
        if (!this.events[events[0]][events[1]]) {
          this.events[events[0]][events[1]] = [];
        }

        this.events[events[0]][events[1]].push(callback);

        if ($J.contains(['ready', 'init', 'onLoad'], events[1])) {
          var itemName = events[0] === 'lazyimage' ? 'image' : 'viewer';

          if (itemName === 'viewer' && events[1] !== 'onLoad' || events[1] === 'onLoad' && itemName === 'image') {
            /*
                we need the timeout because every event returns function which can remove this event
                 for example:
                if event 'ready' already was
                and we set new one
                the variable 'removeReadyEvent' will be undefined
                 const removeReadyEvent = Sirv.on('viewer:ready', (e) => {
                    removeReadyEvent();
                });
            */
            setTimeout(function () {
              var items = _this3.items[itemName];
              items.forEach(function (item) {
                if (item.checkReadiness(events[1], events[0])) {
                  _this3.addReverseEvent(events[1], callback, events[0]);

                  item.sendEvent(events[1], events[0]);
                }
              });
            }, 0);
          }
        }

        result = function () {
          return _this3.removeEvent(eventName, callback);
        };
      }

      return result;
    };

    _proto.removeEvent = function removeEvent(eventName, callback) {
      var events = EventManager.eventsNameParser(eventName);

      if (events && this.events[events[0]] && this.events[events[0]][events[1]]) {
        if (callback) {
          var index = this.events[events[0]][events[1]].indexOf(callback);

          if (index >= 0) {
            this.events[events[0]][events[1]].splice(index, 1);
            return true;
          }
        } else {
          delete this.events[events[0]][events[1]];
          return true;
        }
      }

      return false;
    };

    return EventManager;
  }(EventEmitter);

  return EventManager;
});
//# sourceMappingURL=eventmanager.js.map
