var path = require('path');

var Donor = require('./models/donor');

module.exports = function(app) {
	app.post('/api/donors', function(req, res) {
		var d = new Donor({
			first_name: req.body.firstName,
			last_name: req.body.lastName,
		});

		d.save(function(err, d) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(d);
		});

	});

	app.get('/api/donors', function(req, res) {
		Donor.find(function(err, ds) {

			var r = ds.map(function(d) {
				return {
					first_name: d.first_name,
					last_name: d.last_name
				}
			});

			res.json(r);
		});
	});


	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/dist/index.html')); 
	});

};
