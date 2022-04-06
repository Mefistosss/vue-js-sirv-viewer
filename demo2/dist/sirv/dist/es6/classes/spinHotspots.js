Sirv.define(
    'SpinHotspots',
    ['bHelpers','magicJS','globalFunctions','EventEmitter','Hotspots','helper'],
    (bHelpers,magicJS,globalFunctions,EventEmitter,Hotspots,helper) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global Hotspots, helper*/
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SpinHotspots" }] */

class SpinHotspots extends Hotspots {
    constructor() {
        super();

        this.options = {
            rows: 1,
            columns: 36,
            rowsRevers: false,
            columnsRevers: false,
            originImageSize: {}
        };

        this.row = null;
        this.col = null;
        this.hotspotsSettings = [];
    }

    /**
     * @param {any} options
     */
    set Options(options) {
        this.options = Object.assign(this.options, options || {});
    }

    get frameIndex() {
        let result;

        if (this.options.rowsRevers && this.options.columnsRevers) {
            result = (this.options.rows - this.row - 1) * this.options.columns + (this.options.columns - this.col);
        } else if (this.options.rowsRevers) {
            result = (this.options.rows - this.row - 1) * this.options.columns + this.col + 1;
        } else if (this.options.columnsRevers) {
            result = this.row * this.options.columns + (this.options.columns - this.col);
        } else {
            result = this.row * this.options.columns + this.col + 1;
        }

        return result;
    }

    createHotspotsSettings(dataSettings) {
        let firstFrame = true;
        for (let index = 0, l = dataSettings.length; index < l; index++) {
            const map = new Map();

            Object.entries(dataSettings[index].frames).forEach(([frameIndex, frame]) => {
                const settings = frame;
                settings.pointerPositionPercentage = {
                    top: helper.isPercentage('' + frame.pointer.y),
                    left: helper.isPercentage('' + frame.pointer.x)
                };

                Object.entries(dataSettings[index]).forEach(([item, value]) => {
                    if (item !== 'frames') {
                        if (!(item === 'data' && !firstFrame)) {
                            settings[item] = value;
                            firstFrame = false;
                        }
                    }
                });

                map.set(parseInt(frameIndex, 10), settings);
            });

            this.hotspotsSettings.push(map);
            firstFrame = true;
        }
    }

    createHotspots(hotspotsData) {
        if (!Array.isArray(hotspotsData)) {
            hotspotsData = [hotspotsData];
        }

        this.createHotspotsSettings(hotspotsData);
        const hotspotSettings = this.startHotspotSettings;
        super.createHotspots(hotspotSettings);
    }

    addHotspot(hotspotData) {
        if (!Array.isArray(hotspotData)) {
            hotspotData = [hotspotData];
        }

        this.createHotspotsSettings(hotspotData);
        const hotspotSettings = this.startHotspotSettings;
        super.createHotspots(hotspotSettings.slice(hotspotSettings.length - hotspotData.length));

        this.updateAndShow();
    }

    get startHotspotSettings() {
        const tempHotspotData = [];

        this.hotspotsSettings.forEach((map) => {
            let startSettings = null;

            if ($J.browser.uaName === 'ie') {
                map.forEach((value) => {
                    if (!startSettings) {
                        startSettings = value;
                    }
                });
            } else if (map.entries().next().value) {
                startSettings = map.entries().next().value[1];
            }

            if (startSettings) {
                tempHotspotData.push(startSettings);
            }
        });

        return tempHotspotData;
    }

    setFramePosition(row, col) {
        this.row = row;
        this.col = col;
    }

    updateAndShow() {
        const frameIndex = this.frameIndex;
        this.hotspotsSettings.forEach((hotspotSettings, index) => {
            const sett = hotspotSettings.get(frameIndex);
            const hs = this.hotspots[index];

            if (sett && hs.isEnabled()) {
                hs.setHotspotSettings(sett);

                if (hs.isHotspotShown()) {
                    hs.setPointerPosition();

                    this.showNeededElements();

                    if (hs.isBoxAlwaysVisible()) {
                        hs.setBaseBoxSize(hs.boxSize);
                        hs.setBoxPosition();
                    }

                    if (hs.isTooltipAlwaysVisible()) {
                        hs.setTooltipPosition();
                    }
                } else {
                    this.show(index);
                }
            } else {
                this.hide(index);
            }
        });
    }

    hideNeededElements(flag) {
        this.activeHotspots.forEach((hs) => {
            if (!hs.isBoxAlwaysVisible()) {
                hs.hideBox(flag);
            }
        });

        this.hoveredHotspots.forEach((hs) => {
            if (hs.isTooltipAlwaysVisible()) {
                hs.hideTooltip(flag);
            }
        });
    }

    changeHotspotsPosition(row, col) {
        if (this.row !== row || this.col !== col) {
            this.setFramePosition(row, col);
            this.updateAndShow();
        }
    }

    showAll() {
        const position = this.frameIndex;
        this.hotspotsSettings.forEach((map, index) => {
            if (map.get(position)) {
                this.show(index);
            }
        });
    }

    enable(index) {
        if (this.hotspotsSettings[index]) {
            const hs = this.hotspots[index];
            hs.enable();
            if (this.hotspotsSettings[index].get(this.frameIndex)) {
                hs.show();
            }
        }
    }

    setStateById(index, settings) {
        if (this.hotspots[index]) {
            this.hotspots[index].setState(settings, !this.hotspotsSettings[index].get(this.frameIndex));
        }
    }

    removeHotspot(index) {
        if (this.hotspots[index]) {
            this.hotspotsSettings.splice(index, 1);
            super.removeHotspot(index);
        }
    }

    destroy() {
        super.destroy();
        this.options = null;
        this.row = null;
        this.col = null;
        this.hotspotsSettings = null;
    }
}

return SpinHotspots;

    }
);
