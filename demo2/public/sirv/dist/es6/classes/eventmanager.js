Sirv.define(
    'EventManager',
    ['bHelpers','magicJS','globalVariables','globalFunctions','EventEmitter','helper'],
    (bHelpers,magicJS,globalVariables,globalFunctions,EventEmitter,helper) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* global $, $J, EventEmitter, helper */
/* eslint-env es6 */

// eslint-disable-next-line no-unused-vars
class EventManager extends EventEmitter {
    constructor(items) {
        super();

        this.items = items;

        this.events = {
            lazyimage: {},
            viewer: {},
            spin: {}, // viewer component
            zoom: {}, // viewer component
            image: {}, // viewer component
            video: {} // viewer component
        };

        this.reversedEvents = [];
        this.addEvents();
    }

    static eventsNameParser(eventName) {
        let result = null;

        if (eventName && $J.typeOf(eventName) === 'string') {
            result = eventName.split(':')
                .map((v) => { return v.trim(); })
                .filter((v) => { return v !== ''; });

            if (/sirv/i.test(result[0])) {
                result.shift();
            }

            if (result.length < 2) {
                result = null;
            }
        }

        return result;
    }

    /**
     * Trigger a DOM event
     * @param {String} eventType A name of the event.
     * @param {DOM Element} element The targe DOM element.
     * @param {Object} [detail] Additional event details.
     * @param {Boolean} [bubbles] Defines whether the event should bubble up through the event chain or not.
     * @param {Boolean} [cancelable] Defines whether the event can be canceled.
     */
    static triggerCustomEvent(eventType, element, detail, bubbles, cancelable) {
        if (bubbles === $J.U) { bubbles = true; }
        if (cancelable === $J.U) { cancelable = true; }

        let event;
        try {
            event = new CustomEvent(eventType, {
                bubbles: bubbles,
                cancelable: cancelable,
                detail: detail
            });
        } catch (e) {
            try {
                event = $J.D.createEvent('Event');
                event.initEvent(eventType, bubbles, cancelable);
                event.detail = detail;
            } catch (ex) { /* empty */ }
        }
        if (event) {
            element.node.dispatchEvent(event);
        }
    }

    addReverseEvent(eventName, callback, componentName) {
        this.reversedEvents.push({
            eventName: eventName,
            componentName: componentName,
            callback: callback
        });
    }

    callReverseCallback(componentName, eventName, eventData) {
        let result = false;

        for (let i = 0, l = this.reversedEvents.length; i < l; i++) {
            if (this.reversedEvents[i].componentName === componentName && this.reversedEvents[i].eventName === eventName) {
                this.reversedEvents[i].callback(eventData);
                this.reversedEvents.splice(i, 1);
                result = true;
                break;
            }
        }

        return result;
    }

    addEvents() {
        this.on('destroy', (e) => {
            e.stopAll();
            globalFunctions.stop(e.data.node, 'viewer');
        });

        /*
            'onLoad'
        */
        this.on('imagePublicEvent', (e) => {
            e.stopAll();

            const isReversed = this.callReverseCallback('lazyimage', e.data.type, e.data.image);

            if (!isReversed) {
                EventManager.triggerCustomEvent('sirv:lazyimage:' + e.data.type, e.data.node, Object.assign({}, e.data.image));

                const evs = this.events.lazyimage[e.data.type];
                if (evs) {
                    evs.forEach((callback) => { callback(e.data.image); });
                }
            }
        });

        /*
            viewer events
            'ready', 'fullscreenIn', 'fullscreenOut', 'beforeSlideIn', 'beforeSlideOut', 'afterSlideIn', 'afterSlideOut', 'enableItem', 'disableItem'
        */
        this.on('viewerPublicEvent', (e) => {
            e.stopAll();

            let node;
            let type;
            let eventData;
            let componentName = 'viewer';

            if (e.data.slider.type === 'componentEvent') {
                type = e.data.type;
                eventData = Object.assign({}, e.data.slide[e.data.slide.component]);

                componentName = e.data.slide.component;
                if (e.data.node) {
                    node = e.data.componentEventData.node;
                }

                Object.entries(e.data.componentEventData).forEach(([key, value]) => {
                    if (key === 'node') {
                        if (e.data.node) {
                            eventData[key] = value.node;
                        }
                    } else if (key !== 'type') {
                        eventData[key] = value;
                    }
                });
            } else {
                type = e.data.slider.type;

                if (type === 'ready') {
                    globalFunctions.iconsHash.remove();
                }

                if (e.data.node) {
                    node = e.data.node;
                }

                if (e.data.slider) {
                    eventData = e.data.slider;
                    if (type === 'sendStats') {
                        eventData.statsData = e.data.event;
                    }
                }

                if ([
                    'beforeSlideIn',
                    'beforeSlideOut',
                    'afterSlideIn',
                    'afterSlideOut',
                    'enableItem',
                    'disableItem',
                    'thumbnailClick'
                ].includes(type)) {
                    eventData = e.data.slide;
                }
            }

            const isReversed = this.callReverseCallback(componentName, type, eventData);

            if (!isReversed) {
                if (node) {
                    EventManager.triggerCustomEvent('sirv:' + componentName + ':' + type, node, Object.assign({}, eventData));
                }

                const evs = this.events[componentName][type];
                if (evs) {
                    evs.forEach((callback) => { callback(eventData); });
                }
            }
        });


        this.on((e) => { e.stopAll(); });
    }

    addEvent(eventName, callback) {
        let result = () => { return false; };
        const events = EventManager.eventsNameParser(eventName);

        if (events && this.events[events[0]] && callback) {
            if (!this.events[events[0]][events[1]]) {
                this.events[events[0]][events[1]] = [];
            }

            this.events[events[0]][events[1]].push(callback);

            if (['ready', 'init', 'onLoad'].includes(events[1])) {
                const itemName = events[0] === 'lazyimage' ? 'image' : 'viewer';

                if (itemName === 'viewer' && events[1] !== 'onLoad' || events[1] === 'onLoad' && itemName === 'image') {
                    /*
                        we need the timeout because every event returns function which can remove this event

                        for example:
                        if event 'ready' already was
                        and we set new one
                        the variable 'removeReadyEvent' will be undefined

                        const removeReadyEvent = Sirv.on('viewer:ready', (e) => {
                            removeReadyEvent();
                        });
                    */
                    setTimeout(() => {
                        const items = this.items[itemName];
                        items.forEach((item) => {
                            if (item.checkReadiness(events[1], events[0])) {
                                this.addReverseEvent(events[1], callback, events[0]);
                                item.sendEvent(events[1], events[0]);
                            }
                        });
                    }, 0);
                }
            }

            result = () => { return this.removeEvent(eventName, callback); };
        }

        return result;
    }

    removeEvent(eventName, callback) {
        const events = EventManager.eventsNameParser(eventName);

        if (events && this.events[events[0]] && this.events[events[0]][events[1]]) {
            if (callback) {
                const index = this.events[events[0]][events[1]].indexOf(callback);
                if (index >= 0) {
                    this.events[events[0]][events[1]].splice(index, 1);
                    return true;
                }
            } else {
                delete this.events[events[0]][events[1]];
                return true;
            }
        }

        return false;
    }
}

return EventManager;

    }
);
