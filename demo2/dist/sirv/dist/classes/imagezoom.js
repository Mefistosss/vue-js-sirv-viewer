Sirv.define(
    'ImageZoom',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','EventEmitter'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,EventEmitter) => {
        const moduleName = 'ImageZoom';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* global helper */
/* eslint-disable no-unused-vars */

const CURSOR_STATES = {
    canZoom: 'PREFIX-cursor-zoom',
    zoomIn: 'PREFIX-cursor-zoom-in',
    zoomOut: 'PREFIX-cursor-zoom-out',
    drag: 'PREFIX-cursor-dragging'
};

const TOUCH = 'mousedrag touchdrag';
const TOUCHEND = helper.isIe() ? 'pointerup' : 'touchend';

let MOVE = 'mousemove';
if (helper.isIe()) {
    MOVE = 'pointermove';
}

const getPercentValue = (value, percent) => { return value / 100 * percent; };

const getDifference = (bigValue, smallValue) => { return (bigValue - smallValue) / 2; };

const checkImagePosition = (value, minPos, maxPos, lensSize) => {
    if (value > minPos) { value = minPos; }
    if (value + maxPos < lensSize) { value = lensSize - maxPos; }
    return value;
};

const getPercent = (value, size) => { return value / size * 100; };

const checkRange = (value, min, max) => {
    if (value < min) { value = min; }
    if (value > max) { value = max; }
    return value;
};

const calcScale = (baseSize, currentSize) => { return currentSize / baseSize; };

const getLevels = (minSize, maxSize) => {
    let levelsNumber = Math.max(1, Math.round(Math.log(Math.max(maxSize.width / minSize.width, maxSize.height / minSize.height)) / Math.LN2));
    let levelWidth = maxSize.width;
    let levelHeight = maxSize.height;

    const result = [];
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
class ZoomHelper extends EventEmitter {
    constructor(options) {
        super();
        this.o = $J.extend({
            maxTileSize: 15,
            minTileSize: 5
        }, options || {});

        this.inDoc = false;
        this.container = $J.$new('div').addClass('zoom-helper');
        this.header = $J.$new('div').addClass('z-helper-head');
        this.zoom = $J.$new('span').addClass('z-zoom');

        this.tileSize = { width: 0, height: 0 };
        this.levels = {};
    }

    _createHead() {
        let tmp = $J.$new('div');
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
    }

    _calcSizeOfTile(levelSize) {
        const getSize = (sizeOfPart, aspectRatio) => {
            let result = parseInt(sizeOfPart * aspectRatio, 10);

            if (result < this.o.minTileSize) {
                result = this.o.minTileSize;
            }

            return result;
        };

        let w;
        let h;

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
    }

    _createTile(c, r, options) {
        const getSize = (isLast, size) => {
            return isLast ? ((() => {
                let s = parseInt(size / 2, 10);
                if (s < 3) { s = 3; }
                return s;
            })()) : size;
        };
        const checkSize = (l, t) => { return l % t < t / 2; };
        const w = getSize(options.cols - 1 === c && checkSize(options.levelSize.width, options.tileSize.width), this.tileSize.width);
        const h = getSize(options.rows - 1 === r && checkSize(options.levelSize.height, options.tileSize.height), this.tileSize.height);
        const node = $J.$new('div').addClass('z-tile');

        node.setCss({
            top: (r * this.tileSize.height) + 'px',
            left: (c * this.tileSize.width) + 'px',
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
    }

    _show(level) {
        if (!level) { return; }

        if (!this.inDoc) {
            this.inDoc = true;
            this._createHead();
            this.container.append(this.header);
            $($J.D.node.body).append(this.container);
        }

        if (!level.inDoc) {
            level.inDoc = true;
            this.container.append(level.node);

            this.container.setCssProp('max-height', ($J.W.innerHeight - 55) + 'px');
        }
    }

    _setItemClass(level, col, row, _class) {
        const tile = level.tiles[row][col];

        if (tile.currentClass !== _class) {
            if (tile.currentClass) {
                tile.node.removeClass(tile.currentClass);
            }
            tile.currentClass = _class;
            tile.node.addClass(_class);
        }
    }

    setZoom(zoom) {
        // zoom = zoom + '';
        zoom += '';
        if (zoom.length < 2) { zoom += '.0'; }
        this.zoom.innerHTML = zoom;
    }

    createLevel(options) {
        const node = $J.$new('div').addClass('z-level');
        const body = $J.$new('div').addClass('z-body');

        const createTiles = (cols, rows) => {
            let i;
            let j;
            const arr = [];

            for (j = 0; j < rows; j++) {
                const arr2 = [];
                for (i = 0; i < cols; i++) {
                    const tile = this._createTile(i, j, options);
                    body.append(tile.node);
                    arr2.push(tile);
                }
                arr.push(arr2);
            }

            return arr;
        };

        const head = $J.$new('div').addClass('z-head');
        const statusContainer = $J.$new('div').addClass('z-status');

        let tmp = $J.$new('div');
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

        const tiles = createTiles(options.cols, options.rows);

        const last = tiles[options.rows - 1][options.cols - 1];

        body.setCss({
            width: ((options.cols - 1) * this.tileSize.width + last.width) + 'px',
            height: ((options.rows - 1) * this.tileSize.height + last.height) + 'px'
        });

        this.levels[options.level] = {
            inDoc: false,
            number: options.level,
            status: statusContainer,
            node: node,
            head: head,
            body: body,
            tiles: tiles
        };

        // this._show(this.levels[options.level]);
    }

    tileAction(data) {
        const level = this.levels[data.level + ''];
        let _class;
        switch (data.type) {
            case 0: // canceled
                _class = 'z-canceled-color';
                break;
            case 1: // loading
                _class = 'z-loading-color';
                break;
            case 2: // loaded
                _class = 'z-loaded-color';
                break;
            // no default
        }

        this._setItemClass(level, data.col, data.row, _class);
    }

    setLevelState(levelID, value) {
        const level = this.levels[levelID + ''];
        const _class = 'shown';

        if (value) {
            if (level.inDoc) {
                level.status.addClass(_class);
            }
        } else {
            level.status.removeClass(_class);
        }
    }

    setData(data) {
        let level;

        if ($J.defined(data.level)) {
            level = this.levels[data.level + ''];
        }

        if (level) { this._show(level); }

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
    }

    destroy() {
        if (this.inDoc) {
            this.inDoc = false;

            this.zoom.remove();
            this.zoom.inneHTML = '';

            this.header.remove();
            this.header.inneHTML = '';

            this.container.remove();
            this.container.inneHTML = '';

            this.levels = {};
            this.tileSize = { width: 0, height: 0 };
        }
        super.destroy();
    }
}

/* end-removable-tile-helper-block */

const DeepZoom = (() => {
/* eslint-env es6 */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


// eslint-disable-next-line no-unused-vars
class Camera {
    constructor(options) {
        this.isInner = options.inner;
        // lengthOfRow
        this.rows = options.lengthOfRow;
        // lengthOfColumn
        this.cols = options.lengthOfColumn;

        this.size = { width: options.cameraWidth, height: options.cameraHeight };

        // baseMapSize
        this.bMapS = { width: options.mapWidth, height: options.mapHeight };

        // baseTileSize
        this.bTileS = { width: options.tileWidth, height: options.tileHeight };

        // baseScale
        this.bScale = { x: options.scaleX, y: options.scaleY };

        // mapSize
        this.mapS = { width: this.bMapS.width, height: this.bMapS.height };

        // tileSize
        this.tileS = { width: this.bTileS.width, height: this.bTileS.height };

        this.baseLastTileSize = {
            width: this.bMapS.width - (this.cols - 1) * this.bTileS.width,
            height: this.bMapS.height - (this.rows - 1) * this.bTileS.height
        };

        this.lastTileSize = { width: this.baseLastTileSize.width, height: this.baseLastTileSize.height };

        this.position = { x: 0, y: 0 };
        this.lastCorrectionPosition = { x: 0, y: 0 };
        this.scale = { x: 0, y: 0 };
        this.lastScale = 0;
        this.lastGlobaslScale = 0;

        this.count = { x: 0, y: 0 };
        this.calcCount();

        this.shownTiles = { startX: 0, countX: this.count.x, startY: 0, countY: this.count.y };
    }

    static getTileIndex(position, tileSize) { return Math.floor(position / tileSize); }
    static getTileSize(size, scale) { return size * scale; }

    checkTile(x, y) {
        const st = this.shownTiles;
        return st.startX <= x && st.startY <= y && st.startX + st.countX > x && st.startY + st.countY > y;
    }

    calcCount() {
        this.count = {
            x: Math.ceil(this.size.width / this.tileS.width) + 1,
            y: Math.ceil(this.size.height / this.tileS.height) + 1
        };
    }

    findShownTiles() {
        const p = this.position;
        const ts = this.tileS;
        let startX = 0;
        let startY = 0;
        let countX = this.count.x;
        let countY = this.count.y;

        if (p.x < 0) { startX = Camera.getTileIndex(Math.abs(p.x), ts.width); }
        if (p.y < 0) { startY = Camera.getTileIndex(Math.abs(p.y), ts.height); }

        if (startX + countX > this.cols) { countX = this.cols - startX; }
        if (startY + countY > this.rows) { countY = this.rows - startY; }

        this.shownTiles = { startX: startX, countX: countX, startY: startY, countY: countY };
    }

    calcTileSize() {
        this.tileS.width = Camera.getTileSize(this.bTileS.width, this.scale.x);
        this.tileS.height = Camera.getTileSize(this.bTileS.height, this.scale.y);

        this.lastTileSize.width = Camera.getTileSize(this.baseLastTileSize.width, this.scale.x);
        this.lastTileSize.height = Camera.getTileSize(this.baseLastTileSize.height, this.scale.y);
    }

    calcData(position) {
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
    }

    setScale(scale) {
        this.lastScale = this.scale.x;
        this.scale.x = scale.x * this.bScale.x;
        this.scale.y = scale.y * this.bScale.y;
    }

    action(position, scale) {
        if (this.lastGlobaslScale !== scale.x) {
            this.setScale(scale);
            this.lastGlobaslScale = scale.x;
        }

        this.calcData(position);
        this.findShownTiles();
    }

    resize(viewPort) {
        this.size.width = viewPort.width;
        this.size.height = viewPort.height;
        this.calcCount();
        this.findShownTiles();
    }

    setMapS(width, height) {
        if (width !== null && width !== undefined) {
            this.mapS.width = width;
        }

        if (height !== null && height !== undefined) {
            this.mapS.height = height;
        }
    }

    getShownTiles() {
        return this.shownTiles;
    }

    getMapS() {
        return this.mapS;
    }

    destroy() {
        this.shownTiles = $([]);
    }
}

/* eslint-env es6 */
/* global Map */
/* global EventEmitter */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const TILE_STATES = {
    NOT_LOADED: 0,
    LOADING: 1,
    LOADED: 2
};

// eslint-disable-next-line no-unused-vars
class Tile extends EventEmitter {
    constructor(options) {
        super();
        this.id = options.id;
        this.index = { x: options.indexX, y: options.indexY };
        this.position = { x: options.x, y: options.y };
        this.size = { width: options.width, height: options.height };
        this.storage = options.storage;

        this.state = TILE_STATES.NOT_LOADED;
        this.node = null;

        if (this.storage.has(this.id)) {
            this.node = this.storage.get(this.id);
            this.state = TILE_STATES.LOADED;
        }
    }

    isLoaded() {
        return this.state === TILE_STATES.LOADED;
    }

    addImageToStorage() {
        if (!this.storage.has(this.id)) {
            this.storage.set(this.id, this.node);
        }
    }

    load() {
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
    }

    cancelLoading() {
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
    }

    setImage(node) {
        if (this.state !== TILE_STATES.LOADED) {
            this.state = TILE_STATES.LOADED;
            this.node = $(node);
            this.addImageToStorage();
        }
    }

    destroy() {
        this.cancelLoading();
        this.storage = null;
        super.destroy();
    }
}

/* eslint-env es6 */


// eslint-disable-next-line no-unused-vars
class LevelView {
    constructor(parent, dppx) {
        this.p = $(parent);

        this.dppx = dppx;
        // wrapper
        this.w = $J.$new('div');
        this.cvs = $J.$new('canvas');
        this.ctx = this.cvs.node.getContext('2d');
        this.w.append(this.cvs);
    }

    setIndex(index) {
        this.w.addClass('deepzoom-level-' + index);
        this.w.attr('z-index' + (index + 1));
    }

    append() {
        this.p.append(this.w);
    }

    show() {
        this.w.setCssProp('display', '');
    }

    hide() {
        this.w.setCssProp('display', 'none');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.cvs.node.width, this.cvs.node.height);
    }

    draw(scale, moveX, moveY) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.clear();
        this.ctx.setTransform(scale.x, 0, 0, scale.y, moveX, moveY);
    }

    drawTile(tileNode, tileSize, tilePosition) {
        if ($J.browser.uaName === 'edge' || $J.browser.uaName === 'ie') {
            if (this.dppx > 1) {
                this.ctx.drawImage(tileNode.node, 0, 0, tileSize.width, tileSize.height, tilePosition.x, tilePosition.y, tileSize.width, tileSize.height);
            } else {
                this.ctx.drawImage(tileNode.node, tilePosition.x, tilePosition.y, tileSize.width, tileSize.height);
            }
        } else {
            this.ctx.drawImage(tileNode.node, 0, 0, tileSize.width, tileSize.height, tilePosition.x, tilePosition.y, tileSize.width, tileSize.height);
        }
    }

    setCanvasSize(width, height) {
        this.cvs.setCss({ width: width, height: height });
        this.cvs.attr('width', width * this.dppx);
        this.cvs.attr('height', height * this.dppx);
    }

    destroy() {
        this.cvs.remove();
        this.w.remove();
    }
}

/* eslint-env es6 */
/* global Map, Camera, Tile, zoomHelper, EventEmitter */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const TILES_HASH_STORAGE = new Map();

const getCorrectedTileSize = (value, dppx) => {
    // return value * ((1 - (dppx - 1)) || 1);
    // dppx -= 1;
    // if (dppx <= 0) { dppx = 1; }
    // return value * dppx;
    return value / dppx;
};

// eslint-disable-next-line no-unused-vars
class Level extends EventEmitter {
    constructor(view, options) {
        super();
        this.view = view;

        this.id = options.id; // number of level
        this.dppx = options.dppx;

        this.size = { width: options.width, height: options.height }; // size of level image
        // maxSize
        this.mSize = { width: options.maxWidth, height: options.maxHeight }; // size of biggest image
        // tileSize
        this.tSize = { width: options.tileWidth, height: options.tileHeight };
        this.tileImageSize = { width: options.tileImageWidth, height: options.tileImageHeight };
        this.layerSize = { width: options.layerWidth, height: options.layerHeight };

        this.hash = options.hash + '-' + (this.size.width + 'x' + this.size.height);

        if (!TILES_HASH_STORAGE.has(this.hash)) {
            TILES_HASH_STORAGE.set(this.hash, new Map());
        }

        this.scaleFactor = {
            x: (this.mSize.width - this.size.width) / this.size.width + 1,
            y: (this.mSize.height - this.size.height) / this.size.height + 1
        };

        this.maxDisplayedSize = { width: options.maxDisplayedWidth, height: options.maxDisplayedHeight };
        this.minDisplayedSize = { width: options.minDisplayedWidth, height: options.minDisplayedHeight };

        this.globalScale = { x: 1, y: 1 };
        this.globalPosition = { x: 0, y: 0 };
        this.view.setIndex(this.id);

        this.setLensSize(options.viewPortWidth, options.viewPortHeight);

        this.isAdded = false;
        this.isShown = false;

        this.tiles = this.calcTiles();

        this.countOfTiles = this.tiles.length * this.tiles[0].length;
        this.loadedTiles = 0;

        this.camera = new Camera({
            inner: options.inner,
            scaleX: this.scaleFactor.x,
            scaleY: this.scaleFactor.y,
            cameraWidth: options.viewPortWidth,
            cameraHeight: options.viewPortHeight,
            mapWidth: this.size.width,
            mapHeight: this.size.height,
            tileWidth: getCorrectedTileSize(this.tileImageSize.width, this.dppx),
            tileHeight: getCorrectedTileSize(this.tileImageSize.height, this.dppx),
            lengthOfRow: this.tiles.length,
            lengthOfColumn: this.tiles[0].length
        });

        /* start-removable-tile-helper-block */
        if (zoomHelper) {
            zoomHelper.createLevel({
                level: this.id,
                cols: this.tiles[0].length,
                rows: this.tiles.length,
                levelSize: { width: this.size.width, height: this.size.height, },
                tileSize: {
                    width: this.tileImageSize.width,
                    height: this.tileImageSize.height
                }
            });
        }
        /* end-removable-tile-helper-block */
    }

    setEvents() {
        const ts = this.tileImageSize;
        this.on('getTile', (e) => {
            e.data.width = this.size.width;
            e.data.height = this.size.height;
            e.data.level = this.id;
            e.data.imageSettings = {
                tile: {
                    width: ts.width,
                    height: ts.height,
                    number: e.data.number
                }
            };

            if (this.dppx > 1) { e.data.dppx = this.dppx; }

            /* start-removable-tile-helper-block */
            if (zoomHelper) {
                zoomHelper.tileAction({
                    level: this.id,
                    col: e.data.indexX,
                    row: e.data.indexY,
                    type: 1
                });
            }
            /* end-removable-tile-helper-block */
        });

        this.on('zoomCancelLoadingOfTiles', (e) => {
            e.data.width = this.size.width;
            e.data.height = this.size.height;
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
                    level: this.id,
                    col: e.data.indexX,
                    row: e.data.indexY,
                    type: 0
                });
            }
            /* end-removable-tile-helper-block */
        });
    }

    cancelLoadingOfTiles() {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                tile.cancelLoading();
            });
        });
    }

    setImage(imageData) {
        const tile = this.tiles[imageData.indexY][imageData.indexX];

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
    }

    append() {
        if (!this.isAdded && this.isShown) {
            this.isAdded = true;
            this.setEvents();
            this.view.append();
        }
    }

    calcTiles() {
        const result = [];
        const ts = this.tileImageSize;
        const l1 = Math.ceil(this.layerSize.width / ts.width);
        const l2 = Math.ceil(this.layerSize.height / ts.height);

        for (let j = 0; j < l2; j++) {
            const arr = $([]);
            for (let i = 0; i < l1; i++) {
                const tile = new Tile({
                    y: j * ts.height,
                    x: i * ts.width,
                    indexX: i,
                    indexY: j,
                    id: j * l1 + i,
                    width: (i !== l1 - 1) ? ts.width : (this.layerSize.width - i * ts.width),
                    height: (j !== l2 - 1) ? ts.height : (this.layerSize.height - j * ts.height),
                    storage: TILES_HASH_STORAGE.get(this.hash)
                });

                tile.setParent(this);
                arr.push(tile);
            }
            result.push(arr);
        }

        return result;
    }

    correctDPPXPosition(pos, lensSize, imageSize) {
        let result = pos;

        if (this.dppx > 1) {
            const center = lensSize / 2;
            result = Math.abs(pos - center) / (imageSize / 100);
            result = (center * this.dppx) - (imageSize * this.dppx) / 100 * result;
        }

        return result;
    }

    draw() {
        const c = this.camera;

        if (this.isShown) {
            this.view.draw(c.scale, this.correctDPPXPosition(c.position.x, c.size.width, c.mapS.width), this.correctDPPXPosition(c.position.y, c.size.height, c.mapS.height));
            this.eachTile((tile) => { this.drawTile(tile); });
        }
    }

    drawTile(tile) {
        if (tile && tile.isLoaded()) {
            this.view.drawTile(tile.node, tile.size, tile.position);
        }
    }

    eachTile(callback) {
        const st = this.camera.getShownTiles();
        for (let y = 0, l = st.countY; y < l; y++) {
            for (let x = 0, l2 = st.countX; x < l2; x++) {
                callback(this.tiles[st.startY + y][st.startX + x]);
            }
        }
    }

    checkSize() {
        const last = this.isShown;
        const mapSize = this.camera.getMapS();
        const v1 = mapSize.width <= this.maxDisplayedSize.width;
        const v2 = mapSize.height <= this.maxDisplayedSize.height;
        const v3 = mapSize.width > this.minDisplayedSize.width;
        const v4 = mapSize.height > this.minDisplayedSize.height;

        this.isShown = (v1 && v2 && v3 && v4);

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
    }

    action(position, scale) {
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
    }

    loadImages() {
        if (this.isShown && this.loadedTiles !== this.countOfTiles) {
            this.eachTile((tile) => { tile.load(); });
        }
    }

    setLensSize(width, height) {
        this.view.setCanvasSize(width, height);
    }

    resize(cameraSize) {
        this.setLensSize(cameraSize.width, cameraSize.height);
        this.camera.resize(cameraSize);
        this.action(this.globalPosition, this.globalScale);
    }

    destroy() {
        this.off('getTile');
        this.off('zoomCancelLoadingOfTiles');
        this.isShown = false;

        this.camera.destroy();
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                tile.destroy();
            });
        });

        super.destroy();
    }
}

