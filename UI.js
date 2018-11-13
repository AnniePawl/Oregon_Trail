var Oregon = Oregon || {};

Oregon.UI = {};

// Show notification in message area
Oregon.UI.notify = function(message,type) {
    console.log(message + ' - ' + type);
};

// Refresh visial Caravn Stats
Oregon.UI.refreshStats = function() {
    console.log(this.caravan);
}
