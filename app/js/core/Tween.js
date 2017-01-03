/**
 * Created by pabloweremczuk on 1/3/17.
 */
var EventDispatcher = require('./EventDispatcher');
var Utils = require('./Utils');

var Tween = function (pObject, pPropertyName, pEndValue) {
    this.objectToTween = pObject;
    this.propertyName = pPropertyName;
    this.endValue = pEndValue;
};

Utils.extends(Tween, EventDispatcher);

Tween.prototype.update = function(){
    this.objectToTween[this.propertyName] = this.endValue;
    this.dispatchEvent(new Event('TweenEnded'));
};


module.exports = Tween;