/* eslint-env es6 */
/* global Level */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


// eslint-disable-next-line no-unused-vars
class ZoomView {
    constructor(parentNode, classPrefix) {
        this.p = $(parentNode);
        // container
        this.c = $J.$new('div');
        this.c.addClass(classPrefix + '-deepzoom');
    }

    getContainer() {
        return this.c;
    }

    show() {
        this.p.append(this.c);
    }

    hide() {
        this.c.remove();
    }

    destroy() {
        this.c.remove();
        this.c = null;
    }
}

/* eslint-env es6 */
/* global Level, getPercentValue, zoomHelper, EventEmitter, helper, LevelView, calcScale, getLevels */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


// eslint-disable-next-line no-unused-vars
class ZoomController extends EventEmitter {
    constructor(view, options) {
        super();

        this.view = view;

        this.options = $J.extend({
            tiles: true,
            inner: true,
            tileSize: { width: 256, height: 256 },
            minZoomFactor: 100, // px
            upscale: false
        }, options);

        this.hash = null;

        this.setDefaultVars();
    }

    static convertScaleToSize(size, scale) {
        return {
            width: helper.round(size.width * scale.x, 2),
            height: helper.round(size.height * scale.y, 2)
        };
    }

    setHash(url) {
        // this.hash = '' + $J.getHashCode(url.split('?')[0]);
        this.hash = '' + $J.getHashCode(url);
    }

    // private
    setDefaultVars() {
        this.isShown = false;
        this.originSize = { width: 0, height: 0 };
        this.maxSize = { width: 0, height: 0 };
        this.minSize = { width: 0, height: 0 };
        this.lensSize = { width: 0, height: 0 };
        this.currentSize = { width: 0, height: 0 };

        this.levels = $([]);

        this.on('getTile', (e) => {
            if (!this.options.tiles) {
                delete e.data.imageSettings.tile;
                delete e.data.number;
            }
        });
    }

