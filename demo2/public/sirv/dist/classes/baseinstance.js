Sirv.define(
    'BaseInstance',
    ['bHelpers','magicJS','EventEmitter','helper'],
    (bHelpers,magicJS,EventEmitter,helper) => {
        const moduleName = 'BaseInstance';
        
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
        this.options = options;
        this.instanceNode = $(node);
        this.instanceUrl = this.instanceNode.attr('data-src') || this.instanceNode.attr('src') || this.instanceNode.attr('data-bg-src');
        this.option = null;
        this._isReady = false;
        this.id = null;
        this.isCustomId = false;
        this.isStartedFullInit = false;
        this.isStarted = false;
        this.destroyed = false;
        this.referrerPolicy = this.instanceNode.attr('data-referrerpolicy') || this.instanceNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
        this.instanceOptions = this.makeOptions();
        this.createOptionFunction();

        this.api = {
            isReady: this.isReady.bind(this),
            resize: this.resize.bind(this),
            getOptions: this.getOptions.bind(this)
        };
    }

    setOptions(optInstance, common, local, attr) {
        optInstance.fromJSON(common);
        optInstance.fromString(local);
        optInstance.fromString(attr);

        return optInstance;
    }

    makeGlobalOptions(optionsInstance) {
        const o = this.options.options;
        return this.setOptions(optionsInstance, o.common.common, o.local.common, this.instanceNode.attr('data-options') || '');
    }

    makeMobileOptions(optionsInstance) {
        const o = this.options.options;
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
            this.options.options = options;
            this.instanceOptions = this.makeOptions();
            this.createOptionFunction();
        }
    }

    isReady() {
        return this._isReady;
    }

    getOptions() {
        return this.instanceOptions.getJSON();
    }

    resize() {
        if (this._isReady) {
            return this.onResize();
        }

        return false;
    }

    onResize() { return true; }

    getImageClassContainer() {
        return {};
    }

    checkImage(setts, dontLoad) {
        let result;
        const imageClass = this.getImageClassContainer();
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

    getOriginImageUrl() {}

    // instance 'start' metod rename to 'run'
    run() {
        if (!this.isStarted) {
            this.isStarted = true;
            return true;
        }

        return false;
    }

    done() {
        this._isReady = true;
    }

    destroy() {
        this.destroyed = true;
        this.isStarted = false;
        this._isReady = false;
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
