var assert = require('assert');
var dest = 'http://localhost:3000/' // This is the destination than handles the HTTP requests

describe('Notes Test', function() {

/* 
*** Create a user first, before the test is executed
*** Anything in this block will be executed before/after all of the asertion blocks
*** Good for setting up and clearing out database. These are called "Hooks". 
*/

	before(function(done) {
		function(callback) {
			dest // Set up the script to send requests to the destination URL defined above
				.post('/users') // Request type
				// Body of the request for the request type listed in the line above
				.send({ 
					user_name: 'Test.Person'
				})
				// Tells function to end the request after a response is made. Otherwise, timeout. 
				.end(function() {
					setTimeout(done, 200); 
				});
		};
	});

/* 
*** In similar fashion to the "before" block above, this code will execute after EVERY test
*** in this script's "Describe" block. We could opt to have these before/after hooks in each block
*** but this is just to clear out the database once we're done with this test.
*/

	after(function(done) {
		function(callback) {
			dest
				.del('/users')
				.send({ 
					user_name: 'Test.Person' 
				})
				.end(function() {
					setTimeout(done, 200);
				});
		};
	});
// Try writing this code with beforeEach and afterEach. These hooks are designed to execute after each of the describe blocks nested inside
	
	describe('Note Created', function() {
		
		/*  
		*** This before function is nested inside this specific 'describe'
		*** Therefore, anything in this block will execute before the 'it'
		*** Can think of the 'it' as being the actual test case
		*/

		before(function(done) {
			dest
			// Similar to above, but now we are going to post to /notes instead of /users
				.post('/notes')
				// Note sent without a valid user should return an error
				// We will use the user created above
				.send( {
					user_name: 'Test.Person',
					body: 'This is a test note!'
				})
				.end(function() {
					setTimeout(done, 200);
				});
		});
		
		/*
		*** Now that we have everything set up, we need a test case
		*** The acceptance criteria for the feature that a person be able to add new note
		*** Is that there be exactly ONE new message in the database with the user_name
		*** We created at the beginning of the script.
		*/

		it('should find a new Note for user "Test.Person" ', function(done) {
			Notes.find({user_name: 'Test.Person'}, function(err, results) {
				assert.equal(1, results.length);
				done();
			});
		});

	});
	
	describe('Update Note', function() {
		before(function(done) {
		dest
			.put('/notes')
			.send({ 
				body: "This is an updated note",
				user_name: 'Test.Person',
				id: ""
			})
			.end(function() {
				setTimeout(done, 200);
			});
		});

		it('should Update a note and change the body', function(done) {
			Notes.find({ user_name: 'Test.Person'}, body: "This is an updated note"}, function(err, results) {
				assert.equal(1, results.length);
				done();
			});
		});
	
	});

	describe('User Not Found', function() {
		before(function(done) { 
			dest
				.post('/notes')
				.send( {
					body: 'This note should fail',
					user_name: 'Nobody',
				})
				.end(function() {
					setTimeout(done, 200);
				})
		});

		it('should not allow the note to be added', function(done) {
			Notes.find({ user_name:'Nobody' }, function(err, results) { 
				assert.equal(0, results.length); 
			});
		})

	});

});