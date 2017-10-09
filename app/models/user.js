var mongoose = require('mongoose');
var db = require('./../config/dbConfig');
var Projects = require('./project.js');
var validator = require('./../helpers/mongooseValidator');

var userSchema = mongoose.Schema({
   username: {
     type: String,
     required: true,
     minlength: 5,
     maxlength: 20
   },
	 emailId: {
     type: String,
     validate: validator.emailValidator,
     required: true
   },
   password: {
     type: String,
     required: true,
     select: false,
     minlength: 5
   },
   role: {
     type: String,
     enum: ["manager", "employee"],
     required: true
   },
   token: {
     type: String
   },
   project : [{type : mongoose.Schema.Types.ObjectId, ref : 'Projects'}]
},{collection : 'Users'});

module.exports = db.model("Users", userSchema);
