var express = require('express');
var app = express();

var routes = require('./app/routes.js');

var config = {};
config.port = 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blood-donor');

routes(app);


app.listen(config.port);
console.log("Blood donor service started in "+config.port);
