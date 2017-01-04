/**
 * Created by pabloweremczuk on 12/30/16.
 */
var Utils = require('./Utils');
var Container = require('./Container');


'use strict';
/**
 * its a wrapper for the images loaded
 * @param pImage the image resource. Must be already loaded
 * @constructor
 */
var Sprite = function (pImage) {
    this.x = 0;
    this.y = 0;
    this.image = pImage;
    this.setEventListeners();
};

Utils.extends(Sprite, Container);
/**
 * Check if a point is inside the image.
 * @param pPoint the point to check
 * @returns {boolean} returns true if the point is inside the image 'rectangle'
 */
Sprite.prototype.hitTest = function (pPoint) {
    return (pPoint.x > this.x
    &&
    pPoint.x < this.x + this.image.width
    &&
    pPoint.y > this.y
    &&
    pPoint.y < this.y + this.image.height);
};
/**
 * you can hide an image. stops for being drawn on canvas
 * @type {boolean}
 */
Sprite.prototype.visible = true;

module.exports = Sprite;