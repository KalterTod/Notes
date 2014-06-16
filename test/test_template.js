var assert = require('assert');
var dest = // Put the root URL for your requests

//Don't be afraid to switch back to Master branch if you get stuck!
describe('Notes Test', function() {

/*
*** Create a user first, before the test is executed
*** Your hint is to remember "hooks".
*/

	before(function(done) {
		// Insert Code here
	});

/*
*** In similar fashion to the "before" block above, this code will execute after EVERY test
*** in this script's "Describe" block. We could opt to have these before/after hooks in each block
*** but this is just to clear out the database once we're done with this test.
*/

	after(function(done) {
		// Insert Code here
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
				.post('') // What endpoint are we using?

				.send( {
					// Insert body of request here
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
		*** This might be a bit tricky. You'll need to figure out the created user's id for the GET to work
		*/

		it('should find a new Note for user "Test.Person" ', function(done) {
			dest
				.get('/users/'+id+'/notes')
				.send()
				.end(function() {
					// Assert what allows this test to pass!
				})
		});

	});

// For this one, you're on your own! Use all of the tools you now have, and build this test case yourself!
	describe('Update Note', function() {
		// Good luck!

	});

});
