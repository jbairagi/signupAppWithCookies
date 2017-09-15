var User = require('./../models/user');
const bcrypt = require('bcrypt');

exports.addUserNew = function(req, res){
    res.render('addUser', {message: "Add User"});
};

exports.addUserCreate =  function(req, res){
  var username = req.body.username;
  var pass = req.body.password;
  var email = req.body.email;
  var role = req.body.role;
  if(!username || !pass || !email){
     res.send("Invalid details!");
  }
  else{
    User.count({ $or:[ {'emailId': email}, {'username': username}]}, function (err, count) {
      if (count === 0) {
        bcrypt.hash(pass, 10, function (err, hash){
          if (err) {
            console.log(err);
          }
          var newUser = new User({
            username: username,
            emailId: email,
            password: hash,
            role: role
          });
          newUser.save(function(err, user){
            if(err)
                 res.render('addUser', {message: "Database error", type: "error"});
              else{
                // res.cookie('loginId', user._id, {httpOnly: true, signed: true, maxAge: 360000});
                // res.redirect('/profile');
                res.render('addUser', {message: "New " + role+ " added"});
               }
          });
        })
      }
      else{
        res.render('addUser', {message: "Username or email already registered! addUser Again!"});
      }
    });
  }
};
