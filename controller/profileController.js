var User = require('./../models/user');

exports.profile = function(req, res){
  var user = req.userData;
  res.render('profile', {username: user.username, type: user.role});
};
