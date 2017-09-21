var mongoose = require('mongoose');
var db = require('./../config/dbConfig');
var Users = require('./user.js');
var validator = require('./../helpers/mongooseValidator');

var projectSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  beginningDate : {
    type : Date,
    validate: validator.beginningDateValidator,
    required : true
  },
  dueDate : {
    type : Date,
    validate: validator.dueDateValidator,
    required : true
  },
  developers : [{type : mongoose.Schema.Types.ObjectId, ref : 'Users'}]
},{collection : 'Projects'});

module.exports = db.model("Projects", projectSchema);
