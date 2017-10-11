var User = require('./../models/user');
var Project = require('./../models/project');
const bcrypt = require('bcrypt');

exports.getIdByUsername = function(username){
  return new Promise((resolve, reject) => {
    User.find({'username': username}, function(err, user){
      if (err) {
        console.log(err);
        return reject(err);
      }
      if(user.length){
        var a = user[0]._id;
        return resolve(a);
      }
      else
        console.log(username +  " is not registered");
    });
  })
}

// exports.getIdByProject = function(title){
//   Project.find({'title': title}, function(err, project){
//     if(err)
//       console.log(err);
//     if(project[0])
//       return project[0]._id;
//     else
//       console.log(title +  " is not registered");
//   });
// }

exports.getUserByToken = function(token){
  return new Promise((resolve, reject) => {
    User.findOne({'token': token}, function(err, user){
      if (err) return reject(err);
      if (user == undefined){
        return reject("Invalid Access!");
      }
      else{
        return resolve(user);
      }
    });
  })
}

exports.getProjectsByUsername = function(username){
  return new Promise((resolve, reject) => {
    User.findOne({'username' : username}, {'_id': 0}).populate('project').exec(function(err,result){
      if (err) return reject(err);
      if (result == undefined){
        return reject("Invalid Access!");
      }
      else{
        return resolve(result.project);
      }
    });
  })
}

exports.validateUser = function(username, pass){
  return new Promise((resolve, reject) => {
    User.find({'username': username},'+password', function(err, user){
      if(user[0]){
        bcrypt.compare(pass, user[0].password, function (err, result) {
          if(err){
            return reject(err);
          }
          if (result === true) {
            return resolve(result);
          }
          else{
            return reject("Please provide valid login credentials");
          }
        });
      }
      else{
        return reject("User not found! Please provide valid login credentials");
      }
    });

  })
}
