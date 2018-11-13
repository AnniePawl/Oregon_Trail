// Namespace
var Oregon = Oregon || {};

// UI object is responsible for showing things to user
Oregon.UI = {};

//Show notification in message area
// Type refers to positive, negative, or neutral message
OregonH.UI.notify = function(message, type){
  console.log(message + ' - ' + type);
};

//Refresh visual caravan stats
OregonH.UI.refreshStats = function() {
  console.log(this.caravan);
}
