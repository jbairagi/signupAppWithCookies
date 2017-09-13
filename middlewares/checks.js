var User = require('./../models/db');

exports.userLoggedIn = function(req, res, next){
  let userId = req.signedCookies['loginId'];
  if(userId){
    User.findById(userId, (err, user) => {
        if (err)
          console.log(err);
        res.redirect('/profile');
      });
  }
  else{
    next();
  }
}
