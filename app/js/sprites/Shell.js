/**
 * Created by pabloweremczuk on 1/2/17.
 */
var Utils = require('../core/Utils');
var Sprite = require('../core/Sprite');
/**
 * the shell that covers the coin
 * @param pImage the shell PNG image
 * @constructor
 */
var Shell = function(pImage){
    this.x = 0;
    this.y = 0;
    this.originalX = 0;
    this.originalY = 0;

    this.image = pImage;
    this.phaseX = 0;
    this.phaseY = 0;
    this.setEventListeners();
    this.hasCoin = false;
};

var increment = 0.3;
Utils.extends(Shell, Sprite);

Shell.prototype.childs = [];

module.exports = Shell;