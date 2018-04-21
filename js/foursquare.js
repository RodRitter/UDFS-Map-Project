/**
 * Handles Foursquare API
 */
var Foursquare = function() {
    var venues = [];
    this.GetPointsOfInterest = function(callback) {
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/search",
            data: { 
                client_id: 'R5KGOH1UGY4OGSZMECFM4HA1IFLJGSQHYYIFZSZEQ2JUO1JY',
                client_secret: 'CLNSS2OBTZTYTR0DPZ1L4OOCRFLF2RYXQLS30ANUYYXPBSH5',
                ll: '-29.848221, 31.022449',
                limit: 5,
                radius: 2000,
                categoryId: '4d4b7105d754a06374d81259,4d4b7104d754a06370d81259',
                v:"20180323"
             },
            type: "GET",
            success: function(data) {
                for(var i=0; i<data.response.venues.length; i++) {
                    var id = data.response.venues[i].id;
                    $.ajax({
                        url: 'https://api.foursquare.com/v2/venues/'+id,
                        data: {
                            client_id: 'R5KGOH1UGY4OGSZMECFM4HA1IFLJGSQHYYIFZSZEQ2JUO1JY',
                            client_secret: 'CLNSS2OBTZTYTR0DPZ1L4OOCRFLF2RYXQLS30ANUYYXPBSH5',
                            v:"20180323"
                        },
                        type: "GET",
                        success: function(res) {
                            var v = res.response.venue;

                            venues.push({
                                name: v.name,
                                likes: v.likes.count,
                                hereNow: v.hereNow.count,
                                coords: {lat: v.location.lat, lng: v.location.lng}
                            });

                            if(venues.length == data.response.venues.length) {
                                if(venues.length == data.response.venues.length) {
                                    callback(venues);
                                }
                            }
                        },
                        error: function(error) {
                            alert('Something went wrong with Foursquare API');
                        }
                    });
                }
            },
            error: function(error) {
                alert('Something went wrong with Foursquare API');
            }
        });
    };
};