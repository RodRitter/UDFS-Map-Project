var ViewModel = function() {

    var self = this;

    this.locationArray = ko.observableArray(locations);
    this.filter = ko.observable();

    // Filters the list by the text input
    filtered = ko.computed(function(){
        var all = self.locationArray();
        var fres = self.filter();

        if(self.filter() !== undefined) {
            // Compare filter with list of locations
            var result = all.filter(function(loc) {
                name = loc.name.toLowerCase();
                fname = fres.toLowerCase();
                return name.indexOf(fname) >= 0;
            });
            
            // Hide all markers by default...
            hideAllMarkers();

            // and then show the ones that match the filter
            for(i in result) {
                showMarker(result[i].id)
            }
    
            return result;
        } else {
            return all;
        }
        
    });
}

ko.applyBindings(new ViewModel());