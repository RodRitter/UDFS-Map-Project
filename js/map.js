/**
 * Handles Google Maps API & Initialization
 */

var map;
var pubs = [
    {name: 'Example', coords: {lat: 10.00, lng: 10.00}}
];

function initMap() {
    // Initialize Map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -29.725698, lng: 31.085894},
        zoom: 17
    });
}