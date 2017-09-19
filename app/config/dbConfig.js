var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var db = mongoose.createConnection('mongodb://localhost/mydb');
var db = mongoose.createConnection('mongodb://jayeshbairagi:jaymlab1@ds141264.mlab.com:41264/mydb');
db.once('open', (err) => {
  if (!err)
  console.log("connected successfully!")
})
module.exports = db;
