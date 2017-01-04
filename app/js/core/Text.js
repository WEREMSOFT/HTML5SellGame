/**
 * Created by pabloweremczuk on 1/4/17.
 */
var Utils = require('./Utils');
var Container = require('./Container');


'use strict';

var Text = function (pText, pColor) {
    this.x = 0;
    this.y = 0;
    this.text = pText;
    this.color = pColor;
    this.setEventListeners();
};

Utils.extends(Text, Container);

Text.prototype.childs = [];

module.exports = Text;