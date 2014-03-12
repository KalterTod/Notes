## Simple API built with node, express, and mongoose with tutorial for automated RESTful testing with Mocha. 
### All of the instructions here are for use with Mac OSX.

To begin, you must first CLONE this repository. For more information, I highly recommend the [Gitbook](http://git-scm.com/book). 

Since the API was built with the tools listed above, it is important that you install all necessary packages.  For Mac users who don't know already, homebrew is a fantastic tool that allows for easy installation of tons of packages.

Open up a new instance of terminal and do the following: 

    ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

Once you have Homebrew installed, you'll want to install node.js. Next, type: 

	brew install node

node.js also comes with its own package installer called npm. We can use npm now to install express and mongoose. Type the following:
	
	npm install -g express
	npm install -g mongoose
