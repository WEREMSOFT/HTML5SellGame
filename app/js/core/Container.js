/**
 * Created by pabloweremczuk on 12/30/16.
 */
var EventDispatcher = require('./EventDispatcher');
var Utils = require('./Utils');

var Container = function(){


};

Utils.extends(Container, EventDispatcher);

Container.prototype.childs = [];
Container.prototype.parent = null;

Container.prototype.addChild = function(pChild){
    pChild.parent = this;
    this.childs.push(pChild);
    pChild.dispatchEvent(new Event('onAddedToParent', {parent: this}));
};

Container.prototype.removeChild = function(pChild){
    var index = this.childs.indexOf(pChild);
    this.childs.splice(index, 1);
    pChild.dispatchEvent(new Event('onRemovedFromParent', {parent: this}));
};


Container.prototype.setEventListeners = function (){
    this.addEventListener('onAddedToParent', this.onAddedToParent);
};

Container.prototype.processChilds = function(pCallBack){
    for(let i in this.childs){
        // Process Childs recursivelly, as an example, updating all the childs or drawing all the childs.
        this.childs[i].processChilds(pCallBack);
        pCallBack(this.childs[i]);
    }
};

Container.prototype.onAddedToParent = function(e){
};





module.exports = Container;