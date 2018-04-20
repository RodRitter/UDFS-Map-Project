/**
 * Handles Foursquare API
 */
var Foursquare = function() {
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
            success: callback,
            error: function(error) {
                $('.loading').html("Could not load data");
            }
        });
    }
}