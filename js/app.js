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

    // Get Google Places
    var placesService = new google.maps.places.PlacesService(map);
    for(i in coords) {
        var request = {
            location: coords[i].coords,
            query: coords[i].name,
            radius: '50'
        };

        placesService.textSearch(request, function(data, status) {
            if(status == google.maps.places.PlacesServiceStatus.OK) {
                locations.push(data[0]);
                addLocation(locations[locations.length-1]);
                loadCount++

                if(loadCount == coords.length) {
                    self.locationArray.valueHasMutated();
                    $('.loc-loading').toggleClass('hidden');
                }
            } else {
                $('.loc-loading').html("Could not load data");
            }
        });
    }

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