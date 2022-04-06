Sirv.define(
    'Description',
    ['bHelpers','magicJS','globalFunctions','EventEmitter','helper'],
    (bHelpers,magicJS,globalFunctions,EventEmitter,helper) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* eslint-disable indent */
/* eslint-disable no-lonely-if */
/* eslint class-methods-use-this: ["off", { "createLink": ["error"] }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Description" }] */

const CSS_CONTAINER_DESCRIPTION = 'PREFIX-sirv-container-description';
const CSS_DESCRIPTION = 'PREFIX-sirv-description';
const CSS_HIDE = 'PREFIX-description-hide';

class Description {
    constructor(options) {
        this.options = Object.assign({
            text: ''
        }, options || {});

        this.container = $J.$new('div');
        this.description = $J.$new('div');

        this.addEvents();
    }

    init() {
        this.container.addClass(CSS_CONTAINER_DESCRIPTION);
        this.description.addClass(CSS_DESCRIPTION);

        this.description.node.innerHTML = this.createLink(this.options.text);
        this.container.append(this.description);
    }

    addEvents() {
        if ($J.browser.mobile) {
            this.handlerTouchDragEvent();
        } else {
            this.container.addEvent('mousescroll', (e) => {
                e.stop();
                const step = 20;
                this.container.node.scrollTop += (step * e.deltaY);
            });
        }
    }

    handlerTouchDragEvent() {
        let isMove = false;
        let lastScrollTop = null;
        const lastXY = { x: null, y: null };

        const dragOn = (e) => {
            const state = e.state;
            e.stop();
            if (state === 'dragstart') {
                lastXY.y = e.y;
                isMove = true;
                lastScrollTop = this.container.node.scrollTop;
            } else if (state === 'dragmove') {
                if (isMove) {
                    this.container.node.scrollTop = lastScrollTop - (e.y - lastXY.y);
                }
            } else if (state === 'dragend') {
                if (isMove) {
                    isMove = false;
                }
            }
        };

        this.container.addEvent('touchdrag', dragOn);
    }

    show(container) {
        (container || this.container).addClass(CSS_HIDE);
    }

    hide(container) {
        (container || this.container).addClass(CSS_HIDE);
    }

    get container() {
        return this.container;
    }

    createLink(string) {
        let result = null;

        const pat = /\[a([^\]]+)\](.*?)\[\/a\]/ig;
        result = string.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(pat, '<a $1>$2</a>');

        return result;
    }

    destroy() {
        this.container.removeEvent('mousescroll');
        if ($J.browser.mobile) {
            this.container.removeEvent('touchdrag');
        }

        this.options = null;
        this.text = null;
        this.container = null;
        this.description = null;
    }
}

return Description;

    }
);
