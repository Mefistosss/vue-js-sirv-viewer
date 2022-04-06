Sirv.define(
    'EventEmitter',
    ['bHelpers','magicJS','helper'],
    (bHelpers,magicJS,helper) => {
        const moduleName = 'EventEmitter';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global helper */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


// eslint-disable-next-line no-unused-vars
class EventObject {
    constructor(type, direction, data) {
        this.type = type;
        this.direction = direction;

        this.propagation = true;
        this.nextCalls = true;
        this.emptyEvent = true;

        this.data = $J.extend(data, {
            eventType: this.type,
            eventDirection: this.direction,
            stopEmptyEvent: this.stopEmptyEvent.bind(this),
            stopPropagation: this.stopPropagation.bind(this),
            stopNextCalls: this.stopNextCalls.bind(this),
            stop: this.stop.bind(this),
            stopAll: this.stopAll.bind(this)
        });
    }

    copyData() {
        const result = {};

        helper.objEach(this.data, (key, value) => {
            if (!$J.contains(['eventDirection', 'stopEmptyEvent', 'stopPropagation', 'stopNextCalls', 'stop', 'stopAll'], key)) {
                result[key] = value;
            }
        });

        return result;
    }

    getCustomData() { return this.data; }
    getDirection() { return this.direction; }

    isEmptyEventStopped() { return !this.emptyEvent; }
    isPropagationStopped() { return !this.propagation; }
    isNextCallsStopped() { return !this.nextCalls; }

    stopEmptyEvent() { this.emptyEvent = false; }
    stopPropagation() { this.propagation = false; }
    stopNextCalls() { this.nextCalls = false; }

    stop() {
        this.stopPropagation();
        this.stopEmptyEvent();
    }

    stopAll() {
        this.stop();
        this.stopNextCalls();
    }
}

/* eslint-env es6 */
/* global EventObject */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


const correctName = (name, defaultName) => {
    if ($J.typeOf(name) === 'string') {
        name = name.trim();
        if (name === '') { name = defaultName; }
    } else {
        name = defaultName;
    }

    return name;
};

// eslint-disable-next-line no-unused-vars
class EmitterInstance {
    constructor() {
        this.__parent = null;
        this.__childs = $([]);
        this.__subscribers = {};
        this.__NAME_OF_EMPTY_EVENT = '__empty__';
    }

    __setChild(child) {
        this.__childs.push(child);
    }

    __removeChild(child) {
        const idx = this.__childs.indexOf(child);
        if (idx !== -1) {
            this.__childs.splice(idx, 1);
        }
    }

    setParent(parent) {
        this.__parent = parent;
        this.__parent.__setChild(this);
    }

    __removeParent() {
        if (this.__parent) {
            this.__parent.__removeChild(this);
            this.__parent = null;
        }
    }

    __callNext(event) {
        if (!event.isPropagationStopped()) {
            if (event.getDirection() === 'up') {
                if (this.__parent) {
                    this.__parent.__next(event);
                }
            } else {
                this.__childs.forEach((child) => { child.__next(event); });
            }
        }
    }

    __next(event) {
        const callbacks = this.__subscribers[event.type];

        event = new EventObject(event.type, event.direction, event.copyData());

        if (callbacks) {
            for (let i = 0; i < callbacks.length; i++) {
                callbacks[i](event.getCustomData(), event, this);
                if (event.isNextCallsStopped()) { break; }
            }
        }

        if (Object.prototype.hasOwnProperty.call(this.__subscribers, this.__NAME_OF_EMPTY_EVENT) && !event.isEmptyEventStopped()) {
            for (let i = 0; i < this.__subscribers[this.__NAME_OF_EMPTY_EVENT].length; i++) {
                this.__subscribers[this.__NAME_OF_EMPTY_EVENT][i](event.getCustomData());
            }
        }

        this.__callNext(event);
    }

    emit(type, data) { // up
        if (!data || $J.typeOf(data) !== 'object') {
            if ($J.typeOf(type) === 'object') {
                data = type;
                type = null;
            } else {
                data = {};
            }
        }

        type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

        this.__callNext(new EventObject(type, 'up', data));
    }

    broadcast(type, data) { // down
        if (!data || $J.typeOf(data) !== 'object') {
            if ($J.typeOf(type) === 'object') {
                data = type;
                type = null;
            } else {
                data = {};
            }
        }

        type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

        this.__callNext(new EventObject(type, 'down', data));
    }

    on(type, fn) {
        const self = this;
        if ($J.typeOf(type) === 'function') { fn = type; type = null; }
        if (!fn) { return null; }

        type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

        if (!this.__subscribers[type]) {
            this.__subscribers[type] = [];
        }

        this.__subscribers[type].push(fn);

        return () => { return self.off(type, fn); };
    }

    off(type, fn) {
        let idx;
        if ($J.typeOf(type) === 'function') { fn = type; type = null; }
        type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

        if (!fn) {
            delete this.__subscribers[type];
        } else if (Object.prototype.hasOwnProperty.call(this.__subscribers, type)) {
            idx = this.__subscribers[type].indexOf(fn);
            if (idx !== -1) {
                this.__subscribers[type].splice(idx, 1);
            }
        }
    }

    destroy() {
        this.__removeParent();
        this.__childs = $([]);
        this.__subscribers = {};
    }
}

return EmitterInstance;

    }
);
