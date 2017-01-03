/**
 * Created by pabloweremczuk on 12/30/16.
 */

'use strict';

var Sprite = function(pImage, pWidth, pHeight){
  this.x = 0;
  this.y = 0;
  this.image = pImage;
  this.width = pWidth;
  this.height = pHeight;

};

Sprite.prototype.visible = true;

Sprite.prototype.draw = function(){

};



module.exports = Sprite;