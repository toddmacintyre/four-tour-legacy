var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

require('dotenv').config()

var app = express();

// mongoose.connect();

app.use(express.static(path.join(__dirname + "../public")))

require('./config/middleware.js')(app, express)
require('./config/routes.js')(app, express)


var port = process.env.PORT || 7337;
app.listen(port, function(){
  console.log("Listening on port", port)
})

module.exports = app;
