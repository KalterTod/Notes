var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//Create Schema for creating and reading notes
var noteSchema = new Schema({
  name: { type: String, required: true, trim: true, index: { unique: true } }
  , date_created: { type: Date, required: true, default: Date.now }
  , body: {type: String, required: true }
});

var note = mongoose.model('note', noteSchema); 

module.exports = {
  Note: note
};
