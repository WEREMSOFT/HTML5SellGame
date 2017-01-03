/**
 * Created by pabloweremczuk on 12/30/16.
 */
'use strict';

var Utils = require('./Utils');
var Containter = require('./Container');

var FPS = 15;

function CanvasContainer(pCanvas){
    this.canvas = pCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.childs = [];
    this.parentClass.call(this);
}

Utils.extends(CanvasContainer, Containter);

CanvasContainer.prototype.canvas = {};
CanvasContainer.prototype.ctx = {};



CanvasContainer.prototype.drawAll = function(){
    requestAnimationFrame(()=>{
        this.ctx.save();
        // this.ctx.fillStyle = '#ffffff';
        // this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.processChilds((pChild)=>{
            if(pChild.image && pChild.visible)
                this.ctx.drawImage(pChild.image, pChild.x, pChild.y);
        });
        this.ctx.restore();
    });

};

CanvasContainer.prototype.updateAll = function(){
    this.processChilds((pChild)=>{
        if(pChild.update)
            pChild.update();
    });
};

CanvasContainer.prototype.drawRect = function(pX, pY, pWidth, pHeight, pColor){
    this.ctx.fillStyle = pColor;
    this.ctx.fillRect(pX, pY, pWidth, pHeight);
};

CanvasContainer.prototype.drawLine = function(pX, pY, pXDest, pYDest){
    this.ctx.moveTo(pX, pY);
    this.ctx.lineTo(pXDest, pYDest);
    this.ctx.stroke();
};

CanvasContainer.prototype.drawText = function (pX, pY, pText, pColor, pFont){
    this.ctx.fillStyle = pColor;
    this.ctx.font = pFont || '30px Arial';
    this.ctx.fillText('Hello World', pX, pY);
};

CanvasContainer.prototype.update = function(){
    this.drawAll();
    this.updateAll();
};

CanvasContainer.prototype.startMainLoop = function(){
    setInterval(() => {
        this.drawAll();
        this.updateAll();
    }, 1000 / FPS);
};


module.exports = CanvasContainer;

