/**
 * Created by pabloweremczuk on 1/3/17.
 */
var Container = require('./Container');
var Utils = require('./Utils');

var Tween = function (pObject, pPropertyName, pEndValue) {
    this.objectToTween = pObject;
    this.propertyName = pPropertyName;
    this.endValue = pEndValue;
};

Utils.extends(Tween, Container);

Tween.prototype.childs = [];

Tween.prototype.update = function(){
    var increment = (this.endValue - this.objectToTween[this.propertyName]);
    this.objectToTween[this.propertyName] +=  increment / 3;
    if(Math.abs(this.objectToTween[this.propertyName] - this.endValue) < 1){
        this.objectToTween[this.propertyName] = this.endValue;
        var event = new Event('TweenEnded');
        console.log('tween ended');
        console.log(this.objectToTween);
        console.log(this.endValue);
        this.parent.removeChild(this);
        this.dispatchEvent(event);
    }
};


module.exports = Tween;