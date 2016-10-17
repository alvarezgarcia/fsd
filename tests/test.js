var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
var Donor = require('../app/models/donor');

describe("Get all donors", function(){
	// Test will pass if we get all todos
	it("should return all donors", function(done){
	    var DonorMock = sinon.mock(Donor);
	    var expectedResult = {status: true, donor: []};

	    DonorMock.expects('find').yields(null, expectedResult);
	    Donor.find(function (err, result) {
		DonorMock.verify();
		DonorMock.restore();
		expect(result.status).to.be.true;
		done();
	    });

	});

/*
// Test will pass if we fail to get a todo
it("should return error", function(done){
    var TodoMock = sinon.mock(Todo);
    var expectedResult = {status: false, error: "Something went wrong"};
    TodoMock.expects('find').yields(expectedResult, null);
    Todo.find(function (err, result) {
	TodoMock.verify();
	TodoMock.restore();
	expect(err.status).to.not.be.true;
	done();
    });
});
*/
	
});

describe("Get all donors", function(){
	it("should create new donor", function(done){
		var DonorMock = sinon.mock(new Donor({ todo: 'Save new donor'}));
		var donor = DonorMock.object;
		var expectedResult = { status: true };

		DonorMock.expects('save').yields(null, expectedResult);
			donor.save(function (err, result) {
			DonorMock.verify();
			DonorMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});
});
