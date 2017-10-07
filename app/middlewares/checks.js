var User = require('./../models/user');

exports.userLoggedIn = function(req, res, next){
  if(req.user){
    let userId = req.user._id;
    User.findById(userId, (err, user) => {
      if (err)
        console.log(err);
      req.user = user;
      res.redirect('/profile');
    });
  }
  else{
    next();
  }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
}

exports.isManager = function(req, res, next){
  if(req.user){
    let userId = req.user._id;
    User.findById(userId, (err, user) =>{
      if(err)
        console.log(err);
      if(user){
        if(user.role == "manager"){
          next();
        }
        else{
          res.redirect('/profile');
        }
      }
      else {
        res.redirect('/login');
      }
    });
  }
  else{
    res.render('login', {message: "Login first!"});
  }
}
