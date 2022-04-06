Sirv.define(
    'Spin',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','EventEmitter','Zoominstance','ResponsiveImage','Hint','ProgressLoader','SpinHotspots'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,EventEmitter,Zoominstance,ResponsiveImage,Hint,ProgressLoader,SpinHotspots) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName('Spin', () => {
            return '.sirv-spin{-ms-user-select:none!important;user-select:none!important;display:inline-block;position:relative;width:100%;max-width:100%;height:100%;padding:0!important;transform:translate3d(0,0,0);outline:0;outline:0!important;color:#000;font-size:0!important;line-height:100%!important;text-decoration:none;overflow:hidden;vertical-align:middle;visibility:visible;backface-visibility:hidden;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none!important}.sirv-spin::before{display:inline-block;height:0;content:\'\';vertical-align:top}.sirv-spin .spin-canvas-container{position:absolute}.sirv-spin .spin-canvas-container,.sirv-spin canvas{top:0;right:0;bottom:0;left:0;margin:auto}.sirv-spin canvas{transition:opacity 1s linear,filter 2s linear;opacity:0;z-index:1}.sirv-spin canvas.smv-shown{opacity:1!important}.sirv-spin canvas.smv-zoomed-in{visibility:hidden!important}.sirv-spin-message{display:block;position:absolute;top:50%;left:33%;width:33%;padding:6px;border:1px solid #aaa;border-radius:15px;background-color:#fff;background-image:none;color:#000;font-size:10px;text-align:center;border-collapse:separate;box-shadow:0 0 10px #000;overflow:hidden;z-index:100}.sirv-hint .spin-hint-animation{display:none;position:relative;width:40px;height:40px;margin-right:10px;transform-style:preserve-3d;vertical-align:middle;perspective:200px}.sirv-hint .sirv-hint-message .spin-hint-animation::before{display:inline-block;position:absolute;top:0;right:0;bottom:0;left:0;width:40%;height:30%;margin:auto;transform-origin:50% 50% -15px;border:1px solid #fff;box-shadow:inset 0 0 1px 1px rgba(255,255,255,.5);content:\'\';box-sizing:border-box}.sirv-hint.spin-hint-horizontal-animation .sirv-hint-message .spin-hint-animation::before{transform:translateZ(0) rotateY(0);animation:sirv-spin-hint-horizontal-rotate 3s infinite linear}@keyframes sirv-spin-hint-horizontal-rotate{0%{transform:translateZ(0) rotateY(0)}5%{transform:translateZ(100px) rotateY(0)}7%{transform:translateZ(75px) rotateY(0)}20%{transform:translateZ(75px) rotateY(0)}30%{transform:translateZ(75px) rotateY(45deg)}40%{transform:translateZ(75px) rotateY(0)}50%{transform:translateZ(75px) rotateY(-45deg)}60%{transform:translateZ(75px) rotateY(0)}63%{transform:translateZ(75px) rotateY(0)}68%{transform:translateZ(-25px) rotateY(0)}70%{transform:translateZ(0) rotateY(0)}80%{transform:translateZ(0) rotateY(0)}100%{transform:translateZ(0) rotateY(0)}}.sirv-hint.spin-hint-vertical-animation .spin-hint-message .spin-hint-animation::before{transform:translateZ(0) rotateX(0);animation:sirv-spin-hint-vertical-rotate 3s infinite linear}@keyframes sirv-spin-hint-vertical-rotate{0%{transform:translateZ(0) rotateX(0)}5%{transform:translateZ(100px) rotateX(0)}7%{transform:translateZ(75px) rotateX(0)}20%{transform:translateZ(75px) rotateX(0)}30%{transform:translateZ(75px) rotateX(45deg)}40%{transform:translateZ(75px) rotateX(0)}50%{transform:translateZ(75px) rotateX(-45deg)}60%{transform:translateZ(75px) rotateX(0)}63%{transform:translateZ(75px) rotateX(0)}68%{transform:translateZ(-25px) rotateX(0)}70%{transform:translateZ(0) rotateX(0)}80%{transform:translateZ(0) rotateX(0)}100%{transform:translateZ(0) rotateX(0)}}.sirv-hint.spin-hint-horizontal-animation.spin-hint-vertical-animation .sirv-hint-message .spin-hint-animation::before{transform:translateZ(0) rotateX(0) rotateY(0);animation:sirv-spin-hint-double-rotate 5s infinite linear}@keyframes sirv-spin-hint-double-rotate{0%{transform:translateZ(0) rotateX(0) rotateY(0)}4%{transform:translateZ(100px) rotateX(0) rotateY(0)}5%{transform:translateZ(75px) rotateX(0) rotateY(0)}10%{transform:translateZ(75px) rotateX(0) rotateY(0)}19%{transform:translateZ(75px) rotateX(0) rotateY(45deg)}28%{transform:translateZ(75px) rotateX(0) rotateY(0)}37%{transform:translateZ(75px) rotateX(0) rotateY(-45deg)}45%{transform:translateZ(75px) rotateX(0) rotateY(0)}54%{transform:translateZ(75px) rotateX(45deg) rotateY(0)}63%{transform:translateZ(75px) rotateX(0) rotateY(0)}72%{transform:translateZ(75px) rotateX(-45deg) rotateY(0)}81%{transform:translateZ(75px) rotateX(0) rotateY(0)}85%{transform:translateZ(-25px) rotateX(0) rotateY(0)}86%{transform:translateZ(0) rotateX(0) rotateY(0)}90%{transform:translateZ(0) rotateX(0) rotateY(0)}100%{transform:translateZ(0) rotateX(0) rotateY(0)}}.smv-progress-loader{bottom:0;left:0;margin-bottom:5px;margin-left:5px}';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-semi */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const defaultOptions = {
    // Swap rows and columns, i.e. "2 rows x 36 columns" spin behaves like "36 rows x 2 columns".
    swapSides: { type: 'boolean', defaults: false },
    wheel: { type: 'boolean', defaults: true },
    initialize: { type: 'string', 'enum': ['load', 'hover', 'click', 'tap'], defaults: 'load' },
    freeDrag: { type: 'boolean', defaults: false },
    tappingFirst: { type: 'boolean', defaults: false },

    thumbnail: {
        // thumbnail.type
        type: { type: 'string', 'enum': ['image', 'gif'], defaults: 'image' },
        // thumbnail.gifParams
        gifParams: { type: 'string', defaults: '' }
    },

    zoom: {
        // zoom.enable
        enable: { type: 'boolean', defaults: true },
        // zoom.ratio
        ratio: {
            oneOf: [
                { type: 'number', minimum: 0 },
                { type: 'string', 'enum': ['max'] }
            ],

            defaults: 2.5
        },
        // zoom.tiles
        tiles: { type: 'boolean', defaults: true },
        // zoom.pan
        pan: { type: 'boolean', defaults: true }
    },

    inactivity: { type: 'number', minimum: 1000, defaults: 3000 },

    autospin: {
        // autospin.enable
        enable: { type: 'boolean', defaults: false },
        // autospin.type
        type: { type: 'string', 'enum': ['row', 'sphere', 'full', 'helix'], defaults: 'sphere' },
        // autospin.resume
        resume: { type: 'number', minimum: 0, defaults: 3000 },
        // autospin.duration
        duration: { type: 'number', minimum: 0, defaults: 3600 }
    },

    hint: {
        message: {
            // hint.message.enable
            enable: { type: 'boolean', defaults: true },
            // hint.message.text
            text: { type: 'string', defaults: 'Drag to spin' }
        },

        onStart: {
            // hint.onStart.enable
            enable: { type: 'boolean', defaults: true },
            // hint.onStart.effect
            effect: {
                oneOf: [
                    { type: 'string', 'enum': ['intro', 'twitch', 'spin', 'momentum', 'sphere', 'none'] },
                    { type: 'boolean', 'enum': [false] }
                ],
                defaults: 'intro'
            }
        },

        onVisible: {
            // hint.onVisible.enable
            enable: { type: 'boolean', defaults: true },
            // hint.onVisible.effect
            effect: {
                oneOf: [
                    { type: 'string', 'enum': ['intro', 'twitch', 'spin', 'momentum', 'sphere', 'none'] },
                    { type: 'boolean', 'enum': [false] }
                ],
                defaults: 'twitch'
            }
        },

        onInactive: {
            // hint.onInactive.enable
            enable: { type: 'boolean', defaults: true },
            // hint.onInactive.effect
            effect: {
                oneOf: [
                    { type: 'string', 'enum': ['intro', 'twitch', 'spin', 'momentum', 'sphere', 'none'] },
                    { type: 'boolean', 'enum': [false] }
                ],
                defaults: 'twitch'
            }
        }
    },

    row: {
        // Row/Column from which to start spin. 'auto' means to fetch these from the image filename (img.src)
        // row.start
        start: { type: 'number', minimum: 1, defaults: 1 },
        // should the spin loop rows (y)
        // row.loop
        loop: { type: 'boolean', defaults: false },
        // whether photos are taken in the reverse order
        // row.increment
        increment: { type: 'number', minimum: 1, defaults: 1 },
        // whether photos are taken in the reverse order
        // row.reverse
        reverse: { type: 'boolean', defaults: false },
        //row.sensitivity
        sensitivity: { type: 'number', 'minimum': 1, 'maximum': 100, defaults: 50 }, // speed of spin (1 - 100)
    },

    column: {
        // Row/Column from which to start spin. 'auto' means to fetch these from the image filename (img.src)
        // col.start
        start: { type: 'number', minimum: 1, defaults: 1 },
        // should the spin loop columns in row (x)
        // col.loop
        loop: { type: 'boolean', defaults: true },
        // whether photos are taken in the reverse order
        // col.increment
        increment: { type: 'number', minimum: 1, defaults: 1 },
        // whether photos are taken in the reverse order
        // col.reverse
        reverse: { type: 'boolean', defaults: false },
        //column.sensitivity
        sensitivity: { type: 'number', 'minimum': 1, 'maximum': 100, defaults: 50 }, // speed of spin (1 - 100)
    }
};

const mobileDefaults = {
    // hint: {
    //     message: {
    //         text: { type: 'string', defaults: 'Tap to spin' }
    //     }
    // }
};

/* eslint-env es6 */
/* global ResponsiveImage */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SpinResponsiveImage" }] */


class SpinResponsiveImage extends ResponsiveImage {
    constructor(source, o, col, row) {
        super(source, o);
        this.col = col;
        this.row = row;
    }

    _createImageData(img, callbackData) {
        const data = super._createImageData(img, callbackData);

        data.col = this.col;
        data.row = this.row;

        return data;
    }

    getThumbnail(imageSettings) {
        const data = super.getThumbnail(imageSettings);

        data.col = this.col;
        data.row = this.row;

        return data;
    }
}

/* eslint-env es6 */
/* global helper */
/* eslint operator-assignment: 0 */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "INTRO_QUEUE" }] */


