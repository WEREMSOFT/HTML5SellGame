/**
 * Created by pabloweremczuk on 1/2/17.
 * This is the game file, it' important to create a Game class, since it have states and stuff. Not nice to implement
 * all that functionality in the main class(the one you include in your html)
 */

/**
 * Created by pabloweremczuk on 1/2/17.
 */
var Utils = require('./../core/Utils');
var Container = require('./../core/Container');
var Coin = require('./../sprites/Coin');
var Shell = require('./../sprites/Shell');

var Game = function (canvas, imageResources) {
    // Game States
    this.STATE_IDLE = 0;
    this.STATE_SHUFFLE = 1;
    this.STATE_WAIT_FOR_SELECTION = 2;
    this.STATE_WIN = 3;
    this.STATE_LOOSE = 4;
    // Slot positions
    this.slots = [];


    this.x = 0;
    this.y = 0;
    this.imageResources = imageResources;
    this.canvas = canvas;

    var coin = new Coin(imageResources['coin']);
    coin.originalX = 100;
    coin.originalY = 100;
    canvas.addChild(coin);

    var coin = new Coin(imageResources['coin']);
    coin.originalX = 100;
    coin.originalY = 100;
    coin.phaseY = coin.phaseX = Math.PI;
    canvas.addChild(coin);

    this.shells = [];
    this.createShells(imageResources['shell']);


    for (let i = 0; i < this.shells.length; i++) {
        canvas.addChild(this.shells[i]);
    }
    this.setEventListeners();
    this.passToStateIdle();


};
Utils.extends(Game, Container);


// Public methods

// ---State Transition Handlers
Game.prototype.passToStateIdle = function () {
    this.state = this.STATE_IDLE;
    this.shuffleSlotMatrix();
};

Game.prototype.passToStatShuffle = function () {
    this.state = this.STATE_SHUFFLE;
};

Game.prototype.passToStateWaitForSelection = function () {
    this.state = this.STATE_WAIT_FOR_SELECTION;
};

Game.prototype.passToStateWin = function () {
    this.state = this.STATE_WIN;
};

Game.prototype.passToStateLoose = function () {
    this.state = this.STATE_LOOSE;
};
// ---State handlers
Game.prototype.processStateShuffle = function () {
    console.log('shuffling');
    this.shells[0];
};


// ---Added to parent handler, it listen the mouse event when is added to the canvasContainer
Game.prototype.onAddedToParent = function (e) {
    // we need this reference to handle the mouse events, or else we'll not able to reach the game object.
    var that = this;
    this.parent.canvas.addEventListener('click', (e) => {
        that.mouseHandler(e);
    }, false);
};
// ---Main Loop Handler
Game.prototype.update = function () {
    switch (this.state) {
        case this.STATE_IDLE:
            this.processStateIdle();
            break;
        case this.STATE_SHUFFLE:
            this.processStateShuffle();
            break;
    }
};

// Mouse Handler:  We need to handle the mouse events at canvas level, because the sprites don't triggers events.
Game.prototype.mouseHandler = function (e) {
    console.log(e);
    this.passToStatShuffle();
};

Game.prototype.processStateIdle = function () {
    console.log('idling');
};

Game.prototype.createShells = function () {
    for (let i = 0; i < 3; i++) {
        this.shells[i] = new Shell(this.imageResources['shell']);
        this.shells[i].x = i * this.imageResources['shell'].width;
        this.slots[i] = this.shells[i].x;
        this.shells[i].y = 100;
    }
};
// Randomizes incrementally the slots array.
Game.prototype.shuffleSlotMatrix = function () {
    var pivot = [];
    while (this.slots.length != 0) {
        pivot.push(this.slots.splice(Math.round(Math.random() * this.slots.length), 1));
    }
    this.slots = pivot;
};


module.exports = Game;
