var Oregon = Oregon || {};

// Constants
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

//Initiate Game
OregonH.Game.init = function(){
  //setup caravan
  this.caravan = OregonH.Caravan;
  this.caravan.init({
    day: 0,
    distance: 0,
    crew: 30,
    food: 80,
    oxen: 2,
    money: 300,
    firepower: 2
  });
};

// Initiate Game
Oregon.Game.init();
