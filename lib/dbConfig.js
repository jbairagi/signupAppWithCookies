var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.createConnection('mongodb://jayeshbairagi:jaymlab1@ds141264.mlab.com:41264/mydb');

module.exports = db;



//mongodb://jayeshbairagi:jaymlab1@ds141264.mlab.com:41264/mydb
