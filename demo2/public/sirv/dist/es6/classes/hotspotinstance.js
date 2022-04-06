Sirv.define(
    'HotspotInstance',
    ['bHelpers','magicJS','Instance'],
    (bHelpers,magicJS,Instance) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* eslint-disable indent */
/* global Instance */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint no-console: ["error", { allow: ["warn"] }] */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

const warn = (v1, v2) => {
    console.warn('sirv.js: The ' + v1 + ' method is deprecated and will be removed. \r\n           Use ' + v2 + ' instead.');
};

// eslint-disable-next-line no-unused-vars
class HotspotInstance extends Instance {
    constructor(node, options, defaultSchema) {
        super(node, options, defaultSchema);

        // this variable is usin in spin, zoom and image component
        this.hotspots = null;

        // API
        const this_ = this;
        this.api = Object.assign(this.api, {
            addHotspot: (hotspotsData) => {
                warn('.addHotspot()', '.hotspots.add()');
                this_.hotspots.api.add(hotspotsData);
                if (this_.isInView && this_.isSlideShown) {
                    this_.hotspots.showNeededElements();
                }
            },
            removeHotspot: (index) => {
                warn('.removeHotspot()', '.hotspots.remove()');
                this_.hotspots.api.remove(index);
            },
            removeAllHotspots: () => {
                warn('.removeAllHotspots()', '.hotspots.removeAll()');
                this_.hotspots.api.removeAll();
            },
            getHotspots: () => {
                warn('.getHotspots()', '.hotspots.list()');
                return this_.hotspots.api.list();
            }
        });
    }

    createHotspotsClass(HotspotsClass, hotspotOptions) {
        this.hotspots = new HotspotsClass(hotspotOptions);
        this.hotspots.parentClass = this;

        this.on('hotspotActivate', (e) => {
            e.stopAll();
            this.onHotspotActivate(e.data);
            this.sendEvent('hotspotOpened');
        });

        this.on('hotspotDeactivate', (e) => {
            e.stopAll();
            this.onHotspotDeactivate(e.data);
            this.sendEvent('hotspotClosed');
        });

        this.api = Object.assign(this.api, { hotspots: this.hotspots.api });

        const this_ = this;
        this.api.hotspots.add = (hsData) => {
            if (hsData) {
                let clientRect = null;
                if (!this_.hotspots.api.list().length) {
                    const parentContainer = this.getParentContainer();
                    clientRect = this_.hotspots.getRightBoundengClientRect(this.getContainerForBoundengClientRect());
                    this_.hotspots.appendTo(parentContainer);
                }

                this_.hotspots.addHotspot(hsData);
                this_.hotspots.containerSize = clientRect;

                this_.hotspots.showAll();
                if (this_.isInView && this_.isSlideShown) {
                    this_.hotspots.showNeededElements();
                }
            }
        };
    }

    getContainerForBoundengClientRect() {
        return this.getParentContainer();
    }

    done() {
        if (!this.ready && !this.destroyed && this.hotspots) {
            let parentContainer = this.instanceNode;
            if (parentContainer.tagName === 'img') {
                parentContainer = $(parentContainer.node.parentNode);
            }

            this.hotspots.appendTo(parentContainer);
            this.hotspots.createHotspots(this.hotspotsData);
            if (this.nativeFullscreen) {
                this.hotspots.changeBoxContainerParent(true);
            }
            this.hotspots.showAll();
        }

        super.done();
    }

    getParentContainer() {
        let parentContainer = this.instanceNode;
        if (parentContainer.tagName === 'img') {
            parentContainer = $(parentContainer.node.parentNode);
        }

        return parentContainer;
    }

    onHotspotActivate(data) {}
    onHotspotDeactivate(data) {}

    onStartActions() {
        if (this.hotspots && this.isInView && this.isSlideShown) {
            this.hotspots.showNeededElements();
        }

        super.onStartActions();
    }

    onStopActions() {
        if (this.hotspots) {
            this.hotspots.hideActiveHotspotBox(true);
        }

        super.onStopActions();
    }

    onBeforeFullscreenIn(data) {
        if (this.hotspots) {
            this.hotspots.hideActiveHotspotBox();
            if (this.nativeFullscreen) {
                this.hotspots.changeBoxContainerParent(true);
            }
        }
    }

    onBeforeFullscreenOut(data) {
        if (this.hotspots) {
            this.hotspots.hideActiveHotspotBox();
            if (this.nativeFullscreen) {
                this.hotspots.changeBoxContainerParent();
            }
        }
    }

    onAfterFullscreenOut(data) {
        if (this.hotspots && this.isInView && this.isSlideShown) {
            this.hotspots.showNeededElements();
        }
    }

    destroy() {
        if (this.hotspots) {
            this.hotspots.destroy();
        }
        this.hotspots = null;

        this.off('hotspotActivate');
        this.off('hotspotDeactivate');

        super.destroy();
    }
}

return HotspotInstance;

    }
);
