###Automated Testing a node.js architecture with Mocha
To write your own Mocha Test is very simple. We simply need to know the action and expected response. For example, with our Notes API, it's pretty clear what the POST endpoint does to the '/notes' URL. To test this, we should try hitting that endpoint with a new note to be created, and then the test case is simply to check that a new note was successfully created by querying the database with parameters specific to the acceptance criteria (in this case, the user_name and body we sent in the request) and ASSERTING that we get EXACTLY some result. 

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
