/**
 * Created by pabloweremczuk on 1/2/17.
 */

var EventDispatcher = function () {
};
/**
 * Dispatchs an event.
 * @param type the time of the event dispatched, a string
 * @param listener the callback function
 */
EventDispatcher.prototype.addEventListener = function (type, listener) {

    if (this._listeners === undefined) this._listeners = {};

    var listeners = this._listeners;

    if (listeners[type] === undefined) {

        listeners[type] = [];

    }

    if (listeners[type].indexOf(listener) === -1) {

        listeners[type].push(listener);

    }

};
/**
 * Asks if the dispatches already has the event handler
 * @param type the time of the event dispatched, a string
 * @param listener callback
 * @returns {boolean} true if is already set
 */
EventDispatcher.prototype.hasEventListener = function (type, listener) {

    if (this._listeners === undefined) return false;

    var listeners = this._listeners;

    if (listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1) {

        return true;

    }

    return false;

};
/**
 * removes the event handler
 * @param type the event type
 * @param listener the callback function
 */
EventDispatcher.prototype.removeEventListener = function (type, listener) {

    if (this._listeners === undefined) return;

    var listeners = this._listeners;
    var listenerArray = listeners[type];

    if (listenerArray !== undefined) {

        var index = listenerArray.indexOf(listener);

        if (index !== -1) {

            listenerArray.splice(index, 1);

        }

    }

};
/**
 * dispatchs the event
 * @param event the event to be dispatched.
 */
EventDispatcher.prototype.dispatchEvent = function (event) {

    if (this._listeners === undefined) return;

    var listeners = this._listeners;
    var listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
        // Target is a const, so we use customTarget instead
        event.customTarget = this;

        var array = [], i = 0;
        var length = listenerArray.length;

        for (i = 0; i < length; i++) {

            array[i] = listenerArray[i];

        }

        for (i = 0; i < length; i++) {

            array[i].call(this, event);

        }

    }

};

module.exports = EventDispatcher;