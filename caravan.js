// Namespace
var Oregon = Oregon || {};

Oregon.Caravan = {};

Oregon.Caravan.init = function(stats) {
    this.day = stats.day ;
    this.distance = stats.distance;
    this.crew = stats.crew;
    this.food = stats.food;
    this.oxen = stats.oxen;
    this.money = stats.money;
    this.firepower = stats.firepower;
};

//update weight and capacity
Oregon.Caravan.updateWeight = function(){
    var droppedFood = 0;
    var droppedGuns = 0;
}
  //amount caravan can carry
    this.capacity = this.oxen * Oregon.WEIGHT_PER_OX + this.crew * Oregon.WEIGHT_PER_PERSON;
    // amount of weight we currently have
    this.weight = this.food * Oregon.FOOD_WEIGHT + this.firepower * Oregon.FIREPOWER_WEIGHT;
    // drop things behind if too much weight
    //assume guns get dropped before food
    while(this.firepower && this.capacity <= this.weight){
        this.firepower--;
        this.weight -= Oregon.FIREPOWER_WEIGHT;
        droppedGuns++;
    }
    if(droppedFood){
        this.ui.notify('Left ' +droppedFood+ ' food provisions behind ', 'negative')
        }
    };

    // Update Covered Distance
    Oregon.Caravan.updateDistance = function() {
    // the closer to capacity, the slower
    var diff = this.capacity - this.weight;
    var speed = Oregon.SLOW_SPEED + diff/this.capacity * Oregon.FULL_SPEED;
    }

    // Food Consumption
    Oregon.Caravan.consumeFood = function(){
        this.food -= this.crew * Oregon.FOOD_PER_PERSON;

        if(this.food < 0 ){
            this.food = 0;
        }
    };
