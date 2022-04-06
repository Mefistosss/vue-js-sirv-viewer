Sirv.define(
    'ProductDetail',
    ['bHelpers','magicJS','globalFunctions','helper','Description'],
    (bHelpers,magicJS,globalFunctions,helper,Description) => {
        const moduleName = 'ProductDetail';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
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

        this.options = $J.extend({
            position: 'top'
        }, options || {});

        this.mainContainer = contaner;
        this.fullscreenBoxContainer = fullscreenContainer;
        this.currentSide = this.options.position;

        this.productDetail = $J.$new('div');

        this.init();
    }

    init() {
        super.init();
        this.productDetail.append(this.getContainer());
    }

    setupClasses() {
        this.fullscreenBoxContainer.addClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
        this.productDetail.addClass(CSS_PRODUCT_DETAILS);
        this.fullscreenBoxContainer.append(this.productDetail);
    }

    open() {
        this.setupClasses();
    }

    close() {
        this.fullscreenBoxContainer.removeClass(CSS_PRODUCT_DETAILS_FULLSCREENBOX + this.currentSide);
        this.productDetail.removeClass(CSS_PRODUCT_DETAILS);
        this.fullscreenBoxContainer.remove(this.productDetail);
    }

    destroy() {
        super.destroy();

        this.mainContainer = null;
        this.currentSide = null;
        this.productDetail = null;
        this.fullscreenBoxContainer = null;
    }
}

return DescriptionProductDetail;

    }
);
