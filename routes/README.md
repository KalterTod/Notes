### Routes in Node.js

Routes are very important to a node.js app. This is what allows an outside device to make requests to the application. If you look through the files here, you'll see what's really going on under the hood when you send an HTTP request to a node app. 

To begin, here's a chunk of code from the notes.js file:

	exports.findAll = function(req, res) {
  	Note.find({}, function(err, docs) {
    	if(!err) {
      	res.json(200, { notes: docs });
    	}
    	else {
      	res.json(500, { message: err });
    	}
  	});
	}

This is a function defined here that allows us to send a request that finds all notes currently stored in the database. Think of this function as the tunnel that provides the information our node app wants to grant access to within the database. We can manipulate the information we send back down the tunnel, but this very simple function only returns all items found in the "Note" collection inside our database.

To get an idea of how this all maps, we also have to look at the app.js file (in the parent directory). 
	
	mongoose.connect('mongodb://localhost/notes'); 
	//'notes' is the name of the full database. There are collections in it called 'Note' and 'User'
	app.get('/notes', notes.findAll);

These lines are not right next to eachother as I have them here because there are other endpoints, but these two lines can be thought of as the entryway to the tunnel mentioned above. We know exactly which tunnel to enter if we want to receive the results described in the function above, because we've defined as such. The second line is telling the app.js file that whenever somebody sends a GET request to the URL/notes, they should look to the routes/notes.js file for the function called "findAll" and execute that block of code. In this case, query the database for all existing notes and return them in the query. Makes perfect sense right?

See if you can work through the rest of the routes here and find which endpoints map to the routes functions.