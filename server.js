var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)


var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./app/routes.js');

var config = {};
config.port = 8080;

var Donor = require('./app/models/donor');

mongoose.connect('mongodb://localhost/blood-donor');

app.use(express.static('./public/dist'));
app.use(bodyParser.json());

routes(app, io);



http.listen(config.port, function() {
	console.log("Blood donor service started in "+config.port);
});
