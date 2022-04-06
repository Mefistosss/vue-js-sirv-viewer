Sirv.define('ImageZoom', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'EventEmitter'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, EventEmitter) {
  var moduleName = 'ImageZoom';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.sirv-zoom{position:absolute;-webkit-backface-visibility:hidden!important;backface-visibility:hidden!important;-webkit-touch-callout:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important;outline:0!important;z-index:999999999;touch-action:none;-webkit-tap-highlight-color:transparent!important}.sirv-zoom .sirv-outside-zoom{background:#fff;box-shadow:0 0 3px rgba(153,153,153,.5)}.sirv-zoom .sirv-circle-zoom{border:0;border-radius:100%;background:rgba(255,255,255,.3)}.sirv-zoom .sirv-circle-zoom::before{position:absolute;display:block;top:0;right:0;bottom:0;left:0;border:1px solid rgba(153,153,153,.7);border-radius:100%;background:0 0;box-shadow:inset 0 0 20px 1px rgba(0,0,0,.3);content:\'\';z-index:126}.sirv-zoom .sirv-zoom-wrapper{position:absolute;display:inline-block;overflow:hidden;z-index:9}.sirv-zoom .sirv-zoom-wrapper .sirv-zoom-image-wrapper{position:absolute;overflow:hidden}.sirv-zoom .sirv-zoom-wrapper .sirv-zoom-image-wrapper>img{position:absolute;top:0;left:0;margin:0;padding:0;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;user-drag:none}.sirv-zoom .sirv-zoom-wrapper .sirv-deepzoom{position:relative;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:42}.sirv-zoom .sirv-zoom-wrapper .sirv-deepzoom>div{position:absolute;top:0;left:0;width:100%;height:100%}.sirv-zoom .sirv-zoom-wrapper .sirv-deepzoom>div canvas{top:0;left:0}.zoom-helper{position:fixed;border-radius:4px;display:inline-block;top:10px;right:10px;padding:10px;border:1px solid #ccc9c9;background-color:#eaeaea;box-shadow:1px 1px 9px 1px rgba(0,0,0,.5);overflow:hidden;z-index:999;overflow-y:auto}.zoom-helper .z-loaded-color{background-color:#87bd89!important}.zoom-helper .z-loading-color{background-color:#a99cef!important}.zoom-helper .z-canceled-color{background-color:#f19c9c!important}.zoom-helper .z-helper-head{margin-bottom:9px}.zoom-helper .z-body,.zoom-helper .z-head,.zoom-helper .z-level{position:relative}.zoom-helper .z-level{border-radius:4px;margin-bottom:9px;padding:10px;background-color:#d4d3d3;box-sizing:border-box}.zoom-helper .z-head{margin-bottom:9px}.zoom-helper .z-body{border-top:1px solid;border-left:1px solid}.zoom-helper .z-tile{position:absolute;display:inline-block;border-right:1px solid;border-bottom:1px solid;box-sizing:border-box}.zoom-helper .z-status{border-radius:50%;display:inline-block;width:10px;height:10px;margin-left:10px;background-color:#e87979;box-sizing:border-box}.zoom-helper .z-status.shown{background-color:#66ca66!important}.sirv-zoom-map{position:absolute;box-sizing:border-box;bottom:16px;left:16px;width:200px;height:150px;border:1px solid #bdbdbd;overflow:hidden;z-index:126;cursor:pointer}.sirv-zoom-map .sirv-zoom-map-lens{position:absolute;box-sizing:border-box;top:50px;left:50px;width:50px;height:50px;border:1px solid #fff;z-index:42}.sirv-zoom-map .sirv-zoom-map-lens::after,.sirv-zoom-map .sirv-zoom-map-lens::before{position:absolute;display:block;width:100%;height:100%;content:\'\'}.sirv-zoom-map .sirv-zoom-map-lens::before{box-sizing:content-box;border-width:1em;border-style:solid;border-color:rgba(0,0,0,.6);-o-border-image:initial;border-image:initial;top:-1em;left:-1em}.sirv-zoom-map .sirv-zoom-map-lens::after{box-sizing:border-box;border-width:1px;border-style:solid;border-color:#fff;-o-border-image:initial;border-image:initial}.sirv-zoom-map>img{position:relative;top:0;left:0;width:100%;height:100%}.sirv-zoom-lens,.sirv-zoom-lens-wrapper{position:absolute;top:0;left:0}.sirv-zoom-lens-wrapper{background-color:rgba(153,153,153,.4);overflow:hidden;z-index:9999999999}.sirv-zoom-lens{box-shadow:0 0 3px rgba(153,153,153,.5);overflow:hidden}.sirv-zoom-lens img{max-width:none!important;max-height:none!important;transition:none!important}.sirv-filter-bw{filter:grayscale(.5) opacity(.5);filter:url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'saturate\' values=\'0\'/><feComponentTransfer><feFuncA type=\'linear\' slope=\'0.6\'/></feComponentTransfer></filter></svg>#grayscale")}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* global helper */

  /* eslint-disable no-unused-vars */

  var CURSOR_STATES = {
    canZoom: 'smv-cursor-zoom',
    zoomIn: 'smv-cursor-zoom-in',
    zoomOut: 'smv-cursor-zoom-out',
    drag: 'smv-cursor-dragging'
  };
  var TOUCH = 'mousedrag touchdrag';
  var TOUCHEND = helper.isIe() ? 'pointerup' : 'touchend';
  var MOVE = 'mousemove';

  if (helper.isIe()) {
    MOVE = 'pointermove';
  }

  var getPercentValue = function (value, percent) {
    return value / 100 * percent;
  };

  var getDifference = function (bigValue, smallValue) {
    return (bigValue - smallValue) / 2;
  };

  var checkImagePosition = function (value, minPos, maxPos, lensSize) {
    if (value > minPos) {
      value = minPos;
    }

    if (value + maxPos < lensSize) {
      value = lensSize - maxPos;
    }

    return value;
  };

  var getPercent = function (value, size) {
    return value / size * 100;
  };

  var checkRange = function (value, min, max) {
    if (value < min) {
      value = min;
    }

    if (value > max) {
      value = max;
    }

    return value;
  };

  var calcScale = function (baseSize, currentSize) {
    return currentSize / baseSize;
  };

  var getLevels = function (minSize, maxSize) {
    var levelsNumber = Math.max(1, Math.round(Math.log(Math.max(maxSize.width / minSize.width, maxSize.height / minSize.height)) / Math.LN2));
    var levelWidth = maxSize.width;
    var levelHeight = maxSize.height;
    var result = [];

    while (levelsNumber > 0) {
      levelsNumber -= 1;
      result.push({
        width: levelWidth,
        height: levelHeight
      });
      levelWidth = parseInt(levelWidth / 2, 10);
      levelHeight = parseInt(levelHeight / 2, 10);
    }

    return result;
  };
  /* eslint-env es6 */

  /* global EventEmitter */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint class-methods-use-this: ["off", { "_setItemClass": ["error"] }] */

  /* start-removable-tile-helper-block */
  // eslint-disable-next-line no-unused-vars


  var ZoomHelper = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(ZoomHelper, _EventEmitter);

    function ZoomHelper(options) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.o = $J.extend({
        maxTileSize: 15,
        minTileSize: 5
      }, options || {});
      _this.inDoc = false;
      _this.container = $J.$new('div').addClass('zoom-helper');
      _this.header = $J.$new('div').addClass('z-helper-head');
      _this.zoom = $J.$new('span').addClass('z-zoom');
      _this.tileSize = {
        width: 0,
        height: 0
      };
      _this.levels = {};
      return _this;
    }

    var _proto = ZoomHelper.prototype;

    _proto._createHead = function _createHead() {
      var tmp = $J.$new('div');
      tmp.innerHTML = 'Zoom: ';
      tmp.append(this.zoom);
      this.setZoom(0);
      this.header.append(tmp);
      tmp = $J.$new('div');
      tmp.innerHTML = '<div class="z-status z-canceled-color"></div> - canceled';
      this.header.append(tmp);
      tmp = $J.$new('div');
      tmp.innerHTML = '<div class="z-status z-loading-color"></div> - loading';
      this.header.append(tmp);
      tmp = $J.$new('div');
      tmp.innerHTML = '<div class="z-status z-loaded-color"></div> - loaded';
      this.header.append(tmp);
    };

    _proto._calcSizeOfTile = function _calcSizeOfTile(levelSize) {
      var _this2 = this;

      var getSize = function (sizeOfPart, aspectRatio) {
        var result = parseInt(sizeOfPart * aspectRatio, 10);

        if (result < _this2.o.minTileSize) {
          result = _this2.o.minTileSize;
        }

        return result;
      };

      var w;
      var h;

      if (levelSize.width > levelSize.height) {
        w = this.o.maxTileSize;
        h = getSize(w, levelSize.height / levelSize.width);
      } else {
        h = this.o.maxTileSize;
        w = getSize(h, levelSize.width / levelSize.height);
      }

      return {
        width: w,
        height: h
      };
    };

    _proto._createTile = function _createTile(c, r, options) {
      var getSize = function (isLast, size) {
        return isLast ? function () {
          var s = parseInt(size / 2, 10);

          if (s < 3) {
            s = 3;
          }

          return s;
        }() : size;
      };

      var checkSize = function (l, t) {
        return l % t < t / 2;
      };

      var w = getSize(options.cols - 1 === c && checkSize(options.levelSize.width, options.tileSize.width), this.tileSize.width);
      var h = getSize(options.rows - 1 === r && checkSize(options.levelSize.height, options.tileSize.height), this.tileSize.height);
      var node = $J.$new('div').addClass('z-tile');
      node.setCss({
        top: r * this.tileSize.height + 'px',
        left: c * this.tileSize.width + 'px',
        width: w + 'px',
        height: h + 'px'
      });
      return {
        currentClass: null,
        width: w,
        height: h,
        col: c,
        row: r,
        node: node
      };
    };

    _proto._show = function _show(level) {
      if (!level) {
        return;
      }

      if (!this.inDoc) {
        this.inDoc = true;

        this._createHead();

        this.container.append(this.header);
        $($J.D.node.body).append(this.container);
      }

      if (!level.inDoc) {
        level.inDoc = true;
        this.container.append(level.node);
        this.container.setCssProp('max-height', $J.W.innerHeight - 55 + 'px');
      }
    };

    _proto._setItemClass = function _setItemClass(level, col, row, _class) {
      var tile = level.tiles[row][col];

      if (tile.currentClass !== _class) {
        if (tile.currentClass) {
          tile.node.removeClass(tile.currentClass);
        }

        tile.currentClass = _class;
        tile.node.addClass(_class);
      }
    };

    _proto.setZoom = function setZoom(zoom) {
      // zoom = zoom + '';
      zoom += '';

      if (zoom.length < 2) {
        zoom += '.0';
      }

      this.zoom.innerHTML = zoom;
    };

    _proto.createLevel = function createLevel(options) {
      var _this3 = this;

      var node = $J.$new('div').addClass('z-level');
      var body = $J.$new('div').addClass('z-body');

      var createTiles = function (cols, rows) {
        var i;
        var j;
        var arr = [];

        for (j = 0; j < rows; j++) {
          var arr2 = [];

          for (i = 0; i < cols; i++) {
            var tile = _this3._createTile(i, j, options);

            body.append(tile.node);
            arr2.push(tile);
          }

          arr.push(arr2);
        }

        return arr;
      };

      var head = $J.$new('div').addClass('z-head');
      var statusContainer = $J.$new('div').addClass('z-status');
      var tmp = $J.$new('div');
      tmp.innerHTML = 'Level: ' + options.level;
      head.append(tmp);
      tmp = $J.$new('div');
      tmp.innerHTML = 'Shown:';
      tmp.append(statusContainer);
      head.append(tmp);
      tmp = $J.$new('div');
      tmp.innerHTML = options.levelSize.width + 'x' + options.levelSize.height;
      head.append(tmp);
      node.append(head);
      node.append(body);

      if (!this.tileSize.width) {
        this.tileSize = this._calcSizeOfTile(options.levelSize);
      }

      var tiles = createTiles(options.cols, options.rows);
      var last = tiles[options.rows - 1][options.cols - 1];
      body.setCss({
        width: (options.cols - 1) * this.tileSize.width + last.width + 'px',
        height: (options.rows - 1) * this.tileSize.height + last.height + 'px'
      });
      this.levels[options.level] = {
        inDoc: false,
        number: options.level,
        status: statusContainer,
        node: node,
        head: head,
        body: body,
        tiles: tiles
      }; // this._show(this.levels[options.level]);
    };

    _proto.tileAction = function tileAction(data) {
      var level = this.levels[data.level + ''];

      var _class;

      switch (data.type) {
        case 0:
          // canceled
          _class = 'z-canceled-color';
          break;

        case 1:
          // loading
          _class = 'z-loading-color';
          break;

        case 2:
          // loaded
          _class = 'z-loaded-color';
          break;
        // no default
      }

      this._setItemClass(level, data.col, data.row, _class);
    };

    _proto.setLevelState = function setLevelState(levelID, value) {
      var level = this.levels[levelID + ''];
      var _class = 'shown';

      if (value) {
        if (level.inDoc) {
          level.status.addClass(_class);
        }
      } else {
        level.status.removeClass(_class);
      }
    };

    _proto.setData = function setData(data) {
      var level;

      if ($J.defined(data.level)) {
        level = this.levels[data.level + ''];
      }

      if (level) {
        this._show(level);
      }

      if (data.zoom) {
        this.setZoom(data.zoom);
      }

      if (level) {
        if ('col' in data) {
          this._setItemClass(level, data.col, data.row, 'z-loaded-color');
        }
      }

      if (level && $J.defined(data.levelStatus)) {
        this.setLevelState(data.level, data.levelStatus);
      }
    };

    _proto.destroy = function destroy() {
      if (this.inDoc) {
        this.inDoc = false;
        this.zoom.remove();
        this.zoom.inneHTML = '';
        this.header.remove();
        this.header.inneHTML = '';
        this.container.remove();
        this.container.inneHTML = '';
        this.levels = {};
        this.tileSize = {
          width: 0,
          height: 0
        };
      }

      _EventEmitter.prototype.destroy.call(this);
    };

    return ZoomHelper;
  }(EventEmitter);
  /* end-removable-tile-helper-block */


  var DeepZoom = function () {
    /* eslint-env es6 */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars
    var Camera = /*#__PURE__*/function () {
      "use strict";

      function Camera(options) {
        this.isInner = options.inner; // lengthOfRow

        this.rows = options.lengthOfRow; // lengthOfColumn

        this.cols = options.lengthOfColumn;
        this.size = {
          width: options.cameraWidth,
          height: options.cameraHeight
        }; // baseMapSize

        this.bMapS = {
          width: options.mapWidth,
          height: options.mapHeight
        }; // baseTileSize

        this.bTileS = {
          width: options.tileWidth,
          height: options.tileHeight
        }; // baseScale

        this.bScale = {
          x: options.scaleX,
          y: options.scaleY
        }; // mapSize

        this.mapS = {
          width: this.bMapS.width,
          height: this.bMapS.height
        }; // tileSize

        this.tileS = {
          width: this.bTileS.width,
          height: this.bTileS.height
        };
        this.baseLastTileSize = {
          width: this.bMapS.width - (this.cols - 1) * this.bTileS.width,
          height: this.bMapS.height - (this.rows - 1) * this.bTileS.height
        };
        this.lastTileSize = {
          width: this.baseLastTileSize.width,
          height: this.baseLastTileSize.height
        };
        this.position = {
          x: 0,
          y: 0
        };
        this.lastCorrectionPosition = {
          x: 0,
          y: 0
        };
        this.scale = {
          x: 0,
          y: 0
        };
        this.lastScale = 0;
        this.lastGlobaslScale = 0;
        this.count = {
          x: 0,
          y: 0
        };
        this.calcCount();
        this.shownTiles = {
          startX: 0,
          countX: this.count.x,
          startY: 0,
          countY: this.count.y
        };
      }

      Camera.getTileIndex = function getTileIndex(position, tileSize) {
        return Math.floor(position / tileSize);
      };

      Camera.getTileSize = function getTileSize(size, scale) {
        return size * scale;
      };

      var _proto2 = Camera.prototype;

      _proto2.checkTile = function checkTile(x, y) {
        var st = this.shownTiles;
        return st.startX <= x && st.startY <= y && st.startX + st.countX > x && st.startY + st.countY > y;
      };

      _proto2.calcCount = function calcCount() {
        this.count = {
          x: Math.ceil(this.size.width / this.tileS.width) + 1,
          y: Math.ceil(this.size.height / this.tileS.height) + 1
        };
      };

      _proto2.findShownTiles = function findShownTiles() {
        var p = this.position;
        var ts = this.tileS;
        var startX = 0;
        var startY = 0;
        var countX = this.count.x;
        var countY = this.count.y;

        if (p.x < 0) {
          startX = Camera.getTileIndex(Math.abs(p.x), ts.width);
        }

        if (p.y < 0) {
          startY = Camera.getTileIndex(Math.abs(p.y), ts.height);
        }

        if (startX + countX > this.cols) {
          countX = this.cols - startX;
        }

        if (startY + countY > this.rows) {
          countY = this.rows - startY;
        }

        this.shownTiles = {
          startX: startX,
          countX: countX,
          startY: startY,
          countY: countY
        };
      };

      _proto2.calcTileSize = function calcTileSize() {
        this.tileS.width = Camera.getTileSize(this.bTileS.width, this.scale.x);
        this.tileS.height = Camera.getTileSize(this.bTileS.height, this.scale.y);
        this.lastTileSize.width = Camera.getTileSize(this.baseLastTileSize.width, this.scale.x);
        this.lastTileSize.height = Camera.getTileSize(this.baseLastTileSize.height, this.scale.y);
      };

      _proto2.calcData = function calcData(position) {
        if (this.lastScale !== this.scale.x) {
          this.calcTileSize();
          this.calcCount();
          this.mapS.width = this.tileS.width * (this.cols - 1) + this.lastTileSize.width;
          this.mapS.height = this.tileS.height * (this.rows - 1) + this.lastTileSize.height;
          this.lastCorrectionPosition.x = (this.bMapS.width * this.bScale.x - this.mapS.width) / 2;
          this.lastCorrectionPosition.y = (this.bMapS.height * this.bScale.y - this.mapS.height) / 2;
          this.lastScale = this.scale.x;
        }

        this.position.x = position.x + this.lastCorrectionPosition.x;
        this.position.y = position.y + this.lastCorrectionPosition.y;
      };

      _proto2.setScale = function setScale(scale) {
        this.lastScale = this.scale.x;
        this.scale.x = scale.x * this.bScale.x;
        this.scale.y = scale.y * this.bScale.y;
      };

      _proto2.action = function action(position, scale) {
        if (this.lastGlobaslScale !== scale.x) {
          this.setScale(scale);
          this.lastGlobaslScale = scale.x;
        }

        this.calcData(position);
        this.findShownTiles();
      };

      _proto2.resize = function resize(viewPort) {
        this.size.width = viewPort.width;
        this.size.height = viewPort.height;
        this.calcCount();
        this.findShownTiles();
      };

      _proto2.setMapS = function setMapS(width, height) {
        if (width !== null && width !== undefined) {
          this.mapS.width = width;
        }

        if (height !== null && height !== undefined) {
          this.mapS.height = height;
        }
      };

      _proto2.getShownTiles = function getShownTiles() {
        return this.shownTiles;
      };

      _proto2.getMapS = function getMapS() {
        return this.mapS;
      };

      _proto2.destroy = function destroy() {
        this.shownTiles = $([]);
      };

      return Camera;
    }();
    /* eslint-env es6 */

    /* global Map */

    /* global EventEmitter */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


    var TILE_STATES = {
      NOT_LOADED: 0,
      LOADING: 1,
      LOADED: 2
    }; // eslint-disable-next-line no-unused-vars

    var Tile = /*#__PURE__*/function (_EventEmitter2) {
      "use strict";

      bHelpers.inheritsLoose(Tile, _EventEmitter2);

      function Tile(options) {
        var _this4;

        _this4 = _EventEmitter2.call(this) || this;
        _this4.id = options.id;
        _this4.index = {
          x: options.indexX,
          y: options.indexY
        };
        _this4.position = {
          x: options.x,
          y: options.y
        };
        _this4.size = {
          width: options.width,
          height: options.height
        };
        _this4.storage = options.storage;
        _this4.state = TILE_STATES.NOT_LOADED;
        _this4.node = null;

        if (_this4.storage.has(_this4.id)) {
          _this4.node = _this4.storage.get(_this4.id);
          _this4.state = TILE_STATES.LOADED;
        }

        return _this4;
      }

      var _proto3 = Tile.prototype;

      _proto3.isLoaded = function isLoaded() {
        return this.state === TILE_STATES.LOADED;
      };

      _proto3.addImageToStorage = function addImageToStorage() {
        if (!this.storage.has(this.id)) {
          this.storage.set(this.id, this.node);
        }
      };

      _proto3.load = function load() {
        if (this.state === TILE_STATES.NOT_LOADED) {
          this.state = TILE_STATES.LOADING;
          this.emit('getTile', {
            data: {
              indexX: this.index.x,
              indexY: this.index.y,
              number: this.id
            }
          });
        }
      };

      _proto3.cancelLoading = function cancelLoading() {
        if (this.state === TILE_STATES.LOADING) {
          this.state = TILE_STATES.NOT_LOADED;
          this.emit('zoomCancelLoadingOfTiles', {
            data: {
              indexX: this.index.x,
              indexY: this.index.y,
              number: this.id
            }
          });
        }
      };

      _proto3.setImage = function setImage(node) {
        if (this.state !== TILE_STATES.LOADED) {
          this.state = TILE_STATES.LOADED;
          this.node = $(node);
          this.addImageToStorage();
        }
      };

      _proto3.destroy = function destroy() {
        this.cancelLoading();
        this.storage = null;

        _EventEmitter2.prototype.destroy.call(this);
      };

      return Tile;
    }(EventEmitter);
    /* eslint-env es6 */
    // eslint-disable-next-line no-unused-vars


    var LevelView = /*#__PURE__*/function () {
      "use strict";

      function LevelView(parent, dppx) {
        this.p = $(parent);
        this.dppx = dppx; // wrapper

        this.w = $J.$new('div');
        this.cvs = $J.$new('canvas');
        this.ctx = this.cvs.node.getContext('2d');
        this.w.append(this.cvs);
      }

      var _proto4 = LevelView.prototype;

      _proto4.setIndex = function setIndex(index) {
        this.w.addClass('deepzoom-level-' + index);
        this.w.attr('z-index' + (index + 1));
      };

      _proto4.append = function append() {
        this.p.append(this.w);
      };

      _proto4.show = function show() {
        this.w.setCssProp('display', '');
      };

      _proto4.hide = function hide() {
        this.w.setCssProp('display', 'none');
      };

      _proto4.clear = function clear() {
        this.ctx.clearRect(0, 0, this.cvs.node.width, this.cvs.node.height);
      };

      _proto4.draw = function draw(scale, moveX, moveY) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.clear();
        this.ctx.setTransform(scale.x, 0, 0, scale.y, moveX, moveY);
      };

      _proto4.drawTile = function drawTile(tileNode, tileSize, tilePosition) {
        if ($J.browser.uaName === 'edge' || $J.browser.uaName === 'ie') {
          if (this.dppx > 1) {
            this.ctx.drawImage(tileNode.node, 0, 0, tileSize.width, tileSize.height, tilePosition.x, tilePosition.y, tileSize.width, tileSize.height);
          } else {
            this.ctx.drawImage(tileNode.node, tilePosition.x, tilePosition.y, tileSize.width, tileSize.height);
          }
        } else {
          this.ctx.drawImage(tileNode.node, 0, 0, tileSize.width, tileSize.height, tilePosition.x, tilePosition.y, tileSize.width, tileSize.height);
        }
      };

      _proto4.setCanvasSize = function setCanvasSize(width, height) {
        this.cvs.setCss({
          width: width,
          height: height
        });
        this.cvs.attr('width', width * this.dppx);
        this.cvs.attr('height', height * this.dppx);
      };

      _proto4.destroy = function destroy() {
        this.cvs.remove();
        this.w.remove();
      };

      return LevelView;
    }();
    /* eslint-env es6 */

    /* global Map, Camera, Tile, zoomHelper, EventEmitter */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


    var TILES_HASH_STORAGE = new Map();

    var getCorrectedTileSize = function (value, dppx) {
      // return value * ((1 - (dppx - 1)) || 1);
      // dppx -= 1;
      // if (dppx <= 0) { dppx = 1; }
      // return value * dppx;
      return value / dppx;
    }; // eslint-disable-next-line no-unused-vars


    var Level = /*#__PURE__*/function (_EventEmitter3) {
      "use strict";

      bHelpers.inheritsLoose(Level, _EventEmitter3);

      function Level(view, options) {
        var _this5;

        _this5 = _EventEmitter3.call(this) || this;
        _this5.view = view;
        _this5.id = options.id; // number of level

        _this5.dppx = options.dppx;
        _this5.size = {
          width: options.width,
          height: options.height
        }; // size of level image
        // maxSize

        _this5.mSize = {
          width: options.maxWidth,
          height: options.maxHeight
        }; // size of biggest image
        // tileSize

        _this5.tSize = {
          width: options.tileWidth,
          height: options.tileHeight
        };
        _this5.tileImageSize = {
          width: options.tileImageWidth,
          height: options.tileImageHeight
        };
        _this5.layerSize = {
          width: options.layerWidth,
          height: options.layerHeight
        };
        _this5.hash = options.hash + '-' + (_this5.size.width + 'x' + _this5.size.height);

        if (!TILES_HASH_STORAGE.has(_this5.hash)) {
          TILES_HASH_STORAGE.set(_this5.hash, new Map());
        }

        _this5.scaleFactor = {
          x: (_this5.mSize.width - _this5.size.width) / _this5.size.width + 1,
          y: (_this5.mSize.height - _this5.size.height) / _this5.size.height + 1
        };
        _this5.maxDisplayedSize = {
          width: options.maxDisplayedWidth,
          height: options.maxDisplayedHeight
        };
        _this5.minDisplayedSize = {
          width: options.minDisplayedWidth,
          height: options.minDisplayedHeight
        };
        _this5.globalScale = {
          x: 1,
          y: 1
        };
        _this5.globalPosition = {
          x: 0,
          y: 0
        };

        _this5.view.setIndex(_this5.id);

        _this5.setLensSize(options.viewPortWidth, options.viewPortHeight);

        _this5.isAdded = false;
        _this5.isShown = false;
        _this5.tiles = _this5.calcTiles();
        _this5.countOfTiles = _this5.tiles.length * _this5.tiles[0].length;
        _this5.loadedTiles = 0;
        _this5.camera = new Camera({
          inner: options.inner,
          scaleX: _this5.scaleFactor.x,
          scaleY: _this5.scaleFactor.y,
          cameraWidth: options.viewPortWidth,
          cameraHeight: options.viewPortHeight,
          mapWidth: _this5.size.width,
          mapHeight: _this5.size.height,
          tileWidth: getCorrectedTileSize(_this5.tileImageSize.width, _this5.dppx),
          tileHeight: getCorrectedTileSize(_this5.tileImageSize.height, _this5.dppx),
          lengthOfRow: _this5.tiles.length,
          lengthOfColumn: _this5.tiles[0].length
        });
        /* start-removable-tile-helper-block */

        if (zoomHelper) {
          zoomHelper.createLevel({
            level: _this5.id,
            cols: _this5.tiles[0].length,
            rows: _this5.tiles.length,
            levelSize: {
              width: _this5.size.width,
              height: _this5.size.height
            },
            tileSize: {
              width: _this5.tileImageSize.width,
              height: _this5.tileImageSize.height
            }
          });
        }
        /* end-removable-tile-helper-block */


        return _this5;
      }

      var _proto5 = Level.prototype;

      _proto5.setEvents = function setEvents() {
        var _this6 = this;

        var ts = this.tileImageSize;
        this.on('getTile', function (e) {
          e.data.width = _this6.size.width;
          e.data.height = _this6.size.height;
          e.data.level = _this6.id;
          e.data.imageSettings = {
            tile: {
              width: ts.width,
              height: ts.height,
              number: e.data.number
            }
          };

          if (_this6.dppx > 1) {
            e.data.dppx = _this6.dppx;
          }
          /* start-removable-tile-helper-block */


          if (zoomHelper) {
            zoomHelper.tileAction({
              level: _this6.id,
              col: e.data.indexX,
              row: e.data.indexY,
              type: 1
            });
          }
          /* end-removable-tile-helper-block */

        });
        this.on('zoomCancelLoadingOfTiles', function (e) {
          e.data.width = _this6.size.width;
          e.data.height = _this6.size.height;
          e.data.imageSettings = {
            tile: {
              width: ts.width,
              height: ts.height,
              number: e.data.number
            }
          };
          /* start-removable-tile-helper-block */

          if (zoomHelper) {
            zoomHelper.tileAction({
              level: _this6.id,
              col: e.data.indexX,
              row: e.data.indexY,
              type: 0
            });
          }
          /* end-removable-tile-helper-block */

        });
      };

      _proto5.cancelLoadingOfTiles = function cancelLoadingOfTiles() {
        this.tiles.forEach(function (row) {
          row.forEach(function (tile) {
            tile.cancelLoading();
          });
        });
      };

      _proto5.setImage = function setImage(imageData) {
        var tile = this.tiles[imageData.indexY][imageData.indexX];

        if (!tile.isLoaded()) {
          this.loadedTiles += 1;
        }

        tile.setImage(imageData.node);

        if (this.isShown && this.camera.checkTile(imageData.indexX, imageData.indexY)) {
          this.drawTile(tile);
        }
        /* start-removable-tile-helper-block */


        if (zoomHelper) {
          zoomHelper.setData({
            level: this.id,
            col: imageData.indexX,
            row: imageData.indexY
          });
        }
        /* end-removable-tile-helper-block */

      };

      _proto5.append = function append() {
        if (!this.isAdded && this.isShown) {
          this.isAdded = true;
          this.setEvents();
          this.view.append();
        }
      };

      _proto5.calcTiles = function calcTiles() {
        var result = [];
        var ts = this.tileImageSize;
        var l1 = Math.ceil(this.layerSize.width / ts.width);
        var l2 = Math.ceil(this.layerSize.height / ts.height);

        for (var j = 0; j < l2; j++) {
          var arr = $([]);

          for (var i = 0; i < l1; i++) {
            var tile = new Tile({
              y: j * ts.height,
              x: i * ts.width,
              indexX: i,
              indexY: j,
              id: j * l1 + i,
              width: i !== l1 - 1 ? ts.width : this.layerSize.width - i * ts.width,
              height: j !== l2 - 1 ? ts.height : this.layerSize.height - j * ts.height,
              storage: TILES_HASH_STORAGE.get(this.hash)
            });
            tile.setParent(this);
            arr.push(tile);
          }

          result.push(arr);
        }

        return result;
      };

      _proto5.correctDPPXPosition = function correctDPPXPosition(pos, lensSize, imageSize) {
        var result = pos;

        if (this.dppx > 1) {
          var center = lensSize / 2;
          result = Math.abs(pos - center) / (imageSize / 100);
          result = center * this.dppx - imageSize * this.dppx / 100 * result;
        }

        return result;
      };

      _proto5.draw = function draw() {
        var _this7 = this;

        var c = this.camera;

        if (this.isShown) {
          this.view.draw(c.scale, this.correctDPPXPosition(c.position.x, c.size.width, c.mapS.width), this.correctDPPXPosition(c.position.y, c.size.height, c.mapS.height));
          this.eachTile(function (tile) {
            _this7.drawTile(tile);
          });
        }
      };

      _proto5.drawTile = function drawTile(tile) {
        if (tile && tile.isLoaded()) {
          this.view.drawTile(tile.node, tile.size, tile.position);
        }
      };

      _proto5.eachTile = function eachTile(callback) {
        var st = this.camera.getShownTiles();

        for (var y = 0, l = st.countY; y < l; y++) {
          for (var x = 0, l2 = st.countX; x < l2; x++) {
            callback(this.tiles[st.startY + y][st.startX + x]);
          }
        }
      };

      _proto5.checkSize = function checkSize() {
        var last = this.isShown;
        var mapSize = this.camera.getMapS();
        var v1 = mapSize.width <= this.maxDisplayedSize.width;
        var v2 = mapSize.height <= this.maxDisplayedSize.height;
        var v3 = mapSize.width > this.minDisplayedSize.width;
        var v4 = mapSize.height > this.minDisplayedSize.height;
        this.isShown = v1 && v2 && v3 && v4;

        if (last !== this.isShown) {
          if (this.isShown) {
            this.view.show();
          } else {
            this.view.hide();
          }

          if (!this.isShown) {
            this.cancelLoadingOfTiles();
          }
        }
      };

      _proto5.action = function action(position, scale) {
        this.globalPosition.x = position.x;
        this.globalPosition.y = position.y;
        this.globalScale.x = scale.x;
        this.globalScale.y = scale.y;
        this.camera.action(this.globalPosition, this.globalScale);

        if (this.camera.getMapS().width > this.mSize.width || this.camera.getMapS().height > this.mSize.height) {
          this.camera.setMapS(this.mSize.width, this.mSize.height);
        }

        this.checkSize();
        this.append();
        this.draw();
        /* start-removable-tile-helper-block */

        if (zoomHelper) {
          zoomHelper.setData({
            level: this.id,
            levelStatus: this.isShown
          });
        }
        /* end-removable-tile-helper-block */

      };

      _proto5.loadImages = function loadImages() {
        if (this.isShown && this.loadedTiles !== this.countOfTiles) {
          this.eachTile(function (tile) {
            tile.load();
          });
        }
      };

      _proto5.setLensSize = function setLensSize(width, height) {
        this.view.setCanvasSize(width, height);
      };

      _proto5.resize = function resize(cameraSize) {
        this.setLensSize(cameraSize.width, cameraSize.height);
        this.camera.resize(cameraSize);
        this.action(this.globalPosition, this.globalScale);
      };

      _proto5.destroy = function destroy() {
        this.off('getTile');
        this.off('zoomCancelLoadingOfTiles');
        this.isShown = false;
        this.camera.destroy();
        this.tiles.forEach(function (row) {
          row.forEach(function (tile) {
            tile.destroy();
          });
        });

        _EventEmitter3.prototype.destroy.call(this);
      };

      return Level;
    }(EventEmitter);
    /* eslint-env es6 */

    /* global Level */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars


    var ZoomView = /*#__PURE__*/function () {
      "use strict";

      function ZoomView(parentNode, classPrefix) {
        this.p = $(parentNode); // container

        this.c = $J.$new('div');
        this.c.addClass(classPrefix + '-deepzoom');
      }

      var _proto6 = ZoomView.prototype;

      _proto6.getContainer = function getContainer() {
        return this.c;
      };

      _proto6.show = function show() {
        this.p.append(this.c);
      };

      _proto6.hide = function hide() {
        this.c.remove();
      };

      _proto6.destroy = function destroy() {
        this.c.remove();
        this.c = null;
      };

      return ZoomView;
    }();
    /* eslint-env es6 */

    /* global Level, getPercentValue, zoomHelper, EventEmitter, helper, LevelView, calcScale, getLevels */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars


    var ZoomController = /*#__PURE__*/function (_EventEmitter4) {
      "use strict";

      bHelpers.inheritsLoose(ZoomController, _EventEmitter4);

      function ZoomController(view, options) {
        var _this8;

        _this8 = _EventEmitter4.call(this) || this;
        _this8.view = view;
        _this8.options = $J.extend({
          tiles: true,
          inner: true,
          tileSize: {
            width: 256,
            height: 256
          },
          minZoomFactor: 100,
          // px
          upscale: false
        }, options);
        _this8.hash = null;

        _this8.setDefaultVars();

        return _this8;
      }

      ZoomController.convertScaleToSize = function convertScaleToSize(size, scale) {
        return {
          width: helper.round(size.width * scale.x, 2),
          height: helper.round(size.height * scale.y, 2)
        };
      };

      var _proto7 = ZoomController.prototype;

      _proto7.setHash = function setHash(url) {
        // this.hash = '' + $J.getHashCode(url.split('?')[0]);
        this.hash = '' + $J.getHashCode(url);
      } // private
      ;

      _proto7.setDefaultVars = function setDefaultVars() {
        var _this9 = this;

        this.isShown = false;
        this.originSize = {
          width: 0,
          height: 0
        };
        this.maxSize = {
          width: 0,
          height: 0
        };
        this.minSize = {
          width: 0,
          height: 0
        };
        this.lensSize = {
          width: 0,
          height: 0
        };
        this.currentSize = {
          width: 0,
          height: 0
        };
        this.levels = $([]);
        this.on('getTile', function (e) {
          if (!_this9.options.tiles) {
            delete e.data.imageSettings.tile;
            delete e.data.number;
          }
        });
      } // private
      ;

      _proto7.createLevels = function createLevels() {
        var calcTileImageSize = function (value, dppx) {
          return dppx < 1.5 ? value : value * $J.DPPX;
        };

        var maxSize = this.maxSize;
        var minSize = this.minSize;

        if (!this.levels.length && maxSize.width - minSize.width > this.options.minZoomFactor) {
          var arr = [];

          if (this.options.inner) {
            arr = getLevels(minSize, maxSize, this.options.inner);
          } else {
            arr.push({
              width: maxSize.width,
              height: maxSize.height
            });
          }

          var tileSize = this.options.tileSize;

          for (var i = 0, l = arr.length; i < l; i++) {
            if (!this.options.tiles) {
              tileSize = arr[i];
            }

            var _minSize = i + 1 < l - 1 ? arr[i + 1] : minSize;

            var _maxSize = i - 1 >= 0 ? arr[i - 1] : maxSize;

            var dppx = helper.getDPPX(arr[i].width, this.originSize.width, this.options.upscale);
            var levelView = new LevelView(this.view.getContainer(), dppx);

            var _level = new Level(levelView, {
              id: l - i,
              hash: this.hash,
              dppx: dppx,
              inner: this.options.inner,
              width: arr[i].width,
              height: arr[i].height,
              maxWidth: this.maxSize.width,
              maxHeight: this.maxSize.height,
              layerWidth: Math.round(arr[i].width * dppx),
              layerHeight: Math.round(arr[i].height * dppx),
              maxDisplayedWidth: arr[i].width + getPercentValue(_maxSize.width - arr[i].width, 50),
              maxDisplayedHeight: arr[i].height + getPercentValue(_maxSize.height - arr[i].height, 50),
              minDisplayedWidth: _minSize.width + getPercentValue(arr[i].width - _minSize.width, 50),
              minDisplayedHeight: _minSize.height + getPercentValue(arr[i].height - _minSize.height, 50),
              tileWidth: tileSize.width,
              tileHeight: tileSize.height,
              tileImageWidth: calcTileImageSize(tileSize.width, dppx),
              tileImageHeight: calcTileImageSize(tileSize.height, dppx),
              viewPortWidth: this.lensSize.width,
              viewPortHeight: this.lensSize.height
            });

            _level.setParent(this);

            this.levels.push({
              view: levelView,
              controller: _level
            });
          }

          this.levels.reverse();
        }
      };

      _proto7.getCurrentShownLevel = function getCurrentShownLevel() {
        var result = null;
        var l = this.levels.length;

        if (this.isShown) {
          for (var i = l - 1; i >= 0; i--) {
            if (this.levels[i].controller.isShown) {
              result = this.levels[i].controller;
              break;
            }
          }
        }

        return result;
      };

      _proto7.getScale = function getScale(direction) {
        var level = this.getCurrentShownLevel();
        var scale;
        var l = this.levels.length;

        switch (direction) {
          case 'zoomin':
            if (level) {
              if (this.currentSize.width < level.size.width) {
                scale = calcScale(this.maxSize.width, level.size.width);
              } else if (level.id !== l) {
                scale = calcScale(this.maxSize.width, this.levels[level.id].controller.size.width);
              } else {
                scale = calcScale(this.maxSize.width, this.levels[l - 1].controller.size.width);
              }
            } else {
              scale = calcScale(this.maxSize.width, this.levels[0].controller.size.width);
            }

            break;

          case 'zoomout':
            if (level) {
              if (this.currentSize.width > level.size.width) {
                scale = calcScale(this.maxSize.width, level.size.width);
              } else if (level.id > 1) {
                scale = calcScale(this.maxSize.width, this.levels[level.id - 2].controller.size.width);
              } else {
                scale = calcScale(this.maxSize.width, this.minSize.width);
              }
            } else {
              scale = calcScale(this.maxSize.width, this.minSize.width);
            }

            break;
          // no default
        }

        return scale;
      };

      _proto7.show = function show() {
        if (!this.isShown) {
          this.isShown = true;
          this.view.show();
        }

        return this;
      };

      _proto7.hide = function hide() {
        if (this.isShown) {
          this.isShown = false;
          this.view.hide();
          this.levels.forEach(function (level) {
            level.view.destroy();
            level.controller.destroy();
          });
          this.setDefaultVars();
        }

        return this;
      };

      _proto7.action = function action(position, scale) {
        if (this.isShown) {
          this.currentSize = ZoomController.convertScaleToSize(this.maxSize, scale);
          this.levels.forEach(function (level) {
            level.controller.action(position, scale);
          });
          /* start-removable-tile-helper-block */

          if (zoomHelper) {
            zoomHelper.setData({
              zoom: helper.round(this.currentSize.width / this.minSize.width, 1, this.currentSize.width === this.maxSize.width)
            });
          }
          /* end-removable-tile-helper-block */

        }

        return this;
      };

      _proto7.setLensSize = function setLensSize(width, height) {
        this.lensSize.width = width;
        this.lensSize.height = height;
        return this;
      };

      _proto7.setMinSize = function setMinSize(width, height) {
        this.minSize.width = width;
        this.minSize.height = height;
        return this;
      };

      _proto7.setMaxSize = function setMaxSize(width, height, originWidth, originHeight) {
        this.maxSize.width = width;
        this.maxSize.height = height;
        this.originSize.width = originWidth;
        this.originSize.height = originHeight;
        this.createLevels();
        return this;
      };

      _proto7.loadImages = function loadImages() {
        if (this.isShown) {
          this.levels.forEach(function (level) {
            level.controller.loadImages();
          });
        }

        return this;
      };

      _proto7.setImage = function setImage(data) {
        if (this.isShown) {
          this.levels[data.level - 1].controller.setImage(data);
        }

        return this;
      };

      _proto7.resize = function resize() {
        var _this10 = this;

        if (this.isShown) {
          this.levels.forEach(function (level) {
            level.controller.resize(_this10.lensSize);
          });
        }

        return this;
      };

      _proto7.destroy = function destroy() {
        this.hide();
        this.off('getTile');
        this.off('zoomCancelLoadingOfTiles');

        _EventEmitter4.prototype.destroy.call(this);
      };

      return ZoomController;
    }(EventEmitter);
    /* eslint-env es6 */

    /* global EventEmitter */

    /* global ZoomView */

    /* global ZoomController */

    /* eslint-disable indent */

    /* eslint-disable no-lonely-if */

    /* eslint no-unused-vars: ["error", { "args": "none" }] */

    /* eslint guard-for-in: "off"*/

    /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars


    var DZoom = /*#__PURE__*/function (_EventEmitter5) {
      "use strict";

      bHelpers.inheritsLoose(DZoom, _EventEmitter5);

      function DZoom(parentNode, options) {
        var _this11;

        _this11 = _EventEmitter5.call(this) || this;
        _this11.view = new ZoomView(parentNode, 'sirv');
        _this11.controller = new ZoomController(_this11.view, options);

        _this11.controller.setParent(bHelpers.assertThisInitialized(_this11));

        return _this11;
      }

      var _proto8 = DZoom.prototype;

      _proto8.setLensSize = function setLensSize(width, height) {
        this.controller.setLensSize(width, height);
        return this;
      };

      _proto8.loadImages = function loadImages() {
        this.controller.loadImages();
        return this;
      };

      _proto8.getScale = function getScale(direction) {
        return this.controller.getScale(direction);
      };

      _proto8.setImage = function setImage(data) {
        this.controller.setImage(data);
        return this;
      };

      _proto8.setHash = function setHash(hash) {
        this.controller.setHash(hash);
        return this;
      };

      _proto8.setMinSize = function setMinSize(width, height) {
        this.controller.setMinSize(width, height);
        return this;
      };

      _proto8.setMaxSize = function setMaxSize(width, height, originWidth, originHeight) {
        this.controller.setMaxSize(width, height, originWidth, originHeight);
        return this;
      };

      _proto8.show = function show() {
        this.controller.show();
        return this;
      };

      _proto8.hide = function hide() {
        this.controller.hide();
        return this;
      };

      _proto8.action = function action(imageDPosition, dScale) {
        this.controller.action(imageDPosition, dScale);
        return this;
      };

      _proto8.resize = function resize() {
        this.controller.resize();
        return this;
      };

      _proto8.destroy = function destroy() {
        this.controller.destroy();
        this.controller = null;
        this.view.destroy();
        this.view = null;

        _EventEmitter5.prototype.destroy.call(this);
      };

      return DZoom;
    }(EventEmitter);

    return DZoom;
  }();

  var Eye = function () {
    /* eslint-env es6 */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars
    var View = /*#__PURE__*/function () {
      "use strict";

      function View(parent, hover) {
        this.pn = $(parent);
        var className = 'sirv-zoom-lens'; // container

        this.c = $J.$new('div');
        this.c.addClass(className + '-wrapper'); // insideContainer

        this.ic = $J.$new('div');
        this.ic.addClass(className);
        this.ic.appendTo(this.c);
        this.img = null; // blackAndWhiteImg

        this.bwImg = null;

        if (hover) {
          this.c.addEvent('mousedown', function (e) {
            e.stop();
          });
        }
      }

      var _proto9 = View.prototype;

      _proto9.setContainerPosition = function setContainerPosition() {
        if ($J.contains(['img', 'canvas'], this.pn.getTagName())) {
          var positon = this.pn.getPosition();
          var parentPosition = $(this.pn.node.parentNode).getPosition();
          this.c.setCss({
            top: positon.top - parentPosition.top,
            left: positon.left - parentPosition.left
          });
        }
      };

      _proto9.setImageSize = function setImageSize(size) {
        if (this.img) {
          // this.bwImg = $(this.img.cloneNode());
          // this.bwImg.addClass('sirv-filter-bw');
          [this.img, this.bwImg].forEach(function (img) {
            if (img) {
              img.setCss({
                top: 0,
                left: 0,
                width: size.width,
                height: size.height,
                position: 'absolute'
              });
            }
          });
        }
      };

      _proto9.getContainerSize = function getContainerSize() {
        return this.pn.getSize(); // return {
        //     width: 132,
        //     height: 200
        // };
      };

      _proto9.setContainerSize = function setContainerSize(size) {
        this.c.setCss({
          width: size.width,
          height: size.height
        });
      };

      _proto9.setInsideContainerSize = function setInsideContainerSize(size) {
        this.ic.setCss({
          width: size.width,
          height: size.height
        });
      };

      _proto9.setInsideContainerFontSize = function setInsideContainerFontSize(size) {
        this.ic.setCssProp('font-size', Math.max(size.width, size.height) + 'px');
      };

      _proto9.setTransform = function setTransform(x, y) {
        this.ic.setCssProp('transform', 'translate3d(' + x + 'px,' + y + 'px, 0px)');

        if (this.img) {
          this.img.setCssProp('transform', 'translate3d(' + x * -1 + 'px, ' + y * -1 + 'px, 0px)');
        }
      };

      _proto9.show = function show(img, size) {
        if (img) {
          this.img = $(img);
        }

        this.setContainerPosition();
        this.setImageSize(size);

        if (this.img) {
          this.ic.append(this.img); // this.pn.append(this.bwImg);
        }

        var container = this.pn;

        if ($J.contains(['img', 'canvas'], container.getTagName())) {
          container = $(container.node.parentNode);
        }

        container.append(this.c);
      };

      _proto9.hide = function hide() {
        this.c.remove();

        if (this.img) {
          this.img.remove();
          this.img = null;

          if (this.bwImg) {
            this.bwImg.remove();
            this.bwImg = null;
          }
        }
      };

      _proto9.destroy = function destroy() {
        this.c.removeEvent('mousedown');
        this.c.remove();
      };

      return View;
    }();
    /* eslint-env es6 */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


    var difference = function (a, b) {
      return Math.abs(a - b);
    };

    var getAnimationValue = function (a, b, step) {
      return (a - b) * step;
    }; // eslint-disable-next-line no-unused-vars


    var Controller = /*#__PURE__*/function () {
      "use strict";

      function Controller(view) {
        this.view = view; // parentSize

        this.pSize = {
          width: 0,
          height: 0
        };
        this.inDoc = false;
        this.timer = null;
        this.isPlaying = false;
        this.pos = {
          x: null,
          y: null
        };
        this.dPos = {
          x: null,
          y: null
        };
        this.size = {
          width: 0,
          height: 0
        };
        this.dSize = {
          width: 0,
          height: 0
        };
      } // private


      var _proto10 = Controller.prototype;

      _proto10.doAnimation = function doAnimation() {
        var result = false;
        var minSize = 0.001;

        if (difference(this.pos.x, this.dPos.x) > minSize || difference(this.pos.y, this.dPos.y) > minSize || difference(this.size.width, this.dSize.width) > minSize || difference(this.size.height, this.dSize.height) > minSize) {
          result = true;
        }

        return result;
      } // private
      ;

      _proto10.animate = function animate() {
        var _this12 = this;

        this.isPlaying = true;
        var step = 0.4;
        var dx = getAnimationValue(this.pos.x, this.dPos.x, step);
        var dy = getAnimationValue(this.pos.y, this.dPos.y, step);
        var dw = getAnimationValue(this.size.width, this.dSize.width, step);
        var dh = getAnimationValue(this.size.height, this.dSize.height, step);
        this.dPos.x += dx;
        this.dPos.y += dy;
        this.dSize.width += dw;
        this.dSize.height += dh;
        this.setCss();

        if (this.doAnimation()) {
          this.timer = setTimeout(function () {
            _this12.animate();
          }, 16);
        } else {
          this.stopAnimation();
        }
      } // private
      ;

      _proto10.setCss = function setCss() {
        var s = this.size;
        var ds = this.dSize;

        if (difference(s.width, ds.width) > 0 || difference(s.height, ds.height) > 0) {
          this.view.setInsideContainerSize(ds);
          this.view.setInsideContainerFontSize(this.pSize);
        }

        this.view.setTransform(Math.round(this.dPos.x), Math.round(this.dPos.y));
      } // private
      ;

      _proto10.stopAnimation = function stopAnimation() {
        if (this.isPlaying) {
          this.isPlaying = false;
          clearTimeout(this.timer);
          this.dPos.x = this.pos.x;
          this.dPos.y = this.pos.y;
          this.dSize.width = this.size.width;
          this.dSize.height = this.size.height;
          this.setCss();
        }
      };

      _proto10.setSize = function setSize(size) {
        this.size.width = size.width;
        this.size.height = size.height;

        if (this.inDoc && this.dPos.x !== null) {
          if (!this.isPlaying) {
            this.animate();
          }
        }
      };

      _proto10.setPosition = function setPosition(x, y) {
        var s = this.size;
        var ps = this.pSize;

        var _x = x - s.width / 2;

        var _y = y - s.height / 2;

        if (_x < 0) {
          _x = 0;
        }

        if (_y < 0) {
          _y = 0;
        }

        if (_x > ps.width - s.width) {
          _x = ps.width - s.width;
        }

        if (_y > ps.height - s.height) {
          _y = ps.height - s.height;
        }

        this.pos.x = _x;
        this.pos.y = _y;

        if (this.dPos.x === null) {
          this.dPos.x = _x;
          this.dPos.y = _y;
        }

        if (this.inDoc) {
          if (!this.isPlaying) {
            this.animate();
          }
        }
      } // private
      ;

      _proto10.setContainerSize = function setContainerSize() {
        var ps = this.view.getContainerSize();
        this.pSize = ps;
        this.view.setContainerSize(ps);
        this.view.setInsideContainerFontSize(ps);
      };

      _proto10.show = function show(img) {
        if (!this.inDoc) {
          this.inDoc = true;
          this.setContainerSize();
          this.view.show(img, this.pSize);
        }
      };

      _proto10.hide = function hide() {
        if (this.inDoc) {
          this.inDoc = false;
          this.view.hide();
          this.pos = {
            x: null,
            y: null
          };
          this.dPos = {
            x: null,
            y: null
          };
          this.size = {
            width: 0,
            height: 0
          };
          this.dSize = {
            width: 0,
            height: 0
          };
        }
      };

      _proto10.resize = function resize() {
        if (this.inDoc) {
          this.setContainerSize();
          this.view.setContainerPosition();
        }
      };

      _proto10.destroy = function destroy() {
        this.stopAnimation();
        this.inDoc = false;
      };

      return Controller;
    }();
    /* eslint-env es6 */

    /* global View */

    /* global Controller */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars


    var _Eye = /*#__PURE__*/function () {
      "use strict";

      function _Eye(prentNode, hover) {
        this.view = new View(prentNode, hover);
        this.controller = new Controller(this.view);
      }

      var _proto11 = _Eye.prototype;

      _proto11.setEventToMainContainer = function setEventToMainContainer(name, callback) {
        this.view.c.addEvent(name, callback);
      };

      _proto11.removeEventToMainContainer = function removeEventToMainContainer(name, callback) {
        if (callback) {
          this.view.c.removeEvent(name, callback);
        } else {
          this.view.c.removeEvent(name);
        }
      };

      _proto11.clearEvents = function clearEvents() {
        this.view.c.clearEvents();
      };

      _proto11.getBoundaries = function getBoundaries() {
        return this.view.c.node.getBoundingClientRect();
      };

      _proto11.show = function show(img) {
        this.controller.show(img);
      };

      _proto11.hide = function hide() {
        this.controller.hide();
      };

      _proto11.setSize = function setSize(size) {
        this.controller.setSize(size);
      };

      _proto11.setPosition = function setPosition(x, y) {
        this.controller.setPosition(x, y);
      };

      _proto11.destroy = function destroy() {
        this.controller.destroy();
        this.view.destroy();
      };

      return _Eye;
    }();

    return _Eye;
  }();

  var ZoomMap = function () {
    /* eslint-env es6 */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars
    var View = /*#__PURE__*/function () {
      "use strict";

      function View(parent) {
        this.p = $(parent);
        var className = 'sirv-zoom-map'; // container

        this.c = $J.$new('div');
        this.c.addClass(className);
        this.lens = $J.$new('div');
        this.lens.addClass(className + '-lens');
        this.img = null;
        this.b = $($J.D.node.body);
        this.c.append(this.lens);
      }

      var _proto12 = View.prototype;

      _proto12.getRightPosition = function getRightPosition(x, y) {
        var rect = this.c.getRect();
        return {
          x: x - rect.left,
          y: y - rect.top
        };
      };

      _proto12.addDomEventToDocBody = function addDomEventToDocBody(eventName, callback) {
        this.b.addEvent(eventName, callback);
      };

      _proto12.removeDomEventToDocBody = function removeDomEventToDocBody(eventName, callback) {
        this.b.removeEvent(eventName, callback);
      };

      _proto12.addDomEventToLens = function addDomEventToLens(eventName, callback) {
        this.lens.addEvent(eventName, callback);
      };

      _proto12.addDomEvent = function addDomEvent(eventName, callback) {
        this.c.addEvent(eventName, callback);
      };

      _proto12.changeCursor = function changeCursor(value) {
        this.c.setCssProp('cursor', value);
      };

      _proto12.removeEvents = function removeEvents() {
        this.c.removeEvent('btnclick tap');
        this.c.removeEvent('mousedown touchstart');
        this.lens.removeEvent('mousedown touchstart');
        this.c.removeEvent('mousemove touchmove');
      };

      _proto12.setContainerCss = function setContainerCss(size) {
        this.c.setCss({
          width: size.width + 'px',
          height: size.height + 'px'
        });
      };

      _proto12.setLensCss = function setLensCss(lensPosition, lensSize, containerSize) {
        this.lens.setCss({
          top: lensPosition.top - 1 + 'px',
          left: lensPosition.left - 1 + 'px',
          width: lensSize.width + 'px',
          height: lensSize.height + 'px',
          'font-size': containerSize + 'px'
        });
      };

      _proto12.setImg = function setImg(src, srcset) {
        this.img = $J.$new('img', {
          'src': src
        });

        if (srcset) {
          this.img.attr('srcset', srcset + ' 2x');
        }

        this.c.append(this.img);
      } // private
      ;

      _proto12.removeEventTransitionEvent = function removeEventTransitionEvent() {
        this.c.removeEvent('transitionend');
      };

      _proto12.show = function show(callback) {
        var _this13 = this;

        this.c.setCss({
          opacity: 0,
          transition: 'opacity .3s linear'
        });
        this.p.append(this.c);
        this.c.getSize(); // render

        this.removeEventTransitionEvent();
        this.c.addEvent('transitionend', function (e) {
          e.stop();

          _this13.removeEventTransitionEvent();

          _this13.c.setCssProp('transition', '');

          _this13.addDomEvent('mousedown touchstart', function (_e) {
            _e.stop();
          });

          callback();
        });
        this.c.setCssProp('opacity', 1);
      };

      _proto12.hide = function hide(force, callback) {
        var _this14 = this;

        this.removeEventTransitionEvent();

        if (!force) {
          this.c.addEvent('transitionend', function (e) {
            e.stop();

            _this14._removeEventTransitionEvent();

            _this14.c.setCssProp('transition', '');

            _this14.c.remove();

            _this14.removeEvents();

            callback();
          });
        } else {
          this.c.remove();
          this.removeEvents();
          callback();
        }

        this.c.setCssProp('opacity', 0);
      };

      _proto12.destroy = function destroy() {
        this.c = null;
        this.lens = null;
      };

      return View;
    }();
    /* eslint-env es6 */

    /* global getPercent */

    /* global EventEmitter */

    /* global helper */

    /* global getPercentValue */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


    var getOffset = function (e) {
      var rect;
      var result = {
        x: 0,
        y: 0
      };
      var oe = e.getOriginEvent();

      if ($J.defined(oe.offsetX)) {
        result.x = oe.offsetX;
        result.y = oe.offsetY;
      } else {
        // rect = e.getTarget().getBoundingClientRect();
        rect = $(e.getTarget()).getPosition();
        result.x = oe.targetTouches[0].pageX - rect.left;
        result.y = oe.targetTouches[0].pageY - rect.top;
      }

      return result;
    };

    var betweenMinMax = function (value, min, max) {
      if (!$J.defined(min)) {
        min = 0;
      }

      if (!$J.defined(max)) {
        max = 100;
      }

      return Math.min(Math.max(value, min), max);
    }; // eslint-disable-next-line no-unused-vars


    var Controller = /*#__PURE__*/function (_EventEmitter6) {
      "use strict";

      bHelpers.inheritsLoose(Controller, _EventEmitter6);

      function Controller(view, options) {
        var _this15;

        _this15 = _EventEmitter6.call(this) || this;
        _this15.view = view;
        _this15.o = options;
        _this15.state = globalVariables.APPEARANCE.HIDDEN;
        _this15.scale = {
          x: 1,
          y: 1
        };
        _this15.viewPortSize = {
          width: 0,
          height: 0
        }; // bigImageSize

        _this15.bISize = {
          width: 0,
          height: 0
        }; // currentBigImageSize

        _this15.cBISize = {
          width: 0,
          height: 0
        }; // currentBigImagePosition

        _this15.cBIPosition = {
          top: 0,
          left: 0
        }; // currentMapContainerSize

        _this15.mapSize = {
          width: 0,
          height: 0
        }; // lensSize

        _this15.ls = {
          width: 0,
          height: 0
        }; // lensPosition

        _this15.lp = {
          top: 0,
          left: 0
        }; // correctLensPosition

        _this15.clp = {
          x: 0,
          y: 0
        };
        _this15.isDragMoved = false;
        return _this15;
      } // convert current percent to the center percent of map eye


      Controller.setInTheCenter = function setInTheCenter(value) {
        if (value < 50) {
          value = Math.max(value - (50 - value), 0);
        } else if (value > 50) {
          value = Math.min(value + (value - 50), 100);
        }

        return value;
      } // private
      ;

      var _proto13 = Controller.prototype;

      _proto13.getPercentPosition = function getPercentPosition(x, y) {
        var cms = this.mapSize;
        var pos = this.view.getRightPosition(x, y);
        x = betweenMinMax(helper.round(getPercent(pos.x, cms.width), 1));
        y = betweenMinMax(helper.round(getPercent(pos.y, cms.height), 1));
        return {
          x: x,
          y: y
        };
      } // private
      ;

      _proto13.isInside = function isInside(x, y) {
        var result = false;
        var lp = this.lp;
        var ls = this.ls;
        var pos = this.view.getRightPosition(x, y);

        if (lp.left < pos.x && lp.left + ls.width > pos.x && lp.top < pos.y && lp.top + ls.height > pos.y) {
          result = true;
        }

        return result;
      } // private
      ;

      _proto13.setEvents = function setEvents() {
        var _this16 = this;

        var count = 1;
        var isDragMoved = false;

        this.dragEndHandler = function (e) {
          if (isDragMoved) {
            e.stop();
            isDragMoved = false;
            _this16.clp = {
              x: 0,
              y: 0
            };

            _this16.view.changeCursor('');

            _this16.view.removeDomEventToDocBody(e.type, _this16.dragEndHandler);

            _this16.view.removeDomEventToDocBody('mouseout', _this16.mouseOutHandler);
          }
        };

        this.mouseOutHandler = function (event) {
          event.stop();

          if ((!event.oe.relatedTarget || event.oe.relatedTarget.tagName === 'HTML') && isDragMoved) {
            _this16.dragEndHandler(event);

            _this16.view.removeDomEventToDocBody('mouseup touchend', _this16.dragEndHandler);
          }
        };

        this.view.addDomEvent('btnclick tap', function (e) {
          e.stop(); // this.emit('zoomMapNewPosition', { data: this.getPercentPosition(e.x - this.ls.width / 2, e.y - this.ls.height / 2) });

          _this16.emit('zoomMapNewPosition', {
            data: _this16.getPercentPosition(e.x, e.y)
          });
        });
        this.view.addDomEventToLens('mousedown touchstart', function (e) {
          var pageXY = e.getPageXY();

          if (_this16.isInside(pageXY.x, pageXY.y)) {
            e.stop();
            count = 1;
            var offset = getOffset(e);
            _this16.clp.y = offset.y;
            _this16.clp.x = offset.x;
            isDragMoved = true;

            _this16.view.addDomEventToDocBody('mouseup touchend', _this16.dragEndHandler);

            _this16.view.addDomEventToDocBody('mouseout', _this16.mouseOutHandler);
          }
        });
        this.view.addDomEvent('mousemove touchmove', function (e) {
          if (isDragMoved) {
            if (count <= 0) {
              e.stop();
              var pageXY = e.getPageXY();

              _this16.view.changeCursor('move'); // this.emit('zoomMapNewPosition', { data: this.getPercentPosition(pageXY.x - this.clp.x, pageXY.y - this.clp.y) });


              _this16.emit('zoomMapNewPosition', {
                data: _this16.getPercentPosition(pageXY.x, pageXY.y)
              });
            }

            count--;
          }
        });
      } // private
      ;

      _proto13.calcMap = function calcMap(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        var cWidth = this.o.maxwidth;
        var cHeight = this.o.maxheight;

        if (zoomContainerWidth <= cWidth) {
          cWidth = zoomContainerWidth / 2;
          cHeight = cWidth * (imgHeight / imgWidth);
        }

        if (zoomContainerHeight <= cHeight) {
          cHeight = zoomContainerHeight / 2;
          cWidth = cHeight * (imgWidth / imgHeight);
        }

        if (cWidth / cHeight > imgWidth / imgHeight) {
          cWidth = cHeight * (imgWidth / imgHeight);
        } else {
          cHeight = cWidth * (imgHeight / imgWidth);
        }

        cWidth = parseInt(cWidth, 10);
        cHeight = parseInt(cHeight, 10);
        this.mapSize.width = cWidth;
        this.mapSize.height = cHeight;
        this.viewPortSize.width = zoomContainerWidth;
        this.viewPortSize.height = zoomContainerHeight;
        this.bISize.width = imgWidth;
        this.bISize.height = imgHeight;
      };

      _proto13.prepare = function prepare(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.calcMap(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
        this.view.setContainerCss(this.mapSize);
        this.emit('zoomGetImage', {
          data: {
            width: this.mapSize.width,
            height: this.mapSize.height
          }
        });
      };

      _proto13.setLensPosition = function setLensPosition(bigImageTop, bigImageLeft) {
        var top;
        var left;
        var bis = this.cBISize;
        var ms = this.mapSize;
        top = ms.height / bis.height * bigImageTop;
        left = ms.width / bis.width * bigImageLeft;
        this.cBIPosition.top = bigImageTop;
        this.cBIPosition.left = bigImageLeft;

        if (top < 0) {
          top = 0;
        }

        if (left < 0) {
          left = 0;
        }

        var ls = this.ls;

        if (top + ls.height > ms.height) {
          top = ms.height - ls.height;
        }

        if (left + ls.width > ms.width) {
          left = ms.width - ls.width;
        }

        this.lp.top = top;
        this.lp.left = left;
      };

      _proto13.setLensSize = function setLensSize(width, height) {
        this.cBISize.width = width;
        this.cBISize.height = height;
        var cm = this.mapSize;
        var vp = this.viewPortSize;
        this.ls.width = vp.width >= width ? cm.width : vp.width / width * cm.width;
        this.ls.height = vp.height >= height ? cm.height : vp.height / height * cm.height;
      };

      _proto13.move = function move(imgPos, scale) {
        var bis = this.bISize;
        var imgWidth = bis.width * scale.x;
        var imgHeight = bis.height * scale.y;
        var imgTop = Math.abs(imgPos.y + (bis.height - imgHeight) / 2);
        var imgLeft = Math.abs(imgPos.x + (bis.width - imgWidth) / 2);
        this.scale.x = scale.x;
        this.scale.y = scale.y;
        this.setLensSize(imgWidth, imgHeight);
        this.setLensPosition(imgTop, imgLeft);
        this.view.setLensCss(this.lp, this.ls, Math.max(this.mapSize.width, this.mapSize.height));
      };

      _proto13.show = function show() {
        var _this17 = this;

        if ($J.contains([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN], this.state)) {
          return;
        }

        this.state = globalVariables.APPEARANCE.SHOWING;
        this.view.show(function () {
          _this17.setEvents();

          _this17.state = globalVariables.APPEARANCE.SHOWN;
        });
      };

      _proto13.hide = function hide(force) {
        var _this18 = this;

        if ($J.contains([globalVariables.APPEARANCE.HIDDEN, globalVariables.APPEARANCE.HIDING], this.state) && !force) {
          return;
        }

        this.state = globalVariables.APPEARANCE.HIDING;
        this.view.hide(force, function () {
          _this18.view.removeDomEventToDocBody('mouseup touchend', _this18.dragEndHandler);

          _this18.state = globalVariables.APPEARANCE.HIDDEN;
        });
      };

      _proto13.resize = function resize(maxWidth, maxHeight, imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.o.maxwidth = maxWidth;
        this.o.maxheight = maxHeight;
        this.calcMap(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
        this.view.setContainerCss(this.mapSize);
      };

      _proto13.destroy = function destroy() {
        this.hide(true);

        _EventEmitter6.prototype.destroy.call(this);
      };

      return Controller;
    }(EventEmitter);
    /* eslint-env es6 */

    /* global EventEmitter */

    /* global View */

    /* global Controller */

    /* eslint-disable indent */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
    // eslint-disable-next-line no-unused-vars


    var _ZoomMap = /*#__PURE__*/function (_EventEmitter7) {
      "use strict";

      bHelpers.inheritsLoose(_ZoomMap, _EventEmitter7);

      function _ZoomMap(parent, options) {
        var _this19;

        _this19 = _EventEmitter7.call(this) || this;
        _this19.options = $J.extend({
          maxwidth: 200,
          maxheight: 200
        }, options || {});
        _this19.view = new View(parent);
        _this19.controller = new Controller(_this19.view, _this19.options);

        _this19.controller.setParent(bHelpers.assertThisInitialized(_this19));

        return _this19;
      }

      var _proto14 = _ZoomMap.prototype;

      _proto14.prepare = function prepare(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.controller.prepare(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
      };

      _proto14.move = function move(imgPos, scale) {
        this.controller.move(imgPos, scale);
      };

      _proto14.setImg = function setImg(src, srcset) {
        this.view.setImg(src, srcset);
      };

      _proto14.show = function show() {
        this.controller.show();
      };

      _proto14.hide = function hide(force) {
        this.controller.hide(force);
      };

      _proto14.resize = function resize(maxWidth, maxHeight, imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.controller.resize(maxWidth, maxHeight, imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
      };

      _proto14.destroy = function destroy() {
        this.controller.destroy();
        this.view.destroy();

        _EventEmitter7.prototype.destroy.call(this);
      };

      return _ZoomMap;
    }(EventEmitter);

    return _ZoomMap;
  }();
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


  var findZoomNode = function (el) {
    return $($(el).node.getElementsByTagName('img')[0] || $(el).node.getElementsByTagName('canvas')[0] || el);
  }; // eslint-disable-next-line no-unused-vars


  var View = /*#__PURE__*/function () {
    "use strict";

    function View(parentNode) {
      this.pn = $(parentNode);
      var className = 'sirv-zoom'; // eventsCanvasNode

      this.cnv = $J.$new('div');
      this.cnv.addClass(className);
      this.node = $J.$new('div').setCss({
        opacity: 0
      });
      this.node.addClass(className + '-wrapper');
      this.zoomWrapper = $J.$new('div').addClass('sirv-zoom-image-wrapper'); // zoomNode

      this.zoom = findZoomNode(this.pn); // lensContainer

      this.lens = $J.D.node.body;
      this.isBody = true;
      this.image = null;
      this.perspective = '';

      if ($J.browser.mobile && $J.browser.platform === 'ios') {
        // perspective much helps for ios
        this.perspective = 'perspective(1000px) ';
      }
    }

    var _proto15 = View.prototype;

    _proto15.getHash = function getHash() {
      if (this.image) {
        return this.image.$J_UUID + '' || this.image.attr('src');
      }

      return null;
    };

    _proto15.getParentSize = function getParentSize() {
      return this.pn.getSize();
    };

    _proto15.getParentPostion = function getParentPostion() {
      return this.pn.getPosition(); // Inaccurate position for mobile
    };

    _proto15.getZoomSize = function getZoomSize() {
      return this.zoom.getSize();
    };

    _proto15.getParentBoundaries = function getParentBoundaries() {
      if (this.cnv.node.parentNode) {
        return this.cnv.node.getBoundingClientRect();
      }

      return null;
    } // eslint-disable-next-line class-methods-use-this
    ;

    _proto15.addScrollEvent = function addScrollEvent(callback) {
      $J.W.addEvent('scroll', callback);
    } // eslint-disable-next-line class-methods-use-this
    ;

    _proto15.removeScrollEvent = function removeScrollEvent(callback) {
      if (callback) {
        $J.W.removeEvent('scroll', callback);
      } else {
        $J.W.removeEvent('scroll');
      }
    };

    _proto15.addClassToWrapper = function addClassToWrapper(zoomType) {
      this.node.addClass('sirv-' + zoomType + '-zoom');
    };

    _proto15.setEventToMainContainer = function setEventToMainContainer(name, callback) {
      this.cnv.addEvent(name, callback);
    };

    _proto15.removeEventFromMainContainer = function removeEventFromMainContainer() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.cnv.removeEvent(args);
    };

    _proto15.setEventToWrapper = function setEventToWrapper(name, callback) {
      this.node.addEvent(name, callback);
    };

    _proto15.removeEventFromWrapper = function removeEventFromWrapper() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.node.removeEvent(args);
    };

    _proto15.addMouseoutEvent = function addMouseoutEvent(callback) {
      var _this20 = this;

      this.setEventToWrapper('mouseout', function (e) {
        // let toElement = e.toElement || e.relatedTarget;
        var toElement = e.getRelated();

        if (!toElement) {
          return;
        }

        while (toElement && toElement !== _this20.node.node && toElement !== _this20.lens.node) {
          // while (toElement !== this.node && toElement !== $J.D.node.body) {
          toElement = toElement.parentNode;
        }

        if (_this20.node.node !== toElement) {
          callback(e);
        }
      });
    };

    _proto15.setLensContainer = function setLensContainer(lensContainer) {
      if (!lensContainer) {
        lensContainer = $($J.D.node.body);
      }

      this.isBody = $(lensContainer) === $($J.D.node.body);
      this.lens = $(lensContainer);
    };

    _proto15.toggleCursorClass = function toggleCursorClass(oldClass, newClass) {
      this.cnv.removeClass(oldClass).addClass(newClass);
    };

    _proto15.setImagePosition = function setImagePosition(position, scale) {
      if (this.image) {
        this.zoomWrapper.setCssProp('transform', this.perspective + 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0) scale(' + scale.x + ', ' + scale.y + ')');
      }
    };

    _proto15.addStartCss = function addStartCss() {
      this.setLensStyle({
        opacity: 0,
        transform: 'scale(0)'
      });
    };

    _proto15.appendNodes = function appendNodes(smallImg, imageSize) {
      this.cnv.addEvent('contextmenu', function (e) {
        e.stopDefaults();
      });
      this.image = $(smallImg);
      this.image.setCss({
        width: imageSize.width + 'px',
        height: imageSize.height + 'px'
      });
      /*
          if tiels === false
          image sticks to mouse cursor
          just for firefox
      */

      if (!$J.browser.mobile) {
        this.image.addEvent('mousedown', function (e) {
          e.stopDefaults();
        });
      }

      this.zoomWrapper.append(this.image);
      this.node.append(this.zoomWrapper);
      this.node.appendTo(this.cnv);
      this.cnv.appendTo(this.lens, false);
    };

    _proto15.setEventNodePositionSize = function setEventNodePositionSize(pos, size) {
      var top = pos.top;
      var left = pos.left;

      if (!this.isBody) {
        var parentContainer = this.lens.getPosition();
        top -= parentContainer.top;
        left -= parentContainer.left;
      }

      this.cnv.setCss({
        top: top,
        left: left,
        width: size.width,
        height: size.height
      });
    };

    _proto15.setLensStyle = function setLensStyle(styleObj) {
      this.node.setCss(styleObj);
    };

    _proto15.setLensPosition = function setLensPosition(position) {
      this.setLensStyle({
        top: position.top,
        left: position.left
      });
    };

    _proto15.setLensSize = function setLensSize(size) {
      this.setLensStyle({
        width: size.width,
        height: size.height
      });
    };

    _proto15.setLensCss = function setLensCss(position, size, transition) {
      this.setLensPosition(position);
      this.setLensSize(size);
      this.node.setCss({
        opacity: 1,
        transform: 'scale(1)',
        // top: position.top,
        // left: position.left,
        // width: size.width,
        // height: size.height,
        transition: transition || 'none'
      });
    };

    _proto15.setImageSize = function setImageSize(position, size, scale) {
      this.zoomWrapper.setCss({
        'top': 0,
        'left': 0,
        'width': size.width + 'px',
        'height': size.height + 'px',
        'transform-origin': '50% 50%',
        'transform': this.perspective + 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0) scale(' + scale.x + ', ' + scale.y + ')'
      }).getSize();
      this.image.setCss({
        width: '100%',
        height: '100%'
      }).getSize();
    };

    _proto15.clearCss = function clearCss() {
      this.node.setCss({
        transition: '',
        opacity: '',
        transform: ''
      });
      this.node.removeAttr('style');

      if (this.image) {
        this.image.setCss({
          width: '',
          height: ''
        });
      }

      this.zoomWrapper.setCss({
        top: '',
        left: '',
        width: '',
        height: '',
        transition: '',
        transform: ''
      });
    };

    _proto15.clearDOM = function clearDOM() {
      if (this.image) {
        this.image.remove();
        this.image = null;
      }

      this.zoomWrapper.remove();
      this.node.remove();
      this.cnv.remove();
    };

    _proto15.removeEvents = function removeEvents() {
      this.cnv.clearEvents(); // this.cnv.removeEvent('mouseover');

      if (this.image) {
        this.image.clearEvents();
      }

      this.node.clearEvents(); // this.node.removeEvent('mouseout');
      // this.node.removeEvent('mousemove');
      // this.node.removeEvent('btnclick');
      // this.node.removeEvent('mousescroll');
      // this.node.removeEvent('transitionend');
      // this.node.removeEvent('mousedrag');
      // this.node.removeEvent('touchdrag');
    };

    _proto15.getBoundaries = function getBoundaries() {
      return this.cnv.node.getBoundingClientRect();
    };

    _proto15.destroy = function destroy() {
      if (this.image) {
        this.image.remove();
        this.image = null;
      }

      this.zoomWrapper.remove();
      this.node.remove();
      this.cnv.remove();
    };

    return View;
  }();
  /* eslint-env es6 */

  /* global View */
  // eslint-disable-next-line no-unused-vars


  var InnerView = /*#__PURE__*/function (_View) {
    "use strict";

    bHelpers.inheritsLoose(InnerView, _View);

    function InnerView(parentNode) {
      var _this21;

      _this21 = _View.call(this, parentNode) || this;
      _this21.mouseMoveHandler = null;
      return _this21;
    }

    var _proto16 = InnerView.prototype;

    _proto16.getContainerForMap = function getContainerForMap() {
      return this.node;
    };

    _proto16.addStartCss = function addStartCss() {
      // TODO review it
      _View.prototype.addStartCss.call(this);

      this.node.addEvent('mousescroll', function (e) {
        e.stop();
      });
      this.setLensStyle({
        opacity: 0,
        transform: 'scale(1)'
      });
    };

    _proto16.removeDragstart = function removeDragstart() {
      this.node.del('event:mousedrag:dragstart'); // fix mousedrag when the lens is opening second time
    };

    _proto16.addEventsCanvasClass = function addEventsCanvasClass(className) {
      this.cnv.addClass(className);
    };

    _proto16.removeEventsCanvasClass = function removeEventsCanvasClass(className) {
      this.cnv.removeClass(className);
    };

    _proto16.getContainerSize = function getContainerSize() {
      return this.node.getSize();
    };

    _proto16.getContainerPosition = function getContainerPosition() {
      return this.node.getPosition();
    };

    _proto16.addGlobalEvent = function addGlobalEvent(callback) {
      if (!this.mouseMoveHandler) {
        this.mouseMoveHandler = callback;
        $J.D.addEvent('mousemove', callback);
      }
    };

    _proto16.removeGlobalEvent = function removeGlobalEvent() {
      if (this.mouseMoveHandler) {
        $J.D.removeEvent('mousemove', this.mouseMoveHandler);
        this.mouseMoveHandler = null;
      }
    };

    _proto16.removeEvents = function removeEvents() {
      _View.prototype.removeEvents.call(this);

      this.removeGlobalEvent();
    };

    return InnerView;
  }(View);
  /* eslint-env es6 */

  /* global View */
  // eslint-disable-next-line no-unused-vars


  var MagnifierView = /*#__PURE__*/function (_View2) {
    "use strict";

    bHelpers.inheritsLoose(MagnifierView, _View2);

    function MagnifierView() {
      return _View2.apply(this, arguments) || this;
    }

    var _proto17 = MagnifierView.prototype;

    _proto17.getParentSize = function getParentSize() {
      return this.zoom.getSize();
    };

    _proto17.getParentPostion = function getParentPostion() {
      return this.zoom.getPosition(); // Inaccurate position for mobiles
    };

    return MagnifierView;
  }(View);
  /* eslint-env es6 */

  /* global View */

  /* eslint-disable indent */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars


  var OutsideView = /*#__PURE__*/function (_View3) {
    "use strict";

    bHelpers.inheritsLoose(OutsideView, _View3);

    function OutsideView() {
      return _View3.apply(this, arguments) || this;
    }

    var _proto18 = OutsideView.prototype;

    _proto18.getImageForEye = function getImageForEye() {
      return this.image.node.cloneNode();
    };

    _proto18.getNodeForEye = function getNodeForEye() {
      return this.zoom;
    };

    _proto18.setLensPosition = function setLensPosition(position) {
      this.cnv.setCss({
        top: position.top,
        left: position.left
      });
    };

    _proto18.setCanvasNodeSize = function setCanvasNodeSize(size) {
      this.cnv.setCss({
        width: size.width,
        height: size.height
      });
    };

    _proto18.addStartCss = function addStartCss(value) {
      this.setLensStyle({
        opacity: 0,
        transform: 'translate3d(' + value.start.x + '%, ' + value.start.y + '%, 0px)'
      });
    };

    _proto18.getParentSize = function getParentSize() {
      return this.zoom.getSize();
    };

    _proto18.getParentPostion = function getParentPostion() {
      return this.zoom.getPosition(); // Inaccurate position for mobiles
    };

    _proto18.setLensCss = function setLensCss(position, size, transition) {
      this.cnv.setCss({
        top: position.top,
        left: position.left
      }); // super.setLensCss({ top: 0, left: 0 }, size, transition);

      _View3.prototype.setLensCss.call(this, position, size, transition);
    };

    _proto18.addMouseMoveEvent = function addMouseMoveEvent(callback) {
      $J.W.addEvent('mousemove', callback);
    };

    _proto18.removeMouseMoveEvent = function removeMouseMoveEvent(callback) {
      $J.W.removeEvent('mousemove', callback);
    };

    _proto18.clearCss = function clearCss() {
      this.cnv.removeAttr('style');
    };

    return OutsideView;
  }(View);
  /* eslint-env es6 */

  /* eslint-disable indent */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


  var AnimationLoop = function () {
    var STATES = {
      STOPPED: 0,
      STARTED: 1
    };

    var _Animation = /*#__PURE__*/function () {
      "use strict";

      function _Animation(callback, stopCallback) {
        this.state = STATES.STOPPED;
        this.id = null;

        this.cb = callback || function () {};

        this.stopCb = stopCallback || function () {};
      }

      var _proto19 = _Animation.prototype;

      _proto19.start = function start() {
        var _this22 = this;

        if (this.state !== STATES.STARTED) {
          this.state = STATES.STARTED;

          var step = function (lastTime) {
            _this22.cb(lastTime);

            if (_this22.state !== STATES.STOPPED) {
              _this22.id = requestAnimationFrame(step);
            }
          };

          this.id = requestAnimationFrame(step);
        }
      };

      _proto19.stop = function stop() {
        if (this.state !== STATES.STOPPED) {
          this.state = STATES.STOPPED;
          cancelAnimationFrame(this.id);
          this.stopCb();
        }
      };

      return _Animation;
    }();

    return _Animation;
  }();
  /* eslint-env es6 */

  /* global EventEmitter */

  /* global ZoomHelper */

  /* global helper */

  /* global AnimationLoop */

  /* global getDifference */

  /* global getPercentValue */

  /* global checkRange */

  /* global CURSOR_STATES */

  /* global getPercent */

  /* global DeepZoom */

  /* eslint-disable indent */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


  var zoomHelper = null; // TODO tmp
  // eslint-disable-next-line no-unused-vars

  var Controller = /*#__PURE__*/function (_EventEmitter8) {
    "use strict";

    bHelpers.inheritsLoose(Controller, _EventEmitter8);

    function Controller(view, o) {
      var _this23;

      _this23 = _EventEmitter8.call(this) || this;
      _this23.o = $J.extend({
        test: false,
        pan: false,
        // drag zoom
        smoothing: true,
        tiles: true,
        customZooming: true,
        clickBehavior: 'both',
        // both, up
        upscale: false,
        // upscale last level image when we have retina display
        trigger: 'hover' // hover, click, dblclick

      }, o);
      _this23.view = view;
      _this23.state = globalVariables.APPEARANCE.HIDDEN;
      _this23.x = 0;
      _this23.y = 0;
      _this23.baseScale = {
        x: 1,
        y: 1
      };
      _this23.scale = {
        x: 1,
        y: 1
      };
      _this23.dScale = {
        x: 1,
        y: 1
      }; // imageSize

      _this23.iSize = {
        width: 0,
        height: 0
      }; // imagePosition

      _this23.iPos = {
        x: 0,
        y: 0
      }; // imageDPosition

      _this23.iDPos = {
        x: 0,
        y: 0
      }; // parentPosition

      _this23.pPos = {
        top: 0,
        left: 0
      }; // parentSize

      _this23.pSize = {
        width: 0,
        height: 0
      };
      _this23.anim = null;
      _this23.animCb = null;
      _this23.animStep = 0;
      _this23.lastAnimTimer = 0;
      _this23.deepZoom = null;
      _this23.deepZoomTimer = null;
      _this23.lensSize = {
        width: 0,
        height: 0
      };
      _this23.lensHalfSize = {
        width: 0,
        height: 0
      };
      _this23.lensPosition = {
        top: 0,
        left: 0
      };
      _this23.currentLensSize = {
        width: 100,
        height: 100
      };
      _this23.dppx = 1; // just for image, not tiles

      _this23.zoomNodeSize = {
        width: 0,
        height: 0
      };
      _this23.boundaries = null;
      _this23.ANIM_STEP = 0.1;
      _this23.nonDeepZoomImageLevels = [];

      _this23.scrollHandler = function () {
        if ($J.contains([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN], _this23.state)) {
          _this23.hide(_this23.state === globalVariables.APPEARANCE.SHOWING);
        }
      };

      return _this23;
    }

    var _proto20 = Controller.prototype;

    _proto20.init = function init() {
      this.getSizes();
      this.view.setLensCss(this.lensPosition, this.lensSize);
      this.createDeepZoom();
      this.createAnimation(this.ANIM_STEP);
      this.view.addScrollEvent(this.scrollHandler);
    } // private
    ;

    _proto20.createDeepZoom = function createDeepZoom() {
      var _this24 = this;

      this.deepZoom = new DeepZoom(this.view.node, {
        tiles: this.o.tiles,
        inner: $J.contains(['inner', 'outside'], this.o.type),
        upscale: this.o.upscale // minSize: this.pSize

      });
      this.deepZoom.setParent(this);
      this.on('getTile', function (e) {
        e.stopAll();

        _this24.emit('zoomGetImage', {
          data: e.data
        });
      });
      this.on('zoomCancelLoadingOfTiles', function (e) {
        e.stopEmptyEvent();
      });
    };

    _proto20.setLensContainer = function setLensContainer(lensContainer) {
      this.view.setLensContainer(lensContainer);
    } // private
    ;

    _proto20.getBoundaries = function getBoundaries() {
      this.boundaries = this.view.getParentBoundaries();
    } // private
    ;

    _proto20.getSizes = function getSizes() {
      this.pSize = this.view.getParentSize();
      this.pPos = this.view.getParentPostion();
      this.zoomNodeSize = this.view.getZoomSize();
      this.getBoundaries();
    };

    _proto20.isShown = function isShown() {
      return this.state === globalVariables.APPEARANCE.SHOWN;
    };

    _proto20.isShowing = function isShowing() {
      return this.state === globalVariables.APPEARANCE.SHOWING;
    } // private
    ;

    _proto20.deepZoomAction = function deepZoomAction(equals, newSize) {
      var _this25 = this;

      clearTimeout(this.deepZoomTimer);
      this.deepZoomTimer = setTimeout(function () {
        _this25.deepZoom.loadImages();

        if (newSize) {
          _this25.deepZoom.setLensSize(newSize.width, newSize.height);

          _this25.deepZoom.resize();
        }

        _this25.deepZoom.action(_this25.iDPos, _this25.dScale);

        if (!equals) {
          _this25.deepZoomAction(_this25.dScale.x === _this25.scale.x);
        }
      }, this.lastAnimTimer + 10); // must be more than fps (1000 / 60 = 16)

      if (newSize) {
        this.deepZoom.setLensSize(newSize.width, newSize.height);
        this.deepZoom.resize();
      }

      this.deepZoom.action(this.iDPos, this.dScale);
    } // private
    ;

    _proto20.stopMovingAndZooming = function stopMovingAndZooming() {
      this.scale.x = this.dScale.x;
      this.scale.y = this.dScale.y;
      this.iPos.x = this.iDPos.x;
      this.iPos.y = this.iDPos.y;
    } // private
    ;

    _proto20.createAnimation = function createAnimation(step) {
      var _this26 = this;

      var checkScale = function (sett) {
        var result = false;

        if (_this26.dScale[sett] < _this26.baseScale[sett]) {
          result = true;
          _this26.dScale[sett] = _this26.baseScale[sett];
        }

        if (_this26.dScale[sett] > 1) {
          result = true;
          _this26.dScale[sett] = 1;
        }

        return result;
      };

      this.animStep = step;
      var last = 0;
      this.anim = new AnimationLoop(function (lastTime) {
        if (!last) {
          last = lastTime;
          return;
        }

        var dx;
        var dy;
        var diffX;
        var diffY;
        var isChanged = false;
        _this26.lastAnimTimer = lastTime - last;
        last = lastTime;
        var xScaleWasClosed = false;
        var yScaleWasClosed = false;

        if (_this26.scale.x !== _this26.dScale.x) {
          isChanged = true;

          _this26.sendZoomingAction(); // this.setCursorState();


          diffX = _this26.scale.x - _this26.dScale.x; // diffY = this.scale.y - this.dScale.y;

          dx = diffX * _this26.animStep; // dy = diffY * this.animStep;

          _this26.dScale.x += dx;
          _this26.dScale.y += dx; // this.dScale.y += dy;

          xScaleWasClosed = checkScale('x');
          yScaleWasClosed = xScaleWasClosed; // yScaleWasClosed = checkScale('y');
          // if (Math.abs(diffX) < 0.0001 || Math.abs(diffY) < 0.0001) {

          if (Math.abs(diffX) < 0.0001) {
            _this26.dScale.x = _this26.scale.x; // this.dScale.y = this.scale.y;

            _this26.dScale.y = _this26.scale.x;
          }
        }

        if (_this26.iPos.x !== _this26.iDPos.x || _this26.iPos.y !== _this26.iDPos.y) {
          isChanged = true;
          diffX = _this26.iPos.x - _this26.iDPos.x;
          diffY = _this26.iPos.y - _this26.iDPos.y;
          dx = diffX * _this26.animStep;
          dy = diffY * _this26.animStep;
          _this26.iDPos.x += dx;
          _this26.iDPos.y += dy;
          _this26.iDPos.x = helper.round(_this26.iDPos.x, 4);
          _this26.iDPos.y = helper.round(_this26.iDPos.y, 4);

          if (Math.max(Math.abs(diffX), Math.abs(diffY)) < 1 || xScaleWasClosed || yScaleWasClosed) {
            _this26.iDPos.x = _this26.iPos.x;
            _this26.iDPos.y = _this26.iPos.y;
          }
        }

        if (isChanged) {
          _this26.render(_this26.iDPos, _this26.dScale);
        } else if (_this26.animCb) {
          _this26.animCb();

          _this26.animStep = step;
          _this26.animCb = null;
        }
      }, function () {
        last = 0;
      });
    };

    _proto20.render = function render(position, scale) {
      this.deepZoomAction();
      this.view.setImagePosition(position || this.iDPos, scale || this.dScale);
    } // private
    ;

    _proto20.correctX = function correctX(value) {
      return value - this.pPos.left;
    } // private
    ;

    _proto20.correctY = function correctY(value) {
      return value - this.pPos.top;
    } // private
    ;

    _proto20.setXY = function setXY(x, y) {
      this.x = this.correctX(x);
      this.y = this.correctY(y);
    };

    _proto20.getZoomData = function getZoomData(scale) {
      var result = 0;

      if (!scale) {
        scale = this.scale.x;
      }

      if (this.isShown() || this.isShowing()) {
        result = helper.round((scale - this.baseScale.x) / (1 - this.baseScale.x), 2);
      }

      return result;
    };

    _proto20.getNextMinZoom = function getNextMinZoom() {
      var result = this.deepZoom.getScale('zoomout');

      if (result < this.baseScale.x) {
        result = this.baseScale.x;
      }

      return this.getZoomData(result);
    };

    _proto20.getNextMaxZoom = function getNextMaxZoom() {
      var result = this.deepZoom.getScale('zoomin');

      if (result > 1) {
        result = 1;
      }

      return this.getZoomData(result);
    } // private
    ;

    _proto20.zoom = function zoom(direction, x, y) {
      var last = this.scale.x;
      var is = this.iSize;
      var cw = is.width * this.scale.x;
      var ch = is.height * this.scale.y;
      var dw = getDifference(is.width, cw);
      var dh = getDifference(is.height, ch);
      x = x || this.pPos.left + this.lensHalfSize.width;
      y = y || this.pPos.top + this.lensHalfSize.height;
      this.basePercentOfScale = {
        x: getPercent(Math.abs(this.iPos.x) + this.correctX(x) - dw, cw),
        y: getPercent(Math.abs(this.iPos.y) + this.correctY(y) - dh, ch)
      };
      var scale = this.deepZoom.getScale(direction);
      this.scale.x = scale;
      this.scale.y = scale;
      this.setXY(x, y);
      this.afterZoom(last);
    };

    _proto20.afterZoom = function afterZoom(lastScale) {
      if (lastScale !== this.scale.x) {
        this.sendZoomingAction();
        this.setCursorState();

        if (this.o.smoothing) {
          this.animStep = 0.25;
        } else {
          this.dScale.x = this.scale.x;
          this.dScale.y = this.scale.y;
          this.iDPos.x = this.iPos.x;
          this.iDPos.y = this.iPos.y;
          this.render(this.iPos, this.scale);
        }
      }
    } // public
    ;

    _proto20.zoomUp = function zoomUp(x, y) {
      if ((this.isShown() || this.isShowing()) && this.scale.x !== 1) {
        this.zoom('zoomin', x, y);
        return true;
      }

      return false;
    } // public
    ;

    _proto20.zoomDown = function zoomDown(x, y) {
      if ((this.isShown() || this.isShowing()) && this.scale.x !== this.baseScale.x) {
        this.zoom('zoomout', x, y);
        return true;
      }

      return false;
    } // private
    ;

    _proto20.sendZoomingAction = function sendZoomingAction() {
      var _this27 = this;

      clearTimeout(this.zoomingTimer);
      this.zoomingTimer = setTimeout($(function (from) {
        _this27.emit('zooming', {
          data: {
            zoom: _this27.getZoomData(),
            // from 0 to 1
            from: from,
            to: _this27.scale.x
          }
        });
      }).bind(this, this.dScale.x), 24);
    } // private
    ;

    _proto20.setCursorState = function setCursorState(state) {
      if (!$J.defined(state)) {
        var scale = this.getZoomData();

        if (scale === 0) {
          state = 'zoomIn';
        } else if (scale === 1) {
          state = 'zoomOut';
        } else if (scale > 0 && scale < 1) {
          if (this.o.clickBehavior === 'up') {
            state = 'zoomIn';
          } else {
            state = 'zoomOut';
          }
        }
      }

      if (this.currentCursorState !== state) {
        this.view.toggleCursorClass(CURSOR_STATES[this.currentCursorState], CURSOR_STATES[state]);
        this.currentCursorState = state;
      }
    };

    _proto20.setImage = function setImage(data) {
      // when will work last block "else" if deepZoom always true!?
      var node = data.node;

      if (this.isShown() || this.isShowing()) {
        var _data = $J.extend({}, data.callbackData);

        _data.node = node;
        this.deepZoom.setImage(_data);
      }
    } // private
    ;

    _proto20.setSizeOfLens = function setSizeOfLens(width, height) {
      this.lensSize = {
        width: width,
        height: height
      };
      this.lensHalfSize = {
        width: this.lensSize.width / 2,
        height: this.lensSize.height / 2
      };
    } // private
    ;

    _proto20.calcSizeOfLens = function calcSizeOfLens() {
      var ps = this.pSize;
      var cls = this.currentLensSize;
      this.setSizeOfLens(getPercentValue(ps.width, cls.width), getPercentValue(ps.height, cls.height));
    } // private
    ;

    _proto20.getBaseScale = function getBaseScale() {
      this.baseScale = {
        x: this.zoomNodeSize.width / this.iSize.width,
        y: this.zoomNodeSize.height / this.iSize.height
      };
    } // eslint-disable-next-line class-methods-use-this
    ;

    _proto20.calcPositionOfLens = function calcPositionOfLens() {} // eslint-disable-next-line class-methods-use-this
    ;

    _proto20.getImagePosition = function getImagePosition() {} // private
    ;

    _proto20.showDeepZoom = function showDeepZoom(bigImageOriginWidth, bigImageOriginHeight) {
      if (this.deepZoom) {
        /* start-removable-tile-helper-block */
        if (this.o.test && !zoomHelper) {
          zoomHelper = new ZoomHelper();
          zoomHelper.setParent(this);
        }
        /* end-removable-tile-helper-block */


        var hash = this.view.getHash();

        if (hash) {
          this.deepZoom.setHash(hash);
        }

        this.deepZoom.setLensSize(this.lensSize.width, this.lensSize.height).setMinSize(this.zoomNodeSize.width, this.zoomNodeSize.height).setMaxSize(this.iSize.width, this.iSize.height, bigImageOriginWidth, bigImageOriginHeight).show();
      }
    } // private
    ;

    _proto20.endOfShowing = function endOfShowing(isWithoutSettingEvents) {
      var result = false;

      if (this.state === globalVariables.APPEARANCE.SHOWING) {
        result = true;
        this.state = globalVariables.APPEARANCE.SHOWN;

        if (!isWithoutSettingEvents) {
          this.setEvents();
        }

        this.setCursorState();

        if (!this.o.smoothing) {
          this.deepZoomAction();
        }
      }

      return result;
    };

    _proto20.sendZoomShownEvent = function sendZoomShownEvent() {
      this.emit('zoomShown', {
        data: {
          clientPosition: {
            x: this.x,
            y: this.y
          },
          pagePosition: {
            x: this.pPos.left,
            y: this.pPos.top
          }
        }
      });
    };

    _proto20.showCenter = function showCenter(smallImg, largeImg, toLevel) {
      this.getSizes();
      var x = this.pPos.left + this.pSize.width / 2;
      var y = this.pPos.top + this.pSize.height / 2;
      return this.show(smallImg, largeImg, x, y, false, toLevel);
    }
    /*
        public
        toLevel = max || undefined(default), first, zero
    */
    ;

    _proto20.show = function show() {
      if (this.state !== globalVariables.APPEARANCE.HIDDEN) {
        return false;
      }

      this.state = globalVariables.APPEARANCE.SHOWING;
      return true;
    } // private
    ;

    _proto20.endOfHiding = function endOfHiding() {
      this.stopMovingAndZooming();
      clearTimeout(this.hideTimer);
      this.anim.stop();
      this.setCursorState('zoomIn');
      this.view.clearCss();
      this.baseScale = {
        x: 1,
        y: 1
      };
      this.scale = {
        x: 1,
        y: 1
      };
      this.dScale = {
        x: 1,
        y: 1
      };
      this.setUpEvent = false;
      this.basePercentOfScale = {
        x: 0,
        y: 0
      };
      clearTimeout(this.deepZoomTimer);
      this.deepZoom.hide();
      this.view.clearDOM();
      this.state = globalVariables.APPEARANCE.HIDDEN;
      /* start-removable-tile-helper-block */

      if (zoomHelper) {
        zoomHelper.destroy();
        zoomHelper = null;
      }
      /* end-removable-tile-helper-block */


      this.emit('zoomHidden', {
        data: {
          clientPosition: {
            x: this.x,
            y: this.y
          },
          pagePosition: {
            x: this.pPos.left,
            y: this.pPos.top
          }
        }
      });
    } // private
    ;

    _proto20.hide = function hide(force) {
      if (!$J.contains([globalVariables.APPEARANCE.SHOWN, globalVariables.APPEARANCE.SHOWING], this.state)) {
        return false;
      }

      this.state = globalVariables.APPEARANCE.HIDING;
      this.view.removeEvents();

      if (force) {
        clearTimeout(this.deepZoomTimer);
        this.deepZoom.hide();
        this.endOfHiding();
      } else {
        this.stopMovingAndZooming();
      }

      return true;
    } // private
    ;

    _proto20.addClickEvent = function addClickEvent() {
      var _this28 = this;

      var eventName = 'btnclick tap';

      if (this.o.trigger === 'dblclick') {
        eventName = 'dblbtnclick dbltap';
      }

      this.view.setEventToWrapper(eventName, function (e) {
        e.stop();

        _this28.setXY(e.x, e.y);

        if (_this28.o.clickBehavior === 'up') {
          if (!_this28.zoomUp(e.x, e.y)) {
            _this28.hide();
          }
        } else if (_this28.o.smoothing && _this28.scale.x !== _this28.baseScale.x) {
          _this28.hide();
        } else {
          _this28.hide(true);
        }
      });
    };

    _proto20.customMove = function customMove(x, y) {
      if (!$J.contains([globalVariables.APPEARANCE.HIDDEN, globalVariables.APPEARANCE.HIDING], this.state)) {
        this.move(x, y);
      }
    } // private
    ;

    _proto20.move = function move(x, y) {
      this.setXY(x, y);
      this.afterMove();
    } // private
    ;

    _proto20.afterMove = function afterMove() {
      if (!this.o.smoothing) {
        this.render(this.iPos, this.scale);
      }
    } // eslint-disable-next-line class-methods-use-this
    ;

    _proto20.setEvents = function setEvents() {};

    _proto20.setLensStyleOnResize = function setLensStyleOnResize() {
      this.view.setLensStyle({
        top: this.lensPosition.top,
        left: this.lensPosition.left,
        width: this.lensSize.width,
        height: this.lensSize.height
      });
    };

    _proto20.onResize = function onResize() {
      if (this.state !== globalVariables.APPEARANCE.HIDDEN) {
        if (this.state === globalVariables.APPEARANCE.HIDING) {
          this.hide(true);
        } else {
          if (this.state === globalVariables.APPEARANCE.SHOWING) {
            if (this.o.smoothing) {
              this.state = globalVariables.APPEARANCE.SHOWN;
              this.setEvents();
              this.view.removeEventFromWrapper('transitionend');
              this.view.setLensStyle({
                'transition': ''
              });
              this.stopMovingAndZooming();
              this.view.setImagePosition(this.iPos, this.scale);
            }
          }

          this.getSizes();

          if (this.zoomNodeSize.width > this.iSize.width || this.zoomNodeSize.height > this.iSize.height) {
            this.hide(true);
            return;
          }

          this.getBaseScale();
          this.scale.x = checkRange(this.scale.x, this.baseScale.x, 1);
          this.scale.y = checkRange(this.scale.y, this.baseScale.y, 1);
          this.calcSizeOfLens();
          this.calcPositionOfLens();
          this.setLensStyleOnResize();
          this.deepZoom.setLensSize(this.pSize.width, this.pSize.height).setMinSize(this.zoomNodeSize.width, this.zoomNodeSize.height) // .setMaxSize(this.iSize.width, this.iSize.height)
          .resize(); // this.calcPositionOfImage(false, true);

          this.view.setEventNodePositionSize(this.pPos, this.pSize);

          if (!this.o.smoothing) {
            this.sendZoomingAction();
            this.setCursorState();
            this.deepZoomAction();
            this.view.setImagePosition(this.iPos, this.scale);
          }
        }
      }
    };

    _proto20.destroy = function destroy() {
      this.hide(true);
      clearTimeout(this.zoomingTimer);
      this.view.removeScrollEvent(this.scrollHandler);
      this.setCursorState('canZoom');
      clearTimeout(this.deepZoomTimer);
      this.deepZoom.destroy();
      this.deepZoom = null;
      this.off('getTile');
      this.off('zoomCancelLoadingOfTiles');
      /* start-removable-tile-helper-block */

      if (zoomHelper) {
        zoomHelper.destroy();
        zoomHelper = null;
      }
      /* end-removable-tile-helper-block */


      this.zoomingTimer = null;

      _EventEmitter8.prototype.destroy.call(this);
    };

    return Controller;
  }(EventEmitter);
  /* eslint-env es6 */

  /* global TOUCHEND */

  /* global TOUCH */

  /* global checkRange */

  /* global ZoomMap */

  /* global Controller */

  /* global getPercentValue */

  /* global getDifference */

  /* global checkImagePosition */

  /* global CURSOR_STATES */

  /* global getPercent */

  /* global MOVE */

  /* eslint-disable indent */

  /* eslint-disable no-lonely-if */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars


  var InnerController = function () {
    // const MAX_SCALE_SIZE = 0.9135416666666667;
    // const MIN_SCALE_SIZE = 0.03854166666666667;
    // const MAX_STEP = 0.07;
    // const MAX_STEP = 0.2;
    // const MIN_STEP = 0.2;
    // const MIN_STEP = 0.5;
    // const getStepForAppearance = (scaleSize) => {
    //     let nextStep;
    //     nextStep = Math.abs(MAX_SCALE_SIZE - MIN_SCALE_SIZE) / Math.abs(MAX_STEP - MIN_STEP);
    //     nextStep = MAX_STEP + (MAX_SCALE_SIZE - scaleSize) / nextStep;
    //     return nextStep;
    // };
    var outOfSquare = function (checkedPoint, nodePos, nodeSize, scrollPosition) {
      var result = false;
      var x = nodePos.left - scrollPosition.x;
      var y = nodePos.top - scrollPosition.y;

      if (checkedPoint.x <= x || checkedPoint.y <= y || checkedPoint.x >= x + nodeSize.width || checkedPoint.y >= y + nodeSize.height) {
        result = true;
      }

      return result;
    };

    var IController = /*#__PURE__*/function (_Controller) {
      "use strict";

      bHelpers.inheritsLoose(IController, _Controller);

      function IController(view, o) {
        var _this29;

        _this29 = _Controller.call(this, view, $J.extend({
          map: false,
          mapSize: 50 // in percentage // 100% is 50% from each image side

        }, o)) || this;
        _this29.basePercentOfScale = {
          x: 0,
          y: 0
        };
        _this29.clonedImage = null;
        _this29.hideTimer = null;
        _this29.showTimer = null;
        _this29.map = null;
        _this29.zoomingTimer = null;
        _this29.currentCursorState = 0;
        _this29.innerImagePosition = {
          x: 0,
          y: 0
        };
        _this29.setUpEvent = false;

        if ($J.browser.mobile) {
          _this29.o.pan = true;

          if (_this29.o.trigger === 'hover') {
            _this29.o.trigger = 'click';
          }
        }

        _this29.view.setLensCss(_this29.lensPosition, _this29.lensSize);

        _this29.ANIM_STEP = 0.3;
        return _this29;
      }

      var _proto21 = IController.prototype;

      _proto21.init = function init() {
        _Controller.prototype.init.call(this);

        this.createZoomMap();
      } // private
      ;

      _proto21.createZoomMap = function createZoomMap() {
        var _this30 = this;

        if (!this.o.map) {
          return;
        }

        var mWidth = parseInt(getPercentValue(this.pSize.width / 2, this.o.mapSize), 10);
        var mHeight = parseInt(getPercentValue(this.pSize.height / 2, this.o.mapSize), 10);
        this.map = new ZoomMap(this.view.getContainerForMap(), {
          maxwidth: mWidth,
          maxheight: mHeight
        });
        this.map.setParent(this);
        this.on('zoomGetImage', function (e) {
          e.stopEmptyEvent();
          e.data.map = true;
          e.data.exactSize = true;
        });
        this.on('zoomMapNewPosition', function (e) {
          e.stopAll(); // this.move(
          //     this.pPos.left + getPercentValue(this.lensSize.width, e.data.x),
          //     this.pPos.top + getPercentValue(this.lensSize.height, e.data.y)
          // );

          _this30.setXY(_this30.pPos.left + getPercentValue(_this30.lensSize.width, e.data.x), _this30.pPos.top + getPercentValue(_this30.lensSize.height, e.data.y));

          _this30.calcPositionOfImageInCenter(_this30.scale);

          if (!_this30.o.smoothing) {
            _this30.deepZoomAction();

            _this30.view.setImagePosition(_this30.iPos, _this30.scale);

            if (_this30.map) {
              _this30.map.move(_this30.iPos, _this30.scale);
            }
          }
        });
      } // private
      ;

      _proto21.move = function move(x, y) {
        this.setXY(x, y);
        this.calcPositionOfImage(this.scale);
        this.afterMove();
      } // private
      ;

      _proto21.render = function render(position, scale) {
        _Controller.prototype.render.call(this, position, scale);

        if (this.map) {
          this.map.move(position || this.iDPos, scale || this.dScale);
        }
      } // private
      ;

      _proto21.calcPositionOfImageForPinch = function calcPositionOfImageForPinch(scale) {
        if (!scale) {
          scale = this.dScale;
        }

        var w = this.iSize.width * scale.x;
        var h = this.iSize.height * scale.y;
        var dw = getDifference(this.iSize.width, w);
        var dh = getDifference(this.iSize.height, h);
        var x;
        var y;

        if (w > this.lensSize.width) {
          x = this.x - (getPercentValue(w, this.basePercentOfScale.x) + dw);
          x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
        } else {
          x = this.lensSize.width / 2 - (w / 2 + dw);
        }

        if (h > this.lensSize.height) {
          y = this.y - (getPercentValue(h, this.basePercentOfScale.y) + dh);
          y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
        } else {
          y = this.lensSize.height / 2 - (h / 2 + dh);
        }

        this.iPos = {
          x: x,
          y: y
        };
      };

      _proto21.setScale = function setScale(scale, x, y) {
        if (this.state === globalVariables.APPEARANCE.SHOWN) {
          if ($J.defined(x)) {
            this.setXY(x, y);
          }

          this.scale.x = scale;
          this.scale.y = scale;
          this.scale.x = checkRange(this.scale.x, this.baseScale.x, 1);
          this.scale.y = checkRange(this.scale.y, this.baseScale.y, 1);
          this.calcPositionOfImageForPinch(this.scale);
          this.sendZoomingAction();
          this.setCursorState();

          if (!this.o.smoothing) {
            this.dScale.x = this.scale.x;
            this.dScale.y = this.scale.y;
            this.imageDPosition.x = this.imagePosition.x;
            this.imageDPosition.y = this.imagePosition.y;
            this.deepZoomAction();
            this.view.setImagePosition(this.imagePosition, this.scale);

            if (this.map) {
              this.map.move(this.imagePosition, this.scale);
            }
          }
        }
      } // private
      ;

      _proto21.afterZoom = function afterZoom(lastScale) {
        this.calcPositionOfImageForPinch(this.scale);

        _Controller.prototype.afterZoom.call(this, lastScale);
      } // private
      ;

      _proto21.calcPositionOfImage = function calcPositionOfImage(scale, first, _x, _y) {
        var sw = _x || this.x;
        var sh = _y || this.y;

        if (!scale) {
          scale = this.dScale;
        }

        var w = this.iSize.width * scale.x;
        var h = this.iSize.height * scale.y;
        var dw = getDifference(this.iSize.width, w);
        var dh = getDifference(this.iSize.height, h);
        var x;
        var y; // x = sw - getPercentValue(w, getPercent(sw, this.pSize.width)) - dw;
        // y = sh - getPercentValue(h, getPercent(sh, this.pSize.height)) - dh;
        // x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
        // y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);

        if (w > this.lensSize.width) {
          x = sw - getPercentValue(w, getPercent(sw, this.pSize.width)) - dw;
          x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
        } else {
          x = this.lensSize.width / 2 - (w / 2 + dw);
        }

        if (h > this.lensSize.height) {
          y = sh - getPercentValue(h, getPercent(sh, this.pSize.height)) - dh;
          y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
        } else {
          y = this.lensSize.height / 2 - (h / 2 + dh);
        }

        this.iPos = {
          x: x,
          y: y
        };
      };

      _proto21.calcPositionOfImageInCenter = function calcPositionOfImageInCenter(scale) {
        if (!scale) {
          scale = this.dScale;
        }

        var w = this.iSize.width * scale.x;
        var h = this.iSize.height * scale.y;
        var dw = getDifference(this.iSize.width, w);
        var dh = getDifference(this.iSize.height, h); // let x = this.x / (this.zoomNodeSize.width / w);
        // let y = this.y / (this.zoomNodeSize.height / h);

        var x = this.x / (this.lensSize.width / w);
        var y = this.y / (this.lensSize.height / h);
        x = this.lensSize.width / 2 - x - dw;
        y = this.lensSize.height / 2 - y - dh;
        x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
        y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
        this.iPos = {
          x: x,
          y: y
        };
      };

      _proto21.setBasePercent = function setBasePercent(point) {
        if ($J.contains([globalVariables.APPEARANCE.SHOWN, globalVariables.APPEARANCE.SHOWING], this.state)) {
          var is = this.iSize;
          var cw = is.width * this.scale.x;
          var ch = is.height * this.scale.y;
          var dw = getDifference(is.width, cw);
          var dh = getDifference(is.height, ch);
          this.basePercentOfScale = {
            x: getPercent(Math.abs(this.iPos.x) + this.correctX(point.x) - dw, cw),
            y: getPercent(Math.abs(this.iPos.y) + this.correctY(point.y) - dh, ch)
          };
        }
      };

      _proto21.setImage = function setImage(data) {
        //when will work last block "else" if deepZoom always true!?
        if (this.isShown() || this.isShowing()) {
          if (data.callbackData.map) {
            if (this.map) {
              this.map.setImg(data.src, data.srcset);
            }
          } else {
            _Controller.prototype.setImage.call(this, data);
          }
        }
      } // private
      ;

      _proto21.endOfShowing = function endOfShowing(isWithoutSettingEvents) {
        if (_Controller.prototype.endOfShowing.call(this, isWithoutSettingEvents)) {
          if (this.map) {
            this.map.show();
          }
        }
      };

      _proto21.getImagePosition = function getImagePosition() {
        this.innerImagePosition = {
          x: getDifference(this.lensSize.width, this.zoomNodeSize.width),
          y: getDifference(this.lensSize.height, this.zoomNodeSize.height)
        };
      }
      /*
          public
          toLevel = max || undefined(default), first, zero
      */
      ;

      _proto21.show = function show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
        var _this31 = this;

        if (!_Controller.prototype.show.call(this)) {
          return false;
        }

        this.setUpEvent = actionEndHide;
        this.iSize = {
          width: bigImageOptions.width,
          height: bigImageOptions.height
        };
        this.view.addStartCss();
        this.view.appendNodes(smallImg, this.iSize);
        this.getSizes();
        this.setXY(x, y);
        this.calcSizeOfLens();
        this.getImagePosition();
        this.getBaseScale();
        this.showDeepZoom(bigImageOptions.originWidth, bigImageOptions.originHeight);
        this.showTimer = setTimeout(function () {
          // this timeout helps us to show non tile image without blink (cloned image manages to render)
          _this31.showTimer = null;

          _this31.emit('zoomBeforeShow', {
            data: {}
          });

          if (toLevel && toLevel !== 'max') {
            var scale;

            if (toLevel === 'zero') {
              _this31.scale.x = _this31.baseScale.x;
              _this31.scale.y = _this31.baseScale.y;
            } else {
              scale = _this31.deepZoom.getScale('zoomin');
              _this31.scale.x = scale;
              _this31.scale.y = scale;
            }
          }

          _this31.calcPositionOfImage(_this31.scale, true);

          _this31.view.setEventNodePositionSize(_this31.pPos, _this31.pSize);

          _this31.dScale.x = _this31.baseScale.x;
          _this31.dScale.y = _this31.baseScale.y;
          _this31.iDPos = {
            x: getDifference(_this31.iSize.width, _this31.iSize.width * _this31.dScale.x) * -1 + _this31.innerImagePosition.x,
            y: getDifference(_this31.iSize.height, _this31.iSize.height * _this31.dScale.y) * -1 + _this31.innerImagePosition.y
          };

          _this31.view.setLensCss(_this31.lensPosition, _this31.lensSize);

          _this31.view.setImageSize(_this31.iDPos, _this31.iSize, _this31.dScale);

          _this31.boundaries = _this31.view.getBoundaries();

          if (_this31.map) {
            _this31.map.prepare(_this31.iSize.width, _this31.iSize.height, _this31.pSize.width, _this31.pSize.height);
          }

          if (_this31.o.smoothing && toLevel !== 'zero') {
            _this31.setEvents(); // this.animStep = getStepForAppearance(this.scale.x - this.baseScale.x);


            _this31.animStep = 0.3;

            _this31.animCb = function () {
              _this31.deepZoomAction();

              _this31.endOfShowing(true);
            };
          } else {
            _this31.endOfShowing();
          }

          if (_this31.o.smoothing) {
            _this31.anim.start();
          } // deleted it from this.endOfShowing() function because it sometimes doesn't work


          _this31.sendZoomShownEvent();
        }, 0);
        return true;
      };

      _proto21.hide = function hide(force) {
        var _this32 = this;

        var result = _Controller.prototype.hide.call(this, force);

        if (result) {
          clearTimeout(this.showTimer);

          if (force) {// empty
          } else {
            if (this.scale.x !== this.baseScale.x || this.scale.y !== this.baseScale.y) {
              // this.animStep = getStepForAppearance(this.scale.x - this.baseScale.x);
              this.animStep = 0.4;
              this.scale.x = this.baseScale.x;
              this.scale.y = this.baseScale.y;
              this.iPos = {
                x: getDifference(this.iSize.width, this.iSize.width * this.scale.x) * -1 + this.innerImagePosition.x,
                y: getDifference(this.iSize.height, this.iSize.height * this.scale.y) * -1 + this.innerImagePosition.y
              };

              this.animCb = function () {
                _this32.endOfHiding();
              };
            } else {
              this.endOfHiding();
            }
          }
        }

        return result;
      } // private
      ;

      _proto21.addMouseScrollEvent = function addMouseScrollEvent() {
        var _this33 = this;

        this.view.setEventToWrapper('mousescroll', function (e) {
          e.stop();

          if (_this33.o.pan) {
            var is = _this33.iSize;
            var cw = is.width * _this33.scale.x;
            var ch = is.height * _this33.scale.y;
            var dw = getDifference(is.width, cw);
            var dh = getDifference(is.height, ch);
            _this33.basePercentOfScale = {
              x: getPercent(Math.abs(_this33.iPos.x) + _this33.correctX(e.x) - dw, cw),
              y: getPercent(Math.abs(_this33.iPos.y) + _this33.correctY(e.y) - dh, ch)
            };
          }

          var delta;
          var last = _this33.scale.x;

          if (e.isMouse) {
            var percent = 37;
            var v = e.delta / getPercentValue(e.deltaFactor, percent);
            _this33.scale.x += v;
            _this33.scale.y += v;
          } else {
            delta = e.delta;

            if (Math.abs(delta) > 15) {
              delta = 15;

              if (e.delta < 0) {
                delta *= -1;
              }
            }

            delta /= 350;
            _this33.scale.x += delta;
            _this33.scale.y += delta;
          }

          _this33.scale.x = checkRange(_this33.scale.x, _this33.baseScale.x, 1);
          _this33.scale.y = checkRange(_this33.scale.y, _this33.baseScale.y, 1);

          if (_this33.o.pan) {
            _this33.setXY(e.x, e.y);

            _this33.calcPositionOfImageForPinch(_this33.scale);
          } else {
            _this33.calcPositionOfImage(_this33.scale);
          }

          if (last !== _this33.scale.x) {
            _this33.sendZoomingAction();

            _this33.setCursorState();

            if (!_this33.o.smoothing) {
              _this33.dScale.x = _this33.scale.x;
              _this33.dScale.y = _this33.scale.y;
              _this33.iDPos.x = _this33.iPos.x;
              _this33.iDPos.y = _this33.iPos.y;

              _this33.deepZoomAction();

              _this33.view.setImagePosition(_this33.iPos, _this33.scale);

              if (_this33.map) {
                _this33.map.move(_this33.iPos, _this33.scale);
              }
            }
          }

          _this33.hideByTimer();
        });
      };

      _proto21.hideByTimer = function hideByTimer() {
        var _this34 = this;

        clearTimeout(this.hideTimer);

        if (this.scale.x <= this.baseScale.x + 0.00000001 && this.o.type !== 'outside') {
          this.hideTimer = setTimeout(function () {
            _this34.hide(true);
          }, 1000);
        }
      } // private
      ;

      _proto21.addInnerTouchDrag = function addInnerTouchDrag() {
        var _this35 = this;

        var move = false;
        var lastX;
        var lastY;
        var currentWidth;
        var currentHeight;
        var dw;
        var dh;
        this.view.setEventToWrapper(TOUCH, function (e) {
          e.stop();

          if (e.state === 'dragstart') {
            move = true;

            _this35.view.addEventsCanvasClass(CURSOR_STATES.drag);

            _this35.stopMovingAndZooming(); // this.scale.x = this.dScale.x;
            // this.scale.y = this.dScale.y;


            _this35.setXY(e.x, e.y);

            currentWidth = _this35.iSize.width * _this35.scale.x;
            currentHeight = _this35.iSize.height * _this35.scale.y;
            dw = getDifference(_this35.iSize.width, currentWidth);
            dh = getDifference(_this35.iSize.height, currentHeight);
            lastX = e.x;
            lastY = e.y;
          } else if (e.state === 'dragend') {
            move = false;

            _this35.view.removeEventsCanvasClass(CURSOR_STATES.drag);
          } else if (move) {
            _this35.setXY(e.x, e.y);

            if (currentWidth > _this35.lensSize.width) {
              _this35.iPos.x += e.x - lastX;
              _this35.iPos.x = checkImagePosition(_this35.iPos.x, 0 - dw, dw + currentWidth, _this35.lensSize.width);
            } else {
              _this35.iPos.x = _this35.lensSize.width / 2 - (currentWidth / 2 + dw);
            }

            if (currentHeight > _this35.lensSize.height) {
              _this35.iPos.y += e.y - lastY;
              _this35.iPos.y = checkImagePosition(_this35.iPos.y, 0 - dh, dh + currentHeight, _this35.lensSize.height);
            } else {
              _this35.iPos.y = _this35.lensSize.height / 2 - (currentHeight / 2 + dh);
            }

            if (_this35.o.smoothing && _this35.o.pan) {
              _this35.animStep = 0.3;
            } else {
              _this35.iDPos.x = _this35.iPos.x;
              _this35.iDPos.y = _this35.iPos.y;

              _this35.deepZoomAction();

              _this35.view.setImagePosition(_this35.iPos, _this35.scale);

              if (_this35.map) {
                _this35.map.move(_this35.iPos, _this35.scale);
              }
            }

            lastX = e.x;
            lastY = e.y;
          }
        });
      } // private
      ;

      _proto21.addInnerPinch = function addInnerPinch() {
        var _this36 = this;

        var timer;
        var startScale;
        var saveValue = 1 - this.baseScale.x;
        var scale;
        var maxCompensation;
        var minCompensation;
        var max;
        var min;

        if (!this.o.customZooming) {
          return;
        }

        this.view.setEventToWrapper('pinch', function (e) {
          e.stop();

          if (e.state === 'pinchstart') {
            clearTimeout(timer);

            _this36.stopMovingAndZooming();

            _this36.view.node.removeEvent(TOUCH);

            _this36.scale.x = _this36.dScale.x;
            _this36.scale.y = _this36.dScale.y;
            startScale = _this36.scale.x;
            maxCompensation = 1;
            minCompensation = 1;
            max = 1;
            min = _this36.baseScale.x;

            _this36.setBasePercent(e.centerPoint);
          } else if (e.state === 'pinchresize') {
            _this36.setBasePercent(e.centerPoint);
          } else if (e.state === 'pinchmove') {
            _this36.setXY(e.centerPoint.x, e.centerPoint.y);

            scale = e.scale;
            scale *= startScale;

            if (max < scale) {
              max = scale;
              min = _this36.baseScale.x;
              minCompensation = 1;
              maxCompensation = saveValue / (max - _this36.baseScale.x);
            }

            if (min > scale) {
              min = scale;
              max = 1;
              maxCompensation = 1;
              minCompensation = _this36.baseScale.x / min;
            }

            scale = (_this36.baseScale.x + (scale - _this36.baseScale.x) * maxCompensation) * minCompensation;
            _this36.scale.x = scale;
            _this36.scale.y = scale;
            _this36.scale.x = checkRange(_this36.scale.x, _this36.baseScale.x, 1);
            _this36.scale.y = checkRange(_this36.scale.y, _this36.baseScale.y, 1);

            _this36.calcPositionOfImageForPinch(_this36.scale);

            _this36.sendZoomingAction();

            _this36.setCursorState();

            if (!_this36.o.smoothing) {
              _this36.dScale.x = _this36.scale.x;
              _this36.dScale.y = _this36.scale.y;
              _this36.iDPos.x = _this36.iPos.x;
              _this36.iDPos.y = _this36.iPos.y;

              _this36.deepZoomAction();

              _this36.view.setImagePosition(_this36.iPos, _this36.scale);

              if (_this36.map) {
                _this36.map.move(_this36.iPos, _this36.scale);
              }
            }
          } else if (e.state === 'pinchend') {
            clearTimeout(timer);
            timer = setTimeout(function () {
              _this36.addInnerTouchDrag();
            }, 42);

            if (_this36.scale.x <= _this36.baseScale.x + 0.00000001 && _this36.o.type !== 'outside' && _this36.state !== globalVariables.APPEARANCE.HIDING) {
              clearTimeout(timer);

              _this36.hide(true);
            }
          }
        });
      };

      _proto21.hideZoomByMouseOut = function hideZoomByMouseOut() {
        var _this37 = this;

        var cb = function (e) {
          if (outOfSquare(e.getClientXY(), _this37.view.getContainerPosition(), _this37.view.getContainerSize(), $J.D.getScroll())) {
            _this37.view.removeGlobalEvent();

            _this37.hide();
          }
        };

        this.view.addGlobalEvent(cb);
      } // private
      ;

      _proto21.setEvents = function setEvents() {
        var _this38 = this;

        if (this.setUpEvent && $J.browser.mobile) {
          this.view.setEventToWrapper(TOUCHEND, function (e) {
            e.stop();

            _this38.hide(true);
          });
        }

        if (this.o.customZooming) {
          this.addMouseScrollEvent();
        }

        this.addInnerTouchDrag();
        this.view.removeDragstart();

        if (!this.setUpEvent) {
          this.addInnerPinch();
        }

        if (this.o.trigger !== 'hover') {
          this.addClickEvent();
        } else {
          this.hideZoomByMouseOut();
        }

        if (!this.o.pan && !$J.browser.mobile) {
          this.view.setEventToMainContainer(MOVE, function (e) {
            if (e.pointerType && e.pointerType === 'touch') {
              return;
            }

            e.stop();
            var pageXY = e.getPageXY();

            _this38.move(pageXY.x, pageXY.y);
          });
        }
      } // private
      ;

      _proto21.keepOldPosition = function keepOldPosition(oldLensSize) {
        var x = this.iPos.x;
        var y = this.iPos.y;
        var w = this.iSize.width * this.scale.x;
        var h = this.iSize.height * this.scale.y;
        var dw = getDifference(this.iSize.width, w);
        var dh = getDifference(this.iSize.height, h);
        x -= (oldLensSize.width - this.lensSize.width) / 2;
        y -= (oldLensSize.height - this.lensSize.height) / 2;

        if (w > this.lensSize.width) {
          x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
        } else {
          x = this.lensSize.width / 2 - (w / 2 + dw);
        }

        if (h > this.lensSize.height) {
          y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
        } else {
          y = this.lensSize.height / 2 - (h / 2 + dh);
        }

        this.iPos = {
          x: x,
          y: y
        };
      };

      _proto21.onResize = function onResize() {
        var oldLensSize = this.lensSize;

        _Controller.prototype.onResize.call(this);

        if (this.state !== globalVariables.APPEARANCE.HIDDEN) {
          if (this.state !== globalVariables.APPEARANCE.HIDING) {
            this.keepOldPosition(oldLensSize);
            this.getImagePosition();

            if (this.map) {
              var mWidth = parseInt(getPercentValue(this.pSize.width / 2, this.o.mapSize), 10);
              var mHeight = parseInt(getPercentValue(this.pSize.height / 2, this.o.mapSize), 10);
              this.map.resize(mWidth, mHeight, this.iSize.width, this.iSize.height, this.pSize.width, this.pSize.height);

              if (!this.o.smoothing) {
                this.map.move(this.iPos, this.scale);
              }
            }
          }
        }
      };

      _proto21.destroy = function destroy() {
        clearTimeout(this.showTimer);

        if (this.map) {
          this.map.destroy();
          this.map = null;
          this.off('zoomGetImage');
          this.off('zoomMapNewPosition');
        }

        _Controller.prototype.destroy.call(this);
      };

      return IController;
    }(Controller);

    return IController;
  }();
  /* eslint-env es6 */

  /* global getDifference */

  /* global TOUCHEND */

  /* global TOUCH */

  /* global getPercent */

  /* global Controller */

  /* global getPercentValue */

  /* global MOVE */

  /* global checkRange */

  /* eslint-disable indent */

  /* eslint-disable no-lonely-if */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line


  var MagnifierController = function () {
    var MIN_SIZE_OF_LENS = 10;
    var MAX_SIZE_OF_LENS = 90;
    var DEFAULT_MAGNIFIER_SIZE = 70; // percent

    var DEFAULT_MOBILE_MAGNIFIER_ZOOM_MARGIN = 65;

    var checkMinMax = function (size) {
      var factor;

      if (size.width >= size.height) {
        factor = size.width / size.height;
      } else {
        factor = size.height / size.width;
      }

      var min = MIN_SIZE_OF_LENS;
      var max = MAX_SIZE_OF_LENS;

      if (factor > max / min) {
        return {
          width: 50,
          height: 50
        };
      }

      if (size.width < min) {
        size.height = min * (size.height / size.width);
        size.width = min;
      }

      if (size.height < min) {
        size.width = min * (size.width / size.height);
        size.height = min;
      }

      if (size.width > max) {
        size.height = max * (size.height / size.width);
        size.width = max;
      }

      if (size.height > max) {
        size.width = max * (size.width / size.height);
        size.height = max;
      }

      return size;
    }; // eslint-disable-next-line no-unused-vars


    var MController = /*#__PURE__*/function (_Controller2) {
      "use strict";

      bHelpers.inheritsLoose(MController, _Controller2);

      function MController(view, o) {
        var _this39;

        if ($J.browser.mobile && o.margin === 9) {
          delete o.margin;
        }

        _this39 = _Controller2.call(this, view, $J.extend({
          width: 70,
          // percent
          height: 70,
          // percent
          margin: DEFAULT_MOBILE_MAGNIFIER_ZOOM_MARGIN
        }, o)) || this;
        _this39.setUpEvent = false;
        _this39.isSquare = true;
        _this39.ANIM_STEP = 0.4;
        return _this39;
      }

      var _proto22 = MController.prototype;

      _proto22.init = function init() {
        _Controller2.prototype.init.call(this);

        this.setLensSize();
      } // private
      ;

      _proto22.setLensSize = function setLensSize() {
        var s = {
          width: this.o.width,
          height: this.o.height
        };

        if (s.width === s.height) {
          this.isSquare = true;
        }

        if ($J.contains([s.width, s.height], 'auto')) {
          this.isSquare = true;

          if (s.width === 'auto') {
            if (s.height !== 'auto') {
              s.height = this.getPercentSize(s.height, 'height');
              s.width = s.height;
            } else {
              s.height = DEFAULT_MAGNIFIER_SIZE;
              s.width = s.height;
            }
          } else if (s.width !== 'auto') {
            s.width = this.getPercentSize(s.width, 'width');
            s.height = s.width;
          } else {
            s.height = DEFAULT_MAGNIFIER_SIZE;
            s.width = s.height;
          }
        } else {
          s.width = this.getPercentSize(s.width, 'width');
          s.height = this.getPercentSize(s.height, 'height');
        }

        this.currentLensSize = checkMinMax({
          width: s.width,
          height: s.height
        });
        this.ANIM_STEP = 0.6;
      } // private
      ;

      _proto22.calcSizeOfLens = function calcSizeOfLens() {
        if (this.isSquare) {
          var ps = this.pSize;
          var cls = this.currentLensSize;
          var value = getPercentValue(Math.min(ps.width, ps.height), cls.width);
          this.setSizeOfLens(value, value);
        } else {
          _Controller2.prototype.calcSizeOfLens.call(this);
        }
      } // private
      ;

      _proto22.calcPositionOfLens = function calcPositionOfLens() {
        var ps = this.pSize;
        var margin = this.o.margin; //eslint-disable-next-line no-unused-vars
        // let lensPositionState = 'top'; // top left right bottom;

        if (margin < 0) {
          margin = 0;
        }

        if (this.x < 0) {
          this.x = 0;
        }

        if (this.y < 0) {
          this.y = 0;
        }

        if (this.x > ps.width) {
          this.x = ps.width;
        }

        if (this.y > ps.height) {
          this.y = ps.height;
        }

        var top;
        var left;
        top = this.y - this.lensHalfSize.height;
        left = this.x - this.lensHalfSize.width; // if (!$J.browser.mobile) {
        //     margin = 0;
        // }

        var scroll;
        var ws;
        var pp = this.pPos;

        if ($J.browser.mobile) {
          top -= margin;
          scroll = $($J.W).getScroll();
          ws = $($J.W).getSize();

          if (pp.top + top < scroll.y) {
            if (pp.left + this.x - this.lensSize.width - margin > scroll.x) {
              // lensPositionState = 'left';
              top = this.y - this.lensHalfSize.height;
              left = this.x - this.lensSize.width - margin;
            } else if (pp.left + this.x + this.lensSize.width + margin < scroll.x + ws.width) {
              // lensPositionState = 'right';
              top = this.y - this.lensHalfSize.height;
              left = this.x + margin;
            } else if (scroll.y + ws.height > pp.top + this.y + margin + this.lensSize.height) {
              // lensPositionState = 'bottom';
              top = this.y + margin;
            }
          }
        } // if ($J.contains(['top', 'bottom'], lensPositionState) && !$J.browser.mobile) {
        //     if (pp.left + left < scroll.x) {
        //         left = scroll.x - pp.left;
        //     }
        //     if (pp.left + left + this.lensSize.width > scroll.x + ws.width) {
        //         left = scroll.x - pp.left + ws.width - this.lensSize.width;
        //     }
        // }


        this.lensPosition = {
          top: top,
          left: left
        };
      };

      _proto22.calcPositionOfImage = function calcPositionOfImage(scale, first, _x, _y) {
        var sw = _x || this.x;
        var sh = _y || this.y;
        var x = this.lensHalfSize.width - getPercentValue(this.iSize.width, getPercent(sw, this.pSize.width));
        var y = this.lensHalfSize.height - getPercentValue(this.iSize.height, getPercent(sh, this.pSize.height));
        this.iPos = {
          x: x,
          y: y
        };
      } // private
      ;

      _proto22.getPercentSize = function getPercentSize(value, side) {
        if (/%$/.test(value)) {
          value = parseInt(value, 10);
        } else {
          value = parseInt(value, 10);
          value /= this.pSize[side] / 100;
        }

        return value;
      } // private
      ;

      _proto22.setEvents = function setEvents() {
        var _this40 = this;

        if (this.setUpEvent && !this.o.pan) {
          this.view.setEventToMainContainer(TOUCHEND, function (e) {
            e.stop();

            _this40.hide(true);
          });
        }

        if (this.o.customZooming) {
          this.addMouseScroollEvent();
        }

        this.addMouseOverEvent();

        if (this.o.trigger === 'hover') {
          this.addMouseOutEvent();
        }

        if (this.o.pan) {
          this.addDragEvent();
        }

        if ($J.browser.mobile) {
          this.addTapEvent();
        }

        if (this.o.trigger !== 'hover') {
          this.addClickEvent();
        }

        if (!this.o.pan && !$J.browser.mobile) {
          this.view.setEventToMainContainer(MOVE, function (e) {
            if (e.pointerType && e.pointerType === 'touch') {
              return;
            }

            e.stop();
            var pageXY = e.getPageXY();

            _this40.move(pageXY.x, pageXY.y);

            if (_this40.x <= 0 || _this40.y <= 0 || _this40.x >= _this40.pSize.width || _this40.y >= _this40.pSize.height) {
              _this40.hide();
            }
          });
        }
      };

      _proto22.afterMove = function afterMove() {
        this.calcPositionOfLens();
        this.calcPositionOfImage(this.scale);
        this.view.setLensPosition(this.lensPosition);

        _Controller2.prototype.afterMove.call(this);
      } // private
      ;

      _proto22.changeLensSize = function changeLensSize(size) {
        var min = MIN_SIZE_OF_LENS;
        var max = MAX_SIZE_OF_LENS;
        size.width = checkRange(size.width, min, max);
        size.height = checkRange(size.height, min, max);

        if (size.width !== this.currentLensSize.width) {
          this.currentLensSize.width = size.width;
          this.currentLensSize.height = size.height;
          this.calcSizeOfLens();
          this.calcPositionOfLens();
          this.calcPositionOfImage();
          this.iDPos.x = this.iPos.x;
          this.iDPos.y = this.iPos.y;
          this.deepZoomAction(false, this.lensSize);
          this.view.setImagePosition(this.iPos, this.scale);
          this.view.setLensPosition(this.lensPosition);
          this.view.setLensSize(this.lensSize);
        }
      } // private
      ;

      _proto22.addMouseScroollEvent = function addMouseScroollEvent() {
        var _this41 = this;

        this.view.setEventToWrapper('mousescroll', function (e) {
          e.stop();
          var i;
          var delta = e.delta;
          var s = {
            width: 0,
            height: 0
          };

          if (_this41.isSquare) {
            for (i in s) {
              if ({}.hasOwnProperty.call(s, i)) {
                s[i] = _this41.currentLensSize[i] + delta;
              }
            }
          } else {
            i = _this41.currentLensSize.height / _this41.currentLensSize.width;
            s.width = _this41.currentLensSize.width + delta;
            s.height = _this41.currentLensSize.height + delta * i;
          }

          _this41.changeLensSize(s);
        });
      } // private
      ;

      _proto22.addMouseOverEvent = function addMouseOverEvent() {
        var _this42 = this;

        this.view.setEventToMainContainer('mouseover', function (e) {
          e.stop();
          var pageXY = e.getPageXY();

          _this42.setXY(pageXY.x, pageXY.y);

          _this42.calcPositionOfLens();

          _this42.calcPositionOfImage();

          _this42.view.setLensPosition({
            top: _this42.lensPosition.top,
            left: _this42.lensPosition.left
          });

          _this42.view.setImagePosition(_this42.iPos, _this42.scale);
        });
      } // private
      ;

      _proto22.addMouseOutEvent = function addMouseOutEvent() {
        var _this43 = this;

        this.view.setEventToWrapper('mouseout', function (e) {
          // let toElement = e.toElement || e.relatedTarget;
          var toElement = e.getRelated(); // if we change between workspace we must to hide the lens
          // if (!toElement) { return; }

          while (toElement && toElement !== _this43.node && toElement !== _this43.lensContainer && toElement !== _this43.eventsCanvasNode) {
            toElement = toElement.parentNode;
          }

          if (_this43.node !== toElement && _this43.eventsCanvasNode !== toElement) {
            var p = e.getClientXY();

            if (p.x < _this43.boundaries.left || p.x > _this43.boundaries.right || p.y < _this43.boundaries.top || p.y > _this43.boundaries.bottom) {
              e.stop();

              if (_this43.o.smoothing) {
                _this43.hide();
              } else {
                _this43.hide(true);
              }
            }
          }
        });
      } // private
      ;

      _proto22.addDragEvent = function addDragEvent() {
        var _this44 = this;

        var move = false;
        this.view.setEventToMainContainer(TOUCH, function (e) {
          e.stop();

          if (e.state === 'dragstart') {
            move = true;
          } else if (e.state === 'dragend') {
            move = false;
          } else if (move) {
            _this44.move(e.x, e.y);
          }
        });
      } // private
      ;

      _proto22.addTapEvent = function addTapEvent() {
        var _this45 = this;

        this.view.setEventToMainContainer(this.o.trigger === 'dblclick' ? 'dbltap' : 'tap', function (e) {
          e.stop();

          if (_this45.o.smoothing) {
            _this45.hide();
          } else {
            _this45.hide(true);
          }
        });
      };

      _proto22.hide = function hide(force) {
        var _this46 = this;

        var result = _Controller2.prototype.hide.call(this, force);

        if (result) {
          if (force) {// empty
          } else {
            this.view.setEventToWrapper('transitionend', function (e) {
              e.stop();

              _this46.view.removeEventFromWrapper('transitionend');

              _this46.endOfHiding();
            });
            this.view.setLensStyle({
              transition: 'opacity .2s linear, transform .2s linear',
              opacity: 0,
              transform: 'scale(0)'
            });
          }
        }

        return result;
      }
      /*
          public
          toLevel = max || undefined(default), first, zero
      */
      ;

      _proto22.show = function show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
        var _this47 = this;

        if (!_Controller2.prototype.show.call(this)) {
          return false;
        }

        this.emit('zoomBeforeShow', {
          data: {}
        });
        this.setUpEvent = actionEndHide;
        this.iSize = {
          width: bigImageOptions.width,
          height: bigImageOptions.height
        };
        this.view.addStartCss();
        this.view.appendNodes(smallImg, this.iSize);
        this.getSizes();
        this.setXY(x, y);
        this.calcSizeOfLens();
        this.calcPositionOfLens(); // this.getImagePosition();

        this.getBaseScale();
        this.showDeepZoom(bigImageOptions.originWidth, bigImageOptions.originHeight); // this.calcPositionOfImage(false, true);

        this.calcPositionOfImage(this.scale, true);
        this.view.setEventNodePositionSize(this.pPos, this.pSize);
        this.dScale.x = this.baseScale.x;
        this.dScale.y = this.baseScale.y;
        this.iDPos = {
          x: getDifference(this.iSize.width, this.iSize.width * this.dScale.x) * -1 - this.lensPosition.left,
          y: getDifference(this.iSize.height, this.iSize.height * this.dScale.y) * -1 - this.lensPosition.top
        };
        this.view.setLensCss(this.lensPosition, this.lensSize, 'opacity .15s linear, transform .15s linear');
        this.view.setImageSize(this.iDPos, this.iSize, this.dScale);
        this.boundaries = this.view.getBoundaries();

        if (this.o.smoothing) {
          this.view.setEventToWrapper('transitionend', function (e) {
            e.stop();

            _this47.view.removeEventFromWrapper('transitionend');

            _this47.view.setLensStyle({
              transition: ''
            });

            _this47.sendZoomShownEvent();
          });
          this.endOfShowing();
          this.anim.start();
        } else {
          this.endOfShowing();
          this.sendZoomShownEvent();
        } // deleted it from this.endOfShowing() function because it sometimes doesn't work
        // this.sendZoomShownEvent();


        return true;
      };

      return MController;
    }(Controller);

    return MController;
  }();
  /* eslint-env es6 */

  /* global checkRange */

  /* global TOUCH */

  /* global getDifference */

  /* global Eye */

  /* global getPercentValue */

  /* global helper */

  /* global Controller */

  /* global checkImagePosition */

  /* eslint-disable indent */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars


  var OutsideController = function () {
    var DEFAULT_OUTSIDE_ZOOM_MARGIN = 9; // px

    var OController = /*#__PURE__*/function (_Controller3) {
      "use strict";

      bHelpers.inheritsLoose(OController, _Controller3);

      function OController(view, o) {
        var _this48;

        _this48 = _Controller3.call(this, view, $J.extend({
          margin: DEFAULT_OUTSIDE_ZOOM_MARGIN,
          outsidePosition: 'right',
          // top, left, right, bottom
          width: 100,
          // percent
          height: 100 // percent

        }, o)) || this;
        _this48.showingParams = null;
        _this48.eye = new Eye(_this48.view.getNodeForEye(), _this48.o.trigger === 'hover');
        _this48.ANIM_STEP = 0.18;
        _this48.mouseOutHandler = _this48.mouseOut.bind(bHelpers.assertThisInitialized(_this48));
        return _this48;
      }

      var _proto23 = OController.prototype;

      _proto23.getBoundaries = function getBoundaries() {
        this.boundaries = this.eye.getBoundaries();
      };

      _proto23.init = function init() {
        _Controller3.prototype.init.call(this);

        this.setLensSize();
      } // private
      ;

      _proto23.setEyesParams = function setEyesParams() {
        var sw = this.currentLensSize.width / (this.iSize.width * this.scale.x);
        var sh = this.currentLensSize.height / (this.iSize.height * this.scale.y);
        this.eye.setSize({
          width: sw * this.zoomNodeSize.width,
          height: sh * this.zoomNodeSize.height
        });
        this.eye.setPosition(this.x, this.y);
      };

      _proto23.calcPositionOfLens = function calcPositionOfLens() {
        var margin = this.o.margin;
        var ps = this.pSize;
        var pp = this.pPos;

        if (margin < 0) {
          margin = 0;
        }

        var t = pp.top;
        var l = pp.left;

        switch (this.o.outsidePosition) {
          case 'top':
            t += (this.lensSize.height + margin) * -1;
            break;

          case 'left':
            l += (this.lensSize.width + margin) * -1;
            break;

          case 'right':
            l += ps.width + margin;
            break;

          case 'bottom':
            t += ps.height + margin;
            break;
          //no default
        }

        this.lensPosition = {
          top: t,
          left: l
        };
      };

      _proto23.calcPositionOfImage = function calcPositionOfImage(scale) {
        if (!scale) {
          scale = this.dScale;
        }

        var w = this.iSize.width * scale.x;
        var h = this.iSize.height * scale.y;
        var dw = getDifference(this.iSize.width, w);
        var dh = getDifference(this.iSize.height, h);
        var x = this.x / (this.zoomNodeSize.width / w);
        var y = this.y / (this.zoomNodeSize.height / h);
        x = this.lensSize.width / 2 - x - dw;
        y = this.lensSize.height / 2 - y - dh;
        x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
        y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
        this.iPos = {
          x: x,
          y: y
        };
      };

      _proto23.afterMove = function afterMove() {
        this.calcPositionOfLens();
        this.calcPositionOfImage(this.scale);
        this.setEyesParams();
        this.view.setLensPosition(this.lensPosition);

        _Controller3.prototype.afterMove.call(this);
      };

      _proto23.hide = function hide(force) {
        var result = _Controller3.prototype.hide.call(this, force);

        if (result) {
          if (!$J.browser.mobile) {
            this.view.removeMouseMoveEvent(this.mouseOutHandler);
          }

          this.eye.clearEvents();
          this.eye.hide();

          if (force) {// empty
          } else {
            this.view.removeEvents();
            this.endOfHiding();
          }
        }

        return result;
      } // private
      ;

      _proto23.getShowingPropertiesToOutsideMode = function getShowingPropertiesToOutsideMode() {
        var result = {
          start: {
            x: 0,
            y: 0
          },
          end: {
            x: 0,
            y: 0
          }
        };

        switch (this.o.outsidePosition) {
          case 'top':
            result.start.y = 10;
            result.end.y = 0;
            break;

          case 'left':
            result.start.x = 10;
            result.end.x = 0;
            break;

          case 'right':
            result.start.x = -10;
            result.end.x = 0;
            break;

          case 'bottom':
            result.start.y = -10;
            result.end.y = 0;
            break;
          // no default
        }

        return result;
      } // private
      ;

      _proto23.endOfShowing = function endOfShowing() {
        _Controller3.prototype.endOfShowing.call(this);

        this.getBoundaries();
      }
      /*
          public
          toLevel = max || undefined(default), first, zero
      */
      ;

      _proto23.show = function show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
        if (!_Controller3.prototype.show.call(this)) {
          return false;
        }

        this.emit('zoomBeforeShow', {
          data: {}
        });
        this.iSize = {
          width: bigImageOptions.width,
          height: bigImageOptions.height
        };
        this.showingParams = this.getShowingPropertiesToOutsideMode();
        this.view.addStartCss(this.showingParams);
        this.view.appendNodes(smallImg, this.iSize);
        this.getSizes();
        this.setXY(x, y);
        this.calcSizeOfLens();
        this.calcPositionOfLens(); // this.getImagePosition();

        this.getBaseScale();
        this.showDeepZoom(bigImageOptions.originWidth, bigImageOptions.originHeight); // this.calcPositionOfImage(false, true);

        this.calcPositionOfImage(this.scale, true);
        this.view.setEventNodePositionSize(this.pPos, this.pSize);
        this.dScale.x = this.baseScale.x;
        this.dScale.y = this.baseScale.y;
        this.iDPos = {
          x: getDifference(this.iSize.width, this.iSize.width * this.dScale.x) * -1,
          y: getDifference(this.iSize.height, this.iSize.height * this.dScale.y) * -1
        };
        this.view.setLensCss(this.lensPosition, this.lensSize, this.o.smoothing ? 'opacity .4s linear, transform .15s ease-in' : 'none');
        this.view.setImageSize(this.iDPos, this.iSize, this.dScale);

        if (this.o.smoothing || toLevel === 'zero') {
          this.endOfShowing();
        }

        this.eye.show(this.view.getImageForEye());
        this.getBoundaries();
        this.setEyesParams();
        this.animStep = 0.3;

        if (this.o.smoothing) {
          this.anim.start();
        } else {
          this.endOfShowing();
        } // deleted it from this.endOfShowing() function because it sometimes doesn't work


        this.sendZoomShownEvent();
        return true;
      };

      _proto23.setLensSize = function setLensSize() {
        var s = {
          width: this.o.width,
          height: this.o.height
        };

        if (s.width === 'auto') {
          s.width = this.pSize.width;
        } else if (/%$/.test(this.o.width)) {
          s.width = this.pSize.width / 100 * parseInt(this.o.width, 10);
        } else {
          s.width = parseInt(s.width, 10);
        }

        if (s.height === 'auto') {
          s.height = this.pSize.height;
        } else if (/%$/.test(this.o.height)) {
          s.height = this.pSize.height / 100 * parseInt(this.o.height, 10);
        } else {
          s.height = parseInt(s.height, 10);
        }

        this.currentLensSize = {
          width: s.width,
          height: s.height
        };
      };

      _proto23.calcSizeOfLens = function calcSizeOfLens() {
        var cls = this.currentLensSize;
        this.lensSize = {
          width: cls.width,
          height: cls.height
        };
        this.lensHalfSize = {
          width: this.lensSize.width / 2,
          height: this.lensSize.height / 2
        };
      } // private
      ;

      _proto23.setEvents = function setEvents() {
        var _this49 = this;

        if ($J.browser.mobile && this.o.pan) {
          this.addOutsideTouchDrag();
        } // TODO maybe remove it


        if (!$J.browser.mobile && $J.browser.touchScreen && helper.isIe()) {
          if (!this.o.pan) {
            this.eye.setEventToMainContainer('pointerup', function (e) {
              _this49.hide();
            });
          }
        }

        this.eye.setEventToMainContainer('mousemove', function (e) {
          e.stop();
          var pageXY = e.getPageXY();

          _this49.move(pageXY.x, pageXY.y);
        });

        if (this.o.trigger === 'hover') {
          if (!$J.browser.mobile) {
            this.view.addMouseMoveEvent(this.mouseOutHandler);
          }

          this.eye.setEventToMainContainer('mouseout', this.mouseOutHandler);
        } else {
          var eventName = 'btnclick tap';

          if (this.o.trigger === 'dblclick') {
            eventName = 'dblbtnclick dbltap';
          }

          this.eye.setEventToMainContainer(eventName, function (e) {
            _this49.hide();
          });
        }

        if (this.o.customZooming) {
          this.setMouseScrollEvent();
        }
      };

      _proto23.mouseOut = function mouseOut(e) {
        var p = e.getClientXY();

        if (p.x < this.boundaries.left || p.x > this.boundaries.right || p.y < this.boundaries.top || p.y > this.boundaries.bottom) {
          this.hide(!this.getZoomData());
        }
      } // private
      // it works if trigger !== 'hover'
      ;

      _proto23.addOutsideTouchDrag = function addOutsideTouchDrag() {
        var _this50 = this;

        var isStart = false;
        this.eye.setEventToMainContainer(TOUCH, function (e) {
          e.stop();

          if (e.state === 'dragstart') {
            isStart = true;
          } else if (e.state === 'dragend') {
            isStart = false;
          } else if (isStart) {
            _this50.move(e.x, e.y);
          }
        });
      } // private
      ;

      _proto23.setMouseScrollEvent = function setMouseScrollEvent() {
        var _this51 = this;

        this.eye.setEventToMainContainer('mousescroll', function (e) {
          var last = _this51.scale.x;
          var delta;
          e.stop();

          if (e.isMouse) {
            var percent = 37;
            var v = e.delta / getPercentValue(e.deltaFactor, percent);
            _this51.scale.x += v;
            _this51.scale.y += v;
          } else {
            delta = e.delta;

            if (Math.abs(delta) > 15) {
              delta = 15;

              if (e.delta < 0) {
                delta *= -1;
              }
            }

            delta /= 350;
            _this51.scale.x += delta;
            _this51.scale.y += delta;
          }

          _this51.scale.x = checkRange(_this51.scale.x, _this51.baseScale.x, 1);
          _this51.scale.y = checkRange(_this51.scale.y, _this51.baseScale.y, 1);

          _this51.calcPositionOfImage(_this51.scale);

          if (last !== _this51.scale.x) {
            _this51.sendZoomingAction();

            _this51.setCursorState();

            if (!_this51.o.smoothing) {
              _this51.dScale.x = _this51.scale.x;
              _this51.dScale.y = _this51.scale.y;
              _this51.iDPos.x = _this51.iPos.x;
              _this51.iDPos.y = _this51.iPos.y;

              _this51.deepZoomAction();

              _this51.setImagePosition(_this51.iPos, _this51.scale);
            }

            _this51.setEyesParams();
          }
        });
      };

      _proto23.setLensStyleOnResize = function setLensStyleOnResize() {
        this.view.setLensPosition(this.lensPosition);
        this.view.setCanvasNodeSize(this.lensSize);
      };

      _proto23.onResize = function onResize() {
        _Controller3.prototype.onResize.call(this);

        if (this.state !== globalVariables.APPEARANCE.HIDDEN && this.state !== globalVariables.APPEARANCE.HIDING) {
          this.eye.resize();
        }
      };

      _proto23.destroy = function destroy() {
        this.eye.destroy();
        this.view.removeMouseMoveEvent(this.mouseOutHandler);

        _Controller3.prototype.destroy.call(this);
      };

      return OController;
    }(Controller);

    return OController;
  }();
  /* eslint-env es6 */

  /* global InnerView */

  /* global EventEmitter */

  /* global InnerController */

  /* global MagnifierController */

  /* global MagnifierView */

  /* global OutsideController */

  /* global OutsideView */

  /* eslint-disable indent */

  /* eslint no-unused-vars: ["error", { "args": "none" }] */

  /* eslint guard-for-in: "off"*/

  /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
  // eslint-disable-next-line no-unused-vars


  var ImageZoom = /*#__PURE__*/function (_EventEmitter9) {
    "use strict";

    bHelpers.inheritsLoose(ImageZoom, _EventEmitter9);

    function ImageZoom(parentNode, o) {
      var _this52;

      _this52 = _EventEmitter9.call(this) || this;
      _this52.zoomType = o.type;

      if (o.type === 'inner') {
        _this52.view = new InnerView(parentNode);

        _this52.view.addClassToWrapper('inner');

        _this52.controller = new InnerController(_this52.view, o);
      } else if ($J.contains(['circle', 'square'], o.type)) {
        _this52.view = new MagnifierView(parentNode);

        _this52.view.addClassToWrapper(o.type);

        _this52.controller = new MagnifierController(_this52.view, o);
      } else {
        // outside
        _this52.view = new OutsideView(parentNode);

        _this52.view.addClassToWrapper('outside');

        _this52.controller = new OutsideController(_this52.view, o);
      }

      _this52.controller.setParent(bHelpers.assertThisInitialized(_this52));

      _this52.controller.init();

      return _this52;
    }

    var _proto24 = ImageZoom.prototype;

    _proto24.setLensContainer = function setLensContainer(lensContainer) {
      this.controller.setLensContainer(lensContainer);
    };

    _proto24.isShown = function isShown() {
      return this.controller.isShown();
    };

    _proto24.getZoomData = function getZoomData(scale) {
      return this.controller.getZoomData(scale);
    };

    _proto24.getNextMinZoom = function getNextMinZoom() {
      return this.controller.getNextMinZoom();
    };

    _proto24.getNextMaxZoom = function getNextMaxZoom() {
      return this.controller.getNextMaxZoom();
    };

    _proto24.zoomUp = function zoomUp(x, y) {
      return this.controller.zoomUp(x, y);
    };

    _proto24.zoomDown = function zoomDown(x, y) {
      return this.controller.zoomDown(x, y);
    };

    _proto24.showCenter = function showCenter(smallImg, largeImg, toLevel) {
      return this.controller.showCenter(smallImg, largeImg, toLevel);
    };

    _proto24.isShowing = function isShowing() {
      return this.controller.isShowing();
    };

    _proto24.setImage = function setImage(data) {
      this.controller.setImage(data);
    };

    _proto24.show = function show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
      return this.controller.show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel);
    };

    _proto24.hide = function hide(force) {
      return this.controller.hide(force);
    };

    _proto24.customMove = function customMove(x, y) {
      this.controller.customMove(x, y);
    };

    _proto24.getBaseScale = function getBaseScale() {
      return this.controller.baseScale;
    };

    _proto24.setBasePercent = function setBasePercent(point) {
      if (this.zoomType === 'inner') {
        this.controller.setBasePercent(point);
      }
    };

    _proto24.setScale = function setScale(scale, x, y) {
      if (this.zoomType === 'inner') {
        this.controller.setScale(scale, x, y);
      }
    };

    _proto24.onResize = function onResize() {
      this.controller.onResize();
    };

    _proto24.destroy = function destroy() {
      this.view.destroy();
      this.controller.destroy();
    };

    return ImageZoom;
  }(EventEmitter);

  return ImageZoom;
});
//# sourceMappingURL=imagezoom.js.map
