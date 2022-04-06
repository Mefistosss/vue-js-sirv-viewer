Sirv.define('Spin', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Promise!', 'EventEmitter', 'Zoominstance', 'ResponsiveImage', 'Hint', 'ProgressLoader', 'SpinHotspots'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, Promise, EventEmitter, Zoominstance, ResponsiveImage, Hint, ProgressLoader, SpinHotspots) {
  var moduleName = 'Spin';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.sirv-spin{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important;display:inline-block;position:relative;width:100%;max-width:100%;height:100%;padding:0!important;transform:translate3d(0,0,0);outline:0;outline:0!important;color:#000;font-size:0!important;line-height:100%!important;text-decoration:none;overflow:hidden;vertical-align:middle;visibility:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none!important}.sirv-spin::before{display:inline-block;height:0;content:\'\';vertical-align:top}.sirv-spin .spin-canvas-container{position:absolute}.sirv-spin .spin-canvas-container,.sirv-spin canvas{top:0;right:0;bottom:0;left:0;margin:auto}.sirv-spin canvas{transition:opacity 1s linear,filter 2s linear;opacity:0;z-index:1}.sirv-spin canvas.smv-shown{opacity:1!important}.sirv-spin canvas.smv-zoomed-in{visibility:hidden!important}.sirv-spin-message{display:block;position:absolute;top:50%;left:33%;width:33%;padding:6px;border:1px solid #aaa;border-radius:15px;background-color:#fff;background-image:none;color:#000;font-size:10px;text-align:center;border-collapse:separate;box-shadow:0 0 10px #000;overflow:hidden;z-index:100}.sirv-hint .spin-hint-animation{display:none;position:relative;width:40px;height:40px;margin-right:10px;transform-style:preserve-3d;vertical-align:middle;perspective:200px}.sirv-hint .sirv-hint-message .spin-hint-animation::before{display:inline-block;position:absolute;top:0;right:0;bottom:0;left:0;width:40%;height:30%;margin:auto;transform-origin:50% 50% -15px;border:1px solid #fff;box-shadow:inset 0 0 1px 1px rgba(255,255,255,.5);content:\'\';box-sizing:border-box}.sirv-hint.spin-hint-horizontal-animation .sirv-hint-message .spin-hint-animation::before{transform:translateZ(0) rotateY(0);-webkit-animation:sirv-spin-hint-horizontal-rotate 3s infinite linear;animation:sirv-spin-hint-horizontal-rotate 3s infinite linear}@-webkit-keyframes sirv-spin-hint-horizontal-rotate{0%{transform:translateZ(0) rotateY(0)}5%{transform:translateZ(100px) rotateY(0)}7%{transform:translateZ(75px) rotateY(0)}20%{transform:translateZ(75px) rotateY(0)}30%{transform:translateZ(75px) rotateY(45deg)}40%{transform:translateZ(75px) rotateY(0)}50%{transform:translateZ(75px) rotateY(-45deg)}60%{transform:translateZ(75px) rotateY(0)}63%{transform:translateZ(75px) rotateY(0)}68%{transform:translateZ(-25px) rotateY(0)}70%{transform:translateZ(0) rotateY(0)}80%{transform:translateZ(0) rotateY(0)}100%{transform:translateZ(0) rotateY(0)}}@keyframes sirv-spin-hint-horizontal-rotate{0%{transform:translateZ(0) rotateY(0)}5%{transform:translateZ(100px) rotateY(0)}7%{transform:translateZ(75px) rotateY(0)}20%{transform:translateZ(75px) rotateY(0)}30%{transform:translateZ(75px) rotateY(45deg)}40%{transform:translateZ(75px) rotateY(0)}50%{transform:translateZ(75px) rotateY(-45deg)}60%{transform:translateZ(75px) rotateY(0)}63%{transform:translateZ(75px) rotateY(0)}68%{transform:translateZ(-25px) rotateY(0)}70%{transform:translateZ(0) rotateY(0)}80%{transform:translateZ(0) rotateY(0)}100%{transform:translateZ(0) rotateY(0)}}.sirv-hint.spin-hint-vertical-animation .spin-hint-message .spin-hint-animation::before{transform:translateZ(0) rotateX(0);-webkit-animation:sirv-spin-hint-vertical-rotate 3s infinite linear;animation:sirv-spin-hint-vertical-rotate 3s infinite linear}@-webkit-keyframes sirv-spin-hint-vertical-rotate{0%{transform:translateZ(0) rotateX(0)}5%{transform:translateZ(100px) rotateX(0)}7%{transform:translateZ(75px) rotateX(0)}20%{transform:translateZ(75px) rotateX(0)}30%{transform:translateZ(75px) rotateX(45deg)}40%{transform:translateZ(75px) rotateX(0)}50%{transform:translateZ(75px) rotateX(-45deg)}60%{transform:translateZ(75px) rotateX(0)}63%{transform:translateZ(75px) rotateX(0)}68%{transform:translateZ(-25px) rotateX(0)}70%{transform:translateZ(0) rotateX(0)}80%{transform:translateZ(0) rotateX(0)}100%{transform:translateZ(0) rotateX(0)}}@keyframes sirv-spin-hint-vertical-rotate{0%{transform:translateZ(0) rotateX(0)}5%{transform:translateZ(100px) rotateX(0)}7%{transform:translateZ(75px) rotateX(0)}20%{transform:translateZ(75px) rotateX(0)}30%{transform:translateZ(75px) rotateX(45deg)}40%{transform:translateZ(75px) rotateX(0)}50%{transform:translateZ(75px) rotateX(-45deg)}60%{transform:translateZ(75px) rotateX(0)}63%{transform:translateZ(75px) rotateX(0)}68%{transform:translateZ(-25px) rotateX(0)}70%{transform:translateZ(0) rotateX(0)}80%{transform:translateZ(0) rotateX(0)}100%{transform:translateZ(0) rotateX(0)}}.sirv-hint.spin-hint-horizontal-animation.spin-hint-vertical-animation .sirv-hint-message .spin-hint-animation::before{transform:translateZ(0) rotateX(0) rotateY(0);-webkit-animation:sirv-spin-hint-double-rotate 5s infinite linear;animation:sirv-spin-hint-double-rotate 5s infinite linear}@-webkit-keyframes sirv-spin-hint-double-rotate{0%{transform:translateZ(0) rotateX(0) rotateY(0)}4%{transform:translateZ(100px) rotateX(0) rotateY(0)}5%{transform:translateZ(75px) rotateX(0) rotateY(0)}10%{transform:translateZ(75px) rotateX(0) rotateY(0)}19%{transform:translateZ(75px) rotateX(0) rotateY(45deg)}28%{transform:translateZ(75px) rotateX(0) rotateY(0)}37%{transform:translateZ(75px) rotateX(0) rotateY(-45deg)}45%{transform:translateZ(75px) rotateX(0) rotateY(0)}54%{transform:translateZ(75px) rotateX(45deg) rotateY(0)}63%{transform:translateZ(75px) rotateX(0) rotateY(0)}72%{transform:translateZ(75px) rotateX(-45deg) rotateY(0)}81%{transform:translateZ(75px) rotateX(0) rotateY(0)}85%{transform:translateZ(-25px) rotateX(0) rotateY(0)}86%{transform:translateZ(0) rotateX(0) rotateY(0)}90%{transform:translateZ(0) rotateX(0) rotateY(0)}100%{transform:translateZ(0) rotateX(0) rotateY(0)}}@keyframes sirv-spin-hint-double-rotate{0%{transform:translateZ(0) rotateX(0) rotateY(0)}4%{transform:translateZ(100px) rotateX(0) rotateY(0)}5%{transform:translateZ(75px) rotateX(0) rotateY(0)}10%{transform:translateZ(75px) rotateX(0) rotateY(0)}19%{transform:translateZ(75px) rotateX(0) rotateY(45deg)}28%{transform:translateZ(75px) rotateX(0) rotateY(0)}37%{transform:translateZ(75px) rotateX(0) rotateY(-45deg)}45%{transform:translateZ(75px) rotateX(0) rotateY(0)}54%{transform:translateZ(75px) rotateX(45deg) rotateY(0)}63%{transform:translateZ(75px) rotateX(0) rotateY(0)}72%{transform:translateZ(75px) rotateX(-45deg) rotateY(0)}81%{transform:translateZ(75px) rotateX(0) rotateY(0)}85%{transform:translateZ(-25px) rotateX(0) rotateY(0)}86%{transform:translateZ(0) rotateX(0) rotateY(0)}90%{transform:translateZ(0) rotateX(0) rotateY(0)}100%{transform:translateZ(0) rotateX(0) rotateY(0)}}.smv-progress-loader{bottom:0;left:0;margin-bottom:5px;margin-left:5px}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* eslint-disable no-unused-vars */

  /* eslint-disable no-extra-semi */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var defaultOptions = {
    // Swap rows and columns, i.e. "2 rows x 36 columns" spin behaves like "36 rows x 2 columns".
    swapSides: {
      type: 'boolean',
      defaults: false
    },
    wheel: {
      type: 'boolean',
      defaults: true
    },
    initialize: {
      type: 'string',
      'enum': ['load', 'hover', 'click', 'tap'],
      defaults: 'load'
    },
    freeDrag: {
      type: 'boolean',
      defaults: false
    },
    tappingFirst: {
      type: 'boolean',
      defaults: false
    },
    thumbnail: {
      // thumbnail.type
      type: {
        type: 'string',
        'enum': ['image', 'gif'],
        defaults: 'image'
      },
      // thumbnail.gifParams
      gifParams: {
        type: 'string',
        defaults: ''
      }
    },
    zoom: {
      // zoom.enable
      enable: {
        type: 'boolean',
        defaults: true
      },
      // zoom.ratio
      ratio: {
        oneOf: [{
          type: 'number',
          minimum: 0
        }, {
          type: 'string',
          'enum': ['max']
        }],
        defaults: 2.5
      },
      // zoom.tiles
      tiles: {
        type: 'boolean',
        defaults: true
      },
      // zoom.pan
      pan: {
        type: 'boolean',
        defaults: true
      }
    },
    inactivity: {
      type: 'number',
      minimum: 1000,
      defaults: 3000
    },
    autospin: {
      // autospin.enable
      enable: {
        type: 'boolean',
        defaults: false
      },
      // autospin.type
      type: {
        type: 'string',
        'enum': ['row', 'sphere', 'full', 'helix'],
        defaults: 'sphere'
      },
      // autospin.resume
      resume: {
        type: 'number',
        minimum: 0,
        defaults: 3000
      },
      // autospin.duration
      duration: {
        type: 'number',
        minimum: 0,
        defaults: 3600
      }
    },
    hint: {
      message: {
        // hint.message.enable
        enable: {
          type: 'boolean',
          defaults: true
        },
        // hint.message.text
        text: {
          type: 'string',
          defaults: 'Drag to spin'
        }
      },
      onStart: {
        // hint.onStart.enable
        enable: {
          type: 'boolean',
          defaults: true
        },
        // hint.onStart.effect
        effect: {
          oneOf: [{
            type: 'string',
            'enum': ['intro', 'twitch', 'spin', 'momentum', 'sphere', 'none']
          }, {
            type: 'boolean',
            'enum': [false]
          }],
          defaults: 'intro'
        }
      },
      onVisible: {
        // hint.onVisible.enable
        enable: {
          type: 'boolean',
          defaults: true
        },
        // hint.onVisible.effect
        effect: {
          oneOf: [{
            type: 'string',
            'enum': ['intro', 'twitch', 'spin', 'momentum', 'sphere', 'none']
          }, {
            type: 'boolean',
            'enum': [false]
          }],
          defaults: 'twitch'
        }
      },
      onInactive: {
        // hint.onInactive.enable
        enable: {
          type: 'boolean',
          defaults: true
        },
        // hint.onInactive.effect
        effect: {
          oneOf: [{
            type: 'string',
            'enum': ['intro', 'twitch', 'spin', 'momentum', 'sphere', 'none']
          }, {
            type: 'boolean',
            'enum': [false]
          }],
          defaults: 'twitch'
        }
      }
    },
    row: {
      // Row/Column from which to start spin. 'auto' means to fetch these from the image filename (img.src)
      // row.start
      start: {
        type: 'number',
        minimum: 1,
        defaults: 1
      },
      // should the spin loop rows (y)
      // row.loop
      loop: {
        type: 'boolean',
        defaults: false
      },
      // whether photos are taken in the reverse order
      // row.increment
      increment: {
        type: 'number',
        minimum: 1,
        defaults: 1
      },
      // whether photos are taken in the reverse order
      // row.reverse
      reverse: {
        type: 'boolean',
        defaults: false
      },
      //row.sensitivity
      sensitivity: {
        type: 'number',
        'minimum': 1,
        'maximum': 100,
        defaults: 50
      } // speed of spin (1 - 100)

    },
    column: {
      // Row/Column from which to start spin. 'auto' means to fetch these from the image filename (img.src)
      // col.start
      start: {
        type: 'number',
        minimum: 1,
        defaults: 1
      },
      // should the spin loop columns in row (x)
      // col.loop
      loop: {
        type: 'boolean',
        defaults: true
      },
      // whether photos are taken in the reverse order
      // col.increment
      increment: {
        type: 'number',
        minimum: 1,
        defaults: 1
      },
      // whether photos are taken in the reverse order
      // col.reverse
      reverse: {
        type: 'boolean',
        defaults: false
      },
      //column.sensitivity
      sensitivity: {
        type: 'number',
        'minimum': 1,
        'maximum': 100,
        defaults: 50
      } // speed of spin (1 - 100)

    }
  };
  var mobileDefaults = {// hint: {
    //     message: {
    //         text: { type: 'string', defaults: 'Tap to spin' }
    //     }
    // }
  };
  /* eslint-env es6 */

  /* global ResponsiveImage */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SpinResponsiveImage" }] */

  var SpinResponsiveImage = /*#__PURE__*/function (_ResponsiveImage) {
    "use strict";

    bHelpers.inheritsLoose(SpinResponsiveImage, _ResponsiveImage);

    function SpinResponsiveImage(source, o, col, row) {
      var _this;

      _this = _ResponsiveImage.call(this, source, o) || this;
      _this.col = col;
      _this.row = row;
      return _this;
    }

    var _proto = SpinResponsiveImage.prototype;

    _proto._createImageData = function _createImageData(img, callbackData) {
      var data = _ResponsiveImage.prototype._createImageData.call(this, img, callbackData);

      data.col = this.col;
      data.row = this.row;
      return data;
    };

    _proto.getThumbnail = function getThumbnail(imageSettings) {
      var data = _ResponsiveImage.prototype.getThumbnail.call(this, imageSettings);

      data.col = this.col;
      data.row = this.row;
      return data;
    };

    return SpinResponsiveImage;
  }(ResponsiveImage);
  /* eslint-env es6 */

  /* global helper */

  /* eslint operator-assignment: 0 */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "INTRO_QUEUE" }] */


  var INTRO_QUEUE = function () {
    var CUBICBEZIER = $([0.45, 0.19, 0.56, 0.86]);
    var DEFAULTDURATION = 600;

    var isNull = function (v) {
      return v === null;
    };

    var getBresenhamsLine = function (point1, point2) {
      var result = {
        x: [],
        y: []
      };

      var plotLineLow = function (x0, y0, x1, y1) {
        var dx = x1 - x0;
        var dy = y1 - y0;
        var yi = 1;
        var x,
            y = y0;
        var D;

        if (dy < 0) {
          yi = -1;
          dy = -dy;
        }

        D = 2 * dy - dx;

        for (x = x0; x <= x1; x++) {
          result.x.push(x);
          result.y.push(y);

          if (D > 0) {
            y = y + yi;
            D = D - 2 * dx;
          }

          D = D + 2 * dy;
        }
      };

      var plotLineHigh = function (x0, y0, x1, y1) {
        var dx = x1 - x0;
        var dy = y1 - y0;
        var xi = 1;
        var y;
        var x = x0;
        var D;

        if (dx < 0) {
          xi = -1;
          dx = -dx;
        }

        D = 2 * dx - dy;
        x = x0;

        for (y = y0; y <= y1; y++) {
          result.x.push(x);
          result.y.push(y);

          if (D > 0) {
            x = x + xi;
            D = D - 2 * dy;
          }

          D = D + 2 * dx;
        }
      };

      if (Math.abs(point2.y - point1.y) < Math.abs(point2.x - point1.x)) {
        if (point1.x > point2.x) {
          plotLineLow(point2.x, point2.y, point1.x, point1.y);
        } else {
          plotLineLow(point1.x, point1.y, point2.x, point2.y);
        }
      } else if (point1.y > point2.y) {
        plotLineHigh(point2.x, point2.y, point1.x, point1.y);
      } else {
        plotLineHigh(point1.x, point1.y, point2.x, point2.y);
      }

      return result;
    };

    var getLineSegment = function (from, to, forward, length, loop) {
      var arr = [];
      var start = false;
      var currentIndex = from;

      while (currentIndex !== to || !start && loop) {
        start = true;

        if (forward) {
          currentIndex += 1;
        } else {
          currentIndex -= 1;
        }

        currentIndex = helper.getArrayIndex(currentIndex, length);
        arr.push(currentIndex);
      }

      return arr;
    };

    var getQueue = function (source, sides) {
      var side = 'col';

      if (isNull(sides.row)) {
        side = 'row';
      }

      var result = [];
      source.forEach(function (v) {
        var s = {
          col: sides.column,
          row: sides.row
        };
        s[side] = v;
        result.push(s);
      });
      return result;
    };

    var getLoopSegment = function (startIndex, count, length, loop) {
      var getEndIndex = function (value) {
        var result;

        if (loop) {
          result = helper.getArrayIndex(value, length);
        } else {
          result = value;

          if (result < 0) {
            result = 0;
          }

          if (result > length - 1) {
            result = length - 1;
          }
        }

        return result;
      };

      var tmp = [startIndex];
      var endIndex;
      var dir = true;
      [startIndex + count, startIndex - count, startIndex].forEach(function (value) {
        endIndex = getEndIndex(value);
        tmp = tmp.concat(getLineSegment(tmp[tmp.length - 1], endIndex, dir, length, loop));
        dir = !dir;
      });
      return tmp;
    };

    var getLine = function (from, length, loop) {
      var result = [];

      if (loop) {
        result = getLineSegment(from, helper.getArrayIndex(from + length, length), true, length, loop);
      } else {
        result = getLoopSegment(from, length, length, false);
      }

      return result;
    };

    var axelerate = function (arr) {
      var max = 6;
      var l = arr.length;

      var getCount = function (value) {
        return Math.round((max - 1) * $J.FX.cubicBezierAtTime(value / l, DEFAULTDURATION, CUBICBEZIER)) + 1;
      };

      var result = [];
      arr.forEach(function (point, index) {
        var count = getCount(index);

        while (count > 0) {
          count -= 1;
          result.push(point);
        }
      });
      return result;
    };

    var getOptions = function (options) {
      var opt = helper.deepExtend({
        degree: 30,
        swapSides: false,
        axelerate: false,
        isBackward: false,
        justFirstLine: false,
        row: {
          length: 1,
          loop: false,
          current: 1,
          jumpCount: 0
        },
        column: {
          length: 36,
          loop: true,
          current: 1,
          jumpCount: 0
        },
        firstSide: 'column',
        secondSide: 'row'
      }, options || {});
      ['row', 'column'].forEach(function (value) {
        if (opt[value].current > opt[value].length - 1) {
          opt[value].current = 0;
        }
      });

      if (opt.swapSides) {
        opt.secondSide = opt.firstSide;
        opt.firstSide = 'row';
      }

      return opt;
    };

    var api = {
      lib: {
        getRightIndex: function (index, length, loop) {
          var result;

          if (loop) {
            result = helper.getArrayIndex(index, length);
          } else {
            if (index >= length) {
              index = length - 1;
            } else if (index < 0) {
              index = 0;
            }

            result = index;
          }

          return result;
        }
      },
      twitch: function (options) {
        var opt = getOptions(options);
        var count = {
          column: 0,
          row: 0
        };
        var tmp;
        var result = [];
        [opt.firstSide, opt.secondSide].forEach(function (side) {
          var otherSide = side === opt.firstSide ? opt.secondSide : opt.firstSide;

          if (opt[side].length > 1) {
            count[side] = Math.floor(opt[side].length / 360 * opt.degree) || 1;
          }

          if (count[side]) {
            tmp = {};
            tmp[side] = null;
            tmp[otherSide] = opt[otherSide].current;
            result = result.concat(getQueue(getLoopSegment(opt[side].current, count[side], opt[side].length, opt[side].loop), tmp));
          }
        });
        return result;
      },
      sphere: function (options) {
        var opt = getOptions(options);
        var result = [];
        (opt.justFirstLine ? [opt.firstSide] : [opt.firstSide, opt.secondSide]).forEach(function (side) {
          var otherSide = side === opt.firstSide ? opt.secondSide : opt.firstSide;
          var tmp = {};

          if (opt[side].length === 1) {
            return;
          }

          tmp[side] = null;
          tmp[otherSide] = opt[otherSide].current;
          var arr = getQueue(getLine(opt[side].current, opt[side].length, opt[side].loop), tmp);

          if (opt.isBackward) {
            arr.reverse();
          }

          result = result.concat(arr);
        });

        if (opt.axelerate) {
          result = axelerate(result);
        }

        return result;
      },
      intro: function (options) {
        var opt = getOptions(options);
        var copiedOpt = {
          swapSides: opt.swapSides,
          justFirstLine: true,
          isBackward: opt.isBackward,
          row: helper.deepExtend({}, opt.row),
          column: helper.deepExtend({}, opt.column)
        };
        var result = [];
        result = api.sphere(copiedOpt);
        result = result.concat(api.twitch(copiedOpt));
        return result;
      },
      full: function (options) {
        var arr;
        var opt = getOptions(options);
        var l = opt[opt.secondSide].length;

        if (l > 1) {
          arr = getLine(opt[opt.secondSide].current, l, opt[opt.secondSide].loop);
        } else {
          arr = [opt[opt.secondSide].current];
        }

        var firstSideOpt = helper.deepExtend({}, opt[opt.firstSide]);
        var secondSideOpt = helper.deepExtend({}, opt[opt.secondSide]);
        var result = [];
        arr.forEach(function (item) {
          var circleOption = {
            swapSides: opt.swapSides,
            justFirstLine: true
          };
          secondSideOpt.current = item;
          circleOption[opt.firstSide] = firstSideOpt;
          circleOption[opt.secondSide] = secondSideOpt;
          result = result.concat(api.sphere(circleOption));
        });

        if (opt.isBackward) {
          result.reverse();
        }

        return result;
      },
      custom: function (options) {
        var opt = getOptions(options);
        var point1 = {
          x: opt.column.current,
          y: opt.row.current
        };
        var point2 = {
          x: opt.column.current + opt.column.jumpCount,
          y: opt.row.current + opt.row.jumpCount
        };

        var convert = function (points) {
          var r = [];

          if (points.x[0] !== point1.x) {
            points.x.reverse();
          }

          if (points.y[0] !== point1.y) {
            points.y.reverse();
          }

          for (var i = 0, l = points.x.length; i < l; i++) {
            r.push({
              col: points.x[i],
              row: points.y[i]
            });
          }

          return r;
        };

        var result = [];
        result = getBresenhamsLine(point1, point2);
        result = convert(result);
        result = $(result).map(function (point) {
          return {
            col: api.lib.getRightIndex(point.col, opt.column.length, opt.column.loop),
            row: api.lib.getRightIndex(point.row, opt.row.length, opt.row.loop)
          };
        });
        return result;
      }
    };
    return api;
  }();
  /* eslint-env es6 */

  /* global helper */

  /* eslint-disable no-loop-func */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "LOADING_QUEUE" }] */


  var LOADING_QUEUE = function () {
    var _insideLib = {
      getStep: function (l) {
        var result = 1;

        if (l > 24) {
          result = Math.floor(l / 24);

          if (result > 3) {
            result = 3;
          }
        }

        return result;
      },
      getIndexes: function (length) {
        var result = [];
        var arr = [];
        var i;
        var tmp;
        var flag = true;

        var step = _insideLib.getStep(length);

        do {
          tmp = [];

          for (i = 0; i < length; i += step) {
            if (!arr[i]) {
              tmp.push(i);
              arr[i] = 1;
            }
          }

          if (step === 1) {
            flag = false;
          }

          result.push(tmp);
          step = Math.ceil(step / 2);
        } while (step >= 1 && flag);

        return result;
      },
      // print: (arr) => {
      //     let str = '';
      //     arr.forEach((_arr, index) => {
      //         let str2;
      //         if (index < 10) {
      //             str2 = index + ' - ';
      //         } else {
      //             str2 = index + '- ';
      //         }
      //         _arr.forEach(v => {
      //             str2 += v + ' ';
      //         });
      //         str2 += '\n';
      //         str += str2;
      //     });
      //     console.log(str);
      // },
      createArray: function (images) {
        var result = [];
        images.forEach(function (line) {
          var arr = [];
          line.forEach(function () {
            arr.push(0);
          });
          result.push(arr);
        });
        return result;
      },
      getRightIdexes: function (arr, startPos, length, callback) {
        arr.forEach(function (indexOfLine) {
          var index = indexOfLine + startPos;
          var rightIndex = helper.getArrayIndex(index, length);

          if (index < length || rightIndex < startPos) {
            callback(rightIndex);
          }
        });
      },
      getOptions: function (options) {
        // images[row][col]

        /*
            options {
                images: 36,
                startRow: 0,
                startCol: 0
            }
        */
        var opt = helper.deepExtend({}, options);
        opt.schemaOfImages = _insideLib.createArray(opt.images);
        opt.rowLength = opt.images.length;
        opt.colLength = opt.images[opt.startRow].length;
        return opt;
      },
      all: function (images, schema, index) {
        var result = [];

        for (var i = 0, l = images.length; i < l; i++) {
          for (var j = 0, len = images[i].length; j < len; j++) {
            if (!schema[i][j]) {
              result.push([i, j]);
              schema[i][j] = index + 1;
            }
          }
        }

        return result;
      },
      getSideOpt: function (opt) {
        var tmp;
        var result = {
          length: opt.colLength,
          start: opt.startCol,
          otherLength: opt.rowLength,
          otherStart: opt.startRow
        };

        if (opt.swapSides) {
          tmp = result.length;
          result.length = result.otherLength;
          result.otherLength = tmp;
          tmp = result.start;
          result.start = result.otherStart;
          result.otherStart = tmp;
        }

        return result;
      }
    };
    var api = {
      _: _insideLib,
      all: function (options) {
        var result = [];

        var opt = _insideLib.getOptions(options);

        var indexesOfCols = _insideLib.getIndexes(opt.colLength);

        var tmp = [];
        var index = 1;
        opt.images.forEach(function (line, i) {
          var l = line.length;

          _insideLib.getRightIdexes(indexesOfCols[0], opt.startCol, l, function (col) {
            var row = helper.getArrayIndex(i + opt.startRow, opt.rowLength);
            tmp.push([row, col]);
            opt.schemaOfImages[row][col] = 1;
          });
        });
        result.push(tmp);
        tmp = [];
        result.push(tmp.concat(_insideLib.all(opt.images, opt.schemaOfImages, index))); // _insideLib.print(opt.schemaOfImages);

        return result;
      },
      fastLine: function (options) {
        var result = [];

        var opt = _insideLib.getOptions(options);

        var sideOpt = _insideLib.getSideOpt(opt);

        var tmp = [];
        var index = 1;

        for (var i = 0, l = sideOpt.length; i < l; i++) {
          var _i = helper.getArrayIndex(i + sideOpt.start, sideOpt.length);

          if (opt.swapSides) {
            tmp.push([_i, opt.startCol]);
            opt.schemaOfImages[_i][opt.startCol] = index;
          } else {
            tmp.push([opt.startRow, _i]);
            opt.schemaOfImages[opt.startRow][_i] = index;
          }
        }

        result.push(tmp);
        tmp = [];
        result.push(tmp.concat(_insideLib.all(opt.images, opt.schemaOfImages, index))); // _insideLib.print(opt.schemaOfImages);

        return result;
      },
      line: function (options) {
        var result = [];

        var opt = _insideLib.getOptions(options);

        var sideOpt = _insideLib.getSideOpt(opt);

        var indexes = _insideLib.getIndexes(sideOpt.length);

        var tmp = [];
        var index = 1;

        _insideLib.getRightIdexes(indexes[0], sideOpt.start, sideOpt.length, function (i) {
          if (opt.swapSides) {
            tmp.push([i, opt.startCol]);
            opt.schemaOfImages[i][opt.startCol] = 1;
          } else {
            tmp.push([opt.startRow, i]);
            opt.schemaOfImages[opt.startRow][i] = 1;
          }
        });

        result.push(tmp);
        tmp = [];

        while (index < indexes.length) {
          if (indexes[index]) {
            _insideLib.getRightIdexes(indexes[index], sideOpt.start, sideOpt.length, function (i) {
              if (opt.swapSides) {
                tmp.push([i, opt.startCol]);
                opt.schemaOfImages[i][opt.startCol] = index + 1;
              } else {
                tmp.push([opt.startRow, i]);
                opt.schemaOfImages[opt.startRow][i] = index + 1;
              }
            });
          }

          index += 1;
        }

        result.push(tmp.concat(_insideLib.all(opt.images, opt.schemaOfImages, index))); // _insideLib.print(opt.schemaOfImages);

        return result;
      },
      sphere: function (options) {
        var result = [];

        var opt = _insideLib.getOptions(options);

        var sideOpt = _insideLib.getSideOpt(opt);

        var indexes = _insideLib.getIndexes(sideOpt.length);

        var otherIndexes = _insideLib.getIndexes(sideOpt.otherLength);

        var max = Math.max(indexes.length, otherIndexes.length);
        var tmp = [];
        var index = 1;

        _insideLib.getRightIdexes(indexes[0], sideOpt.start, sideOpt.length, function (i) {
          if (opt.swapSides) {
            tmp.push([i, opt.startCol]);
            opt.schemaOfImages[i][opt.startCol] = 1;
          } else {
            tmp.push([opt.startRow, i]);
            opt.schemaOfImages[opt.startRow][i] = 1;
          }
        });

        _insideLib.getRightIdexes(otherIndexes[0], sideOpt.otherStart, sideOpt.otherLength, function (i) {
          if (opt.swapSides) {
            if (!opt.schemaOfImages[opt.startRow][i]) {
              tmp.push([opt.startRow, i]);
              opt.schemaOfImages[opt.startRow][i] = 1;
            }
          } else if (!opt.schemaOfImages[i][opt.startCol]) {
            tmp.push([i, opt.startCol]);
            opt.schemaOfImages[i][opt.startCol] = 1;
          }
        });

        result.push(tmp);
        tmp = [];

        while (index < max) {
          if (indexes[index]) {
            _insideLib.getRightIdexes(indexes[index], sideOpt.start, sideOpt.length, function (i) {
              if (opt.swapSides) {
                tmp.push([i, opt.startCol]);
                opt.schemaOfImages[i][opt.startCol] = index + 1;
              } else {
                tmp.push([opt.startRow, i]);
                opt.schemaOfImages[opt.startRow][i] = index + 1;
              }
            });
          }

          if (otherIndexes[index]) {
            _insideLib.getRightIdexes(otherIndexes[index], sideOpt.otherStart, sideOpt.otherLength, function (i) {
              if (opt.swapSides) {
                tmp.push([opt.startRow, i]);
                opt.schemaOfImages[opt.startRow][i] = index + 1;
              } else {
                tmp.push([i, opt.startCol]);
                opt.schemaOfImages[i][opt.startCol] = index + 1;
              }
            });
          }

          index += 1;
        }

        result.push(tmp.concat(_insideLib.all(opt.images, opt.schemaOfImages, index))); // _insideLib.print(opt.schemaOfImages);

        return result;
      }
    };
    return api;
  }();
  /* eslint-env es6 */

  /* global EventEmitter */

  /* global helper */

  /* global SpinResponsiveImage, INTRO_QUEUE, LOADING_QUEUE */

  /* eslint no-multi-assign: 0 */

  /* eslint operator-assignment: 0 */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "ImagesMap" }] */

  /* eslint class-methods-use-this: "off" */


  var ImagesMap = function () {
    var getPointsString = function (row, col) {
      return row + '.' + col;
    };

    var checkIndex = function (index, increment) {
      return index % increment === 0;
    };

    var getRoot = function (url) {
      var result = [];
      result = $(url.split('//'));
      url = result[1];
      result = result[0];
      url = url.split('/')[0];
      result = [result, url];
      result = result.join('//');
      return result;
    };

    var getImageUrl = function (absoluteURL, baseURL, imageUrl) {
      var result;

      if (/^\//.test(imageUrl)) {
        result = absoluteURL + imageUrl;
      } else {
        result = baseURL + '/' + imageUrl;
      }

      return result;
    };

    var ImagesMap_ = /*#__PURE__*/function (_EventEmitter) {
      "use strict";

      bHelpers.inheritsLoose(ImagesMap_, _EventEmitter);

      function ImagesMap_(o) {
        var _this2;

        _this2 = _EventEmitter.call(this) || this;
        _this2.o = o;
        _this2.startColumn = 0;
        _this2.startRow = 0;
        _this2.currentColumn = 0;
        _this2.currentRow = 0;
        _this2.nextColumn = 0;
        _this2.nextRow = 0;
        _this2.futureColumn = 0;
        _this2.futureRow = 0;
        _this2.imgMap = [];
        _this2.isAvailableOfLoading = true;
        _this2.images = [];
        _this2.isStartedFullInit = false;
        _this2.imageInfoPromise = null;
        _this2.loadingMap = {
          queue: []
        };
        _this2.url = helper.spinLib.getUrl(_this2.o.url);
        _this2.absoluteURL = getRoot(_this2.url);
        _this2.infoImg = null;
        _this2.imageInfoId = 'img-' + helper.generateUUID();

        _this2.setEvents();

        return _this2;
      }

      var _proto2 = ImagesMap_.prototype;

      _proto2.createImageInfo = function createImageInfo() {
        var _this3 = this;

        var getItemFromObject = function () {
          var key1 = $J.hashKeys(_this3.o.layers)[0];
          var key2 = $J.hashKeys(_this3.o.layers[key1])[0];
          return _this3.o.layers[key1][key2];
        };

        if (!this.infoImg) {
          this.infoImg = new SpinResponsiveImage(globalFunctions.normalizeURL(getImageUrl(this.absoluteURL, this.url, getItemFromObject())), {
            imageSettings: this.o.imageSettings,
            infoId: this.imageInfoId,
            round: true,
            referrerPolicy: this.o.referrerPolicy
          }, null, null);
          this.infoImg.setParent(this);
        }

        return this.infoImg;
      };

      _proto2.loadImageInfo = function loadImageInfo() {
        var _this4 = this;

        if (!this.imageInfoPromise) {
          this.imageInfoPromise = new Promise(function (resolve, reject) {
            _this4.createImageInfo(); // this.infoImg


            _this4.infoImg.getImageInfo().then(function (info) {
              if (_this4.isStartedFullInit) {
                _this4.createQueue();
              }

              resolve({
                size: _this4.infoImg.getOriginSize()
              });
            }).catch(function (err) {
              reject({
                error: err
              });
            });
          });
        }

        return this.imageInfoPromise;
      };

      _proto2.startFullInit = function startFullInit(o) {
        var _this5 = this;

        if (this.isStartedFullInit) {
          return;
        }

        this.isStartedFullInit = true;
        this.o = $J.extend(this.o, o);
        this.o.layers = helper.spinLib.checkLayers(this.o.layers);
        this.o.layers = helper.spinLib.swapLayers(this.o.layers, this.o.swapSides);
        helper.objEach(this.o.layers, function (key, rows, rowIndex) {
          if (checkIndex(rowIndex, _this5.o.rowIncrement)) {
            var arr = [];
            helper.objEach(rows, function (_key, frame, frameIndex) {
              if (checkIndex(frameIndex, _this5.o.columnIncrement)) {
                arr.push(globalFunctions.normalizeURL(getImageUrl(_this5.absoluteURL, _this5.url, frame)));
              }
            });

            _this5.imgMap.push(arr);
          }
        });
        helper.spinLib.reverse(this.o.reverseColumn, this.o.reverseRow, this.imgMap);
        this.createImages(this.imgMap);
        this.setFirstImage();

        if (this.imageInfoPromise) {
          this.infoImg.getImageInfo().then(function (info) {
            if (!_this5.loadingMap.queue.length) {
              _this5.createQueue();
            }
          }).catch(function (err) {// empty
          });
        }
      };

      _proto2.setImageSettings = function setImageSettings(options) {
        if (!options) {
          options = {};
        }

        if (!options.imageSettings) {
          options.imageSettings = {};
        }

        if (!options.imageSettings.scale) {
          options.imageSettings.scale = {};
        }

        if (!options.callbackData) {
          options.callbackData = {};
        }

        options.imageSettings.scale.option = 'fill';

        if (!options.srcset) {
          options.srcset = {};
        }

        if (this.o.quality !== null) {
          if (!options.src) {
            options.src = {};
          }

          options.src = this.o.quality;
        }

        if (options.dppx >= 1.5) {
          options.srcset.quality = this.o.hdQuality;
        } else if (this.o.quality !== null) {
          options.srcset.quality = this.o.quality;
        }

        return options;
      };

      _proto2.getImage = function getImage(row, col) {
        var val1;
        var val2;

        if ($J.defined(row)) {
          val1 = row;
          val2 = col;
        } else {
          val1 = this.currentRow;
          val2 = this.currentColumn;
        }

        return this.images[val1][val2];
      };

      _proto2.getThumbnail = function getThumbnail(imageOptions) {
        return this.getImage(this.startRow, this.startColumn).getThumbnail(imageOptions);
      };

      _proto2.getMap = function getMap() {
        var arr = [];
        this.imgMap.forEach(function (row) {
          var arr2 = [];
          row.forEach(function (col) {
            arr2.push(false);
          });
          arr.push(arr2);
        });
        return arr;
      };

      _proto2.setEvents = function setEvents() {
        var _this6 = this;

        var firstIsLoaded = false;
        var partIsLoaded = false;
        var allIsLoaded = false;

        var allCheck = function (data) {
          if (firstIsLoaded && partIsLoaded && allIsLoaded || data.lens) {
            return;
          }

          if (!firstIsLoaded && data.col === _this6.currentColumn && data.row === _this6.currentRow) {
            firstIsLoaded = true;

            _this6.emit('mapFirstImageLoaded', {
              data: data
            });
          }

          if (!partIsLoaded && _this6.loadingMap.checkOfFirstPartImagesLoading(data.row, data.col)) {
            partIsLoaded = true;

            _this6.emit('mapImagesReady');
          }

          if (!allIsLoaded && _this6.loadingMap.checkOtherImagesLoading(data.row, data.col)) {
            allIsLoaded = true;
          }

          if (firstIsLoaded && partIsLoaded && allIsLoaded) {
            _this6.emit('mapAllImagesLoaded');
          }
        };

        this.on('imageOnload', function (e) {
          e.stopAll();

          var _data = $J.extend({
            isCurrent: e.data.col === _this6.currentColumn && e.data.row === _this6.currentRow
          }, e.data);

          _this6.emit('mapImageLoaded', {
            data: _data
          });

          allCheck(_data);
        });
        this.on('imageOnerror', function (e) {
          e.stopAll();
          e.data.error = true;

          _this6.emit('mapImageLoaded', {
            data: e.data
          });

          allCheck(e.data);
          console.log('image error');
        });
      };

      _proto2.getHintType = function getHintType() {
        var result;
        var r = this.getCountOfRows();
        var c = this.getCountOfFrames();

        if (r > 1 && c > 1) {
          result = 'multi-row';
        } else if (r > 1) {
          result = 'col';
        } else {
          result = 'row';
        }

        return result;
      };

      _proto2.isLoaded = function isLoaded(imageOptions) {
        var img = this.getImage();
        imageOptions = this.setImageSettings(imageOptions);
        return img.isLoaded(imageOptions);
      };

      _proto2.isExist = function isExist(imageOptions) {
        var img = this.getImage();
        imageOptions = this.setImageSettings(imageOptions);
        return img.isExist(imageOptions);
      };

      _proto2.isCurrent = function isCurrent(position) {
        return position.row === this.currentRow && position.col === this.currentColumn;
      };

      _proto2.getCountOfImages = function getCountOfImages() {
        return this.getCountOfFrames() * this.getCountOfRows();
      };

      _proto2.getCountOfFrames = function getCountOfFrames() {
        var result = this.images[0].length || 0;
        return result;
      };

      _proto2.getCountOfRows = function getCountOfRows() {
        var result = this.images.length;
        return result;
      };

      _proto2.pixelPerFrame = function pixelPerFrame(width) {
        var min = width;
        var cols = this.getCountOfFrames();

        if (cols > 1) {
          if (!this.o.loopColumn) {
            min = min / 2;
          }

          min = min / cols;
        } else {
          min = min / this.getCountOfRows();
        } // eslint-disable-next-line


        min = min / Math.pow(this.o.columnSpeed / 50, 2);
        return min;
      };

      _proto2.pixelPerRow = function pixelPerRow(height) {
        var min = height;
        var rows = this.getCountOfRows();

        if (rows > 1) {
          if (!this.o.loopRow) {
            min = min / 2;
          }

          min = min / rows;
        } else {
          min = min / this.getCountOfFrames();
        } // eslint-disable-next-line


        min = min / Math.pow(this.o.rowSpeed / 50, 2);
        return min;
      };

      _proto2.createImages = function createImages(arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          var _arr = [];

          for (var j = 0, len = arr[i].length; j < len; j++) {
            var img = new SpinResponsiveImage(globalFunctions.adjustURL(arr[i][j]), {
              imageSettings: this.o.imageSettings,
              infoId: this.imageInfoId,
              round: true,
              referrerPolicy: this.o.referrerPolicy
            }, j, i);
            img.setParent(this);

            _arr.push(img);
          }

          this.images.push(_arr);
        }
      };

      _proto2.setFirstImage = function setFirstImage() {
        var sr = this.o.startRow;
        var sc = this.o.startColumn;

        if (this.o.reverseRow) {
          sr = this.images.length + 1 - sr;
        }

        if (this.o.reverseColumn) {
          sc = this.images[0].length + 1 - sc;
        }

        this.currentRow = sr - 1;
        this.currentColumn = sc - 1;

        if (this.currentRow > this.images.length - 1) {
          this.currentRow = 0;
        }

        if (this.currentColumn > this.images[0].length - 1) {
          this.currentColumn = 0;
        }

        this.startColumn = this.futureColumn = this.nextColumn = this.currentColumn;
        this.startRow = this.futureRow = this.nextRow = this.currentRow;
      };

      _proto2.loadImage = function loadImage(imageOptions, row, col) {
        var img = this.getImage(row, col);
        imageOptions = this.setImageSettings(imageOptions);
        img.getImage(imageOptions);
      };

      _proto2.loadFirstImage = function loadFirstImage(imageOptions) {
        if (!this.loadingMap.queue.length) {
          return;
        }

        var point = this.loadingMap.queue[0].shift();
        this.loadImage(imageOptions, point[0], point[1]);
      };

      _proto2.loadFirstPartOfImages = function loadFirstPartOfImages(imageOptions) {
        var _this7 = this;

        if (!this.loadingMap.queue.length) {
          return;
        }

        this.loadingMap.queue[0].forEach(function (point) {
          _this7.loadImage(imageOptions, point[0], point[1]);
        });
      };

      _proto2.loadOtherImages = function loadOtherImages(imageOptions) {
        var _this8 = this;

        if (this.isAvailableOfLoading && this.loadingMap.queue.length) {
          imageOptions = this.setImageSettings(imageOptions);
          this.loadingMap.queue[1].forEach(function (point) {
            _this8.loadImage(imageOptions, point[0], point[1]);
          });
        }
      };

      _proto2.loadImages = function loadImages(imageOptions) {
        var cc = this.currentColumn;

        if (this.isAvailableOfLoading) {
          imageOptions = this.setImageSettings(imageOptions);

          if (this.o.swapSides) {
            this.images.forEach(function (line) {
              var img = line[cc];

              if (!img.isExist(imageOptions)) {
                img.getImage(imageOptions);
              } else {
                img.sendLoad(imageOptions);
              }
            });
          } else {
            this.images.forEach(function (line) {
              line.forEach(function (img) {
                if (!img.isExist(imageOptions)) {
                  img.getImage(imageOptions);
                } else {
                  img.sendLoad(imageOptions);
                }
              });
            });
          }
        }
      };

      _proto2.isImagesExist = function isImagesExist(imageOptions) {
        var j;
        imageOptions = this.setImageSettings(imageOptions);

        for (var i = 0, l = this.images.length; i < l; i++) {
          for (j = 0; j < this.images[i].length; j++) {
            if (!this.images[i][j].isExist(imageOptions)) {
              return false;
            }
          }
        }

        return true;
      } // isImageExist(imageOptions) {
      //     return this.images[this.currentRow][this.currentColumn]
      //         .isExist(imageOptions.width, imageOptions.height, imageOptions.additionalImageSettings ? imageOptions.additionalImageSettings.tile : null);
      // }
      ;

      _proto2.createQueue = function createQueue() {
        var _this9 = this;

        var name;

        switch (this.o.loadingSchema) {
          case 'momentum':
            name = 'fastLine';
            break;

          case 'full':
            name = 'all';
            break;

          case 'row':
          case 'spin':
            name = 'line';
            break;

          case 'sphere':
          case 'intro':
          case 'twitch':
            name = 'sphere';
            break;

          default:
            name = 'all';
        }

        this.loadingMap.queue = LOADING_QUEUE[name]({
          swapSides: this.o.swapSides,
          images: this.images,
          startRow: this.currentRow,
          startCol: this.currentColumn
        });

        this.loadingMap.checkOfFirstPartImagesLoading = function () {
          var firstPartOfImages = [];

          _this9.loadingMap.queue[0].forEach(function (indexes) {
            firstPartOfImages.push(getPointsString(indexes[0], indexes[1]));
          });

          firstPartOfImages.shift(); // first image

          var count = firstPartOfImages.length;
          var areLoaded = false;

          if (!count) {
            areLoaded = true;
          }

          return function (row, col) {
            if (!areLoaded) {
              if (firstPartOfImages.indexOf(getPointsString(row, col)) >= 0) {
                count -= 1;

                if (count === 0) {
                  firstPartOfImages = [];
                  areLoaded = true;
                }
              }
            }

            return areLoaded;
          };
        }();

        this.loadingMap.checkOtherImagesLoading = function () {
          var otherImages = [];

          _this9.loadingMap.queue[1].forEach(function (indexes) {
            otherImages.push(getPointsString(indexes[0], indexes[1]));
          });

          var count;
          var areLoaded = false;
          count = otherImages.length;

          if (!count) {
            areLoaded = true;
          }

          return function (row, col) {
            if (!areLoaded) {
              if (otherImages.indexOf(getPointsString(row, col)) >= 0) {
                count -= 1;

                if (count === 0) {
                  otherImages = [];
                  areLoaded = true;
                }
              }
            }

            return areLoaded;
          };
        }();
      };

      _proto2.prepareFutureImage = function prepareFutureImage(direction, count) {
        if (!count) {
          count = 1;
        }

        var index;
        var length;
        var loop;

        if ($J.contains(['next', 'prev'], direction)) {
          loop = this.o.loopColumn;
          index = this.futureColumn;
          length = this.getCountOfFrames();

          if (direction === 'next') {
            index += count;
          } else {
            index -= count;
          }

          this.futureColumn = INTRO_QUEUE.lib.getRightIndex(index, length, loop);
        } else {
          loop = this.o.loopRow;
          index = this.futureRow;
          length = this.getCountOfRows();

          if (direction === 'down') {
            index += count;
          } else {
            index -= count;
          } // loop = false;


          this.futureRow = INTRO_QUEUE.lib.getRightIndex(index, length, loop);
        }
      };

      _proto2.setPreparedNextImage = function setPreparedNextImage() {
        this.futureColumn = this.currentColumn = this.nextColumn;
        this.futureRow = this.currentRow = this.nextRow;
        this.emit('frameChange', {
          data: {
            column: this.currentColumn,
            row: this.currentRow
          }
        });
      };

      _proto2.setPreparedFutureImage = function setPreparedFutureImage() {
        var img = this.getImage(this.futureRow, this.futureColumn);

        if (img && img.isReady()) {
          this.currentColumn = this.futureColumn;
          this.currentRow = this.futureRow;
          this.emit('frameChange', {
            data: {
              column: this.currentColumn,
              row: this.currentRow
            }
          });
        }
      };

      _proto2.resetPreparedImage = function resetPreparedImage() {
        this.futureColumn = this.nextColumn = this.currentColumn;
        this.futureRow = this.nextRow = this.currentRow;
      };

      _proto2.getCurrentImage = function getCurrentImage(imageOptions) {
        imageOptions = this.setImageSettings(imageOptions);
        var c = this.currentColumn;
        var r = this.currentRow;
        var img = this.getImage(r, c);
        img = img.getImage(imageOptions);
        return img;
      };

      _proto2.getOriginImageUrl = function getOriginImageUrl() {
        var c = this.currentColumn;
        var r = this.currentRow;
        var url = this.getImage(r, c);
        url = url.getOriginImageUrl();
        return url;
      };

      _proto2.jump = function jump(axis, value
      /* count or index */
      , direction) {
        var _this10 = this;

        var result = false;
        var row;
        var col;

        var checkImg = function (r, c) {
          var res = false;

          if (_this10.getImage(r, c).isReady()) {
            _this10.nextRow = r;
            _this10.nextColumn = col;

            _this10.setPreparedNextImage();

            res = true;
          }

          return res;
        };

        switch (axis) {
          case 'row':
            row = helper.spinLib.getNextIndex(this.currentRow, value, direction, this.getCountOfRows(), this.o.loopRow);
            col = this.currentColumn;
            result = checkImg(row, col);
            break;

          case 'col':
            col = helper.spinLib.getNextIndex(this.currentColumn, value, direction, this.getCountOfFrames(), this.o.loopColumn);
            row = this.currentRow;
            result = checkImg(row, col);
            break;
          // no default
        }

        return result;
      };

      _proto2.setNextAnimationFrame = function setNextAnimationFrame(index) {
        var point = this.imagesBuffer[index];
        var img = this.getImage(point.row, point.col);

        if (img && img.isReady()) {
          this.nextColumn = point.col;
          this.nextRow = point.row;
        }
      };

      _proto2.getNextBufferIndex = function getNextBufferIndex(fromIndex) {
        var _this11 = this;

        var count = 0;
        var l = this.imagesBuffer.length;

        var check = function (point) {
          var img = _this11.getImage(point.row, point.col);

          var result = false;

          if (img && img.isReady()) {
            result = true;
          }

          return result;
        };

        var point;

        do {
          count += 1;
          fromIndex += 1;

          if (fromIndex >= l) {
            count = 0;
          } else {
            point = this.imagesBuffer[fromIndex];
          }
        } while (count > 0 && (!point || !check(point)));

        return count;
      };

      _proto2.createAnimation = function createAnimation(typeOfBuffer, isBackward) {
        var jfl = false;
        var a = false;
        var cols = 0;
        var rows = 0;

        switch (typeOfBuffer) {
          case 'as-row':
            typeOfBuffer = 'sphere';
            jfl = true;
            break;

          case 'as-sphere':
            typeOfBuffer = 'sphere';
            break;

          case 'as-full':
            typeOfBuffer = 'full';
            break;

          case 'as-helix':
            // TODO do the effect
            typeOfBuffer = 'sphere';
            break;

          case 'intro':
            typeOfBuffer = 'intro';
            jfl = true;
            break;

          case 'twitch':
            typeOfBuffer = 'twitch';
            break;

          case 'spin':
            typeOfBuffer = 'sphere';
            jfl = true;
            break;

          case 'momentum':
            typeOfBuffer = 'sphere';
            jfl = true;
            a = true;
            break;

          case 'sphere':
            typeOfBuffer = 'sphere';
            break;

          default:
            cols = typeOfBuffer.cols;
            rows = typeOfBuffer.rows;
            typeOfBuffer = 'custom';
        }

        this.imagesBuffer = INTRO_QUEUE[typeOfBuffer]({
          justFirstLine: jfl,
          swapSides: this.o.swapSides,
          axelerate: a,
          isBackward: isBackward,
          count: typeOfBuffer,
          row: {
            length: this.getCountOfRows(),
            loop: this.o.loopRow,
            current: this.currentRow,
            jumpCount: rows
          },
          column: {
            length: this.getCountOfFrames(),
            loop: this.o.loopColumn,
            current: this.currentColumn,
            jumpCount: cols
          }
        });
        return this.imagesBuffer.length;
      };

      _proto2.clearFramesQueue = function clearFramesQueue() {
        this.imagesBuffer = [];
      };

      _proto2.cancelLoadingImage = function cancelLoadingImage(imageOptions) {
        var img = this.getImage();

        if (img) {
          imageOptions = this.setImageSettings(imageOptions);
          img.cancelLoadingImage(imageOptions);
        }
      };

      _proto2.getStartRow = function getStartRow() {
        return this.startRow;
      };

      _proto2.getStartColumn = function getStartColumn() {
        return this.startColumn;
      };

      _proto2.getCurrentRow = function getCurrentRow() {
        return this.currentRow;
      };

      _proto2.getCurrentColumn = function getCurrentColumn() {
        return this.currentColumn;
      };

      _proto2.getImagesBuffer = function getImagesBuffer() {
        return this.imagesBuffer;
      };

      _proto2.destroy = function destroy(last) {
        this.isAvailableOfLoading = false;
        this.resetPreparedImage();
        this.clearFramesQueue();
        this.images.forEach(function (row) {
          row.forEach(function (frame) {
            frame.destroy();
          });
        });
        this.off('imageOnload');
        this.off('imageOnerror');
        this.loadingMap = {
          queue: []
        };
        this.imgMap = [];
        this.images = $([]);
        this.currentColumn = 0;
        this.currentRow = 0;

        _EventEmitter.prototype.destroy.call(this);
      };

      return ImagesMap_;
    }(EventEmitter);

    return ImagesMap_;
  }();
  /* eslint-env es6 */

  /* global defaultOptions, ImagesMap, SpinHotspots, Animation, Zoominstance, helper, ResponsiveImage, ProgressLoader, Hint, $J, globalFunctions, globalVariables */

  /* eslint-disable indent */

  /* eslint-disable no-lonely-if */

  /* eslint-disable class-methods-use-this */

  /* eslint operator-assignment: 0 */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Spin" }] */


  var SPIN_CONF_VER = 1;
  var P = globalVariables.smv;
  var CSS_CLASS_NAME = P + '-spin';
  var BRAND_LANDING = 'https://sirv.com/about-spin/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(spin)&utm_campaign=branding'; // const calcScalePosition = (scale, size) => {
  //     return (size - size * scale) / 2;
  // };

  var ActivatedCurtain = /*#__PURE__*/function () {
    "use strict";

    function ActivatedCurtain(parentNode, activeNode) {
      this.parentNode = parentNode;
      this.activeNode = activeNode;
      this.activatedCurtain = $J.$new('div').addClass('spin-activated-curtain').setCss({
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        'z-index': 999999999
      });
      this.state = 0; // 0 - deactivated, 1 - activated
    }

    var _proto3 = ActivatedCurtain.prototype;

    _proto3.show = function show() {
      if (this.state) {
        this.activatedCurtain.setCssProp('display', 'block');
        this.activeNode.addClass(P + '-activated');
      }
    };

    _proto3.hide = function hide() {
      if (this.state) {
        this.activatedCurtain.setCssProp('display', 'none');
        this.activeNode.removeClass(P + '-activated');
      }
    };

    _proto3.activateCurtain = function activateCurtain() {
      if (!this.state) {
        this.state = 1;
        this.activeNode.addClass(P + '-sleeping');
        this.parentNode.append(this.activatedCurtain);
      }
    };

    _proto3.deactivateCurtain = function deactivateCurtain() {
      if (this.state) {
        this.state = 0;
        this.activeNode.removeClass(P + '-sleeping');
        this.activatedCurtain.remove();
      }
    };

    _proto3.addTapEvents = function addTapEvents(callback) {
      var _this12 = this;

      this.activatedCurtain.addEvent('tap', function (e) {
        if (_this12.state) {
          e.action = 'activate';
          callback(e);
        }
      });
      this.activeNode.addEvent('tap', function (e) {
        if (_this12.state) {
          e.action = 'deactivate';
          callback(e);
        }
      });
    };

    _proto3.addPinchEvent = function addPinchEvent(handler) {
      this.activeNode.addEvent('pinch', handler);
    };

    _proto3.removePinchEvent = function removePinchEvent(handler) {
      this.activeNode.removeEvent('pinch', handler);
    };

    _proto3.destroy = function destroy() {
      this.state = 1;
      this.hide();
      this.deactivateCurtain();
      this.removePinchEvent();
      this.activeNode.removeEvent('tap');
      this.activatedCurtain.remove();
      this.activatedCurtain.removeEvent('tap');
      this.activatedCurtain = null;
    };

    return ActivatedCurtain;
  }();

  var checkProps = function (obj) {
    if (!obj.common) {
      obj.common = {};
    }

    if (!obj.common.common) {
      obj.common.common = {};
    }

    if (!obj.common.mobile) {
      obj.common.mobile = {};
    }

    if (!obj.local) {
      obj.local = {};
    }

    if (!obj.local.common) {
      obj.local.common = '';
    }

    if (!obj.local.mobile) {
      obj.local.mobile = '';
    }

    return obj;
  };

  var fnStopTouchMove = function (e) {
    e.stopDefaults();
  };

  var Spin = /*#__PURE__*/function (_Zoominstance) {
    "use strict";

    bHelpers.inheritsLoose(Spin, _Zoominstance);

    function Spin(node, options) {
      var _this13;

      _this13 = _Zoominstance.call(this, node, options, defaultOptions) || this;
      _this13.type = globalVariables.SLIDE.TYPES.SPIN; // this.instanceOptions = this.makeOptions();

      _this13.canvas = null;
      _this13.canvasContainer = $J.$new('div').addClass('spin-canvas-container');
      _this13.coreNode = $J.$new('div').addClass('sirv-spin');

      _this13.instanceNode.append(_this13.coreNode); // this.additionalCanvases = [];


      _this13.ctx = null;
      _this13.isSmoothing = false;
      _this13.smooseTimeout = null;
      _this13.minSizeOfFrame = 0;
      _this13.minSizeOfRow = 0;
      _this13.size = {
        width: 0,
        height: 0
      };
      _this13.isDragMove = false;
      _this13.longTapTimer = false;
      _this13.imagesMap = null;
      _this13.isInited = false;
      _this13.loader = null;
      _this13.hint = null;
      _this13.openedImg = null;
      _this13.scale = 1;
      _this13.cssId = -1;
      _this13.boxBoundaries = null;
      _this13.hotspots = null;
      _this13.animationFX = null;
      _this13.loadedImages = [];
      _this13.currentSize = {
        width: 0,
        height: 0
      };
      _this13.currentImageSize = {
        width: 0,
        height: 0
      };
      _this13.standardSize = {
        width: 0,
        height: 0
      };
      _this13.lastImg = null;
      _this13.startLoadingTime = null;
      _this13.isOver = false;
      _this13.isSpinActivated = !$J.browser.mobile;
      _this13.canvasPromise = null;
      _this13.firstImageLoaded = false;
      _this13.firstPartOfImagesLoaded = false;
      _this13.isInfoLoaded = false;
      _this13.customActionWas = false;
      _this13.isAutoplayPaused = false; // the variable is inside option which is hidden

      _this13.reflectDirection = false;
      _this13.configURL = _this13.instanceNode.attr('data-src') || _this13.instanceNode.attr('data-config') || '';
      _this13.imageBaseURL = globalFunctions.normalizeURL(_this13.configURL.replace(/([^#?]+)\/.*$/, '$1/'));
      _this13.absoluteURL = _this13.imageBaseURL.replace(/(^https?:\/\/[^/]*).*/, '$1/');
      _this13.configHash = $J.getHashCode(_this13.configURL.replace(/^http(s)?:\/\//, ''));
      _this13.configPath = '/' + _this13.configURL.replace(_this13.absoluteURL, '');
      _this13.imageInfoCallbackName = 'sirv_spin_image_info_';
      _this13.sessionId = $J.getHashCode(_this13.configURL.replace(/^http(s)?:\/\//, '') + $J.D.node.location.href.replace(/^http(s)?:\/\//, '') + $J.now());
      _this13.layers = {};
      _this13.imageSettings = {};
      _this13.hotspotsData = [];
      _this13.fullscreenStartTime = 0;
      _this13.meta = {};
      _this13.isFullscreen = options.isFullscreen;
      _this13.nativeFullscreen = options.nativeFullscreen;
      _this13.infoSettings = {};
      _this13.autospinResumeTimer = null;
      _this13.isHidden = false;
      _this13.sessionStartTime = 0;
      _this13.animationCloud = null;
      _this13.touchDragCloud = null;
      _this13.slideDragEventStart = false;
      _this13.dppx = null;
      _this13.startTimeForZommEvent = null;
      _this13.resizeAnimationTimer = helper.debounce(function () {
        _this13.animate('inactive');
      }, 1000);
      _this13.keyPressHandlerForShiftButton = null;
      _this13.firstUserInteraction = false;
      _this13.userColumn = 0;
      _this13.userRow = 0;
      _this13.placeholder = _this13.instanceNode.node.querySelector('img');

      if (_this13.placeholder) {
        _this13.placeholder = $(_this13.placeholder);
      }

      _this13.replaceTextParamURLFromMetadata();

      _this13.trackUnload = function () {
        _this13.sendStats('Page Unload', $J.now() - _this13.sessionStartTime, {
          message: 'Stopped'
        }, true);
      }; // Handle window resize to prevent page dragging on mobile devices when spin fills the entire page.


      _this13.disableScrollOnMobile = function () {
        var docFullSize = $J.D.getFullSize();

        var placeholderSize = _this13.instanceNode.getSize();

        if (Math.abs(placeholderSize.height - docFullSize.height) <= 50) {
          _this13.instanceNode.addEvent('touchmove', fnStopTouchMove);
        } else {
          _this13.instanceNode.removeEvent('touchmove', fnStopTouchMove);
        }
      };

      _this13.resizeWindowTimer = null;

      _this13.windowResizeCallback = function () {
        clearTimeout(_this13.resizeWindowTimer);
        _this13.resizeWindowTimer = setTimeout(function () {
          _this13.disableScrollOnMobile();
        }, 10);
      };

      _this13.api = $J.extend(_this13.api, {
        isInitialized: _this13.isInitialized.bind(bHelpers.assertThisInitialized(_this13)),
        // new
        play: _this13.play.bind(bHelpers.assertThisInitialized(_this13)),
        pause: _this13.pause.bind(bHelpers.assertThisInitialized(_this13)),
        rotate: _this13.rotateXY.bind(bHelpers.assertThisInitialized(_this13)),
        rotateX: _this13.rotateX.bind(bHelpers.assertThisInitialized(_this13)),
        rotateY: _this13.rotateY.bind(bHelpers.assertThisInitialized(_this13)),
        jump: _this13.jump.bind(bHelpers.assertThisInitialized(_this13)),
        jumpRows: _this13.jumpRows.bind(bHelpers.assertThisInitialized(_this13)),
        // new
        jumpCols: _this13.jumpCols.bind(bHelpers.assertThisInitialized(_this13)),
        // new
        // resize: this.resize.bind(this), // parent class
        // zoomIn: this.zoomIn.bind(this), // parent class
        // zoomOut: this.zoomOut.bind(this), // parent class
        // isZoomed: this.isZoomed.bind(this), // new, parent class
        // isReady: this.isReady.bind(this), // parent class
        // getOptions: this.getOptions.bind(this), // parent class
        // hotspots: {}, // parent class, hotspots api
        currentFrame: _this13.currentFrame.bind(bHelpers.assertThisInitialized(_this13))
      });

      _this13.createHotspotsClass(SpinHotspots);

      _this13.getInfo().then(function () {
        if ($J.browser.mobile && _this13.option('tappingFirst')) {
          _this13.activatedCurtain = new ActivatedCurtain(_this13.instanceNode, _this13.coreNode);
        } else {
          _this13.isSpinActivated = true;
        }

        _this13.createMap(_this13.quality, _this13.hdQuality, _this13.isHDQualitySet);
      }).catch(function (e) {});

      return _this13;
    } // API


    var _proto4 = Spin.prototype;

    _proto4.isInitialized = function isInitialized() {
      return this.isInited;
    } // API
    ;

    _proto4.rotateXY = function rotateXY(x, y) {
      if (this._isReady && !this.isZoomed()) {
        return this.rotate(x, y);
      }

      return false;
    } // API
    ;

    _proto4.rotateX = function rotateX(frames) {
      if (this._isReady && !this.isZoomed()) {
        return this.rotate(frames, null);
      }

      return false;
    } // API
    ;

    _proto4.rotateY = function rotateY(frames) {
      if (this._isReady && !this.isZoomed()) {
        return this.rotate(null, frames);
      }

      return false;
    }
    /**
     * Jump up/down by certain number of rows
     * @param  {int} rows Number of rows to jump
     * @return
     */
    // API
    ;

    _proto4.jump = function jump(rows) {
      return this.jumpRows(rows);
    } // API
    ;

    _proto4.jumpRows = function jumpRows(frame) {
      if (this._isReady && !this.isZoomed()) {
        return this.jumpTo(frame, 'row');
      }

      return false;
    } // API
    ;

    _proto4.jumpCols = function jumpCols(frame) {
      if (this._isReady && !this.isZoomed()) {
        return this.jumpTo(frame, 'col');
      }

      return false;
    }
    /**
     * Retrieve current visible frame
     * @return
     */
    // API
    ;

    _proto4.currentFrame = function currentFrame() {
      if (this._isReady) {
        return this.getCurrentFrame();
      }

      return null;
    } // API
    ;

    _proto4.isActive = function isActive() {
      return this.isSpinActivated;
    };

    _proto4.makeGlobalOptions = function makeGlobalOptions(optionsInstance) {
      var o = this.options.options;
      optionsInstance.fromJSON(o.common.common);
      helper.objEach(this.infoSettings, function (key, value) {
        if (!$J.contains(['images', 'hotspots'], key)) {
          optionsInstance.set(key, value);
        }
      });
      optionsInstance.fromString(o.local.common);
      optionsInstance.fromString(this.instanceNode.attr('data-options') || '');
      return optionsInstance;
    };

    _proto4.makeOptions = function makeOptions() {
      this.options.options = checkProps(this.options.options);
      return _Zoominstance.prototype.makeOptions.call(this);
    };

    _proto4.sendStats = function sendStats(name, time, additionalData, useBeacon) {
      var data = {
        account: this.config.account,
        useBeacon: !!useBeacon,
        event: name,
        eventTime: time,
        sessionId: this.sessionId,
        origin: this.configPath
      };

      if (additionalData) {
        data.data = additionalData;
      }

      this.emit('stats', {
        data: data
      });
    };

    _proto4.getInfo = function getInfo() {
      var _this14 = this;

      if (!this.gettingInfoPromise) {
        this.gettingInfoPromise = new Promise(function (resolve, reject) {
          _this14.waitGettingInfo.wait(function () {
            var cfCallbackName = 'sirv_spin_info_v' + SPIN_CONF_VER + '_' + _this14.configHash;
            var url = _this14.configURL + ($J.stringHas(_this14.configURL, '?') ? '&' : '?') + 'info=' + cfCallbackName;
            helper.getRemoteData(url, cfCallbackName, _this14.referrerPolicy).then(function (config) {
              if (!_this14.destroyed) {
                if (config.layers) {
                  _this14.config = config;
                  _this14.layers = _this14.config.layers;
                  _this14.meta = _this14.config._file.meta || null;
                  _this14.infoSettings = _this14.config.settings;
                  _this14.hotspotsData = _this14.config.settings.hotspots || [];
                  _this14.imageSettings = _this14.config.settings.images.main;
                  _this14.accountInfo = {
                    account: _this14.config.account,
                    branded: _this14.config.branded
                  };
                  _this14.sessionStartTime = $J.now();

                  _this14.sendStats('sessionStart', _this14.sessionStartTime);

                  $J.W.addEvent('beforeunload', _this14.trackUnload);
                  resolve();
                } else if (config.contentType && /image/.test(config.contentType) || config._isplaceholder) {
                  reject({
                    error: 'changeSpinToImage',
                    isPlaceholder: config._isplaceholder,
                    account: config.account
                  });
                } else {
                  reject({
                    error: {
                      status: 404
                    }
                  });
                }
              }
            }).catch(function (err) {
              if (!_this14.destroyed) {
                reject({
                  error: err
                });
              }
            });
          });
        });
      }

      return this.gettingInfoPromise;
    };

    _proto4.replaceTextParamURLFromMetadata = function replaceTextParamURLFromMetadata() {
      var _this15 = this;

      if (this.imageSettings.text && this.imageSettings.text.text) {
        this.imageSettings.text.text = this.imageSettings.text.text.replace(/\$\{spin\.(title|description)\}/g, function (m, p1) {
          var t = _this15.meta[p1] || '';

          if (typeof t === 'string') {
            return t;
          }

          return p1;
        });

        if (this.imageSettings.text.text === '') {
          delete this.imageSettings.text;
        }
      }
    };

    _proto4.getDPPX = function getDPPX(size) {
      var side = size.height > size.width ? 'height' : 'width';
      var tmp = {};
      tmp[side] = size[side];
      this.dppx = helper.getDPPX(ResponsiveImage.roundImageSize(tmp)[side], this.infoSize[side], this.upscale);
    };

    _proto4.showHint = function showHint() {
      var result = false;

      if (this.hint) {
        if ((!this.always || $J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.fullscreenState)) && (!this.option('autospin.enable') || !this.firstUserInteraction) // do not show hint again after first user interaction if the autospin.enable is true
        ) {
            result = true;
            this.hint.show();
          }
      }

      return result;
    };

    _proto4.onStartActions = function onStartActions() {
      if (this._isReady) {
        this.animate('slideIn');
      } else {
        if (this.isStarted) {
          if (this.isInited && !this.initNameEvent) {
            this.loadFirstPartOfImages();
          } else {
            // if (this.isInView || this.preload) {
            if (this.isInView) {
              this.loadFirstImage();
            }
          }
        }
      }
    };

    _proto4.onStopActions = function onStopActions() {
      this.zoomOut();
      this.stopSmoothing();
      this.stopAnimation();
      this.deactivateSpin();
      this.setUserFrame();
      this.customActionWas = false;

      if (this.hint) {
        this.hint.hide();
      }

      _Zoominstance.prototype.onStopActions.call(this);
    };

    _proto4.onInView = function onInView(value) {
      if (value) {
        if (!this.isInView) {
          if (this._isReady) {
            this.isInView = true;
            this.animate('inView');
          } else {
            if (this.preload || this.isSlideShown) {
              this.isInView = true;

              if (this.isInited) {
                if (this.isSlideShown && !this.initNameEvent) {
                  this.loadFirstPartOfImages();
                }
              } else {
                this.loadFirstImage();
              }
            }
          }
        }
      } else {
        if (this.isInView && this._isReady) {
          if (this.option('autospin.enable')) {
            this.animationCloud.pause();
          } else {
            this.stopAnimation();
            this.setUserFrame();
          }

          this.deactivateSpin();
        }
      }
    };

    _proto4.startFullInit = function startFullInit(options) {
      var _this16 = this;

      if (this.isStartedFullInit) {
        return;
      } // if (options) {
      //     this.instanceOptions = options.options;
      //     options.options = this.makeOptions();
      // }


      _Zoominstance.prototype.startFullInit.call(this, options);

      this.getInfo().then(function () {
        _this16.normalizeOptions();

        _this16.getId('spin-');

        var option = _this16.option;

        _this16.imagesMap.startFullInit({
          swapSides: option('swapSides'),
          startColumn: option('column.start'),
          startRow: option('row.start'),
          reverseColumn: option('column.reverse'),
          reverseRow: option('row.reverse'),
          loopColumn: option('column.loop'),
          loopRow: option('row.loop'),
          rowSpeed: option('row.sensitivity'),
          columnSpeed: option('column.sensitivity'),
          columnIncrement: option('column.increment'),
          rowIncrement: option('row.increment')
        });

        _this16.loadedImages = _this16.imagesMap.getMap();
        _this16.loader = new ProgressLoader(_this16.coreNode, {
          max: _this16.imagesMap.getCountOfImages(),
          'class': 'spin-loader'
        });

        _this16.loader.setParent(_this16);

        _this16.coreNode.addEvent('btnclick tap', function (e) {
          e.stop();
        });

        _this16.on('isSingleSlide', function (e) {
          e.stop();

          if (_this16.activatedCurtain) {
            if (e.data.isSingle) {
              _this16.activatedCurtain.deactivateCurtain();
            } else {
              _this16.activatedCurtain.activateCurtain();
            }
          }
        });

        if (_this16.hotspots) {
          _this16.hotspots.setOptions({
            columnsRevers: _this16.option('column.reverse'),
            rowsRevers: _this16.option('row.reverse'),
            rows: _this16.imagesMap.getCountOfRows(),
            columns: _this16.imagesMap.getCountOfFrames()
          });
        }

        _this16.initAnimation();
      }).catch(function () {});

      if ($J.browser.touchScreen) {
        this.on('dragEvent', function (e) {
          if (e.data.type === 'dragstart') {
            _this16.slideDragEventStart = true;

            if (_this16.touchDragCloud) {
              _this16.touchDragCloud.removeEvent();
            }
          } else if (e.data.type === 'dragend') {
            _this16.slideDragEventStart = false;

            if (_this16.touchDragCloud) {
              _this16.touchDragCloud.addEvent();
            }
          }
        });
      }
    };

    _proto4.getThumbnailData = function getThumbnailData(opt) {
      return this.imagesMap.getThumbnail(opt);
    };

    _proto4.setUserFrame = function setUserFrame() {
      this.jumpTo(this.userRow, 'row');
      this.jumpTo(this.userColumn, 'col');
    };

    _proto4.getSocialButtonData = function getSocialButtonData(data, isSpin) {
      var url = null;

      if (isSpin) {
        url = this.instanceNode.attr('data-src');
      } else {
        url = _Zoominstance.prototype.getSocialButtonData.call(this, data);
      }

      return url;
    };

    _proto4.turnOnOff = function turnOnOff() {
      var _this17 = this;

      if (!$J.browser.mobile || !this.activatedCurtain) {
        return;
      }

      this.activatedCurtain.addTapEvents(function (e) {
        if (e.action === 'activate') {
          if (!_this17.isSpinActivated) {
            e.stop();

            _this17.activateSpin();
          }

          if (_this17.hotspots) {
            _this17.hotspots.hideActiveHotspotBox(true);
          }
        } else {
          if (_this17.isSpinActivated) {
            e.stop();

            _this17.stopSmoothing();

            _this17.stopAnimation();

            if (_this17.hotspots && _this17.hotspots.isHotspotActivated()) {
              _this17.hotspots.hideActiveHotspotBox(true);
            } else {
              _this17.deactivateSpin();
            }
          }
        }
      });
    };

    _proto4.activateSpin = function activateSpin() {
      if (!this.isSpinActivated) {
        this.isSpinActivated = true;

        if ($J.browser.mobile) {
          this.stopAnimation();
          this.customActionWas = true;

          if (this.hint) {
            this.hint.hide();
          }

          if (this.activatedCurtain) {
            this.activatedCurtain.hide();
          }
        }
      }
    };

    _proto4.deactivateSpin = function deactivateSpin() {
      if (this.isSpinActivated) {
        this.isSpinActivated = false;

        if ($J.browser.mobile) {
          if (!this.customActionWas) {
            this.showHint();
          }

          if (this.activatedCurtain) {
            this.activatedCurtain.show();
          } // this.customActionWas = false;
          // this.animate('inactive');

        }
      }
    } // setActiveAction() {
    //     if ($J.browser.mobile) { return; }
    //     this.canvasContainer.addEvent('mouseover', e => {
    //         if (this.isSlideShown) {
    //             this.isOver = true;
    //             if (this._isReady) {
    //                 this.activateSpin();
    //             }
    //         }
    //     });
    //     this.canvasContainer.addEvent('mouseout', e => {
    //         if (this.isSlideShown) {
    //             this.isOver = false;
    //             this.deactivateSpin();
    //         }
    //     });
    // }
    ;

    _proto4.createPinchEvent = function createPinchEvent() {
      var _this18 = this;

      // difference between scale
      var OPEN_ZOOM = 1.1;
      var FS_OUT = 0.2;
      var FS_IN = 2;
      var saveValue;
      var scale;
      var baseMin;
      var compensation;
      var maxCompensation;
      var minCompensation;
      var max;
      var min;
      var basePercent;

      var setDefaultsValues = function () {
        maxCompensation = 1;
        minCompensation = 1;
        baseMin = _this18.zoom.getBaseScale().x;
        max = 1;
        min = baseMin;
        saveValue = 1 - baseMin;
      };

      _Zoominstance.prototype.createPinchEvent.call(this, this.coreNode);

      this.pinchCloud.onPinchStart = function (e) {
        if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING], _this18.fullscreenState)) {
          return;
        }

        _this18.pinchCloud.pinch = true;
        clearTimeout(_this18.longTapTimer);

        _this18.stopSmoothing();

        _this18.stopAnimation();

        if (_this18.touchDragCloud) {
          _this18.touchDragCloud.removeEvent();
        }

        if (_this18.hotspots) {
          _this18.hotspots.hideActiveHotspotBox(true);
        }

        _this18.customActionWas = true;
        basePercent = false;
        _this18.pinchCloud.scale = e.scale;
        compensation = 1;

        if (_this18.openedImg) {
          compensation = _this18.zoom.scale.x;

          if (baseMin === $J.U) {
            setDefaultsValues();
          }

          compensation /= baseMin;
        }

        _this18.sendEvent('pinchStart');
      };

      this.pinchCloud.onPinchResize = function (e) {
        if (_this18.pinchCloud.pinch && !_this18.pinchCloud.block) {
          if (_this18.zoom && _this18.fullscreenState === globalVariables.FULLSCREEN.OPENED && _this18.openedImg) {
            _this18.pinchCloud.scale = e.scale;

            _this18.zoom.setBasePercent(e.centerPoint);
          }
        }
      };

      this.pinchCloud.onPinchMove = function (e) {
        if (_this18.pinchCloud.pinch && !_this18.pinchCloud.block) {
          if (_this18.fullscreenState === globalVariables.FULLSCREEN.OPENED || !_this18.isFullscreenEnabled) {
            if (!_this18.openedImg) {
              if (e.scale > OPEN_ZOOM) {
                _this18.firstUserInteraction = true;

                _this18.openLens(e.centerPoint.x, e.centerPoint.y, false, 'zero');

                setDefaultsValues();
                compensation = 1;
              } else if (e.scale < FS_OUT) {
                _this18.pinchCloud.block = true;

                _this18.sendEvent('fullscreenOut');
              }
            } else if (_this18.zoom) {
              if (!basePercent) {
                basePercent = true;

                _this18.zoom.setBasePercent(e.centerPoint);
              } else {
                scale = e.scale;
                scale *= baseMin;

                if (max < scale) {
                  max = scale;
                  min = baseMin;
                  minCompensation = 1;
                  maxCompensation = saveValue / (max - baseMin);
                }

                if (min > scale) {
                  min = scale;
                  max = 1;
                  maxCompensation = 1;
                  minCompensation = baseMin / min;
                }

                scale *= compensation;
                scale = (baseMin + (scale - baseMin) * maxCompensation) * minCompensation;

                _this18.zoom.setScale(scale, e.centerPoint.x, e.centerPoint.y);
              }

              _this18.pinchCloud.scale = e.scale;
            }
          } else if (e.scale >= FS_IN) {
            _this18.pinchCloud.block = true;

            _this18.sendEvent('fullscreenIn');
          }
        }
      };

      this.pinchCloud.onPinchEnd = function (e) {
        if (_this18.pinchCloud.pinch) {
          _this18.pinchCloud.pinch = false;

          if (_this18.openedImg) {
            _this18.activateSpin();
          }

          setTimeout(function () {
            if (_this18.touchDragCloud) {
              _this18.touchDragCloud.addEvent();
            }
          }, 16);

          _this18.sendEvent('pinchEnd');
        }

        if (_this18.openedImg) {
          _this18.pinchCloud.removeEvent();
        }

        _this18.pinchCloud.block = false;
        _this18.pinchCloud.scale = 0;
      };
    };

    _proto4.onStopContext = function onStopContext() {
      this.stopSmoothing();
      this.stopAnimation();

      if (this.hint) {
        this.hint.hide();
      }
    };

    _proto4.onSecondSelectorClick = function onSecondSelectorClick() {
      this.zoomOut();
    };

    _proto4.setGlobalEvents = function setGlobalEvents() {
      var _this19 = this;

      this.on('zoomUp', function (e) {
        var pos = e.data;
        e.stop();

        if (_this19._isReady && _this19.zoom) {
          if (!_this19.isDragMove && _this19.isFullscreenActionEnded()) {
            _this19.firstUserInteraction = true;

            _this19.openLens(pos.x, pos.y);
          }
        }
      });
      this.on('zoomDown', function (e) {
        e.stop();

        if (_this19._isReady && _this19.zoom && _this19.isZoomed()) {
          _this19.zoom.hide();
        }
      });
    };

    _proto4.normalizeOptions = function normalizeOptions() {
      var _this20 = this;

      if (!this.option('autospin.enable')) {
        this.option('autospin.duration', 0);
      }

      if (this.option('swapSides')) {
        ['start', 'loop', 'increment', 'reverse', 'sensitivity'].forEach(function (param) {
          var tmp = _this20.option('row.' + param);

          _this20.option('row.' + param, _this20.option('column.' + param));

          _this20.option('column.' + param, tmp);
        });
      }

      ['onStart', 'onVisible', 'onInactive'].forEach(function (v) {
        var o = 'hint.' + v + '.effect';

        if (_this20.option(o) === 'none') {
          _this20.option(o, false);
        }
      });

      if ($J.browser.mobile) {
        if (this.option('initialize') !== 'load') {
          this.option('initialize', 'tap');
        }
      }

      this.setDefaultZoomOptions();

      if (this.option('zoom.enable') && this.option('zoom.ratio') !== 'max' && this.option('zoom.ratio') < globalVariables.MIN_RATIO) {
        this.option('zoom.enable', false);
      }
    };

    _proto4.setDefaultZoomOptions = function setDefaultZoomOptions() {
      _Zoominstance.prototype.setDefaultZoomOptions.call(this);

      this.defaultZoomOptions = $J.extend(this.defaultZoomOptions, {
        tiles: this.option('zoom.tiles'),
        pan: this.option('zoom.pan'),
        trigger: $J.browser.mobile ? 'dblclick' : 'click',
        type: 'inner',
        height: 'auto'
      });
    };

    _proto4.loadFirstPartOfImages = function loadFirstPartOfImages() {
      if (!this.firstPartOfImagesLoaded) {
        this.firstPartOfImagesLoaded = true;
        this.startLoadingTime = $J.now();
        this.imagesMap.loadFirstPartOfImages({
          width: this.currentImageSize.width,
          height: this.currentImageSize.height,
          dppx: this.dppx
        });

        if (this.loader) {
          this.loader.show();
        }
      }
    };

    _proto4.isThumbnailGif = function isThumbnailGif() {
      return this.option('thumbnail.type') === 'gif';
    };

    _proto4.init = function init() {
      var _this21 = this;

      if (!this.infoSize || this.isInited) {
        return;
      }

      this.isInited = true; // this.setActiveAction();

      this.initNameEvent = null;

      this.initFnEvent = function (e) {
        e.stop();

        _this21.coreNode.removeEvent(e.type, _this21.initFnEvent);

        if (_this21.activatedCurtain) {
          _this21.activatedCurtain.activatedCurtain.removeEvent(_this21.initNameEvent, _this21.initFnEvent);
        }

        _this21.loadFirstPartOfImages();
      };

      switch (this.option('initialize')) {
        case 'hover':
          this.initNameEvent = 'mouseover';
          break;

        case 'click':
          this.initNameEvent = 'btnclick';
          break;

        case 'tap':
          this.initNameEvent = 'tap';
          break;

        default:
      }

      if (this.initNameEvent) {
        this.coreNode.addEvent(this.initNameEvent, this.initFnEvent);

        if (this.activatedCurtain) {
          this.activatedCurtain.activatedCurtain.addEvent(this.initNameEvent, this.initFnEvent);
        }

        this.loadFirstImage();
      } else {
        if (this.isInView && this.isSlideShown) {
          this.loadFirstPartOfImages();
        }
      }

      this.sendEvent('init');
    };

    _proto4.run = function run(isShown, preload, firstSlideAhead) {
      var result = _Zoominstance.prototype.run.call(this, isShown, preload, firstSlideAhead);

      if (result) {
        $J.W.addEvent('resize', this.windowResizeCallback);
        this.initCanvas();
        this.startGettingInfo();
      }

      return result;
    };

    _proto4.initCanvas = function initCanvas() {
      this.canvas = $J.$new('canvas');

      if (this.canvas.node.getContext) {
        this.ctx = this.canvas.node.getContext('2d'); // for (let i = 0; i < 2; i++) {
        //     const canvas = $J.$new('canvas');
        //     this.additionalCanvases.push({
        //         node: canvas,
        //         ctx: canvas.node.getContext('2d')
        //     });
        // }
      }

      var alt = this.getRightAlt();

      if (alt) {
        this.canvas.attr('role', 'img');
        this.canvas.attr('aria-label', alt);
        this.canvas.attr('alt', alt);
      }

      var w = this.infoSize.width;
      var h = this.infoSize.height;
      var size = this.coreNode.getSize();

      if (w < size.width) {
        w = size.width;
      }

      if (h < size.height) {
        h = size.height;
      } // broke html if image less then viewer
      // I do not know why I added it
      // this.coreNode.setCss({
      //     'max-width': w + 'px',
      //     'max-height': h + 'px'
      // });


      if (size.height === 0) {
        this.cssId = $J.addCSS('#' + this.id + ' .' + CSS_CLASS_NAME + ':before', {
          'padding-top': this.infoSize.height / this.infoSize.width * 100 + '%'
        }, this.id + '-css');
        size.height = size.width * (this.infoSize.height / this.infoSize.width);
      }

      this.currentSize = helper.spinLib.calcProportionSize(size, this.infoSize);
      this.getDPPX(this.currentSize);
      this.standardSize.width = this.currentSize.width;
      this.standardSize.height = this.currentSize.height;
      this.setImageSize();
      this.canvas.setCss({
        top: '0',
        left: '0',
        zIndex: 10,
        position: 'absolute'
      });
      this.setCanvasSize();
      this.canvasContainer.append(this.canvas);
      this.coreNode.append(this.canvasContainer);

      if (this.isInView && (this.preload || this.isSlideShown)) {
        this.loadFirstImage();
      }
    };

    _proto4.loadContent = function loadContent() {
      this.loadFirstImage();
    };

    _proto4.loadFirstImage = function loadFirstImage() {
      if (!this.firstImageLoaded && this.isInfoLoaded) {
        // fix for if the viewer was with display none
        if (!this.currentImageSize.width || !this.currentImageSize.height) {
          this.currentSize = helper.spinLib.calcProportionSize(this.coreNode.getSize(), this.infoSize);
          this.getDPPX(this.currentSize);

          if (this.currentSize.width && this.currentSize.height) {
            this.setImageSize();

            if (this.isStarted && this.currentImageSize.width && this.currentImageSize.height) {
              this.setCanvasSize();
              this.draw();
            }
          }
        }

        if (!this.currentImageSize.width || !this.currentImageSize.height) {
          return;
        }

        this.waitToStart.start();
        this.firstImageLoaded = true;
        this.imagesMap.loadFirstImage({
          width: this.currentImageSize.width,
          height: this.currentImageSize.height,
          dppx: this.dppx
        });
      }
    };

    _proto4.getRightAlt = function getRightAlt() {
      var description = null;

      if (!this.dataAlt && this.meta && this.meta.description) {
        description = this.meta.description;
      } else {
        description = this.dataAlt;
      }

      return description;
    };

    _proto4.createMap = function createMap(quality, hdQuality, isHDQualitySet) {
      var _this22 = this;

      var option = this.option;
      var loadingSchema = null;

      if (option('autospin.enable')) {
        loadingSchema = option('autospin.type');
      } else if (option('hint.onStart.enable') && option('hint.onStart.effect')) {
        loadingSchema = option('hint.onStart.effect');
      }

      this.imagesMap = new ImagesMap({
        url: this.configURL,
        imageSettings: this.imageSettings,
        layers: this.layers,
        swapSides: option('swapSides'),
        startColumn: option('column.start'),
        startRow: option('row.start'),
        reverseColumn: option('column.reverse'),
        reverseRow: option('row.reverse'),
        loopColumn: option('column.loop'),
        loopRow: option('row.loop'),
        rowSpeed: option('row.sensitivity'),
        columnSpeed: option('column.sensitivity'),
        columnIncrement: option('column.increment'),
        rowIncrement: option('row.increment'),
        loadingSchema: loadingSchema,
        quality: quality,
        hdQuality: hdQuality,
        isHDQualitySet: isHDQualitySet,
        referrerPolicy: this.referrerPolicy
      });
      this.imagesMap.setParent(this);
      this.userColumn = this.imagesMap.getStartColumn();
      this.userRow = this.imagesMap.getStartRow();
      this.on('mapFirstImageLoaded', function (e) {
        e.stopAll();

        if (_this22.placeholder) {
          _this22.placeholder.setCssProp('display', 'none');
        }

        if (!_this22.isInited) {
          if (_this22.firstImageLoaded) {
            _this22.draw();

            _this22.canvas.setCssProp('transition', 'none');

            _this22.canvas.getSize();

            _this22.canvas.setCssProp('transition', '');
          }

          if (_this22.loader) {
            _this22.loader.progress();
          }

          _this22.setCanvas().finally(function () {
            _this22.init();
          });
        }

        if (_this22.hotspots) {
          var img = _this22.imagesMap.getCurrentImage({
            width: _this22.currentSize.width,
            height: _this22.currentSize.height
          });

          _this22.hotspots.setFramePosition(img.row, img.col);

          _this22.hotspots.updateAndShow();

          if (_this22.isInView && _this22.isSlideShown) {
            _this22.hotspots.showNeededElements();
          }
        }
      });
      this.on('mapImagesReady', function (e) {
        e.stopAll();

        _this22.imagesMap.loadOtherImages({
          width: _this22.currentImageSize.width,
          height: _this22.currentImageSize.height,
          dppx: _this22.dppx
        });

        _this22.calcMinSizeForDrag();

        var now = $J.now();

        _this22.sendStats('framesPreloaded', now - _this22.sessionStartTime, {
          duration: now - _this22.startLoadingTime
        });

        _this22.done();

        _this22.sendContentLoadedEvent();
      });
      this.on('mapImageLoaded', function (e) {
        e.stopAll();

        if (_this22.loader) {
          if (!_this22.loadedImages[e.data.row][e.data.col]) {
            _this22.loadedImages[e.data.row][e.data.col] = true;

            _this22.loader.progress();
          }
        }

        if (!e.data.error) {
          if (e.data.isCurrent) {
            if (e.data.callbackData.lens) {
              // if (this.option('zoom.magnify.enable') && this.zoom) { // the option was removed
              if (_this22.zoom) {
                if ((_this22.zoom.isShown() || _this22.zoom.isShowing()) && _this22.openedImg) {
                  if (_this22.openedImg.col === e.data.col && _this22.openedImg.row === e.data.row) {
                    _this22.zoom.setImage(e.data);
                  }
                }
              }
            } else {
              if (_this22.lastImg && (_this22.lastImg.width !== e.data.width || _this22.lastImg.height !== e.data.height) && _this22.firstImageLoaded) {
                _this22.draw();
              }
            }
          }
        }
      });
      this.on('mapAllImagesLoaded', function (e) {
        e.stopAll();
        var now = $J.now();

        _this22.sendStats('framesLoaded', now - _this22.sessionStartTime, {
          duration: now - _this22.startLoadingTime
        });

        if (_this22.loader && _this22.loader.getProgressState() !== 2) {
          _this22.loader.hide();
        }
      });
      this.on('frameChange', function (e) {
        e.stop();

        if (_this22._isReady) {
          _this22.sendEvent('frameChange', {
            row: e.data.row,
            column: e.data.column
          });
        }
      });
      this.imagesMap.loadImageInfo().then(function (originSize) {
        _this22.isInfoLoaded = true;
        var size = $J.extend({}, originSize.size);
        _this22.infoSize = size;

        if (_this22.hotspots) {
          _this22.hotspots.setOriginImageSize(_this22.infoSize.width, _this22.infoSize.height);
        }
      }).catch(function (err) {
        _this22.isInfoLoaded = true;
      });
    };

    _proto4.getSelectorImgUrl = function getSelectorImgUrl(data) {
      var _this23 = this;

      return new Promise(function (resolve, reject) {
        _this23.getInfo().then(function () {
          _this23.imagesMap.loadImageInfo().then(function (originSize) {
            _this23.waitToStart.wait(function () {
              var defOpt = _this23.imagesMap.setImageSettings({
                dppx: _this23.dppx
              });

              if (defOpt.src) {
                data.src = defOpt.src;
              }

              data.srcset = defOpt.srcset;

              if (_this23.option('thumbnail.type') === 'gif') {
                data.originUrl = _this23.configURL.split('?')[0];
                data.imageSettings = {
                  image: 24
                };

                if (_this23.option('thumbnail.gifParams')) {
                  data.imageSettings = helper.paramsFromQueryString(_this23.option('thumbnail.gifParams'));
                }
              }

              resolve($J.extend(_this23.imagesMap.getThumbnail(data), {
                alt: _this23.getRightAlt()
              }));
            });
          }).catch(reject);
        }).catch(reject);
      });
    };

    _proto4.getInfoSize = function getInfoSize() {
      var _this24 = this;

      return new Promise(function (resolve, reject) {
        _this24.getInfo().then(function () {
          _this24.imagesMap.loadImageInfo().then(resolve).catch(reject);
        }).catch(reject);
      });
    };

    _proto4.onHotspotActivate = function onHotspotActivate(data) {
      this.customActionWas = true;
      this.stopAnimation();

      _Zoominstance.prototype.onHotspotActivate.call(this, data);
    };

    _proto4.onHotspotDeactivate = function onHotspotDeactivate(data) {
      _Zoominstance.prototype.onHotspotDeactivate.call(this, data);

      this.animateWithDelay();
    };

    _proto4.createHint = function createHint() {
      if (!this.option('hint.message.enable')) {
        return;
      }

      var hintMessage = '<div class="spin-hint-animation"></div>';
      var horizontal = 'spin-hint-horizontal-animation';
      var vertical = 'spin-hint-vertical-animation';
      var hintClass;
      hintMessage += '<span>';
      hintMessage += this.option('hint.message.text');
      hintMessage += '</span>';

      switch (this.imagesMap.getHintType()) {
        case 'multi-row':
          hintClass = horizontal + ' ' + vertical;
          break;

        case 'row':
          hintClass = horizontal;
          break;

        case 'col':
          hintClass = vertical;
          break;
        // no default
      }

      var hintOptions = {
        html: hintMessage,
        additionalClass: hintClass
      };

      if ($J.browser.mobile || this.option('autospin.enable')) {
        hintOptions.autohide = 0;
      }

      this.hint = new Hint(this.coreNode, hintOptions);

      if (this.isSlideShown && this.isInView && this.option('autospin.type') === 'infinite') {
        this.showHint();
      }
    };

    _proto4.getImageClassContainer = function getImageClassContainer() {
      return this.imagesMap;
    };

    _proto4.createZoom = function createZoom() {
      var _this25 = this;

      var result = null;

      if (!this.destroyed && this.option('zoom.enable')) {
        result = _Zoominstance.prototype.createZoom.call(this, this.coreNode, {});

        if (this.zoomContainer) {
          this.zoom.setLensContainer(this.zoomContainer);
        }

        this.coreNode.addEvent('btnclick dbltap', function (e) {
          if (_this25.isFullscreenActionEnded()) {
            _this25.firstUserInteraction = true;

            _this25.openLens(e.x, e.y);
          }
        });

        if ($J.browser.mobile) {// this.setLongTapEvents();
        }
      }

      return result;
    };

    _proto4.onZoomGetImage = function onZoomGetImage(e) {
      _Zoominstance.prototype.onZoomGetImage.call(this, e);

      if (this.checkImage(e.data, e.data.dontLoad)) {
        this.zoom.setImage(this.imagesMap.getCurrentImage(e.data));
      } else {
        this.imagesMap.loadImage(e.data);
      }
    };

    _proto4.onZoomCancelLoadingOfTiles = function onZoomCancelLoadingOfTiles(e) {
      _Zoominstance.prototype.onZoomGetImage.call(this, e);

      e.data.round = false;
      this.imagesMap.cancelLoadingImage(e.data);
    };

    _proto4.onZoomBeforeShow = function onZoomBeforeShow(e) {
      this.canvas.addClass(this.zoomClassName);

      if (this.hotspots) {
        this.hotspots.hideAll();
      }
    };

    _proto4.onZoomShown = function onZoomShown(e) {
      if (this.isSlideShown) {
        this.startTimeForZommEvent = $J.now();

        if (this.openedImg) {
          this.sendStats('zoomIn', $J.now() - this.sessionStartTime, {
            frame: {
              row: this.openedImg.row,
              column: this.openedImg.col
            },
            clientX: e.data.clientPosition.x,
            clientY: e.data.clientPosition.y,
            pageX: e.data.pagePosition.x,
            pageY: e.data.pagePosition.y
          });
        }

        this.sendEvent('zoomIn');
      } else {
        this.zoom.hide(true);
      }
    };

    _proto4.onZoomHidden = function onZoomHidden(e) {
      if (this.openedImg) {
        this.canvas.removeClass(this.zoomClassName);
        var now = $J.now();
        this.sendStats('zoomOut', now - this.sessionStartTime, {
          duration: now - this.startTimeForZommEvent,
          frame: {
            row: this.openedImg.row,
            column: this.openedImg.col
          },
          clientX: e.data.clientPosition.x,
          clientY: e.data.clientPosition.y,
          pageX: e.data.pagePosition.x,
          pageY: e.data.pagePosition.y
        });

        if (this.hotspots) {
          this.hotspots.showAll();

          if (this.isInView && this.isSlideShown) {
            this.hotspots.showNeededElements();
          }
        }
      }

      this.sendEvent('zoomOut');

      if (this.isSlideShown) {
        this.animateWithDelay();
      }

      this.startTimeForZommEvent = null;
      this.openedImg = null;

      if (this.pinchCloud) {
        this.pinchCloud.addEvent();
      }
    };

    _proto4.setLongTapEvents = function setLongTapEvents() {
      var _this26 = this;

      var pe = $J.W.node.navigator.pointerEnabled;
      var move = false;
      var touchDown = false;
      this.coreNode.addEvent('touchstart ' + (pe ? 'pointerdown' : 'MSPointerDown'), function (e) {
        if (!_this26.isDragMove && !_this26.pinchCloud.pinch && _this26.isFullscreenActionEnded()) {
          clearTimeout(_this26.longTapTimer);
          _this26.longTapTimer = setTimeout(function () {
            e.stop();
            move = true;
            _this26.customActionWas = true;
            var p = e.getPageXY();

            if (_this26.touchDragCloud) {
              _this26.touchDragCloud.removeEvent();
            }

            _this26.firstUserInteraction = true;

            _this26.openLens(p.x, p.y, true);
          }, 500);
          touchDown = true;
        }
      });
      this.coreNode.addEvent('touchmove ' + (pe ? 'pointermove' : 'MSPointerMove'), function (e) {
        if (move && _this26.isFullscreenActionEnded()) {
          e.stop();
          var p = e.getPageXY();

          _this26.zoom.customMove(p.x, p.y);
        }
      }, 1);
      this.coreNode.addEvent('touchend ' + (pe ? 'pointerup' : 'MSPointerUp'), function (e) {
        if (touchDown) {
          e.stop();
          touchDown = false;
          clearTimeout(_this26.longTapTimer);
        }

        if (move && _this26.isFullscreenActionEnded()) {
          e.stop();
          move = false; // clearTimeout(this.longTapTimer);

          _this26.zoom.hide(true);

          if (_this26.touchDragCloud) {
            _this26.touchDragCloud.addEvent();
          }
        }
      });
    };

    _proto4.getZoomSize = function getZoomSize() {
      var r = this.option('zoom.ratio');
      var originWidth = this.infoSize.width;
      var originHeight = this.infoSize.height;
      var size = {
        width: originWidth,
        height: originHeight
      };

      if (r !== 'max') {
        size.width = this.currentImageSize.width * r;
        size.height = this.currentImageSize.height * r;
        size = ResponsiveImage.roundImageSize(size);
      }

      size.width = Math.min(originWidth, size.width);
      size.height = Math.min(originHeight, size.height);
      return {
        width: size.width,
        height: size.height,
        originWidth: originWidth,
        originHeight: originHeight
      };
    };

    _proto4.openLens = function openLens(x, y, longTap, toLevel) {
      var result = false;

      if (this.isZoomSizeExist()) {
        var zoomSize = this.getZoomSize();
        result = true;
        this.stopSmoothing();
        this.stopAnimation();

        if (this.hint) {
          this.hint.hide();
        }

        if (this.hotspots) {
          this.hotspots.hideActiveHotspotBox(true);
        }

        var round = false;
        var lensImgWidth;
        var lensImgHeight;

        if (this.isFullscreenActionEnded() && this.imagesMap.isLoaded({
          width: this.currentImageSize.width,
          height: this.currentImageSize.height
        })) {
          lensImgWidth = this.currentImageSize.width;
          lensImgHeight = this.currentImageSize.height;
          round = true;
        } else {
          lensImgWidth = this.lastImg.serverWidth;
          lensImgHeight = this.lastImg.serverHeight;
        }

        var img = this.imagesMap.getCurrentImage({
          width: lensImgWidth,
          height: lensImgHeight,
          round: round
        });
        this.openedImg = img;

        if (x === undefined) {
          result = this.zoom.showCenter(img.node, zoomSize);
        } else {
          result = this.zoom.show(img.node, zoomSize, x, y, longTap, toLevel);
        }
      }

      return result;
    };

    _proto4.done = function done() {
      var rows = this.imagesMap.getCountOfRows();
      var cols = this.imagesMap.getCountOfFrames();

      if (this.loader) {
        this.loader.setMaxOpacity(0.5);
      }

      this.setBrowserEvents();
      this.createHint();
      this.createZoom();
      this.setZoomEvents();

      if (rows > 1 && cols > 1) {
        this.coreNode.setCssProp('touch-action', 'none');
      } else {
        if (rows > 1) {
          this.coreNode.setCssProp('touch-action', 'pan-x');
        } else {
          this.coreNode.setCssProp('touch-action', 'pan-y');
        }
      }

      this.boxBoundaries = this.coreNode.getRect();
      this.animate('start');

      if (this.accountInfo.branded) {
        var nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
        globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, this.instanceNode, BRAND_LANDING, '360-degree viewer by Sirv');
      }

      this.sendStats('viewerReady', $J.now() - this.sessionStartTime, {
        rows: this.imagesMap.getCountOfRows(),
        columns: this.imagesMap.getCountOfFrames(),
        viewerSize: {
          width: this.currentSize.width,
          height: this.currentSize.height
        }
      });

      if (this.isZoomSizeExist()) {
        this.coreNode.addClass(globalVariables.CSS_CURSOR_ZOOM_IN);
      }

      this.setGlobalEvents();
      this.turnOnOff();

      _Zoominstance.prototype.done.call(this);

      if (this.hotspots) {
        if (!this.hotspots.getHotspots().length) {
          this.hotspots.setInstanceComponentNode(this.canvasContainer);
        }

        this.hotspots.setContainerSize(this.canvasContainer.node.getBoundingClientRect());
      }
    };

    _proto4.setBrowserEvents = function setBrowserEvents() {
      this.setDrag(this.coreNode);
      this.setMouseWheel(this.coreNode);
    };

    _proto4.setCanvas = function setCanvas() {
      var _this27 = this;

      if (!this.canvasPromise) {
        var _resolve;

        var canvasOpacityHandler;
        var _timer = null;
        this.canvasPromise = helper.makeQueryblePromise(new Promise(function (resolve1, reject) {
          _resolve = resolve1;

          if (_this27.firstImageLoaded) {
            _this27.draw();
          }

          if (!_this27.isInView || !_this27.isSlideShown) {
            _this27.canvas.addClass(P + '-shown');

            resolve1();
          } else {
            _timer = setTimeout(function () {
              // some times transitionend does not work
              if (_this27.canvas) {
                // we can remove slide from slider by API much faster then this animation
                _this27.canvas.removeEvent('transitionend', canvasOpacityHandler);
              }

              resolve1();
            }, 1100);

            canvasOpacityHandler = function (e) {
              if (e.propertyName === 'opacity') {
                e.stop();
                clearTimeout(_timer);

                _this27.canvas.removeEvent(e.type, canvasOpacityHandler);

                resolve1();
              }
            };

            _this27.canvas.addEvent('transitionend', canvasOpacityHandler);

            _this27.canvas.getSize();

            _this27.canvas.addClass(P + '-shown');
          }
        }));

        this.canvasPromise.resolve = function () {
          _this27.canvas.removeEvent('transitionend', canvasOpacityHandler);

          _resolve();
        };
      }

      return this.canvasPromise;
    };

    _proto4.clearCanvas = function clearCanvas() {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };

    _proto4.draw = function draw(neededSize) {
      if (this.ctx) {
        var size = neededSize || this.currentImageSize;
        var imageData = {
          width: size.width,
          height: size.height,
          maxSize: true,
          dppx: this.dppx
        };
        var img = this.imagesMap.getCurrentImage(imageData);
        this.lastImg = img;

        if (!img) {
          return;
        }

        this.ctx.imageSmoothingQuality = 'high';

        if (this.hotspots) {
          this.hotspots.changeHotspotsPosition(img.row, img.col);
        }

        this.clearCanvas();
        this.canvas.node.width = img.node.node.width;
        this.canvas.node.height = img.node.node.height;
        this.ctx.drawImage(img.node.node, 0, 0, this.canvas.node.width, this.canvas.node.height);
      }
    }
    /*
    draw(neededSize) {
        const size = neededSize || this.currentImageSize;
         const imageData = {
            width: size.width,
            height: size.height,
            maxSize: true,
            dppx: this.dppx
        };
         const img = this.imagesMap.getCurrentImage(imageData);
        const ac = this.additionalCanvases;
        let steps = 0;
        let posX;
        let posY;
        let i;
         if (!img || !size.width || !size.height) { return; }
         this.lastImg = img;
         // s.width = Math.min(s.width * 2, img.width * $J.DPPX);
        // s.height = Math.min(s.height * 2, img.height * $J.DPPX);
         const s = {
            width: img.width * this.dppx,
            height: img.height * this.dppx
        };
         // steps = Math.ceil(Math.log(Math.max(img.width / s.width, img.height / s.height)) / Math.LN2);
        steps = Math.ceil(Math.log(Math.max(s.width / img.width, s.height / img.height)) / Math.LN2);
         ac[0].node.node.width = s.width;
        ac[0].node.node.height = s.height;
        ac[1].node.node.width = s.width;
        ac[1].node.node.height = s.height;
         ac[0].ctx.drawImage(img.node.node, 0, 0, s.width, s.height);
         for (i = steps - 1; i > 0; i--) {
            // Scale down in tmp canvas
            ac[1].node.node.width *= 0.5;
            ac[1].node.node.height *= 0.5;
            ac[1].ctx.drawImage(ac[0].node.node, 0, 0, ac[0].node.node.width, ac[0].node.node.height,
                                        0, 0, ac[1].node.node.width, ac[1].node.node.height);
             // Copy back
            ac[0].node.node.width *= 0.5;
            ac[0].node.node.height *= 0.5;
            ac[0].ctx.drawImage(ac[1].node.node, 0, 0, ac[1].node.node.width, ac[1].node.node.height,
                                        0, 0, ac[0].node.node.width, ac[0].node.node.height);
        }
         // this.ctx.setTransform(1, 0, 0, 1, 0, 0);
         this.canvas.node.width = s.width;
        this.canvas.node.height = s.height;
         // this.canvas.setCss({
        //     width: (s.width / 2) + 'px',
        //     height: (s.height / 2) + 'px'
        // });
         if (this.hotspots) {
            this.hotspots.changeHotspotsPosition(img.row, img.col);
        }
         this.clearCanvas();
         if (this.ctx) {
            posX = calcScalePosition(this.scale, s.width);
            posY = calcScalePosition(this.scale, s.height);
             this.ctx.drawImage(ac[0].node.node, 0, 0, ac[0].node.node.width, ac[0].node.node.height, posX, posY, s.width * this.scale, s.height * this.scale);
        }
    }
    */
    ;

    _proto4.setCanvasSize = function setCanvasSize() {
      var s = this.currentSize;
      this.canvas.setCss({
        width: s.width,
        height: s.height
      });
      this.canvasContainer.setCss({
        width: s.width,
        height: s.height
      });
      this.canvas.width = s.width;
      this.canvas.height = s.height;
    };

    _proto4.calcMinSizeForDrag = function calcMinSizeForDrag() {
      var s = this.currentSize;
      this.minSizeOfFrame = this.imagesMap.pixelPerFrame(s.width);
      this.minSizeOfRow = this.imagesMap.pixelPerRow(s.height);
    };

    _proto4.smoothing = function smoothing(distance, time, direction) {
      var _this28 = this;

      // direction - next, prev, down, up
      if (!time) {
        return;
      }

      var speed = distance / time;

      var move = function () {
        speed *= 0.97;
        _this28.smooseTimeout = setTimeout(function () {
          _this28.imagesMap.prepareFutureImage(direction);

          _this28.imagesMap.setPreparedFutureImage();

          _this28.draw();

          if (speed > 0.3) {
            move();
          }
        }, _this28.minSizeOfFrame / speed);
      };

      if (!this.isSmoothing) {
        this.isSmoothing = true;
        move();
      }
    };

    _proto4.stopSmoothing = function stopSmoothing() {
      if (this.isSmoothing) {
        this.isSmoothing = false;
        clearTimeout(this.smooseTimeout);
        this.smooseTimeout = null;
        this.imagesMap.resetPreparedImage();
      }
    };

    _proto4.animateWithDelay = function animateWithDelay(action) {
      var _this29 = this;

      var animateAction = 'inactive';

      if (action) {
        animateAction = action;
      }

      if (this.option('autospin.enable')) {
        clearTimeout(this.autospinResumeTimer);
        this.autospinResumeTimer = setTimeout(function () {
          _this29.animate(animateAction);
        }, this.option('autospin.resume'));
      } else {
        this.animate(animateAction);
      }
    };

    _proto4.setDrag = function setDrag(node) {
      var _this30 = this;

      var rows = this.imagesMap.getCountOfRows();
      var cols = this.imagesMap.getCountOfFrames();
      var multi = rows > 1 && cols > 1;
      var sphereValues = {
        x: {
          minSize: this.minSizeOfFrame,
          count: cols
        },
        y: {
          minSize: this.minSizeOfRow,
          count: rows
        }
      };
      var onAnyDrag = this.option('freeDrag');
      var lastPoint = {
        x: 0,
        y: 0
      };
      var lastPartOfDistance = {
        x: 0,
        y: 0
      };
      var canMoveAxis = null;

      if (!multi) {
        canMoveAxis = cols > 1 ? 'x' : 'y';
      }

      var lastTime = null;
      var axis;
      var fns = {};
      var otherAxis;
      var queue = {
        x: {
          next: 0,
          prev: 0
        },
        y: {
          up: 0,
          down: 0
        }
      };
      var startTime;
      var rotate = false;
      var rotateDebounce = helper.debounce(function () {
        rotate = false;
      }, 50);
      var G = 9.8;
      var COEFFICIENT_OF_FRICTION = 0.00065;
      var FRICTION_FORCE = {
        x: COEFFICIENT_OF_FRICTION * cols * G,
        y: COEFFICIENT_OF_FRICTION * rows * G
      };
      var DIRECTIONS = {
        x: ['prev', 'next'],
        y: ['down', 'up']
      };

      if (!multi && onAnyDrag) {
        if (cols > 1) {
          DIRECTIONS.y = DIRECTIONS.x;
        } else {
          DIRECTIONS.x = DIRECTIONS.y;
        }
      }

      var onDrag = function (e) {
        clearTimeout(_this30.longTapTimer);
        fns[e.state](e);
      };

      var addPoint = function (_axis, _speed, _distance, _direction) {
        queue[_axis][_direction] += _distance;
      };

      var getPoints = function (_axis) {
        var a = queue[_axis];
        var result;
        var dir = _axis === 'x' ? ['next', 'prev'] : ['up', 'down'];

        if (a[dir[0]] > a[dir[1]]) {
          result = {
            distance: a[dir[0]],
            direction: dir[0]
          };
        } else {
          result = {
            distance: a[dir[1]],
            direction: dir[1]
          };
        }

        return result;
      };

      var getCountOfItems = function (frictionForce, weight, distance, time, sizeOfItem) {
        var result; // eslint-disable-next-line no-restricted-properties

        result = weight * Math.pow(distance / time, 2) / (2 * frictionForce);
        result = Math.floor(result / sizeOfItem);
        return result;
      };

      var getTime = function (frictionForce, weight, distance, time) {
        return weight * (distance / time) / frictionForce;
      };

      var getDirection = function (value, _axis) {
        return DIRECTIONS[_axis][value >= 0 ? 0 : 1];
      };

      fns.dragstart = function (e) {
        _this30.firstUserInteraction = true;
        _this30.isDragMove = true;

        _this30.stopSmoothing();

        _this30.stopAnimation();

        if (_this30.hint) {
          _this30.hint.hide();
        }

        if (_this30.hotspots) {
          _this30.hotspots.hideNeededElements(true);
        }

        _this30.userColumn = _this30.imagesMap.getStartColumn();
        _this30.userRow = _this30.imagesMap.getStartRow();

        if (_this30.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
          e.stop();
        }

        lastPoint.x = e.x;
        lastPoint.y = e.y;
        lastTime = e.timeStamp;
        startTime = $J.now();

        var t = $J.now() - _this30.sessionStartTime;

        _this30.sendStats('dragStart', t, {
          clientX: e.x - _this30.boxBoundaries.left,
          clientY: e.y - _this30.boxBoundaries.top,
          pageX: e.x,
          pageY: e.y
        });

        _this30.sendEvent('spinStart');

        _this30.sendEvent('rotate');

        _this30.sendStats('rotate', t, {});

        _this30.pinchCloud.removeEvent();
      };

      fns.dragend = function (e) {
        var time;
        var values;
        var countOfItems;
        var timeOfAnimation;
        var timeOfAnimation2;
        var animationValues = [];

        if (_this30.isDragMove) {
          e.stop();
          _this30.isDragMove = false;
          rotateDebounce.cancel();

          if (rotate && canMoveAxis === axis || rotate && (multi || onAnyDrag)) {
            time = +new Date() - startTime;
            values = getPoints(axis);
            countOfItems = getCountOfItems(FRICTION_FORCE[axis], cols, values.distance, time, sphereValues[axis].minSize);
            timeOfAnimation = getTime(FRICTION_FORCE[axis], cols, values.distance, time);
            animationValues.push({
              items: countOfItems,
              direction: values.direction
            });

            if (multi) {
              values = getPoints(otherAxis);
              countOfItems = getCountOfItems(FRICTION_FORCE[otherAxis], cols, values.distance, time, sphereValues[otherAxis].minSize);
              timeOfAnimation2 = getTime(FRICTION_FORCE[otherAxis], cols, values.distance, time);

              if (timeOfAnimation2 > timeOfAnimation) {
                timeOfAnimation = timeOfAnimation2;
              }

              animationValues.push({
                items: countOfItems,
                direction: values.direction
              });
            }

            _this30.animateTo(timeOfAnimation, animationValues);

            _this30.pinchCloud.addEvent();
          } else {
            if (_this30.hotspots && _this30.isInView && _this30.isSlideShown) {
              _this30.hotspots.showNeededElements();
            }

            _this30.animateWithDelay();
          }

          _this30.sendEvent('spinEnd');

          var now = $J.now();

          _this30.sendStats('dragEnd', now - _this30.sessionStartTime, {
            duration: now - startTime,
            clientX: e.x - _this30.boxBoundaries.left,
            clientY: e.y - _this30.boxBoundaries.top,
            pageX: e.x,
            pageY: e.y
          });

          lastPoint = {
            x: 0,
            y: 0
          };
          lastTime = null;
          lastPartOfDistance = {
            x: 0,
            y: 0
          };
          queue = {
            x: {
              next: 0,
              prev: 0
            },
            y: {
              up: 0,
              down: 0
            }
          };
          rotate = false;
        }
      };

      var setFrame = function (currentAxis, direction) {
        var result = false;

        if (lastPartOfDistance[currentAxis] > sphereValues[currentAxis].minSize) {
          result = true;
          var count = Math.floor(lastPartOfDistance[currentAxis] / sphereValues[currentAxis].minSize);
          lastPartOfDistance[currentAxis] = lastPartOfDistance[currentAxis] % sphereValues[currentAxis].minSize;

          _this30.imagesMap.prepareFutureImage(direction, count);

          _this30.imagesMap.setPreparedFutureImage();
        }

        return result;
      };

      fns.dragmove = function (e) {
        var directions = {};
        var currentDistance = {
          x: 0,
          y: 0
        };
        var absCurrentDistance = {
          x: 0,
          y: 0
        };
        var currentSpeed;

        if (_this30.isDragMove) {
          rotate = true;
          _this30.customActionWas = true;
          currentDistance.x = e.x - lastPoint.x; // +prev, -next

          currentDistance.y = e.y - lastPoint.y; // +down, -up

          absCurrentDistance.x = Math.abs(currentDistance.x);
          absCurrentDistance.y = Math.abs(currentDistance.y);
          currentSpeed = e.timeStamp - lastTime;
          lastTime = e.timeStamp;
          axis = absCurrentDistance.x >= absCurrentDistance.y ? 'x' : 'y';
          otherAxis = axis === 'x' ? 'y' : 'x';

          if (_this30.fullscreenState === globalVariables.FULLSCREEN.OPENED || multi || onAnyDrag || axis === 'x' && cols > 1 || axis === 'y' && rows > 1) {
            e.stop();
          }

          directions[axis] = getDirection(currentDistance[axis], axis);
          directions[otherAxis] = getDirection(currentDistance[otherAxis], otherAxis);
          addPoint(axis, currentSpeed, absCurrentDistance[axis], directions[axis]);
          addPoint(otherAxis, currentSpeed, absCurrentDistance[otherAxis], directions[otherAxis]);

          if (multi || onAnyDrag) {
            lastPartOfDistance.x += absCurrentDistance.x;
            lastPartOfDistance.y += absCurrentDistance.y;
          } else if (canMoveAxis) {
            if (canMoveAxis === axis && canMoveAxis === 'x') {
              lastPartOfDistance.x += absCurrentDistance.x;
            } else if (canMoveAxis === axis && canMoveAxis === 'y') {
              lastPartOfDistance.y += absCurrentDistance.y;
            }
          }

          if (setFrame(axis, directions[axis]) && onAnyDrag) {
            lastPartOfDistance[otherAxis] = 0;
          }

          if (multi) {
            setFrame(otherAxis, directions[otherAxis]);
          }

          _this30.userColumn = _this30.imagesMap.getCurrentColumn();
          _this30.userRow = _this30.imagesMap.getCurrentRow();
          lastPoint.x = e.x;
          lastPoint.y = e.y;

          _this30.draw();

          rotateDebounce();
        }
      };

      var cloud = {
        eventAdded: false
      };

      cloud.addEvent = function () {
        if (!cloud.eventAdded) {
          cloud.eventAdded = true;
          node.addEvent('mousedrag touchdrag', onDrag);
        }
      };

      cloud.removeEvent = function () {
        if (cloud.eventAdded) {
          cloud.eventAdded = false;
          node.removeEvent('mousedrag touchdrag', onDrag);
        }
      };

      this.touchDragCloud = cloud;

      if (!this.slideDragEventStart) {
        this.touchDragCloud.addEvent();
      }
    };

    _proto4.animateTo = function animateTo(time, values) {
      var _this31 = this;

      var last = [];
      var dirs = [];
      var startObj = {};
      clearTimeout(this.autospinResumeTimer);

      if (this.animationFX) {
        this.animationFX.stop();
      }

      for (var i = 0, l = values.length; i < l; i++) {
        dirs.push(values[i].direction);
        last.push(0);
        startObj[values[i].direction] = [0, values[i].items];
      }

      this.animationFX = new $J.FX($J.$new('div'), {
        duration: Math.abs(time),
        transition: $J.FX.getTransition().inCubic,
        onBeforeRender: $(function (ds, value) {
          var _i;

          var frame;

          for (_i = 0; _i < ds.length; _i++) {
            frame = Math.round(value[ds[_i]]);

            if (last[_i] !== frame) {
              _this31.imagesMap.prepareFutureImage(ds[_i], frame - last[_i]);

              _this31.imagesMap.setPreparedFutureImage();

              _this31.userColumn = _this31.imagesMap.getCurrentColumn();
              _this31.userRow = _this31.imagesMap.getCurrentRow();
              last[_i] = frame;
            }
          }

          _this31.draw();
        }).bind(this, dirs),
        onComplete: function () {
          _this31.stopAnimation();

          _this31.animateWithDelay();

          if (_this31.hotspots && _this31.isInView && _this31.isSlideShown) {
            _this31.hotspots.showNeededElements();
          }
        }
      }).start(startObj);
    };

    _proto4.setMouseWheel = function setMouseWheel(node) {
      var _this32 = this;

      var delta;
      var direction;
      var correction = 8 / 54;
      var count = 0;
      var spinOnWheel = false; // let stack = [];

      var wheelStep = 3;
      var wheelDebounce = helper.debounce(function (isMouse) {
        spinOnWheel = false; // stack = [];

        _this32.sendEvent('spinEnd');

        if (isMouse) {
          count = 0;
        } else {
          _this32.animateWithDelay();
        }
      }, 200);
      var rows = this.imagesMap.getCountOfRows();
      var cols = this.imagesMap.getCountOfFrames();
      var multi = rows > 1 && cols > 1;
      var onAnyDrag = this.option('freeDrag');

      if (this.option('wheel')) {
        var _shiftButtonIsPressed = false;

        this.keyPressHandlerForShiftButton = function (e) {
          if (e.oe.keyCode === 16) {
            // shift
            _shiftButtonIsPressed = e.type === 'keydown';
          }
        };

        $J.W.addEvent('keydown keyup', this.keyPressHandlerForShiftButton);
        node.addEvent('mousescroll', function (e) {
          _this32.firstUserInteraction = true;
          var shiftButtonIsPressed = e.isMouse ? _shiftButtonIsPressed : false;
          var isX = Math.abs(e.deltaY) < Math.abs(e.deltaX); // TODO chrome on windows 10 has just Y axis
          // if (!isX && rows === 1) { return; }

          if (!isX && !multi && !onAnyDrag) {
            return;
          }

          _this32.customActionWas = true;
          e.stop();

          if (_this32.animationFX) {
            _this32.animationFX.stop();

            _this32.animationFX = null;
          }

          _this32.stopSmoothing();

          _this32.stopAnimation();

          if (_this32.hotspots) {
            _this32.hotspots.hideActiveHotspotBox();
          }

          if (!spinOnWheel) {
            spinOnWheel = true;

            _this32.sendEvent('spinStart');

            _this32.sendEvent('rotate');

            _this32.sendStats('rotate', $J.now() - _this32.sessionStartTime, {});
          }

          if (isX) {
            delta = e.deltaX;
            direction = delta >= 0 ? 'next' : 'prev';
          } else {
            delta = e.deltaY;

            if (rows > 1 && !shiftButtonIsPressed) {
              direction = delta >= 0 ? 'down' : 'up';
            } else {
              direction = delta >= 0 ? 'next' : 'prev';
            }
          }

          if (e.isMouse) {
            delta = delta / Math.abs(delta) * wheelStep;
            count += Math.abs(delta);

            _this32.animateTo(200, [{
              direction: direction,
              items: count
            }]);
          } else {
            delta = delta * correction;
            count += delta;

            if (Math.abs(count) > 1) {
              delta = parseInt(count, 10);
              count -= delta;

              _this32.imagesMap.prepareFutureImage(direction, Math.abs(delta));

              _this32.imagesMap.setPreparedFutureImage();

              _this32.draw();
            }
          }

          wheelDebounce(e.isMouse);
        });
      }
    };

    _proto4.animate = function animate(action, autoplayDuration, autoplayType, fromAPI) {
      var _this33 = this;

      var isAutospin = action === 'autoplay' || this.option('autospin.enable');

      if (!this.isInView || !this.isSlideShown || this.animationCloud.isMoving() || this.isDragMove || this.customActionWas && !isAutospin && !fromAPI) {
        return;
      }

      if (this.animationCloud.isPaused()) {
        this.animationCloud.resume();
        return;
      }

      clearTimeout(this.animationCloud.hintTimer);
      clearTimeout(this.autospinResumeTimer);
      var delay = false;
      var effect = null;

      if (isAutospin) {
        if (this.isAutoplayPaused) {
          return;
        }

        effect = 'as-' + (autoplayType || this.option('autospin.type'));

        if (action !== 'start') {
          delay = true;
        }
      } else {
        var nameOfEvent;

        switch (action) {
          case 'start':
            nameOfEvent = 'onStart';
            break;

          case 'inView':
          case 'slideIn':
            nameOfEvent = 'onVisible';
            break;

          case 'inactive':
            delay = true;
            nameOfEvent = 'onInactive';
            break;

          default:
            effect = action;
        }

        if (nameOfEvent && this.option('hint.' + nameOfEvent + '.enable')) {
          var tmp = this.option('hint.' + nameOfEvent + '.effect');

          if (tmp) {
            effect = tmp;
          }
        } // showTextHint = false;

      }

      this.animationCloud.start({
        speed: autoplayDuration || this.option('autospin.duration'),
        type: effect,
        infinite: isAutospin,
        delay: delay,
        isBackward: this.reflectDirection,
        userInteraction: fromAPI
      }, function () {
        var r = _this33.showHint();

        if (_this33.hotspots && _this33.isInView && _this33.isSlideShown) {
          _this33.hotspots.showNeededElements();
        }

        if (_this33.option('hint.onInactive.enable')) {
          if (r) {
            _this33.animationCloud.hintTimer = setTimeout(function () {
              _this33.animationCloud.hintTimer = null;

              _this33.animate('inactive');
            }, _this33.hint.getMovingTime());
          } else {
            _this33.animate('inactive');
          }
        }
      });
    };

    _proto4.initAnimation = function initAnimation() {
      var _this34 = this;

      var isMoving = false;
      var isPaused = false;
      var isStopped = false;
      var timer = null;
      var delayTimer = null;
      var step;
      var currentIndex = 0;
      var callback = null;
      var framesLength = this.imagesMap.getCountOfFrames();
      var options;

      if (this.option('swapSides')) {
        framesLength = this.imagesMap.getCountOfRows();
      }

      var clear = function () {
        isMoving = false;
        currentIndex = 0;
      };

      var end = function () {
        clear();

        if (callback) {
          callback();
        }
      };

      var move = function () {
        var count = _this34.imagesMap.getNextBufferIndex(currentIndex);

        if (count || options.infinite) {
          if (!count && options.infinite) {
            count = 1;

            if (options.infinite) {
              currentIndex = -1;
            } else {
              currentIndex = 0;
            }
          }

          currentIndex = currentIndex + count;

          _this34.imagesMap.setNextAnimationFrame(currentIndex);

          timer = setTimeout(function () {
            _this34.imagesMap.setPreparedNextImage();

            _this34.draw();

            move();
          }, count * step);
        } else {
          end();
        }
      };

      var getSpeed = function (currentSpeed, typeOfAnimation) {
        var r = currentSpeed;

        if (!r) {
          switch (typeOfAnimation) {
            case 'intro':
              r = 3600;
              break;

            case 'twitch':
              r = 2200;
              break;

            case 'spin':
              r = 3600;
              break;

            case 'momentum':
              r = 10;
              break;

            default:
              r = 3600;
          }
        }

        return r;
      };

      var animationCloud = {
        hintTimer: null,
        isMoving: function () {
          return isMoving;
        },
        isPaused: function () {
          return isPaused;
        },
        start: function (_options, cb) {
          if (isMoving) {
            return;
          }

          isMoving = true;
          isStopped = false;

          var _move = function () {
            delayTimer = null;

            if (options.type) {
              if (!_this34.imagesMap) {
                return;
              }

              _this34.imagesMap.createAnimation(options.type, options.isBackward);

              if (options.userInteraction && _this34.imagesMap.getImagesBuffer() && _this34.imagesMap.getImagesBuffer().length) {
                var last = _this34.imagesMap.getImagesBuffer()[_this34.imagesMap.getImagesBuffer().length - 1];

                _this34.userColumn = last.col;
                _this34.userRow = last.row;
              }

              step = options.speed / framesLength;

              if (options.infinite) {
                _this34.showHint();
              }

              move();
            } else {
              end();
            }
          };

          callback = cb;
          options = $J.extend({
            speed: 3600,
            type: 'row',
            delay: false,
            infinite: false,
            isBackward: false,
            userInteraction: false
          }, _options);
          options.speed = getSpeed(options.speed, options.type);

          if (options.delay && !options.infinite) {
            delayTimer = setTimeout(_move, _this34.option('inactivity'));
          } else {
            _move();
          }
        },
        resume: function () {
          if (isPaused) {
            isMoving = true;
            isPaused = false;
            move();
          }
        },
        pause: function () {
          if (!isPaused && !isStopped) {
            isMoving = false;
            isPaused = true;
            clearTimeout(animationCloud.hintTimer);
            clearTimeout(delayTimer);
            clearTimeout(timer);
          }
        },
        stop: function () {
          animationCloud.pause();
          isStopped = true;
          isPaused = false;
          currentIndex = 0;
          callback = null;

          _this34.imagesMap.clearFramesQueue();

          _this34.imagesMap.resetPreparedImage();
        }
      };
      this.animationCloud = animationCloud;
    };

    _proto4.stopAnimation = function stopAnimation() {
      if (this.animationFX) {
        this.animationFX.stop();
        this.animationFX = null;
      }

      clearTimeout(this.autospinResumeTimer);

      if (this.animationCloud) {
        this.animationCloud.stop();
      }
    } // eslint-disable-next-line no-unused-vars
    ;

    _proto4.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {
      this.stopSmoothing();
      this.stopAnimation();

      if (this.zoom) {
        this.zoom.hide(true);
      }

      this.deactivateSpin();
      this.boxBoundaries = this.coreNode.getRect();

      _Zoominstance.prototype.onBeforeFullscreenIn.call(this, data);

      if (this.hotspots) {
        this.hotspots.hideAll();
      }

      if (this.isInited && this.isInView && this.isSlideShown) {
        this.isHidden = true;
        this.canvas.setCss({
          opacity: 0,
          visibility: 'hidden'
        });
      }
    } // eslint-disable-next-line no-unused-vars
    ;

    _proto4.onAfterFullscreenIn = function onAfterFullscreenIn(data) {
      var _this35 = this;

      if (!this.infoSize) {
        return;
      } // const insideIFrame = $J.W.node.parent !== $J.W.node.window;
      // const pseudo = data.pseudo;
      // if we use it, we do not have pinchend event and touchdrag after that
      // if (this.pinchCloud) {
      //     this.pinchCloud.removeEvent();
      //     this.pinchCloud.addEvent();
      // }


      if (this.canvasPromise && this.canvasPromise.isPending()) {
        this.canvasPromise.resolve();
      }

      var screenSize = this.coreNode.getSize();
      this.currentSize = helper.spinLib.calcProportionSize(screenSize, this.infoSize, true, this.standardSize);
      this.getDPPX(this.currentSize);
      this.setImageSize();
      this.setCanvasSize();

      if (this._isReady) {
        if (!this.imagesMap.isImagesExist({
          width: this.currentImageSize.width,
          height: this.currentImageSize.height
        })) {
          this.imagesMap.loadImages({
            width: this.currentImageSize.width,
            height: this.currentImageSize.height,
            dppx: this.dppx
          });
        }
      }

      if (this.firstImageLoaded) {
        this.draw();
      }

      if (this.isHidden) {
        this.isHidden = false;
        setTimeout(function () {
          _this35.canvas.setCss({
            opacity: '',
            visibility: ''
          });
        }, 0);
      }

      if (this.hotspots) {
        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
          this.hotspots.showAll();

          if (this.isInView && this.isSlideShown) {
            this.hotspots.showNeededElements();
          }
        }
      }

      if (this._isReady) {
        this.animate('inactive');

        if (!$J.browser.mobile) {
          this.showHint();
        }

        this.fullscreenStartTime = +new Date();
        this.sendStats('fullscreenOpen', $J.now() - this.sessionStartTime);
      }
    } // eslint-disable-next-line no-unused-vars
    ;

    _proto4.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {
      this.stopSmoothing();
      this.stopAnimation();

      if (this.zoom) {
        this.zoom.hide(true);
      }

      this.deactivateSpin();

      if (this.hint && this.always) {
        this.hint.hide();
      }

      _Zoominstance.prototype.onBeforeFullscreenOut.call(this, data);

      if (this.isInited && this.isInView && this.isSlideShown) {
        this.isHidden = true;
        this.canvas.setCss({
          opacity: 0,
          visibility: 'hidden'
        });
      }
    } // eslint-disable-next-line no-unused-vars
    ;

    _proto4.onAfterFullscreenOut = function onAfterFullscreenOut(data) {
      var _this36 = this;

      if (!this.infoSize) {
        return;
      } // const pseudo = data.pseudo;
      // if we use it, we do not have pinchend event and touchdrag after that
      // if (this.pinchCloud) {
      //     this.pinchCloud.removeEvent();
      //     this.pinchCloud.addEvent();
      // }


      if (this.canvasPromise && this.canvasPromise.isPending()) {
        this.canvasPromise.resolve();
      }

      this.currentSize = helper.spinLib.calcProportionSize(this.coreNode.getSize(), this.infoSize);
      this.getDPPX(this.currentSize);
      this.standardSize.width = this.currentSize.width;
      this.standardSize.height = this.currentSize.height;
      this.currentImageSize.width = this.currentSize.width;
      this.currentImageSize.height = this.currentSize.height;
      this.setCanvasSize();

      if (this._isReady) {
        if (!this.imagesMap.isImagesExist({
          width: this.currentSize.width,
          height: this.currentSize.height
        })) {
          this.imagesMap.loadImages({
            width: this.currentSize.width,
            height: this.currentSize.height,
            dppx: this.dppx
          });
        }
      }

      if (this.firstImageLoaded) {
        this.draw();
      }

      if (this.isHidden) {
        this.isHidden = false;
        setTimeout(function () {
          if (!_this36.destroyed) {
            _this36.canvas.setCss({
              opacity: '',
              visibility: ''
            });
          }
        }, 0);
      }

      _Zoominstance.prototype.onAfterFullscreenOut.call(this, data);

      if (this._isReady) {
        this.animate('inactive');

        if (!$J.browser.mobile) {
          this.showHint();
        }

        var now = $J.now();
        this.sendStats('fullscreenClose', now - this.sessionStartTime, {
          duration: now - this.fullscreenStartTime
        });
      }
    };

    _proto4.play = function play(duration, effect) {
      var result = false;

      if (this._isReady && !this.isZoomed()) {
        this.isAutoplayPaused = false;
        this.stopSmoothing();
        this.stopAnimation();

        if (!this.instanceOptions.checkValue('autospin.duration', duration)) {
          duration = null;
        }

        if (!this.instanceOptions.checkValue('autospin.type', effect)) {
          effect = null;
        }

        this.animate('autoplay', duration, effect);
        result = true;
      }

      return result;
    };

    _proto4.pause = function pause() {
      var result = false;

      if (this._isReady && !this.isZoomed()) {
        this.isAutoplayPaused = true;
        this.stopSmoothing();
        this.stopAnimation();
        this.animateWithDelay();
        result = true;
      }

      return result;
    };

    _proto4.rotate = function rotate(countOfCols, countOfRows) {
      var result = false;

      var normalizeValue = function (value) {
        if (!value) {
          value = 0;
        } else if ($J.typeOf(value) === 'string') {
          value = parseInt(value, 10);

          if (isNaN(value)) {
            value = 0;
          }
        }

        return value;
      };

      if (this._isReady) {
        countOfCols = normalizeValue(countOfCols);
        countOfRows = normalizeValue(countOfRows);

        if (countOfCols !== 0 || countOfRows !== 0) {
          this.stopAnimation();
          this.stopSmoothing();

          if (!this.isDragMove) {
            this.sendEvent('rotate');
            this.sendStats('rotate', $J.now() - this.sessionStartTime, {});
            this.animate({
              cols: countOfCols,
              rows: countOfRows
            }, $J.U, $J.U, true);
            result = true;
          }
        }
      }

      return result;
    };

    _proto4.jumpTo = function jumpTo(value, axis) {
      var result = false;
      var direction = null;

      if (this._isReady) {
        if ($J.typeOf(value) === 'string') {
          value = value.trim();
          direction = /^-/.test(value) ? 'prev' : 'next';
        }

        value = parseInt(value, 10);

        if (!isNaN(value)) {
          result = this.imagesMap.jump(axis, value, direction);

          if (result && this.firstImageLoaded) {
            this.sendEvent('rotate');
            this.sendStats('rotate', $J.now() - this.sessionStartTime, {});
            this.draw();
          }
        }
      }

      return result;
    };

    _proto4.zoomIn = function zoomIn() {
      if (this._isReady && this.zoom) {
        if (!this.isDragMove && this.isFullscreenActionEnded()) {
          return this.openLens();
        }
      }

      return false;
    };

    _proto4.zoomOut = function zoomOut() {
      if (this._isReady && this.zoom) {
        return this.zoom.hide();
      }

      return false;
    };

    _proto4.getCurrentFrame = function getCurrentFrame() {
      if (this._isReady) {
        var img = this.imagesMap.getCurrentImage({
          width: this.currentSize.width,
          height: this.currentSize.height
        });
        return {
          row: img.row + 1,
          column: img.col + 1
        };
      }

      return false;
    };

    _proto4.getOriginImageUrl = function getOriginImageUrl() {
      if (this._isReady) {
        return this.imagesMap.getOriginImageUrl();
      }

      return null;
    };

    _proto4.setCallback = function setCallback(name, fn) {
      if (this._isReady) {
        this.option(name, fn);
        return true;
      }

      return false;
    };

    _proto4.setImageSize = function setImageSize() {
      this.currentImageSize.width = this.currentSize.width;
      this.currentImageSize.height = this.currentSize.height;
    };

    _proto4.isZoomSizeExist = function isZoomSizeExist() {
      var result = false; // const minZoom = 1.2;

      var minZoomFactor = 100; // like in deep zoom level calculation

      if (this.option('zoom.enable')) {
        var cs = this.currentImageSize;
        var zoomSize = this.getZoomSize();

        if (zoomSize.originWidth - cs.width >= minZoomFactor) {
          result = true;
        }
      }

      return result;
    };

    _proto4.getOrientation = function getOrientation() {
      return this.imagesMap.getHintType();
    };

    _proto4.getType = function getType() {
      return this.type;
    };

    _proto4.onResize = function onResize() {
      if (this.fullscreenState === globalVariables.FULLSCREEN.OPENING || !this.isStarted) {
        return false;
      }

      var isFullscreen = this.fullscreenState === globalVariables.FULLSCREEN.OPENED;
      this.stopSmoothing();

      if (this.option('autospin.enable')) {
        this.animationCloud.pause();
      } else {
        this.stopAnimation();
      }

      this.boxBoundaries = this.coreNode.getRect();
      this.currentSize = helper.spinLib.calcProportionSize($(this.coreNode.node.parentNode).getSize(), this.infoSize, isFullscreen, this.standardSize);
      this.getDPPX(this.currentSize);
      this.standardSize.width = this.currentSize.width;
      this.standardSize.height = this.currentSize.height;
      this.setImageSize();
      this.setCanvasSize();
      this.calcMinSizeForDrag();

      if (this.isZoomSizeExist()) {
        this.coreNode.addClass(globalVariables.CSS_CURSOR_ZOOM_IN);
      } else {
        this.coreNode.removeClass(globalVariables.CSS_CURSOR_ZOOM_IN);
      }

      if (this.zoom) {
        this.zoom.onResize();
      }

      if (!this.imagesMap.isImagesExist({
        width: this.currentSize.width,
        height: this.currentSize.height
      })) {
        this.imagesMap.loadImages({
          width: this.currentSize.width,
          height: this.currentSize.height,
          dppx: this.dppx
        });
      }

      if (this.firstImageLoaded) {
        this.draw();
      }

      if (this._isReady && this.hotspots) {
        this.hotspots.setContainerSize(this.canvasContainer.node.getBoundingClientRect());
        this.hotspots.updateAndShow();
      }

      this.resizeAnimationTimer();
      return true;
    } // @Override, HotspotInstance class
    ;

    _proto4.getContainerForBoundengClientRect = function getContainerForBoundengClientRect() {
      return this.canvasContainer;
    };

    _proto4.destroy = function destroy() {
      this.instanceNode.removeEvent('touchmove', fnStopTouchMove);
      $J.W.removeEvent('resize', this.windowResizeCallback);
      clearTimeout(this.resizeWindowTimer);

      if (this.isInited) {
        this.sendStats('sessionEnd', $J.now() - this.sessionStartTime, {
          message: 'Stopped'
        });
      }

      this.coreNode.removeEvent('btnclick tap');
      this.coreNode.del('instance');
      this.resizeAnimationTimer.cancel();
      this.resizeAnimationTimer = null;

      if (this.touchDragCloud) {
        this.touchDragCloud.removeEvent();
        this.touchDragCloud = null;
      }

      if (this.placeholder) {
        this.placeholder.setCssProp('display', '');
      }

      if (this.keyPressHandlerForShiftButton) {
        $J.W.removeEvent('keydown keyup', this.keyPressHandlerForShiftButton);
        this.keyPressHandlerForShiftButton = null;
      }

      if (this.cssId > -1) {
        $J.removeCSS(this.id + '-css', this.cssId);
        $J.$(this.id + '-css').remove();
      }

      this.cssId = -1;

      if (this.initNameEvent) {
        this.coreNode.removeEvent(this.initNameEvent, this.initFnEvent);
      }

      if (this.activatedCurtain) {
        this.activatedCurtain.destroy();
      }

      this.stopSmoothing();
      this.stopAnimation();

      if (this.hint) {
        this.hint.destroy();
        this.hint = null;
      }

      this.coreNode.removeEvent('mousedrag touchdrag pinch');

      if (this.loader) {
        this.loader.destroy();
        this.loader = null;
      }

      if (this.imagesMap) {
        this.imagesMap.destroy();
        this.imagesMap = null;
        this.off('mapFirstImageLoaded');
        this.off('mapImagesReady');
        this.off('mapImageLoaded');
        this.off('mapAllImagesLoaded');
      } // this.additionalCanvases = [];


      this.clearCanvas();

      if (this.canvas) {
        this.canvas.removeEvent('transform');
        this.canvas.removeClass(this.zoomClassName);
        this.canvas.remove();
      }

      this.canvasContainer.removeEvent('transform');
      this.canvasContainer.removeEvent('mouseover');
      this.canvasContainer.removeEvent('mouseout');
      this.canvasContainer.remove();
      this.canvasContainer = null;
      this.ctx = null;
      this.canvas = null;
      this.loadedImages = [];
      this.off('isSingleSlide');
      this.off('zoomUp');
      this.off('zoomDown');
      this.off('frameChange');
      this.coreNode.remove();
      this.infoSize = null;
      this.startLoadingTime = null;
      this.isInited = false;
      this.openedImg = null;
      this.coreNode = null;
      this.firstUserInteraction = false;

      if (this.animationCloud) {
        clearTimeout(this.animationCloud.hintTimer);
        this.animationCloud = null;
      }

      this.lastImg = null;
      this.hotspotsData = null;

      _Zoominstance.prototype.destroy.call(this);

      return true;
    };

    return Spin;
  }(Zoominstance);

  return Spin;
});
//# sourceMappingURL=spin.js.map