    // private
    createLevels() {
        const calcTileImageSize = (value, dppx) => {
            return dppx < 1.5 ? value : value * $J.DPPX;
        };
        const maxSize = this.maxSize;
        const minSize = this.minSize;

        if (!this.levels.length && maxSize.width - minSize.width > this.options.minZoomFactor) {
            let arr = [];
            if (this.options.inner) {
                arr = getLevels(minSize, maxSize, this.options.inner);
            } else {
                arr.push({
                    width: maxSize.width,
                    height: maxSize.height
                });
            }

            let tileSize = this.options.tileSize;

            for (let i = 0, l = arr.length; i < l; i++) {
                if (!this.options.tiles) { tileSize = arr[i]; }
                const _minSize = (i + 1 < l - 1) ? arr[i + 1] : minSize;
                const _maxSize = (i - 1 >= 0) ? arr[i - 1] : maxSize;
                const dppx = helper.getDPPX(arr[i].width, this.originSize.width, this.options.upscale);

                const levelView = new LevelView(this.view.getContainer(), dppx);
                const _level = new Level(levelView, {
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
    }

    getCurrentShownLevel() {
        let result = null;
        const l = this.levels.length;

        if (this.isShown) {
            for (let i = l - 1; i >= 0; i--) {
                if (this.levels[i].controller.isShown) {
                    result = this.levels[i].controller;
                    break;
                }
            }
        }

        return result;
    }

    getScale(direction) {
        const level = this.getCurrentShownLevel();
        let scale;
        const l = this.levels.length;

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
    }

    show() {
        if (!this.isShown) {
            this.isShown = true;
            this.view.show();
        }
        return this;
    }

    hide() {
        if (this.isShown) {
            this.isShown = false;

            this.view.hide();

            this.levels.forEach((level) => {
                level.view.destroy();
                level.controller.destroy();
            });

            this.setDefaultVars();
        }

        return this;
    }

    action(position, scale) {
        if (this.isShown) {
            this.currentSize = ZoomController.convertScaleToSize(this.maxSize, scale);

            this.levels.forEach((level) => {
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
    }

    setLensSize(width, height) {
        this.lensSize.width = width;
        this.lensSize.height = height;
        return this;
    }

    setMinSize(width, height) {
        this.minSize.width = width;
        this.minSize.height = height;
        return this;
    }

    setMaxSize(width, height, originWidth, originHeight) {
        this.maxSize.width = width;
        this.maxSize.height = height;
        this.originSize.width = originWidth;
        this.originSize.height = originHeight;
        this.createLevels();

        return this;
    }

    loadImages() {
        if (this.isShown) {
            this.levels.forEach((level) => {
                level.controller.loadImages();
            });
        }
        return this;
    }

    setImage(data) {
        if (this.isShown) {
            this.levels[data.level - 1].controller.setImage(data);
        }
        return this;
    }

    resize() {
        if (this.isShown) {
            this.levels.forEach((level) => {
                level.controller.resize(this.lensSize);
            });
        }

        return this;
    }

    destroy() {
        this.hide();
        this.off('getTile');
        this.off('zoomCancelLoadingOfTiles');
        super.destroy();
    }
}

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
class DZoom extends EventEmitter {
    constructor(parentNode, options) {
        super();
        this.view = new ZoomView(parentNode, 'sirv');
        this.controller = new ZoomController(this.view, options);
        this.controller.setParent(this);
    }

    setLensSize(width, height) {
        this.controller.setLensSize(width, height);
        return this;
    }

    loadImages() {
        this.controller.loadImages();
        return this;
    }

    getScale(direction) {
        return this.controller.getScale(direction);
    }

    setImage(data) {
        this.controller.setImage(data);
        return this;
    }

    setHash(hash) {
        this.controller.setHash(hash);
        return this;
    }

    setMinSize(width, height) {
        this.controller.setMinSize(width, height);
        return this;
    }

    setMaxSize(width, height, originWidth, originHeight) {
        this.controller.setMaxSize(width, height, originWidth, originHeight);
        return this;
    }

    show() {
        this.controller.show();
        return this;
    }

    hide() {
        this.controller.hide();
        return this;
    }

    action(imageDPosition, dScale) {
        this.controller.action(imageDPosition, dScale);
        return this;
    }

    resize() {
        this.controller.resize();
        return this;
    }

    destroy() {
        this.controller.destroy();
        this.controller = null;
        this.view.destroy();
        this.view = null;
        super.destroy();
    }
}

return DZoom;
})();
const Eye = (() => {

/* eslint-env es6 */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

// eslint-disable-next-line no-unused-vars
class View {
    constructor(parent, hover) {
        this.pn = $(parent);

        const className = 'sirv-zoom-lens';

        // container
        this.c = $J.$new('div');
        this.c.addClass(className + '-wrapper');

        // insideContainer
        this.ic = $J.$new('div');
        this.ic.addClass(className);

        this.ic.appendTo(this.c);

        this.img = null;
        // blackAndWhiteImg
        this.bwImg = null;

        if (hover) {
            this.c.addEvent('mousedown', (e) => { e.stop(); });
        }
    }

    setContainerPosition() {
        if ($J.contains(['img', 'canvas'], this.pn.getTagName())) {
            const positon = this.pn.getPosition();
            const parentPosition = $(this.pn.node.parentNode).getPosition();
            this.c.setCss({
                top: positon.top - parentPosition.top,
                left: positon.left - parentPosition.left
            });
        }
    }

    setImageSize(size) {
        if (this.img) {
            // this.bwImg = $(this.img.cloneNode());

            // this.bwImg.addClass('sirv-filter-bw');

            [this.img, this.bwImg].forEach((img) => {
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
    }

    getContainerSize() {
        return this.pn.getSize();
        // return {
        //     width: 132,
        //     height: 200
        // };
    }

    setContainerSize(size) {
        this.c.setCss({ width: size.width, height: size.height });
    }

    setInsideContainerSize(size) {
        this.ic.setCss({ width: size.width, height: size.height, });
    }

    setInsideContainerFontSize(size) {
        this.ic.setCssProp('font-size', Math.max(size.width, size.height) + 'px');
    }

    setTransform(x, y) {
        this.ic.setCssProp('transform', 'translate3d(' + x + 'px,' + y + 'px, 0px)');

        if (this.img) {
            this.img.setCssProp('transform', 'translate3d(' + (x * (-1)) + 'px, ' + (y * (-1)) + 'px, 0px)');
        }
    }

    show(img, size) {
        if (img) { this.img = $(img); }

        this.setContainerPosition();
        this.setImageSize(size);

        if (this.img) {
            this.ic.append(this.img);
            // this.pn.append(this.bwImg);
        }

        let container = this.pn;
        if ($J.contains(['img', 'canvas'], container.getTagName())) {
            container = $(container.node.parentNode);
        }

        container.append(this.c);
    }

    hide() {
        this.c.remove();

        if (this.img) {
            this.img.remove();
            this.img = null;

            if (this.bwImg) {
                this.bwImg.remove();
                this.bwImg = null;
            }
        }
    }

    destroy() {
        this.c.removeEvent('mousedown');
        this.c.remove();
    }
}

/* eslint-env es6 */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

const difference = (a, b) => { return Math.abs(a - b); };
const getAnimationValue = (a, b, step) => { return (a - b) * step; };

// eslint-disable-next-line no-unused-vars
class Controller {
    constructor(view) {
        this.view = view;

        // parentSize
        this.pSize = { width: 0, height: 0 };
        this.inDoc = false;

        this.timer = null;
        this.isPlaying = false;

        this.pos = { x: null, y: null };
        this.dPos = { x: null, y: null };
        this.size = { width: 0, height: 0 };
        this.dSize = { width: 0, height: 0 };
    }

    // private
    doAnimation() {
        let result = false;
        const minSize = 0.001;

        if (
                difference(this.pos.x, this.dPos.x) > minSize ||
                difference(this.pos.y, this.dPos.y) > minSize ||
                difference(this.size.width, this.dSize.width) > minSize ||
                difference(this.size.height, this.dSize.height) > minSize
            ) {
            result = true;
        }

        return result;
    }

    // private
    animate() {
        this.isPlaying = true;

        const step = 0.4;
        const dx = getAnimationValue(this.pos.x, this.dPos.x, step);
        const dy = getAnimationValue(this.pos.y, this.dPos.y, step);
        const dw = getAnimationValue(this.size.width, this.dSize.width, step);
        const dh = getAnimationValue(this.size.height, this.dSize.height, step);

        this.dPos.x += dx;
        this.dPos.y += dy;
        this.dSize.width += dw;
        this.dSize.height += dh;

        this.setCss();

        if (this.doAnimation()) {
            this.timer = setTimeout(() => {
                this.animate();
            }, 16);
        } else {
            this.stopAnimation();
        }
    }

    // private
    setCss() {
        const s = this.size;
        const ds = this.dSize;

        if (difference(s.width, ds.width) > 0 || difference(s.height, ds.height) > 0) {
            this.view.setInsideContainerSize(ds);
            this.view.setInsideContainerFontSize(this.pSize);
        }

        this.view.setTransform(Math.round(this.dPos.x), Math.round(this.dPos.y));
    }

    // private
    stopAnimation() {
        if (this.isPlaying) {
            this.isPlaying = false;

            clearTimeout(this.timer);

            this.dPos.x = this.pos.x;
            this.dPos.y = this.pos.y;
            this.dSize.width = this.size.width;
            this.dSize.height = this.size.height;

            this.setCss();
        }
    }

    setSize(size) {
        this.size.width = size.width;
        this.size.height = size.height;

        if (this.inDoc && this.dPos.x !== null) {
            if (!this.isPlaying) {
                this.animate();
            }
        }
    }

    setPosition(x, y) {
        const s = this.size;
        const ps = this.pSize;
        let _x = x - s.width / 2;
        let _y = y - s.height / 2;

        if (_x < 0) { _x = 0; }
        if (_y < 0) { _y = 0; }

        if (_x > ps.width - s.width) { _x = ps.width - s.width; }
        if (_y > ps.height - s.height) { _y = ps.height - s.height; }

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
    }

    // private
    setContainerSize() {
        const ps = this.view.getContainerSize();
        this.pSize = ps;
        this.view.setContainerSize(ps);
        this.view.setInsideContainerFontSize(ps);
    }

    show(img) {
        if (!this.inDoc) {
            this.inDoc = true;
            this.setContainerSize();
            this.view.show(img, this.pSize);
        }
    }

    hide() {
        if (this.inDoc) {
            this.inDoc = false;

            this.view.hide();

            this.pos = { x: null, y: null };
            this.dPos = { x: null, y: null };
            this.size = { width: 0, height: 0 };
            this.dSize = { width: 0, height: 0 };
        }
    }

    resize() {
        if (this.inDoc) {
            this.setContainerSize();
            this.view.setContainerPosition();
        }
    }

    destroy() {
        this.stopAnimation();
        this.inDoc = false;
    }
}

/* eslint-env es6 */
/* global View */
/* global Controller */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

// eslint-disable-next-line no-unused-vars
class _Eye {
    constructor(prentNode, hover) {
        this.view = new View(prentNode, hover);
        this.controller = new Controller(this.view);
    }

    setEventToMainContainer(name, callback) {
        this.view.c.addEvent(name, callback);
    }

    removeEventToMainContainer(name, callback) {
        if (callback) {
            this.view.c.removeEvent(name, callback);
        } else {
            this.view.c.removeEvent(name);
        }
    }

    clearEvents() {
        this.view.c.clearEvents();
    }

    getBoundaries() {
        return this.view.c.node.getBoundingClientRect();
    }

    show(img) {
        this.controller.show(img);
    }

    hide() {
        this.controller.hide();
    }

    setSize(size) {
        this.controller.setSize(size);
    }

    setPosition(x, y) {
        this.controller.setPosition(x, y);
    }

    destroy() {
        this.controller.destroy();
        this.view.destroy();
    }
}

return _Eye;
})();

const ZoomMap = (() => {

/* eslint-env es6 */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

// eslint-disable-next-line no-unused-vars
class View {
    constructor(parent) {
        this.p = $(parent);

        const className = 'sirv-zoom-map';

        // container
        this.c = $J.$new('div');
        this.c.addClass(className);
        this.lens = $J.$new('div');
        this.lens.addClass(className + '-lens');

        this.img = null;

        this.b = $($J.D.node.body);

        this.c.append(this.lens);
    }

    getRightPosition(x, y) {
        const rect = this.c.getRect();
        return {
            x: x - rect.left,
            y: y - rect.top
        };
    }

    addDomEventToDocBody(eventName, callback) {
        this.b.addEvent(eventName, callback);
    }

    removeDomEventToDocBody(eventName, callback) {
        this.b.removeEvent(eventName, callback);
    }

    addDomEventToLens(eventName, callback) {
        this.lens.addEvent(eventName, callback);
    }

    addDomEvent(eventName, callback) {
        this.c.addEvent(eventName, callback);
    }

    changeCursor(value) {
        this.c.setCssProp('cursor', value);
    }

    removeEvents() {
        this.c.removeEvent('btnclick tap');
        this.c.removeEvent('mousedown touchstart');
        this.lens.removeEvent('mousedown touchstart');
        this.c.removeEvent('mousemove touchmove');
    }

    setContainerCss(size) {
        this.c.setCss({
            width: size.width + 'px',
            height: size.height + 'px'
        });
    }

    setLensCss(lensPosition, lensSize, containerSize) {
        this.lens.setCss({
            top: (lensPosition.top - 1) + 'px',
            left: (lensPosition.left - 1) + 'px',
            width: lensSize.width + 'px',
            height: lensSize.height + 'px',
            'font-size': containerSize + 'px'
        });
    }

    setImg(src, srcset) {
        this.img = $J.$new('img', { 'src': src });

        if (srcset) {
            this.img.attr('srcset', srcset + ' 2x');
        }

        this.c.append(this.img);
    }

    // private
    removeEventTransitionEvent() {
        this.c.removeEvent('transitionend');
    }

    show(callback) {
        this.c.setCss({
            opacity: 0,
            transition: 'opacity .3s linear'
        });

        this.p.append(this.c);

        this.c.getSize(); // render

        this.removeEventTransitionEvent();
        this.c.addEvent('transitionend', (e) => {
            e.stop();
            this.removeEventTransitionEvent();
            this.c.setCssProp('transition', '');
            this.addDomEvent('mousedown touchstart', (_e) => { _e.stop(); });
            callback();
        });

        this.c.setCssProp('opacity', 1);
    }

    hide(force, callback) {
        this.removeEventTransitionEvent();

        if (!force) {
            this.c.addEvent('transitionend', (e) => {
                e.stop();
                this._removeEventTransitionEvent();
                this.c.setCssProp('transition', '');
                this.c.remove();
                this.removeEvents();
                callback();
            });
        } else {
            this.c.remove();
            this.removeEvents();
            callback();
        }

        this.c.setCssProp('opacity', 0);
    }

    destroy() {
        this.c = null;
        this.lens = null;
    }
}

/* eslint-env es6 */
/* global getPercent */
/* global EventEmitter */
/* global helper */
/* global getPercentValue */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

const getOffset = (e) => {
    let rect;
    const result = { x: 0, y: 0 };
    const oe = e.getOriginEvent();

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

const betweenMinMax = (value, min, max) => {
    if (!$J.defined(min)) { min = 0; }
    if (!$J.defined(max)) { max = 100; }

    return Math.min(Math.max(value, min), max);
};

// eslint-disable-next-line no-unused-vars
class Controller extends EventEmitter {
    constructor(view, options) {
        super();
        this.view = view;

        this.o = options;

        this.state = globalVariables.APPEARANCE.HIDDEN;
        this.scale = { x: 1, y: 1 };
        this.viewPortSize = { width: 0, height: 0 };

        // bigImageSize
        this.bISize = { width: 0, height: 0 };

        // currentBigImageSize
        this.cBISize = { width: 0, height: 0 };
        // currentBigImagePosition
        this.cBIPosition = { top: 0, left: 0 };

        // currentMapContainerSize
        this.mapSize = { width: 0, height: 0 };

        // lensSize
        this.ls = { width: 0, height: 0 };
        // lensPosition
        this.lp = { top: 0, left: 0 };
        // correctLensPosition
        this.clp = { x: 0, y: 0 };

        this.isDragMoved = false;
    }

    // convert current percent to the center percent of map eye
    static setInTheCenter(value) {
        if (value < 50) {
            value = Math.max(value - (50 - value), 0);
        } else if (value > 50) {
            value = Math.min(value + (value - 50), 100);
        }

        return value;
    }

    // private
    getPercentPosition(x, y) {
        const cms = this.mapSize;
        const pos = this.view.getRightPosition(x, y);

        x = betweenMinMax(helper.round(getPercent(pos.x, cms.width), 1));
        y = betweenMinMax(helper.round(getPercent(pos.y, cms.height), 1));

        return { x: x, y: y };
    }

    // private
    isInside(x, y) {
        let result = false;
        const lp = this.lp;
        const ls = this.ls;
        const pos = this.view.getRightPosition(x, y);

        if (lp.left < pos.x && lp.left + ls.width > pos.x && lp.top < pos.y && lp.top + ls.height > pos.y) { result = true; }

        return result;
    }

    // private
    setEvents() {
        let count = 1;
        let isDragMoved = false;

        this.dragEndHandler = (e) => {
            if (isDragMoved) {
                e.stop();
                isDragMoved = false;
                this.clp = { x: 0, y: 0 };
                this.view.changeCursor('');
                this.view.removeDomEventToDocBody(e.type, this.dragEndHandler);
                this.view.removeDomEventToDocBody('mouseout', this.mouseOutHandler);
            }
        };

        this.mouseOutHandler = (event) => {
            event.stop();
            if ((!event.oe.relatedTarget || event.oe.relatedTarget.tagName === 'HTML') && isDragMoved) {
                this.dragEndHandler(event);
                this.view.removeDomEventToDocBody('mouseup touchend', this.dragEndHandler);
            }
        };

        this.view.addDomEvent('btnclick tap', (e) => {
            e.stop();
            // this.emit('zoomMapNewPosition', { data: this.getPercentPosition(e.x - this.ls.width / 2, e.y - this.ls.height / 2) });
            this.emit('zoomMapNewPosition', { data: this.getPercentPosition(e.x, e.y) });
        });

        this.view.addDomEventToLens('mousedown touchstart', (e) => {
            const pageXY = e.getPageXY();

            if (this.isInside(pageXY.x, pageXY.y)) {
                e.stop();
                count = 1;

                const offset = getOffset(e);

                this.clp.y = offset.y;
                this.clp.x = offset.x;
                isDragMoved = true;
                this.view.addDomEventToDocBody('mouseup touchend', this.dragEndHandler);
                this.view.addDomEventToDocBody('mouseout', this.mouseOutHandler);
            }
        });

        this.view.addDomEvent('mousemove touchmove', (e) => {
            if (isDragMoved) {
                if (count <= 0) {
                    e.stop();
                    const pageXY = e.getPageXY();

                    this.view.changeCursor('move');
                    // this.emit('zoomMapNewPosition', { data: this.getPercentPosition(pageXY.x - this.clp.x, pageXY.y - this.clp.y) });
                    this.emit('zoomMapNewPosition', { data: this.getPercentPosition(pageXY.x, pageXY.y) });
                }
                count--;
            }
        });
    }

    // private
    calcMap(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        let cWidth = this.o.maxwidth;
        let cHeight = this.o.maxheight;

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
    }

    prepare(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.calcMap(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
        this.view.setContainerCss(this.mapSize);

        this.emit('zoomGetImage', {
            data: {
                width: this.mapSize.width,
                height: this.mapSize.height
            }
        });
    }

    setLensPosition(bigImageTop, bigImageLeft) {
        let top;
        let left;
        const bis = this.cBISize;
        const ms = this.mapSize;

        top = ms.height / bis.height * bigImageTop;
        left = ms.width / bis.width * bigImageLeft;

        this.cBIPosition.top = bigImageTop;
        this.cBIPosition.left = bigImageLeft;

        if (top < 0) { top = 0; }
        if (left < 0) { left = 0; }

        const ls = this.ls;

        if (top + ls.height > ms.height) { top = ms.height - ls.height; }
        if (left + ls.width > ms.width) { left = ms.width - ls.width; }

        this.lp.top = top;
        this.lp.left = left;
    }

    setLensSize(width, height) {
        this.cBISize.width = width;
        this.cBISize.height = height;

        const cm = this.mapSize;
        const vp = this.viewPortSize;

        this.ls.width = vp.width >= width ? cm.width : vp.width / width * cm.width;
        this.ls.height = vp.height >= height ? cm.height : vp.height / height * cm.height;
    }

    move(imgPos, scale) {
        const bis = this.bISize;
        const imgWidth = bis.width * scale.x;
        const imgHeight = bis.height * scale.y;
        const imgTop = Math.abs(imgPos.y + (bis.height - imgHeight) / 2);
        const imgLeft = Math.abs(imgPos.x + (bis.width - imgWidth) / 2);

        this.scale.x = scale.x;
        this.scale.y = scale.y;

        this.setLensSize(imgWidth, imgHeight);
        this.setLensPosition(imgTop, imgLeft);
        this.view.setLensCss(this.lp, this.ls, Math.max(this.mapSize.width, this.mapSize.height));
    }

    show() {
        if ($J.contains([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN], this.state)) { return; }
        this.state = globalVariables.APPEARANCE.SHOWING;

        this.view.show(() => {
            this.setEvents();
            this.state = globalVariables.APPEARANCE.SHOWN;
        });
    }

    hide(force) {
        if ($J.contains([globalVariables.APPEARANCE.HIDDEN, globalVariables.APPEARANCE.HIDING], this.state) && !force) { return; }
        this.state = globalVariables.APPEARANCE.HIDING;

        this.view.hide(force, () => {
            this.view.removeDomEventToDocBody('mouseup touchend', this.dragEndHandler);
            this.state = globalVariables.APPEARANCE.HIDDEN;
        });
    }

    resize(maxWidth, maxHeight, imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.o.maxwidth = maxWidth;
        this.o.maxheight = maxHeight;

        this.calcMap(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
        this.view.setContainerCss(this.mapSize);
    }

    destroy() {
        this.hide(true);
        super.destroy();
    }
}

/* eslint-env es6 */
/* global EventEmitter */
/* global View */
/* global Controller */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

// eslint-disable-next-line no-unused-vars
class _ZoomMap extends EventEmitter {
    constructor(parent, options) {
        super();

        this.options = $J.extend({
            maxwidth: 200,
            maxheight: 200
        }, options || {});

        this.view = new View(parent);
        this.controller = new Controller(this.view, this.options);
        this.controller.setParent(this);
    }

    prepare(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.controller.prepare(imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
    }

    move(imgPos, scale) {
        this.controller.move(imgPos, scale);
    }

    setImg(src, srcset) {
        this.view.setImg(src, srcset);
    }

    show() {
        this.controller.show();
    }

    hide(force) {
        this.controller.hide(force);
    }

    resize(maxWidth, maxHeight, imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight) {
        this.controller.resize(maxWidth, maxHeight, imgWidth, imgHeight, zoomContainerWidth, zoomContainerHeight);
    }

    destroy() {
        this.controller.destroy();
        this.view.destroy();
        super.destroy();
    }
}

return _ZoomMap;
})();

/* eslint-env es6 */
/* eslint-disable indent */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint guard-for-in: "off"*/
/* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const findZoomNode = (el) => {
    return $($(el).node.getElementsByTagName('img')[0] || $(el).node.getElementsByTagName('canvas')[0] || el);
};

// eslint-disable-next-line no-unused-vars
class View {
    constructor(parentNode) {
        this.pn = $(parentNode);

        const className = 'sirv-zoom';

        // eventsCanvasNode
        this.cnv = $J.$new('div');
        this.cnv.addClass(className);
        this.node = $J.$new('div').setCss({ opacity: 0 });
        this.node.addClass(className + '-wrapper');
        this.zoomWrapper = $J.$new('div').addClass('sirv-zoom-image-wrapper');

        // zoomNode
        this.zoom = findZoomNode(this.pn);
        // lensContainer
        this.lens = $J.D.node.body;
        this.isBody = true;

        this.image = null;

        this.perspective = '';

        if ($J.browser.mobile && $J.browser.platform === 'ios') {
            // perspective much helps for ios
            this.perspective = 'perspective(1000px) ';
        }
    }

    getHash() {
        if (this.image) {
            return this.image.$J_UUID + '' || this.image.attr('src');
        }

        return null;
    }

    getParentSize() {
        return this.pn.getSize();
    }

    getParentPostion() {
        return this.pn.getPosition(); // Inaccurate position for mobile
    }

    getZoomSize() {
        return this.zoom.getSize();
    }

    getParentBoundaries() {
        if (this.cnv.node.parentNode) {
            return this.cnv.node.getBoundingClientRect();
        }

        return null;
    }

    // eslint-disable-next-line class-methods-use-this
    addScrollEvent(callback) {
        $J.W.addEvent('scroll', callback);
    }

    // eslint-disable-next-line class-methods-use-this
    removeScrollEvent(callback) {
        if (callback) {
            $J.W.removeEvent('scroll', callback);
        } else {
            $J.W.removeEvent('scroll');
        }
    }

    addClassToWrapper(zoomType) {
        this.node.addClass('sirv-' + zoomType + '-zoom');
    }

    setEventToMainContainer(name, callback) {
        this.cnv.addEvent(name, callback);
    }

    removeEventFromMainContainer(...args) {
        this.cnv.removeEvent(args);
    }

    setEventToWrapper(name, callback) {
        this.node.addEvent(name, callback);
    }

    removeEventFromWrapper(...args) {
        this.node.removeEvent(args);
    }

    addMouseoutEvent(callback) {
        this.setEventToWrapper('mouseout', (e) => {
            // let toElement = e.toElement || e.relatedTarget;
            let toElement = e.getRelated();

            if (!toElement) { return; }

            while (toElement && toElement !== this.node.node && toElement !== this.lens.node) {
            // while (toElement !== this.node && toElement !== $J.D.node.body) {
                toElement = toElement.parentNode;
            }

            if (this.node.node !== toElement) {
                callback(e);
            }
        });
    }

    setLensContainer(lensContainer) {
        if (!lensContainer) {
            lensContainer = $($J.D.node.body);
        }

        this.isBody = $(lensContainer) === $($J.D.node.body);

        this.lens = $(lensContainer);
    }

    toggleCursorClass(oldClass, newClass) {
        this.cnv
            .removeClass(oldClass)
            .addClass(newClass);
    }

    setImagePosition(position, scale) {
        if (this.image) {
            this.zoomWrapper.setCssProp('transform', this.perspective + 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0) scale(' + scale.x + ', ' + scale.y + ')');
        }
    }

    addStartCss() {
        this.setLensStyle({
            opacity: 0,
            transform: 'scale(0)'
        });
    }

    appendNodes(smallImg, imageSize) {
        this.cnv.addEvent('contextmenu', (e) => { e.stopDefaults(); });

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
            this.image.addEvent('mousedown', (e) => { e.stopDefaults(); });
        }

        this.zoomWrapper.append(this.image);
        this.node.append(this.zoomWrapper);
        this.node.appendTo(this.cnv);
        this.cnv.appendTo(this.lens, false);
    }

    setEventNodePositionSize(pos, size) {
        let top = pos.top;
        let left = pos.left;

        if (!this.isBody) {
            const parentContainer = this.lens.getPosition();
            top -= parentContainer.top;
            left -= parentContainer.left;
        }

        this.cnv.setCss({ top: top, left: left, width: size.width, height: size.height });
    }

    setLensStyle(styleObj) {
        this.node.setCss(styleObj);
    }

    setLensPosition(position) {
        this.setLensStyle({
            top: position.top,
            left: position.left,
        });
    }

    setLensSize(size) {
        this.setLensStyle({
            width: size.width,
            height: size.height,
        });
    }

    setLensCss(position, size, transition) {
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
    }

    setImageSize(position, size, scale) {
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
    }

    clearCss() {
        this.node.setCss({
            transition: '',
            opacity: '',
            transform: ''
        });

        this.node.removeAttr('style');

        if (this.image) {
            this.image.setCss({ width: '', height: '' });
        }

        this.zoomWrapper.setCss({
            top: '',
            left: '',
            width: '',
            height: '',
            transition: '',
            transform: ''
        });
    }

    clearDOM() {
        if (this.image) {
            this.image.remove();
            this.image = null;
        }
        this.zoomWrapper.remove();
        this.node.remove();
        this.cnv.remove();
    }

    removeEvents() {
        this.cnv.clearEvents();
        // this.cnv.removeEvent('mouseover');

        if (this.image) {
            this.image.clearEvents();
        }

        this.node.clearEvents();

        // this.node.removeEvent('mouseout');
        // this.node.removeEvent('mousemove');
        // this.node.removeEvent('btnclick');
        // this.node.removeEvent('mousescroll');
        // this.node.removeEvent('transitionend');
        // this.node.removeEvent('mousedrag');
        // this.node.removeEvent('touchdrag');
    }

    getBoundaries() {
        return this.cnv.node.getBoundingClientRect();
    }

    destroy() {
        if (this.image) {
            this.image.remove();
            this.image = null;
        }
        this.zoomWrapper.remove();
        this.node.remove();
        this.cnv.remove();
    }
}

/* eslint-env es6 */
/* global View */


// eslint-disable-next-line no-unused-vars
class InnerView extends View {
    constructor(parentNode) {
        super(parentNode);
        this.mouseMoveHandler = null;
    }

    getContainerForMap() {
        return this.node;
    }

    addStartCss() { // TODO review it
        super.addStartCss();

        this.node.addEvent('mousescroll', (e) => { e.stop(); });
        this.setLensStyle({
            opacity: 0,
            transform: 'scale(1)'
        });
    }

    removeDragstart() {
        this.node.del('event:mousedrag:dragstart'); // fix mousedrag when the lens is opening second time
    }

    addEventsCanvasClass(className) {
        this.cnv.addClass(className);
    }

    removeEventsCanvasClass(className) {
        this.cnv.removeClass(className);
    }

    getContainerSize() {
        return this.node.getSize();
    }

    getContainerPosition() {
        return this.node.getPosition();
    }

    addGlobalEvent(callback) {
        if (!this.mouseMoveHandler) {
            this.mouseMoveHandler = callback;
            $J.D.addEvent('mousemove', callback);
        }
    }

    removeGlobalEvent() {
        if (this.mouseMoveHandler) {
            $J.D.removeEvent('mousemove', this.mouseMoveHandler);
            this.mouseMoveHandler = null;
        }
    }

    removeEvents() {
        super.removeEvents();
        this.removeGlobalEvent();
    }
}

/* eslint-env es6 */
/* global View */

// eslint-disable-next-line no-unused-vars
class MagnifierView extends View {
    getParentSize() {
        return this.zoom.getSize();
    }

    getParentPostion() {
        return this.zoom.getPosition(); // Inaccurate position for mobiles
    }
}

/* eslint-env es6 */
/* global View */
/* eslint-disable indent */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint guard-for-in: "off"*/
/* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


// eslint-disable-next-line no-unused-vars
class OutsideView extends View {
    getImageForEye() {
        return this.image.node.cloneNode();
    }

    getNodeForEye() {
        return this.zoom;
    }

    setLensPosition(position) {
        this.cnv.setCss({
            top: position.top,
            left: position.left,
        });
    }

    setCanvasNodeSize(size) {
        this.cnv.setCss({
            width: size.width,
            height: size.height,
        });
    }

    addStartCss(value) {
        this.setLensStyle({
            opacity: 0,
            transform: 'translate3d(' + value.start.x + '%, ' + value.start.y + '%, 0px)'
        });
    }

    getParentSize() {
        return this.zoom.getSize();
    }

    getParentPostion() {
        return this.zoom.getPosition(); // Inaccurate position for mobiles
    }

    setLensCss(position, size, transition) {
        this.cnv.setCss({
            top: position.top,
            left: position.left
        });

        // super.setLensCss({ top: 0, left: 0 }, size, transition);
        super.setLensCss(position, size, transition);
    }

    addMouseMoveEvent(callback) {
        $J.W.addEvent('mousemove', callback);
    }

    removeMouseMoveEvent(callback) {
        $J.W.removeEvent('mousemove', callback);
    }

    clearCss() {
        this.cnv.removeAttr('style');
    }
}

/* eslint-env es6 */
/* eslint-disable indent */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

const AnimationLoop = (() => {
    const STATES = {
        STOPPED: 0,
        STARTED: 1
    };

    class _Animation {
        constructor(callback, stopCallback) {
            this.state = STATES.STOPPED;
            this.id = null;
            this.cb = callback || (() => {});
            this.stopCb = stopCallback || (() => {});
        }

        start() {
            if (this.state !== STATES.STARTED) {
                this.state = STATES.STARTED;
                const step = (lastTime) => {
                    this.cb(lastTime);
                    if (this.state !== STATES.STOPPED) {
                        this.id = requestAnimationFrame(step);
                    }
                };

                this.id = requestAnimationFrame(step);
            }
        }

        stop() {
            if (this.state !== STATES.STOPPED) {
                this.state = STATES.STOPPED;
                cancelAnimationFrame(this.id);
                this.stopCb();
            }
        }
    }

    return _Animation;
})();

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

let zoomHelper = null; // TODO tmp

// eslint-disable-next-line no-unused-vars
class Controller extends EventEmitter {
    constructor(view, o) {
        super();

        this.o = $J.extend({
            test: false,
            pan: false, // drag zoom
            smoothing: true,
            tiles: true,
            customZooming: true,
            clickBehavior: 'both', // both, up
            upscale: false, // upscale last level image when we have retina display
            trigger: 'hover', // hover, click, dblclick
        }, o);

        this.view = view;

        this.state = globalVariables.APPEARANCE.HIDDEN;

        this.x = 0;
        this.y = 0;

        this.baseScale = { x: 1, y: 1 };
        this.scale = { x: 1, y: 1 };
        this.dScale = { x: 1, y: 1 };

        // imageSize
        this.iSize = { width: 0, height: 0 };
        // imagePosition
        this.iPos = { x: 0, y: 0 };
        // imageDPosition
        this.iDPos = { x: 0, y: 0 };

        // parentPosition
        this.pPos = { top: 0, left: 0 };
        // parentSize
        this.pSize = { width: 0, height: 0 };

        this.anim = null;
        this.animCb = null;
        this.animStep = 0;
        this.lastAnimTimer = 0;

        this.deepZoom = null;
        this.deepZoomTimer = null;

        this.lensSize = { width: 0, height: 0 };
        this.lensHalfSize = { width: 0, height: 0 };
        this.lensPosition = { top: 0, left: 0 };

        this.currentLensSize = { width: 100, height: 100 };

        this.dppx = 1; // just for image, not tiles

        this.zoomNodeSize = { width: 0, height: 0 };

        this.boundaries = null;

        this.ANIM_STEP = 0.1;

        this.nonDeepZoomImageLevels = [];

        this.scrollHandler = () => {
            if ($J.contains([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN], this.state)) {
                this.hide(this.state === globalVariables.APPEARANCE.SHOWING);
            }
        };
    }

    init() {
        this.getSizes();
        this.view.setLensCss(this.lensPosition, this.lensSize);
        this.createDeepZoom();
        this.createAnimation(this.ANIM_STEP);
        this.view.addScrollEvent(this.scrollHandler);
    }

    // private
    createDeepZoom() {
        this.deepZoom = new DeepZoom(this.view.node, {
            tiles: this.o.tiles,
            inner: $J.contains(['inner', 'outside'], this.o.type),
            upscale: this.o.upscale
            // minSize: this.pSize
        });

        this.deepZoom.setParent(this);

        this.on('getTile', (e) => {
            e.stopAll();
            this.emit('zoomGetImage', { data: e.data });
        });

        this.on('zoomCancelLoadingOfTiles', (e) => { e.stopEmptyEvent(); });
    }

    setLensContainer(lensContainer) {
        this.view.setLensContainer(lensContainer);
    }

    // private
    getBoundaries() {
        this.boundaries = this.view.getParentBoundaries();
    }

    // private
    getSizes() {
        this.pSize = this.view.getParentSize();
        this.pPos = this.view.getParentPostion();
        this.zoomNodeSize = this.view.getZoomSize();
        this.getBoundaries();
    }

    isShown() {
        return (this.state === globalVariables.APPEARANCE.SHOWN);
    }

    isShowing() {
        return (this.state === globalVariables.APPEARANCE.SHOWING);
    }

    // private
    deepZoomAction(equals, newSize) {
        clearTimeout(this.deepZoomTimer);
        this.deepZoomTimer = setTimeout(() => {
            this.deepZoom.loadImages();
            if (newSize) {
                this.deepZoom.setLensSize(newSize.width, newSize.height);
                this.deepZoom.resize();
            }
            this.deepZoom.action(this.iDPos, this.dScale);
            if (!equals) {
                this.deepZoomAction(this.dScale.x === this.scale.x);
            }
        }, this.lastAnimTimer + 10); // must be more than fps (1000 / 60 = 16)

        if (newSize) {
            this.deepZoom.setLensSize(newSize.width, newSize.height);
            this.deepZoom.resize();
        }
        this.deepZoom.action(this.iDPos, this.dScale);
    }

    // private
    stopMovingAndZooming() {
        this.scale.x = this.dScale.x;
        this.scale.y = this.dScale.y;
        this.iPos.x = this.iDPos.x;
        this.iPos.y = this.iDPos.y;
    }

    // private
    createAnimation(step) {
        const checkScale = (sett) => {
            let result = false;

            if (this.dScale[sett] < this.baseScale[sett]) {
                result = true;
                this.dScale[sett] = this.baseScale[sett];
            }

            if (this.dScale[sett] > 1) {
                result = true;
                this.dScale[sett] = 1;
            }

            return result;
        };

        this.animStep = step;

        let last = 0;
        this.anim = new AnimationLoop((lastTime) => {
            if (!last) { last = lastTime; return; }
            let dx;
            let dy;
            let diffX;
            let diffY;
            let isChanged = false;
            this.lastAnimTimer = lastTime - last;

            last = lastTime;

            let xScaleWasClosed = false;
            let yScaleWasClosed = false;

            if (this.scale.x !== this.dScale.x) {
                isChanged = true;
                this.sendZoomingAction();
                // this.setCursorState();

                diffX = this.scale.x - this.dScale.x;
                // diffY = this.scale.y - this.dScale.y;

                dx = diffX * this.animStep;
                // dy = diffY * this.animStep;

                this.dScale.x += dx;
                this.dScale.y += dx;
                // this.dScale.y += dy;

                xScaleWasClosed = checkScale('x');
                yScaleWasClosed = xScaleWasClosed;
                // yScaleWasClosed = checkScale('y');

                // if (Math.abs(diffX) < 0.0001 || Math.abs(diffY) < 0.0001) {
                if (Math.abs(diffX) < 0.0001) {
                    this.dScale.x = this.scale.x;
                    // this.dScale.y = this.scale.y;
                    this.dScale.y = this.scale.x;
                }
            }

            if (this.iPos.x !== this.iDPos.x || this.iPos.y !== this.iDPos.y) {
                isChanged = true;
                diffX = this.iPos.x - this.iDPos.x;
                diffY = this.iPos.y - this.iDPos.y;

                dx = diffX * this.animStep;
                dy = diffY * this.animStep;

                this.iDPos.x += dx;
                this.iDPos.y += dy;

                this.iDPos.x = helper.round(this.iDPos.x, 4);
                this.iDPos.y = helper.round(this.iDPos.y, 4);

                if (Math.max(Math.abs(diffX), Math.abs(diffY)) < 1 || xScaleWasClosed || yScaleWasClosed) {
                    this.iDPos.x = this.iPos.x;
                    this.iDPos.y = this.iPos.y;
                }
            }

            if (isChanged) {
                this.render(this.iDPos, this.dScale);
            } else if (this.animCb) {
                this.animCb();
                this.animStep = step;
                this.animCb = null;
            }
        }, () => {
            last = 0;
        });
    }

    render(position, scale) {
        this.deepZoomAction();
        this.view.setImagePosition(position || this.iDPos, scale || this.dScale);
    }

    // private
    correctX(value) { return value - this.pPos.left; }
    // private
    correctY(value) { return value - this.pPos.top; }

    // private
    setXY(x, y) {
        this.x = this.correctX(x);
        this.y = this.correctY(y);
    }

    getZoomData(scale) {
        let result = 0;

        if (!scale) { scale = this.scale.x; }

        if (this.isShown() || this.isShowing()) {
            result = helper.round((scale - this.baseScale.x) / (1 - this.baseScale.x), 2);
        }

        return result;
    }

    getNextMinZoom() {
        let result = this.deepZoom.getScale('zoomout');

        if (result < this.baseScale.x) { result = this.baseScale.x; }

        return this.getZoomData(result);
    }

    getNextMaxZoom() {
        let result = this.deepZoom.getScale('zoomin');

        if (result > 1) { result = 1; }

        return this.getZoomData(result);
    }


    // private
    zoom(direction, x, y) {
        const last = this.scale.x;
        const is = this.iSize;
        const cw = is.width * this.scale.x;
        const ch = is.height * this.scale.y;
        const dw = getDifference(is.width, cw);
        const dh = getDifference(is.height, ch);

        x = x || (this.pPos.left + this.lensHalfSize.width);
        y = y || (this.pPos.top + this.lensHalfSize.height);

        this.basePercentOfScale = {
            x: getPercent((Math.abs(this.iPos.x) + this.correctX(x)) - dw, cw),
            y: getPercent((Math.abs(this.iPos.y) + this.correctY(y)) - dh, ch)
        };

        const scale = this.deepZoom.getScale(direction);

        this.scale.x = scale;
        this.scale.y = scale;

        this.setXY(x, y);

        this.afterZoom(last);
    }

    afterZoom(lastScale) {
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
    }

    // public
    zoomUp(x, y) {
        if ((this.isShown() || this.isShowing()) && this.scale.x !== 1) {
            this.zoom('zoomin', x, y);
            return true;
        }

        return false;
    }

    // public
    zoomDown(x, y) {
        if ((this.isShown() || this.isShowing()) && this.scale.x !== this.baseScale.x) {
            this.zoom('zoomout', x, y);
            return true;
        }

        return false;
    }

    // private
    sendZoomingAction() {
        clearTimeout(this.zoomingTimer);
        this.zoomingTimer = setTimeout($((from) => {
            this.emit('zooming', {
                data: {
                    zoom: this.getZoomData(), // from 0 to 1
                    from: from,
                    to: this.scale.x
                }
            });
        }).bind(this, this.dScale.x), 24);
    }

    // private
    setCursorState(state) {
        if (!$J.defined(state)) {
            const scale = this.getZoomData();

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
    }

    setImage(data) { // when will work last block "else" if deepZoom always true!?
        const node = data.node;

        if (this.isShown() || this.isShowing()) {
            const _data = $J.extend({}, data.callbackData);
            _data.node = node;
            this.deepZoom.setImage(_data);
        }
    }

    // private
    setSizeOfLens(width, height) {
        this.lensSize = { width: width, height: height };

        this.lensHalfSize = {
            width: this.lensSize.width / 2,
            height: this.lensSize.height / 2
        };
    }

    // private
    calcSizeOfLens() {
        const ps = this.pSize;
        const cls = this.currentLensSize;

        this.setSizeOfLens(getPercentValue(ps.width, cls.width), getPercentValue(ps.height, cls.height));
    }

    // private
    getBaseScale() {
        this.baseScale = {
            x: this.zoomNodeSize.width / this.iSize.width,
            y: this.zoomNodeSize.height / this.iSize.height
        };
    }

    // eslint-disable-next-line class-methods-use-this
    calcPositionOfLens() {}

    // eslint-disable-next-line class-methods-use-this
    getImagePosition() {}

    // private
    showDeepZoom(bigImageOriginWidth, bigImageOriginHeight) {
        if (this.deepZoom) {
            /* start-removable-tile-helper-block */
            if (this.o.test && !zoomHelper) {
                zoomHelper = new ZoomHelper();
                zoomHelper.setParent(this);
            }
            /* end-removable-tile-helper-block */

            const hash = this.view.getHash();

            if (hash) {
                this.deepZoom.setHash(hash);
            }

            this.deepZoom
                .setLensSize(this.lensSize.width, this.lensSize.height)
                .setMinSize(this.zoomNodeSize.width, this.zoomNodeSize.height)
                .setMaxSize(this.iSize.width, this.iSize.height, bigImageOriginWidth, bigImageOriginHeight)
                .show();
        }
    }

    // private
    endOfShowing(isWithoutSettingEvents) {
        let result = false;
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
    }

    sendZoomShownEvent() {
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
    }

    showCenter(smallImg, largeImg, toLevel) {
        this.getSizes();
        const x = this.pPos.left + this.pSize.width / 2;
        const y = this.pPos.top + this.pSize.height / 2;

        return this.show(smallImg, largeImg, x, y, false, toLevel);
    }

    /*
        public
        toLevel = max || undefined(default), first, zero
    */
    show() {
        if (this.state !== globalVariables.APPEARANCE.HIDDEN) { return false; }
        this.state = globalVariables.APPEARANCE.SHOWING;

        return true;
    }

    // private
    endOfHiding() {
        this.stopMovingAndZooming();
        clearTimeout(this.hideTimer);
        this.anim.stop();

        this.setCursorState('zoomIn');

        this.view.clearCss();

        this.baseScale = { x: 1, y: 1 };
        this.scale = { x: 1, y: 1 };
        this.dScale = { x: 1, y: 1 };
        this.setUpEvent = false;
        this.basePercentOfScale = { x: 0, y: 0 };

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
    }

    // private
    hide(force) {
        if (!$J.contains([globalVariables.APPEARANCE.SHOWN, globalVariables.APPEARANCE.SHOWING], this.state)) { return false; }

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
    }

    // private
    addClickEvent() {
        let eventName = 'btnclick tap';

        if (this.o.trigger === 'dblclick') {
            eventName = 'dblbtnclick dbltap';
        }

        this.view.setEventToWrapper(eventName, (e) => {
            e.stop();

            this.setXY(e.x, e.y);
            if (this.o.clickBehavior === 'up') {
                if (!this.zoomUp(e.x, e.y)) {
                    this.hide();
                }
            } else if (this.o.smoothing && this.scale.x !== this.baseScale.x) {
                this.hide();
            } else {
                this.hide(true);
            }
        });
    }

    customMove(x, y) {
        if (!$J.contains([globalVariables.APPEARANCE.HIDDEN, globalVariables.APPEARANCE.HIDING], this.state)) {
            this.move(x, y);
        }
    }

    // private
    move(x, y) {
        this.setXY(x, y);
        this.afterMove();
    }

    // private
    afterMove() {
        if (!this.o.smoothing) {
            this.render(this.iPos, this.scale);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    setEvents() {}

    setLensStyleOnResize() {
        this.view.setLensStyle({ top: this.lensPosition.top, left: this.lensPosition.left, width: this.lensSize.width, height: this.lensSize.height });
    }

    onResize() {
        if (this.state !== globalVariables.APPEARANCE.HIDDEN) {
            if (this.state === globalVariables.APPEARANCE.HIDING) {
                this.hide(true);
            } else {
                if (this.state === globalVariables.APPEARANCE.SHOWING) {
                    if (this.o.smoothing) {
                        this.state = globalVariables.APPEARANCE.SHOWN;
                        this.setEvents();

                        this.view.removeEventFromWrapper('transitionend');
                        this.view.setLensStyle({ 'transition': '' });
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

                this.deepZoom
                    .setLensSize(this.pSize.width, this.pSize.height)
                    .setMinSize(this.zoomNodeSize.width, this.zoomNodeSize.height)
                    // .setMaxSize(this.iSize.width, this.iSize.height)
                    .resize();

                // this.calcPositionOfImage(false, true);

                this.view.setEventNodePositionSize(this.pPos, this.pSize);

                if (!this.o.smoothing) {
                    this.sendZoomingAction();
                    this.setCursorState();
                    this.deepZoomAction();
                    this.view.setImagePosition(this.iPos, this.scale);
                }
            }
        }
    }

    destroy() {
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
        super.destroy();
    }
}

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
const InnerController = (() => {
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

    const outOfSquare = (checkedPoint, nodePos, nodeSize, scrollPosition) => {
        let result = false;

        const x = nodePos.left - scrollPosition.x;
        const y = nodePos.top - scrollPosition.y;

        if (checkedPoint.x <= x || checkedPoint.y <= y || checkedPoint.x >= x + nodeSize.width || checkedPoint.y >= y + nodeSize.height) {
            result = true;
        }

        return result;
    };

    class IController extends Controller {
        constructor(view, o) {
            super(view, $J.extend({
                map: false,
                mapSize: 50 // in percentage // 100% is 50% from each image side
            }, o));

            this.basePercentOfScale = { x: 0, y: 0 };
            this.clonedImage = null;
            this.hideTimer = null;
            this.showTimer = null;

            this.map = null;
            this.zoomingTimer = null;

            this.currentCursorState = 0;

            this.innerImagePosition = { x: 0, y: 0 };

            this.setUpEvent = false;

            if ($J.browser.mobile) {
                this.o.pan = true;

                if (this.o.trigger === 'hover') {
                    this.o.trigger = 'click';
                }
            }

            this.view.setLensCss(this.lensPosition, this.lensSize);
            this.ANIM_STEP = 0.3;
        }

        init() {
            super.init();
            this.createZoomMap();
        }

        // private
        createZoomMap() {
            if (!this.o.map) { return; }

            const mWidth = parseInt(getPercentValue(this.pSize.width / 2, this.o.mapSize), 10);
            const mHeight = parseInt(getPercentValue(this.pSize.height / 2, this.o.mapSize), 10);

            this.map = new ZoomMap(this.view.getContainerForMap(), {
                maxwidth: mWidth,
                maxheight: mHeight
            });
            this.map.setParent(this);

            this.on('zoomGetImage', (e) => {
                e.stopEmptyEvent();
                e.data.map = true;
                e.data.exactSize = true;
            });

            this.on('zoomMapNewPosition', (e) => {
                e.stopAll();

                // this.move(
                //     this.pPos.left + getPercentValue(this.lensSize.width, e.data.x),
                //     this.pPos.top + getPercentValue(this.lensSize.height, e.data.y)
                // );

                this.setXY(
                    this.pPos.left + getPercentValue(this.lensSize.width, e.data.x),
                    this.pPos.top + getPercentValue(this.lensSize.height, e.data.y)
                );

                this.calcPositionOfImageInCenter(this.scale);

                if (!this.o.smoothing) {
                    this.deepZoomAction();
                    this.view.setImagePosition(this.iPos, this.scale);
                    if (this.map) {
                        this.map.move(this.iPos, this.scale);
                    }
                }
            });
        }

        // private
        move(x, y) {
            this.setXY(x, y);
            this.calcPositionOfImage(this.scale);
            this.afterMove();
        }

        // private
        render(position, scale) {
            super.render(position, scale);

            if (this.map) {
                this.map.move(position || this.iDPos, scale || this.dScale);
            }
        }

        // private
        calcPositionOfImageForPinch(scale) {
            if (!scale) {
                scale = this.dScale;
            }

            const w = this.iSize.width * scale.x;
            const h = this.iSize.height * scale.y;

            const dw = getDifference(this.iSize.width, w);
            const dh = getDifference(this.iSize.height, h);

            let x;
            let y;
            if (w > this.lensSize.width) {
                x = this.x - (getPercentValue(w, this.basePercentOfScale.x) + dw);
                x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
            } else {
                x = (this.lensSize.width / 2) - (w / 2 + dw);
            }

            if (h > this.lensSize.height) {
                y = this.y - (getPercentValue(h, this.basePercentOfScale.y) + dh);
                y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
            } else {
                y = (this.lensSize.height / 2) - (h / 2 + dh);
            }

            this.iPos = { x: x, y: y };
        }

        setScale(scale, x, y) {
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
                    if (this.map) { this.map.move(this.imagePosition, this.scale); }
                }
            }
        }

        // private
        afterZoom(lastScale) {
            this.calcPositionOfImageForPinch(this.scale);
            super.afterZoom(lastScale);
        }

        // private
        calcPositionOfImage(scale, first, _x, _y) {
            const sw = (_x || this.x);
            const sh = (_y || this.y);

            if (!scale) {
                scale = this.dScale;
            }

            const w = this.iSize.width * scale.x;
            const h = this.iSize.height * scale.y;
            const dw = getDifference(this.iSize.width, w);
            const dh = getDifference(this.iSize.height, h);
            let x;
            let y;

            // x = sw - getPercentValue(w, getPercent(sw, this.pSize.width)) - dw;
            // y = sh - getPercentValue(h, getPercent(sh, this.pSize.height)) - dh;

            // x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
            // y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);

            if (w > this.lensSize.width) {
                x = sw - getPercentValue(w, getPercent(sw, this.pSize.width)) - dw;
                x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
            } else {
                x = (this.lensSize.width / 2) - (w / 2 + dw);
            }

            if (h > this.lensSize.height) {
                y = sh - getPercentValue(h, getPercent(sh, this.pSize.height)) - dh;
                y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
            } else {
                y = (this.lensSize.height / 2) - (h / 2 + dh);
            }

            this.iPos = { x: x, y: y };
        }

        calcPositionOfImageInCenter(scale) {
            if (!scale) {
                scale = this.dScale;
            }

            const w = this.iSize.width * scale.x;
            const h = this.iSize.height * scale.y;
            const dw = getDifference(this.iSize.width, w);
            const dh = getDifference(this.iSize.height, h);

            // let x = this.x / (this.zoomNodeSize.width / w);
            // let y = this.y / (this.zoomNodeSize.height / h);
            let x = this.x / (this.lensSize.width / w);
            let y = this.y / (this.lensSize.height / h);

            x = this.lensSize.width / 2 - x - dw;
            y = this.lensSize.height / 2 - y - dh;

            x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
            y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);

            this.iPos = { x: x, y: y };
        }

        setBasePercent(point) {
            if ($J.contains([globalVariables.APPEARANCE.SHOWN, globalVariables.APPEARANCE.SHOWING], this.state)) {
                const is = this.iSize;
                const cw = is.width * this.scale.x;
                const ch = is.height * this.scale.y;
                const dw = getDifference(is.width, cw);
                const dh = getDifference(is.height, ch);

                this.basePercentOfScale = {
                    x: getPercent((Math.abs(this.iPos.x) + this.correctX(point.x)) - dw, cw),
                    y: getPercent((Math.abs(this.iPos.y) + this.correctY(point.y)) - dh, ch)
                };
            }
        }

        setImage(data) { //when will work last block "else" if deepZoom always true!?
            if (this.isShown() || this.isShowing()) {
                if (data.callbackData.map) {
                    if (this.map) {
                        this.map.setImg(data.src, data.srcset);
                    }
                } else {
                    super.setImage(data);
                }
            }
        }

        // private
        endOfShowing(isWithoutSettingEvents) {
            if (super.endOfShowing(isWithoutSettingEvents)) {
                if (this.map) {
                    this.map.show();
                }
            }
        }

        getImagePosition() {
            this.innerImagePosition = {
                x: getDifference(this.lensSize.width, this.zoomNodeSize.width),
                y: getDifference(this.lensSize.height, this.zoomNodeSize.height)
            };
        }

        /*
            public
            toLevel = max || undefined(default), first, zero
        */
        show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
            if (!super.show()) { return false; }

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

            this.showTimer = setTimeout(() => { // this timeout helps us to show non tile image without blink (cloned image manages to render)
                this.showTimer = null;
                this.emit('zoomBeforeShow', { data: {} });

                if (toLevel && toLevel !== 'max') {
                    let scale;

                    if (toLevel === 'zero') {
                        this.scale.x = this.baseScale.x;
                        this.scale.y = this.baseScale.y;
                    } else {
                        scale = this.deepZoom.getScale('zoomin');
                        this.scale.x = scale;
                        this.scale.y = scale;
                    }
                }

                this.calcPositionOfImage(this.scale, true);

                this.view.setEventNodePositionSize(this.pPos, this.pSize);

                this.dScale.x = this.baseScale.x;
                this.dScale.y = this.baseScale.y;

                this.iDPos = {
                    x: (getDifference(this.iSize.width, this.iSize.width * this.dScale.x) * (-1)) + this.innerImagePosition.x,
                    y: (getDifference(this.iSize.height, this.iSize.height * this.dScale.y) * (-1)) + this.innerImagePosition.y
                };

                this.view.setLensCss(this.lensPosition, this.lensSize);

                this.view.setImageSize(this.iDPos, this.iSize, this.dScale);

                this.boundaries = this.view.getBoundaries();

                if (this.map) {
                    this.map.prepare(this.iSize.width, this.iSize.height, this.pSize.width, this.pSize.height);
                }

                if (this.o.smoothing && toLevel !== 'zero') {
                    this.setEvents();
                    // this.animStep = getStepForAppearance(this.scale.x - this.baseScale.x);
                    this.animStep = 0.3;
                    this.animCb = () => {
                        this.deepZoomAction();
                        this.endOfShowing(true);
                    };
                } else {
                    this.endOfShowing();
                }

                if (this.o.smoothing) {
                    this.anim.start();
                }

                // deleted it from this.endOfShowing() function because it sometimes doesn't work
                this.sendZoomShownEvent();
            }, 0);
            return true;
        }

        hide(force) {
            const result = super.hide(force);

            if (result) {
                clearTimeout(this.showTimer);
                if (force) {
                    // empty
                } else {
                    if (this.scale.x !== this.baseScale.x || this.scale.y !== this.baseScale.y) {
                        // this.animStep = getStepForAppearance(this.scale.x - this.baseScale.x);
                        this.animStep = 0.4;
                        this.scale.x = this.baseScale.x;
                        this.scale.y = this.baseScale.y;

                        this.iPos = {
                            x: (getDifference(this.iSize.width, this.iSize.width * this.scale.x) * (-1)) + this.innerImagePosition.x,
                            y: (getDifference(this.iSize.height, this.iSize.height * this.scale.y) * (-1)) + this.innerImagePosition.y
                        };

                        this.animCb = () => {
                            this.endOfHiding();
                        };
                    } else {
                        this.endOfHiding();
                    }
                }
            }

            return result;
        }

        // private
        addMouseScrollEvent() {
            this.view.setEventToWrapper('mousescroll', (e) => {
                e.stop();

                if (this.o.pan) {
                    const is = this.iSize;
                    const cw = is.width * this.scale.x;
                    const ch = is.height * this.scale.y;
                    const dw = getDifference(is.width, cw);
                    const dh = getDifference(is.height, ch);

                    this.basePercentOfScale = {
                        x: getPercent((Math.abs(this.iPos.x) + this.correctX(e.x)) - dw, cw),
                        y: getPercent((Math.abs(this.iPos.y) + this.correctY(e.y)) - dh, ch)
                    };
                }

                let delta;
                const last = this.scale.x;

                if (e.isMouse) {
                    const percent = 37;
                    const v = (e.delta / getPercentValue(e.deltaFactor, percent));
                    this.scale.x += v;
                    this.scale.y += v;
                } else {
                    delta = e.delta;
                    if (Math.abs(delta) > 15) {
                        delta = 15;
                        if (e.delta < 0) {
                            delta *= (-1);
                        }
                    }

                    delta /= 350;

                    this.scale.x += delta;
                    this.scale.y += delta;
                }

                this.scale.x = checkRange(this.scale.x, this.baseScale.x, 1);
                this.scale.y = checkRange(this.scale.y, this.baseScale.y, 1);

                if (this.o.pan) {
                    this.setXY(e.x, e.y);
                    this.calcPositionOfImageForPinch(this.scale);
                } else {
                    this.calcPositionOfImage(this.scale);
                }

                if (last !== this.scale.x) {
                    this.sendZoomingAction();
                    this.setCursorState();
                    if (!this.o.smoothing) {
                        this.dScale.x = this.scale.x;
                        this.dScale.y = this.scale.y;
                        this.iDPos.x = this.iPos.x;
                        this.iDPos.y = this.iPos.y;
                        this.deepZoomAction();
                        this.view.setImagePosition(this.iPos, this.scale);
                        if (this.map) { this.map.move(this.iPos, this.scale); }
                    }
                }

                this.hideByTimer();
            });
        }

        hideByTimer() {
            clearTimeout(this.hideTimer);

            if (this.scale.x <= this.baseScale.x + 0.00000001 && this.o.type !== 'outside') {
                this.hideTimer = setTimeout(() => {
                    this.hide(true);
                }, 1000);
            }
        }

        // private
        addInnerTouchDrag() {
            let move = false;
            let lastX;
            let lastY;
            let currentWidth;
            let currentHeight;
            let dw;
            let dh;

            this.view.setEventToWrapper(TOUCH, (e) => {
                e.stop();

                if (e.state === 'dragstart') {
                    move = true;
                    this.view.addEventsCanvasClass(CURSOR_STATES.drag);

                    this.stopMovingAndZooming();

                    // this.scale.x = this.dScale.x;
                    // this.scale.y = this.dScale.y;

                    this.setXY(e.x, e.y);

                    currentWidth = this.iSize.width * this.scale.x;
                    currentHeight = this.iSize.height * this.scale.y;
                    dw = getDifference(this.iSize.width, currentWidth);
                    dh = getDifference(this.iSize.height, currentHeight);

                    lastX = e.x;
                    lastY = e.y;
                } else if (e.state === 'dragend') {
                    move = false;
                    this.view.removeEventsCanvasClass(CURSOR_STATES.drag);
                } else if (move) {
                    this.setXY(e.x, e.y);

                    if (currentWidth > this.lensSize.width) {
                        this.iPos.x += (e.x - lastX);
                        this.iPos.x = checkImagePosition(this.iPos.x, 0 - dw, dw + currentWidth, this.lensSize.width);
                    } else {
                        this.iPos.x = (this.lensSize.width / 2) - (currentWidth / 2 + dw);
                    }

                    if (currentHeight > this.lensSize.height) {
                        this.iPos.y += (e.y - lastY);
                        this.iPos.y = checkImagePosition(this.iPos.y, 0 - dh, dh + currentHeight, this.lensSize.height);
                    } else {
                        this.iPos.y = (this.lensSize.height / 2) - (currentHeight / 2 + dh);
                    }

                    if (this.o.smoothing && this.o.pan) {
                        this.animStep = 0.3;
                    } else {
                        this.iDPos.x = this.iPos.x;
                        this.iDPos.y = this.iPos.y;
                        this.deepZoomAction();
                        this.view.setImagePosition(this.iPos, this.scale);
                        if (this.map) {
                            this.map.move(this.iPos, this.scale);
                        }
                    }

                    lastX = e.x;
                    lastY = e.y;
                }
            });
        }

        // private
        addInnerPinch() {
            let timer;
            let startScale;
            const saveValue = 1 - this.baseScale.x;
            let scale;
            let maxCompensation;
            let minCompensation;
            let max;
            let min;

            if (!this.o.customZooming) { return; }

            this.view.setEventToWrapper('pinch', (e) => {
                e.stop();

                if (e.state === 'pinchstart') {
                    clearTimeout(timer);
                    this.stopMovingAndZooming();
                    this.view.node.removeEvent(TOUCH);

                    this.scale.x = this.dScale.x;
                    this.scale.y = this.dScale.y;

                    startScale = this.scale.x;

                    maxCompensation = 1;
                    minCompensation = 1;
                    max = 1;
                    min = this.baseScale.x;

                    this.setBasePercent(e.centerPoint);
                } else if (e.state === 'pinchresize') {
                    this.setBasePercent(e.centerPoint);
                } else if (e.state === 'pinchmove') {
                    this.setXY(e.centerPoint.x, e.centerPoint.y);

                    scale = e.scale;
                    scale *= startScale;

                    if (max < scale) {
                        max = scale;

                        min = this.baseScale.x;
                        minCompensation = 1;

                        maxCompensation = saveValue / (max - this.baseScale.x);
                    }

                    if (min > scale) {
                        min = scale;

                        max = 1;
                        maxCompensation = 1;

                        minCompensation = this.baseScale.x / min;
                    }

                    scale = (this.baseScale.x + (scale - this.baseScale.x) * maxCompensation) * minCompensation;

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
                        this.iDPos.x = this.iPos.x;
                        this.iDPos.y = this.iPos.y;
                        this.deepZoomAction();
                        this.view.setImagePosition(this.iPos, this.scale);
                        if (this.map) { this.map.move(this.iPos, this.scale); }
                    }
                } else if (e.state === 'pinchend') {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        this.addInnerTouchDrag();
                    }, 42);

                    if (this.scale.x <= this.baseScale.x + 0.00000001 && this.o.type !== 'outside' && this.state !== globalVariables.APPEARANCE.HIDING) {
                        clearTimeout(timer);
                        this.hide(true);
                    }
                }
            });
        }

        hideZoomByMouseOut() {
            const cb = (e) => {
                if (outOfSquare(e.getClientXY(), this.view.getContainerPosition(), this.view.getContainerSize(), $J.D.getScroll())) {
                    this.view.removeGlobalEvent();
                    this.hide();
                }
            };

            this.view.addGlobalEvent(cb);
        }

        // private
        setEvents() {
            if (this.setUpEvent && $J.browser.mobile) {
                this.view.setEventToWrapper(TOUCHEND, (e) => {
                    e.stop();
                    this.hide(true);
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
                this.view.setEventToMainContainer(MOVE, (e) => {
                    if (e.pointerType && e.pointerType === 'touch') { return; }
                    e.stop();

                    const pageXY = e.getPageXY();
                    this.move(pageXY.x, pageXY.y);
                });
            }
        }

        // private
        keepOldPosition(oldLensSize) {
            let x = this.iPos.x;
            let y = this.iPos.y;
            const w = this.iSize.width * this.scale.x;
            const h = this.iSize.height * this.scale.y;
            const dw = getDifference(this.iSize.width, w);
            const dh = getDifference(this.iSize.height, h);

            x -= ((oldLensSize.width - this.lensSize.width) / 2);
            y -= ((oldLensSize.height - this.lensSize.height) / 2);

            if (w > this.lensSize.width) {
                x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
            } else {
                x = (this.lensSize.width / 2) - (w / 2 + dw);
            }

            if (h > this.lensSize.height) {
                y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);
            } else {
                y = (this.lensSize.height / 2) - (h / 2 + dh);
            }

            this.iPos = { x: x, y: y };
        }

        onResize() {
            const oldLensSize = this.lensSize;
            super.onResize();
            if (this.state !== globalVariables.APPEARANCE.HIDDEN) {
                if (this.state !== globalVariables.APPEARANCE.HIDING) {
                    this.keepOldPosition(oldLensSize);
                    this.getImagePosition();
                    if (this.map) {
                        const mWidth = parseInt(getPercentValue(this.pSize.width / 2, this.o.mapSize), 10);
                        const mHeight = parseInt(getPercentValue(this.pSize.height / 2, this.o.mapSize), 10);
                        this.map.resize(mWidth, mHeight, this.iSize.width, this.iSize.height, this.pSize.width, this.pSize.height);


                        if (!this.o.smoothing) {
                            this.map.move(this.iPos, this.scale);
                        }
                    }
                }
            }
        }

        destroy() {
            clearTimeout(this.showTimer);

            if (this.map) {
                this.map.destroy();
                this.map = null;
                this.off('zoomGetImage');
                this.off('zoomMapNewPosition');
            }

            super.destroy();
        }
    }

    return IController;
})();

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
const MagnifierController = (() => {
    const MIN_SIZE_OF_LENS = 10;
    const MAX_SIZE_OF_LENS = 90;
    const DEFAULT_MAGNIFIER_SIZE = 70; // percent
    const DEFAULT_MOBILE_MAGNIFIER_ZOOM_MARGIN = 65;

    const checkMinMax = (size) => {
        let factor;

        if (size.width >= size.height) {
            factor = size.width / size.height;
        } else {
            factor = size.height / size.width;
        }

        const min = MIN_SIZE_OF_LENS;
        const max = MAX_SIZE_OF_LENS;

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
    };

    // eslint-disable-next-line no-unused-vars
    class MController extends Controller {
        constructor(view, o) {
            if ($J.browser.mobile && o.margin === 9) { delete o.margin; }
            super(view, $J.extend({
                width: 70, // percent
                height: 70, // percent
                margin: DEFAULT_MOBILE_MAGNIFIER_ZOOM_MARGIN
            }, o));

            this.setUpEvent = false;
            this.isSquare = true;
            this.ANIM_STEP = 0.4;
        }

        init() {
            super.init();
            this.setLensSize();
        }

        // private
        setLensSize() {
            const s = { width: this.o.width, height: this.o.height };

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

            this.currentLensSize = checkMinMax({ width: s.width, height: s.height });

            this.ANIM_STEP = 0.6;
        }

        // private
        calcSizeOfLens() {
            if (this.isSquare) {
                const ps = this.pSize;
                const cls = this.currentLensSize;
                const value = getPercentValue(Math.min(ps.width, ps.height), cls.width);
                this.setSizeOfLens(value, value);
            } else {
                super.calcSizeOfLens();
            }
        }

        // private
        calcPositionOfLens() {
            const ps = this.pSize;
            let margin = this.o.margin;
            //eslint-disable-next-line no-unused-vars
            // let lensPositionState = 'top'; // top left right bottom;

            if (margin < 0) { margin = 0; }

            if (this.x < 0) { this.x = 0; }
            if (this.y < 0) { this.y = 0; }
            if (this.x > ps.width) { this.x = ps.width; }
            if (this.y > ps.height) { this.y = ps.height; }

            let top;
            let left;

            top = this.y - this.lensHalfSize.height;
            left = this.x - this.lensHalfSize.width;

            // if (!$J.browser.mobile) {
            //     margin = 0;
            // }

            let scroll;
            let ws;
            const pp = this.pPos;

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
            }

            // if ($J.contains(['top', 'bottom'], lensPositionState) && !$J.browser.mobile) {
            //     if (pp.left + left < scroll.x) {
            //         left = scroll.x - pp.left;
            //     }

            //     if (pp.left + left + this.lensSize.width > scroll.x + ws.width) {
            //         left = scroll.x - pp.left + ws.width - this.lensSize.width;
            //     }
            // }

            this.lensPosition = { top: top, left: left };
        }

        calcPositionOfImage(scale, first, _x, _y) {
            const sw = (_x || this.x);
            const sh = (_y || this.y);
            const x = this.lensHalfSize.width - getPercentValue(this.iSize.width, getPercent(sw, this.pSize.width));
            const y = this.lensHalfSize.height - getPercentValue(this.iSize.height, getPercent(sh, this.pSize.height));

            this.iPos = { x: x, y: y };
        }

        // private
        getPercentSize(value, side) {
            if (/%$/.test(value)) {
                value = parseInt(value, 10);
            } else {
                value = parseInt(value, 10);
                value /= (this.pSize[side] / 100);
            }

            return value;
        }

        // private
        setEvents() {
            if (this.setUpEvent && !this.o.pan) {
                this.view.setEventToMainContainer(TOUCHEND, (e) => {
                    e.stop();
                    this.hide(true);
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
                this.view.setEventToMainContainer(MOVE, (e) => {
                    if (e.pointerType && e.pointerType === 'touch') { return; }
                    e.stop();

                    const pageXY = e.getPageXY();
                    this.move(pageXY.x, pageXY.y);

                    if (this.x <= 0 || this.y <= 0 || this.x >= this.pSize.width || this.y >= this.pSize.height) {
                        this.hide();
                    }
                });
            }
        }

        afterMove() {
            this.calcPositionOfLens();
            this.calcPositionOfImage(this.scale);
            this.view.setLensPosition(this.lensPosition);
            super.afterMove();
        }

        // private
        changeLensSize(size) {
            const min = MIN_SIZE_OF_LENS;
            const max = MAX_SIZE_OF_LENS;

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
        }

        // private
        addMouseScroollEvent() {
            this.view.setEventToWrapper('mousescroll', (e) => {
                e.stop();

                let i;
                const delta = e.delta;
                const s = { width: 0, height: 0 };

                if (this.isSquare) {
                    for (i in s) {
                        if ({}.hasOwnProperty.call(s, i)) {
                            s[i] = this.currentLensSize[i] + delta;
                        }
                    }
                } else {
                    i = this.currentLensSize.height / this.currentLensSize.width;
                    s.width = this.currentLensSize.width + delta;
                    s.height = this.currentLensSize.height + delta * i;
                }

                this.changeLensSize(s);
            });
        }

        // private
        addMouseOverEvent() {
            this.view.setEventToMainContainer('mouseover', (e) => {
                e.stop();

                const pageXY = e.getPageXY();
                this.setXY(pageXY.x, pageXY.y);

                this.calcPositionOfLens();
                this.calcPositionOfImage();

                this.view.setLensPosition({
                    top: this.lensPosition.top,
                    left: this.lensPosition.left
                });

                this.view.setImagePosition(this.iPos, this.scale);
            });
        }

        // private
        addMouseOutEvent() {
            this.view.setEventToWrapper('mouseout', (e) => {
                // let toElement = e.toElement || e.relatedTarget;
                let toElement = e.getRelated();

                // if we change between workspace we must to hide the lens
                // if (!toElement) { return; }

                while (toElement && toElement !== this.node && toElement !== this.lensContainer && toElement !== this.eventsCanvasNode) {
                    toElement = toElement.parentNode;
                }

                if (this.node !== toElement && this.eventsCanvasNode !== toElement) {
                    const p = e.getClientXY();
                    if (p.x < this.boundaries.left || p.x > this.boundaries.right
                        || p.y < this.boundaries.top || p.y > this.boundaries.bottom
                    ) {
                        e.stop();
                        if (this.o.smoothing) {
                            this.hide();
                        } else {
                            this.hide(true);
                        }
                    }
                }
            });
        }

        // private
        addDragEvent() {
            let move = false;
            this.view.setEventToMainContainer(TOUCH, (e) => {
                e.stop();
                if (e.state === 'dragstart') {
                    move = true;
                } else if (e.state === 'dragend') {
                    move = false;
                } else if (move) {
                    this.move(e.x, e.y);
                }
            });
        }

        // private
        addTapEvent() {
            this.view.setEventToMainContainer(this.o.trigger === 'dblclick' ? 'dbltap' : 'tap', (e) => {
                e.stop();
                if (this.o.smoothing) {
                    this.hide();
                } else {
                    this.hide(true);
                }
            });
        }

        hide(force) {
            const result = super.hide(force);

            if (result) {
                if (force) {
                    // empty
                } else {
                    this.view.setEventToWrapper('transitionend', (e) => {
                        e.stop();
                        this.view.removeEventFromWrapper('transitionend');
                        this.endOfHiding();
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
        show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
            if (!super.show()) { return false; }

            this.emit('zoomBeforeShow', { data: {} });

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
            this.calcPositionOfLens();
            // this.getImagePosition();
            this.getBaseScale();
            this.showDeepZoom(bigImageOptions.originWidth, bigImageOptions.originHeight);

            // this.calcPositionOfImage(false, true);
            this.calcPositionOfImage(this.scale, true);

            this.view.setEventNodePositionSize(this.pPos, this.pSize);

            this.dScale.x = this.baseScale.x;
            this.dScale.y = this.baseScale.y;

            this.iDPos = {
                x: (getDifference(this.iSize.width, this.iSize.width * this.dScale.x) * (-1)) - this.lensPosition.left,
                y: (getDifference(this.iSize.height, this.iSize.height * this.dScale.y) * (-1)) - this.lensPosition.top
            };

            this.view.setLensCss(this.lensPosition, this.lensSize, 'opacity .15s linear, transform .15s linear');

            this.view.setImageSize(this.iDPos, this.iSize, this.dScale);

            this.boundaries = this.view.getBoundaries();

            if (this.o.smoothing) {
                this.view.setEventToWrapper('transitionend', (e) => {
                    e.stop();
                    this.view.removeEventFromWrapper('transitionend');
                    this.view.setLensStyle({ transition: '' });
                    this.sendZoomShownEvent();
                });
                this.endOfShowing();
                this.anim.start();
            } else {
                this.endOfShowing();
                this.sendZoomShownEvent();
            }

            // deleted it from this.endOfShowing() function because it sometimes doesn't work
            // this.sendZoomShownEvent();

            return true;
        }
    }

    return MController;
})();

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
const OutsideController = (() => {
    const DEFAULT_OUTSIDE_ZOOM_MARGIN = 9; // px

    class OController extends Controller {
        constructor(view, o) {
            super(view, $J.extend({
                margin: DEFAULT_OUTSIDE_ZOOM_MARGIN,
                outsidePosition: 'right', // top, left, right, bottom
                width: 100, // percent
                height: 100, // percent
            }, o));

            this.showingParams = null;

            this.eye = new Eye(this.view.getNodeForEye(), this.o.trigger === 'hover');
            this.ANIM_STEP = 0.18;
            this.mouseOutHandler = this.mouseOut.bind(this);
        }

        getBoundaries() {
            this.boundaries = this.eye.getBoundaries();
        }

        init() {
            super.init();
            this.setLensSize();
        }

        // private
        setEyesParams() {
            const sw = this.currentLensSize.width / (this.iSize.width * this.scale.x);
            const sh = this.currentLensSize.height / (this.iSize.height * this.scale.y);

            this.eye.setSize({
                width: sw * this.zoomNodeSize.width,
                height: sh * this.zoomNodeSize.height
            });

            this.eye.setPosition(this.x, this.y);
        }

        calcPositionOfLens() {
            let margin = this.o.margin;
            const ps = this.pSize;
            const pp = this.pPos;

            if (margin < 0) { margin = 0; }

            let t = pp.top;
            let l = pp.left;

            switch (this.o.outsidePosition) {
                case 'top':
                    t += (this.lensSize.height + margin) * (-1);
                    break;
                case 'left':
                    l += (this.lensSize.width + margin) * (-1);
                    break;
                case 'right':
                    l += (ps.width + margin);
                    break;
                case 'bottom':
                    t += (ps.height + margin);
                    break;

                //no default
            }

            this.lensPosition = { top: t, left: l };
        }

        calcPositionOfImage(scale) {
            if (!scale) { scale = this.dScale; }

            const w = this.iSize.width * scale.x;
            const h = this.iSize.height * scale.y;
            const dw = getDifference(this.iSize.width, w);
            const dh = getDifference(this.iSize.height, h);


            let x = this.x / (this.zoomNodeSize.width / w);
            let y = this.y / (this.zoomNodeSize.height / h);

            x = this.lensSize.width / 2 - x - dw;
            y = this.lensSize.height / 2 - y - dh;

            x = checkImagePosition(x, 0 - dw, dw + w, this.lensSize.width);
            y = checkImagePosition(y, 0 - dh, dh + h, this.lensSize.height);

            this.iPos = { x: x, y: y };
        }

        afterMove() {
            this.calcPositionOfLens();
            this.calcPositionOfImage(this.scale);
            this.setEyesParams();
            this.view.setLensPosition(this.lensPosition);
            super.afterMove();
        }

        hide(force) {
            const result = super.hide(force);

            if (result) {
                if (!$J.browser.mobile) {
                    this.view.removeMouseMoveEvent(this.mouseOutHandler);
                }

                this.eye.clearEvents();

                this.eye.hide();
                if (force) {
                    // empty
                } else {
                    this.view.removeEvents();
                    this.endOfHiding();
                }
            }

            return result;
        }

        // private
        getShowingPropertiesToOutsideMode() {
            const result = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };

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
        }

        // private
        endOfShowing() {
            super.endOfShowing();
            this.getBoundaries();
        }

        /*
            public
            toLevel = max || undefined(default), first, zero
        */
        show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
            if (!super.show()) { return false; }

            this.emit('zoomBeforeShow', { data: {} });

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
            this.calcPositionOfLens();
            // this.getImagePosition();
            this.getBaseScale();
            this.showDeepZoom(bigImageOptions.originWidth, bigImageOptions.originHeight);

            // this.calcPositionOfImage(false, true);
            this.calcPositionOfImage(this.scale, true);

            this.view.setEventNodePositionSize(this.pPos, this.pSize);

            this.dScale.x = this.baseScale.x;
            this.dScale.y = this.baseScale.y;

            this.iDPos = {
                x: getDifference(this.iSize.width, this.iSize.width * this.dScale.x) * (-1),
                y: getDifference(this.iSize.height, this.iSize.height * this.dScale.y) * (-1)
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
            }

            // deleted it from this.endOfShowing() function because it sometimes doesn't work
            this.sendZoomShownEvent();

            return true;
        }

        setLensSize() {
            const s = { width: this.o.width, height: this.o.height };

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

            this.currentLensSize = { width: s.width, height: s.height };
        }

        calcSizeOfLens() {
            const cls = this.currentLensSize;
            this.lensSize = { width: cls.width, height: cls.height };
            this.lensHalfSize = {
                width: this.lensSize.width / 2,
                height: this.lensSize.height / 2
            };
        }

        // private
        setEvents() {
            if ($J.browser.mobile && this.o.pan) {
                this.addOutsideTouchDrag();
            }

            // TODO maybe remove it
            if (!$J.browser.mobile && $J.browser.touchScreen && helper.isIe()) {
                if (!this.o.pan) {
                    this.eye.setEventToMainContainer('pointerup', (e) => {
                        this.hide();
                    });
                }
            }

            this.eye.setEventToMainContainer('mousemove', (e) => {
                e.stop();
                const pageXY = e.getPageXY();
                this.move(pageXY.x, pageXY.y);
            });

            if (this.o.trigger === 'hover') {
                if (!$J.browser.mobile) {
                    this.view.addMouseMoveEvent(this.mouseOutHandler);
                }

                this.eye.setEventToMainContainer('mouseout', this.mouseOutHandler);
            } else {
                let eventName = 'btnclick tap';
                if (this.o.trigger === 'dblclick') {
                    eventName = 'dblbtnclick dbltap';
                }

                this.eye.setEventToMainContainer(eventName, (e) => {
                    this.hide();
                });
            }

            if (this.o.customZooming) {
                this.setMouseScrollEvent();
            }
        }

        mouseOut(e) {
            const p = e.getClientXY();
            if (p.x < this.boundaries.left || p.x > this.boundaries.right
                || p.y < this.boundaries.top || p.y > this.boundaries.bottom
            ) {
                this.hide(!this.getZoomData());
            }
        }

        // private
        // it works if trigger !== 'hover'
        addOutsideTouchDrag() {
            let isStart = false;
            this.eye.setEventToMainContainer(TOUCH, (e) => {
                e.stop();
                if (e.state === 'dragstart') {
                    isStart = true;
                } else if (e.state === 'dragend') {
                    isStart = false;
                } else if (isStart) {
                    this.move(e.x, e.y);
                }
            });
        }

        // private
        setMouseScrollEvent() {
            this.eye.setEventToMainContainer('mousescroll', (e) => {
                const last = this.scale.x;
                let delta;

                e.stop();

                if (e.isMouse) {
                    const percent = 37;
                    const v = (e.delta / getPercentValue(e.deltaFactor, percent));
                    this.scale.x += v;
                    this.scale.y += v;
                } else {
                    delta = e.delta;
                    if (Math.abs(delta) > 15) {
                        delta = 15;
                        if (e.delta < 0) {
                            delta *= (-1);
                        }
                    }

                    delta /= 350;

                    this.scale.x += delta;
                    this.scale.y += delta;
                }

                this.scale.x = checkRange(this.scale.x, this.baseScale.x, 1);
                this.scale.y = checkRange(this.scale.y, this.baseScale.y, 1);

                this.calcPositionOfImage(this.scale);

                if (last !== this.scale.x) {
                    this.sendZoomingAction();
                    this.setCursorState();
                    if (!this.o.smoothing) {
                        this.dScale.x = this.scale.x;
                        this.dScale.y = this.scale.y;
                        this.iDPos.x = this.iPos.x;
                        this.iDPos.y = this.iPos.y;
                        this.deepZoomAction();
                        this.setImagePosition(this.iPos, this.scale);
                    }
                    this.setEyesParams();
                }
            });
        }

        setLensStyleOnResize() {
            this.view.setLensPosition(this.lensPosition);
            this.view.setCanvasNodeSize(this.lensSize);
        }

        onResize() {
            super.onResize();

            if (this.state !== globalVariables.APPEARANCE.HIDDEN && this.state !== globalVariables.APPEARANCE.HIDING) {
                this.eye.resize();
            }
        }

        destroy() {
            this.eye.destroy();
            this.view.removeMouseMoveEvent(this.mouseOutHandler);
            super.destroy();
        }
    }

    return OController;
})();

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
class ImageZoom extends EventEmitter {
    constructor(parentNode, o) {
        super();

        this.zoomType = o.type;

        if (o.type === 'inner') {
            this.view = new InnerView(parentNode);
            this.view.addClassToWrapper('inner');
            this.controller = new InnerController(this.view, o);
        } else if ($J.contains(['circle', 'square'], o.type)) {
            this.view = new MagnifierView(parentNode);
            this.view.addClassToWrapper(o.type);
            this.controller = new MagnifierController(this.view, o);
        } else { // outside
            this.view = new OutsideView(parentNode);
            this.view.addClassToWrapper('outside');
            this.controller = new OutsideController(this.view, o);
        }

        this.controller.setParent(this);
        this.controller.init();
    }

    setLensContainer(lensContainer) {
        this.controller.setLensContainer(lensContainer);
    }

    isShown() {
        return this.controller.isShown();
    }

    getZoomData(scale) {
        return this.controller.getZoomData(scale);
    }

    getNextMinZoom() {
        return this.controller.getNextMinZoom();
    }

    getNextMaxZoom() {
        return this.controller.getNextMaxZoom();
    }

    zoomUp(x, y) {
        return this.controller.zoomUp(x, y);
    }

    zoomDown(x, y) {
        return this.controller.zoomDown(x, y);
    }

    showCenter(smallImg, largeImg, toLevel) {
        return this.controller.showCenter(smallImg, largeImg, toLevel);
    }

    isShowing() {
        return this.controller.isShowing();
    }

    setImage(data) {
        this.controller.setImage(data);
    }

    show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel) {
        return this.controller.show(smallImg, bigImageOptions, x, y, actionEndHide, toLevel);
    }

    hide(force) {
        return this.controller.hide(force);
    }

    customMove(x, y) {
        this.controller.customMove(x, y);
    }

    getBaseScale() {
        return this.controller.baseScale;
    }

    setBasePercent(point) {
        if (this.zoomType === 'inner') {
            this.controller.setBasePercent(point);
        }
    }

    setScale(scale, x, y) {
        if (this.zoomType === 'inner') {
            this.controller.setScale(scale, x, y);
        }
    }

    onResize() {
        this.controller.onResize();
    }

    destroy() {
        this.view.destroy();
        this.controller.destroy();
    }
}

return ImageZoom;

    }
);
