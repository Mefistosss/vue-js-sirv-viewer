var _this = this;

Sirv.define('helper', ['require', 'bHelpers', 'magicJS', 'globalVariables', 'Promise!'], function (sirvRequire, bHelpers, magicJS, globalVariables, Promise) {
  var moduleName = 'helper';
  var $J = magicJS;
  var $ = $J.$;
  var helper = {};
  /* global $J, helper */

  /* eslint-env es6 */

  var WaitToStart = /*#__PURE__*/function () {
    "use strict";

    function WaitToStart() {
      this.started = false;
      this.callbacks = [];
    }

    var _proto = WaitToStart.prototype;

    _proto.wait = function wait(cb) {
      if (this.started) {
        cb();
      } else {
        this.callbacks.push(cb);
      }
    };

    _proto.start = function start() {
      if (!this.started) {
        this.started = true;
        this.callbacks.forEach(function (cb) {
          return cb();
        });
      }
    };

    _proto.destroy = function destroy() {
      this.callbacks = [];
    };

    return WaitToStart;
  }();

  helper.WaitToStart = WaitToStart;
  /* global $J, helper */

  /* eslint-env es6 */
  // helper.addCss = (css, id, position) => {
  //     if (!position) { position = 'top'; }
  //     const stl = $J.$new('style', { id: (id || 'sirv-module-' + helper.generateUUID()), type: 'text/css' }).appendTo((document.head || document.body), position);
  //     stl.node.innerHTML = css;
  //     return stl;
  // };

  helper.addCss = function (css, id, position, root, selector) {
    var rootNode = document.head || document.body;
    var stl = $J.$new('style', {
      type: 'text/css'
    });
    stl.attr('id', id || 'sirv-module-' + stl.$J_UUID);

    if (!position) {
      position = 'top';
    }

    if (root) {
      rootNode = $(root).node || root;
    }

    var nextSibling;

    if (position === 'top') {
      nextSibling = rootNode.firstChild;
    }

    var addAfter = rootNode.querySelector(selector);

    if (addAfter && addAfter.nextSibling) {
      nextSibling = addAfter.nextSibling;
    }

    rootNode.insertBefore(stl.node, nextSibling);
    stl.node.innerHTML = css;
    return stl;
  };
  /* eslint-env es6 */

  /* global helper */


  helper.cleanQueryString = function (str) {
    str = str.replace(/&+/g, '&');
    str = str.replace(/&$/, '');
    str = str.replace(/\?&/, '?');
    str = str.replace(/profile=&|profile=$/g, '');
    str = str.replace(/image=&/g, 'image&');
    str = str.replace(/image=$/g, 'image');
    return str;
  };
  /* eslint-env es6 */

  /* global helper */


  helper.createReadOnlyProp = function (obj, name, value) {
    Object.defineProperty(obj, name, {
      value: value,
      writable: false
    });
  };
  /* global $J, helper */

  /* eslint-env es6 */
  // Returns if a value is an object


  var isObject = function (value) {
    return value && typeof value === 'object' && value.constructor === Object;
  };
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked, or until the next browser frame is drawn. The debounced function
   * comes with a `cancel` method to cancel delayed `func` invocations and a
   * `flush` method to immediately invoke them. Provide `options` to indicate
   * whether `func` should be invoked on the leading and/or trailing edge of the
   * `wait` timeout. The `func` is invoked with the last arguments provided to the
   * debounced function. Subsequent calls to the debounced function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
   * invocation will be deferred until the next frame is drawn (typically about
   * 16ms).
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `debounce` and `throttle`.
   *
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0]
   *  The number of milliseconds to delay; if omitted, `requestAnimationFrame` is
   *  used (if available).
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', debounce(calculateLayout, 150))
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }))
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
   * const source = new EventSource('/stream')
   * jQuery(source).on('message', debounced)
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel)
   *
   * // Check for pending invocations.
   * const status = debounced.pending() ? "Pending..." : "Ready"
   */


  helper.debounce = function (func, wait, options) {
    var lastArgs;
    var lastThis;
    var maxWait;
    var result;
    var timerId;
    var lastCallTime;
    var lastInvokeTime = 0;
    var leading = false;
    var maxing = false;
    var trailing = true; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    // const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function');

    var useRAF = !wait && wait !== 0 && $J.browser.features.requestAnimationFrame;

    if (typeof func !== 'function') {
      throw new TypeError('Expected a function');
    }

    wait = +wait || 0;

    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    var invokeFunc = function (time) {
      var args = lastArgs;
      var thisArg = lastThis;
      lastArgs = $J.U;
      lastThis = lastArgs;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    };

    var startTimer = function (pendingFunc, _wait) {
      if (useRAF) {
        $J.browser.cancelAnimationFrame(timerId);
        return $J.browser.requestAnimationFrame(pendingFunc);
      }

      return setTimeout(pendingFunc, _wait);
    };

    var cancelTimer = function (id) {
      if (useRAF) {
        $J.browser.cancelAnimationFrame(id);
      } else {
        clearTimeout(id);
      }
    };

    var remainingWait = function (time) {
      var timeSinceLastCall = time - lastCallTime;
      var timeSinceLastInvoke = time - lastInvokeTime;
      var timeWaiting = wait - timeSinceLastCall;
      return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    };

    var shouldInvoke = function (time) {
      var timeSinceLastCall = time - lastCallTime;
      var timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === $J.U || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    };

    var trailingEdge = function (time) {
      timerId = $J.U; // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = $J.U;
      lastThis = lastArgs;
      return result;
    };

    var timerExpired = function () {
      var time = Date.now();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = startTimer(timerExpired, remainingWait(time));
      return $J.U;
    };

    var leadingEdge = function (time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = startTimer(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    };

    var cancel = function () {
      if (timerId !== $J.U) {
        cancelTimer(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = $J.U;
      lastCallTime = lastArgs;
      lastThis = lastArgs;
      timerId = lastArgs;
    };

    var flush = function () {
      return timerId === $J.U ? result : trailingEdge(Date.now());
    };

    var pending = function () {
      return timerId !== $J.U;
    };

    var debounced = function () {
      var time = Date.now();
      var isInvoking = shouldInvoke(time);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      lastArgs = args;
      lastThis = _this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === $J.U) {
          return leadingEdge(lastCallTime);
        }

        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = startTimer(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }

      if (timerId === $J.U) {
        timerId = startTimer(timerExpired, wait);
      }

      return result;
    };

    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
  };
  /* global $, $J, helper */

  /* eslint-env es6 */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */


  helper.deepExtend = function () {
    var extend = function (extendingObject, source) {
      var type = $J.typeOf(source);

      if (!$J.defined(extendingObject)) {
        if (type === 'array') {
          extendingObject = [];
        } else {
          extendingObject = {};
        }
      }

      if (type === 'array') {
        source.forEach(function (value, index) {
          var _type = $J.typeOf(value); // if (!$J.contains(extendingObject, value)) {


          if (_type === 'array' && $J.typeOf(extendingObject[index]) === 'array' || _type === 'object' && $J.typeOf(extendingObject[index]) === 'object') {
            extendingObject[index] = extend(extendingObject[index], value);
          } else {
            extendingObject.push(value);
          } // }

        });
      } else {
        helper.objEach(source, function (key, value, index) {
          var _type = $J.typeOf(value);

          if (_type === 'array' || _type === 'object') {
            extendingObject[key] = extend(extendingObject[key], value);
          } else {
            extendingObject[key] = value;
          }
        });
      }

      return extendingObject;
    };

    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var result = null;
      args = $J.$A(args);

      if (args.length) {
        result = args.shift();
        args.forEach(function (value) {
          var _type = $J.typeOf(value);

          if (_type === 'array' || _type === 'object') {
            result = extend(result, value);
          }
        });
      }

      return result;
    };
  }();
  /* global $J, helper */

  /* eslint-env es6 */


  helper.fixSize = function (node, size) {
    node = $(node);

    var checkAuto = function (_node, side) {
      return _node.attr(side) === 'auto';
    };

    var correctSizeValue = function (value) {
      if (value <= 4) {
        value = 0;
      }

      return value;
    };

    ['width', 'height'].forEach(function (side) {
      if ($J.browser.ieMode && !node.attr('src')) {
        if (checkAuto(node, side)) {
          size[side] = 0;
        }
      }

      if (size[side] === 0) {
        // check "width" / "height" attribute
        size[side] = helper.imageLib.getPartSize(node, side);
      }

      size[side] = correctSizeValue(size[side]);
    });
    return size;
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.generateUUID = function () {
    return parseInt(Math.random() * 10000000, 10);
  };
  /* global helper */

  /* eslint-env es6 */


  helper.getArrayIndex = function (index, length) {
    index %= length;

    if (index < 0) {
      index += length;
    }

    return index;
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.getDPPX = function (value, maxValue, upscale) {
    var result = maxValue / value;
    var count = 100;

    if (result >= $J.DPPX || upscale) {
      result = $J.DPPX;
    } else {
      result *= count;
      result = Math.ceil(result) / count;
    }

    return result;
  };
  /* global helper */

  /* global $ */

  /* eslint-env es6 */


  helper.getMatrix = function (node) {
    var result = null;
    var is3D;
    var matrix = $(node).getCss('transform') + '';

    var getNumber = function (str) {
      return parseFloat(str.trim());
    };

    var getTrObj = function (arrIndexes, arr) {
      var _result = {};
      var axises = ['x', 'y', 'z'];
      arrIndexes.forEach(function (v, i) {
        _result[axises[i]] = getNumber(arr[v]);
      });
      return _result;
    };

    if (matrix !== 'none') {
      result = {};
      matrix = matrix.split('(')[1];
      matrix = matrix.split(')')[0];
      matrix = matrix.split(',');
      is3D = matrix.length > 6;
      result.transform = getTrObj(is3D ? [12, 13, 14] : [4, 5], matrix);
      result.scale = getTrObj(is3D ? [0, 5, 10] : [0, 3], matrix);
    }

    return result;
  };
  /* global $J, helper, Promise */

  /* eslint no-throw-literal: "off" */

  /* eslint-env es6 */


  helper.getRemoteData = function () {
    var __XMLHttpRequest = function (url) {
      return new Promise(function (resolve, reject) {
        var xhr = null;

        if ($J.browser.features.xhr2) {
          xhr = new XMLHttpRequest();
        } else if (window.XDomainRequest) {
          xhr = new XDomainRequest();
        }

        if (xhr) {
          xhr.onerror = function (e) {
            reject(e || true);
          };

          xhr.onload = function (e) {
            try {
              if (xhr.status === 200) {
                var value = JSON.parse(xhr.responseText);
                resolve(value);
              } else {
                throw {
                  status: xhr.status,
                  data: e
                };
              }
            } catch (_err) {
              reject(_err);
            }
          };

          xhr.open('GET', url);

          if (undefined !== xhr.responseType) {
            xhr.responseType = 'text';
          }

          xhr.send(null);
        } else {
          reject(true);
        }
      });
    };

    var getByFetch = function (url, referrerPolicy) {
      return fetch(url, {
        referrerPolicy: referrerPolicy || 'no-referrer-when-downgrade'
      }).then(function (response) {
        if (response.status === 200) {
          return response.json();
        }

        throw {
          status: response.status,
          data: response
        };
      });
    };

    var getData = window.fetch ? getByFetch : __XMLHttpRequest;

    var __jsonp = function (url, callbackName) {
      return new Promise(function (resolve, reject) {
        var scriptOk = false;
        var script = document.createElement('script');

        if (!window[callbackName]) {
          window[callbackName] = function () {
            scriptOk = true;
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(arguments.length <= 0 ? undefined : arguments[0]);
          };
        }

        var checkCallback = function () {
          if (scriptOk) return;
          delete window[callbackName];
          document.body.removeChild(script);
          reject(url);
        };

        script.onreadystatechange = function () {
          if (_this.readyState === 'complete' || _this.readyState === 'loaded') {
            _this.onreadystatechange = null;
            setTimeout(checkCallback, 0);
          }
        };

        script.onerror = checkCallback;
        script.onload = checkCallback;
        script.src = url + '&callback=' + callbackName;
        document.body.appendChild(script);
      });
    };

    return function (url, callbackName
    /* for jsonp */
    , referrerPolicy) {
      return new Promise(function (resolve, reject) {
        getData(url, referrerPolicy).then(resolve).catch(function (err) {
          if (err && err.status && $J.contains([404, 200], err.status)) {
            reject(err);
          } else {
            // eslint-disable-next-line no-console
            console.log('XHR error. Switching to JSONP.');

            if (!callbackName) {
              callbackName = 'sirv_data_' + helper.generateUUID();
            }

            __jsonp(url, callbackName).then(resolve).catch(reject);
          }
        });
      });
    };
  }();
  /* global helper */

  /* global $ */

  /* eslint-env es6 */


  helper.getSirvType = function () {
    var isNotEmptyString = function (str) {
      var result = false;

      if (str) {
        str += '';
        result = str.trim() !== '';
      }

      return result;
    };

    return function (node) {
      node = $(node);
      var tmp = node.attr('data-type') || node.attr('data-effect');
      var viewContent = node.fetch('view-content');
      var result = null;
      var componentType;
      var imgSrc;

      if (isNotEmptyString(tmp) && tmp !== 'static') {
        var index = globalVariables.SLIDE.NAMES.indexOf(tmp);
        componentType = index >= 0 ? index : globalVariables.SLIDE.TYPES.ZOOM;
        tmp = node.attr('data-src');

        if (isNotEmptyString(tmp)) {
          imgSrc = tmp;
        } else {
          tmp = $(node.node.getElementsByTagName('img')[0]);

          if (tmp.attr) {
            imgSrc = tmp.attr('src') || tmp.attr('data-src');
          }
        }
      } else {
        tmp = node.attr('data-src');

        if (isNotEmptyString(tmp)) {
          if (helper.isSpin(tmp) && node.getTagName() !== 'img' || viewContent === globalVariables.SLIDE.TYPES.SPIN) {
            componentType = globalVariables.SLIDE.TYPES.SPIN;
            imgSrc = tmp;
          } else if (helper.isVideo(tmp)) {
            componentType = globalVariables.SLIDE.TYPES.VIDEO;
            imgSrc = tmp;
          } else {
            imgSrc = tmp;
            componentType = globalVariables.SLIDE.TYPES.IMAGE;

            if (viewContent) {
              componentType = viewContent;
            }
          }
        } else {
          tmp = node.attr('src');

          if (isNotEmptyString(tmp) && node.getTagName() === 'img') {
            imgSrc = tmp;
            componentType = globalVariables.SLIDE.TYPES.IMAGE;
          }
        }
      }

      if (componentType) {
        result = {
          type: componentType,
          imgSrc: imgSrc
        };
      }

      return result;
    };
  }();
  /* global $J, $ */

  /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint no-prototype-builtins: "off" */

  /* eslint lines-around-directive: ["off"] */

  /* eslint strict: ["off"] */

  /* eslint-env es6 */


  if (!$J.hashKeys) {
    if (Object.keys) {
      $J.hashKeys = Object.keys;
    } else {
      (function () {
        'use strict';

        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var hasDontEnumBug = !{
          toString: null
        }.propertyIsEnumerable('toString');
        var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
        var dontEnumsLength = dontEnums.length;
        return function (obj) {
          if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
          }

          var result = [];
          var prop;
          var i;

          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }

          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }

          return result;
        };
      })();
    }
  }
  /* global $, $J, helper */

  /* eslint-env es6 */


  helper.imageLib = {
    isNumber: function (value) {
      return /(px|%)$/.test(value);
    },
    getSize: function (node, count) {
      // eslint-disable-next-line
      return new Promise(function (resolve, reject) {
        var size = $(node).getInnerSize();

        if (!count) {
          count = 100;
        }

        count -= 1;

        if (!size.width && !size.height && count > 0) {
          setTimeout(function () {
            helper.imageLib.getSize(node, count).then(resolve);
          }, 16);
        } else {
          resolve(size);
        }
      });
    },
    // just for pixels
    getBackgroundValue: function (value) {
      var result = null;

      if (value && /px$/.test(value)) {
        result = parseInt(value, 10);
      }

      return result;
    },
    // just for pixels
    getBackgroundSize: function (node) {
      var result = null;
      var value = $(node).getCss('background-size');

      if (value) {
        value = value.split(',')[0].split(' ');
        var w = helper.imageLib.getBackgroundValue((value[0] || '').trim());
        var h = helper.imageLib.getBackgroundValue((value[1] || '').trim());

        if (w !== null) {
          result = {
            width: w
          };
        }

        if (h !== null) {
          if (!result) {
            result = {};
          }

          result.height = h;
        }
      }

      return result;
    },
    calcProportionalBackgroundSize: function (bgSize, infoSize) {
      var result = {
        width: infoSize.width,
        height: infoSize.height
      };

      if (bgSize.width && infoSize.width > bgSize.width) {
        result.width = bgSize.width;
        result.height = bgSize.width * infoSize.height / infoSize.width;
      }

      if (bgSize.height && infoSize.height > bgSize.height) {
        result.height = bgSize.height;
        result.width = bgSize.height * infoSize.width / infoSize.height;
      }

      return result;
    },
    getBackgroundPositionValue: function (value) {
      var result;

      switch (value) {
        case 'top':
        case 'left':
          result = 0;
          break;

        case 'center':
          result = 50;
          break;

        case 'right':
        case 'bottom':
          result = 100;
          break;

        default:
          if (helper.imageLib.isNumber(value)) {
            result = parseInt(value, 10);
          } else {
            result = 0;
          }

      }

      return result;
    },
    getBackgroundPosition: function (node) {
      var x = {
        side: 'left',
        position: 0,
        sign: '%'
      };
      var y = {
        side: 'top',
        position: 0,
        sign: '%'
      };
      var xIndex = 0;
      var yIndex = 1;
      var value = $(node).getCss('background-position');

      if (value) {
        value = value.replace(/important/, '');
        value = value.replace(/!/g, '');
        value = value.trim();
        value = value.replace(/\s+/g, ' ');
        value = value.split(' ');

        if (value.length > 2) {
          xIndex = 1;
          yIndex = 3;

          if ($J.contains(['left', 'right'], value[0])) {
            x.side = value[0];
          }

          if ($J.contains(['top', 'bottom'], value[2])) {
            y.side = value[2];
          }
        }

        x.position = helper.imageLib.getBackgroundPositionValue(value[xIndex]);
        y.position = helper.imageLib.getBackgroundPositionValue(value[yIndex]);

        if (/px$/.test(value[xIndex])) {
          x.sign = 'px';
        }

        if (/px$/.test(value[yIndex])) {
          y.sign = 'px';
        }
      }

      return {
        x: x,
        y: y
      };
    },
    getPartSize: function (node, side) {
      var result = 0,
          value;

      if ($J.browser.ieMode) {
        value = (node.currentStyle[side] || '0').replace(/px$/, '');
      } else {
        value = (node.getCss(side) || '0').replace(/px$/, '');
      }

      if (isFinite(value)) {
        result = Math.round(parseFloat(value)) - parseFloat(node.getCss('border-top-width') || 0) - parseFloat(node.getCss('border-bottom-width') || 0) - parseFloat(node.getCss('padding-top') || 0) - parseFloat(node.getCss('padding-bottom') || 0);
      }

      return result;
    },
    checkMaxSize: function (size, originSize, dppx) {
      var firstSide, secondSide;

      if (size.width > originSize.width * dppx || size.height > originSize.height * dppx) {
        if (size.width > originSize.width) {
          firstSide = 'width';
          secondSide = 'height';
        } else {
          firstSide = 'height';
          secondSide = 'width';
        }

        size[firstSide] = originSize[firstSide];

        if (size[secondSide]) {
          size[secondSide] = originSize[secondSide];
        }

        size.round = false;
      }

      return size;
    },
    calcImageProportion: function (firstSide, secondSide, proportionSize, baseFirstSize) {
      var prop = proportionSize[secondSide] / proportionSize[firstSide];
      var result = {};
      result[firstSide] = baseFirstSize;
      result[secondSide] = parseInt(prop * result[firstSide], 10);
      return result;
    },
    contain: function (imageSize, containerSize) {
      var result = {
        width: imageSize.width,
        height: imageSize.height
      };

      if (containerSize.width && result.width > containerSize.width) {
        result = helper.imageLib.calcImageProportion('width', 'height', result, containerSize.width);
      }

      if (containerSize.height && result.height > containerSize.height) {
        result = helper.imageLib.calcImageProportion('height', 'width', result, containerSize.height);
      }

      return result;
    },
    cover: function (imageSize, containerSize) {
      var result = {
        width: imageSize.width,
        height: imageSize.height
      };

      if (containerSize.width && result.width < containerSize.width) {
        result = helper.imageLib.calcImageProportion('width', 'height', result, containerSize.width);
      }

      if (containerSize.height && result.height < containerSize.height) {
        result = helper.imageLib.calcImageProportion('height', 'width', result, containerSize.height);
      }

      return result;
    },
    calcProportionSize: function (size, originSize, fitSize) {
      var result = {};
      var w = originSize.width;
      var h = originSize.height;
      var wh = w / h;
      var hw = h / w;

      var setW = function () {
        result.height = size.height;
        result.width = parseInt(wh * size.height, 10);
      };

      var setH = function () {
        result.width = size.width;
        result.height = parseInt(hw * size.width, 10);
      };

      if (size.width > w || size.height > h) {
        if (size.width > w) {
          size.width = w;

          if (size.height) {
            if (size.height > h) {
              size.height = h;
            } else {
              setW();
            }
          }
        } else {
          size.height = h;

          if (size.width) {
            if (size.width > w) {
              size.width = w;
            } else {
              setH();
            }
          }
        }
      }

      if (size.width || size.height) {
        if (size.width && size.height) {
          // if (Math.abs(size.width / size.height - wh) <= Math.abs(size.height / size.width - hw)) {
          if (size.width / size.height - wh <= size.height / size.width - hw) {
            setH();
          } else {
            setW();
          }
        } else if (!size.width) {
          setW();
        } else {
          setH();
        }
      }

      if (fitSize) {
        if (helper.imageLib.isNumber(fitSize.width) && helper.imageLib.isNumber(fitSize.height)) {
          w = parseInt(fitSize.width, 10);

          if (/%$/.test(fitSize.width)) {
            w = w / 100 * size.width;
          }

          h = parseInt(fitSize.height, 10);

          if (/%$/.test(fitSize.height)) {
            h = h / 100 * size.height;
          }

          if (w < originSize.width / originSize.height * h) {
            result = helper.imageLib.calcImageProportion('width', 'height', originSize, w);
          } else {
            result = helper.imageLib.calcImageProportion('height', 'width', originSize, h);
          }
        } else {
          if (helper.imageLib.isNumber(fitSize.width)) {
            w = parseInt(fitSize.width, 10);

            if (/%$/.test(fitSize.width)) {
              w = w / 100 * size.width;
            }

            result = helper.imageLib.calcImageProportion('width', 'height', originSize, w);
          }

          if (helper.imageLib.isNumber(fitSize.height)) {
            h = parseInt(fitSize.height, 10);

            if (/%$/.test(fitSize.height)) {
              h = h / 100 * size.height;
            }

            result = helper.imageLib.calcImageProportion('height', 'width', originSize, h);
          }

          if ($J.contains([fitSize.width, fitSize.height], 'initial')) {
            result.width = originSize.width;
            result.height = originSize.height;
          } else if ($J.contains([fitSize.width, fitSize.height], 'cover')) {
            result = helper.imageLib.cover(result, size);
          } else if ($J.contains([fitSize.width, fitSize.height], 'contain')) {
            result = helper.imageLib.contain(result, size);
          }
        }
      }

      return result;
    }
  };
  /* eslint-env es6 */

  /* global $, $J, helper */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none"}] */

  /* eslint no-empty: "error"*/

  helper.InViewModule = function () {
    var elementIsShown = function (node) {
      var result = true;

      if (node.getTagName() !== 'body') {
        if (node.getCss('display') === 'none') {
          result = false;
        } else {
          result = elementIsShown($(node.node.parentNode));
        }
      }

      return result;
    };

    var Timer = /*#__PURE__*/function () {
      "use strict";

      function Timer() {
        this.timer = null;
        this.started = false;
        this.list = [];
      }

      var _proto2 = Timer.prototype;

      _proto2._startTimer = function _startTimer() {
        var _this2 = this;

        if (this.list.length) {
          clearTimeout(this.timer);
          this.timer = setTimeout(function () {
            _this2._check();

            if (_this2.started) {
              _this2._startTimer();
            }
          }, 500);
        }
      };

      _proto2._check = function _check() {
        this.list.forEach(function (obj) {
          var isShown = elementIsShown(obj.obj.node);
          var callCB = isShown !== obj.obj.isShown;
          obj.obj.isShown = isShown;

          if (callCB) {
            obj.callback(obj.obj);
          }
        });
      };

      _proto2.push = function push(obj, cb) {
        var insideObj = {
          obj: obj,
          callback: cb
        };
        this.list.push(insideObj);

        if (!this.started) {
          this.started = true;

          this._startTimer();
        }
      };

      _proto2.remove = function remove(node) {
        for (var i = 0, l = this.list.length; i < l; i++) {
          if (this.list[i].obj.node.node === node) {
            this.list.splice(i, 1);
            break;
          }
        }

        if (!this.list.length) {
          this.started = false;
        }
      };

      return Timer;
    }();

    var timerInstance = new Timer();

    var getPercent = function (full, current) {
      var result = 0;

      if (full > 0) {
        result = current / full;
      }

      return result;
    };

    var checkValue = function (value) {
      var result = null;

      if (value !== null) {
        value = parseFloat(value);

        if (!isNaN(value)) {
          if (value < 0) {
            value = 0;
          }

          if (value > 1) {
            value = 1;
          }

          result = value;
        }
      }

      return result;
    };

    var getRootSize = function (node) {
      if (!node) {
        node = window;
      }

      return {
        width: node.offsetWidth || node.innerWidth || document.documentElement.clientWidth,
        height: node.offsetHeight || node.innerHeight || document.documentElement.clientHeight
      };
    };

    var getRootData = function (node, pos, size) {
      var tmp;
      var result = $J.extend({}, pos);

      try {
        tmp = $(node).getBoundingClientRect();
        result.top += tmp.top;
        result.left += tmp.left;
      } catch (e) {
        /* empty */
      }

      result = $J.extend(result, size);
      return result;
    }; // px and % only


    var checkRootMargin = function (value) {
      var result = [];
      var l;
      var i;

      var f = function () {
        return 0;
      };

      if (value && !Array.isArray(value)) {
        if ($J.typeOf(value) === 'number') {
          value = [value];
        } else if ($J.typeOf(value) === 'string') {
          value = value.split(' ');
          l = value.length;

          for (i = 0; i < l; i++) {
            value[i] = value[i].trim();
          }
        } else {
          value = null;
        }
      }

      if (Array.isArray(value)) {
        l = value.length;

        if (l > 4) {
          l = 4;
        }

        value.forEach(function (v) {
          if ($J.contains(['string', 'number'], $J.typeOf(v))) {
            var number = parseInt(v, 10);

            if (/%$/.test(v)) {
              result.push(function (width) {
                return width / 100 * number;
              });
            } else {
              result.push(function (width) {
                return number;
              });
            }
          } else {
            result.push(f);
          }
        }); // [top, right, bottom, left]

        switch (l) {
          case 1:
            result.push(result[0]);
            result.push(result[0]);
            result.push(result[0]);
            break;

          case 2:
            result.push(result[0]);
            result.push(result[1]);
            break;

          case 3:
            result.push(result[1]);
            break;
          // no default
        }
      } else {
        result = [f, f, f, f];
      }

      return result;
    };

    var checkThreshold = function (value) {
      var result = [];
      var tmp;

      if (Array.isArray(value)) {
        value.forEach(function (v) {
          tmp = checkValue(v);

          if (tmp !== null && !$J.contains(result, tmp)) {
            result.push(tmp);
          }
        });
      } else {
        result = [0];
      }

      return result;
    };

    var getIntersectionRatio = function (rect, viewPortSize) {
      var width;
      var height;
      var rw = rect.width || 1;
      var rh = rect.height || 1;
      width = Math.min(rect.left + rw, viewPortSize.left + viewPortSize.width) - Math.max(rect.left, viewPortSize.left);
      height = Math.min(rect.top + rh, viewPortSize.top + viewPortSize.height) - Math.max(rect.top, viewPortSize.top);

      if (width < 0) {
        width = 0;
      }

      if (height < 0) {
        height = 0;
      }

      return getPercent(rw * rh, width * height);
    };

    var checkThresholdQueue = function (arr, lastIntersectionRatio, currentIntersectionRatio) {
      var result = false;
      var i;
      var l = arr.length;

      if (lastIntersectionRatio !== currentIntersectionRatio) {
        if (lastIntersectionRatio < currentIntersectionRatio) {
          for (i = 0; i < l; i++) {
            if (arr[i] === 0 && lastIntersectionRatio === 0 || lastIntersectionRatio < arr[i] && arr[i] <= currentIntersectionRatio) {
              result = true;
              break;
            }
          }
        } else {
          for (i = 0; i < l; i++) {
            if (arr[i] === 1 && lastIntersectionRatio === 1 || lastIntersectionRatio > arr[i] && arr[i] >= currentIntersectionRatio) {
              result = true;
              break;
            }
          }
        }
      }

      return result;
    };

    var FakeIntersectionObserver = /*#__PURE__*/function () {
      "use strict";

      function FakeIntersectionObserver(callback, options) {
        this.callback = callback;
        this.options = $J.extend({
          rootMargin: '0px',
          threshold: [0],
          root: null
        }, options || {});
        this.options.rootMargin = checkRootMargin(this.options.rootMargin);
        this.options.threshold = checkThreshold(this.options.threshold);
        this.nodeList = [];
        this.last = [];
        this.viewPortSize = {
          top: 0,
          left: 0,
          width: 0,
          height: 0
        };
        this.correctPosition = {
          top: 0,
          left: 0
        };
        this.eventWasAdded = false;
        this.bindedRender = this._render.bind(this);
        this.bindedResize = this._resize.bind(this);

        this._resize();
      }

      var _proto3 = FakeIntersectionObserver.prototype;

      _proto3._setEvents = function _setEvents(e) {
        if (!this.eventWasAdded) {
          this.eventWasAdded = true;
          $(window).addEvent('resize', this.bindedResize);
          $(this.options.root || window).addEvent('scroll', this.bindedRender);
        }
      };

      _proto3._removeEvents = function _removeEvents(e) {
        if (this.eventWasAdded) {
          this.eventWasAdded = false;
          $(window).removeEvent('resize', this.bindedResize);
          $(this.options.root || window).removeEvent('scroll', this.bindedRender);
        }
      };

      _proto3._resize = function _resize(e) {
        var m = this.options.rootMargin;
        var rootSize = getRootSize(this.options.root);
        $(m).map(function (v) {
          return v(rootSize.width);
        });
        this.correctPosition = {
          top: 0 - m[0](rootSize.width),
          left: 0 - m[1](rootSize.width)
        };
        this.viewPortSize = {
          width: rootSize.width + m[1](rootSize.width) + m[3](rootSize.width),
          height: rootSize.height + m[0](rootSize.width) + m[2](rootSize.width)
        };
      };

      _proto3._renderElement = function _renderElement(nodeObj) {
        var result = null;

        if (nodeObj.isShown) {
          var rootData = getRootData(this.options.root, this.correctPosition, this.viewPortSize);
          var intersectionRatio = getIntersectionRatio(nodeObj.node.node.getBoundingClientRect(), rootData);

          if (checkThresholdQueue(this.options.threshold, nodeObj.intersectionRatio, intersectionRatio)) {
            nodeObj.intersectionRatio = intersectionRatio;
            result = {
              target: nodeObj.node.node,
              intersectionRatio: nodeObj.intersectionRatio,
              isIntersecting: nodeObj.intersectionRatio > 0
            };
          }
        }

        return result;
      };

      _proto3._render = function _render() {
        var _this3 = this;

        var changedNodes = [];
        this.nodeList.forEach(function (node) {
          var result = _this3._renderElement(node);

          if (result) {
            changedNodes.push(result);
          }
        });

        if (changedNodes.length) {
          this.last = changedNodes;
          this.callback(changedNodes);
        }
      };

      _proto3.takeRecords = function takeRecords() {
        this._render();

        return this.last;
      };

      _proto3.observe = function observe(node) {
        var _this4 = this;

        var cbData;
        node = $(node);
        node = {
          node: node,
          isShown: elementIsShown(node),
          intersectionRatio: 0,
          isIntersecting: false
        };
        timerInstance.push(node, function (_node) {
          var result = _this4._renderElement(_node);

          if (result) {
            _this4.last = [result];

            _this4.callback([result]);
          }
        });
        this.nodeList.push(node);

        this._setEvents();

        var result = this._renderElement(node);

        if (result) {
          cbData = result;
        } else {
          cbData = {
            target: node.node.node,
            intersectionRatio: 0,
            isIntersecting: false
          };
        }

        this.callback([cbData]);
      };

      _proto3.unobserve = function unobserve(node) {
        var nodes = [];
        node = $(node);
        this.nodeList.forEach(function (obj) {
          nodes.push(obj.node.node);
        });
        var index = nodes.indexOf(node.node);
        timerInstance.remove(node.node);

        if (index > -1) {
          this.nodeList.splice(index, 1);
        }

        if (!this.nodeList.length) {
          this._removeEvents();
        }
      };

      _proto3.disconnect = function disconnect() {
        this.nodeList.forEach(function (node) {
          timerInstance.remove(node.node);
        });
        this.nodeList = [];

        this._removeEvents();
      };

      return FakeIntersectionObserver;
    }();

    var Instance = /*#__PURE__*/function () {
      "use strict";

      function Instance(callback, options) {
        var IntersectionObserverClass = window.IntersectionObserver || FakeIntersectionObserver;
        this.observer = new IntersectionObserverClass(callback, options || {});
      }

      Instance.isInView = function isInView(node) {
        var rect = $(node).getBoundingClientRect();
        return (rect.top >= 0 || rect.top - rect.bottom < rect.top) && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
      };

      var _proto4 = Instance.prototype;

      _proto4.takeRecords = function takeRecords() {
        return this.observer.takeRecords();
      };

      _proto4.observe = function observe(target) {
        if (target.node) {
          target = target.node;
        }

        this.observer.observe(target);
      };

      _proto4.unobserve = function unobserve(target) {
        this.observer.unobserve(target);
      };

      _proto4.disconnect = function disconnect() {
        this.observer.disconnect();
      };

      return Instance;
    }();

    return Instance;
  }();
  /* global $J, helper */

  /* eslint-env es6 */


  helper.isIe = function () {
    return $J.browser.uaName === 'edge' || $J.browser.uaName === 'ie' && $J.contains([10, 11], $J.browser.uaVersion);
  };
  /* global helper */

  /* eslint-env es6 */


  helper.isPercentage = function (value) {
    return /^([-]?[0-9]*\.?[0-9]+)%$/.test('' + value);
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.isSVG = function (url) {
    var result = false;

    if (url) {
      url = url.split('?')[0];
      url = url.split('.');
      url = url[url.length - 1];
      result = /svg/i.test(url);
    }

    return result;
  };
  /* global helper */

  /* eslint-env es6 */


  helper.isSpin = function (str) {
    str = (str || '').split('?')[0];
    return /([^#?]+)\/?([^#?]+\.spin)(\?([^#]*))?(#(.*))?$/.test(str);
  };
  /* global helper */

  /* eslint-env es6 */


  helper.isVideo = function (str) {
    str = (str || '').split('?')[0];
    return /([^#?]+)\/?([^#?]+\.(mp4|mov|avi|m4v|mkv|webm|wmv|ogv|ogg))(\?([^#]*))?(#(.*))?$/i.test(str);
  };
  /* global helper */

  /* global $J */

  /* global $ */

  /* eslint-env es6 */


  helper.loadImage = function (sources) {
    return new Promise(function (resolve, reject) {
      var img;
      var container;
      var createContainer = false;

      if ($J.contains(['array', 'string'], $J.typeOf(sources))) {
        if ($J.typeOf(sources) === 'string') {
          sources = [sources];
        }

        img = $J.$new('img').setCss({
          maxWidth: 'none',
          maxHeight: 'none'
        });
        img.attr('referrerpolicy', 'no-referrer-when-downgrade');
        createContainer = true;
      } else {
        img = $(sources);

        if (!img.node.parentNode) {
          createContainer = true;
        }
      }

      if (createContainer) {
        container = $J.$new('div').setCss({
          top: '-10000px',
          left: '-10000px',
          width: '10px',
          height: '10px',
          position: 'absolute',
          overflow: 'hidden'
        });
        container.append(img);
        $($J.D.node.body).append(container);
      } // if (!img.complete || $J.browser.engine === 'gecko') {


      if (!img.node.complete || !img.node.src) {
        var handler = function (e) {
          img.removeEvent('load error', handler);

          if (e.type === 'error') {
            reject({
              error: e
            });
          } else {
            resolve({
              image: e,
              size: {
                width: img.node.naturalWidth || img.node.width,
                height: img.node.naturalHeight || img.node.height
              }
            });
          }

          if (container) {
            container.remove();
          }
        };

        img.addEvent('load error', handler);

        if (container && $J.typeOf(sources) === 'array') {
          img.attr('src', sources[0]);

          if (sources[1]) {
            // img.attr('srcset', encodeURI(sources[1]) + ' 2x');
            img.attr('srcset', sources[1] + ' 2x');
          }
        }
      } else {
        if (container) {
          container.remove();
        }

        resolve({
          image: null,
          size: img.getSize()
        });
      }
    });
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.loadStylesheet = function (url, id, shadowRoot, selector) {
    return new Promise(function (resolve, reject) {
      var alreadyIncluded = false;
      var rootElement = shadowRoot || $J.D.node;
      $J.$A(rootElement.querySelectorAll('link')).forEach(function (link) {
        var href = $(link).attr('href') || '';

        if ($J.getAbsoluteURL(href) === $J.getAbsoluteURL(url)) {
          alreadyIncluded = true;
        }
      });

      if (alreadyIncluded) {
        resolve();
      } else {
        var slink = $J.$new('link');

        if (id !== $J.U) {
          slink.node.id = id;
        }

        slink.node.rel = 'stylesheet';
        slink.node.type = 'text/css';

        slink.node.onload = function () {
          resolve();
        };

        slink.node.onerror = function (e) {
          reject(e);
        };

        slink.node.href = url;
        var root = $J.D.node.head || $J.D.node.getElementsByTagName('head')[0] || $J.D.node.body || $J.D.node.documentElement;

        if (shadowRoot) {
          root = shadowRoot;
        }

        var nextSibling = root.firstChild;
        var addAfter = root.querySelector(selector);

        if (addAfter && addAfter.nextSibling) {
          nextSibling = addAfter.nextSibling;
        }

        root.insertBefore(slink.node, nextSibling);
      }
    });
  };
  /* global helper */

  /* eslint-env es6 */


  helper.makeQueryblePromise = function (promise) {
    if (promise.isResolved) {
      return promise;
    }

    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;
    var result = promise.then(function (res) {
      isPending = false;
      isFulfilled = true;
      return res;
    }, function (err) {
      isPending = false;
      isRejected = true;
      return err;
    });

    result.isFulfilled = function () {
      return isFulfilled;
    };

    result.isPending = function () {
      return isPending;
    };

    result.isRejected = function () {
      return isRejected;
    };

    return result;
  };
  /* global helper */

  /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint-env es6 */


  helper.objEach = function (obj, cb) {
    var index = 0;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cb(key, obj[key], index);
        index += 1;
      }
    }
  };
  /* global $, $J, helper */

  /* eslint quote-props: ["off", "always"] */

  /* eslint-env es6 */


  helper.paramsFromQueryString = function () {
    var IMG_OPTION_ALIAS = {
      w: 'scale.width',
      h: 'scale.height',
      cw: 'crop.width',
      ch: 'crop.height',
      cx: 'crop.x',
      cy: 'crop.y',
      q: 'quality',
      s: 'size',
      // p         : 'profile', // WE SHOULD UPDATE NGINX CONFIGS FOR THIS
      text: 'text.text',
      watermark: 'watermark.image',
      'watermark.w': 'watermark.scale.width',
      'watermark.h': 'watermark.scale.height',
      'watermark.cw': 'watermark.crop.width',
      'watermark.ch': 'watermark.crop.height',
      'watermark.cx': 'watermark.crop.x',
      'watermark.cy': 'watermark.crop.y'
    }; // fix: if the '<meta http-equiv="Content-Type" content="text/html;charset=utf-8">' is absent

    var decodeURIComponentX = function (str) {
      var out = '';
      var i = 0;
      var l;
      var x;
      var arr = str.split(/(%(?:D0|D1)%.{2})/);

      for (l = arr.length; i < l; i++) {
        try {
          x = decodeURIComponent(arr[i]);
        } catch (e) {
          x = arr[i];
        }

        out += x;
      }

      return out;
    };
    /**
     * Converts query string to Object
     * @param  {String} query   Query string
     * @return {Object}
     */


    return function (query) {
      var params = {};

      if (query) {
        $(query.split('&')).forEach(function (pair) {
          var setting = pair.split('='); // Convert option alias to a real name

          setting[0] = IMG_OPTION_ALIAS[setting[0]] || setting[0];
          setting[0].trim().split('.').reduce(function (res, val, ind, col) {
            if (/^\d$/.test(val)) {
              // save text.0.text='hello' as object and then convert to array
              res.__toArray = true;
            }

            if (res[val] === undefined) {
              if (ind < col.length - 1) {
                res[val] = {};
              } else {
                // res[val] = decodeURIComponent(setting[1] || '');
                res[val] = decodeURIComponentX(setting[1] || '');
              }
            }

            return res[val];
          }, params);
        });
        $($J.hashKeys(params)).forEach(function (key) {
          var objKeys;

          if (typeof params[key] === 'object' && params[key].__toArray) {
            delete params[key].__toArray;
            objKeys = $J.hashKeys(params[key]);
            params[key] = $(objKeys).map(function (idx) {
              return params[key][idx];
            });
          }
        });
      }

      return params;
    };
  }();
  /* global $, $J, helper */

  /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint no-continue: "off" */

  /* eslint no-loop-func: "off" */

  /* eslint-env es6 */

  /**
   * Convert JSON data to query string
   * @param  {Object} data - JSON data
   * @param  {String} [prefix] Prefix added to parameter name in query string
   * @return {[type]}          Query string.
   */


  helper.paramsToQueryString = function () {
    var URL_OPTIONS_ALIASES = {
      'scale.width': 'w',
      'scale.height': 'h',
      'crop.width': 'cw',
      'crop.height': 'ch',
      'crop.x': 'cx',
      'crop.y': 'cy',
      'quality': 'q',
      'size': 's',
      'text.text': 'text',
      'watermark.image': 'watermark',
      'watermark.scale.width': 'watermark.w',
      'watermark.scale.height': 'watermark.h',
      'watermark.crop.width': 'watermark.cw',
      'watermark.crop.height': 'watermark.ch',
      'watermark.crop.x': 'watermark.cx',
      'watermark.crop.y': 'watermark.cy'
    };

    var paramsToQueryString = function (data, prefix) {
      var k;
      var value;
      var results = [];

      for (k in data) {
        if (!Object.prototype.hasOwnProperty.call(data, k)) {
          continue;
        }

        if ((k + '').substring(0, 2) === '$J') {
          continue;
        }

        value = data[k];

        if ($J.typeOf(value) === 'object') {
          value = paramsToQueryString(value, (prefix || '') + k + '.');
          results.push(value);
        } else if ($J.typeOf(value) === 'array') {
          $(value).forEach(function (item, idx) {
            value = paramsToQueryString(item, (prefix || '') + k + '.' + idx + '.');
            results.push(value);
          });
        } else {
          // results.push((prefix || '') + k + '=' + encodeURIComponent(value));
          var paramName = (prefix || '') + k;
          paramName = URL_OPTIONS_ALIASES[paramName] || paramName;
          results.push(paramName + '=' + encodeURIComponent(value));
        }
      }

      return results.join('&');
    };

    return paramsToQueryString;
  }();
  /* global helper */

  /* eslint no-restricted-properties: "off" */

  /* eslint-env es6 */


  helper.round = function (value, count, noTail) {
    var v;

    if (!count) {
      count = 0;
    }

    v = Math.pow(10, count);

    if (noTail) {
      v = parseInt(value * v, 10) / v;
    } else {
      v = Math.round(value * v) / v;
    }

    return v;
  };
  /* global helper */

  /* eslint-env es6 */


  helper.roundSize = function (value, roundValue) {
    if (!roundValue) {
      roundValue = 100;
    }

    if (value) {
      value = Math.ceil(value / roundValue) * roundValue;
    }

    return value;
  };
  /* global $J, helper */

  /* global globalVariables */

  /* eslint new-parens: "off" */

  /* eslint-env es6 */


  helper.sendRawStats = function (statsData, useBeacon) {
    try {
      var xhr = null;
      var endpoint = ($J.browser.ieMode < 11 ? globalVariables.SIRV_HTTP_PROTOCOL : 'https:') + '//stats.sirv.com/' + +new Date();

      if (useBeacon === true && navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, helper.paramsToQueryString(statsData));
        return;
      }

      if ($J.browser.features.xhr2) {
        xhr = new XMLHttpRequest();
      } else if ($J.W.node.XDomainRequest) {
        xhr = new XDomainRequest();
      }

      if (!xhr) {
        return;
      }

      xhr.open('POST', endpoint);

      if (xhr.responseType !== undefined) {
        xhr.responseType = 'text';
      }

      xhr.send(helper.paramsToQueryString(statsData));
    } catch (ex) {//empty
    }
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.sliderLib = {
    // getIndexFromDirection: (currentIndex, direction, length, loop) => {
    //     let index = currentIndex;
    //     switch (direction) {
    //         case 'next':
    //             index += 1;
    //             break;
    //         case 'prev':
    //             index -= 1;
    //             break;
    //         default:
    //             return currentIndex;
    //     }
    //     if (loop) {
    //         index = helper.getArrayIndex(index, length);
    //     } else {
    //         if (index < 0) {
    //             index = 0;
    //         } else if (index > length - 1) {
    //             index = length - 1;
    //         }
    //     }
    //     return index;
    // },
    findIndex: function (value, currentIndex, l, loop) {
      var result = null;

      if ($J.typeOf(value) === 'string') {
        switch (value) {
          case 'next':
            value = currentIndex + 1;
            break;

          case 'prev':
            value = currentIndex - 1;
            break;
          // no default
        }
      }

      if ($J.typeOf(value) === 'number') {
        result = value;

        if (result < 0) {
          if (loop) {
            result = helper.getArrayIndex(result, l);
          } else {
            result = 0;
          }
        } else if (value >= l) {
          if (loop) {
            result = helper.getArrayIndex(result, l);
          } else {
            result = l - 1;
          }
        }
      }

      return result;
    },
    // getDirectionFromIndex: function (currentIndex, index, length, loop) {
    //     var direction = 'next', fl, rl;
    //     function getForwardLeft() {
    //         var result;
    //         if (index < currentIndex) {
    //             result = currentIndex - index;
    //         } else {
    //             result = length - index + currentIndex;
    //         }
    //         return result;
    //     }
    //     function getForwardRight() {
    //         var result;
    //         if (currentIndex < index) {
    //             result = index - currentIndex;
    //         } else {
    //             result = length - currentIndex + index;
    //         }
    //         return result;
    //     }
    //     if (loop) {
    //         fl = getForwardLeft();
    //         rl = getForwardRight();
    //         if (fl === rl && currentIndex > index || fl < rl) {
    //             direction = 'prev';
    //         }
    //     } else {
    //         if (index < currentIndex) { direction = 'prev'; }
    //     }
    //     return direction;
    // },
    getSrc: function (src) {
      var result = null;

      if ($J.defined(src) && (src + '').trim() !== '') {
        result = src + '';
      }

      return result;
    }
  };
  /* global $, $J, helper */

  /* eslint-env es6 */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  helper.sortSlidesByOrder = function (order, slides) {
    var oldSlidesArr = slides.slice();
    var newSlidesArr = [];

    if (order && order.length) {
      for (var i = 0, l = Math.min(order.length, oldSlidesArr.length); i < l; i++) {
        for (var j = 0, l2 = oldSlidesArr.length; j < l2; j++) {
          if (globalVariables.SLIDE.NAMES.indexOf(order[i]) === oldSlidesArr[j].type && oldSlidesArr[j].enabled) {
            newSlidesArr.push(oldSlidesArr[j]);
            oldSlidesArr.splice(j, 1);
            break;
          }
        }
      }
    }

    oldSlidesArr.forEach(function (item) {
      newSlidesArr.push(item);
    });
    return newSlidesArr;
  };
  /* global $J, helper */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint-env es6 */

  /* eslint-env es6 */


  helper.spinLib = function () {
    // eslint-disable-next-line no-unused-vars
    var FULLSCREEN_PERCENT_WITHOUT_ACTION = 15; // 0% - 100%

    var sirvlib = {
      calcProportionSize: function (spinSize, originSize, isFullscreen, oldSize) {
        var width = originSize.width;
        var height = originSize.height;
        var tmp; // if (isFullscreen) {
        //     if (spinSize.width > spinSize.height) {
        //         spinSize.height -= 20;
        //     } else {
        //         spinSize.width -= 20;
        //     }
        // }

        if (width > spinSize.width) {
          tmp = height / width;
          width = spinSize.width;
          height = parseInt(width * tmp, 10);
        }

        if (height > spinSize.height) {
          tmp = width / height;
          height = spinSize.height;
          width = parseInt(height * tmp, 10);
        }
        /* eslint-disable */
        // if (isFullscreen) {


        if (oldSize) {// if (oldSize.width / (originSize.width / 100) >= 100 - spinLib.FULLSCREEN_PERCENT_WITHOUT_ACTION) {
          //     width = oldSize.width;
          //     height = oldSize.height;
          // }
        } else {
          if (originSize.width < width) {
            width = originSize.width;
            height = originSize.height;
          }
        } // }

        /* eslint-enable */


        return {
          width: width,
          height: height
        };
      },
      reverse: function (col, row, arr) {
        if (col) {
          for (var i = 0, l = arr.length; i < l; i++) {
            arr[i].reverse();
          }
        }

        if (row) {
          arr.reverse();
        }

        return arr;
      },
      getNextIndex: function (currentValue, value, direction, length, loop) {
        var result;

        if (direction) {
          if (direction === 'next') {
            result = currentValue + value;

            if (loop) {
              result = helper.getArrayIndex(result, length);
            } else if (result >= length) {
              result = length - 1;
            }
          } else {
            result = currentValue - value;

            if (loop) {
              result = helper.getArrayIndex(result, length);
            } else if (result < 0) {
              result = 0;
            }
          }
        } else {
          result = value;

          if (loop) {
            result = helper.getArrayIndex(result, length);
          } else {
            if (result >= length) {
              result = length - 1;
            }

            if (result < 0) {
              result = 0;
            }
          }
        }

        return result;
      },
      getUrl: function (path) {
        var url = path;
        url = url.split('/');
        url.splice(url.length - 1, 1);
        url = url.join('/');
        url = url.replace(/https?:/, '');
        return url;
      },
      swapLayers: function (layers, revers) {
        var result = layers;

        if (revers) {
          result = {};
          helper.objEach(layers, function (rowKey, rowValue) {
            helper.objEach(rowValue, function (colKey, colValue) {
              if (!result[colKey]) {
                result[colKey] = {};
              }

              result[colKey][rowKey] = colValue;
            });
          });
        }

        return result;
      },
      getMaxCount: function (layers) {
        var result = 0;
        helper.objEach(layers, function (key, value, index) {
          var l = $J.hashKeys(value).length;

          if (result < l) {
            result = l;
          }
        });
        return result;
      },
      correctArray: function (keysArray, count) {
        var i;
        var result = [];
        var correctCount = count - keysArray.length;
        var diff;
        var l = keysArray.length;
        var curr;
        var next;

        if (correctCount > 0) {
          for (i = 0; i < l - 1; i++) {
            curr = parseInt(keysArray[i], 10);
            next = parseInt(keysArray[i + 1], 10);
            diff = next - curr - 1;
            result.push(keysArray[i]);

            if (diff > 0) {
              if (correctCount > 0) {
                if (diff > correctCount) {
                  diff = correctCount;
                }

                while (diff > 0) {
                  diff -= 1;
                  correctCount -= 1;
                  result.push(keysArray[i]);
                }
              }
            }
          }

          result.push(keysArray[l - 1]);

          if (correctCount > 0) {
            diff = parseInt(keysArray[0], 10) - 1;

            if (diff > 0) {
              while (diff > 0) {
                diff -= 1;
                correctCount -= 1;
                result.unshift(keysArray[0]);
              }
            }

            if (correctCount > 0) {
              while (correctCount > 0) {
                correctCount -= 1;
                result.push(keysArray[keysArray.length - 1]);
              }
            }
          }
        } else {
          result = JSON.parse(JSON.stringify(keysArray));
        }

        return result;
      },
      getFrames: function (frames, count) {
        var result = {};
        var newKeys = sirvlib.correctArray($J.hashKeys(frames), count);
        $(newKeys).forEach(function (value, index) {
          result[index + 1 + ''] = frames[value];
        });
        return result;
      },
      checkLayers: function (layers) {
        var result = {};
        var count = sirvlib.getMaxCount(layers);
        helper.objEach(layers, function (key, value, index) {
          result[index + 1 + ''] = sirvlib.getFrames(value, count);
        });
        return result;
      }
    };
    return sirvlib;
  }();
  /* eslint-env es6 */

  /* global $, $J, helper */

  /* global sirvRequire */

  /* eslint quote-props: ["off", "always"]*/

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /*eslint no-lonely-if: "off"*/

  /* eslint-disable no-multi-spaces */

  /* eslint-disable no-use-before-define */


  helper.videoModule = function () {
    var vimeoPromise = null;
    var youtubePromise = null;
    var sources = {};
    var youtubeImgs = {
      'thumb1': '1.jpg',
      // 120x90
      'thumb2': '2.jpg',
      // 120x90
      'thumb3': '3.jpg',
      // 120x90
      'def0': '0.jpg',
      // 480x360
      'def1': 'default.jpg',
      // 120x90
      'middleQuality': 'mqdefault.jpg',
      // 320x180
      'highQuality': 'hqdefault.jpg',
      // 480x360
      'maxSize': 'maxresdefault.jpg' // 1920x1080

    };

    var getVimeoJSON = function (url) {
      return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);

        xhttp.onreadystatechange = function () {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              try {
                var result = JSON.parse(xhttp.responseText)[0];
                resolve(result);
              } catch (e) {
                reject(null);
              }
            }
          }
        };

        xhttp.send(true);
      });
    };

    var isHtmlVideo = function (node) {
      node = $(node);
      return node && node.getTagName && node.getTagName() === 'video';
    };

    var getYouTobeId = function (url) {
      var result = null;
      url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

      if (url[2] !== undefined) {
        url = url[2].split(/[^0-9a-z_\-]/i);

        if (url.length && url[0]) {
          result = url[0];
        }
      }

      return result;
    };

    var getVimeoId = function (url) {
      var result = null;
      url = url.match(/(?:https?:\/\/)?(?:www.)?(?:player.)?vimeo.com\/(?:[a-z]*\/)*([0-9]{6,11})[?]?.*/)[1];

      if (url) {
        result = url;
      }

      return result;
    };

    var getSrc = function (node) {
      var result = null;
      var children;
      var child;

      if ($J.typeOf(node) === 'string') {
        result = node;
      } else {
        node = $(node);

        if (node && $J.typeOf(node.node) === 'element') {
          if ($J.contains(['iframe', 'div'], node.getTagName())) {
            result = node.attr('src') || node.attr('data-src');
          } else if (isHtmlVideo(node)) {
            result = node.attr('src') || node.attr('data-src');

            if (!result) {
              result = null;
              children = $J.$A(node.node.children);

              do {
                child = $(children.shift());

                if (child && $J.typeOf(child.node) === 'element' && child.getTagName() === 'source') {
                  result = child.attr('src') || child.attr('data-src');
                }
              } while (!result && child);
            }
          }
        }
      }

      return result;
    };

    var getAPI = function (node) {
      var result = null;

      if (api.isVideo(node)) {
        switch (api.getType(node)) {
          case 'video':
            result = Promise.resolve();
            break;

          case 'vimeo':
            if (!vimeoPromise) {
              // if (!$J.W.node.Vimeo || ($J.W.node.Vimeo && !$J.W.node.Vimeo.Player)) {
              vimeoPromise = new Promise(function (resolve, reject) {
                sirvRequire(['Vimeo'], function (p) {
                  resolve({
                    Player: p
                  } || $J.W.node.Vimeo);
                });
              }); // } else {
              //     vimeoPromise = Promise.resolve($J.W.node.Vimeo);
              // }
            }

            result = vimeoPromise;
            break;

          case 'youtube':
            if (!youtubePromise) {
              if (!$J.W.node.YT) {
                youtubePromise = new Promise(function (resolve, reject) {
                  var f = function () {};

                  var existingEvent = $J.W.node.onYouTubeIframeAPIReady || f;

                  $J.W.node.onYouTubeIframeAPIReady = function () {
                    existingEvent();
                    resolve($J.W.node.YT);
                  };

                  if (!document.querySelector('script[src$="youtube.com/iframe_api"]')) {
                    $J.$new('script', {
                      src: 'https://www.youtube.com/iframe_api'
                    }).appendTo($J.D.node.body);
                  }
                });
              } else {
                youtubePromise = Promise.resolve($J.W.node.YT);
              }
            }

            result = youtubePromise;
            break;
          // no default
        }
      } else {
        result = Promise.reject(true
        /*error*/
        );
      }

      return result;
    };

    var api = {
      aspectratio: 9 / 16,
      getAspectRatio: function (src) {
        return new Promise(function (resolve, reject) {
          var id;
          src = getSrc(src);

          if (src) {
            if (sources[src]) {
              resolve(sources[src].aspectratio);
            }
          }

          var type = api.getType(src);

          if (type === 'vimeo') {
            id = getVimeoId(src);

            if (id) {
              getVimeoJSON('https://vimeo.com/api/v2/video/' + id + '.json').then(function (data) {
                resolve(data ? data.height / data.width : api.aspectratio);
              }).catch(function (error) {
                reject(error);
              });
            } else {
              resolve(api.aspectratio);
            }
          } else {
            resolve(api.aspectratio);
          }
        });
      },
      getId: function (src) {
        var result = null;

        if (api.isVideo(src)) {
          src = getSrc(src);

          switch (api.getType(src)) {
            case 'youtube':
              result = getYouTobeId(src);
              break;

            case 'vimeo':
              result = getVimeoId(src);
              break;
            // no default
          }
        }

        return result;
      },
      isVideo: function (src) {
        var result = false;

        if (isHtmlVideo(src)) {
          result = true;
        } else {
          src = getSrc(src);

          if (src) {
            result = $J.contains(['youtube', 'vimeo'], api.getType(src));
          }
        }

        return result;
      },
      getType: function (src) {
        var result = null;

        if (isHtmlVideo(src)) {
          result = 'video';
        } else {
          src = getSrc(src);

          if (src) {
            if (/^(https?:)?\/\/((www\.)?youtube\.com|youtu\.be)\//.test(src)) {
              result = 'youtube';
            } else if (/^(https?:)?\/\/((www|player)\.)?vimeo\.com\//.test(src)) {
              result = 'vimeo';
            }
          }
        }

        return result;
      },
      getImageSrc: function (src, getAll) {
        return new Promise(function (resolve, reject) {
          var type;
          var thumbUrl = null;
          var id;
          var node;

          if (src && $(src) && $J.typeOf($(src).node) === 'element') {
            node = src;
          }

          src = getSrc(src);

          if (src) {
            if (sources[src]) {
              if (getAll) {
                if (sources[src].all) {
                  resolve(sources[src].all);
                  return;
                }
              } else {
                if (sources[src].url) {
                  resolve(sources[src].url);
                  return;
                } else if (sources[src].all) {
                  resolve(sources[src].all.thumbnail.url);
                  return;
                }
              }
            }

            type = api.getType(node || src);

            switch (type) {
              case 'youtube':
                id = getYouTobeId(src);

                if (id) {
                  if (getAll) {
                    thumbUrl = {
                      thumbnail: {
                        url: 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def1,
                        width: 120,
                        height: 90
                      },
                      medium: {
                        url: 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def0,
                        width: 480,
                        height: 360
                      }
                    };
                  } else {
                    thumbUrl = 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def1;
                  }

                  if (!sources[src]) {
                    sources[src] = {};
                  }

                  sources[src].aspectratio = api.aspectratio;

                  if (getAll) {
                    sources[src].all = thumbUrl;
                  } else {
                    sources[src].url = thumbUrl;
                  }
                }

                resolve(thumbUrl);
                break;

              case 'vimeo':
                id = getVimeoId(src);

                if (id) {
                  thumbUrl = 'https://vimeo.com/api/v2/video/' + id + '.json';
                  getVimeoJSON(thumbUrl).then(function (data) {
                    var imgUrl = null;

                    if (data) {
                      if (getAll) {
                        imgUrl = {
                          thumbnail: {
                            url: data.thumbnail_small,
                            width: 100,
                            height: 75
                          },
                          medium: {
                            url: data.thumbnail_medium,
                            width: 200,
                            height: 150
                          }
                        };
                      } else {
                        imgUrl = data.thumbnail_small;
                      }
                    }

                    if (imgUrl) {
                      if (!sources[src]) {
                        sources[src] = {};
                      }

                      if (getAll) {
                        sources[src].all = imgUrl;
                      } else {
                        sources[src].url = imgUrl;
                      }

                      sources[src].aspectratio = data.height / data.width;
                    }

                    resolve(imgUrl);
                  }).catch(reject);
                } else {
                  resolve(thumbUrl);
                }

                break;

              case 'video':
                if (node) {
                  node = $(node.node.cloneNode(true));

                  if (node.attr) {
                    thumbUrl = node.attr('poster');
                  }

                  if (thumbUrl && thumbUrl.trim() !== '') {
                    if (!sources[src]) {
                      sources[src] = {};
                    }

                    sources[src].aspectratio = api.aspectratio;

                    if (getAll) {
                      sources[src].all = {
                        thumbnail: {
                          url: thumbUrl,
                          width: 200,
                          height: 150
                        },
                        medium: {
                          url: thumbUrl,
                          width: 200,
                          height: 150
                        }
                      };
                      resolve(sources[src].all);
                    } else {
                      sources[src].url = thumbUrl;
                      resolve(thumbUrl);
                    }
                  } else {
                    var timeOfPoster = 0;
                    var canvas = $J.$new('canvas');
                    var context = canvas.node.getContext('2d');

                    var clear = function () {
                      // $J.$A(node.node.children).forEach(function (child) {
                      //     child = $(child)
                      //     if (child && child.getTagName() === 'source') {
                      //         child.removeEvent('abort error');
                      //     }
                      // });
                      node.removeEvent('loadedmetadata loadeddata abort error stalled');
                      node.remove();
                    };

                    var addSrc = function () {
                      var _src = node.attr('data-src');

                      if (_src) {
                        node.attr('src', _src);
                      }

                      $J.$A(node.node.children).forEach(function (child) {
                        child = $(child);

                        if (child && child.getTagName() === 'source') {
                          _src = child.attr('data-src');

                          if (_src) {
                            child.attr('src', _src);
                          }
                        }
                      });
                    };

                    addSrc();
                    node.setCss({
                      top: -100000,
                      left: -100000,
                      width: 200,
                      height: 150,
                      position: 'absolute'
                    });
                    node.muted = true;
                    node.addEvent('loadedmetadata', function (e) {
                      var size = node.getSize();

                      if (!size.width || !size.height) {
                        size.width = 200;
                        size.height = 150;
                      }

                      node.setCss({
                        width: size.width,
                        height: size.height
                      });
                      canvas.node.width = size.width;
                      canvas.node.height = size.height;

                      if (timeOfPoster < node.node.duration) {
                        node.node.currentTime = timeOfPoster;
                      }
                    }); // $J.$A(node.node.children).forEach(function (child) {
                    //     child = $(child);
                    //     if (child && child.getTagName() === 'source') {
                    //         child.addEvent('abort error', function (e) {
                    //             clear();
                    //             callback(null);
                    //         });
                    //     }
                    // });

                    node.addEvent('loadeddata', function (e) {
                      node.currentTime = timeOfPoster;
                    });
                    node.addEvent('abort error stalled', function (e) {
                      clear();
                      reject(null);
                    });
                    node.addEvent('seeked', function (e) {
                      context.drawImage(node.node, 0, 0, canvas.node.width, canvas.node.height);
                      clear();

                      try {
                        thumbUrl = canvas.node.toDataURL();
                      } catch (ex) {// empty
                      }

                      if (thumbUrl) {
                        if (!sources[src]) {
                          sources[src] = {};
                        }

                        sources[src].aspectratio = api.aspectratio;

                        if (getAll) {
                          sources[src].all = {
                            thumbnail: {
                              url: thumbUrl,
                              width: 200,
                              height: 150
                            },
                            medium: {
                              url: thumbUrl,
                              width: 200,
                              height: 150
                            }
                          };
                          resolve(sources[src].all);
                        } else {
                          sources[src].url = thumbUrl;
                          resolve(thumbUrl);
                        }
                      } else {
                        resolve(thumbUrl);
                      }
                    });
                    node.appendTo($J.D.node.body);
                    node.node.load();
                  }
                } else {
                  resolve(thumbUrl);
                }

                break;

              default:
                resolve(thumbUrl);
            }
          } else {
            resolve(thumbUrl);
          }
        });
      },
      getSrc: getSrc,
      getAPI: getAPI
    };
    return api;
  }();

  return helper;
});