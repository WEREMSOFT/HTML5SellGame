/**
 * Created by pabloweremczuk on 1/2/17.
 * This is the game file, it' important to create a Game class, since it have states and stuff. Not nice to implement
 * all that functionality in the main class(the one you include in your html)
 */

/**
 * Created by pabloweremczuk on 1/2/17.
 */
var Utils = require('./core/Utils');
var Container = require('./core/Container');
var Coin = require('./sprites/Coin');
var Shell = require('./sprites/Shell');

var Game = function(canvas, imageResources){
    this.x = 0;
    this.y = 0;
    this.imageResources = imageResources;
    this.state = STATE_IDLE;

    var coin = new Coin(imageResources['coin']);
    coin.originalX = 100;
    coin.originalY = 100;
    canvas.addChild(coin);

    var coin = new Coin(imageResources['coin']);
    coin.originalX = 100;
    coin.originalY = 100;
    coin.phaseY = coin.phaseX = Math.PI;
    canvas.addChild(coin);

    var shells = createShells(imageResources['shell']);


    for(let i = 0; i < shells.length; i++){
        canvas.addChild(shells[i]);
    }

    canvas.drawAll();
    canvas.startMainLoop();

};
Utils.extends(Game, Container);

function createShells(img) {
    var returnValue = [];
    for(let i = 0; i < 3; i++){
        returnValue[i] = new Shell(img);
        returnValue[i].x = i * img.width;
        returnValue[i].y = 100;
    }
    return returnValue;
}





module.exports = Game;
