var User = require('./../models/user');
const bcrypt = require('bcrypt');

exports.addUserNew = function(req, res){
    res.render('addUser', {message: "Add User"});
};

exports.addUserCreate =  function(req, res){
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password should be atleast 5 characters long').isLength({ min: 5 })
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();
  req.checkBody('role', 'Role can be either a manager or an employee only').isIn(['manager', 'employee']);
  // check the validation object for errors
  var errors = req.validationErrors();

  if(errors){
    // console.log(errors);
    res.status(400).json({status: 400, message: "Validation Error! Try adding again!"});
    // res.render('addUser', {err: errors, type: "validationError", message: "Try adding again!"});
  }
  else{
    var username = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;
    var role = req.body.role;
    if(!username || !pass || !email){
      res.status(400).json({status: 400, message: "Invalid Details!"});
      // res.render('show_message', {message: "Invalid Details!"});
    }
    else{
      User.count({ $or:[{'emailId': email}, {'username': username}]}, function (err, count) {
        if (count === 0) {
          bcrypt.hash(pass, 10, function (err, hash){
            if (err) {
              console.log(err);
              res.status(400).json({status: 400, message: err});
            }
            var newUser = new User({
              username: username,
              emailId: email,
              password: hash,
              role: role
            });
            newUser.save(function(err, user){
              if(err){
                var error = [];
                error.push(err.errors['emailId'].message);
                res.status(400).json({status: 400, message: error});
                // res.render('addUser', {message: error, type: "error"});
              }
              else{
                res.status(200).json({status: 200, message: "New " + role+ " added"});
                // res.render('addUser', {message: "New " + role+ " added"});
               }
            });
          })
        }
        else{
          res.status(200).json({status: 200, message: "Username or email already registered! addUser Again!"});
          // res.render('addUser', {message: "Username or email already registered! addUser Again!"});
        }
      });
    }
  }
};
