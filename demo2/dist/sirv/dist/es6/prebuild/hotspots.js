Sirv.define(
    'Hotspot',
    ['bHelpers','globalFunctions','magicJS','EventEmitter','helper'],
    (bHelpers,globalFunctions,magicJS,EventEmitter,helper) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName('Hotspot', () => {
            return '@charset "UTF-8";.sirv-hotspot-pointer{display:inline-block;position:absolute;width:20px;height:20px;transform:translate(-50%,-50%);background-repeat:no-repeat;cursor:pointer;z-index:11;pointer-events:auto}.sirv-hotspot-pointer.pulsating-point{background-image:none}.sirv-hotspot-pointer.pulsating-point::after,.sirv-hotspot-pointer.pulsating-point::before{display:inline-block;position:absolute;top:0;left:0;width:100%;height:100%;transform-origin:50% 50%;border-radius:100%;content:\'\'}.sirv-hotspot-pointer.pulsating-point::before{transition:opacity .2s ease-in,transform .1s ease-out;background-color:#ff0;opacity:.6;overflow:hidden}.sirv-hotspot-pointer.pulsating-point::after{border:1px solid #ff0;opacity:0;box-sizing:border-box;animation:pulsating-point-pulsate 3s ease-out infinite;pointer-events:none}.sirv-hotspot-pointer.pulsating-point:hover::before{cursor:pointer;opacity:.8}.sirv-hotspot-pointer.pulsating-point:active::before{transform:scale(.875)}.sirv-hotspot-pointer.pulsating-point:hover::after{animation:none}.sirv-hotspot-pointer.pulsating-point:active::after{animation:pulsating-point-stop-pulsate .3s}.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container{position:absolute!important;pointer-events:none}.smv .smv-slides-box .smv-slides .smv-slide .smv-content .sirv-hotspot-container.sirv-hotspot-overwrite-pointer-event{pointer-events:auto!important}@keyframes pulsating-point-pulsate{0%{transform:scale(1);opacity:.8}45%{transform:scale(1.75);opacity:0}}@keyframes pulsating-point-stop-pulsate{from{opacity:.4}to{transform:scale(2);opacity:0}}.sirv-hotspot-tooltip{display:block;position:absolute;padding:8px 24px;transition:opacity .15s linear 0s;border:1px solid #efefef;border-radius:4px;background-color:#fff;font:normal 12px/1.42857 \'Lucida Grande\',\'Lucida Sans Unicode\',Verdana,\'Helvetica Neue\',Arial,Helvetica,sans-serif;border-collapse:separate;box-shadow:0 5px 10px 2px rgba(0,0,0,.1);opacity:0;z-index:9999999999;pointer-events:none;-webkit-font-smoothing:antialiased}.sirv-hotspot-tooltip--default{margin-top:-8px;padding:6px 9px;transform:translate(-50%,-100%);border:0;background-color:rgba(49,51,61,.76);color:#eee}.sirv-hotspot-tooltip--default::after{position:absolute;top:100%;left:50%;width:0;height:0;transform:translateX(-50%);border-width:8px 8px 0;border-style:solid;border-color:rgba(49,51,61,.76) transparent transparent;content:\'\'}.sirv-hotspot-tooltip--balloon{margin-top:-40px;transform:translate(-40px,-100%)}.sirv-hotspot-tooltip--balloon::after{position:absolute;top:100%;left:24px;width:0;height:0;border-width:0 15px 40px 0;border-style:solid;border-color:transparent #fff transparent transparent;content:\'\'}.sirv-hotspot-tooltip.sirv-hotspot-tooltip-visible{transition-delay:.1s;opacity:1}.sirv-hotspot-box{display:flex;position:fixed;max-width:100vw;max-height:100vh;padding:10px;transition:opacity .15s linear 0s;z-index:9999999999;box-sizing:border-box}.sirv-hotspot-box.sirv-hotspot-box-out-of-width{right:0!important;left:0!important}.sirv-hotspot-box.sirv-hotspot-box-out-of-height{top:0!important;bottom:0!important}.sirv-hotspot-box .sirv-hotspot-box-wrapper{display:flex;position:relative;max-width:inherit;max-height:inherit;padding:22px;border:1px solid #efefef;border-radius:4px;background:#fff;font-size:16px!important;line-height:100%;text-align:left;border-collapse:separate;box-shadow:0 5px 10px 2px rgba(0,0,0,.1);overflow:hidden;box-sizing:border-box}.sirv-hotspot-box .sirv-hotspot-box-content{top:0;left:0;width:100%;max-width:inherit;height:calc(100% + 2px);max-height:inherit;overflow:auto}.sirv-hotspot-box .sirv-hotspot-close-button{position:absolute;top:2px;right:2px;width:24px;height:24px;color:#888;font:normal 22px/1 Arial,monospace;text-align:center;cursor:pointer;speak:none;-webkit-font-smoothing:antialiased}.sirv-hotspot-box .sirv-hotspot-close-button::before{display:inline;position:static;color:inherit!important;font:inherit!important;content:\'×\';vertical-align:middle;-webkit-font-smoothing:inherit!important}';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* global EventEmitter */
/* global helper */
/* eslint-disable no-restricted-syntax */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Hotspot" }] */


const CSS_HOTSPOT_POINTER = 'sirv-hotspot-pointer';
const CSS_HOTSPOT_POINTER_BACKWARD_COMPATIBILITY = 'hotspot-pointer';
const CSS_HOTSPOT_TOOLTIP = 'sirv-hotspot-tooltip';
const CSS_HOTSPOT_DEFAULT = 'pulsating-point';
const CSS_HOTSPOT_BOX = 'sirv-hotspot-box';
const CSS_HOTSPOT_WRAPPER = 'sirv-hotspot-box-wrapper';
const CSS_HOTSPOT_BUTTON_CLOSE = 'sirv-hotspot-close-button';
const CSS_HOTSPOT_CONTENT = 'sirv-hotspot-box-content';
const CSS_HOTSPOT_BOX_OUT_OF_WIDTH = 'sirv-hotspot-box-out-of-width';
const CSS_HOTSPOT_BOX_OUT_OF_HEIGHT = 'sirv-hotspot-box-out-of-height';

const OVERWRITE_POINTER_EVENT = 'sirv-hotspot-overwrite-pointer-event';

const STATES = {
    AUTO: 0,
    VISIBLE: 1
};

class Hotspot extends EventEmitter {
    constructor(container, hotspotData, index) {
        super();
        this.container = container;
        this.hotspotData = hotspotData;
        this._id = index;

        this.box = null;
        this.boxContainer = $J.D.node.body;
        this.baseBoxSize = null;
        this.tooltip = null;
        this.version = 1;
        this.pointer = null;

        this.hotspotSettings = {};

        this.dX = 1;
        this.dY = 1;

        this.isActive = false;
        this.isDisabled = false;
        this.isPointerInDoc = false;
        this.isHovered = false;
        this.isShown = false;

        this.isBoxContent = false;

        this.tooltipState = STATES.AUTO;
        this.boxState = STATES.AUTO;

        this.init();
    }

    isTooltipHovered() {
        return this.isHovered;
    }

    isBoxActivated() {
        return this.isActive;
    }

    isBoxAlwaysVisible() {
        return this.boxState === STATES.VISIBLE;
    }

    isTooltipAlwaysVisible() {
        return this.tooltipState === STATES.VISIBLE;
    }

    init() {
        this.setVersion();
        this.parseHotspotData();
        this.createBlocks();
        this.addEvents();
        this.createBox();
    }

    setVersion() {
        if (this.hotspotData.style || this.hotspotData.tooltip || this.hotspotData.box && this.hotspotData.box.content) {
            this.version = 2;
        }
    }

    parseHotspotData() {
        Object.keys(this.hotspotData).forEach(key => this.hotspotSettings[key] = this.hotspotData[key]);

        this.hotspotSettings.pointerPositionPercentage = {
            top: helper.isPercentage('' + this.hotspotSettings.pointer.y),
            left: helper.isPercentage('' + this.hotspotSettings.pointer.x)
        };
    }

    createBlocks() {
        this.pointer = $J.$new('div').addClass(CSS_HOTSPOT_POINTER).attr('data-spot-id', this._id);
        this.pointer.addClass(CSS_HOTSPOT_POINTER_BACKWARD_COMPATIBILITY);
        if (this.version > 1 && this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content) {
            this.tooltip = $J.$new('div').addClass(CSS_HOTSPOT_TOOLTIP).changeContent(this.hotspotSettings.tooltip.content);

            if (this.hotspotSettings.tooltip.style) {
                this.tooltip.addClass(CSS_HOTSPOT_TOOLTIP + '--' + this.hotspotSettings.tooltip.style);
            }
        }
    }

    setTooltipPosition() {
        if (this.tooltip) {
            let pointerXY = this.pointer.rect;
            const cssTooltip = { top: 0, left: 0 };

            cssTooltip.top = this.hotspotSettings.tooltip.style ? pointerXY.top : pointerXY.bottom;
            cssTooltip.left = this.hotspotSettings.tooltip.style ? (pointerXY.left + pointerXY.right) / 2 : pointerXY.right

            if ($J.$(this.boxContainer).tagName !== 'body') {
                pointerXY = this.pointer.node.getBoundingClientRect();

                cssTooltip.top = this.hotspotSettings.tooltip.style ? pointerXY.top - this.container.node.getBoundingClientRect().top
                    : pointerXY.bottom - this.container.node.getBoundingClientRect().top;
                cssTooltip.left = this.hotspotSettings.tooltip.style ? (pointerXY.left - this.container.node.getBoundingClientRect().left) + (pointerXY.width / 2)
                    : pointerXY.left - this.container.node.getBoundingClientRect().left + pointerXY.width;
            }

            this.tooltip.setCss(cssTooltip);
        }
    }

    showTooltip() {
        if (!this.isHovered && !this.isDisabled) {
            if (this.tooltip) {
                this.setTooltipPosition();

                this.tooltip.appendTo(this.boxContainer)
                    .addClass(CSS_HOTSPOT_TOOLTIP + '-visible');

                this.isHovered = true;
                this.emit('hotspotHovered', {
                    data: { hotspot: this }
                });
            }
        }
    }

    addEvents() {
        this.pointer.addEvent(['click', 'mousedown'], (e) => { e.stop(); });

        this.pointer.addEvent(['btnclick', 'tap'], (e) => {
            if (e.button === 3) { return true; }
            if (this.hotspotSettings.link) {
                $J.W.node.open(this.hotspotSettings.link);
                e.stop();
            } else if (this.isBoxContent) {
                e.stop();
                this.showBox();
            }

            return false;
        });

        if ($J.browser.uaName === 'edge' || $J.browser.ieMode) {
            this.pointer.addEvent('mousedown', (e) => {
                e.stopDistribution();
            });
        }

        if (this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content) {
            this.pointer.addEvent('mouseenter', (e) => {
                this.showTooltip();
            });

            this.pointer.addEvent('mouseleave', () => {
                if (this.tooltipState !== STATES.VISIBLE) {
                    this.hideTooltip();
                    this.isHovered = false;
                    this.emit('hotspotLeft', {
                        data: { hotspot: this }
                    });
                }
            });
        }

        let resizeTimer;
        $($J.W).addEvent('resize', (e) => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (this.isActive) {
                    const hotspotInfo = this.hotspotSettings;
                    if (hotspotInfo) {
                        this.box.setCss(this.correctBoxPosition(this.getBoxPosition(hotspotInfo)));
                    }
                }
            }, 42);
        });
    }

    createBox() {
        let boxContent = null;

        if (this.version > 1 && this.hotspotSettings.box && this.hotspotSettings.box.content) {
            boxContent = this.hotspotSettings.box.content;
        } else if (this.hotspotSettings.data) {
            boxContent = this.hotspotSettings.data;
        }

        this.box = $J.$new('div').addClass(CSS_HOTSPOT_BOX);

        if (boxContent) {
            this.isBoxContent = true;
            const wrapper = $J.$new('div').addClass(CSS_HOTSPOT_WRAPPER)
                .append(
                    $J.$new('div')
                        .addEvent(['btnclick', 'tap'], (e) => {
                            if (this.boxState !== STATES.VISIBLE) {
                                e.stop();
                                this.hideBox(true);
                            }
                        })
                        .addClass(CSS_HOTSPOT_BUTTON_CLOSE)
                );

            const content = $J.$new('div').addClass(CSS_HOTSPOT_CONTENT)
                .changeContent(boxContent + '')
                .addEvent('click', (e) => { e.stopDistribution(); });

            wrapper.append(content);
            this.box.append(wrapper);
        }

        this.box.setCss({
            top: '-10000px',
            left: '-10000px',
            position: 'absolute',
            opacity: 0
        });
    }

    getBoxPosition(hotspotInfo) {
        const result = {
            top: 0,
            left: 0,
            transform: ''
        };

        if (hotspotInfo && hotspotInfo.box) {
            const boxX = hotspotInfo.box.x;
            const boxY = hotspotInfo.box.y;

            if (this.hotspotSettings.box.fixed) {
                const boxBoundaries = this.container.rect;

                result.position = 'absolute';
                if ($J.$(this.boxContainer).tagName !== 'body') {
                    switch (boxY) {
                        case 'top':
                            result.top = 0;
                            break;
                        case 'bottom':
                            result.top = boxBoundaries.bottom - boxBoundaries.top;
                            result.transform += ' translateY(-100%)';
                            break;
                        case 'center':
                            result.top = (0 + (boxBoundaries.bottom - boxBoundaries.top)) / 2;
                            result.transform += ' translateY(-50%)';
                            break;
                        default:
                            result.top = 0 + (parseFloat(boxY) || 0);
                    }

                    switch (boxX) {
                        case 'left':
                            result.left = 0;
                            break;
                        case 'right':
                            result.left = boxBoundaries.right - boxBoundaries.left;
                            result.transform += ' translateX(-100%)';
                            break;
                        case 'center':
                            result.left = (boxBoundaries.right - boxBoundaries.left) / 2;
                            result.transform += ' translateX(-50%)';
                            break;
                        default:
                            result.left = boxBoundaries.left + (parseFloat(boxX) || 0);
                    }
                } else {
                    switch (boxY) {
                        case 'top':
                            result.top = boxBoundaries.top;
                            break;
                        case 'bottom':
                            result.top = boxBoundaries.bottom;
                            result.transform += ' translateY(-100%)';
                            break;
                        case 'center':
                            result.top = (boxBoundaries.top + boxBoundaries.bottom) / 2;
                            result.transform += ' translateY(-50%)';
                            break;
                        default:
                            result.top = boxBoundaries.top + (parseFloat(boxY) || 0);
                    }

                    switch (boxX) {
                        case 'left':
                            result.left = boxBoundaries.left;
                            break;
                        case 'right':
                            result.left = boxBoundaries.right;
                            result.transform += ' translateX(-100%)';
                            break;
                        case 'center':
                            result.left = (boxBoundaries.left + boxBoundaries.right) / 2;
                            result.transform += ' translateX(-50%)';
                            break;
                        default:
                            result.left = boxBoundaries.left + (parseFloat(boxX) || 0);
                    }
                }
            } else {
                const pointerXY = this.pointer.position;
                const scroll = $J.W.scroll;

                result.left = pointerXY.left - scroll.x + (parseFloat(boxX) || 0);
                result.top = pointerXY.top - scroll.y + (parseFloat(boxY) || 0);
            }
        }

        return result;
    }

    correctBoxPosition(position) {
        if (this.hotspotSettings.box && !this.hotspotSettings.box.fixed) {
            this.box.removeClass(CSS_HOTSPOT_BOX_OUT_OF_WIDTH);
            this.box.removeClass(CSS_HOTSPOT_BOX_OUT_OF_HEIGHT);

            const wSize = $J.W.size;
            if (this.baseBoxSize.width > wSize.width) {
                this.box.addClass(CSS_HOTSPOT_BOX_OUT_OF_WIDTH);
            } else if (position.left + this.baseBoxSize.width > wSize.width) {
                position.left = wSize.width - this.baseBoxSize.width;
            }

            if (this.baseBoxSize.height > wSize.height) {
                this.box.addClass(CSS_HOTSPOT_BOX_OUT_OF_HEIGHT);
            } else if (position.top + this.baseBoxSize.height > wSize.height) {
                position.top = wSize.height - this.baseBoxSize.height;
            }
        }

        return position;
    }

    setBoxPosition() {
        let boxCss = { transform: '' };
        boxCss = this.correctBoxPosition(this.getBoxPosition(this.hotspotSettings));

        this.box.setCssProp('position', '');
        this.box.setCss(boxCss);
        this.box.render();
    }

    showBox() {
        if (this.isActive || this.isDisabled) { return; }

        if (this.tooltip && this.tooltipState === STATES.AUTO) {
            this.tooltip.removeClass(CSS_HOTSPOT_TOOLTIP + '-visible');
        }

        this.box.setCss({ opacity: 0 });
        this.box.appendTo(this.boxContainer);
        this.setBaseBoxSize(this.box.size);

        this.setBoxPosition();

        this.box.setCss({ opacity: 1 });

        this.isActive = true;
        this.emit('hotspotActivate', {
            data: { hotspot: this }
        });
    }

    hideBox(fade) {
        if (this.isActive) {
            if (fade) {
                if (this.box) {
                    this.box.setCssProp('opacity', 0);
                }
                setTimeout(() => { this.hideBox(); }, 300);
                return this._id;
            }

            if (this.box) {
                this.box.remove();
            }

            this.isActive = false;
            this.emit('hotspotDeactivate', {
                data: { hotspot: this }
            });
        }
    }

    changeBoxContainer(container) {
        this.boxContainer = container ?? $J.D.node.body;
    }

    setBaseBoxSize(size, force) {
        if (size && force || !this.baseBoxSize) {
            this.baseBoxSize = { width: size.width, height: size.height };
        }
    }

    setHotspotSettings(settings) {
        for (const item in settings) {
            if ({}.hasOwnProperty.call(settings, item)) {
                this.hotspotSettings[item] = settings[item];
            }
        }
    }

    getHotspotSettings(settings) {
        return this.hotspotSettings;
    }

    setAspectRatio(x, y) {
        this.dX = x;
        this.dY = y;
    }

    setPointerPosition() {
        const hss = this.hotspotSettings;

        if (hss) {
            this.pointer.setCss({
                top: hss.pointerPositionPercentage.top ? hss.pointer.y : Math.ceil(hss.pointer.y * this.dY),
                left: hss.pointerPositionPercentage.left ? hss.pointer.x : Math.ceil(hss.pointer.x * this.dX)
            });
        }
    }

    showPointer() {
        if (this.hotspotSettings && !this.isDisabled) {
            this.pointer.addClass(CSS_HOTSPOT_DEFAULT);
            this.setPointerPosition();

            if (this.hotspotSettings.style || this.hotspotSettings.pointer.style) {
                let dataStyle = this.hotspotSettings.style;
                if (!dataStyle) {
                    dataStyle = this.hotspotSettings.pointer.style;
                }

                this.pointer.addClass(dataStyle);
            }

            if (!this.isPointerInDoc) {
                this.isPointerInDoc = true;
                this.pointer.appendTo(this.container);
            }
        } else {
            this.hidePointer();
        }
    }

    hidePointer() {
        if (this.isPointerInDoc) {
            this.isPointerInDoc = false;
            this.pointer.remove();
        }
    }

    isHotspotShown() {
        return this.isShown;
    }

    show() {
        if (!this.isDisabled && !this.isShown) {
            this.isShown = true;
            this.showPointer();

            if (this.boxState === STATES.SHOW) {
                this.showBox();
            }

            if (this.tooltipState === STATES.SHOW) {
                this.showTooltip();
            }
        }
    }

    hide() {
        if (this.isShown) {
            this.isShown = false;
            this.hideBox();
            this.hideTooltip();
            this.hidePointer();
        }
    }

    isEnabled() {
        return !this.isDisabled;
    }

    enable() {
        if (this.isDisabled) {
            this.isDisabled = false;
            // this.show();
        }
    }

    disable() {
        if (!this.isDisabled) {
            this.isDisabled = true;
            this.hide();
        }
    }

    hideTooltip() {
        if (this.isHovered) {
            this.isHovered = false;
            if (this.tooltip) {
                this.tooltip.removeClass(CSS_HOTSPOT_TOOLTIP + '-visible');
            }
        }
    }

    overridePointerEvent() {
        if (!this.isBoxAlwaysVisible() && !this.isTooltipAlwaysVisible()) {
            this.container.addClass(OVERWRITE_POINTER_EVENT);
        }
    }

    removeOverridePointerEvent() {
        this.container.removeClass(OVERWRITE_POINTER_EVENT);
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get boxSize() {
        return this.box?.size ?? { width: 0, height: 0 };
    }

    setState(settings, dontShow) { // For popup, tooltip, pointer - 1 - 'visible' | 0 - 'initial'
        if (this.boxState !== settings.popup) {
            this.boxState = settings.popup;
            if (settings.popup === STATES.VISIBLE) {
                if (!dontShow) {
                    this.showBox();
                }
            } else {
                this.hideBox();
            }
        }

        if (this.tooltipState !== settings.tooltip) {
            this.tooltipState = settings.tooltip;
            if (settings.tooltip === STATES.VISIBLE) {
                if (!dontShow) {
                    this.showTooltip();
                }
            } else {
                this.hideTooltip();
            }
        }
    }

    rewriteAttrPointer(attr) {
        this.pointer.attr('data-spot-id', attr || this._id);
    }

    getHotspotPointer() {
        return this.pointer;
    }

    destroy() {
        this.hideBox();
        this.hideTooltip();
        this.hotspotData = null;
        this.container = null;

        this._id = null;

        this.pointer.clearEvents();
        if (this.tooltip) {
            this.tooltip.clearEvents();
        }

        this.pointer.remove();

        this.box = null;
        this.boxContainer = null;
        this.baseBoxSize = null;
        this.tooltip = null;
        this.version = null;
        this.pointer = null;
        this.hotspotSettings = null;

        this.isActive = false;
        this.isDisabled = false;
        this.isPointerInDoc = false;
        this.isHovered = false;

        super.destroy();
    }
}

return Hotspot;

    }
);

