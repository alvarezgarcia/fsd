var path = require('path');

var Donor = require('./models/donor');

module.exports = function(app, io) {
	app.post('/api/donors', function(req, res) {
		var d = new Donor({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		});

		d.save(function(err, d) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(d);
		});

		io.emit('update-donors', d);

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
