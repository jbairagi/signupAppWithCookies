var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost/mydb');

var userSchema = mongoose.Schema({
   username: String,
	 emailId: String,
   password: String
});

module.exports = db.model("users", userSchema);
