Sirv.define(
    'Hotspots',
    ['bHelpers','magicJS','globalFunctions','EventEmitter','Hotspot','helper','Promise!'],
    (bHelpers,magicJS,globalFunctions,EventEmitter,Hotspot,helper,Promise) => {
        const moduleName = 'Hotspots';
        
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
        this.originImageSize = { width: 0, height: 0 };
        this.instanceComponentNode = null;

        this.api = {
            add: this.addHotspot.bind(this),
            remove: this.removeHotspot.bind(this),
            removeAll: this.removeAllHotspots.bind(this),
            list: this.getPointerNodeHotspots.bind(this),
            setVisibility: this.setStateById.bind(this),
            enable: this.enable.bind(this),
            disable: this.disable.bind(this)
        };

        this.setEvents();
    }

    setOriginImageSize(width, height) {
        this.originImageSize = {
            width: width,
            height: height
        };
    }

    appendTo(container) {
        this.container.appendTo(container);
    }

    setInstanceComponentNode(instance) {
        this.instanceComponentNode = instance;
    }

    setContainerSize(instNodeBoundingClientRect) {
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

        const size = this.container.getSize();
        const dx = size.width / this.originImageSize.width;
        const dy = size.height / this.originImageSize.height;
        this.hotspots.forEach(hs => hs.setAspectRatio(dx, dy));
    }

    getActiveHotspot(id) {
        return this.activeHotspots.filter(hs => hs.id === id)[0] || null;
    }

    getHoveredHotspots(id) {
        return this.hoveredHotspots.filter(hs => hs.id === id)[0] || null;
    }

    setEvents() {
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
        hotspot.setParent(this);
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
            return this.instanceComponentNode ? this.instanceComponentNode.node.getBoundingClientRect() : hotspotsContainer.node.getBoundingClientRect();
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

    getHotspots() {
        return this.hotspots;
    }

    getPointerNodeHotspots() {
        const pointers = [];

        this.hotspots.forEach((hotspot) => {
            pointers.push(hotspot.getHotspotPointer());
        });

        return pointers;
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
            this.hotspots[index].setId(index);
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

        this.instanceComponentNode = null;

        this.off('hotspotActivate');
        this.off('hotspotDeactivate');
        this.off('hotspotHovered');
        this.off('hotspotLeft');
        this.hotspots = null;
        super.destroy();
    }
}

return Hotspots;

    }
);
