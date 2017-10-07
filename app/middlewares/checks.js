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

exports.assignUser = function(req, res, next){
  if(req.user){
    let userId = req.user._id;
    User.findById(userId, (err, user) => {
        if (err)
          console.log(err);
        req.user = user;
        next();
      });
  }
  else{
    res.redirect('/login');
  }
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
