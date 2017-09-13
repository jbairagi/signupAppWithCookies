var User = require('./../models/db');

exports.profile = function(req, res){
  var userId = req.signedCookies['loginId'];
  User.find({'_id': userId}, function(err, user){
    if(err){
      res.render('login', {message: "Login Again!"});
    }
    if(user[0]){
      res.render('profile', {username: user[0].username});
     }
    else{
      res.redirect('./login');
    }
  });
};
