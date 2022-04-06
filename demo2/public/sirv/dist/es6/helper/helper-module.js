Sirv.define('helper', ['bHelpers', 'magicJS', 'globalVariables'], (bHelpers, magicJS, globalVariables) => {
  const $J = magicJS;
  const $ = $J.$;
  const helper = {};
  /* global $J, helper */

  /* eslint-env es6 */

  class WaitToStart {
    constructor() {
      this.started = false;
      this.callbacks = [];
    }

    wait(cb) {
      if (this.started) {
        cb();
      } else {
        this.callbacks.push(cb);
      }
    }

    start() {
      if (!this.started) {
        this.started = true;
        this.callbacks.forEach(cb => cb());
      }
    }

    destroy() {
      this.callbacks = [];
    }

  }

  helper.WaitToStart = WaitToStart;
  /* global $J, helper */

  /* eslint-env es6 */
  // helper.addCss = (css, id, position) => {
  //     if (!position) { position = 'top'; }
  //     const stl = $J.$new('style', { id: (id || 'sirv-module-' + helper.generateUUID()), type: 'text/css' }).appendTo((document.head || document.body), position);
  //     stl.node.innerHTML = css;
  //     return stl;
  // };

  helper.addCss = (css, id, position, root, selector) => {
    let rootNode = document.head || document.body;
    const stl = $J.$new('style', {
      type: 'text/css'
    });
    stl.attr('id', id || 'sirv-module-' + stl.$J_UUID);

    if (!position) {
      position = 'top';
    }

    if (root) {
      rootNode = $(root).node || root;
    }

    let nextSibling;

    if (position === 'top') {
      nextSibling = rootNode.firstChild;
    }

    const addAfter = rootNode.querySelector(selector);

    if (addAfter && addAfter.nextSibling) {
      nextSibling = addAfter.nextSibling;
    }

    rootNode.insertBefore(stl.node, nextSibling);
    stl.node.innerHTML = css;
    return stl;
  };
  /* eslint-env es6 */

  /* global helper */


  helper.cleanQueryString = str => {
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


  helper.createReadOnlyProp = (obj, name, value) => {
    Object.defineProperty(obj, name, {
      value: value,
      writable: false
    });
  };
  /* global $J, helper */

  /* eslint-env es6 */
  // Returns if a value is an object


  const isObject = value => {
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


  helper.debounce = (func, wait, options) => {
    let lastArgs;
    let lastThis;
    let maxWait;
    let result;
    let timerId;
    let lastCallTime;
    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    // const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function');

    const useRAF = !wait && wait !== 0 && $J.browser.features.requestAnimationFrame;

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

    const invokeFunc = time => {
      const args = lastArgs;
      const thisArg = lastThis;
      lastArgs = $J.U;
      lastThis = lastArgs;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    };

    const startTimer = (pendingFunc, _wait) => {
      if (useRAF) {
        $J.browser.cancelAnimationFrame(timerId);
        return $J.browser.requestAnimationFrame(pendingFunc);
      }

      return setTimeout(pendingFunc, _wait);
    };

    const cancelTimer = id => {
      if (useRAF) {
        $J.browser.cancelAnimationFrame(id);
      } else {
        clearTimeout(id);
      }
    };

    const remainingWait = time => {
      const timeSinceLastCall = time - lastCallTime;
      const timeSinceLastInvoke = time - lastInvokeTime;
      const timeWaiting = wait - timeSinceLastCall;
      return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    };

    const shouldInvoke = time => {
      const timeSinceLastCall = time - lastCallTime;
      const timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === $J.U || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    };

    const trailingEdge = time => {
      timerId = $J.U; // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = $J.U;
      lastThis = lastArgs;
      return result;
    };

    const timerExpired = () => {
      const time = Date.now();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = startTimer(timerExpired, remainingWait(time));
      return $J.U;
    };

    const leadingEdge = time => {
      // Reset any `maxWait` timer.
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = startTimer(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    };

    const cancel = () => {
      if (timerId !== $J.U) {
        cancelTimer(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = $J.U;
      lastCallTime = lastArgs;
      lastThis = lastArgs;
      timerId = lastArgs;
    };

    const flush = () => {
      return timerId === $J.U ? result : trailingEdge(Date.now());
    };

    const pending = () => {
      return timerId !== $J.U;
    };

    const debounced = (...args) => {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);
      lastArgs = args;
      lastThis = this;
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


  helper.deepExtend = (() => {
    const extend = (extendingObject, source) => {
      const type = $J.typeOf(source);

      if (!$J.defined(extendingObject)) {
        if (type === 'array') {
          extendingObject = [];
        } else {
          extendingObject = {};
        }
      }

      if (type === 'array') {
        source.forEach((value, index) => {
          const _type = $J.typeOf(value);

          if (_type === 'array' && $J.typeOf(extendingObject[index]) === 'array' || _type === 'object' && $J.typeOf(extendingObject[index]) === 'object') {
            extendingObject[index] = extend(extendingObject[index], value);
          } else {
            extendingObject.push(value);
          }
        });
      } else {
        Object.entries(source).forEach(([key, value]) => {
          const _type = $J.typeOf(value);

          if (_type === 'array' || _type === 'object') {
            extendingObject[key] = extend(extendingObject[key], value);
          } else {
            extendingObject[key] = value;
          }
        });
      }

      return extendingObject;
    };

    return (...args) => {
      let result = null;

      if (args && args.length) {
        result = args.shift();
        args.forEach(value => {
          const _type = $J.typeOf(value);

          if (_type === 'array' || _type === 'object') {
            result = extend(result, value);
          }
        });
      }

      return result;
    };
  })();
  /* global $J, helper */

  /* eslint-env es6 */


  helper.fixSize = (node, size) => {
    node = $(node);

    const checkAuto = (_node, side) => {
      return _node.attr(side) === 'auto';
    };

    const correctSizeValue = value => {
      if (value <= 4) {
        value = 0;
      }

      return value;
    };

    ['width', 'height'].forEach(side => {
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


  helper.generateUUID = () => {
    return parseInt(Math.random() * 10000000, 10);
  };
  /* global helper */

  /* eslint-env es6 */


  helper.getArrayIndex = (index, length) => {
    index %= length;

    if (index < 0) {
      index += length;
    }

    return index;
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.getDPPX = (value, maxValue, upscale) => {
    let result = maxValue / value;
    const count = 100;

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


  helper.getMatrix = node => {
    let result = null;
    let matrix = $(node).getCss('transform') + '';

    const getNumber = str => {
      return parseFloat(str.trim());
    };

    const getTrObj = (arrIndexes, arr) => {
      const _result = {};
      const axises = ['x', 'y', 'z'];
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
      const is3D = matrix.length > 6;
      result.transform = getTrObj(is3D ? [12, 13, 14] : [4, 5], matrix);
      result.scale = getTrObj(is3D ? [0, 5, 10] : [0, 3], matrix);
    }

    return result;
  };
  /* global $J, helper, Promise */

  /* eslint no-throw-literal: "off" */

  /* eslint-env es6 */


  helper.getRemoteData = (() => {
    const __XMLHttpRequest = url => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        if (xhr) {
          xhr.onerror = e => {
            reject(e || true);
          };

          xhr.onload = e => {
            try {
              if (xhr.status === 200) {
                const value = JSON.parse(xhr.responseText);
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

    const getByFetch = (url, referrerPolicy) => {
      return fetch(url, {
        referrerPolicy: referrerPolicy || 'no-referrer-when-downgrade'
      }).then(response => {
        if (response.status === 200) {
          return response.json();
        }

        throw {
          status: response.status,
          data: response
        };
      });
    };

    const getData = window.fetch ? getByFetch : __XMLHttpRequest;

    const __jsonp = (url, callbackName) => {
      return new Promise((resolve, reject) => {
        let scriptOk = false;
        const script = document.createElement('script');

        if (!window[callbackName]) {
          window[callbackName] = (...args) => {
            scriptOk = true;
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(args[0]);
          };
        }

        const checkCallback = () => {
          if (scriptOk) return;
          delete window[callbackName];
          document.body.removeChild(script);
          reject(url);
        };

        script.onreadystatechange = () => {
          if (this.readyState === 'complete' || this.readyState === 'loaded') {
            this.onreadystatechange = null;
            setTimeout(checkCallback, 0);
          }
        };

        script.onerror = checkCallback;
        script.onload = checkCallback;
        script.src = url + '&callback=' + callbackName;
        document.body.appendChild(script);
      });
    };

    return (url, callbackName
    /* for jsonp */
    , referrerPolicy) => {
      return new Promise((resolve, reject) => {
        getData(url, referrerPolicy).then(resolve).catch(err => {
          if (err && err.status && [404, 200].includes(err.status)) {
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
  })();
  /* global helper */

  /* global $ */

  /* eslint-env es6 */


  helper.getSirvType = (() => {
    const isNotEmptyString = str => {
      let result = false;

      if (str) {
        str += '';
        result = str.trim() !== '';
      }

      return result;
    };

    return node => {
      node = $(node);
      let tmp = node.attr('data-type') || node.attr('data-effect');
      const viewContent = node.fetch('view-content');
      let result = null;
      let componentType;
      let imgSrc;

      if (isNotEmptyString(tmp) && tmp !== 'static') {
        const index = globalVariables.SLIDE.NAMES.indexOf(tmp);
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
          if (helper.isSpin(tmp) && node.tagName !== 'img' || viewContent === globalVariables.SLIDE.TYPES.SPIN) {
            componentType = globalVariables.SLIDE.TYPES.SPIN;
          } else if (helper.isVideo(tmp)) {
            componentType = globalVariables.SLIDE.TYPES.VIDEO;
          } else {
            componentType = globalVariables.SLIDE.TYPES.IMAGE;

            if (viewContent) {
              componentType = viewContent;
            }
          }

          imgSrc = tmp;
        } else {
          tmp = node.attr('src');

          if (isNotEmptyString(tmp) && node.tagName === 'img') {
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
  })();
  /* global $, $J, helper */

  /* eslint-env es6 */


  helper.imageLib = {
    isNumber: value => {
      return /(px|%)$/.test(value);
    },
    getSize: (node, count) => {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        const size = $(node).getInnerSize();

        if (!count) {
          count = 100;
        }

        count -= 1;

        if (!size.width && !size.height && count > 0) {
          setTimeout(() => {
            helper.imageLib.getSize(node, count).then(resolve);
          }, 16);
        } else {
          resolve(size);
        }
      });
    },
    // just for pixels
    getBackgroundValue: value => {
      if (value && /px$/.test(value)) {
        return parseInt(value, 10);
      }

      return null;
    },
    // just for pixels
    getBackgroundSize: node => {
      let result = null;
      let value = $(node).getCss('background-size');

      if (value) {
        value = value.split(',')[0].split(' ');
        const w = helper.imageLib.getBackgroundValue((value[0] || '').trim());
        const h = helper.imageLib.getBackgroundValue((value[1] || '').trim());

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
    calcProportionalBackgroundSize: (bgSize, infoSize) => {
      const result = {
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
    getBackgroundPositionValue: value => {
      let result;

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
    getBackgroundPosition: node => {
      const x = {
        side: 'left',
        position: 0,
        sign: '%'
      };
      const y = {
        side: 'top',
        position: 0,
        sign: '%'
      };
      let xIndex = 0;
      let yIndex = 1;
      let value = $(node).getCss('background-position');

      if (value) {
        value = value.replace(/important/, '');
        value = value.replace(/!/g, '');
        value = value.trim();
        value = value.replace(/\s+/g, ' ');
        value = value.split(' ');

        if (value.length > 2) {
          xIndex = 1;
          yIndex = 3;

          if (['left', 'right'].includes(value[0])) {
            x.side = value[0];
          }

          if (['top', 'bottom'].includes(value[2])) {
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
    getPartSize: (node, side) => {
      let result = 0;
      let value;

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
    checkMaxSize: (size, originSize, dppx) => {
      let firstSide;
      let secondSide;

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
    calcImageProportion: (firstSide, secondSide, proportionSize, baseFirstSize) => {
      const prop = proportionSize[secondSide] / proportionSize[firstSide];
      const result = {};
      result[firstSide] = baseFirstSize;
      result[secondSide] = parseInt(prop * result[firstSide], 10);
      return result;
    },
    contain: (imageSize, containerSize) => {
      let result = {
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
    cover: (imageSize, containerSize) => {
      let result = {
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
    calcProportionSize: (size, originSize, fitSize) => {
      let result = {};
      let w = originSize.width;
      let h = originSize.height;
      const wh = w / h;
      const hw = h / w;

      const setW = () => {
        result.height = size.height;
        result.width = parseInt(wh * size.height, 10);
      };

      const setH = () => {
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

          if ([fitSize.width, fitSize.height].includes('initial')) {
            result.width = originSize.width;
            result.height = originSize.height;
          } else if ([fitSize.width, fitSize.height].includes('cover')) {
            result = helper.imageLib.cover(result, size);
          } else if ([fitSize.width, fitSize.height].includes('contain')) {
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

  helper.InViewModule = (() => {
    const elementIsShown = node => {
      let result = true;

      if (node.tagName !== 'body') {
        if (node.getCss('display') === 'none') {
          result = false;
        } else {
          result = elementIsShown($(node.node.parentNode));
        }
      }

      return result;
    };

    class Timer {
      constructor() {
        this.timer = null;
        this.started = false;
        this.list = [];
      }

      _startTimer() {
        if (this.list.length) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this._check();

            if (this.started) {
              this._startTimer();
            }
          }, 500);
        }
      }

      _check() {
        this.list.forEach(obj => {
          const isShown = elementIsShown(obj.obj.node);
          const callCB = isShown !== obj.obj.isShown;
          obj.obj.isShown = isShown;

          if (callCB) {
            obj.callback(obj.obj);
          }
        });
      }

      push(obj, cb) {
        const insideObj = {
          obj: obj,
          callback: cb
        };
        this.list.push(insideObj);

        if (!this.started) {
          this.started = true;

          this._startTimer();
        }
      }

      remove(node) {
        for (let i = 0, l = this.list.length; i < l; i++) {
          if (this.list[i].obj.node.node === node) {
            this.list.splice(i, 1);
            break;
          }
        }

        if (!this.list.length) {
          this.started = false;
        }
      }

    }

    const timerInstance = new Timer();

    const getPercent = (full, current) => {
      let result = 0;

      if (full > 0) {
        result = current / full;
      }

      return result;
    };

    const checkValue = value => {
      let result = null;

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

    const getRootSize = node => {
      if (!node) {
        node = window;
      }

      return {
        width: node.offsetWidth || node.innerWidth || document.documentElement.clientWidth,
        height: node.offsetHeight || node.innerHeight || document.documentElement.clientHeight
      };
    };

    const getRootData = (node, pos, size) => {
      const result = Object.assign({}, pos);

      try {
        const tmp = $(node).getBoundingClientRect();
        result.top += tmp.top;
        result.left += tmp.left;
      } catch (e) {
        /* empty */
      }

      return Object.assign(result, size);
    }; // px and % only


    const checkRootMargin = value => {
      let result = [];

      const f = () => {
        return 0;
      };

      if (value && !Array.isArray(value)) {
        if ($J.typeOf(value) === 'number') {
          value = [value];
        } else if ($J.typeOf(value) === 'string') {
          value = value.split(' ');
          value = value.map(v => v.trim());
        } else {
          value = null;
        }
      }

      if (Array.isArray(value)) {
        let l = value.length;

        if (l > 4) {
          l = 4;
        }

        value.forEach(v => {
          if (['string', 'number'].includes($J.typeOf(v))) {
            const number = parseInt(v, 10);

            if (/%$/.test(v)) {
              result.push(width => {
                return width / 100 * number;
              });
            } else {
              result.push(width => {
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

    const checkThreshold = value => {
      let result = [];

      if (Array.isArray(value)) {
        value.forEach(v => {
          const tmp = checkValue(v);

          if (tmp !== null && !result.includes(tmp)) {
            result.push(tmp);
          }
        });
      } else {
        result = [0];
      }

      return result;
    };

    const getIntersectionRatio = (rect, viewPortSize) => {
      const rw = rect.width || 1;
      const rh = rect.height || 1;
      let width = Math.min(rect.left + rw, viewPortSize.left + viewPortSize.width) - Math.max(rect.left, viewPortSize.left);
      let height = Math.min(rect.top + rh, viewPortSize.top + viewPortSize.height) - Math.max(rect.top, viewPortSize.top);

      if (width < 0) {
        width = 0;
      }

      if (height < 0) {
        height = 0;
      }

      return getPercent(rw * rh, width * height);
    };

    const checkThresholdQueue = (arr, lastIntersectionRatio, currentIntersectionRatio) => {
      let result = false;

      if (lastIntersectionRatio !== currentIntersectionRatio) {
        if (lastIntersectionRatio < currentIntersectionRatio) {
          for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === 0 && lastIntersectionRatio === 0 || lastIntersectionRatio < arr[i] && arr[i] <= currentIntersectionRatio) {
              result = true;
              break;
            }
          }
        } else {
          for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === 1 && lastIntersectionRatio === 1 || lastIntersectionRatio > arr[i] && arr[i] >= currentIntersectionRatio) {
              result = true;
              break;
            }
          }
        }
      }

      return result;
    };

    class FakeIntersectionObserver {
      constructor(callback, options) {
        this.callback = callback;
        this.options = Object.assign({
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

      _addEvents(e) {
        if (!this.eventWasAdded) {
          this.eventWasAdded = true;
          $(window).addEvent('resize', this.bindedResize);
          $(this.options.root || window).addEvent('scroll', this.bindedRender);
        }
      }

      _removeEvents(e) {
        if (this.eventWasAdded) {
          this.eventWasAdded = false;
          $(window).removeEvent('resize', this.bindedResize);
          $(this.options.root || window).removeEvent('scroll', this.bindedRender);
        }
      }

      _resize(e) {
        const m = this.options.rootMargin;
        const rootSize = getRootSize(this.options.root); // m.map((v) => {
        //     return v(rootSize.width);
        // });

        this.correctPosition = {
          top: 0 - m[0](rootSize.width),
          left: 0 - m[1](rootSize.width)
        };
        this.viewPortSize = {
          width: rootSize.width + m[1](rootSize.width) + m[3](rootSize.width),
          height: rootSize.height + m[0](rootSize.width) + m[2](rootSize.width)
        };
      }

      _renderElement(nodeObj) {
        let result = null;

        if (nodeObj.isShown) {
          const rootData = getRootData(this.options.root, this.correctPosition, this.viewPortSize);
          const intersectionRatio = getIntersectionRatio(nodeObj.node.node.getBoundingClientRect(), rootData);

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
      }

      _render() {
        const changedNodes = [];
        this.nodeList.forEach(node => {
          const result = this._renderElement(node);

          if (result) {
            changedNodes.push(result);
          }
        });

        if (changedNodes.length) {
          this.last = changedNodes;
          this.callback(changedNodes);
        }
      }

      takeRecords() {
        this._render();

        return this.last;
      }

      observe(node) {
        node = $(node);
        node = {
          node: node,
          isShown: elementIsShown(node),
          intersectionRatio: 0,
          isIntersecting: false
        };
        timerInstance.push(node, _node => {
          const result = this._renderElement(_node);

          if (result) {
            this.last = [result];
            this.callback([result]);
          }
        });
        this.nodeList.push(node);

        this._addEvents();

        let cbData = this._renderElement(node);

        if (!cbData) {
          cbData = {
            target: node.node.node,
            intersectionRatio: 0,
            isIntersecting: false
          };
        }

        this.callback([cbData]);
      }

      unobserve(node) {
        node = $(node);
        const nodes = this.nodeList.map(obj => obj.node.node);
        const index = nodes.indexOf(node.node);
        timerInstance.remove(node.node);

        if (index > -1) {
          this.nodeList.splice(index, 1);
        }

        if (!this.nodeList.length) {
          this._removeEvents();
        }
      }

      disconnect() {
        this.nodeList.forEach(node => {
          timerInstance.remove(node.node);
        });
        this.nodeList = [];

        this._removeEvents();
      }

    }

    class Instance {
      constructor(callback, options) {
        const IntersectionObserverClass = window.IntersectionObserver || FakeIntersectionObserver;
        this.observer = new IntersectionObserverClass(callback, options || {});
      }

      static isInView(node) {
        const rect = $(node).getBoundingClientRect();
        return (rect.top >= 0 || rect.top - rect.bottom < rect.top) && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
      }

      takeRecords() {
        return this.observer.takeRecords();
      }

      observe(target) {
        if (target.node) {
          target = target.node;
        }

        this.observer.observe(target);
      }

      unobserve(target) {
        this.observer.unobserve(target);
      }

      disconnect() {
        this.observer.disconnect();
      }

    }

    return Instance;
  })();
  /* global helper */

  /* eslint-env es6 */


  helper.isPercentage = value => {
    return /^([-]?[0-9]*\.?[0-9]+)%$/.test('' + value);
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.isSVG = url => {
    if (url) {
      url = url.split('?')[0];
      url = url.split('.');
      url = url[url.length - 1];
      return /svg/i.test(url);
    }

    return false;
  };
  /* global helper */

  /* eslint-env es6 */


  helper.isSpin = str => {
    str = (str || '').split('?')[0];
    return /([^#?]+)\/?([^#?]+\.spin)(\?([^#]*))?(#(.*))?$/.test(str);
  };
  /* global helper */

  /* eslint-env es6 */


  helper.isVideo = str => {
    str = (str || '').split('?')[0];
    return /([^#?]+)\/?([^#?]+\.(mp4|mov|avi|m4v|mkv|webm|wmv|ogv|ogg))(\?([^#]*))?(#(.*))?$/i.test(str);
  };
  /* global helper */

  /* global $J */

  /* global $ */

  /* eslint-env es6 */


  helper.loadImage = sources => {
    return new Promise((resolve, reject) => {
      let img;
      let container;
      let createContainer = false;

      if (['array', 'string'].includes($J.typeOf(sources))) {
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
        const handler = e => {
          img.removeEvent(['load', 'error'], handler);

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

        img.addEvent(['load', 'error'], handler);

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
          size: img.size
        });
      }
    });
  };
  /* global $J, helper */

  /* eslint-env es6 */


  helper.loadStylesheet = (url, id, shadowRoot, selector) => {
    return new Promise((resolve, reject) => {
      let alreadyIncluded = false;
      const rootElement = shadowRoot || $J.D.node;
      Array.from(rootElement.querySelectorAll('link')).forEach(link => {
        const href = $(link).attr('href') || '';

        if ($J.getAbsoluteURL(href) === $J.getAbsoluteURL(url)) {
          alreadyIncluded = true;
        }
      });

      if (alreadyIncluded) {
        resolve();
      } else {
        const slink = $J.$new('link');

        if (id !== $J.U) {
          slink.node.id = id;
        }

        slink.node.rel = 'stylesheet';
        slink.node.type = 'text/css';

        slink.node.onload = () => {
          resolve();
        };

        slink.node.onerror = e => {
          reject(e);
        };

        slink.node.href = url;
        let root = $J.D.node.head || $J.D.node.getElementsByTagName('head')[0] || $J.D.node.body || $J.D.node.documentElement;

        if (shadowRoot) {
          root = shadowRoot;
        }

        let nextSibling = root.firstChild;
        const addAfter = root.querySelector(selector);

        if (addAfter && addAfter.nextSibling) {
          nextSibling = addAfter.nextSibling;
        }

        root.insertBefore(slink.node, nextSibling);
      }
    });
  };
  /* global helper */

  /* eslint-env es6 */


  helper.makeQueryblePromise = promise => {
    if (promise.isResolved) {
      return promise;
    }

    let isPending = true;
    let isRejected = false;
    let isFulfilled = false;
    const result = promise.then(res => {
      isPending = false;
      isFulfilled = true;
      return res;
    }, err => {
      isPending = false;
      isRejected = true;
      return err;
    });

    result.isFulfilled = () => {
      return isFulfilled;
    };

    result.isPending = () => {
      return isPending;
    };

    result.isRejected = () => {
      return isRejected;
    };

    return result;
  };
  /* global $, $J, helper */

  /* eslint quote-props: ["off", "always"] */

  /* eslint-env es6 */


  helper.paramsFromQueryString = (() => {
    const IMG_OPTION_ALIAS = {
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

    const decodeURIComponentX = str => {
      let out = '';
      const arr = str.split(/(%(?:D0|D1)%.{2})/);

      for (let i = 0, l = arr.length; i < l; i++) {
        let x;

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


    return query => {
      const params = {};

      if (query) {
        $(query.split('&')).forEach(pair => {
          const setting = pair.split('='); // Convert option alias to a real name

          setting[0] = IMG_OPTION_ALIAS[setting[0]] || setting[0];
          setting[0].trim().split('.').reduce((res, val, ind, col) => {
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
        Object.keys(params).forEach(key => {
          if (typeof params[key] === 'object' && params[key].__toArray) {
            delete params[key].__toArray;
            const objKeys = Object.keys(params[key]);
            params[key] = objKeys.map(idx => {
              return params[key][idx];
            });
          }
        });
      }

      return params;
    };
  })();
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


  helper.paramsToQueryString = (() => {
    const URL_OPTIONS_ALIASES = {
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

    const paramsToQueryString = (data, prefix) => {
      const results = [];

      for (const k in data) {
        if (!Object.prototype.hasOwnProperty.call(data, k)) {
          continue;
        }

        if ((k + '').substring(0, 2) === '$J') {
          continue;
        }

        let value = data[k];

        if ($J.typeOf(value) === 'object') {
          value = paramsToQueryString(value, (prefix || '') + k + '.');
          results.push(value);
        } else if ($J.typeOf(value) === 'array') {
          value.forEach((item, idx) => {
            value = paramsToQueryString(item, (prefix || '') + k + '.' + idx + '.');
            results.push(value);
          });
        } else {
          // results.push((prefix || '') + k + '=' + encodeURIComponent(value));
          let paramName = (prefix || '') + k;
          paramName = URL_OPTIONS_ALIASES[paramName] || paramName;
          results.push(paramName + '=' + encodeURIComponent(value));
        }
      }

      return results.join('&');
    };

    return paramsToQueryString;
  })();
  /* global helper */

  /* eslint no-restricted-properties: "off" */

  /* eslint-env es6 */


  helper.round = (value, count, noTail) => {
    if (!count) {
      count = 0;
    }

    let v = Math.pow(10, count);

    if (noTail) {
      v = parseInt(value * v, 10) / v;
    } else {
      v = Math.round(value * v) / v;
    }

    return v;
  };
  /* global helper */

  /* eslint-env es6 */


  helper.roundSize = (value, roundValue) => {
    if (value) {
      if (!roundValue) {
        roundValue = 100;
      }

      value = Math.ceil(value / roundValue) * roundValue;
    }

    return value;
  };
  /* global $J, helper */

  /* global globalVariables */

  /* eslint new-parens: "off" */

  /* eslint-env es6 */


  helper.sendRawStats = (statsData, useBeacon) => {
    try {
      const endpoint = 'https://stats.sirv.com/' + +new Date();

      if (useBeacon === true && navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, helper.paramsToQueryString(statsData));
        return;
      }

      const xhr = new XMLHttpRequest();
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
    findIndex: (value, currentIndex, l, loop) => {
      let result = null;

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
    getSrc: src => {
      if ($J.defined(src) && (src + '').trim() !== '') {
        return src + '';
      }

      return null;
    }
  };
  /* global $, $J, helper */

  /* eslint-env es6 */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  helper.sortSlidesByOrder = (order, slides) => {
    const oldSlidesArr = slides.slice();
    const newSlidesArr = [];

    if (order && order.length) {
      for (let i = 0, l = Math.min(order.length, oldSlidesArr.length); i < l; i++) {
        for (let j = 0, l2 = oldSlidesArr.length; j < l2; j++) {
          if (globalVariables.SLIDE.NAMES.indexOf(order[i]) === oldSlidesArr[j].type && oldSlidesArr[j].enabled) {
            newSlidesArr.push(oldSlidesArr[j]);
            oldSlidesArr.splice(j, 1);
            break;
          }
        }
      }
    }

    oldSlidesArr.forEach(item => {
      newSlidesArr.push(item);
    });
    return newSlidesArr;
  };
  /* global $J, helper */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint-env es6 */

  /* eslint-env es6 */


  helper.spinLib = (() => {
    // eslint-disable-next-line no-unused-vars
    const FULLSCREEN_PERCENT_WITHOUT_ACTION = 15; // 0% - 100%

    const sirvlib = {
      calcProportionSize: (spinSize, originSize, isFullscreen, oldSize) => {
        let width = originSize.width;
        let height = originSize.height; // if (isFullscreen) {
        //     if (spinSize.width > spinSize.height) {
        //         spinSize.height -= 20;
        //     } else {
        //         spinSize.width -= 20;
        //     }
        // }

        if (width > spinSize.width) {
          const tmp = height / width;
          width = spinSize.width;
          height = parseInt(width * tmp, 10);
        }

        if (height > spinSize.height) {
          const tmp = width / height;
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
      reverse: (col, row, arr) => {
        if (col) {
          for (let i = 0, l = arr.length; i < l; i++) {
            arr[i].reverse();
          }
        }

        if (row) {
          arr.reverse();
        }

        return arr;
      },
      getNextIndex: (currentValue, value, direction, length, loop) => {
        let result;

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
      getUrl: path => {
        let url = path;
        url = url.split('/');
        url.splice(url.length - 1, 1);
        url = url.join('/');
        url = url.replace(/https?:/, '');
        return url;
      },
      swapLayers: (layers, revers) => {
        let result = layers;

        if (revers) {
          result = {};
          Object.entries(layers).forEach(([rowKey, rowValue]) => {
            Object.entries(rowValue).forEach(([colKey, colValue]) => {
              if (!result[colKey]) {
                result[colKey] = {};
              }

              result[colKey][rowKey] = colValue;
            });
          });
        }

        return result;
      },
      getMaxCount: layers => {
        return Math.max(0, ...Object.values(layers).map(value => Object.keys(value).length));
      },
      correctArray: (keysArray, count) => {
        let result = [];
        let correctCount = count - keysArray.length;

        if (correctCount > 0) {
          const l = keysArray.length;

          for (let i = 0; i < l - 1; i++) {
            const curr = parseInt(keysArray[i], 10);
            const next = parseInt(keysArray[i + 1], 10);
            let diff = next - curr - 1;
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
            let diff = parseInt(keysArray[0], 10) - 1;

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
      getFrames: (frames, count) => {
        const result = {};
        const newKeys = sirvlib.correctArray(Object.keys(frames), count);
        $(newKeys).forEach((value, index) => {
          result[index + 1 + ''] = frames[value];
        });
        return result;
      },
      checkLayers: layers => {
        const result = {};
        const count = sirvlib.getMaxCount(layers);
        Object.values(layers).forEach((value, index) => {
          result[index + 1 + ''] = sirvlib.getFrames(value, count);
        });
        return result;
      }
    };
    return sirvlib;
  })();
  /* eslint-env es6 */

  /* global $, $J, helper */

  /* eslint quote-props: ["off", "always"]*/

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /*eslint no-lonely-if: "off"*/

  /* eslint-disable no-multi-spaces */

  /* eslint-disable no-use-before-define */


  helper.videoModule = (() => {
    let vimeoPromise = null;
    let youtubePromise = null;
    const sources = {};
    const youtubeImgs = {
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

    const getVimeoJSON = url => {
      return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              try {
                const result = JSON.parse(xhttp.responseText)[0];
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

    const isHtmlVideo = node => {
      node = $(node);
      return node && node.tagName === 'video';
    };

    const getYouTobeId = url => {
      let result = null;
      url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

      if (url[2] !== undefined) {
        url = url[2].split(/[^0-9a-z_\-]/i);

        if (url.length && url[0]) {
          result = url[0];
        }
      }

      return result;
    };

    const getVimeoId = url => {
      let result = null;
      url = url.match(/(?:https?:\/\/)?(?:www.)?(?:player.)?vimeo.com\/(?:[a-z]*\/)*([0-9]{6,11})[?]?.*/)[1];

      if (url) {
        result = url;
      }

      return result;
    };

    const getSrc = node => {
      let result = null;

      if ($J.typeOf(node) === 'string') {
        result = node;
      } else {
        node = $(node);

        if (node && $J.typeOf(node.node) === 'element') {
          if (['iframe', 'div'].includes(node.tagName)) {
            result = node.attr('src') || node.attr('data-src');
          } else if (isHtmlVideo(node)) {
            result = node.attr('src') || node.attr('data-src');

            if (!result) {
              result = null;
              const children = Array.from(node.node.children);
              let child;

              do {
                child = $(children.shift());

                if (child && $J.typeOf(child.node) === 'element' && child.tagName === 'source') {
                  result = child.attr('src') || child.attr('data-src');
                }
              } while (!result && child);
            }
          }
        }
      }

      return result;
    };

    const getAPI = node => {
      let result = null;

      if (api.isVideo(node)) {
        switch (api.getType(node)) {
          case 'video':
            result = Promise.resolve();
            break;

          case 'vimeo':
            if (!vimeoPromise) {
              vimeoPromise = new Promise((resolve, reject) => {
                if ($J.W.node.Vimeo) {
                  resolve($J.W.node.Vimeo);
                } else if (typeof $J.W.node.define === 'function' && $J.W.node.define.amd && typeof $J.W.node.require === 'function') {
                  $J.W.node.require(['https://player.vimeo.com/api/player.js'], player => {
                    resolve({
                      Player: player
                    });
                  }, reject);
                } else {
                  const script = $J.$new('script');
                  script.attr('src', 'https://player.vimeo.com/api/player.js');
                  $(script).addEvent('load', () => {
                    resolve($J.W.node.Vimeo);
                  });
                  $(script).addEvent('error', reject);
                  script.appendTo(document.body);
                }
              });
            }

            result = vimeoPromise;
            break;

          case 'youtube':
            if (!youtubePromise) {
              if (!$J.W.node.YT) {
                youtubePromise = new Promise((resolve, reject) => {
                  const f = () => {};

                  const existingEvent = $J.W.node.onYouTubeIframeAPIReady || f;

                  $J.W.node.onYouTubeIframeAPIReady = () => {
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

    const api = {
      aspectratio: 9 / 16,
      getAspectRatio: src => {
        return new Promise((resolve, reject) => {
          let id;
          src = getSrc(src);

          if (src) {
            if (sources[src]) {
              resolve(sources[src].aspectratio);
            }
          }

          const type = api.getType(src);

          if (type === 'vimeo') {
            id = getVimeoId(src);

            if (id) {
              getVimeoJSON('https://vimeo.com/api/v2/video/' + id + '.json').then(data => {
                resolve(data ? data.height / data.width : api.aspectratio);
              }).catch(error => {
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
      getId: src => {
        let result = null;

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
      isVideo: src => {
        let result = false;

        if (isHtmlVideo(src)) {
          result = true;
        } else {
          src = getSrc(src);

          if (src) {
            result = ['youtube', 'vimeo'].includes(api.getType(src));
          }
        }

        return result;
      },
      getType: src => {
        let result = null;

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
      getImageSrc: (src, getAll) => {
        return new Promise((resolve, reject) => {
          let node;

          if (src && $(src) && $J.typeOf($(src).node) === 'element') {
            node = src;
          }

          src = getSrc(src);
          let thumbUrl = null;

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

            let id;

            switch (api.getType(node || src)) {
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
                  getVimeoJSON(thumbUrl).then(data => {
                    let imgUrl = null;

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
                    const timeOfPoster = 0;
                    const canvas = $J.$new('canvas');
                    const context = canvas.node.getContext('2d');

                    const clear = () => {
                      // Array.from(node.node.children).forEach(function (child) {
                      //     child = $(child)
                      //     if (child && child.tagName === 'source') {
                      //         child.removeEvent(['abort', 'error']);
                      //     }
                      // });
                      node.removeEvent(['loadedmetadata', 'loadeddata', 'abort', 'error', 'stalled']);
                      node.remove();
                    };

                    const addSrc = () => {
                      let _src = node.attr('data-src');

                      if (_src) {
                        node.attr('src', _src);
                      }

                      Array.from(node.node.children).forEach(child => {
                        child = $(child);

                        if (child && child.tagName === 'source') {
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
                    node.addEvent('loadedmetadata', e => {
                      const size = node.size;

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
                    }); // Array.from(node.node.children).forEach(function (child) {
                    //     child = $(child);
                    //     if (child && child.tagName === 'source') {
                    //         child.addEvent(['abort', 'error'], function (e) {
                    //             clear();
                    //             callback(null);
                    //         });
                    //     }
                    // });

                    node.addEvent('loadeddata', e => {
                      node.currentTime = timeOfPoster;
                    });
                    node.addEvent(['abort', 'error', 'stalled'], e => {
                      clear();
                      reject(null);
                    });
                    node.addEvent('seeked', e => {
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
  })();

  return helper;
});