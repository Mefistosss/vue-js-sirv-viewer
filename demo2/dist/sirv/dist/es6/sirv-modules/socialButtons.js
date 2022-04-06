Sirv.define(
    'SocialButtons',
    ['bHelpers','magicJS','EventEmitter','helper','globalFunctions'],
    (bHelpers,magicJS,EventEmitter,helper,globalFunctions) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        
const buttonsContainer = {};

/* eslint-env es6 */
/* global EventEmitter, $J*/
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class SocialButton extends EventEmitter {
    constructor(data) {
        super();
        this.name = 'blank';
        this.dataButton = data;
        this.linkClass = 'PREFIX-link';
        this.wrapClass = 'PREFIX-share-icon';

        this.container = null;
        this.a = null;
        this.nodeForImg = null;
        this.target = '_blank';
        this.prefix = '';
        this.url = '';
        this.fullLink = null;
    }

    init() {
        this.container = $J.$new('div');
        this.container.addClass('PREFIX-social-button');
        this.a = $J.$new('a');
        this.a.addClass(this.linkClass);
        this.nodeForImg = $J.$new('div');
        this.nodeForImg.addClass(this.wrapClass);

        if (!this.dataButton) {
            this.dataButton = { text: '', title: '' };
        }

        if (this.dataButton && !this.dataButton.title) {
            this.dataButton.title = '';
        }

        if (this.dataButton && !this.dataButton.text) {
            this.dataButton.text = '';
        }

        this.buildButton();
        this.addEvents();

        this.a.attr('href', this.buildLink());
        this.a.attr('target', this.target);
    }

    buildLink() {
        return this.url + this.prefix;
    }

    buildButton() {
        this.a.append(this.nodeForImg);
        this.container.append(this.a);
    }

    addEvents() {
        this.a.addEvent(['btnclick', 'tap'], () => {
            $J.W.node.open(this.fullLink, this.target);
        });
    }

    show() {
        this.container.setCss({ opacity: 1 });
    }

    hide() {
        this.container.setCss({ opacity: 0 });
    }

    addClasses() {
        this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
        this.nodeForImg.addClass('PREFIX-' + this.name);
    }

    node() {
        return this.container;
    }

    destroy() {
        this.name = null;
        this.dataButton = null;
        this.linkClass = null;
        this.wrapClass = null;

        this.container.remove();
        this.container = null;
        this.a.removeEvent('btnclick');
        this.a.removeEvent('tap');
        this.a.remove();
        this.a = null;
        this.nodeForImg.remove();
        this.nodeForImg = null;
        this.target = null;
        this.prefix = '';
        this.url = '';
        this.fullLink = null;
    }
}

/* eslint-env es6 */
/* global buttonsContainer, SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class FacebookSocialButton extends SocialButton {
    constructor(data) {
        super(data);

        this.name = 'facebook';
        this.prefix = 'sharer/sharer.php?s=100';
        this.url = 'https://www.facebook.com/';
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = super.buildLink()
        + '&p[title]=' + encodeURIComponent(this.dataButton.title)
        + '&p[summary]=' + encodeURIComponent(this.dataButton.text)
        + '&p[url]=' + encodeURIComponent(this.dataButton.link);

        return this.fullLink;
    }
}

buttonsContainer.Facebook = FacebookSocialButton;

/* eslint-env es6 */
/* global buttonsContainer, SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class LinkedinSocialButton extends SocialButton {
    constructor(data) {
        super(data);

        this.name = 'linkedin';
        this.prefix = 'cws/share?';
        this.url = 'https://www.linkedin.com/';
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = super.buildLink()
        + 'url=' + encodeURIComponent(this.dataButton.link)
        + '&[title]=' + encodeURIComponent(this.dataButton.title)
        + '&[summary]=' + encodeURIComponent(this.dataButton.text);

        return this.fullLink;
    }
}

buttonsContainer.Linkedin = LinkedinSocialButton;

/* eslint-env es6 */
/* global buttonsContainer, SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class TwitterSocialButton extends SocialButton {
    constructor(data) {
        super(data);

        this.name = 'twitter';
        this.prefix = 'share?';
        this.url = 'https://www.twitter.com/';
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = super.buildLink()
        + 'text=' + encodeURIComponent(this.dataButton.title)
        + '&url=' + encodeURIComponent(this.dataButton.link);

        return this.fullLink;
    }
}

buttonsContainer.Twitter = TwitterSocialButton;

/* eslint-env es6 */
/* global buttonsContainer, SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class RedditSocialButton extends SocialButton {
    constructor(data) {
        super(data);
        this.name = 'reddit';

        this.prefix = 'submit?';
        this.url = 'https://www.reddit.com/';
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = super.buildLink()
        + 'url=' + encodeURIComponent(this.dataButton.link)
        + '&title=' + encodeURIComponent(this.dataButton.title);

        return this.fullLink;
    }
}

buttonsContainer.Reddit = RedditSocialButton;

/* eslint-env es6 */
/* global buttonsContainer, SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class TumblrSocialButton extends SocialButton {
    constructor(data) {
        super(data);
        this.name = 'tumblr';

        this.prefix = 'share?';
        this.url = 'https://www.tumblr.com/';
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = super.buildLink()
        + 'url=' + encodeURIComponent(this.dataButton.link)
        + '&text=' + encodeURIComponent(this.dataButton.text)
        + '&title=' + encodeURIComponent(this.dataButton.title);

        return this.fullLink;
    }
}

buttonsContainer.Tumblr = TumblrSocialButton;

/* eslint-env es6 */
/* global buttonsContainer, SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class PinterestSocialButton extends SocialButton {
    constructor(data) {
        super(data);
        this.name = 'pinterest';

        this.prefix = 'pin/create/button/?';
        this.url = 'https://www.pinterest.com/';
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = super.buildLink()
        + 'url=' + encodeURIComponent(this.dataButton.link)
        + '&description=' + encodeURIComponent(this.dataButton.title);

        return this.fullLink;
    }
}

buttonsContainer.Pinterest = PinterestSocialButton;

/* eslint-env es6 */
/* global buttonsContainer, SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class TelegramSocialButton extends SocialButton {
    constructor(data) {
        super(data);
        this.name = 'telegram';

        this.prefix = 'share/url?';
        this.url = 'https://telegram.me/';
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = super.buildLink()
        + 'url=' + encodeURIComponent(this.dataButton.link)
        + '&text=' + encodeURIComponent(this.dataButton.title);

        return this.fullLink;
    }
}

buttonsContainer.Telegram = TelegramSocialButton;

/* eslint-env es6 */
/* global SocialButton */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */

// eslint-disable-next-line no-unused-vars
class ShareSocialButton extends SocialButton {
    constructor(data) {
        super(data);
        this.name = 'share';
        this._control = true;
        this.init();
        this.addClasses();
    }

    buildLink() {
        this.fullLink = '#';
        return this.fullLink;
    }

    setEvents() {
        this.a.addEvent(['btnclick', 'tap'], () => {
            this.emit('eventButton', { data: this.control });
            this._control = !this._control;
        });
    }

    /**
     * @param {boolean} control
     */
    set Control(control) {
        this._control = control;
    }

    destroy() {
        super.destroy();
        this.control = null;
    }
}

/* eslint-env es6 */
/* global EventEmitter, buttonsContainer, ShareSocialButton, $J*/
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */


const getClassName = (str) => { return $J.camelize('-' + str); };

// eslint-disable-next-line no-unused-vars
class SocialButtonManager extends EventEmitter {
    constructor(data, options, parentNode) {
        super();

        this.data = data;
        this.options = Object.assign({
            facebook: true,
            twitter: true,
            linkedin: true,
            reddit: true,
            tumblr: true,
            pinterest: true,
            telegram: true
        }, options || {});

        this.classes = [];
        this.managerContainer = null;
        this.managerButtonsContainer = null;
        this.managerShareContainer = null;
        this.nodeContainer = parentNode;

        this.shareButton = null;
        this.lastState = false;

        this.capShareBut = { text: '', link: '#', title: '' };
        this.timer = null;

        this.init();
        this.buildButtons();
        this.setManagerContainer();
    }

    init() {
        this.managerContainer = $J.$new('div');
        this.managerButtonsContainer = $J.$new('div');
        this.managerShareContainer = $J.$new('div');
        this.managerButtonsContainer.addClass('PREFIX-buttons-container');
        this.managerShareContainer.addClass('PREFIX-share-container');
        if ($J.browser.mobile) {
            this.managerContainer.addClass('PREFIX-manager-container-mobile');
        } else {
            this.managerContainer.addClass('PREFIX-manager-container');
        }
        this.shareButton = new ShareSocialButton(this.capShareBut);
        this.managerShareContainer.append(this.shareButton.node);
        this.shareButton.parentClass = this;
        this.addCustomEvent();
        this.addEventAnimationEnd();
    }

    static getDataImage() {
        const data = {
            facebook: { width: 1080 * 2, height: 1080 * 2 },
            twitter: { width: 1024 * 2, height: 512 * 2 },
            linkedin: { width: 1200 * 2, height: 628 * 2 },
            pinterest: { width: 735 * 2, height: 1102 * 2 },
            tumblr: { width: 500 * 2, height: 750 * 2 },
            telegram: { width: 1280 * 2, height: 1280 * 2 },
            reddit: { width: 1125 * 2, height: 432 * 2 }
        };

        return data;
    }

    clickShareButton(control) {
        if (!control) {
            this.hide();
            this.clearTimer();
        } else if (control) {
            this.show();
            this.setAutoCloseButton();
        }
        this.lastState = control;
    }

    addEventAnimationEnd() {
        this.managerContainer.addEvent('transitionend', (e) => {
            e.stop();
            e.stopQueue();
            if (e.oe.target === this.managerContainer && this.managerButtonsContainer.hasClass('PREFIX-show')) {
                if (this.lastState) {
                    this.hide();
                    this.shareButton.control = this.lastState;
                    this.clearTimer();
                }
            }
        });
    }

    addCustomEvent() {
        this.on('eventButton', (e) => {
            e.stop();
            this.clickShareButton(e.data);
        });
    }

    closeButtons() {
        if (this.managerButtonsContainer.hasClass('PREFIX-show')) {
            this.hide();
            this.shareButton.control = this.lastState;
            this.clearTimer();
        }
    }

    setAutoCloseButton() {
        if (!$J.browser.mobile) {
            this.timer = setTimeout(() => {
                this.closeButtons();
            }, 5000);
        }
    }

    clearTimer() {
        if (!$J.browser.mobile) {
            clearTimeout(this.timer);
        }
    }

    buildButtons() {
        Object.entries(this.options).forEach(([key, value]) => {
            if (value) {
                const data = { text: this.data.text, link: this.data.link[key], title: this.data.title };
                const button = new buttonsContainer[getClassName(key)](data);
                this.classes.push(button);
                this.managerButtonsContainer.append(button.node);
            }
        });

        if ($J.browser.mobile) {
            this.showManagerContainer();
        }
        this.hide();
    }

    getObjects() {
        return this.classes;
    }

    getObject(index) {
        if ($J.typeOf(index) === 'number' && index < this.classes.length) {
            return this.classes[index];
        }
        return -1;
    }

    setManagerContainer() {
        this.managerContainer.append(this.managerShareContainer);
        this.managerContainer.append(this.managerButtonsContainer);
        this.nodeContainer.append(this.managerContainer);
    }

    show() {
        this.managerButtonsContainer.addClass('PREFIX-show');
    }

    hide() {
        this.managerButtonsContainer.removeClass('PREFIX-show');
    }

    showManagerContainer() {
        this.managerContainer.setCss({ opacity: 1 });
    }

    destroy() {
        this.options = null;

        if (this.classes) {
            this.classes.forEach((el) => {
                if (el) {
                    el.destroy();
                }
            });
        }
        this.data = null;
        this.classes = null;
        this.lastState = null;
        this.capShareBut = null;
        this.managerContainer.removeEvent('transitionend');
        this.managerContainer.remove();
        this.managerShareContainer.remove();
        this.managerButtonsContainer.remove();
        this.managerContainer = null;
        this.managerShareContainer = null;
        this.managerButtonsContainer = null;
        this.nodeContainer.remove();
        this.nodeContainer = null;
        this.off('eventButton');
        this.shareButton.destroy();
        this.shareButton = null;
        this.timer = null;
    }
}

return SocialButtonManager;

    }
);
