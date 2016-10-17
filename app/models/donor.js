var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonorSchema = Schema({
	first_name: {
		type: String
	},
	first_name: {
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
	}
});

var DonorModel = mongoose.model('Donor', DonorSchema);

module.exports = DonorModel;
