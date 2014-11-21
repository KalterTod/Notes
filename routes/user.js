var User = require('../models/users').Users;
var Note = require('../models/notes').Note;
/*
 * GET users listing.
 */

exports.addUser = function(req, res) {
  new User({
    user_name: req.body.user_name,
    date_created: Date.now()
  }).save( function(err) {
    if(!err) {
      res.json(200, { message: "User successfully added!"});
    } else {
      console.log(err);
      res.json(500, {message: "User failed to add!"});
    }
  });
};

exports.findUser = function(req, res) {
  User.findById(req.params.id, function(err, doc) {
    if(!err) {
      res.json(200, doc);
    } else {
      res.json(500, {message: "User not found!"});
    }
  });
};

exports.findUsers = function(req, res) {
	User.find({}, function(err, doc) {
		if(!err) {
			res.json(200, {users: doc});
		}	else {
			res.json(500, {message: "Internal Server Error"});
		}
	});
};

exports.deleteUser = function(req, res) {
  User.find({"user_name": req.body.user_name}, function(err, doc) {
    var id = doc[0]._id;
    User.findById(id, function(err, doc) {

      if(!err && doc) {
        doc.remove();
        Note.find({user_name: req.body.user_name}, function(err, doc) {
          if(!err && doc){
            console.log(doc);
            doc[0].remove();
          }
        });
        res.json(200, { message: "User successfully deleted!"});
      } else if (!err) {
        res.json(404, { message: "User not found!"});
      } else {
        res.json(500, {message: "Internal Server Error"});
      }
    });
  });
};
