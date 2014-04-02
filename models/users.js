var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//Create Schema for creating and reading notes
var userSchema = new Schema({
  user_name: { type: String, required: true, trim: true, index: { unique: true } }
  , date_created: { type: Date, required: true, default: Date.now }
});

var user = mongoose.model('user', userSchema); 

module.exports = {
  Users: user
};