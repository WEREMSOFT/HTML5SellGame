/**
 * Created by pabloweremczuk on 1/2/17.
 */
var Utils = require('../core/Utils');
var Sprite = require('../core/Sprite');
/**
 * the coin the user needs to look for
 * @param pImage the coin image
 * @constructor
 */
var Coin = function(pImage){
    this.x = 0;
    this.y = 0;
    this.originalX = 0;
    this.originalY = 0;

    this.image = pImage;
    this.phaseX = 0;
    this.phaseY = 0;
    this.setEventListeners();
};

Utils.extends(Coin, Sprite);

Coin.prototype.childs = [];




module.exports = Coin;