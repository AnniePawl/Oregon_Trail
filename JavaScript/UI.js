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
  };
}

// Update Caravan Position
document.getElementById('caravan').style.left = (380 * this.caravan.distance/Oregon.FINAL_DISTANCE + 'px';
};
