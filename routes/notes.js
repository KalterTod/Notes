var Note = require('../models/notes').Notes;

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
      res.json(200, { message: "Success!" } )
    }
    else { 
      console.log(err);
      res.json(500, {message: "Failure!" }) }
  });
} 
