var User = require('./../models/db');

exports.userLoggedIn = function(req, res, next){
  let userId = req.signedCookies['loginId'];
  if(userId){
    User.findById(userId, (err, user) => {
        if (err)
          console.log(err);
        req.userData = user;
        //console.log(user);
        res.redirect('/profile');
      });
  }
  else{
    next();
  }
}


exports.assignUser = function(req, res, next){
  let userId = req.signedCookies['loginId'];
  if(userId){
    User.findById(userId, (err, user) => {
        if (err)
          console.log(err);
        req.userData = user;
        next();
      });
  }
  else{
    res.redirect('/signup');
  }
}
