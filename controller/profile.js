var User = require('./../models/db');

exports.profile = function(req, res){
  var user = req.userData;
  res.render('profile', {username: user.username});
};