Sirv.define(
    'Hotspots',
    ['bHelpers','magicJS','globalFunctions','EventEmitter','Hotspot','helper'],
    (bHelpers,magicJS,globalFunctions,EventEmitter,Hotspot,helper) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global Hotspot */
/* global EventEmitter */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Hotspots" }] */

class Hotspots extends EventEmitter {
    constructor() {
        super();

        this.container = $J.$new('div').addClass('sirv-hotspot-container');
        this.hotspots = [];
        this.activeHotspots = [];
        this.hoveredHotspots = [];
        this._originImageSize = { width: 0, height: 0 };
        this._instanceComponentNode = null;

        this.api = {
            add: this.addHotspot.bind(this),
            remove: this.removeHotspot.bind(this),
            removeAll: this.removeAllHotspots.bind(this),
            list: () => { return this.hotspots.map(hs => hs.getHotspotPointer()); },
            setVisibility: this.setStateById.bind(this),
            enable: this.enable.bind(this),
            disable: this.disable.bind(this)
        };

        this.addEvents();
    }

    /**
     * @param {{ width: number; height: number; }} size
     */
    set originImageSize(size) {
        this._originImageSize = {
            width: size.width,
            height: size.height
        };
    }

    appendTo(container) {
        this.container.appendTo(container);
    }

    set instanceComponentNode(instance) {
        if (!this.hotspots.length) {
            this._instanceComponentNode = instance;
        }
    }

    /**
     * @param {{ top: number; left: number; width: number; height: number; }} nostNodeBoundingClientRect
     */
    // set containerSize(nostNodeBoundingClientRect) {
    set containerSize(instNodeBoundingClientRect) {
        // const componentSize = this.container.node.parentNode.getBoundingClientRect();
        if (!this.hotspots.length || !instNodeBoundingClientRect) {
            return;
        }

        const componentSize = this.getRightBoundengClientRect();

        this.container.setCss({
            top: instNodeBoundingClientRect.top - componentSize.top,
            left: instNodeBoundingClientRect.left - componentSize.left,
            width: ((instNodeBoundingClientRect.width * 100) / componentSize.width) + '%',
            height: ((instNodeBoundingClientRect.height * 100) / componentSize.height) + '%'
        });

        const size = this.container.size;
        const dx = size.width / this._originImageSize.width;
        const dy = size.height / this._originImageSize.height;
        this.hotspots.forEach(hs => hs.setAspectRatio(dx, dy));
    }

    getActiveHotspot(id) {
        return this.activeHotspots.filter(hs => hs.id === id)[0] || null;
    }

    getHoveredHotspots(id) {
        return this.hoveredHotspots.filter(hs => hs.id === id)[0] || null;
    }

    addEvents() {
        this.on('hotspotActivate', (e) => {
            const activeHotspot = this.getActiveHotspot(e.data.hotspot.id);
            if (!activeHotspot) {
                e.stopEmptyEvent();
                this.activeHotspots.forEach((hs) => {
                    if (!hs.isBoxAlwaysVisible()) {
                        hs.hideBox(true);
                    }
                });

                this.activeHotspots.push(e.data.hotspot);
                this.activeHotspots[this.activeHotspots.length - 1].overridePointerEvent();
                e.data.id = e.data.hotspot.id;
                delete e.data.hotspot;
            }
        });

        this.on('hotspotDeactivate', (e) => {
            e.stopEmptyEvent();
            const activeHotspot = this.getActiveHotspot(e.data.hotspot.id);
            if (activeHotspot) {
                activeHotspot.removeOverridePointerEvent();
                this.activeHotspots = this.activeHotspots.filter(hs => hs.id !== activeHotspot.id);
            }
            e.data.id = e.data.hotspot.id;
            delete e.data.hotspot;
        });

        this.on('hotspotHovered', (e) => {
            const hoveredHotspot = this.getHoveredHotspots(e.data.hotspot.id);
            if (!hoveredHotspot) {
                e.stopAll();
                this.hoveredHotspots.push(e.data.hotspot);
            }
        });

        this.on('hotspotLeft', (e) => {
            e.stopAll();

            const hoveredHotspot = this.getHoveredHotspots(e.data.hotspot.id);
            if (hoveredHotspot) {
                this.hoveredHotspots = this.hoveredHotspots.filter(hs => hs.id !== hoveredHotspot.id);
            }
        });

        this.clickFn = (e) => {
            this.activeHotspots.forEach((hs) => {
                if (!hs.isBoxAlwaysVisible()) {
                    hs.hideBox(true);
                }
            });

            this.hoveredHotspots.forEach((hs) => {
                if (!hs.isTooltipAlwaysVisible()) {
                    hs.hideTooltip(true);
                }
            });
        };

        $($J.D).addEvent('click', this.clickFn);
    }

    isHotspotActivated() {
        return this.activeHotspots.length > 0;
    }

    createHotspots(hotspotsData) {
        if (hotspotsData && hotspotsData.length) {
            hotspotsData.forEach((data) => {
                this.createHotspot(data, this.hotspots.length);
            });
        }
    }

    createHotspot(hotspotData, index) {
        const hotspot = new Hotspot(this.container, hotspotData, index);
        hotspot.parentClass = this;
        this.hotspots.push(hotspot);
    }

    addHotspot(hotspotsData) {
        if (!Array.isArray(hotspotsData)) {
            hotspotsData = [hotspotsData];
        }

        this.createHotspots(hotspotsData, this.hotspots.length);
    }

    getRightBoundengClientRect(hotspotsContainer) {
        if (!this.hotspots.length) {
            return this._instanceComponentNode ? this._instanceComponentNode.node.getBoundingClientRect() : hotspotsContainer.node.getBoundingClientRect();
        }

        return this.container.node.parentNode.getBoundingClientRect();
    }

    changeBoxContainerParent(inside) {
        const c = inside ? this.container : null;
        this.hotspots.forEach((hotspot) => {
            hotspot.changeBoxContainer(c);
        });
    }

    hideActiveHotspotBox(flag) {
        const result = this.activeHotspots.length || this.hoveredHotspots.length;

        this.activeHotspots.forEach((hs) => { hs.hideBox(flag); });
        this.hoveredHotspots.forEach((hs) => { hs.hideTooltip(); });

        return result;
    }

    show(index) {
        const hs = this.hotspots[index];
        if (hs) {
            hs.show();
        }
    }

    showAll() {
        this.hotspots.forEach((hotspot) => {
            hotspot.show();
        });
    }

    hide(index) {
        const hs = this.hotspots[index];
        if (hs) {
            hs.hide();
        }
    }

    hideAll() {
        this.hotspots.forEach((hotspot) => {
            hotspot.hide();
        });
    }

    enable(index) {
        const hs = this.hotspots[index];
        if (hs) {
            hs.enable();
            hs.show();
        }
    }

    disable(index) {
        if (this.hotspots[index]) {
            this.hotspots[index].disable();
        }
    }

    enableAll() {
        this.hotspots.forEach((hotspot) => {
            hotspot.enable();
            hotspot.show();
        });
    }

    disableAll() {
        this.hotspots.forEach((hotspot) => {
            hotspot.disable();
        });
    }

    showNeededElements() {
        this.hotspots.forEach((hs) => {
            if (hs.isEnabled() && hs.isHotspotShown()) {
                if (hs.isBoxAlwaysVisible()) {
                    if (hs.isBoxActivated()) {
                        hs.setBoxPosition();
                    }
                    hs.showBox();
                }

                if (hs.isTooltipAlwaysVisible()) {
                    if (hs.isTooltipHovered()) {
                        hs.setTooltipPosition();
                    }
                    hs.showTooltip();
                }
            }
        });
    }

    removeHotspot(index) {
        const hs = this.hotspots[index];
        if (hs) {
            hs.disable();
            hs.destroy();
            this.removeByIndex(index);

            if (!this.hotspots.length) {
                this.container.remove();
            }
        }
    }

    removeAllHotspots() {
        for (let i = this.hotspots.length - 1; i >= 0; i--) {
            this.removeHotspot(i);
        }
    }

    removeByIndex(index) {
        this.hotspots.splice(index, 1);

        if ((this.hotspots.length > 0 && index === 0) || (index > 0 && index <= this.hotspots.length - 1)) {
            this.rewriteHotspotIndex(index);
        }
    }

    rewriteHotspotIndex(startIndex) {
        for (let index = startIndex, l = this.hotspots.length; index < l; index++) {
            this.hotspots[index].id = index;
            this.hotspots[index].rewriteAttrPointer();
        }
    }

    setStateById(index, settings) {
        if (this.hotspots[index]) {
            this.hotspots[index].setState(settings);
        }
    }

    destroy() {
        $($J.D).removeEvent('click', this.clickFn);

        this.hotspots.forEach((hotspot) => {
            hotspot.destroy();
        });

        this.container = null;
        this.activeHotspots = [];
        this.hoveredHotspots = [];

        this._instanceComponentNode = null;

        this.off('hotspotActivate');
        this.off('hotspotDeactivate');
        this.off('hotspotHovered');
        this.off('hotspotLeft');
        this.hotspots = [];
        super.destroy();
    }
}

return Hotspots;

    }
);

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
