var User = require('./../models/db');

exports.sessionNew = function(req, res){
  res.render('login', {message: 'Log in'});
};

exports.sessionCreate = function(req, res){
   res.redirect('/profile');
};

exports.sessionDestroy = function(req, res){
  res.clearCookie('loginId');
  delete req.user;
   res.redirect('/login');
};
