var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.createConnection('mongodb://localhost/mydb');

module.exports = db;
