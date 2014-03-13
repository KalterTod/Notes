var Note = require('../models/notes').Note;

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

exports.addNote = function(req, res) {
  new Note({
    name: req.body.name,
    body: req.body.body,
    date_created: Date.now()
  }).save( function(err) {
    if(!err) {
      res.json(200, { message: "Message successfully added!" } )
    }
    else { 
      console.log(err);
      res.json(500, {message: "Message failed to add!" }) }
  });
} 

exports.remove = function(req, res) {
  Note.findById(req.body.id, function(err, doc) {
    if (!err && doc) {
      doc.remove();
      res.json(200, { message: "Message successfully removed!" } );
    }
    else if (!err) {
      res.json(404, { message: "Message could not be found!" } );
    }
    else {
      res.json(500, { message: "Message removal failed!" } );
    }
  });
}

exports.update = function(req, res) {
  Note.findById(req.body.id, function(err, doc) {
    if (!err && doc) {
      doc.body = req.body.body;
      doc.name = req.body.name; 
      doc.save( function(err) {
        if (!err) {
          res.json(200, { message: "Message '" + doc.name + "' has been successfully updated!" } ); 
        }
        else {
          res.json(500, { message: "Internal Server Error" } );
        }
      });
    }
    else if (!err) {
      res.json(404, { message: "Message '" + req.body.name + "' could not be found." } );
    }
    else { 
      res.json(500, { message: "Internal Server Error" } );
    }
  });
}
 
