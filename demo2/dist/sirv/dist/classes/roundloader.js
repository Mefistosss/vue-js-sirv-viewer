Sirv.define(
    'RoundLoader',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','Loader'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,Loader) => {
        const moduleName = 'RoundLoader';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* global Loader */
/* global $J */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const SHOW_CLASS = 'PREFIX-show';

// eslint-disable-next-line no-unused-vars
class RoundLoader extends Loader {
    constructor(parent, options) {
        super(parent, options);
        this.type = 'round';

        this.state = globalVariables.APPEARANCE.HIDDEN;
        this.timer = null;

        this.loaderElement = $J.$new('div');

        this.addClass();
        this.node.append(this.loaderElement);
    }

    addClass() { this.node.addClass('PREFIX-round-loader'); }

    isHiding() {
        return this.state === globalVariables.APPEARANCE.HIDING;
    }

    show() {
        if ($J.contains([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN], this.state)) { return; }
        this.state = globalVariables.APPEARANCE.SHOWING;
        this.timer = setTimeout(() => {
            this.timer = null;
            this.append();

            this.node.removeEvent('transitionend');
            this.node.addEvent('transitionend', (e) => {
                e.stop();
                this.state = globalVariables.APPEARANCE.SHOWN;
            });
            this.node.getSize(); // render
            this.node.addClass(SHOW_CLASS);
        }, 250);
    }

    hide(force) {
        if (this.state === globalVariables.APPEARANCE.HIDDEN && !force) { return; }
        clearTimeout(this.timer);
        this.node.removeEvent('transitionend');

        if (this.state !== globalVariables.APPEARANCE.SHOWN) { force = true; }
        this.state = globalVariables.APPEARANCE.HIDING;

        if (!force) {
            this.node.addEvent('transitionend', (e) => {
                e.stop();
                this.node.remove();
                this.inDoc = false;
                this.state = globalVariables.APPEARANCE.HIDDEN;
            });
        } else {
            this.node.remove();
            this.inDoc = false;
            this.state = globalVariables.APPEARANCE.HIDDEN;
        }

        this.node.removeClass(SHOW_CLASS);
    }

    destroy() {
        this.hide(true);
        this.state = globalVariables.APPEARANCE.HIDDEN;
        this.node.innerHTML = '';
        super.destroy();
    }
}

return RoundLoader;

    }
);
