var path = require('path');

var Donor = require('./models/donor');

module.exports = function(app) {

	app.get('/api/donors', function(req, res) {
		Donor.find(function(err, ds) {
			res.json(ds);
		});
	});


	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/dist/index.html')); 
	});

};
