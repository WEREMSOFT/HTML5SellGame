var Canvas = require('./core/Canvas');
var Sprite = require('./core/Sprite');
var ImageLoader = require('./core/ImageLoader');
var Coin = require('./sprites/Coin');
var Shell = require('./sprites/Shell');
var canvas = new Canvas(document.getElementById("canvas"));
var EventDispatcher = require('./core/EventDispatcher');
var eventDispatcher = new EventDispatcher();
var Game = require('./Game');

canvas.talk();

// Resource Loading routine, trigers even before Main.
// The idea is to start the game routines after all the resources are ready.
function init(){
    var images = {coin : './assets/images/coin.png', shell: './assets/images/shell.png'};
    ImageLoader.loadImages(images, main);
}

// This is the main function, you have all the resources loaded.
function main(imageResources){
    var game = new Game(canvas, imageResources);
    //canvas.render();
}



init();
