var assert = require('assert');
var dest = 'http://localhost:3000/' // This is the destination than handles the HTTP requests

describe('Notes Test', function() {

/* 
*** Create a user first, before the test is executed
*** Anything in this block will be executed before/after all of the asertion blocks
*** Good for setting up and clearing out database
*/

	before(function(done) {
		function(callback) {
			dest // Set up the script to send requests to the destination URL defined above
				.post('/users') // Request type
				// Body of the request for the request type listed in the line above
				.send({ 
					user_name: 'Test Person'
				})
				// Tells function to end the request after a response is made. Otherwise, timeout. 
				.end(function() {
					setTimeout(done, 200); 
				});
	});

	describe('Note Created', function() {


	});

});