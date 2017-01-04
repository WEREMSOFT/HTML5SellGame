/**
 * Created by pabloweremczuk on 12/30/16.
 */
'use strict';

var Utils = require('./Utils');
var Containter = require('./Container');
var Text = require('./Text');


/**
 * It's a DOM canvas wrapper. Also handles the FPS update and drae routines
 * @param pCanvas
 * @constructor
 */
function CanvasContainer(pCanvas){
    this.canvas = pCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.childs = [];
    this.parentClass.call(this);
    // start with a lowerFPS
    this.FPS = 15;
}

Utils.extends(CanvasContainer, Containter);

CanvasContainer.prototype.canvas = {};
CanvasContainer.prototype.ctx = {};


/**
 * draws all the childs
 */
CanvasContainer.prototype.drawAll = function(){
    requestAnimationFrame(()=>{
        this.ctx.save();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        var that = this;
        this.processChilds(function(pChild){
            if(pChild.image && pChild.visible)
                that.ctx.drawImage(pChild.image, pChild.x, pChild.y);
            else if(pChild instanceof Text)
                that.drawText(pChild.x, pChild.y, pChild.text, pChild.color);
        });
        this.ctx.restore();
    });

};
/**
 * updates all it' childs
 */
CanvasContainer.prototype.updateAll = function(){
    this.processChilds(function(pChild){
        if(pChild.update)
            pChild.update();
    });
};
/**
 * Draws a rectangle, usefull for prototyping
 * @param pX origin X
 * @param pY origin Y
 * @param pWidth width of the rectangle
 * @param pHeight height of the rectangle
 * @param pColor color of the rectangle
 */
CanvasContainer.prototype.drawRect = function(pX, pY, pWidth, pHeight, pColor){
    this.ctx.fillStyle = pColor;
    this.ctx.fillRect(pX, pY, pWidth, pHeight);
};
/**
 * Draws a line, useful for prototyping
 * @param pX X coordinate of the starting point of the line
 * @param pY Y coordinate of the starting point of the line
 * @param pXDest X coordinate of the ending point of the line
 * @param pYDest Y coordinate of the ending point of the line
 */
CanvasContainer.prototype.drawLine = function(pX, pY, pXDest, pYDest){
    this.ctx.moveTo(pX, pY);
    this.ctx.lineTo(pXDest, pYDest);
    this.ctx.stroke();
};
/**
 * Draws texts. Usefull for render information into the screen
 * @param pX X coordinate of the text
 * @param pY Y coordinate of the text
 * @param pText the string, what do you want to say to the user?
 * @param pColor color of the text
 * @param pFont font and size (default 30px arial)
 */
CanvasContainer.prototype.drawText = function (pX, pY, pText, pColor, pFont){
    this.ctx.fillStyle = pColor;
    this.ctx.font = pFont || '30px Arial';
    this.ctx.fillText(pText, pX, pY);
};
/**
 * update routine. Triggers draw and update routintes
 */
CanvasContainer.prototype.update = function(){
    this.drawAll();
    this.updateAll();
};
/**
 * Starts the mainloop event, using the FPS variable as a time interval
 */
CanvasContainer.prototype.startMainLoop = function(){
    if(this.mainLoopIntervalHandler){
        clearInterval(this.mainLoopIntervalHandler);
    }
    this.mainLoopIntervalHandler = setInterval(() => {
        this.drawAll();
        this.updateAll();
    }, 1000 / this.FPS);
};


module.exports = CanvasContainer;

