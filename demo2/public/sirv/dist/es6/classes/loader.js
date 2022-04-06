Sirv.define(
    'Loader',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','EventEmitter'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,EventEmitter) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global EventEmitter */
/* global $J */
/* global $ */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint dot-notation: ["error", { "allowKeywords": false }]*/


// eslint-disable-next-line no-unused-vars
class Loader extends EventEmitter {
    constructor(parent, options) {
        super();
        this.parentNode = $(parent);
        this.options = Object.assign({
            width: null,
            height: null,
            'class': null
        }, options || {});

        this.node = $J.$new('div').addClass('PREFIX-loader');

        this.type = 'simple';
        this.inDoc = false;

        if (this.options['class']) {
            this.node.addClass(this.options['class']);
        }

        if (this.options.width) {
            this.node.setCssProp('width', this.options.width);
        }

        if (this.options.height) {
            this.node.setCssProp('height', this.options.height);
        }
    }

    append() {
        if (!this.inDoc) {
            this.inDoc = true;
            this.parentNode.append(this.node);
        }
    }

    show() {
        this.append();
        this.node.setCss({ display: '', visibility: 'visible' });
    }

    hide() {
        this.node.setCss({ display: 'none', visibility: 'hidden' });
    }

    destroy() {
        this.hide();
        this.node.remove();
        this.node = null;
        this.inDoc = false;
        super.destroy();
    }
}

return Loader;

    }
);
