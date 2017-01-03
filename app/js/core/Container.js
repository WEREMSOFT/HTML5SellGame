/**
 * Created by pabloweremczuk on 12/30/16.
 */

var Container = function(){
    this.childs = [];
    this.parent = null;
};

Container.prototype.addChild = function(pChild){
    pChild.parent = this;
    this.childs.push(pChild);
};

Container.prototype.processChilds = function(pCallBack){
    for(let i in this.childs){
        pCallBack(this.childs[i]);
    }
};

Container.prototype.talk = function(){
    console.log('HI There!!');
};

module.exports = Container;