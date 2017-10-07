var User = require('./../models/user');

exports.sessionNew = function(req, res){
  res.render('login', {message: 'Log in'});
};

exports.sessionDestroy = function(req, res){
  req.logout();
  res.redirect('/login');
};
