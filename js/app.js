var ViewModel = function() {

    var self = this;

    this.locationArray = ko.observableArray(locations);
    this.filter = ko.observable();
    this.pointsOfInterest = ko.observableArray();

    // Filters the list by the text input
    this.filtered = ko.computed(function(){
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

    // Get Foursqaure Points of Interest
    var fs = new Foursquare();
    fs.GetPointsOfInterest(function(data) {
        var venues = data.response.venues;
        for(i in venues) {
            p = venues[i];
            point = {name: p.name, coords: {lat: p.location.lat, lng: p.location.lng}}
            self.pointsOfInterest().push(point);
        }

        // Let the view know that this observable has changed
        // So it can update it
        self.pointsOfInterest.valueHasMutated()

        $('.poi-loading').toggleClass('hidden');

        dropPOIMarkers(self.pointsOfInterest());
    });
}

ko.applyBindings(new ViewModel());