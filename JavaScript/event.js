

var Oregon = Oregon || {};
Oregon.Event = {};

// Caravan Stat Change
// 'stat': which caravan property that's changing
// 'value': how much we are changing property by.
// 'text': what we show user in message log

// class Game {
//     constructor() {
//
//     }
// }


Oregon.Event.eventTypes = [{
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'crew',
        value: -3,
        text: 'Food intoxication. Casualties: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'crew',
        value: -4,
        text: 'Flu outbreak. Casualties: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'food',
        value: -10,
        text: 'Worm infestation. Food lost: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'money',
        value: -50,
        text: 'Pick pockets steal $'
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'oxen',
        value: -1,
        text: 'Ox flu outbreak. Casualties: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'food',
        value: 20,
        text: 'Found wild berries. Food added: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'food',
        value: 20,
        text: 'Found wild berries. Food added: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'oxen',
        value: 1,
        text: 'Found wild oxen. New oxen: '
    },

    // SHOP!
    {
        type: 'SHOP',
        notification: 'neutral',
        text: 'You have found a shop',
        products: [{
                item: 'food',
                qty: 20,
                price: 50
            },
            {
                item: 'oxen',
                qty: 1,
                price: 200
            },
            {
                item: 'firepower',
                qty: 2,
                price: 50
            },
            {
                item: 'crew',
                qty: 5,
                price: 80
            }
        ]
    },
    {
        type: 'SHOP',
        notification: 'neutral',
        text: 'You have found a shop',
        products: [{
                item: 'food',
                qty: 30,
                price: 50
            },
            {
                item: 'oxen',
                qty: 1,
                price: 200
            },
            {
                item: 'firepower',
                qty: 2,
                price: 20
            },
            {
                item: 'crew',
                qty: 10,
                price: 80
            }
        ]
    },
    {
        type: 'SHOP',
        notification: 'neutral',
        text: 'Smugglers sell various goods',
        products: [{
                item: 'food',
                qty: 20,
                price: 60
            },
            {
                item: 'oxen',
                qty: 1,
                price: 300
            },
            {
                item: 'firepower',
                qty: 2,
                price: 80
            },
            {
                item: 'crew',
                qty: 5,
                price: 60
            }
        ]
    },
    // BATTLES!

    {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Bandits are attacking you'
    },
    {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Bandits are attacking you'
    },
    {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Bandits are attacking you'
    }

];

Oregon.Event.generateEvent = function() {
    //pick random one
    var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
    var eventData = this.eventTypes[eventIndex];

    //events that consist in updating a stat
    if (eventData.type == 'STAT-CHANGE') {
        this.stateChangeEvent(eventData);
    }
    //Shops
    else if (eventData.type == 'SHOP') {
        //Pause Game
        this.game.pauseJourney();
        //Notify User
        this.ui.notify(eventData.text, eventData.notification);
        //Prepare event
        this.shopEvent(eventData);
    }
    // Attacks
    else if (eventData.type == 'ATTACK') {
        //pause game
        this.game.pauseJourney();
        //notify user
        this.ui.notify(eventData.text, eventData.notification);
        //prepare event
        this.attackEvent(eventData);
    }
};

Oregon.Event.stateChangeEvent = function(eventData) {
    //can't have negative quantities
    if (eventData.value + this.caravan[eventData.stat] >= 0) {
        this.caravan[eventData.stat] += eventData.value;
        this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
    }
};

// Shop Event
Oregon.Event.shopEvent = function(eventData) {
    //# of products for sale
    var numProds = Math.ceil(Math.random() * 4);

    //product list
    var products = [];
    var j, priceFactor;

    for (var i = 0; i < numProds; i++) {
        //random product
        j = Math.floor(Math.random() * eventData.products.length);
        //multiply price by random factor +-30%
        priceFactor = 0.7 + 0.6 * Math.random();
        products.push({
            item: eventData.products[j].item,
            qty: eventData.products[j].qty,
            price: Math.round(eventData.products[j].price * priceFactor)
        });
    }
    this.ui.showShop(products);
};

//Prepare an attack event
Oregon.Event.attackEvent = function(eventData) {
    var firepower = Math.round((0.7 + 0.6 * Math.random()) * Oregon.ENEMY_FIREPOWER_AVG);
    var gold = Math.round((0.7 + 0.6 * Math.random()) * Oregon.ENEMY_GOLD_AVG);

    this.ui.showAttack(firepower, gold);
};
