class Caravan {
    constructor(stats) {
        this.day = stats.day ;
        this.distance = stats.distance;
        this.crew = stats.crew;
        this.food = stats.food;
        this.oxen = stats.oxen;
        this.money = stats.money;
        this.firepower = stats.firepower;
     }

     updateDistance() {
       //The closer to capacity, the slower
       var diff = this.capacity - this.weight;
       var speed = Oregon.SLOW_SPEED + diff/this.capacity * Oregon.FULL_SPEED;
       this.distance += speed;
     }

     consumeFood() {
       this.food -= this.crew * Oregon.FOOD_PER_PERSON;

       if(this.food < 0) {
         this.food = 0;
       }
     }

    updateWeight() {
        var droppedFood = 0;
        var droppedGuns = 0;

        //How much can caravan carry
        this.capacity = this.oxen * Oregon.WEIGHT_PER_OX + this.crew * Oregon.WEIGHT_PER_PERSON;

        //How much weight do we currently have
        this.weight = this.food * Oregon.FOOD_WEIGHT + this.firepower * Oregon.FIREPOWER_WEIGHT;

        //Drop things if too much weight
        //Assume guns dropped before food
        while(this.firepower && this.capacity <= this.weight) {
          this.firepower--;
          this.weight -= Oregon.FIREPOWER_WEIGHT;
          droppedGuns++;
        }

        if(droppedGuns) {
          this.ui.notify('Left '+droppedGuns+' guns behind', 'negative');
        }

        while(this.food && this.capacity <= this.weight) {
          this.food--;
          this.weight -= Oregon.FOOD_WEIGHT;
          droppedFood++;
        }

        if(droppedFood) {
          this.ui.notify('Left '+droppedFood+' food provisions behind', 'negative');
        }


    }
}

// Namespace
// var Oregon = Oregon || {};
//
// Oregon.Caravan = {};
//
// Oregon.Caravan.init = function(stats) {
//     this.day = stats.day ;
//     this.distance = stats.distance;
//     this.crew = stats.crew;
//     this.food = stats.food;
//     this.oxen = stats.oxen;
//     this.money = stats.money;
//     this.firepower = stats.firepower;
// };
//Update Weight & Capacity (based on food & guns)
// Oregon.Caravan.updateWeight = function(){
//   var droppedFood = 0;
//   var droppedGuns = 0;
//
//   //How much can caravan carry
//   this.capacity = this.oxen * Oregon.WEIGHT_PER_OX + this.crew * Oregon.WEIGHT_PER_PERSON;
//
//   //How much weight do we currently have
//   this.weight = this.food * Oregon.FOOD_WEIGHT + this.firepower * Oregon.FIREPOWER_WEIGHT;
//
//   //Drop things if too much weight
//   //Assume guns dropped before food
//   while(this.firepower && this.capacity <= this.weight) {
//     this.firepower--;
//     this.weight -= Oregon.FIREPOWER_WEIGHT;
//     droppedGuns++;
//   }
//
//   if(droppedGuns) {
//     this.ui.notify('Left '+droppedGuns+' guns behind', 'negative');
//   }
//
//   while(this.food && this.capacity <= this.weight) {
//     this.food--;
//     this.weight -= Oregon.FOOD_WEIGHT;
//     droppedFood++;
//   }
//
//   if(droppedFood) {
//     this.ui.notify('Left '+droppedFood+' food provisions behind', 'negative');
//   }
// };

//Update distance covered (called on each 'game step')
// Oregon.Caravan.updateDistance = function() {
//   //The closer to capacity, the slower
//   var diff = this.capacity - this.weight;
//   var speed = Oregon.SLOW_SPEED + diff/this.capacity * Oregon.FULL_SPEED;
//   this.distance += speed;
// };

//Food Consumption
// Oregon.Caravan.consumeFood = function() {
//   this.food -= this.crew * Oregon.FOOD_PER_PERSON;
//
//   if(this.food < 0) {
//     this.food = 0;
//   }
// }
