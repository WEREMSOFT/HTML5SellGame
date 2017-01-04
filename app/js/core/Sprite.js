/**
 * Created by pabloweremczuk on 12/30/16.
 */
var Utils = require('./Utils');
var Container = require('./Container');


'use strict';

var Sprite = function (pImage, pWidth, pHeight) {
    this.x = 0;
    this.y = 0;
    this.image = pImage;
    this.width = pWidth;
    this.height = pHeight;
    this.setEventListeners();
};

Utils.extends(Sprite, Container);


Sprite.prototype.visible = true;

module.exports = Sprite;