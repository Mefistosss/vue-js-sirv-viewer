Sirv.define(
    'Zoominstance',
    ['bHelpers','magicJS','HotspotInstance','ImageZoom'],
    (bHelpers,magicJS,HotspotInstance,ImageZoom) => {
        const moduleName = 'Zoominstance';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* eslint-disable indent */
/* global HotspotInstance */
/* global ImageZoom */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


// eslint-disable-next-line no-unused-vars
class ZoomInstance extends HotspotInstance {
    constructor(node, options, defaultSchema) {
        super(node, options, defaultSchema);
        this.zoom = null;
        this.upscale = false;
        this.defaultZoomOptions = {};
        // this.zoomContainer = options.lensContainer;
        this.zoomContainer = this.instanceNode;
        this.zoomClassName = 'PREFIX-zoomed-in';

        this.api = $J.extend(this.api, {
            zoomIn: this.zoomIn.bind(this),
            zoomOut: this.zoomOut.bind(this),
            isZoomed: this.isZoomed.bind(this), // new
        });
    }

    setDefaultZoomOptions() {
        this.defaultZoomOptions = {
            test: false,
            upscale: this.upscale,
            smoothing: true
        };
    }

    createZoom(zoomNode, options) {
        if (!this.destroyed) {
            let zoomOptions = $J.extend({}, this.defaultZoomOptions);
            if (options) { zoomOptions = $J.extend(zoomOptions, options); }

            this.zoom = new ImageZoom(this.instanceNode, zoomOptions);
            this.zoom.setParent(this);

            return zoomOptions;
        }

        return null;
    }

    onZoomGetImage(e) {
        e.data.exactSize = true;
        e.data.maxSize = false;
        e.data.round = false;

        e.data.callbackData = {
            lens: true,
            indexX: e.data.indexX,
            indexY: e.data.indexY,
            level: e.data.level,
            number: e.data.number,
            map: e.data.map
        };
    }

    onZoomCancelLoadingOfTiles(e) {
        if (!e.data.callbackData) { e.data.callbackData = {}; }
        e.data.callbackData.lens = true;
    }

    onZoomBeforeShow(e) {}
    onZoomShown(e) {}
    onZoomHidden(e) {}

    setZoomEvents() {
        if (!this.zoom) { return; }

        this.on('zoomGetImage', (e) => {
            e.stopAll();
            this.onZoomGetImage(e);
        });

        this.on('zoomCancelLoadingOfTiles', (e) => {
            e.stopAll();
            this.onZoomCancelLoadingOfTiles(e);
        });

        this.on('zoomBeforeShow', (e) => {
            e.stopAll();
            this.onZoomBeforeShow(e);
        });

        this.on('zoomShown', (e) => {
            e.stopAll();
            this.onZoomShown(e);
        });

        this.on('zoomHidden', (e) => {
            e.stopAll();
            this.onZoomHidden(e);
        });
    }

    zoomIn() {
        if (this._isReady) {
            return true;
        }

        return false;
    }

    zoomOut() {
        if (this._isReady) {
            return true;
        }

        return false;
    }

    /**
     * Current zoom level from 0.00 to 1.00
     * 0.00 - size of base image is equal size of zoom image
     * 1.00 - max zoom
     */
    getZoomData() {
        if (this._isReady && this.zoom) {
            return this.zoom.getZoomData();
        }

        return 0;
    }

    // isZoomShown => isZoomed
    isZoomed() {
        if (this._isReady && this.zoom) {
            return this.zoom.isShown() || this.zoom.isShowing();
        }

        return false;
    }

    isZoomSizeExist() {
        return false;
    }

    clearZoom() {
        if (this.zoom) {
            this.off('zoomGetImage');
            this.off('zoomCancelLoadingOfTiles');
            this.off('zoomBeforeShow');
            this.off('zoomShown');
            this.off('zoomHidden');

            this.zoom.destroy();
            this.zoom = null;
        }
    }

    destroy() {
        this.clearZoom();
        super.destroy();
    }
}

return ZoomInstance;

    }
);
