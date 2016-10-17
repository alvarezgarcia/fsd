var Donor = require('./models/donor');

module.exports = function(app) {

	app.get('/api/donors', function(req, res) {
		Donor.find(function(err, ds) {
			res.json(ds);
		});
	});

};
