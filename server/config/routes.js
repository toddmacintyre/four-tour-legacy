if (process.env.NODE_ENV !== 'production') require('dotenv').config();
var request = require('request')
var yelp = require('./yelp');

module.exports = function (app, express) {

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
