/**
 * Created by pabloweremczuk on 12/30/16.
 */
var EventDispatcher = require('./EventDispatcher');
var Utils = require('./Utils');
/**
 * An object that can hold other objects, in a tree shape.
 * @constructor
 */
var Container = function(){};

Utils.extends(Container, EventDispatcher);

Container.prototype.childs = [];
Container.prototype.parent = null;
/**
 * Adds a child to the container
 * @param pChild the child we want to add.
 */
Container.prototype.addChild = function(pChild){
    pChild.parent = this;
    this.childs.push(pChild);
    pChild.dispatchEvent(new Event('onAddedToParent', {parent: this}));
};
/**
 * Removes a child
 * @param pChild the child we want to remove
 */
Container.prototype.removeChild = function(pChild){
    var index = this.childs.indexOf(pChild);
    this.childs.splice(index, 1);
    pChild.dispatchEvent(new Event('onRemovedFromParent', {parent: this}));
};

/**
 * we need to setup the event listeners, this is usefull when we want to handle some attach, detach event.
 */
Container.prototype.setEventListeners = function (){
    this.addEventListener('onAddedToParent', this.onAddedToParent);
};
/**
 * process all its childs, and the childs of their childs. Useful with complex hierarchies. You can stop from updating
 * large amounts of objects detaching only its parent (like in a game level).
 * @param pCallBack
 */
Container.prototype.processChilds = function(pCallBack){
    for(let i in this.childs){
        // Process Childs recursivelly, as an example, updating all the childs or drawing all the childs.
        this.childs[i].processChilds(pCallBack);
        pCallBack(this.childs[i]);
    }
};
/**
 * dummy function, it's intended to be overwriten.
 * @param e
 */
Container.prototype.onAddedToParent = function(e){
};

module.exports = Container;