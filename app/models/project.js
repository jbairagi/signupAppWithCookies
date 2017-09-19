var mongoose = require('mongoose');
var db = require('./../../config/dbConfig');
var Users = require('./user.js');

var projectSchema = mongoose.Schema({
  title : {type : String, required : true },
  description : String,
  beginningDate : {type : Date, required : true},
  dueDate : {type : Date, required : true},
  developers : [{type : mongoose.Schema.Types.ObjectId, ref : 'Users'}]
},{collection : 'Projects'});

module.exports = db.model("Projects", projectSchema);
