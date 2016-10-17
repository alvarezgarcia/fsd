var express = require('express');
var app = express();
var mongoose = require('mongoose');

var routes = require('./app/routes.js');
var config = {};

config.port = 8080;
mongoose.connect('mongodb://localhost/blood-donor');

routes(app);

app.listen(config.port);
console.log("Blood donor service started in "+config.port);
