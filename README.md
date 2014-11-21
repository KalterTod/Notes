### Simple API built with node, express, mongoDB, and mongoose with tutorial for automated RESTful testing with Mocha.
##### All of the instructions here are for use with Mac OSX.

To begin, you must first CLONE this repository. For more information, I highly recommend the [Gitbook](http://git-scm.com/book).

Since the API was built with the tools listed above, it is important that you install all necessary packages.  For Mac users who don't know already, homebrew is a fantastic tool that allows for easy installation of tons of packages.

Open up a new instance of terminal and do the following:

    ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

Once you have Homebrew installed, you'll want to install node.js. Next, type:

	brew install node

node.js also comes with its own package installer called npm. We can use npm now to install express and mongoose. Type the following:

	npm install -g express
	npm install -g mongoose

Finally, you'll also need mongo installed. Type the following:

	brew install mongodb

Phew! Now that we have all of that nonsense out of the way, we can get to why we're really here!

Navigate to the root directory of this Repository on your local machine.  Once there, you should run the following command:

	npm install

This command is using the npm installer to install all of the necessary dependencies to run the Notes API.

At this point, you're ready to run Notes API! You should play around with the API a bit to familiarize yourself with its functionality. Since we're going to be testing this API later on, we'll need a solid foundation on its intended functionality.

Because this app relies on an instance of mongoDB to be running, we'll need to open up a new terminal window and type:

	mongod

You should see a message about where the documents are now being stored to verify that mongo is running. For more information, visit the [mongoDB website](https://www.mongodb.org/).

I'll skip the part here where I discuss CRUD, assuming that you already have some knowledge of this. If not, please visit [CRUD Wikipedia](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete). We will be concerning ourselves with the HTTP request/response model, and from here on will be using its terminology (GET, PUT, POST, DELETE).

Now we have all the pieces in place to test our API! If you're not there anymore, navigate back to the root directory of the respository (~/etc/Notes) and type the following:

	node app.js

It should respond by saying that there is a listener in port 3000. Let's starting hitting that port with requests and see what happens!

As it is, this API is set up run locally. Install any REST client (I recommend [Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) Google Chrome Add-On) and do the following:

	Request URL: http://localhost:3000/user
	POST

Select the "Raw" input method and insert the following block:

	{
		"user_name": "insert_name_here"
	}

Now in the header, put the following

	Header -> Content-Type
	Value -> application/json

Then select "json" from the dropdown menu next to where you selected "raw".

Now hit "Send", and off your request to make a new user goes!

If you see:

	{ message: "User added successfully!" }

then everything is working as intended!

To see that your new user is safe and sound, send a new request:

	GET

to the same URL. Since this is a "GET" request, you won't need any body in the request and you won't need any header either.

You should now see your (unfortunately lonesome) user returning to you!

As you continue through this repository, you should learn more about the app and all of the endpoints it has exposed for requests. I plan on doing a full API documentation in Apiary as well. Expect to see that in the coming days!

For now, you can import my Postman Collection, and try the endpoints yourself!

Import the following collection URL:

https://www.getpostman.com/collections/81cb656a0b65e1d44cef

#####Good Luck!
