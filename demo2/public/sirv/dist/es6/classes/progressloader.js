Sirv.define(
    'ProgressLoader',
    ['bHelpers','magicJS','globalVariables','globalFunctions','helper','RoundLoader'],
    (bHelpers,magicJS,globalVariables,globalFunctions,helper,RoundLoader) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* start-removable-module-css */
        globalFunctions.rootDOM.addModuleCSSByName('ProgressLoader', () => {
            return '[[css]]';
        });
        /* end-removable-module-css */
        
        /* eslint-env es6 */
/* global RoundLoader, helper, $J, $ */
/* eslint-disable indent */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const svgNS = 'http://www.w3.org/2000/svg';

const setDefaultOptions = (options) => {
    if (!options) { options = {}; }
    if (!options.width) { options.width = 44; }
    if (!options.height) { options.height = 44; }
    if (!options.max) { options.max = 0; }
    return options;
};

const createSvg = (name, attributes) => {
    const el = $($J.D.node.createElementNS(svgNS, name));

    if (!attributes) {
        attributes = {};
    }

    Object.entries(attributes).forEach(attr => el.attr(...attr));

    return el;
};

const getStrokeDashoffset = (max, percent) => {
    return max - ((max / 100) * percent);
};

const getPercent = (max, value) => {
    return Math.round(100 / (max / value));
};

const PROGRESS = {
    START: 0,
    LOADING: 1,
    END: 2
};

// eslint-disable-next-line no-unused-vars
class ProgressLoader extends RoundLoader {
    constructor(parent, options) {
        options = setDefaultOptions(options);
        super(parent, options);
        this.type = 'progress';
        this.lineSize = 125;
        this.currentLineSize = 125;
        this.currentPersent = 0;
        this.currentValue = 0;
        this.progressState = PROGRESS.START;
        this.maxOpacityFlag = false;
        this.maxOpacity = 1;
        this.circles = [];
        this.size = { width: this.options.width, height: this.options.height };

        this.state = globalVariables.APPEARANCE.HIDDEN;

        this._createCircles();
    }

    addClass() { this.node.addClass('PREFIX-progress-loader'); }

    _createCircles() {
        this.p = '<span class="PREFIX-pl-text-percent">%</span>';
        this.loaderElement.addClass('PREFIX-pl-wrapper');
        this.circleWrapper = $J.$new('div').addClass('PREFIX-pl-circle-wrapper');

        const size = this.size.width;
        const halfSize = size / 2;

        this.circles.push(createSvg('circle', {
            'class': 'PREFIX-pl-pie',
            r: halfSize - 2,
            cx: halfSize,
            cy: halfSize
        }));

        this.circles.push(createSvg('circle', {
            'class': 'PREFIX-pl-slice',
            r: halfSize - 2,
            cx: halfSize,
            cy: halfSize
        }));

        this.svg = createSvg('svg', {
            'class': 'PREFIX-pl-indicator',
            viewBox: '0 0 ' + size + ' ' + size
        });

        this.circles[1].node.style.strokeDasharray = this.lineSize;
        this.circles[1].node.style.strokeDashoffset = this.lineSize;

        $(this.circles[1])
            .addEvent('transitionend', (e) => { e.stop(); })
            .setCssProp('transition', 'stroke-dashoffset .1s linear');

        $(this.svg).append(this.circles[0]);
        $(this.svg).append(this.circles[1]);

        this.textWrapper = $J.$new('div').addClass('PREFIX-pl-text-wrapper');
        this.text = $J.$new('span').addClass('PREFIX-pl-text');
        this.text.changeContent(this.currentPersent + this.p);

        this.textWrapper.append(this.text);
        this.circleWrapper.append(this.svg);
        this.loaderElement.append(this.circleWrapper);
        this.loaderElement.append(this.textWrapper);
    }

    append() {
        if (this.progressState !== PROGRESS.END) {
            super.append();
        }
    }

    progress() {
        if (this.progressState !== PROGRESS.END) {
            this.progressState = PROGRESS.LOADING;
            this.currentValue += 1;
            this.currentPersent = getPercent(this.options.max, this.currentValue);
            this.currentLineSize = getStrokeDashoffset(this.lineSize, this.currentPersent);

            this.circles[1].node.style.strokeDashoffset = this.currentLineSize;

            this.text.node.innerHTML = this.currentPersent + this.p;

            if (this.currentValue === this.options.max) {
                this.progressState = PROGRESS.END;
                this.hide();
            }
        }
    }

    setMaxOpacity(opacity) {
        if (!this.maxOpacityFlag && this.loaderElement) {
            this.maxOpacity = opacity;
            this.maxOpacityFlag = true;
            this.loaderElement.setCssProp('opacity', opacity);
        }
    }

    isEnded() { return this.currentValue === this.options.max; }
    isStarted() { return this.currentValue > 0; }
    finishOff() { this.currentValue = this.options.max; }
    isShow() { return this.state === globalVariables.APPEARANCE.SHOWN; }

    show() {
        if (this.state === globalVariables.APPEARANCE.SHOWN) { return; }
        this.state = globalVariables.APPEARANCE.SHOWN;
        this.append();
        this.loaderElement.render();
        this.loaderElement.removeEvent('transitionend');
        this.loaderElement.addEvent('transitionend', (e) => { e.stop(); });

        this.loaderElement.setCss({
            display: 'block',
            opacity: this.maxOpacity,
            transform: 'scale(1)'
        });
    }

    hide(force) {
        if (this.state === globalVariables.APPEARANCE.HIDDEN && !force || !this.inDoc) { return; }
        let countOfTransitionEvents = 0;
        this.state = globalVariables.APPEARANCE.HIDDEN;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.loaderElement.removeEvent('transitionend');
            this.loaderElement.addEvent('transitionend', (e) => {
                e.stop();
                countOfTransitionEvents += 1;
                if (countOfTransitionEvents < 2) { return; }
                this.loaderElement.removeEvent('transitionend');
                this.loaderElement.setCssProp('display', 'none');
            });

            this.loaderElement.setCss({
                opacity: 0,
                transform: 'scale(0)'
            });
        }, force ? 0 : 400);
    }

    getProgressState() {
        return this.progressState;
    }

    destroy() {
        this.hide(true);
        clearTimeout(this.timer);
        this.currentPersent = 0;
        this.currentValue = 0;
        this.progressState = PROGRESS.START;
        this.state = globalVariables.APPEARANCE.HIDDEN;

        this.loaderElement.removeEvent('transitionend');
        this.loaderElement.node.innerHTML = '';
        this.loaderElement = null;
        this.circleWrapper = null;
        this.textWrapper = null;
        this.circles = [];
        this.svg = null;
        this.text = null;
        this.inDoc = false;
        super.destroy();
    }
}

return ProgressLoader;

    }
);
