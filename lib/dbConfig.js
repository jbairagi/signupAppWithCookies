var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var db = mongoose.createConnection('mongodb://localhost/mydb');
var db = mongoose.createConnection('mongodb://jayeshbairagi:jaymlab1@ds141264.mlab.com:41264/mydb');

module.exports = db;


//var db = mongoose.createConnection('mongodb://jayeshbairagi:jaymlab1@ds141264.mlab.com:41264/mydb');
//mongodb://<dbuser>:<dbpassword>@ds141264.mlab.com:41264/mydb
