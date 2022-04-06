Sirv.define(
    'Hotspot',
    ['bHelpers','globalFunctions','magicJS','EventEmitter','helper','Promise!'],
    (bHelpers,globalFunctions,magicJS,EventEmitter,helper,Promise) => {
        const moduleName = 'Hotspot';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
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
        this.id = index;

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
        this.setEvents();
        this.createBox();
    }

    setVersion() {
        if (this.hotspotData.style || this.hotspotData.tooltip || this.hotspotData.box && this.hotspotData.box.content) {
            this.version = 2;
        }
    }

    parseHotspotData() {
        helper.objEach(this.hotspotData, (key) => {
            this.hotspotSettings[key] = this.hotspotData[key];
        });

        this.hotspotSettings.pointerPositionPercentage = {
            top: helper.isPercentage('' + this.hotspotSettings.pointer.y),
            left: helper.isPercentage('' + this.hotspotSettings.pointer.x)
        };
    }

    createBlocks() {
        this.pointer = $J.$new('div').addClass(CSS_HOTSPOT_POINTER).attr('data-spot-id', this.id);
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
            let pointerXY = this.pointer.getRect();
            const cssTooltip = { top: 0, left: 0 };

            cssTooltip.top = this.hotspotSettings.tooltip.style ? pointerXY.top : pointerXY.bottom;
            cssTooltip.left = this.hotspotSettings.tooltip.style ? (pointerXY.left + pointerXY.right) / 2 : pointerXY.right


            if ($J.$(this.boxContainer).getTagName() !== 'body') {
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

    setEvents() {
        this.pointer.addEvent('click mousedown', (e) => { e.stop(); });

        this.pointer.addEvent('btnclick tap', (e) => {
            if (e.getButton() === 3) { return true; }
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
                        .addEvent('btnclick tap', (e) => {
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
                const boxBoundaries = this.container.getRect();

                result.position = 'absolute';
                if ($J.$(this.boxContainer).getTagName() !== 'body') {
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
                const pointerXY = this.pointer.getPosition();
                const scroll = $J.W.getScroll();

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

            const wSize = $J.W.getSize();
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
        this.box.setCss(boxCss).getSize();
    }

    showBox() {
        if (this.isActive || this.isDisabled) { return; }

        if (this.tooltip && this.tooltipState === STATES.AUTO) {
            this.tooltip.removeClass(CSS_HOTSPOT_TOOLTIP + '-visible');
        }

        this.box.setCss({ opacity: 0 });
        this.box.appendTo(this.boxContainer);
        this.setBaseBoxSize(this.box.getSize());

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
                return this.id;
            }
            if (this.box) {
                this.box.remove();
            }

            this.isActive = false;
            this.emit('hotspotDeactivate', {
                data: { hotspot: this }
            });
        }

        return this.id;
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

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
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
        const attribute = attr || this.id;
        this.pointer.attr('data-spot-id', attribute);
    }

    getHotspotPointer() {
        return this.pointer;
    }

    destroy() {
        this.hideBox();
        this.hideTooltip();
        this.hotspotData = null;
        this.container = null;

        this.id = null;

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
