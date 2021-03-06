var CanvasContainer = require('./core/CanvasContainer');
var ImageLoader = require('./core/ImageLoader');
var canvas = new CanvasContainer(document.getElementById('canvas'));
var Game = require('./gameElements/Game');

/**
 * Resource Loading routine, trigers even before Main.
 * The idea is to start the game routines after all the resources are ready.
 */
function init(){
    var images = {coin : './assets/images/coin.png', shell: './assets/images/shell.png', shell1: './assets/images/shell1.png', shell2: './assets/images/shell2.png', shell3: './assets/images/shell3.png'};
    ImageLoader.loadImages(images, main);
}

/**
 * This is the main function, you have all the resources loaded.
 * @param imageResources
 */
function main(imageResources){
    var game = new Game(canvas, imageResources);
    canvas.addChild(game);

    canvas.startMainLoop();
}

init();
