// Namespace
var Oregon = Oregon || {};

// CONSTANTS
Oregon.WEIGHT_PER_OX = 20;
Oregon.WEIGHT_PER_PERSON = 2;
Oregon.FOOD_WEIGHT = 0.6;
Oregon.FIREPOWER_WEIGHT = 5;
Oregon.GAME_SPEED = 800;
Oregon.DAY_PER_STEP = 0.2;
Oregon.FOOD_PER_PERSON = 0.02;
Oregon.FULL_SPEED = 5;
Oregon.SLOW_SPEED = 3;
Oregon.FINAL_DISTANCE = 1000;
Oregon.EVENT_PROBABILITY = 0.15;
Oregon.ENEMY_FIREPOWER_AVG = 5;
Oregon.ENEMY_GOLD_AVG = 50;

Oregon.Game = {};

//INITIATE Game
Oregon.Game.init = function(){
    // Reference UI
    this.ui = Oregon.UI;
    // Reference Event Manager
    this.eventManager = Oregon.Event;
    // Setup Caravan
    this.caravan = Oregon.Caravan;
    this.caravan.init({
        day: 0,
        distance: 0,
        crew: 30,
        food: 80,
        oxen: 2,
        money: 300,
        firepower: 2
    });
 //Pass references
    this.caravan.ui = this.ui;
    this.caravan.eventManager = this.eventManager;
    this.ui.game = this;
    this.ui.caravan = this.caravan;
    this.ui.eventManager = this.eventManager;
    this.eventManager.game = this;
    this.eventManager.caravan = this.caravan;
    this.eventManager.ui = this.ui;

     //Start Journey!
     this.startJourney();
};

//Start Journey (Starts Time)
Oregon.Game.startJourney = function() {
  this.gameActive = true;
  this.previousTime = null;
  this.ui.notify('And so it begins...', 'positive');
  this.step();
};

// GAME LOOP
Oregon.Game.step = function(timestamp) {
  //Start & setup previous time for the first time
  if(!this.previousTime){
    this.previousTime = timestamp;
    this.updateGame();
  }
  //Time Difference
  var progress = timestamp - this.previousTime;
  //Game Update
  if(progress >= Oregon.GAME_SPEED) {
    this.previousTime = timestamp;
    this.updateGame();
  }
  //Used "bind" to refer to context "this" inside of step method
  if(this.gameActive) window.requestAnimationFrame(this.step.bind(this));
};

//UPDATE GAME STATS
Oregon.Game.updateGame = function() {
  //Update Day
  this.caravan.day += Oregon.DAY_PER_STEP;
  //Food Consumption
  this.caravan.consumeFood();
  //No Food, Game Over!
  if(this.caravan.food === 0) {
    this.ui.notify('Hate to break it to you, but your caravan starved to death...', 'negative');
    this.gameActive = false;
    return;
  }
  //Update Weight
  this.caravan.updateWeight();
  //Update Distance Progress
  this.caravan.updateDistance();
  //Show Refreshed Stats
  this.ui.refreshStats();
  //Check if Everyone Died...
  if(this.caravan.crew <= 0) {
    this.caravan.crew = 0;
    this.ui.notify('Sooo everyone died..', 'negative');
    this.gameActive = false;
    return;
  }
  //Check if User Won the Game
  if(this.caravan.distance >= Oregon.FINAL_DISTANCE) {
    this.ui.notify('Holy Shit! You made it! ', 'positive');
    this.gameActive = false;
    return;
  }
  // Trigger Random Events 
  if(Math.random() <= OregonH.EVENT_PROBABILITY) {
    this.eventManager.generateEvent();
  }
};

//PAUSE the Journey
Oregon.Game.pauseJourney = function() {
  this.gameActive = false;
};

//Resume the Journey
Oregon.Game.resumeJourney = function() {
  this.gameActive = true;
  this.step();
};

// Initiate Game
Oregon.Game.init();
