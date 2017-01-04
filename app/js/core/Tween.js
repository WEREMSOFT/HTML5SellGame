/**
 * Created by pabloweremczuk on 1/3/17.
 */
var Container = require('./Container');
var Utils = require('./Utils');
/**
 * Creates a tween changing the property of the object until reaches the target value
 * @param pObject the objet we want to tween
 * @param pPropertyName the property of the object we want to tween
 * @param pEndValue the target value
 * @constructor
 */
var Tween = function (pObject, pPropertyName, pEndValue) {
    this.objectToTween = pObject;
    this.propertyName = pPropertyName;
    this.endValue = pEndValue;
};

Utils.extends(Tween, Container);

Tween.prototype.childs = [];
/**
 * this is the update method.
 */
Tween.prototype.update = function(){
    var increment = (this.endValue - this.objectToTween[this.propertyName]);
    this.objectToTween[this.propertyName] +=  increment / 3;
    if(Math.abs(this.objectToTween[this.propertyName] - this.endValue) < 1){
        this.objectToTween[this.propertyName] = this.endValue;
        var event = new Event('TweenEnded');
        this.parent.removeChild(this);
        this.dispatchEvent(event);
    }
};


module.exports = Tween;