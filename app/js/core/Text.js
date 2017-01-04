/**
 * Created by pabloweremczuk on 1/4/17.
 */
var Utils = require('./Utils');
var Container = require('./Container');


'use strict';
/**
 * A text to show information on the screen
 * @param pText
 * @param pColor
 * @constructor
 */
var Text = function (pText, pColor) {
    this.x = 0;
    this.y = 0;
    this.text = pText;
    this.color = pColor;
    this.setEventListeners();
};

Utils.extends(Text, Container);
/**
 * we need this in order to prevent recursive loop
 * @type {Array}
 */
Text.prototype.childs = [];

module.exports = Text;