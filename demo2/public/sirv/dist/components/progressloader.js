Sirv.define('ProgressLoader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'RoundLoader'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, RoundLoader) {
  var moduleName = 'ProgressLoader';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-progress-loader{pointer-events:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.smv-progress-loader .smv-pl-circle-wrapper,.smv-progress-loader .smv-pl-indicator,.smv-progress-loader .smv-pl-indicator .smv-pl-pie,.smv-progress-loader .smv-pl-indicator .smv-pl-slice,.smv-progress-loader .smv-pl-text-wrapper,.smv-progress-loader .smv-pl-wrapper{top:0;left:0;width:100%;height:100%}.smv-progress-loader .smv-pl-text-wrapper,.smv-progress-loader .smv-pl-wrapper{display:inline-block;position:relative}.smv-progress-loader .smv-pl-wrapper{transform:scale(0);transition:transform .15s cubic-bezier(.17,.67,.57,1.47),opacity .2s linear;border-radius:50%;background-color:rgba(0,0,0,.55);opacity:0}.smv-progress-loader .smv-pl-circle-wrapper,.smv-progress-loader .smv-pl-indicator,.smv-progress-loader .smv-pl-indicator .smv-pl-pie,.smv-progress-loader .smv-pl-indicator .smv-pl-slice{position:absolute}.smv-progress-loader .smv-pl-circle-wrapper,.smv-progress-loader .smv-pl-indicator{z-index:1}.smv-progress-loader .smv-pl-circle-wrapper{-webkit-animation:sirv-pl-loader-rotate 2s infinite linear;animation:sirv-pl-loader-rotate 2s infinite linear}.smv-progress-loader .smv-pl-indicator .smv-pl-pie,.smv-progress-loader .smv-pl-indicator .smv-pl-slice{stroke-width:2;fill:transparent}.smv-progress-loader .smv-pl-indicator .smv-pl-pie{z-index:1;stroke:rgba(255,255,255,.3)}.smv-progress-loader .smv-pl-indicator .smv-pl-slice{z-index:2;stroke:#fff;stroke-linecap:round}.smv-progress-loader .smv-pl-text-wrapper{display:inline-flex;position:relative;align-items:center;justify-content:center;font-size:12px;text-align:center;z-index:2}.smv-progress-loader .smv-pl-text-wrapper::after{display:inline-block;height:100%;content:\'\';vertical-align:middle}.smv-progress-loader .smv-pl-text-wrapper .smv-pl-text{display:inline;position:relative;color:#fff;font-weight:700}.smv-progress-loader .smv-pl-text-wrapper .smv-pl-text .smv-pl-text-percent{font-size:.7em}@-webkit-keyframes sirv-pl-loader-rotate{from{transform:rotateZ(0)}to{transform:rotateZ(360deg)}}@keyframes sirv-pl-loader-rotate{from{transform:rotateZ(0)}to{transform:rotateZ(360deg)}}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global RoundLoader, helper, $J, $ */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var svgNS = 'http://www.w3.org/2000/svg';

  var setDefaultOptions = function (options) {
    if (!options) {
      options = {};
    }

    if (!options.width) {
      options.width = 44;
    }

    if (!options.height) {
      options.height = 44;
    }

    if (!options.max) {
      options.max = 0;
    }

    return options;
  };

  var createSvg = function (name, attributes) {
    var el = $($J.D.node.createElementNS(svgNS, name));

    if (!attributes) {
      attributes = {};
    }

    helper.objEach(attributes, function (key, value) {
      el.attr(key, value);
    });
    return el;
  };

  var getStrokeDashoffset = function (max, percent) {
    return max - max / 100 * percent;
  };

  var getPercent = function (max, value) {
    return Math.round(100 / (max / value));
  };

  var PROGRESS = {
    START: 0,
    LOADING: 1,
    END: 2
  }; // eslint-disable-next-line no-unused-vars

  var ProgressLoader = /*#__PURE__*/function (_RoundLoader) {
    "use strict";

    bHelpers.inheritsLoose(ProgressLoader, _RoundLoader);

    function ProgressLoader(parent, options) {
      var _this;

      options = setDefaultOptions(options);
      _this = _RoundLoader.call(this, parent, options) || this;
      _this.type = 'progress';
      _this.lineSize = 125;
      _this.currentLineSize = 125;
      _this.currentPersent = 0;
      _this.currentValue = 0;
      _this.progressState = PROGRESS.START;
      _this.maxOpacityFlag = false;
      _this.maxOpacity = 1;
      _this.circles = [];
      _this.size = {
        width: _this.options.width,
        height: _this.options.height
      };
      _this.state = globalVariables.APPEARANCE.HIDDEN;

      _this._createCircles();

      return _this;
    }

    var _proto = ProgressLoader.prototype;

    _proto.addClass = function addClass() {
      this.node.addClass('smv-progress-loader');
    };

    _proto._createCircles = function _createCircles() {
      this.p = '<span class="smv-pl-text-percent">%</span>';
      this.loaderElement.addClass('smv-pl-wrapper');
      this.circleWrapper = $J.$new('div').addClass('smv-pl-circle-wrapper');
      var size = this.size.width;
      var halfSize = size / 2;
      this.circles.push(createSvg('circle', {
        'class': 'smv-pl-pie',
        r: halfSize - 2,
        cx: halfSize,
        cy: halfSize
      }));
      this.circles.push(createSvg('circle', {
        'class': 'smv-pl-slice',
        r: halfSize - 2,
        cx: halfSize,
        cy: halfSize
      }));
      this.svg = createSvg('svg', {
        'class': 'smv-pl-indicator',
        viewBox: '0 0 ' + size + ' ' + size
      });
      this.circles[1].node.style.strokeDasharray = this.lineSize;
      this.circles[1].node.style.strokeDashoffset = this.lineSize;
      $(this.circles[1]).addEvent('transitionend', function (e) {
        e.stop();
      }).setCssProp('transition', 'stroke-dashoffset .1s linear');
      $(this.svg).append(this.circles[0]);
      $(this.svg).append(this.circles[1]);
      this.textWrapper = $J.$new('div').addClass('smv-pl-text-wrapper');
      this.text = $J.$new('span').addClass('smv-pl-text');
      this.text.changeContent(this.currentPersent + this.p);
      this.textWrapper.append(this.text);
      this.circleWrapper.append(this.svg);
      this.loaderElement.append(this.circleWrapper);
      this.loaderElement.append(this.textWrapper);
    };

    _proto.append = function append() {
      if (this.progressState !== PROGRESS.END) {
        _RoundLoader.prototype.append.call(this);
      }
    };

    _proto.progress = function progress() {
      if (this.progressState !== PROGRESS.END) {
        this.progressState = PROGRESS.LOADING;
        this.currentValue += 1;
        this.currentPersent = getPercent(this.options.max, this.currentValue);
        this.currentLineSize = getStrokeDashoffset(this.lineSize, this.currentPersent);
        this.circles[1].node.style.strokeDashoffset = this.currentLineSize;
        this.text.node.innerHTML = this.currentPersent + this.p;

        if (this.currentValue === this.options.max) {
          this.progressState = PROGRESS.END;
          this.hide();
        }
      }
    };

    _proto.setMaxOpacity = function setMaxOpacity(opacity) {
      if (!this.maxOpacityFlag && this.loaderElement) {
        this.maxOpacity = opacity;
        this.maxOpacityFlag = true;
        this.loaderElement.setCssProp('opacity', opacity);
      }
    };

    _proto.isEnded = function isEnded() {
      return this.currentValue === this.options.max;
    };

    _proto.isStarted = function isStarted() {
      return this.currentValue > 0;
    };

    _proto.finishOff = function finishOff() {
      this.currentValue = this.options.max;
    };

    _proto.isShow = function isShow() {
      return this.state === globalVariables.APPEARANCE.SHOWN;
    };

    _proto.show = function show() {
      if (this.state === globalVariables.APPEARANCE.SHOWN) {
        return;
      }

      this.state = globalVariables.APPEARANCE.SHOWN;
      this.append();
      this.loaderElement.getSize();
      this.loaderElement.removeEvent('transitionend');
      this.loaderElement.addEvent('transitionend', function (e) {
        e.stop();
      });
      this.loaderElement.setCss({
        display: 'block',
        opacity: this.maxOpacity,
        transform: 'scale(1)'
      });
    };

    _proto.hide = function hide(force) {
      var _this2 = this;

      if (this.state === globalVariables.APPEARANCE.HIDDEN && !force || !this.inDoc) {
        return;
      }

      var countOfTransitionEvents = 0;
      this.state = globalVariables.APPEARANCE.HIDDEN;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this2.loaderElement.removeEvent('transitionend');

        _this2.loaderElement.addEvent('transitionend', function (e) {
          e.stop();
          countOfTransitionEvents += 1;

          if (countOfTransitionEvents < 2) {
            return;
          }

          _this2.loaderElement.removeEvent('transitionend');

          _this2.loaderElement.setCssProp('display', 'none');
        });

        _this2.loaderElement.setCss({
          opacity: 0,
          transform: 'scale(0)'
        });
      }, force ? 0 : 400);
    };

    _proto.getProgressState = function getProgressState() {
      return this.progressState;
    };

    _proto.destroy = function destroy() {
      this.hide(true);
      clearTimeout(this.timer);
      this.currentPersent = 0;
      this.currentValue = 0;
      this.progressState = PROGRESS.START;
      this.state = globalVariables.APPEARANCE.HIDDEN;
      this.loaderElement.removeEvent('transitionend');
      this.loaderElement.node.innerHTML = '';
      this.loaderElement = null;
      this.circleWrapper = null;
      this.textWrapper = null;
      this.circles = [];
      this.svg = null;
      this.text = null;
      this.inDoc = false;

      _RoundLoader.prototype.destroy.call(this);
    };

    return ProgressLoader;
  }(RoundLoader);

  return ProgressLoader;
});
//# sourceMappingURL=progressloader.js.map
