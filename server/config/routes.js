if (process.env.NODE_ENV !== 'production') require('dotenv').config();
var request = require('request')
module.exports = function (app, express) {

  app.post('/api/foursquare', function(req, res) {
    console.log("body", req.body)
    console.log("query", req.query)
    console.log("params", req.params)
    console.log(req.route)

    request("https://api.foursquare.com/v2/venues/explore/?ll=" + req.body.latitude + "," + req.body.longitude + "&limit=5&radius=1600&section=arts&openNow=1&sortByDistance=1" + "&client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&v=20170319&m=foursquare",
      function(error, response, body) {
        if(error) throw error;
        res.send(body)
      })
  })
}


// $http.get("https://api.foursquare.com/v2/venues/explore/?ll=" + latitude + "," + longitude + "&limit=5&radius=1600&section=arts&openNow=1&sortByDistance=1" + "&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v=20170319&m=foursquare")
