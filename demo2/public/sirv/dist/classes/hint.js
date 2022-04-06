Sirv.define(
    'Hint',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper) => {
        const moduleName = 'Hint';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName(moduleName, () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


// eslint-disable-next-line no-unused-vars
class HintInstance {
    constructor(parent, options) {
        this.parent = $(parent);

        this.options = $J.extend({
            html: 'hint',
            showClass: 'show',
            additionalClass: null,
            autohide: 3500
        }, options || {});

        this.instanceNode = $J.$new('div').addClass('sirv-hint');
        this.hintContainer = $J.$new('span').addClass('sirv-hint-message');

        this.inDoc = false;
        this.isShown = false;
        this.timer = null;

        this.instanceNode.addClass(this.options.additionalClass);
        this.hintContainer.node.innerHTML = this.options.html;

        this.instanceNode.append(this.hintContainer);
    }

    getAutoHideTime() {
        return this.options.autohide;
    }

    getActionTime() {
        let result = 0;
        let value = this.instanceNode.getCss('transition');

        try {
            value = value.split(' ')[1];
        } catch (e) {
            value = 0;
        }

        if (value) {
            value = value.trim();

            if (/m?s$/.test(value)) {
                if (/s$/.test(value)) {
                    result = parseFloat(value);
                    result *= 1000;
                } else {
                    result = parseInt(value, 10);
                }
            }
        }

        return result;
    }

    getMovingTime() {
        return this.getAutoHideTime() + this.getActionTime();
    }

    append() {
        if (!this.inDoc) {
            this.inDoc = true;
            this.parent.append(this.instanceNode);
        }
    }

    removeEvent() { this.instanceNode.removeEvent('transitionend'); }

    show() {
        this.append();
        clearTimeout(this.timer);
        this.timer = null;
        this.instanceNode.getSize(); // render
        this.removeEvent();
        this.instanceNode.addClass(this.options.showClass);
        this.isShown = true;

        if (this.options.autohide) {
            this.timer = setTimeout(() => {
                this.hide();
            }, this.options.autohide);
        }
    }

    hide() {
        if (this.inDoc) {
            this.removeEvent();
            clearTimeout(this.timer);
            this.timer = null;
            this.instanceNode.addEvent('transitionend', (e) => {
                e.stop();
                this.removeEvent();
                this.inDoc = false;
                this.instanceNode.remove();
            });

            this.instanceNode.removeClass(this.options.showClass);
            this.isShown = false;
        }
    }

    destroy() {
        this.instanceNode.setCssProp('transitionend', 'none');
        this.hide();
        this.removeEvent();
        this.hintContainer.remove();
        this.hintContainer.node.innerHTML = '';
        this.instanceNode.remove();
        this.inDoc = false;
    }
}

return HintInstance;

    }
);
