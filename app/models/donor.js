var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonorSchema = Schema({
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	contact_number: {
		type: String
	},
	email: {
		type: String
	},
	blood_group: {
		type: String
	},
	ip_address: {
		type: String
	},
	coordinates: {
		type: String
	},
	hash: {
		type: String
	}
});

var DonorModel = mongoose.model('Donor', DonorSchema);

module.exports = DonorModel;
