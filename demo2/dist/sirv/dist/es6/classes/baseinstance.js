Sirv.define(
    'BaseInstance',
    ['bHelpers','magicJS','EventEmitter','helper'],
    (bHelpers,magicJS,EventEmitter,helper) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* eslint-disable indent */
/* global EventEmitter, helper */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const DEFAULT_PREFIX = 'PREFIX-';

class BaseInstance extends EventEmitter {
    constructor(node, options, defaultSchema) {
        super();

        this.defaultSchema = defaultSchema;
        this._options = options;
        this.instanceNode = $(node);
        this.instanceUrl = this.instanceNode.attr('data-src') || this.instanceNode.attr('src') || this.instanceNode.attr('data-bg-src');
        this.option = null;
        this.ready = false;
        this.id = null;
        this.isCustomId = false;
        this.isStartedFullInit = false;
        this.isStarted = false;
        this.destroyed = false;
        this.referrerPolicy = this.instanceNode.attr('data-referrerpolicy') || this.instanceNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
        this.instanceOptions = this.makeOptions();
        this.createOptionFunction();

        const this_ = this;
        this.api = {
            isReady: () => { return this_.ready; },
            resize: this_.resize,
            getOptions: this_.options
        };
    }

    setOptions(optInstance, common, local, attr) {
        optInstance.fromJSON(common);
        optInstance.fromString(local);
        optInstance.fromString(attr);

        return optInstance;
    }

    makeGlobalOptions(optionsInstance) {
        const o = this._options.options;
        return this.setOptions(optionsInstance, o.common.common, o.local.common, this.instanceNode.attr('data-options') || '');
    }

    makeMobileOptions(optionsInstance) {
        const o = this._options.options;
        return this.setOptions(optionsInstance, o.common.mobile, o.local.mobile, this.instanceNode.attr('data-mobile-options') || '');
    }

    makeOptions() {
        let options = new $J.Options(this.defaultSchema);

        options = this.makeGlobalOptions(options);
        if ($J.browser.touchScreen && $J.browser.mobile) {
            options = this.makeMobileOptions(options);
        }

        return options;
    }

    getOptionsForStartFullInit(options) {
        if (options) {
            this._options.options = options;
            this.instanceOptions = this.makeOptions();
            this.createOptionFunction();
        }
    }

    get options() {
        return this.instanceOptions.getJSON();
    }

    resize() {
        if (this.ready) {
            return this.onResize();
        }

        return false;
    }

    onResize() { return true; }

    get imageClassContainer() {
        return {};
    }

    checkImage(setts, dontLoad) {
        let result;
        const imageClass = this.imageClassContainer;
        if (dontLoad) {
            result = imageClass.isExist(setts); // because we do not load images with imageclass
        } else {
            result = imageClass.isLoaded(setts);
        }

        return result;
    }

    getId(idPrefix, df) {
        this.id = this.instanceNode.attr('id');

        if (!this.id) {
            this.isCustomId = true;
            if (!idPrefix) { idPrefix = 'component-'; }
            if (!df) { df = DEFAULT_PREFIX; }
            this.id = df + idPrefix + helper.generateUUID();
            this.id = this.id.trim();
            this.instanceNode.attr('id', this.id);
        }
    }

    createOptionFunction() {
        this.option = (...args) => {
            if (args.length > 1) {
                return this.instanceOptions.set(args[0], args[1]);
            }

            return this.instanceOptions.get(args[0]);
        };
    }

    startFullInit(options) {
        if (this.destroyed || this.isStartedFullInit) { return; }
        this.isStartedFullInit = true;
        this.getOptionsForStartFullInit(options);
    }

    get originImageUrl() { return null; }

    // instance 'start' metod rename to 'run'
    run() {
        if (!this.isStarted) {
            this.isStarted = true;
            return true;
        }

        return false;
    }

    done() {
        this.ready = true;
    }

    destroy() {
        this.destroyed = true;
        this.isStarted = false;
        this.ready = false;
        this.isStartedFullInit = false;

        if (this.isCustomId) {
            this.instanceNode.removeAttr('id');
            this.isCustomId = false;
        }

        this.instanceNode = null;

        super.destroy();
    }
}

return BaseInstance;

    }
);
