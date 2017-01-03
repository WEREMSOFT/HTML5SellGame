/**
 * Created by pabloweremczuk on 1/2/17.
 */
var Utils = require('../core/Utils');
var Sprite = require('../core/Sprite');

var Coin = function(pImage){
    this.x = 0;
    this.y = 0;
    this.originalX = 0;
    this.originalY = 0;

    this.image = pImage;
    this.phaseX = 0;
    this.phaseY = 0;
};

var increment = 0.3;
Utils.extends(Coin, Sprite);

Coin.prototype.update = function(){
    if(this.phaseX > Math.PI) return;
    this.phaseX += increment;
    this.phaseY += increment;
    this.x = Math.sin(this.phaseX) * 100 + this.originalX;
    this.y = Math.cos(this.phaseY) * 100 + this.originalY;
    console.log(this.phaseX + "#" + this.phaseY);
};



module.exports = Coin;