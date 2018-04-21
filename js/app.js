var ViewModel = function() {

    var self = this;

    this.locationArray = ko.observableArray(locations);
    this.filter = ko.observable();
    this.pointsOfInterest = ko.observableArray();
    this.sidebarActive = ko.observable(true);
    this.locNotLoading = ko.observable(false);
    this.poiNotLoading = ko.observable(false);
    this.locLabel = ko.observable('Loading...');
    this.poiLabel = ko.observable('Loading...');

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
            for(var i=0; i<result.length; i++) {
                showMarker(result[i].pid);
            }
    
            return result;
        } else {
            return all;
        }
        
    });
    
    this.toggleSidebar = function() {
        self.sidebarActive(!self.sidebarActive());
        return;
    };

    this.handleItemClick = function(id) {
        var marker;
        for(var i=0; i<locations.length;i++) {
            if(locations[i].pid == id) {
                marker = markers[id];
            }
        }

        if(marker){
            openInfoWindow(marker);

            if (marker.getAnimation() === null) {
                setTimeout(function(){
                    marker.setAnimation(null);
                }, 700);
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

        self.toggleSidebar();
    }

    this.handlePOIClick = function(index) {
        var marker = poiMarkers[index];
        if(marker){
            openInfoWindowPOI(marker);
    
            if (marker.getAnimation() === null) {
                setTimeout(function(){
                    marker.setAnimation(null);
                }, 700);
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
        
        self.toggleSidebar();
    }


    // Get Google Places
    var placesService = new google.maps.places.PlacesService(map);
    for(var i=0; i<coords.length; i++) {
        var request = {
            location: coords[i].coords,
            query: coords[i].name,
            radius: '50'
        };

        placesService.textSearch(request, function(data, status) {
            if(status == google.maps.places.PlacesServiceStatus.OK) {
                locations.push(data[0]);
                addLocation(locations[locations.length-1]);
                loadCount++;

                if(loadCount == coords.length) {
                    self.locationArray.valueHasMutated();
                    self.sidebarActive(false);
                }

                self.locNotLoading(true);
            } else {
                self.locLabel("Could not load data");
            }
        });
    }

    // Get Foursqaure Points of Interest
    var fs = new Foursquare();
    fs.GetPointsOfInterest(function(data) {
        self.pointsOfInterest(data);
 
        // Let the view know that this observable has changed
        // So it can update it
        self.pointsOfInterest.valueHasMutated();
        self.sidebarActive(false);
        dropPOIMarkers(self.pointsOfInterest());
        self.poiNotLoading(true);
    });
};