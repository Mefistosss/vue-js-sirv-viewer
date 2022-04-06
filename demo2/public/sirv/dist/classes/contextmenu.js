Sirv.define(
    'ContextMenu',
    ['bHelpers','magicJS','globalVariables','globalFunctions'],
    (bHelpers,magicJS,globalVariables,globalFunctions) => {
        const moduleName = 'ContextMenu';
        
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


const getViewPort = (pad) => {
    const size = $J.W.getSize();
    const scroll = $J.W.getScroll();

    pad = pad || 0;

    return { left: pad, right: size.width - pad, top: pad, bottom: size.height - pad, x: scroll.x, y: scroll.y };
};

// eslint-disable-next-line no-unused-vars
class ContextmenuInstance {
    constructor(target, data, cssPrefix) {
        if (undefined === cssPrefix) {
            cssPrefix = 'magic';
        }
        this.CSS_CLASS = cssPrefix + '-contextmenu';
        this.target = target;
        // Menu container
        this.conext = null;
        this.overlay = null;
        this.items = {};
        // this.data = data;

        this.active = false;

        this.showBind = null;
        this.hideBind = null;
        this.hideOnScrollBind = null;

        this.canShow = true;
        this.position = { top: null, left: null };

        this.fullScreenBox = null;

        this.setup(data || []);
    }

    isExist(idOfItem) { return !!this.items[idOfItem]; }

    setup(data) {
        this.context = $J.$new('ul').addClass(this.CSS_CLASS).addEvent('contextmenu dragstart selectstart', (e) => { e.stop(); });

        data.forEach((item) => {
            this.addItem(item);
        });

        this.hideFX = new $J.FX(this.context, {
            duration: 200,
            onComplete: () => {
                this.context.remove();
            }
        });


        this.target.addEvent('contextmenu', this.showBind = this.show.bind(this));

        // this.overlay = $J.$new('div').setCss({
        //     'background-image': 'url(\'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=\')',
        //     display: 'block',
        //     overflow: 'hidden',
        //     'z-index': '2147483647',
        //     position: 'fixed',
        //     top: 0, bottom: 0, left: 0, right: 0,
        //     width: 'auto', height: 'auto'
        // })

        this.overlay = $J.$new('div').addClass(this.CSS_CLASS + '-overlay')
        .addEvent('click contextmenu', this.hide.bind(this))
        // .addEvent('', this.hideBind = this.hide.bind(this))
        .addEvent('mousescroll', (e) => {
            e.stop();
            // this.hide();
            $(e).events[0].stop().stopQueue();
        });
        this.hideBind = $((e) => {
            if (!this.active) { return; }
            e.stop();
            if (e.getOriginEvent().keyCode === 27) { // Esc
                this.hide();
            }
        }).bind(this);
        $J.W.addEvent('keydown', this.hideBind, 1);

        // eslint-disable-next-line no-unused-vars
        this.hideOnScrollBind = $((e) => {
            if (!this.active) { return; }
            this.hide();
        }).bind(this);
        $J.W.addEvent('scroll', this.hideOnScrollBind);
    }

    addItem(data) {
        const _ = this;
        const item = $J.$new('li').appendTo(this.context);

        if ($J.defined(data.separator)) {
            item.addClass('menu-separator');
        } else if ($J.defined(data.label)) {
            item.append($J.D.node.createTextNode(data.label));
            if ($J.defined(data.disabled) && data.disabled === true) {
                item.attr('disabled', true);
            }
            if ($J.typeOf(data.action) === 'function') {
                // item.addEvent('click', (e) {
                item.addEvent('btnclick', (e) => {
                    e.stop();
                    if (!item.attr('disabled')) {
                        _.hide();
                        data.action.call(data.action, _.position);
                    }
                });
            }
        }

        if ($J.defined(data.hidden) && data.hidden === true) {
            item.setCss({ display: 'none' });
        }

        const id = data.id || 'item-' + Math.floor(Math.random() * $J.now());
        this.items[id] = item;

        return id;
    }

    hideItem(id) {
        if (this.items[id]) {
            $(this.items[id]).setCss({ display: 'none' });
        }
    }

    showItem(id) {
        if (this.items[id]) {
            $(this.items[id]).setCss({ display: '' });
        }
    }

    disableItem(id) {
        if (this.items[id]) {
            $(this.items[id]).attr('disabled', true);
        }
    }

    enableItem(id) {
        if (this.items[id]) {
            $(this.items[id]).removeAttr('disabled');
        }
    }

    show(e) {
        let _parent = $J.D.node.body;

        if (!this.canShow) { return; }

        this.hideFX.stop();
        if ($J.browser.fullScreen.enabled()) {
            if (this.fullScreenBox || $J.D.msFullscreenElement) {
                _parent = this.fullScreenBox || $J.D.msFullscreenElement;
            }
        }

        this.overlay.appendTo(_parent);
        this.context.setCss({ top: -10000 }).appendTo(_parent);
        // this.context.setCss({ top: -10000 }).appendTo(this.overlay);

        const pos = e.getClientXY();
        let left = pos.x;
        let top = pos.y;
        const page = e.getPageXY();
        this.position.top = page.y;
        this.position.left = page.x;

        const viewport = getViewPort(5);
        const size = this.context.getSize();
        if (viewport.right < left + size.width) {
            left -= size.width;
        }

        if (viewport.bottom < top + size.height) {
            top = viewport.bottom - size.height;
        }

        this.context.setCss({ top: top, left: left, display: 'block', opacity: 1 });
        // if (8 !== $J.browser.ieMode) {
        //     $($J.browser.getDoc()).setCss({ 'overflow': 'hidden' });
        // }
        this.active = true;
    }

    hide(e) {
        if (!this.active) { return; }
        this.overlay.remove();
        // if (8 !== $J.browser.ieMode) {
        //     $($J.browser.getDoc()).setCss({ 'overflow': '' });
        // }

        this.hideFX.start({
            'opacity': [1, 0]
        });

        this.active = false;

        if (e) {
            e.stopDefaults();
            if (e.type === 'contextmenu') {
                const p = e.getPageXY();
                const r = this.target.getRect();

                if (r.left <= p.x && r.right >= p.x && r.top <= p.y && r.bottom >= p.y) {
                    this.show(e);
                }
            }
        }
    }

    setCanShow(canShow) {
        this.canShow = canShow;
    }

    setFullScreenBox(fullScreenBox) {
        this.setFullScreenBox = fullScreenBox;
    }

    destroy() {
        this.target.removeEvent('contextmenu', this.showBind);
        $J.W
            .removeEvent('keydown', this.hideBind)
            .removeEvent('scroll', this.hideOnScrollBind);

        try {
            this.context.kill();
        } catch (ex) {
            // empty
        }
        try {
            this.overlay.kill();
        } catch (ex) {
            // empty
        }
    }
}

return ContextmenuInstance;

    }
);
