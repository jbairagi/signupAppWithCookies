var User = require('./../models/user');
var Project = require('./../models/project');
const bcrypt = require('bcrypt');

exports.start = function(){
  var username = "master";
  var pass = "master";
  var email = "master";
  var role = "manager";

  User.count({ $or:[ {'emailId': email}, {'username': username}, {'role': role}]}, function (err, count) {
      if (count === 0) {
        var pass = "master";
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
              console.log(err);
          });
        })
      }
      if(err)
        console.log(err);
  });
}
