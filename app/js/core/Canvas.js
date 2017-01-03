/**
 * Created by pabloweremczuk on 12/30/16.
 */
'use strict';

var Utils = require('./Utils');
var Containter = require('./Container');

var FPS = 15;

function MyCanvas(pCanvas){
    this.canvas = pCanvas;
    this.ctx = canvas.getContext("2d");
    this.childs = [];
}

Utils.extends(MyCanvas, Containter);

MyCanvas.prototype.canvas = {};
MyCanvas.prototype.ctx = {};
this.childs = [];



MyCanvas.prototype.drawAll = function(){
    requestAnimationFrame(()=>{
        this.ctx.save();
        // this.ctx.fillStyle = "#ffffff";
        // this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.processChilds((pChild)=>{
            if(pChild.image && pChild.visible)
                this.ctx.drawImage(pChild.image, pChild.x, pChild.y);
        });
        this.ctx.restore();
    });

};

MyCanvas.prototype.updateAll = function(){
    this.processChilds((pChild)=>{
        if(pChild.update)
            pChild.update();
    });
};

MyCanvas.prototype.addChild = function(pChild){
    this.childs.push(pChild);
};

MyCanvas.prototype.talk = function(){
    return 'hello!';
};

MyCanvas.prototype.drawRect = function(pX, pY, pWidth, pHeight, pColor){
    this.ctx.fillStyle = pColor;
    this.ctx.fillRect(pX, pY, pWidth, pHeight);
};

MyCanvas.prototype.drawLine = function(pX, pY, pXDest, pYDest, pColor){
    this.ctx.moveTo(pX, pY);
    this.ctx.lineTo(pXDest, pYDest);
    this.ctx.stroke();
};

MyCanvas.prototype.drawText = function (pX, pY, pText, pColor, pFont){
    this.ctx.fillStyle = pColor;
    this.ctx.font = pFont || "30px Arial";
    this.ctx.fillText("Hello World", pX, pY);
};

MyCanvas.prototype.update = function(){
  this.drawAll();
  this.updateAll();
};

MyCanvas.prototype.startMainLoop = function(){
    setInterval(() => {
        this.drawAll();
        this.updateAll();
    }, 1000 / FPS);
};

MyCanvas.prototype.talk = function(){
    this.parentClass.prototype.talk.call(this);
    console.log('fellas!');
};

module.exports = MyCanvas;

