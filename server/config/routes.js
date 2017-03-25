if (process.env.NODE_ENV !== 'production') require('dotenv').config();
var request = require('request')
var yelp = require('./yelp');

module.exports = function (app, express) {

  // app.post('/api/foursquare', function(req, res) {
  //   console.log("body", req.body)
  //   console.log("query", req.query)
  //   console.log("params", req.params)
  //   console.log(req.route)

  //   request("https://api.foursquare.com/v2/venues/explore/?ll=" + req.body.latitude + "," + req.body.longitude + "&limit=5&radius=1600&section=arts&openNow=1&sortByDistance=1" + "&client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&v=20170319&m=foursquare",
  //     function(error, response, body) {
  //       if(error) throw error;
  //       res.send(body)
  //     })
  // })

  app.post('/api/geocode', function(req, res) {
    request("https://maps.googleapis.com/maps/api/geocode/json?" + req.body.search + "&key=AIzaSyBvvtXqBG-JFeJrgzlKCNm-1GllQNiag1s", function (error, response, body) {
        if (error) {
          console.log('BACKEND GEOCODE ERROR ', error);
        } else {
        res.send(body)
        }
    })
  })

  app.post('/api/yelp', function (req, res) {
    console.log('IN YELP BACKEND, REQ === ', req);
    yelp.options.qs = req.body;
    request(yelp.options, function (error, response, body) {
      if (error) {
        console.log('YELP GET ERROR ', error);
      } else {
        res.send(body)
      }
    })
  })

}


// $http.get("https://api.foursquare.com/v2/venues/explore/?ll=" + latitude + "," + longitude + "&limit=5&radius=1600&section=arts&openNow=1&sortByDistance=1" + "&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v=20170319&m=foursquare")


//foursquare category search &categoryId=######. <--works best immediately after "?"
//foursquare limit results &limit=######

