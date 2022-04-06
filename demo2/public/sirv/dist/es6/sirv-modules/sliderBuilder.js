Sirv.define(
    'SliderBuilder',
    ['bHelpers','magicJS','EventEmitter','helper','globalVariables','globalFunctions'],
    (bHelpers,magicJS,EventEmitter,helper,globalVariables,globalFunctions) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global $J, helper, Promise */
/* eslint-disable no-extra-semi */
/* eslint-disable no-unused-vars */
/* eslint class-methods-use-this: ["error", {"exceptMethods": ["loadData"]}] */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

const SLIDER_BUILDER_CONF_VER = 1;

const getInfoUrl = (url, callbackName) => {
    return url + ($J.stringHas(url, '?') ? '&' : '?') + 'nometa&info=' + callbackName;
};

class SliderBuilder {
    constructor(sirvOption, node) {
        this.mainNode = $(node);
        this.sirvOptions = helper.deepExtend({}, sirvOption || {});

        this.nodes = [];
        this.configURL = null;
        this.dataJSON = null;
        this.configHash = null;
        this.attrbMainNode = null;
        this.cfCallbackName = null;
        this.urlParams = null;
        this.componentsList = [];
        this.referrerPolicy = this.mainNode.attr('data-referrerpolicy') || this.mainNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
    }

    getOptions() {
        return new Promise((resolve, reject) => {
            if (this.checkNode()) {
                this.buildCallBackName();
                helper.getRemoteData(getInfoUrl(this.configURL, this.cfCallbackName), this.cfCallbackName, this.referrerPolicy)
                    .then((result) => {
                        if (result && result.assets) {
                            this.dataJSON = result;
                            this.buildOptions();
                            resolve({ 'dataOptions': this.sirvOptions });
                        } else {
                            let contentType = globalVariables.SLIDE.TYPES.IMAGE;

                            if (result.layers) {
                                contentType = globalVariables.SLIDE.TYPES.SPIN;
                            }

                            resolve({ 'content': contentType, 'dataOptions': this.sirvOptions });
                        }
                    }).catch((error) => {
                        error = this.configURL;
                        reject({ 'error': this.configURL, 'dataOptions': this.sirvOptions });
                    });
            } else {
                resolve({ 'dataOptions': this.sirvOptions });
            }
        });
    }

    buildViewer() {
        return new Promise((resolve, reject) => {
            if (this.dataJSON) {
                const parsedURL = /(^https?:\/\/[^/]*)([^#?]*)\/.*$/.exec(this.configURL);
                const pathname = this.dataJSON.dirname || parsedURL[2];

                this.prepareListComponents(this.dataJSON.assets, parsedURL[1], pathname);
                this.generateComponents();
                this.addAllComponents();
            }

            resolve({ 'mainNode': this.mainNode });
        });
    }

    prepareListComponents(listComponents, origin, folderPath) {
        listComponents.forEach((component) => {
            let path;
            const is3rd = /^(https?:)?\/\/[^/]/.test(component.name);

            if (is3rd) {
                path = component.name;
            } else if (/^\//.test(component.name)) {
                path = origin + component.name;
            } else {
                path = origin + folderPath + '/' + component.name;
            }

            this.componentsList.push({
                'path': is3rd ? path : globalFunctions.normalizeURL(path),
                'type': globalVariables.SLIDE.NAMES.indexOf(component.type),
                'is3rd': is3rd
            });
        });
    }

    checkNode() {
        let result = false;
        const template = /([^#?]+)\/?([^#?]+\.view)(\?([^#]*))?(#(.*))?$/;
        if (this.mainNode) {
            this.attrbMainNode = this.mainNode.attr('data-src');
            if (this.attrbMainNode && template.test(this.attrbMainNode)) {
                result = true;
            }
        }
        return result;
    }

    buildOptions() {
        this.sirvOptions.common = helper.deepExtend(this.sirvOptions.common, this.dataJSON.settings || {});
        this.sirvOptions.mobile = helper.deepExtend(this.sirvOptions.mobile, this.dataJSON.settings || {});
    }

    buildCallBackName() {
        this.configURL = globalFunctions.normalizeURL(this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
        this.urlParams = this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$2');
        if (this.urlParams) { this.configURL += ('?' + this.urlParams); }
        this.configHash = $J.getHashCode(this.configURL.replace(/^http(s)?:\/\//, ''));
        this.cfCallbackName = 'view-' + SLIDER_BUILDER_CONF_VER + '_' + this.configHash;
    }

    generateComponents() {
        this.componentsList.forEach((item) => {
            let node = $J.$new('div');
            if (item.type === globalVariables.SLIDE.TYPES.IMAGE) {
                if (item.is3rd) {
                    node = $J.$new('img');
                    node.attr('data-type', 'static');
                } else {
                    node.attr('data-type', 'zoom');
                }
            }

            let path = item.path;
            if (this.urlParams) {
                path += ('?' + this.urlParams);
            }

            node.attr('data-src', path);
            this.nodes.push(node);
        });
    }

    addAllComponents() {
        this.mainNode.node.innerHTML = '';
        this.nodes.forEach((item) => {
            this.mainNode.node.appendChild(item.node);
        });
    }

    destroy() {
        this.mainNode = null;
        this.sirvOptions = null;

        this.nodes = [];
        this.configURL = null;
        this.dataJSON = null;
        this.configHash = null;
        this.cfCallbackName = null;
        this.componentsList = [];
    }
}

return SliderBuilder;

    }
);
