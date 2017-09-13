var User = require('./../models/db');

exports.usernameTaken = function(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
    User.count({ $or:[ {'emailId': email}, {'username': username}]}, function (err, count) {
        if (count === 0) {
            next();
        }
        else{res.render('signup', {message: "Username or email already registered! Signup Again!"});
        }
    });
}

exports.authenticate = function(req, res,  next){
  var username = req.body.username;
  var pass = req.body.password;
  if(!username || !pass){
    res.render('login', {message: "Please enter all the fields"});
  }
  else{
    User.find({'username': username, 'password': pass}, function(err, user){
      if(user[0]){
        res.cookie('loginId', user[0]._id, {httpOnly: true, signed: true, maxAge: 360000});
        next();
       }
      else{
        res.render('login', {message: "Invalid credentials!"});
      }
    });
  }
}

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
