var assert = require('assert');
var dest = 'http://localhost:3000'; // This is the destination than handles the HTTP requests
var request = require('supertest');
var URL = request(dest);
var name = "";
var noteID = "";
var userID = "";

var Note = require('../models/notes').Note;
var User = require('../models/users').Users;

describe('Notes Test', function() {

/*
*** Create a user first, before the test is executed
*** Anything in this block will be executed before/after all of the asertion blocks
*** Good for setting up and clearing out database. These are called "Hooks".
*/

	before(function(done) {

			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < 5; i++ ){
					name += possible.charAt(Math.floor(Math.random() * possible.length));
				};

			URL // Set up the script to send requests to the destination URL defined above
				.post('/user') // Request type
				// Body of the request for the request type listed in the line above
				.send({
					user_name: name
				})
				// Tells function to end the request after a response is made. Otherwise, timeout.
				.end(function() {
					setTimeout(done, 2000);
				});
			URL
				.get("/user")
				.send()
				.end(function(err, res) {
					userID = res.body.users[res.body.users.length -1]._id;
					setTimeout(done, 2000);
				});
			done();
	});

/*
*** In similar fashion to the "before" block above, this code will execute after EVERY test
*** in this script's "Describe" block. We could opt to have these before/after hooks in each block
*** but this is just to clear out the database once we're done with this test.
*/

	after(function(done) {
			URL
				.del('/user')
				.send({
					user_name: name
				})
				.end(function() {
					setTimeout(done, 2000);
				});
			done();
	});
// Try writing this code with beforeEach and afterEach. These hooks are designed to execute after each of the describe blocks nested inside

	describe('Note Created', function() {

		/*
		*** This before function is nested inside this specific 'describe'
		*** Therefore, anything in this block will execute before the 'it'
		*** Can think of the 'it' as being the actual test case
		*/

		before(function(done) {
			URL
			// Similar to above, but now we are going to post to /notes instead of /users
				.post('/notes')
				// Note sent without a valid user should return an error
				// We will use the user created above
				.send( {
					user_name: name,
					body: 'This is a test note!'
				})
				.end(function() {
					setTimeout(done, 2000);
					done();
				});
		});

		/*
		*** Now that we have everything set up, we need a test case
		*** The acceptance criteria for the feature that a person be able to add new note
		*** Is that there be exactly ONE new message in the database with the user_name
		*** We created at the beginning of the script.
		*/

		it('should find a new note for user ' + name, function(done) {

			URL
				.get("/user/"+userID+"/notes")
				.send()
				.end(function(err, res) {
					assert.equal(res.status, 200);
					done();
				})


		});

	});

	describe('Update Note', function() {

		before(function(done) {
			URL
				.get("/user/"+userID+"/notes")
				.send()
				.end(function(err, res) {
					assert.equal(res.status, 200);
					noteID = res.body[0]._id;
					done();
				})
		});

		it('should Update a note and change the body', function(done) {
			URL
				.put("/notes")
				.send({
					body: "This is an updated note!",
					id: noteID
				})
				.end(function(err, res) {
					assert.equal(res.status, 200);
					done();
				})
		});

		it('should find the Updated note with new body', function(done) {
			URL
				.get("/user/"+userID+"/notes")
				.send()
				.end(function(err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.body[0].body, "This is an updated note!");
					done();
				})
		})

	});

	describe('User Not Found', function() {
		before(function(done) {
			URL
				.post('/notes')
				.send( {
					body: 'This note should fail',
					user_name: 'Nobody',
				})
				.end(function(err, res) {
					setTimeout(done, 2000);
					assert.equal(res.status, 404);
					done();
				});
		});


	});


});
