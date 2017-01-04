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
var Tween = require('./../core/Tween');
var Text = require('./../core/Text');

var Game = function (canvas, imageResources) {
    // Game States
    this.STATE_IDLE = 0;
    this.STATE_SHUFFLE = 1;
    this.STATE_WAIT_FOR_SELECTION = 2;
    this.STATE_WIN = 3;
    this.STATE_LOOSE = 4;
    this.STATE_SHOW_COIN = 5;
    // Slot positions
    this.slots = [];

    this.x = 0;
    this.y = 0;
    this.imageResources = imageResources;
    this.canvas = canvas;

    this.shells = [];
    this.createShells(imageResources);

    this.cointHolder = this.shells[1];

    this.coin = new Coin(imageResources['coin']);
    this.coin.visible = false;
    this.addChild(this.coin);

    for (let i = 0; i < this.shells.length; i++) {
        this.addChild(this.shells[i]);
    }
    this.setEventListeners();
    this.passToStateIdle();
};

Utils.extends(Game, Container);

// ---State Transition Handlers
Game.prototype.passToStateIdle = function () {
    this.state = this.STATE_IDLE;
};

Game.prototype.passToStatShuffle = function () {
    if(this.state == this.STATE_SHUFFLE) return;
    this.state = this.STATE_SHUFFLE;
    // The shufles formula gives me a integer between 2 and 8
    this.shufles = 2 + Math.round(Math.random() * 8);
    this.performShuffle();
};

Game.prototype.performShuffle = function () {
    this.shuffleSlotMatrix();
    var tweensEnded = 0;
    for (let i = 0; i < this.shells.length; i++) {
        var tween = new Tween(this.shells[i], 'x', this.slots[i]);
        this.addChild(tween);
        tween.addEventListener('TweenEnded', (e) => {
            tweensEnded++;
            if(tweensEnded == this.shells.length){
                console.log('=========================================');
                this.shufles--;
                if (this.shufles != 0)
                    this.performShuffle();
                else
                    e.customTarget.parent.passToStateIdle();
            }
        });
    }

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

Game.prototype.passToStateShowCoin = function () {
    this.state = this.STATE_SHOW_COIN;
    this.coin.x = this.cointHolder.x + (this.cointHolder.image.width - this.coin.image.width) / 2;
    this.coin.y = this.cointHolder.y + (this.cointHolder.image.height - this.coin.image.height) / 2;
    this.moveShellUp();
};

// ---State handlers
Game.prototype.processStateShuffle = function () {

};

Game.prototype.processStateShowCoin = function(){

};

// --Methods that show where is the coin
Game.prototype.moveShellUp = function () {
    this.coin.visible = true;
    var tween = new Tween(this.cointHolder, 'y', -100);
    this.addChild(tween);
    tween.addEventListener('TweenEnded', (e) => {
        this.moveShellDown();
    });
};

Game.prototype.moveShellDown = function () {
    var tween = new Tween(this.cointHolder, 'y', 100);
    this.addChild(tween);
    tween.addEventListener('TweenEnded', (e) => {
        this.coin.visible = false;
        this.passToStatShuffle();
    });
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
    var text = new Text('YOU WIN(or not, I\' not sure)', 'red');
    text.x = 100;
    text.y = 100;
    this.addChild(text);
    this.passToStateShowCoin();
};

Game.prototype.processStateIdle = function () {
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
    var shufleCase = Math.round(Math.random() * 3);
    console.log('shuffle' + shufleCase);
    switch(shufleCase){
        case 0:
            this.slots.unshift(this.slots.pop());
            break;
        case 1:
            this.slots.push(this.slots.shift());
            break;
        case 2:
            var slot = this.slots.splice(1, 1)[0];
            this.slots.push(slot);
            break;
        case 3:
            var slot = this.slots.splice(1, 1)[0];
            this.slots.unshift(slot);
            break;
    }

};


module.exports = Game;
