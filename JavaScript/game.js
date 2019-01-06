class Game {
    constructor(gameActive = true, previousTime = null) {
        this.ui = new UI(this);
        this.event = new Event(this);
        this.caravan = new Caravan(this, 0, 0, 30, 80, 2, 300, 2);

        this.gameActive = gameActive;
        this.previousTime = previousTime;

// Namespace
var Oregon = Oregon || {};

// CONSTANTS
this.WEIGHT_PER_OX = 20;
this.WEIGHT_PER_PERSON = 2;
this.FOOD_WEIGHT = 0.6;
this.FIREPOWER_WEIGHT = 5;
this.GAME_SPEED = 800;
this.DAY_PER_STEP = 0.2;
this.FOOD_PER_PERSON = 0.02;
this.FULL_SPEED = 5;
this.SLOW_SPEED = 3;
this.FINAL_DISTANCE = 1000;
this.EVENT_PROBABILITY = 0.15;
this.ENEMY_FIREPOWER_AVG = 5;
this.ENEMY_GOLD_AVG = 50;

Oregon.Game = {};

//INITIATE Game
// Oregon.Game.init = function() {
//     // Reference UI
//     this.ui = Oregon.UI;
//     // Reference Event Manager
//     this.eventManager = Oregon.Event;
//     // Setup Caravan
//     this.caravan = new Caravan({
//         day: 0,
//         distance: 0,
//         crew: 30,
//         food: 80,
//         oxen: 2,
//         money: 300,
//         firepower: 2
//     });

    startGame() {
           this.gameActive = true;
           this.previousTime = null;
           this.ui.notify('A great adventure begins', 'positive');

           this.step();
       }
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
    // this.startJourney();
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
    if (!this.previousTime) {
        this.previousTime = timestamp;
        this.updateGame();
    }
    //Time Difference
    var progress = timestamp - this.previousTime;
    //Game Update
    if (progress >= Oregon.GAME_SPEED) {
        this.previousTime = timestamp;
        this.updateGame();
    }
    //Used "bind" to refer to context "this" inside of step method
    if (this.gameActive) window.requestAnimationFrame(this.step.bind(this));
};

//UPDATE GAME STATS
Oregon.Game.updateGame = function() {
    //Update Day
    this.caravan.day += Oregon.DAY_PER_STEP;
    //Food Consumption
    this.caravan.consumeFood();
    //No Food, Game Over!
    if (this.caravan.food === 0) {
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
    if (this.caravan.crew <= 0) {
        this.caravan.crew = 0;
        this.ui.notify('Sooo everyone died..', 'negative');
        this.gameActive = false;
        return;
    }
    //Check if User Won the Game
    if (this.caravan.distance >= Oregon.FINAL_DISTANCE) {
        this.ui.notify('Holy Shit! You made it! ', 'positive');
        this.gameActive = false;
        return;
    }
    // Trigger Random Events
    if (Math.random() <= Oregon.EVENT_PROBABILITY) {
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
