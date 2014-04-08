###Automated Testing a node.js architecture with Mocha
Writing your own Mocha Test is very simple. We simply need to know the action and expected response. For example, with our Notes API, it's pretty clear what the POST endpoint does to the '/notes' URL. To test this, we should try hitting that endpoint with a new note to be created, and then the test case is simply to check that a new note was successfully created by querying the database with parameters specific to the acceptance criteria (in this case, the user_name and body we sent in the request) and ASSERTING that we get EXACTLY some result. 

Here is the basic layout for a Mocha Test:
	
	// This is the Assertion library we use. There are a few different ones (Chai, Assert, Should), but assert is the one used here.
	var assert = require("assert") 
		//This is our outer 
		describe('Array', function(){ 
			
			describe('#indexOf()', function(){ 
				
				it('should return -1', function(){ 
					assert.equal(-1, results); 
					assert.equal(-1, results); 
				});

			});
		});

As you can see, this code is very simple, but read through the comments to make sure you understand all of the pieces separately, because we're going to complicate things a bit with the next part.

#Hooks

Hooks are a very important aspect of Mocha scripts when dealing with testing node apps because it allows us to set up the conditions necessary for a test to be executed. Going back to the example mentioned earlier, we want to test whether or not a valid addNote request was successfully handled and that the note was created and stored in the database. For this, we use hooks to first submit the request. Fortunately for us, Mocha makes adding hooks a sinch. 

Let's take a look at one of the tests written for this API. Use the comments to follow along: 

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

As you can probably see, we have added the note before the test is exected. By the time we get down to the 'it' block (the acceptance criteria), the note should already have been created and stored. We now need only to query the database and make sure that the note was in fact created. 

In similar fashion, we can use beforeEach and afterEach hooks to have these steps carried out before/after EVERY test. If there were multiple 'it' blocks for this specific test case (describe block), we could use these hooks instead.

And that's not all! 

If you look at the full test.js file, you'll see that there are a before/after hooks in the outer-most 'describe' block. These hooks are there to describe functions that are required before any test is run, and to clear out the database after the test, as if it were never executed in the first place. This will allow the test to have to reusability, and could even be used to test any enviroment with a few minor changes.

Now it's your turn...Take a look at test_template.js

I've provided you with the starting point to create your own test script. You can use the fully completed one as a guide, but you should ideally try to create your own test script. Perhaps you'll find some test coverage I haven't even included yet!