const INTRO_QUEUE = (() => {
    const CUBICBEZIER = $([0.45, 0.19, 0.56, 0.86]);
    const DEFAULTDURATION = 600;

    const isNull = (v) => { return v === null; };

    const getBresenhamsLine = (point1, point2) => {
        const result = { x:[], y: [] };

        const plotLineLow = (x0, y0, x1, y1) => {
            const dx = x1 - x0;
            let dy = y1 - y0;
            let yi = 1;
            let x, y = y0;
            let D;

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

        const plotLineHigh = (x0, y0, x1, y1) => {
            let dx = x1 - x0;
            const dy = y1 - y0;
            let xi = 1;
            let y;
            let x = x0;
            let D;

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

    const getLineSegment = (from, to, forward, length, loop) => {
        const arr = [];
        let start = false;
        let currentIndex = from;

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

    const getQueue = (source, sides) => {
        let side = 'col';

        if (isNull(sides.row)) { side = 'row'; }

        const result = [];

        source.forEach((v) => {
            const s = { col: sides.column, row: sides.row };
            s[side] = v;
            result.push(s);
        });

        return result;
    };

    const getLoopSegment = (startIndex, count, length, loop) => {
        const getEndIndex = (value) => {
            let result;

            if (loop) {
                result = helper.getArrayIndex(value, length);
            } else {
                result = value;
                if (result < 0) { result = 0; }
                if (result > length - 1) { result = length - 1; }
            }

            return result;
        };

        let tmp = [startIndex];
        let endIndex;
        let dir = true;

        [startIndex + count, startIndex - count, startIndex].forEach((value) => {
            endIndex = getEndIndex(value);
            tmp = tmp.concat(getLineSegment(tmp[tmp.length - 1], endIndex, dir, length, loop));
            dir = !dir;
        });

        return tmp;
    };

    const getLine = (from, length, loop) => {
        let result = [];

        if (loop) {
            result = getLineSegment(from, helper.getArrayIndex(from + length, length), true, length, loop);
        } else {
            result = getLoopSegment(from, length, length, false);
        }
        return result;
    };

    const axelerate = (arr) => {
        const max = 6;
        const l = arr.length;
        const getCount = (value) => {
            return Math.round((max - 1) * $J.FX.cubicBezierAtTime(value / l, DEFAULTDURATION, CUBICBEZIER)) + 1;
        };
        const result = [];

        arr.forEach((point, index) => {
            let count = getCount(index);

            while (count > 0) {
                count -= 1;
                result.push(point);
            }
        });

        return result;
    };

    const getOptions = (options) => {
        const opt = helper.deepExtend({
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

        ['row', 'column'].forEach((value) => {
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

    const api = {
        lib: {
            getRightIndex: (index, length, loop) => {
                let result;

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

        twitch: (options) => {
            const opt = getOptions(options);
            const count = { column: 0, row: 0 };
            let tmp;
            let result = [];

            [opt.firstSide, opt.secondSide].forEach((side) => {
                const otherSide = (side === opt.firstSide) ? opt.secondSide : opt.firstSide;

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

        sphere: (options) => {
            const opt = getOptions(options);
            let result = [];

            (opt.justFirstLine ? [opt.firstSide] : [opt.firstSide, opt.secondSide]).forEach((side) => {
                const otherSide = (side === opt.firstSide) ? opt.secondSide : opt.firstSide;
                const tmp = {};

                if (opt[side].length === 1) { return; }

                tmp[side] = null;
                tmp[otherSide] = opt[otherSide].current;

                const arr = getQueue(getLine(opt[side].current, opt[side].length, opt[side].loop), tmp);
                if (opt.isBackward) { arr.reverse(); }
                result = result.concat(arr);
            });

            if (opt.axelerate) {
                result = axelerate(result);
            }

            return result;
        },

        intro: (options) => {
            const opt = getOptions(options);
            const copiedOpt = {
                swapSides: opt.swapSides,
                justFirstLine: true,
                isBackward: opt.isBackward,
                row: helper.deepExtend({}, opt.row),
                column: helper.deepExtend({}, opt.column)
            };
            let result = [];

            result = api.sphere(copiedOpt);
            result = result.concat(api.twitch(copiedOpt));

            return result;
        },

        full: (options) => {
            let arr;
            const opt = getOptions(options);
            const l = opt[opt.secondSide].length;

            if (l > 1) {
                arr = getLine(opt[opt.secondSide].current, l, opt[opt.secondSide].loop);
            } else {
                arr = [opt[opt.secondSide].current];
            }

            const firstSideOpt = helper.deepExtend({}, opt[opt.firstSide]);
            const secondSideOpt = helper.deepExtend({}, opt[opt.secondSide]);
            let result = [];

            arr.forEach((item) => {
                const circleOption = {
                    swapSides: opt.swapSides,
                    justFirstLine: true,
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

        custom: (options) => {
            const opt = getOptions(options);

            const point1 = {
                x: opt.column.current,
                y: opt.row.current
            };

            const point2 = {
                x: opt.column.current + opt.column.jumpCount,
                y: opt.row.current + opt.row.jumpCount
            };

            const convert = (points) => {
                const r = [];

                if (points.x[0] !== point1.x) { points.x.reverse(); }
                if (points.y[0] !== point1.y) { points.y.reverse(); }

                for (let i = 0, l = points.x.length; i < l; i++) {
                    r.push({
                        col: points.x[i],
                        row: points.y[i]
                    });
                }

                return r;
            };
            let result = [];

            result = getBresenhamsLine(point1, point2);
            result = convert(result);
            result = $(result).map((point) => {
                return {
                    col: api.lib.getRightIndex(point.col, opt.column.length, opt.column.loop),
                    row: api.lib.getRightIndex(point.row, opt.row.length, opt.row.loop)
                };
            });

            return result;
        }
    };

    return api;
})();

/* eslint-env es6 */
/* global helper */
/* eslint-disable no-loop-func */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "LOADING_QUEUE" }] */


const LOADING_QUEUE = (() => {
    const _insideLib = {
        getStep: (l) => {
            let result = 1;

            if (l > 24) {
                result = Math.floor(l / 24);
                if (result > 3) {
                    result = 3;
                }
            }

            return result;
        },

        getIndexes: (length) => {
            const result = [];
            const arr = [];
            let flag = true;
            let step = _insideLib.getStep(length);

            do {
                const tmp = [];
                for (let i = 0; i < length; i += step) {
                    if (!arr[i]) {
                        tmp.push(i);
                        arr[i] = 1;
                    }
                }

                if (step === 1) { flag = false; }
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

        getRightIdexes: (arr, startPos, length, callback) => {
            arr.forEach((indexOfLine) => {
                const index = indexOfLine + startPos;
                const rightIndex = helper.getArrayIndex(index, length);

                if (index < length || rightIndex < startPos) {
                    callback(rightIndex);
                }
            });
        },

        getOptions: (options) => {
            // images[row][col]
            /*
                options {
                    images: 36,
                    startRow: 0,
                    startCol: 0
                }
            */

            const opt = helper.deepExtend({}, options);

            opt.schemaOfImages = opt.images.map(line => line.map(v => 0));
            opt.rowLength = opt.images.length;
            opt.colLength = opt.images[opt.startRow].length;

            return opt;
        },

        all: (images, schema, index) => {
            const result = [];

            for (let i = 0, l = images.length; i < l; i++) {
                for (let j = 0, len = images[i].length; j < len; j++) {
                    if (!schema[i][j]) {
                        result.push([i, j]);
                        schema[i][j] = index + 1;
                    }
                }
            }

            return result;
        },

        getSideOpt: (opt) => {
            const result = {
                length: opt.colLength,
                start: opt.startCol,
                otherLength: opt.rowLength,
                otherStart: opt.startRow
            };

            if (opt.swapSides) {
                let tmp = result.length;
                result.length = result.otherLength;
                result.otherLength = tmp;

                tmp = result.start;
                result.start = result.otherStart;
                result.otherStart = tmp;
            }

            return result;
        }
    };

    const api = {
        _: _insideLib,

        all: (options) => {
            const result = [];
            const opt = _insideLib.getOptions(options);
            const indexesOfCols = _insideLib.getIndexes(opt.colLength);
            const tmp = [];
            const index = 1;

            opt.images.forEach((line, i) => {
                const l = line.length;
                _insideLib.getRightIdexes(indexesOfCols[0], opt.startCol, l, (col) => {
                    const row = helper.getArrayIndex(i + opt.startRow, opt.rowLength);

                    tmp.push([row, col]);
                    opt.schemaOfImages[row][col] = 1;
                });
            });

            result.push(tmp);
            result.push([].concat(_insideLib.all(opt.images, opt.schemaOfImages, index)));
            // _insideLib.print(opt.schemaOfImages);

            return result;
        },

        fastLine: (options) => {
            const result = [];
            const opt = _insideLib.getOptions(options);
            const sideOpt = _insideLib.getSideOpt(opt);
            const tmp = [];
            const index = 1;

            for (let i = 0, l = sideOpt.length; i < l; i++) {
                const _i = helper.getArrayIndex(i + sideOpt.start, sideOpt.length);
                if (opt.swapSides) {
                    tmp.push([_i, opt.startCol]);
                    opt.schemaOfImages[_i][opt.startCol] = index;
                } else {
                    tmp.push([opt.startRow, _i]);
                    opt.schemaOfImages[opt.startRow][_i] = index;
                }
            }

            result.push(tmp);
            result.push([].concat(_insideLib.all(opt.images, opt.schemaOfImages, index)));
            // _insideLib.print(opt.schemaOfImages);

            return result;
        },

        line: (options) => {
            const result = [];
            const opt = _insideLib.getOptions(options);
            const sideOpt = _insideLib.getSideOpt(opt);
            const indexes = _insideLib.getIndexes(sideOpt.length);
            let tmp = [];
            let index = 1;

            _insideLib.getRightIdexes(indexes[0], sideOpt.start, sideOpt.length, (i) => {
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
                    _insideLib.getRightIdexes(indexes[index], sideOpt.start, sideOpt.length, (i) => {
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

            result.push(tmp.concat(_insideLib.all(opt.images, opt.schemaOfImages, index)));
            // _insideLib.print(opt.schemaOfImages);

            return result;
        },

        sphere: (options) => {
            const result = [];
            const opt = _insideLib.getOptions(options);
            const sideOpt = _insideLib.getSideOpt(opt);

            const indexes = _insideLib.getIndexes(sideOpt.length);
            const otherIndexes = _insideLib.getIndexes(sideOpt.otherLength);
            const max = Math.max(indexes.length, otherIndexes.length);
            let tmp = [];
            let index = 1;


            _insideLib.getRightIdexes(indexes[0], sideOpt.start, sideOpt.length, (i) => {
                if (opt.swapSides) {
                    tmp.push([i, opt.startCol]);
                    opt.schemaOfImages[i][opt.startCol] = 1;
                } else {
                    tmp.push([opt.startRow, i]);
                    opt.schemaOfImages[opt.startRow][i] = 1;
                }
            });

            _insideLib.getRightIdexes(otherIndexes[0], sideOpt.otherStart, sideOpt.otherLength, (i) => {
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
                    _insideLib.getRightIdexes(indexes[index], sideOpt.start, sideOpt.length, (i) => {
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
                    _insideLib.getRightIdexes(otherIndexes[index], sideOpt.otherStart, sideOpt.otherLength, (i) => {
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

            result.push(tmp.concat(_insideLib.all(opt.images, opt.schemaOfImages, index)));
            // _insideLib.print(opt.schemaOfImages);

            return result;
        }
    };

    return api;
})();

/* eslint-env es6 */
/* global EventEmitter */
/* global helper */
/* global SpinResponsiveImage, INTRO_QUEUE, LOADING_QUEUE */
/* eslint no-multi-assign: 0 */
/* eslint operator-assignment: 0 */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "ImagesMap" }] */
/* eslint class-methods-use-this: "off" */

const ImagesMap = (() => {
    const getPointsString = (row, col) => {
        return row + '.' + col;
    };

    const checkIndex = (index, increment) => {
        return index % increment === 0;
    };

    const getRoot = (url) => {
        let result = [];
        result = $(url.split('//'));

        url = result[1];
        result = result[0];

        url = url.split('/')[0];

        result = [result, url];

        result = result.join('//');

        return result;
    };


    const getImageUrl = (absoluteURL, baseURL, imageUrl) => {
        let result;

        if (/^\//.test(imageUrl)) {
            result = absoluteURL + imageUrl;
        } else {
            result = baseURL + '/' + imageUrl;
        }

        return result;
    };

    class ImagesMap_ extends EventEmitter {
        constructor(o) {
            super();
            this.o = o;

            this._startColumn = 0;
            this._startRow = 0;
            this._currentColumn = 0;
            this._currentRow = 0;
            this.nextColumn = 0;
            this.nextRow = 0;
            this.futureColumn = 0;
            this.futureRow = 0;

            this.imgMap = [];

            this.isAvailableOfLoading = true;

            this.images = [];
            this.isStartedFullInit = false;
            this.imageInfoPromise = null;

            this.loadingMap = {
                queue: []
            };

            this.url = helper.spinLib.getUrl(this.o.url);
            this.absoluteURL = getRoot(this.url);

            this.infoImg = null;
            this.imageInfoId = 'img-' + helper.generateUUID();

            this.addEvents();
        }

        createImageInfo() {
            const getItemFromObject = () => {
                const key1 = Object.keys(this.o.layers)[0];
                const key2 = Object.keys(this.o.layers[key1])[0];

                return this.o.layers[key1][key2];
            };

            if (!this.infoImg) {
                this.infoImg = new SpinResponsiveImage(globalFunctions.normalizeURL(getImageUrl(this.absoluteURL, this.url, getItemFromObject())), {
                    imageSettings: this.o.imageSettings,
                    infoId: this.imageInfoId,
                    round: true,
                    referrerPolicy: this.o.referrerPolicy
                }, null, null);
                this.infoImg.parentClass = this;
            }

            return this.infoImg;
        }

        loadImageInfo() {
            if (!this.imageInfoPromise) {
                this.imageInfoPromise = new Promise((resolve, reject) => {
                    this.createImageInfo(); // this.infoImg

                    this.infoImg.loadInfo()
                        .then((info) => {
                            if (this.isStartedFullInit) {
                                this.createQueue();
                            }
                            resolve({ size: this.infoImg.originSize });
                        })
                        .catch((err) => {
                            reject({ error: err });
                        });
                });
            }

            return this.imageInfoPromise;
        }

        startFullInit(o) {
            if (this.isStartedFullInit) { return; }
            this.isStartedFullInit = true;

            this.o = Object.assign(this.o, o);

            this.o.layers = helper.spinLib.checkLayers(this.o.layers);
            this.o.layers = helper.spinLib.swapLayers(this.o.layers, this.o.swapSides);

            this.imgMap = Object.values(this.o.layers)
                .filter((row, index) => checkIndex(index, this.o.rowIncrement))
                .map(row =>
                    Object.values(row)
                        .filter((frame, index) => checkIndex(index, this.o.columnIncrement))
                        .map(frame => globalFunctions.normalizeURL(getImageUrl(this.absoluteURL, this.url, frame)))
                );

            helper.spinLib.reverse(this.o.reverseColumn, this.o.reverseRow, this.imgMap);

            this.createImages(this.imgMap);
            this.setFirstImage();

            if (this.imageInfoPromise) {
                this.infoImg.loadInfo()
                    .then((info) => {
                        if (!this.loadingMap.queue.length) {
                            this.createQueue();
                        }
                    })
                    .catch((err) => {
                        // empty
                    });
            }
        }

        setImageSettings(options) {
            if (!options) { options = {}; }
            if (!options.imageSettings) { options.imageSettings = {}; }
            if (!options.imageSettings.scale) { options.imageSettings.scale = {}; }
            if (!options.callbackData) { options.callbackData = {}; }

            options.imageSettings.scale.option = 'fill';

            if (!options.srcset) { options.srcset = {}; }

            if (this.o.quality !== null) {
                if (!options.src) { options.src = {}; }
                options.src = this.o.quality;
            }

            if (options.dppx >= 1.5) {
                options.srcset.quality = this.o.hdQuality;
            } else if (this.o.quality !== null) {
                options.srcset.quality = this.o.quality;
            }

            return options;
        }

        getImage(row, col) {
            let val1 = row;
            let val2 = col;

            if (!$J.defined(row)) {
                val1 = this._currentRow;
                val2 = this._currentColumn;
            }

            return this.images[val1][val2];
        }

        getThumbnail(imageOptions) {
            return this.getImage(this._startRow, this._startColumn).getThumbnail(imageOptions);
        }

        get map() {
            return this.imgMap.map(row => row.map(col => false));
        }

        addEvents() {
            let firstIsLoaded = false;
            let partIsLoaded = false;
            let allIsLoaded = false;
            const allCheck = (data) => {
                if (firstIsLoaded && partIsLoaded && allIsLoaded || data.lens) { return; }

                if (!firstIsLoaded && data.col === this._currentColumn && data.row === this._currentRow) {
                    firstIsLoaded = true;
                    this.emit('mapFirstImageLoaded', { data: data });
                }

                if (!partIsLoaded && this.loadingMap.checkOfFirstPartImagesLoading(data.row, data.col)) {
                    partIsLoaded = true;
                    this.emit('mapImagesReady');
                }

                if (!allIsLoaded && this.loadingMap.checkOtherImagesLoading(data.row, data.col)) {
                    allIsLoaded = true;
                }

                if (firstIsLoaded && partIsLoaded && allIsLoaded) {
                    this.emit('mapAllImagesLoaded');
                }
            };

            this.on('imageOnload', (e) => {
                e.stopAll();
                const _data = Object.assign({ isCurrent: this.isCurrent(e.data) }, e.data);

                this.emit('mapImageLoaded', { data: _data });

                allCheck(_data);
            });

            this.on('imageOnerror', (e) => {
                e.stopAll();
                e.data.error = true;
                this.emit('mapImageLoaded', { data: e.data });

                allCheck(e.data);
                console.log('image error');
            });
        }

        getHintType() {
            let result;
            const r = this.countOfRows;
            const c = this.countOfFrames;

            if (r > 1 && c > 1) {
                result = 'multi-row';
            } else if (r > 1) {
                result = 'col';
            } else {
                result = 'row';
            }

            return result;
        }

        isLoaded(imageOptions) {
            const img = this.getImage();

            imageOptions = this.setImageSettings(imageOptions);

            return img.isLoaded(imageOptions);
        }

        isExist(imageOptions) {
            const img = this.getImage();

            imageOptions = this.setImageSettings(imageOptions);

            return img.isExist(imageOptions);
        }

        isCurrent(position) {
            return position.row === this._currentRow && position.col === this._currentColumn;
        }

        get countOfImages() {
            return this.countOfFrames * this.countOfRows;
        }

        get countOfFrames() {
            const result = this.images[0].length || 0;
            return result;
        }

        get countOfRows() {
            const result = this.images.length;
            return result;
        }

        pixelPerFrame(width) {
            let min = width;
            const cols = this.countOfFrames;
            if (cols > 1) {
                if (!this.o.loopColumn) {
                    min = min / 2;
                }
                min = min / cols;
            } else {
                min = min / this.countOfRows;
            }

            // eslint-disable-next-line
            min = min / Math.pow(this.o.columnSpeed / 50, 2);

            return min;
        }

        pixelPerRow(height) {
            let min = height;
            const rows = this.countOfRows;

            if (rows > 1) {
                if (!this.o.loopRow) {
                    min = min / 2;
                }
                min = min / rows;
            } else {
                min = min / this.countOfFrames;
            }

            // eslint-disable-next-line
            min = min / Math.pow(this.o.rowSpeed / 50, 2);

            return min;
        }

        createImages(arr) {
            for (let i = 0, l = arr.length; i < l; i++) {
                const _arr = [];
                for (let j = 0, len = arr[i].length; j < len; j++) {
                    const img = new SpinResponsiveImage(globalFunctions.adjustURL(arr[i][j]), {
                        imageSettings: this.o.imageSettings,
                        infoId: this.imageInfoId,
                        round: true,
                        referrerPolicy: this.o.referrerPolicy
                    }, j, i);
                    img.parentClass = this;

                    _arr.push(img);
                }

                this.images.push(_arr);
            }
        }

        setFirstImage() {
            let sr = this.o.startRow;
            let sc = this.o.startColumn;

            if (this.o.reverseRow) { sr = this.images.length + 1 - sr; }
            if (this.o.reverseColumn) { sc = this.images[0].length + 1 - sc; }

            this._currentRow = sr - 1;
            this._currentColumn = sc - 1;

            if (this._currentRow > this.images.length - 1) {
                this._currentRow = 0;
            }

            if (this._currentColumn > this.images[0].length - 1) {
                this._currentColumn = 0;
            }

            this._startColumn = this.futureColumn = this.nextColumn = this._currentColumn;
            this._startRow = this.futureRow = this.nextRow = this._currentRow;
        }

        loadImage(imageOptions, row, col) {
            const img = this.getImage(row, col);
            imageOptions = this.setImageSettings(imageOptions);
            img.getImage(imageOptions);
        }

        loadFirstImage(imageOptions) {
            if (!this.loadingMap.queue.length) { return; }

            const point = this.loadingMap.queue[0].shift();

            this.loadImage(imageOptions, point[0], point[1]);
        }

        loadFirstPartOfImages(imageOptions) {
            if (!this.loadingMap.queue.length) { return; }

            this.loadingMap.queue[0].forEach((point) => {
                this.loadImage(imageOptions, point[0], point[1]);
            });
        }

        loadOtherImages(imageOptions) {
            if (this.isAvailableOfLoading && this.loadingMap.queue.length) {
                imageOptions = this.setImageSettings(imageOptions);

                this.loadingMap.queue[1].forEach((point) => {
                    this.loadImage(imageOptions, point[0], point[1]);
                });
            }
        }

        loadImages(imageOptions) {
            const cc = this._currentColumn;
            if (this.isAvailableOfLoading) {
                imageOptions = this.setImageSettings(imageOptions);
                if (this.o.swapSides) {
                    this.images.forEach((line) => {
                        const img = line[cc];

                        if (!img.isExist(imageOptions)) {
                            img.getImage(imageOptions);
                        } else {
                            img.sendLoad(imageOptions);
                        }
                    });
                } else {
                    this.images.forEach((line) => {
                        line.forEach((img) => {
                            if (!img.isExist(imageOptions)) {
                                img.getImage(imageOptions);
                            } else {
                                img.sendLoad(imageOptions);
                            }
                        });
                    });
                }
            }
        }

        isImagesExist(imageOptions) {
            imageOptions = this.setImageSettings(imageOptions);
            return !this.images.some(row => row.some(col => !col.isExist(imageOptions)));
        }

        // isImageExist(imageOptions) {
        //     return this.images[this._currentRow][this._currentColumn]
        //         .isExist(imageOptions.width, imageOptions.height, imageOptions.additionalImageSettings ? imageOptions.additionalImageSettings.tile : null);
        // }

        createQueue() {
            let name;

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
                startRow: this._currentRow,
                startCol: this._currentColumn
            });

            this.loadingMap.checkOfFirstPartImagesLoading = (() => {
                let firstPartOfImages = [];

                this.loadingMap.queue[0].forEach((indexes) => {
                    firstPartOfImages.push(getPointsString(indexes[0], indexes[1]));
                });

                firstPartOfImages.shift(); // first image

                let count = firstPartOfImages.length;
                let areLoaded = false;

                if (!count) { areLoaded = true; }

                return (row, col) => {
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
            })();

            this.loadingMap.checkOtherImagesLoading = (() => {
                let otherImages = [];

                this.loadingMap.queue[1].forEach((indexes) => {
                    otherImages.push(getPointsString(indexes[0], indexes[1]));
                });

                let count;
                let areLoaded = false;

                count = otherImages.length;

                if (!count) { areLoaded = true; }

                return (row, col) => {
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
            })();
        }

        prepareFutureImage(direction, count) {
            if (!count) { count = 1; }

            let index;
            let length;
            let loop;

            if (['next', 'prev'].includes(direction)) {
                loop = this.o.loopColumn;
                index = this.futureColumn;
                length = this.countOfFrames;
                if (direction === 'next') {
                    index += count;
                } else {
                    index -= count;
                }

                this.futureColumn = INTRO_QUEUE.lib.getRightIndex(index, length, loop);
            } else {
                loop = this.o.loopRow;
                index = this.futureRow;
                length = this.countOfRows;
                if (direction === 'down') {
                    index += count;
                } else {
                    index -= count;
                }
                // loop = false;
                this.futureRow = INTRO_QUEUE.lib.getRightIndex(index, length, loop);
            }
        }

        setPreparedNextImage() {
            this.futureColumn = this._currentColumn = this.nextColumn;
            this.futureRow = this._currentRow = this.nextRow;

            this.emit('frameChange', { data: {
                column: this._currentColumn,
                row: this._currentRow
            } });
        }

        setPreparedFutureImage() {
            const img = this.getImage(this.futureRow, this.futureColumn);
            if (img && img.ready) {
                this._currentColumn = this.futureColumn;
                this._currentRow = this.futureRow;

                this.emit('frameChange', { data: {
                    column: this._currentColumn,
                    row: this._currentRow
                } });
            }
        }

        resetPreparedImage() {
            this.futureColumn = this.nextColumn = this._currentColumn;
            this.futureRow = this.nextRow = this._currentRow;
        }

        getCurrentImage(imageOptions) {
            imageOptions = this.setImageSettings(imageOptions);

            const c = this._currentColumn;
            const r = this._currentRow;

            let img = this.getImage(r, c);
            img = img.getImage(imageOptions);

            return img;
        }

        get originImageUrl() {
            const c = this._currentColumn;
            const r = this._currentRow;

            let url = this.getImage(r, c);
            url = url.originUrl;

            return url;
        }

        jump(axis, value /* count or index */, direction) {
            let result = false;
            let row;
            let col;
            const checkImg = (r, c) => {
                let res = false;
                if (this.getImage(r, c).ready) {
                    this.nextRow = r;
                    this.nextColumn = col;
                    this.setPreparedNextImage();
                    res = true;
                }
                return res;
            };

            switch (axis) {
                case 'row':
                    row = helper.spinLib.getNextIndex(this._currentRow, value, direction, this.countOfRows, this.o.loopRow);
                    col = this._currentColumn;
                    result = checkImg(row, col);
                    break;
                case 'col':
                    col = helper.spinLib.getNextIndex(this._currentColumn, value, direction, this.countOfFrames, this.o.loopColumn);
                    row = this._currentRow;
                    result = checkImg(row, col);
                    break;

                // no default
            }

            return result;
        }

        setNextAnimationFrame(index) {
            const point = this._imagesBuffer[index];
            const img = this.getImage(point.row, point.col);

            if (img && img.ready) {
                this.nextColumn = point.col;
                this.nextRow = point.row;
            }
        }

        getNextBufferIndex(fromIndex) {
            let count = 0;
            const l = this._imagesBuffer.length;
            const check = (point) => {
                const img = this.getImage(point.row, point.col);
                let result = false;

                if (img && img.ready) {
                    result = true;
                }

                return result;
            };

            let point;
            do {
                count += 1;
                fromIndex += 1;

                if (fromIndex >= l) {
                    count = 0;
                } else {
                    point = this._imagesBuffer[fromIndex];
                }
            } while (count > 0 && (!point || !check(point)));

            return count;
        }

        createAnimation(typeOfBuffer, isBackward) {
            let jfl = false;
            let a = false;
            let cols = 0;
            let rows = 0;

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

            this._imagesBuffer = INTRO_QUEUE[typeOfBuffer]({
                justFirstLine: jfl,
                swapSides: this.o.swapSides,
                axelerate: a,
                isBackward: isBackward,
                count: typeOfBuffer,

                row: {
                    length: this.countOfRows,
                    loop: this.o.loopRow,
                    current: this._currentRow,
                    jumpCount: rows
                },

                column: {
                    length: this.countOfFrames,
                    loop: this.o.loopColumn,
                    current: this._currentColumn,
                    jumpCount: cols
                }
            });

            return this._imagesBuffer.length;
        }

        clearFramesQueue() {
            this._imagesBuffer = [];
        }

        cancelLoadingImage(imageOptions) {
            const img = this.getImage();
            if (img) {
                imageOptions = this.setImageSettings(imageOptions);
                img.cancelLoadingImage(imageOptions);
            }
        }

        get startRow() {
            return this._startRow;
        }

        get startColumn() {
            return this._startColumn;
        }

        get currentRow() {
            return this._currentRow;
        }

        get currentColumn() {
            return this._currentColumn;
        }

        get imagesBuffer() {
            return this._imagesBuffer;
        }

        destroy(last) {
            this.isAvailableOfLoading = false;
            this.resetPreparedImage();
            this.clearFramesQueue();

            this.images.forEach((row) => {
                row.forEach((frame) => {
                    frame.destroy();
                });
            });

            this.off('imageOnload');
            this.off('imageOnerror');

            this.loadingMap = { queue: [] };
            this.imgMap = [];
            this.images = $([]);
            this._currentColumn = 0;
            this._currentRow = 0;
            super.destroy();
        }
    }

    return ImagesMap_;
})();

/* eslint-env es6 */
/* global defaultOptions, ImagesMap, SpinHotspots, Animation, Zoominstance, helper, ResponsiveImage, ProgressLoader, Hint, $J, globalFunctions, globalVariables */
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint-disable class-methods-use-this */
/* eslint operator-assignment: 0 */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Spin" }] */


const SPIN_CONF_VER = 1;
const P = 'smv';
const CSS_CLASS_NAME = P + '-spin';
const BRAND_LANDING = 'https://sirv.com/about-spin/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(spin)&utm_campaign=branding';

// const calcScalePosition = (scale, size) => {
//     return (size - size * scale) / 2;
// };

class ActivatedCurtain {
    constructor(parentNode, activeNode) {
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

    show() {
        if (this.state) {
            this.activatedCurtain.setCssProp('display', 'block');
            this.activeNode.addClass(P + '-activated');
        }
    }

    hide() {
        if (this.state) {
            this.activatedCurtain.setCssProp('display', 'none');
            this.activeNode.removeClass(P + '-activated');
        }
    }

    activateCurtain() {
        if (!this.state) {
            this.state = 1;
            this.activeNode.addClass(P + '-sleeping');
            this.parentNode.append(this.activatedCurtain);
        }
    }

    deactivateCurtain() {
        if (this.state) {
            this.state = 0;
            this.activeNode.removeClass(P + '-sleeping');
            this.activatedCurtain.remove();
        }
    }

    addTapEvents(callback) {
        this.activatedCurtain.addEvent('tap', (e) => {
            if (this.state) {
                e.action = 'activate';
                callback(e);
            }
        });

        this.activeNode.addEvent('tap', (e) => {
            if (this.state) {
                e.action = 'deactivate';
                callback(e);
            }
        });
    }

    addPinchEvent(handler) {
        this.activeNode.addEvent('pinch', handler);
    }

    removePinchEvent(handler) {
        this.activeNode.removeEvent('pinch', handler);
    }

    destroy() {
        this.state = 1;
        this.hide();
        this.deactivateCurtain();

        this.removePinchEvent();

        this.activeNode.removeEvent('tap');
        this.activatedCurtain.remove();
        this.activatedCurtain.removeEvent('tap');
        this.activatedCurtain = null;
    }
}

const checkProps = (obj) => {
    if (!obj.common) { obj.common = {}; }
    if (!obj.common.common) { obj.common.common = {}; }
    if (!obj.common.mobile) { obj.common.mobile = {}; }
    if (!obj.local) { obj.local = {}; }
    if (!obj.local.common) { obj.local.common = ''; }
    if (!obj.local.mobile) { obj.local.mobile = ''; }

    return obj;
};

const fnStopTouchMove = (e) => { e.stopDefaults(); };

class Spin extends Zoominstance {
    constructor(node, options) {
        super(node, options, defaultOptions);

        this.type = globalVariables.SLIDE.TYPES.SPIN;
        // this.instanceOptions = this.makeOptions();
        this.canvas = null;

        this.canvasContainer = $J.$new('div').addClass('spin-canvas-container');
        this.coreNode = $J.$new('div').addClass('sirv-spin');
        this.instanceNode.append(this.coreNode);

        // this.additionalCanvases = [];
        this.ctx = null;

        this.isSmoothing = false;
        this.smooseTimeout = null;
        this.minSizeOfFrame = 0;
        this.minSizeOfRow = 0;

        this.size = { width: 0, height: 0 };
        this.isDragMove = false;
        this.longTapTimer = false;

        this.imagesMap = null;

        this.isInited = false;

        this.loader = null;

        this.hint = null;
        this.openedImg = null;

        this.scale = 1;
        this.cssId = -1;

        this.boxBoundaries = null;

        this.hotspots = null;

        this.animationFX = null;

        this.loadedImages = [];

        this.currentSize = { width: 0, height: 0 };
        this.currentImageSize = { width: 0, height: 0 };
        this.standardSize = { width: 0, height: 0 };
        this.lastImg = null;

        this.startLoadingTime = null;

        this.isOver = false;
        this.isSpinActivated = !$J.browser.mobile;

        this.canvasPromise = null;

        this.firstImageLoaded = false;
        this.firstPartOfImagesLoaded = false;
        this.isInfoLoaded = false;

        this.customActionWas = false;
        this.isAutoplayPaused = false;

        // the variable is inside option which is hidden
        this.reflectDirection = false;

        this.configURL = this.instanceNode.attr('data-src') || this.instanceNode.attr('data-config') || '';
        this.imageBaseURL = globalFunctions.normalizeURL(this.configURL.replace(/([^#?]+)\/.*$/, '$1/'));
        this.absoluteURL = this.imageBaseURL.replace(/(^https?:\/\/[^/]*).*/, '$1/');
        this.configHash = $J.getHashCode(this.configURL.replace(/^http(s)?:\/\//, ''));
        this.configPath = '/' + this.configURL.replace(this.absoluteURL, '');
        this.imageInfoCallbackName = 'sirv_spin_image_info_';

        this.sessionId = $J.getHashCode(this.configURL.replace(/^http(s)?:\/\//, '')
                + $J.D.node.location.href.replace(/^http(s)?:\/\//, '') + (+new Date())
        );

        this.layers = {};
        this.imageSettings = {};
        this.hotspotsData = [];
        this.fullscreenStartTime = 0;
        this.meta = {};
        this.isFullscreen = options.isFullscreen;
        this.nativeFullscreen = options.nativeFullscreen;
        this.infoSettings = {};
        this.autospinResumeTimer = null;

        this.isHidden = false;
        this.sessionStartTime = 0;

        this.animationCloud = null;
        this.touchDragCloud = null;
        this.slideDragEventStart = false;

        this.dppx = null;
        this.startTimeForZommEvent = null;

        this.resizeAnimationTimer = helper.debounce(() => { this.animate('inactive'); }, 1000);
        this.keyPressHandlerForShiftButton = null;

        this.firstUserInteraction = false;

        this.userColumn = 0;
        this.userRow = 0;
        this.placeholder = this.instanceNode.node.querySelector('img');
        if (this.placeholder) {
            this.placeholder = $(this.placeholder);
        }

        this.replaceTextParamURLFromMetadata();

        this.trackUnload = () => {
            this.sendStats('Page Unload', (+new Date()) - this.sessionStartTime, { message: 'Stopped' }, true);
        };

        // Handle window resize to prevent page dragging on mobile devices when spin fills the entire page.
        this.disableScrollOnMobile = () => {
            const docFullSize = $J.D.fullSize;
            const placeholderSize = this.instanceNode.size;

            if (Math.abs(placeholderSize.height - docFullSize.height) <= 50) {
                this.instanceNode.addEvent('touchmove', fnStopTouchMove);
            } else {
                this.instanceNode.removeEvent('touchmove', fnStopTouchMove);
            }
        };

        this.resizeWindowTimer = null;
        this.windowResizeCallback = () => {
            clearTimeout(this.resizeWindowTimer);
            this.resizeWindowTimer = setTimeout(() => {
                this.disableScrollOnMobile();
            }, 10);
        };

        this.api = Object.assign(this.api, {
            isInitialized: this.isInitialized.bind(this), // new
            play: this.play.bind(this),
            pause: this.pause.bind(this),
            rotate: this.rotateXY.bind(this),
            rotateX: this.rotateX.bind(this),
            rotateY: this.rotateY.bind(this),
            jump: this.jump.bind(this),
            jumpRows: this.jumpRows.bind(this), // new
            jumpCols: this.jumpCols.bind(this), // new
            // resize: this.resize.bind(this), // parent class
            // zoomIn: this.zoomIn.bind(this), // parent class
            // zoomOut: this.zoomOut.bind(this), // parent class
            // isZoomed: this.isZoomed.bind(this), // new, parent class
            // isReady: this.isReady.bind(this), // parent class
            // getOptions: this.getOptions.bind(this), // parent class
            // hotspots: {}, // parent class, hotspots api
            currentFrame: this.currentFrame.bind(this)
        });

        this.createHotspotsClass(SpinHotspots);
        this.getInfo().then(() => {
            if ($J.browser.mobile && this.option('tappingFirst')) {
                this.activatedCurtain = new ActivatedCurtain(this.instanceNode, this.coreNode);
            } else {
                this.isSpinActivated = true;
            }

            this.createMap(this.quality, this.hdQuality, this.isHDQualitySet);
        }).catch((e) => {});
    }

    // API
    isInitialized() {
        return this.isInited;
    }

    // API
    rotateXY(x, y) {
        if (this.ready && !this.isZoomed()) {
            return this.rotate(x, y);
        }

        return false;
    }

    // API
    rotateX(frames) {
        if (this.ready && !this.isZoomed()) {
            return this.rotate(frames, null);
        }

        return false;
    }

    // API
    rotateY(frames) {
        if (this.ready && !this.isZoomed()) {
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
    jump(rows) {
        return this.jumpRows(rows);
    }

    // API
    jumpRows(frame) {
        if (this.ready && !this.isZoomed()) {
            return this.jumpTo(frame, 'row');
        }

        return false;
    }

    // API
    jumpCols(frame) {
        if (this.ready && !this.isZoomed()) {
            return this.jumpTo(frame, 'col');
        }

        return false;
    }

    /**
     * Retrieve current visible frame
     * @return
     */
    // API
    currentFrame() {
        if (this.ready) {
            return this.getCurrentFrame();
        }

        return null;
    }

    // API
    isActive() {
        return this.isSpinActivated;
    }

    makeGlobalOptions(optionsInstance) {
        const o = this._options.options;
        optionsInstance.fromJSON(o.common.common);
        if (this.infoSettings) {
            Object.entries(this.infoSettings).forEach((infoSetting) => {
                if (!['images', 'hotspots'].includes(infoSetting[0])) {
                    optionsInstance.set(...infoSetting);
                }
            });
        }

        optionsInstance.fromString(o.local.common);
        optionsInstance.fromString(this.instanceNode.attr('data-options') || '');

        return optionsInstance;
    }

    makeOptions() {
        this._options.options = checkProps(this._options.options);
        return super.makeOptions();
    }

    sendStats(name, time, additionalData, useBeacon) {
        const data = {
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

        this.emit('stats', { data: data });
    }

    getInfo() {
        if (!this.gettingInfoPromise) {
            this.gettingInfoPromise = new Promise((resolve, reject) => {
                this.waitGettingInfo.wait(() => {
                    const cfCallbackName = 'sirv_spin_info_v' + SPIN_CONF_VER + '_' + this.configHash;
                    const url = this.configURL + ($J.stringHas(this.configURL, '?') ? '&' : '?') + 'info=' + cfCallbackName;

                    helper.getRemoteData(url, cfCallbackName, this.referrerPolicy)
                        .then((config) => {
                            if (!this.destroyed) {
                                if (config.layers) {
                                    this.config = config;
                                    this.layers = this.config.layers;
                                    this.meta = this.config._file.meta || null;
                                    this.infoSettings = this.config.settings;
                                    this.hotspotsData = this.config.settings.hotspots || [];
                                    this.imageSettings = this.config.settings.images.main;
                                    this.accountInfo = {
                                        account: this.config.account,
                                        branded: this.config.branded
                                    };

                                    this.sessionStartTime = +new Date();
                                    this.sendStats('sessionStart', this.sessionStartTime);

                                    $J.W.addEvent('beforeunload', this.trackUnload);

                                    resolve();
                                } else if (config.contentType && /image/.test(config.contentType) || config._isplaceholder) {
                                    reject({
                                        error: 'changeSpinToImage',
                                        isPlaceholder: config._isplaceholder,
                                        account: config.account
                                    });
                                } else {
                                    reject({ error: { status: 404 } });
                                }
                            }
                        })
                        .catch((err) => {
                            if (!this.destroyed) {
                                reject({ error: err });
                            }
                        });
                });
            });
        }

        return this.gettingInfoPromise;
    }

    replaceTextParamURLFromMetadata() {
        if (this.imageSettings.text && this.imageSettings.text.text) {
            this.imageSettings.text.text = this.imageSettings.text.text.replace(/\$\{spin\.(title|description)\}/g, (m, p1) => {
                const t = this.meta[p1] || '';
                if (typeof t === 'string') {
                    return t;
                }
                return p1;
            });

            if (this.imageSettings.text.text === '') {
                delete this.imageSettings.text;
            }
        }
    }

    getDPPX(size) {
        const side = size.height > size.width ? 'height' : 'width';
        const tmp = {};

        tmp[side] = size[side];

        this.dppx = helper.getDPPX(ResponsiveImage.roundImageSize(tmp)[side], this.infoSize[side], this.upscale);
    }

    showHint() {
        let result = false;

        if (this.hint) {
            if (
                    (!this.always || [globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED].includes(this.fullscreenState)) &&
                    (!this.option('autospin.enable') || !this.firstUserInteraction) // do not show hint again after first user interaction if the autospin.enable is true
                ) {
                result = true;
                this.hint.show();
            }
        }

        return result;
    }

    onStartActions() {
        if (this.ready) {
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
    }

    onStopActions() {
        this.zoomOut();
        this.stopSmoothing();
        this.stopAnimation();
        this.deactivateSpin();
        this.setUserFrame();

        this.customActionWas = false;

        if (this.hint) {
            this.hint.hide();
        }

        super.onStopActions();
    }

    onInView(value) {
        if (value) {
            if (!this.isInView) {
                if (this.ready) {
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
            if (this.isInView && this.ready) {
                if (this.option('autospin.enable')) {
                    this.animationCloud.pause();
                } else {
                    this.stopAnimation();
                    this.setUserFrame();
                }
                this.deactivateSpin();
            }
        }
    }

    startFullInit(options) {
        if (this.isStartedFullInit) { return; }

        // if (options) {
        //     this.instanceOptions = options.options;
        //     options.options = this.makeOptions();
        // }

        super.startFullInit(options);

        this.getInfo().then(() => {
            this.normalizeOptions();
            this.getId('spin-');

            const option = this.option;

            this.imagesMap.startFullInit({
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

            this.loadedImages = this.imagesMap.map;

            this.loader = new ProgressLoader(this.coreNode, { max: this.imagesMap.countOfImages, 'class': 'spin-loader' });
            this.loader.parentClass = this;

            this.coreNode.addEvent(['btnclick', 'tap'], (e) => { e.stop(); });

            this.on('isSingleSlide', (e) => {
                e.stop();

                if (this.activatedCurtain) {
                    if (e.data.isSingle) {
                        this.activatedCurtain.deactivateCurtain();
                    } else {
                        this.activatedCurtain.activateCurtain();
                    }
                }
            });

            if (this.hotspots) {
                this.hotspots.Options = {
                    columnsRevers: this.option('column.reverse'),
                    rowsRevers: this.option('row.reverse'),
                    rows: this.imagesMap.countOfRows,
                    columns: this.imagesMap.countOfFrames,
                };
            }

            this.initAnimation();
        }).catch(() => {});

        if ($J.browser.touchScreen) {
            this.on('dragEvent', (e) => {
                if (e.data.type === 'dragstart') {
                    this.slideDragEventStart = true;
                    if (this.touchDragCloud) {
                        this.touchDragCloud.removeEvent();
                    }
                } else if (e.data.type === 'dragend') {
                    this.slideDragEventStart = false;
                    if (this.touchDragCloud) {
                        this.touchDragCloud.addEvent();
                    }
                }
            });
        }
    }

    getThumbnailData(opt) {
        return this.imagesMap.getThumbnail(opt);
    }

    setUserFrame() {
        this.jumpTo(this.userRow, 'row');
        this.jumpTo(this.userColumn, 'col');
    }

    getSocialButtonData(data, isSpin) {
        let url = null;

        if (isSpin) {
            url = this.instanceNode.attr('data-src');
        } else {
            url = super.getSocialButtonData(data);
        }

        return url;
    }

    turnOnOff() {
        if (!$J.browser.mobile || !this.activatedCurtain) { return; }

        this.activatedCurtain.addTapEvents((e) => {
            if (e.action === 'activate') {
                if (!this.isSpinActivated) {
                    e.stop();
                    this.activateSpin();
                }

                if (this.hotspots) { this.hotspots.hideActiveHotspotBox(true); }
            } else {
                if (this.isSpinActivated) {
                    e.stop();
                    this.stopSmoothing();
                    this.stopAnimation();

                    if (this.hotspots && this.hotspots.isHotspotActivated()) {
                        this.hotspots.hideActiveHotspotBox(true);
                    } else {
                        this.deactivateSpin();
                    }
                }
            }
        });
    }

    activateSpin() {
        if (!this.isSpinActivated) {
            this.isSpinActivated = true;
            if ($J.browser.mobile) {
                this.stopAnimation();
                this.customActionWas = true;
                if (this.hint) { this.hint.hide(); }
                if (this.activatedCurtain) {
                    this.activatedCurtain.hide();
                }
            }
        }
    }

    deactivateSpin() {
        if (this.isSpinActivated) {
            this.isSpinActivated = false;
            if ($J.browser.mobile) {
                if (!this.customActionWas) { this.showHint(); }
                if (this.activatedCurtain) {
                    this.activatedCurtain.show();
                }

                // this.customActionWas = false;
                // this.animate('inactive');
            }
        }
    }

    // setActiveAction() {
    //     if ($J.browser.mobile) { return; }

    //     this.canvasContainer.addEvent('mouseover', e => {
    //         if (this.isSlideShown) {
    //             this.isOver = true;
    //             if (this.ready) {
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

    createPinchEvent() {
        // difference between scale
        const OPEN_ZOOM = 1.1;
        const FS_OUT = 0.2;
        const FS_IN = 2;
        let saveValue;
        let scale;
        let baseMin;
        let compensation;
        let maxCompensation;
        let minCompensation;
        let max;
        let min;
        let basePercent;

        const setDefaultsValues = () => {
            maxCompensation = 1;
            minCompensation = 1;
            baseMin = this.zoom.baseScale.x;
            max = 1;
            min = baseMin;
            saveValue = 1 - baseMin;
        };

        super.createPinchEvent(this.coreNode);

        this.pinchCloud.onPinchStart = (e) => {
            if ([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING].includes(this.fullscreenState)) { return; }
            this.pinchCloud.pinch = true;
            clearTimeout(this.longTapTimer);
            this.stopSmoothing();
            this.stopAnimation();
            if (this.touchDragCloud) {
                this.touchDragCloud.removeEvent();
            }
            if (this.hotspots) { this.hotspots.hideActiveHotspotBox(true); }

            this.customActionWas = true;
            basePercent = false;
            this.pinchCloud.scale = e.scale;
            compensation = 1;

            if (this.openedImg) {
                compensation = this.zoom.scale.x;
                if (baseMin === $J.U) {
                    setDefaultsValues();
                }

                compensation /= baseMin;
            }
            this.sendEvent('pinchStart');
        };

        this.pinchCloud.onPinchResize = (e) => {
            if (this.pinchCloud.pinch && !this.pinchCloud.block) {
                if (this.zoom && this.fullscreenState === globalVariables.FULLSCREEN.OPENED && this.openedImg) {
                    this.pinchCloud.scale = e.scale;
                    this.zoom.basePercent = e.centerPoint;
                }
            }
        };

        this.pinchCloud.onPinchMove = (e) => {
            if (this.pinchCloud.pinch && !this.pinchCloud.block) {
                if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || !this.isFullscreenEnabled) {
                    if (!this.openedImg) {
                        if (e.scale > OPEN_ZOOM) {
                            this.firstUserInteraction = true;
                            this.openLens(e.centerPoint.x, e.centerPoint.y, false, 'zero');

                            setDefaultsValues();
                            compensation = 1;
                        } else if (e.scale < FS_OUT) {
                            this.pinchCloud.block = true;
                            this.sendEvent('fullscreenOut');
                        }
                    } else if (this.zoom) {
                        if (!basePercent) {
                            basePercent = true;
                            this.zoom.basePercent = e.centerPoint;
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

                            this.zoom.setScale(scale, e.centerPoint.x, e.centerPoint.y);
                        }
                        this.pinchCloud.scale = e.scale;
                    }
                } else if (e.scale >= FS_IN) {
                    this.pinchCloud.block = true;
                    this.sendEvent('fullscreenIn');
                }
            }
        };

        this.pinchCloud.onPinchEnd = (e) => {
            if (this.pinchCloud.pinch) {
                this.pinchCloud.pinch = false;
                if (this.openedImg) {
                    this.activateSpin();
                }

                setTimeout(() => {
                    if (this.touchDragCloud) {
                        this.touchDragCloud.addEvent();
                    }
                }, 16);

                this.sendEvent('pinchEnd');
            }

            if (this.openedImg) {
                this.pinchCloud.removeEvent();
            }

            this.pinchCloud.block = false;
            this.pinchCloud.scale = 0;
        };
    }

    onStopContext() {
        this.stopSmoothing();
        this.stopAnimation();
        if (this.hint) { this.hint.hide(); }
    }

    onSecondSelectorClick() {
        this.zoomOut();
    }

    setGlobalEvents() {
        this.on('zoomUp', (e) => {
            const pos = e.data;
            e.stop();

            if (this.ready && this.zoom) {
                if (!this.isDragMove && this.isFullscreenActionEnded()) {
                    this.firstUserInteraction = true;
                    this.openLens(pos.x, pos.y);
                }
            }
        });

        this.on('zoomDown', (e) => {
            e.stop();

            if (this.ready && this.zoom && this.isZoomed()) {
                this.zoom.hide();
            }
        });
    }

    normalizeOptions() {
        if (!this.option('autospin.enable')) {
            this.option('autospin.duration', 0);
        }

        if (this.option('swapSides')) {
            ['start', 'loop', 'increment', 'reverse', 'sensitivity'].forEach((param) => {
                const tmp = this.option('row.' + param);
                this.option('row.' + param, this.option('column.' + param));
                this.option('column.' + param, tmp);
            });
        }

        ['onStart', 'onVisible', 'onInactive'].forEach((v) => {
            const o = 'hint.' + v + '.effect';
            if (this.option(o) === 'none') {
                this.option(o, false);
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
    }

    setDefaultZoomOptions() {
        super.setDefaultZoomOptions();

        this.defaultZoomOptions = Object.assign(this.defaultZoomOptions, {
            tiles: this.option('zoom.tiles'),
            pan: this.option('zoom.pan'),
            trigger: $J.browser.mobile ? 'dblclick' : 'click',
            type: 'inner',
            height: 'auto',
        });
    }

    loadFirstPartOfImages() {
        if (!this.firstPartOfImagesLoaded) {
            this.firstPartOfImagesLoaded = true;
            this.startLoadingTime = +new Date();

            this.imagesMap.loadFirstPartOfImages({
                width: this.currentImageSize.width,
                height: this.currentImageSize.height,
                dppx: this.dppx
            });

            if (this.loader) {
                this.loader.show();
            }
        }
    }

    isThumbnailGif() {
        return this.option('thumbnail.type') === 'gif';
    }

    init() {
        if (!this.infoSize || this.isInited) { return; }

        this.isInited = true;

        // this.setActiveAction();

        this.initNameEvent = null;
        this.initFnEvent = (e) => {
            e.stop();
            this.coreNode.removeEvent(e.type, this.initFnEvent);
            if (this.activatedCurtain) {
                this.activatedCurtain.activatedCurtain.removeEvent(this.initNameEvent, this.initFnEvent);
            }
            this.loadFirstPartOfImages();
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
    }

    run(isShown, preload, firstSlideAhead) {
        const result = super.run(isShown, preload, firstSlideAhead);

        if (result) {
            $J.W.addEvent('resize', this.windowResizeCallback);
            this.initCanvas();
            this.startGettingInfo();
        }

        return result;
    }

    initCanvas() {
        this.canvas = $J.$new('canvas');

        if (this.canvas.node.getContext) {
            this.ctx = this.canvas.node.getContext('2d');

            // for (let i = 0; i < 2; i++) {
            //     const canvas = $J.$new('canvas');
            //     this.additionalCanvases.push({
            //         node: canvas,
            //         ctx: canvas.node.getContext('2d')
            //     });
            // }
        }

        const alt = this.rightAlt;
        if (alt) {
            this.canvas.attr('role', 'img');
            this.canvas.attr('aria-label', alt);
            this.canvas.attr('alt', alt);
        }

        let w = this.infoSize.width;
        let h = this.infoSize.height;
        const size = this.coreNode.size;

        if (w < size.width) { w = size.width; }
        if (h < size.height) { h = size.height; }

        // broke html if image less then viewer
        // I do not know why I added it
        // this.coreNode.setCss({
        //     'max-width': w + 'px',
        //     'max-height': h + 'px'
        // });

        if (size.height === 0) {
            this.cssId = $J.addCSS('#' + this.id + ' .' + CSS_CLASS_NAME + ':before', { 'padding-top': ((this.infoSize.height / this.infoSize.width) * 100) + '%' }, this.id + '-css');
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
    }

    loadContent() { this.loadFirstImage(); }

    loadFirstImage() {
        if (!this.firstImageLoaded && this.isInfoLoaded) {
            // fix for if the viewer was with display none
            if (!this.currentImageSize.width || !this.currentImageSize.height) {
                this.currentSize = helper.spinLib.calcProportionSize(this.coreNode.size, this.infoSize);
                this.getDPPX(this.currentSize);

                if (this.currentSize.width && this.currentSize.height) {
                    this.setImageSize();
                    if (this.isStarted && this.currentImageSize.width && this.currentImageSize.height) {
                        this.setCanvasSize();
                        this.draw();
                    }
                }
            }

            if (!this.currentImageSize.width || !this.currentImageSize.height) { return; }

            this.waitToStart.start();
            this.firstImageLoaded = true;
            this.imagesMap.loadFirstImage({
                width: this.currentImageSize.width,
                height: this.currentImageSize.height,
                dppx: this.dppx
            });
        }
    }

    get rightAlt() {
        let description = null;
        if (!this.dataAlt && this.meta && this.meta.description) {
            description = this.meta.description;
        } else {
            description = this.dataAlt;
        }

        return description;
    }

    createMap(quality, hdQuality, isHDQualitySet) {
        const option = this.option;
        let loadingSchema = null;

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
        this.imagesMap.parentClass = this;

        this.userColumn = this.imagesMap.startColumn;
        this.userRow = this.imagesMap.startRow;

        this.on('mapFirstImageLoaded', (e) => {
            e.stopAll();

            if (this.placeholder) {
                this.placeholder.setCssProp('display', 'none');
            }

            if (!this.isInited) {
                if (this.firstImageLoaded) {
                    this.draw();
                    this.canvas.setCssProp('transition', 'none');
                    this.canvas.render();
                    this.canvas.setCssProp('transition', '');
                }

                if (this.loader) { this.loader.progress(); }

                this.setCanvas().finally(() => { this.init(); });
            }

            if (this.hotspots) {
                const img = this.imagesMap.getCurrentImage({ width: this.currentSize.width, height: this.currentSize.height });
                this.hotspots.setFramePosition(img.row, img.col);
                this.hotspots.updateAndShow();

                if (this.isInView && this.isSlideShown) {
                    this.hotspots.showNeededElements();
                }
            }
        });

        this.on('mapImagesReady', (e) => {
            e.stopAll();
            this.imagesMap.loadOtherImages({
                width: this.currentImageSize.width,
                height: this.currentImageSize.height,
                dppx: this.dppx
            });
            this.calcMinSizeForDrag();
            const now = +new Date();
            this.sendStats('framesPreloaded', now - this.sessionStartTime, { duration: now - this.startLoadingTime });

            this.done();
            this.sendContentLoadedEvent();
        });

        this.on('mapImageLoaded', (e) => {
            e.stopAll();

            if (this.loader) {
                if (!this.loadedImages[e.data.row][e.data.col]) {
                    this.loadedImages[e.data.row][e.data.col] = true;
                    this.loader.progress();
                }
            }

            if (!e.data.error) {
                if (e.data.isCurrent) {
                    if (e.data.callbackData.lens) {
                        // if (this.option('zoom.magnify.enable') && this.zoom) { // the option was removed
                        if (this.zoom) {
                            if ((this.zoom.shown || this.zoom.showing) && this.openedImg) {
                                if (this.openedImg.col === e.data.col && this.openedImg.row === e.data.row) {
                                    this.zoom.addLoadedImage(e.data);
                                }
                            }
                        }
                    } else {
                        if (this.lastImg && (this.lastImg.width !== e.data.width || this.lastImg.height !== e.data.height) && this.firstImageLoaded) {
                            this.draw();
                        }
                    }
                }
            }
        });

        this.on('mapAllImagesLoaded', (e) => {
            e.stopAll();

            const now = +new Date();
            this.sendStats('framesLoaded', now - this.sessionStartTime, {
                duration: now - this.startLoadingTime
            });

            if (this.loader && this.loader.getProgressState() !== 2) {
                this.loader.hide();
            }
        });

        this.on('frameChange', (e) => {
            e.stop();

            if (this.ready) {
                this.sendEvent('frameChange', {
                    row: e.data.row,
                    column: e.data.column
                });
            }
        });

        this.imagesMap.loadImageInfo()
            .then((originSize) => {
                this.isInfoLoaded = true;
                const size = Object.assign({}, originSize.size);
                this.infoSize = size;

                if (this.hotspots) {
                    this.hotspots.originImageSize = this.infoSize;
                }
            })
            .catch((err) => {
                this.isInfoLoaded = true;
            });
    }

    getSelectorImgUrl(data) {
        return new Promise((resolve, reject) => {
            this.getInfo()
                .then(() => {
                    this.imagesMap.loadImageInfo()
                        .then((originSize) => {
                            this.waitToStart.wait(() => {
                                const defOpt = this.imagesMap.setImageSettings({ dppx: this.dppx });
                                if (defOpt.src) { data.src = defOpt.src; }
                                data.srcset = defOpt.srcset;

                                if (this.option('thumbnail.type') === 'gif') {
                                    data.originUrl = this.configURL.split('?')[0];
                                    data.imageSettings = { image: 24 };
                                    if (this.option('thumbnail.gifParams')) {
                                        data.imageSettings = helper.paramsFromQueryString(this.option('thumbnail.gifParams'));
                                    }
                                }

                                resolve(Object.assign(this.imagesMap.getThumbnail(data), {
                                    alt: this.rightAlt
                                }));
                            });
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    getInfoSize() {
        return new Promise((resolve, reject) => {
            this.getInfo()
                .then(() => {
                    this.imagesMap.loadImageInfo()
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    onHotspotActivate(data) {
        this.customActionWas = true;
        this.stopAnimation();
        super.onHotspotActivate(data);
    }

    onHotspotDeactivate(data) {
        super.onHotspotDeactivate(data);
        this.animateWithDelay();
    }

    createHint() {
        if (!this.option('hint.message.enable')) { return; }

        let hintMessage = '<div class="spin-hint-animation"></div>';
        const horizontal = ['spin-hint-horizontal-animation'];
        const vertical = ['spin-hint-vertical-animation'];
        let hintClass = [];

        hintMessage += '<span>';
        hintMessage += this.option('hint.message.text');
        hintMessage += '</span>';

        switch (this.imagesMap.getHintType()) {
            case 'multi-row':
                hintClass = horizontal.concat(vertical);
                break;
            case 'row':
                hintClass = horizontal;
                break;
            case 'col':
                hintClass = vertical;
                break;
            // no default
        }

        const hintOptions = {
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
    }

    get imageClassContainer() {
        return this.imagesMap;
    }

    createZoom() {
        let result = null;
        if (!this.destroyed && this.option('zoom.enable')) {
            result = super.createZoom(this.coreNode, {});

            if (this.zoomContainer) {
                this.zoom.lensContainer = this.zoomContainer;
            }

            this.coreNode.addEvent(['btnclick', 'dbltap'], (e) => {
                if (this.isFullscreenActionEnded()) {
                    this.firstUserInteraction = true;
                    this.openLens(e.x, e.y);
                }
            });

            if ($J.browser.mobile) {
                // this.setLongTapEvents();
            }
        }

        return result;
    }

    onZoomGetImage(e) {
        super.onZoomGetImage(e);

        if (this.checkImage(e.data, e.data.dontLoad)) {
            this.zoom.addLoadedImage(this.imagesMap.getCurrentImage(e.data));
        } else {
            this.imagesMap.loadImage(e.data);
        }
    }

    onZoomCancelLoadingOfTiles(e) {
        super.onZoomGetImage(e);
        e.data.round = false;
        this.imagesMap.cancelLoadingImage(e.data);
    }

    onZoomBeforeShow(e) {
        this.canvas.addClass(this.zoomClassName);
        if (this.hotspots) {
            this.hotspots.hideAll();
        }
    }

    onZoomShown(e) {
        if (this.isSlideShown) {
            this.startTimeForZommEvent = +new Date();

            if (this.openedImg) {
                this.sendStats('zoomIn', (+new Date()) - this.sessionStartTime, {
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
    }

    onZoomHidden(e) {
        if (this.openedImg) {
            this.canvas.removeClass(this.zoomClassName);

            const now = +new Date();
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
    }

    setLongTapEvents() {
        const pe = $J.W.node.navigator.pointerEnabled;
        let move = false;
        let touchDown = false;

        let events = ['touchstart'];
        if (pe) {
            events.push('pointerdown');
        } else {
            events.push('MSPointerDown');
        }

        this.coreNode.addEvent(events, (e) => {
            if (!this.isDragMove && !this.pinchCloud.pinch && this.isFullscreenActionEnded()) {
                clearTimeout(this.longTapTimer);
                this.longTapTimer = setTimeout(() => {
                    e.stop();
                    move = true;
                    this.customActionWas = true;
                    const p = e.pageXY;
                    if (this.touchDragCloud) {
                        this.touchDragCloud.removeEvent();
                    }
                    this.firstUserInteraction = true;
                    this.openLens(p.x, p.y, true);
                }, 500);
                touchDown = true;
            }
        });

        events = ['touchmove'];
        if (pe) {
            events.push('pointermove');
        } else {
            events.push('MSPointerMove');
        }

        this.coreNode.addEvent(events, (e) => {
            if (move && this.isFullscreenActionEnded()) {
                e.stop();
                const p = e.pageXY;
                this.zoom.customMove(p.x, p.y);
            }
        }, 1);

        events = ['touchend'];
        if (pe) {
            events.push('pointerup');
        } else {
            events.push('MSPointerUp');
        }

        this.coreNode.addEvent(events, (e) => {
            if (touchDown) {
                e.stop();
                touchDown = false;
                clearTimeout(this.longTapTimer);
            }
            if (move && this.isFullscreenActionEnded()) {
                e.stop();
                move = false;
                // clearTimeout(this.longTapTimer);
                this.zoom.hide(true);
                if (this.touchDragCloud) {
                    this.touchDragCloud.addEvent();
                }
            }
        });
    }

    get zoomSize() {
        const r = this.option('zoom.ratio');
        const originWidth = this.infoSize.width;
        const originHeight = this.infoSize.height;
        let size = {
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
    }

    openLens(x, y, longTap, toLevel) {
        let result = false;

        if (this.isZoomSizeExist()) {
            const zoomSize = this.zoomSize;
            result = true;
            this.stopSmoothing();
            this.stopAnimation();
            if (this.hint) { this.hint.hide(); }

            if (this.hotspots) {
                this.hotspots.hideActiveHotspotBox(true);
            }

            let round = false;
            let lensImgWidth;
            let lensImgHeight;

            if (this.isFullscreenActionEnded() && this.imagesMap.isLoaded({ width: this.currentImageSize.width, height: this.currentImageSize.height })) {
                lensImgWidth = this.currentImageSize.width;
                lensImgHeight = this.currentImageSize.height;
                round = true;
            } else {
                lensImgWidth = this.lastImg.serverWidth;
                lensImgHeight = this.lastImg.serverHeight;
            }

            const img = this.imagesMap.getCurrentImage({
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
    }

    done() {
        const rows = this.imagesMap.countOfRows;
        const cols = this.imagesMap.countOfFrames;

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

        this.boxBoundaries = this.coreNode.rect;

        this.animate('start');

        if (this.accountInfo.branded) {
            const nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
            globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, this.instanceNode, BRAND_LANDING, '360-degree viewer by Sirv');
        }

        this.sendStats('viewerReady', (+new Date()) - this.sessionStartTime, {
            rows: this.imagesMap.countOfRows,
            columns: this.imagesMap.countOfFrames,
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
        super.done();

        if (this.hotspots) {
            this.hotspots.instanceComponentNode = this.canvasContainer;
            this.hotspots.containerSize = this.canvasContainer.node.getBoundingClientRect();
        }
    }

    setBrowserEvents() {
        this.setDrag(this.coreNode);
        this.setMouseWheel(this.coreNode);
    }

    setCanvas() {
        if (!this.canvasPromise) {
            let _resolve;
            let canvasOpacityHandler;
            let _timer = null;

            this.canvasPromise = helper.makeQueryblePromise(new Promise((resolve1, reject) => {
                _resolve = resolve1;
                if (this.firstImageLoaded) {
                    this.draw();
                }

                if (!this.isInView || !this.isSlideShown) {
                    this.canvas.addClass(P + '-shown');
                    resolve1();
                } else {
                    _timer = setTimeout(() => { // some times transitionend does not work
                        if (this.canvas) { // we can remove slide from slider by API much faster then this animation
                            this.canvas.removeEvent('transitionend', canvasOpacityHandler);
                        }
                        resolve1();
                    }, 1100);

                    canvasOpacityHandler = (e) => {
                        if (e.propertyName === 'opacity') {
                            e.stop();
                            clearTimeout(_timer);
                            this.canvas.removeEvent(e.type, canvasOpacityHandler);
                            resolve1();
                        }
                    };

                    this.canvas.addEvent('transitionend', canvasOpacityHandler);
                    this.canvas.render();
                    this.canvas.addClass(P + '-shown');
                }
            }));

            this.canvasPromise.resolve = () => {
                this.canvas.removeEvent('transitionend', canvasOpacityHandler);
                _resolve();
            };
        }

        return this.canvasPromise;
    }

    clearCanvas() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    draw(neededSize) {
        if (this.ctx) {
            const size = neededSize || this.currentImageSize;

            const imageData = {
                width: size.width,
                height: size.height,
                maxSize: true,
                dppx: this.dppx
            };

            const img = this.imagesMap.getCurrentImage(imageData);

            this.lastImg = img;

            if (!img) { return; }

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

    setCanvasSize() {
        const s = this.currentSize;

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
    }

    calcMinSizeForDrag() {
        const s = this.currentSize;
        this.minSizeOfFrame = this.imagesMap.pixelPerFrame(s.width);
        this.minSizeOfRow = this.imagesMap.pixelPerRow(s.height);
    }

    smoothing(distance, time, direction) {
        // direction - next, prev, down, up
        if (!time) { return; }
        let speed = distance / time;
        const move = () => {
            speed *= 0.97;
            this.smooseTimeout = setTimeout(() => {
                this.imagesMap.prepareFutureImage(direction);
                this.imagesMap.setPreparedFutureImage();
                this.draw();
                if (speed > 0.3) { move(); }
            }, (this.minSizeOfFrame / speed));
        };

        if (!this.isSmoothing) {
            this.isSmoothing = true;
            move();
        }
    }

    stopSmoothing() {
        if (this.isSmoothing) {
            this.isSmoothing = false;
            clearTimeout(this.smooseTimeout);
            this.smooseTimeout = null;
            this.imagesMap.resetPreparedImage();
        }
    }

    animateWithDelay(action) {
        let animateAction = 'inactive';
        if (action) { animateAction = action; }

        if (this.option('autospin.enable')) {
            clearTimeout(this.autospinResumeTimer);
            this.autospinResumeTimer = setTimeout(() => {
                this.animate(animateAction);
            }, this.option('autospin.resume'));
        } else {
            this.animate(animateAction);
        }
    }

    setDrag(node) {
        const rows = this.imagesMap.countOfRows;
        const cols = this.imagesMap.countOfFrames;
        const multi = rows > 1 && cols > 1;
        const sphereValues = {
            x: {
                minSize: this.minSizeOfFrame,
                count: cols
            },

            y: {
                minSize: this.minSizeOfRow,
                count: rows
            }
        };

        const onAnyDrag = this.option('freeDrag');
        let lastPoint = { x: 0, y: 0 };
        let lastPartOfDistance = { x: 0, y: 0 };
        let canMoveAxis = null;
        if (!multi) {
            canMoveAxis = (cols > 1) ? 'x' : 'y';
        }

        let lastTime = null;
        let axis;
        const fns = {};
        let otherAxis;
        let queue = {
            x: { next: 0, prev: 0 },
            y: { up: 0, down: 0 }
        };

        let startTime;
        let rotate = false;
        const rotateDebounce = helper.debounce(() => { rotate = false; }, 50);

        const G = 9.8;
        const COEFFICIENT_OF_FRICTION = 0.00065;

        const FRICTION_FORCE = {
            x: COEFFICIENT_OF_FRICTION * cols * G,
            y: COEFFICIENT_OF_FRICTION * rows * G
        };

        const DIRECTIONS = {
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

        const onDrag = (e) => {
            clearTimeout(this.longTapTimer);
            fns[e.state](e);
        };

        const addPoint = (_axis, _speed, _distance, _direction) => {
            queue[_axis][_direction] += _distance;
        };

        const getPoints = (_axis) => {
            const a = queue[_axis];
            let result;

            const dir = (_axis === 'x') ? ['next', 'prev'] : ['up', 'down'];

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

        const getCountOfItems = (frictionForce, weight, distance, time, sizeOfItem) => {
            let result;

            // eslint-disable-next-line no-restricted-properties
            result = (weight * Math.pow(distance / time, 2)) / (2 * frictionForce);
            result = Math.floor(result / sizeOfItem);

            return result;
        };

        const getTime = (frictionForce, weight, distance, time) => {
            return (weight * (distance / time)) / frictionForce;
        };

        const getDirection = (value, _axis) => {
            return DIRECTIONS[_axis][value >= 0 ? 0 : 1];
        };

        fns.dragstart = (e) => {
            this.firstUserInteraction = true;
            this.isDragMove = true;
            this.stopSmoothing();
            this.stopAnimation();
            if (this.hint) { this.hint.hide(); }
            if (this.hotspots) {
                this.hotspots.hideNeededElements(true);
            }

            this.userColumn = this.imagesMap.startColumn;
            this.userRow = this.imagesMap.startRow;

            if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                e.stop();
            }

            lastPoint.x = e.x;
            lastPoint.y = e.y;
            lastTime = e.timeStamp;

            startTime = +new Date();

            const t = (+new Date()) - this.sessionStartTime;
            this.sendStats('dragStart', t, {
                clientX: e.x - this.boxBoundaries.left,
                clientY: e.y - this.boxBoundaries.top,
                pageX: e.x,
                pageY: e.y
            });

            this.sendEvent('spinStart');
            this.sendEvent('rotate');
            this.sendStats('rotate', t, {});

            this.pinchCloud.removeEvent();
        };

        fns.dragend = (e) => {
            let time;
            let values;
            let countOfItems;
            let timeOfAnimation;
            let timeOfAnimation2;
            const animationValues = [];

            if (this.isDragMove) {
                e.stop();
                this.isDragMove = false;
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

                    this.animateTo(timeOfAnimation, animationValues);
                    this.pinchCloud.addEvent();
                } else {
                    if (this.hotspots && this.isInView && this.isSlideShown) {
                        this.hotspots.showNeededElements();
                    }

                    this.animateWithDelay();
                }

                this.sendEvent('spinEnd');
                const now = +new Date();
                this.sendStats('dragEnd', now - this.sessionStartTime, {
                    duration: now - startTime,
                    clientX: e.x - this.boxBoundaries.left,
                    clientY: e.y - this.boxBoundaries.top,
                    pageX: e.x,
                    pageY: e.y
                });

                lastPoint = { x: 0, y: 0 };
                lastTime = null;
                lastPartOfDistance = { x: 0, y: 0 };

                queue = {
                    x: { next: 0, prev: 0 },
                    y: { up: 0, down: 0 }
                };

                rotate = false;
            }
        };

        const setFrame = (currentAxis, direction) => {
            let result = false;

            if (lastPartOfDistance[currentAxis] > sphereValues[currentAxis].minSize) {
                result = true;
                const count = Math.floor(lastPartOfDistance[currentAxis] / sphereValues[currentAxis].minSize);
                lastPartOfDistance[currentAxis] = lastPartOfDistance[currentAxis] % sphereValues[currentAxis].minSize;
                this.imagesMap.prepareFutureImage(direction, count);
                this.imagesMap.setPreparedFutureImage();
            }

            return result;
        };

        fns.dragmove = (e) => {
            const directions = {};
            const currentDistance = { x: 0, y: 0 };
            const absCurrentDistance = { x: 0, y: 0 };
            let currentSpeed;

            if (this.isDragMove) {
                rotate = true;
                this.customActionWas = true;
                currentDistance.x = e.x - lastPoint.x; // +prev, -next
                currentDistance.y = e.y - lastPoint.y; // +down, -up
                absCurrentDistance.x = Math.abs(currentDistance.x);
                absCurrentDistance.y = Math.abs(currentDistance.y);
                currentSpeed = e.timeStamp - lastTime;
                lastTime = e.timeStamp;
                axis = absCurrentDistance.x >= absCurrentDistance.y ? 'x' : 'y';
                otherAxis = axis === 'x' ? 'y' : 'x';

                if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || multi || onAnyDrag || axis === 'x' && cols > 1 || axis === 'y' && rows > 1) {
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

                this.userColumn = this.imagesMap.currentColumn;
                this.userRow = this.imagesMap.currentRow;

                lastPoint.x = e.x;
                lastPoint.y = e.y;

                this.draw();

                rotateDebounce();
            }
        };

        const cloud = {
            eventAdded: false
        };

        cloud.addEvent = () => {
            if (!cloud.eventAdded) {
                cloud.eventAdded = true;
                node.addEvent(['mousedrag', 'touchdrag'], onDrag);
            }
        };

        cloud.removeEvent = () => {
            if (cloud.eventAdded) {
                cloud.eventAdded = false;
                node.removeEvent(['mousedrag', 'touchdrag'], onDrag);
            }
        };

        this.touchDragCloud = cloud;

        if (!this.slideDragEventStart) {
            this.touchDragCloud.addEvent();
        }
    }

    animateTo(time, values) {
        const last = [];
        const dirs = [];
        const startObj = {};

        clearTimeout(this.autospinResumeTimer);
        if (this.animationFX) {
            this.animationFX.stop();
        }

        for (let i = 0, l = values.length; i < l; i++) {
            dirs.push(values[i].direction);
            last.push(0);
            startObj[values[i].direction] = [0, values[i].items];
        }

        this.animationFX = new $J.FX($J.$new('div'), {
            duration: Math.abs(time),
            transition: $J.FX.getTransition().inCubic,
            onBeforeRender: $((ds, value) => {
                let _i;
                let frame;
                for (_i = 0; _i < ds.length; _i++) {
                    frame = Math.round(value[ds[_i]]);
                    if (last[_i] !== frame) {
                        this.imagesMap.prepareFutureImage(ds[_i], frame - last[_i]);
                        this.imagesMap.setPreparedFutureImage();
                        this.userColumn = this.imagesMap.currentColumn;
                        this.userRow = this.imagesMap.currentRow;
                        last[_i] = frame;
                    }
                }

                this.draw();
            }).bind(this, dirs),
            onComplete: () => {
                this.stopAnimation();
                this.animateWithDelay();
                if (this.hotspots && this.isInView && this.isSlideShown) {
                    this.hotspots.showNeededElements();
                }
            }
        }).start(startObj);
    }

    setMouseWheel(node) {
        let delta;
        let direction;
        const correction = 8 / 54;
        let count = 0;
        let spinOnWheel = false;
        // let stack = [];
        const wheelStep = 3;
        const wheelDebounce = helper.debounce((isMouse) => {
                spinOnWheel = false;
                // stack = [];
                this.sendEvent('spinEnd');

                if (isMouse) {
                    count = 0;
                } else {
                    this.animateWithDelay();
                }
        }, 200);

        const rows = this.imagesMap.countOfRows;
        const cols = this.imagesMap.countOfFrames;
        const multi = rows > 1 && cols > 1;
        const onAnyDrag = this.option('freeDrag');

        if (this.option('wheel')) {
            let _shiftButtonIsPressed = false;
            this.keyPressHandlerForShiftButton = (e) => {
                if (e.oe.keyCode === 16) { // shift
                    _shiftButtonIsPressed = e.type === 'keydown';
                }
            };
            $J.W.addEvent(['keydown', 'keyup'], this.keyPressHandlerForShiftButton);

            node.addEvent('mousescroll', (e) => {
                this.firstUserInteraction = true;
                const shiftButtonIsPressed = e.isMouse ? _shiftButtonIsPressed : false;
                const isX = Math.abs(e.deltaY) < Math.abs(e.deltaX);
                // TODO chrome on windows 10 has just Y axis
                // if (!isX && rows === 1) { return; }
                if (!isX && !multi && !onAnyDrag) { return; }

                this.customActionWas = true;

                e.stop();

                if (this.animationFX) {
                    this.animationFX.stop();
                    this.animationFX = null;
                }

                this.stopSmoothing();
                this.stopAnimation();

                if (this.hotspots) {
                    this.hotspots.hideActiveHotspotBox();
                }

                if (!spinOnWheel) {
                    spinOnWheel = true;
                    this.sendEvent('spinStart');
                    this.sendEvent('rotate');
                    this.sendStats('rotate', (+new Date()) - this.sessionStartTime, {});
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
                    delta = (delta / Math.abs(delta)) * wheelStep;
                    count += Math.abs(delta);
                    this.animateTo(200, [{ direction: direction, items: count }]);
                } else {
                    delta = delta * correction;
                    count += delta;

                    if (Math.abs(count) > 1) {
                        delta = parseInt(count, 10);
                        count -= delta;

                        this.imagesMap.prepareFutureImage(direction, Math.abs(delta));
                        this.imagesMap.setPreparedFutureImage();
                        this.draw();
                    }
                }

                wheelDebounce(e.isMouse);
            });
        }
    }

    animate(action, autoplayDuration, autoplayType, fromAPI) {
        const isAutospin = action === 'autoplay' || this.option('autospin.enable');
        if (!this.isInView || !this.isSlideShown || this.animationCloud.isMoving() || this.isDragMove || this.customActionWas && !isAutospin && !fromAPI || this.openedImg) {
            return;
        }

        if (this.animationCloud.isPaused()) {
            this.animationCloud.resume();
            return;
        }

        clearTimeout(this.animationCloud.hintTimer);
        clearTimeout(this.autospinResumeTimer);

        let delay = false;
        let effect = null;

        if (isAutospin) {
            if (this.isAutoplayPaused) { return; }
            effect = 'as-' + (autoplayType || this.option('autospin.type'));
            if (action !== 'start') {
                delay = true;
            }
        } else {
            let nameOfEvent;

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
                const tmp = this.option('hint.' + nameOfEvent + '.effect');
                if (tmp) {
                    effect = tmp;
                }
            }
            // showTextHint = false;
        }

        this.animationCloud.start({
            speed: autoplayDuration || this.option('autospin.duration'),
            type: effect,
            infinite: isAutospin,
            delay: delay,
            isBackward: this.reflectDirection,
            userInteraction: fromAPI
        }, () => {
            const r = this.showHint();
            if (this.hotspots && this.isInView && this.isSlideShown) {
                this.hotspots.showNeededElements();
            }
            if (this.option('hint.onInactive.enable')) {
                if (r) {
                    this.animationCloud.hintTimer = setTimeout(() => {
                        this.animationCloud.hintTimer = null;
                        this.animate('inactive');
                    }, this.hint.movingTime);
                } else {
                    this.animate('inactive');
                }
            }
        });
    }

    initAnimation() {
        let isMoving = false;
        let isPaused = false;
        let isStopped = false;
        let timer = null;
        let delayTimer = null;
        let step;
        let currentIndex = 0;
        let callback = null;
        let framesLength = this.imagesMap.countOfFrames;
        let options;

        if (this.option('swapSides')) {
            framesLength = this.imagesMap.countOfRows;
        }

        const clear = () => {
            isMoving = false;
            currentIndex = 0;
        };

        const end = () => {
            clear();
            if (callback) {
                callback();
            }
        };

        const move = () => {
            let count = this.imagesMap.getNextBufferIndex(currentIndex);

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
                this.imagesMap.setNextAnimationFrame(currentIndex);

                timer = setTimeout(() => {
                    this.imagesMap.setPreparedNextImage();
                    this.draw();
                    move();
                }, count * step);
            } else {
                end();
            }
        };

        const getSpeed = (currentSpeed, typeOfAnimation) => {
            let r = currentSpeed;

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

        const animationCloud = {
            hintTimer: null,
            isMoving: () => { return isMoving; },
            isPaused: () => { return isPaused; },

            start: (_options, cb) => {
                if (isMoving) { return; }
                isMoving = true;
                isStopped = false;

                const _move = () => {
                    delayTimer = null;
                    if (options.type) {
                        if (!this.imagesMap) { return; }
                        this.imagesMap.createAnimation(options.type, options.isBackward);
                        if (options.userInteraction && this.imagesMap.imagesBuffer && this.imagesMap.imagesBuffer.length) {
                            const last = this.imagesMap.imagesBuffer[this.imagesMap.imagesBuffer.length - 1];
                            this.userColumn = last.col;
                            this.userRow = last.row;
                        }
                        step = options.speed / framesLength;

                        if (options.infinite) {
                            this.showHint();
                        }

                        move();
                    } else {
                        end();
                    }
                };

                callback = cb;

                options = Object.assign({
                    speed: 3600,
                    type: 'row',
                    delay: false,
                    infinite: false,
                    isBackward: false,
                    userInteraction: false
                }, _options);

                options.speed = getSpeed(options.speed, options.type);

                if (options.delay && !options.infinite) {
                    delayTimer = setTimeout(_move, this.option('inactivity'));
                } else {
                    _move();
                }
            },

            resume: () => {
                if (isPaused) {
                    isMoving = true;
                    isPaused = false;
                    move();
                }
            },

            pause: () => {
                if (!isPaused && !isStopped) {
                    isMoving = false;
                    isPaused = true;

                    clearTimeout(animationCloud.hintTimer);
                    clearTimeout(delayTimer);
                    clearTimeout(timer);
                }
            },

            stop: () => {
                animationCloud.pause();
                isStopped = true;
                isPaused = false;

                currentIndex = 0;
                callback = null;

                this.imagesMap.clearFramesQueue();
                this.imagesMap.resetPreparedImage();
            }
        };

        this.animationCloud = animationCloud;
    }

    stopAnimation() {
        if (this.animationFX) {
            this.animationFX.stop();
            this.animationFX = null;
        }

        clearTimeout(this.autospinResumeTimer);
        if (this.animationCloud) {
            this.animationCloud.stop();
        }
    }

    // eslint-disable-next-line no-unused-vars
    onBeforeFullscreenIn(data) {
        this.stopSmoothing();
        this.stopAnimation();

        if (this.zoom) {
           this.zoom.hide(true);
        }

        this.deactivateSpin();

        this.boxBoundaries = this.coreNode.rect;

        super.onBeforeFullscreenIn(data);

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
    }

    // eslint-disable-next-line no-unused-vars
    onAfterFullscreenIn(data) {
        if (!this.infoSize) { return; }
        // const insideIFrame = $J.W.node.parent !== $J.W.node.window;
        // const pseudo = data.pseudo;

        // if we use it, we do not have pinchend event and touchdrag after that
        // if (this.pinchCloud) {
        //     this.pinchCloud.removeEvent();
        //     this.pinchCloud.addEvent();
        // }

        if (this.canvasPromise && this.canvasPromise.isPending()) {
            this.canvasPromise.resolve();
        }

        const screenSize = this.coreNode.size;
        this.currentSize = helper.spinLib.calcProportionSize(screenSize, this.infoSize, true, this.standardSize);
        this.getDPPX(this.currentSize);

        this.setImageSize();
        this.setCanvasSize();

        if (this.ready) {
            if (!this.imagesMap.isImagesExist({ width: this.currentImageSize.width, height: this.currentImageSize.height })) {
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
            setTimeout(() => {
                this.canvas.setCss({
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

        if (this.ready) {
            this.animate('inactive');
            if (!$J.browser.mobile) {
                this.showHint();
            }

            this.fullscreenStartTime = +new Date();
            this.sendStats('fullscreenOpen', (+new Date()) - this.sessionStartTime);
        }
    }

    // eslint-disable-next-line no-unused-vars
    onBeforeFullscreenOut(data) {
        this.stopSmoothing();
        this.stopAnimation();

        if (this.zoom) {
            this.zoom.hide(true);
        }

        this.deactivateSpin();

        if (this.hint && this.always) {
            this.hint.hide();
        }

        super.onBeforeFullscreenOut(data);

        if (this.isInited && this.isInView && this.isSlideShown) {
            this.isHidden = true;
            this.canvas.setCss({
                opacity: 0,
                visibility: 'hidden'
            });
        }
    }

    // eslint-disable-next-line no-unused-vars
    onAfterFullscreenOut(data) {
        if (!this.infoSize) { return; }
        // const pseudo = data.pseudo;

        // if we use it, we do not have pinchend event and touchdrag after that
        // if (this.pinchCloud) {
        //     this.pinchCloud.removeEvent();
        //     this.pinchCloud.addEvent();
        // }

        if (this.canvasPromise && this.canvasPromise.isPending()) {
            this.canvasPromise.resolve();
        }

        this.currentSize = helper.spinLib.calcProportionSize(this.coreNode.size, this.infoSize);
        this.getDPPX(this.currentSize);
        this.standardSize.width = this.currentSize.width;
        this.standardSize.height = this.currentSize.height;
        this.currentImageSize.width = this.currentSize.width;
        this.currentImageSize.height = this.currentSize.height;

        this.setCanvasSize();

        if (this.ready) {
            if (!this.imagesMap.isImagesExist({ width: this.currentSize.width, height: this.currentSize.height })) {
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
            setTimeout(() => {
                if (!this.destroyed) {
                    this.canvas.setCss({
                        opacity: '',
                        visibility: ''
                    });
                }
            }, 0);
        }

        super.onAfterFullscreenOut(data);
        if (this.ready) {
            this.animate('inactive');
            if (!$J.browser.mobile) {
                this.showHint();
            }

            const now = +new Date();
            this.sendStats('fullscreenClose', now - this.sessionStartTime, {
                duration: now - this.fullscreenStartTime
            });
        }
    }

    play(duration, effect) {
        let result = false;

        if (this.ready && !this.isZoomed()) {
            this.isAutoplayPaused = false;
            this.stopSmoothing();
            this.stopAnimation();

            if (!this.instanceOptions.checkValue('autospin.duration', duration)) { duration = null; }
            if (!this.instanceOptions.checkValue('autospin.type', effect)) { effect = null; }

            this.animate('autoplay', duration, effect);

            result = true;
        }

        return result;
    }

    pause() {
        let result = false;

        if (this.ready && !this.isZoomed()) {
            this.isAutoplayPaused = true;
            this.stopSmoothing();
            this.stopAnimation();

            this.animateWithDelay();

            result = true;
        }

        return result;
    }

    rotate(countOfCols, countOfRows) {
        let result = false;
        const normalizeValue = (value) => {
            if (!value) {
                value = 0;
            } else if ($J.typeOf(value) === 'string') {
                value = parseInt(value, 10);
                if (isNaN(value)) { value = 0; }
            }

            return value;
        };

        if (this.ready) {
            countOfCols = normalizeValue(countOfCols);
            countOfRows = normalizeValue(countOfRows);

            if (countOfCols !== 0 || countOfRows !== 0) {
                this.stopAnimation();
                this.stopSmoothing();

                if (!this.isDragMove) {
                    this.sendEvent('rotate');
                    this.sendStats('rotate', (+new Date()) - this.sessionStartTime, {});

                    this.animate({
                        cols: countOfCols,
                        rows: countOfRows
                    }, $J.U, $J.U, true);
                    result = true;
                }
            }
        }

        return result;
    }

    jumpTo(value, axis) {
        let result = false;
        let direction = null;

        if (this.ready) {
            if ($J.typeOf(value) === 'string') {
                value = value.trim();
                direction = /^-/.test(value) ? 'prev' : 'next';
            }

            value = parseInt(value, 10);

            if (!isNaN(value)) {
                result = this.imagesMap.jump(axis, value, direction);
                if (result && this.firstImageLoaded) {
                    this.sendEvent('rotate');
                    this.sendStats('rotate', (+new Date()) - this.sessionStartTime, {});
                    this.draw();
                }
            }
        }

        return result;
    }

    zoomIn() {
        if (this.ready && this.zoom) {
            if (!this.isDragMove && this.isFullscreenActionEnded()) {
                return this.openLens();
            }
        }

        return false;
    }

    zoomOut() {
        if (this.ready && this.zoom) {
            return this.zoom.hide();
        }

        return false;
    }

    getCurrentFrame() {
        if (this.ready) {
            const img = this.imagesMap.getCurrentImage({ width: this.currentSize.width, height: this.currentSize.height });

            return {
                row: img.row + 1,
                column: img.col + 1
            };
        }

        return false;
    }

    get originImageUrl() {
        if (this.ready) {
            return this.imagesMap.originImageUrl;
        }

        return null;
    }

    setCallback(name, fn) {
        if (this.ready) {
            this.option(name, fn);
            return true;
        }

        return false;
    }

    setImageSize() {
        this.currentImageSize.width = this.currentSize.width;
        this.currentImageSize.height = this.currentSize.height;
    }

    isZoomSizeExist() {
        let result = false;
        // const minZoom = 1.2;
        const minZoomFactor = 100; // like in deep zoom level calculation

        if (this.option('zoom.enable')) {
            const cs = this.currentImageSize;
            const zoomSize = this.zoomSize;

            if (zoomSize.originWidth - cs.width >= minZoomFactor) {
                result = true;
            }
        }

        return result;
    }

    get orientation() {
        return this.imagesMap.getHintType();
    }

    onResize() {
        if (this.fullscreenState === globalVariables.FULLSCREEN.OPENING || !this.isStarted) { return false; }

        const isFullscreen = this.fullscreenState === globalVariables.FULLSCREEN.OPENED;
        this.stopSmoothing();

        if (this.option('autospin.enable')) {
            this.animationCloud.pause();
        } else {
            this.stopAnimation();
        }

        this.boxBoundaries = this.coreNode.rect;

        this.currentSize = helper.spinLib.calcProportionSize($(this.coreNode.node.parentNode).size, this.infoSize, isFullscreen, this.standardSize);
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

        if (!this.imagesMap.isImagesExist({ width: this.currentSize.width, height: this.currentSize.height })) {
            this.imagesMap.loadImages({
                width: this.currentSize.width,
                height: this.currentSize.height,
                dppx: this.dppx
            });
        }

        if (this.firstImageLoaded) {
            this.draw();
        }

        if (this.ready && this.hotspots) {
            this.hotspots.containerSize = this.canvasContainer.node.getBoundingClientRect();
            this.hotspots.updateAndShow();
        }

        this.resizeAnimationTimer();

        return true;
    }

    // @Override, HotspotInstance class
    getContainerForBoundengClientRect() {
        return this.canvasContainer;
    }

    destroy() {
        this.instanceNode.removeEvent('touchmove', fnStopTouchMove);
        $J.W.removeEvent('resize', this.windowResizeCallback);
        clearTimeout(this.resizeWindowTimer);

        if (this.isInited) {
            this.sendStats('sessionEnd', (+new Date()) - this.sessionStartTime, { message: 'Stopped' });
        }

        this.coreNode.removeEvent(['btnclick', 'tap']);
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
            $J.W.removeEvent(['keydown', 'keyup'], this.keyPressHandlerForShiftButton);
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

        this.coreNode.removeEvent(['mousedrag', 'touchdrag', 'pinch']);

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
        }

        // this.additionalCanvases = [];
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
        super.destroy();

        return true;
    }
}

return Spin;

    }
);
