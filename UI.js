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
  console.log(this.caravan);
}
