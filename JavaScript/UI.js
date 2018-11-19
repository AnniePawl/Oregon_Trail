// Namespace
var Oregon = Oregon || {};

// UI object is responsible for showing things to user
Oregon.UI = {};

//Show notification in message area
// Type refers to positive, negative, or neutral message
Oregon.UI.notify = function(message, type){
  console.log(message + ' - ' + type);
};

//Refresh visual caravan stats
Oregon.UI.refreshStats = function() {
    document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(this.caravan.day) + ': ' + message+'</div>' + document.getElementById('updates-area').innerHTML;

    // Modify the DOM
    document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
    document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
    document.getElementById('stat-crew').innerHTML = this.caravan.crew;
    document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
    document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
    document.getElementById('stat-money').innerHTML = this.caravan.money;
    document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
    document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight);
    // Update Caravan Position
    document.getElementById('caravan').style.left = (380 * this.caravan.distance/Oregon.FINAL_DISTANCE) + 'px';
};

// SHOW SHOP
Oregon.UI.showShop = function(products){
  //Get Shop Area
  var shopDiv = document.getElementById('shop');
  shopDiv.classList.remove('hidden');
  //Init Shop (once)
  if(!this.shopInitiated) {
    //Event Delegatino
    shopDiv.addEventListener('click', function(e){
      //what was clicked
      var target = e.target || e.src;

      //exit button
      if(target.tagName == 'BUTTON') {
        //resume journey
        shopDiv.classList.add('hidden');
        Oregon.UI.game.resumeJourney();
      }
      else if(target.tagName == 'DIV' && target.className.match(/product/)) {

        Oregon.UI.buyProduct({
          item: target.getAttribute('data-item'),
          qty: target.getAttribute('data-qty'),
          price: target.getAttribute('data-price')
        });

      }
    });
    this.shopInitiated = true;
  }

  //Clear Existing Content
  var prodsDiv = document.getElementById('prods');
  prodsDiv.innerHTML = '';

  //Show Products
  var product;
  for(var i=0; i < products.length; i++) {
    product = products[i];
    prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
  }
};

//buy product
Oregon.UI.buyProduct = function(product) {
  //check we can afford it
  if(product.price > Oregon.UI.caravan.money) {
    Oregon.UI.notify('Not enough money', 'negative');
    return false;
  }

  Oregon.UI.caravan.money -= product.price;

  Oregon.UI.caravan[product.item] += +product.qty;

  Oregon.UI.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');

  //update weight
  Oregon.UI.caravan.updateWeight();

  //update visuals
  Oregon.UI.refreshStats();
};







// SHOW ATTACK
Oregon.UI.showAttack = function(firepower, gold) {
  var attackDiv = document.getElementById('attack');
  attackDiv.classList.remove('hidden');
  //Keep Properties
  this.firepower = firepower;
  this.gold = gold;
  //Show Firepower
  document.getElementById('attack-description').innerHTML = 'Firepower: ' + firepower;

  // Init Once
  if(!this.attackInitiated) {
    // Fight!
    document.getElementById('fight').addEventListener('click', this.fight.bind(this));
    // Run away!
    document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

    this.attackInitiated = true;
  }
};

// FIGHT
Oregon.UI.fight = function(){
  var firepower = this.firepower;
  var gold = this.gold;
  var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));

  //Check for Survivors
  if(damage < this.caravan.crew) {
    this.caravan.crew -= damage;
    this.caravan.money += gold;
    this.notify(damage + ' Shit, people were killed...', 'negative');
    this.notify('Found $' + gold, 'gold');
  }
  else {
    this.caravan.crew = 0;
    this.notify('Ya so everyone died...', 'negative');
  }
  //Rusume Journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();
};


//Running Away from Enemy
Oregon.UI.runaway = function(){
  var firepower = this.firepower;
  var damage = Math.ceil(Math.max(0, firepower * Math.random()/2));
  //Check for Survivors
  if(damage < this.caravan.crew) {
    this.caravan.crew -= damage;
    this.notify(damage + ' people were killed running', 'negative');
  }
  else {
    this.caravan.crew = 0;
    this.notify('Everybody died running away', 'negative');
  }
  //Remove Event Listener
  document.getElementById('runaway').removeEventListener('click');
  //Resume Journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();

};
