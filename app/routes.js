var path = require('path');

var Donor = require('./models/donor');

module.exports = function(app) {
	app.post('/api/donors', function(req, res) {
		console.log(req.body);
		var d = new Donor({
			first_name: req.body.donorFirstName,
			last_name: req.body.donorLastName,
		});

		d.save(function(err, d) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(d);
		});
	});

	app.get('/api/donors', function(req, res) {
		Donor.find(function(err, ds) {
			res.json(ds);
		});
	});


	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/dist/index.html')); 
	});

};
