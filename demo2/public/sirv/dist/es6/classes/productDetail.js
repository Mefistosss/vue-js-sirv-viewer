Sirv.define(
    'ProductDetail',
    ['bHelpers','magicJS','globalFunctions','helper','Description'],
    (bHelpers,magicJS,globalFunctions,helper,Description) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global Description */
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint class-methods-use-this: ["off", { "createLink": ["error"] }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "DescriptionProductDetail" }] */

const CSS_PRODUCT_DETAILS = 'PREFIX-product-details';
const CSS_PRODUCT_DETAILS_FULLSCREENBOX = 'PREFIX-fullscreen-box-product-details-';

class DescriptionProductDetail extends Description {
    constructor(options, contaner, fullscreenContainer) {
        super({ text: options.text });

        this.options = Object.assign({
            position: 'top'
        }, options || {});

        this._mainContainer = contaner;
        this._fullscreenBoxContainer = fullscreenContainer;
        this.currentSide = this.options.position;

        this.productDetail = $J.$new('div');

        this.init();
    }

    init() {
        super.init();
        this.productDetail.append(this.container);
    }

    setupClasses() {
        this._fullscreenBoxContainer.addClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
        this.productDetail.addClass(CSS_PRODUCT_DETAILS);
        this._fullscreenBoxContainer.append(this.productDetail);
    }

    open() {
        this.setupClasses();
    }

    close() {
        this._fullscreenBoxContainer.removeClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
        this.productDetail.removeClass(CSS_PRODUCT_DETAILS);
        this._fullscreenBoxContainer.remove(this.productDetail);
    }

    changeSide(side) {
        if (side !== this.currentSide) {
            this._fullscreenBoxContainer.removeClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
            this.currentSide = side;
            this._fullscreenBoxContainer.addClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
        }
    }

    set mainContainer(container) {
        this._mainContainer = container;
    }

    get mainContainer() {
        return this._mainContainer;
    }

    set fullscreenBoxContainer(container) {
        this._fullscreenBoxContainer = container;
    }

    get fullscreenBoxContainer() {
        return this._fullscreenBoxContainer;
    }

    show() {
        super.show(this.productDetail);
    }

    hide() {
        super.hide(this.productDetail);
    }

    destroy() {
        super.destroy();

        this._mainContainer = null;
        this.currentSide = null;
        this.productDetail = null;
        this.fullscreenBoxContainer = null;
    }
}

return DescriptionProductDetail;

    }
);
