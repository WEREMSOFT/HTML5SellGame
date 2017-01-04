# HTML5SellGame
Just an experiment with HTML5Canvas.

### Getting up and running

1. Clone this repo from `https://github.com/WEREMSOFT/HTML5SellGame.git`
2. Run `npm install` from the root directory
3. Run `gulp`
4. Your browser will automatically be opened and directed to the browser-sync proxy address

###How The Game Works

The Shell Game, involves a flat surface, a row of three small containers and a ball small enough to fit underneath each of them.

On each turn of the game the player is shown the ball being

placed under one of the containers before the order of the containers is repeatedly shuffled at random.

The player then has to guess correctly which container the ball is under in order to win, otherwise they lose.

### Highlights
* All code writen by myself except by node_modules
* Uses Gulp for build tasks
* Uses watch to re-run scripts if a file changes.
* Uses browser-sync to reload or inject changed files.
* Code format check using eslint
* NodeJS like include using Browserify
* User JSDoc to generate detailed documentation. See `docs/gen` folder.