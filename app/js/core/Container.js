/**
 * Created by pabloweremczuk on 12/30/16.
 */
var EventDispatcher = require('./EventDispatcher');
var Utils = require('./Utils');

var Container = function(){
    this.childs = [];
    this.parent = null;

};

Utils.extends(Container, EventDispatcher);

Container.prototype.addChild = function(pChild){
    pChild.parent = this;
    this.childs.push(pChild);
    pChild.dispatchEvent(new Event('onAddedToParent', {parent: this}));
};

Container.prototype.setEventListeners = function (){
    this.addEventListener('onAddedToParent', this.onAddedToParent);
};

Container.prototype.processChilds = function(pCallBack){
    for(let i in this.childs){
        pCallBack(this.childs[i]);
    }
};

Container.prototype.onAddedToParent = function(e){
    console.log('added to parent');
    console.log(e);
};





module.exports = Container;