/**
 * Created by pabloweremczuk on 12/30/16.
 */
'use strict';
/**
 * Handles inheritance process
 * @type {{extends: Utils.extends}}
 */

var Utils = {
    extends: function(childClass, parentClass){
        var Temp = function(){};
        Temp.prototype = parentClass.prototype;
        childClass.prototype = new Temp();
        childClass.prototype.constructor = childClass;
        childClass.prototype.parentClass = parentClass;
    }
};

module.exports = Utils;