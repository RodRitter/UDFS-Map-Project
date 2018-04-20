/**
 * Handles Google Maps API & Initialization
 */
var map;
var markers = [];
var poiMarkers = [];
var infoWindow = null;
var bounds;

var locations = [
    {name: 'Dropkick Murphy\'s', coords: {lat: -29.826942, lng: 31.015563}},
    {name: 'The Panorama Bar', coords: {lat: -29.841684, lng: 31.034789}},
    {name: 'Unity Brasserie', coords: {lat: -29.843768, lng: 30.994277}},
    {name: 'Vill-Inns Pub', coords: {lat: -29.851362, lng: 30.996509}},
    {name: 'Three Monkeys Bar & Restaurant', coords: {lat: -29.852255, lng: 31.021400}},
    {name: 'The Chairman', coords: {lat: -29.866547, lng: 31.044402}}
];

var poiLocations = [];

function initMap() {
    infoWindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    // Initialize Map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -29.826942, lng: 31.015563},
        zoom: 13,
        styles: getStyles(),
        mapTypeControl: false
    });

    // Create Markers
    for(i in locations) {
        loc = locations[i];
        addLocation(locations[i], i);
    }
}

function resetMap() {
    for(i in markers) {
        markers[i].setMap(null);
    }

    markers = [];

    // Create Markers
    for(i in locations) {
        loc = locations[i];
        addLocation(locations[i], i);
    }
}

function addLocation(location, id) {
    var marker = new google.maps.Marker({
        position: location.coords,
        map: map,
        title: location.name,
        id: id,
        icon: getIcon('bar'),
        animation: google.maps.Animation.DROP
    });

    marker.addListener('click', function() {
        openInfoWindow(marker);

        if (marker.getAnimation() === null) {
            setTimeout(function(){
                marker.setAnimation(null);
            }, 700)
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });

    markers.push(marker);
    locations[id].id = id;
    locations[id].marker = markers[id];
    showMarker(marker.id)
}

function openInfoWindow(marker) {
    if(infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<h3>'+ marker.title +'</h3>');
        infoWindow.open(map, marker);

        infoWindow.addListener('closeclick', function(){
            infoWindow.marker = null;
            marker.setAnimation(null);
        });
    }
}

function handleItemClick(index) {
    var marker = markers[index];
    if(marker){
        openInfoWindow(marker);

        if (marker.getAnimation() === null) {
            setTimeout(function(){
                marker.setAnimation(null);
            }, 700)
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}

function handlePOIClick(index) {
    var marker = poiMarkers[index];
    if(marker){
        openInfoWindow(marker);

        if (marker.getAnimation() === null) {
            setTimeout(function(){
                marker.setAnimation(null);
            }, 700)
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}

function getIcon(name, size={w:32, h:37}) { // Default size
    marker = new google.maps.MarkerImage(
        './img/'+ name +'.png',
        new google.maps.Size(size.w, size.h),
        new google.maps.Point(0, 0),
        new google.maps.Point(0, 0),
        new google.maps.Size(size.w, size.h)
    );

    return marker;
}

// Showing & Hiding
function showAllMarkers() {
    for(i in markers) {
        showMarker(i);
    }
}

function hideAllMarkers() {
    for(i in markers) {
        if(markers[i].type !== 'POI') {
            hideMarker(i);
        }
    }
}

function showMarker(id) {
    markers[id].setMap(map);
    bounds.extend(markers[id].position);
    map.fitBounds(bounds);
}

function hideMarker(id) {
    markers[id].setMap(null);
}

function dropPOIMarkers(allLocations) {
    for(i in allLocations) {
        dropPOIMarker(allLocations, i);
    }
}

function dropPOIMarker(locations, id) {
    loc = locations[i];

    var marker = new google.maps.Marker({
        position: loc.coords,
        map: map,
        title: loc.name,
        id: id,
        icon: getIcon('poi', {w:28,h:33}),
        animation: google.maps.Animation.DROP
    });

    marker.addListener('click', function() {
        openInfoWindow(marker);
    });

    poiMarkers.push(marker);
    loc.id = id;
    loc.marker = poiMarkers[i];
    poiLocations.push(loc);
}



function getStyles() {
    return [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#4d6059"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7f8d89"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#2b3638"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2b3638"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#24282b"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#24282b"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];
}