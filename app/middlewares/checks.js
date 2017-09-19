var User = require('./../models/user');

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
    res.redirect('/login');
  }
}

exports.isManager = function(req, res, next){
  let userId = req.signedCookies['loginId'];
  if(userId){
    User.findById(userId, (err, user) =>{
      //console.log(user.role);
      if(err)
        console.log(err);
      if(user.role == "manager"){
        next();
      }
      else{
        res.redirect('/profile');
      }
    });
  }
  else{
    res.render('login', {message: "Login first!"});
  }
}
