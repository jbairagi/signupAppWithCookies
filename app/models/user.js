var mongoose = require('mongoose');
var db = require('./../../config/dbConfig');
var Projects = require('./project.js');

var userSchema = mongoose.Schema({
   username: {type: String, required: true},
	 emailId: {type: String, required: true},
   password: {type: String, required: true},
   role: {type: String, enum: ["manager", "employee"], required: true},
   project : [{type : mongoose.Schema.Types.ObjectId, ref : 'Projects'}]
},{collection : 'Users'});

module.exports = db.model("Users", userSchema);
