Sirv.define(
    'ComponentLoader',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','RoundLoader'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,RoundLoader) => {
        const moduleName = 'ComponentLoader';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* global RoundLoader */
/* global $J */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const setDefaultOptions = (options) => {
    if (!options) { options = {}; }
    if (!options.width) { options.width = '100%'; }
    if (!options.height) { options.height = '100%'; }
    return options;
};

// eslint-disable-next-line no-unused-vars
class ComponentLoader extends RoundLoader {
    constructor(parent, options) {
        options = setDefaultOptions(options);
        super(parent, options);
        this.type = 'component';

        this.loaderElement
            .addClass('PREFIX-bounce-wrapper')
            .append($J.$new('div').addClass('PREFIX-bounce1'))
            .append($J.$new('div').addClass('PREFIX-bounce2'));
    }

    addClass() { this.node.addClass('PREFIX-component-loader'); }

    destroy() {
        this.loaderElement.removeClass('PREFIX-bounce-wrapper');
        this.loaderElement.node.innerHTML = '';
        super.destroy();
    }
}

return ComponentLoader;

    }
);
